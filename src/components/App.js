import React, { Component } from 'react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
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
      .then(query => this.setState({ ants: query.data.ants }))
  }

  render() {

    if (this.props.allAntsQuery.loading) {
      return (
        <div>Loading ants </div>
      )
    }

    return (
      <AntList ants={this.state.ants} />
    );
  }
}

const ALL_ANTS_QUERY = gql`
query allPostsQuery {
  ants {
    name
    color
    length
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