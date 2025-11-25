---
title: 'vue前端(element-ui)，express后端实现上传图片到七牛云' 
date: 2018-12-07 2:30:10
hidden: true
slug: mpdrzvlz5i
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>看了几天七牛云nodejs的SDK文档，现在尝试写一个上传文件到七牛云的demo，不足之处请各位大佬指正！</blockquote>
<h2 id="articleHeader0">实现思路</h2>
<blockquote>模拟前后端分离，后端向前端发送七牛云的上传凭证token，前端获得凭证后将图片上传到七牛云，并获得返回的图片url地址</blockquote>
<h2 id="articleHeader1">步骤</h2>
<h3 id="articleHeader2">1.需要些什么？</h3>
<p>既然要上传文件到七牛云，那我们至少需要一个七牛云空间啊</p>
<blockquote>注册一个七牛云账号，然后绑定支付宝认证一下就OK了</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV7tii?w=880&amp;h=424" src="https://static.alili.tech/img/bV7tii?w=880&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>完成之后先创建一个对象储存空间，名字随意</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV7tjk?w=566&amp;h=283" src="https://static.alili.tech/img/bV7tjk?w=566&amp;h=283" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>重点来了，这里有几项是要用到的<br>1、 空间名称bucket, 我这里就是 lytton<br>2、 SK 和 AK ,在控制面板的密匙管理<br>3、 储存空间的外链域名，在储存空间可以找到</blockquote>
<p>AK 和 SK</p>
<p><span class="img-wrap"><img data-src="/img/bV7tlh?w=677&amp;h=429" src="https://static.alili.tech/img/bV7tlh?w=677&amp;h=429" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>外链域名</p>
<p><span class="img-wrap"><img data-src="/img/bV7tmb?w=682&amp;h=369" src="https://static.alili.tech/img/bV7tmb?w=682&amp;h=369" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">2、写后端代码</h3>
<blockquote>既然选择使用vue，那就直接用vue-cli创建项目了</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack qiniuupload" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">vue init webpack qiniuupload</span></code></pre>
<p>├── build<br>├── config<br>├── index.html<br>├── node_modules<br>├── package.json<br>├── README.md<br>├── src<br>└── static</p>
<blockquote>因为要用到后端，所以在src 目录里面创建一个server来当后端，一个client来当前端用</blockquote>
<p>lytton@lytton-ubuntu:~/桌面/demo/qiniuupload/src$ tree -L 1<br>.<br>├── App.vue<br>├── client<br>├── main.js<br>├── router<br>└── server</p>
<p>然后在server目录下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init
npm i express qiniu --save

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> init
<span class="hljs-built_in">npm</span> i express qiniu --save

</code></pre>
<blockquote>当然这个server的作用很简单，就只做一件事，当前端请求要上传图片到七牛云的时候，像前端发送一个上传凭证的token</blockquote>
<p>创建后端程序app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入包
const express = require('express')
const bodyparse = require('body-parser')
// 创建服务
const app = express()
// 解析数据
app.use(bodyparse.json())
// 引入七牛云配置
const qnconfig = require('./config.js')
// 处理请求
app.get('/token', (req, res, next) => {
  // console.log(qnconfig.uploadToken)
  res.status(200).send(qnconfig.uploadToken)
})
// 监听3000端口
app.listen(3000, () => {
  console.log('this server are running on localhost:3000!')
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 引入包</span>
<span class="hljs-keyword">const</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>)
<span class="hljs-keyword">const</span> bodyparse = <span class="hljs-built_in">require</span>(<span class="hljs-string">'body-parser'</span>)
<span class="hljs-comment">// 创建服务</span>
<span class="hljs-keyword">const</span> app = express()
<span class="hljs-comment">// 解析数据</span>
app.use(bodyparse.json())
<span class="hljs-comment">// 引入七牛云配置</span>
<span class="hljs-keyword">const</span> qnconfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./config.js'</span>)
<span class="hljs-comment">// 处理请求</span>
app.get(<span class="hljs-string">'/token'</span>, <span class="hljs-function">(<span class="hljs-params">req, res, next</span>) =&gt;</span> {
  <span class="hljs-comment">// console.log(qnconfig.uploadToken)</span>
  res.status(<span class="hljs-number">200</span>).send(qnconfig.uploadToken)
})
<span class="hljs-comment">// 监听3000端口</span>
app.listen(<span class="hljs-number">3000</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this server are running on localhost:3000!'</span>)
})
</code></pre>
<p>创建config.js以用来生成上传凭证</p>
<blockquote>这里就需要用到上面的bucket ,AK,SK</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'YOXpF0XvM_3yVDsz5C-hWwrFE5rtDAUQC3XjBQEG'
const secretKey = 'CmrhUV2xHf1d8nPCsws9wwm7jKypCPA0lRVm-7lS'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'lytton',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">/*
七牛云配置
*/</span>
<span class="hljs-keyword">const</span> qiniu = require(<span class="hljs-string">'qiniu'</span>)

