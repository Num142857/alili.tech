---
title: '原生ES6写的Web游戏：ES6-Mario，小美女，小帅哥快来玩啊~~' 
date: 2018-12-11 2:30:10
hidden: true
slug: h1djs4dbirp
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">? ES6-Mario</h1>
<p>这是一个用原生ES6语法和HTML5新特性写成的<code>Web 游戏</code>。</p>
<p>通过这个项目，你可以在实践中对<code>ES6</code>的主要内容、<code>HTML Canvas</code> 相关API以及<code>Webpack</code>的基础配置有一个直观的认识。</p>
<p>主体结构学习自 <a href="https://www.youtube.com/channel/UC8A0M0eDttdB11MHxX58vXQ" rel="nofollow noreferrer" target="_blank">Meth Meth Method On Youtube</a> <a href="https://github.com/meth-meth-method" rel="nofollow noreferrer" target="_blank">@Meth Meth Method</a>.</p>
<p>非常感谢原作者 <a href="https://github.com/pomle" rel="nofollow noreferrer" target="_blank">@pomler</a>，从他那里学到了很多人生经验。</p>
<p>项目地址：<a href="https://github.com/JuniorTour/es6-mario" rel="nofollow noreferrer" target="_blank">GitHub: es6-mario</a></p>
<h2 id="articleHeader1">兼容性</h2>
<ul>
<li>较新版的Chrome 和 Firefox</li>
<li>iOS 9.3.2+ Safari</li>
<li>Android 7.0+</li>
<li>NO IE</li>
</ul>
<h2 id="articleHeader2">Demo</h2>
<h3 id="articleHeader3">在线 Demo</h3>
<h1 id="articleHeader4"><a href="http://juniortour.net:666/" rel="nofollow noreferrer" target="_blank">在线试玩 es6-mario</a></h1>
<h1 id="articleHeader5">扫码试玩：</h1>
<p><span class="img-wrap"><img data-src="https://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/es6-mario-qr-code.png?raw=true" src="https://static.alili.techhttps://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/es6-mario-qr-code.png?raw=true" alt="QR-CODE-es6-mario" title="QR-CODE-es6-mario" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Gif Demo</h3>
<p><span class="img-wrap"><img data-src="https://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/mario-eg-1-60fps.gif?raw=true" src="https://static.alili.techhttps://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/mario-eg-1-60fps.gif?raw=true" alt="mario-eg-1-60fps.gif" title="mario-eg-1-60fps.gif" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="https://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/mario-eg-2-60fps.gif?raw=true" src="https://static.alili.techhttps://github.com/JuniorTour/es6-mario/blob/master/public/notes/demo-img/mario-eg-2-60fps.gif?raw=true" alt="mario-eg-2-60fps.gif" title="mario-eg-2-60fps.gif" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">运行</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/JuniorTour/es6-mario

cd es6-mario

npm install        // 国内推荐cnpm，速度更快

npm run dev     // 在 http://localhost:8080 启动开发服务器

npm run build   // 打包编译源代码至 ./public/dist

npm run prod    // 打包编译源代码至 ./public/dist 并且 在 http://localhost:666 启动生产环境服务器
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/JuniorTour/</span>es6-mario

cd es6-mario

npm install        <span class="hljs-regexp">//</span> 国内推荐cnpm，速度更快

npm run dev     <span class="hljs-regexp">//</span> 在 http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">8080</span> 启动开发服务器

npm run build   <span class="hljs-regexp">//</span> 打包编译源代码至 .<span class="hljs-regexp">/public/</span>dist

npm run prod    <span class="hljs-regexp">//</span> 打包编译源代码至 .<span class="hljs-regexp">/public/</span>dist 并且 在 http:<span class="hljs-regexp">//</span>localhost:<span class="hljs-number">666</span> 启动生产环境服务器
</code></pre>
<h2 id="articleHeader8">经验总结</h2>
<ol><li>经常整理代码</li></ol>
<p>可以通过<code>借助module语法分离声明和实现</code>，<code>构建类</code>等来实现。</p>
<p>(<a href="https://github.com/JuniorTour/es6-mario/blob/master/public/notes/notes.md" rel="nofollow noreferrer" target="_blank">More.........</a>)</p>
<h2 id="articleHeader9">关键点总结记录</h2>
<ol><li>Es6 语法</li></ol>
<ul><li>&lt;1&gt; Module</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<script type=&quot;module&quot; src=&quot;/js/main.js&quot;></script>

import {loadLevel} from './loader.js'
import {loadBackgroundSprites, loadMarioSprite} from './sprites.js'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
&lt;script type=<span class="hljs-string">"module"</span> src=<span class="hljs-string">"/js/main.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

