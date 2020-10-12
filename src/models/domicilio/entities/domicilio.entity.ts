import { Persona } from "src/models/persona/entities/persona.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';
import { IDomicilio } from '../interfaces/domicilio.interface';
import { EntityBase } from '../../../common/entity/entity-base';

@Entity({orderBy: {
  calle: 'DESC',
}})
export class Domicilio extends EntityBase implements IDomicilio{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('varchar', {length: 100})
  calle: string;

  @Column('int', {name: 'nro_calle'})
  nroCalle: number;

  @Column('varchar', {length: 10, name: 'cod_postal'})
  codigoPostal: string;

  @Column('varchar', {length: 200, nullable: true})
  referencia: string;

  @Column('varchar', {length: 8, nullable: true})
  piso: string;

  @Column('varchar', {length: 200, nullable: true})
  departamento: string;
  
  @OneToOne(
    () => Persona,
    (persona) => persona.domicilio,
  )
  persona: Persona;
}
