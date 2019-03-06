<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择活动区域">
                    
                <el-option-group v-for="(item,index) in categorys"
                  v-if="item.parent_id===0"
                  :key="index" 
                  :label="item.title">
                    <el-option
                    v-for="(subItem, subIndex) in categorys" 
                    v-if="subItem.parent_id == item.category_id" 
                    :key="subIndex" 
                    :label="subItem.title" 
                    :value="subItem.category_id"
                    >
                    </el-option>   
                </el-option-group>
                
                </el-select>
            </el-form-item>
            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
             <el-form-item label="是否显示">
                <el-switch v-model="form.is_slide"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-checkbox-group v-model="form.is_top">
                    <el-checkbox label="置顶" name="type"></el-checkbox>        
                </el-checkbox-group>
                 <el-checkbox-group v-model="form.is_hot">
                    <el-checkbox label="热门" name="type"></el-checkbox>        
                </el-checkbox-group>

            </el-form-item>
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item> 
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
             <el-form-item label="封面图片">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:8899/admin/article/uploadimg"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="商品货号">
                <el-input v-model="form.goods_no"></el-input>
            </el-form-item>
            <el-form-item label="库存数量">
                <el-input v-model="form.stock_quantity"></el-input>
            </el-form-item>
            <el-form-item label="市场价格">
                <el-input v-model="form.market_price"></el-input>
            </el-form-item>
            <el-form-item label="销售价格">
                <el-input v-model="form.sell_price"></el-input>
            </el-form-item>
             <el-form-item label="图片相册">
                <el-upload
                    action="http://localhost:8899/admin/article/uploadimg"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="handleFileList">
                   
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
           <el-form-item label="内容摘要">
                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
            </el-form-item>

            <el-form-item label="内容描述">
                <quill-editor v-model="form.content"></quill-editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
  export default {
    data() {
      return {
        form: {
          categorys_id: '',
          status: false,
          is_slide: false,
          is_top: false,
          is_hot: false,
          title:'',
          sub_title: '',
          goods_no:'',
          stock_quantity:'',
          market_price:'',
          sell_price:'',
          zhaiyao:'',
          content: '',
          imgList:[],
          fileList:[],
        },
        //头像图片
        imageUrl: '',
        //图片墙预览链接
        dialogImageUrl: '',
        //是否预览图片
        dialogVisible: false,
        //类别数据。。。
        categorys:[]
      }
    },
    mounted(){
        //请求分类数据
        this.$axios({
            method:"GET",
            url: `/admin/category/getlist/goods`,
        }).then(res=>{
            const { message }=res.data;
            this.categorys = message;

        })

    },
    methods: {
      onSubmit() {
        // 提交表单数据
        this.$axios({
            method:"POST",
            url:"/admin/goods/add/goods",
            data:this.form,
             withCredentials: true,
        }).then(res => {
            const {message, status} = res.data;

            if(status == 0){
                this.$message({
                    message: message,
                    type: 'success'
                });

                setTimeout(() => {
                    this.$router.replace("/admin/goods-list")
                }, 1000)
            }
        })
      },
      //封面图片处理方法
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.imgList=[res]
      },
         // 上传图片相册的成功回调函数
        handleFileList(res){
        this.form.fileList.push(res);
      },

      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },

      //图片墙处理方法
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //图片相册处理方法
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
    },
    components: {
    quillEditor
  }
  }
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
