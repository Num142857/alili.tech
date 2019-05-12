---
title: 'GraphQL 入门: Apollo Client - 简介' 
date: 2019-01-18 2:30:35
hidden: true
slug: 9f9utygu5ii
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000008828678">GraphQL 入门: 简介</a><br><a href="https://segmentfault.com/a/1190000008632659" target="_blank">GraphQL 入门: Apollo Client - 简介</a><br><a href="https://segmentfault.com/a/1190000008632704">GraphQL 入门: Apollo Client - 安装和配置选项</a><br><a href="https://segmentfault.com/a/1190000008655764" target="_blank">GraphQL 入门: Apollo Client - 连接到数据</a><br><a href="https://segmentfault.com/a/1190000008637399">GraphQL 入门: Apollo Client - 网络层</a><br><a href="https://segmentfault.com/a/1190000008754734" target="_blank">GraphQL 入门: Apollo Client - 开发调试工具</a><br><a href="https://segmentfault.com/a/1190000008862505">GraphQL 入门: Apollo Client - 持久化GraphQL查询概要</a><br><a href="https://segmentfault.com/a/1190000008927372" target="_blank">GraphQL 入门: Apollo Client - 存储API</a><br><a href="https://segmentfault.com/a/1190000008944122">GraphQL 入门: Apollo Client - 查询(Batching)合并</a></p></blockquote>
<p>本文是在React应用程序中使用Apollo Javascript GraphQL客户端和<code>react-apollo</code>集成包的官方指南. 上手指南可以参考 <a href="https://www.learnapollo.com" rel="nofollow noreferrer" target="_blank">Learn Apollo</a>.</p>
<p>Apollo 社区开发和维护了许多用于简化 GraphQL使用的工具, 支持不同的前端和服务器技术. 虽然本指南只关注与 与React的集成. </p>
<p>Apollo 还支持原始移动设备客户的, 这里有一个处于开发中的<a href="https://github.com/apollostack/apollo-ios" rel="nofollow noreferrer" target="_blank">iOS 客户的库</a>, Android 客户的还在计划当中. 本文中描述的集成方法可以不加修改的用于 React Native 的两个平台(iOS, Android).</p>
<h2 id="articleHeader0">兼容性</h2>
<ul>
<li><p>直接支持React Native</p></li>
<li><p>Redux: Apollo客户端内部使用了Redux管理前端应用的状态.</p></li>
<li><p>独立于客户端路由, 你可以选择任何你喜欢的路由库, 比如React Router</p></li>
<li><p>支持任何GraphQL 服务器</p></li>
</ul>
<h2 id="articleHeader1">和其他GraphQL客户端的比较</h2>
<p>对于使用 <code>react-apollo</code>还是其他的GraphQL客户端库, 考虑一下项目的目标是有价值的.</p>
<ul>
<li><p><a href="https://facebook.github.io/relay/" rel="nofollow noreferrer" target="_blank">Relay</a> 是一个为了构建移动应用开发的React相关的GraphQL客户端. Apollo 有和Relay 类似的功能, 但它的目标是作为一个通用的工具和任何模式, 认识前端价格一起使用. Relay是作为一个中间层重度耦合在前端和后端之间的, 缺少一些灵活性.</p></li>
<li><p><a href="https://github.com/kadirahq/lokka" rel="nofollow noreferrer" target="_blank">Lokka</a> 是一个简单的GraphQL Javascript客户端, 支持基本查询缓存. Apollo 更复杂, 包括更成熟的缓存和一组更新和获取数据的高级功能.</p></li>
</ul>
<h2 id="articleHeader2">学习资料</h2>
<ul>
<li><p><a href="http://graphql.org/" rel="nofollow noreferrer" target="_blank">GraphQL.org</a> 关于GraphQL查询语言的简介和参考资料.</p></li>
<li><p><a href="http://www.apollodata.com/" rel="nofollow noreferrer" target="_blank">Apollodata</a> 学习Apollo开源工具的网站</p></li>
<li><p><a href="https://medium.com/apollo-stack" rel="nofollow noreferrer" target="_blank">博客</a> 包含关于GraphQL的详细信息</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
GraphQL 入门: Apollo Client - 简介

## 原文链接
[https://segmentfault.com/a/1190000008632659](https://segmentfault.com/a/1190000008632659)

