---
title: '开源一个私人笔记管理项目Leafer' 
date: 2019-01-11 2:30:08
hidden: true
slug: d9kyy2mo43
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>项目的GitHub地址 -&gt; <a href="https://github.com/ziwenxie/leafer" rel="nofollow noreferrer" target="_blank">https://github.com/ziwenxie/l...</a></p>
<p><code>Leafer</code>是基于Java实现的面向Web端的一个私人笔记管理项目，现在还是处于beta版本，如果有任何的bug或者功能改进方面上的建议，欢迎大家提issues帮我改进。</p>
<h2 id="articleHeader1">部署</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone https://github.com/ziwenxie/leafer
$ cd leafer" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ git <span class="hljs-built_in">clone</span> https://github.com/ziwenxie/leafer
$ <span class="hljs-built_in">cd</span> leafer</code></pre>
<p>然后修改<code>/src/main/resources/application.properties</code>中本地MySQL数据库的配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="spring.datasource.url=jdbc:mysql://localhost:3306/数据库名
spring.datasource.username=用户名
spring.datasource.password=密码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml">spring.datasource.url=jdbc:mysql://localhost:3306/数据库名
spring.datasource.username=用户名
spring.datasource.password=密码</code></pre>
<p>最后将<code>leafer.sql</code>下面的<code>sql</code>语句复制到上面指定的数据库中，就可以执行下面maven命令运行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mvn spring-boot:run" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ mvn spring-boot:run</code></pre>
<p>在浏览器中打开<code>localhost:8080</code>使用默认的用户名<code>admin</code>以及登录密码<code>123456</code>登录即可。</p>
<h2 id="articleHeader2">功能特性</h2>
<p><strong>首页显示</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009861500?w=856&amp;h=918" src="https://static.alili.tech/img/remote/1460000009861500?w=856&amp;h=918" alt="index" title="index" style="cursor: pointer; display: inline;"></span></p>
<p><strong>单篇文章显示</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009861501?w=840&amp;h=977" src="https://static.alili.tech/img/remote/1460000009861501?w=840&amp;h=977" alt="article" title="article" style="cursor: pointer; display: inline;"></span></p>
<p><strong>简洁的markdown编辑器</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009861502?w=795&amp;h=665" src="https://static.alili.tech/img/remote/1460000009861502?w=795&amp;h=665" alt="markdown eidtor" title="markdown eidtor" style="cursor: pointer; display: inline;"></span></p>
<p><strong>标签云</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009861503?w=869&amp;h=1215" src="https://static.alili.tech/img/remote/1460000009861503?w=869&amp;h=1215" alt="tag cloud" title="tag cloud" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">Contact</h2>
<p>GitHub: <a href="https://github.com/ziwenxie" rel="nofollow noreferrer" target="_blank">https://github.com/ziwenxie</a><br>Blog: <a href="https://www.ziwenxie.site" rel="nofollow noreferrer" target="_blank">https://www.ziwenxie.site</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
开源一个私人笔记管理项目Leafer

## 原文链接
[https://segmentfault.com/a/1190000009861495](https://segmentfault.com/a/1190000009861495)

