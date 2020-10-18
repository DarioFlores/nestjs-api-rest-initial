import {Module} from '@nestjs/common';
import { PersonaModule } from './models/persona/persona.module';
import { DomicilioModule } from './models/domicilio/domicilio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { auditableSchema } from './common/schema/schema-base';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://DESKTOP-UD5U151:27017,DESKTOP-UD5U151:27018,DESKTOP-UD5U151:27019/practica', {
      replicaSet: 'rs',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      connectionFactory: (connection) => {
        connection.plugin(auditableSchema);
        return connection;
      }
    }),
    PersonaModule,
    DomicilioModule,
  ],
})
export class AppModule {}
