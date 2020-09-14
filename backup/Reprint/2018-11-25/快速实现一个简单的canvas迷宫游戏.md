---
title: '快速实现一个简单的canvas迷宫游戏' 
date: 2018-11-25 2:30:08
hidden: true
slug: i04wvbwehrd
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#xFF08;&#x6700;&#x8FD1;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x770B;&#x7684;&#x6709;&#x70B9;&#x5934;&#x5927;&#xFF0C;&#x4E00;&#x76F4;&#x9762;&#x5BF9;&#x7EAF;js&#x5B9E;&#x5728;&#x662F;&#x6709;&#x4E9B;&#x67AF;&#x71E5;-_-&#x3002;&#x6240;&#x4EE5;&#x5199;&#x4E00;&#x70B9;&#x6709;&#x8DA3;&#x7684;&#x4E1C;&#x897F;&#x8C03;&#x5242;&#x4E00;&#x4E0B;&#xFF09;<br>&#x73B0;&#x5728;<code>canvas</code>&#x5DF2;&#x7ECF;&#x4E0D;&#x7B97;&#x65B0;&#x9C9C;&#x4E86;&#xFF0C;&#x4E0D;&#x8FC7;&#x7531;&#x4E8E;&#x65E5;&#x5E38;&#x4E1A;&#x52A1;&#x4E2D;&#x5E76;&#x4E0D;&#x5E38;&#x7528;&#xFF0C;&#x6240;&#x4EE5;&#x5B9E;&#x8DF5;&#x5E76;&#x4E0D;&#x591A;&#xFF0C;&#x4ECA;&#x5929;&#x5206;&#x4EAB;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x7B80;&#x5355;<code>canvas</code>&#x8FF7;&#x5BAB;&#x3002;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x6765;&#x6E90;&#x4E8E;&#x300A;html5&#x79D8;&#x7C4D;&#x300B;&#x7B2C;&#x4E8C;&#x7248;&#xFF0C;&#x4EE3;&#x7801;&#x6709;&#x7A0D;&#x5FAE;&#x505A;&#x4E86;&#x70B9;&#x8C03;&#x6574;&#x3002;</p><p>&#x7531;&#x4E8E;&#x4E2D;&#x95F4;&#x6709;&#x4E00;&#x6B65;&#x4F7F;&#x7528;canvas&#x83B7;&#x53D6;&#x56FE;&#x7247;&#x4FE1;&#x606F;&#x7684;&#x65F6;&#x5019;&#xFF0C;<strong>&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x670D;&#x52A1;&#x5668;&#x73AF;&#x5883;</strong>&#x3002;&#x6240;&#x4EE5;&#x6211;&#x5148;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x6837;&#x4F8B;&#x6254;&#x5728;&#x670D;&#x52A1;&#x5668;&#x4E0A;&#xFF0C;&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x5148;&#x4F53;&#x9A8C;&#x4E00;&#x4E0B;&#x6548;&#x679C;&#xFF08;&#x7528;&#x6210;&#x5C31;&#x611F;&#x4F5C;&#x4E3A;&#x9A71;&#x52A8;&#x529B;&#x54C8;&#x54C8;&#x54C8;&#xFF09;</p><p><a href="http://111.231.140.50:8899/" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x6211;&#x4F53;&#x9A8C;</a></p><p><a href="https://github.com/night-lin/canvas-game-maze" rel="nofollow noreferrer" target="_blank">git&#x5730;&#x5740;</a></p><h2 id="articleHeader1">&#x6B63;&#x6587;</h2><p>&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x5C0F;&#x6E38;&#x620F;&#x4E5F;&#x4E0D;&#x96BE;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x60F3;&#x60F3;&#xFF0C;&#x4E00;&#x4E2A;&#x8FF7;&#x5BAB;&#x6E38;&#x620F;&#x6709;&#x54EA;&#x4E9B;&#x57FA;&#x672C;&#x8981;&#x7D20;&#x3002;</p><p>&#x9996;&#x5148;&#x5F53;&#x7136;&#x5F97;&#x6709;&#x4E2A;<strong>&#x5730;&#x56FE;</strong>&#xFF0C;&#x7136;&#x540E;&#x5F97;&#x6709;&#x4E2A;<strong>&#x79FB;&#x52A8;&#x7684;&#x5C0F;&#x4EBA;</strong>&#xFF0C;&#x8FD9;&#x4E24;&#x4E2A;&#x6211;&#x4EEC;&#x5229;&#x7528;cavans&#x6765;&#x7ED8;&#x5236;&#xFF1B;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x662F;<strong>&#x7269;&#x4F53;&#x79FB;&#x52A8;</strong>&#x7684;&#x7A0B;&#x5E8F;&#xFF0C;&#x8FD9;&#x4E2A;&#x7A0B;&#x5E8F;&#x4E3B;&#x8981;&#x5305;&#x62EC;2&#x4E2A;&#x65B9;&#x9762;&#xFF1A;</p><p>1.&#x8BA9;&#x7269;&#x4F53;&#x8DDF;&#x6211;&#x4EEC;&#x6307;&#x5B9A;&#x7684;&#x6307;&#x4EE4;&#x6765;&#x79FB;&#x52A8;&#xFF1B;<br>2.&#x68C0;&#x6D4B;&#x7269;&#x4F53;&#x662F;&#x5426;&#x78B0;&#x5230;&#x5899;&#x4F53;&#x6216;&#x8005;&#x51FA;&#x53E3;&#x3002;</p><h3 id="articleHeader2">&#x7ED8;&#x5236;&#x8FF7;&#x5BAB;&#x7684;&#x5730;&#x56FE;&#x548C;&#x79FB;&#x52A8;&#x7684;&#x5C0F;&#x4EBA;</h3><p>&#x7ED8;&#x5236;&#x5730;&#x56FE;&#x7684;&#x4E3B;&#x8981;&#x6B65;&#x9AA4;&#x662F;&#xFF1A;</p><ol><li>&#x83B7;&#x53D6;&#x4E00;&#x5F20;&#x5730;&#x56FE;&#x7684;&#x56FE;&#x7247;</li><li>&#x5229;&#x7528;cavans&#x7ED8;&#x5236;&#x56FE;&#x50CF;&#x3002;</li></ol><p>&#x8FF7;&#x5BAB;&#x5730;&#x56FE;&#x7684;&#x751F;&#x6210;&#xFF0C;&#x53EF;&#x4EE5;&#x501F;&#x52A9;&#x8C37;&#x6B4C;&#x7684;&#x4E00;&#x4E2A;<a href="http://www.mazegenerator.net/" rel="nofollow noreferrer" target="_blank">&#x8FF7;&#x5BAB;&#x5728;&#x7EBF;&#x751F;&#x6210;&#x5668;</a>&#x6765;&#x83B7;&#x5F97;&#x3002;</p><p>&#x7ED8;&#x5236;&#x5C0F;&#x4EBA;&#x4E5F;&#x662F;&#x4E00;&#x6837;&#x76F4;&#x63A5;&#x627E;&#x4E00;&#x4E2A;&#x5C0F;&#x4EBA;&#x7684;&#x56FE;&#x7247;&#x5373;&#x53EF;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x8981;&#x627E;<strong>&#x6B63;&#x65B9;&#x5F62;&#x7684;&#x56FE;&#x7247;</strong>&#xFF0C;&#x56E0;&#x4E3A;&#x4E00;&#x4F1A;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x505A;&#x79FB;&#x52A8;&#x7684;&#x78B0;&#x649E;&#x68C0;&#x6D4B;&#xFF0C;&#x65B9;&#x5F62;&#x6BD4;&#x8F83;&#x597D;&#x5224;&#x65AD;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x8981;&#x5199;&#x7ED8;&#x5236;&#x8FF7;&#x5BAB;&#x548C;&#x5C0F;&#x4EBA;&#x7684;&#x4E3B;&#x8981;&#x51FD;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawMaze(mazeFile, startingX, startingY) {
  var imgMaze = new Image()
  imgMaze.onload = function () {
    // &#x753B;&#x5E03;&#x5927;&#x5C0F;&#x8C03;&#x6574;
    canvas.width = imgMaze.width
    canvas.height = imgMaze.height

    // &#x7ED8;&#x5236;&#x7B11;&#x8138;
    var imgFace = document.getElementById(&quot;face&quot;)
    context.drawImage(imgMaze, 0, 0)

    x = startingX
    y = startingY
    context.drawImage(imgFace, x, y)
    context.stroke()
  }
  imgMaze.src = mazeFile
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>function drawMaze(mazeFile, startingX, startingY) {
  <span class="hljs-selector-tag">var</span> imgMaze = new Image()
  imgMaze<span class="hljs-selector-class">.onload</span> = function () {
    <span class="hljs-comment">// &#x753B;&#x5E03;&#x5927;&#x5C0F;&#x8C03;&#x6574;</span>
    <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.width</span> = imgMaze<span class="hljs-selector-class">.width</span>
    <span class="hljs-selector-tag">canvas</span><span class="hljs-selector-class">.height</span> = imgMaze<span class="hljs-selector-class">.height</span>

    <span class="hljs-comment">// &#x7ED8;&#x5236;&#x7B11;&#x8138;</span>
    <span class="hljs-selector-tag">var</span> imgFace = document.getElementById(<span class="hljs-string">&quot;face&quot;</span>)
    context.drawImage(imgMaze, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)

    x = startingX
    y = startingY
    context.drawImage(imgFace, x, y)
    context.stroke()
  }
  imgMaze<span class="hljs-selector-class">.src</span> = mazeFile
}</code></pre><p><code>mazeFile</code>&#x662F;&#x8FF7;&#x5BAB;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#xFF0C;<code>startingX</code>&#x548C;<code>startingY</code>&#xFF0C;&#x662F;&#x8D77;&#x59CB;&#x70B9;&#x7684;&#x5750;&#x6807;&#x3002;&#x5728;&#x8FD9;&#x91CC;&#x56FE;&#x7247;&#x5F15;&#x5165;&#x7684;&#x65B9;&#x5F0F;&#x7528;&#x4E86;2&#x79CD;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x5C0F;&#x4EBA;&#x7684;&#x56FE;&#x7247;&#x6211;&#x4E0D;&#x7ECF;&#x5E38;&#x66F4;&#x6362;&#xFF0C;&#x5C31;&#x76F4;&#x63A5;&#x5199;&#x5728;&#x9875;&#x9762;&#x91CC;&#xFF0C;&#x8FF7;&#x5BAB;&#x7684;&#x5730;&#x56FE;&#x6253;&#x7B97;&#x505A;&#x6210;&#x53EF;&#x53D8;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5728;js&#x91CC;&#x5F15;&#x5165;&#xFF0C;&#x4F60;&#x60F3;&#x628A;&#x56FE;&#x7247;&#x90FD;&#x76F4;&#x63A5;&#x7528;js&#x5F15;&#x5165;&#x4E5F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x3002;&#x5176;&#x4ED6;&#x90E8;&#x5206;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x4E0D;&#x518D;&#x8D58;&#x8FF0;&#x3002;</p><h3 id="articleHeader3">&#x79FB;&#x52A8;&#x51FD;&#x6570;</h3><p>&#x79FB;&#x52A8;&#x7684;&#x4E3B;&#x8981;&#x539F;&#x7406;&#x662F;&#xFF1A;<br>&#x63A5;&#x53D7;&#x6307;&#x5B9A;&#x7684;&#x7528;&#x6237;&#x8F93;&#x5165;&#xFF08;&#x5728;&#x8FD9;&#x91CC;&#x662F;&#x54CD;&#x5E94;&#x65B9;&#x5411;&#x952E;&#xFF09;&#xFF0C;&#x8F6C;&#x6362;&#x6210;&#x5BF9;&#x5E94;&#x7684;&#x79FB;&#x52A8;&#x6307;&#x4EE4;&#x3002;&#x7136;&#x540E;<strong>&#x5468;&#x671F;&#x6027;&#x7684;&#x68C0;&#x67E5;</strong>&#x79FB;&#x52A8;&#x6307;&#x4EE4;&#xFF0C;&#x7ED8;&#x5236;&#x5BF9;&#x5E94;&#x7684;&#x76EE;&#x6807;&#x4F4D;&#x7F6E;&#x3002;&#x4E3E;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><p>&#x6BD4;&#x5982;&#x6BCF;&#x6309;&#x4E0B;&#x4E00;&#x6B21;&#x65B9;&#x5411;&#x952E;&#x4E0A;&#xFF0C;&#x5C31;&#x8BB0;&#x5F55;&#x4E0B;&#x5E94;&#x8BE5;&#x5F80;&#x4E0A;&#x79FB;&#x52A8;&#xFF0C;&#x7136;&#x540E;&#x6BCF;&#x9694;100&#x6BEB;&#x79D2;&#x68C0;&#x67E5;&#x5F53;&#x524D;&#x7684;&#x79FB;&#x52A8;&#x6307;&#x4EE4;&#xFF0C;&#x7ED8;&#x5236;&#x5E94;&#x8BE5;&#x79FB;&#x52A8;&#x7684;&#x76EE;&#x6807;&#x5730;&#x70B9;&#xFF0C;&#x91CD;&#x590D;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x3002;&#x4EE3;&#x7801;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x79FB;&#x52A8;&#x51FD;&#x6570;
function processKey(e) {
  dx = 0
  dy = 0
  // &#x4E0A;&#x4E0B;&#x5DE6;&#x53F3;&#x65B9;&#x5411;&#x952E;&#x68C0;&#x6D4B;
  if (e.keyCode === 38) {
    dy = -1
  }
  if (e.keyCode === 40) {
    dy = 1
  }
  if (e.keyCode === 37) {
    dx = -1
  }
  if (e.keyCode === 39) {
    dx = 1
  }
}

