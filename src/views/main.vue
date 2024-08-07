<template>
  <el-container :style="`height:${viewHeight}px;`">
    <el-header class="header-box">
      <img src="../assets/image/isCollapse.png" alt="" class="header-img" @click="menu_btn"/>
      <div class="header-title">{{ titleTxet }}</div>
    </el-header>
    <el-container class="min-box">
      <!-- 左侧导航 开始 -->
      <el-aside width="auto">
        <a href="javascript:0;" class="isCollapse-box" @click="menu_btn">
          <img src="../assets/image/isCollapse.png" class="isCollapse-i" />
          <span class="isCollapse-s" v-if="isColl">自猎彗星</span>
        </a>
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="!isColl" router unique-opened>
          <el-menu-item index="/chat" @click="menu_btn1">
            <i class="el-icon-document-copy"></i>
            <span slot="title">新的对话</span>
          </el-menu-item>
          <!-- <el-menu-item index="/user-center" @click="menu_btn1">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人中心</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="/cost" @click="menu_btn1">
            <i class="el-icon-coin"></i>
            <span slot="title">费用中心</span>
          </el-menu-item> -->
          <!-- <el-menu-item @click="menu_btn2">
            <i class="el-icon-service"></i>
            <span slot="title">联系客服</span>
          </el-menu-item> -->
        </el-menu>
        <a href="javascript:0;" class="collapse-footer-box">
          <img src="../assets/image/img-user.jpg" alt="" class="collapse-footer-img" v-if="isColl"/>
          <div class="collapse-footer-r" v-if="isColl">
            <span>{{ phone }}</span>
            <span style="font-size:14px;">激发灵感，提高效率</span>
          </div>
          <i class="el-icon-setting" v-if="!isColl"></i>
        </a>
      </el-aside>
        <!-- 左侧导航 结束 -->
        <!-- 主题 开始 -->
      <el-main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" @setTitleTxet="setTitleTxet"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" @setTitleTxet="setTitleTxet"/>
      </el-main>
      <!-- 主题 结束 -->
    </el-container>
    <!-- 弹窗 -->
    <div  class="elcontainer-box">
      <el-dialog title="联系客服" :visible.sync="proVisible" :center="false" :close-on-click-modal="false" class="copywriting-prompt-box">
        <div class="prompt-content-box">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple grid-title">联系客服</div>
              <div class="grid-content bg-purple grid-example-text">
                <img src="../assets/image/customer-service.jpg" alt="">
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <div class="grid-content bg-purple grid-title">商务合作</div>
              <div class="grid-content bg-purple grid-example-text">
                <img src="../assets/image/cooperation.png" alt="">
                <span>联系方式：17600110368</span>
              </div>
            </el-col>
          </el-row>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="proVisible = false" class="footer-clobtn">确定</el-button>
        </span>
      </el-dialog>
    </div>

  </el-container>
