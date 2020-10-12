import { BaseEntity, DeepPartial, Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { IServiceCrud } from './service-crud.interface';
import { MESSAGES_ERROR } from '../../errors/message.enum';

export abstract class ServiceCrud<Model extends BaseEntity> implements IServiceCrud<Model> {
  constructor(
    private repository: Repository<Model>,
  ) {}

  async create(createDto: DeepPartial<Model>): Promise<Model> {
    try {
      return await this.repository.save(createDto);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findAll(options?: FindManyOptions<Model>): Promise<Model[]> {
    try {
      return await this.repository.find(options);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findOne(id: string, options?: FindOneOptions<Model>): Promise<Model> {
    let model: Model;
    try {
      model = await this.repository.findOne(id, options);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND);
    }
    return model;
  }

  async remove(id: string): Promise<Model> {
    let model;
    try {
      model = await this.repository.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND);
    } 
    try {
      await this.repository.softRemove(model);
      return model;
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }
  
  async restore(id: string): Promise<Model> {
    let model;
    try {
      model = await this.repository.findOne(id, {
        withDeleted: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND);
    } 
    try {
      return await this.repository.recover(model);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async update(id: string, updateDto: DeepPartial<Model>): Promise<Model> {
    let model;
    try {
      model = await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!model) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND);
    } 
    try {
      return await this.repository.save({id, ...updateDto});
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }
}
