---
title: 'React从入门到精通系列之(8)Lists和Keys的处理' 
date: 2019-01-30 2:30:22
hidden: true
slug: 8oi2k6ued43
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">八、Lists和Keys的处理</h2>
<p>首先，让我们回顾一下如何在JavaScript中遍历lists。</p>
<p>下面的代码，我们使用<code>map()</code>函数获取一个<code>数字</code>数组，并将它们的值加倍。 我们将<code>map()</code>返回的新数组赋给变量<code>doubled</code>并记录下来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(item => item * 2);
console.log(doubled); //=> [2, 4, 6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> doubled = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item * <span class="hljs-number">2</span>);
<span class="hljs-built_in">console</span>.log(doubled); <span class="hljs-comment">//=&gt; [2, 4, 6, 8, 10]</span></code></pre>
<p>上面的代码会在控制台打印<code>[2, 4, 6, 8, 10]</code>。<br>在React中，将数组转换为<code>元素集合</code>几乎和上面的代码是一样的。</p>
<h4>渲染多个组件</h4>
<p>您可以自己一个创建元素集合，并使用花括号<code>{}</code>将它们包含在JSX中。<br>下面，我们使用Javascript <code>map()</code>函数循环一个数字数组。 我们为每个<code>item</code>返回一个<code>&lt;li&gt;</code>元素。 最后，我们将结果数组的元素赋给<code>listItems</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(item => <li>{item}</li>);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> &lt;li&gt;{item}&lt;<span class="hljs-regexp">/li&gt;);</span></code></pre>
<p>我们将整个<code>listItems</code>数组包含在<code>&lt;ul&gt;</code>元素中，并将其渲染到DOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <ul>{listItems}</ul>,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{listItems}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>,
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
)</code></pre>
<p>此代码将会显示1到5之间的数字。</p>
<h4>基础的List组件</h4>
<p>通常你会将List放在组件中。<br>我们可以将前面的例子重构为接受数字数组的组件，并输出一个无序的元素列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(item => <li>{item}</li>);

    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> numbers = props.numbers;
    <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> &lt;li&gt;{item}&lt;<span class="hljs-regexp">/li&gt;);

    return (
        &lt;ul&gt;{listItems}&lt;/u</span>l&gt;
    );
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NumberList</span> <span class="hljs-attr">numbers</span>=<span class="hljs-string">{numbers}</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<blockquote><p>当您运行此代码时，将会收到一条警告，<code>Each child in an array or iterator should have a unique "key" prop. Check the render method of "NumberList".</code></p></blockquote>
<p>提示指出应该为列表的每一项提供一个属性<code>key</code>。 <code>“key”</code>是创建元素列表时需要包含的特殊字符串属性。 我们将在下一节讨论为什么它很重要。</p>
<p>让我们给<code>numbers.map()</code>的列表项分配一个<code>key</code>，并修复那个提示缺少<code>key</code>的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function NumberList(props) {
    const numbers = props.numbers;
-    const listItems = numbers.map(item => <li>{item}</li>);
+    const listItems = numbers.map(item => <li key={item.toString()}>{item}</li>);

    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers}/>,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> numbers = props.numbers;
