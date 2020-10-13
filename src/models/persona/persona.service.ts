import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { Repository } from 'typeorm';
import { ServiceCrud } from '../../common/crud/services/service-crud.common';

@Injectable()
export class PersonaService extends ServiceCrud<Persona>{
  constructor(
    @InjectRepository(Persona)
    readonly  repo: Repository<Persona>,
  ){
    super(repo, {
      embedded: ['domicilio']
    })
  }
}