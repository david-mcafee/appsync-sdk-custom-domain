# appsync-sdk-custom-domain

## Domain Name

api.davidmcafee.com

## AppSync Domain Name

d1qeotpk9797l5.cloudfront.net

## AppSync GraphQL Endpoint

https://api.davidmcafee.com/graphql

## AppSync Real-time Endpoint

wss://api.davidmcafee.com/graphql/realtime

curl -s -XPOST https://api.davidmcafee.com/graphql -H "Content-Type:application/graphql" -H "x-api-key:da2-dnpf6tuipzfmniwgrzpfxsmasa" -d '{"query": "mutation CreateTodo ($name: String!) {createTodo(description: $name) {id name}}","variables":"{\"name\":\"Birthday\"}"}'
