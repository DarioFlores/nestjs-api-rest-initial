import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, OneToOne } from 'typeorm';
import { SEXO } from '../../../utils/enum.util';
import { IPersona } from '../interfaces/persona.interface';
import { EntityBase } from '../../../common/entity/entity-base';
import { Domicilio } from '../../domicilio/entities/domicilio.entity';

@Entity({orderBy: {
  nombre: 'ASC'
}})
export class Persona extends EntityBase implements IPersona{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({length: 100})
  nombre: string;

  @Column({length: 100})
  apellido: string;

  @Column({length: 20, name: 'nro_doc', unique: true})
  nroDoc: string;

  @Column({
    length: 50,
    nullable: true,
    comment: 'Telefono principal',
  })
  telefono: string;

  @Column({length: 100, nullable: true})
  email: string;

  @Column({name: 'fec_nacimiento', nullable: true})
  fechaNacimiento: Date;

  @Column({type: 'enum',nullable: true, enum: SEXO})
  sexo: SEXO;

  @OneToOne(
    () => Domicilio,
    (domicilio) => domicilio.persona,
    {cascade: true},
  )
  @JoinColumn({name: 'domicilio_id'})
  domicilio: Domicilio;
}
