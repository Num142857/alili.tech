---
title: '用 TS + Vue 重写 APlayer HTML5 音乐播放器' 
date: 2019-01-07 2:30:11
hidden: true
slug: fiiariwzu3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简介</h2>
<p><a href="https://www.anotherhome.net/" rel="nofollow noreferrer" target="_blank">@DIYgod</a><a href="https://github.com/DIYgod/APlayer" rel="nofollow noreferrer" target="_blank">/APlayer</a> 是一款简洁漂亮的 <code>HTML5</code> 音乐播放器 (〃ﾉωﾉ)  <br>在我第一次看到这款播放器颜值的时候让我眼前一亮，我非常崇拜那些能设计出好看界面的设计师 (* &gt;ω&lt;)</p>
<p>但是在用过之后发现还是有不足的地方 这是我曾经提过的 <a href="https://github.com/DIYgod/APlayer/issues/110" rel="nofollow noreferrer" target="_blank">Issues</a></p>
<blockquote>
<p>用了一段时间，很喜欢 APlayer 简洁的 UI，提一些其他可改进的建议：</p>
<p>1.我认为有必要提供动态管理播放列表的 API<br>（如果没有，在需要动态添加歌曲到列表时只能重新初始化）<br>2.应该提供一个销毁播放器的 API<br>3.歌词允许异步添加，通常获取歌词接口是单独的<br>（现在必须等待歌词接口返回再初始化播放器，若歌词获取失败或时间过长会同时影响到播放音乐功能）</p>
</blockquote>
<p>关于第三条，<a href="https://github.com/DIYgod/APlayer" rel="nofollow noreferrer" target="_blank">APlayer</a> 其实是支持异步歌词的但仅支持传入 <code>.lrc</code> 文件的地址  <br>如果是像网易云／QQ音乐那样返回的是 <code>JSON</code> 格式的那就不满足需求了</p>
<p><strong>为什么不提 PR 要重写呢？</strong><br>这个我想了一会，最终还是觉得组件化的方式开发更好一些（原 APlayer 用的是原生 JS 没有依赖别的库）  <br>而且因为我以前还在做后端的时候就自己写过音乐播放器（仿微博播放器，当时不会用 <code>Git</code> 源码已丢）  <br>所以挺有经验的，重写一个难度也不大，而且比较随心所欲，还可以随意加一些自己想要的东西 qwq</p>
<h2 id="articleHeader1">截图</h2>
<p>说明：该播放器是基于 <a href="https://www.anotherhome.net/" rel="nofollow noreferrer" target="_blank">@DIYgod</a><a href="https://github.com/DIYgod/APlayer" rel="nofollow noreferrer" target="_blank">/APlayer</a> 的布局和 <a href="https://github.com/DIYgod/APlayer/blob/master/src/APlayer.scss" rel="nofollow noreferrer" target="_blank">样式</a> 采用 <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TS</a> + <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 组件化重构的</p>
<p><span class="img-wrap"><img data-src="/img/bVRspD?w=1026&amp;h=602" src="https://static.alili.tech/img/bVRspD?w=1026&amp;h=602" alt="Demo" title="Demo" style="cursor: pointer; display: inline;"></span></p>
<p>演示：<a href="http://aplayer.quq.cat" rel="nofollow noreferrer" target="_blank">http://aplayer.quq.cat</a>  <br>文档：<a href="http://aplayer.quq.cat/docs" rel="nofollow noreferrer" target="_blank">http://aplayer.quq.cat/docs</a>  <br>源码：<a href="https://github.com/MoeFE/vue-aplayer" rel="nofollow noreferrer" target="_blank">https://github.com/MoeFE/vue-...</a>  <br>NPM：<a href="https://www.npmjs.com/package/vue-aplayer-plugin" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a>  <br>播放列表来自网易云歌单：<a href="http://music.163.com/#/playlist?id=805272969" rel="nofollow noreferrer" target="_blank">http://music.163.com/#/playli...</a>  </p>
<p>如果喜欢的话别忘了点一个 star 哟 (*ゝω・)  <br>欢迎提 <a href="https://github.com/MoeFE/vue-aplayer/issues" rel="nofollow noreferrer" target="_blank">Issues</a> 和 <a href="https://github.com/MoeFE/vue-aplayer/pulls" rel="nofollow noreferrer" target="_blank">PR</a> (´・_・｀)</p>
<h2 id="articleHeader2">框架选型</h2>
<p>为了大家使用方便，我选择 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> ，可以响应式控制播放器各个属性 并以插件的形式发布（详情请看 <a href="http://aplayer.quq.cat" rel="nofollow noreferrer" target="_blank">demo</a> ）<br>我这里为了方便大家能更好的调试，在生产环境下开启了 <code>SourceMap</code> 和 <a href="https://cn.vuejs.org/v2/api/#devtools" rel="nofollow noreferrer" target="_blank">devtools</a>  <br>如果您安装了 <a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools</a> 可以打开调试器查看组件划分和各个组件的信息</p>
<p>至于为什么选择用 <code>TypeScript</code> 本文就不做过多的解释了  <br>大家可以自行在网上找一下 <code>TypeScript</code> 和 <code>JavaScript</code> 的区别</p>
<p>我只能告诉你：对于一个曾经使用 <code>C#</code> 的开发者来说这简直不能太爽啦 微软爸爸赛高 (* &gt;ω&lt;)  </p>
<p>最后推荐一款 <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TS</a> + <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 的脚手架模版：<a href="https://github.com/Toilal/vue-webpack-template" rel="nofollow noreferrer" target="_blank">https://github.com/Toilal/vue...</a><br>以后或将加入到官方模版中：<a href="https://github.com/vuejs-templates" rel="nofollow noreferrer" target="_blank">https://github.com/vuejs-temp...</a></p>
<p><a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TS</a> + <a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">React</a> 的脚手架可以用这个：<a href="https://github.com/wmonk/create-react-app-typescript" rel="nofollow noreferrer" target="_blank">https://github.com/wmonk/crea...</a></p>
<h2 id="articleHeader3">拆分组件</h2>
<p>拿到布局样式后要做的第一件事情就是拆分组件  <br>将 <a href="https://www.anotherhome.net/" rel="nofollow noreferrer" target="_blank">@DIYgod</a><a href="https://github.com/DIYgod/APlayer" rel="nofollow noreferrer" target="_blank">/APlayer</a> 的布局和 <a href="https://github.com/DIYgod/APlayer/blob/master/src/APlayer.scss" rel="nofollow noreferrer" target="_blank">样式</a> 复制过来  <br>确保样式没有问题后再将各个组件的布局和样式单独复制出来  <br>不懂设计的只好复制了 请允许我做一个悲伤的表情 (ಗ ‸ ಗ )</p>
<p><span class="img-wrap"><img data-src="/img/bVRsZQ?w=1026&amp;h=602" src="https://static.alili.tech/img/bVRsZQ?w=1026&amp;h=602" alt="拆分组件" title="拆分组件" style="cursor: pointer; display: inline;"></span></p>
<p>我将播放器拆分成了以下组件：</p>
<table>
<thead><tr>
<th>组件名称</th>
<th>组件说明</th>
</tr></thead>
<tbody>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/APlayer/src" rel="nofollow noreferrer" target="_blank">APlayer.ts</a></td>
<td>播放器容器组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Button/src" rel="nofollow noreferrer" target="_blank">Button.ts</a></td>
<td>按钮组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Picture/src" rel="nofollow noreferrer" target="_blank">Picture.ts</a></td>
<td>歌曲图片组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Container/src" rel="nofollow noreferrer" target="_blank">Container.ts</a></td>
<td>右侧容器组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Info/src" rel="nofollow noreferrer" target="_blank">Info.ts</a></td>
<td>歌曲信息组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Lyric/src" rel="nofollow noreferrer" target="_blank">Lyric.ts</a></td>
<td>歌词面板组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Progress/src" rel="nofollow noreferrer" target="_blank">Progress.ts</a></td>
<td>进度条组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Time/src" rel="nofollow noreferrer" target="_blank">Time.ts</a></td>
<td>播放时间组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Volume/src" rel="nofollow noreferrer" target="_blank">Volume.ts</a></td>
<td>音量控制组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/List/src" rel="nofollow noreferrer" target="_blank">List.ts</a></td>
<td>播放列表组件</td>
</tr>
<tr>
<td><a href="https://github.com/MoeFE/vue-aplayer/tree/master/src/components/Item/src" rel="nofollow noreferrer" target="_blank">Item.ts</a></td>
<td>播放列表项组件</td>
</tr>
</tbody>
</table>
<p>再来一张更清晰的图片吧：  </p>
<p><span class="img-wrap"><img data-src="/img/bVRs5y?w=3838&amp;h=1386" src="https://static.alili.tech/img/bVRs5y?w=3838&amp;h=1386" alt="vue-devtools" title="vue-devtools" style="cursor: pointer;"></span></p>
<p><a href="http://i4.piimg.com/549484/fd58c3c12bc329e1.png" rel="nofollow noreferrer" target="_blank">点击查看高清原图</a></p>
<h2 id="articleHeader4">功能开发</h2>
<p>功能开发其实没有多少难度，<code>HTML5</code> 已经封装好了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio" rel="nofollow noreferrer" target="_blank">HTMLAudioElement</a> 元素  <br>我们就是用一下它的 <code>API</code> 和视图进行数据绑定和交互而已 看一下文档就好了</p>
<p>不过这里会遇到一个小问题，那就是 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 不能监听到 <code>Audio</code> 对象的属性变化  <br>因为 <code>Audio</code> 对象其实就是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio" rel="nofollow noreferrer" target="_blank">HTMLAudioElement</a> 元素，<a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 是不能监听到元素属性变化的，所以我想了一个小办法  </p>
<p>定义了一个 <code>Media</code> 接口，里面定义了和 <code>Audio</code> 对象相同的属性，在 <code>Audio</code> 的事件中对 <code>Media</code> 的属性进行同步  <br>这样的话，就可以使用 <code>Media</code> 对象响应式获取 <code>Audio</code> 的属性值  <br>可以查看这一段代码：<a href="https://github.com/MoeFE/vue-aplayer/blob/master/src/components/APlayer/src/APlayer.ts#L326-L334" rel="nofollow noreferrer" target="_blank">APlayer.ts#L326-L334</a></p>
<p>我这里简单介绍一些比较常用的属性和方法吧</p>
<table>
<thead><tr>
<th>名称</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>autoplay</code></td>
<td>是否自动播放 （在 <code>Safari</code> 中无效，可以自行在初始化音频后手动调用 play 方法）</td>
</tr>
<tr>
<td><code>bufferd</code></td>
<td>获取已缓冲的进度（必须在 <code>readeyState &gt;= 3</code> 之后获取，否则会抛异常）</td>
</tr>
<tr>
<td><code>loop</code></td>
<td>是否循环播放音频（推荐根据当前播放模式自行实现该功能）</td>
</tr>
<tr>
<td><code>preload</code></td>
<td>预加载选项，推荐使用 <code>metadata</code>，在未播放时仅获取音频的长度，而不要加载整个音频</td>
</tr>
<tr>
<td><code>src</code></td>
<td>获取或设置音频的播放地址</td>
</tr>
<tr>
<td><code>volume</code></td>
<td>获取或设置音频的音量（0～1）</td>
</tr>
<tr>
<td><code>paused</code></td>
<td>获取当前音频是否已暂停</td>
</tr>
<tr>
<td><code>currentTime</code></td>
<td>获取或设置当前音频的播放进度（单位：秒）</td>
</tr>
<tr>
<td><code>duration</code></td>
<td>获取当前音频的长度（单位：秒）</td>
</tr>
<tr>
<td><code>playbackRate</code></td>
<td>获取或设置当前音频的播放速度</td>
</tr>
<tr>
<td><code>play ()</code></td>
<td>播放音频</td>
</tr>
<tr>
<td><code>pause ()</code></td>
<td>暂停音频</td>
</tr>
</tbody>
</table>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events" rel="nofollow noreferrer" target="_blank">点击查看所有 Media 事件</a></p>
<p>事实上 <code>Audio</code> 和 <code>Video</code> 对象差不多 都属于 <code>Media</code>  <br>所以如果你会开发音乐播放器那么也会开发视频播放器了  </p>
<p>这里重点说一下 <code>timeupdate</code> 事件，这个事件在音频播放时不断触发，这个可以说是最有用的事件了  <br>因为在播放过程中需要不断的重绘播放器的播放进度和已播放时间  <br>如果有歌词的话，还需要根据当前的播放时间去同步歌词  </p>
<p>如果没有或者不知道这个事件的话，你可能会使用 <code>setInterval</code> 代替  <br>使用 <code>setInterval</code> 的话，会有两个问题：  <br>1.重绘时间到底设置多少合适？太快了影响性能，太慢了页面不同步  <br>2.如果用户暂停播放了，需要清除定时器，开始播放又要初始化定时器，太麻烦<br>（或者偷懒的话可以判断 <code>paused</code> 时 <code>return</code> ，那么需要不断的跑一个空定时器）</p>
<h4>LRC 歌词解析和同步</h4>
<p>可能做这个功能的时候是最好玩的吧 qwq  <br>因为在很久以前 千千静听那个年代 我无聊的时候就做一下 LRC 歌词  <br>所以对这个功能很敏感 尽量做到最好吧 (´・_・｀)</p>
<p>这里主要功能是歌词解析，歌词同步的话只要计算出与当前播放时间最匹配的项元素  <br>然后设置歌词面板的滚动条位置到当前元素的位置即可</p>
<p>常见的时间标签有以下几种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[mm:ss] 只有分和秒的时间标签
[mm:ss:ms] 有分、秒、毫秒的时间标签
[mm:ss.ms] 有分、秒、毫秒的时间标签的另一种格式
[mm:ss:ms][mm:ss.ms] 多个时间标签共享这一句相同的歌词" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>[mm:ss] 只有分和秒的时间标签
[mm:ss:ms] 有分、秒、毫秒的时间标签
[mm:ss.ms] 有分、秒、毫秒的时间标签的另一种格式
[<span class="hljs-string">mm:ss:ms</span>][<span class="hljs-symbol">mm:ss.ms</span>] 多个时间标签共享这一句相同的歌词</code></pre>
<p>我的思路是：<br>首先按照行将歌词文本分割成数组，再按行进行解析  <br>使用正则表达式匹配出该行的 分、秒、毫秒 和显示的歌词文本  <br>将 分、秒、毫秒 都转换成毫秒单位然后加起来与歌词文本关联后保存到数组中，最后需要按照时间正序排列  <br>那么 <code>当前要显示的歌词 = 过滤数组中 时间 &lt; 当前播放时间 后的最后一项</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="private async parseLRC (): Promise<void> {
  if (!this.lrc || this.lrc === 'loading') return
  if (this.isURL(this.lrc)) { // 如果歌词是一个URL地址则请求该地址获得歌词文本
    const { data } = await Axios.get(this.lrc.toString())
    this.currentLRC = data
  } else this.currentLRC = this.lrc

  const reg = /\[(\d+):(\d+)[.|:](\d+)\](.+)/
  const regTime = /\[(\d+):(\d+)[.|:](\d+)\]/g
  const regCompatible = /\[(\d+):(\d+)]()(.+)/
  const regTimeCompatible = /\[(\d+):(\d+)]/g
  const regOffset = /\[offset:\s*(-{0,1}\d+)\]/
  const offsetMatch = this.lrc.match(regOffset)
  const offset = offsetMatch ? Number.parseInt(offsetMatch[1]) : 0
  this.LRC = []

  const matchAll = (line: string) => {
    let match = line.match(reg) || line.match(regCompatible)
    if (!match) return
    if (match.length !== 5) return
    const minutes = Number.parseInt(match[1]) || 0
    const seconds = Number.parseInt(match[2]) || 0
    const milliseconds = Number.parseInt(match[3]) || 0
    const time = (minutes * 60 * 1000 + seconds * 1000 + milliseconds) + offset
    const text = (match[4] as string).replace(regTime, '').replace(regTimeCompatible, '')
    if (!text) return // 优化：不要显示空行
    this.LRC.push({ time, text })
    matchAll(match[4]) // 递归匹配多个时间标签
  }

  this.currentLRC.replace(/\\n/g, '\n').split('\n').forEach(line => matchAll(line))

  // 歌词格式不支持
  if (this.LRC.length <= 0) this.LRC = [{ time: -1, text: '(・∀・*) 抱歉，该歌词格式不支持' }]
  else this.LRC.sort((a, b) => a.time - b.time)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">private</span> <span class="hljs-keyword">async</span> parseLRC (): <span class="hljs-built_in">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt; {
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.lrc || <span class="hljs-keyword">this</span>.lrc === <span class="hljs-string">'loading'</span>) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isURL(<span class="hljs-keyword">this</span>.lrc)) { <span class="hljs-comment">// 如果歌词是一个URL地址则请求该地址获得歌词文本</span>
    <span class="hljs-keyword">const</span> { data } = <span class="hljs-keyword">await</span> Axios.get(<span class="hljs-keyword">this</span>.lrc.toString())
    <span class="hljs-keyword">this</span>.currentLRC = data
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">this</span>.currentLRC = <span class="hljs-keyword">this</span>.lrc

  <span class="hljs-keyword">const</span> reg = <span class="hljs-regexp">/\[(\d+):(\d+)[.|:](\d+)\](.+)/</span>
  <span class="hljs-keyword">const</span> regTime = <span class="hljs-regexp">/\[(\d+):(\d+)[.|:](\d+)\]/g</span>
  <span class="hljs-keyword">const</span> regCompatible = <span class="hljs-regexp">/\[(\d+):(\d+)]()(.+)/</span>
  <span class="hljs-keyword">const</span> regTimeCompatible = <span class="hljs-regexp">/\[(\d+):(\d+)]/g</span>
  <span class="hljs-keyword">const</span> regOffset = <span class="hljs-regexp">/\[offset:\s*(-{0,1}\d+)\]/</span>
  <span class="hljs-keyword">const</span> offsetMatch = <span class="hljs-keyword">this</span>.lrc.match(regOffset)
  <span class="hljs-keyword">const</span> offset = offsetMatch ? <span class="hljs-built_in">Number</span>.parseInt(offsetMatch[<span class="hljs-number">1</span>]) : <span class="hljs-number">0</span>
  <span class="hljs-keyword">this</span>.LRC = []

  <span class="hljs-keyword">const</span> matchAll = <span class="hljs-function">(<span class="hljs-params">line: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> match = line.match(reg) || line.match(regCompatible)
    <span class="hljs-keyword">if</span> (!match) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">if</span> (match.length !== <span class="hljs-number">5</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">const</span> minutes = <span class="hljs-built_in">Number</span>.parseInt(match[<span class="hljs-number">1</span>]) || <span class="hljs-number">0</span>
    <span class="hljs-keyword">const</span> seconds = <span class="hljs-built_in">Number</span>.parseInt(match[<span class="hljs-number">2</span>]) || <span class="hljs-number">0</span>
    <span class="hljs-keyword">const</span> milliseconds = <span class="hljs-built_in">Number</span>.parseInt(match[<span class="hljs-number">3</span>]) || <span class="hljs-number">0</span>
    <span class="hljs-keyword">const</span> time = (minutes * <span class="hljs-number">60</span> * <span class="hljs-number">1000</span> + seconds * <span class="hljs-number">1000</span> + milliseconds) + offset
    <span class="hljs-keyword">const</span> text = (match[<span class="hljs-number">4</span>] <span class="hljs-keyword">as</span> <span class="hljs-built_in">string</span>).replace(regTime, <span class="hljs-string">''</span>).replace(regTimeCompatible, <span class="hljs-string">''</span>)
    <span class="hljs-keyword">if</span> (!text) <span class="hljs-keyword">return</span> <span class="hljs-comment">// 优化：不要显示空行</span>
    <span class="hljs-keyword">this</span>.LRC.push({ time, text })
    matchAll(match[<span class="hljs-number">4</span>]) <span class="hljs-comment">// 递归匹配多个时间标签</span>
  }

  <span class="hljs-keyword">this</span>.currentLRC.replace(<span class="hljs-regexp">/\\n/g</span>, <span class="hljs-string">'\n'</span>).split(<span class="hljs-string">'\n'</span>).forEach(<span class="hljs-function"><span class="hljs-params">line</span> =&gt;</span> matchAll(line))

  <span class="hljs-comment">// 歌词格式不支持</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.LRC.length &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">this</span>.LRC = [{ time: <span class="hljs-number">-1</span>, text: <span class="hljs-string">'(・∀・*) 抱歉，该歌词格式不支持'</span> }]
  <span class="hljs-keyword">else</span> <span class="hljs-keyword">this</span>.LRC.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a.time - b.time)
}</code></pre>
<p><a href="https://github.com/MoeFE/vue-aplayer/blob/master/src/components/Lyric/src/Lyric.ts#L70-L105" rel="nofollow noreferrer" target="_blank">点击查看完整代码</a></p>
<h2 id="articleHeader5">总结</h2>
<p>完善了原 <a href="https://github.com/DIYgod/APlayer" rel="nofollow noreferrer" target="_blank">APlayer</a> 不足的地方：<br>1.可以响应式的随意控制播放器属性  <br>2.歌词同步支持多种时间标签格式（fix <a href="https://github.com/DIYgod/APlayer/issues/39" rel="nofollow noreferrer" target="_blank">#39</a>）  <br>3.歌词同步兼容 <code>[offset:0]</code> 标签  <br>4.异步歌词的支持  <br>5.允许控制播放速度（相同的歌曲用不同的速度听感觉会不一样哦 quq）  <br>6.音量允许拖动控制  <br>7.支持注册所有 <code>Media</code> 事件  <br>8.保存播放器配置到 <code>localStorage</code> 中，刷新后可以恢复播放进度等信息</p>
<p>并且体验了一把用 <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TS</a> 写 <a href="https://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">Vue</a> 的快感w </p>
<p>最后 弱弱的：<a href="https://github.com/MoeFE" rel="nofollow noreferrer" target="_blank">@MoeFE</a> 欢迎各位大佬加入 (๑•̀ㅂ•́)و✧  <br>额..没啥要求 头像要萌要可爱的！！</p>
<p>好想有个大佬能带我装逼带我飞 (ง •_•)ง</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 TS + Vue 重写 APlayer HTML5 音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000010324395](https://segmentfault.com/a/1190000010324395)

