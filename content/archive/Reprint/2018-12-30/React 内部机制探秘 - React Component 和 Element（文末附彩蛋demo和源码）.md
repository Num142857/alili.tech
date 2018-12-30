---
title: 'React 内部机制探秘 - React Component 和 Element（文末附彩蛋demo和源码）' 
date: 2018-12-30 2:30:10
hidden: true
slug: qgepungcgb9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">React 内部机制探秘 - React Component 和 Element（文末附彩蛋demo和源码）</h1>
<p>这篇文章比较偏基础，但是对入门 React 内部机制和实现原理却至关重要。算是为以后深入解读的一个入门，如果您已经非常清楚:</p>
<blockquote><p>React Component Render =&gt; JSX =&gt; React.createElement =&gt; Virtual Dom</p></blockquote>
<p>的流程，可以直接略过此文。</p>
<h2 id="articleHeader1">谷歌工程师一个风骚的问题</h2>
<p>在几个月前，谷歌的前端开发专家 Tyler McGinnis 在其个人 twitter 账号上发布了 <a href="https://twitter.com/tylermcginnis33/status/771087982858113024" rel="nofollow noreferrer" target="_blank">这样一条推文</a>，引发了对 React 组件的讨论。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011413617" src="https://static.alili.tech/img/remote/1460000011413617" alt="推文截图" title="推文截图" style="cursor: pointer; display: inline;"></span></p>
<p>他抛出来的问题是 ：如上述代码，<strong>React 组件 Icon 直接出现在代码中，到底算什么？</strong></p>
<p>提供的选项有：</p>
<ul>
<li>A. Component Declaration 组件声明</li>
<li>B. Component Invocation 组件调用</li>
<li>C. Component Instantiation 组件实例化</li>
<li>D. Using a Component 单纯地使用组件</li>
</ul>
<p>有趣的是，参与回答的开发者中：</p>
<ul>
<li>有 15% 选择了 A 项；</li>
<li>有 8% 选择了 B 项；</li>
<li>有 45% 选择了 C 项；</li>
<li>有 32% 选择了 D 项；</li>
</ul>
<p>对 React 开发经验丰富的前端工程师来说，这个问题其实很好理解。它的关键在于：<strong>真正明白 React Element 和 React Components，以及 JSX 抽象层是如连通 React 的。</strong>当然也需要明白一些浅显的 React 内部工作机制。</p>
<p>这篇文章，就带领大家研究一下这个 JSX 抽象层的奥秘和 <strong>React Reconciliation</strong> 过程。</p>
<h2 id="articleHeader2">React 和 React Element 到底是什么？</h2>
<p>让我们回到最初，思考一下最原始的问题，React 到底是什么？</p>
<p>简而言之，</p>
<blockquote><p>React is a library for building user interfaces.</p></blockquote>
<p>React 是一个构建视图层的类库(框架...whatever...)。不管 React 本身如何复杂，不管其生态如何庞大，<strong>构建视图</strong>始终是他的核心。记住这个信息，我们即将进入今天的第一个概念 — <strong>React Element</strong>。</p>
<p>简单地说，React Element 描述了“你想”在屏幕上看到的事物。</p>
<p>抽象地说，React Element 元素是一个描述了 Dom Node 的对象。</p>
<p>请注意我的用词 — “<strong>描述</strong>”，因为 React Element 并不是你在屏幕上看见的真实事物。相反地，他是一个描述真实事物的集合。存在的就是合理的，我们看来看看 React Element 存在的意义，以及为什么会有这样一个概念：</p>
<ul>
<li>JavaScript 对象很轻量。用对象来作为 React Element，那么 React 可以轻松的创建或销毁这些元素，而不必去太担心操作成本；</li>
<li>React 具有分析这些对象的能力，进一步，也具有分析虚拟 Dom 的能力。当改变出现时，（相比于真实 Dom）更新虚拟 Dom 的性能优势非常明显。</li>
</ul>
<p>为了创建我们描述 Dom Node 的对象（或者 React Element），我们可以使用 React.createElement 方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement( 
  'div', 
  {id: 'login-btn'}, 
  'Login'
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>const <span class="hljs-literal">element</span> = React.createElement( 
  <span class="hljs-string">'div'</span>, 
  {id: <span class="hljs-string">'login-btn'</span>}, 
  <span class="hljs-string">'Login'</span>
)
</code></pre>
<p>这里 React.createElement 方法接受三个参数：</p>
<ul>
<li>一个表述标签名称的字符串 (div, span, etc.)；</li>
<li>当前 React Element 需要具有的属性；</li>
<li>当前 React Element 要表达的内容，或者一个子元素。</li>
</ul>
<p>上面 React.createElement 方法调用之后，会返回一个 javascript 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
{ 
  type: 'div', 
  props: { 
    children: 'Login', 
    id: 'login-btn' 
  } 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
{ 
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'div'</span>, 
  props: { 
    children: <span class="hljs-string">'Login'</span>, 
    id: <span class="hljs-string">'login-btn'</span> 
  } 
}
</code></pre>
<p>接着当我们使用 ReactDOM.render 方法，这才渲染到真实 DOM 之上时，就会得到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='login-btn'>Login</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>='login-btn'&gt;Login&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p>而这个才是真实的 Dom 节点。</p>
<p>到目前为止，并没有什么很难理解的概念。</p>
<h2 id="articleHeader3">React Element 深入和 React Component</h2>
<p>这篇文章我们开篇就介绍了 React Element，而并不是像官网或者学习资料上来就介绍 React Component，我相信你理解了 React Element，理解 React Component 就是自然而然的事情了。</p>
<p>在真正开发时，我们并不直接使用 React.createElement，这样做简直太无聊了，每个组件都这样写一定会疯掉的。这时候就出现了 React Component，即 React 组件。</p>
<blockquote><p>A component is a function or a Class which optionally accepts input and returns a React element.</p></blockquote>
<p>没错，组件就是一个函数或者一个 Class（当然 Class 也是 function），它根据输入参数，并最终返回一个 React Element，而不需要我们直接手写无聊的 React Element。</p>
<p>所以说，实际上我们使用了 React Component 来生成 React Element，这对于开发体验的提升无疑是巨大的。</p>
<p>这里剖出一个思考题：<strong>所有 React Component 都需要返回  React Element 吗？</strong>显然是不需要的，那么 return null; 的 React 组件有存在的意义吗，它能完成并实现哪些巧妙的设计和思想？（请关注作者，下篇文章将会专门进行分析、讲解）</p>
<h3 id="articleHeader4">从场景实例来看问题</h3>
<p>接下来，请看这样一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button ({ onLogin }) { 
  return React.createElement( 
    'div', 
    {id: 'login-btn', onClick: onLogin}, 
    'Login' 
  )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> ({ onLogin }) { 
  <span class="hljs-keyword">return</span> <span class="hljs-type">React.createElement(</span> 
    <span class="hljs-symbol">'div</span>', 
    {id: <span class="hljs-symbol">'login</span>-btn', onClick: onLogin}, 
    <span class="hljs-symbol">'Login</span>' 
  )
}
</code></pre>
<p>我们定义了一个 Button 组件，它接收 onLogin 参数，并返回一个 React Element。注意 onLogin 参数是一个函数，并最终像 id:'login-btn' 一样成为了这个 React Element 的属性。</p>
<p>直到目前，我们见到了一个 React Element type 为 HTML 标签(“span”, “div”, etc)的情况。事实上，我们也可以传递另一个 React Element ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
  User, 
  {name: 'Lucas'},
  null 
)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> element = React.createElement(
  User, 
  {name: <span class="hljs-string">'Lucas'</span>},
  <span class="hljs-literal">null</span> 
)
</code></pre>
<p>注意此时 React.createElement 第一个参数是另一个 React Element，这与 type 值为 HTML 标签的情况不尽相同，当 React 发现 type 值为一个 class 或者函数时，它就会先看这个 class 或函数会返回什么样的 Element，并为这个 Element 设置正确的属性。</p>
<p>React 会一直不断重复这个过程（有点类似递归），直到没有 “createElement 调用 type 值为 class 或者 function” 的情况。</p>
<p>我们结合代码再来体会一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button ({ addFriend }) {
  return React.createElement(
    &quot;button&quot;, 
    { onClick: addFriend }, 
    &quot;Add Friend&quot; 
  ) 
} 
function User({ name, addFriend }) { 
  return React.createElement(
    &quot;div&quot;, 
    null,
    React.createElement( &quot;p&quot;, null, name ),
    React.createElement(Button, { addFriend })
  ) 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> <span class="hljs-params">({ addFriend })</span> </span>{
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"button"</span>, 
    { onClick: addFriend }, 
    <span class="hljs-string">"Add Friend"</span> 
  ) 
} 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span><span class="hljs-params">({ name, addFriend })</span> </span>{ 
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"div"</span>, 
    <span class="hljs-literal">null</span>,
    React.createElement( <span class="hljs-string">"p"</span>, <span class="hljs-literal">null</span>, name ),
    React.createElement(Button, { addFriend })
  ) 
}
</code></pre>
<p>上面有两个组件：Button 和 User，User 描述的 Dom 是一个 div 标签，这个 div 内，又存在一个 p 标签，这个 p 标签展示了用户的 name；还存在一个 Button。</p>
<p>现在我们来看 User 和 Button 中，React.createElement 返回情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button ({ addFriend }) { 
  return { 
    type: 'button', 
    props: { 
      onClick: addFriend, 
      children: 'Add Friend' 
    } 
  } 
} 
function User ({ name, addFriend }) { 
  return { 
    type: 'div', 
    props: { 
      children: [{ 
        type: 'p',
        props: { children: name } 
      }, 
      { 
       type: Button, 
       props: { addFriend } 
      }]
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">function</span> <span class="hljs-selector-tag">Button</span> ({ <span class="hljs-selector-tag">addFriend</span> }) { 
  <span class="hljs-selector-tag">return</span> { 
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'button'</span>, 
    <span class="hljs-attribute">props</span>: { 
      <span class="hljs-attribute">onClick</span>: addFriend, 
      <span class="hljs-attribute">children</span>: <span class="hljs-string">'Add Friend'</span> 
    } 
  } 
} 
function User ({ name, addFriend }) { 
  <span class="hljs-selector-tag">return</span> { 
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'div'</span>, 
    <span class="hljs-attribute">props</span>: { 
      <span class="hljs-attribute">children</span>: [{ 
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'p'</span>,
        <span class="hljs-attribute">props</span>: { <span class="hljs-attribute">children</span>: name } 
      }, 
      { 
       <span class="hljs-attribute">type</span>: Button, 
       <span class="hljs-attribute">props</span>: { addFriend } 
      }]
    }
  }
}
</code></pre>
<p>你会发现，上面的输出中，我们发现了四种 type 值：</p>
<ul>
<li>"button";</li>
<li>"div";</li>
<li>"p";</li>
<li>Button</li>
</ul>
<p>当 React 发现 type 是 Button 时，它会查询这个 Button 组件会返回什么样的 React Element，并赋予正确的 props。 </p>
<p>直到最终，React 会得到完整的表述 Dom 树的对象。在我们的例子中，就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'div', 
  props: {
    children: [{
      type: 'p',
      props: { children: 'Tyler McGinnis' }
    }, 
    { 
      type: 'button', 
      props: { 
        onClick: addFriend, 
        children: 'Add Friend'
      }
     }]
   } 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'div'</span>, 
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">children</span>: [{
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'p'</span>,
      <span class="hljs-attribute">props</span>: { <span class="hljs-attribute">children</span>: <span class="hljs-string">'Tyler McGinnis'</span> }
    }, 
    { 
      <span class="hljs-attribute">type</span>: <span class="hljs-string">'button'</span>, 
      <span class="hljs-attribute">props</span>: { 
        <span class="hljs-attribute">onClick</span>: addFriend, 
        <span class="hljs-attribute">children</span>: <span class="hljs-string">'Add Friend'</span>
      }
     }]
   } 
}
</code></pre>
<p>React 处理这些逻辑的过程就叫做 <strong>reconciliation</strong>，那么“这个过程（reconciliation）在何时被触发呢？”</p>
<p>答案当然就是每次 setState 或 ReactDOM.render 调用时。以后的分析文章将会更加详细的说明。</p>
<p>好吧，再回到 Tyler McGinnis 那个风骚的问题上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011413618" src="https://static.alili.tech/img/remote/1460000011413618" alt="风骚的问题" title="风骚的问题" style="cursor: pointer;"></span></p>
<p>此时我们具备回答这个问题的一切知识了吗？稍等等，我要引出 JSX 这个老朋友了。</p>
<h2 id="articleHeader5">JSX 的角色</h2>
<p>在 React Component 编写时，相信大家都在使用 JSX 来描述虚拟 Dom。当然，反过来说，React 其实也可以脱离 JSX 而存在。</p>
<p>文章开头部分，我提到 “不常被我们提起的 JSX 抽象层是如何联通 React 的？” 答案很简单，因为 JSX 总是被编译成为 React.createElement 而被调用。一般 Babel 为我们做了 JSX —&gt; React.createElement 这件事情。</p>
<p>再看来先例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button ({ addFriend }) {
  return React.createElement(
    &quot;button&quot;,
    { onClick: addFriend },
    &quot;Add Friend&quot; 
   )
} 
function User({ name, addFriend }) { 
  return React.createElement(
    &quot;div&quot;,
    null,
    React.createElement( &quot;p&quot;, null, name),
    React.createElement(Button, { addFriend })
  )
}
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> <span class="hljs-params">({ addFriend })</span> </span>{
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"button"</span>,
    { onClick: addFriend },
    <span class="hljs-string">"Add Friend"</span> 
   )
} 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span><span class="hljs-params">({ name, addFriend })</span> </span>{ 
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"div"</span>,
    <span class="hljs-literal">null</span>,
    React.createElement( <span class="hljs-string">"p"</span>, <span class="hljs-literal">null</span>, name),
    React.createElement(Button, { addFriend })
  )
}
    </code></pre>
