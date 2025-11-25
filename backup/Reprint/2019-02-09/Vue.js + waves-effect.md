---
title: 'Vue.js + waves-effect' 
date: 2019-02-09 2:30:58
hidden: true
slug: 8cke6r1xe89
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Vue.js</h2>
<p><a href="http://www.google.com/design/spec/material-design/" rel="nofollow noreferrer" target="_blank">Material Design</a> 谷歌推出了全新的设计语言Material Design。谷歌表示，这种设计语言旨在为手机、平板电脑、台式机和“其他平台”提供更一致、更广泛的“外观和感觉”。（网上copy的）</p>
<p><a href="http://www.materialscss.com/" rel="nofollow noreferrer" target="_blank">Materialize 前端框架</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 引用 materialize 的样式 -->
<link href=&quot;http://cdn.bootcss.com/materialize/0.97.6/css/materialize.min.css&quot; rel=&quot;stylesheet&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 引用 materialize 的样式 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http://cdn.bootcss.com/materialize/0.97.6/css/materialize.min.css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span></code></pre>
<p><a href="http://cn.vuejs.org/guide/custom-directive.html" rel="nofollow noreferrer" target="_blank">Vue.js 自定义指令</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// directive
Vue.directive('effect', {
    bind: function() {
        var el = this.el
        el.classList.add('waves-effect')
        this.expression &amp;&amp; el.classList.add('waves-' + this.expression)
        function convertStyle(obj) {
            var style = '';
            for (var a in obj) {
                if (obj.hasOwnProperty(a)) {
                    style += (a + ':' + obj[a] + ';');
                }
            }
            return style;
        }
        this.handler = function(e) {
            var ripple = document.createElement('div');
            ripple.classList.add('waves-ripple');
            el.appendChild(ripple);
            var styles = {
                'left': e.layerX + 'px',
                'top': e.layerY + 'px',
                'opacity': 1,
                'transform': 'scale(' + ((el.clientWidth / 100) * 10) + ')',
                'transition-duration': '750ms',
                'transition-timing-function': 'cubic-bezier(0.250, 0.460, 0.450, 0.940)'
            };
            ripple.setAttribute('style', convertStyle(styles));
            setTimeout(function() {
                ripple.setAttribute('style', convertStyle({
                    'opacity': 0,
                    'transform': styles.transform,
                    'left': styles.left,
                    'top': styles.top
                }));
                setTimeout(function() {
                    ripple &amp;&amp; el.removeChild(ripple);
                }, 750);
                // 
            }, 450);
        }
        this.el.addEventListener('mousedown', this.handler, false)
    },
    unbind: function() {
        this.el.removeEventListener('mousedown', this.handler)
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// directive</span>
Vue.directive(<span class="hljs-string">'effect'</span>, {
    <span class="hljs-attr">bind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> el = <span class="hljs-keyword">this</span>.el
        el.classList.add(<span class="hljs-string">'waves-effect'</span>)
        <span class="hljs-keyword">this</span>.expression &amp;&amp; el.classList.add(<span class="hljs-string">'waves-'</span> + <span class="hljs-keyword">this</span>.expression)
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">convertStyle</span>(<span class="hljs-params">obj</span>) </span>{
            <span class="hljs-keyword">var</span> style = <span class="hljs-string">''</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> a <span class="hljs-keyword">in</span> obj) {
                <span class="hljs-keyword">if</span> (obj.hasOwnProperty(a)) {
                    style += (a + <span class="hljs-string">':'</span> + obj[a] + <span class="hljs-string">';'</span>);
                }
            }
            <span class="hljs-keyword">return</span> style;
        }
        <span class="hljs-keyword">this</span>.handler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            <span class="hljs-keyword">var</span> ripple = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
            ripple.classList.add(<span class="hljs-string">'waves-ripple'</span>);
            el.appendChild(ripple);
            <span class="hljs-keyword">var</span> styles = {
                <span class="hljs-string">'left'</span>: e.layerX + <span class="hljs-string">'px'</span>,
                <span class="hljs-string">'top'</span>: e.layerY + <span class="hljs-string">'px'</span>,
                <span class="hljs-string">'opacity'</span>: <span class="hljs-number">1</span>,
                <span class="hljs-string">'transform'</span>: <span class="hljs-string">'scale('</span> + ((el.clientWidth / <span class="hljs-number">100</span>) * <span class="hljs-number">10</span>) + <span class="hljs-string">')'</span>,
                <span class="hljs-string">'transition-duration'</span>: <span class="hljs-string">'750ms'</span>,
                <span class="hljs-string">'transition-timing-function'</span>: <span class="hljs-string">'cubic-bezier(0.250, 0.460, 0.450, 0.940)'</span>
            };
            ripple.setAttribute(<span class="hljs-string">'style'</span>, convertStyle(styles));
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                ripple.setAttribute(<span class="hljs-string">'style'</span>, convertStyle({
                    <span class="hljs-string">'opacity'</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-string">'transform'</span>: styles.transform,
                    <span class="hljs-string">'left'</span>: styles.left,
                    <span class="hljs-string">'top'</span>: styles.top
                }));
                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    ripple &amp;&amp; el.removeChild(ripple);
                }, <span class="hljs-number">750</span>);
                <span class="hljs-comment">// </span>
            }, <span class="hljs-number">450</span>);
        }
        <span class="hljs-keyword">this</span>.el.addEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-keyword">this</span>.handler, <span class="hljs-literal">false</span>)
    },
    <span class="hljs-attr">unbind</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.el.removeEventListener(<span class="hljs-string">'mousedown'</span>, <span class="hljs-keyword">this</span>.handler)
    }
})</code></pre>
<p>使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <div class=&quot;container&quot; style=&quot;padding:20px 0&quot;>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;light&quot;> Button effect - light</button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;red&quot;> Button effect - red </button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;yellow&quot;> Button effect - yellow</button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;orange&quot;> Button effect - orange</button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;purple&quot;> Button effect - purple</button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;green&quot;> Button effect - green</button>
        </p>
        <p>
            <button type=&quot;button&quot; class=&quot;btn btn-large&quot; v-effect=&quot;teal&quot;> Button effect - teal</button>
        </p>
    </div>
</div>

<script>
    new Vue({
        el: '#app'
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"padding:20px 0"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"light"</span>&gt;</span> Button effect - light<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"red"</span>&gt;</span> Button effect - red <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"yellow"</span>&gt;</span> Button effect - yellow<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"orange"</span>&gt;</span> Button effect - orange<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"purple"</span>&gt;</span> Button effect - purple<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"green"</span>&gt;</span> Button effect - green<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-large"</span> <span class="hljs-attr">v-effect</span>=<span class="hljs-string">"teal"</span>&gt;</span> Button effect - teal<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">'#app'</span>
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>效果传送门 <a href="https://jsfiddle.net/chexian/m02j8gvh/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/chexian/m02j8gvh/</a><button class="btn btn-xs btn-default ml10 preview" data-url="chexian/m02j8gvh/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js + waves-effect

## 原文链接
[https://segmentfault.com/a/1190000005728850](https://segmentfault.com/a/1190000005728850)

