---
title: 'QQ音乐API整理' 
date: 2019-01-30 2:30:23
hidden: true
slug: 9lyxyz4wc6g
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">QQ音乐API整理</h1>
<p><a href="http://www.vastskycc.com/?id=27" rel="nofollow noreferrer" target="_blank">blog</a><br><a href="https://github.com/ccchangkong/article/issues/23" rel="nofollow noreferrer" target="_blank">md</a></p>
<blockquote><p>最近准备用vue做个音乐播放器，网上找了找音乐API，看了一圈，还是QQ音乐最合适，这里做个整理</p></blockquote>
<h2 id="articleHeader1">歌曲搜索</h2>
<h3 id="articleHeader2">接口地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 3,
    name = '王菲',
    urlString = `http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&amp;n=${num}&amp;aggr=1&amp;cr=1&amp;loginUin=0&amp;format=json&amp;inCharset=GB2312&amp;outCharset=utf-8&amp;notice=0&amp;platform=jqminiframe.json&amp;needNewCode=0&amp;p=1&amp;catZhida=0&amp;remoteplace=sizer.newclient.next_song&amp;w=${name}`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">3</span>,
    name = <span class="hljs-string">'王菲'</span>,
    urlString = <span class="hljs-string">`http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&amp;n=<span class="hljs-subst">${num}</span>&amp;aggr=1&amp;cr=1&amp;loginUin=0&amp;format=json&amp;inCharset=GB2312&amp;outCharset=utf-8&amp;notice=0&amp;platform=jqminiframe.json&amp;needNewCode=0&amp;p=1&amp;catZhida=0&amp;remoteplace=sizer.newclient.next_song&amp;w=<span class="hljs-subst">${name}</span>`</span>;</code></pre>
<h3 id="articleHeader3">调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用了个PHP代理解决跨域问题
$.post(&quot;proxy.php&quot;, {
        urlString
      }, function(data) {
        data = JSON.parse(data)
        data['data']['song']['list'].forEach(
          e => console.log(e['f'])
        )
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//用了个PHP代理解决跨域问题</span>
$.post(<span class="hljs-string">"proxy.php"</span>, {
        urlString
      }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        data = <span class="hljs-built_in">JSON</span>.parse(data)
        data[<span class="hljs-string">'data'</span>][<span class="hljs-string">'song'</span>][<span class="hljs-string">'list'</span>].forEach(
          <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e[<span class="hljs-string">'f'</span>])
        )
      })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
$url=$_POST['urlString'];
$res = file_get_contents($url);
echo $res;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
$url=$_POST[<span class="hljs-string">'urlString'</span>];
$res = file_get_contents($url);
<span class="hljs-keyword">echo</span> $res;
<span class="hljs-meta">?&gt;</span></code></pre>
<h3 id="articleHeader4">注释</h3>
<p><code>num</code>：请求搜索的数量</p>
<p><code>name</code>：搜索的关键词</p>
<h2 id="articleHeader5">歌曲榜单</h2>
<h3 id="articleHeader6">接口地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 新歌榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js
// 总榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 新歌榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js</span>
<span class="hljs-comment">// 总榜：http://music.qq.com/musicbox/shop/v3/data/hit/hit_all.js</span></code></pre>
<h3 id="articleHeader7">调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
  type: &quot;get&quot;,
  async: false,
  url: &quot;http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js&quot;,
  dataType: &quot;jsonp&quot;,
  jsonp: &quot;callback&quot;,
  jsonpCallback: &quot;JsonCallback&quot;,
  scriptCharset: 'GBK',//设置编码，否则会乱码
  success: function(data) {
    console.log(JSON.stringify(data))
  },
  error: function() {
    alert('fail');
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
  <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
  <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">"http://music.qq.com/musicbox/shop/v3/data/hit/hit_newsong.js"</span>,
  <span class="hljs-attr">dataType</span>: <span class="hljs-string">"jsonp"</span>,
  <span class="hljs-attr">jsonp</span>: <span class="hljs-string">"callback"</span>,
  <span class="hljs-attr">jsonpCallback</span>: <span class="hljs-string">"JsonCallback"</span>,
  <span class="hljs-attr">scriptCharset</span>: <span class="hljs-string">'GBK'</span>,<span class="hljs-comment">//设置编码，否则会乱码</span>
  success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(data))
  },
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    alert(<span class="hljs-string">'fail'</span>);
  }
});</code></pre>
<h3 id="articleHeader8">注释</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007685833?w=1100&amp;h=130" src="https://static.alili.tech/img/remote/1460000007685833?w=1100&amp;h=130" alt="" title="" style="cursor: pointer;"></span></p>
<p>主要获取的是<code>id</code>（歌曲id）、<code>albumId</code>（图片id）</p>
<h2 id="articleHeader9">歌曲地址</h2>
<h3 id="articleHeader10">接口地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id = 101369814,
    src = `http://ws.stream.qqmusic.qq.com/${id}.m4a?fromtag=46`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> id = <span class="hljs-number">101369814</span>,
    src = <span class="hljs-string">`http://ws.stream.qqmusic.qq.com/<span class="hljs-subst">${id}</span>.m4a?fromtag=46`</span></code></pre>
