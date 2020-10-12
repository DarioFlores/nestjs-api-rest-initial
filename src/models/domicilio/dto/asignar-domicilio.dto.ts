import { IsDefined, IsUUID } from 'class-validator';
import { ExistEntityId } from '../../../common/validators/exist-id.validator';
import { Domicilio } from '../entities/domicilio.entity';

export class AsignarDomicilioDto {
  @IsDefined()
  @IsUUID()
  @ExistEntityId(Domicilio)
  id: string;
}