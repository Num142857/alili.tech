---
title: 'JS正则表达式一条龙讲解，从原理和语法到JS正则、ES6正则扩展，最后再到正则实践思路' 
date: 2019-01-28 2:30:09
hidden: true
slug: 8hgpz302yhe
categories: [reprint]
---

{{< raw >}}

                    
<p>温馨提示：文章很长很长，保持耐心，必要时可以跳着看，当然用来查也是不错的。</p>
<blockquote>
<p>正则啊，就像一座灯塔，当你在字符串的海洋不知所措的时候，总能给你一点思路；正则啊，就像一台验钞机，在你不知道用户提交的钞票真假的时候，总能帮你一眼识别；正则啊，就像一个手电筒，在你需要找什么玩意的时候，总能帮你get你要的东西...  </p>
<p>——  节选自 Stinson 同学的语文排比句练习《正则》</p>
</blockquote>
<p>欣赏了一段文学节选后，我们正式来梳理一遍JS中的正则，本文的首要目的是，<strong>防止我经常忘记正则的一些用法，故梳理和写下来加强熟练度和用作参考</strong>，次要目的是<strong>与君共勉</strong>，如有纰漏，请不吝赐教，良辰谢过。</p>
<p>本文既然取题为“一条龙”，就要对得起”龙”，故将包括正则原理、语法一览、JS(ES5)中的正则、ES6对正则的扩展、实践正则的思路，我尽量深入尽量浅出地去讲这些东西(搞得好像真能深入浅出一样的)，如果你只想知道<strong>怎么应用，那么看第二、三、五部分</strong>，基本就能满足你的需求了，如果想掌握JS中的正则的，那么还是委屈你跟着我的思路来吧，嘿嘿嘿！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008088940" src="https://static.alili.tech/img/remote/1460000008088940" alt="JS正则一条龙讲解.jpg" title="JS正则一条龙讲解.jpg" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">一、原理概论</h2>
<p>在一开始用正则的时候，就觉得神奇，计算机究竟是怎么根据一个正则表达式来匹配字符串的？直到后来我遇到了一本书叫《计算理论》，看到了正则、DFA、NFA的概念和相互间的联系，才有一些恍然小悟的意思。</p>
<p>但如果真的要从原理上吃透正则表达式，那么恐怕最好的方式是：</p>
<ol>
<li><p>首先去找一本专门讲正则的书去看看，O’REILLY的“动物总动员”系列里就有；</p></li>
<li><p>再自己实现一个正则引擎。</p></li>
</ol>
<p>而本文的重点在于JS中正则的应用，故原理仅作简单介绍（因为我也没写过正则引擎，也不深入），一来大致“糊弄下”像我一样的好奇宝宝们对正则原理的疑惑，二来知道一些原理方面基本的知识，对于理解语法和写正则是大有裨益的。</p>
<h3 id="articleHeader1">1. 正则引擎</h3>
<p>为什么正则能有效，因为有引擎，这和为什么JS能执行一样，有JS引擎，所谓正则引擎，可以理解为<strong>根据你的正则表达式用算法去模拟一台机器，这台机器有很多状态，通过读取待测的字符串，在这些状态间跳来跳去，如果最后停在了“终结状态”(Happy Ending)，那么就Say I Do，否则Say You Are a Good Man</strong>。如此将一个正则表达式转换为一个可在有限的步数中计算出结果的机器，那么就实现了引擎。</p>
<p>正则的引擎大致可分为两类：DFA和NFA</p>
<ol>
<li><p>DFA (Deterministic finite automaton) 确定型有穷自动机</p></li>
<li><p>NFA (Non-deterministic finite automaton) 非确定型有穷自动机，大部分都是NFA</p></li>
</ol>
<p>这里的“确定型”指，对于某个确定字符的输入，这台机器的状态会确定地从a跳到b，“非确定型”指，对于某个确定字符的输入，这台机器可能有好几种状态的跳法；这里的“有穷”指，状态是有限的，可以在有限的步数内确定某个字符串是被接受还是发好人卡的；这里的“自动机”，可以理解为，一旦这台机器的规则设定完成，就可以自行判断了，不要人看。</p>
<p>DFA引擎不需要进行回溯，所以匹配效率一般情况下要高，但是它并不支持捕获组，于是也就不支持反向引用和<code>$</code>这种形式的引用，也不支持环视(Lookaround)、非贪婪模式等一些NFA引擎特有的特性。</p>
<blockquote><p>如果想更详细地了解正则、DFA、NFA，那么可以去看一下《计算理论》，然后你可以根据某个正则表达式自己<strong>画出</strong>一台自动机。</p></blockquote>
<h3 id="articleHeader2">2. 知识储备</h3>
<p>这一小节对于你理解正则表达式很有用，尤其是明白什么是字符，什么是位置。</p>
<h4>2.1 正则眼中的字符串——n个字符，n+1个位置</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008088941" src="https://static.alili.tech/img/remote/1460000008088941" alt="字符和位置.jpg" title="字符和位置.jpg" style="cursor: pointer;"></span></p>
<p>在上面的“笑声”字符串中，一共有8个字符，这是你能看到的，还有9个位置，这是聪明的人才能看到的。为什么要有字符还要有位置呢？因为位置是可以被匹配的。</p>
<p>那么进一步我们再来理解“占有字符”和“零宽度”:</p>
<ul>
<li><p>如果一个子正则表达式匹配到的是字符，而不是位置，而且会被保存到最终的结果中，那个这个子表达式就是<strong>占有字符</strong>的，比如<code>/ha/</code>（匹配<code>ha</code>）就是占有字符的；</p></li>
<li><p>如果一个子正则匹配的是位置，而不是字符，或者匹配到的内容不保存在结果中（其实也可以看做一个位置），那么这个子表达式是<strong>零宽度</strong>的，比如<code>/read(?=ing)/</code>（匹配reading，但是只将read放入结果中，下文会详述语法，此处仅仅举例用），其中的<code>(?=ing)</code>就是零宽度的，它本质代表一个位置。</p></li>
</ul>
<p>占有字符是互斥的，零宽度是非互斥的。也就是一个字符，同一时间只能由一个子表达式匹配，而一个位置，却可以同时由多个零宽度的子表达式匹配。举个栗子，比如<code>/aa/</code>是匹配不了<code>a</code>的，这个字符串中的a只能由正则的第一个a字符匹配，而不能同时由第二个a匹配（废话）；但是位置是可以多个匹配的，比如<code>/\b\ba/</code>是可以匹配<code>a</code>的，虽然正则表达式里有2个表示单词开头位置的<code>\b</code>元字符，这两个<code>\b</code>是可以同时匹配位置0（在这个例子中）的。</p>
<p><em>注意：我们说字符和位置是面向字符串说的，而说占有字符和零宽度是面向正则说的。</em></p>
<h4>2.2 控制权和传动</h4>
<p>这两个词可能在搜一些博文或者资料的时候会遇到，这里做一个解释先：</p>
<p><strong>控制权</strong>是指哪一个正则子表达式（可能为一个普通字符、元字符或元字符序列组成）在匹配字符串，那么控制权就在哪。</p>
<p><strong>传动</strong>是指正则引擎的一种机制，传动装置将定位正则从字符串的哪里开始匹配。</p>
<p>正则表达式当开始匹配的时候，一般是由一个子表达式获取控制权，从字符串中的某一个位置开始尝试匹配，一个子表达式开始尝试匹配的位置，是从前一子表达匹配成功的结束位置开始的。</p>
<p>举一个栗子，<code>read(?=ing)ing\sbook</code>匹配<code>reading book</code>，我们把这个正则看成5个子表达式<code>read</code>、<code>(?=ing)</code>、<code>ing</code>、<code>\s</code>、<code>book</code>，当然你也可以吧<code>read</code>看做4个单独字符的子表达式，只是我们这里为了方便这么看待。<code>read</code>从位置0开始匹配到位置4，后面的<code>(?=ing)</code>继续从位置4开始匹配，发现位置4后面确实是ing，于是断言匹配成功，也就是整一个<code>(?=ing)</code>就是匹配了位置4这一个位置而已（这里更能理解什么是零宽了吧），然后后面的<code>ing</code>再从位置4开始匹配到位置7，然后<code>\s</code>再从位置7匹配到位置8，最后的<code>book</code>从位置8匹配到位置12，整一个匹配完成。</p>
<h3 id="articleHeader3">3. 匹配之旅“浅”度游（可跳过）</h3>
<p>说了那么多，我们把自己当做一个正则引擎，一步一步以最小的单位——“字符”和“位置”——去看一下正则匹配的过程，举几个栗子。</p>
<h4>3.1 基本匹配</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="正则表达式：easy
源字符串：So easy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>正则表达式：easy
源字符串：<span class="hljs-keyword">So</span> easy</code></pre>
<p>匹配过程：首先由正则表达式字符<code>e</code>取得控制权，从字符串的位置0开始匹配，遇到字符串字符‘S’，匹配失败，然后正则引擎向前传动，从位置1开始尝试，遇到字符串字符‘o’，匹配失败，继续传动，后面的空格自然也失败，于是从位置3开始尝试匹配，成功匹配字符串字符‘e’，控制权交给正则表达式子表达式（这里也是一个字符）<code>a</code>，尝试从上次匹配成功的<strong>结束</strong>位置4开始匹配，成功匹配字符串字符‘a’，后面一直如此匹配到‘y’，然后匹配完成，匹配结果为<code>easy</code>。</p>
<h4>3.2 零宽匹配</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="正则：^(?=[aeiou])[a-z]+$
源字符串：apple" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>正则：^(?=<span class="hljs-string">[aeiou]</span>)<span class="hljs-string">[a-z]</span>+$
源字符串：apple</code></pre>
<p>首先这个正则表示：匹配这样一个从头到尾完整的字符串，这整一个字符串仅由小写字母组成，并且以a、e、i、o、u这5个字母任一字母开头。</p>
<p>匹配过程：首先正则的<code>^</code>（表示字符串开始的位置）获取控制权，从位置0开始匹配，匹配成功，控制权交给<code>(?=[aeiou])</code>，这个子表达式要求该位置右边必须是元音小写字母中的一个，零宽子表达式相互间不互斥，所以从位置0开始尝试匹配，右侧是字符串的‘a’，符合因此匹配成功，所以<code>(?=[aeiou])</code>匹配此处的位置0匹配成功，控制权交给<code>[a-z]+</code>，从位置0开始匹配，字符串‘apple’中的每个字符都匹配成功，匹配到字符串末尾，控制权交回正则的<code>$</code>，尝试匹配字符串结束位置，成功，至此，整个匹配完成。</p>
<h4>3.3 贪婪匹配和非贪婪匹配</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="正则1：{.*}
正则2：{.*?}
源字符串：{233}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">正则1：</span><span class="hljs-template-variable">{.*}</span><span class="xml">
正则2：</span><span class="hljs-template-variable">{.*?}</span><span class="xml">
源字符串：</span><span class="hljs-template-variable">{233}</span></code><span class="xml"></span></pre>
<p>这里有两个正则，在限定符（语法会讲什么是限定符）后面加<code>?</code>符号表示忽略优先量词，也就是非贪婪匹配，这个栗子我剥得快一点。</p>
<p>首先开头的<code>{</code>匹配，两个正则都是一样的表现。</p>
<p>正则1的<code>.*</code>为贪婪匹配，所以一直匹配余下字符串'233}'，匹配到字符串结束位置，<strong>只是每次匹配，都记录一个备选状态，为了以后回溯，每次匹配有两条路，选择了匹配这条路，但记一下这里还可以有不匹配这条路，如果前面死胡同了，可以退回来</strong>，此时控制权交还给正则的<code>}</code>，去匹配字符串结束位置，失败，于是回溯，意思就是说前面的<code>.*</code>你吃的太多了，吐一个出来，于是控制权回给<code>.*</code>，吐出一个<code>}</code>（其实是用了前面记录的备选状态，尝试不用<code>.*</code>去匹配'}'），控制权再给正则的<code>}</code>，这次匹配就成功了。</p>
<p>正则2的<code>.*?</code>为非贪婪匹配，尽可能少地匹配，所以匹配'233}'的每一个字符的时候，都是尝试不匹配，但是一但控制权交还给最后的<code>}</code>就发现出问题了，赶紧回溯乖乖匹配，于是每一个字符都如此，最终匹配成功。</p>
<p>云里雾里？这就对了！可以移步去下面推荐的博客看看：</p>
<p><em>想详细了解贪婪和非贪婪匹配原理以及获取更多正则相关原理，除了看书之外，推荐去一个CSDN的博客 <a href="http://blog.csdn.net/lxcnn" rel="nofollow noreferrer" target="_blank">雁过无痕-博客频道 - CSDN.NET</a> ，讲解得很详细和透彻</em></p>
<h2 id="articleHeader4">二、语法一览</h2>
<p>正则的语法相信许多人已经看过<a href="http://deerchao.net/tutorials/regex/regex.htm" rel="nofollow noreferrer" target="_blank">deerchao写的30分钟入门教程</a>，我也是从那篇文字中入门的，deerchao从语法逻辑的角度以.NET正则的标准来讲述了正则语法，而我想重新组织一遍，以<strong>便于应用的角度、以JS为宿主语言来重新梳理一遍语法，这将便于我们把语言描述翻译成正则表达式</strong>。</p>
<p>下面这张一览图（可能需要放大），整理了常用的正则语法，并且将JS不支持的语法特性以红色标注出来了（正文将不会描述这些不支持的特性），语法部分的详细描述也将根据下面的图，从上到下，从左到右的顺序来梳理，尽量不啰嗦。<br><span class="img-wrap"><img data-src="/img/remote/1460000008088942" src="https://static.alili.tech/img/remote/1460000008088942" alt="常用正则语法一览横版有标题.png" title="常用正则语法一览横版有标题.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">1. 要用某类常见字符——简单元字符</h3>
<p>为什么这里要加简单2个字，因为在正则中，<code>\d</code>、<code>\w</code>这样的叫元字符，而<code>{n,m}</code>、<code>(?!exp)</code>这样的也叫元字符，所以元字符是在正则中有特定意义的标识，而这一小节讲的是简单的一些元字符。</p>
<ul>
<li><p><code>.</code>匹配除了换行符以外的任意字符，也即是<code>[^\n]</code>，如果要包含任意字符，可使用<code>(.|\n)</code></p></li>
<li><p><code>\w</code>匹配任意字母、数字或者下划线，等价于<code>[a-zA-Z0-9_]</code>，在deerchao的文中还指出可匹配汉字，但是<strong><code>\w</code>在JS中是不能匹配汉字</strong>的</p></li>
<li><p><code>\s</code>匹配任意空白符，包含换页符<code>\f</code>、换行符<code>\n</code>、回车符<code>\r</code>、水平制表符<code>\t</code>、垂直制表符<code>\v</code></p></li>
<li><p><code>\d</code>匹配数字</p></li>
<li><p><code>\un</code>匹配n，这里的n是一个有4个十六进制数字表示的Unicode字符，比如<code>\u597d</code>表示中文字符“好”，那么超过<code>\uffff</code>编号的字符怎么表示呢？ES6的u修饰符会帮你。</p></li>
</ul>
<h3 id="articleHeader6">2. 要表示出现次数（重复）——限定符</h3>
<ul>
<li><p><code>a*</code>表示字符a连续出现次数 &gt;= 0 次</p></li>
<li><p><code>a+</code>表示字符a连续出现次数 &gt;= 1 次</p></li>
<li><p><code>a?</code>表示字符a出现次数 0 或 1 次</p></li>
<li><p><code>a{5}</code>表示字符a连续出现次数 5 次</p></li>
<li><p><code>a{5,}</code>表示字符a连续出现次数 &gt;= 5次</p></li>
<li><p><code>a{5,10}</code>表示字符a连续出现次数为 5到10次 ，包括5和10</p></li>
</ul>
<h3 id="articleHeader7">3. 匹配位置——定位符和零宽断言</h3>
<p>匹配某个位置的表达式都是零宽的，这是主要包含两部分，一是定位符，匹配一个特定位置，二是零宽断言，匹配一个要满足某要求的位置。</p>
<p>定位符有以下几个常用的：</p>
<ul>
<li><p><code>\b</code>匹配单词边界位置，准确的描述是它匹配一个位置，这个位置前后不全是<code>\w</code>能描述的字符，所以像<code>\u597d\babc</code>是可以匹配“好abc”的。</p></li>
<li><p><code>^</code>匹配字符串开始位置，也就是位置0，如果设置了 RegExp 对象的 Multiline 属性，<code>^</code> 也匹配 'n' 或 'r' 之后的位置</p></li>
<li><p><code>$</code>匹配字符串结束位置，如果设置了RegExp 对象的 Multiline 属性，<code>$</code> 也匹配 'n' 或 'r' 之前的位置</p></li>
</ul>
<p>零宽断言（JS支持的）有以下两个：</p>
<ul>
<li><p><code>(?=exp)</code>匹配一个位置，这个位置的右边能匹配表达式exp，<strong>注意这个表达式仅仅匹配一个位置，只是它对于这个位置的右边有要求，而右边的东西是不会被放进结果的</strong>，比如用<code>read(?=ing)</code>去匹配“reading”，结果是“read”，而“ing”是不会放进结果的</p></li>
<li><p><code>(?!exp)</code>匹配一个位置，这个位置的右边不能匹配表达式exp</p></li>
</ul>
<h3 id="articleHeader8">4. 想表达“或”的意思——字符簇和分歧</h3>
<p>我们经常会表达“或”的含义，比如这几个字符中的任意一个都行，再比如匹配5个数字或者5个字母都行等等需求。</p>
<p>字符簇可用来表达字符级别的“或”语义，表示的是方括号中的字符任选一：</p>
<ul>
<li><p><code>[abc]</code>表示a、b、c这3个字符中的任意一个，如果字母或者数字是连续的，那么可以用<code>-</code>连起来表示，<code>[b-f]</code>代表从b到f这么多字符中任选一个</p></li>
<li><p><code>[(ab)(cd)]</code>并不会用来匹配字符串“ab”或“cd”，而是匹配a、b、c、d、(、)这6个字符中的任一个，也就是想表达“匹配字符串ab或者cd”这样的需求不能这么做，要这么写<code>ab|cd</code>。但这里要匹配圆括号本身，讲道理是要反斜杠转义的，但是在方括号中，圆括号被当成普通字符看待，<strong>即便如此，仍然建议显式地转义</strong></p></li>
</ul>
<p>分歧用来表达表达式级别的“或”语义，表示的是匹配<code>|</code>左右任一表达就可：</p>
<ul>
<li><p><code>ab|cd</code>会匹配字符串“ab”或者“cd”</p></li>
<li><p><strong>会短路</strong>，回想下编程语言中逻辑或的短路，所以用<code>(ab|abc)</code>去匹配字符串“abc”，结果会是“ab”，因为竖线左边的已经满足了，就用左边的匹配结果代表整个正则的结果</p></li>
</ul>
<h3 id="articleHeader9">5. 想表达“非”的意思——反义</h3>
<p>有时候我们想表达“除了某些字符之外”这样的需求，这个时候就要用到反义</p>
<ul>
<li><p><code>\W</code>、<code>\D</code>、<code>\S</code>、<code>\B</code> 用大写字母的这几个元字符表示就是对应小写字母匹配内容的反义，这几个依次匹配“除了字母、数字、下划线外的字符”、“非数字字符”、“非空白符”、“非单词边界位置”</p></li>
<li><p><code>[^aeiou]</code>表示除了a、e、i、o、u外的任一字符，在<strong>方括号中且出现在开头位置</strong>的<code>^</code>表示排除，如果<code>^</code>在方括号中不出现在开头位置，那么它仅仅代表<code>^</code>字符本身</p></li>
</ul>
<h3 id="articleHeader10">6. 整体看待和捕获——分组和后向引用</h3>
<p>其实你在上面的一些地方已经看到了圆括号，是的，圆括号就是用来分组的，括在一对括号里的就是一个分组。</p>
<p>上面讲的大部分是针对字符级别的，比如重复字母 “A” 5次，可以用<code>A{5}</code>来表示，但是如果想要字符串“ABC”重复5次呢？这个时候就需要用到括号。</p>
<p><strong>括号的第一个作用</strong>，将括起来的分组当做一个整体看待，所以你可以像对待字符重复一样在一个分组后面加限定符，比如<code>(ABC){5}</code>。</p>
<p>分组匹配到的内容也就是这个分组<strong>捕获</strong>到的内容，<strong>从左往右，以左括号为标志，每个分组会自动拥有一个从1开始的编号</strong>，编号0的分组对应整个正则表达式，<strong>JS不支持捕获组显示命名</strong>。</p>
<p><strong>括号的第二个作用</strong>，分组捕获到的内容，可以在之后通过<code>\分组编号</code>的形式进行后向引用。比如<code>(ab|cd)123\1</code>可以匹配“ab123ab”或者“cd123cd”，但是不能匹配“ab123cd”或“cd123ab”，这里有一对括号，也是第一对括号，所以编号为捕获组1，然后在正则中通过<code>\1</code>去引用了捕获组1的捕获的内容，这叫<strong>后向引用</strong>。</p>
<p><strong>括号的第三个作用</strong>，改变优先级，比如<code>abc|de</code>和<code>(abc|d)e</code>表达的完全不是一个意思。</p>
<h3 id="articleHeader11">7. 转义</h3>
<p>任何在正则表达式中有作用的字符都建议转义，哪怕有些情况下不转义也能正确，比如<code>[]</code>中的圆括号、<code>^</code>符号等。</p>
<h3 id="articleHeader12">8. 优先级问题</h3>
<p>优先级从高到低是：</p>
<ul>
<li><p>转义 \</p></li>
<li><p>括号（圆括号和方括号）<code>(), (?:), (?=), []</code></p></li>
<li><p>字符和位置</p></li>
<li><p>竖线 <code>|</code></p></li>
</ul>
<h3 id="articleHeader13">9. 贪婪和非贪婪</h3>
<p>在限定符中，除了<code>{n}</code>确切表示重复几次，其余的都是一个有下限的范围。</p>
<p>在默认的模式（贪婪）下，会尽可能多的匹配内容。比如用<code>ab*</code>去匹配字符串“abbb”，结果是“abbb”。</p>
<p>而通过在限定符后面加问号<code>?</code>可以进行非贪婪匹配，会尽可能少地匹配。用<code>ab*?</code>去匹配“abbb”，结果会是“a”。</p>
<p>不带问号的限定符也称匹配优先量词，带问号的限定符也称忽略匹配优先量词。</p>
<h3 id="articleHeader14">10. 修饰符（匹配选项）</h3>
<p>其实正则的匹配选项有很多可选，不同的宿主语言环境下可能各有不同，此处就JS的修饰符作一个说明：</p>
<ul>
<li><p>加g修饰符：表示全局匹配，模式将被应用到所有字符串，而不是在发现第一个匹配项时停止</p></li>
<li><p>加i修饰符：表示不区分大小写</p></li>
<li><p>加m修饰符：表示多行模式，会改变<code>^</code>和<code>$</code>的行为，上文已述</p></li>
</ul>
<h2 id="articleHeader15">三、JS(ES5)中的正则</h2>
<p>JS中的正则由引用类型RegExp表示，下面主要就RegExp类型的创建、两个主要方法和构造函数属性来展开，然后会提及String类型上的模式匹配，最后会简单罗列JS中正则的一些局限。</p>
<h3 id="articleHeader16">1. 创建正则表达式</h3>
<p>一种是用字面量的方式创建，一种是用构造函数创建，我们始终建议用前者。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//创建一个正则表达式
var exp = /pattern/flags;
//比如
var pattern=/\b[aeiou][a-z]+\b/gi;
//等价下面的构造函数创建
var pattern=new RegExp(&quot;\\b[aeiou][a-z]+\\b&quot;,&quot;gi&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//创建一个正则表达式</span>
<span class="hljs-keyword">var</span> exp = <span class="hljs-regexp">/pattern/</span>flags;
<span class="hljs-comment">//比如</span>
<span class="hljs-keyword">var</span> pattern=<span class="hljs-regexp">/\b[aeiou][a-z]+\b/gi</span>;
<span class="hljs-comment">//等价下面的构造函数创建</span>
<span class="hljs-keyword">var</span> pattern=<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"\\b[aeiou][a-z]+\\b"</span>,<span class="hljs-string">"gi"</span>);</code></pre>
<p>其中pattern可以是任意的正则表达式，flags部分是修饰符，在上文中已经阐述过了，有 g、i、m 这3个（ES5中）。</p>
<p>现在说一下为什么不要用构造函数，因为<strong>用构造函数创建正则，可能会导致对一些字符的双重转义</strong>，在上面的例子中，构造函数中第一个参数必须传入字符串（ES6可以传字面量），所以字符\<br>会被转义成\，因此字面量的<code>\b</code>会变成字符串中的<code>\\b</code>，这样很容易出错，贼多的反斜杠。</p>
<h3 id="articleHeader17">2. RegExp上用来匹配提取的方法——exec()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var matches=pattern.exec(str);

