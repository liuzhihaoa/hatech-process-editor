<template>
  <div class="hatech-wrapper">
     <div class="hatech-toolbar">
        <el-button icon="el-icon-zoom-in"></el-button>
  <el-button  icon="el-icon-zoom-out"></el-button>
  <el-button  icon="el-icon-back"></el-button>
  <el-button  icon="el-icon-right"></el-button>
  <el-button  icon="el-icon-delete"></el-button>
     </div>
     <div class="hatech-content">
      <div id="left-slider"></div> 
      <div id="center-container">
          <div id="hatech-container"></div>
      </div>
      <div id="right-pane">
        <right-pane ref="rightPane"  :currentNode='currentNode' />
      </div>
     </div>
  </div>
</template>

<script>
import { Graph, Addon, Shape ,FunctionExt} from '@antv/x6'
import graphConfig from './graph-config'
import {circleConfig,polygonConfig} from './defalut-node-config'
import {groupRect,groupEllipse} from './shape'
import rightPane from './rightPane'
export default {
  data() {
    return {
      graph:'',
      graphConfig:graphConfig(this),
      currentNode:{},
      stageList:[],
      stepList:[],
      childStepList:[],
      edgeList:[],
      paneShow:false
    }
  },
  components:{
    rightPane
  },
  mounted () {
    this.initGraph();
  },
  methods: {
    getData(){
      console.log(this.graph)
      console.log(this.graph.getCells())
    },
    showPorts(ports,show) {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    initGraph(){
      const graph = new Graph({
         container: document.getElementById('hatech-container'),
          ...this.graphConfig
      })
      this.initStencil(graph);
      this.initEvent(graph)
      this.graph=graph;
    },
    initStencil(graph){
      const h=document.getElementById('hatech-container').clientHeight
      graph.positionPoint({ x: 0, y: 0 }, 0, 0)
      graph.positionContent('top-left')
      const groups=[
        { name: 'group1', title: '常用图形',collapsable:true,collapsed:false },
        { name: 'group2', title: '场景模板库',collapsable:true,collapsed:true },
        { name: 'group3', title: '阶段库' ,collapsable:true,collapsed:true },
        { name: 'group4', title: '步骤库' ,collapsable:true,collapsed:true },
        { name: 'group5', title: '子步骤库' ,collapsable:true,collapsed:true },
      ]
    const stencil = new Addon.Stencil({
      groups: groups,
      layoutOptions: {
        columns: 2,
        columnWidth: 100,
        rowHeight: 80,
        dx: 0
      },
      target: graph,
      title: '图形库',
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      validateNode:(e,f,g)=>{
        if(e.attrs.label.type==='stage') {
          let x=0,y=0;
          for(let v of this.stageList) {
              x+=v.store.data.size.width
          }
           e.store.data.size={
            width:300,
            height:h
          }
          e.store.data.position={
            x:x,
            y:y
          }
        this.stageList.push(e)
        console.log(this.stageList)
          return true
        } else if(e.attrs.label.type==='step') {
          e.store.data.size={
            width:200,
            height:150
        }
          return false
        } else {
          e.store.data.size={
            width:50,
            height:50
        }
          return false
        }
         
      }
    })
    document.getElementById('left-slider').appendChild(stencil.container)
    const gr1=new groupRect()
    const ge1=new groupEllipse()
    const c1 = new Shape.Circle(circleConfig)
    const p1 = new Shape.Polygon(polygonConfig)
    stencil.load([gr1,ge1,p1], 'group1')
     stencil.load([c1], 'group2')
    },
    initEvent(graph){
      graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'vertices',
          args: {
            snapRadius: 0,
            stopPropagation: false
          }
        },
        { name: 'source-arrowhead' },
        { name: 'target-arrowhead' }
      ])
    })
    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools()
    })
    graph.on('node:click',({node})=>{
      this.currentNode=node;
      this.$refs.rightPane.togglePaneShow(true)

    })
     graph.bindKey('ctrl+c', () => {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
      return false
    })

    graph.bindKey('ctrl+v', () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 })
        graph.cleanSelection()
        graph.select(cells)
      }
      return false
    })

    graph.bindKey('delete', () => {
      const cells = graph.getSelectedCells()
      graph.cleanSelection()
      graph.removeCells(cells)
    })
    let ctrlPressed = false
    const embedPadding = 20

graph.on('node:embedding', (e) => {
  ctrlPressed = e.metaKey || e.ctrlKey
})

