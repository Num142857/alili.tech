---
title: '努力翻译一篇中文最友好的，Web Audio API的使用相关的文章' 
date: 2019-02-09 2:30:58
hidden: true
slug: is6rf3pkpqo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文翻译自MDN上的<a href="https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API/Using_Web_Audio_API" rel="nofollow noreferrer" target="_blank">《Web Audio APIの利用》</a>，这是HTML5中的Web Audio API的一个入门教程。原文是英文，但有日本同志翻译的日文版。我更熟悉日文，所以主要根据日文版翻译成简体中文，也会对照英文版的。</p>
<h2 id="articleHeader1">Web Audio API的使用</h2>
<p>Web Audio API提供给你一个简单却强大的机制，你可以利用它去实现与操作web应用内的音频内容。通过它，在网页中你也可以进行混音、音效、平移等各种复杂的音频处理功能的开发。这篇文章主要想通过两个简单的例子来说明Web Audio API的基础使用方法。</p>
<p>Web Audio API并不是替代&lt;audio&gt; 标签的东西，换句话说Web Audio API其实是对&lt;audio&gt; 标签功能上的补充。二者的关系可以类比&lt;img&gt;标签与&lt;canvas&gt; 标签。具体改选用哪个取决于你的目的是什么。如果只是为了简单地控制音频的播放的话，&lt;audio&gt;标签更适合吧。但是如果有更复杂的音频处理需求的话，就必须使用Web Audio API。</p>
<p>Web Audio API的一个强大之处是它没有严格的［发出声音的数目的限制］。例如，一秒内可以同时发出32个声音或64个声音，但这并不是上限。CPU的处理能力足够的话，1000多种声音也可以不经过压缩直接播放。如果这样发展下去的话，几年之后的中高端声卡的负荷会大大降低的吧。</p>
<p><em>PS：补充点背景知识，这里提到的32，64指的是复音数。复音数指MIDI乐曲在一秒钟内发出的最大声音数目。关于复音数和MIDI乐曲可以百度一下。声卡硬件会限制复音数，部分软件使用CPU实现声音播放的也会限制复音数。但理论上只要CPU处理能力够强复音数是不受限的。所以上段提及Web Audio Api是软件，但它没有复音数限制，所以说到只要CPU处理能力够强，未来或许能够降低对中高端声卡性能的需求</em></p>
<h2 id="articleHeader2">例子</h2>
<p>为了展示Web Audio API的用法，我们编写了一些例子，这些例子会不断地增加更新。请大家发扬开源<br>精神为项目添加用例或者提出更好的改善意见！</p>
<p><em>PS：这些例子最好在最新版chrome中运行</em></p>
<p>首先介绍一下 <a href="https://github.com/mdn/voice-change-o-matic" rel="nofollow noreferrer" target="_blank">Voice-change-O-matic</a> 。这是一个有变声及声音可视化功能的网页应用，且有一些变声效果与可视化效果可供选择。虽然这个应用还有许多可以改善的地方，但也不失为综合使用Web Audio API的许多功能的一个好例子。(可以在这里运行 <a href="https://mdn.github.io/voice-change-o-matic/" rel="nofollow noreferrer" target="_blank">Voice-change-O-matic</a>)</p>
<p><span class="img-wrap"><img data-src="/img/bVx7x6" src="https://static.alili.tech/img/bVx7x6" alt="voice-change-o-matic.png" title="voice-change-o-matic.png" style="cursor: pointer;"></span></p>
<p><em>PS：上面的这个例子我运行没效果啊，不知道怎么玩</em><br>*PS：感谢<a href="https://segmentfault.com/u/fsjy">vino24</a>补充的，该例子需要https，在chrome下可运行</p>
<p>为了理解Web Audio而编写的另一个例子就是这个<a href="http://mdn.github.io/violent-theremin/" rel="nofollow noreferrer" target="_blank">Violent Theremin</a>。这是一个简单的应用，它允许你通过鼠标指针的移动来改变频率和音量。另外，鼠标移动过程还有迷幻光彩的视觉效果。(<a href="https://github.com/mdn/violent-theremin" rel="nofollow noreferrer" target="_blank">Violent Theremin的源码在这里</a>)</p>
<p><span class="img-wrap"><img data-src="/img/bVx7zO" src="https://static.alili.tech/img/bVx7zO" alt="violent-theremin.png" title="violent-theremin.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">基本思路</h2>
<p>备注：下面列举的大多数的代码片段都在<a href="https://github.com/mdn/violent-theremin" rel="nofollow noreferrer" target="_blank">Violent Theremin</a>中有使用。</p>
<p>Web Audio API的架构设计使得它能够轻松实现模块路由，其中包括对上下文中的音频内容的操作。基本的音频编辑可以使用audio node进行。但这些节点相互可以连接起来，可以构成一个节点图。多个音源或者不同种类的频道最终都可以对应到一个上下文中。这样模块化的设计是为了提供足够灵活的特性以便开发可以动态改变效果的复杂的音频编辑功能。</p>
<p>audio node有入口和出口，多个节点构成类似链表一样的结构。从一个或者多个音源出发，经过一个或者多个处理节点，最终输出到输出节点（输出终端，一般是扬声器）。（如果有需求的话，也可以不指定输出节点。例如，想把音频数据用图表的形式展现的场合等。）web audio的一个简单的典型的流程类是下面这样子：</p>
<ol>
<li><p>创建AudioContext对象</p></li>
<li><p>在AudioContext对象内设置音源，例如&lt;audio&gt;标签，震动发声器，音频流</p></li>
<li><p>创建effect node（效果节点）。例如reverb, biquad filter, panner, compressor（这些都是音频特效）</p></li>
<li><p>选择音频的最终输出节点。例如，你的电脑的扬声器</p></li>
<li><p>音频经过效果节点处理后，然后输出到下一个节点，这些节点连接起来</p></li>
</ol>
<h3 id="articleHeader4">创建AudioContext对象</h3>
<p>首先，为了构建audio节点图，我们首先要创建创建AudioContext对象。最简单的方法就像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var audioCtx = new AudioContext();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> audioCtx = <span class="hljs-keyword">new</span> AudioContext();</code></pre>
<p>备注：虽然可以在一个document中创建多个AudioContext对象，但这恐怕没什么卵用。</p>
<p>但是，Webkit/Blink内核的浏览器不需要前缀，Firefox(desktop/mobile/OS)的浏览器可能需要前缀，所以为了兼容性考虑，最好写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var audioCtx = new (window.AudioContext || window.webkitAudioContext)();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> audioCtx = <span class="hljs-keyword">new</span> (<span class="hljs-built_in">window</span>.AudioContext || <span class="hljs-built_in">window</span>.webkitAudioContext)();</code></pre>
<h3 id="articleHeader5">创建AudioSource</h3>
<p>通过创建的AudioContext对象的方法，我们可以进行各种各样的操作。最初进行的就是，准备要播放的音源。下面列出的东西都可以作为音源：</p>
<ul>
<li><p>使用震动发声器与JavaScript创建音源的情况：使用<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createOscillator" rel="nofollow noreferrer" target="_blank">AudioContext.createOscillator</a>这个方法创建<a href="https://developer.mozilla.org/ja/docs/Web/API/OscillatorNode" rel="nofollow noreferrer" target="_blank">OscillatorNode</a>。之后就可以利用震动发声器做音源了。</p></li>
<li><p>使用原始的PCM数据的情况：如果是可以识别的特定的格式的话（mp3之类的），使用AudioContext的特定的decode方法，来获得PCM数据。详细情况可以看这些，<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createBuffer" rel="nofollow noreferrer" target="_blank">AudioContext.createBuffer()</a>、<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createBufferSource" rel="nofollow noreferrer" target="_blank">AudioContext.createBufferSource()</a>、<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/decodeAudioData" rel="nofollow noreferrer" target="_blank">AudioContext.decodeAudioData()</a> 。</p></li>
<li><p>使用&lt;video&gt;标签或者&lt;audio&gt;标签等HTML元素的情况：具体情况可以看这个，<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createMediaElementSource" rel="nofollow noreferrer" target="_blank">AudioContext.createMediaElementSource()</a></p></li>
<li><p>从<a href="https://developer.mozilla.org/en-US/docs/WebRTC" rel="nofollow noreferrer" target="_blank">WebRTC</a> <a href="https://developer.mozilla.org/ja/docs/Web/API/MediaStream" rel="nofollow noreferrer" target="_blank">MediaStream</a>（WebRTC媒体流）输入音频源的情况：可以使用麦克风或者Web摄像头。具体情况看这个，<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createMediaStreamSource" rel="nofollow noreferrer" target="_blank">AudioContext.createMediaStreamSource()</a></p></li>
</ul>
<p>简单地把震动发声器作为音源，使用gain节点控制音量，这就构成我我们接下来要说的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">oscillator = audioCtx.createOscillator();
<span class="hljs-keyword">var</span> gainNode = audioCtx.createGain();</code></pre>
<p>备注：如果要播放音乐文件（mp3之类的），一般要利用XHR载入文件数据，那之后创建BufferSource。在这个示例<a href="https://github.com/mdn/voice-change-o-matic" rel="nofollow noreferrer" target="_blank">Voice-change-O-matic</a>有代码。</p>
<p>备注：Scott Michaud封装了载入和解码音频的代码，开源了一个库，叫<a href="https://github.com/ScottMichaud/AudioSampleLoader" rel="nofollow noreferrer" target="_blank">AudioSampleLoader</a>。使用这个的话，XHR以及buffer的操作都会变得异常简单。</p>
<h3 id="articleHeader6">输入与输出的连接</h3>
<p>要想音源（输入）通过扬声器（输出）播放出来，就必须要把两者连接起来。将被连接的节点作为参数，调用原来节点的的connect方法就可以建立节点间的连接。大多数类型的节点对象都拥有这个方法。</p>
<p>关于标准的输出节点可以参考，<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/destination" rel="nofollow noreferrer" target="_blank">AudioContext.destination</a>。标准的输出节点通常是设备的扬声器。把oscillator连接到gainNode上，gainNode的输出连接到标准输出上，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);</code></pre>
<p>但如果像<a href="http://mdn.github.io/voice-change-o-matic/" rel="nofollow noreferrer" target="_blank">Voice-change-O-matic</a>一样，比较复杂的情况的话。需要像下面一样将多个节点连接起来，形成一张图。：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
biquadFilter.connect(convolver);
convolver.connect(gainNode);
gainNode.connect(audioCtx.destination);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">source = audioCtx.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
biquadFilter.connect(convolver);
convolver.connect(gainNode);
gainNode.connect(audioCtx.destination);</code></pre>
<p>上面的代码创建出的audio图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVx9Pr?w=232&amp;h=563" src="https://static.alili.tech/img/bVx9Pr?w=232&amp;h=563" alt="voice-change-o-matic-graph.png" title="voice-change-o-matic-graph.png" style="cursor: pointer; display: inline;"></span></p>
<p>多个节点可以同时连接同一个节点。也可以让多个音源通过一个效果节点，达到混音的效果。</p>
<p>备注：Firefox 32 以上版本，在Firefox开发工具中Web Audio编辑器了。有了它之后大大提高了对audio节点图进行debug的效率。</p>
<h3 id="articleHeader7">播放与音调的设定</h3>
<p>创建完audio节点图后，就可以通过设定audio节点的属性值或者调用方法来调整节点的效果。下面的例子，我们来设定下震动发声器的音调，使用Hz这个单位，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="oscillator.type = 0; // sine wave，正弦波
oscillator.frequency.value = 2500; // value in hertz
oscillator.start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">oscillator.type = <span class="hljs-number">0</span>; <span class="hljs-comment">// sine wave，正弦波</span>
oscillator.frequency.value = <span class="hljs-number">2500</span>; <span class="hljs-comment">// value in hertz</span>
oscillator.start();</code></pre>
<p>在Violent Theremin这个程序中，设定了音量与周波数的最大值，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var maxFreq = 6000;
var maxVol = 1;

