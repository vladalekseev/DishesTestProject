import { observable, action } from 'mobx';

class LoaderManager {
    @observable progress;
    @observable isFinished;
    @observable isError;

    constructor() {
        this.progress = 0;
        this.isFinished = false;
    }

    @action
    start() {
        this.isFinished = false;
        this.progress = 0;

        this.loadInt = setInterval(() => {
            this.progress += 2;
        }, 1);
    }

    @action
    complete() {
        clearInterval(this.loadInt);
        this.progress = '100%';
        setTimeout(() => {
            this.isFinished = true;
        }, 400)
    }

    @action
    rollback() {
        clearInterval(this.loadInt);
        this.isError = true;
        setTimeout(() => {
            this.isFinished = true;
        }, 400)
    }
}

export default new LoaderManager();