// &#x7ED8;&#x5236;&#x5E27;
function drawFrame() {
  if (dx != 0 || dy != 0) {
    // context.clearRect(x,y,canvas.width,canvas.height)
    // &#x7ED8;&#x5236;&#x79FB;&#x52A8;&#x8F68;&#x8FF9;
    context.beginPath();
    context.fillStyle = &quot;rgb(254,244,207)&quot;
    context.rect(x, y, 15, 15)
    context.fill()
    x += dx
    y += dy
    // &#x78B0;&#x649E;&#x68C0;&#x6D4B;
    if (checkForCollision()) {
      x -= dx
      y -= dy
      dx = 0
      dy = 0
    }
    
    //&#x7ED8;&#x5236;&#x5C0F;&#x4EBA;&#x5E94;&#x8BE5;&#x79FB;&#x52A8;&#x7684;&#x5730;&#x70B9;
    var imgFace = document.getElementById(&apos;face&apos;)
    context.drawImage(imgFace, x, y)

    if (canvas.height - y &lt; 17) {
      // isFirst = false
      alert(&apos;&#x606D;&#x559C;&#x4F60;&#x901A;&#x5173; &#x6E38;&#x620F;&#x7ED3;&#x675F;&apos;)
      return false
    }
    // &#x8FD9;&#x91CC;&#x5982;&#x679C;&#x91CD;&#x7F6E;&#x7684;&#x8BDD;&#x53D8;&#x6210;&#x975E;&#x81EA;&#x52A8;&#x79FB;&#x52A8;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6BCF;&#x6309;&#x4E0B;&#x4E00;&#x6B21;&#x65B9;&#x5411;&#x952E;&#x53EA;&#x524D;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x7531;&#x4E8E;&#x76EE;&#x524D;&#x4F53;&#x9A8C;&#x4E0D;&#x597D;&#x6240;&#x4EE5;&#x5148;&#x4E0D;&#x505A;&#x91CD;&#x7F6E;
    // dx = 0
    // dy = 0
  }
  setTimeout(drawFrame, 20)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x79FB;&#x52A8;&#x51FD;&#x6570;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processKey</span>(<span class="hljs-params">e</span>) </span>{
  dx = <span class="hljs-number">0</span>
  dy = <span class="hljs-number">0</span>
  <span class="hljs-comment">// &#x4E0A;&#x4E0B;&#x5DE6;&#x53F3;&#x65B9;&#x5411;&#x952E;&#x68C0;&#x6D4B;</span>
  <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">38</span>) {
    dy = <span class="hljs-number">-1</span>
  }
  <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">40</span>) {
    dy = <span class="hljs-number">1</span>
  }
  <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">37</span>) {
    dx = <span class="hljs-number">-1</span>
  }
  <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">39</span>) {
    dx = <span class="hljs-number">1</span>
  }
}

