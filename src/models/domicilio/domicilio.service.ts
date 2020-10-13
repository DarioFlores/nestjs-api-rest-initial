import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Domicilio } from './entities/domicilio.entity';
import { Repository } from 'typeorm';
import { ServiceCrud } from '../../common/crud/services/service-crud.common';

@Injectable()
export class DomicilioService extends ServiceCrud<Domicilio>{
  constructor(
    @InjectRepository(Domicilio)
    readonly  repo: Repository<Domicilio>,
  ){
    super(repo, {
      embedded: []
    })
  }
}