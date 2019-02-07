---
title: 'Angular directive 实例详解' 
date: 2019-02-08 2:30:40
hidden: true
slug: hkpiw8jj1ui
categories: [reprint]
---

{{< raw >}}

                    
<p>准备代码，会在实例中用到</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var app = angular.module('app', []);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> app = angular.module(<span class="hljs-string">'app'</span>, []);</code></pre>
<p>angular指令定义大致如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.directive('directiveName', function() {
  return {
    // config
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.directive(<span class="hljs-string">'directiveName'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-comment">// config</span>
  }
})</code></pre>
<p>其中return返回的配置对象包含很多参数，如下一一说明。</p>
<h3 id="articleHeader0">1. <code>restrict</code>
</h3>
<p>值为字符串，可选参数，指明指令在DOM中以什么形式被声明</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- E (element) -->
<directiveName></directiveName>

<!-- A (attribute) -->
<div directiveName=&quot;expression&quot;></div>

<!-- C (class) -->
<div class=&quot;directiveName&quot;></div>

<!-- M(comment) -->
<!--directive:directiveName expression-->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- E (element) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">directiveName</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">directiveName</span>&gt;</span>

<span class="hljs-comment">&lt;!-- A (attribute) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">directiveName</span>=<span class="hljs-string">"expression"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- C (class) --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"directiveName"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- M(comment) --&gt;</span>
<span class="hljs-comment">&lt;!--directive:directiveName expression--&gt;</span></code></pre>
<p>默认值为<code>restrict: 'EA'</code>，表示可以在DOM里面可以用元素形式和属性形式被声明。一般来说，如果你想创建一个自己模板的组件时，则使用元素形式，但是仅仅是为已有元素添加功能的话，就使用属性名。</p>
<blockquote><p>如果想要支持IE8，则最好使用属性和类形式来定义，另外从angular 1.3.X开始，已经放弃支持IE8了。</p></blockquote>
<h3 id="articleHeader1">2. priority</h3>
<p>数字，可选参数，致命指令的优先级，若在单个DOM元素上有多个指令，则优先级高的先执行。</p>
<p>当然，设置指令的优先级不太常用，但是比较特殊的例子是，内置指令ng-repeat的优先级为1000，而ng-init的优先级为 450。</p>
<h3 id="articleHeader2">3. terminal</h3>
<p>布尔型，可选参数，可以被设置为true或者false，若设置为true，则优先级低于此指令的其他指令则无效，不会被调用优先级相同任然会执行。</p>
<h3 id="articleHeader3">4. template</h3>
<p>字符串或者函数，可选参数。</p>
<p>可以是一段html文本</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.directive('hello', function() {
  return {
    template: '<div><h3>Hello, world!</h3></div>'
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.directive(<span class="hljs-string">'hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;h3&gt;Hello, world!&lt;/h3&gt;&lt;/div&gt;'</span>
  }
})</code></pre>
<p>使用如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello></hello>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></code></pre>
<p>渲染结果为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello>
  <div>
    <h3>Hello, world!</h3>
  </div>
</hello>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>Hello, world!<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></code></pre>
<p>也可以是一个函数，可接受两个参数Element与Attrs</p>
<p>其中Element是指使用此指令的元素，而Attrs则是实例的属性，它是由一个元素上所有属性组成的集合，形如</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  title: 'test',
  id: 'testDiv',
  class: 'demo',
  input: 'text',
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-attr">title</span>: <span class="hljs-string">'test'</span>,
  <span class="hljs-attr">id</span>: <span class="hljs-string">'testDiv'</span>,
  <span class="hljs-attr">class</span>: <span class="hljs-string">'demo'</span>,
  <span class="hljs-attr">input</span>: <span class="hljs-string">'text'</span>,
  ...
}</code></pre>
<p>下面让我们看看template是一个函数时的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.directive('hello', function() {
  return {
    template: function(element, attrs) {
      return '<div>'+ attrs.title +'</div>'
    }
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.directive(<span class="hljs-string">'hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">template</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, attrs</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;div&gt;'</span>+ attrs.title +<span class="hljs-string">'&lt;/div&gt;'</span>
    }
  };
});</code></pre>
<p>html代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello title=&quot;message&quot;></hello>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"message"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></code></pre>
<p>渲染结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello>
  <div>message</div>
</hello>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">hello</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>message<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">hello</span>&gt;</span></code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/LkyEwd" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/LkyEwd" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader4">5. replace</h3>
<p>布尔型，默认值为false，设置为true的时候，表示可以用模板内容替换自定义的元素标签。</p>
<p>在template的例子中，我们发现渲染结果中包含有自定义的元素<code>&lt;hello&gt;&lt;/hello&gt;</code>，很显然，这并不是我们想要的渲染结果，因此将replace设置为true之后，hello标签将会消失</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.directive('hello', function() {
  return {
    replace: true,
    template: function(element, attrs) {
      return '<div>'+ attrs.title +'</div>'
    }
  };
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.directive(<span class="hljs-string">'hello'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">template</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element, attrs</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;div&gt;'</span>+ attrs.title +<span class="hljs-string">'&lt;/div&gt;'</span>
    }
  };
});</code></pre>
<p>渲染结果如下，hello标签消失不见</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>message</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>message<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader5">6. templateUrl</h3>
<p>字符串或者函数，可选参数</p>
<p>可以使一个代表html文件路径的字符串，也可以是一个函数，大致意思与template一样。</p>
<p>在本地开发时，需要运行一个服务器，不然使用templateUrl会报错</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cross origin request script(cors)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">Cross origin request script(<span class="hljs-name">cors</span>)</code></pre>
<p>由于加载html模板是通过异步加载，若加载大量的模板会拖慢网站的速度，这里有一个技巧，就是先缓存模板，你可以先在你的index页面加载好，将下列代码作为你页面的一部分包含在内</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/ng-template&quot; id=&quot;demo.html&quot;>
  <div><!--这里是模板内容--></div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script type=<span class="hljs-string">"text/ng-template"</span> id=<span class="hljs-string">"demo.html"</span>&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-comment">&lt;!--这里是模板内容--&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<p>这里的id属性就是被设置在templateUrl上用的</p>
