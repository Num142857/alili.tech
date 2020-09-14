---
title: '前端基础进阶（十五）：详解 ES6 Modules' 
date: 2018-12-19 2:30:07
hidden: true
slug: w0uhlzk3v3
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654403?w=1240&amp;h=272" src="https://static.alili.tech/img/remote/1460000009654403?w=1240&amp;h=272" alt="E S 6 M O D U L E S" title="E S 6 M O D U L E S" style="cursor: pointer; display: inline;"></span></p>
<p>对于新人朋友来说，想要自己去搞定一个ES6开发环境并不是一件容易的事情，因为构建工具的学习本身又是一个非常大的方向，我们需要花费不少的时间才能掌握它。</p>
<p>好在慢慢的开始有大神提供了一些非常简单易懂，学习成本非常低的解决方案来帮助大家学习。<code>create-react-app</code>就是这些解决方案中，个人认为最简单易懂的一种方式。</p>
<p>所以在学习ES6 modules之前，先跟大家介绍一下<code>create-react-app</code>的安装与使用。</p>
<blockquote>尽管<code>create-react-app</code>的目的是用于开发react程序，但是我们仅仅只用来学习ES6是再合适不过了。当然你也可以借助<code>vue-cli</code>来学习，同样十分简单。</blockquote>
<h5>1、确保自己的本地环境已经安装了node与npm</h5>
<p>通常安装的方式就是去node的官方网站下载安装，在安装node的时候，npm也会一起被安装。</p>
<p>下载地址： <a href="http://nodejs.cn/download/" rel="nofollow noreferrer" target="_blank">http://nodejs.cn/download/</a></p>
<h5>2、安装一个好用的命令行工具</h5>
<p>在windows环境下，系统默认的cmd非常难用，所以我个人比较推荐大家使用git.bash 或者 cmder。</p>
<p>git 下载地址： <a href="https://git-scm.com/downloads" rel="nofollow noreferrer" target="_blank">https://git-scm.com/downloads</a><br>在git安装目录下会有一个bash工具，找到安装目录直接使用即可。</p>
<p>cmder下载地址： <a href="http://cmder.net/" rel="nofollow noreferrer" target="_blank">http://cmder.net/</a></p>
<p>在mac上就方便很多了，你可以直接使用系统自带的terminal工具，就非常好用。但是一般我推荐大家使用iterm2，并安装oh my zsh插件。具体的配置大家可以自己去折腾，网上的教程应该足够帮助你搞定这一切了。</p>
<ul>
<li>iterm2 下载地址 <a href="http://www.iterm2.com/downloads.html" rel="nofollow noreferrer" target="_blank">http://www.iterm2.com/downloa...</a>
</li>
<li>oh my zsh 主题选择 <a href="https://github.com/robbyrussell/oh-my-zsh/wiki/External-themes" rel="nofollow noreferrer" target="_blank">https://github.com/robbyrusse...</a>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654404?w=1240&amp;h=827" src="https://static.alili.tech/img/remote/1460000009654404?w=1240&amp;h=827" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>另外还强烈推荐一款超高颜值的终端工具 <code>hyperTerm</code>。</p>
<p>这款工具的特色就是颜值高，第一感觉就是惊艳，大家不妨一试。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654405?w=1240&amp;h=859" src="https://static.alili.tech/img/remote/1460000009654405?w=1240&amp;h=859" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li>hyperTerm 下载地址 <a href="https://hyper.is/" rel="nofollow noreferrer" target="_blank">https://hyper.is/</a>
</li></ul>
<h5>3、安装create-react-app</h5>
<p>在命令行工具中使用查看版本的方式确保node与npm都安装好之后，我们就可以安装<code>create-react-app</code>了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> node -v
// 输出node版本号

> npm -v
// 输出npm版本号" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&gt; node -v
<span class="hljs-comment">// 输出node版本号</span>

&gt; npm -v
<span class="hljs-comment">// 输出npm版本号</span></code></pre>
<p>使用npm全局安装create-react-app</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install create-react-app -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; npm install create-react-app -g</code></pre>
<p>然后我们就可以使用<code>create-react-app</code>来创建我们的第一个项目。</p>
<p>找到一个你要存放项目的根目录，假设叫做<code>develop</code>，运行以下指令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> create-react-app es6app" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; create-react-app es6app</code></pre>
<p>create-react-app会自动帮助我们在develop目录下创建一个叫做es6app的文件夹，这就是我们新创建的项目。</p>
<p>当项目创建完成之后，在命令行工具中，我们会看到如图所示的提示。这些提示告诉了我们如何运行项目<code>npm start</code> ，如何打包项目<code>npm run build</code>等，这里我就不再赘述。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654406?w=1240&amp;h=859" src="https://static.alili.tech/img/remote/1460000009654406?w=1240&amp;h=859" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>项目创建完毕之后，进入该文件夹。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> cd es6app

// 查看文件夹里的内容
> ls" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&gt; cd es6app

