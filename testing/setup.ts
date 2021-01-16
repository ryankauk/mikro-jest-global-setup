import { MikroORM } from "@mikro-orm/core";
import { config } from "../db/config";

export default async () => {
  (global as any).__mikro = await MikroORM.init(config());
};
