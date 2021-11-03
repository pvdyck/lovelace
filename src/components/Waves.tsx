import React, { useRef, useEffect } from 'react'
import SineWaves from 'sine-waves'
import { wave } from './styles/waves.module.less'

const createWave = (el:HTMLCanvasElement) => {
  console.log(el.width)
  const waves = new SineWaves({
    // Canvas Element
    el: el,

    width: document.documentElement.clientWidth,
    height: el.height,

    // General speed of entire wave system
    speed: 3,

    // How many degress should we rotate all of the waves
    rotate: 0,

    // Ease function from left to right
    ease: 'SineInOut',

    // Specific how much the width of the canvas the waves should be
    // This can either be a number or a percent
    waveWidth: '95%',

    // An array of wave options
    waves: [
      // {
      //   timeModifier: 1,   // This is multiplied againse `speed`
      //   lineWidth: 3,      // Stroke width
      //   amplitude: 150,    // How tall is the wave
      //   wavelength: 200,   // How long is the wave
      //   segmentLength: 20, // How smooth should the line be
      //   strokeStyle: 'rgba(255, 255, 255, 0.5)', // Stroke color and opacity
      //   type: 'sine'       // Wave type
      // },
      // {
      //   timeModifier: 1,
      //   lineWidth: 2,
      //   amplitude: 150,
      //   wavelength: 400,
      //   strokeStyle: 'rgba(255, 255, 255, 0.3)'
      // }
      {
        timeModifier: 4,
        lineWidth: 1,
        amplitude: -25,
        wavelength: 25
      },
      {
        timeModifier: 2,
        lineWidth: 2,
        amplitude: -50,
        wavelength: 50
      },
      {
        timeModifier: 1,
        lineWidth: 1,
        amplitude: -100,
        wavelength: 100
      },
      {
        timeModifier: 0.5,
        lineWidth: 1,
        amplitude: -200,
        wavelength: 200
      },
      {
        timeModifier: 0.25,
        lineWidth: 2,
        amplitude: -200,
        wavelength: 200
      }
    ],

    // Perform any additional initializations here
    initialize: function (){},

    // This function is called whenver the window is resized
    resizeEvent: function() {

      // Here is an example on how to create a gradient stroke
      var gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
      gradient.addColorStop(0,"rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.5,"rgba(179, 136, 255, 0.5)");
      gradient.addColorStop(1,"rgba(0, 0, 0, 0)");

      var index = -1;
      var length = this.waves.length;
        while(++index < length){
        this.waves[index].strokeStyle = gradient;
      }
    }
  });
}
const Waves = (props:any) => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement
    createWave(canvas)
  })
  
  return <canvas className={wave} ref={canvasRef} {...props}/>
}

export default Waves