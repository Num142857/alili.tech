---
title: '前端知识点总结——JS高级（持续更新中）' 
date: 2018-12-07 2:30:10
hidden: true
slug: l5ufbepn1wn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><strong>前端知识点总结——JS高级（持续更新中）</strong></h1>
<h2 id="articleHeader1">1.字符串</h2>
<p>什么是: 连续存储多个字符的字符数组<br> 相同: 1. 下标 2. .length  3. 遍历</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  4. 选取: slice(starti[, endi])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-number">4</span>. 选取: slice(starti<span class="hljs-string">[, endi]</span>)</code></pre>
<p>不同: 类型不同 API不通用<br>API: 所有字符串API都无权修改原字符串，总是返回新字符串</p>
<ol><li>大小写转换:<br> 统一转大写: str=str.toUpperCase()<br> 统一转小写: str=str.toLowerCase()<br> 何时: 不区分大小写时，都需要先转为一致的大小写，再比较。</li></ol>
<p>说明: 验证码本不该客户端做，应该由服务器端完成</p>
<h2 id="articleHeader2">2.获取指定位置的字符:</h2>
<p>str.charAt(i)  =&gt; str[i]<br>  获取指定位置字符的unicode号<br>  str.charCodeAt(i)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  将unicode号转为汉字: String.fromCharCode(unicode)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbnet"><code>  将<span class="hljs-keyword">unicode</span>号转为汉字: <span class="hljs-built_in">String</span>.fromCharCode(<span class="hljs-keyword">unicode</span>)

</code></pre>
<h2 id="articleHeader3">3.获取子字符串:</h2>
<p>str.slice(starti,endi+1)<br>   强调: 如果一个API，两个参数都是下标，则后一个参数+1（含头不含尾）<br>  str.substring(starti,endi+1) 用法和slice完全一样<br>   强调: 不支持负数参数<br>  str.subStr(starti,n) 从starti开始，取n个<br>   强调: 第二个参数不是下标，所以，不用考虑含头不含尾</p>
<h2 id="articleHeader4">4.查找: 4种:</h2>
<ol>
<li>查找一个固定的关键词出现的位置:<br> var i=str.indexOf("关键词"[,fromi])<br> 在str中，fromi位置后，找下一个"关键词"出现的位置<br>  如果找到，返回关键词第一个字的下标位置<br>  如果没找到，返回-1<br> 说明: fromi可省略，默认从0开始<p>var i=str.lastIndexOf("关键词");<br> 在str中，查找"关键词"最后出现的位置</p>
<p>问题: 只能查找一个固定的关键词<br>  卧我草/操/艹/槽<br>  微 信  w x  wei xin<br> 解决: 用正则查找:</p>
</li>
<li>
<p>判断是否包含关键词:<br> var i=str.search(/正则/)<br> 返回值: 如果找到，返回关键词的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     如果没找到，返回-1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">     如果没找到，返回<span class="hljs-number">-1</span></code></pre>
<p>问题: 默认，所有正则都区分大小写<br> 解决: 在第二个/后加i  ignore 忽略<br> 问题: 只能获得位置，无法获得本次找到的敏感词的内容</p>
</li>
<li>
<p>获得关键词的内容: <br> var arr=str.match(/正则/i);<br> 2种情况:</p>
<ol>
<li>不加g的情况: 只能返回第一个找到的关键词内容和位置: [ 0: "关键词内容", index: 位置 ]</li>
<li>加g: 返回所有找到的敏感词的内容，保存在数组中。g: global</li>
</ol>
</li>
</ol>
<p>强调: 如果找不到，返回null</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 警告: 凡是一个函数可能返回null！都要先判断不是null，才能用！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"> 警告: 凡是一个函数可能返回<span class="hljs-literal">null</span>！都要先判断不是<span class="hljs-literal">null</span>，才能用！</code></pre>
<p>问题: 只能获得关键词内容，无法获得位置</p>
<ol><li>即找每个关键词内容，又找每个关键词位置: <br> reg.exec()</li></ol>
<h2 id="articleHeader5">5.替换:</h2>
<p>什么是: 将找到的关键词替换为指定的内容<br>  如何: 2种:</p>
<ol>
<li>简单替换: 将所有敏感词无差别的替换为统一的新值<br>  str=str.replace(/正则/,"替换值")</li>
<li>
<p>高级替换: 根据每个敏感词的不同，分别替换不同的值<br>  str=str.replace(/正则/,function(kw){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //kw: 会自动获得本次找到的一个关键词
 return  根据kw的不同，动态生成不同的替换值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-comment">//kw: 会自动获得本次找到的一个关键词</span>
 <span class="hljs-keyword">return</span>  根据kw的不同，动态生成不同的替换值</code></pre>
<p>})</p>
</li>
</ol>
<p>衍生: 删除关键词:<br>   str=str.replace(/正则/,"")</p>
<h2 id="articleHeader6">6.正则表达式: Regular Expression</h2>
<p>什么是: 描述一个字符串中字符出现规律的规则的表达式<br>何时: 2种:</p>
<ol>
<li>查找关键词:</li>
<li>验证:</li>
</ol>
<p>如何: 正则表达式语法:</p>
<ol><li>最简单的正则其实是关键词原文:</li></ol>
<h2 id="articleHeader7">7.字符集:</h2>
<p>什么是: 规定一位字符，备选字符列表的集合<br>  何时: 只要一位字符，有多种备选字时<br>  如何: [备选字符列表]<br>   强调: 一个[]只能匹配一位字符<br>   简写: 如果备选字符列表中部分字符连续</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可简写为: [x-x]  用-省略中间字符
 比如: [0-9] 一位数字
      [a-z] 一位小写字符
      [A-Z] 一位大写字母
      [A-Za-z] 一位字符
      [0-9A-Za-z] 一位字母或数字
      [\u4e00-\u9fa5] 一位汉字" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>可简写为: <span class="hljs-string">[x-x]</span>  用-省略中间字符
 比如: <span class="hljs-string">[0-9]</span> 一位数字
      <span class="hljs-string">[a-z]</span> 一位小写字符
      <span class="hljs-string">[A-Z]</span> 一位大写字母
      <span class="hljs-string">[A-Za-z]</span> 一位字符
      <span class="hljs-string">[0-9A-Za-z]</span> 一位字母或数字
      <span class="hljs-string">[\u4e00-\u9fa5]</span> 一位汉字</code></pre>
<p>反选: <sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup> 除了4和7都行</p>
<h2 id="articleHeader8">8.预定义字符集: 4种:</h2>
<p>d  一位数字  [0-9]<br>  w  一位数字，字母或下划线  [0-9A-Za-z_]<br>   强调: 只有100%匹配时，才使用w，如果不允许有_，则使用自定义字符集<br>  s  一位空字符，比如: 空格，Tab，...<br>  .   通配符<br> 问题: 字符集只能规定字符的内容，无法灵活规定字符的个数</p>
<h2 id="articleHeader9">9.量词:</h2>
<p>什么是: 专门规定一个字符集出现次数的规则<br>  何时: 只要规定字符集出现的次数，都用量词<br>  如何: 字符集量词<br>   强调: 量词默认只修饰相邻的前一个字符集<br>   包括: 2大类:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 有明确数量边界:
 {6,8}  最少6次，最多8次
 {6,}   最少6次，多了不限
 {6}    必须6次，不能多也不能少