<span class="hljs-comment">// 查看文件夹里的内容</span>
&gt; ls</code></pre>
<p>我们会发现里面有一个叫做<code>package.json</code>的文件，这个文件里包含了项目所需要的所有依赖。当我们第一次运行项目之前，还需要安装该文件里的依赖包。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; npm install</code></pre>
<p>安装完毕之后，我们就可以启动该项目了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&gt; npm start</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654407?w=1240&amp;h=859" src="https://static.alili.tech/img/remote/1460000009654407?w=1240&amp;h=859" alt="项目启动之后" title="项目启动之后" style="cursor: pointer;"></span></p>
<p>一般来说，启动之后会自动在浏览器中打开。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654408?w=1240&amp;h=924" src="https://static.alili.tech/img/remote/1460000009654408?w=1240&amp;h=924" alt="项目首次启动的页面" title="项目首次启动的页面" style="cursor: pointer;"></span></p>
<blockquote>
<code>create-react-app</code>已经自动帮助我们实现了热更新，因此当我们修改代码时，浏览器会自动更新。当然，如果我们仅仅只是修改页面样式时，热更新将会非常方便，但是如果你正在进行单页面的组件开发，可能热更新能够提供的帮助非常有限。</blockquote>
<h5>4、认识项目</h5>
<p>只要我们按照构建工具的规则进行开发，那么构建工具会自动帮助我们将代码进行整合，因此在该项目中开发时，我们并不需要自己来使用script或者link标签来引入js与css，所以认识create-react-app的规则就变得很重要。</p>
<p>初次创建的项目下，会有3个文件夹。</p>
<ul><li>node_modules</li></ul>
<p>项目依赖包存放位置。当我们运行<code>npm install</code>安装<code>package.json</code>中的依赖包时，该文件夹会自动创建，所有的依赖包会安装到该文件夹里。</p>
<ul><li>public</li></ul>
<p>主要的作用是html入口文件的存放。当然我们也可以存放其他公用的静态资源，如图片，css等。其中的<code>index.html</code>就是我们项目的入口html文件</p>
<ul><li>src</li></ul>
<p>组件的存放目录。在create-react-app创建的项目中，每一个单独的文件都可以被看成一个单独的模块，单独的image，单独的css，单独js等，而所有的组件都存放于src目录中，其中<code>index.js</code>则是js的入口文件。虽然我们并没有在<code>index.html</code>中使用script标签引入他，但是他的作用就和此一样。</p>
<p>当然，如果我们要进一步进行react的学习，那么肯定需要了解多一点的规则，但是在学习react之前，我们还是先把ES6 modules的知识搞定在说吧，所以，接下来你要做的事情就是，删掉src目录里的除了index.js之外的所有文件，并清空index.js，我们从0开始学习ES6 modules。</p>
<p>为了确保程序仍然能够正常运行，我们在index.js中随便写点代码测试一下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const app = document.querySelector('#root')
app.innerHTML = '啊，全部被清空啦，准备工作终于做完了，可以开始学习ES6啦'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> app = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#root'</span>)
app.innerHTML = <span class="hljs-string">'啊，全部被清空啦，准备工作终于做完了，可以开始学习ES6啦'</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654409?w=1240&amp;h=924" src="https://static.alili.tech/img/remote/1460000009654409?w=1240&amp;h=924" alt="一切正常，程序变得普通了，我们更容易理解" title="一切正常，程序变得普通了，我们更容易理解" style="cursor: pointer;"></span></p>
<p>那么我们就可以在这个环境下学习ES6的所有知识了，当然也包括ES6 modules。</p>
<h4>ES6 modules</h4>
<h5>1. 引入模块</h5>
<p>首先在<code>src</code>目录下创建一个<code>test.js</code>，在<code>test.js</code>中我们随便干点什么简单的事情即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/test.js
console.log('your first module');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/test.js</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'your first module'</span>);</code></pre>
<p>在index.js中通过<code>import</code>引入test.js，这是我们要学会的第一个语法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index.js
import test from './test'

console.log(test);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/index.js</span>
<span class="hljs-keyword">import</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'./test'</span>

<span class="hljs-built_in">console</span>.log(test);</code></pre>
<ul>
<li>
<code>import</code>表示引入一个模块，</li>
<li>test 我们暂时理解为引入模块的名字，</li>
<li>from表示从哪里引入</li>
<li>
<code>./test</code>为<code>./test.js</code>的简写，表示将要引入模块的路径</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654410?w=1240&amp;h=924" src="https://static.alili.tech/img/remote/1460000009654410?w=1240&amp;h=924" alt="结果是test中的代码执行，index.js中模块test为一个空对象" title="结果是test中的代码执行，index.js中模块test为一个空对象" style="cursor: pointer; display: inline;"></span></p>
<p>引入这个动作执行时，test.js中的代码也执行了。由于在<code>test.js</code>中并没有对外暴露任何接口，因此<code>index.js</code>中的<code>test</code>为一个空对象，那么对外暴露接口的方式，则是我们要学习的第二个语法。</p>
<h5>2. 对外提供接口</h5>
<p>ES6 modules使用<code>export</code>关键字对外提供接口，在我们刚才创建的<code>test.js</code>中，我们添加如下代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.js
const num = 20;
const arr = [1, 2, 3, 4];
const obj = {
    a: 0,
    b: function() {}
}
const foo = () => {
    const a = 0;
    const b = 20;
    return a + b;
}

