import { Injectable } from "@nestjs/common";
import { MongooseOptionsFactory, MongooseModuleOptions } from "@nestjs/mongoose";
import { auditableSchema } from '../common/schema/schema-base';
import { EnvironmentsService } from '../environments/environments.service';


@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(
    private readonly envService: EnvironmentsService,
  ){}
  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.envService.DB_URI;
    const replicaSet = this.envService.DB_REPLICA_SET;
    return {
      uri,
      replicaSet,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      connectionFactory: (connection) => {
        connection.plugin(auditableSchema);
        return connection;
      }
    };
  }
}