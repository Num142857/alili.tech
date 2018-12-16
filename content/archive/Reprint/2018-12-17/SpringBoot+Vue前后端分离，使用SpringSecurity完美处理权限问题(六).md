---
title: 'SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(六)' 
date: 2018-12-17 2:30:07
hidden: true
slug: sueja6r8dcf
categories: [reprint]
---

{{< raw >}}

                    
<p>当前后端分离时，权限问题的处理也和我们传统的处理方式有一点差异。笔者前几天刚好在负责一个项目的权限管理模块，现在权限管理模块已经做完了，我想通过5-6篇文章，来介绍一下项目中遇到的问题以及我的解决方案，希望这个系列能够给小伙伴一些帮助。本系列文章并不是手把手的教程，主要介绍了核心思路并讲解了核心代码，完整的代码小伙伴们可以在GitHub上star并clone下来研究。另外，原本计划把项目跑起来放到网上供小伙伴们查看，但是之前买服务器为了省钱，内存只有512M，两个应用跑不起来(已经有一个<a href="https://github.com/lenve/VBlog" rel="nofollow noreferrer" target="_blank">V部落开源项目</a>在运行)，因此小伙伴们只能将就看一下下面的截图了，GitHub上有部署教程，部署到本地也可以查看完整效果。</p>
<hr>
<p>项目地址：<a href="https://github.com/lenve/vhr" rel="nofollow noreferrer" target="_blank">https://github.com/lenve/vhr</a>  </p>
<p>大部分问题我们都已经解决了，本文我们主要来看看用户角色管理和角色资源管理。  </p>
<p>本文是权限系列的最后一篇，建议先阅读前面的文章有助于更好的理解本文：  </p>
<p>1.<a href="http://mp.weixin.qq.com/s/lpznrVx6Bh9X7ZnunrWQSA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(一)</a>  <br>2.<a href="https://mp.weixin.qq.com/s/9Do-kQOvJGLsw9m36_LrFA" rel="nofollow noreferrer" target="_blank">SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(二)</a>  <br>3.<a href="https://mp.weixin.qq.com/s/9c0j2GzCNmtdOL8EfCV_bA" rel="nofollow noreferrer" target="_blank">SpringSecurity中密码加盐与SpringBoot中异常统一处理</a>  <br>4.<a href="https://mp.weixin.qq.com/s/KabBPItayxBEv56_g9y6KQ" rel="nofollow noreferrer" target="_blank">axios请求封装和异常统一处理</a>  <br>5.<a href="http://mp.weixin.qq.com/s/zF1BI0AOmOHOwr7T8yhKYg" rel="nofollow noreferrer" target="_blank">权限管理模块中动态加载Vue组件</a></p>
<h1 id="articleHeader0">角色资源关系管理</h1>
<p>这个主要是给不同角色分配不同的资源。</p>
<h2 id="articleHeader1">角色展示</h2>
<p>角色的展示采用了ElementUI中的<strong>Collapse 折叠面板</strong>，并且采用了手风琴模式，即一次只打开一个角色，如下图：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CXn?w=1352&amp;h=658" src="https://static.alili.tech/img/bV1CXn?w=1352&amp;h=658" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>角色中资源的展示则采用了ElementUI中的树形控件，管理员可以直接直接点击勾选，然后点击修改按钮，进行资源的分配。</p>
<h2 id="articleHeader2">核心思路</h2>
<p>核心代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-collapse v-model=&quot;activeColItem&quot; accordion style=&quot;width: 500px;&quot; @change=&quot;collapseChange&quot;>
<el-collapse-item v-for=&quot;(item,index) in roles&quot; :title=&quot;item.nameZh&quot; :name=&quot;item.id&quot; :key=&quot;item.name&quot;>
    <el-card class=&quot;box-card&quot;>
    <div slot=&quot;header&quot;>
        <span>可访问的资源</span>
        <el-button type=&quot;text&quot;
                    style=&quot;color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px&quot;
                    icon=&quot;el-icon-delete&quot; @click=&quot;deleteRole(item.id,item.nameZh)&quot;></el-button>
    </div>
    <div>
        <el-tree :props=&quot;props&quot;
                :key=&quot;item.id&quot;
                :data=&quot;treeData&quot;
                :default-checked-keys=&quot;checkedKeys&quot;
                node-key=&quot;id&quot;
                ref=&quot;tree&quot;
                show-checkbox
                highlight-current
                @check-change=&quot;handleCheckChange&quot;>
        </el-tree>
    </div>
    <div style=&quot;display: flex;justify-content: flex-end;margin-right: 10px&quot;>
        <el-button size=&quot;mini&quot; @click=&quot;cancelUpdateRoleMenu&quot;>取消修改</el-button>
        <el-button type=&quot;primary&quot; size=&quot;mini&quot; @click=&quot;updateRoleMenu(index)&quot;>确认修改</el-button>
    </div>
    </el-card>
