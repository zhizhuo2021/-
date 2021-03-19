<template>
  <div>
    <el-table
      :data="specData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', }"
    >
      <el-table-column prop="id" label="规格编号" >
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" >
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性"> 
          <template v-slot="prop">
        <el-tag v-for="(item,index) in prop.row.attrs" :key="index">{{item}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <el-button type="primary">启用</el-button>
         </el-table-column>
      <el-table-column prop="address" label="操作"> 
        <template v-slot="prop">
        <el-button type="primary" @click="edit(prop.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(prop.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size="page"
  @current-change='cpage'
  :total="count">
</el-pagination>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {delSpec} from '../../../utils/request'
import {successAlert} from '../../../utils/alert'
export default {
    computed:{
        ...mapGetters({
            "specData":"spec/specList",
            "count":"spec/count",
            "page":"spec/page"
        })
    },
    methods:{
        ...mapActions({
            "requestSpecList":"spec/specListActions",
            "requestCount":"spec/countActions",
            "requestPage":"spec/pageActions"
        }),
        cpage(page){
            this.requestPage(page);
            this.requestSpecList();
        },
        edit(id){
          this.$emit('edit',id);
        },
        del(id){

                this.$confirm('你确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         // 发起删除菜单请求
      delSpec({id}).then(res=>{
        // 已经删除成功弹出提示框
        successAlert(res.data.msg);
        // 删除成功后发起一次请求 更新页面
         this.requestSpecList();
          this.requestCount();

      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
        }
    },
    mounted(){
        this.requestSpecList();
        this.requestCount();
    }
}
</script>

<style scoped>
.el-pagination{
  text-align: right;
}

</style>