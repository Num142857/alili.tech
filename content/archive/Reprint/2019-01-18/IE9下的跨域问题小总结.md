---
title: 'IE9下的跨域问题小总结' 
date: 2019-01-18 2:30:35
hidden: true
slug: 6r0um7h2nvu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>由于浏览器同源策略，凡是发送请求url的协议、域名、端口三者之间任意一与当前页面地址不同即为跨域</p></blockquote>
<p>最近项目要兼容IE9，找了一些资料，实践了一下，现在总结一下，避免以后踩坑。</p>
<h2 id="articleHeader0">普通请求的跨域</h2>
<h3 id="articleHeader1">简单粗暴的解决方案</h3>
<p>第一次碰到这个问题，所以就是上网找找有没有什么好的解决方案。<a href="http://jingyan.baidu.com/article/c33e3f48857933ea15cbb50a.html" rel="nofollow noreferrer" target="_blank">最初找到的方案</a>是这样的，直接在IE中设置设置受信任的站点，然后允许其可以进行跨域访问，最后在<code>jQuery</code>中设置开启跨域请求。oh，No!这么粗暴，好吧，这也是一个不是办法的办法，如果做的是一个小项目，用户不多，那直接写在用户手册里，让他们自己去配吧。但是，这显然不是一个好的解决方案啊，那只能继续找了。</p>
<h3 id="articleHeader2">XDomainRequest（XDR）解决方案</h3>
<p>ok，微软在<code>IE8</code>和<code>IE9</code>下给我们提供了<code>XDomainRequest</code>来进行解决跨域问题，官方的文档可以在 <a href="https://msdn.microsoft.com/zh-cn/library/dd573303" rel="nofollow noreferrer" target="_blank">这里看到</a>。当然<code>Github</code>上也有开源的<code>jQuery</code>插件，<a href="https://github.com/gfdev/javascript-jquery-transport-xdr" rel="nofollow noreferrer" target="_blank">可以在这里找到</a>。</p>
<p><strong><code>XDR</code>的限制：</strong></p>
<ol>
<li><p><strong><code>XDR</code>仅支持<code>GET</code>与<code>POST</code>这两种请求方式</strong>，虽然可以使用上面提交的插件来解决前端部分只要进行简单修改代码就可以提交<code>PUT</code>/<code>HEAD</code>/<code>DELETE</code>的请求的问题，但是其请求的发生出去依旧还是将<code>PUT</code>/<code>HEAD</code>/<code>DELETE</code>转化为<code>POST</code>，将<code>HEAD </code>转化为<code>GET</code>请求。当是<code>POST</code>请求的时候，请求方案会以<code>__method=原请求</code>的方式结构加入到请求体的<code>body</code>中。当是<code>HEAD </code>请求的时候，请求方案会以<code>__method=原请求</code>的方式结构加入请求url的查询参数中。现在大部分API开发都是按照<code>RESTful</code>规范进行设计的，如果是自己的服务端还好，可以叫服务端的同学添加一个拦截器做一个拦截判断，然后执行对应的方法（ps：我想过去应该是这个样子，不知道服务端的同学会不会磨刀子）。但是如果你调用是网上的API的接口的话，那就爱莫能助了。</p></li>
<li><p><strong><code>XDR不支持自定义的请求头</code></strong>，因此如果你的服务端是用过<code>header</code>中的自定义参数进行做身份验证的话，那也行不通了。</p></li>
<li><p><strong>请求头的<code>Content-Type</code>只允许设置为<code>text/plain</code></strong></p></li>
<li><p><strong><code>XDR</code>不允许跨协议的请求</strong>，如果你的网页是在<code>HTTP</code>协议下，那么你只能请求<code>HTTP</code>协议下的接口，不能访问<code>HTTPS </code>下的接口。</p></li>
<li><p><strong><code>XDR</code>只接受<code>HTTP/HTTPS</code> 的请求</strong></p></li>
<li><p><strong>发起请求的时候，不会携带<code>authentication</code> 或<code> cookies</code></strong></p></li>
</ol>
<h3 id="articleHeader3">JSONP</h3>
<p><strong><code>JSONP</code>的本质是动态的加载<code>&lt;script&gt;</code> 标签，因此其只支持<code>GET</code>请求而不支持其他类型的<code>HTTP</code>请求。</strong></p>
<p><code>JSONP</code> 的执行过程大致如下：</p>
<ol>
<li>
<p>客户端设置一个全局的<code>function</code>，然后使用<code>callback=function</code> 的方法，将回调的方法传递给服务端。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 定义全局函数
function showData (data) {
  console.log(data)
}
var url = &quot;http://test.com/jsonp/query?id=1&amp;callback=showData&quot; // 这个就是script标签中的url" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 定义全局函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">showData</span> (<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(data)
}
<span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://test.com/jsonp/query?id=1&amp;callback=showData"</span> <span class="hljs-comment">// 这个就是script标签中的url</span></code></pre>
</li>
<li><p>服务端在接收到请求的时候，生成一个动态的<code>js</code>脚本，在该脚本中，调用<code>callback</code>参数传递进来的<code>function</code>，将回来返回的<code>json</code> 数据已参数的形式去传递给该<code>function</code>，这样，客户端在加载这个<code>js</code>的时候，就会自动去执行了。</p></li>
</ol>
<h3 id="articleHeader4">代理</h3>
<p>其实，跨域的根本问题就在于，你调用的服务端地址<code>web地址</code>不在同一个域下，那么，我们最容易想到的一个解决方案就是：那我把他们放在一个域下面不就可以了么。因此我们可以在<code>web</code>工程下 放置一个代理服务器，在<code>IE10</code>以下的浏览器中，我们的网络请求统一走这一个代理接口，由服务器带我们去转发这个<code>HTTP</code>请求，然后再将结果返回给我们。</p>
<p>事实上我们项目中也是采用的这个方案，我们定义了一个接口:</p>
<ul>
<li><p>URL: v0.1/dispatcher</p></li>
<li><p>方法: POST</p></li>
<li><p>请求内容:</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;request_url&quot;:&quot;http://test.com&quot;, //必填，请求url
  &quot;request_method&quot;:&quot;POST&quot;, //必填，请求方法：GET/PUT/PATCH/POST/DELETE
  &quot;request_headers&quot;:{
    &quot;Content-Type&quot;:[&quot;application/json&quot;]
  }, //选填，请求头
  &quot;request_data&quot;:{
    &quot;data&quot;:{    
          //请求body
    }
  }
} //选填，请求body" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"request_url"</span>:<span class="hljs-string">"http://test.com"</span>, <span class="hljs-comment">//必填，请求url</span>
  <span class="hljs-string">"request_method"</span>:<span class="hljs-string">"POST"</span>, <span class="hljs-comment">//必填，请求方法：GET/PUT/PATCH/POST/DELETE</span>
  <span class="hljs-string">"request_headers"</span>:{
    <span class="hljs-string">"Content-Type"</span>:[<span class="hljs-string">"application/json"</span>]
  }, <span class="hljs-comment">//选填，请求头</span>
  <span class="hljs-string">"request_data"</span>:{
    <span class="hljs-string">"data"</span>:{    
          <span class="hljs-comment">//请求body</span>
    }
  }
} <span class="hljs-comment">//选填，请求body</span></code></pre>
<p>服务端通过客户端传来的这些参数去构造一个<code>HttpClient</code> ,发起请求。</p>
<h2 id="articleHeader5">文件上传的问题</h2>
<p>既然通过上面的代理接口解决了，<code>IE10</code> 一下的跨域请求问题，本想着应该没什么问题了，试了试项目中的文件上传，oh,no!不能运行，看了看我们的文件上传，是通过自己<code>new FormData()</code>的方式去向服务器<code>POST</code>请求的。然后翻找了一下<a href="https://developer.mozilla.org/en-US/docs/Web/API" rel="nofollow noreferrer" target="_blank">webApi</a>, 发现从<code>IE10</code> 开始兼容的，这就......，并且<code>XMLHttpRequest</code>的<code>send(formData)</code>这个方法也是从<code>IE10</code>开始支持的。那没办法了只能寻找其他的办法了。</p>
<h3 id="articleHeader6">隐式表单上传</h3>
<p>找到老司机，请教了一下，早期IE都是用使用隐式的<code>iframe</code>中包含一个<code>form</code>表单，然后直接去提交<code>form</code>表单。然后服务完全返回的数据在<code>iframe</code>中，通过<code>js</code>代码去里面获取iframe中的数据，作为返回值。</p>
<p>然后从老司机那边得到一份插件<a href="http://pan.baidu.com/s/1o8HeP42" rel="nofollow noreferrer" target="_blank">ajaxfileupload</a>,还有一个就是自己在<code>Github</code>上找的一个<a href="https://github.com/blueimp/jQuery-File-Upload" rel="nofollow noreferrer" target="_blank">jQuery-File-Upload</a>,现在就来讲讲这两个插件</p>
<h4>ajaxfileupload</h4>
<p><strong>适用于服务器返回的数据是文本格式</strong></p>
<p>这份代码也很简单就200多行，主要就思想就是根据上面说的，使用隐式的<code>iframe</code>嵌套<code>form</code>表单来完成上传操作。但是呢？这个插件只适合在服务器返回数据是文本数据的时候，如果服务器返回的是<code>json</code> 的数据，<code>IE10</code>一下的浏览器就会自动去执行下载操作，<code>js</code>代码在执行到下载的时候就中断了，并不会继续往下执行了。所以也不是很适用。如果服务器支持返回数据格式是文本格式的话，这个组件还是挺好用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基本用法如下
<!-- 隐藏file标签 -->  
<input id=&quot;fileUpload&quot; style=&quot;display: none&quot; type=&quot;file&quot; name=&quot;file&quot;>
 //选择文件之后执行上传  
    $('#fileUpload').on('change', function() {  
        $.ajaxFileUpload({  
            url:'http://test.com',  
            secureuri:false,  
            fileElementId:'fileToUpload',//file标签的id  
            dataType: 'json',//返回数据的类型  
            data:{name:'logan'},//一同上传的数据  
            success: function (data, status) {  
               console.log(data)
            },  
            error: function (data, status, e) {  
                alert(e);  
            }  
        });  
    });  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 基本用法如下</span>
