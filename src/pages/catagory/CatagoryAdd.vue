<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="排序数字">
                <el-cascader
                :options="data"
                :show-all-levels="false" 
                @change="handelChange"
                ></el-cascader>
                当前分类的id为：{{form.category_id}}
            </el-form-item>
            <el-form-item label="排序数字">
                <el-input v-model="form.sort_id"></el-input>
            </el-form-item>
            <el-form-item label="类别名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="类别级别">
                <el-input v-model="form.class_layer"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data(){
      return {
          form:{
              title:"",
              sort_id: "",
              category_id: "",
              class_layer: "" 
          },
          data:[]
      };
  },
  methods:{
      onSubmit(){
          this.$axios({
              method: "POST",
              url: `/admin/category/add/goods`,
              data: this.form,
              // 处理跨域
                withCredentials: true,
          }).then(res =>{
             const {message, status} = res.data;
            if(status == 0){
                this.$message({
                    message: message,
                    type: 'success'
                });
                setTimeout(() => {
                    this.$router.replace("/admin/catagory-list")
                }, 1000)
            }
          })
      },
      handelChange(data){
          this.form.category_id=data[data.length-1]
      }

  },
  mounted(){
       this.$axios({
           url: "/admin/category/getlist/goods"
        }).then((res)=>{
             let {message} =res.data
          
            // 最终的结果的数组
            let arr=[];
            function loop (arr,item){
                arr.forEach((v)=>{
                    // 判断item的id是否和父级的category_id相等，如果相等的话就把item加入到当前分类下children
                    if(v.category_id==item.parent_id){
                        //判断当前分类是否有children
                        if(!v.children){
                            //如果没有初始化为空数组
                            v.children=[]
                        }
                             // 加入到当前分类下children
                        v.children.push({
                            ...item,
                            value:item.category_id,
                            label:item.title
                        });
                        return
                    }
                    // 如果不符合上述条件，继续递归判断当前分类的子元素
                if(v.children){
                    loop(v.children,item)
                }
                })
            }
            message.forEach(v=>{
                if(v.parent_id==0){
                    arr.push({
                        ...v,
                        value: v.category_id,
                        label: v.title
                    })
                }else{
                    loop(arr,v)
                }
            })
            this.data=arr
            console.log(arr)
        });
  }
}
</script>

<style>

</style>
