---
title: '浅谈easy-mock 最好的备胎没有之一' 
date: 2019-03-02 2:30:07
hidden: true
slug: cd0azlldjr9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbi8JE?w=1008&amp;h=298" src="https://static.alili.tech/img/bVbi8JE?w=1008&amp;h=298" alt="浅谈easy-mock 最好的备胎没有之一,本文由@IT·平头哥联盟-首席填坑官∙苏南 分享" title="浅谈easy-mock 最好的备胎没有之一,本文由@IT·平头哥联盟-首席填坑官∙苏南 分享" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">引言</a></h2>
<p>​　　今天我们来聊聊<code>Mock</code>，随着互联网发展，这两年前后端分离的开发模式兴起，Mock也从以住的幕后走上了台面，让更多的人而得知，以前传统的开发方式Mock大多局限在后端人员接触较多一些。</p>
<p>　　<code>Mock</code>已经是老生常谈了，网上一搜索就很多，各位前辈们都讲的很到位，但今天我只讲它——<a href="https://easy-mock.com" rel="nofollow noreferrer" target="_blank">easy-mock</a>。</p>
<p>　　为什么会突然来聊它，这个就说来话长了，个人简介里就说过，专注于分享工作中遇到的坑，但这一次不是我的坑，来源于QQ群友（<code>#</code> 如果您有想知道的故事，而正好我也会，那么就由我为您讲出来吧，欢迎留言哦 <code>#</code> ），请看下图：<br><span class="img-wrap"><img data-src="/img/bVbi8JH?w=1080&amp;h=608" src="https://static.alili.tech/img/bVbi8JH?w=1080&amp;h=608" alt="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" title="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<blockquote>这里是<a href="https://honeybadger8.github.io/blog/" rel="nofollow noreferrer" target="_blank">@IT·平头哥联盟</a>，我是<code>首席填坑官</code>—<a href="https://github.com/meibin08" rel="nofollow noreferrer" target="_blank">苏南</a>,用心分享 做有温度的攻城狮。</blockquote>
<h2 id="articleHeader1"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">什么是Mock</a></h2>
<p>　　什么是Mock?? <code>Mock</code>其实就是真实数据存在之前，即调试期间的代替品，是个虚拟的存在，用人话讲它就是个备胎，如女生长的好看，追她的人多，但又不是很满意但也不拒绝，在自己心仪的小哥哥出现之前，一直吊着你😂！<br><span class="img-wrap"><img data-src="/img/bVbi8JI?w=1080&amp;h=608" src="https://static.alili.tech/img/bVbi8JI?w=1080&amp;h=608" alt="一张图带你看清，什么叫备胎，公众号：honeyBadger8" title="一张图带你看清，什么叫备胎，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">如何Mock数据？</a></h2>
<ul>
<li>不要告诉我 <code>new</code> 一个哦，对象可以 <code>new</code>，备胎可<code>new</code>不出来呢🤫；</li>
<li>方法一：最low的方式将 Mock 数据写在代码里、json文件里；</li>
<li>方法二：利用 <code>Charles</code> 、<code>Fiddler</code>等代理工具，将 URL 映射到本地文件；</li>
<li>方法三：本地起 Mock Server，即mockjs，有点麻烦每次修改了后还要重启服务，<code>nodemon</code>能解决，但开的东西多了，电脑卡出翔，维护也麻烦；</li>
<li>方法四：规范些的公司自己已经集成了一套mock数据体系；</li>
<li>
<strong>重点来了</strong>：<code>easy-mock</code>一个在线 <code>Mock</code> 平台，活儿好又性感是你备胎的最佳选择。</li>
<li>当然优秀的你可能还有很多其他的方式，欢迎补充。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//mock 基本使用示例
import Mock from &quot;mockjs&quot;;
Mock.mock({
    &quot;code&quot;: 0,
    &quot;message&quot;: &quot;请求成功&quot;,
    &quot;data|20&quot;: [{
        &quot;name&quot;: &quot;@cname&quot;,//cname 中文，name 英文
        &quot;userId&quot;: &quot;@id&quot;,
        &quot;lastDate&quot;: &quot;@datetime&quot;
    }]
})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//mock 基本使用示例</span>
<span class="hljs-keyword">import</span> Mock <span class="hljs-keyword">from</span> <span class="hljs-string">"mockjs"</span>;
Mock.mock({
    <span class="hljs-string">"code"</span>: <span class="hljs-number">0</span>,
    <span class="hljs-string">"message"</span>: <span class="hljs-string">"请求成功"</span>,
    <span class="hljs-string">"data|20"</span>: [{
        <span class="hljs-string">"name"</span>: <span class="hljs-string">"@cname"</span>,<span class="hljs-comment">//cname 中文，name 英文</span>
        <span class="hljs-string">"userId"</span>: <span class="hljs-string">"@id"</span>,
        <span class="hljs-string">"lastDate"</span>: <span class="hljs-string">"@datetime"</span>
    }]
})
</code></pre>
<h2 id="articleHeader3"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">什么是easy-mock，能给我们带来什么？</a></h2>
<ul>
<li>Easy Mock 是一个可视化，并且能快速生成 模拟数据 的持久化服务，</li>
<li>Easy Mock 支持基于 <code>Swagger</code> 创建项目，以节省手动创建接口的时间；</li>
<li>简单点说：Easy Mock就是一个在线创建mock的服务平台，帮你省去你 <strong>配置</strong>、<strong>安装</strong>、<strong>起服务</strong>、<strong>维护</strong>、<strong>多人协作Mock数据不互通</strong>等一系列繁琐的操作， 它能在不用1秒钟的时间内给你所要的一切，呼之即来、挥之即去的2018最优秀<code>备胎</code>没有之一，完全不用担心负任何责任哦。</li>
<li>更多优点它在等你去发现哦……</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbi8JU?w=1080&amp;h=474" src="https://static.alili.tech/img/bVbi8JU?w=1080&amp;h=474" alt="一张图带你看清，什么叫备胎，公众号：honeyBadger8" title="一张图带你看清，什么叫备胎，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">深入浅出 - 简介</a></h2>
<ul>
<li>就跟人一样长的再好看，了解过后才懂，一样东西也是如何，谁用谁知道；</li>
<li>Easy Mock支持<code>团队协作</code>，也可以是个人项目，</li>
<li>以下以个人项目为例，与多人协作没有区别，只是少了成员邀请；</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbi8JQ?w=1080&amp;h=608" src="https://static.alili.tech/img/bVbi8JQ?w=1080&amp;h=608" alt="Mock.js深入浅出 - 简介一张图带你看清，什么叫备胎，公众号：honeyBadger8" title="Mock.js深入浅出 - 简介一张图带你看清，什么叫备胎，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">深入浅出 - Mock语法回顾</a></h2>
<ul>
<li>@ip -&gt; 随机输出一个ip；</li>
<li>@id -&gt; 随机输出长度18的字符，不接受参数；</li>
<li>"array|1-10" -&gt; 随机输出1-10长度的数组，也可以直接是固定长度；</li>
<li>"object|2" -&gt; 输出一个两个key值的对象，</li>
<li>"@image()" 返回一个占位图url，支持<code>size</code>, <code>background</code>, <code>foreground</code>, <code>format</code>, <code>text</code>；</li>
<li>等等，这里就不再一一介绍。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbi8JV?w=1080&amp;h=608" src="https://static.alili.tech/img/bVbi8JV?w=1080&amp;h=608" alt="深入浅出 - Mock语法回顾，公众号：honeyBadger8" title="深入浅出 - Mock语法回顾，公众号：honeyBadger8" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">深入浅出 - 创建一个接口</a></h2>
<ul>
<li>它的写法，跟Mock.js一模一样,上面代码已经展示过，<a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">更多示例</a>
</li>
<li>使用<code>Easy Mock</code>创建一个接口，请看下图：</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbi8JW?w=1080&amp;h=608" src="https://static.alili.tech/img/bVbi8JW?w=1080&amp;h=608" alt="Mock.js深入浅出 - 创建一个接口" title="Mock.js深入浅出 - 创建一个接口" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">深入浅出 - 高阶用法 Function</a></h2>
<ul>
<li>在线编辑，它也能支持 <strong><code>function</code></strong> ，</li>
<li>是不是很优秀，能获取到全部请求头，可以让我们像写在js里一样写逻辑，写运算，</li>
<li>当然它肯定是还有很多局限性的，如并不支持<code>ES6</code>，</li>
<li>有一点需要注意的是 <code>function</code> 里要写传出<code>Mock</code>对象，不能直接<code>@...</code>，</li>
<li>来看示例：</li>
</ul>
<table>
<thead><tr>
<th>对象</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>Mock</td>
<td>Mock 对象</td>
</tr>
<tr>
<td>_req.url</td>
<td>获得请求 url 地址</td>
</tr>
<tr>
<td>_req.method</td>
<td>获取请求方法</td>
</tr>
<tr>
<td>_req.params</td>
<td>获取 url 参数对象</td>
</tr>
<tr>
<td>_req.querystring</td>
<td>获取查询参数字符串(url中?后面的部分)，不包含 ?</td>
</tr>
<tr>
<td>_req.query</td>
<td>将查询参数字符串进行解析并以对象的形式返回，如果没有查询参数字字符串则返回一个空对象</td>
</tr>
<tr>
<td>_req.body</td>
<td>当 post 请求以 x-www-form-urlencoded 方式提交时，我们可以拿到请求的参数对象</td>
</tr>
<tr>
<td>...</td>
<td>_req.cookies、ip、host等等，<code>我只是一个代码的搬运</code>，更详细<a href="https://easy-mock.com/docs" rel="nofollow noreferrer" target="_blank">请看这里</a>
</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//简单模拟登录，根据用户传入的参数，返回不同逻辑数据
{
  defaultName:function({_req}){
    return _req.query.name;
  },
  code: function({_req}){
    return this.defaultName ? 0 : -97;
  },
  message: function({_req}) {
    return this.defaultName ? &quot;登录成功&quot; : &quot;参数错误&quot;;
  },
  data: function({_req,Mock}){
    return this.defaultName ? {
      token: Mock.mock(&quot;@guid()&quot;),
      userId: Mock.mock(&quot;@id(5)&quot;),
      cname: Mock.mock(&quot;@cname()&quot;),
      name: Mock.mock(&quot;@name()&quot;),
      avatar: Mock.mock(&quot;@image(200x100, #FF6600)&quot;),
      other:&quot;@IT·平头哥联盟-首席填坑官∙苏南 带你再谈Mock数据之easy-mock&quot;
    }:{}
  }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//简单模拟登录，根据用户传入的参数，返回不同逻辑数据</span>
{
  <span class="hljs-attr">defaultName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{_req}</span>)</span>{
    <span class="hljs-keyword">return</span> _req.query.name;
  },
  <span class="hljs-attr">code</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{_req}</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.defaultName ? <span class="hljs-number">0</span> : <span class="hljs-number">-97</span>;
  },
  <span class="hljs-attr">message</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{_req}</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.defaultName ? <span class="hljs-string">"登录成功"</span> : <span class="hljs-string">"参数错误"</span>;
  },
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">{_req,Mock}</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.defaultName ? {
      <span class="hljs-attr">token</span>: Mock.mock(<span class="hljs-string">"@guid()"</span>),
      <span class="hljs-attr">userId</span>: Mock.mock(<span class="hljs-string">"@id(5)"</span>),
      <span class="hljs-attr">cname</span>: Mock.mock(<span class="hljs-string">"@cname()"</span>),
      <span class="hljs-attr">name</span>: Mock.mock(<span class="hljs-string">"@name()"</span>),
      <span class="hljs-attr">avatar</span>: Mock.mock(<span class="hljs-string">"@image(200x100, #FF6600)"</span>),
      <span class="hljs-attr">other</span>:<span class="hljs-string">"@IT·平头哥联盟-首席填坑官∙苏南 带你再谈Mock数据之easy-mock"</span>
    }:{}
  }
}

