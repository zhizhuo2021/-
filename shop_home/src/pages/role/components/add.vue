<template>
  <div>
    <!-- info.title:菜单标题  info.show：控制菜单是否显示 -->
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label=" 角色名称" :label-width="formLabelWidth">
          <!-- 后台接口参数title表示菜单名称 -->
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="formLabelWidth">
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
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import {addRole,oneRole,updataRole} from '../../../utils/request'
export default {
  // 接受父组件传递过来的数据
  props: ["info"],
  data() {
    return {
      formLabelWidth: "120px",
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },

      defaultProps: {
        children: "children",
        label: "title",
      },
      defaultKey: [], //默认选中的值
    };
  },
  computed: {
    ...mapGetters({
      'data': "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      'requestMenuList': "menu/menuListActions",
      'requestRoleList':'role/roleListActions'
    }),
    //   点击取消按钮添加角色页面消失
    cancel() {
      this.info.show = false;
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      // 点击取消按钮的时候把选中的复选框全部清空
      this.defaultKey = this.$refs.tree.setCheckedKeys([]);
    },
    // 点击确定按钮事件
    confirm() {
        // muens：角色权限 通过refs获取tree里面复选框选中的内容获取对应的id
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
        // console.log(this.form);
        // 发起角色权限添加请求
        addRole(this.form).then(res=>{
            // 请求成功提示弹窗
            successAlert(res.data.msg);
            // 调用取消的方法让添加窗口消失内容清空
            this.cancel();
           this.requestRoleList();
        })
        
    },
    // 获取角色详情
      getDetaill(id){
      //   发去获取角色详情请求
      oneRole({id}).then(res=>{
        // successAlert(res.data.mag)
        this.form = res.data.list;
        this.form.id= id; 
        this.defaultKey = JSON.parse(this.form.menus);
      })
      },
      // 修改并提交数据
      updata(){
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
        // console.log(this.form);
        updataRole(this.form).then(res=>{
          successAlert(res.data.msg);
          this.cancel();
          this.requestRoleList();
        })  
      }
  },  
  mounted() {
    this.requestMenuList();
  },
};
</script>

<style>
</style>