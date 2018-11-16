---
title: ES6走走看看—字符到底发生了什么变化
hidden: true
categories: [reprint]
slug: caa15126
date: 2018-10-22 00:00:00
---

{{< raw >}}

                    
<p>持续更新的github笔记，链接地址：<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a>  </p>
<p>此篇文章的笔记地址：<a href="https://qiqihaobenben.gitbooks.io/front-end-basics/content/JavaScript/ES6/string.html" rel="nofollow noreferrer" target="_blank">字符到底发生了什么变化</a>  </p>
<p><strong>ES6走走看看系列，特别鸣谢奇舞读书会~</strong></p>
<hr>
<blockquote>看正文之前，先思考一下，为什么你看的ES6各种权威指南里提到的<code>𠮷</code>会有那么多问题，它length是2，charAt出来是乱码……</blockquote>
<h2 id="articleHeader0">1、 JavaScript字符编码的“坑”和“填坑”</h2>
<p>计算机内部处理的信息，都是一个些二进制值，每一个二进制位（bit）有0和1两种状态。<br>一个字节（byte）有八个二进制位，也就是说，一个字节一共可以用来表示256种不同的状态，每一个状态对应一个符号，就是256个符号，从<code>00000000</code>到<code>11111111</code>。转换成十六进制，一个字节就是<code>0x00</code>到<code>OxFF</code>。</p>
<h3 id="articleHeader1">1.1 先来聊聊字符编码的历程</h3>
<p>先祭出一张图，建议放大看</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgyR7?w=2903&amp;h=1212" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><b>（1） ASCII 码 </b></p>
<p>上个世纪60年代，美国制定了一套字符编码，对英语字符与二进制位之间的关系，做了统一规定。这被称为 ASCII 码(美国信息交换标准代码)，一直沿用至今。</p>
<p>ASCII 码一共规定了128个字符的编码,只占用了一个字节的后面7位，最前面的一位统一规定为0。</p>
<p>第一部分：0～31（0x00~0x1F）及127(共33个)是控制字符或通信专用字符,有些可以显示在屏幕上,有些则不能显示,但能看到其效果(如换行、退格)如下表:</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgySh?w=476&amp;h=400" src="https://static.alili.tech/img/bVbgySh?w=476&amp;h=400" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第二部分：是由20~7E共95个,这95个字符是用来表示阿拉伯数字、英文字母大小写和下划线、括号等符号,都可以显示在屏幕上如下表:</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgySl?w=553&amp;h=605" src="https://static.alili.tech/img/bVbgySl?w=553&amp;h=605" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><b> (2) 非ASCII 编码 </b></p>
<p>英语用128个符号编码就够了，但是世界上可不只有英语这一种语言，先不说汉语，就是那些不说英语的欧洲国家，128个符号是不够的。</p>
<p>一些欧洲国家就决定，利用字节中闲置的最高位编入新的符号，这些欧洲国家使用的编码体系，可以表示最多256个符号。大家你加你的，我加我的。因此，哪怕它们都使用256个符号的编码方式，代表的字母却不一样。</p>
<p>1981年IBM PC ROM256个字符的字符集，即IBM扩展字符集，这128个扩充字符是由IBM制定的,并非标准的ASCII码.这些字符是用来表示框线、音标和其它欧洲非英语系的字母。如下图：</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgySA?w=586&amp;h=684" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>在Windows 1.0（1985年11月发行）中，Microsoft没有完全放弃IBM扩展字符集，但它已退居第二重要位置。因为遵循了ANSI草案和ISO标准，纯Windows字符集被称作「ANSI字符集」。</p>
<p><span class="img-wrap"><img src="https://static.alili.tech/img/bVbgySD?w=622&amp;h=519" del-src="https://static.alili.tech/v-5bbf1b3b/global/img/squares.svg" alt="ANSI字符集的最初版本" title="ANSI字符集的最初版本" style="cursor: pointer;"></span></p>
<p>由此可见扩展ASCII不再是国际标准。</p>
<p>而对于亚洲国家的文字，使用的符号就更多了，汉字就多达10万左右（《中华辞海》共收汉字87019个，日本《今昔文字镜》收录汉字超15万）。一个字节只能表示256种符号，肯定是不够的，就必须使用多个字节表达一个符号。比如，简体中文常见的编码方式是 GB2312(中华人民共和国国家标准简体中文字符集)，使用两个字节表示一个汉字，所以理论上最多可以表示 256 x 256 = 65536 个符号。其实GB 2312标准共收录6763个汉字，它所收录的汉字已经覆盖中国大陆99.75%的使用频率。</p>
<p><b> (3) Unicode </b></p>
<p>之前的编码，大家在自己的国家使用都挺好的。世界上存在着多种编码方式，同一个二进制数字可以被解释成不同的符号，所以一旦不同国家进行数据传输，结果就只有乱码了。</p>
<p>如果有一种编码，将世界上所有的符号都纳入其中。每一个符号都给予一个独一无二的编码，那么乱码问题就会消失。这就是 Unicode，就像它的名字所表示的，这是一种所有符号的编码。</p>
<p>Unicode，定义很简单，用一个码点(code point)映射一个字符。码点值的范围是从U+0000到U+10FFFF，可以表示超过110万个符号。</p>
<p>Unicode 最新版本的是 11.0，总共137,374个字符，这么看来，还是挺够用的。</p>
<p>Unicode最前面的65536个字符位，称为基本平面（BMP-—Basic Multilingual Plane），它的码点范围是从U+0000到U+FFFF。最常见的字符都放在这个平面，这是Unicode最先定义和公布的一个平面。<br>剩下的字符都放在补充平面（Supplementary Plane），码点范围从U+010000一直到U+10FFFF，共16个。</p>
<p><strong>需要注意的是，Unicode 只是一个符号集，它只规定了符号的二进制代码，却没有规定这个二进制代码应该如何存储。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例如下面的字符对应的码点
A的码点 U+0041
a的码点 U+0061
©的码点 U+00A9
☃的码点 U+2603
💩的码点 U+1F4A9" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 例如下面的字符对应的码点</span>
A的码点 U+<span class="hljs-number">0041</span>
a的码点 U+<span class="hljs-number">0061</span>
©的码点 U+<span class="hljs-number">00</span>A9
☃的码点 U+<span class="hljs-number">2603</span>
💩的码点 U+<span class="hljs-number">1</span>F4A9</code></pre>
<p>正是因为上面说的，没有规定怎么存储，所以出现了Unicode 的多种存储方式，不同的实现导致了Unicode 在很长一段时间内无法推广，而且本来英文字母只用一个字节存储就够了，如果 Unicode 统一规定，每个符号用三个或四个字节表示，那么每个英文字母前都必然有二到三个字节是0，这对于存储来说是极大的浪费，文本文件的大小会因此大出二三倍，这是无法接受的。</p>
<p>在这个时候往往需要一个强大的外力推动，大家诉诸于利益，共同实现一个目标。所以，真正意义上的互联网普及了，地球变成了村子，交流越来越多，乱码是怎么能行。</p>
<p><b> (4) UTF-8、UTF-16、UTF-32 </b></p>
<p>UTF（Unicode transformation format）Unicode转换格式，是服务于Unicode的，用于将一个Unicode码点转换为特定的字节序列。<br>上面三种都是 Unicode 的实现方式之一。 UTF-16（字符用两个字节或四个字节表示）和 UTF-32（字符用四个字节表示），不过UTF-8 是在互联网上使用最广的一种 Unicode 的实现方式。</p>
<p><code>UTF-8</code></p>
<p>1992年开始设计，1993年首次被正式介绍，1996年UTF-8标准还没有正式落实前，微软的CAB（MS Cabinet）规格就明确容许在任何地方使用UTF-8编码系统。但有关的编码器实际上从来没有实现这方面的规格。2003年11月UTF-8被RFC 3629重新规范，只能使用原来Unicode定义的区域，U+0000到U+10FFFF，也就是说最多四个字节（之前可以使用一至六个字节为每个字符编码）</p>
<p>UTF-8 是一种变长的编码方式。它可以使用1~4个字节表示一个符号，根据不同的符号而变化字节长度。越是常用的字符，字节越短，最前面的128个字符，只使用1个字节表示，与ASCII码完全相同（也就是所说的兼容ASCII码）。在英文下这样就比UTF-16 和 UTF-32节省空间。</p>
<p>UTF-8 的编码规则很简单，只有二条：</p>
<p>1）对于单字节的符号，字节的第一位设为0，后面7位为这个符号的 Unicode 码。因此对于英语字母，UTF-8 编码和 ASCII 码是相同的。</p>
<p>2）对于n字节的符号（n &gt; 1），第一个字节的前n位都设为1，第n + 1位设为0，后面字节的前两位一律设为10。剩下的没有提及的二进制位，全部为这个符号的 Unicode 码。</p>
<p><code>UTF-16</code></p>
<p>基本平面的字符占用2个字节，辅助平面的字符占用4个字节。也就是说，UTF-16的编码长度要么是2个字节（U+0000到U+FFFF），要么是4个字节（U+010000到U+10FFFF）。</p>
<p>这里涉及到一个怎么判断两个字节是一个字符，还是两个字节加两个字节组成的四个字节是一个字符？</p>
<p>解决方法是：在基本平面内，从U+D800到U+DFFF是一个空段，即这些码点不对应任何字符。因此，这个空段可以用来映射辅助平面的字符。</p>
<p>具体来说，辅助平面的字符位共有2<sup>20</sup>个，也就是说，对应这些字符至少需要20个二进制位。UTF-16将这20位拆成两半，前10位映射在U+D800到U+DBFF（空间大小2<sup>10</sup>），称为高位（H），后10位映射在U+DC00到U+DFFF（空间大小2<sup>10</sup>），称为低位（L）。这意味着，一个辅助平面的字符，被拆成两个基本平面的字符表示(代理对的概念)。</p>
<p>所以，当我们遇到两个字节，发现它的码点在U+D800到U+DBFF之间，就可以断定，紧跟在后面的两个字节的码点，应该在U+DC00到U+DFFF之间，这四个字节必须放在一起解读。</p>
<p>UTF-16编码介于UTF-32与UTF-8之间，同时结合了定长和变长两种编码方法的特点。</p>
<p><code>UTF-32</code></p>
<p>UTF-32 最直观的编码方法，每个码点使用四个字节表示，字节内容一一对应码点。</p>
<p>UTF-32的优点在于，转换规则简单直观，查找效率高。缺点在于浪费空间，同样内容的英语文本，它会比ASCII编码大三倍。这个缺点很致命，导致实际上没有人使用这种编码方法，HTML 5标准就明文规定，网页不得编码成UTF-32。</p>
<p><b> (5) UCS UCS-2 </b></p>
<p>国际标准化组织（ISO）的ISO/IEC<br>JTC1/SC2/WG2工作组是1984年成立的，想要做统一字符集，并与1989年开始着手构建UCS（通用字符集），也叫ISO 10646标准，当然另一个想做统一字符集的是1988年成立的Unicode团队，等到他们发现了对方的存在，很快就达成一致：世界上不需要两套统一字符集（幸亏知道的早啊）。</p>
<p>1991年10月，两个团队决定合并字符集。也就是说，从今以后只发布一套字符集，就是Unicode标准，并且修订此前发布的字符集，UCS的码点将与Unicode完全一致。（两个标准同时是存在）</p>
<p>UCS的开发进度快于Unicode，1990年就公布了第一套编码方法UCS-2，使用2个字节表示已经有码点的字符。（那个时候只有一个平面，就是基本平面，所以2个字节就够用了。）UTF-16编码迟至1996年7月才公布，明确宣布是UCS-2的超集，即基本平面字符沿用UCS-2编码，辅助平面字符定义了4个字节的表示方法。</p>
<p>两者的关系简单说，就是UTF-16取代了UCS-2，或者说UCS-2整合进了UTF-16。所以，现在只有UTF-16，没有UCS-2。</p>
<p>UCS-2 使用2个字节表示已经有码点的字符,第一个字节在前，就是"大尾方式"（Big endian），第二个字节在前就是"小尾方式"（Little endian）。</p>
<p>那么很自然的，就会出现一个问题：计算机怎么知道某一个文件到底采用哪一种方式编码？</p>
<p>Unicode 规范定义，每一个文件的最前面分别加入一个表示编码顺序的字符，这个字符的名字叫做"零宽度非换行空格"（zero width no-break space），用FEFF表示。这正好是两个字节，而且FF比FE大1。</p>
<p>如果一个文本文件的头两个字节是FE FF，就表示该文件采用大尾方式；如果头两个字节是FF FE，就表示该文件采用小尾方式。</p>
<h3 id="articleHeader2">1.2 JavaScript 编码方法存在的问题</h3>
<p>最上面给出的图中字符的发展历史和JavaScript的诞生时间对比下，可以知道JavaScript如果要想用Unicode字符集，<strong>比较恰的选择是UCS-2编码方法</strong>，UTF-8,UTF-16都来的晚了一些，UCS-4倒是有的，但是英文字符本来一个字节就可以的，现在也要用4个字节，还是挺严重的事情的。96年那个时候，电脑普遍配置内存 8MB-16MB，硬盘850MB—1.2GB。</p>
<p><b>ECMAScript 6 之前，JavaScript字符编码方式使用UCS-2，是导致之后JavaScript对位于辅助平面的字符（超过两个字节的字符）操作出现异常情况的根本原因。</b></p>
<p><b>ECMAScript 6 强制使用UTF-16字符串编码来解决字符超过两个字节时出现异常的问题，并按照这种字符编码来标准化字符串操作。</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 存在的问题
const text = '😂';