<span class="hljs-comment">// 创建上传凭证</span>
<span class="hljs-keyword">const</span> accessKey = <span class="hljs-string">'YOXpF0XvM_3yVDsz5C-hWwrFE5rtDAUQC3XjBQEG'</span>
<span class="hljs-keyword">const</span> secretKey = <span class="hljs-string">'CmrhUV2xHf1d8nPCsws9wwm7jKypCPA0lRVm-7lS'</span>
<span class="hljs-keyword">const</span> mac = <span class="hljs-keyword">new</span> qiniu.auth.digest.Mac(accessKey, secretKey)
<span class="hljs-keyword">const</span> options = {
  scope: <span class="hljs-string">'lytton'</span>,
  expires: <span class="hljs-number">7200</span>
}
<span class="hljs-keyword">const</span> putPolicy = <span class="hljs-keyword">new</span> qiniu.rs.PutPolicy(options)
<span class="hljs-keyword">const</span> uploadToken = putPolicy.uploadToken(mac)

<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  uploadToken
}
</code></pre>
<p>server的目录结构</p>
<p>lytton@lytton-ubuntu:~/桌面/demo/qiniuupload/src/server$ tree -L 1<br>.<br>├── app.js<br>├── config.js<br>├── node_modules<br>└── package.json</p>
<p>然后控制台 nodemon app.js，当然如果没装nodemon的话，就 node app.js 一样的</p>
<p><span class="img-wrap"><img data-src="/img/bV7ty8?w=654&amp;h=112" src="https://static.alili.tech/img/bV7ty8?w=654&amp;h=112" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>打开浏览器 localhost:3000</p>
<p><span class="img-wrap"><img data-src="/img/bV7tz8?w=418&amp;h=139" src="https://static.alili.tech/img/bV7tz8?w=418&amp;h=139" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后服务端就不用管了</p>
<h3 id="articleHeader4">3、写前端代码</h3>
<p>首先在根目录安装element-ui axios</p>
<p>然后在main.js里面引入</p>
<p><span class="img-wrap"><img data-src="/img/bV7tCI?w=1103&amp;h=551" src="https://static.alili.tech/img/bV7tCI?w=1103&amp;h=551" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后在client文件夹下面创建一个upload.vue<br>并在router里面引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import UpLoad from '@/client/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: UpLoad
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> UpLoad <span class="hljs-keyword">from</span> <span class="hljs-string">'@/client/upload'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      component: UpLoad
    }
  ]
})</code></pre>
<p>到这里整体结构也就完成了，src 的目录结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lytton@lytton-ubuntu:~/桌面/demo/qiniuupload/src$ tree -L 2
.
├── App.vue
├── client
│&nbsp;&nbsp; └── upload.vue
├── main.js
├── router
│&nbsp;&nbsp; └── index.js
└── server
    ├── app.js
    ├── config.js
    ├── node_modules
    └── package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>lytton@lytton-ubuntu:~/桌面/demo/qiniuupload/src$ tree -L <span class="hljs-number">2</span>
.
├── App<span class="hljs-selector-class">.vue</span>
├── client
│&nbsp;&nbsp; └── upload<span class="hljs-selector-class">.vue</span>
├── main<span class="hljs-selector-class">.js</span>
├── router
│&nbsp;&nbsp; └── index<span class="hljs-selector-class">.js</span>
└── server
    ├── app<span class="hljs-selector-class">.js</span>
    ├── config<span class="hljs-selector-class">.js</span>
    ├── node_modules
    └── package<span class="hljs-selector-class">.json</span>