&lt;!-- 隐藏file标签 --&gt;  
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"fileUpload"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"file"</span>&gt;</span>
 //选择文件之后执行上传  
    $('#fileUpload').on('change', function() {  
        $.ajaxFileUpload({  
            url:'http://test.com',  
            secureuri:false,  
            fileElementId:'fileToUpload',//file标签的id  
            dataType: 'json',//返回数据的类型  
            data:{name:'logan'},//一同上传的数据  
            success: function (data, status) {  
               console.log(data)
            },  
            error: function (data, status, e) {  
                alert(e);  
            }  
        });  
    });  </span></code></pre>
<h4>jQuery-File-Upload</h4>
<p><strong>适用于服务器返回的数据是JSON格式切支持重定向</strong></p>
<p>这个插件呢，对比<code>ajaxfileupload</code>他考虑到了这种返回<code>json</code>的情况，但是它的使用需要服务端进行支持，其主要思想还是使用了隐式的表单上传文件，但是它是通过服务其的重定向来接收数据的，服务器接收到了客户端的请求之后，将返回的数据通过<code>URLEncode</code>之后，拼接在前端<code>web</code>页面的后面,然后在页面中解析数据，写到<code>body</code>中，用<code>jQuery</code>去获取这些数据。</p>
<p>具体用法如下：</p>
<p>现在服务器构造一个接受返回数据的页面<code>result.html</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>result</title>
</head>
<body>
<script>
  var href = window.location.href
  var search = href.slice(href.indexOf('?') + 1)
  document.body.innerText=document.body.textContent=decodeURIComponent(search)
