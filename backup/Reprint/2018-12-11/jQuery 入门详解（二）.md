---
title: 'jQuery 入门详解（二）' 
date: 2018-12-11 2:30:10
hidden: true
slug: udayssbj67
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">7. jQuery 里的事件机制</h2>
<blockquote>
<code>javascript</code>和<code>HTML</code>之间的交互是通过用户和浏览器操作页面时引发的事件来处理的。<code>jQuery</code>不仅提供了更加优雅的事件处理语法，而且极大地增强了事件处理能力。</blockquote>
<h3 id="articleHeader1">7.1 加载 DOM</h3>
<blockquote>前面章节我们已经对比了<code>window.onload()</code>和<code>$(document).ready()</code>两种方法的区别。两种都是入口函数，只不过前者是<code>js</code>中的而后者是<code>jQ</code>中的。并且领着之间还是有区别的：</blockquote>
<p><strong>1、执行时机：</strong></p>
<p><code>window.onload()</code>方法是等到页面中所有元素加载完毕之后，才执行，即<code>javascript</code>此时才可以访问网页中的任何元素。而<code>jQuery</code>使用<code>$(document).ready()</code>方法，可以在<code>DOM</code>载入就绪时就对其进行操纵并调用执行它所绑定的函数。也就是说在<code>jQ</code>中，不需要等待所有图片加载完再执行。</p>
<p>但是就会有个问题，当获取图片宽高的时候，可能获取不到。不过<code>jQ</code>中单独提出了一个页面加载的方法——<code>load()</code>方法，如果这个处理函数绑定给<code>window</code>对象则会在所有内容加载完毕之后触发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).load(function(){
   // 执行代码 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">window</span>).load(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-comment">// 执行代码 </span>
});</code></pre>
<p>上面的代码，等同于<code>js</code>中的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
    // 执行代码
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 执行代码</span>
}</code></pre>
<p><strong>2、多次使用：</strong></p>
<p>在<code>javascript</code>中入口函数只能写一次，如果写多个，下面会将上面的覆盖掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function(){
    alert(123);
}

window.onload = function(){
    alert(456);             // 页面只会弹出 456
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-number">123</span>);
}

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    alert(<span class="hljs-number">456</span>);             <span class="hljs-comment">// 页面只会弹出 456</span>
} </code></pre>
<p>在<code>jQuery</code>中，入口函数可以写多次，不会出现覆盖的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){
   alert(123);          // 123               
});

$(document).ready(function(){
   alert(456);          // 456              
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">123</span>);          <span class="hljs-comment">// 123               </span>
});

$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">456</span>);          <span class="hljs-comment">// 456              </span>
});</code></pre>
<p><strong>3、简写方式：</strong><br><code>javascript</code>中没有简写方式，但是在<code>jQ</code>中有简写方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1-原始版写法
$(document).ready(function(){
   // 执行代码 
});

// 2-简化写法，document可以省略
$().ready(function(){
   // 执行代码 
});

// 3-简化写法
$(function(){
    // 执行代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1-原始版写法</span>
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-comment">// 执行代码 </span>
});

<span class="hljs-comment">// 2-简化写法，document可以省略</span>
$().ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-comment">// 执行代码 </span>
});

