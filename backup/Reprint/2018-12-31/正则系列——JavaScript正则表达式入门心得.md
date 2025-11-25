---
title: '正则系列——JavaScript正则表达式入门心得' 
date: 2018-12-31 2:30:30
hidden: true
slug: jkrukz2wmzj
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>我发现有个别字符被这个编辑器给刷掉了，但是灰色区域显示正常，以灰色区域代码为准</strong></p>
<h3 id="articleHeader0">什么玩意？</h3>
<p>在我刚开始学习编程的时候，就听过正则了，也听说正则很牛逼，懂正则的更牛逼。但是苦于没有人指点，也没有使用正则的场景，自己看教程又懵逼，直到现在，才发现了入门的诀窍。</p>
<p>在不同的编程语言中，正则表达式的写法会有所不同，这里我们讨论的是JavaScript正则写法。</p>
<p>学习正则，不要凭空想象，要使用开发工具去测试，推荐你使用在线正则测试网站：<a href="https://regex101.com" rel="nofollow noreferrer" target="_blank">https://regex101.com</a>，或者使用浏览器控制台。</p>
<h3 id="articleHeader1">最简单的正则</h3>
<p>正则在自然语言处理中广泛运用到，对前端开发者来说，最常见的正则是表单上的一些验证。如果你不熟悉正则，在写表单的时候，是从网上直接搜索某某正则的写法，然后copy过来。</p>
<p>但是，在你看完这篇文章之后，我希望你可以直接写出一些简单的正则，不再需要百度了。</p>
<p><strong>现在介绍一种最简单的正则（匹配指定的文本）：</strong><br>下面是一段美文，我们现在想把里面的某个字，比如（<strong>的</strong>），匹配出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = '前世茫茫人海的擦肩，种了今生的遇见，在花海的某一朵间，是你最美的笑颜。繁花三千，只为一人留恋，几度春秋，只等你花开的一面。多少来来回回，梦里若隐若现，举着思念的酒盏，轻酌夜色微凉，让回忆的美好舞翩翩。搁浅了时光，静默缘分的一端，远处的风景，依然是你微笑的眉眼。'
s.match(/的/g)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'前世茫茫人海的擦肩，种了今生的遇见，在花海的某一朵间，是你最美的笑颜。繁花三千，只为一人留恋，几度春秋，只等你花开的一面。多少来来回回，梦里若隐若现，举着思念的酒盏，轻酌夜色微凉，让回忆的美好舞翩翩。搁浅了时光，静默缘分的一端，远处的风景，依然是你微笑的眉眼。'</span>
s.match(<span class="hljs-regexp">/的/g</span>)</code></pre>
<p>我们使用到了match方法来做匹配，来分析一下这个写法，s表示字符串，g表示全局匹配，如果去掉g，只能匹配出来第一个（<strong>的</strong>）。<br>是不是最简单的正则？你需要匹配什么内容，就直接在//之间写这个字符，然后正则系统会自动从字符串去查找。<br>可能这样说不是很直观，我奉献一张101的截图，特别关注红框部分，最上边是正则的输入框，下面是字符串，右边是匹配出来的字符：</p>
<p><span class="img-wrap"><img data-src="/img/bVU5AI?w=2426&amp;h=1006" src="https://static.alili.tech/img/bVU5AI?w=2426&amp;h=1006" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">常用正则方法了解</h3>
<p>上面的例子中，使用到了<strong>match()</strong>，可以匹配出来字符，并且<strong>返回值是一个数组</strong>。还有一个常用的方法是<strong>test()</strong>，<strong>test的返回值是bool类型</strong>，通常用来写在if语句中判断一个字符串是否满足正则表达式，在表单验证中经常用到。还有一个常用的方法是<strong>replace()</strong>，replace和match比较像，都能匹配出字符，但是replace还有第二个参数可以做字符替换。<br>下面我们会讲到三个方法的具体使用场景。往下看！</p>
<h3 id="articleHeader3">test()</h3>
<p>正则有各种各样的符号，一般很难背下来，但是常用的符号多练习几遍，印象就会深刻。</p>
<p>我们用实际的例子来分析test()以及正则的实现，以注册表单为例：<br>test()和match()写法刚好反过来，test是正则写在前面，字符串写到函数的参数中。</p>
<h4>场景1：账号只能是数字</h4>
<p>看到这样一道题目，你首先要思考2个字——“<strong>规则</strong>”，账号是主体，账号的规则是只能是数字，那么就是说输入非数字就不能匹配。</p>
<p>了解了规则之后，就很简单了，正则提供了默认匹配数字的字符，d或者是[0-9]，那么是不是直接/d/.test('123')就行了呢？当然不是，d表示是数字，你还需要加上一个特殊字符，表示匹配所有的数字，因为一个字符串有N个数字，全部都要匹配成功。</p>
<p>这里我使用的是+，加号表示至少匹配一次数字，比如123，如果使用d，就只能一个个匹配出来[1,2,3]，这需要在match方法中使用，在test方法中，必须匹配整个字符串是否符合正则。改成d+之后，匹配的是整个字符串中的数字，是不是离我们的最终结果很接近了。</p>
<p>上面的操作似乎已经可以匹配出数字了，但是记住，test()方法中，如果你要验证整个字符串只能是数字，必须加上正则的开始符号^和结束符号$，表示的是从字符串'123'开头匹配到结尾都必须满足数字，如果中间插入其他字符'1kk2什么3'，就匹配失败。所以最终的正则写法是 /^\d+$/，或者是/^d+$/g，这里的g可加可不加。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var user = '123' //可以把123改成任意字符来测试。
if (/^\d+$/g.test(user)) {} //写法1 if(true){}
if (/^[0-9]+$/g.test(user)) {} //写法2 if(true){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> user = <span class="hljs-string">'123'</span> <span class="hljs-comment">//可以把123改成任意字符来测试。</span>
<span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^\d+$/g</span>.test(user)) {} <span class="hljs-comment">//写法1 if(true){}</span>
<span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^[0-9]+$/g</span>.test(user)) {} <span class="hljs-comment">//写法2 if(true){}</span></code></pre>
<h4>场景2：账号只能是字母</h4>
<p>数字匹配完了，换成字母会不会呢？只要把d或[0-9]改成字母的正则就行了。字母包含大小写，所以使用[a-zA-Z]。如果去掉^和$，那么仅仅是匹配user字符串中是否包含字母，使用indexOf()或者includes()代替。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var user = 'hyy' //可以把hyy改成任意字符来测试。
if (/^[a-zA-Z]+$/g.test(user)) {} //if(true){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> user = <span class="hljs-string">'hyy'</span> <span class="hljs-comment">//可以把hyy改成任意字符来测试。</span>
<span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^[a-zA-Z]+$/g</span>.test(user)) {} <span class="hljs-comment">//if(true){}</span></code></pre>
<h4>场景3：账号只能是字母开头，并且字母和数字的组合，长度范围是6-10。</h4>
<p>单打了2轮，不够爽，来一套组合拳。上面学习了 ^ $ [0-9] [a-zA-Z] + 这几个正则符号的使用，一定要记下来，很常用的。这组合拳似乎有点复杂，不过不怕，遇到这种问题，我们第一步还是提取规则：<br><strong>字母开头；</strong><br><strong>字母和数字组合；</strong><br><strong>长度6-10。</strong></p>
<p>1、你脑子里要想着 <strong>/^what<span style="font-weight:normal;">❓</span>$/.test(user)</strong> 的结构。</p>
<p>2、字母开头，那么就是第一个字符必须是字母。你需要学习一个新的正则，大括号{n,m}，x{1}表示匹配前面的字符1次，x{2}表示匹配2次符合x的字符，还可以写成x{1,3}，表示匹配符合x正则的符合最少1次，最多3次。说这段话你一下子理解不了，就跳过。我们只看{1}这种情况。所以，现在加上字母开头这条规则之后，正则变成了 <strong>/^[a-zA-Z]{1"}}"/</strong>，注意，我暂时没有写结束符号，最后再加上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^[a-zA-Z]{1"}}"/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/^[a-zA-Z]{<span class="hljs-number">1</span>"}}"/</code></pre>
<p>3、字母和数字组合，我们是不是要写成[a-zA-Z]d呢？其实还有一个更好的办法，你又学到了一个新的正则w，w和([a-zA-Z]|d)相同，都表示字母和数字的组合。顺便再讲讲 () 和 | 这2个正则的含义。在正则中，()表示一个group，也就是组，|表示或，所以([a-zA-Z]|d)的含义就是字母或者数字，再使用()括起来，形成了一个正则组。觉得括号复杂的话，使用w就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^[a-zA-Z]{1}\w/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/^[a-zA-Z]{<span class="hljs-number">1</span>}\w/</code></pre>
<p>4、终于快搞定了，最后一条规则，长度6-10，如果你不想使用正则，那么长度也可以根据字符串的length来判断，这样的话，上面的正则可以加上结束符号$直接使用了。\w后面我悄悄加了个+，因为要匹配后面的所有字母和数字至少一次，然后再写$结束：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(/^[a-zA-Z]{1}\w+$/g.test('Hyy123') &amp;&amp; 'Hyy123'.length > 5 &amp;&amp; 'Hyy123'.length < 11){}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[a-zA-Z]{1}\w+$/g</span>.test(<span class="hljs-string">'Hyy123'</span>) &amp;&amp; <span class="hljs-string">'Hyy123'</span>.length &gt; <span class="hljs-number">5</span> &amp;&amp; <span class="hljs-string">'Hyy123'</span>.length &lt; <span class="hljs-number">11</span>){}</code></pre>
<p>但是既然学习正则，那就用正则的方式去解决，其实更加简单。<br>利用上面学习的大括号{}，我们可以很容易实现长度控制。直接给你看<strong>最终形态：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(/^[a-zA-Z]{1}\w{5,9}$/g.test('Hyy123')){} //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^[a-zA-Z]{1}\w{5,9}$/g</span>.test(<span class="hljs-string">'Hyy123'</span>)){} <span class="hljs-comment">//true</span></code></pre>
<p>这个最终形态的正则可以拆分成几部分来看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="^：开头
[a-zA-Z]{1}：第一个字符匹配一次，且只能是字母
\w{5,9}：后面的字符是字母或者数字的组合，且长度是6-10，因为第一个字符占了一个长度，所以这里匹配的是5-9的长度
$：结束" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="text">^：开头
[a-zA-Z]{<span class="hljs-number">1</span>}：第一个字符匹配一次，且只能是字母
\w{<span class="hljs-number">5</span>,<span class="hljs-number">9</span>}：后面的字符是字母或者数字的组合，且长度是<span class="hljs-number">6</span><span class="hljs-number">-10</span>，因为第一个字符占了一个长度，所以这里匹配的是<span class="hljs-number">5</span><span class="hljs-number">-9</span>的长度
$：结束</code></pre>
<h4>场景4：密码只能是6位数字。</h4>
<p>这个就简单多了。规则首先是数字，然后长度是6。最后的g可要可不要。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^\d{6}$/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/^\d{<span class="hljs-number">6</span>}$/</code></pre>
<h3 id="articleHeader4">match()</h3>
<p>test()通常用来验证字符串是否符合某个规则，而match()是从字符串里面提取符合某规则的字符。对前端来说，match使用的场景不多，但是像微信端app的对话系统的表情包，就使用到了一个特定的规则。</p>
<p>你在给一个朋友发微信的时候，一般是直接点击某个表情，然后发送，但是其实还可以输入一些字符组合，然后发送后，在聊天界面，微信系统会自动匹配出来某个表情。这里我猜测就是用match做的字符串处理，又或许有什么我不知道的高深技术吧。</p>
<p>我用一个组合拳的例子介绍一下match的使用场景：</p>
<p>1、有这样一段文字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="text" style="word-break: break-word; white-space: initial;">我是一个前端，工作<span class="hljs-number">1</span>年了，现在失业，想进入腾讯工作，这是我的联系方式：<span class="hljs-number">15527578846</span></code></pre>
<p>2、假设你来应聘前端工程师，我是面试官，我给你提这么几个需求，从这段话中，提取联系方式，工作年限，你该怎么办？?</p>
<p>3、有时候前端也会碰到类似的需求，第一步是分析规则：<br><strong>联系方式</strong>：联系方式可能有很多种情况，比如手机号、微信、qq、座机号等，好吧，这样一看的确非常复杂，那么我们只考虑手机号的情况。<br><strong>工作年限：</strong>工作年限是阿拉伯数字。</p>
<p>4、考虑用什么方法去匹配，test还是match？这里一看就是用match，先分析第一个，提取联系方式，或者说提取手机号。手机号本身也有特定的规则：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="开头是1；
长度11；
第2位是3或5或7；
第3位到第11位是0到9的数字。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="text">开头是<span class="hljs-number">1</span>；
长度<span class="hljs-number">11</span>；
第<span class="hljs-number">2</span>位是<span class="hljs-number">3</span>或<span class="hljs-number">5</span>或<span class="hljs-number">7</span>；
第<span class="hljs-number">3</span>位到第<span class="hljs-number">11</span>位是<span class="hljs-number">0</span>到<span class="hljs-number">9</span>的数字。</code></pre>
<p>或许还有更加详细的手机号规则，你可以网上查一下手机号的组成规则。</p>
<p>5、现在开始用正则匹配出来吧，不要怕，很简单的。看第一条，开头是1，啥，开头，你是不是又想到了/^1/。对不起，你这样写就错了。因为字符串的开头是 "我"，所以你换一下写法就对了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/1/ " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/<span class="hljs-number">1</span>/ </code></pre>
<p>6、长度是11位，这个很重要，但后面才匹配长度，先看第二位数字的规则，3、5、7，用正则组的写法就是 (3|5|7)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/1(3|5|7){1}/ //这里再加个{1}表示匹配前面括号里的规则1次。这样就能匹配到字符串里的15了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/<span class="hljs-number">1</span>(<span class="hljs-number">3</span>|<span class="hljs-number">5</span>|<span class="hljs-number">7</span>){<span class="hljs-number">1</span>}/ <span class="hljs-comment">//这里再加个{1}表示匹配前面括号里的规则1次。这样就能匹配到字符串里的15了。</span></code></pre>
<p>7、第3到第11位是0-9的数字，那么就是d{9}，因为后面还有9位数字，所以匹配9次即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/1(3|5|7){1}\d{9}/ //匹配出来就是15527578846" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">/<span class="hljs-number">1</span>(<span class="hljs-number">3</span>|<span class="hljs-number">5</span>|<span class="hljs-number">7</span>){<span class="hljs-number">1</span>}\d{<span class="hljs-number">9</span>}/ <span class="hljs-comment">//匹配出来就是15527578846</span></code></pre>
<p>8、看看完整的写法，match匹配出来的是一个数组，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = '我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846'

//加g匹配完整的正则
s.match(/1(3|5|7){1}\d{9}/g) // ['15527578846']

//不加g匹配完整的正则的同时，还将()里面的小正则也匹配出来。
s.match(/1(3|5|7){1}\d{9}/)
//[&quot;15527578846&quot;, &quot;5&quot;, index: 35, input: &quot;我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846'</span>

<span class="hljs-comment">//加g匹配完整的正则</span>
s.match(<span class="hljs-regexp">/1(3|5|7){1}\d{9}/g</span>) <span class="hljs-comment">// ['15527578846']</span>

<span class="hljs-comment">//不加g匹配完整的正则的同时，还将()里面的小正则也匹配出来。</span>
s.match(<span class="hljs-regexp">/1(3|5|7){1}\d{9}/</span>)
<span class="hljs-comment">//["15527578846", "5", index: 35, input: "我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846"]</span></code></pre>
<p>9、这个正则虽然提取出来了手机号，但是并不完善，更加精确的匹配需要判断开头和结尾不能再跟着其他数字，比如991552757884699，这样仍旧会把99中间的11位数字提取出来。当然，这不属于当前场景考虑的问题了。</p>
<p>10、分析第二个，<strong>工作年限</strong>，工作年限有个特点，就是他是数字，并且后面一定跟着“年”，前面跟着“工作”，这样一来规则就很简单了。正则里面的问号 ? 表示问号前面的规则匹配0次或者1次。意思就是如果"工作"不存在，正则也成立。比如原句子是“工作1年”，变成“1年”。同样可以匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s.match(/(工作)?(\d{1,2})年/) //(\d{1,2})年限最少1次，最多2次，我不信你工作了100年。
// [&quot;工作1年&quot;, &quot;工作&quot;, &quot;1&quot;, index: 7, input: &quot;我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846&quot;]
s.match(/(工作)?(\d{1,2})年/)[2] //目标结果 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">s.match(<span class="hljs-regexp">/(工作)?(\d{1,2})年/</span>) <span class="hljs-comment">//(\d{1,2})年限最少1次，最多2次，我不信你工作了100年。</span>
<span class="hljs-comment">// ["工作1年", "工作", "1", index: 7, input: "我是一个前端，工作1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846"]</span>
s.match(<span class="hljs-regexp">/(工作)?(\d{1,2})年/</span>)[<span class="hljs-number">2</span>] <span class="hljs-comment">//目标结果 1</span></code></pre>
<h3 id="articleHeader5">replace()</h3>
<p>在前端开发中，这个方法很常用，看这么几个场景：</p>
<h4>场景1：将字符串里面的逗号替换成感叹号</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var s = '我是一个前端，上班1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846'
s.replace(/，/g, &quot;！&quot;)
// &quot;我是一个前端！上班1年了！现在失业！想进入腾讯工作！这是我的联系方式：15527578846&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> s = <span class="hljs-string">'我是一个前端，上班1年了，现在失业，想进入腾讯工作，这是我的联系方式：15527578846'</span>
s.replace(<span class="hljs-regexp">/，/g</span>, <span class="hljs-string">"！"</span>)
<span class="hljs-comment">// "我是一个前端！上班1年了！现在失业！想进入腾讯工作！这是我的联系方式：15527578846"</span></code></pre>
<h4>场景2：将手机号最后8位替换成 *</h4>
<p>1、首先你要使用test判断是否是手机号，然后再执行替换语句。</p>
<p>2、使用match提取出手机号的后8位数字。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'15527578846'.match(/^\d{3}((\d){8})$/)
//[&quot;15527578846&quot;, &quot;27578846&quot;, &quot;7&quot;, index: 0, input: &quot;15527578846&quot;]

var r = '15527578846'.match(/^\d{3}((\d){8})$/)[1] //&quot;27578846&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'15527578846'</span>.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>)
<span class="hljs-comment">//["15527578846", "27578846", "7", index: 0, input: "15527578846"]</span>

<span class="hljs-keyword">var</span> r = <span class="hljs-string">'15527578846'</span>.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>)[<span class="hljs-number">1</span>] <span class="hljs-comment">//"27578846"</span></code></pre>
<p>3、接着执行replace匹配变量r，然后执行替换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'15527578846'.match(/^\d{3}((\d){8})$/)
//[&quot;15527578846&quot;, &quot;27578846&quot;, &quot;7&quot;, index: 0, input: &quot;15527578846&quot;]

var r = '15527578846'.match(/^\d{3}((\d){8})$/)[1] //&quot;27578846&quot;
'15527578846'.replace(r, '********') // &quot;155********&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">'15527578846'</span>.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>)
<span class="hljs-comment">//["15527578846", "27578846", "7", index: 0, input: "15527578846"]</span>

<span class="hljs-keyword">var</span> r = <span class="hljs-string">'15527578846'</span>.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>)[<span class="hljs-number">1</span>] <span class="hljs-comment">//"27578846"</span>
<span class="hljs-string">'15527578846'</span>.replace(r, <span class="hljs-string">'********'</span>) <span class="hljs-comment">// "155********"</span>
</code></pre>
<p>4、我们可以将这个过程封装成一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function regexTest(tel) {
    if(typeof tel !== 'string') throw Error('类型不对！');
    tel.match(/^\d{3}((\d){8})$/);
    var r = tel.match(/^\d{3}((\d){8})$/)[1];
    return tel.replace(r, '********');
}
regexTest('15527578846') // &quot;155********&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">regexTest</span>(<span class="hljs-params">tel</span>) </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> tel !== <span class="hljs-string">'string'</span>) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'类型不对！'</span>);
    tel.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>);
    <span class="hljs-keyword">var</span> r = tel.match(<span class="hljs-regexp">/^\d{3}((\d){8})$/</span>)[<span class="hljs-number">1</span>];
    <span class="hljs-keyword">return</span> tel.replace(r, <span class="hljs-string">'********'</span>);
}
regexTest(<span class="hljs-string">'15527578846'</span>) <span class="hljs-comment">// "155********"</span></code></pre>
<h3 id="articleHeader6">总结</h3>
<p>本章你所学到的是正则入门的知识。掌握这些常用的语法和写一个正则的思路，对于一些简单的正则，应该能够自己写出来。后面还会继续跟大家分享各种正则需求的实现思路。</p>
<p><a href="https://segmentfault.com/a/1190000011194709">下一章：正则实战篇</a></p>
<p>正则系列文章整理到了github：<a href="https://github.com/hyy1115/RegExp-Learning" rel="nofollow noreferrer" target="_blank">https://github.com/hyy1115/Re...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
正则系列——JavaScript正则表达式入门心得

## 原文链接
[https://segmentfault.com/a/1190000011187831](https://segmentfault.com/a/1190000011187831)

