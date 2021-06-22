import { Embeddable, Property } from "@mikro-orm/core";

@Embeddable()
export class SubModel {
  @Property({ nullable: true })
  "some-prop-with-hyphens"?: string;
}
