---
title: 'Vue-todolist' 
date: 2018-12-26 2:30:14
hidden: true
slug: 2ffzitgztce
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-todolist</h1>
<h3 id="articleHeader1">完成成品<a href="https://han-lun.github.io/vue-todolist/." rel="nofollow noreferrer" target="_blank">Vue-todolist</a>
</h3>
<p>基于Vue的TodoList示例，麻雀虽小，五脏俱全</p>
<h2 id="articleHeader2">技术栈</h2>
<p>Vue + localStorage + hash</p>
<h2 id="articleHeader3">功能描述(使用说明)</h2>
<ul>
<li><p>添加备忘录(输入标题后回车添加,如果内容为空或只有空格会清空，什么都不添加)</p></li>
<li><p>删除备忘录(点击标题后面的叉)</p></li>
<li><p>完成备忘录(点击标题前面的复选框)</p></li>
<li><p>编辑备忘录(双击标题进入编辑模式)</p></li>
<li><p>取消编辑备忘录(按ESC或者失去焦点时)</p></li>
<li><p>完成编辑备忘录(按回车键完成[如果内容为空的时候会自动删除]，此时也会调用到失去焦点事件)</p></li>
<li><p>一键完成所有备忘录(点击第一行的复选框)</p></li>
<li><p>过滤任务，显示全部，未完成，已完成的备忘录(点击全部，未完成，已完成按钮)</p></li>
<li><p>清空已完成备忘录(点击清空已完成)</p></li>
</ul>
<h2 id="articleHeader4">Vue相关知识点练习：</h2>
<h3 id="articleHeader5">加载环境</h3>
<blockquote><p>npm init -y<br>npm i -S underscore vue todomvc-app-css<br>vim index.html<br>复制格式化后的html<br>引入css<br>将英文标题换成中文标题<br>引入vue.js<br>新建vue的实例<br>写一个默认的任务：todoList: [{}]</p></blockquote>
<h3 id="articleHeader6">el选项挂载DOM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  // 新建一个Vue的实例对象
  var todoapp = new Vue({
    // 挂载
    el: '.todoapp',
    // 数据
    data: {
         // 备忘录数组
      todoList: [
        // 一个任务就是一个对象，text表示任务的名称，checked为true表示已完成，false表示未完成
        {
          text: '学Vue',
          checked: false
        },
        {
          text: '学React',
          checked: false
        }
      ]
    },
    方法
    methods: {

    },
    // 计算属性
    computed: {

    }
  })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>  <span class="hljs-comment">// 新建一个Vue的实例对象</span>
  <span class="hljs-keyword">var</span> todoapp = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-comment">// 挂载</span>
    el: <span class="hljs-string">'.todoapp'</span>,
    <span class="hljs-comment">// 数据</span>
    data: {
         <span class="hljs-comment">// 备忘录数组</span>
      todoList: [
        <span class="hljs-comment">// 一个任务就是一个对象，text表示任务的名称，checked为true表示已完成，false表示未完成</span>
        {
          text: <span class="hljs-string">'学Vue'</span>,
          <span class="hljs-keyword">checked</span>: <span class="hljs-literal">false</span>
        },
        {
          text: <span class="hljs-string">'学React'</span>,
          <span class="hljs-keyword">checked</span>: <span class="hljs-literal">false</span>
        }
      ]
    },
    方法
    methods: {

    },
    <span class="hljs-comment">// 计算属性</span>
    computed: {

    }
  })
</code></pre>
<h3 id="articleHeader7">属性</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
      newTodo: '',
      todos: todoStorage.fetch(),
      editedTodo: null,
      beforeEditCache: '',
      visibility
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">data</span>: {
      <span class="hljs-attribute">newTodo</span>: <span class="hljs-string">''</span>,
      todos: todoStorage.<span class="hljs-built_in">fetch</span>(),
      editedTodo: null,
      beforeEditCache: <span class="hljs-string">''</span>,
      visibility
    }</code></pre>
