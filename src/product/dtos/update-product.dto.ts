import {
    IsString,
    IsNumber,
    IsPositive,
    IsNotEmpty,
    Min,
    Max,
    IsAlphanumeric,
    IsEnum,
    IsOptional
} from 'class-validator';

export class UpdateProductDto {

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsOptional()
    brand: string;

    @IsNumber()
    // @IsPositive()
    @Min(0)
    @Max(100000000)
    @IsOptional()
    price: number;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsEnum(['S', 'M', 'L', 'XL'])
    @IsOptional()
    size: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
    @IsOptional()
    color: string;
}