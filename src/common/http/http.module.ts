import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { Axios } from "axios";
import { AXIOS_INSTANCE_TOKEN } from "../constants";




@Global()
@Module({
    imports: [HttpModule, ConfigModule],
    providers: [
        {
            provide: AXIOS_INSTANCE_TOKEN,
            useValue: Axios,
        },
    ],
    exports: [],
})
export class HttpClientModule extends HttpModule { }
