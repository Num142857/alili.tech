---
title: 'JavaScript设计模式学习—单例模式' 
date: 2019-02-07 2:30:15
hidden: true
slug: aiukdiu5dvj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是单例模式</h2>
<p>简单点来说，单例模式就是确保某个类只有一个实例，并且最好只被创建过一次。对计算机来说，像打印机，线程池都是经典的单例模式。对于JavaScript所处的前端环境来说，像登录悬浮框，在整个页面中只会有一个，无论用户点击多少次，只会被创建一次。</p>
<h2 id="articleHeader1">单例模式实现实例—登录框</h2>
<p>单例模式非常好理解，无非是办公室有个打印机，大家一起公用，没必要再每个人单独买一个了。所以按照这样的理解，先写出前端创建悬浮登录框的前端代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createLoginDialog = function(){
    var div = document.createElement('div');
    div.innerHTML='登录悬浮框';
    var closeBtn = document.createElement('button');
    closeBtn.innerHTML = 'X';
    div.appendChild(closeBtn);
    closeBtn.onclick = function(){
        div.style.display='none';
    }
    document.body.appendChild(div);
    return div;
}
document.getElementById('loginBtn').onclick = function(){
    var loginDiv = createLoginDialog();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> createLoginDialog = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    div.innerHTML=<span class="hljs-string">'登录悬浮框'</span>;
    <span class="hljs-keyword">var</span> closeBtn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
    closeBtn.innerHTML = <span class="hljs-string">'X'</span>;
    div.appendChild(closeBtn);
    closeBtn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        div.style.display=<span class="hljs-string">'none'</span>;
    }
    <span class="hljs-built_in">document</span>.body.appendChild(div);
    <span class="hljs-keyword">return</span> div;
}
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'loginBtn'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> loginDiv = createLoginDialog();
}</code></pre>
<p>这应该是我们平时写出的“一般”实现单例代码，看起来单例是实现了。但有很大问题，就是每次创建都会新生成一个div，性能损耗不谈，本身也不是真正实现了单例模式。<br>单例模式的关键实现一是要在需要创建的时候才开始创建，即惰性创建，第二就是只被创建一次，再次使用的时候，不需要重复创建。在其他语言实现中，需要借助静态方法或者其他手段来使代码驻留内存，达到这一目的。JavaScript却不提供，但内存驻留却使我们想到了闭包。<br>所以再次修改代码，创建一个闭包来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createLoginDialog = (function(){
        var div;
        return function(){
            if(!div){
                    div = document.createElement('div');
                    div.innerHTML='登录悬浮框';
                    var closeBtn = document.createElement('button');
                    closeBtn.innerHTML = 'X';
                    div.appendChild(closeBtn);
                    closeBtn.onclick = function(){
                        div.style.display='none';
            }
                    document.body.appendChild(div);
            }else{
                        div.style.display='block';
            }
            return div;
        }
})();
document.getElementById('loginBtn').onclick = function(){
        var loginDiv = createLoginDialog();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> createLoginDialog = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> div;
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">if</span>(!div){
                    div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
                    div.innerHTML=<span class="hljs-string">'登录悬浮框'</span>;
                    <span class="hljs-keyword">var</span> closeBtn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
                    closeBtn.innerHTML = <span class="hljs-string">'X'</span>;
                    div.appendChild(closeBtn);
                    closeBtn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                        div.style.display=<span class="hljs-string">'none'</span>;
            }
                    <span class="hljs-built_in">document</span>.body.appendChild(div);
            }<span class="hljs-keyword">else</span>{
                        div.style.display=<span class="hljs-string">'block'</span>;
            }
            <span class="hljs-keyword">return</span> div;
        }
})();
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'loginBtn'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> loginDiv = createLoginDialog();
}</code></pre>
<h2 id="articleHeader2">抽象出JavaScript单例模式表达</h2>
<p>实际上，对于js单例模式最核心的逻辑就是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj;
if(!obj){
    obj = XXX;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> obj;
<span class="hljs-keyword">if</span>(!obj){
    obj = XXX;
}</code></pre>
<p>而对于以上最后写出的创建代码，也不尽完美，因为它违反了设计模式中的单一职原则。即创建对象和管理单例的逻辑都放在一个类的内部。<br>据此，我们可以剥离出创建单例模式的方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getSingleton = function(fn){
            var result;
            return function(){
                return result || (result = fn.apply(this,arguments));
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> getSingleton = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>)</span>{
            <span class="hljs-keyword">var</span> result;
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">return</span> result || (result = fn.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>));
            }
        }</code></pre>
<p>最终在这个方法下实现代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var createLoginDialog = function(){
            var div = document.createElement('div');
            div.innerHTML='登录悬浮框';
            var closeBtn = document.createElement('button');
            closeBtn.innerHTML = 'X';
            div.appendChild(closeBtn);
            closeBtn.onclick = function(){
                div.style.display='none';
            }
            document.body.appendChild(div);
            return div;
        }
var getSingleton = function(fn){
            var result;
            return function(){
                return result || (result = fn.apply(this,arguments));
            }
        }
var createSingletonLogin = getSingleton(createLoginDialog);
document.getElementById('loginBtn').onclick = function(){
            var loginDiv = createSingletonLogin();
            loginDiv.style.display = 'block';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> createLoginDialog = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
            div.innerHTML=<span class="hljs-string">'登录悬浮框'</span>;
            <span class="hljs-keyword">var</span> closeBtn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);
            closeBtn.innerHTML = <span class="hljs-string">'X'</span>;
            div.appendChild(closeBtn);
            closeBtn.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                div.style.display=<span class="hljs-string">'none'</span>;
            }
            <span class="hljs-built_in">document</span>.body.appendChild(div);
            <span class="hljs-keyword">return</span> div;
        }
<span class="hljs-keyword">var</span> getSingleton = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn</span>)</span>{
            <span class="hljs-keyword">var</span> result;
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                <span class="hljs-keyword">return</span> result || (result = fn.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>));
            }
        }
<span class="hljs-keyword">var</span> createSingletonLogin = getSingleton(createLoginDialog);
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'loginBtn'</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            <span class="hljs-keyword">var</span> loginDiv = createSingletonLogin();
            loginDiv.style.display = <span class="hljs-string">'block'</span>;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript设计模式学习—单例模式

## 原文链接
[https://segmentfault.com/a/1190000005921654](https://segmentfault.com/a/1190000005921654)

