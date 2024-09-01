import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import {
    APIGatewayService
} from "@buf/functionnetworklabs_api-gateway.connectrpc_es/apigateway/v1/apigateway_connect.js";

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: "http://localhost:8080",
});

const apiClient = createPromiseClient(APIGatewayService, transport);

async function main() {
    apiClient.embed({
        model: "123",
        input: "123",
    })
}

main().then(res => console.log(res))