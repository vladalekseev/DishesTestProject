import menuStore from './MenuStore';
import LoadManager from '../../widgets/Loader/LoadManager';

const dishes = {
    page: 1,
    pages: 3,
    docs: [
        {
            "_id" : "id1",
            "name" : "name1",
            "description" : "description1",
            "img" : "img1.jpg",
            "numberOfOrders" : 24,
            "isPublished" : true,
            "isEditable" : false,
            "creationDate" : "date",
        },
        {
            "_id" : "id2",
            "name" : "name2",
            "description" : "description2",
            "img" : "img2.jpg",
            "numberOfOrders" : 12,
            "isPublished" : false,
            "isEditable" : false,
            "creationDate" : "date2",
        }
    ]
};

describe('Order store', () => {
    it('should get dishes', done => {
        fetch.mockResponse(JSON.stringify(dishes));

        menuStore.fetchDishes()
            .then(() => {
                expect(menuStore.dishes.length).toBe(2);
                expect(menuStore.pages.length).toBe(3);
                expect(menuStore.currentPage).toBe(1);

                expect(LoadManager.progress).toBe('100%');
            })
            .then(done)
            .catch(done.fail)
    });

    beforeAll(() => {
        menuStore.name = 'name3';
        menuStore.description = 'description3';
        menuStore.image = 'img3.jpg';
    });

    it('should add new dish', done => {
        const newDish = {
            "_id" : "id3",
            "name" : "name3",
            "description" : "description3",
            "img" : "img3.jpg",
            "numberOfOrders" : 0,
            "isPublished" : true,
            "isEditable" : false,
            "creationDate" : "date",
        };

        expect(menuStore.name).not.toBe('');
        expect(menuStore.description).not.toBe('');
        expect(menuStore.image).not.toBeNull();

        fetch.mockResponse(JSON.stringify(newDish));

        menuStore.addNewItem()
            .then(() => {
                dishes.docs.push(newDish);
                fetch.mockResponse(JSON.stringify(dishes));

                menuStore.fetchDishes()
                    .then(() => {
                        expect(menuStore.dishes.length).toBe(3);
                    })
            })
            .then(done)
            .catch(done.fail)
    });

    it('should edit dish', done => {
        menuStore.editItem('edit', 'id1');
        expect(menuStore.dishes[0].isEditable).toBe(true);
        expect(menuStore.dishes[1].isEditable).toBe(false);
        expect(menuStore.dishes[2].isEditable).toBe(false);

        menuStore.editItem('cancel', 'id1');
        menuStore.dishes.forEach((dish) => {
            expect(dish.isEditable).toBe(false);
        });

        fetch.mockResponse(JSON.stringify({}));

        menuStore.editItem('edit', 'id1');
        menuStore.editItem('save', 'id1', 'new name', 'new description', 'img.jpg')
            .then(() => {
                expect(menuStore.dishes[0].name).toBe('new name');
                expect(menuStore.dishes[0].description).toBe('new description');
                expect(menuStore.dishes[0].isEditable).toBe(false);
            })
            .then(done)
            .catch(done.fail);
    });

    it('should remove dish', done => {
        menuStore.removeItem('id3')
            .then(() => {
                dishes.docs.splice(2, 1);
                fetch.mockResponse(JSON.stringify(dishes));

                menuStore.fetchDishes()
                    .then(() => {
                        expect(menuStore.dishes.length).toBe(2);
                    })
            })
            .then(done)
            .catch(done.fail);
    });

    it('should set image', done => {
        fetch.mockResponse(JSON.stringify({ name: 'img', message: 'uploaded' }));

        menuStore.setImage({})
            .then(() => {
                expect(menuStore.image).toBe('img');
            })
            .then(done)
            .catch(done.fail);
    });

    it('should change image', done => {
        fetch.mockResponse(JSON.stringify({ name: 'new_img', message: 'uploaded' }));

        menuStore.changeImage({}, 'id1')
            .then(() => {
                expect(menuStore.dishes[0].img).toBe('new_img');
            })
            .then(done)
            .catch(done.fail);
    });

    it('should unpublish dish', done => {
        fetch.mockResponse(JSON.stringify(dishes.docs[0]));

        expect(menuStore.dishes[0].isPublished).toBe(true);

        menuStore.publishDish('id1')
            .then(() => {
                expect(menuStore.dishes[0].isPublished).toBe(false);
            })
            .then(done)
            .catch(done.fail);

    });

    it('should publish dish', done => {
        fetch.mockResponse(JSON.stringify(dishes.docs[1]));

        expect(menuStore.dishes[1].isPublished).toBe(false);

        menuStore.publishDish('id2')
            .then(() => {
                expect(menuStore.dishes[1].isPublished).toBe(true);
            })
            .then(done)
            .catch(done.fail);
    });
});
