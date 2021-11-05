
import React from 'react'
import {Link} from 'react-scroll'
import {
  scrollDown,
  arrowDown,
  scrollTitle
} from './styles/scroll-down.module.less'

const ScrollDown = (props:any) => {
  return (
    <Link
      to={props.scrollTo}
      py={true}
      smooth={true}
      className={scrollDown
    }>
      <span className={arrowDown}/>
      <span className={scrollTitle}>
        Scroll down
      </span>
    </Link>
  )
}

export default ScrollDown