<span class="hljs-comment">// 3-简化写法</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 执行代码</span>
});</code></pre>
<h3 id="articleHeader2">7.2 事件绑定</h3>
<p><strong>1、什么是事件绑定</strong></p>
<blockquote>在文档装载完成之后，如果打算为元素绑定事件来完成某些操作，则可以使用<code>bind()</code>方法，<code>bind()</code>方法的调用格式为：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bind(type [, data] ,fn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">bind(type [, data] ,fn);</code></pre>
<p><code>bind()</code>方法有三个参数：</p>
<ul>
<li>
<code>type</code>：事件类型，类型包括：<code>blur</code>,<code>focus</code>,<code>load</code>,<code>resize</code>,<code>scroll</code>,<code>unload</code>,<code>click</code>,<code>dbclick</code>,<code>mousedown</code>,<code>mouseup</code>,<code>mousemove</code>,<code>mouseover</code>,<code>mouseout</code>,<code>mouseenter</code>,<code>mouseleave</code>,<code>change</code>,<code>select</code>,<code>submit</code>,<code>keydown</code>,<code>keypress</code>,<code>keyup</code>,<code>error</code>等。</li>
<li>
<code>[,data]</code>：可选参数，作为event.data属性值传递给事件对象的额外数据对象。</li>
<li>
<code>fn</code>：用来绑定的处理函数。</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 38-jq事件机制-事件绑定.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<h2>什么是相对论？</h2>
<div class=&quot;hide&quot;>
    <p>相对论是关于时空和引力的基本理论，主要由阿尔伯特·爱因斯坦创立，依据研究的对象不同分为狭义相对论和广义相对论。相对论的基本假设是相对性原理，即物理定律与参照系的选择无关。</p>
    <p>狭义相对论和广义相对的区别是，前者讨论的是匀速直线运动的参照系（惯性参照系）之间的物理定律，后者则推广到具有加速度的参照系中（非惯性系），并在等效原理的假设下，广泛应用于引力场中。相对论极大地改变了人类对宇宙和自然的“常识性”观念，提出了“同时的相对性”、“四维时空”、“弯曲时空”等全新的概念。它发展了牛顿力学，推动物理学发展到一个新的高度。</p>
    <p>狭义相对性原理是相对论的两个基本假定，在目前实验的观测下，物体的运动与相对论是吻合很好的，所以目前普遍认为相对论是正确的理论。</p>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 绑定点击事件
        $('h2').bind('click', function() {
            // 选择器$(this).next() 多次出现，可以用一个变量接收 储存起来
            var $content = $(this).next();
            // is 方法 可以对元素的状态进行判断
            if ($content.is(&quot;:visible&quot;)) {
                $content.hide();
            } else {
                $content.show();
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>什么是相对论？<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"hide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>相对论是关于时空和引力的基本理论，主要由阿尔伯特·爱因斯坦创立，依据研究的对象不同分为狭义相对论和广义相对论。相对论的基本假设是相对性原理，即物理定律与参照系的选择无关。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>狭义相对论和广义相对的区别是，前者讨论的是匀速直线运动的参照系（惯性参照系）之间的物理定律，后者则推广到具有加速度的参照系中（非惯性系），并在等效原理的假设下，广泛应用于引力场中。相对论极大地改变了人类对宇宙和自然的“常识性”观念，提出了“同时的相对性”、“四维时空”、“弯曲时空”等全新的概念。它发展了牛顿力学，推动物理学发展到一个新的高度。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>狭义相对性原理是相对论的两个基本假定，在目前实验的观测下，物体的运动与相对论是吻合很好的，所以目前普遍认为相对论是正确的理论。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 绑定点击事件</span>
        $(<span class="hljs-string">'h2'</span>).bind(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 选择器$(this).next() 多次出现，可以用一个变量接收 储存起来</span>
            <span class="hljs-keyword">var</span> $content = $(<span class="hljs-keyword">this</span>).next();
            <span class="hljs-comment">// is 方法 可以对元素的状态进行判断</span>
            <span class="hljs-keyword">if</span> ($content.is(<span class="hljs-string">":visible"</span>)) {
                $content.hide();
            } <span class="hljs-keyword">else</span> {
                $content.show();
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677256?w=430&amp;h=324" src="https://static.alili.tech/img/remote/1460000013677256?w=430&amp;h=324" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>is()</code>方法，可以用来判断一个元素是否包含某一属性。</li>
<li>当一个选择器多次出现的时候，可以用一个变量将它缓存起来。</li>
</ul>
<p><strong>2、简写绑定事件</strong></p>
<blockquote>
<code>jQuery</code>提供了一套简写的方法，简写的方法和<code>bind()</code>的使用方法类似，实现效果也相同，但是可以减少代码量：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
    $('h2').click(function(){
       // 执行代码 
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">'h2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       <span class="hljs-comment">// 执行代码 </span>
    });
});</code></pre>
<h3 id="articleHeader3">7.3 合成事件</h3>
<blockquote>
<code>jQuery</code> 有两个合成事件：<code>hover()</code>方法和<code>toggle()</code>方法(这里的<code>toggle</code>跟另一个方法<code>toggle</code>不是一个方法，这里的<code>toggle</code>方法因为重名的原因，已经在<code>jQ1.8</code>版本以后弃用了)。</blockquote>
<p><strong>1、hover()方法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="hover(enter,leaver); // enter 和 leaver 是两个函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">hover(enter,leaver); <span class="hljs-comment">// enter 和 leaver 是两个函数</span></code></pre>
<p><em><code>hover()</code>方法用于模拟光标悬停事件。当光标移动到元素上的时候会触发第一个函数(<code>enter</code>)，当光标离开元素的时候会触发第二个函数(<code>leaver</code>)。</em></p>
<p><strong>示例代码：</strong> <em>[ 39-jq事件机制-合成事件hover.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    // hover 方法
    $('h2').hover(enter, leaver);
    var $content = $('h2').next();

    // 鼠标进入的时候触发的函数
    function enter() {
        $content.show();
    }

    // 鼠标离开时触发的函数
    function leaver() {
        $content.hide();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// hover 方法</span>
    $(<span class="hljs-string">'h2'</span>).hover(enter, leaver);
    <span class="hljs-keyword">var</span> $content = $(<span class="hljs-string">'h2'</span>).next();

    <span class="hljs-comment">// 鼠标进入的时候触发的函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enter</span>(<span class="hljs-params"></span>) </span>{
        $content.show();
    }

    <span class="hljs-comment">// 鼠标离开时触发的函数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">leaver</span>(<span class="hljs-params"></span>) </span>{
        $content.hide();
    }
});</code></pre>
<p><strong>2、toggle()方法：此方法自1.8版本以后，已弃用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="toggle(fn1,fn2,...fnN);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">toggle(fn1,fn2,...fnN);</code></pre>
<p><em><code>toggle()</code>方法，模拟的是鼠标单击事件，当点击第一次的时候，触发对应的第一个函数(<code>fn1</code>)，当点击第二次的时候，触发对应的第二个函数(<code>fn2</code>)，一直到最后一个函数的时候，再点击就会循环到第一个函数，就这样一直循环切换。</em></p>
<p><em>另外一个 <code>toggle()</code> 方法，是切换元素的可见状态，如果元素是可见的，事件触发之后，就会切换成不可见。</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('h2').click(function(){
    $(this).next().toggle(); // 如果元素一开始是隐藏的，点击之后就会切换成显示。
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'h2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).next().toggle(); <span class="hljs-comment">// 如果元素一开始是隐藏的，点击之后就会切换成显示。</span>
});</code></pre>
<h3 id="articleHeader4">7.4 事件冒泡</h3>
<blockquote>在前面<code>特效篇</code>里面，我们已经介绍了什么是<a href="https://segmentfault.com/a/1190000012623554#articleHeader18">事件冒泡</a>，这里不再累赘，简单来说，就是一个元素包含另一个元素，两个元素同时绑定了点击事件，当我点击里面元素的时候，会同时触发两个事件函数，这就是事件冒泡。</blockquote>
<p><em>具体产生的原理，和解决办法请点击<a href="https://segmentfault.com/a/1190000012623554#articleHeader18" target="_blank">这个链接</a>，这里会有处理兼容性的详细步骤。</em></p>
<p><strong>示例代码：</strong> <em>[ 40-jq事件机制-事件冒泡.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div class=&quot;box&quot;>
    <p>提示信息</p>
    <div class=&quot;box1&quot;>
        <p>提示信息</p>
        <div class=&quot;box2&quot;>
            <p>提示信息</p>
        </div>
    </div>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        $('.box').click(function() {
            $(this).children('p').text(&quot;.box被触发了&quot;);
        });
        $('.box1').click(function() {
            $(this).children('p').text(&quot;.box1被触发了&quot;);
        });
        $('.box2').click(function() {
            $(this).children('p').text(&quot;.box2被触发了&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>提示信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>提示信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box2"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>提示信息<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'.box'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box被触发了"</span>);
        });
        $(<span class="hljs-string">'.box1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box1被触发了"</span>);
        });
        $(<span class="hljs-string">'.box2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box2被触发了"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677257?w=316&amp;h=310" src="https://static.alili.tech/img/remote/1460000013677257?w=316&amp;h=310" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到，明明点击的是最里面的盒子，但是三个点击事件都同时触发了。</em></p>
<p><strong>1、事件对象：</strong></p>
<blockquote>由于在<code>IE-DOM</code>和标准<code>DOM</code>实现事件对象的方法各不相同，所以需要处理兼容性。在<code>jQuery</code>中，已经将我们封装好了。 直接在触发事件函数里面传一个参数：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('element').bind('click',function(event){
    // 执行代码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'element'</span>).bind(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-comment">// 执行代码</span>
});</code></pre>
<p><strong>2、阻止事件冒泡：</strong></p>
<blockquote>阻止事件的方法存也在兼容性，同样的<code>jQ</code>中已经封装好，直接使用<code>stopPropagation()</code>方法来阻止事件冒泡。</blockquote>
<p><strong>示例代码：</strong> <em>[ 41-jq事件机制-阻止事件冒泡.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function() {
    $('.box').click(function(e) {                   // 事件对象
        $(this).children('p').text(&quot;.box被触发了&quot;);
        e.stopPropagation();                        // 阻止事件冒泡
    });
    $('.box1').click(function(e) {
        $(this).children('p').text(&quot;.box1被触发了&quot;);
        e.stopPropagation();

    });
    $('.box2').click(function(e) {
        $(this).children('p').text(&quot;.box2被触发了&quot;);
        e.stopPropagation();
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'.box'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{                   <span class="hljs-comment">// 事件对象</span>
        $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box被触发了"</span>);
        e.stopPropagation();                        <span class="hljs-comment">// 阻止事件冒泡</span>
    });
    $(<span class="hljs-string">'.box1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box1被触发了"</span>);
        e.stopPropagation();

    });
    $(<span class="hljs-string">'.box2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'p'</span>).text(<span class="hljs-string">".box2被触发了"</span>);
        e.stopPropagation();
    });
});</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677258?w=316&amp;h=310" src="https://static.alili.tech/img/remote/1460000013677258?w=316&amp;h=310" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、阻止默认行为：</strong></p>
<blockquote>网页中有很多元素都有默认行为，例如，单击超链接后会跳转、单击提交按钮后表单会提交，有时候我们需要阻止元素的默认行为。</blockquote>
<p><em>在<code>jQ</code>中提供了一个方法来阻止元素的默认行为：<code>preventDefault</code></em></p>
<p><strong>不加阻止默认行为时的效果：</strong> </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677259?w=748&amp;h=155" src="https://static.alili.tech/img/remote/1460000013677259?w=748&amp;h=155" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>示例代码：</strong> <em>[ 42-jq事件机制-阻止默认行为.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<form action=&quot;test.html&quot;>
    <label for=&quot;username&quot;>用户名</label><input type=&quot;text&quot; id=&quot;username&quot; placeholder=&quot;请输入用户名&quot;>
    <br>
    <input type=&quot;submit&quot; value=&quot;提交&quot; id=&quot;sub&quot;>
</form>
<div id=&quot;msg&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        $('#sub').click(function(e) {           // 事件对象
            var $username = $('#username').val();
            if ($username == &quot;&quot;) {
                $('#msg').html('<p>文本框的值不能为空</p>');
                e.preventDefault();         // 阻止默认行为
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">"test.html"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"username"</span>&gt;</span>用户名<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"username"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"请输入用户名"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"提交"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sub"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"msg"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#sub'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{           <span class="hljs-comment">// 事件对象</span>
            <span class="hljs-keyword">var</span> $username = $(<span class="hljs-string">'#username'</span>).val();
            <span class="hljs-keyword">if</span> ($username == <span class="hljs-string">""</span>) {
                $(<span class="hljs-string">'#msg'</span>).html(<span class="hljs-string">'&lt;p&gt;文本框的值不能为空&lt;/p&gt;'</span>);
                e.preventDefault();         <span class="hljs-comment">// 阻止默认行为</span>
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677260?w=748&amp;h=155" src="https://static.alili.tech/img/remote/1460000013677260?w=748&amp;h=155" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、return false：</strong></p>
<blockquote>如果想要同时对事件停止冒泡和阻止默认行为，可以有一种默认的简写方式：<code>return false</code>。</blockquote>
<p><strong>5、事件捕获：</strong></p>
<blockquote>在<code>jQ</code>中不支持事件捕获，如果想要事件捕获的话，请参考原生的<code>js</code>。</blockquote>
<h3 id="articleHeader5">7.5 事件对象的属性</h3>
<p><strong>1、event.type：</strong></p>
<blockquote>该方法可以获取到事件的类型。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;a&quot;).click(function(event){
    console.log(event.type);    // 打印a标签点击之后的事件类型  打印 ==> click
    return false;           // 阻止a标签默认跳转事件
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">"a"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-built_in">console</span>.log(event.type);    <span class="hljs-comment">// 打印a标签点击之后的事件类型  打印 ==&gt; click</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;           <span class="hljs-comment">// 阻止a标签默认跳转事件</span>
});</code></pre>
<p><strong>2、event.stopPropagation()方法：</strong></p>
<blockquote>上面已经提过了，该方法是阻止事件冒泡。</blockquote>
<p><strong>3、event.preventDefault()方法：</strong></p>
<blockquote>上面已经提过了，该方法是阻止事件默认行为。</blockquote>
<p><strong>4、event.target：</strong></p>
<blockquote>该方法的作用是获取到触发事件的元素。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;a&quot;).click(function(event){
    console.log(event.target);    // 打印 ==> a
    return false;                 // 阻止a标签默认跳转事件
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">"a"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-built_in">console</span>.log(event.target);    <span class="hljs-comment">// 打印 ==&gt; a</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;                 <span class="hljs-comment">// 阻止a标签默认跳转事件</span>
});</code></pre>
<p><strong>5、event.pageX 和 event.pageY：</strong></p>
<blockquote>该方法的作用，是分别获取到光标相对于页面的<code>x</code>坐标和<code>y</code>坐标，如果页面上有滚动条的话，还要加上滚动条的宽度和高度。</blockquote>
<p><strong>6、event.which</strong></p>
<blockquote>该方法的作用是在鼠标单击事件中获取到鼠标的左、中、右键；在键盘事件中获取键盘的按键。</blockquote>
<p>比如获取鼠标的按键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;a&quot;).mousedown(function(event){
    console.log(event.which);     // 鼠标左键==> 1 鼠标中键==> 2 鼠标右键==> 3 
    return false;                 // 阻止a标签默认跳转事件
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">"a"</span>).mousedown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-built_in">console</span>.log(event.which);     <span class="hljs-comment">// 鼠标左键==&gt; 1 鼠标中键==&gt; 2 鼠标右键==&gt; 3 </span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;                 <span class="hljs-comment">// 阻止a标签默认跳转事件</span>
});</code></pre>
<p>比如获取键盘的按键：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;input[text]&quot;).keyup(function(event){
    console.log(event.which);     // 对应按下的键盘码
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">"input[text]"</span>).keyup(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-built_in">console</span>.log(event.which);     <span class="hljs-comment">// 对应按下的键盘码</span>
});</code></pre>
<p><strong>7、event.metaKey：</strong></p>
<blockquote>该方法是针对不同浏览器，获取到<code>&lt;ctrl&gt;</code>按键。</blockquote>
<h3 id="articleHeader6">7.6 移除事件</h3>
<blockquote>当我们想要移除一个事件的时候，可以使用<code>unbind()</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="unbind([type].[data]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">unbind([type].[data]);</code></pre>
<p>第一个参数是事件类型，第二个参数是将要移除的函数：</p>
<ul>
<li>如果没有参数，直接删除所有的绑定的事件；</li>
<li>如果提供了事件类型作为参数，那只删除该类型的绑定事件；</li>
<li>如果把在绑定时传递的处理函数作为第二个参数，则只有这个特定的事件处理函数会被删除。</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 43-jq事件机制-移除事件.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn1&quot;>点击弹出alert</button>
<br>
<button id=&quot;btn2&quot;>点击移除上一个btn点击事件</button>

<!-- js 部分 -->
<script>
    $(function() {
        // 点击第一个按钮 弹出信息
        $('#btn1').click(function() {
            alert('我是btn1');
        });
        // 点击第二个按钮移除第一个按钮的点击事件
        $('#btn2').click(function() {
            $('#btn1').unbind('click');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn1"</span>&gt;</span>点击弹出alert<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn2"</span>&gt;</span>点击移除上一个btn点击事件<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击第一个按钮 弹出信息</span>
        $(<span class="hljs-string">'#btn1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            alert(<span class="hljs-string">'我是btn1'</span>);
        });
        <span class="hljs-comment">// 点击第二个按钮移除第一个按钮的点击事件</span>
        $(<span class="hljs-string">'#btn2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'#btn1'</span>).unbind(<span class="hljs-string">'click'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677261?w=1140&amp;h=96" src="https://static.alili.tech/img/remote/1460000013677261?w=1140&amp;h=96" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">7.7 模拟操作</h3>
<blockquote>什么是模拟操作呢？我们可以看到前面的单击事件，都需要手动去触发，模拟操作就是可以自动触发<code>click</code>，而不需要用户主动点击。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<button id=&quot;btn&quot;>点击弹出信息</button>

<!-- js 部分 -->
<script>
    $(function() {
        $('#btn').click(function() {
            alert(&quot;呵呵&quot;);
        });
        // $('#btn').click();
        $('#btn').trigger('click');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>点击弹出信息<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            alert(<span class="hljs-string">"呵呵"</span>);
        });
        <span class="hljs-comment">// $('#btn').click();</span>
        $(<span class="hljs-string">'#btn'</span>).trigger(<span class="hljs-string">'click'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><em>一进入页面就会自动弹出“呵呵”，其中 <code>$('#btn').click();</code>，也可以达到同样的效果。</em></p>
<p><strong>trigger()方法触发事件后，会执行浏览器默认操作：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('input').trigger('focus');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'input'</span>).trigger(<span class="hljs-string">'focus'</span>);</code></pre>
<p>上面的代码不仅会触发元素绑定的<code>focus</code>事件，也会使<code>input</code>元素本身得到焦点(这就是浏览器的默认操作)。</p>
<p><strong>triggerHandler()方法：</strong></p>
<blockquote>如果你只想触发绑定的<code>focus</code>事件，而不想执行浏览器默认操作，可以使用t<code>riggerHandler()</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('input').triggerHandler('focus');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'input'</span>).triggerHandler(<span class="hljs-string">'focus'</span>);</code></pre>
<h3 id="articleHeader8">7.8 事件委托</h3>
<blockquote>事件委托，首先按字面的意思就能看出来，是将事件交由别人来执行，再联想到事件冒泡，是不是想到了？对，就是将子元素的事件通过冒泡的形式交由父元素来执行。</blockquote>
<p><strong>举个例子：</strong></p>
<p>假如想要给多个<code>li</code>都注册点击事件，只需要给<code>li</code>循环遍历，再添加点击事件，这种方法固然简单，但是假如有<code>100</code>个、<code>1000</code>个<code>li</code>的时候，这里的<code>DOM</code>操无形之中就繁琐了。并且当我们动态添加<code>li</code>元素的时候，这些<code>li</code>是没有点击事件的。但是这些只要讲点击事件交给父元素来执行，就能实现了。</p>
<p><strong>1、on + 注册事件：</strong></p>
<blockquote>除了<code>bind</code>方法绑定事件之外，在<code>jQuery1.7</code>版本之后，新添了一种方法：<code>on()</code>方法用来绑定事件，<code>off()</code>方法用来解除绑定事件。<code>on()</code>方法既可以注册事件，还可以注册委托事件。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(element).on(type,[selector],fn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(element).on(type,[selector],fn);</code></pre>
<p><strong>参数详解：</strong></p>
<ul>
<li>
<code>type</code>：字符串，事件类型，如：<code>click</code>、<code>mouseover</code>...；</li>
<li>
<code>selector</code>：可选，字符串，用于过滤出被选中的元素中能触发事件的后代元素。如果选择器是 <code>null</code> 或者忽略了该选择器，那么被选中的元素总是能触发事件；</li>
<li>
<code>fn</code>：事件被触发执行的函数。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div>
  <p>111111</p>
  <p>111111</p>
  <p>111111</p>
  <p>111111</p>
  <i>123456</i>
</div>

<!-- js 部分 -->
<script>
$(function () {
    // 这个是p自己注册的事件（简单事件）
    $(&quot;p&quot;).on(&quot;click&quot;, function() {
        alert(&quot;p的点击事件&quot;);
    });
    
    //给div自己执行的
    $(&quot;div&quot;).on(&quot;click&quot;, function() {
        alert(&quot;div的点击事件&quot;);
    });

    //给div里面的p执行 委托事件
    $(&quot;div&quot;).on(&quot;click&quot;, &quot;p&quot;, function() {
        alert(&quot;div里面的p的点击事件&quot;);
    });
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>111111<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>123456<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 这个是p自己注册的事件（简单事件）</span>
    $(<span class="hljs-string">"p"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">"p的点击事件"</span>);
    });
    
    <span class="hljs-comment">//给div自己执行的</span>
    $(<span class="hljs-string">"div"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">"div的点击事件"</span>);
    });

    <span class="hljs-comment">//给div里面的p执行 委托事件</span>
    $(<span class="hljs-string">"div"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-string">"p"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        alert(<span class="hljs-string">"div里面的p的点击事件"</span>);
    });
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677262?w=490&amp;h=187" src="https://static.alili.tech/img/remote/1460000013677262?w=490&amp;h=187" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>第二个参数其实就相当于一个过滤器的作用，给<code>div</code>里面的<code>p</code>注册委托事件。在执行顺序上，会先执行元素自己的事件，再去执行绑定的事件，最后执行父元素的事件。</em></p>
<p><em>当第二个参数传进去的时候，就想当于给过滤的元素注册<code>委托事件</code>。</em></p>
<p><strong>2、delegate 注册委托事件：</strong></p>
<blockquote>
<code>delegate</code>只能注册委托事件。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(fatheElement).delegate(selector,type,fn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(fatheElement).delegate(selector,type,fn);</code></pre>
<p><strong>参数详解：</strong></p>
<ul>
<li>
<code>fatheElement</code>：父元素；</li>
<li>
<code>selector</code>：可选，字符串，用于过滤出被选中的元素中能触发事件的后代元素。如果选择器是 <code>null</code> 或者忽略了该选择器，那么被选中的元素总是能触发事件；</li>
<li>
<code>type</code>：事件类型；</li>
<li>
<code>fn</code>：事件被触发执行的函数。</li>
</ul>
<h3 id="articleHeader9">7.9 其他用法</h3>
<p><strong>1、绑定多个事件类型：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('div').bind('mouseover mouseout',function(){
   $(this).toggleClass(&quot;over&quot;);  // 当鼠标进入的时候，该元素的class属性切换为over 鼠标离开时class切换为先前的值
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'mouseover mouseout'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   $(<span class="hljs-keyword">this</span>).toggleClass(<span class="hljs-string">"over"</span>);  <span class="hljs-comment">// 当鼠标进入的时候，该元素的class属性切换为over 鼠标离开时class切换为先前的值</span>
});</code></pre>
<p><strong>2、添加事件的命名空间：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('div').bind('click.plugin',function(){
   alert(123); 
});

$('div').bind('mouseover.plugin',function(){
   alert(456); 
});

$('div').bind('dbclick',function(){
   alert(666); 
});

$('button').click(function(){
    $('div').unbind('.plugin'); 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'click.plugin'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">123</span>); 
});

$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'mouseover.plugin'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">456</span>); 
});

$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'dbclick'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">666</span>); 
});

$(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">'div'</span>).unbind(<span class="hljs-string">'.plugin'</span>); 
});</code></pre>
<p><em>其中<code>.plugin</code>就是命名空间，当点击<code>button</code>按钮的时候，就删除了事件的命名空间<code>.plugin</code>，此时对应的事件也会被移除。</em></p>
<p>相同的事件，不同的命名空间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('div').bind('click.plugin',function(){
   alert(456); 
});

$('div').bind('click',function(){
   alert(666); 
});

$('button').click(function(){
    $('div').trigger('click!');  // 注意后面的感叹号
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'click.plugin'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">456</span>); 
});

$(<span class="hljs-string">'div'</span>).bind(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   alert(<span class="hljs-number">666</span>); 
});

