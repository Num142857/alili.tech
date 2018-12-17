---
title: 'vue + vuex + koa2开发环境搭建及示例开发' 
date: 2018-12-17 2:30:06
hidden: true
slug: eggs1fyc3j7
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>这篇文章的主要目的是学会使用koa框架搭建web服务，从而提供一些后端接口，供前端调用。<br>搭建这个环境的目的是： 前端工程师在跟后台工程师商定了接口但还未联调之前，涉及到向后端请求数据的功能能够走前端工程师自己搭建的http路径，而不是直接在前端写几个死数据。即，模拟后端接口。</p>
<p>当然在这整个过程（搭建环境 + 开发示例demo）中，涉及到以下几点知识点。<br>包括：</p>
<ul>
<li>koa2的知识点</li>
<li>node的知识点</li>
<li>跨域问题</li>
<li>fetch的使用</li>
<li>axios的使用</li>
<li>promise的涉及</li>
<li>vuex -&gt; state、mutations、actions的使用</li>
</ul>
<h2 id="articleHeader1">第一部分：环境搭建</h2>
<h3 id="articleHeader2">vue + vuex环境</h3>
<p>首先是vue + vue-router + vuex的环境。我们用vue-cli脚手架生成项目，会用vue的同学对这块应该很熟了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 全局安装脚手架工具
npm i vue-vli -g
// 验证脚手架工具安装成功与否
vue --version
// 构建项目
vue init webpack 项目名
// 测试vue项目是否运行成功
npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 全局安装脚手架工具</span>
npm i vue-vli -<span class="hljs-keyword">g</span>
<span class="hljs-comment">// 验证脚手架工具安装成功与否</span>
vue --<span class="hljs-keyword">version</span>
<span class="hljs-comment">// 构建项目</span>
vue init webpack 项目名
<span class="hljs-comment">// 测试vue项目是否运行成功</span>
npm <span class="hljs-keyword">run</span> dev</code></pre>
<p>因为脚手架生成的vue项目不包含vuex，所以再安装vuex。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装vuex
npm i vuex --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 安装vuex</span>
npm <span class="hljs-selector-tag">i</span> vuex --save</code></pre>
<h3 id="articleHeader3">koa2环境</h3>
<p>前端项目构建好了，就开始构建我们的后端服务。</p>
<p>首先在你的开发工具（不管是webstorm还是sublime）里新建一个目录，用来搭建基于koa的web服务。</p>
<p>在这里，我们不妨给这个目录起名为koa-demo。</p>
<p>然后执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 进入目录
cd koa-demo
// 生成package.json
npm init -y
// 安装以下依赖项
npm i koa
npm i koa-router
npm i koa-cors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 进入目录</span>
cd koa-demo
<span class="hljs-comment">// 生成package.json</span>
npm init -y
<span class="hljs-comment">// 安装以下依赖项</span>
npm <span class="hljs-selector-tag">i</span> koa
npm <span class="hljs-selector-tag">i</span> koa-router
npm <span class="hljs-selector-tag">i</span> koa-cors</code></pre>
<p>安装好koa和两个中间件，环境就算搭建完成了。</p>
<h2 id="articleHeader4">第二部分：示例开发</h2>
<p>搭建环境是为了使用，所以我们立马来写一个demo出来。<br>demo开发既是一个练习如何在开发环境中写代码的过程，反过来，也是一个验证环境搭建的对不对、好不好用的过程。</p>
<h3 id="articleHeader5">后端接口开发</h3>
<p>本例中，后端我们只提供一个服务，就是给前端提供一个返回json数据的接口。代码中包含注释，所以直接上代码。</p>
<p>server.js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// server.js文件

let Koa = require('koa');
let Router = require('koa-router');

let cors = require('koa-cors');
// 引入modejs的文件系统API
let fs = require('fs');

const app = new Koa();
const router = new Router();

