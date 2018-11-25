---
title: 'mixin配合class实现多继承的绝佳妙用' 
date: 2018-11-26 2:30:10
hidden: true
slug: ep7t5i4ufhb
categories: [reprint]
---

{{< raw >}}
<p><a href="https://github.com/ronffy/mixin-class" rel="nofollow noreferrer" target="_blank">Github &#x6E90;&#x7801;&#x5730;&#x5740;</a></p><h2 id="articleHeader0">&#x4EC0;&#x4E48;&#x662F;mixin</h2><p>mixin&#x4E00;&#x822C;&#x7FFB;&#x8BD1;&#x4E3A;&#x201C;&#x6DF7;&#x5165;&#x201D;&#x3001;&#x201C;&#x6DF7;&#x5408;&#x201D;&#xFF0C;<br>&#x65E9;&#x671F;&#x4E00;&#x822C;&#x89E3;&#x91CA;&#x4E3A;&#xFF1A;&#x628A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x62F7;&#x8D1D;&#x5230;&#x53E6;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x4E0A;&#xFF1B;<br>&#x4E5F;&#x53EF;&#x4EE5;&#x7B80;&#x5355;&#x7406;&#x89E3;&#x4E3A;&#x80FD;&#x591F;&#x88AB;&#x7EE7;&#x627F;&#x7684;&#x7C7B;&#xFF0C;<br>&#x6700;&#x7EC8;&#x76EE;&#x7684;&#x662F;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x7684;&#x590D;&#x7528;&#x3002;</p><h2 id="articleHeader1">&#x4ECE;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x8BF4;&#x8D77;</h2><p>&#x4E3A;&#x4E86;&#x4F7F;&#x4F60;&#x80FD;&#x591F;&#x6700;&#x5FEB;&#x7684;&#x6E05;&#x695A;&#x6211;&#x5728;&#x8BF4;&#x4EC0;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x4ECE;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#x8BF4;&#x8D77;&#xFF1A;</p><p>&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x4E2D;&#x6709;&#x591A;&#x4E2A;&#x5F39;&#x5C42;&#x9700;&#x6C42;&#xFF1B;<br>&#x4E00;&#x4E9B;&#x662F;&#x516C;&#x5171;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;&#x70B9;&#x51FB;&#x5173;&#x95ED;&#x6309;&#x94AE;&#x5173;&#x95ED;&#x5F39;&#x5C42;&#xFF1B;<br>&#x4E00;&#x4E9B;&#x5F39;&#x5C42;&#x662F;&#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x7684;&#xFF0C;&#x4E14;&#x6709;&#x8499;&#x5C42;&#xFF1B;<br>&#x4E00;&#x4E9B;&#x5F39;&#x5C42;&#x662F;&#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x7684;&#xFF1B;<br>&#x5176;&#x4ED6;&#x90FD;&#x662F;&#x4E1A;&#x52A1;&#x65B9;&#x6CD5;&#xFF0C;&#x65E0;&#x53EF;&#x590D;&#x7528;&#x6027;&#x3002;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x5148;&#x5728;&#x5FC3;&#x91CC;&#x60F3;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x4F60;&#xFF0C;&#x4F60;&#x4F1A;&#x600E;&#x6837;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x9700;&#x6C42;&#xFF1F;</p><h2 id="articleHeader2">&#x8111;&#x6D77;&#x4E2D;&#x89C4;&#x5212;&#x4E0B;</h2><p>&#x6211;&#x4EEC;&#x4E3A;&#x516C;&#x5171;&#x65B9;&#x6CD5;&#x5199;&#x4E2A;&#x7C7B;&#xFF1A;<code>BaseModal</code><br>&#x4E3A;&#x53EF;&#x62D6;&#x52A8;&#x7684;&#x5F39;&#x5C42;&#x5199;&#x4E2A;&#x7C7B;&#xFF1A;<code>DragModal</code><br>&#x4E3A;&#x53EF;&#x7F29;&#x653E;&#x7684;&#x5F39;&#x5C42;&#x5199;&#x4E2A;&#x7C7B;&#xFF1A;<code>ScaleModal</code><br>&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x5199;&#x4E2A;&#x7C7B;&#xFF1A;<code>CustomModal</code></p><p>&#x753B;&#x4E2A;&#x8111;&#x56FE;&#x7684;&#x8BDD;&#xFF0C;&#x4F1A;&#x662F;&#x4E0B;&#x9762;&#x56FE;&#x7247;&#x4E2D;&#x7684;&#x6837;&#x5B50;&#xFF1A;</p><p><span class="img-wrap"><img data-src="https://user-gold-cdn.xitu.io/2018/6/26/1643ab34a4df3e86?w=706&amp;h=568&amp;f=png&amp;s=52800" src="https://static.alili.techhttps://user-gold-cdn.xitu.io/2018/6/26/1643ab34a4df3e86?w=706&amp;h=568&amp;f=png&amp;s=52800" alt="&#x4E0D;&#x540C;&#x7C7B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x56FE;" title="&#x4E0D;&#x540C;&#x7C7B;&#x4E4B;&#x95F4;&#x7684;&#x5173;&#x7CFB;&#x56FE;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader3">extends&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E0B;</h2><h3 id="articleHeader4">&#x770B;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x516C;&#x5171;&#x65B9;&#x6CD5;
class BaseModal {
  close(){
    console.log(&apos;close&apos;);
  }
}