console.log(text.length)  //打印 2 ，其实是一个Emoji表情符
console.log(/^.$/.test(text)) // false , 正则匹配也出了问题，说不是一个字符
console.log(/^..$/.test(text)) // true , 是两个字符
console.log(text.charAt(0)) // � 前后两个字节码位都是落在U+D800到U+DFFF这个空段，打印不出东西
console.log(text.charAt(1)) // �
console.log(text.charCodeAt(0)) // 55357 转成十六进制 0xd83d
console.log(text.charCodeAt(1) //56834 转成十六进制 0xde02

// 经过查询Unicode的字符表，😂的码位是U+1f602
console.log('\u1f602' === '😂') //false
console.log('\ud83d\ude02' === '😂') // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// 存在的问题</span>
const <span class="hljs-keyword">text</span> = <span class="hljs-string">'😂'</span>;

console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>.length)  <span class="hljs-comment">//打印 2 ，其实是一个Emoji表情符</span>
console.<span class="hljs-keyword">log</span>(/^.$/.test(<span class="hljs-keyword">text</span>)) <span class="hljs-comment">// false , 正则匹配也出了问题，说不是一个字符</span>
console.<span class="hljs-keyword">log</span>(/^..$/.test(<span class="hljs-keyword">text</span>)) <span class="hljs-comment">// true , 是两个字符</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>.charAt(<span class="hljs-number">0</span>)) <span class="hljs-comment">// � 前后两个字节码位都是落在U+D800到U+DFFF这个空段，打印不出东西</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>.charAt(<span class="hljs-number">1</span>)) <span class="hljs-comment">// �</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>.charCodeAt(<span class="hljs-number">0</span>)) <span class="hljs-comment">// 55357 转成十六进制 0xd83d</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">text</span>.charCodeAt(<span class="hljs-number">1</span>) <span class="hljs-comment">//56834 转成十六进制 0xde02</span>

