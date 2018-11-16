---
title: babel到底该如何配置？
hidden: true
categories: [reprint]
slug: 37dfc174
date: 2018-10-26 02:30:12
---

{{< raw >}}
<h4>&#x80CC;&#x666F;</h4><p>&#x8BF4;&#x8D77;ES6&#xFF0C;webpack&#xFF0C;&#x6253;&#x5305;&#xFF0C;&#x6A21;&#x5757;&#x5316;&#x603B;&#x662F;&#x79BB;&#x4E0D;&#x5F00;babel&#xFF0C;babel&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;js&#x7684;&#x7F16;&#x8BD1;&#x5668;&#x5DF2;&#x7ECF;&#x88AB;&#x5E7F;&#x6CDB;&#x4F7F;&#x7528;&#x3002;&#x5728;babel&#x7684;<a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x7F51;</a>&#x662F;&#x8FD9;&#x6837;&#x4ECB;&#x7ECD;&#x5B83;&#x7684;&#xFF1A;</p><blockquote><p>Babel is a JavaScript compiler.</p><p>Use next generation JavaScript, today.</p></blockquote><p>&#x5927;&#x5BB6;&#x90FD;&#x77E5;&#x9053;js&#x4F5C;&#x4E3A;&#x5BBF;&#x4E3B;&#x8BED;&#x8A00;&#xFF0C;&#x5F88;&#x4F9D;&#x8D56;&#x6267;&#x884C;&#x7684;&#x73AF;&#x5883;&#xFF08;&#x6D4F;&#x89C8;&#x5668;&#x3001;node&#x7B49;&#xFF09;&#xFF0C;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x5BF9;js&#x8BED;&#x6CD5;&#x7684;&#x652F;&#x6301;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x7279;&#x522B;&#x662F;ES6&#x4E4B;&#x540E;&#xFF0C;ECMAScrip&#x5BF9;&#x7248;&#x672C;&#x7684;&#x66F4;&#x65B0;&#x5DF2;&#x7ECF;&#x5230;&#x4E86;&#x4E00;&#x5E74;&#x4E00;&#x6B21;&#x7684;&#x8282;&#x594F;&#xFF0C;&#x867D;&#x7136;&#x6BCF;&#x5E74;&#x66F4;&#x65B0;&#x7684;&#x5E45;&#x5EA6;&#x4E0D;&#x5927;&#xFF0C;&#x4F46;&#x662F;&#x6BCF;&#x5E74;&#x7684;&#x63D0;&#x6848;&#x53EF;&#x4E0D;&#x5C11;&#x3002;babel&#x7684;&#x51FA;&#x73B0;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x628A;&#x90A3;&#x4E9B;&#x4F7F;&#x7528;&#x65B0;&#x6807;&#x51C6;&#x7F16;&#x5199;&#x7684;&#x4EE3;&#x7801;&#x8F6C;&#x8BD1;&#x4E3A;&#x5F53;&#x524D;&#x73AF;&#x5883;&#x53EF;&#x8FD0;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x7B80;&#x5355;&#x70B9;&#x8BF4;&#x5C31;&#x662F;&#x628A;ES6&#x4EE3;&#x7801;&#x8F6C;&#x8BD1;&#xFF08;&#x8F6C;&#x7801;+&#x7F16;&#x8BD1;&#xFF09;&#x5230;ES5&#x3002;</p><p>&#x7ECF;&#x5E38;&#x6709;&#x4EBA;&#x5728;&#x4F7F;&#x7528;babel&#x7684;&#x65F6;&#x5019;&#x5E76;&#x6CA1;&#x6709;&#x5F04;&#x61C2;babel&#x662F;&#x5E72;&#x561B;&#x7684;&#xFF0C;&#x53EA;&#x77E5;&#x9053;&#x8981;&#x5199;ES6&#x5C31;&#x8981;&#x5728;webpack&#x4E2D;&#x5F15;&#x5165;&#x4E00;&#x4E2A;babel-loader&#xFF0C;&#x7136;&#x540E;&#x80E1;&#x4E71;&#x5728;&#x7F51;&#x4E0A;copy&#x4E00;&#x4E2A;.babelrc&#x5230;&#x9879;&#x76EE;&#x76EE;&#x5F55;&#x5C31;&#x5F00;&#x59CB;&#x4E86;&#xFF08;ps: &#x5176;&#x5B9E;&#x6211;&#x8BF4;&#x7684;&#x662F;&#x6211;&#x81EA;&#x5DF1;&#xFF09;&#x3002;&#x7406;&#x89E3;babel&#x7684;&#x914D;&#x7F6E;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x4E00;&#x4E9B;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5751;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x4EE3;&#x7801;&#x4E2D;&#x4F7F;&#x7528;Object.assign&#x5728;&#x4E00;&#x4E9B;&#x4F4E;&#x7248;&#x672C;&#x6D4F;&#x89C8;&#x5668;&#x4F1A;&#x62A5;&#x9519;&#xFF0C;&#x4EE5;&#x4E3A;&#x662F;webpack&#x6253;&#x5305;&#x65F6;&#x51FA;&#x73B0;&#x4E86;&#x4EC0;&#x4E48;&#x95EE;&#x9898;&#xFF0C;&#x5176;&#x5B9E;&#x662F;babel&#x7684;&#x914D;&#x7F6E;&#x95EE;&#x9898;&#x3002;</p><hr><h4>ES6</h4><p>&#x6B63;&#x6587;&#x4E4B;&#x524D;&#x5148;&#x8C08;&#x8C08;ES6&#xFF0C;ES&#x5373;<strong>ECMAScript</strong>&#xFF0C;6&#x8868;&#x793A;&#x7B2C;&#x516D;&#x4E2A;&#x7248;&#x672C;(&#x4E5F;&#x88AB;&#x79F0;&#x4E3A;&#x662F;ES2015&#xFF0C;&#x56E0;&#x4E3A;&#x662F;2015&#x5E74;&#x53D1;&#x5E03;&#x7684;)&#xFF0C;&#x5B83;&#x662F;javascript&#x7684;&#x5B9E;&#x73B0;&#x6807;&#x51C6;&#x3002;</p><p>&#x88AB;&#x7EB3;&#x5165;&#x5230;ES&#x6807;&#x51C6;&#x7684;&#x8BED;&#x6CD5;&#x5FC5;&#x987B;&#x8981;&#x7ECF;&#x8FC7;&#x5982;&#x4E0B;&#x4E94;&#x4E2A;&#x9636;&#x6BB5;:</p><ol><li>Stage 0: strawman</li><li>Stage 1: proposal</li><li>Stage 2: draft - &#x5FC5;&#x987B;&#x5305;&#x542B;<strong>2&#x4E2A;&#x5B9E;&#x9A8C;&#x6027;&#x7684;&#x5177;&#x4F53;&#x5B9E;&#x73B0;</strong>&#xFF0C;&#x5176;&#x4E2D;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x662F;&#x7528;&#x8F6C;&#x8BD1;&#x5668;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x4F8B;&#x5982;Babel&#x3002;</li><li>Stage 3: candidate - &#x81F3;&#x5C11;&#x8981;&#x6709;<strong>2&#x4E2A;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;&#x5177;&#x4F53;&#x5B9E;&#x73B0;</strong>&#x3002;</li><li>Stage 4: finished</li></ol><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x63D0;&#x6848;&#x5728;&#x8FDB;&#x5165;stage3&#x9636;&#x6BB5;&#x65F6;&#x5C31;&#x5DF2;&#x7ECF;&#x5728;&#x4E00;&#x4E9B;&#x73AF;&#x5883;&#x88AB;&#x5B9E;&#x73B0;&#xFF0C;&#x5728;stage2&#x9636;&#x6BB5;&#x6709;babel&#x7684;&#x5B9E;&#x73B0;&#x3002;&#x6240;&#x4EE5;&#x88AB;&#x7EB3;&#x5165;&#x5230;ES&#x6807;&#x51C6;&#x7684;&#x8BED;&#x6CD5;&#x5176;&#x5B9E;&#x5728;&#x5927;&#x90E8;&#x5206;&#x73AF;&#x5883;&#x90FD;&#x5DF2;&#x7ECF;&#x662F;&#x6709;&#x4E86;&#x5B9E;&#x73B0;&#x7684;&#xFF0C;&#x90A3;&#x4E48;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x7528;babel&#x6765;&#x8FDB;&#x884C;&#x8F6C;&#x8BD1;&#xFF0C;&#x56E0;&#x4E3A;&#x4E0D;&#x80FD;&#x786E;&#x4FDD;&#x6BCF;&#x4E2A;&#x8FD0;&#x884C;&#x4EE3;&#x7801;&#x7684;&#x73AF;&#x5883;&#x90FD;&#x662F;&#x6700;&#x65B0;&#x7248;&#x672C;&#x5E76;&#x5DF2;&#x7ECF;&#x5B9E;&#x73B0;&#x4E86;&#x89C4;&#x8303;&#x3002;</p><p>&#x66F4;&#x591A;&#x5173;&#x4E8E;ES6&#x7684;&#x5185;&#x5BB9;&#x53EF;&#x4EE5;&#x53C2;&#x8003;hax&#x7684;live:<a href="https://www.zhihu.com/lives/883307634416054272?utm_source=qq&amp;utm_medium=social" rel="nofollow noreferrer" target="_blank">Hax&#xFF1A;&#x5982;&#x4F55;&#x5B66;&#x4E60;&#x548C;&#x5B9E;&#x8DF5;ES201X&#xFF1F;</a></p><hr><h4>Babel&#x7684;&#x7248;&#x672C;&#x53D8;&#x66F4;</h4><p>&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x65F6;babel&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x5230;&#x4E86;<a href="https://github.com/babel/babel/releases/tag/v7.0.0-beta.3" rel="nofollow noreferrer" target="_blank">v7.0.0-beta.3</a>,&#x4E5F;&#x5C31;&#x662F;&#x8BF4;7.0&#x7684;&#x6B63;&#x5F0F;&#x7248;&#x5C31;&#x8981;&#x53D1;&#x5E03;&#x4E86;&#xFF0C;&#x53EF;&#x559C;&#x53EF;&#x8D3A;&#x3002;&#x4F46;&#x662F;&#x4ECA;&#x5929;&#x4E0D;&#x8C08;7.0&#xFF0C;&#x53EA;&#x8C08;babel6&#xFF0C;&#x5728;&#x6211;&#x77E5;&#x9053;&#x5E76;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x7684;babel&#x7684;&#x65F6;&#x5019;babel&#x5DF2;&#x7ECF;&#x5230;&#x4E86;&#x7248;&#x672C;6&#xFF0C;&#x6CA1;&#x6709;&#x7ECF;&#x5386;&#x8FC7;5&#x7684;&#x65F6;&#x4EE3;&#x3002;</p><p>&#x5728;babel5&#x7684;&#x65F6;&#x4EE3;&#xFF0C;babel&#x5C5E;&#x4E8E;&#x5168;&#x5BB6;&#x6876;&#x578B;&#xFF0C;&#x53EA;&#x8981;&#x5B89;&#x88C5;babel&#x5C31;&#x4F1A;&#x5B89;&#x88C5;babel&#x76F8;&#x5173;&#x7684;&#x6240;&#x6709;&#x5DE5;&#x5177;&#xFF0C;<br>&#x5373;&#x88C5;&#x5373;&#x7528;&#x3002;</p><p>&#x4F46;&#x662F;&#x5230;&#x4E86;babel6&#xFF0C;&#x5177;&#x4F53;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x70B9;&#x53D8;&#x66F4;&#xFF1A;</p><ul><li>&#x79FB;&#x9664;babel&#x5168;&#x5BB6;&#x6876;&#x5B89;&#x88C5;&#xFF0C;&#x62C6;&#x5206;&#x4E3A;&#x5355;&#x72EC;&#x6A21;&#x5757;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;babel-core&#x3001;babel-cli&#x3001;babel-node&#x3001;babel-polyfill&#x7B49;&#xFF1B;<br>&#x53EF;&#x4EE5;&#x5728;babel&#x7684;github&#x4ED3;&#x5E93;&#x770B;&#x5230;babel&#x73B0;&#x5728;&#x6709;&#x54EA;&#x4E9B;&#x6A21;&#x5757;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000011665647?w=1281&amp;h=1399" src="https://static.alili.tech/img/remote/1460000011665647?w=1281&amp;h=1399" alt="babel-package" title="babel-package" style="cursor:pointer"></span></p><ul><li>&#x65B0;&#x589E; .babelrc &#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;&#x6240;&#x6709;&#x7684;babel&#x8F6C;&#x8BD1;&#x90FD;&#x4F1A;&#x6765;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#xFF1B;</li><li>&#x65B0;&#x589E; plugin &#x914D;&#x7F6E;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x4E1C;&#x897F;&#x90FD;&#x63D2;&#x4EF6;&#x5316;&#xFF0C;&#x4EC0;&#x4E48;&#x4EE3;&#x7801;&#x8981;&#x8F6C;&#x8BD1;&#x90FD;&#x80FD;&#x5728;&#x63D2;&#x4EF6;&#x4E2D;&#x81EA;&#x7531;&#x914D;&#x7F6E;&#xFF1B;</li><li>&#x65B0;&#x589E; preset &#x914D;&#x7F6E;&#xFF0C;babel5&#x4F1A;&#x9ED8;&#x8BA4;&#x8F6C;&#x8BD1;ES6&#x548C;jsx&#x8BED;&#x6CD5;&#xFF0C;babel6&#x8F6C;&#x8BD1;&#x7684;&#x8BED;&#x6CD5;&#x90FD;&#x8981;&#x5728;perset&#x4E2D;&#x914D;&#x7F6E;&#xFF0C;preset&#x7B80;&#x5355;&#x8BF4;&#x5C31;&#x662F;&#x4E00;&#x7CFB;&#x5217;plugin&#x5305;&#x7684;&#x4F7F;&#x7528;&#x3002;</li></ul><hr><h4>babel&#x5404;&#x4E2A;&#x6A21;&#x5757;&#x4ECB;&#x7ECD;</h4><p>babel6&#x5C06;babel&#x5168;&#x5BB6;&#x6876;&#x62C6;&#x5206;&#x6210;&#x4E86;&#x8BB8;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x53EA;&#x6709;&#x77E5;&#x9053;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;&#x600E;&#x4E48;&#x7528;&#x624D;&#x80FD;&#x66F4;&#x597D;&#x7684;&#x7406;&#x89E3;babel&#x3002;</p><p>&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x4E9B;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x4E0A;&#x4F20;&#x5230;&#x4E86;<a href="https://github.com/Shenfq/studyBabel" rel="nofollow noreferrer" target="_blank">github</a>&#xFF0C;&#x6B22;&#x8FCE;&#x8BBF;&#x95EE;&#xFF0C;&#x6B22;&#x8FCE;star&#x3002;</p><p>&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#&#x901A;&#x8FC7;npm&#x5B89;&#x88C5;
npm install babel-core babel-cli babel-node