$(<span class="hljs-string">'button'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-string">'div'</span>).trigger(<span class="hljs-string">'click!'</span>);  <span class="hljs-comment">// 注意后面的感叹号</span>
});</code></pre>
<p><em>当点击<code>div</code>的时候，会同时触发<code>click.plugin</code>和<code>click</code>事件，如果点击<code>button</code>只会触发<code>click</code>事件，而不会触发<code>click.plugin</code>事件。<code>trigger('click!')</code>，后面感叹号表示的是匹配所有不在命名空间中的<code>click</code>方法。</em></p>
<h2 id="articleHeader10">8. jQuery 动画</h2>
<blockquote>相对于原生<code>js</code>，<code>jQuery</code>中的动画更加的方便，更加的强大。</blockquote>
<h3 id="articleHeader11">8.1 show()方法 和 hide()方法</h3>
<blockquote>当一个元素调用<code>show()</code>方法的时候，会将该元素的<code>display</code>设置为<code>block</code>，当调用<code>hide()</code>方法的时候，会将该元素的<code>display</code>设置为<code>none</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('h2').bind('mouseover',function(){
    $(this).next().show();  // 鼠标进入的时候 h2 下一个兄弟元素显示
}).bind('mouseout',function(){
    $(this).next().hide();  // 鼠标离开的时候 h2 下一个兄弟元素隐藏
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'h2'</span>).bind(<span class="hljs-string">'mouseover'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).next().show();  <span class="hljs-comment">// 鼠标进入的时候 h2 下一个兄弟元素显示</span>
}).bind(<span class="hljs-string">'mouseout'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $(<span class="hljs-keyword">this</span>).next().hide();  <span class="hljs-comment">// 鼠标离开的时候 h2 下一个兄弟元素隐藏</span>
})</code></pre>
<p><em>此时还没有动画的效果，下面给他们加上动画效果</em></p>
<p>下面的代码表示的是，元素在<code>600ms</code>内显示出来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('element').show(600);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'element'</span>).show(<span class="hljs-number">600</span>);</code></pre>
<p>下面的代码表示的是，元素在<code>300ms</code>内隐藏起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('element').hide(300);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'element'</span>).hide(<span class="hljs-number">300</span>);</code></pre>
<p><strong>示例代码：</strong> <em>[ 45-jq动画-show&amp;hide.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
    }
    h4 {
        width: 300px;
        height: 30px;
        background: sandybrown;
        line-height: 30px;
        text-align: center;
    }
    div {
        width: 260px;
        height: 160;
        background: antiquewhite;
        padding: 20px;
        display: none;
    }
</style>

<!-- html 部分 -->
<h4>鼠标经过&amp;离开</h4>
<div>
    <p>相对论是关于时空和引力的基本理论，主要由阿尔伯特·爱因斯坦创立，依据研究的对象不同分为狭义相对论和广义相对论。相对论的基本假设是相对性原理，即物理定律与参照系的选择无关。</p>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        $('h4').bind('mouseover', function() {
            $(this).next().show(600);
        }).bind('mouseout', function() {
            $(this).next().hide(300);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    }
    <span class="hljs-selector-tag">h4</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">background</span>: sandybrown;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-align</span>: center;
    }
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">160</span>;
        <span class="hljs-attribute">background</span>: antiquewhite;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">display</span>: none;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>鼠标经过&amp;离开<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>相对论是关于时空和引力的基本理论，主要由阿尔伯特·爱因斯坦创立，依据研究的对象不同分为狭义相对论和广义相对论。相对论的基本假设是相对性原理，即物理定律与参照系的选择无关。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'h4'</span>).bind(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).next().show(<span class="hljs-number">600</span>);
        }).bind(<span class="hljs-string">'mouseout'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-keyword">this</span>).next().hide(<span class="hljs-number">300</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677263?w=297&amp;h=203" src="https://static.alili.tech/img/remote/1460000013677263?w=297&amp;h=203" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到，不管是<code>show</code>还是<code>hide</code>的时候，元素的<code>宽</code>、<code>高</code>和<code>不透明度</code>都是在慢慢增加或者减小的。</em></p>
<h3 id="articleHeader12">8.2 fadeIn()方法 和 fadeOut()方法</h3>
<blockquote>与<code>show</code>、<code>hide</code>方法不同的是，<code>fadeIn</code>和<code>fadeOut</code>方法只改变元素的不透明度，不会去改变宽高。</blockquote>
<p>下面的代码表示的是元素<code>淡入</code>的效果，其中也可以传时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('element').fadeIn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'element'</span>).fadeIn();</code></pre>
<p>下面的代码表示的是元素<code>淡出</code>的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('element').fadeOut();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$(<span class="hljs-string">'element'</span>).fadeOut();</code></pre>
<p><strong>示例代码：</strong> <em>[ 46-jq动画-fadeIn&amp;fadeOut.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $(function() {
    $('h4').bind('mouseover', function() {
        $(this).next().fadeIn();
    }).bind('mouseout', function() {
        $(this).next().fadeOut();
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'h4'</span>).bind(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>).next().fadeIn();
    }).bind(<span class="hljs-string">'mouseout'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>).next().fadeOut();
    });
});</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677264?w=297&amp;h=203" src="https://static.alili.tech/img/remote/1460000013677264?w=297&amp;h=203" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">8.3 slideUp()方法 和 slideDown()方法</h3>
<blockquote>
<code>slideUp()</code>方法和<code>slideDown()</code>方法只会改变元素的高度，如果一个元素的<code>display</code>属性值为<code>“none”</code>，调用<code>slideDown()</code>方法的时候元素由上至下延伸显示。<code>slideUp()</code>正好相反，元素将由下到上缩短隐藏。</blockquote>
<p><strong>示例代码：</strong> <em>[ 47-jq动画-slideDown&amp;slideUp.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $(function() {
    $('h4').bind('mouseover', function() {
        $(this).next().slideDown();
    }).bind('mouseout', function() {
        $(this).next().slideUp();
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-string">'h4'</span>).bind(<span class="hljs-string">'mouseover'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>).next().slideDown();
    }).bind(<span class="hljs-string">'mouseout'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-keyword">this</span>).next().slideUp();
    });
});</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677265?w=297&amp;h=203" src="https://static.alili.tech/img/remote/1460000013677265?w=297&amp;h=203" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">8.4 自定义动画方法 animate()</h3>
<blockquote>前面几种类型动画，比较单一，很多时候不能满足于用户的需求，但是在<code>jQ</code>中还有一个自定义动画<code>animate</code>，非常强大。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="animate(params,speed,easing,callback);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">animate(params,speed,easing,callback);</code></pre>
<p>参数说明如下：</p>
<ul>
<li>
<code>params</code>：一个包含样式和值的对象，比如<code>{p1:"val1",p2:"val2",...}</code>；</li>
<li>
<code>speed</code>：动画执行速度(可选)，默认<code>400</code>；</li>
<li>
<code>easing</code>：表示过度使用哪种缓动函数(默认<code>swing</code>，<code>jQ</code>内部还支持一个<code>linear</code>)</li>
<li>
<code>callback</code>：在动画执行完之后，执行的函数(可选)。</li>
</ul>
<p><strong>1、简单的动画：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    #box {
        position: relative;
        width: 150px;
        height: 150px;
        background: aquamarine;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        // box两秒内向右移动600px
        $('#box').animate({left: '600px'}, 2000);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
        <span class="hljs-attribute">background</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// box两秒内向右移动600px</span>
        $(<span class="hljs-string">'#box'</span>).animate({<span class="hljs-attr">left</span>: <span class="hljs-string">'600px'</span>}, <span class="hljs-number">2000</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677266?w=768&amp;h=167" src="https://static.alili.tech/img/remote/1460000013677266?w=768&amp;h=167" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、累加、累减动画：</strong></p>
<blockquote>通过累加一个值让元素从当前位置，累加到900的位置</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#box2').animate({
    left: '+=900' // 在当前位置累加到 900
}, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#box2'</span>).animate({
    <span class="hljs-attr">left</span>: <span class="hljs-string">'+=900'</span> <span class="hljs-comment">// 在当前位置累加到 900</span>
}, <span class="hljs-number">1000</span>);</code></pre>
<p><strong>3、多重动画：</strong></p>
<p>同时执行多个动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#box3').click(function() {
    $(this).animate({
        left: '300',
        height: '200px',
        width: '200px',
        top: '200px'
    }, 2000);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#box3'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).animate({
        <span class="hljs-attr">left</span>: <span class="hljs-string">'300'</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-string">'200px'</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-string">'200px'</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-string">'200px'</span>
    }, <span class="hljs-number">2000</span>);
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677267?w=511&amp;h=447" src="https://static.alili.tech/img/remote/1460000013677267?w=511&amp;h=447" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到所有的变化都是同时进行的。</em></p>
<p>按顺序执行多个动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#box4').click(function() {
    $(this).animate({
        left: '400px',
        height: '150px',
        opacity: '1'
    }, 3000).animate({
        top: '150px',
        width: '150px'
    }, 3000).fadeOut('slow');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#box4'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).animate({
        <span class="hljs-attr">left</span>: <span class="hljs-string">'400px'</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-string">'150px'</span>,
        <span class="hljs-attr">opacity</span>: <span class="hljs-string">'1'</span>
    }, <span class="hljs-number">3000</span>).animate({
        <span class="hljs-attr">top</span>: <span class="hljs-string">'150px'</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-string">'150px'</span>
    }, <span class="hljs-number">3000</span>).fadeOut(<span class="hljs-string">'slow'</span>);
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677268?w=563&amp;h=352" src="https://static.alili.tech/img/remote/1460000013677268?w=563&amp;h=352" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、延迟动画：</strong></p>
<blockquote>在动画执行中如果想要对某一段动画进行延迟操作，可以使用<code>delay()</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#box5').click(function() {
    $(this).animate({
        left: '400px',
        height: '150px',
        opacity: '1'
    }, 3000)
    .delay(1000)
    .animate({
        top: '150px',
        width: '150px'
    }, 3000).fadeOut('slow');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#box5'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).animate({
        <span class="hljs-attr">left</span>: <span class="hljs-string">'400px'</span>,
        <span class="hljs-attr">height</span>: <span class="hljs-string">'150px'</span>,
        <span class="hljs-attr">opacity</span>: <span class="hljs-string">'1'</span>
    }, <span class="hljs-number">3000</span>)
    .delay(<span class="hljs-number">1000</span>)
    .animate({
        <span class="hljs-attr">top</span>: <span class="hljs-string">'150px'</span>,
        <span class="hljs-attr">width</span>: <span class="hljs-string">'150px'</span>
    }, <span class="hljs-number">3000</span>).fadeOut(<span class="hljs-string">'slow'</span>);
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677269?w=563&amp;h=352" src="https://static.alili.tech/img/remote/1460000013677269?w=563&amp;h=352" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、动画队列：</strong></p>
<p>一组元素上的效果：</p>
<ul>
<li>当在一个<code>animate()</code>方法中应用多个属性时，动画是同时发生的；</li>
<li>当以链式的写法应用到动画方法时，动画是按照顺序发生的。</li>
</ul>
<p>多组元素上的动画：</p>
<ul>
<li>默认情况下，几组动画是同时发生的；</li>
<li>当以回调形式应用动画方式时，动画按照回调顺序发生的。</li>
</ul>
<p><strong>6、停止动画：</strong></p>
<blockquote>如果需要在某处停止动画需要使用<code>stop()</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="stop([clearQueue],[gotoEnd]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">stop([clearQueue],[gotoEnd]);</code></pre>
<p>两个参数都是可选的，都为布尔值，<code>clearQueue</code>表示是否要清空未执行完的动画队列。<code>gotoEnd</code>表示的是直接将正在执行的动画跳转到末状态。直接使用<code>stop()</code>方法，则会立即停止当前正在执行的动画。</p>
<p><em>不明白的小伙伴，参考<code>8.6</code>小节，第二个案例 <code>《动画下拉菜单栏》</code></em></p>
<h3 id="articleHeader15">8.5 其他动画方法</h3>
<p><strong>1、toggle()方法：</strong></p>
<blockquote>
<code>toggle()</code>方法可以切换元素的可见状态，如果元素是可见的，则切换为隐藏。如果元素是隐藏的，则切换为可见。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#btn1').click(function() {
    $(this).next().toggle();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#btn1'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).next().toggle();
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677270?w=301&amp;h=281" src="https://static.alili.tech/img/remote/1460000013677270?w=301&amp;h=281" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>只要循环点击<code>h4</code>，它的下一个兄弟元素就会循环切换。</em></p>
<p><strong>2、slideToggle()方法：</strong></p>
<blockquote>通过高度变化来切换匹配元素的可见性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#btn2').click(function() {
    $(this).next().slideToggle();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#btn2'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).next().slideToggle();
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677271?w=301&amp;h=281" src="https://static.alili.tech/img/remote/1460000013677271?w=301&amp;h=281" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、fadeTo()方法：</strong></p>
<blockquote>
<code>fadeTo()</code>方法可以将不透明度设置到指定的值。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#btn3').click(function() {
    $(this).next().fadeTo(600, 0.5);  // 600表示的是执行时间 0.5 表示目标值
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#btn3'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).next().fadeTo(<span class="hljs-number">600</span>, <span class="hljs-number">0.5</span>);  <span class="hljs-comment">// 600表示的是执行时间 0.5 表示目标值</span>
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677272?w=301&amp;h=281" src="https://static.alili.tech/img/remote/1460000013677272?w=301&amp;h=281" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、fadeToggle()方法：</strong></p>
<blockquote>
<code>fadeToggle()</code>方法可以切换不透明度。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('#btn4').click(function() {
    $(this).next().fadeToggle();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'#btn4'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $(<span class="hljs-keyword">this</span>).next().fadeToggle();
});</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677273?w=301&amp;h=281" src="https://static.alili.tech/img/remote/1460000013677273?w=301&amp;h=281" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">8.6 jQuery 动画案例</h3>
<blockquote>下面通过几个简单的例子，巩固一下<code>jQuery</code>动画的知识。</blockquote>
<p><strong>1、呼吸灯版轮播图：</strong></p>
<blockquote>在实现原理上，与前面特效篇的是不同的，这里改变的是图片的不透明度<code>opacity</code>，并且不需要让所有<code>li</code>左浮动，<code>ul</code>也不需要设置一个很宽的宽度。在<code>jQ</code>中操作更加的简单。</blockquote>
<p>样式上：</p>
<ul>
<li>大盒子相对定位，图片的li绝对定位，让所有的图片叠加在一起；</li>
<li>给所有的图片<code>li</code>设置隐藏属性，第一张图片需要显示；</li>
</ul>
<p>js上：</p>
<ul>
<li>定义一个<code>index</code>用来记录当前点击的张数；</li>
<li>当点击右箭头的时候，让对应的图片<code>li</code>，<code>fadeIn</code>，其余的兄弟元素<code>fadeOut</code>，同时让对应的小圆点添加<code>current</code>类，其余的兄弟元素移除这个类；</li>
<li>点击左箭头只需将<code>index--</code>，再进行判断一下，其他的与点击右箭头原理是一样的。</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 50-jq动画-案例-呼吸灯版轮播图.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #slide {
        width: 560px;
        height: 315px;
        margin: 100px auto;
        position: relative;
    }
    
    #slide ul li {
        position: absolute;
        display: none;
    }
    
    #slide ul li:first-child {
        display: block;
    }
    
    #slide ul img {
        display: block;
    }
    
    #slide #arrow {
        display: none;
    }
    
    #slide:hover #arrow {
        display: block;
    }
    
    #slide #arrow #leftArr,
    #slide #arrow #rightArr {
        width: 30px;
        height: 60px;
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        top: 50%;
        margin-top: -30px;
        text-decoration: none;
        color: #fff;
        text-align: center;
        font: 700 24px/60px &quot;宋体&quot;;
    }
    
    #slide #arrow #leftArr {
        left: 0;
    }
    
    #slide #arrow #rightArr {
        right: 0;
    }
    
    #slide #arrow #leftArr:hover,
    #slide #arrow #rightArr:hover {
        background-color: rgba(0, 0, 0, 0.5);
    }
    
    #slide ol {
        width: 100px;
        height: 14px;
        background-color: rgba(255, 255, 255, 0.6);
        position: absolute;
        bottom: 14px;
        left: 50%;
        margin-left: -50px;
        border-radius: 7px;
    }
    
    #slide ol li {
        width: 10px;
        height: 10px;
        float: left;
        background-color: #fff;
        border-radius: 50%;
        margin-top: 2px;
        margin-left: 8.5px;
        cursor: pointer;
    }
    
    #slide ol li.current {
        background-color: #DF654A;
    }
