import { IsDefined, IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional } from 'class-validator';
import { IDomicilio } from '../interfaces/domicilio.interface';
export class CreateDomicilioDto  implements IDomicilio{
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  calle: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  nroCalle: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  codigoPostal: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  referencia?: string;

  @IsOptional()
  @IsString()
  @MaxLength(8)
  piso?: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  departamento?: string;
}