# Function API Client Demo with Typescript
This demo is to illustrate how to install and leverage Function's API Clients using Node and Typescript developer environment.

## Prerequisites
Setting up Buf Registry to pull Function's Typesafe API Client:
2. `npm config set @buf:registry https://buf.build/gen/npm/v1/`

## Run Demo
1. `npm install`
2. `npm start`

## Source Code
```typescript
import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";

import {
    APIGatewayService
} from "@buf/fxnlabs_api-gateway.connectrpc_es/apigateway/v1/apigateway_connect.js";

const transport = createConnectTransport({
    httpVersion: "1.1",
    baseUrl: "http://api.function.network"
});

const apiClient = createPromiseClient(APIGatewayService, transport);

async function main() {

    const response = await apiClient.chatComplete({
        model: "bge-small-en-v1.5",
        message: [
            {
                role: "user",
                content: "Tell me a long story",
            }
        ]
    })
}

main().then(res => console.log(res))
```