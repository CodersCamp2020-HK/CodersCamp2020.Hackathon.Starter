import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from '../infrastructure/auth/bcrypt.service';
import { User } from '../infrastructure/database/entities';
import { EmailService } from '../infrastructure/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private readonly emailService: EmailService,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!(user && (await this.bcryptService.verify(password, user.password))))
      throw new UnauthorizedException('Invalid password');
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: Partial<User>) {
    const user = await this.usersRepository.findOne({
      where: { email: userDto.email },
    });
    if (user)
      throw new BadRequestException('User with this email already exists');
    userDto.password = await this.bcryptService.hash(userDto.password);
    const createdUser = await this.usersRepository.save(userDto);
    await this.emailService.sendWelcomeEmail(createdUser.email);
    return createdUser;
  }
}
