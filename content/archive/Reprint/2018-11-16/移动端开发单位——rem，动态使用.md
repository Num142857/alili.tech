---
title: '移动端开发单位——rem，动态使用' 
date: 2018-11-16 2:30:07
hidden: true
slug: bp751dpaao6
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">&#x79FB;&#x52A8;&#x7AEF;&#x5F00;&#x53D1;-&#x5927;&#x7EB2;</h1><hr><h3 id="articleHeader1">&#x4E00;&#x3001;&#x79FB;&#x52A8;web&#x5F00;&#x53D1;&#x548C;&#x9002;&#x914D;</h3><h4>1&#x3001;&#x7279;&#x70B9;&#xFF1A;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8DD1;&#x5728;&#x624B;&#x673A;&#x7AEF;&#x7684;web&#x9875;&#x9762;&#xFF08;H5&#x9875;&#x9762;&#xFF09;&#x3001; &#x8DE8;&#x5E73;&#x53F0;&#x3001;&#x57FA;&#x4E8E;webview&#x3001;&#x544A;&#x522B;IE&#x62E5;&#x62B1;webkit&#x3001;&#x66F4;&#x9AD8;&#x7684;&#x9002;&#x914D;&#x548C;&#x6027;&#x80FD;&#x8981;&#x6C42;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs"><code>&#x8DD1;&#x5728;&#x624B;&#x673A;&#x7AEF;&#x7684;web&#x9875;&#x9762;&#xFF08;H5&#x9875;&#x9762;&#xFF09;&#x3001; &#x8DE8;&#x5E73;&#x53F0;&#x3001;&#x57FA;&#x4E8E;webview&#x3001;&#x544A;&#x522B;IE&#x62E5;&#x62B1;webkit&#x3001;&#x66F4;&#x9AD8;&#x7684;&#x9002;&#x914D;&#x548C;&#x6027;&#x80FD;&#x8981;&#x6C42;
</code></pre><blockquote>&#x5C0F;&#x6280;&#x5DE7;&#xFF1A;&#x5728;&#x8C03;&#x8BD5;&#x7A97;&#x53E3;&#x4E2D;&#xFF0C;&#x9009;&#x4E2D;&#x201C;computed -&gt; Show all&#x201D;,&#x5C31;&#x4F1A;&#x663E;&#x793A;&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x7684;&#x5168;&#x90E8;&#x6837;&#x5F0F;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbfuSM?w=2024&amp;h=1812" src="https://static.alili.tech/img/bVbfuSM?w=2024&amp;h=1812" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h4>2&#x3001;&#x5E38;&#x89C1;&#x7684;&#x79FB;&#x52A8;web&#x9002;&#x914D;&#x65B9;&#x6CD5;&#xFF1A;</h4><ul><li>&#x5B9A;&#x9AD8;&#xFF0C;&#x5BBD;&#x5EA6;&#x767E;&#x5206;&#x6BD4;</li><li>flex&#x5E03;&#x5C40; <code>&lt;&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;&gt;</code></li><li>Media Query(&#x5A92;&#x4F53;&#x67E5;&#x8BE2;) <code>&lt;&#x54CD;&#x5E94;&#x5F0F;&#x5E03;&#x5C40;&gt;</code></li></ul><p>(1)&#x3001;Media Query&#xFF08;&#x5A92;&#x4F53;&#x67E5;&#x8BE2;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    @media &#x5A92;&#x4F53;&#x7C7B;&#x578B; and (&#x5A92;&#x4F53;&#x7279;&#x6027;){
        /*css&#x6837;&#x5F0F;*/
    }   

    //&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#xFF1A;screen , print....
    //&#x5A92;&#x4F53;&#x7279;&#x6027;&#xFF1A;max-width , max-height....
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>    
    @<span class="hljs-keyword">media</span> &#x5A92;&#x4F53;&#x7C7B;&#x578B; and (&#x5A92;&#x4F53;&#x7279;&#x6027;){
        <span class="hljs-comment">/*css&#x6837;&#x5F0F;*/</span>
    }   

    <span class="hljs-comment">//&#x5A92;&#x4F53;&#x7C7B;&#x578B;&#xFF1A;screen , print....</span>
    <span class="hljs-comment">//&#x5A92;&#x4F53;&#x7279;&#x6027;&#xFF1A;max-width , max-height....</span>
    </code></pre><p>&#xFF08;2&#xFF09;&#x3001;js&#x914D;&#x7F6E;&#x8DDF;&#x9875;&#x9762;&#x5B57;&#x4F53;&#x5927;&#x5C0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;index.html&#x4E2D;&#x914D;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x5B57;&#x4F53;&#x5927;&#x5C0F;
