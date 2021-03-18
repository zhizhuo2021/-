<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', }"
    >
      <el-table-column prop="id" label="用户编号" >
      </el-table-column>
      <el-table-column prop="username" label="用户名" >
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="primary">启用</el-button>
         </el-table-column>
      <el-table-column prop="address" label="操作"> 
        <template v-slot="prop">
        <el-button type="primary" @click="edit(prop.row.uid)">编辑</el-button>
        <el-button type="danger" @click="del(prop.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size="2"
  @current-change='cpage'
  :total="count">
</el-pagination>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { successAlert } from '../../../utils/alert';
import {delManager} from '../../../utils/request'
export default {
  data(){
    return{
          
       
    }
  },
 computed:{
   ...mapGetters({
     'tableData':'manager/managerList',
     'count':'manager/count'
   })
 },
  methods:{
    ...mapActions({
      'requestManagerList':'manager/managerListActions',
      'requestCount':'manager/countActions',
      'questpage':'manager/pageActions',
    }),
    // 获取当前页码数
    cpage(page){
     this.questpage(page);
     this.requestManagerList()
     
    },
    edit(uid){
      this.$emit('edit',uid)
    },
    del(uid){

         this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // 发起删除列表请求
      delManager({uid}).then(res=>{
        // 已经删除成功
        successAlert(res.data.msg);
        this.requestCount()
       this.requestManagerList()
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      this.requestManagerList()
    }
  },
  mounted(){
    this.requestCount()
    this.requestManagerList()
  }
};
</script>

<style scoped>
  .el-pagination{
    text-align: right;
  }
</style>