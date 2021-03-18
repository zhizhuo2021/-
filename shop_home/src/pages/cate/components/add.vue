<template>
  <div>
    <!-- info.title:菜单标题  info.show：控制菜单是否显示 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="formLabelWidth">
          <!-- 后端接口上级菜单参数pid -->
          <el-select v-model="form.pid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <!-- 遍历分类列表 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" 分类名称" :label-width="formLabelWidth">
          <!-- 后台接口参数title表示菜单名称 -->
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
         <el-form-item label=" 图片" :label-width="formLabelWidth">
          <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-change="changeImg"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2"
          >
            <!--  :active-value="1" 开关打开时的值 -->
            <!-- :inactive-value="2" 开关关闭时的值 -->
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- 定义一个事件点击按钮添加菜单弹窗消失 -->
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="confirm" v-if="info.isAdd">
          确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert, warningAlert } from '../../../utils/alert';
import { addCate } from '../../../utils/request';
import {mapGetters,mapActions } from "vuex";    
import {oneCate} from "../../../utils/request";
import {updateCate} from "../../../utils/request";
export default {
    props:['info'],
    data(){
        return{
            formLabelWidth:'120px',
            imageUrl:'',//图片要显示的地址
            form:{
                pid:0,
                catename:'',
                img:'',
                status:1,


            }

        }
    },
    computed:{
        ...mapGetters({
            "cateList":"cate/cateList"
        })
    },
    methods:{
        ...mapActions({
            "requestgetCateList":"cate/cateListActions",
        }),
        cancel(){
               this.info.show = false;
               this.form = {
                 pid:0,
                catename:'',
                img:'',
                status:1,
               } 
               this.imageUrl = ''
               
        },
        confirm(){
           
            addCate(this.form).then(res=>{
                successAlert(res.data.msg);
                this.cancel()
               this.requestgetCateList()
              
            })
        },
        // 改变图片时获取图片路径及信息
        changeImg(e){
            // 处理上传文件大小
            if(e.size > 2*1024*1024){
                warningAlert('文件上传大小不能超过2M');
                return;
            }

            // 处理文件后缀
            var ext = ['.jpg','.pnj','.jpeg','.gif'];
            // e的name中从最后一个点出现的位置 开始截取
            var extName = e.name.slice(e.name.lastIndexOf('.'));

            if(!ext.some(item=>item==extName)){
                warningAlert('文件上传格式不正确');
                return;
            }

            // 上传正确的文件
            this.imageUrl = URL.createObjectURL(e.raw);
            // 将文件存放到form.img中
            this.form.img = e.raw;
        },
        getDetail(id){
            oneCate({id}).then(res=>{
              this.form = res.data.list;
              this.form.id = id;
            if(this.form.img){
              this.imageUrl = this.$preImg + this.form.img;
            }else{
              this.imageUrl = ''
            }
              
            })
        },
        update(){      
            updateCate(this.form).then(res=>{
                // console.log(this.form);
                successAlert(res.data.msg);
                this.cancel();
              this.requestgetCateList()
            })
        }
    },
    mounted(){
        this.requestgetCateList()
        
    }
};
</script>

<style scpoed>

.avatar-uploader  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader  .el-upload:hover {
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
    .el-input{
        width: 60%;
    }


 
</style>