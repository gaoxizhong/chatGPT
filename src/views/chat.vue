<template>
  <div class="center-box">
    <div id="header" class="header clearfix">{{loading?'对方正在输入...':'智能创作助手问答'}}</div>
    <div id="content" class="scrollbar" ref="scrollbar">
      <dl class="messages" style="margin-bottom: 12px;">
        <dt><h4><a href="javascript:0;" id="show-history"></a></h4></dt>
        <dd class="bot clearfix" data-invalid-transfer="true" v-for="(item,index) in msgList" :key="index">
          <div :class=" !item.isme ?'msg-recv':'msg-send' " class="msg" style="color:#fff">
            <i class="msg-avatar"></i>
            <div class="sender">
              <!-- <span class="sender-text">{{item.name}}</span> -->
              <span class="time-text">{{item.time}}</span>
            </div>
            <div class="msg-content-and-after">
              <div class="msg-content" v-html="item.content"></div>
            </div>
          </div>
        </dd>
      </dl>
      <div id="msg_end" ref="msg_end" style="height:0px; overflow:hidden"></div>
    </div>

    <div id="footer" class="theme-c clearfix" style="color: rgb(93, 124, 182); display: block;">
      <div class="ui-editor clearfix">
        <div class="textbox">
          <!-- <textarea name="" v-model="originMessage" rows="4" placeholder="您好！很高兴为您服务。请描述您的问题"></textarea> -->
          <div class="n-input-wrapper">
            <el-input placeholder="请输入内容..." v-model="originMessage" clearable  @keydown.enter.native="searchEnterFun($event)"></el-input>
          </div>
          <el-button class="btn-send" :loading="loading" id="btnSend"
            :style="{'color': originMessage != ''?'#fff':'#00000040','background-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5','border-color': originMessage !=''?'rgb(20 184 166)':'#f5f5f5'}"
            @click="onSendClcik"
          >
            <span>发送</span>
          </el-button>
        </div>

      </div>
    </div>
    <!-- 免责声明弹窗 -->
    <el-dialog class="declaration-box" title="免责声明" :center="false" :visible.sync="dialogVisible" :show-close="false" :close-on-click-modal="false" height="auto">
      <div class="dialog-content-box">
        <div class="dialog-content-left">
          <p>欢迎访问GeekLab智能内容创作平台并使用我们提供的产品和服务。</p>
          <br>
          <p>在完成注册程序或以任何方式使用GeekLab智能内容创作平台及平台提供的服务前，请您务必仔细阅读并透彻理解本网站协议条款(以下或简称“协议条款”)，在确认充分理解后选择接受或不接受本协议条款；一旦您完成“同意并遵守”或开始以其他方式使用计算服务平台及平台提供的服务，即表明您已阅读并同意受本协议条款的约束。如您不同意本协议条款或其中任何条款约定，您应不再进行下一步或停止注册程序。</p>
          <p>GeekLab再次提示您审慎阅读、充分理解各条款内容，特别是限制或免除责任的相应条款，限制或免除责任条款将以加粗或其他醒目形式提示您注意。</p>
          <p>如果您未满18周岁，请在法定监护人的陪同下阅读本协议条款</p>
          <b>1.签约主体以及协议范围</b>
          <p>1.1 《GeekLab智能内容创作平台用户协议》是您与GeekLab（“GeekLab”或者“我们”）就使用GeekLab智能内容创作平台及平台提供的服务（以下简称“平台”）而订立的有效合约。</p>
          <p>1.2 请您审慎阅读、充分理解各条款内容，选择接受或不接受该协议条款。</p>
          <b>2.平台用户的注册、使用与安全</b>
          <p>2.1注册的资格</p>
          <p>2.1.1 您确认，在您完成注册程序或以其他GeekLab允许的方式实际使用本平台时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织（以下简称为“您”）。</p>
          <p>2.1.2 若您是未成年人或限制民事行为能力人，则您不具备前述主体资格，您及您的监护人应承担因您的不当注册行为而导致的一切后果。</p>
          <p>2.1.3 您还需确保您不是任何国家、国际组织或者地域实施的贸易限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册和使用平台及服务。</p>
          <p>2.2用户注册</p>
          <p>2.2.1 当您按照注册页面提示填写信息、阅读并同意本协议条款且完成全部注册程序后，您将成为GeekLab智能内容创作平台的用户。</p>
          <p>2.2.2 您在注册时候设置或确认的用户名、邮箱、手机号及密码，将在注册成功后成为平台上您的标识。</p>
          <p>2.2.3 您设置的用户名不得违反国家法律法规、平台的管理规范或容易引起您与平台识别身份时的混淆，否则您可能不能注册成功或GeekLab有权经通知您后予以注销。</p>
          <p>2.2.4 您应当按照法律法规要求或按相应页面的提示，准确提供并及时更新您的用户信息，以使之真实、及时、完整和准确。如您提供的资料错误、不实、过时或不完整，GeekLab可以向您发出询问及/或要求改正的通知，您应按照GeekLab的要求配合提供或者更新相关资料。因您填写的信息、资料不真实、不及时、不完整或不准确的，您应承担您不能使用平台功能或在使用过程中的后果和损失。</p>
          <p>2.2.5 平台可能会就某些产品或服务的开通，要求您提供更多的身份资料和信息，做进一步的身份认证或资格验证，您只有在通过这些认证和验证之后，方可获得使用相关产品或服务的资格。</p>
          <p>2.2.6 通常情况下，您的用户名是您在计算服务平台进行一切活动的唯一身份标识，除非另有约定，每一个注册用户都可以在本网站独立开展活动。但在下列情形下，平台有权根据自己的判断，对同一及/或关联法律主体拥有的多个用户进行统一处理，如根据不同用户在注册、登录、使用中的关联信息，平台判断其实际为同一用户。关联信息举例：同一证件、同一手机号、同一邮箱、同一设备、同一地址等。</p>
          <p>2.3用户的使用和安全</p>
          <p>2.3.1 您有权使用您设定的用户名登录平台，进而使用平台提供的服务。</p>
          <p>2.3.2 平台可能会以邮件、站内信、微信、短信或电话等方式通知您服务进展情况以及提示您进行下一步的操作。在服务过程中您应当及时登录到平台查看和进行相关操作。</p>
          <p>2.3.3 一个注册用户仅能对应唯一的法律主体。除非有法律明文规定、司法裁定或者经GeekLab同意的情况下，您不得以任何方式转让、赠与或让他人继承您的注册用户信息或资格。</p>
          <p>2.3.4 您的用户名和密码由您自行设置并由您保管，您须对您的用户信息和密码保密。您需确保您在每个上网时段结束时，以正确步骤离开网站，即退出登录。</p>
          <p>2.3.5 如发现他人未经授权使用您的注册用户，您应立即通知GeekLab；GeekLab将协助您冻结注册用户、更改密码或进行其他安全设置；您理解GeekLab对您的请求采取行动需要合理时间，GeekLab对在采取行动前已经产生的以及由您引发的后果（包括但不限于您的任何损失）不承担任何责任。</p>
          <p>2.3.6 GeekLab亦会在网站服务端采取合理的技术措施保障用户信息的安全。</p>
          <b>3.网站服务及规范</b>
          <p>3.1 您有权享受GeekLab通过本网站提供的互联网技术服务和信息服务。您同时还应根据本协议条款以及您在购买具体服务时确认的相关条款和条件，履行及时付款、服务管理等责任。</p>
          <p>3.2 您使用平台和平台提供的服务时应保证：</p>
          <p>3.2.1 您将遵从国家、地方法律法规、行业惯例和社会公共道德，不可以使用任何不被允许的第三方软件登录或使用GeekLab智算所提供的产品和服务。不可以对GeekLab智算服务器采取任何的黑客行为，或是尝试着使GeekLab智算服务器过度负荷，不可以利用漏洞或其它软件或程序非法修改、截取、删除、系统信息及其它用户信息，不会利用平台提供的服务进行存储、发布、传播如下信息和内容：</p>
          <p>(i) 违反国家法律法规政策的任何内容（信息）；</p>
          <p>(ii) 违反国家规定的政治宣传和/或新闻信息；</p>
          <p>(iii) 涉及国家秘密和/或安全的信息；</p>
          <p>(iv) 封建迷信和/或淫秽、色情、下流的信息或教唆犯罪的信息；</p>
          <p>(v) 博彩有奖、赌博游戏；违反国家民族和宗教政策的信息；</p>
          <p>(vi) 妨碍互联网运行安全的信息；</p>
          <p>(vii) 侵害他人合法权益的信息和/或其他有损于社会秩序、社会治安、公共道德的信息或内容；</p>
          <p>(viii) 包含病毒、特洛依木马、密码爆破、挖矿软件、反向代理服务等可能对GeekLab智算计算平台系统造成伤害或影响其稳定性的内容；</p>
          <p>(ix) 您同时承诺不得为他人发布上述不符合国家规定和/或本协议条款约定的信息内容提供任何便利，包括但不限于设置URL、BANNER链接等；</p>
          <p>3.2.2 不应出现任何破坏或试图破坏网络安全等的行为，包括不会利用技术或其他手段破坏或扰乱本网站及其他客户的网站；</p>
          <p>3.2.3 您使用平台和平台提供的服务应符合本协议条款，不得存在如下操作：</p>
          <p>(i) 违反本用户协议及计算平台规则的行为；</p>
          <p>(ii) 提供虚假注册信息；</p>
          <p>(iii) 通过不正当手段注册或使用GeekLab智算计算服务；</p>
          <p>(iv) 为任何非法目的而使用GeekLab智算产品和服务；</p>
          <p>(v) 有损害其他用户的行为；</p>
          <p>(vi) 滥用所享有的用户权利；</p>
          <p>(vii) 在公众场合发布有关GeekLab智算及相关服务的负面宣传；</p>
          <p>(viii) 在未经允许下利用GeekLab智算所提供的产品和服务在现实中盈利；</p>
          <p>(ix) 不得恶意占用服务器资源，破坏、干扰正常计算服务环境；</p>
          <p>(x) 不得利用GeekLab智算服务进行的其他不利于GeekLab智算的行为；</p>
          <p>如您违反上述保证，GeekLab除有权根据相关协议条款采取封存账号，删数据、中止服务、终止服务的措施，并有权冻结或注销您的平台部分或全部功能，并按《中华人民共和国网络安全法》及其相关条例保留索赔和追究法律责任的权利(包括刑事责任)。</p>
          <b>4.隐私及个人信息的保护</b>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;您的信任对我们非常重要，GeekLab深知用户信息安全的重要性，我们将按照法律法规要求，采取安全保护措施，保护您的用户信息安全可控。</p>
          <b>5.知识产权</b>
          <p>5.1 我们尊重知识产权，除非获得了您的同意，平台不会擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表您拥有知识产权的成果。</p>
          <p>5.2 任何组织或个人认为平台的网页内容，如转载文章等可能侵犯其合法权益的，可向GeekLab提出书面权利通知，GeekLab将在收到知识产权权利人合格通知后依法尽快处理。</p>
          <p>5.3 除非另行说明，GeekLab智能内容创作平台Logo以及相关标识、徽记、技术文档等的知识产权为GeekLab及其关联公司所有。</p>
          <p>5.4 您应尊重GeekLab和第三方的知识产权和其他合法权利/权益，并保证在发生侵犯前述权益的违法事件时，保护GeekLab及其雇员、股东、合作伙伴等免于因该等事件受到影响或损失，GeekLab保留在您侵犯GeekLab及/或其他第三方的合法权利/权益时终止向您提供服务并不退还任何款项的权利。</p>
          <p>5.5 除由GeekLab服务根据合同约定而包含在其所提供的服务中的软件或应用程序外，您在使用服务过程中所安装、运行和使用的软件或应用程序均已取得与之用途相符的合法许可或授权，而不会侵犯他人的合法权益。并依法对所安装的软件承担全部责任。用户不可以使用任何不被允许的第三方软件登录或使用GeekLab智算所提供的产品和服务，用户应确认并保证对所有上传、转载或其他方式的传播内容，已经取得了所有必要的权利或授权并自行承担全部法律责任；本平台不担保，也没有义务和责任对所有上传的软件进行监测及管理；但有权根据国家有关法律、法规的要求，或根据其他用户的版权侵权通知对上传的软件进行不定时抽查，并有权在不事先通知上传用户的情况下移除涉嫌违法或侵权的软件。本平台所指的应用均指应用模板，不代表应用本身，不承担应用软件许可版权合规责任。</p>
          <p>如因您违反上述保证而导致GeekLab被第三方索赔，您应根据合法许可或授权为GeekLab提供抗辩，并承担任何不利终审判决或经批准的庭外和解产生的费用。</p>
          <b>6.责任范围和责任限制</b>
          <p>6.1 您了解并同意，您应承担因您使用本服务、违反本协议条款或在您的注册用户下采取的任何行动而导致的任何第三方索赔。如果由此引起GeekLab及其关联公司、员工、客户和合作伙伴被第三方索赔的，您应负责处理，并赔偿GeekLab及其关联公司由此遭受的全部损失和责任。</p>
          <p>6.2 在适用法律许可的范围内，GeekLab不对与本协议条款有关或由本协议条款引起的任何间接的、惩罚性的、特殊的、派生的损失承担赔偿责任。</p>
          <p>6.3 GeekLab在此提示，您在使用计算服务平台期间应当遵守中华人民共和国的法律，不得危害网络安全，不得利用计算服务平台从事侵犯他人名誉、隐私、知识产权和其他合法权益的活动。GeekLab不对您使用计算服务平台及提供的服务违法或违约行为承担任何责任。</p>
          <p>6.4 您在及相关网站上自行上传、提供、发布相关信息，包括但不限于用户名称、公司名称、 联系人及联络信息，相关图片、资讯等，均由用户自行提供，您须对其提供的前述信息依法承担全部责任。</p>
          <b>7.不可抗力和意外事件</b>
          <p>平台可能因为下列不可抗力或意外事件无法正常运行的，GeekLab不承担损害赔偿责任：</p>
          <p>7.1 因自然灾害、罢工、暴乱、战争、政府行为、司法行政命令等不可抗力因素；</p>
          <p>7.2 因电力供应故障、通讯网络故障等公共服务因素；</p>
          <p>7.3 经提前公告或通知的，平台在短时间内的系统维护。</p>
          <b>8.不可抗力和意外事件</b>
          <p>8.1 理解并同意，GeekLab可通过网页公告、电子邮件、站内信、短信、电话、系统消息以及即时通信等以上一种或多种通知方式向您发送通知，且GeekLab可以信赖您所提供的联系信息是完整、准确且当前有效的；上述通知在发送成功后视为已送达。</p>
          <p>8.2 除非本协议条款另有约定或GeekLab与您另行签订的协议明确规定了通知方式，您发送给平台的通知，应当通过GeekLab对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。</p>
          <b>9.条款的更新和终止</b>
          <p>9.1 GeekLab有权对本协议条款及相应的服务规则内容进行变更，并将网页公告、电子邮件、站内信、短信等方式予以公告或通知；若您在本协议条款内容变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的内容，也将遵循修改后的条款内容。</p>
          <p>9.2 在您的注册用户注销或经双方协商一致终止网站服务的，本协议条款终止。</p>
        
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" plain @click="clickdialogVisible" class="footer-clobtn">确定</el-button>
      </span> 
    </el-dialog>

    <!-- 弹窗 -->
    <el-dialog title="" :visible.sync="promptVisible" :modal="false" :show-close="false" :center="false" :close-on-click-modal="false" class="copywriting-prompt-box">
      <div class="prompt-content-box">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="grid-content bg-purple grid-title">
              <i class="el-icon-s-opportunity"></i>
              <span>提示</span>
            </div>
            <div class="grid-content bg-purple grid-example-text">"用简单的术语解释一下量子计算"</div>
            <div class="grid-content bg-purple grid-example-text">"对于10岁孩子的生日，有什么好的创意吗？"</div>
            <div class="grid-content bg-purple grid-example-text">"我如何在Javascript中进行HTTP请求？"</div>
            <div class="grid-content bg-purple grid-example-text">“创作一首关于理想的打油诗”</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="grid-content bg-purple grid-title">
              <i class="el-icon-s-tools"></i>
              <span>能力</span>
            </div>
            <div class="grid-content bg-purple grid-example-text">"使用日常的自然语言对话，无需学习指令"</div>
            <div class="grid-content bg-purple grid-example-text">"理解上下文，能记住用户刚才说过的内容"</div>
            <div class="grid-content bg-purple grid-example-text">"遵守用户的更正指令，会拒绝不当的要求"</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="grid-content bg-purple grid-title">
              <i class="el-icon-s-data"></i>
              <span>不足</span>
            </div>
            <div class="grid-content bg-purple grid-example-text">"偶尔会产生不正确的信息"</div>
            <div class="grid-content bg-purple grid-example-text">"偶尔可能会产生不良指示或偏见性内容"</div>
            <div class="grid-content bg-purple grid-example-text">"对2021年以后的知识和现实了解有限"</div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
            <div class="grid-content bg-purple grid-title">
              <i class="el-icon-s-promotion"></i>
              <span>探索，更强大</span>
            </div>
            <div class="grid-content bg-purple grid-example-text">“这不是搜索引擎。”请记住，ChatGPT熟练掌握人类语言，您应该像和真人对话一样提出问题或要求，而不是输入零碎的关键词。</div>
            <div class="grid-content bg-purple grid-example-text">“好问题决定好答案。”您提供的信息和要求越明确、完整、有条理，则生成的回答质量越高。</div>
            <div class="grid-content bg-purple grid-example-text">“巧手难为无米之炊。”若您希望获得优质反馈，您可以向ChatGPT输入一些基础背景资料信息，再提出要求。</div>
            <div class="grid-content bg-purple grid-example-text">“尽情享受吧！”</div>
          </el-col>
        </el-row>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" plain @click="promptVisible = false" class="footer-clobtn">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

