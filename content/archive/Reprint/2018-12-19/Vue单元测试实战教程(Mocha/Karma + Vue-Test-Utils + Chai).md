---
title: 'Vue单元测试实战教程(Mocha/Karma + Vue-Test-Utils + Chai)' 
date: 2018-12-19 2:30:07
hidden: true
slug: ee1x416s6l
categories: [reprint]
---

{{< raw >}}

                    
<p>在《<a href="https://www.jianshu.com/p/c817249616ee" rel="nofollow noreferrer" target="_blank">前端进阶之路: 前端架构设计(3) - 测试核心</a>》这边文章中, 通过分析了"传统手工测试的局限性" 去引出了测试驱动开发的理念, 并介绍了一些测试工具. 这篇文章我将通过一个Vue的项目, 去讲解如何使用mocha &amp; karma, 且结合vue官方推荐的<a href="https://vue-test-utils.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">vue-test-utils</a>去进行单元测试的实战.</p>
<h2 id="articleHeader0"><strong>一. 安装</strong></h2>
<p>我为本教程写一个<a href="https://github.com/Lee-Tanghui/Vue-Testing-Demo" rel="nofollow noreferrer" target="_blank">示例库</a>, 您可以直接跳过所有安装过程, 安装依赖后运行该示例项目: </p>
<p>如果想一步步进行安装, 也可以跟着下面的步骤进行操作:</p>
<h3 id="articleHeader1"><strong>(一) 使用脚手架初始化vue项目(使用webpack模板)</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//命令行中输入(默认阅读该文章的读者已经安装vue-cli和node环境)
vue init webpack vueunittest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//命令行中输入(默认阅读该文章的读者已经安装vue-cli和node环境)</span>
vue init webpack vueunittest</code></pre>
<p>注意, 当询问到这一步<code>Pick a test runner(Use arrow keys)</code>时, 请选择使用<code>Karma and Mocha</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654038?w=761&amp;h=146" src="https://static.alili.tech/img/remote/1460000012654038?w=761&amp;h=146" alt="选择Karma ad Mocha" title="选择Karma ad Mocha" style="cursor: pointer; display: inline;"></span></p>
<p>接下来的操作进入项目<code>npm install</code>安装相关依赖后(该步骤可能更会出现PhantomJS这个浏览器安装失败的报错, 不用理会, 因为  之后我们不使用这个浏览器), <code>npm run build</code>即可.</p>
<h3 id="articleHeader2"><strong>(二) 安装Karma-chrome-launch</strong></h3>
<p>接下来安装<code>karma-chrome-launcher</code>, 在命令行中输入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install karma-chrome-launcher --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">npm install karma-chrome-launcher --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span></code></pre>
<p>然后在项目中找到<code>test/unit/karma.conf.js</code>文件, 将<code>PhantomJS</code>浏览器修改为<code>Chrome</code>不要问我为什么不使用PhantomJS, 因为经常莫名的错误, 改成Chrome就不会!!!)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//karma.conf.js

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    //browsers: ['PhantomJS'],
    browsers: ['Chrome'],    
    
    ...
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//karma.conf.js</span>

<span class="hljs-keyword">var</span> webpackConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../build/webpack.test.conf'</span>)

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">config</span>) </span>{
  config.set({
    <span class="hljs-comment">//browsers: ['PhantomJS'],</span>
    browsers: [<span class="hljs-string">'Chrome'</span>],    
    
    ...
  })
}</code></pre>
<h3 id="articleHeader3"><strong>(三) 安装Vue-test-utils</strong></h3>
<p>安装Vue.js 官方的单元测试实用工具库, 在命令行输入:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev vue-test-utils" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install --save-dev vue-test-utils</code></pre>
<h3 id="articleHeader4"><strong>(四) 执行npm run unit</strong></h3>
<p>当你完成以上两步的时候, 你就可以在命令行执行<code>npm run unit</code>尝鲜你的第一次单元测试了, Vue脚手架已经初始化了一个<code>HelloWorld.spec.js</code>的测试文件去测试<code>HelloWrold.vue</code>, 你可以在<code>test/unit/specs/HelloWorld.spec.js</code>下找到这个测试文件.(<strong>提示: 将来所有的测试文件, 都将放<code>specs</code>这个目录下, 并以<code>测试脚本名.spec.js</code>结尾命名!</strong>)</p>
<p>在命令行输入<code>npm run unit</code>, 当你看到下图所示的一篇绿的时候, 说明你的单元测试通过了!</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654039?w=1404&amp;h=315" src="https://static.alili.tech/img/remote/1460000012654039?w=1404&amp;h=315" alt="第一次单元测试测试通过" title="第一次单元测试测试通过" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5"><strong>二. 测试工具的使用方法</strong></h2>
<p>下面是一个<code>Counter.vue</code>文件, 我将以该文件为基础讲解项目中测试工具的使用方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Counter.vue

