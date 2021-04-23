import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { User } from '../infrastructure/database/entities';
import { CrudRequest } from '@nestjsx/crud';
import { BcryptService } from '../infrastructure/auth/bcrypt.service';

@Injectable()
class UsersService extends TypeOrmCrudService<User> {
  constructor(
    @InjectRepository(User) usersRepository: Repository<User>,
    private bcryptService: BcryptService,
  ) {
    super(usersRepository);
  }

  async updateOne(crudRequest: CrudRequest, dto: DeepPartial<User>) {
    if (dto.password !== undefined) {
      super.throwBadRequestException(
        'Unable to change password with update route',
      );
    }
    return await super.updateOne(crudRequest, dto);
  }

  async deleteOne(crudRequest: CrudRequest) {
    const myEntity = await this.getOneOrFail(crudRequest);
    return this.repo.softRemove(myEntity);
  }
}

export { UsersService };
