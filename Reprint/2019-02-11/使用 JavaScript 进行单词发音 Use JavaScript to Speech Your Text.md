---
title: '使用 JavaScript 进行单词发音 Use JavaScript to Speech Your Text' 
date: 2019-02-11 2:30:49
hidden: true
slug: u1i0ntr8e3j
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVuZqk" src="https://static.alili.tech/img/bVuZqk" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在w3c草案中增加了对<a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html" rel="nofollow noreferrer" target="_blank">Web Speech Api</a>的支持;主要作用在<br>两个非常重要的方面:</p>
<ul>
<li><p><a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#speechreco-section" rel="nofollow noreferrer" target="_blank">语音识别</a> (将所说的转换成文本文字 / speech to text);</p></li>
<li><p><a href="https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section" rel="nofollow noreferrer" target="_blank">语音合成</a> (将文本文字读出来 / text to speech);</p></li>
</ul>
<p>而chrome在版本33发布后宣布对该特性的支持;今天重要介绍第二部分。</p>
<p><a href="http://events.jackpu.com/text-to-speech/demo.html" rel="nofollow noreferrer" target="_blank">演示地址</a></p>
<p><a href="https://github.com/JackPu/text-to-speech" rel="nofollow noreferrer" target="_blank">文档和演示代码</a></p>
<h3 id="articleHeader0">开始使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 你可以直接打开你的控制台粘贴下面代码
var words = new SpeechSynthesisUtterance('Hello captain');
window.speechSynthesis.speak(words);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 你可以直接打开你的控制台粘贴下面代码</span>
<span class="hljs-keyword">var</span> words = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance(<span class="hljs-string">'Hello captain'</span>);
<span class="hljs-built_in">window</span>.speechSynthesis.speak(words);</code></pre>
<p>当然你还可以修改很多参数去调整你的发音:</p>
<ul>
<li><p><code>volume</code>:声音;</p></li>
<li><p><code>rate</code>:发音速度;</p></li>
<li><p><code>pitch</code>:音调;</p></li>
<li><p><code>voice</code>:声音;</p></li>
<li><p><code>language</code>:语言(en,zh,ja...<a href="http://www.mathguide.de/info/tools/languagecode.html" rel="nofollow noreferrer" target="_blank">更多参考</a>)</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var msg = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
msg.voice = voices[10]; // 
msg.voiceURI = 'native';
msg.volume = 1; // 0 to 1
msg.rate = 1; // 0.1 to 10
msg.pitch = 2; //0 to 2
msg.text = 'I am Stark';
msg.lang = 'en';

msg.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

speechSynthesis.speak(msg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance();
<span class="hljs-keyword">var</span> voices = <span class="hljs-built_in">window</span>.speechSynthesis.getVoices();
msg.voice = voices[<span class="hljs-number">10</span>]; <span class="hljs-comment">// </span>
msg.voiceURI = <span class="hljs-string">'native'</span>;
msg.volume = <span class="hljs-number">1</span>; <span class="hljs-comment">// 0 to 1</span>
msg.rate = <span class="hljs-number">1</span>; <span class="hljs-comment">// 0.1 to 10</span>
msg.pitch = <span class="hljs-number">2</span>; <span class="hljs-comment">//0 to 2</span>
msg.text = <span class="hljs-string">'I am Stark'</span>;
msg.lang = <span class="hljs-string">'en'</span>;

msg.onend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Finished in '</span> + event.elapsedTime + <span class="hljs-string">' seconds.'</span>);
};

