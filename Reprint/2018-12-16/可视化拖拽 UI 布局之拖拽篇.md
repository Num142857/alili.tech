---
title: '可视化拖拽 UI 布局之拖拽篇' 
date: 2018-12-16 2:30:10
hidden: true
slug: x5sf1au1pfp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>前言：前段时间负责公司的运营管理后台项目，通过运营后台的PC端拖拽配置布局，达到App首页模板的动态UI界面配置，生成页面。趁着周末，整理一下当时所了解到的拖拽。文章会根据大家的反馈或者自己学习经验的累积成长不定期更新丰富。如果你想了解更多PC端的拖拽开发，欢迎点赞关注或者收藏一波[鞠躬]。</blockquote>
<p>之前在掘金一篇文章里看到这段话:</p>
<blockquote>UI 开发的三种模式 <p>1.手写标签和样式代码，生成页面</p>
<p>2.可视化拖拽 UI 组建，生成页面</p>
<p>3.直接输入设计稿，输出可用页面</p>
</blockquote>
<p>有幸当前公司处于UI开发的第二阶段</p>
<p>当时开发参考过的小部分网站，其它参考过的大量网站由于电脑硬盘出现故障丢失了无法恢复。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932392?w=1255&amp;h=650" src="https://static.alili.tech/img/remote/1460000012932392?w=1255&amp;h=650" alt="JQ拖拽" title="JQ拖拽" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932393?w=1252&amp;h=580" src="https://static.alili.tech/img/remote/1460000012932393?w=1252&amp;h=580" alt="Vue拖拽" title="Vue拖拽" style="cursor: pointer; display: inline;"></span></p>
<p>以上网站这些不是很重要，真正重要有用的网站链接我已经帮你筛选整理出来了，并贴在下面的文章里面(分为演示与教程两类)，点击相关链接即可进入相关开发学习。</p>
<p>贴上面网站的原因是我想告诉大家，插件选型之前一定要先整理好自己的需求，根据需求在网上寻找插件，并且打开控制台，看看效果是不是你所需要的类型，否则下载到本地后调试了半天发现最后不能达到自己想要的效果，这样既浪费时间又浪费精力，就得不偿失了。所以，我之后有时间会整理一套插件选型筛选的思维导图出来，到时发到掘金或者个人公众号，大家一起分享进步。</p>
<p>好了，言归正传，我们开始上主菜：</p>
<h2 id="articleHeader0">拖拽程度的层次</h2>
<p>就我搜索到的资料来看，拖拽的程度是分为三类的，如果你有知道的其它类型，欢迎与我交流分享。</p>
<h3 id="articleHeader1">1.视图上的拖拽</h3>
<p>比如这个：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932394?w=1376&amp;h=955" src="https://static.alili.tech/img/remote/1460000012932394?w=1376&amp;h=955" alt="JS" title="JS" style="cursor: pointer;"></span></p>
<p>通过定位来改变顺序，注意看控制台的节点位置，并没有发生对应的改变。这种拖拽仅仅是视图交互上的效果，也是最最简单程度效果的拖拽。</p>
<p>链接：</p>
<p><a href="http://runjs.cn/code/ppfgqsvu" rel="nofollow noreferrer" target="_blank">JS-Demo演示地址</a></p>
<h3 id="articleHeader2">2.视图与节点同步变化的拖拽</h3>
<h3 id="articleHeader3">2-1 JQ-UI</h3>
<p>比如这个：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932395?w=1492&amp;h=955" src="https://static.alili.tech/img/remote/1460000012932395?w=1492&amp;h=955" alt="JQ-UI" title="JQ-UI" style="cursor: pointer;"></span></p>
<p>请注意看控制台的节点位置，发生了对应的改变。这种拖拽是能达到视图与节点的同步变化的效果。</p>
<p>链接：</p>
<p><a href="https://jqueryui.com/draggable/#sortable" rel="nofollow noreferrer" target="_blank">演示：JQ-UI-Demo演示地址</a></p>
<p><a href="http://www.jqueryui.org.cn/api/3722.html#method-destroy" rel="nofollow noreferrer" target="_blank">教程：JQ-UI中文API文档教程</a></p>
<h3 id="articleHeader4">2-2 H5-draggable</h3>
<p>比如这个：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932396" src="https://static.alili.tech/img/remote/1460000012932396" alt="H5-draggable" title="H5-draggable" style="cursor: pointer;"></span></p>
<p>h5提供的draggable属性，请注意看控制台的节点位置，也发生了对应的改变。</p>
<p>链接：</p>
<p><a href="http://www.zhangxinxu.com/study/201102/html5-drag-and-drop.html" rel="nofollow noreferrer" target="_blank">演示：Demo演示地址</a></p>
<p><a href="http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/" rel="nofollow noreferrer" target="_blank">教程：张鑫旭-draggable教程</a></p>
<h3 id="articleHeader5">2-3 JQ-UI与H5-draggable的取舍问题</h3>
<p>JQ-UI和H5-draggable属性都能达到我们想要的效果，那我们应该选择哪个呢？个人而言，最后还是选择了JQ-UI(当然重构我们改用了vue)。主要考虑的地方是灵活性，<strong>JQ-UI优于H5-draggable属性的地方正是在于灵活性</strong>。draggable属性里面方法封装的比JQ-UI相对而言比较固定，不好调整。<strong>所以，以我的经验来看，如果你是简简简单的小需求的拖拽，draggable的属性绝对能够满足你；但如果你的拖拽需求比较复杂，那么我建议你用JQ-UI会比较好点。</strong></p>
<h3 id="articleHeader6">3.数据，视图，节点的三者同步变化</h3>
<p>比如：这个</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012932397" src="https://static.alili.tech/img/remote/1460000012932397" alt="Vue-Draggable" title="Vue-Draggable" style="cursor: pointer;"></span></p>
<p>vue插件Vue-Draggable，也是vue相关拖拽插件中的star最多的，配置项也最丰富的。</p>
<p>链接:</p>
<p><a href="https://github.com/SortableJS/Vue.Draggable" rel="nofollow noreferrer" target="_blank">演示：Demo演示地址</a></p>
<p><a href="https://github.com/SortableJS/Vue.Draggable" rel="nofollow noreferrer" target="_blank">教程：github-vue-draggable</a></p>
<p><a href="https://github.com/RubaXa/Sortable" rel="nofollow noreferrer" target="_blank">教程：github-vue-Sortable</a>(draggable插件是基于sortabl二次封装的，多看看这篇对使用draggable会有很大的帮助)</p>
<h2 id="articleHeader7">项目实践</h2>
<p>重构的时候我们是用vue的，选择了这个draggable插件，后面事实证明也是正确的。"花了比用JQ至少少一半的时间就达到了相同的效果"。毕竟Vue只需要考虑数据关注业务流程而不需要考虑节点的操作问题，这点还是非常不错的。反正谁用谁知道[吐舌]。好了，我们贴出代码说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 引入组件
import draggable from 'vuedraggable'

