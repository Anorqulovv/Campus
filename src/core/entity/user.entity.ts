import { Column, Entity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Event } from './event.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { Roles } from 'src/common/enum/userEnum';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  fullName?: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', unique: true })
  phoneNumber: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'enum', enum: Roles })
  role: Roles;

  @ManyToMany(() => Event, (event) => event.users)
  @JoinTable()
  events: Event[];
}