接受一个参数：源字符串
返回：结果数组，在没有匹配项的情况下返回null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> matches=pattern.exec(str);

接受一个参数：源字符串
返回：结果数组，在没有匹配项的情况下返回<span class="hljs-literal">null</span></code></pre>
<p>结果数组包含两个额外属性，index表示匹配项在字符串中的位置，input表示源字符串，结果数组matches第一项即<code>matches[0]</code>表示匹配整个正则表达式匹配的字符串，<code>matches[n]</code>表示于模式中第n个捕获组匹配的字符串。</p>
<p>要注意的是，第一，exec()永远只返回一个匹配项（指匹配整个正则的），第二，如果设置了<code>g</code>修饰符，每次调用exec()会在字符串中继续查找新匹配项，不设置<code>g</code>修饰符，对一个字符串每次调用exec()永远只返回第一个匹配项。所以如果要匹配一个字符串中的所有需要匹配的地方，那么可以设置<code>g</code>修饰符，然后通过循环不断调用exec方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//匹配所有ing结尾的单词
var str=&quot;Reading and Writing&quot;;
var pattern=/\b([a-zA-Z]+)ing\b/g; 
var matches;
while(matches=pattern.exec(str)){
    console.log(matches.index +' '+ matches[0] + ' ' + matches[1]);
}
//循环2次输出
//0 Reading Read
//12 Writing Writ" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//匹配所有ing结尾的单词</span>
<span class="hljs-keyword">var</span> str=<span class="hljs-string">"Reading and Writing"</span>;
<span class="hljs-keyword">var</span> pattern=<span class="hljs-regexp">/\b([a-zA-Z]+)ing\b/g</span>; 
<span class="hljs-keyword">var</span> matches;
<span class="hljs-keyword">while</span>(matches=pattern.exec(str)){
    <span class="hljs-built_in">console</span>.log(matches.index +<span class="hljs-string">' '</span>+ matches[<span class="hljs-number">0</span>] + <span class="hljs-string">' '</span> + matches[<span class="hljs-number">1</span>]);
}
<span class="hljs-comment">//循环2次输出</span>
<span class="hljs-comment">//0 Reading Read</span>
<span class="hljs-comment">//12 Writing Writ</span></code></pre>
<h3 id="articleHeader18">3. RegExp上用来测试匹配成功与否的方法——test()</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result=pattern.test(str);

