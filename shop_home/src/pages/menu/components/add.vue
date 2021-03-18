<template>
  <div>
              <!-- info.title:菜单标题  info.show：控制菜单是否显示 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label=" 菜单名称" :label-width="formLabelWidth">
                            <!-- 后台接口参数title表示菜单名称 -->
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
                            <!-- 后端接口上级菜单参数pid -->
          <el-select v-model="form.pid">
            <el-option label="--请选择--" disabled value=""></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 遍历菜单列表 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <template>
                        <!-- 参数type 1；目录  2：菜单 -->
            <el-radio v-model="form.type" :label="1">目录</el-radio>
            <el-radio v-model="form.type" :label="2">菜单</el-radio>
          </template>
        </el-form-item>
                                                         <!-- 判断type值等于1菜单图标显示 -->
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.type==1">
          <el-select v-model="form.icon">
            <!-- 遍历图标把图标放到下拉框 -->
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
                                                        <!-- 否则菜单地址显示 -->
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url">
            <!-- 遍历菜单地址 把菜单地址放入下拉框 -->
            <el-option v-for="item in urls" :key="item" :label="item"  :value="item"></el-option>
          </el-select>
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
import { successAlert } from '../../../utils/alert';
import {addMenu,oneMenu,updateMenu} from '../../../utils/request'
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1, //类型 1目录 2菜单
        url: "",
        status: 1, //状态 1正常 2 禁用
      },
      formLabelWidth: "120px",
      // 所有图标
       icons:['el-icon-menu','el-icon-setting','el-icon-shopping-bag-1'],
      //  存放所有菜单地址
      urls:[
        'home',
        'menu',
        'role',
        'manager',
        'cate',
        'spec',
        'goods',
        'member',
        'banner',
        'seckill'
      ]
    };
  },
  computed:{
    ...mapGetters({
      'list':'menu/menuList'
    })
  },
  methods:{
    ...mapActions({
      'requestMenuList':'menu/menuListActions'
    }),
    // 自定义事件 
    cancel(){
     // 点击取消按钮让添加菜单窗口消失
      this.info.show = false;
      //点击取消按钮让添加菜单窗口里面的内容返回初始值
      this.form = {
         pid: 0,
        title: "",
        icon: "",
        type: 1, //类型 1目录 2菜单
        url: "",
        status: 1, //状态 1正常 2 禁用
      }
    },
    // 添加数据方法
    confirm(){
      // 发起添加菜单请求
      // console.log(this.form);
      addMenu(this.form).then(res=>{
        // 只处理成果的结果
        successAlert(res.data.msg);
        this.cancel();
        this.requestMenuList();
      })
    },
    // 获取菜单详情方法
    getDetail(id){
      // 发起菜单详情
      oneMenu({id}).then(res=>{
         
        // form表单的内容等于res里面data下面的list
          this.form = res.data.list;
          this.form.id = id;
      })
    },
    // 修改菜单
    update(){
        // 发起修改菜单请求
        updateMenu(this.form).then(res=>{
          // 处理修改成功的结果
          successAlert(res.data.msg);
          // 修改完成后页面隐藏
          this.cancel();
          // 修改完成后发起一次请求更新页面
          this.requestMenuList();
        })
    }
  },
  mounted(){
    // 组件挂载完成时获取菜单列表数据
    this.requestMenuList();

  }
};
</script>

<style scoped>
.el-input {
  width: 60%;
}
.el-button {
  margin-top: 20px;
}
</style>