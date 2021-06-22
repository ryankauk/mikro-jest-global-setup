import { Embedded, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { SubModel } from "./SubModel.entity";

@Entity()
export class AnyModel {
  @PrimaryKey()
  id: string;

  @Property()
  name?: string;

  @Embedded({ nullable: true })
  sub?: SubModel = new SubModel();
}
