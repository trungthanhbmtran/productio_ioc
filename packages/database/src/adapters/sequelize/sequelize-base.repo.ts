import { Model, ModelStatic } from 'sequelize-typescript';
import { IBaseRepository } from '../../interfaces/base-repo.interface';

export abstract class SequelizeBaseRepository<T extends Model> implements IBaseRepository<T> {
  constructor(protected readonly model: ModelStatic<T>) {}

  // Hàm helper để convert sang Plain Object (Dữ liệu thô)
  protected toEntity(data: any): any {
    if (!data) return null;
    if (Array.isArray(data)) return data.map(item => item.get({ plain: true }));
    return data.get({ plain: true });
  }

  async findAll() {
    const records = await this.model.findAll();
    return this.toEntity(records);
  }

  async findById(id: number | string) {
    const record = await this.model.findByPk(id);
    return this.toEntity(record);
  }

  async findOne(filter: any) {
    const record = await this.model.findOne({ where: filter });
    return this.toEntity(record);
  }

  async create(data: any) {
    const record = await this.model.create(data);
    return this.toEntity(record);
  }

  async update(id: any, data: any) {
    await this.model.update(data, { where: { id } });
    return this.findById(id);
  }

  async delete(id: any) {
    const count = await this.model.destroy({ where: { id } });
    return count > 0;
  }
}