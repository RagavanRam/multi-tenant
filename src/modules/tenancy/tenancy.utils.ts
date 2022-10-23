import { DataSource } from 'typeorm';
import { tenantOrmConfig } from '../../tenant-orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ForbiddenException } from '@nestjs/common';

export async function getTenantConnection(
  tenantId: string,
): Promise<DataSource> {
  const connectionName = `tenant_${tenantId}`;
  return new DataSource({
    ...(tenantOrmConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName.toString(),
  })
    .initialize()
    .catch(() => {
      throw new ForbiddenException();
    });
}
