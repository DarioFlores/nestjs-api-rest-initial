import { Controller, Get, Post, Body, Put, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { DomicilioService } from './domicilio.service';
import { CreateDomicilioDto } from './dto/create-domicilio.dto';
import { UpdateDomicilioDto } from './dto/update-domicilio.dto';
import { ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ReadDomicilioDto } from './dto/read-domicilio.dto';

@ApiTags('domicilios')
@Controller('domicilios')
export class DomicilioController {
  constructor(private readonly domicilioService: DomicilioService) {}
  
  @Post()
  async create(@Body() createPersonaDto: CreateDomicilioDto): Promise<ReadDomicilioDto> {
    const response = await this.domicilioService.create(createPersonaDto);
    return plainToClass(ReadDomicilioDto, response);
  }

  @Get()
  async findAll(): Promise<ReadDomicilioDto[]> {
    const response = await this.domicilioService.findAll();
    return response.map((data) => plainToClass(ReadDomicilioDto, data));
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ReadDomicilioDto> {
    const response = await this.domicilioService.findOne(id);
    return plainToClass(ReadDomicilioDto, response);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updatePersonaDto: UpdateDomicilioDto): Promise<ReadDomicilioDto> {
    const response = await this.domicilioService.update(id, updatePersonaDto);
    return plainToClass(ReadDomicilioDto, response);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ReadDomicilioDto> {
    const response = await this.domicilioService.remove(id);
    return plainToClass(ReadDomicilioDto, response);
  }
}
