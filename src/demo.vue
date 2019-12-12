<template>
  <!-- <div id="points" class="panel-body points demo flow_chart"></div> -->
  <div
    class="jtk-demo-main"
    id="jtk-demo-layouts"
  >
    <div class="jtk-demo-canvas canvas-wide jtk-surface">
      <div class="controls">
        <!-- <i class="el-icon-s-home selected-mode" mode="pan" title="Pan Mode"></i> -->
        <!-- <i class="el-icon-s-home" mode="select" title="Select Mode"></i> -->
        <i
          class="el-icon-s-home"
          reset=""
          title="Zoom To Fit"
        ></i>
        <!-- <i class="fa fa-undo" undo="" title="Undo last action"></i> -->
        <!-- <i class="fa fa-repeat" redo="" title="Redo last action"></i> -->
      </div>
      <div class="miniview jtk-miniview"></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import './toolkit.js'
import './jsplumbtoolkit-undo-redo.js'
import './syntax-highlighter.js'
import { jsPlumbToolkit } from './toolkit.js'
require('./style/tookit.default.css')
require('./style/jsplumbtoolkit-demo.css')
import mysql from './asserts/img/relation/mysql.png'
import http from './asserts/img/relation/http.png'
import current from './asserts/img/relation/current.png'
import unknown from './asserts/img/relation/unknown.png'
import redis from './asserts/img/relation/redis.png'
export default Vue.extend({
  data () {
    return {
      data: {
        edges: [
          {
            source: 'cloud-rbac',
            target: 'mysql',
            data: {
              id: 1,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cloud-rbac',
            target: 'localhost:8081',
            data: {
              id: 2,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cloud-rbac',
            target: 'localhost:3306',
            data: {
              id: 3,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cloud-rbac',
            target: 'cvf',
            data: {
              id: 4,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cvf',
            target: 'petstroe',
            data: {
              id: 5,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cloud-rbac',
            target: 'kafka',
            data: {
              id: 6,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'kafka',
            target: 'redis',
            data: {
              id: 7,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'redis',
            target: '202.32.68.96.8080',
            data: {
              id: 8,
              label: '2.04cpm,25ms'
            }
          },
          {
            source: 'cloud-rbac',
            target: '202.32.68.96.8080',
            data: {
              id: 9,
              label: '2.04cpm,25ms'
            }
          }
        ],
        nodes: [
          {
            id: 'mysql',
            name: 'mysql',
            picUrl: mysql,
            tips: [
              '3.86ms',
              '128.86cpm',
              '72.32epm'
            ]
          },
          {
            id: 'localhost:8081',
            name: 'localhost:8081',
            picUrl: http,
            tips: []
          },
          {
            id: 'localhost:3306',
            name: 'localhost:3306',
            picUrl: http,
            tips: []
          },
          {
            id: 'cloud-rbac',
            name: 'cloud-rbac',
            picUrl: http,
            tag: 'java',
            tips: [
              '3.86ms',
              '128.86cpm',
              '72.32epm'
            ]
          },
          {
            id: 'cvf',
            name: 'cvf',
            picUrl: http,
            tips: []
          },
          {
            id: 'petstroe',
            name: 'petstroe',
            picUrl: unknown,
            tips: [
              '3.86ms',
              '128.86cpm',
              '72.32epm'
            ]
          },
          {
            id: 'kafka',
            name: 'kafka',
            picUrl: unknown,
            tips: [
              '3.86ms',
              '128.86cpm',
              '72.32epm'
            ]
          },
          {
            id: 'redis',
            name: 'redis',
            picUrl: redis,
            tips: []
          },
          {
            id: '202.32.68.96.8080',
            name: '202.32.68.96.8080',
            picUrl: http,
            tips: []
          }
        ]
      }
    }
  },
  mounted () {
    this.tookitRun()
  },
  methods: {
    tookitRun () {
      jsPlumbToolkit.ready(() => {
        const tookit = jsPlumbToolkit.newInstance({
          beforeStartDetach () {
            return false
          }
        })
        const controls = document.querySelector('.controls')
        const view = {
          nodes: {
            default: {
              template: 'tmplNode1',
              events: {
                click: params => {
                  console.log(params)
                }
              }
            }
          },
          edges: {
            default: {
              connector: ['Straight', { curviness: 10 }],
              paintStyle: { strokeWidth: 2, stroke: '#89bcde' },
              endpoints: [['Dot', { radius: 4 }, 'Blank']],
              label: "${label}",
              events: {
                click: params => {
                  console.log(params)
                }
              }
            }
          }
        }

        const mainElement = document.querySelector('#jtk-demo-layouts')
        const canvasElement = mainElement.querySelector('.jtk-demo-canvas')
        const miniviewElement = mainElement.querySelector('.miniview')

        const renderer = tookit
          .load({ type: 'json', data: this.data })
          .render({
            container: canvasElement,
            zoomToFit: true,
            view: view,
            layout: {
              type: 'Spring'
            },
            miniview: {
              container: miniviewElement
            },
            lassoFilter: '.controls, .controls *, .miniview, .miniview *',
            jsPlumb: {
              Anchor: "Continuous",
              Connector: ["Straight"],
              Endpoint: "Blank",
              EndpointStyle: { fill: '#fff' },
              EndpointHoverStyle: { fill: '#fff' },
              HoverPaintStyle: { strokeWidth: 4, stroke: 'orange' },
              Overlays: [
                ["Arrow", { fill: "#09098e", width: 10, length: 10, location: 1 }]
              ]
            },
            refreshLayoutOnEdgeConnect: true,
            elementsDraggable: true
          })
      })
    }
  }
})
</script>

<style lang="scss">
</style>