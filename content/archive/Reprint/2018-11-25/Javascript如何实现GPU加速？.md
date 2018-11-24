---
title: 'Javascript如何实现GPU加速？' 
date: 2018-11-25 2:30:06
hidden: true
slug: spavetfdk2n
categories: [reprint]
---

{{< raw >}}
<p><strong>&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x524D;&#x5F80;<a href="https://cloud.tencent.com/developer/?fromSource=waitui" rel="nofollow noreferrer" target="_blank">&#x817E;&#x8BAF;&#x4E91;+&#x793E;&#x533A;</a>&#xFF0C;&#x83B7;&#x53D6;&#x66F4;&#x591A;&#x817E;&#x8BAF;&#x6D77;&#x91CF;&#x6280;&#x672F;&#x5B9E;&#x8DF5;&#x5E72;&#x8D27;&#x54E6;~</strong></p><blockquote>&#x672C;&#x6587;&#x7531;<a href="https://cloud.tencent.com/developer/user/1069749" rel="nofollow noreferrer" target="_blank">&#x817E;&#x8BAF;Bugly</a>&#x53D1;&#x8868;&#x4E8E;<a href="https://cloud.tencent.com/developer/column/1535" rel="nofollow noreferrer" target="_blank">&#x4E91;+&#x793E;&#x533A;&#x4E13;&#x680F;</a></blockquote><h1 id="articleHeader0"><strong>1. &#x4EC0;&#x4E48;&#x662F;Javascript&#x5B9E;&#x73B0;GPU&#x52A0;&#x901F;&#xFF1F;</strong></h1><p>CPU&#x4E0E;GPU&#x8BBE;&#x8BA1;&#x76EE;&#x6807;&#x4E0D;&#x540C;&#xFF0C;&#x5BFC;&#x81F4;&#x5B83;&#x4EEC;&#x4E4B;&#x95F4;&#x5185;&#x90E8;&#x7ED3;&#x6784;&#x5DEE;&#x5F02;&#x5F88;&#x5927;&#x3002; CPU&#x9700;&#x8981;&#x5E94;&#x5BF9;&#x901A;&#x7528;&#x573A;&#x666F;&#xFF0C;&#x5185;&#x90E8;&#x7ED3;&#x6784;&#x975E;&#x5E38;&#x590D;&#x6742;&#x3002; &#x800C;GPU&#x5F80;&#x5F80;&#x9762;&#x5411;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7EDF;&#x4E00;&#xFF0C;&#x4E14;&#x76F8;&#x4E92;&#x65E0;&#x4F9D;&#x8D56;&#x7684;&#x8BA1;&#x7B97;&#x3002; &#x6240;&#x4EE5;&#xFF0C;&#x6211;&#x4EEC;&#x5728;Web&#x4E0A;&#x5B9E;&#x73B0;3D&#x573A;&#x666F;&#x65F6;&#xFF0C;&#x901A;&#x5E38;&#x4F7F;&#x7528;WebGL&#x5229;&#x7528;GPU&#x8FD0;&#x7B97;&#xFF08;&#x5927;&#x91CF;&#x9876;&#x70B9;&#xFF09;&#x3002; &#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x53EA;&#x662F;&#x901A;&#x7528;&#x7684;&#x8BA1;&#x7B97;&#x573A;&#x666F;&#x5462;&#xFF1F;&#x6BD4;&#x5982;&#x5904;&#x7406;&#x56FE;&#x7247;&#x4E2D;&#x5927;&#x91CF;&#x50CF;&#x7D20;&#x4FE1;&#x606F;&#xFF0C;&#x6211;&#x4EEC;&#x6709;&#x529E;&#x6CD5;&#x4F7F;&#x7528;GPU&#x8D44;&#x6E90;&#x5417;&#xFF1F;&#x8FD9;&#x6B63;&#x662F;&#x672C;&#x6587;&#x8981;&#x8BB2;&#x7684;&#xFF0C;GPU&#x901A;&#x7528;&#x8BA1;&#x7B97;&#xFF0C;&#x7B80;&#x79F0;GPGPU&#x3002;</p><h1 id="articleHeader1"><strong>2. &#x5B9E;&#x4F8B;&#x6F14;&#x793A;&#xFF1A;&#x8272;&#x5757;&#x8BC6;&#x522B;</strong></h1><p>&#x5982;&#x4E0B;&#x56FE;&#x6240;&#x793A;&#xFF0C;&#x6211;&#x4EEC;&#x8BC6;&#x522B;&#x56FE;&#x7247;&#x4E2D;&#x5F69;&#x8679;&#x7CD6;&#x8272;&#x5757;&#xFF0C;&#x7ED9;&#x7CD6;&#x679C;&#x6DFB;&#x52A0;&#x8868;&#x60C5;&#x3002;</p><p><span class="img-wrap"><img data-src="https://ask.qcloudimg.com/http-save/yehe-1069749/fwhiwrxzk4.jpeg?imageView2/2/w/1620" src="https://static.alili.techhttps://ask.qcloudimg.com/http-save/yehe-1069749/fwhiwrxzk4.jpeg?imageView2/2/w/1620" alt="img" title="img" style="cursor:pointer"></span></p><p><span class="img-wrap"><img data-src="https://ask.qcloudimg.com/http-save/yehe-1069749/d82l9pfket.jpeg?imageView2/2/w/1620" src="https://static.alili.techhttps://ask.qcloudimg.com/http-save/yehe-1069749/d82l9pfket.jpeg?imageView2/2/w/1620" alt="img" title="img" style="cursor:pointer"></span></p><h2 id="articleHeader2"><strong>2.1 &#x5B9E;&#x4F8B;&#x5730;&#x5740;&#xFF08;&#x6253;&#x5F00;&#x9875;&#x9762;&#x540E;&#xFF0C;&#x4F9D;&#x6B21;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x201C;&#x4F7F;&#x7528;CPU&#x8BA1;&#x7B97;&#x201D;&#x3001;&#x201C;&#x4F7F;&#x7528;GPU&#x8BA1;&#x7B97;&#x201D;&#xFF09;</strong></h2><p><a href="http://tgideas.qq.com/2018/brucewan/gpgpu.html" rel="nofollow noreferrer" target="_blank">http://tgideas.qq.com/2018/br...</a></p><p><span class="img-wrap"><img data-src="https://ask.qcloudimg.com/http-save/yehe-1069749/saoer8zlhl.png?imageView2/2/w/1620" src="https://static.alili.techhttps://ask.qcloudimg.com/http-save/yehe-1069749/saoer8zlhl.png?imageView2/2/w/1620" alt="img" title="img" style="cursor:pointer"></span></p><h2 id="articleHeader3"><strong>2.2 &#x8FD0;&#x884C;&#x4EE3;&#x7801;</strong></h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var rgb2hsv = function(r, g, b) {
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;
        switch (max) {        
        case min: h = 0; break;        
        case r: h = (g - b) + d * (g &lt; b ? 6: 0); h /= 6 * d; break;        
        case g: h = (b - r) + d * 2; h /= 6 * d; break;        
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }    
     return {
        h: self.hueIndexs[parseInt(h*360)],
        s: s,
        v: v
    }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs swift"><code><span class="hljs-keyword">var</span> rgb2hsv = function(r, g, b) {
    <span class="hljs-keyword">var</span> <span class="hljs-built_in">max</span> = <span class="hljs-type">Math</span>.<span class="hljs-built_in">max</span>(r, g, b), <span class="hljs-built_in">min</span> = <span class="hljs-type">Math</span>.<span class="hljs-built_in">min</span>(r, g, b),
        d = <span class="hljs-built_in">max</span> - <span class="hljs-built_in">min</span>,
        h,
        s = (<span class="hljs-built_in">max</span> === <span class="hljs-number">0</span> ? <span class="hljs-number">0</span> : d / <span class="hljs-built_in">max</span>),
        v = <span class="hljs-built_in">max</span> / <span class="hljs-number">255</span>;
        <span class="hljs-keyword">switch</span> (<span class="hljs-built_in">max</span>) {        
        <span class="hljs-keyword">case</span> <span class="hljs-built_in">min</span>: h = <span class="hljs-number">0</span>; <span class="hljs-keyword">break</span>;        
        <span class="hljs-keyword">case</span> r: h = (g - b) + d * (g &lt; b ? <span class="hljs-number">6</span>: <span class="hljs-number">0</span>); h /= <span class="hljs-number">6</span> * d; <span class="hljs-keyword">break</span>;        
        <span class="hljs-keyword">case</span> g: h = (b - r) + d * <span class="hljs-number">2</span>; h /= <span class="hljs-number">6</span> * d; <span class="hljs-keyword">break</span>;        
        <span class="hljs-keyword">case</span> b: h = (r - g) + d * <span class="hljs-number">4</span>; h /= <span class="hljs-number">6</span> * d; <span class="hljs-keyword">break</span>;
    }    
     <span class="hljs-keyword">return</span> {
        h: <span class="hljs-keyword">self</span>.hueIndexs[parseInt(h*<span class="hljs-number">360</span>)],
        s: s,
        v: v
    }
};</code></pre><p><strong>&#x8FD0;&#x884C;&#x6B21;&#x6570;&#xFF1A;262144&#x6B21;</strong></p><h2 id="articleHeader4"><strong>2.3 &#x6D4B;&#x8BD5;&#x7ED3;&#x8BBA;</strong></h2><p>&#x5B9E;&#x4F8B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5206;&#x522B;&#x4F7F;&#x7528;GPU&#x548C;CPU&#x8FDB;&#x884C;&#x8272;&#x76F8;&#x8F6C;&#x6362;&#xFF08;&#x9632;&#x6B62;&#x5149;&#x7EBF;&#x5F71;&#x54CD;&#x8BC6;&#x522B;&#x51C6;&#x786E;&#x5EA6;&#xFF09;&#xFF0C;&#x5176;&#x4F59;&#x6B65;&#x9AA4;&#x5747;&#x4E00;&#x81F4;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/bVbc6sp" src="https://static.alili.tech/img/bVbc6sp" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><h2 id="articleHeader5"><strong>2.4 &#x4F7F;&#x7528;GPGPU&#x610F;&#x4E49;</strong></h2><p>GPU&#x4E0E;CPU&#x6570;&#x636E;&#x4F20;&#x8F93;&#x8FC7;&#x7A0B;&#xFF0C;&#x4E0E;GPU&#x5B9E;&#x9645;&#x8FD0;&#x7B97;&#x8017;&#x65F6;&#x76F8;&#x5F53;&#xFF0C;&#x6240;&#x4EE5;&#x4F7F;&#x7528;GPU&#x8FD0;&#x7B97;&#x4F20;&#x8F93;&#x6210;&#x672C;&#x8FC7;&#x9AD8;&#xFF0C;&#x5B9E;&#x6D4B;&#x5728;Android&#x4E2D;&#x5177;&#x6709;&#x8F83;&#x5927;&#x4F18;&#x52BF;&#x3002;</p><p>&#x672C;&#x6D4B;&#x8BD5;&#x6848;&#x4F8B;&#x662F;&#x4ECE;webAR&#x9879;&#x76EE;&#x4E2D;&#x62BD;&#x53D6;&#xFF0C;&#x9700;&#x8981;&#x5B9E;&#x65F6;&#x8DDF;&#x8E2A;&#x7528;&#x6237;&#x6444;&#x50CF;&#x5934;&#x5904;&#x7406;&#x89C6;&#x9891;&#x6D41;&#xFF08;256*256&#xFF09;&#xFF0C;&#x4F7F;&#x7528;GPU&#x8BA1;&#x7B97;&#x610F;&#x4E49;&#x975E;&#x5E38;&#x5927;&#xFF0C;&#x5426;&#x5219;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x5B9E;&#x65F6;&#x8DDF;&#x8E2A;&#x3002;</p><h1 id="articleHeader6"><strong>3. &#x5982;&#x4F55;&#x5B9E;&#x73B0;GPU&#x901A;&#x7528;&#x8BA1;&#x7B97;&#xFF1F;</strong></h1><h2 id="articleHeader7"><strong>3.1 &#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x4E00;&#x5F20;&#x6D41;&#x7A0B;&#x56FE;&#xFF0C;&#x6F14;&#x793A;&#x539F;&#x7406;</strong></h2><p><span class="img-wrap"><img data-src="https://ask.qcloudimg.com/http-save/yehe-1069749/mqmalfv67a.jpeg?imageView2/2/w/1620" src="https://static.alili.techhttps://ask.qcloudimg.com/http-save/yehe-1069749/mqmalfv67a.jpeg?imageView2/2/w/1620" alt="img" title="img" style="cursor:pointer"></span></p><h2 id="articleHeader8"><strong>3.2 &#x5B9E;&#x73B0;</strong></h2><p><strong>3.2.1 &#x521B;&#x5EFA;&#x9876;&#x70B9;&#x7740;&#x8272;&#x5668;&#xFF0C;&#x53EA;&#x662F;&#x4F20;&#x9012;&#x4E86;&#x8D34;&#x56FE;&#x5750;&#x6807;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="attribute vec4 position;
varying vec2 vCoord;void main() {
    vCoord = position.xy * 0.5 + 0.5;
    gl_Position = position;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs glsl"><code><span class="hljs-keyword">attribute</span> <span class="hljs-type">vec4</span> position;
<span class="hljs-keyword">varying</span> <span class="hljs-type">vec2</span> vCoord;<span class="hljs-type">void</span> main() {
    vCoord = position.xy * <span class="hljs-number">0.5</span> + <span class="hljs-number">0.5</span>;
    <span class="hljs-built_in">gl_Position</span> = position;
}</code></pre><p><strong>3.2.2 &#x521B;&#x5EFA;&#x7247;&#x5143;&#x7740;&#x8272;&#x5668;&#xFF0C;&#x6839;&#x636E;&#x8D34;&#x56FE;&#x5750;&#x6807;&#x8D34;&#x56FE;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="precision highp float;
varying vec2 vCoord;
uniform sampler2D map;void main(void) {
    vec4 color = texture2D(map, vCoord);
    gl_FragColor = color;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs glsl"><code><span class="hljs-keyword">precision</span> <span class="hljs-keyword">highp</span> <span class="hljs-type">float</span>;
<span class="hljs-keyword">varying</span> <span class="hljs-type">vec2</span> vCoord;
<span class="hljs-keyword">uniform</span> <span class="hljs-type">sampler2D</span> map;<span class="hljs-type">void</span> main(<span class="hljs-type">void</span>) {
    <span class="hljs-type">vec4</span> color = <span class="hljs-built_in">texture2D</span>(map, vCoord);
    <span class="hljs-built_in">gl_FragColor</span> = color;
}</code></pre><p><strong>3.3.3 &#x6839;&#x636E;&#x5982;&#x4E0A;&#x7740;&#x8272;&#x5668;&#x4EE3;&#x7801;&#xFF0C;&#x521B;&#x5EFA;&#x7A0B;&#x5E8F;&#x5BF9;&#x8C61;&#xFF0C;&#x53D8;&#x91CF;code&#x662F;&#x6211;&#x4EEC;&#x8981;&#x4F20;&#x5165;&#x7684;&#x7528;&#x4E8E;&#x8BA1;&#x7B97;&#x7684;&#x4EE3;&#x7801;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7ED1;&#x5B9A;&#x5E76;&#x7F16;&#x8BD1;&#x7740;&#x8272;&#x5668;&#x7A0B;&#x5E8F;var vertexShaderSource = &apos;...&apos;;
var fragmentShaderSource = &apos;...&apos; + code + &apos;...&apos;;
var vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertexShaderSource);
gl.compileShader(vertexShader);
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragmentShaderSource);
gl.compileShader(fragmentShader);  
              
