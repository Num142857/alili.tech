---
title: 'VScode快速一键生成html、vue、jsx、ajax、sass、docker等代码片段' 
date: 2018-12-19 2:30:07
hidden: true
slug: br0di6uh6fr
categories: [reprint]
---

{{< raw >}}

                    
<p>学会添加自定义snippet（代码段）就可以极大的提高你的开发效率</p>
<p><span class="img-wrap"><img data-src="/img/bV1gsB?w=755&amp;h=324" src="https://static.alili.tech/img/bV1gsB?w=755&amp;h=324" alt="ajax-snippet.gif" title="ajax-snippet.gif" style="cursor: pointer; display: inline;"></span></p>
<p>1.文件 =&gt; 首选项 =&gt; 用户代码片段</p>
<p><span class="img-wrap"><img data-src="/img/bV1gru?w=603&amp;h=549" src="https://static.alili.tech/img/bV1gru?w=603&amp;h=549" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.选择你需要新建的代码片段的语言</p>
<p><span class="img-wrap"><img data-src="/img/bV1grK?w=599&amp;h=277" src="https://static.alili.tech/img/bV1grK?w=599&amp;h=277" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>3.进入代码片段编辑界面</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 所有的代码片段需要用&quot;&quot;或''包裹
2. \\t表示制表符
3. 空的一行必须用''或&quot;&quot;包裹
4. $1代表光标第一次出现的位置，$2代表按下tab后光标第二次出现的位置
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span> 所有的代码片段需要用<span class="hljs-string">""</span>或''包裹
<span class="hljs-number">2.</span> \\t表示制表符
<span class="hljs-number">3.</span> 空的一行必须用''或<span class="hljs-string">""</span>包裹
<span class="hljs-number">4.</span> $<span class="hljs-number">1</span>代表光标第一次出现的位置，$<span class="hljs-number">2</span>代表按下tab后光标第二次出现的位置
</code></pre>
<p>4.一个简单地.jsx demo</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;JSX&quot;: {
        &quot;prefix&quot;: &quot;jsx&quot;, // 触发的关键字 输入jsx按下tab键
        &quot;body&quot;: [
            &quot;import React from 'react'&quot;,
            &quot;&quot;,// 空的一行
            &quot;class Demo extends React.Component {&quot;,
            &quot;\trender() {&quot;, // 有制表符的一行
            &quot;\t\treturn (&quot;,
            &quot;\t\t\t$1&quot;,    // 光标首次出现的位置            
            &quot;\t\t)&quot;,
            &quot;\t}&quot;,
            &quot;}&quot;,
            &quot;&quot;,
            &quot;export default Demo&quot;,
        ],
        &quot;description&quot;: &quot;jsx components&quot;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-string">"JSX"</span>: {
        <span class="hljs-string">"prefix"</span>: <span class="hljs-string">"jsx"</span>, <span class="hljs-comment">// 触发的关键字 输入jsx按下tab键</span>
        <span class="hljs-string">"body"</span>: [
            <span class="hljs-string">"import React from 'react'"</span>,
            <span class="hljs-string">""</span>,<span class="hljs-comment">// 空的一行</span>
            <span class="hljs-string">"class Demo extends React.Component {"</span>,
            <span class="hljs-string">"\trender() {"</span>, <span class="hljs-comment">// 有制表符的一行</span>
            <span class="hljs-string">"\t\treturn ("</span>,
            <span class="hljs-string">"\t\t\t$1"</span>,    <span class="hljs-comment">// 光标首次出现的位置            </span>
            <span class="hljs-string">"\t\t)"</span>,
            <span class="hljs-string">"\t}"</span>,
            <span class="hljs-string">"}"</span>,
            <span class="hljs-string">""</span>,
            <span class="hljs-string">"export default Demo"</span>,
        ],
        <span class="hljs-string">"description"</span>: <span class="hljs-string">"jsx components"</span>
    }
}</code></pre>
<p>5.demo</p>
<p><span class="img-wrap"><img data-src="/img/bV1gts?w=294&amp;h=233" src="https://static.alili.tech/img/bV1gts?w=294&amp;h=233" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>备注：官方文档 <a href="https://code.visualstudio.com/docs/editor/userdefinedsnippets" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VScode快速一键生成html、vue、jsx、ajax、sass、docker等代码片段

## 原文链接
[https://segmentfault.com/a/1190000012655646](https://segmentfault.com/a/1190000012655646)

