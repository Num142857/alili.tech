---
title: 'AngularJS 2 组件交流方式' 
date: 2019-01-30 2:30:22
hidden: true
slug: d993xvptwkt
categories: [reprint]
---

{{< raw >}}

                    
<p>以下的测试例子都可以在 <a href="https://github.com/fegg/ng2_demo" rel="nofollow noreferrer" target="_blank">github</a> 找到，但是最近好像不太稳定。</p>
<p>其实 ng2 在这方面做得挺好的，用起来也很简单，所以看完基本就可以动手写一写。强大并不止是这一方面，在写这些的过程中，通过一些配置，让开发很纯粹，有时间再录一个新手入门的开发教程。</p>
<h3 id="articleHeader0">(1) 父组件向子组件流入数据</h3>
<p>这种方式是最简单的，在 <code>ng2</code> 中处理得非常完美，通过在子组件中标记 <code>@Input()</code> 输入接口的方式进行接收父组件的值，我下面的 demo 主要分了几种场景，尽可能的多覆盖不同情况吧。</p>
<p>基本上例子中覆盖了常见的情况：</p>
<ul>
<li><p>直接传入一个字符串的情况，不需要绑定父组件的一个变量</p></li>
<li><p>绑定父组件变量的情况，然后可以在父组件中不断修改</p></li>
<li><p>输入别名的情况，可以在子组件中对输入的变量名进行重新设置</p></li>
<li><p><code>ngOnChanges()</code> 在子组件中监听属性的修改</p></li>
<li><p>特殊情况下，我们需要对父组件传入的数据进行过滤</p></li>
<li><p><code>@ViewChild()</code> 注解的跨多层子组件的观察方式</p></li>
</ul>
<p>说了这么多，来看一下实际的代码吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent component
import { Component, OnInit } from '@angular/core';
    
@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
    
    baby: string = '你的名字';
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Parent component</span>
<span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-parent'</span>,
    templateUrl: <span class="hljs-string">'./parent.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./parent.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ParentComponent <span class="hljs-keyword">implements</span> OnInit {
    
    baby: <span class="hljs-built_in">string</span> = <span class="hljs-string">'你的名字'</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent html
<h3>请输入 Baby 的名字：</h3>
<input [(ngModel)]=&quot;baby&quot; type=&quot;text&quot;> 
<app-child babyName=&quot;hello&quot; [inputBabyName]=&quot;baby&quot; aliasBabyName=&quot;我是别名&quot;></app-child>
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
// Parent html
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>请输入 Baby 的名字：<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"baby"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">app-child</span> <span class="hljs-attr">babyName</span>=<span class="hljs-string">"hello"</span> [<span class="hljs-attr">inputBabyName</span>]=<span class="hljs-string">"baby"</span> <span class="hljs-attr">aliasBabyName</span>=<span class="hljs-string">"我是别名"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-child</span>&gt;</span>
    </code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Child component
import { Component, OnInit, Input, SimpleChange } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    
    @Input() babyName: string;
    @Input() inputBabyName: string;
    @Input('aliasBabyName') aliasName: string;
    
    changes: string;
    
    constructor() { }
    
    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChange) {
        this.changes = JSON.stringify(changes);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Child component</span>
<span class="hljs-keyword">import</span> { Component, OnInit, Input, SimpleChange } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-child'</span>,
    templateUrl: <span class="hljs-string">'./child.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./child.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ChildComponent <span class="hljs-keyword">implements</span> OnInit {
    
    <span class="hljs-meta">@Input</span>() babyName: <span class="hljs-built_in">string</span>;
    <span class="hljs-meta">@Input</span>() inputBabyName: <span class="hljs-built_in">string</span>;
    <span class="hljs-meta">@Input</span>(<span class="hljs-string">'aliasBabyName'</span>) aliasName: <span class="hljs-built_in">string</span>;
    
    changes: <span class="hljs-built_in">string</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChange) {
        <span class="hljs-keyword">this</span>.changes = <span class="hljs-built_in">JSON</span>.stringify(changes);
    }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Child html
