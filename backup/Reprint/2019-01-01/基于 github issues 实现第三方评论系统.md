---
title: '基于 github issues 实现第三方评论系统' 
date: 2019-01-01 2:30:07
hidden: true
slug: gfoj8k8we6f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文只是介绍如何基于 github issues 实现第三方评论系统，对于 Hexo 介绍，本文并不打算详述，如果有童鞋之前还没有了解 Hexo 的，可以先看一下之前文章《<a href="http://jelon.top/posts/start-hexo/" rel="nofollow noreferrer" target="_blank">静态博客框架 Hexo 入门</a> 》，或者直接访问 Hexo 官网 <a href="https://hexo.io/" rel="nofollow noreferrer" target="_blank">https://hexo.io/</a></p></blockquote>
<h3 id="articleHeader0">一、事情起因</h3>
<p>个人博客是基于静态博客系统（Hexo）搭建的，本身是没有具备任何后台功能的，例如搜索、评论系统等。但是，如果你想在静态博客上加上评论功能，也不是无法实现的，这时候就要借助第三方评论系统了。</p>
<p>什么是第三方评论系统？博客或 cms 系统，一般都是有内容和评论两部分组成。评论可以增加博主与用户之间的交流互动，也是博主一对多的传达自己想法和观点的交流平台。所以除了社区平台外，评论也成为一般博客和cms系统必备功能。大型网站本身自己开发了评论系统和分享系统，而一般中小型网站开发的自己的评论系统，成本高。而且垃圾评论和过滤非法关键字难度较大，所以在国内外都有第三评论系统。以下是曾经流行或者正在流行的一些第三方评论系统。</p>
<ul>
<li>多说。多说是一款追求极致体验的社会化评论框，可以用微博、QQ、人人、豆瓣等帐号登录并评论。多说已经成为国内份额最大的所谓“社交评论框”服务，但是这个行业第一并没有给它带来更多的收益和发展空间。不过可惜，现在已经停止服务了。</li>
<li>搜狐畅言。搜狐畅言是由搜狐推出的一个简单而强大的社会化评论及聚合平台。用户可以直接用自己的社会化网络账户在第三方网站发表评论，并且一键评论同步至社交网络将网站内容和自己的评论分享给好友。增加第三方网站用户活跃度，调动好友参与评论，帮助网站实现社会化网络优化，有效提升网站社会化流量。现在还健在。</li>
<li>友言。友言是国内专业的第三方实时社会化评论系统，“完全社交化”可将评论一键同步到各大微博与社区（目前支持10个社交媒体），同时将评论的回复与跟帖同步至使用的网站上，让网站变得更具有活力和社交性，从而为网站带来更多的回访和流量，是一个简单而强大的社会化评论及聚合平台。现在还健在。</li>
<li>网易云跟帖。网易云跟贴是网易公司推出的强大而又简单的评论聚合与分享平台。坑爹的，在多说发布停止服务声明之后不久，网易云跟帖也分出了停止服务声明。</li>
<li>Disqus。说到第三放评论系统，当然不得不提国外第三方评论系统界的老大 Disqus，只可惜由于天朝网络原因，Disqus 加载很慢，甚至有时候加载不出来，建议用户自备梯子。</li>
</ul>
<p>那么回归主题，市面上那么多第三方评论系统，就算有那么一两个挂掉了，还是有很多选择呢，为什么还要自己去做一个呢，这不是造轮子吗？其实，一开始我一直用多说的，用的不亦乐乎，突然有一天说挂就挂了，没办法，那我就选择其他的呗，然后就改成网易云，坑爹的，刚改造好没多久，网易云也挂了。</p>
<p>后面我就在网上找啊找啊，发现居然有人用 GitHub Issue 做了一个评论系统，这无疑是一个很好的想法，很有创意啊。当然，我也拿来用了，但是始终觉得有点丑，跟我自己的博客主题不搭，才用了两天，撤了，打算自己做一个。说干就干，程序员总喜欢造轮子。</p>
<h3 id="articleHeader1">二、什么是 GitHub Issues</h3>
<p>经常逛 GitHub 的童鞋，都应该知道这个功能，有人理解 GitHub 的 issue 功能，就如同 TODO list。你可以把所有想要在下一步完成的工作，如 feature 添加、bug 修复等，都写成一个个的 issue ，放在上面。既可以作为提醒，也可以统一管理。另外，每一次 commit 都可以选择性的与某个 issue 关联。比如在 message 中添加 #n，就可以与第 n 个 issue 进行关联。具体可以看一下知乎里面别人对 《<a href="https://www.zhihu.com/question/22969033/answer/25927363" rel="nofollow noreferrer" target="_blank">github issue是做什么的？</a> 》的解答。而本博客的评论数据存储 issues 仓库地址为 <a href="https://github.com/jangdelong/blog_comments/issues" rel="nofollow noreferrer" target="_blank">https://github.com/jangdelong/blog_comments/issues</a>，仓库里面并没有放置托管代码。总之，像我现在要用 github Issues 来制作评论系统的，其实就是把数据存储到 github issues，简单的说可以把 github issues 理解为一个免费的数据库。</p>
<h3 id="articleHeader2">三、评论系统实现</h3>
<p><strong>预备工作</strong></p>
<ul><li>创建 OAuth applications。评论需要涉及 GitHub 授权登录，所以在这里你先要有一个 GitHub application。GitHub 授权登录遵循 <a href="http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html" rel="nofollow noreferrer" target="_blank">OAuth 2.0 标准</a>。OAuth applications 创建如下图所示，填写上面相应的内容。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011100939" src="https://static.alili.tech/img/remote/1460000011100939" alt="OAuth" title="OAuth" style="cursor: pointer; display: inline;"></span></p>
<p>Application name：你的站点名称；<br>Homepage URL：你的站点主页链接；<br>Application description：站点描述；<br>Authorization callback URL：GitHub 授权成功后返回地址</p>
<p>创建成功之后会生成一个 Client ID 和一个 Client Secret。</p>
<ul><li>GitHub REST API v3</li></ul>
<p>GitHub 提供了很多方便第三方开发的 API，当然，github issues 的增删改查 API 也在其中，有了这些 API，你才能各种施展奇技淫巧，比如我们现在要写的评论系统。另外，有人怀疑我们应不应该“滥用”这些 API，但是，个人觉得，既然，GitHub 提供了这些 API，就是说明要开放给大家这些权限，应该就不怕你“滥用”。那么，要满足我们现在的需求需要哪些 API 呢，下面我列举一下，以我的账号为例，jangdelong 为 Github 名，blog_comments 为仓库名。</p>
<p><code>GET: https://api.github.com/repos/jangdelong/blog_comments/issues</code>                         获取所有issues信息</p>
<p><code>GET: https://api.github.com/repos/jangdelong/blog_comments/issues/11</code>                   获取某个issue下的信息 （11 为 issue 编号 ）</p>
<p><code>GET: https://api.github.com/repos/jangdelong/blog_comments/issues/11/</code>comments  获取某个issue下的评论</p>
<p><code>GET: https://api.github.com/repos/jangdelong/blog_comments/issues/comments/111/reactions</code> 获取评论 ID 为 111 下的所有 reactions（reactions 包含顶[+1]、踩[-1]、喜欢[heart]等字段）</p>
<p><code>POST: https://api.github.com/repos/jangdelong/blog_comments/issues</code> 创建一个 issue</p>
<p><code>POST: https://api.github.com/repos/jangdelong/blog_comments/issues/11/comments</code> 在编号为 11 的 issue 下创建一条评论</p>
<p><code>POST: https://api.github.com/repos/jangdelong/blog_comments/issues/comments/111/reactions</code> 在 ID 为 111 的评论下创建一条 reactions（如 heart）</p>
<p><code>POST：https://developer.github.com/v3/markdown/</code>  markdown 语法解析接口</p>
<p><strong>整体设计</strong></p>
<p>流程图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                                             |--> 显示已登录    
                              |--> 已登录 --> |--> 加载评论列表 --> 分页加载 
                              |              |--> 其他 
                              |              |--> 评论操作 --> 成功/失败            |
 开始 --> GitHub 授权登录 ? --> |                                                   |--> 结束
                              |              |--> 显示未登录                       |
                              |--> 未登录 --> |--> 加载评论列表 --> 分页加载          
                                             |--> 其他
                                             |--> 评论操作 --> 提示未登录状态
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code>                                             <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">显示已登录</span>    
                              <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">已登录</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">加载评论列表</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">分页加载</span> 
                              <span class="hljs-comment">|</span>              <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">其他</span> 
                              <span class="hljs-comment">|</span>              <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">评论操作</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">成功/失败</span>            <span class="hljs-comment">|</span>
 <span class="hljs-comment">开始</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">GitHub</span> <span class="hljs-comment">授权登录</span> <span class="hljs-comment">?</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">|</span>                                                   <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">结束</span>
                              <span class="hljs-comment">|</span>              <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">显示未登录</span>                       <span class="hljs-comment">|</span>
                              <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">未登录</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">加载评论列表</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">分页加载</span>          
                                             <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">其他</span>
                                             <span class="hljs-comment">|</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">评论操作</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span>&gt; <span class="hljs-comment">提示未登录状态</span>
