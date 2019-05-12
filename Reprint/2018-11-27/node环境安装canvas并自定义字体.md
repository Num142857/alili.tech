---
title: 'node环境安装canvas并自定义字体' 
date: 2018-11-27 2:30:12
hidden: true
slug: u3zc6ojbm3
categories: [reprint]
---

{{< raw >}}
<blockquote><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x88C5;canvas&#xFF1F;</strong> &#x56E0;&#x4E3A;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x5BA2;&#x6237;&#x7AEF;&#x90FD;&#x80FD;&#x5F88;&#x597D;&#x7684;&#x652F;&#x6301;canvas&#xFF08;&#x6BD4;&#x5982;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E0D;&#x80FD;&#x4FEE;&#x6539;&#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;<br>&#x80FD;&#x591F;&#x5728;&#x670D;&#x52A1;&#x7AEF;&#x751F;&#x6210;&#x56FE;&#x7247;&#x7684;&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x56FE;&#x7247;&#x4F20;&#x8F93;</blockquote><p>&lt;!-- more --&gt;</p><h2 id="articleHeader0">&#x5B89;&#x88C5;node-canvas</h2><h3 id="articleHeader1">1. &#x66F4;&#x65B0;&#x7F16;&#x8BD1;&#x73AF;&#x5883;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ -y" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">sudo apt-get install libcairo2-dev libjpeg8-dev libpango1.0-dev libgif-dev build-essential g++ -y</code></pre><h3 id="articleHeader2">2. &#x5B89;&#x88C5;node-canvas</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g canvas" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install -g canvas</code></pre><h3 id="articleHeader3">3. &#x6D4B;&#x8BD5;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Canvas = require(&apos;canvas&apos;),
    canvas = new Canvas(300, 200),
    ctx = canvas.getContext(&apos;2d&apos;),
    fs = require(&apos;fs&apos;);
 
var out = fs.createWriteStream(__dirname + &apos;/image.png&apos;)
  , stream = canvas.createPNGStream();
 
stream.on(&apos;data&apos;, function(chunk){
  out.write(chunk);
});
 
//&#x5728;&#x5DE6;&#x8FB9;&#x753B;&#x6B63;&#x65B9;&#x5F62;
ctx.fillStyle = &apos;#A00&apos;    
ctx.fillRect(0, 30,50,50);   
  
 
//&#x5728;&#x53F3;&#x8FB9;&#x753B;&#x6B63;&#x65B9;&#x5F62;
ctx.fillStyle = &apos;#aaa&apos;    
ctx.fillRect(50, 30, 50, 50);
 
//&#x753B;&#x6587;&#x5B57;
ctx.fillStyle = &quot;#000&quot;;
ctx.font = &quot;20px Arial&quot;;
ctx.fillText(&quot;Hello World&quot;, 0, 20);
 
//&#x753B;&#x4E00;&#x4E2A;&#x5706;
ctx.beginPath();
ctx.arc(30, 110, 20, 0, 2*Math.PI);
ctx.stroke();
ctx.fillStyle = &quot;green&quot;;                                                                                                                          
ctx.fill();
ctx.save();  " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> Canvas = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;canvas&apos;</span>),
    canvas = <span class="hljs-keyword">new</span> Canvas(<span class="hljs-number">300</span>, <span class="hljs-number">200</span>),
    ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>),
    fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>);
 
<span class="hljs-keyword">var</span> out = fs.createWriteStream(__dirname + <span class="hljs-string">&apos;/image.png&apos;</span>)
  , stream = canvas.createPNGStream();
 
stream.on(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">chunk</span>)</span>{
  out.write(chunk);
});
 
<span class="hljs-comment">//&#x5728;&#x5DE6;&#x8FB9;&#x753B;&#x6B63;&#x65B9;&#x5F62;</span>
ctx.fillStyle = <span class="hljs-string">&apos;#A00&apos;</span>    
ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">30</span>,<span class="hljs-number">50</span>,<span class="hljs-number">50</span>);   
  
 
<span class="hljs-comment">//&#x5728;&#x53F3;&#x8FB9;&#x753B;&#x6B63;&#x65B9;&#x5F62;</span>
ctx.fillStyle = <span class="hljs-string">&apos;#aaa&apos;</span>    
ctx.fillRect(<span class="hljs-number">50</span>, <span class="hljs-number">30</span>, <span class="hljs-number">50</span>, <span class="hljs-number">50</span>);
 