</style>

<!-- html 部分 -->
<div id=&quot;slide&quot;>
    <ul>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/轮播图/1.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/轮播图/2.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/轮播图/3.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/轮播图/4.jpg&quot; alt=&quot;&quot;></a>
        </li>
        <li>
            <a href=&quot;#&quot;><img src=&quot;../image/轮播图/5.jpg&quot; alt=&quot;&quot;></a>
        </li>
    </ul>

    <div id=&quot;arrow&quot;>
        <a href=&quot;javascript:void(0);&quot; id=&quot;leftArr&quot;>&amp;lt;</a>
        <a href=&quot;javascript:void(0);&quot; id=&quot;rightArr&quot;>&amp;gt;</a>
    </div>

    <ol id=&quot;circleOl&quot;>
        <li class=&quot;current&quot;></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ol>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 定义一个变量，监测张数
        var index = 0;
        var $li = $('#slide ul li');
        // 1- 右箭头功能
        $('#rightArr').click(function() {
            index++;
            if (index == $li.length) {
                index = 0;
            }
            // 让第 index 个 li fadeIn，其他所有的兄弟元素 fadeOut
            $li.eq(index).fadeIn(1000).siblings().fadeOut(1000);
            // 控制小圆点，当前index的小圆点添加 current 类 其余的兄弟元素移除这个类
            $('#circleOl li').eq(index).addClass('current').siblings().removeClass('current');
        });
        // 2- 左箭头功能
        $('#leftArr').click(function() {
            index--;
            if (index == -1) {
                index = $li.length - 1;
            }
            // 让第 index 个 li fadeIn，其他所有的兄弟元素 fadeOut
            $li.eq(index).fadeIn(1000).siblings().fadeOut(1000);
            // 控制小圆点，当前index的小圆点添加 current 类 其余的兄弟元素移除这个类
            $('#circleOl li').eq(index).addClass('current').siblings().removeClass('current');
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">560px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">315px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">display</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> {
        <span class="hljs-attribute">display</span>: none;
    }
    
    <span class="hljs-selector-id">#slide</span><span class="hljs-selector-pseudo">:hover</span> <span class="hljs-selector-id">#arrow</span> {
        <span class="hljs-attribute">display</span>: block;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span>,
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">30px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.3);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">30px</span>;
        <span class="hljs-attribute">text-decoration</span>: none;
        <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font</span>: <span class="hljs-number">700</span> <span class="hljs-number">24px</span>/<span class="hljs-number">60px</span> <span class="hljs-string">"宋体"</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span> {
        <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span> {
        <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#leftArr</span><span class="hljs-selector-pseudo">:hover</span>,
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-id">#arrow</span> <span class="hljs-selector-id">#rightArr</span><span class="hljs-selector-pseudo">:hover</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.5);
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-built_in">rgba</span>(255, 255, 255, 0.6);
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">bottom</span>: <span class="hljs-number">14px</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">7px</span>;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">float</span>: left;
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">2px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">8.5px</span>;
        <span class="hljs-attribute">cursor</span>: pointer;
    }
    
    <span class="hljs-selector-id">#slide</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.current</span> {
        <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#DF654A</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"slide"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/轮播图/1.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/轮播图/2.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/轮播图/3.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/轮播图/4.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../image/轮播图/5.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"arrow"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"leftArr"</span>&gt;</span>&amp;lt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"rightArr"</span>&gt;</span>&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">ol</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"circleOl"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"current"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ol</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 定义一个变量，监测张数</span>
        <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">var</span> $li = $(<span class="hljs-string">'#slide ul li'</span>);
        <span class="hljs-comment">// 1- 右箭头功能</span>
        $(<span class="hljs-string">'#rightArr'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            index++;
            <span class="hljs-keyword">if</span> (index == $li.length) {
                index = <span class="hljs-number">0</span>;
            }
            <span class="hljs-comment">// 让第 index 个 li fadeIn，其他所有的兄弟元素 fadeOut</span>
            $li.eq(index).fadeIn(<span class="hljs-number">1000</span>).siblings().fadeOut(<span class="hljs-number">1000</span>);
            <span class="hljs-comment">// 控制小圆点，当前index的小圆点添加 current 类 其余的兄弟元素移除这个类</span>
            $(<span class="hljs-string">'#circleOl li'</span>).eq(index).addClass(<span class="hljs-string">'current'</span>).siblings().removeClass(<span class="hljs-string">'current'</span>);
        });
        <span class="hljs-comment">// 2- 左箭头功能</span>
        $(<span class="hljs-string">'#leftArr'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            index--;
            <span class="hljs-keyword">if</span> (index == <span class="hljs-number">-1</span>) {
                index = $li.length - <span class="hljs-number">1</span>;
            }
            <span class="hljs-comment">// 让第 index 个 li fadeIn，其他所有的兄弟元素 fadeOut</span>
            $li.eq(index).fadeIn(<span class="hljs-number">1000</span>).siblings().fadeOut(<span class="hljs-number">1000</span>);
            <span class="hljs-comment">// 控制小圆点，当前index的小圆点添加 current 类 其余的兄弟元素移除这个类</span>
            $(<span class="hljs-string">'#circleOl li'</span>).eq(index).addClass(<span class="hljs-string">'current'</span>).siblings().removeClass(<span class="hljs-string">'current'</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677274?w=565&amp;h=352" src="https://static.alili.tech/img/remote/1460000013677274?w=565&amp;h=352" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、动画下拉菜单栏：</strong></p>
<blockquote>动画下拉菜单栏，主要实现原理还是运用<code>jQ</code>里面的两个动画<code>slideDown</code>和<code>slideUp</code>，并且配合<code>stop方法</code>。</blockquote>
<p>先看一下，如果不加<code>stop()</code>方法，会是一个什么效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677275?w=401&amp;h=168" src="https://static.alili.tech/img/remote/1460000013677275?w=401&amp;h=168" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em>我们可以看到一个效果，当光标移到第一个“一级菜单”的时候，触发动画效果，但是动画效果还没结束，我就将光标移进了第二个菜单，触发第二个菜单下拉效果。所以导致了动画效果与光标不一致，此时只需要在光标移入、移出之前加上<code>stop()</code>方法，就能解决这个问题。</em></p>
<p><em><code>stop()</code>方法会结束当前正在进行的动画效果，并立即执行队列中的下一个动画。</em></p>
<p><strong>示例代码：</strong> <em>[ 51-jq动画-案例-动画下拉菜单.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div class=&quot;wrap&quot;>
    <ul>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单1</a>
            <ul class=&quot;ul&quot;>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单11</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单12</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单13</a></li>
            </ul>
        </li>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单2</a>
            <ul>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单21</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单22</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单23</a></li>
            </ul>
        </li>
        <li>
            <a href=&quot;javascript:void(0);&quot;>一级菜单3</a>
            <ul>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单31</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单32</a></li>
                <li><a href=&quot;javascript:void(0);&quot;>二级菜单33</a></li>
            </ul>
        </li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 1- 给当前 菜单栏注册鼠标进入事件
        $('.wrap>ul>li').mouseenter(function() {
            // 进入的时候，让下面的ul slideDown动画显示，显示之前要加上stop方法
            $(this).children('ul').stop().slideDown();
        });
        // 2- 给当前 菜单栏注册鼠标离开事件
        $('.wrap>ul>li').mouseleave(function() {
            // 离开的时候，让下面的ul slideUp动画显示，显示之前要加上stop方法
            $(this).children('ul').stop().slideUp()
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ul"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单11<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单12<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单13<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单21<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单22<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单23<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>一级菜单3<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单31<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单32<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"javascript:void(0);"</span>&gt;</span>二级菜单33<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 1- 给当前 菜单栏注册鼠标进入事件</span>
        $(<span class="hljs-string">'.wrap&gt;ul&gt;li'</span>).mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 进入的时候，让下面的ul slideDown动画显示，显示之前要加上stop方法</span>
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'ul'</span>).stop().slideDown();
        });
        <span class="hljs-comment">// 2- 给当前 菜单栏注册鼠标离开事件</span>
        $(<span class="hljs-string">'.wrap&gt;ul&gt;li'</span>).mouseleave(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 离开的时候，让下面的ul slideUp动画显示，显示之前要加上stop方法</span>
            $(<span class="hljs-keyword">this</span>).children(<span class="hljs-string">'ul'</span>).stop().slideUp()
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677276?w=401&amp;h=168" src="https://static.alili.tech/img/remote/1460000013677276?w=401&amp;h=168" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、手风琴：</strong> </p>
<p><strong>实现原理：</strong></p>
<ul>
<li>给外部大盒子设置一个与图片大小一致的宽高，并且设置相对定位</li>
<li>还是采用<code>ul，li</code>结构，<code>li</code>设置宽高，与图片大小一致，设置绝对定</li>
<li>动态的给<code>li</code>添加背景图片，因为<code>li</code>绝对定位的原因，此时所有的<code>li</code>都叠在一起</li>
<li>动态的给每个<code>li</code>设置<code>left</code>值(<code>left*i</code>)，这时候<code>li</code>就会依次排开</li>
<li>大盒子还要设置一个<code>overflow-hidden</code>属性，将多余的隐藏掉</li>
<li>给每个<code>li</code>注册鼠标鼠标经过事件，然后根据下面推算出的规律(当前鼠标经过的索引<code>index</code>，他之前包括他自己的<code>left</code>值都是，设定的最小值乘以对应的索引。而他后面的会将设定的最小值乘以对应的索引后再加上<code>450</code>，这里的<code>450</code>不是一个固定值，根据规律找出来的)进行判断，设置各自的<code>left</code>值；</li>
<li>鼠标离开的时候再让所有的盒子恢复到一开始的位置，每个li显示等分的宽度</li>
</ul>
<p>大盒子没有<code>overflow-hidden</code>的时候：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623436" src="https://static.alili.tech/img/remote/1460000012623436" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>画个图，理解一下：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623437" src="https://static.alili.tech/img/remote/1460000012623437" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>找规律：</strong></p>
<blockquote>结合上面的图片，我们可以找到一个规律</blockquote>
<ul>
<li>
<p>当鼠标在第1个li上的时候，li下标index为0：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：500px</li>
<li>index：2  left：550px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
<li>
<p>当鼠标在第2个li上的时候，li下标index为1：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：50px</li>
<li>index：2  left：550px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
<li>
<p>当鼠标在第3个li上的时候，li下标index为2：</p>
<ul>
<li>index：0  left：0</li>
<li>index：1  left：50px</li>
<li>index：2  left：100px</li>
<li>index：3  left：600px</li>
<li>index：4  left：650px</li>
</ul>
</li>
</ul>
<p><em>看出规律了吗？</em></p>
<ul>
<li>当对应li的下标<code>&lt;=</code>鼠标悬停的的下标上的时候<code>left</code>值 是<code>50*i</code>
</li>
<li>当对应li的下标<code>&gt;</code>鼠标悬停的的下标上的时候<code>left</code>值 是<code>50*i + ,450</code>(450不是固定的值，是经过计算出来的)</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 52-jq动画-案例-手风琴.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    
    #box {
        width: 700px;
        height: 440px;
        margin: 100px auto;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        border-radius: 30px;
    }
    
    li {
        width: 700px;
        height: 440px;
        position: absolute;
    }
</style>

<!-- html 部分 -->
<div id=&quot;box&quot;>
    <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        var $li = $('#box li');
        // 给所有的 li 设置背景图
        for (var i = 0; i < $li.length; i++) {
            // 这里加上eq的目的是，隐式迭代添加的图片只会是第一张
            $li.eq(i)
                .css({
                    &quot;backgroundImage&quot;: &quot;url(../image/手风琴/&quot; + (i + 1) + &quot;.png)&quot;,
                    &quot;left&quot;: 140 * i
                });
            // 鼠标进入的时候
            $li.mouseenter(function() {
                for (var i = 0; i < $li.length; i++) {
                    // 判断i小于等于当前索引的时候，让之前的left值都是50*i的
                    if (i <= $(this).index()) {
                        $li.eq(i).stop().animate({
                            left: 50 * i
                        })
                    } else {
                        // 其余的li的left值应该加上450
                        $li.eq(i).stop().animate({
                            left: 50 * i + 450
                        });
                    }
                }
            });
            // 鼠标离开的时候 让每一个li 的left  恢复到 140*i
            $li.mouseleave(function() {
                for (var i = 0; i < $li.length; i++) {
                    $li.eq(i).stop().animate({
                        left: 140 * i
                    });
                }
            });
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        <span class="hljs-attribute">list-style</span>: none;
    }
    
    <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">700px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">440px</span>;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
        <span class="hljs-attribute">position</span>: relative;
        <span class="hljs-attribute">overflow</span>: hidden;
        <span class="hljs-attribute">box-sizing</span>: border-box;
        <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">30px</span>;
    }
    
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">700px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">440px</span>;
        <span class="hljs-attribute">position</span>: absolute;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> $li = $(<span class="hljs-string">'#box li'</span>);
        <span class="hljs-comment">// 给所有的 li 设置背景图</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; $li.length; i++) {
            <span class="hljs-comment">// 这里加上eq的目的是，隐式迭代添加的图片只会是第一张</span>
            $li.eq(i)
                .css({
                    <span class="hljs-string">"backgroundImage"</span>: <span class="hljs-string">"url(../image/手风琴/"</span> + (i + <span class="hljs-number">1</span>) + <span class="hljs-string">".png)"</span>,
                    <span class="hljs-string">"left"</span>: <span class="hljs-number">140</span> * i
                });
            <span class="hljs-comment">// 鼠标进入的时候</span>
            $li.mouseenter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; $li.length; i++) {
                    <span class="hljs-comment">// 判断i小于等于当前索引的时候，让之前的left值都是50*i的</span>
                    <span class="hljs-keyword">if</span> (i &lt;= $(<span class="hljs-keyword">this</span>).index()) {
                        $li.eq(i).stop().animate({
                            <span class="hljs-attr">left</span>: <span class="hljs-number">50</span> * i
                        })
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-comment">// 其余的li的left值应该加上450</span>
                        $li.eq(i).stop().animate({
                            <span class="hljs-attr">left</span>: <span class="hljs-number">50</span> * i + <span class="hljs-number">450</span>
                        });
                    }
                }
            });
            <span class="hljs-comment">// 鼠标离开的时候 让每一个li 的left  恢复到 140*i</span>
            $li.mouseleave(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; $li.length; i++) {
                    $li.eq(i).stop().animate({
                        <span class="hljs-attr">left</span>: <span class="hljs-number">140</span> * i
                    });
                }
            });
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623438?w=390&amp;h=249" src="https://static.alili.tech/img/remote/1460000012623438?w=390&amp;h=249" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、弹幕效果：</strong></p>
<ul>
<li>获取输入框的的 <code>value</code> 值；并生成 <code>span</code> 标签</li>
<li>将 <code>span</code> 标签添加到 页面中，随机颜色 随机高度 <code>span</code>动画从右向左</li>
<li>到达最左边的时候删除 <code>span</code> 标签(不删除会随着输入的内容越来越多影响性能)</li>
</ul>
<p><strong>示例代码：</strong> <em>[ 53-jq动画-案例-弹幕效果.html ]</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- html 部分 -->
<div id=&quot;page&quot;>
    <div id=&quot;import&quot;>
        <div id=&quot;content&quot;>
            <p class=&quot;title&quot;>吐槽</p>
            <input type=&quot;text&quot; name=&quot;&quot; id=&quot;text&quot; placeholder=&quot;发送弹幕，与小伙伴一起互动！&quot;>
            <button id=&quot;btn&quot;>发射</button>
        </div>
    </div>