<h3 id="articleHeader11">调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<audio src=&quot;http://ws.stream.qqmusic.qq.com/101369814.m4a?fromtag=46&quot; controls></audio>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://ws.stream.qqmusic.qq.com/101369814.m4a?fromtag=46"</span> <span class="hljs-attr">controls</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span></code></pre>
<h3 id="articleHeader12">注释</h3>
<p>没啥好说的。。</p>
<h2 id="articleHeader13">歌词地址</h2>
<h3 id="articleHeader14">接口地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var id = 101369814,
    txt = `http://music.qq.com/miniportal/static/lyric/${id%100}/${id}.xml`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> id = <span class="hljs-number">101369814</span>,
    txt = <span class="hljs-string">`http://music.qq.com/miniportal/static/lyric/<span class="hljs-subst">${id%<span class="hljs-number">100</span>}</span>/<span class="hljs-subst">${id}</span>.xml`</span>;</code></pre>
<h3 id="articleHeader15">调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用了个PHP代理解决跨域问题
$.post(&quot;proxy.php&quot;, {
        txt
      }, function(data) {
        console.log(data)
      })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//用了个PHP代理解决跨域问题</span>
$.post(<span class="hljs-string">"proxy.php"</span>, {
        txt
      }, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data)
      })</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
$url=$_POST['txt'];
$res = file_get_contents($url);
$s = iconv('gbk','UTF-8',$res);//大坑，一是转编码，二是不能直接iconv输出，得有个变量转接
echo $s;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
$url=$_POST[<span class="hljs-string">'txt'</span>];
$res = file_get_contents($url);
$s = iconv(<span class="hljs-string">'gbk'</span>,<span class="hljs-string">'UTF-8'</span>,$res);<span class="hljs-comment">//大坑，一是转编码，二是不能直接iconv输出，得有个变量转接</span>
<span class="hljs-keyword">echo</span> $s;
<span class="hljs-meta">?&gt;</span></code></pre>
<h3 id="articleHeader16">注释</h3>
<p>没啥说的</p>
<h2 id="articleHeader17">歌曲图片</h2>
<h3 id="articleHeader18">接口地址</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var image_id = 140820,
    width = 300,
    pic = `http://imgcache.qq.com/music/photo/album_${width}/${image_id%100}/${width}_albumpic_${image_id}_0.jpg`;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> image_id = <span class="hljs-number">140820</span>,
    width = <span class="hljs-number">300</span>,
    pic = <span class="hljs-string">`http://imgcache.qq.com/music/photo/album_<span class="hljs-subst">${width}</span>/<span class="hljs-subst">${image_id%<span class="hljs-number">100</span>}</span>/<span class="hljs-subst">${width}</span>_albumpic_<span class="hljs-subst">${image_id}</span>_0.jpg`</span>;</code></pre>
<h3 id="articleHeader19">调用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img src=&quot;http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_140820_0.jpg&quot; alt=&quot;&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://imgcache.qq.com/music/photo/album_300/20/300_albumpic_140820_0.jpg"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span></code></pre>
<h3 id="articleHeader20">注释</h3>
<p><code>image_id</code>：图片id</p>
<p><code>width</code>：图片尺寸</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007685834?w=2048&amp;h=1536" src="https://static.alili.tech/img/remote/1460000007685834?w=2048&amp;h=1536" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
QQ音乐API整理

## 原文链接
[https://segmentfault.com/a/1190000007685830](https://segmentfault.com/a/1190000007685830)

