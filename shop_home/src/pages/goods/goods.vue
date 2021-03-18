<template>
  <div>
     <el-button type="primary" @click="add">添加</el-button>
     <!-- 添加子组件 -->
     <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import vAdd from './components/add'
export default {
components:{
    vAdd,

},
data(){
    return{
        info:{
            show:false,
            title:'',
            isAdd:true,
        }
    }
},
methods:{
    add(){
        
        this.info.show = true;
        this.info.title = "添加商品管理";
        this.info.isAdd = true;
    }
}
}
</script>

<style scoped>
.el-button{
    margin-top: 20px;
}

</style>