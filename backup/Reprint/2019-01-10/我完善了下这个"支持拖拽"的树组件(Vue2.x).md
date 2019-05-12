---
title: '我完善了下这个"支持拖拽"的树组件(Vue2.x)' 
date: 2019-01-10 2:30:08
hidden: true
slug: lbjnuilqrt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>Github: <a href="https://github.com/shuiRong/vue-drag-tree" rel="nofollow noreferrer" target="_blank">https://github.com/shuiRong/v...</a><br>Demo: <a href="https://vigilant-curran-d6fec6.netlify.com/#/" rel="nofollow noreferrer" target="_blank">https://vigilant-curran-d6fec...</a>
</blockquote>
<p>和v1.0.0比起来,差别还是挺大的.(至少能让别人看得下去了)</p>
<p><strong>预览:</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000016040867" src="https://static.alili.tech/img/remote/1460000016040867" alt="vue-drag-tree.gif" title="vue-drag-tree.gif" style="cursor: pointer;"></span></p>
<p><strong>特性:</strong></p>
<ul>
<li>
<strong>双击</strong>节点<strong>添加</strong>一个字节点</li>
<li>对节点进行<strong>任意拖拽</strong>
</li>
<li>
<strong>控制</strong>特定节点<strong>是否可拖</strong>、<strong>是否可放置</strong>其他节点</li>
<li>
<strong>增加/删除</strong> 任意层级的节点（#待添加）</li>
</ul>
<h3 id="articleHeader0">接口</h3>
<hr>
<p><strong>属性</strong></p>
<table>
<thead><tr>
<th align="left">属性名</th>
<th align="left">描述</th>
<th align="left">类型</th>
<th align="left">默认值</th>
</tr></thead>
<tbody>
<tr>
<td align="left">data</td>
<td align="left">节点树的数据</td>
<td align="left">Array</td>
<td align="left">－－</td>
</tr>
<tr>
<td align="left">defaultText</td>
<td align="left">新生成的节点的文本(name属性)</td>
<td align="left">String</td>
<td align="left">新增节点</td>
</tr>
<tr>
<td align="left">allowDrag</td>
<td align="left">判断哪些节点可以被拖拽（return true表示允许）</td>
<td align="left">Function</td>
<td align="left">()=&gt;true</td>
</tr>
<tr>
<td align="left">allowDrop</td>
<td align="left">判断哪些节点可以被塞入其他节点（return true表示允许）</td>
<td align="left">Function</td>
<td align="left">()=&gt;true</td>
</tr>
</tbody>
</table>
<p><strong>方法</strong></p>
<table>
<thead><tr>
<th>方法名</th>
<th>描述</th>
<th>参数</th>
</tr></thead>
<tbody>
<tr>
<td>current-clicked</td>
<td>告诉你哪个节点被点击了，这个节点所在的组件是哪个</td>
<td>(model,component) model: 当前被点击节点的数据． component: 当前节点所在的树组件</td>
</tr>
<tr>
<td>drag</td>
<td>节点被拖动时触发的&nbsp;<code>drag</code>&nbsp;事件</td>
<td>(model,component,e) model: 当前被拖动节点的数据; component: 当前被拖动节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
<tr>
<td>drag-enter</td>
<td>当被拖动节点进入有效的放置目标时，&nbsp;<code>dragenter</code>&nbsp;事件被触发</td>
<td>(model,component,e) model: 有效放置目标节点的数据; component: 有效放置目标节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
<tr>
<td>drag-leave</td>
<td>当被拖动节点离开有效的放置目标时，&nbsp;<code>dragleave</code>&nbsp;事件被触发</td>
<td>(model,component,e) model: 有效放置目标节点的数据; component: 有效放置目标节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
<tr>
<td>drag-over</td>
<td>当节点被拖拽到一个有效的放置目标上时，触发&nbsp;<code>dragover&nbsp;</code>事件</td>
<td>(model,component,e) model: 有效放置目标节点的数据; component: 有效放置目标节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
<tr>
<td>drag-end</td>
<td>拖放事件在拖放操作结束时触发</td>
<td>(model,component,e) model: 当前被拖动节点的数据; component: 当前被拖动节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
<tr>
<td>drop</td>
<td>当节点被放置到一个有效的防止目标上时，<code>drop</code>被触发</td>
<td>(model,component,e) model: 当前被拖动节点的数据; component: 当前被拖动节点所在的树组件（VNode）; e: 拖拽事件</td>
</tr>
</tbody>
</table>
<p><strong>License</strong></p>
<hr>
<p><a>MIT</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我完善了下这个"支持拖拽"的树组件(Vue2.x)

## 原文链接
[https://segmentfault.com/a/1190000010011743](https://segmentfault.com/a/1190000010011743)

