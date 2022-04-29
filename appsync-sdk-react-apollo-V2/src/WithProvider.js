import AWSAppSyncClient from "aws-appsync";
import AppSyncConfig from "./aws-exports";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import App from "./App";

const url = `https://api2.davidmcafee.com/graphql`;

// API KEY
const client = new AWSAppSyncClient({
  url,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
  },
});

// COGNITO
// const client = new AWSAppSyncClient({
//   url,
//   region: AppSyncConfig.aws_appsync_region,
//   auth: {
//     type: AppSyncConfig.aws_appsync_authenticationType,
//     jwtToken: async () =>
//       (await Auth.currentSession()).getIdToken().getJwtToken(),
//   },
// });

// IAM
// const client = new AWSAppSyncClient({
//   url,
//   region: AppSyncConfig.aws_appsync_region,
//   auth: {
//     type: AppSyncConfig.aws_appsync_authenticationType,
//     credentials: () => Auth.currentCredentials(),
//   },
// });

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(WithProvider);
