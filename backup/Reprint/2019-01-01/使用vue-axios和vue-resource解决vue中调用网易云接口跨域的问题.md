---
title: '使用vue-axios和vue-resource解决vue中调用网易云接口跨域的问题' 
date: 2019-01-01 2:30:07
hidden: true
slug: ytbem0z70sr
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用vue-axios和vue-resource解决vue中调用网易云接口跨域的问题</h1>
<h2 id="articleHeader1">1. 新建vue项目</h2>
<h3 id="articleHeader2">1.1 新建项目</h3>
<p>新建项目</p>
<p><code>vue init webpack axios_resource</code></p>
<p>然后具体设置如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072730" src="https://static.alili.tech/img/remote/1460000011072730" alt="设置" title="设置" style="cursor: pointer; display: inline;"></span></p>
<p>项目名称,项目描述,作者,Runtime + Compiler 回车即可</p>
<p><strong>注意这里要安装vue-router和ESLint</strong></p>
<p>然后<code>Setup unit tests with Karma + Mocha?</code>和<code>Setup e2e tests with Nightwatch?</code>都选择n即可</p>
<h3 id="articleHeader3">1.2 安装项目依赖</h3>
<p><code>cnpm install</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072731" src="https://static.alili.tech/img/remote/1460000011072731" alt="依赖" title="依赖" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">1.3 安装<code>axios</code>模块</h3>
<p><code>cnpm install axios --save</code></p>
<h3 id="articleHeader5">1.4 安装<code>resource</code>模块</h3>
<p><code>cnpm install vue-resource --save</code></p>
<h3 id="articleHeader6">1.5 运行项目</h3>
<p><code>cnpm run dev</code></p>
<blockquote><p>效果图如下</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072732" src="https://static.alili.tech/img/remote/1460000011072732" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">1.6 修改页面内容</h3>
<p>我们先修改一下页面内容 <code>src\components\Hello.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊'
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>效果图如下</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072733" src="https://static.alili.tech/img/remote/1460000011072733" alt="效果图2" title="效果图2" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">2. 使用axios</h2>
<h3 id="articleHeader9">2.1 我们先修改一下页面,让页面加载一些动态内容</h3>
<p>模板修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
    <ul v-for=&quot;music in musics&quot;>
    <li>
        "{{" music.name "}}"
    </li>
    </ul>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"music in musics"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        "{{" music.name "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>js部分修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊',
      musics: []
    }
  },
  mounted: function () {
    axios.get('http://music.163.com/api/playlist/detail?id=19723756')
    .then(function (res) {
      console.log(res)
    }, function (error) {
      console.log(error)
    })
  }

}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>,
      <span class="hljs-attr">musics</span>: []
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    axios.get(<span class="hljs-string">'http://music.163.com/api/playlist/detail?id=19723756'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-built_in">console</span>.log(res)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }

}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p><em>_</em></p>
<p>然后保存</p>
<p>发现页面有一个报错<br><code>http://eslint.org/docs/rules/no-undef  'axios' is not defined</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072734" src="https://static.alili.tech/img/remote/1460000011072734" alt="未定义报错" title="未定义报错" style="cursor: pointer; display: inline;"></span></p>
<p>axios没有定义,是因为我们没有导入axios模块的原因</p>
<p>我们在js部分顶部导入一下axios模块</p>
<p><code>import axios from 'axios'</code></p>
<p>加载axios模块之后错误提示消失了。<br>打开调试页面console界面<br>发现有一个报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="No 'Access-Control-Allow-Origin' header is present on the requested resource.Origin 'http://localhost:8080' is therefore not allowed access." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code style="word-break: break-word; white-space: initial;">No <span class="hljs-symbol">'Access</span>-Control-Allow-Origin' header <span class="hljs-keyword">is</span> present <span class="hljs-keyword">on</span> the requested resource.Origin <span class="hljs-symbol">'http</span>://localhost:<span class="hljs-number">8080</span>' <span class="hljs-keyword">is</span> therefore <span class="hljs-keyword">not</span> allowed <span class="hljs-keyword">access</span>.</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072735" src="https://static.alili.tech/img/remote/1460000011072735" alt="跨域报错" title="跨域报错" style="cursor: pointer;"></span></p>
<p>这里的<code>not allowed access</code>就是提示我们浏览器不支持跨域请求，搜索了很多资料，网易云不支持跨域请求的(网易云的服务器在返回你的请求中没有Access-Control-Allow-Origin这个head字段)。</p>
<p>那怎么办呢?<br>那我们只能使用代理了。</p>
<p>下面将介绍3种代理方式：1，远程代理 2，php代理 3，node代理</p>
<h2 id="articleHeader10">3 代理</h2>
<h3 id="articleHeader11">3.1 远程代理</h3>
<p>就是利用别人写好的代理接口，代理发送你的请求，这样就不会跨域了。</p>
<p>首先我们定义一个常量<code>API_PROXY</code></p>
<p><code>const API_PROXY = 'https://bird.ioliu.cn/v1/?url='</code></p>
<p>然后在<code>axios</code>请求里面拼接一下字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get(API_PROXY + 'http://music.163.com/api/playlist/detail?id=19723756')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">axios.<span class="hljs-built_in">get</span>(API_PROXY + <span class="hljs-string">'http://music.163.com/api/playlist/detail?id=19723756'</span>)</code></pre>
<p>js 完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊',
      musics: []
    }
  },
  mounted: function () {
    axios.get(API_PROXY + 'http://music.163.com/api/playlist/detail?id=19723756')
    .then(function (res) {
      console.log(res)
    }, function (error) {
      console.log(error)
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
<span class="hljs-keyword">const</span> API_PROXY = <span class="hljs-string">'https://bird.ioliu.cn/v1/?url='</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>,
      <span class="hljs-attr">musics</span>: []
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    axios.get(API_PROXY + <span class="hljs-string">'http://music.163.com/api/playlist/detail?id=19723756'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-built_in">console</span>.log(res)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>打开浏览器<code>console</code>界面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {data: Object, status: 200, statusText: &quot;OK&quot;, headers: Object, config: Object…}config: Objectdata: Objectheaders: Objectrequest: XMLHttpRequeststatus: 200statusText: &quot;OK&quot;__proto__: Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">Object {<span class="hljs-string">data:</span> Object, <span class="hljs-string">status:</span> <span class="hljs-number">200</span>, <span class="hljs-string">statusText:</span> <span class="hljs-string">"OK"</span>, <span class="hljs-string">headers:</span> Object, <span class="hljs-string">config:</span> Object…}<span class="hljs-string">config:</span> <span class="hljs-string">Objectdata:</span> <span class="hljs-string">Objectheaders:</span> <span class="hljs-string">Objectrequest:</span> <span class="hljs-string">XMLHttpRequeststatus:</span> <span class="hljs-number">200</span><span class="hljs-string">statusText:</span> <span class="hljs-string">"OK"</span><span class="hljs-string">__proto__:</span> Object</code></pre>
<p>请求成功</p>
<p>赋值给<code>musics</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.musics = res.data.result.tracks" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this<span class="hljs-selector-class">.musics</span> = res<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.result</span><span class="hljs-selector-class">.tracks</span></code></pre>
<p>发现页面有个报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Uncaught (in promise) TypeError: Cannot set property 'musics' of undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code style="word-break: break-word; white-space: initial;">Uncaught (<span class="hljs-keyword">in</span> promise) TypeError: Cannot <span class="hljs-keyword">set</span> <span class="hljs-keyword">property</span> <span class="hljs-string">'musics'</span> <span class="hljs-keyword">of</span> undefined</code></pre>
<p>musics没有定义<br>因为这里，this的指向不是当前的vue实例<br>那我们在使用<code>axios</code>之前重新，定义一下this</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _this = this" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span></code></pre>
<p>在<code>axios</code>使用<code>_this</code>就好了</p>
<p>mounted部分代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mounted: function () {
    var _this = this
    axios.get(API_PROXY + 'http://music.163.com/api/playlist/detail?id=19723756')
    .then(function (res) {
      _this.musics = res.data.result.tracks
      console.log(_this.musics)
    }, function (error) {
      console.log(error)
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>
    axios.get(API_PROXY + <span class="hljs-string">'http://music.163.com/api/playlist/detail?id=19723756'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      _this.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(_this.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }</code></pre>
<p>再打开控制台，发现没有报错,请求的数据也是我们想要的<br><span class="img-wrap"><img data-src="/img/remote/1460000011072736" src="https://static.alili.tech/img/remote/1460000011072736" alt="请求成功1" title="请求成功1" style="cursor: pointer;"></span></p>
<p>再次修改一下模板</p>
<p>我们再增加图片数据</p>
<p>修改好的模板如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
    <ul v-for=&quot;music in musics&quot;>
      <li>
        "{{" music.name "}}"
      </li><br>
      <li>
        <img :src=&quot;music.album.picUrl&quot; style=&quot;width:200px;&quot;>
      </li>
    </ul>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"music in musics"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        "{{" music.name "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"music.album.picUrl"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;hello&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
    <ul v-for=&quot;music in musics&quot;>
      <li>
        "{{" music.name "}}"
      </li><br>
      <li>
        <img :src=&quot;music.album.picUrl&quot; style=&quot;width:200px;&quot;>
      </li>
    </ul>
  </div>
</template>

<script>
const API_PROXY = 'https://bird.ioliu.cn/v1/?url='
import axios from 'axios'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊',
      musics: []
    }
  },
  mounted: function () {
    var _this = this
    axios.get(API_PROXY + 'http://music.163.com/api/playlist/detail?id=19723756')
    .then(function (res) {
      _this.musics = res.data.result.tracks
      console.log(_this.musics)
    }, function (error) {
      console.log(error)
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hello"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"music in musics"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        "{{" music.name "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"music.album.picUrl"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">const</span> API_PROXY = <span class="hljs-string">'https://bird.ioliu.cn/v1/?url='</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'hello'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>,
      <span class="hljs-attr">musics</span>: []
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> _this = <span class="hljs-keyword">this</span>
    axios.get(API_PROXY + <span class="hljs-string">'http://music.163.com/api/playlist/detail?id=19723756'</span>)
    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      _this.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(_this.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>最后效果图如下</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072737" src="https://static.alili.tech/img/remote/1460000011072737" alt="最后效果图" title="最后效果图" style="cursor: pointer;"></span><br><em>_</em></p>
<h3 id="articleHeader12">3.2 php用curl代理</h3>
<p>这里演示vue-resource的写法 + php curl 完成代理请求</p>
<p>前面我们安装了<code>vue-resource</code>模块，我们要在<code>main.js</code>加载一下<code>vue-resource</code>模块</p>
<p>加载</p>
<p><code>import VueResource from 'vue-resource'</code></p>
<p>使用</p>
<p><code>Vue.use(VueResource)</code></p>
<p>为了避免和之前页面混淆，我们重新新增一个curl页面，路由同样新增加一条'/curl'的路由</p>
<p>index.js 完整代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Curl from '@/components/Curl'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/curl',
      name: 'Curl',
      component: Curl
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Hello'</span>
<span class="hljs-keyword">import</span> Curl <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Curl'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

Vue.use(Router)
Vue.use(VueResource)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Hello'</span>,
      <span class="hljs-attr">component</span>: Hello
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/curl'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Curl'</span>,
      <span class="hljs-attr">component</span>: Curl
    }
  ]
})</code></pre>
<p>其实<code>vue-resource</code>get方法基本上和<code>axios</code>很像，基本上没有太多变动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mounted: function () {
    this.$http.get('http://localhost/curl.php', {}, {
      headers: {

      },
      emulateJSON: true
    }).then(function (res) {
      this.musics = res.data.result.tracks
      console.log(this.musics)
    }, function (error) {
      console.log(error)
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost/curl.php'</span>, {}, {
      <span class="hljs-attr">headers</span>: {

      },
      <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-keyword">this</span>.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }</code></pre>
<p>headers get方法里面不用填写参数，如果是post方式发送请求<br>则要设置<code>Access-Control-Allow-Origin: *</code></p>
<p>完整代码如下 <code>src\components\Curl.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;curl&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
    <ul v-for=&quot;music in musics&quot;>
      <li>
        "{{" music.name "}}"
      </li><br>
      <li>
        <img :src=&quot;music.album.picUrl&quot; style=&quot;width:200px;&quot;>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'curl',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊',
      musics: []
    }
  },
  mounted: function () {
    this.$http.get('http://localhost/curl.php', {}, {
      headers: {

      },
      emulateJSON: true
    }).then(function (res) {
      this.musics = res.data.result.tracks
      console.log(this.musics)
    }, function (error) {
      console.log(error)
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"curl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"music in musics"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        "{{" music.name "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"music.album.picUrl"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'curl'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>,
      <span class="hljs-attr">musics</span>: []
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'http://localhost/curl.php'</span>, {}, {
      <span class="hljs-attr">headers</span>: {

      },
      <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-keyword">this</span>.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>当然了，最重要的是curl.php这个部分代码怎么写了<br>curl.php 完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
// header('Content-type:text/html;Charset=utf-8'); 
header('Content-Type:text/json;charset=utf-8');//设置返回文件的类型
header('Access-Control-Allow-Origin: *');//设置允许所有跨域
$id = '19723756';       //id   
$va_url = 'http://music.163.com/api/playlist/detail?';            //验证的 url 链接地址
$post_fields = &quot;id={$id}&quot;; //post提交信息串  
$curl = curl_init(); //初始化一个cURL会话，必有  
//curl_setopt()函数用于设置 curl 的参数，其功能非常强大，具体看手册  
curl_setopt($curl, CURLOPT_URL, $va_url);      //设置验证登陆的 url 链接  
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); //设置结果保存在变量中，还是输出，默认为0（输出）  
curl_setopt($curl, CURLOPT_POST, 1);           //模拟post提交  
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_fields); //设置post串
//避免https请求报错 Curl error: SSL certificate problem: unable to get local issuer certificate
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);

$data = curl_exec($curl);  //执行此cURL会话，必有  
// echo &quot;<pre>&quot;;
// print_r(json_decode($data));
echo $data;
//检查是否有错误  
if(curl_errno($curl)) {  
    exit('Curl error: ' . curl_error($curl));  
}  

curl_close($curl);         //关闭会话 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">// header('Content-type:text/html;Charset=utf-8'); </span>
header(<span class="hljs-string">'Content-Type:text/json;charset=utf-8'</span>);<span class="hljs-comment">//设置返回文件的类型</span>
header(<span class="hljs-string">'Access-Control-Allow-Origin: *'</span>);<span class="hljs-comment">//设置允许所有跨域</span>
$id = <span class="hljs-string">'19723756'</span>;       <span class="hljs-comment">//id   </span>
$va_url = <span class="hljs-string">'http://music.163.com/api/playlist/detail?'</span>;            <span class="hljs-comment">//验证的 url 链接地址</span>
$post_fields = <span class="hljs-string">"id={$id}"</span>; <span class="hljs-comment">//post提交信息串  </span>
$curl = curl_init(); <span class="hljs-comment">//初始化一个cURL会话，必有  </span>
<span class="hljs-comment">//curl_setopt()函数用于设置 curl 的参数，其功能非常强大，具体看手册  </span>
curl_setopt($curl, CURLOPT_URL, $va_url);      <span class="hljs-comment">//设置验证登陆的 url 链接  </span>
curl_setopt($curl, CURLOPT_RETURNTRANSFER, <span class="hljs-number">1</span>); <span class="hljs-comment">//设置结果保存在变量中，还是输出，默认为0（输出）  </span>
curl_setopt($curl, CURLOPT_POST, <span class="hljs-number">1</span>);           <span class="hljs-comment">//模拟post提交  </span>
curl_setopt($curl, CURLOPT_POSTFIELDS, $post_fields); <span class="hljs-comment">//设置post串</span>
<span class="hljs-comment">//避免https请求报错 Curl error: SSL certificate problem: unable to get local issuer certificate</span>
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, <span class="hljs-keyword">false</span>);
curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, <span class="hljs-keyword">false</span>);

$data = curl_exec($curl);  <span class="hljs-comment">//执行此cURL会话，必有  </span>
<span class="hljs-comment">// echo "&lt;pre&gt;";</span>
<span class="hljs-comment">// print_r(json_decode($data));</span>
<span class="hljs-keyword">echo</span> $data;
<span class="hljs-comment">//检查是否有错误  </span>
<span class="hljs-keyword">if</span>(curl_errno($curl)) {  
    <span class="hljs-keyword">exit</span>(<span class="hljs-string">'Curl error: '</span> . curl_error($curl));  
}  

curl_close($curl);         <span class="hljs-comment">//关闭会话 </span></code></pre>
<p>curl请求的话就解释了，大家可以去看手册<br>最重要的是设置头文件允许跨域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="header('Access-Control-Allow-Origin: *');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php" style="word-break: break-word; white-space: initial;">header(<span class="hljs-string">'Access-Control-Allow-Origin: *'</span>);</code></pre>
<p>如果没有设置这个的话，代理也是没有意思的，不然前端还是会提示跨域</p>
<p>当然啦，你要把curl.php这个文件丢在你apache或者nginx根目录，同时apache或者nginx服务器也别忘记启用了哦。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072738" src="https://static.alili.tech/img/remote/1460000011072738" alt="请求成功2" title="请求成功2" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">3.3 nodejs代理</h3>
<p>同样的我们新建一个<code>Node.vue</code>的模板和<code>/node</code>的路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
      path: '/node',
      name: 'Node',
      component: Node
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/node'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Node'</span>,
      <span class="hljs-attr">component</span>: Node
    }</code></pre>
<p>index.js 完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Curl from '@/components/Curl'
import Node from '@/components/Node'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/curl',
      name: 'Curl',
      component: Curl
    },
    {
      path: '/node',
      name: 'Node',
      component: Node
    }
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Hello'</span>
<span class="hljs-keyword">import</span> Curl <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Curl'</span>
<span class="hljs-keyword">import</span> Node <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Node'</span>
<span class="hljs-keyword">import</span> VueResource <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-resource'</span>

Vue.use(Router)
Vue.use(VueResource)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Hello'</span>,
      <span class="hljs-attr">component</span>: Hello
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/curl'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Curl'</span>,
      <span class="hljs-attr">component</span>: Curl
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/node'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Node'</span>,
      <span class="hljs-attr">component</span>: Node
    }
  ]
})</code></pre>
<p>设置代理</p>
<p>打开config/index.js<br>修改<code>proxyTable: {}</code>部分<br>修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    proxyTable: {
      '/api': {
        target: 'http://music.163.com/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    proxyTable: {
      <span class="hljs-string">'/api'</span>: {
        <span class="hljs-attr">target</span>: <span class="hljs-string">'http://music.163.com/api'</span>,
        <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">pathRewrite</span>: {
          <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
        }
      }
    }</code></pre>
<p>第一行的<code>'/api'</code>指的是虚拟路径<br>target指的是目标地址，也就是实际api的地址<br>pathRewrite规则重写</p>
<p>然后在代码页面修改一下请求地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mounted: function () {
    this.$http.get('/api/playlist/detail?id=19723756', {}, {
      headers: {

      },
      emulateJSON: true
    }).then(function (res) {
      this.musics = res.data.result.tracks
      console.log(this.musics)
    }, function (error) {
      console.log(error)
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">  mounted: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/api/playlist/detail?id=19723756'</span>, {}, {
      <span class="hljs-attr">headers</span>: {

      },
      <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-keyword">this</span>.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }</code></pre>
<p><strong><code>/api/playlist/detail?id=19723756</code>上面的这个地址其实就等于<code>http://localhost:8080/api</code>+<code>/playlist/detail?id=19723756</code></strong></p>
<p>注意这里一定要重启一下node，因为你修改了node的配置一定要重启才能生效</p>
<p>在命令符窗口<code>ctrl + c</code><br>然后重新执行<code>cnpm run dev</code><br>这时候，命令窗口会提示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[HPM] Proxy created: /api  ->  http://music.163.com/api
[HPM] Proxy rewrite rule created: &quot;^/api&quot; ~> &quot;&quot;
> Starting dev server..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>[HPM] Proxy <span class="hljs-string">created:</span> <span class="hljs-regexp">/api  -&gt;  http:/</span><span class="hljs-regexp">/music.163.com/</span>api
[HPM] Proxy rewrite rule <span class="hljs-string">created:</span> <span class="hljs-string">"^/api"</span> ~&gt; <span class="hljs-string">""</span>
&gt; Starting dev server...</code></pre>
<p>说明代理成功</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072739" src="https://static.alili.tech/img/remote/1460000011072739" alt="代理成功" title="代理成功" style="cursor: pointer; display: inline;"></span></p>
<p>然后访问<a href="http://localhost:8080/#/node" rel="nofollow noreferrer" target="_blank">http://localhost:8080/#/node</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011072740" src="https://static.alili.tech/img/remote/1460000011072740" alt="请求成功3" title="请求成功3" style="cursor: pointer; display: inline;"></span></p>
<p>就能看到效果了<br>完整代码 <code>src\components\Node.vue</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;curl&quot;>
    <h1>"{{" msg "}}"</h1>
    <h2>"{{" author "}}"</h2>
    <ul v-for=&quot;music in musics&quot;>
      <li>
        "{{" music.name "}}"
      </li><br>
      <li>
        <img :src=&quot;music.album.picUrl&quot; style=&quot;width:200px;&quot;>
      </li>
    </ul>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"curl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>"{{" msg "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>"{{" author "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"music in musics"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        "{{" music.name "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"music.album.picUrl"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:200px;"</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
export default {
  name: 'curl',
  data () {
    return {
      msg: 'vue调用网易云接口',
      author: '泥猴啊',
      musics: []
    }
  },
  mounted: function () {
    this.$http.get('/api/playlist/detail?id=19723756', {}, {
      headers: {

      },
      emulateJSON: true
    }).then(function (res) {
      this.musics = res.data.result.tracks
      console.log(this.musics)
    }, function (error) {
      console.log(error)
    })
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script&gt;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'curl'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">'vue调用网易云接口'</span>,
      <span class="hljs-attr">author</span>: <span class="hljs-string">'泥猴啊'</span>,
      <span class="hljs-attr">musics</span>: []
    }
  },
  <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">'/api/playlist/detail?id=19723756'</span>, {}, {
      <span class="hljs-attr">headers</span>: {

      },
      <span class="hljs-attr">emulateJSON</span>: <span class="hljs-literal">true</span>
    }).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">res</span>) </span>{
      <span class="hljs-keyword">this</span>.musics = res.data.result.tracks
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.musics)
    }, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
      <span class="hljs-built_in">console</span>.log(error)
    })
  }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<blockquote><p>github地址 <a href="https://github.com/pandoraxm/vue_axios_resource" rel="nofollow noreferrer" target="_blank">https://github.com/pandoraxm/...</a><br>原文链接 <a href="https://www.bear777.com/blog/vue-vue-axios-vue-resource-vue" rel="nofollow noreferrer" target="_blank">https://www.bear777.com/blog/...</a><br>个人博客 <a href="https://www.bear777.com" rel="nofollow noreferrer" target="_blank">https://www.bear777.com</a> <img src="https://static.alili.techundefined" class="emoji" alt="smile" title="smile"><img src="https://static.alili.techundefined" class="emoji" alt="bear" title="bear"></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用vue-axios和vue-resource解决vue中调用网易云接口跨域的问题

## 原文链接
[https://segmentfault.com/a/1190000011072725](https://segmentfault.com/a/1190000011072725)