</script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>result<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> href = <span class="hljs-built_in">window</span>.location.href
  <span class="hljs-keyword">var</span> search = href.slice(href.indexOf(<span class="hljs-string">'?'</span>) + <span class="hljs-number">1</span>)
  <span class="hljs-built_in">document</span>.body.innerText=<span class="hljs-built_in">document</span>.body.textContent=<span class="hljs-built_in">decodeURIComponent</span>(search)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>然后自己定义一个上传的组件，我这里是使用<code>Vue</code>来包装成一个组件的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;c-uploader&quot;
       v-tap
       @click=&quot;onTap&quot;>
    <input
      type=&quot;file&quot;
      ref=&quot;file&quot;
      id=&quot;fileUploadNormal&quot;
      name=&quot;file&quot;
      style=&quot;display: none&quot;
      data-sequential-uploads=&quot;true&quot;
      :accept=&quot;accept&quot;
      multiple=&quot;false&quot;/>
    <slot></slot>
  </div>
</template>
<script>
  import { getMACContent } from '../../utils/tokens'
  import optionsUtil from '../../utils/optionsUtil'
  import tap from '../directives/tap'
  import '../libs/vendor/jquery.ui.widget'
  import '../libs/jquery.iframe-transport'
  import '../libs/jquery.fileupload'
  import '../libs/cors/jquery.xdr-transport'
  import g_config from '../../config/config'
  export default{
    props: {
      url: {
        type: String,
        required: true
      },
      data: {
        type: Object,
        default: function () {
          return {}
        }
      },
      accept: {
        type: String,
        default: '*'
      },
      onSuccess: {
        type: Function,
        default: function () {
        }
      },
      onError: {
        type: Function,
        default: function () {
        }
      },
      checkFile: {
        type: Function,
        default: function () {
          return true
        }
      }
    },
    data () {
      return {
        uploadFile: null,
        headers: {
          Authorization: new getMACContent({url: this.url,method: 'POST'})._value.returnMessage
        }
      }
    },
    methods: {
      onTap (e) {
        const fileInputEl = this.$refs.file
        if (!fileInputEl) {
          return
        }
        // TODO: trigger tap or touch but not click ?
        fileInputEl.click()
        fileInputEl.value = ''
      },
      init () {
        this.uploadFile = null
      },
      startUpload () {
        const that = this
        if (this.uploadFile !== null) {
          if (this.checkFile(this.uploadFile.files[0])) {
            that.data.request_url = that.url
            that.data.name = this.uploadFile.files[0].name
            that.data.redirect = location.protocol+'//' + location.host+'/result.html?'
            that.data.authorization = that.headers.Authorization
            $('#fileUploadNormal').fileupload({
              url: g_config.dispatch_url + '/v0.1/dispatcher/upload',
              formData: that.data
            })
            that.uploadFile.submit() // 上传文件
          }
        } else {
          const response = {
            msg: '请选择需要上传的文件'
          }
          this.onError(null, response, null)
        }
      }
    },
    computed: {},
    watch: {},
    components: {
    },
    directives: {
      tap
    },
    mounted () {
      const that = this
      $('#fileUploadNormal').fileupload({
        dataType: 'json', // 设置返回数据格式
        multiple: false, // 只允许选择单文件
        iframe: true, // 使用iframe
        sequentialUploads: true,
        forceIframeTransport : true, // 强制使用iframe
        autoUpload: false, // 关闭自动上传，否则在文件变化的时候，就会自动upload
        formData: that.data, // 定义需要格外上传的数据
        replaceFileInput: false,
        add: function (e, data) {
          that.headers.Authorization = new getMACContent({url: that.url,method: 'POST'})._value.returnMessage
          that.uploadFile = data // 记录下数据
        },
        done: function (e, data) {
          const response = data.result
          const resultData = JSON.parse(response.data)
          if (response.result.toUpperCase() === 'SUCCESS') {
            that.onSuccess(resultData)
          } else {
            that.onError(null,resultData, null)
          }
        },
        fail: function (e, data) {
          that.uploadFile = null
          that.onError(null,{
            msg: '上传失败'
          }, null)
        }
      })
    }
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-uploader"</span>
       <span class="hljs-attr">v-tap</span>
       @<span class="hljs-attr">click</span>=<span class="hljs-string">"onTap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>
      <span class="hljs-attr">ref</span>=<span class="hljs-string">"file"</span>
      <span class="hljs-attr">id</span>=<span class="hljs-string">"fileUploadNormal"</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">"file"</span>
      <span class="hljs-attr">style</span>=<span class="hljs-string">"display: none"</span>
      <span class="hljs-attr">data-sequential-uploads</span>=<span class="hljs-string">"true"</span>
      <span class="hljs-attr">:accept</span>=<span class="hljs-string">"accept"</span>
      <span class="hljs-attr">multiple</span>=<span class="hljs-string">"false"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">slot</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">slot</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>
&lt;script&gt;
  <span class="hljs-keyword">import</span> { getMACContent } <span class="hljs-keyword">from</span> <span class="hljs-string">'../../utils/tokens'</span>
  <span class="hljs-keyword">import</span> optionsUtil <span class="hljs-keyword">from</span> <span class="hljs-string">'../../utils/optionsUtil'</span>
  <span class="hljs-keyword">import</span> tap <span class="hljs-keyword">from</span> <span class="hljs-string">'../directives/tap'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'../libs/vendor/jquery.ui.widget'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'../libs/jquery.iframe-transport'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'../libs/jquery.fileupload'</span>
  <span class="hljs-keyword">import</span> <span class="hljs-string">'../libs/cors/jquery.xdr-transport'</span>
  <span class="hljs-keyword">import</span> g_config <span class="hljs-keyword">from</span> <span class="hljs-string">'../../config/config'</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">url</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> {}
        }
      },
      <span class="hljs-attr">accept</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-string">'*'</span>
      },
      <span class="hljs-attr">onSuccess</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        }
      },
      <span class="hljs-attr">onError</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        }
      },
      <span class="hljs-attr">checkFile</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Function</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
      }
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">uploadFile</span>: <span class="hljs-literal">null</span>,
        <span class="hljs-attr">headers</span>: {
          <span class="hljs-attr">Authorization</span>: <span class="hljs-keyword">new</span> getMACContent({<span class="hljs-attr">url</span>: <span class="hljs-keyword">this</span>.url,<span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>})._value.returnMessage
        }
      }
    },
    <span class="hljs-attr">methods</span>: {
      onTap (e) {
        <span class="hljs-keyword">const</span> fileInputEl = <span class="hljs-keyword">this</span>.$refs.file
        <span class="hljs-keyword">if</span> (!fileInputEl) {
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> trigger tap or touch but not click ?</span>
        fileInputEl.click()
        fileInputEl.value = <span class="hljs-string">''</span>
      },
      init () {
        <span class="hljs-keyword">this</span>.uploadFile = <span class="hljs-literal">null</span>
      },
      startUpload () {
        <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.uploadFile !== <span class="hljs-literal">null</span>) {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.checkFile(<span class="hljs-keyword">this</span>.uploadFile.files[<span class="hljs-number">0</span>])) {
            that.data.request_url = that.url
            that.data.name = <span class="hljs-keyword">this</span>.uploadFile.files[<span class="hljs-number">0</span>].name
            that.data.redirect = location.protocol+<span class="hljs-string">'//'</span> + location.host+<span class="hljs-string">'/result.html?'</span>
            that.data.authorization = that.headers.Authorization
            $(<span class="hljs-string">'#fileUploadNormal'</span>).fileupload({
              <span class="hljs-attr">url</span>: g_config.dispatch_url + <span class="hljs-string">'/v0.1/dispatcher/upload'</span>,
              <span class="hljs-attr">formData</span>: that.data
            })
            that.uploadFile.submit() <span class="hljs-comment">// 上传文件</span>
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">const</span> response = {
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'请选择需要上传的文件'</span>
          }
          <span class="hljs-keyword">this</span>.onError(<span class="hljs-literal">null</span>, response, <span class="hljs-literal">null</span>)
        }
      }
    },
    <span class="hljs-attr">computed</span>: {},
    <span class="hljs-attr">watch</span>: {},
    <span class="hljs-attr">components</span>: {
    },
    <span class="hljs-attr">directives</span>: {
      tap
    },
    mounted () {
      <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>
      $(<span class="hljs-string">'#fileUploadNormal'</span>).fileupload({
        <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>, <span class="hljs-comment">// 设置返回数据格式</span>
        multiple: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 只允许选择单文件</span>
        iframe: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 使用iframe</span>
        sequentialUploads: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">forceIframeTransport</span> : <span class="hljs-literal">true</span>, <span class="hljs-comment">// 强制使用iframe</span>
        autoUpload: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 关闭自动上传，否则在文件变化的时候，就会自动upload</span>
        formData: that.data, <span class="hljs-comment">// 定义需要格外上传的数据</span>
        replaceFileInput: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">add</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, data</span>) </span>{
          that.headers.Authorization = <span class="hljs-keyword">new</span> getMACContent({<span class="hljs-attr">url</span>: that.url,<span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>})._value.returnMessage
          that.uploadFile = data <span class="hljs-comment">// 记录下数据</span>
        },
        <span class="hljs-attr">done</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, data</span>) </span>{
          <span class="hljs-keyword">const</span> response = data.result
          <span class="hljs-keyword">const</span> resultData = <span class="hljs-built_in">JSON</span>.parse(response.data)
          <span class="hljs-keyword">if</span> (response.result.toUpperCase() === <span class="hljs-string">'SUCCESS'</span>) {
            that.onSuccess(resultData)
          } <span class="hljs-keyword">else</span> {
            that.onError(<span class="hljs-literal">null</span>,resultData, <span class="hljs-literal">null</span>)
          }
        },
        <span class="hljs-attr">fail</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e, data</span>) </span>{
          that.uploadFile = <span class="hljs-literal">null</span>
          that.onError(<span class="hljs-literal">null</span>,{
            <span class="hljs-attr">msg</span>: <span class="hljs-string">'上传失败'</span>
          }, <span class="hljs-literal">null</span>)
        }
      })
    }
  }
