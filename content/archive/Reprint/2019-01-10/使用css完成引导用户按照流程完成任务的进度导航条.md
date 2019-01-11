---
title: '使用css完成引导用户按照流程完成任务的进度导航条' 
date: 2019-01-10 2:30:08
hidden: true
slug: 5jpq87bkiyn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>首先先看设计稿</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVP079?w=656&amp;h=386" src="https://static.alili.tech/img/bVP079?w=656&amp;h=386" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>图中的12345便是主角进度条。</p>
<p>分析需求如下：<br>线的长度不固定，适应移动端和pc端<br>点平均地分布在一条线上<br>点的个数不固定，可能会改变<br>激活的点之间线的颜色是绿色的</p>
<p>两种种方式 百分比宽度切分和flex布局</p>
<p><span class="img-wrap"><img data-src="/img/bVP09u?w=987&amp;h=186" src="https://static.alili.tech/img/bVP09u?w=987&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>贴上代码<br>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
  <meta charset=&quot;utf-8&quot;>
  <title>JS Bin</title>
</head>
<body>
  <div class=&quot;pub-wrap&quot;>
    <div class=&quot;pub-title&quot; id=&quot;pubTitle&quot;>在群内累计布置3天作业，即可加入先锋教师！</div>
    <ul class=&quot;pub-process process-5&quot; id=&quot;pubProcess&quot;>
      <li class=&quot;active&quot;><span class=&quot;ball&quot;>1天</span></li>
      <li class=&quot;active&quot;><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
    </ul>
  </div>
  
  <!-- flex版本 -->
  <div class=&quot;pub-wrap&quot;>
    <div class=&quot;pub-title&quot; id=&quot;pubTitle&quot;>在群内累计布置3天作业，即可加入先锋教师！</div>
    <ul class=&quot;pub-process process-5 pub-process-flex&quot; id=&quot;pubProcess&quot;>
      <li class=&quot;active&quot;><span class=&quot;ball&quot;>1天</span></li>
      <li class=&quot;active&quot;><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
      <li><span class=&quot;ball&quot;>1天</span></li>
    </ul>
  </div>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>JS Bin<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-title"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pubTitle"</span>&gt;</span>在群内累计布置3天作业，即可加入先锋教师！<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-process process-5"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pubProcess"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
  <span class="hljs-comment">&lt;!-- flex版本 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-wrap"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-title"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pubTitle"</span>&gt;</span>在群内累计布置3天作业，即可加入先锋教师！<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pub-process process-5 pub-process-flex"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pubProcess"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"active"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span>&gt;</span>1天<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p>css</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ul {
  margin:0;
  padding:0;
}
li {
  list-style: none;
}

.pub-wrap {
  position: relative;
  padding: 0 30px 10px;
  margin-top: 28px;
  border-radius: 6px;
  background-color: #edf2f2;
}

.pub-title {
  padding-top: 14px;
  margin-right: -20px;
  margin-left: -20px;
  font-size: 1.1875rem;
  text-align: center;
}

.pub-process {
  position: relative;
  height: 35px;
  margin-top: 28px;
  margin-left: 35px;
  font-size: 0;
  color: #fff;
}

.pub-process:after {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 1;
  width: 99%;
  height: 4px;
  content: &quot;&quot;;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  background-color: #d9d9d9;
}

.pub-process li {
  position: relative;
  z-index: 5;
  display: inline-block;
  width: 25%;
  height: 35px;
  font-size: .875rem;
}

.pub-process li:first-child {
  width: 35px;
  margin-left: -35px;
}

.pub-process .ball {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 7;
  width: 35px;
  height: 35px;
  line-height: 35px;
  content: &quot;&quot;;
  text-align: center;
  border-radius: 50%;
  background-color: #d9d9d9;
}

.pub-process .active .ball {
  background-color: #11c2c2;
}

.pub-process .active + .active:after {
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 6;
  width: 100%;
  height: 4px;
  content: &quot;&quot;;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  background-color: #11c2c2;
}

.process-3 li {
  width: 50%;
}

.process-5 li {
  width: 25%;
}


/* flex ver */
.pub-process-flex {
  display: -webkit-box;
}
.pub-process-flex li {
  display: list-item;
  -webkit-box-flex: 1;
  width: auto;
}
.pub-process-flex li:first-child {
  width: 35px;
  margin-left: -35px;
  -webkit-box-flex: 0;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ul</span> {
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span>;
  <span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span>;
}
<span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">list-style</span>: none;
}

<span class="hljs-selector-class">.pub-wrap</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">30px</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#edf2f2</span>;
}

<span class="hljs-selector-class">.pub-title</span> {
  <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">14px</span>;
  <span class="hljs-attribute">margin-right</span>: -<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.1875rem</span>;
  <span class="hljs-attribute">text-align</span>: center;
}

<span class="hljs-selector-class">.pub-process</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">28px</span>;
  <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}

<span class="hljs-selector-class">.pub-process</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">99%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d9d9d9</span>;
}

<span class="hljs-selector-class">.pub-process</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
  <span class="hljs-attribute">display</span>: inline-block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">font-size</span>: .<span class="hljs-number">875rem</span>;
}

<span class="hljs-selector-class">.pub-process</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">35px</span>;
}

<span class="hljs-selector-class">.pub-process</span> <span class="hljs-selector-class">.ball</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">7</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  <span class="hljs-attribute">text-align</span>: center;
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d9d9d9</span>;
}

<span class="hljs-selector-class">.pub-process</span> <span class="hljs-selector-class">.active</span> <span class="hljs-selector-class">.ball</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#11c2c2</span>;
}

<span class="hljs-selector-class">.pub-process</span> <span class="hljs-selector-class">.active</span> + <span class="hljs-selector-class">.active</span><span class="hljs-selector-pseudo">:after</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">z-index</span>: <span class="hljs-number">6</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
  <span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(0, -50%);
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#11c2c2</span>;
}

<span class="hljs-selector-class">.process-3</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-class">.process-5</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
}


<span class="hljs-comment">/* flex ver */</span>
<span class="hljs-selector-class">.pub-process-flex</span> {
  <span class="hljs-attribute">display</span>: -webkit-box;
}
<span class="hljs-selector-class">.pub-process-flex</span> <span class="hljs-selector-tag">li</span> {
  <span class="hljs-attribute">display</span>: list-item;
  <span class="hljs-attribute">-webkit-box-flex</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">width</span>: auto;
}
<span class="hljs-selector-class">.pub-process-flex</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-pseudo">:first-child</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">35px</span>;
  <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">35px</span>;
  <span class="hljs-attribute">-webkit-box-flex</span>: <span class="hljs-number">0</span>;
}</code></pre>
<p>实现效果如图</p>
<p><span class="img-wrap"><img data-src="/img/bVP1aT?w=683&amp;h=154" src="https://static.alili.tech/img/bVP1aT?w=683&amp;h=154" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>使用百分比因为宽度是百分比设死的，这样在点的数量修改时，我们还是要改css，所以建议使用flex布局更完美。</p>
<p><span class="img-wrap"><img data-src="/img/bVP1c6?w=292&amp;h=214" src="https://static.alili.tech/img/bVP1c6?w=292&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用css完成引导用户按照流程完成任务的进度导航条

## 原文链接
[https://segmentfault.com/a/1190000009975370](https://segmentfault.com/a/1190000009975370)

