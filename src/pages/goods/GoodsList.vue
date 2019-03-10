<template>
    <div>
        <!-- 顶部工具栏 -->
        <el-row type="flex" justify="space-between" align="middle">
            <div>
                <!-- 跳转到新增商品 -->
                <el-button @click="handleToGoodsAdd">新增</el-button>
                <el-button @click="handleDelete(idsStr)">删除</el-button>
            </div>
            <!-- 搜索框 -->
            <div>
                <el-input placeholder="请输入内容" v-model="searchvalue" >
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
                </el-input>
            </div>
        </el-row>
        <!-- 表格 -->
        <!-- data用于接收表格数据，tableData是data中的数据，由后台返回的 -->

        <el-table :data="tableData" style="width: 100% " class="mt20" @selection-change="handleSelectionChange" >
            <!-- 多选框 -->
            <el-table-column  type="selection" width="55"></el-table-column>
            <!-- 每一列的数据, prop定义数据结构对象要显示的属性 -->
            <el-table-column label="标题" width="280">
              <!-- 标题的自定义模板 -->
                <template slot-scope="scope">
                <el-row type="flex" align="middle">
                    <img :src="scope.row.imgurl" class="goods-img"/>
                    <p>{{scope.row.title}}</p>
                </el-row>
                </template>
            </el-table-column>
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
                    <el-button size="mini"  type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
<!-- 分页器 -->
        <div class="block mt20">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[2, 4, 6, 8]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount"
            >
            </el-pagination>
        </div>
    </div>
</template>


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
            searchvalue:"",
            // 数据总条数
            totalCount: 0,
           // 保存要删除的商品
           idsStr: ""
            
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
                this.totalCount=data.totalcount

            })
        },
      handleEdit(index, row) {
        this.$router.push(`/admin/goods-edit/${row.id}`)
      },
       //删除商品的时候出发
      handleDelete(ids) {
       //删除的操作  通过接口删除这个id的数据
       this.$axios.get(`http://localhost:8899/admin/goods/del/${ids}`).then((res)=>{
            const {message,status} = res.data
            if(status===0){
                //删除成功
                this.$message({
                    message:message,
                    type:"success"
                })
            }
            // 重新请求数据
            this.getList()
       })
      },
      //跳转到新增商品
      handleToGoodsAdd(){
          this.$router.push("/admin/goods-add")
      },
      //分页器
    // 切换显示条数时候触发
    handleSizeChange(num) {
      this.pageSize = num;
      this.getList();
    },

    // 切换页数触发
    handleCurrentChange(num) {
      // 把pageIndex修改为当前选择的页面
      this.pageIndex = num;
      this.getList();
    },
    // 点击搜索按钮时候触发
    handleSearch(){
      // 把当前页面重置为1
      this.pageIndex = 1;
      // 重新请求数据
      this.getList();
    },
    //当表格选择的时候触发
    
    handleSelectionChange(val) {
       //val 数组 为选中的数据 
      //循环遍历数组中id
      const ids=val.map(v=>{
          return v.id
      })
       // 拼接选中商品的id
      this.idsStr = ids.join(",");

      }

    }
  }
</script>
<style scoped>
  .goods-img{
    width:64px;
    height:64px;
    display: block;
    margin-right:10px;
    flex-shrink: 0;
  }

</style>
