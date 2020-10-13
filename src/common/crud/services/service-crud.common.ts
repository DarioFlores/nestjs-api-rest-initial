import { BaseEntity, DeepPartial, Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { IServiceCrud } from './service-crud.interface';
import { MESSAGES_ERROR } from '../../errors/message';

interface IOptionsCrud{
  embedded: string[],
}

export abstract class ServiceCrud<Model extends BaseEntity> implements IServiceCrud<Model> {
  constructor(
    private repository: Repository<Model>,
    private optionsCrud: IOptionsCrud,
  ) {

  }

  async create(createDto: DeepPartial<Model>): Promise<Model> {
    try {
      return await this.repository.save(createDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findAll(options: FindManyOptions<Model> = {}): Promise<Model[]> {
    try {
      return await this.repository.find({
        relations: options.relations || this.optionsCrud.embedded,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findOne(id: string, options: FindOneOptions<Model> = {}): Promise<Model> {
    let model: Model;
    try {
      model = await this.repository.findOne(id, {
        relations: options.relations || this.optionsCrud.embedded,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND(id));
    }
    return model;
  }

  async remove(id: string, options?: FindOneOptions<Model>): Promise<Model> {
    let model;
    try {
      model = await this.repository.findOne(id, {
        relations: this.optionsCrud.embedded,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND(id));
    } 
    try {
      await this.repository.softRemove(model);
      return model;
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }
  
  async restore(id: string, options?: FindOneOptions<Model>): Promise<Model> {
    let model;
    try {
      model = await this.repository.findOne(id, {
        relations: this.optionsCrud.embedded,
        withDeleted: true,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND(id));
    }
    try {
      return await this.repository.recover(model);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async update(id: string, updateDto: DeepPartial<Model>, options: FindOneOptions<Model> = {}): Promise<Model> {
    let model;
    try {
      model = await this.repository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND(id));
    } 
    try {
      await this.repository.save({id, ...updateDto});
      return await this.repository.findOne(id, {
        relations: options.relations || this.optionsCrud.embedded,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }
}
