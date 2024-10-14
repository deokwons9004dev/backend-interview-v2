import {
    IsString,
    IsNumber,
    IsPositive,
    IsLongitude,
    IsLatitude,
    IsNotEmpty,
    IsInt,
    Min,
    Max,
    IsAlphanumeric,
    IsEnum,
} from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    brand: string;

    @IsNumber()
    // @IsPositive()
    @Min(0)
    @Max(100000000)
    price: number;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsEnum(['S', 'M', 'L', 'XL'])
    size: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    color: string;
}