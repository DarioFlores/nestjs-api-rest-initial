import { Module } from '@nestjs/common';
import { DomicilioService } from './domicilio.service';
import { DomicilioController } from './domicilio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Domicilio } from './entities/domicilio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Domicilio])
  ],
  exports: [TypeOrmModule, DomicilioService],
  controllers: [DomicilioController],
  providers: [DomicilioService]
})
export class DomicilioModule {}
