---
title: '用vue一个计算属性，实现一个常见表单交互效果' 
date: 2019-01-11 2:30:08
hidden: true
slug: gbtf1g0ebu
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">1.前言</h1>
<p>vue.js是现在用的非常火热的一个前端框架，表单又是网站基本不会缺少的一环。用vue操作表单。表单的操作方式也是多种多样。今天我说的，就是我项目那里做的这一种操作。</p>
<p><span class="img-wrap"><img data-src="/img/bVPBzc?w=367&amp;h=478" src="https://static.alili.tech/img/bVPBzc?w=367&amp;h=478" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，用户进入这个页面，但是必填的信息没有填的话，则按钮不能点击。这个之前还是用jquery的时候，就是通过用户每一次完成输入（文本框失去焦点）进行一次判断，如果必填的填完了，就可以让用户点击，否则就不能点击。毕竟不可能直接发送请求，让后端判断，再返回成功与否嘛！<br>但是现在如果是用vue的话，实现这个效果会很简单，效果也会比使用jquery或者原生JavaScript操作Dom要好。怎么做呢，下面说！</p>
<h1 id="articleHeader1">2.实现过程</h1>
<p>页面就是想上面那样，那个页面的排版和项目的搭建我就不多说了。直接进入正题！<br>页面的html代码就是这样</p>
<p><span class="img-wrap"><img data-src="/img/bVPBCh?w=1392&amp;h=813" src="https://static.alili.tech/img/bVPBCh?w=1392&amp;h=813" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>看到页面，我们知道，会有这几个data数据(用户名，用户电话和公司名称)，下面产品那一块，<br><span class="img-wrap"><img data-src="/img/bVPBCZ?w=371&amp;h=98" src="https://static.alili.tech/img/bVPBCZ?w=371&amp;h=98" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这一块肯定是动态的，比如，点击了增加按钮，就增加一行的需求</p>
<p><span class="img-wrap"><img data-src="/img/bVPBC5?w=403&amp;h=150" src="https://static.alili.tech/img/bVPBC5?w=403&amp;h=150" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>点击<span class="img-wrap"><img data-src="/img/bVPBC6?w=36&amp;h=35" src="https://static.alili.tech/img/bVPBC6?w=36&amp;h=35" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span>，就少一行需求</p>
<p><span class="img-wrap"><img data-src="/img/bVPBC9?w=382&amp;h=97" src="https://static.alili.tech/img/bVPBC9?w=382&amp;h=97" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>每一行产品都有一个产品名称和数量，又是动态的，那么这么产品这个数据，就肯定是一个对象数组，那么data数据就如下面这样！<br>如下图，数据就弄好了！(用户名-<code>userName</code>，用户电话-<code>userPhone</code>,公司名称-<code>corpName</code>,产品-<code>productList</code>,里面的<code>proName</code>就是产品名称，<code>num</code>对应产品数量)<br><span class="img-wrap"><img data-src="/img/bVPBAG?w=738&amp;h=345" src="https://static.alili.tech/img/bVPBAG?w=738&amp;h=345" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>最后就是计算属性了，这个相当的简单，就是判断，<code>data</code>里面的那几个数据是否为空而已。productList判断就是稍微复杂一点而已，不过也就是<code>productList</code>长度也不能为空，就是至少要添加一条数据。然后遍历数组的每一项，判断每一项的<code>proName</code>和<code>num</code>是否为空而已。写法就如下面。（<em>ps:遍历的时候，用迭代方法会更好，只是我当时做项目的时候还没有写迭代方法的习惯，还是用for居多，迭代方法的写法，可以参考我之前发的文章</em>-<a href="https://segmentfault.com/a/1190000009870199">迭代方法</a>）</p>
<p><span class="img-wrap"><img data-src="/img/bVPBCs?w=1090&amp;h=284" src="https://static.alili.tech/img/bVPBCs?w=1090&amp;h=284" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>这样写，直接完成了一个快捷功能，比如下面这里填完了，就可以提交了</p>
<p><span class="img-wrap"><img data-src="/img/bVPBTc?w=372&amp;h=397" src="https://static.alili.tech/img/bVPBTc?w=372&amp;h=397" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>但是，如果用户又想增加一个产品呢！这下按钮就是主动变成不可点击的状态，<br><span class="img-wrap"><img data-src="/img/bVPBTQ?w=374&amp;h=483" src="https://static.alili.tech/img/bVPBTQ?w=374&amp;h=483" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果删除了新添加的一行产品就又可以点击了！</p>
<p><span class="img-wrap"><img data-src="/img/bVPBT3?w=374&amp;h=429" src="https://static.alili.tech/img/bVPBT3?w=374&amp;h=429" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果是以前用原生js或者jquery写的话，就比较麻烦了。最后，点击增加和删除一行产品这个的实现就不多说了，无非就是一个对<code>productList</code>的<code>unshift</code>和<code>splice</code>的操作。<br>今天这个是很简单的一个应用，希望这个能帮到大家，我也是希望大家扩展想象下应用的场景，把开发技巧和水平都提升一个等级。</p>
<h1 id="articleHeader2">3.后续</h1>
<p>关于vue的写作技巧还有很多，今天这个只是比较简单，比较基础的一个。以后有发现的话，会继续分享给大家，另外如果觉得我哪里有改善的地方，欢迎指出！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue一个计算属性，实现一个常见表单交互效果

## 原文链接
[https://segmentfault.com/a/1190000009879401](https://segmentfault.com/a/1190000009879401)

