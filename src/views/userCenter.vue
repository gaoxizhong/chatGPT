<template>
  <div class="center-box">
    <el-row :gutter="10" class="row-bg" type="flex">
      <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">
        <div class="grid-content">
          <div class="userinfo-title">个人信息</div>
          <div class="userinfo-imgName">
            <img src="../assets/image/img-user.jpg" alt="" />
            <span>{{ phone }}</span>
          </div>
          <div class="num-box">
            <!-- <div>剩余次数：{{number}}次</div> -->
          </div>
          <div class="footer-box">
            <span @click="toLogin">退出</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>


<script>
  import { get_chatgpt_num } from '@/api/data'
  export default {
    name: 'userCenter',
    data(){
      return{
        uid: window.localStorage.getItem('uid'),
        phone: window.localStorage.getItem('phone'),
        number: 0
      }
    },
    created(){
      // 获取用户剩余次数
      this.get_chatgpt_num()
    },
    mounted(){

    },

    methods: {
      // 获取用户剩余次数
      get_chatgpt_num(){
        let that = this;

        get_chatgpt_num({
          uid:that.uid,
        }).then( res =>{
          if(res.data.code == 0){
            that.number = res.data.data.chatgpt_num
          }
        })
      },
      toLogin(){
        window.localStorage.setItem('token','');
        window.localStorage.setItem('uid','');
        window.localStorage.setItem('phone','');
        this.$router.push({name: 'Login'});
    },
    },
  }
</script>


<style scoped>
  .center-box{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: auto;
    background: #fff;
    box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
    padding: 20px;
  }
  .grid-content{
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 20px;
    transition: 0.5s;
    text-align: left;
  }
  .row-bg .el-col{
    padding: 10px;
  }
  .row-bg.el-row{
    flex-wrap: wrap;
  }
  .userinfo-title{
    font-size: 16px;
  }
  .userinfo-imgName{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .userinfo-imgName>img{
    width: 100px;
    height: 100px;
    display: inline-block;
  }
  .userinfo-imgName>span{
    display: inline-block;
    margin-top: 10px;
    font-size: 28px;
    line-height: 40px;
    font-weight: 700;
  }
  .num-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
  }
  .num-box>div{
    flex: 1;
    font-weight: 700;
    font-size: 14px;
  }
  .footer-box{
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .footer-box span{
    color: #ff0000;
    font-size: 15px;
    padding: 6px 24px;
    border-radius: 6px;
    cursor: pointer;
  }
  .footer-box span:hover{
    background: rgb(231, 231, 234);
  }
  @media screen and (max-width: 1466px) {
    .footer-box{
      margin-top: 15px;
    }
  }
  @media screen and (max-width: 768px) {
    .center-box{
      padding: 0;
      box-shadow: none;
    }
  }
</style>
