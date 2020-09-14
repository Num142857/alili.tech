---
title: 'Vue ES6 Jade Scss Webpack Gulp' 
date: 2019-02-10 2:30:42
hidden: true
slug: bk0wso6scif
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>原文链接</strong>： <a href="http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/" rel="nofollow noreferrer" target="_blank">http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/</a></p></blockquote>
<p>一直以来非常庆幸曾经有翻过《代码大全2》；这使我崎岖编程之路少了很多不必要的坎坷。它在<strong>软件工艺的话题</strong>中有写到一篇：“首先是为人写程序，其次才是机器(<strong>Write Programs for People First, Computers Second</strong>)”。虽然这是针对代码<strong>可读性</strong>来谈及的，但这间接昭示了<strong>开发效率</strong>之重要不是？此次以 <code>Vue</code> , <code>Es6</code>, <code>Jade</code>, <code>Scss</code> , <code>Webpack</code>, <code>Gulp</code>等一套强大组合来改善团队前端工作流，首因即出于这个理念。 </p>
<p><span class="img-wrap"><img data-src="http://7xoosr.com1.z0.glb.clouddn.com/vue-webpack-sharp-sword.jpg" src="https://static.alili.techhttp://7xoosr.com1.z0.glb.clouddn.com/vue-webpack-sharp-sword.jpg" alt="Vue ES6 Jade Scss Webpack Gulp" title="Vue ES6 Jade Scss Webpack Gulp" style="cursor: pointer;"></span></p>
<p>不觉间，突入这深似海的<strong>前端</strong>，已近一年。虽然时间不长，却也经历了几个框架的更替。然而这并未使我感觉到Coding的 快乐：因为本质上，整日都在做着重复的事儿用重复的方法，这就好如让你整日拿着烂扫帚，在一座乏味的猥楼前，人为而机械地，日复一日地扫楼前枯枝落叶一般。如此，倒也没什么忒糟糕；只是有一点：即便扫得三年，这经验和功力也就几天(即学会这套机制所用时间)而已。直到遇到这<code>Vue</code> <code>Webpack</code>。</p>
<p>为何有上述的一点小<strong>感慨</strong>嘞？这缘于现在的工作内容。如今我们团队人倒满多，再招几个就可凑在一起踢一场足球了。主有前端（Js）后端（Php），并加Android，Ios各一名。大家合力为公司几近所有款游戏，提供运营服务。而我等前端所做的事儿，体现在用户那里，不过就是游戏中的<strong>活动(Activity)</strong>，这在本地中某一场景下，以webView得以承载和展现。我们的工作大部分即将运营策划的一些形形色色活动，以Html＋JS＋Css加以实现下。</p>
<p>这本身虽不具可吐槽性，可喜的是(?)，公司数十款不用应用游戏，前端er得为此这些不同款游戏做相似运营活动；因为每一个活动(SPA)页面过于独立，故而每一个新活动，从切图，到布局，调样式，写逻辑，测试至发布，全部得重新来一遍。时常为此“念天地之悠悠，独怆然而泪下”。要知道<strong>无聊和乏味的工作是罪恶</strong>，不管是对于个人还是之于时代。</p>
<p>本着<strong>工欲善其事，必先利其器</strong>的理念，一直以来在工作效率这块，略怀执念：<strong>一个问题不应该被解决两次</strong>。毕竟有了快速迭代产品的能力，以及完成需求的高效，才能节省出时间来研究产品的运行效率，或者别的。宁愿多一分钟用来发呆，也无意多一秒低效以来勤奋。在此记载一篇，以纪录前端编程之路的一个转折。前端发展日新月异, 有闻戏言一句道："每六星期重写一个前端框架"。而在这么多框架下，缘何选取了这几个组合，天意如此吧：信息汹涌万千，首次接触到就它们，然后就是它们了。</p>
<p><span class="img-wrap"><img data-src="/img/bVvC36" src="https://static.alili.tech/img/bVvC36" alt="Vue ES6 Jade Scss Webpack Gulp" title="Vue ES6 Jade Scss Webpack Gulp" style="cursor: pointer; display: inline;"></span><br><strong><code>Vue</code></strong>：上一个解决工作需求机制，是以<strong>Backnone</strong>，<strong>RequireJs</strong>，<strong>jQuery</strong>组合来撸(后期我有注入<strong>Gulp</strong>)；虽也能将工程模块儿化来写，不过，这跟我期望相去甚远。并且前端发展到如今这地步，<strong>组件化</strong>开发，也早已流行开来。先前在前端选型上，虽然也知道<strong>AngularJS</strong>，<strong>ReactJS</strong>等大名，不过因为<strong>Vue</strong>的简洁强大，更因看着特合口味（用户界面完全可以用嵌套的组件树来描述），所以没怎么纠结，也就它了。如今回看，这是非常明智的抉择。前几日有看到一篇<a href="http://yafeilee.me/blogs/86" rel="nofollow noreferrer" target="_blank">《2016 年后 Web 开发趋势是什么》</a>，涨更多姿势。</p>
<p><strong><code>ES6</code></strong>：这是时代发展的大趋势，学习它是蛮必要的。对于ES5，它的变动在于增加而非修改，用抑或不用，成本仅仅在于学习 Es6 这块儿，不用考虑任何兼容。如今，对于 Es6 尚在学习中，谈不好。不过提供更多 Api，语法糖，让写 js 更加便捷，用着很是舒爽，尤其<code>=&gt;</code> <code>import</code>等；个人比较推荐，团队目前使用情形还并不理想，有待推进。</p>
<p><strong><code>Jade</code></strong>：用了<strong>Vue</strong>，最大的好处在于可以组件化来开发各个SPA；由此，就得编写大量常用组件，达到各个功能/布局模块可以公用&amp;复用，如此也方便统一维护and改善。虽然<strong>html</strong>的标签就那么多，然而写她的人确是层次不齐的。很是希望每位写组件的队友能够优雅统一，然而发现这是事儿，还是提供一种机制令其不能写得太糟糕更容易些。当然，实施过程中，这个跟<strong>Scss</strong>，<strong>Es6</strong>一样，都没有强制使用。</p>
<p><strong><code>Scss</code></strong>：用它比较好的优势在于：使写CSS有了编程得感觉，这对于大型应用也的确很有用，可对于SPA应用，优劣几乎相抵；在机制中推荐出来，最大得目的在于：想让队友们可以多一项技能。可根据使用得情形来看，只是让我更明白两点：学习态度跟结果因人而异且差别很大；人类得大脑思维方式更趋向于懒and习惯。</p>
<p><strong><code>Webpack</code></strong>：用这款强大的打包工具，主因是官方推荐它。后来证明它的确强大异常（它能把各种资源，例如JS（含JSX）、coffee、组件模版（含jade）、样式（含less/sass）、图片等等都作为模块来使用和处理），同样的学习成本也最大。在折腾这套机制时候，消耗时间最多的就是在这块。并且类如图片打包路径问题，首次开启Webpack巨慢等问题，如今都没很好的解决，只得采取写兼容办法。不过，它在整个项目机制中起着举足轻重的作用。</p>
<p><strong><code>Gulp</code></strong>：Gulp在15年就有使用。将其列入新机制完全是出于高效开发的目的。团队工作，需要先行在内网测试ok，方才可以发布外网。而<code>webpack</code>打包部署在本地，这就需要采用ftp工具上传打包内容。先前使用所<code>Xftp</code>，后来试用过<strong>WinScp</strong>，以及<strong>GoodSync</strong>，感觉都不是很理想；SublimeText下的<code>sftp</code>插件倒不错，却作用于激活而变动的tab，对打包生成出来的不能work。而Gulp下的<code>gulp-sftp</code>却很好适用这一场景，监测本地某文件下指定文件变化，指定内容上传。因此必用<strong>Gulp</strong>。更有<code>gulp-tinypng</code>（熊猫一键压图），<code>gulp-spritesmith</code>（一键生成雪碧图）等等可用的插件，一键以为之，大大节约开发时间成本。</p>
<p>下图为 Vue＋ES6＋Jade＋Scss＋Webpack＋Gulp 开发项目机制所涉及到的<strong>npm</strong>插件：<br><span class="img-wrap"><img data-src="http://7xoosr.com1.z0.glb.clouddn.com/vue-gulp-webpack-plugn.jpg" src="https://static.alili.techhttp://7xoosr.com1.z0.glb.clouddn.com/vue-gulp-webpack-plugn.jpg" alt="Vue ES6 Jade Scss Webpack Gulp" title="Vue ES6 Jade Scss Webpack Gulp" style="cursor: pointer;"></span></p>
<p><strong><code>Other</code></strong>：<strong>工欲善其事，必先利其器</strong>，语言，框架皆可以归结为器；而不当仅局限于开发工具以及PC／MAC机。欲要高效开发，熟悉语言框架，拥有敏捷思维，丰富经验等无疑是最有帮助的。但这些层次非朝夕可至；那么在其他方面有所提升，倒也挺有裨益。如之前所提到的以<strong>Gulp</strong>来拼图／压图／ftp上传；再如熟悉开发工具(SublimeText/Atom)，这在文末有点自荐；再如写些脚本，批量处理新建项目模版等等；当一件事被重复做超过三次，且有代码实现以替代的可能，就当花点时间Coding以解放生产力。</p>
<p><strong><code>总结</code></strong>：以上些许唠叨，即为这段时间折腾的由头。如今，团队开发机制，也正全面向这套过渡；常用组件也已完善不少；开发效率在之后越发将得到提高；因Vue本身自带其他各方面优质特性，产出的作品各个方面也都大有改进，幸甚。如此，编程才是充满积极意义的。下一步，当朝着前端<strong>工程化</strong>、<strong>自动化</strong>方向前进，而这块儿，另一队友目前也正在践行的路上，Go Fighting。以下为一路折腾过来的学习参考：</p>
<p><strong>Vue篇</strong><br><a href="http://www.csdn.net/article/2015-08-11/2825439-vue" rel="nofollow noreferrer" target="_blank">Vue.js：轻量高效的前端组件化方案</a> 来自Vue作者<strong>尤雨溪</strong><br><a href="http://cn.vuejs.org/guide/" rel="nofollow noreferrer" target="_blank">Vue官方教程</a><br><a href="http://jiongks.name/blog/vue-code-review/" rel="nofollow noreferrer" target="_blank">Vue.js 源码学习笔记</a>来自<strong>囧克斯</strong><br><a href="http://vuejs.github.io/vue-router/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">vue-router文档</a><br><a href="http://gold.xitu.io/entry/55f77eb460b28e6a6f0f4f86" rel="nofollow noreferrer" target="_blank">Vue 组件化开发实践</a><br><a href="http://www.alloyteam.com/2015/06/mvvm-xue-xi-vue-shi-jian-xiao-jie/" rel="nofollow noreferrer" target="_blank">mvvm学习&amp;vue实践小结</a></p>
<hr>
<p><strong>Webpack篇</strong></p>
<p><a href="http://www.cnblogs.com/vajoy/p/4650467.html#!/follow" rel="nofollow noreferrer" target="_blank"><strong>一小时包教会 —— webpack 入门指南</strong></a><br><a href="https://github.com/liunian/webpack-doc/blob/master/SUMMARY.md" rel="nofollow noreferrer" target="_blank">webpack-doc(中文文档)</a><br><a href="http://www.ido321.com/1646.html" rel="nofollow noreferrer" target="_blank">详解前端模块化工具-Webpack</a><br><a href="http://www.h-simon.com/42/" rel="nofollow noreferrer" target="_blank">webpack常用配置总结</a><br><a href="https://github.com/wyvernnot/webpack_performance/tree/master/moment-example" rel="nofollow noreferrer" target="_blank">Webpack 性能优化 (一) 使用别名做重定向</a></p>
<hr>
<p><strong>Gulp篇</strong><br><a href="http://www.w3ctech.com/topic/134" rel="nofollow noreferrer" target="_blank">Gulp开发教程（翻译）</a><br><a href="http://www.jeffjade.com/2015/11/25/2015-11-25-toss-gulp/" rel="nofollow noreferrer" target="_blank">Gulp探究折腾之路(I)</a><br><a href="http://www.jeffjade.com/2016/01/19/2016-01-19-toss-gulp/" rel="nofollow noreferrer" target="_blank">Gulp折腾之路(II)</a></p>
<hr>
<p><strong>Sass篇</strong><br><a href="http://www.kancloud.cn/kancloud/sass-tutorial/48502" rel="nofollow noreferrer" target="_blank">Sass中文教程</a></p>
<hr>
<p><strong>Jade篇</strong><br><a href="http://blog.jayself.com/2014/07/28/Jade/" rel="nofollow noreferrer" target="_blank">Jade中文教程</a></p>
<hr>
<blockquote><p>原文出处：<a href="http:www.jeffjade.com">http:www.jeffjade.com</a><br>原文链接：<a href="http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/" rel="nofollow noreferrer" target="_blank">http://www.jeffjade.com/2016/05/08/106-vue-es6-jade-scss-webpack-gulp/</a></p></blockquote>
<hr>
<p><strong>猜你喜欢(/对你有用)的文章</strong></p>
<ul>
<li><p><a href="http://www.jeffjade.com/2015/12/15/2015-04-17-toss-sublime-text/" rel="nofollow noreferrer" target="_blank">如何优雅地使用Sublime Text</a></p></li>
<li><p><a href="http://www.jeffjade.com/2016/01/13/2016-01-13-windows-software-cmder/" rel="nofollow noreferrer" target="_blank">Win下必备神器之Cmder</a></p></li>
<li><p><a href="http://www.jeffjade.com/2016/03/03/2016-03-02-how-to-use-atom/" rel="nofollow noreferrer" target="_blank">新编码神器Atom使用纪要</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue ES6 Jade Scss Webpack Gulp

## 原文链接
[https://segmentfault.com/a/1190000005115926](https://segmentfault.com/a/1190000005115926)