// &#x521B;&#x5EFA;&#x7A0B;&#x5E8F;&#x5BF9;&#x8C61;
var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x7ED1;&#x5B9A;&#x5E76;&#x7F16;&#x8BD1;&#x7740;&#x8272;&#x5668;&#x7A0B;&#x5E8F;var vertexShaderSource = &apos;...&apos;;</span>
<span class="hljs-keyword">var</span> fragmentShaderSource = &apos;...&apos; + code + &apos;...&apos;;
<span class="hljs-keyword">var</span> vertexShader = <span class="hljs-keyword">gl</span>.createShader(<span class="hljs-keyword">gl</span>.VERTEX_SHADER);
<span class="hljs-keyword">gl</span>.shaderSource(vertexShader, vertexShaderSource);
<span class="hljs-keyword">gl</span>.compileShader(vertexShader);
<span class="hljs-keyword">var</span> fragmentShader = <span class="hljs-keyword">gl</span>.createShader(<span class="hljs-keyword">gl</span>.FRAGMENT_SHADER);
<span class="hljs-keyword">gl</span>.shaderSource(fragmentShader, fragmentShaderSource);
<span class="hljs-keyword">gl</span>.compileShader(fragmentShader);  
              
<span class="hljs-comment">// &#x521B;&#x5EFA;&#x7A0B;&#x5E8F;&#x5BF9;&#x8C61;</span>
<span class="hljs-keyword">var</span> <span class="hljs-keyword">program</span> = <span class="hljs-keyword">gl</span>.createProgram();
<span class="hljs-keyword">gl</span>.attachShader(<span class="hljs-keyword">program</span>, vertexShader);
<span class="hljs-keyword">gl</span>.attachShader(<span class="hljs-keyword">program</span>, fragmentShader);
<span class="hljs-keyword">gl</span>.linkProgram(<span class="hljs-keyword">program</span>);
<span class="hljs-keyword">gl</span>.useProgram(<span class="hljs-keyword">program</span>);</code></pre><p><strong>3.3.4 &#x4F20;&#x5165;&#x9876;&#x70B9;&#x6570;&#x636E;&#xFF0C;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x9762;&#x8986;&#x76D6;&#x6574;&#x4E2A;&#x753B;&#x5E03;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9876;&#x70B9;&#x6570;&#x636E;&#x4F20;&#x8F93;
var vertices = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0]);
var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
var aPosition = gl.getAttribLocation(program, &apos;position&apos;);
gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(aPosition);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-comment">// &#x9876;&#x70B9;&#x6570;&#x636E;&#x4F20;&#x8F93;</span>
<span class="hljs-keyword">var</span> vertices = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0]);
<span class="hljs-keyword">var</span> vertexBuffer = <span class="hljs-keyword">gl</span>.createBuffer();
<span class="hljs-keyword">gl</span>.bindBuffer(<span class="hljs-keyword">gl</span>.ARRAY_BUFFER, vertexBuffer);
<span class="hljs-keyword">gl</span>.bufferData(<span class="hljs-keyword">gl</span>.ARRAY_BUFFER, vertices, <span class="hljs-keyword">gl</span>.STATIC_DRAW);
<span class="hljs-keyword">var</span> aPosition = <span class="hljs-keyword">gl</span>.getAttribLocation(<span class="hljs-keyword">program</span>, &apos;position&apos;);
<span class="hljs-keyword">gl</span>.vertexAttribPointer(aPosition, 2, <span class="hljs-keyword">gl</span>.FLOAT, false, 0, 0);
<span class="hljs-keyword">gl</span>.enableVertexAttribArray(aPosition);</code></pre><p><strong>3.3.5 &#x4F20;&#x5165;&#x539F;&#x59CB;&#x6570;&#x636E;&#xFF0C;&#x672C;&#x4F8B;&#x4E2D;&#x4F20;&#x5165;&#x6211;&#x8981;&#x5904;&#x7406;&#x7684;&#x56FE;&#x50CF;&#x6570;&#x636E;&#xFF0C;&#x4F5C;&#x4E3A;&#x8D34;&#x56FE;&#xFF0C;&#x6700;&#x7EC8;&#x7ED8;&#x5236;&#x5230;&#x5C4F;&#x5E55;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gl = this.gl;
var program = this.program;
var texture = gl.createTexture();
var uMap = gl.getUniformLocation(program, &apos;map&apos;);

