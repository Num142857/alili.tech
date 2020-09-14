---
title: 'vuejs核心概念简析' 
date: 2019-02-07 2:30:16
hidden: true
slug: rv4tkuvb9ds
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">概述</h1>
<p>使用vue编写网页是一个让人愉悦的过程,它同时具备angular和react的优点,轻量级,api简单,文档齐全,简单强大,麻雀虽小五脏俱全.</p>
<p><span class="img-wrap"><img data-src="/img/bVx0aN" src="https://static.alili.tech/img/bVx0aN" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>快速开始vue最好的方式是<a href="http://vuejs.org.cn/guide/" rel="nofollow noreferrer" target="_blank">阅读官网的文档</a>,这是学习vue最好的途径,没有之一.基本上通读文档即可让你从入门到精通了,下面讨论一下vue的精髓与重点需要理解的部分</p>
<blockquote><p>vue的精髓在于基于数据的状态和组件式编程</p></blockquote>
<h1 id="articleHeader1">数据驱动</h1>
<h4>基于操作dom的方式</h4>
<p><span class="img-wrap"><img data-src="/img/bVx1by" src="https://static.alili.tech/img/bVx1by" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>程序=数据结构+算法</p></blockquote>
<p>这是每个程序都耳熟能详的一句话,可在前端这里并不纯粹,因为前端需要跟界面打交道,html+css并没用被抽象成某种在js中使用的数据结构,充当的更多是界面的一种配置,jquery程序员看待他的方式就一块块的ui,用到的时候再$一下,获取之后修改.整个程序写下来是零零散散的节点操作.</p>
<p>一个比较实际的情况就是,在ui控件有联动的时候,如果没有一种机制来管理这些ui之间的修改,那么依赖程序员自己去手动管理这些ui的状态,会让人烦不胜烦,且容易出现bug.</p>
<p>总结一下基于操作dom的前端开发方式</p>
<p>拼界面-&gt;找到dom节点-&gt;修改属性-&gt;检测是否有其他影响的节点-&gt;根据刚刚修改的dom节点更新自己的状态<br>那么上面的那句话就变成了</p>
<blockquote><p>前端程序 = 拼界面+操作ui+算法</p></blockquote>
<h4>基于数据驱动的方式</h4>
<p>vue或者angular这些mvvm框架给了前端另一种思路,完全基于数据驱动的编程,完全根据数据的状态决定ui以何种方式展示.我觉得这就是mvvm框架最大的思路上的突破,而directive或者filter或者是element directive,在jquery时代也不是什么新鲜的东西(这并不是说指令那些不重要).</p>
<p>让我们看一个例子,对比两者编程思路的不同</p>
<p><span class="img-wrap"><img data-src="/img/bVx1cY" src="https://static.alili.tech/img/bVx1cY" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>上面是常见的登录的界面,需求如下:</p>
<ol>
<li><p>上面全部填写完成格式正确,登录按钮才能点击</p></li>
<li><p>图片验证码需要用户名和输入法都填写完毕的情况才出现</p></li>
</ol>
<p>使用dom的编程方式主要步骤如下</p>
<ol>
<li><p>获取用户名的input,侦听输入事件,在回调里面判断步骤4</p></li>
<li><p>获取密码的input,侦听输入事件,在回调里面判断步骤4</p></li>
<li><p>获取验证码的input,侦听输入事件,在回调里面判断步骤4</p></li>
<li><p>回调函数需要判读用户名和密码是否输入正确,如果是显示验证码,再判断验证码是否已经输入<br>是则获取提交按钮,并显示.</p></li>
<li><p>点击提交按钮的时候,获取3个input的值,提交数据.</p></li>
</ol>
<p>数据驱动的做法</p>
<ol>
<li><p>声明三个变量,用户名,密码,验证码,使用数据绑定把变量绑定到三个input</p></li>
<li><p>验证码的显示状态 = 用户名不为空 &amp;&amp; 密码不为空</p></li>
<li><p>提交按钮的显示状态 = 用户名不为空 &amp;&amp; 密码不为空 &amp;&amp; 验证码不为空</p></li>
<li><p>点击提交按钮,提交三个变量</p></li>
</ol>
<p>我们在数据驱动的时候,并没有操作dom节点,也没有侦听任何的事件,这些框架都为我们做好了,框架采用一种数据绑定的方式,自动绑定dom节点的属性.这样就把你从操作dom节点的繁琐过程中解脱出来了,你只要专注于数据的状态,ui更新的事情你不需要去管了,不过是样式还是内容,可见性还是切换class,框架帮你把关注点从传统的dom操作转移到了数据,回归编程的本质:数据结果+算法.<br>上面的例子,最直白的表现就是,你几乎不需要写一行代码了^_^,现在可能不太明显,我们会在后续的分享中,看到数据驱动在复杂状态中的优异表现.</p>
<h1 id="articleHeader2">组件式编程</h1>
<p><span class="img-wrap"><img data-src="/img/bVx1rf" src="https://static.alili.tech/img/bVx1rf" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个理念不是来源于vue,我第一次接触到组件式编程的是adobe的flex,而把web组件式开发发扬光大的应该是react了,组件开发是一种朴素的开发思想,分而治之,大型系统拆分成一个个的小模块小组件,分配给不同的人.额外的好处是顺便能复用这个组件。</p>
<p>理解组件的思想可以类比函数。一个函数包含哪些东西呢？</p>
<ol>
<li><p>形参</p></li>
<li><p>局部变量</p></li>
<li><p>函数名</p></li>
<li><p>返回值</p></li>
</ol>
<p>那对应到vue中又是什么呢?</p>
<table>
<thead><tr>
<th align="center">函数</th>
<th align="center">vue组件</th>
</tr></thead>
<tbody>
<tr>
<td align="center">形参</td>
<td align="center">slot,props</td>
</tr>
<tr>
<td align="center">局部变量和局部函数</td>
<td align="center">data,methods</td>
</tr>
<tr>
<td align="center">函数名</td>
<td align="center">name</td>
</tr>
<tr>
<td align="center">return</td>
<td align="center">template</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader3">形参</h3>
<p>这个放在第一个讲，因为比其它的复杂。</p>
<h4>props</h4>
<p>函数可以接受外部的输入，然入内部吐出加工之后的结果，在vue中也是如此的，vue的组件允许从外部接收定义好的prop，可以指定相关的数据类型，默认值，是否允许为空，是否双向数据同步，是否单次绑定，这就把vue组件从静态的组件赋予了从外部接受参数，从而实现配置化的能力，举一个例子，一般一个面板需要有可变的标题，底部多少个按钮，是否显示后面的蒙板层，这些都可以从外部接受参数传入，从而达到组件的多样化配置，大大增强了组件的灵活性。</p>
<h4>slot</h4>
<p>那slot呢？既然有了props，为什么还需要slot来做为另一种外部的输入呢？</p>
<p>我们还是以上面的面板做为一个例子，试想一下，有一个panel的函数如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function panel(title,btnCount,showModel,content){

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">panel</span><span class="hljs-params">(title,btnCount,showModel,content)</span></span>{

}
</code></pre>
<p>大家注意到了content了没有，面板的主体内容，一般来说面板的主体内容都比较复杂，这意味着在html标签会十分的多，那么如果在prop里面传入html的模板内容，代码的可维护性将大大的降低，而且十分不优雅，所以vue使用了slot，即所谓的插槽，来实现内容的"props"，它可以在组件内部定义好slot的插入点，外部html插入的时候就能指定一个插入点替换掉这个slot了，我理解的slot就是针对复杂内容的一种外部参数了，那么不复杂的内容是不是就可以不需要了？我个人觉得是的，比如你的面板可能只需要一句话，那大可以使用prop传入即可，比如alert。但是，但是，内容的可替换性还远远不算是slot的唯一不同，这里我想说一下slot内容的作用域的问题。</p>
<p>试想一下，一个面板主体的内容是一个表单，表单使用v-model绑定了一些值，那么这些绑定的值是属于提供主体内容组件的，还是属于这个面板的呢？</p>
<p>我们来猜想一下:<br>属于面板<br>如果v-model属于面板的话，那么你有多少的绑定，就需要在面板组件声明多少，而这几乎是不可能的，因为主体内容每个面板都几乎是不一样的，这就造成了，主体内容跟面板的高度藕合，这个面板就几乎没有了任何的可扩展性。</p>
<p>属于提供主体内容的组件<br>由提供主体内容的组件自己去管理自己的绑定，这就好比，面板只提供了一个运动场地，你们爱做什么由你们自己去决定。这样的话，slot插入点跟内容完全解藕，你做你的事情，我只给你提供一个位置。这就是slot的精妙之处。<strong>我们不生产内容，我们只是内容的搬运工。</strong></p>
<p>vue的文档已经写得很清楚了</p>
<blockquote><p>父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译</p></blockquote>
<p>所以在设计一个组件的时候，什么时候使用props，什么时候使用slot呢？</p>
<p>属于数值驱动的用props，属于html内容的使用slot，除非你的内容只是一句字符串。简单明了。</p>
<h3 id="articleHeader4">局部变量</h3>
<p>局部变量很好理解，对应于vue的data的而已，这跟函数里面使用var声明一个变量是一样的，唯一要注意的有几点，不要使用$和_作用变量的开头，vue会忽略掉它。</p>
<h3 id="articleHeader5">method</h3>
<p>方法也很好理解，就是给vue调用的方法而已，参考以前在html标签使用的onclick=alert等等</p>
<h3 id="articleHeader6">templete</h3>
<p>组件的html结构，这是必须的选项，毕竟组件是要显示在界面上的.类似于函数的返回值</p>
<h3 id="articleHeader7">name</h3>
<p>对应函数的名字，其实name属性是可选的，就好像函数名也不是必须的，比如匿名函数，那什么时候会用到，函数递归的时候，需要有函数名，那么组件递归的时候也是不可或缺的，<a href="http://vuejs.org.cn/examples/tree-view.html" rel="nofollow noreferrer" target="_blank">参考树组件</a>。</p>
<h1 id="articleHeader8">小结</h1>
<p>上面我们讨论了vue的一些核心的概念，我相信只要理解了vue数据驱动和组件相关的知识点，就已经掌握了vue的百分之七八十了，至于指令跟过滤器这些，都是一些比较简单的概念，对于学过ng的人更是小菜一碟。如果能深刻的把握住mvvm跟组件化的要点，不管是ng还有react，都能触类旁通，举一反三，而vue刚好融合了两者的优点，精简了其中的api，堪称优雅，大道至简。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs核心概念简析

## 原文链接
[https://segmentfault.com/a/1190000005914700](https://segmentfault.com/a/1190000005914700)

