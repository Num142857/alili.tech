---
title: 'jQuery入门教程-CSS样式操作大全' 
date: 2018-12-03 2:30:08
hidden: true
slug: hbffp8nuxn
categories: [reprint]
---

{{< raw >}}

                    
<h3>1、获取样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D00?w=255&amp;h=26" src="https://static.alili.tech/img/bV9D00?w=255&amp;h=26" alt="获取样式" title="获取样式"></span></p>
<h3>2、设置样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D1J?w=365&amp;h=25" src="https://static.alili.tech/img/bV9D1J?w=365&amp;h=25" alt="设置样式" title="设置样式"></span></p>
<h3>3、追加样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D2d?w=322&amp;h=26" src="https://static.alili.tech/img/bV9D2d?w=322&amp;h=26" alt="追加样式 " title="追加样式 "></span></p>
<h3>4、移除样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D26?w=357&amp;h=26" src="https://static.alili.tech/img/bV9D26?w=357&amp;h=26" alt="移除样式" title="移除样式"></span></p>
<h3>5、重复切换anotherClass样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D3Z?w=388&amp;h=26" src="https://static.alili.tech/img/bV9D3Z?w=388&amp;h=26" alt="重复切换anotherClass样式 " title="重复切换anotherClass样式 "></span></p>
<h3>6、判断是否含有某项样式</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D4F?w=322&amp;h=27" src="https://static.alili.tech/img/bV9D4F?w=322&amp;h=27" alt="判断是否含有某项样式 " title="判断是否含有某项样式 "></span></p>
<h3>7、设置 CSS 属性</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D8W?w=280&amp;h=26" src="https://static.alili.tech/img/bV9D8W?w=280&amp;h=26" alt="设置CSS属性" title="设置CSS属性"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>name</td>
<td>必需。规定 CSS 属性的名称。该参数可包含任何 CSS 属性，比如 "<strong>color</strong>"。</td>
</tr>
<tr>
<td>value</td>
<td>可选。规定 CSS 属性的值。该参数可包含任何 CSS 属性值，比如 "<strong>red</strong>"。如果设置了<strong>空字符串</strong>值，则从元素中<strong>删除</strong>指定属性。</td>
</tr>
</tbody>
</table>
<h3>8、返回 CSS 属性值</h3>
<p><span class="img-wrap"><img data-src="/img/bV9D59?w=212&amp;h=26" src="https://static.alili.tech/img/bV9D59?w=212&amp;h=26" alt="返回CSS属性值" title="返回CSS属性值"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>name</td>
<td>必需。规定 CSS 属性的名称。该参数可包含任何 CSS 属性。比如 "color"。</td>
</tr></tbody>
</table>
<h3>9、返回偏移坐标</h3>
<p><span class="img-wrap"><img data-src="/img/bV9Eqk?w=236&amp;h=25" src="https://static.alili.tech/img/bV9Eqk?w=236&amp;h=25" alt="返回偏移坐标" title="返回偏移坐标"></span></p>
<p>（1）返回第一个匹配元素<strong>相对于文档</strong>的偏移坐标（<strong>位置</strong>）。</p>
<p>（2）该方法返回的对象包含两个整型属性：<strong>top</strong> 和 <strong>left</strong>，<strong>以像素计</strong>。</p>
<p>（3）此方法只对<strong>可见元素有效</strong>。</p>
<h3>10、设置偏移坐标</h3>
<p><span class="img-wrap"><img data-src="/img/bV9EqU?w=291&amp;h=28" src="https://static.alili.tech/img/bV9EqU?w=291&amp;h=28" alt="设置偏移坐标" title="设置偏移坐标"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>value</td>
<td>必需。规定以像素计的 top 和 left 坐标。可能的值：<strong>①值对，比如 {top:100,left:0}</strong> <strong>②带有 top 和 left 属性的对象</strong>
</td>
</tr></tbody>
</table>
<h3>11、返回元素位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV9FP5?w=257&amp;h=26" src="https://static.alili.tech/img/bV9FP5?w=257&amp;h=26" alt="返回元素位置" title="返回元素位置"></span></p>
<p>（1）返回匹配元素<strong>相对于父元素</strong>的位置（偏移）。</p>
<p>（2）该方法返回的对象包含两个整型属性：<strong>top</strong> 和 <strong>left</strong>，<strong>以像素计</strong>。</p>
<p>（3）此方法只对<strong>可见元素有效</strong>。</p>
<h3>12、返回水平滚动条位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV9FQw?w=279&amp;h=26" src="https://static.alili.tech/img/bV9FQw?w=279&amp;h=26" alt="返回水平滚动条位置" title="返回水平滚动条位置"></span></p>
<p>（1）滚动条的水平位置指的是<strong>从其左侧滚动过的像素数</strong>。当滚动条位于<strong>最左侧</strong>时，位置是 <strong>0</strong>。</p>
<h3>13、设置水平滚动条位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV9FQX?w=366&amp;h=26" src="https://static.alili.tech/img/bV9FQX?w=366&amp;h=26" alt="设置水平滚动条位置" title="设置水平滚动条位置"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>position</td>
<td>可选。规定以像素计的新位置。</td>
</tr></tbody>
</table>
<h3>14、返回滚动条垂直位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV9F2o?w=269&amp;h=26" src="https://static.alili.tech/img/bV9F2o?w=269&amp;h=26" alt="返回滚动条垂直位置" title="返回滚动条垂直位置"></span></p>
<p>（1）只返回<strong>第一个</strong>匹配元素的滚动条的<strong>垂直</strong>位置。</p>
<p>（2）scroll top offset 指的是滚动条相对于其<strong>顶部</strong>的偏移。</p>
<p>（3）如果该方法<strong>未设置参数</strong>，则返回以<strong>像素</strong>计的相对滚动条<strong>顶部的偏移</strong>。</p>
<p>（4）该方法对于可见元素和不可见元素均有效。</p>
<h3>15、设置滚动条垂直位置</h3>
<p><span class="img-wrap"><img data-src="/img/bV9F2X?w=332&amp;h=26" src="https://static.alili.tech/img/bV9F2X?w=332&amp;h=26" alt="设置滚动条垂直位置" title="设置滚动条垂直位置"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>offset</td>
<td>可选。规定相对滚动条<strong>顶部</strong>的偏移，以像素计。</td>
</tr></tbody>
</table>
<p>（1）设置<strong>所有</strong>匹配元素的 scroll top offset。</p>
<p>（2）该方法对于可见元素和不可见元素均有效。</p>
<h3>16、返回高度</h3>
<p><span class="img-wrap"><img data-src="/img/bV9Ejy?w=234&amp;h=25" src="https://static.alili.tech/img/bV9Ejy?w=234&amp;h=25" alt="返回高度" title="返回高度"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>如果不为该方法设置参数</td>
<td>则返回以<strong>像素</strong>计的匹配元素的高度。</td>
</tr></tbody>
</table>
<h3>17、设置高度</h3>
<p><span class="img-wrap"><img data-src="/img/bV9Ek4?w=299&amp;h=27" src="https://static.alili.tech/img/bV9Ek4?w=299&amp;h=27" alt="设置高度" title="设置高度"></span></p>
<table>
<thead><tr>
<th>参数</th>
<th>描述</th>
</tr></thead>
<tbody><tr>
<td>length</td>
<td>可选。规定元素的高度。如果没有规定长度单位，则使用默认的 <strong>px</strong> 单位。</td>
</tr></tbody>
</table>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jQuery入门教程-CSS样式操作大全

## 原文链接
[https://segmentfault.com/a/1190000014663249](https://segmentfault.com/a/1190000014663249)