<p>对应我们总在写的 JSX 用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button ({ addFriend }) { 
  return ( 
    <button onClick={addFriend}>Add Friend</button> 
  )
}
function User ({ name, addFriend }) {
  return ( 
    <div>
     <p>{name}</p>
     <Button addFriend={addFriend}/>
    </div>
  )
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span> (<span class="hljs-params">{ addFriend }</span>) </span>{ 
  <span class="hljs-keyword">return</span> ( 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{addFriend}</span>&gt;</span>Add Friend<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span> 
  )
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span> (<span class="hljs-params">{ name, addFriend }</span>) </span>{
  <span class="hljs-keyword">return</span> ( 
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">addFriend</span>=<span class="hljs-string">{addFriend}/</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  )
}
</span></code></pre>
<p>就是一个编译产出的差别。</p>
<h2 id="articleHeader6">最终答案和文末彩蛋</h2>
<p>那么，请你来回答“Icon 组件单独出现代表了什么？”</p>
<p>Icon 在 JSX 被编译之后，就有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(Icon, null)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">React.createElement(Icon,</span> <span class="hljs-literal">null</span><span class="hljs-string">)</span>

</code></pre>
<p><strong>你问我怎么知道这些编译结果的？</strong></p>
<p>或者</p>
<p><strong>你想知道你编写的 JSX 最终编译成了什么样子？</strong></p>
<p>我写了一个小工具，进行对 JSX 的实时编译，放在 <a href="https://github.com/HOUCe/JSXLiveCompiler" rel="nofollow noreferrer" target="_blank">Github仓库中</a>，它使用起来是这样子的：</p>
<p>平台一分为二，左边可以写 JSX，右边实时展现其编译结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011413619" src="https://static.alili.tech/img/remote/1460000011413619" alt="实时编译平台" title="实时编译平台" style="cursor: pointer;"></span></p>
<p>以及：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011413620" src="https://static.alili.tech/img/remote/1460000011413620" alt="实时编译平台" title="实时编译平台" style="cursor: pointer;"></span></p>
<p>这个工具最核心的代码其实就是使用 babel 进行编译：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
let code = e.target.value;
try {
    this.setState({
        output: window.Babel.transform(code, {presets: ['es2015', 'react']})
        .code,
        err: ''
    })
}
catch(err) {
    this.setState({err: err.message})
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>
<span class="hljs-keyword">let</span> code = e.target.<span class="hljs-keyword">value</span>;
<span class="hljs-keyword">try</span> {
    this.setState({
        output: window.Babel.transform(code, {presets: [<span class="hljs-string">'es2015'</span>, <span class="hljs-string">'react'</span>]})
        .code,
        err: <span class="hljs-string">''</span>
    })
}
<span class="hljs-keyword">catch</span>(err) {
    this.setState({err: err.message})
}
</code></pre>
<p>感兴趣的读者可以去 GitHub 仓库参看源码。</p>
<h2 id="articleHeader7">总结</h2>
<p>其实不管是 JSX 还是 React Element、React Component 这些概念，都是大家在开发中天天接触到的。有的开发者也许能上手做项目，但是并没有深入理解其中的概念，更无法真正掌握 React 核心思想。</p>
<p>这些内容其实比较基础，但同时又很关键，对于后续理解 React/Preact 源码至关重要。在这个基础上，我会更新更多更加深入的类 React 实现原理剖析，感兴趣的读者可以关注。</p>
<p>我的其他几篇关于React技术栈的文章：</p>
<ul>
<li><a href="http://www.jianshu.com/p/1c53e3b38f71" rel="nofollow noreferrer" target="_blank">通过实例，学习编写 React 组件的“最佳实践”</a></li>
<li><a href="http://www.jianshu.com/p/a50289d46236" rel="nofollow noreferrer" target="_blank">从 React 绑定 this，看 JS 语言发展和框架设计</a></li>
<li><a href="http://www.jianshu.com/p/49029b49f2b4" rel="nofollow noreferrer" target="_blank">做出Uber移动网页版还不够 极致性能打造才见真章</a></li>
<li><a href="http://www.jianshu.com/p/7a56ac1de2a8" rel="nofollow noreferrer" target="_blank">解析Twitter前端架构 学习复杂场景数据设计</a></li>
<li><a href="http://www.jianshu.com/p/83c86dd0802d" rel="nofollow noreferrer" target="_blank">React Conf 2017 干货总结1: React + ES next = ♥</a></li>
<li><a href="http://www.jianshu.com/p/cde3cf7e2760" rel="nofollow noreferrer" target="_blank">React+Redux打造“NEWS EARLY”单页应用 一个项目理解最前沿技术栈真谛</a></li>
<li><a href="http://www.jianshu.com/p/8e28be0e7ab1" rel="nofollow noreferrer" target="_blank">一个react+redux工程实例</a></li>
<li>......</li>
</ul>
<p>Happy Coding!</p>
<p>PS: <br>作者<a href="https://github.com/HOUCe" rel="nofollow noreferrer" target="_blank">Github仓库</a> 和 <a href="https://www.zhihu.com/people/lucas-hc/answers" rel="nofollow noreferrer" target="_blank">知乎问答链接</a><br>欢迎各种形式交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 内部机制探秘 - React Component 和 Element（文末附彩蛋demo和源码）

## 原文链接
[https://segmentfault.com/a/1190000011413614](https://segmentfault.com/a/1190000011413614)

