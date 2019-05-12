---
title: 'ng-alain 发布 0.2 版本' 
date: 2018-12-23 2:30:06
hidden: true
slug: 4fhnwyuf00b
categories: [reprint]
---

{{< raw >}}

                    
<p>0.2 版本做了一个很重要的业务组件抽离成为独立的类库，名曰：<a href="https://github.com/cipchk/delon" rel="nofollow noreferrer" target="_blank">@delon</a>。这样子做的好处主要希望解决若干核心问题：</p>
<ul>
<li>ng-alain 主题升级冗余问题</li>
<li>业务组件更友好的可重用（不限于 ng-alain 脚手架）、易维护</li>
<li>简化脚手架入门成本</li>
</ul>
<p>目前 @delon 包含三个子类库：</p>
<p><strong>@delon/theme</strong></p>
<ul>
<li>ng-alain 主题系统</li>
<li>若干数据渲染Pipe</li>
<li>若干常见Web的服务（例如：页面标题、滚动条操作、网络请求等）</li>
</ul>
<p><strong>@delon/abc</strong>（Angular Business Componets）</p>
<ul>
<li>所有组件都基于 Antd Design 风格</li>
<li>每一个组件都可以单独导入</li>
<li>基于G2，业务中常用的图表类型</li>
<li>原有 shared/components 组件外，新增 <code>count-down</code>
</li>
<li>新增若干表单校验器（例如：手机号、身份证）</li>
</ul>
<p><strong>@delon/acl</strong></p>
<ul><li>基于角色权限控制</li></ul>
<p>ng-alain 脚手架只剩下一个非常简单的项目，继而利用 @delon 类库进一步向上构建产品。</p>
<p>@delon 类库本身只有一个原则<strong>基于Ant Design理念</strong>，由于实际上并不受限于 ng-alain 脚手架上的使用，对于一些符合 Ant Design 的 Angular 项目都可以非常好的运用。</p>
<p>当然，一个好的开源文档非常重要，0.2 开始所有文档将不在 ng-alain 脚手架中出现，而是 <a href="//ng-alain.com/" rel="nofollow noreferrer">ng-alain.com</a> 站点里。</p>
<p>后续主要工作将新增 @delon/auth 快速解决中台前端认证、Token管理问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ng-alain 发布 0.2 版本

## 原文链接
[https://segmentfault.com/a/1190000012354239](https://segmentfault.com/a/1190000012354239)