</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011100940" src="https://static.alili.tech/img/remote/1460000011100940" alt="OAuth" title="OAuth" style="cursor: pointer; display: inline;"></span></p>
<p>因此，我们可以将评论系统分为列表（list）、评论框（box）、顶部登录状态栏（signbar）等部分。View 部分的代码组织为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了减少全局变量，整个网站就暴露一个全局变量 JELON
var JELON = JELON || {};
;(function (JL) {
    ...
    JL.Renders = {
        // 列表模块
        list: {
            tpl: ...,
            ...
        },
        // 评论框模块
        box: {
            tpl: ...,
            ...
        },
        // 顶部登录状态栏
        signBar: {
            tpl: ...,
            ...
        },
        ... // 其他模块视图
    };
    ...
})(JELON);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 为了减少全局变量，整个网站就暴露一个全局变量 JELON</span>
<span class="hljs-keyword">var</span> JELON = JELON || {};
;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">JL</span>) </span>{
    ...
    JL.Renders = {
        <span class="hljs-comment">// 列表模块</span>
        list: {
            <span class="hljs-attr">tpl</span>: ...,
            ...
        },
        <span class="hljs-comment">// 评论框模块</span>
        box: {
            <span class="hljs-attr">tpl</span>: ...,
            ...
        },
        <span class="hljs-comment">// 顶部登录状态栏</span>
        signBar: {
            <span class="hljs-attr">tpl</span>: ...,
            ...
        },
        ... <span class="hljs-comment">// 其他模块视图</span>
    };
    ...
})(JELON);</code></pre>
<p>视图部分的代码组织好之后，根据 GitHub 提供的各种 API，我们将其封装到 Requests 里面去，组织如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了减少全局变量，整个网站就暴露一个全局变量 JELON
var JELON = JELON || {};
;(function (JL) {
    ...
    JL.Requests = {
        // 根据 label 获取 issue 编号
        getIssueNumberByLabel: function () { ... },
        // 创建 issue
        createIssue: function () { ... },
        // 根据 issue 编号获取评论列表
        getCommentListByIssueNumber: function () { ... },
        // 根据评论 ID 获取 reactions （即点赞数据）
        getReactionsByCommentId: function () { ... },
        // markdown 解析
        markdown: function () { ... },
        // 通过 code 获取 access_token
        getAccessToken: function () { ... },
        // 利用 access_token 去获取 GitHub 用户信息
        getUserInfo: function () { ... },
        // 创建评论
        createComment: function () { ... },
        // 创建 reactions （点赞）
        createReaction: function () { ... }
    };
    ...
})(JELON);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 为了减少全局变量，整个网站就暴露一个全局变量 JELON</span>
<span class="hljs-keyword">var</span> JELON = JELON || {};
;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">JL</span>) </span>{
    ...
    JL.Requests = {
        <span class="hljs-comment">// 根据 label 获取 issue 编号</span>
        getIssueNumberByLabel: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 创建 issue</span>
        createIssue: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 根据 issue 编号获取评论列表</span>
        getCommentListByIssueNumber: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 根据评论 ID 获取 reactions （即点赞数据）</span>
        getReactionsByCommentId: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// markdown 解析</span>
        markdown: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 通过 code 获取 access_token</span>
        getAccessToken: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 利用 access_token 去获取 GitHub 用户信息</span>
        getUserInfo: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 创建评论</span>
        createComment: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 创建 reactions （点赞）</span>
        createReaction: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... }
    };
    ...
})(JELON);</code></pre>
<p>接下来是封装事件操作，我们将其封装到 Actions 里面去，代码组织如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了减少全局变量，整个网站就暴露一个全局变量 JELON
var JELON = JELON || {};
;(function (JL) {
    ...
    JL.Actions = {
        // 初始加载，如列表、登录状态等
        init: function () { ... },
        // 登出操作
        signOut: function () { ... },
        // 列表翻页跳转
        pageJump: function () { ... },
        // 编辑预览
        editPreviewSwitch: function () { ... },
        // 提交评论操作
        postComment: function () { ... },
        // 点赞操作
        like: function () { ... }
    };
    ...
})(JELON);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 为了减少全局变量，整个网站就暴露一个全局变量 JELON</span>
<span class="hljs-keyword">var</span> JELON = JELON || {};
;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">JL</span>) </span>{
    ...
    JL.Actions = {
        <span class="hljs-comment">// 初始加载，如列表、登录状态等</span>
        init: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 登出操作</span>
        signOut: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 列表翻页跳转</span>
        pageJump: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 编辑预览</span>
        editPreviewSwitch: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 提交评论操作</span>
        postComment: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... },
        <span class="hljs-comment">// 点赞操作</span>
        like: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... }
    };
    ...
})(JELON);</code></pre>
<p>程序入口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 为了减少全局变量，整个网站就暴露一个全局变量 JELON
var JELON = JELON || {};
;(function (JL) {
    ...
    JL.Comment = function (options) {
        JL.options = options || {};
        $('comments').innerHTML = [
            this.Renders.signBar.tpl,
            this.Renders.box.tpl,
            this.Renders.tips,
            this.Renders.list.tpl
        ].join('');
        JL.Actions.init();
    };
    ...
})(JELON);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 为了减少全局变量，整个网站就暴露一个全局变量 JELON</span>
<span class="hljs-keyword">var</span> JELON = JELON || {};
;(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">JL</span>) </span>{
    ...
    JL.Comment = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">options</span>) </span>{
        JL.options = options || {};
        $(<span class="hljs-string">'comments'</span>).innerHTML = [
            <span class="hljs-keyword">this</span>.Renders.signBar.tpl,
            <span class="hljs-keyword">this</span>.Renders.box.tpl,
            <span class="hljs-keyword">this</span>.Renders.tips,
            <span class="hljs-keyword">this</span>.Renders.list.tpl
        ].join(<span class="hljs-string">''</span>);
        JL.Actions.init();
    };
    ...
})(JELON);</code></pre>
<p><strong>登录流程</strong></p>
<p>GitHub 授权登录是不可或缺的功能，用只有登录之后才能进行评论。前面有提到，GitHub 授权登录是遵循一个 OAuth 2.0 标准。以下是 OAuth 2.0 的一个运作流程，可以让我们更好的理解它。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011100941" src="https://static.alili.tech/img/remote/1460000011100941" alt="OAuth 2.0 运行流程" title="OAuth 2.0 运行流程" style="cursor: pointer; display: inline;"></span></p>
<p>那么，GitHub 授权登录是怎么样按照这个标准来运作的呢，接下来简单介绍一下，如果要更加详细深入了解的话，你也可以访问 <a href="https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/" rel="nofollow noreferrer" target="_blank">GitHub 官方文档</a>。</p>
<ol>
<li>
<p>用户发起重定向请求授权服务器换取 code</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`GET http://github.com/login/oauth/authorize`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">`GET http:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/login/</span>oauth<span class="hljs-regexp">/authorize`</span></code></pre>
</li>
<li>
<p>拿到 code 之后，利用 client_id、client_secret 和 code 去换取 token_access。（client_id 和 client_secret 前面的预备工作里有提到）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`POST https://github.com/login/oauth/access_token`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">`POST https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/login/</span>oauth<span class="hljs-regexp">/access_token`</span></code></pre>
</li>
<li>
<p>获取到 token_access 之后，我们就可以用 token_access 去获取已登录的用户的信息了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`GET https://api.github.com/user`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`GET https://api.github.com/user`
</code></pre>
</li>
</ol>
<p>通过以上3个步骤，GitHub 授权登录就算是完成了。</p>
<h3 id="articleHeader3">四、评论系统如何使用</h3>
<ol>
<li>
<p>引入评论系统相关的 css、js 。引入相关样式和脚本之后，在你的页面加入以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;样式路径&quot;>
<script src=&quot;脚本路径&quot;></script>
<div id=&quot;comment&quot; class=&quot;comment&quot;>
</div>
<script>
JELON.Comment({
    container: 'comments', // 评论框容器id或对象，留空是默认为 comments 
    label: '<%- post.slug %>' || '<%- post.path %>', // 文章标签
    owner: '<%- theme.comment.owner %>', // GitHub application 创建者
    repo: '<%- theme.comment.repo %>', // issue 所在仓库名
    clientId: '<%- theme.comment.client_id %>', // GitHub application client_id
    clientSecret: '<%- theme.comment.client_secret %>' // GitHub application client_secret
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"样式路径"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"脚本路径"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"comment"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"comment"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
JELON.Comment({
    container: <span class="hljs-string">'comments'</span>, <span class="hljs-comment">// 评论框容器id或对象，留空是默认为 comments </span>
    label: <span class="hljs-string">'&lt;%- post.slug %&gt;'</span> || <span class="hljs-string">'&lt;%- post.path %&gt;'</span>, <span class="hljs-comment">// 文章标签</span>
    owner: <span class="hljs-string">'&lt;%- theme.comment.owner %&gt;'</span>, <span class="hljs-comment">// GitHub application 创建者</span>
    repo: <span class="hljs-string">'&lt;%- theme.comment.repo %&gt;'</span>, <span class="hljs-comment">// issue 所在仓库名</span>
    clientId: <span class="hljs-string">'&lt;%- theme.comment.client_id %&gt;'</span>, <span class="hljs-comment">// GitHub application client_id</span>
    clientSecret: <span class="hljs-string">'&lt;%- theme.comment.client_secret %&gt;'</span> <span class="hljs-comment">// GitHub application client_secret</span>
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
</li>
<li>由于这个评论系统是要集成到个人的主题上去的，所以要跟 hexo-theme-xups 搭配使用，hexo-theme-xups 主题链接为 <a href="https://github.com/jangdelong/hexo-theme-xups" rel="nofollow noreferrer" target="_blank">https://github.com/jangdelong/hexo-theme-xups</a>，目前最新的主题（带有GitHub 登录评论功能），后面会更新上去，往后当然也会陆续进行更新和优化，欢迎多多 star。</li>
</ol>
<h3 id="articleHeader4">五、遇到的问题</h3>
<p>遇到的问题主要有三个，一个是创建 label 权限问题，一个是跨域问题，另外一个 GitHub 授权登录兼容性问题。</p>
<ol>
<li>
<p>创建 label 权限问题（目前未解决）。label 是一个连接文章和 issue 关系的纽带，因为我们要用 label 去查询 issue number，后面的流程才能走下去。如今遇到的问题是，对于新文章来说，只能是我自己本人账号（GitHub Application）创建者才能创建带有 label 的 issue。参考了 GitHub 的接口（<code>POST /repos/:owner/:repo/issues</code>）文档，上面说</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> Labels to associate with this issue. NOTE: Only users with push access can set labels for new issues. Labels are silently dropped otherwise." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;">&gt; Labels <span class="hljs-keyword">to</span> associate <span class="hljs-keyword">with</span> <span class="hljs-keyword">this</span> issue. NOTE: Only users <span class="hljs-keyword">with</span> push access can set labels <span class="hljs-keyword">for</span> <span class="hljs-keyword">new</span> issues. Labels are silently dropped <span class="hljs-keyword">otherwise</span>.</code></pre>
</li>
<li>跨域问题（暂时解决了）。主要是通过 code 去换取 token_access 的 <code>POST https://github.com/login/oauth/access_token</code> 这个接口跨域，暂时解决方案是<br>使用 <code>https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token</code> 进行转发。参见：<a href="https://github.com/Rob--W/cors-anywhere/#documentation" rel="nofollow noreferrer" target="_blank">https://github.com/Rob--W/cor...</a> 。</li>
<li>GitHub 授权登录兼容性问题（暂时不解决）。经过简单的测试，发现 PC 端兼容性问题主要是一些老版本的浏览器，其中包括一些老版本的谷歌浏览器（版本号55.x.xxxx.xx）；而移动端的主要是 UC 浏览器无法实现 GitHub 授权登录。</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于 github issues 实现第三方评论系统

## 原文链接
[https://segmentfault.com/a/1190000011100934](https://segmentfault.com/a/1190000011100934)

