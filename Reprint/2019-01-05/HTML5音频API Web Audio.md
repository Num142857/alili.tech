---
title: 'HTML5音频API Web Audio' 
date: 2019-01-05 2:30:10
hidden: true
slug: kbqaon0o8c8
categories: [reprint]
---

{{< raw >}}

                    
<p>此文介绍HTML5音频API的主要框架和工作流程，因为音频处理模块很多，因此只简单介绍几种音频处理模块，并通过例子来展示效果。后续会介绍利用HTML5音频API实现的项目，欢迎大家关注，敬请期待。</p>
<p>HTML5音频API的主要框架和工作流程如下图，在 <strong>AudioContext</strong> 音频上下文中，把音频文件转成 <strong>buffer</strong> 格式，从音频源 <strong>source</strong> 开始，经过 <strong>AuidoNode</strong> 处理音频，最后到达 <strong>destination</strong> 输出音乐。这里形成了一个音频通道，每个模块通过 <strong>connect</strong> 方法链接并传送音频。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010561227" src="https://static.alili.tech/img/remote/1460000010561227" alt="audiocontext1" title="audiocontext1" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">AudioContext</h2>
<p><strong>AudioContext</strong> 是一个音频上下文，像一个大工厂，所有的音频在这个音频上下文中处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let audioContext = new(window.AudioContext || window.webkitAudioContext)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> audioContext = <span class="hljs-keyword">new</span>(<span class="hljs-built_in">window</span>.AudioContext || <span class="hljs-built_in">window</span>.webkitAudioContext)();</code></pre>
<p><strong>AudioContext</strong> 音频上下文提供了很多属性和方法，用于创建各种音频源和音频处理模块等，这里只介绍一部分，更多属性和方法可到<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext" rel="nofollow noreferrer" target="_blank">MDN</a>查阅文档。</p>
<h3 id="articleHeader1">属性</h3>
<p><strong>AudioContext.destination</strong></p>
<p>返回 <strong>AudioDestinationNode</strong> 对象，表示当前 <strong>AudioContext</strong> 中所有节点的最终节点，一般表示音频渲染设备。</p>
<h3 id="articleHeader2">方法</h3>
<p><strong>AudioContext.createBufferSource()</strong></p>
<p>创建一个 <strong>AudioBufferSourceNode</strong> 对象, 他可以通过 <strong>AudioBuffer</strong> 对象来播放和处理包含在内的音频数据。</p>
<p><strong>AudioContext.createGain()</strong></p>
<p>创建一个 <strong>GainNode</strong>,它可以控制音频的总音量。</p>
<p><strong>AudioContext.createBiquadFilter()</strong></p>
<p>创建一个 <strong>BiquadFilterNode</strong>，它代表代表一个双二阶滤波器，可以设置几种不同且常见滤波器类型：高通、低通、带通等。</p>
<p><strong>createOscillator()</strong></p>
<p>创建一个 <strong>OscillatorNode</strong>, 它表示一个周期性波形，基本上来说创造了一个音调。</p>
<h2 id="articleHeader3">音频转换成Buffer格式</h2>
<p>使用<code>decodeAudioData()</code>方法把音频文件编译成buffer格式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function decodeAudioData(audioContext, url) {
    return new Promise((resolve) => {
        let request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
            audioContext.decodeAudioData(request.response, (buffer) => {
                if (!buffer) {
                    alert('error decoding file data: ' + url);
                    return;
                } else {
                    resolve(buffer);
                }
            })
        }
        request.onerror = function() {
            alert('BufferLoader: XHR error');
        }
        request.send();
    })
}