#&#x901A;&#x8FC7;yarn&#x5B89;&#x88C5;
yarn add babel-core babel-cli babel-node" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code class="shell"><span class="hljs-comment">#&#x901A;&#x8FC7;npm&#x5B89;&#x88C5;</span>
npm <span class="hljs-keyword">install </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-cli </span><span class="hljs-keyword">babel-node
</span>
<span class="hljs-comment">#&#x901A;&#x8FC7;yarn&#x5B89;&#x88C5;</span>
yarn <span class="hljs-keyword">add </span><span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-cli </span><span class="hljs-keyword">babel-node</span></code></pre><h5>1&#x3001;<a href="http://babeljs.io/docs/usage/api/" rel="nofollow noreferrer" target="_blank">babel-core</a></h5><p>&#x770B;&#x540D;&#x5B57;&#x5C31;&#x77E5;&#x9053;&#xFF0C;babel-core&#x662F;&#x4F5C;&#x4E3A;babel&#x7684;&#x6838;&#x5FC3;&#x5B58;&#x5728;&#xFF0C;babel&#x7684;&#x6838;&#x5FC3;api&#x90FD;&#x5728;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#x91CC;&#x9762;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;transform&#x3002;</p><p>&#x4E0B;&#x9762;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;babel-core&#x4E2D;&#x7684;api</p><ul><li>babel.transform&#xFF1A;&#x7528;&#x4E8E;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x7801;&#x5F97;&#x5230;AST</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
 * @param {string} code &#x8981;&#x8F6C;&#x8BD1;&#x7684;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4E32;
 * @param {object} options &#x53EF;&#x9009;&#xFF0C;&#x914D;&#x7F6E;&#x9879;
 * @return {object} 
*/
babel.transform(code: string, options?: Object)
    
//&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;(&#x4E3B;&#x8981;&#x5305;&#x62EC;&#x4E09;&#x4E2A;&#x90E8;&#x5206;)&#xFF1A;
{
    generated code, //&#x751F;&#x6210;&#x7801;
    sources map, //&#x6E90;&#x6620;&#x5C04;
    AST  //&#x5373;abstract syntax tree&#xFF0C;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/*
 * @param {string} code &#x8981;&#x8F6C;&#x8BD1;&#x7684;&#x4EE3;&#x7801;&#x5B57;&#x7B26;&#x4E32;
 * @param {object} options &#x53EF;&#x9009;&#xFF0C;&#x914D;&#x7F6E;&#x9879;
 * @return {object} 
*/</span>
babel.transform(code: string, options?: <span class="hljs-built_in">Object</span>)
    
<span class="hljs-comment">//&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;(&#x4E3B;&#x8981;&#x5305;&#x62EC;&#x4E09;&#x4E2A;&#x90E8;&#x5206;)&#xFF1A;</span>
{
    generated code, <span class="hljs-comment">//&#x751F;&#x6210;&#x7801;</span>
    sources map, <span class="hljs-comment">//&#x6E90;&#x6620;&#x5C04;</span>
    AST  <span class="hljs-comment">//&#x5373;abstract syntax tree&#xFF0C;&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;</span>
}</code></pre><p>&#x66F4;&#x591A;&#x5173;&#x4E8E;AST&#x77E5;&#x8BC6;&#x70B9;&#x8BF7;&#x770B;<a href="https://www.zhihu.com/question/20346372" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x3002;</p><p>&#x4E00;&#x4E9B;&#x4F7F;&#x7528;babel&#x63D2;&#x4EF6;&#x7684;&#x6253;&#x5305;&#x6216;&#x6784;&#x5EFA;&#x5DE5;&#x5177;&#x90FD;&#x6709;&#x4F7F;&#x7528;&#x5230;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x5F15;&#x5165;babel&#x63D2;&#x4EF6;&#x4E2D;&#x7684;&#x6E90;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//gulp-babel
const babel = require(&apos;babel-core&apos;);
/*
some codes...
*/
module.exports = function (opts) {
    opts = opts || {};
    return through.obj(function (file, enc, cb) {
        try {
            const fileOpts = Object.assign({}, opts, {
                filename: file.path,
                filenameRelative: file.relative,
                sourceMap: Boolean(file.sourceMap),
                sourceFileName: file.relative,
                sourceMapTarget: file.relative
            });
            const res = babel.transform(file.contents.toString(), fileOpts);
            if (res !== null) {
                //some codes
            }
        } catch (err) {
            //some codes
        }
    }
}

//babel-loader
var babel = require(&quot;babel-core&quot;);
/*
some codes...
*/
var transpile = function transpile(source, options) {
    //some code
    try {
        result = babel.transform(source, options);
    } catch (error) {
        //some codes
    }
    //some codes
}

//rollup-pugin-babel
import { buildExternalHelpers, transform } from &apos;babel-core&apos;;
/*
some codes...
*/
export default function babel ( options ) {
    //some codes
    return {
        // some methods
        transform ( code, id ) {
            const transformed = transform( code, localOpts );
            //some codes
            return {
                code: transformed.code,
                map: transformed.map
            };
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//gulp-babel</span>
<span class="hljs-keyword">const</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-core&apos;</span>);
<span class="hljs-comment">/*
some codes...
*/</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">opts</span>) </span>{
    opts = opts || {};
    <span class="hljs-keyword">return</span> through.obj(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">file, enc, cb</span>) </span>{
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">const</span> fileOpts = <span class="hljs-built_in">Object</span>.assign({}, opts, {
                <span class="hljs-attr">filename</span>: file.path,
                <span class="hljs-attr">filenameRelative</span>: file.relative,
                <span class="hljs-attr">sourceMap</span>: <span class="hljs-built_in">Boolean</span>(file.sourceMap),
                <span class="hljs-attr">sourceFileName</span>: file.relative,
                <span class="hljs-attr">sourceMapTarget</span>: file.relative
            });
            <span class="hljs-keyword">const</span> res = babel.transform(file.contents.toString(), fileOpts);
            <span class="hljs-keyword">if</span> (res !== <span class="hljs-literal">null</span>) {
                <span class="hljs-comment">//some codes</span>
            }
        } <span class="hljs-keyword">catch</span> (err) {
            <span class="hljs-comment">//some codes</span>
        }
    }
}

<span class="hljs-comment">//babel-loader</span>
<span class="hljs-keyword">var</span> babel = <span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;babel-core&quot;</span>);
<span class="hljs-comment">/*
some codes...
*/</span>
<span class="hljs-keyword">var</span> transpile = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">transpile</span>(<span class="hljs-params">source, options</span>) </span>{
    <span class="hljs-comment">//some code</span>
    <span class="hljs-keyword">try</span> {
        result = babel.transform(source, options);
    } <span class="hljs-keyword">catch</span> (error) {
        <span class="hljs-comment">//some codes</span>
    }
    <span class="hljs-comment">//some codes</span>
}

