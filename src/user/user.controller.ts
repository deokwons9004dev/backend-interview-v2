/**
 * @file user.controller.ts
 * @module user/UserController
 * 
 * @description The module that represents the controller class for the user. 
 * entity. It provides methods for creating, finding, updating, and removing
 * users.
 * 
 * @author David Song <deokwons9004dev@gmail.com>
 * @version 1.0.0
 */

import {
    Controller,
    // Request,
    Req,
    Res,
    Get,
    Post,
    Body,
    Param,
    Query,
    Delete,
    Patch,
    UseGuards,
    NotFoundException,
    HttpCode,
    HttpStatus,
    UnauthorizedException,
    Session,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
// import { Response as ExpressResponse } from 'express';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
// import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UserController {

    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Get('whoami')
    // @UseGuards(AuthGuard)
    @UseGuards(AuthGuard('jwt'))
    whoami(@Req() req: any): User {
        return req.user;
    }

    @Post('signup')
    async signup(@Body() body: CreateUserDto): Promise<boolean> {
        return await this.authService.signup(body.email, body.password);
    }

    @Post('signin')
    async signin(@Body() body: LoginUserDto, @Res() res: Response) {
        const token = await this.authService.signin(body.email, body.password);
        console.log(token);

        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        }

        res.cookie('jwt', token.access_token, { 
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000, 
        });

        res.status(HttpStatus.OK).json({
            message: 'Login successful',
        });

        return token;
    }

    @Post('signout')
    @UseGuards(AuthGuard('jwt'))
    async signout(@Res() res: Response) {
        res.clearCookie('jwt');
        res.status(HttpStatus.OK).json({
            message: 'Logout successful',
        });
    }
}
