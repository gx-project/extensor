import { Redis } from "ioredis";

export default class IORedisStorageAdapter implements Extensor.Storage {
  constructor(public client: Redis) {}

  get(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: any) {
    return this.client.set(key, value);
  }

  del(key: string) {
    return this.client.del(key);
  }

  deleteAll(keys: string[]) {
    return this.client.del.apply(this.client, keys);
  }
}
