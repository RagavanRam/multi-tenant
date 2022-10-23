import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { ValidatorsService } from '../services/validators.service';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {
  constructor(private validatorsService: ValidatorsService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const params = request.params;
    const schemaId = request.tenantId;

    this.validatorsService.setParams(params);
    this.validatorsService.setSchemaId(schemaId);

    return next.handle();
  }
}
