import {APIGatewayProxyHandler} from "aws-lambda";
import {Responses} from "../../libs/responses";

export const healthCheck: APIGatewayProxyHandler = async (_event, _context) => {
    return Responses.noContent();
}