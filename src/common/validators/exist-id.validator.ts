import {buildMessage, registerDecorator, ValidationOptions} from 'class-validator';
import { Model, Document } from 'mongoose';

export function ExistEntityId(model: Model<Document>, validationOptions?: ValidationOptions) {
  return function(object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate: async (id: string): Promise<boolean> => {
          const data = await model.findById(id)
          if (data) {
            return true;
          }
          return false;
        },
        defaultMessage: buildMessage((eachPrefix) => eachPrefix + "$property no se encuentra en la base de datos.", validationOptions)
      },
    });
  };
}
