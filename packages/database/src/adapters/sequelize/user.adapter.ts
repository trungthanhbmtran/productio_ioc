import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../sequelize/models/user.model'; // Model Sequelize của bạn
import { SequelizeBaseRepository } from './sequelize-base.repo';
import { IUserRepository } from '../../interfaces/user-repository.interface';
import { UserEntity } from '../../models/user.entity';

@Injectable()
export class SequelizeUserAdapter 
  extends SequelizeBaseRepository<User> 
  implements IUserRepository 
{
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super(userModel);
  }

  // Ghi đè hoặc thêm mới các method đặc thù
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ where: { email } });
    return user ? (user.get({ plain: true }) as UserEntity) : null;
  }
}