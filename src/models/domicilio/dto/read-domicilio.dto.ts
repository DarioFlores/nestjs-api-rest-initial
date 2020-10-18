import { Expose, Exclude } from 'class-transformer';
import { IDomicilio } from '../interfaces/domicilio.interface';

@Exclude()
export class ReadDomicilioDto  implements IDomicilio{
  @Expose()
  _id: string;

  @Expose()
  calle: string;

  @Expose()
  nroCalle: number;

  @Expose()
  codigoPostal: string;

  @Expose()
  referencia?: string;

  @Expose()
  piso?: string;

  @Expose()
  departamento?: string;
}