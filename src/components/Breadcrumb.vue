<template>
    <div class="breadcrumb">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: item.src }" 
            v-for="(item,index) in routeInfo" 
            :key="index"
            >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
 //监听路由数据变化。利用$route.matched 获取携带的信息。通过map方法循环返回一个新数组
 computed:{
     routeInfo:function(){
         const matched =this.$route.matched;
         const newArr = matched.map(v=>{
             return {
                src: v.path,
                title:v.meta
             }
         })
         return newArr
     }
 } 
}
</script>

<style>
.breadcrumb{
    padding-bottom: 20px;
    border-bottom: 1px solid #999;
    margin-bottom: 20px;
    
}
</style>