var initialFreq = 3000;
var initialVol = 0.5;

// set options for the oscillator

oscillator.type = 0; // sine wave
oscillator.frequency.value = initialFreq; // value in hertz
oscillator.start();

gainNode.gain.value = initialVol;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> WIDTH = <span class="hljs-built_in">window</span>.innerWidth;
<span class="hljs-keyword">var</span> HEIGHT = <span class="hljs-built_in">window</span>.innerHeight;

<span class="hljs-keyword">var</span> maxFreq = <span class="hljs-number">6000</span>;
<span class="hljs-keyword">var</span> maxVol = <span class="hljs-number">1</span>;

<span class="hljs-keyword">var</span> initialFreq = <span class="hljs-number">3000</span>;
<span class="hljs-keyword">var</span> initialVol = <span class="hljs-number">0.5</span>;

<span class="hljs-comment">// set options for the oscillator</span>

oscillator.type = <span class="hljs-number">0</span>; <span class="hljs-comment">// sine wave</span>
oscillator.frequency.value = initialFreq; <span class="hljs-comment">// value in hertz</span>
oscillator.start();

gainNode.gain.value = initialVol;</code></pre>
<p>加下来是随着鼠标的移动，按照设定改变周波数。鼠标指针的X坐标和Y坐标以及周波数和音量的最大值，这些决定了最终输出声音的周波数和音量。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Mouse pointer coordinates

