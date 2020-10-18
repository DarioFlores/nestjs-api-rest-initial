import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentsService {
  constructor(private config: ConfigService) {}
  
  public NODE_PORT = this.config.get<number>('NODE_PORT') || 3000;

  public DB_URL = this.config.get<string>('DB_URL');
  public DB_NAME = this.config.get<string>('DB_NAME');
  public DB_URI = `${this.DB_URL}/${this.DB_NAME}`;
  public DB_REPLICA_SET = this.config.get<string>('DB_REPLICA_SET') || undefined;

}
