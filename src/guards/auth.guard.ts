import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../user/constants';
import { User } from '../user/user.entity';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<Request>();
        const authorization = request.headers['authorization'];
        if (!authorization) {
            throw new UnauthorizedException('Unauthorized: No token provided');
        }

        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException('Unauthorized: Invalid token header');
        }

        try {
            const payload = this.jwtService.verify(token, { secret: jwtConstants.secret });
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Unauthorized: Invalid token');
        }
    }
}