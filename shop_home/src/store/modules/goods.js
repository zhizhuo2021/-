import {getGoods,goodsCount} from '../../utils/request'
const state ={
    goodsList:[],
    size:2,
    page:1,
    count:0,
}

const mutations = {
    changeGoodsList(state,arr){
        state.goodsList = arr
    },
    changeCount(state,num){
        state.count = num
    },
    changePage(state,page){
        state.page = page
    }
}

const actions = {
    goodsListActions(context){
        var params = {
            size:context.state.size,
            page:context.state.page,
        }
        // 发起获取商品列表数据请求
        getGoods(params).then(res=>{
            context.commit('changeGoodsList',res.data.list)
        })
    },
    countActions(context){
        // 发起获取商品总数请求
        goodsCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    pageActions(context,page){
        context.commit('changePage',page)
    }
}

const getters = {
    goodsList(state){
        return state.goodsList
    },
    count(state){
        return state.count
    },
    size(state){
        return state.size
    }
}

export default{
state,mutations,actions,getters,
namespaced:true
}