-    <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> &lt;li&gt;{item}&lt;<span class="hljs-regexp">/li&gt;);
+    const listItems = numbers.map(item =&gt; &lt;li key={item.toString()}&gt;{item}&lt;/</span>li&gt;);

    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{listItems}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NumberList</span> <span class="hljs-attr">numbers</span>=<span class="hljs-string">{numbers}/</span>&gt;</span>,
    document.getElementById('root')
)</span></code></pre>
<h3 id="articleHeader1">Key的用法</h3>
<p><code>keys</code>帮助确定哪些<code>item</code>已更改，已添加或已删除。 应该给数组中的元素设置上<code>key</code>属性，以便给元素一个稳定的身份：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers =[1, 2, 3, 4, 5];
const listItems = numbers.map(item => 
    <li key={item.toString()}>
        {item}
    </li>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> numbers =[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> 
    &lt;li key={item.toString()}&gt;
        {item}
    &lt;<span class="hljs-regexp">/li&gt;
);</span></code></pre>
<p>最好的方法是使用一个<code>字符串</code>来选择<code>key</code>，它是其兄弟之间一个列表项的<code>唯一标识</code>。 通常，您会使用数据中的ID作为key：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const todoItems = todos.map(todo =>
    <li key={todo.id}>
        {todo.text}
    </li>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> todoItems = todos.map(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span>
    &lt;li key={todo.id}&gt;
        {todo.text}
    &lt;<span class="hljs-regexp">/li&gt;
);</span></code></pre>
<p>当您对已渲染的item没有稳定的ID时，您可以将项目index用作关键字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const todoItems = todos.map((todo, index) =>
    // 如果todo没有一个稳定的id，可以使用这种方法
    <li key={index}>
        {todo}
    </li>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> todoItems = todos.map(<span class="hljs-function">(<span class="hljs-params">todo, index</span>) =&gt;</span>
    <span class="hljs-comment">// 如果todo没有一个稳定的id，可以使用这种方法</span>
    &lt;li key={index}&gt;
        {todo}
    &lt;<span class="hljs-regexp">/li&gt;
);</span></code></pre>
<p>如果项目需要实现重新排序，我们不建议为key使用索引，因为这将很慢。</p>
<h4>合理提取组件中的Keys</h4>
<p><strong>Keys仅在循环时的上下文中有意义。</strong></p>
<p>例如，如果您提取了一个<code>ListItem</code>组件，则应该将该key保存在数组中的<code>&lt;ListItem /&gt;</code>元素上，而不是<code>ListItem</code>本身的根<code>&lt;li&gt;</code>元素上。</p>
<p><strong>示例：key的错误用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ListItem(props) {
    const value = props.value;
    return (
        <li key={value.toString()}>
            {value}
        </li>
    );
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(item =>
        // 这是错误的，这里应该设置上key
        <ListItem value={item} />
    );
    return (
        <ul>{listItems}</ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers}> />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ListItem</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> value = props.value;
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{value.toString()}</span>&gt;</span>
            {value}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>
    );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> numbers = props.numbers;
    <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span>
        <span class="hljs-comment">// 这是错误的，这里应该设置上key</span>
        &lt;ListItem value={item} /&gt;
    );
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{listItems}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NumberList</span> <span class="hljs-attr">numbers</span>=<span class="hljs-string">{numbers}</span>&gt;</span> /&gt;,
    document.getElementById('root')
)</span></code></pre>
<p><strong>实例：key的正确用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ListItem(props) {
    // 这才是正确的，在这里不需要设置key
    return <li>{props.value}</li>;
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map(item => 
        // 这才是正确的，在这里设置key
        <ListItem key={item.toString()} value={item} />
    );
    return (
        <ul>
            {listItems}
        </ul>
    );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ListItem</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-comment">// 这才是正确的，在这里不需要设置key</span>
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{props.value}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> numbers = props.numbers;
    <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> 
        <span class="hljs-comment">// 这才是正确的，在这里设置key</span>
        &lt;ListItem key={item.toString()} value={item} /&gt;
    );
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {listItems}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    );
}

<span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">NumberList</span> <span class="hljs-attr">numbers</span>=<span class="hljs-string">{numbers}</span> /&gt;</span>,
    document.getElementById('root')
)</span></code></pre>
<p><strong>注意：<code>map()</code>中的元素都需要属性key。在哪儿循环就在哪儿设置key。</strong></p>
<h4>key在兄弟组件中必须是唯一的</h4>
<p>数组中使用的<code>key</code>在其兄弟组件之间应该是唯一的。 但是，它们不需要是全局唯一的。 当我们生成两个不同的数组时，我们可以使用相同的键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Blog(props) {
   const sidebar = (
       <ul>
           {props.posts.map(post => 
               <li key={post.id}>
                   {post.title}
               </li>
           )}
       </ul>
   );
   
   const content = props.posts.map(post =>
      <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
      </div>
   );
   
   return (
       <div>
           {sidebar}
           <hr />
           {content}
       </div>
   );
}