<span class="hljs-comment">// &#x7ED8;&#x5236;&#x5E27;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span> (dx != <span class="hljs-number">0</span> || dy != <span class="hljs-number">0</span>) {
    <span class="hljs-comment">// context.clearRect(x,y,canvas.width,canvas.height)</span>
    <span class="hljs-comment">// &#x7ED8;&#x5236;&#x79FB;&#x52A8;&#x8F68;&#x8FF9;</span>
    context.beginPath();
    context.fillStyle = <span class="hljs-string">&quot;rgb(254,244,207)&quot;</span>
    context.rect(x, y, <span class="hljs-number">15</span>, <span class="hljs-number">15</span>)
    context.fill()
    x += dx
    y += dy
    <span class="hljs-comment">// &#x78B0;&#x649E;&#x68C0;&#x6D4B;</span>
    <span class="hljs-keyword">if</span> (checkForCollision()) {
      x -= dx
      y -= dy
      dx = <span class="hljs-number">0</span>
      dy = <span class="hljs-number">0</span>
    }
    
    <span class="hljs-comment">//&#x7ED8;&#x5236;&#x5C0F;&#x4EBA;&#x5E94;&#x8BE5;&#x79FB;&#x52A8;&#x7684;&#x5730;&#x70B9;</span>
    <span class="hljs-keyword">var</span> imgFace = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&apos;face&apos;</span>)
    context.drawImage(imgFace, x, y)

    <span class="hljs-keyword">if</span> (canvas.height - y &lt; <span class="hljs-number">17</span>) {
      <span class="hljs-comment">// isFirst = false</span>
      alert(<span class="hljs-string">&apos;&#x606D;&#x559C;&#x4F60;&#x901A;&#x5173; &#x6E38;&#x620F;&#x7ED3;&#x675F;&apos;</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5982;&#x679C;&#x91CD;&#x7F6E;&#x7684;&#x8BDD;&#x53D8;&#x6210;&#x975E;&#x81EA;&#x52A8;&#x79FB;&#x52A8;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6BCF;&#x6309;&#x4E0B;&#x4E00;&#x6B21;&#x65B9;&#x5411;&#x952E;&#x53EA;&#x524D;&#x8FDB;&#x4E00;&#x6B65;&#xFF0C;&#x7531;&#x4E8E;&#x76EE;&#x524D;&#x4F53;&#x9A8C;&#x4E0D;&#x597D;&#x6240;&#x4EE5;&#x5148;&#x4E0D;&#x505A;&#x91CD;&#x7F6E;</span>
    <span class="hljs-comment">// dx = 0</span>
    <span class="hljs-comment">// dy = 0</span>
  }
  setTimeout(drawFrame, <span class="hljs-number">20</span>)
}</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x79FB;&#x52A8;&#x51FD;&#x6570;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x7ED8;&#x5236;&#x5E27;&#x7684;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#x7684;&#x5C31;&#x662F;&#x78B0;&#x649E;&#x68C0;&#x6D4B;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x4E0B;&#x9762;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA;&#x3002;</p><h3 id="articleHeader4">&#x78B0;&#x649E;&#x68C0;&#x6D4B;</h3><p>&#x8981;&#x68C0;&#x6D4B;&#x7269;&#x4F53;&#x4E0E;&#x5899;&#x4F53;&#x662F;&#x5426;&#x78B0;&#x649E;&#xFF0C;<strong>&#x901A;&#x5E38;&#x60C5;&#x51B5;</strong>&#x662F;&#x8981;&#x5148;&#x628A;&#x5730;&#x56FE;&#x4FE1;&#x606F;&#x4FDD;&#x5B58;&#x5230;&#x5185;&#x5B58;&#x91CC;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x79FB;&#x52A8;&#x7269;&#x4F53;&#x65F6;&#x68C0;&#x6D4B;&#x662F;&#x5426;&#x4E0E;&#x5F53;&#x524D;&#x7684;&#x67D0;&#x4E2A;&#x5899;&#x4F53;&#x78B0;&#x649E;&#xFF0C;&#x4F46;&#x662F;<strong>&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x7684;&#x5730;&#x56FE;&#x80CC;&#x666F;&#x662F;&#x9ED1;&#x767D;&#x8FF7;&#x5BAB;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x989C;&#x8272;&#x6765;&#x68C0;&#x6D4B;&#x78B0;&#x649E;</strong>&#x3002;&#x5177;&#x4F53;&#x7684;&#x505A;&#x6CD5;&#x662F;&#xFF1A;</p><p><strong>&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7269;&#x4F53;&#x7684;&#x5750;&#x6807;&#x4F4D;&#x7F6E;&#xFF0C;&#x5229;&#x7528;<code>canvas</code>&#x68C0;&#x6D4B;&#x5F53;&#x524D;&#x5730;&#x56FE;&#x4E0A;&#x8FD9;&#x4E2A;&#x4F4D;&#x7F6E;&#x7684;&#x989C;&#x8272;&#x662F;&#x5426;&#x4E3A;&#x9ED1;&#x8272;&#xFF0C;&#x5982;&#x679C;&#x662F;&#xFF0C;&#x8BF4;&#x662F;&#x662F;&#x5899;&#x4F53;&#xFF0C;&#x4E0D;&#x5E94;&#x8BE5;&#x6267;&#x884C;&#x79FB;&#x52A8;</strong>&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x662F;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkForCollision() {
  var imageData = context.getImageData(x - 1, y - 1, 15 + 2, 15 + 2)
  var pixels = imageData.data

  for (var i = 0, len = pixels.length; i &lt; len; i++) {
    var red = pixels[i],
        green = pixels[i + 1]
        blue = pixels[i + 2]
        alpha = pixels[i + 3]

    // &#x68C0;&#x6D4B;&#x662F;&#x5426;&#x78B0;&#x5230;&#x9ED1;&#x8272;&#x7684;&#x5899;
    if (red === 0 &amp;&amp; green === 0 &amp;&amp; blue === 0) {
      return true
    }
  }
  return false
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs processing"><code>function checkForCollision() {
  var imageData = context.getImageData(x - <span class="hljs-number">1</span>, y - <span class="hljs-number">1</span>, <span class="hljs-number">15</span> + <span class="hljs-number">2</span>, <span class="hljs-number">15</span> + <span class="hljs-number">2</span>)
  var <span class="hljs-built_in">pixels</span> = imageData.data

  <span class="hljs-keyword">for</span> (var i = <span class="hljs-number">0</span>, len = <span class="hljs-built_in">pixels</span>.length; i &lt; len; i++) {
    var <span class="hljs-built_in">red</span> = <span class="hljs-built_in">pixels</span>[i],
        <span class="hljs-built_in">green</span> = <span class="hljs-built_in">pixels</span>[i + <span class="hljs-number">1</span>]
        <span class="hljs-built_in">blue</span> = <span class="hljs-built_in">pixels</span>[i + <span class="hljs-number">2</span>]
        <span class="hljs-built_in">alpha</span> = <span class="hljs-built_in">pixels</span>[i + <span class="hljs-number">3</span>]

    <span class="hljs-comment">// &#x68C0;&#x6D4B;&#x662F;&#x5426;&#x78B0;&#x5230;&#x9ED1;&#x8272;&#x7684;&#x5899;</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">red</span> === <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-built_in">green</span> === <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-built_in">blue</span> === <span class="hljs-number">0</span>) {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
}</code></pre><p>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;<code>15</code>&#x662F;&#x5C0F;&#x4EBA;&#x7684;&#x5BBD;&#x5EA6;&#xFF0C;&#x6211;&#x4EEC;&#x68C0;&#x6D4B;&#x5C0F;&#x4EBA;&#x4E24;&#x4FA7;&#x5404;1px&#x8303;&#x56F4;&#xFF08;&#x5BF9;&#x5E94;&#x4EE3;&#x7801;&#x4E2D;&#x7684;<code>getImageData(x - 1, y - 1, 15 + 2, 15 + 2)</code>&#x53EF;&#x4EE5;&#x7A0D;&#x5FAE;&#x601D;&#x8003;&#x4E0B;&#x8FD9;&#x91CC;&#x4E3A;&#x4EC0;&#x4E48;&#x662F;+2&#xFF09;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x9ED1;&#x8272;&#xFF0C;&#x8BF4;&#x660E;&#x68C0;&#x6D4B;&#x5230;&#x78B0;&#x649E;&#x3002;</p><h3 id="articleHeader5">&#x5176;&#x4F59;</h3><p>&#x5728;&#x4EE3;&#x7801;&#x91CC;&#xFF0C;&#x6211;&#x52A0;&#x4E86;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x6BD4;&#x5982;&#x63D0;&#x793A;&#x7B54;&#x6848;&#x7B49;&#x3002;&#x81F3;&#x4E8E;&#x66F4;&#x6362;&#x5730;&#x56FE;&#x4E5F;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF1A;&#x628A;&#x5730;&#x56FE;&#x5BF9;&#x5E94;&#x7684;&#x6587;&#x4EF6;&#x5730;&#x5740;&#xFF0C;&#x8D77;&#x70B9;&#x5750;&#x6807;&#xFF0C;&#x7B54;&#x6848;&#x56FE;&#x7247;&#x8DEF;&#x5F84;&#x7B49;&#x5B58;&#x5728;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x91CC;&#xFF0C;&#x7136;&#x540E;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x5730;&#x56FE;&#x6570;&#x7EC4;&#xFF0C;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x5207;&#x6362;&#x5730;&#x56FE;&#x5E76;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x503C;&#x5F97;&#x4F18;&#x5316;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><ol><li>&#x78B0;&#x649E;&#x68C0;&#x6D4B;&#x5728;&#x62D0;&#x5F2F;&#x7684;&#x5730;&#x65B9;&#x4F53;&#x9A8C;&#x4E0D;&#x4F73;&#xFF1B;</li><li>&#x5F53;&#x524D;&#x60C5;&#x51B5;&#x8FD0;&#x884C;&#x65F6;&#x6709;&#x8F68;&#x8FF9;&#xFF0C;&#x5728;&#x7B54;&#x6848;&#x6A21;&#x5F0F;&#x4E0B;&#x5E94;&#x8BE5;&#x5982;&#x4F55;&#x53BB;&#x6389;&#x8F68;&#x8FF9;&#xFF1F;</li></ol><p>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x8BD5;&#x7740;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E0B;&#x3002;</p><h2 id="articleHeader6">&#x5C0F;&#x7ED3;</h2><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x76F8;&#x5BF9;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x5BF9;js&#x7684;&#x8981;&#x6C42;&#x4E0D;&#x9AD8;&#xFF0C;&#x62FF;&#x6765;&#x73A9;&#x4E00;&#x4E0B;&#x8FD8;&#x662F;&#x633A;&#x4E0D;&#x9519;&#x7684;&#x3002;</p><p>&#x7136;&#x540E;&#x4F9D;&#x7136;&#x662F;&#x6BCF;&#x6B21;&#x90FD;&#x4E00;&#x6837;&#x7684;&#x7ED3;&#x5C3E;&#xFF0C;&#x5982;&#x679C;&#x5185;&#x5BB9;&#x6709;&#x9519;&#x8BEF;&#x7684;&#x5730;&#x65B9;&#x6B22;&#x8FCE;&#x6307;&#x51FA;&#xFF1B;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x6B22;&#x8FCE;&#x70B9;&#x8D5E;&#x548C;&#x6536;&#x85CF;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x5F81;&#x5F97;&#x540C;&#x610F;&#x540E;&#x8457;&#x660E;&#x51FA;&#x5904;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x95EE;&#x9898;&#x4E5F;&#x6B22;&#x8FCE;&#x79C1;&#x4FE1;&#x4EA4;&#x6D41;&#xFF0C;&#x4E3B;&#x9875;&#x6709;&#x90AE;&#x7BB1;&#x5730;&#x5740;~&#x6E9C;&#x4E86;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
快速实现一个简单的canvas迷宫游戏

## 原文链接
[https://segmentfault.com/a/1190000015431930](https://segmentfault.com/a/1190000015431930)