2. 没有明确数量边界:
 ?     可有可无，最多1次
 *     可有可无，多了不限
 +     至少1次，多了不限
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">1. 有明确数量边界:
 </span><span class="hljs-template-variable">{6,8}</span><span class="xml">  最少6次，最多8次
 </span><span class="hljs-template-variable">{6,}</span><span class="xml">   最少6次，多了不限
 </span><span class="hljs-template-variable">{6}</span><span class="xml">    必须6次，不能多也不能少
2. 没有明确数量边界:
 ?     可有可无，最多1次
 *     可有可无，多了不限
 +     至少1次，多了不限
</span></code></pre>
<h2 id="articleHeader10">10.选择和分组:</h2>
<ol>
<li>选择: 或<br>  规则1|规则2<br>  何时: 只要在两个规则中任选其一匹配</li>
<li>
<p>分组: (规则1规则2...)<br>  何时: 如果希望一个量词同时修饰多个规则时，都要先将多个规则分为一组，再用量词修饰分组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="比如: 车牌号: [\u4e00-\u9fa5][A-Z]•[0-9A-Z]{5}
比如: 手机号规则: 
\+86或0086  可有可无，最多1次
空字符      可有可无，多了不限
 1
 在3,4,5,7,8中选一个" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>比如: 车牌号: [<span class="hljs-string">\u4e00-\u9fa5</span>][<span class="hljs-symbol">A-Z</span>]•[0-9A-Z]{5}
比如: 手机号规则: 
\+86或0086  可有可无，最多1次
空字符      可有可无，多了不限
 1
 在3,4,5,7,8中选一个</code></pre>
<p>9位数字<br>  (+86|0086)?s*1[34578]d{9}</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 比如: 身份证号:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;"> 比如: 身份证号:</code></pre>
<p>15位数字 2位数字 一位数字或X</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可有可无，最多一次
\d{15}(\d{2}[0-9X])?
比如: 电子邮件: 鄙视" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tex"><code>可有可无，最多一次
<span class="hljs-tag">\<span class="hljs-name">d</span><span class="hljs-string">{15}</span></span>(<span class="hljs-tag">\<span class="hljs-name">d</span><span class="hljs-string">{2}</span><span class="hljs-string">[0-9X]</span></span>)?
比如: 电子邮件: 鄙视</code></pre>
<p>/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ <br>   比如: url: <br>   (https?|ftp|file)://[-A-Za-z0-9+&amp;@#/%?=~_|!:,.;]+[-A-Za-z0-9+&amp;@#/%=~_|]</p>
</li>
</ol>
<h2 id="articleHeader11">11.匹配特殊位置: 3个:</h2>
<ol>
<li>字符串开头: ^</li>
<li>
<p>字符串结尾: $<br> 比如: 开头的空字符: ^s+</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 结尾的空字符: \s+$
 开头或结尾的空字符: ^\s+|\s+$" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code> 结尾的空字符: <span class="hljs-symbol">\s</span>+$
 开头或结尾的空字符: ^<span class="hljs-symbol">\s</span>+|<span class="hljs-symbol">\s</span>+$</code></pre>
