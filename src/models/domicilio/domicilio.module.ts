import { Module } from '@nestjs/common';
import { DomicilioService } from './domicilio.service';
import { DomicilioController } from './domicilio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DomicilioSchema, Domicilio } from './schema/domicilio.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Domicilio.name, schema: DomicilioSchema }])
  ],
  exports: [MongooseModule, DomicilioService],
  controllers: [DomicilioController],
  providers: [DomicilioService]
})
export class DomicilioModule {}
