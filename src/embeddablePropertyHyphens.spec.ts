import { Entity, MikroORM, PrimaryKey } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";

import { Embeddable, Embedded, Property } from "@mikro-orm/core";

@Embeddable()
class SubModel {
  @Property({ nullable: true })
  "anyProp"?: string;
}

@Entity()
class AnyModel {
  @PrimaryKey()
  id: string;

  @Property()
  name?: string;

  @Embedded({ nullable: true, object: true, entity: () => SubModel })
  "sub-object"?: SubModel = new SubModel();
}

let orm: MikroORM<MongoDriver>;
describe("mikro jest", () => {
  beforeAll(
    async () =>
      (orm = await MikroORM.init({
        entities: [AnyModel, SubModel],
        type: "mongo", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
        clientUrl: "mongodb://localhost:27017/any",
        forceUtcTimezone: true,
        validate: true,
        populateAfterFlush: true,
        ensureIndexes: true,
        forceEntityConstructor: [AnyModel, SubModel],

        debug: true,
      }))
  );

  test("test embedded model with property and hyphens", async () => {
    const model = new AnyModel();

    await orm.em.persistAndFlush(model);
    // orm.em.clear();
    const newValue = await orm.em.findOne(AnyModel, { id: model.id });

    console.log(newValue);
  });

  // test("should work", async () => {
  //   await RequestContext.createAsync({ fork() {} } as any, async () => {
  //     process.domain = null;
  //   });
  // });
  afterAll(() => orm.close());
});
