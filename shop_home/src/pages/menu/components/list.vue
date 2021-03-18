<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号"> </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template v-slot="prop">
          <el-button type="primary" v-if="prop.row.status ==1">启用</el-button>
          <el-button type="danger" v-else>禁止</el-button>
        </template>
      </el-table-column>
          <el-table-column prop="status" label="操作">
        <template v-slot="paaarop">
          <el-button type="primary" @click="edit(paaarop.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(paaarop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../../utils/alert';
import {delMenu} from '../../../utils/request'
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      'tableData': "menu/menuList",
    }),
  },
  methods: {
    ...mapActions({
      'requetMenuList': "menu/menuListActions",
    }),
    // 事件传递方法
    edit(id){
      // 自定义传递事件
      this.$emit('edit',id);
    },
    // 删除菜单
    del(id){

       this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         // 发起删除菜单请求
      delMenu({id}).then(res=>{
        // 已经删除成功弹出提示框
        successAlert(res.data.msg);
        // 删除成功后发起一次请求 更新页面
        this.requetMenuList();

      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
        
    }
  },
  mounted() {
    // 发起菜单列表请求
    this.requetMenuList();
  },
};
</script>

<style>
</style>