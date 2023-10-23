import { randomUUID } from "crypto";
import { Anotation } from "./app/models";
import { RedisConnection } from "./main/database/ioredis.connection";

async function teste() {
  await RedisConnection.connect();

  const redis = RedisConnection.connection;

  console.log(await redis.set("nome", "Rosani"));
  console.log(await redis.get("nome"));
  await redis.del("nome");
  console.log(await redis.get("nome"));

  const anotation = new Anotation(
    randomUUID(),
    randomUUID(),
    "Meu título",
    "Minha descrição",
    new Date(),
    false
  );

  await redis.set("anotação-1", JSON.stringify(anotation.toJSON()));
  const anotationCache = await redis.get("anotação-1");
  console.log(JSON.parse(anotationCache ?? "{}"));
}

teste();
