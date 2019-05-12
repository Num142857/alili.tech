---
title: '小demo原生js同步翻译，可以玩玩儿' 
date: 2019-01-10 2:30:08
hidden: true
slug: 3epea21zwvm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>1. 背景：</strong></h2>
<p>平时不知道用js写什么练手，这里就写了一个类似百度翻译的小demo。大家可以平时没事儿了看看书，写写像这种类型的小demo,调用以下公开的api即可。对于学生党，能进入学校实验室做项目更好。进不去的，平时写写小demo练练也不差。(我为什么没在实验室)</p>
<h2 id="articleHeader1"><strong>2. demo前准备工作：</strong></h2>
<ol>
<li><p>页面布局</p></li>
<li><p>了解百度翻译API，所需配置参数</p></li>
<li><p>准备 MD5.js 加密算法函数（百度自己搜）</p></li>
<li><p>写js代码</p></li>
</ol>
<h2 id="articleHeader2"><strong>3. 步骤：</strong></h2>
<p><strong>1. 页面布局：</strong><br>  布局就不说了，直接贴图上代码：</p>
<p><span class="img-wrap"><img data-src="/img/bVP1C3?w=1047&amp;h=532" src="https://static.alili.tech/img/bVP1C3?w=1047&amp;h=532" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>可进行语言切换</p>
<p><span class="img-wrap"><img data-src="/img/bVP1Dg?w=1012&amp;h=495" src="https://static.alili.tech/img/bVP1Dg?w=1012&amp;h=495" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>html代码</strong>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title></title>
  <link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;css/style.css&quot;>
</head>
<body>
  <div id=&quot;main&quot;>
    <div class=&quot;left&quot;>
      <div class=&quot;title&quot;>
        要翻译为：
        <span class=&quot;lang&quot;>英文</span>
        <ul class=&quot;ul1&quot;>
          <li data-lang=&quot;en&quot;>英语</li>
          <li data-lang=&quot;zh&quot;>中文</li>
          <li data-lang=&quot;jp&quot;>日语</li>
          <li data-lang=&quot;kor&quot;>韩语</li>
          <li data-lang=&quot;fra&quot;>法语</li>
          <li data-lang=&quot;ru&quot;>俄语</li>
          <li data-lang=&quot;de&quot;>德语</li>
        </ul>
      </div>
      <textarea class=&quot;text&quot; placeholder=&quot;要翻译的单词/句子&quot; value=&quot;&quot;></textarea>
    </div>
    <div class=&quot;right&quot;>
      <div class=&quot;title&quot;>翻译结果：</div>
      <div class=&quot;cont&quot;></div>
    </div>
    <div class=&quot;bottom&quot;>
      <button class=&quot;reset&quot;>清除</button>
      <button class=&quot;trans&quot;>翻译</button>
    </div>
  </div>
  <script src=&quot;js/MD5.js&quot;></script>
  <script src=&quot;js/script.js&quot;></script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/style.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"main"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>
        要翻译为：
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"lang"</span>&gt;</span>英文<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ul1"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"en"</span>&gt;</span>英语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"zh"</span>&gt;</span>中文<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"jp"</span>&gt;</span>日语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"kor"</span>&gt;</span>韩语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"fra"</span>&gt;</span>法语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"ru"</span>&gt;</span>俄语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">data-lang</span>=<span class="hljs-string">"de"</span>&gt;</span>德语<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"要翻译的单词/句子"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">""</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"title"</span>&gt;</span>翻译结果：<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cont"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bottom"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"reset"</span>&gt;</span>清除<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"trans"</span>&gt;</span>翻译<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/MD5.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/script.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><strong>css代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*{
  margin: 0;
  padding: 0;
  font-family: &quot;微软雅黑&quot;;
}
html,body {
  height: 100%;
}
li {
  list-style: none;
}
body {
  overflow: hidden;
}
#main {
  width: 1000px;
  height: 80%;
  margin: 5% auto;
}
#main .left {
  float: left;
  width: 350px;
  height:330px;
  margin: 50px 0 0 50px;
  background-color: #fff;
  border: 1px solid #000;
  box-sizing: border-box;
  color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
#main .right {
  float: right;
  width: 350px;
  height: 330px;
  margin: 50px 50px 0 0;
  background-color: #fff;
  box-sizing: border-box;
  border: 1px solid #000;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
#main .title {
  width: 100%;
  height: 40px;
  background-color: #333;
  line-height: 40px;
  text-indent: 20px;
  position: relative;
  color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
