import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/all')
    async findAll() {
        return this.productService.findAll();
    }

    @Get('/find')
    async search(@Query('filters') filters?: string, @Query('sort') sort?: string, @Query('order') order?: string) {
        return this.productService.search(filters, sort, order);
    } 

    @Get('/fetch/:id')
    async findOne(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Post()
    async create(@Body() productDto: CreateProductDto) {
        return this.productService.create(productDto);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateDto: UpdateProductDto) {
        return this.productService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.productService.remove(id);
    }
}
