---
title: '[总结]vue开发常见知识点及问题资料整理（持续更新）' 
date: 2018-12-26 2:30:13
hidden: true
slug: 4e8i4f3cql5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.(webpack)vue-cli构建的项目如何设置每个页面的title</h2>
<p>在路由里每个都添加一个meta</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{
    path:'/login',
    meta: {
      title: '登录页面'
    },
    component:'login'
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>[{
    path:<span class="hljs-symbol">'/login</span>',
    meta: {
      title: <span class="hljs-symbol">'登录页面</span>'
    },
    component:<span class="hljs-symbol">'login</span>'
}]</code></pre>
<p>钩子函数：</p>
<p>在main.js中添加如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  next()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, next)</span> =&gt;</span> {
  <span class="hljs-built_in">window</span>.<span class="hljs-built_in">document</span>.title = to.meta.title;
  next()
})</code></pre>
<h2 id="articleHeader1">2.vue项目中使用axios上传图片等文件</h2>
<p>首先安装axios：<br>1.利用npm安装<code>npm install axios –save</code><br>2.利用bower安装bower install axios –save<br>3.直接利用cdn引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/axios/dist/axios.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/axios/dist/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>一般情况上传照片有两种方式：</p>
<ul><li>1.本地图片转换成base64，然后通过普通的post请求发送到服务端。</li></ul>
<p>　　操作简单，适合小图，以及如果想兼容低版本的ie没办法用此方法</p>
<ul><li>2.通过form表单提交。</li></ul>
<p>　　form表单提交图片会刷新页面，也可以时form绑定到一个隐藏的iframe上，可以实现无刷新提交数据。</p>
<p>这里只讲解一下第二种方式：<br>html代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input  name=&quot;file&quot; type=&quot;file&quot; accept=&quot;image/png,image/gif,image/jpeg&quot; @change=&quot;update&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code style="word-break: break-word; white-space: initial;">&lt;input  name=<span class="hljs-string">"file"</span> <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"file"</span> accept=<span class="hljs-string">"image/png,image/gif,image/jpeg"</span> <span class="hljs-meta">@change</span>=<span class="hljs-string">"update"</span>/&gt;</code></pre>
<p>js代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
// 添加请求头
update (e) {   // 上传照片
      var self = this
      let file = e.target.files[0]
      /* eslint-disable no-undef */
      let param = new FormData()  // 创建form对象
      param.append('file', file)  // 通过append向form对象添加数据
      param.append('chunk', '0') // 添加form表单中其他数据
      console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
     // 添加请求头
    axios.post('http://172.19.26.60:8081/rest/user/headurl', param, config)
        .then(response => {
          if (response.data.code === 0) {
            self.ImgUrl = response.data.data
          }
          console.log(response.data)
        })
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-comment">// 添加请求头</span>
update (e) {   <span class="hljs-comment">// 上传照片</span>
      <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">let</span> file = e.target.files[<span class="hljs-number">0</span>]
      <span class="hljs-comment">/* eslint-disable no-undef */</span>
      <span class="hljs-keyword">let</span> param = <span class="hljs-keyword">new</span> FormData()  <span class="hljs-comment">// 创建form对象</span>
      param.append(<span class="hljs-string">'file'</span>, file)  <span class="hljs-comment">// 通过append向form对象添加数据</span>
      param.append(<span class="hljs-string">'chunk'</span>, <span class="hljs-string">'0'</span>) <span class="hljs-comment">// 添加form表单中其他数据</span>
      <span class="hljs-built_in">console</span>.log(param.get(<span class="hljs-string">'file'</span>)) <span class="hljs-comment">// FormData私有类对象，访问不到，可以通过get判断值是否传进去</span>
      <span class="hljs-keyword">let</span> config = {
        <span class="hljs-attr">headers</span>: {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'multipart/form-data'</span>}
      }
     <span class="hljs-comment">// 添加请求头</span>
    axios.post(<span class="hljs-string">'http://172.19.26.60:8081/rest/user/headurl'</span>, param, config)
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (response.data.code === <span class="hljs-number">0</span>) {
            self.ImgUrl = response.data.data
          }
          <span class="hljs-built_in">console</span>.log(response.data)
        })
    }</code></pre>
<h2 id="articleHeader2">3.qs.stringify() 和JSON.stringify()的区别以及在vux中使用post提交表单数据需要qs库序列化</h2>
<p>qs库的npm地址：<a href="https://www.npmjs.com/package/qs" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/qs</a></p>
<p>功能虽然都是序列化。假设我要提交的数据如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {name:'hehe',age:10};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var a</span> = {name:<span class="hljs-string">'hehe'</span>,age:10};</code></pre>
<p>qs.stringify序列化结果如下<br><code>name=hehe&amp;age=10</code></p>
<p>而JSON.stringify序列化结果如下：<br><code>"{"a":"hehe","age":10}"</code></p>
<p>vux中使用post提交表单数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$http.post(this.$sign.config.url.loginUrl,this.$qs.stringify({
    &quot;phone&quot;:this.phoneNumber,
    &quot;vCode&quot;:this.loginCode,
    &quot;smsCode&quot;:this.phoneCode    
    })
)
.then(response=>{
    console.log(response.data);
    if(response.data.httpCode == 200){
        
    }else{
        
    }
}) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$http.post(<span class="hljs-keyword">this</span>.$sign.config.url.loginUrl,<span class="hljs-keyword">this</span>.$qs.stringify({
    <span class="hljs-string">"phone"</span>:<span class="hljs-keyword">this</span>.phoneNumber,
    <span class="hljs-string">"vCode"</span>:<span class="hljs-keyword">this</span>.loginCode,
    <span class="hljs-string">"smsCode"</span>:<span class="hljs-keyword">this</span>.phoneCode    
    })
)
.then(response=&gt;{
    console.log(response.<span class="hljs-keyword">data</span>);
    <span class="hljs-keyword">if</span>(response.<span class="hljs-keyword">data</span>.httpCode == <span class="hljs-number">200</span>){
        
    }<span class="hljs-keyword">else</span>{
        
    }
}) </code></pre>
<p>在firebug中可以看到传递的参数：<br><code>phone=15210275239&amp;vCode=8vsd&amp;smsCode=1534</code></p>
<p>在vue中使用axios：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.post(loginUrl, {
    &quot;email&quot;: this.email,
    &quot;password&quot;: this.password
}, {
    transformRequest: (data) => {
        return this.$qs.stringify(data)
    },
}).then(res => {
    if(res.data.resultCode == RESULT_CODE_SUCCESS){
        console.log('登录成功');
        this.$router.push({name:&quot;home&quot;})
    }else{
        console.log('登录失败');
    }
}).catch(err => {
    console.log('登登录出现错误');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$axios.post(loginUrl, {
    <span class="hljs-string">"email"</span>: <span class="hljs-keyword">this</span>.email,
    <span class="hljs-string">"password"</span>: <span class="hljs-keyword">this</span>.password
}, {
    transformRequest: (<span class="hljs-keyword">data</span>) =&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$qs.stringify(<span class="hljs-keyword">data</span>)
    },
}).then(res =&gt; {
    <span class="hljs-keyword">if</span>(res.<span class="hljs-keyword">data</span>.resultCode == RESULT_CODE_SUCCESS){
        console.log(<span class="hljs-string">'登录成功'</span>);
        <span class="hljs-keyword">this</span>.$router.push({name:<span class="hljs-string">"home"</span>})
    }<span class="hljs-keyword">else</span>{
        console.log(<span class="hljs-string">'登录失败'</span>);
    }
}).<span class="hljs-keyword">catch</span>(err =&gt; {
    console.log(<span class="hljs-string">'登登录出现错误'</span>);
})</code></pre>
<h2 id="articleHeader3">4.vue中实现全局的setCookie，getCookie以及delCookie方法笔记</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import App from '../component/App.vue'
import Login from '../component/Login.vue'
import UserInfo from '../component/UserInfo.vue'
//状态管理
Vue.use(Vuex)
  //路由
Vue.use(VueRouter)

//路由配置
//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link
const router = new VueRouter({
  routes: [{
    path: '/login',
    component: Login
  }, {
    path: '/user_info',
    component: UserInfo
  }]
})

//Vuex配置
const store = new Vuex.Store({
  state: {
    domain:'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
    userInfo: { //保存用户信息
      nick: null,
      ulevel: null,
      uid: null,
      portrait: null
    }
  },
  mutations: {
    //更新用户信息
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
})

//设置cookie,增加到vue实例方便全局调用
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + &quot;=&quot; + escape(value) + ((expiredays == null) ? &quot;&quot; : &quot;;expires=&quot; + exdate.toGMTString());
}

//获取cookie
Vue.prototype.getCookie = (name) => {
    var arr, reg = new RegExp(&quot;(^| )&quot; + name + &quot;=([^;]*)(;|$)&quot;);
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//删除cookie
Vue.prototype.delCookie =(name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + &quot;=&quot; + cval + &quot;;expires=&quot; + exp.toGMTString();
  }

//vue实例
var app = new Vue({
  data: {},
  el: '#app',
  render: h => h(App),
  router,
  store,
  watch:{
    &quot;$route&quot; : 'checkLogin'
  },
  created() {
    this.checkLogin();
  },
  methods:{
    checkLogin(){

      //检查是否存在session
      if(!this.getCookie('session')){
        this.$router.push('/login');
      }else{
        this.$router.push('/user_info');
      }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">'../component/App.vue'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'../component/Login.vue'</span>
<span class="hljs-keyword">import</span> UserInfo <span class="hljs-keyword">from</span> <span class="hljs-string">'../component/UserInfo.vue'</span>
<span class="hljs-comment">//状态管理</span>
Vue.use(Vuex)
  <span class="hljs-comment">//路由</span>
Vue.use(VueRouter)

<span class="hljs-comment">//路由配置</span>
<span class="hljs-comment">//如果需要加菜单，就在这里添加路由，并在UserMenu.vue添加入口router-link</span>
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">routes</span>: [{
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
    <span class="hljs-attr">component</span>: Login
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/user_info'</span>,
    <span class="hljs-attr">component</span>: UserInfo
  }]
})

<span class="hljs-comment">//Vuex配置</span>
<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">domain</span>:<span class="hljs-string">'http://test.example.com'</span>, <span class="hljs-comment">//保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）</span>
    userInfo: { <span class="hljs-comment">//保存用户信息</span>
      nick: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">ulevel</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">uid</span>: <span class="hljs-literal">null</span>,
      <span class="hljs-attr">portrait</span>: <span class="hljs-literal">null</span>
    }
  },
  <span class="hljs-attr">mutations</span>: {
    <span class="hljs-comment">//更新用户信息</span>
    updateUserInfo(state, newUserInfo) {
      state.userInfo = newUserInfo;
    }
  }
})