<template>
  <div>
    <h3>Counter.vue</h3>
    "{{" count "}}"
    <button @click=&quot;increment&quot;>自增</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        count: 0
      }
    },

    methods: {
      increment () {
        this.count++
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//Counter.vue</span>

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Counter.vue<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    "{{" count "}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"increment"</span>&gt;</span>自增<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
  export default {
    data () {
      return {
        count: 0
      }
    },

    methods: {
      increment () {
        this.count++
      }
    }
  }
&lt;/</span>script&gt;</code></pre>
<h3 id="articleHeader6"><strong>(一) Mocha框架</strong></h3>
<h4><strong>1. Mocha测试脚本的写法</strong></h4>
<p>Mocha的作用是运行测试脚本, 要对上面<code>Counter.vue</code>进行测试, 我们就要写测试脚本, 通常测试脚本应该与Vue组件名相同, 后缀为<code>spec.js</code>. 比如, <code>Counter.vue</code>组件的测试脚本名字就应该为<code>Counter.spec.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Counter.spec.js

import Vue from 'vue'
import Counter from '@/components/Counter'

describe('Counter.vue', () => {

  it('点击按钮后, count的值应该为1', () => {
    //获取组件实例
    const Constructor = Vue.extend(Counter);
    //挂载组件
    const vm = new Constructor().$mount();
    //获取button
    const button = vm.$el.querySelector('button');
    //新建点击事件
    const clickEvent = new window.Event('click');
    //触发点击事件
    button.dispatchEvent(clickEvent);
    //监听点击事件
    vm._watcher.run();
    // 断言:count的值应该是数字1
    expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1);
  })

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//Counter.spec.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Counter'</span>

describe(<span class="hljs-string">'Counter.vue'</span>, () =&gt; {

  it(<span class="hljs-string">'点击按钮后, count的值应该为1'</span>, () =&gt; {
    <span class="hljs-comment">//获取组件实例</span>
    <span class="hljs-keyword">const</span> Constructor = Vue.extend(Counter);
    <span class="hljs-comment">//挂载组件</span>
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Constructor().$mount();
    <span class="hljs-comment">//获取button</span>
    <span class="hljs-keyword">const</span> button = vm.$el.querySelector(<span class="hljs-string">'button'</span>);
    <span class="hljs-comment">//新建点击事件</span>
    <span class="hljs-keyword">const</span> clickEvent = <span class="hljs-keyword">new</span> <span class="hljs-built_in">window</span>.Event(<span class="hljs-string">'click'</span>);
    <span class="hljs-comment">//触发点击事件</span>
    button.dispatchEvent(clickEvent);
    <span class="hljs-comment">//监听点击事件</span>
    vm._watcher.run();
    <span class="hljs-comment">// 断言:count的值应该是数字1</span>
    expect(<span class="hljs-built_in">Number</span>(vm.$el.querySelector(<span class="hljs-string">'.num'</span>).textContent)).to.equal(<span class="hljs-number">1</span>);
  })

})</code></pre>
<p>上面这段代码就是一个测试脚本.测试脚本应该包含一个或多个<code>describe</code>, 每个<code>describe</code>块应该包括一个或多个<code>it</code>块</p>
<p><code>describe</code>块称为"测试套件"(test suite), 表示一组相关的测试. 它是一个函数, 第一个参数是测试套件的名称(通常写测试组件的名称, 这里即为<code>Counter.js</code>), 第二个参数是一个实际执行的函数.</p>
<p><code>it</code>块称为"测试用例"(test case), 表示一个单独的测试, 是测试的最小单位. 它也是一个函数, 第一个参数是测试用例的名称(通常描述你的断言结果, 这里即为<code>"点击按钮后, count的值应该为1"</code>), 第二个参数是一个实际执行的函数.</p>
<h4><strong>2. Mocha进行异步测试</strong></h4>
<p>我们在<code>Counter.vue</code>组件中添加一个按钮, 并添加一个异步自增的方法为<code>incrementByAsync</code>, 该函数设置一个延时器, 1000ms后<code>count</code>自增1.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <template>
    ...
    <button @click=&quot;increment&quot;>自增</button>
    <button @click=&quot;incrementByAsync&quot;>异步自增</button>
    ...
  <template>
  
  <script>
     ...
     methods: {
      ...
      incrementByAsync () {
        window.setTimeout(() => {
          this.count++;
        }, 1000) 
      }
    }
  </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  &lt;template&gt;
    ...
    &lt;button @click=<span class="hljs-string">"increment"</span>&gt;自增&lt;<span class="hljs-regexp">/button&gt;
    &lt;button @click="incrementByAsync"&gt;异步自增&lt;/</span>button&gt;
    ...
  &lt;template&gt;
  
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
     ...
     methods: {
      ...
      incrementByAsync () {
        <span class="hljs-built_in">window</span>.setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.count++;
        }, <span class="hljs-number">1000</span>) 
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>给测试脚本中新增一个测试用例, 也就是<code>it()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('count异步更新, count的值应该为1', (done) => {
    ///获取组件实例
    const Constructor = Vue.extend(Counter);
    //挂载组件
    const vm = new Constructor().$mount();
    //获取button
    const button = vm.$el.querySelectorAll('button')[1];
    //新建点击事件
    const clickEvent = new window.Event('click');

    //触发点击事件
    button.dispatchEvent(clickEvent);
    //监听点击事件
    vm._watcher.run();
    //1s后进行断言
    window.setTimeout(() => {
      // 断言:count的值应该是数字1
      expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1);
      done();
    }, 1000);
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>  it('count异步更新, count的值应该为<span class="hljs-number">1</span>', (<span class="hljs-name">done</span>) =&gt; {
    ///获取组件实例
    const Constructor = Vue.extend(<span class="hljs-name">Counter</span>)<span class="hljs-comment">;</span>
    //挂载组件
    const vm = new Constructor().$mount()<span class="hljs-comment">;</span>
    //获取button
    const button = vm.$el.querySelectorAll('button')[<span class="hljs-number">1</span>]<span class="hljs-comment">;</span>
    //新建点击事件
    const clickEvent = new window.Event('click')<span class="hljs-comment">;</span>

    //触发点击事件
    button.dispatchEvent(<span class="hljs-name">clickEvent</span>)<span class="hljs-comment">;</span>
    //监听点击事件
    vm._watcher.run()<span class="hljs-comment">;</span>
    //1s后进行断言
    window.setTimeout(() =&gt; {
      // 断言<span class="hljs-symbol">:count</span>的值应该是数字<span class="hljs-number">1</span>
      expect(<span class="hljs-name">Number</span>(<span class="hljs-name">vm</span>.$el.querySelector('.num').textContent)).to.equal(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
      done()<span class="hljs-comment">;</span>
    }, <span class="hljs-number">1000</span>)<span class="hljs-comment">;</span>
  })</code></pre>
<p>Mocha中的异步测试, 需要给<code>it()</code>内函数的参数中添加一个<code>done</code>, 并在异步执行完后必须调用<code>done()</code>, 如果不调用<code>done()</code>, 那么Mocha会在2000ms后报错且本次单元测试测试失败(mocha默认的异步测试超时上线为2000ms), 错误信息如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654040?w=1299&amp;h=183" src="https://static.alili.tech/img/remote/1460000012654040?w=1299&amp;h=183" alt="未调用done()的报错" title="未调用done()的报错" style="cursor: pointer;"></span></p>
<h4><strong>3. Mocha的测试钩子</strong></h4>
<p>如果大家对于vue的<code>mounted()</code>, <code>created()</code>钩子能够理解的话, 对Mocha的钩子也很容易理解, Mocha在<code>describe</code>块中提供了四个钩子: <code>before()</code>, <code>after()</code>, <code>beforeEach()</code>, <code>afterEach()</code>. 它们会在以下时间执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="describe('钩子说明', function() {

  before(function() {
    // 在本区块的所有测试用例之前执行
  });

  after(function() {
    // 在本区块的所有测试用例之后执行
  });

  beforeEach(function() {
    // 在本区块的每个测试用例之前执行
  });

  afterEach(function() {
    // 在本区块的每个测试用例之后执行
  });

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">describe(<span class="hljs-string">'钩子说明'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

  before(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 在本区块的所有测试用例之前执行</span>
  });

  after(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 在本区块的所有测试用例之后执行</span>
  });

  beforeEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 在本区块的每个测试用例之前执行</span>
  });

  afterEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 在本区块的每个测试用例之后执行</span>
  });

});</code></pre>
<p>上述就是Mocha的基本使用介绍, 如果想了解Mocha的更多使用方法, 可以查看下面的文档和一篇阮一峰的Mocha教程:</p>
<blockquote><ul><li>Mocha官方文档 : <a href="https://mochajs.org/" rel="nofollow noreferrer" target="_blank">https://mochajs.org/</a>
</li></ul></blockquote>
<ul>
<li>Mocha官方文档翻译 : <a href="http://www.jianshu.com/p/9c78548caffa" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/9c78...</a>
</li>
<li>阮一峰 - 测试框架 Mocha 实例教程 :  <a href="http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a>
</li>
</ul>
<h3 id="articleHeader7"><strong>(二) Chai断言库</strong></h3>
<p>上面的测试用例中, 以<code>expect()</code>方法开头的就是<strong>断言</strong>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="expect(Number(vm.$el.querySelector('.num').textContent)).to.equal(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">expect(<span class="hljs-built_in">Number</span>(vm.$el.querySelector(<span class="hljs-string">'.num'</span>).textContent)).to.equal(<span class="hljs-number">1</span>);</code></pre>
<p>所谓断言, 就是判断源码的实际执行结果与预期结果是否一致, 如果不一致, 就会抛出错误. 上面的断言的意思是指: 有<code>.num</code>这类名的节点的内容应该为数字1. 断言库库有很多种, Mocha并不限制你需要使用哪一种断言库,  Vue的脚手架提供的断言库是<code>sino-chai</code>, 是一个基于<code>Chai</code>的断言库, 并且我们指定使用的是它的<code>expect</code>断言风格.</p>
<p><code>expect</code>断言风格的优点很接近于自然语言, 下面是一些例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 相等或不相等
  expect(1 + 1).to.be.equal(2);
  expect(1 + 1).to.be.not.equal(3);

  // 布尔值为true
  expect('hello').to.be.ok;
  expect(false).to.not.be.ok;

  // typeof
  expect('test').to.be.a('string');
  expect({ foo: 'bar' }).to.be.an('object');
  expect(foo).to.be.an.instanceof(Foo);

  // include
  expect([1,2,3]).to.include(2);
  expect('foobar').to.contain('foo');
  expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

  // empty
  expect([]).to.be.empty;
  expect('').to.be.empty;
  expect({}).to.be.empty;
  
  // match
  expect('foobar').to.match(/^foo/);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">// 相等或不相等</span>
  expect(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>).to.be.equal(<span class="hljs-number">2</span>);
  expect(<span class="hljs-number">1</span> + <span class="hljs-number">1</span>).to.be.not.equal(<span class="hljs-number">3</span>);

  <span class="hljs-comment">// 布尔值为true</span>
  expect(<span class="hljs-string">'hello'</span>).to.be.ok;
  expect(<span class="hljs-literal">false</span>).to.not.be.ok;

  <span class="hljs-comment">// typeof</span>
  expect(<span class="hljs-string">'test'</span>).to.be.a(<span class="hljs-string">'string'</span>);
  expect({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span> }).to.be.an(<span class="hljs-string">'object'</span>);
  expect(foo).to.be.an.instanceof(Foo);

  <span class="hljs-comment">// include</span>
  expect([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]).to.include(<span class="hljs-number">2</span>);
  expect(<span class="hljs-string">'foobar'</span>).to.contain(<span class="hljs-string">'foo'</span>);
  expect({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>, <span class="hljs-attr">hello</span>: <span class="hljs-string">'universe'</span> }).to.include.keys(<span class="hljs-string">'foo'</span>);

  <span class="hljs-comment">// empty</span>
  expect([]).to.be.empty;
  expect(<span class="hljs-string">''</span>).to.be.empty;
  expect({}).to.be.empty;
  
  <span class="hljs-comment">// match</span>
  expect(<span class="hljs-string">'foobar'</span>).to.match(<span class="hljs-regexp">/^foo/</span>);
