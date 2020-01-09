import * as redis from "redis"
export default class RedisUtils {

    private static instance: RedisUtils
    private static REDIS_PORT = 6379;
    private static REDIS_HOST = '127.0.0.1';
    private client: any = null;

    private constructor() {

        this.client = redis.createClient(RedisUtils.REDIS_PORT, RedisUtils.REDIS_HOST);
        this.client.on("error", function (err: any) {

            console.log("Error " + err);

        });
        this.client.on("message", function (channel: string, message: string) {

            console.log("message " + message + "  channel=" + channel);

        });
        this.client.on("subscribe", function (channel: string, count: number) {

            console.log("channel " + channel);

        });

    }

    static getInstance(): RedisUtils {
        if (!RedisUtils.instance) {
            RedisUtils.instance = new RedisUtils()
        }
        return this.instance;
    }
    public getRedisClient(): redis.RedisClient {

        if (this.client == null) {

            throw "client is null object";
            this.client = redis.createClient(RedisUtils.REDIS_PORT, RedisUtils.REDIS_HOST);
        }
        return this.client;

    }
    public delete4Print(key: string ): any {

        this.client.del(key, redis.print);
    }
    public exists(key: string ): any {

       return this.client.exists(key,(err: any, reply: any) => {

                console.log("exists  reply->"+reply);
       });
    }
    public set4Print(key: string, value: string): any {

        this.client.set(key, value, redis.print);
    }
    public  async  set(key: string, value: string)    {

        this.client.set(key, value, (err: any, reply: any) => {


            if (err === null) {
                console.log("--->>111");
                if (reply === 'OK') {   

                    return  new Promise<string>((resolve , rejects) => {

                        let  value  = reply;
                        console.log("--->>"+value);
                        this.client.expire(key,60*60*24);
                        resolve("ok");
    
                    })
  
                } else {

                    return  new Promise((resolve , rejects) => {

                        rejects();
    
                    })
                    
                }
                

            } else {

                console.log("--->>222");

                return  new Promise((resolve , rejects) => {

                    rejects();

                })
            }
        });
    }
    public     getData(key: string)  {

       
    }
    public async   get(key: string)  {

        this.client.get(key, async (err: any, reply: any) => {

            if (err === null) {

                return  new Promise<string>((resolve , rejects) => {

                    let  value  = reply;
                    console.log("--->>"+value);
                    resolve(value);

                })
                console.log("not  run  get  here");

            } else {

                return  new Promise((resolve , rejects) => {

                    rejects();

                })
                console.log("not 1 run  get  here");

            }

        });
    }

}