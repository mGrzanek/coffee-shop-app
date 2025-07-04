import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/services/prisma.service';
import { Photo } from '@prisma/client';

@Injectable()
export class PhotosService {
  constructor(private prismaService: PrismaService) {}
  public getAllPhotos(): Promise<Photo[]> {
    return this.prismaService.photo.findMany();
  }
  public getPhotoById(id: Photo['id']): Promise<Photo | null> {
    return this.prismaService.photo.findUnique({
      where: { id },
    });
  }
}
