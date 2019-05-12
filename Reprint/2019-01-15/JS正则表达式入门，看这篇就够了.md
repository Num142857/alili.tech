---
title: 'JS正则表达式入门，看这篇就够了' 
date: 2019-01-15 2:30:12
hidden: true
slug: ai4fjy26e6
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0"><strong>前言</strong></h3>
<p>在正文开始前，先说说正则表达式是什么，为什么要用正则表达式？正则表达式在我个人看来就是一个浏览器可以识别的规则，有了这个规则，浏览器就可以帮我们判断某些字符是否符合我们的要求。但是，我们为什么要使用正则表达式呢？下面我们就看一下下面这个业务场景。</p>
<h5><strong>验证QQ号的合法性</strong></h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
*合法qq号规则：1、5-15位；2、全是数字；3、不以0开头
*/

//1.在不使用正则表达式的时候，我们可能会这样判断QQ号的合法性
var qq=&quot;6666666a6666&quot;;         
if(qq.length>=5&amp;&amp;qq.length<=15&amp;&amp;!isNaN(qq)&amp;&amp;qq.charCodeAt(0)!=48){
        alert(&quot;QQ合法&quot;);
    }else{
        alert(&quot;QQ不合法&quot;)
    }
    
//2.使用正则表达式
    var qq=&quot;066336&quot;;
    var reg=/^[1-9][0-9]{4,14}$/;
    if(reg.test(qq)){
        alert(&quot;QQ合法&quot;);
    }else{
        alert(&quot;QQ不合法&quot;);
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">/**
*合法qq号规则：1、5-15位；2、全是数字；3、不以0开头
*/</span>

<span class="hljs-comment">//1.在不使用正则表达式的时候，我们可能会这样判断QQ号的合法性</span>
var qq=<span class="hljs-string">"6666666a6666"</span>;         
if(qq.length&gt;=<span class="hljs-number">5</span>&amp;&amp;qq.length&lt;=<span class="hljs-number">15</span>&amp;&amp;!isNaN(qq)&amp;&amp;qq.charCodeAt(<span class="hljs-number">0</span>)!=<span class="hljs-number">48</span>){
        alert(<span class="hljs-string">"QQ合法"</span>);
    }else{
        alert(<span class="hljs-string">"QQ不合法"</span>)
    }
    
<span class="hljs-comment">//2.使用正则表达式</span>
    var qq=<span class="hljs-string">"066336"</span>;
    var reg=/^[<span class="hljs-number">1</span><span class="hljs-number">-9</span>][<span class="hljs-number">0</span><span class="hljs-number">-9</span>]{<span class="hljs-number">4</span>,<span class="hljs-number">14</span>}$/;
    if(reg.test(qq)){
        alert(<span class="hljs-string">"QQ合法"</span>);
    }else{
        alert(<span class="hljs-string">"QQ不合法"</span>);
    }
</code></pre>
<p>从上面这个例子可以看出来使用了正则表达式的时候，我们的代码量变少了，而且比较直观。如果遇到非常的复杂的匹配，正则表达式的优势就更加明显了。</p>
<h3 id="articleHeader1"><strong>使用方法</strong></h3>
<p>接着上面，我想先说说JS正则表达式是如何使用的。非常简单，只有两步而已。</p>
<h4><strong>第一步：定义一个正则表达式</strong></h4>
<p>定义正则表达式有两种方法，第一种通过"/正则表达式/修饰符"这种形式直接写出来，第二种通过“new RegExp('正则表达式'，'修饰符)'”创建一个RegExp对象。其中修饰符为可选项，有三个取值<em>g：全局匹配；i：不区分大小写；m：多行匹配</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第一种“/正则表达式/”
    var reg1=/hello \w{3,12}/g;
//第二种new RegExp('正则表达式')
    var reg2=new RegExp(&quot;hello \\w{3,12}&quot;,'g');
    
/**
*这里需要注意的是,第二种方法中由于字符串转义问题，&quot;\\&quot;代表&quot;\&quot;。
*/   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//第一种“/正则表达式/”</span>
    <span class="hljs-keyword">var</span> reg1=<span class="hljs-regexp">/hello \w{3,12}/g</span>;
<span class="hljs-comment">//第二种new RegExp('正则表达式')</span>
    <span class="hljs-keyword">var</span> reg2=<span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">"hello \\w{3,12}"</span>,<span class="hljs-string">'g'</span>);
    
<span class="hljs-comment">/**
*这里需要注意的是,第二种方法中由于字符串转义问题，"\\"代表"\"。
*/</span>   </code></pre>
<p>上面这个定义方法，其实还有一个可选参数（修饰符），这里我们先不深入探究，后面我们再细说。</p>
<p>说到RegExp对象，下面要说一下RegExp对象自带的属性，并不复杂，这里我就列一下，不展开说了。</p>
<table>
<thead><tr>
<th>属性</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td>global</td>
<td align="left">RegExp 对象是否具有标志 g。</td>
</tr>
<tr>
<td>ignoreCase</td>
<td align="left">RegExp 对象是否具有标志 i。</td>
</tr>
<tr>
<td>lastIndex</td>
<td align="left">一个整数，标示开始下一次匹配的字符位置。</td>
</tr>
<tr>
<td>multiline</td>
<td align="left">RegExp 对象是否具有标志 m。</td>
</tr>
<tr>
<td>source</td>
<td align="left">正则表达式的源文本。</td>
</tr>
</tbody>
</table>
<h4><strong>第二步：调用RegExp对象中的方法</strong></h4>
<p>RegExp对象给我们提供了三种方法供我们使用，分别是test()、exec()和compile()。下面具体说一下这三个方法的用处。</p>
<h4><strong>1.test()</strong></h4>
<p>检索字符串中指定的值。返回 true 或 false。这个是我们平时最常用的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var reg=/hello \w{3,12}/;
 alert(reg.test('hello js'));//false
 alert(reg.test('hello javascript'));//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code> <span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span>=/hello \w{3,12}/;
 alert(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('hello js'));<span class="hljs-comment">//false</span>
 alert(<span class="hljs-keyword">reg</span>.<span class="hljs-keyword">test</span>('hello javascript'));<span class="hljs-comment">//true</span></code></pre>
<h4><strong>2.exec()</strong></h4>
<p>检索字符串中指定的值。匹配成功返回一个数组，匹配失败返回null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg=/hello/;
console.log(reg.exec('hellojs'));//['hello']
console.log(reg.exec('javascript'));//null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg=<span class="hljs-regexp">/hello/</span>;
<span class="hljs-built_in">console</span>.log(reg.exec(<span class="hljs-string">'hellojs'</span>));<span class="hljs-comment">//['hello']</span>
<span class="hljs-built_in">console</span>.log(reg.exec(<span class="hljs-string">'javascript'</span>));<span class="hljs-comment">//null</span></code></pre>
<h4><strong>3.compile()</strong></h4>
<p>compile() 方法用于改变 RegExp。<br>compile() 既可以改变检索模式，也可以添加或删除第二个参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var reg=/hello/;
console.log(reg.exec('hellojs'));//['hello']
reg.compile('Hello');
console.log(reg.exec('hellojs'));//null
reg.compile('Hello','i');
console.log(reg.exec('hellojs'));//['hello']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>
var reg=/hello/;
console.<span class="hljs-built_in">log</span>(reg.<span class="hljs-built_in">exec</span>(<span class="hljs-string">'hellojs'</span>));<span class="hljs-comment">//['hello']</span>
reg.<span class="hljs-built_in">compile</span>(<span class="hljs-string">'Hello'</span>);
console.<span class="hljs-built_in">log</span>(reg.<span class="hljs-built_in">exec</span>(<span class="hljs-string">'hellojs'</span>));<span class="hljs-comment">//null</span>
reg.<span class="hljs-built_in">compile</span>(<span class="hljs-string">'Hello'</span>,<span class="hljs-string">'i'</span>);
console.<span class="hljs-built_in">log</span>(reg.<span class="hljs-built_in">exec</span>(<span class="hljs-string">'hellojs'</span>));<span class="hljs-comment">//['hello']</span></code></pre>
<h3 id="articleHeader2"><strong>如何写一个正则表达式</strong></h3>
<p>第一次接触正则表达式同学们，可能被这个正则表达式的规则弄得迷迷糊糊的，根本无从下手。小编我第一次学这个正则表达式的时候，也是稀里糊涂，什么元字符、量词完全不知道什么东西，云里雾里的。后面小编细细研究了一下，总结一套方法，希望可以帮助大家。</p>
<p>关于正则表达式书写规则，可查看<a href="http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp" rel="nofollow noreferrer" target="_blank">w3school</a>，上面说的很清楚了，我就不贴出来了。我就阐述一下我写正则表达式的思路。</p>
<p>其实正则表达式都可以拆成一个或多个（取值范围+量词）这样的组合。针对每个组合我们根据JS正则表达式的规则翻译一遍，然后将每个组合重新拼接一下就好了。下面我们举个例子来试一下，看看这个方法行不行。</p>
<h4><strong>验证QQ号的合法性</strong></h4>
<p>合法qq号规则：1、5-15位；2、全是数字；3、不以0开头</p>
<h5><strong>第一步：拆成（取值范围+量词）这样的组合</strong></h5>
<p>根据QQ号的验证规则，我们可以拆成两个（取值范围+量词）的组合。分别是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.（1~9的数字，1个）；2.（0~9的数字，4~14个）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>（<span class="hljs-number">1</span>~<span class="hljs-number">9</span>的数字，<span class="hljs-number">1</span>个）；<span class="hljs-number">2.</span>（<span class="hljs-number">0</span>~<span class="hljs-number">9</span>的数字，<span class="hljs-number">4</span>~<span class="hljs-number">14</span>个）
</code></pre>
<h5><strong>第二步：根据正则表达式规则翻译（取值范围+量词）</strong></h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.（1~9的数字，1个）     =>   [1-9]{1}或者[1-9]
2.（0~9的数字，4~14个）  =>   [0-9]{4,14}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>（<span class="hljs-number">1</span>~<span class="hljs-number">9</span>的数字，<span class="hljs-number">1</span>个）     =&gt;   [<span class="hljs-number">1</span><span class="hljs-number">-9</span>]{<span class="hljs-number">1</span>}或者[<span class="hljs-number">1</span><span class="hljs-number">-9</span>]
<span class="hljs-number">2.</span>（<span class="hljs-number">0</span>~<span class="hljs-number">9</span>的数字，<span class="hljs-number">4</span>~<span class="hljs-number">14</span>个）  =&gt;   [<span class="hljs-number">0</span><span class="hljs-number">-9</span>]{<span class="hljs-number">4</span>,<span class="hljs-number">14</span>}
</code></pre>
<h5><strong>第三步：将翻译好的（取值范围+量词）组合进行拼接</strong></h5>
<p>初学者可能在拼接这一步会犯一个错误，可能会组合拼接成这个样子<strong>/[1-9]{1}[0-9]{4,14}/</strong>或者简写翻译成<strong>/[1-9]    [0-9]{4,14}/</strong>这些都不对的。调用test()方法的时候，你会发现只要一段字符串中有符合正则表达式的字符串片段都会返回true，童鞋们可以试一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg=/[1-9][0-9]{4,14}/;
alert(reg.test('0589563'));
//true，虽然有0，但是'589563'片段符合
alert(reg.test('168876726736788999'));
//true,这个字符串长度超出15位，达到18位，但是有符合的字符串片段" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>var reg=/[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{4,14}/;
alert(reg.test('0589563'));
//true，虽然有0，但是'589563'片段符合
alert(reg.test('168876726736788999'));
//true,这个字符串长度超出15位，达到18位，但是有符合的字符串片段</code></pre>
<p>正确的写法应该是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/^[1-9][0-9]{4,14}$/（用^和$指定起止位置）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>/^[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{4,14}$/（用^和$指定起止位置）
</code></pre>
<p>下面我们看一个复杂点的例子：</p>
<h4><strong>验证国内电话号码</strong></h4>
<p>0555-6581752、021-86128488</p>
<h5><strong>第一步：拆成（取值范围+量词）这样的组合</strong></h5>
<p>这里会拆成两个大组合：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、（数字0，1个）+（数字0~9，3个）+(&quot;-&quot;，1个)+（数字1~9，1个）+（数0~9，6个）
2、（数字0，1个）+（数字0~9，2个）+(&quot;-&quot;，1个)+（数字1~9，1个）+（数0~9，7个）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、（数字<span class="hljs-number">0</span>，<span class="hljs-number">1</span>个）+（数字<span class="hljs-number">0</span>~<span class="hljs-number">9</span>，<span class="hljs-number">3</span>个）+(<span class="hljs-string">"-"</span>，<span class="hljs-number">1</span>个)+（数字<span class="hljs-number">1</span>~<span class="hljs-number">9</span>，<span class="hljs-number">1</span>个）+（数<span class="hljs-number">0</span>~<span class="hljs-number">9</span>，<span class="hljs-number">6</span>个）
<span class="hljs-number">2</span>、（数字<span class="hljs-number">0</span>，<span class="hljs-number">1</span>个）+（数字<span class="hljs-number">0</span>~<span class="hljs-number">9</span>，<span class="hljs-number">2</span>个）+(<span class="hljs-string">"-"</span>，<span class="hljs-number">1</span>个)+（数字<span class="hljs-number">1</span>~<span class="hljs-number">9</span>，<span class="hljs-number">1</span>个）+（数<span class="hljs-number">0</span>~<span class="hljs-number">9</span>，<span class="hljs-number">7</span>个）
</code></pre>
<h5><strong>第二步：根据正则表达式规则翻译（取值范围+量词）</strong></h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、([0-0],{1})+([0-9],{3})+&quot;-&quot;+([1,9],{1})+([0,9],{6})
2、([0-0],{1})+([0-9],{2})+&quot;-&quot;+([1,9],{1})+([0,9],{7})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1</span>、([<span class="hljs-number">0</span><span class="hljs-number">-0</span>],{<span class="hljs-number">1</span>})+([<span class="hljs-number">0</span><span class="hljs-number">-9</span>],{<span class="hljs-number">3</span>})+<span class="hljs-string">"-"</span>+([<span class="hljs-number">1</span>,<span class="hljs-number">9</span>],{<span class="hljs-number">1</span>})+([<span class="hljs-number">0</span>,<span class="hljs-number">9</span>],{<span class="hljs-number">6</span>})
<span class="hljs-number">2</span>、([<span class="hljs-number">0</span><span class="hljs-number">-0</span>],{<span class="hljs-number">1</span>})+([<span class="hljs-number">0</span><span class="hljs-number">-9</span>],{<span class="hljs-number">2</span>})+<span class="hljs-string">"-"</span>+([<span class="hljs-number">1</span>,<span class="hljs-number">9</span>],{<span class="hljs-number">1</span>})+([<span class="hljs-number">0</span>,<span class="hljs-number">9</span>],{<span class="hljs-number">7</span>})
</code></pre>
<h5><strong>第三步：将翻译好的（取值范围+量词）组合进行拼接</strong></h5>
<p>这里我们先拼接一个大组合，然后再将大组合拼接起来</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、0[0-9]{3}-[1-9][0-9]{6}
2、0[0-9]{2}-[1-9][0-9]{7}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>1、0[<span class="hljs-string">0-9</span>]{3}-[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{6}
2、0[<span class="hljs-string">0-9</span>]{2}-[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{7}
</code></pre>
<p>最后拼接为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/(^0[0-9]{3}-[1-9][0-9]{6}$)|(^0[0-9]{2}-[1-9][0-9]{7}$)/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">/(^0[<span class="hljs-string">0-9</span>]{3}-[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{6}$)|(^0[<span class="hljs-string">0-9</span>]{2}-[<span class="hljs-string">1-9</span>][<span class="hljs-symbol">0-9</span>]{7}$)/</code></pre>
<h3 id="articleHeader3"><strong>正则表达式拓展</strong></h3>
<p>除了RegExp对象提供方法之外，String对象也提供了四个方法来使用正则表达式。</p>
<h4><strong>1.match()</strong></h4>
<p>在字符串内检索指定的值,匹配成功返回存放匹配结果的数组，否则返回null。这里需要注意的一点事，如果没有设置全局匹配g，返回的数组只存第一个成功匹配的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var reg1=/javascript/i;
var reg2=/javascript/ig;
console.log('hello Javascript Javascript Javascript'.match(reg1));
//['Javascript']
console.log('hello Javascript Javascript Javascript'.match(reg2));
//['Javascript','Javascript','Javascript']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>
var reg1=<span class="hljs-regexp">/javascript/i</span>;
var reg2=<span class="hljs-regexp">/javascript/ig</span>;
console.log(<span class="hljs-string">'hello Javascript Javascript Javascript'</span>.match(reg1));
<span class="hljs-regexp">//</span>[<span class="hljs-string">'Javascript'</span>]
console.log(<span class="hljs-string">'hello Javascript Javascript Javascript'</span>.match(reg2));
<span class="hljs-regexp">//</span>[<span class="hljs-string">'Javascript'</span>,<span class="hljs-string">'Javascript'</span>,<span class="hljs-string">'Javascript'</span>]</code></pre>
<h4><strong>2.search()</strong></h4>
<p>在字符串内检索指定的值,匹配成功返回第一个匹配成功的字符串片段开始的位置，否则返回-1。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg=/javascript/i;
console.log('hello Javascript Javascript Javascript'.search(reg));//6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">reg</span>=/javascript/i;
console.<span class="hljs-built_in">log</span>('hello Javascript Javascript Javascript'.<span class="hljs-keyword">search</span>(<span class="hljs-keyword">reg</span>));<span class="hljs-comment">//6</span></code></pre>
<h4><strong>3.replace()</strong></h4>
<p>替换与正则表达式匹配的子串，并返回替换后的字符串。在不设置全局匹配g的时候，只替换第一个匹配成功的字符串片段。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg1=/javascript/i;
var reg2=/javascript/ig;
console.log('hello Javascript Javascript Javascript'.replace(reg1,'js'));
//hello js Javascript Javascript
console.log('hello Javascript Javascript Javascript'.replace(reg2,'js'));
//hello js js js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> reg1=<span class="hljs-regexp">/javascript/i</span>;
<span class="hljs-keyword">var</span> reg2=<span class="hljs-regexp">/javascript/ig</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello Javascript Javascript Javascript'</span>.replace(reg1,<span class="hljs-string">'js'</span>));
<span class="hljs-comment">//hello js Javascript Javascript</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'hello Javascript Javascript Javascript'</span>.replace(reg2,<span class="hljs-string">'js'</span>));
<span class="hljs-comment">//hello js js js</span></code></pre>
<h4><strong>4.split()</strong></h4>
<p>把一个字符串分割成字符串数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var reg=/1[2,3]8/;
console.log('hello128Javascript138Javascript178Javascript'.split(reg));
//['hello','Javascript','Javascript178Javascript']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var reg=<span class="hljs-regexp">/1[2,3]8/</span>;
console.log(<span class="hljs-string">'hello128Javascript138Javascript178Javascript'</span>.split(reg));
<span class="hljs-regexp">//</span>[<span class="hljs-string">'hello'</span>,<span class="hljs-string">'Javascript'</span>,<span class="hljs-string">'Javascript178Javascript'</span>]</code></pre>
<h3 id="articleHeader4"><strong>结语</strong></h3>
<p>正则表达式并不难，懂了其中的套路之后，一切都变得简单了。在最后我想说点题外话，网上不乏一些文章记录一些常用的正则表达式，然后新手前端在使用正则表达式的时候都会直接拿来就用。在这里我想说一下自己的看法，这些所谓记录常用的正则表达式文章并非完全都是正确的，有不少都是错的。所以同学们在日后使用的过程尽量自己写正则表达式，实在不会了可以去参考一下，但真的不要照搬下来。咱不说这种会影响自己成长的话，咱就说你抄的一定都是对的吗？多思考一下，总没有坏处。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS正则表达式入门，看这篇就够了

## 原文链接
[https://segmentfault.com/a/1190000009324194](https://segmentfault.com/a/1190000009324194)