var CurX;
var CurY;

// Get new mouse pointer coordinates when mouse is moved
// then set new gain and putch values

document.onmousemove = updatePage;

function updatePage(e) {   
    CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
    CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
    
    oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
    gainNode.gain.value = (CurY/HEIGHT) * maxVol;

    canvasDraw();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Mouse pointer coordinates</span>

<span class="hljs-keyword">var</span> CurX;
<span class="hljs-keyword">var</span> CurY;

<span class="hljs-comment">// Get new mouse pointer coordinates when mouse is moved</span>
<span class="hljs-comment">// then set new gain and putch values</span>

<span class="hljs-built_in">document</span>.onmousemove = updatePage;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updatePage</span>(<span class="hljs-params">e</span>) </span>{   
    CurX = (<span class="hljs-built_in">window</span>.Event) ? e.pageX : event.clientX + (<span class="hljs-built_in">document</span>.documentElement.scrollLeft ? <span class="hljs-built_in">document</span>.documentElement.scrollLeft : <span class="hljs-built_in">document</span>.body.scrollLeft);
    CurY = (<span class="hljs-built_in">window</span>.Event) ? e.pageY : event.clientY + (<span class="hljs-built_in">document</span>.documentElement.scrollTop ? <span class="hljs-built_in">document</span>.documentElement.scrollTop : <span class="hljs-built_in">document</span>.body.scrollTop);
    
    oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
    gainNode.gain.value = (CurY/HEIGHT) * maxVol;

    canvasDraw();
}</code></pre>
<h3 id="articleHeader8">利用Canvas实现简单的可视化效果</h3>
<p>canvasDraw()是一个每次鼠标移动都会调用的方法。每次调用这个方法，都会在鼠标指针位置所在的地方，把输出音频的周波数和音量用不同大小和不同颜色表现（画）出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function random(number1,number2) {
  var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  return randomNo;
}

var canvas = document.querySelector('.canvas');
canvas.width = WIDTH;
canvas.height = HEIGHT;

var canvasCtx = canvas.getContext('2d');

function canvasDraw() {
  rX = CurX;
  rY = CurY;
  rC = Math.floor((gainNode.gain.value/maxVol)*30);
 
  canvasCtx.globalAlpha = 0.2;
 
  for(i=1;i<=15;i=i+2) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
    canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
    canvasCtx.fill();
    canvasCtx.closePath();     
  }    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">random</span>(<span class="hljs-params">number1,number2</span>) </span>{
  <span class="hljs-keyword">var</span> randomNo = number1 + (<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (number2 - number1)) + <span class="hljs-number">1</span>);
  <span class="hljs-keyword">return</span> randomNo;
}

