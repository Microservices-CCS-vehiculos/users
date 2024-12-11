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
    const totalPage = await this.user.count();

    return {
      data: await this.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
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
        user_id: id
      }
    });

    if (!userById) {
      throw new NotFoundException(`User with id:${id} not found`);
    }

    return userById;



  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
