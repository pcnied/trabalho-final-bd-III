import { Redis } from "ioredis";
import { redisEnvs } from "../../app/envs";

export const redis = new Redis(redisEnvs.url);
