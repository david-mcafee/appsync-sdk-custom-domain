import AWSAppSyncClient from "aws-appsync";
import AppSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
// import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import App from "./App";
import awsExports from "./aws-exports";

// API KEY:
const auth = {
  type: "API_KEY",
  apiKey: awsExports.aws_appsync_apiKey,
};

// COGNITO:
// const auth = {
//   type: "AMAZON_COGNITO_USER_POOLS",
//   jwtToken: async () =>
//     (await Auth.currentSession()).getIdToken().getJwtToken(),
// };

// IAM:
// const auth = {
//   type: "AWS_IAM",
//   credentials: () => Auth.currentCredentials(),
// };

const client = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth,
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AmplifySignOut />
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(WithProvider);