// 提供一个/getJson接口
router
    .get('/getJson', async ctx => {
        // 后端允许cors跨域请求
        await cors();
        // 返回给前端的数据
        ctx.body = JSON.parse(fs.readFileSync( './static/material.json'));
    
    });

// 将koa和两个中间件连起来
app.use(router.routes()).use(router.allowedMethods());

// 监听3000端口
app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// server.js文件</span>

<span class="hljs-keyword">let</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">let</span> Router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-router'</span>);

<span class="hljs-keyword">let</span> cors = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-cors'</span>);
<span class="hljs-comment">// 引入modejs的文件系统API</span>
<span class="hljs-keyword">let</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router();

<span class="hljs-comment">// 提供一个/getJson接口</span>
router
    .get(<span class="hljs-string">'/getJson'</span>, <span class="hljs-keyword">async</span> ctx =&gt; {
        <span class="hljs-comment">// 后端允许cors跨域请求</span>
        <span class="hljs-keyword">await</span> cors();
        <span class="hljs-comment">// 返回给前端的数据</span>
        ctx.body = <span class="hljs-built_in">JSON</span>.parse(fs.readFileSync( <span class="hljs-string">'./static/material.json'</span>));
    
    });

<span class="hljs-comment">// 将koa和两个中间件连起来</span>
app.use(router.routes()).use(router.allowedMethods());

<span class="hljs-comment">// 监听3000端口</span>
app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>这里面用到了一个json文件，在'./static/material.json'路径，该json文件的代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// material.json文件