&lt;<span class="hljs-regexp">/script&gt;
</span></code></pre>
<p>这个插件是依赖<code>jQuery</code>的，并且依赖<code>jQuery-UI </code>,还有要注意的是在<code>IE10</code>以下的版本都要引入<code>jquery.iframe-transport</code></p>
<p>与<code>jquery.xdr-transport</code></p>
<p>我代码中发送数据的方式是它在<code>add</code> 方法中返回的<code>data</code>数据，通过该对象去直接上传文件，这时上传的<code>FormData</code>的文件信息中，文件原本是什么类型就是什么类型了，这是我们所期望的。我之前查看官方的文档，还使用过另一种方式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var jqXHR = $('#fileupload').fileupload('send', {files: filesList})
    .success(function (result, textStatus, jqXHR) {/* ... */})
    .error(function (jqXHR, textStatus, errorThrown) {/* ... */})
    .complete(function (result, textStatus, jqXHR) {/* ... */});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> jqXHR = $(<span class="hljs-string">'#fileupload'</span>).fileupload(<span class="hljs-string">'send'</span>, {<span class="hljs-attr">files</span>: filesList})
    .success(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result, textStatus, jqXHR</span>) </span>{<span class="hljs-comment">/* ... */</span>})
    .error(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">jqXHR, textStatus, errorThrown</span>) </span>{<span class="hljs-comment">/* ... */</span>})
    .complete(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result, textStatus, jqXHR</span>) </span>{<span class="hljs-comment">/* ... */</span>});</code></pre>