<span class="hljs-comment">//设置cookie,增加到vue实例方便全局调用</span>
Vue.prototype.setCookie = <span class="hljs-function">(<span class="hljs-params">c_name, value, expiredays</span>) =&gt;</span> {
  <span class="hljs-keyword">var</span> exdate = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  <span class="hljs-built_in">document</span>.cookie = c_name + <span class="hljs-string">"="</span> + <span class="hljs-built_in">escape</span>(value) + ((expiredays == <span class="hljs-literal">null</span>) ? <span class="hljs-string">""</span> : <span class="hljs-string">";expires="</span> + exdate.toGMTString());
}

<span class="hljs-comment">//获取cookie</span>
Vue.prototype.getCookie = <span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> arr, reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"(^| )"</span> + name + <span class="hljs-string">"=([^;]*)(;|$)"</span>);
    <span class="hljs-keyword">if</span> (arr = <span class="hljs-built_in">document</span>.cookie.match(reg))
        <span class="hljs-keyword">return</span> (arr[<span class="hljs-number">2</span>]);
    <span class="hljs-keyword">else</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
}

<span class="hljs-comment">//删除cookie</span>
Vue.prototype.delCookie =<span class="hljs-function">(<span class="hljs-params">name</span>) =&gt;</span> {
    <span class="hljs-keyword">var</span> exp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
    exp.setTime(exp.getTime() - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> cval = <span class="hljs-keyword">this</span>.getCookie(name);
    <span class="hljs-keyword">if</span> (cval != <span class="hljs-literal">null</span>)
      <span class="hljs-built_in">document</span>.cookie = name + <span class="hljs-string">"="</span> + cval + <span class="hljs-string">";expires="</span> + exp.toGMTString();
  }

<span class="hljs-comment">//vue实例</span>
<span class="hljs-keyword">var</span> app = <span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">data</span>: {},
  <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
  router,
  store,
  <span class="hljs-attr">watch</span>:{
    <span class="hljs-string">"$route"</span> : <span class="hljs-string">'checkLogin'</span>
  },
  created() {
    <span class="hljs-keyword">this</span>.checkLogin();
  },
  <span class="hljs-attr">methods</span>:{
    checkLogin(){

      <span class="hljs-comment">//检查是否存在session</span>
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.getCookie(<span class="hljs-string">'session'</span>)){
        <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/login'</span>);
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/user_info'</span>);
      }
    }
  }
})</code></pre>
<h2 id="articleHeader4">5.webpack中alias配置中的“@”是什么意思？</h2>
<p>如题所示，build文件夹下的webpack.base.conf.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">resolve</span>: {
    <span class="hljs-attribute">extensions</span>: [<span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>, <span class="hljs-string">'.json'</span>],
    alias: {
      <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
      <span class="hljs-string">'@'</span>: <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>)
    }
  }</code></pre>
<p>其中的@的意思是：<br>只是一个别名而已。这里设置别名是为了让后续引用的地方减少路径的复杂度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例如
src
- components
  - a.vue
- router
  - home
    - index.vue


index.vue 里，正常引用 A 组件：

import A from '../../components/a.vue'

如果设置了 alias 后。
alias: {
 'vue$': 'vue/dist/vue.esm.js',
 '@': resolve('src')
}

引用的地方路径就可以这样了

import A from '@/components/a.vue'

这里的 @ 就起到了【resolve('src')】路径的作用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//例如</span>
src
- components
  - <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.vue</span>
- router
  - home
    - index<span class="hljs-selector-class">.vue</span>


index<span class="hljs-selector-class">.vue</span> 里，正常引用 A 组件：

import A from <span class="hljs-string">'../../components/a.vue'</span>

如果设置了 alias 后。
alias: {
 <span class="hljs-string">'vue$'</span>: <span class="hljs-string">'vue/dist/vue.esm.js'</span>,
 <span class="hljs-string">'@'</span>: resolve(<span class="hljs-string">'src'</span>)
}

引用的地方路径就可以这样了

import A from <span class="hljs-string">'@/components/a.vue'</span>

这里的 @ 就起到了【resolve(<span class="hljs-string">'src'</span>)】路径的作用。</code></pre>
<h2 id="articleHeader5">6.webpack proxyTable 代理跨域</h2>
<p>webpack 开发环境可以使用proxyTable 来代理跨域，生产环境的话可以根据各自的服务器进行配置代理跨域就行了。在我们的项目config/index.js 文件下可以看到有一个proxyTable的属性，我们对其简单的改写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/api': {
        target: 'http://api.douban.com/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/api'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://api.douban.com/v2'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
      }
    }</code></pre>
<p>这样当我们访问localhost:8080/api/movie的时候 其实我们访问的是<a href="http://api.douban.com/v2/movie%E8%BF%99%E6%A0%B7%E4%BE%BF%E8%BE%BE%E5%88%B0%E4%BA%86%E4%B8%80%E7%A7%8D%E8%B7%A8%E5%9F%9F%E8%AF%B7%E6%B1%82%E7%9A%84%E6%96%B9%E6%A1%88" rel="nofollow noreferrer" target="_blank">http://api.douban.com/v2/movi...</a>。</p>
<p>当然我们也可以根据具体的接口的后缀来匹配代理，如后缀为.shtml，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
    '**/*.shtml': {
        target: 'http://192.168.198.111:8080/abc',
        changeOrigin: true
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
    <span class="hljs-string">'**/*.shtml'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://192.168.198.111:8080/abc'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true
    }
}</code></pre>
<p>可参考地址：<br><a href="http://www.cnblogs.com/coolslider/p/7076191.html" rel="nofollow noreferrer" target="_blank">webpack 前后端分离开发接口调试解决方案，proxyTable解决方案</a><br><a href="https://github.com/chimurai/http-proxy-middleware" rel="nofollow noreferrer" target="_blank">http-proxy-middleware</a></p>
<h2 id="articleHeader6">7.如何在 vue 项目里正确地引用 jquery 和 jquery-ui的插件</h2>
<p>使用<code>vue-cli</code>构建的vue项目，<code>webpack</code>的配置文件是分散在很多地方的，而我们需要修改的是<code>build/webpack.base.conf.js</code>，修改两处的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在开头引入webpack，后面的plugins那里需要
var webpack = require('webpack')
// resolve

