---
title: '最近很火“sorry为所欲为gif”的node版' 
date: 2018-12-08 2:30:30
hidden: true
slug: 4yc0etljsg
categories: [reprint]
---

{{< raw >}}

                    
<p>最近很火的sorry在线制作gif的node版本，创意来自<a href="https://github.com/xtyxtyx/sorry" rel="nofollow noreferrer" target="_blank">Xuty的ruby原版</a>，本文档亦有参考原文档。</p>
<p><a href="https://github.com/LiPinghai/node-sorry" rel="nofollow noreferrer" target="_blank">node-sorry仓库</a></p>
<p><a href="http://gif.lipinghai.cn/index.html?from=segmentfault" rel="nofollow noreferrer" target="_blank">线上演示地址</a></p>
<p>有问题欢迎提issue，喜欢项目的请star,谢谢！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014077686?w=300&amp;h=168" src="https://static.alili.tech/img/remote/1460000014077686?w=300&amp;h=168" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">项目说明</h2>
<ul>
<li>服务端采用 koa + fluent-ffmpeg,生成字幕和gif存在cache目录</li>
<li>api用RESTful规范</li>
<li>页面采用ejs渲染，构建脚本build.js,生成页面和资源在dist目录</li>
<li>项目配置在config.js中(部署请删掉或替换统计代码)</li>
</ul>
<h2 id="articleHeader1">源码结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── package
├── package.lock
├── common                  # 工具类
├── server                  # node源码
├── view                    # 页面源码
├── template                # gif模板
├── config.js               # 配置
├── build.js                # 页面构建脚本
├── README.md
└── cache                   # gif和字幕缓存" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>├── package
├── package.lock
├── common                  <span class="hljs-comment"># 工具类</span>
├── server                  <span class="hljs-comment"># node源码</span>
├── view                    <span class="hljs-comment"># 页面源码</span>
├── template                <span class="hljs-comment"># gif模板</span>
├── <span class="hljs-built_in">config</span>.<span class="hljs-keyword">js </span>              <span class="hljs-comment"># 配置</span>
├── <span class="hljs-keyword">build.js </span>               <span class="hljs-comment"># 页面构建脚本</span>
├── README.md
└── <span class="hljs-keyword">cache </span>                  <span class="hljs-comment"># gif和字幕缓存</span></code></pre>
<h2 id="articleHeader2">其他版本</h2>
<ul>
<li>
<a href="https://github.com/xtyxtyx/sorry" rel="nofollow noreferrer" target="_blank">ruby原版</a>, @Xuty编写</li>
<li>
<a href="https://github.com/East196/sorrypy" rel="nofollow noreferrer" target="_blank">python版</a>，由@East196编写</li>
<li>
<a href="https://github.com/li24361/sorryJava" rel="nofollow noreferrer" target="_blank">java版</a>，由@li24361编写</li>
<li>
<a href="https://github.com/shuangrain/SorryNet" rel="nofollow noreferrer" target="_blank">C# ASP.NET版</a>，由@shuangrain编写</li>
<li>
<a href="https://github.com/CoXier/iemoji-wechat" rel="nofollow noreferrer" target="_blank">微信小程序</a>，由@CoXier编写</li>
</ul>
<h2 id="articleHeader3">API</h2>
<p>制作GIF：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST {host}/api/{template_name}/
{
    subtitle:['好啊',.....]
}

# 返回GIF的hash
-> 200 
{
  status: 200,
  data: 'c2f4069ed207dc38e0f2d9359a2fa6b7'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>POST {host}/api/{template_name}/
{
    subtitle:[<span class="hljs-string">'好啊'</span>,.....]
}

# 返回GIF的hash
-&gt; <span class="hljs-number">200</span> 
{
  status: <span class="hljs-number">200</span>,
  data: <span class="hljs-string">'c2f4069ed207dc38e0f2d9359a2fa6b7'</span>
}</code></pre>
<p>获取GIF：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET {host}/api/{template_name}/{gif_hash}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code style="word-break: break-word; white-space: initial;"><span class="xml">GET </span><span class="hljs-template-variable">{host}</span><span class="xml">/api/</span><span class="hljs-template-variable">{template_name}</span><span class="xml">/</span><span class="hljs-template-variable">{gif_hash}</span></code><span class="xml"></span></pre>
<p>目前支持的template_name有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- sorry
- wangjingze" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> sorry
</span>-<span class="ruby"> wangjingze</span></code></pre>
<h2 id="articleHeader4">部署指南</h2>
<h3 id="articleHeader5">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> i</code></pre>
<p><code>@ffmpeg-installer/ffmpeg</code>有可能装不上，多装<code>npm i</code>几次</p>
<h3 id="articleHeader6">构建页面</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h3 id="articleHeader7">部署</h3>
<p>本地开发用<code>npm run server</code></p>
<p>线上部署用推荐使用<code>pm2</code>管理,先安装<code>npm i pm2 -g</code>,再<code>pm2 start server/index.js</code>启动项目即可</p>
<h2 id="articleHeader8">制作字幕模板template.ass</h2>
<p>首先使用aegisub为模板视频创建字幕，保存为template.ass（aegisub教程可以看这个 <a href="https://tieba.baidu.com/p/1360405931" rel="nofollow noreferrer" target="_blank">https://tieba.baidu.com/p/136...</a> ）<br><span class="img-wrap"><img data-src="/img/remote/1460000014077687?w=1246&amp;h=887" src="https://static.alili.tech/img/remote/1460000014077687?w=1246&amp;h=887" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span></p>
<p>然后把文本替换成模板字符串 &lt;%= sentences[n] %&gt;<br><span class="img-wrap"><img data-src="/img/remote/1460000014077688?w=1235&amp;h=797" src="https://static.alili.tech/img/remote/1460000014077688?w=1235&amp;h=797" alt="图片" title="图片" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
最近很火“sorry为所欲为gif”的node版

## 原文链接
[https://segmentfault.com/a/1190000014077681](https://segmentfault.com/a/1190000014077681)