export default {
    num,
    arr,
    obj,
    foo
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// test.js</span>
<span class="hljs-keyword">const</span> num = <span class="hljs-number">20</span>;
<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>];
<span class="hljs-keyword">const</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">b</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}
}
<span class="hljs-keyword">const</span> foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> b = <span class="hljs-number">20</span>;
    <span class="hljs-keyword">return</span> a + b;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    num,
    arr,
    obj,
    foo
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654411?w=1240&amp;h=386" src="https://static.alili.tech/img/remote/1460000009654411?w=1240&amp;h=386" alt="运行结果" title="运行结果" style="cursor: pointer;"></span></p>
<p>在<code>test.js</code>中，我们使用<code>export default</code>对包暴露了一个对象。他的意思就是当我们使用<code>import test from './test'</code>时，这个test对象就默认等于<code>export default</code>暴露的对象。</p>
<p>我们还可以在test.js中，仅仅通过<code>export</code>暴露几个方法与属性，我们来看看index.js中test会变成什么样子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/test.js
export const bar = () => {}
export const zcar = 12345;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/test.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> bar = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> zcar = <span class="hljs-number">12345</span>;</code></pre>
<p>保存运行后，我们发现，index.js中的test对象并没有变化，因为它仅仅等于<code>export default</code>抛出的对象，因此，为了获得模块<code>test.js</code>暴露的所有接口，我们得通过如下的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index.js
import * as test from './test';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/index.js</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> test <span class="hljs-keyword">from</span> <span class="hljs-string">'./test'</span>;</code></pre>
<p>其中的 <code>*</code> 表示所有，这是比较常用的通配符，as表示别名，<code>* as test</code>的意思是将test.js暴露的所有接口组成的对象，命名为test。那么我们在index.js中log出test，结果就如下。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654412?w=1236&amp;h=730" src="https://static.alili.tech/img/remote/1460000009654412?w=1236&amp;h=730" alt="看到结果，我们就很容易清楚的知道export与export default的区别与作用了，并且如何使用他们就变得很简单了" title="看到结果，我们就很容易清楚的知道export与export default的区别与作用了，并且如何使用他们就变得很简单了" style="cursor: pointer;"></span></p>
<p>如果大家还记得前面一篇文章里，我所讲的ES6解析结构的语法，那么对于如下的用法相信就不难理解。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/index.js
import test, { bar, zcar } from './test';

console.log(test);
console.log('bar:', bar);
console.log('zcar:', zcar);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/index.js</span>
<span class="hljs-keyword">import</span> test, { bar, zcar } <span class="hljs-keyword">from</span> <span class="hljs-string">'./test'</span>;

<span class="hljs-built_in">console</span>.log(test);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'bar:'</span>, bar);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'zcar:'</span>, zcar);</code></pre>
<p>test，仍然表示为<code>export default</code>暴露的对象，而 <code>{ bar, zcar }</code>则表示利用解析结构的语法，从整个返回对象中去取得对应的接口。输出结果也就很清晰了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009654413?w=1222&amp;h=442" src="https://static.alili.tech/img/remote/1460000009654413?w=1222&amp;h=442" alt="result" title="result" style="cursor: pointer;"></span></p>
<p>这种方式还是比较常见，比如我们在使用react时，常常这样使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span></code></pre>
<p>它其实暗示了React的封装方式，也暗示了我们应该如何去封装我们的模块。</p>
<blockquote>这里我们能够直接引入<code>react</code>的原因，是因为我们将它安装到了文件夹<code>node_modules</code>中，该文件夹中安装的所有模块都可以这样直接引用。例如我们安装一个jquery。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装jquery
> npm install jquery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 安装jquery</span>
&gt; npm install jquery</code></pre>
<p>然后在其他模块中就可以直接引入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import $ from 'jquery'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span></code></pre>
<p>这样，我们可以和往常一样使用jquery。<br>通过这样方式，我们还可以扩展更多的库，这就使得我们这个开发环境不仅仅能够用于react的开发，怎么用，完全取决与你自己。</p>
<p>OK，ES6 模块的基础语法大概就这些吧，他告诉了我们在ES6中，一个模块应该如何对外暴露接口与如何引入其他模块暴露的接口，这个知识点在实际开发中非常常用，因此虽然简单，但是不得不掌握，这也是大家进一步学习react或者vue的基础，主要的难点大概在于本地开发环境的折腾，如果你是初次折腾这些，可能会遇到一些小问题，所以一定要有一点耐心。</p>
<blockquote>通常来说，一个知识点，在完全理解之前还是有点难度的，但是理解之后就变得非常简单，所以如果你在学习这个知识点时感觉有点困难，也不要过于担心，多多动手尝试，并在实践中运用起来，相信很快就能掌握。</blockquote>
<p><a href="https://segmentfault.com/a/1190000012646488">前端基础进阶系列目录</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础进阶（十五）：详解 ES6 Modules

## 原文链接
[https://segmentfault.com/a/1190000012646438](https://segmentfault.com/a/1190000012646438)

