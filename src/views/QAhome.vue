<template>
  <div>
    <div class="center-box">
      <div id="header" class="header clearfix">智能机器人问答</div>

      <div id="content" class="scrollbar">
        <dl class="messages" style="margin-bottom: 12px;">
          <dt><h4><a href="javascript:0;" id="show-history"></a></h4></dt>
          <dd class="bot clearfix" data-invalid-transfer="true" v-for="(item,index) in QAList" :key="index">
            <div :class="item.type == 1?'msg-recv':'msg-send' " class="msg" style="color:#fff">
              <i class="msg-avatar"></i>
              <div class="sender">
                <span class="sender-text">{{item.name}}</span>
                <span class="time-text">{{item.time}}</span>
              </div>
              <div class="msg-content-and-after">
                <div class="msg-content">
                  <p>{{item.text}}</p>
                </div>
              </div>
            </div>
          </dd>
        </dl>
        <div id="msg_end" ref="msg_end" style="height:0px; overflow:hidden"></div>
      </div>

      <div id="footer" class="theme-c clearfix" style="color: rgb(93, 124, 182); display: block;">
        <div class="ui-editor clearfix">
          <div class="textbox">
            <textarea name="" v-model="input_textarea" rows="4" placeholder="您好！很高兴为您服务。请描述您的问题"></textarea>
            <el-button class="btn-send" :loading="loading"
             id="btnSend"
             :style="{'color': input_textarea != ''?'#fff':'#00000040','background-color': input_textarea !=''?'#5d7cb6':'#f5f5f5','border-color': input_textarea !=''?'#5d7cb6':'#f5f5f5', 'cursor': 'default'}"
              @click="onSendClcik"
            >
              <span>{{loading?'发送中':'发送'}}</span>
            </el-button>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {getQuestion} from '@/api/data'
export default {
  name: 'QAhome',
  data(){
    return{
      skApi:'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', // openAI 密钥
      viewHeight:'',
      textarea: '',
      is_kefu:1,  // 1为客服 msg-recv， 2为用户  msg-send
      input_textarea:'',
      curTime:'',
      QAList:[],
      loading: false
    }
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.getCurrentTime();
     this.QAList.push({
      type:1,
      text:'你好我是openAI机器人,请问有什么问题可以帮助您?',
      name:'智能客服',
      time: this.curTime
    })
  },
  mounted(){

  },

  methods: {
    /**
     * 获取当前时间 格式：yyyy-MM-dd HH:MM:SS
    */
    getCurrentTime(){
        var date = new Date();//当前时间
        var month = this.zeroFill(date.getMonth() + 1);//月
        var day = this.zeroFill(date.getDate());//日
        var hour = this.zeroFill(date.getHours());//时
        var minute = this.zeroFill(date.getMinutes());//分
        var second = this.zeroFill(date.getSeconds());//秒

        //当前时间
        var curTime = date.getFullYear() + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        return curTime;
    },

    /**
     * 补零
     */
    zeroFill(i){
      if (i >= 0 && i <= 9) {
          return "0" + i;
      } else {
          return i;
      }
    },
    onSendClcik(){
      let that = this;
      let input_textarea = that.input_textarea;
      if(input_textarea == ''){
        return
      }
      that.QAList.push({
        type:2,
        text: input_textarea,
        name:'',
        time: that.getCurrentTime()
      })
      // let pearms = {
      //   question:input_textarea
      // }
      that.loading = true;
      that.axios({
        url:'https://api.openai.com/v1/completions',
        method: 'post',
        headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + this.skApi },
        data: {
          prompt: input_textarea,
          max_tokens: 2048,
          model: "text-davinci-003"
        }
      }).then(res =>{
        console.log(res)
        that.input_textarea = '';
        let text = res.data.choices[0].text.replace("openai:", "").replace("openai：", "").replace(/^\n|\n$/g, "");
        that.QAList.push({
          name: "智能客服",
          text: text,
          time: that.getCurrentTime(),
          type: 1
        });
        that.$refs.msg_end.scrollIntoView({
          behavior: "smooth",
          block:    "end" 
        });
         that.loading = false;
      }).catch(e =>{
        that.loading = false;
        console.log(e)
        that.$message.error({
          message: e.message
        })
      })
      return
      getQuestion(pearms).then(res =>{
        if(res.data.code == 0){
          that.input_textarea = '';
          let QAList = that.QAList;
          QAList.push(res.data.data.answer);
          that.QAList = QAList;
          // 选中ref
          that.$refs.msg_end.scrollIntoView({
            behavior: "smooth",  // 平滑过渡
            block:    "end"  // 上边框与视窗顶部平齐。默认值
          });

        }
      })
    },
    // 点击热门问题
    wentiClick(t){
      let text = t;
      let that = this;
      this.input_textarea = text;
      that.onSendClcik();
    }
  },
}
</script>

<style scoped>
.content-box {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  flex: 1;
  overflow: hidden;
}
.center-box{
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: 88%;
  transform: translate(-50%,-50%);
  min-width: 360px;
  max-width: 760px;
  min-height: 430px;
  max-height: 720px;
  box-shadow: 0 0 24px 0 rgb(19 70 80 / 25%);
}

.scrollbar {
  overflow: auto;
}

