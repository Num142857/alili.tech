---
title: '从一个组件的实现来深刻理解 JS 中的继承' 
date: 2019-02-01 2:30:10
hidden: true
slug: 95f0rd02cd
categories: [reprint]
---

{{< raw >}}

                    
<p>其实，无论是写什么语言的程序员，最终的目的，都是把产品或代码封装到一起，提供接口，让使用者很舒适的实现功能。所以对于我来说，往往头疼的不是写代码，而是写注释和文档！如果接口很乱，肯定会头疼一整天。</p>
<p><span class="img-wrap"><img data-src="/img/bVEWTS?w=690&amp;h=487" src="https://static.alili.tech/img/bVEWTS?w=690&amp;h=487" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>JavaScript 最初是以 Web 脚本语言面向大众的，尽管现在出了服务器端的 nodejs，但是单线程的性质还没有变。对于一个 Web 开发人员来说，能写一手漂亮的组件极为重要。GitHub 上那些开源且 stars 过百的 Web 项目或组件，可读性肯定非常好。</p>
<h2 id="articleHeader0">从一个例子来学习写组件</h2>
<p>组件教程的参考来自于 GitHub 上，通俗易懂，<a href="https://github.com/purplebamboo/demo-richbase" rel="nofollow noreferrer" target="_blank">链接</a>。</p>
<p>要实现下面这个功能，对一个 input 输入框的内容进行验证，只有纯数字和字母的组合才是被接受的，其他都返回 failed：</p>
<p><span class="img-wrap"><img data-src="/img/bVEWT5?w=302&amp;h=60" src="https://static.alili.tech/img/bVEWT5?w=302&amp;h=60" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">全局变量写法</h3>
<p>这种写法完全没有约束，基本所有人都会，完全没啥技巧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<input type=&quot;text&quot; id=&quot;input&quot;/>
// javascript
var input = document.getElementById(&quot;input&quot;);
function getValue(){
  return input.value;
}
function render(){
  var value = getValue();
  if(!document.getElementById(&quot;show&quot;)){
    var append = document.createElement('span');
    append.setAttribute(&quot;id&quot;, &quot;show&quot;);
    input.parentNode.appendChild(append);
  }
  var show = document.getElementById(&quot;show&quot;);
  if(/^[0-9a-zA-Z]+$/.exec(value)){
    show.innerHTML = 'Pass!';
  }else{
    show.innerHTML = 'Failed!';
  }
}
input.addEventListener('keyup', function(){
  render();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// html</span>
&lt;input type=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"input"</span>/&gt;
<span class="hljs-comment">// javascript</span>
<span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"input"</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getValue</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> input.value;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> value = getValue();
  <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
    <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
    append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
    input.parentNode.appendChild(append);
  }
  <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
  <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]+$/</span>.exec(value)){
    show.innerHTML = <span class="hljs-string">'Pass!'</span>;
  }<span class="hljs-keyword">else</span>{
    show.innerHTML = <span class="hljs-string">'Failed!'</span>;
  }
}
input.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  render();
});</code></pre>
<p>缺点自然不用多说，变量没有任何隔离，严重污染全局变量，虽然可以达到目的，但极不推荐这种写法。</p>
<h3 id="articleHeader2">对象隔离作用域</h3>
<p>鉴于以上写法的弊端，我们用对象来隔离变量和函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
  input: null,
  // 初始化并提供入口调用方法
  init: function(config){
    this.input = document.getElementById(config.id);
    this.bind();
    //链式调用
    return this;
  },
  // 绑定
  bind: function(){
    var self = this;
    this.input.addEventListener('keyup', function(){
      self.render();
    });
  },
  getValue: function(){
    return this.input.value;
  },
  render: function(){
    var value = this.getValue();
    if(!document.getElementById(&quot;show&quot;)){
      var append = document.createElement('span');
      append.setAttribute(&quot;id&quot;, &quot;show&quot;);
      input.parentNode.appendChild(append);
    }
    var show = document.getElementById(&quot;show&quot;);
    if(/^[0-9a-zA-Z]+$/.exec(value)){
      show.innerHTML = 'Pass!';
    }else{
      show.innerHTML = 'Failed!';
    }
  }
}
window.onload = function(){
  obj.init({id: &quot;input&quot;});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> obj = {
  <span class="hljs-attr">input</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-comment">// 初始化并提供入口调用方法</span>
  init: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-keyword">this</span>.input = <span class="hljs-built_in">document</span>.getElementById(config.id);
    <span class="hljs-keyword">this</span>.bind();
    <span class="hljs-comment">//链式调用</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  },
  <span class="hljs-comment">// 绑定</span>
  bind: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.input.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      self.render();
    });
  },
  <span class="hljs-attr">getValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input.value;
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.getValue();
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
      <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
      append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
      input.parentNode.appendChild(append);
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]+$/</span>.exec(value)){
      show.innerHTML = <span class="hljs-string">'Pass!'</span>;
    }<span class="hljs-keyword">else</span>{
      show.innerHTML = <span class="hljs-string">'Failed!'</span>;
    }
  }
}
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  obj.init({<span class="hljs-attr">id</span>: <span class="hljs-string">"input"</span>});
}</code></pre>
<p>相对于开放式的写法，上面的这个方法就比较清晰了。有初始化，有内部函数和变量，还提供入口调用方法。</p>
<p>新手能实现上面的方法已经很不错了，还记得当初做百度前端学院题目的时候，基本就是用对象了。</p>
<p>不过这种方法仍然有弊端。obj 对象中的方法都是公开的，并不是私有的，其他人写的代码可以随意更改这些内容。当多人协作或代码量很多时，又会产生一系列问题。</p>
<h3 id="articleHeader3">函数闭包的写法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fun = (function(){
  var _bind = function(obj){
    obj.input.addEventListener('keyup', function(){
      obj.render();
    });
  }
  var _getValue = function(obj){
    return obj.input.value;
  }
  var InputFun = function(config){};
  InputFun.prototype.init = function(config){
    this.input = document.getElementById(config.id);
    _bind(this);
    return this;
  }
  InputFun.prototype.render = function(){
    var value = _getValue(this);
    if(!document.getElementById(&quot;show&quot;)){
      var append = document.createElement('span');
      append.setAttribute(&quot;id&quot;, &quot;show&quot;);
      input.parentNode.appendChild(append);
    }
    var show = document.getElementById(&quot;show&quot;);
    if(/^[0-9a-zA-Z]+$/.exec(value)){
      show.innerHTML = 'Pass!';
    }else{
      show.innerHTML = 'Failed!';
    }
  }
  return InputFun;
})();
window.onload = function(){
  new fun().init({id: 'input'});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> fun = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> _bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    obj.input.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      obj.render();
    });
  }
  <span class="hljs-keyword">var</span> _getValue = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">return</span> obj.input.value;
  }
  <span class="hljs-keyword">var</span> InputFun = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{};
  InputFun.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-keyword">this</span>.input = <span class="hljs-built_in">document</span>.getElementById(config.id);
    _bind(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
  InputFun.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = _getValue(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
      <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
      append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
      input.parentNode.appendChild(append);
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]+$/</span>.exec(value)){
      show.innerHTML = <span class="hljs-string">'Pass!'</span>;
    }<span class="hljs-keyword">else</span>{
      show.innerHTML = <span class="hljs-string">'Failed!'</span>;
    }
  }
  <span class="hljs-keyword">return</span> InputFun;
})();
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">new</span> fun().init({<span class="hljs-attr">id</span>: <span class="hljs-string">'input'</span>});
}</code></pre>
<p>函数闭包写法的好处都在自执行的闭包里，不会受到外面的影响，而且提供给外面的方法包括 init 和 render。比如我们可以像 JQuery 那样，稍微对其改造一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = function(id){
  // 这样子就不用每次都 new 了
  return new fun().init({'id': id});
}
window.onload = function(){
  $('input');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> $ = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id</span>)</span>{
  <span class="hljs-comment">// 这样子就不用每次都 new 了</span>
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> fun().init({<span class="hljs-string">'id'</span>: id});
}
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  $(<span class="hljs-string">'input'</span>);
}</code></pre>
<p>还没有涉及到原型，只是简单的闭包。</p>
<p>基本上，这已经是一个合格的写法了。</p>
<h3 id="articleHeader4">面向对象</h3>
<p>虽然上面的方法以及够好了，但是我们的目的，是为了使用面向对象。面向对象一直以来都是被认为最佳的编程方式，如果每个人的代码风格都相似，维护、查看起来就非常的方便。</p>
<p>但是，我想在介绍面向对象之前，先来回忆一下 JS 中的继承（实现我们放到最后再说）。</p>
<h2 id="articleHeader5">入门级的面向对象</h2>
<p>提到继承，我首先想到的就是用 new 来实现。还是以例子为主吧，人-&gt;学生-&gt;小学生，在 JS 中有原型链这么一说，__proto__ 和 prototype ，对于原型链就不过多阐述，如果不懂的可以自己去查阅一些资料。</p>
<p>在这里，我还是要说明一下 JS 中的 new 构造，比如 <code>var student = new Person(name)</code>，实际上有三步操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var student = {};
student.__proto__ = Person.prototype;
Person.call(student, name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> student = {};
student.__proto__ = Person.prototype;
Person.call(student, name)</code></pre>
<p>得到的 student 是一个对象，__proto__执行 Person 的 prototype，Person.call 相当于 constructor。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
  this.name = name;
}
Person.prototype.Say = function(){
  console.log(this.name + ' can say!');
}
var ming = new Person(&quot;xiaoming&quot;);
console.log(ming.__proto__ == Person.prototype) //true new的第二步结果
console.log(ming.name) // 'xiaoming' new 的第三步结果
ming.Say() // 'xiaoming can say!' proto 向上追溯的结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Person.prototype.Say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can say!'</span>);
}
<span class="hljs-keyword">var</span> ming = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"xiaoming"</span>);
<span class="hljs-built_in">console</span>.log(ming.__proto__ == Person.prototype) <span class="hljs-comment">//true new的第二步结果</span>
<span class="hljs-built_in">console</span>.log(ming.name) <span class="hljs-comment">// 'xiaoming' new 的第三步结果</span>
ming.Say() <span class="hljs-comment">// 'xiaoming can say!' proto 向上追溯的结果</span></code></pre>
<p>利用 __proto__ 属性的向上追溯，可以实现一个基于原型链的继承。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name){
  this.name = name;
}
Person.prototype.Say = function(){
  console.log(this.name + ' can say!');
}
function Student(name){
  Person.call(this, name); //Person 的属性赋值给 Student
}
Student.prototype = new Person(); //顺序不能反，要在最前面
Student.prototype.DoHomeWork = function(){
  console.log(this.name + ' can do homework!');
}
var ming = new Student(&quot;xiaoming&quot;);
ming.DoHomeWork(); //'xiaoming can do homework!'
ming.Say(); //'xiaoming can say!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-keyword">this</span>.name = name;
}
Person.prototype.Say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can say!'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Student</span>(<span class="hljs-params">name</span>)</span>{
  Person.call(<span class="hljs-keyword">this</span>, name); <span class="hljs-comment">//Person 的属性赋值给 Student</span>
}
Student.prototype = <span class="hljs-keyword">new</span> Person(); <span class="hljs-comment">//顺序不能反，要在最前面</span>
Student.prototype.DoHomeWork = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can do homework!'</span>);
}
<span class="hljs-keyword">var</span> ming = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">"xiaoming"</span>);
ming.DoHomeWork(); <span class="hljs-comment">//'xiaoming can do homework!'</span>
ming.Say(); <span class="hljs-comment">//'xiaoming can say!'</span></code></pre>
<p>大概刚认识原型链的时候，我也就只能写出这样的水平了，<a href="http://yuren.space/blog/2016/09/28/%E5%8E%9F%E5%9E%8B%E9%93%BE/" rel="nofollow noreferrer" target="_blank">我之前的文章</a>。</p>
<p>打开调试工具，看一下 ming 都有哪些东西：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ming
  name: &quot;xiaoming&quot;
  __proto__: Person
    DoHomeWork: ()
    name: undefined //注意这里多了一个 name 属性
    __proto__: Object
      Say: ()
      constructor: Person(name)
      __proto__: Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>ming
