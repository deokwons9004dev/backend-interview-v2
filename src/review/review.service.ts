import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dtos/create-review.dto';
import { ProductService } from '../product/product.service';
import { User } from '../user/user.entity';

@Injectable()
export class ReviewService {

    constructor(
        private productService: ProductService,
        @InjectRepository(Review) private repo: Repository<Review>,
    ){}

    async create(reviewDto: CreateReviewDto, user: User): Promise<Review> {
        const review = this.repo.create(reviewDto);
        const product = await this.productService.findOne(reviewDto.productId);
        review.product = product;
        review.user = user;

        console.log(`product: ${product}`);
        console.log(`user: ${user}`);
        console.log(`review: ${review}`);

        return this.repo.save(review);
    }

    findOne(id: number): Promise<Review> {
        return this.repo.findOne({ where: { id } });
    }

    findAll(): Promise<Review[]> {
        return this.repo.find();
    }

    async remove(id: number): Promise<void> {
        const review = await this.findOne(id);
        await this.repo.remove(review);
    }

    async update(id: number, updateDto: CreateReviewDto): Promise<Review> {
        const review = await this.findOne(id);
        if (!review) return null;

        this.repo.merge(review, updateDto);
        return this.repo.save(review);
    }
}