gl.activeTexture(gl.TEXTURE0);
gl.bindTexture(gl.TEXTURE_2D, texture);

gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.generateMipmap(gl.TEXTURE_2D);

gl.uniform1i(uMap, 0);      
          
// &#x7ED8;&#x5236;
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">gl</span> = this.<span class="hljs-keyword">gl</span>;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">program</span> = this.<span class="hljs-keyword">program</span>;
<span class="hljs-keyword">var</span> texture = <span class="hljs-keyword">gl</span>.createTexture();
<span class="hljs-keyword">var</span> uMap = <span class="hljs-keyword">gl</span>.getUniformLocation(<span class="hljs-keyword">program</span>, &apos;map&apos;);

<span class="hljs-keyword">gl</span>.activeTexture(<span class="hljs-keyword">gl</span>.TEXTURE0);
<span class="hljs-keyword">gl</span>.bindTexture(<span class="hljs-keyword">gl</span>.TEXTURE_2D, texture);

<span class="hljs-keyword">gl</span>.texImage2D(<span class="hljs-keyword">gl</span>.TEXTURE_2D, 0, <span class="hljs-keyword">gl</span>.RGBA, <span class="hljs-keyword">gl</span>.RGBA, <span class="hljs-keyword">gl</span>.UNSIGNED_BYTE, canvas);
<span class="hljs-keyword">gl</span>.texParameteri(<span class="hljs-keyword">gl</span>.TEXTURE_2D, <span class="hljs-keyword">gl</span>.TEXTURE_MAG_FILTER, <span class="hljs-keyword">gl</span>.NEAREST);
<span class="hljs-keyword">gl</span>.texParameteri(<span class="hljs-keyword">gl</span>.TEXTURE_2D, <span class="hljs-keyword">gl</span>.TEXTURE_MIN_FILTER, <span class="hljs-keyword">gl</span>.NEAREST);
<span class="hljs-keyword">gl</span>.texParameteri(<span class="hljs-keyword">gl</span>.TEXTURE_2D, <span class="hljs-keyword">gl</span>.TEXTURE_WRAP_S, <span class="hljs-keyword">gl</span>.CLAMP_TO_EDGE);
<span class="hljs-keyword">gl</span>.texParameteri(<span class="hljs-keyword">gl</span>.TEXTURE_2D, <span class="hljs-keyword">gl</span>.TEXTURE_WRAP_T, <span class="hljs-keyword">gl</span>.CLAMP_TO_EDGE);
<span class="hljs-keyword">gl</span>.generateMipmap(<span class="hljs-keyword">gl</span>.TEXTURE_2D);

