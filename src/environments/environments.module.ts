import { Module } from '@nestjs/common';
import { EnvironmentsService } from './environments.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [EnvironmentsService],
  exports: [EnvironmentsService],
  imports: [ConfigModule]
})
export class EnvironmentsModule {}
