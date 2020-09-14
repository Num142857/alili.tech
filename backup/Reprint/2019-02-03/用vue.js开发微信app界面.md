---
title: '用vue.js开发微信app界面' 
date: 2019-02-03 2:30:39
hidden: true
slug: plt5cffmwj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">vue-wechat</h2>
<h2 id="articleHeader1">用vue.js开发微信app界面的demo</h2>
<p>线上地址:<a href="https://vue-wechat.github.io" rel="nofollow noreferrer" target="_blank">vue-wechat.github.io</a><br>  项目地址:<a href="https://github.com/useryangtao/vue-wechat" rel="nofollow noreferrer" target="_blank">useryangtao/vue-wechat</a><br>  github.io 加载略慢, 建议clone本地调试预览。</p>
<h3 id="articleHeader2">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
cnpm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build
</code></pre>
<h3 id="articleHeader3">技术栈</h3>
<p>此demo在技术使用上以下技术的部分语法</p>
<ul>
<li><p>vue</p></li>
<li><p>vuex</p></li>
<li><p>vue-cli</p></li>
<li><p>vue-router</p></li>
<li><p>vue-toutch</p></li>
<li><p>vue-animated-list</p></li>
<li><p>weui</p></li>
<li><p>zepto</p></li>
<li><p>fastclick</p></li>
</ul>
<h1 id="articleHeader4">一些亮点</h1>
<p>　　　　新页面跳转的过渡动画 参照ios系统的页面切换风格,是通过router-view及transition特性结合实现的。</p>
<p>　　　　消息列表页的item 左划操作处理,使用vuex(getters,actions)实现实时处理计算数据</p>
<p>(语音/文字)对话框 组件间 动画切换，还有通过事件注册tap 实现 按住说话效果；</p>
<p>还有一些交互行为细节及动画：</p>
<ul>
<li><p>如css3动画实现的扫一扫;</p></li>
<li><p>删除消息列表item，通过vue-animated-list 实现动画移除;</p></li>
<li><p>消息页右上角+的显出无动画，隐藏有动画；</p></li>
<li><p>朋友圈下拉拖拽显示完整封面</p></li>
</ul>
<p>listview部分也使用了weui的结构。</p>
<p>小图标全部使用iconfont方式,减少图片请求。</p>
<h2 id="articleHeader5">手机预览(QR)</h2>
<p><span class="img-wrap"><img data-src="/img/bVDADX?w=187&amp;h=189" src="https://static.alili.tech/img/bVDADX?w=187&amp;h=189" alt="vue-wechat-qr" title="vue-wechat-qr" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="如微信扫码浏览空白，请 点击右上角-> 浏览器 打开
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>如微信扫码浏览空白，请 点击右上角-&gt; 浏览器 打开
</code></pre>
<h2 id="articleHeader6">基本操作</h2>
<h3 id="articleHeader7">首页</h3>
<p><span class="img-wrap"><img data-src="/img/bVDEQW?w=375&amp;h=667" src="https://static.alili.tech/img/bVDEQW?w=375&amp;h=667" alt="首页" title="首页" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/bVDEQ3?w=375&amp;h=667" src="https://static.alili.tech/img/bVDEQ3?w=375&amp;h=667" alt="chat页" title="chat页" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">页面切换,动画过渡</h3>
<h4><strong>仿照ios系统切换风格:下一页打开时,当前页左偏移-30%;当前页关闭时,上一页左偏移从-30%过渡到0%</strong></h4>
<p><span class="img-wrap"><img data-src="/img/bVDAEa?w=338&amp;h=602" src="https://static.alili.tech/img/bVDAEa?w=338&amp;h=602" alt="vue-wechat-animation" title="vue-wechat-animation" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader9">消息列表 (未读/已读)操作 及 删除</h3>
<p><span class="img-wrap"><img data-src="/img/bVDAEf?w=338&amp;h=602" src="https://static.alili.tech/img/bVDAEf?w=338&amp;h=602" alt="vue-wechat-handled" title="vue-wechat-handled" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">按下说话,松开结束 效果</h3>
<p><span class="img-wrap"><img data-src="/img/bVDAEk?w=375&amp;h=668" src="https://static.alili.tech/img/bVDAEk?w=375&amp;h=668" alt="say" title="say" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">发现-朋友圈</h3>
<p><span class="img-wrap"><img data-src="/img/bVDAEl?w=338&amp;h=602" src="https://static.alili.tech/img/bVDAEl?w=338&amp;h=602" alt="find" title="find" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">发现-扫一扫</h3>
<p><span class="img-wrap"><img data-src="/img/bVDAEo?w=338&amp;h=602" src="https://static.alili.tech/img/bVDAEo?w=338&amp;h=602" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">图标-iconfont</h3>
<h3 id="articleHeader14">为了减少图片加载,图标使用的iconfont</h3>
<p><span class="img-wrap"><img data-src="/img/bVDAEp?w=1114&amp;h=704" src="https://static.alili.tech/img/bVDAEp?w=1114&amp;h=704" alt="iconfont" title="iconfont" style="cursor: pointer;"></span></p>
<h2 id="articleHeader15">开发约定</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="所有组件.vue名 都统一 《短横线》 命名
css内下划线( _ )开始的为通用类
js中内下划线( _ )开头的为私有属性
所有events均使用短横线 命名
所有组件(.vue)里template标签包含的元素必须是component-xx 开头
所有state统一下划线 命名
所有 action统一下划线命名" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">所有组件.vue名 都统一 《短横线》 命名
css内下划线( _ )开始的为通用类
js中内下划线( _ )开头的为私有属性
所有events均使用短横线 命名
所有组件(.vue)里template标签包含的元素必须是component-xx 开头
所有state统一下划线 命名
所有 action统一下划线命名</code></pre>
<h2 id="articleHeader16">参考</h2>
<p><a href="https://github.com/shinygang/Vue-cnodejs" rel="nofollow noreferrer" target="_blank">Vue-cnodejs</a></p>
<p><a href="https://github.com/hilongjw/vue-zhihu-daily" rel="nofollow noreferrer" target="_blank">vue-zhihu-daily</a></p>
<p><a href="https://github.com/hilongjw/vue-mobile-qq" rel="nofollow noreferrer" target="_blank">vue-mobile-qq</a></p>
<p><a href="https://github.com/andylei18/vue-shopping" rel="nofollow noreferrer" target="_blank">vue-shopping</a></p>
<h2 id="articleHeader17">关于作者</h2>
<p>微博:<a href="http://weibo.com/u/3503321141" rel="nofollow noreferrer" target="_blank">Water杨涛</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue.js开发微信app界面

## 原文链接
[https://segmentfault.com/a/1190000007013407](https://segmentfault.com/a/1190000007013407)