</code></pre>
<h2 id="articleHeader8"><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">深入浅出 - 在线调试</a></h2>
<ul>
<li>再优秀的工程师写出的代码也一样要测试，没有人敢说自己的代码无<code>Bug</code>，</li>
<li>
<code>Easy Mock</code> 它是真的懂你的，已经为你准备好了，接口编写好后，立马就能让你测试，</li>
<li>是不是觉得很棒棒呢？？如果是你自己本地写mock数据，你需要重启服务、手动写参数、可能还需要整个测试页，</li>
<li>知道你已经非常饥渴迫切的想要知道，具体的调试方式了：</li>
<li>看不清吗？？已经为你备好<a href="https://easy-mock.com/mock/5a0aad39eace86040209063d/pjhApi_1510649145466/api/common/logins#!method=post" rel="nofollow noreferrer" target="_blank">在线调试链接</a>，支持POST、GET、PUT等方式，因gif图加载比较大，就不一一演示了</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVbi8J7?w=360&amp;h=240" src="https://static.alili.tech/img/bVbi8J7?w=360&amp;h=240" alt="Mock.js深入浅出 - 在线调试" title="Mock.js深入浅出 - 在线调试" style="cursor: pointer; display: inline;"></span></p>
<h4><a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">结尾：</a></h4>
<p>　　天下无不散之宴席，又到说再见的时候了，以上就是今天<code>苏南</code>为大家带来的分享，您GET到了吗？<code>Easy Mock</code>更多强大之处自己去折腾吧，<code>#</code>用心分享 做有温度的攻城狮<code>#</code>，希望今天的分享能给您带来些许成长，如果觉得不错记得点个赞哦，，顺便关注下方<strong>公众号</strong>就更棒了呢，每周为您推最新分享👇👇。</p>
<p><span class="img-wrap"><img data-src="/img/bVbiLDa?w=600&amp;h=336" src="https://static.alili.tech/img/bVbiLDa?w=600&amp;h=336" alt="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" title="宝剑锋从磨砺出，梅花香自苦寒来，做有温度的攻城狮!，公众号：honeyBadger8" style="cursor: pointer; display: inline;"></span></p>
<h4>更多文章：</h4>
<p><a href="https://blog.csdn.net/weixin_43254766/article/details/83472544" rel="nofollow noreferrer" target="_blank">immutability因React官方出镜之使用总结分享！</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/82811714" rel="nofollow noreferrer" target="_blank">小程序项目之做完项目老板给我加了6k薪资～</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83662686" rel="nofollow noreferrer" target="_blank">小程序项目之填坑小记</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83119712" rel="nofollow noreferrer" target="_blank">面试踩过的坑，都在这里了～</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83267838" rel="nofollow noreferrer" target="_blank">你应该做的前端性能优化之总结大全！</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83618630" rel="nofollow noreferrer" target="_blank">如何给localStorage设置一个过期时间？</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83472829" rel="nofollow noreferrer" target="_blank">动画一点点 - 如何用CSS3画出懂你的3D魔方？</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/83267817" rel="nofollow noreferrer" target="_blank">动画一点点 - 手把手教你如何绘制一辆会跑车</a><br><a href="https://blog.csdn.net/weixin_43254766/article/details/82800822" rel="nofollow noreferrer" target="_blank">SVG Sprites Icon的使用技巧</a></p>
<blockquote>作者：苏南 - <a href="https://github.com/meibin08/" rel="nofollow noreferrer" target="_blank">首席填坑官</a><p>链接：<a href="https://blog.csdn.net/weixin_43254766" rel="nofollow noreferrer" target="_blank">https://blog.csdn.net/weixin_...</a></p>
<p>交流群：912594095、公众号：<code>honeyBadger8</code></p>
<p>本文原创，著作权归作者所有。商业转载请联系<code>@IT·平头哥联盟</code>获得授权，非商业转载请注明原链接及出处。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈easy-mock 最好的备胎没有之一

## 原文链接
[https://segmentfault.com/a/1190000016915831](https://segmentfault.com/a/1190000016915831)

