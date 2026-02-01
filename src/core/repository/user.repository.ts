import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export type UserRopository = Repository<User>;
