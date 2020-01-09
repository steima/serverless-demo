import { APIGatewayProxyResult } from "aws-lambda";

export class Responses {

    static HEADERS = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    };

    static response(code: number, object: any): APIGatewayProxyResult {
        return {
            statusCode: code,
            body: JSON.stringify(object, null, 2),
            headers: this.HEADERS
        };
    }

    static success(object: any): APIGatewayProxyResult {
        return this.response(200, object);
    }

    static noContent(): APIGatewayProxyResult {
        return this.response(204, {});
    }

    static error(code:number, message: string): APIGatewayProxyResult {
        return this.response(code, { message: message });
    }

    static notFound(message: string): APIGatewayProxyResult {
        return this.error(404, message);
    }

}