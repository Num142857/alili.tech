---
title: 'Vue实现的滑动切换路由组件' 
date: 2018-12-06 2:30:09
hidden: true
slug: igpm50w56ab
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>前段时间呢实现了一个模仿移动端app的通过滑动来切换路由/tab的效果，详见<a href="https://segmentfault.com/a/1190000013604306">vuejs实现spa页面组件滑动特效</a>。完了之后呢就在想能不能做成一个组件的形式，改进一下，抽离出来，顺便再发布到npm上，不是美滋滋？这两天正好有时间，就把它写出来了，我给他起名叫<code>tab-slider</code>，中间遇到一些坑，分享一蛤。</p>
<h1 id="articleHeader1">正文</h1>
<h2 id="articleHeader2">简单介绍</h2>
<p>正如我上一篇<a href="https://segmentfault.com/a/1190000013604306" target="_blank">文章</a>所说，如果你需要这种功能</p>
<blockquote><ol>
<li>即将离开的组件和将要进入的组合需要同时出现在页面中</li>
<li>用手指拖动页面可以切换路由，而不仅仅是点击链接跳转</li>
<li>结合以上两点，拖动过程中同时显示两个组件，手指离开屏幕后执行切换路由或者返回的动作</li>
</ol></blockquote>
<p><code>tab-slider</code>也许可以满足你，具体实现思路可以去看上一篇文章，这里就不讲了，来看一下效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000014303459?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000014303459?w=376&amp;h=668" alt="预期效果" title="预期效果" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">改进方面</h2>
<ul>
<li>相比之前每个路由组件都要写<code>touch</code>事件的蠢写法，我把touch事件写在了<code>router-view</code>上，增强了代码的复用，事实上不这么改我也没法将组件抽离出来给别人用<img src="https://static.alili.techundefined" class="emoji" alt="sweat_smile" title="sweat_smile">
</li>
<li>支持多个tab切换，之前是只有2个，写法固定，现在可以有任意个tab切换。</li>
</ul>
<h2 id="articleHeader4">踩过的坑</h2>
<p>在我开发<a href="https://github.com/myl0204/XiXi" rel="nofollow noreferrer" target="_blank">XiXi</a>这个仿DiDi app项目的时，我使用的Vue版本是2.4.4，而我写<code>tab-slider</code>的时候使用了最新版本的Vue 2.5.16。写完之后我遇到了一个问题，滑动完毕切换路由的时候，<code>router-view</code>所对应的区域会<strong>闪一下</strong>，而通过点击<code>router-link</code>切换路由则不会。<br>Vue2.5.16效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000014303460?w=376&amp;h=668" src="https://static.alili.tech/img/remote/1460000014303460?w=376&amp;h=668" alt="实际效果" title="实际效果" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">where？哪有问题？</h3>
<p>这里一开始我觉得可能是新老项目css样式做了部分更改，影响了浏览器的重绘或是回流，苦苦搜寻无果。后来通过chrome控制台的的<code>performance</code>发现：新版本的vue多了个<code>flushCallbacks</code>的<code>activity</code>,耗时9ms。这是什么？继续google，没什么有用的东西，ok没关系，去<a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue仓库</a>里搜，发现他第一次写入是在14 Oct 2017，也就是Vue2.5.2发布的时候，这个版本修改了<code>nextTick</code>实现机制，并关闭了一个<a href="https://github.com/vuejs/vue/issues/6813" rel="nofollow noreferrer" target="_blank">issue</a>，有兴趣的同学可以看看。这个issue下面呢又有人reference了这个issue，<a href="https://github.com/DDFE/DDFE-blog/issues/24" rel="nofollow noreferrer" target="_blank">里面</a>正好讲解了相关内容。开源社区简直棒极了！</p>
<h3 id="articleHeader6">why？问题是什么？</h3>
<p>简单来说呢就是新版Vue对于DOM相关事件是放在macro task里，其他情况默认走micro task，而micro task要先于macro task执行。而我项目中的写法是，对拖曳的dom监听了<code>transitionend</code>事件，当transition结束后进行路由切换。所以原因应该是滑动结束后（也就是transition结束），路由没有在第一时间进行跳转，所以出现了一瞬间的“白屏”，在我们看来就是闪了一下。</p>
<h3 id="articleHeader7">how？怎么解决？</h3>
<ul>
<li>solution1: 使用低版本Vue，2.4.4及以下。</li>
<li>solution2: 修改写法，直接使用<code>settimeout</code>，延迟时间与动画时间一致，而由于js的异步机制，实际延迟时间总是略大于写入的延迟时间，基本上能达到想要的效果。</li>
</ul>
<p>这里我采用了solution2，毕竟是写出来给人用了，总要有个通用的解决方案。</p>
<p>另外个坑就是在发布到npm之后，引入我的包，没法正常使用，提示组件未注册，折腾了许久，参考了<a href="https://github.com/youzan/vant" rel="nofollow noreferrer" target="_blank">vant</a>和<a href="https://github.com/didi/cube-ui" rel="nofollow noreferrer" target="_blank">cube-ui</a>的组件导出方式，却一直没能成功导出正确的对象。最后发现原因在于<code>webpack</code>的配置上： 需要在<code>output</code>属性中添加<code>library</code>以及<code>libraryTarget</code>，这样才能正确导出对象。</p>
<h2 id="articleHeader8">怎么用</h2>
<p>说了那么多废话，这组件怎么用？</p>
<ul>
<li>安装：npm i -S tab-slider</li>
<li>在<code>main.js</code>中引入样式,<code>import 'tab-slider/dist/index.css'</code>
</li>
<li>在需要的组件中注册子组件,<code>import TabSlider from 'tab-slider'</code>,也可以在<code>main.js</code>中引入，并通过<code>Vue.use()</code>来使之成为一个全局组件。</li>
<li>接受一个<code>comp</code>的prop，类型是数组，数组中的每一项是对象，对象中又包含了<code>name</code>和<code>component</code>属性。其中name属性必须和路由名字相同，(这也意味着你必须为每个路由取名)，component则是对应的组件。这里要注意一下，<strong>comp中每一项的顺序需要与你的router-link顺序一一对应。</strong>
</li>
<li>还接受一个<code>default-index</code>，表示默认跳转的路由，从0开始。</li>
</ul>
<h2 id="articleHeader9">可以改进的地方</h2>
<ul>
<li>
<code>webpack</code>相关配置还是通过<code>vue-cli</code>生成的，删除了一些不必要的东西，但还是没有做到最简。打包出来的东西也有9kb，好像有点大的过分。</li>
<li>可以把<code>router-link</code>的内容也直接做进去，毕竟tab和内容区是紧密联系的。</li>
<li>提供更多的选项(prop)给使用者。</li>
</ul>
<h2 id="articleHeader10">么得了</h2>
<p>如果对你有帮助的话点个赞点个收藏点个star提个issue都是可以的哦 <img src="https://static.alili.techundefined" class="emoji" alt="point_right" title="point_right"><a href="https://github.com/myl0204/tab-slider" rel="nofollow noreferrer" target="_blank">仓库地址</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue实现的滑动切换路由组件

## 原文链接
[https://segmentfault.com/a/1190000014303454](https://segmentfault.com/a/1190000014303454)

