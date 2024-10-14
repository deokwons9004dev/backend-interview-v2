import {
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min,
} from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    @Max(8000)
    comment: string;

    @IsNumber()
    @IsInt()
    @IsNotEmpty()
    productId: number;
}