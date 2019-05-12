---
title: '基于规则评分的密码强度检测算法分析及实现(JavaScript)' 
date: 2018-12-10 2:30:07
hidden: true
slug: jsdz111a81
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>用正则表达式做用户密码强度的通过性判定，过于简单粗暴，不但用户体验差，而且用户帐号安全性也差。那么如何准确评价用户密码的强度，保护用户帐号安全呢？本文分析介绍了几种基于规则评分的密码强度检测算法，并给出了相应的演示程序。大家可以根据自己项目安全性需要，做最适合于自己的方案选择。</p>
<p><span class="img-wrap"><img data-src="http://res.42du.cn/up/201803/0y4a3ipl.jpg" src="https://static.alili.techhttp://res.42du.cn/up/201803/0y4a3ipl.jpg" alt="密码强度检测算法" title="密码强度检测算法" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">1 方案1 （简单）</h2>
<p>方案1算法通过密码构成分析，结合权重分派，统计得出密码强度得分。得分越高，表示密码强度越大，也就越安全。方案1算法思想简单，实现容易。</p>
<h3 id="articleHeader2">1.1 方案1评分标准</h3>
<p>一、密码长度：</p>
<ul>
<li>5 分: 小于等于4 个字符</li>
<li>10 分: 5 到7 字符</li>
<li>25 分: 大于等于8 个字符</li>
</ul>
<p>二、字母：</p>
<ul>
<li>0 分: 没有字母</li>
<li>10 分: 全都是小（大）写字母</li>
<li>20 分: 大小写混合字母</li>
</ul>
<p>三、数字:</p>
<ul>
<li>0 分: 没有数字</li>
<li>10 分: 1 个数字</li>
<li>20 分: 大于1 个数字</li>
</ul>
<p>四、符号:</p>
<ul>
<li>0 分: 没有符号</li>
<li>10 分: 1 个符号</li>
<li>25 分: 大于1 个符号</li>
</ul>
<p>五、奖励:</p>
<ul>
<li>2 分: 字母和数字</li>
<li>3 分: 字母、数字和符号</li>
<li>5 分: 大小写字母、数字和符号</li>
</ul>
<h3 id="articleHeader3">1.2 方案1等级划分</h3>
<p>根据密码评分，将密码划分成以下7个等级：</p>
<ul>
<li>&gt;= 90: 非常安全（VERY_SECURE）</li>
<li>&gt;= 80: 安全（SECURE）</li>
<li>&gt;= 70: 非常强（VERY_STRONG）</li>
<li>&gt;= 60: 强（STRONG）</li>
<li>&gt;= 50: 一般（AVERAGE）</li>
<li>&gt;= 25: 弱（WEAK）</li>
<li>&gt;= 0:  非常弱（ VERY_WEAK）</li>
</ul>
<p>该评分标准及等级划分，实际使用时，可小做调整，但不建议做大的变动。</p>
<h3 id="articleHeader4">1.3 方案1演示程序</h3>
<p><a href="http://www.42du.cn/run/48" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader5">1.4 方案1测试分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 评分 25，纯小写字母无法通过验证
console.log(&quot;aaaaaaaa&quot;.score());
// 评分 45，纯数字无法通过验证
console.log(&quot;11111111&quot;.score());
// 评分 47，小写+数字无法通过验证
console.log(&quot;aa111111&quot;.score());
// 评分 45，小写+大写无法通过验证
console.log(&quot;aaaaAAAA&quot;.score());
// 评分 50，4位密码不可能通过验证
console.log(&quot;11!!&quot;.score());
// 评分 70，5位密码可通过验证
console.log(&quot;0aA!!&quot;.score());
// 评分 67，小写+大写+数字可通过验证（8位）
console.log(&quot;aA000000&quot;.score());
// 评分 70，数字+符号可通过验证
console.log(&quot;000000!!&quot;.score());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 评分 25，纯小写字母无法通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"aaaaaaaa"</span>.score());
<span class="hljs-comment">// 评分 45，纯数字无法通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"11111111"</span>.score());
<span class="hljs-comment">// 评分 47，小写+数字无法通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"aa111111"</span>.score());
<span class="hljs-comment">// 评分 45，小写+大写无法通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"aaaaAAAA"</span>.score());
<span class="hljs-comment">// 评分 50，4位密码不可能通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"11!!"</span>.score());
<span class="hljs-comment">// 评分 70，5位密码可通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"0aA!!"</span>.score());
<span class="hljs-comment">// 评分 67，小写+大写+数字可通过验证（8位）</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"aA000000"</span>.score());
<span class="hljs-comment">// 评分 70，数字+符号可通过验证</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"000000!!"</span>.score());</code></pre>
<p>从以上测试结果中，我们可以看出算法是十分的有效的，基本能够保证密码具有一定的安全性。但是存在的问题也很明显，其中最主要的问题是对重复或连续的字符评分过高。以测试用例中最后一个为例： <code>000000!!</code> 可以得到70分，但显然并不是一个非常强壮的密码。</p>
<p>另外，方案1最高可以得到95分，也就是说没有100分（绝对安全）的密码，这一点也是很有智慧的设计。</p>
<h2 id="articleHeader6">2 方案2</h2>
<p>针对方案1中的不足，方案2中引入了减分机制。对于重复出现，连续出现的字符给予适当的减分，以使得密码评分更准确。同时在方案2中密码的评分基数及计算过程都十分的复杂，要想理解其中每一步的含义，请保持足够的耐心。</p>
<h3 id="articleHeader7">2.1 方案2加分项</h3>
<p>一、密码长度：</p>
<ul><li>公式 ：+(n*4)，其中n表示密码长度</li></ul>
<p>二、大写字母：</p>
<ul><li>公式：+((len-n)*2)，其中n表示大写字母个数，len表示密码长度</li></ul>
<p>三、小写字母：</p>
<ul><li>公式：+((len-n)*2)，其中n表示小写字母个数，len表示密码长度</li></ul>
<p>四、数字：</p>
<ul>
<li>公式：+(n*4)，其中n表示数字个数</li>
<li>条件：满足n &lt; len，才能得到加分，len表示密码长度</li>
</ul>
<p>五、符号：</p>
<ul><li>公式：+(n*6)，其中n表示符号个数</li></ul>
<p>六、位于中间的数字或符号：</p>
<ul><li>公式：+(n*2)，其中n表示位于中间的数字或符号个数</li></ul>
<p>七、最低条件得分：</p>
<ul>
<li>公式：+(n*2)，其中n表示满足的最低条件条目数</li>
<li>条件：只有满足最低条件，才能得到加分</li>
</ul>
<p>其中最低条件的条目如下：</p>
<ul>
<li>1.密码长度不小于8位</li>
<li>2.包含大写字母</li>
<li>3.包含小写字母</li>
<li>4.包含数字</li>
<li>5.包含符号</li>
</ul>
<p>最低条件要求满足条目1并至少满足条目2-5中的任意三条。</p>
<h3 id="articleHeader8">2.2 方案2减分项</h3>
<p>一、只有字母：</p>
<ul><li>公式：-n，其中n表示字母个数</li></ul>
<p>二、只有数字：</p>
<ul><li>公式：-n，其中n表示数字个数</li></ul>
<p>三、重复字符数（大小写敏感）：</p>
<p>该项描述复杂，具体计算方法见如下示例程序：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pass = &quot;1111aaDD&quot;;  //示意密码
var repChar = 0;
var repCharBonus = 0;  //得分
var len = pass.length;
for(var i = 0; i < len; i++) {
    var exists = false;
    for (var j = 0; j < len; j++) {
        if (pass[i] == pass[j] &amp;&amp; i != j) {
            exists = true;
            repCharBonus += Math.abs(len/(j-i));
        }
    }
    if (exists) {
        repChar++;
        var unqChar = len - repChar;
        repCharBonus = (unqChar) ? Math.ceil(repCharBonus/unqChar) : Math.ceil(repCharBonus);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pass = <span class="hljs-string">"1111aaDD"</span>;  <span class="hljs-comment">//示意密码</span>
<span class="hljs-keyword">var</span> repChar = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> repCharBonus = <span class="hljs-number">0</span>;  <span class="hljs-comment">//得分</span>
<span class="hljs-keyword">var</span> len = pass.length;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
    <span class="hljs-keyword">var</span> exists = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; len; j++) {
        <span class="hljs-keyword">if</span> (pass[i] == pass[j] &amp;&amp; i != j) {
            exists = <span class="hljs-literal">true</span>;
            repCharBonus += <span class="hljs-built_in">Math</span>.abs(len/(j-i));
        }
    }
    <span class="hljs-keyword">if</span> (exists) {
        repChar++;
        <span class="hljs-keyword">var</span> unqChar = len - repChar;
        repCharBonus = (unqChar) ? <span class="hljs-built_in">Math</span>.ceil(repCharBonus/unqChar) : <span class="hljs-built_in">Math</span>.ceil(repCharBonus);
    }
}</code></pre>
<p>四、连续大写字母：</p>
<ul>
<li>公式：-(n*2)，其中n表示连续大写字母出现的次数</li>
<li>举例：如输入AUB，则n=2</li>
</ul>
<p>五、连续小写字母：</p>
<ul>
<li>公式：-(n*2)，其中n表示连续小写字母出现的次数</li>
<li>举例：如输入aub，则n=2</li>
</ul>
<p>六、连续数字：</p>
<ul>
<li>公式：-(n*2)，其中n表示连续数字出现的次数</li>
<li>举例：如输入381，则n=2</li>
</ul>
<p>七、正序或逆序字母：</p>
<ul>
<li>
<p>公式：-(n*3)，其中n表示连续发生的次数</p>
<ul>
<li>正序或逆序是指字母表中的顺序</li>
<li>不区分大小写</li>
</ul>
</li>
<li>条件：只有连续3个字母或以上，才会减分，</li>
<li>例1：如输入ABC，则n=1</li>
<li>例2：如输入dcBA，则n=2</li>
</ul>
<p>八、正序或逆序数字：</p>
<ul>
<li>公式：-(n*3)，其中n表示连续发生的次数</li>
<li>条件：只有连续3个数字或以上，才会减分</li>
<li>例1：如输入123，则n=1，</li>
<li>例2：如输入4321，则n=2</li>
<li>例3：如输入12，则不会减分</li>
</ul>
<p>九、正序或逆序符号：</p>
<ul>
<li>公式：-(n*3)，其中n表示连续发生的次数</li>
<li>条件：只有连续3个符号或以上，才会减分</li>
</ul>
<h3 id="articleHeader9">2.3 方案2等级划分</h3>
<p>根据密码评分，将密码划分成以下5个等级：</p>
<ul>
<li>&gt;= 80: 非常强（VERY_STRONG）</li>
<li>&gt;= 60: 强（STRONG）</li>
<li>&gt;= 40: 好（GOOD）</li>
<li>&gt;= 20: 弱（WEAK）</li>
<li>&gt;= 0:  非常弱（ VERY_WEAK）</li>
</ul>
<h3 id="articleHeader10">2.4 方案2演示程序</h3>
<p><a href="http://www.42du.cn/run/49" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<h3 id="articleHeader11">2.5 方案2测试分析</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 评分 0
console.log(&quot;11111111&quot;.score());
// 评分 2
console.log(&quot;aa111111&quot;.score());
// 评分 38
console.log(&quot;000000!!&quot;.score());
// 评分 76
console.log(&quot;Asdf2468&quot;.score());
// 评分 76
console.log(&quot;Mary2468&quot;.score());
// 评分 60
console.log(&quot;@dmin246&quot;.score());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 评分 0</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"11111111"</span>.score());
<span class="hljs-comment">// 评分 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"aa111111"</span>.score());
<span class="hljs-comment">// 评分 38</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"000000!!"</span>.score());
<span class="hljs-comment">// 评分 76</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Asdf2468"</span>.score());
<span class="hljs-comment">// 评分 76</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Mary2468"</span>.score());
<span class="hljs-comment">// 评分 60</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"@dmin246"</span>.score());</code></pre>
<p>从以上测试可以看出方案2较方案1有了比较大的改进和提升，尤其是对连续或重复字符上表现出色。但是方案2也存在明显的不足，主要缺点包括对人名（Mary）、单词（Story）、键盘上相连的键（Asdf）、L33T（@dmin）没法识别。</p>
<p>L33T：是指把拉丁字母换成数字或是特殊符号的书写形式。例如把E写成3、A写成@、to写成2、for写成4。</p>
<h2 id="articleHeader12">3 方案3 zxcvbn</h2>
<h3 id="articleHeader13">3.1 简要说明</h3>
<p>针对方案2中的不足，引入了方案3，进一步的提长密码强度。方案3完全引入一个第三方检验工具zxcvbn。</p>
<p>zxcvbn是一个受密码破解启发而来的密码强度估算器。它通过模式匹配和保守估计，大概可以识别大约30K左右的常规密码。主要基于美国人口普查数据，维基，美国电影，电视流行词以及其它一些常用模式，像日期，重复字符，序列字符，键盘模式和L33T会话等。</p>
<p>从算法的设计思想上，该方案完全秒杀基于构成的统计分析方法（前两种方法）。同时zxcvbn支持多种开发语言。因其模式的复杂及字典的存在，当前版本的zxcvbn.js大约有800多K。</p>
<p>要了解项目的详情及算法见zxcvbn官网：</p>
<p><a href="https://github.com/dropbox/zxcvbn" rel="nofollow noreferrer" target="_blank">github zxcvbn</a></p>
<h3 id="articleHeader14">3.2 方案3演示程序</h3>
<p><a href="http://www.42du.cn/run/50" rel="nofollow noreferrer" target="_blank">演示程序</a></p>
<p>以上是三胖对密码强度检测算法和方案的理解和分析，不足之处还请大家多多指正！</p>
<p><a href="http://www.42du.cn/p/44" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于规则评分的密码强度检测算法分析及实现(JavaScript)

## 原文链接
[https://segmentfault.com/a/1190000013818373](https://segmentfault.com/a/1190000013818373)

