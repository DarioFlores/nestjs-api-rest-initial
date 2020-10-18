import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IPersona } from '../interfaces/persona.interface';

export type PersonaDocument = Persona & Document;

@Schema()
export class Persona implements IPersona{

  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  nroDoc: string;

  @Prop()
  telefono?: string;

  @Prop()
  email?: string;

  @Prop()
  fechaNacimiento?: Date;

  @Prop()
  sexo?: string;

}

export const PersonaSchema = SchemaFactory.createForClass(Persona);

// @Entity({orderBy: {
//   nombre: 'ASC'
// }})
// export class Persona extends EntityBase implements IPersona{
//   @OneToOne(
//     () => Domicilio,
//     (domicilio) => domicilio.persona,
//     {cascade: ["insert", "update", "soft-remove", "recover"]},
//   )
//   @JoinColumn({name: 'domicilio_id'})
//   domicilio: Domicilio;
// }
