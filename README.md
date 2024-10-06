# Function API Client Demo with Typescript
This demo is to illustrate how to install and leverage Function's API Clients using Node and Typescript developer environment.

## Prerequisites
Setting up Buf Registry to pull Function's Typesafe API Client:
1. `npm config set @buf:registry https://buf.build/gen/npm/v1/`

## Run Demo
1. `npm install`
2. `npm start`

## Source Code
```typescript
import {createPromiseClient, Interceptor} from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import {
    APIGatewayService
} from "@buf/fxnlabs_api-gateway.connectrpc_es/apigateway/v1/apigateway_connect.js";

function createAPIClient() {
    // Adds API Key to each request
    const apiKeyInterceptor: Interceptor = (next) => async (req) => {
        req.header.set("x-api-key", process.env.FXN_API_KEY!)
        return await next(req);
    };

    // Creates the transport
    const transport = createConnectTransport({
        httpVersion: "1.1",
        baseUrl: "api.function.network",
        interceptors: [apiKeyInterceptor]
    });

    // Creates the client
    return createPromiseClient(APIGatewayService, transport);
}

async function main() {

    // Init the apiClient (should only be called once)
    const apiClient = createAPIClient()

    // Use API Client
    const response = await apiClient.embed({
        model: "bge-small-en-v1.5",
        input: "Embed me so I can use it for RAG Pipelines",
    })
    console.log(response.object)
    console.log(response.data)
}

main().then(res => console.log(res))
```
