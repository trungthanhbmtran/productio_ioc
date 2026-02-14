export class UserEntity {
    id: number;
    email: string;
    password?: string;
    fullName?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }