<template>
  <div class="rightPane" v-if="show">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="节点" name="node">
      <div class="content">
        <el-form
            :model="form"
            label-width="80px"
            label-position="left"
          >
            <el-form-item label="边框颜色" prop="stroke">
              <el-color-picker 
                                 v-model="form.stroke"></el-color-picker>
            </el-form-item>
            <el-form-item label="边框宽度" prop="strokeWidth">
              <el-slider v-model="form.strokeWidth"></el-slider>
            </el-form-item>
            <el-form-item label="填充色" prop="fill">
              <el-color-picker 
                                 v-model="form.fill"></el-color-picker>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer">
          <el-button >取消</el-button>
          <el-button type="primary" >确定</el-button>
        </span>
    </el-tab-pane>
    <el-tab-pane label="文本" name="text">文本</el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
  export default {
    props:{
      currentNode:{
        type: Object,
        default:(()=>{})
      }
    },
    data() {
      return {
        activeName: 'node',
        show:true,
        form:{
          stroke:'#ff0000',
          strokeWidth:0,
          fill:'#ff0000'
        }
      };
    },
    created(){
    
      
     
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    togglePaneShow(bol){
      this.show=bol;
      let {stroke,strokeWidth,fill}=this.currentNode.attrs.body;
      this.form={stroke,strokeWidth,fill};
    }
    }
  };
</script>
<style lang="less">
 .rightPane {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0 15px;
    .el-color-picker {
                vertical-align: middle;
                width: 100%;

                .el-color-picker__trigger {
                  width: 100%;

                  .el-color-picker__icon {
                    text-align: right;
                    padding-right: 20px;
                  }
                }
              }
  }
</style>