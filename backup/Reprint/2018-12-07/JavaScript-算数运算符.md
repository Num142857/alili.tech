---
title: 'JavaScript-算数运算符' 
date: 2018-12-07 2:30:10
hidden: true
slug: soz5oc6jww
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、算术运算符</h2>
<table>
<thead><tr>
<th>运算符</th>
<th>描述</th>
<th>例子</th>
<th>x 运算结果</th>
<th>y 运算结果</th>
</tr></thead>
<tbody>
<tr>
<td>+</td>
<td>加法</td>
<td>x=y+2</td>
<td>7</td>
<td>5</td>
</tr>
<tr>
<td>-</td>
<td>减法</td>
<td>x=y-2</td>
<td>3</td>
<td>5</td>
</tr>
<tr>
<td>*</td>
<td>乘法</td>
<td>x=y*2</td>
<td>10</td>
<td>5</td>
</tr>
<tr>
<td>/</td>
<td>除法</td>
<td>x=y/2</td>
<td>2.5</td>
<td>5</td>
</tr>
<tr>
<td>%</td>
<td>取模（余数）</td>
<td>x=y%2</td>
<td>1</td>
<td>5</td>
</tr>
<tr>
<td>++</td>
<td>自增</td>
<td>x=++y</td>
<td>6</td>
<td>6</td>
</tr>
<tr>
<td>++</td>
<td>自增</td>
<td>x=y++</td>
<td>5</td>
<td>6</td>
</tr>
<tr>
<td>--</td>
<td>自减</td>
<td>x=--y</td>
<td>4</td>
<td>4</td>
</tr>
<tr>
<td>--</td>
<td>自减</td>
<td>x=y--</td>
<td>5</td>
<td>4</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">二、加法 (+)</h2>
<h3 id="articleHeader2">2.1 作用</h3>
<p>（1）数值求和</p>
<p>（2）字符串拼接</p>
<h3 id="articleHeader3">2.2 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV62jN?w=408&amp;h=423" src="https://static.alili.tech/img/bV62jN?w=408&amp;h=423" alt="加法" title="加法" style="cursor: pointer;"></span></p>
<p>（1）布尔值会自动转换为 <strong>数值</strong>，false 转换为 0，true 转换为 1，然后再相加。</p>
<h3 id="articleHeader4">2.3 重载</h3>
<blockquote>加法运算符是在<strong>运行时决定</strong>，到底是执行相加，还是执行连接。也就是说，<strong>运算子的不同</strong>，导致了不同的语法行为，这种现象称为“重载”（overload）。</blockquote>
<p>由于加法运算符存在重载，<strong>可能执行两种运算</strong>，使用的时候必须很小心。</p>
<p><span class="img-wrap"><img data-src="/img/bV62Hz?w=260&amp;h=51" src="https://static.alili.tech/img/bV62Hz?w=260&amp;h=51" alt="重载" title="重载" style="cursor: pointer; display: inline;"></span></p>
<p>上面代码中，由于从左到右的运算次序，<strong>字符串的位置不同会导致不同的结果</strong>。</p>
<p>除了加法运算符，其他算术运算符（比如减法、除法和乘法）<strong>都不会发生重载</strong>。他们的规则是 <strong>所有运算子一律转为数值</strong>，再进行相应的数学运算。</p>
<p><span class="img-wrap"><img data-src="/img/bV62Kf?w=200&amp;h=76" src="https://static.alili.tech/img/bV62Kf?w=200&amp;h=76" alt="都不重载" title="都不重载" style="cursor: pointer; display: inline;"></span></p>
<p>上面代码中，减法、除法和乘法运算符，都是将<strong>字符串自动转为数值</strong>，然后再运算。</p>
<h3 id="articleHeader5">2.4 对象的加法</h3>
<p>（1）如果运算子是<strong>对象</strong>，必须先转成<strong>原始类型</strong>的值，然后再相加。</p>
<p>（2）转换规则</p>
<p>首先，调用对象的 <strong>valueOf()</strong> 方法，返回对象自身，再调用对象的 <strong>toString()</strong> 方法，将其转为<strong>字符串（原始类型）</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV63y9?w=539&amp;h=178" src="https://static.alili.tech/img/bV63y9?w=539&amp;h=178" alt="对象的加法" title="对象的加法" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">2.5 特殊行为</h3>
<p><strong>（1）某个运算数是 NaN，那么结果为 NaN。</strong></p>
<p><strong>（2）-Infinity 加 -Infinity，结果为 -Infinity。</strong></p>
<p><strong>（3）Infinity 加 -Infinity，结果为 NaN。</strong></p>
<p><strong>（4）+0 加 +0，结果为 +0。</strong></p>
<p><strong>（5）-0 加 +0，结果为 +0。</strong></p>
<p><strong>（6）-0 加 -0，结果为 -0。</strong></p>
<p><strong>（7）任何数据类型 + 字符串 = 字符串</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV63Fu?w=377&amp;h=125" src="https://static.alili.tech/img/bV63Fu?w=377&amp;h=125" alt="字符串" title="字符串" style="cursor: pointer; display: inline;"></span></p>
<p><strong>（8）若数值求和，undefined 转换为 NaN，null 转换为 0</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV63IB?w=486&amp;h=75" src="https://static.alili.tech/img/bV63IB?w=486&amp;h=75" alt="数值求和" title="数值求和" style="cursor: pointer; display: inline;"></span></p>
<p><strong>（9）若字符串拼接，undefined 转换为 'undefined'，null 转换为 'null'，false 转换为 'false'，true 转换为 'true'</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV63Kk?w=493&amp;h=177" src="https://static.alili.tech/img/bV63Kk?w=493&amp;h=177" alt="字符串拼接" title="字符串拼接" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">三、减法 (-)</h2>
<h3 id="articleHeader8">3.1 特殊行为</h3>
<p><strong>（1）某个运算数是 NaN，那么结果为 NaN。</strong></p>
<p><strong>（2）Infinity 减 Infinity，结果为 NaN。</strong></p>
<p><strong>（3）-Infinity 减 -Infinity，结果为 NaN。</strong></p>
<p><strong>（4）Infinity 减 -Infinity，结果为 Infinity。</strong></p>
<p><strong>（5）-Infinity 减 Infinity，结果为 -Infinity。</strong></p>
<p><strong>（6）+0 减 +0，结果为 +0。</strong></p>
<p><strong>（7）-0 减 -0，结果为 -0。</strong></p>
<p><strong>（8）+0 减 -0，结果为 +0。</strong></p>
<p><strong>（9）某个运算符不是数字，那么结果为 NaN。</strong></p>
<p><strong>（10）undefined 转换为 NaN，null 转换为 0</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV63L3?w=406&amp;h=74" src="https://static.alili.tech/img/bV63L3?w=406&amp;h=74" alt="减法" title="减法" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">四、乘法 (*)</h2>
<h3 id="articleHeader10">4.1 特殊行为</h3>
<p><strong>（1）如果结果太大或太小，那么生成的结果是 Infinity 或 -Infinity。</strong></p>
<p><strong>（2）如果某个运算数是 NaN，结果为 NaN。</strong></p>
<p><strong>（3）Infinity 乘以 0，结果为 NaN。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV662u?w=257&amp;h=25" src="https://static.alili.tech/img/bV662u?w=257&amp;h=25" alt="NaN" title="NaN" style="cursor: pointer;"></span></p>
<p><strong>（4）Infinity 乘以 0 以外的任何数字，结果为 Infinity 或 -Infinity。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV665g?w=615&amp;h=27" src="https://static.alili.tech/img/bV665g?w=615&amp;h=27" alt="Infinity或-Infinity" title="Infinity或-Infinity" style="cursor: pointer;"></span></p>
<p><strong>（5）Infinity 乘以 Infinity，结果为 Infinity。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV662Q?w=380&amp;h=27" src="https://static.alili.tech/img/bV662Q?w=380&amp;h=27" alt="Infinity" title="Infinity" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">五、除法 (/)</h2>
<h3 id="articleHeader12">5.1 特殊行为</h3>
<p>（1）如果结果太大或太小，那么生成的结果是 Infinity 或 -Infinity。</p>
<p>（2）如果某个运算数是 NaN，结果为 NaN。</p>
<p>（3）Infinity 被 Infinity 除，结果为 NaN。</p>
<p><span class="img-wrap"><img data-src="/img/bV664x?w=325&amp;h=25" src="https://static.alili.tech/img/bV664x?w=325&amp;h=25" alt="NaN" title="NaN" style="cursor: pointer;"></span></p>
<p>（4）Infinity 被任何数字除，结果为 Infinity。</p>
<p><span class="img-wrap"><img data-src="/img/bV6690?w=308&amp;h=29" src="https://static.alili.tech/img/bV6690?w=308&amp;h=29" alt="Infinity" title="Infinity" style="cursor: pointer;"></span></p>
<p>（5）0 除一个任何非无穷大的数字，结果为 NaN。</p>
<p><span class="img-wrap"><img data-src="/img/bV664M?w=172&amp;h=26" src="https://static.alili.tech/img/bV664M?w=172&amp;h=26" alt="NaN" title="NaN" style="cursor: pointer; display: inline;"></span></p>
<p>（6）Infinity 被 0 以外的任何数字除，结果为 Infinity 或 -Infinity。</p>
<p><span class="img-wrap"><img data-src="/img/bV67a7?w=616&amp;h=30" src="https://static.alili.tech/img/bV67a7?w=616&amp;h=30" alt="Infinity或-Infinity" title="Infinity或-Infinity" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">六、求余 (%)</h2>
<blockquote>求余运算符返回第一个操作数对第二个操作数的模，即 var1 对 var2 取模，其中 var1 和 var2 是变量。取模功能就是 var1 <strong>除以</strong> var2 的 <strong>整型余数</strong>。</blockquote>
<h3 id="articleHeader14">6.1 示例</h3>
<p>求余运算符（%）返回前一个运算子 <strong>被</strong> 后一个运算子 <strong>除</strong>，所得的 <strong>余数</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV7jMN?w=169&amp;h=24" src="https://static.alili.tech/img/bV7jMN?w=169&amp;h=24" alt="求余运算符" title="求余运算符" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader15">6.2 注意</h3>
<p>运算结果的正负号由 <strong>第一个运算子</strong> 的 <strong>正负号</strong> 决定。</p>
<p><span class="img-wrap"><img data-src="/img/bV7jNQ?w=177&amp;h=50" src="https://static.alili.tech/img/bV7jNQ?w=177&amp;h=50" alt="正负号" title="正负号" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">6.3 绝对值函数</h3>
<p>为了得到 <strong>负数</strong> 的正确余数值，可以先使用绝对值函数。</p>
<p><span class="img-wrap"><img data-src="/img/bV7jN5?w=425&amp;h=327" src="https://static.alili.tech/img/bV7jN5?w=425&amp;h=327" alt="绝对值函数" title="绝对值函数" style="cursor: pointer;"></span></p>
<h3 id="articleHeader17">6.4 浮点数运算</h3>
<p>余数运算符还可以用于浮点数的运算。但是，由于浮点数 <strong>不是精确的值</strong>，无法得到完全准确的结果。</p>
<p><span class="img-wrap"><img data-src="/img/bV7jOD?w=325&amp;h=52" src="https://static.alili.tech/img/bV7jOD?w=325&amp;h=52" alt="浮点数运算" title="浮点数运算" style="cursor: pointer;"></span></p>
<h3 id="articleHeader18">6.5 特殊行为</h3>
<p>（1）如果被除数是 Infinity，或除数是 0，结果为 NaN。</p>
<p>（2）Infinity 被 Infinity 除，结果为 NaN。</p>
<p>（3）如果除数是无穷大的数，结果为被除数。</p>
<p>（4）如果被除数为 0，结果为 0。</p>
<p><span class="img-wrap"><img data-src="/img/bV7jPY?w=398&amp;h=176" src="https://static.alili.tech/img/bV7jPY?w=398&amp;h=176" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader19">七、幂 (**)</h2>
<p>幂运算符返回第一个操作数做<strong>底数</strong>，第二个操作数做<strong>指数的乘方</strong>。即， var1var2 ，其中 var1 和 var2 是其两个操作数。</p>
<h3 id="articleHeader20">7.1 语法</h3>
<blockquote>运算符: var1 ** var2</blockquote>
<h3 id="articleHeader21">7.2 注解</h3>
<p>（1）包括 PHP 或 Python 等的大多数语言中，都包含幂运算符（一般来说符号是 <code>^</code> 或者 <code>**</code>）。这些语言中的幂运算符有着比其他的单目运算符（如一元 + 或一元 - ）更高的优先级。但是作为例外，在 Bash 中，<code>**</code>  运算符被设计为<strong>比单目运算符优先级更低</strong>。</p>
<p>（2）在最新的 JavaScript（ES2016） 中，<strong>禁止使用</strong>带歧义的幂运算表达式。比如，<strong>底数前不能紧跟一元运算符</strong>（+/-/~/!/delete/void/typeof）</p>
<p><span class="img-wrap"><img data-src="/img/bV7j1P?w=603&amp;h=152" src="https://static.alili.tech/img/bV7j1P?w=603&amp;h=152" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<h3 id="articleHeader22">7.3 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV7j1R?w=413&amp;h=225" src="https://static.alili.tech/img/bV7j1R?w=413&amp;h=225" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<p>（1）如果要<strong>反转</strong>求幂表达式结果的符号，你可以采用这样的方式：</p>
<p><span class="img-wrap"><img data-src="/img/bV7j2Q?w=247&amp;h=26" src="https://static.alili.tech/img/bV7j2Q?w=247&amp;h=26" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<p>（2）强制求幂表达式的基数为<strong>负数</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/bV7j3F?w=238&amp;h=27" src="https://static.alili.tech/img/bV7j3F?w=238&amp;h=27" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">八、自增 (++)</h2>
<blockquote>自增运算符为其操作数增加1，返回一个数值。</blockquote>
<h3 id="articleHeader24">8.1 后置和前置</h3>
<p>（1）如果<strong>后置</strong>（postfix）使用，即运算符位于操作数的后面（如 <strong>x++</strong>），那么将会在<strong>自增前</strong>返回数值。</p>
<p>（2）如果<strong>前置</strong>（prefix）使用，即运算符位于操作数的前面（如 <strong>++x</strong>），那么将会在<strong>自增后</strong>返回数值。</p>
<h3 id="articleHeader25">8.2 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV7kRf?w=250&amp;h=227" src="https://static.alili.tech/img/bV7kRf?w=250&amp;h=227" alt="自增" title="自增" style="cursor: pointer;"></span></p>
<h3 id="articleHeader26">8.3 练习</h3>
<p><span class="img-wrap"><img data-src="/img/bV7qu7?w=493&amp;h=77" src="https://static.alili.tech/img/bV7qu7?w=493&amp;h=77" alt="练习" title="练习" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader27">九、自减 (--)</h2>
<blockquote>自减运算符将其操作数减去1，并返回一个数值。</blockquote>
<h3 id="articleHeader28">9.1 后置和前置</h3>
<p>（1）如果<strong>后置</strong>使用（如 <strong>x--</strong>），则在<strong>自减前</strong>返回数值。</p>
<p>（2）如果<strong>前置</strong>使用（如 <strong>--x</strong>），则在<strong>自减后</strong>返回数值。</p>
<h3 id="articleHeader29">9.2 示例</h3>
<p><span class="img-wrap"><img data-src="/img/bV7kT1?w=348&amp;h=176" src="https://static.alili.tech/img/bV7kT1?w=348&amp;h=176" alt="自减" title="自减" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>
<p>参考文章 <a href="http://javascript.ruanyifeng.com/grammar/operator.html#" rel="nofollow noreferrer" target="_blank">JavaScript 标准参考教程（alpha）运算符</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript-算数运算符

## 原文链接
[https://segmentfault.com/a/1190000014102071](https://segmentfault.com/a/1190000014102071)