// 拖拽模块箱子到 => 可整理的箱子/ 垃圾箱子
<!--可整理的箱子-->
<div id=&quot;sortable&quot; class='block'>
  <draggable
    class=&quot;sortable&quot;
    v-model=&quot;templateJson.child&quot;
    // 设置接收的拖拽
    :options=&quot;{group:'people'}&quot;
    @remove=&quot;stop&quot;>
    <module-template
      :item=&quot;item&quot;
      :type=&quot;templateData.type&quot;
      v-for=&quot;(item, $index) in templateJson.child&quot;
      :key=&quot;$index&quot;>
    </module-template>
  </draggable>
</div>
<!--垃圾箱子-->
<div id=&quot;dusbtin&quot;>
  <br/>垃<br/>圾<br/>箱
  <draggable
    v-model=&quot;templateJson.child&quot;
    :options=&quot;{group:'people'}&quot;>
    <div class=&quot;btn&quot;></div>
  </draggable>
</div>
<!--模块箱子-->
<div id=&quot;module&quot;>
  <draggable
    class=&quot;dragArea&quot;
    v-model=&quot;moduleJson.child&quot;
    :clone=&quot;clone&quot;
    // 开始拖拽的箱子的options选项配置 
    :options=&quot;{group:{ name:'people',  pull:'clone', put:false },sort:false}&quot;
    @end=&quot;onEnd&quot;>
    <module-template
      :item=&quot;item&quot;
      :type=&quot;templateData.type&quot;
      v-for=&quot;(item, $index) in moduleJson.child&quot;
      :key=&quot;$index&quot;>
    </module-template>
  </draggable>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// 引入组件</span>
