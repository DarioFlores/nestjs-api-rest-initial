import { Exclude, Expose, Type } from 'class-transformer';
import { IPersona } from '../interfaces/persona.interface';
import { SEXO } from '../../../utils/enum.util';
import { ReadDomicilioDto } from '../../domicilio/dto/read-domicilio.dto';

@Exclude()
export class ReadPersonaDto implements IPersona{
  @Expose()
  _id: string;

  @Expose()
  nombre: string;

  @Expose()
  apellido: string;

  @Expose()
  nroDoc: string;

  @Expose()
  telefono?: string;

  @Expose()
  email?: string;

  @Expose()
  fechaNacimiento?: Date;

  @Expose()
  sexo?: SEXO;

  @Type(() => ReadDomicilioDto)
  @Expose()
  domicilio: ReadDomicilioDto;
}