</code></pre>
<h3 id="articleHeader5">4、解决跨域问题</h3>
<blockquote>这里前端向后端访问属于跨域访问，前端是跑在8080端口的，后端是跑在3000端口的，所以首先要解决一下跨域问题</blockquote>
<p>打开config文件夹下的index.js<br>添加跨域代理访问</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/up': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/up': '/'
        }
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  dev: {

    <span class="hljs-comment">// Paths</span>
    assetsSubDirectory: <span class="hljs-string">'static'</span>,
    assetsPublicPath: <span class="hljs-string">'/'</span>,
    proxyTable: {
      <span class="hljs-string">'/up'</span>: {
        target: <span class="hljs-string">'http://localhost:3000'</span>,
        changeOrigin: <span class="hljs-keyword">true</span>,
        pathRewrite: {
          <span class="hljs-string">'^/up'</span>: <span class="hljs-string">'/'</span>
        }
      }
    },</code></pre>
<h3 id="articleHeader6">5、 写upload.vue</h3>
<blockquote>代码比较简单，基本从element-ui 官网拷贝过来就可以用了</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <!-- upload -->
  <div class=&quot;upload&quot;>
    <el-upload
      class=&quot;avatar-uploader&quot;
      :action= domain
      :http-request = upqiniu
      :show-file-list=&quot;false&quot;
      :before-upload=&quot;beforeUpload&quot;>
      <img v-if=&quot;imageUrl&quot; :src=&quot;imageUrl&quot; class=&quot;avatar&quot;>
      <i v-else class=&quot;el-icon-plus avatar-uploader-icon&quot;></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imageUrl: '',
      token: {},
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: 'https://upload-z2.qiniup.com',
      // 这是七牛云空间的外链默认域名
      qiniuaddr: 'p3z6q1uw1.bkt.clouddn.com'
    }
  },
  methods: {
    // 上传文件到七牛云
    upqiniu (req) {
      console.log(req)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'lytton' + new Date() + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      this.axios.get('/up/token').then(res => {
        console.log(res)
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.axios.post(this.domain, formdata, config).then(res => {
          this.imageUrl = 'http://' + this.qiniuaddr + '/' + res.data.key
          // console.log(this.imageUrl)
        })
      })
    },
    // 验证文件合法性
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG &amp;&amp; isLt2M
    }
  }
}
</script>
<style scoped>
.upload {
  width: 600px;
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 5px dashed #ca1717 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- upload --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"upload"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-upload</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar-uploader"</span>
      <span class="hljs-attr">:action</span>= <span class="hljs-string">domain</span>
      <span class="hljs-attr">:http-request</span> = <span class="hljs-string">upqiniu</span>
      <span class="hljs-attr">:show-file-list</span>=<span class="hljs-string">"false"</span>
      <span class="hljs-attr">:before-upload</span>=<span class="hljs-string">"beforeUpload"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"imageUrl"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"imageUrl"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"avatar"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">v-else</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"el-icon-plus avatar-uploader-icon"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-upload</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">imageUrl</span>: <span class="hljs-string">''</span>,
      <span class="hljs-attr">token</span>: {},
      <span class="hljs-comment">// 七牛云的上传地址，根据自己所在地区选择，我这里是华南区</span>
      domain: <span class="hljs-string">'https://upload-z2.qiniup.com'</span>,
      <span class="hljs-comment">// 这是七牛云空间的外链默认域名</span>
      qiniuaddr: <span class="hljs-string">'p3z6q1uw1.bkt.clouddn.com'</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">// 上传文件到七牛云</span>
    upqiniu (req) {
      <span class="hljs-built_in">console</span>.log(req)
      <span class="hljs-keyword">const</span> config = {
        <span class="hljs-attr">headers</span>: {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'multipart/form-data'</span>}
      }
      <span class="hljs-keyword">let</span> filetype = <span class="hljs-string">''</span>
      <span class="hljs-keyword">if</span> (req.file.type === <span class="hljs-string">'image/png'</span>) {
        filetype = <span class="hljs-string">'png'</span>
      } <span class="hljs-keyword">else</span> {
        filetype = <span class="hljs-string">'jpg'</span>
      }
      <span class="hljs-comment">// 重命名要上传的文件</span>
      <span class="hljs-keyword">const</span> keyname = <span class="hljs-string">'lytton'</span> + <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>() + <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">100</span>) + <span class="hljs-string">'.'</span> + filetype
      <span class="hljs-comment">// 从后端获取上传凭证token</span>
      <span class="hljs-keyword">this</span>.axios.get(<span class="hljs-string">'/up/token'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(res)
        <span class="hljs-keyword">const</span> formdata = <span class="hljs-keyword">new</span> FormData()
        formdata.append(<span class="hljs-string">'file'</span>, req.file)
        formdata.append(<span class="hljs-string">'token'</span>, res.data)
        formdata.append(<span class="hljs-string">'key'</span>, keyname)
        <span class="hljs-comment">// 获取到凭证之后再将文件上传到七牛云空间</span>
        <span class="hljs-keyword">this</span>.axios.post(<span class="hljs-keyword">this</span>.domain, formdata, config).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.imageUrl = <span class="hljs-string">'http://'</span> + <span class="hljs-keyword">this</span>.qiniuaddr + <span class="hljs-string">'/'</span> + res.data.key
          <span class="hljs-comment">// console.log(this.imageUrl)</span>
        })
      })
    },
    <span class="hljs-comment">// 验证文件合法性</span>
    beforeUpload (file) {
      <span class="hljs-keyword">const</span> isJPG = file.type === <span class="hljs-string">'image/jpeg'</span> || file.type === <span class="hljs-string">'image/png'</span>
      <span class="hljs-keyword">const</span> isLt2M = file.size / <span class="hljs-number">1024</span> / <span class="hljs-number">1024</span> &lt; <span class="hljs-number">2</span>
      <span class="hljs-keyword">if</span> (!isJPG) {
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'上传头像图片只能是 JPG 格式!'</span>)
      }
      <span class="hljs-keyword">if</span> (!isLt2M) {
        <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">'上传头像图片大小不能超过 2MB!'</span>)
      }
      <span class="hljs-keyword">return</span> isJPG &amp;&amp; isLt2M
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.upload</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}
<span class="hljs-selector-class">.avatar-uploader</span> <span class="hljs-selector-class">.el-upload</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> dashed <span class="hljs-number">#ca1717</span> <span class="hljs-meta">!important</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.avatar-uploader</span> <span class="hljs-selector-class">.el-upload</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">border-color</span>: <span class="hljs-number">#409EFF</span>;
}
<span class="hljs-selector-class">.avatar-uploader-icon</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#8c939d</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">178px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">178px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">178px</span>;
  <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.avatar</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">178px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">178px</span>;
  <span class="hljs-attribute">display</span>: block;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<h3 id="articleHeader7">测试</h3>
