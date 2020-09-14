---
title: 'Jerry和您聊聊Chrome开发者工具' 
date: 2018-12-05 2:30:09
hidden: true
slug: iqfna4to61n
categories: [reprint]
---

{{< raw >}}

                    
<p>Chrome开发者工具是Jerry日常工作使用的三大调试器之一。虽然工具名称前面带了个"开发者", 但是它对非开发人员仍然有用。不信？</p>
<p>用Chrome打开我们常用的网站，按F12，在Console标签页里看到这些信息，这些都是很老的梗了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417722" src="https://static.alili.tech/img/remote/1460000014417722" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417723" src="https://static.alili.tech/img/remote/1460000014417723" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在网易云音乐上听歌，如果想保存到本地，不需要安装客户端，直接在Chrome开发者工具里找到mp3的真实链接即可保存。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417724" src="https://static.alili.tech/img/remote/1460000014417724" alt="" title="" style="cursor: pointer;"></span></p>
<p>对于在线视频也能用同样的方式找到真实地址然后保存到本地。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417725" src="https://static.alili.tech/img/remote/1460000014417725" alt="" title="" style="cursor: pointer;"></span></p>
<p>前段时间我看到一则新闻，题目是"骗子骗术再高，遇到程序员也折腰"，介绍了一位程序员收到诈骗短信后，不仅识破了诈骗犯的套路，全程机智应答，设陷下套，一步步将对方引入自己的节奏，最后直接控制了诈骗犯的电脑和摄像头。</p>
<p>我的这位同行用到的一个方法就是：在上图Chrome开发者工具的Console面板里敲入指令document.body.contentEditable='true', 这样使得整个网页处于可编辑状态。然后就可以随心所欲地修改网页上的内容，比如可以像下图这样做做白日梦：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417726" src="https://static.alili.tech/img/remote/1460000014417726" alt="" title="" style="cursor: pointer;"></span></p>
<p>使用Chrome的记住密码功能，时间长了都忘记密码是什么了。虽然这些密码在Chrome设置里也能找到，但更快捷的方式还是直接在Chrome开发者工具里打印出来。</p>
<p>在Chrome开发者工具里点击Elements标签，然后点击网页上的密码元素，该元素的实现的html代码就显示在标签页里了。这里我们能看出该元素的id为password。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417727" src="https://static.alili.tech/img/remote/1460000014417727" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>再回到Console标签，输入$("#password").value, 即可显示出密码。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417728" src="https://static.alili.tech/img/remote/1460000014417728" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>以前网上有个著名的段子。一位程序猿打开珍爱网想找个对象。浏览了几分钟网页，他习惯性地按了F12打开Chrome开发者工具，发现Console标签打印了几条错误信息，然后就习惯性地开始了调试。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417729" src="https://static.alili.tech/img/remote/1460000014417729" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>然后，就没有然后了。。。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417730" src="https://static.alili.tech/img/remote/1460000014417730" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>下面是一些我日常工作中使用Chrome开发者工具的心得和小技巧，希望对您提高开发和调试的效率能有所帮助。</p>
<h1 id="articleHeader0">1. Element属性断点</h1>
<p>在Element标签页选中某个html标签，在右键菜单里设置Attributes modifications断点。下图意思是一旦title标签的属性发生变化，断点自动触发。</p>
<p>我曾经处理过一个incident，用户抱怨在Fiori应用里做了一些操作之后，页面的title被修改成一个错误的值。借助这个属性断点功能，我很快找到了title被修改的那行代码。这个incident的更多细节请参考我的博客：<br><a href="https://blogs.sap.com/2016/05/26/a-quick-way-to-find-which-code-has-changed-the-ui5-application-page-title-by-debugging/" rel="nofollow noreferrer" target="_blank">A quick way to find which code has changed the UI5 application page title by debugging</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417731" src="https://static.alili.tech/img/remote/1460000014417731" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader1">2. 在浏览器的原生方法里设置断点</h1>
<p>这种说法其实并不准确，因为我们没办法在Chrome里查看浏览器原生方法的实现代码，更别提设置断点了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417732" src="https://static.alili.tech/img/remote/1460000014417732" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其实我的需求是，希望调试的时候，在这些浏览器原生方法以某些特殊输入参数被调用时能停下来。</p>
<p>举个例子，在我研究Angular框架时，用ng-repeat画了一个列表，如下图所示。我发现对于每条列表记录，最终生成的原生html代码都有一个注释元素，如下图红色高亮区域显示。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417733" src="https://static.alili.tech/img/remote/1460000014417733" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我很好奇Angular框架是在哪行代码生成的这三个注释元素。按照推理，这些注释肯定是通过原生方法createComment创建的，然而我无法在这个方法里面设置断点。如果直接在Angular框架里根据源代码createComment搜索，然后在所有的搜索结果处设置断点——这种方法理论上可行，然而效率太低，因为搜索结果有将近100处调用了createComment。</p>
<p>怎么办？</p>
<p>(1) 在angular.js文件最开始的地方设置断点, 打开应用，断点触发:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417734" src="https://static.alili.tech/img/remote/1460000014417734" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>(2) 将浏览器原生的方法实现保存在变量oldFn里，然后重写createComment。在重写的版本里，加上我自己的判断逻辑：我期望只有当创建的comment文本包含ngRepeat时，断点才触发。实现如下图所示。在console里执行下图代码，完成对createComment原始实现的覆盖。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417735" src="https://static.alili.tech/img/remote/1460000014417735" alt="" title="" style="cursor: pointer;"></span></p>
<p>然后在调试器里继续执行，最终断点在我想要找的位置触发：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417736" src="https://static.alili.tech/img/remote/1460000014417736" alt="" title="" style="cursor: pointer;"></span></p>
<p>这就是我要寻找的Angular框架创建包含ngRepeat注释的代码位置:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417737" src="https://static.alili.tech/img/remote/1460000014417737" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">3. Chrome开发者工具里的一些隐藏命令</h1>
<p>在Chrome地址栏里输入chrome://开头的一系列命令可以实现各种各样的功能。不过我日常工作用得最多的是chrome://net-internals。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417738" src="https://static.alili.tech/img/remote/1460000014417738" alt="" title="" style="cursor: pointer;"></span></p>
<p>在SAP成都Revenue Cloud开发团队Wang Cong的帮助下，我使用这个功能解开了困扰过我一段时间的关于JavaScript source code map的谜团。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417739" src="https://static.alili.tech/img/remote/1460000014417739" alt="" title="" style="cursor: pointer;"></span></p>
<p>我把如何通过chrome://net-internals研究JavaScript source code map的过程写在了这三篇博客里:</p>
<p>(1) <a href="https://blogs.sap.com/2017/12/08/a-debugging-issue-caused-by-source-code-mapping/" rel="nofollow noreferrer" target="_blank">A debugging issue caused by source code mapping</a></p>
<p>(2) <a href="https://blogs.sap.com/2018/04/10/ui5-source-code-map%E6%9C%BA%E5%88%B6%E7%9A%84%E7%BB%86%E8%8A%82%E4%BB%8B%E7%BB%8D/" rel="nofollow noreferrer" target="_blank">UI5 Source code map机制的细节介绍</a></p>
<p>(3) <a href="https://blogs.sap.com/2017/02/06/useful-chrome-tool-chromenet-internals-to-monitor-http-request-detail/" rel="nofollow noreferrer" target="_blank">Useful Chrome Tool chrome://net-internals to monitor http request detail</a></p>
<h1 id="articleHeader3">4. 将JavaScript变量的内容保存成本地文件</h1>
<p>我在SAP处理Fiori应用的incident时经常需要这个功能：比如调试Fiori应用的前后台交互，我想把后台返回的JSON响应另存成一个本地文件。当然我可以在Chrome开发者工具的network标签页手动选中响应内容，然后Ctrl C，再到本地新建一个文件，Ctrl V。我嫌这个步骤麻烦，在这篇<a href="http://bgrins.github.io/devtools-snippets/" rel="nofollow noreferrer" target="_blank">博客</a>上找到了另一种快捷的做法。</p>
<p>直接在console里执行这段代码：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417740" src="https://static.alili.tech/img/remote/1460000014417740" alt="" title="" style="cursor: pointer;"></span></p>
<p>这段代码会给console对象注入一个新方法save, 接下来就能使用console.save(&lt;variable name&gt;, &lt;local file name&gt;)将任意变量保存成本地文件，非常方便。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417741" src="https://static.alili.tech/img/remote/1460000014417741" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader4">5. 分析JavaScript的垃圾回收机制</h1>
<p>这种类型的分析通过Profiles这个标签页完成。详细说明参考我的博客：<br><a href="https://blogs.sap.com/2017/01/11/an-example-of-using-chrome-development-tool-to-analysis-javascript-garbage-collector/" rel="nofollow noreferrer" target="_blank">An example of using Chrome Development Tool to analyze JavaScript garbage collector</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417742" src="https://static.alili.tech/img/remote/1460000014417742" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader5">6. 自学一些浏览器原生方法的实现</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417743" src="https://static.alili.tech/img/remote/1460000014417743" alt="" title="" style="cursor: pointer;"></span></p>
<p>想知道这种toString方法具体是怎么实现的么？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417744" src="https://static.alili.tech/img/remote/1460000014417744" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>您得在Chrome开发者工具里打开选项Show native functions in JS profile，然后查看我的博客：</p>
<p><a href="https://blogs.sap.com/2017/04/23/use-chrome-development-tool-to-do-self-study-on-some-javascript-function-native-implementation/" rel="nofollow noreferrer" target="_blank">Use Chrome development tool to do self-study on some JavaScript function native implementation</a></p>
<h1 id="articleHeader6">7. console.log的彩色打印</h1>
<p>当我处理一些非常棘手的复杂问题时，经常使用到这个彩色打印的技巧。</p>
<p>我曾经处理过一个incident，UI上显示的列表一次从后台读取20条记录，其中有一条记录的guid和其实际内容不匹配。我需要找到究竟是20条记录里的哪一条记录有错。如果用调试的方式，我设置断点的函数在循环里被调用，断点会不断被触发。我觉得很不耐烦，就采用了console.log的方式，打印每条记录的guid和详细内容。当我观察这些打印输出时，发现它们被淹没在了UI5框架大量的log里。因为我查看自己打印的log的同时，也需要结合UI5打印的log作为上下文来分析，因此我不能在Console标签页里使用过滤的功能来使得只有我自己打印的log被显示出来。</p>
<p>有什么办法能让我自己打印的log不会淹没在UI5框架海量的log里呢？办法就是使其成为“万花丛中一点绿"。</p>
<p>采用下列自定义函数myLog输出的日志，在console里显示的效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417745" src="https://static.alili.tech/img/remote/1460000014417745" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417746" src="https://static.alili.tech/img/remote/1460000014417746" alt="" title="" style="cursor: pointer;"></span></p>
<p>可以显示得再花哨一点：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417747" src="https://static.alili.tech/img/remote/1460000014417747" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417748" src="https://static.alili.tech/img/remote/1460000014417748" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">8. 使用正则表达式过滤网络请求</h1>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417749" src="https://static.alili.tech/img/remote/1460000014417749" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader8">9. jQuery选择器风格的Console命令</h1>
<p>比如我想快速知道当前UI一共有多少个button元素，并查看某些元素的详情。采用类jQuery选择器的语法$('button')即返回所有button元素。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014417750" src="https://static.alili.tech/img/remote/1460000014417750" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>还有其他很多小技巧，以及我最常用的快捷键组合，因为篇幅限制不再赘述，您可以在我的这篇博客里找到我使用Chrome开发者工具的全部技巧。</p>
<p><a href="https://blogs.sap.com/2016/03/15/chrome-development-tool-tips-used-in-my-daily-work/" rel="nofollow noreferrer" target="_blank">Chrome Development Tool tips used in my daily work</a></p>
<p>注：Chrome开发者工具颜色的修改：</p>
<p><span class="img-wrap"><img data-src="/img/bV91QD?w=1105&amp;h=454" src="https://static.alili.tech/img/bV91QD?w=1105&amp;h=454" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>希望这篇文章能让您对Chrome开发者工具有一些更深入的了解，感谢阅读。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Jerry和您聊聊Chrome开发者工具

## 原文链接
[https://segmentfault.com/a/1190000014417717](https://segmentfault.com/a/1190000014417717)

