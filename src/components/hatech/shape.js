import { Graph,Dom } from '@antv/x6'
export const rrect = Graph.registerNode('r-rect', {
  inherit: 'rect',
  width: 80,
  height: 40,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'true',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)',
      },
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
  ports: {
    groups: {
      top: {
        position: {
          name: 'top',
          args: {
            dx: -26,
          },
        },
      },
      right: {
        position: {
          name: 'right',
          args: {
            dy: -26,
          },
        },
      },
      bottom: {
        position: {
          name: 'bottom',
          args: {
            dx: 26,
          },
        },
      },
      left: {
        position: {
          name: 'left',
          args: {
            dy: 26,
          },
        },
      },
    },
  },
})
export const groupRect = Graph.registerNode('group-rect',{
    inherit: 'rect',
    width: 80,
    height: 40,
    nodeType:'satge',
    zIndex:1,
    data:{
      parent:true
    },
    attrs: {
      body: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
      },
      head: {
        refWidth: '100%',
        refY: 0,
        stroke: 'transparent',
        height: 20,
        fill: 'rgb(95,149,255)',
      },
      label: {
        text: '阶段',
        refY: 10,
        type:'stage',
        fill: '#ffffff',
        fontSize: 12,
       
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'rect',
        selector: 'head',
      },
      {
        tagName: 'text',
        selector: 'label',
       
      },
    ],
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'right',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
      ],
    }
  })

export const groupEllipse=Graph.registerNode('group-s-rect',{
    inherit: 'rect',
    width: 80,
    height: 40,
    nodeType:'step',
    zIndex:2,
    data:{
      parent:true
    },
    attrs: {
      body: {
        stroke: '#947EFF',
        strokeWidth: 1,
        fill: 'rgba(95,149,255,0.05)',
        rx:5,
      },
      head: {
        refWidth: '70%',
        refY: '-10px',
        refX: '15%',
        stroke: 'transparent',
        height: 20,
        fill: '#947EFF',
        rx:10,
      },
      label: {
        text: '步骤',
        refY: 0,
        type:'step',
        fill: '#ffffff',
        fontSize: 12,
       
      },
    },
    markup: [
      {
        tagName: 'rect',
        selector: 'body',
      },
      {
        tagName: 'rect',
        selector: 'head',
      },
      {
        tagName: 'text',
        selector: 'label',
       
      },
    ],
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 3,
              magnet: true,
              stroke: '#5F95FF',
              strokeWidth: 1,
              fill: '#fff',
              style: {
                visibility: 'hidden',
              },
            },
          },
        },
      },
      items: [
        {
          group: 'top',
        },
        {
          group: 'right',
        },
        {
          group: 'bottom',
        },
        {
          group: 'left',
        },
      ],
    }
  })
