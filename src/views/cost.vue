<template>
  <div class="center-box">
    <div class="n-scrollbar-container">
      <div class="bg-teal-500">
        <div class="bg-teal-title">
          <span class="span-1">剩余次数</span>
          <span class="span-2">{{number}}</span>
        </div>
        <!-- <div class="bg-invite-box">
          <div>邀请新用户: 新用户通过您的邀请码注册并使用时，您将获得相应的奖励！</div>
          <div class="bg-invite-code">
            <span>
              您的邀请码：vmpjNH 
              <span class="invite-copy" @click.stop="handleCopy('vmpjNH')">
                <i class="el-icon-document-copy"></i> 复制
              </span>
            </span>
            <span>
              邀请链接：http://www.aifintech.com.cn:8009/#/login?invite_code=vmpjNH 
              <span class="invite-copy" @click.stop="handleCopy('http://www.aifintech.com.cn:8009/#/login?invite_code=vmpjNH')">
                <i class="el-icon-document-copy"></i> 复制
              </span>
            </span>
          </div>

        </div> -->
      </div>

      <div class="n-setMeal-box">
        <div class="n-setMeal-titlebox">
          <span class="span-1">购买套餐</span>
          <span class="span-2">早期尝鲜价格</span>
        </div>
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <el-row :gutter="20" class="row-bg" justify="center">
              <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6" v-for="(item,index) in setMealList" :key="index">
                <div class="grid-content">
                  <div></div>
                  <div class="setMeal-num-box">
                    <h3>{{ item.num }} 次</h3>
                  </div>
                  <div class="setMeal-money-box">
                    <span class="money-icon">￥</span> {{ item.money }}
                  </div>
                  <div class="setMeal-btn-box" @click="clickBuyBtn(item)">立即购买</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
          
        </el-row>
      </div>
    </div>
      <!-- 支付弹窗 -->
    <el-dialog title="订单支付" :center="false" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" height="auto">
      <div class="dialog-content-box">
        <div class="dialog-content-left">
          <div>套餐：<span class="text-teal-600">{{ checkInfo.num }} 次</span></div>
          <div>金额：<span class="text-teal-600">{{ checkInfo.pay_price }} 元</span></div>
          <div>创建时间：<span class="text-teal-600">{{ checkInfo.createtime }}</span></div>
        </div>
        <div class="dialog-content-right" id="qrcode" ref="qrcode">
          <img :src="qrCodeImgUrl" alt="" />
          <span class="tis-span">微信扫一扫支付</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clickQRBtn" class="footer-clobtn">确认订单</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
      </span> 
    </el-dialog>

    <!-- 邀请码弹窗 -->

  </div>

</template>

<script>
  import {setInviteCode,get_chatgpt_num,getOrderPayList,getOrderPay,get_order_status} from '@/api/data'
  import QRCode from 'qrcode'
  export default {
    name: 'cost',
    data(){
      return{
        uid: window.localStorage.getItem('uid'),
        viewHeight:'',
        setMealList:[{},{},{},{},{},{},{},{}],
        dialogVisible: false,
        checkInfo:{},
        codeurl: "",//回调url
        timer1: "", //支付循环
        number: 0,
        qrCodeImgUrl:'',
        order_no:'', // 订单号
        invite_code:'', // 邀请码
      }
    },
    created(){
      this.getOrderPayList();
      // 获取用户剩余次数
      this.get_chatgpt_num();
    },
    mounted(){

    },

    methods: {
      handleCopy(n){
          //创建一个input框
        const input = document.createElement("input");
        //将指定的DOM节点添加到body的末尾
        document.body.appendChild(input);
        //设置input框的value值为直播地址
        input.setAttribute("value", n);
        //选取文本域中的内容
        input.select();
        //copy的意思是拷贝当前选中内容到剪贴板
        //document.execCommand（）方法操纵可编辑内容区域的元素
        //返回值为一个Boolean，如果是 false 则表示操作不被支持或未被启用
        if (document.execCommand("copy")) {
          document.execCommand("copy");
        }
        //删除这个节点
        document.body.removeChild(input);
        this.$message.success({
          message:'复制成功',
          duration: 1500,
        })
      },
      // 填写邀请码
      openinvite_code(o) {
        this.$prompt('请输入邀请码', '提示', {
          showClose: false, // 是否显示右上角关闭图标
          closeOnClickModal: false, //是否可通过点击遮罩关闭
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          setInviteCode({invite_code: value,order_no: o});
          if(value){
            this.$message({
              type: 'success',
              message: '提交成功!' 
            });
          }
        })
      },
      clickQRBtn(){
        this.dialogVisible = false;
        clearInterval(this.timer1);
        this.get_chatgpt_num();
      },
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
      // 获取充值列表接口
      getOrderPayList(){
        let that = this;
        getOrderPayList().then( res =>{
          if(res.data.code == 0){
            that.setMealList = res.data.data
          }
        })
      },
      // 点击购买按钮获取 支付二维码
      async clickBuyBtn(i) {
        let that = this;
        let p = {
          uid: that.uid,
          recharge_id: i.recharge_id,
        };
        try {
          //调用后端接口，接收返回url
          const res = await getOrderPay(p);
          that.checkInfo = res.data.data;
          console.log(res)
          //清空二维码
          that.qrCodeImgUrl = '';
          //循环请求查看是否支付成功
          that.timer1 = setInterval(() => {
            that.get_order_status(res.data.data.order_no);
          }, 1000);
          //如果在组件内的支付，很可能会监听不到组件销毁
          //通过$once来监听定时器，在beforeDestroy钩子可以被清除。
          that.$once("hook:beforeDestroy", () => {
            clearInterval(this.timer1);
            that.dialogVisible = false;//支付的弹窗
          });
          // 使用toDataURL方法 返回的是promise对象 通过.then取值
          let img = QRCode.toDataURL(res.data.data.code_url)
          img.then(t => {
            that.dialogVisible = true
            console.log(t)
            that.qrCodeImgUrl = t
          })
        } catch (err) {
          this.$message.error({
            message: err,
            type: "none",
          });
        }
      },
      //监听支付轮询
      async get_order_status(o) {
        try {
          const res = await get_order_status({ order_no: o });
          //如果支付成功
          if (res.data.data.order_status == 2) {
            this.dialogVisible = false;
            // 获取用户剩余次数
            this.get_chatgpt_num();
            // 填写邀请码
            this.openinvite_code(o);
            clearInterval(this.timer1);
            this.$message({
              message: "支付成功",
              type: "success",
            });
            
          }
        } catch (err) {
          // this.$message.error({
          //   message: err,
          //   type: "none",
          // });
        }
      },

    },
  }
