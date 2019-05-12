---
title: '组件化 Todo List 编写笔记' 
date: 2018-12-12 2:30:10
hidden: true
slug: 4kitf4v5aqa
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>在学习 Vue.js 组件化开发 Todo List 的时候，自己虽然也能编码实现，但如果不做笔记，只是写代码，学习的效果还不够好。只有把自己的实现思路记录下来，遇到的问题和解决方法也记录下来，用文字把这个过程梳理清楚，才能对整个项目有更加清晰、准确的认识。</p>
<p>注：该项目通过 <code>vue-cli</code> 搭建，GitHub 上的地址：<a href="https://github.com/Dream4ever/vue-sample/tree/master/todo-list" rel="nofollow noreferrer" target="_blank">todo-list</a>。</p>
<h2 id="articleHeader1">TodoItem 组件</h2>
<h3 id="articleHeader2">显示待办事项清单</h3>
<p>先写一个最简单的组件，就是用 <code>v-for</code> 指令显示待办事项清单。数据也是用的本地的数据，这样在这一步能够把更多的精力放在学习组件的编写上。</p>
<p>首先，当然是在 <code>components</code> 目录下新建 <code>TodoItem.vue</code> 文件，用来显示待办事项清单，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <ul>
    <li
      v-for=&quot;task in tasks&quot;
      :key=&quot;task.id&quot;>
        "{{" task.title "}}"
      </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    tasks: Array
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"task in tasks"</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">"task.id"</span>&gt;</span>
        "{{" task.title "}}"
      <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'TodoItem'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">tasks</span>: <span class="hljs-built_in">Array</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>在 <code>script</code> 中，<code>name</code> 选项定义了组件的名称 <code>TodoItem</code>，<code>props</code> 选项则定义了组件所接收数据的名称 <code>tasks</code> 和类型：数组（Array）。</p>
<p>在 <code>template</code> 中，则在根元素 <code>ul</code> 内，通过 <code>li</code> 元素显示待办事项的名称 <code>task.title</code>。加了另一条语句 <code>:key="task.id"</code>，是因为 Vue 建议在用 <code>v-for</code> 遍历时，为所遍历的每一项提供一个唯一的 <code>key</code> 属性（参考：<a href="https://cn.vuejs.org/v2/guide/list.html#key" rel="nofollow noreferrer" target="_blank">key</a>）。这一项不加也完全没关系，只不过 <code>vue-cli</code> 附带的 ESLint 会有错误提示，所以我这里就加上了。</p>
<p>另外这里还有个小知识点，Vue 规定组件的 <code>template</code> 中只能有一个根元素，也就是说下面这种写法是会报错的。个人猜测，之所以会有这种规定，也是为了最终渲染出来的 HTML 结构能更加清晰。仔细想想，这个理念也和组件化是相通的，不是嘛？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 错误写法 -->
<template>
  <div></div>
  <div></div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 错误写法 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>这个组件最基本的内容已经写好了，接下来就在 <code>App.vue</code> 中引入它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
import TodoItem from &quot;./components/TodoItem.vue&quot;;

export default {
  name: &quot;app&quot;,
  components: {
    TodoItem
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> TodoItem <span class="hljs-keyword">from</span> <span class="hljs-string">"./components/TodoItem.vue"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"app"</span>,
  <span class="hljs-attr">components</span>: {
    TodoItem
  }
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>引入组件之后，当然还要为它提供数据，这样组件才有内容可以显示。这里也有个知识点，组件中的<strong>数据对象</strong> <code>data</code> 必须是函数，因为这样能够保证组件实例<a href="https://cn.vuejs.org/v2/api/#data" rel="nofollow noreferrer" target="_blank">不会修改同一个数据对象</a>。刚开始写组件的时候可能容易忽略这个知识点，多写几次就记住了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: &quot;app&quot;,
  components: {
    TodoItem
  },
  data() {
    return {
      tasks: [
        {
          id: &quot;6b9a86f6-1d1a-558a-83df-f98d84cd87bd&quot;,
          title: &quot;JS&quot;,
          content: &quot;Learn JavaScript&quot;,
          completed: true,
          createdAt: &quot;2017-08-02&quot;
        },
        {
          id: &quot;1211bb33-a249-5782-bd97-0d5652438476&quot;,
          title: &quot;Vue&quot;,
          content: &quot;Learn Vue.js and master it!&quot;,
          completed: false,
          createdAt: &quot;2018-01-02&quot;
        }
      ]
    };
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"app"</span>,
  <span class="hljs-attr">components</span>: {
    TodoItem
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">tasks</span>: [
        {
          <span class="hljs-attr">id</span>: <span class="hljs-string">"6b9a86f6-1d1a-558a-83df-f98d84cd87bd"</span>,
          <span class="hljs-attr">title</span>: <span class="hljs-string">"JS"</span>,
          <span class="hljs-attr">content</span>: <span class="hljs-string">"Learn JavaScript"</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">true</span>,
          <span class="hljs-attr">createdAt</span>: <span class="hljs-string">"2017-08-02"</span>
        },
        {
          <span class="hljs-attr">id</span>: <span class="hljs-string">"1211bb33-a249-5782-bd97-0d5652438476"</span>,
          <span class="hljs-attr">title</span>: <span class="hljs-string">"Vue"</span>,
          <span class="hljs-attr">content</span>: <span class="hljs-string">"Learn Vue.js and master it!"</span>,
          <span class="hljs-attr">completed</span>: <span class="hljs-literal">false</span>,
          <span class="hljs-attr">createdAt</span>: <span class="hljs-string">"2018-01-02"</span>
        }
      ]
    };
  }
};</code></pre>
<p>为组件准备好数据之后，就可以开始用它了。组件的基本用法也很简单，按照它的要求提供数据，然后组件就会按照自己设定的样式把数据显示出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot;>
    <TodoItem
      :tasks=&quot;tasks&quot; />
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
      <span class="hljs-attr">:tasks</span>=<span class="hljs-string">"tasks"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>上面的代码中，调用了 <code>TodoItem</code> 这个组件，并且将父组件中的数据属性 <code>tasks</code> 绑定到 <code>TodoItem</code> 这个组件的 <code>props</code> 选项上。在 <code>:tasks="tasks"</code> 这句代码中，等号前的 <code>tasks</code> 是子组件 <code>TodoItem</code> 中定义的名称，可以近似地理解为“形参”；等号后面的 <code>tasks</code> 则是父组件中的数据属性，可以近似地理解为“实参”。所以这种用法也可以理解成 <code>:形参="实参"</code>，希望这种写法能够帮大家更容易地理解组件传入数据的语法。而父组件的数据属性和子组件的 <code>props</code> 选项都用 <code>tasks</code> 这个名称，是为了保持代码上的一致性，刚接触组件的时候可能觉得分不清谁是谁，但是代码写多了之后就能体会到这种写法的好处了，父组件只负责提供数据，子组件只负责使用数据，保持一致的命名，阅读和修改代码的时候就能很容易看出来互相之间的关系。</p>
