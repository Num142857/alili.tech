---
title: 'Vue 项目应用 —— 后台管理系统模板' 
date: 2018-12-02 2:30:15
hidden: true
slug: z22ub7pd2i
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.dk-lan.com/web/vueerp/#/login" rel="nofollow noreferrer" target="_blank">登陆页效果预览</a></p>
<p>目前只实现了简单的登录和客户档案的添加和显示功能，后面会进一步更新功能。</p>
<p>用户名：dk <br>密码：123<br>源码：<a href="https://github.com/dk-lan/vue/tree/master/VueERP" rel="nofollow noreferrer" target="_blank">https://github.com/dk-lan/vue...</a></p>
<h1 id="articleHeader0">项目说明</h1>
<p>项目基于 bootstrap 样式打造，可能在样式上会有一些小兼容问题，在此暂时忽略，本项目以实现功能为主。</p>
<p>项目适合从零搭建后台管理系统的项目，且项目配置了 jquery，不要问为什么，主要是兼容不同的人群，目前有很多刚接触数据驱动的技术人员还不能完全脱离 jquery，但又要上项目，所以只是为了方便更多的人用。</p>
<p>案例的脚手架是基于 Vue-cli，完全可以在这个基础上去添加需要的功能，后续会抽时间继续完善。</p>
<p>案例支持</p>
<ul>
<li>sass</li>
<li>iconfont</li>
<li>token</li>
<li>bootstrap</li>
<li>jquery</li>
<li>jquery vertify</li>
<li>vuex</li>
</ul>
<p>由于案例是方便大家，暂时放到本人的服务器中运行，没有做任何安全防护，技术的世界，一直坚信是美好的，所以各位在添加数据时手下留情。</p>
<h1 id="articleHeader1">运行</h1>
<ol>
<li><code>npm install</code></li>
<li><code>npm run dev</code></li>
</ol>
<h1 id="articleHeader2">项目文件结构</h1>
<ul>
<li>
<p>dist [构建目录]</p>
<ul><li>demo [知识点讲解案例]</li></ul>
</li>
<li>
<p>src [ERP 源代码]</p>
<ul>
<li>assets [静态资源文件]</li>
<li>components [Vue 组件]</li>
<li>router [路由配置]</li>
<li>utils [ajax]</li>
<li>vuex [store]</li>
</ul>
</li>
</ul>
<h1 id="articleHeader3">后台管理系统的常规技术点</h1>
<ul>
<li>
<p>数据请求 ajax</p>
<ul>
<li>所有 ajax 请求都会有 loding 和遮罩层</li>
<li>所有的 ajax 的 url 都应该设置相对应的前缀方便发布</li>
</ul>
</li>
<li>
<p>数据列表 datagrid</p>
<ul>
<li>可配置是否需要分页</li>
<li>可配置是否需要搜索功能</li>
<li>可配置数据列表是否能修改、删除、添加和查看详情</li>
<li>可配置水平滚动的固定列</li>
<li>可配置点击列头是否需要排序</li>
<li>可配置列表是否允许直接修改数据</li>
<li>可配置列表是否允许复制行</li>
<li>列表的数据在编辑时可自动生成对应的表单元素，比如编辑日期时会自动生成日期控件</li>
<li>列表在编辑时的验证规则</li>
<li>是否需要支持树形结构</li>
</ul>
</li>
<li>
<p>表单 form</p>
<ul>
<li>信息分组显示</li>
<li>表单编辑权限</li>
<li>表单验证</li>
<li>表单控件自动生成</li>
<li>每行显示的元素数量</li>
<li>跨列显示</li>
</ul>
</li>
<li>数据完整性</li>
<li>数据安全性</li>
<li>数据查询性能</li>
<li>系统支持多语言切换</li>
<li>系统权限</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 项目应用 —— 后台管理系统模板

## 原文链接
[https://segmentfault.com/a/1190000014726060](https://segmentfault.com/a/1190000014726060)

