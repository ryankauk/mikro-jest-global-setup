import { Options } from "@mikro-orm/core";

import { MongoDriver } from "@mikro-orm/mongodb";
import { AnyModel } from "./AnyModel.entity";
import { SubModel } from "./SubModel.entity";

export const config = (clientUrl?: string): Options<MongoDriver> => ({
  entities: [AnyModel, SubModel],
  type: "mongo", // one of `mongo` | `mysql` | `mariadb` | `postgresql` | `sqlite`
  clientUrl: clientUrl || "mongodb://localhost:27017/any",
  forceUtcTimezone: true,
  validate: true,
  populateAfterFlush: true,
  ensureIndexes: true,
  forceEntityConstructor: [AnyModel],
});
