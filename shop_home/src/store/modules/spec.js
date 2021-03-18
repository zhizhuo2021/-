import {getSpec,specCount} from "../../utils/request";
const state = {
    specList:[],
    size:10, //每页显示两条
    page:1, //当前页码
    count:0, //商品规格总数
}

const mutations = {
    changeSpecList(state,arr){ 
        state.specList = arr
    },
    changeCount(state,num){
        state.count = num;
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    specListActions(context){
        var params ={
            size:context.state.size,
            page:context.state.page,
        }
        // 发起请求
        getSpec(params).then(res=>{
            if((res.data.list == null || res.data.list.length == 0) && context.state.page > 1){
                var p = context.state.page -1;
                context.commit('changePage',p);
                context.dispatch('specListActions')
            }
            context.commit('changeSpecList',res.data.list)
        }) 

    },
    countActions(context){
        specCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
          
        })
    },
    pageActions(context,page){
        context.commit('changePage',page)
    }
}

const getters ={
    specList(state){
        return state.specList
    },
    count(state){
        return state.count
    }
}

export default {
    state,mutations, actions,getters,
    namespaced:true,
    
}