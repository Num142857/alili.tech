---
title: 'Weex BindingX 尝鲜' 
date: 2018-12-11 2:30:10
hidden: true
slug: lqk8zxa0cio
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bV5iI9?w=2376&amp;h=1284" src="https://static.alili.tech/img/bV5iI9?w=2376&amp;h=1284" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>三月初，阿里巴巴开源的一套基于 Weex、React Native 的富交互解决方案 「BindingX」。提供了一种称之为 「Expression Binding」 的机制可以在 Weex、React Native 上让手势等复杂交互操作以60fps的帧率流畅执行，而不会导致卡顿，因而带来了更优秀的用户体验。</p>
<h2 id="articleHeader1">背景</h2>
<blockquote>听上去「高大上」，那为啥要造这个轮子呢？<p>这就得从源头说起，他到底解决了什么问题。</p>
</blockquote>
<p>我们知道，Weex 和 React Native 同样都是三层结构，「 JS 层、 Native 层、 Bridge 层」，Native 层负责视觉绘制、事件收集，JS 层负责视觉控制、事件处理，Bridge 层是 JS 层和 Native 层的沟通桥梁，负责指令「翻译」。以 Weex 为例：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013617390?w=1864&amp;h=662" src="https://static.alili.tech/img/remote/1460000013617390?w=1864&amp;h=662" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>想让 Native 层做一些复杂的交互操作时，JS 层就需要不停得处理从 Native 层收集来的事件然后作出「及时」响应，如果响应「不及时」就会导致视觉卡顿。</p>
<p>怎么样才算是「及时」呢？</p>
<p>我们常说 60fps 帧率是流畅的基础，这就意味着，一次有效的刷新需要在 1/60 s 内完成，如果 JS 层从事件接受、处理、回馈到 Native 绘制新的视图完成超过了 16.67ms 将会出现「视觉卡顿」。</p>
<p>另外，即使每一次更新都可以完全控制在 16.67ms 内，大量的通讯操作也会消耗掉过多的 CPU，以至于加大了 Crash 的风险</p>
<p>如果不突破这层瓶颈，此类技术将很难达到一个新的高度。</p>
<p>BindingX 就是解决这个问题的。</p>
<h2 id="articleHeader2">原理</h2>
<p>BindingX 提出的 「Expression Binding」 将具体的手势控制行为以 「表达式」 的方式传递给 Native，监控「被绑定元素」上发生的手势操作并输出过程中横向「x」和纵向「y」的偏移量，因此我们即可将「x，y」作为表达式「f(x)，f(y)」的入参，针对性的对某一目标元素的样式进行「绑定变化」。</p>
<p>而这所以操作都是在 Native 层独立完成的，大大减小了 JS 层和 Bridge 层的压力。</p>
<p>「无 Binding 模式」</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013617391?w=1678&amp;h=1120" src="https://static.alili.tech/img/remote/1460000013617391?w=1678&amp;h=1120" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>「Binding 模式」</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013617392?w=1692&amp;h=1146" src="https://static.alili.tech/img/remote/1460000013617392?w=1692&amp;h=1146" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">表达式</h2>
<p>表达式，是由数字、运算符、变量等以能求得有意义数值的字符串。譬如, <code>x\*3+10</code>  就是一个表达式，当x被赋值时，整个表达式就会有一个明确的结果。通过表达式，我们就可以描述一个具体的交互行为，比如我们希望x从0变化到100时，透明度能从1变化到0.5，那么表达式可以描述为: <code>f(alpha) = 1-(x/100)*0.5</code> 也可以是 <code>f(alpha) = 1-x/200</code> 只不过第一种表达式更直白。</p>
<p>下面举一个简单的例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 简码 */
bindingx.bind({
      anchor:foo_view.ref  ,                    //==> 事件的触发者
      eventType:'pan',                          //==> 事件类型
      props: [
          {
            element:foo_view.ref,               //==> 要改变的视图的引用或者id
            property:'transform.translateX',    //==> 要改变的属性
            expression:'x+0'                    //==> 表达式
          }
        ]
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/* 简码 */</span>
bindingx.bind({
      <span class="hljs-attr">anchor</span>:foo_view.ref  ,                    <span class="hljs-comment">//==&gt; 事件的触发者</span>
      eventType:<span class="hljs-string">'pan'</span>,                          <span class="hljs-comment">//==&gt; 事件类型</span>
      props: [
          {
            <span class="hljs-attr">element</span>:foo_view.ref,               <span class="hljs-comment">//==&gt; 要改变的视图的引用或者id</span>
            property:<span class="hljs-string">'transform.translateX'</span>,    <span class="hljs-comment">//==&gt; 要改变的属性</span>
            expression:<span class="hljs-string">'x+0'</span>                    <span class="hljs-comment">//==&gt; 表达式</span>
          }
        ]
    });</code></pre>
<p>就这么简单，几行代码即可绑定 <code>foo_view</code> 实现视图随手势移动的交互。当然复杂的也有，只不过都是由这么一个个小的交互堆积而成的。</p>
<p>除了基本的四则运算外，还支持三元运算符、数学函数等高级语法，基本可以满足绝大部分的场景。</p>
<h2 id="articleHeader4">事件类型</h2>
<p>前面的例子中用到了 <code>pan</code> 手势，除手势外，BindingX 还支持「列表的滚动 <code>scroll</code>」、「动画 <code>timing</code>」甚至是「陀螺仪感 <code>orientation</code>」，每种事件类型使用方式大致相同，也有注意点，详细请参阅<a href="https://alibaba.github.io/bindingx/" rel="nofollow noreferrer" target="_blank">《bindingx 官方文档》</a>。</p>
<h2 id="articleHeader5">Do it</h2>
<blockquote>怎么样能快速体验呢？<p>跟上我的脚步</p>
</blockquote>
<h3 id="articleHeader6">playground</h3>
<p>官方虽然也提供了 <a href="https://alibaba.github.io/bindingx/playground" rel="nofollow noreferrer" target="_blank">试验田 https://alibaba.github.io/bindingx/playground</a>，但语法均为 Rax 但 DSL，并不少 Weex 对外的 Vue 版本，我们无法在线编辑查看效果，只能使用阿里系App「如淘宝、闲鱼、飞猪」扫码体验效果。</p>
<p>这些都不是我们想要的。</p>
<p>当然方法总是有的。</p>
<p>直接将 BindingX 的官方代码 <code>clone</code> 下来，上面有支持 Vue 版本的 Weex Playground。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bindingx/weex/playground/[ios|android]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code style="word-break: break-word; white-space: initial;">bindingx/weex/playground/[ios<span class="hljs-string">|android]</span></code></pre>
<p>ios 和 android 选一个用工具安装到自己的手机上。此处就不多解释了，不会的问下 google，或者下方留言。</p>
<p>使用 <a href="http://dotwe.org/vue/" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/</a> 在线编辑，扫码看效果。</p>
<p>给大家分享几个 Vue 版本的 demo。</p>
<p><a href="http://dotwe.org/vue/e50f76a6c13337b6fa4201a045c5dc0c" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/e50f76a6c13337b6fa4201a045c5dc0c</a></p>
<p><a href="http://dotwe.org/vue/2dff486956044ea59b3d38a2cf20b506" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/2dff486956044ea59b3d38a2cf20b506</a></p>
<p><a href="http://dotwe.org/vue/64998432f2a249f5cb35b4de0040526d" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/64998432f2a249f5cb35b4de0040526d</a></p>
<p><a href="http://dotwe.org/vue/cd942c4bee9c4b7bcceda4e3aaf94c70" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/cd942c4bee9c4b7bcceda4e3aaf94c70</a></p>
<h2 id="articleHeader7">严选 demo 引入 BindingX</h2>
<blockquote>这是很早以前的一个小 Demo，感兴趣的可以 star 一下 <br><a href="https://github.com/zwwill/yanxuan-weex-demo" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/yanxuan-weex-demo</a>
</blockquote>
<p>下面我基于严选的 Demo 进行的小试用。</p>
<h3 id="articleHeader8">升级 ios platform</h3>
<p>要想使用 BindingX 插件，就必须使自己的 platform 支持。方法很简单，只需要将 <code>platforms/ios/Podfile</code> 进行升级修改即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source 'git@github.com/CocoaPods/Specs.git'
platform :ios, '8.0'                                    #最低8.0
#inhibit_all_warnings!

def common
    pod 'WeexSDK', '0.17.0'                         #升级至 0.17.0
    pod 'Weexplugin', :path=>'./Weexplugin/'
    pod 'WXDevtool'
    pod 'SDWebImage', '3.7.5'
    pod 'SocketRocket', '0.4.2'
    pod 'BindingX'                                     #增加 BindingX
end

target 'WeexDemo' do
    common
end

target 'WeexUITestDemo' do
    common
end
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>source <span class="hljs-string">'git@github.com/CocoaPods/Specs.git'</span>
platform <span class="hljs-symbol">:ios</span>, <span class="hljs-string">'8.0'</span>                                    <span class="hljs-comment">#最低8.0</span>
<span class="hljs-comment">#inhibit_all_warnings!</span>

<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">common</span></span>
    pod <span class="hljs-string">'WeexSDK'</span>, <span class="hljs-string">'0.17.0'</span>                         <span class="hljs-comment">#升级至 0.17.0</span>
    pod <span class="hljs-string">'Weexplugin'</span>, <span class="hljs-symbol">:path=&gt;<span class="hljs-string">'./Weexplugin/'</span></span>
    pod <span class="hljs-string">'WXDevtool'</span>
    pod <span class="hljs-string">'SDWebImage'</span>, <span class="hljs-string">'3.7.5'</span>
    pod <span class="hljs-string">'SocketRocket'</span>, <span class="hljs-string">'0.4.2'</span>
    pod <span class="hljs-string">'BindingX'</span>                                     <span class="hljs-comment">#增加 BindingX</span>
<span class="hljs-keyword">end</span>

target <span class="hljs-string">'WeexDemo'</span> <span class="hljs-keyword">do</span>
    common
<span class="hljs-keyword">end</span>

target <span class="hljs-string">'WeexUITestDemo'</span> <span class="hljs-keyword">do</span>
    common
<span class="hljs-keyword">end</span>
</code></pre>
<p>随后执行一遍 <code>pod install</code> 即可安装成功。如出现错误提示，按提示 fix 掉即可。</p>
<h3 id="articleHeader9">小试牛刀</h3>
<p>Vue 的引入方式不同于 Rax，需要使用 <code>weex.requireModule()</code> API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div class=&quot;wrapper&quot;>
        <image ref=&quot;headerBg&quot; resize=&quot;cover&quot; src=&quot;http://cdn.zwwill.com/yanxuan/imgs/bg5.png&quot;></image>
        <scroller ref=&quot;contentScroller&quot;>
            <div>
                <!-- 省略非关键代码 -->
            </div>
            <div class=&quot;fbs&quot;>
                <!-- 省略非关键代码 -->
            </div>
        </scroller>
    </div>
</template>

<script>
    const binding = weex.requireModule('bindingx');    //引入 bindingx
    export default {
        mounted(){
            this.headerBgBinding();
        },
        beforeDestroy(){
            this.headerBgBindingDestory();
        },
        methods: {
            headerBgBinding(){
                let self = this,
                    scroller = self.$refs.contentScroller.ref,
                    headerBg = self.$refs.headerBg.ref;
                    
                let bindingResult = binding &amp;&amp; binding.bind({
                    eventType:'scroll',
                    anchor:scroller,
                    props:[
                        {
                            element:headerBg,
                            property:'transform.scale',
                            expression:{
                                origin:'y<0?(1-y/500):(1+y/500)'
                            }
                        },
                        {
                            element:headerBg,
                            property:'transform.translateY',
                            expression:{
                                origin:'-y/2'
                            }
                        }
                    ]
                },function(e){
                });
                self.gesToken = bindingResult.token;
            }
            headerBgBindingDestory(){
                let self = this;
                if(self.gesToken != 0) {
                    binding.unbind({
                      eventType:'scroll',
                      token:self.gesToken
                    })
                    self.gesToken = 0;
                  }
            }
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"headerBg"</span> <span class="hljs-attr">resize</span>=<span class="hljs-string">"cover"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://cdn.zwwill.com/yanxuan/imgs/bg5.png"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">scroller</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"contentScroller"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 省略非关键代码 --&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"fbs"</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 省略非关键代码 --&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">scroller</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">const</span> binding = weex.requireModule(<span class="hljs-string">'bindingx'</span>);    <span class="hljs-comment">//引入 bindingx</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        mounted(){
            <span class="hljs-keyword">this</span>.headerBgBinding();
        },
        beforeDestroy(){
            <span class="hljs-keyword">this</span>.headerBgBindingDestory();
        },
        <span class="hljs-attr">methods</span>: {
            headerBgBinding(){
                <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>,
                    scroller = self.$refs.contentScroller.ref,
                    headerBg = self.$refs.headerBg.ref;
                    
                <span class="hljs-keyword">let</span> bindingResult = binding &amp;&amp; binding.bind({
                    <span class="hljs-attr">eventType</span>:<span class="hljs-string">'scroll'</span>,
                    <span class="hljs-attr">anchor</span>:scroller,
                    <span class="hljs-attr">props</span>:[
                        {
                            <span class="hljs-attr">element</span>:headerBg,
                            <span class="hljs-attr">property</span>:<span class="hljs-string">'transform.scale'</span>,
                            <span class="hljs-attr">expression</span>:{
                                <span class="hljs-attr">origin</span>:<span class="hljs-string">'y&lt;0?(1-y/500):(1+y/500)'</span>
                            }
                        },
                        {
                            <span class="hljs-attr">element</span>:headerBg,
                            <span class="hljs-attr">property</span>:<span class="hljs-string">'transform.translateY'</span>,
                            <span class="hljs-attr">expression</span>:{
                                <span class="hljs-attr">origin</span>:<span class="hljs-string">'-y/2'</span>
                            }
                        }
                    ]
                },<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
                });
                self.gesToken = bindingResult.token;
            }
            headerBgBindingDestory(){
                <span class="hljs-keyword">let</span> self = <span class="hljs-keyword">this</span>;
                <span class="hljs-keyword">if</span>(self.gesToken != <span class="hljs-number">0</span>) {
                    binding.unbind({
                      <span class="hljs-attr">eventType</span>:<span class="hljs-string">'scroll'</span>,
                      <span class="hljs-attr">token</span>:self.gesToken
                    })
                    self.gesToken = <span class="hljs-number">0</span>;
                  }
            }
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>实现的效果就是最常见的个人信息页，title 背景随着滚动事件变换大小。</p>
<p>效果动图 <a href="http://cdn.zwwill.com/yanxuan/resource/bindingx2.gif" rel="nofollow noreferrer" target="_blank">http://cdn.zwwill.com/yanxuan/resource/bindingx2.gif</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013617393?w=952&amp;h=986" src="https://static.alili.tech/img/remote/1460000013617393?w=952&amp;h=986" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">写在最后</h2>
<p>Weex 有了 BindingX 如虎添翼。效率更高性！能更稳定！同期开源的还有 <a href="https://alibaba.github.io/GCanvas/" rel="nofollow noreferrer" target="_blank">GCanvas</a> 也是一把神器。</p>
<p>近期工作繁重，通宵写文章，如发现文章残瑕处，敬请谅解！</p>
<h2 id="articleHeader11">相关链接</h2>
<ul>
<li><a href="https://github.com/zwwill/yanxuan-weex-demo" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/yanxuan-weex-demo</a></li>
<li><a href="https://alibaba.github.io/bindingx/" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/bindingx/</a></li>
<li><a href="http://dotwe.org/vue/e50f76a6c13337b6fa4201a045c5dc0c" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/e50f76a6c13337b6fa4201a045c5dc0c</a></li>
<li><a href="http://dotwe.org/vue/2dff486956044ea59b3d38a2cf20b506" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/2dff486956044ea59b3d38a2cf20b506</a></li>
<li><a href="http://dotwe.org/vue/64998432f2a249f5cb35b4de0040526d" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/64998432f2a249f5cb35b4de0040526d</a></li>
<li><a href="http://dotwe.org/vue/cd942c4bee9c4b7bcceda4e3aaf94c70" rel="nofollow noreferrer" target="_blank">http://dotwe.org/vue/cd942c4bee9c4b7bcceda4e3aaf94c70</a></li>
</ul>
<blockquote>作者： <a href="https://github.com/zwwill" rel="nofollow noreferrer" target="_blank">木羽 zwwill</a><br>首发地址：<a href="https://github.com/zwwill/blog/issues/20" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/blog/issues/20</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex BindingX 尝鲜

## 原文链接
[https://segmentfault.com/a/1190000013617385](https://segmentfault.com/a/1190000013617385)