<span class="hljs-comment">// 经过查询Unicode的字符表，😂的码位是U+1f602</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'\u1f602'</span> === <span class="hljs-string">'😂'</span>) <span class="hljs-comment">//false</span>
console.<span class="hljs-keyword">log</span>(<span class="hljs-string">'\ud83d\ude02'</span> === <span class="hljs-string">'😂'</span>) <span class="hljs-comment">// true</span></code></pre>
<p><b>扩展：� 的Unicode码点是 U+FFFD，通常用来表示Unicode转换时无法识别的字符（也就是乱码）</b></p>
<h3 id="articleHeader3">1.3 ECMAScript 6 解决字符编码的问题</h3>
<p><b> (1) 为解决<code>charCodeAt()</code>方法获取字符码位错误的问题，新增<code>codePointAt()</code>方法</b></p>
<p><code>codePointAt()</code>方法完全支持UTF-16,参数接收的是编码单元的位置而非字符位置，返回与字符串中给定位置对应的码位，即一个整数。</p>
<p><b>对于BMP字符集中的字符，codePointAt()方法的返回值跟charCodeAt()相同，而对于非BMP字符集来说，返回值不同。</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const text = '😂';

console.log(text.charCodeAt(0)) // 位置0处的一个编码单元 55357
console.log(text.charCodeAt(1)) // 位置1处的一个编码单元 56834

