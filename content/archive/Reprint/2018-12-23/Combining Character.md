---
title: 'Combining Character' 
date: 2018-12-23 2:30:07
hidden: true
slug: u166d0wr7y
categories: [reprint]
---

{{< raw >}}

                    
<p>第一次写segmentfault，欢迎大家<strong>提意见</strong>以便改进。</p>
<p>今天要讨论的是关于<strong>字符编码</strong>的一些问题，源自一次项目周会，因网络上没有相关文章，现在刚好能总结一下。</p>
<p><strong>1. 首先来看几张有意思的现象：</strong></p>
<p>(1)￼ 下面这幅图中出现一些“叠起来”的字体，来自微信公众号“麦当劳”于2017年6月28日的推送，感兴趣的同学可以去看看。</p>
<p><span class="img-wrap"><img data-src="/img/bVZBJE?w=1076&amp;h=206" src="https://static.alili.tech/img/bVZBJE?w=1076&amp;h=206" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>比如第一个“叠起来”的字，分别由以下两个字体组成，其它的“特技字体”也一样。<br><span class="img-wrap"><img data-src="/img/bVZBJX?w=54&amp;h=42" src="https://static.alili.tech/img/bVZBJX?w=54&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVZBJ2?w=58&amp;h=42" src="https://static.alili.tech/img/bVZBJ2?w=58&amp;h=42" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<p>(2) 再看下面这个字，我把它复制粘贴到这：<br>小⃠</p>
<p>在Chrome浏览器看到的可能是下面这样：<br><span class="img-wrap"><img data-src="/img/bVZBLp?w=64&amp;h=40" src="https://static.alili.tech/img/bVZBLp?w=64&amp;h=40" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在iPhone微信和Safari等平台或浏览器上看到的可能是：<br><span class="img-wrap"><img data-src="/img/bVZBLq?w=46&amp;h=40" src="https://static.alili.tech/img/bVZBLq?w=46&amp;h=40" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在某些Android微信上看到的可能是：<br><span class="img-wrap"><img data-src="/img/bVZBM2?w=54&amp;h=36" src="https://static.alili.tech/img/bVZBM2?w=54&amp;h=36" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>你可以复制这个网站地址，或者可以复制字符串"小⃠"到不同平台上观察显示的效果。</p>
<hr>
<p>(3) 连续打两个字符，如：<br><span class="img-wrap"><img data-src="/img/bVZBO2?w=58&amp;h=38" src="https://static.alili.tech/img/bVZBO2?w=58&amp;h=38" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVZBOZ?w=62&amp;h=36" src="https://static.alili.tech/img/bVZBOZ?w=62&amp;h=36" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>Chrome浏览器显示：<br><span class="img-wrap"><img data-src="/img/bVZBO9?w=44&amp;h=36" src="https://static.alili.tech/img/bVZBO9?w=44&amp;h=36" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Sarafi浏览器显示：<br><span class="img-wrap"><img data-src="/img/bVZBPg?w=54&amp;h=50" src="https://static.alili.tech/img/bVZBPg?w=54&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在写这篇blog的时候，我也很苦恼，怎么写出这个"?"符号，因为经常会和前面的一个字符“叠起来”，会造成误解。</p>
<hr>
<p>(4) 复制“小⃠”到Chrome地址栏时，显示倒是“正常”：<br><span class="img-wrap"><img data-src="/img/bVZBMu?w=792&amp;h=74" src="https://static.alili.tech/img/bVZBMu?w=792&amp;h=74" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>但是，上图是地址栏获得焦点时的情况，如果此时失去焦点会发生如下情况：<br><span class="img-wrap"><img data-src="/img/bVZBMB?w=766&amp;h=66" src="https://static.alili.tech/img/bVZBMB?w=766&amp;h=66" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2. 分析</strong> </p>
<p>(1) 不妨先用内置的<code>encodeURIComponent()</code> 和 <code>decodeURIComponent()</code>探个究竟。</p>
<p>总的来说，这个“叠起来”的字符解码之后是这个结果（为了便于查看，这里用Safari进行测试）：</p>
<p><span class="img-wrap"><img data-src="/img/bVZBNF?w=1378&amp;h=120" src="https://static.alili.tech/img/bVZBNF?w=1378&amp;h=120" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZBOF?w=1370&amp;h=136" src="https://static.alili.tech/img/bVZBOF?w=1370&amp;h=136" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZBN1?w=1160&amp;h=122" src="https://static.alili.tech/img/bVZBN1?w=1160&amp;h=122" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>至于<code>%E2%83%A0</code>，我用Chrome控制台输出，因为在Safari下编辑器处理这段编码的结果会把写注释的'/'叠上，如图：<span class="img-wrap"><img data-src="/img/bVZBPg?w=54&amp;h=50" src="https://static.alili.tech/img/bVZBPg?w=54&amp;h=50" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZBOK?w=426&amp;h=82" src="https://static.alili.tech/img/bVZBOK?w=426&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p>(2) 翻阅了许多资料终于在Wikipedia找到相关内容，<a href="https://en.wikipedia.org/wiki/Combining_character" rel="nofollow noreferrer" target="_blank"></a><a href="https://en.wikipedia.org/wiki/Combining_character" rel="nofollow noreferrer" target="_blank">https://en.wikipedia.org/wiki...</a></p>
<p>其中讲到一些背景因素，以及一些奇葩的组合类型：</p>
<blockquote>
<p>In digital typography, combining characters are characters that are intended to modify other characters. The most common combining characters in the Latin script are the combining diacritical marks (including combining accents).</p>
<p>Unicode also contains many precomposed characters, so that in many cases it is possible to use both combining diacritics and precomposed characters, at the user's or application's choice. This leads to a requirement to perform Unicode normalization before comparing two Unicode strings and to carefully design encoding converters to correctly map all of the valid ways to represent a character in Unicode to a legacy encoding to avoid data loss.</p>
<p>In Unicode, the main block of combining diacritics for European languages and the International Phonetic Alphabet is U+0300–U+036F. Combining diacritical marks are also present in many other blocks of Unicode characters. In Unicode, diacritics are always added after the main character, so it is possible to add several diacritics to the same character, although as of 2010, few applications support correct rendering of such combinations.</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVZBSA?w=1384&amp;h=762" src="https://static.alili.tech/img/bVZBSA?w=1384&amp;h=762" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZBSC?w=2048&amp;h=574" src="https://static.alili.tech/img/bVZBSC?w=2048&amp;h=574" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVZBSD?w=1346&amp;h=502" src="https://static.alili.tech/img/bVZBSD?w=1346&amp;h=502" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<hr>
<p><strong>3. 看到这也大致了解了 <code>Combining Character</code>，不妨再看看Web开发中常见的乱码：</strong></p>
<p>有一次，我在微信公众号开发项目中，指定回复消息为文本格式的时候，尝试了几种换行方式都不行，最终了解即XML的换行应使用：<code>&amp;#x00A;</code></p>
<p><code>&amp;#x00A;</code>是字符实体编号（16进制），可以用于处理XML中文本的换行。</p>
<p>对应的正确代码在第9行（部分文字有修改）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<xml>
  <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
  <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
  <CreateTime><% createTime %></CreateTime>
    <MsgType><![CDATA[<%= msgType %>]]></MsgType>
    <% if (msgType === 'text') { if(content!==&quot;zs&quot;) { %>
      <Content><![CDATA[<%= content %>]]></Content>
      <% } else { %>
      <Content>欢迎来到报名图书馆暑假工！&amp;#x00A;&amp;#x00A;&amp;#x00A;报名步骤：&amp;#x00A;&amp;#x00A;①将招聘推文转发至朋友圈或者40人以上的群，让更多同学了解本招聘。为招聘方宣传以找到更多优质学生员工。&amp;#x00A;&amp;#x00A;→&amp;lt;a href=&amp;quot;http://a.xiumi.us/board/v5/29Ndm/47380885&amp;quot;&amp;gt;点此进入招聘推文&amp;lt;/a&amp;gt;&amp;#x00A;&amp;#x00A;②回复你的资料：报名+姓名+电话号码+深圳哪个区+可上班时间&amp;#x00A;&amp;#x00A;&amp;#x00A;</Content>
      <% "}}" else if (msgType === 'zs') { %>
      <Content>&amp;lt;a href=&amp;quot;http://www.youzan.com&amp;quot;&amp;gt;ddwadwada&amp;lt;/a&amp;gt;</Content>
      <% } else if (msgType === 'image') { %>
        <Image>
          <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
      </Image>
  ...
</xml>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">xml</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ToUserName</span>&gt;</span>&lt;![CDATA[&lt;%= toUserName %&gt;]]&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">ToUserName</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">FromUserName</span>&gt;</span>&lt;![CDATA[&lt;%= fromUserName %&gt;]]&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">FromUserName</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">CreateTime</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">createTime</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CreateTime</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">MsgType</span>&gt;</span>&lt;![CDATA[&lt;%= msgType %&gt;]]&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">MsgType</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">msgType</span> === <span class="hljs-string">'text'</span>) { <span class="hljs-attr">if</span>(<span class="hljs-attr">content</span>!==<span class="hljs-string">"zs"</span>) { %&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Content</span>&gt;</span>&lt;![CDATA[&lt;%= content %&gt;]]&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">Content</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } <span class="hljs-attr">else</span> { %&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Content</span>&gt;</span>欢迎来到报名图书馆暑假工！&amp;#x00A;&amp;#x00A;&amp;#x00A;报名步骤：&amp;#x00A;&amp;#x00A;①将招聘推文转发至朋友圈或者40人以上的群，让更多同学了解本招聘。为招聘方宣传以找到更多优质学生员工。&amp;#x00A;&amp;#x00A;→&amp;lt;a href=&amp;quot;http://a.xiumi.us/board/v5/29Ndm/47380885&amp;quot;&amp;gt;点此进入招聘推文&amp;lt;/a&amp;gt;&amp;#x00A;&amp;#x00A;②回复你的资料：报名+姓名+电话号码+深圳哪个区+可上班时间&amp;#x00A;&amp;#x00A;&amp;#x00A;<span class="hljs-tag">&lt;/<span class="hljs-name">Content</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> "}}" <span class="hljs-attr">else</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">msgType</span> === <span class="hljs-string">'zs'</span>) { %&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Content</span>&gt;</span>&amp;lt;a href=&amp;quot;http://www.youzan.com&amp;quot;&amp;gt;ddwadwada&amp;lt;/a&amp;gt;<span class="hljs-tag">&lt;/<span class="hljs-name">Content</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">%</span> } <span class="hljs-attr">else</span> <span class="hljs-attr">if</span> (<span class="hljs-attr">msgType</span> === <span class="hljs-string">'image'</span>) { %&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Image</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">MediaId</span>&gt;</span>&lt;![CDATA[&lt;%= content.mediaId %&gt;]]&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">MediaId</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Image</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">xml</span>&gt;</span></code></pre>
<p>由这个问题，我们想到web开发中还有一些类似的“乱码”，这些乱码又有哪些规律呢？</p>
<hr>
<p>(1) 字符实体</p>
<p>字符实体是XML和HTML中的字符编码方式，也就是上面事例中提到的，格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&amp; + 实体名称 + ;
&amp; + (# + unicode编码) + ;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">&amp; + 实体名称 + ;
&amp; + (# + unicode编码) + ;</code></pre>
<p>实体名称一般是有意义的词，方便大家记忆，比如小于号&lt;的实体名称是lt，也就是less than的缩写。只有部分符号是有实体名称的，使用unicode编码是更通用的写法。</p>
<p>像文字类一般不会采用这种编码方式，主要用于在HTML或XML文档中输出一些保留字符和空格，比如我想在HTML中展示一段html代码就需要使用字符实体。</p>
<p>比如我们要展示<code>&lt;p&gt;情深深雨蒙蒙&lt;/p&gt;</code> 以下两种表示是等效的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<pre>
  &amp;lt;p&amp;gt;情深深雨蒙蒙&amp;lt;&amp;#47;p&amp;gt;
  &amp;#60;p&amp;#62;情深深雨蒙蒙&amp;#60;&amp;#47;p&amp;#62;
</pre>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">pre</span>&gt;</span>
  &amp;lt;p&amp;gt;情深深雨蒙蒙&amp;lt;&amp;#47;p&amp;gt;
  &amp;#60;p&amp;#62;情深深雨蒙蒙&amp;#60;&amp;#47;p&amp;#62;
<span class="hljs-tag">&lt;/<span class="hljs-name">pre</span>&gt;</span></code></pre>
<p>总而言之，字符实体是HTML和XML中的编码方式，比如在HTML文档中写入：我，那么最终页面上看到的是我这个汉字。</p>
<hr>
<p>(2) unicode字符</p>
<p>编程语言中的unicode字符的格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="\u + 16进制unicode编码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code style="word-break: break-word; white-space: initial;">\u + <span class="hljs-number">16</span>进制<span class="hljs-built_in">unicode</span>编码</code></pre>
<p>绝大多数编程语言，包括CSS中都支持unicode字符，不过HTML和XML是不支持的。那么什么时候使用unicode字符呢？一般来说有两种场景：</p>
<ul>
<li>避免文件保存时采用不同编码导致的乱码，因为u已经声明了是unicode。</li>
<li>正则匹配中的一些应用：<a href="http://www.zuojj.com/archives/1074.html" rel="nofollow noreferrer" target="_blank">Unicode编码及在正则表达式中的使用</a>
</li>
</ul>
<p>在JS中可以使用charCodeAt()获取字符串的10进制unicode编码</p>
<hr>
<p>(3) URL编码</p>
<p>类似<code>%E6%88%91</code>这样的，叫做URL编码，在链接的参数里非常常见</p>
<p>网络标准RFC 1738做了硬性规定：</p>
<blockquote><p>“只有字母和数字[0-9a-zA-Z]、一些特殊符号”$-_.+!*'(),”[不包括双引号]、以及某些保留字，才可以不经过编码直接用于URL。”</p></blockquote>
<p>所以像汉字，空格这些都必须经过转码。上面讲的unicode字符，字符实体用的都是unicode编号，而URL编码用的则是utf-8, 规则是将utf-8编码每隔两个字符加一个%</p>
<p>UTF 是英文 Unicode Transformation Format 的缩写，意为把 Unicode 字符转换为某种格式。unicode和utf-8并不是同一种东西，但是又存在着联系：unicode是信源编码，对字符集数字化; utf-8，utf-16这些是信道编码，为更好的存储和传输。</p>
<p>简单说，unicode就是一组数字，每一个数字对应一个字符。utf-8就是对字符的传输和保存时的规则。比如说“我”这个字，unicode码（16进制）是6211，utf-8是E68891, 那么对应的URL编码就是%E6%88%91;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  Unicode编码: 0x6211,
  UTF8编码: E68891,
  UTF16编码: FEFF6211,
  UTF32编码: 0000FEFF00006211
  URL编码: %E6%88%91
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  Unicode编码: <span class="hljs-number">0x6211</span>,
  UTF8编码: E68891,
  UTF16编码: FEFF6211,
  UTF32编码: <span class="hljs-number">0000</span>FEFF00006211
  URL编码: %E6%<span class="hljs-number">88</span>%<span class="hljs-number">91</span>
}</code></pre>
<hr>
<p>(4) 本段小结：</p>
<p>Web开发中常见的几种乱码包括：Unicode字符、字符实体、URL编码。如以下情况都表示“我”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Unicode字符： \u6211
字符实体编号（16进制）：&amp;#x6211;
字符实体编号（10进制）：&amp;#25105;
URL编码：%E6%88%91" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">Unicode字符： \u<span class="hljs-number">6</span><span class="hljs-number">2</span><span class="hljs-number">1</span><span class="hljs-number">1</span>
字符实体编号（<span class="hljs-number">16</span>进制）：&amp;#x<span class="hljs-number">6</span><span class="hljs-number">2</span><span class="hljs-number">1</span><span class="hljs-number">1</span>;
字符实体编号（<span class="hljs-number">10</span>进制）：&amp;#<span class="hljs-number">25105</span>;
URL编码：%E<span class="hljs-number">6</span>%<span class="hljs-number">88</span>%<span class="hljs-number">91</span></code></pre>
<p>这些编码规则的本质都是一些特殊符号 + Unicode编码 所组成。</p>
<hr>
<p><strong>4. 总结</strong></p>
<p>从【1】中展示的，各种奇怪现象我们找到原因和资料是Combining Character以及编码相关问题，其次我们也拓展了一下Web开发中常见的一些”乱码”以及相关的技术背景。</p>
<p>欢迎大家指正或<strong>提意见</strong>以便改进。</p>
<hr>
<p><strong>5. 延伸阅读</strong></p>
<ul>
<li><a href="http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html" rel="nofollow noreferrer" target="_blank">《阮一峰：字符编码笔记》</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2010/02/url_encoding.html?%E6%88%91" rel="nofollow noreferrer" target="_blank">《阮一峰：关于URL编码》</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2014/12/unicode.html" rel="nofollow noreferrer" target="_blank">《阮一峰：Unicode与JavaScript》</a></li>
<li><a href="http://www.cnblogs.com/skynet/archive/2011/05/03/2035105.html" rel="nofollow noreferrer" target="_blank">字符集与字符编码</a></li>
<li><a href="https://www.zhihu.com/question/23374078" rel="nofollow noreferrer" target="_blank">知乎：unicode和utf-8有什么区别</a></li>
<li><a href="http://www.alloyteam.com/2016/12/javascript-has-a-unicode-sinkhole/" rel="nofollow noreferrer" target="_blank">javascript中unicode的坑</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Combining Character

## 原文链接
[https://segmentfault.com/a/1190000012261545](https://segmentfault.com/a/1190000012261545)

