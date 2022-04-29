import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import {
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import awsExports from "./aws-exports";

import App from "./App";

const url = `https://api2.davidmcafee.com/graphql`;
const region = awsExports.aws_appsync_region;

// API KEY:
// const auth = {
//   type: 'API_KEY',
//   apiKey: awsExports.aws_appsync_apiKey,
// };

// COGNITO:
const auth = {
  type: "AMAZON_COGNITO_USER_POOLS",
  jwtToken: async () =>
    (await Auth.currentSession()).getIdToken().getJwtToken(),
};

// IAM:
// const auth = {
//   type: "AWS_IAM",
//   credentials: () => Auth.currentCredentials(),
// };

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  // https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/619
  createSubscriptionHandshakeLink({ url, region, auth }),
]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <App />
    <AmplifySignOut />
  </ApolloProvider>
);

export default withAuthenticator(WithProvider);