<p>另外一种方法缓存如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.run(function($templateCache) {
  $templateCache.put('template.html', '<div>template</div>');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$templateCache</span>) </span>{
  $templateCache.put(<span class="hljs-string">'template.html'</span>, <span class="hljs-string">'&lt;div&gt;template&lt;/div&gt;'</span>);
})</code></pre>
<h3 id="articleHeader6">7. scope</h3>
<p>布尔值或者对象，可选参数，默认值为false，表示继承父级作用域。</p>
<p>如果值为true，表示继承父作用域，并创建自己的作用域（子作用域）</p>
<p>如果为对象，<code>{}</code>，则表示创建一个全新的隔离作用域。</p>
<p>首先我们需要来了解一下scope的继承机制。我们使用ng-controller这个指令来举例。我们都知道ng-controller可以从父作用域中继承并创建一个新的子作用域。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-init=&quot;aaa='parent'&quot;>
    parentNode: "{{"aaa"}}"
    
    <div ng-controller=&quot;demoController&quot;>
        childrenNode: "{{"aaa"}}"
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-init</span>=<span class="hljs-string">"aaa='parent'"</span>&gt;</span>
    parentNode: "{{"aaa"}}"
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"demoController"</span>&gt;</span>
        childrenNode: "{{"aaa"}}"
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('demoController', function($scope) {
    $scope.aaa = &quot;children&quot;;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'demoController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.aaa = <span class="hljs-string">"children"</span>;
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/ZOKbzR" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/ZOKbzR" data-typeid="3">点击预览</button></p>
<p>这时页面的显示结果为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parentNode: parent
childrenNode: children" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">parentNode: parent
childrenNode: children</code></pre>
<p>当时当我们并没有在demoController的作用域中给aaa赋值，也就是在上例中删除这一句<code>$scope.aaa = "children";</code>，那么执行结果就为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parentNode: parent
childrenNode: parent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">parentNode: parent
childrenNode: parent</code></pre>
<p>注意：如果一个元素上有多个指令都使用了隔离作用域，那么只有其中一个可以生效，只有指令模板中的根元素才能获得一个新的作用域，这时候，scope就被设置为true了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-init=&quot;aaa='parent'&quot;>
    parentNode: "{{"aaa"}}"
    
    <div ng-controller=&quot;demoController01&quot;>
        childrenNode: "{{"aaa"}}"
        
        <div ng-controller=&quot;demoController02&quot;>
            lastNode: "{{"aaa"}}"
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-init</span>=<span class="hljs-string">"aaa='parent'"</span>&gt;</span>
    parentNode: "{{"aaa"}}"
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"demoController01"</span>&gt;</span>
        childrenNode: "{{"aaa"}}"
        
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"demoController02"</span>&gt;</span>
            lastNode: "{{"aaa"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('demoController01', function($scope) {
    $scope.aaa = &quot;children&quot;;
})
.controller('demoController02', function($scope) {
    $scope.aaa = &quot;last&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'demoController01'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.aaa = <span class="hljs-string">"children"</span>;
})
.controller(<span class="hljs-string">'demoController02'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.aaa = <span class="hljs-string">"last"</span>
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/LkypEK" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/LkypEK" data-typeid="3">点击预览</button></p>
<p>接下来，我们通过一个简单明了的例子来说明scope取值的不同差别</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    parent: "{{" name "}}" 
    <br />
    <input type=&quot;text&quot; ng-model=&quot;name&quot; />
    <div my-directive></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    parent: "{{" name "}}" 
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"name"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">my-directive</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
    $scope.name = &quot;Jake&quot;;
})
.directive('myDirective', function() {
    return {
        restrict: 'EA',
        scope: false,
        replace: true,
        template: '' +
            '<div>' +
                'childNode: "{{" name "}}" ' +
                '<br />' +
                '<input type=&quot;text&quot; ng-model=&quot;name&quot;>' +
            '</div>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.name = <span class="hljs-string">"Jake"</span>;
})
.directive(<span class="hljs-string">'myDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">''</span> +
            <span class="hljs-string">'&lt;div&gt;'</span> +
                <span class="hljs-string">'childNode: "{{" name "}}" '</span> +
                <span class="hljs-string">'&lt;br /&gt;'</span> +
                <span class="hljs-string">'&lt;input type="text" ng-model="name"&gt;'</span> +
            <span class="hljs-string">'&lt;/div&gt;'</span>
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/yJbYgE?editors=1010" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/yJbYgE" data-typeid="3">点击预览</button></p>
<p>点击上面的实例地址，我们可以依次改变scope的值为false, true, {}，结果发现</p>
<ul>
<li>false：儿子继承父亲的值，改变父亲的值，儿子的值也随着改变，反之亦然，这就是继承且不隔离</li>
<li>true：儿子继承父亲的值，改变父亲的值，儿子的值也随着改变，但是改变儿子的值，父亲的值并没有改变，这就是继承但是隔离</li>
<li>{}：没有继承父亲的值，所以儿子的值为空，改变任何一方的值都不会影响另一方，这就是不继承且隔离</li>
</ul>
<blockquote><p>当想要创建一个可重用的组件时，隔离作用域是一个很好的选择，通过隔离作用域，我们可以确保指令是独立的，并且可以轻松的插入到任何HTML APP中，并且这种做法防止了父作用域被污染。</p></blockquote>
<p><strong>隔离作用域可以通过绑定策略来访问父作用域的属性</strong></p>
<p>我们来看一个例子</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    <input type=&quot;text&quot; ng-model=&quot;color&quot; placeholder=&quot;Enter a color&quot;/>
    <hello-world></hello-world>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"color"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Enter a color"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
})
.directive('helloWorld', function() {
    return {
        restrict: 'EA',
        scope: false,
        replace: true,
        template: '<p style=&quot;background-color:"{{"color"}}"&quot;>Hello world!</p>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
})
.directive(<span class="hljs-string">'helloWorld'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p style="background-color:"{{"color"}}""&gt;Hello world!&lt;/p&gt;'</span>
    }
})</code></pre>
<p>运行上面的代码，我们在input中输入颜色值，比如red，那么hello world一行的背景就会变成红色。动手试试！  </p>
<p><a href="http://codepen.io/yangbo5207/pen/AXRWVw" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/AXRWVw" data-typeid="3">点击预览</button></p>
<p>但是，当我们将scope的值设置为{}时，再次运行代码就发现页面并不能成功的完整显示了.这是因为{}让helloWorld指令产生了隔离作用域，没办法从父级作用域中继承到color的值了。</p>
<p>所以在template中的"{{"color"}}"变成了依赖于自己的作用域，而不是依赖于父级作用域。因此我们需要一些办法来让隔离作用域能够读取父级作用域的属性，这个方法就是绑定策略。</p>
<p>下面我们来探索设置这种绑定策略的几种方法</p>
<h5>方法一 使用@来进行单向文本（字符串）绑定</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    <input type=&quot;text&quot; ng-model=&quot;color&quot; placeholder=&quot;Enter a color&quot;/>
    <hello-world color-attr=&quot;"{{"color"}}"&quot;></hello-world>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"color"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Enter a color"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span> <span class="hljs-attr">color-attr</span>=<span class="hljs-string">""{{"color"}}""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
})
.directive('helloWorld', function() {
    return {
        restrict: 'EA',
        scope: {
            color: '@colorAttr'
        },
        replace: true,
        template: '<p style=&quot;background-color:"{{"color"}}"&quot;>Hello world!</p>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
})
.directive(<span class="hljs-string">'helloWorld'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: {
            <span class="hljs-attr">color</span>: <span class="hljs-string">'@colorAttr'</span>
        },
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;p style="background-color:"{{"color"}}""&gt;Hello world!&lt;/p&gt;'</span>
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/AXRWVw" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/AXRWVw" data-typeid="3">点击预览</button></p>
<p>这种办法只能单向，通过在运行的指令DOM上设置<code>color-attr</code>属性，并且采用"{{""}}"绑定某个模型值。当然，我们也可以直接在这里绑定字符串的颜色值，如<code>color-attr="red"</code></p>
<p>因此当表达式的值发生变化时，属性color-attr的值也会发生变化，通过单向绑定该值，就可以改变隔离作用域中的属性color.</p>
<blockquote>
<p>如果绑定的隔离作用域属性名与元素的属性名相同，则可以采用缺省写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<hello-world color=&quot;"{{"color"}}"&quot;></hello-world>

// js
app.directive('helloWorld', function() {
   return {
       scope: { color: '@' },
       ...
   }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// html</span>
&lt;hello-world color=<span class="hljs-string">""{{"color"}}""</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>

// js
app.directive('helloWorld', function() {
   return {
       scope: { color: '@' },
       ...
   }
})</span></code></pre>
</blockquote>
<h5>方法二、使用'='进行双向绑定</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    <input type=&quot;text&quot; ng-model=&quot;color&quot; placeholder=&quot;Enter a color&quot;/>
    <br />
    "{{" color "}}"
    <!-- 这里要注意写法与@绑定的不同 -->
    <hello-world color=&quot;color&quot;></hello-world>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"color"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Enter a color"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    "{{" color "}}"
    <span class="hljs-comment">&lt;!-- 这里要注意写法与@绑定的不同 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"color"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
    $scope.color = 'red';
})
.directive('helloWorld', function() {
    return {
        restrict: 'EA',
        scope: {
            color: '='
        },
        replace: true,
        template: '<div><p style=&quot;background-color:"{{"color"}}"&quot;>' +
            'Hello world!' +
        '</p>' + 
        '<input type=&quot;text&quot; ng-model=&quot;color&quot;></div>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.color = <span class="hljs-string">'red'</span>;
})
.directive(<span class="hljs-string">'helloWorld'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: {
            <span class="hljs-attr">color</span>: <span class="hljs-string">'='</span>
        },
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div&gt;&lt;p style="background-color:"{{"color"}}""&gt;'</span> +
            <span class="hljs-string">'Hello world!'</span> +
        <span class="hljs-string">'&lt;/p&gt;'</span> + 
        <span class="hljs-string">'&lt;input type="text" ng-model="color"&gt;&lt;/div&gt;'</span>
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/WxjQPK?editors=1010" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/WxjQPK" data-typeid="3">点击预览</button></p>
<p>此处也采用了类似的缺省写法。</p>
<p>这里需要注意的是，我们要直接在指令元素设置属性时，是直接将实际的作用域模型复制给该属性</p>
<p>这样一个双向绑定被建立了，改变任何一个input值都会改变另外一个值。</p>
<h5>方法三、使用'&amp;'调用父作用域中的函数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    <input type=&quot;text&quot; ng-model=&quot;name&quot; placeholder=&quot;Enter name&quot;/>
    <br />
    "{{" name "}}"
    <hello-world say=&quot;say()&quot; name=&quot;"{{"name"}}"&quot;></hello-world>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Enter name"</span>/&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span> /&gt;</span>
    "{{" name "}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span> <span class="hljs-attr">say</span>=<span class="hljs-string">"say()"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""{{"name"}}""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
    $scope.name = &quot;yangbo&quot;;
    $scope.say = function() {
        alert('hello!');
    }
})
.directive('helloWorld', function() {
    return {
        restrict: 'EA',
        scope: {
            name: '@',
            say: '&amp;'
        },
        replace: true,
        template: '<button type=&quot;button&quot; ng-bind=&quot;name&quot; ng-init=&quot;say()&quot;></button>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.name = <span class="hljs-string">"yangbo"</span>;
    $scope.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">'hello!'</span>);
    }
})
.directive(<span class="hljs-string">'helloWorld'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'@'</span>,
            <span class="hljs-attr">say</span>: <span class="hljs-string">'&amp;'</span>
        },
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;button type="button" ng-bind="name" ng-init="say()"&gt;&lt;/button&gt;'</span>
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/grWaJX?editors=1010" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/grWaJX" data-typeid="3">点击预览</button></p>
<p>同样采用了缺省写法，运行之后，弹出窗口！</p>
<h3 id="articleHeader7">8. transclude</h3>
<p>布尔值或者字符<code>element</code>，默认值为false</p>
<p>这个配置选项可以让我们提取包含在指令那个元素里面的内容，再将它放置在指令模板的特定位置。当我们开启transclude之后，我们就可以使用ng-transclude来指明应该在什么地方放置transclude的内容</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot;>
    <div class=&quot;a&quot;>
        <p>china</p>
        <hello-world>
            "{{"name"}}"
        </hello-world>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"a"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>china<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span>&gt;</span>
            "{{"name"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('mainController', function($scope) {
    $scope.name = &quot;yangbo5207&quot;;
})
.directive('helloWorld', function() {
    return {
        restrict: 'EA',
        scope: {},
        replace: true,
        transclude: true,
        template: '<div class=&quot;b&quot;><div ng-transclude>你看不见我</div></div>'
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'mainController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.name = <span class="hljs-string">"yangbo5207"</span>;
})
.directive(<span class="hljs-string">'helloWorld'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">scope</span>: {},
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span>: <span class="hljs-string">'&lt;div class="b"&gt;&lt;div ng-transclude&gt;你看不见我&lt;/div&gt;&lt;/div&gt;'</span>
    }
})</code></pre>
<p>运行上面的代码，输出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="china
yangbo5207" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">china</span>
yangbo5207</code></pre>
<p>我们查看渲染出来的html，结果为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot; class=&quot;ng-scope&quot;>
    <div class=&quot;a&quot;>
        <p>china</p>
        <div class=&quot;b ng-isolate-scope&quot;>
            <div ng-transclude=&quot;&quot;>
                <span class=&quot;ng-binding ng-scope&quot;>yangbo5207</span>
            </div>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-scope"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"a"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>china<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"b ng-isolate-scope"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-transclude</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-binding ng-scope"</span>&gt;</span>yangbo5207<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>另外当开启transclude时，会创建一个新的transclude空间，并且继承父作用域（也就是scope设置的隔离作用域）</p>
