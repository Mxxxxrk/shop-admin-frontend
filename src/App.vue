<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
export default {
name:'app',
  mounted(){
    // 请求是否登录的接口
    this.$axios({
        url: "/admin/account/islogin",
      }).then(res => {
      if(res.data.code === "nologin"){
        // 因为接口永远都是返回nologin，先注释
        // this.$router.push("/login");
      }
    })
  }
}
</script>

<style>
.mt20{
  margin-top:20px;
}

.mb20{
  margin-bottom: 20px;
}
</style>
