import { handler } from './serverless';

describe('Handler', () => {
    it('should be defined', async () => {
        expect(handler).toBeDefined();
    });
});
