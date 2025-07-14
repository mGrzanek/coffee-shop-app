import {
  Controller,
  Get,
  Put,
  Body,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LikeProductDTO } from './dtos/like-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  async getAll() {
    return this.productsService.getAll();
  }
  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
  @Put('/product/like')
  @UseGuards(JwtAuthGuard)
  async likeProduct(@Body() likeProductData: LikeProductDTO) {
    const product = await this.getById(likeProductData.productId);
    if (product) {
      const isLiked = product.users.some(
        (user) => user.id === likeProductData.userId,
      );
      if (!isLiked) {
        return this.productsService.likeProduct(
          likeProductData.productId,
          likeProductData.userId,
        );
      } else {
        return this.productsService.unlikeProduct(
          likeProductData.productId,
          likeProductData.userId,
        );
      }
    } else throw new NotFoundException('Product not found');
  }
}
