import { Expose } from 'class-transformer';
import { IDomicilio } from '../interfaces/domicilio.interface';

@Expose()
export class ReadDomicilioDto  implements IDomicilio{
  calle: string;
  nroCalle: number;
  codigoPostal: string;
  referencia?: string;
  piso?: string;
  departamento?: string;
}