module.exports = {
   // 其他代码...
   resolve: {
      extensions: ['', '.js', '.vue'],
      fallback: [path.join(__dirname, '../node_modules')],
      alias: {
          'src': path.resolve(__dirname, '../src'),
          'assets': path.resolve(__dirname, '../src/assets'),
          'components': path.resolve(__dirname, '../src/components'),

          // webpack 使用 jQuery，如果是自行下载的
          // 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),
          // 如果使用NPM安装的jQuery
          'jquery': 'jquery' 
      }
   },

   // 增加一个plugins
   plugins: [
      new webpack.ProvidePlugin({
          $: &quot;jquery&quot;,
          jQuery: &quot;jquery&quot;
      })
   ],

   // 其他代码...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 在开头引入webpack，后面的plugins那里需要</span>
var webpack = require(<span class="hljs-string">'webpack'</span>)
<span class="hljs-comment">// resolve</span>

module.exports = {
   <span class="hljs-comment">// 其他代码...</span>
   resolve: {
      extensions: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.vue'</span>],
      fallback: [path.<span class="hljs-built_in">join</span>(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">'../node_modules'</span>)],
      alias: {
          <span class="hljs-string">'src'</span>: path.resolve(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">'../src'</span>),
          <span class="hljs-string">'assets'</span>: path.resolve(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">'../src/assets'</span>),
          <span class="hljs-string">'components'</span>: path.resolve(<span class="hljs-variable">__dirname</span>, <span class="hljs-string">'../src/components'</span>),

          <span class="hljs-comment">// webpack 使用 jQuery，如果是自行下载的</span>
          <span class="hljs-comment">// 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),</span>
          <span class="hljs-comment">// 如果使用NPM安装的jQuery</span>
          <span class="hljs-string">'jquery'</span>: <span class="hljs-string">'jquery'</span> 
      }
   },

   <span class="hljs-comment">// 增加一个plugins</span>
   plugins: [
      new webpack.ProvidePlugin({
          $: <span class="hljs-string">"jquery"</span>,
          jQuery: <span class="hljs-string">"jquery"</span>
      })
   ],

   <span class="hljs-comment">// 其他代码...</span>
}</code></pre>
<p>这样就可以正确的使用<code>jQuery</code>了，比如我要引入<code>Bootstrap</code>，我们在vue的入口js文件<code>src/main.js</code>开头加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用Bootstrap
import './assets/libs/bootstrap/css/bootstrap.min.css'
import './assets/libs/bootstrap/js/bootstrap.min'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 使用Bootstrap</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/libs/bootstrap/css/bootstrap.min.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'./assets/libs/bootstrap/js/bootstrap.min'</span></code></pre>
<p>这样<code>Bootstrap</code>就正确的被引用并构建。<br>在比如使用<code>toastr</code>组件，只需要在需要的地方<code>import</code>进来，或者全局引入css在需要的地方引用js，然后直接使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用toastr
import 'assets/libs/toastr/toastr.min.css'
import toastr from 'assets/libs/toastr/toastr.min'

toastr.success('Hello')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// 使用toastr</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'assets/libs/toastr/toastr.min.css'</span>
<span class="hljs-keyword">import</span> toastr <span class="hljs-keyword">from</span> <span class="hljs-string">'assets/libs/toastr/toastr.min'</span>

toastr.success(<span class="hljs-string">'Hello'</span>)</code></pre>
<p>参考：<a href="https://stackoverflow.com/questions/28969861/managing-jquery-plugin-dependency-in-webpack" rel="nofollow noreferrer" target="_blank">Managing Jquery plugin dependency in webpack</a></p>
<h3 id="articleHeader7">vue-cli webpack全局引入jquery</h3>
<p>1.首先在package.json里加入，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dependencies:{
 &quot;jquery&quot; : &quot;^2.2.3&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-symbol">dependencies:</span>{
 <span class="hljs-string">"jquery"</span> : <span class="hljs-string">"^2.2.3"</span>
}</code></pre>
<p>然后 <code>npm install</code></p>
<p>2.在webpack.base.conf.js里加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">"webpack"</span>)</code></pre>
<p>3.在module.exports的最后加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plugins: [
 new webpack.optimize.CommonsChunkPlugin('common.js'),
 new webpack.ProvidePlugin({
     jQuery: &quot;jquery&quot;,
     $: &quot;jquery&quot;
 })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-string">plugins:</span> [
 <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'common.js'</span>),
 <span class="hljs-keyword">new</span> webpack.ProvidePlugin({
<span class="hljs-symbol">     jQuery:</span> <span class="hljs-string">"jquery"</span>,
<span class="hljs-symbol">     $:</span> <span class="hljs-string">"jquery"</span>
 })
]</code></pre>
<p>4.然后一定要重新 <code>run dev</code></p>
<p>5.在main.js 引入就ok了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span></code></pre>
<p>参考: <a href="http://618cj.com/2016/08/24/vue-cli%E6%80%8E%E4%B9%88%E5%BC%95%E5%85%A5jquery/" rel="nofollow noreferrer" target="_blank">vue-cli怎么引入jquery</a></p>
<h3 id="articleHeader8">在.vue文件中引入第三方非NPM模块</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Showbo = require(&quot;exports?Showbo!./path/to/showbo.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var Showbo</span> = require(<span class="hljs-string">"exports?Showbo!./path/to/showbo.js"</span>);</code></pre>
<p>参考: <a href="http://webpack.github.io/docs/shimming-modules.html#exporting" rel="nofollow noreferrer" target="_blank">exports-loader</a></p>
<h3 id="articleHeader9">vue-cli引入外部文件</h3>
<p>在 <code>webpack.base.conf.js</code> 中添加<code>externals</code><br><span class="img-wrap"><img data-src="/img/bVZ1DI?w=248&amp;h=140" src="https://static.alili.tech/img/bVZ1DI?w=248&amp;h=140" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>externals 中 swiper 是键，对应的值一定的是插件 swiper.js 所定义的变量 Swiper :<br><span class="img-wrap"><img data-src="/img/bVZ1DJ?w=800&amp;h=454" src="https://static.alili.tech/img/bVZ1DJ?w=800&amp;h=454" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZ1DK?w=800&amp;h=423" src="https://static.alili.tech/img/bVZ1DK?w=800&amp;h=423" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>之后再在根目录下的<code>index.html</code>文件里引入文件：<code>&lt;script src="static/lib/swiper.js"&gt;&lt;/script&gt;</code><br>这样子就可以在需要用到<code>swiper.js</code>的文件里加入这行代码：<code>import Swiper from 'swiper'</code>，这样就能正常使用了。<br>参考: <a href="https://segmentfault.com/q/1010000005169531?_ea=806312">https://segmentfault.com/q/1010000005169531?_ea=806312</a></p>
<h2 id="articleHeader10">8.vue和mintui-Loadmore结合实现下拉刷新，上拉加载 （待优化）</h2>
<p>mintui是饿了么团队针对vue开发的移动端组件库，方便实现移动端的一些功能，这里只用了Loadmore功能实现移动端的上拉分页刷新，下拉加载数据.<br>mintui官网：<a href="http://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">http://mint-ui.github.io/#!/zh-cn</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>  
  <div class=&quot;main-body&quot; :style=&quot;{'-webkit-overflow-scrolling': scrollMode}&quot;>  
    <v-loadmore :top-method=&quot;loadTop&quot; :bottom-method=&quot;loadBottom&quot; :bottom-all-loaded=&quot;allLoaded&quot; :auto-fill=&quot;false&quot; ref=&quot;loadmore&quot;>  
      <ul class=&quot;list&quot; v-for=&quot;(val, key) in pageList&quot;>  
        <li>  
          <div>我是小11</div>  
          <div>我是小11</div>  
        </li>  
      </ul>  
    </v-loadmore>  
  </div>  
</template>  
<script>  
  import {Loadmore} from 'mint-ui';  
  export default {  
    data:function() {  
      return {  
        searchCondition:{  //分页属性  
          pageNo:&quot;1&quot;,  
          pageSize:&quot;10&quot;  
        },  
        pageList:[],  
        allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  
        scrollMode:&quot;auto&quot; //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  
      }  
    },  
    components: {  
      'v-loadmore':Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  
                              // 推荐应用组件时用a-b形式起名  
    },  
    mounted(){  
      this.loadPageList();  //初次访问查询列表  
    },  
    methods: {  
      loadTop:function() { //组件提供的下拉触发方法  
        //下拉加载  
        this.loadPageList();  
        this.$refs.loadmore.onTopLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      },  
      loadBottom:function() {  
        // 上拉加载  
        this.more();// 上拉触发的分页查询  
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位  
      },  
      loadPageList:function (){  
          // 查询数据  
        this.api.PageList(this.searchCondition).then(data =>{  
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉  
          this.isHaveMore(data.result.haveMore);  
          this.pageList = data.result.pageList;  
          this.$nextTick(function () {  
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  
            this.scrollMode = &quot;touch&quot;;  
          });  
        });  
      },  
      more:function (){  
          // 分页查询  
        this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;  
        this.api.loadPageList(this.searchCondition).then(data=>{  
          this.pageList = this.pageList.concat(data.result.pageList);  
          this.isHaveMore(data.result.haveMore);  
        });  
      },  
      isHaveMore:function(isHaveMore){  
        // 是否还有下一页，如果没有就禁止上拉刷新  
        this.allLoaded = true; //true是禁止上拉加载  
        if(isHaveMore){  
          this.allLoaded = false;  
        }  
      }  
    }  
  }  
</script>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>  
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-body"</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">"{'-webkit-overflow-scrolling': scrollMode}"</span>&gt;</span>  
    <span class="hljs-tag">&lt;<span class="hljs-name">v-loadmore</span> <span class="hljs-attr">:top-method</span>=<span class="hljs-string">"loadTop"</span> <span class="hljs-attr">:bottom-method</span>=<span class="hljs-string">"loadBottom"</span> <span class="hljs-attr">:bottom-all-loaded</span>=<span class="hljs-string">"allLoaded"</span> <span class="hljs-attr">:auto-fill</span>=<span class="hljs-string">"false"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"loadmore"</span>&gt;</span>  
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(val, key) in pageList"</span>&gt;</span>  
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>  
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是小11<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我是小11<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>  
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>  
    <span class="hljs-tag">&lt;/<span class="hljs-name">v-loadmore</span>&gt;</span>  
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>  
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">  
  <span class="hljs-keyword">import</span> {Loadmore} <span class="hljs-keyword">from</span> <span class="hljs-string">'mint-ui'</span>;  
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {  
    <span class="hljs-attr">data</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
      <span class="hljs-keyword">return</span> {  
        <span class="hljs-attr">searchCondition</span>:{  <span class="hljs-comment">//分页属性  </span>
          pageNo:<span class="hljs-string">"1"</span>,  
          <span class="hljs-attr">pageSize</span>:<span class="hljs-string">"10"</span>  
        },  
        <span class="hljs-attr">pageList</span>:[],  
        <span class="hljs-attr">allLoaded</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了  </span>
        scrollMode:<span class="hljs-string">"auto"</span> <span class="hljs-comment">//移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动  </span>
      }  
    },  
    <span class="hljs-attr">components</span>: {  
      <span class="hljs-string">'v-loadmore'</span>:Loadmore  <span class="hljs-comment">// 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题  </span>
                              <span class="hljs-comment">// 推荐应用组件时用a-b形式起名  </span>
    },  
    mounted(){  
      <span class="hljs-keyword">this</span>.loadPageList();  <span class="hljs-comment">//初次访问查询列表  </span>
    },  
    <span class="hljs-attr">methods</span>: {  
      <span class="hljs-attr">loadTop</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">//组件提供的下拉触发方法  </span>
        <span class="hljs-comment">//下拉加载  </span>
        <span class="hljs-keyword">this</span>.loadPageList();  
        <span class="hljs-keyword">this</span>.$refs.loadmore.onTopLoaded();<span class="hljs-comment">// 固定方法，查询完要调用一次，用于重新定位  </span>
      },  
      <span class="hljs-attr">loadBottom</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  
        <span class="hljs-comment">// 上拉加载  </span>
        <span class="hljs-keyword">this</span>.more();<span class="hljs-comment">// 上拉触发的分页查询  </span>
        <span class="hljs-keyword">this</span>.$refs.loadmore.onBottomLoaded();<span class="hljs-comment">// 固定方法，查询完要调用一次，用于重新定位  </span>
      },  
      <span class="hljs-attr">loadPageList</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{  
          <span class="hljs-comment">// 查询数据  </span>
        <span class="hljs-keyword">this</span>.api.PageList(<span class="hljs-keyword">this</span>.searchCondition).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span>{  
          <span class="hljs-comment">// 是否还有下一页，加个方法判断，没有下一页要禁止上拉  </span>
          <span class="hljs-keyword">this</span>.isHaveMore(data.result.haveMore);  
          <span class="hljs-keyword">this</span>.pageList = data.result.pageList;  
          <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{  
            <span class="hljs-comment">// 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，  </span>
            <span class="hljs-comment">// 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，  </span>
            <span class="hljs-comment">// 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好  </span>
            <span class="hljs-keyword">this</span>.scrollMode = <span class="hljs-string">"touch"</span>;  
          });  
        });  
      },  
      <span class="hljs-attr">more</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>)</span>{  
          <span class="hljs-comment">// 分页查询  </span>
        <span class="hljs-keyword">this</span>.searchCondition.pageNo = <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">this</span>.searchCondition.pageNo) + <span class="hljs-number">1</span>;  
        <span class="hljs-keyword">this</span>.api.loadPageList(<span class="hljs-keyword">this</span>.searchCondition).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{  
          <span class="hljs-keyword">this</span>.pageList = <span class="hljs-keyword">this</span>.pageList.concat(data.result.pageList);  
          <span class="hljs-keyword">this</span>.isHaveMore(data.result.haveMore);  
        });  
      },  
      <span class="hljs-attr">isHaveMore</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">isHaveMore</span>)</span>{  
        <span class="hljs-comment">// 是否还有下一页，如果没有就禁止上拉刷新  </span>
        <span class="hljs-keyword">this</span>.allLoaded = <span class="hljs-literal">true</span>; <span class="hljs-comment">//true是禁止上拉加载  </span>
        <span class="hljs-keyword">if</span>(isHaveMore){  
          <span class="hljs-keyword">this</span>.allLoaded = <span class="hljs-literal">false</span>;  
        }  
      }  
    }  
  }  
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>  </code></pre>
<p>PS：有个坑一定要注意就是注释里说的iPhone里loadmore和-webkit-overflow-scrolling属性冲突无法上拉问题</p>
<p>可参考另外一个插件，没有使用过，<a href="https://juejin.im/entry/59ace2c4518825243a78f1c3" rel="nofollow noreferrer" target="_blank">《简单灵活且强大的Vue下拉刷新组件：vue-pull-to》</a></p>
<h2 id="articleHeader11">9.在vue+webpack实际开发中出现两个或多个菜单公用一个组件的解决方案</h2>
<p>在vue的实际开发中往往会遇到公用一个组件的问题，比如有一个菜单中的两个按钮，点击每个按钮调用的是同一个组件，其内容是根据路由的参数的不同来请求不同的内容。</p>
<p>第一步，首先新建一个vue+webpack+vuecli的demo，如下操作：<br>全局安装<code>vue-cli</code>，<code>vue-cil</code>是vue的脚手架工具，安装命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<p>第二步，进入到工程目录中，创建一个<code>vuedemo</code>的文件夹工程，如下两步操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vue_test_project //进入vue_test_project目录下
vue init webpack vuedemo //在vue_test_project目录下创建一个vuedemo工程" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code><span class="hljs-built_in">cd</span> vue_test_project <span class="hljs-comment">//进入vue_test_project目录下</span>
vue init webpack vuedemo <span class="hljs-comment">//在vue_test_project目录下创建一个vuedemo工程</span></code></pre>
<p>输入这个命令之后，会出现一些提示，是什么不用管，一直按回车即可。</p>
<p>第三步，如下操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd vuedemo
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> vuedemo
npm install</code></pre>
<p>执行<code>npm install</code>需要一点时间，因为会从服务器上下载代码啦之类的。并且在执行过程中会有一些警告信息。不用管，等着就是了。如果长时间没有响应，就<code>ctrl+c</code>停止掉，然后再执行一次即可。</p>
<p>最后一步，操作如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> dev</span></code></pre>
<p>在运行了<code>npm run dev</code>之后，会自动打开一个浏览器窗口，就可以看到实际的效果了。这个demo就创建好了。现在就在这个<code>demo</code>中添加一些内容，修改成如下：<br><span class="img-wrap"><img data-src="/img/bVZ1Fa?w=606&amp;h=469" src="https://static.alili.tech/img/bVZ1Fa?w=606&amp;h=469" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>修改<code>HelloWorld.vue</code>的内容为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>Essential Links</h2>
    <div class=&quot;btn&quot;>
         <router-link :to=&quot;{name:'content',params:{differId:'con1'"}}"&quot;>内容按钮1</router-link>
         <router-link :to=&quot;{name:'content',params:{differId:'con2'"}}"&quot;>内容按钮2</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{" msg "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Essential Links<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{name:'content',params:{differId:'con1'"}}""</span>&gt;</span>内容按钮1<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">"{name:'content',params:{differId:'con2'"}}""</span>&gt;</span>内容按钮2<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'HelloWorld'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'Welcome to Your Vue.js App'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span> {
  <span class="hljs-attribute">font-weight</span>: normal;
}
<span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">list-style-type</span>: none;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-tag">a</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#42b983</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>路由<code>router</code>下的<code>index.html</code>的修改为如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import content from '@/components/conDetail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
          {name:'content',path:'content/:differId',component:content}
      ]
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> HelloWorld <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/HelloWorld'</span>
<span class="hljs-keyword">import</span> content <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/conDetail'</span>
Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'HelloWorld'</span>,
      component: HelloWorld,
      children:[
          {name:<span class="hljs-string">'content'</span>,path:<span class="hljs-string">'content/:differId'</span>,component:content}
      ]
    }
  ]
})</code></pre>
<p>现在创建一个<code>conDetail.vue</code>了，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;same&quot;>
        这个是相同的内容
        <div class=&quot;conlist&quot;>
            <template v-for=&quot;item in items&quot;>
                <p>"{{"item.con"}}"</p>
            </template>
        </div>
    </div>
