---
title: '浅谈DOMContentLoaded事件及其封装方法' 
date: 2019-02-07 2:30:16
hidden: true
slug: 24mb5tawox4
categories: [reprint]
---

{{< raw >}}

                    
<p>我们在开发时，经常需要检测页面是否加载完毕，以确保脚本安全运行，下面我们就来浅谈一下检测页面是否加载完毕的那些事件们。</p>
<h2 id="articleHeader0">1. onload 事件</h2>
<p>在页面的所有资源加载完成时，window对象上会触发一个<code>onload</code>事件。该事件通常被用以执行一些逻辑代码。比如，你需要通过JS去访问一个DOM。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    console.log(document.getElementById('name').innerHTML);
</script>
<div id=&quot;name&quot;>chengxuyuan</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'name'</span>).innerHTML);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name"</span>&gt;</span>chengxuyuan<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>上述代码运行时肯定会报错，因为脚本执行时，id为name的<code>div</code>还没有加载完成。那么什么时机才是我们获取DOM文档的可靠时机呢？正是我们上面说道的<code>onload</code>，页面的<code>onload</code>触发时，证明页面文档流及资源已经完全加载完毕，此时，获取在文档流中的DOM是最“安全”的时机。我们将上述代码加以改造，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    window.onload = function () {
        console.log(document.getElementById('myname').innerHTML);
    }
