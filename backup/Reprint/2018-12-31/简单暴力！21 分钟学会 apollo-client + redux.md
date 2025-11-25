---
title: '简单暴力！21 分钟学会 apollo-client + redux' 
date: 2018-12-31 2:30:29
hidden: true
slug: ivc46de26s
categories: [reprint]
---

{{< raw >}}

                    
<p><code>apollo-client</code> 是一个比较难用的 <code>GraphQL</code> 客户端，本系列带你集成 redux，趟平深坑，钻入原理，让你在 21 分钟内学完 apollo-client。</p>
<blockquote><p>NOTE: 阅读过程中如果产生任何不适，请及时拨打 120 自行抢救，谢谢。</p></blockquote>
<h1 id="articleHeader0">本系列的目标：</h1>
<h2 id="articleHeader1">简单</h2>
<ul>
<li>选型建议（是否值得使用 apollo-client）</li>
<li><a href="https://segmentfault.com/a/1190000011226353">搭建 Apollo client 端，集成 redux</a></li>
<li><a href="https://segmentfault.com/a/1190000011226445" target="_blank">使用 apollo-client 来获取数据</a></li>
<li><a href="https://segmentfault.com/a/1190000011226756">修改本地的 apollo store 数据</a></li>
</ul>
<h2 id="articleHeader2">进阶</h2>
<ul>
<li>
<p>提供定制方案</p>
<ul>
<li><a href="https://segmentfault.com/a/1190000011226555" target="_blank">请求拦截</a></li>
<li><a href="https://segmentfault.com/a/1190000011226621">封装修改 client 的 api</a></li>
</ul>
</li>
<li><a href="https://segmentfault.com/a/1190000011226882" target="_blank">apollo store 存储细节</a></li>
<li><a href="https://segmentfault.com/a/1190000011226965">写入 store 的失败原因分析和解决方案</a></li>
</ul>
<h1 id="articleHeader3">前置技能</h1>
<ul>
<li>了解 React + Redux</li>
<li>了解 GraphQL 的基础概念<br>  对怎么写 Query 等 GraphQL 基础问题不会提及，请查看官方文档<a href="http://graphql.org/learn/queries/" rel="nofollow noreferrer" target="_blank">Queries and Mutations | GraphQL</a>。</li>
</ul>
<h1 id="articleHeader4">限定提示</h1>
<ul><li>本方案目前仅使用了 Query 功能，不涉及 Mutation</li></ul>
<h1 id="articleHeader5">背景</h1>
<p>我司本来采用 RESTful api，但是完全遵循 RESTful 以来，随着业务不断扩展，api endpoint 简直多到爆炸。<br>对于前端来说，api 太多也难以维护，尤其是设计初期没有提前介入，会导致返回类似的 model，其 Schema 可能不同，这种不一致导致了很多脏代码的产生；<br>后端也懒于一遍遍地提供类似的接口。</p>
<p>于是，我们就采用了 <code>GraphQL</code> 来解决这个问题。</p>
<p>这里要跟大家明确下我们的项目背景，在采用 GraphQL 前：</p>
<ul>
<li>后端已经基于 RESTful api 搭建了一套很完善的工作流，GraphQL 必须要与 RESTful 共存</li>
<li>前端基于 Redux + redux-saga + Immutable.js，并做了不少定制化，引入 GraphQL 必须要与之前的数据存储方案不冲突</li>
</ul>
<p>后来，<strong>后端决定只使用 GraphQL 的 query 功能，也就是只 GET，其它 http 动作仍然走 RESTful api。</strong></p>
<p>如果你的项目是全盘采用 GraphQL 的，下面的实践分享可能不适合你，仅供参考。</p>
<h1 id="articleHeader6">client 端选型</h1>
<p>GraphQL 总体还是比较前后端分离的，不强制你使用某一种 client 方案。从 <code>awesome-graphql</code> 这个库，进入我们视野的主要有两个</p>
<ul>
<li>Relay</li>
<li>Apollo</li>
</ul>
<h2 id="articleHeader7">Relay</h2>
<p>先说说 Relay。<br>Relay 是官方出品和推荐的，也是默认的配套方案。文档和解决方案更齐全一点。</p>
<p>我粗略扫了一下 Relay 的文档，从它提供的 api 推测，Relay 不仅仅处理 GraphQL，还接管了状态管理等等，理论上用了 Relay 可以不用 Flux 、Redux 了。<br>考虑到可能和我们现存的 Redux 方案可能冲突，就放弃了。</p>
<h2 id="articleHeader8">Apollo</h2>
<p>然后是 Apollo。<br>Apollo 在 github 上 star 也不少，文档乍看也还不错，除 React 外还适配多个框架。<br>而且有专门提到和 Redux 集成的章节：<a href="http://dev.apollodata.com/react/redux.html" rel="nofollow noreferrer" target="_blank">Integrating with Redux | Apollo React Docs</a>。<br>时间紧迫，没有想那么多，我就用了（手动捂脸哭）。</p>
<p>事后来看，Apollo 的坑不少。而且最终 Apollo 与其说是和 Redux 集成起来，不如说是隔离开来了，因为 Apollo 也相当于单独维护自己的一个 store。这让我反思是否最初使用 Relay 也会得到同样甚至更好的结果。</p>
<p>不管怎么说，如果你也上了 apollo-client 的贼船，那么希望本系列文章能让你少采一点坑。</p>
<p><br><br><br><br><br><br><br></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单暴力！21 分钟学会 apollo-client + redux

## 原文链接
[https://segmentfault.com/a/1190000011226068](https://segmentfault.com/a/1190000011226068)

