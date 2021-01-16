import { MikroORM, RequestContext } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";

import { config } from "../db/config";
let orm: MikroORM<MongoDriver>;
describe("mikro jest", () => {
  beforeAll(async () => (orm = await MikroORM.init(config())));
  test("should work", async () => {
    orm = await MikroORM.init(config());
    await RequestContext.createAsync({ fork() {} } as any, async () => {
      process.domain = null;
    });
  });
  afterAll(() => orm.close());
});
