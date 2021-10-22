import React from 'react'
import Layout from '../components/Layout'

class ErrorPage extends React.Component {
  render() {

    return (
      <Layout location={this.props.location}>
        <div className='error-page'>
          <h1>Sorry it look like this page doesn't exist</h1>
        </div>
      </Layout>
    )
  }
}

export default ErrorPage
