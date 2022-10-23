import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { ValidatorsService } from './services/validators.service';
import { PublicUniqueConstraint } from './constraints/public-unique.constraint';
import { TenantUniqueConstraint } from './constraints/tenant-unique.constraint';
import { TenancyModule } from '../tenancy/tenancy.module';
import { ValidatorInterceptor } from './interceptors/validator.interceptor';

@Module({
  imports: [TenancyModule],
  providers: [
    ValidatorsService,
    PublicUniqueConstraint,
    TenantUniqueConstraint,
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidatorInterceptor,
    },
  ],
  exports: [
    ValidatorsService,
    PublicUniqueConstraint,
    TenantUniqueConstraint,
    TenancyModule,
  ],
})
export class SharedModule {}
