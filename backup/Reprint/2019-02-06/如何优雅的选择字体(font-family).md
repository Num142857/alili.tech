---
title: '如何优雅的选择字体(font-family)' 
date: 2019-02-06 2:30:09
hidden: true
slug: amznn2w2om
categories: [reprint]
---

{{< raw >}}

                    
<p>大家都知道，在不同操作系统、不同游览器里面默认显示的字体是不一样的，并且相同字体在不同操作系统里面渲染的效果也不尽相同，那么如何设置字体显示效果会比较好呢？下面我们逐步的分析一下：</p>
<h3 id="articleHeader0">一、首先我们看看各平台的默认字体情况</h3>
<h5>1、Window下：</h5>
<ul>
<li><p><strong>宋体（SimSun）</strong>：Win下大部分游览器的默认字体，<code>宋体</code>在小字号下（如12px、14px）的显示效果还可以接受，但是字号一大就非常糟糕了，所以使用的时候要注意。</p></li>
<li><p><strong>微软雅黑（"Microsoft Yahei"）</strong>：从 Vista 开始，微软提供了这款新的字体，一款无衬线的黑体类字体，并且拥有 <em>Regular</em>、<em>Bold</em> 两种粗细的字重，显著提高了字体的显示效果。现在这款字体已经成为Windows游览器中最值得使用的中文字体。从Win8开始，<code>微软雅黑</code>又加入了 <em>Light</em> 这款更细的字重，对于喜欢细字体的设计、开发人员又多了一个新的选择。</p></li>
<li><p><strong>Arial</strong>：Win平台上默认的无衬线西文字体（为什么要说英文字体后面会解释），有多种变体，显示效果一般。</p></li>
<li><p><strong>Tahoma</strong>：十分常见的无衬线字体，被采用为Windows 2000、Windows XP、Windows Server 2003及Sega游戏主机Dreamcast等系统的预设字型，显示效果比<code>Arial</code>要好。</p></li>
<li><p><strong>Verdana</strong>：无衬线字体，优点在于它在小字上仍结构清晰端整、阅读辨识容易。</p></li>
<li><p><strong>其他</strong>：Windows 下默认字体列表：<a href="https://www.microsoft.com/typography/fonts/product.aspx?pid=161" rel="nofollow noreferrer" target="_blank">微软官网</a>、<a href="https://en.wikipedia.org/wiki/List_of_typefaces_included_with_Microsoft_Windows" rel="nofollow noreferrer" target="_blank">维基百科</a>、<a href="https://support.office.com/zh-cn/article/%E4%B8%8D%E5%90%8C%E7%89%88%E6%9C%AC%E7%9A%84-Office-%E6%8F%90%E4%BE%9B%E7%9A%84%E5%AD%97%E4%BD%93-db1101fc-5cc0-4300-91cd-de7c79d907cd?CorrelationId=e2918255-27c6-4f99-b24c-6789900e8cb2&amp;ui=zh-CN&amp;rs=zh-CN&amp;ad=CN&amp;ocmsassetID=HA010282644" rel="nofollow noreferrer" target="_blank">Office字体</a></p></li>
<li><p><strong>结论：<code>微软雅黑</code>为Win平台上最值得选择的中文字体，但非游览器默认，需要设置；西文字体的选择以<code>Arial</code>、<code>Tahoma</code>等无衬线字体为主。</strong></p></li>
</ul>
<h5>2、Mac OS下：</h5>
<ul>
<li><p><strong>华文黑体（STHeiti）、华文细黑（STXihei）</strong>：属于同一字体家族系列，OS X 10.6 之前的简体中文系统界面默认字体，也是目前Chrome游览器下的默认字体，有 <em>Regular</em> 和 <em>Bold</em> 两个字重，显示效果可以接受，<code>华文细黑</code>也曾是我最喜欢的字体之一。</p></li>
<li><p><strong>黑体-简（Heiti SC）</strong>：从 10.6 开始，<code>黑体-简</code>代替<code>华文黑体</code>用作简体中文系统界面默认字体，苹果生态最常用的字体之一，包括iPhone、iPad等设备用的也是这款字体，显示效果不错，但是喇叭口设计遭人诟病。</p></li>
<li><p><strong>冬青黑体（ Hiragino Sans GB ）</strong>：听说又叫<code>苹果丽黑</code>，日文字体<code>Hiragino KakuGothic</code>的简体中文版，简体中文有 <em>常规体</em> 和 <em>粗体</em> 两种，<code>冬青黑体</code>是一款清新的专业印刷字体，小字号时足够清晰，拥有很多人的追捧。</p></li>
<li><p><strong>Times New Roman</strong>：Mac平台Safari下默认的字体，是最常见且广为人知的西文衬线字体之一，众多网页浏览器和文字处理软件都是用它作为默认字体。</p></li>
<li><p><strong>Helvetica、Helvetica Neue</strong>：一种被广泛使用的传奇般的西文字体（这货还有专门的记录片呢），在微软使用山寨货的<code>Arial</code>时，乔布斯却花费重金获得了<code>Helvetica</code>苹果系统上的使用权，因此该字体也一直伴随着苹果用户，是苹果生态中最常用的西文字体。<code>Helvetica Neue</code>为<code>Helvetica</code>的改善版本，且增加了更多不同粗细与宽度的字形，共拥有51种字体版本，极大的满足了日常的使用。</p></li>
<li><p><strong>苹方（PingFang SC）</strong>：在Mac OS X EL Capitan上，苹果为中国用户打造了一款全新中文字体--<code>苹方</code>，去掉了为人诟病的喇叭口，整体造型看上去更加简洁，字族共六枚字体：<em>极细体、纤细体、细体、常规体、中黑体、中粗体</em>。</p></li>
<li><p><strong>San Francisco</strong>：同样是Mac OS X EL Capitan上最新发布的西文字体，感觉和<code>Helvetica</code>看上去差别不大，目前已经应用在Mac OS 10.11+、iOS 9.0+、watch OS等最新系统上。</p></li>
<li><p><strong>其他</strong>：Mac下默认字体列表：<a href="https://support.apple.com/zh-cn/HT202408" rel="nofollow noreferrer" target="_blank">苹果官网</a>、<a href="https://en.wikipedia.org/wiki/List_of_typefaces_included_with_OS_X" rel="nofollow noreferrer" target="_blank">维基百科</a></p></li>
<li><p><strong>结论：目前<code>苹方</code>和<code>San Francisco</code>为苹果推出的最新字体，显示效果也最为优雅，但只有最新系统才能支持，而<code>黑体-简</code>和<code>Helvetica</code>可以获得更多系统版本支持，显示效果也相差无几，可以接受。</strong></p></li>
</ul>
<h5>3、Android系统：</h5>
<ul>
<li><p><strong>Droid Sans、Droid Sans Fallback</strong>：<code>Droid Sans</code>为安卓系统中默认的西文字体，是一款人文主义无衬线字体，而<code>Droid Sans Fallback</code>则是包含汉字、日文假名、韩文的文字扩展支持。</p></li>
<li><p><strong>结论：<code>Droid Sans</code>为默认的字体，并结合了中英文，无需单独设置。</strong></p></li>
</ul>
<h5>4、iOS系统：</h5>
<ul><li><p><strong>iOS系统的字体和Mac OS系统的字体相同，保证了Mac上的字体效果，iOS设备就没有太大问题。</strong></p></li></ul>
<h5>5、Linux：</h5>
<ul>
<li><p><strong>文泉驿点阵宋体</strong>：类似<code>宋体</code>的衬线字体，一般不推荐使用。</p></li>
<li><p><strong>文泉驿微米黑</strong>：几乎是 Linux 社区现有的最佳简体中文字体。</p></li>
</ul>
<h3 id="articleHeader1">二、选择字体需要注意的问题</h3>
<h5>1、字体的中英文写法：</h5>
<p>我们在操作系统中常常看到<code>宋体</code>、<code>微软雅黑</code>这样的字体名称，但实际上这只是字体的显示名称，而不是字体文件的名称，一般字体文件都是用英文命名的，如<code>SimSun</code>、<code>Microsoft Yahei</code>。在大多数情况下直接使用显示名称也能正确的显示，但是有一些用户的特殊设置会导致中文声明无效。<br><strong>因此，保守的做法是使用字体的字体名称（英文）或者两者兼写。</strong>如下示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: STXihei, &quot;Microsoft YaHei&quot;;
font-family: STXihei, &quot;华文细黑&quot;, &quot;Microsoft YaHei&quot;, &quot;微软雅黑&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">STXihei</span>, "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>";
<span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">STXihei</span>, "华文细黑", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "微软雅黑";</code></pre>
<h5>2、声明英文字体：</h5>
<p>绝大部分中文字体里都包含英文字母和数字，不进行英文字体声明是没有问题的，但是大多数中文字体中的英文和数字的部分都不是特别漂亮，所以建议也对英文字体进行声明。<br><strong>由于英文字体中大多不包含中文，我们可以先进行英文字体的声明，这样不会影响到中文字体的选择，因此优先使用最优秀的英文字体，中文字体声明则紧随其次。</strong>如下示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: Arial, &quot;Microsoft YaHei&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>";</code></pre>
<h5>3、照顾不同的操作系统：</h5>
<ul><li><p>英文、数字部分：在默认的操作系统中，Mac和Win都会带有<code>Arial</code>,  <code>Verdana</code>, <code>Tahoma</code>等几个预装字体，从显示效果来看，<code>Tahoma</code>要比<code>Arial</code>更加清晰一些，因此字体设置<code>Tahoma</code>最好放到前面，当找不到<code>Tahoma</code>时再使用<code>Arial</code>；而在Mac中，还拥有一款更加漂亮的<code>Helvetica</code>字体，所以为了照顾Mac用户有更好的体验，应该更优先设置<code>Helvetica</code>字体；Android系统下默认的无衬线字体就可以接受，因此无需单独设置。<strong>最后，英文、数字字体的最佳写法如下：</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: Helvetica, Tahoma, Arial;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Tahoma</span>, <span class="hljs-selector-tag">Arial</span>;</code></pre>
<ul><li><p>中文部分：在Win下，<code>微软雅黑</code>为大部分人最常使用的中文字体，由于很多人安装Office的缘故，Mac电脑中也会出现微软雅黑字体，因此把显示效果不错的<code>微软雅黑</code>加入到字体列表是个不错的选择；同样，为了保证Mac中更为优雅字体<code>苹方（PingFang SC）</code>、<code>黑体-简（Heiti SC）</code>、<code>冬青黑体（ Hiragino Sans GB ）</code>的优先显示，需要把这些字体放到中文字体列表的最前面；同时为了照顾到Linux操作系统的体验，还需要添加<code>文泉驿微米黑</code>字体。<strong>最后，中文字体部分最佳写法如下：</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: "<span class="hljs-selector-tag">PingFang</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>";</code></pre>
<p><strong>中英文整合写法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: Helvetica, Tahoma, Arial, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;;
font-family: Helvetica, Tahoma, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Tahoma</span>, <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>";
<span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Tahoma</span>, <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">PingFang</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>";</code></pre>
<h5>4、注意向下兼容</h5>
<p>如果还需要考虑旧版本操作系统用户的话，不得不加上一些旧版操作系统存在的字体：Mac中的<code>华文黑体</code>、<code>冬青黑体</code>，Win中的<code>黑体</code>等。<strong>同样按照显示效果排列在列表后面，写法如下：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: Helvetica, Tahoma, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, STXihei, &quot;Microsoft YaHei&quot;, SimHei, &quot;WenQuanYi Micro Hei&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Tahoma</span>, <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">PingFang</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", <span class="hljs-selector-tag">STXihei</span>, "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", <span class="hljs-selector-tag">SimHei</span>, "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>";</code></pre>
<p>加入了<code> STXihei（华文细黑）</code>和<code> SimHei（黑体）</code>。</p>
<h5>5、补充字体族名称</h5>
<p>字体族大体上分为两类：<code>sans-serif（无衬线体）</code>和<code>serif（衬线体）</code>，当所有的字体都找不到时，我们可以使用字体族名称作为操作系统最后选择字体的方向。一般非衬线字体在显示器中的显示效果会比较好，<strong>因此我们需要在最后添加<code> sans-serif</code>，写法如下：</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: Helvetica, Tahoma, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Tahoma</span>, <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">PingFang</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>", <span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<h3 id="articleHeader2">三、我们看一下大公司的常见写法（2016.07查看）</h3>
<h5>1、小米</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font: 14px/1.5 &quot;Helvetica Neue&quot;,Helvetica,Arial,&quot;Microsoft Yahei&quot;,&quot;Hiragino Sans GB&quot;,&quot;Heiti SC&quot;,&quot;WenQuanYi Micro Hei&quot;,sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font</span>: 14<span class="hljs-selector-tag">px</span>/1<span class="hljs-selector-class">.5</span> "<span class="hljs-selector-tag">Helvetica</span> <span class="hljs-selector-tag">Neue</span>",<span class="hljs-selector-tag">Helvetica</span>,<span class="hljs-selector-tag">Arial</span>,"<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">Yahei</span>","<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>","<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>","<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>",<span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<p>小米公司优先使用<code>Helvetica Neue</code>这款字体以保证最新版本Mac用户的最佳体验，选择了<code>Arial</code>作为Win下默认英文字体及Mac的替代英文字体；中文字体方面首选了<code>微软雅黑</code>，然后选择了<code>冬青黑体</code>及<code>黑体-简</code>作为Mac上的替代方案；最后使用<code>文泉驿微米黑</code>兼顾了Linux系统。</p>
<h5>2、淘宝</h5>
<p>鉴于淘宝网改版频率较频繁，这里截图保存了一下，<a href="http://oamfqhi9c.bkt.clouddn.com/blog_201607_taobao.jpg" rel="nofollow noreferrer" target="_blank">点此查看</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font: 12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font</span>: 12<span class="hljs-selector-tag">px</span>/1<span class="hljs-selector-class">.5</span> <span class="hljs-selector-tag">tahoma</span>,<span class="hljs-selector-tag">arial</span>,'<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>','\5<span class="hljs-selector-tag">b8b</span>\4<span class="hljs-selector-tag">f53</span>',<span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<p>其实从图中明显看出淘宝网的导航及内容有着大量的衬线字体，鉴于淘宝网站大部分字号比较小，显示效果也还可以接受。代码中可以看出淘宝使用了<code>Tahoma</code>、<code>Arial</code>作为首选英文字体，中文字体首选了<code>冬青黑体</code>，由于Win下没有预装该款字体，所以显示出了后面的宋体（<code>5b8b4f53</code>为汉字<code>宋体</code>用 unicode 表示的写法，不用<code>SimSun</code>是因为 Firefox 的某些版本和 Opera 不支持 <code>SimSun</code>的写法）</p>
<h5>3、简书</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: &quot;lucida grande&quot;, &quot;lucida sans unicode&quot;, lucida, helvetica, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: "<span class="hljs-selector-tag">lucida</span> <span class="hljs-selector-tag">grande</span>", "<span class="hljs-selector-tag">lucida</span> <span class="hljs-selector-tag">sans</span> <span class="hljs-selector-tag">unicode</span>", <span class="hljs-selector-tag">lucida</span>, <span class="hljs-selector-tag">helvetica</span>, "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>", <span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<p>自认为简书的阅读体验很棒，我们看看简书所用的字体，简书优先选择了<code>lucida</code>家族的系列字体作为英文字体，该系列字体在Mac和Win上都是预装的，并且有着不俗的表现；中文字体方面将<code>冬青黑体</code>作为最优先使用的字体，同样考虑了Linux系统。</p>
<p><em>各大公司的字体设置大同小异，这里不再一一举例查看，有兴趣的可以自己多多查看。</em></p>
<h3 id="articleHeader3">四、其他的一些注意点</h3>
<h5>1、字体何时需要添加引号</h5>
<p>当字体具体某个取值中若有一种样式名称包含空格，则需要用双引号或单引号表示，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: &quot;Microsoft YaHei&quot;, &quot;Arial Narrow&quot;, sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">Arial</span> <span class="hljs-selector-tag">Narrow</span>", <span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<p>如果书写中文字体名称为了保证兼容性也会添加引号，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: &quot;黑体-简&quot;, &quot;微软雅黑&quot;, &quot;文泉驿微米黑&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: "黑体<span class="hljs-selector-tag">-</span>简", "微软雅黑", "文泉驿微米黑";</code></pre>
<h5>2、引用外部字体</h5>
<p>大多数的中文字体由于版权原因不能随意使用，这里推荐一个免版权而且漂亮的中文字体<code>思源黑体</code>，该字体为Adobe与Google推出的一款开源字体， 有七种字体粗细<em>（ExtraLight、Light、Normal、Regular、Medium、Bold 和 Heavy）</em>，完全支持日文、韩文、繁体中文和简体中文，字形优美，依稀记得小米公司好像有使用过。<br>鉴于中文字体的体积比较大（一般字库全一点的中文字体动辄几Mb），所以较少人会使用外部字体，如果真的需要引入，也可以考虑通过工具根据页面文字的使用多少单独生成中文字体，以减小文件大小。</p>
<h3 id="articleHeader4">五、最后，推荐写法</h3>
<p>由于每个人的审美不一样，钟爱的字体也会有所有不同，这里给出我个人的常用写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">font-family</span>: "<span class="hljs-selector-tag">Helvetica</span> <span class="hljs-selector-tag">Neue</span>", <span class="hljs-selector-tag">Helvetica</span>, <span class="hljs-selector-tag">Arial</span>, "<span class="hljs-selector-tag">PingFang</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Hiragino</span> <span class="hljs-selector-tag">Sans</span> <span class="hljs-selector-tag">GB</span>", "<span class="hljs-selector-tag">Heiti</span> <span class="hljs-selector-tag">SC</span>", "<span class="hljs-selector-tag">Microsoft</span> <span class="hljs-selector-tag">YaHei</span>", "<span class="hljs-selector-tag">WenQuanYi</span> <span class="hljs-selector-tag">Micro</span> <span class="hljs-selector-tag">Hei</span>", <span class="hljs-selector-tag">sans-serif</span>;</code></pre>
<p>另外推荐两个github上的关于中文字体和排版的项目：</p>
<ul>
<li><p><a href="https://github.com/zenozeng/fonts.css" rel="nofollow noreferrer" target="_blank">Fonts.css -- 跨平台中文字体解决方案</a></p></li>
<li><p><a href="https://github.com/sofish/typo.css" rel="nofollow noreferrer" target="_blank">typo.css -- 中文网页重设与排版：一致化浏览器排版效果</a></p></li>
</ul>
<h3 id="articleHeader5">--参考资料</h3>
<ul>
<li><p><a href="https://www.zhihu.com/question/19911793" rel="nofollow noreferrer" target="_blank">如何保证网页的字体在各平台都尽量显示为最高质量的黑体？</a></p></li>
<li><p><a href="http://ruby-china.org/topics/14005" rel="nofollow noreferrer" target="_blank">Web 中文字体应用指南</a></p></li>
<li><p><a href="http://www.keleyi.com/a/bjac/avaf0haa.htm" rel="nofollow noreferrer" target="_blank">"5b8b4f53"的意思</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何优雅的选择字体(font-family)

## 原文链接
[https://segmentfault.com/a/1190000006110417](https://segmentfault.com/a/1190000006110417)