<p>上传的时候使用的是这样的方式，发现<code>FormData</code>中上传文件的类型变为了<code>Content-Type: application/octet-stream</code>，然后服务器就解析不到数据了。所以还是推荐用它原生的<code>submit</code>方式去提交数据。</p>
<p><strong>注意</strong></p>
<p>这两个插件的本质还是使用<code>form</code>表单上传文件，因此我们无法添加自定义的<code>header</code>头，并且如果原来的服务器不支持请求重定向的话怎么办，那就没有办法使用<code>jQuery-File-Upload</code>这个插件了。所以最稳妥的方式，还是在我们本地做了一层代理，由代理去发生真正的请求。</p>
<p>下面给出主要的转发<code>FormData</code>的<code>java</code>代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public ResponseEntity dispatcherUpload(HttpServletRequest request) throws UnsupportedEncodingException {

    String requestUrl = request.getParameter(&quot;request_url&quot;);
    String redirectUrl = request.getParameter(&quot;redirect&quot;);
    String fileName = request.getParameter(&quot;name&quot;);

    if (StringUtils.isEmpty(requestUrl) || StringUtils.isEmpty(redirectUrl))
      throw new BizException(ErrorCode.INVALID_ARGUMENT);

    HttpClient httpClient = new DefaultHttpClient();
    HttpPost httpPost = new HttpPost(requestUrl);
    String auth = request.getParameter(&quot;authorization&quot;);
    if (!StringUtils.isEmpty(auth))
      httpPost.addHeader(&quot;Authorization&quot;, request.getParameter(&quot;authorization&quot;).toString());
    MultipartEntity reqEntity = new MultipartEntity();

    if (!StringUtils.isEmpty(request.getParameter(&quot;path&quot;))) {
      StringBody pathBody = new StringBody(request.getParameter(&quot;path&quot;));
      reqEntity.addPart(&quot;path&quot;, pathBody);
    }
    if (!StringUtils.isEmpty(request.getParameter(&quot;scope&quot;))) {
      StringBody scopeBody = new StringBody(request.getParameter(&quot;scope&quot;));
      reqEntity.addPart(&quot;scope&quot;, scopeBody);
    }
    if (!StringUtils.isEmpty(request.getParameter(&quot;expireDays&quot;))) {
      StringBody expireDaysBody = new StringBody(request.getParameter(&quot;expireDays&quot;));
      reqEntity.addPart(&quot;expireDays&quot;, expireDaysBody);
    }
    if (!StringUtils.isEmpty(fileName)) {
      StringBody nameBody = new StringBody(fileName);
      reqEntity.addPart(&quot;name&quot;, nameBody);
    }

    MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
    MultiValueMap<String, MultipartFile> multiValueMap = multipartHttpServletRequest.getMultiFileMap();
    //todo:现在暂时写死，不去遍历map
    if(!(multiValueMap.containsKey(CS_FILE_KEY) || multiValueMap.containsKey(UC_FILE_KEY)))
      throw new BizException(ErrorCode.INVALID_ARGUMENT);
    String fileKey = multiValueMap.containsKey(CS_FILE_KEY) ? CS_FILE_KEY : UC_FILE_KEY;
    MultipartFile multipartFile = multipartHttpServletRequest.getFile(fileKey); // 得到文件数据
    if (!multipartFile.isEmpty()) {

      CommonsMultipartFile commonsMultipartFile = (CommonsMultipartFile) multipartFile;
      DiskFileItem diskFileItem = (DiskFileItem) commonsMultipartFile.getFileItem();
      String filePath = diskFileItem.getStoreLocation().getPath().toString();

      File file = null;
      try {
        //判断目录是否已存在，如果filename不为空，将其带入创建文件（真实还原文件类型，否则是.tmp临时文件）
        if (StringUtils.isEmpty(fileName)) {
          file = new File(filePath);
        } else {
          file = new File(filePath, fileName);
        }
        if (!file.exists()) {
          file.mkdirs();
        }
        //保存文件
        multipartFile.transferTo(file);
        FileBody bin = new FileBody(file);
        reqEntity.addPart(fileKey, bin);
        httpPost.setEntity(reqEntity);

        HttpHeaders responseHeader = new HttpHeaders();
        HttpResponse httpResponse = null;
        try {
          httpResponse = httpClient.execute(httpPost);
        } catch (Exception e) {
          LOG.error(&quot;代理文件上传失败，请求地址：{}，请求内容：{}&quot;, requestUrl, null, e);
          JSONObject failedJson = new JSONObject();
          failedJson.put(&quot;result&quot;, &quot;FAILURE&quot;);
          failedJson.put(&quot;data&quot;, e.toString());
          URI uri = URI.create(redirectUrl + e.toString());
          responseHeader.setLocation(uri);
          return new ResponseEntity(responseHeader, HttpStatus.MOVED_TEMPORARILY);
        }
        LOG.info(&quot;状态码：&quot; + httpResponse.getStatusLine().getStatusCode());
        org.apache.http.HttpEntity httpEntity = httpResponse.getEntity();
        //判断请求是否成功
        String responseBody = &quot;&quot;;
        String isSuccess = &quot;SUCCESS&quot;;
        if (httpResponse.getStatusLine().getStatusCode() >= HttpStatus.OK.value() &amp;&amp; httpResponse.getStatusLine().getStatusCode() < HttpStatus.BAD_REQUEST.value()) {
          if (null != httpEntity) {
//            System.out.println(&quot;响应内容:&quot; + EntityUtils.toString(httpEntity, ContentType.getOrDefault(httpEntity).getCharset()));
            responseBody = EntityUtils.toString(httpEntity, ContentType.getOrDefault(httpEntity).getCharset());
            //处于安全考虑，关闭数据流
            EntityUtils.consume(httpEntity);
          }
        } else {
          //上传失败（非2XX）
          isSuccess = &quot;FAILURE&quot;;
        }
        JSONObject ResJson = new JSONObject();
        ResJson.put(&quot;result&quot;, isSuccess);
        ResJson.put(&quot;data&quot;, responseBody);
        URI uri = URI.create(redirectUrl + URLEncoder.encode(ResJson.toString(), &quot;UTF-8&quot;));
        responseHeader.setLocation(uri);
        return new ResponseEntity(responseHeader, HttpStatus.MOVED_TEMPORARILY);
      } catch (IOException e) {
        throw new BizException(ErrorCode.INTERNAL_SERVER_ERROR, e);
      } finally {
        if (file != null) {
          file.delete();
        }
      }
    }else {
      throw new BizException(HttpStatus.BAD_REQUEST, &quot;PORTAL-APP/INVALID_ARGUMENT&quot;, &quot;上传文件为空&quot;);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="java hljs"><code class="java"><span class="hljs-function"><span class="hljs-keyword">public</span> ResponseEntity <span class="hljs-title">dispatcherUpload</span><span class="hljs-params">(HttpServletRequest request)</span> <span class="hljs-keyword">throws</span> UnsupportedEncodingException </span>{

    String requestUrl = request.getParameter(<span class="hljs-string">"request_url"</span>);
    String redirectUrl = request.getParameter(<span class="hljs-string">"redirect"</span>);
    String fileName = request.getParameter(<span class="hljs-string">"name"</span>);

    <span class="hljs-keyword">if</span> (StringUtils.isEmpty(requestUrl) || StringUtils.isEmpty(redirectUrl))
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BizException(ErrorCode.INVALID_ARGUMENT);

    HttpClient httpClient = <span class="hljs-keyword">new</span> DefaultHttpClient();
    HttpPost httpPost = <span class="hljs-keyword">new</span> HttpPost(requestUrl);
    String auth = request.getParameter(<span class="hljs-string">"authorization"</span>);
    <span class="hljs-keyword">if</span> (!StringUtils.isEmpty(auth))
      httpPost.addHeader(<span class="hljs-string">"Authorization"</span>, request.getParameter(<span class="hljs-string">"authorization"</span>).toString());
    MultipartEntity reqEntity = <span class="hljs-keyword">new</span> MultipartEntity();

    <span class="hljs-keyword">if</span> (!StringUtils.isEmpty(request.getParameter(<span class="hljs-string">"path"</span>))) {
      StringBody pathBody = <span class="hljs-keyword">new</span> StringBody(request.getParameter(<span class="hljs-string">"path"</span>));
      reqEntity.addPart(<span class="hljs-string">"path"</span>, pathBody);
    }
    <span class="hljs-keyword">if</span> (!StringUtils.isEmpty(request.getParameter(<span class="hljs-string">"scope"</span>))) {
      StringBody scopeBody = <span class="hljs-keyword">new</span> StringBody(request.getParameter(<span class="hljs-string">"scope"</span>));
      reqEntity.addPart(<span class="hljs-string">"scope"</span>, scopeBody);
    }
    <span class="hljs-keyword">if</span> (!StringUtils.isEmpty(request.getParameter(<span class="hljs-string">"expireDays"</span>))) {
      StringBody expireDaysBody = <span class="hljs-keyword">new</span> StringBody(request.getParameter(<span class="hljs-string">"expireDays"</span>));
      reqEntity.addPart(<span class="hljs-string">"expireDays"</span>, expireDaysBody);
    }
    <span class="hljs-keyword">if</span> (!StringUtils.isEmpty(fileName)) {
      StringBody nameBody = <span class="hljs-keyword">new</span> StringBody(fileName);
      reqEntity.addPart(<span class="hljs-string">"name"</span>, nameBody);
    }

    MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
    MultiValueMap&lt;String, MultipartFile&gt; multiValueMap = multipartHttpServletRequest.getMultiFileMap();
    <span class="hljs-comment">//todo:现在暂时写死，不去遍历map</span>
    <span class="hljs-keyword">if</span>(!(multiValueMap.containsKey(CS_FILE_KEY) || multiValueMap.containsKey(UC_FILE_KEY)))
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BizException(ErrorCode.INVALID_ARGUMENT);
    String fileKey = multiValueMap.containsKey(CS_FILE_KEY) ? CS_FILE_KEY : UC_FILE_KEY;
    MultipartFile multipartFile = multipartHttpServletRequest.getFile(fileKey); <span class="hljs-comment">// 得到文件数据</span>
    <span class="hljs-keyword">if</span> (!multipartFile.isEmpty()) {

      CommonsMultipartFile commonsMultipartFile = (CommonsMultipartFile) multipartFile;
      DiskFileItem diskFileItem = (DiskFileItem) commonsMultipartFile.getFileItem();
      String filePath = diskFileItem.getStoreLocation().getPath().toString();

      File file = <span class="hljs-keyword">null</span>;
      <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">//判断目录是否已存在，如果filename不为空，将其带入创建文件（真实还原文件类型，否则是.tmp临时文件）</span>
        <span class="hljs-keyword">if</span> (StringUtils.isEmpty(fileName)) {
          file = <span class="hljs-keyword">new</span> File(filePath);
        } <span class="hljs-keyword">else</span> {
          file = <span class="hljs-keyword">new</span> File(filePath, fileName);
        }
        <span class="hljs-keyword">if</span> (!file.exists()) {
          file.mkdirs();
        }
        <span class="hljs-comment">//保存文件</span>
        multipartFile.transferTo(file);
        FileBody bin = <span class="hljs-keyword">new</span> FileBody(file);
        reqEntity.addPart(fileKey, bin);
        httpPost.setEntity(reqEntity);

        HttpHeaders responseHeader = <span class="hljs-keyword">new</span> HttpHeaders();
        HttpResponse httpResponse = <span class="hljs-keyword">null</span>;
        <span class="hljs-keyword">try</span> {
          httpResponse = httpClient.execute(httpPost);
        } <span class="hljs-keyword">catch</span> (Exception e) {
          LOG.error(<span class="hljs-string">"代理文件上传失败，请求地址：{}，请求内容：{}"</span>, requestUrl, <span class="hljs-keyword">null</span>, e);
          JSONObject failedJson = <span class="hljs-keyword">new</span> JSONObject();
          failedJson.put(<span class="hljs-string">"result"</span>, <span class="hljs-string">"FAILURE"</span>);
          failedJson.put(<span class="hljs-string">"data"</span>, e.toString());
          URI uri = URI.create(redirectUrl + e.toString());
          responseHeader.setLocation(uri);
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ResponseEntity(responseHeader, HttpStatus.MOVED_TEMPORARILY);
        }
        LOG.info(<span class="hljs-string">"状态码："</span> + httpResponse.getStatusLine().getStatusCode());
        org.apache.http.HttpEntity httpEntity = httpResponse.getEntity();
        <span class="hljs-comment">//判断请求是否成功</span>
        String responseBody = <span class="hljs-string">""</span>;
        String isSuccess = <span class="hljs-string">"SUCCESS"</span>;
        <span class="hljs-keyword">if</span> (httpResponse.getStatusLine().getStatusCode() &gt;= HttpStatus.OK.value() &amp;&amp; httpResponse.getStatusLine().getStatusCode() &lt; HttpStatus.BAD_REQUEST.value()) {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">null</span> != httpEntity) {
<span class="hljs-comment">//            System.out.println("响应内容:" + EntityUtils.toString(httpEntity, ContentType.getOrDefault(httpEntity).getCharset()));</span>
            responseBody = EntityUtils.toString(httpEntity, ContentType.getOrDefault(httpEntity).getCharset());
            <span class="hljs-comment">//处于安全考虑，关闭数据流</span>
            EntityUtils.consume(httpEntity);
          }
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">//上传失败（非2XX）</span>
          isSuccess = <span class="hljs-string">"FAILURE"</span>;
        }
        JSONObject ResJson = <span class="hljs-keyword">new</span> JSONObject();
        ResJson.put(<span class="hljs-string">"result"</span>, isSuccess);
        ResJson.put(<span class="hljs-string">"data"</span>, responseBody);
        URI uri = URI.create(redirectUrl + URLEncoder.encode(ResJson.toString(), <span class="hljs-string">"UTF-8"</span>));
        responseHeader.setLocation(uri);
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ResponseEntity(responseHeader, HttpStatus.MOVED_TEMPORARILY);
      } <span class="hljs-keyword">catch</span> (IOException e) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BizException(ErrorCode.INTERNAL_SERVER_ERROR, e);
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">if</span> (file != <span class="hljs-keyword">null</span>) {
          file.delete();
        }
      }
    }<span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> BizException(HttpStatus.BAD_REQUEST, <span class="hljs-string">"PORTAL-APP/INVALID_ARGUMENT"</span>, <span class="hljs-string">"上传文件为空"</span>);
    }
  }</code></pre>
<p>在转发文件的时候，我们做了一层转存，原因在于，我们测试一个服务器的时候，我们直接使用一个缓存的数据，去写到<code>FormData</code>中，那边服务器接收到的文件对象居然是空的，因此我们才做了一层缓存，用一个真实存在的文件去做。</p>
<p>---end---</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
IE9下的跨域问题小总结

## 原文链接
[https://segmentfault.com/a/1190000008686327](https://segmentfault.com/a/1190000008686327)