<span class="hljs-comment">//rollup-pugin-babel</span>
<span class="hljs-keyword">import</span> { buildExternalHelpers, transform } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;babel-core&apos;</span>;
<span class="hljs-comment">/*
some codes...
*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">babel</span> (<span class="hljs-params"> options </span>) </span>{
    <span class="hljs-comment">//some codes</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">// some methods</span>
        transform ( code, id ) {
            <span class="hljs-keyword">const</span> transformed = transform( code, localOpts );
            <span class="hljs-comment">//some codes</span>
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">code</span>: transformed.code,
                <span class="hljs-attr">map</span>: transformed.map
            };
        }
    }
}</code></pre><p>&#x4E0A;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x5F15;&#x5165;babel&#x63D2;&#x4EF6;&#x65F6;&#x7684;&#x4E00;&#x4E9B;&#x6E90;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x57FA;&#x672C;&#x90FD;&#x662F;&#x5148;&#x901A;&#x8FC7;&#x8C03;&#x7528;transform&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x4EE3;&#x7801;&#x8F6C;&#x7801;&#x3002;</p><ul><li>babel.transformFile</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5F02;&#x6B65;&#x7684;&#x6587;&#x4EF6;&#x8F6C;&#x7801;&#x65B9;&#x5F0F;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x7684;result&#x4E0E;transform&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4E00;&#x81F3;&#x3002;
babel.transformFile(&quot;filename.js&quot;, options, function (err, result) {
  result; // =&gt; { code, map, ast }
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5F02;&#x6B65;&#x7684;&#x6587;&#x4EF6;&#x8F6C;&#x7801;&#x65B9;&#x5F0F;&#xFF0C;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x7684;result&#x4E0E;transform&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4E00;&#x81F3;&#x3002;</span>
babel.transformFile(<span class="hljs-string">&quot;filename.js&quot;</span>, options, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, result</span>) </span>{
  result; <span class="hljs-comment">// =&gt; { code, map, ast }</span>
});</code></pre><ul><li>babel.transformFileSync</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x540C;&#x6B65;&#x7684;&#x6587;&#x4EF6;&#x8F6C;&#x7801;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E0E;transform&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4E00;&#x81F3;&#x3002;
babel.transformFileSync(filename, options) // =&gt; { code, map, ast }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x540C;&#x6B65;&#x7684;&#x6587;&#x4EF6;&#x8F6C;&#x7801;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x4E0E;transform&#x8FD4;&#x56DE;&#x7684;&#x5BF9;&#x8C61;&#x4E00;&#x81F3;&#x3002;</span>
babel.transformFileSync(filename, options) <span class="hljs-comment">// =&gt; { code, map, ast }</span></code></pre><ul><li>babel.transformFromAst</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5C06;ast&#x8FDB;&#x884C;&#x8F6C;&#x8BD1;
const { code, map, ast } = babel.transformFromAst(ast, code, options);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5C06;ast&#x8FDB;&#x884C;&#x8F6C;&#x8BD1;</span>
<span class="hljs-keyword">const</span> { code, map, ast } = babel.transformFromAst(ast, code, options);</code></pre><h5>2&#x3001;<a href="http://babeljs.io/docs/usage/cli/" rel="nofollow noreferrer" target="_blank">babel-cli</a></h5><p>babel-cli&#x662F;&#x4E00;&#x4E2A;&#x901A;&#x8FC7;&#x547D;&#x4EE4;&#x884C;&#x5BF9;js&#x6587;&#x4EF6;&#x8FDB;&#x884C;&#x6362;&#x7801;&#x7684;&#x5DE5;&#x5177;&#x3002;</p><p>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#xFF1A;</p><ul><li><p>&#x76F4;&#x63A5;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x51FA;&#x8F6C;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel script.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code class="shell" style="word-break:break-word;white-space:initial">babel <span class="hljs-keyword">script</span>.js</code></pre></li><li><p>&#x6307;&#x5B9A;&#x8F93;&#x51FA;&#x6587;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel script.js --out-file build.js
&#x6216;&#x8005;&#x662F;
babel script.js -o build.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code class="shell">babel script<span class="hljs-selector-class">.js</span> --out-file build<span class="hljs-selector-class">.js</span>
&#x6216;&#x8005;&#x662F;
babel script<span class="hljs-selector-class">.js</span> -o build.js</code></pre></li></ul><p>&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x7F16;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//script.js
const array = [1,2,3].map((item, index) =&gt; item * 2);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//script.js</span>
<span class="hljs-keyword">const</span> array = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function">(<span class="hljs-params">item, index</span>) =&gt;</span> item * <span class="hljs-number">2</span>);</code></pre><p>&#x7136;&#x540E;&#x5728;&#x547D;&#x4EE4;&#x884C;&#x6267;&#x884C; babel script.js&#xFF0C;&#x53D1;&#x73B0;&#x8F93;&#x51FA;&#x7684;&#x4EE3;&#x7801;&#x597D;&#x50CF;&#x6CA1;&#x6709;&#x8F6C;&#x8BD1;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011665648?w=532&amp;h=60" src="https://static.alili.tech/img/remote/1460000011665648?w=532&amp;h=60" alt="babel&#x8F6C;&#x8BD1;" title="babel&#x8F6C;&#x8BD1;" style="cursor:pointer"></span></p><p>&#x56E0;&#x4E3A;&#x6211;&#x4EEC;&#x6CA1;&#x6709;&#x544A;&#x8BC9;babel&#x8981;&#x8F6C;&#x8BD1;&#x54EA;&#x4E9B;&#x7C7B;&#x578B;&#xFF0C;&#x73B0;&#x5728;&#x770B;&#x770B;&#x600E;&#x4E48;&#x6307;&#x5B9A;&#x8F6C;&#x8BD1;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel --plugins transform-es2015-arrow-functions script.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code class="shell" style="word-break:break-word;white-space:initial">babel --plugins <span class="hljs-built_in">transform</span>-es2015-arrow-<span class="hljs-built_in">functions</span> script.js</code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000011665649?w=1097&amp;h=214" src="https://static.alili.tech/img/remote/1460000011665649?w=1097&amp;h=214" alt="&#x8F6C;&#x8BD1;&#x7BAD;&#x5934;&#x51FD;&#x6570;" title="&#x8F6C;&#x8BD1;&#x7BAD;&#x5934;&#x51FD;&#x6570;" style="cursor:pointer"></span></p><p>&#x6216;&#x8005;&#x5728;&#x76EE;&#x5F55;&#x91CC;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;.babelrc&#x6587;&#x4EF6;&#xFF0C;&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
        &quot;transform-es2015-arrow-functions&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
    <span class="hljs-attr">&quot;plugins&quot;</span>: [
        <span class="hljs-string">&quot;transform-es2015-arrow-functions&quot;</span>
    ]
}</code></pre><p>.babelrc&#x662F;babel&#x7684;&#x5168;&#x5C40;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x6709;&#x7684;babel&#x64CD;&#x4F5C;&#xFF08;&#x5305;&#x62EC;babel-core&#x3001;babel-node&#xFF09;&#x57FA;&#x672C;&#x90FD;&#x4F1A;&#x6765;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#xFF0C;&#x540E;&#x9762;&#x4F1A;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;&#x3002;</p><h5>3&#x3001;babel-node</h5><p>babel-node&#x662F;&#x968F;babel-cli&#x4E00;&#x8D77;&#x5B89;&#x88C5;&#x7684;&#xFF0C;&#x53EA;&#x8981;&#x5B89;&#x88C5;&#x4E86;babel-cli&#x5C31;&#x4F1A;&#x81EA;&#x5E26;babel-node&#x3002;<br>&#x5728;&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x5165;babel-node&#x4F1A;&#x542F;&#x52A8;&#x4E00;&#x4E2A;REPL&#xFF08;Read-Eval-Print-Loop&#xFF09;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x652F;&#x6301;ES6&#x7684;js&#x6267;&#x884C;&#x73AF;&#x5883;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011665650?w=387&amp;h=82" src="https://static.alili.tech/img/remote/1460000011665650?w=387&amp;h=82" alt="&#x6D4B;&#x8BD5;babel-node" title="&#x6D4B;&#x8BD5;babel-node" style="cursor:pointer;display:inline"></span></p><p>&#x5176;&#x5B9E;&#x4E0D;&#x7528;babel-node&#xFF0C;&#x76F4;&#x63A5;&#x5728;node&#x4E0B;&#xFF0C;&#x53EA;&#x8981;node&#x7248;&#x672C;&#x5927;&#x4E8E;6&#x5927;&#x90E8;&#x5206;ES6&#x8BED;&#x6CD5;&#x5DF2;&#x7ECF;&#x652F;&#x6301;&#xFF0C;&#x51B5;&#x4E14;&#x73B0;&#x5728;node&#x7684;&#x7248;&#x672C;&#x5DF2;&#x7ECF;&#x5230;&#x4E86;8.7.0&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011665651?w=329&amp;h=85" src="https://static.alili.tech/img/remote/1460000011665651?w=329&amp;h=85" alt="node&#x73AF;&#x5883;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6D4B;&#x8BD5;" title="node&#x73AF;&#x5883;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x6D4B;&#x8BD5;" style="cursor:pointer;display:inline"></span></p><p>babel-node&#x8FD8;&#x80FD;&#x76F4;&#x63A5;&#x7528;&#x6765;&#x6267;&#x884C;js&#x811A;&#x672C;&#xFF0C;&#x4E0E;&#x76F4;&#x63A5;&#x4F7F;&#x7528;node&#x547D;&#x4EE4;&#x7C7B;&#x4F3C;&#xFF0C;&#x53EA;&#x662F;&#x4F1A;&#x5728;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x8FDB;&#x884C;babel&#x7684;&#x8F6C;&#x8BD1;&#xFF0C;&#x5E76;&#x4E14;babel&#x5B98;&#x65B9;&#x4E0D;&#x5EFA;&#x8BAE;&#x5728;&#x751F;&#x4EA7;&#x73AF;&#x5883;&#x76F4;&#x63A5;&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#xFF0C;&#x56E0;&#x4E3A;babel&#x5B9E;&#x65F6;&#x7F16;&#x8BD1;&#x4EA7;&#x751F;&#x7684;&#x4EE3;&#x7801;&#x4F1A;&#x7F13;&#x5B58;&#x5728;&#x5185;&#x5B58;&#x4E2D;&#xFF0C;&#x5BFC;&#x81F4;&#x5185;&#x5B58;&#x5360;&#x7528;&#x8FC7;&#x9AD8;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E86;&#x89E3;&#x4E86;&#x89E3;&#x5C31;&#x597D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="babel-node script.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code class="shell" style="word-break:break-word;white-space:initial">babel-<span class="hljs-keyword">node</span> <span class="hljs-title">script</span>.js</code></pre><h5>4&#x3001;<a href="http://babeljs.io/docs/usage/babel-register/" rel="nofollow noreferrer" target="_blank">babel-register</a></h5><p>babel-register&#x5B57;&#x9762;&#x610F;&#x601D;&#x80FD;&#x770B;&#x51FA;&#x6765;&#xFF0C;&#x8FD9;&#x662F;babel&#x7684;&#x4E00;&#x4E2A;&#x6CE8;&#x518C;&#x5668;&#xFF0C;&#x5B83;&#x5728;&#x5E95;&#x5C42;&#x6539;&#x5199;&#x4E86;node&#x7684;require&#x65B9;&#x6CD5;&#xFF0C;&#x5F15;&#x5165;babel-register&#x4E4B;&#x540E;&#x6240;&#x6709;require&#x5E76;&#x4EE5;.es6, .es, .jsx &#x548C; .js&#x4E3A;&#x540E;&#x7F00;&#x7684;&#x6A21;&#x5757;&#x90FD;&#x4F1A;&#x7ECF;&#x8FC7;babel&#x7684;&#x8F6C;&#x8BD1;&#x3002;</p><p>&#x540C;&#x6837;&#x901A;&#x8FC7;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x505A;&#x4E2A;&#x5B9E;&#x9A8C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//test.js
const name = &apos;shenfq&apos;;
module.exports = () =&gt; {
    const json = {name};
    return json;
};
//main.js
require(&apos;babel-register&apos;);
var test = require(&apos;./test.js&apos;);  //test.js&#x4E2D;&#x7684;es6&#x8BED;&#x6CD5;&#x5C06;&#x88AB;&#x8F6C;&#x8BD1;&#x6210;es5

console.log(test.toString()); //&#x901A;&#x8FC7;toString&#x65B9;&#x6CD5;&#xFF0C;&#x770B;&#x770B;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x7684;&#x51FD;&#x6570;&#x662F;&#x5426;&#x88AB;&#x8F6C;&#x8BD1;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//test.js</span>
<span class="hljs-keyword">const</span> name = <span class="hljs-string">&apos;shenfq&apos;</span>;
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> json = {name};
    <span class="hljs-keyword">return</span> json;
};
<span class="hljs-comment">//main.js</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-register&apos;</span>);
<span class="hljs-keyword">var</span> test = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;./test.js&apos;</span>);  <span class="hljs-comment">//test.js&#x4E2D;&#x7684;es6&#x8BED;&#x6CD5;&#x5C06;&#x88AB;&#x8F6C;&#x8BD1;&#x6210;es5</span>

<span class="hljs-built_in">console</span>.log(test.toString()); <span class="hljs-comment">//&#x901A;&#x8FC7;toString&#x65B9;&#x6CD5;&#xFF0C;&#x770B;&#x770B;&#x63A7;&#x5236;&#x53F0;&#x8F93;&#x51FA;&#x7684;&#x51FD;&#x6570;&#x662F;&#x5426;&#x88AB;&#x8F6C;&#x8BD1;</span></code></pre><p><span class="img-wrap"><img data-src="/img/remote/1460000011665652?w=414&amp;h=108" src="https://static.alili.tech/img/remote/1460000011665652?w=414&amp;h=108" alt="register&#x8F6C;&#x8BD1;" title="register&#x8F6C;&#x8BD1;" style="cursor:pointer"></span></p><p>&#x9ED8;&#x8BA4;babel-register&#x4F1A;&#x5FFD;&#x7565;&#x5BF9;node_modules&#x76EE;&#x5F55;&#x4E0B;&#x6A21;&#x5757;&#x7684;&#x8F6C;&#x8BD1;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x5F00;&#x542F;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x5982;&#x4E0B;&#x914D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-register&quot;)({
  ignore: false
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;babel-register&quot;</span>)({
  <span class="hljs-attr">ignore</span>: <span class="hljs-literal">false</span>
});</code></pre><p>babel-register&#x4E0E;babel-core&#x4F1A;&#x540C;&#x65F6;&#x5B89;&#x88C5;&#xFF0C;&#x5728;babel-core&#x4E2D;&#x4F1A;&#x6709;&#x4E00;&#x4E2A;register.js&#x6587;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x5F15;&#x5165;babel-register&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;babel-core/register&apos;);
require(&apos;babel-register&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-core/register&apos;</span>);
<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-register&apos;</span>);</code></pre><p>&#x4F46;&#x662F;&#x5B98;&#x65B9;&#x4E0D;&#x63A8;&#x8350;&#x7B2C;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;babel-register&#x5DF2;&#x7ECF;&#x72EC;&#x7ACB;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x5728;babel-core&#x7684;register.js&#x6587;&#x4EF6;&#x4E2D;&#x6709;&#x5982;&#x4E0B;&#x6CE8;&#x91CA;&#x3002;</p><blockquote><p>TODO: eventually deprecate this console.trace(&quot;use the <code>babel-register</code> package instead of <code>babel-core/register</code>&quot;);</p></blockquote><h5>5&#x3001;<a href="http://babeljs.io/docs/usage/babel-register/" rel="nofollow noreferrer" target="_blank">babel-polyfill</a></h5><p>polyfill&#x8FD9;&#x4E2A;&#x5355;&#x8BCD;&#x7FFB;&#x8BD1;&#x6210;&#x4E2D;&#x6587;&#x662F;<code>&#x57AB;&#x7247;</code>&#x7684;&#x610F;&#x601D;&#xFF0C;&#x8BE6;&#x7EC6;&#x70B9;&#x89E3;&#x91CA;&#x5C31;&#x662F;&#x684C;&#x5B50;&#x7684;&#x684C;&#x811A;&#x6709;&#x4E00;&#x8FB9;&#x77EE;&#x4E00;&#x70B9;&#xFF0C;&#x62FF;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#x628A;&#x684C;&#x5B50;&#x57AB;&#x5E73;&#x3002;polyfill&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x4F5C;&#x7528;&#x4E3B;&#x8981;&#x662F;&#x7528;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684;&#x8BED;&#x6CD5;&#x548C;api&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;&#x6D4F;&#x89C8;&#x5668;&#x8FD8;&#x6CA1;&#x6709;&#x5B9E;&#x73B0;&#x7684;api&#xFF0C;&#x5BF9;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x4E00;&#x4E9B;&#x7F3A;&#x9677;&#x505A;&#x4E00;&#x4E9B;&#x4FEE;&#x8865;&#x3002;&#x4F8B;&#x5982;Array&#x65B0;&#x589E;&#x4E86;includes&#x65B9;&#x6CD5;&#xFF0C;&#x6211;&#x60F3;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x4F4E;&#x7248;&#x672C;&#x7684;&#x6D4F;&#x89C8;&#x5668;&#x4E0A;&#x6CA1;&#x6709;&#xFF0C;&#x6211;&#x5C31;&#x5F97;&#x505A;&#x517C;&#x5BB9;&#x5904;&#x7406;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, &apos;includes&apos;, {
    value: function(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError(&apos;&quot;this&quot; is null or not defined&apos;);
      }
      var o = Object(this);
      var len = o.length &gt;&gt;&gt; 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n &gt;= 0 ? n : len - Math.abs(n), 0);
      while (k &lt; len) {
        if (o[k] === searchElement) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
} " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!<span class="hljs-built_in">Array</span>.prototype.includes) {
  <span class="hljs-built_in">Object</span>.defineProperty(<span class="hljs-built_in">Array</span>.prototype, <span class="hljs-string">&apos;includes&apos;</span>, {
    <span class="hljs-attr">value</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">searchElement, fromIndex</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(<span class="hljs-string">&apos;&quot;this&quot; is null or not defined&apos;</span>);
      }
      <span class="hljs-keyword">var</span> o = <span class="hljs-built_in">Object</span>(<span class="hljs-keyword">this</span>);
      <span class="hljs-keyword">var</span> len = o.length &gt;&gt;&gt; <span class="hljs-number">0</span>;
      <span class="hljs-keyword">if</span> (len === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
      <span class="hljs-keyword">var</span> n = fromIndex | <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> k = <span class="hljs-built_in">Math</span>.max(n &gt;= <span class="hljs-number">0</span> ? n : len - <span class="hljs-built_in">Math</span>.abs(n), <span class="hljs-number">0</span>);
      <span class="hljs-keyword">while</span> (k &lt; len) {
        <span class="hljs-keyword">if</span> (o[k] === searchElement) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        }
        k++;
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
  });
} </code></pre><p>&#x4E0A;&#x9762;&#x7B80;&#x5355;&#x7684;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;includes&#x65B9;&#x6CD5;&#x7684;polyfill&#xFF0C;&#x4EE3;&#x7801;&#x6765;&#x81EA;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" rel="nofollow noreferrer" target="_blank">MDN</a>&#x3002;</p><p>&#x7406;&#x89E3;polyfill&#x7684;&#x610F;&#x601D;&#x4E4B;&#x540E;&#xFF0C;&#x518D;&#x6765;&#x8BF4;&#x8BF4;babel&#x4E3A;&#x4EC0;&#x4E48;&#x5B58;&#x5728;polyfill&#x3002;&#x56E0;&#x4E3A;babel&#x7684;&#x8F6C;&#x8BD1;&#x53EA;&#x662F;&#x8BED;&#x6CD5;&#x5C42;&#x6B21;&#x7684;&#x8F6C;&#x8BD1;&#xFF0C;&#x4F8B;&#x5982;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;&#x89E3;&#x6784;&#x8D4B;&#x503C;&#x3001;class&#xFF0C;&#x5BF9;&#x4E00;&#x4E9B;&#x65B0;&#x589E;api&#x4EE5;&#x53CA;&#x5168;&#x5C40;&#x51FD;&#x6570;&#xFF08;&#x4F8B;&#x5982;&#xFF1A;Promise&#xFF09;&#x65E0;&#x6CD5;&#x8FDB;&#x884C;&#x8F6C;&#x8BD1;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x5C31;&#x9700;&#x8981;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x5F15;&#x5165;babel-polyfill&#xFF0C;&#x8BA9;&#x4EE3;&#x7801;&#x5B8C;&#x7F8E;&#x652F;&#x6301;ES6+&#x73AF;&#x5883;&#x3002;&#x524D;&#x9762;&#x4ECB;&#x7ECD;&#x7684;babel-node&#x5C31;&#x4F1A;&#x81EA;&#x52A8;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x5F15;&#x5165;babel-polyfill&#x5305;&#x3002;</p><p>&#x5F15;&#x5165;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5728;&#x4EE3;&#x7801;&#x7684;&#x6700;&#x9876;&#x90E8;&#x8FDB;&#x884C;require&#x6216;&#x8005;import

require(&quot;babel-polyfill&quot;);

import &quot;babel-polyfill&quot;;

//&#x5982;&#x679C;&#x4F7F;&#x7528;webpack&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x6587;&#x4EF6;&#x5165;&#x53E3;&#x6570;&#x7EC4;&#x5F15;&#x5165;
module.exports = {
  entry: [&quot;babel-polyfill&quot;, &quot;./app/js&quot;]
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5728;&#x4EE3;&#x7801;&#x7684;&#x6700;&#x9876;&#x90E8;&#x8FDB;&#x884C;require&#x6216;&#x8005;import</span>

<span class="hljs-built_in">require</span>(<span class="hljs-string">&quot;babel-polyfill&quot;</span>);

<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;babel-polyfill&quot;</span>;

<span class="hljs-comment">//&#x5982;&#x679C;&#x4F7F;&#x7528;webpack&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x6587;&#x4EF6;&#x5165;&#x53E3;&#x6570;&#x7EC4;&#x5F15;&#x5165;</span>
<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: [<span class="hljs-string">&quot;babel-polyfill&quot;</span>, <span class="hljs-string">&quot;./app/js&quot;</span>]
};</code></pre><p>&#x4F46;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x6211;&#x4EEC;&#x5E76;&#x4E0D;&#x4F1A;&#x4F7F;&#x7528;&#x6240;&#x6709;ES6+&#x8BED;&#x6CD5;&#xFF0C;&#x5168;&#x5C40;&#x6DFB;&#x52A0;&#x6240;&#x6709;&#x57AB;&#x7247;&#x80AF;&#x5B9A;&#x4F1A;&#x8BA9;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x91CF;&#x4E0A;&#x5347;&#xFF0C;&#x4E4B;&#x540E;&#x4F1A;&#x4ECB;&#x7ECD;&#x5176;&#x4ED6;&#x6DFB;&#x52A0;&#x57AB;&#x7247;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><hr><h4>.babelrc</h4><p>&#x524D;&#x9762;&#x5DF2;&#x7ECF;&#x4ECB;&#x7ECD;&#x4E86;babel&#x5E38;&#x7528;&#x7684;&#x4E00;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x770B;&#x770B;babel&#x7684;&#x914D;&#x7F6E;&#x6587;&#x4EF6; <code>.babelrc</code>&#x3002;</p><p>&#x540E;&#x9762;&#x7684;&#x540E;&#x7F00;rc&#x6765;&#x81EA;linux&#x4E2D;&#xFF0C;&#x4F7F;&#x7528;&#x8FC7;linux&#x5C31;&#x77E5;&#x9053;linux&#x4E2D;&#x5F88;&#x591A;rc&#x7ED3;&#x5C3E;&#x7684;&#x6587;&#x4EF6;&#xFF0C;&#x6BD4;&#x5982;<code>.bashrc</code>&#xFF0C;rc&#x662F;<code>run command</code>&#x7684;&#x7F29;&#x5199;&#xFF0C;&#x7FFB;&#x8BD1;&#x6210;&#x4E2D;&#x6587;&#x5C31;&#x662F;&#x8FD0;&#x884C;&#x65F6;&#x7684;&#x547D;&#x4EE4;&#xFF0C;&#x8868;&#x793A;&#x7A0B;&#x5E8F;&#x6267;&#x884C;&#x65F6;&#x5C31;&#x4F1A;&#x6765;&#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x3002;</p><p>babel&#x6240;&#x6709;&#x7684;&#x64CD;&#x4F5C;&#x57FA;&#x672C;&#x90FD;&#x4F1A;&#x6765;&#x8BFB;&#x53D6;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x9664;&#x4E86;&#x4E00;&#x4E9B;&#x5728;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8BBE;&#x7F6E;options&#x53C2;&#x6570;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF0C;&#x4F1A;&#x4ECE;<code>package.json</code>&#x6587;&#x4EF6;&#x7684;babel&#x5C5E;&#x6027;&#x4E2D;&#x8BFB;&#x53D6;&#x914D;&#x7F6E;&#x3002;</p><h5>plugins</h5><p>&#x5148;&#x7B80;&#x5355;&#x4ECB;&#x7ECD;&#x4E0B; plugins &#xFF0C;babel&#x4E2D;&#x7684;&#x63D2;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;&#x914D;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x63D2;&#x4EF6;&#x624D;&#x80FD;&#x544A;&#x8BC9;babel&#xFF0C;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4E2D;&#x6709;&#x54EA;&#x4E9B;&#x662F;&#x9700;&#x8981;&#x8F6C;&#x8BD1;&#x7684;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;babel&#x5B98;&#x7F51;&#x7684;<a href="http://babeljs.io/docs/plugins/" rel="nofollow noreferrer" target="_blank">&#x63D2;&#x4EF6;&#x5217;&#x8868;</a>&#xFF0C;&#x91CC;&#x9762;&#x6709;&#x76EE;&#x524D;babel&#x652F;&#x6301;&#x7684;&#x5168;&#x90E8;&#x63D2;&#x4EF6;&#x3002;</p><p>&#x4E3E;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
        &quot;transform-es2015-arrow-functions&quot;, //&#x8F6C;&#x8BD1;&#x7BAD;&#x5934;&#x51FD;&#x6570;
        &quot;transform-es2015-classes&quot;, //&#x8F6C;&#x8BD1;class&#x8BED;&#x6CD5;
        &quot;transform-es2015-spread&quot;, //&#x8F6C;&#x8BD1;&#x6570;&#x7EC4;&#x89E3;&#x6784;
        &quot;transform-es2015-for-of&quot; //&#x8F6C;&#x8BD1;for-of
    ]
}
//&#x5982;&#x679C;&#x8981;&#x4E3A;&#x67D0;&#x4E2A;&#x63D2;&#x4EF6;&#x6DFB;&#x52A0;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x6309;&#x5982;&#x4E0B;&#x5199;&#x6CD5;&#xFF1A;
{
    &quot;plugins&quot;:[
        //&#x6539;&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x4E3A;&#x914D;&#x7F6E;&#x9879;
        [&quot;transform-es2015-arrow-functions&quot;, { &quot;spec&quot;: true }]
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">&quot;plugins&quot;</span>: [
        <span class="hljs-string">&quot;transform-es2015-arrow-functions&quot;</span>, <span class="hljs-comment">//&#x8F6C;&#x8BD1;&#x7BAD;&#x5934;&#x51FD;&#x6570;</span>
        <span class="hljs-string">&quot;transform-es2015-classes&quot;</span>, <span class="hljs-comment">//&#x8F6C;&#x8BD1;class&#x8BED;&#x6CD5;</span>
        <span class="hljs-string">&quot;transform-es2015-spread&quot;</span>, <span class="hljs-comment">//&#x8F6C;&#x8BD1;&#x6570;&#x7EC4;&#x89E3;&#x6784;</span>
        <span class="hljs-string">&quot;transform-es2015-for-of&quot;</span> <span class="hljs-comment">//&#x8F6C;&#x8BD1;for-of</span>
    ]
}
<span class="hljs-comment">//&#x5982;&#x679C;&#x8981;&#x4E3A;&#x67D0;&#x4E2A;&#x63D2;&#x4EF6;&#x6DFB;&#x52A0;&#x914D;&#x7F6E;&#x9879;&#xFF0C;&#x6309;&#x5982;&#x4E0B;&#x5199;&#x6CD5;&#xFF1A;</span>
{
    <span class="hljs-string">&quot;plugins&quot;</span>:[
        <span class="hljs-comment">//&#x6539;&#x4E3A;&#x6570;&#x7EC4;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x5143;&#x7D20;&#x4E3A;&#x914D;&#x7F6E;&#x9879;</span>
        [<span class="hljs-string">&quot;transform-es2015-arrow-functions&quot;</span>, { <span class="hljs-string">&quot;spec&quot;</span>: <span class="hljs-literal">true</span> }]
    ]
}</code></pre><p>&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x90FD;&#x53EA;&#x662F;&#x8BED;&#x6CD5;&#x5C42;&#x6B21;&#x7684;&#x8F6C;&#x8BD1;&#xFF0C;&#x524D;&#x9762;&#x8BF4;&#x8FC7;&#x6709;&#x4E9B;api&#x5C42;&#x6B21;&#x7684;&#x4E1C;&#x897F;&#x9700;&#x8981;&#x5F15;&#x5165;polyfill&#xFF0C;&#x540C;&#x6837;babel&#x4E5F;&#x6709;&#x4E00;&#x7CFB;&#x5217;&#x63D2;&#x4EF6;&#x6765;&#x652F;&#x6301;&#x8FD9;&#x4E9B;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;:[
        //&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x4F7F;&#x7528;Object.assign&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x7528;&#x5982;&#x4E0B;&#x63D2;&#x4EF6;
        &quot;transform-object-assign&quot;
    ]
}

//&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;Object.assign&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;
const people = Object.assign({}, {
    name: &apos;shenfq&apos;
});
//&#x7ECF;&#x8FC7;babel&#x8F6C;&#x8BD1;&#x540E;&#x5982;&#x4E0B;&#xFF1A;
var _extends = Object.assign || function (target) { for (var i = 1; i &lt; arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const people = _extends({}, {
    name: &apos;shenfq&apos;
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">&quot;plugins&quot;</span>:[
        <span class="hljs-comment">//&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x4F7F;&#x7528;Object.assign&#x65B9;&#x6CD5;&#xFF0C;&#x5C31;&#x7528;&#x5982;&#x4E0B;&#x63D2;&#x4EF6;</span>
        <span class="hljs-string">&quot;transform-object-assign&quot;</span>
    ]
}

<span class="hljs-comment">//&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x4F7F;&#x7528;Object.assign&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</span>
<span class="hljs-keyword">const</span> people = <span class="hljs-built_in">Object</span>.assign({}, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;shenfq&apos;</span>
});
<span class="hljs-comment">//&#x7ECF;&#x8FC7;babel&#x8F6C;&#x8BD1;&#x540E;&#x5982;&#x4E0B;&#xFF1A;</span>
<span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{ <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) { <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i]; <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) { <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } <span class="hljs-keyword">return</span> target; };

<span class="hljs-keyword">const</span> people = _extends({}, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;shenfq&apos;</span>
});</code></pre><p>&#x8FD9;&#x79CD;&#x901A;&#x8FC7;transform&#x6DFB;&#x52A0;&#x7684;polyfill&#x53EA;&#x4F1A;&#x5F15;&#x5165;&#x5230;&#x5F53;&#x524D;&#x6A21;&#x5757;&#x4E2D;&#xFF0C;&#x8BD5;&#x60F3;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x4E2D;&#x5B58;&#x5728;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x4F7F;&#x7528;&#x540C;&#x4E00;&#x4E2A;api&#xFF0C;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x90FD;&#x5F15;&#x5165;&#x76F8;&#x540C;&#x7684;polyfill&#xFF0C;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x7684;&#x4EE3;&#x7801;&#x51FA;&#x73B0;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x8FD9;&#x80AF;&#x5B9A;&#x662F;&#x4E00;&#x79CD;&#x707E;&#x96BE;&#x3002;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x5F15;&#x5165;&#x9700;&#x8981;polyfill&#x7684;transform&#x633A;&#x9EBB;&#x70E6;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x4E0D;&#x80FD;&#x4FDD;&#x8BC1;&#x624B;&#x52A8;&#x5F15;&#x5165;&#x7684;transform&#x4E00;&#x5B9A;&#x6B63;&#x786E;&#xFF0C;&#x7B49;&#x4F1A;&#x4F1A;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;<code>transform-runtime</code>&#x3002;</p><p>&#x9664;&#x4E86;&#x6DFB;&#x52A0;polyfill&#xFF0C;babel&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x5DE5;&#x5177;&#x5305;helpers&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6709;&#x5B89;&#x88C5;babel-cli&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7;&#x4E0B;&#x9762;&#x7684;&#x547D;&#x4EE4;&#x628A;&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x5305;&#x8F93;&#x51FA;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./node_modules/.bin/babel-external-helpers &gt; helpers.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code class="shell" style="word-break:break-word;white-space:initial">./node_modules/.<span class="hljs-keyword">bin/babel-external-helpers </span>&gt; helpers.js</code></pre><p>&#x8FD9;&#x4E2A;&#x5DE5;&#x5177;&#x5305;&#x7C7B;&#x4F3C;&#x4E8E;babel&#x7684;utils&#x6A21;&#x5757;&#xFF0C;&#x5C31;&#x50CF;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x4E2D;&#x7684;utils&#x4E00;&#x6837;&#xFF0C;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x90FD;&#x4F1A;&#x7528;&#x5230;&#xFF0C;&#x4F8B;&#x5982;babel&#x5B9E;&#x73B0;Object.assign&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x7684;helpers&#x4E2D;&#x7684;_extend&#x65B9;&#x6CD5;&#x3002;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x591A;&#x6B21;&#x5F15;&#x7528;babel&#x7684;&#x52A9;&#x624B;&#x51FD;&#x6570;&#xFF0C;&#x901A;&#x8FC7;<code>external-helpers</code>&#x63D2;&#x4EF6;&#xFF0C;&#x80FD;&#x591F;&#x628A;&#x8FD9;&#x4E9B;&#x52A9;&#x624B;&#x51FD;&#x6570;&#x62BD;&#x51FA;&#x653E;&#x5230;&#x6587;&#x4EF6;&#x9876;&#x90E8;&#xFF0C;&#x907F;&#x514D;&#x591A;&#x6B21;&#x5F15;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5B89;&#x88C5;&#xFF1A; cnpm install --save-dev babel-plugin-external-helpers

//&#x914D;&#x7F6E;
{
  &quot;plugins&quot;: [&quot;external-helpers&quot;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5B89;&#x88C5;&#xFF1A; cnpm install --save-dev babel-plugin-external-helpers</span>

<span class="hljs-comment">//&#x914D;&#x7F6E;</span>
{
  <span class="hljs-string">&quot;plugins&quot;</span>: [<span class="hljs-string">&quot;external-helpers&quot;</span>]
}</code></pre><p>&#x867D;&#x7136;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x80FD;&#x907F;&#x514D;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x591A;&#x6B21;&#x5F15;&#x7528;&#x52A9;&#x624B;&#x51FD;&#x6570;&#xFF0C;&#x4F46;&#x662F;&#x5E76;&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x907F;&#x514D;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#x5185;&#x91CD;&#x590D;&#x5F15;&#x7528;&#xFF0C;&#x8FD9;&#x4E0E;&#x524D;&#x9762;&#x8BF4;&#x5230;&#x7684;&#x901A;&#x8FC7;transform&#x6DFB;&#x52A0;polyfill&#x662F;&#x4E00;&#x6837;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E9B;&#x5F15;&#x7528;&#x90FD;&#x53EA;&#x662F;module&#x7EA7;&#x522B;&#x7684;&#xFF0C;&#x5728;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x76DB;&#x884C;&#x7684;&#x4ECA;&#x5929;&#xFF0C;&#x9700;&#x8981;&#x8003;&#x8651;&#x5982;&#x4F55;&#x51CF;&#x5C11;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x91CD;&#x590D;&#x5F15;&#x7528;&#x76F8;&#x540C;&#x4EE3;&#x7801;&#x9020;&#x6210;&#x4EE3;&#x7801;&#x5197;&#x4F59;&#x3002;</p><p>&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x6BCF;&#x4E2A;&#x9700;&#x8981;&#x4F7F;&#x7528;helpers&#x7684;js&#x6587;&#x4EF6;&#x9876;&#x90E8;&#x76F4;&#x63A5;&#x5F15;&#x5165;&#x4E4B;&#x524D;&#x751F;&#x6210;&#x7684;helpers&#x6587;&#x4EF6;&#x65E2;&#x53EF;&#xFF0C;&#x901A;&#x8FC7;&#x6253;&#x5305;&#x5DE5;&#x5177;&#x5C06;&#x8FD9;&#x4E2A;&#x516C;&#x5171;&#x6A21;&#x5757;&#x8FDB;&#x884C;&#x62BD;&#x79BB;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;helpers&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;helpers&apos;</span>);</code></pre><p>&#x5728;&#x8BF4;&#x5B8C;babel&#x7684;helpers&#x4E4B;&#x540E;&#x5C31;&#x5230;&#x4E86;&#x63D2;&#x4EF6;&#x7CFB;&#x7EDF;&#x7684;&#x6700;&#x540E;&#x7684;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF1A;<code>transform-runtime</code>&#x3002;&#x524D;&#x9762;&#x5728;transform-polyfill&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x6709;&#x63D0;&#x5230;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x4E4B;&#x6240;&#x4EE5;&#x628A;&#x5B83;&#x653E;&#x5230;helpers&#x540E;&#x9762;&#x662F;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x80FD;&#x81EA;&#x52A8;&#x4E3A;&#x9879;&#x76EE;&#x5F15;&#x5165;polyfill&#x548C;helpers&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install -D babel-plugin-transform-runtime babel-runtime" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gradle"><code class="shell" style="word-break:break-word;white-space:initial">cnpm install -D babel-plugin-transform-<span class="hljs-keyword">runtime</span> babel-<span class="hljs-keyword">runtime</span></code></pre><p>transform-runtime&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x4F9D;&#x8D56;&#x4E8E;babel-runtime&#xFF0C;&#x6240;&#x4EE5;&#x5B89;&#x88C5;transform-runtime&#x7684;&#x540C;&#x65F6;&#x6700;&#x597D;&#x4E5F;&#x5B89;&#x88C5;babel-runtime&#xFF0C;&#x4E3A;&#x4E86;&#x9632;&#x6B62;&#x4E00;&#x4E9B;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x9519;&#x8BEF;&#x3002;babel-runtime&#x7531;&#x4E09;&#x4E2A;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF1A;</p><ol><li><p><a href="https://github.com/zloirock/core-js" rel="nofollow noreferrer" target="_blank">core-js</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; core-js&#x6781;&#x5176;&#x5F3A;&#x608D;&#xFF0C;&#x901A;&#x8FC7;ES3&#x5B9E;&#x73B0;&#x4E86;&#x5927;&#x90E8;&#x5206;&#x7684;ES5&#x3001;6&#x3001;7&#x7684;&#x57AB;&#x7247;&#xFF0C;&#x4F5C;&#x8005;zloirock&#x662F;&#x6765;&#x81EA;&#x6218;&#x6597;&#x540D;&#x65CF;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x4E00;&#x4E2A;&#x4EBA;&#x7EF4;&#x62A4;&#x7740;core-js&#xFF0C;&#x542C;&#x8BF4;&#x4ED6;&#x6700;&#x8FD1;&#x8FD8;&#x5728;&#x627E;&#x5DE5;&#x4F5C;&#xFF0C;&#x4E0A;&#x9762;&#x662F;core-js&#x7684;github&#x5730;&#x5740;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs x86asm"><code style="word-break:break-word;white-space:initial">&gt; core-<span class="hljs-keyword">js</span>&#x6781;&#x5176;&#x5F3A;&#x608D;&#xFF0C;&#x901A;&#x8FC7;ES3&#x5B9E;&#x73B0;&#x4E86;&#x5927;&#x90E8;&#x5206;&#x7684;ES5&#x3001;<span class="hljs-number">6</span>&#x3001;<span class="hljs-number">7</span>&#x7684;&#x57AB;&#x7247;&#xFF0C;&#x4F5C;&#x8005;zloirock&#x662F;&#x6765;&#x81EA;&#x6218;&#x6597;&#x540D;&#x65CF;&#x7684;&#x7A0B;&#x5E8F;&#x5458;&#xFF0C;&#x4E00;&#x4E2A;&#x4EBA;&#x7EF4;&#x62A4;&#x7740;core-<span class="hljs-keyword">js</span>&#xFF0C;&#x542C;&#x8BF4;&#x4ED6;&#x6700;&#x8FD1;&#x8FD8;&#x5728;&#x627E;&#x5DE5;&#x4F5C;&#xFF0C;&#x4E0A;&#x9762;&#x662F;core-<span class="hljs-keyword">js</span>&#x7684;github&#x5730;&#x5740;&#xFF0C;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x4EE5;&#x53BB;&#x770B;&#x770B;&#x3002;</code></pre></li><li><p><a href="http://facebook.github.io/regenerator/" rel="nofollow noreferrer" target="_blank">regenerator</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; regenerator&#x6765;&#x81EA;facebook&#x7684;&#x4E00;&#x4E2A;&#x5E93;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0; generator functions&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial">&gt; regenerator&#x6765;&#x81EA;facebook&#x7684;&#x4E00;&#x4E2A;&#x5E93;&#xFF0C;&#x7528;&#x4E8E;&#x5B9E;&#x73B0; generator <span class="hljs-built_in">functions</span>&#x3002;</code></pre></li><li><p>helpers</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&gt; babel&#x7684;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF0C;&#x6CA1;&#x9519;&#xFF0C;&#x8FD9;&#x4E2A;helpers&#x548C;&#x524D;&#x9762;&#x4F7F;&#x7528;babel-external-helpers&#x751F;&#x6210;&#x7684;helpers&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs armasm"><code>&gt; <span class="hljs-keyword">babel&#x7684;&#x4E00;&#x4E9B;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#xFF0C;&#x6CA1;&#x9519;&#xFF0C;&#x8FD9;&#x4E2A;helpers&#x548C;&#x524D;&#x9762;&#x4F7F;&#x7528;babel-external-helpers&#x751F;&#x6210;&#x7684;helpers&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;
</span></code></pre></li></ol><p>&#x4ECE;babel-runtime&#x7684;package.json&#x6587;&#x4EF6;&#x4E2D;&#x4E5F;&#x80FD;&#x770B;&#x51FA;&#xFF0C;runtime&#x4F9D;&#x8D56;&#x4E86;&#x54EA;&#x4E9B;&#x4E1C;&#x897F;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000011665653?w=817&amp;h=355" src="https://static.alili.tech/img/remote/1460000011665653?w=817&amp;h=355" alt="babel-runtime&#x7684;package.json" title="babel-runtime&#x7684;package.json" style="cursor:pointer"></span></p><p>&#x5B89;&#x88C5;&#x6709;babel-runtime&#x4E4B;&#x540E;&#x8981;&#x5F15;&#x5165;helpers&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&apos;babel-runtime/helpers&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;babel-runtime/helpers&apos;</span>);</code></pre><p>&#x4F7F;&#x7528;runtime&#x7684;&#x65F6;&#x5019;&#x8FD8;&#x6709;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x9879;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;plugins&quot;: [
        [&quot;transform-runtime&quot;, {
            &quot;helpers&quot;: false, //&#x81EA;&#x52A8;&#x5F15;&#x5165;helpers
            &quot;polyfill&quot;: false, //&#x81EA;&#x52A8;&#x5F15;&#x5165;polyfill&#xFF08;core-js&#x63D0;&#x4F9B;&#x7684;polyfill&#xFF09;
            &quot;regenerator&quot;: true, //&#x81EA;&#x52A8;&#x5F15;&#x5165;regenerator
        }]
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-string">&quot;plugins&quot;</span>: [
        [<span class="hljs-string">&quot;transform-runtime&quot;</span>, {
            <span class="hljs-string">&quot;helpers&quot;</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//&#x81EA;&#x52A8;&#x5F15;&#x5165;helpers</span>
            <span class="hljs-string">&quot;polyfill&quot;</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">//&#x81EA;&#x52A8;&#x5F15;&#x5165;polyfill&#xFF08;core-js&#x63D0;&#x4F9B;&#x7684;polyfill&#xFF09;</span>
            <span class="hljs-string">&quot;regenerator&quot;</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">//&#x81EA;&#x52A8;&#x5F15;&#x5165;regenerator</span>
        }]
    ]
}</code></pre><p><strong>&#x6BD4;&#x8F83;transform-runtime&#x4E0E;babel-polyfill&#x5F15;&#x5165;&#x57AB;&#x7247;&#x7684;&#x5DEE;&#x5F02;&#xFF1A;</strong></p><ol><li>&#x4F7F;&#x7528;runtime&#x662F;&#x6309;&#x9700;&#x5F15;&#x5165;&#xFF0C;&#x9700;&#x8981;&#x7528;&#x5230;&#x54EA;&#x4E9B;polyfill&#xFF0C;runtime&#x5C31;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x5F15;&#x5165;&#x54EA;&#x4E9B;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x518D;&#x624B;&#x52A8;&#x4E00;&#x4E2A;&#x4E2A;&#x7684;&#x53BB;&#x914D;&#x7F6E;plugins&#xFF0C;&#x53EA;&#x662F;&#x5F15;&#x5165;&#x7684;polyfill&#x4E0D;&#x662F;&#x5168;&#x5C40;&#x6027;&#x7684;&#xFF0C;&#x6709;&#x4E9B;&#x5C40;&#x9650;&#x6027;&#x3002;&#x800C;&#x4E14;runtime&#x5F15;&#x5165;&#x7684;polyfill&#x4E0D;&#x4F1A;&#x6539;&#x5199;&#x4E00;&#x4E9B;&#x5B9E;&#x4F8B;&#x65B9;&#x6CD5;&#xFF0C;&#x6BD4;&#x5982;Object&#x548C;Array&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x50CF;&#x524D;&#x9762;&#x63D0;&#x5230;&#x7684;<code>Array.protype.includes</code>&#x3002;</li><li>babel-polyfill&#x5C31;&#x80FD;&#x89E3;&#x51B3;runtime&#x7684;&#x90A3;&#x4E9B;&#x95EE;&#x9898;&#xFF0C;&#x5B83;&#x7684;&#x57AB;&#x7247;&#x662F;&#x5168;&#x5C40;&#x7684;&#xFF0C;&#x800C;&#x4E14;&#x5168;&#x80FD;&#xFF0C;&#x57FA;&#x672C;&#x4E0A;ES6&#x4E2D;&#x8981;&#x7528;&#x5230;&#x7684;polyfill&#x5728;babel-polyfill&#x4E2D;&#x90FD;&#x6709;&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;ES6+&#x7684;&#x73AF;&#x5883;&#x3002;babel&#x5B98;&#x65B9;&#x5EFA;&#x8BAE;&#x53EA;&#x8981;&#x4E0D;&#x5728;&#x610F;babel-polyfill&#x7684;&#x4F53;&#x79EF;&#xFF0C;&#x6700;&#x597D;&#x8FDB;&#x884C;&#x5168;&#x5C40;&#x5F15;&#x5165;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x662F;&#x6700;&#x7A33;&#x59A5;&#x7684;&#x65B9;&#x5F0F;&#x3002;</li><li>&#x4E00;&#x822C;&#x7684;&#x5EFA;&#x8BAE;&#x662F;&#x5F00;&#x53D1;&#x4E00;&#x4E9B;&#x6846;&#x67B6;&#x6216;&#x8005;&#x5E93;&#x7684;&#x65F6;&#x5019;&#x4F7F;&#x7528;&#x4E0D;&#x4F1A;&#x6C61;&#x67D3;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x7684;babel-runtime&#xFF0C;&#x800C;&#x5F00;&#x53D1;web&#x5E94;&#x7528;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x5168;&#x5C40;&#x5F15;&#x5165;babel-polyfill&#x907F;&#x514D;&#x4E00;&#x4E9B;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x9519;&#x8BEF;&#xFF0C;&#x800C;&#x4E14;&#x5927;&#x578B;web&#x5E94;&#x7528;&#x4E2D;&#x5168;&#x5C40;&#x5F15;&#x5165;babel-polyfill&#x53EF;&#x80FD;&#x8FD8;&#x4F1A;&#x51CF;&#x5C11;&#x4F60;&#x6253;&#x5305;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#xFF08;&#x76F8;&#x6BD4;&#x8D77;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#x5F15;&#x5165;&#x91CD;&#x590D;&#x7684;polyfill&#x6765;&#x8BF4;&#xFF09;&#x3002;</li></ol><hr><h5>presets</h5><p>&#x663E;&#x7136;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x63D2;&#x4EF6;&#x4F1A;&#x975E;&#x5E38;&#x7684;&#x9EBB;&#x70E6;&#xFF0C;&#x4E3A;&#x4E86;&#x65B9;&#x4FBF;&#xFF0C;babel&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x914D;&#x7F6E;&#x9879;&#x53EB;&#x505A;persets&#xFF08;&#x9884;&#x8BBE;&#xFF09;&#x3002;</p><p>&#x9884;&#x8BBE;&#x5C31;&#x662F;&#x4E00;&#x7CFB;&#x5217;&#x63D2;&#x4EF6;&#x7684;&#x96C6;&#x5408;&#xFF0C;&#x5C31;&#x597D;&#x50CF;&#x4FEE;&#x56FE;&#x4E00;&#x6837;&#xFF0C;&#x628A;&#x4E0A;&#x6B21;&#x4FEE;&#x56FE;&#x7684;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x4FDD;&#x5B58;&#x4E3A;&#x4E00;&#x4E2A;&#x9884;&#x8BBE;&#xFF0C;&#x4E0B;&#x6B21;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;</p><p>&#x5982;&#x679C;&#x8981;&#x8F6C;&#x8BD1;ES6&#x8BED;&#x6CD5;&#xFF0C;&#x53EA;&#x8981;&#x6309;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#x914D;&#x7F6E;&#x5373;&#x53EF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5148;&#x5B89;&#x88C5;ES6&#x76F8;&#x5173;preset&#xFF1A; cnpm install -D babel-preset-es2015
{
    &quot;presets&quot;: [&quot;es2015&quot;]
}

//&#x5982;&#x679C;&#x8981;&#x8F6C;&#x8BD1;&#x7684;&#x8BED;&#x6CD5;&#x4E0D;&#x6B62;ES6&#xFF0C;&#x8FD8;&#x6709;&#x5404;&#x4E2A;&#x63D0;&#x6848;&#x9636;&#x6BB5;&#x7684;&#x8BED;&#x6CD5;&#x4E5F;&#x60F3;&#x4F53;&#x9A8C;&#xFF0C;&#x53EF;&#x4EE5;&#x6309;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#x3002;
//&#x5B89;&#x88C5;&#x9700;&#x8981;&#x7684;preset&#xFF1A; cnpm install -D babel-preset-stage-0 babel-preset-stage-1 babel-preset-stage-2 babel-preset-stage-3
{
    &quot;presets&quot;: [
        &quot;es2015&quot;,
        &quot;stage-0&quot;,
        &quot;stage-1&quot;,
        &quot;stage-2&quot;,
        &quot;stage-3&quot;,
    ]
}

//&#x540C;&#x6837;babel&#x4E5F;&#x80FD;&#x76F4;&#x63A5;&#x8F6C;&#x8BD1;jsx&#x8BED;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x5F15;&#x5165;react&#x7684;&#x9884;&#x8BBE;
//cnpm install -D babel-preset-react
{
    &quot;presets&quot;: [
        &quot;es2015&quot;,
        &quot;react&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//&#x5148;&#x5B89;&#x88C5;ES6&#x76F8;&#x5173;preset&#xFF1A; cnpm install -D babel-preset-es2015</span>
{
    <span class="hljs-string">&quot;presets&quot;</span>: [<span class="hljs-string">&quot;es2015&quot;</span>]
}

<span class="hljs-comment">//&#x5982;&#x679C;&#x8981;&#x8F6C;&#x8BD1;&#x7684;&#x8BED;&#x6CD5;&#x4E0D;&#x6B62;ES6&#xFF0C;&#x8FD8;&#x6709;&#x5404;&#x4E2A;&#x63D0;&#x6848;&#x9636;&#x6BB5;&#x7684;&#x8BED;&#x6CD5;&#x4E5F;&#x60F3;&#x4F53;&#x9A8C;&#xFF0C;&#x53EF;&#x4EE5;&#x6309;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#x3002;</span>
<span class="hljs-comment">//&#x5B89;&#x88C5;&#x9700;&#x8981;&#x7684;preset&#xFF1A; cnpm install -D babel-preset-stage-0 babel-preset-stage-1 babel-preset-stage-2 babel-preset-stage-3</span>
{
    <span class="hljs-string">&quot;presets&quot;</span>: [
        <span class="hljs-string">&quot;es2015&quot;</span>,
        <span class="hljs-string">&quot;stage-0&quot;</span>,
        <span class="hljs-string">&quot;stage-1&quot;</span>,
        <span class="hljs-string">&quot;stage-2&quot;</span>,
        <span class="hljs-string">&quot;stage-3&quot;</span>,
    ]
}

<span class="hljs-comment">//&#x540C;&#x6837;babel&#x4E5F;&#x80FD;&#x76F4;&#x63A5;&#x8F6C;&#x8BD1;jsx&#x8BED;&#x6CD5;&#xFF0C;&#x901A;&#x8FC7;&#x5F15;&#x5165;react&#x7684;&#x9884;&#x8BBE;</span>
<span class="hljs-comment">//cnpm install -D babel-preset-react</span>
{
    <span class="hljs-string">&quot;presets&quot;</span>: [
        <span class="hljs-string">&quot;es2015&quot;</span>,
        <span class="hljs-string">&quot;react&quot;</span>
    ]
}</code></pre><p>&#x4E0D;&#x8FC7;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;preset&#x5B98;&#x65B9;&#x73B0;&#x5728;&#x90FD;&#x5DF2;&#x7ECF;&#x4E0D;&#x63A8;&#x8350;&#x4E86;&#xFF0C;&#x5B98;&#x65B9;<strong>&#x552F;&#x4E00;&#x63A8;&#x8350;</strong>preset&#xFF1A;<code>babel-preset-env</code>&#x3002;</p><p>&#x8FD9;&#x6B3E;preset&#x80FD;&#x7075;&#x6D3B;&#x51B3;&#x5B9A;&#x52A0;&#x8F7D;&#x54EA;&#x4E9B;&#x63D2;&#x4EF6;&#x548C;polyfill&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD8;&#x662F;&#x5F97;&#x5F00;&#x53D1;&#x8005;&#x624B;&#x52A8;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// cnpm install -D babel-preset -env
{
    &quot;presets&quot;: [
        [&quot;env&quot;, {
            &quot;targets&quot;: { //&#x6307;&#x5B9A;&#x8981;&#x8F6C;&#x8BD1;&#x5230;&#x54EA;&#x4E2A;&#x73AF;&#x5883;
                //&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;
                &quot;browsers&quot;: [&quot;last 2 versions&quot;, &quot;safari &gt;= 7&quot;],
                //node&#x73AF;&#x5883;
                &quot;node&quot;: &quot;6.10&quot;, //&quot;current&quot;  &#x4F7F;&#x7528;&#x5F53;&#x524D;&#x7248;&#x672C;&#x7684;node
                
            },
             //&#x662F;&#x5426;&#x5C06;ES6&#x7684;&#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x8F6C;&#x8BD1;&#x6210;&#x5176;&#x4ED6;&#x7C7B;&#x578B;
             //&#x53C2;&#x6570;&#xFF1A;&quot;amd&quot; | &quot;umd&quot; | &quot;systemjs&quot; | &quot;commonjs&quot; | false&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&apos;commonjs&apos;
            &quot;modules&quot;: &apos;commonjs&apos;,
            //&#x662F;&#x5426;&#x8FDB;&#x884C;debug&#x64CD;&#x4F5C;&#xFF0C;&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x6240;&#x6709;&#x63D2;&#x4EF6;&#x4E2D;&#x7684;log&#xFF0C;&#x5DF2;&#x7ECF;&#x63D2;&#x4EF6;&#x7684;&#x7248;&#x672C;
            &quot;debug&quot;: false,
            //&#x5F3A;&#x5236;&#x5F00;&#x542F;&#x67D0;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;[]
            &quot;include&quot;: [&quot;transform-es2015-arrow-functions&quot;],
            //&#x7981;&#x7528;&#x67D0;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;[]
            &quot;exclude&quot;: [&quot;transform-es2015-for-of&quot;],
            //&#x662F;&#x5426;&#x81EA;&#x52A8;&#x5F15;&#x5165;polyfill&#xFF0C;&#x5F00;&#x542F;&#x6B64;&#x9009;&#x9879;&#x5FC5;&#x987B;&#x4FDD;&#x8BC1;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x4E86;babel-polyfill
            //&#x53C2;&#x6570;&#xFF1A;Boolean&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false.
            &quot;useBuiltIns&quot;: false
        }]
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// cnpm install -D babel-preset -env</span>
{
    <span class="hljs-string">&quot;presets&quot;</span>: [
        [<span class="hljs-string">&quot;env&quot;</span>, {
            <span class="hljs-string">&quot;targets&quot;</span>: { <span class="hljs-comment">//&#x6307;&#x5B9A;&#x8981;&#x8F6C;&#x8BD1;&#x5230;&#x54EA;&#x4E2A;&#x73AF;&#x5883;</span>
                <span class="hljs-comment">//&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;</span>
                <span class="hljs-string">&quot;browsers&quot;</span>: [<span class="hljs-string">&quot;last 2 versions&quot;</span>, <span class="hljs-string">&quot;safari &gt;= 7&quot;</span>],
                <span class="hljs-comment">//node&#x73AF;&#x5883;</span>
                <span class="hljs-string">&quot;node&quot;</span>: <span class="hljs-string">&quot;6.10&quot;</span>, <span class="hljs-comment">//&quot;current&quot;  &#x4F7F;&#x7528;&#x5F53;&#x524D;&#x7248;&#x672C;&#x7684;node</span>
                
            },
             <span class="hljs-comment">//&#x662F;&#x5426;&#x5C06;ES6&#x7684;&#x6A21;&#x5757;&#x5316;&#x8BED;&#x6CD5;&#x8F6C;&#x8BD1;&#x6210;&#x5176;&#x4ED6;&#x7C7B;&#x578B;</span>
             <span class="hljs-comment">//&#x53C2;&#x6570;&#xFF1A;&quot;amd&quot; | &quot;umd&quot; | &quot;systemjs&quot; | &quot;commonjs&quot; | false&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;&apos;commonjs&apos;</span>
            <span class="hljs-string">&quot;modules&quot;</span>: <span class="hljs-string">&apos;commonjs&apos;</span>,
            <span class="hljs-comment">//&#x662F;&#x5426;&#x8FDB;&#x884C;debug&#x64CD;&#x4F5C;&#xFF0C;&#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x51FA;&#x6240;&#x6709;&#x63D2;&#x4EF6;&#x4E2D;&#x7684;log&#xFF0C;&#x5DF2;&#x7ECF;&#x63D2;&#x4EF6;&#x7684;&#x7248;&#x672C;</span>
            <span class="hljs-string">&quot;debug&quot;</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-comment">//&#x5F3A;&#x5236;&#x5F00;&#x542F;&#x67D0;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;[]</span>
            <span class="hljs-string">&quot;include&quot;</span>: [<span class="hljs-string">&quot;transform-es2015-arrow-functions&quot;</span>],
            <span class="hljs-comment">//&#x7981;&#x7528;&#x67D0;&#x4E9B;&#x6A21;&#x5757;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;[]</span>
            <span class="hljs-string">&quot;exclude&quot;</span>: [<span class="hljs-string">&quot;transform-es2015-for-of&quot;</span>],
            <span class="hljs-comment">//&#x662F;&#x5426;&#x81EA;&#x52A8;&#x5F15;&#x5165;polyfill&#xFF0C;&#x5F00;&#x542F;&#x6B64;&#x9009;&#x9879;&#x5FC5;&#x987B;&#x4FDD;&#x8BC1;&#x5DF2;&#x7ECF;&#x5B89;&#x88C5;&#x4E86;babel-polyfill</span>
            <span class="hljs-comment">//&#x53C2;&#x6570;&#xFF1A;Boolean&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;false.</span>
            <span class="hljs-string">&quot;useBuiltIns&quot;</span>: <span class="hljs-literal">false</span>
        }]
    ]
}</code></pre><p>&#x5173;&#x4E8E;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x53C2;&#x6570;<code>useBuiltIns</code>&#xFF0C;&#x6709;&#x4E24;&#x70B9;&#x5FC5;&#x987B;&#x8981;&#x6CE8;&#x610F;&#xFF1A;</p><ol><li>&#x5982;&#x679C;useBuiltIns&#x4E3A;true&#xFF0C;&#x9879;&#x76EE;&#x4E2D;&#x5FC5;&#x987B;&#x5F15;&#x5165;babel-polyfill&#x3002;</li><li>babel-polyfill&#x53EA;&#x80FD;&#x88AB;&#x5F15;&#x5165;&#x4E00;&#x6B21;&#xFF0C;&#x5982;&#x679C;&#x591A;&#x6B21;&#x5F15;&#x5165;&#x4F1A;&#x9020;&#x6210;&#x5168;&#x5C40;&#x4F5C;&#x7528;&#x57DF;&#x7684;&#x51B2;&#x7A81;&#x3002;</li></ol><p>&#x505A;&#x4E86;&#x4E2A;&#x5B9E;&#x9A8C;&#xFF0C;&#x540C;&#x6837;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x53EA;&#x662F;<code>.babelrc</code>&#x914D;&#x7F6E;&#x4E2D;&#x4E00;&#x4E2A;&#x5F00;&#x542F;&#x4E86;<code>useBuiltIns</code>&#xFF0C;&#x4E00;&#x4E2A;&#x6CA1;&#x6709;&#xFF0C;&#x4E24;&#x4E2A;js&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x76F8;&#x5DEE;70K&#xFF0C;<a href="https://github.com/Shenfq/studyBabel/tree/master/7-babel-env" rel="nofollow noreferrer" target="_blank">&#x6233;&#x6211;&#x770B;&#x770B;</a>&#x3002;</p><table><thead><tr><th>&#x6587;&#x4EF6;</th><th>&#x5927;&#x5C0F;</th></tr></thead><tbody><tr><td>useBuiltIns.js</td><td>189kb</td></tr><tr><td>notUseBuiltIns.js</td><td>259kb</td></tr></tbody></table><p><strong>&#x6700;&#x540E;&#x5570;&#x55E6;&#x4E00;&#x53E5;</strong></p><p>&#x5173;&#x4E8E;polyfill&#x8FD8;&#x6709;&#x4E2A;&#x53EB;&#x505A;<a href="https://polyfill.io/v2/docs/" rel="nofollow noreferrer" target="_blank">polyfill.io</a>&#x7684;&#x795E;&#x5668;&#xFF0C;&#x53EA;&#x8981;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x5F15;&#x5165;</p><blockquote><p><a href="https://cdn.polyfill.io/v2/polyfill.js" rel="nofollow noreferrer" target="_blank">https://cdn.polyfill.io/v2/po...</a></p></blockquote><p>&#x670D;&#x52A1;&#x5668;&#x4F1A;&#x66F4;&#x5177;&#x6D4F;&#x89C8;&#x5668;&#x7684;UserAgent&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x7684;polyfill&#x6587;&#x4EF6;&#xFF0C;&#x5F88;&#x795E;&#x5947;&#xFF0C;&#x53EF;&#x4EE5;&#x8BF4;&#x8FD9;&#x662F;&#x76EE;&#x524D;&#x6700;&#x4F18;&#x96C5;&#x7684;&#x89E3;&#x51B3;polyfill&#x8FC7;&#x5927;&#x7684;&#x65B9;&#x6848;&#x3002;</p><hr><p>&#x524D;&#x524D;&#x540E;&#x540E;&#x5199;&#x5B8C;&#x8FD9;&#x4E2A;&#x5DEE;&#x4E0D;&#x591A;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x661F;&#x671F;&#xFF0C;&#x67E5;&#x4E86;&#x5F88;&#x591A;&#x8D44;&#x6599;&#xFF08;babel&#x7684;&#x5B98;&#x7F51;&#x548C;github&#x90FD;&#x770B;&#x4E86;&#x597D;&#x51E0;&#x904D;&#xFF09;&#xFF0C;&#x603B;&#x7B97;&#x618B;&#x51FA;&#x6765;&#x4E86;&#x3002;</p><p><a href="http://blog.sfqweb.com/2017/10/22/babel%E5%88%B0%E5%BA%95%E8%AF%A5%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%EF%BC%9F/" rel="nofollow noreferrer" target="_blank">&#x539F;&#x6587;&#x94FE;&#x63A5;</a></p><hr><h4>&#x53C2;&#x8003;</h4><ol><li><a href="https://www.zhihu.com/question/24715618" rel="nofollow noreferrer" target="_blank">ECMAScript 6 &#x4F1A;&#x91CD;&#x8E48; ECMAScript 4 &#x7684;&#x8986;&#x8F99;&#x5417;&#xFF1F;</a></li><li><a href="https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/README.md" rel="nofollow noreferrer" target="_blank">Babel&#x624B;&#x518C;</a></li><li><a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel&#x5B98;&#x7F51;</a></li><li><a href="http://2ality.com/2017/02/babel-preset-env.html" rel="nofollow noreferrer" target="_blank">babel-preset-env: a preset that configures Babel for you</a></li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
babel到底该如何配置？

## 原文链接
[https://segmentfault.com/a/1190000011665642](https://segmentfault.com/a/1190000011665642)

