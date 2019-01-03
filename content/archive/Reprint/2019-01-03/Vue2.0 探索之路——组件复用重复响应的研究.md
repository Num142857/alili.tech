---
title: 'Vue2.0 探索之路——组件复用重复响应的研究' 
date: 2019-01-03 2:30:11
hidden: true
slug: ggzk6j5ks8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>前段时间，同事发现一个弹窗组件被多个页面复用，然后点击按钮出现了多次响应。明明页面都会被销毁掉的呀，为啥还会出现重复调用呢。</p>
<p>其实以前我也碰到过一两次，不知道啥情况后来没有再复现，再加上工期紧，当时就没有引起重视。这次同事碰到了，多次试验复现了。才深知当时挖的大坑啊没有填。</p>
<p>所以这次就单独弄了个demo专门复现并解决这个问题。也希望吸取教训，以后碰到问题都要记录下来，尽早早早早早解决啊，不然都是坑。</p>
<p><strong>另外，文章里的关于父子组件的全局事件监听是错误的选择，请大家不要使用这种。（但是兄弟组件可以用文中这种全局监听的方式）</strong><br><strong>请用官方例子（遇到问题，请多用官方，不然直接参考其他同学的思路很可能挖坑。这里是以前直接搜索到eventbus的实现方式，请引以为戒，哈哈，我就做个反面教材吧</strong><br><a href="https://cn.vuejs.org/v2/guide/components.html?#%E4%BD%BF%E7%94%A8-v-on-%E7%BB%91%E5%AE%9A%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6" rel="nofollow noreferrer" target="_blank">传送门在此</a></p>
<h2 id="articleHeader1">重复响应代码示例</h2>
<p>首先我写了一个dialogx的小组件，里面只有一个点击按钮。当点击的时候，会触发一个<code>btnClick</code>的事件。</p>
<p><span class="img-wrap"><img data-src="/img/bVTqMH?w=329&amp;h=382" src="https://static.alili.tech/img/bVTqMH?w=329&amp;h=382" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后我又写了两个页面用来测试重复响应。下面是 <code>test1.vue</code>,至于<code>test2</code>也一样，就不重新放图了。</p>
<p><span class="img-wrap"><img data-src="/img/bVTqPJ?w=575&amp;h=457" src="https://static.alili.tech/img/bVTqPJ?w=575&amp;h=457" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后，咱们来点点点点点点！就能发现，在<code>test2</code>页面发起的事件，而<code>test1</code>也响应了，这属于重复响应是不符合我们的项目需要的。</p>
<p><span class="img-wrap"><img data-src="/img/bVTqYE?w=600&amp;h=343" src="https://static.alili.tech/img/bVTqYE?w=600&amp;h=343" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这...是咋回事~~？？</p>
<p><span class="img-wrap"><img data-src="/img/bVTq0p?w=94&amp;h=93" src="https://static.alili.tech/img/bVTq0p?w=94&amp;h=93" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>经过查询相关资料，确定了问题在于<strong>没有过去的销毁事件响应</strong>。</p></blockquote>
<p>好，我们出发去加上销毁逻辑。</p>
<h2 id="articleHeader2">加入销毁操作</h2>
<p>于是我在<code>dialogx.vue</code>中加入以下代码，在路由切换组件被销毁的时候，对<code>btnClick</code>事件进行销毁。顺便打印一下 <code>this.$root</code>看看里面是个啥结构。</p>
<p><span class="img-wrap"><img data-src="/img/bVTq7V?w=332&amp;h=117" src="https://static.alili.tech/img/bVTq7V?w=332&amp;h=117" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>然后就有了以下的操作，居然...居然 test2.vue 没法响应了。WTF，这又是啥情况。</p>
<p><span class="img-wrap"><img data-src="/img/bVTrbe?w=69&amp;h=81" src="https://static.alili.tech/img/bVTrbe?w=69&amp;h=81" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVTrc5?w=981&amp;h=391" src="https://static.alili.tech/img/bVTrc5?w=981&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>冷静下来，好好分析。首先这种情况是因为我们加了销毁操作导致的，所以肯定是销毁的问题。<br>那么我们继续追踪。发现路由切换的各种操作的顺序是这样的。</p>
<p><span class="img-wrap"><img data-src="/img/bVTrdn?w=443&amp;h=147" src="https://static.alili.tech/img/bVTrdn?w=443&amp;h=147" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这说明 什么问题？</p>
<blockquote><p>新页面的<code>created</code>先执行，然后开始逐渐销毁老页面。仔细看看，我们能发现问题，<code>test2.vue</code>在创建监听事件的时候，是在<code>dialogx.vue</code>销毁之前的。人家刚创建好监听事件，由于执行顺序问题，被子组件给清除了，所以 <code>test2.vue</code>在点击发射时，是拦截不到的。</p></blockquote>
<p>好，既然因为执行顺序的问题，那我们把监听事件注册放在 <code>mounted</code>里。</p>
<p><strong>果然，成功了。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVTrkp?w=981&amp;h=391" src="https://static.alili.tech/img/bVTrkp?w=981&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">再探索一下</h2>
<p>对于事件的触发和监听，因为我们这是用 <code>eventbus</code>实现的。为了看看里面具体是为什么，于是我打印了 <code>this.$root</code>看看更细节的是为什么。</p>
<p>首先，每一次监听 <code>this.$root.$on('btnClick')</code>都是一次事件注册，然后我在打印的结果里，找到了以下内容。</p>
<p><span class="img-wrap"><img data-src="/img/bVTteq?w=314&amp;h=169" src="https://static.alili.tech/img/bVTteq?w=314&amp;h=169" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>btnClick</code> 是一个数组，这就意味着每一次<code>btnClick</code>事件注册，都是往里存一个处理方法。<br>然后为了验证我的想法，我把 <code>test2.vue</code>中的监听事件去了，直接看我们的 <code>$off</code>效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVTtef?w=284&amp;h=183" src="https://static.alili.tech/img/bVTtef?w=284&amp;h=183" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>是 <code>null</code>，这就解释了为什么，刚才监听事件写在 <code>created</code>里，为什么不生效了，因为整个事件都被设置为 <code>null</code>了。</p>
<h2 id="articleHeader4">总结</h2>
<p>为了达到组件复用不产生重复响应的问题。我们可以如下做。</p>
<blockquote><p>1.在子组件里的<code>destroyed</code>方法里，对事件进行销毁操作（$off）<br>2.在页面中 <code>mounted</code>方法中进行事件监听。</p></blockquote>
<p>GitHub代码地址：<a href="https://github.com/XuXiaoGH/vue-component-test" rel="nofollow noreferrer" target="_blank">https://github.com/XuXiaoGH/v...</a></p>
<h2 id="articleHeader5">写在最后</h2>
<p>这次是一次异常排查过程的记录，如果对你有些许帮助，不妨收藏点个赞，这将是我继续的很大动力。</p>
<p>ps: GIF截图软件是 <a href="https://www.cockos.com/licecap/" rel="nofollow noreferrer" target="_blank">LICEcap</a> ，非常好用，推荐一下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 探索之路——组件复用重复响应的研究

## 原文链接
[https://segmentfault.com/a/1190000010791812](https://segmentfault.com/a/1190000010791812)

