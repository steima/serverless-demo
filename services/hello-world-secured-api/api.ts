import {APIGatewayProxyHandler} from "aws-lambda";
import {Responses} from "../../libs/responses";

export const test: APIGatewayProxyHandler = async (event, _context) => {
    return Responses.success(event);
}