</el-collapse-item>
</el-collapse>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">el-collapse</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"activeColItem"</span> <span class="hljs-attr">accordion</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 500px;"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"collapseChange"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">el-collapse-item</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in roles"</span> <span class="hljs-attr">:title</span>=<span class="hljs-string">"item.nameZh"</span> <span class="hljs-attr">:name</span>=<span class="hljs-string">"item.id"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.name"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-card</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box-card"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>可访问的资源<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span>
                    <span class="hljs-attr">style</span>=<span class="hljs-string">"color: #f6061b;margin: 0px;float: right; padding: 3px 0;width: 15px;height:15px"</span>
                    <span class="hljs-attr">icon</span>=<span class="hljs-string">"el-icon-delete"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"deleteRole(item.id,item.nameZh)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-tree</span> <span class="hljs-attr">:props</span>=<span class="hljs-string">"props"</span>
                <span class="hljs-attr">:key</span>=<span class="hljs-string">"item.id"</span>
                <span class="hljs-attr">:data</span>=<span class="hljs-string">"treeData"</span>
                <span class="hljs-attr">:default-checked-keys</span>=<span class="hljs-string">"checkedKeys"</span>
                <span class="hljs-attr">node-key</span>=<span class="hljs-string">"id"</span>
                <span class="hljs-attr">ref</span>=<span class="hljs-string">"tree"</span>
                <span class="hljs-attr">show-checkbox</span>
                <span class="hljs-attr">highlight-current</span>
                @<span class="hljs-attr">check-change</span>=<span class="hljs-string">"handleCheckChange"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-tree</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: flex;justify-content: flex-end;margin-right: 10px"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"mini"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"cancelUpdateRoleMenu"</span>&gt;</span>取消修改<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"primary"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"mini"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"updateRoleMenu(index)"</span>&gt;</span>确认修改<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-card</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-collapse-item</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">el-collapse</span>&gt;</span></code></pre>
<p>核心思路如下：  </p>
<p>1.通过for循环渲染出el-collapse-item，将角色展示出来。  <br>2.el-collapse-item的内容就是一个树形控件，很明显，树形控件的数量和el-collapse-item的数量是一样多的，但是考虑到el-collapse-item使用了手风琴模式，即一次只有一个折叠面板被打开，因此树形控件的数据源只有一个，即多个树形控件共用一个数据源，为了避免数据紊乱，我采取了这样的数据加载方式：当用户每次点击折叠面板的时候，我都根据当前折叠面板所对应的角色去查询该角色所对应的资源，同时也查询所有的资源，将查到的数据交给树形控件去展示。这样可以避免为每一个树形控件都准备一份数据。</p>
<h1 id="articleHeader3">用户角色关系管理</h1>
<p>这个就是常规的增删改查。</p>
<h2 id="articleHeader4">用户展示</h2>
<p>用户的展示使用了ElementUI的 <strong>Card卡片</strong> 来实现。效果图如下：  </p>
<p><span class="img-wrap"><img data-src="/img/bV1CXh?w=1353&amp;h=661" src="https://static.alili.tech/img/bV1CXh?w=1353&amp;h=661" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">角色展示</h2>
<p>角色展示使用了ElementUI的 <strong>Tag 标签</strong> 来实现，角色后面有一个more按钮，点击之后是一个<strong>Popover 弹出框</strong>，<strong>Popover 弹出框</strong>的里边是一个<strong>Select 选择器</strong>，多选的，可以进行角色的分配。  </p>
<p>OK，至此，我们的功能基本就都实现了。  </p>
<p>关注公众号，可以及时接收到最新文章:  </p>
<p><span class="img-wrap"><img data-src="/img/bVUERD?w=258&amp;h=258" src="https://static.alili.tech/img/bVUERD?w=258&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SpringBoot+Vue前后端分离，使用SpringSecurity完美处理权限问题(六)

## 原文链接
[https://segmentfault.com/a/1190000012879279](https://segmentfault.com/a/1190000012879279)