</code></pre>
<p>每一个<code>it()</code>所包裹的测试用例都应该有一句或多句断言,上面只是介绍了一部分的断言语法, 如果想要知道更多<code>Chai</code>的断言语法, 请查看以下的官方文档.</p>
<blockquote><ul><li>Chai官方文档: <a href="http://chaijs.com/" rel="nofollow noreferrer" target="_blank">http://chaijs.com/</a>
</li></ul></blockquote>
<ul><li>Chai官方文档翻译: <a href="http://www.jianshu.com/p/f200a75a15d2" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/f200...</a>
</li></ul>
<h3 id="articleHeader8"><strong>(三) Vue-test-utils测试库</strong></h3>
<h4><strong>1. 在测试脚本中引入vue-test-utils</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Counter.spec.js

import Vue from 'vue'
import Counter from '@/components/Counter'
//引入vue-test-utils
import {mount} from 'vue-test-utils'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//Counter.spec.js</span>

<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Counter <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Counter'</span>
<span class="hljs-comment">//引入vue-test-utils</span>
<span class="hljs-keyword">import</span> {mount} <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-test-utils'</span></code></pre>
<h4><strong>2. 测试文本内容</strong></h4>
<p>下面我将在<code>Counter.spec.js</code>测试脚本中对<code>Counter.vue</code>中<code>&lt;h3&gt;</code>的文本内容进行测试, 大家可以直观的感受一下使用了Vue-test-utils后对<code>.vue</code>单文件组件的测试变得多么简单.</p>
<ul><li>未使用vue-test-utils的测试用例:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('未使用Vue-test-utils: 正确渲染h3的文字为Counter.vue', () => {
    const Constructor = Vue.extend(Counter);
    const vm = new Constructor().$mount();
    const H3 = vm.$el.querySelector('h3').textContent;
    expect(H3).to.equal('Counter.vue');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'未使用Vue-test-utils: 正确渲染h3的文字为Counter.vue'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> Constructor = Vue.extend(Counter);
    <span class="hljs-keyword">const</span> vm = <span class="hljs-keyword">new</span> Constructor().$mount();
    <span class="hljs-keyword">const</span> H3 = vm.$el.querySelector(<span class="hljs-string">'h3'</span>).textContent;
    expect(H3).to.equal(<span class="hljs-string">'Counter.vue'</span>);
  })</code></pre>
<ul><li>使用了vue-test-utils的测试用例:</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('使用Vue-test-Utils: 正确渲染h3的文字为Counter.vue', () => {
    const wrapper = mount(Counter);
    expect(wrapper.find('h3').text()).to.equal('Counter.vue');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'使用Vue-test-Utils: 正确渲染h3的文字为Counter.vue'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(Counter);
    expect(wrapper.find(<span class="hljs-string">'h3'</span>).text()).to.equal(<span class="hljs-string">'Counter.vue'</span>);
  })</code></pre>
<p>从上面的代码可以看出, vue-test-utils工具将该测试用例的代码量减少了一半, 如果是更复杂的测试用例, 那么代码量的减少将更为突出.  它可以让我们更专注于去写文件的测试逻辑, 将获取组件实例和挂载的繁琐的操作交由vue-test-utils去完成.</p>
<h4><strong>3. vue-test-utils的常用API</strong></h4>
<ul>
<li><strong><code>find()</code>: 返回匹配选择器的第一个DOM节点或Vue组件的<code>wrapper</code>, 可以使用任何有效的选择器</strong></li>
<li><strong><code>text()</code>: 返回<code>wrapper</code>的文本内容</strong></li>
<li><strong><code>html()</code>: 返回<code>wrapper DOM</code>的HTML字符串</strong></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('find()/text()/html()方法', () => {
    const wrapper = mount(Counter);
    const h3 = wrapper.find('h3');
    expect(h3.text()).to.equal('Counter.vue');
    expect(h3.html()).to.equal('<h3>Counter.vue</h3>');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'find()/text()/html()方法'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(Counter);
    <span class="hljs-keyword">const</span> h3 = wrapper.find(<span class="hljs-string">'h3'</span>);
    expect(h3.text()).to.equal(<span class="hljs-string">'Counter.vue'</span>);
    expect(h3.html()).to.equal(<span class="hljs-string">'&lt;h3&gt;Counter.vue&lt;/h3&gt;'</span>);
  })</code></pre>
