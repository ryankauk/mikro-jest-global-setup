import { MikroORM, RequestContext } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";
import { AnyModel } from "../db/AnyModel.entity";

import { config } from "../db/config";

let orm: MikroORM<MongoDriver>;
describe("mikro jest", () => {
  beforeAll(async () => (orm = await MikroORM.init(config())));
  //test("should work", async () => {
  //  orm = await MikroORM.init(config());
  //  await RequestContext.createAsync({ fork() {} } as any, async () => {
  //    process.domain = null;
  //  });
  });
  test("test embedded model with property and hyphens", async () => {
    const model = new AnyModel();
    await orm.em.persistAndFlush(model);
  });
  afterAll(() => orm.close());
});
