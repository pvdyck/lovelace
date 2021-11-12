import React, { useEffect, useCallback, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types/chart'
import SVGParticules from './SVGParticules';

const DonutChart = ( props : IDonutChartProps ) => {
  const [loaded, setLoaded] = useState(false)

  const [prevHeight, setPrevHeight] = useState(props.dimensions.height)
  const [prevWidth, setPrevWidth] = useState(props.dimensions.width)

  const memoizedDrawCallback = useCallback(() => {
    d3.select('#chart-group').selectAll('*').remove()
  }, [])

  const memoizedUpdateCallback = useCallback(() => {
    memoizedDrawCallback()
    const isMobile = props.dimensions.width < 600
    const radius = Math.min(props.dimensions.width, props.dimensions.height) / 2 - (isMobile? 75 : 50)

    const pieSvg = d3
      .select('#chart-group')
      .append('g')
      .attr('transform', `translate(${  props.dimensions.width / 2  },${  props.dimensions.height / 2  })`);

    let tooltip = d3.select("#chartWrapper")
      .append("div")
      .style("position", "absolute")
      .style("top", "0")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("width", "10rem")
      .style("height", "100%")
      .style("pointer-events", "none")
      .style("display", "flex")
      .style("left", "50%")
      .style("transform", "translateX(-50%)")
      .style("place-content", "center")
      .style("align-items", "center")
      .style("text-align", "center");

    const pie = d3.pie()
      .padAngle(isMobile ? 0.1 : 0.04)
      .sort(null) // EE: need sorting?
      // @ts-ignore
      .value((d) => d.value)

    // @ts-ignore
    const pieData = pie(props.data)
    
    const arc = d3.arc()
      .innerRadius(radius * (isMobile ? 0.9 : 0.7))
      .outerRadius(radius * (isMobile ? 1.2 : 0.8))

    const arcMobile = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius * 0.8)

    const outerArcForLabelsPosition = d3.arc()
      .innerRadius(radius * (isMobile ? 1.4 : 0.9))
      .outerRadius(radius * (isMobile ? 1.4 : 0.9))

    // Draw Chart
    const myColor = d3.scaleSqrt().domain([1,10]).range(["#661FFF", "#D400F8"])
    pieSvg
      .selectAll('allSlices')
      .data(pieData)
      .enter()
      .append('path')
      .attr('fill', (d) => { return myColor(d.index+1)})
      .style('stroke-width', '1px')
      .attr('d', arc)
      .style('opacity', 0.7)
      .on("mouseover", (e, d) => {
        tooltip.text(`${d.data.desc}`);
        d3.select(e.target)
          .transition()
          .duration(200)
          .attr('transform', 'translate(' + (arc.centroid(d)[0] / 30) + ',' + (arc.centroid(d)[1] / 30) + ')');

        return tooltip.style("visibility", "visible")
      ;})
      .on("mouseout", (e, d) => {
        d3.select(e.target)
          // .attr('stroke', '#fff')
          .transition()
          .duration(500)
          .attr('transform', 'translate(0,0)');
          
        return tooltip.style("visibility", "hidden");
      });

    // Peripherals

    if (!isMobile) {
      pieSvg
        .selectAll('allPolylines')
        .data(pieData)
        .enter()
        .append('polyline')
        .attr('stroke', 'white')
        .style('fill', 'none')
        .attr('stroke-width', 1)
        // @ts-ignore
        .attr('points', (d) => {
          // @ts-ignore
          const posA = arc.centroid(d) // line insertion in the slice
          // @ts-ignore
          const posB = outerArcForLabelsPosition.centroid(d) // line break: we use the other arc generator that has been built only for that
          // @ts-ignore
          const posC = outerArcForLabelsPosition.centroid(d); // Label position = almost the same as posB
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          if (!isMobile) {
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          }
          return [posA, posB, posC]
        })
      }
    pieSvg
      .selectAll('allLabels')
      .data(pieData)
      .enter()
      .append('text')
      // @ts-ignore
      .style("font-size", isMobile ? "12px" : "18px")
      .text((d) => {
        return d.data.name}
      )
      .attr('transform', (d) => {
        // @ts-ignore
        const pos = outerArcForLabelsPosition.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        if (!isMobile) {
          pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
          pos[1] = pos[1] + -5
        }
        return `translate(${  pos  })`;
      })
      .style('text-anchor', (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midAngle < Math.PI ? 'start' : 'end')
      })
      .style('fill', 'white')

  
    pieSvg
      .selectAll('allLabels')
      .data(pieData)
      .enter()
      .append('text')
      .style("font-size", isMobile ? "12px" : "14px")
      .style("font-weight", isMobile ? "normal" : "bold")
      // @ts-ignore
      .text((d) => {
        return d.data.value + '%'
      })
      .attr('transform', (d) => {
        // @ts-ignore
        const pos = outerArcForLabelsPosition.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        if (!isMobile) {
          pos[0] = radius * 0.99 * (midAngle < Math.PI ? 1 : -1);
        }
        pos[1] = pos[1] + 15
        return `translate(${  pos  })`;
      })
      .style('text-anchor', (d) => {
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
        return (midAngle < Math.PI ? 'start' : 'end')
      })
      .style('fill', (d) => { return myColor(d.index+1)})

  }, [props.data, props.dimensions, props.propertiesNames])

  useEffect(() => {
    memoizedUpdateCallback()
  }, [loaded, memoizedDrawCallback, memoizedUpdateCallback])

  useEffect(() => {
    const isNewHeight = prevHeight !== props.dimensions.height
    const isNewWidth = prevWidth !== props.dimensions.width
    if (isNewHeight || isNewWidth) {
      setPrevWidth(props.dimensions.height)
      setPrevHeight(props.dimensions.width)
      memoizedUpdateCallback()
    }
  }, [memoizedUpdateCallback, prevHeight, prevWidth, props.dimensions.height, props.dimensions.width])

  return (
    <div id="chartWrapper" style={{position: 'relative'}}>
      <SVGParticules svgWidth={props.dimensions.width > 800 ? 1 : 0}/>
      <svg id="chart-group" width='100%' height={props.dimensions.height}  style={{zIndex: 2, position: 'relative'}}/>
    </div>
  )
}

interface IDonutChartProps {
  dimensions: Types.Dimensions
  data: Types.Data[]
  propertiesNames: string[]
}

export default DonutChart