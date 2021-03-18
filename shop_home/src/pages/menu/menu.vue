<template>
  <div>
   
<el-button type="primary" @click="add">添加</el-button>
<!-- 添加组件       数据直接传递给子组件，父组件通过ref操作子组件  -->
<v-add :info='info' ref='add'></v-add>
<!-- 列表组件 -->
        <!-- 触发自定义事件传递给父组件 -->
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
           this.info.title = '添加菜单';
           this.info.isAdd = true;
        },
        edit(id){
            this.info.show = true;
            this.info.title = '编辑菜单';
            this.info.isAdd = false;
            this.$refs.add.getDetail(id);

        }
        
    },
    components:{
        vAdd,
        vList,
    }
}
</script>

<style scoped>
.el-button{
   margin-top: 20px;
}
</style>