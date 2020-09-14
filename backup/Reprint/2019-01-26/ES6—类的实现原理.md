---
title: 'ES6—类的实现原理' 
date: 2019-01-26 2:30:18
hidden: true
slug: 4tsylfrtz8w
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ES6篇</h2>
<hr>
<p>一段符合ES6语法的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    class a{
      constructor(y,z){
        this.y =y;
        this.z =z;
      }
      render(){
        console.log(1)
      }
    }
    
    class b extends a{
      constructor(m,n){
        super();
        this.m=m;
        this.n=n;
      }
      
      render(){
        console.log(2);
      }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">a</span></span>{
      constructor(y,z){
        <span class="hljs-keyword">this</span>.y =y;
        <span class="hljs-keyword">this</span>.z =z;
      }
      render(){
        console.log(<span class="hljs-number">1</span>)
      }
    }
    
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">b</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">a</span></span>{
      constructor(m,n){
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.m=m;
        <span class="hljs-keyword">this</span>.n=n;
      }
      
      render(){
        console.log(<span class="hljs-number">2</span>);
      }
    }
</code></pre>
<p>我在babel官网上输入，查看转码(),代码长很多，从中找出关键点：</p>
<ul>
<li><p>class</p></li>
<li><p>constructor</p></li>
<li><p>extend</p></li>
<li><p>super</p></li>
</ul>
<h2 id="articleHeader1">class</h2>
<hr>
<p>声明class    <code>class a(){}</code>  <br>查看对应转码  <code>var a = function(){return a}()</code>  <br>可以看出声明一个class就是通过创建并执行一个匿名函数，在这个匿名函数中声明<code>function a</code>,最后返回a。</p>
<h2 id="articleHeader2">constructor</h2>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
 constructor(y,z){
        this.y =y;
        this.z =z;
     }
     
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code> 
 <span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(y,z)</span><span class="hljs-comment">{
        this.y =y;
        this.z =z;
     }</span>
     
</span></code></pre>
<p>对应转码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function a(y, z) {
        _classCallCheck(this, a);

        this.y = y;
        this.z = z;
    }
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">(y, z)</span> </span>{
        _classCallCheck(<span class="hljs-keyword">this</span>, a);

        <span class="hljs-keyword">this</span>.y = y;
        <span class="hljs-keyword">this</span>.z = z;
    }
    
