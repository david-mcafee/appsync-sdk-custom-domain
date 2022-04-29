# appsync-sdk-custom-domain

## Domain Name

api2.davidmcafee.com

## AppSync GraphQL Endpoint

https://api2.davidmcafee.com/graphql

## AppSync Real-time Endpoint

wss://api2.davidmcafee.com/graphql/realtime

## Tutorial

- https://www.youtube.com/watch?v=_DNInCYYzR8
- Note: When using with a third-party service, you will need to add the CNAME record to your domain to point to CloudFront. If using a Route53 managed url, add the CNAME record to Route53 as mentioned in the tutorial.

## Misc:

- yarn && yarn build
- npx lerna exec --scope @aws-amplify/pubsub yarn build:esm:watch
- cp -r packages/pubsub/lib-esm /Users/mcafd/workplace/cd-api-test/iam/node_modules/@aws-amplify/pubsub/

## To test different auth types:

- Uncomment the specified auth type in `WithProvider.ts`