<p>保存代码，然后在终端中执行 <code>npm run serve</code>，构建工具就会自动编译，然后在浏览器中打开页面，如果能够看到类似下图中的效果，就说明已经写好了一个最简单的组件了，接下来就要丰富这个 Todo List 的各项功能了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013397532?w=768&amp;h=176" src="https://static.alili.tech/img/remote/1460000013397532?w=768&amp;h=176" alt="List - Component" title="List - Component" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">样式改进</h3>
<p>要使用 Bootstrap 的样式，首先需要把它的 CSS 文件引入进来，编辑 <code>public</code> 目录下的 <code>index.html</code> 文件，在 <code>head</code> 中加入下面的 CSS。后面需要引入 CSS 或者 JS 的时候，都可以在这里引入。当然了，也可以通过 <code>npm install xxx</code> 指令以后端库的形式引入，不过这样只能引入 JS，没法引入 CSS。不过有一天在火车上撸代码的时候，发现了以后端形式引入库的一个便利之处，就是它一旦安装好了，没有网络的情况下也完全可以正常用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <link href=&quot;https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css&quot; rel=&quot;stylesheet&quot;>
  </head>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://cdn.bootcss.com/bootstrap/4.0.0/css/bootstrap.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>接下来就是搭框架，先修改 <code>App.vue</code>，确定整体框架：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;app&quot; class=&quot;container&quot;>
    <div class=&quot;col-md-8 offset-md-2 mt-5&quot;>
      <TodoItem
        :tasks=&quot;tasks&quot; />
    </div>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-8 offset-md-2 mt-5"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span>
        <span class="hljs-attr">:tasks</span>=<span class="hljs-string">"tasks"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>在根 <code>div</code> 中加上 <code>class="container"</code>，这样子元素就可以应用 <code>col-md-8</code> 这样的网格样式了。然后在子元素中加上 <code>class="col-md-8 offset-md-2 mt-5"</code>，<code>col-md-8</code> 表示待办事项占12列宽度的网格中的8列，<code>offset-md-2</code> 表示往右偏移2列之后显示待办事项，这样就能够居中显示了。<code>mt-5</code> 则表示待办事项距离上方有一定空白，<strong>留白</strong>了才好看。</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntU?w=2876&amp;h=522" src="https://static.alili.tech/img/bV4ntU?w=2876&amp;h=522" alt="Grid Setting" title="Grid Setting" style="cursor: pointer; display: inline;"></span></p>
