import { tenancyMiddleware } from '../tenancy.middleware';

describe('TenancyMiddleware', () => {
  it('should be defined', () => {
    expect(tenancyMiddleware).toBeDefined();
  });
});
