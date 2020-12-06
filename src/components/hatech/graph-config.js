import { Shape} from '@antv/x6'
 function graphConfig(self) {
    return {
        connecting: {
          anchor: 'center',
          connectionPoint: 'anchor',
          dangling: false,
          highlight: true,
          snap: true,
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#000',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'classic',
                    size: 8,
                  },
                },
              },
              router: {
                name: 'manhattan',
              },
            })
          },
          validateConnection(e) {
              console.log(e)
              
              console.log(self.graph.getEdges())
              const {
                sourceView,
                targetView,
                sourceMagnet,
                targetMagnet,
                sourceCell,
                targetCell,
                edge
              }=e;

            if(sourceView.cell.shape==='group-rect'||targetView.cell.shape==='group-rect') {
              return false
            }
            if(sourceView.cell.shape==='group-s-rect'&&targetView.cell.shape==='polygon'||sourceView.cell.shape==='polygon'&&targetView.cell.shape==='group-s-rect') {
              return false
            }
           
           
            if (sourceView === targetView) {
              return false
            }
            if (!sourceMagnet) {
              return false
            }
            if (!targetMagnet) {
              return false
            }
            //两个节点之间只允许存在一条edge
            for(let v of self.graph.getEdges()) {
                let arr=[v.target.cell,v.source.cell]
                if(arr.includes(sourceCell.id)&&arr.includes(targetCell.id)) {
                       debugger
                       return false
                   }
                }
           
            return true
          },
        },
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 4,
                stroke: 'rgba(223,234,255)',
              },
            },
          },
        },
        snapline: true,
        history: true,
        clipboard: {
          enabled: true,
        },
        keyboard: {
          enabled: true,
        },
        embedding: {
          enabled: true,
          findParent({ node }) {
            const bbox = node.getBBox()
            return this.getNodes().filter((n) => {
              // 只有 data.parent 为 true 的节点才是父节点
              const data = n.getData()
              if (data && data.parent) {
                const targetBBox = n.getBBox()
                if(node.attrs.label.type==='step'&&n.attrs.label.type==='stage') {
                  return bbox.isIntersectWithRect(targetBBox)
                } else if(node.attrs.label.type==='childStep'&&n.attrs.label.type==='step') {
                    return bbox.isIntersectWithRect(targetBBox)
                }
                
              }
              return false
            })
          },
        },
       resizing: {
        enabled: true,
        minWidth: 0,
        minHeight: 0,
        maxWidth:(e)=>{
          
        },
        maxHeight: Number.MAX_SAFE_INTEGER,
        orthogonal: true,
        restricted: false,
        autoScroll: false,
        preserveAspectRatio: false,
    },
       selecting: {
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: false,
          showNodeSelectionBox: true,
          
        },
        scroller:{
            enabled: true,
            className: 'hatech-scroller',
            autoResize:true
        }
    }
 }
 
export default graphConfig