</div>

<!-- js 部分 -->
<script>
    $(function() {
        // 定义一个颜色数组
        var colorArr = ['#FF895D', '#78BBE6', '#FF4273', '#00BBF0', '#7C73E6', '#EE2B47', '#F60C86', '#9870FC', '#F96D00', '#303481'];

        $('#btn').click(function() {
            // 获取到输入框的内容
            var content = $('#text').val();
            $(&quot;#text&quot;).val(&quot;&quot;);

            // 获取随机颜色和高度
            var randomColor = parseInt(Math.random() * colorArr.length);
            var randomTop = parseInt(Math.random() * 301);
            // 获取屏幕的可视宽度
            var clientWidth = $(window).width();
            // 根据屏幕的宽度计算出弹幕的速度(1300px的时候8秒执行完)
            var time = (8000 / 1300) * clientWidth;
            // 创建span标签 判断当输入为空的时候不触发
            if (content != &quot;&quot; &amp;&amp; content.trim()) {
                $('<span></span>').text(content)
                    // 设置span的颜色 与 top值left值 
                    .css({
                        &quot;color&quot;: colorArr[randomColor],
                        &quot;left&quot;: clientWidth,
                        &quot;top&quot;: randomTop
                    })
                    // 将创建的span添加到页面中
                    .appendTo(&quot;#page&quot;)
                    // 执行动画 left目标值-300px，执行时间time 过渡效果linear(匀速) 回调函数内将到达终点的span移除掉
                    .animate({left: -300}, time, &quot;linear&quot;, function() {
                        $(this).remove();
                    })
            }
        });
        // 对整个页面注册键盘按下事件
        $(document).keydown(function(e) {
            // 当按下的键为回车键时，执行上面的点击事件
            if (e.keyCode == 13) {
                $(&quot;#btn&quot;).click();
            }
        })
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"page"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"import"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>吐槽<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">""</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"发送弹幕，与小伙伴一起互动！"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>发射<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 定义一个颜色数组</span>
        <span class="hljs-keyword">var</span> colorArr = [<span class="hljs-string">'#FF895D'</span>, <span class="hljs-string">'#78BBE6'</span>, <span class="hljs-string">'#FF4273'</span>, <span class="hljs-string">'#00BBF0'</span>, <span class="hljs-string">'#7C73E6'</span>, <span class="hljs-string">'#EE2B47'</span>, <span class="hljs-string">'#F60C86'</span>, <span class="hljs-string">'#9870FC'</span>, <span class="hljs-string">'#F96D00'</span>, <span class="hljs-string">'#303481'</span>];

        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取到输入框的内容</span>
            <span class="hljs-keyword">var</span> content = $(<span class="hljs-string">'#text'</span>).val();
            $(<span class="hljs-string">"#text"</span>).val(<span class="hljs-string">""</span>);

            <span class="hljs-comment">// 获取随机颜色和高度</span>
            <span class="hljs-keyword">var</span> randomColor = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * colorArr.length);
            <span class="hljs-keyword">var</span> randomTop = <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">301</span>);
            <span class="hljs-comment">// 获取屏幕的可视宽度</span>
            <span class="hljs-keyword">var</span> clientWidth = $(<span class="hljs-built_in">window</span>).width();
            <span class="hljs-comment">// 根据屏幕的宽度计算出弹幕的速度(1300px的时候8秒执行完)</span>
            <span class="hljs-keyword">var</span> time = (<span class="hljs-number">8000</span> / <span class="hljs-number">1300</span>) * clientWidth;
            <span class="hljs-comment">// 创建span标签 判断当输入为空的时候不触发</span>
            <span class="hljs-keyword">if</span> (content != <span class="hljs-string">""</span> &amp;&amp; content.trim()) {
                $(<span class="hljs-string">'&lt;span&gt;&lt;/span&gt;'</span>).text(content)
                    <span class="hljs-comment">// 设置span的颜色 与 top值left值 </span>
                    .css({
                        <span class="hljs-string">"color"</span>: colorArr[randomColor],
                        <span class="hljs-string">"left"</span>: clientWidth,
                        <span class="hljs-string">"top"</span>: randomTop
                    })
                    <span class="hljs-comment">// 将创建的span添加到页面中</span>
                    .appendTo(<span class="hljs-string">"#page"</span>)
                    <span class="hljs-comment">// 执行动画 left目标值-300px，执行时间time 过渡效果linear(匀速) 回调函数内将到达终点的span移除掉</span>
                    .animate({<span class="hljs-attr">left</span>: <span class="hljs-number">-300</span>}, time, <span class="hljs-string">"linear"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        $(<span class="hljs-keyword">this</span>).remove();
                    })
            }
        });
        <span class="hljs-comment">// 对整个页面注册键盘按下事件</span>
        $(<span class="hljs-built_in">document</span>).keydown(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-comment">// 当按下的键为回车键时，执行上面的点击事件</span>
            <span class="hljs-keyword">if</span> (e.keyCode == <span class="hljs-number">13</span>) {
                $(<span class="hljs-string">"#btn"</span>).click();
            }
        })
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012623589?w=970&amp;h=608" src="https://static.alili.tech/img/remote/1460000012623589?w=970&amp;h=608" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader17">9. jQuery 里的 Ajax 操作</h2>
<blockquote>
<code>Ajax</code>全称“<code>Asynchronous JavaScript and XML</code>”（异步的<code>JavaScript</code>和<code>XML</code>）。它的出现揭开了无刷新更新页面的新时代。具体的实现方式以及<code>Ajax</code>的优缺点，在前面的一篇文章[《js 进阶知识-Ajax篇》]()已经讲得很详细了，不明白的小伙伴，可以先去学习下原生<code>js</code>是如何实现<code>Ajax</code>的。</blockquote>
<p><code>jQuery</code>对<code>Ajax</code>操作进行了封装，在<code>jQuery</code>中<code>$.ajax()</code>方法属于最底层的方法，第<code>2</code>层是<code>load()</code>、<code>$.get()</code>和<code>$.post()</code>方法，第<code>3</code>层就是<code>$.getScript()</code>和<code>$.getJSON()</code>方法。</p>
<h3 id="articleHeader18">9.1 load()方法</h3>
<p><strong>1、载入HTML文档</strong></p>
<blockquote>
<code>load()</code>方法是<code>jQuery</code>中最为简单和常用的<code>Ajax</code>方法，能载入远程<code>HTML</code>代码并插入<code>DOM</code>中。它的结构为：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="load(url[,data][,callback]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">load(url[,data][,callback]);</code></pre>
<p><strong>参数详解：</strong></p>
<table>
<thead><tr>
<th>参数名称</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>url</code></td>
<td><code>String</code></td>
<td>请求<code>HTML</code>页面的<code>URL</code>地址</td>
</tr>
<tr>
<td>
<code>data</code>（可选）</td>
<td><code>Object</code></td>
<td>发送至服务器的<code>key/value</code>数据</td>
</tr>
<tr>
<td>
<code>callback</code>（可选）</td>
<td><code>Function</code></td>
<td>请求完成时的回调函数，无论请求成功还是失败</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong></p>
<p>首先新建一个<code>data.html</code>的文件，里面模拟的是请求的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;comment&quot;>
    <h4>张三：</h4>
    <p class=&quot;para&quot;>哈哈哈，真有趣</p>
</div>
<div class=&quot;comment&quot;>
    <h4>李四：</h4>
    <p class=&quot;para&quot;>顶楼上</p>
</div>
<div class=&quot;comment&quot;>
    <h4>王五：</h4>
    <p class=&quot;para&quot;>66666</p>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>张三：<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"para"</span>&gt;</span>哈哈哈，真有趣<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>李四：<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"para"</span>&gt;</span>顶楼上<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>王五：<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"para"</span>&gt;</span>66666<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>再创建一个主页面，<code>index.html</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    .send {
        margin-bottom: 10px;
    }
    
    .comment {
        width: 300px;
        padding: 10px 0px 10px 10px;
        background: rgba(156, 250, 220, 0.5);
        border: 1px dashed #f45;
        margin-bottom: 10px;
    }
</style>

<!-- html 部分 -->
<input type=&quot;button&quot; class=&quot;send&quot; value=&quot;Ajax请求&quot;>
<div class=&quot;comment&quot;>已有评论：</div>
<div class=&quot;resText&quot;></div>

