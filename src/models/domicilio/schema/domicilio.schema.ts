import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IDomicilio } from '../interfaces/domicilio.interface';

export type DomicilioDocument = Domicilio & Document;

@Schema()
export class Domicilio implements IDomicilio{

  @Prop()
  calle: string;

  @Prop()
  nroCalle: number;

  @Prop()
  codigoPostal: string;

  @Prop()
  referencia?: string;

  @Prop()
  piso?: string;

  @Prop()
  departamento?: string;
}

export const DomicilioSchema = SchemaFactory.createForClass(Domicilio);

// @Entity({orderBy: {
//   nombre: 'ASC'
// }})
// export class Domicilio extends EntityBase implements IDomicilio{
  // @OneToOne(
  //   () => Persona,
  //   (persona) => persona.domicilio,
  // )
  // persona: Persona;
// }