<p>每个待办事项要显示标题、内容、日期，可以用 Bootstrap 的 <a href="https://getbootstrap.com/docs/4.0/components/list-group/#custom-content" rel="nofollow noreferrer" target="_blank">Custom Content 列表</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntW?w=1896&amp;h=1181" src="https://static.alili.tech/img/bV4ntW?w=1896&amp;h=1181" alt="List Group with Custom content" title="List Group with Custom content" style="cursor: pointer; display: inline;"></span></p>
<p>观察上图对应的代码可以知道，<code>a</code> 标签内的 <code>h5</code> 标签可用于显示待办事项的标题，相邻的 <code>small</code> 标签可用于显示时间，<code>a</code> 标签内最后的 <code>small</code> 标签则可用显示于事项的具体内容，因此 <code>TodoItem.vue</code> 组件中可以改成如下内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;list-group&quot;>
    <a
      href=&quot;#&quot;
      class=&quot;list-group-item list-group-item-action flex-column align-items-start&quot;
      v-for=&quot;task in tasks&quot;
      :key=&quot;task.id&quot;>
      <div class=&quot;d-flex w-100 justify-content-between&quot;>
        <h5 class=&quot;mb-1&quot;>"{{" task.title "}}"</h5>
        <small>"{{" task.createdAt "}}"</small>
      </div>
      <small>"{{" task.content "}}"</small>
    </a>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span>
      <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"list-group-item list-group-item-action flex-column align-items-start"</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"task in tasks"</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">"task.id"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"d-flex w-100 justify-content-between"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h5</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mb-1"</span>&gt;</span>"{{" task.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h5</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>"{{" task.createdAt "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>"{{" task.content "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>在浏览器中看看页面效果，怎么样，还不错吧？</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntV?w=2866&amp;h=811" src="https://static.alili.tech/img/bV4ntV?w=2866&amp;h=811" alt="TodoItem with Style" title="TodoItem with Style" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">从服务器获取数据</h3>
<p>在实际业务中，数据都是放在服务器上，往往会在前端页面加载完成之后，再向服务器请求数据。这样前后端分离，让前端页面只关注界面部分，数据由后端负责提供，将前后端解耦，就降低了互相之间的依赖性。</p>
<p>要向服务器请求数据，可以用 axios 这个库，和前面引入 Bootstrap 的 CSS 一样，编辑 <code>public</code> 目录下的 <code>index.html</code> 文件，将 axios 这个库的链接加进来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <script src=&quot;https://cdn.bootcss.com/axios/0.17.1/axios.min.js&quot;></script>
  </head>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/axios/0.17.1/axios.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>然后再编辑父组件 <code>App.vue</code>，将数据属性 <code>tasks</code> 的初始值设置为空数组，在 Vue 实例的 <code>created</code> 这个生命周期钩子中获取数据。数据方面参考<a href="http://xugaoyang.com/post/5a6c1f298957a723cf8845e2" rel="nofollow noreferrer" target="_blank">一个简单的 JSON 存储服务</a>这篇文章的建议 ，放在 myjson 上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const tasksUrl = &quot;https://api.myjson.com/bins/xxxxx&quot;;

export default {
  name: &quot;app&quot;,
  components: {
    TodoItem
  },
  data() {
    return {
      tasks: []
    };
  },
  methods: {
    fetchData(jsonUrl, obj) {
      axios
        .get(jsonUrl)
        .then(response => response.data)
        .then(data => {
          data.forEach(ele => {
            obj.push(ele);
          });
        })
        .catch(console.log());
    },
  },
  created() {
    this.fetchData(tasksUrl, this.tasks);
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> tasksUrl = <span class="hljs-string">"https://api.myjson.com/bins/xxxxx"</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"app"</span>,
  <span class="hljs-attr">components</span>: {
    TodoItem
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">tasks</span>: []
    };
  },
  <span class="hljs-attr">methods</span>: {
    fetchData(jsonUrl, obj) {
      axios
        .get(jsonUrl)
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.data)
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
          data.forEach(<span class="hljs-function"><span class="hljs-params">ele</span> =&gt;</span> {
            obj.push(ele);
          });
        })
        .catch(<span class="hljs-built_in">console</span>.log());
    },
  },
  created() {
    <span class="hljs-keyword">this</span>.fetchData(tasksUrl, <span class="hljs-keyword">this</span>.tasks);
  }
};</code></pre>
<p>从上面的代码可以看到，数据属性的值保存在 <code>tasksUrl</code> 这个 URL 中，通过 axios 获取数据。在 Vue 中更新数组，需要用特定的<a href="https://cn.vuejs.org/v2/guide/list.html#%E5%8F%98%E5%BC%82%E6%96%B9%E6%B3%95" rel="nofollow noreferrer" target="_blank">变异方法</a>，才能触发视图的更新，也就是上面代码中的 <code>obj.push(ele)</code>。</p>
<p>另外，上面将更新数据部分的代码抽离成一个单独的函数 <code>fetchData</code>，这样能够提高代码的可读性。否则如果 <code>created</code> 这个钩子中需要执行五六个操作的时候，把具体的代码全放到这里面，那代码就乱得没法看了。</p>
<h3 id="articleHeader5">
<code>v-cloak</code> 优化加载体验</h3>
<p>为了优化用户体验，可以用 <code>v-cloak</code> 指令，实现<a href="https://cn.vuejs.org/v2/api/#v-cloak" rel="nofollow noreferrer" target="_blank">组件在数据加载完成之后才显示</a>的功能。</p>
<p>具体的测试结果，可以看视频：<a href="http://7xq4gx.com1.z0.glb.clouddn.com/v-cloak_fast-3g.mp4" rel="nofollow noreferrer" target="_blank">http://7xq4gx.com1.z0.glb.clouddn.com/v-cloak_fast-3g.mp4</a>。</p>
<p>在上面这个视频中，通过 Chrome 开发者工具将网速限制为 "Fast 3G" 模式，以便更清楚地展示这个过程。然后点击刷新按钮加载页面，能够看到页面在成功获取到服务器上的数据之后，才会渲染组件内容并显示出来，在这之前页面则一直是空白状态。</p>
<h2 id="articleHeader6">TodoMenu 组件</h2>
<h3 id="articleHeader7">显示菜单按钮</h3>
<p>前面知道怎么用组件显示待办事项清单了，那么显示一个菜单列表也很容易了，照葫芦画瓢就行。</p>
<p>首先在父组件 <code>App.vue</code> 中准备数据 <code>menus</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  name: &quot;app&quot;,
  components: {
    TodoItem,
    TodoMenu
  },
  data() {
    return {
      tasks: [],
      menus: [
        { tag: &quot;all&quot;, text: &quot;全部&quot; },
        { tag: &quot;doing&quot;, text: &quot;未完成&quot; },
        { tag: &quot;done&quot;, text: &quot;已完成&quot; }
      ]
    };
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"app"</span>,
  <span class="hljs-attr">components</span>: {
    TodoItem,
    TodoMenu
  },
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">tasks</span>: [],
      <span class="hljs-attr">menus</span>: [
        { <span class="hljs-attr">tag</span>: <span class="hljs-string">"all"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"全部"</span> },
        { <span class="hljs-attr">tag</span>: <span class="hljs-string">"doing"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"未完成"</span> },
        { <span class="hljs-attr">tag</span>: <span class="hljs-string">"done"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"已完成"</span> }
      ]
    };
  }
}</code></pre>
<p>然后选择按钮的样式，自己选用了 <a href="https://v4.bootcss.com/docs/4.0/components/buttons/#outline-buttons" rel="nofollow noreferrer" target="_blank">Outline buttons</a>，组件代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <button
      type=&quot;button&quot;
      class=&quot;btn btn-outline-secondary&quot;
      v-for=&quot;menu in menus&quot;
      :key=&quot;menu.id&quot;>
      "{{" menu.text "}}"
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoMenu',
  props: {
    menus: {
      type: Array,
      required: true
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-outline-secondary"</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"menu in menus"</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">"menu.id"</span>&gt;</span>
      "{{" menu.text "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">'TodoMenu'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">menus</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Array</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>与之前编写 TodoItem 组件时相比，代码上主要的区别在于 <code>props</code> 的定义更加详细了，理由参见 Vue.js 官方文档中的风格指南：<a href="https://cn.vuejs.org/v2/style-guide/#Prop-%E5%AE%9A%E4%B9%89-%E5%BF%85%E8%A6%81" rel="nofollow noreferrer" target="_blank">Prop 定义</a>。</p>
<p>下面是当前的页面效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntS?w=2880&amp;h=976" src="https://static.alili.tech/img/bV4ntS?w=2880&amp;h=976" alt="TodoMenu" title="TodoMenu" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">样式改进</h3>
<p>基本的功能做出来了，接着来调整一下 TodoMenu 组件的样式，让它更好看一些。</p>
<p>首先是要给按钮之间加上间距，也是前面提到过的<strong>留白</strong>，就跟设计 PPT 一样，把页面塞得满满的其实很难看。查看 Bootstrap 的文档 <a href="https://getbootstrap.com/docs/4.0/layout/utilities-for-layout/#margin-and-padding" rel="nofollow noreferrer" target="_blank">Margin and padding</a>，知道了可以用 <code>mr-x</code> 这样的类来设置右边距，测试了几个值之后，最终确定为 <code>mr-2</code>。</p>
<p>然后还要给上面的一排按钮和下面的待办事项清单之间也加上间距，这里就用 <code>mb-3</code> 设置按钮的下边距，之前在 TodoItem 组件中设置的 <code>mt-5</code> 则删掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <button
      type=&quot;button&quot;
      class=&quot;btn btn-outline-primary mr-2 mb-3&quot;
      v-for=&quot;menu in menus&quot;
      :key=&quot;menu.id&quot;>
      "{{" menu.text "}}"
    </button>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>
      <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-outline-primary mr-2 mb-3"</span>
      <span class="hljs-attr">v-for</span>=<span class="hljs-string">"menu in menus"</span>
      <span class="hljs-attr">:key</span>=<span class="hljs-string">"menu.id"</span>&gt;</span>
      "{{" menu.text "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>现在的页面效果就是这个样子的了：</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntO?w=2880&amp;h=976" src="https://static.alili.tech/img/bV4ntO?w=2880&amp;h=976" alt="TodoMenu Beautified" title="TodoMenu Beautified" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">网页加载完成后突出显示第一个按钮</h3>
<p>查看 Bootstrap 的文档可以知道，给按钮添加一个 <code>active</code> 类，按钮就会处于被点击的状态。这样一来，只需要修改 <code>menus</code> 的数据结构，给每个对象添加一个名为 <code>active</code> 的布尔型变量，然后给 TodoMenu 组件动态绑定 <code>active</code> 类，就能实现页面加载完成后突出显示第一个按钮的功能了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.vue
menus: [
  { tag: &quot;all&quot;, text: &quot;全部&quot;, active: true },
  { tag: &quot;doing&quot;, text: &quot;未完成&quot;, active: false },
  { tag: &quot;done&quot;, text: &quot;已完成&quot;, active: false }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// App.vue</span>
menus: [
  { <span class="hljs-attr">tag</span>: <span class="hljs-string">"all"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"全部"</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">true</span> },
  { <span class="hljs-attr">tag</span>: <span class="hljs-string">"doing"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"未完成"</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span> },
  { <span class="hljs-attr">tag</span>: <span class="hljs-string">"done"</span>, <span class="hljs-attr">text</span>: <span class="hljs-string">"已完成"</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">false</span> }
]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- TodoMenu.vue 只列出了新增的部分 -->
<template>
  <div>
    <button
      :class=&quot;{active: menu.active}&quot;>
    </button>
  </div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- TodoMenu.vue 只列出了新增的部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      <span class="hljs-attr">:class</span>=<span class="hljs-string">"{active: menu.active}"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4ntP?w=2880&amp;h=930" src="https://static.alili.tech/img/bV4ntP?w=2880&amp;h=930" alt="TodoMenu - First Button Actived" title="TodoMenu - First Button Actived" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">突出当前被点击的按钮</h3>
<p>除了要在网页加载完成后突出显示第一个按钮，还需要在用户点击各个按钮之后，突出显示用户所点击的按钮，这样能够让用户很清楚地看到自己所选中的是哪个按钮。</p>
<p>实现这个需求的流程如下（用了库 ramda）：</p>
<ol>
<li>查找 <code>menus</code> 中 <code>active</code> 属性为 <code>true</code> 的对象，也就是之前被点击的按钮对应的数据。</li>
<li>查找 <code>menus</code> 中当前被点击的按钮对应的对象：这个需要在子组件 <code>TodoMenu.vue</code> 中触发事件，将被点击的按钮所对应的数据（<code>menu.tag</code>）传递给父组件 <code>App.vue</code>，然后在父组件中查找该数据所对应的对象，如果和第一次查找的对象相同，说明前后两次点击了同一个按钮，那么就不用重复操作了。否则就需要把前一次点击的按钮的 <code>active</code> 属性设置为 <code>false</code>，然后将当前被点击的按钮的 <code>active</code> 属性设置为 <code>true</code>，这样就能够突出显示被点击的按钮了。</li>
</ol>
<p>新增的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<head>
  <script src=&quot;https://cdn.bootcss.com/ramda/0.25.0/ramda.min.js&quot;></script>
</head>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.bootcss.com/ramda/0.25.0/ramda.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- TodoMenu.vue -->
<template>
  <div>
    <button
      @click=&quot;activeButton(menu.tag)&quot;>
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    activeButton (tag) {
      this.$emit('active', tag);
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- TodoMenu.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>
      @<span class="hljs-attr">click</span>=<span class="hljs-string">"activeButton(menu.tag)"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    activeButton (tag) {
      <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'active'</span>, tag);
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上面是组件 <code>TodoMenu.vue</code> 新增的代码，用户点击按钮之后，会执行该组件内的 <code>activeButton</code> 函数。在函数中会触发 <code>active</code> 事件，并将当前按钮所对应对象的 <code>tag</code> 属性的值传给父组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- App.vue -->
<template>
  <div id=&quot;app&quot;>
    <div class=&quot;col-md-8 offset-md-2 mt-5&quot;>
      <TodoMenu
        :menus=&quot;menus&quot;
        @active=&quot;activeButton&quot; />
  </div>
</template>

<script>
export default {
  methods: {
    activeButton(tag) {
      let prevIndex = R.findIndex(R.propEq('active', true))(this.menus);
      let currIndex = R.findIndex(R.propEq('tag', tag))(this.menus);
      if (prevIndex !== currIndex) {
        this.menus[prevIndex].active = false;
        this.menus[currIndex].active = true;
      }
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- App.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-8 offset-md-2 mt-5"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">TodoMenu</span>
        <span class="hljs-attr">:menus</span>=<span class="hljs-string">"menus"</span>
        @<span class="hljs-attr">active</span>=<span class="hljs-string">"activeButton"</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">methods</span>: {
    activeButton(tag) {
      <span class="hljs-keyword">let</span> prevIndex = R.findIndex(R.propEq(<span class="hljs-string">'active'</span>, <span class="hljs-literal">true</span>))(<span class="hljs-keyword">this</span>.menus);
      <span class="hljs-keyword">let</span> currIndex = R.findIndex(R.propEq(<span class="hljs-string">'tag'</span>, tag))(<span class="hljs-keyword">this</span>.menus);
      <span class="hljs-keyword">if</span> (prevIndex !== currIndex) {
        <span class="hljs-keyword">this</span>.menus[prevIndex].active = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.menus[currIndex].active = <span class="hljs-literal">true</span>;
      }
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>而上面的这段代码则是父组件 <code>App.vue</code> 中新增的代码，父组件监听到了子组件触发的 <code>active</code> 事件，就会执行父组件中的 <code>activeButton</code> 函数，对比两次点击的是否为同一按钮，然后根据结果执行对应的操作：如果点击的是不同的按钮，则将之前所点击的按钮对应的对象属性 <code>active</code> 值设置为 <code>false</code>，并将当前点击的按钮对应的对象属性的 <code>active</code> 的值设置为 <code>true</code>，Vue 监听到对象属性的变化，从而将类名动态绑定到 HTML 标签上，实现按钮的突出显示。</p>
<p>PS：自己之前的实现方案，是通过 jQuery 先将 <code>menus</code> 中所有对象的 <code>active</code> 属性设置为 <code>false</code>，然后用原生 JS 将触发了监听事件对象的 <code>active</code> 属性设置为 <code>true</code>，虽然代码也很简洁，但是代码的逻辑还是不如用 ramda 这个库的实现方式清晰。</p>
<h3 id="articleHeader11">点击按钮显示对应事项</h3>
<p>这个需求可以在上一个需求的流程里完成，就是页面加载完成时，显示全部的待办事项；之后每次用户点击按钮，和前一次突出显示的按钮进行对比，如果相同，说明显示的还是那些待办事项，自然不用做什么操作；如果不同，那就显示按钮所对应分类的待办事项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default {
  data() {
    return {
      currTag: &quot;&quot;
    }
  },
  computed: {
    filteredTasks() {
      if (this.currTag === &quot;all&quot;) {
        return JSON.parse(JSON.stringify(this.tasks));
      } else if (this.currTag === &quot;doing&quot;) {
        return R.filter(task => task.completed === false)(this.tasks);
      } else if (this.currTag === &quot;done&quot;) {
        return R.filter(task => task.completed === true)(this.tasks);
      } else {
        return null;
      }
    }
  },
  methods: {
    fetchData(jsonUrl, obj) {
      axios
        .get(jsonUrl)
        .then(response => response.data)
        .then(data => {
          data.forEach(ele => {
            obj.push(ele);
          });
        })
        .then((this.currTag = &quot;all&quot;))
        .catch(console.log());
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">currTag</span>: <span class="hljs-string">""</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    filteredTasks() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.currTag === <span class="hljs-string">"all"</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.tasks));
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.currTag === <span class="hljs-string">"doing"</span>) {
        <span class="hljs-keyword">return</span> R.filter(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> task.completed === <span class="hljs-literal">false</span>)(<span class="hljs-keyword">this</span>.tasks);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.currTag === <span class="hljs-string">"done"</span>) {
        <span class="hljs-keyword">return</span> R.filter(<span class="hljs-function"><span class="hljs-params">task</span> =&gt;</span> task.completed === <span class="hljs-literal">true</span>)(<span class="hljs-keyword">this</span>.tasks);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    fetchData(jsonUrl, obj) {
      axios
        .get(jsonUrl)
        .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.data)
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
          data.forEach(<span class="hljs-function"><span class="hljs-params">ele</span> =&gt;</span> {
            obj.push(ele);
          });
        })
        .then((<span class="hljs-keyword">this</span>.currTag = <span class="hljs-string">"all"</span>))
        .catch(<span class="hljs-built_in">console</span>.log());
    }
  }
}</code></pre>
<p>在上面的代码中，通过字符串属性 <code>currTag</code> 标记当前所点击的按钮，计算属性 <code>filteredTaks</code> 则根据 <code>currTag</code> 的值筛选出所要显示的待办事项。而在 <code>fetchData</code> 方法中，新增的 <code>.then((this.currTag = "all"))</code> 会在获取到数据之后设置所要显示的事项类别，这样整个流程就完整了。</p>
<p>上面这些只是功能上的变动，在界面部分也要对应调整，这样才能有更好的用户体验。具体来说，就是对于已完成的待办事项，复选框应为选中状态，并且文字的颜色要淡一些，这样才能和未完成的待办事项区分开来。</p>
<p>而实际的代码其实很简单，就是将传入组件的数据与 HTML 元素动态绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 将 task.completed 属性与复选框的 checked 属性相绑定 -->
<input
  type=&quot;checkbox&quot;
  :checked=&quot;task.completed&quot;>

<!-- 将 task.completed 与包含文字的 div 元素的 text-muted 这个类相绑定 -->
<div
  class=&quot;col-md-11 d-flex w-100 justify-content-between&quot;
  :class=&quot;{'text-muted': task.completed}&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 将 task.completed 属性与复选框的 checked 属性相绑定 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span>
  <span class="hljs-attr">:checked</span>=<span class="hljs-string">"task.completed"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 将 task.completed 与包含文字的 div 元素的 text-muted 这个类相绑定 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>
  <span class="hljs-attr">class</span>=<span class="hljs-string">"col-md-11 d-flex w-100 justify-content-between"</span>
  <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'text-muted': task.completed}"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>下面是调整好界面之后的效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntN?w=2873&amp;h=634" src="https://static.alili.tech/img/bV4ntN?w=2873&amp;h=634" alt="Highlight Clicked Button" title="Highlight Clicked Button" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">Todo Edit 组件</h2>
<h3 id="articleHeader13">点击待办事项后显示编辑界面</h3>
<p>首先设计编辑界面的基本样式，在这里用的是 Bootstrap 中的 <a href="https://getbootstrap.com/docs/4.0/components/card/" rel="nofollow noreferrer" target="_blank">Card</a> 这个组件，这样可以把内部的元素都包裹到 <code>card</code> 中。待办事项的标题和内容显示在 <code>textarea</code> 元素中，待办事项的创建时间则显示在 <code>card-footer</code> 中。这个组件的代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- TodoEdit.vue -->
<template>
  <div class=&quot;card mt-3 mb-5&quot;>
    <div class=&quot;card-body&quot;>
      <div class=&quot;form-group&quot;>
        <textarea
          id=&quot;title&quot;
          class=&quot;form-control font-weight-bold&quot;
          rows=&quot;1&quot;
          v-model=&quot;task.title&quot;>
        </textarea>
        <textarea
          id=&quot;content&quot;
          class=&quot;form-control mt-1&quot;
          rows=&quot;3&quot;
          v-model=&quot;task.content&quot;>
        </textarea>
      </div>
    </div>
    <div class=&quot;card-footer text-muted&quot;>
      创建于："{{" task.createdAt "}}"
    </div>
  </div>
</template>

<script>
export default {
  name: &quot;TodoEdit&quot;,
  props: {
    task: {
      type: Object
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- TodoEdit.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card mt-3 mb-5"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-body"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form-group"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control font-weight-bold"</span>
          <span class="hljs-attr">rows</span>=<span class="hljs-string">"1"</span>
          <span class="hljs-attr">v-model</span>=<span class="hljs-string">"task.title"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>
          <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>
          <span class="hljs-attr">class</span>=<span class="hljs-string">"form-control mt-1"</span>
          <span class="hljs-attr">rows</span>=<span class="hljs-string">"3"</span>
          <span class="hljs-attr">v-model</span>=<span class="hljs-string">"task.content"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"card-footer text-muted"</span>&gt;</span>
      创建于："{{" task.createdAt "}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">"TodoEdit"</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">task</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>从上面的代码中可以看到，将 <code>id</code> 为 <code>title</code> 的 <code>textarea</code> 与 <code>task.title</code> 属性进行了双向绑定，<code>id</code> 为 <code>content</code> 的 <code>textarea</code> 则与 <code>task.content</code> 属性进行了双向绑定，分别用来显示待办事项的标题和内容。</p>
<p>在父组件 <code>App.vue</code> 中，对象类型的数据属性 <code>currTask</code> 保存子组件 <code>TodoEdit.vue</code> 中所要显示的待办事项，并通过布尔类型的计算属性 <code>renderEdit</code> 决定是否要渲染子组件 <code>TodoEdit.vue</code>。在用户还没有点击待办事项的时候，还不需要渲染编辑界面，数据属性 <code>currTask</code> 还是个空对象，计算属性 <code>renderEdit</code> 为 <code>false</code>。在用户点击了某个待办事项之后，需要在编辑界面中显示数据属性 <code>currTask</code> 中的内容，计算属性 <code>renderEdit</code> 为 <code>true</code>，这样才会渲染子组件 <code>TodoEdit.vue</code>。</p>
<p>父组件 <code>App.vue</code> 中新增的代码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- App.vue -->
<template>
  <TodoEdit
    :task=&quot;currTask&quot;
    v-if=&quot;renderEdit&quot; />
</template>

<script>
export default {
  data() {
    return {
      currTask: {}
    }
  },
  computed: {
    renderEdit() {
      return Object.keys(this.currTask).length > 0 &amp;&amp; this.currTask.constructor === Object;
    }
  },
  methods: {
    editTask(task) {
      this.currTask = JSON.parse(JSON.stringify(task));
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- App.vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">TodoEdit</span>
    <span class="hljs-attr">:task</span>=<span class="hljs-string">"currTask"</span>
    <span class="hljs-attr">v-if</span>=<span class="hljs-string">"renderEdit"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">currTask</span>: {}
    }
  },
  <span class="hljs-attr">computed</span>: {
    renderEdit() {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.currTask).length &gt; <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>.currTask.constructor === <span class="hljs-built_in">Object</span>;
    }
  },
  <span class="hljs-attr">methods</span>: {
    editTask(task) {
      <span class="hljs-keyword">this</span>.currTask = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(task));
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>从上面的代码可以看到，在页面及数据加载完成之后，用户点击待办事项之前，不会显示编辑界面。用户点击待办事项之后，将当前事项的信息保存至数据属性 <code>currTask</code> 中，计算属性 <code>renderEdit</code> 此时的值也为 <code>true</code>，便会渲染子组件 <code>TodoEdit.vue</code>，并将数据属性 <code>currTask</code> 的内容显示在子组件中。</p>
<p>完成之后的效果如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntR?w=2880&amp;h=1484" src="https://static.alili.tech/img/bV4ntR?w=2880&amp;h=1484" alt="Todo Edit UI" title="Todo Edit UI" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">样式改进</h3>
<p>按照上面的方法完善代码之后，现在可以显示待办事项的编辑界面了。但是点击待办事项的话，浏览器地址栏中的地址会在最后附加上一个 <code>#</code> 字符：<code>http://localhost:8080/#</code>。如果不想有这种变化，那么就可以去掉 <code>TodoItem.vue</code> 组件的 <code>href</code> 属性，然后设置鼠标悬浮至该组件的 <code>a</code> 标签时显示手型指针即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
a:hover {
  cursor: pointer;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">cursor</span>: pointer;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>此外，由于 <code>TodoEdit.vue</code> 组件中，显示待办事项标题和内容用的都是 <code>textarea</code> 标签，而这个标签是可以通过拖动其右下角的标记来改变其大小的。但是对于待办事项而言，标题的文字数量一般都不多，不希望改变其大小，那么就要为这个标签进行单独的设置，设置其 <code>resize</code> 属性为 <code>none</code> 即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
#title {
  resize: none;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-id">#title</span> {
  <span class="hljs-attribute">resize</span>: none;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>此时的效果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV4ntQ?w=2880&amp;h=1484" src="https://static.alili.tech/img/bV4ntQ?w=2880&amp;h=1484" alt="Todo Edit UI Beautified" title="Todo Edit UI Beautified" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader15">切换编辑界面的显示状态</h3>
<p>这个功能所要实现的效果，就是用户连续多次点击同一个待办事项时，编辑界面会在显示/隐藏两种状态之间来回切换，给用户以更好的使用体验。</p>
<p>最开始的思路：</p>
<ol>
<li>新建数据属性 <code>prevId</code> 用于保存用户上一次点击的待办事项的 <code>id</code> 属性，并且将用户本次点击的待办事项的 <code>id</code> 属性与之进行对比。</li>
<li>如果两个属性值不同，说明前后两次点击的是不同的待办事项，就不需要隐藏编辑界面，并且将用户本次所点击的待办事项的 <code>id</code> 属性保存在 <code>prevId</code> 中，这样用户下一次再点击待办事项，就能与更新后的 <code>prevId</code> 属性进行对比。</li>
<li>如果两个属性值相同，说明两次点击的是同一个待办事项，那么 <code>prevId</code> 属性就没必要更新了，同时要切换编辑界面的显示状态。</li>
</ol>
<p>从前面的代码可以知道，计算属性 <code>renderEdit</code> 的值决定了是否要渲染组件 <code>TodoEdit.vue</code>，数据属性 <code>currTask</code> 非空就会渲染。而用户首次点击待办事项之后，<code>currTask</code> 就永远都是非空的了，也就意味着编辑界面一直会被渲染。而这里需要实现的功能，是要让这个组件在显示/隐藏两种状态之间来回切换，需要注意的是，组件的“渲染”和“显示”是两回事，被渲染出来的组件，可以通过设置其 <code>display</code> 这个 CSS 属性的值为 <code>false</code> 来把它隐藏了。那么 Vue.js 中有没有类似的方式实现这个功能呢？当然有！那就是 <code>v-show</code> 指令。该指令后跟的表达式只要为真值，就会显示该元素，否则就会隐藏该元素。这不刚好就是我们需要的功能吗？这样一来，就可以通过优化代码逻辑，让上面新建的数据属性 <code>prevId</code> 来完成两件事：一方面这个数据属性可以用来保存每次点击的待办事项的 <code>id</code> 属性，另一方面还可以用它来决定是否要显示编辑界面。啊哈，一举两得，是不是很爽？另外，<code>prevId</code> 这个名称只是表示了它最原始的含义，其实可以重命名为 <code>showEdit</code>，用来表示它最终的业务逻辑，这样在阅读代码的时候就更容易理解了。下面就是优化后的代码逻辑：</p>
<ol>
<li>页面加载完成，<code>showEdit</code> 为空。</li>
<li>首次点击某个事项，保存 <code>id</code> 至 <code>showEdit</code>。</li>
<li>之后再点击同一个事项，<code>id</code> 与 <code>showEdit</code> 相同，则清空 <code>showEdit</code>。</li>
<li>点击不同的事项，<code>id</code> 与 <code>showEdit</code> 不同，则更新至 <code>showEdit</code> 中。</li>
</ol>
<p>流程已经很清楚了，代码自然也是水到渠成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<TodoEdit
  v-show=&quot;showEdit&quot; />
</template>

<script>
export default {
  data() {
    return {
      showEdit: &quot;&quot;
    }
  },
  methods: {
    editTask(task) {
      // 仅列出该方法中新增的部分
      !this.showEdit
        ? this.showEdit = task.id
        : this.showEdit === task.id
          ? this.showEdit = ''
          : this.showEdit = task.id;
    }
  }
}
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">TodoEdit</span>
  <span class="hljs-attr">v-show</span>=<span class="hljs-string">"showEdit"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">showEdit</span>: <span class="hljs-string">""</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    editTask(task) {
      <span class="hljs-comment">// 仅列出该方法中新增的部分</span>
      !<span class="hljs-keyword">this</span>.showEdit
        ? <span class="hljs-keyword">this</span>.showEdit = task.id
        : <span class="hljs-keyword">this</span>.showEdit === task.id
          ? <span class="hljs-keyword">this</span>.showEdit = <span class="hljs-string">''</span>
          : <span class="hljs-keyword">this</span>.showEdit = task.id;
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>俗话说优化无止境，上面的 <code>editTask</code> 方法中新增的代码，其实还可以进一步优化，不知道你有没有想到该如何优化呢？快动手试试吧！</p>
<h3 id="articleHeader16">点击“保存”按钮，保存更改</h3>
<h2 id="articleHeader17">Header 组件</h2>
<h3 id="articleHeader18">添加 Header 及文本内容</h3>
<h3 id="articleHeader19">添加 Icon Font</h3>
<h2 id="articleHeader20">Footer 组件</h2>
<h3 id="articleHeader21">添加固定在底部的 Footer</h3>
<h2 id="articleHeader22">参考资料</h2>
<ul><li>
<a href="https://github.com/dear-github/dear-github/issues/166" rel="nofollow noreferrer" target="_blank">Collapsible contents (code block) in comments / spoiler tag · Issue #166 · dear-github/dear-github</a>：用 Markdown 语法，实现内容的折叠效果。不过最后呈现出来的效果不好，就没有用上。</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
组件化 Todo List 编写笔记

## 原文链接
[https://segmentfault.com/a/1190000013397527](https://segmentfault.com/a/1190000013397527)

