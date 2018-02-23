import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './components/App';
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import registerServiceWorker from './registerServiceWorker';

const httpLink = new HttpLink({ uri: 'https://antserver-blocjgjbpw.now.sh/graphql' })

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

ReactDOM.render(<ApolloProvider client={client}>
    <App />
</ApolloProvider>, document.getElementById('root'));
registerServiceWorker();
