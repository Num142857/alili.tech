---
title: '[译] 如何为 Vue 项目写单元测试' 
date: 2019-01-08 2:30:11
hidden: true
slug: 33kn71gr5rj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>译者：<a href="https://fanmingfei.com/" rel="nofollow noreferrer" target="_blank">明非</a></p>
<p>链接：<a href="https://fanmingfei.com/posts/A_Vue_Unit_Text_Tutorial.html" rel="nofollow noreferrer" target="_blank">https://fanmingfei.com/posts/A_Vue_Unit_Text_Tutorial.html</a></p>
<p>原文：<a href="https://scotch.io/amp/tutorials/how-to-write-a-unit-test-for-vuejs?from=timeline&amp;isappinstalled=0" rel="nofollow noreferrer" target="_blank">https://scotch.io/amp/tutorials/how-to-write-a-unit-test-for-vuejs?from=timeline&amp;isappinstalled=0</a></p>
</blockquote>
<p>众所周知，Vue.js 是一个非常牛逼的 JavaScript 框架，对于创建复杂功能的前端项目是非常有用的。不管是什么项目，检查应用是否正常工作，运行是否为预期，是尤为重要的。然而，为了保证业务正常运行，我们的项目，每做一次更新，都要对所有功能做一次回归测试，随着项目的增大，重复的测试工作越来越多，越来越乏味，手工测试将变成一个恶心的事情。正因如此，自动化测试诞生了，它可以随时监测我们的代码是否正常工作，运行结果是否符合预期。在这个教程中，我们将创建一个简单的VueJS项目，并为其写一个简单的单元测试。</p>
<p>我们创建一个基本的 to-do list 组件进行测试。我们将要测试的是，列表展示是否正确，用户是否可以正常添加到 to-do list。通过这个教程，你将学会如何去为你的组件写一个测试，测试包括HTML展示是否正确以及用户的操作是否能正常进行。</p>
<p><a href="https://github.com/lilyrae/vue-tests" rel="nofollow noreferrer" target="_blank">这个git库</a>是这篇文章的所有代码。</p>
<h2 id="articleHeader0">创建项目</h2>
<p>创建 JavaScript 项目可能是一个复杂的过程。琳琅满目的依赖库供我们选择。不过还好，我们可以使用<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>来创建VueJS项目，它帮我们包办一切。运行 npm install 来安装依赖：</p>
<p>npm install -g vue-cli<br>vue init webpack project-name</p>
<p>在这个过程中，你可能会遇到几个提示。大多数提示比较简单易懂，你可以直接选择默认选项。需要注意的是，我们需要是否安装 <code>vue-router</code>、<code>Karma</code>、<code>Mocha</code>的提示后输入YES来引入这些工具。然后开始安装依赖：</p>
<p>cd project-name<br>npm install</p>
<p>接下来我们执行下面的命令，这个命令将会在本地运行你的应用并在浏览器中打开。</p>
<p>npm run dev</p>
<p>如果你的网络好的话，一会就装好了。</p>
<h3 id="articleHeader1">依赖</h3>
<p><strong>Webpack (2.3)</strong> 是一个打包器，它可以合并打包JavaScript，CSS，HTML文件，并且提供给应用运行。<strong>Bable (v6.22)</strong> 是一个编译器，用来把ES6编译成ES5。目前有很多 JavaScript 标准在许多浏览器中还没有被支持，所以需要将ES6转成ES。</p>
<h3 id="articleHeader2">测试依赖</h3>
<p><strong>Karma (v1.4)</strong> 是一个运行时，它产生一个 Web 服务环境来运行项目代码，并且执行测试。<strong>Mocha (v3.2)</strong> 是一个 JavaScript 测试框架。<strong>Chai (v3.5)</strong> 是一个 Mocha 可以使用的断言库。</p>
<p>在你的项目中，你可以找到下面这些目录：<code>build</code>、<code>config</code>、<code>node_modules</code>、<code>src</code>、<code>static</code> 和 <code>test</code>。对于本教程来说最重要的是<code>src</code>，它包括我们应用的代码，用来测试。</p>
<h2 id="articleHeader3">第一次测试</h2>
<p>从最基本的开始去做一般都没错。我们将从创建简单的列表组件开始。在 <code>src/components</code> 里创建一个新文件叫做 <code>List.vue</code> 并且将下面代码写进去。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>My To Do List</h1>
    </br>
    <!--displays list -->
    <ul>
      <li v-for=&quot;item in listItems&quot;>"{{" item "}}"</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      listItems: ['buy food', 'play games', 'sleep'],
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My To Do List<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-comment">&lt;!--displays list --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in listItems"</span>&gt;</span></span><span class="hljs-template-variable">"{{" item "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'list'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">listItems</span>: [<span class="hljs-string">'buy food'</span>, <span class="hljs-string">'play games'</span>, <span class="hljs-string">'sleep'</span>],
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在这个组件中，列表项被储存在数组（<code>listItems</code>）里面。数据被传递到模板，然后被遍历（<code>v-for</code>），然后展现在页面上。</p>
<p>当然，我们需要看到刚刚创建的列表，我们可以创建一个新的路由来展示这个组件。在<code>src/router/index.js</code>中创建一个路由，添加完了代码应该是下面这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/components/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/to-do',
      name: 'ToDo',
      component: List
    },
  ]
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> Hello <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/Hello'</span>
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/List'</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">'/'</span>,
      name: <span class="hljs-string">'Hello'</span>,
      component: Hello
    },
    {
      path: <span class="hljs-string">'/to-do'</span>,
      name: <span class="hljs-string">'ToDo'</span>,
      component: List
    },
  ]
})</code></pre>
<p>现在，访问<a href="http://localhost:8080/#/to-do" rel="nofollow noreferrer" target="_blank">localhost:8080/#/to-do</a>，可以看到我们做的应用。</p>
<p>首先，我们要测试的是数据的正确性。在<code>test/unit/specs</code>目录下创建一个<code>List.spec.js</code>，并且写入下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import List from '@/components/List';
import Vue from 'vue';

