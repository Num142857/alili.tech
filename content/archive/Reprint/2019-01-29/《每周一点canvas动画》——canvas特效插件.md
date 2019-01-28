---
title: '《每周一点canvas动画》——canvas特效插件' 
date: 2019-01-29 2:30:10
hidden: true
slug: zkudf3b3gmp
categories: [reprint]
---

{{< raw >}}

                    
<p>很长时间没有更新文章了，经过几个月的时间，事情终于忙完了。今天，在这里为大家分享3款canvas特效插件，与其说是分享，不如说是为了方便使用，对前面章节的一些效果的封装。</p>
<h3 id="articleHeader0">1. Martrix.js</h3>
<p><span class="img-wrap"><img data-src="/img/bVHsaC?w=698&amp;h=383" src="https://static.alili.tech/img/bVHsaC?w=698&amp;h=383" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/supperjet/pen/JbqZPK" rel="nofollow noreferrer" target="_blank">点击查看DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/JbqZPK" data-typeid="3">点击预览</button>   |    <a href="https://github.com/supperjet/Martrix.js" rel="nofollow noreferrer" target="_blank">GIthub地址</a></p>
<h4>API</h4>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>cW</td>
<td>Number</td>
<td>1367</td>
<td>canvas宽度</td>
</tr>
<tr>
<td>cH</td>
<td>Number</td>
<td>700</td>
<td>canvas高度</td>
</tr>
<tr>
<td>wordColor</td>
<td>String</td>
<td>'#33ff33'</td>
<td>文字颜色</td>
</tr>
<tr>
<td>fontSize</td>
<td>Number</td>
<td>15</td>
<td>文字大小</td>
</tr>
<tr>
<td>speed</td>
<td>Number</td>
<td>0.13</td>
<td>下落速度</td>
</tr>
<tr>
<td>words</td>
<td>String</td>
<td>”0123456...“</td>
<td>显示文字</td>
</tr>
</tbody>
</table>
<p>具体使用方法请看Github文档</p>
<h3 id="articleHeader1">2. Dot.js</h3>
<p>文字粒子特效插件，所用的都是前面所讲的知识<br><span class="img-wrap"><img data-src="/img/bVHsaO?w=843&amp;h=499" src="https://static.alili.tech/img/bVHsaO?w=843&amp;h=499" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/supperjet/pen/vyMKWO" rel="nofollow noreferrer" target="_blank">点击查看DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/vyMKWO" data-typeid="3">点击预览</button>   |    <a href="https://github.com/supperjet/Dot" rel="nofollow noreferrer" target="_blank">GIthub地址</a></p>
<h4>API</h4>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>cW</td>
<td>Number</td>
<td>1367</td>
<td>canvas宽度</td>
</tr>
<tr>
<td>cH</td>
<td>Number</td>
<td>500</td>
<td>canvas高度</td>
</tr>
<tr>
<td>numDot</td>
<td>Number</td>
<td>100</td>
<td>粒子数目</td>
</tr>
<tr>
<td>radDot</td>
<td>Number</td>
<td>3</td>
<td>粒子半径</td>
</tr>
<tr>
<td>isRangeRad</td>
<td>Boolean</td>
<td>true</td>
<td>是否随机粒子半径（给定的radDot范围内）</td>
</tr>
<tr>
<td>dotColor</td>
<td>String</td>
<td>”#FFFFFF“</td>
<td>粒子填充颜色</td>
</tr>
<tr>
<td>lineDist</td>
<td>Number</td>
<td>75</td>
<td>连线距离</td>
</tr>
<tr>
<td>lineColor</td>
<td>String</td>
<td>"#FFFFFF"</td>
<td>连线颜色</td>
</tr>
<tr>
<td>bounce</td>
<td>Number</td>
<td>1</td>
<td>反弹系数</td>
</tr>
<tr>
<td>opacity</td>
<td>Number</td>
<td>0.5</td>
<td>透明度</td>
</tr>
<tr>
<td>isTouch</td>
<td>Boolean</td>
<td>false</td>
<td>是否与鼠标发生交互</td>
</tr>
<tr>
<td>vxRange</td>
<td>Number</td>
<td>2</td>
<td>粒子x方向速度</td>
</tr>
<tr>
<td>vyRange</td>
<td>Number</td>
<td>2</td>
<td>粒子y方向速度</td>
</tr>
<tr>
<td>isWallCollisionTest</td>
<td>Boolean</td>
<td>true</td>
<td>是否与边界碰撞检测</td>
</tr>
<tr>
<td>isBallCollisionTest</td>
<td>Boolean</td>
<td>true</td>
<td>球体间是否发生碰撞检测</td>
</tr>
</tbody>
</table>
<p>具体使用方法请看Github文档</p>
<h3 id="articleHeader2">3.waterWave.js</h3>
<p><span class="img-wrap"><img data-src="/img/bVHsaZ?w=945&amp;h=561" src="https://static.alili.tech/img/bVHsaZ?w=945&amp;h=561" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="http://codepen.io/supperjet/pen/LboKLg" rel="nofollow noreferrer" target="_blank">点击查看DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="supperjet/pen/LboKLg" data-typeid="3">点击预览</button>   |    <a href="https://github.com/supperjet/waterWave.js" rel="nofollow noreferrer" target="_blank">GIthub地址</a></p>
<h4>API</h4>
<table>
<thead><tr>
<th>属性</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>cW</td>
<td>Number</td>
<td>1367</td>
<td>canvas宽度</td>
</tr>
<tr>
<td>cH</td>
<td>Number</td>
<td>500</td>
<td>canvas高度</td>
</tr>
<tr>
<td>baseY</td>
<td>Number</td>
<td>150</td>
<td>液面高度</td>
</tr>
<tr>
<td>oneColor</td>
<td>String</td>
<td>"#6ca0f6"</td>
<td>上层颜色</td>
</tr>
<tr>
<td>twoColor</td>
<td>String</td>
<td>"#367aec"</td>
<td>下层颜色</td>
</tr>
<tr>
<td>vertexsNum</td>
<td>Number</td>
<td>250</td>
<td>顶点数目</td>
</tr>
<tr>
<td>autoDiff</td>
<td>Number</td>
<td>1000</td>
<td>初始浪高</td>
</tr>
<tr>
<td>isMouseWhell</td>
<td>Boolean</td>
<td>true</td>
<td>是否支持滚轮滚动</td>
</tr>
<tr>
<td>isDrop</td>
<td>Boolean</td>
<td>true</td>
<td>是否来个雨滴</td>
</tr>
<tr>
<td>dropRadius</td>
<td>Number</td>
<td>3</td>
<td>雨滴半径</td>
</tr>
<tr>
<td>dropLocation</td>
<td>Number</td>
<td>500</td>
<td>雨滴位置</td>
</tr>
<tr>
<td>isShowTips</td>
<td>Boolean</td>
<td>true</td>
<td>是否显示提示</td>
</tr>
</tbody>
</table>
<p>具体使用方法请看Github文档</p>
<h3 id="articleHeader3">4.结语</h3>
<p>今天的分享就到这里，后面会分享跟多的canvas特效插件。前面的文章在我修改完善后会逐渐上传。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《每周一点canvas动画》——canvas特效插件

## 原文链接
[https://segmentfault.com/a/1190000007934111](https://segmentfault.com/a/1190000007934111)

