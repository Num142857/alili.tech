---
title: '深入理解css盒子模型' 
date: 2018-12-02 2:30:15
hidden: true
slug: tg9z8rwpzs8
categories: [reprint]
---

{{< raw >}}

                    
<p>css是一门具象语言，并不像js那样具有逻辑性，因此，就算入行了前端很久的工程师，也觉得css难以掌握。下面我们就一步一步揭开css的神秘面纱，深入理解css盒模型，这对我们在布局上会有一个质的提升。</p>
<h3 id="articleHeader0">盒子模型</h3>
<p><span class="img-wrap"><img data-src="/img/bVkl03" src="https://static.alili.tech/img/bVkl03" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>相信很多人对这幅图都不陌生，盒子模型简单点理解就是外边距(margin)+边框(border)+内边距(padding)+内容(content)，页面所呈现的效果其实就是一个个盒子堆叠而成的。每一个元素其实是包含了一个“外在盒子”和一个“内在盒子”，其中“外在盒子”负责元素是一行显示还是换行显示，而“内在盒子”则负责宽高、内容展现。我们都知道inline-block（inline对应于“外在盒子”，block对应于“内在盒子”），而block可以简单地理解为block-block，table为block-table（因为还有一个inline-table）。</p>
<h3 id="articleHeader1">内联盒模型</h3>
<ul>
<li>内容区域(content area)</li>
<li>内联盒子(inline box)</li>
<li>行框盒子(line box)</li>
<li>包含盒子(containing box)</li>
</ul>
<p>内容区域(content area)。内容区域指的是一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子(character box)；但是图片这样的替换元素，其显示内容不是文字，因此内容区域可以看成是元素自身。 </p>
<p>内联盒子(inline box)。“内联盒子”不会让内容成块显示，而是排成一行，这里的内联盒子指的是元素的“外在盒子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”。如下：<br><span class="img-wrap"><img data-src="/img/bV9Ohw?w=750&amp;h=134" src="https://static.alili.tech/img/bV9Ohw?w=750&amp;h=134" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>行框盒子(line box)。每一行就是一个行框盒子，每个行框盒子都是由一个个内联盒子组成，注意：line-height是作用在行框盒子上的，并最终决定高度(替换元素除外，后面会讲解什么是替换元素)。</p>
<p>包含盒子(containing box)。此盒子由一行一行的“行框盒子”组成（css规范中，并没有“包含盒子”的说法，更准确的称呼是“包含块”(containing block)。</p>
<h3 id="articleHeader2">width</h3>
<p>width的默认值是auto，但很多人却都不理解这个值是什么意思，因为auto在不同场景会有不同的表现：</p>
<ul>
<li>fill-available</li>
<li>fit-content</li>
<li>min-content</li>
<li>max-content</li>
</ul>
<p>fill-available：充分利用可用空间，例如div、p这些元素的宽度是默认100%于父级容器的。但是width: auto却不同于width: 100%，这是很多人不理解的地方。如果你设置了width: 100%，这里指的是内容区域100%，即css3中的content-box，这时如果你设置了padding、border或者margin，元素都会撑破父元素，从而破坏布局。你当然可以设置box-sizing: border-box，但可惜的是css3中没有margin-box，这时候你如果设置了margin，依然会撑破父元素，但是width: auto却不会，如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9OhP?w=996&amp;h=294" src="https://static.alili.tech/img/bV9OhP?w=996&amp;h=294" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OhR?w=1234&amp;h=300" src="https://static.alili.tech/img/bV9OhR?w=1234&amp;h=300" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>fit-content：收缩到合适，典型代表浮动、绝对定位（有例外，设置了对立属性：left、right、top、bottom时，宽度和高度由祖先元素position非static的元素决定，但是替换元素除外：img、video、canvas等）、inline-block、table。利用这个特性我们可以实现，文字整体居中，多行则居左显示，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9OhW?w=470&amp;h=198" src="https://static.alili.tech/img/bV9OhW?w=470&amp;h=198" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oh4?w=1160&amp;h=208" src="https://static.alili.tech/img/bV9Oh4?w=1160&amp;h=208" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oh8?w=1162&amp;h=142" src="https://static.alili.tech/img/bV9Oh8?w=1162&amp;h=142" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>min-content：收缩到最小。在表格中最常见，当每一列空间都不够的时候，文字能断则断，中文随便断，英文单词不能断。可以根据这个特性实现凹凸图形等效果，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Oig?w=158&amp;h=156" src="https://static.alili.tech/img/bV9Oig?w=158&amp;h=156" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oiq?w=1114&amp;h=112" src="https://static.alili.tech/img/bV9Oiq?w=1114&amp;h=112" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oiv?w=1218&amp;h=158" src="https://static.alili.tech/img/bV9Oiv?w=1218&amp;h=158" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>max-content：超出容器限制，内容很长的连续英文或数字，或者内联元素被设置为了white-space: nowrap。</p>
<p><span class="img-wrap"><img data-src="/img/bV9OiI?w=748&amp;h=108" src="https://static.alili.tech/img/bV9OiI?w=748&amp;h=108" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oi2?w=1288&amp;h=226" src="https://static.alili.tech/img/bV9Oi2?w=1288&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Ojk?w=1274&amp;h=204" src="https://static.alili.tech/img/bV9Ojk?w=1274&amp;h=204" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">height</h3>
<p>height的默认值也是auto，指的是其高度由内部元素堆叠而成，内部元素盒子有多高，元素就有多高。但在绝对定位中，若同时设置了top与bottom，则其高度由父盒子高度减去top与bottom。</p>
<p>height: 100%。如果父元素height为auto，则子元素height:100%是无效的，要想子元素height: 100%生效，则：</p>
<ul>
<li>父元素设定显式高度值</li>
<li>使用绝对定位（绝对定位元素的百分比是根据padding box计算的，非绝对定位元素百分比是根据content box计算的）</li>
</ul>
<h3 id="articleHeader4">替换元素</h3>
<p>由于替换元素在很多表现上都与普通内联元素不一样，因此在这里着重介绍一下替换元素。</p>
<ul>
<li>根据“外在盒子”是内联还是块级，我们把元素分为内联元素和块级元素，而根据内容是否可替换，我们把元素分为可替换元素和非替换元素。</li>
<li>&lt;img&gt;，&lt;video&gt;，&lt;canvas&gt;，&lt;input&gt;，&lt;textarea&gt;，&lt;iframe&gt;都是替换元素。</li>
<li>替换元素外观不受页面css的影响，有自己的尺寸，一般为300 * 150，在很多css属性上有自己的一套表现规则，例如vertical-align默认就是元素下边缘对齐，而不是基线对齐。</li>
<li>替换元素尺寸计算规则：css尺寸 &gt; html尺寸 &gt; 固有尺寸</li>
<li>内联替换元素和块级替换元素规则一致，即display: block，其宽度也不会100%。</li>
<li>替换元素固有尺寸无法更改，width和height改变的是content-box的宽高，而默认替换元素的object-fit是fill，也就是会填充content-box，因此看上去像是改变了固有尺寸。</li>
<li>替换元素before和after伪元素无效。</li>
</ul>
<h3 id="articleHeader5">padding</h3>
<ul>
<li>padding与内联元素</li>
<li>padding的百分比值</li>
</ul>
<p>padding与内联元素。padding作用在块级元素上会影响盒子的宽高，但是如果作用在内联元素上（不包括替换元素），似乎就只能作用在水平方向上，垂直方向上就没看到任何影响。但事实并不是没有影响，只是视觉上我们觉得没有影响而已。因为内联元素没有可视宽度和可视高度的说法(clientWidth和clientHeight永远是0)，垂直方向完全受line-height和vertical-align的影响，视觉上并没有改变上一行和下一行内容的间距，因此，给我们的感觉就是垂直方向上padding没有起作用。利用这个特性，我们可以在垂直方向上增大可点击区域，这样既不会破坏现有布局，也能很好地响应用户的点击。特别是在移动端，一个关闭的“x”如果太小，用户就很难点击到，调大字体又会影响布局，这时候就可以用到padding。</p>
<p>padding的百分比值。padding不支持负值，padding百分比无论宽高都是相对于width来说的，另外padding区域是跟着行框盒子走的。因此，如果padding作用于内联元素，则宽度和高度细节有差异，并且padding会断行，其原因在于<a href="https://www.w3.org/TR/CSS2/visudet.html#strut" rel="nofollow noreferrer" target="_blank">strut</a>，意思是说每一个行框盒子前面都有一个不可见的盒子，其line-height和font-size都继承于父元素，称为strut。利用padding的这些特性，我们可以实现如下效果：</p>
<ul><li>利用padding实现一个正方形</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV9Ojs?w=370&amp;h=356" src="https://static.alili.tech/img/bV9Ojs?w=370&amp;h=356" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oju?w=1172&amp;h=212" src="https://static.alili.tech/img/bV9Oju?w=1172&amp;h=212" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OjA?w=1110&amp;h=188" src="https://static.alili.tech/img/bV9OjA?w=1110&amp;h=188" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>内联元素padding高度差异(只需把font-size设为0即可变为正方形)</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV9OjI?w=366&amp;h=414" src="https://static.alili.tech/img/bV9OjI?w=366&amp;h=414" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OjK?w=1162&amp;h=182" src="https://static.alili.tech/img/bV9OjK?w=1162&amp;h=182" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OjO?w=1110&amp;h=248" src="https://static.alili.tech/img/bV9OjO?w=1110&amp;h=248" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>padding断行(由于padding作用在行框盒子上，因此文字换行，padding也跟着换行，后面的背景盖住了前面的，就形成了这种效果)</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV9OjZ?w=322&amp;h=428" src="https://static.alili.tech/img/bV9OjZ?w=322&amp;h=428" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oj3?w=1114&amp;h=178" src="https://static.alili.tech/img/bV9Oj3?w=1114&amp;h=178" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">margin</h3>
<ul>
<li>margin: auto</li>
<li>margin改变元素尺寸</li>
<li>margin负值</li>
<li>margin合并</li>
<li>margin无效的情况</li>
</ul>
<p>margin: auto生效的前提是元素在width和height为auto的时候能够自动填充容器，这样，在设置width或height的值时，如果还有剩余尺寸，margin: auto就可以利用剩余尺寸。因此在绝对定位元素设置了top、bottom、left、right的情况下，就可以很方便地实现水平垂直居中，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Oj5?w=476&amp;h=442" src="https://static.alili.tech/img/bV9Oj5?w=476&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Oj6?w=1222&amp;h=178" src="https://static.alili.tech/img/bV9Oj6?w=1222&amp;h=178" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Okb?w=1144&amp;h=318" src="https://static.alili.tech/img/bV9Okb?w=1144&amp;h=318" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>margin改变元素尺寸。在元素width为auto的情况下，margin正值和负值都能改变元素的尺寸。如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Okn?w=462&amp;h=440" src="https://static.alili.tech/img/bV9Okn?w=462&amp;h=440" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Okp?w=1148&amp;h=228" src="https://static.alili.tech/img/bV9Okp?w=1148&amp;h=228" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Okr?w=1202&amp;h=238" src="https://static.alili.tech/img/bV9Okr?w=1202&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>margin负值。margin支持负值，并且用途十分广泛，例如，在等宽的盒子中，最后一个元素不因margin-right而折行；实现等高布局等。如下：</p>
<p>盒子并列占满父元素：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Oku?w=720&amp;h=232" src="https://static.alili.tech/img/bV9Oku?w=720&amp;h=232" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Okv?w=1216&amp;h=252" src="https://static.alili.tech/img/bV9Okv?w=1216&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Okz?w=1202&amp;h=214" src="https://static.alili.tech/img/bV9Okz?w=1202&amp;h=214" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OkB?w=1172&amp;h=258" src="https://static.alili.tech/img/bV9OkB?w=1172&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>等高布局，其原理是利用padding撑开一片足够大的高度，再用margin负值将顶下去的元素收回来：</p>
<p><span class="img-wrap"><img data-src="/img/bV9OkF?w=662&amp;h=238" src="https://static.alili.tech/img/bV9OkF?w=662&amp;h=238" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OkH?w=1192&amp;h=220" src="https://static.alili.tech/img/bV9OkH?w=1192&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OkM?w=1224&amp;h=296" src="https://static.alili.tech/img/bV9OkM?w=1224&amp;h=296" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>margin合并。块级元素的上外边距与下外边距有时会合并为单个外边距，这种现象称为“margin合并”。一般会有以下三种：</p>
<p>1、相邻兄弟元素margin合并</p>
<p>2、父级和第一个/最后一个子元素合并</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="margin-top合并，解决方案：

    父元素设置为块状格式化上下文元素
    父元素设置border-top值
    父元素设置padding-top值
    父元素和第一个子元素之间添加内联元素进行分隔