<!-- js部分 -->
<script>
    $(function() {
        // 点击按钮，使用load方法请求data页面
        $(&quot;.send&quot;).click(function() {
            // 请求的页面追加到类名为resText的div中
            $(&quot;.resText&quot;).load(&quot;data.html&quot;);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.send</span> {
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-class">.comment</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">10px</span>;
        <span class="hljs-attribute">background</span>: <span class="hljs-built_in">rgba</span>(156, 250, 220, 0.5);
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> dashed <span class="hljs-number">#f45</span>;
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"send"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Ajax请求"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>已有评论：<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"resText"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮，使用load方法请求data页面</span>
        $(<span class="hljs-string">".send"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 请求的页面追加到类名为resText的div中</span>
            $(<span class="hljs-string">".resText"</span>).load(<span class="hljs-string">"data.html"</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677277?w=258&amp;h=392" src="https://static.alili.tech/img/remote/1460000013677277?w=258&amp;h=392" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><em>上面的例子可以看出来，开发人员只需要使用<code>jQuery</code>选择器为<code>HTML</code>片段指定目标位置，然后将要加载的文件<code>URL</code>作为参数传递给<code>load()</code>方法即可。我们可以发现原本的<code>data</code>页面是没有为类<code>comment</code>设置样式的，但是主页面加载后同样的样式名会立即应用到新加载的内容上。</em></p>
<p><strong>2、筛选载入的HTML文档</strong></p>
<blockquote>上面的案例我们可以看到，点击之后<code>data.html</code>里面的整个内容都被加载进来了。如果需要加载<code>data.html</code>页面里的某些元素的时候该怎么办呢？我们可以使用<code>load()</code>方法的URL参数来达到目的。只需要指定选择符就<code>ok</code>了。</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 选择加载data.html页面中class为“para”的内容，注意中间有一个空格
$(&quot;.resText&quot;).load(&quot;data.html .para&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 选择加载data.html页面中class为“para”的内容，注意中间有一个空格</span>
$(<span class="hljs-string">".resText"</span>).load(<span class="hljs-string">"data.html .para"</span>);</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677278?w=258&amp;h=177" src="https://static.alili.tech/img/remote/1460000013677278?w=258&amp;h=177" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>我们可以看到，只有类名是“<code>para</code>”的被加载了。</em></p>
<p><strong>3、传递方式：</strong></p>
<blockquote>
<code>load()</code>方法的传递方式根据参数<code>data</code>来自动指定。如果没有参数传递，则采用<code>GET</code>方式传递；反之则会自动转换为<code>POST</code>方式：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1- 无data参数传递的时候，则是GET方式
$('.resText').load(&quot;data.php&quot;,function(){});

// 2- 有data参数传递的时候，则是POST方式
$('.resText').load(&quot;data.php&quot;,{name:&quot;Levi&quot;,age:&quot;18&quot;},function(){});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1- 无data参数传递的时候，则是GET方式</span>
$(<span class="hljs-string">'.resText'</span>).load(<span class="hljs-string">"data.php"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});

<span class="hljs-comment">// 2- 有data参数传递的时候，则是POST方式</span>
$(<span class="hljs-string">'.resText'</span>).load(<span class="hljs-string">"data.php"</span>,{<span class="hljs-attr">name</span>:<span class="hljs-string">"Levi"</span>,<span class="hljs-attr">age</span>:<span class="hljs-string">"18"</span>},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});</code></pre>
<p><strong>4、回调函数：</strong></p>
<blockquote>回调函数是在页面加载完成之后执行的操作，该函数有三个参数，分别是请求返回的内容、请求状态、<code>XMLHttpRequest</code>对象：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('.resText').load(&quot;data.php&quot;,function(responseText,textStatus,XMLHttpRequest){
    // responseText ： 请求返回的内容
    // textStatus：请求状态：success、error、notmodified、timeout 4种
    // XMLHttpRequest ：XMLHttpRequest对象
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-string">'.resText'</span>).load(<span class="hljs-string">"data.php"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responseText,textStatus,XMLHttpRequest</span>)</span>{
    <span class="hljs-comment">// responseText ： 请求返回的内容</span>
    <span class="hljs-comment">// textStatus：请求状态：success、error、notmodified、timeout 4种</span>
    <span class="hljs-comment">// XMLHttpRequest ：XMLHttpRequest对象</span>
});</code></pre>
<p><em>在<code>load()</code>方法中，无论<code>Ajax</code>请求是否成功，只要当请求完成之后，回调函数都会执行。</em></p>
<h3 id="articleHeader19">9.2 $.get()方法和$.post()方法</h3>
<blockquote>
<code>load()</code>方法通常是用来从<code>WEB</code>服务器上获取静态的数据的，如果需要向服务器传递参数的话，可以使用<code>$.get()</code>方法和<code>$.post()</code>方法还有后面的<code>$.ajax</code>方法。</blockquote>
<p><strong>1、$.get()方法</strong></p>
<blockquote>
<code>$.get()</code>方法使用<code>GET</code>方式来进行异步请求：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get(url [,data] [,callback] [,type]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$.get(url [,data] [,callback] [,type]);</code></pre>
<p><strong>参数详解：</strong></p>
<table>
<thead><tr>
<th>参数名称</th>
<th>类型</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>url</code></td>
<td><code>String</code></td>
<td>请求<code>HTML</code>页面的<code>URL</code>地址</td>
</tr>
<tr>
<td>
<code>data</code>（可选）</td>
<td><code>Object</code></td>
<td>发送至服务器的<code>key/value</code>数据，会作为字符串凭接在url的后面</td>
</tr>
<tr>
<td>
<code>callback</code>（可选）</td>
<td><code>Function</code></td>
<td>请求完成时的回调函数(只有当Response的返回状态是success的时候，才调用该函数)</td>
</tr>
<tr>
<td>
<code>type</code> （可选）</td>
<td><code>String</code></td>
<td>服务器返回内容的格式，包括xml、html、script、json、text、_default</td>
</tr>
</tbody>
</table>
<p><strong>回调函数：</strong></p>
<blockquote>
<code>$.get()</code>方法的回调函数只有两个参数：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.get(&quot;get.php&quot;,{useraname: &quot;Levi&quot;,age:18},function(data,textStatus){
    // data 返回的内容，可以是XML文档、JSON文件、HTML片段等的
    // textStatus 请求状态：success、error、notmodified、timeout 4种。
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.get(<span class="hljs-string">"get.php"</span>,{<span class="hljs-attr">useraname</span>: <span class="hljs-string">"Levi"</span>,<span class="hljs-attr">age</span>:<span class="hljs-number">18</span>},<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data,textStatus</span>)</span>{
    <span class="hljs-comment">// data 返回的内容，可以是XML文档、JSON文件、HTML片段等的</span>
    <span class="hljs-comment">// textStatus 请求状态：success、error、notmodified、timeout 4种。</span>
})</code></pre>
<p><em><code>data</code>参数代表请求返回的内容，<code>textStatus</code>参数代表请求回来的状态，注意：只有当数据成功返回<code>success</code>后才被调用。</em></p>
<p><strong>2、$.post()方法</strong></p>
<blockquote>它与<code>$.get()</code>方法的结构和使用方式都相同，不过他们之间仍有以下区别：</blockquote>
<ul>
<li>get请求会将参数跟在URL的后面进行传递，而post请求则是作为HTTP消息的实体内容发送给Web服务器；</li>
<li>get对传输的数据大小有限制（通常不大于2KB），而使用post方式传递数据量要比get方式大得多；</li>
<li>get方式请求的数据会被浏览器缓存起来，因此可以通过浏览器的历史记录中读到这些数据，存在安全性问题。</li>
</ul>
<h3 id="articleHeader20">9.3 $.ajax()方法</h3>
<blockquote>
<code>$.ajax()</code>方式常用参数解析：</blockquote>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td><code>url</code></td>
<td>请求的地址</td>
</tr>
<tr>
<td><code>type</code></td>
<td>请求的方式</td>
</tr>
<tr>
<td><code>dataType</code></td>
<td>告诉<code>jQuery</code>，需要按照什么格式对服务器返回的数据进行解析，默认<code>json</code>
</td>
</tr>
<tr>
<td><code>data</code></td>
<td>数据</td>
</tr>
<tr>
<td><code>success</code></td>
<td>请求成功的回调函数</td>
</tr>
<tr>
<td><code>error</code></td>
<td>请求失败的回调函数</td>
</tr>
<tr>
<td><code>beforeSend</code></td>
<td>请求发送之前调用的函数</td>
</tr>
<tr>
<td><code>complete</code></td>
<td>不论请求是成功还是失败的，只要请求完成就会调用</td>
</tr>
<tr>
<td><code>timeout</code></td>
<td>设置请求超时时间</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    // 请求的地址
    url: &quot;04-data.php&quot;,
    // 请求的方式
    type: &quot;get&quot;,
    // 告诉jQuery，需要按照什么格式对服务器返回的数据进行解析，默认json
    dataType: &quot;json&quot;,
    // 数据
    data: {
        msg: &quot;我是来请求数据的&quot;
    },
    // 请求成功的回调函数
    success: function(data) {
        console.log(data);
    },
    // 请求失败的回调函数
    error: function() {
        console.log(&quot;失败了&quot;);
    },
    // 请求发送之前调用的函数
    beforeSend: function() {
        console.log(&quot;请求发送之前调用的函数&quot;);
        // 如果返回一个false，那么就会阻止整个请求的发送
        // return false;
        // 用法：可以用作表单验证，当表单内容符合规范的时候发送ajax请求，当不符合的时候就不发送ajax请求
    },
    // 不论请求是成功还是失败的，只要请求完成就会调用
    complete: function() {
        console.log(&quot;请求完成了&quot;);
    },
    // 设置请求超时时间(单位:ms)，超过这个时间后，就不会请求了
    timeout:2000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
    <span class="hljs-comment">// 请求的地址</span>
    url: <span class="hljs-string">"04-data.php"</span>,
    <span class="hljs-comment">// 请求的方式</span>
    type: <span class="hljs-string">"get"</span>,
    <span class="hljs-comment">// 告诉jQuery，需要按照什么格式对服务器返回的数据进行解析，默认json</span>
    dataType: <span class="hljs-string">"json"</span>,
    <span class="hljs-comment">// 数据</span>
    data: {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">"我是来请求数据的"</span>
    },
    <span class="hljs-comment">// 请求成功的回调函数</span>
    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    },
    <span class="hljs-comment">// 请求失败的回调函数</span>
    error: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"失败了"</span>);
    },
    <span class="hljs-comment">// 请求发送之前调用的函数</span>
    beforeSend: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请求发送之前调用的函数"</span>);
        <span class="hljs-comment">// 如果返回一个false，那么就会阻止整个请求的发送</span>
        <span class="hljs-comment">// return false;</span>
        <span class="hljs-comment">// 用法：可以用作表单验证，当表单内容符合规范的时候发送ajax请求，当不符合的时候就不发送ajax请求</span>
    },
    <span class="hljs-comment">// 不论请求是成功还是失败的，只要请求完成就会调用</span>
    complete: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请求完成了"</span>);
    },
    <span class="hljs-comment">// 设置请求超时时间(单位:ms)，超过这个时间后，就不会请求了</span>
    timeout:<span class="hljs-number">2000</span>
});</code></pre>
<h3 id="articleHeader21">9.3 jQuery中的serialize和serializeArray方法</h3>
<p><strong>1、jQuery中的serialize方法：</strong></p>
<blockquote>
<code>serialize</code>方法会将表单中所有的内容拼接成<code>key=value&amp;key=value</code>这样的字符串。</blockquote>
<p>通过这种方式就不要再去手动获取表单中的内容的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;form&quot;>
    <input type=&quot;text&quot; name=&quot;username&quot;>
    <input type=&quot;text&quot; name=&quot;pwd&quot;>
    <input type=&quot;text&quot; name=&quot;phonenumber&quot;>
    <input type=&quot;text&quot; name=&quot;email&quot;>

    <button id=&quot;btn&quot;>获取数据</button>
</form>

<script src=&quot;jquery.min.js&quot;></script>
<script>
    $(function() {
        $('#btn').click = function() {
            var dataStr = $('#form').serialize();
            $.ajax({
                url: &quot;json.php&quot;,
                //data这个参数可以接收对象，也可以接受 key=value&amp;key=value的这种字符串
                data: dataStr,
                type: &quot;post&quot;
            });
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"form"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pwd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"phonenumber"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"email"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>获取数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> dataStr = $(<span class="hljs-string">'#form'</span>).serialize();
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">"json.php"</span>,
                <span class="hljs-comment">//data这个参数可以接收对象，也可以接受 key=value&amp;key=value的这种字符串</span>
                data: dataStr,
                <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>
            });
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2、jQuery中的serializeArray方法：</strong></p>
<blockquote>上面的方法我们可以看到，获取整个数据的时候，是很简单，但是想要进行校验的话就很难，因为上面的方法获取的是一个字符串，不能进行校验，所以此时我们需要另外一个方法，<code>jQuery</code>中的<code>serializeArray</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;form&quot;>
    <input type=&quot;text&quot; name=&quot;username&quot;>
    <input type=&quot;text&quot; name=&quot;pwd&quot;>
    <input type=&quot;text&quot; name=&quot;phonenumber&quot;>
    <input type=&quot;text&quot; name=&quot;email&quot;>

    <button id=&quot;btn&quot;>获取数据</button>
</form>

<script src=&quot;jquery.min.js&quot;></script>
<script>
    $(function() {
        $('#btn').click = function() {
            // 获取到的数组拼接成字符串
            var dataArr = $('#form').serializeArray();
            $.ajax({
                url: &quot;json.php&quot;,
                data: dataArr,
                type: &quot;post&quot;
            });
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"form"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pwd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"phonenumber"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"email"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>获取数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取到的数组拼接成字符串</span>
            <span class="hljs-keyword">var</span> dataArr = $(<span class="hljs-string">'#form'</span>).serializeArray();
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">"json.php"</span>,
                <span class="hljs-attr">data</span>: dataArr,
                <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>
            });
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>示例代码：ajax模拟表单校验及注册</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>sing in page</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #F7F7F7;
        }
        
        ul {
            margin: 0;
            padding: 50px;
            list-style: none;
        }
        
        .register {
            width: 800px;
            margin: 50px auto;
            background-color: #FFF;
            border: 1px solid #CCC;
            border-radius: 5px;
        }
        
        li {
            display: flex;
            margin: 20px 0;
        }
        
        label,
        input {
            display: block;
            float: left;
            height: 46px;
            font-size: 24px;
            box-sizing: border-box;
            color: #333;
        }
        
        label {
            width: 200px;
            line-height: 46px;
            margin-right: 30px;
            text-align: right;
        }
        
        input {
            width: 320px;
            padding: 8px;
            line-height: 1;
            outline: none;
            position: relative;
        }
        
        input.code {
            width: 120px;
        }
        
        input.verify {
            width: 190px;
            margin-left: 10px;
        }
        
        input.disabled {
            background-color: #CCC !important;
        }
        
        input[type=button] {
            border: none;
            color: #FFF;
            background-color: #E64145;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .error {
            color: red;
            margin-left: 10px;
            font-size: 12px;
            line-height: 46px;
        }
        
        .tips {
            position: fixed;
            top: 0;
            width: 100%;
            height: 40px;
            text-align: center;
        }
        
        .tips p {
            min-width: 300px;
            max-width: 400px;
            line-height: 40px;
            margin: 0 auto;
            color: #FFF;
            display: none;
            background-color: #C91623;
        }
    </style>
</head>

<body>
    <div class=&quot;register&quot;>
        <form id=&quot;ajaxForm&quot;>
            <ul>
                <li>
                    <label for=&quot;name&quot;>用户名</label>
                    <input type=&quot;text&quot; name=&quot;name&quot; class=&quot;name&quot; id=&quot;name&quot;>
                    <span class=&quot;error&quot;></span>
                </li>
                <li>
                    <label for=&quot;pass&quot;>请设置密码</label>
                    <input type=&quot;password&quot; name=&quot;pass&quot; class=&quot;pass&quot; id=&quot;pass&quot;>
                </li>
                <li>
                    <label for=&quot;repass&quot;>请确认密码</label>
                    <input type=&quot;password&quot; name=&quot;repass&quot; class=&quot;repass&quot; id=&quot;repass&quot;>
                </li>
                <li>
                    <label for=&quot;mobile&quot;>验证手机</label>
                    <input type=&quot;text&quot; name=&quot;mobile&quot; class=&quot;mobile&quot; id=&quot;mobile&quot;>
                </li>
                <li>
                    <label for=&quot;code&quot;>短信验证码</label>
                    <input type=&quot;text&quot; name=&quot;code&quot; class=&quot;code&quot; id=&quot;code&quot;>
                    <input type=&quot;button&quot; value=&quot;获取验证码&quot; class=&quot;verify&quot;>
                </li>
                <li>
                    <label for=&quot;submit&quot;></label>
                    <input type=&quot;button&quot; class=&quot;submit&quot; value=&quot;立即注册&quot; id=&quot;submit&quot;>
                </li>
            </ul>
        </form>
    </div>
    <div class=&quot;tips&quot;>
        <p>用户名不能为空</p>
    </div>

    <script src=&quot;../05-Form-Validation/js/jquery.min.js&quot;></script>
    <script>
        /*
         * 1.获取短信验证码
         * 1.1 当没有输入手机号的时候  提示请输入手机号
         * 1.2 手机号格式不正确        提示请输入正确的手机号
         * 1.3 调获取短信验证码接口
         * 1.4 显示正在发送中  不能再次发送（防止重复提交）
         * 1.5 当接口成功  按照后台的计时时间  进行倒计时
         * 1.6 当接口失败  提示短信接口繁忙 恢复按钮
         * 1.7 倒计时完成之后  恢复按钮
         * */

        /*
         * 2.注册
         * 2.1 当没有输入用户名的时候  提示请输入用户名
         * 2.2 调注册接口
         * 2.3 显示正在提交 不能再次发送（防止重复提交）
         * 2.4 当接口成功
         *     状态码 10000 成功
         *     状态码 10001 失败 提示用户  用户名已注册  表单后
         *     状态码 10002 失败 没输用户  请输入用户名
         *     恢复按钮
         * 2.5 当接口失败  恢复按钮
         * */
        $(function() {
            /* 警告显示提示 */
            var showTip = function(tip) {
                $(&quot;.tips p&quot;).html(tip).fadeIn(500).delay(1000).fadeOut(500);
            };

            /* 1.获取短信验证码 */
            $(&quot;.verify&quot;).on(&quot;click&quot;, function() {
                /* 当前按钮指定变量 */
                var $btn = $(this);
                /* 判断当前按钮是否有disabled属性，有的话说明已经被点击了，就不让再点击了 */
                if ($btn.hasClass('disabled')) {
                    return false;
                }

                /* 获取手机号 */
                var mobile = $.trim($('#mobile').val());
                /* 判断是否输入内容，没有的话提示信息 */
                if (!mobile) {
                    showTip('请输入手机号');
                    return false;
                }
                /* 判断手机格式 不正确的话提示信息 */
                var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if (!regPhone.test(mobile)) {
                    showTip('请输入正确的手机号');
                    return false;
                }
                /* 调取短信验证码接口 */
                $.ajax({
                    url: 'registerCode.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        mobile: mobile
                    },
                    success: function(data) {
                        if (data.code == 10000) {
                            /* 给发送成功的按钮添加一个倒计时 */
                            var time = parseInt(data.result.time);
                            var timer = setInterval(function() {
                                time--;
                                $btn.val(time + '秒后再次获取');
                                /* 倒计时完成之后  恢复按钮*/
                                if (time <= 0) {
                                    $btn.val('获取验证码').removeClass('disabled');
                                    clearInterval(timer);
                                }
                            }, 1000);
                        } else {
                            /* 逻辑上的失败 */
                            $btn.val('获取验证码').removeClass('disabled');
                        }
                    },
                    error: function() {
                        /* 当接口失败，提示短信接口繁忙 */
                        showTip('短信接口繁忙');
                        $btn.val('获取验证码').removeClass('disabled');
                    },
                    beforeSend: function() {
                        /* 点击之后，显示正在发送 */
                        $btn.val('正在发送...').addClass('disabled');
                    }
                });
                $btn.addClass('disabled');
            });
            /* 2.注册功能的实现 */
            $('.submit').on('click', function() {
                /* 当前点击的按钮 */
                var $btn = $(this);
                /* 正在请求当中 不能再次点击 */
                if ($btn.hasClass('disabled')) {
                    return false;
                }
                var username = $(&quot;#name&quot;).val().trim();
                var password = $(&quot;#pass&quot;).val().trim();
                var repeatPassword = $(&quot;#repass&quot;).val().trim();
                var code = $(&quot;#code&quot;).val().trim();
                var phoneNum = $(&quot;#mobile&quot;).val().trim();

                /* 调注册接口 */
                $.ajax({
                    type: 'post',
                    url: 'register.php',
                    data: {
                        name: username,
                        pass: password,
                        repass: repeatPassword,
                        code: code,
                        mobile: phoneNum
                    },
                    dataType: 'json',
                    // beforeSend: function() {
                    //     /* 显示正在提交 不能再次发送（防止重复提交）*/
                    //     $btn.val('正在提交...').addClass('disabled');
                    // },
                    success: function(data) {
                        /* 当接口成功 */
                        /* 状态码 10000 成功 */
                        if (data.code == 10000) {
                            /* 提示+跳转登录页 */
                            showTip('恭喜' + data.result.name + '注册成功,3后秒自动前往登录页');
                            setTimeout(function() {
                                location.href = 'http://www.baidu.com/';
                            }, 3000);
                        } else if (data.code == 10001) {
                            /* 输入框提示 */
                            $('.error').html('用户名已注册');
                            /* 恢复按钮 */
                            $btn.val('立即注册').removeClass('disabled');
                        } else if (data.code == 10002) {
                            showTip('请输入用户名');
                            /* 恢复按钮 */
                            $btn.val('立即注册').removeClass('disabled');
                        }
                    },
                    error: function() {
                        showTip('系统繁忙！');
                        $btn.val('立即注册').removeClass('disabled');
                    }
                })
            });
        });
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>sing in page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F7F7F7</span>;
        }
        
        <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">list-style</span>: none;
        }
        
        <span class="hljs-selector-class">.register</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCC</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        }
        
        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">label</span>,
        <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">46px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
            <span class="hljs-attribute">box-sizing</span>: border-box;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        }
        
        <span class="hljs-selector-tag">label</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">46px</span>;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">text-align</span>: right;
        }
        
        <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">outline</span>: none;
            <span class="hljs-attribute">position</span>: relative;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.code</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.verify</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.disabled</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCC</span> <span class="hljs-meta">!important</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=button]</span> {
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E64145</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
        }
        
        <span class="hljs-selector-class">.error</span> {
            <span class="hljs-attribute">color</span>: red;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">46px</span>;
        }
        
        <span class="hljs-selector-class">.tips</span> {
            <span class="hljs-attribute">position</span>: fixed;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }
        
        <span class="hljs-selector-class">.tips</span> <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">min-width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">display</span>: none;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#C91623</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"register"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ajaxForm"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"name"</span>&gt;</span>用户名<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"error"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"pass"</span>&gt;</span>请设置密码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pass"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pass"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pass"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"repass"</span>&gt;</span>请确认密码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"repass"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"repass"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"repass"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"mobile"</span>&gt;</span>验证手机<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"mobile"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mobile"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mobile"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"code"</span>&gt;</span>短信验证码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"code"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"code"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"code"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"获取验证码"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"verify"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"submit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"立即注册"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"submit"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>用户名不能为空<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../05-Form-Validation/js/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">/*
         * 1.获取短信验证码
         * 1.1 当没有输入手机号的时候  提示请输入手机号
         * 1.2 手机号格式不正确        提示请输入正确的手机号
         * 1.3 调获取短信验证码接口
         * 1.4 显示正在发送中  不能再次发送（防止重复提交）
         * 1.5 当接口成功  按照后台的计时时间  进行倒计时
         * 1.6 当接口失败  提示短信接口繁忙 恢复按钮
         * 1.7 倒计时完成之后  恢复按钮
         * */</span>

        <span class="hljs-comment">/*
         * 2.注册
         * 2.1 当没有输入用户名的时候  提示请输入用户名
         * 2.2 调注册接口
         * 2.3 显示正在提交 不能再次发送（防止重复提交）
         * 2.4 当接口成功
         *     状态码 10000 成功
         *     状态码 10001 失败 提示用户  用户名已注册  表单后
         *     状态码 10002 失败 没输用户  请输入用户名
         *     恢复按钮
         * 2.5 当接口失败  恢复按钮
         * */</span>
        $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">/* 警告显示提示 */</span>
            <span class="hljs-keyword">var</span> showTip = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tip</span>) </span>{
                $(<span class="hljs-string">".tips p"</span>).html(tip).fadeIn(<span class="hljs-number">500</span>).delay(<span class="hljs-number">1000</span>).fadeOut(<span class="hljs-number">500</span>);
            };

            <span class="hljs-comment">/* 1.获取短信验证码 */</span>
            $(<span class="hljs-string">".verify"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">/* 当前按钮指定变量 */</span>
                <span class="hljs-keyword">var</span> $btn = $(<span class="hljs-keyword">this</span>);
                <span class="hljs-comment">/* 判断当前按钮是否有disabled属性，有的话说明已经被点击了，就不让再点击了 */</span>
                <span class="hljs-keyword">if</span> ($btn.hasClass(<span class="hljs-string">'disabled'</span>)) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }

                <span class="hljs-comment">/* 获取手机号 */</span>
                <span class="hljs-keyword">var</span> mobile = $.trim($(<span class="hljs-string">'#mobile'</span>).val());
                <span class="hljs-comment">/* 判断是否输入内容，没有的话提示信息 */</span>
                <span class="hljs-keyword">if</span> (!mobile) {
                    showTip(<span class="hljs-string">'请输入手机号'</span>);
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-comment">/* 判断手机格式 不正确的话提示信息 */</span>
                <span class="hljs-keyword">var</span> regPhone = <span class="hljs-regexp">/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/</span>;
                <span class="hljs-keyword">if</span> (!regPhone.test(mobile)) {
                    showTip(<span class="hljs-string">'请输入正确的手机号'</span>);
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-comment">/* 调取短信验证码接口 */</span>
                $.ajax({
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'registerCode.php'</span>,
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                    <span class="hljs-attr">data</span>: {
                        <span class="hljs-attr">mobile</span>: mobile
                    },
                    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10000</span>) {
                            <span class="hljs-comment">/* 给发送成功的按钮添加一个倒计时 */</span>
                            <span class="hljs-keyword">var</span> time = <span class="hljs-built_in">parseInt</span>(data.result.time);
                            <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                time--;
                                $btn.val(time + <span class="hljs-string">'秒后再次获取'</span>);
                                <span class="hljs-comment">/* 倒计时完成之后  恢复按钮*/</span>
                                <span class="hljs-keyword">if</span> (time &lt;= <span class="hljs-number">0</span>) {
                                    $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                                    clearInterval(timer);
                                }
                            }, <span class="hljs-number">1000</span>);
                        } <span class="hljs-keyword">else</span> {
                            <span class="hljs-comment">/* 逻辑上的失败 */</span>
                            $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        }
                    },
                    <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">/* 当接口失败，提示短信接口繁忙 */</span>
                        showTip(<span class="hljs-string">'短信接口繁忙'</span>);
                        $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                    },
                    <span class="hljs-attr">beforeSend</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">/* 点击之后，显示正在发送 */</span>
                        $btn.val(<span class="hljs-string">'正在发送...'</span>).addClass(<span class="hljs-string">'disabled'</span>);
                    }
                });
                $btn.addClass(<span class="hljs-string">'disabled'</span>);
            });
            <span class="hljs-comment">/* 2.注册功能的实现 */</span>
            $(<span class="hljs-string">'.submit'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">/* 当前点击的按钮 */</span>
                <span class="hljs-keyword">var</span> $btn = $(<span class="hljs-keyword">this</span>);
                <span class="hljs-comment">/* 正在请求当中 不能再次点击 */</span>
                <span class="hljs-keyword">if</span> ($btn.hasClass(<span class="hljs-string">'disabled'</span>)) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-keyword">var</span> username = $(<span class="hljs-string">"#name"</span>).val().trim();
                <span class="hljs-keyword">var</span> password = $(<span class="hljs-string">"#pass"</span>).val().trim();
                <span class="hljs-keyword">var</span> repeatPassword = $(<span class="hljs-string">"#repass"</span>).val().trim();
                <span class="hljs-keyword">var</span> code = $(<span class="hljs-string">"#code"</span>).val().trim();
                <span class="hljs-keyword">var</span> phoneNum = $(<span class="hljs-string">"#mobile"</span>).val().trim();

                <span class="hljs-comment">/* 调注册接口 */</span>
                $.ajax({
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'register.php'</span>,
                    <span class="hljs-attr">data</span>: {
                        <span class="hljs-attr">name</span>: username,
                        <span class="hljs-attr">pass</span>: password,
                        <span class="hljs-attr">repass</span>: repeatPassword,
                        <span class="hljs-attr">code</span>: code,
                        <span class="hljs-attr">mobile</span>: phoneNum
                    },
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                    <span class="hljs-comment">// beforeSend: function() {</span>
                    <span class="hljs-comment">//     /* 显示正在提交 不能再次发送（防止重复提交）*/</span>
                    <span class="hljs-comment">//     $btn.val('正在提交...').addClass('disabled');</span>
                    <span class="hljs-comment">// },</span>
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-comment">/* 当接口成功 */</span>
                        <span class="hljs-comment">/* 状态码 10000 成功 */</span>
                        <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10000</span>) {
                            <span class="hljs-comment">/* 提示+跳转登录页 */</span>
                            showTip(<span class="hljs-string">'恭喜'</span> + data.result.name + <span class="hljs-string">'注册成功,3后秒自动前往登录页'</span>);
                            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                location.href = <span class="hljs-string">'http://www.baidu.com/'</span>;
                            }, <span class="hljs-number">3000</span>);
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10001</span>) {
                            <span class="hljs-comment">/* 输入框提示 */</span>
                            $(<span class="hljs-string">'.error'</span>).html(<span class="hljs-string">'用户名已注册'</span>);
                            <span class="hljs-comment">/* 恢复按钮 */</span>
                            $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10002</span>) {
                            showTip(<span class="hljs-string">'请输入用户名'</span>);
                            <span class="hljs-comment">/* 恢复按钮 */</span>
                            $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        }
                    },
                    <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        showTip(<span class="hljs-string">'系统繁忙！'</span>);
                        $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                    }
                })
            });
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677279?w=573&amp;h=381" src="https://static.alili.tech/img/remote/1460000013677279?w=573&amp;h=381" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader22">10. jQuery 插件的使用</h2>
<blockquote>插件：<code>plugin</code>，<code>jQuery</code>不可能包含所有的功能，所以就出现了成百上千的插件，帮助我们扩展<code>jQuery</code>的功能。</blockquote>
<p>最新最全的插件可以参考<code>jQuery</code>官方网站的<a href="http://plugins.jquery.com/" rel="nofollow noreferrer" target="_blank">插件版块</a>。</p>
<h3 id="articleHeader23">10.1 颜色插件-jQuery.color.js</h3>
<blockquote>
<code>animate</code>不支持颜色的渐变，但是使用了<code>jquery.color.js</code>后，就可以支持颜色的渐变了。</blockquote>
<p><strong>使用步骤：</strong></p>
<ul>
<li>先引入<code>jQuery</code>，再引入<code>jquery.color.js</code>
</li>
<li>使用插件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 引入js -->
<script src=&quot;../js/jquery-3.2.1.min.js&quot;></script>
<script src=&quot;../js/plugins/jquery.color.js&quot;></script>

