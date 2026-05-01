import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
} from "@mikro-orm/decorators/legacy";

import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  isCompleted: boolean = false;

  @Property()
  createdOn: number = Date.now();

  @Property()
  about?: string;

  @Property()
  reminderTime?: Date | null;

  @ManyToOne(() => User)
  owner!: User;
}