let buffer = decodeAudioData(audioContext, './sounds/music.mp3');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decodeAudioData</span>(<span class="hljs-params">audioContext, url</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
        <span class="hljs-keyword">let</span> request = <span class="hljs-keyword">new</span> XMLHttpRequest();
        request.open(<span class="hljs-string">'GET'</span>, url, <span class="hljs-literal">true</span>);
        request.responseType = <span class="hljs-string">'arraybuffer'</span>;
        request.onload = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            audioContext.decodeAudioData(request.response, (buffer) =&gt; {
                <span class="hljs-keyword">if</span> (!buffer) {
                    alert(<span class="hljs-string">'error decoding file data: '</span> + url);
                    <span class="hljs-keyword">return</span>;
                } <span class="hljs-keyword">else</span> {
                    resolve(buffer);
                }
            })
        }
        request.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            alert(<span class="hljs-string">'BufferLoader: XHR error'</span>);
        }
        request.send();
    })
}

<span class="hljs-keyword">let</span> buffer = decodeAudioData(audioContext, <span class="hljs-string">'./sounds/music.mp3'</span>);</code></pre>
<h2 id="articleHeader4">AudioNode</h2>
<p>音频节点接口是一个音频处理模块。包括音频源，音频输出，中间处理模块。</p>
<h3 id="articleHeader5">方法</h3>
<p><strong>AudioNode.connect()</strong></p>
<p>链接两个 <strong>AudioNode</strong> 节点，把音频从一个 <strong>AudioNode</strong> 节点输出到另一个 <strong>AudioNode</strong> 节点，形成一个音频通道。</p>
<p><strong>AudioNode.disconnect()</strong></p>
<p>把 <strong>AudioNode</strong> 节点与其他节点断开链接。</p>
<h3 id="articleHeader6">AudioBufferSourceNode</h3>
<p>音频源有多种，这里只介绍 <strong>buffer</strong> 的音频源，<strong>buffer</strong> 的音频源通过 <strong>AudioContext</strong> 接口的 <strong>createBufferSource</strong> 方法来创建。音频源节点继承 <strong>AudioNode</strong> 音频节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let bufferSource = audioContext.createBufferSource();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let bufferSource</span> = audioContext.createBufferSource();</code></pre>
<p>创建了 <strong>AudioBufferSourceNode</strong> 对象后，把 <strong>buffer</strong> 格式的音频数据赋值给  <strong>AudioBufferSourceNode</strong> 对象的 <strong>buffer</strong> 属性，此时音频已经传递到音频源，可以对音频进行处理或输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bufferSource.buffer = buffer;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">bufferSource.<span class="hljs-built_in">buffer</span> = <span class="hljs-built_in">buffer</span>;</code></pre>
<h4>方法</h4>
<p><strong>AudioBufferSourceNode.start(when[, duration])</strong></p>
<p>开始播放。</p>
<ul>
<li><p>when：延迟播放时间，单位为秒。</p></li>
<li><p>offset：定位音频到第几秒开始播放。</p></li>
<li><p>duration：从开始播放结束时长，当经过设置秒数后自动结束音频播放。</p></li>
</ul>
<p><strong>AudioBufferSourceNode.stop([when])</strong></p>
<ul><li><p>when：延迟停止时间，单位为秒。</p></li></ul>
<p>停止播放，注意调用该方法后，无法再次调用 <strong>AudioBufferSourceNode.start</strong> 播放。</p>
<h3 id="articleHeader7">AudioDestinationNode</h3>
<p>音频终点是通过 <strong>AudioContext</strong> 接口的 <strong>destination</strong> 属性访问的。音频终点继承 <strong>AudioNode</strong> 音频节点， </p>
<p><strong>AudioDestinationNode</strong> 节点无法再把音频信息传递给下一个音频节点，即无法再链接其他音频节点，因为他已经是终点，没有输出，也可以理解为他自己就是输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let audioDestinationNode = audioContext.destination;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let audioDestinationNode</span> = audioContext.destination;</code></pre>
<p>此时我们有音频起点 <strong>AudioBufferSourceNode</strong> 和音频终点 <strong>AudioDestinationNode</strong> ，使用 <strong>AudioNode.connect()</strong> 方法把起点和终点链接起来，就形成了一条有输入输出的音频通道，可以把音频直接播放出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bufferSource.connect(audioDestinationNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">bufferSource.connect(audioDestinationNode)<span class="hljs-comment">;</span></code></pre>
<p><a href="https://codepen.io/leechikit/pen/KvaJRp" rel="nofollow noreferrer" target="_blank">戳我看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/pen/KvaJRp" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader8">GainNode</h3>
<p>用于音量变化。它是一个 <strong>AudioNode</strong> 类型的音频处理模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let gainNode = audioContext.createGain();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let gainNode</span> = audioContext.createGain();</code></pre>
<p>把音频源、音频输出和音频处理模块链接一起，形成可控制音量大小的音频。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bufferSource.connect(gainNode);
gainNode.connect(audioDestinationNode);

let controlVolume = value => {
    gainNode.gain.value = value);
}