<span class="hljs-symbol">  name:</span> <span class="hljs-string">"xiaoming"</span>
<span class="hljs-symbol">  __proto__:</span> Person
<span class="hljs-symbol">    DoHomeWork:</span> ()
<span class="hljs-symbol">    name:</span> undefined <span class="hljs-comment">//注意这里多了一个 name 属性</span>
<span class="hljs-symbol">    __proto__:</span> Object
<span class="hljs-symbol">      Say:</span> ()
<span class="hljs-symbol">      constructor:</span> Person(name)
<span class="hljs-symbol">      __proto__:</span> Object</code></pre>
<p>当调用 <code>ming.Say()</code> 的时候，刚好 <code>ming.__proto__.__proto__</code> 有这个属性，这就是链式调用的原理，一层一层向下寻找。</p>
<p>这就是最简单的继承了。</p>
<h2 id="articleHeader6">面向对象的进阶</h2>
<p>来看一看刚才那种做法的弊端。</p>
<ol>
<li><p>没有实现传统面向对象该有的 super 方法来调用父类方法，链式和 super 方法相比还是有一定缺陷的；</p></li>
<li><p>造成过多的原型属性（name），constructor 丢失（constructor 是一个非常重要的属性，<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor" rel="nofollow noreferrer" target="_blank">MDN</a>）。</p></li>
</ol>
<p>因为链式是一层层向上寻找，知道找到为止，很明显 super 直接调用父类更具有优势。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 多了原型属性
console.log(ming.__proto__) // {name: undefined}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 多了原型属性</span>
console.<span class="hljs-built_in">log</span>(ming.<span class="hljs-variable">__proto__</span>) <span class="hljs-comment">// {name: undefined}</span></code></pre>
<p>为什么会多一个 name，原因是因为我们执行了 <code>Student.prototype = new Person();</code>，而 new 的第三步会执行一个 call 的函数，会使得 <code>Student.prototype.name = undefined</code>，恰好 <code>ming.__proto__</code> 指向 Student 的 prototype，用了 new 是无法避免的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 少了 constructor
console.log(ming.constructor == Person) //true
console.log(ming.constructor == Student) // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 少了 constructor</span>
console.log(ming<span class="hljs-selector-class">.constructor</span> == Person) <span class="hljs-comment">//true</span>
console.log(ming<span class="hljs-selector-class">.constructor</span> == Student) <span class="hljs-comment">// false</span></code></pre>
<p>这也很奇怪，明明 ming 是继承与 Student，却返回 false，究其原因，<code>Student.prototype</code> 的 constructor 方法丢失，向上找到了  <code>Student.prototype.__proto__</code> 的 constructor 方法。</p>
<p><span class="img-wrap"><img data-src="/img/bVEWU0?w=354&amp;h=172" src="https://static.alili.tech/img/bVEWU0?w=354&amp;h=172" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>再找原因，这句话导致了 <code>Student.prototype</code> 的 constructor 方法丢失：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Student.prototype = new Person();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">Student.prototype = <span class="hljs-keyword">new</span> Person();</code></pre>
<p>在这句话之前打一个断点，曾经是有的，只是被替换掉了：</p>
<p><span class="img-wrap"><img data-src="/img/bVEWU5?w=348&amp;h=151" src="https://static.alili.tech/img/bVEWU5?w=348&amp;h=151" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>找到了问题所在，现在来改进：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// fn 用来排除多余的属性(name)
var fn = function(){};
fn.prototype = Person.prototype;
Student.prototype = new fn();
// 重新添上 constructor 属性
Student.prototype.constructor = Student;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// fn 用来排除多余的属性(name)</span>
var <span class="hljs-function"><span class="hljs-keyword">fn</span> = function<span class="hljs-params">()</span>{}</span>;
<span class="hljs-function"><span class="hljs-keyword">fn</span>.<span class="hljs-title">prototype</span> = Person.prototype</span>;
Student.prototype = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">fn</span><span class="hljs-params">()</span></span>;
<span class="hljs-comment">// 重新添上 constructor 属性</span>
Student.prototype.constructor = Student;</code></pre>
<p>用上面的继承代码替换掉之前的 <code>Student.prototype = new Person();</code></p>
<h2 id="articleHeader7">面向对象的封装</h2>
<p>我们不能每一次写代码的时候都这样写这么多行来继承吧，所以，于情于理，还是来进行简单的包装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function classInherit(subClass, parentClass){
  var fn = function(){};
  fn.prototype = parentClass.prototype;
  subClass.prototype = new fn();
  subClass.prototype.constructor = subClass;
}
classInherit(Student, Person);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">classInherit</span>(<span class="hljs-params">subClass, parentClass</span>)</span>{
  <span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
  fn.prototype = parentClass.prototype;
  subClass.prototype = <span class="hljs-keyword">new</span> fn();
  subClass.prototype.constructor = subClass;
}
classInherit(Student, Person);</code></pre>
<p><del>哈哈，所谓的包装，就是重抄一下代码。</del></p>
<h2 id="articleHeader8">进一步完善面向对象</h2>
<p>上面的问题只是简单的解决了多余属性和 constructor 丢失的问题，而 super 问题仍然没有改进。</p>
<p>举个栗子，来看看 super 的重要，每个人都会睡觉，sleep 函数是人的一个属性，学生分为小学生和大学生，小学生晚上 9 点睡觉，大学生 12 点睡觉，于是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Person.prototype.Sleep = function(){
  console.log('Sleep!');
}
function E_Student(){}; //小学生
function C_Student(){}; //大学生
classInherit(E_Student, Person);
classInherit(C_Student, Person);
//重写 Sleep 方法
E_Student.prototype.Sleep = function(){
  console.log('Sleep!');
  console.log('Sleep at 9 clock');
}
C_Student.prototype.Sleep = function(){
  console.log('Sleep!');
  console.log('Sleep at 12 clock');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Person.prototype.Sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep!'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">E_Student</span>(<span class="hljs-params"></span>)</span>{}; <span class="hljs-comment">//小学生</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C_Student</span>(<span class="hljs-params"></span>)</span>{}; <span class="hljs-comment">//大学生</span>
classInherit(E_Student, Person);
classInherit(C_Student, Person);
<span class="hljs-comment">//重写 Sleep 方法</span>
E_Student.prototype.Sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep!'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep at 9 clock'</span>);
}
C_Student.prototype.Sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep!'</span>);
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep at 12 clock'</span>);
}</code></pre>
<p>对于 Sleep 方法，显得比较混乱，而我们想要通过 super，直接调用父类的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="E_Student.prototype.Sleep = function(){
  this._super(); //super 方法
  console.log('Sleep at 9 clock');
}
C_Student.prototype.Sleep = function(){
  this._super(); //super 方法
  console.log('Sleep at 12 clock');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">E_Student.prototype.Sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>._super(); <span class="hljs-comment">//super 方法</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep at 9 clock'</span>);
}
C_Student.prototype.Sleep = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>._super(); <span class="hljs-comment">//super 方法</span>
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Sleep at 12 clock'</span>);
}</code></pre>
<p>不知道对 super 的理解正不正确，总感觉怪怪的，欢迎指正！</p>
<p>来看下 JQuery 之父是如何 class 的面向对象，<a href="http://ejohn.org/blog/simple-javascript-inheritance/" rel="nofollow noreferrer" target="_blank">原文在这</a>，源码如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  // initializing 开关很巧妙的来实现调用原型而不构造，还有回掉
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  // 全局，this 指向 window，最大的父类
  this.Class = function(){};
 
  // Create a new Class that inherits from this class
  // 继承的入口
  Class.extend = function(prop) {
    //保留当前类，一般是父类的原型
    var _super = this.prototype;
   
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    //开关 用来使原型赋值时不调用真正的构成流程
    initializing = true;
    var prototype = new this();
    initializing = false;
   
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      //对函数判断，将属性套到子类上
      prototype[name] = typeof prop[name] == &quot;function&quot; &amp;&amp;
        typeof _super[name] == &quot;function&quot; &amp;&amp; fnTest.test(prop[name]) ?
        (function(name, fn){
          //用闭包来存储
          return function() {
            var tmp = this._super;
           
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
           
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            //实现同名调用
            var ret = fn.apply(this, arguments);  
            this._super = tmp;
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    // 要返回的子类
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing &amp;&amp; this.init )
        this.init.apply(this, arguments);
    }
    //前面介绍过的，继承
    Class.prototype = prototype;
   
    Class.prototype.constructor = Class;
 
    Class.extend = arguments.callee;
   
    return Class;
  };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */</span>
<span class="hljs-comment">// Inspired by base2 and Prototype</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// initializing 开关很巧妙的来实现调用原型而不构造，还有回掉</span>
  <span class="hljs-keyword">var</span> initializing = <span class="hljs-literal">false</span>, fnTest = <span class="hljs-regexp">/xyz/</span>.test(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{xyz;}) ? <span class="hljs-regexp">/\b_super\b/</span> : <span class="hljs-regexp">/.*/</span>;
  <span class="hljs-comment">// The base Class implementation (does nothing)</span>
  <span class="hljs-comment">// 全局，this 指向 window，最大的父类</span>
  <span class="hljs-keyword">this</span>.Class = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{};
 
  <span class="hljs-comment">// Create a new Class that inherits from this class</span>
  <span class="hljs-comment">// 继承的入口</span>
  Class.extend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prop</span>) </span>{
    <span class="hljs-comment">//保留当前类，一般是父类的原型</span>
    <span class="hljs-keyword">var</span> _super = <span class="hljs-keyword">this</span>.prototype;
   
    <span class="hljs-comment">// Instantiate a base class (but only create the instance,</span>
    <span class="hljs-comment">// don't run the init constructor)</span>
    <span class="hljs-comment">//开关 用来使原型赋值时不调用真正的构成流程</span>
    initializing = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">var</span> prototype = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>();
    initializing = <span class="hljs-literal">false</span>;
   
    <span class="hljs-comment">// Copy the properties over onto the new prototype</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> name <span class="hljs-keyword">in</span> prop) {
      <span class="hljs-comment">// Check if we're overwriting an existing function</span>
      <span class="hljs-comment">//对函数判断，将属性套到子类上</span>
      prototype[name] = <span class="hljs-keyword">typeof</span> prop[name] == <span class="hljs-string">"function"</span> &amp;&amp;
        <span class="hljs-keyword">typeof</span> _super[name] == <span class="hljs-string">"function"</span> &amp;&amp; fnTest.test(prop[name]) ?
        (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name, fn</span>)</span>{
          <span class="hljs-comment">//用闭包来存储</span>
          <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> tmp = <span class="hljs-keyword">this</span>._super;
           
            <span class="hljs-comment">// Add a new ._super() method that is the same method</span>
            <span class="hljs-comment">// but on the super-class</span>
            <span class="hljs-keyword">this</span>._super = _super[name];
           
            <span class="hljs-comment">// The method only need to be bound temporarily, so we</span>
            <span class="hljs-comment">// remove it when we're done executing</span>
            <span class="hljs-comment">//实现同名调用</span>
            <span class="hljs-keyword">var</span> ret = fn.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);  
            <span class="hljs-keyword">this</span>._super = tmp;
            <span class="hljs-keyword">return</span> ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
   
    <span class="hljs-comment">// 要返回的子类</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Class</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// All construction is actually done in the init method</span>
      <span class="hljs-keyword">if</span> ( !initializing &amp;&amp; <span class="hljs-keyword">this</span>.init )
        <span class="hljs-keyword">this</span>.init.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
    }
    <span class="hljs-comment">//前面介绍过的，继承</span>
    Class.prototype = prototype;
   
    Class.prototype.constructor = Class;
 
    Class.extend = <span class="hljs-built_in">arguments</span>.callee;
   
    <span class="hljs-keyword">return</span> Class;
  };
})();</code></pre>
<p>这个时候就可以很轻松的实现面向对象，使用如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Person = Class.extend({
  init: function(name){
    this.name = name;
  },
  Say: function(name){
    console.log(this.name + ' can Say!');
  },
  Sleep: function(){
    console.log(this.name + ' can Sleep!');
  }
});
var Student = Person.extend({
  init: function(name){
    this._super('Student-' + name);
  },
  Sleep: function(){
    this._super();
    console.log('And sleep early!');
  },
  DoHomeWork: function(){
    console.log(this.name + ' can do homework!');
  }
});
var p = new Person('Li');
p.Say(); //'Li can Say!'
p.Sleep(); //'Li can Sleep!'
var ming = new Student('xiaoming');
ming.Say(); //'Student-xiaoming can Say!'
ming.Sleep();//'Student-xiaoming can Sleep!'
            // 'And sleep early!'