#content, #footer {
  position: absolute;
  padding: 12px 14px;
  width: 100%;
  margin-left: 0;
  left: 0;
  right: 270px;
  margin-left: 0;
}
#content {
  top: 62px;
  bottom: 121px;
  padding-left: 16px;
  padding-right: 16px;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  background: #f5f5f5;
  padding-bottom: 20px;
}
dd, dl, dt, li, ol, ul {
  list-style: none;
}
.msg {
  float: right;
  width: 100%;
  position: relative;
  color: #fff;
  font-size: 14px;
  word-wrap: break-word;
  -webkit-border-radius: 18px;
  border-radius: 18px;
  text-align: left;
}

.messages {
  position: relative;
  padding-top: 0;
}
.messages dd, .messages dt {
    margin-top: 10px;
    overflow: hidden;
}
.messages dt {
    text-align: center;
}
.messages dt:first-child {
    margin-top: 0;
}
.messages h3, .messages h4 {
  color: #999;
  font-size: 14px;
  font-weight: 400;
}
.msg-recv {
  float: left;
  color: inherit!important;
}
.messages .msg-recv {
  color: #222!important;
  margin-left: 48px;
}

.messages .msg>i {
  position: absolute;
  top: 5px;
  left: -50px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.messages .msg-recv>i {
    top: 5px;
    left: -48px;
    right: auto;
    background: url(../assets/image/kefu.png) no-repeat;
    background-size: 40px 40px;

}
.messages .msg-recv>i, .messages .msg-send>i {
    display: inline-block;
}
.sender, .msg .sender {
  font-size: 12px;
  color: rgba(36,46,51,.4);
  display: block;
  min-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
}
.msg-recv .sender {
  left: 8px;
  text-align: left;
}
.msg .msg-content-and-after{
  display: flex;
  align-items: center;
}
.msg-recv .sender .sender-text {
    display: inline-block;
}
.msg-recv .sender .time-text {
    padding-left: 10px;
}
.msg .msg-content {
  padding: 8px 12px;
  word-wrap: break-word;
  -webkit-border-radius: 18px;
  border-radius: 8px;
  -webkit-transition: .2s;
  transition: .2s;
  display: inline-block;
  background-color: #fff;
  position: relative;
  max-width: 320px;
}
.bot .msg .msg-content {
    float: right;
}
.msg.msg-recv .msg-content {
    background-color: rgba(255,255,255);
    border: unset;
    color: #000;
}
.bot .msg.msg-recv .msg-content {
    float: left;
}
.bot .msg .more-msg-box {
    width: 100%;
    float: left;
}
.messages .msg-send {
    margin-right: 48px;
}
.messages .msg.msg-send>i {
  top: 10px;
  left: auto;
  right: -48px;
  background: url(../assets/image/img-user.png) no-repeat;
  background-size: 40px 40px;
}
.msg.msg-send .sender {
    text-align: right;
}
.msg.msg-send .msg-content-and-after {
    flex-flow: row-reverse;
}
.msg .sender-text {
    display: none;
}
.msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
    float: right;
}
.msg.msg-send .msg-content, .msg.robot-msg-send .msg-content {
    background-color: rgb(93, 124, 182);
    border: unset;
}

#show-history {
  color: rgba(36,46,51,.5);
  color: #242e33\0;
  font-size: 12px;
}
#footer {
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 1px 0 0 #eaeaea;
}
.ui-editor .textbox {
  position: relative;
  overflow: hidden;
  margin-right: -14px;
  min-height: 110px;
}
.ui-editor textarea {
  display: block;
  width: 100%;
  min-height: 40px;
  max-height: 160px;
  padding: 0 98px 0 0;
  color: #242e33;
  font-size: 14px;
  outline: 0;
  resize: none;
  border: 0;
  overflow-y: auto;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 20px;
}
.ui-editor .btn-send {
  position: absolute;
  right: 14px;
  bottom: 0;
  z-index: 21;
  font-size: 14px;
  padding: 2px 30px;
  color: #242e33;
  line-height: 22px;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background: #f5f5f5;
}




#side-box {
  position: absolute;
  top: 62px;
  bottom: 0;
  right: 0;
  z-index: 2;
  width: 270px;
  max-width: 50%;
  background-color: #fff;
  border: 1px solid #eaeaea;
}
.sidebox {
  top: 0;
  bottom: 0;
  position: absolute;
  width: 100%;
}
.sidebox .nav-ul {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #eaeaea;
}
.nav-ul>li {
  width: 70px;
  text-align: center;
  height: 38px;
  line-height: 38px;
  max-width: 100%;
  color: #005dc0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 2px solid transparent;
}
.sidebox>.tab-content {
  top: 38px;
  bottom: 0;
  position: absolute;
  width: 100%;
  margin: 0;
  overflow-y: auto;
}
.tab-content>div {
  padding: 10px;
  height: 100%;
}
.tab-content>.active {
  display: block;
}
.wenti-ul{
  width: 100%;
}
.wenti-ul>li.wenti-ul-li{
  margin: 4px 0;
  font-size: 14px;
  color: #307ae8;
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
}
.wenti-ul>li.wenti-ul-li:hover{
  color: #ff0000;
}
.header {
  height: 62px;
  line-height: 62px;
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  background: rgb(93, 124, 182);
}


.el-textarea__inner{
  border: none !important;
}
</style>

<style scoped>
  @media screen and (min-width: 768px){
    .center-box{
      width: 70%;
    }
    .msg .msg-content {
      max-width: 76%;
    }
  }

</style>
