import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('UsersService');
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected DB');
  }
  create(createUserDto: CreateUserDto) {
    const { name, username, email, password, role_id } = createUserDto;
    return `This action adds a new user named ${name} with username: ${username}, email: ${email}, password: ${password}, role_id ${role_id}`;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