接受一个参数：源字符串
返回：找到匹配项，返回true，没找到返回false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result=pattern.test(str);

接受一个参数：源字符串
返回：找到匹配项，返回<span class="hljs-literal">true</span>，没找到返回<span class="hljs-literal">false</span></code></pre>
<h3 id="articleHeader19">4. RegExp构造函数属性</h3>
<p>RegExp构造函数包含一些属性，适用于作用域中的所有正则表达式，并且<strong>基于所执行的最近一次正则表达式操作而变化</strong>。</p>
<ul>
<li><p><code>RegExp.input</code>或<code>RegExp["$_"]</code>：最近一次要匹配的字符串</p></li>
<li><p><code>RegExp.lastMatch</code>或<code>RegExp["$&amp;"]</code>：最近一次匹配项</p></li>
<li><p><code>RegExp.lastParen</code>或<code>RegExp["$+"]</code>：最近一次匹配的捕获组</p></li>
<li><p><code>RegExp.leftContext</code>或<code>RegExp["$`"]</code>：input字符串中lastMatch之前的文本</p></li>
<li><p><code>RegExp.rightContext</code>或<code>RegExp["$'"]</code>：input字符串中lastMatch之后的文本</p></li>
<li><p><code>RegExp["$n"]</code>：表示第n个捕获组的内容，n取1-9</p></li>
</ul>
<h3 id="articleHeader20">5. String类型上的模式匹配方法</h3>
<p>上面提到的exec和test都是在RegExp实例上的方法，调用主体是一个正则表达式，而以字符串为主体调用模式匹配也是最为常用的。</p>
<h4>5.1 匹配捕获的match方法</h4>
<p>在字符串上调用match方法，本质上和在正则上调用exec相同，但是<strong>match方法返回的结果数组是没有input和index属性的</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str=&quot;Reading and Writing&quot;;
var pattern=/\b([a-zA-Z]+)ing\b/g; 
//在String上调用match
var matches=str.match(pattern);
//等价于在RegExp上调用exec
var matches=pattern.exec(str);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str=<span class="hljs-string">"Reading and Writing"</span>;
<span class="hljs-keyword">var</span> pattern=<span class="hljs-regexp">/\b([a-zA-Z]+)ing\b/g</span>; 
<span class="hljs-comment">//在String上调用match</span>
<span class="hljs-keyword">var</span> matches=str.match(pattern);
<span class="hljs-comment">//等价于在RegExp上调用exec</span>
<span class="hljs-keyword">var</span> matches=pattern.exec(str);</code></pre>
<h4>5.2 返回索引的search方法</h4>
<p>接受的参数和match方法相同，要么是一个正则表达式，要么是一个RegExp对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//下面两个控制台输出是一样的，都是5
var str=&quot;I am reading.&quot;;
var pattern=/\b([a-zA-Z]+)ing\b/g; 

