import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
} from "@mikro-orm/decorators/legacy";

import { Collection } from "@mikro-orm/core";
import { Todo } from "./Todo";
import { FriendRequest } from "./FriendRequest";

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  email!: string;

  @Property()
  passwordHash!: string;

  @OneToMany(() => Todo, (todo) => todo.owner)
  todos = new Collection<Todo>(this);

  @OneToMany(() => FriendRequest, (fr) => fr.sender)
  sentRequests = new Collection<FriendRequest>(this);

  @OneToMany(() => FriendRequest, (fr) => fr.receiver)
  receivedRequests = new Collection<FriendRequest>(this);
}

//basically in here I have defined that every user has many todo's
// has user requests and can send user requests
