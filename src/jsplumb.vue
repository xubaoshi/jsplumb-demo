<template>
  <div
    id="points"
    class="panel-body points demo flow_chart"
  ></div>
</template>

<script>
import Vue from 'vue'
import { jsPlumb } from 'jsplumb'
require('./style/demo.css')
require('./style/jsplumb.css')
export default Vue.extend({
  data () {
    return {
      data: {
        point: [
          {
            _id: '58c21d713819d56d68763918',
            name: 'MoeLove',
            status: '0'
          },
          {
            _id: '58c21d803819d56d68763919',
            name: 'Moe',
            status: '1'
          },
          {
            _id: '58c21da83819d56d6876391a',
            name: 'Love',
            status: '0'
          },
          {
            _id: '58c63ecf3819d5a22f2c7f24',
            name: 'TaoBeier',
            status: '1'
          }
        ],
        location: [
          ['Moe', 4, 14],
          ['Love', 4, 24],
          ['TaoBeier', 4, 34],
          ['TaoBeier', 20, 24],
          ['MoeLove', 4, 4]
        ],
        line: [
          ['58c21d713819d56d68763918', '58c21d803819d56d68763919'],
          ['58c21d803819d56d68763919', '58c21da83819d56d6876391a'],
          ['58c21d803819d56d68763919', '58c63ecf3819d5a22f2c7f24'],
          ['58c21da83819d56d6876391a', '58c63ecf3819d5a22f2c7f24']
        ]
      }
    }
  },
  mounted () {
    jsPlumb.ready(() => {
      this.createFlow(this.data)
    })
  },
  methods: {
    createFlow (flowData) {
      console.log(flowData)
      const color = '#acd'
      const instance = jsPlumb.getInstance({
        Container: 'points',
        Connector: ['Bezier', { curviness: 50 }],
        Endpoint: ['Dot', { radius: 5 }],
        DragOptions: { cursor: 'pointer', zIndex: 5000 },
        PaintStyle: { lineWidth: 5, stroke: '#445566' },
        EndpointStyle: { radius: 9, fill: color, stroke: 'red' },
        HoverPaintStyle: { stroke: '#ec9f2e', lineWidth: 4 },
        EndpointHoverStyle: { fill: '#ec9f2e', stroke: '#acd' },
        ConnectionOverlays: [
          [
            'Arrow',
            {
              location: 1,
              id: 'arrow',
              length: 4,
              foldback: 0.8,
              paintStyle: {
                lineWidth: 5,
                stroke: 'lightgray',
                fill: 'lightgray'
              }
            }
          ]
        ]
      })
      // suspend drawing and initialise.
      instance.batch(() => {
        // declare some common values:
        const arrowCommon = { foldback: 0.7, width: 12 }
        // use three-arg spec to create two different arrows with the common values:
        const overlays = [
          ['Arrow', { location: 0.7 }, arrowCommon],
          ['Label', { label: 'custom label', id: 'label' }]
        ]
        // init point
        const points = document.getElementById('points')
        flowData.point.forEach(point => {
          const div = document.createElement('div')
          div.setAttribute('id', `${point._id}`)
          div.setAttribute('class', `point chart_act_${point.status} ${point.name}`)
          div.innerText = `${point.name}`
          points.appendChild(div)

          instance.addEndpoint(
            point._id,
            {
              uuid: `${point._id}-bottom`,
              anchor: 'Bottom',
              maxConnections: -1
            },
            {
              isSource: true,
              isTarget: true
            }
          )
          instance.addEndpoint(
            point._id,
            {
              uuid: `${point._id}-top`,
              anchor: 'Top',
              maxConnections: -1
            },
            {
              isSource: true,
              isTarget: true,
              dragAllowedWhenFull: true
            }
          )
        })

        // init transition
        flowData.line.forEach(line => {
          const uuid = [`${line[0]}-bottom`, `${line[1]}-top`]
          instance.connect({
            uuids: uuid,
            overlays
          })
        })

        // init location
        flowData.location.forEach(location => {
          const item = document.querySelector(`.${location[0]}`)
          item.style.left = `${location[1] * 20}px`
          item.style.top = `${location[2] * 20}px`
        })
      })
      jsPlumb.fire('jsPlumbDemoLoaded', instance)
    }
  }
})
</script>

<style lang="scss" scoped>
// .points {
//   width: 600px;
//   margin: 0 auto;
// }
.jtk-demo-main {
  display: flex;
  position: relative;
  margin: 0 auto;
  width: 1000px;
  height: 1000px;
  justify-content: center;
  align-items: center;
}

.jtk-demo-canvas {
  width: 800px;
  height: 800px;
  border: 1px solid #ccc;
  background-color: white;
  display: flex;
  flex-grow: 1;
  position: relative;
}
.controls {
  top: 25px;
  color: #fff;
  margin-right: 10px;
  position: absolute;
  left: 25px;
  z-index: 1;
  display: flex;
}

.miniview {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 100;
}
.jtk-miniview {
  overflow: hidden !important;
  width: 125px;
  height: 125px;
  background-color: transparent;
  border: 2px solid #d4d8dc;
  border-radius: 4px;
  opacity: 0.8;
}
</style>