graph.on('node:embedded', () => {
  ctrlPressed = false
})

graph.on('node:change:size', ({ node, options,current,previous }) => {
  if (options.skipParentHandler) {
    return
  }
  console.log(node)
  console.log(this.stageList)
  const children = node.getChildren()
  if (children && children.length) {
    node.prop('originSize', node.getSize())
  }
  //父节点位置更改后更改子节点的位置
  function changeChildPos(node){
    if(node.getChildren()) {
       for(let a of node.getChildren()) {
          a.position(a.position().x+current.width-previous.width,a.position().y)
          changeChildPos(a)
        }
    }
  }
  for(let v of this.stageList) {
    if(v.id!==node.id) {
     v.position().x>node.position().x&&v.position( v.position().x+current.width-previous.width,v.position().y)
      changeChildPos(v)
    }
  }
})
graph.on('node:change:position', ({ node, options,current,previous }) => {
  if (options.skipParentHandler || ctrlPressed) {
    return
  }
  const pos= node.prop('originPosition')
  const children = node.getChildren()
  if (children && children.length) {
    node.prop('originPosition', node.getPosition())
  }

  const parent = node.getParent()
  if (parent && parent.isNode()) {
    let originSize = parent.prop('originSize')
    if (originSize == null) {
      originSize = parent.getSize()
      parent.prop('originSize', originSize)
    }

    let originPosition = parent.prop('originPosition')
    if (originPosition == null) {
      originPosition = parent.getPosition()
      parent.prop('originPosition', originPosition)
    }

    let x = originPosition.x
    let y = originPosition.y
    let cornerX = originPosition.x + originSize.width
    let cornerY = originPosition.y + originSize.height
    let hasChange = false

    const children = parent.getChildren()
    if (children) {
      children.forEach((child) => {
        const bbox = child.getBBox().inflate(embedPadding)
        const corner = bbox.getCorner()

        if (bbox.x < x) {
          x = bbox.x
          hasChange = true
        }

        if (bbox.y < y) {
          y = bbox.y
          hasChange = true
        }

        if (corner.x > cornerX) {
          cornerX = corner.x
          hasChange = true
        }

        if (corner.y > cornerY) {
          cornerY = corner.y
          hasChange = true
        }
      })
    }
let grandParent=parent.getParent();
  if(grandParent) {
    let px=grandParent.store.data.size.width+grandParent.store.data.position.x
    let py=grandParent.store.data.size.height+grandParent.store.data.position.y
    //如果存在grandParent则要校验parent容器的大小不能超过grandParent
    if (hasChange&&cornerX<px&&cornerY<py&&x>=grandParent.store.data.position.x&&y>=grandParent.store.data.position.y) {
      parent.prop(
        {
          position: { x, y },
          size: { width: cornerX - x, height: cornerY - y },
        },
        { skipParentHandler: true },
      )
    }
    else {
      if(!parent.getBBox().isIntersectWithRect(node.getBBox())) {
        node.store.data.position=previous
      }
    }
  }   else {
 if (hasChange) {
      parent.prop(
        {
          position: { x, y },
          size: { width: cornerX - x, height: cornerY - y },
        },
        { skipParentHandler: true },
      )
    }
  }  
   
  }
})
 const container= document.getElementById('hatech-container')
   graph.on(
      'node:mouseenter',
      FunctionExt.debounce(() => {
        const ports = container.querySelectorAll('.x6-port-body') 
        this.showPorts(ports, true)
      }),
      500,
    )
    graph.on('node:mouseleave', () => {
      const ports = container.querySelectorAll('.x6-port-body')
      this.showPorts(ports, false)
    })   
    },
  },
  
}
</script>

<style lang="less" scoped>
.hatech-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .hatech-toolbar {
    width: calc(100% - 400px);
    height: 30px;
    display: inline-block;
    border: 1px solid #eee;
    .el-button {
      height: 30px;
    }
  }
  .hatech-content {
    width: 100%;
    height: calc(100% - 32px);
    display: flex;
    #left-slider {
      height: 100vh;
      width: 200px;
      position: relative;
    }
    #center-container {
      height: 100vh;
      flex: 1;
      #hatech-container {
        width: 100%;
        height: 100%;
      }
    }
    #right-pane {
      height: 100vh;
      width: 200px;
      position: relative;
      border: 1px solid #eee;
    }
  }
}


</style>
