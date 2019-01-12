---
title: '小小weibo音乐播放器' 
date: 2019-01-13 2:30:11
hidden: true
slug: jym0578xfxn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>故事背景：前几周看到一个网友做web音乐播放器，然而在巧合之下发现微博的网页播放器挺不错的，就捉摸着自己试试，文章最末处献上源码，喜欢就请带走吧。</p></blockquote>
<p>演示地址：<a href="http://123.56.191.84/jmusic_v1/jmusic.php" rel="nofollow noreferrer" target="_blank">http://123.56.191.84/jmusic_v...</a></p>
<p>兼容当前主流浏览器包括ie9及以上，不考虑兼容ie8及以下的浏览器</p>
<p>好了，步入正题，这个小东西涉及的一些大概知识点：<code>cRUL</code>、<code>ajax</code>、<code>session</code>、<code>memcache</code>、<code>闭包</code>、<code>递归</code>。。差不多就这些把，没别的了，考虑到有些朋友可能对有些知识点遗忘了，哈哈，我特意整理了每个知识点的笔记。<br><code>Cookie 与 Session：</code><a href="http://segmentfault.com/n/1330000009610165">http://segmentfault.com/n/133...</a><br><code>Memcache：</code><a href="https://segmentfault.com/n/1330000009605929" target="_blank">https://segmentfault.com/n/13...</a><button class="btn btn-xs btn-default ml10 preview" data-url="1330000009605929" data-typeid="4">点击预览</button><br><code>cURL：</code><a href="https://segmentfault.com/n/1330000009577171">https://segmentfault.com/n/13...</a><br>至于如果作为一个前端不知道ajax那我也没办法了，找点资料了解下吧，因为太简单，我就没有整理笔记了，但是如果有网友需要，可以联系我。</p>
<h1 id="articleHeader0">功能演示</h1>
<p>1.小窗口与大窗口切换<br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/1.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/1.gif" alt="tinywindow" title="tinywindow" style="cursor: pointer;"></span></p>
<p>2.播放面板的：后退、播放与暂停、前进、播放模式切换、音量（点赞与分享功能没做，和删除功能大同小异，后面有时间了我再补上）、定位播放位置（可拖拽）<br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/2.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/2.gif" alt="playing" title="playing" style="cursor: pointer;"></span></p>
<p>3.播放列表页、新歌榜（默认显示20首）、歌曲搜索页、列表滚动条。</p>
<h6>
<code>注：</code>这些歌曲均是通过网易接口爬取过来的，因为网易很坑，我拿到的接口中30首差不多就只有5-8首可以正常播放，所以采用了cURL爬取验证，过滤掉了不能放的音乐，如果不知道网易接口怎么用的，可以自行<a href="http://www.baidu.com" rel="nofollow noreferrer" target="_blank">百度</a>
</h6>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/4.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/4.gif" alt="list" title="list" style="cursor: pointer;"></span></p>
<p>4.播放列表的歌曲批量删除、单曲删除，排行榜的批量播放、搜索列表的批量播放。<br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/6.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/6.gif" alt="delete" title="delete" style="cursor: pointer;"></span></p>
<p>5.歌词的拖拽查看<br><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/5.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/66pig/-jMusic/f27729b1e1c42c3868994290066f9aa47d38306b/show/5.gif" alt="drag" title="drag" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">播放器使用方法（引入方法）</h1>
<ol>
<li><p>将除show文件夹之外的必要文件移动到你要显示播放器所在的文件夹</p></li>
<li><p>在要显示播放器的页面中插入如下几行代码</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. <?php session_start();?>
    2. <link charset=&quot;utf-8&quot; href=&quot;css/jmusic.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot; />
    3. <script charset=&quot;utf-8&quot; src=&quot;./js/jmusic.js&quot;></script>
    4. <script>jMusic.cacheid = '<?php if(!empty(session_id()))echo session_id(); ?>';</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    1. <span class="php"><span class="hljs-meta">&lt;?php</span> session_start();<span class="hljs-meta">?&gt;</span></span>
    2. <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/jmusic.css"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
    3. <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/jmusic.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    4. <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">jMusic.cacheid = '<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">empty</span>(session_id()))<span class="hljs-keyword">echo</span> session_id(); <span class="hljs-meta">?&gt;</span></span>';</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>注意：除第一行代码必须放在网页顶部外，其余代码可以插入到任意位置（但是css样式插入位置必须在<code>&lt;head&gt;</code>标签中），但是要保准顺序不能变 第4行代码必须要在第三行代码后面</p>
