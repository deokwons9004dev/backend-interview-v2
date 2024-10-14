import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

//TODO: Create a JWTStrategy file.

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { User } from './user/user.entity';

import { cookieConstants } from './user/constants';
import { Product } from './product/product.entity';
import { Review } from './review/review.entity';
import { ReviewModule } from './review/review.module';

const cookieSession = require('cookie-session');

@Module({
    imports: [
        
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        UserModule,
        ProductModule,
        ReviewModule,
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [User, Product, Review],
            synchronize: true,
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService
        // TODO: Add a global validation pipe.
    ],
})
export class AppModule {

    // constructor(private configService: ConfigService) { }

    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(cookieSession({
    //         keys: [cookieConstants.secret],
    //     })).forRoutes('*');
    // }

}
