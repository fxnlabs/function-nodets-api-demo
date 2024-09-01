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
    const response = await apiClient.embed({
        model: "bge-small-en-v1.5",
        input: "Embed me so I can use it for RAG Pipelines",
    })
    console.log(response.object)
    console.log(response.data)
}

main().then(res => console.log(res))