<!-- 样式部分 -->
<style>
    .box {
        width: 300px;
        height: 300px;
        background: aquamarine;
    }
</style>

<!-- html 部分 -->
<input type=&quot;button&quot; id=&quot;btn&quot; value=&quot;点击过渡&quot;>
<div class=&quot;box&quot;></div>

<!-- js 部分 -->
<script>
    $(function() {
        $('#btn').click(function() {
            $('.box').animate({
                backgroundColor: &quot;#f45f45&quot;
            }, 1000);
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 引入js --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/jquery-3.2.1.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../js/plugins/jquery.color.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">background</span>: aquamarine;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"点击过渡"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $(<span class="hljs-string">'.box'</span>).animate({
                <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">"#f45f45"</span>
            }, <span class="hljs-number">1000</span>);
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader24">10.2 懒加载插件- jquery.lazyload.js</h3>
<p><strong>什么是懒加载？</strong></p>
<blockquote>懒加载也就是延迟加载。当访问一个页面的时候，先把<code>img</code>元素或是其他元素的背景图片路径替换成一张大小为<code>1*1px</code>图片的路径（这样就只需请求一次，俗称占位图），只有当图片出现在浏览器的可视区域内时，才设置图片正真的路径，让图片显示出来。这就是图片懒加载。</blockquote>
<p><strong>为什么要使用懒加载？</strong></p>
<blockquote>很多页面，内容很丰富，页面很长，图片较多。比如说各种商城页面。这些页面图片数量多，而且比较大，少说百来K，多则上兆。要是页面载入就一次性加载完毕。估计大家都会等到黄花变成黄花菜了。</blockquote>
<p><strong>懒加载的原理是什么？</strong></p>
<blockquote>页面中的<code>img</code>元素，如果没有<code>src</code>属性，浏览器就不会发出请求去下载图片，只有通过<code>javascript</code>设置了图片路径，浏览器才会发送请求。<p>懒加载的原理就是先在页面中把所有的图片统一使用一张占位图进行占位，把正真的路径存在元素的“<code>data-url</code>”（这个名字起个自己认识好记的就行）属性里，要用的时候就取出来，再设置；</p>
</blockquote>
<p><strong>懒加载的实现步骤？</strong></p>
<blockquote>首先，不要将图片地址放到<code>src</code>属性中，而是放到其它属性(<code>data-url</code>)中。<p>页面加载完成后，根据<code>scrollTop</code>判断图片是否在用户的视野内，如果在，则将<code>data-url</code>属性中的值取出存放到<code>src</code>属性中。</p>
<p>在滚动事件中重复判断图片是否进入视野，如果进入，则将<code>data-url</code>属性中的值取出存放到<code>src</code>属性中。</p>
</blockquote>
<p><strong>插件使用：</strong></p>
<ul>
<li>首先，这里图片的自定义属性就要用<code>data-original</code>；</li>
<li>在<code>jQ</code>中找到图片元素，给它加上一个<code>lazyload()</code>函数。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 样式部分 -->
<style>
    center {
        margin-top: 1200px;
    }
    
    div {
        margin-bottom: 10px;
    }
    
    img {
        width: 500px;
        height: 350px;
    }
</style>

<!-- html 部分 -->
<center id=&quot;box&quot;>
    <div><img src=&quot;&quot; data-original=&quot;http://ww1.sinaimg.cn/large/9c47d583gy1fjgqik3k1kj211y0lcdji.jpg&quot; alt=&quot;当你看不见图片的时候，你才会看到这里的字&quot;></div>
</center>

<!-- js 部分 -->
<script>
    $(function() {
        //使用插件
        $(&quot;img&quot;).lazyload();
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 样式部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">center</span> {
        <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">1200px</span>;
    }
    
    <span class="hljs-selector-tag">div</span> {
        <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
    }
    
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">350px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-comment">&lt;!-- html 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">center</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">""</span> <span class="hljs-attr">data-original</span>=<span class="hljs-string">"http://ww1.sinaimg.cn/large/9c47d583gy1fjgqik3k1kj211y0lcdji.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"当你看不见图片的时候，你才会看到这里的字"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">center</span>&gt;</span>

<span class="hljs-comment">&lt;!-- js 部分 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//使用插件</span>
        $(<span class="hljs-string">"img"</span>).lazyload();
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader25">10.3 jQuery UI 插件</h3>
<blockquote>
<code>jQuery UI</code> 是一个建立在 <code>jQuery JavaScript</code> 库上的小部件和交互库，您可以使用它创建高度交互的 <code>Web</code> 应用程序。</blockquote>
<p><strong>下载地址：</strong><a href="http://jqueryui.com/download/" rel="nofollow noreferrer" target="_blank">点击这里跳转到官网下载</a></p>
<h3 id="articleHeader26">10.4 jQuery自定义插件</h3>
<blockquote>虽然网上的插件有很多，但是可能不是我们完全想要的，其中可能还穿插着其他的功能，所以我们也可以自己封装一个<code>jQuery</code>插件，</blockquote>
<p><em>有三种方式为所有<code>jQuery</code>对象添加方法，在创建一个<code>jQuery</code>插件的时候，我们只需要将添加的方法保存为一个<code>js</code>文件，再去引用它即可。</em></p>
<p><strong>1、<code>$.prototype</code>方法添加</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.prototype.setStyle = function(){

};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.prototype.setStyle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

};</code></pre>
<p><strong>2、<code>$.fn.setStyle</code>方法添加</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        $.fn.setStyle = function(){

        };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">        $.fn.setStyle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

        };</code></pre>
<p><strong>3、<code>$.fn.extend({})</code>方法添加</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// extend可以新增多个方法
$.fn.extend({
    setStyle:function(){

    },
    setPosition:function(){
        
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// extend可以新增多个方法</span>
$.fn.extend({
    <span class="hljs-attr">setStyle</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

    },
    <span class="hljs-attr">setPosition</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        
    }
});</code></pre>
<p><strong>示例代码：</strong></p>
<blockquote>通过上面三种方法的任何一种，为<code>jQuery</code>添加一个插件<code>setStyle</code>。</blockquote>
<p>创建插件<code>jquery.setStyle.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 给jQuery里面添加一个setStyle方法
// (function(){})()的作用是函数自调用，避免全局污染。是一种设计模式：沙箱模式
(function(){
    $.fn.setStyle = function(){
        this.css({
            width:400,
            height:400,
            backgroundColor:&quot;pink&quot;
        });
        return this;
    }

})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 给jQuery里面添加一个setStyle方法</span>
<span class="hljs-comment">// (function(){})()的作用是函数自调用，避免全局污染。是一种设计模式：沙箱模式</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $.fn.setStyle = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">this</span>.css({
            <span class="hljs-attr">width</span>:<span class="hljs-number">400</span>,
            <span class="hljs-attr">height</span>:<span class="hljs-number">400</span>,
            <span class="hljs-attr">backgroundColor</span>:<span class="hljs-string">"pink"</span>
        });
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    }

})()</code></pre>
<p>使用插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;></div>

