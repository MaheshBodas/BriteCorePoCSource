<template>  
  <el-carousel :interval="7000" type="card" height="60px" arrow="hover" trigger="click">
    <el-carousel-item v-for="item in helpTextArray" :key="item.id">
      <div align="center">
        <b> {{ item.id }}) {{ item.text}} </b>
      </div>            
    </el-carousel-item>
  </el-carousel>      
</template>
<script>
  
export default {
    name: 'rotating-display',
    props: {
      helpTextArray: Array
    }
}
</script>
<style scoped>    
  .el-aside {
    color: #333;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 15px;
    opacity: 0.75;
    line-height: 20px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: lightblue;color: navy;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: navy;color: lightblue;
  }
  @import url("https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.0/theme-chalk/index.css")
</style>