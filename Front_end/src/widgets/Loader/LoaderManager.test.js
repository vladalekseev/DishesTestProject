import LoaderManager from './LoadManager';

describe('LoaderManager', () => {
    it('should start default values', () => {
        expect(LoaderManager.progress).toBe(0);
        expect(LoaderManager.isFinished).toBe(false);
    });

    it('should complete loading', () => {
        LoaderManager.complete();
        expect(LoaderManager.progress).toBe('100%');
    });

    it('should start loading', () => {
        LoaderManager.start();
        expect(LoaderManager.progress).toBe(0);
    });
});