<script src=&quot;jquery.min.js&quot;></script>
<script src=&quot;jquery.setStyle.js&quot;></script>
<script>
    // 弹出123
    $(&quot;#box&quot;).setStyle();
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.setStyle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// 弹出123</span>
    $(<span class="hljs-string">"#box"</span>).setStyle();
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>沙箱模式</strong>：<em><code>(function(){})()</code>的作用是函数自调用，避免全局污染。是一种设计模式：沙箱模式</em></p>
<h3 id="articleHeader27">10.5 jQuery自定义插件-瀑布流插件</h3>
<blockquote>用<code>jQuery</code>封装一个瀑布流插件，前面特效篇已经讲过了瀑布流的原理，不明白的小伙伴，建议先去看看原生实现的原理(<a href="https://segmentfault.com/a/1190000012621936">《原生js实现瀑布流效果》</a>)，再来学习<code>jQuery</code>封装。</blockquote>
<p><strong>主页面部分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>瀑布流</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: &quot;Microsoft Yahei&quot;;
            background: #f5f5f5;
        }
        .box {
            width: 1200px;
            margin: 0 auto;
            padding-top: 40px
        }
        .box > .items {
            position: relative;
        }
        .box > .items > .item {
            width: 220px;
            box-shadow: 2px 2px 2px #999;
            position: absolute;
        }
        .box > .items > .item > p {
            margin: 0;
            padding: 10px;
            background: #fff;
        }
        .box > .items > .item > img {
            width: 100%;
            display: block
        }
        .box > .btn {
            width: 280px;
            height: 40px;
            margin: 30px auto;
            text-align: center;
            line-height: 40px;
            background-color: #CCC;
            border-radius: 6px;
            font-size: 24px;
            cursor: pointer;
        }
        .box > .loading {
            background-color: transparent;
        }
        
    </style>
</head>

<body>
    <div class=&quot;box&quot;>
        <div class=&quot;items&quot;>
            <div class=&quot;item&quot;>
                <img src=&quot;image/001.jpg&quot; alt=&quot;&quot;>
                <p>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</p>
            </div>
                    .
                    .
                    .
            <div class=&quot;item&quot;>
                <img src=&quot;image/030.jpg&quot; alt=&quot;&quot;>
                <p>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。</p>
            </div>

        </div>
        <div class=&quot;btn&quot;>正在加载...</div>
    </div>

    <script src=&quot;jquery.min.js&quot;></script>
    <script src=&quot;jquery.waterfull.js&quot;></script>
    <script>
        // 一定要写在入口函数内，保证图片加载完在计算高度
        window.onload = function(){
            $(&quot;.items&quot;).waterfull();
        }
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>瀑布流<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Microsoft Yahei"</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5f5f5</span>;
        }
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">40px</span>
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> {
            <span class="hljs-attribute">position</span>: relative;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#999</span>;
            <span class="hljs-attribute">position</span>: absolute;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> &gt; <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> &gt; <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">display</span>: block
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.btn</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">280px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCC</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.loading</span> {
            <span class="hljs-attribute">background-color</span>: transparent;
        }
        
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"items"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image/001.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    .
                    .
                    .
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"image/030.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>云想衣裳花想容，春风拂槛露华浓。若非群玉山头见，会向瑶台月下逢。<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>正在加载...<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.waterfull.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">// 一定要写在入口函数内，保证图片加载完在计算高度</span>
        <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            $(<span class="hljs-string">".items"</span>).waterfull();
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>封装插件jquery.waterfull.js：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    $.fn.waterfull = function(){
        // 1-确定要排多少列
        var columns = 5;

        // 2-获取每一个元素的宽度
        // this指的是当前调用的对象items 要获取的是item的宽度
        var width = this.children().width();

        // 3-计算间隔 gap：左右间隔 gap_t：上下间隔
        var gap = (this.width() - width * columns) / (columns - 1);
        var gap_t = 10;
        // 4-声明一个数组，用来存放所有item的高度值
        var heightArr = [];
        
        // 5-遍历所有item
        this.children().each(function(index,ele){
            // 5-1 排列第一行
            // 判断当前遍历的item索引小于列数的时候，说明是第一行
            if(index < columns){
                // 将ele对象转化成DOM对象，再设置它的top 和 left
                $(ele).css({
                    top:0,
                    left:index * (width +gap)
                });
                // 5-2 将第一行每一个item的高度存到数组中
                heightArr.push($(ele).height());
            }else{
                // 5-3 计算heightArr数组里面的最小值,并记录下最小值的列数即索引
                var minHeight = heightArr[0];
                var minIndex = 0;
                $.each(heightArr,function(index,value){
                    if(minHeight > value){
                        minHeight = value;
                        minIndex = index;
                    }
                });

                // 5-5 当剩下的item排在最小列下面的时候，要在数组中，跟新这个最小列的高度
                heightArr[minIndex] += $(ele).height() + gap_t;
 
                // 5-4 排列剩下的行数，下面的item放到上一行最小高度的下面，依次列推
                // 设定定位的top值， 10 是上下的间距
                var top = minHeight + gap_t;
                // 设定定位的left值，即高度最小列的索引乘以item的宽度加上间隙
                var left = minIndex * (width + gap);
                $(ele).css({
                    top: top,
                    left: left
                });
            }
            
            // 6-设置加载按钮的位置，只需要将items设置一个高度即可
            // 加载按钮的位置应该在heightArr数组里最大高度值的哪一个item的下面
            var maxHeight = heightArr[0];
            $.each(heightArr,function(index,value){
                maxHeight = maxHeight > value ? maxHeight : value;
            });
            // 设置items的高度 this指的是每一个item
            $(this).parent().height(maxHeight);
        })
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    $.fn.waterfull = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 1-确定要排多少列</span>
        <span class="hljs-keyword">var</span> columns = <span class="hljs-number">5</span>;

        <span class="hljs-comment">// 2-获取每一个元素的宽度</span>
        <span class="hljs-comment">// this指的是当前调用的对象items 要获取的是item的宽度</span>
        <span class="hljs-keyword">var</span> width = <span class="hljs-keyword">this</span>.children().width();

        <span class="hljs-comment">// 3-计算间隔 gap：左右间隔 gap_t：上下间隔</span>
        <span class="hljs-keyword">var</span> gap = (<span class="hljs-keyword">this</span>.width() - width * columns) / (columns - <span class="hljs-number">1</span>);
        <span class="hljs-keyword">var</span> gap_t = <span class="hljs-number">10</span>;
        <span class="hljs-comment">// 4-声明一个数组，用来存放所有item的高度值</span>
        <span class="hljs-keyword">var</span> heightArr = [];
        
        <span class="hljs-comment">// 5-遍历所有item</span>
        <span class="hljs-keyword">this</span>.children().each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index,ele</span>)</span>{
            <span class="hljs-comment">// 5-1 排列第一行</span>
            <span class="hljs-comment">// 判断当前遍历的item索引小于列数的时候，说明是第一行</span>
            <span class="hljs-keyword">if</span>(index &lt; columns){
                <span class="hljs-comment">// 将ele对象转化成DOM对象，再设置它的top 和 left</span>
                $(ele).css({
                    <span class="hljs-attr">top</span>:<span class="hljs-number">0</span>,
                    <span class="hljs-attr">left</span>:index * (width +gap)
                });
                <span class="hljs-comment">// 5-2 将第一行每一个item的高度存到数组中</span>
                heightArr.push($(ele).height());
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-comment">// 5-3 计算heightArr数组里面的最小值,并记录下最小值的列数即索引</span>
                <span class="hljs-keyword">var</span> minHeight = heightArr[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">var</span> minIndex = <span class="hljs-number">0</span>;
                $.each(heightArr,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index,value</span>)</span>{
                    <span class="hljs-keyword">if</span>(minHeight &gt; value){
                        minHeight = value;
                        minIndex = index;
                    }
                });

                <span class="hljs-comment">// 5-5 当剩下的item排在最小列下面的时候，要在数组中，跟新这个最小列的高度</span>
                heightArr[minIndex] += $(ele).height() + gap_t;
 
                <span class="hljs-comment">// 5-4 排列剩下的行数，下面的item放到上一行最小高度的下面，依次列推</span>
                <span class="hljs-comment">// 设定定位的top值， 10 是上下的间距</span>
                <span class="hljs-keyword">var</span> top = minHeight + gap_t;
                <span class="hljs-comment">// 设定定位的left值，即高度最小列的索引乘以item的宽度加上间隙</span>
                <span class="hljs-keyword">var</span> left = minIndex * (width + gap);
                $(ele).css({
                    <span class="hljs-attr">top</span>: top,
                    <span class="hljs-attr">left</span>: left
                });
            }
            
            <span class="hljs-comment">// 6-设置加载按钮的位置，只需要将items设置一个高度即可</span>
            <span class="hljs-comment">// 加载按钮的位置应该在heightArr数组里最大高度值的哪一个item的下面</span>
            <span class="hljs-keyword">var</span> maxHeight = heightArr[<span class="hljs-number">0</span>];
            $.each(heightArr,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index,value</span>)</span>{
                maxHeight = maxHeight &gt; value ? maxHeight : value;
            });
            <span class="hljs-comment">// 设置items的高度 this指的是每一个item</span>
            $(<span class="hljs-keyword">this</span>).parent().height(maxHeight);
        })
    }
})()</code></pre>
<p><a href="https://segmentfault.com/a/1190000013677113" target="_blank">上一篇：jQuery 入门详解（一）</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery 入门详解（二）

## 原文链接
[https://segmentfault.com/a/1190000013677253](https://segmentfault.com/a/1190000013677253)

