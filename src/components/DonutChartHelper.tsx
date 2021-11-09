import * as d3 from 'd3'
import { Types } from './types/chart'

export default class DonutChartHelper {

  private readonly metric: string[]

  constructor(metric: string[]) {
    this.metric = metric
  }

  // @ts-ignore
  public xAccessor = (d: Types.Data) => d[this.metric[0]]

  // @ts-ignore
  public yAccessor = (d: Types.Data) => d[this.metric[1]]

  static getDimensions = (width: number, height: number, left: number, right: number, top: number, bottom: number) => {
    const dimensions = {
      width,
      height,
      boundedWidth: 0,
      boundedHeight: 0,
    }
    dimensions.boundedWidth = dimensions.width
    dimensions.boundedHeight = dimensions.height

    return dimensions
  }

  static getScales = (data: Types.Data[], width: number, height: number, metric: string[]) => {
    return {
      color: d3
        .scaleOrdinal()
        .domain(
          (d3.extent(data, (d) => {
            return d.name
          }) as unknown) as string
        )
        .range(d3.schemeCategory10)
    }
  }
}