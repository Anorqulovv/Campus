import { Column, Entity, ManyToMany} from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { Estatus } from 'src/common/enum/eventStatus';

@Entity('events')
export class Event extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar' })
  eventDate: Date;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'int' })
  maxParticipants: number;

  @Column({ type: 'enum', enum: Estatus, default: Estatus.OPEN })
  status: Estatus;

  @ManyToMany(() => User, (user) => user.events)
  users: User[];
}
