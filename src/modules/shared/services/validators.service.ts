import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidatorsService {
  params: Record<string, any> = {};
  schemaId: string;

  setSchemaId(id: string): void {
    this.schemaId = id;
  };

  setParams(params: Record<string, any>): void {
    this.params = params;
  }

  getParams(): Record<string, any> {
    return this.params;
  }

  getSchemaId(): string {
    return this.schemaId;
  }
}
