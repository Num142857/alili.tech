---
title: 'javascript设计模式－－单例模式' 
date: 2019-01-10 2:30:08
hidden: true
slug: 2ppxseyem7c
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>javascript单例模式总结</strong></p>
<p><strong>1.什么是单例模式？</strong></p>
<p>单例模式的定义是：<code>一个类仅有一个实例，并且可以在全局访问</code>。<br>在日常开发中，单例模式的使用十分广泛。例如开发登录浮窗，我们无论点击登录按钮多少次，浮窗都只会创建一次。<br>这时，浮窗就很适合使用单例模式来创建。</p>
<p><strong>2.实现单例模式</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var CreatePopbox = function(html){
    this.html = html;
    this._init();
};

CreatePopbox.prototype._init = function(){
    this.div = document.createElement('div');
    this.div.innerHTML = this.html;
    this.div.style.display = 'none';
    document.body.appendChild(this.div);

};

CreatePopbox.prototype.show = function(){
    this.div.style.display = 'block';
};

CreatePopbox.prototype.hide = function(){
    this.div.style.display = 'none';
};

//通过代理函数达到单例模式的效果

var proxysingleCreatePopbox = (function(){
    var instance;
    return function(html){
        if(!instance){
            instance = new CreatePopbox(html);
        }
        return instance;
    }
})();


//创建CreatePopbox:

var a = new proxysingleCreatePopbox(&quot;this is a&quot;);
var b = new proxysingleCreatePopbox(&quot;this is b&quot;);

console.log(a === b);  //true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> CreatePopbox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>)</span>{
    <span class="hljs-keyword">this</span>.html = html;
    <span class="hljs-keyword">this</span>._init();
};

CreatePopbox.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    <span class="hljs-keyword">this</span>.div.innerHTML = <span class="hljs-keyword">this</span>.html;
    <span class="hljs-keyword">this</span>.div.style.display = <span class="hljs-string">'none'</span>;
    <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-keyword">this</span>.div);

};

CreatePopbox.prototype.show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.div.style.display = <span class="hljs-string">'block'</span>;
};

CreatePopbox.prototype.hide = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.div.style.display = <span class="hljs-string">'none'</span>;
};

<span class="hljs-comment">//通过代理函数达到单例模式的效果</span>

<span class="hljs-keyword">var</span> proxysingleCreatePopbox = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> instance;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">html</span>)</span>{
        <span class="hljs-keyword">if</span>(!instance){
            instance = <span class="hljs-keyword">new</span> CreatePopbox(html);
        }
        <span class="hljs-keyword">return</span> instance;
    }
})();


<span class="hljs-comment">//创建CreatePopbox:</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> proxysingleCreatePopbox(<span class="hljs-string">"this is a"</span>);
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> proxysingleCreatePopbox(<span class="hljs-string">"this is b"</span>);

<span class="hljs-built_in">console</span>.log(a === b);  <span class="hljs-comment">//true</span>
</code></pre>
<p>可以看到，a和b都指向了同一个实例，执行<code>new proxysingleCreatePopbox("this is b")</code> 时，并不会重新生成一个新的<code>CreatePopbox</code>。<br>这符合了单例模式的核心：<code>确保实例只有一个</code>。</p>
<blockquote>
<p>通过以上例子，我们已经了解单例模式的实现方式，但还有一些缺陷：</p>
<p>创建对象和单例管理的逻辑都合在<code>proxysingleCreatePopbox</code>里边，当需要创建其他单例时，只能把<code>proxysingleCreatePopbox</code>拷贝一次。</p>
</blockquote>
<p>因此，我们需要把代码再改造一下，把不变的部分隔离出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//
var getSingle = function(fn){
  var singleObj;
  return function(obj){
    if(!singleObj){
      singleObj = new fn(obj);
    }
    return singleObj;
  }
}



var CreatePopbox = function(opation){
  this.html = opation.html;
  this._init();
};

CreatePopbox.prototype._init = function(){
  this.div = document.createElement('div');
  this.div.innerHTML = this.html;
  document.body.appendChild(this.div);
};

var singlePopbox = getSingle(CreatePopbox);

var a = new singlePopbox({html:&quot;this is a&quot;});

//创建一个新的单例

var CreateTipbox = function(opation){
  this.div = document.createElement('div');
  this.div.style.color = opation.color;
  this.div.innerHTML = opation.html;
  document.body.appendChild(this.div);
} 

//使用getSingle管理
var singleTipbox = getSingle(CreateTipbox);
var b = new singleTipbox({html:&quot;this is b&quot;,color:&quot;#f00&quot;});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//</span>
<span class="hljs-keyword">var</span> getSingle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>)</span>{
  <span class="hljs-keyword">var</span> singleObj;
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
    <span class="hljs-keyword">if</span>(!singleObj){
      singleObj = <span class="hljs-keyword">new</span> fn(obj);
    }
    <span class="hljs-keyword">return</span> singleObj;
  }
}



<span class="hljs-keyword">var</span> CreatePopbox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opation</span>)</span>{
  <span class="hljs-keyword">this</span>.html = opation.html;
  <span class="hljs-keyword">this</span>._init();
};

CreatePopbox.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">this</span>.div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
  <span class="hljs-keyword">this</span>.div.innerHTML = <span class="hljs-keyword">this</span>.html;
  <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-keyword">this</span>.div);
};

<span class="hljs-keyword">var</span> singlePopbox = getSingle(CreatePopbox);

<span class="hljs-keyword">var</span> a = <span class="hljs-keyword">new</span> singlePopbox({<span class="hljs-attr">html</span>:<span class="hljs-string">"this is a"</span>});

<span class="hljs-comment">//创建一个新的单例</span>

<span class="hljs-keyword">var</span> CreateTipbox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opation</span>)</span>{
  <span class="hljs-keyword">this</span>.div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
  <span class="hljs-keyword">this</span>.div.style.color = opation.color;
  <span class="hljs-keyword">this</span>.div.innerHTML = opation.html;
  <span class="hljs-built_in">document</span>.body.appendChild(<span class="hljs-keyword">this</span>.div);
} 

<span class="hljs-comment">//使用getSingle管理</span>
<span class="hljs-keyword">var</span> singleTipbox = getSingle(CreateTipbox);
<span class="hljs-keyword">var</span> b = <span class="hljs-keyword">new</span> singleTipbox({<span class="hljs-attr">html</span>:<span class="hljs-string">"this is b"</span>,<span class="hljs-attr">color</span>:<span class="hljs-string">"#f00"</span>});
</code></pre>
<hr>
<p>原文链接：<a href="http://www.zy0101.com/work/70" rel="nofollow noreferrer" target="_blank">javascript设计模式－－单例模式</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript设计模式－－单例模式

## 原文链接
[https://segmentfault.com/a/1190000010019122](https://segmentfault.com/a/1190000010019122)