<h3>我是子组件的属性(babyName) => "{{"babyName"}}"</h3>
<h3 style=&quot;color:red;&quot;>我是跟父组件来："{{"inputBabyName"}}"</h3>
<h3>我是 aliasBabyName => aliasName："{{"aliasName"}}"</h3>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
// Child html
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>我是子组件的属性(babyName) =&gt; "{{"babyName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:red;"</span>&gt;</span>我是跟父组件来："{{"inputBabyName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>我是 aliasBabyName =&gt; aliasName："{{"aliasName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
</code></pre>
<p><strong>那么我需要过滤一下值要怎么弄呢？</strong></p>
<p>这样我们就可以用到 setter 和 getter 的特性来做，具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Child component
_filterName: string = '';
    
@Input()
set filterName(n: string) {
    this._filterName = n + 'wowo~~~';
}
    
get filterName() {
    return this._filterName;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Child component</span>
_filterName: <span class="hljs-built_in">string</span> = <span class="hljs-string">''</span>;
    
<span class="hljs-meta">@Input</span>()
<span class="hljs-keyword">set</span> filterName(n: <span class="hljs-built_in">string</span>) {
    <span class="hljs-keyword">this</span>._filterName = n + <span class="hljs-string">'wowo~~~'</span>;
}
    
<span class="hljs-keyword">get</span> filterName() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._filterName;
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent html
<app-child [filterName]=&quot;babyName&quot;></app-child>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Parent html</span>
&lt;app-child [filterName]=<span class="hljs-string">"babyName"</span>&gt;&lt;<span class="hljs-regexp">/app-child&gt;
</span></code></pre>
<p>这个其实也是用 <code>@Input()</code> 这个注解来做的，有点类似 <code>computed</code> 的概念吧，但是这样做对于习惯 Java 的小伙伴是很友好的，其实通过一些权限的设置，还能够更加的强大。 </p>
<p><strong>@ViewChild() 的方式</strong></p>
<p>这种方式我觉得更多的是，我的沟通逻辑存在于 <code>TS</code> 中的时候就很实用。并且是描述性的定义方式，所以逻辑也是清晰的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent component
// 方式1，定义了 `#` 的钩子也是可以引用的
@ViewChild('child') cc: ChildComponent;
    
// 直接观察某一个子组件
@ViewChild(ChildComponent)
cc_other: ChildComponent;
    
// 调用的时候
this.cc.name = '变身啦！超级赛亚人';
this.cc_other.name = '变身啦！超级赛亚人 4';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Parent component</span>
<span class="hljs-comment">// 方式1，定义了 `#` 的钩子也是可以引用的</span>
<span class="hljs-meta">@ViewChild</span>(<span class="hljs-string">'child'</span>) cc: ChildComponent;
    
<span class="hljs-comment">// 直接观察某一个子组件</span>
<span class="hljs-meta">@ViewChild</span>(ChildComponent)
cc_other: ChildComponent;
    
<span class="hljs-comment">// 调用的时候</span>
<span class="hljs-keyword">this</span>.cc.name = <span class="hljs-string">'变身啦！超级赛亚人'</span>;
<span class="hljs-keyword">this</span>.cc_other.name = <span class="hljs-string">'变身啦！超级赛亚人 4'</span>;
</code></pre>
<blockquote><p>可以思考一下，是否任何形式的父组件流入子组件的方式，都可以触发 <code>ngOnChanges()</code> 方法。</p></blockquote>
<h3 id="articleHeader1">(2) 子组件向父组件通信</h3>
<p>从软件的结构上来讲，是上层抽象对底层的具体实现是隐藏的，所以具体层的东西最好尽可能少的知道抽象层的事情，也许表达方式不一样，但是这样的话封闭性会好很多，更多的暴露是以某一个权限开放的接口形式。但是通信是很复杂的东西，就好像人与人之间的联系是一样的。好吧，我们来具体说一下子组件怎么访问父组件。主要通过的方式是：</p>
<ul>
<li><p>在子组件定义一个 <code>@Output()</code> 的 <code>EventEmitter&lt;T&gt;</code> 对象，这个对象可以是 Subject 的形式存在，也就是可以使用 RxJS 的思想来做，其中 <code>T</code> 范型表示定义需要传入的数据具体类型。</p></li>
<li><p>父组件中定义一个自己的函数来修改自身的信息，或者再传入其他子组件使用。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent component
import { Component, OnInit } from '@angular/core';
    
@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
    
    babyName: string;
    
    constructor() { }
    
    ngOnInit() {
    this.babyName = '小撸一号';
    }
    
    changeBabyName(newBabyName) {
        this.babyName = newBabyName;
    }
 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Parent component</span>
<span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-parent'</span>,
    templateUrl: <span class="hljs-string">'./parent.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./parent.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ParentComponent <span class="hljs-keyword">implements</span> OnInit {
    
    babyName: <span class="hljs-built_in">string</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    <span class="hljs-keyword">this</span>.babyName = <span class="hljs-string">'小撸一号'</span>;
    }
    
    changeBabyName(newBabyName) {
        <span class="hljs-keyword">this</span>.babyName = newBabyName;
    }
 
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent html
<h3>BabyName："{{"babyName"}}"</h3>
<app-child (changeBabyName)=&quot;changeBabyName($event)&quot;></app-child>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
// Parent html
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>BabyName："{{"babyName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">app-child</span> (<span class="hljs-attr">changeBabyName</span>)=<span class="hljs-string">"changeBabyName($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-child</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
    
@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    
    @Output()
    changeBabyName: EventEmitter<string> = new EventEmitter<string>();
    
    rhashcode = /\d\.\d{4}/;
    
    constructor() { }
    
    ngOnInit() {
    }
    
    getNewBabyName(e) {
        let newName = this.makeHashCode('小撸新号');
        this.changeBabyName.next(newName);
    }
    
    /* UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */
    makeHashCode(prefix) {
        prefix = prefix || '60sky';
        return String(Math.random() + Math.random()).replace(this.rhashcode, prefix);
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-keyword">import</span> { Component, OnInit, Output, EventEmitter } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-child'</span>,
    templateUrl: <span class="hljs-string">'./child.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./child.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ChildComponent <span class="hljs-keyword">implements</span> OnInit {
    
    <span class="hljs-meta">@Output</span>()
    changeBabyName: EventEmitter&lt;<span class="hljs-built_in">string</span>&gt; = <span class="hljs-keyword">new</span> EventEmitter&lt;<span class="hljs-built_in">string</span>&gt;();
    
    rhashcode = <span class="hljs-regexp">/\d\.\d{4}/</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
    getNewBabyName(e) {
        <span class="hljs-keyword">let</span> newName = <span class="hljs-keyword">this</span>.makeHashCode(<span class="hljs-string">'小撸新号'</span>);
        <span class="hljs-keyword">this</span>.changeBabyName.next(newName);
    }
    
    <span class="hljs-comment">/* UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript */</span>
    makeHashCode(prefix) {
        prefix = prefix || <span class="hljs-string">'60sky'</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>(<span class="hljs-built_in">Math</span>.random() + <span class="hljs-built_in">Math</span>.random()).replace(<span class="hljs-keyword">this</span>.rhashcode, prefix);
    }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<button (click)=&quot;getNewBabyName($event)&quot;>我要改我自己的名字</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"getNewBabyName($event)"</span>&gt;</span>我要改我自己的名字<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>其中需要注意的是父组件中方法注入的 <code>$event</code> 对象，这个对象在这里注入的是子组件传入的值，所以在父组件中就可以直接使用了，我这里定义了 string 类型的数据，所以传入后定义接口的参数类型也是相对应的。</p>
<h3 id="articleHeader2">(3) 无关组件的通信</h3>
<p>ng2 在无关组件的处理上，真的处理得很干脆，给你一个钩子，你用吧！就是这种简单的思路。这里我只介绍部分，因为官方文档有更加详细的介绍，不然我这篇文章就写得太长了～因为方式有很多种，发挥小聪明就能发现很多。</p>
<ul>
<li><p>事件回调传来传去的方式</p></li>
<li><p>Service 的注入</p></li>
<li><p><code>#</code> 钩子的方式</p></li>
</ul>
<p>这里介绍的是一个 <code>#</code> 钩子的方式来做，直接来代码吧，很方便的。<br>其中，需要注意的是作用域的隔离，子组件可以很好的隔离作用域。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent component
import { Component, OnInit } from '@angular/core';
    
@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
    
    babyName: string = '小撸一号';
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Parent component</span>
<span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-parent'</span>,
    templateUrl: <span class="hljs-string">'./parent.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./parent.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ParentComponent <span class="hljs-keyword">implements</span> OnInit {
    
    babyName: <span class="hljs-built_in">string</span> = <span class="hljs-string">'小撸一号'</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Parent html
<input [(ngModel)]=&quot;babyName&quot; type=&quot;text&quot;>
    
<app-child #child [childName]=&quot;babyName&quot;></app-child>
<app-otherChild helloBaby=&quot;child.childName&quot;></app-otherChild>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
// Parent html
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> [(<span class="hljs-attr">ngModel</span>)]=<span class="hljs-string">"babyName"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>&gt;</span>
    
<span class="hljs-tag">&lt;<span class="hljs-name">app-child</span> #<span class="hljs-attr">child</span> [<span class="hljs-attr">childName</span>]=<span class="hljs-string">"babyName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-child</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">app-otherChild</span> <span class="hljs-attr">helloBaby</span>=<span class="hljs-string">"child.childName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">app-otherChild</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// Child component
import { Component, OnInit, Input } from '@angular/core';
    
@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
    
    @Input() childName: string;
    
    constructor() { }
    
    ngOnInit() {
    }
    
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// Child component</span>
<span class="hljs-keyword">import</span> { Component, OnInit, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-child'</span>,
    templateUrl: <span class="hljs-string">'./child.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./child.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> ChildComponent <span class="hljs-keyword">implements</span> OnInit {
    
    <span class="hljs-meta">@Input</span>() childName: <span class="hljs-built_in">string</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<h3 style=&quot;color:red;&quot;>Child："{{"childName"}}"</h3>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:red;"</span>&gt;</span>Child："{{"childName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// OtherChild component
import { Component, OnInit, Input } from '@angular/core';
    
@Component({
    selector: 'app-otherChild',
    templateUrl: './otherChild.component.html',
    styleUrls: ['./otherChild.component.css']
})
export class OtherChildComponent implements OnInit {
    
    @Input() helloBaby: string;
    
    constructor() { }
    
    ngOnInit() {
    }
    
    changeChildName(e) {
        this.helloBaby = '小撸新号';
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">
<span class="hljs-comment">// OtherChild component</span>
<span class="hljs-keyword">import</span> { Component, OnInit, Input } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
    
<span class="hljs-meta">@Component</span>({
    selector: <span class="hljs-string">'app-otherChild'</span>,
    templateUrl: <span class="hljs-string">'./otherChild.component.html'</span>,
    styleUrls: [<span class="hljs-string">'./otherChild.component.css'</span>]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> OtherChildComponent <span class="hljs-keyword">implements</span> OnInit {
    
    <span class="hljs-meta">@Input</span>() helloBaby: <span class="hljs-built_in">string</span>;
    
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) { }
    
    ngOnInit() {
    }
    
    changeChildName(e) {
        <span class="hljs-keyword">this</span>.helloBaby = <span class="hljs-string">'小撸新号'</span>;
    }
}
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// OtherChild html
<h3 style=&quot;color:blue;&quot;>otherChild："{{"helloBaby"}}"</h3>
<button (click)=&quot;changeChildName($event)&quot;>我来统一修改一下</button>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
// OtherChild html
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color:blue;"</span>&gt;</span>otherChild："{{"helloBaby"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"changeChildName($event)"</span>&gt;</span>我来统一修改一下<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre>
<p>其实还有一些方式和特殊场景下的处理，所以总体来说，ng2 在这方面是不错的～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AngularJS 2 组件交流方式

## 原文链接
[https://segmentfault.com/a/1190000007791206](https://segmentfault.com/a/1190000007791206)