<span class="hljs-keyword">gl</span>.uniform1i(uMap, 0);      
          
<span class="hljs-comment">// &#x7ED8;&#x5236;</span>
<span class="hljs-keyword">gl</span>.clearColor(0, 0, 0, 1);
<span class="hljs-keyword">gl</span>.<span class="hljs-keyword">clear</span>(<span class="hljs-keyword">gl</span>.COLOR_BUFFER_BIT);
<span class="hljs-keyword">gl</span>.drawArrays(<span class="hljs-keyword">gl</span>.TRIANGLE_FAN, 0, 4);</code></pre><p><strong>3.3.6 &#x4ECE;&#x6700;&#x7EC8;&#x7ED8;&#x5236;&#x7684;&#x753B;&#x9762;&#x4E0A;&#xFF0C;&#x83B7;&#x53D6;&#x989C;&#x8272;&#x4FE1;&#x606F;&#x4F5C;&#x4E3A;&#x6700;&#x7EC8;&#x5904;&#x7406;&#x7ED3;&#x679C;&#x6570;&#x636E;&#x3002;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> pixels = new Uint8Array(<span class="hljs-keyword">gl</span>.drawingBufferWidth * <span class="hljs-keyword">gl</span>.drawingBufferHeight * 4);
<span class="hljs-keyword">gl</span>.readPixels(0, 0, <span class="hljs-keyword">gl</span>.drawingBufferWidth, <span class="hljs-keyword">gl</span>.drawingBufferHeight, <span class="hljs-keyword">gl</span>.RGBA, <span class="hljs-keyword">gl</span>.UNSIGNED_BYTE, pixels);</code></pre><p><strong>3.3.7 &#x5B8C;&#x6574;&#x4EE3;&#x7801;&#xFF1A;</strong> <a href="http://tgideas.qq.com/2018/brucewan/gpu.js" rel="nofollow noreferrer" target="_blank">http://tgideas.qq.com/2018/br...</a></p><p>&#x5176;&#x5B9E;&#x6E05;&#x695A;&#x539F;&#x7406;&#x540E;&#xFF0C;&#x6574;&#x4F53;&#x5B9E;&#x73B0;&#x6BD4;&#x8F83;&#x7B80;&#x5355;&#x3002; &#x4F46;&#x662F;&#x5BF9;&#x4E8E;&#x4E0D;&#x4E86;&#x89E3;WebGL&#x7684;&#x540C;&#x5B66;&#x6765;&#x8BF4;&#xFF0C;&#x7406;&#x89E3;&#x4E0A;&#x6709;&#x4E00;&#x5B9A;&#x96BE;&#x5EA6;&#xFF0C;&#x6211;&#x540E;&#x7EED;&#x51C6;&#x5907;&#x5199;&#x4E00;&#x4E2A;&#x7CFB;&#x5217;&#x7684;WebGL&#x6559;&#x7A0B;&#xFF0C;&#x6709;&#x5174;&#x8DA3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x4EE5;&#x5173;&#x6CE8;&#x3002;</p><h1 id="articleHeader9"><strong>4. &#x6709;&#x65E0;&#x73B0;&#x6210;&#x7C7B;&#x5E93;&#xFF1F;</strong></h1><p>&#x5927;&#x5BB6;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;&#x6211;&#x5B9E;&#x73B0;&#x7684;gpu.js&#x4E2D;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x5C06;javascript&#x8F6C;&#x6362;&#x6210;&#x7740;&#x8272;&#x5668;&#x8BED;&#x8A00;&#xFF08;&#x7C7B;C&#xFF09;&#xFF0C;&#x800C;&#x662F;&#x7528;&#x6237;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x7740;&#x8272;&#x5668;&#x4EE3;&#x7801;&#x3002;&#x4F46;&#x662F;github&#x4E0A;&#x5DF2;&#x6709;&#x5C06;javascript&#x8F6C;&#x6362;&#x4E3A;&#x7740;&#x8272;&#x5668;&#x8BED;&#x8A00;&#x7684;&#x5E93;&#x3002; <a href="https://github.com/gpujs/gpu.js" rel="nofollow noreferrer" target="_blank">https://github.com/gpujs/gpu.js</a></p><p><strong>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x5462;&#xFF1F;</strong></p><ol><li>&#x7B80;&#x5355;&#x7684;&#x4F7F;&#x7528;&#xFF0C;2k&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x4E0D;&#x60F3;&#x5F15;&#x5165;200k&#x7684;&#x5E93;&#xFF1B;</li><li>&#x6570;&#x636E;&#x8F93;&#x5165;&#x8F93;&#x51FA;&#x53EF;&#x4EE5;&#x7531;&#x81EA;&#x5DF1;&#x7075;&#x6D3B;&#x63A7;&#x5236;&#xFF1B;</li><li>&#x7740;&#x8272;&#x5668;&#x8BED;&#x8A00;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x7279;&#x522B;&#x53EA;&#x662F;&#x4F7F;&#x7528;&#x57FA;&#x7840;&#x8FD0;&#x7B97;&#x903B;&#x8F91;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x6CA1;&#x5FC5;&#x8981;&#x7531;&#x5E93;&#x4ECE;Javascript&#x8F6C;&#x6362;&#x3002;</li></ol><p>&#x6CA1;&#x6709;WebGL&#x57FA;&#x7840;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x5EFA;&#x8BAE;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<a href="https://github.com/gpujs/gpu.js" rel="nofollow noreferrer" target="_blank">https://github.com/gpujs/gpu.js</a> &#xFF0C;&#x4ECE;&#x672C;&#x6587;&#x7406;&#x89E3;&#x6574;&#x4F53;&#x903B;&#x8F91;&#xFF1B; &#x6709;&#x4E00;&#x5B9A;&#x57FA;&#x7840;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x5EFA;&#x8BAE;&#x7531;<a href="http://tgideas.qq.com/2018/brucewan/gpu.js" rel="nofollow noreferrer" target="_blank">http://tgideas.qq.com/2018/br...</a> &#x81EA;&#x5DF1;&#x5B9A;&#x5236;&#xFF0C;&#x66F4;&#x4E3A;&#x7075;&#x6D3B;&#x3002;</p><blockquote><strong>&#x95EE;&#x7B54;</strong><br><a href="https://cloud.tencent.com/developer/ask/122850?fromSource=waitui" rel="nofollow noreferrer" target="_blank">&#x662F;&#x5426;&#x6709;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x4EE5;&#x7F16;&#x7A0B;&#x65B9;&#x5F0F;&#x6D4B;&#x8BD5;&#x6D4F;&#x89C8;&#x5668;GPU&#x52A0;&#x901F;&#xFF1F;</a><br><strong>&#x76F8;&#x5173;&#x9605;&#x8BFB;</strong><br><a href="https://cloud.tencent.com/developer/article/1081504?fromSource=waitui" rel="nofollow noreferrer" target="_blank">&#x6709;&#x54EA;&#x4E9B;&#x4E3B;&#x6D41;&#x7684;&#x79D1;&#x5B66;&#x8BA1;&#x7B97;&#x53EF;&#x4EE5;&#x5229;&#x7528;GPU&#x52A0;&#x901F;&#xFF1F;</a><br><a href="https://cloud.tencent.com/developer/article/1118470?fromSource=waitui" rel="nofollow noreferrer" target="_blank">&#x5982;&#x4F55;&#x4F7F;&#x7528;JavaScript&#x5B9E;&#x73B0;GPU&#x52A0;&#x901F;&#x795E;&#x7ECF;&#x7F51;&#x7EDC;</a><br><a href="https://cloud.tencent.com/developer/article/1084956?fromSource=waitui" rel="nofollow noreferrer" target="_blank">CPU&#x4E0E;GPU&#x533A;&#x522B;&#x5927;&#x63ED;&#x79D8;</a></blockquote><p><strong>&#x6B64;&#x6587;&#x5DF2;&#x7531;&#x4F5C;&#x8005;&#x6388;&#x6743;&#x817E;&#x8BAF;&#x4E91;+&#x793E;&#x533A;&#x53D1;&#x5E03;&#xFF0C;&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<a href="https://cloud.tencent.com/developer/article/1148782?fromSource=waitui" rel="nofollow noreferrer" target="_blank">https://cloud.tencent.com/dev...</a></strong></p><p><strong>&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x524D;&#x5F80;<a href="https://cloud.tencent.com/developer/?fromSource=waitui" rel="nofollow noreferrer" target="_blank">&#x817E;&#x8BAF;&#x4E91;+&#x793E;&#x533A;</a>&#x6216;&#x5173;&#x6CE8;&#x4E91;&#x52A0;&#x793E;&#x533A;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#xFF08;QcloudCommunity&#xFF09;&#xFF0C;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x83B7;&#x53D6;&#x66F4;&#x591A;&#x6D77;&#x91CF;&#x6280;&#x672F;&#x5B9E;&#x8DF5;&#x5E72;&#x8D27;&#x54E6;~</strong></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Javascript如何实现GPU加速？

## 原文链接
[https://segmentfault.com/a/1190000015476553](https://segmentfault.com/a/1190000015476553)

