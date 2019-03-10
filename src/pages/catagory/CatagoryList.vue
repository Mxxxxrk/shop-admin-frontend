<template>
    <div class="block">
          <!-- 顶部的工具栏 -->
    <el-row type="flex" justify="space-between" align="middle" class="mb20">
      <div>
        <!-- 跳转到新增商品 -->
        <el-button @click="handleCategoryAdd">新增</el-button>
      </div>
    </el-row>
        <el-tree
         :data="data"
         show-checkbox
         node-key="id"
         default-expand-all
         :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
  <!-- node, data是scope解构出来的属性 -->
                <span>{{ node.label }}</span>
                <span>
                    <el-input size="mini" v-model="data.sort_id" @blur="handleEnter(data)"/>
                </span>
                <span>
                <el-button type="text"  size="mini"  @click="() => append(data)"> 编辑 </el-button>
               </span>
            </span>
        </el-tree>
    </div>

</template>


<script>

  let id = 1000;

  export default {
    data() {
        return {
            data:[]
        }
    },

    mounted(){
        this.$axios({
            url:"/admin/category/getlist/goods",
         
        }).then((res)=>{
             let {message} =res.data
             // 递归函数    
             //重新排   
             message=message.sort((a,b)=>{
                return a.category_id - b.category_id
             })
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
                            //为什么要添加以下两个数据？
                            id:item.category_id,
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
                        id: v.category_id,
                        label: v.title
                    })
                }else{
                    loop(arr,v)
                }
            })
            
            this.data=arr
            console.log(arr)
        });
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
              <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
              <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
            </span>
          </span>);
      },
       //跳转到新增商品
      handleCategoryAdd(){
          this.$router.push("/admin/category-add")
      },
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>