console.log(text.codePointAt(0)) // 位置0处的编码单元开始的码位，此例是从这个编码单位开始的两个编码单元组合的字符（四个字节），所以会打印出所有码位，即四字节的码位 128514 即0x1f602，大于0xffff，也证明了是占四个字节的存储空间。
console.log(text.codePointAt(1)) // 位置1处的编码单元开始的码位 56834" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">text</span> = <span class="hljs-string">'😂'</span>;

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">text</span>.charCodeAt(<span class="hljs-number">0</span>)) <span class="hljs-comment">// 位置0处的一个编码单元 55357</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">text</span>.charCodeAt(<span class="hljs-number">1</span>)) <span class="hljs-comment">// 位置1处的一个编码单元 56834</span>

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">text</span>.codePointAt(<span class="hljs-number">0</span>)) <span class="hljs-comment">// 位置0处的编码单元开始的码位，此例是从这个编码单位开始的两个编码单元组合的字符（四个字节），所以会打印出所有码位，即四字节的码位 128514 即0x1f602，大于0xffff，也证明了是占四个字节的存储空间。</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">text</span>.codePointAt(<span class="hljs-number">1</span>)) <span class="hljs-comment">// 位置1处的编码单元开始的码位 56834</span></code></pre>
<p><b> (2) 为解决超过两个字节的码点与字符转换问题，新增了<code>fromCodePoint()</code>方法</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 打印😂
console.log(String.fromCharCode(128514)) // 打印失败 
console.log(String.fromCharCode(55357,56834)) // 参数可以接收一组序列数字，表示 Unicode 值。打印成功 😂

