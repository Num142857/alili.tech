---
title: '工作手记之移动端中文输入法触发oninput事件的解决方法' 
date: 2019-01-31 2:31:16
hidden: true
slug: x64boz3hzie
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">事件背景</h3>
<blockquote>工作过程中涉及到了移动端输入内容长度的限定，这就要求需要对输入过程中内容的变化进行监控和判定，以决定是否可以继续输入，所以就想着是否可以在相关输入处监听oninput事件？但是在手机端，中文输入过程中，默认输入框里面会显示相关的英文字母，这个时候会触发oninput事件，但是这个时候输入并没有结束，所以导致判断时机不正确。经过在网上的查找，找到了compositionstart和compositionend两个事件进行一个开关判断。</blockquote>
<h3 id="articleHeader1">关于oninput事件</h3>
<p>oninput 是 HTML5 的标准事件，对于检测 textarea, input:text, input:password 和 input:search 这几个元素通过用户界面发生的内容变化非常有用，在内容修改后立即被触发，不像 onchange 事件需要失去焦点才触发。 oninput 事件兼容为ie9+, ie下可以onpropertychange事件，不是本节内容。</p>
<h3 id="articleHeader2">compositionstart</h3>
<p>当浏览器有非直接的文字输入时, compositionstart事件会以同步模式触发.</p>
<h3 id="articleHeader3">compositionend</h3>
<p>当浏览器是直接的文字输入时, compositionend会以同步模式触发.</p>
<p>看了两个事件就明白,开始中文输入时会触发compositionstart事件选词结束后会触发compositionend事件,忽略这两个事件之间的input事件即可，为元素添加这个两个事件，做一个开关，如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; id=&quot;sample&quot; />

var node = document.querySelector('#sample');
var inputLock = false;
node.addEventListener('compositionstart', function(){
    inputLock = true;
})
node.addEventListener('compositionend', function(){
    inputLock = false;
})
node.addEventListener('input', function(){
    if(!inputLock )
    // do something for input limit
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>&lt;<span class="hljs-built_in">input</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"sample"</span> /&gt;

var node = document.querySelector(<span class="hljs-string">'#sample'</span>);
var inputLock = <span class="hljs-literal">false</span>;
node.addEventListener(<span class="hljs-string">'compositionstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    inputLock = <span class="hljs-literal">true</span>;
})
node.addEventListener(<span class="hljs-string">'compositionend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    inputLock = <span class="hljs-literal">false</span>;
})
node.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">if</span>(!inputLock )
    // <span class="hljs-keyword">do</span> something <span class="hljs-keyword">for</span> <span class="hljs-built_in">input</span> limit
});
</code></pre>
<h3 id="articleHeader4">总结</h3>
<p>通过上面上面两个事件就可以解决移动端中文输入法触发input事件的问题了。</p>
<h3 id="articleHeader5">2016/11/23补充</h3>
<p>最近测试了下发现：</p>
<p>compositionend  在 input 事件之后才触发 so。。。</p>
<p>于是只能在compositionend 里 也加上处理代码</p>
<p>复制代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node.addEventListener('compositionstart', function(){
    cpLock = true;
})

node.addEventListener('compositionend', function(){
    cpLock = false;
     if(!cpLock)console.log(this.value);
})

node.addEventListener('input', function(){
    if(!cpLock)console.log(this.value);
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>node.addEventListener(<span class="hljs-string">'compositionstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    cpLock = <span class="hljs-literal">true</span>;
})

node.addEventListener(<span class="hljs-string">'compositionend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    cpLock = <span class="hljs-literal">false</span>;
     <span class="hljs-keyword">if</span>(!cpLock)<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
})

node.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(!cpLock)<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.value);
});
</code></pre>
<p>感觉还是好坑，不能算是完美的解决这个问题，暂时只能先这样处理填坑了，大家有好的方法麻烦留言告诉下:)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
工作手记之移动端中文输入法触发oninput事件的解决方法

## 原文链接
[https://segmentfault.com/a/1190000007514184](https://segmentfault.com/a/1190000007514184)

