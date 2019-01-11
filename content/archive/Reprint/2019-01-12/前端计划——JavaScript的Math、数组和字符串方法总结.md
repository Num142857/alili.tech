---
title: '前端计划——JavaScript的Math、数组和字符串方法总结' 
date: 2019-01-12 2:30:25
hidden: true
slug: h3diwjsmx7
categories: [reprint]
---

{{< raw >}}

                    
<p>前言：JavaScript内提供了丰富的内建函数，本文总结了一份表格，方便快速查找，<br>个人总结，不是很严谨，如有错误，还望指正。</p>
<blockquote><p>如果想查阅各函数详细的使用说明，建议使用官方文档。<br><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a></p></blockquote>
<h2 id="articleHeader0">1、Math函数</h2>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
<th>语法</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>abs(x)</td>
<td>返回绝对值</td>
<td>Math.abs(x)</td>
<td>x 不是数字返回 NaN,如果 x 为 null 返回 0</td>
</tr>
<tr>
<td>acos(x)</td>
<td>返回反余弦值</td>
<td>Math.acos(x)</td>
<td>x是-1到1之间的数，返回0到PI之间的弧度值，x超出范围返回NaN</td>
</tr>
<tr>
<td>asin(x)</td>
<td>返回反正弦值</td>
<td>Math.asin(x)</td>
<td>x属于-1到1，返回-PI/2到PI/2</td>
</tr>
<tr>
<td>atan(x)</td>
<td>返回反正切值</td>
<td>Math.atan(x)</td>
<td>返回的值是 -PI/2 到 PI/2 之间的弧度值</td>
</tr>
<tr>
<td>atan2(y,x)</td>
<td>返回坐标(y,x)到x轴之间夹角度数</td>
<td>Math.atan2(y,x)</td>
<td>返回的值是 -PI/2 到 PI/2 之间的弧度值</td>
</tr>
<tr>
<td>sin(x)</td>
<td>求正弦值</td>
<td>Math.sin(x)</td>
<td>x为弧度值，将角度乘以 0.017453293 （2PI/360）即可转换为弧度</td>
</tr>
<tr>
<td>cos(x)</td>
<td>求余弦值</td>
<td>Math.cos(x)</td>
<td>同上</td>
</tr>
<tr>
<td>tan(x)</td>
<td>求正切值</td>
<td>Math.tan(x)</td>
<td>同上</td>
</tr>
<tr>
<td>ceil(x)</td>
<td>向上取整</td>
<td>Math.ceil(x)</td>
<td>无</td>
</tr>
<tr>
<td>floor(x)</td>
<td>向下取整</td>
<td>Math.floor(x)</td>
<td>无</td>
</tr>
<tr>
<td>round(x)</td>
<td>四舍五入取整</td>
<td>Math.round(x)</td>
<td>无</td>
</tr>
<tr>
<td>exp(x)</td>
<td>返回E^x</td>
<td>Math.exp(x)</td>
<td>无</td>
</tr>
<tr>
<td>pow(x,y)</td>
<td>返回 x^y</td>
<td>Math.pow(x,y)</td>
<td>无</td>
</tr>
<tr>
<td>log(x)</td>
<td>返回ln(x)</td>
<td>Math.log(x)</td>
<td>如果 x 为负数，返回 NaN。x 为0，返回 -Infinity</td>
</tr>
<tr>
<td>sqrt(x)</td>
<td>返回x的平方根</td>
<td>Math.sqrt(x)</td>
<td>如果 x 小于 0，则返回 NaN</td>
</tr>
<tr>
<td>random()</td>
<td>返回介于 0（包含） ~ 1（不包含） 之间的一个随机数</td>
<td>Math.random()</td>
<td>无</td>
</tr>
<tr>
<td>min(x)</td>
<td>返回一组数的最小值</td>
<td>Math.min(x,y,...z)</td>
<td>无</td>
</tr>
<tr>
<td>max(x)</td>
<td>返回一组数的最大值</td>
<td>Math.max(x,y,,...z)</td>
<td>无</td>
</tr>
<tr>
<td>--</td>
<td><strong>以下为ES6新增</strong></td>
<td>--</td>
<td>--</td>
</tr>
<tr>
<td>trunc(x)</td>
<td>返回一个数的整数部分</td>
<td>Math.trunc(x)</td>
<td>对于空值和无法截取整数的值，返回NaN</td>
</tr>
<tr>
<td>sign(x)</td>
<td>判断一个数是正数、负数、0</td>
<td>Math.trunc(x)</td>
<td>参数为正数，返回+1；负数返回-1；0返回0；-0返回-0；其他返回NaN。</td>
</tr>
<tr>
<td>cbrt(x)</td>
<td>求立方根</td>
<td>Math.cbrt(x)</td>
<td>无</td>
</tr>
<tr>
<td>clz32(x)</td>
<td>求多少个前置0</td>
<td>Math.clz32(x)</td>
<td>32位无符号整数有多少前置0，小数只看整数部分</td>
</tr>
<tr>
<td>imul(x,y)</td>
<td>返回以两个32位带符号整数相乘结果</td>
<td colspan="2">Math.imul(x,y)</td>
</tr>
<tr>
<td>fround(x)</td>
<td>返回一个数的单精度浮点数结果</td>
<td colspan="2">Math.fround(x)</td>
</tr>
<tr>
<td>hypot(x1,x2,...)</td>
<td>返回多个数的平方和的平方根</td>
<td>Math.hypot(x1,x2,...xn)</td>
<td>有一个参数无法转换就返回NaN</td>
</tr>
<tr>
<td>expm1(x)</td>
<td>返回e^x - 1</td>
<td>Math.expm1(x)</td>
<td>相当于Math.exp(x) - 1</td>
</tr>
<tr>
<td>log1p(x)</td>
<td>返回log(x+1)</td>
<td>Math.log1p(x)</td>
<td>相当于Math.log(x+1)</td>
</tr>
<tr>
<td>log10(x)</td>
<td>返回log10(x)</td>
<td>Math.log10(x)</td>
<td>相当于Math.log(x)/Math.LN10，x小于0返回NaN</td>
</tr>
<tr>
<td>log2(x)</td>
<td>返回log2(x)</td>
<td>Math.log2(x)</td>
<td>相当于Math.log(x)/Math.LN2，x小于0返回NaN</td>
</tr>
<tr>
<td>sinh(x)</td>
<td>双曲正弦函数</td>
<td colspan="2">Math.sinh(x)</td>
</tr>
<tr>
<td>cosh(x)</td>
<td>双曲余弦函数</td>
<td colspan="2">Math.cosh(x)</td>
</tr>
<tr>
<td>tanh(x)</td>
<td>双曲正切函数</td>
<td colspan="2">Math.tanh(x)</td>
</tr>
<tr>
<td>asinh(x)</td>
<td>反双曲正弦函数</td>
<td colspan="2">Math.asinh(x)</td>
</tr>
<tr>
<td>acosh(x)</td>
<td>反双曲余弦函数</td>
<td colspan="2">Math.acosh(x)</td>
</tr>
<tr>
<td>atanh(x)</td>
<td>反双曲正切函数</td>
<td colspan="2">Math.atanh(x)</td>
</tr>
<tr>
<td>signbit(x)</td>
<td>是否设置了符号位</td>
<td>Math.signbit()</td>
<td>设置了返回true，否则为false</td>
</tr>
<tr>
<td>x**y</td>
<td>指数运算符</td>
<td>x**y</td>
<td>用于简化Math.pow(x,y)，对于特别大的运算，在V8下两者结果可能不同</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">2、数组函数</h2>
<table>
<thead><tr>
<th>函数名</th>
<th>作用</th>
<th>语法</th>
<th>返回值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>concat</td>
<td>合并数组</td>
<td>arr1.concat(arr2,arr3...)</td>
<td>Array</td>
<td>一个新数组</td>
</tr>
<tr>
<td>join</td>
<td>拼接数组</td>
<td>arr.join('separator')</td>
<td colspan="2">String</td>
</tr>
<tr>
<td>push</td>
<td>末尾添加元素</td>
<td>arr.push(item1,item2...)</td>
<td>Number</td>
<td>返回新长度</td>
</tr>
<tr>
<td>pop</td>
<td>末尾弹出元素</td>
<td>arr.pop()</td>
<td colspan="2">item类型</td>
</tr>
<tr>
<td>unshift</td>
<td>开头添加元素</td>
<td>arr.unshift(item1, item2...)</td>
<td>Number</td>
<td>新长度</td>
</tr>
<tr>
<td>shift</td>
<td>移出开头元素</td>
<td>arr.shift()</td>
<td colspan="2">item类型</td>
</tr>
<tr>
<td>reverse</td>
<td>反转数组顺序</td>
<td>arr.reverse()</td>
<td colspan="2">Array</td>
</tr>
<tr>
<td>sort</td>
<td>数组排序</td>
<td>arr.sort(sortFunction)</td>
<td>Array</td>
<td>升序函数(function(a,b) {return a-b})</td>
</tr>
<tr>
<td>slice</td>
<td>截取数组</td>
<td>arr.slice(start, end)</td>
<td>Array</td>
<td>不含end。end为空，代表到最后</td>
</tr>
<tr>
<td>splice</td>
<td>添加/删除元素</td>
<td>arr.splice(index, howmany, item1, item2...)</td>
<td>Array</td>
<td>index是起始位置，howmany是删除数量，为0的话就是添加</td>
</tr>
<tr>
<td>indexOf</td>
<td>返回元素首次出现位置</td>
<td>arr.indexOf(item, start)</td>
<td>Number</td>
<td>start可省略，代表从头开始检索。未找到返回-1</td>
</tr>
<tr>
<td>lastIndexOf</td>
<td>返回最后出现位置</td>
<td>arr.lastIndexOf(item, start)</td>
<td>Number</td>
<td>同上</td>
</tr>
<tr>
<td>map</td>
<td>返回一个新数组，调用指定函数返回结果</td>
<td>arr.map(function(currentValue,index,arr), thisValue)</td>
<td>Array</td>
<td>thisValue可选。"</td>
</tr>
<tr>
<td>reduce</td>
<td>递归计算(从左至右)</td>
<td>arr.reduce(function(total, currentValue, currentIndex, arr), initialValue)</td>
<td colspan="2">total类型</td>
</tr>
<tr>
<td>reduceRight</td>
<td>递归计算(从右至左)</td>
<td>arr.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)</td>
<td colspan="2">total类型</td>
</tr>
<tr>
<td>forEach</td>
<td>每个元素都执行回调函数</td>
<td>arr.forEach(function(currentValue, index, arr), thisValue)</td>
<td colspan="2">回调类型</td>
</tr>
<tr>
<td>every</td>
<td>用于检测每个元素</td>
<td>arr.every(function(currentValue,index,arr), thisValue)</td>
<td>Boolean</td>
<td>一个不满足，返回false,不再检测。全部通过返回true</td>
</tr>
<tr>
<td>filter</td>
<td>筛选满足条件的形成新数组</td>
<td>arr.filter(function(currentValue,index,arr), thisValue)</td>
<td colspan="2">Array</td>
</tr>
<tr>
<td>valueOf</td>
<td>返回 Array 对象的原始值</td>
<td>arr.valueOf()</td>
<td>Array</td>
<td>一般是后台调用</td>
</tr>
<tr>
<td>--</td>
<td><strong>以下为ES6新增</strong></td>
<td>--</td>
<td>--</td>
<td>--</td>
</tr>
<tr>
<td>Array.from()</td>
<td>将类数组转换为数组</td>
<td>Array.from(arrayLike,func)</td>
<td>Array</td>
<td>一般用于set、map，以及DOM节点集合,func是类map函数</td>
</tr>
<tr>
<td>Array.of()</td>
<td>将一组参数转换为数组</td>
<td>Array.of(1,2,3...)</td>
<td colspan="2">Array</td>
</tr>
<tr>
<td>find</td>
<td>返回符合条件的第一个元素</td>
<td>arr.find(function(currentValue,index,arr), thisValue)</td>
<td>item类型</td>
<td>检测第一个返回后停止，都没有返回undefined</td>
</tr>
<tr>
<td>findIndex</td>
<td>返回符合条件的第一个元素的位置</td>
<td>arr.findIndex(function(currentValue, index, arr), thisValue</td>
<td>Number</td>
<td>找不到返回-1</td>
</tr>
<tr>
<td>fill</td>
<td>用于替换数组内容</td>
<td>arr.fill(value, start, end)</td>
<td>Array</td>
<td>不含end</td>
</tr>
<tr>
<td>copyWithin</td>
<td>用于复制数组内容</td>
<td>arr.copyWithin(target, start, end)</td>
<td>Array</td>
<td>不含end</td>
</tr>
<tr>
<td>entries</td>
<td>返回数组的键值对</td>
<td>arr.entries()</td>
<td>遍历器对象</td>
<td>多用于for...of...遍历</td>
</tr>
<tr>
<td>keys</td>
<td>返回数组的键名</td>
<td>arr.keys()</td>
<td>同上</td>
<td>同上</td>
</tr>
<tr>
<td>values</td>
<td>返回数组的键值</td>
<td>arr.values()</td>
<td>同上</td>
<td>同上</td>
</tr>
<tr>
<td>includes</td>
<td>判断是否包含某元素</td>
<td>arr.includes(item, start)</td>
<td>Boolean</td>
<td>start默认为0，即起始位置</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader2">3、字符串函数</h2>
<table>
<thead><tr>
<th>函数名</th>
<th>作用</th>
<th>语法</th>
<th>返回值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>charAt</td>
<td>返回指定位置字符</td>
<td>string.charAt(index)</td>
<td>String</td>
<td>index为下标值，找不到返回""</td>
</tr>
<tr>
<td>charCodeAt</td>
<td>返回指定位置字符对应的Unicode编码</td>
<td>string.charCodeAt(index)</td>
<td>Number</td>
<td>同时，找不到返回NaN</td>
</tr>
<tr>
<td>concat</td>
<td>连接字符串</td>
<td>string.concat(string1, string2, ..., stringX)</td>
<td>String</td>
<td>返回的是新字符串</td>
</tr>
<tr>
<td>indexOf</td>
<td>返回某字符串首次出现位置</td>
<td>string.indexOf(searchvalue,start)</td>
<td>Number</td>
<td>start可选，缺省从头开始。区分大小写，找不到返回-1</td>
</tr>
<tr>
<td>lastIndexOf</td>
<td>返回某字符串末次出现位置</td>
<td>string.lastIndexOf(searchvalue,start)</td>
<td>Number</td>
<td>同上。</td>
</tr>
<tr>
<td>match</td>
<td>返回匹配的字符数组</td>
<td>string.match(regexp)</td>
<td>Array</td>
<td>依赖于regexp是否含g，找不到返回null。</td>
</tr>
<tr>
<td>replace</td>
<td>替换指定字符串</td>
<td>string.replace(searchvalue,newvalue)</td>
<td>String</td>
<td>不改变原字符串，返回新字符串</td>
</tr>
<tr>
<td>search</td>
<td>查找指定字符串</td>
<td>string.search(searchvalue)</td>
<td>Number</td>
<td>返回匹配的子串其实位置，找不到返回-1</td>
</tr>
<tr>
<td>slice</td>
<td>返回提取的字符串</td>
<td>string.slice(start,end)</td>
<td>String</td>
<td>返回新字符串，end可省略。不含end。</td>
</tr>
<tr>
<td>split</td>
<td>切割字符串为数组</td>
<td>string.split(separator,limit)</td>
<td>Array</td>
<td>两个参数均可选，limit代表返回的最大长度</td>
</tr>
<tr>
<td>substr</td>
<td>提取字符串</td>
<td>string.substr(start,length)</td>
<td>String</td>
<td>length可省略，不改变原字符串</td>
</tr>
<tr>
<td>subString</td>
<td>提取字符串</td>
<td>string.substring(from, to)</td>
<td>String</td>
<td>双参均为非负整数。to可省略。不含to</td>
</tr>
<tr>
<td>toLowerCase</td>
<td>转换为小写</td>
<td>string.toLowerCase()</td>
<td>String</td>
<td>不改变原字符串</td>
</tr>
<tr>
<td>toUpperCase</td>
<td>转换为小写</td>
<td>string.toUpperCase()</td>
<td>String</td>
<td>不改变原字符串</td>
</tr>
<tr>
<td>fromCharCode</td>
<td>Unicode编码转成字符</td>
<td>string.fromCharCode(n1, n2, ..., nX)</td>
<td>String</td>
<td>支持多个参数连成字符串</td>
</tr>
<tr>
<td>valueOf</td>
<td>返回String对象值</td>
<td>string.valueOf()</td>
<td>String</td>
<td>一般由后台调用，不显式引用</td>
</tr>
<tr>
<td>trim</td>
<td>去除首位的空白字符</td>
<td>string.trim()</td>
<td colspan="2">String</td>
</tr>
<tr>
<td>--</td>
<td><strong>以下为ES6新增</strong></td>
<td>--</td>
<td>--</td>
<td>--</td>
</tr>
<tr>
<td>codePointAt</td>
<td>类似charCodeAt</td>
<td>string.codePointAt(index)</td>
<td>Number</td>
<td>提供了对于大于uFFFF的字符的处理</td>
</tr>
<tr>
<td>fromCodePoint</td>
<td>类似fromCharCode</td>
<td>string.fromCodePoint(n)</td>
<td>String</td>
<td>同上</td>
</tr>
<tr>
<td>at</td>
<td>类似CharAt</td>
<td>string.at(index)</td>
<td>String</td>
<td>同上</td>
</tr>
<tr>
<td>normalize</td>
<td>Unicode正规化</td>
<td>'u01D1'.normalize()</td>
<td colspan="2">String</td>
</tr>
<tr>
<td>includes</td>
<td>查找是否有指定字符串</td>
<td>string.includes('str',n)</td>
<td>Boolean</td>
<td>表示是否找到指定字符串，n可省略，代表起始位置</td>
</tr>
<tr>
<td>startsWith</td>
<td>同上</td>
<td>string.startsWith('str', n)</td>
<td>Boolean</td>
<td>同上</td>
</tr>
<tr>
<td>endsWith</td>
<td>同上</td>
<td>string.endsWith('str', n)</td>
<td>Boolean</td>
<td>n表示前n个字符</td>
</tr>
<tr>
<td>repeat</td>
<td>重复字符串</td>
<td>string.repeat(n)</td>
<td>String</td>
<td>n必须大于-1，小数会取整，-1到0转换为0，小于-1或者Infinity报错</td>
</tr>
<tr>
<td>padStart</td>
<td>头部补全</td>
<td>string.padStart(length, 'str')</td>
<td>String</td>
<td>第一个参数为最小长度，第二个为填充的字符串，第二个参数省略用空格填补，超出会自动截取</td>
</tr>
<tr>
<td>padStart</td>
<td>尾部补全</td>
<td>string.padStart(length, 'str')</td>
<td>String</td>
<td>类似上面</td>
</tr>
</tbody>
</table>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端计划——JavaScript的Math、数组和字符串方法总结

## 原文链接
[https://segmentfault.com/a/1190000009765714](https://segmentfault.com/a/1190000009765714)

