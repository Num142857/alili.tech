---
title: '基于React的音乐播放器，适配PC端和移动端' 
date: 2018-12-20 2:30:10
hidden: true
slug: 7afqimd3bwe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基于React的适配PC端和移动端的轻量音乐播放器</h2>
<blockquote>技术：React16</blockquote>
<h3 id="articleHeader1">更新</h3>
<p>基于这个音乐播放器组件写了一个简单的webapp,功能更丰富！<a href="https://github.com/capslocktao/react-music-webapp/tree/master/client" rel="nofollow noreferrer" target="_blank">项目github地址</a><br><br><strong>演示</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV5EwA?w=280&amp;h=280" src="https://static.alili.tech/img/bV5EwA?w=280&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>演示部分页面</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV5Exn?w=502&amp;h=800" src="https://static.alili.tech/img/bV5Exn?w=502&amp;h=800" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">写在前面</h3>
<p>之前基于Vue写了一个播放器，带各种功能，最后把自己绕死了。这次用React重写了个，舍弃了那些没用的功能，只保留了基本功能。并且利用媒体查询适配移动端和手机端。组件之间传值利用props，这个播放器先供自己用，以后会抽离成为一个插件。</p>
<p><a href="http://akongkong.cn/build/" rel="nofollow noreferrer" target="_blank">点击查看项目演示</a>（可能因为会资源问题有歌曲播放不出来，如果发现我会及时解决的，目前是好的）</p>
<p><a href="https://github.com/capslocktao/react-music-player" rel="nofollow noreferrer" target="_blank">点击进入github查看代码</a></p>
<p><span class="img-wrap"><img data-src="/img/bV1fWK?w=375&amp;h=667" src="https://static.alili.tech/img/bV1fWK?w=375&amp;h=667" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV1fXQ?w=1919&amp;h=970" src="https://static.alili.tech/img/bV1fXQ?w=1919&amp;h=970" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">功能</h3>
<ul>
<li>播放，暂停</li>
<li>上一曲，下一曲</li>
<li>滑动或者点击歌曲进度条实现音乐的快进快退</li>
<li>音乐剩余时间同步显示</li>
<li>缓冲进度条</li>
<li>播放进度条</li>
<li>音量控制</li>
<li>点击菜单按钮展开与隐藏播放列表</li>
<li>播放列表内音乐播放，删除，当前播放音乐高亮显示</li>
<li>播放音乐时封面图片旋转，暂停时停止旋转（只在PC端可查看，移动端隐藏音乐封面图片）</li>
</ul>
<h3 id="articleHeader4">说明</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git@github.com:capslocktao/react-music-player.git

//安装依赖
npm install

//启动项目
npm start

//打包编译
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>git clone git@github<span class="hljs-selector-class">.com</span>:capslocktao/react-music-player<span class="hljs-selector-class">.git</span>

<span class="hljs-comment">//安装依赖</span>
npm install

<span class="hljs-comment">//启动项目</span>
npm start