import {EventSourcePolyfill} from 'event-source-polyfill';
import { getHistoryList,chatgptAnswer,get_chatgpt_num } from '@/api/data'
/**
   * 将服务端格返回字符串尝试格式化为json
   * @param {String} str
   * @returns
   */
    const parase = (str) => {
    if (typeof str !== 'string') {
      return str;
    }
    try {
      return JSON.parse(str.substring(6));
    } catch (error) {
      return str;
    }
  };
export default {
  name: 'chat',
  data(){
    return{
      uid: window.localStorage.getItem('uid'),
      viewHeight:'',
      textarea: '',
      // is_kefu:2,  // 1为客服 msg-recv， 2为用户  msg-send
      originMessage:'',
      message:[], // 累计对话记录
      msgList:[],
      loading: false,
      dialogVisible: false,
      numberVisible: false,
      number: 0, // 提问次数
      source: null,
      historyList:[],
      promptVisible: false,
      is_retun: true
    }
  },
  created(){
    let getViewportSize = this.$getViewportSize();
    this.viewHeight = getViewportSize.height;
    this.viewWidth = getViewportSize.width;
    this.msgList.push({
      isme: false,
      content:'你好,我是智能创作助手,请问有什么问题可以帮助您?',
      name:'智能创作助手',
      time: this.getCurrentTime(),
    })
    // 历史记录
    this.getHistoryList();
  },
  mounted(){
    console.log('mounted')
    let is_declaration = window.localStorage.getItem('is_declaration');
    if(!is_declaration){
      this.dialogVisible = true;
    }
  },
  beforeDestroy() {
    if(this.source){
      // 关闭SSE
      this.source.close();
      // 通知后端关闭连接
      this.source = null;
      console.log("退出登录或关闭浏览器，关闭SSE连接~")
    }
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

    // 历史记录
    getHistoryList(){
      let that = this;
      getHistoryList({uid: that.uid}).then( res =>{
        if( res.data.code == 0){
          let historyList = res.data.data;
          let newArr = [];
          historyList.forEach(ele => {
            newArr.push({
              isme: true,
              content: ele.question,
              name:'',
              time: that.getCurrentTime(ele.createtime),
            })
            newArr.push({
              isme: false,
              content: ele.answer,
              name:'智能创作助手',
              time: that.getCurrentTime(ele.createtime),
            })
          });
          that.msgList = that.msgList.concat(newArr);
          that.scrollBottom(); // 页面滚动到底部

        }
      }).catch( (e) =>{
        console.log(e)
      })
    },
    // 更新数据 -- 定时器打字机效果
    update_data(event) {
      let that = this;
      // const data = JSON.parse(event.data);
      const text = event;
      let msgList = that.msgList;
      var i = 0;
      function typeWriter() {
        if (i < text.length) {
          that.msgList[msgList.length-1].content += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100); // 设置打字速度
        }
      }
      typeWriter();

    },
    // 回车键点击
    searchEnterFun(e){
      var keyCode = window.event?e.keyCode:e.which;
      if(keyCode == 13){
        this.onSendClcik();
      }
    },

    // 点击发送
    async onSendClcik(){
      let that = this;
      // 调用方法获取用户剩余次数
      const res_number = await get_chatgpt_num({ uid:that.uid });
      if(res_number.data.data.chatgpt_num <= 0){
        that.$alert('余额不足，去「充值中心」充值获取次数！', '提示', {
          confirmButtonText: '去充值',
        }).then( () =>{
          that.$router.push({path:"/cost"});
        })
        return
      }

      let originMessage = that.originMessage;

      if(originMessage == ''){
        return
      }
      let is_retun = that.is_retun;
      if(!is_retun){
        return
      }
      that.is_retun = false;
      let showMessage = { // 页面展示的我的提问
        isme:true,
        content:that.originMessage,
        show_time:false,
        time: this.getCurrentTime(),
      }
      that.msgList.push(showMessage);
      that.scrollBottom(); // 页面滚动到底部
      that.loading = true;
      that.$emit('setTitleTxet','对方正在输入...');
      that.msgList.push({
        isme: false,
        // content: res.data.replaceAll("\n\n","<br>"),
        content: '',
        name:'智能创作助手',
        time: this.getCurrentTime(),
      });
   
    
      // SSE接收 如果跨越 添加第二个参数 { withCredentials: true }


      that.source = new EventSource(`http://18.221.12.198:5003/chatstream?content=${originMessage}`,{ withCredentials: true });
      console.log(that.source);
      // sse 连接开启时回调函数
      that.source.onopen = function (event) {
        console.log("链接成功！");
      }
      // 消息监听，event 是后端返回的数据
      that.source.onmessage = function (event) {
        const json = parase(event);
        console.log('onmessage')
        that.msgList[that.msgList.length - 1].content += json.data.replaceAll("\n","<br>");
        that.scrollBottom(); // 页面滚动到底部
        // that.update_data(event);
      }
      // 监听 error 事件，后端超时没有传输数据时触发
        that.source.onerror = function (event) {
        console.log("退出链接！");
        that.source.close();
        that.is_retun = true;
        that.loading = false;
        that.$emit('setTitleTxet','智能创作助手问答')
        let arrinfo = that.msgList[that.msgList.length - 1];
        if( !arrinfo.isme && arrinfo.content != '' ){
          //后端返接口 减次数
           chatgptAnswer({ 
            uid: that.uid,
            question: originMessage, 
            answer: arrinfo.content 
          });
        }
        that.originMessage="";
      }
      
    },

    //滚动到底部
    scrollBottom:function(){
      var that=this;
      this.$nextTick(function(){
          var container = that.$refs.scrollbar;
          container.scrollTop = 999999999;
      });
    },
    clickdialogVisible(){
      this.dialogVisible = false;
      this.promptVisible = true;
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
  width: 100%;
  height: 100%;
  /* box-shadow: 0 0 24px 0 rgb(19 70 80 / 25%); */
  box-shadow: 0 0 10px 0 rgb(54 89 124 / 25%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.scrollbar {
  overflow: auto;
}

#content, #footer {
  padding: 12px 16px;
  width: 100%;
}
#content {
  padding: 30px;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #fff;
  flex: 1;
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
  width: 100%;
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
  margin-top: 2px;
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
    min-height: 32px;
}
.msg.msg-recv .msg-content {
  background-color: rgb(243 245 250);
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
  top: 0;
  left: auto;
  right: -48px;
  background: url(../assets/image/img-user.jpg) no-repeat;
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
    background-color: rgb(20 184 166);
    border: unset;
}

#show-history {
  color: rgba(36,46,51,.5);
  color: #242e33\0;
  font-size: 12px;
}
#footer {
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 1px 10px 0 #e5e7eb;
}
.ui-editor {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ui-editor .textbox {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1280px;
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
.ui-editor .n-input-wrapper{
  flex: 1;
}
.ui-editor .n-input-wrapper >>> .el-input__inner:hover,.ui-editor .n-input-wrapper >>> .el-input__inner:focus{
  border-color: rgb(20 184 166);
}
.ui-editor .btn-send {
  width: auto;
  z-index: 21;
  font-size: 14px;
  padding: 2px 40px;
  color: #242e33;
  line-height: 35px;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background: #f5f5f5;
  margin-left: 20px;
  cursor: pointer;
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
  color: rgb(20 184 166);
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
  color: rgb(20 184 166);
  cursor: pointer;
  text-align: left;
  padding-left: 10px;
}
.wenti-ul>li.wenti-ul-li:hover{
  color: #ff0000;
}
.header {
  height: auto;
  text-align: center;
  color: rgba(20, 184, 165, 0.404);
  font-size: 16px;
  padding: 6px 0;
  /* background: rgb(93, 124, 182); */
  background: #fff;
}


.el-textarea__inner{
  border: none !important;
}
.center-box >>> .el-dialog{
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
.center-box >>> .declaration-box .el-dialog__header{
  padding: 10px 0;
  font-size: 15px;
  font-weight: 600;
  width: 100%;
  height: auto;
  background: #fff;
}
.center-box >>> .el-dialog__body{
  flex: 1;
  width: 100%;
  padding: 0;
  overflow: auto;
  -ms-overflow-style:none; /*IE浏览器 */
  scrollbar-width:none;  /*火狐浏览器 */
}
 /* 谷歌浏览器隐藏滚动条 */
.center-box >>> .el-dialog__body::-webkit-scrollbar{ 
  display: none;
}
.center-box >>> .el-dialog__footer{
  display: inline-block;
  width: 100%;
  height: auto;
  padding: 10px 0;
  background: #fff;
  text-align: center;
}
.center-box >>> .el-dialog__footer .footer-clobtn{
  padding: 10px 40px;
}
.center-box >>> .el-dialog__body .dialog-content-box{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.center-box >>> .el-dialog__body .dialog-content-box .dialog-content-left{
  flex: 1;
  width: 100%;
  text-align: left;
  padding: 0 12px;
}
.center-box >>> .el-dialog__body .dialog-content-box .dialog-content-left p{
  line-height: 28px;
}
.numberVisible-box{
  font-size: 14px;
}

/* 文案提示弹窗 */
.center-box >>> .copywriting-prompt-box .el-dialog {
  width: 70%;
  max-width: 920px;
  border-radius: 10px;
}
.center-box >>> .copywriting-prompt-box .el-dialog__header{
  display: none;
}
.center-box >>> .copywriting-prompt-box .el-dialog__body{
  padding: 0 10px;
}
.center-box >>> .copywriting-prompt-box .el-dialog__footer{
  padding: 6px 0;
}
.center-box >>> .el-dialog__footer .footer-clobtn{
  padding: 10px 40px;
}
.center-box >>> .el-dialog__body .prompt-content-box{
  height: auto;
}

.center-box >>> .el-row{
  margin: 0 !important;
}
.center-box >>> .grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.center-box >>> .bg-purple {
  padding: 10px;
  background-color: rgb(247, 247, 249);
  margin-top: 10px;
  color: #333;
}
.center-box >>> .bg-purple.grid-title{
  background:none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.center-box >>> .bg-purple.grid-title i{
  font-size: 24px;
}
.center-box >>> .bg-purple.grid-title span{
  padding-top: 8px;
}
</style>

<style scoped>
  @media screen and (min-width: 768px){
    .msg .msg-content {
      max-width: 76%;
    }
  }
  @media screen and (max-width: 768px){
    .header.clearfix{
      display: none;
    }
    #content{
      padding: 0;
      padding-bottom: 64px;
    }
    .center-box{
      box-shadow: none;
    }
    .msg .msg-content{
      margin-top: 2px;
      max-width: 66%;
      font-size: 14px;
    }
    .sender, .msg .sender{
      font-size: 14px;
    }
    #footer{
      box-shadow: none;
      border-top: 1px solid #e5e7eb;
      box-shadow: none;
      padding: 10px;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
    }
    .ui-editor .btn-send{
      margin-left: 8px;
      padding: 2px 26px;
    }
    .center-box >>> .el-dialog{
      width: 98%;
      padding: 10px;
      border-radius: 6px;
    }
    .center-box >>> .el-dialog__header{
      padding: 10px 0;
    }
    .center-box >>> .el-dialog__body{
      padding: 10px;
    }
    .center-box >>> .copywriting-prompt-box .el-dialog {
      width: 98%;
      border-radius: 6px;
    }
    .center-box >>> .bg-purple.grid-title i{
      font-size: 18px;
    }
  }
</style>
