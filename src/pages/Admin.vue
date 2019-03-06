<template>
    <div class="admin-container">
        <el-container>
            <!-- 左侧菜单栏 -->
            <el-aside width="auto">
                <!-- 传值给子组件  :isCollapse="isCollapse" -->
                <app-aside  :isCollapse="isCollapse"  ></app-aside>
            </el-aside>
            
            <!-- 右侧内容区域 -->
            <el-container>
                <!-- 头部 -->
                <el-header>
                    <!-- 给组件传递事件  @onChange="changeCollapse"-->
                    <app-header  @onChange="changeCollapse"></app-header>
                </el-header>
                <!-- 主体 -->
                <el-main>       
                    <breadcrumb></breadcrumb>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
//引入组件 局部组件还需要祖注册组件
import Aside from "../components/Aside"
import Header from "../components/Header"
import Breadcrumb from "../components/Breadcrumb"


export default {
name:"admin-index",
components:{
    //注册组件， 名称不可与H5重名
    "app-aside":Aside,
    "app-header":Header,
    "breadcrumb": Breadcrumb
   
},
data(){
    return {
        isCollapse:false
    }
},
methods:{
    changeCollapse(){
        this.isCollapse=!this.isCollapse
    }
}
}
</script>

<style>
/* container外层的div */
.admin-container{
    position: fixed;
    width:100%;
    top:0;
    bottom:0;
}
.el-header{
color: #333;

    }
.el-aside{
    display: flex;
    flex-direction: column;
    background-color: rgb(84, 92, 100);
}
.el-main{
    background-color: #E9EEF3;
}
  .el-container {
    margin-bottom: 40px;
    /*继承admin-container的高度*/
    height: 100%;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
   .logo{
      height:60px;
      background:#454f5a;
  }
</style>