<h3 id="articleHeader2">代码插入示例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php session_start();?>
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>音乐播放器</title>
    <link charset=&quot;utf-8&quot; href=&quot;css/jmusic.css&quot; type=&quot;text/css&quot; rel=&quot;stylesheet&quot; />
</head>
<body>
    
</body>
<script charset=&quot;utf-8&quot; src=&quot;./js/jmusic.js&quot;></script>
<script>
    jMusic.cacheid = '<?php if(!empty(session_id()))echo session_id(); ?>';
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span> session_start();<span class="hljs-meta">?&gt;</span></span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>音乐播放器<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/jmusic.css"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/jmusic.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="handlebars"><span class="xml">
    jMusic.cacheid = '<span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">empty</span>(session_id()))<span class="hljs-keyword">echo</span> session_id(); <span class="hljs-meta">?&gt;</span></span>';
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>提醒：代码必须要放置在php环境、并且安装memcache扩展</p>
<h3 id="articleHeader3">4行代码解释</h3>
<p>1.<code>&lt;?php session_start();?&gt;</code>  //启动Session 的初始化 ，分配给用户一个sessionid，此id使用来读取服务器缓存的用户播放记录和新歌榜记录（方便下次快速播放-&gt;因为网易api的问题才会考虑缓存新歌榜的记录的）。<br>2.<code>&lt;link charset="utf-8" href="css/jmusic.css" type="text/css" rel="stylesheet" /&gt;</code>   // 引入css样式文件<br>3.<code>&lt;script charset="utf-8" src="./js/jmusic.js"&gt;&lt;/script&gt;</code>   引入js主文件<br>4.<code>&lt;script&gt;jMusic.cacheid = '&lt;?php if(!empty(session_id()))echo session_id(); ?&gt;';&lt;/script&gt;</code>  // 将sessionid传递给js主文件通过ajax进行服务器的匹配是否存在此用户的缓存音乐，如果存在就直接返回，没有怎重新从api获取</p>
<h1 id="articleHeader4">文件目录</h1>
<ul>
<li><p>jmusic.php //次文件是你的将要引入播放器的文件（可修改）</p></li>
<li><p>css  // css样式文件（不可改，但是如果懂，可以自行修改）</p></li>
<li><p>js   // js主文件（不可改，但是如果懂，可以自行修改）</p></li>
<li><p>php  // 存放着php文件，用于验证网易api中那些音乐可以播放哪些音乐不可以播放</p></li>
<li><p>show // 用于存放本文章中所有功能演示图片（可删除）</p></li>
</ul>
<h1 id="articleHeader5">提示</h1>
<p>这种可以缓存音乐的都是需要用户登录的，考虑到大家看演示的时候都会缓存造成大量垃圾，而我又是用的很渣的服务器，所以缓存在的时间只有24小时，并且开启了session的垃圾回收机制（当访问过大时，超时的session会被自动删除）。<br>如果想要看微博原始播放器的朋友，可以移步至：<a href="http://www.weibo.com" rel="nofollow noreferrer" target="_blank">点击进入微博页</a><code>提醒：必须要登录后播放器才会显示，如果有账号可以登录查看</code></p>
<h1 id="articleHeader6">源码下载地址</h1>
<p><a href="https://github.com/66pig/-jMusic" rel="nofollow noreferrer" target="_blank">https://github.com/66pig/-jMusic</a></p>
<h6>其实很早就做出来了，但是好尴尬，最开始不知道怎么把源码发上来（自己服务器存放的时间都不长，链接容易失效），没玩过github，初次尝试，别见笑，后期有时间会更新的，如果你们觉得有什么bug也可以合并过来，大家相互学习。</h6>
<p>当有朋友想要视频播放器的时候会发现其实视频播放器的功能多数都体现在了这个音乐播放器，是吧？这就是为啥我把这个发出来，而视频播放器中多数人的一个瓶颈应该全屏问题，下次再说吧，先到这里了，如果有问题可以联系我。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小小weibo音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000009631416](https://segmentfault.com/a/1190000009631416)