<span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.canvas'</span>);
canvas.width = WIDTH;
canvas.height = HEIGHT;

<span class="hljs-keyword">var</span> canvasCtx = canvas.getContext(<span class="hljs-string">'2d'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">canvasDraw</span>(<span class="hljs-params"></span>) </span>{
  rX = CurX;
  rY = CurY;
  rC = <span class="hljs-built_in">Math</span>.floor((gainNode.gain.value/maxVol)*<span class="hljs-number">30</span>);
 
  canvasCtx.globalAlpha = <span class="hljs-number">0.2</span>;
 
  <span class="hljs-keyword">for</span>(i=<span class="hljs-number">1</span>;i&lt;=<span class="hljs-number">15</span>;i=i+<span class="hljs-number">2</span>) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = <span class="hljs-string">'rgb('</span> + <span class="hljs-number">100</span>+(i*<span class="hljs-number">10</span>) + <span class="hljs-string">','</span> + <span class="hljs-built_in">Math</span>.floor((gainNode.gain.value/maxVol)*<span class="hljs-number">255</span>) + <span class="hljs-string">','</span> + <span class="hljs-built_in">Math</span>.floor((oscillator.frequency.value/maxFreq)*<span class="hljs-number">255</span>) + <span class="hljs-string">')'</span>;
    canvasCtx.arc(rX+random(<span class="hljs-number">0</span>,<span class="hljs-number">50</span>),rY+random(<span class="hljs-number">0</span>,<span class="hljs-number">50</span>),rC/<span class="hljs-number">2</span>+i,(<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">180</span>)*<span class="hljs-number">0</span>,(<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">180</span>)*<span class="hljs-number">360</span>,<span class="hljs-literal">false</span>);
    canvasCtx.fill();
    canvasCtx.closePath();     
  }    
}</code></pre>
<h3 id="articleHeader9">静音</h3>
<p>按下静音按钮后，会执行下面的函数。通过把Gain节点与前面连接的节点切断，使得声音的输出消失。再按一次按钮，就会恢复节点之间的连接，使得声音恢复输出。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mute = document.querySelector('.mute');

