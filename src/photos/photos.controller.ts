import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private photoService: PhotosService) {}
  @Get('/')
  async getAllPhotos() {
    return this.photoService.getAllPhotos();
  }
  @Get('/:id')
  async getPhotoById(@Param('id', new ParseUUIDPipe()) id: string) {
    const photo = await this.photoService.getPhotoById(id);
    if (!photo) throw new NotFoundException('Photo not found');
    else return photo;
  }
}
