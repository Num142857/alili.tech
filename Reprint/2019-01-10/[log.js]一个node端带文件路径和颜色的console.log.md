---
title: '[log.js]一个node端带文件路径和颜色的console.log' 
date: 2019-01-10 2:30:08
hidden: true
slug: hl1fwwzz34a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">log.js</h1>
<p>开发node.js的时候,习惯用console.log老打印一些信息，然而node端的console.log并没有浏览器里的功能那么强。</p>
<p>比如显示当前console.log信息所在的代码行，有时node开发打印很多个console.log信息是总是不知道是哪里调用的，然后只能手动去添加<code>console.log('1', info)</code>,<code>console.log('2', info)</code>...<br>所以，log.js就是为了解决这一问题而开发的；log.js是什么？</p>
<p>log.js 是 node.js 的一个调试工具。和 <code>console.log</code> 功能类似,不同的是，log.js支持显示文件路径信息，调用log的行号，还有支持主题样式<code>info</code>，<code>error</code>，<code>success</code>，<code>warn</code>。</p>
<p>有了这样一个工具，调试信息更加一目了然了。</p>
<p>具体怎么实现，请查看源码（链接在文章末尾）。</p>
<h2 id="articleHeader1">api</h2>
<ul>
<li><p>log(string)</p></li>
<li><p>log.info(string)</p></li>
<li><p>log.success(string)</p></li>
<li><p>log.error(string)</p></li>
<li><p>log.warn(string)</p></li>
</ul>
<h1 id="articleHeader2">用法</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const log = require('./log.js')

log('欢迎使用log.js。')

log.info('这是info提示信息')
log.success('这是success提示信息')
log.error('这是error提示信息')
log.warn('这是warn提示信息')

// 自定义log
log.addLog('test', 'cyan')

log.test('这是自定义的log')

log.addLog('debug', 'magenta')

log.debug('这是自定义的log')
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> log = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./log.js'</span>)

log(<span class="hljs-string">'欢迎使用log.js。'</span>)

log.info(<span class="hljs-string">'这是info提示信息'</span>)
log.success(<span class="hljs-string">'这是success提示信息'</span>)
log.error(<span class="hljs-string">'这是error提示信息'</span>)
log.warn(<span class="hljs-string">'这是warn提示信息'</span>)

<span class="hljs-comment">// 自定义log</span>
log.addLog(<span class="hljs-string">'test'</span>, <span class="hljs-string">'cyan'</span>)

log.test(<span class="hljs-string">'这是自定义的log'</span>)

log.addLog(<span class="hljs-string">'debug'</span>, <span class="hljs-string">'magenta'</span>)

log.debug(<span class="hljs-string">'这是自定义的log'</span>)
</code></pre>
<p>可以运行 <code>demo.js</code> 查看效果</p>
<h2 id="articleHeader3">命令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node demo.js --dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code class="bat" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">demo</span>.js --dev</code></pre>
<p><em>参数:</em></p>
<ul>
<li><p><code>--dev</code> 开发模式，开发模式会出现文件名和行号</p></li>
<li><p><code>--dev-show-path</code> 文件名显示绝对路径</p></li>
</ul>
<p>注：显示文件名和行号会影响js性能，上线项目请自行删掉log，或者不加上面两个参数，会使用console.log。</p>
<h2 id="articleHeader4">效果图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010011409" src="https://static.alili.tech/img/remote/1460000010011409" alt="截图1" title="截图1" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">自定义log</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="log.addLog('名字', '颜色')

log.名字(str)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-built_in">log</span>.addLog(<span class="hljs-string">'名字'</span>, <span class="hljs-string">'颜色'</span>)

<span class="hljs-built_in">log</span>.名字(<span class="hljs-built_in">str</span>)
</code></pre>
<p>支持颜色有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    white
    grey
    black
    blue
    cyan
    green
    magenta
    red
    yellow" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>    white
    grey
    black
    <span class="hljs-built_in">blue</span>
    cyan
    <span class="hljs-built_in">green</span>
    magenta
    <span class="hljs-built_in">red</span>
    yellow</code></pre>
<h2 id="articleHeader6">期望</h2>
<p>其实还可以加多点功能，比如：</p>
<ul>
<li><p>做更多的样式配置（请看<a href="https://github.com/Marak/colors.js" rel="nofollow noreferrer" target="_blank">https://github.com/Marak/colo...</a>）</p></li>
<li><p>增加log的打印时间</p></li>
</ul>
<h2 id="articleHeader7">项目地址</h2>
<p><a href="https://github.com/mengdu/log.js" rel="nofollow noreferrer" target="_blank">log.js项目地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[log.js]一个node端带文件路径和颜色的console.log

## 原文链接
[https://segmentfault.com/a/1190000010011404](https://segmentfault.com/a/1190000010011404)

