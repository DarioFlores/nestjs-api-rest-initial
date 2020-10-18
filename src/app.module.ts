import {Module} from '@nestjs/common';
import { PersonaModule } from './models/persona/persona.module';
import { DomicilioModule } from './models/domicilio/domicilio.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigService } from './config/mongoose.config';
import { ConfigurationsModule } from './config/configuration.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      expandVariables: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigurationsModule],
      useExisting: MongooseConfigService
    }),
    PersonaModule,
    DomicilioModule,
  ],
})
export class AppModule {}