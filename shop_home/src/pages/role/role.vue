<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 添加组件 通过自定义事件将数据传到子组件中 -->
    <v-add :info="info" ref='add'></v-add>
    <v-list @edit='edit'></v-list>
  </div>
</template>

<script>
// 父组件和子组件关联
import vAdd from './components/add'
import vList from './components/list'

export default {
    data(){
        return{
            // 存储数据
            info:{
                show:false,
                title:'',
                isAdd:true
            }
        }
       
    },

    methods:{
        // 通过数据显示add显示和隐藏
        add(){
            this.info.show = true;
            this.info.title = '添加角色'
            this.info.isAdd = true;
        },
         edit(id){
            this.info.show = true;
            this.info.title = '编辑角色';
            this.info.isAdd = false;
            this.$refs.add.getDetaill(id); 
        }
    },

   components:{
       vAdd,
       vList,
   },

}
</script>

<style scoped>
.el-button{
    margin-top: 20px;

}
</style>