import { Entity, MikroORM, PrimaryKey } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";

import { Embeddable, Embedded, Property } from "@mikro-orm/core";
@Embeddable()
class AnotherSubModel {
  // @Property({ nullable: true, fieldName: "some-prop-with-hyphens" })
  // "some_prop_with_hyphens"?: string = "hello";

  @Property({ nullable: true })
  "some_other_prop_with_hyphens"?: number;
}

@Embeddable()
class SubModel {
  @Embedded({})
  anotherSubModel: AnotherSubModel = new AnotherSubModel();

  @Property({ nullable: true })
  "some_prop"?: number;
}

@Entity()
class AnyModel {
  // @OnInit()
  // doStuffOnInit() {
  //   if (this.sub && !this.sub.anotherSubModel)
  //     this.sub.anotherSubModel = new AnotherSubModel();
  // }
  @PrimaryKey()
  id: string;

  @Property()
  name?: string;

  @Embedded({ nullable: true, entity: () => SubModel })
  sub?: SubModel = new SubModel();

  @Embedded({ nullable: true, object: true, entity: () => SubModel })
  subObject?: SubModel = new SubModel();
}

let orm: MikroORM<MongoDriver>;
describe("mikro jest", () => {
  beforeAll(
    async () =>
      (orm = await MikroORM.init({
        entities: [AnyModel, SubModel, AnotherSubModel],
        type: "mongo", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
        clientUrl: "mongodb://localhost:27017/any",
        forceUtcTimezone: true,
        validate: true,
        populateAfterFlush: true,
        ensureIndexes: true,
        forceEntityConstructor: [AnyModel, AnotherSubModel],

        debug: true,
      }))
  );

  test("test embedded model with initializer", async () => {
    const model = new AnyModel();
    model.sub.some_prop = 12;
    await orm.em.persistAndFlush(model);
    orm.em.clear();
    const newValue = await orm.em.findOne(AnyModel, { id: model.id });
    console.log(newValue);
    expect(newValue.sub.anotherSubModel).toBeTruthy();
  });
  // test("should work", async () => {
  //   await RequestContext.createAsync({ fork() {} } as any, async () => {
  //     process.domain = null;
  //   });
  // });
  afterAll(() => orm.close());
});
