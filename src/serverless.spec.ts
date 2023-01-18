
import { Context } from 'aws-lambda';
import { handler } from './serverless';

describe('Lambda handler', () => {
  it('should return a response', async () => {
    const event = {};
    let context: Context;
    const callback = jest.fn();

    await handler(event, context, callback);

    expect(callback).toHaveBeenCalledWith(null, expect.any(Object));
  });
});