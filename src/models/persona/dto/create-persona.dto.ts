
import { IsDateString, IsDefined, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { SEXO } from '../../../utils/enum.util';
import { IPersona } from '../interfaces/persona.interface';
import { AsignarDomicilioDto } from '../../domicilio/dto/asignar-domicilio.dto';
import { Type } from 'class-transformer';

export class CreatePersonaDto implements IPersona{
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nombre: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  apellido: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  nroDoc: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  telefono?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(5)
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  fechaNacimiento?: Date;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(SEXO)
  sexo?: SEXO;

  @IsOptional()
  @ValidateNested({each: true})
  @Type(() => AsignarDomicilioDto)
  domicilio?: AsignarDomicilioDto;
}