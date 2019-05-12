---
title: '解决 vue Element ui tree 不能单选的问题' 
date: 2018-12-01 2:30:12
hidden: true
slug: 9k7wsc6yswa
categories: [reprint]
---

{{< raw >}}

                    
<p>在项目中遇到的需要使用 tree 控件进行选择，如下图</p>
<p><span class="img-wrap"><img data-src="/img/bVbaekI?w=902&amp;h=776" src="https://static.alili.tech/img/bVbaekI?w=902&amp;h=776" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>本来的思路是在change的事件里进行 每次点击进行清空</p>
<blockquote>this.$refs.tree.setCheckedKeys([]);</blockquote>
<p>但是在执行此操作的时候，发现change事件会逐渐的循环，导致选择不上</p>
<p>现在的思路是：在每次进行点击时，如果发现数据中已有该数据，便进行删除</p>
<p>没有数据，择进行添加，如果只有一个数据，那么就把当前的树节点进行false选择</p>
<p>代码如下</p>
<p><span class="img-wrap"><img data-src="/img/bVbaeqz?w=1462&amp;h=340" src="https://static.alili.tech/img/bVbaeqz?w=1462&amp;h=340" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>this.selectOrg.orgsid 是一个中间数据，进行判断，所以没有使用默认选择的那个数组</p>
<p><span class="img-wrap"><img data-src="/img/bVbahas?w=1394&amp;h=960" src="https://static.alili.tech/img/bVbahas?w=1394&amp;h=960" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后就可以进行单选了</p>
<p>努力学习</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决 vue Element ui tree 不能单选的问题

## 原文链接
[https://segmentfault.com/a/1190000014792761](https://segmentfault.com/a/1190000014792761)