</template>

<script>
export default {
  name: 'conDetail',
  data () {
    return {
      msg: '',
      differIdType:'',
      conlist:[
          {'con':'这是第一个内容按钮的内容1'},
          {'con':'这是第一个内容按钮的内容2'}
      ],
      items:[], 
      
    }
  },
  mounted(){
          this.differIdType = this.$route.params.differId == 'con1' ? '0' : '1';
          if(this.differIdType == 0){
              this.items = this.conlist;
          }else{
              this.items = [];
          }
  },
  watch:{
      $route:function(to,from){
          this.differIdType = to.params.differId == 'con1' ? '0' : '1'; 
          if(this.differIdType == 0){
              this.items = this.conlist;
          }else{
              this.items = [];
          }    
      }
  }
  
}
</script>

<style>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"same"</span>&gt;</span>
        这个是相同的内容
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"conlist"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in items"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.con"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'conDetail'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">differIdType</span>:<span class="hljs-string">''</span>,
      <span class="hljs-attr">conlist</span>:[
          {<span class="hljs-string">'con'</span>:<span class="hljs-string">'这是第一个内容按钮的内容1'</span>},
          {<span class="hljs-string">'con'</span>:<span class="hljs-string">'这是第一个内容按钮的内容2'</span>}
      ],
      <span class="hljs-attr">items</span>:[], 
      
    }
  },
  mounted(){
          <span class="hljs-keyword">this</span>.differIdType = <span class="hljs-keyword">this</span>.$route.params.differId == <span class="hljs-string">'con1'</span> ? <span class="hljs-string">'0'</span> : <span class="hljs-string">'1'</span>;
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.differIdType == <span class="hljs-number">0</span>){
              <span class="hljs-keyword">this</span>.items = <span class="hljs-keyword">this</span>.conlist;
          }<span class="hljs-keyword">else</span>{
              <span class="hljs-keyword">this</span>.items = [];
          }
  },
  <span class="hljs-attr">watch</span>:{
      <span class="hljs-attr">$route</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">to,from</span>)</span>{
          <span class="hljs-keyword">this</span>.differIdType = to.params.differId == <span class="hljs-string">'con1'</span> ? <span class="hljs-string">'0'</span> : <span class="hljs-string">'1'</span>; 
          <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.differIdType == <span class="hljs-number">0</span>){
              <span class="hljs-keyword">this</span>.items = <span class="hljs-keyword">this</span>.conlist;
          }<span class="hljs-keyword">else</span>{
              <span class="hljs-keyword">this</span>.items = [];
          }    
      }
  }
  
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>结果就是，当点击内容按钮1，出现了对象的内容，点击内容按钮2，出现相应的内容。当然我这儿写的是点击按钮2的时候，其items的内容为空数组。这儿也使用了<code>$route</code>的监听。</p>
<p>复用组件时，想对路由参数的变化作出响应的话，你可以简单地 <code>watch</code>（监测变化） <code>$route</code> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> User = {
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'...'</span>,
  watch: {
    <span class="hljs-string">'$route'</span> (to, from) {
      <span class="hljs-comment">// 对路由变化作出响应...</span>
    }
  }
}</code></pre>
<p>或者使用 2.2 中引入的 <code>beforeRouteUpdate</code> 守卫：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> User = {
  <span class="hljs-keyword">template</span>: <span class="hljs-string">'...'</span>,
  beforeRouteUpdate (to, from, next) {
    <span class="hljs-comment">// react to route changes...</span>
    <span class="hljs-comment">// don't forget to call next()</span>
  }
}</code></pre>
<p>详细了解路由相关的内容，查看官网：<a href="https://router.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://router.vuejs.org/zh-cn/</a></p>
<h2 id="articleHeader12">10.vue2.x父子组件以及非父子组件之间的通信</h2>
<h3 id="articleHeader13">1.父组件传递数据给子组件</h3>
<p>父组件数据如何传递给子组件呢？可以通过<code>props</code>属性来实现</p>
<p>父组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<parent>
    <child :child-msg=&quot;msg&quot;></child>//这里必须要用 - 代替驼峰
