import { Shape } from '@antv/x6'
const ports= {
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
  ]
}
export  let circleConfig={
  width: 80,
  height: 40,
  zIndex:1,
  attrs: {
    body: {
      fill: '#ffe58f',
      stroke: '#faad14',
      lineWidth: 2,
      rx: 10
    },
    label: {
      text: '场景',    // 文本
      type:'childStep',
      fill: '#f00',    // 文字颜色
      fontSize: 13,    // 文字大小
    },
  },
  style: {
    visibility: 'hidden',
  },
  ports
}
export  let polygonConfig={
  width: 60,
  height: 60,
  zIndex:3,
  points: '0,10 10,0 20,10 10,20',
  attrs: {
    body: {
      fill: '#5D79FF',
      stroke: '#5D79FF',
      lineWidth: 2,
      refPoints: '0,10 10,0 20,10 10,20',
    },
    label: {
      text: '子步骤',    // 文本
      type:'childStep',
      fill: '#fff',    // 文字颜色
      fontSize: 13,    // 文字大小
    },
  },
  style: {
    visibility: 'hidden',
  },
  ports
}

