import { Model, ModelStatic } from 'sequelize-typescript';
import { IBaseRepository } from '../../interfaces/base-repo.interface';

export abstract class SequelizeBaseRepository<T extends Model> implements IBaseRepository<T> {
  constructor(protected readonly model: ModelStatic<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.findAll() as any;
  }

  async findById(id: number | string): Promise<T | null> {
    return this.model.findByPk(id) as any;
  }

  async findOne(filter: Partial<T>): Promise<T | null> {
    return this.model.findOne({ where: filter as any }) as any;
  }

  async create(data: Partial<T>): Promise<T> {
    return this.model.create(data as any) as any;
  }

  async update(id: number | string, data: Partial<T>): Promise<T> {
    await this.model.update(data as any, { where: { id } as any });
    return this.findById(id) as any;
  }

  async delete(id: number | string): Promise<boolean> {
    const deletedRows = await this.model.destroy({ where: { id } as any });
    return deletedRows > 0;
  }
}