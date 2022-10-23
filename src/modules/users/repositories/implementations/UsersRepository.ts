import { userInfo } from 'os';
import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = await this.repository.findOne({
      relations: ["games"],
      where: { id: user_id },
    }) as User

    return user; // Complete usando ORM
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = await this.repository.query("select * from users order by first_name asc"); 

    return users; // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(`SELECT * FROM users WHERE first_name ILIKE '%${first_name}%' AND last_name ILIKE '%${last_name}%'`);  // Complete usando raw query

  }
}