<span class="hljs-keyword">import</span> draggable <span class="hljs-keyword">from</span> <span class="hljs-string">'vuedraggable'</span>

<span class="hljs-comment">// 拖拽模块箱子到 =&gt; 可整理的箱子/ 垃圾箱子</span>
&lt;!--可整理的箱子--&gt;
&lt;div id="sortable" class='block'&gt;
  &lt;draggable
    class="sortable"
    v-model="templateJson.child"
    // 设置接收的拖拽
    :options="{group:'people'}"
    @remove="stop"&gt;
    &lt;module-template
      :item="item"
      :type="templateData.type"
      v-for="(item, $index) in templateJson.child"
      :key="$index"&gt;
    &lt;/module-template&gt;
  &lt;/draggable&gt;
&lt;/div&gt;
&lt;!--垃圾箱子--&gt;
&lt;div id="dusbtin"&gt;
  &lt;br/&gt;垃&lt;br/&gt;圾&lt;br/&gt;箱
  &lt;draggable
    v-model="templateJson.child"
    :options="{group:'people'}"&gt;
    &lt;div class="btn"&gt;&lt;/div&gt;
  &lt;/draggable&gt;
&lt;/div&gt;
&lt;!--模块箱子--&gt;
&lt;div id="module"&gt;
  &lt;draggable
    class="dragArea"
    v-model="moduleJson.child"
    :clone="clone"
    // 开始拖拽的箱子的options选项配置 
    :options="{group:{ name:'people',  pull:'clone', put:false },sort:false}"
    @end="onEnd"&gt;
    &lt;module-template
      :item="item"
      :type="templateData.type"
      v-for="(item, $index) in moduleJson.child"
      :key="$index"&gt;
    &lt;/module-template&gt;
  &lt;/draggable&gt;
&lt;/div&gt;</code></pre>
<p>clone是指复制，sort：false是指不使用排序。代码中相关options属性的配置说明你可以参考教程中的说明去对应了解。我这里就不再重复赘述了。</p>
<h2 id="articleHeader8">一句话总结</h2>
<p>如果是简单的拖拽，建议用H5的draggable属性。</p>
<p>如果是复杂点的拖拽，建议用JQ-UI实现。</p>
<p>如果是数据驱动，用Vue-Draggable插件是很不错的选择。</p>
<h2 id="articleHeader9">一起交流?</h2>
<p>如果你有其它更好的想法想一起交流，请订阅微信公众号yhzg_gz(点击复制，在微信中添加公众号粘贴即可)与我联系，<strong>追求代码质量，高效率编程是我们共同的目标</strong>。 </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012959815?w=344&amp;h=344" src="https://static.alili.tech/img/remote/1460000012959815?w=344&amp;h=344" alt="付出的前端路" title="付出的前端路" style="cursor: pointer; display: inline;"></span></p>
<p>that's all, 以上就是我目前所有的关于PC端项目拖拽经验的总结。觉得对你开发有帮助的可以点赞收藏一波，如果我哪里写错了，希望能指点出来。如果你有更好的想法或者建议，可以提出来与我交流。大家一起进步，共同成长。再次感谢[鞠躬]。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
可视化拖拽 UI 布局之拖拽篇

## 原文链接
[https://segmentfault.com/a/1190000012945944](https://segmentfault.com/a/1190000012945944)

