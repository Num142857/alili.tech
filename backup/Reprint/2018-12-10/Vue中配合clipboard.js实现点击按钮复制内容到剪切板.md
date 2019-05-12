---
title: 'Vue中配合clipboard.js实现点击按钮复制内容到剪切板' 
date: 2018-12-10 2:30:07
hidden: true
slug: fetdbeamjf
categories: [reprint]
---

{{< raw >}}

                    
<h5><strong>需求设定</strong></h5>
<ol>
<li>点击某个按钮，将设置的目标内容(例如下载链接地址)复制到剪切板，可以在电脑上任何地方粘贴</li>
<li>不使用任何框架和使用<code>Flash</code>，以最小的代码实现该功能，并能兼容所有主流浏览器</li>
</ol>
<hr>
<h5><strong>插件选择</strong></h5>
<ul><li>
<code>clipboard.js</code>:</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV5PJs?w=622&amp;h=352" src="https://static.alili.tech/img/bV5PJs?w=622&amp;h=352" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>官网链接地址：<a href="https://clipboardjs.com/" rel="nofollow noreferrer" target="_blank">clipboard.js</a>
</li>
<li>
<p>引入方式：</p>
<ul>
<li>
<code>NPM方式</code>：<code>npm install clipboard --save</code>
</li>
<li>
<code>直接引入</code>：下载源代码以后将相关<code>JS</code>放在目录下，之后引入：<code>&lt;script src="xxx/clipboard.min.js"&gt;&lt;/script&gt;</code>
</li>
</ul>
</li>
<li>
<p>使用方式(官方文档例子)：</p>
<ul><li>
<code>HTML</code>(<code>target</code>包括但不限于<code>input</code>)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Target -->
<input id=&quot;foo&quot; value=&quot;https://github.com/zenorocha/clipboard.js.git&quot;>