</script>
<div id=&quot;myname&quot;>chengxuyuan</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myname'</span>).innerHTML);
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myname"</span>&gt;</span>chengxuyuan<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>再次运行时，代码便不会报错了。因此，<code>onload</code>事件的实际效果是当页面解析完DOM树，并且完成了所有图片、样式表、脚本等资源的加载后才被触发。那么问题来了，当资源过多过大时，<code>onload</code>会出现比较严重的延迟问题，严重影响用户体验。</p>
<h2 id="articleHeader1">2. DOMContentLoaded 事件</h2>
<p>对比上述情况，Firefox的<code>DOMContentLoaded</code>事件就更加合理，该方法触发的时间更早，它在DOM内容加载完后就触发，无需等待其他资源的加载完成。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    window.onload = function () {
        console.log('页面资源全部加载完毕');
    }
    document.addEventListener(&quot;DOMContentLoaded&quot;, function(event) {
        console.log('DOM已被完全加载和解析');
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'页面资源全部加载完毕'</span>);
    }
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'DOM已被完全加载和解析'</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>上述代码的执行结果为依次打印出：</p>
<blockquote><p>DOM已被完全加载和解析 <br>页面资源全部加载完毕</p></blockquote>
<p>由此可见，<code>DOMContentLoaded</code>事件能更早地捕获到DOM加载完成。</p>
<p>目前，Webkit 525以上版本和Opera也包含该方法。此外，它目前已在HTML5中被标准化。但IE仍不支持<code>DOMContentLoaded</code>。</p>
<p>另外，很多JavaScript框架都有document.ready功能，例如jQuery的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(document).ready(function(){});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{});</code></pre>
<p>它的核心就是<code>DOMContentLoaded</code>事件，可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener(&quot;DOMContentLoaded&quot;,function(){...},false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code style="word-break: break-word; white-space: initial;">document.addEventListener(<span class="hljs-string">"DOMContentLoaded"</span>,function()<span class="hljs-meta">{...}</span>,<span class="hljs-literal">false</span>);</code></pre>
<p>进行事件绑定，但还是需要针对IE做兼容性处理。</p>
<h2 id="articleHeader2">3. onreadystatechange 事件</h2>
<p>虽然IE不支持<code>DOMContentLoaded</code>，但它支持<code>onreadystatechange</code>事件，该事件的目的是提供与文档或元素的加载状态有关的信息。支持<code>onreadystatechange</code>事件的每个对象都有一个<code>readyState</code>属性，可能包含下列5个值中的一个。</p>
<ul>
<li><p><code>uninitialized</code>(为初始化)：对象存在但尚未初始化。</p></li>
<li><p><code>loading</code>(正在加载)：对象正在加载数据。</p></li>
<li><p><code>loaded</code>(加载完毕)：对象加载数据完成。</p></li>
<li><p><code>interactive</code>(交互)：可以操作对象了，但还没有完全加载。</p></li>
<li><p><code>complete</code>(完成)：对象已经加载完毕。</p></li>
</ul>
<p><code>onreadystatechange</code>事件可以用于检测DOM是否加载完毕，当<code>document.readyState == 'complete'</code>时，表示DOM加载完成。但是如果页面中有<code>iframe</code>的话，会等到<code>iframe</code>中的所有资源加载完才会变成<code>complete</code>。 此时也造成了主页面的延迟。并且，经测试，即使页面中没有<code>iframe</code>， 该方式也与<code>onload</code>相当，依然会等到所有资源下载完毕后才触发。</p>
<h2 id="articleHeader3">4. doScroll方法</h2>
<p>不过，IE还有个特有的方法<code>doScroll</code>， 通过间隔调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.doScroll(&quot;left&quot;);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>document.documentElement.doScroll(<span class="hljs-string">"left"</span>)<span class="hljs-comment">;</span>
</code></pre>
<p>可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到<code>doScroll</code>不再报错时，就代表DOM加载完成了。该方法更接近<code>DOMContentLoaded</code>的实现。</p>
<h2 id="articleHeader4">5. Javascript封装DOMContentLoaded事件</h2>
<p>以下，是JS封装<code>DOMContentLoaded</code>事件从而达到良好的兼容性的一个简单的代码实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ready(fn){

    // 目前Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件
    if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded',arguments.callee, false);
            fn();
        }, false);
    } 

    // 如果IE
    else if(document.attachEvent) {
        // 确保当页面是在iframe中加载时，事件依旧会被安全触发
        document.attachEvent('onreadystatechange', function() {
            if(document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee);
                fn();
            }
        });

        // 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕
        if(document.documentElement.doScroll &amp;&amp; typeof window.frameElement === &quot;undefined&quot;) {
            try{
                document.documentElement.doScroll('left');
            }
            catch(error){
                return setTimeout(arguments.callee, 20);
            };
            fn();
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ready</span>(<span class="hljs-params">fn</span>)</span>{

    <span class="hljs-comment">// 目前Mozilla、Opera和webkit 525+内核支持DOMContentLoaded事件</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.addEventListener) {
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">document</span>.removeEventListener(<span class="hljs-string">'DOMContentLoaded'</span>,<span class="hljs-built_in">arguments</span>.callee, <span class="hljs-literal">false</span>);
            fn();
        }, <span class="hljs-literal">false</span>);
    } 

    <span class="hljs-comment">// 如果IE</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.attachEvent) {
        <span class="hljs-comment">// 确保当页面是在iframe中加载时，事件依旧会被安全触发</span>
        <span class="hljs-built_in">document</span>.attachEvent(<span class="hljs-string">'onreadystatechange'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.readyState == <span class="hljs-string">'complete'</span>) {
                <span class="hljs-built_in">document</span>.detachEvent(<span class="hljs-string">'onreadystatechange'</span>, <span class="hljs-built_in">arguments</span>.callee);
                fn();
            }
        });

        <span class="hljs-comment">// 如果是IE且页面不在iframe中时，轮询调用doScroll 方法检测DOM是否加载完毕</span>
        <span class="hljs-keyword">if</span>(<span class="hljs-built_in">document</span>.documentElement.doScroll &amp;&amp; <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.frameElement === <span class="hljs-string">"undefined"</span>) {
            <span class="hljs-keyword">try</span>{
                <span class="hljs-built_in">document</span>.documentElement.doScroll(<span class="hljs-string">'left'</span>);
            }
            <span class="hljs-keyword">catch</span>(error){
                <span class="hljs-keyword">return</span> setTimeout(<span class="hljs-built_in">arguments</span>.callee, <span class="hljs-number">20</span>);
            };
            fn();
        }
    }
};</code></pre>
<p>对于IE，首先注册<code>document</code>的<code>onreadystatechange</code>事件，这是为了避免当页面处于<code>iframe</code>中时，<code>doScroll</code>方法会失效，因此在实现代码中做了判断。之后，判断如果是IE并且页面不在<code>iframe</code>当中， 则通过<code>setTimeout</code>来不断的调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.documentElement.doScroll('left');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.documentElement.doScroll(<span class="hljs-string">'left'</span>);</code></pre>
<p>直到调用成功，代表DOM加载完成。</p>
<p>总结一下，开发时我们可以通过封装<code>DOMContentLoaded</code>事件来检测页面DOM是否加载完毕，然后执行逻辑代码，提升用户体验。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈DOMContentLoaded事件及其封装方法

## 原文链接
[https://segmentfault.com/a/1190000005869515](https://segmentfault.com/a/1190000005869515)