<span class="hljs-comment">//&#x753B;&#x6587;&#x5B57;</span>
ctx.fillStyle = <span class="hljs-string">&quot;#000&quot;</span>;
ctx.font = <span class="hljs-string">&quot;20px Arial&quot;</span>;
ctx.fillText(<span class="hljs-string">&quot;Hello World&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">20</span>);
 
<span class="hljs-comment">//&#x753B;&#x4E00;&#x4E2A;&#x5706;</span>
ctx.beginPath();
ctx.arc(<span class="hljs-number">30</span>, <span class="hljs-number">110</span>, <span class="hljs-number">20</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span>*<span class="hljs-built_in">Math</span>.PI);
ctx.stroke();
ctx.fillStyle = <span class="hljs-string">&quot;green&quot;</span>;                                                                                                                          
ctx.fill();
ctx.save();  </code></pre><h2 id="articleHeader4">&#x53EF;&#x80FD;&#x9047;&#x5230;&#x7684;&#x95EE;&#x9898;</h2><blockquote>&#x5982;&#x679C;&#x4F60;&#x6309;&#x4E0A;&#x8FF0;&#x65B9;&#x6CD5;&#x64CD;&#x4F5C;&#xFF0C;&#x5E76;&#x4E14;&#x8FD0;&#x884C;&#x6210;&#x529F;&#x4E86;&#x3002;&#x90A3;&#x4FBF;&#x662F;&#x6781;&#x597D;&#x7684;</blockquote><h3 id="articleHeader5">1. &#x81EA;&#x5B9A;&#x4E49;&#x5B57;&#x4F53;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// You need to call it before the Canvas is created
Canvas.registerFont(&apos;comicsans.ttf&apos;, {family: &apos;Comic Sans&apos;});

var canvas = new Canvas(500, 500),
  ctx = canvas.getContext(&apos;2d&apos;);

ctx.font = &apos;12px &quot;Comic Sans&quot;&apos;;
ctx.fillText(250, 10, &apos;Everyone hates this font :(&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// You need to call it before the Canvas is created</span>
Canvas.registerFont(<span class="hljs-string">&apos;comicsans.ttf&apos;</span>, {<span class="hljs-attr">family</span>: <span class="hljs-string">&apos;Comic Sans&apos;</span>});

<span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> Canvas(<span class="hljs-number">500</span>, <span class="hljs-number">500</span>),
  ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>);

ctx.font = <span class="hljs-string">&apos;12px &quot;Comic Sans&quot;&apos;</span>;
ctx.fillText(<span class="hljs-number">250</span>, <span class="hljs-number">10</span>, <span class="hljs-string">&apos;Everyone hates this font :(&apos;</span>);</code></pre><blockquote>&#x4E0D;&#x8FC7;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;<code>Canvas.registerFont is not a function</code>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;npm&#x7248;&#x672C;&#x7684;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x3002;</blockquote><p>&#x6240;&#x4EE5;&#x4F60;&#x9700;&#x8981;&#x53BB;&#x627E;&#x53E6;&#x4E00;&#x4E2A;github&#x7248;<code>https://github.com/chearon/node-canvas#12971f64a66b</code></p><p>git clone &#x4E0B;&#x6765;</p><blockquote>&#x7136;&#x540E;&#x5C06;Canvas = require(&apos;canvas&apos;)&#x6539;&#x6210;require(&apos;./node-canvas&apos;)&#xFF0C;<br>&#x5C06;<code>var canvas = new Canvas(300, 200)</code>&#x6539;&#x6210;<code>var canvas = new Canvas.Canvas(300, 200)</code></blockquote><h3 id="articleHeader6">2. Error: Cannot find module &apos;../build/Release/canvas.node&apos;</h3><blockquote>&#x5982;&#x679C;&#x9047;&#x5230;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x8BF7;cd&#x8FDB;&#x4F60;&#x7684;node-canvas&#x76EE;&#x5F55;&#x6267;&#x884C;npm install<p>&#x5982;&#x679C;&#x8FD8;&#x662F;&#x4E0D;&#x884C;&#xFF0C;&#x8BF7;&#x6267;&#x884C;<code>npm install -g node-gyp</code></p></blockquote><p>&#x7136;&#x540E;&#x518D;cd&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x6267;&#x884C;<code>node-gyp rebuild</code>&#xFF0C;then cd &#x8FDB;node-canvas&#x540C;&#x6837;&#x6267;&#x884C;<code>node-gyp rebuild</code></p><p>&#x5982;&#x679C;&#x6210;&#x529F;&#x5219;&#x4F1A;&#x51FA;&#x73B0;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015328344?w=940&amp;h=771" src="https://static.alili.tech/img/remote/1460000015328344?w=940&amp;h=771" alt="&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;" title="&#x7F16;&#x8BD1;&#x8FC7;&#x7A0B;" style="cursor:pointer"></span></p><h2 id="articleHeader7">&#x793A;&#x4F8B;&#x4EE3;&#x7801;</h2><h3 id="articleHeader8">&#x6211;&#x7684;&#x9879;&#x76EE;&#x76EE;&#x5F55;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
&#x251C;&#x2500;&#x2500; 1.html
&#x251C;&#x2500;&#x2500; composer.json
&#x251C;&#x2500;&#x2500; font
&#x251C;&#x2500;&#x2500; fz.ttf
&#x251C;&#x2500;&#x2500; img
&#x251C;&#x2500;&#x2500; index.js
&#x251C;&#x2500;&#x2500; node-canvas
&#x251C;&#x2500;&#x2500; node_modules
&#x251C;&#x2500;&#x2500; package.json
&#x2514;&#x2500;&#x2500; package-lock.json" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>.
&#x251C;&#x2500;&#x2500; <span class="hljs-number">1</span><span class="hljs-selector-class">.html</span>
&#x251C;&#x2500;&#x2500; composer<span class="hljs-selector-class">.json</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-attribute">font</span>
&#x251C;&#x2500;&#x2500; fz<span class="hljs-selector-class">.ttf</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">img</span>
&#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; node-<span class="hljs-selector-tag">canvas</span>
&#x251C;&#x2500;&#x2500; node_modules
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>
&#x2514;&#x2500;&#x2500; package-lock.json</code></pre><h3 id="articleHeader9">&#x6211;&#x7684;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var fs = require(&apos;fs&apos;),path = require(&apos;path&apos;);
var http = require(&apos;http&apos;),url = require(&quot;url&quot;);
var Canvas = require(&apos;./node-canvas&apos;),Image = Canvas.Image;
var Fonts = [];
var filePath = path.resolve(&apos;./font&apos;);

let promise = new Promise(function(resolve, reject) {
  let i=0;
  fs.readdir(filePath,function(err,files){  
    if(err){  
      console.warn(err)  
    }else{
      files.forEach(function(filename){
        Canvas.registerFont(filePath + &quot;/&quot; + filename, {family: &quot;font&quot; + i});
        console.log(i);
        i++;
      });
    }
  });
  
});

promise.then(function() {
  console.log(&quot;ASDF&quot;);
  Fonts.forEach((Element) =&gt;{
    console.log(Element);
  });
});

console.log(&apos;Hi!&apos;);


http.createServer(function (req, res) {
  var params = url.parse(req.url, true).query;
  var str = params.str + &apos;\r&apos;,site = params.site;
  var row =  1,col = 15,width = 1500;
  row = str.length / 15 + 1;
  var fontsize = width/col;
  var height = fontsize * row + 200;
  if(height &lt; 1000){height = 1000}
  var canvas = new Canvas.Canvas(width, height), ctx = canvas.getContext(&apos;2d&apos;)
  res.writeHead(200,{&quot;Content-Type&quot;: &quot;image/png&quot;});
  ctx.fillStyle = &apos;#FFF&apos;;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  ctx.fillStyle = &apos;#000&apos;;
  if(row &lt; 2){
    let num = str.length
    fontsize = 1200 / num;
    ctx.font = fontsize + &apos;px &quot;font&apos;+ site +&apos;&quot;&apos;;
    ctx.fillText(str,( width - num * fontsize ) / 2, (height-fontsize)/2 -200 + fontsize);
  }
  else{
    ctx.font = fontsize + &apos;px &quot;font&apos;+ site +&apos;&quot;&apos;;
    for(let i = 0;i &lt; row ; i++){
      ctx.fillText(str.substring(i*15,(i+1)*15), 0, fontsize*(i+1));
    }
  }
  
  fs.readFile(__dirname + &apos;/img/brand.png&apos;, function(err, squid){
    if (err) throw err;
    img = new Image;
    img.src = squid;
    ctx.fillStyle = &apos;#42b983&apos;;
    ctx.fillRect(0,canvas.height - 230,canvas.width, 230);
    ctx.drawImage(img, canvas.width - img.width / 2 - 50, canvas.height - img.height / 2 - 50, img.width / 2, img.height / 2);
    res.end(canvas.toBuffer());
  });
}).listen(8080);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;fs&apos;</span>),path = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;path&apos;</span>);
<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;http&apos;</span>),url = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;url&quot;</span>);
<span class="hljs-keyword">var</span> Canvas = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./node-canvas&apos;</span>),Image = Canvas.Image;
<span class="hljs-keyword">var</span> Fonts = [];
<span class="hljs-keyword">var</span> filePath = path.resolve(<span class="hljs-string">&apos;./font&apos;</span>);