console.log(String.fromCodePoint(128514)) // 打印成功 😂
console.log(String.fromCodePoint(0x1f602)) // 可以接收不同进制的参数，打印成功 😂" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// 打印😂</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">String</span>.fromCharCode(<span class="hljs-number">128514</span>)) <span class="hljs-comment">// 打印失败 </span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">String</span>.fromCharCode(<span class="hljs-number">55357</span>,<span class="hljs-number">56834</span>)) <span class="hljs-comment">// 参数可以接收一组序列数字，表示 Unicode 值。打印成功 😂</span>

console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">String</span>.fromCodePoint(<span class="hljs-number">128514</span>)) <span class="hljs-comment">// 打印成功 😂</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">String</span>.fromCodePoint(<span class="hljs-number">0x1f602</span>)) <span class="hljs-comment">// 可以接收不同进制的参数，打印成功 😂</span></code></pre>
<p><b> (3) 为解决正则表达式无法正确匹配超过两个字节的字符问题，ES6定义了一个支持Unicode的 <code>u</code> 修饰符</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const text = '😂';

console.log(/^.$/.test(text)) // false , 正则匹配出了问题，说不是一个字符
console.log(/^..$/.test(text)) // true , 是两个字符

console.log(/^.$/u.test(text)) // true， 加入 u 修饰符，匹配正确" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>const <span class="hljs-keyword">text</span> = <span class="hljs-string">'😂'</span>;

