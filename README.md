# appsync-sdk-custom-domain

## Endpoints

### Domain Name

`api2.davidmcafee.com`

### AppSync GraphQL Endpoint

`https://api2.davidmcafee.com/graphql`

### AppSync Real-time Endpoint

`wss://api2.davidmcafee.com/graphql/realtime`

## Tutorial

- https://www.youtube.com/watch?v=_DNInCYYzR8
- Note: When using with a third-party service, you will need to add the CNAME record to your domain to point to CloudFront. If using a Route53 managed url, add the CNAME record to Route53 as mentioned in the tutorial.

## Build:

### Apollo V3

```bash
cd /Users/mcafd/workplace/aws-mobile-appsync-sdk-js/packages/aws-appsync-auth-link
yarn && yarn prepare && yarn link
cd /Users/mcafd/workplace/aws-mobile-appsync-sdk-js/packages/aws-appsync-subscription-link
yarn && yarn prepare && yarn link
cd /Users/mcafd/workplace/appsync-sdk-custom-domain/react-apollo-V3-custom-domain
yarn && yarn link aws-appsync-auth-link && yarn link aws-appsync-subscription-link
```

### Apollo V2

```bash

```

## To test different auth types:

- Uncomment the specified auth type in `WithProvider.ts`
