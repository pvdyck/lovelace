import React from 'react'
import { Link } from 'gatsby'

import {
  container,
  logoLink,
  logo,
  navigationItem,
  navigation,
} from './styles/navigation.module.css'

const Navigation = () => (
  <nav role="navigation" className={container} aria-label="Main">
    <Link to="/" className={logoLink}>
      <span className={logo} />
      <span className={navigationItem}>Gatsby Starter Contentful</span>
    </Link>
    <ul className={navigation}>
      <li className={navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navigation
