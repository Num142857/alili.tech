---
title: Tool-生成雪碧图（sprite）
hidden: true
categories: reprint
slug: c9daa84c
date: 2018-11-06 15:28:30
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x7F51;&#x7AD9;&#x5F00;&#x53D1;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4F1A;&#x4F7F;&#x7528;&#x4F1A;&#x591A;&#x5C0F;&#x56FE;&#x6807;&#xFF0C;&#x5F88;&#x591A;&#x5C0F;&#x56FE;&#x6807;&#x7684;&#x8C03;&#x7528;&#x4E00;&#x76F4;&#x90FD;&#x662F;&#x4E2A;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader1">&#x5C0F;&#x56FE;&#x6807;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;</h3><p>&#x56FE;&#x6807;&#x5B57;&#x4F53;&#xFF08;&#x4F8B;&#x5982;:&#x963F;&#x91CC;&#x51FA;&#x54C1;&#x7684;<a href="http://iconfont.cn/" rel="nofollow noreferrer" target="_blank">iconfont</a>&#xFF09;<br>&#x96EA;&#x78A7;&#x56FE;&#xFF08;CSS Sprite&#xFF09;<br>&#x7B49;&#x7B49;...</p><h3 id="articleHeader2">&#x96EA;&#x78A7;&#x56FE;&#xFF08;CSS&#x96EA;&#x78A7;&#xFF09;</h3><p>CSS&#x96EA;&#x78A7; &#x5373;CSS Sprite&#xFF0C;&#x4E5F;&#x6709;&#x4EBA;&#x53EB;&#x5B83;CSS&#x7CBE;&#x7075;&#xFF0C;&#x662F;&#x4E00;&#x79CD;CSS&#x56FE;&#x50CF;&#x5408;&#x5E76;&#x6280;&#x672F;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x662F;&#x5C06;&#x5C0F;&#x56FE;&#x6807;&#x548C;&#x80CC;&#x666F;&#x56FE;&#x50CF;&#x5408;&#x5E76;&#x5230;&#x4E00;&#x5F20;&#x56FE;&#x7247;&#x4E0A;&#xFF0C;&#x7136;&#x540E;&#x5229;&#x7528;css&#x7684;&#x80CC;&#x666F;&#x5B9A;&#x4F4D;&#x6765;&#x663E;&#x793A;&#x9700;&#x8981;&#x663E;&#x793A;&#x7684;&#x56FE;&#x7247;&#x90E8;&#x5206;&#x3002;</p><h3 id="articleHeader3">&#x96EA;&#x78A7;&#x56FE;&#x4F18;&#x70B9;</h3><p><strong>1. &#x51CF;&#x5C11;&#x52A0;&#x8F7D;&#x7F51;&#x9875;&#x56FE;&#x7247;&#x65F6;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BF7;&#x6C42;&#x6B21;&#x6570;</strong></p><p>&#x53EF;&#x4EE5;&#x5408;&#x5E76;&#x591A;&#x6570;&#x80CC;&#x666F;&#x56FE;&#x7247;&#x548C;&#x5C0F;&#x56FE;&#x6807;&#xFF0C;&#x65B9;&#x4FBF;&#x5728;&#x4EFB;&#x4F55;&#x4F4D;&#x7F6E;&#x4F7F;&#x7528;&#xFF0C;&#x8FD9;&#x6837;&#x4E0D;&#x540C;&#x4F4D;&#x7F6E;&#x7684;&#x8BF7;&#x6C42;&#x53EA;&#x9700;&#x8981;&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x56FE;&#x7247;&#xFF0C;&#x4ECE;&#x800C;&#x51CF;&#x5C11;&#x5BF9;&#x670D;&#x52A1;&#x5668;&#x7684;&#x8BF7;&#x6C42;&#x6B21;&#x6570;&#xFF0C;&#x964D;&#x4F4E;&#x670D;&#x52A1;&#x5668;&#x538B;&#x529B;&#xFF0C;&#x540C;&#x65F6;&#x63D0;&#x9AD8;&#x4E86;&#x9875;&#x9762;&#x7684;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;&#xFF0C;&#x8282;&#x7EA6;&#x670D;&#x52A1;&#x5668;&#x7684;&#x6D41;&#x91CF;</p><p><strong>2. &#x63D0;&#x9AD8;&#x9875;&#x9762;&#x7684;&#x52A0;&#x8F7D;&#x901F;&#x5EA6;</strong></p><p>sprite &#x6280;&#x672F;&#x7684;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#x662F;&#x56FE;&#x7247;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;(&#x5728;&#x6709;&#x8BB8;&#x591A; sprite &#x65F6;&#xFF0C;&#x5355;&#x5F20;&#x56FE;&#x7247;&#x7684;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;)&#xFF1B;&#x5355;&#x72EC;&#x7684;&#x4E00;&#x5F20; JPEG &#x6216;&#x8005; PNG sprite &#x5728;&#x5927;&#x5C0F;&#x4E0A;&#x975E;&#x5E38;&#x53EF;&#x80FD;&#x6BD4;&#x628A;&#x4E00;&#x5F20;&#x56FE;&#x5206;&#x6210;&#x591A;&#x5F20;&#x5F97;&#x6765;&#x7684;&#x56FE;&#x7247;&#x603B;&#x5C3A;&#x5BF8;&#x5C0F;&#x3002;</p><h3 id="articleHeader4">&#x751F;&#x6210;&#x96EA;&#x78A7;&#x56FE;</h3><h4>PhotoShop&#xFF08;&#x50BB;&#x74DC;&#x65B9;&#x5F0F;&#xFF09;</h4><p>&#x901A;&#x8FC7;PhotoShop&#x628A;&#x56FE;&#x7247;&#x5408;&#x6210;&#x4E00;&#x5F20;&#x5927;&#x56FE;&#xFF0C;&#x8BA9;&#x540E;&#x624B;&#x52A8;&#x5199;css&#xFF0C;&#x5B9A;&#x4F4D;&#x5230;&#x56FE;&#x6807;</p><h4>Gulp&#x751F;&#x6210;&#x96EA;&#x78A7;&#x56FE;&#xFF08;<a href="https://github.com/GoFighting/create-sprite-tool" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x94FE;&#x63A5;</a>&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var gulp = require(&apos;gulp&apos;);
var spritesmith = require(&apos;gulp.spritesmith&apos;);

