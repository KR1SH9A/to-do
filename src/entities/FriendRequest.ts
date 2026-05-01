import {
  Entity,
  PrimaryKey,
  Enum,
  Property,
  ManyToOne,
  Unique,
} from "@mikro-orm/decorators/legacy";

import { Collection } from "@mikro-orm/core";

import { User } from "./User";

export enum FriendRequestStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

@Entity()
@Unique({ properties: ["sender", "receiver"] })
export class FriendRequest {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => User)
  sender!: User;

  @ManyToOne(() => User)
  receiver!: User;

  @Enum(() => FriendRequestStatus)
  status: FriendRequestStatus = FriendRequestStatus.PENDING;

  @Property()
  createdAt: Date = new Date();
}
