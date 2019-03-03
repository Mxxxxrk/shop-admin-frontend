<template>
  <div id="app">
     <!-- 调用Element UI组件 -->
    <div class="title">登录</div>
    <div class="main">
      <el-row>
        <span>账号</span><el-input placeholder="请输入账号" v-model="username" clearable></el-input>
        <span>密码</span><el-input type="password" v-model="password" clearable></el-input>
      </el-row>
     </div>
    <div class="buttons">
      <el-row>           
        <el-button type="primary" class="submit" @click="handleSunbmit">提交</el-button>
        <el-button class="clearable" @click="handleClear">重置</el-button>
      </el-row> 
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'app',
  // mounted(){
  //   //请求数据
  //   this.$axios.get('https://api.github.com/users').then((res)=>{
  //     console.log(res.data)
  //   })
  // }
   data() {
      return {   
           username: '',
           password: ''
      }
      
    },
    methods:{
      handleSunbmit:function(){
        // console.log(this.username)
        var username=this.username 
        var password=this.password
        alert('账户：'+username+'密码：'+password)
      },
      handleClear:function(){
        this.username=''
        this.password=''
      }
    }
}
</script>

<style>
#app{
  width: 500px;
  margin: 200px auto
}
.title{
  padding: 10px 0;
 color:#409eff;
 font-size: 16px;
 text-align: center;
}
.main el-row{
display: flex;
width: 100%;
}

.main span{
  display: flex;
 width: 20%;
}
.main el-input{
  display: flex;
   width: 80%;
}
.buttons{
 padding-left: 200px;
 padding-top: 10px;
}
</style>