<ul><li><strong><code>trigger()</code>: 在该 <code>wrapper DOM</code> 节点上触发一个事件。</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('trigger()方法', () => {
    const wrapper = mount(Counter);
    const buttonOfSync = wrapper.find('.sync-button');
    buttonOfSync.trigger('click');
    buttonOfSync.trigger('click');
    const count = Number(wrapper.find('.num').text());
    expect(count).to.equal(2);
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'trigger()方法'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(Counter);
    <span class="hljs-keyword">const</span> buttonOfSync = wrapper.find(<span class="hljs-string">'.sync-button'</span>);
    buttonOfSync.trigger(<span class="hljs-string">'click'</span>);
    buttonOfSync.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> count = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.num'</span>).text());
    expect(count).to.equal(<span class="hljs-number">2</span>);
  })</code></pre>
<ul><li><strong><code>setData()</code>: 设置<code>data</code>的属性并强制更新</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('setData()方法',() => {
    const wrapper = mount(Counter);
    wrapper.setData({foo: 'bar'});
    expect(wrapper.vm.foo).to.equal('bar');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'setData()方法'</span>,() =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(Counter);
    wrapper.setData({<span class="hljs-attr">foo</span>: <span class="hljs-string">'bar'</span>});
    expect(wrapper.vm.foo).to.equal(<span class="hljs-string">'bar'</span>);
  })</code></pre>
<p>上面介绍了几个vue-test-utils提供的方法, 如果想深入学习vue-test-utils, 请阅读下面的官方文档:</p>
<blockquote><ul><li>vue-test-utils官方文档: <a href="https://vue-test-utils.vuejs.org/zh-cn/" rel="nofollow noreferrer" target="_blank">https://vue-test-utils.vuejs....</a>
</li></ul></blockquote>
<h2 id="articleHeader9"><strong>三. 项目说明</strong></h2>
<p>该项目模仿了一个简单的微博, 在<a href="https://github.com/Lee-Tanghui/Vue-Testing-Demo" rel="nofollow noreferrer" target="_blank">代码仓库</a>下载后, 可直接通过<code>npm run dev</code>运行.</p>
<h4><strong>(一) 项目效果图</strong></h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654041?w=1903&amp;h=960" src="https://static.alili.tech/img/remote/1460000012654041?w=1903&amp;h=960" alt="项目展示" title="项目展示" style="cursor: pointer; display: inline;"></span></p>
<h4><strong>(二) 项目中的交互逻辑和需求</strong></h4>
<ol>
<li>在文本框中输入内容后点击"发布"按钮(1), 会新发布内容到微博列表中, 且个人头像等下的微博数量(6)会增加1个</li>
<li>当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框, 叫用户输入内容</li>
<li>当点击"关注"(2), 个人头像下关注的数量(5)会增加1个, 且按钮内字体变成"取消关注"; 当点击"取消关注"(2), 个人头像下的数量(5)会减少1个, 且按钮内字体变成"关注"</li>
<li>当点击"收藏"(3)时, 我的收藏(7)会增加1个数量, 且按钮内文字变成"已收藏"; 点击"已收藏"(3)时, 我的收藏(7)会减少1个数量, 且按钮内文字变成"收藏"</li>
<li>当点击"赞"(4), 我的赞(8)会增加1个数量, 且按钮内文字变成"取消赞"; 点击"取消赞"(3)时, 我的赞(8)会减少1个数量, 且按钮内文字变成"赞"</li>
</ol>
<h4><strong>(三) 项目源码</strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//SinaWeibo.vue

<template>
  <div class=&quot;weibo-page&quot;>
    <nav>
      <span class=&quot;weibo-logo&quot;></span>
      <div class=&quot;search-wrapper&quot;>
        <input type=&quot;text&quot; placeholder=&quot;大家正在搜: 李棠辉的文章好赞!&quot;>
        <img v-if=&quot;!iconActive&quot; @mouseover=&quot;mouseOverToIcon&quot; src=&quot;../../static/image/search.png&quot; alt=&quot;搜索icon&quot;>
        <img v-if=&quot;iconActive&quot; @mouseout=&quot;mouseOutToIcon&quot; src=&quot;../../static/image/search-active.png&quot; alt=&quot;搜索icon&quot;>
      </div>
    </nav>
    <div class=&quot;main-container&quot;>
      <aside class=&quot;aside-nav&quot;>
        <ul>
          <li :class=&quot;{ active: isActives[indexOfContent] }&quot; v-for=&quot;(content, indexOfContent) in asideTab&quot; :key=&quot;indexOfContent&quot; @click=&quot;tabChange(indexOfContent)&quot;>
            <span>"{{"content"}}"</span>
            <span class=&quot;count&quot;>
              <span v-if=&quot;indexOfContent === 1&quot;>("{{"collectNum"}}")</span>
              <span v-if=&quot;indexOfContent === 2&quot;>("{{"likeNum"}}")</span>              
            </span>
          </li>
        </ul>
      </aside>
      <main class=&quot;weibo-content&quot;>
        <div class=&quot;weibo-publish-wrapper&quot;>
          <img src=&quot;../../static/image/tell-people.png&quot;></img>
          <textarea v-model=&quot;newWeiboContent.content&quot;></textarea>
          <button @click=&quot;publishNewWeiboContent&quot;>发布</button>
        </div>
        <div 
          class=&quot;weibo-news&quot; 
          v-for=&quot;(news, indexOfNews) in weiboNews&quot;
          :key=&quot;indexOfNews&quot;>
          <div class=&quot;content-wrapper&quot;>
            <div class=&quot;news-title&quot;>
            <div class=&quot;news-title__left&quot;>
              <img :src=&quot;news.imgUrl&quot;>
              <div class=&quot;title-text&quot;>
                <div class=&quot;title-name&quot;>"{{"news.name"}}"</div>
                <div class=&quot;title-time&quot;>"{{"news.resource"}}"</div>
              </div>
            </div>
            <button 
              class=&quot;news-title__right add&quot; 
              v-if=&quot;news.attention === false&quot;
              @click=&quot;attention(indexOfNews)&quot;>
              <i class=&quot;fa fa-plus&quot;></i>
              关注
            </button>
             <button 
              class=&quot;news-title__right cancel&quot; 
              v-if=&quot;news.attention === true&quot;
              @click=&quot;unAttention(indexOfNews)&quot;>
              <i class=&quot;fa fa-close&quot;></i>
              取消关注
            </button>
          </div>
          <div class=&quot;news-content&quot;>"{{"news.content"}}"</div>
          <div class=&quot;news-image&quot; v-if=&quot;news.images.length&quot;>
            <img 
            v-for=&quot;(img, indexOfImg) in news.images&quot;
            :key=&quot;indexOfImg&quot;
            :src=&quot;img&quot;>
          </div>
          </div>
          <ul class=&quot;news-panel&quot;>
            <li @click=&quot;handleCollect(indexOfNews)&quot;>
              <i class=&quot;fa fa-star-o&quot; :class=&quot;{collected: news.collect }&quot;></i>
              "{{"news.collect ? &quot;已收藏&quot; : '收藏'"}}"
            </li>
            <li>
              <i class=&quot;fa fa-external-link&quot;></i>
              转发
            </li>
            <li>
              <i class=&quot;fa fa-commenting-o&quot;></i>
              评论
            </li>
            <li @click=&quot;handleLike(indexOfNews)&quot;>
              <i class=&quot;fa fa-thumbs-o-up&quot; :class=&quot;{liked: news.like}&quot;></i>
              "{{"news.like ? '取消赞' : '赞'"}}"
            </li>
          </ul>
        </div>

      </main>
      <aside class=&quot;aside-right&quot;>
        <div class=&quot;profile-wrapper&quot;>
          <div class=&quot;profile-top&quot;>
            <img src=&quot;../../static/image/profile.jpg&quot;>
          </div>
          <div class=&quot;profile-bottom&quot;>
            <div class=&quot;profile-name&quot;>Lee_tanghui</div>
            <ul class=&quot;profile-info&quot;>
              <li 
                v-for=&quot;(profile, indexOfProfile) in profileData&quot;
                :key=&quot;indexOfProfile&quot;>
                <div class=&quot;number&quot;>"{{"profile.num"}}"</div>
                <div class=&quot;text&quot;>"{{"profile.text"}}"</div>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
    <footer>
       Wish you like my blog! --- LITANGHUI
    </footer>
  </div>