speechSynthesis.speak(msg);</code></pre>
<h4>设置发音</h4>
<p>你可以通过下面函数获取可以使用的发音列表名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? '(default)' :'');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">speechSynthesis.getVoices().forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">voice</span>) </span>{
  <span class="hljs-built_in">console</span>.log(voice.name, voice.default ? <span class="hljs-string">'(default)'</span> :<span class="hljs-string">''</span>);
});</code></pre>
<p>大概你可以获取下面的一个列表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 省略一部分结果
Google Deutsch 
Google US English 
Google UK English Female 
Google UK English Male 
Google 日本語 
Google&nbsp;普通话（中国大陆）  
Google 國語（臺灣） " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 省略一部分结果</span>
Google Deutsch 
Google US English 
Google UK English Female 
Google UK English Male 
Google 日本語 
Google&nbsp;普通话（中国大陆）  
Google 國語（臺灣） </code></pre>
<p>接下来我们可以试验下改变发音名称</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var msg = new SpeechSynthesisUtterance('hey captain,sometime I just want to break you perfect teeth');
msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google US English'; })[0];
speechSynthesis.speak(msg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance(<span class="hljs-string">'hey captain,sometime I just want to break you perfect teeth'</span>);
msg.voice = speechSynthesis.getVoices().filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">voice</span>) </span>{ <span class="hljs-keyword">return</span> voice.name == <span class="hljs-string">'Google US English'</span>; })[<span class="hljs-number">0</span>];
speechSynthesis.speak(msg);</code></pre>
<p>除了英文，我们还可以使用其他语言</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用日语
var msg = new SpeechSynthesisUtterance('おはようございます');
msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google 日本語'; })[0];
speechSynthesis.speak(msg);
// or 使用中文
var msg = new SpeechSynthesisUtterance('美国队长3');
msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == 'Google&nbsp;普通话（中国大陆）'; })[0];
speechSynthesis.speak(msg);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JS"><span class="hljs-comment">// 使用日语</span>
<span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance(<span class="hljs-string">'おはようございます'</span>);
msg.voice = speechSynthesis.getVoices().filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">voice</span>) </span>{ <span class="hljs-keyword">return</span> voice.name == <span class="hljs-string">'Google 日本語'</span>; })[<span class="hljs-number">0</span>];
speechSynthesis.speak(msg);
<span class="hljs-comment">// or 使用中文</span>
<span class="hljs-keyword">var</span> msg = <span class="hljs-keyword">new</span> SpeechSynthesisUtterance(<span class="hljs-string">'美国队长3'</span>);
msg.voice = speechSynthesis.getVoices().filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">voice</span>) </span>{ <span class="hljs-keyword">return</span> voice.name == <span class="hljs-string">'Google&nbsp;普通话（中国大陆）'</span>; })[<span class="hljs-number">0</span>];
speechSynthesis.speak(msg);</code></pre>
<h3 id="articleHeader1">浏览器支持</h3>
<ul>
<li><p>Chrome 33+</p></li>
<li><p>iOS7 safari部分支持 (测试iOS8支持,iOS9不支持)</p></li>
</ul>
<p>兼容性检测</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('speechSynthesis' in window) {
 // Synthesis support. Make your web apps talk!
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (<span class="hljs-string">'speechSynthesis'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) {
 <span class="hljs-comment">// Synthesis support. Make your web apps talk!</span>
}
</code></pre>
<p>如果对于不支持的浏览器，我们可以使用老的方法，即将需要发音的单词发送到服务端进行处理，返回一个音频，类似如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用来自谷歌翻译的音频
var audio = new Audio();
audio.src ='http://translate.google.com/translate_tts?ie=utf-8&amp;tl=en&amp;q=' + encodeURI('hello captain');
audio.play();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用来自谷歌翻译的音频</span>
<span class="hljs-keyword">var</span> audio = <span class="hljs-keyword">new</span> Audio();
audio.src =<span class="hljs-string">'http://translate.google.com/translate_tts?ie=utf-8&amp;tl=en&amp;q='</span> + <span class="hljs-built_in">encodeURI</span>(<span class="hljs-string">'hello captain'</span>);
audio.play();</code></pre>
<h3 id="articleHeader2">推荐框架</h3>
<p>当然我们如果追求快速开发的话，我们现在依旧有成熟的框架来支持这个功能，让他实现更多浏览器的支持。</p>
<ul>
<li><p><a href="http://responsivevoice.org/" rel="nofollow noreferrer" target="_blank">ResponsiveVoice.JS</a> 是一款基于html5的跨平台的发音支持类库，支持超过56种语言和168种<br>声音，分为免费版和商业版。<a href="http://events.jackpu.com/text-to-speech/" rel="nofollow noreferrer" target="_blank">Demo</a></p></li>
<li><p><a href="https://github.com/kripken/speak.js/" rel="nofollow noreferrer" target="_blank">speak.js</a> 基于eSpeack改造而来的一款js单词拼读类库.</p></li>
<li><p><a href="http://www.masswerk.at/mespeak/" rel="nofollow noreferrer" target="_blank">meSpeak.js </a>是一个100%的客户端发音类库，支持chrome和safari，并且无需要任何html元素；</p></li>
<li><p><a href="https://github.com/marak/say.js/" rel="nofollow noreferrer" target="_blank">say.js</a>一款基于node.js的发音扩展类库。</p></li>
</ul>
<p>持续更新中...</p>
<h3 id="articleHeader3">参考</h3>
<ol>
<li><p><a href="https://developers.google.com/web/updates/2014/01/Web-apps-that-talk-Introduction-to-the-Speech-Synthesis-API?hl=en" rel="nofollow noreferrer" target="_blank">Web apps that talk - Introduction to the Speech SynthesisAPI</a></p></li>
<li><p><a href="http://stackoverflow.com/questions/15653145/using-google-text-to-speech-in-javascript" rel="nofollow noreferrer" target="_blank">using-google-text-to-speech-in-javascript</a></p></li>
<li><p><a href="https://www.youtube.com/watch?time_continue=1695&amp;v=N_wTBKMuJis" rel="nofollow noreferrer" target="_blank">A More Awesome Web: Features You've Always Wanted - Google I/O 2013</a></p></li>
<li><p><a href="https://lists.w3.org/Archives/Public/public-xg-htmlspeech/2011Nov/att-0008/web-speech-sample-code.html" rel="nofollow noreferrer" target="_blank">HTML Speech API Examples</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 JavaScript 进行单词发音 Use JavaScript to Speech Your Text

## 原文链接
[https://segmentfault.com/a/1190000004963610](https://segmentfault.com/a/1190000004963610)

