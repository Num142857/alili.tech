---
title: '系统认识JavaScript正则表达式' 
date: 2018-11-29 9:34:56
hidden: true
slug: 4zmag6eg8a8
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/5/21/1637e89815ca5d9c?w=1776&amp;h=1080&amp;f=png&amp;s=151678" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/5/21/1637e89815ca5d9c?w=1776&amp;h=1080&amp;f=png&amp;s=151678" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">版权声明</h2>
<blockquote>
<strong>转载请告知并注明来源作者</strong>  <br><code>作者</code>：<code>唐金健</code>  <br><code>网络昵称</code>：<code>御焱</code>  <br><a href="https://juejin.im/user/5ad0cef9f265da23970749f9/posts" rel="nofollow noreferrer" target="_blank"><code>掘金</code></a><a href="https://zhuanlan.zhihu.com/c_185793043" rel="nofollow noreferrer" target="_blank"><code>知乎</code></a><a href="https://segmentfault.com/blog/elegant-front-end"><code>思否</code></a><code>专栏</code>：<code>优雅的前端</code>
</blockquote>
<h2 id="articleHeader1">一、正则表达式简介</h2>
<h3 id="articleHeader2">1、什么是正则表达式</h3>
<p>正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE），计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。</p>
<blockquote>简单的说，就是按照某种规则去匹配符合条件的字符串。</blockquote>
<h3 id="articleHeader3">2、可视化正则表达式工具</h3>
<p>Regexper：<a href="https://regexper.com/" rel="nofollow noreferrer" target="_blank">https://regexper.com/</a></p>
<h2 id="articleHeader4">二、RegExp对象</h2>
<blockquote>实例化<code>RegExp</code>的两种方式。</blockquote>
<p>两种方式定义RegExp对象。</p>
<h3 id="articleHeader5">1、字面量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /[a-z]{3}/gmi;
let reg = /[a-z]{3}/g;
let reg = /[a-z]{3}/m;
let reg = /[a-z]{3}/i;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[a-z]{3}/gmi</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[a-z]{3}/g</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[a-z]{3}/m</span>;
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/[a-z]{3}/i</span>;</code></pre>
<h4>标志</h4>
<ul>
<li>
<code>g</code> global 代表全局搜索。如果不添加，搜索到第一个匹配停止。</li>
<li>
<code>m</code> Multi-Line 代表多行搜索。</li>
<li>
<code>i</code> ignore case 代表大小写不敏感，默认大小写敏感。</li>
</ul>
<h3 id="articleHeader6">2、构造函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = new RegExp('\\bis\\b', 'g');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> reg = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'\\bis\\b'</span>, <span class="hljs-string">'g'</span>);</code></pre>
<p>因为JavaScript字符串中<code>\</code>属于特殊字符，需要转义。</p>
<h2 id="articleHeader7">三、元字符</h2>
<blockquote>把元字符当作转义字符。</blockquote>
<p>正则表达式有两种基本字符类型组成。</p>
<ul>
<li>原义文本字符</li>
<li>元字符</li>
</ul>
<h3 id="articleHeader8">1、原义文本字符</h3>
<p>表示原本意义上是什么字符，就是什么字符。</p>
<h3 id="articleHeader9">2、元字符</h3>
<p>是在正则表达式中有特殊含义的非字母字符。  <br><code>* + ? $ ^ . | \ ( ) { } [ ]</code></p>
<table>
<thead><tr>
<th align="center">字符</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><code>\t</code></td>
<td align="left">水平制表符</td>
</tr>
<tr>
<td align="center"><code>\v</code></td>
<td align="left">垂直制表符</td>
</tr>
<tr>
<td align="center"><code>\n</code></td>
<td align="left">换行符</td>
</tr>
<tr>
<td align="center"><code>\r</code></td>
<td align="left">回车符</td>
</tr>
<tr>
<td align="center"><code>\0</code></td>
<td align="left">空字符</td>
</tr>
<tr>
<td align="center"><code>\f</code></td>
<td align="left">换页符</td>
</tr>
<tr>
<td align="center"><code>\cX</code></td>
<td align="left">控制字符，与X对应的控制字符(Ctrl + X)</td>
</tr>
</tbody>
</table>
<p>类似于转义字符。</p>
<h2 id="articleHeader10">四、字符类</h2>
<blockquote>表示符合某种特性的字符类别。</blockquote>
<p>使用元字符<code>[]</code>可以构建一个简单的类。  <br>所谓类是指符合某些特性的对象，一个泛指，而不是某个字符。</p>
<h3 id="articleHeader11">例子</h3>
<p>表达式<code>[abc]</code>把字符<code>a</code>或<code>b</code>或<code>c</code>归为一类，表达式可以匹配这一类中的任意一个字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
'a1b2c3d4e5'.replace(/[abc]/g, '0');  //010203d4e5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。</span>
<span class="hljs-string">'a1b2c3d4e5'</span>.replace(<span class="hljs-regexp">/[abc]/g</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">//010203d4e5</span></code></pre>
<h3 id="articleHeader12">字符类取反</h3>
<p>我们想要替换不是<code>abc</code>中任意一个字符的字符。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 元字符 ^ 创建一个 反向类/负向类
'abcdefg'.replace(/[^abc]/g, '0');  //abc0000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 元字符 ^ 创建一个 反向类/负向类</span>
<span class="hljs-string">'abcdefg'</span>.replace(<span class="hljs-regexp">/[^abc]/g</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">//abc0000</span></code></pre>
<h2 id="articleHeader13">五、范围类</h2>
<blockquote>匹配这一个范围内的字符。</blockquote>
<p>如果我们想要匹配数字<code>0-9</code>，那么我们可能会这样写<code>[0123456789]</code>。  <br>如果我们想要匹配<code>26</code>个字母，那么我们可能会这样写<code>[abcdefghijklmnopqrstuvwxyz]</code>。  <br>这样略显麻烦，所以才会有范围类。</p>
<h3 id="articleHeader14">例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 替换所有数字
'a1c2d3e4f5'.replace(/[0-9]/g, 'x');  //axcxdxexfx
// 替换所有小写字母
'a1c2d3e4f5'.replace(/[a-z]/g, 'x');  //x1x2x3x4x5
// []组成的类内部是可以连写的。替换所有大小写字母
'a1C2d3E4f5G6'.replace(/[a-zA-Z]/g, '*');  //*1*2*3*4*5*6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 替换所有数字</span>
<span class="hljs-string">'a1c2d3e4f5'</span>.replace(<span class="hljs-regexp">/[0-9]/g</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//axcxdxexfx</span>
<span class="hljs-comment">// 替换所有小写字母</span>
<span class="hljs-string">'a1c2d3e4f5'</span>.replace(<span class="hljs-regexp">/[a-z]/g</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//x1x2x3x4x5</span>
<span class="hljs-comment">// []组成的类内部是可以连写的。替换所有大小写字母</span>
<span class="hljs-string">'a1C2d3E4f5G6'</span>.replace(<span class="hljs-regexp">/[a-zA-Z]/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//*1*2*3*4*5*6</span></code></pre>
<h3 id="articleHeader15">疑问</h3>
<p>如果我想替换数字，并且连带<code>-</code>符号也一起替换呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 替换所有数字和横杠
'2018-5-21'.replace(/[0-9-]/g, '*');  //*********" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 替换所有数字和横杠</span>
<span class="hljs-string">'2018-5-21'</span>.replace(<span class="hljs-regexp">/[0-9-]/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//*********</span></code></pre>
<h2 id="articleHeader16">六、预定义类</h2>
<blockquote>一些已经定义的类，可以直接使用。</blockquote>
<table>
<thead><tr>
<th align="center">字符</th>
<th align="left">等价类</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><code>.</code></td>
<td align="left"><code>[^\r\n]</code></td>
<td align="left">除了回车、换行之外的所有字符</td>
</tr>
<tr>
<td align="center"><code>\d</code></td>
<td align="left"><code>[0-9]</code></td>
<td align="left">数字字符</td>
</tr>
<tr>
<td align="center"><code>\D</code></td>
<td align="left"><code>[^0-9]</code></td>
<td align="left">非数字字符</td>
</tr>
<tr>
<td align="center"><code>\s</code></td>
<td align="left"><code>[\t\n\x0B\r]</code></td>
<td align="left">空白符</td>
</tr>
<tr>
<td align="center"><code>\S</code></td>
<td align="left"><code>[^\t\n\x0B\r]</code></td>
<td align="left">非空白符</td>
</tr>
<tr>
<td align="center"><code>\w</code></td>
<td align="left"><code>[a-zA-Z_0-9]</code></td>
<td align="left">单词字符(字母、数字、下划线)</td>
</tr>
<tr>
<td align="center"><code>\W</code></td>
<td align="left"><code>[^a-zA-Z_0-9]</code></td>
<td align="left">非单词字符</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader17">例子</h3>
<p>替换一个 <code>ab</code> + <code>数字</code> + <code>任意字符</code> 的字符串</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 写法1
'ab0c'.replace(/ab[0-9][^\r\n]/g, 'TangJinJian');  //TangJianJian
// 写法2
'ab0c'.replace(/ab\d./g, 'TangJinJian');  //TangJianJian" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 写法1</span>
<span class="hljs-string">'ab0c'</span>.replace(<span class="hljs-regexp">/ab[0-9][^\r\n]/g</span>, <span class="hljs-string">'TangJinJian'</span>);  <span class="hljs-comment">//TangJianJian</span>
<span class="hljs-comment">// 写法2</span>
<span class="hljs-string">'ab0c'</span>.replace(<span class="hljs-regexp">/ab\d./g</span>, <span class="hljs-string">'TangJinJian'</span>);  <span class="hljs-comment">//TangJianJian</span></code></pre>
<h2 id="articleHeader18">七、单词边界</h2>
<table>
<thead><tr>
<th align="center">字符</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><code>^</code></td>
<td align="left">以xxx开始（不在中括号内时的含义）</td>
</tr>
<tr>
<td align="center"><code>$</code></td>
<td align="left">以xxx结束</td>
</tr>
<tr>
<td align="center"><code>\b</code></td>
<td align="left">单词边界</td>
</tr>
<tr>
<td align="center"><code>\B</code></td>
<td align="left">非单词边界</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader19">例子</h3>
<p>我想替换的字符串，属于那种只在开头出现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'YuYan is a boy, YuYan'.replace(/^YuYan/g, 'TangJinJian');  //TangJinJian is a boy, YuYan" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'YuYan is a boy, YuYan'</span>.replace(<span class="hljs-regexp">/^YuYan/g</span>, <span class="hljs-string">'TangJinJian'</span>);  <span class="hljs-comment">//TangJinJian is a boy, YuYan</span></code></pre>
<p>我想替换的字符串，属于那种只在结尾出现的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'YuYan is a boy, YuYan'.replace(/YuYan$/g, 'TangJinJian');  //YuYan is a boy, TangJinJian" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'YuYan is a boy, YuYan'</span>.replace(<span class="hljs-regexp">/YuYan$/g</span>, <span class="hljs-string">'TangJinJian'</span>);  <span class="hljs-comment">//YuYan is a boy, TangJinJian</span></code></pre>
<p>单词边界例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 替换所有is为0
'This is a man'.replace(/is/g, '0');  //Th0 0 a man
// 替换所有is前面带有单词边界的字符串
'This is a man'.replace(/\bis/g, '0');  //This 0 a man
// 替换所有is前面没有单词边界的字符串
'This is a man'.replace(/\Bis\b/g, '0');  //Th0 is a man" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 替换所有is为0</span>
<span class="hljs-string">'This is a man'</span>.replace(<span class="hljs-regexp">/is/g</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">//Th0 0 a man</span>
<span class="hljs-comment">// 替换所有is前面带有单词边界的字符串</span>
<span class="hljs-string">'This is a man'</span>.replace(<span class="hljs-regexp">/\bis/g</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">//This 0 a man</span>
<span class="hljs-comment">// 替换所有is前面没有单词边界的字符串</span>
<span class="hljs-string">'This is a man'</span>.replace(<span class="hljs-regexp">/\Bis\b/g</span>, <span class="hljs-string">'0'</span>);  <span class="hljs-comment">//Th0 is a man</span></code></pre>
<h2 id="articleHeader20">八、量词</h2>
<blockquote>用来处理连续出现的字符串。</blockquote>
<table>
<thead><tr>
<th align="center">字符</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><code>?</code></td>
<td align="left">出现零次或一次（最多出现一次）</td>
</tr>
<tr>
<td align="center"><code>+</code></td>
<td align="left">出现一次或多次（至少出现一次）</td>
</tr>
<tr>
<td align="center"><code>*</code></td>
<td align="left">出现零次或多次（任意次）</td>
</tr>
<tr>
<td align="center"><code>{n}</code></td>
<td align="left">出现n次</td>
</tr>
<tr>
<td align="center"><code>{n,m}</code></td>
<td align="left">出现n到m次</td>
</tr>
<tr>
<td align="center"><code>{n,}</code></td>
<td align="left">至少出现n次</td>
</tr>
</tbody>
</table>
<p>我想替换字符串中连续出现<code>10</code>次的数字为<code>*</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'1234567890abcd'.replace(/\d{10}/, '*');  //*abcd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'1234567890abcd'</span>.replace(<span class="hljs-regexp">/\d{10}/</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//*abcd</span></code></pre>
<p>我想替换字符串中的QQ号码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'我的QQ是：10000'.replace(/[1-9][0-9]{4,}/, '19216811');  //我的QQ是：19216811" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'我的QQ是：10000'</span>.replace(<span class="hljs-regexp">/[1-9][0-9]{4,}/</span>, <span class="hljs-string">'19216811'</span>);  <span class="hljs-comment">//我的QQ是：19216811</span></code></pre>
<h2 id="articleHeader21">九、贪婪模式</h2>
<blockquote>尽可能多的匹配。</blockquote>
<p>有这样的一种场景下的正则表达式，<code>/\d{3,6}/</code>该替换3个数字还是6个数字呢，4、5个数字？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 贪婪模式会尽可能的往多的方面去匹配
'123456789'.replace(/\d{3,6}/, 'x');  //x789
'123456789'.replace(/\d+/, 'x');  //x
'123456789'.replace(/\d{3,}/, 'x');  //x" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 贪婪模式会尽可能的往多的方面去匹配</span>
<span class="hljs-string">'123456789'</span>.replace(<span class="hljs-regexp">/\d{3,6}/</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//x789</span>
<span class="hljs-string">'123456789'</span>.replace(<span class="hljs-regexp">/\d+/</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//x</span>
<span class="hljs-string">'123456789'</span>.replace(<span class="hljs-regexp">/\d{3,}/</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//x</span></code></pre>
<h2 id="articleHeader22">十、非贪婪模式</h2>
<blockquote>尽可能少的匹配。</blockquote>
<p>如果我们想要最低限度的替换呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 非贪婪模式使用 ? 尽可能的往少的方面去匹配
'12345678'.replace(/\d{3,6}?/g, 'x');  //xx78
'123456789'.replace(/\d{3,6}?/g, 'x');  //xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 非贪婪模式使用 ? 尽可能的往少的方面去匹配</span>
<span class="hljs-string">'12345678'</span>.replace(<span class="hljs-regexp">/\d{3,6}?/g</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//xx78</span>
<span class="hljs-string">'123456789'</span>.replace(<span class="hljs-regexp">/\d{3,6}?/g</span>, <span class="hljs-string">'x'</span>);  <span class="hljs-comment">//xxx</span></code></pre>
<p>因为有<code>g</code>标志，会匹配这段字符串里所有符合规则的字符串。  <br>第一个规则<code>/\d{3,6}?/g</code>，<code>12345678</code>中有两个符合条件的字符串，是<code>123</code>和<code>456</code>。所以替换结果是<code>xx78</code>。  <br>第二个规则<code>/\d{3,6}?/g</code>，<code>123456789</code>中有三个符合条件的字符串，是<code>123</code>、<code>456</code>和<code>789</code>。所以替换结果是<code>xxx</code>。</p>
<h2 id="articleHeader23">十一、分组</h2>
<blockquote>括号里的一些规则，分为一组。</blockquote>
<p>我想替换连续出现3次的<code>字母</code>和<code>数字</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//没有分组的情况下，后面的量词，只是表示匹配3次数字。
'a1b2d3c4'.replace(/[a-z]\d{3}/g, '*');  //a1b2d3c4
//有分组的情况下，分组后面的量词，表示符合这个分组里规则的字符串，匹配3次。
'a1b2d3c4'.replace(/([a-z]\d){3}/g, '*');  //*c4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//没有分组的情况下，后面的量词，只是表示匹配3次数字。</span>
<span class="hljs-string">'a1b2d3c4'</span>.replace(<span class="hljs-regexp">/[a-z]\d{3}/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//a1b2d3c4</span>
<span class="hljs-comment">//有分组的情况下，分组后面的量词，表示符合这个分组里规则的字符串，匹配3次。</span>
<span class="hljs-string">'a1b2d3c4'</span>.replace(<span class="hljs-regexp">/([a-z]\d){3}/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//*c4</span></code></pre>
<h3 id="articleHeader24">1、或</h3>
<p>分组里有两种规则，只要满足其中一种即可匹配。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//我想把ijaxxy和ijcdxy都替换成*
'ijabxyijcdxy'.replace(/ij(ab|cd)xy/g, '*');  //**" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//我想把ijaxxy和ijcdxy都替换成*</span>
<span class="hljs-string">'ijabxyijcdxy'</span>.replace(<span class="hljs-regexp">/ij(ab|cd)xy/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//**</span></code></pre>
<h3 id="articleHeader25">2、反向引用</h3>
<p>可以把分组视为变量，来引用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//我想把改变年月日之间的分隔符
'2018-5-22'.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g, '$1/$2/$3');  //2018/5/22
//我想替换日期，并且更改顺序
'2018-5-22'.replace(/(\d{4})-(\d{1,2})-(\d{1,2})/g, '$2/$3/$1');  //5/22/2018" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">//我想把改变年月日之间的分隔符</span>
<span class="hljs-string">'2018-5-22'</span>.replace(<span class="hljs-regexp">/(\d{4})-(\d{1,2})-(\d{1,2})/g</span>, <span class="hljs-string">'$1/$2/$3'</span>);  <span class="hljs-comment">//2018/5/22</span>
<span class="hljs-comment">//我想替换日期，并且更改顺序</span>
<span class="hljs-string">'2018-5-22'</span>.replace(<span class="hljs-regexp">/(\d{4})-(\d{1,2})-(\d{1,2})/g</span>, <span class="hljs-string">'$2/$3/$1'</span>);  <span class="hljs-comment">//5/22/2018</span></code></pre>
<h3 id="articleHeader26">3、忽略分组</h3>
<p>忽略掉分组，不捕获分组，只需要在分组内加上<code>?:</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 忽略掉匹配年的分组后，匹配月的分组变成了$1，日的分组变成了$2
'2018-5-22'.replace(/(?:\d{4})-(\d{1,2})-(\d{1,2})/g, '$1/$2/$3');  //5/22/$3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 忽略掉匹配年的分组后，匹配月的分组变成了$1，日的分组变成了$2</span>
<span class="hljs-string">'2018-5-22'</span>.replace(<span class="hljs-regexp">/(?:\d{4})-(\d{1,2})-(\d{1,2})/g</span>, <span class="hljs-string">'$1/$2/$3'</span>);  <span class="hljs-comment">//5/22/$3</span></code></pre>
<h2 id="articleHeader27">十二、前瞻</h2>
<blockquote>正则表达式从文本头部向尾部开始解析，文本尾部方向，称为“前”。  <br>前瞻就是在正在表达式匹配到规则的时候，向前检查是否符合断言，后顾/后瞻方向相反。  <br>JavaScript不支持后顾。<br>符合和不符合特定断言称为<code>肯定/正向</code>匹配和<code>否定/负向</code>匹配。</blockquote>
<table>
<thead><tr>
<th align="center">名称</th>
<th align="left">正则</th>
<th align="left">含义</th>
</tr></thead>
<tbody>
<tr>
<td align="center">正向前瞻</td>
<td align="left"><code>exp(?=assert)</code></td>
<td align="left"> </td>
</tr>
<tr>
<td align="center">负向前瞻</td>
<td align="left"><code>exp(?!assert)</code></td>
<td align="left"> </td>
</tr>
<tr>
<td align="center">正向后顾</td>
<td align="left"><code>exp(?&lt;=assert)</code></td>
<td align="left">JavaScript不支持</td>
</tr>
<tr>
<td align="center">负向后顾</td>
<td align="left"><code>exp(?&lt;!assert)</code></td>
<td align="left">JavaScript不支持</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader28">例子</h3>
<p>有这样一个<code>单词字符</code>+<code>数字</code>格式的字符串，只要满足这种格式，就把其中的单词字符替换掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'a1b2ccdde3'.replace(/\w(?=\d)/g, '*');  //*1*2ccdd*3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'a1b2ccdde3'</span>.replace(<span class="hljs-regexp">/\w(?=\d)/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//*1*2ccdd*3</span></code></pre>
<p>有这样一个<code>单词字符</code>+<code>非数字</code>格式的字符串，只要满足这种格式，就把前面的单词字符替换掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'a1b2ccdde3'.replace(/\w(?!\d)/g, '*');  //a*b*****e*" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">'a1b2ccdde3'</span>.replace(<span class="hljs-regexp">/\w(?!\d)/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//a*b*****e*</span></code></pre>
<h2 id="articleHeader29">十三、RegExp对象属性</h2>
<p><code>global</code>是否全文搜索，默认<code>false</code>。  <br><code>ignore case</code>是否大小写敏感，默认是<code>false</code>。  <br><code>multiline</code>多行搜索，默认值是<code>false</code>。  <br><code>lastIndex</code>是当前表达式匹配内容的最后一个字符的下一个位置。  <br><code>source</code>正则表达式的文本字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg1 = /\w/;
let reg2 = /\w/gim;

reg1.global;  //false
reg1.ignoreCase;  //false
reg1.multiline;  //false

reg2.global;  //true
reg2.ignoreCase;  //true
reg2.multiline;  //true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg1 = <span class="hljs-regexp">/\w/</span>;
<span class="hljs-keyword">let</span> reg2 = <span class="hljs-regexp">/\w/gim</span>;

reg1.global;  <span class="hljs-comment">//false</span>
reg1.ignoreCase;  <span class="hljs-comment">//false</span>
reg1.multiline;  <span class="hljs-comment">//false</span>

reg2.global;  <span class="hljs-comment">//true</span>
reg2.ignoreCase;  <span class="hljs-comment">//true</span>
reg2.multiline;  <span class="hljs-comment">//true</span></code></pre>
<h2 id="articleHeader30">十四、RegExp对象方法</h2>
<h3 id="articleHeader31">1、RegExp.prototype.test()</h3>
<blockquote>用来查看正则表达式与指定的字符串是否匹配。返回<code>true</code>或<code>false</code>。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg1 = /\w/;
reg1.test('a');  //true
reg1.test('*');  //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg1 = <span class="hljs-regexp">/\w/</span>;
reg1.test(<span class="hljs-string">'a'</span>);  <span class="hljs-comment">//true</span>
reg1.test(<span class="hljs-string">'*'</span>);  <span class="hljs-comment">//false</span></code></pre>
<p>加上<code>g</code>标志之后，会有些区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg1 = /\w/g;
// 第一遍
reg1.test('ab');  //true
// 第二遍
reg1.test('ab');  //true
// 第三遍
reg1.test('ab');  //false
// 第四遍
reg1.test('ab');  //true
// 第五遍
reg1.test('ab');  //true
// 第六遍
reg1.test('ab');  //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg1 = <span class="hljs-regexp">/\w/g</span>;
<span class="hljs-comment">// 第一遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//true</span>
<span class="hljs-comment">// 第二遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//true</span>
<span class="hljs-comment">// 第三遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//false</span>
<span class="hljs-comment">// 第四遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//true</span>
<span class="hljs-comment">// 第五遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//true</span>
<span class="hljs-comment">// 第六遍</span>
reg1.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//false</span></code></pre>
<p>实际上这是因为<code>RegExp.lastIndex</code>。每次匹配到之后，<code>lasgIndex</code>会改变。  <br><code>lastIndex</code>是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\w/g;
// 每次匹配到，就会把lastIndex指向匹配到的字符串后一个字符的索引。
while(reg.test('ab')) {
    console.log(reg.lastIndex);
}
// 1
// 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\w/g</span>;
<span class="hljs-comment">// 每次匹配到，就会把lastIndex指向匹配到的字符串后一个字符的索引。</span>
<span class="hljs-keyword">while</span>(reg.test(<span class="hljs-string">'ab'</span>)) {
    <span class="hljs-built_in">console</span>.log(reg.lastIndex);
}
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span></code></pre>
<p><code>reg.lastIndex</code>初始时为<code>0</code>，第一个次匹配到<code>a</code>的时候，<code>reg.lastIndex</code>为<code>1</code>。第二次匹配到<code>b</code>的时候，<code>reg.lastIndex</code>为<code>2</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\w\w/g;
while(reg.test('ab12cd')) {
  console.log(reg.lastIndex);
}
// 2
// 4
// 6" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\w\w/g</span>;
<span class="hljs-keyword">while</span>(reg.test(<span class="hljs-string">'ab12cd'</span>)) {
  <span class="hljs-built_in">console</span>.log(reg.lastIndex);
}
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 4</span>
<span class="hljs-comment">// 6</span></code></pre>
<p><code>reg.lastIndex</code>初始时为<code>0</code>，第一个次匹配到<code>ab</code>的时候，<code>reg.lastIndex</code>为<code>2</code>。第二次匹配到<code>12</code>的时候，<code>reg.lastIndex</code>为<code>4</code>。第三次匹配到<code>cd</code>的时候，<code>reg.lastIndex</code>为<code>6</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\w/g;
// 匹配不到符合正则的字符串之后，lastIndex会变为0。
while(reg.test('ab')) {
    console.log(reg.lastIndex);
}
console.log(reg.lastIndex);
reg.test('ab');
console.log(reg.lastIndex);
// 1
// 2
// 0
// 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\w/g</span>;
<span class="hljs-comment">// 匹配不到符合正则的字符串之后，lastIndex会变为0。</span>
<span class="hljs-keyword">while</span>(reg.test(<span class="hljs-string">'ab'</span>)) {
    <span class="hljs-built_in">console</span>.log(reg.lastIndex);
}
<span class="hljs-built_in">console</span>.log(reg.lastIndex);
reg.test(<span class="hljs-string">'ab'</span>);
<span class="hljs-built_in">console</span>.log(reg.lastIndex);
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 2</span>
<span class="hljs-comment">// 0</span>
<span class="hljs-comment">// 1</span></code></pre>
<p>所以，这就是为什么<code>reg.test('ab')</code>再多次执行之后，返回值为<code>false</code>的原因了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\w/g;
reg.lastIndex = 2;
reg.test('ab');  //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\w/g</span>;
reg.lastIndex = <span class="hljs-number">2</span>;
reg.test(<span class="hljs-string">'ab'</span>);  <span class="hljs-comment">//false</span></code></pre>
<p>每次匹配的起始位置，是以<code>lastIndex</code>为起始位置的。上述例子，一开始从位置<code>2</code>开始匹配，位置<code>2</code>后面没有符合正则的字符串，所以为<code>false</code>。</p>
<h3 id="articleHeader32">2、RegExp.prototype.exec()</h3>
<blockquote>在一个指定字符串中执行一个搜索匹配。返回一个搜索的结果数组或<code>null</code>。</blockquote>
<h4>非全局情况</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\d(\w)\d/;
let ts = '*1a2b3c';
let ret = reg.exec(ts);  //ret是结果数组
// reg.lastIndex肯定是0，因为没有g标志。 没有g标志的情况下，lastIndex被忽略。
console.log(reg.lastIndex + '\t' + ret.index + '\t' + ret.toString());
console.log(ret);
// 0  1 1a2,a
// [&quot;1a2&quot;, &quot;a&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\d(\w)\d/</span>;
<span class="hljs-keyword">let</span> ts = <span class="hljs-string">'*1a2b3c'</span>;
<span class="hljs-keyword">let</span> ret = reg.exec(ts);  <span class="hljs-comment">//ret是结果数组</span>
<span class="hljs-comment">// reg.lastIndex肯定是0，因为没有g标志。 没有g标志的情况下，lastIndex被忽略。</span>
<span class="hljs-built_in">console</span>.log(reg.lastIndex + <span class="hljs-string">'\t'</span> + ret.index + <span class="hljs-string">'\t'</span> + ret.toString());
<span class="hljs-built_in">console</span>.log(ret);
<span class="hljs-comment">// 0  1 1a2,a</span>
<span class="hljs-comment">// ["1a2", "a"]</span></code></pre>
<p>返回数组是有以下元素组成的：</p>
<ul>
<li>第一个元素是与正则表达式相匹配的文本。</li>
<li>第二个元素是<code>reg</code>对象的第一个子表达式相匹配的文本（如果有的话）。</li>
<li>第二个元素是<code>reg</code>对象的第二个子表达式相匹配的文本（如果有的话），以此类推。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 子表达式就是分组。
let reg = /\d(\w)(\w)(\w)\d/;
let ts = '*1a2b3c';
let ret = reg.exec(ts);
console.log(reg.lastIndex + '\t' + ret.index + '\t' + ret.toString());
console.log(ret);  //输出结果数组
// 0  1 1a2b3,a,2,b
// [&quot;1a2b3&quot;, &quot;a&quot;, &quot;2&quot;, &quot;b&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// 子表达式就是分组。</span>
<span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\d(\w)(\w)(\w)\d/</span>;
<span class="hljs-keyword">let</span> ts = <span class="hljs-string">'*1a2b3c'</span>;
<span class="hljs-keyword">let</span> ret = reg.exec(ts);
<span class="hljs-built_in">console</span>.log(reg.lastIndex + <span class="hljs-string">'\t'</span> + ret.index + <span class="hljs-string">'\t'</span> + ret.toString());
<span class="hljs-built_in">console</span>.log(ret);  <span class="hljs-comment">//输出结果数组</span>
<span class="hljs-comment">// 0  1 1a2b3,a,2,b</span>
<span class="hljs-comment">// ["1a2b3", "a", "2", "b"]</span></code></pre>
<h4>全局情况</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\d(\w)(\w)(\w)\d/g;
let ts = '*1abc25def3g';
while(ret = reg.exec(ts)) {
    console.log(reg.lastIndex + '\t' + ret.index + '\t' + ret.toString());
}
// 6  1 1abc2,a,b,c
// 11 6 5def3,d,e,f" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\d(\w)(\w)(\w)\d/g</span>;
<span class="hljs-keyword">let</span> ts = <span class="hljs-string">'*1abc25def3g'</span>;
<span class="hljs-keyword">while</span>(ret = reg.exec(ts)) {
    <span class="hljs-built_in">console</span>.log(reg.lastIndex + <span class="hljs-string">'\t'</span> + ret.index + <span class="hljs-string">'\t'</span> + ret.toString());
}
<span class="hljs-comment">// 6  1 1abc2,a,b,c</span>
<span class="hljs-comment">// 11 6 5def3,d,e,f</span></code></pre>
<p>第一次匹配的是<code>1abc2</code>，<code>1abc2</code>的后一个字符的起始位置是<code>6</code>，所以<code>reg.lastIndex</code>是<code>6</code>。  <br><code>1abc2</code>的第一个字符的起始位置是<code>1</code>，所以<code>ret.index</code>是<code>1</code>。</p>
<p>第二次匹配的是<code>5def3</code>，<code>5def3</code>的后一个字符的起始位置是<code>11</code>，所以<code>reg.lastIndex</code>是<code>11</code>。  <br><code>5def3</code>的第一个字符的起始位置是<code>6</code>，所以<code>ret.index</code>是<code>6</code>。</p>
<h2 id="articleHeader33">十五、字符串对象方法</h2>
<h3 id="articleHeader34">1、String.prototype.search()</h3>
<blockquote>执行正则表达式和<code>String</code>对象之间的一个搜索匹配。  <br>方法返回第一个匹配项的<code>index</code>，搜索不到返回<code>-1</code>。  <br>不执行全局匹配，忽略<code>g</code>标志，并且总是从字符串的开始进行检索。</blockquote>
<p>我想知道<code>Jin</code>字符串的起始位置在哪里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'TangJinJian'.search('Jin');  //4
'TangJinJian'.search(/Jin/);  //4" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-string">'TangJinJian'</span>.search(<span class="hljs-string">'Jin'</span>);  <span class="hljs-comment">//4</span>
<span class="hljs-string">'TangJinJian'</span>.search(<span class="hljs-regexp">/Jin/</span>);  <span class="hljs-comment">//4</span></code></pre>
<p><code>search</code>方法，既可以通过字符串，也可以通过正则描述字符串来搜索匹配。</p>
<h3 id="articleHeader35">2、String.prototype.match()</h3>
<blockquote>当一个字符串与一个正则表达式匹配时， <code>match()</code>方法检索匹配项。  <br>提供<code>RegExp</code>对象参数是否具有<code>g</code>标志，对结果影响很大。</blockquote>
<h4>非全局调用的情况</h4>
<p>如果<code>RegExp</code>没有<code>g</code>标志，那么<code>match</code>只能在字符串中，执行一次匹配。  <br>如果没有找到任何匹配文本，将返回<code>null</code>。  <br>否则将返回一个数组，其中存放了与它找到的匹配文本有关的信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\d(\w)\d/;
let ts = '*1a2b3c';
let ret = ts.match(reg);
console.log(ret.index + '\t' + reg.lastIndex);
console.log(ret);
// 1  0
// [&quot;1a2&quot;, &quot;a&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\d(\w)\d/</span>;
<span class="hljs-keyword">let</span> ts = <span class="hljs-string">'*1a2b3c'</span>;
<span class="hljs-keyword">let</span> ret = ts.match(reg);
<span class="hljs-built_in">console</span>.log(ret.index + <span class="hljs-string">'\t'</span> + reg.lastIndex);
<span class="hljs-built_in">console</span>.log(ret);
<span class="hljs-comment">// 1  0</span>
<span class="hljs-comment">// ["1a2", "a"]</span></code></pre>
<p>非全局情况下和<code>RegExp.prototype.exec()</code>方法的效果是一样的。</p>
<h4>全局调用的情况</h4>
<p>我想找到所有<code>数字</code>+<code>单词</code>+<code>数字</code>格式的字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reg = /\d(\w)\d/g;
let ts = '*1a2b3c4e';
let ret = ts.match(reg);
console.log(ret.index + '\t' + reg.lastIndex);
console.log(ret);
// undefined  0
// [&quot;1a2&quot;, &quot;3c4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> reg = <span class="hljs-regexp">/\d(\w)\d/g</span>;
<span class="hljs-keyword">let</span> ts = <span class="hljs-string">'*1a2b3c4e'</span>;
<span class="hljs-keyword">let</span> ret = ts.match(reg);
<span class="hljs-built_in">console</span>.log(ret.index + <span class="hljs-string">'\t'</span> + reg.lastIndex);
<span class="hljs-built_in">console</span>.log(ret);
<span class="hljs-comment">// undefined  0</span>
<span class="hljs-comment">// ["1a2", "3c4"]</span></code></pre>
<p>全局情况下和<code>RegExp.prototype.exec()</code>方法的区别。在于，没有了分组信息。  <br>如果我们不使用到分组信息，那么使用<code>String.prototype.match()</code>方法，效率要高一些。而且不需要写循环来逐个所有的匹配项获取。</p>
<h3 id="articleHeader36">3、String.prototype.split()</h3>
<blockquote>使用指定的分隔符字符串将一个<code>String</code>对象分割成字符串数组。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'a,b,c,d'.split(/,/);  //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;]
'a1b2c3d'.split(/\d/);  //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;]
'a1b-c|d'.split(/[\d-|]/);  //[&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-string">'a,b,c,d'</span>.split(<span class="hljs-regexp">/,/</span>);  <span class="hljs-comment">//["a", "b", "c", "d"]</span>
<span class="hljs-string">'a1b2c3d'</span>.split(<span class="hljs-regexp">/\d/</span>);  <span class="hljs-comment">//["a", "b", "c", "d"]</span>
<span class="hljs-string">'a1b-c|d'</span>.split(<span class="hljs-regexp">/[\d-|]/</span>);  <span class="hljs-comment">//["a", "b", "c", "d"]</span></code></pre>
<h3 id="articleHeader37">4、String.prototype.replace()</h3>
<blockquote>返回一个由替换值替换一些或所有匹配的模式后的新字符串。模式可以是一个字符串或者一个正则表达式， 替换值可以是一个字符串或者一个每次匹配都要调用的函数。</blockquote>
<h4>常规用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'TangJinJian'.replace('Tang', '');  //JinJian
'TangJinJian'.replace(/Ji/g, '*');  //Tang*n*an" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-string">'TangJinJian'</span>.replace(<span class="hljs-string">'Tang'</span>, <span class="hljs-string">''</span>);  <span class="hljs-comment">//JinJian</span>
<span class="hljs-string">'TangJinJian'</span>.replace(<span class="hljs-regexp">/Ji/g</span>, <span class="hljs-string">'*'</span>);  <span class="hljs-comment">//Tang*n*an</span></code></pre>
<p>以上两种用法，是最常用的，但是还不能精细化控制。</p>
<h4>精细化用法</h4>
<p>我想要把<code>a1b2c3d4</code>中的数字都加一，变成<code>a2b3c4d5</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'a1b2c3d4'.replace(/\d/g, function(match, index, orgin) {
    console.log(index);
    return parseInt(match) + 1;
});
// 1
// 3
// 5
// 7
// a2b3c4d5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-string">'a1b2c3d4'</span>.replace(<span class="hljs-regexp">/\d/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match, index, orgin</span>) </span>{
    <span class="hljs-built_in">console</span>.log(index);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(match) + <span class="hljs-number">1</span>;
});
<span class="hljs-comment">// 1</span>
<span class="hljs-comment">// 3</span>
<span class="hljs-comment">// 5</span>
<span class="hljs-comment">// 7</span>
<span class="hljs-comment">// a2b3c4d5</span></code></pre>
<p>回调函数有以下参数：</p>
<ul>
<li>
<code>match</code>第一个参数。匹配到的字符串。</li>
<li>
<code>group</code>第二个参数。分组，如果有n个分组，则以此类推n个<code>group</code>参数，下面两个参数将变为第<code>2+n</code>和<code>3+n</code>个参数。没有分组，则没有该参数。</li>
<li>
<code>index</code>第三个参数。匹配到的字符串第一个字符索引位置。</li>
<li>
<code>orgin</code>第四个参数。源字符串。</li>
</ul>
<p>我想把两个数字之间的字母去掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'a1b2c3d4e5f6'.replace(/(\d)(\w)(\d)/g, function(match, group1, group2, group3, index, orgin) {
  console.log(match);
  return group1 + group3;
});
// 1b2
// 3d4
// 5f6
// a12c34e56" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-string">'a1b2c3d4e5f6'</span>.replace(<span class="hljs-regexp">/(\d)(\w)(\d)/g</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match, group1, group2, group3, index, orgin</span>) </span>{
  <span class="hljs-built_in">console</span>.log(match);
  <span class="hljs-keyword">return</span> group1 + group3;
});
<span class="hljs-comment">// 1b2</span>
<span class="hljs-comment">// 3d4</span>
<span class="hljs-comment">// 5f6</span>
<span class="hljs-comment">// a12c34e56</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
系统认识JavaScript正则表达式

## 原文链接
[https://segmentfault.com/a/1190000014981826](https://segmentfault.com/a/1190000014981826)