// &#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;
class DragModal extends BaseModal {
  hasLayer = true;
  drag() {
    console.log(&apos;drag&apos;);
  }
}

// &#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;
class ScaleModal extends BaseModal {
  scale() {
    console.log(&apos;scale&apos;);
  }
}

// &#x4E1A;&#x52A1;&#x65B9;&#x6CD5;
class CustomModal extends DragModal {
  close(){
    console.log(&apos;custom-close&apos;);
  }
  do() {
    console.log(&apos;do&apos;);
  }
}

let c = new CustomModal();
c.close(); // custom-close
c.drag(); // drag
c.do(); // do
c.hasLayer; // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x516C;&#x5171;&#x65B9;&#x6CD5;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseModal</span> </span>{
  close(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;close&apos;</span>);
  }
}

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DragModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseModal</span> </span>{
  hasLayer = <span class="hljs-literal">true</span>;
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;drag&apos;</span>);
  }
}

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScaleModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseModal</span> </span>{
  scale() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;scale&apos;</span>);
  }
}

<span class="hljs-comment">// &#x4E1A;&#x52A1;&#x65B9;&#x6CD5;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">DragModal</span> </span>{
  close(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;custom-close&apos;</span>);
  }
  <span class="hljs-keyword">do</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;do&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> CustomModal();
c.close(); <span class="hljs-comment">// custom-close</span>
c.drag(); <span class="hljs-comment">// drag</span>
c.do(); <span class="hljs-comment">// do</span>
c.hasLayer; <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader5">&#x629B;&#x51FA;&#x95EE;&#x9898;</h3><ul><li>&#x5982;&#x4F55;&#x4F7F;<code>CustomModal</code>&#x80FD;&#x591F;&#x540C;&#x65F6;&#x7EE7;&#x627F;<code>DragModal</code>&#x548C;<code>ScaleModal</code>&#xFF1F;</li><li>&#x67D0;&#x4E2A;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x5E0C;&#x671B;&#x4E0D;&#x8986;&#x76D6;&#xFF0C;&#x800C;&#x662F;&#x90FD;&#x6267;&#x884C;</li></ul><h2 id="articleHeader6">&#x8BD5;&#x8BD5;&#x65E9;&#x671F;&#x7684;mixin&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x591A;&#x7EE7;&#x627F;</h2><h3 id="articleHeader7">&#x770B;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;
class DragModal extends BaseModal {
  hasLayer = true;
  drag() {
    console.log(&apos;drag&apos;);
  }
}

// &#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;
class ScaleModal extends BaseModal {
  scale() {
    console.log(&apos;scale&apos;);
  }
}

// &#x83B7;&#x53D6;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;
function getPrototypes(ClassPrototype) {
  return Object.getOwnPropertyNames(ClassPrototype).slice(1);
}