var matches=pattern.exec(str);
console.log(matches.index);

var pos=str.search(pattern);
console.log(pos);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//下面两个控制台输出是一样的，都是5</span>
<span class="hljs-keyword">var</span> str=<span class="hljs-string">"I am reading."</span>;
<span class="hljs-keyword">var</span> pattern=<span class="hljs-regexp">/\b([a-zA-Z]+)ing\b/g</span>; 

<span class="hljs-keyword">var</span> matches=pattern.exec(str);
<span class="hljs-built_in">console</span>.log(matches.index);

<span class="hljs-keyword">var</span> pos=str.search(pattern);
<span class="hljs-built_in">console</span>.log(pos);</code></pre>
<h4>5.3 查找并替换的replace方法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result=str.replace(RegExp or String, String or Function);

第一个参数（查找）：RegExp对象或者是一个字符串（这个字符串就被看做一个平凡的字符串）
第二个参数（替换内容）：一个字符串或者是一个函数
返回：替换后的结果字符串，不会改变原来的字符串" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result=str.replace(<span class="hljs-built_in">RegExp</span> or <span class="hljs-built_in">String</span>, <span class="hljs-built_in">String</span> or <span class="hljs-built_in">Function</span>);

第一个参数（查找）：<span class="hljs-built_in">RegExp</span>对象或者是一个字符串（这个字符串就被看做一个平凡的字符串）
第二个参数（替换内容）：一个字符串或者是一个函数
返回：替换后的结果字符串，不会改变原来的字符串</code></pre>
<p><strong>第一个参数是字符串</strong></p>
<p>只会替换第一个子字符串</p>
<p><strong>第一个参数是正则</strong></p>
<p>指定<code>g</code>修饰符，则会替换所有匹配正则的地方，否则只替换第一处</p>
<p><strong>第二个参数是字符串</strong></p>
<p>可以使用一些特殊的字符序列，将正则表达式操作的值插进入，这是很常用的。</p>
<ul>
<li><p><code>$n</code>：匹配第n个捕获组的内容，n取0-9</p></li>
<li><p><code>$nn</code>：匹配第nn个捕获组内容，nn取01-99</p></li>
<li><p><code> $` </code>：匹配子字符串之后的字符串</p></li>
<li><p><code>$'</code>：匹配子字符串之前的字符串</p></li>
<li><p><code>$&amp;</code>：匹配整个模式得字符串</p></li>
<li><p><code>$$</code>：表示<code>$</code>符号本身</p></li>
</ul>
<p><strong>第二个参数是一个函数</strong></p>
<ul>
<li><p>在只有一个匹配项的情况下，会传递3个参数给这个函数：模式的匹配项、匹配项在字符串中的位置、原始字符串</p></li>
<li><p>在有多个捕获组的情况下，传递的参数是模式匹配项、第一个捕获组、第二个、第三个...最后两个参数是模式的匹配项在字符串位置、原始字符串</p></li>
</ul>
<p>这个函数要返回一个字符串，表示要替换掉的匹配项</p>
<h4>5.4 分隔字符串的split</h4>
<p>基于指定的分隔符将一个字符串分割成多个子字符串，将结果放入一个数组，接受的第一个参数可以是RegExp对象或者是一个字符串（不会被转为正则），第二个参数可选指定数组大小，确保数组不会超过既定大小。</p>
<h3 id="articleHeader21">6 JS（ES5）中正则的局限</h3>
<p>JS（ES5）中不支持以下正则特性（在一览图中也可以看到）：</p>
<blockquote><ul>
<li><p>匹配字符串开始和结尾的A和Z锚</p></li>
<li><p>向后查找（所以不支持零宽度后发断言）</p></li>
<li><p>并集和交集类</p></li>
<li><p>原子组</p></li>
<li><p>Unicode支持（uFFFF之后的）</p></li>
<li><p>命名的捕获组</p></li>
<li><p>单行和无间隔模式</p></li>
<li><p>条件匹配</p></li>
<li><p>注释</p></li>
</ul></blockquote>
<h2 id="articleHeader22">四、ES6对正则的主要加强</h2>
<p>ES6对正则做了一些加强，这边仅仅简单罗列以下主要的3点，具体可以去看ES6</p>
<h3 id="articleHeader23">1. 构造函数可以传正则字面量了</h3>
<p>ES5中构造函数是不能接受字面量的正则的，所以会有双重转义，但是ES6是支持的，即便如此，还是建议用字面量创建，简洁高效。</p>
<h3 id="articleHeader24">2. u修饰符</h3>
<p>加了<code>u</code>修饰符，会正确处理大于<code>\uFFFF</code>的Unicode，意味着4个字节的Unicode字符也可以被支持了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  \uD83D\uDC2A是一个4字节的UTF-16编码，代表一个字符
/^\uD83D/u.test('\uD83D\uDC2A')
//  false，加了u可以正确处理
/^\uD83D/.test('\uD83D\uDC2A')
//  true，不加u，当做两个unicode字符处理" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//  \uD83D\uDC2A是一个4字节的UTF-16编码，代表一个字符</span>
/^\uD83D/u.test(<span class="hljs-string">'\uD83D\uDC2A'</span>)
<span class="hljs-comment">//  false，加了u可以正确处理</span>
/^\uD83D/.test(<span class="hljs-string">'\uD83D\uDC2A'</span>)
<span class="hljs-comment">//  true，不加u，当做两个unicode字符处理</span></code></pre>
<p>加了<code>u</code>修饰符，会改变一些正则的行为：</p>
<ul>
<li><p><code>.</code>原本只能匹配不大于<code>\uFFFF</code>的字符，加了<code>u</code>修饰符可以匹配任何Unicode字符</p></li>
<li><p>Unicode字符新表示法<code>\u{码点}</code>必须在加了<code>u</code>修饰符后才是有效的</p></li>
<li><p>使用<code>u</code>修饰符后，所有量词都会正确识别码点大于<code>0xFFFF</code>的Unicode字符</p></li>
<li><p>使一些反义元字符对于大于<code>\uFFFF</code>的字符也生效</p></li>
</ul>
<h3 id="articleHeader25">3. y修饰符</h3>
<p>y修饰符的作用与g修饰符类似，也是全局匹配，开始从位置0开始，后一次匹配都从上一次匹配成功的下一个位置开始。</p>
<p>不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始。</p>
<p>所以<code>/a/y</code>去匹配<code>"ba"</code>会匹配失败，因为y修饰符要求，在剩余位置第一个位置（这里是位置0）开始就要匹配。</p>
<p>ES6对正则的加强，可以看<a href="http://caibaojian.com/es6/regex.html" rel="nofollow noreferrer" target="_blank">这篇</a></p>
<h2 id="articleHeader26">五、应用正则的实践思路</h2>
<p>应用正则，一般是要先想到正则（废话），只要看到<strong>和“找”相关的需求并且这个源是可以被字符串化的</strong>，就可以想到用正则试试。</p>
<p>一般在应用正则有两类情况，一是验证类问题，另一类是搜索、提取、替换类问题。验证，最常见的如表单验证；搜索，以某些设定的命令加关键词去搜索；提取，从某段文字中提取什么，或者从某个JSON对象中提取什么（因为JSON对象可以字符串化啊）；替换，模板引擎中用到。</p>
<h3 id="articleHeader27">1. 验证类问题</h3>
<p>验证类问题是我们最常遇到的，这个时候其实源字符串长什么样我们是不知道，鬼知道萌萌哒的用户会做出什么邪恶的事情来，推荐的方式是这样的:</p>
<ol>
<li><p>首先用白话描述清楚你要怎样的字符串，描述好了之后，就开脑洞地想用户可能输入什么奇怪的东西，就是自己举例，拿一张纸可举一大堆的，有接受的和不接受的（这个是你知道的），这个过程中可能你会去修改之前的描述；</p></li>
<li><p>把你的描述拆解开来，翻译成正则表达式；</p></li>
<li><p>测试你的正则表达式对你之前举的例子的判断是不是和你预期一致，这里就推荐用<a href="http://www.regexpal.com/" rel="nofollow noreferrer" target="_blank">在线的JS正则测试</a>去做，不要自己去一遍遍写了。</p></li>
</ol>
<h3 id="articleHeader28">2. 搜索、提取、替换类问题</h3>
<p>这类问题，一般我们是知道源文本的格式或者大致内容的，所以在解决这类问题时一般已经会有一些测试的源数据，我们要从这些源数据中提取出什么、或者替换什么。</p>
<ol>
<li><p>找到这些手上的源数据中你需要的部分；</p></li>
<li><p>观察这些部分的特征，这些部分本身的特征以及这些部分周围的特征，比如这部分前一个符号一定是一个逗号，后一个符号一定是一个冒号，总之就是找规律；</p></li>
<li><p>考察你找的特征，首先能不能确切地标识出你要的部分，不会少也不会多，然后考虑下以后的源数据也是如此么，以后会不会这些特征就没有了；</p></li>
<li><p>组织你对要找的这部分的描述，描述清楚经过你考察的特征；</p></li>
<li><p>翻译成正则表达式；</p></li>
<li><p>测试。</p></li>
</ol>
<p><em>终于絮絮叨叨写完了，1万多字有关JS正则的讲解，写完发现自己对正则的熟练又进了一步，所以推荐大家经常做做梳理，很有用，然后乐于分享，于己于人都是大有裨益，感谢能看完的所有人。</em></p>
<p><em>我没有仔细地审稿，大家遇到什么问题，或者发现有什么纰漏之处，还望大家指出，留言就好。我会及时修改。</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS正则表达式一条龙讲解，从原理和语法到JS正则、ES6正则扩展，最后再到正则实践思路

## 原文链接
[https://segmentfault.com/a/1190000008088937](https://segmentfault.com/a/1190000008088937)

