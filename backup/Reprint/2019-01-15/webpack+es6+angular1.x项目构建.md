---
title: 'webpack+es6+angular1.x项目构建' 
date: 2019-01-15 2:30:12
hidden: true
slug: hn086yfxzek
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">技术栈概述</h2>
<h3 id="articleHeader1">ES2015(ES6)</h3>
<p>大名ES2015，顾名思义是 ECMAScript 在2015年6月正式发布的一套标准。小名ES6，意为ECMAScript第六次变更。（<em>JavaScript 是 ECMAScript 规范的一种实现</em>）。如今已慢慢替代ES5，成为JS主流的开发规范，新增很多语法糖，大大提高开发效率。</p>
<h3 id="articleHeader2">webpack</h3>
<p><span class="img-wrap"><img data-src="/img/bVMXxE?w=1269&amp;h=488" src="https://static.alili.tech/img/bVMXxE?w=1269&amp;h=488" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>一款模块化的构建工具，对ES6的构建更加友好，不详细介绍了。</p>
<h3 id="articleHeader3">angular</h3>
<p>一款MV*框架，本次用的是angular的1.6.4版本，即angular1.x版本中的最高版，也可以看作是2的过渡版吧。</p>
<h3 id="articleHeader4">eslint</h3>
<p>ESLint是一个QA工具，用来避免低级错误和统一代码的风格。尤其是多人开发的情境下，规范代码，统一风格是非常重要的。即便每个人负责自己的模块，在实际执行的时候也难免有交集。eslint简单的讲，就是让自己少犯错，也让队友更容易的看懂你的代码。</p>
<p>本项目，选择的是ESlint的推荐配置，唯一注意的是全局变量中把angular的关键词加上。因为用到了es7的async等东西，除了webpack里babel的配置要到位，eslint里面也要配置相关解析，即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
  &quot;env&quot;: {
    &quot;browser&quot;: true,
    &quot;commonjs&quot;: true,
    &quot;es6&quot;: true
  },
  &quot;extends&quot;: &quot;eslint:recommended&quot;,
  &quot;parserOptions&quot;: {
    &quot;sourceType&quot;: &quot;module&quot;
  },
  &quot;globals&quot;: {
    &quot;angular&quot;: true// angular关键词
  },
  &quot;parser&quot;: &quot;babel-eslint&quot;, // 解析es7
  &quot;rules&quot;: {
    &quot;no-console&quot;: 0,
    &quot;quotes&quot;: [
      &quot;error&quot;,
      &quot;single&quot;
    ]
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
  <span class="hljs-string">"env"</span>: {
    <span class="hljs-string">"browser"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"commonjs"</span>: <span class="hljs-keyword">true</span>,
    <span class="hljs-string">"es6"</span>: <span class="hljs-keyword">true</span>
  },
  <span class="hljs-string">"extends"</span>: <span class="hljs-string">"eslint:recommended"</span>,
  <span class="hljs-string">"parserOptions"</span>: {
    <span class="hljs-string">"sourceType"</span>: <span class="hljs-string">"module"</span>
  },
  <span class="hljs-string">"globals"</span>: {
    <span class="hljs-string">"angular"</span>: <span class="hljs-keyword">true</span><span class="hljs-comment">// angular关键词</span>
  },
  <span class="hljs-string">"parser"</span>: <span class="hljs-string">"babel-eslint"</span>, <span class="hljs-comment">// 解析es7</span>
  <span class="hljs-string">"rules"</span>: {
    <span class="hljs-string">"no-console"</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">"quotes"</span>: [
      <span class="hljs-string">"error"</span>,
      <span class="hljs-string">"single"</span>
    ]
  }
};</code></pre>
<p>eslint是很灵活的，可以自己按需配置，本项目都是用的官方推荐配置。</p>
<h2 id="articleHeader5">项目结构</h2>
<p><span class="img-wrap"><img data-src="/img/bVMXxJ?w=367&amp;h=796" src="https://static.alili.tech/img/bVMXxJ?w=367&amp;h=796" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><strong>commonComponents</strong><br>公共组件目录，放一些二次封装的table等等'片段式'的html。<br><strong>components</strong><br>页面组件目录，因为是单页面应用，这里面放置的也就是各个页面了，把每个页面封装成'大'组件，里面由各自的html和'小'组件拼接而成。<br><strong>config</strong><br>路由，URL等等可配置的管理目录。<br><strong>css</strong><br>项目的<strong>公用样式</strong>目录。具体到组件的样式，会在各个组件里面具体写。比如login组件。<br><span class="img-wrap"><img data-src="/img/bVMXxN?w=307&amp;h=247" src="https://static.alili.tech/img/bVMXxN?w=307&amp;h=247" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><strong>image</strong><br>图片目录。所有图片统一在这里管理。<br><strong>server</strong><br>服务目录。对项目的一些公用服务进行封装，比如二次封装http服务。这个目录，还可以细分，比如将angular的provider，service，value等等再进行划分。</p>
<h2 id="articleHeader6">项目入口</h2>
<h3 id="articleHeader7">app.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'babel-polyfill';
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './components';
import services from './server'
import commonComponents from './commonComponents';
import appRouter from './config/app.router';
import './css/main.less';
import style from './app.less';

let appComponent = {
    restrict: 'E',
    template: require('./app.html'),
    controller: function () {
        this.class = style;
    },
    controllerAs: 'app'
};