&lt;script&gt;
     //&#x83B7;&#x53D6;&#x89C6;&#x7A97;&#x5BBD;&#x5EA6;&#xFF1A;&#x517C;&#x5BB9;&#x4E0D;&#x540C;&#x79FB;&#x52A8;&#x7AEF;&#x8BBE;&#x5907;&#x83B7;&#x53D6;&#x8BBE;&#x5907;&#x5BBD;&#x5EA6;
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    //&#x83B7;&#x53D6;&#x89C6;&#x7A97;&#x6839;&#x5143;&#x7D20;
    let htmlDom = document.getElementsByTagName(&quot;html&quot;)[0];
    //&#x8BBE;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x5B57;&#x4F53;&#x5927;&#x5C0F;
    htmlDom.style.fontSize = htmlWidth / 10 + &quot;px&quot;;
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>//&#x5728;index.html&#x4E2D;&#x914D;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x5B57;&#x4F53;&#x5927;&#x5C0F;
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
     <span class="hljs-comment">//&#x83B7;&#x53D6;&#x89C6;&#x7A97;&#x5BBD;&#x5EA6;&#xFF1A;&#x517C;&#x5BB9;&#x4E0D;&#x540C;&#x79FB;&#x52A8;&#x7AEF;&#x8BBE;&#x5907;&#x83B7;&#x53D6;&#x8BBE;&#x5907;&#x5BBD;&#x5EA6;</span>
    <span class="hljs-keyword">let</span> htmlWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth;
    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x89C6;&#x7A97;&#x6839;&#x5143;&#x7D20;</span>
    <span class="hljs-keyword">let</span> htmlDom = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&quot;html&quot;</span>)[<span class="hljs-number">0</span>];
    <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x5B57;&#x4F53;&#x5927;&#x5C0F;</span>
    htmlDom.style.fontSize = htmlWidth / <span class="hljs-number">10</span> + <span class="hljs-string">&quot;px&quot;</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre><h3 id="articleHeader2">&#x4E8C;&#x3001;&#x79FB;&#x52A8;&#x7AEF;&#x5B9E;&#x6218;</h3><h4>1&#x3001;&#x901A;&#x8FC7;sass&#x8BED;&#x6CD5;&#x4E2D;function&#x51FD;&#x6570;&#x81EA;&#x52A8;&#x5C06;px&#x8F6C;&#x4E3A;rem</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//a.scss&#x6587;&#x4EF6;
//&#x4EE5;iPhone6&#x5C4F;&#x5E55;&#x5C3A;&#x5BF8;&#x4E3A;&#x4F8B;&#xFF0C;&#x8F6C;&#x5316;&#x5F97;&#x5230;&#x7684;1rem = 37.5px;
@function rem2px($px) {
  $rem: 37.5px;
  @return ($px / $rem) + rem;
}
.a {
  font-size: rem2px(37.5px);
}

