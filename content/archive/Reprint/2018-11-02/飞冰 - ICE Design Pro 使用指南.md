---
title: 飞冰 - ICE Design Pro 使用指南
hidden: true
categories: reprint
slug: 2f03feca
date: 2018-11-02 02:30:12
---

{{< raw >}}
<h2 id="articleHeader0">&#x5199;&#x5728;&#x524D;&#x9762;&#xFF1A;</h2><p>&#x76EE;&#x524D;&#x5728;&#x98DE;&#x51B0;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86; 21 &#x5957;&#x6A21;&#x677F;(&#x540E;&#x7EED;&#x4F1A;&#x6301;&#x7EED;&#x7684;&#x589E;&#x52A0;)&#xFF0C;&#x53EF;&#x4EE5;&#x5728; Iceworks &#x7684;&#x6A21;&#x677F;&#x754C;&#x9762;&#x6839;&#x636E;&#x9700;&#x6C42;&#x9009;&#x62E9;&#x5408;&#x9002;&#x7684;&#x6A21;&#x677F;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x9879;&#x76EE;&#xFF0C;&#x7136;&#x540E;&#x57FA;&#x4E8E;&#x533A;&#x5757;&#x5FEB;&#x901F;&#x642D;&#x5EFA;&#x9875;&#x9762;&#x8FDB;&#x884C;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#xFF0C;&#x51CF;&#x5C11;&#x5404;&#x79CD;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x548C; UI &#x7F16;&#x5199;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x4ECE;&#x800C;&#x63D0;&#x9AD8;&#x5F00;&#x53D1;&#x6548;&#x7387;&#x3002;</p><p>&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x4E9B;&#x6A21;&#x677F;&#x6216;&#x591A;&#x6216;&#x5C11;&#x90FD;&#x6709;&#x5404;&#x81EA;&#x7684;&#x6A21;&#x677F;&#x7279;&#x5F81;&#xFF0C;&#x57FA;&#x4E8E;&#x4E0D;&#x540C;&#x7684;&#x884C;&#x4E1A;&#x9886;&#x57DF;&#xFF0C;&#x5176;&#x6A21;&#x677F;&#x98CE;&#x683C;&#xFF0C;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;&#x4E5F;&#x4E0D;&#x5C3D;&#x76F8;&#x540C;&#xFF0C;&#x4F46;&#x4E3B;&#x8981;&#x90FD;&#x662F; UI &#x4E3A;&#x4E3B;&#x3002;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x8BBE;&#x8BA1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C3D;&#x91CF;&#x4FDD;&#x6301;&#x6A21;&#x677F;&#x7684;&#x8F7B;&#x91CF;&#xFF0C;&#x56E0;&#x4E3A;&#x4E1A;&#x52A1;&#x7684;&#x5B9A;&#x5236;&#x6027;&#x592A;&#x5F3A;&#xFF0C;&#x5F88;&#x96BE;&#x8986;&#x76D6;&#x5230;&#x5177;&#x4F53;&#x7684;&#x573A;&#x666F;&#x3002;&#x4F46;&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x6536;&#x5230;&#x5F88;&#x591A;&#x7528;&#x6237;&#x7684;&#x53CD;&#x9988;&#xFF0C;UI &#x4EC5;&#x662F;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4E00;&#x5C0F;&#x6B65;&#xFF0C;&#x76EE;&#x524D; Iceworks &#x80FD;&#x6709;&#x6548;&#x7684;&#x51CF;&#x5C11;&#x73AF;&#x5883;&#x914D;&#x7F6E;&#x548C; UI &#x7F16;&#x5199;&#x7684;&#x65F6;&#x95F4;&#xFF0C;&#x4F46;&#x662F;&#x63A5;&#x4E0B;&#x6765;&#x5982;&#x4F55;&#x57FA;&#x4E8E;&#x6A21;&#x677F;&#x7ED3;&#x5408;&#x4E1A;&#x52A1;&#x8FDB;&#x884C;&#x4E8C;&#x6B21;&#x5F00;&#x53D1;&#xFF0C;&#x6BD4;&#x5982;&#x6570;&#x636E;&#x65B9;&#x6848;&#xFF0C;Mock &#x65B9;&#x6848;&#xFF0C;&#x6743;&#x9650;&#x65B9;&#x6848;&#x7B49;&#x7B49;&#x4E00;&#x7CFB;&#x5217;&#x95EE;&#x9898;&#x624D;&#x662F;&#x771F;&#x6B63;&#x7684;&#x5173;&#x952E;&#x95EE;&#x9898;&#x6240;&#x5728;&#x3002;&#x4E3A;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x63A8;&#x51FA;&#x4E86;<a href="https://github.com/alibaba/ice/wiki#ice-design-pro-%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3" rel="nofollow noreferrer" target="_blank">&#x300A;Ice Design Pro &#x4F7F;&#x7528;&#x6307;&#x5357;&#x300B;</a>&#xFF0C;&#x5728; UI &#x6A21;&#x677F;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#xFF0C;&#x63D0;&#x4F9B;&#x4E86; CRUD &#x793A;&#x4F8B;&#x3001;&#x6CE8;&#x518C;&#x767B;&#x5F55;&#x3001; &#x6570;&#x636E;&#x65B9;&#x6848;&#x3001;Mock &#x5B9E;&#x8DF5;&#x3001;&#x6743;&#x9650;&#x7BA1;&#x7406;&#x3001;&#x5230;&#x5982;&#x4F55;&#x90E8;&#x7F72;&#x7B49;&#x7B49;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x63D0;&#x9AD8;&#x6A21;&#x677F;&#x7684;&#x5B9E;&#x7528;&#x6027;&#x548C;&#x5B8C;&#x5584;&#x6027;&#x3002;</p><hr><h2 id="articleHeader1">&#x5FEB;&#x901F;&#x4E86;&#x89E3;</h2><p>&#x57FA;&#x4E8E;&#x6D77;&#x91CF;&#x9AD8;&#x8D28;&#x91CF;&#x53EF;&#x590D;&#x7528;&#x533A;&#x5757;&#xFF0C;&#x901A;&#x8FC7; GUI &#x5DE5;&#x5177;&#x5FEB;&#x901F; <strong>&#x642D;&#x5EFA;</strong> &#x7684;&#x4E00;&#x5957;&#x4E2D;&#x540E;&#x53F0;&#x6A21;&#x677F;</p><ul><li>&#x4E13;&#x4E1A;&#x7684;&#x8BBE;&#x8BA1;&#x652F;&#x6301;: <a href="https://alibaba.github.io/ice/docs/ice-design" rel="nofollow noreferrer" target="_blank">ICE Design</a></li><li>&#x6210;&#x719F;&#x7684;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;: <a href="https://alibaba.github.io/ice/component/breadcrumb" rel="nofollow noreferrer" target="_blank">ICE Component</a></li><li>&#x4E30;&#x5BCC;&#x7684;&#x4E1A;&#x52A1;&#x533A;&#x5757;: <a href="https://alibaba.github.io/ice/block" rel="nofollow noreferrer" target="_blank">ICE Block</a></li><li>&#x5B8C;&#x5584;&#x7684;&#x5F00;&#x53D1;&#x5DE5;&#x5177;: <a href="https://alibaba.github.io/ice/iceworks" rel="nofollow noreferrer" target="_blank">Iceworks</a></li></ul><p><span class="img-wrap"><img data-src="/img/remote/1460000015866713?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000015866713?w=1920&amp;h=1080" alt="" title="" style="cursor:pointer;display:inline"></span></p><hr><h2 id="articleHeader2">&#x529F;&#x80FD;</h2><ul><li>&#x6CE8;&#x518C;&#x767B;&#x5F55;</li><li><p>&#x6743;&#x9650;&#x7BA1;&#x7406;</p><ul><li>&#x767B;&#x5F55;&#x6388;&#x6743;</li><li>&#x83DC;&#x5355;&#x6388;&#x6743;</li><li>&#x8DEF;&#x7531;&#x6388;&#x6743;</li></ul></li><li>Redux &#x96C6;&#x6210;</li><li>Mock &#x65B9;&#x6848;</li><li>CRUD &#x793A;&#x4F8B;</li><li>Code Splitting</li><li>&#x56FD;&#x9645;&#x5316;</li></ul><hr><h2 id="articleHeader3">&#x6280;&#x672F;&#x70B9;</h2><ul><li>ice-design</li><li>react</li><li>redux</li><li>redux-thunk</li><li>react-router-dom v4</li><li>axios</li><li>bizcharts</li><li>webpack v4</li><li>mock.js</li><li>etc...</li></ul><hr><h2 id="articleHeader4">&#x9875;&#x9762;</h2><p>&#x6309;&#x7167; Dashboard &#x7EFC;&#x5408;&#x9875;&#x548C; Block &#x5206;&#x7C7B;&#x8FDB;&#x884C;&#x5C55;&#x793A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- &#x767B;&#x5F55;/&#x6CE8;&#x518C;
- Dashboard
- &#x56FE;&#x8868;&#x9875;
  - &#x56FE;&#x8868;&#x5217;&#x8868;