<p>首先打开localhost:8080</p>
<p><span class="img-wrap"><img data-src="/img/bV7tMT?w=1277&amp;h=376" src="https://static.alili.tech/img/bV7tMT?w=1277&amp;h=376" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>然后选择上传图片</p>
<p><span class="img-wrap"><img data-src="/img/bV7tNM?w=1273&amp;h=412" src="https://static.alili.tech/img/bV7tNM?w=1273&amp;h=412" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>成功返回图片了</p>
<p>看一下七牛云空间</p>
<p><span class="img-wrap"><img data-src="/img/bV7tOO?w=1200&amp;h=535" src="https://static.alili.tech/img/bV7tOO?w=1200&amp;h=535" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>多了一张刚刚上传的且已经重命名的图片</p>
<h2 id="articleHeader8">总结</h2>
<blockquote>只做了文件的上传操作，如果是要修改，下载的话，需要写更多了，凭证也不能写得这么简单，学习还是要多看文档和demo</blockquote>
<h2 id="articleHeader9">github地址：</h2>
<p>github: <a href="https://github.com/lyttonlee/qiniu-upload-demo" rel="nofollow noreferrer" target="_blank">https://github.com/lyttonlee/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue前端(element-ui)，express后端实现上传图片到七牛云

## 原文链接
[https://segmentfault.com/a/1190000014137083](https://segmentfault.com/a/1190000014137083)

