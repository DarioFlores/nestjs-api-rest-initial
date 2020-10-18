import { Module } from '@nestjs/common';
import { EnvironmentsModule } from '../environments/environments.module';
import { MongooseConfigService } from './mongoose.config';

@Module({
  providers: [MongooseConfigService],
  exports: [MongooseConfigService],
  imports: [EnvironmentsModule]
})
export class ConfigurationsModule {}
