import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product) private repo: Repository<Product>,
    ){}

    create(productDto: CreateProductDto): Promise<Product> {
        const product = this.repo.create(productDto);
        return this.repo.save(product);
    }

    findOne(id: number): Promise<Product> {
        const product = this.repo.findOne({ where: { id } });
        if (!product) 
            throw new NotFoundException(`Product with ID ${id} not found`);
        return product;
    }

    findAll(): Promise<Product[]> {
        return this.repo.find();
    }

    async remove(id: number): Promise<void> {
        const product = await this.findOne(id);
        await this.repo.remove(product);
    }

    async update(id: number, updateDto: UpdateProductDto): Promise<Product> {
        const product = await this.findOne(id);
        if (!product) 
            throw new NotFoundException(`Product with ID ${id} not found`);

        this.repo.merge(product, updateDto);
        return this.repo.save(product);
    }

    async search(filters?: string, sort?: string, order?: string): Promise<Product[]> {

        const filterKVList = filters ? filters.split(',').map((filter) => filter.split(':')) : [];

        const query = this.repo.createQueryBuilder('Product').select();
        filterKVList.forEach(([key, value]) => {
            query.andWhere(`Product.${key} = :${key}`, { [key]: value });
        });

        sort  = sort ? sort.toLowerCase() : 'name';
        order = order ? order.toUpperCase() : 'ASC';

        query.orderBy(`Product.${sort}`, order as 'ASC' | 'DESC');
        return await query.getMany();
    }
}
