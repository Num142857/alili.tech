---
title: '给自己的Fonts教程' 
date: 2019-01-11 2:30:08
hidden: true
slug: emm6tj02i9a
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">准备工作</h1>
<h3 id="articleHeader1">字符 - Character</h3>
<h4>字母、数字、汉字、符号等，是一种抽象实体。</h4>
<h3 id="articleHeader2">字形 - Glyph</h3>
<h4>单个「字符」的具体表达，一个字可有多个不同的字形。</h4>
<p><span class="img-wrap"><img data-src="/img/bVPE4s?w=366&amp;h=347" src="https://static.alili.tech/img/bVPE4s?w=366&amp;h=347" alt="Glyph" title="Glyph" style="cursor: pointer; display: inline;"></span></p>
<p>原则上 Unicode 中只对<strong>字</strong>，而非字形编码。</p>
<h3 id="articleHeader3">字型 - Font</h3>
<h4>印刷行业中，指某一整套具有同样样式和尺码的字形，如一整套中易宋体 5 号字、一整套 9 磅 Helvetica Neue粗体字。</h4>
<p><span class="img-wrap"><img data-src="/img/bVPmdM?w=1528&amp;h=1056" src="https://static.alili.tech/img/bVPmdM?w=1528&amp;h=1056" alt="Helvetica Neue的字重" title="Helvetica Neue的字重" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">字体 - Typeface</h3>
<h4>若干个「字型」在若干个尺寸上的集合。</h4>
<p><span class="img-wrap"><img data-src="/img/bVPmds?w=1536&amp;h=580" src="https://static.alili.tech/img/bVPmds?w=1536&amp;h=580" alt="字体与字族" title="字体与字族" style="cursor: pointer; display: inline;"></span></p>
<p>随着计算机字体 (computer font) 的普及，可缩放的矢量字体的出现使得「字型」与「字体」的界限逐渐模糊，现今这两个概念在数字排印领域越来越多地被当做同义词使用。</p>
<h4>「书体」- 宋体、仿宋体、黑体等…</h4>
<p>例如 Windows 自带的「宋体」实为「中易宋体」。</p>
<h1 id="articleHeader5">Fonts分类</h1>
<h2 id="articleHeader6">西文字体</h2>
<h3 id="articleHeader7">基础术语</h3>
<p><span class="img-wrap"><img data-src="/img/bVPgFu?w=720&amp;h=540" src="https://static.alili.tech/img/bVPgFu?w=720&amp;h=540" alt="基础术语" title="基础术语" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPgGe?w=720&amp;h=540" src="https://static.alili.tech/img/bVPgGe?w=720&amp;h=540" alt="基础术语" title="基础术语" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">分类</h3>
<table><tbody>
<tr>
<td align="center"><strong>名称</strong></td>
<td align="center"><strong>描述</strong></td>
<td align="center"><strong>举例</strong></td>
</tr>
<tr>
<td align="center">serif(衬线体)</td>
<td align="center">衬线体有爪形的衬线并且笔划粗细有变化</td>
<td align="center">Centaur,Garamond,Caslon,Baskerville,Didot,Bodoni</td>
</tr>
<tr>
<td align="center">sans-serif(无衬线体)</td>
<td align="center">完全抛弃装饰衬线,笔画粗细对比小,x高度较高</td>
<td align="center">Helvetica,Franklin Gothic,Futura,Gill Sans,Optima,Univers,Myriad,Avenir</td>
</tr>
<tr>
<td align="center">cursive(手写体)</td>
<td align="center">一般具有连笔(joining strokes)或者其它除斜体字体外的手写特征</td>
<td align="center">Comic Sans MS</td>
</tr>
<tr>
<td align="center">fantasy(幻想体)</td>
<td align="center">主要是装饰性的，但仍然具有字符表现(与不表现字符的Pi或者Picture字体相反)</td>
<td align="center">Bodoni Ornaments</td>
</tr>
<tr>
<td align="center">monospace(等宽体)</td>
<td align="center">所有字形都具有相等的固定宽度</td>
<td align="center">Menlo</td>
</tr>
</tbody></table>
<p>这里面，我们经常用到的是<code>serif</code>体和<code>sans-serif</code>体</p>
<p><span class="img-wrap"><img data-src="/img/bVPhwJ?w=720&amp;h=540" src="https://static.alili.tech/img/bVPhwJ?w=720&amp;h=540" alt="serif" title="serif" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPhwG?w=720&amp;h=540" src="https://static.alili.tech/img/bVPhwG?w=720&amp;h=540" alt="sans-serif" title="sans-serif" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">Serif与Sans-Serif</h3>
<p><code>Serif</code>强调字母笔画的开始及结束，因此前后连续性强，易读性高。</p>
<p><code>Sans Serif</code>则较醒目，但在行文阅读的情況下，<code>Sans-Serif</code> 容易造成字母辨认的困扰，常会有来回重读及上下行错乱的情形。在小字体的场合，通常<code>Sans-Serif</code>比<code>Serif</code>更清晰。</p>
<h4>适用用途</h4>
<p>通常文章的內文、正文使用的是易读性较佳的 <code>Serif</code> 字体，这可增加易读性，而且长时间阅读下因为会以word为单位来阅读，较不容易疲倦。</p>
<p>而标题、表格內用字则采用较醒目的<code>Sans Serif</code>字体，它需要显著、醒目，但不必长时间盯著这些字来阅读。</p>
<p>像宣传品、海报类，为求醒目，它的短篇的段落也会采用<code>Sans-Serif</code>字体。但在书籍、报刊杂志，正文有相当篇幅的情形下，则应采用<code>Serif</code>字体来减轻读者阅读上的负担。在Web设计及浏览器设置中也应遵循此原则为是。</p>
<h2 id="articleHeader10">中文字体</h2>
<p>中文的书写体系有两种标准，一种是简体中文，一种是繁体中文</p>
<p><span class="img-wrap"><img data-src="/img/bVPilt?w=600&amp;h=384" src="https://static.alili.tech/img/bVPilt?w=600&amp;h=384" alt="简体繁体" title="简体繁体" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">分类</h3>
<table><tbody>
<tr>
<td align="center"><strong>名称</strong></td>
<td align="center"><strong>描述</strong></td>
<td align="center"><strong>举例</strong></td>
</tr>
<tr>
<td align="center">宋体（明朝体、明体）</td>
<td align="center">横笔画水平、竖笔画粗壮、拥有华丽但规范字脚的字体</td>
<td align="center">中易宋体（SimSun）,新宋体（ the Times New Roman）</td>
</tr>
<tr>
<td align="center">黑体（哥特体）</td>
<td align="center">结构方正，没有字脚</td>
<td align="center">中易黑体（SimHei），微软雅黑（Microsoft YaHei），思源黑体（    Source Han Sans）</td>
</tr>
<tr>
<td align="center">楷体</td>
<td align="center">横笔画也可以带角度，柔软且富有弹性的末端，以及符合自然的笔触宽度</td>
<td align="center">Kaiti，方正楷体</td>
</tr>
<tr>
<td align="center">仿宋（宋朝体）</td>
<td align="center">横微微倾斜，不会有很大的字脚，横竖笔画的粗细对比也没有宋体那么大</td>
<td align="center">方正仿宋</td>
</tr>
<tr>
<td align="center">美术体</td>
<td align="center">美术体是一类极具风格的字体，它们可以包括从稚嫩到厚重到新奇的各类风格</td>
<td align="center">丁丁手绘体</td>
</tr>
</tbody></table>
<p>另外，圆体（圆黑体）通常也归入黑体。传统上说的「等线体」以当代视角来看通常是较为幼细的黑体。</p>
<p>中文字体界不少人不主张用「衬线」、「无衬线」来指代宋体和黑体。</p>
<h4>宋体</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009920620?w=600&amp;h=411" src="https://static.alili.tech/img/remote/1460000009920620?w=600&amp;h=411" alt="宋体" title="宋体" style="cursor: pointer;"></span></p>
<h4>黑体</h4>
<p><span class="img-wrap"><img data-src="/img/bVPiPt?w=600&amp;h=411" src="https://static.alili.tech/img/bVPiPt?w=600&amp;h=411" alt="黑体" title="黑体" style="cursor: pointer;"></span></p>
<h4>楷体</h4>
<p><span class="img-wrap"><img data-src="/img/bVPiPu?w=600&amp;h=411" src="https://static.alili.tech/img/bVPiPu?w=600&amp;h=411" alt="楷体" title="楷体" style="cursor: pointer; display: inline;"></span></p>
<h4>仿宋</h4>
<p><span class="img-wrap"><img data-src="/img/bVPiXM?w=600&amp;h=411" src="https://static.alili.tech/img/bVPiXM?w=600&amp;h=411" alt="仿宋" title="仿宋" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">宋体与黑体</h3>
<p>宋体，原形为宋代模仿楷书基本笔划（如点、撇、捺），但因应当时以木板作活版印刷，为顺应木的天然纹理，而从楷体左低右高的斜横演变成直横，因为减低损耗而将竖划加粗的印刷用字体。到明代，这种字体逐渐脱离楷书的模样，成为一种成熟的印刷字体。</p>
<p>黑体的发明比较晚,学者对于黑体的历史有很大的争议,但我们可以发现它是二十世纪早期广告印刷品的产物。</p>
<h4>适用用途</h4>
<p>由于宋体是因为印刷诞生的，所以它更适合报纸和书籍的正文类文字的排版。</p>
<p>由于黑体醒目的特点，常用于标题、导语、标志等等。由于汉字笔划多，小字的黑体清晰度较差，所以一开始主要用于文章标题，但随着制字技术的精进，已有许多适用于内文的黑体字型。</p>
<h2 id="articleHeader13">计算机字体分类方式</h2>
<h3 id="articleHeader14">1. 点阵字体（Bitmap Fonts）</h3>
<ul>
<li><p>本质上是点阵图片的集合。</p></li>
<li><p>渲染极快</p></li>
<li><p>显示效果稳定</p></li>
<li><p>容易创建</p></li>
<li><p>在小字号、多笔画时渲染效果较好</p></li>
<li><p>视觉效果较差</p></li>
<li><p>不适合缩放</p></li>
</ul>
<h3 id="articleHeader15">2. 轮廓字体（Outline Font）</h3>
<ul>
<li><p>是向量图的集合，用 Bézier 曲线描述字形，适合缩放。</p></li>
<li>
<p>PostScript 字体</p>
<ul>
<li><p>Adobe 开发</p></li>
<li><p>用三次 Bézier 曲线描述字形。</p></li>
<li><p>私有 hinting，价格昂贵</p></li>
<li><p>质量高，适合打印专业质量的印刷出版物</p></li>
<li><p>又细分为 <strong>Type1</strong> / Type3 / CID 等类型</p></li>
</ul>
</li>
<li>
<p>TrueType 字体</p>
<ul>
<li><p>Apple 为对抗 Adobe 的 Type1 与 Microsoft 共同开发</p></li>
<li><p>用二次 Bézier 曲线描述字形，渲染较快</p></li>
<li><p>可内置点阵字体</p></li>
<li><p>在 OS X 和 Windows 中是最常见的字体格式</p></li>
</ul>
</li>
<li>
<p>OpenType 字体</p>
<ul>
<li><p>源于 Microsoft 独自开发的 TrueType Open</p></li>
<li><p>后 Adobe 加入开发，增加对 PostScript 轮廓的支持</p></li>
<li><p>PostScript flavor / TrueType flavor</p></li>
<li><p>Adobe 黑体</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader16">3. 笔画字体（Stroke-based font）</h3>
<h3 id="articleHeader17">4. METAFONT</h3>
<h3 id="articleHeader18">计算机字体区别</h3>
<p>如何理解点阵字体和轮廓字体的区别呢，其实它们的表现和图片格式中的png8和png24的的区别很类似，点阵字体都是实色，没有过渡色，边缘锐利，而轮廓字体有过渡色，边缘也比较平滑。很多人把“宋体”（Simsun）当作点阵字体，其实不是，它和“微软雅黑”（Microsoft YaHei）一样，都属于轮廓字体，只不过12px~17px的宋体内置了点阵信息而已。</p>
<p><span class="img-wrap"><img data-src="/img/bVPpBR?w=666&amp;h=290" src="https://static.alili.tech/img/bVPpBR?w=666&amp;h=290" alt="" title="" style="cursor: pointer;"></span></p>
<p>如下图，前面有两个 T 的是 TrueType 的格式字体，O 开头的是 OpenType 的字体。</p>
<p><span class="img-wrap"><img data-src="/img/bVPpBH?w=266&amp;h=180" src="https://static.alili.tech/img/bVPpBH?w=266&amp;h=180" alt="" title="" style="cursor: pointer;"></span></p>
<p>OpenType字体中的字形（glyph）、轮廓数据可以在两种格式中任选其一：一个是在<code>glyf</code>表中TrueType格式轮廓，另一个是在<code>CFF</code>表中的CFF（压缩字体格式，Compact Font Format）格式轮廓。CFF轮廓数据是基于PostScript语言Type 2字体格式。表格名<code>CFF</code>长度为四个字符，并且以一个空格字符结尾。</p>
<p><span class="img-wrap"><img data-src="/img/bVPE8w?w=228&amp;h=61" src="https://static.alili.tech/img/bVPE8w?w=228&amp;h=61" alt="TrueType flavor" title="TrueType flavor" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVPE8t?w=406&amp;h=61" src="https://static.alili.tech/img/bVPE8t?w=406&amp;h=61" alt="PostScript flavor" title="PostScript flavor" style="cursor: pointer;"></span></p>
<p><a href="https://zh.wikipedia.org/wiki/TrueType" rel="nofollow noreferrer" target="_blank">TrueType</a><br><a href="https://zh.wikipedia.org/wiki/OpenType" rel="nofollow noreferrer" target="_blank">OpenType</a></p>
<h2 id="articleHeader19">OS与Fonts</h2>
<p><a href="https://www.microsoft.com/typography/fonts/" rel="nofollow noreferrer" target="_blank">Windows 字体列表</a></p>
<p><a href="https://en.wikipedia.org/wiki/List_of_typefaces_included_with_macOS" rel="nofollow noreferrer" target="_blank">Mac OS X 字体列表</a></p>
<p><a href="http://www.zhangxinxu.com/study/201703/font-family-chinese-english.html" rel="nofollow noreferrer" target="_blank">Windows、OS X、Liunx/Unix预装中文字体demo</a></p>
<p>上面的例子列举了<code>Windows</code>、<code>OS X</code>、<code>Liunx/Unix</code>预装字体以及一些版权字体</p>
<h4>默认中文字体</h4>
<table><tbody>
<tr>
<td align="center">Windows</td>
<td align="center">OS X</td>
<td align="center">Linux/Unix</td>
</tr>
<tr>
<td align="center">微软雅黑UI（MicroSoft YaHei UI）<strong>Win8+</strong>
</td>
<td align="center">苹方-简（PingFangSC）<strong>OS X 10.11+</strong>
</td>
<td align="center">文泉驿微米黑（WenQuanYi Microhei）</td>
</tr>
<tr>
<td align="center">微软雅黑（MicroSoft YaHei ）<strong>Win Vista+</strong>
</td>
<td align="center">黑体-简(Heiti SC)<strong>Mac OS X 10.6+</strong>
</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">中易宋体（SimSun）</td>
<td align="center">华文黑体(STHeiti)</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">-</td>
<td align="center">冬青黑体简体中文（Hiragino Sans GB）<strong>Mac OS X 10.6+ 非默认</strong>
</td>
<td align="center">-</td>
</tr>
</tbody></table>
<table><tbody>
<tr>
<td align="center">Android</td>
<td align="center">IOS</td>
</tr>
<tr>
<td align="center">思源黑体（Noto Sans CJK SC）<strong>Android 5.0+</strong>
</td>
<td align="center">苹方-简（PingFangSC）<strong>IOS9.0+</strong>
</td>
</tr>
<tr>
<td align="center">Droid Sans Fallback</td>
<td align="center">黑体-简(Heiti SC) <strong>iPhone OS 3.0+</strong>
</td>
</tr>
<tr>
<td align="center">-</td>
<td align="center">华文黑体(STHeiti)</td>
</tr>
</tbody></table>
<h4>默认西文字体</h4>
<table><tbody>
<tr>
<td align="center">无衬线</td>
<td align="center">衬线</td>
<td align="center">等宽</td>
</tr>
<tr>
<td align="center">San Francisco（<strong>OS X 10.11+</strong>/<strong>IOS9.0+</strong>）</td>
<td align="center">Georgia</td>
<td align="center">Menlo</td>
</tr>
<tr>
<td align="center">Helvetica<strong>(IOS1.0+)</strong> / Helvetica Neue（<strong>OS X10.10+</strong>/<strong>IOS 4.0+</strong>）</td>
<td align="center">Times New Roman</td>
<td align="center">Courier</td>
</tr>
<tr>
<td align="center">Lucida Grande（OS X）</td>
<td align="center">-</td>
<td align="center">Monaco</td>
</tr>
<tr>
<td align="center">Segoe UI（<strong>Win Vista+</strong>）</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">Tahoma</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">Verdana</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">Arial</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">Roboto（<strong>Android 4.0+</strong>）</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
<tr>
<td align="center">Droid Sans（Android）</td>
<td align="center">-</td>
<td align="center">-</td>
</tr>
</tbody></table>
<h1 id="articleHeader20">Fonts的渲染过程</h1>
<h2 id="articleHeader21">编码</h2>
<p>为什么需要编码？</p>
<p>我们知道计算机处理的数据实际上都是二级制的数据,也就是计算机实际上只识别0和1两种状态。发明计算机的过程中人们需要解决的第一个问题就是文字的处理问题,也就是我们如何将文字符号转化为二级制数据，同时我们也需要能够将转化后的二进制数据重新转化为文字符号供我们阅读。前面的过程我们称之为编码，后面的这个过程我们称之为解码。这和电信领域更著名的一套编解码规则莫尔斯码是一个原理。</p>
<p>鉴于各个国家都有自己的字符集和编码方式,为了实现在一份文档中可以正确显示所有类型的字符，Unicode诞生了，伴随着互联网的发展，Unicode字符集和UTF-8编码方式成了互联网通信的标准。</p>
<p>这张 Unicode表分成了很多的 block，把某一类字符放在指定的 block 中，如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVPmd1?w=650&amp;h=1258" src="https://static.alili.tech/img/bVPmd1?w=650&amp;h=1258" alt="unicode表" title="unicode表" style="cursor: pointer;"></span></p>
<p>西文字体比如 Helvetica 等，一定会完成拉丁文对应的 block 中的字形，但是他们是不会去做 CJK（中日韩） 的字形。而特殊字符，比如表情符号等，也是有预留位置的，这也是为啥我们经常发现别人发过来的一些东西是方块，因为对方发送的字符在我们自己的机器上并没有相应的字体来显示。</p>
<p>详细编码知识请看 <a href="https://www.zhihu.com/question/22680300" rel="nofollow noreferrer" target="_blank">乱码是怎样形成的？</a></p>
<h2 id="articleHeader22">解码</h2>
<p>当浏览器收到来自<strong>Web</strong>服务器的数据后，第一步就是要把它解码成可以阅读的文本，而浏览器判断代码主要是依据以下方法：</p>
<ol>
<li><p><strong>Web</strong>服务器返回的<strong>HTTP</strong>头中的<code>Content-Type:text/html;charset=</code>信息，这一般有最高的优先级；</p></li>
<li><p>网页本身<code>meta</code><strong>header</strong>中的<code>Content-Type</code>信息的<code>charset</code>部分，对于<strong>HTTP</strong>头未指定编码或者本地文件，一般是这么判断；</p></li>
<li><p>假如前两条都没有找到，浏览器菜单里一般允许用户强制指定编码。</p></li>
<li><p>部分浏览器 (比如 <strong>Firefox</strong>) 可以选择编码自动检测功能，使用基于统计的方法判断未定编码。</p></li>
</ol>
<h2 id="articleHeader23">分段</h2>
<p>编码确定后，网页就被解码成了Unicode字符流，因为我们得到的文本可能是很多种语言混杂的，里面可能有中文、有英文，它们可能要用不同的字体显示；</p>
<p>为了统一处理这些复杂的情况，我们要将文本分为由不同语言组成的小段，在有的文本布局引擎里，这个步骤称为“itemize”。分解后的文本段常被称作“text run”，但是具体划分的规则可能根据不同的引擎有所区别。</p>
<p>不少浏览器还会在这个划分下面，在确定具体使用的字体之后，根据使用字体的不同划分更细的 <strong>run</strong>，这种 <strong>run</strong> 可能称作<strong>“SimpleTextRun”</strong>，每个都会使用和相邻不同的字体，最后把它们逐一交给 <strong>shaper</strong> 进行排版得到要绘制的字形，这样一来，<strong>shaper</strong> 的工作就被简化为<strong>在确定的语言、确定的字体下排版确定的文本，生成对应的字形和它们应该放置的位置、占用的空间。</strong></p>
<h2 id="articleHeader24">Fonts匹配</h2>
<h4><a href="https://www.w3.org/TR/CSS22/fonts.html#algorithm" rel="nofollow noreferrer" target="_blank">CSS 2.2 Font matching algorithm</a></h4>
<ol>
<li><p>UA 创建(或访问)一个 CSS 2.2 相关属性的字体数据库；</p></li>
<li><p>对每个元素的<strong>每个字符</strong>，先尝试匹配第一个 <code>font-family</code> 名字；</p></li>
<li><p>找到则尝试匹配剩余属性 (<code>font-style</code>, <code>font-variant</code>, …)；</p></li>
<li><p>如果 (1) 没有完全匹配的字体，或 (2) 字体匹配但相应字形缺失，则尝试匹配下一个 <code>font-family</code>；</p></li>
<li><p>如果 <code>font-family</code> 无法匹配，UA 分配默认字体；</p></li>
<li><p>如果该字符在 UA 选择的所有字体下均无字形，UA 应选择某个字体中的「missing character」的字形，<br>例如「�」。</p></li>
</ol>
<h4>
<a href="https://www.w3.org/html/ig/zh/wiki/CSS3%E5%AD%97%E4%BD%93%E6%A8%A1%E5%9D%97#.E5.AD.97.E4.BD.93.E5.8C.B9.E9.85.8D.E7.AE.97.E6.B3.95" rel="nofollow noreferrer" target="_blank">CSS3字体匹配算法</a>与CSS2.1字体匹配算法的差异：</h4>
<ul>
<li><p>算法包括font-stretch匹配。</p></li>
<li><p>确定了font-style匹配中所有可能的情况。</p></li>
<li><p>小型大写字母字体不作为字体匹配过程的一部分进行匹配，它们现在通过字体特性进行处理。</p></li>
<li><p>需要Unicode <a href="http://unicode.org/reports/tr28/tr28-3.html#13_7_variation_selectors" rel="nofollow noreferrer" target="_blank">variation selector</a>匹配。</p></li>
</ul>
<h3 id="articleHeader25">Font属性</h3>
<p><a href="https://codepen.io/rcjydds/pen/eRgLXK" rel="nofollow noreferrer" target="_blank">font属性使用小demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/eRgLXK" data-typeid="3">点击预览</button></p>
<p>小米官网</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" font: 14px/1.5 &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Microsoft Yahei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Heiti SC&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code> <span class="hljs-attribute">font</span>: <span class="hljs-number">14px</span>/<span class="hljs-number">1.5</span> <span class="hljs-string">"Helvetica Neue"</span>, Helvetica, Arial, <span class="hljs-string">"Microsoft Yahei"</span>, <span class="hljs-string">"Hiragino Sans GB"</span>, <span class="hljs-string">"Heiti SC"</span>, <span class="hljs-string">"WenQuanYi Micro Hei"</span>, sans-serif;
</code></pre>
<h3 id="articleHeader26">Font-family属性</h3>
<h4>Font匹配是通过哪个名称?</h4>
<p>name - Naming Table</p>
<p>按 OpenType 规范，字体的名称信息存在 <a href="https://www.microsoft.com/typography/otspec/name.htm" rel="nofollow noreferrer" target="_blank">name</a> 表中。</p>
<ul><li>
<p>Name Records</p>
<ul>
<li><p>Platform ID</p></li>
<li><p>Platform-specific encoding ID</p></li>
<li><p>Language ID</p></li>
<li><p><strong>Name ID</strong></p></li>
<li><p>…</p></li>
</ul>
</li></ul>
<h4>Name IDs(部分)</h4>
<table><tbody>
<tr>
<td align="center">ID</td>
<td align="center">含义</td>
</tr>
<tr>
<td align="center">1</td>
<td align="center">Font Family name (Family)</td>
</tr>
<tr>
<td align="center">2</td>
<td align="center">Font Subfamily name (Style)</td>
</tr>
<tr>
<td align="center">4</td>
<td align="center">Full font name (Full)</td>
</tr>
<tr>
<td align="center">6</td>
<td align="center">PostScript name</td>
</tr>
<tr>
<td align="center">16</td>
<td align="center">Preferred Family</td>
</tr>
<tr>
<td align="center">17</td>
<td align="center">Preferred Subfamily</td>
</tr>
<tr>
<td align="center">18</td>
<td align="center">Compatible Full (OS X only)</td>
</tr>
<tr>
<td align="center">21</td>
<td align="center">WWS Family Name</td>
</tr>
<tr>
<td align="center">22</td>
<td align="center">WWS Subfamily Name</td>
</tr>
</tbody></table>
<h4>宋体 (中易宋体) - Windows Unicode BMP</h4>
<table><tbody>
<tr>
<td align="center">Name Type</td>
<td align="center">Chinese - PRC</td>
<td align="center">English - United States</td>
</tr>
<tr>
<td align="center">Family</td>
<td align="center">宋体</td>
<td align="center">SimSun</td>
</tr>
<tr>
<td align="center">Style</td>
<td align="center">Regular</td>
<td align="center">Regular</td>
</tr>
<tr>
<td align="center">Full</td>
<td align="center">宋体</td>
<td align="center">SimSun</td>
</tr>
<tr>
<td align="center">PostScript name</td>
<td align="center">宋体</td>
<td align="center">SimSun</td>
</tr>
</tbody></table>
<h4>Adobe 黑体 - Windows Unicode BMP</h4>
<table><tbody>
<tr>
<td align="center">Name Type</td>
<td align="center">Chinese - PRC</td>
<td align="center">English - United States</td>
</tr>
<tr>
<td align="center">Family</td>
<td align="center">Adobe 黑体 Std R</td>
<td align="center">Adobe Heiti Std R</td>
</tr>
<tr>
<td align="center">Style</td>
<td align="center">Regular</td>
<td align="center">Regular</td>
</tr>
<tr>
<td align="center">Full</td>
<td align="center">-</td>
<td align="center">AdobeHeitiStd-Regular</td>
</tr>
<tr>
<td align="center">Preferred Family</td>
<td align="center">Adobe 黑体 Std</td>
<td align="center">Adobe Heiti Std</td>
</tr>
<tr>
<td align="center">Preferred Subfamily</td>
<td align="center">R</td>
<td align="center">R</td>
</tr>
<tr>
<td align="center">PostScript name</td>
<td align="center">AdobeHeitiStd-Regular</td>
<td align="center">AdobeHeitiStd-Regular</td>
</tr>
</tbody></table>
<p>Windows 的字体预览会采用你目前的系统语言对应的 <strong>Preferred Family</strong> 作为命名，如果此项缺失则会用系统语言 Family、英语 Preferred Family、英语 Family。</p>
<p>对浏览器来说不同浏览器的处理策略是不一样的，比如 IE9 和 FF4 支持按照 Preferred Family 选字而 Chrome 只按照 Family（Opentype 规范里的 [name] 表项目）搜索。</p>
<h4>Fallback</h4>
<p>fallback是字体匹配算法的重要机制，我们看一下下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: 'Helvetica Neue', 'Helvetica', 'Microsoft Yahei', sans-serif;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Helvetica Neue'</span>, <span class="hljs-string">'Helvetica'</span>, <span class="hljs-string">'Microsoft Yahei'</span>, sans-serif;
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPobx?w=1518&amp;h=876" src="https://static.alili.tech/img/bVPobx?w=1518&amp;h=876" alt="Fallback" title="Fallback" style="cursor: pointer;"></span></p>
<p>这个 fallback 的规则可以总结为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(hasFont &amp;&amp; isInUnicodeTable) ? 'Current Font' : 'Next Font'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code><span class="hljs-comment">(hasFont &amp;&amp; isInUnicodeTable)</span> ? <span class="hljs-string">'Current Font'</span> : <span class="hljs-string">'Next Font'</span>
</code></pre>
<p>就这样一直找匹配的字体，直到系统默认，所以一般都把系统默认的5类字体放到 font-family 定义的最后来写。</p>
<p>CSS规范里只简单的说执行“system font fallback”。但这个过程在不同的系统不同的浏览器下可能很不一样，比如：</p>
<ul>
<li>
<p>OS相关机制</p>
<ul>
<li><p>Linux下一般通过<a href="http://fontconfig.org/" rel="nofollow noreferrer" target="_blank">fontconfig</a>去根据语言、风格等参数来选择fallback，但不同浏览器的实现还可能有区别。</p></li>
<li><p>Windows下则一般会使用系统的Font Linking机制，根据注册表内的<a href="https://technet.microsoft.com/en-us/library/cc939627.aspx" rel="nofollow noreferrer" target="_blank">FontSubstitutes</a>信息来寻找。</p></li>
<li><p>OS X是按照字体后备列表进行fallback。<br><span class="img-wrap"><img data-src="/img/bVPGxi?w=600&amp;h=520" src="https://static.alili.tech/img/bVPGxi?w=600&amp;h=520" alt="os x fallback" title="os x fallback" style="cursor: pointer;"></span></p></li>
</ul>
</li>
<li>
<p>浏览器配置</p>
<ul>
<li><p>WebKit settings 中可设定各个 generic family 的默认值。</p></li>
<li><p>Firefox访问 about:config 后筛选出的 font 相关项中包含不同语言下 generic families 的默认值。</p></li>
<li><p>Webkit会使用<code>font-family</code>列表的第一个字体和这段文字所属的语言来寻找fallback字体，像<code>Times</code>这样的serif字体对应的中文fallback字体，在Mac OS X下是华文宋体（STSong）。</p></li>
<li><p>Firefox则会根据<code>sans-serif</code>这样的通用<code>font-family</code>和对应的语言匹配到设置中针对对应语言的默认字体，比如在MAC OS X 默认的中文非衬线字体是华文黑体（STHeiti）（新版本 OS X是苹方-简）。</p></li>
</ul>
</li>
<li>
<p>charset、lang 属性、font-family值</p>
<ul><li><p><a href="http://oryct7evy.bkt.clouddn.com/index.html" rel="nofollow noreferrer" target="_blank">这是大而全的Demo</a></p></li></ul>
</li>
</ul>
<p>因为在这里不同的浏览器可能有不同的行为，所以建议在<strong>CSS中应写明对应平台所使用的字体。</strong></p>
<p>具体的字体选择还有一些不太容易注意的细节，也是各个浏览器差异比较大的一点，可能会出现这样一些问题：</p>
<ul>
<li><p>是否支持用字体的PostScript name选择：如<code>STHeiti</code>的Light版本又称作<code>STXihei</code>，或者是否能用full name 选择：有的浏览器不能正确地将CSS里对字体的<code>font-weight</code>或者<code>font-style</code>等要求映射到特定的字体上，尤其是在字体使用了非标准的style明明的情况下。</p></li>
<li><p>是否支持按 Localized name选择：比如能不能用“宋体”来代表“Simsun”。以Mac OS X下的浏览器为例，Firefox支持这样的写法，但基于Webkit的浏览器一般不支持，这样的问题CSS规范没有限定，所以无论哪种情况都是允许的。</p></li>
</ul>
<p>总的说来，如果要保证最大限度的兼容性，在 CSS 书写的时候应该<strong>尽可能选择明确、不容易出错的写法，尽量少隐式地让浏览器自己确定 (be explict instead of implict)</strong>，虽然隐式写法通常比较简洁，但除非你 100% 确定想支持的浏览器在你想支持的平台下都能支持这个写法，否则还是不应该轻易用。</p>
<p>其它注意事项请参看：<a href="http://justineo.github.io/slideshows/font/#/4" rel="nofollow noreferrer" target="_blank">font-family 没有设定中文字体时，汉字应该怎么显示？</a></p>
<h2 id="articleHeader27">渲染</h2>
<p>当字体确定以后，就可以将文本，字体等等参数一起交给具体的排版引擎,生成字形和位置，然后根据不同的平台调用不同的字体<code>rasertizer</code>将自行转换成最后显示在屏幕上的图案，一般浏览器都会选择平台原生的<code>resterizer</code>。</p>
<h3 id="articleHeader28">排版引擎</h3>
<p>不同浏览器有着不同的渲染引擎。Mac OS X 用户使用 <a href="http://ivanyuan.farbox.com/post/coretextyu-textkitru-men" rel="nofollow noreferrer" target="_blank">CoreText</a> 渲染引擎，Windows7  和 Windows Vista 用户使用 <a href="https://msdn.microsoft.com/zh-cn/library/windows/desktop/dd371554(v=vs.85" rel="nofollow noreferrer" target="_blank">DirectWrite</a>.aspx) 或  <a href="https://zh.wikipedia.org/wiki/GDI%2B" rel="nofollow noreferrer" target="_blank">GDI</a> ,而 Windows XP 则使用 GDI。</p>
<p>GDI 分为 GDI Grayscale 和 GDI ClearType 。前者为<strong>灰阶渲染</strong> API，后者是<strong>亚像素渲染</strong> API。由于 GDI ClearType 并未对字体进行垂直方向的平滑，因此当字体较大时会出现边缘不平滑的情况。为了弥补 GDI ClearType 的不足，MS实现了 DirectWrite API，它在 GDI ClearType 的基础上增加了垂直方向的平滑。</p>
<p>对比图片来看看它们之间的区别，其中上图为FacitWeb字体，下图为 Minion Pro字体。</p>
<h4>Core Text 渲染引擎</h4>
<p><span class="img-wrap"><img data-src="/img/bVPz2L?w=560&amp;h=273" src="https://static.alili.tech/img/bVPz2L?w=560&amp;h=273" alt="Core Text 渲染引擎" title="Core Text 渲染引擎" style="cursor: pointer;"></span></p>
<h4>DirectWrite渲染引擎</h4>
<p><span class="img-wrap"><img data-src="/img/bVPz2U?w=560&amp;h=273" src="https://static.alili.tech/img/bVPz2U?w=560&amp;h=273" alt="DirectWrite渲染引擎" title="DirectWrite渲染引擎" style="cursor: pointer;"></span></p>
<h4>GDI渲染引擎，开启ClearType</h4>
<p><span class="img-wrap"><img data-src="/img/bVPz23?w=560&amp;h=273" src="https://static.alili.tech/img/bVPz23?w=560&amp;h=273" alt="GDI渲染引擎，开启ClearType" title="GDI渲染引擎，开启ClearType" style="cursor: pointer;"></span></p>
<h4>GDI渲染引擎，标准抗锯齿（Standard antialiasing）</h4>
<p><span class="img-wrap"><img data-src="/img/bVPz3a?w=560&amp;h=273" src="https://static.alili.tech/img/bVPz3a?w=560&amp;h=273" alt="GDI渲染引擎，标准抗锯齿（Standard antialiasing）" title="GDI渲染引擎，标准抗锯齿（Standard antialiasing）" style="cursor: pointer;"></span></p>
<h4>GDI渲染引擎，无抗锯齿（no antialiasing）</h4>
<p><span class="img-wrap"><img data-src="/img/bVPz3q?w=560&amp;h=273" src="https://static.alili.tech/img/bVPz3q?w=560&amp;h=273" alt="GDI渲染引擎，无抗锯齿（no antialiasing）" title="GDI渲染引擎，无抗锯齿（no antialiasing）" style="cursor: pointer;"></span></p>
<p>使用同一颜色，感官上的颜色深浅为：黑白渲染&gt; grayscale &gt; sub-pixel。</p>
<p>iOS 和 Mac 的渲染引擎一样，但采用的是灰度渲染，默认情况下亚像素抗锯齿是关闭的，但可以通知设置开启。</p>
<p><span class="img-wrap"><img data-src="/img/bVPptk?w=587&amp;h=208" src="https://static.alili.tech/img/bVPptk?w=587&amp;h=208" alt="" title="" style="cursor: pointer;"></span></p>
<p>由于渲染策略的不同，字母a在不同的浏览器和 OS 下的渲染表现也不同。第一个是理想模型的a,第二个是灰阶渲染的a,第三个是亚像素渲染，第四个是黑白渲染。</p>
<h3 id="articleHeader29">浏览器</h3>
<h4>常用字体在浏览器中的渲染情况</h4>
<p><span class="img-wrap"><img data-src="/img/bVPpvO?w=690&amp;h=315" src="https://static.alili.tech/img/bVPpvO?w=690&amp;h=315" alt="浏览器支持表" title="浏览器支持表" style="cursor: pointer;"></span></p>
<p>注：从 chrome52 开始，google 停止对于老的操作系统的支持，包括 windows xp 和 windows vist a停止了 GDI 的字体渲染，从而只支持 DirectWrite。</p>
<h3 id="articleHeader30">光栅化</h3>
<p>当确定了编码、字体类型、排版引擎、浏览器后，就要进行光栅化了，光栅化是将文字从一个向量表示（比如一个TrueType）转化到光栅或者位图表示的过程。在这个过程中往往涉及到一些抗锯齿技术使得屏幕上的字体更加顺滑易读，这也经常会涉及到“字体微调（font hinting）”技术。</p>
<h1 id="articleHeader31">建议</h1>
<p>根据以上总结我们可以看出，不同系统预装的字体不同，不同浏览器的默认字体也不同，而且还有渲染引擎的差异。所以，要想达到比较好的显示效果，需要设置好<code>font-family</code>。</p>
<ol>
<li><p>首先确定要选择字体的元素应该使用的字体风格，比如是衬线字体、非衬线字体还是 <code>cursive</code>、<code>fantasy</code> 之类的。</p></li>
<li>
<p>优先声明英文字体，比如 Mac OS X 下有 <code>Helvetica</code> 也有 <code>Arial</code>，但 <code>Helvetica </code>(可能) 效果更好，Windows 下则一般只有 <code>Arial</code>，那么写<code> Helvetica</code>, <code>Arial</code> 就比 <code>Arial</code>,<code> Helvetica </code>或者只有<code> Arial </code>更好。</p>
<ul><li><p>绝大部分中文字体都包含英文字母和数字，但是大多数中文字体中的英文和数字部分都不是特别漂亮，所以建议对英文字体先进行声明。</p></li></ul>
</li>
<li><p>然后列出中文字体，Windows下，<code>Microsoft Yahei</code>是最常用的字体，Mac如果安装了Office，系统也会安装<code>Microsoft Yahei</code>字体，可Mac下<code>Microsoft Yahei</code>显示效果不是太好，所以一般把Mac的字体放在前面,<code>Microsoft Yahei</code>放在后面，最后还可以跟上Linux下的<code>WenQuanYi Micro Hei</code>。</p></li>
<li><p>最后还应该放上对应的<code>generic family</code>，比如<code>sans-serif</code>或者<code>serif</code>。</p></li>
<li><p>尽量用字体的基本名称 (比如 English locale 下显示的)，而不要用本地化过的名称。除非特殊情况 (Windows 下“某些”浏览器在特定编码下只能支持本地化的字体名称)。Mac OS X 下字体名称可以用 <code>Font Book</code> 查到 (菜单 Preview -&gt; Show Font Info)，Windows 下字体信息在微软的<a href="https://www.microsoft.com/typography/fonts/product.aspx" rel="nofollow noreferrer" target="_blank">网站</a>可以得到，Linux/X11 下可以使用 <code>fc-list</code> 命令查到。</p></li>
<li><p>字体名称中包含空格时记得用引号扩起来，比如<code>"WenQuanYi Micro Hei"</code>。</p></li>
<li><p>文档开头最好指明语言，比如&lt;html lang="en-us"&gt;。但是对于简体中文来说，我们不应该使用<code>lang=zh-cn</code>，但是为了浏览器的兼容性，还继续使用。详细参见<a href="https://www.zhihu.com/question/20797118" rel="nofollow noreferrer" target="_blank">网页头部的声明应该是用 lang="zh" 还是 lang="zh-cn"？</a>。</p></li>
</ol>
<p>基于以上考虑，我们先来看看最安全的的<code>font-family</code>是什么样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html lang=zh-CN//为了兼容性，暂时先这么写
charset=utf-8
font-family：arial，sans-serif；
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">html</span> lang=zh-CN<span class="hljs-comment">//为了兼容性，暂时先这么写</span>
charset=utf-<span class="hljs-number">8</span>
<span class="hljs-attribute">font-family</span>：arial，sans-serif；
</code></pre>
<p>扩充一下,加上常用的字体fallback：</p>
<h3 id="articleHeader32">PC端</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font-family: -apple-system,BlinkMacSystemFont,&quot;San Francisco&quot;,&quot;Helvetica Neue&quot;,Helvetica,Arial,&quot;PingFang SC&quot;,&quot;Hiragino Sans GB&quot;,&quot;Microsoft YaHei&quot;,&quot;WenQuanYi Microhei&quot;,sans-serif;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs hsp"><code><span class="hljs-keyword">font</span>-family: -apple-<span class="hljs-keyword">system</span>,BlinkMacSystemFont,<span class="hljs-string">"San Francisco"</span>,<span class="hljs-string">"Helvetica Neue"</span>,Helvetica,Arial,<span class="hljs-string">"PingFang SC"</span>,<span class="hljs-string">"Hiragino Sans GB"</span>,<span class="hljs-string">"Microsoft YaHei"</span>,<span class="hljs-string">"WenQuanYi Microhei"</span>,sans-serif<span class="hljs-comment">;</span>
</code></pre>
<h3 id="articleHeader33">移动端</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
   font-family:  &quot;\5FAE\8F6F\96C5\9ED1&quot;, Helvetica;//手机腾讯
   font-family:'STHeiti','Microsoft YaHei',Helvetica,Arial,sans-serif;//手机网易
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>
   <span class="hljs-attribute">font-family</span>:  <span class="hljs-string">"\5FAE\8F6F\96C5\9ED1"</span>, Helvetica;<span class="hljs-comment">//手机腾讯</span>
   <span class="hljs-attribute">font-family</span>:<span class="hljs-string">'STHeiti'</span>,<span class="hljs-string">'Microsoft YaHei'</span>,Helvetica,Arial,sans-serif;<span class="hljs-comment">//手机网易</span>