ming.DoHomeWork(); //'Student-xiaoming can do homework!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Person = Class.extend({
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
  },
  <span class="hljs-attr">Say</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can Say!'</span>);
  },
  <span class="hljs-attr">Sleep</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can Sleep!'</span>);
  }
});
<span class="hljs-keyword">var</span> Student = Person.extend({
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-keyword">this</span>._super(<span class="hljs-string">'Student-'</span> + name);
  },
  <span class="hljs-attr">Sleep</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>._super();
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'And sleep early!'</span>);
  },
  <span class="hljs-attr">DoHomeWork</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">' can do homework!'</span>);
  }
});
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">'Li'</span>);
p.Say(); <span class="hljs-comment">//'Li can Say!'</span>
p.Sleep(); <span class="hljs-comment">//'Li can Sleep!'</span>
<span class="hljs-keyword">var</span> ming = <span class="hljs-keyword">new</span> Student(<span class="hljs-string">'xiaoming'</span>);
ming.Say(); <span class="hljs-comment">//'Student-xiaoming can Say!'</span>
ming.Sleep();<span class="hljs-comment">//'Student-xiaoming can Sleep!'</span>
            <span class="hljs-comment">// 'And sleep early!'</span>
ming.DoHomeWork(); <span class="hljs-comment">//'Student-xiaoming can do homework!'</span></code></pre>
<p>除了 John Resig 的 super 方法，很多人都做了尝试，不过我觉得 John Resig 的实现方式非常的妙，也比较贴近 super 方法，我本人也用源码调试了好几个小时，才勉强能理解。John Resig 的头脑真是令人佩服。</p>
<h2 id="articleHeader9">ES6 中的 class</h2>
<p>在 JS 中，class 从一开始就属于关键字，在 ES6 终于可以使用 class 来定义类。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Point {
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  toString(){
    return '(' + this.x + ',' + this.y + ')';
  }
}
var p = new Point(3, 4);
console.log(p.toString()); //'(3,4)'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
  <span class="hljs-keyword">constructor</span>(x, y){
    <span class="hljs-keyword">this</span>.x = x;
    <span class="hljs-keyword">this</span>.y = y;
  }
  toString(){
    <span class="hljs-keyword">return</span> <span class="hljs-string">'('</span> + <span class="hljs-keyword">this</span>.x + <span class="hljs-string">','</span> + <span class="hljs-keyword">this</span>.y + <span class="hljs-string">')'</span>;
  }
}
<span class="hljs-keyword">var</span> p = <span class="hljs-keyword">new</span> Point(<span class="hljs-number">3</span>, <span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(p.toString()); <span class="hljs-comment">//'(3,4)'</span></code></pre>
<p>更多有关于 ES6 中类的使用请参考阮一峰老师的 <a href="https://github.com/ruanyf/es6tutorial/blob/102bf25570ba57fb9b75dab6f98e27aaf040d6a7/docs/class.md" rel="nofollow noreferrer" target="_blank">Class基本语法</a>。</p>
<p>其实 ES6 中的 class 只是写对象原型的时候更方便，更像面向对象，class 的功能 ES5 完全可以做到，比如就上面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="typeof Point; //'function'
Point.prototype;
/*
|Object
|--> constructor: function (x, y)
|--> toString: function()
|--> __proto__: Object
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">typeof</span> Point; <span class="hljs-comment">//'function'</span>
Point.prototype;
<span class="hljs-comment">/*
|Object
|--&gt; constructor: function (x, y)
|--&gt; toString: function()
|--&gt; __proto__: Object
*/</span></code></pre>
<p>和用 ES5 实现的真的没有什么差别，反而现在流行的一些库比 ES6 的 class 能带来更好的效益。</p>
<h2 id="articleHeader10">回到最开始的组件问题</h2>
<p>那么，说了这么多面向对象，现在回到最开始的那个组件的实现——<strong>如何用面向对象来实现</strong>。</p>
<p>还是利用 John Resig 构造 class 的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var JudgeInput = Class.extend({
  init: function(config){
    this.input = document.getElementById(config.id);
    this._bind();
  },
  _getValue: function(){
    return this.input.value;
  },
  _render: function(){
    var value = this._getValue();
    if(!document.getElementById(&quot;show&quot;)){
      var append = document.createElement('span');
      append.setAttribute(&quot;id&quot;, &quot;show&quot;);
      input.parentNode.appendChild(append);
    }
    var show = document.getElementById(&quot;show&quot;);
    if(/^[0-9a-zA-Z]+$/.exec(value)){
      show.innerHTML = 'Pass!';
    }else{
      show.innerHTML = 'Failed!';
    }
  },
  _bind: function(){
    var self = this;
    self.input.addEventListener('keyup', function(){
      self._render();
    });
  }
});
window.onload = function(){
  new JudgeInput({id: &quot;input&quot;});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> JudgeInput = Class.extend({
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-keyword">this</span>.input = <span class="hljs-built_in">document</span>.getElementById(config.id);
    <span class="hljs-keyword">this</span>._bind();
  },
  <span class="hljs-attr">_getValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.input.value;
  },
  <span class="hljs-attr">_render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>._getValue();
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
      <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
      append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
      input.parentNode.appendChild(append);
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]+$/</span>.exec(value)){
      show.innerHTML = <span class="hljs-string">'Pass!'</span>;
    }<span class="hljs-keyword">else</span>{
      show.innerHTML = <span class="hljs-string">'Failed!'</span>;
    }
  },
  <span class="hljs-attr">_bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    self.input.addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      self._render();
    });
  }
});
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">new</span> JudgeInput({<span class="hljs-attr">id</span>: <span class="hljs-string">"input"</span>});
}</code></pre>
<p>但是，这样子，基本功能算是实现了，关键是不好扩展，没有面向对象的精髓。所以，针对目前的情况，我们准备建立一个 <code>Base</code> 基类，<code>init</code> 表示初始化，<code>render</code> 函数表示渲染，<code>bind</code> 函数表示绑定，<code>destory</code> 用来销毁，同时 <code>get</code>、<code>set</code> 方法提供获得和更改属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Base = Class.extend({
  init: function(config){
    this._config = config;
    this.bind();
  },
  get: function(key){
    return this._config[key];
  },
  set: function(key, value){
    this._config[key] = value;
  },
  bind: function(){
    //以后构造
  },
  render: function(){
    //以后构造
  },
  destory: function(){
    //定义销毁方法
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> Base = Class.extend({
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">config</span>)</span>{
    <span class="hljs-keyword">this</span>._config = config;
    <span class="hljs-keyword">this</span>.bind();
  },
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._config[key];
  },
  <span class="hljs-attr">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key, value</span>)</span>{
    <span class="hljs-keyword">this</span>._config[key] = value;
  },
  <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//以后构造</span>
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//以后构造</span>
  },
  <span class="hljs-attr">destory</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//定义销毁方法</span>
  }
});</code></pre>
<p>基于这个 <code>Base</code>，我们修改 <code>JudgeInput</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var JudgeInput = Base.extend({
  _getValue: function(){
    return this.get('input').value;
  },
  bind: function(){
    var self = this;
    self.get('input').addEventListener('keyup', function(){
      self.render();
    });
  },
  render: function(){
    var value = this._getValue();
    if(!document.getElementById(&quot;show&quot;)){
      var append = document.createElement('span');
      append.setAttribute(&quot;id&quot;, &quot;show&quot;);
      input.parentNode.appendChild(append);
    }
    var show = document.getElementById(&quot;show&quot;);
    if(/^[0-9a-zA-Z]+$/.exec(value)){
      show.innerHTML = 'Pass!';
    }else{
      show.innerHTML = 'Failed!';
    }
  }
});
window.onload = function(){
  new JudgeInput({input: document.getElementById(&quot;input&quot;)});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> JudgeInput = Base.extend({
  <span class="hljs-attr">_getValue</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.get(<span class="hljs-string">'input'</span>).value;
  },
  <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;
    self.get(<span class="hljs-string">'input'</span>).addEventListener(<span class="hljs-string">'keyup'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      self.render();
    });
  },
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>._getValue();
    <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
      <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
      append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
      input.parentNode.appendChild(append);
    }
    <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]+$/</span>.exec(value)){
      show.innerHTML = <span class="hljs-string">'Pass!'</span>;
    }<span class="hljs-keyword">else</span>{
      show.innerHTML = <span class="hljs-string">'Failed!'</span>;
    }
  }
});
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">new</span> JudgeInput({<span class="hljs-attr">input</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"input"</span>)});
}</code></pre>
<p>比如，我们后期修改了判断条件，<strong>只有当长度为 5-10 的时候才会返回 success</strong>，这个时候能很快定位到 <code>JudgeInput</code> 的 render 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function(){
  var value = this._getValue();
  if(!document.getElementById(&quot;show&quot;)){
    var append = document.createElement('span');
    append.setAttribute(&quot;id&quot;, &quot;show&quot;);
    input.parentNode.appendChild(append);
  }
  var show = document.getElementById(&quot;show&quot;);
  //修改正则即可
  if(/^[0-9a-zA-Z]{5,10}$/.exec(value)){
    show.innerHTML = 'Pass!';
  }else{
    show.innerHTML = 'Failed!';
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>._getValue();
  <span class="hljs-keyword">if</span>(!<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>)){
    <span class="hljs-keyword">var</span> append = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'span'</span>);
    append.setAttribute(<span class="hljs-string">"id"</span>, <span class="hljs-string">"show"</span>);
    input.parentNode.appendChild(append);
  }
  <span class="hljs-keyword">var</span> show = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"show"</span>);
  <span class="hljs-comment">//修改正则即可</span>
  <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[0-9a-zA-Z]{5,10}$/</span>.exec(value)){
    show.innerHTML = <span class="hljs-string">'Pass!'</span>;
  }<span class="hljs-keyword">else</span>{
    show.innerHTML = <span class="hljs-string">'Failed!'</span>;
  }
}</code></pre>
<p>以我目前的能力，只能理解到这里了。</p>
<h2 id="articleHeader11">总结</h2>
<p>从一个组件出发，一步一步爬坑，又跑去介绍 JS 中的面向对象，如果你能看到最后，那么你就可动手一步一步实现一个 JQuery 了，纯调侃。</p>
<p>关于一个组件的写法，从入门级到最终版本，一波三折，不仅要考虑代码的实用性，还要兼顾后期维护。JS 中实现面向对象，刚接触 JS 的时候，我能用简单的原型链来实现，后来看了一些文章，发现了不少问题，在看 John Resig 的 Class，感触颇深。还好，现在目的是实现了，共勉！</p>
<h2 id="articleHeader12">参考</h2>
<blockquote><p><a href="https://github.com/purplebamboo/demo-richbase" rel="nofollow noreferrer" target="_blank">制作组件的例子</a><br><a href="http://purplebamboo.github.io/2014/07/13/javascript-oo-class/" rel="nofollow noreferrer" target="_blank">javascript oo实现</a><br><a href="http://ejohn.org/blog/simple-javascript-inheritance/" rel="nofollow noreferrer" target="_blank">John Resig: Simple JavaScript Inheritance</a></p></blockquote>
<p>欢迎来我<a href="http://yuren.space/blog" rel="nofollow noreferrer" target="_blank">博客</a>一起交流。</p>
<p>2016-11-13</p>
<p>经指正，已经将错误的 supper 改成 super。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一个组件的实现来深刻理解 JS 中的继承

## 原文链接
[https://segmentfault.com/a/1190000007337302](https://segmentfault.com/a/1190000007337302)