<!-- Trigger -->
<button class=&quot;btn&quot; data-clipboard-target=&quot;#foo&quot;>
    点击复制
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- Target --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"foo"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"https://github.com/zenorocha/clipboard.js.git"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Trigger --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span> <span class="hljs-attr">data-clipboard-target</span>=<span class="hljs-string">"#foo"</span>&gt;</span>
    点击复制
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<ul><li><code>JS</code></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var clipboard = new ClipboardJS('.btn');
//成功回调
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);  
    e.clearSelection();
});
//失败回调
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> clipboard = <span class="hljs-keyword">new</span> ClipboardJS(<span class="hljs-string">'.btn'</span>);
<span class="hljs-comment">//成功回调</span>
clipboard.on(<span class="hljs-string">'success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Action:'</span>, e.action);
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Text:'</span>, e.text);
    <span class="hljs-built_in">console</span>.info(<span class="hljs-string">'Trigger:'</span>, e.trigger);  
    e.clearSelection();
});
<span class="hljs-comment">//失败回调</span>
clipboard.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Action:'</span>, e.action);
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Trigger:'</span>, e.trigger);
});</code></pre>
</li>
</ol>
<blockquote><strong>更多使用方式和功能请参考官方文档，这里只举例一个实用且常用的功能！</strong></blockquote>
<hr>
<h5><strong>兼容性：</strong></h5>
<p><span class="img-wrap"><img data-src="/img/bV5PQw?w=521&amp;h=297" src="https://static.alili.tech/img/bV5PQw?w=521&amp;h=297" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<hr>
<h5><strong><code>正文开始了！！！</code>，在<code>Vue</code>中咋用？</strong></h5>
<ol>
<li>
<code>Vue</code>项目所使用的相关插件(这仅是本人使用到<code>clipboard.js</code>那个项目用到的，不全是必须的)：<code>vue-router</code>、<code>vue-cli</code>、<code>es6-promise</code>、<code>axios</code>、<code>scss</code>、<code>element-ui</code>、<code>clipboard</code>。</li>
<li>
<p>使用<code>clipboard</code>步骤介绍开始：</p>
<ul>
<li>安装：<code>npm install clipboard --save</code>
</li>
<li>
<p>引入(<code>main.js</code>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>import <span class="hljs-built_in">clipboard</span> from '<span class="hljs-built_in">clipboard</span>'<span class="hljs-comment">;</span>
//注册到vue原型上
Vue.prototype.<span class="hljs-built_in">clipboard</span> = <span class="hljs-built_in">clipboard</span><span class="hljs-comment">;</span></code></pre>
</li>
<li>
<p><strong>template</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; id=&quot;success_form_input&quot; readonly=&quot;readonly&quot; v-model=&quot;link&quot;/>
/*button上的这个ref需要命名一个，名字自己取，下面会讲解为什么*/
<button ref=&quot;copy&quot; data-clipboard-action=&quot;copy&quot; data-clipboard-target=&quot;#success_form_input&quot; @click=&quot;copyLink&quot;>复制</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"text"</span> id=<span class="hljs-string">"success_form_input"</span> readonly=<span class="hljs-string">"readonly"</span> v-model=<span class="hljs-string">"link"</span>/&gt;
<span class="hljs-comment">/*button上的这个ref需要命名一个，名字自己取，下面会讲解为什么*/</span>
&lt;<span class="hljs-selector-tag">button</span> ref=<span class="hljs-string">"copy"</span> data-clipboard-action=<span class="hljs-string">"copy"</span> data-clipboard-target=<span class="hljs-string">"#success_form_input"</span> @click=<span class="hljs-string">"copyLink"</span>&gt;复制&lt;/button&gt;</code></pre>
</li>
<li>
<p><strong>Events</strong>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
     copyBtn: null //存储初始化复制按钮事件
  }
},
mounted() {
/*这里使用了刚开始注册到vue原型上的clipboard(使用注册到vue原型的插件的方法就是：this + 注册时命名名字)
*这里需要用到刚才给button命名的ref的名字，因为这是vue提供的获取DOM的方法，虽然可以通过引入jQuery来获取，但是不推荐这样做，具体原因可以看官方文档和网上论坛搜索
*这里是在挂载到DOM节点时将button按钮传入clipboard并存储起来，具体原因下面会有详述
*/
  this.copyBtn = new this.clipboard(this.$refs.copy);
},
methods: {
  copyLink() {
  /*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/
    let _this = this;
    let clipboard = _this.copyBtn;
    clipboard.on('success', function() {
        _this.$message({ /*这是使用了element-UI的信息弹框*/
            message: '复制成功！',
            type: 'success'
        });
    });
    clipboard.on('error', function() {
        _this.$message({
            message: '复制失败，请手动选择复制！',
            type: 'error'
        });
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>data() {
  <span class="hljs-keyword">return</span> {
     <span class="hljs-attr">copyBtn</span>: <span class="hljs-literal">null</span> <span class="hljs-comment">//存储初始化复制按钮事件</span>
  }
},
mounted() {
<span class="hljs-comment">/*这里使用了刚开始注册到vue原型上的clipboard(使用注册到vue原型的插件的方法就是：this + 注册时命名名字)
*这里需要用到刚才给button命名的ref的名字，因为这是vue提供的获取DOM的方法，虽然可以通过引入jQuery来获取，但是不推荐这样做，具体原因可以看官方文档和网上论坛搜索
*这里是在挂载到DOM节点时将button按钮传入clipboard并存储起来，具体原因下面会有详述
*/</span>
  <span class="hljs-keyword">this</span>.copyBtn = <span class="hljs-keyword">new</span> <span class="hljs-keyword">this</span>.clipboard(<span class="hljs-keyword">this</span>.$refs.copy);
},
<span class="hljs-attr">methods</span>: {
  copyLink() {
  <span class="hljs-comment">/*这是点击按钮触发的点击事件，关于clipboard的使用就不再赘述了，上面介绍时已经讲述过，并且使用方法在官方文档上有*/</span>
    <span class="hljs-keyword">let</span> _this = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">let</span> clipboard = _this.copyBtn;
    clipboard.on(<span class="hljs-string">'success'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        _this.$message({ <span class="hljs-comment">/*这是使用了element-UI的信息弹框*/</span>
            message: <span class="hljs-string">'复制成功！'</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">'success'</span>
        });
    });
    clipboard.on(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        _this.$message({
            <span class="hljs-attr">message</span>: <span class="hljs-string">'复制失败，请手动选择复制！'</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">'error'</span>
        });
    });
  }
}</code></pre>
</li>
</ul>
</li>
<li><strong>对<code>Events</code>的写法解惑及使用<code>clipboard</code>过程中的注意事项：</strong></li>
</ol>
<ul>
<li>
<p>为什么要在<code>mounted</code>周期中把按钮先存储起来？</p>
<ul><li>答：经过亲自测试，若在点击事件中再初始话，即把<code>mounted</code>中的内容放到<code>copyLink</code>函数中，那么第一次点击会无效，第二次及以后便能生效，这样肯定是不符合要求的，因此我想了这么一个办法来解决这么一个问题，当然不单单不是<code>mounted</code>周期，放在<code>created</code>和<code>beforeMounted</code>周期应该也是行的，虽然没有亲自测试，但是因为这两个周期已经能获取DOM了，应该是可以的。</li></ul>
</li>
<li>
<p><strong>使用过程中的注意事项</strong></p>
<ul>
<li>使用<code>NPM</code>安装完成之后记得在<code>main.js</code>中引入并注册到<code>Vue</code>原型上，名字可以自己取。</li>
<li>使用时通过<code>this + 原型上命名名字</code>来调用<code>clipboard</code>。</li>
<li>按钮通过<code>ref</code>的命名来取，就是<code>this.$refs.xxx</code>,不推荐使用<code>jQuery</code>来获取DOM。</li>
<li>关于<code>clipboard</code>复制按钮的要求请遵从官方文档要求，例如加上<code>data-clipboard-action</code>和<code>data-clipboard-target</code>等。</li>
</ul>
</li>
</ul>
<hr>
<blockquote><strong>使用过程中若有任何疑问，欢迎留言询问！^_^^_^ 不足之处，欢迎各位批评指正！</strong></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue中配合clipboard.js实现点击按钮复制内容到剪切板

## 原文链接
[https://segmentfault.com/a/1190000013746618](https://segmentfault.com/a/1190000013746618)

