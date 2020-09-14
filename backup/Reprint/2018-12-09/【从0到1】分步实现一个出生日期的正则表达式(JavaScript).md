---
title: '【从0到1】分步实现一个出生日期的正则表达式(JavaScript)' 
date: 2018-12-09 2:30:08
hidden: true
slug: kbqjyg5c82
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>在表单验证中，经常会用正则表达式做出生日期校验。本文把出生日期分割成几个部分，分步地介绍了实现一个出生日期校验的完整过程。相信您在理解了本篇的内容后，对如何编写和如何应用正则表达式会有进一步的理解和体会。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013898452?w=690&amp;h=176" src="https://static.alili.tech/img/remote/1460000013898452?w=690&amp;h=176" alt="出生日期的正则表达式" title="出生日期的正则表达式" style="cursor: pointer; display: inline;"></span></p>
<p>声明：本文目的是为了阐述如何编写一个正则表达式的过程。另本文所涉代码皆未经严格测试。</p>
<p>我们将一个形式如 2018-06-15 的出生日期分割个年份，月份和日期三个组成部分，分别来编写相应的正则。</p>
<h2 id="articleHeader1">1 年份正则</h2>
<p>首先给出年份正则表达式的规则定义：</p>
<ul>
<li>年份由4位数字组成</li>
<li>只接受19，20开头的年份</li>
</ul>
<p>根据以上规则，很容易写出年份的正则表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /^(19|20)\d{2}$/;
//输出 true
console.log(pattern.test(&quot;2008&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^(19|20)\d{2}$/</span>;
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2008"</span>));</code></pre>
<p>其中<code>/  /</code>两个斜杠及其中间的字符是正则表达式直接量的定义；<code>^</code>表示匹配字符串的开头，<code>$</code>表示匹配字符串的结尾；<code>^(19|20)</code>表示匹配以19或20开头的字符串，一对小括号作用是将几项组合为一个单元；而<code>\d{2}</code>表示匹配任意ASCII数字2次，<code>\d</code>等价于<code>[0-9]</code>，而<code>{2}</code>则表示匹配前一项2次。</p>
<p>上述正则表达式可以匹配1900至2099这些年份，如果想限制年份的范围，增加规则如下：</p>
<ul>
<li>年份起始于1920年</li>
<li>年份终止于2018年</li>
</ul>
<p>根据以上规则，变更正则表达式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /^(19[2-9]\d{1})|(20((0[0-9])|(1[0-8])))$/;
//输出 false
console.log(pattern.test(&quot;1916&quot;));
//输出 true
console.log(pattern.test(&quot;2008&quot;));
//输出 false
console.log(pattern.test(&quot;2022&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^(19[2-9]\d{1})|(20((0[0-9])|(1[0-8])))$/</span>;
<span class="hljs-comment">//输出 false</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"1916"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2008"</span>));
<span class="hljs-comment">//输出 false</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2022"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/51" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader2">2 月份正则</h2>
<p>首先给出月份正则表达式的规则定义：</p>
<ul>
<li>月份可以是1-12</li>
<li>月份如果是1-9，则前面可加0</li>
</ul>
<p>根据以上规则，给出如下正则及简单测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /^((0?[1-9])|(1[0-2]))$/;
//输出 false
console.log(pattern.test(&quot;19&quot;));
//输出 true
console.log(pattern.test(&quot;02&quot;));
//输出 true
console.log(pattern.test(&quot;2&quot;));
//输出 true
console.log(pattern.test(&quot;11&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^((0?[1-9])|(1[0-2]))$/</span>;
<span class="hljs-comment">//输出 false</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"19"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"02"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"11"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/52" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader3">3 日期正则</h2>
<p>首先给出日期正则表达式的规则定义：</p>
<ul>
<li>日期可以是1-31</li>
<li>如果日期是1-9，则前面可加0</li>
</ul>
<p>根据以上规则，给出如下正则及简单测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /^((0?[1-9])|([1-2][0-9])|30|31)$/;
//输出 false
console.log(pattern.test(&quot;32&quot;));
//输出 true
console.log(pattern.test(&quot;02&quot;));
//输出 true
console.log(pattern.test(&quot;2&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^((0?[1-9])|([1-2][0-9])|30|31)$/</span>;
<span class="hljs-comment">//输出 false</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"32"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"02"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/53" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader4">4 组合校验</h2>
<p>根据上述的年份正则，月份正则，日期正则组合形成出生日期的正则表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pattern = /^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/;
//输出 true
console.log(pattern.test(&quot;1923-3-18&quot;));
//输出 true
console.log(pattern.test(&quot;1923-4-31&quot;));
//输出 true
console.log(pattern.test(&quot;1923-2-29&quot;));
//输出 true
console.log(pattern.test(&quot;2016-2-29&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^((19[2-9]\d{1})|(20((0[0-9])|(1[0-8]))))\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2][0-9])|30|31)$/</span>;
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"1923-3-18"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"1923-4-31"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"1923-2-29"</span>));
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(pattern.test(<span class="hljs-string">"2016-2-29"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/54" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>从以上测试结果可以看出，上述正则验证还不完善，主要是2，4，6，9，11月份的天数问题。</p>
<h2 id="articleHeader5">5 完善</h2>
<p>根据第4步的问题，增加限定规则如下：</p>
<ul>
<li>4，6，9，11月没有31日</li>
<li>2月平年是28天</li>
<li>2月闰年是29天</li>
</ul>
<p>平年闰年判定：</p>
<p>能被4整除的年份是闰年，不能被4整除的年份是平年。但是如果是整百年，就只有能被400整除才是闰年，否则就是平年。</p>
<p>根据新增规则及说明，给出下面正则函数及测试：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkBirth = function (val) {
    var pattern = /^((?:19[2-9]\d{1})|(?:20[01][0-8]))\-((?:0?[1-9])|(?:1[0-2]))\-((?:0?[1-9])|(?:[1-2][0-9])|30|31)$/;
    var result = val.match(pattern);
    if(result != null) {
        var iYear = parseInt(result[1]);
        var month = result[2];
        var date = result[3];
        if(/^((0?[469])|11)$/.test(month) &amp;&amp;　date == '31') {
            return false;
        } else if(parseInt(month)  == 2){
            if((iYear % 4 ==0 &amp;&amp; iYear % 100 != 0) || (iYear % 400 == 0)) {
                if(date == '29') {
                    return true;
                }
            }
            if(parseInt(date) > 28) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//输出 true
console.log(checkBirth(&quot;1923-3-18&quot;));
//输出 false 4月份没有31日
console.log(checkBirth(&quot;1923-4-31&quot;));
//输出 false  平年
console.log(checkBirth(&quot;1923-2-29&quot;));
//输出 true  闰年
console.log(checkBirth(&quot;2016-2-29&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkBirth = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^((?:19[2-9]\d{1})|(?:20[01][0-8]))\-((?:0?[1-9])|(?:1[0-2]))\-((?:0?[1-9])|(?:[1-2][0-9])|30|31)$/</span>;
    <span class="hljs-keyword">var</span> result = val.match(pattern);
    <span class="hljs-keyword">if</span>(result != <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">var</span> iYear = <span class="hljs-built_in">parseInt</span>(result[<span class="hljs-number">1</span>]);
        <span class="hljs-keyword">var</span> month = result[<span class="hljs-number">2</span>];
        <span class="hljs-keyword">var</span> date = result[<span class="hljs-number">3</span>];
        <span class="hljs-keyword">if</span>(<span class="hljs-regexp">/^((0?[469])|11)$/</span>.test(month) &amp;&amp;　date == <span class="hljs-string">'31'</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">parseInt</span>(month)  == <span class="hljs-number">2</span>){
            <span class="hljs-keyword">if</span>((iYear % <span class="hljs-number">4</span> ==<span class="hljs-number">0</span> &amp;&amp; iYear % <span class="hljs-number">100</span> != <span class="hljs-number">0</span>) || (iYear % <span class="hljs-number">400</span> == <span class="hljs-number">0</span>)) {
                <span class="hljs-keyword">if</span>(date == <span class="hljs-string">'29'</span>) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
                }
            }
            <span class="hljs-keyword">if</span>(<span class="hljs-built_in">parseInt</span>(date) &gt; <span class="hljs-number">28</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(checkBirth(<span class="hljs-string">"1923-3-18"</span>));
<span class="hljs-comment">//输出 false 4月份没有31日</span>
<span class="hljs-built_in">console</span>.log(checkBirth(<span class="hljs-string">"1923-4-31"</span>));
<span class="hljs-comment">//输出 false  平年</span>
<span class="hljs-built_in">console</span>.log(checkBirth(<span class="hljs-string">"1923-2-29"</span>));
<span class="hljs-comment">//输出 true  闰年</span>
<span class="hljs-built_in">console</span>.log(checkBirth(<span class="hljs-string">"2016-2-29"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/55" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>上述正则表达式中利用了String的match()方法，该方法唯一参数是一个正则表达式，返回的是一个由匹配结果组成的数组。数组的第一个元素就是匹配的字符串，余下的元素则是正则表达式中用圆括号括起来的子表达式。而<code>(:?...)</code>这种形式多次出现，该种方式表示只是把项组合到一个单元，但不记忆与该组相匹配的字符。利用该种方法按照正则匹配的顺序分别取出了年月日项，以便后序比较。</p>
<p>根据上述分析与测试，我们不但实现了年月日的正则的一般判定，还实现了日期范围及2，4，6，9，11月等特殊月份天数的处理，测验结果达到了我们设定的目标。</p>
<h2 id="articleHeader6">6 总结</h2>
<p>上述分析和讲解，只是为了讲述正则表达式而已，因此上述代码并不适用于产品环境。其中比较突出的问题在于对正则表达式的滥用，正则的强大体现在对模式的灵活匹配，但是在日期比较和校验方面不如用 <code>Date()</code> 更直接和简捷。上述  <code>checkBirth()</code> 臃肿而复杂，测试及维护成本都很高。</p>
<p>因此建议将上述函数变更如下：</p>
<ul>
<li>正则只做基本的格式判定</li>
<li>
<code>Date()</code> 做日期范围的判定</li>
<li>
<code>Date()</code> 做月份相应天数的校验</li>
</ul>
<p>变更后的函数和演示代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkBirth = function (val) {
    var pattern = /^(19|20)\d{2}\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2]\d)|3[01])$/;
    if(pattern.test(val)) {
        var date = new Date(val);
        if(date < new Date(&quot;1919-12-31&quot;) || date > new Date()) {
            return false;
        }
        var month = val.substring(val.indexOf(&quot;-&quot;)+1,val.lastIndexOf(&quot;-&quot;));
        return date &amp;&amp; (date.getMonth()+1 == parseInt(month));
    }
    return false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkBirth = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^(19|20)\d{2}\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2]\d)|3[01])$/</span>;
    <span class="hljs-keyword">if</span>(pattern.test(val)) {
        <span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(val);
        <span class="hljs-keyword">if</span>(date &lt; <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"1919-12-31"</span>) || date &gt; <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        <span class="hljs-keyword">var</span> month = val.substring(val.indexOf(<span class="hljs-string">"-"</span>)+<span class="hljs-number">1</span>,val.lastIndexOf(<span class="hljs-string">"-"</span>));
        <span class="hljs-keyword">return</span> date &amp;&amp; (date.getMonth()+<span class="hljs-number">1</span> == <span class="hljs-built_in">parseInt</span>(month));
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre>
<p><a href="http://www.42du.cn/run/56" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>上述代码，分工明确，逻辑简单， 较前一版有了较大地提升。</p>
<p>综上所述，正则表达式是强大的，但并不是万能的，因此不要过份地依赖和滥用正则。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【从0到1】分步实现一个出生日期的正则表达式(JavaScript)

## 原文链接
[https://segmentfault.com/a/1190000013898447](https://segmentfault.com/a/1190000013898447)