function mix(...mixins){
  return function(target){
    if (!mixins || !Array.isArray(mixins)) return target;
    let cp = target.prototype;
    for (let C of mixins) {
      let mp = C.prototype;
      for (let m of getPrototypes(mp)) {
        cp[m] = mp[m];
      }
    }
  }
}
@mix(DragModal, ScaleModal)
class CustomModal {
  scale(){
    console.log(&apos;custom-scale&apos;);
  } 
  do() {
    console.log(&apos;do&apos;);
  }
}
let c = new CustomModal();
c.close(); // &#x62A5;&#x9519;&#xFF0C;&#x56E0;&#x4E3A;dobase&#x6CA1;&#x5728;A&#x6216;B&#x7684;prototype&#x4E0A;&#xFF0C;&#x800C;&#x662F;&#x5728;A.prototype.__proto__&#x4E0A;
c.drag(); // drag
c.scale(); // scale  &#x5E76;&#x975E;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;custom-scale
console.log(c.hasLayer); // undefined" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x53EF;&#x4EE5;&#x62D6;&#x52A8;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DragModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseModal</span> </span>{
  hasLayer = <span class="hljs-literal">true</span>;
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;drag&apos;</span>);
  }
}

<span class="hljs-comment">// &#x53EF;&#x4EE5;&#x7F29;&#x653E;&#x7684;&#x5F39;&#x5C42;&#xFF0C;&#x6211;&#x4EEC;&#x5199;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ScaleModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseModal</span> </span>{
  scale() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;scale&apos;</span>);
  }
}

<span class="hljs-comment">// &#x83B7;&#x53D6;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#x7684;&#x6240;&#x6709;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPrototypes</span>(<span class="hljs-params">ClassPrototype</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.getOwnPropertyNames(ClassPrototype).slice(<span class="hljs-number">1</span>);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mix</span>(<span class="hljs-params">...mixins</span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">target</span>)</span>{
    <span class="hljs-keyword">if</span> (!mixins || !<span class="hljs-built_in">Array</span>.isArray(mixins)) <span class="hljs-keyword">return</span> target;
    <span class="hljs-keyword">let</span> cp = target.prototype;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> C <span class="hljs-keyword">of</span> mixins) {
      <span class="hljs-keyword">let</span> mp = C.prototype;
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> m <span class="hljs-keyword">of</span> getPrototypes(mp)) {
        cp[m] = mp[m];
      }
    }
  }
}
@mix(DragModal, ScaleModal)
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomModal</span> </span>{
  scale(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;custom-scale&apos;</span>);
  } 
  <span class="hljs-keyword">do</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;do&apos;</span>);
  }
}
<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> CustomModal();
c.close(); <span class="hljs-comment">// &#x62A5;&#x9519;&#xFF0C;&#x56E0;&#x4E3A;dobase&#x6CA1;&#x5728;A&#x6216;B&#x7684;prototype&#x4E0A;&#xFF0C;&#x800C;&#x662F;&#x5728;A.prototype.__proto__&#x4E0A;</span>
c.drag(); <span class="hljs-comment">// drag</span>
c.scale(); <span class="hljs-comment">// scale  &#x5E76;&#x975E;&#x662F;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x7684;custom-scale</span>
<span class="hljs-built_in">console</span>.log(c.hasLayer); <span class="hljs-comment">// undefined</span></code></pre><h3 id="articleHeader8">&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h3><p>&#x4EE5;&#x4E0A;<code>mix</code>&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x4E86;&#x591A;&#x7EE7;&#x627F;&#xFF0C;&#x4F46;&#x5B58;&#x5728;&#x4EE5;&#x4E0B;&#x95EE;&#x9898;</p><ul><li>&#x4F1A;&#x4FEE;&#x6539;<code>target</code>&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;</li><li><code>target</code>&#x7C7B;&#x7684;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x540D;&#x4F1A;&#x88AB;&#x88AB;&#x7EE7;&#x627F;&#x7C7B;&#x7684;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x540D;&#x8986;&#x76D6;</li><li>&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x65E0;&#x6CD5;&#x7EE7;&#x627F;</li><li><code>BaseModal</code>&#x7C7B;&#x65E0;&#x6CD5;&#x88AB;&#x7EE7;&#x627F;</li></ul><h2 id="articleHeader9">&#x53EA;&#x7EE7;&#x627F;&#x4E0D;&#x4FEE;&#x6539;prototype&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;</h2><h3 id="articleHeader10">&#x770B;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BaseModal {
  close() {
    console.log(&apos;close&apos;);
  }
}