//&#x8F6C;&#x5316;&#x4E3A;a.css&#x6587;&#x4EF6;&#x5982;&#x4E0B;&#xFF1A;
.a {
  font-size: 1rem; 
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code><span class="hljs-comment">//a.scss&#x6587;&#x4EF6;</span>
<span class="hljs-comment">//&#x4EE5;iPhone6&#x5C4F;&#x5E55;&#x5C3A;&#x5BF8;&#x4E3A;&#x4F8B;&#xFF0C;&#x8F6C;&#x5316;&#x5F97;&#x5230;&#x7684;1rem = 37.5px;</span>
@function rem2px(<span class="hljs-variable">$px</span>) {
  <span class="hljs-variable">$rem</span>: <span class="hljs-number">37.5px</span>;
  @return (<span class="hljs-variable">$px</span> / <span class="hljs-variable">$rem</span>) + rem;
}
<span class="hljs-selector-class">.a</span> {
  <span class="hljs-attribute">font-size</span>: rem2px(<span class="hljs-number">37.5px</span>);
}

<span class="hljs-comment">//&#x8F6C;&#x5316;&#x4E3A;a.css&#x6587;&#x4EF6;&#x5982;&#x4E0B;&#xFF1A;</span>
<span class="hljs-selector-class">.a</span> {
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>; 
  }</code></pre><blockquote>&#x524D;&#x63D0;&#xFF1A;&#x5B89;&#x88C5;node-sass&#x6765;&#x7F16;&#x8BD1;scss&#x6587;&#x4EF6;&#x4E3A;css&#x6587;&#x4EF6;&#x3002;</blockquote><h4>2&#x3001;&#x5B9E;&#x6218;DEMO&#x3010;&#x79FB;&#x52A8;&#x7AEF;&#x4F7F;&#x7528;&#x6B64;&#x65B9;&#x6CD5;&#x5373;&#x53EF;&#x3011;</h4><p>&#xFF08;1&#xFF09;&#x3001;&#x751F;&#x6210;&#x9879;&#x76EE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    npm init" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code style="word-break:break-word;white-space:initial">    <span class="hljs-built_in">npm</span> init</code></pre><blockquote>&#x9879;&#x76EE;&#x7ED3;&#x6784;&#xFF1A;</blockquote><p><span class="img-wrap"><img data-src="/img/bVbfv66?w=510&amp;h=658" src="https://static.alili.tech/img/bVbfv66?w=510&amp;h=658" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#xFF08;2&#xFF09;&#x3001;&#x6839;&#x636E;package.json&#x6587;&#x4EF6;&#xFF0C;&#x5B89;&#x88C5;&#x5982;&#x4E0B;&#x5305;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbfv44?w=2684&amp;h=2324" src="https://static.alili.tech/img/bVbfv44?w=2684&amp;h=2324" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#xFF08;3&#xFF09;&#x3001;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x589E;&#x52A0;webpack.conf.js&#x6587;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require(&quot;webpack&quot;);
var path = require(&quot;path&quot;);
module.exports = {
  entry: &quot;./app.js&quot;,
  output: {
    path: path.resolve(__dirname, &quot;./build&quot;),
    filename: &quot;bundle.js&quot;
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [&quot;style-loader&quot;, &quot;css-loader&quot;, &quot;sass-loader&quot;]
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: &quot;url-loader&quot;,
            options: {
              limit: 1024
            }
          }
        ]
      }
    ]
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>var webpack = require(<span class="hljs-string">&quot;webpack&quot;</span>);
var path = require(<span class="hljs-string">&quot;path&quot;</span>);
module.exports = {
<span class="hljs-symbol">  entry:</span> <span class="hljs-string">&quot;./app.js&quot;</span>,
<span class="hljs-symbol">  output:</span> {
<span class="hljs-symbol">    path:</span> path.resolve(__dirname, <span class="hljs-string">&quot;./build&quot;</span>),
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">&quot;bundle.js&quot;</span>
  },
<span class="hljs-symbol">  module:</span> {
<span class="hljs-symbol">    rules:</span> [
      {
<span class="hljs-symbol">        test:</span> /\.scss$/,
<span class="hljs-symbol">        use:</span> [<span class="hljs-string">&quot;style-loader&quot;</span>, <span class="hljs-string">&quot;css-loader&quot;</span>, <span class="hljs-string">&quot;sass-loader&quot;</span>]
      },
      {
<span class="hljs-symbol">        test:</span> /\.(png|jpg)$/,
<span class="hljs-symbol">        use:</span> [
          {
<span class="hljs-symbol">            loader:</span> <span class="hljs-string">&quot;url-loader&quot;</span>,
<span class="hljs-symbol">            options:</span> {
<span class="hljs-symbol">              limit:</span> <span class="hljs-number">1024</span>
            }
          }
        ]
      }
    ]
  }
};</code></pre><p><code>&#xFF08;4&#xFF09;&#x3001;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#x589E;&#x52A0;app.js</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;./index.scss&quot;);
//&#x52A8;&#x6001;&#x914D;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x7684;font-size&#x6570;&#x503C;
let htmlWidth =
  document.documentElement.clientWidth || document.body.clientWidth;
