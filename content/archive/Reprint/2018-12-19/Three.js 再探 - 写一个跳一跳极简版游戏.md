---
title: 'Three.js 再探 - 写一个跳一跳极简版游戏' 
date: 2018-12-19 2:30:07
hidden: true
slug: v1spln1yp7m
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在离职的空窗期，感觉大把的时间不能用来浪费，就试着仿照微信跳一跳写了一个极简版的游戏</p>
<h5>那么这个游戏到底是简单到什么程度，差不多就是到下面这个程度吧</h5>
<p><span class="img-wrap"><img data-src="/img/bV1qJC?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qJC?w=800&amp;h=600" alt="图片预览1" title="图片预览1" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1qJ1?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qJ1?w=800&amp;h=600" alt="图片预览2" title="图片预览2" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV1qKc?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKc?w=800&amp;h=600" alt="图片预览3" title="图片预览3" style="cursor: pointer; display: inline;"></span></p>
<h4>预览地址: <a href="https://luosijie.github.io/threejs-examples/jump/jump.html" rel="nofollow noreferrer" target="_blank">https://luosijie.github.io/threejs-examples/jump/jump.html</a>
</h4>
<h4>源码地址: <a href="https://github.com/luosijie/threejs-examples/tree/master/jump" rel="nofollow noreferrer" target="_blank">https://github.com/luosijie/threejs-examples/tree/master/jump</a>
</h4>
<blockquote>由于是第一次尝试写游戏, 也不知道套路对不对, 大家看着玩就好, 不要太认真, 不推荐在手机上预览, 坑还没有填好</blockquote>
<h4>下面是实现过程</h4>
<h3 id="articleHeader0">游戏分析</h3>
<p>首先分析一下一个这样的游戏需要什么元素</p>
<ol>
<li>Three.js必备元素: 场景，灯光，摄像机</li>
<li>一块又一块的方块</li>
<li>
<strong>会跳的那个</strong>，或者叫游戏者</li>
<li>以上</li>
</ol>
<h3 id="articleHeader1">游戏过程</h3>
<ol>
<li>初始一个场景, 场景中有一个 <strong>会跳的那个</strong> 和 2个方块</li>
<li>鼠标按下储存 能量值</li>
<li>鼠标放开, <strong>会跳的那个</strong> 根据 能量值 和 第2个方块的方向 跳出去</li>
<li>
<strong>会跳的那个</strong> 落到方块的上平面时, 根据 位置 判断这一跳是成功还是失败</li>
<li>成功后进入下一步，失败就根据 位置 执行不同的摔倒方式</li>
</ol>
<h4>关于游戏的碰撞, 我们要考虑这几种情况</h4>
<ol><li>掉落在两个方块中央</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qKl?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKl?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在起跳方块左边上沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qKx?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKx?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在左边下一个方块下沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qKI?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKI?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在左边下一个方块上沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qKP?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKP?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在起跳方块右边上沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qKV?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qKV?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在右边下一个方块下沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qK2?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qK2?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol><li>掉落在右边下一个方块上沿</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV1qK4?w=800&amp;h=600" src="https://static.alili.tech/img/bV1qK4?w=800&amp;h=600" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">代码</h3>
<blockquote>感兴趣的麻烦移步 <a href="https://github.com/luosijie/threejs-examples/tree/master/jump" rel="nofollow noreferrer" target="_blank">github</a>
</blockquote>
<p>主体结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Game = function () {
  ...
}
Game.prototype = {
  init:  // 初始化
  restart: // 重新开始
  addSuccessFn:  // 成功进入下一步，执行外部函数, 用于更新分数
  addFailedFn: // 游戏失败, 执行外部函数, 用于显示失败弹窗
  _createJumper: // 创建 会跳的那个
  _createCube: // 创建方块
  _setLight: // Three.js设置光照
  _setCamera: // Three.js设置相机
  _setRenderer: // Three.js设置渲染器
  _render: // Three.js 执行渲染
  _createHelpers: // Three.js场景辅助工具
  _checkUserAgent: // 检测是否是移动端
  _handleWindowResize: // 窗口缩放绑定函数
  _handleMousedown: // 鼠标按下绑定函数
  _handleMouseup: // 鼠标松开绑定函数
  _fallingRotate: // 会跳的那个 摔落动画
  _falling: // 会跳的那个 摔落
  _checkInCube: // 判断落点位置
  _updateCameraPos: // 更新相机坐标参数
  _updateCamera: // 更新相机
  _setSize:   // 设置画布尺寸
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Game = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  ...
}
Game.prototype = {
  <span class="hljs-attr">init</span>:  <span class="hljs-comment">// 初始化</span>
  restart: <span class="hljs-comment">// 重新开始</span>
  addSuccessFn:  <span class="hljs-comment">// 成功进入下一步，执行外部函数, 用于更新分数</span>
  addFailedFn: <span class="hljs-comment">// 游戏失败, 执行外部函数, 用于显示失败弹窗</span>
  _createJumper: <span class="hljs-comment">// 创建 会跳的那个</span>
  _createCube: <span class="hljs-comment">// 创建方块</span>
  _setLight: <span class="hljs-comment">// Three.js设置光照</span>
  _setCamera: <span class="hljs-comment">// Three.js设置相机</span>
  _setRenderer: <span class="hljs-comment">// Three.js设置渲染器</span>
  _render: <span class="hljs-comment">// Three.js 执行渲染</span>
  _createHelpers: <span class="hljs-comment">// Three.js场景辅助工具</span>
  _checkUserAgent: <span class="hljs-comment">// 检测是否是移动端</span>
  _handleWindowResize: <span class="hljs-comment">// 窗口缩放绑定函数</span>
  _handleMousedown: <span class="hljs-comment">// 鼠标按下绑定函数</span>
  _handleMouseup: <span class="hljs-comment">// 鼠标松开绑定函数</span>
  _fallingRotate: <span class="hljs-comment">// 会跳的那个 摔落动画</span>
  _falling: <span class="hljs-comment">// 会跳的那个 摔落</span>
  _checkInCube: <span class="hljs-comment">// 判断落点位置</span>
  _updateCameraPos: <span class="hljs-comment">// 更新相机坐标参数</span>
  _updateCamera: <span class="hljs-comment">// 更新相机</span>
  _setSize:   <span class="hljs-comment">// 设置画布尺寸</span>
}
</code></pre>
<p>调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var game = new Game()
game.init()
game.addSuccessFn(success)
game.addFailedFn(failed)

...

// 游戏重新开始，执行函数
function restart () {
    ...
}
// 游戏失败执行函数
function failed(){
    ...
}
// 游戏成功，更新分数
function success (score) {
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> game = <span class="hljs-keyword">new</span> Game()
game.init()
game.addSuccessFn(success)
game.addFailedFn(failed)

...

<span class="hljs-comment">// 游戏重新开始，执行函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">restart</span> (<span class="hljs-params"></span>) </span>{
    ...
}
<span class="hljs-comment">// 游戏失败执行函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">failed</span>(<span class="hljs-params"></span>)</span>{
    ...
}
<span class="hljs-comment">// 游戏成功，更新分数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">success</span> (<span class="hljs-params">score</span>) </span>{
    ...
}</code></pre>
<p>最后有什么好玩的js相关, 欢迎一起交流</p>
<blockquote>先这样了, 欢迎star</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Three.js 再探 - 写一个跳一跳极简版游戏

## 原文链接
[https://segmentfault.com/a/1190000012695194](https://segmentfault.com/a/1190000012695194)

