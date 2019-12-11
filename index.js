import Vue from 'vue'
import App from './src/index.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
new Vue(App).$mount('#app')

// import jsplumb from 'jsplumb'

// console.log(jsplumb)

// let config = {
//   maxConnections: -1,
//   endpoint: [
//     'Dot',
//     {
//       radius: 15,
//       fill: '#cfe7ff'
//     }
//   ], // 端点的形状
//   endpointHoverStyle: { fill: 'red' }, // 端点hover时触发
//   paintStyle: {
//     // 连线样式
//     strokeStyle: '#1e8151',
//     stroke: '#3086fb',
//     fill: '#cfe7ff',
//     fillStyle: '#cfe7ff',
//     radius: 8,
//     lineWidth: 2
//   },
//   hoverPaintStyle: { fill: 'red' }, // 鼠标经过线的样式
//   connectorStyle: { stroke: '#999', strokeWidth: 1 }, // 连线样式
//   connectorHoverStyle: { stroke: 'red', strokeWidth: 3 }, // 鼠标经过线的样式
//   isSource: true, // 是否可以拖动（作为连线起点）
//   isTarget: true,
//   connector: [
//     'Flowchart',
//     { gap: 10, cornerRadius: 5, alwaysRespectStubs: true }
//   ], // 连接线的样式种类有[Bezier],[Flowchart],[StateMachine ],[Straight ]
//   ConnectionOverlays: [], // 附加到每个连接的默认重叠,
//   nodes: [
//     {
//       id: 'w1',
//       name: '1',
//       w: 66,
//       h: 34,
//       left: 152,
//       top: 133
//     },
//     {
//       id: 'w2',
//       name: '2',
//       w: 52,
//       h: 45,
//       left: 298,
//       top: 133
//     },
//     {
//       id: 'w9',
//       name: '9',
//       w: 53,
//       h: 34,
//       left: 537,
//       top: 249
//     },
//     {
//       id: 'w12',
//       name: '12',
//       w: 35,
//       h: 32,
//       left: 245,
//       top: 363
//     },
//     {
//       id: 'w11',
//       name: '11',
//       w: 44,
//       h: 43,
//       left: 121,
//       top: 363
//     },
//     {
//       id: 'w10',
//       name: '10',
//       w: 41,
//       h: 30,
//       left: 0,
//       top: 363
//     },
//     {
//       id: 'w7',
//       name: '7',
//       w: 61,
//       h: 41,
//       left: 264,
//       top: 249
//     },
//     {
//       id: 'w8',
//       name: '8',
//       w: 52,
//       h: 39,
//       left: 405,
//       top: 249
//     },
//     {
//       id: 'w3',
//       name: '3',
//       w: 39,
//       h: 36,
//       left: 430,
//       top: 133
//     },
//     {
//       id: 'w6',
//       name: '6',
//       w: 62,
//       h: 53,
//       left: 122,
//       top: 249
//     },
//     {
//       id: 'w5',
//       name: '5',
//       w: 42,
//       h: 55,
//       left: 0,
//       top: 249
//     },
//     {
//       id: 'w4',
//       name: '4',
//       w: 44,
//       h: 36,
//       left: 549,
//       top: 133
//     }
//   ],
//   edges: [
//     {
//       source: 'w1',
//       target: 'w2',
//       data: {
//         id: '286e6b8357d'
//       }
//     },
//     {
//       source: 'w2',
//       target: 'w3',
//       data: {
//         id: '8a9a6f1124a'
//       }
//     },
//     {
//       source: 'w2',
//       target: 'w7',
//       data: {
//         id: '6a2ad0811a3'
//       }
//     },
//     {
//       source: 'w2',
//       target: 'w9',
//       data: {
//         id: '7540437b3ad'
//       }
//     },
//     {
//       source: 'w9',
//       target: 'w10',
//       data: {
//         id: 'e019a6cee97'
//       }
//     },
//     {
//       source: 'w9',
//       target: 'w11',
//       data: {
//         id: '556c0c034b5'
//       }
//     },
//     {
//       source: 'w9',
//       target: 'w12',
//       data: {
//         id: '9f8d63904cc'
//       }
//     },
//     {
//       source: 'w7',
//       target: 'w8',
//       data: {
//         id: '5dd1fb90620'
//       }
//     },
//     {
//       source: 'w3',
//       target: 'w4',
//       data: {
//         id: 'e89497e2e06'
//       }
//     },
//     {
//       source: 'w3',
//       target: 'w5',
//       data: {
//         id: '5ca56b178a3'
//       }
//     },
//     {
//       source: 'w3',
//       target: 'w6',
//       data: {
//         id: '1b508fc60b2'
//       }
//     }
//   ],
//   ports: [],
//   groups: []
// }

// // nodes
// jsPlumbToolkit.ready(() => {
//   let instance = jsPlumbToolkit.getInstance()
//   // 设置父级的元素，一个容器
//   instance.setContainer('container')
//   // 导入配置
//   instance.importDefaults(config)
// })