<p>从上面例子我们知道，当transclude的值被设置为true时，嵌入的内容为"{{"name"}}"，但是如果将它的值设置为<code>element</code>呢，我们可以在上例的基础上进行一个简单的修改，发现，嵌入内容为整个元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<hello-world>"{{"name"}}"</hello-world>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span>&gt;</span>"{{"name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span></code></pre>
<p>查看渲染结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;mainController&quot; class=&quot;ng-scope&quot;>
    <div class=&quot;a&quot;>
        <p>china</p>
        <div class=&quot;b ng-isolate-scope&quot;>
          <div ng-transclude=&quot;&quot;>
            <hello-world class=&quot;ng-binding ng-scope&quot;>
              yangbo5207
            </hello-world>
          </div>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"mainController"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-scope"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"a"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>china<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"b ng-isolate-scope"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-transclude</span>=<span class="hljs-string">""</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">hello-world</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ng-binding ng-scope"</span>&gt;</span>
              yangbo5207
            <span class="hljs-tag">&lt;/<span class="hljs-name">hello-world</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><strong>注意：在一个指令的模板中，只能声明一次ng-transclude</strong></p>
<p>那么问题来了，如果我们想要把嵌入内容多次放入我们的模板中怎么办？</p>
<p>可以使用$transclude，后面会讲到！也可以使用complie函数中，里面的transcludeFn参数，后面会讲到！或者使用link连接函数</p>
<h3 id="articleHeader8">9. controller</h3>
<p>可以是一个字符串或者函数。</p>
<p>若为字符串，则将字符串当做控制器的名字，来查找注册在应用中的控制器的构造函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.directive('myDirective', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        
        // 会查找模块中其他被名为targetController的控制器
        controller: 'targetController'
    }
})
.controller('targetController', function($scope, $element, $attrs, $transclude) {
    // 控制器逻辑放在这里
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.directive(<span class="hljs-string">'myDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        
        <span class="hljs-comment">// 会查找模块中其他被名为targetController的控制器</span>
        controller: <span class="hljs-string">'targetController'</span>
    }
})
.controller(<span class="hljs-string">'targetController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope, $element, $attrs, $transclude</span>) </span>{
    <span class="hljs-comment">// 控制器逻辑放在这里</span>
})</code></pre>
<p>当然，也可以直接在指令内部定义为匿名函数，同样可以注入任何服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.directive('myDirective', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        controller: function($scope, $element, $attrs, $transclude) {
            // 控制器逻辑
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.directive(<span class="hljs-string">'myDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span>: <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope, $element, $attrs, $transclude</span>) </span>{
            <span class="hljs-comment">// 控制器逻辑</span>
        }
    }
})</code></pre>
<p>另外还有一些特殊的服务可以注入，</p>
<ul>
<li>$scope 与指令元素相关联的作用域</li>
<li>$element 当前指令对应的元素</li>
<li>$attrs 当前元素的属性组成的对象</li>
<li>$transclude 嵌入链接函数，实际被执行用来克隆元素和操作DOM中的函数（除非是用来定义一些可复用的行为，否则一般不推荐在这使用）</li>
</ul>
<p>指令的控制器和link函数（后面会讲到）可以进行互换。区别在于，控制器主要用来提供可在指令间复用的行为，可对外提供与外部交互的接口，但是link链接只能在当前指令内部中定义行为，且无法在指令间复用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot;>
    <div test-directive=&quot;dateType&quot; url=&quot;http://www.tigerbrokers.com&quot;>外面的世界很精彩。</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">test-directive</span>=<span class="hljs-string">"dateType"</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"http://www.tigerbrokers.com"</span>&gt;</span>外面的世界很精彩。<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.directive('testDirective', function() {
    return {
        transclude: true,
        replace: true,
        controller: function($scope, $element, $attrs, $transclude, $log) {
            $transclude(function(clone) {
                var a = angular.element('<a>');
                a.attr('href', $attrs.url);
                a.text(clone.text());
                $element.append(a);
            });
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS">angular.module(<span class="hljs-string">'app'</span>, [])
.directive(<span class="hljs-string">'testDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope, $element, $attrs, $transclude, $log</span>) </span>{
            $transclude(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">clone</span>) </span>{
                <span class="hljs-keyword">var</span> a = angular.element(<span class="hljs-string">'&lt;a&gt;'</span>);
                a.attr(<span class="hljs-string">'href'</span>, $attrs.url);
                a.text(clone.text());
                $element.append(a);
            });
        }
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/JKNGpN?editors=1011" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/JKNGpN" data-typeid="3">点击预览</button></p>
<p>$transclude 可以接受两个参数，第一个是$scope，第二个是才有参数clone的回调函数。</p>
<p>而这个clone实际上就是嵌入的内容。可以在根据它做很多DOM操作。</p>
<p>它还有最简单的用法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.directive('testDirective', function() {
    return {
        transclude: true,
        replace: true,
        controller: function($scope, $element, $attrs, $transclude, $log) {
            
            // 这里的$transclude就是嵌入的内容
            var a = $transclude();
            $element.append(a);
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.directive(<span class="hljs-string">'testDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope, $element, $attrs, $transclude, $log</span>) </span>{
            
            <span class="hljs-comment">// 这里的$transclude就是嵌入的内容</span>
            <span class="hljs-keyword">var</span> a = $transclude();
            $element.append(a);
        }
    }
})</code></pre>
<p>但是我们要注意，使用$transclude会生成一个新的作用域。默认情况下，如果我们简单使用$transclude()，那么其作用域就是$transclude 生成的作用域。但是如果我们使用$transclude($scope, function(clone) {})，那么作用域就是directive的作用域了。</p>
<p>当然问题又来了，如果我们想使用父级作用域呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$scope.$parent" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">$scope.$parent</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;parentController&quot;>
    <div ng-controller=&quot;sonController&quot;>
        <test-directive url=&quot;http://www.tigerbrokers.com&quot;>炒美股，上老虎2</test-directive>
    </div>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"parentController"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"sonController"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">test-directive</span> <span class="hljs-attr">url</span>=<span class="hljs-string">"http://www.tigerbrokers.com"</span>&gt;</span>炒美股，上老虎2<span class="hljs-tag">&lt;/<span class="hljs-name">test-directive</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('parentController', function($scope) {
    $scope.title = &quot;PARENT TIGER&quot;;
})

