import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewController } from './review.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtConstants } from '../user/constants';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ProductModule } from '../product/product.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: jwtConstants.secret,
                signOptions: { expiresIn: '1h' },
                global: true,
            }),
        }),
        TypeOrmModule.forFeature([Review]),
        ProductModule,
    ],
    providers: [ReviewService, JwtStrategy],
    controllers: [ReviewController]
})
export class ReviewModule { }
