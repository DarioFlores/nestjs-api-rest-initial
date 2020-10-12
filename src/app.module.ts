import {Module} from '@nestjs/common';
import {Connection} from 'typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import { PersonaModule } from './models/persona/persona.module';
import { DomicilioModule } from './models/domicilio/domicilio.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    PersonaModule,
    DomicilioModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
