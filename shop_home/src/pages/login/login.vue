<template>
  <div class="container">
<div class="con">
<h3>登录</h3>
<el-input placeholder="请输入用户名" v-model="user.username"></el-input>
<el-input type="password" placeholder="请输入密码" v-model="user.password"></el-input>
<div class="btn">
<el-button type="primary" @click="login">登录</el-button>
</div>
</div>
  </div>
</template>

<script>
import { successAlert, warningAlert } from '../../utils/alert'
import {requestLogin} from "../../utils/request";
import {mapActions} from "vuex";
export default {
    data(){
        return{
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{

        ...mapActions({
            'requestUser':'userActions'
        }),
        login(){

            // 方式二：通过vuex结合sessionStorage来做用户储存信息
            if(this.user.username !== '' || this.user.password !== ''){
                // 允许发起请求
                requestLogin(this.user).then(res=>{
                    successAlert(res.data.msg);
                    // 将数据存入vuex中
                    this.requestUser(res.data.list)
                     this.$router.push('/')
                })
            }else{
                warningAlert('请输入用户名或者密码')
            }


            // 方式一：通过localStorage进行数据存储
            // console.log(this.user);
            // if(this.user.username !== '' && this.user.password !== ''){
            //     // 允许发起请求
            //     requestLogin(this.user).then(res=>{
            //         // 登录成功提示
            //         successAlert(res.data.msg); 
            //         // 将用户信息存入到localStorage中
            //         if(localStorage.getItem('user') !== null){
            //             localStorage.removeItem('user')
            //         }
            //         localStorage.setItem('user',JSON.stringify(res.data.list))
            //         this.$router.push('/')
            //     })
                 
            // }else{
            //     warningAlert('请输入用户名或者密码')
            // }
          
        }
    },
   
}
</script>

<style scoped>
.container{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right ,#553443,#303d60);
    position: fixed;
    top: 0;
    left: 0;
}
.con{
    width: 500px;
    height: 300px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 10px;

}
h3{
    text-align: center;
    margin-top: 35px;

}
.el-input, .el-button{
    width: 320px;
    margin-top: 22px;
    margin-left: 80px;
}
</style>