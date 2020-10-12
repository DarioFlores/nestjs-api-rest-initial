import {buildMessage, registerDecorator, ValidationOptions} from 'class-validator';
import {getRepository} from 'typeorm';

export function ExistEntityId(entity, validationOptions?: ValidationOptions) {
  return function(object, propertyName: string): void {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(id: string): Promise<boolean> {
          return getRepository(entity)
            .findOne(id)
            .then((data) => {
              if (data) {
                return true;
              } else {
                return false;
              }
            });
        },
        defaultMessage: buildMessage((eachPrefix) => eachPrefix + "$property no se encuentra en la base de datos.", validationOptions)
      },
    });
  };
}