<span class="hljs-keyword">import</span> {loadLevel} <span class="hljs-keyword">from</span> <span class="hljs-string">'./loader.js'</span>
<span class="hljs-keyword">import</span> {loadBackgroundSprites, loadMarioSprite} <span class="hljs-keyword">from</span> <span class="hljs-string">'./sprites.js'</span>
</code></pre>
<ul><li>&lt;2&gt; Super Class - 超类<p>(<a href="https://github.com/JuniorTour/es6-mario/blob/master/public/notes/notes.md" rel="nofollow noreferrer" target="_blank">More.........</a>)</p>
</li></ul>
<h2 id="articleHeader10">ToDo-List</h2>
<table>
<thead><tr>
<th>No.</th>
<th>Content</th>
<th>Finish Date</th>
<th>Extra</th>
</tr></thead>
<tbody>
<tr>
<td>0</td>
<td>基础结构</td>
<td>2018/2/14</td>
<td>春节前日</td>
</tr>
<tr>
<td>1</td>
<td>打包工具</td>
<td>2018/3/1</td>
<td>为了实现更好的兼容性和性能。</td>
</tr>
<tr>
<td>2</td>
<td>移动端兼容</td>
<td>2018/3/4</td>
<td>为了支持目前互联网的主流。</td>
</tr>
<tr>
<td>3</td>
<td>原版地图和游戏内容</td>
<td>2018/3/1</td>
<td> </td>
</tr>
<tr>
<td>4</td>
<td>性能优化</td>
<td> </td>
<td>尝试让低端设备（iPhone se,...）也能以较为流畅的帧数运行</td>
</tr>
<tr>
<td>5</td>
<td>游戏体验相关优化</td>
<td>......</td>
<td>让游戏更有趣！</td>
</tr>
<tr>
<td>6</td>
<td>Webpack 环境配置</td>
<td>......</td>
<td> </td>
</tr>
</tbody>
</table>
<h2 id="articleHeader11">文件结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|__ public                          主文件夹
  |__ index.html
  |__ assets
      |__ img
        |__ characters.gif
        |__ font.png
        |__ tiles.png
      |__ levels                    关卡内容配置
        |__ 1-1.json
      |__ sound
        |__ overworld-bgm.mp3
      |__ sprites                   角色精灵（雪碧图）配置
        |__ goomba.json
        |__ koopa.json
        |__ mario.json
        |__ overworld.json
        |__ underworld.json
  |__ build
    |__ prod-server.js          生产环境服务器
    |__ webpack.config.js     webpack配置文件
  |__ css
    |__ ......
  |__ js
    |__ entities
      |__ Goomba.js
      |__ Koopa.js
      |__ Mario.js
    |__ input                       键盘及触控操作输入控制
      |__ ......
    |__ layers
      |__ background.js
      |__ camera.js
      |__ collision.js
      |__ dashboard.js
      |__ sprites.js
    |__ loaders
      |__ font.js
      |__ level.js
    |__ polyfill                    兼容性垫片
      |__ ......
    |__ traits                      游戏内角色特性
      |__ Go.js
      |__ Jump.js
      |__ Killable.js
      |__ PendulumMove.js
      |__ Physics.js
      |__ PlayerController.js
      |__ Solid.js
      |__ Stomer.js
      |__ Velocity.js
    |__ anim.js
    |__ BoundingBox.js
    |__ Camera.js
    |__ compositor.js
    |__ debug.js
    |__ entities.js
    |__ Entity.js
    |__ EntityCollider.js
    |__ input.js
    |__ KeyboardState.js
    |__ main.js
    |__ math.js
    |__ sprites.js
    |__ SpriteSheet.js
    |__ TileCollider.js
    |__ TileResolver.js
    |__ Timer.js
    |__ Level.js
    |__ loader.js
  |__ notes
    |__ ......
|__ .babelrc
|__ .gitignore
|__ package.json
|__ README.md
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">|__ public                          主文件夹
  |__ index.html
  |__ assets
      |__ img
        |__ characters.gif
        |__ font.png
        |__ tiles.png
      |__ levels                    关卡内容配置
        |__ <span class="hljs-number">1</span><span class="hljs-number">-1.</span>json
      |__ sound
        |__ overworld-bgm.mp3
      |__ sprites                   角色精灵（雪碧图）配置
        |__ goomba.json
        |__ koopa.json
        |__ mario.json
        |__ overworld.json
        |__ underworld.json
  |__ build
    |__ prod-server.js          生产环境服务器
    |__ webpack.config.js     webpack配置文件
  |__ css
    |__ ......
  |__ js
    |__ entities
      |__ Goomba.js
      |__ Koopa.js
      |__ Mario.js
    |__ input                       键盘及触控操作输入控制
      |__ ......
    |__ layers
      |__ background.js
      |__ camera.js
      |__ collision.js
      |__ dashboard.js
      |__ sprites.js
    |__ loaders
      |__ font.js
      |__ level.js
    |__ polyfill                    兼容性垫片
      |__ ......
    |__ traits                      游戏内角色特性
      |__ Go.js
      |__ Jump.js
      |__ Killable.js
      |__ PendulumMove.js
      |__ Physics.js
      |__ PlayerController.js
      |__ Solid.js
      |__ Stomer.js
      |__ Velocity.js
    |__ anim.js
    |__ BoundingBox.js
    |__ Camera.js
    |__ compositor.js
    |__ debug.js
    |__ entities.js
    |__ Entity.js
    |__ EntityCollider.js
    |__ input.js
    |__ KeyboardState.js
    |__ main.js
    |__ math.js
    |__ sprites.js
    |__ SpriteSheet.js
    |__ TileCollider.js
    |__ TileResolver.js
    |__ Timer.js
    |__ Level.js
    |__ loader.js
  |__ notes
    |__ ......
|__ .babelrc
|__ .gitignore
|__ package.json
|__ README.md
</code></pre>
<h2 id="articleHeader12">结语</h2>
<p>这个项目还在开发之中，仍有许多不足之处，请原谅我迫不及待地分（pian）享（zan），我会尽快修复这些问题，也很欢迎你来帮助我。</p>
<p>非常渴望听到你的意见！欢迎通过各种方式联系我：</p>
<p>My GitHub: <a href="https://github.com/JuniorTour" rel="nofollow noreferrer" target="_blank">@JuniorTour</a>.</p>
<p>My Email: <a href="mailto:juniortour@qq.com">juniortour@qq.com</a>.</p>
<p>欢迎给我点个赞⭐️<a href="https://github.com/JuniorTour/es6-mario" rel="nofollow noreferrer" target="_blank">GitHub: es6-mario</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
原生ES6写的Web游戏：ES6-Mario，小美女，小帅哥快来玩啊~~

## 原文链接
[https://segmentfault.com/a/1190000013558387](https://segmentfault.com/a/1190000013558387)