</template>

<script>
  //引入假数据
  import * as mockData from '../mock-data.js'

  export default {
    mounted() {
      //模拟获取数据
      this.profileData = mockData.profileData;
      this.weiboNews = mockData.weiboNews;
      this.collectNum = mockData.collectNum;
      this.likeNum = mockData.likeNum;

    },
    data() {
      return {
        iconActive: false,
        asideTab: [&quot;首页&quot;, &quot;我的收藏&quot;, &quot;我的赞&quot;],
        isActives: [true, false, false],
        profileData: [],
        weiboNews: [],
        collectNum: 0,
        likeNum: 0,
        newWeiboContent:   {
          imgUrl: '../../static/image/profile.jpg',
          name: 'Lee_tanghui',
          resource: '刚刚 来自 网页版微博',
          content: '',
          images: []
        },
      }
    },
    methods: {
      mouseOverToIcon() {
        this.iconActive = true;
      },
      mouseOutToIcon() {
        this.iconActive = false;
      },
      tabChange(indexOfContent) {
        this.isActives.forEach((item, index) => {
          index === indexOfContent ?
            this.$set(this.isActives, index, true) :
            this.$set(this.isActives, index, false);
        })
      },
      publishNewWeiboContent() {
        if(!this.newWeiboContent.content) {
          alert('请输入内容!')
          return;
        }
        const newWeibo = JSON.parse(JSON.stringify(this.newWeiboContent));
        this.weiboNews.unshift(newWeibo);
        this.newWeiboContent.content = '';
        this.profileData[2].num++;
      },
      attention(index) {
        this.weiboNews[index].attention = true;    
        this.profileData[0].num++;    
      },
      unAttention(index) {
        this.weiboNews[index].attention = false;
        this.profileData[0].num--;
      },
      handleCollect(index) {
        this.weiboNews[index].collect = !this.weiboNews[index].collect;
        this.weiboNews[index].collect ? 
        this.collectNum++ :
        this.collectNum--;
      },
      handleLike(index) {
        this.weiboNews[index].like = !this.weiboNews[index].like;
        this.weiboNews[index].like ? 
        this.likeNum++ :
        this.likeNum--;
      }
    }
  }
</script>

<style lang=&quot;less&quot;>
  //css部分略
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//SinaWeibo.vue</span>

