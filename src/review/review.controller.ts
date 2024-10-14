import { 
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '../user/user.entity';


@Controller('review')
@UseGuards(AuthGuard('jwt'))
export class ReviewController {

    constructor(private reviewService: ReviewService) {}

    @Get('/all')
    async findAll() {
        return this.reviewService.findAll();
    }

    @Get('/fetch/:id')
    async findOne(@Param('id') id: number) {
        return this.reviewService.findOne(id);
    }

    @Post()
    async create(@Body() reviewDto: CreateReviewDto, @CurrentUser() user: User) {
        return this.reviewService.create(reviewDto, user);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updateDto: CreateReviewDto) {
        return this.reviewService.update(id, updateDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.reviewService.remove(id);
    }
}