<span class="hljs-keyword">let</span> promise = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve, reject</span>) </span>{
  <span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>;
  fs.readdir(filePath,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err,files</span>)</span>{  
    <span class="hljs-keyword">if</span>(err){  
      <span class="hljs-built_in">console</span>.warn(err)  
    }<span class="hljs-keyword">else</span>{
      files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">filename</span>)</span>{
        Canvas.registerFont(filePath + <span class="hljs-string">&quot;/&quot;</span> + filename, {<span class="hljs-attr">family</span>: <span class="hljs-string">&quot;font&quot;</span> + i});
        <span class="hljs-built_in">console</span>.log(i);
        i++;
      });
    }
  });
  
});

promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;ASDF&quot;</span>);
  Fonts.forEach(<span class="hljs-function">(<span class="hljs-params">Element</span>) =&gt;</span>{
    <span class="hljs-built_in">console</span>.log(Element);
  });
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hi!&apos;</span>);


http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> params = url.parse(req.url, <span class="hljs-literal">true</span>).query;
  <span class="hljs-keyword">var</span> str = params.str + <span class="hljs-string">&apos;\r&apos;</span>,site = params.site;
  <span class="hljs-keyword">var</span> row =  <span class="hljs-number">1</span>,col = <span class="hljs-number">15</span>,width = <span class="hljs-number">1500</span>;
  row = str.length / <span class="hljs-number">15</span> + <span class="hljs-number">1</span>;
  <span class="hljs-keyword">var</span> fontsize = width/col;
  <span class="hljs-keyword">var</span> height = fontsize * row + <span class="hljs-number">200</span>;
  <span class="hljs-keyword">if</span>(height &lt; <span class="hljs-number">1000</span>){height = <span class="hljs-number">1000</span>}
  <span class="hljs-keyword">var</span> canvas = <span class="hljs-keyword">new</span> Canvas.Canvas(width, height), ctx = canvas.getContext(<span class="hljs-string">&apos;2d&apos;</span>)
  res.writeHead(<span class="hljs-number">200</span>,{<span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;image/png&quot;</span>});
  ctx.fillStyle = <span class="hljs-string">&apos;#FFF&apos;</span>;
  ctx.fillRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,canvas.width, canvas.height);
  ctx.fillStyle = <span class="hljs-string">&apos;#000&apos;</span>;
  <span class="hljs-keyword">if</span>(row &lt; <span class="hljs-number">2</span>){
    <span class="hljs-keyword">let</span> num = str.length
    fontsize = <span class="hljs-number">1200</span> / num;
    ctx.font = fontsize + <span class="hljs-string">&apos;px &quot;font&apos;</span>+ site +<span class="hljs-string">&apos;&quot;&apos;</span>;
    ctx.fillText(str,( width - num * fontsize ) / <span class="hljs-number">2</span>, (height-fontsize)/<span class="hljs-number">2</span> <span class="hljs-number">-200</span> + fontsize);
  }
  <span class="hljs-keyword">else</span>{
    ctx.font = fontsize + <span class="hljs-string">&apos;px &quot;font&apos;</span>+ site +<span class="hljs-string">&apos;&quot;&apos;</span>;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;i &lt; row ; i++){
      ctx.fillText(str.substring(i*<span class="hljs-number">15</span>,(i+<span class="hljs-number">1</span>)*<span class="hljs-number">15</span>), <span class="hljs-number">0</span>, fontsize*(i+<span class="hljs-number">1</span>));
    }
  }
  
  fs.readFile(__dirname + <span class="hljs-string">&apos;/img/brand.png&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, squid</span>)</span>{
    <span class="hljs-keyword">if</span> (err) <span class="hljs-keyword">throw</span> err;
    img = <span class="hljs-keyword">new</span> Image;
    img.src = squid;
    ctx.fillStyle = <span class="hljs-string">&apos;#42b983&apos;</span>;
    ctx.fillRect(<span class="hljs-number">0</span>,canvas.height - <span class="hljs-number">230</span>,canvas.width, <span class="hljs-number">230</span>);
    ctx.drawImage(img, canvas.width - img.width / <span class="hljs-number">2</span> - <span class="hljs-number">50</span>, canvas.height - img.height / <span class="hljs-number">2</span> - <span class="hljs-number">50</span>, img.width / <span class="hljs-number">2</span>, img.height / <span class="hljs-number">2</span>);
    res.end(canvas.toBuffer());
  });
}).listen(<span class="hljs-number">8080</span>);</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
node环境安装canvas并自定义字体

## 原文链接
[https://segmentfault.com/a/1190000015328341](https://segmentfault.com/a/1190000015328341)

