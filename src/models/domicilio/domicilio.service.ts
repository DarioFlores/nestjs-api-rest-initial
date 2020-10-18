import { Injectable } from '@nestjs/common';
import { ServiceCrud } from '../../common/services/service-crud.common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Domicilio, DomicilioDocument } from './schema/domicilio.schema';

@Injectable()
export class DomicilioService extends ServiceCrud<DomicilioDocument>{
  constructor(
    @InjectModel(Domicilio.name)
    readonly  repo: Model<DomicilioDocument>,
  ){
    super(repo)
  }
}