</code></pre>
<p><code>-apple-system</code>用于调用系统默认UI字体，并且会根据<code>font-weight</code>声明选择恰当的变体。<code>system</code>将来<a href="https://lists.w3.org/Archives/Public/www-style/2015Jul/0169.html" rel="nofollow noreferrer" target="_blank">有可能成为标准</a>，<code>-apple</code>为过渡阶段的厂商前缀。</p>
<p><code>BlinkMacSystemFont</code>：为 macOS Chrome 应用系统 UI 字体，与上面等同。</p>
<p>一般移动端不需要设置中文字体，<code>\5FAE\8F6F\96C5\9ED1</code>是微软雅黑的Unicode码，中文测试用。</p>
<h2 id="articleHeader34">相关参考</h2>
<p><a href="http://cdc.tencent.com/2015/07/20/%E7%BB%99%E8%87%AA%E5%B7%B1%E7%9A%84%E5%AD%97%E4%BD%93%E8%AF%BE%EF%BC%88%E4%B8%80%EF%BC%89-%E8%8B%B1%E6%96%87%E5%AD%97%E4%BD%93%E5%9F%BA%E7%A1%80/" rel="nofollow noreferrer" target="_blank">给自己的字体课(一)</a></p>
<p><a href="http://ued.qq.com/2016/06/17/mxzt/" rel="nofollow noreferrer" target="_blank">百用不厌明星字体</a></p>
<p><a href="http://fuxiaopang.cn/the-complete-beginners-guide-to-chinese-fonts/" rel="nofollow noreferrer" target="_blank">中文字体新手指南</a></p>
<p><a href="https://www.zhihu.com/question/20599759" rel="nofollow noreferrer" target="_blank">中文字体分类除了黑体和宋体之外还有哪些？</a></p>
<p><a href="http://www.chinaw3c.org/issue-chinese-fonts.html" rel="nofollow noreferrer" target="_blank">讨论：中文字体及呈现需求</a></p>
<p><a href="https://www.typeisbeautiful.com/2015/04/9171/" rel="nofollow noreferrer" target="_blank">从《中文排版需求》开始</a></p>
<p><a href="http://www.zhangxinxu.com/wordpress/2017/03/css-font-family-chinese-english/" rel="nofollow noreferrer" target="_blank">CSS font-family常见中文字体对应的英文名称</a></p>
<p><a href="https://www.zhihu.com/question/20405658" rel="nofollow noreferrer" target="_blank">各个平台下相对比较好的 Web 英文字体分别是什么？</a></p>
<p><a href="http://ued.ctrip.com/blog/web-page-font-settings-did-you-know.html" rel="nofollow noreferrer" target="_blank">网页字体设置你了解吗？</a></p>
<p><a href="http://alloyteam.github.io/Spirit/modules/Standard/" rel="nofollow noreferrer" target="_blank">移动开发规范概述</a></p>
<p><a href="http://eavae.github.io/language/css/2015/02/02/font-in-web-design.html" rel="nofollow noreferrer" target="_blank">网页中字体的那些事</a></p>
<p><a href="https://blog.coding.net/blog/Web-Fonts" rel="nofollow noreferrer" target="_blank">Web 字体的选择和运用</a></p>
<p><a href="https://www.biaodianfu.com/python-charset.html" rel="nofollow noreferrer" target="_blank">Python字符编码的学习</a></p>
<p><a href="http://blog.jjgod.org/2011/04/09/how-do-browsers-render-text/" rel="nofollow noreferrer" target="_blank">浏览器如何渲染文本</a></p>
<p><a href="https://isux.tencent.com/website-font-rendering-process.html#comment-form" rel="nofollow noreferrer" target="_blank">网站字体渲染过程</a></p>
<p><a href="http://jdc.jd.com/archives/3130" rel="nofollow noreferrer" target="_blank">有关字体的小小迷思</a></p>
<p><a href="https://blog.typekit.com/2010/10/15/type-rendering-operating-systems/" rel="nofollow noreferrer" target="_blank">Type rendering: operating systems</a></p>
<p><a href="https://www.zhihu.com/question/19911793" rel="nofollow noreferrer" target="_blank">如何保证网页的字体在各平台都尽量显示为最高质量的黑体？</a></p>
<p><a href="https://csspod.com/using-the-system-font-in-web-content/" rel="nofollow noreferrer" target="_blank">在 Web 内容中使用系统字体</a></p>
<p><a href="https://www.smashingmagazine.com/2015/11/using-system-ui-fonts-practical-guide/" rel="nofollow noreferrer" target="_blank">Using UI System Fonts In Web Design: A Quick Practical Guide</a></p>
<p><a href="https://webkit.org/blog/3709/using-the-system-font-in-web-content/" rel="nofollow noreferrer" target="_blank">Using the System Font in Web Content</a></p>
<p><a href="https://www.zhihu.com/question/20161818" rel="nofollow noreferrer" target="_blank">对于 CSS 的「font-family」，浏览器是通过字体的哪个名称进行匹配的？</a></p>
<p><a href="https://lifesinger.wordpress.com/2011/04/06/best-web-default-fonts/" rel="nofollow noreferrer" target="_blank">最佳 Web 中文默认字体</a></p>
<p><a href="https://www.zhihu.com/question/20127442/answer/14064802" rel="nofollow noreferrer" target="_blank">是否有一种软件能够对不同语言的文字指定不同的字体？</a></p>
<p><a href="http://www.cssfontstack.com/" rel="nofollow noreferrer" target="_blank">CSS Font Stack</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
给自己的Fonts教程

## 原文链接
[https://segmentfault.com/a/1190000009920615](https://segmentfault.com/a/1190000009920615)