[{
    &quot;id&quot;: 1,
    &quot;date&quot;: &quot;2016-05-02&quot;,
    &quot;name&quot;: &quot;张三&quot;,
    &quot;address&quot;: &quot;北京 清华大学&quot;,
}, {
    &quot;id&quot;: 2,
    &quot;date&quot;: &quot;2016-05-04&quot;,
    &quot;name&quot;: &quot;李四&quot;,
    &quot;address&quot;: &quot;上海 复旦大学&quot;,
}, {
    &quot;id&quot;: 3,
    &quot;date&quot;: &quot;2016-05-01&quot;,
    &quot;name&quot;: &quot;王五&quot;,
    &quot;address&quot;: &quot;广东 中山大学&quot;,
}, {
    &quot;id&quot;: 4,
    &quot;date&quot;: &quot;2016-05-03&quot;,
    &quot;name&quot;: &quot;赵六&quot;,
    &quot;address&quot;: &quot;广东 深圳大学&quot;,
}, {
    &quot;id&quot;: 5,
    &quot;date&quot;: &quot;2016-05-05&quot;,
    &quot;name&quot;: &quot;韩梅梅&quot;,
    &quot;address&quot;: &quot;四川 四川大学&quot;,
}, {
    &quot;id&quot;: 6,
    &quot;date&quot;: &quot;2016-05-11&quot;,
    &quot;name&quot;: &quot;刘小律&quot;,
    &quot;address&quot;: &quot;湖南 中南大学&quot;,
}, {
    &quot;id&quot;: 7,
    &quot;date&quot;: &quot;2016-04-13&quot;,
    &quot;name&quot;: &quot;曾坦&quot;,
    &quot;address&quot;: &quot;江苏 南京大学&quot;,
}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>// material.json文件

[{
    <span class="hljs-string">"id"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-02"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"张三"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"北京 清华大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">2</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-04"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"李四"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"上海 复旦大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">3</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-01"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"王五"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"广东 中山大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">4</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-03"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"赵六"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"广东 深圳大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">5</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-05"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"韩梅梅"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"四川 四川大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">6</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-05-11"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"刘小律"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"湖南 中南大学"</span>,
}, {
    <span class="hljs-string">"id"</span>: <span class="hljs-number">7</span>,
    <span class="hljs-string">"date"</span>: <span class="hljs-string">"2016-04-13"</span>,
    <span class="hljs-string">"name"</span>: <span class="hljs-string">"曾坦"</span>,
    <span class="hljs-string">"address"</span>: <span class="hljs-string">"江苏 南京大学"</span>,
}]
</code></pre>
<p>然后我们是用以下命令将服务启动</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js</code></pre>
<h3 id="articleHeader6">测试接口是否良好</h3>
<p>打开浏览器，输入<a href="http://127.0.0.1" rel="nofollow noreferrer" target="_blank">http://127.0.0.1</a>:3000/getJson。看一看页面上是否将json文件中的json数据显示出来，如果能够显示出来，则说明这个提供json数据的服务，我们已经搭建好了。</p>
<h3 id="articleHeader7">前端调用后端接口示例</h3>
<p>为突出重点，排除干扰，方便理解。我们的前端就写一个组件，<strong>组件有两部分：首先是一个按钮，用来调用web服务的getJson接口；然后是一个内容展示区域，拿到后端返回的数据以后，将其在组件的这块区域显示出来</strong>。</p>
<p>首先我们看<strong>组件文件</strong>吧</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;test&quot;>
        <button type=&quot;button&quot; @click=&quot;getJson&quot;>从后端取json</button>
        <div class=&quot;showJson&quot;>"{{"json"}}"</div>
    </div>
</template>

<script>
    import {store} from '../vuex'
    export default {
        computed: {
          json(){
              return store.state.json;
          }
        },
        methods: {
          getJson(){
              store.dispatch(&quot;getJson&quot;);
          }
        }
    }
</script>

<style scoped>
  .showJson{
    width:500px;
    margin:10px auto;
    min-height:500px;
    background-color: palegreen;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getJson"</span>&gt;</span>从后端取json<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"showJson"</span>&gt;</span></span><span class="hljs-template-variable">"{{"json"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> {store} <span class="hljs-keyword">from</span> <span class="hljs-string">'../vuex'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">computed</span>: {
          json(){
              <span class="hljs-keyword">return</span> store.state.json;
          }
        },
        <span class="hljs-attr">methods</span>: {
          getJson(){
              store.dispatch(<span class="hljs-string">"getJson"</span>);
          }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.showJson</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span>;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">10px</span> auto;
    <span class="hljs-attribute">min-height</span>:<span class="hljs-number">500px</span>;
    <span class="hljs-attribute">background-color</span>: palegreen;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>非常简单，就不多解释了。<br>然后看我们的<strong>vuex文件</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex)
const state = {
    json: [],
};

const mutations = {
  setJson(state, db){
    state.json = db;
  }
}

const actions = {
  getJson(context){
    // 调用我们的后端getJson接口
    fetch('http://127.0.0.1:3000/json', {
      method: 'GET',
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function (res) {
      if(res.status === 200){
        return res.json()
      }
    }).then(function (json) {

      //console.log(typeof Array.from(json), Array.from(json));
      context.commit('setJson', Array.from(json));
    })
  }
};

export const store = new Vuex.Store({
  state: state,
  mutations: mutations,
  actions: actions,
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> 'vue'
import Vuex <span class="hljs-keyword">from</span> 'vuex';

Vue.use(Vuex)
const <span class="hljs-keyword">state</span> = {
    json: [],
};

const mutations = {
  <span class="hljs-built_in">set</span>Json(<span class="hljs-keyword">state</span>, db){
    <span class="hljs-keyword">state</span>.json = db;
  }
}

const actions = {
  getJson(context){
    // 调用我们的后端getJson接口
    fetch('http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">3000</span>/json', {
      method: 'GET',
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function (res) {
      if(res.status === <span class="hljs-number">200</span>){
        return res.json()
      }
    }).then(function (json) {

      //console.<span class="hljs-keyword">log</span>(typeof Array.<span class="hljs-keyword">from</span>(json), Array.<span class="hljs-keyword">from</span>(json));
      context.commit('<span class="hljs-built_in">set</span>Json', Array.<span class="hljs-keyword">from</span>(json));
    })
  }
};

export const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: <span class="hljs-keyword">state</span>,
  mutations: mutations,
  actions: actions,
})</code></pre>
<p>ok, 代码撸完了，获取后端数据之前是这样的。<br><span class="img-wrap"><img data-src="/img/remote/1460000012922023?w=531&amp;h=429" src="https://static.alili.tech/img/remote/1460000012922023?w=531&amp;h=429" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>获取后端数据之后是这样的。<br><span class="img-wrap"><img data-src="/img/remote/1460000012922024?w=587&amp;h=312" src="https://static.alili.tech/img/remote/1460000012922024?w=587&amp;h=312" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">说说axios</h3>
<p>想要把本demo的fetch改为axios方式，要做的工作有以下几处：<br>1、安装axios、在vuex文件引用axios</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i axios
import axios from 'axios'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> i axios
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span></code></pre>
<p>2、将fetch部分代码替换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const actions = {
  getJson(context){
    axios.get('/json', {
      method: 'GET',
      // mode:'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(function (res) {
      if(res.status === 200){
        return res.data
      }
    }).then(function (json) {

      //console.log(typeof Array.from(json), Array.from(json));
      context.commit('setJson', Array.from(json));
    })
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>const actions = {
  getJson(context){
    axios.get('/json', {
      method: <span class="hljs-symbol">'GET</span>',
      // mode:<span class="hljs-symbol">'cors</span>',
      headers: {
        <span class="hljs-symbol">'Accept</span>': <span class="hljs-symbol">'application</span>/json',
        <span class="hljs-symbol">'Content</span>-<span class="hljs-keyword">Type</span>': <span class="hljs-symbol">'application</span>/json',
      },
    }).<span class="hljs-keyword">then</span>(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(res) {
      if(res.status === 200){
        <span class="hljs-keyword">return</span> <span class="hljs-type">res.data</span>
      }
    }).<span class="hljs-keyword">then</span>(<span class="hljs-keyword">function</span> <span class="hljs-title"></span>(json) {

      //console.log(typeof Array.from(json), Array.from(json));
      context.commit(<span class="hljs-symbol">'setJson</span>', <span class="hljs-keyword">Array</span>.from(json));
    })
  }
};</code></pre>
<p>3、又会遇到跨域，在webpack中修改，路径config/index.js文件中添加proxyTable项的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/json': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/json': '/json'
        }
      }
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">proxyTable</span>: {
      <span class="hljs-string">'/json'</span>: {
        <span class="hljs-attribute">target</span>: <span class="hljs-string">'http://127.0.0.1:3000'</span>,
        <span class="hljs-attribute">changeOrigin</span>: true,
        <span class="hljs-attribute">pathRewrite</span>: {
          <span class="hljs-string">'^/json'</span>: <span class="hljs-string">'/json'</span>
        }
      }
    },</code></pre>
<h2 id="articleHeader9">后记</h2>
<p>基于vue脚手架搭建的项目，模拟异步取数据，也可以直接在脚手架生成的<strong>static文件夹</strong>下放置数据，假装是后台拿过来的数据。</p>
<p>不过搭建一个基于express或者koa的web服务，确实也该是一个前端工程师应该掌握的。</p>
<p>OK，以上就是全文了。<br>如果这篇文章使你有所收获，不胜荣幸。<br>欢迎点赞，以期能帮助更多同学！</p>
<h3 id="articleHeader10">关于作者</h3>
<p><a href="https://cunzaizhuyi.github.io" rel="nofollow noreferrer" target="_blank">技术博客</a>  || <a href="https://github.com/cunzaizhuyi" rel="nofollow noreferrer" target="_blank">GitHub</a>  || <a href="https://juejin.im/user/5934c9f5fe88c20061cc7058/posts" rel="nofollow noreferrer" target="_blank">掘金主页</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue + vuex + koa2开发环境搭建及示例开发

## 原文链接
[https://segmentfault.com/a/1190000012918518](https://segmentfault.com/a/1190000012918518)

