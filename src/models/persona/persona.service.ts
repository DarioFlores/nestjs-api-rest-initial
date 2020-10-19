import { Injectable } from '@nestjs/common';
import { Persona, PersonaDocument } from './schema/persona.schema';
import { ServiceCrud } from '../../common/services/service-crud.common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PersonaService extends ServiceCrud<PersonaDocument>{
  constructor(
    @InjectModel(Persona.name)
    private readonly model: Model<PersonaDocument>,
  ){
    super(model, { apellido: 'desc', nombre: 'asc'})
  }
}