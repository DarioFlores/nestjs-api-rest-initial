import { DeepPartial, BaseEntity, FindManyOptions, FindOneOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IServiceCrud<Model extends BaseEntity>{
  create(createDto: DeepPartial<Model>): Promise<Model>;
  findAll(options?: FindManyOptions<Model>): Promise<Model[]>;
  findOne(id: string, options?: FindOneOptions<Model>): Promise<Model>;
  remove(id: string): Promise<Model>;
  restore(id: string): Promise<Model>;
  update(id: string, updateDto: DeepPartial<Model>): Promise<Model>;
}