console.<span class="hljs-keyword">log</span>(/^.$/.test(<span class="hljs-keyword">text</span>)) <span class="hljs-comment">// false , 正则匹配出了问题，说不是一个字符</span>
console.<span class="hljs-keyword">log</span>(/^..$/.test(<span class="hljs-keyword">text</span>)) <span class="hljs-comment">// true , 是两个字符</span>

console.<span class="hljs-keyword">log</span>(/^.$/u.test(<span class="hljs-keyword">text</span>)) <span class="hljs-comment">// true， 加入 u 修饰符，匹配正确</span></code></pre>
<p><b>注意：u修饰符是语法层面的变更，在不支持ES6的JavaScript的引擎中使用它会导致语法错误，可以使用RegExp构造函数和try……catch来检测，避免发生语法错误</b></p>
<p><b> (4) 为解决超过uffff码点的字符无法直接用码点表示的问题，引入了u{xxxxx}</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('\u1f602' === '😂') //false
console.log('\ud83d\ude02' === '😂') // true

console.log('\u{1f602}' === '😂') // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'\u1f602'</span> === <span class="hljs-string">'😂'</span>) //<span class="hljs-literal">false</span>
console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'\ud83d\ude02'</span> === <span class="hljs-string">'😂'</span>) // <span class="hljs-literal">true</span>

console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'\u{1f602}'</span> === <span class="hljs-string">'😂'</span>) // <span class="hljs-literal">true</span></code></pre>
<p><b> (5) 解决字符串中有四个字节的字符的length问题</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const text = '笑哭了😂';

// 解决一
// 上线UTF-16如果是在辅助平面（占4个字节）的话，会有代理对，U+D800-U+DBFF和U+DC00-U+DFFF
var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // 匹配UTF-16的代理对

function firstGetRealLength(string) {
    return string
        // 把代理对改为一个BMP的字符,然后获取长度
        .replace(surrogatePair, '_')
        .length;
}
firstGetRealLength(text); // 4

// 解决二（推荐）
// 字符串是可迭代的，可以用Array.from()来转化成数组计算length
function secondGetRealLength(string) {
    return Array.from(string).length;
}
secondGetRealLength(text); // 4

// 解决三
// 使用正则新增加的修饰符u
function thirdGetRealLength(string) {
    let result = text.match(/[\s\S]/gu);
    return result?result.length:0;
}
thirdGetRealLength(text); // 4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> text = <span class="hljs-string">'笑哭了😂'</span>;

<span class="hljs-comment">// 解决一</span>
<span class="hljs-comment">// 上线UTF-16如果是在辅助平面（占4个字节）的话，会有代理对，U+D800-U+DBFF和U+DC00-U+DFFF</span>
<span class="hljs-built_in">var</span> surrogatePair = <span class="hljs-regexp">/[\uD800-\uDBFF][\uDC00-\uDFFF]/g</span>; <span class="hljs-comment">// 匹配UTF-16的代理对</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">firstGetRealLength</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">string</span>
        <span class="hljs-comment">// 把代理对改为一个BMP的字符,然后获取长度</span>
        .replace(surrogatePair, <span class="hljs-string">'_'</span>)
        .length;
}
firstGetRealLength(text); <span class="hljs-comment">// 4</span>

