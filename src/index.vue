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
import { jsPlumb } from 'jsplumb'
import './toolkit.js'
import './demo-support.js'
import './jsplumbtoolkit-undo-redo.js'
import './syntax-highlighter.js'
// require('./style/demo.css')
// require('./style/jsplumb.css')
require('./style/tookit.default.css')
require('./style/jsplumbtoolkit-index.css')
export default Vue.extend({
  data () {
    return {

    }
  },
  mounted () {
    this.tookitRun()
  },
  methods: {
    tookitRun () {
      jsPlumbToolkit.ready(function () {
        var toolkit = (window.toolkit = jsPlumbToolkit.newInstance({
          beforeStartDetach: function () {
            return false
          }
        }))

        var controls = document.querySelector('.controls')

        jsPlumb.on(controls, 'tap', '[undo]', function () {
          undoredo.undo()
        })

        jsPlumb.on(controls, 'tap', '[redo]', function () {
          undoredo.redo()
        })

        var view = {
          nodes: {
            default: {
              template: 'tmplNode',
              events: {
                click: params => {
                  console.log(params)
                }
              }
            }
          },
          edges: {
            default: {
              connector: ['StateMachine', { curviness: 10 }],
              paintStyle: { strokeWidth: 2, stroke: '#89bcde' },
              endpoints: [['Dot', { radius: 4 }], 'Blank'],
              events: {
                click: params => {
                  console.log(params)
                }
              }
            }
          }
        }

        var mainElement = document.querySelector('#jtk-demo-layouts'),
          canvasElement = mainElement.querySelector('.jtk-demo-canvas'),
          miniviewElement = mainElement.querySelector('.miniview')
        // ,
        // layoutSelector = document.querySelector('#layout')

        var randomHierarchy = function () {
          return jsPlumbToolkitDemoSupport.randomHierarchy(1)
        }

        // make a random hierarchy and store how many nodes there are; we will use this when we add new nodes.
        var hierarchy = randomHierarchy()
        console.log(hierarchy)
        var renderer = (window.renderer = toolkit
          .load({ type: 'json', data: hierarchy })
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
            events: {
              canvasClick: function (e) {
                toolkit.clearSelection()
              },
              modeChanged: function (mode) {
                jsPlumb.removeClass(
                  jsPlumb.getSelector('[mode]'),
                  'selected-mode'
                )
                jsPlumb.addClass(
                  jsPlumb.getSelector("[mode='" + mode + "']"),
                  'selected-mode'
                )
              }
            },
            jsPlumb: {
              Anchor: 'Center',
              EndpointStyle: { fill: 'gray' },
              EndpointHoverStyle: { fill: '#FF6600' },
              HoverPaintStyle: { strokeWidth: 4, stroke: 'orange' }
            },
            refreshLayoutOnEdgeConnect: true,
            elementsDraggable: true
          }))

        var undoredo = (window.undoredo = new jsPlumbToolkitUndoRedo({
          surface: renderer,
          onChange: function (undo, undoSize, redoSize) {
            controls.setAttribute('can-undo', undoSize > 0)
            controls.setAttribute('can-redo', redoSize > 0)
          },
          compound: true
        }))

        //
        // use event delegation to attach event handlers to
        // remove buttons. This callback finds the related Node and
        // then tells the toolkit to delete it.
        //
        jsPlumb.on(canvasElement, 'tap', '.delete', function (e) {
          var info = toolkit.getObjectInfo(this)
          var selection = toolkit.selectDescendants(info.obj, true)
          undoredo.transaction(function () {
            toolkit.remove(selection)
          })
        })

        //
        // use event delegation to attach event handlers to
        // add buttons. This callback adds an edge from the given node
        // to a newly created node, and then the layout is refreshed.
        //
        jsPlumb.on(canvasElement, 'tap', '.add', function (e) {
          // this helper method can retrieve the associated
          // toolkit information from any DOM element.
          var info = toolkit.getObjectInfo(this)
          // get a random node.
          var n = jsPlumbToolkitDemoSupport.randomNode()

          undoredo.transaction(function () {
            // add the node to the toolkit
            var newNode = toolkit.addNode(n)
            // and add an edge for it from the current node.
            toolkit.addEdge({ source: info.obj, target: newNode })
          })
        })

        // pan mode/select mode
        jsPlumb.on(mainElement, 'tap', '[mode]', function () {
          renderer.setMode(this.getAttribute('mode'))
        })

        // on home button tap, zoom content to fit.
        jsPlumb.on(mainElement, 'tap', '[reset]', function () {
          toolkit.clearSelection()
          renderer.zoomToFit()
        })

        // new jsPlumbSyntaxHighlighter(toolkit, '.jtk-demo-dataset')

        var layoutParams = {
          Spring: {
            absoluteBacked: false,
            parameters: {
              padding: [50, 50]
            }
          },
          Hierarchical: {
            parameters: {
              orientation: 'horizontal',
              padding: [100, 60]
            }
          },
          HierarchicalCompressed: {
            parameters: {
              orientation: 'horizontal',
              padding: [30, 30],
              spacing: 'compress'
            }
          },
          HierarchicalAlignStart: {
            parameters: {
              orientation: 'horizontal',
              padding: [100, 60],
              align: 'start'
            }
          },
          HierarchicalAlignEnd: {
            parameters: {
              orientation: 'horizontal',
              padding: [100, 60],
              align: 'end'
            }
          },

          HierarchicalVertical: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60]
            }
          },

          HierarchicalVerticalAlignStart: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60],
              align: 'start'
            }
          },
          HierarchicalVerticalAlignEnd: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60],
              align: 'end'
            }
          },

          HierarchicalInverted: {
            parameters: {
              orientation: 'horizontal',
              padding: [160, 60],
              invert: true
            }
          },
          HierarchicalInvertedAlignStart: {
            parameters: {
              orientation: 'horizontal',
              padding: [160, 60],
              invert: true,
              align: 'start'
            }
          },
          HierarchicalInvertedAlignEnd: {
            parameters: {
              orientation: 'horizontal',
              padding: [160, 60],
              invert: true,
              align: 'end'
            }
          },

          HierarchicalVerticalInverted: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60],
              invert: true
            }
          },
          HierarchicalVerticalInvertedAlignStart: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60],
              invert: true,
              align: 'start'
            }
          },
          HierarchicalVerticalInvertedAlignEnd: {
            parameters: {
              orientation: 'vertical',
              padding: [160, 60],
              invert: true,
              align: 'end'
            }
          },

          Circular: {
            parameters: {
              padding: 15
            }
          },
          CircularCenteredRoot: {
            parameters: {
              padding: 15,
              centerRootNode: true
            }
          }
        }

        // change layout when user picks one from the drop down.
        // jsPlumb.on(layoutSelector, 'change', function() {
        //   var opt = this.options[this.selectedIndex],
        //     id = opt.value,
        //     extra = opt.getAttribute('extra') || '',
        //     paramKey = id + extra,
        //     params = layoutParams[paramKey] || {},
        //     lp = jsPlumb.extend(
        //       {
        //         type: id
        //       },
        //       params || {}
        //     )

        //   renderer.setLayout(lp)
        //   renderer.zoomToFit()

        //   document.querySelector('.config pre').innerHTML = JSON.stringify(
        //     lp,
        //     4,
        //     4
        //   )
        // })

        jsPlumb.on(
          document.querySelector('#btnRegenerate'),
          'click',
          function () {
            toolkit.clear()
            toolkit.load({
              data: randomHierarchy()
            })
          }
        )

        jsPlumb.on(document.querySelector('#btnRelayout'), 'click', function () {
          renderer.relayout()
        })
      })
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
