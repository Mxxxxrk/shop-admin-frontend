<template>
    <div> 
        <el-row type="flex" justify="space-between" align="middle" class="header">
            <div class="el-icon-back" @click="handleToggle" ></div>
            <div>{{username}}{{identity}}</div>
            <a href="javascript:void(0)" @click="handleLogout">退出</a>
        </el-row>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
 
 computed:{
     ...mapState("user",{
        //  获取store的值
        username:"username",
        identity:"identity"
     })
 },
  
  methods:{
      handleToggle(){
          this.$emit("onChange")
      },
      //退出操作
      handleLogout(){
          this.$store.dispatch("user/logout",()=>{
              this.$router.push("/login")
          })
      }
  }
}
</script>

<style scoped>
    .header{
        height: 60px;
    }

    .el-icon-back{
        cursor: pointer;
    }
</style>
