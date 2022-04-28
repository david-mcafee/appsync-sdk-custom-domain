import { createAuthLink } from 'aws-appsync-auth-link';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';

import {
	ApolloLink,
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
} from '@apollo/client';

import AppSyncConfig from './aws-exports';

import App from './App';

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;
const auth = {
	type: 'API_KEY',
	apiKey: 'da2-u2d6ol5adbaopmdcwlhguhpvji',
};

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
	</ApolloProvider>
);

export default WithProvider;