const posts = [
    {id: 1, title: 'hello zhangyatao', content: 'you\'re so handsome!'},
    {id: 2, title: 'hi jiangyanyun', content: 'you\'re so beautiful!'}
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Blog</span>(<span class="hljs-params">props</span>) </span>{
   <span class="hljs-keyword">const</span> sidebar = (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
           {props.posts.map(post =&gt; 
               <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{post.id}</span>&gt;</span>
                   {post.title}
               <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
           )}
       <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
   );
   
   <span class="hljs-keyword">const</span> content = props.posts.map(<span class="hljs-function"><span class="hljs-params">post</span> =&gt;</span>
      &lt;div key={post.id}&gt;
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>{post.title}<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></span>
          &lt;p&gt;{post.content}&lt;<span class="hljs-regexp">/p&gt;
      &lt;/</span>div&gt;
   );
   
   <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
           {sidebar}
           <span class="hljs-tag">&lt;<span class="hljs-name">hr</span> /&gt;</span>
           {content}
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
   );
}

<span class="hljs-keyword">const</span> posts = [
    {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'hello zhangyatao'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'you\'re so handsome!'</span>},
    {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'hi jiangyanyun'</span>, <span class="hljs-attr">content</span>: <span class="hljs-string">'you\'re so beautiful!'</span>}
];

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Blog</span> <span class="hljs-attr">posts</span>=<span class="hljs-string">{posts}</span> /&gt;</span>,
    document.getElementById('root')
)</span></code></pre>
<p>key用来作为React的观察点，但它们不会传递给您的组件。 如果你需要在组件中使用相同的值，则使用不同的名称显式地将它作为props传递：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const content = posts.map(post =>
    <Post key={post.id} id={post.id} title={post.title} />
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> content = posts.map(<span class="hljs-function"><span class="hljs-params">post</span> =&gt;</span>
    &lt;Post key={post.id} id={post.id} title={post.title} /&gt;
);</code></pre>
<p>使用上面的示例，Post组件可以读取<code>props.id</code>，但不能读取<code>props.key</code>。</p>
<h4>在JSX中嵌入map()</h4>
<p>在上面的示例中，我们声明了一个单独的<code>listItems</code>变量并将其包含在JSX中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NumberList(props) {
   const numbers = props.numbers;
   const listItems = numbers.map(item =>
       <ListItem key={item.toString()} value={item} />
   );
   return (
       <ul>{listItems}</ul>
   );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
   <span class="hljs-keyword">const</span> numbers = props.numbers;
   <span class="hljs-keyword">const</span> listItems = numbers.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span>
       &lt;ListItem key={item.toString()} value={item} /&gt;
   );
   <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>{listItems}<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
   );
}</code></pre>
<p>JSX允许在大括号中嵌入任何表达式，所以我们可以内联<code>map()</code>结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function NumberList(props) {
    const numbers = props.numbers;
    return (
        <ul>
            {numbers.map(item =>
                <ListItem key={item.toString()} value={item} />
            )}
        </ul>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">NumberList</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> numbers = props.numbers;
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
            {numbers.map(item =&gt;
                <span class="hljs-tag">&lt;<span class="hljs-name">ListItem</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{item.toString()}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{item}</span> /&gt;</span>
            )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    );
}</span></code></pre>
<p>这会让我们的代码更清晰，这种风格可以被随意使用。 <br>就像在JavaScript中，它是由你决定是否值得提取一个变量的可读性。 <br>请记住，如果<code>map()</code>主体嵌套太多层，那么它是抽出一个组件的好时机。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(8)Lists和Keys的处理

## 原文链接
[https://segmentfault.com/a/1190000007798534](https://segmentfault.com/a/1190000007798534)