<span class="hljs-comment">//打包编译</span>
npm run build</code></pre>
<table>
<thead><tr>
<th>API</th>
<th align="left">说明</th>
<th>类型</th>
</tr></thead>
<tbody>
<tr>
<td>info</td>
<td align="left">传入组件的歌曲数据</td>
<td>Array</td>
</tr>
<tr>
<td>onDel</td>
<td align="left">删除歌曲的回调函数</td>
<td>Function</td>
</tr>
</tbody>
</table>
<p>info接收的参数类型为一个对象数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    render() {
        const songInfo = [
            {
                src:&quot;http://fs.w.kugou.com/201712281346/32b6de4127502b0f2defb32a859b7278/G048/M00/1B/0F/EJQEAFYl4ZuAUSEVAEIa293rBH4619.mp3&quot;,
                artist:&quot;陶喆&quot;,
                name:&quot;Melody&quot;,
                img:&quot;http://imge.kugou.com/stdmusic/20150718/20150718174252663587.jpg&quot;,
                id:&quot;66575568441&quot;
            },
            {
                src:&quot;http://fs.w.kugou.com/201712281315/2e497482c4283748d6b3d3e7912caada/G010/M07/1F/1D/qoYBAFUKLG2AFwOuAD6hYqqxfPE635.mp3&quot;,
                artist:&quot;周杰伦&quot;,
                name:&quot;千里之外&quot;,
                img:&quot;http://imge.kugou.com/stdmusic/20170728/20170728122746411503.jpg&quot;,
                id:&quot;43245456534&quot;
            }
        ]
    return (
      <div className=&quot;App&quot;>
          <ReactMusicPlayer
            info={songInfo}
            onDel = {this.delSong}
          />
      </div>
    );
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>    render() {
        const songInfo = [
            {
<span class="hljs-symbol">                src:</span><span class="hljs-string">"http://fs.w.kugou.com/201712281346/32b6de4127502b0f2defb32a859b7278/G048/M00/1B/0F/EJQEAFYl4ZuAUSEVAEIa293rBH4619.mp3"</span>,
<span class="hljs-symbol">                artist:</span><span class="hljs-string">"陶喆"</span>,
<span class="hljs-symbol">                name:</span><span class="hljs-string">"Melody"</span>,
<span class="hljs-symbol">                img:</span><span class="hljs-string">"http://imge.kugou.com/stdmusic/20150718/20150718174252663587.jpg"</span>,
<span class="hljs-symbol">                id:</span><span class="hljs-string">"66575568441"</span>
            },
            {
<span class="hljs-symbol">                src:</span><span class="hljs-string">"http://fs.w.kugou.com/201712281315/2e497482c4283748d6b3d3e7912caada/G010/M07/1F/1D/qoYBAFUKLG2AFwOuAD6hYqqxfPE635.mp3"</span>,
<span class="hljs-symbol">                artist:</span><span class="hljs-string">"周杰伦"</span>,
<span class="hljs-symbol">                name:</span><span class="hljs-string">"千里之外"</span>,
<span class="hljs-symbol">                img:</span><span class="hljs-string">"http://imge.kugou.com/stdmusic/20170728/20170728122746411503.jpg"</span>,
<span class="hljs-symbol">                id:</span><span class="hljs-string">"43245456534"</span>
            }
        ]
    return (
      <span class="hljs-params">&lt;div className="App"&gt;</span>
          <span class="hljs-params">&lt;ReactMusicPlayer
            info={songInfo}
            onDel = {this.delSong}
          /&gt;</span>
      <span class="hljs-params">&lt;/div&gt;</span>
    );
  }</code></pre>
<p>onDel是当删除播放列表内的歌曲时，触发的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    delSong(i,id){
        //接收两个参数：i为删除的歌曲在播放列表中的位置；id为删除掉的歌曲的id
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    delSong(<span class="hljs-selector-tag">i</span>,id){
        <span class="hljs-comment">//接收两个参数：i为删除的歌曲在播放列表中的位置；id为删除掉的歌曲的id</span>
    }</code></pre>
<h3 id="articleHeader5">开发</h3>
<p>播放器底层是一个audio标签，利用audio的API开发。用到的API有：</p>
<ul>
<li>audio.buffered; 返回已缓冲区域，TimeRanges</li>
<li>aduio.duration; 返回当前媒体的总时间</li>
<li>audio.currentTime; 当前播放的位置，赋值可改变位置</li>
<li>audio.paused; 是否暂停</li>
<li>audio.ended;是否结束</li>
<li>audio.play();播放</li>
<li>audio.pause();暂停</li>
<li>audio.volume;音量控制（0-1）</li>
</ul>
<p>事件API：</p>
<ul>
<li>canplay; 是否可以播放，但中途可能因为加载而暂停</li>
<li>timeupdate；播放时间更新</li>
</ul>
<p>所有的API：<a href="http://blog.sina.com.cn/s/blog_51e565eb01018tbp.html" rel="nofollow noreferrer" target="_blank">http://blog.sina.com.cn/s/blo...</a></p>
<p>首先获取audio对象，这里我是用react的this.refs来获取的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let audio = this.refs.audio;
<audio src={this.state.currentMusic.src?this.state.currentMusic.src:&quot;&quot;} ref = &quot;audio&quot;></audio>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>let audio = <span class="hljs-keyword">this</span>.refs.audio;
&lt;audio src={<span class="hljs-keyword">this</span>.state.currentMusic.src?<span class="hljs-keyword">this</span>.state.currentMusic.src:<span class="hljs-string">""</span>} ref = <span class="hljs-string">"audio"</span>&gt;&lt;/audio&gt;</code></pre>
<p>然后全局定义一个控制播放的函数，点播放调用一下，上一曲下一曲调用一下，一首歌结束后调用一下，播放列表切歌调用一下，播放列表删除歌曲调用一下。。。总之就是哪里需要哪里调用，很方便。</p>
<p><span class="img-wrap"><img data-src="/img/bV09s7?w=931&amp;h=820" src="https://static.alili.tech/img/bV09s7?w=931&amp;h=820" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>接下来是写进度条：<br>由于移动端和PC端事件不一样，所以分别绑定了不同的事件<br>buffered为缓冲进度条，played为播放进度条</p>
<p><span class="img-wrap"><img data-src="/img/bV09aG?w=925&amp;h=400" src="https://static.alili.tech/img/bV09aG?w=925&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>读取歌曲的缓冲进度，就要用到audio.buffered这个属性了，而且要在audio的timeupdate事件里实时监听，这里把播放进度条的代码也贴出来了。经过验证：利用this.refs获取DOM设置样式，不会引起组件的更新渲染。性能可能要比在render里函数监听state的变化要好，类似下边这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div className=&quot;progress-buffered&quot; ref=&quot;buffered&quot; style="{{"width:&quot;state里计算好的长度%&quot;"}}" ></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> className=<span class="hljs-string">"progress-buffered"</span> <span class="hljs-keyword">ref</span>=<span class="hljs-string">"buffered"</span> style="{{"width:<span class="hljs-string">"state里计算好的长度%"</span>"}}" &gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>进度条实时变化的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        audio.addEventListener('timeupdate',()=>{
            //设置播放进度条
            let playPer = audio.currentTime/audio.duration;
            this.refs.played.style.width = playPer*100+&quot;%&quot;;
            //设置缓冲进度条
            let timeRages = audio.buffered;
            let bufferedTime = 0
            if(timeRages.length !== 0){
                bufferedTime = timeRages.end(timeRages.length-1);
            }
            let bufferedPer = bufferedTime/audio.duration;
            this.refs.buffered.style.width = bufferedPer*100+&quot;%&quot;;
            //设置剩余时间
            let remainTime = parseInt(audio.duration - audio.currentTime);

            this.setState({
                remainTime:this.getTime(remainTime),
            });
            if(audio.ended){
                this.next()
            }
        })
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>        audio.addEventListener(<span class="hljs-string">'timeupdate'</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-comment">//设置播放进度条</span>
            <span class="hljs-keyword">let</span> playPer = audio.currentTime/audio.duration;
            <span class="hljs-keyword">this</span>.refs.played.style.width = playPer*<span class="hljs-number">100</span>+<span class="hljs-string">"%"</span>;
            <span class="hljs-comment">//设置缓冲进度条</span>
            <span class="hljs-keyword">let</span> timeRages = audio.buffered;
            <span class="hljs-keyword">let</span> bufferedTime = <span class="hljs-number">0</span>
            <span class="hljs-keyword">if</span>(timeRages.length !== <span class="hljs-number">0</span>){
                bufferedTime = timeRages.end(timeRages.length<span class="hljs-number">-1</span>);
            }
            <span class="hljs-keyword">let</span> bufferedPer = bufferedTime/audio.duration;
            <span class="hljs-keyword">this</span>.refs.buffered.style.width = bufferedPer*<span class="hljs-number">100</span>+<span class="hljs-string">"%"</span>;
            <span class="hljs-comment">//设置剩余时间</span>
            <span class="hljs-keyword">let</span> remainTime = <span class="hljs-built_in">parseInt</span>(audio.duration - audio.currentTime);

            <span class="hljs-keyword">this</span>.setState({
                remainTime:<span class="hljs-keyword">this</span>.getTime(remainTime),
            });
            <span class="hljs-keyword">if</span>(audio.ended){
                <span class="hljs-keyword">this</span>.next()
            }
        })
