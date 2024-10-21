import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { lookup } from 'geoip-lite';
import { RequestTraceType } from "../types";
@Injectable()
export class TraceMiddleware implements NestMiddleware {
    private next;
    private getRequestInformations = async function (
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const { originalUrl, headers } = req;
            const ip = headers['x-forwarded-for'].toString();
            const userAgent = headers["user-agent"];
            const info = lookup(ip);
            if (info) {
                const { country, city, region } = info
                const requestTrace: RequestTraceType = {
                    url: originalUrl,
                    ip,
                    country,
                    region,
                    city,
                    userAgent
                };
                console.debug(`RECIEVING REQUEST FROM ${country} IN ${region} WITHIN ${city}`);
                req["user"] = requestTrace;
            } else {
                throw new Error("FAILD TO EXTRACT IP INFORMATIONS")
            }

        } catch (error) {
            console.debug(`ERROR WHILE EXTRACTING REQUEST INFORMATION AND GET ERROR`);
            console.error(error);
        } finally {
            return next();
        }
    };

    use(request: Request, response: Response, next: NextFunction) {
        this.next = next;
        this.getRequestInformations(request, response, this.next);
    }
}
