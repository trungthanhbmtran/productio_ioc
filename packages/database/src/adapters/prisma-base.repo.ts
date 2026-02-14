import { IBaseRepository } from '../interfaces/base-repo.interface';
import { PrismaService } from '../prisma/prisma.service';

export abstract class PrismaBaseRepository<T> implements IBaseRepository<T> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly modelName: string // Ví dụ: 'user' hoặc 'product'
  ) { }

  get model() { return this.prisma[this.modelName]; }

  async findAll() {
    return this.model.findMany();
  }

  async findById(id: any) { 
    return this.model.findUnique({ where: { id } }); 
  }
  
  async findOne(filter: any) { 
    return this.model.findFirst({ where: filter }); 
  }

  async create(data: any) { 
    return this.model.create({ data }); 
  }
  
  async update(id: any, data: any) {
     return this.model.update({ where: { id }, data }); 
  }

  async delete(id: any) {
    await this.model.delete({ where: { id } });
    return true;
  }
}