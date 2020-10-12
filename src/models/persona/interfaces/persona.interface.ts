import { SEXO } from '../../../utils/enum.util';

export interface IPersona{
  nombre: string;
  apellido: string;
  nroDoc: string;
  telefono?: string;
  email?: string;
  fechaNacimiento?: Date;
  sexo?: SEXO;
}