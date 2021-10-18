import React from 'react'

import './variables.css'
import './global.css'
import './styles/index.less'

import Seo from './seo'
import Header from './Header'
import Footer from './Footer'
class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
      <div className='App'>
        <div className='body'>
          <Seo />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </div>
      </>
    )
  }
}

export default Template
