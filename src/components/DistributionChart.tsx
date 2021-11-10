import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { Types } from './types/chart'
import useWindowDimensions from '../utils/windowDimension'

// TODO EE: Update Chart, ChartHelper to actual component name & helper
import DonutChart from './DonutChart'
import ChartHelper from './DonutChartHelper'

const DistributionChart = () => {
  const isBrowser = typeof window !== "undefined"
  let width = 0
  const [data, setData] = useState<Types.Data[]>([{}])

  const [propertiesNames] = useState(['name', 'value'])
  
  const chartRef = React.useRef<HTMLDivElement>(null)
  let { height } = isBrowser ? useWindowDimensions() : 0
  width = chartRef?.current?.clientWidth || 0
  if (height > width) {
    height = width
  }

  const dimensions = useRef() as { current: Types.Dimensions }
  dimensions.current = ChartHelper.getDimensions(width, height, 0, 0, 0, 0)

  // resize
  useEffect(() => {
    (dimensions as unknown as { current: Types.Dimensions }).current = ChartHelper.getDimensions(width, height, 0, 0, 0, 0)
  }, [width, height, dimensions])

  const loadData = () => {
    d3.dsv(',', '/data/distribution.csv', (d) => (d as unknown) as Types.Data[])
      .then((d) => setData((d as unknown) as Types.Data[]))
  }

  useEffect(() => {
    if (data.length <= 1) loadData()
  })

  return (
    <div ref={chartRef}>
      {data.length > 1 ? (
        <DonutChart dimensions={dimensions.current} data={data} propertiesNames={propertiesNames} />
      ) : (
        <>Loading</>
      )}
    </div>
  )
}
export default DistributionChart