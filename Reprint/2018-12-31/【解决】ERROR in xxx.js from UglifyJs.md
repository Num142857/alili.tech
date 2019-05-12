---
title: '【解决】ERROR in xxx.js from UglifyJs' 
date: 2018-12-31 2:30:30
hidden: true
slug: y18wkfg5crg
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们运行打包脚本<code>npm run build</code>或者打包ios<code>weexpack build ios</code>有可能会遇到以下报错</p>
<blockquote>ERROR in index.js from UglifyJs<br><span class="img-wrap"><img data-src="/img/remote/1460000011212549" src="https://static.alili.tech/img/remote/1460000011212549" alt="" title="" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p>这是因为webpack在打包vue文件时没有成功转换ES6的语法</p>
<h1 id="articleHeader0">解决方法</h1>
<p>解决方法很简单，加入<strong>babel-preset-es2015</strong>插件即可<br>1、安装依赖包</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install --save-div babel-preset-es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">install </span>--save-<span class="hljs-keyword">div </span><span class="hljs-keyword">babel-preset-es2015</span></code></pre>
<p>ps：<strong>babel-loader</strong>、<strong>babel-core</strong>应该是默认装好的，如果没有安装，请重新安装</p>
<p>2、修改【webpack.config.js】配置文件<br>找到 <code>/\.js$/</code>的rules，进行修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
             presets: ['es2015']
          }
        }]
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>      {
        <span class="hljs-attribute">test</span>: /\.js$/,
        use: [{
          loader: <span class="hljs-string">'babel-loader'</span>,
          options: {
             presets: [<span class="hljs-string">'es2015'</span>]
          }
        }]
      }</code></pre>
<p>3、根目录下添加【.babelrc】文件<br>文件内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015"</span>]
}</code></pre>
<h1 id="articleHeader1">重试</h1>
<p>重新运行打包脚本查看效果，指令视情况而定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">$ npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<p>如果依然存在问题，你可以在下方留言</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【解决】ERROR in xxx.js from UglifyJs

## 原文链接
[https://segmentfault.com/a/1190000011212544](https://segmentfault.com/a/1190000011212544)