&lt;template&gt;
  &lt;div class="weibo-page"&gt;
    &lt;nav&gt;
      &lt;span class="weibo-logo"&gt;&lt;/span&gt;
      &lt;div class="search-wrapper"&gt;
        &lt;input type="text" placeholder="大家正在搜: 李棠辉的文章好赞!"&gt;
        &lt;img v-if="!iconActive" @mouseover="mouseOverToIcon" src="../../static/image/search.png" alt="搜索icon"&gt;
        &lt;img v-if="iconActive" @mouseout="mouseOutToIcon" src="../../static/image/search-active.png" alt="搜索icon"&gt;
      &lt;/div&gt;
    &lt;/nav&gt;
    &lt;div class="main-container"&gt;
      &lt;aside class="aside-nav"&gt;
        &lt;ul&gt;
          &lt;li :class="{ active: isActives[indexOfContent] }" v-for="(content, indexOfContent) in asideTab" :key="indexOfContent" @click="tabChange(indexOfContent)"&gt;
            &lt;span&gt;"{{"content"}}"&lt;/span&gt;
            &lt;span class="count"&gt;
              &lt;span v-if="indexOfContent === 1"&gt;("{{"collectNum"}}")&lt;/span&gt;
              &lt;span v-if="indexOfContent === 2"&gt;("{{"likeNum"}}")&lt;/span&gt;              
            &lt;/span&gt;
          &lt;/li&gt;
        &lt;/ul&gt;
      &lt;/aside&gt;
      &lt;main class="weibo-content"&gt;
        &lt;div class="weibo-publish-wrapper"&gt;
          &lt;img src="../../static/image/tell-people.png"&gt;&lt;/img&gt;
          &lt;textarea v-model="newWeiboContent.content"&gt;&lt;/textarea&gt;
          &lt;button @click="publishNewWeiboContent"&gt;发布&lt;/button&gt;
        &lt;/div&gt;
        &lt;div 
          class="weibo-news" 
          v-for="(news, indexOfNews) in weiboNews"
          :key="indexOfNews"&gt;
          &lt;div class="content-wrapper"&gt;
            &lt;div class="news-title"&gt;
            &lt;div class="news-title__left"&gt;
              &lt;img :src="news.imgUrl"&gt;
              &lt;div class="title-text"&gt;
                &lt;div class="title-name"&gt;"{{"news.name"}}"&lt;/div&gt;
                &lt;div class="title-time"&gt;"{{"news.resource"}}"&lt;/div&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;button 
              class="news-title__right add" 
              v-if="news.attention === false"
              @click="attention(indexOfNews)"&gt;
              &lt;i class="fa fa-plus"&gt;&lt;/i&gt;
              关注
            &lt;/button&gt;
             &lt;button 
              class="news-title__right cancel" 
              v-if="news.attention === true"
              @click="unAttention(indexOfNews)"&gt;
              &lt;i class="fa fa-close"&gt;&lt;/i&gt;
              取消关注
            &lt;/button&gt;
          &lt;/div&gt;
          &lt;div class="news-content"&gt;"{{"news.content"}}"&lt;/div&gt;
          &lt;div class="news-image" v-if="news.images.length"&gt;
            &lt;img 
            v-for="(img, indexOfImg) in news.images"
            :key="indexOfImg"
            :src="img"&gt;
          &lt;/div&gt;
          &lt;/div&gt;
          &lt;ul class="news-panel"&gt;
            &lt;li @click="handleCollect(indexOfNews)"&gt;
              &lt;i class="fa fa-star-o" :class="{collected: news.collect }"&gt;&lt;/i&gt;
              "{{"news.collect ? "已收藏" : '收藏'"}}"
            &lt;/li&gt;
            &lt;li&gt;
              &lt;i class="fa fa-external-link"&gt;&lt;/i&gt;
              转发
            &lt;/li&gt;
            &lt;li&gt;
              &lt;i class="fa fa-commenting-o"&gt;&lt;/i&gt;
              评论
            &lt;/li&gt;
            &lt;li @click="handleLike(indexOfNews)"&gt;
              &lt;i class="fa fa-thumbs-o-up" :class="{liked: news.like}"&gt;&lt;/i&gt;
              "{{"news.like ? '取消赞' : '赞'"}}"
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/div&gt;

      &lt;/main&gt;
      &lt;aside class="aside-right"&gt;
        &lt;div class="profile-wrapper"&gt;
          &lt;div class="profile-top"&gt;
            &lt;img src="../../static/image/profile.jpg"&gt;
          &lt;/div&gt;
          &lt;div class="profile-bottom"&gt;
            &lt;div class="profile-name"&gt;Lee_tanghui&lt;/div&gt;
            &lt;ul class="profile-info"&gt;
              &lt;li 
                v-for="(profile, indexOfProfile) in profileData"
                :key="indexOfProfile"&gt;
                &lt;div class="number"&gt;"{{"profile.num"}}"&lt;/div&gt;
                &lt;div class="text"&gt;"{{"profile.text"}}"&lt;/div&gt;
              &lt;/li&gt;
            &lt;/ul&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/aside&gt;
    &lt;/div&gt;
    &lt;footer&gt;
       Wish you like my blog! --- LITANGHUI
    &lt;/footer&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  //引入假数据
  import * as mockData from '../mock-data.js'

  export default {
    mounted() {
      //模拟获取数据
      this.profileData = mockData.profileData;
      this.weiboNews = mockData.weiboNews;
      this.collectNum = mockData.collectNum;
      this.likeNum = mockData.likeNum;

    },
    data() {
      return {
        iconActive: false,
        asideTab: ["首页", "我的收藏", "我的赞"],
        isActives: [true, false, false],
        profileData: [],
        weiboNews: [],
        collectNum: 0,
        likeNum: 0,
        newWeiboContent:   {
          imgUrl: '../../static/image/profile.jpg',
          name: 'Lee_tanghui',
          resource: '刚刚 来自 网页版微博',
          content: '',
          images: []
        },
      }
    },
    methods: {
      mouseOverToIcon() {
        this.iconActive = true;
      },
      mouseOutToIcon() {
        this.iconActive = false;
      },
      tabChange(indexOfContent) {
        this.isActives.forEach((item, index) =&gt; {
          index === indexOfContent ?
            this.$set(this.isActives, index, true) :
            this.$set(this.isActives, index, false);
        })
      },
      publishNewWeiboContent() {
        if(!this.newWeiboContent.content) {
          alert('请输入内容!')
          return;
        }
        const newWeibo = JSON.parse(JSON.stringify(this.newWeiboContent));
        this.weiboNews.unshift(newWeibo);
        this.newWeiboContent.content = '';
        this.profileData[2].num++;
      },
      attention(index) {
        this.weiboNews[index].attention = true;    
        this.profileData[0].num++;    
      },
      unAttention(index) {
        this.weiboNews[index].attention = false;
        this.profileData[0].num--;
      },
      handleCollect(index) {
        this.weiboNews[index].collect = !this.weiboNews[index].collect;
        this.weiboNews[index].collect ? 
        this.collectNum++ :
        this.collectNum--;
      },
      handleLike(index) {
        this.weiboNews[index].like = !this.weiboNews[index].like;
        this.weiboNews[index].like ? 
        this.likeNum++ :
        this.likeNum--;
      }
    }
  }
&lt;/script&gt;

&lt;style lang="less"&gt;
  //css部分略
&lt;/style&gt;</code></pre>
<h2 id="articleHeader10"><strong>四. 项目单元测试脚本实战</strong></h2>
<p>我们将以上文提到的"项目中的交互逻辑和需求"为基础, 为<code>SinaWeibo.vue</code>编写测试脚本, 下面我将展示测试用例编写过程:</p>
<p>1.在文本框中输入内容后点击"发布"按钮(1), 会新发布内容到微博列表中, 且个人头像等下的微博数量(6)会增加1个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('点击发布按钮,发布新内容&amp;个人微博数量增加1个', () => {
    const wrapper = mount(SinaWeibo);
    const textArea = wrapper.find('.weibo-publish-wrapper textarea');
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button');
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    const countOfMyWeibo = wrapper.vm.profileData[2].num;
    
    //设置textArea的绑定数据
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '欢迎来到我的微博', 
      images: []
    "}}");
    //触发点击事件
    buttonOfPublish.trigger('click');
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num;

    //断言: 发布新内容
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews + 1);
    //断言: 个人微博数量增加1个
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo + 1);
    
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'点击发布按钮,发布新内容&amp;个人微博数量增加1个'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> textArea = wrapper.find(<span class="hljs-string">'.weibo-publish-wrapper textarea'</span>);
    <span class="hljs-keyword">const</span> buttonOfPublish = wrapper.find(<span class="hljs-string">'.weibo-publish-wrapper button'</span>);
    <span class="hljs-keyword">const</span> lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    <span class="hljs-keyword">const</span> countOfMyWeibo = wrapper.vm.profileData[<span class="hljs-number">2</span>].num;
    
    <span class="hljs-comment">//设置textArea的绑定数据</span>
    wrapper.setData({<span class="hljs-attr">newWeiboContent</span>: {
      <span class="hljs-attr">imgUrl</span>: <span class="hljs-string">'../../static/image/profile.jpg'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Lee_tanghui'</span>,
      <span class="hljs-attr">resource</span>: <span class="hljs-string">'刚刚 来自 网页版微博'</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">'欢迎来到我的微博'</span>, 
      <span class="hljs-attr">images</span>: []
    "}}");
    <span class="hljs-comment">//触发点击事件</span>
    buttonOfPublish.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    <span class="hljs-keyword">const</span> countOfMyWeiboAfterPublish = wrapper.vm.profileData[<span class="hljs-number">2</span>].num;

    <span class="hljs-comment">//断言: 发布新内容</span>
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews + <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 个人微博数量增加1个</span>
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo + <span class="hljs-number">1</span>);
    
  })</code></pre>
