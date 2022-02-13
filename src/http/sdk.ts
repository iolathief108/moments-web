import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "./generated";
import { isServer } from "../utils/pageUtils";
import { getBaseUrl } from "../utils/other";


export const client = new GraphQLClient(isServer() ?
    "http://localhost/api/"
    : getBaseUrl() + "/api/"
);
const sdk = getSdkWithHooks(client);
export default sdk;
