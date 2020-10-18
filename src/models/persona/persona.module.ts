import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { Persona, PersonaSchema } from './schema/persona.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Persona.name, schema: PersonaSchema }])
  ],
  exports: [MongooseModule, PersonaService],
  controllers: [PersonaController],
  providers: [PersonaService]
})
export class PersonaModule {}