let htmlDom = document.getElementsByTagName(&quot;html&quot;)[0];
htmlDom.style.fontSize = htmlWidth / 10 + &quot;px&quot;;
console.log(htmlDom.style.fontSize);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;./index.scss&quot;</span>);
<span class="hljs-comment">//&#x52A8;&#x6001;&#x914D;&#x7F6E;&#x6839;&#x5143;&#x7D20;&#x7684;font-size&#x6570;&#x503C;</span>
<span class="hljs-keyword">let</span> htmlWidth =
  <span class="hljs-built_in">document</span>.documentElement.clientWidth || <span class="hljs-built_in">document</span>.body.clientWidth;
<span class="hljs-keyword">let</span> htmlDom = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">&quot;html&quot;</span>)[<span class="hljs-number">0</span>];
htmlDom.style.fontSize = htmlWidth / <span class="hljs-number">10</span> + <span class="hljs-string">&quot;px&quot;</span>;
<span class="hljs-built_in">console</span>.log(htmlDom.style.fontSize);
</code></pre><p><code>&#xFF08;5&#xFF09;&#x3001;index.scss&#x6587;&#x4EF6;&#x4E2D;&#x4FEE;&#x6539;&#x6837;&#x5F0F;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//&#x4F7F;&#x7528;sass&#x7684;function&#x51FD;&#x6570;&#x81EA;&#x52A8;&#x8F6C;&#x6362;px&#x4E3A;rem
//`&#x8FD9;&#x91CC;&#x4EE5;iPhone6&#x7684;UI&#x5C3A;&#x5BF8;&#x914D;&#x7F6E;`
@function px2rem($px) {
  $rem: 37.5px;
  @return ($px / $rem) + rem;
}

.header {
  //&#x6839;&#x636E;UI&#x56FE;&#x5C06;&#x6807;&#x8BC6;&#x9AD8;&#x5EA6;&#x503C;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x5373;&#x53EF;
  height: px2rem(40px);   
  }
    " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scss"><code>
<span class="hljs-comment">//&#x4F7F;&#x7528;sass&#x7684;function&#x51FD;&#x6570;&#x81EA;&#x52A8;&#x8F6C;&#x6362;px&#x4E3A;rem</span>
<span class="hljs-comment">//`&#x8FD9;&#x91CC;&#x4EE5;iPhone6&#x7684;UI&#x5C3A;&#x5BF8;&#x914D;&#x7F6E;`</span>
@function px2rem(<span class="hljs-variable">$px</span>) {
  <span class="hljs-variable">$rem</span>: <span class="hljs-number">37.5px</span>;
  @return (<span class="hljs-variable">$px</span> / <span class="hljs-variable">$rem</span>) + rem;
}

<span class="hljs-selector-class">.header</span> {
  <span class="hljs-comment">//&#x6839;&#x636E;UI&#x56FE;&#x5C06;&#x6807;&#x8BC6;&#x9AD8;&#x5EA6;&#x503C;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x5373;&#x53EF;</span>
  <span class="hljs-attribute">height</span>: px2rem(<span class="hljs-number">40px</span>);   
  }
    </code></pre><blockquote>&#x6CE8;&#x610F;&#xFF1A;&#x4E00;&#x822C;&#x8BBE;&#x8BA1;&#x5E08;&#x7ED9;&#x6211;&#x4EEC;&#x7684;UI&#x56FE;&#x4E2D;&#x7684;&#x6807;&#x8BC6;&#x9AD8;&#x5EA6;&#x662F;&#x653E;&#x5927;&#x4E00;&#x500D;&#x7684;&#x503C;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x4F7F;&#x7528; &#x201C; height: px2rem(80px/2)&#x201D;&#xFF0C;&#x5C06;&#x9AD8;&#x5EA6;&#x503C;&#x9664;&#x4EE5;2&#x5728;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x4E2D;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端开发单位——rem，动态使用

## 原文链接
[https://segmentfault.com/a/1190000016008774](https://segmentfault.com/a/1190000016008774)

