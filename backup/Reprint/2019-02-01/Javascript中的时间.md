---
title: 'Javascript中的时间' 
date: 2019-02-01 2:30:10
hidden: true
slug: 6i7sr0vgkxm
categories: [reprint]
---

{{< raw >}}

                    
<p>我们在编程时，不可避免地会和时间打交道。 比如要完成一次秒杀活动， 就会涉及到时间存取，时间同步和时间差值计算等诸多细节。一个JavsScript的简单例子，当我们在浏览器控制台输入<code>new Date()</code>, 会得到如下结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Sun Oct 30 2016 16:27:04 GMT+0800 (CST)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Sun</span> <span class="hljs-selector-tag">Oct</span> <span class="hljs-selector-tag">30</span> <span class="hljs-selector-tag">2016</span> <span class="hljs-selector-tag">16</span><span class="hljs-selector-pseudo">:27</span><span class="hljs-selector-pseudo">:04</span> <span class="hljs-selector-tag">GMT</span>+<span class="hljs-selector-tag">0800</span> (CST)</code></pre>
<p>输出前半部分的含义很容易理解， 它代表的是2016年10月30日 星期日，下午16点27分04秒， 后半部分的<code>GMT</code>,<code>+0800</code>, <code>CST</code>到底代表什么呢， 本着一探究竟的想法， 本文来带大家详细了解下JS中的时间。</p>
<h2 id="articleHeader0">1.时间的表示</h2>
<p>在古代， 天文学的一个最重要任务就是度量时间，制定历法。我国古代将一年分为十二月、二十四节气,一天分为十二个时辰，目的就是为了一套高效的时间表示方法用以指导农耕。随着现代社会的发展，时间的表示也需要一套更加科学而精确的方法。</p>
<h3 id="articleHeader1">度量</h3>
<h4>从计时工具说起</h4>
<p>远古时代，人类是根据太阳与地球的角度变化来作息的， 人们都是日出而作， 日落而息， 人类一直遵循着这种延续下来的作息规律。这时的人们对于时间没有什么特别的概念，也不用计时工具。</p>
<p>在中国周代，人们将一天分为12个时辰：子、丑、寅、卯、辰、巳、午、未、申、酉、戊、亥，分别对应夜半、鸡鸣、平旦、日出、食时、隅中、日中、日昳、晡时、日入、黄昏、人定。用来指导人们一天的生活规律。这时，我们用沙漏、日晷来记录大致的时间，可以区别出来的最短时间是1个时辰（2h）。</p>
<p>后来，工业革命将人类带入了工业时代，此时人们对于时间有了更精细的划分，一天被分为12个小时， 每小时60分， 每分60秒。为了更高效地生产，我们用钟表来记录时间，我们对于时间的利用也达到了秒级。</p>
<p>而现在，我们的计时工具已经升级成了冷原子钟。 比如我国的北斗导航卫星系统使用的就是原子钟来记录时间，其计时精度已经达到纳秒级别（1ns=10^-9s）。我们已将空间和时间结合到了一起，可以通过时间来推算空间，在空间中转换时间。</p>
<blockquote><p>ps: 曾经在园区听过中科院博导徐颖关于北斗的演讲， 不禁为人类的创造力和中国的强大国力所折服。</p></blockquote>
<p>随着人类文明的进步，计时工具也在不断地发展。借助这些工具，人类对于时间的划分越来越细， 对于时间资源的利用率也越来越高。</p>
<h4>时间单位</h4>
<p>我们用时间单位来表达特定的时间间隔，常用的时间单位如： 世纪、年、季度、月、日、小时、分、 秒、 毫秒、微妙、纳秒等。当前人类可以测量的最短的时间单位是<a href="https://zh.wikipedia.org/zh-cn/%E9%98%BF%E7%A7%92" rel="nofollow noreferrer" target="_blank">阿秒</a>（attosecond），为中性π介子的寿命， 相当于10^-18 秒。</p>
<p>可以说，人们时间的细分过程和标准制定过程，其实是人类探索时间，利用时间的过程。 我们对于时间单位的认知，可以从侧面反映我们对自身所处的时空的认知。时间单位也折射出人类科学文明的发展历程。</p>
<h3 id="articleHeader2">时刻</h3>
<p>我们平时常说，现在9点钟了， 其实指的就是时刻。我们要表达的是当前已经达到9点这个时间点了。它是既没有大小也没有方向的，它只表达一个具体的时间点。 <br>就好比我们用尺子来衡量长度， 我们也在用一把标记着秒，小时的“尺子”来衡量时间。而时刻，只是我们都可理解的尺子上的某一个刻度。唯一的差别是， 空间中的长度通常是不变的， 而时间永远是在是不可逆地增加的。</p>
<h2 id="articleHeader3">2. 时间标准化</h2>
<p>首先，我们应认识到，在整个宇宙中， 时间是统一的。 从宇宙的诞生到现在， 总是可以用一个特定的时间间隔值来表示我们所经历的时间，它是一个固定的值。 那么我们不禁会问为什么会说我们这儿是早上9点，而英国那边确是凌晨1点呢，这不是两个不同的时间吗？这就要引出我们下面将提到的时间标准问题。</p>
<p>在以前，人类的活动范围相对狭小，基本不会注意到时区对于人类作息的影响。我们完全想象不到， 当我们在阳光下辛勤劳作的时候， 地球另一面的人们早已进入梦乡。</p>
<p>但是工业革命之后，人类的生产和交通工具不断进步，全球化协作成为不可阻挡的潮流。 此时人们已经意识到了地球在不停地自西向东自转， 自转一周则为一日。而不同经度的地区日出的时间是有先后差异的。比如中国北京还是正午的时候，大洋彼岸的美国纽约正好是深夜。早上8点我们一个电话打过去， 说美国的XXX， 该上班了， 对方一定是一脸的迷(meng)茫(bi), 我这准备洗洗睡呢。</p>
<p>正是人们认识到地球自转的天文规律，才需要制定一套全球统一的时间标准，这样，我们根据本地时间就可以推算出地球任何地区的当地时间（日出日落时间），以方便进行更好的协作。</p>
<h3 id="articleHeader4">格林尼治平时（Greenwich Mean Time， GMT）</h3>
<p>格林尼治是位于英国伦敦郊区的皇家格里尼治天文台， 我们经常说的格林尼治时间指的就是以此地的时间为标准时间制定的一套时间计量系统。</p>
<p>为了准确地表示各地时间，1884年，国际经度会议决定将通过英国格林尼治天文埃里中星仪的经线定为计算经度的起算经线，称为本初子午线。以本初子午线的平子夜起算的平太阳时，分别向东、西计量增减12时，作为统一的时间标准，称为格林尼治平时。这也就是GMT时间的由来，它是根据地球的自转所定义的一套时间标准，其对于日常生活， 天文导航和宇宙飞行等人类活动具有重要作用。</p>
<p>GMT的制定同时也产生了时区的概念。我们在听关于国外的新闻报道的时候，经常会听到于当地时间XX时XX分，本地时间yy时yy分发生了什么大事，然后是balabala。 这其实就是在时间的表示上避免位于不同时区的人对于时间理解的差异。</p>
<p>时区(Time Zone)， 设定了一个区域的标准时间。 理论上， 以被15整除的子午线为中心， 向东西各延伸7.5经度，划分为一个时区。实际上，由于各个国家的版图不规则， 通常会跨越多个时区， 所以国家内部还会规定整个行政区域内的一个实际时区，称为法定时区。比如中国， 从西到东横跨东五、东六、东七、东八和东九五个时区， 中华人民共和国成立以后，全国统一采用首都北京所在的东八时区的区时作为标准时间，称为北京时间。</p>
<h3 id="articleHeader5">协调世界时（Coordinated Universal Time， UTC）</h3>
<p>UTC通常被误认为是GMT， 其实两者的表示方法完全不同。</p>
<h4>UTC的由来</h4>
<p>人类观测到地球自转的缓慢下降，地球自转一周耗时经过一段时间后会多于现行的24小时，因此GMT时间已不再适合作为标准时间使用。现在的标准时间是由原子钟报时的协调世界时，这是由国际计量局和国际地球自转服务（IERS）维护的时间标度，是各标准频率和时间信号协协调播发基准。</p>
<p>那为什么又要搞个UTC呢，太乱了吧? 其实谁也不想这么麻烦， 这是地球自己“转”出来的。</p>
<p>我们常识性认为地球自转一周是24小时，而由于地球自转速度变慢，在经过了24h之后，地球可能还没有成一周的运转， 为了保证24h和地球完整的一周相匹配，就必须让钟表上的时间等待地球自转一周完成，这就是协调世界时中“协调”二字的含义。UTC时间相较于<code>国际原子钟时间（International Atomic Time, TAI）</code>实际是要慢的。</p>
<blockquote><p>注：秒是基本的时间国际单位，国际上现在标准的1秒为：铯133原子基态的两个超精细能级间跃迁对应的辐射的9,192,631,770个周期的持续时间</p></blockquote>
<p>说白了，TAI时间是基于原子规律定义的时间，这个时间长时间不会变化。UTC是为了符合地球自转周期所制定的时间， UTC会让全球的钟表都停下来，补上地球自转变慢的差值， 而矫正和同步机构就是IERS。全球所有国家根据UTC时间和各自国家所在的时区确定当地时间，以此来保证全球时间的低误差同步。</p>
<h4>闰秒</h4>
<p>UTC以加入闰秒（leap-secons）的方式对时间进行修正，以消除地球自转变慢的影响。闰秒是为了平衡因地球自转变慢所引起的和原子钟的时间差而特意设置的。如果不加入闰秒，可能过几万年之后，中午的12点会变成凌晨0点； 再过个几百万年，日历上的冬天会变成了夏天了，那么整个生产生活就会乱套了。</p>
<p>闰秒的引入时机是每年的6月和12月月末， 视UTC-TAI的演变差值而定，并且每隔六个月会公布是否需要加入闰秒（这就是IERS干的活儿）。</p>
<p>上次闰秒的引入时间是<code>UTC 2015-6-30 23:59:60</code>  而下一次的闰秒引入会在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2016-12-31 23:59:59
2016-12-31 23:59:60
2017-01-01 00:00:00" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>2016<span class="hljs-selector-tag">-12-31</span> 23<span class="hljs-selector-pseudo">:59</span><span class="hljs-selector-pseudo">:59</span>
2016<span class="hljs-selector-tag">-12-31</span> 23<span class="hljs-selector-pseudo">:59</span><span class="hljs-selector-pseudo">:60</span>
2017<span class="hljs-selector-tag">-01-01</span> 00<span class="hljs-selector-pseudo">:00</span><span class="hljs-selector-pseudo">:00</span></code></pre>
<p>从2015-07-01 00:00:00 UTC  到  2017-01-01 00:00:00 UTC 时间差异是： UTC - TAI = -36s. 也就是说，我们的UTC时间标准相较于真正的原子钟时间，人为地慢了36秒。</p>
<blockquote><p>PS1: 是不是感觉自己赚到了， 多活了36s呢！<br>PS2: 人类当前所用的时间大多都已经是UTC时间了， 但是很多时候还保留着GMT的时区划分规则，所以很多地方显示的还是GMT时间。</p></blockquote>
<h3 id="articleHeader6">北京时间（China Standard Time, CST)</h3>
<p>再来说一下我国的时间基准， 北京时间不是在北京确定的，而是由位于中国版图几何中心位置陕西临潼和陕西蒲城的中国科学院国家授时中心（国家授时台）的9台铯原子钟（铯钟）和2台氢原子钟组通过精密比对和计算实现，并通过卫星与世界各国授时部门进行实时比对确定的。国内的设备可以通过国家授时中心提供的NTP(Network Time Protocol)服务器和本地时间进行同步。具体使用可以参看<a href="http://www.pool.ntp.org/en/use.html" rel="nofollow noreferrer" target="_blank">此处</a>。</p>
<p>在Mac上， 可以通过如下命令和制定的NTP服务器进行校时：</p>
<blockquote><p>➜  ~ sudo ntpdate -u cn.pool.ntp.org<br>1 Nov 03:20:08 ntpdate[84376]: adjust time server 59.46.44.253 offset 0.014804 sec<br>➜  ~</p></blockquote>
<h2 id="articleHeader7">3. 小结</h2>
<p>再回到文章最开始所提到的, <code>new Date()</code>在输出数据， 所有的内容就清晰了:</p>
<ul>
<li><p><code>GMT</code>, 代表的格林尼治平时，但此处的GMT所表示的意思是：时间使用的时区是GMT标准，采用的是UTC时间</p></li>
<li><p><code>+0800</code> 代表的是当前时间和标准时间的时差， 精确到分。+0800， 表示当前时间早于UTC时间8小时整</p></li>
<li><p><code>CST</code> 指的是北京时间</p></li>
</ul>
<p>done!</p>
<h2 id="articleHeader8">4. 后记</h2>
<p>一门程序设计语言中有很多细节， 往往蕴含着极大的智慧。以本文提到的时间为例， 几个简单的单词， 其中蕴含了人类近几百年的科技文明发展成果，也反映了人类对于时间的尊重和敬畏，每一处都值得细细品味。</p>
<p>原文：<a href="http://lianmin.me/2016/10/30/time-in-javascript/" rel="nofollow noreferrer" target="_blank">http://lianmin.me/2016/10/30/...</a></p>
<h1 id="articleHeader9">参考文献</h1>
<p>[1] 闰秒（leap seconds）: <a href="http://tycho.usno.navy.mil/leapsec.html" rel="nofollow noreferrer" target="_blank">http://tycho.usno.navy.mil/le...</a><br><a href="https://hpiers.obspm.fr/iers/bul/bulc/bulletinc.dat" rel="nofollow noreferrer" target="_blank">https://hpiers.obspm.fr/iers/...</a><br>[2] 日期和时间表示法（国标 GB/T 7408-2005) <a href="http://www.cmaph.org/attachment/2013530/1369881489484.pdf" rel="nofollow noreferrer" target="_blank">http://www.cmaph.org/attachme...</a><br>[3] 24小时制： <a href="https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%8D%81%E5%9B%9B%E5%B0%8F%E6%99%82%E5%88%B6" rel="nofollow noreferrer" target="_blank">https://zh.wikipedia.org/wiki...</a><br>[4]时间： <a href="https://zh.wikipedia.org/wiki/%E6%97%B6%E9%97%B4" rel="nofollow noreferrer" target="_blank">https://zh.wikipedia.org/wiki...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript中的时间

## 原文链接
[https://segmentfault.com/a/1190000007411816](https://segmentfault.com/a/1190000007411816)