</template>
<script>
  export default {
    components: {
      // CommonAside,
    },
    data(){
      return {
        isColl: true,
        headerisColl: false, // 手机端判断
        phone: window.localStorage.getItem('phone'),
        viewHeight:'',
        viewWidth:'',
        sickNess1:[],
        is_view: true,
        menuBackgroundColor:'#fff',
        menuTextColor:'#000',
        activeIndex:'/chat',
        titleTxet:'',
        proVisible: false,
      }
    },
    mounted(){

    },
    beforeCreate(){
      console.log('beforeCreate')
    },
    created(){
      let that = this;
      let getViewportSize = that.$getViewportSize();
      that.viewHeight = getViewportSize.height;
      that.viewWidth = getViewportSize.width;
      that.setCurrentRoute();
      // let uid = window.localStorage.getItem('uid');
      // if(!uid){
      //   that.$message.error('暂未登陆，请先登录！');
      //   setTimeout(function(){
      //     that.$router.push({name: 'Login'});
      //   },1000)
      //   return
      // }
    },
    watch: {
      $route() {
        this.setCurrentRoute();
      }
    },
    methods:{
      //监听到当前路由状态并激活当前菜单
      setCurrentRoute() {
        this.activeIndex = this.$route.path;    
      },
      
      // 接收子组件方法
      onEmitIndex(idx) {
        console.log(idx)
        // this.activeIndex = idx;
      },
      setTitleTxet(t){
        this.titleTxet = t;
      },
      goToUserCenter(){
        this.$router.push({name: 'userCenter'});
      },
      // 点击头部退出
      toLogin(){
        window.localStorage.setItem("retrievalArr", '');
        window.localStorage.setItem("token", '');
        this.$router.push({name: 'Login'});
      },
      // 折叠面板
      menu_btn(){
        this.isColl = !this.isColl;
      },
      menu_btn1(){
        if( this.isColl ){
          this.isColl = !this.isColl;
        }
      },
      menu_btn2(){
        if( this.isColl ){
          this.isColl = !this.isColl;
        }
        this.proVisible = true;
      },
      menuHeaderBtn(){
         this.headerisColl = !this.headerisColl;
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      setsickNess(){
        this.is_view = false;
        this.$nextTick(() => {
          this.is_view = true
        })
        console.log(this.is_view)
      },
    },
  }
</script>
<style scoped>
  *{
    font-family:"PingFang SC", "Noto Sans SC", "微软雅黑", "黑体", Helvetica, Verdana, sans-serif;
  }
  .el-container{
    overflow: hidden;
  }

  .el-aside{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #e1e1e199;
    transition: 0.5s;
  }
  .el-aside >>> .el-submenu__title{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 40px;
    line-height: 40px;
    font-size: 14px !important;
    border-bottom: 1px solid #e9e9e94f;
  }
  .el-aside >>> .el-submenu__title:hover{
    background: #DBEAFF;
  }
  .el-aside >>> .el-submenu__title span{
    padding-left: 10px;
  }
  .el-main{
    background: #FAFBFF;
    padding: 20px;
    box-sizing: border-box;
  }
  .l-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .l-content>img{
    width: auto;
    height: 46px;
    display: inline-block;
  }

  .r-content{
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .r-content>img.user-img{
    width: 46px;
    height: 46px;
    cursor: pointer;
  }
  .r-toLogin{
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    margin-left: 20px;
  }
  .r-toLogin:hover{
    color: rgb(20 184 166);
  }

  .el-menu{
    text-align: left;
    height: 100%;
    border: none;
    margin-top: 6px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse){
    width: 280px;
  }

  
  .el-menu-item {
    width: 100%;
    min-width: 0;
    height: 48px;
    line-height: 48px;
    justify-content: flex-start;
    text-align: left;
    display: flex;
    font-size: 15px !important;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    /* background: rgba(49, 130, 211, 0.048); */
    color: #666;
    
  }
  .el-menu-item span{
    padding-left: 10px;
  }
  .el-menu-item:hover {
    background-color: rgb(243 243 245) !important;
    color: rgb(20 184 166) !important;
}
  .el-menu-item{
    width: 100%;
    transition: 0.3s;
  }
  .el-menu-item.is-active{
    opacity: 1;
    color: rgb(20 184 166) !important;
    background: rgb(231 248 246) !important;
    transition: 0.3s;
   
  }
  .el-icon-arrow-down:before{
    color: #000;
  }
  .collapse-footer-box{
    width: 100%;
    height: auto;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    box-sizing: border-box;
    border-top: 1px solid #c5c5c5;
  }
  .collapse-footer-img{
    width: auto;
    height: 44px;
    display: inline-block;
  }
  .collapse-footer-r{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
    color: #666;
  }
  .collapse-footer-r span{
    line-height: 18px;
  }
  .isCollapse-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 68px;
    font-size: 16px;
    box-sizing: border-box;
    /* border-bottom: 1px solid #E1E1E1; */
  }
  .isCollapse-box:hover{
    color: rgb(20 184 166);
  }
  .isCollapse-box .isCollapse-i{
    width: 20px;
    height: 18px;
  }
  .isCollapse-box .isCollapse-s{
    padding-left: 10px;
  }
   .el-aside [class^=el-icon-]{
    width: auto;
    margin-right: 0;
    width: 16px;
    height: 16px;
    font-size: 16px;
  }
  .el-aside>ul>li >>> .el-menu li ul{
    background: #3182d30c;
  }
  .el-aside >>> .el-submenu__icon-arrow{
    right: 4px;
  }
  .header-box{
    display: none;
  }
  .elcontainer-box >>> .copywriting-prompt-box .el-dialog {
      width: 70%;
      max-width: 920px;
      height: 80%;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
      border-radius: 10px;
    }
    .elcontainer-box >>> .copywriting-prompt-box .el-dialog__header{
      padding: 10px 0;
      font-size: 15px;
      font-weight: 600;
      width: 100%;
      height: auto;
      background: #fff;
    }
    .elcontainer-box >>> .copywriting-prompt-box .el-dialog__body{
      padding: 0 10px;
      flex: 1;
      width: 100%;
      overflow: auto;
      -ms-overflow-style:none; /*IE浏览器 */
      scrollbar-width:none;  /*火狐浏览器 */
    }
    /* 谷歌浏览器隐藏滚动条 */
    .elcontainer-box >>> .el-dialog__body::-webkit-scrollbar{ 
      display: none;
    }
    .elcontainer-box >>> .copywriting-prompt-box .el-dialog__footer{
      padding: 6px 0;
      display: inline-block;
      width: 100%;
      height: auto;
      background: #fff;
      text-align: center;
    }
    .elcontainer-box >>> .el-dialog__footer .footer-clobtn{
      padding: 10px 40px;
    }
    .elcontainer-box >>> .el-dialog__body .dialog-content-box{
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
    .elcontainer-box >>> .el-row{
      margin: 0 !important;
    }
    .elcontainer-box >>> .bg-purple {
      padding: 10px;
      margin-top: 20px;
    }
    .elcontainer-box >>> .bg-purple.grid-title{
      font-size: 15px;
      font-weight: 600;
    }
    .elcontainer-box >>> .bg-purple.grid-example-text{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
    .elcontainer-box >>> .bg-purple.grid-example-text img{
      width: 240px;
    }
    .elcontainer-box >>> .bg-purple.grid-example-text span{
      font-size: 15px;
      margin-top: 12px;
    }
  @media screen and (max-width: 1466px){
    .el-menu-vertical-demo:not(.el-menu--collapse){
      width: 200px;
    }
    .collapse-footer-box{
      padding: 10px;
      font-size: 14px;
    }
    .collapse-footer-img{
      height: 40px;
    }
    .collapse-footer-r span{
      line-height: 16px;
    }
    .el-menu-item{
      height: 40px;
      line-height: 40px;
      font-size: 14px !important;
    }
    .isCollapse-box{
      height: 58px;
      font-size: 14px;
    }
    .isCollapse-box .isCollapse-i{
      width: 16px;
      height: 14px;
    }

  }

  @media screen and (max-width: 768px){
    .header-box{
      width: 100%;
      display: flex;
      align-items: center;
      height: 46px !important;
      padding: 0 20px !important;
      position: fixed;
      background: #fff;
      z-index: 999;
    }
    .header-box img.header-img{
      width: 24px;
      height: 20px;
    }
    .header-box .header-title{
      flex: 1;
      font-size: 14px;
    }
    .isCollapse-box{
      display: none;
    }
    .collapse-footer-box{
      display: none;
    }
    .el-menu--collapse{
      width: 0px;
    }
    .el-main{
      padding: 10px;
      background: #fff;
      padding-top: 0;
    }
    .min-box{
      padding-top: 48px;
    }
    .elcontainer-box >>> .copywriting-prompt-box .el-dialog{
      width: 98%;
      border-radius: 6px;
    }
    
  }
</style>