- &#x8868;&#x683C;&#x9875;
  - &#x57FA;&#x7840;&#x8868;&#x683C;
  - &#x5C55;&#x793A;&#x578B;&#x8868;&#x683C;
  - &#x8868;&#x683C;&#x5217;&#x8868;
- &#x5217;&#x8868;&#x9875;
  - &#x6587;&#x7AE0;&#x5217;&#x8868;
  - &#x5361;&#x7247;&#x5217;&#x8868;
  - &#x56FE;&#x6587;&#x5217;&#x8868;
- &#x5185;&#x5BB9;&#x9875;
  - &#x57FA;&#x7840;&#x8BE6;&#x60C5;&#x9875;
  - &#x6761;&#x6B3E;&#x534F;&#x8BAE;&#x9875;
  - &#x8FDB;&#x5EA6;&#x5C55;&#x793A;&#x9875;
- &#x7ED3;&#x679C;&#x9875;
  - &#x6210;&#x529F;
  - &#x5931;&#x8D25;
- &#x5F02;&#x5E38;
  - 403 &#x65E0;&#x6743;&#x9650;
  - 404 &#x627E;&#x4E0D;&#x5230;
  - 500 &#x670D;&#x52A1;&#x5668;&#x51FA;&#x9519;
  - &#x5185;&#x5BB9;&#x4E3A;&#x7A7A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haml"><code>-<span class="ruby"> &#x767B;&#x5F55;/&#x6CE8;&#x518C;