describe('List.vue', () => {

  it('displays items from the list', () => {
      // our test goes here
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/List'</span>;
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

describe(<span class="hljs-string">'List.vue'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {

  it(<span class="hljs-string">'displays items from the list'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-regexp">//</span> our test goes here
  })
})</code></pre>
<p>在这个文件中，我们_describing_了<code>List.vue</code>组件，并且我们创建了一个空的测试，他将要检查这个组件的列表展示。这是一个基本的 Mocha 测试文件。</p>
<p>我们首先要安装我们的Vue组件。复制下面代码放在测试文件的'our test goes here'下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// build component
const Constructor = Vue.extend(List);
const ListComponent = new Constructor().$mount();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// build component</span>
<span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">Constructor</span> = <span class="hljs-title">Vue</span>.<span class="hljs-title">extend</span><span class="hljs-params">(List)</span>;</span>
<span class="hljs-keyword">const</span> ListComponent = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Constructor</span><span class="hljs-params">()</span>.$<span class="hljs-title">mount</span><span class="hljs-params">()</span>;</span></code></pre>
<p>我们继承了Vue组件并且安装这个组件。安装组件很重要，只有这样我们才能将通过模板来渲染HTML。也就是说，HTML已经被创建，并且我们模板中的变量（比如 <code>item</code>）已经被填充内容，这样我们就可以获取HTML了（使用<code>$el</code>）。</p>
<p>我们的组件准备好了，我们可以写第一个断言。在这个例子中，我们使用Chai 断言库提供的 'expect' 模式，还有 'should' 和 'assert'模式。将下面的代码放到，启动组件的后面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// assert that component text contains items from the list
expect(ListComponent.$el.textContent).to.contain('play games');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">// assert that component text contains items from the list</span>
expect(ListComponent.$el.textContent).<span class="hljs-keyword">to</span>.contain(<span class="hljs-string">'play games'</span>);</code></pre>
<p>之前提到过，我们可以使用<code>ListComponent.$el</code>来获取组件的HTML，如果想去获取HTML内的内容（比如 文本），我们可以使用<code>ListComponent.$el.textContent</code>。这个断言用来检查HTML列表中的文本是否和组件的data里的数据列表吻合。</p>
<p>为了检查所有的事情都符合我们的预期，我们可以运行测试！通过 vue-cli 创建的项目，我们可以简单的使用<code>npm run unit</code>来运行<code>cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run unit" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> unit</span></code></pre>
<p>如果测试都通过了，将会有一个绿色的列表来显示测试报告，让你了解测试都覆盖了哪些代码。</p>
<h2 id="articleHeader4">模拟用户输入</h2>
<p>虽然前面的功能赞赞哒，但没有多少应用只是用来展示数据。下一步我们要做到是添加新的项目到to-do list中。看这里，我们创建了一个input框来输入内容，然后创建一个button用来提交内容。下面是更新后的 List.vue：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <h1>My To Do List</h1>
    </br>
    <input v-model=&quot;newItem&quot; >
    <button @click=&quot;addItemToList&quot;>Add</button>
    <!-- displays list --> 
    <ul>
      <li v-for=&quot;item in listItems&quot;>"{{" item "}}"</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      listItems: ['buy food', 'play games', 'sleep'],
      newItem: ''
    }
  },
  methods: {
      addItemToList() {
        this.listItems.push(this.newItem);
        this.newItem = '';
      }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>My To Do List<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"newItem"</span> &gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"addItemToList"</span>&gt;</span>Add<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- displays list --&gt;</span> 
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in listItems"</span>&gt;</span></span><span class="hljs-template-variable">"{{" item "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'test'</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">listItems</span>: [<span class="hljs-string">'buy food'</span>, <span class="hljs-string">'play games'</span>, <span class="hljs-string">'sleep'</span>],
      <span class="hljs-attr">newItem</span>: <span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
      addItemToList() {
        <span class="hljs-keyword">this</span>.listItems.push(<span class="hljs-keyword">this</span>.newItem);
        <span class="hljs-keyword">this</span>.newItem = <span class="hljs-string">''</span>;
      }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>使用<code>v-model</code>，输入框里面的内容将和newItem进行双向绑定。当按钮被点击后，执行<code>addItemToList</code>，将<code>newItem</code>添加到to-do list数组里面，并且清空<code>newItem</code>里面的内容，新的项目将会被添加到列表中。</p>
<p>可以为新功能写测试文件了，创建<code>List.spec.js</code>，并且添加以下测试代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="it('adds a new item to list on click', () => {
    // our test goes here
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">it</span><span class="hljs-params">(<span class="hljs-string">'adds a new item to list on click'</span>, ()</span></span> =&gt; {
    <span class="hljs-comment">// our test goes here</span>
})</code></pre>
<p>第一步，我们需要创建我们的组件，并且模拟一个用户在输入框的输入行为。因为 VueJs 将输入框和 <code>newItem</code> 变量进行了绑定，我们可以给<code>newItem</code>设置内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// build component
const Constructor = Vue.extend(List);
const ListComponent = new Constructor().$mount();

// set value of new item
ListComponent.newItem = 'brush my teeth';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// build component</span>
<span class="hljs-keyword">const</span> <span class="hljs-function"><span class="hljs-keyword">Constructor</span> = <span class="hljs-title">Vue</span>.<span class="hljs-title">extend</span><span class="hljs-params">(List)</span>;</span>
<span class="hljs-keyword">const</span> ListComponent = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">Constructor</span><span class="hljs-params">()</span>.$<span class="hljs-title">mount</span><span class="hljs-params">()</span>;</span>

<span class="hljs-comment">// set value of new item</span>
ListComponent.newItem = <span class="hljs-string">'brush my teeth'</span>;</code></pre>
<p>下一步，我们需要点击按钮。我们需要在HTML中找到按钮，在<code>$el</code>中即可找到。这是，我们可以使用<code>querySelector</code>，像选择真是元素一样选择这个按钮。也可以使用class(<code>.buttonClass</code>)、ID（<code>#buttonID</code>）或者标签名(<code>button</code>)来选择。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// find button
const button = ListComponent.$el.querySelector('button');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// find button</span>
<span class="hljs-keyword">const</span> button = ListComponent.$el.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'button'</span>);</code></pre>
<p>为了模拟点击，我们需要给按钮一个新的事件对象。在测试环境中，List组件不会监听任何事件，因此我们需要手动运行<code>watcher</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// simulate click event
const clickEvent = new window.Event('click');
button.dispatchEvent(clickEvent);
ListComponent._watcher.run();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// simulate click event</span>
<span class="hljs-keyword">const</span> clickEvent = <span class="hljs-keyword">new</span> window.Event(<span class="hljs-string">'click'</span>);
button.dispatchEvent(clickEvent);
ListComponent._watcher.<span class="hljs-built_in">run</span>();</code></pre>
<p>最后，我们需要检查我们添加的新项目是否显示在HTML中，这个在前面已经介绍过。我们也需要检查<code>newItem</code>是否被存储在了数组里面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//assert list contains new item
expect(ListComponent.$el.textContent).to.contain('brush my teeth');
expect(ListComponent.listItems).to.contain('brush my teeth');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//assert list contains new item</span>
<span class="hljs-selector-tag">expect</span>(ListComponent.$el.textContent)<span class="hljs-selector-class">.to</span><span class="hljs-selector-class">.contain</span>(<span class="hljs-string">'brush my teeth'</span>);
<span class="hljs-selector-tag">expect</span>(ListComponent.listItems)<span class="hljs-selector-class">.to</span><span class="hljs-selector-class">.contain</span>(<span class="hljs-string">'brush my teeth'</span>);</code></pre>
<p>下面是整个测试文件的内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import List from '@/components/List';
import Vue from 'vue';

describe('List.vue', () => {
  it('displays items from the list', () => {
    const Constructor = Vue.extend(List);
    const ListComponent = new Constructor().$mount();
    expect(ListComponent.$el.textContent).to.contain('play games');
  })

  it('adds a new item to list on click', () => {
    // build component
    const Constructor = Vue.extend(List);
    const ListComponent = new Constructor().$mount();

    // set input value
    ListComponent.newItem = 'brush my teeth';

    // simulate click event
    const button = ListComponent.$el.querySelector('button');
    const clickEvent = new window.Event('click');
    button.dispatchEvent(clickEvent);
    ListComponent._watcher.run();

    // assert list contains new item
    expect(ListComponent.$el.textContent).to.contain('brush my teeth');
    expect(ListComponent.listItems).to.contain('brush my teeth');
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>import <span class="hljs-keyword">List</span> from <span class="hljs-string">'@/components/List'</span>;
import Vue from <span class="hljs-string">'vue'</span>;

describe(<span class="hljs-string">'List.vue'</span>, () =&gt; {
  it(<span class="hljs-string">'displays items from the list'</span>, () =&gt; {
    <span class="hljs-keyword">const</span> Constructor = Vue.extend(<span class="hljs-keyword">List</span>);
    <span class="hljs-keyword">const</span> ListComponent = <span class="hljs-keyword">new</span> Constructor().$mount();
    expect(ListComponent.$el.textContent).to.contain(<span class="hljs-string">'play games'</span>);
  })

  it(<span class="hljs-string">'adds a new item to list on click'</span>, () =&gt; {
    <span class="hljs-comment">// build component</span>
    <span class="hljs-keyword">const</span> Constructor = Vue.extend(<span class="hljs-keyword">List</span>);
    <span class="hljs-keyword">const</span> ListComponent = <span class="hljs-keyword">new</span> Constructor().$mount();

    <span class="hljs-comment">// set input value</span>
    ListComponent.newItem = <span class="hljs-string">'brush my teeth'</span>;

    <span class="hljs-comment">// simulate click event</span>
    <span class="hljs-keyword">const</span> button = ListComponent.$el.querySelector(<span class="hljs-string">'button'</span>);
    <span class="hljs-keyword">const</span> clickEvent = <span class="hljs-keyword">new</span> window.Event(<span class="hljs-string">'click'</span>);
    button.dispatchEvent(clickEvent);
    ListComponent._watcher.run();

    <span class="hljs-comment">// assert list contains new item</span>
    expect(ListComponent.$el.textContent).to.contain(<span class="hljs-string">'brush my teeth'</span>);
    expect(ListComponent.listItems).to.contain(<span class="hljs-string">'brush my teeth'</span>);
  })
})</code></pre>
<p>现在跑一次这个测试，应该全是绿色的。</p>
<p>希望你读这些代码的时候思路能够清晰，不过它对于刚刚开始接触VueJs单元测试的人来说可读性并不是很高。有一个VueJS实用程序库，它将一些复杂的代码进行了封装。如果想使用它，可以在项目的根目录下输入以下命令安装。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install avoriaz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> avoriaz</code></pre>
<p>下面这个测试实际上和上面测试相同，只不过写法上有些不同。我们使用了<code>mount()</code>法来安装Vue组件，使用<code>find()</code>获取按钮，使用<code>dispatch()</code>来触发点击。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mount } from 'avoriaz';
import List from '@/components/List';
import Vue from 'vue';

describe('List.vue', () => {
  // previous tests ..

  it('adds new item to list on click with avoriaz', () => {
       // build component
    const ListComponent = mount(List);

    // set input value
    ListComponent.setData({
      newItem: 'brush my teeth',
    });

    // simulate click event
    const button = ListComponent.find('button')[0];
    button.dispatch('click');

    // assert list contains new item
    expect(ListComponent.text()).to.contain('brush my teeth');
    expect(ListComponent.data().listItems).to.contain('brush my teeth');
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { mount } <span class="hljs-keyword">from</span> <span class="hljs-string">'avoriaz'</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">'@/components/List'</span>;
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;

describe(<span class="hljs-string">'List.vue'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// previous tests ..</span>

  it(<span class="hljs-string">'adds new item to list on click with avoriaz'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
       <span class="hljs-comment">// build component</span>
    <span class="hljs-keyword">const</span> ListComponent = mount(List);

    <span class="hljs-comment">// set input value</span>
    ListComponent.setData({
      newItem: <span class="hljs-string">'brush my teeth'</span>,
    });

    <span class="hljs-comment">// simulate click event</span>
    <span class="hljs-keyword">const</span> button = ListComponent.find(<span class="hljs-string">'button'</span>)[<span class="hljs-number">0</span>];
    button.dispatch(<span class="hljs-string">'click'</span>);

    <span class="hljs-comment">// assert list contains new item</span>
    expect(ListComponent.text()).to.contain(<span class="hljs-string">'brush my teeth'</span>);
    expect(ListComponent.data().listItems).to.contain(<span class="hljs-string">'brush my teeth'</span>);
  })
})</code></pre>
<h2 id="articleHeader5">总结</h2>
<p>在日常工作以及JavaScript开发中，尤其是VueJS项目，测试是非常重要的。因为刚开始接触测试的时候，我遇到了一些问题，所以总结出一篇文章供大家参考。希望这篇文章能够帮到所有像我一样的人。</p>
<p><a href="https://github.com/lilyrae/vue-tests" rel="nofollow noreferrer" target="_blank">这个git库</a>是这次教程所有的代码。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 如何为 Vue 项目写单元测试

## 原文链接
[https://segmentfault.com/a/1190000010242508](https://segmentfault.com/a/1190000010242508)