gulp.task(&apos;sprite&apos;, function() {
    // var DEST_NAME = args[1];
    var spriteData = gulp.src(&apos;src/sprite-images/*.png&apos;).pipe(spritesmith({
        imgName: &apos;sprite.png&apos;,
        cssName: &apos;sprite.css&apos;,
        imgPath: &apos;../images/sprite.png&apos;
    }));
    spriteData.css.pipe(gulp.dest(&apos;public/styles&apos;));
    spriteData.img.pipe(gulp.dest(&apos;public/images&apos;));
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> gulp = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;gulp&apos;</span>);
<span class="hljs-keyword">var</span> spritesmith = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;gulp.spritesmith&apos;</span>);

gulp.task(<span class="hljs-string">&apos;sprite&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// var DEST_NAME = args[1];</span>
    <span class="hljs-keyword">var</span> spriteData = gulp.src(<span class="hljs-string">&apos;src/sprite-images/*.png&apos;</span>).pipe(spritesmith({
        <span class="hljs-attr">imgName</span>: <span class="hljs-string">&apos;sprite.png&apos;</span>,
        <span class="hljs-attr">cssName</span>: <span class="hljs-string">&apos;sprite.css&apos;</span>,
        <span class="hljs-attr">imgPath</span>: <span class="hljs-string">&apos;../images/sprite.png&apos;</span>
    }));
    spriteData.css.pipe(gulp.dest(<span class="hljs-string">&apos;public/styles&apos;</span>));
    spriteData.img.pipe(gulp.dest(<span class="hljs-string">&apos;public/images&apos;</span>));
});</code></pre><p>&#x5408;&#x5E76;&#x524D;<br><span class="img-wrap"><img data-src="/img/bVbhEKv?w=1540&amp;h=872" src="https://static.alili.tech/img/bVbhEKv?w=1540&amp;h=872" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5408;&#x5E76;&#x540E;<br><span class="img-wrap"><img data-src="/img/bVbhEL6?w=1280&amp;h=1200" src="https://static.alili.tech/img/bVbhEL6?w=1280&amp;h=1200" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br><span class="img-wrap"><img data-src="/img/bVbhEMP?w=1440&amp;h=826" src="https://static.alili.tech/img/bVbhEMP?w=1440&amp;h=826" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h4>Webpack&#x751F;&#x6210;&#x96EA;&#x78A7;&#x56FE;&#xFF08;<a href="https://github.com/GoFighting/create-sprite-tool" rel="nofollow noreferrer" target="_blank">&#x9879;&#x76EE;&#x94FE;&#x63A5;</a>&#xFF09;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var SpritesmithPlugin = require(&apos;webpack-spritesmith&apos;);

module.exports = {
    plugins: [
        new SpritesmithPlugin({
            src: {
                cwd: &apos;src/sprite-images&apos;,
                glob: &apos;*.png&apos;
            },
            target: {
                image: &apos;public/images/sprite.png&apos;,
                css: &apos;public/styles/sprite.css&apos;
            },
            apiOptions: {
                cssImageRef: &quot;../images/sprite.png&quot;
            }
        })
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> SpritesmithPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;webpack-spritesmith&apos;</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> SpritesmithPlugin({
            <span class="hljs-attr">src</span>: {
                <span class="hljs-attr">cwd</span>: <span class="hljs-string">&apos;src/sprite-images&apos;</span>,
                <span class="hljs-attr">glob</span>: <span class="hljs-string">&apos;*.png&apos;</span>
            },
            <span class="hljs-attr">target</span>: {
                <span class="hljs-attr">image</span>: <span class="hljs-string">&apos;public/images/sprite.png&apos;</span>,
                <span class="hljs-attr">css</span>: <span class="hljs-string">&apos;public/styles/sprite.css&apos;</span>
            },
            <span class="hljs-attr">apiOptions</span>: {
                <span class="hljs-attr">cssImageRef</span>: <span class="hljs-string">&quot;../images/sprite.png&quot;</span>
            }
        })
    ]
}</code></pre><h3 id="articleHeader5">&#x76F8;&#x5173;NPM&#x5E93;</h3><p><a href="https://www.npmjs.com/package/webpack-spritesmith" rel="nofollow noreferrer" target="_blank">webpack-spritesmith</a><br><a href="https://www.npmjs.com/package/gulp.spritesmith" rel="nofollow noreferrer" target="_blank">gulp.spritesmith</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Tool-生成雪碧图（sprite）

## 原文链接
[https://segmentfault.com/a/1190000016562454](https://segmentfault.com/a/1190000016562454)