.controller('sonController', function($scope) {
    $scope.title = &quot;CHILDREN TIGER&quot;;
})

.directive('testDirective', function() {
    return {
        transclude: true,
        replace: true,
        controller: function($scope, $element, $attrs, $transclude, $log) {
            var a = $transclude();
            $element.append(a);
            $log.info($scope.title);
            $log.info($scope.$parent.title);
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'parentController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.title = <span class="hljs-string">"PARENT TIGER"</span>;
})

.controller(<span class="hljs-string">'sonController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.title = <span class="hljs-string">"CHILDREN TIGER"</span>;
})

.directive(<span class="hljs-string">'testDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">transclude</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">replace</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope, $element, $attrs, $transclude, $log</span>) </span>{
            <span class="hljs-keyword">var</span> a = $transclude();
            $element.append(a);
            $log.info($scope.title);
            $log.info($scope.$parent.title);
        }
    }
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/XKRdJg?editors=1011" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/XKRdJg" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader9">10. controllerAs</h3>
<p>angualr 1.2之后，就已经开始支持controllerAs的语法，这样我们就可以不用将属性和方法挂载到$scope上，而是this上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;app&quot; ng-controller=&quot;demoController as demo&quot;>"{{" demo.name "}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"app"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"demoController as demo"</span>&gt;</span>"{{" demo.name "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="angular.module('app', [])
.controller('demoController', function() {
    this.name = &quot;Jake&quot;;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">angular.module(<span class="hljs-string">'app'</span>, [])
.controller(<span class="hljs-string">'demoController'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"Jake"</span>;
})</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/vKmGyb?editors=1011" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/vKmGyb" data-typeid="3">点击预览</button></p>
<p>我们可以从实例中看出，这里的this就是指的as后面的那个别名。然后我们在表达式中就可以使用这个别名</p>
<p>我们知道，在directive中的controller，主要职能是对外提供交互接口，而结合require与link，因此我们常常会利用这样的语法而非上面例子中的$scope</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.directive('testDirective', function() {
    return {
        controller: function() {
            this.name = &quot;Jake&quot;;
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.directive(<span class="hljs-string">'testDirective'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">controller</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"Jake"</span>;
        }
    }
})</code></pre>
<h3 id="articleHeader10">11. require</h3>
<p>字符串或者数组，字符串代表另一个指令的名字，它将作为link函数的第四个参数。具体用法我们可以举例子来说明。</p>
<p>假设现在我们要编写两个指令，两个指令的link函数中存在许多重合的方法，这时候我们就可以将这些重复的方法写在第三个指令的controller中，然后在这两个指令中，使用require将第三个指令引入进来，然后我们就可以通过link连接函数的第四个参数引用这些重合的方法了</p>
<p>指令之间常常通过这种方式进行交互</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div ng-app=&quot;expanderModule&quot; ng-controller=&quot;SomeController&quot; class=&quot;wrap&quot;>
    <accordion>
        <expander class='expander' ng-repeat='expander in expanders' expander-title='expander.title'>
            "{{"expander.text"}}"
        </expander>
    </accordion>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"expanderModule"</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"SomeController"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">accordion</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">expander</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'expander'</span> <span class="hljs-attr">ng-repeat</span>=<span class="hljs-string">'expander in expanders'</span> <span class="hljs-attr">expander-title</span>=<span class="hljs-string">'expander.title'</span>&gt;</span>
            "{{"expander.text"}}"
        <span class="hljs-tag">&lt;/<span class="hljs-name">expander</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">accordion</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var expModule=angular.module('expanderModule',[])
expModule.directive('accordion', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div ng-transclude></div>',
        controller : function() {
            var expanders = [];
            this.gotOpened = function(selectedExpander) {
                angular.forEach(expanders, function(expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            }
            this.addExpander = function(expander) {
                expanders.push(expander);
            }
        }
    }
});

expModule.directive('expander', function() {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        require : '^?accordion',
        scope : {
            title : '=expanderTitle'
        },
        template : '<div>'
                   + '<div class=&quot;title&quot; ng-click=&quot;toggle()&quot;>"{{"title"}}"</div>'
                   + '<div class=&quot;body&quot; ng-show=&quot;showMe&quot; ng-transclude></div>'
                   + '</div>',
        link : function(scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});

expModule.controller(&quot;SomeController&quot;,function($scope) {
    $scope.expanders = [{
        title : 'Click me to expand',
        text : 'Hi there folks, I am the content that was hidden but is now shown.'
    }, {
        title : 'Click this',
        text : 'I am even better text than you have seen previously'
    }, {
        title : 'Test',
        text : 'test'
    }];
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> expModule=angular.module(<span class="hljs-string">'expanderModule'</span>,[])
expModule.directive(<span class="hljs-string">'accordion'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span> : <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">replace</span> : <span class="hljs-literal">true</span>,
        <span class="hljs-attr">transclude</span> : <span class="hljs-literal">true</span>,
        <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;div ng-transclude&gt;&lt;/div&gt;'</span>,
        <span class="hljs-attr">controller</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> expanders = [];
            <span class="hljs-keyword">this</span>.gotOpened = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">selectedExpander</span>) </span>{
                angular.forEach(expanders, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">expander</span>) </span>{
                    <span class="hljs-keyword">if</span> (selectedExpander != expander) {
                        expander.showMe = <span class="hljs-literal">false</span>;
                    }
                });
            }
            <span class="hljs-keyword">this</span>.addExpander = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">expander</span>) </span>{
                expanders.push(expander);
            }
        }
    }
});

expModule.directive(<span class="hljs-string">'expander'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">restrict</span> : <span class="hljs-string">'EA'</span>,
        <span class="hljs-attr">replace</span> : <span class="hljs-literal">true</span>,
        <span class="hljs-attr">transclude</span> : <span class="hljs-literal">true</span>,
        <span class="hljs-attr">require</span> : <span class="hljs-string">'^?accordion'</span>,
        <span class="hljs-attr">scope</span> : {
            <span class="hljs-attr">title</span> : <span class="hljs-string">'=expanderTitle'</span>
        },
        <span class="hljs-attr">template</span> : <span class="hljs-string">'&lt;div&gt;'</span>
                   + <span class="hljs-string">'&lt;div class="title" ng-click="toggle()"&gt;"{{"title"}}"&lt;/div&gt;'</span>
                   + <span class="hljs-string">'&lt;div class="body" ng-show="showMe" ng-transclude&gt;&lt;/div&gt;'</span>
                   + <span class="hljs-string">'&lt;/div&gt;'</span>,
        <span class="hljs-attr">link</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">scope, element, attrs, accordionController</span>) </span>{
            scope.showMe = <span class="hljs-literal">false</span>;
            accordionController.addExpander(scope);
            scope.toggle = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toggle</span>(<span class="hljs-params"></span>) </span>{
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});

expModule.controller(<span class="hljs-string">"SomeController"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.expanders = [{
        <span class="hljs-attr">title</span> : <span class="hljs-string">'Click me to expand'</span>,
        <span class="hljs-attr">text</span> : <span class="hljs-string">'Hi there folks, I am the content that was hidden but is now shown.'</span>
    }, {
        <span class="hljs-attr">title</span> : <span class="hljs-string">'Click this'</span>,
        <span class="hljs-attr">text</span> : <span class="hljs-string">'I am even better text than you have seen previously'</span>
    }, {
        <span class="hljs-attr">title</span> : <span class="hljs-string">'Test'</span>,
        <span class="hljs-attr">text</span> : <span class="hljs-string">'test'</span>
    }];
});</code></pre>
<p><a href="http://codepen.io/yangbo5207/pen/kXyvad?editors=1011" rel="nofollow noreferrer" target="_blank">实例地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="yangbo5207/pen/kXyvad" data-typeid="3">点击预览</button></p>
<p>实例说明，controller是用来与不同指令之间通信的。</p>
<p>另外我们可以在require的参数值加上下面的某个前缀，这回改变查找控制器的行为。</p>
<ul>
<li>没有前缀 指令会在自身提供的控制器中进行查找，如果找不到任何控制器，则会抛出一个error</li>
<li>? 若在当前指令中没有找到所需的控制器，则会将null传给link链接函数的第四个参数</li>
<li>^ 如果在当前的指令中没有找到所需的控制器，则会查找父元素的控制器</li>
<li>?^ 如果在当前和父元素中都没有找到控制器，则会将null传给link</li>
</ul>
<h3 id="articleHeader11">12. angular指令编译过程</h3>
<p>首先加载angular库，查找ng-app指令，从而找到应用的边界，根据ng-app划定的作用域来调用$compile服务进行编译。</p>
<p>angular会遍历整个html文档，并根据js中指令的定义来处理在页面上声明的各个指令，按照指令的优先级排列，根据指令中的配置参数(template, replace, transclude等)转换DOM，然后就开始按照顺序执行各指令的compile函数（如果指令上有定义compile函数）对模板自身进行转换。</p>
<blockquote><p>此处的compile函数值什么指令中配置的，与上面说的$compile服务不一样</p></blockquote>
<p>每个compile函数执行完后会返回一个link函数，所有的link函数会合成一个大的link函数，然后这个大的link函数就会被执行， 主要做数据绑定，通过 DOM上注册监听器来动态修改scope中的数据，或者是使用$watchs监听scope中变量来修改DOM，从而建立双向绑定等等。</p>
<p>若我们的指令中没有配置compile函数，那我们配置的link函数就会运行，她做的事情大致跟上面compile返回之后所有的link合成的大link函数差不多。</p>
<p><strong>所以，在指令中compile与link选项是互斥的，如果同时设置了这两项，那么就会把compile所返回的函数当做是链接函数，而link选项本身会被忽略。</strong></p>
<h3 id="articleHeader12">13. compile编译函数与link链接函数</h3>
<p>cmopile选项可以返回一个对象或者函数，在这里我们可以在指令和实时数据被放到DOM之前进行DOM操作，比如我们可以在这里进行添加或者删除节点的DOM操作。</p>
<p>所以编译函数是负责对模板的DOM进行转换，并且仅仅只会运行一次</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//compile函数的语法
compile:function compile(tElement,tAttrs,transclude){
      return{
        pre:function preLink(scope,iElement,iAttrs,controller){},
        post:function postLink(scope,iElement,iAttrs,controller){}
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//compile函数的语法</span>
compile:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compile</span>(<span class="hljs-params">tElement,tAttrs,transclude</span>)</span>{
      <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">pre</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">preLink</span>(<span class="hljs-params">scope,iElement,iAttrs,controller</span>)</span>{},
        <span class="hljs-attr">post</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">postLink</span>(<span class="hljs-params">scope,iElement,iAttrs,controller</span>)</span>{}
      }
    }</code></pre>
<p>对于我们编写的大部分指令来说，并不需要对模板进行转换，所以大部分情况只需要编写link函数就行。</p>
<blockquote><p>preLink函数会在编译阶段之后，指令链接到子元素之前执行，类似的，postLink会在指令链接到子元素之后执行。这意味着，为了不破坏绑定过程，如果你需要修改DOM结构，你应该在postLink函数中来做这件事情。</p></blockquote>
<p>link函数负责将作用域与DOM进行链接</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//link链接函数
link:function postLink(scope,iElement,iAttrs){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//link链接函数</span>
link:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">postLink</span>(<span class="hljs-params">scope,iElement,iAttrs</span>)</span>{}</code></pre>
<p>若指令中定义有require选项，则link函数会有第四个参数，代表控制器或者所依赖的指令的控制器（上面require选项例子已有例子）</p>
<p>内容都真够多的，终于整理完了，今天写了两篇文章，感觉好累！如果大家觉得文章对你有帮助，求赞求收藏。</p>
<blockquote><p>许多内容都是从不同的网站上整理而来，每一个实例都是自己运行过后保存在codepen上，大家可以结合codepen的例子结合理解文章内容，本文属于收集文，非原创，但绝对干货！值！得!一!赞！与收藏。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular directive 实例详解

## 原文链接
[https://segmentfault.com/a/1190000005851663](https://segmentfault.com/a/1190000005851663)