<span class="hljs-comment">// 解决二（推荐）</span>
<span class="hljs-comment">// 字符串是可迭代的，可以用Array.from()来转化成数组计算length</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">secondGetRealLength</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Array</span>.from(<span class="hljs-built_in">string</span>).length;
}
secondGetRealLength(text); <span class="hljs-comment">// 4</span>

<span class="hljs-comment">// 解决三</span>
<span class="hljs-comment">// 使用正则新增加的修饰符u</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">thirdGetRealLength</span>(<span class="hljs-params">string</span>) </span>{
    <span class="hljs-keyword">let</span> result = text.match(<span class="hljs-regexp">/[\s\S]/gu</span>);
    <span class="hljs-keyword">return</span> result?<span class="hljs-attribute">result.length</span>:<span class="hljs-number">0</span>;
}
thirdGetRealLength(text); <span class="hljs-comment">// 4</span></code></pre>
<p><b> (5) 解决字符串中有四个字节的字符的字符串反转问题</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const text = '笑哭了😂';

function reverse(string) {
    return string.split('').reverse().join('');
}

function reversePlus(string) {
    return Array.from(string).reverse().join('');
}

console.log(reverse(text)) // ��了哭笑 因为😂是\ud83d\ude02反转后是\ude02\ud83d,不是一个合法的代理对（高低字节范围不同）
console.log(reversePlus(text)) // 😂了哭笑" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> <span class="hljs-built_in">text</span> = <span class="hljs-string">'笑哭了😂'</span>;

function <span class="hljs-built_in">reverse</span>(string) {
    <span class="hljs-keyword">return</span> string.<span class="hljs-built_in">split</span>(<span class="hljs-string">''</span>).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>);
}

function reversePlus(string) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">Array</span>.from(string).<span class="hljs-built_in">reverse</span>().<span class="hljs-built_in">join</span>(<span class="hljs-string">''</span>);
}

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">reverse</span>(<span class="hljs-built_in">text</span>)) <span class="hljs-comment">// ��了哭笑 因为😂是\ud83d\ude02反转后是\ude02\ud83d,不是一个合法的代理对（高低字节范围不同）</span>
console.<span class="hljs-built_in">log</span>(reversePlus(<span class="hljs-built_in">text</span>)) <span class="hljs-comment">// 😂了哭笑</span></code></pre>
<h3 id="articleHeader4">2、 ECMAScript 6 模板字面量</h3>
<p>模板字面量的填补的ES5的一些特性</p>
<ul>
<li>多行字符串</li>
<li>基本的字符串格式化,有将变量的值嵌入字符串的能力</li>
<li>HTML转义，向HTML中插入经过安全转换后的字符串的能力</li>
</ul>
<p><b>(1)多行字符串中反撇号中的所有空白符都属于字符串的一部分</b></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let message = `a
            b`;