mute.onclick = function() {
  if(mute.id == &quot;&quot;) {
    gainNode.disconnect(audioCtx.destination);
    mute.id = &quot;activated&quot;;
    mute.innerHTML = &quot;Unmute&quot;;
  } else {
    gainNode.connect(audioCtx.destination);
    mute.id = &quot;&quot;;    
    mute.innerHTML = &quot;Mute&quot;;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mute = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.mute'</span>);

mute.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span>(mute.id == <span class="hljs-string">""</span>) {
    gainNode.disconnect(audioCtx.destination);
    mute.id = <span class="hljs-string">"activated"</span>;
    mute.innerHTML = <span class="hljs-string">"Unmute"</span>;
  } <span class="hljs-keyword">else</span> {
    gainNode.connect(audioCtx.destination);
    mute.id = <span class="hljs-string">""</span>;    
    mute.innerHTML = <span class="hljs-string">"Mute"</span>;
  }
}</code></pre>
<h2 id="articleHeader10">其他的节点</h2>
<p>在 Web Audio API中其他还有很多的种类的节点可以使用。创建节点、节点与节点之间连接起来，形成节点图，之后通过属性和方法来改变声音。从这些点来看，所以节点的使用方式都差不多。</p>
<p>下面，我们概要地看一下几个节点。各个节点的详细情况可以在<a href="https://developer.mozilla.org/ja/docs/Web/API/Web_Audio_API" rel="nofollow noreferrer" target="_blank">Web_Audio_API</a>中看。</p>
<h3 id="articleHeader11">Wave shaper 节点</h3>
<p>通过AudioContext.createWaveShaper这个方法，可以创建WaveShaper节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var distortion = audioCtx.createWaveShaper();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> distortion = audioCtx.createWaveShaper();</code></pre>
<p>要想让这个对象工作，必须给予与决定波形的函数。通过将这个函数应用于输入的波形，WaveShaper节点可以扭曲声音。对新手来说，一开始写出这个函数是很困难的吧。通过在网络上搜索，选用合适的方案就好了。下面是一个发布在Stack Overflow上的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeDistortionCurve</span>(<span class="hljs-params">amount</span>) </span>{
  <span class="hljs-keyword">var</span> k = <span class="hljs-keyword">typeof</span> amount === <span class="hljs-string">'number'</span> ? amount : <span class="hljs-number">50</span>,
    n_samples = <span class="hljs-number">44100</span>,
    curve = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Float32Array</span>(n_samples),
    deg = <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">180</span>,
    i = <span class="hljs-number">0</span>,
    x;
  <span class="hljs-keyword">for</span> ( ; i &lt; n_samples; ++i ) {
    x = i * <span class="hljs-number">2</span> / n_samples - <span class="hljs-number">1</span>;
    curve[i] = ( <span class="hljs-number">3</span> + k ) * x * <span class="hljs-number">20</span> * deg / ( <span class="hljs-built_in">Math</span>.PI + k * <span class="hljs-built_in">Math</span>.abs(x) );
  }
  <span class="hljs-keyword">return</span> curve;
};</code></pre>
<p>在Voice-Change-O-Metic这个例子中，创建了一个叫做distortion的WaveShaper节点，提供了必要的音频扭曲效果。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);

