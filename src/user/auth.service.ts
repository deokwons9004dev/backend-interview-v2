import { 
    Injectable, 
    UnauthorizedException,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';

// import passwordHash from 'pbkdf2-password-hash';
const passwordHash = require('pbkdf2-password-hash');

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async signup(email: string, password: string): Promise<boolean> {
        const user = await this.userService.findUserByEmail(email);
        if (user) 
            throw new BadRequestException('User with given email exists.');

        const hash = await passwordHash.hash(password);
        const newUser = await this.userService.createUser(email, hash, 'user');
        return true;
    }

    async signin(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.userService.findUserByEmail(email);
        if (!user) 
            throw new NotFoundException('User with given email not found.');

        const isValid = await passwordHash.compare(password, user.password);
        if (!isValid) 
            throw new UnauthorizedException('Invalid password.');

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}