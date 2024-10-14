import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../user/constants';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    // console.log(`req.cookies.jwt: ${req?.cookies?.jwt}`);
                    // console.log(`req?.cookies?: ${JSON.stringify(req)}`);
                    // console.log(`req.cookies: ${req?.cookies}`);
                    console.log(`req.cookies: ${JSON.stringify(req?.cookies)}`);
                    return req?.cookies?.jwt || null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        console.log(`payload: ${JSON.stringify(payload)}`);
        return { 
            id    : payload.sub, 
            email : payload.email, 
            role  : payload.role 
        };
    }
}