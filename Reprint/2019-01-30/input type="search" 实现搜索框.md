---
title: 'input type="search" 实现搜索框' 
date: 2019-01-30 2:30:23
hidden: true
slug: 45xufsq378o
categories: [reprint]
---

{{< raw >}}

                    
<p>欲实现一个文字搜索的功能，要求输入时，键盘回车按钮提示显示为“搜索”。效果如下:<br><span class="img-wrap"><img data-src="/img/remote/1460000007765745" src="https://static.alili.tech/img/remote/1460000007765745" alt="Paste_Image.png" title="Paste_Image.png" style="cursor: pointer; display: inline;"></span></p>
<p>开始~</p>
<p>input type=text并不能达到这种效果，google了一下，html5 增加的type=search可以做到（但需要input type=search外面包上一层带action属性的form）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        <div class=&quot;search-input-wrap clearfix&quot;>
            <div class=&quot;form-input-wrap f-l&quot;>
                <form action=&quot;&quot; class=&quot;input-kw-form&quot;>
                    <input type=&quot;search&quot; autocomplete=&quot;off&quot; name=&quot;baike-search&quot; placeholder=&quot;请输入关键词&quot; class=&quot;input-kw&quot;>
                </form>
                <i class=&quot;iconfont if-message&quot;></i>
                <i class=&quot;iconfont if-close&quot;></i>
            </div>
            <i class=&quot;search-cancel f-l&quot;>取消</i>
        </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-input-wrap clearfix"</span>&gt;
            &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"form-input-wrap f-l"</span>&gt;
                &lt;form action=<span class="hljs-string">""</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"input-kw-form"</span>&gt;
                    &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"search"</span> autocomplete=<span class="hljs-string">"off"</span> name=<span class="hljs-string">"baike-search"</span> placeholder=<span class="hljs-string">"请输入关键词"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"input-kw"</span>&gt;
                &lt;/form&gt;
                &lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"iconfont if-message"</span>&gt;&lt;/i&gt;
                &lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"iconfont if-close"</span>&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;i <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"search-cancel f-l"</span>&gt;取消&lt;/i&gt;
        &lt;/div&gt;</code></pre>
<p>但type=search会有许多默认样式和行为，这次开发遇到的有：</p>
<ul>
<li><p>会默认下拉框显示搜索历史记录;<br><span class="img-wrap"><img data-src="/img/remote/1460000007765746" src="https://static.alili.tech/img/remote/1460000007765746" alt="3283C42B-4CCD-478D-B275-50C10A2F770C.png" title="3283C42B-4CCD-478D-B275-50C10A2F770C.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>输入时自动弹出“x”，“x”的样式在不同手机上，样式不同；<br><span class="img-wrap"><img data-src="/img/remote/1460000007765747" src="https://static.alili.tech/img/remote/1460000007765747" alt="3B8D4F17-8218-4458-8E89-05E9666F8464.png" title="3B8D4F17-8218-4458-8E89-05E9666F8464.png" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>IOS 手机（测试时为iphone6 ios10）上输入框为椭圆形.<br><span class="img-wrap"><img data-src="/img/remote/1460000007765748" src="https://static.alili.tech/img/remote/1460000007765748" alt="A63C671C-C523-4007-976F-C84DF29BC052.png" title="A63C671C-C523-4007-976F-C84DF29BC052.png" style="cursor: pointer; display: inline;"></span></p></li>
</ul>
<p>但我们希望样式按照我们自定义的样式显示，并且各个手机上能统一。</p>
<p>于是几经google，得到答案：</p>
<ul>
<li><p>设置input autocomplete="off"去掉弹出的下拉框；</p></li>
<li><p>将默认的“x”隐藏掉：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=&quot;search&quot;]::-webkit-search-cancel-button{
    display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>input[type=<span class="hljs-string">"search"</span>]<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-search-cancel-button</span>{
    <span class="hljs-symbol">display:</span> none;
}</code></pre>
<ul><li><p>针对ios 设置样式, 去除ios下input 椭圆形:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    -webkit-appearance: none;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code style="word-break: break-word; white-space: initial;">    -webkit-appearance: <span class="hljs-keyword">none</span>;</code></pre>
<p>同时别忘记，如果提交搜索时想使用ajax，那么可以阻止表单的默认行为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="container.on('submit', '.input-kw-form', function(event){
    event.preventDefault();
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>container.on(<span class="hljs-string">'submit'</span>, <span class="hljs-string">'.input-kw-form'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(event)</span></span>{
    event.preventDefault();
})</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
input type="search" 实现搜索框

## 原文链接
[https://segmentfault.com/a/1190000007765742](https://segmentfault.com/a/1190000007765742)

