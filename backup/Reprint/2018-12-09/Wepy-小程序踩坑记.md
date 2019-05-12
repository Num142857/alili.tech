---
title: 'Wepy-小程序踩坑记' 
date: 2018-12-09 2:30:09
hidden: true
slug: lrls6q2n4h
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>引言</strong></p>
<p>用过原生开发的小程序也知道除了api 其他功能性的内容并不多对于需要做大型项目来说是比较难入手的，因此朋友推荐的wepy我就入坑鸟。。。<br>这么一个跟vue的开发方式类似的框架，不过说起来跟vue类似，但是用起来还真不是那么简单。api开发还是和部分vue有出入，因此如下记录，入手的教程就不发了只发踩坑。</p>
<p><strong>官方文档</strong></p>
<p><a href="https://mp.weixin.qq.com/debug/wxadoc/dev/index.html" rel="nofollow noreferrer" target="_blank">小程序的官方文档</a><br><a href="https://tencent.github.io/wepy/document.html#/" rel="nofollow noreferrer" target="_blank">wepy官方文档</a> </p>
<p>下面是已经踩过的坑</p>
<p><strong>wepy 问题查找</strong></p>
<p><a href="https://github.com/Tencent/wepy/issues" rel="nofollow noreferrer" target="_blank">https://github.com/Tencent/we...</a><br>比较建议在这里查找下遇到的问题之后在提问毕竟这里都是收集比较齐全</p>
<p><strong>标签中的指令简写</strong></p>
<p>跟Vue类似</p>
<ul>
<li>对于动态赋值的属性可以使用 :attr="value" 的方式</li>
<li>对于绑定事件可以使用@click="fn"的方式</li>
</ul>
<p><strong>data使用注意点</strong></p>
<p>对于视图中需要用到的数据，应该事先在data中定义一下，哪怕此时没有数据，也应该定义一个空值</p>
<p><strong>WePY中的methods的使用</strong></p>
<ul>
<li>只能声明页面的bind、catch事件，不能声明自定义方法</li>
<li>自定义方法应该跟methods平级</li>
</ul>
<p><strong>this 运用</strong></p>
<p>小程序里修改data 里面的属性或者赋值都需要利用this.setdata()而wepy 基本就是利用this.属性即可。如果是异步返回或者更新dom需要this.$apply()触发脏值检测</p>
<p><strong>页面跳转</strong></p>
<p>navigateTo() 和 redirectTo() 的差别。</p>
<p>navigateTo()保留当前页面，跳转到应用内的某个页面(即：显示顶部导航栏左上角返回按钮，可以有返回路径）<br>redirectTo()关闭当前页面，跳转到应用内的某个页面（即：不显示左上角返回按钮，如需要返回在页面内自己添加按钮写路径或者利用wx.navigateBack()和 getCurrentPages() 获取当前的页面栈，决定需要返回几层。</p>
<ul>
<li>简单来说如果你需要tabbar有返回就用navigateTo，不需要就用redirectTo</li>
<li>只能用 switchTab() 跳转到 tabbar 页面</li>
</ul>
<p><strong>文件上传</strong></p>
<p>上传文件没有传统html中的文件域(&lt;input type="file"/&gt;)，要想上传文件只能使用API： uploadFile()</p>
<p><strong>更新DOM$apply</strong></p>
<p>如果需要更新DOM，应该在随后调用组件实例的$apply方法，才能更新到页面中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.name=&quot;abc&quot;;
this.$apply()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.name=<span class="hljs-string">"abc"</span>;
<span class="hljs-keyword">this</span>.$apply()
</code></pre>
<ul>
<li>PS：对于性能要求较高的应用，不要频繁的调用$apply()更新DOM，可以根据实际情况更新父组件向子组件传递数据，通过props的方式传递</li>
<li>如果需要传递动态数据，加上.sync的修饰符就可以解决（:prop.snyc='item'）</li>
<li>如果需要子组件数据同步到父组件，需要在定义props的时候设置twoWay:true</li>
<li><strong><em>(所有异步数据传递必须用$apply，同步的话才能使用.sync)</em></strong></li>
</ul>
<p><strong>mixin</strong></p>
<p>wepy的mixin，与vue中的mixin执行顺序相反</p>
<ul>
<li>wepy中，会先执行组件自身的，再执行mixin中的</li>
<li>vue中对于钩子函数，会先执行mixin中的，再执行组件自身的；vue中methods如果和mixin同名，那么只会执行自身的方法</li>
</ul>
<p><strong>关于canvas和base64</strong></p>
<p>小程序中可以进行canvas相关操作，但是跟纯html中的canvas有所不同（api差异），canvas的使用都应该参照：<a href="https://mp.weixin.qq.com/debug/wxadoc/dev/component/canvas.html" rel="nofollow noreferrer" target="_blank">小程序中的canvas</a></p>
<p><strong>arrayBuffer和base64互转</strong></p>
<p>本段内容在文档中是搜索不到的，但是确实是支持的，使用如下2种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.arrayBufferToBase64(arrayBuffer)
wx.base64ToArrayBuffer(base64)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.arrayBufferToBase64</span>(<span class="hljs-selector-tag">arrayBuffer</span>)
<span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.base64ToArrayBuffer</span>(<span class="hljs-selector-tag">base64</span>)
</code></pre>
<p><strong>命名规范</strong></p>
<p>小程序内部定义的实例API都以$开头，所以我们在定义实例属性、方法的时候不能以$开头，以便区分</p>
<p><strong>同名组件共享同一实例及数据</strong></p>
<p>循环渲染组件时，容易出现组件数据相互污染。可以用最外层的组件监听事件冒泡以修改数据，同时触发事件的组件用setTimeout包裹，保证执行顺序。</p>
<p><strong>循环渲染组件：</strong></p>
<p>wepy的循环渲染组件，必须使用 &lt;repeat&gt;标签，或者微信官方的&lt;block&gt;标签(这两个标签都是不会渲染到dom的）否则就不会渲染成功。</p>
<p><strong>组件component 没有 onLoad 等页面事件</strong></p>
<ul>
<li>页面中设置好 this.$broadcast('someEvent', option);</li>
<li>组件监听事件则可以解决</li>
</ul>
<p><strong>page</strong></p>
<p>页面类，继承自wepy.component，拥有页面所有的属性与方法。<br>全部属性继承自wepy.component。而wepy.component没有onLoad 等方法</p>
<p>未完待续-----------------</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Wepy-小程序踩坑记

## 原文链接
[https://segmentfault.com/a/1190000013860866](https://segmentfault.com/a/1190000013860866)