#main .lang {
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  letter-spacing: 2px;
  text-decoration: underline;
  color: #58a;
  cursor: pointer;
}
#main .lang:hover {
  text-decoration: none;
  color: #eee;
}
#main .text {
  width: 100%;
  height: 288px;
  padding: 20px;
  box-sizing: border-box;
  resize: none;
  outline: none;
  border: none;
}
#main .right .cont {
  width: 100%;
  height: 295px;
  padding: 20px;
  box-sizing: border-box;
}
#main .bottom {
  float: left;
  width: 100%;
  height: 40px;
  margin-top: 60px;
}
#main .bottom button {
  float: right;
  width: 65px;
  height: 35px;
  line-height: 35px;
  letter-spacing: 2px;
  border: none;
  margin-right: 50px;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  color: #eee;
  background-color: #333;
}
#main ul {
  width: 100%;
  padding: 20px 15px 0 20px;
  box-sizing: border-box;
  position: absolute;
  background: blue;
  background-color: #fff;
  border-bottom: 1px solid #333;
  display: none;
}
#main ul li {
  float:left;
  text-indent: 0;
  text-align: center;
  padding: 0 10px;
  margin: 0 10px;
  margin-bottom: 20px;
  border: 1px solid #000;
  border-radius: 5px;
  box-sizing: border-box;
  color: #333;
  cursor: pointer;
}
#main ul li:hover {
  background-color: #333;
  color: #fff;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>*{
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"微软雅黑"</span>;
}
<span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">list-style</span>: none;
}
<span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-id">#main</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">1000px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">80%</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">5%</span> auto;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.left</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">330px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.right</span> {
  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">350px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">330px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> <span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.title</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border-top-left-radius</span>: <span class="hljs-number">15px</span>;
  <span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.lang</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">text-decoration</span>: underline;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#58a</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.lang</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">text-decoration</span>: none;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#eee</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.text</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">288px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">resize</span>: none;
  <span class="hljs-attribute">outline</span>: none;
  <span class="hljs-attribute">border</span>: none;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.right</span> <span class="hljs-selector-class">.cont</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">295px</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.bottom</span> {
  <span class="hljs-attribute">float</span>: left;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">60px</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-class">.bottom</span> <span class="hljs-selector-tag">button</span> {
  <span class="hljs-attribute">float</span>: right;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">65px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">2px</span>;
  <span class="hljs-attribute">border</span>: none;
  <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">50px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">3px</span>;
  <span class="hljs-attribute">outline</span>: none;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#eee</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span> <span class="hljs-number">15px</span> <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">background</span>: blue;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">float</span>:left;
  <span class="hljs-attribute">text-indent</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#000</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
}
<span class="hljs-selector-id">#main</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:hover</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#333</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
</code></pre>
<p><strong>2，了解百度翻译API</strong><br>  这只只对所配置的参数做一介绍，官方API也有做解释：</p>
<p>进入百度翻译，左下角如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVP15A?w=491&amp;h=553" src="https://static.alili.tech/img/bVP15A?w=491&amp;h=553" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>点击百度翻译开放平台：</p>
<p><span class="img-wrap"><img data-src="/img/bVP15W?w=1307&amp;h=710" src="https://static.alili.tech/img/bVP15W?w=1307&amp;h=710" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>q是你要翻译的字符串</p></li>
<li><p>from是你在输入时的语言</p></li>
<li><p>to是你要翻译成什么语言</p></li>
<li><p>appid是你申请的百度翻译测试账号（注册后秒发）</p></li>
<li><p>salt是一个随机数，这里用事件表示</p></li>
<li><p>sign是对拼接的字符串的MD5加密，至于拼接的字符串其实就是： 待加密字符串 =      <br>  appid+q+salt+秘钥（申请账号时密码也会给你）   最后把 待价密 的字符串传入MD5函数，返回sign.</p></li>
</ul>
<p>完整流程如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVP1Wz?w=754&amp;h=501" src="https://static.alili.tech/img/bVP1Wz?w=754&amp;h=501" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3"><strong>3.准备MD5加密函数（可以百度自己搜，这里直接附代码）</strong></h2>
<p>MD5加密字符串：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX &amp; 0x80000000);
        lY8 = (lY &amp; 0x80000000);
        lX4 = (lX &amp; 0x40000000);
        lY4 = (lY &amp; 0x40000000);
        lResult = (lX &amp; 0x3FFFFFFF)+(lY &amp; 0x3FFFFFFF);
        if (lX4 &amp; lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult &amp; 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x,y,z) { return (x &amp; y) | ((~x) &amp; z); }
    function G(x,y,z) { return (x &amp; z) | (y &amp; (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue=&quot;&quot;,WordToHexValue_temp=&quot;&quot;,lByte,lCount;
        for (lCount = 0;lCount<=3;lCount++) {
            lByte = (lValue>>>(lCount*8)) &amp; 255;
            WordToHexValue_temp = &quot;0&quot; + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,&quot;\n&quot;);
        var utftext = &quot;&quot;;

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) &amp;&amp; (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c &amp; 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) &amp; 63) | 128);
                utftext += String.fromCharCode((c &amp; 63) | 128);
            }

        }

        return utftext;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k=0;k<x.length;k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>var MD5 = function (<span class="hljs-type">string</span>) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue&lt;&lt;iShiftBits) | (lValue&gt;&gt;&gt;(<span class="hljs-number">32</span>-iShiftBits));
    }

    function AddUnsigned(lX,lY) {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX &amp; <span class="hljs-number">0x80000000</span>);
        lY8 = (lY &amp; <span class="hljs-number">0x80000000</span>);
        lX4 = (lX &amp; <span class="hljs-number">0x40000000</span>);
        lY4 = (lY &amp; <span class="hljs-number">0x40000000</span>);
        lResult = (lX &amp; <span class="hljs-number">0x3FFFFFFF</span>)+(lY &amp; <span class="hljs-number">0x3FFFFFFF</span>);
        if (lX4 &amp; lY4) {
            return (lResult ^ <span class="hljs-number">0x80000000</span> ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult &amp; <span class="hljs-number">0x40000000</span>) {
                return (lResult ^ <span class="hljs-number">0xC0000000</span> ^ lX8 ^ lY8);
            } else {
                return (lResult ^ <span class="hljs-number">0x40000000</span> ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x,y,z) { return (x &amp; y) | ((~x) &amp; z); }
    function G(x,y,z) { return (x &amp; z) | (y &amp; (~z)); }
    function H(x,y,z) { return (x ^ y ^ z); }
    function I(x,y,z) { return (y ^ (x | (~z))); }

    function FF(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a,b,c,d,x,s,ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(<span class="hljs-type">string</span>) {
        var lWordCount;
        var lMessageLength = <span class="hljs-type">string</span>.length;
        var lNumberOfWords_temp1=lMessageLength + <span class="hljs-number">8</span>;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % <span class="hljs-number">64</span>))/<span class="hljs-number">64</span>;
        var lNumberOfWords = (lNumberOfWords_temp2+<span class="hljs-number">1</span>)*<span class="hljs-number">16</span>;
        var lWordArray=Array(lNumberOfWords<span class="hljs-number">-1</span>);
        var lBytePosition = <span class="hljs-number">0</span>;
        var lByteCount = <span class="hljs-number">0</span>;
        while ( lByteCount &lt; lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % <span class="hljs-number">4</span>))/<span class="hljs-number">4</span>;
            lBytePosition = (lByteCount % <span class="hljs-number">4</span>)*<span class="hljs-number">8</span>;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (<span class="hljs-type">string</span>.charCodeAt(lByteCount)&lt;&lt;lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % <span class="hljs-number">4</span>))/<span class="hljs-number">4</span>;
        lBytePosition = (lByteCount % <span class="hljs-number">4</span>)*<span class="hljs-number">8</span>;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (<span class="hljs-number">0x80</span>&lt;&lt;lBytePosition);
        lWordArray[lNumberOfWords<span class="hljs-number">-2</span>] = lMessageLength&lt;&lt;<span class="hljs-number">3</span>;
        lWordArray[lNumberOfWords<span class="hljs-number">-1</span>] = lMessageLength&gt;&gt;&gt;<span class="hljs-number">29</span>;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue=<span class="hljs-string">""</span>,WordToHexValue_temp=<span class="hljs-string">""</span>,lByte,lCount;
        for (lCount = <span class="hljs-number">0</span>;lCount&lt;=<span class="hljs-number">3</span>;lCount++) {
            lByte = (lValue&gt;&gt;&gt;(lCount*<span class="hljs-number">8</span>)) &amp; <span class="hljs-number">255</span>;
            WordToHexValue_temp = <span class="hljs-string">"0"</span> + lByte.toString(<span class="hljs-number">16</span>);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length<span class="hljs-number">-2</span>,<span class="hljs-number">2</span>);
        }
        return WordToHexValue;
    };

    function Utf8Encode(<span class="hljs-type">string</span>) {
        <span class="hljs-type">string</span> = <span class="hljs-type">string</span>.replace(/\r\n/g,<span class="hljs-string">"<span class="hljs-subst">\n</span>"</span>);
        var utftext = <span class="hljs-string">""</span>;

        for (var n = <span class="hljs-number">0</span>; n &lt; <span class="hljs-type">string</span>.length; n++) {

            var c = <span class="hljs-type">string</span>.charCodeAt(n);

            if (c &lt; <span class="hljs-number">128</span>) {
                utftext += String.fromCharCode(c);
            }
            else if((c &gt; <span class="hljs-number">127</span>) &amp;&amp; (c &lt; <span class="hljs-number">2048</span>)) {
                utftext += String.fromCharCode((c &gt;&gt; <span class="hljs-number">6</span>) | <span class="hljs-number">192</span>);
                utftext += String.fromCharCode((c &amp; <span class="hljs-number">63</span>) | <span class="hljs-number">128</span>);
            }
            else {
                utftext += String.fromCharCode((c &gt;&gt; <span class="hljs-number">12</span>) | <span class="hljs-number">224</span>);
                utftext += String.fromCharCode(((c &gt;&gt; <span class="hljs-number">6</span>) &amp; <span class="hljs-number">63</span>) | <span class="hljs-number">128</span>);
                utftext += String.fromCharCode((c &amp; <span class="hljs-number">63</span>) | <span class="hljs-number">128</span>);
            }

        }

        return utftext;
    };

    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=<span class="hljs-number">7</span>, S12=<span class="hljs-number">12</span>, S13=<span class="hljs-number">17</span>, S14=<span class="hljs-number">22</span>;
    var S21=<span class="hljs-number">5</span>, S22=<span class="hljs-number">9</span> , S23=<span class="hljs-number">14</span>, S24=<span class="hljs-number">20</span>;
    var S31=<span class="hljs-number">4</span>, S32=<span class="hljs-number">11</span>, S33=<span class="hljs-number">16</span>, S34=<span class="hljs-number">23</span>;
    var S41=<span class="hljs-number">6</span>, S42=<span class="hljs-number">10</span>, S43=<span class="hljs-number">15</span>, S44=<span class="hljs-number">21</span>;

    <span class="hljs-type">string</span> = Utf8Encode(<span class="hljs-type">string</span>);

    x = ConvertToWordArray(<span class="hljs-type">string</span>);

    a = <span class="hljs-number">0x67452301</span>; b = <span class="hljs-number">0xEFCDAB89</span>; c = <span class="hljs-number">0x98BADCFE</span>; d = <span class="hljs-number">0x10325476</span>;

    for (k=<span class="hljs-number">0</span>;k&lt;x.length;k+=<span class="hljs-number">16</span>) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+<span class="hljs-number">0</span>], S11,<span class="hljs-number">0xD76AA478</span>);
        d=FF(d,a,b,c,x[k+<span class="hljs-number">1</span>], S12,<span class="hljs-number">0xE8C7B756</span>);
        c=FF(c,d,a,b,x[k+<span class="hljs-number">2</span>], S13,<span class="hljs-number">0x242070DB</span>);
        b=FF(b,c,d,a,x[k+<span class="hljs-number">3</span>], S14,<span class="hljs-number">0xC1BDCEEE</span>);
        a=FF(a,b,c,d,x[k+<span class="hljs-number">4</span>], S11,<span class="hljs-number">0xF57C0FAF</span>);
        d=FF(d,a,b,c,x[k+<span class="hljs-number">5</span>], S12,<span class="hljs-number">0x4787C62A</span>);
        c=FF(c,d,a,b,x[k+<span class="hljs-number">6</span>], S13,<span class="hljs-number">0xA8304613</span>);
        b=FF(b,c,d,a,x[k+<span class="hljs-number">7</span>], S14,<span class="hljs-number">0xFD469501</span>);
        a=FF(a,b,c,d,x[k+<span class="hljs-number">8</span>], S11,<span class="hljs-number">0x698098D8</span>);
        d=FF(d,a,b,c,x[k+<span class="hljs-number">9</span>], S12,<span class="hljs-number">0x8B44F7AF</span>);
        c=FF(c,d,a,b,x[k+<span class="hljs-number">10</span>],S13,<span class="hljs-number">0xFFFF5BB1</span>);
        b=FF(b,c,d,a,x[k+<span class="hljs-number">11</span>],S14,<span class="hljs-number">0x895CD7BE</span>);
        a=FF(a,b,c,d,x[k+<span class="hljs-number">12</span>],S11,<span class="hljs-number">0x6B901122</span>);
        d=FF(d,a,b,c,x[k+<span class="hljs-number">13</span>],S12,<span class="hljs-number">0xFD987193</span>);
        c=FF(c,d,a,b,x[k+<span class="hljs-number">14</span>],S13,<span class="hljs-number">0xA679438E</span>);
        b=FF(b,c,d,a,x[k+<span class="hljs-number">15</span>],S14,<span class="hljs-number">0x49B40821</span>);
        a=GG(a,b,c,d,x[k+<span class="hljs-number">1</span>], S21,<span class="hljs-number">0xF61E2562</span>);
        d=GG(d,a,b,c,x[k+<span class="hljs-number">6</span>], S22,<span class="hljs-number">0xC040B340</span>);
        c=GG(c,d,a,b,x[k+<span class="hljs-number">11</span>],S23,<span class="hljs-number">0x265E5A51</span>);
        b=GG(b,c,d,a,x[k+<span class="hljs-number">0</span>], S24,<span class="hljs-number">0xE9B6C7AA</span>);
        a=GG(a,b,c,d,x[k+<span class="hljs-number">5</span>], S21,<span class="hljs-number">0xD62F105D</span>);
        d=GG(d,a,b,c,x[k+<span class="hljs-number">10</span>],S22,<span class="hljs-number">0x2441453</span>);
        c=GG(c,d,a,b,x[k+<span class="hljs-number">15</span>],S23,<span class="hljs-number">0xD8A1E681</span>);
        b=GG(b,c,d,a,x[k+<span class="hljs-number">4</span>], S24,<span class="hljs-number">0xE7D3FBC8</span>);
        a=GG(a,b,c,d,x[k+<span class="hljs-number">9</span>], S21,<span class="hljs-number">0x21E1CDE6</span>);
        d=GG(d,a,b,c,x[k+<span class="hljs-number">14</span>],S22,<span class="hljs-number">0xC33707D6</span>);
        c=GG(c,d,a,b,x[k+<span class="hljs-number">3</span>], S23,<span class="hljs-number">0xF4D50D87</span>);
        b=GG(b,c,d,a,x[k+<span class="hljs-number">8</span>], S24,<span class="hljs-number">0x455A14ED</span>);
        a=GG(a,b,c,d,x[k+<span class="hljs-number">13</span>],S21,<span class="hljs-number">0xA9E3E905</span>);
        d=GG(d,a,b,c,x[k+<span class="hljs-number">2</span>], S22,<span class="hljs-number">0xFCEFA3F8</span>);
        c=GG(c,d,a,b,x[k+<span class="hljs-number">7</span>], S23,<span class="hljs-number">0x676F02D9</span>);
        b=GG(b,c,d,a,x[k+<span class="hljs-number">12</span>],S24,<span class="hljs-number">0x8D2A4C8A</span>);
        a=HH(a,b,c,d,x[k+<span class="hljs-number">5</span>], S31,<span class="hljs-number">0xFFFA3942</span>);
        d=HH(d,a,b,c,x[k+<span class="hljs-number">8</span>], S32,<span class="hljs-number">0x8771F681</span>);
        c=HH(c,d,a,b,x[k+<span class="hljs-number">11</span>],S33,<span class="hljs-number">0x6D9D6122</span>);
        b=HH(b,c,d,a,x[k+<span class="hljs-number">14</span>],S34,<span class="hljs-number">0xFDE5380C</span>);
        a=HH(a,b,c,d,x[k+<span class="hljs-number">1</span>], S31,<span class="hljs-number">0xA4BEEA44</span>);
        d=HH(d,a,b,c,x[k+<span class="hljs-number">4</span>], S32,<span class="hljs-number">0x4BDECFA9</span>);
        c=HH(c,d,a,b,x[k+<span class="hljs-number">7</span>], S33,<span class="hljs-number">0xF6BB4B60</span>);
        b=HH(b,c,d,a,x[k+<span class="hljs-number">10</span>],S34,<span class="hljs-number">0xBEBFBC70</span>);
        a=HH(a,b,c,d,x[k+<span class="hljs-number">13</span>],S31,<span class="hljs-number">0x289B7EC6</span>);
        d=HH(d,a,b,c,x[k+<span class="hljs-number">0</span>], S32,<span class="hljs-number">0xEAA127FA</span>);
        c=HH(c,d,a,b,x[k+<span class="hljs-number">3</span>], S33,<span class="hljs-number">0xD4EF3085</span>);
        b=HH(b,c,d,a,x[k+<span class="hljs-number">6</span>], S34,<span class="hljs-number">0x4881D05</span>);
        a=HH(a,b,c,d,x[k+<span class="hljs-number">9</span>], S31,<span class="hljs-number">0xD9D4D039</span>);
        d=HH(d,a,b,c,x[k+<span class="hljs-number">12</span>],S32,<span class="hljs-number">0xE6DB99E5</span>);
        c=HH(c,d,a,b,x[k+<span class="hljs-number">15</span>],S33,<span class="hljs-number">0x1FA27CF8</span>);
        b=HH(b,c,d,a,x[k+<span class="hljs-number">2</span>], S34,<span class="hljs-number">0xC4AC5665</span>);
        a=II(a,b,c,d,x[k+<span class="hljs-number">0</span>], S41,<span class="hljs-number">0xF4292244</span>);
        d=II(d,a,b,c,x[k+<span class="hljs-number">7</span>], S42,<span class="hljs-number">0x432AFF97</span>);
        c=II(c,d,a,b,x[k+<span class="hljs-number">14</span>],S43,<span class="hljs-number">0xAB9423A7</span>);
        b=II(b,c,d,a,x[k+<span class="hljs-number">5</span>], S44,<span class="hljs-number">0xFC93A039</span>);
        a=II(a,b,c,d,x[k+<span class="hljs-number">12</span>],S41,<span class="hljs-number">0x655B59C3</span>);
        d=II(d,a,b,c,x[k+<span class="hljs-number">3</span>], S42,<span class="hljs-number">0x8F0CCC92</span>);
        c=II(c,d,a,b,x[k+<span class="hljs-number">10</span>],S43,<span class="hljs-number">0xFFEFF47D</span>);
        b=II(b,c,d,a,x[k+<span class="hljs-number">1</span>], S44,<span class="hljs-number">0x85845DD1</span>);
        a=II(a,b,c,d,x[k+<span class="hljs-number">8</span>], S41,<span class="hljs-number">0x6FA87E4F</span>);
        d=II(d,a,b,c,x[k+<span class="hljs-number">15</span>],S42,<span class="hljs-number">0xFE2CE6E0</span>);
        c=II(c,d,a,b,x[k+<span class="hljs-number">6</span>], S43,<span class="hljs-number">0xA3014314</span>);
        b=II(b,c,d,a,x[k+<span class="hljs-number">13</span>],S44,<span class="hljs-number">0x4E0811A1</span>);
        a=II(a,b,c,d,x[k+<span class="hljs-number">4</span>], S41,<span class="hljs-number">0xF7537E82</span>);
        d=II(d,a,b,c,x[k+<span class="hljs-number">11</span>],S42,<span class="hljs-number">0xBD3AF235</span>);
        c=II(c,d,a,b,x[k+<span class="hljs-number">2</span>], S43,<span class="hljs-number">0x2AD7D2BB</span>);
        b=II(b,c,d,a,x[k+<span class="hljs-number">9</span>], S44,<span class="hljs-number">0xEB86D391</span>);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
    }

    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

    return temp.toLowerCase();
}
</code></pre>
<p>加密：</p>
<p><span class="img-wrap"><img data-src="/img/bVP10e?w=1023&amp;h=330" src="https://static.alili.tech/img/bVP10e?w=1023&amp;h=330" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>发送请求时别忘了在参数最后面加上一个callback参数用来接收返回值</p>
<p><span class="img-wrap"><img data-src="/img/bVP10S?w=1040&amp;h=79" src="https://static.alili.tech/img/bVP10S?w=1040&amp;h=79" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>callback函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn(str) {
  var result = document.querySelector(&quot;.right .cont&quot;);
  result.innerHTML = str.trans_result[0].dst;
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">var</span> result = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".right .cont"</span>);
  result.innerHTML = str.trans_result[<span class="hljs-number">0</span>].dst;
}