margin-bottom合并，解决方案：

    父元素设置为块状格式化上下文元素
    父元素设置border-bottom值
    父元素设置padding-bottom值
    父元素和最后一个子元素之间添加内联元素进行分隔
    父元素设置 height、min-height 或 max-height。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">margin-top</span>合并，解决方案：

    父元素设置为块状格式化上下文元素
    父元素设置<span class="hljs-attribute">border-top</span>值
    父元素设置<span class="hljs-attribute">padding-top</span>值
    父元素和第一个子元素之间添加内联元素进行分隔

<span class="hljs-attribute">margin-bottom</span>合并，解决方案：

    父元素设置为块状格式化上下文元素
    父元素设置<span class="hljs-attribute">border-bottom</span>值
    父元素设置<span class="hljs-attribute">padding-bottom</span>值
    父元素和最后一个子元素之间添加内联元素进行分隔
    父元素设置 <span class="hljs-attribute">height</span>、<span class="hljs-attribute">min-height</span> 或 <span class="hljs-attribute">max-height</span>。
</code></pre>
<p>3、空块级元素的margin合并，即自身有margin-top和margin-bottom，但元素是空的，此时会合并为一个margin。</p>
<p>margin无效。margin在某些场景下会失效，但有些“失效”只是视觉上的表现而已。如下：</p>
<ul>
<li>display 计算值 inline 的非替换元素的垂直 margin 是无效的，虽然规范提到有 渲染，但浏览器表现却未寻得一点踪迹，这和 padding 是有明显区别的。对于内联替换元素， 垂直 margin 有效，并且没有 margin 合并的问题，所以图片永远不会发生 margin 合并。</li>
<li>表格中的&lt;tr&gt;和&lt;td&gt;元素或者设置 display 计算值是 table-cell 或 table-row 的元素的 margin 都是无效的。但是，如果计算值是 table-caption、table 或者 inline-table 则没有此问题，可以通过 margin 控制外间距，甚至::first-letter 伪元素也可以解析 margin。</li>
<li>margin合并的时候，更改margin值可能无效。因为垂直方向上会发生margin合并。</li>
<li>绝对定位元素非定位方位的margin值“无效”(其实margin是有效的，只是元素绝对定位了，并不影响其相邻元素的渲染)。</li>
<li>定高容器的子元素的margin-bottom或者宽度定死的子元素的margin-right的定位“失效”。这里的失效也是假的，原因跟绝对定位的margin无效类似，在一个默认流下，其定位方向是左侧和上方，此时只有margin-left和margin-top可以影响其定位，而margin-right和margin-bottom则只会影响其相邻元素，若此时没有相邻元素，则看上去像是margin无效。</li>
<li>内联特性导致的margin值无效。一个div元素中有一个img图片，我们对img使用margin-top负值，当margin-top负值达到一定值的时候，再往上图片也不会上移。</li>
</ul>
<h3 id="articleHeader7">border</h3>
<ul>
<li>制作图形</li>
<li>等高布局</li>
</ul>
<p>相信不少同学都使用过border来制作图形，例如三角形、圆形等等，此处就不举例子，主要讲讲等高布局，代码和效果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV9OkS?w=1046&amp;h=376" src="https://static.alili.tech/img/bV9OkS?w=1046&amp;h=376" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9OkZ?w=1334&amp;h=486" src="https://static.alili.tech/img/bV9OkZ?w=1334&amp;h=486" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV9Ok7?w=1206&amp;h=354" src="https://static.alili.tech/img/bV9Ok7?w=1206&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>其原理就是父元素撑开一个border-left，菜单栏左浮动，并且宽度跟父元素border保持一致，通过margin-left负值往左偏移到border位置，另外父元素设置伪元素after来清除浮动，这样就可以实现左侧固定，右侧自适应的两栏等高布局。</p>
<p>参考资料：<br>《CSS世界》</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解css盒子模型

## 原文链接
[https://segmentfault.com/a/1190000014692461](https://segmentfault.com/a/1190000014692461)

