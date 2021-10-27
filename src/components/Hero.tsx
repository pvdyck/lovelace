import React from 'react'
import Particles from 'react-particles-js';
import { GatsbyImage } from 'gatsby-plugin-image'

import {
  blogHero,
  blogDetails,
  blogImage,
  blogTitle,
  blogContent,
  blogParticles,
  tsparticles
} from './styles/hero.module.less'

const Hero = ({ image, svg, title, content }: any) => (
  <div className={blogHero}>
    { svg ? (
      <div className={blogParticles}>
        <Particles
          params={{
            detectRetina: false,
            fpsLimit: 60,
            interactivity: {
              detectsOn: "canvas",
              events: {
                onHover: {
                  enable: true,
                  mode: ["connect"]
                },
                resize: true
              },
              modes: {
                connect: {
                  distance: 25,
                  radius: 50,
                  link: 30
                }
              }
            },
            particles: {
              color: {
                value: "#dd9cf4",
                animation: {
                  enable: false,
                  speed: 20,
                  sync: true
                }
              },
              lineLinked: {
                blink: false,
                color: "#500F82",
                consent: false,
                distance: 30,
                enable: true,
                opacity: 1,
                width: 1
              },
              move: {
                attract: {
                  enable: false,
                  rotate: {
                    x: 600,
                    y: 1200
                  }
                },
                bounce: false,
                direction: "none",
                enable: true,
                outMode: "bounce",
                random: true,
                speed: 0.5,
                straight: false
              },
              number: {
                density: {
                  enable: false,
                  area: 2000
                },
                limit: 0,
                value: 200
              },
              opacity: {
                animation: {
                  enable: true,
                  minimumValue: 0.05,
                  speed: 2,
                  sync: false
                },
                random: false,
                value: 1
              },
              shape: {
                type: "circle"
              },
              size: {
                animation: {
                  enable: false,
                  minimumValue: 0.1,
                  speed: 40,
                  sync: false
                },
                random: true,
                value: 1
              }
            },
            polygon: {
              draw: {
                enable: true,
                lineColor: "#dd9cf4",
                lineWidth: 0.8
              },
              move: {
                radius: 100
              },
              inlineArrangement: "equidistant",
              scale: 2,
              type: "inline",
              "url": "/svg/lovelace-logo2.svg",
            }
        }} />
      </div>
    ) : (
        <div className={blogImage}>
          <GatsbyImage className={blogImage} alt={title} image={image} />
        </div>
      )
    }
    <div className={blogDetails}>
      <h1 className={blogTitle}>{title}</h1>
      {content && <p className={blogContent}>{content}</p>}
    </div>
  </div>
)

export default Hero;
