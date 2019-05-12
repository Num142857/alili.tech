---
title: '身份证号码的正则表达式及验证详解(JavaScript，Regex)' 
date: 2018-12-10 2:30:07
hidden: true
slug: xiln5n2cuk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>在做用户实名验证时，常会用到身份证号码的正则表达式及校验方案。本文列举了两种验证方案，大家可以根据自己的项目实际情况，选择适合的方案。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013737963?w=790&amp;h=177" src="https://static.alili.tech/img/remote/1460000013737963?w=790&amp;h=177" alt="idcard-check" title="idcard-check" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">身份证号码说明</h2>
<p>居民身份证号码，正确、正式的称谓应该是“公民身份号码”。根据【中华人民共和国国家标准 GB 11643-1999】中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。</p>
<p>以北京市朝阳区一女性身份证号码为例，身份证号码所表示的含义如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013737964?w=690&amp;h=230" src="https://static.alili.tech/img/remote/1460000013737964?w=690&amp;h=230" alt="身份证号码含义解析" title="身份证号码含义解析" style="cursor: pointer;"></span></p>
<p>注：该身份证号码来源于国标【GB 11643-1999】。</p>
<p>下面我们就从零开始完成一个完整的身份证号码校验过程。</p>
<h2 id="articleHeader2">方案1 （简单）</h2>
<h3 id="articleHeader3">1.1 分部规则</h3>
<p>我们首先提出方案1，并分步做如下规则定义：</p>
<h4>1.1.1 地址码规则：</h4>
<ul>
<li>地址码长6位</li>
<li>以数字1-9开头</li>
<li>后5位为0-9的数字</li>
</ul>
<p>根据以上规则，写出地址码的正则表达式： <code>/^[1-9]\d{5}/</code></p>
<h4>1.1.2 年份码规则：</h4>
<ul>
<li>年份码长4位</li>
<li>以数字18，19或20开头</li>
<li>剩余两位为0-9的数字</li>
</ul>
<p>根据以上规则，写出年份码的正则表达式： <code>/(18|19|20)\d{2}/</code>。如果不需要18开头的年份，可以去掉18。</p>
<h4>1.1.3 月份码规则：</h4>
<ul>
<li>月份码长2位</li>
<li>第一位数字为0，第二位数字为1-9</li>
<li>或者第一位数字为1，第二位数字为0-2</li>
</ul>
<p>根据以上规则，写出月份码的正则表达式： <code>/((0[1-9])|(1[0-2]))/</code>。</p>
<h4>1.1.4 日期码规则：</h4>
<ul>
<li>日期码长2位</li>
<li>第一位数字为0-2，第二位数字为1-9</li>
<li>或者是10，20，30，31</li>
</ul>
<p>根据以上规则，写出日期码的正则表达式 ：<code>/(([0-2][1-9])|10|20|30|31)/</code>。</p>
<h4>1.1.5 顺序码规则：</h4>
<ul>
<li>顺序码长3位</li>
<li>顺序码是数字</li>
</ul>
<p>根据以上规则，写出顺序码的正则表达式 ：<code>/\d{3}/</code>。</p>
<h4>1.1.6 校验码规则：</h4>
<ul>
<li>校验码长1位</li>
<li>可以是数字，字母x或字母X</li>
</ul>
<p>根据以上规则，写出校验码的正则表达式 ：<code>/[0-9Xx]/</code>。</p>
<h3 id="articleHeader4">1.2 方案1正则表达式</h3>
<p>综合以上6条规则，给出完整的正则表达式及测试程序如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
//输出 true
console.log(p.test(&quot;11010519491231002X&quot;));
//输出 false 不能以0开头
console.log(p.test(&quot;01010519491231002X&quot;));
//输出 false 年份不能以17开头
console.log(p.test(&quot;11010517491231002X&quot;));
//输出 false 月份不能为13
console.log(p.test(&quot;11010519491331002X&quot;));
//输出 false 日期不能为32
console.log(p.test(&quot;11010519491232002X&quot;));
//输出 false 不能以a结尾
console.log(p.test(&quot;11010519491232002a&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> p = <span class="hljs-regexp">/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/</span>;
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"11010519491231002X"</span>));
<span class="hljs-comment">//输出 false 不能以0开头</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"01010519491231002X"</span>));
<span class="hljs-comment">//输出 false 年份不能以17开头</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"11010517491231002X"</span>));
<span class="hljs-comment">//输出 false 月份不能为13</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"11010519491331002X"</span>));
<span class="hljs-comment">//输出 false 日期不能为32</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"11010519491232002X"</span>));
<span class="hljs-comment">//输出 false 不能以a结尾</span>
<span class="hljs-built_in">console</span>.log(p.test(<span class="hljs-string">"11010519491232002a"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/43" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader5">1.3 方案1分析</h3>
<p>方案1只是做了基本的格式判定，存在三个主要的不足：</p>
<ul>
<li>地址码判定不够精确。例：我国并不存在16，26开头的地区，却可通过验证</li>
<li>日期判定不够精确。例:19490231也可通过验证，而2月并不存在31日</li>
<li>校验码是由17位本体码计算得出，方案1并未校验此码</li>
</ul>
<h2 id="articleHeader6">方案2 （全面）</h2>
<p>根据方案1的不足，引入方案2进而改进方案1的不足。</p>
<h3 id="articleHeader7">2.1 省级地址码校验</h3>
<p>华北：北京11，天津12，河北13，山西14，内蒙古15</p>
<p>东北： 辽宁21，吉林22，黑龙江23</p>
<p>华东： 上海31，江苏32，浙江33，安徽34，福建35，江西36，山东37</p>
<p>华中： 河南41，湖北42，湖南43</p>
<p>华南： 广东44，广西45，海南46</p>
<p>西南： 四川51，贵州52，云南53，西藏54，重庆50</p>
<p>西北： 陕西61，甘肃62，青海63，宁夏64，新疆65</p>
<p>特别：台湾71，香港81，澳门82</p>
<p>根据上述地址码做身份证号码的前两位校验，进一步的提高准确率。当前的地址码以2013版的行政区划代码【GB/T2260】为标准。由于区划代码的历史演变，使得地址码后四位校验变得不太可能。以三胖的身份证号为例，本人号码是2321开头，而当前行政区划代码表中并无此代码。因此本文只做前两位省级地址码的校验。</p>
<p>也有说法表述91开头是外国人取得中国身份证号码的前两位编码，但本人并未得到证实。如有持91开头身份证或认识马布里的，请帮忙确认相关信息。</p>
<h4>根据以上分析，给出省级地址码校验及测试程序如下：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkProv = function (val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {11:&quot;北京&quot;,12:&quot;天津&quot;,13:&quot;河北&quot;,14:&quot;山西&quot;,15:&quot;内蒙古&quot;,21:&quot;辽宁&quot;,22:&quot;吉林&quot;,23:&quot;黑龙江 &quot;,31:&quot;上海&quot;,32:&quot;江苏&quot;,33:&quot;浙江&quot;,34:&quot;安徽&quot;,35:&quot;福建&quot;,36:&quot;江西&quot;,37:&quot;山东&quot;,41:&quot;河南&quot;,42:&quot;湖北 &quot;,43:&quot;湖南&quot;,44:&quot;广东&quot;,45:&quot;广西&quot;,46:&quot;海南&quot;,50:&quot;重庆&quot;,51:&quot;四川&quot;,52:&quot;贵州&quot;,53:&quot;云南&quot;,54:&quot;西藏 &quot;,61:&quot;陕西&quot;,62:&quot;甘肃&quot;,63:&quot;青海&quot;,64:&quot;宁夏&quot;,65:&quot;新疆&quot;,71:&quot;台湾&quot;,81:&quot;香港&quot;,82:&quot;澳门&quot;};
    if(pattern.test(val)) {
        if(provs[val]) {
            return true;
        }
    }
    return false;
}
//输出 true，37是山东
console.log(checkProv(37));
//输出 false，16不存在
console.log(checkProv(16));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkProv = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^[1-9][0-9]/</span>;
    <span class="hljs-keyword">var</span> provs = {<span class="hljs-number">11</span>:<span class="hljs-string">"北京"</span>,<span class="hljs-number">12</span>:<span class="hljs-string">"天津"</span>,<span class="hljs-number">13</span>:<span class="hljs-string">"河北"</span>,<span class="hljs-number">14</span>:<span class="hljs-string">"山西"</span>,<span class="hljs-number">15</span>:<span class="hljs-string">"内蒙古"</span>,<span class="hljs-number">21</span>:<span class="hljs-string">"辽宁"</span>,<span class="hljs-number">22</span>:<span class="hljs-string">"吉林"</span>,<span class="hljs-number">23</span>:<span class="hljs-string">"黑龙江 "</span>,<span class="hljs-number">31</span>:<span class="hljs-string">"上海"</span>,<span class="hljs-number">32</span>:<span class="hljs-string">"江苏"</span>,<span class="hljs-number">33</span>:<span class="hljs-string">"浙江"</span>,<span class="hljs-number">34</span>:<span class="hljs-string">"安徽"</span>,<span class="hljs-number">35</span>:<span class="hljs-string">"福建"</span>,<span class="hljs-number">36</span>:<span class="hljs-string">"江西"</span>,<span class="hljs-number">37</span>:<span class="hljs-string">"山东"</span>,<span class="hljs-number">41</span>:<span class="hljs-string">"河南"</span>,<span class="hljs-number">42</span>:<span class="hljs-string">"湖北 "</span>,<span class="hljs-number">43</span>:<span class="hljs-string">"湖南"</span>,<span class="hljs-number">44</span>:<span class="hljs-string">"广东"</span>,<span class="hljs-number">45</span>:<span class="hljs-string">"广西"</span>,<span class="hljs-number">46</span>:<span class="hljs-string">"海南"</span>,<span class="hljs-number">50</span>:<span class="hljs-string">"重庆"</span>,<span class="hljs-number">51</span>:<span class="hljs-string">"四川"</span>,<span class="hljs-number">52</span>:<span class="hljs-string">"贵州"</span>,<span class="hljs-number">53</span>:<span class="hljs-string">"云南"</span>,<span class="hljs-number">54</span>:<span class="hljs-string">"西藏 "</span>,<span class="hljs-number">61</span>:<span class="hljs-string">"陕西"</span>,<span class="hljs-number">62</span>:<span class="hljs-string">"甘肃"</span>,<span class="hljs-number">63</span>:<span class="hljs-string">"青海"</span>,<span class="hljs-number">64</span>:<span class="hljs-string">"宁夏"</span>,<span class="hljs-number">65</span>:<span class="hljs-string">"新疆"</span>,<span class="hljs-number">71</span>:<span class="hljs-string">"台湾"</span>,<span class="hljs-number">81</span>:<span class="hljs-string">"香港"</span>,<span class="hljs-number">82</span>:<span class="hljs-string">"澳门"</span>};
    <span class="hljs-keyword">if</span>(pattern.test(val)) {
        <span class="hljs-keyword">if</span>(provs[val]) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">//输出 true，37是山东</span>
<span class="hljs-built_in">console</span>.log(checkProv(<span class="hljs-number">37</span>));
<span class="hljs-comment">//输出 false，16不存在</span>
<span class="hljs-built_in">console</span>.log(checkProv(<span class="hljs-number">16</span>));</code></pre>
<p><a href="http://www.42du.cn/run/45" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader8">2.2 出生日期码校验</h3>
<h4>出生日期码的校验不做解释，直接给出如下函数及测试程序：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkDate = function (val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if(pattern.test(val)) {
        var year = val.substring(0, 4);
        var month = val.substring(4, 6);
        var date = val.substring(6, 8);
        var date2 = new Date(year+&quot;-&quot;+month+&quot;-&quot;+date);
        if(date2 &amp;&amp; date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
}
//输出 true
console.log(checkDate(&quot;20180212&quot;));
//输出 false 2月没有31日
console.log(checkDate(&quot;20180231&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkDate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">var</span> pattern = <span class="hljs-regexp">/^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/</span>;
    <span class="hljs-keyword">if</span>(pattern.test(val)) {
        <span class="hljs-keyword">var</span> year = val.substring(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>);
        <span class="hljs-keyword">var</span> month = val.substring(<span class="hljs-number">4</span>, <span class="hljs-number">6</span>);
        <span class="hljs-keyword">var</span> date = val.substring(<span class="hljs-number">6</span>, <span class="hljs-number">8</span>);
        <span class="hljs-keyword">var</span> date2 = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(year+<span class="hljs-string">"-"</span>+month+<span class="hljs-string">"-"</span>+date);
        <span class="hljs-keyword">if</span>(date2 &amp;&amp; date2.getMonth() == (<span class="hljs-built_in">parseInt</span>(month) - <span class="hljs-number">1</span>)) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(checkDate(<span class="hljs-string">"20180212"</span>));
<span class="hljs-comment">//输出 false 2月没有31日</span>
<span class="hljs-built_in">console</span>.log(checkDate(<span class="hljs-string">"20180231"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/44" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader9">2.3 校验码校验</h3>
<p>校验码的计算略复杂，先给出如下公式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013737965?w=690&amp;h=95" src="https://static.alili.tech/img/remote/1460000013737965?w=690&amp;h=95" alt="校验码公式" title="校验码公式" style="cursor: pointer;"></span></p>
<p>其中 ai 表示身份证本体码的第 i 位值，而 Wi 表示第 i 位的加权因子值。</p>
<h4>加权因子表 【表1】：</h4>
<table>
<thead><tr>
<th>i</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
</tr></thead>
<tbody>
<tr>
<td>Wi</td>
<td>7</td>
<td>9</td>
<td>10</td>
<td>5</td>
<td>8</td>
<td>4</td>
<td>2</td>
<td>1</td>
</tr>
<tr>
<td>9</td>
<td>10</td>
<td>11</td>
<td>12</td>
<td>13</td>
<td>14</td>
<td>15</td>
<td>16</td>
<td>17</td>
</tr>
<tr>
<td>6</td>
<td>3</td>
<td>7</td>
<td>9</td>
<td>10</td>
<td>5</td>
<td>8</td>
<td>4</td>
<td>2</td>
</tr>
</tbody>
</table>
<h4>X与校验码换算表 【表2】</h4>
<table>
<thead><tr>
<th>X</th>
<th>0</th>
<th>1</th>
<th>2</th>
<th>3</th>
<th>4</th>
<th>5</th>
<th>6</th>
<th>7</th>
<th>8</th>
<th>9</th>
<th>10</th>
</tr></thead>
<tbody><tr>
<td>a18</td>
<td>1</td>
<td>0</td>
<td>X</td>
<td>9</td>
<td>8</td>
<td>7</td>
<td>6</td>
<td>5</td>
<td>4</td>
<td>3</td>
<td>2</td>
</tr></tbody>
</table>
<h4>算法过程：</h4>
<ul>
<li>根据身份证主体码（前17位）分别与对应的加权因子（表1）计算乘积再求和，根据所得结果与11取模得到X值。</li>
<li>根据 X 值查询表2，得出a18即校验码值。</li>
</ul>
<h4>校验码计算程序及测试见如下代码：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkCode = function (val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
    var code = val.substring(17);
    if(p.test(val)) {
        var sum = 0;
        for(var i=0;i<17;i++) {
            sum += val[i]*factor[i];
        }
        if(parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
}
// 输出 true， 校验码相符
console.log(checkCode(&quot;11010519491231002X&quot;));
// 输出 false， 校验码不符
console.log(checkCode(&quot;110105194912310021&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkCode = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">var</span> p = <span class="hljs-regexp">/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/</span>;
    <span class="hljs-keyword">var</span> factor = [ <span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>, <span class="hljs-number">3</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">4</span>, <span class="hljs-number">2</span> ];
    <span class="hljs-keyword">var</span> parity = [ <span class="hljs-number">1</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'X'</span>, <span class="hljs-number">9</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span> ];
    <span class="hljs-keyword">var</span> code = val.substring(<span class="hljs-number">17</span>);
    <span class="hljs-keyword">if</span>(p.test(val)) {
        <span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">17</span>;i++) {
            sum += val[i]*factor[i];
        }
        <span class="hljs-keyword">if</span>(parity[sum % <span class="hljs-number">11</span>] == code.toUpperCase()) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">// 输出 true， 校验码相符</span>
<span class="hljs-built_in">console</span>.log(checkCode(<span class="hljs-string">"11010519491231002X"</span>));
<span class="hljs-comment">// 输出 false， 校验码不符</span>
<span class="hljs-built_in">console</span>.log(checkCode(<span class="hljs-string">"110105194912310021"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/46" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader10">2.4 方案2整体代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkID = function (val) {
    if(checkCode(val)) {
        var date = val.substring(6,14);
        if(checkDate(date)) {
            if(checkProv(val.substring(0,2))) {
                return true;
            }
        }
    }
    return false;
}
//输出 true
console.log(checkID(&quot;11010519491231002X&quot;));
//输出 false，校验码不符
console.log(checkID(&quot;110105194912310021&quot;));
//输出 false，日期码不符
console.log(checkID(&quot;110105194902310026&quot;));
//输出 false，地区码不符
console.log(checkID(&quot;160105194912310029&quot;));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> checkID = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">val</span>) </span>{
    <span class="hljs-keyword">if</span>(checkCode(val)) {
        <span class="hljs-keyword">var</span> date = val.substring(<span class="hljs-number">6</span>,<span class="hljs-number">14</span>);
        <span class="hljs-keyword">if</span>(checkDate(date)) {
            <span class="hljs-keyword">if</span>(checkProv(val.substring(<span class="hljs-number">0</span>,<span class="hljs-number">2</span>))) {
                <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
            }
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}
<span class="hljs-comment">//输出 true</span>
<span class="hljs-built_in">console</span>.log(checkID(<span class="hljs-string">"11010519491231002X"</span>));
<span class="hljs-comment">//输出 false，校验码不符</span>
<span class="hljs-built_in">console</span>.log(checkID(<span class="hljs-string">"110105194912310021"</span>));
<span class="hljs-comment">//输出 false，日期码不符</span>
<span class="hljs-built_in">console</span>.log(checkID(<span class="hljs-string">"110105194902310026"</span>));
<span class="hljs-comment">//输出 false，地区码不符</span>
<span class="hljs-built_in">console</span>.log(checkID(<span class="hljs-string">"160105194912310029"</span>));</code></pre>
<p><a href="http://www.42du.cn/run/47" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<p>以上为三胖对身份证号码验证的理解和分析，如有不足请大家予以指正。</p>
<p>知名物理学家史蒂芬•霍金于2018年3月14日去世，享年76岁。一个博学又有趣的人，一路走好！</p>
<p>世间再无霍金，时间永留简史！</p>
<p><a href="http://www.42du.cn/p/41" rel="nofollow noreferrer" target="_blank">原文地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
身份证号码的正则表达式及验证详解(JavaScript，Regex)

## 原文链接
[https://segmentfault.com/a/1190000013737958](https://segmentfault.com/a/1190000013737958)