<p>测试结果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654042?w=591&amp;h=51" src="https://static.alili.tech/img/remote/1460000012654042?w=591&amp;h=51" alt="通过测试" title="通过测试" style="cursor: pointer;"></span></p>
<p>2.当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框, 叫用户输入内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" it('当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框', () => {
    const wrapper = mount(SinaWeibo);
    const textArea = wrapper.find('.weibo-publish-wrapper textarea');
    const buttonOfPublish = wrapper.find('.weibo-publish-wrapper button');
    const lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    const countOfMyWeibo = wrapper.vm.profileData[2].num;
    
    //设置textArea的绑定数据为空
    wrapper.setData({newWeiboContent: {
      imgUrl: '../../static/image/profile.jpg',
      name: 'Lee_tanghui',
      resource: '刚刚 来自 网页版微博',
      content: '', 
      images: []
    "}}");
    //触发点击事件
    buttonOfPublish.trigger('click');
    const lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    const countOfMyWeiboAfterPublish = wrapper.vm.profileData[2].num;

    //断言: 没有发布新内容
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews);
    //断言: 个人微博数量不变
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo);
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> it(<span class="hljs-string">'当文本框中无内容时, 不能发布空微博到微博列表, 且弹出提示框'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> textArea = wrapper.find(<span class="hljs-string">'.weibo-publish-wrapper textarea'</span>);
    <span class="hljs-keyword">const</span> buttonOfPublish = wrapper.find(<span class="hljs-string">'.weibo-publish-wrapper button'</span>);
    <span class="hljs-keyword">const</span> lengthOfWeiboNews = wrapper.vm.weiboNews.length;
    <span class="hljs-keyword">const</span> countOfMyWeibo = wrapper.vm.profileData[<span class="hljs-number">2</span>].num;
    
    <span class="hljs-comment">//设置textArea的绑定数据为空</span>
    wrapper.setData({<span class="hljs-attr">newWeiboContent</span>: {
      <span class="hljs-attr">imgUrl</span>: <span class="hljs-string">'../../static/image/profile.jpg'</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">'Lee_tanghui'</span>,
      <span class="hljs-attr">resource</span>: <span class="hljs-string">'刚刚 来自 网页版微博'</span>,
      <span class="hljs-attr">content</span>: <span class="hljs-string">''</span>, 
      <span class="hljs-attr">images</span>: []
    "}}");
    <span class="hljs-comment">//触发点击事件</span>
    buttonOfPublish.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> lengthOfWeiboNewsAfterPublish = wrapper.vm.weiboNews.length;
    <span class="hljs-keyword">const</span> countOfMyWeiboAfterPublish = wrapper.vm.profileData[<span class="hljs-number">2</span>].num;

    <span class="hljs-comment">//断言: 没有发布新内容</span>
    expect(lengthOfWeiboNewsAfterPublish).to.equal(lengthOfWeiboNews);
    <span class="hljs-comment">//断言: 个人微博数量不变</span>
    expect(countOfMyWeiboAfterPublish).to.equal(countOfMyWeibo);
  })</code></pre>
<p>测试结果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654043?w=732&amp;h=117" src="https://static.alili.tech/img/remote/1460000012654043?w=732&amp;h=117" alt="image_1c2l52h0i11e51fjqm9o8751m7hm.png-32.4kB" title="image_1c2l52h0i11e51fjqm9o8751m7hm.png-32.4kB" style="cursor: pointer;"></span></p>
<p>3.当点击"关注"(2), 个人头像下关注的数量(5)会增加1个, 且按钮内字体变成"取消关注"; 当点击"取消关注"(2), 个人头像下的数量(5)会减少1个, 且按钮内字体变成"关注"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('当点击&quot;关注&quot;, 个人头像下关注的数量会增加1个, 且按钮内字体变成&quot;取消关注&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfAddAttendion = wrapper.find('.add');
    const countOfMyAttention = wrapper.vm.profileData[0].num;
  
    //触发事件
    buttonOfAddAttendion.trigger('click');
    
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num;

    //断言: 个人头像下关注的数量会增加1个
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention + 1);
    //断言: 按钮内字体变成&quot;取消关注
    expect(buttonOfAddAttendion.text()).to.equal('取消关注');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'当点击"关注", 个人头像下关注的数量会增加1个, 且按钮内字体变成"取消关注"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfAddAttendion = wrapper.find(<span class="hljs-string">'.add'</span>);
    <span class="hljs-keyword">const</span> countOfMyAttention = wrapper.vm.profileData[<span class="hljs-number">0</span>].num;
  
    <span class="hljs-comment">//触发事件</span>
    buttonOfAddAttendion.trigger(<span class="hljs-string">'click'</span>);
    
    <span class="hljs-keyword">const</span> countOfMyAttentionAfterClick = wrapper.vm.profileData[<span class="hljs-number">0</span>].num;

    <span class="hljs-comment">//断言: 个人头像下关注的数量会增加1个</span>
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention + <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 按钮内字体变成"取消关注</span>
    expect(buttonOfAddAttendion.text()).to.equal(<span class="hljs-string">'取消关注'</span>);
  })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('当点击&quot;取消关注&quot;, 个人头像下关注的数量会减少1个, 且按钮内字体变成&quot;关注&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfUnAttendion = wrapper.find('.cancel');
    const countOfMyAttention = wrapper.vm.profileData[0].num;
  
    //触发事件
    buttonOfUnAttendion.trigger('click');
    
    const countOfMyAttentionAfterClick = wrapper.vm.profileData[0].num;

    //断言: 个人头像下关注的数量会增加1个
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention - 1);
    //断言: 按钮内字体变成&quot;取消关注
    expect(buttonOfUnAttendion.text()).to.equal('关注');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'当点击"取消关注", 个人头像下关注的数量会减少1个, 且按钮内字体变成"关注"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfUnAttendion = wrapper.find(<span class="hljs-string">'.cancel'</span>);
    <span class="hljs-keyword">const</span> countOfMyAttention = wrapper.vm.profileData[<span class="hljs-number">0</span>].num;
  
    <span class="hljs-comment">//触发事件</span>
    buttonOfUnAttendion.trigger(<span class="hljs-string">'click'</span>);
    
    <span class="hljs-keyword">const</span> countOfMyAttentionAfterClick = wrapper.vm.profileData[<span class="hljs-number">0</span>].num;

    <span class="hljs-comment">//断言: 个人头像下关注的数量会增加1个</span>
    expect(countOfMyAttentionAfterClick).to.equal(countOfMyAttention - <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 按钮内字体变成"取消关注</span>
    expect(buttonOfUnAttendion.text()).to.equal(<span class="hljs-string">'关注'</span>);
  })</code></pre>
