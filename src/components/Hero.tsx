import React from 'react'
import SVGParticules from './SVGParticules';
import { GatsbyImage } from 'gatsby-plugin-image'

import {
  blogHero,
  blogDetails,
  blogImage,
  blogTitle,
  blogContent,
  blogDetailsCenter,
  blogParticles
} from './styles/hero.module.less'

const Hero = ({ image, svg, title, content, centered, heroImageNoText }: any) => (
  <div className={blogHero}>
    { svg ? (
      <div className={blogParticles}>
        <SVGParticules svg={svg}/>
      </div>
    ) : heroImageNoText ? (
        <div className={blogImage}>
          <GatsbyImage className={blogImage} alt={title} image={heroImageNoText} />
        </div>
      ) : (
        <div className={blogImage}>
          <GatsbyImage className={blogImage} alt={title} image={image} />
        </div>
      )
    }
    
    <div className={[blogDetails, centered ? blogDetailsCenter : []].join(' ')}>
      {title && <h1 className={blogTitle}>{title}</h1>}
      {content && <p className={blogContent}>{content}</p>}
    </div>
  </div>
)

export default Hero;