</parent>

data(){
    return {
        msg: [1,2,3]
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;parent&gt;</span>
    <span class="hljs-params">&lt;child :child-msg="msg"&gt;</span><span class="hljs-params">&lt;/child&gt;</span><span class="hljs-comment">//这里必须要用 - 代替驼峰</span>
<span class="hljs-params">&lt;/parent&gt;</span>

data(){
    <span class="hljs-class">return </span>{
<span class="hljs-symbol">        msg:</span> [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
    };
}</code></pre>
<p>子组件通过<code>props</code>来接收数据:</p>
<p>方式1：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: ['childMsg']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">props:</span> [<span class="hljs-string">'childMsg'</span>]</code></pre>
<p>方式2 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    childMsg: Array //这样可以指定传入的类型，如果类型不对，会警告
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">props</span>: {
    <span class="hljs-attribute">childMsg</span>: Array //这样可以指定传入的类型，如果类型不对，会警告
}</code></pre>
<p>方式3：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    childMsg: {
        type: Array,
        default: [0,0,0] //这样可以指定默认的值
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">props:</span> {
<span class="hljs-symbol">    childMsg:</span> {
<span class="hljs-symbol">        type:</span> Array,
<span class="hljs-symbol">        default:</span> [<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>] <span class="hljs-comment">//这样可以指定默认的值</span>
    }
}</code></pre>
<p>这样呢，就实现了父组件向子组件传递数据.</p>
<h3 id="articleHeader14">2.子组件与父组件通信</h3>
<p>子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div @click=&quot;up&quot;></div>
</template>

methods: {
    up() {
        this.$emit('fun','这是一段内容'); //主动触发fun方法，'这是一段内容'为向父组件传递的数据
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code>&lt;<span class="hljs-keyword">template</span>&gt;
    &lt;div @<span class="hljs-built_in">click</span>=<span class="hljs-string">"up"</span>&gt;&lt;/div&gt;
&lt;/<span class="hljs-keyword">template</span>&gt;

methods: {
    up() {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'fun'</span>,<span class="hljs-string">'这是一段内容'</span>); <span class="hljs-comment">//主动触发fun方法，'这是一段内容'为向父组件传递的数据</span>
    }
}</code></pre>
<p>父组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <child @fun=&quot;change&quot; :msg=&quot;msg&quot;></child> //监听子组件触发的fun事件,然后调用change方法
</div>
methods: {
    change(msg) {
        this.msg = msg; 
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">child</span> @<span class="hljs-attr">fun</span>=<span class="hljs-string">"change"</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child</span>&gt;</span> //监听子组件触发的fun事件,然后调用change方法
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
methods: {
    change(msg) {
        this.msg = msg; 
    }
}</code></pre>
<h3 id="articleHeader15">3.非父子组件通信</h3>
<p>如果2个组件不是父子组件那么如何通信呢？这时可以通过<code>eventHub</code>来实现通信.<br>所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Hub = new Vue(); //创建事件中心" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> <span class="hljs-type">Hub</span> = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">Vue</span>(); <span class="hljs-comment">//创建事件中心</span></span></code></pre>
<p>组件1触发：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div @click=&quot;eve&quot;></div>
methods: {
    eve() {
        Hub.$emit('change','hehe'); //Hub触发事件
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>&lt;<span class="hljs-keyword">div</span> @click=<span class="hljs-string">"eve"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
methods: {
    eve() {
        Hub.$emit(<span class="hljs-string">'change'</span>,<span class="hljs-string">'hehe'</span>); <span class="hljs-comment">//Hub触发事件</span>
    }
}</code></pre>
<p>组件2接收:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div></div>
created() {
    Hub.$on('change', () => { //Hub接收事件
        this.msg = 'hehe';
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>&lt;div&gt;&lt;/div&gt;
created() {
    Hub.$<span class="hljs-literal">on</span>(<span class="hljs-string">'change'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-regexp">//</span>Hub接收事件
        <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">'hehe'</span>;
    });
}</code></pre>
<p>可参考：<a href="https://segmentfault.com/a/1190000008042320">vue非父子组件怎么进行通信</a></p>
<h2 id="articleHeader16">11.vue项目中在使用vue-router切换页面的时候滚动条怎样自动滚动到顶部？</h2>
<p>有时候我们需要页面滚动条滚动到某一固定的位置，一般使用<code>Window scrollTo()</code> 方法。</p>
<p>语法就是：<code>scrollTo(xpos,ypos)</code></p>
<p><code>xpos</code>：必需。要在窗口文档显示区左上角显示的文档的 x 坐标。</p>
<p><code>ypos</code>：必需。要在窗口文档显示区左上角显示的文档的 y 坐标。</p>
<p>例如滚动内容的坐标位置100,500：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.scrollTo(100,500);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">window.scrollTo(<span class="hljs-number">100</span>,<span class="hljs-number">500</span>);</code></pre>
<p>好了，这个<code>scrollTop</code>这儿只是简单介绍一下，下面我们介绍下<code>veu-router</code>中的滚动行为。</p>
<p>使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 <code>vue-router</code> 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。</p>
<blockquote>注意: 这个功能只在<code> HTML5 history</code> 模式下可用。</blockquote>
<p>当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  routes: [...],
  scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
    <span class="hljs-comment">// return 期望滚动到哪个的位置</span>
  }
})</code></pre>
<p><code>scrollBehavior</code> 方法接收 <code>to</code> 和 <code>from</code> 路由对象。第三个参数 <code>savedPosition</code> 当且仅当 <code>popstate</code> 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。</p>
<p>这个方法返回滚动位置的对象信息，长这样：</p>
<ul>
<li><code>{ x: number, y: number }</code></li>
<li>
<code>{ selector: string, offset? : { x: number, y: number "}}"</code> (offset 只在 2.6.0+ 支持)</li>
</ul>
<p>如果返回一个 falsy (译者注：falsy 不是 <code>false</code>，<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy" rel="nofollow noreferrer" target="_blank">参考这里</a>)的值，或者是一个空对象，那么不会发生滚动。</p>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
<span class="hljs-built_in">  return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
}</code></pre>
<p>对于所有路由导航，简单地让页面滚动到顶部。</p>
<p>返回 <code>savedPosition</code>，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (savedPosition) {
<span class="hljs-built_in">    return</span> savedPosition
  } <span class="hljs-keyword">else</span> {
<span class="hljs-built_in">    return</span> { x: <span class="hljs-number">0</span>, y: <span class="hljs-number">0</span> }
  }
}</code></pre>
<p>如果你要模拟『滚动到锚点』的行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>scrollBehavior (<span class="hljs-keyword">to</span>, <span class="hljs-keyword">from</span>, savedPosition) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">to</span>.hash) {
<span class="hljs-built_in">    return</span> {
      selector: <span class="hljs-keyword">to</span>.hash
    }
  }
}</code></pre>
<p>我们还可以利用路由元信息更细颗粒度地控制滚动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" routes: [
    { path: '/', component: Home, meta: { scrollToTop: true "}}",
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar, meta: { scrollToTop: true "}}"
  ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-symbol"> routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/'</span>, <span class="hljs-string">component:</span> Home, <span class="hljs-string">meta:</span> { <span class="hljs-string">scrollToTop:</span> <span class="hljs-literal">true</span> "}}",
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/foo'</span>, <span class="hljs-string">component:</span> Foo },
    { <span class="hljs-string">path:</span> <span class="hljs-string">'/bar'</span>, <span class="hljs-string">component:</span> Bar, <span class="hljs-string">meta:</span> { <span class="hljs-string">scrollToTop:</span> <span class="hljs-literal">true</span> "}}"
  ]</code></pre>
<p>完整的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = { template: '<div>home</div>' }
const Foo = { template: '<div>foo</div>' }
const Bar = {
  template: `
    <div>
      bar
      <div style=&quot;height:500px&quot;></div>
      <p id=&quot;anchor&quot;>Anchor</p>
    </div>
  `
}

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior,
  routes: [
    { path: '/', component: Home, meta: { scrollToTop: true "}}",
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar, meta: { scrollToTop: true "}}"
  ]
})

new Vue({
  router,
  template: `
    <div id=&quot;app&quot;>
      <h1>Scroll Behavior</h1>
      <ul>
        <li><router-link to=&quot;/&quot;>/</router-link></li>
        <li><router-link to=&quot;/foo&quot;>/foo</router-link></li>
        <li><router-link to=&quot;/bar&quot;>/bar</router-link></li>
        <li><router-link to=&quot;/bar#anchor&quot;>/bar#anchor</router-link></li>
      </ul>
      <router-view class=&quot;view&quot;></router-view>
    </div>
  `
}).$mount('#app')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> VueRouter from <span class="hljs-string">'vue-router'</span>

Vue.use(VueRouter)

<span class="hljs-keyword">const</span> Home = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;home&lt;/div&gt;'</span> }
<span class="hljs-keyword">const</span> Foo = { <span class="hljs-keyword">template</span>: <span class="hljs-string">'&lt;div&gt;foo&lt;/div&gt;'</span> }
<span class="hljs-keyword">const</span> Bar = {
  <span class="hljs-keyword">template</span>: `
    &lt;div&gt;
      bar
      &lt;div style=<span class="hljs-string">"height:500px"</span>&gt;&lt;/div&gt;
      &lt;p id=<span class="hljs-string">"anchor"</span>&gt;Anchor&lt;/p&gt;
    &lt;/div&gt;
  `
}

<span class="hljs-comment">// scrollBehavior:</span>
<span class="hljs-comment">// - only available in html5 history mode</span>
<span class="hljs-comment">// - defaults to no scroll behavior</span>
<span class="hljs-comment">// - return false to prevent scroll</span>
<span class="hljs-keyword">const</span> scrollBehavior = (to, from, savedPosition) =&gt; {
  <span class="hljs-built_in">if</span> (savedPosition) {
    <span class="hljs-comment">// savedPosition is only available for popstate navigations.</span>
    <span class="hljs-built_in">return</span> savedPosition
  } <span class="hljs-built_in">else</span> {
    <span class="hljs-keyword">const</span> <span class="hljs-built_in">position</span> = {}
    <span class="hljs-comment">// new navigation.</span>
    <span class="hljs-comment">// scroll to anchor by returning the selector</span>
    <span class="hljs-built_in">if</span> (to.hash) {
      <span class="hljs-built_in">position</span>.selector = to.hash
    }
    <span class="hljs-comment">// check if any matched route config has meta that requires scrolling to top</span>
    <span class="hljs-built_in">if</span> (to.matched.some(m =&gt; m.meta.scrollToTop)) {
      <span class="hljs-comment">// cords will be used if no selector is provided,</span>
      <span class="hljs-comment">// or if the selector didn't match any element.</span>
      <span class="hljs-built_in">position</span>.x = <span class="hljs-number">0</span>
      <span class="hljs-built_in">position</span>.y = <span class="hljs-number">0</span>
    }
    <span class="hljs-comment">// if the returned position is falsy or an empty object,</span>
    <span class="hljs-comment">// will retain current scroll position.</span>
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">position</span>
  }
}

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  mode: <span class="hljs-string">'history'</span>,
  base: __dirname,
  scrollBehavior,
  routes: [
    { path: <span class="hljs-string">'/'</span>, component: Home, meta: { scrollToTop: true "}}",
    { path: <span class="hljs-string">'/foo'</span>, component: Foo },
    { path: <span class="hljs-string">'/bar'</span>, component: Bar, meta: { scrollToTop: true "}}"
  ]
})

<span class="hljs-keyword">new</span> Vue({
  router,
  <span class="hljs-keyword">template</span>: `
    &lt;div id=<span class="hljs-string">"app"</span>&gt;
      &lt;h1&gt;Scroll Behavior&lt;/h1&gt;
      &lt;ul&gt;
        &lt;li&gt;&lt;router-link to=<span class="hljs-string">"/"</span>&gt;/&lt;/router-link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;router-link to=<span class="hljs-string">"/foo"</span>&gt;/foo&lt;/router-link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;router-link to=<span class="hljs-string">"/bar"</span>&gt;/bar&lt;/router-link&gt;&lt;/li&gt;
        &lt;li&gt;&lt;router-link to=<span class="hljs-string">"/bar#anchor"</span>&gt;/bar<span class="hljs-meta">#anchor<span class="hljs-meta-string">&lt;/router-link&gt;&lt;/li&gt;</span></span>
      &lt;/ul&gt;
      &lt;router-view <span class="hljs-keyword">class</span>=<span class="hljs-string">"view"</span>&gt;&lt;/router-view&gt;
    &lt;/div&gt;
  `
}).$mount(<span class="hljs-string">'#app'</span>)</code></pre>
<p>在网上查了一下，网友说还可以试试在main.js入口文件配合vue-router写这个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.afterEach((to,from,next) => {
    window.scrollTo(0,0);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>router.afterEach(<span class="hljs-function"><span class="hljs-params">(to,<span class="hljs-keyword">from</span>,next)</span> =&gt;</span> {
    <span class="hljs-built_in">window</span>.scrollTo(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
});</code></pre>
<h2 id="articleHeader17">12.vue自定义全局组件并通过全局方法 Vue.use() 使用该组件</h2>
<h3 id="articleHeader18">简介</h3>
<p><code>Vue.use( plugin )</code>：安装 Vue.js 插件。如果插件是一个对象，必须提供 <code>install</code> 方法。如果插件是一个函数，它会被作为 <code>install</code> 方法。install 方法将被作为 Vue 的参数调用。</p>
<p>当 install 方法被同一个插件多次调用，插件将只会被安装一次。</p>
<p>Vue.js 的插件应当有一个公开方法 <code>install</code> 。这个方法的第一个参数是<code> Vue </code>构造器，第二个参数是一个可选的选项对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>MyPlugin.install = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(Vue, options)</span> </span>{
  <span class="hljs-comment">// 1. 添加全局方法或属性</span>
  Vue.myGlobalMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
  <span class="hljs-comment">// 2. 添加全局资源</span>
  Vue.directive(<span class="hljs-string">'my-directive'</span>, {
    bind (el, binding, vnode, oldVnode) {
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 3. 注入组件</span>
  Vue.mixin({
    created: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
      <span class="hljs-comment">// 逻辑...</span>
    }
    ...
  })
  <span class="hljs-comment">// 4. 添加实例方法</span>
  Vue.prototype.$myMethod = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(methodOptions)</span> </span>{
    <span class="hljs-comment">// 逻辑...</span>
  }
}</code></pre>
<p>通过全局方法 <code>Vue.use()</code> 使用插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)</code></pre>
<p>也可以传入一个选项对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.use(MyPlugin, { someOption: true })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(<span class="hljs-selector-tag">MyPlugin</span>, { <span class="hljs-attribute">someOption</span>: true })</code></pre>
<p>Vue.use 会自动阻止多次注册相同插件，届时只会注册一次该插件。</p>
<p><code>Vue.js</code> 官方提供的一些插件 (例如 <code>vue-router</code>) 在检测到 Vue 是可访问的全局变量时会自动调用 <code>Vue.use()</code>。然而在例如 <code>CommonJS</code> 的模块环境中，你应该始终显式地调用 <code>Vue.use()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')
// 不要忘了调用此方法
Vue.use(VueRouter)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时</span>
<span class="hljs-keyword">var</span> Vue = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue'</span>)
<span class="hljs-keyword">var</span> VueRouter = <span class="hljs-keyword">require</span>(<span class="hljs-string">'vue-router'</span>)
<span class="hljs-comment">// 不要忘了调用此方法</span>
Vue.<span class="hljs-keyword">use</span>(VueRouter)</code></pre>
<h3 id="articleHeader19">实例：实现一个children组件</h3>
<p>在<code>main.js</code>中使用该组件的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import  childModule from './components/children'
Vue.use(childModule)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span>  childModule <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/children'</span>
Vue.use(childModule)</code></pre>
<p>组件文件夹的目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    |-components
    　　|-children
    　　　　|-index.js 导出组件，并且install
    　　　　|-children.vue （定义自己的组件模板）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>    <span class="hljs-string">|-components</span>
    　　<span class="hljs-string">|-children</span>
    　　　　<span class="hljs-string">|-index.js 导出组件，并且install</span>
    　　　　<span class="hljs-string">|-children.vue （定义自己的组件模板）</span></code></pre>
<p><code>children.vue</code>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import childrencomponent from './children.vue'
const childrenMo = {
    install:function(Vue){
        Vue.component('childModule',childrencomponent)
    }
}
export default childrenMo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> childrencomponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./children.vue'</span>
<span class="hljs-keyword">const</span> childrenMo = {
    <span class="hljs-attr">install</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">Vue</span>)</span>{
        Vue.component(<span class="hljs-string">'childModule'</span>,childrencomponent)
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> childrenMo</code></pre>
<p>这样就实现了一个通过<code>vue.use</code>调用一个全局组件。</p>
<h2 id="articleHeader20">13.IE9报vuex requires a Promise polyfill in this browser问题解决</h2>
<p>因为使用了 ES6 中用来传递异步消息的的Promise，而IE低版本的浏览器不支持。</p>
<p>如图所示：<br><span class="img-wrap"><img data-src="/img/bVZ2pH?w=1269&amp;h=479" src="https://static.alili.tech/img/bVZ2pH?w=1269&amp;h=479" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>解决方法<br>第一步： 安装 babel-polyfill 。 babel-polyfill可以模拟ES6使用的环境，可以使用ES6的所有新方法</p>
<p>npm install --save babel-polyfill</p>
<p>第二步： 在 Webpack/Browserify/Node中使用</p>
<p>在webpack.config.js文件中</p>
<p>把</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        app: './src/main.js'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: {
        app: <span class="hljs-string">'./src/main.js'</span>
    }
}</code></pre>
<p>替换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: {
        app: [&quot;babel-polyfill&quot;, &quot;./src/main.js&quot;]
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>module.exports = {
<span class="hljs-symbol">    entry:</span> {
<span class="hljs-symbol">        app:</span> [<span class="hljs-string">"babel-polyfill"</span>, <span class="hljs-string">"./src/main.js"</span>]
    }
};</code></pre>
<h2 id="articleHeader21">14.通过webpack+vue+vueRouter+vuecli的配置文件package.json创建一个新的项目</h2>
<p>如果是简单通过package.json来创建一个项目，只需要执行<code>npm install</code></p>
<p>首先，我们自己得手动创建一个webpack+vue+vueRouter+vuecli工程，执行下面：<br>如：<br>新建一个vue项目,创建一个基于"webpack"的项目,项目名为vuedemo：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ vue init webpack vuedemo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"><span class="hljs-variable">$ </span>vue init webpack vuedemo</code></pre>
<p>安装完成后进入工程名称再根据原来项目的配置文件初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd vuedemo
$ npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd vuedemo
<span class="hljs-variable">$ </span>npm install</code></pre>
<p>但是由于在新建的时候对eslint的选择中选择了Yes,所以后面根据配置package.json的时候，发现没有<code>eslint-friendly-formatter </code>模块，由于原来的工程应该没有配置这个，所以这儿需要安装下，如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i -D eslint eslint-friendly-formatter" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> -D eslint eslint-friendly-formatter</code></pre>
<p>模块地址：<a href="https://www.npmjs.com/package/eslint-friendly-formatter" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package/eslint-friendly-formatter</a></p>
<p>安装后执行:<code>npm run dev </code>发现运行起来的页面没有启动起来，原因是还是这个eslint引起的。</p>
<p>出错信息为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="These relative modules were not found：
*/build/dev-client in multi ./build/dev-client ./src/main.js，
*./src/main.js in multi ./build/dev-client ./src/main.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>These relative modules were not found：
*<span class="hljs-regexp">/build/</span>dev-client <span class="hljs-keyword">in</span> multi .<span class="hljs-regexp">/build/</span>dev-client .<span class="hljs-regexp">/src/m</span>ain.js，
*.<span class="hljs-regexp">/src/m</span>ain.js <span class="hljs-keyword">in</span> multi .<span class="hljs-regexp">/build/</span>dev-client .<span class="hljs-regexp">/src/m</span>ain.js</code></pre>
<p>原因如下：<br>webpack.base.conf.js里面，脚手架本来就有 js的编译模块，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> {
        <span class="hljs-attribute">test</span>: /\.js$/,
        loader: <span class="hljs-string">'babel-loader'</span>,
        include: [<span class="hljs-built_in">resolve</span>(<span class="hljs-string">'src'</span>), <span class="hljs-built_in">resolve</span>(<span class="hljs-string">'test'</span>)]
      }</code></pre>
<p>我们需要注释掉这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//    {
//      test: /\.(js|vue)$/,
//      loader: 'eslint-loader',
//      enforce: 'pre',
//      include: [resolve('src'), resolve('test')],
//      options: {
//        formatter: require('eslint-friendly-formatter')
//      }
//    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//</span>    {
<span class="hljs-regexp">//</span>      test: <span class="hljs-regexp">/\.(js|vue)$/</span>,
<span class="hljs-regexp">//</span>      loader: <span class="hljs-string">'eslint-loader'</span>,
<span class="hljs-regexp">//</span>      enforce: <span class="hljs-string">'pre'</span>,
<span class="hljs-regexp">//</span>      include: [resolve(<span class="hljs-string">'src'</span>), resolve(<span class="hljs-string">'test'</span>)],
<span class="hljs-regexp">//</span>      options: {
<span class="hljs-regexp">//</span>        formatter: require(<span class="hljs-string">'eslint-friendly-formatter'</span>)
<span class="hljs-regexp">//</span>      }
<span class="hljs-regexp">//</span>    },</code></pre>
<p>原因就是导致重复编译，所以应该就有两个main.js文件。所以不要重复出现匹配规则就可以。<br>然后运行<code>npm run dev</code>可以了。<br>相似问题：<a href="https://segmentfault.com/q/1010000008831748">vue-cli安装完成之后，命令行npm run dev没有问题，但webstorm报错</a></p>
<h2 id="articleHeader22">15.VUE利用webpack 给生产环境和发布环境配置不同的接口地址</h2>
<h3 id="articleHeader23">第一步，分别设置不同的接口地址</h3>
<p>首先，我们分别找到下面的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/config/dev.env.js
/config/prod.env.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>/config/dev<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span>
/config/prod<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.js</span></code></pre>
<p>其实，这两个文件就是针对生产环境和发布环境设置不同参数的文件。我们打开<code>dev.en.js</code>文件。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '&quot;development&quot;'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> prodEnv = require(<span class="hljs-string">'./prod.env'</span>)

module<span class="hljs-selector-class">.exports</span> = merge(prodEnv, {
  NODE_ENV: <span class="hljs-string">'"development"'</span>
})</code></pre>
<p>我们在NODE_ENV下面增加一项，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '&quot;development&quot;',
  API_ROOT: '&quot;//192.168.1.8/api&quot;'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">var</span> merge = require(<span class="hljs-string">'webpack-merge'</span>)
<span class="hljs-selector-tag">var</span> prodEnv = require(<span class="hljs-string">'./prod.env'</span>)

module<span class="hljs-selector-class">.exports</span> = merge(prodEnv, {
  NODE_ENV: <span class="hljs-string">'"development"'</span>,
  API_ROOT: <span class="hljs-string">'"//192.168.1.8/api"'</span>
})</code></pre>
<p>prod.env.js文件修改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  NODE_ENV: '&quot;production&quot;',
  API_ROOT: '&quot;//www.baidu.com/api&quot;'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  NODE_ENV: <span class="hljs-string">'"production"'</span>,
  API_ROOT: <span class="hljs-string">'"//www.baidu.com/api"'</span>
}</code></pre>
<h3 id="articleHeader24">第二步，在代码中调用设置好的参数</h3>
<p>以我们之前的演示代码为例。你自己的项目请根据你自己的情况调整。以下文件和代码仅供参考。<br>我们打开<code>src/config/api.js</code>文件，将原来开头的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置API接口地址
var root = 'https://cnodejs.org/api/v1'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// 配置API接口地址</span>
<span class="hljs-keyword">var</span> root = <span class="hljs-symbol">'https</span>:<span class="hljs-comment">//cnodejs.org/api/v1'</span></code></pre>
<p>修改为:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 配置API接口地址
var root = process.env.API_ROOT" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 配置API接口地址</span>
<span class="hljs-selector-tag">var</span> root = process<span class="hljs-selector-class">.env</span><span class="hljs-selector-class">.API_ROOT</span></code></pre>
<p>然后就完成了我们的配置工作。最后，重启项目，就能使新配置的接口地址生效了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h3 id="articleHeader25">在main.js区分生产与开发环境</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="process.env.NODE_ENV == 'production';  //生产环境
process.env.NODE_ENV == 'development'; //开发环境" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">process</span>.env.NODE_ENV == <span class="hljs-string">'production'</span>;  <span class="hljs-comment">//生产环境</span>
<span class="hljs-built_in">process</span>.env.NODE_ENV == <span class="hljs-string">'development'</span>; <span class="hljs-comment">//开发环境</span></code></pre>
<p>参考地址：<a href="http://blog.csdn.net/fungleo/article/details/54574049" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/fungleo/article/details/54574049</a></p>
<h2 id="articleHeader26">16.vue单页应用添加百度统计</h2>
<h3 id="articleHeader27">前言</h3>
<p>申请百度统计后，会得到一段JS代码，需要插入到每个网页中去，在Vue.js项目首先想到的可能就是，把统计代码插入到index.html入口文件中，这样就全局插入，每个页面就都有了;这样做就涉及到一个问题，Vue.js项目是单页应用，每次用户浏览网站时，访问内页时页面是不会刷新的，也就意味着不会触发百度统计代码；所以最终在百度统计后台看到的效果就是只统计到了网页入口的流量，却无法统计到内页的访问流量。</p>
<h3 id="articleHeader28">解决方法</h3>
<p>在<code>main.js</code>文件中调用<code>vue-router</code>的<code>afterEach</code>方法,将统计代码加入到这个方法里面，这样每次<code>router</code>发生改变的时候都会执行一下统计代码，这样就达到了目的,代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.afterEach( ( to, from, next ) => {
        setTimeout(()=>{
                var _hmt = _hmt || [];
                (function() {
                    //每次执行前，先移除上次插入的代码
                    document.getElementById('baidu_tj') &amp;&amp; document.getElementById('baidu_tj').remove();
                    var hm = document.createElement(&quot;script&quot;);
                    hm.src = &quot;https://hm.baidu.com/hm.js?xxxx&quot;;
                    hm.id = &quot;baidu_tj&quot;
                    var s = document.getElementsByTagName(&quot;script&quot;)[0];
                    s.parentNode.insertBefore(hm, s);
                })();
        },0);
    } );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>router.afterEach( <span class="hljs-function">(<span class="hljs-params"> to, <span class="hljs-keyword">from</span>, next </span>) =&gt;</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
                <span class="hljs-keyword">var</span> _hmt = _hmt || [];
                (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-comment">//每次执行前，先移除上次插入的代码</span>
                    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'baidu_tj'</span>) &amp;&amp; <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'baidu_tj'</span>).remove();
                    <span class="hljs-keyword">var</span> hm = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"script"</span>);
                    hm.src = <span class="hljs-string">"https://hm.baidu.com/hm.js?xxxx"</span>;
                    hm.id = <span class="hljs-string">"baidu_tj"</span>
                    <span class="hljs-keyword">var</span> s = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">"script"</span>)[<span class="hljs-number">0</span>];
                    s.parentNode.insertBefore(hm, s);
                })();
        },<span class="hljs-number">0</span>);
    } );</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[总结]vue开发常见知识点及问题资料整理（持续更新）

## 原文链接
[https://segmentfault.com/a/1190000011995816](https://segmentfault.com/a/1190000011995816)