<h3 id="articleHeader8">计算属性（get,set）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
      //显示任务总数量
      showTodos() {
        return this.todos.length > 0
      },
      //未完成
      activeCount() {
        return filters.active(this.todos).length
      },
      //已完成
      completedCount() {
        return filters.completed(this.todos).length
      },
      //判断所有任务
      allDone: {
        get() {
          return this.activeCount === 0
        },
        set(value) {
          this.todos.map(todo => {
            todo.completed = value
          })
        }
      },
      //判断
      filteredTodos() {
        return filters[this.visibility](this.todos)
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>computed: {
      <span class="hljs-comment">//显示任务总数量</span>
      showTodos() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.todos.length &gt; <span class="hljs-number">0</span>
      },
      <span class="hljs-comment">//未完成</span>
      activeCount() {
        <span class="hljs-keyword">return</span> filters.active(<span class="hljs-keyword">this</span>.todos).length
      },
      <span class="hljs-comment">//已完成</span>
      completedCount() {
        <span class="hljs-keyword">return</span> filters.completed(<span class="hljs-keyword">this</span>.todos).length
      },
      <span class="hljs-comment">//判断所有任务</span>
      allDone: {
        <span class="hljs-keyword">get</span>() {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.activeCount === <span class="hljs-number">0</span>
        },
        <span class="hljs-keyword">set</span>(value) {
          <span class="hljs-keyword">this</span>.todos.map(todo =&gt; {
            todo.completed = value
          })
        }
      },
      <span class="hljs-comment">//判断</span>
      filteredTodos() {
        <span class="hljs-keyword">return</span> filters[<span class="hljs-keyword">this</span>.visibility](<span class="hljs-keyword">this</span>.todos)
      }
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//store.js的判断获取
(function(){
  var STORAGE_KEY = 'todos'
  window.todoStorage = {
    fetch() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      } catch(err) {
        return [];
      }
    },
    save(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//store.js的判断获取</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> STORAGE_KEY = <span class="hljs-string">'todos'</span>
  <span class="hljs-built_in">window</span>.todoStorage = {
    fetch() {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(STORAGE_KEY) || <span class="hljs-string">'[]'</span>)
      } <span class="hljs-keyword">catch</span>(err) {
        <span class="hljs-keyword">return</span> [];
      }
    },
    save(todos) {
      localStorage.setItem(STORAGE_KEY, <span class="hljs-built_in">JSON</span>.stringify(todos))
    }
  }
})();</code></pre>
<h3 id="articleHeader9">属性观察</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var filters = {
    all: todos => todos,
    active: todos => todos.filter(todo => !todo.completed),
    completed: todos => todos.filter(todo => todo.completed)
  }
  var visibility = location.hash.substr(location.hash.indexOf('/')+1)
  visibility = visibility === '' ? 'all' : visibility

watch: {
      todos: {
        deep: true,
        handler: todoStorage.save//判断当前应显示的内容
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">var</span> filters = {
    <span class="hljs-attr">all</span>: <span class="hljs-function"><span class="hljs-params">todos</span> =&gt;</span> todos,
    <span class="hljs-attr">active</span>: <span class="hljs-function"><span class="hljs-params">todos</span> =&gt;</span> todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> !todo.completed),
    <span class="hljs-attr">completed</span>: <span class="hljs-function"><span class="hljs-params">todos</span> =&gt;</span> todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> todo.completed)
  }
  <span class="hljs-keyword">var</span> visibility = location.hash.substr(location.hash.indexOf(<span class="hljs-string">'/'</span>)+<span class="hljs-number">1</span>)
  visibility = visibility === <span class="hljs-string">''</span> ? <span class="hljs-string">'all'</span> : visibility

watch: {
      <span class="hljs-attr">todos</span>: {
        <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">handler</span>: todoStorage.save<span class="hljs-comment">//判断当前应显示的内容</span>
      }
    }</code></pre>
<h3 id="articleHeader10">方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
      addTodo() {
        this.newTodo = this.newTodo.trim()
        if (!this.newTodo) {
          return
        }
        this.todos.unshift({
          title: this.newTodo,
          completed: false
        })
        this.newTodo = ''
      },
      removeTodo(todo) {
        var index = this.todos.indexOf(todo)
        this.todos.splice(index, 1)
      },
      editTodo(todo) {
        this.editedTodo = todo
        this.beforeEditCache = todo.title
      },
      doneEdit(todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim()
        if (!todo.title) {
          this.removeTodo(todo)
        }
      },
      cancelEdit(todo) {
        if (this.editedTodo) {
          todo.title = this.beforeEditCache
          this.editedTodo = null
        }
      },
      removeCompleted() {
        this.todos = filters.active(this.todos)
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>methods: {
      addTodo() {
        <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-keyword">this</span>.newTodo.trim()
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.newTodo) {
          <span class="hljs-keyword">return</span>
        }
        <span class="hljs-keyword">this</span>.todos.unshift({
          title: <span class="hljs-keyword">this</span>.newTodo,
          completed: <span class="hljs-literal">false</span>
        })
        <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-string">''</span>
      },
      removeTodo(todo) {
        <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.todos.indexOf(todo)
        <span class="hljs-keyword">this</span>.todos.splice(index, <span class="hljs-number">1</span>)
      },
      editTodo(todo) {
        <span class="hljs-keyword">this</span>.editedTodo = todo
        <span class="hljs-keyword">this</span>.beforeEditCache = todo.title
      },
      doneEdit(todo) {
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.editedTodo) {
          <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.editedTodo = <span class="hljs-literal">null</span>;
        todo.title = todo.title.trim()
        <span class="hljs-keyword">if</span> (!todo.title) {
          <span class="hljs-keyword">this</span>.removeTodo(todo)
        }
      },
      cancelEdit(todo) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.editedTodo) {
          todo.title = <span class="hljs-keyword">this</span>.beforeEditCache
          <span class="hljs-keyword">this</span>.editedTodo = <span class="hljs-literal">null</span>
        }
      },
      removeCompleted() {
        <span class="hljs-keyword">this</span>.todos = filters.active(<span class="hljs-keyword">this</span>.todos)
      }
    }</code></pre>
<h3 id="articleHeader11">指令</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" directives: {
      focus: {
        update(el) {
          el.focus()
        }
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> <span class="hljs-selector-tag">directives</span>: {
      <span class="hljs-attribute">focus</span>: {
        <span class="hljs-built_in">update</span>(el) {
          el.<span class="hljs-built_in">focus</span>()
        }
      }
    }</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-todolist

## 原文链接
[https://segmentfault.com/a/1190000011973250](https://segmentfault.com/a/1190000011973250)