</code></pre>
<p>将<code>_classCallCheck(this,a)</code>提出</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _classCallCheck(instance, Constructor) { 
    if (!(instance instanceof Constructor)) { 
        throw new TypeError(&quot;Cannot call a class as a function&quot;);
     } 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_classCallCheck</span>(<span class="hljs-params">instance, Constructor</span>) </span>{ 
    <span class="hljs-keyword">if</span> (!(instance <span class="hljs-keyword">instanceof</span> Constructor)) { 
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Cannot call a class as a function"</span>);
     } 
}
</code></pre>
<p>这个方面即是判断this的[[prototype]]是否有指向a.prototype的对象。即是判断原本是不是有a这个function。？？感觉解释的不好。  <br>然后再在a(本质是function，但可以被称作class)中声明属性y，z。  <br>接下来，在class a中有一个render方法，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_createClass(a, [{
    key: &quot;render&quot;,
    value: function render() {
      console.log(1);
    }
}]);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>_createClass(a, [{
    <span class="hljs-attr">key</span>: <span class="hljs-string">"render"</span>,
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    }
}]);
</code></pre>
<p>通过<code>_createClass</code>方法，可以给a添加render方法。</p>
<p>将<code>_createClass</code>提出来看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _createClass = function () { 
    // 给对象添加属性
    function defineProperties(target, props) {
     for (var i = 0; i < props.length; i++) { 
         var descriptor = props[i]; 
         descriptor.enumerable = descriptor.enumerable || false; //默认不可枚举
         descriptor.configurable = true;//可配置修改属性
         if (&quot;value&quot; in descriptor) descriptor.writable = true;
         Object.defineProperty(target, descriptor.key, descriptor);//给target添加属性
      } 
    }
    // 返回函数
    return function (Constructor, protoProps, staticProps) { 
        if (protoProps) defineProperties(Constructor.prototype, protoProps); 
        if (staticProps) defineProperties(Constructor, staticProps); 
        return Constructor; 
    }; 
}();//立即执行
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> _createClass = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-comment">// 给对象添加属性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defineProperties</span>(<span class="hljs-params">target, props</span>) </span>{
     <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; props.length; i++) { 
         <span class="hljs-keyword">var</span> descriptor = props[i]; 
         descriptor.enumerable = descriptor.enumerable || <span class="hljs-literal">false</span>; <span class="hljs-comment">//默认不可枚举</span>
         descriptor.configurable = <span class="hljs-literal">true</span>;<span class="hljs-comment">//可配置修改属性</span>
         <span class="hljs-keyword">if</span> (<span class="hljs-string">"value"</span> <span class="hljs-keyword">in</span> descriptor) descriptor.writable = <span class="hljs-literal">true</span>;
         <span class="hljs-built_in">Object</span>.defineProperty(target, descriptor.key, descriptor);<span class="hljs-comment">//给target添加属性</span>
      } 
    }
    <span class="hljs-comment">// 返回函数</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">Constructor, protoProps, staticProps</span>) </span>{ 
        <span class="hljs-keyword">if</span> (protoProps) defineProperties(Constructor.prototype, protoProps); 
        <span class="hljs-keyword">if</span> (staticProps) defineProperties(Constructor, staticProps); 
        <span class="hljs-keyword">return</span> Constructor; 
    }; 
}();<span class="hljs-comment">//立即执行</span>
</code></pre>
<p>由上推断es6给class添加的属性、方法背后是es5对给对象添加属性的方法。</p>
<h2 id="articleHeader3">extend</h2>
<hr>
<p>同样再转码中，找到了对应的<code>_inherits(b, _a)</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _inherits(subClass, superClass) { 
    // 确保superClass为function
    if (typeof superClass !== &quot;function&quot; &amp;&amp; superClass !== null) { 
        throw new TypeError(&quot;Super expression must either be null or a function, not &quot; + typeof superClass);
    } 
    // subClass.prototype的[[prototype]]关联到superClass superClass.prototype
    // 给subClass添加constructor这个属性
    subClass.prototype = Object.create(superClass &amp;&amp; superClass.prototype, { 
        constructor: { 
            value: subClass, 
            enumerable: false, 
            writable: true, 
            configurable: true 
        } 
    });
    // 设置subclass的内置[[prototype]]与superClass相关联
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_inherits</span>(<span class="hljs-params">subClass, superClass</span>) </span>{ 
    <span class="hljs-comment">// 确保superClass为function</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> superClass !== <span class="hljs-string">"function"</span> &amp;&amp; superClass !== <span class="hljs-literal">null</span>) { 
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">"Super expression must either be null or a function, not "</span> + <span class="hljs-keyword">typeof</span> superClass);
    } 
    <span class="hljs-comment">// subClass.prototype的[[prototype]]关联到superClass superClass.prototype</span>
    <span class="hljs-comment">// 给subClass添加constructor这个属性</span>
    subClass.prototype = <span class="hljs-built_in">Object</span>.create(superClass &amp;&amp; superClass.prototype, { 
        <span class="hljs-keyword">constructor</span>: { 
            value: subClass, 
            enumerable: <span class="hljs-literal">false</span>, 
            writable: <span class="hljs-literal">true</span>, 
            configurable: <span class="hljs-literal">true</span> 
        } 
    });
    <span class="hljs-comment">// 设置subclass的内置[[prototype]]与superClass相关联</span>
    <span class="hljs-keyword">if</span> (superClass) <span class="hljs-built_in">Object</span>.setPrototypeOf ? <span class="hljs-built_in">Object</span>.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
</code></pre>
<p>可以看出<code>extend</code>背后是通过js的原型链实现的。  <br>其中在<code>class b extends a</code>中要将a传入b中。</p>
<h2 id="articleHeader4">super</h2>
<hr>
<p>其中对应的转码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function b(m, n) {
    _classCallCheck(this, b);

    var _this = _possibleConstructorReturn(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this));

    _this.m = m;
    _this.n = n;
    return _this;
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">function</span> b(m, n) {
    <span class="hljs-number">_</span>classCallCheck(<span class="hljs-keyword">this</span>, b);

    <span class="hljs-keyword">var</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span> = <span class="hljs-number">_</span>possibleConstructorReturn(<span class="hljs-keyword">this</span>, (b<span class="hljs-variable">.__proto__</span> || Object<span class="hljs-variable">.getPrototypeOf</span>(b))<span class="hljs-variable">.call</span>(<span class="hljs-keyword">this</span>));

    <span class="hljs-number">_</span><span class="hljs-keyword">this</span><span class="hljs-variable">.m</span> = m;
    <span class="hljs-number">_</span><span class="hljs-keyword">this</span><span class="hljs-variable">.n</span> = n;
    <span class="hljs-keyword">return</span> <span class="hljs-number">_</span><span class="hljs-keyword">this</span>;
  }
</code></pre>
<p>其中<code>_possibleConstructorReturn</code>实现了<code>super</code>的原理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function _possibleConstructorReturn(self, call) {
  if (!self) {
      throw new ReferenceError(&quot;this hasn't been initialised - super() hasn't been called&quot;); 
  } 
  //显示绑定b的内置[[prototype]]到this，即在b中执行b原型链上关联的属性。
  return call &amp;&amp; (typeof call === &quot;object&quot; || typeof call === &quot;function&quot;) ? call : self; 
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_possibleConstructorReturn</span>(<span class="hljs-params">self, call</span>) </span>{
  <span class="hljs-keyword">if</span> (!self) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">"this hasn't been initialised - super() hasn't been called"</span>); 
  } 
  <span class="hljs-comment">//显示绑定b的内置[[prototype]]到this，即在b中执行b原型链上关联的属性。</span>
  <span class="hljs-keyword">return</span> call &amp;&amp; (<span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"object"</span> || <span class="hljs-keyword">typeof</span> call === <span class="hljs-string">"function"</span>) ? call : self; 
}
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6—类的实现原理

## 原文链接
[https://segmentfault.com/a/1190000008390268](https://segmentfault.com/a/1190000008390268)