...

distortion.curve = makeDistortionCurve(400);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);

...

distortion.curve = makeDistortionCurve(<span class="hljs-number">400</span>);</code></pre>
<h3 id="articleHeader12">双二阶过滤器</h3>
<p>双二阶过滤器的内部有多个配置项目。可以通过<a href="https://developer.mozilla.org/ja/docs/Web/API/AudioContext/createBiquadFilter" rel="nofollow noreferrer" target="_blank">AudioContext.createBiquadFilter</a>这个方法创建。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var biquadFilter = audioCtx.createBiquadFilter();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> biquadFilter = audioCtx.createBiquadFilter();</code></pre>
<p>在Voice-Change-o-Metic这个例子中，使用的是典型的lowshelf 过滤器。这是为了提供一个基本的低音増幅效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="biquadFilter.type = &quot;lowshelf&quot;;
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">biquadFilter.type = <span class="hljs-string">"lowshelf"</span>;
biquadFilter.frequency.value = <span class="hljs-number">1000</span>;
biquadFilter.gain.value = <span class="hljs-number">25</span>;</code></pre>
<p>在这个例子中可以设定过滤器的种类，周波数，甚至gain的值。如果是lowshelf过滤器的话，可以提供一个比指定周波数低25dB的低音増幅。</p>
<h3 id="articleHeader13">关于其他的Web Audio API的内容</h3>
<p>使用Web Audio API的话，可以做到音频的可视化与立体化（例如音频平移等）。关于这些，我们在其他的文档中说明。</p>
<h2 id="articleHeader14">后记</h2>
<p>终于完了。</p>
<p>翻译技术文章远比想象的要困难，特别是遇到很多陌生的某个领域下的专有词汇。</p>
<p>日语真是神奇，很多硬是用片假名套英文的情况，呵呵呵，让我想起了，特律风。</p>
<p>文中不免有错的地方，希望大家能指出来，帮助文章更好，谢谢。</p>
<p>感谢，@说说说说</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
努力翻译一篇中文最友好的，Web Audio API的使用相关的文章

## 原文链接
[https://segmentfault.com/a/1190000005715615](https://segmentfault.com/a/1190000005715615)

