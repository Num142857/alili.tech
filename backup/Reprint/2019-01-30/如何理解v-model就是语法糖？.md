---
title: '如何理解v-model就是语法糖？' 
date: 2019-01-30 2:30:23
hidden: true
slug: ju4kedxlrd
categories: [reprint]
---

{{< raw >}}

                    
<p>绑定表单控件和绑定普通控件并无二致。但是因为控件绑定常常涉及到双向绑定，此时使用v-model让它更加简单。比如checkbox：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div id=&quot;app&quot;>
  <input type=&quot;checkbox&quot; v-bind:checked=&quot;checked&quot;>v-bind</input><br/>
  <label>"{{" checked "}}"</label>
</div>
<script>
  var a= new Vue({
    el: '#app',
    data(){
      return {checked : true} 
    }
  }
)
</script> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">v-bind:checked</span>=<span class="hljs-string">"checked"</span>&gt;</span>v-bind<span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span></span><span class="hljs-template-variable">"{{" checked "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> a= <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    data(){
      <span class="hljs-keyword">return</span> {checked : <span class="hljs-literal">true</span>} 
    }
  }
)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
</span></code></pre>
<p>把checked数据绑定到input的checked属性上。然而，这样的绑定都是单向的，就是说：</p>
<ol>
<li><p>如果checked数据修改了，那么DOM属性就会修改</p></li>
<li><p>如果DOM属性修改了，checked数据并不会修改</p></li>
</ol>
<p>所以，当我们点击界面上的输入控件时，尽管此控件会打钩或者去掉打钩，但是label的文字并不会更新。</p>
<p>由于在vue2.0中，之前有的.sync修饰符本来可以做双向绑定，但是此特性已经被删除，所以如果想要使用v-bind做到双向绑定的话，可以加入事件来监视变化，并更新checked数据即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div id=&quot;app&quot;>
  <input type=&quot;checkbox&quot; ref=&quot;c2&quot;v-bind:checked=&quot;checked&quot; @change=&quot;change&quot;>v-bind</input><br/>
<label for=&quot;checkbox&quot;>"{{" checked "}}"</label>
</div>
<script>
  var a= new Vue({
    el: '#app',
    data(){
      return {checked : true} 
    },
    methods:{
      change(){
        this.checked = this.$refs.c2.checked
      }
    }
  }
)
</script> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"c2"</span><span class="hljs-attr">v-bind:checked</span>=<span class="hljs-string">"checked"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"change"</span>&gt;</span>v-bind<span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox"</span>&gt;</span></span><span class="hljs-template-variable">"{{" checked "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> a= <span class="hljs-keyword">new</span> Vue({
    el: <span class="hljs-string">'#app'</span>,
    data(){
      <span class="hljs-keyword">return</span> {checked : <span class="hljs-literal">true</span>} 
    },
    methods:{
      change(){
        <span class="hljs-keyword">this</span>.checked = <span class="hljs-keyword">this</span>.$refs.c2.checked
      }
    }
  }
)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
</span></code></pre>
<p>这样做也太麻烦了，鉴于双向绑定也比较常用的，因此vue引入了一个指令v-model,可以使用它简化此工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<div id=&quot;app&quot;>
  <input type=&quot;checkbox&quot; v-model=&quot;checked&quot;>v-model</input><br/>
  <label for=&quot;checkbox&quot;>"{{" checked "}}"</label>
</div>
<script>
  var a= new Vue({
      el: '#app',
      data(){return {checked : true} }
    }
  )
</script> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"checked"</span>&gt;</span>v-model<span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">br</span>/&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"checkbox"</span>&gt;</span></span><span class="hljs-template-variable">"{{" checked "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  <span class="hljs-keyword">var</span> a= <span class="hljs-keyword">new</span> Vue({
      el: <span class="hljs-string">'#app'</span>,
      data(){<span class="hljs-keyword">return</span> {checked : <span class="hljs-literal">true</span>} }
    }
  )
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> 
</span></code></pre>
<p>可以用v-model指令在控件上创建双向数据绑定。正如我们已经看到的v-model是v-bind和v-on的语法糖，但是确实很甜。</p>
<p>作者：刘传君</p>
<p>创建过产品，创过业。好读书，求甚解。<br>可以通过 1000copy#gmail.com 联系到我</p>
<h2 id="articleHeader0">出品</h2>
<p>bootstrap小书 <a href="https://www.gitbook.com/book/1000copy/bootstrap/details" rel="nofollow noreferrer" target="_blank">https://www.gitbook.com/book/...</a><br>http小书 <a href="http://www.ituring.com.cn/book/1791" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a><br>Git小书  <a href="http://www.ituring.com.cn/book/1870" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/boo...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何理解v-model就是语法糖？

## 原文链接
[https://segmentfault.com/a/1190000007662815](https://segmentfault.com/a/1190000007662815)

