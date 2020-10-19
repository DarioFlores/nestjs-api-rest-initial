import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { MESSAGES_ERROR } from '../errors/message';
import { Model, Document, FilterQuery, CreateQuery, MongooseUpdateQuery, QueryFindOneAndUpdateOptions } from 'mongoose';

export abstract class ServiceCrud<DocumentModel extends Document>{
  constructor(
    private modelo: Model<DocumentModel>,
    private populate: string[],
    private sort: any,
  ) {}

  async create(createDto: CreateQuery<DocumentModel>): Promise<DocumentModel> {
    try {
      return await this.modelo.create<DocumentModel>({
        ...createDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findAll(conditions?: FilterQuery<DocumentModel>, populate?: string[]): Promise<DocumentModel[]> {
    const populateOptions = populate || this.populate;
    try {
      return await this.modelo.find(conditions).populate(populateOptions).sort(this.sort);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async findOne(conditions?: FilterQuery<DocumentModel>, populate?: string[]): Promise<DocumentModel> {
    const populateOptions = populate || this.populate;
    let modelo: DocumentModel;
    try {
      modelo = await this.modelo.findOne(conditions).populate(populateOptions).sort(this.sort);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    return modelo;
  }

  async findById(id: string, conditions?: FilterQuery<DocumentModel>, populate?: string[]): Promise<DocumentModel> {
    const populateOptions = populate || this.populate;
    let modelo: DocumentModel;
    try {
      modelo = await this.modelo.findById(id, conditions).populate(populateOptions).sort(this.sort);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
    if (!modelo) {
      throw new NotFoundException(MESSAGES_ERROR.DB.NOT_FOUND(id));
    }
    return modelo;
  }

  async remove(id: string): Promise<DocumentModel> {
    const model = await this.findById(id);
    try {
      model['deletedAt'] = new Date();
      await model.save();
      return await this.findById(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }

  async update(id: string, updateDto: MongooseUpdateQuery<DocumentModel>, options?: QueryFindOneAndUpdateOptions): Promise<DocumentModel> {
    await this.findById(id);
    try {
      return await this.modelo.findByIdAndUpdate(id, {
        ...updateDto,
        updatedAt: new Date(),
      }, {
        new: true,
        ...options
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message, MESSAGES_ERROR.DB.ERROR);
    }
  }
}
