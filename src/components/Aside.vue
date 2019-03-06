<template>
    <div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <div class="logo"></div>
<el-menu default-active="1-4-1"
 class="el-menu-vertical-demo" 
 :collapse="isCollapse"
 background-color="#545c64"
 text-color="#fff"
 active-text-color="#ffd04b"
>
  <el-submenu v-for="(item,index) in menus" :key="index" :index="`${index + 1}`" >

    <template slot="title">
      <i :class="item.icon"></i>
      <span slot="title">{{item.title}}</span>
    </template>
    <el-menu-item-group>
      <el-menu-item 
      v-for="(subItem,subIndex) in item.group" 
      :key="subIndex" 	
      :index="`${index + 1}-${subIndex + 1}`"
      >

      <router-link :to="subItem.src"> {{subItem.title}}</router-link>
    
      </el-menu-item>
    </el-menu-item-group>
  </el-submenu>
  
</el-menu>

    </div>
</template>

<script>
export default {
 data(){
   //当前菜单的数据
   return{
     menus:[
       {
         icon:"el-icon-menu",
         title:"购物商场",
         group:[
           {src:"/admin/goods-list",title:"商品管理",meta:"商品管理"},
           {src:"/admin/catagory-list",title:"栏目管理",meta:"栏目管理"}
         ]
       }, 
       {
        icon: "el-icon-service",
				title: "会员管理",
        group:[
           {src:"#",title:"会员列表"},
         ]
       },
       {
        icon: "el-icon-service",
				title: "订单管理",
        group:[
           {src:"#",title:"订单列表"},
         ]
       }
     ]
   };

 },
 props:["isCollapse"]
}
</script>

<style>

</style>

<style>
.logo{
    height: 80px;
    background:#454f5a;
}

/* 设置菜单的高度为填满剩余空间 */
.el-menu-vertical-demo{
    flex:1;
    border-right:none;
    
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
  }
/*把title隐藏*/
.el-menu-item-group__title {
  display: none;
}
.el-menu-vertical-demo a{
	color:inherit;
	text-decoration: none;
}
</style>