</script>

<style scoped>
  .center-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    z-index: auto;
    box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
  }
  .n-scrollbar-container{
    width: 100%;
    overflow-Y: auto;
    height: 100%;
    max-height: inherit;
  }
  .bg-teal-500{
    background-color:#14b8a6e6;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
  }
  .bg-teal-title{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: bold;
  }
  .bg-teal-title>span.span-1{
    line-height: 1.5;
    font-size: 26px;
  }
  .bg-teal-title>span.span-2{
    line-height: 1.5;
    font-size: 22px;
  }
  .bg-invite-box{
    font-size: 14px;
    color: rgb(238, 238, 238);
    font-weight: 100;
  }
  .bg-invite-box>div{
    margin: 6px 0;
  }
  .bg-invite-code>span{
    padding: 0 10px;
  }
  .invite-copy{
    color: rgb(3, 69, 112);
    cursor: pointer;
    padding-left: 10px;
  }
  .invite-copy:hover{
    color: #ff0000;
  }
  .n-setMeal-box{
    width: 100%;
    padding-top: 24px;
  }
  .n-setMeal-titlebox{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .n-setMeal-titlebox>span{
    font-weight: bold;
  }
  .n-setMeal-titlebox>span.span-1{
    font-size: 45px;
    line-height: 1;
  }
  .n-setMeal-titlebox>span.span-2{
    font-size: 18px;
    padding-top: 15px;
    line-height: 1.5;
    color: rgb(20 184 166);
  }
  .row-bg{
    margin-top: 20px;
  }
  .grid-content{
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    padding: 30px;
    transition: 0.5s;
    margin: 10px 0;
  }
  .grid-content:hover{
    border-color: rgb(20 184 166);
    transform: scale(1.05);
    transition: 0.5s;
  }
  .setMeal-num-box{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
  }
  .setMeal-num-box h3{
    font-size: 28px;
    line-height: 30px;
  }
  .setMeal-money-box{
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-top: 30px;
    font-weight: 700;
    font-size: 35px;
    line-height: 36px;
  }
  .setMeal-money-box .money-icon{
    font-size: 20px;
    padding-right: 10px;
  }
  .setMeal-btn-box{
    margin-top: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 24px;
    padding: 4px;
    font-weight: 600;
    color: rgb(20 184 166);
    border: 1px solid #d8d8d8c7;
    border-radius: 6px;
    transition: 0.5s;
    cursor: pointer;
  }
  .setMeal-btn-box:hover{
    background: rgb(20 184 166);
    border: rgb(20 184 166);
    color: #fff;
    transition: 0.5s;
  }
  .el-dialog{
    padding: 30px;
  }
  .dialog-content-box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dialog-content-left{
    flex: 1;
    padding: 12px;
  }
  .dialog-content-left>div{
    width: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    margin: 5px 0;
  }
  .dialog-content-left>div .text-teal-600{
    color: rgb(20 184 166);
    padding-left: 10px;
  }
  .dialog-content-right{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .dialog-content-right img{
    width: 180px;
    height: 180px;
  }
  .dialog-content-right .tis-span{
    font-size: 14px;
    color: #ff0000;
  }
  .footer-clobtn{
    border-radius: 20px;
    transition: 0.3s;
  }
  .footer-clobtn:hover{
    color: rgb(20 184 166);
    background: rgb(231 248 246);
    transition: 0.3s;
  }
</style>

<style scoped>
  @media screen and (max-width: 768px){
    .bg-teal-500{
      padding: 8px;
    }
    .bg-teal-500>span.span-1{
      font-size: 18px;
    }
    .n-setMeal-titlebox>span.span-1{
      font-size: 32px;
    }
    .n-setMeal-box{
      padding-top: 12px;
    }
    .grid-content{
      padding: 20px;
    }
    .setMeal-money-box{
      font-size: 28px;
      margin-top: 20px;
    }
    .setMeal-btn-box{
      padding: 10px 4px;
    }
    .center-box >>> .el-dialog{
      width: 98%;
      padding: 10px;
    }
    .center-box >>> .el-dialog__header{
      padding: 10px 0;
    }
    .center-box >>> .el-dialog__body{
      padding: 10px;
    }
    .bg-teal-500>span.span-2{
      line-height: 1.2;
      font-size: 14px;
    }
  }
  @media (min-width: 768px) and (max-width: 1466px){
    
  }

</style>