// 两倍音量播放
controlVolume(2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>bufferSource.connect(gainNode);
gainNode.connect(audioDestinationNode);

<span class="hljs-keyword">let</span> controlVolume = <span class="hljs-keyword">value</span> =&gt; {
    gainNode.gain.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>);
}

<span class="hljs-comment">// 两倍音量播放</span>
controlVolume(<span class="hljs-number">2</span>);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010561228" src="https://static.alili.tech/img/remote/1460000010561228" alt="audiocontext2" title="audiocontext2" style="cursor: pointer;"></span></p>
<p><a href="https://codepen.io/leechikit/pen/vJxewz" rel="nofollow noreferrer" target="_blank">戳我看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/pen/vJxewz" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader9">BiquadFilterNode</h3>
<p>表示一个简单的低频滤波器，可控制声调。它是一个 <strong>AudioNode</strong> 类型的音频处理模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let filterNode = audioContext.createBiquadFilter();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">let filterNode</span> = audioContext.createBiquadFilter();</code></pre>
<p>输出一个变调的音频：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="bufferSource.connect(filterNode);
filterNode.connect(audioDestinationNode);

let controlFrequency = function(value) {
    filterNode.frequency.value = value;
}

// 音频为1000变调
controlFrequency(1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code>bufferSource.connect(filterNode);
filterNode.connect(audioDestinationNode);

<span class="hljs-keyword">let</span> controlFrequency = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">value</span>) {
    filterNode.frequency.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
}

<span class="hljs-comment">// 音频为1000变调</span>
controlFrequency(<span class="hljs-number">1000</span>);</code></pre>
<h2 id="articleHeader10">多个音频源</h2>
<p>在一个音频上下文中，可以有多个音频处理通道，即多个音频源同时输出。各个音频处理通道内的操作是独立的，不影响其他音频通道。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010561229" src="https://static.alili.tech/img/remote/1460000010561229" alt="audiocontext3" title="audiocontext3" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://codepen.io/leechikit/pen/KvWyPV" rel="nofollow noreferrer" target="_blank">戳我看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/pen/KvWyPV" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader11">多个音频处理模块</h2>
<p>一个音频源可以经过多个音频处理模块处理，音频处理模块叠加效果后输出。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010561230" src="https://static.alili.tech/img/remote/1460000010561230" alt="audiocontext4" title="audiocontext4" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://codepen.io/leechikit/pen/Nvpwrq" rel="nofollow noreferrer" target="_blank">戳我看栗子</a><button class="btn btn-xs btn-default ml10 preview" data-url="leechikit/pen/Nvpwrq" data-typeid="3">点击预览</button></p>
<blockquote>
<p>欢迎关注：<a href="https://segmentfault.com/u/leechikit/articles">Leechikit</a><br>原文链接：<a href="https://segmentfault.com/a/1190000010561222" target="_blank">segmentfault.com</a></p>
<p>到此本文结束，欢迎提问和指正。<br>写原创文章不易，若本文对你有帮助，请点赞、推荐和关注作者支持。</p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5音频API Web Audio

## 原文链接
[https://segmentfault.com/a/1190000010561222](https://segmentfault.com/a/1190000010561222)