console.log(message.length) //15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">let</span> message = `a
            b`;
console.log(message.length) <span class="hljs-comment">//15</span></code></pre>
<p><b>(2)标签模板：模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能（tagged template）。</b></p>
<p>标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = 5;
let b = 10;
function tag(s, v1, v2) {
  console.log(s[0]);
  console.log(s[1]);
  console.log(s[2]);
  console.log(v1);
  console.log(v2);

  return &quot;OK&quot;;
}

// 标签模板调用
tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

//打印
// &quot;Hello &quot;
// &quot; world &quot;
// &quot;&quot;
// 15
// 50
// &quot;OK&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> a = <span class="hljs-number">5</span>;
<span class="hljs-keyword">let</span> b = <span class="hljs-number">10</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tag</span>(<span class="hljs-params">s, v1, v2</span>) </span>{
  <span class="hljs-built_in">console</span>.log(s[<span class="hljs-number">0</span>]);
  <span class="hljs-built_in">console</span>.log(s[<span class="hljs-number">1</span>]);
  <span class="hljs-built_in">console</span>.log(s[<span class="hljs-number">2</span>]);
  <span class="hljs-built_in">console</span>.log(v1);
  <span class="hljs-built_in">console</span>.log(v2);

  <span class="hljs-keyword">return</span> <span class="hljs-string">"OK"</span>;
}

<span class="hljs-comment">// 标签模板调用</span>
tag<span class="hljs-string">`Hello <span class="hljs-subst">${ a + b }</span> world <span class="hljs-subst">${ a * b }</span>`</span>;
<span class="hljs-comment">// 等同于</span>
tag([<span class="hljs-string">'Hello '</span>, <span class="hljs-string">' world '</span>, <span class="hljs-string">''</span>], <span class="hljs-number">15</span>, <span class="hljs-number">50</span>);

<span class="hljs-comment">//打印</span>
<span class="hljs-comment">// "Hello "</span>
<span class="hljs-comment">// " world "</span>
<span class="hljs-comment">// ""</span>
<span class="hljs-comment">// 15</span>
<span class="hljs-comment">// 50</span>
<span class="hljs-comment">// "OK"</span></code></pre>
<p>“标签模板”的一个重要应用，就是过滤 HTML 字符串，防止用户输入恶意内容。标签模板的另一个应用，就是多语言转换（国际化处理）。</p>
<h3 id="articleHeader5">参考链接</h3>
<p><a href="http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html" rel="nofollow noreferrer" target="_blank">字符编码笔记：ASCII，Unicode 和 UTF-8</a></p>
<p><a href="http://www.pconline.com.cn/pcedu/empolder/gj/other/0505/616631.html" rel="nofollow noreferrer" target="_blank">谈谈Unicode编码——其中有“大尾”和“小尾”的来源描述小人国呦</a></p>
<p><a href="https://qiqihaobenben.gitbooks.io/front-end-basics/content/article/oldTechnologyArticle/zifubianma.html" rel="nofollow noreferrer" target="_blank">字符编码趣闻</a></p>
<p><a href="http://www.alloyteam.com/2016/12/javascript-has-a-unicode-sinkhole/" rel="nofollow noreferrer" target="_blank">Javascript有个Unicode的天坑</a></p>
<p><a href="http://www.ruanyifeng.com/blog/2014/12/unicode.html" rel="nofollow noreferrer" target="_blank">Unicode与JavaScript详解</a></p>
<p><a href="http://www.ietf.org/rfc/rfc3629.txt" rel="nofollow noreferrer" target="_blank">UTF-8, a transformation format of ISO 10646</a></p>
<p><a href="https://zh.wikipedia.org/wiki/ASCII" rel="nofollow noreferrer" target="_blank">ASCII</a></p>
<p><a href="https://zh.wikipedia.org/wiki/UTF-8" rel="nofollow noreferrer" target="_blank">UTF-8</a></p>
<p><a href="http://utf8everywhere.org/zh-cn" rel="nofollow noreferrer" target="_blank">UTF-8 遍地开花</a></p>
<p><a href="https://zh.wikipedia.org/wiki/UTF-16" rel="nofollow noreferrer" target="_blank">UTF-16</a></p>
<p><a href="https://zh.wikipedia.org/wiki/%E9%80%9A%E7%94%A8%E5%AD%97%E7%AC%A6%E9%9B%86" rel="nofollow noreferrer" target="_blank">通用字符集</a></p>
<p><a href="http://www.unicode.org/" rel="nofollow noreferrer" target="_blank">Unicode官网</a></p>
<p><a href="http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html" rel="nofollow noreferrer" target="_blank">Javascript诞生记</a></p>

                
{{< /raw >}}

# 版权声明
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文链接
[https://segmentfault.com/a/1190000016301346](https://segmentfault.com/a/1190000016301346)

## 原文标题
ES6走走看看—字符到底发生了什么变化
