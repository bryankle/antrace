import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Header, Container } from 'semantic-ui-react'
import AntList from './AntList'

class App extends Component {

  constructor() {
    super();
    this.state = {
      ants: []
    }
  }

  componentWillMount() {
    this.props.allAntsQuery
      .refetch()
      .then((query) => this.setState({ ants: query.data.ants }))
  }

  render() {

    if (this.props.allAntsQuery.loading) {
      return (
        <div>Loading ants </div>
      )
    }
    console.log('this.state', this.state.ants)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AntList />
      </div>
    );
  }
}

const ALL_ANTS_QUERY = gql`
query allPostsQuery {
  ants {
    name
    weight
  }
}
`

const AppWithQuery = graphql(ALL_ANTS_QUERY, {
  name: 'allAntsQuery',
  options: {
    fetchPolicy: 'network-only',
  },
})(App)

export default AppWithQuery