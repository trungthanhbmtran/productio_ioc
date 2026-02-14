export interface IBaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number | string): Promise<T | null>;
  findOne(filter: Partial<T>): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number | string, data: Partial<T>): Promise<T>;
  delete(id: number | string): Promise<boolean>;
}

// File: src/interfaces/user-repo.interface.ts
import { UserEntity } from '../models/user.entity';
import { IBaseRepository } from './base-repo.interface';

export interface IUserRepository extends IBaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
}