export default angular.module('sass', [uiRouter, components, services, commonComponents])
    .config(appRouter)
    .component('app', appComponent)
    .name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>;
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">'angular'</span>;
<span class="hljs-keyword">import</span> uiRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'angular-ui-router'</span>;
<span class="hljs-keyword">import</span> components <span class="hljs-keyword">from</span> <span class="hljs-string">'./components'</span>;
<span class="hljs-keyword">import</span> services <span class="hljs-keyword">from</span> <span class="hljs-string">'./server'</span>
<span class="hljs-keyword">import</span> commonComponents <span class="hljs-keyword">from</span> <span class="hljs-string">'./commonComponents'</span>;
<span class="hljs-keyword">import</span> appRouter <span class="hljs-keyword">from</span> <span class="hljs-string">'./config/app.router'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./css/main.less'</span>;
<span class="hljs-keyword">import</span> style <span class="hljs-keyword">from</span> <span class="hljs-string">'./app.less'</span>;

<span class="hljs-keyword">let</span> appComponent = {
    <span class="hljs-attr">restrict</span>: <span class="hljs-string">'E'</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./app.html'</span>),
    <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.class = style;
    },
    <span class="hljs-attr">controllerAs</span>: <span class="hljs-string">'app'</span>
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> angular.module(<span class="hljs-string">'sass'</span>, [uiRouter, components, services, commonComponents])
    .config(appRouter)
    .component(<span class="hljs-string">'app'</span>, appComponent)
    .name;</code></pre>
<p>除了引入angular，还引入了ui-router，因为原生的路由，不支持视图的嵌套。<br>components, services, commonComponents是各自组建服务的汇总，前面已介绍。</p>
<h2 id="articleHeader8">写一个页面组件</h2>
<p>下面以登陆页面为例。一个组件页面由4个文件组成，分别是index.js(此页面组件的出口，也是其余逻辑，样式的入口)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import loginCtrl from './login'
import tem from './login.html';

export default angular.module('login', [])
  .component('login', {
    template: tem,
    controller: loginCtrl
  })
  .name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> loginCtrl <span class="hljs-keyword">from</span> <span class="hljs-string">'./login'</span>
<span class="hljs-keyword">import</span> tem <span class="hljs-keyword">from</span> <span class="hljs-string">'./login.html'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> angular.<span class="hljs-built_in">module</span>(<span class="hljs-string">'login'</span>, [])
  .component(<span class="hljs-string">'login'</span>, {
    template: tem,
    controller: loginCtrl
  })
  .name;</code></pre>
<p>login.js(页面的业务逻辑在这里)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import url from '../../config/system.js';

class loginCtrl {
    static $inject = ['http'];
    constructor(http) {
        [this.http, this.name] = [http, `login`];
        this.str = `str${this.name}`;
    }
    login() {
         this.http.get({userName: 'link', userPassword: '123456'}, url.login, (data) => {
               console.info(&quot;success!&quot;)
          });   
    }
}
export default loginCtrl;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-keyword">import</span> url <span class="hljs-keyword">from</span> <span class="hljs-string">'../../config/system.js'</span>;

<span class="hljs-keyword">class</span> loginCtrl {
    <span class="hljs-keyword">static</span> $inject = [<span class="hljs-string">'http'</span>];
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">http</span>) {
        [<span class="hljs-keyword">this</span>.http, <span class="hljs-keyword">this</span>.name] = [http, <span class="hljs-string">`login`</span>];
        <span class="hljs-keyword">this</span>.str = <span class="hljs-string">`str<span class="hljs-subst">${this.name}</span>`</span>;
    }
    login() {
         <span class="hljs-keyword">this</span>.http.get({userName: <span class="hljs-string">'link'</span>, userPassword: <span class="hljs-string">'123456'</span>}, url.login, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
               <span class="hljs-built_in">console</span>.info(<span class="hljs-string">"success!"</span>)
          });   
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> loginCtrl;</code></pre>
<p>这个类主要完成的业务就是发送一个登陆http请求，这里的http是二次封装的一个服务，与注入原生依赖无异，有两种注入方式，一种是上边的在class中调用静态方法。即static $inject = ['http'];<br>另一种是loginCtrl.$inject = ['http'];(<strong><em>class不存在变量提升，确保写在class定义之后</em></strong>)</p>
<p>login.less(跟次登陆页面相关的样式，不贴代码了)。<br>这样就写好了一个页面组件，由index.js输出出去，输出到哪里呢？</p>
<h2 id="articleHeader9">统一管理页面组件</h2>
<p>在刚刚components目录下写好的login页面组件目录的同级，建立一个index.js，作用是用来统一管理组件页面。即：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import login from './login';
import register from './register';

export default angular.module('components', [
    login,
    register
]).name;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> login from <span class="hljs-string">'./login'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-keyword">register</span> from <span class="hljs-string">'./register'</span>;

<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> angular.<span class="hljs-keyword">module</span>(<span class="hljs-string">'components'</span>, [
    login,
    <span class="hljs-keyword">register</span>
]).name;</code></pre>
<p>然后再将这个页面输出到最开始的app.js。即，app.js中引入的components。其他同理，将服务，过滤器等等都统一以相关文件管理汇总起来，再由入口文件引入。<br>类似于一种树形的结构：<br><span class="img-wrap"><img data-src="/img/bVMXxy?w=812&amp;h=412" src="https://static.alili.tech/img/bVMXxy?w=812&amp;h=412" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>以上，就简单的构建好了一个webpack+es6+angular1.x的项目。</p>
<p>项目地址参考：<a href="https://github.com/jiwenjiang/angularSeed" rel="nofollow noreferrer" target="_blank">https://github.com/jiwenjiang...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack+es6+angular1.x项目构建

## 原文链接
[https://segmentfault.com/a/1190000009246295](https://segmentfault.com/a/1190000009246295)