<p>3.单词边界: b  包括开头，结尾，空字符，标点符号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="比如: 单词首字母: \b[a-z]
匹配单词: \bxxx\b
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>比如: 单词首字母: \<span class="hljs-selector-tag">b</span>[a-z]
匹配单词: \bxxx\<span class="hljs-selector-tag">b</span>
</code></pre>
</li>
</ol>
<h2 id="articleHeader12">12.String:</h2>
<p>替换: 2种: 如果关键词是固定的: <br>   str=str.replace("关键词","替换值");<br>   如果关键词变化<br>   str=str.replace(/正则/ig,"替换值")；<br> 切割: 2种: 如果分隔符是固定的:<br>   var substrs=str.split("分隔符")<br>   如果分隔符不是固定的<br>   var substrs=str.split(/正则/i)<br>   固定套路: 将字符串打散为字符数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var chars=str.split(&quot;&quot;)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code> var <span class="hljs-keyword">chars</span>=str.<span class="hljs-built_in">split</span>(<span class="hljs-string">""</span>)
</code></pre>
<h2 id="articleHeader13">13.RegExp:</h2>
<p>什么是: 保存一条正则表达式，并提供用正则表达式执行验证和查找的API<br>何时: 只要用正则查找关键词或验证字符串格式时<br>如何: <br> 创建: 2种：</p>
<ol>
<li>直接量: var reg=/正则/ig<br>  何时: 只要正则表达式的规则是固定不变的。<br>  问题: 正则表达式时固定不变的，不支持动态生成</li>
<li>new:  var reg=new RegExp("正则","ig");<br>  何时: 只要需要动态生成正则表达式</li>
</ol>
<p>API: 2个:</p>
<ol>
<li>验证: var bool=reg.test(str)<br> 问题: 默认，只要找到匹配的内容，就返回true，不要求完整匹配!<br> 解决: 今后，凡是验证必须前加^，后加$</li>
<li>查找: 即找每个关键词位置，又获得每个关键词内容<br> var arr=reg.exec(str)<br> 在str中查找下一个关键词的位置和内容<br> 返回值: arr:[ 0: 内容,  index: 位置 ]<br>   如果找不到，返回null<br> 如果找所有: 只要用while反复调用reg.exec即可，exec可自动跳到下一个查找位置</li>
</ol>
<h2 id="articleHeader14">14.Math</h2>
<p>什么是: 保存数学计算的常量和API的对象<br>何时: 进行算术计算<br>如何: <br> 创建: 不用创建，所有API都用Math直接调用<br> API:</p>
<li><ol><li>取整: <br> 上取整: Math.ceil(num)<br> 下取整: <br>  Math.floor(num)<br>  parseInt(str) 去掉字符串结尾非数字字符(单位)<br> 四舍五入取整: <br>  Math.round(num)<br>   优: 返回数字类型，可直接计算<br>   缺: 不能随意指定小数位数<br>  n.toFixed(d) <br>   优: 可随意指定小数位数<br>   缺: 返回字符串类型，不能直接做加法<br> 自定义round</li></ol></li>
<ol>
<li>乘方和开平方:<br> Math.pow(底数,幂)<br> Math.sqrt(num)</li>
<li>最大值和最小值<br> Math.max(值1, 值2,...)<br> Math.min(值1, 值2,...)<br> 问题: 不支持数组<br> 解决: Math.max(...arr)</li>
<li>随机数: <br> Math.random()   0~1 随机小数<br> 公式: 在min到max之间取一个随机整数<br>  parseInt(Math.random()*(max-min+1)+min)<br>  简写: 在0~max之间取一个随机整数<br>  parseInt(Math.random()*(max+1))</li>
<li>
<p>三角函数: <br> 已知角度，求边长，用三角函数: sin    cos    tan<br> 已知边长，求角度，用反三角函数: asin  acos   atan<br> 仅以atan: <br>  var 弧度=Math.atan(对边长/邻边长)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="360角度=2π弧度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">360</span>角度=<span class="hljs-number">2</span>π弧度</code></pre>
<p>问题: atan无法区分角度的象限<br>  解决: Math.atan2(对边长, 邻边长);</p>
</li>
</ol>
<h2 id="articleHeader15">15.Date:</h2>
<p>什么是: 保存一个时间，提供操作时间的API<br>何时: 只要在程序中存储时间或操作时间，都用date<br>如何: <br> 创建: 4种:</p>
<ol>
<li>创建日期对象，并自动获得客户端当前系统时间<br>  var now=new Date();</li>
<li>创建日期对象，保存自定义时间<br>  var now=new Date("yyyy/MM/dd hh:mm:ss");</li>
<li>用毫秒数创建日期对象:<br>  var date=new Date(ms)</li>
<li>复制一个日期对象: <br>  问题: 日期的计算都是直接修改原日期对象<br>  解决: 如果希望同时保留计算前后的开始和结束时间，都要先复制开始时间，再用副本计算结束时间<br>  var date2=new Date(date1)</li>
</ol>
<p>本质: 起始日期对象内部保存的是一个巨大的毫秒数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1970年1月1日至今的毫秒数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;"><span class="hljs-number">1970</span>年<span class="hljs-number">1</span>月<span class="hljs-number">1</span>日至今的毫秒数</code></pre>
<p>文字存储日期的问题:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 有时区问题:
2. 不便于计算:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>有时区问题:
<span class="hljs-bullet">2. </span>不便于计算:</code></pre>
<p>毫秒数存储日期:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 不受时区的干扰: 
2. 便于计算: " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>不受时区的干扰: 
<span class="hljs-bullet">2. </span>便于计算: </code></pre>
<p>总结: 将来在网络中传输或在数据库中存储时间，都用毫秒数</p>
<h2 id="articleHeader16">16.API:</h2>
<ol>
<li>8个单位: <br> FullYear   Month   Date   Day<br> Hours    Minutes  Seconds  Milliseconds</li>
<li>每个单位上都有一对儿get/set方法:<br> getXXX() 负责获得单位的值<br> setXXX() 负责修改单位的值<br> 特例: Day 不能修改，没有setDay()</li>
<li>取值范围: <br> Month: 0~11 计算机中的月份总是比现实中小1<br> Date: 1~31 <br> Day: 0~6 <br> Hours: 0~23 <br> Minutes/Seconds: 0~59</li>
</ol>
<p>日期计算:</p>
<ol>
<li>两日期相减: 得到的是毫秒差<br> 何时: 计算时间段或计算倒计时</li>
<li>
<p>对任意单位做加减: 3步:</p>
<ol>
<li>获得单位的当前值</li>
<li>做加减</li>
<li>将计算后的结果set回去<br>  setXXX()可自动调整时间进制</li>
</ol>
</li>
</ol>
<p>可简化为: date.setXXX(date.getXXX()+n)<br>   问题: setXXX()直接修改原日期<br>   解决: 如果同时保存计算前后的开始和结束时间，应该先复制副本，再用副本计算。</p>
<h2 id="articleHeader17">17.Date:</h2>
<p>日期格式化: <br>  date.toString() 默认当地时间的完整版格式<br>  date.toLocaleString() 转为当地时间的简化版格式<br>  date.toLocaleDateString() 仅保留日期部分  <br>  date.toLocaleTimeString() 仅保留时间部分</p>
<h2 id="articleHeader18">18.Error:</h2>
<p>什么是错误: 程序执行过程中，遇到的无法继续执行的异常情况<br>程序出错，都会强行中断退出。<br>什么是错误处理: 即使程序出错！也保证不会中断退出<br>何时: 如果希望程序，即使出错，也不会强行中断退出<br>如何: <br> try{<br>  可能出错的正常代码<br> }catch(err){<br>  //err: 错误对象, 自动保存了错误的信息<br>  只有出错才执行的错误处理代码:<br>  提示错误信息, 记录日志, 释放资源<br> }<br> 问题: 效率略低<br> 解决: 多数try catch，都能用if...else代替</p>
<p>主动抛出错误: <br> throw new Error("错误信息")<br>鄙视: js中共有几种错误类型: 6种:<br> SyntaxError  语法错误<br> ReferenceError 引用错误<br> TypeError 类型错误<br> RangeError 范围错误  参数超范围</p>
<p>EvalError   URIError</p>
<h2 id="articleHeader19">19.Function:</h2>
<p>什么是函数: 保存一段代码段的对象，再起一个名字。<br>为什么: 代码重用<br>何时: 只要一段代码可能被重复使用时！<br>如何: <br> 创建: 3种:</p>
<ol>
<li>
<p>声明: function 函数名(参数列表){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      函数体;
      return 返回值;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>      函数体<span class="hljs-comment">;</span>
      return 返回值<span class="hljs-comment">;</span>
    }</code></pre>
<p>参数: 调用函数时，接收传入函数的数据的变量<br>   何时: 如果函数自身必须某些数据才能正常执行时，就必须定义参数，从外部接收必须的数据<br>  返回值: 函数的执行结果<br>   何时: 如果调用者需要获得函数的执行结果时<br>  调用: var 返回值=函数名(参数值列表);<br> 问题: 声明提前: 在程序开始执行前，先将var声明的变量和function声明的函数，提前到当前作用域的顶部集中创建。赋值留在原地。<br> 解决:</p>
</li>
<li>
<p>直接量: var 函数名=function (参数列表){<br> 特点: 不会被声明提前<br> 揭示: 函数名其实只是一个变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  函数其实是一个保存代码段的对象
  函数名通过对象地址引用函数对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>  函数其实是一个保存代码段的对象
  函数名通过对象地址引用函数对象</code></pre>
</li>
<li>new : <br> var 函数名=<br>  new Function("参数1","参数2",...,"函数体")</li>
</ol>
<h2 id="articleHeader20">20.重载overload:</h2>
<p>什么是: 多个相同函数名，不同参数列表的函数，在调用时，可根据传入的参数不同，自动执行不同的操作。<br> 为什么: 为了减少API的数量，减轻调用者的负担<br>   何时: 只要一项任务，可能根据传入参数的不同，执行不同的流程时。<br>   如何: js语法默认不支持重载!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 因为: js中不允许多个同名函数，同时存在。最后一个函数会覆盖之前的。
变通实现: arguments
 什么是: 每个函数中，自动包含的，接收所有传入函数的参数值的类数组对象
   类数组对象: 长得像数组的对象
     vs 数组: 相同: 1. 下标, 2. .length, 3. 遍历
             不同: 类型不同, API不通用
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code> 因为: js中不允许多个同名函数，同时存在。最后一个函数会覆盖之前的。
变通实现: arguments
 什么是: 每个函数中，自动包含的，接收所有传入函数的参数值的类数组对象
   类数组对象: 长得像数组的对象
     vs 数组: 相同: <span class="hljs-number">1</span>. 下标, <span class="hljs-number">2</span>. <span class="hljs-selector-class">.length</span>, <span class="hljs-number">3</span>. 遍历
             不同: 类型不同, API不通用
</code></pre>
<h2 id="articleHeader21">21.匿名函数:</h2>
<p>什么是: 定义函数时，不指定函数名<br>为什么: 节约内存 或 划分临时作用域<br>  何时:</p>
<ol>
<li>只要一个函数，希望调用后，立刻自动释放！</li>
<li>划分临时作用域:</li>
</ol>
<p>如何:</p>
<ol>
<li>回调: 定义函数后，自己不调用，而是传递给另一个函数去调用</li>
<li>自调: 定义函数后，立刻调用自己。<br>  何时: 今后所有js代码必须都放在匿名函数自调中，避免全局污染。</li>
</ol>
<h2 id="articleHeader22">22.垃圾回收:</h2>
<p>什么是垃圾: 一个不再被任何变量使用的对象<br>什么是垃圾回收: js引擎会自动回收不再被使用的对象的空间。<br>为什么: 内存空间都是有限的！<br>垃圾回收器: 专门负责回收垃圾对象的小程序——js引擎自带<br>如何:</p>
<ol>
<li>程序执行时，垃圾回收器伴随主程序执行而执行。</li>
<li>每创建一个对象，垃圾回收器就会记录对象被几个变量引用着.</li>
<li>如果发现一个对象不再被任何变量应用，则自动回收该对象的存储空间。</li>
</ol>
<p>好的习惯: 只要一个对象不再使用，就要赋值为null</p>
<h2 id="articleHeader23">23.作用域和作用域链</h2>
<p>作用域(scope): 一个变量的可用范围<br> 为什么: 避免内部的变量影响外部<br> 本质: 是一个存储变量的对象<br> 包括: 2种:</p>
<ol>
<li>全局作用域: window<br>  保存全局变量: 随处可用，可反复使用</li>
<li>函数作用域: ?<br>  保存局部变量: 仅在函数内可用，且不可重用!</li>
</ol>
<h2 id="articleHeader24">24.函数生命周期:</h2>
<ol>
<li>
<p>程序开始执行前<br>  在内存中创建执行环境栈(数组): 用于保存正在调用的函数任务。<br>  在执行环境站中添加第一条记录: 调用浏览器主程序<br>  创建全局作用域对象window: 2个作用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 保存浏览器自己需要的数据和对象
2. 作为程序的全局作用域对象，保存全局变量" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>保存浏览器自己需要的数据和对象
<span class="hljs-bullet">2. </span>作为程序的全局作用域对象，保存全局变量</code></pre>
</li>
<li>定义函数时:<br>  在window中定义函数名变量<br>  创建函数对象保存函数定义<br>  函数名变量引用函数对象<br>  函数对象的scope属性，又指回了函数创建时的作用域</li>
<li>调用函数时<br>  在执行环境栈中添加了本次函数调用的记录<br>  创建本次函数调用的函数作用域对象AO<br>  在AO中添加函数的局部变量<br>  设置AO的parent指向函数的scope<br>  执行环境栈中的函数调用记录，引用AO<br>  变量的使用顺序: 先用局部，再用全局</li>
<li>函数调用后<br>  本次函数调用的记录从执行环境栈中出栈<br>  导致AO被释放, 导致所有局部变量都释放</li>
</ol>
<h2 id="articleHeader25">25.作用域链:</h2>
<p>什么是: 由多级作用域对象，逐级引用形成的链式结构<br>2个作用:</p>
<ol>
<li>保存所有变量</li>
<li>控制着变量的使用顺序！</li>
</ol>
<h2 id="articleHeader26">26.闭包closure:</h2>
<p>什么是: 即重用一个变量，又保护变量不被污染的一种机制<br>为什么: 全局变量和局部变量都具有不可兼得的优缺点:<br> 全局变量: 优: 可重用, 缺: 易被污染<br> 局部变量: 优: 仅函数内可用，不会被污染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       缺: 不可重用!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code style="word-break: break-word; white-space: initial;">       缺: 不可重用!</code></pre>
<p>何时: 只要一个变量，可能被重用，又不想被篡改<br>如何: 3步:</p>
<ol>
<li>用外层函数包裹要保护的变量和内层函数</li>
<li>外层函数将内层函数返回到外部</li>
<li>调用外层函数，获得内层函数的对象，保存在外部的变量中——形成了闭包</li>
</ol>
<p>闭包形成的原因: 外层函数调用后，外层函数的函数作用域对象无法释放<br>主动使用闭包: 为一个函数绑定一个专属的变量<br>鄙视: 画简图</p>
<ol>
<li>找受保护的变量，并确定其最终值</li>
<li>
<p>找内层函数对象<br> 外层函数向外返回内层函数对象: 3种:</p>
<ol>
<li>return function(){}</li>
<li>全局变量=function(){}</li>
<li>return arr/obj{function(){..."}}"</li>
</ol>
</li>
</ol>
<h2 id="articleHeader27">27.OOP</h2>
<p>什么是对象: 内存中存储多个数据的独立存储空间都称为一个对象。<br>什么是面向对象: 程序中都是用对象结构来描述现实中一个具体事物。<br>为什么: 为了便于大量数据的维护和查找<br>何时: 几乎所有js程序，都使用面向对象的方式开发<br>如何: 三大特点: 封装，继承，多态<br> 封装: 用对象来集中描述现实中一个具体事物的属性和功能<br>  为什么: 便于维护和查找<br>  何时: 今后只要使用面向对象的方式开发，都要先封装对象，再按需使用对象的属性和功能。<br>  如何: 3种:</p>
<ol><li>
<p>用{}: <br>  var obj={<br>   属性名:值,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ... : ... ," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">  ... : ... ,</code></pre>
<p>//方法名:function(){...},<br>   方法名 (){...},<br>  }<br>  其中: 事物的属性值会成为对象的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    对象的属性本质是保存在对象中的一个变量
 事物的功能会成为对象的方法!
    方法的本质是保存在对象中的一个函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code>    对象的属性本质是保存在对象中的一个变量
 事物的功能会成为对象的方法!
    方法的本质是保存在对象中的一个函数</code></pre>
<p>如何访问对象的成员: <br>  访问对象的属性: 对象.属性名<br>  调用对象的方法: 对象.方法名()<br> 问题: 对象自己的方法中要使用对象自己的属性<br>  错误: 直接用属性名,报错: 找不到变量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为什么: 默认，不加.就使用的变量，只能在作用域链中查找，无法自动进入对象中" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">为什么: 默认，不加.就使用的变量，只能在作用域链中查找，无法自动进入对象中</code></pre>
<p>解决一: 对象名.属性名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="问题: 对象名仅是一个普通的变量名，可能发生变化。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">问题: 对象名仅是一个普通的变量名，可能发生变化。</code></pre>
<p>正确解决: this.属性名<br>   this: 自动指正在调用当前方法的.前的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="为什么: 不受对象名变量的影响
何时: 只要对象自己的方法向访问对象自己的属性时，都必须加this." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>为什么: 不受对象名变量的影响
何时: 只要对象自己的方法向访问对象自己的属性时，都必须加<span class="hljs-keyword">this</span>.</code></pre>
</li></ol>
<p>js中对象的本质，其实就是一个关联数组</p>
<ol><li>用new: <br> var obj=new Object(); //创建空对象 等效于{}<br> obj.属性名=值;<br> obj.方法名=function(){<br>   ... this.属性名 ...<br> }</li></ol>
<p>和关联数组一样，js中的对象也可随时添加新属性和方法。<br>   问题: 反复创建多个相同结构的对象时，重复代码太多，导致不便于维护<br>   解决:</p>
<ol><li>
<p>用构造函数:<br> 构造函数: 描述一类对象统一结构的函数<br> 为什么: 为了重用结构代码!<br> 何时: 只要反复创建相同结构的多个对象时，都用构造函数<br> 如何: 2步:</p>
<ol>
<li>
<p>定义构造函数<br> function 类型名(属性参数列表){<br>  this.属性名=属性参数;<br>  this. ... = 属性参数;<br>  this.方法名=function(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.xxx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.xxx</code></pre>
<p>}<br> }</p>
</li>
<li>
<p>调用构造函数创建新对象<br> var obj=new 类型名(属性值列表)<br> new: 1. 创建新的空对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2. 设置新对象继承构造函数的原型对象
 3. 用新对象调用构造函数
   将构造函数中的this都指向新对象
 4. 返回新对象的地址" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code> <span class="hljs-number">2.</span> 设置新对象继承构造函数的原型对象
 <span class="hljs-number">3.</span> 用新对象调用构造函数
   将构造函数中的this都指向新对象
 <span class="hljs-number">4.</span> 返回新对象的地址</code></pre>
</li>
</ol>
</li></ol>
<p>问题: 构造函数只能重用代码，无法节约内存!<br>  解决: 继承:</p>
<h2 id="articleHeader28">28.继承:</h2>
<p>什么是: 父对象的成员，子对象无需创建，就可直接使用<br>  为什么: 代码重用，节约内存<br>   何时: 只要多个子对象，拥有相同的成员时，都应只在父对象中定义一份，所有子对象共用即可！<br>   如何: js中继承都是通过原型对象实现的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="什么是原型对象: 集中存储同一类型的所有子对象，共用成员的父对象
何时: 只要继承，必然原型对象
如何: 
 创建: 不用创建，买一赠一
   每创建一个构造函数，都附赠一个原型对象 
 继承: 在创建子对象时，new的第2步自动设置子对象继承构造函数的原型对象
 访问成员: 优先访问自有成员
          自己没有，就去父对象(原型对象)中查找
 将成员添加到原型对象中: 
  构造函数.prototype.成员=值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elm"><code>什么是原型对象: 集中存储同一类型的所有子对象，共用成员的父对象
何时: 只要继承，必然原型对象
如何: 
 创建: 不用创建，买一赠一
   每创建一个构造函数，都附赠一个原型对象 
 继承: 在创建子对象时，new的第<span class="hljs-number">2</span>步自动设置子对象继承构造函数的原型对象
 访问成员: 优先访问自有成员
          自己没有，就去父对象(原型对象)中查找
 将成员添加到原型对象中: 
  构造函数.proto<span class="hljs-keyword">type</span>.成员=值</code></pre>
<p>自有属性和共有属性: <br>   自有属性: 保存在当前对象本地,仅归当前对象独有的属性<br>   共有属性: 保存在父对象中，所有子对象共有的属性<br>   读取属性值: 子对象.属性<br>   修改属性值: 自有属性，必须通过子对象自己修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="           共有属性，只能用原型对象修改！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">           共有属性，只能用原型对象修改！</code></pre>
<p>内置对象的原型对象: <br>   鄙视: 内置对象: 11个:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="String Number Boolean ——包装类型对象
Array Date RegExp Math
Error
Function  Object
Global (在浏览器中，被window代替)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">String</span> <span class="hljs-built_in">Number</span> <span class="hljs-built_in">Boolean</span> ——包装类型对象
<span class="hljs-built_in">Array</span> <span class="hljs-built_in">Date</span> <span class="hljs-built_in">RegExp</span> <span class="hljs-built_in">Math</span>
<span class="hljs-built_in">Error</span>
<span class="hljs-built_in">Function</span>  <span class="hljs-built_in">Object</span>
Global (在浏览器中，被<span class="hljs-built_in">window</span>代替)</code></pre>
<p>鄙视: 包装类型的理解</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="什么是: 保存一个原始类型的值，并提供操作原始类型值的API
为什么: 原始类型的值本身不具有任何功能
何时: 只要试图对原始类型的值调用API时，都会自动使用包装类型对象来帮助原始类型的值执行操作。
如何: 
 1. 内存中已经预置了三大包装类型的对象:
   String  Number  Boolean
 2. 在试图对原始类型的值调用API时，自动检测原始类型的值的类型名
   var n=345.678;
     typeof n => number
 3. 根据类型名实例化对应的包装类型对象，调用其API
   new Number(n).toFixed(2) => 345.68
 4. 执行后，包装类型对象自动释放
   new Number释放！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>什么是: 保存一个原始类型的值，并提供操作原始类型值的API
为什么: 原始类型的值本身不具有任何功能
何时: 只要试图对原始类型的值调用API时，都会自动使用包装类型对象来帮助原始类型的值执行操作。
如何: 
 <span class="hljs-number">1.</span> 内存中已经预置了三大包装类型的对象:
   <span class="hljs-built_in">String</span>  <span class="hljs-built_in">Number</span>  <span class="hljs-built_in">Boolean</span>
 <span class="hljs-number">2.</span> 在试图对原始类型的值调用API时，自动检测原始类型的值的类型名
   <span class="hljs-keyword">var</span> n=<span class="hljs-number">345.678</span>;
     <span class="hljs-keyword">typeof</span> n =&gt; <span class="hljs-built_in">number</span>
 <span class="hljs-number">3.</span> 根据类型名实例化对应的包装类型对象，调用其API
   <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>(n).toFixed(<span class="hljs-number">2</span>) =&gt; <span class="hljs-number">345.68</span>
 <span class="hljs-number">4.</span> 执行后，包装类型对象自动释放
   <span class="hljs-keyword">new</span> <span class="hljs-built_in">Number</span>释放！
</code></pre>
<h2 id="articleHeader29">29.OOP</h2>
<p>面向对象三大特点: 封装，继承，多态<br>继承:<br> 原型对象:<br>  内置类型的原型对象: <br>   一种类型: 包含两部分:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 构造函数: 创建该类型的子对象
2. 原型对象: 保存所有子对象的共有成员" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>构造函数: 创建该类型的子对象
<span class="hljs-bullet">2. </span>原型对象: 保存所有子对象的共有成员</code></pre>
<p>解决浏览器兼容性问题: 旧浏览器无法使用新API</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 判断当前浏览器对应类型的原型对象中是否包含该API
2. 如果不包含，则自定义该API，添加到对应类型的原型对象中
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>判断当前浏览器对应类型的原型对象中是否包含该API
<span class="hljs-bullet">2. </span>如果不包含，则自定义该API，添加到对应类型的原型对象中
</code></pre>
<h2 id="articleHeader30">30.原型链:</h2>
<p>什么是: 由多级父对象，逐级继承形成的链式结构<br>  保存着: 所有对象的属性<br>  控制着: 对象属性的使用顺序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="先自有，再共有" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">先自有，再共有</code></pre>
<p>鄙视: 如何判断一个对象是数组类型? 有几种方法<br>  错误: typeof : 只能区分原始类型，函数，无法进一步区分引用类型对象的具体类型名<br>  正确: 4种:</p>
<ol>
<li>判断原型对象: <br> obj.__proto__==Array.prototype<br> Array.prototype.isPrototypeOf(obj)</li>
<li>判断构造函数:<br> obj.constructor==Array<br> obj instanceof Array</li>
</ol>
<p>问题: 不严格, 不但检查直接父对象，且检查整个原型链</p>
<ol><li>判断对象内部的class属性</li></ol>
<p>class属性: 对象内部的专门记录对象创建时的类型名的属性<br>   问题1: class属性是内部属性，无法用.直接访问<br>   解决: 唯一的办法: Object.prototype.toString()<br>   问题2: 每种类型的原型对象都重写了各自不同的toString()方法，子对象无法调用到Object.prototype.toString()<br>   解决: fun.call(obj)  让obj强行调用任何一个fun</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.prototype.toString.call(obj)
  在执行的一瞬间: obj.toString()
  结果:&quot;[object Class]&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Object</span><span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.toString</span><span class="hljs-selector-class">.call</span>(<span class="hljs-selector-tag">obj</span>)
  在执行的一瞬间: <span class="hljs-selector-tag">obj</span><span class="hljs-selector-class">.toString</span>()
  结果<span class="hljs-selector-pseudo">:"</span><span class="hljs-selector-attr">[object Class]</span>"
</code></pre>
<p>鄙视: 何时将方法定义在原型对象中，何时将方法定义在构造函数上<br> 实例方法和静态方法: <br>  实例方法: 必须该类型的子对象才能调用的方法<br>   比如: arr.sort()  arr.push()<br>   何时: 只要要求必须该类型的子对象才能调用<br>   如何: 所有放在原型对象中的方法都是实例方法<br>  静态方法: 不需要创建该类型的子对象，任何对象都可使用的方法。<br>   比如: Array.isArray(fun)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Array.isArray(date)
    Array.isArray(obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vbscript"><code>    <span class="hljs-built_in">Array</span>.<span class="hljs-built_in">isArray</span>(<span class="hljs-built_in">date</span>)
    <span class="hljs-built_in">Array</span>.<span class="hljs-built_in">isArray</span>(obj)</code></pre>
<p>何时: 不确定将来调用该函数的对象类型时<br>   如何: 添加到构造函数对象上的方法都是静态方法。可通过构造函数.静态方法方式直接调用！</p>
<h2 id="articleHeader31">31.多态:</h2>
<p>什么是: 一个方法在不同情况下表现出不同的状态<br>包括:</p>
<ol>
<li>重载overload:</li>
<li>重写override: <br> 什么是: 如果子对象觉得从父对象继承来的成员不好用，可在本地定义同名的自有成员，覆盖父对象的成员<br> 为什么: 觉得从父对象继承来的成员不好用<br> 何时: 只要觉得从父对象继承来的成员不好用<br> 如何: 在本地定义同名的自有成员</li>
</ol>
<h2 id="articleHeader32">32.自定义继承:</h2>
<ol>
<li>只修改一个对象的父对象<br>obj.__proto__=father<br>Object.setPrototypeOf(obj,father)</li>
<li>修改所有子对象的父对象:<br>构造函数.prototype=father<br>时机: 在创建子对象之前换!</li>
<li>
<p>两种类型间的继承: <br>何时: 发现多个类型之间拥有部分相同的属性结构和方法定义时，都要抽象父类型出来<br>如何: 2步:</p>
<ol>
<li>
<p>定义抽象父类型: 2步:</p>
<ol>
<li>定义构造函数保存公共的属性结构</li>
<li>定义原型对象保存公共的方法</li>
</ol>
</li>
<li>
<p>让子类型继承父类型: 2步:</p>
<ol>
<li>在子类型构造函数中借用父类型构造函数<br> 错误: 直接调用: Flyer(fname,speed)<br>   原因: Flyer不用.不用new调用，其中的this默认指window,Flyer中所有属性泄露到全局<br> 正确: 用call将正确的this注入到Flyer中，代替错误的this<br>   如何: Flyer.call(正确的this, fname,speed)</li>
<li>让子类型原型对象继承父类型原型对象<br>  Object.setPrototypeOf(子类型原型,父类型原型)</li>
</ol>
</li>
</ol>
</li>
</ol>
<h2 id="articleHeader33">33.ECMAScript6</h2>
<ol><li>
<p>严格模式:<br>什么是: 比普通js运行机制要求更严格的模式<br>为什么: 普通的js运行机制有很多广受诟病的缺陷<br>何时: 今后所有项目必须运行在严格模式下</p>
<ol>
<li>如果新项目，整个js文件启用严格模式</li>
<li>旧项目，逐个函数启用严格模式</li>
</ol>
</li></ol>
<p>如何:</p>
<ol>
<li>在script或整个js文件顶部，添加"use strict";</li>
<li>在函数内顶部，添加"use strict";</li>
</ol>
<p>规则: 4个:</p>
<ol>
<li>禁止给未声明的变量赋值</li>
<li>将静默失败升级为错误</li>
<li>普通函数或匿名函数自调中的this默认不再指向window，而是undefined</li>
<li>禁止使用arguments, arguments.callee,...</li>
</ol>
<p>补: arguments.callee 自动获得当前正在调用的函数本身<br>  禁用，说明强烈不推荐使用递归！</p>
<h2 id="articleHeader34">34.保护对象:</h2>
<p>保护对象的属性:<br>ES5将对象属性分为:<br> 命名属性: 可用.直接访问到的属性<br>  数据属性: 直接存储属性值的属性<br>   保护数据属性: 4大特性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="一个属性包含四大特性:{
  value: 实际保存属性值,
  writable: true/false, //只读
  enumerable: true/false, //不可遍历
    //不是彻底隐藏，用.依然可访问！
  configurable:true/false //1. 禁止删除
                     //2. 禁止修改其它特性
                     //一旦改为false，不可逆
}
获取一个属性的四大特性:
var attrs=Object.getOwnPropertyDescriptor(obj,&quot;属性&quot;)
修改四大特性:
Object.defineProperty(obj,&quot;属性&quot;,{
  四大特性:值
})
简写: Object.defineProperties(obj,{
       属性名:{
         特性:值,
         特性:值,
       },
       属性名:{
         ... : ...
       }
     })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>一个属性包含四大特性:{
  value: 实际保存属性值,
  writable: <span class="hljs-keyword">true</span>/<span class="hljs-keyword">false</span>, <span class="hljs-comment">//只读</span>
  enumerable: <span class="hljs-keyword">true</span>/<span class="hljs-keyword">false</span>, <span class="hljs-comment">//不可遍历</span>
    <span class="hljs-comment">//不是彻底隐藏，用.依然可访问！</span>
  configurable:<span class="hljs-keyword">true</span>/<span class="hljs-keyword">false</span> <span class="hljs-comment">//1. 禁止删除</span>
                     <span class="hljs-comment">//2. 禁止修改其它特性</span>
                     <span class="hljs-comment">//一旦改为false，不可逆</span>
}
获取一个属性的四大特性:
<span class="hljs-keyword">var</span> attrs=<span class="hljs-built_in">Object</span>.getOwnPropertyDescriptor(obj,<span class="hljs-string">"属性"</span>)
修改四大特性:
<span class="hljs-built_in">Object</span>.defineProperty(obj,<span class="hljs-string">"属性"</span>,{
  四大特性:值
})
简写: <span class="hljs-built_in">Object</span>.defineProperties(obj,{
       属性名:{
         特性:值,
         特性:值,
       },
       属性名:{
         ... : ...
       }
     })</code></pre>
<p>访问器属性: 不直接存储属性值，仅提供对另一个数据属性的保护<br>   何时: 只要对一个属性提供自定义规则的保护<br>   如何:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="添加: 只能用Object.defineProperty和defineProperties添加
四大特性: {
  get(){ return this.数据属性 }
  set(val){ 
    如果验证val通过
      this.数据属性=val
    否则
      报错
  }
  enumerable:
  configurable:
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>添加: 只能用Object.defineProperty和defineProperties添加
四大特性: {
  <span class="hljs-keyword">get</span>(){ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.数据属性 }
  <span class="hljs-keyword">set</span>(<span class="hljs-keyword">val</span>){ 
    如果验证<span class="hljs-keyword">val</span>通过
      <span class="hljs-keyword">this</span>.数据属性=<span class="hljs-keyword">val</span>
    否则
      报错
  }
  enumerable:
  configurable:
}</code></pre>
<p>如何使用: 同普通的数据属性用法一样!</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 在取值时，自动调用访问器属性内部的get
 在赋值时，自动调用访问器属性内部的set方法，同时将等号右边的新值，交给val参数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> 在取值时，自动调用访问器属性内部的<span class="hljs-keyword">get</span>
 在赋值时，自动调用访问器属性内部的<span class="hljs-keyword">set</span>方法，同时将等号右边的新值，交给<span class="hljs-keyword">val</span>参数</code></pre>
<p>问题: enumerable只能防住for in,防不住.，依然可用.直接修改被保护的数据属性<br>   解决: <br> 内部属性: 不能用.直接访问到的属性<br>  比如: class  <strong>proto</strong></p>
<p>保护对象的结构: 3种</p>
<li><ol>
<li>
<p>防扩展: 禁止给对象添加新属性<br>Object.preventExtensions(obj)<br>原理: 内部属性: extensible:true</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  preventExtensions将extensible改为false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">  preventExtensions将extensible改为<span class="hljs-literal">false</span></code></pre>
</li>
<li>
<p>密封: 在防扩展同时，禁止删除现有属性<br>Object.seal(obj)<br>原理: 1. 将extensible改为false，禁止扩展</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2. 自动将所有属性的configurable都改为false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-number">2.</span> 自动将所有属性的configurable都改为<span class="hljs-literal">false</span></code></pre>
</li>
<li>
<p>冻结: 在密封的同时，禁止修改一切属性值<br>Object.freeze(obj)<br>原理: 1. 兼具密封的所有功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 2. 又将每个属性的writable自动改为false！
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-number">2.</span> 又将每个属性的writable自动改为<span class="hljs-literal">false</span>！
</code></pre>
</li>
</ol></li>
<ol><li>
<p>Object.create()<br>仅用父对象，就可创建子对象, <br>同时还可为子对象扩展自有属性<br>var child=Object.create(father,{<br>  //Object.defineProperties<br>  属性名:{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="特性:值,
特性:值," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>特性:值,
特性:值,</code></pre>
<p>}<br>})<br>鄙视: 描述Object.create的执行原理</p>
<ol>
<li>创建空对象child</li>
<li>自动设置child的__proto__为father</li>
<li>为child扩展新的自有属性</li>
</ol>
</li></ol>
<h2 id="articleHeader35">35.call/apply/bind</h2>
<p>替换函数中不想要的this！<br> call/apply: 立刻调用函数，并临时替换中的this为指定对象<br>  何时: 只要调用函数时，函数中的this不是想要的就用call换成想要的<br>  如果传入函数的参数，是以数组形式，整体传入<br>  就用.apply(obj,arr)<br> bind: 基于原函数，创建一个新函数，并永久绑定this为指定对象<br>  何时: 不会立刻调用的函数(回调函数)中的this，不是想要的，就可用bind创建一个新函数，并永久绑定this！</p>
<h2 id="articleHeader36">36.数组API:</h2>
<p>判断:</p>
<ol>
<li>
<p>判断数组中所有元素是否都符合条件<br>  arr.every(function(elem,i,arr){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//elem: 当前元素值
//i: 当前位置 
//arr: 当前数组对象
return 判断条件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//elem: 当前元素值</span>
<span class="hljs-comment">//i: 当前位置 </span>
<span class="hljs-comment">//arr: 当前数组对象</span>
<span class="hljs-keyword">return</span> 判断条件</code></pre>
<p>})</p>
</li>
<li>
<p>判断数组中是否包含符合条件的元素<br>  arr.some(function(elem,i,arr){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return 判断条件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">return</span> 判断条件</code></pre>
<p>})</p>
</li>
</ol>
<p>遍历:</p>
<ol>
<li>forEach: 对原数组中每个元素执行相同的操作<br> arr.forEach(function(elem,i,arr){<br>   arr[i]=新值<br> })</li>
<li>map: 依次取出原数组中每个元素执行相同操作后，放入新数组。原数组不变<br> arr.map(function(elem,i,arr){<br>   return 新值<br> })</li>
</ol>
<p>过滤和汇总:</p>
<ol>
<li>过滤: 复制出原数组中符合条件的元素，放入新数组返回<br> var subs=arr.filter(function(elem,i,arr){<br>   return 判断条件<br> })</li>
<li>汇总: 将原数组中所有值统计出一个最终结论<br> var result=arr.reduce(function(prev,elem,i,arr){<br>   //prev: 截止到目前，之前的临时汇总值<br>   return prev+elem;<br> })</li>
</ol>
<h2 id="articleHeader37">37.let: 代替var</h2>
<p>为什么<br> 问题1: 声明提前, 破坏程序原有执行顺序<br> 解决: let禁止在声明之前，提前使用该变量<br> 问题2: js没有块级作用域, 块内的变量，会污染到块外<br> 解决: let会将当前所在if/for/while...(){}变成块级作用域</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  后果: 块内的let出的变量不会影响外部！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code style="word-break: break-word; white-space: initial;">  后果: 块内的<span class="hljs-built_in">let</span>出的变量不会影响外部！</code></pre>
<p>原理: 其实let就是匿名函数自调！<br>let与for循环，可形成闭包的效果<br>强调: 原来块内外都可使用的变量，出了块，就不能用了！</p>
<h2 id="articleHeader38">38.参数增强:</h2>
<p>默认值: function fun(参数1, 参数2,...,参数n=默认值)<br>  强调: 带默认值的参数必须定义在列表末尾<br>  原理: 参数n=参数n||默认值;<br>rest: 代替了arguments<br> 何时: 当函数，不确定参数个数时——重载<br> 为什么: arguments的缺点:</p>
<ol>
<li>类数组对象，不是数组</li>
<li>只能后去全部，不能有选择的分段获取</li>
</ol>
<p>如何: 定义函数时: function fun(参数1,参数2,...,  ...数组名)<br>   数组名, 是一个纯正的数组，且可有选择的分段获取<br> 原理: var arr=[].slice.call(arguments[,starti]);//将类数组对象转为数组<br>spread: 代替apply<br> 为什么: apply虽然可打散数组类型参数为单个值，但是必须和替换this的操作捆绑使用<br> 何时: 只要仅需要打散数组类型参数为单个值时<br> 如何: 调用时: fun(参数值1,参数值2,...数组)</p>
<ol><li>箭头函数: 代替回调函数中的function</li></ol>
<hr>
<p>何时: 只要回调函数，都不再使用function，而是使用箭头函数<br> 如何:</p>
<ol>
<li>去function改=&gt;</li>
<li>如果只有一个参数，可省略()</li>
<li>
<p>如果函数体只有一句话，则{}可省略</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="更简化: 如果仅有的一句话还是return，可省略return
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>更简化: 如果仅有的一句话还是<span class="hljs-keyword">return</span>，可省略<span class="hljs-keyword">return</span>
</code></pre>
</li>
</ol>
<p>特点: 内外共用同一个this ——代替bind<br>  问题: 如果反而希望内外this不通用时，就不能用箭头函数</p>
<h2 id="articleHeader39">40.模板字符串: 代替+号拼接字符串</h2>
<p>ESLint规定，不允许使用+拼接字符串<br> 如何:</p>
<ol>
<li>定义模板: 左右模板内容都必须放在``中</li>
<li>在模板中嵌入变量或表达式，动态生成内容:<br>  模板内，可用${...}嵌入任何合法的js变量或语句</li>
</ol>
<h2 id="articleHeader40">41.解构: 简化批量赋值</h2>
<p>什么是: 将一个对象/数组中的成员和元素，分别提取出来，单独使用。<br> 为什么: 避免反复使用对象名/数组名<br> 何时: 只要希望将一个大的对象或数组中的每个成员单独取出使用时<br> 如何: 3种:</p>
<ol>
<li>数组解构: 下标对下标</li>
<li>对象解构: 属性对属性</li>
<li>参数解构: 属性对属性<br> 定义函数时: <br>  问题: 普通函数的参数列表的顺序和个数是固定的<br>  解决: 使用对象语法定义参数列表<br>   优点: 将来传入的参数个数，顺序与对象列表无关<br> 调用函数: 也用对象语法传入参数<br> 赋值过程中，采用对象结构的方式，为参数变量赋值</li>
</ol>
<h2 id="articleHeader41">42.for...of 在特定情况下，代替for循环</h2>
<p>什么是: 依次遍历数组/类数组对象中每个元素的值<br>  vs for...in: 依次遍历关联数组/对象中每个成员的属性名<br> 何时: 如果希望从头到尾遍历整个数组或类数组对象<br> 如何: for(var elem of arr){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    elem
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">elem</span>
  }</code></pre>
<p>局限: 无法获得当前位置; 无法控制遍历的进度/顺序; 无法有选择的遍历部分</p>
<h2 id="articleHeader42">43.class: 代替传统的封装，继承，多态的语法</h2>
<p>封装: <br>  class Student {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  constructor(sname,sage){
    ... ...
  }
  intr (){//Student.prototype.intr
    
  } 
  fun (){

  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>  <span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(sname,sage)</span><span class="hljs-comment">{
    ... ...
  }</span>
  <span class="hljs-title">intr</span> <span class="hljs-params">()</span><span class="hljs-comment">{//Student.prototype.intr
    
  }</span> 
  <span class="hljs-title">fun</span> <span class="hljs-params">()</span><span class="hljs-comment">{

  }</span></span></code></pre>
<p>}<br> 继承: <br>  class Flyer {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(fname,speed){
  ... ...
}
fly (){
  ... ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(fname,speed)</span><span class="hljs-comment">{
  ... ...
}</span>
<span class="hljs-title">fly</span> <span class="hljs-params">()</span><span class="hljs-comment">{
  ... ...
}</span></span></code></pre>
<p>}<br>  class Plane extends Flyer{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(fname,speed,score){
  //super指向父类型构造函数，且自动替换this
  super(fname,speed)
  ... ...
}
getScore (){
  ... ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(fname,speed,score)</span><span class="hljs-comment">{
  //super指向父类型构造函数，且自动替换this
  super(fname,speed)
  ... ...
}</span>
<span class="hljs-title">getScore</span> <span class="hljs-params">()</span><span class="hljs-comment">{
  ... ...
}</span></span></code></pre>
<p>}</p>
<p>静态方法: <br>  class User{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(uname,upwd){
  this.uname=uname;
  this.upwd=upwd;
}
save(){//保存在User.prototype中的实例方法
  console.log(&quot;保存当前对象&quot;);
}
static  findOne(){//静态方法，定义在构造函数上
  return new User();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(uname,upwd)</span><span class="hljs-comment">{
  this.uname=uname;
  this.upwd=upwd;
}</span>
<span class="hljs-title">save</span><span class="hljs-params">()</span><span class="hljs-comment">{//保存在User.prototype中的实例方法
  console.log("保存当前对象");
}</span>
<span class="hljs-title">static</span>  <span class="hljs-title">findOne</span><span class="hljs-params">()</span><span class="hljs-comment">{//静态方法，定义在构造函数上
  return new User();
}</span></span></code></pre>
<p>}<br>  var user=new User(...);<br>  user.save();//调用实例方法<br>  User.findOne();//调用静态方法</p>
<h2 id="articleHeader43">44.Promise: 解决: 回调地狱</h2>
<p>什么是callback hell: 由于使用参数传递回调函数，导致步骤多时，参数的嵌套层级很深。<br> 何时: 只要异步调用，可能发生延迟时，都要用Promise代替传统参数callback<br> 如何: 定义时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  function 第一件事(){
    return new Promise(fn=>{
      第一件事的内容
      fn()
    })
  }
  function 第二件事(){
    return new Promise(fn=>{
      第二件事的内容
      fn()
    })
  }
  function 第三件事(){
    第三件事的内容
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>  <span class="hljs-function"><span class="hljs-keyword">function</span> 第一件事(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">fn</span>=&gt;</span>{
      第一件事的内容
      fn()
    })
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> 第二件事(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">fn</span>=&gt;</span>{
      第二件事的内容
      fn()
    })
  }
  <span class="hljs-function"><span class="hljs-keyword">function</span> 第三件事(<span class="hljs-params"></span>)</span>{
    第三件事的内容
  }</code></pre>
<p>调用时:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="第一件事()//return Promise(fn)
  .then(第二件事)//return Promise(fn)
  .then(第三件事)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>第一件事()//<span class="hljs-keyword">return</span> Promise(fn)
  .<span class="hljs-keyword">then</span>(第二件事)//<span class="hljs-keyword">return</span> Promise(fn)
  .<span class="hljs-keyword">then</span>(第三件事)
</code></pre>
<p>鄙视题:</p>
<ol>
<li>
<p>将类数组对象复制为数组:<br> var arr2=Array.prototype.slice.call(arguments)<br> 将类数组对象复制为数组，并选取指定位置的剩余元素<br> var arr2= Array.prototype.slice.call(arguments,starti)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     相当于arguments.slice(starti)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">     相当于<span class="hljs-selector-tag">arguments</span><span class="hljs-selector-class">.slice</span>(<span class="hljs-selector-tag">starti</span>)</code></pre>
<p>其实更简单的: var arr2= [].slice.call(arguments,starti)</p>
</li>
<li>
<p>promise中的错误处理:<br> 其实: new Promise(可接收2件事)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="       .then(   )  .catch(    )" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code style="word-break: break-word; white-space: initial;">       .<span class="hljs-keyword">then</span>(   )  .<span class="hljs-keyword">catch</span>(    )</code></pre>
<p>new Promise((正常函数,出错函数)=&gt;{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如果顺利执行:
  调用正常()
否则
  调用出错()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>如果顺利执行:
  调用正常<span class="hljs-comment">()</span>
否则
  调用出错<span class="hljs-comment">()</span></code></pre>
<p>})</p>
</li>
<li>
<p>等待多个任务完成<br>前提: 每个任务都必须都返回Promise<br>如何: Promise.all([</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   task1(), task2(),...
 ]).then(()=>{所有任务完成后才执行的任务})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>   task1(), task2(),...
 ]).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{所有任务完成后才执行的任务})
</code></pre>
</li>
</ol>
<hr>
<ol><li id="fn-1">47 <a href="#fnref-1" class="footnote-backref">↩</a>
</li></ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端知识点总结——JS高级（持续更新中）

## 原文链接
[https://segmentfault.com/a/1190000014155746](https://segmentfault.com/a/1190000014155746)

