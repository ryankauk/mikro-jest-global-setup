import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class AnyModel {
  @PrimaryKey()
  id: string;

  @Property()
  name?: string;
}