let DragModalMixin = (extendsClass) =&gt; class extends extendsClass {
  hasLayer = true;
  drag() {
    console.log(&apos;drag&apos;);
  }
};

class CustomModal extends DragModalMixin(BaseModal) {
  drag() {
    console.log(&apos;custom-drag&apos;);
  }
  do() {
    console.log(&apos;do&apos;);
  }
}

let c = new CustomModal();

c.close(); // close
c.drag(); // custom-drag
console.log(c.hasLayer); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseModal</span> </span>{
  close() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;close&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> DragModalMixin = <span class="hljs-function">(<span class="hljs-params">extendsClass</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">extendsClass</span> </span>{
  hasLayer = <span class="hljs-literal">true</span>;
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;drag&apos;</span>);
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">DragModalMixin</span>(<span class="hljs-title">BaseModal</span>) </span>{
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;custom-drag&apos;</span>);
  }
  <span class="hljs-keyword">do</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;do&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> CustomModal();

c.close(); <span class="hljs-comment">// close</span>
c.drag(); <span class="hljs-comment">// custom-drag</span>
<span class="hljs-built_in">console</span>.log(c.hasLayer); <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader11">&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h3><p>&#x5982;&#x4F55;&#x8BA9;<code>CustomModal</code>&#x518D;&#x7EE7;&#x627F;<code>ScaleModal</code>&#x5462;&#xFF1F;<br>&#x5176;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5728;&#x4E0A;&#x9762;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x518D;&#x5199;&#x4E00;&#x4E2A;<code>ScaleModalMixinMixin</code>&#x7C7B;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;</p><h2 id="articleHeader12">&#x5B8C;&#x7F8E;&#x7684;&#x591A;&#x7EE7;&#x627F;</h2><h3 id="articleHeader13">&#x770B;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BaseModal {
  close() {
    console.log(&apos;close&apos;);
  }
}

let DragModalMixin = (extendsClass) =&gt; class extends extendsClass {
  hasLayer = true;
  drag() {
    console.log(&apos;drag&apos;);
  }
};

let ScaleModalMixin = (extendsClass) =&gt; class extends extendsClass {
  scale() {
    console.log(&apos;scale&apos;);
  }
};

class CustomModal extends ScaleModalMixin(DragModalMixin(BaseModal)) {
  drag() {
    console.log(&apos;custom-drag&apos;);
  }
  do() {
    console.log(&apos;do&apos;);
  }
}

let c = new CustomModal();

c.close(); // close
c.drag(); // custom-drag
c.scale(); // scale
console.log(c.hasLayer); // true" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseModal</span> </span>{
  close() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;close&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> DragModalMixin = <span class="hljs-function">(<span class="hljs-params">extendsClass</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">extendsClass</span> </span>{
  hasLayer = <span class="hljs-literal">true</span>;
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;drag&apos;</span>);
  }
};

<span class="hljs-keyword">let</span> ScaleModalMixin = <span class="hljs-function">(<span class="hljs-params">extendsClass</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">extendsClass</span> </span>{
  scale() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;scale&apos;</span>);
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ScaleModalMixin</span>(<span class="hljs-title">DragModalMixin</span>(<span class="hljs-title">BaseModal</span>)) </span>{
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;custom-drag&apos;</span>);
  }
  <span class="hljs-keyword">do</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;do&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> CustomModal();

