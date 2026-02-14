import { Repository } from 'typeorm';
import { IBaseRepository } from '../interfaces/base-repo.interface';

export abstract class TypeOrmBaseRepository<T> implements IBaseRepository<T> {
  constructor(protected readonly repo: Repository<any>) {}

  async findAll() { 
    return this.repo.find(); 
  }

  async findById(id: any) {
     return this.repo.findOne({ where: { id } }); 
  }

  async findOne(filter: any) { 
    return this.repo.findOne({ where: filter }); 
  }

  async create(data: any) {
     return this.repo.save(data); 
  }

  async update(id: any, data: any) { 
    await this.repo.update(id, data);
    return this.findById(id);
  }
  
  async delete(id: any) { 
    const res = await this.repo.delete(id);
    return res.affected > 0;
  }
}