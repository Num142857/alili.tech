---
title: '关于React的Container&Presentational Component模型结构分析' 
date: 2019-01-29 2:30:10
hidden: true
slug: oeh1wsqop
categories: [reprint]
---

{{< raw >}}

                    
<p>之前翻译了两篇关于Container&amp;Presentational Component模型的文章，一篇是<a href="https://segmentfault.com/a/1190000007786080">基础的Container和Component的定义</a>，另外一篇是<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.tbdzewheo" rel="nofollow noreferrer" target="_blank">进阶版</a>，因为翻译的太烂，感觉有很多错误，所以只放原文链接。</p>
<p>在这里我想讨论一下我自己对这个模型的一些想法。</p>
<p>注：便于书写，下面统一把Container&amp;Presentational Components模型翻译为<strong>容器&amp;展示组件模型</strong></p>
<p>注：下面图片中的components文件夹指的是都是Presentational Components文件夹。</p>
<hr>
<h1 id="articleHeader0">基于容器&amp;展示组件模型的目录结构</h1>
<h2 id="articleHeader1">Round 1:</h2>
<p>刚接触React和这个模型的时候，我认为项目的结构应该是这样子的：<br><span class="img-wrap"><img data-src="/img/bVG95U?w=435&amp;h=320" src="https://static.alili.tech/img/bVG95U?w=435&amp;h=320" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>Containers下面一个jsx文件就代表一个页面，负责和后台交互，负责和Redux进行connect，负责传递数据给component。在Router里面放入对应页面的Container</p></li>
<li><p>Components下面每个jsx文件就代表页面里面所有的渲染的内容，负责渲染，和把从container拿到的数据放到页面上</p></li>
<li><p>顶多把一些基础的component分离出来，便于以后进行复用</p></li>
</ul>
<p>可是才用两天，就知道这么搞有多么坑了。容器组件模型的目的就是<strong>复用性，可读性，可维护性</strong>，然而虽然我们很成功的把后台交互和页面展示分离开了，但是看到这么多代码放在一起，我没有感觉到任何<strong>复用性，可读性，可维护性</strong>，那么多代码，而且都混合了业务逻辑，你让我怎么复用，理解，维护？！<br><span class="img-wrap"><img data-src="/img/bVHaeq?w=240&amp;h=192" src="https://static.alili.tech/img/bVHaeq?w=240&amp;h=192" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">Round 2:</h2>
<p>痛定思痛，决定改一下，针对之前的问题，面向Component做出修改。基本的想法是这样子的：尽量拆分component，避免把所有的东西都放到一个文件里面; 拆出可复用的组件，便于组件的复用；拆分逻辑复杂的模块，增加模块的可读性和可维护性；所以关键字就是“拆、拆、拆”，拆出大好前程，拆出一片蓝天...</p>
<p>所以结构成了这样...<br><span class="img-wrap"><img data-src="/img/bVHamb?w=555&amp;h=448" src="https://static.alili.tech/img/bVHamb?w=555&amp;h=448" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>整个代码结构复杂很多，不过主要的改变就是把基础组件分离出来(Sidebar, Form之类)，每一个页面也精细化。我们可以更清晰的看出每个文件负责的功能，同时像Sidebar, Form这些组件都可以被多个不同的父组件调用。</p>
<p>当然，这不是结束，虽然上面的方法解决了我们<strong>可读性，可复用性，可维护性</strong>，但是也只针对Component的组件，<strong>在container中，依然会有很多的代码堆积在哪里</strong>。</p>
<p>而且还有一个很严重的问题，先看一个代码逻辑结构图：</p>
<p><span class="img-wrap"><img data-src="/img/bVHcm4?w=474&amp;h=328" src="https://static.alili.tech/img/bVHcm4?w=474&amp;h=328" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们现在的数据是通过Container来进行管理的，所以如果Images需要图片数据，那么就需要通过Container-&gt;Top-&gt;Slide-&gt;Images这样进行数据的传递，然而这些图片数据跟中间的组件没有任何关系，但是他们还必须把数据传递给下一级，就像公交车上，从后门递公交卡到前门刷一样，中间的人的心理OS其实是：</p>
<p><span class="img-wrap"><img data-src="/img/bVHcaP?w=219&amp;h=230" src="https://static.alili.tech/img/bVHcaP?w=219&amp;h=230" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>当然代码是没有情感的，不会觉得厌烦，但是由于中间每一层都需要传递数据给下层，一旦某些数据发生改变，就造成了<strong>中间层级的重新render，浪费了浏览器性能的同时，增大了调试的难度</strong>，而且接收数据的组件还要考虑“中间那些牲口们有没有动我的数据”？！</p>
<h2 id="articleHeader3">Round 3:</h2>
<p>所以，为什么一定要让顶级的container作为唯一的数据来源呢？</p>
<p>读了<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f8yr4ndk4" rel="nofollow noreferrer" target="_blank">这篇文章</a>就知道，Container是可以包含多个Container和Presentational Component的，所以我们可以适当的提升一些组件成为container。如果老板一个人直接管理很多员工，绝对会乱七八糟的，这个情况下，leader这个角色就应运而生，我们修改一下文件的结构：<br><span class="img-wrap"><img data-src="/img/bVHcsU?w=819&amp;h=640" src="https://static.alili.tech/img/bVHcsU?w=819&amp;h=640" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在，代码的逻辑结构就变成这样子：<br><span class="img-wrap"><img data-src="/img/bVHcPO?w=543&amp;h=440" src="https://static.alili.tech/img/bVHcPO?w=543&amp;h=440" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>作为<strong>老板的index.jsx</strong>，现在主要负责：</p>
<ul>
<li><p>页面的基础配置，比如页面的title，比如页面整体内容结构的配置</p></li>
<li><p>页面全局的数据的获取和修改</p></li>
</ul>
<p>作为<strong>leader的Top, Content</strong>，现在主要负责:</p>
<ul>
<li><p>和index.jsx进行沟通，获取基础配置和数据</p></li>
<li><p>负责整合需要的container和component</p></li>
<li><p>获取和处理自己对应模块的数据，并传递给下一层级</p></li>
</ul>
<p>作为<strong>presentational component的组件</strong>，就负责获取数据并进行渲染</p>
<p>这么做的好处是，分离了原来顶层container的繁重的任务，使代码更加清晰。同时减少了从数据源到叶子结点的层级，减少了中间层级的数量和不必要的重复渲染。</p>
<p>当然，或许你会觉得之前举的那个栗子，只有index.js下面有一层container，或许中间节点还是太多。其实container里面可以包含container，根据需要，可以创建很多container在不同的层级上。</p>
<h2 id="articleHeader4">Round 4</h2>
<p>View-Container-Presentational Component模型？这个名字是我自己编的，其实是对上面说的结构的一个分离。我也看到过有人说<a href="https://www.zhihu.com/question/53376712/answer/134868475?group_id=790720199480463360#comment-200493710" rel="nofollow noreferrer" target="_blank">Page-Module-Component模型</a>，反正大概思路都是一样的。</p>
<p>其实和上面的差不多，但是作为一个大老板来说，肯定不能和一堆下级员工混在一起，位置看起来有点混乱不说，"客人"(比如Router)来了，还不容易认。所以，我觉得应该给老板一个包间，让老板们在自己的包间中，听候客人的调遣。所以做出一点改动：<br><span class="img-wrap"><img data-src="/img/bVHcI8?w=817&amp;h=640" src="https://static.alili.tech/img/bVHcI8?w=817&amp;h=640" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>Okay，这就是我的最终方案，相比于最早的结构，这个结构更清晰，每个模块负责的功能也更明确，代码可读性、可复用性和可维护性更高。</p>
<p><span class="img-wrap"><img data-src="/img/bVHcJ8?w=224&amp;h=204" src="https://static.alili.tech/img/bVHcJ8?w=224&amp;h=204" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">最后自问自答环节</h2>
<ul><li><p>Container和Presentational Component的区别？</p></li></ul>
<p>Container通常会负责和服务端的沟通，还有一些业务逻辑的处理。他们通常只负责获取数据，处理数据，处理状态，但<strong>一般</strong>不知道如何去展示页面。</p>
<p>Presentational Component通常不知道数据如何获取，也不知道这些数据是做什么用的，更不知道怎么去操作这些数据，他们<strong>一般</strong>只负责页面的渲染，把领导给的数据放到对应的位置。</p>
<p>当然一切都不是绝对的，容器组件模型只是一个指导思想，并不是一个硬性的规定，你可以按照自己的需要来进行改变。而且我在上面给了两个<strong>一般</strong>，也是说明这些不是绝对的。Container当然可以负责页面的展示，老板虽然大部分负责方向和管理，但谁规定老板就不能写代码的？！同样，Component也可以负责获取数据，举个栗子，一个地图的component，或者一个天气预报的component，他们可以从固定的地方获取数据，并把数据渲染出来。</p>
<hr>
<ul><li><p>Container可以包含Presentational Component？Presentational Component是否可以包含Container?</p></li></ul>
<p>Container可以包含Container和Component。</p>
<p>但是Component一般不包含Container，虽然<a href="https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.f8yr4ndk4" rel="nofollow noreferrer" target="_blank">这篇文章</a>的作者最后改口说，Component也可以包含Container，但是个人觉得应该保证component的纯净性，如果包含Container，那么就不再纯净，或许在复用的时候，会出现偏差的情况。</p>
<p>当然像我之前所说，一切都不是硬性规定，或许也只是因为我接触的少所以没有想到Presentational component需要包含container的情况，一切都根据自己的需要进行调整。</p>
<hr>
<ul><li><p>如何知道什么时候要用container，什么时候要用Presentational component?</p></li></ul>
<p>一般Presentational component应该是纯净(Pure)的，也就是说父级传给他的数据不变，那么渲染出来的结果也不应该发生任何变化。所以当一个组件需要业务逻辑处理，业务数据获取，那么可以考虑使用container。如果不需要这些东西，那么考虑使用Presentational component。当然，像之前所说的地图，天气预报，按照逻辑他们也属于component，但是他们也获取数据，处理数据。</p>
<p>当不知道该使用container还是Presentational component的时候，那么或许你在这个时候并不需要去决定这个问题。这种情况下，可以直接使用container来写，当你的container变得越来越复杂，代码量越来越多，逻辑越来越不清晰的时候，你就可以考虑分离处更多的container和Presentational component来。</p>
<hr>
<ul><li><p>如果这篇文章指导的方向有错误，里面有很多的问题，该怎么办？</p></li></ul>
<p>欢迎指出和讨论，一切问题都会认真回答，虚心接受。</p>
<p>如果我也答不出来，那我会当作没看到...<br><span class="img-wrap"><img data-src="/img/bVHcOv?w=224&amp;h=225" src="https://static.alili.tech/img/bVHcOv?w=224&amp;h=225" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于React的Container&Presentational Component模型结构分析

## 原文链接
[https://segmentfault.com/a/1190000007875199](https://segmentfault.com/a/1190000007875199)

