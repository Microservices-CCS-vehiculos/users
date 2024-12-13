import { BadRequestException, Injectable, Logger, NotFoundException, OnModuleInit,} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('UsersService');
  
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected DB');
  }
  create(createUserDto: CreateUserDto) {
    
    return this.user.create({
      data: createUserDto
    }); 
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPage = await this.user.count({where: {availebel: true}});

    return {
      data: await this.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          availebel: true
        }
      }),
      meta: {
        page: page,
        limit: limit,
        totalPage: Math.ceil(totalPage / limit)
      }
    }
  }

  async findOne(id: string) {
     const userById =  await this.user.findUnique({
      where: {
        user_id: id,
        availebel: true
      }
    });

    if (!userById) {
      throw new NotFoundException(`User with id:${id} not found`);
    }

    return userById;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.user.update({
      where: {
        user_id: id
      },
      data: updateUserDto
    });
    
  }

  async remove(id: string) {
    try {
      const updatedUser = await this.user.update({
        where: {
          user_id: id,
          availebel: true, // Solo actualiza si el usuario está disponible (true)
        },
        data: {
          availebel: false, 
        },
      });
  
      return updatedUser;
    } catch (error) {
      if (error.code === 'P2025') { // Error original de prisma
        throw new NotFoundException(`El usuario con id:${id} no existe o no está disponible`);
      }
    }
  }
}