<p>测试结果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654044?w=879&amp;h=156" src="https://static.alili.tech/img/remote/1460000012654044?w=879&amp;h=156" alt="image_1c2lbcvod1d7ton71mod1i6b1bt13.png-62.3kB" title="image_1c2lbcvod1d7ton71mod1i6b1bt13.png-62.3kB" style="cursor: pointer;"></span></p>
<p>4.当点击"收藏"(3)时, 我的收藏(7)会增加1个数量, 且按钮内文字变成"已收藏"; 点击"已收藏"(3)时, 我的收藏(7)会减少1个数量, 且按钮内文字变成"收藏"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('当点击&quot;收藏&quot;时, 我的收藏会增加1个数量, 且按钮内文字变成&quot;已收藏&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfCollect = wrapper.find('.collectWeibo');
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text());

    //触发点击事件
    buttonOfCollect.trigger('click');
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text());

    //断言: 我的收藏数量会加1
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect + 1);
    //断言: 按钮内文字变成已收藏
    expect(buttonOfCollect.text()).to.equal('已收藏');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'当点击"收藏"时, 我的收藏会增加1个数量, 且按钮内文字变成"已收藏"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfCollect = wrapper.find(<span class="hljs-string">'.collectWeibo'</span>);
    <span class="hljs-keyword">const</span> countOfMyCollect = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.collect-num span'</span>).text());

    <span class="hljs-comment">//触发点击事件</span>
    buttonOfCollect.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> countOfMyCollectAfterClick = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.collect-num span'</span>).text());

    <span class="hljs-comment">//断言: 我的收藏数量会加1</span>
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect + <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 按钮内文字变成已收藏</span>
    expect(buttonOfCollect.text()).to.equal(<span class="hljs-string">'已收藏'</span>);
  })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('当点击&quot;已收藏&quot;时, 我的收藏会减少1个数量, 且按钮内文字变成&quot;收藏&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfUnCollect = wrapper.find('.uncollectWeibo');
    const countOfMyCollect = Number(wrapper.find('.collect-num span').text());

    //触发点击事件
    buttonOfUnCollect.trigger('click');
    const countOfMyCollectAfterClick = Number(wrapper.find('.collect-num span').text());

    //断言: 我的收藏数量会减1
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect - 1 );
    //断言: 按钮内文字变成已收藏
    expect(buttonOfUnCollect.text()).to.equal('收藏');
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'当点击"已收藏"时, 我的收藏会减少1个数量, 且按钮内文字变成"收藏"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfUnCollect = wrapper.find(<span class="hljs-string">'.uncollectWeibo'</span>);
    <span class="hljs-keyword">const</span> countOfMyCollect = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.collect-num span'</span>).text());

    <span class="hljs-comment">//触发点击事件</span>
    buttonOfUnCollect.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> countOfMyCollectAfterClick = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.collect-num span'</span>).text());

    <span class="hljs-comment">//断言: 我的收藏数量会减1</span>
    expect(countOfMyCollectAfterClick).to.equal(countOfMyCollect - <span class="hljs-number">1</span> );
    <span class="hljs-comment">//断言: 按钮内文字变成已收藏</span>
    expect(buttonOfUnCollect.text()).to.equal(<span class="hljs-string">'收藏'</span>);
  })</code></pre>
<p>测试结果:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654045?w=908&amp;h=186" src="https://static.alili.tech/img/remote/1460000012654045?w=908&amp;h=186" alt="image_1c2lbdfe9i5jrja10cc447rgj1g.png-88.6kB" title="image_1c2lbdfe9i5jrja10cc447rgj1g.png-88.6kB" style="cursor: pointer;"></span></p>
<p>5.当点击"赞"(4), 我的赞(8)会增加1个数量, 且按钮内文字变成"取消赞"; 点击"取消赞"(3)时, 我的赞(8)会减少1个数量, 且按钮内文字变成"赞"</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  it('当点击&quot;赞&quot;, 我的赞会增加1个数量, 且按钮内文字变成&quot;取消赞&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfLike = wrapper.find('.dislikedWeibo');
    const countOfMyLike = Number(wrapper.find('.like-num span').text());

    //触发点击事件
    buttonOfLike.trigger('click');
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text());

    //断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike + 1);
    //断言: 按钮内文字变成取消赞
    expect(buttonOfLike.text()).to.equal('取消赞');
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  it(<span class="hljs-string">'当点击"赞", 我的赞会增加1个数量, 且按钮内文字变成"取消赞"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfLike = wrapper.find(<span class="hljs-string">'.dislikedWeibo'</span>);
    <span class="hljs-keyword">const</span> countOfMyLike = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.like-num span'</span>).text());

    <span class="hljs-comment">//触发点击事件</span>
    buttonOfLike.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> countOfMyLikeAfterClick = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.like-num span'</span>).text());

    <span class="hljs-comment">//断言: 我的赞会增加1个数量</span>
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike + <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 按钮内文字变成取消赞</span>
    expect(buttonOfLike.text()).to.equal(<span class="hljs-string">'取消赞'</span>);
  });</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('当点击&quot;取消赞&quot;, 我的赞会减少1个数量, 且按钮内文字变成&quot;赞&quot;', () => {
    const wrapper = mount(SinaWeibo);
    const buttonOfDislike = wrapper.find('.likedWeibo');
    const countOfMyLike = Number(wrapper.find('.like-num span').text());

    //触发点击事件
    buttonOfDislike.trigger('click');
    const countOfMyLikeAfterClick = Number(wrapper.find('.like-num span').text());

    //断言: 我的赞会增加1个数量
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike - 1);
    //断言: 按钮内文字变成取消赞
    expect(buttonOfDislike.text()).to.equal('赞');
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">it(<span class="hljs-string">'当点击"取消赞", 我的赞会减少1个数量, 且按钮内文字变成"赞"'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> wrapper = mount(SinaWeibo);
    <span class="hljs-keyword">const</span> buttonOfDislike = wrapper.find(<span class="hljs-string">'.likedWeibo'</span>);
    <span class="hljs-keyword">const</span> countOfMyLike = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.like-num span'</span>).text());

    <span class="hljs-comment">//触发点击事件</span>
    buttonOfDislike.trigger(<span class="hljs-string">'click'</span>);
    <span class="hljs-keyword">const</span> countOfMyLikeAfterClick = <span class="hljs-built_in">Number</span>(wrapper.find(<span class="hljs-string">'.like-num span'</span>).text());

    <span class="hljs-comment">//断言: 我的赞会增加1个数量</span>
    expect(countOfMyLikeAfterClick).to.equal(countOfMyLike - <span class="hljs-number">1</span>);
    <span class="hljs-comment">//断言: 按钮内文字变成取消赞</span>
    expect(buttonOfDislike.text()).to.equal(<span class="hljs-string">'赞'</span>);
  });</code></pre>
<p>测试结果</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012654046?w=1050&amp;h=520" src="https://static.alili.tech/img/remote/1460000012654046?w=1050&amp;h=520" alt="image_1c2lbdt271iqs1tv34va1jlv5cb1t.png-151.9kB" title="image_1c2lbdt271iqs1tv34va1jlv5cb1t.png-151.9kB" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">
<strong>项目地址</strong>:</h2>
<blockquote>Git仓库: <a href="https://github.com/Lee-Tanghui/Vue-Testing-Demo" rel="nofollow noreferrer" target="_blank">https://github.com/Lee-Tanghu...</a>
</blockquote>
<h2 id="articleHeader12"><strong>参考文章</strong></h2>
<ol>
<li><a href="http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html" rel="nofollow noreferrer" target="_blank">测试框架 Mocha 实例教程 - 阮一峰</a></li>
<li><a href="https://www.jianshu.com/p/f200a75a15d2" rel="nofollow noreferrer" target="_blank">Chai.js断言库API中文文档</a></li>
<li><a href="https://www.zhihu.com/question/50566681" rel="nofollow noreferrer" target="_blank">知乎: 如果对vue进行单元测试</a></li>
<li><a href="http://blog.csdn.net/violetjack0808/article/details/73740395" rel="nofollow noreferrer" target="_blank">Vue.js学习系列六——Vue单元测试Karma+Mocha学习笔记</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue单元测试实战教程(Mocha/Karma + Vue-Test-Utils + Chai)

## 原文链接
[https://segmentfault.com/a/1190000012654035](https://segmentfault.com/a/1190000012654035)

