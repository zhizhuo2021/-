<template>
  <div>
    <!-- info.title:菜单标题  info.show：控制菜单是否显示 -->
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="opened">
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option label="--请选择--" disabled value=""></el-option>
            <!-- 遍历分类列表 -->
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option v-for="item in seconedCate" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" 商品名称" :label-width="formLabelWidth">
          <!-- 后台接口参数title表示菜单名称 -->
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
             <el-form-item label=" 价格" :label-width="formLabelWidth">
          <!-- 后台接口参数title表示菜单名称 -->
          <el-input v-model="form.price"></el-input>
        </el-form-item>
             <el-form-item label=" 市场价格" :label-width="formLabelWidth">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
          <el-form-item label=" 图片" :label-width="formLabelWidth">
              <div class="img-box">
                  <h3>+</h3>
                  <img v-if="imageUrl" :src="imageUrl" alt="">
                  <input type="file" @change="changImg">
              </div>
        </el-form-item>
              <el-form-item label="商品规格" :label-width="formLabelWidth">
          <!-- 后端接口上级菜单参数pid -->
          <el-select v-model="form.specsid" @change="changeSpec">
            <el-option label="--请选择--" disabled value=""></el-option>
            <!-- 遍历分类列表 -->
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
              <el-form-item label="规格属性" :label-width="formLabelWidth" >
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" disabled value=""></el-option>
            <!-- 遍历分类列表 -->
            <el-option v-for="(item,index) in seconedSpec" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
              <el-form-item label="是否新品" :label-width="formLabelWidth">
          <template>
           <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </template>
        </el-form-item>
              <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <template>
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="blue"
            inactive-color="grey"
            :active-value="1"
            :inactive-value="2">
            </el-switch>
        </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
              <div id="div1">

              </div>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" v-if="info.isAdd">确 定</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions } from 'vuex';
import { warningAlert } from '../../../utils/alert';
import E from 'wangeditor'
export default {
    props:['info'],
     data(){
         return{
             imageUrl:'',//要显示在页面中的图片地址
             formLabelWidth:'120px',
             seconedCate:[],//获取二级分类列表
             seconedSpec:[],
             form:{
                 first_cateid:'',
                 second_cateid:'',
                 goodsname:'',
                 price:'',
                 market_price:"",
                 img:'',
                 description:'',
                 specsid:'',
                 specsattr:[],
                 isnew:1,
                 ishot:1,
                 status:1,

             }
         }
     },
     computed:{
         ...mapGetters({
             "cateList":"cate/cateList",
             "specList":"spec/specList"
         })
     },
     methods:{
         ...mapActions({
             "requestCateList":"cate/cateListActions",
             "requestSpecList":"spec/specListActions"
         }),
        //  对话框打开结束之后的回调
         opened(){
             
         const editor = new E('#div1')
         editor.create()
         },
        //  改变一级分类时获取二级分类
         changeCate(){
             this.form.second_cateid= '';
            var index =  this.cateList.findIndex(item=>item.id==this.form.first_cateid)
           this.seconedCate = this.cateList[index].children
         },
         changeSpec(){
             this.form.specsattr = '';
             var index = this.specList.findIndex(item=>item.id==this.form.specsid)
             this.seconedSpec = this.specList[index].attrs;
         },
        //  改变文件时获取图片地址和详细信息
         changImg(e){
             var file = e.target.files[0];
            //  1文件大小处理
           
            if(file.size > 2*1024*1024){
                warningAlert('上传图片不能超过2M');
                return;
            }
             // 2文件后缀处理
             var ext = ['.jpg','.png','.jpeg','.gif'];
             var extName = file.name.slice(file.name.lastIndexOf('.'));

            if(!ext.some(item=>item==extName)){
                warningAlert('上传图片格式不正确');
                return;
            }
            // 3将图片信息生产图片地址并显示
            this.imageUrl = URL.createObjectURL(file);
            // 将图片信息存入this.form.img中
            this.form.img = file;

         } 
     },
   
    mounted(){
         //  发起一级分类请求
        this.requestCateList()
        // 发起商品规格请求
         this.requestSpecList();
         
    }

}
</script>

<style scoped>
.img-box{
    width: 150px;
    height: 150px;
    border: 1px dashed skyblue;
    position: relative;
}

.img-box h3{
    text-align: center;
    line-height: 150px;
    width: 100%;
    height: 100%;
}

.img-box img{
width: 100%;
height: 100%;
position: absolute;
left: 0;
top: 0;

}
.img-box input{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}

</style>