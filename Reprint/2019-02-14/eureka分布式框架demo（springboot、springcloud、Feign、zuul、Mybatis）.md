---
title: 'eureka分布式框架demo（springboot、springcloud、Feign、zuul、Mybatis）' 
date: 2019-02-14 2:30:37
hidden: true
slug: fmtl60p6izc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbiGtX?w=808&amp;h=323" src="https://static.alili.tech/img/bVbiGtX?w=808&amp;h=323" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote>eureka分布式框架，内含以下模块：eureka server、zuul 网关、commons 工具包、pojos 实体类、base<br>服务提供者、order 服务提供者、web 服务消费者</blockquote>
<h2 id="articleHeader0">eureka_demo</h2>
<p><strong>项目介绍</strong></p>
<p>eureka分布式框架，内含以下模块：</p>
<ol>
<li>eureka server</li>
<li>zuul 网关</li>
<li>commons 工具包</li>
<li>pojos 实体类</li>
<li>base 服务提供者（集成Mybatis）</li>
<li>order 服务提供者（集成Mybatis）</li>
<li>web 服务消费者</li>
</ol>
<p><strong>软件架构</strong></p>
<p>eureka分布式框架、集成sringboot、springcloud、Mybatis</p>
<p><strong>使用说明</strong></p>
<p>创建库表，在项目doc目录下有对应的sql文件<br>然后修改server_base和server_order中的数据库链接<br>order服务中创建了两个启动文件，端口不一样，记得配置两个启动即可测试负载 (Intellij Idea)。<br>启动顺序：eureka -&gt; zuul -&gt; base -&gt; order -&gt; web<br>启动完成打开页面访问：<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:7070/ 查看eureka管理界面，查看服务是否已经注册进来<br>如下图所示：<br><span class="img-wrap"><img data-src="/img/bVbiGuv?w=1944&amp;h=490" src="https://static.alili.tech/img/bVbiGuv?w=1944&amp;h=490" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>具体的请求方式，在web模块controller中都有注释！</p>
<p><strong>模块示例图</strong><br><span class="img-wrap"><img data-src="/img/bVbiGuM?w=854&amp;h=300" src="https://static.alili.tech/img/bVbiGuM?w=854&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVbiGuR?w=610&amp;h=846" src="https://static.alili.tech/img/bVbiGuR?w=610&amp;h=846" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因资料太多，后台关注我主页领取免费的学习资源（有Spring，MyBatis，Netty源码分析，高并发、高性能、分布式、微服务架构的原理，JVM性能优化、分布式架构等）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
eureka分布式框架demo（springboot、springcloud、Feign、zuul、Mybatis）

## 原文链接
[https://segmentfault.com/a/1190000016807505](https://segmentfault.com/a/1190000016807505)

