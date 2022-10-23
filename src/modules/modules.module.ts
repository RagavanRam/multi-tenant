import { Module } from '@nestjs/common';
import { PublicModule } from './public/public.module';
import { TenancyModule } from './tenancy/tenancy.module';
import { TenantedModule } from './tenanted/tenanted.module';

@Module({
  imports: [PublicModule, TenancyModule, TenantedModule],
})
export class ModulesModule {}
