import { handler, createExpressApp, bootstrap } from './serverless';

it('lambda should be defined', async () => {
  expect(handler).toBeDefined();
});

it('createExpressApp should be defined', async () => {
  expect(createExpressApp).toBeDefined();
});

it('bootstrap should be defined', async () => {
  expect(bootstrap).toBeDefined();
});