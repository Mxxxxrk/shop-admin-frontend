<template>
    <div>
        <!-- 顶部工具栏 -->
        <el-row type="flex" justify="space-between" align="middle">
            <div>
                <!-- 跳转到新增商品 -->
                <el-button @click="handleToGoodsAdd">新增</el-button>
                <el-button >删除</el-button>
            </div>
            <!-- 搜索框 -->
            <div>
                <el-input placeholder="请输入内容" v-model="input5" >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </el-row>
        <!-- 表格 -->
        <!-- data用于接收表格数据，tableData是data中的数据，由后台返回的 -->
        <el-table :data="tableData" style="width: 100% " class="mt20" >
            <!-- 每一列的数据, prop定义数据结构对象要显示的属性 -->
            <el-table-column label="标题" width="180" prop="title"></el-table-column> 
            <el-table-column label="类型" width="180" prop="catagoryname"></el-table-column>
            <el-table-column label="价格" width="180">
                   <!-- 自定义模板, slot-scope属性可以获取当前每一行数据，数据是一个对象，scoped.row可获取该对象-->
                <template slot-scope="scope"> 
                    <span>{{scope.row.market_price}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope"> 
                    <el-button size="mini"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini"  type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {

}
</script>

<script>
  export default {
    data(){
        return{
            tableData:[],
            // 当前第几页，默认是1
            pageIndex:1,
            //每页显示的条数，默认是10
            pageSize:2,
            // 搜索条件，将会模糊匹配商品标题
            searchvalue:""
            
        }
    },
    mounted(){
          //请求页面数据
        this.getList()
      },
    methods: {
        getList(){
            this.$axios.get(
                `http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchvalue}`
            )
            .then((res)=>{
                //获取返回的数据
                const {data} =res;
                //表格的数据
                this.tableData=data.message;
                //修改总条数
                // this.totalCount=data.totalCount

            })
        }
      ,handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      //跳转到新增商品
      handleToGoodsAdd(){
          this.$router.push("/admin/goods-add")
      }
      //删除商品的时候出发
    
    }
  }
</script>
<style>

</style>
