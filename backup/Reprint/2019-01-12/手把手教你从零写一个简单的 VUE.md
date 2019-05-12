---
title: '手把手教你从零写一个简单的 VUE' 
date: 2019-01-12 2:30:24
hidden: true
slug: arf9pdmnf5n
categories: [reprint]
---

{{< raw >}}

                    
<p>本系列是一个教程，下面贴下目录~<br>1.<a href="https://segmentfault.com/a/1190000009846314">手把手教你从零写一个简单的 VUE</a><br>2.<a href="https://segmentfault.com/a/1190000010611308" target="_blank">手把手教你从零写一个简单的 VUE--模板篇</a></p>
<p>今天给大家带来的是实现一个简单的类似 VUE 一样的前端框架，VUE 框架现在应该算是非常主流的前端数据驱动框架，今天我们来从零开始写一个非常简单的 VUE 框架，主要是让大家知道最核心的 vue 部分是怎么运转起来的。包括数据绑定，模板处理，以及页面渲染，数据驱动视图等几个部分，代码在文章末尾给出来，下面我们开始~</p>
<h3 id="articleHeader0">VUE 是怎么运转起来的</h3>
<p>在正式动手之前，我们先来了解下 vue 是怎么运转起来的，vue 从核心来说，是一个通过数据去驱动页面渲染的框架，也就是说通过改变数据的状态，可以控制页面中渲染的逻辑，比如展示数据，切换样式，这些的核心都是通过对数据改变的监听，从而将数据发生改变的对应的视图进行更新渲染，这是整个框架的核心运行机制。因此我们制作的简单 vue 框架，主要是围绕着怎么监听，怎么渲染，怎么更新这个流程去做的，旨在让大家知道 vue 怎么跑起来的，其余的 vue 组件，指令，插件等内容将在后面的文章中写出。</p>
<h3 id="articleHeader1">设计</h3>
<p>首先我们要知道我们要做一个简单数据驱动视图前端框架，它包括以下几个部分:</p>
<ol>
<li>能够编译简单的模板</li>
<li>能够监听数据变化</li>
<li>数据变化的时候，能够关联对应的视图并同步的更新视图</li>
</ol>
<p>根据上面列举的需求，我们需要程序抽象以下几个部分:</p>
<ol>
<li>存储数据的<code>$data</code>,用于保存数据，渲染视图</li>
<li>与每个模板对应的<code>Node</code>对象，对象包含对应模板的渲染函数，还有渲染函数需要使用的数据集合</li>
<li>对数据进行监听关联的<code>Watcher</code>类，用于关联数据和对应的模板，监听数据变化</li>
</ol>
<h3 id="articleHeader2">开始编码</h3>
<p>首先介绍下项目用的工具及框架，项目使用<code>rollup</code>进行项目模块化构建,使用<code>ES6</code>进行编码。下面开始正式编码。<br>首先我给框架起了个简单的名字，叫<code>QV</code>，这个对象会暴露到全局中，进行实例化，实例化代码如下:<br><span class="img-wrap"><img data-src="/img/bVPp1a?w=1110&amp;h=900" src="https://static.alili.tech/img/bVPp1a?w=1110&amp;h=900" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>在实例化的时候传给了对象 <code>el</code>、<code>template</code>、<code>data</code>等数据，其中<code>el</code>是模板在页面的挂载点，template 是获取模板的选择器，分别对应<code>body</code>的<code>&lt;app&gt;&lt;/app&gt;</code>标签和script标签中的模板，data 是定义的数据对象。</p>
<h3 id="articleHeader3">数据处理</h3>
<p>在<code>QV</code>类的构造函数中，我们会对传入的配置进行处理，首先我们会对数据进行格式化，使得其在被<code>Watcher</code>正常监控。格式化数据的代码如下：<br><span class="img-wrap"><img data-src="/img/bVPsC4?w=1104&amp;h=836" src="https://static.alili.tech/img/bVPsC4?w=1104&amp;h=836" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>可以看到<code>formatData</code>方法在原来的<code>data</code>上面又挂载了一个<code>_od_</code>属性，然后将原始数据进行格式化，每个数据分别包含<code>value</code>(数据值),<code>linkNodes</code>(被使用的节点值),<code>mounted</code>(是否已经被格式化过)，通过对数据进行预处理，方便后面的数据监控绑定</p>
<h3 id="articleHeader4">模板节点处理</h3>
<p>模板的能力是一个前端框架的重要组成部分，<code>vue</code>将模板转化为<code>AST</code>（抽象语法树），然后去解析其中的语法，比如<code>"{{""}}"</code>、<code>v-for v-if</code>等等，模板解析的总体思路如下:</p>
<ol>
<li>将模板字符串通过正则表达式等方法进行切割，切割点为模板定义的关键字</li>
<li>将切割完的字符串进行分析，可以生成<code>AST</code>(抽象语法树)或者是直接进行处理操作</li>
<li>将分析完的东西进行字符串拼接，通过<code>new Function</code>生成模板函数</li>
</ol>
<p>本例子只做流程的说明，所以模板很简单，只有赋值语法，如下:<br><span class="img-wrap"><img data-src="/img/bVPtnM?w=1082&amp;h=144" src="https://static.alili.tech/img/bVPtnM?w=1082&amp;h=144" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>可以看到模板中只有<code>"{{""}}"</code>的赋值语法，插入变量为<code>a、sdf、ccc</code>的语法<br>那么这个是怎么进行解析的呢，代码如下:<br><span class="img-wrap"><img data-src="/img/bVPtoN?w=1286&amp;h=1192" src="https://static.alili.tech/img/bVPtoN?w=1286&amp;h=1192" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>下面重点讲一讲这个函数，可以看到函数的开头定义了一个正则表达式<code> /"{{"[ \t]*([\w\W]*?)[ \t]*"}}"/g</code>,用于匹配和分割用<code>"{{""}}"</code>界定的变量,通过 <code>exec</code>的运行，匹配出来的结果如下:<br><span class="img-wrap"><img data-src="/img/bVPtqX?w=966&amp;h=69" src="https://static.alili.tech/img/bVPtqX?w=966&amp;h=69" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>可以看到<code>a,sdf,ccc</code>都被匹配出来了，然后通过<code>slice</code>进行分割后重建，变成一段<strong>模板函数字符串</strong>,如下：<br><span class="img-wrap"><img data-src="/img/bVPtsj?w=1069&amp;h=21" src="https://static.alili.tech/img/bVPtsj?w=1069&amp;h=21" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>然后再通过<code>new Function</code>将上面的字符串变成一个函数,方法如下<br><span class="img-wrap"><img data-src="/img/bVPtsv?w=802&amp;h=396" src="https://static.alili.tech/img/bVPtsv?w=802&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>其中的<code>new Function("od",$t)</code>中的<code>od</code>是这个函数的参数，可以在函数中使用<br>最后生成的模板函数如下：<br><span class="img-wrap"><img data-src="/img/bVPtsU?w=875&amp;h=68" src="https://static.alili.tech/img/bVPtsU?w=875&amp;h=68" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这样子就完成了模板函数的开发，而且还将模板用的变量进行抽取，标记这个模板用到了哪些变量</p>
<h3 id="articleHeader5">监听器</h3>
<p>监听器作为连接数据和视图更新的纽带，是<code>vue</code>的核心部分，<code>vue</code>是使用<code>Object.defineProperty</code>对数据进行处理后实现数据监听的，本程序也是使用这个核心方法进行数据监听的，核心代码如下：<br><span class="img-wrap"><img data-src="/img/bVPtvD?w=1270&amp;h=1302" src="https://static.alili.tech/img/bVPtvD?w=1270&amp;h=1302" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>下面我具体说下这段代码：<br>之前格式化数据的时候在原始数据里面添加了<code>_od_</code>字段，是用在数据监控时候的，<code>Object.defineProperty</code>可以设置<code>get set</code>属性，分别在对应的数据被获取或者被修改的时候会进行回调，因此如果直接操作原始数据，会导致监控程序发生死循环，因此通过<code>_od_</code>的拷贝数据进行操作，能够避免这种情况，可以看到<code>get</code>函数会直接返回<code>_od_</code>里面对应属性的<code>value</code>，而<code>set</code>函数我做了一个优化节流，对于连续修改数据只发生一次更新，将使用到这个数据的<code>Node</code>对象进行<code>update</code>操作</p>
<p>程序最核心的方法已经开发完成了，演示下结果，直接打开页面，可以看到下面的视图<br><span class="img-wrap"><img data-src="/img/bVPtAJ?w=932&amp;h=344" src="https://static.alili.tech/img/bVPtAJ?w=932&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>可以看到程序将数据<code>a sdf ccc</code>赋值给模板，然后替换页面的<code>app</code>节点，渲染到页面上<br>接下来我们通过实例直接修改<code>data</code>，<br><code>qv.$data.a = "change data a"</code><br>可以看到页面会更新成为<br><span class="img-wrap"><img data-src="/img/bVPtBk?w=960&amp;h=514" src="https://static.alili.tech/img/bVPtBk?w=960&amp;h=514" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>下面说下重新渲染的流程：</p>
<ol>
<li>数据修改之后触发了<code>Object.defineProperty</code>的<code>set</code>方法，方法检测到设置数据与原数据不同，回去获取<code>linkNodes</code>属性，里面包含了使用这个数据的<code>Node</code>节点，然后分别调用<code>Node</code>节点的<code>update</code>方法</li>
<li>
<code>update</code>方法被调用之后，<code>Node</code>会重新获取<code>data</code>去生成<code>dom</code>元素，然后替换现有的模板元素，至此完成一次更新</li>
</ol>
<h3 id="articleHeader6">结语</h3>
<p>这篇文章的例子旨在跟大家说明<code>Vue</code>是怎么运作的，希望可以帮助到大家在日常使用的时候遇到一些坑，可以从根本原理上面去找原因，当然这个demo 离<code>Vue</code>还是非常不完整的，缺少了各种模板语法，指令，事件绑定，组件系统，只是把核心的流程展现出来，希望大家喜欢</p>
<p>最后附上源码 <a href="https://github.com/qbright/QV/tree/article-1" rel="nofollow noreferrer" target="_blank">点我点我</a>，喜欢的话给个 star 呗~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你从零写一个简单的 VUE

## 原文链接
[https://segmentfault.com/a/1190000009846314](https://segmentfault.com/a/1190000009846314)

