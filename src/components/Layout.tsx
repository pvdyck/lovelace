import React from 'react'

import './variables.css'
import './global.css'
import './index.css'

import Seo from './Seo'
import Header from './Header'
import Footer from './Footer'
import StickyShare from './StickyShare'
class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className='App'>
        <div>
          <div className="body">
            <Seo />
            <Header />
            <main>{children}</main>
            <StickyShare />
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

export default Template
