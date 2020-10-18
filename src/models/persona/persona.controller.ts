import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReadPersonaDto } from './dto/read-persona.dto';
import { plainToClass } from 'class-transformer';

@ApiTags('personas')
@Controller('personas')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}
  
  @Post()
  async create(@Body() createPersonaDto: CreatePersonaDto): Promise<ReadPersonaDto> {
    const response = await this.personaService.create(createPersonaDto);
    return plainToClass(ReadPersonaDto, response);
  }

  @Get()
  async findAll(): Promise<ReadPersonaDto[]> {
    const response = await this.personaService.findAll();
    return response.map((data) => plainToClass(ReadPersonaDto, data));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadPersonaDto> {
    const response = await this.personaService.findById(id);
    return plainToClass(ReadPersonaDto, response);
  }

  @Get(':id/domicilio')
  async findOneDomicilio(@Param('id') id: string): Promise<ReadPersonaDto> {
    const response = await this.personaService.findById(id);
    return plainToClass(ReadPersonaDto, response);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePersonaDto: UpdatePersonaDto): Promise<ReadPersonaDto> {
    const response = await this.personaService.update(id, updatePersonaDto);
    return plainToClass(ReadPersonaDto, response);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ReadPersonaDto> {
    const response = await this.personaService.remove(id);
    return plainToClass(ReadPersonaDto, response);
  }

  // @Delete(':id/restore')
  // async restore(@Param('id') id: string): Promise<ReadPersonaDto> {
  //   const response = await this.personaService.restore(id);
  //   return plainToClass(ReadPersonaDto, response);
  // }
}