</code></pre>
<p>拖动或点击进度条，我分别对于PC端和移动端定义了一个事件，之后点击或者拖动的时候分别调用就可以啦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //PC端
    setTimeOnPc(e){
        let audio = this.refs.audio;
        if(audio.currentTime !== 0) {
            let audio = this.refs.audio;
            let newWidth = (e.pageX - this.state.playedLeft) / this.refs.progress.offsetWidth;
            this.refs.played.style.width = newWidth * 100 + &quot;%&quot;;
            audio.currentTime = newWidth * audio.duration;
        }
    }

    //移动端
    setTime(e){
        let audio = this.refs.audio;
        let newWidth = (e.touches[0].pageX-this.state.playedLeft)/this.refs.progress.offsetWidth;
        this.refs.played.style.width = newWidth*100 + &quot;%&quot;;
        audio.currentTime = newWidth*audio.duration
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    <span class="hljs-comment">//PC端</span>
    setTimeOnPc(e){
        let audio = <span class="hljs-built_in">this</span>.refs.audio;
        <span class="hljs-keyword">if</span>(audio.currentTime !== <span class="hljs-number">0</span>) {
            let audio = <span class="hljs-built_in">this</span>.refs.audio;
            let <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> = (e.pageX - <span class="hljs-built_in">this</span>.state.playedLeft) / <span class="hljs-built_in">this</span>.refs.progress.offsetWidth;
            <span class="hljs-built_in">this</span>.refs.played.style.width = <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> * <span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>;
            audio.currentTime = <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> * audio.duration;
        }
    }

    <span class="hljs-comment">//移动端</span>
    setTime(e){
        let audio = <span class="hljs-built_in">this</span>.refs.audio;
        let <span class="hljs-keyword">new</span><span class="hljs-type">Width</span> = (e.touches[<span class="hljs-number">0</span>].pageX-<span class="hljs-built_in">this</span>.state.playedLeft)/<span class="hljs-built_in">this</span>.refs.progress.offsetWidth;
        <span class="hljs-built_in">this</span>.refs.played.style.width = <span class="hljs-keyword">new</span><span class="hljs-type">Width</span>*<span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>;
        audio.currentTime = <span class="hljs-keyword">new</span><span class="hljs-type">Width</span>*audio.duration
    }
</code></pre>
<p>音量控制条的拖动和点击也是同理，就不在复述一遍了。<br>播放列表的滑动动画是用的ReactCssTransitionGroup实现的。<br>以上这些是最核心的功能，希望对大家有所帮助。</p>
<h2 id="articleHeader6">总结</h2>
<p>这个小组件源于自己想写一个网站练练手，网站上会有播放音乐的功能，但是对现有的react音乐播放器插件不太满意，所以索性自己开发了一个，连玩带写写了两天。因为有了上次用Vue开发播放器的惨痛教训，这次开发本着一个原则：精简。而且在代码的组织方式上也有了更多的思考，所以这次开发还比较顺畅。喜欢的可以给点个星星~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于React的音乐播放器，适配PC端和移动端

## 原文链接
[https://segmentfault.com/a/1190000012628577](https://segmentfault.com/a/1190000012628577)

