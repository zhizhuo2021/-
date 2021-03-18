<template>
  <div>
     <el-button type="primary" @click="add">添加</el-button>
     <!-- 添加组件 -->
     <v-add :info='info' ref="add"></v-add>
     <!-- 列表子组件 -->
     <v-list @edit="edit"></v-list>
  </div>
</template>

<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
  data(){
    return{
      info:{
         show:false,
         title:'',
         isAdd:true
         
      }
    }
  },
  methods:{
    add(){
      this.info.show = true;
      this.info.title = '添加管理员';
      this.info.isAdd = true;
    },
    edit(uid){
      this.info.show = true;
      this.info.title = '编辑管理员';
      this.info.isAdd = false;
      this.$refs.add.getDetail(uid)
    }
  },
components:{
  vAdd,
  vList
},

}
</script>

<style scoped>
.el-button{
    margin-top: 20px;
}
</style>