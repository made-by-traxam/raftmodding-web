import { hashSync } from 'bcryptjs';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { generateToken } from '../utils';
import { AbstractEntityWithGeneratedId } from './AbstractEntityWithGeneratedId';

@Entity({ name: 'account-creations' })
export class AccountCreation extends AbstractEntityWithGeneratedId {
  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  token!: string;

  //hooks

  @BeforeInsert()
  hashPassword() {
    this.password = hashSync(this.password); // TODO: this should not be in the DB logic! Also rename password to passwordHash
  }

  @BeforeInsert()
  generateToken() {
    this.token = generateToken();
  }
}
