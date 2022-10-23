import { Module, Scope } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CONNECTION } from './tenancy.symbols';
import { getTenantConnection } from './tenancy.utils';
import { REQUEST } from '@nestjs/core';

const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: async (request: ExpressRequest) => {
    const { tenantId } = request;

    if (tenantId) {
      return getTenantConnection(tenantId);
    }

    return null;
  },
  inject: [REQUEST],
};

@Module({
  providers: [connectionFactory],
  exports: [CONNECTION],
})
export class TenancyModule {}
