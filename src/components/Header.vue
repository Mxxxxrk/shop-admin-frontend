<template>
    <div> 
        <el-row type="flex" justify="space-between" align="middle" class="header">
            <div class="el-icon-back" @click="handleToggle" ></div>
            <div>Admin</div>
        </el-row>
    </div>
</template>

<script>
export default {
  methods:{
      handleToggle(){
          this.$emit("onChange")
      }
  }
}
</script>

<style>
.header{
    height: 60px;
}
</style>