c.close(); <span class="hljs-comment">// close</span>
c.drag(); <span class="hljs-comment">// custom-drag</span>
c.scale(); <span class="hljs-comment">// scale</span>
<span class="hljs-built_in">console</span>.log(c.hasLayer); <span class="hljs-comment">// true</span></code></pre><h3 id="articleHeader14">&#x5B58;&#x5728;&#x7684;&#x95EE;&#x9898;</h3><p>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x4E0D;&#x4F1A;&#x4FEE;&#x6539;&#x7236;&#x7C7B;&#x7684;&#x539F;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x5B58;&#x5728;&#x8DDF;&#x7236;&#x7C7B;&#x540C;&#x540D;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EA;&#x4F1A;&#x6267;&#x884C;&#x7236;&#x7C7B;&#x7684;&#xFF0C;&#x800C;&#x4E0D;&#x56DE;&#x6267;&#x884C;&#x88AB;&#x7EE7;&#x627F;&#x7684;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x4F7F;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x5206;&#x522B;&#x6267;&#x884C;&#x5462;&#xFF1F;</p><h2 id="articleHeader15">super&#x5B9E;&#x73B0;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x4E0D;&#x8986;&#x76D6;</h2><h3 id="articleHeader16">&#x770B;&#x4EE3;&#x7801;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class BaseModal {
  close() {
    console.log(&apos;close&apos;);
  }
}

let DragModalMixin = (extendsClass) =&gt; class extends extendsClass {
  hasLayer = true;
  drag() {
    console.log(&apos;drag&apos;);
  }
};
let ScaleModalMixin = (extendsClass) =&gt; class extends extendsClass {
  scale() {
    console.log(&apos;scale&apos;);
  }
  close() {
    console.log(&apos;scale-close&apos;);
    if (super.close) super.close();
  }
};

class CustomModal extends ScaleModalMixin(DragModalMixin(BaseModal)) {
  close() {
    console.log(&apos;custom-close&apos;);
    if (super.close) super.close();
  }
  do() {
    console.log(&apos;do&apos;);
  }
}

let c = new CustomModal();

c.close(); // custom-close   -&gt;   scale-close   -&gt;   close" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseModal</span> </span>{
  close() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;close&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> DragModalMixin = <span class="hljs-function">(<span class="hljs-params">extendsClass</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">extendsClass</span> </span>{
  hasLayer = <span class="hljs-literal">true</span>;
  drag() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;drag&apos;</span>);
  }
};
<span class="hljs-keyword">let</span> ScaleModalMixin = <span class="hljs-function">(<span class="hljs-params">extendsClass</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">extendsClass</span> </span>{
  scale() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;scale&apos;</span>);
  }
  close() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;scale-close&apos;</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">super</span>.close) <span class="hljs-keyword">super</span>.close();
  }
};

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomModal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ScaleModalMixin</span>(<span class="hljs-title">DragModalMixin</span>(<span class="hljs-title">BaseModal</span>)) </span>{
  close() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;custom-close&apos;</span>);
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">super</span>.close) <span class="hljs-keyword">super</span>.close();
  }
  <span class="hljs-keyword">do</span>() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;do&apos;</span>);
  }
}

<span class="hljs-keyword">let</span> c = <span class="hljs-keyword">new</span> CustomModal();

c.close(); <span class="hljs-comment">// custom-close   -&gt;   scale-close   -&gt;   close</span></code></pre><h2 id="articleHeader17">&#x603B;&#x7ED3;</h2><p>Mixin&#x662F;&#x4E00;&#x79CD;&#x601D;&#x60F3;&#xFF0C;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#x9AD8;&#x5EA6;&#x53EF;&#x590D;&#x7528;&#x6027;&#xFF0C;&#x53C8;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x89E3;&#x51B3;&#x591A;&#x7EE7;&#x627F;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x662F;&#x4E00;&#x79CD;&#x975E;&#x5E38;&#x7075;&#x6D3B;&#x7684;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x591A;&#x591A;&#x7422;&#x78E8;&#xFF0C;&#x76F8;&#x4FE1;&#x4F60;&#x4E5F;&#x4F1A;&#x53D1;&#x73B0;&#x4E00;&#x4E9B;&#x5176;&#x4ED6;&#x7684;&#x5999;&#x7528;&#x7684;&#xFF0C;&#x770B;&#x597D;&#x4F60;&#x54DF;&#xFF01;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mixin配合class实现多继承的绝佳妙用

## 原文链接
[https://segmentfault.com/a/1190000015390881](https://segmentfault.com/a/1190000015390881)

