export const state = {
    user:sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null//用来存储登录后的用户信息
}
export const mutations = {
    changeUser(state,user){
        // 1.将用户信息存入到store中的state中
        state.user = user
        if(user){

       
        // 2.同时将用户信息存入到sessionStorage中
        sessionStorage.setItem('user',JSON.stringify(user))
    }else{
        sessionStorage.removeItem('user')
    }
    }
}
export const getters = {
    user(state){
        return state.user 
    }
}