</code></pre>
<h2 id="articleHeader4"><strong>4.写js</strong></h2>
<p>这里简单的逻辑就不说了，说说这里的接口请求的实现和实现实时翻译的逻辑（每输入一两个字就会主动给你翻译）。首先这个列子的核心就是jsonp的跨域请求原理很简单，就是每次请求都给他创建一个<code>&lt;script&gt;</code>标签插入<code>body</code>, 每次给标签的<code>src</code>传入不同的参数，待服务器给你返回数据，最终拿到数据渲染到页面。这里要提醒的是要给请求的参数最后面加上一个回调函数，返回过来的数据客户端可以从回调函数中拿取。其次就是实时翻译，原理就是在敲键盘时每次按键抬起时隔一定的时间去请求，那就是键盘事件加上<code>setInterval()</code>;每隔500ms去请求。</p>
<p>整个过程的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
  var title = document.querySelector(&quot;.left .title .lang&quot;),
      ul = document.querySelector(&quot;.ul1&quot;),
      lis = document.querySelectorAll(&quot;.ul1 li&quot;),
      text = document.querySelector(&quot;.left .text&quot;),
      result = document.querySelector(&quot;.right .cont&quot;),
      reset = document.querySelector(&quot;.bottom .reset&quot;),
      trans = document.querySelector(&quot;.bottom .trans&quot;),
      key = true,
      length = lis.length,
      lang = &quot;en&quot;,
      timer = null;

  function langShow() {
    if (key == true) {
      ul.style.display = &quot;block&quot;;
      key = false;
    } else {
      ul.style.display = &quot;none&quot;;
      key = true;
    }
  }

  function changeLang() {
    lang = this.getAttribute('data-lang');
    title.innerHTML = this.innerHTML;
    this.parentNode.style.display = &quot;none&quot;;
    key = true;
  }

  function createScript(src) {
    var script = document.createElement('script');
    script.id = &quot;script1&quot;
    script.src = src;
    document.body.appendChild(script);
  }

  function translate() {
    var value = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
    var date = Date.now();
    var str = '20170605000052254'+text.value+date+'63r1c42X7_buc4OrXm1g';
    var md5 = MD5(str);
    var data = 'q=' + text.value + '&amp;from=auto&amp;to=' + lang + '&amp;appid=20170605000052254' + '&amp;salt=' + date + '&amp;sign=' + md5 + &quot;&amp;callback=fn&quot;;
    var src = value + data;
    createScript(src);
  }

  function init() {

    title.onclick = langShow;

    for (var i = 0; i < length; i++) {
      lis[i].onclick = changeLang;
    }

    reset.onclick = function() {
      text.value = &quot;&quot;;
    }

    trans.onclick = function() {
      if (text.value == &quot;&quot;) {
        return;
      }
      var script = document.querySelector('#script1');
      if (script) {
        script.parentNode.removeChild(script);
        translate();
      } else {
        translate();
      } 
    }

    text.onkeydown = function() {
      clearTimeout(timer);
      timer = setInterval(function() {
        if (text.value == &quot;&quot;) {
          return;
        }
        var script = document.querySelector('#script1');
        if (script) {
          script.parentNode.removeChild(script);
          translate();
        } else {
          translate();
        } 
      }, 500);
      clearTimeout(timer);
    }
  }
  init(); 
})();
function fn(str) {
  var result = document.querySelector(&quot;.right .cont&quot;);
  result.innerHTML = str.trans_result[0].dst;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>() {
  var title = document.querySelector(<span class="hljs-string">".left .title .lang"</span>),
      ul = document.querySelector(<span class="hljs-string">".ul1"</span>),
      lis = document.querySelectorAll(<span class="hljs-string">".ul1 li"</span>),
      text = document.querySelector(<span class="hljs-string">".left .text"</span>),
      result = document.querySelector(<span class="hljs-string">".right .cont"</span>),
      reset = document.querySelector(<span class="hljs-string">".bottom .reset"</span>),
      trans = document.querySelector(<span class="hljs-string">".bottom .trans"</span>),
      key = <span class="hljs-literal">true</span>,
      length = lis.length,
      lang = <span class="hljs-string">"en"</span>,
      timer = null;

  function langShow() {
    if (<span class="hljs-name"><span class="hljs-builtin-name">key</span></span> == <span class="hljs-literal">true</span>) {
      ul.style.display = <span class="hljs-string">"block"</span><span class="hljs-comment">;</span>
      key = <span class="hljs-literal">false</span><span class="hljs-comment">;</span>
    } else {
      ul.style.display = <span class="hljs-string">"none"</span><span class="hljs-comment">;</span>
      key = <span class="hljs-literal">true</span><span class="hljs-comment">;</span>
    }
  }

  function changeLang() {
    lang = this.getAttribute(<span class="hljs-name">'data-lang'</span>)<span class="hljs-comment">;</span>
    title.innerHTML = this.innerHTML;
    this.parentNode.style.display = <span class="hljs-string">"none"</span><span class="hljs-comment">;</span>
    key = <span class="hljs-literal">true</span><span class="hljs-comment">;</span>
  }

  function createScript(<span class="hljs-name">src</span>) {
    var script = document.createElement(<span class="hljs-name">'script'</span>)<span class="hljs-comment">;</span>
    script.id = <span class="hljs-string">"script1"</span>
    script.src = src;
    document.body.appendChild(<span class="hljs-name">script</span>)<span class="hljs-comment">;</span>
  }

  function translate() {
    var value = 'http://api.fanyi.baidu.com/api/trans/vip/translate?';
    var date = Date.now()<span class="hljs-comment">;</span>
    var str = '20170605000052254'+text.value+date+'63r1c42X7_buc4OrXm1g';
    var md5 = MD5(<span class="hljs-name"><span class="hljs-builtin-name">str</span></span>)<span class="hljs-comment">;</span>
    var data = 'q=' + text.value + '&amp;from=auto&amp;to=' + lang + '&amp;appid=20170605000052254' + '&amp;salt=' + date + '&amp;sign=' + md5 + <span class="hljs-string">"&amp;callback=fn"</span><span class="hljs-comment">;</span>
    var src = value + data;
    createScript(<span class="hljs-name">src</span>)<span class="hljs-comment">;</span>
  }

  function init() {

    title.onclick = langShow;

    for (<span class="hljs-name"><span class="hljs-builtin-name">var</span></span> i = <span class="hljs-number">0</span><span class="hljs-comment">; i &lt; length; i++) {</span>
      lis[i].onclick = changeLang;
    }

    reset.onclick = function() {
      text.value = <span class="hljs-string">""</span><span class="hljs-comment">;</span>
    }

    trans.onclick = function() {
      if (<span class="hljs-name">text.value</span> == <span class="hljs-string">""</span>) {
        return;
      }
      var script = document.querySelector(<span class="hljs-name">'#script1'</span>)<span class="hljs-comment">;</span>
      if (<span class="hljs-name">script</span>) {
        script.parentNode.removeChild(<span class="hljs-name">script</span>)<span class="hljs-comment">;</span>
        translate()<span class="hljs-comment">;</span>
      } else {
        translate()<span class="hljs-comment">;</span>
      } 
    }

    text.onkeydown = function() {
      clearTimeout(<span class="hljs-name">timer</span>)<span class="hljs-comment">;</span>
      timer = setInterval(<span class="hljs-name">function</span>() {
        if (<span class="hljs-name">text.value</span> == <span class="hljs-string">""</span>) {
          return;
        }
        var script = document.querySelector(<span class="hljs-name">'#script1'</span>)<span class="hljs-comment">;</span>
        if (<span class="hljs-name">script</span>) {
          script.parentNode.removeChild(<span class="hljs-name">script</span>)<span class="hljs-comment">;</span>
          translate()<span class="hljs-comment">;</span>
        } else {
          translate()<span class="hljs-comment">;</span>
        } 
      }, <span class="hljs-number">500</span>)<span class="hljs-comment">;</span>
      clearTimeout(<span class="hljs-name">timer</span>)<span class="hljs-comment">;</span>
    }
  }
  init()<span class="hljs-comment">; </span>
})()<span class="hljs-comment">;</span>
function fn(<span class="hljs-name"><span class="hljs-builtin-name">str</span></span>) {
  var result = document.querySelector(<span class="hljs-string">".right .cont"</span>)<span class="hljs-comment">;</span>
  result.innerHTML = str.trans_result[<span class="hljs-number">0</span>].dst;
}
</code></pre>
<p>以上就是实现翻译的过程，效果图：</p>
<p>中 - 英</p>
<p><span class="img-wrap"><img data-src="/img/bVP11X?w=1009&amp;h=466" src="https://static.alili.tech/img/bVP11X?w=1009&amp;h=466" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>中 - 韩</p>
<p><span class="img-wrap"><img data-src="/img/bVP12j?w=982&amp;h=472" src="https://static.alili.tech/img/bVP12j?w=982&amp;h=472" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这样一个小小的翻译小Demo就完成了，主要还是练习原生js，理解跨域请求的原理，其实跨域请求的方法很多，比如<code>&lt;img&gt;</code>标签的<code>src</code>，<code>&lt;iframe&gt;</code>等等。这些方法大家都得去一一了解。</p>
<p>本文分享到此结束，笔者技术有限，理解有误的地方还请大家多提，大家可以共同学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小demo原生js同步翻译，可以玩玩儿

## 原文链接
[https://segmentfault.com/a/1190000009978653](https://segmentfault.com/a/1190000009978653)