</span>-<span class="ruby"> Dashboard
</span>-<span class="ruby"> &#x56FE;&#x8868;&#x9875;
</span>  -<span class="ruby"> &#x56FE;&#x8868;&#x5217;&#x8868;
</span>-<span class="ruby"> &#x8868;&#x683C;&#x9875;
</span>  -<span class="ruby"> &#x57FA;&#x7840;&#x8868;&#x683C;
</span>  -<span class="ruby"> &#x5C55;&#x793A;&#x578B;&#x8868;&#x683C;
</span>  -<span class="ruby"> &#x8868;&#x683C;&#x5217;&#x8868;
</span>-<span class="ruby"> &#x5217;&#x8868;&#x9875;
</span>  -<span class="ruby"> &#x6587;&#x7AE0;&#x5217;&#x8868;
</span>  -<span class="ruby"> &#x5361;&#x7247;&#x5217;&#x8868;
</span>  -<span class="ruby"> &#x56FE;&#x6587;&#x5217;&#x8868;
</span>-<span class="ruby"> &#x5185;&#x5BB9;&#x9875;
</span>  -<span class="ruby"> &#x57FA;&#x7840;&#x8BE6;&#x60C5;&#x9875;
</span>  -<span class="ruby"> &#x6761;&#x6B3E;&#x534F;&#x8BAE;&#x9875;
</span>  -<span class="ruby"> &#x8FDB;&#x5EA6;&#x5C55;&#x793A;&#x9875;
</span>-<span class="ruby"> &#x7ED3;&#x679C;&#x9875;
</span>  -<span class="ruby"> &#x6210;&#x529F;
</span>  -<span class="ruby"> &#x5931;&#x8D25;
</span>-<span class="ruby"> &#x5F02;&#x5E38;
</span>  -<span class="ruby"> <span class="hljs-number">403</span> &#x65E0;&#x6743;&#x9650;
</span>  -<span class="ruby"> <span class="hljs-number">404</span> &#x627E;&#x4E0D;&#x5230;
</span>  -<span class="ruby"> <span class="hljs-number">500</span> &#x670D;&#x52A1;&#x5668;&#x51FA;&#x9519;
</span>  -<span class="ruby"> &#x5185;&#x5BB9;&#x4E3A;&#x7A7A;</span></code></pre><hr><h2 id="articleHeader5">&#x76EE;&#x5F55;&#x7ED3;&#x6784;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ice-design-pro
&#x251C;&#x2500;&#x2500; build       // &#x6253;&#x5305;&#x8D44;&#x6E90;
&#x251C;&#x2500;&#x2500; mock        // &#x6A21;&#x62DF;&#x6570;&#x636E;
&#x251C;&#x2500;&#x2500; public      // &#x9759;&#x6001;&#x8D44;&#x6E90;
&#x251C;&#x2500;&#x2500; src
&#x2502;   &#x251C;&#x2500;&#x2500; api                 // &#x63A5;&#x53E3;&#x5B9A;&#x4E49;
&#x2502;   &#x251C;&#x2500;&#x2500; components          // &#x516C;&#x5171;&#x7EC4;&#x4EF6;
&#x2502;   &#x251C;&#x2500;&#x2500; layouts             // &#x901A;&#x7528;&#x5E03;&#x5C40;
&#x2502;   &#x251C;&#x2500;&#x2500; pages               // &#x9875;&#x9762;
&#x2502;   &#x251C;&#x2500;&#x2500; store               // &#x5168;&#x5C40; store
&#x2502;   &#x251C;&#x2500;&#x2500; utils               // &#x5DE5;&#x5177;&#x51FD;&#x6570;
&#x2502;   &#x251C;&#x2500;&#x2500; configureStore.js   // redux &#x5165;&#x53E3;&#x914D;&#x7F6E;
&#x2502;   &#x251C;&#x2500;&#x2500; reducers.js         // reducers &#x5165;&#x53E3;&#x914D;&#x7F6E;
&#x2502;   &#x251C;&#x2500;&#x2500; index.js            // &#x5E94;&#x7528;&#x5165;&#x53E3;
&#x2502;   &#x251C;&#x2500;&#x2500; menuConfig          // &#x5BFC;&#x822A;&#x914D;&#x7F6E;
&#x2502;   &#x251C;&#x2500;&#x2500; routerConfig        // &#x8DEF;&#x7531;&#x914D;&#x7F6E;
&#x2502;   &#x2514;&#x2500;&#x2500; router.jsx          // &#x8DEF;&#x7531;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; tests                   // &#x6D4B;&#x8BD5;
&#x251C;&#x2500;&#x2500; .gitignore              // git &#x5FFD;&#x7565;&#x76EE;&#x5F55;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; .editorconfig           // &#x4EE3;&#x7801;&#x98CE;&#x683C;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; .eslintignore           // eslint &#x5FFD;&#x7565;&#x76EE;&#x5F55;&#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; .eslintrc               // eslint &#x914D;&#x7F6E;
&#x251C;&#x2500;&#x2500; package.json            // package.json
&#x2514;&#x2500;&#x2500; README.md               // &#x9879;&#x76EE;&#x8BF4;&#x660E;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>ice-design-pro
&#x251C;&#x2500;&#x2500; build       <span class="hljs-comment">// &#x6253;&#x5305;&#x8D44;&#x6E90;</span>
&#x251C;&#x2500;&#x2500; mock        <span class="hljs-comment">// &#x6A21;&#x62DF;&#x6570;&#x636E;</span>
&#x251C;&#x2500;&#x2500; public      <span class="hljs-comment">// &#x9759;&#x6001;&#x8D44;&#x6E90;</span>
&#x251C;&#x2500;&#x2500; src
&#x2502;   &#x251C;&#x2500;&#x2500; api                 <span class="hljs-comment">// &#x63A5;&#x53E3;&#x5B9A;&#x4E49;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; components          <span class="hljs-comment">// &#x516C;&#x5171;&#x7EC4;&#x4EF6;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; layouts             <span class="hljs-comment">// &#x901A;&#x7528;&#x5E03;&#x5C40;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; pages               <span class="hljs-comment">// &#x9875;&#x9762;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; store               <span class="hljs-comment">// &#x5168;&#x5C40; store</span>
&#x2502;   &#x251C;&#x2500;&#x2500; utils               <span class="hljs-comment">// &#x5DE5;&#x5177;&#x51FD;&#x6570;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; configureStore<span class="hljs-selector-class">.js</span>   <span class="hljs-comment">// redux &#x5165;&#x53E3;&#x914D;&#x7F6E;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; reducers<span class="hljs-selector-class">.js</span>         <span class="hljs-comment">// reducers &#x5165;&#x53E3;&#x914D;&#x7F6E;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>            <span class="hljs-comment">// &#x5E94;&#x7528;&#x5165;&#x53E3;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; menuConfig          <span class="hljs-comment">// &#x5BFC;&#x822A;&#x914D;&#x7F6E;</span>
&#x2502;   &#x251C;&#x2500;&#x2500; routerConfig        <span class="hljs-comment">// &#x8DEF;&#x7531;&#x914D;&#x7F6E;</span>
&#x2502;   &#x2514;&#x2500;&#x2500; router<span class="hljs-selector-class">.jsx</span>          <span class="hljs-comment">// &#x8DEF;&#x7531;&#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; tests                   <span class="hljs-comment">// &#x6D4B;&#x8BD5;</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.gitignore</span>              <span class="hljs-comment">// git &#x5FFD;&#x7565;&#x76EE;&#x5F55;&#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.editorconfig</span>           <span class="hljs-comment">// &#x4EE3;&#x7801;&#x98CE;&#x683C;&#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.eslintignore</span>           <span class="hljs-comment">// eslint &#x5FFD;&#x7565;&#x76EE;&#x5F55;&#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; <span class="hljs-selector-class">.eslintrc</span>               <span class="hljs-comment">// eslint &#x914D;&#x7F6E;</span>
&#x251C;&#x2500;&#x2500; package<span class="hljs-selector-class">.json</span>            <span class="hljs-comment">// package.json</span>
&#x2514;&#x2500;&#x2500; README<span class="hljs-selector-class">.md</span>               <span class="hljs-comment">// &#x9879;&#x76EE;&#x8BF4;&#x660E;</span></code></pre><hr><h2 id="articleHeader6">&#x4F7F;&#x7528;</h2><ol><li>(&#x63A8;&#x8350;) GUI &#x5DE5;&#x5177;&#x4F7F;&#x7528;: &#x4E0B;&#x8F7D; iceworks &#x4E00;&#x952E;&#x521D;&#x59CB;&#x5316;</li></ol><p><span class="img-wrap"><img data-src="/img/remote/1460000015866714?w=954&amp;h=684" src="https://static.alili.tech/img/remote/1460000015866714?w=954&amp;h=684" alt="" title="" style="cursor:pointer"></span></p><ol><li>CLI &#x547D;&#x4EE4;&#x4F7F;&#x7528;:</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm start      // &#x542F;&#x52A8;&#x9884;&#x89C8;&#x670D;&#x52A1;&#x5668;
$ npm run build  // &#x6784;&#x5EFA;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code>$ npm start      <span class="hljs-comment">// &#x542F;&#x52A8;&#x9884;&#x89C8;&#x670D;&#x52A1;&#x5668;</span>
$ npm <span class="hljs-built_in">run</span> build  <span class="hljs-comment">// &#x6784;&#x5EFA;</span></code></pre><hr><h2 id="articleHeader7">&#x6587;&#x6863;</h2><ul><li><a href="https://github.com/alibaba/ice/wiki/%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8" rel="nofollow noreferrer" target="_blank">&#x5F00;&#x59CB;&#x4F7F;&#x7528;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E5%B8%83%E5%B1%80" rel="nofollow noreferrer" target="_blank">&#x5E03;&#x5C40;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E8%8F%9C%E5%8D%95%E8%AE%BE%E8%AE%A1" rel="nofollow noreferrer" target="_blank">&#x83DC;&#x5355;&#x8BBE;&#x8BA1;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E8%B7%AF%E7%94%B1%E8%AE%BE%E8%AE%A1" rel="nofollow noreferrer" target="_blank">&#x8DEF;&#x7531;&#x8BBE;&#x8BA1;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E6%96%B0%E5%A2%9E%E9%A1%B5%E9%9D%A2" rel="nofollow noreferrer" target="_blank">&#x65B0;&#x589E;&#x9875;&#x9762;</a></li><li><a href="https://github.com/alibaba/ice/wiki/Mock%E6%96%B9%E6%A1%88" rel="nofollow noreferrer" target="_blank">Mock&#x65B9;&#x6848;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E6%95%B0%E6%8D%AE%E6%96%B9%E6%A1%88" rel="nofollow noreferrer" target="_blank">&#x6570;&#x636E;&#x65B9;&#x6848;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86" rel="nofollow noreferrer" target="_blank">&#x6743;&#x9650;&#x7BA1;&#x7406;</a></li><li><a href="https://github.com/alibaba/ice/wiki/%E6%9E%84%E5%BB%BA%E5%8F%91%E5%B8%83" rel="nofollow noreferrer" target="_blank">&#x6784;&#x5EFA;&#x53D1;&#x5E03;</a></li></ul><hr><h2 id="articleHeader8">&#x76F8;&#x5173;&#x4FE1;&#x606F;</h2><ul><li>&#x5B98;&#x65B9;&#x7F51;&#x7AD9;&#xFF1A;<a href="https://alibaba.github.io/ice/" rel="nofollow noreferrer" target="_blank">&#x98DE;&#x51B0;-&#x8BA9;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x7B80;&#x5355;&#x800C;&#x53CB;&#x597D;</a></li><li>&#x4E0B;&#x8F7D; Iceworks&#xFF1A;<a href="https://alibaba.github.io/ice/iceworks" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/ice...</a></li><li>Github&#xFF1A;<a href="http://github.com/alibaba/ice" rel="nofollow noreferrer" target="_blank">http://github.com/alibaba/ice</a></li><li>&#x8054;&#x7CFB;&#x6211;&#x4EEC; <code>ice-admin[at]alibaba-inc.com</code></li><li>&#x98DE;&#x51B0;&#x7FA4;&#x4E8C;&#x7EF4;&#x7801;&#xFF1A;<span class="img-wrap"><img data-src="/img/remote/1460000015866715?w=993&amp;h=1280" src="https://static.alili.tech/img/remote/1460000015866715?w=993&amp;h=1280" alt="" title="" style="cursor:pointer"></span></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
飞冰 - ICE Design Pro 使用指南

## 原文链接
[https://segmentfault.com/a/1190000015866710](https://segmentfault.com/a/1190000015866710)

