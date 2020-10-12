import { BaseEntity, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export abstract class EntityBase extends BaseEntity{
  constructor(){
    super()
  }
  
  @CreateDateColumn({type: 'timestamp', name: 'created_at'})
  createdAt?: Date;

  @UpdateDateColumn({type: 'timestamp', name: 'updated_at'})
  updatedAt?: Date;

  @DeleteDateColumn({type: 'timestamp', name: 'delete_at'})
  deletedAt?: Date;
}