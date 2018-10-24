import { observable, action } from 'mobx';
import appStore from '../AppStore/AppStore';
import userStore from '../UserStore/UserStore';
import errorHandler from '../../errorHandler';
import { getDishes, createDish, uploadImage, removeDish, updateDish } from "../../utils/dishes-api";
import { confirmAlert } from 'react-confirm-alert';
import LoadManager from '../../widgets/Loader/LoadManager';

class MenuStore {

    @observable dishes;
    @observable name;
    @observable description;
    @observable image;
    @observable pages;
    @observable currentPage;
    @observable isLoaded;

    constructor() {
        this.dishes = [];
        this.pages = [];

        this.name = '';
        this.description = '';
    }

    @action
    fetchDishes(page = 1) {
        LoadManager.start();
        return getDishes(page, userStore.isAdmin)
            .then((res) => res.json())
            .then((dishes) => {
                this.currentPage = dishes.page;
                this.pages = new Array(dishes.pages);
                this.dishes = dishes.docs;
                this.isLoaded = true;
                LoadManager.complete();
            })
            .catch((err) => {
                LoadManager.rollback();
                return err;
            })
    }

    @action
    addNewItem() {
        if(!this.image)
            return appStore.createNotification('info', 'Please upload the image');

        const dishData = { name: this.name, description: this.description, img: this.image };

        return createDish(dishData)
            .then((res) => res.json())
            .then(errorHandler)
            .then(dish => {
                if(dish) {
                    this.fetchDishes();

                    this.file.value = '';
                    this.name = '';
                    this.description = '';
                    this.image = null;
                }
            })
            .catch(err => err);
    }

    @action
    editItem(act, id, name, description, img) {
        const editableDish = this.dishes.find((dish) => {
            return id === dish._id;
        });
        switch(act) {
            case 'edit':
                this.cacheImg = editableDish.img;
                editableDish.isEditable = true;
                break;
            case 'save':
                return updateDish({ name, description, img }, id)
                    .then(res => res.json())
                    .then(errorHandler)
                    .then((dish) => {
                        if(dish) {
                            editableDish.name = name;
                            editableDish.description = description;
                            editableDish.isEditable = false;
                        }
                    })
                    .catch(err => err);
            default:
                // Default cancel action
                editableDish.img = this.cacheImg;
                editableDish.isEditable = false;
                break;
        }
    }

    @action
    removeItem(id) {
        return removeDish(id)
            .then(res => res.json())
            .then(() => {
                this.fetchDishes();
            })
            .catch(err => err);
    }

    @action
    setImage(img, file) {
        if(img) {
            this.file = file;
            const formData = new FormData();
            formData.append('image', img);

            return uploadImage(formData)
                .then(res => res.json())
                .then(errorHandler)
                .then((file) => {
                    this.image = file.name;
                    appStore.createNotification('success', file.message);
                })
                .catch(err => err);
        }
    }

    @action
    changeImage(img, id) {
        if(img) {
            const formData = new FormData();
            formData.append('image', img);

            return uploadImage(formData)
                .then(res => res.json())
                .then(errorHandler)
                .then((file) => {
                    if(file) {
                        let currentDish = this.dishes.find((dish) => {
                            return id === dish._id;
                        });
                        currentDish.img = file.name;
                    }
                })
                .catch(err => err);
        }
    }

    @action
    publishDish(id) {
        const foundDish = this.dishes.find((dish) => {
            return dish._id === id;
        });
        return updateDish({ isPublished: !foundDish.isPublished }, id)
            .then(res => res.json())
            .then((dish) => {
                foundDish.isPublished = !dish.isPublished;
            })
            .catch(err => err);
    }

    @action
    confirmDeletion(id) {
        confirmAlert({
            title: 'Confirm to remove',
            message: '',
            confirmLabel: 'Remove',
            cancelLabel: 'Cancel',
            onConfirm: () => this.removeItem(id)
        })
    }

    @action
    setValue(type, value) {
        this[type] = value;
    }
}

const menuStore = new MenuStore();
export default menuStore;
