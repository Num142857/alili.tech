---
title: '[ES6] async/await 应用指南' 
date: 2018-11-23 2:30:11
hidden: true
slug: mzgnoar0lwq
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">async/await &#x662F;&#x4EC0;&#x4E48;</h2><p>async/await &#x662F; ES7 &#x5F15;&#x5165;&#x7684;&#x65B0;&#x7684;&#x5F02;&#x6B65;&#x4EE3;&#x7801; <a href="https://www.ecma-international.org/ecma-262/8.0/#sec-async-function-definitions" rel="nofollow noreferrer" target="_blank">&#x89C4;&#x8303;</a>&#xFF0C;&#x5B83;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x65B0;&#x7684;&#x7F16;&#x5199;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5728;&#x8BED;&#x6CD5;&#x5C42;&#x9762;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x5F62;&#x5F0F;&#x4E0A;&#x975E;&#x5E38;&#x63A5;&#x8FD1;&#x4E8E;&#x540C;&#x6B65;&#x4EE3;&#x7801;&#x7684;&#x5F02;&#x6B65;&#x975E;&#x963B;&#x585E;&#x4EE3;&#x7801;&#x98CE;&#x683C;&#xFF0C;&#x5728;&#x6B64;&#x4E4B;&#x524D;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x591A;&#x662F;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x3001; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise" rel="nofollow noreferrer" target="_blank">Promise</a> &#x6A21;&#x5F0F;&#x3002;<br>&#x4ECE;&#x5B9E;&#x73B0;&#x4E0A;&#x6765;&#x770B; async/await &#x662F;&#x5728; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator" rel="nofollow noreferrer" target="_blank">&#x751F;&#x6210;&#x5668;</a>&#x3001;Promise &#x57FA;&#x7840;&#x4E0A;&#x6784;&#x5EFA;&#x51FA;&#x6765;&#x7684;&#x65B0;&#x8BED;&#x6CD5;&#xFF1A;&#x4EE5; <strong>&#x751F;&#x6210;&#x5668;</strong> &#x5B9E;&#x73B0;&#x6D41;&#x7A0B;&#x63A7;&#x5236;&#xFF0C;&#x4EE5; Promise &#x5B9E;&#x73B0;&#x5F02;&#x6B65;&#x63A7;&#x5236;&#x3002;<br>Node &#x81EA; <a href="https://nodejs.org/en/blog/release/v8.0.0/" rel="nofollow noreferrer" target="_blank">v8.0.0</a> &#x8D77;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x652F;&#x6301; async/await &#x8BED;&#x6CD5;&#xFF0C;<a href="https://babeljs.io/docs/en/babel-plugin-syntax-async-functions" rel="nofollow noreferrer" target="_blank">babel</a> &#x4E5F;&#x5DF2;&#x7ECF;&#x5B8C;&#x5168;&#x652F;&#x6301; async/await &#x8BED;&#x6CD5;&#x7684;&#x8F6C;&#x8BD1;&#x3002;</p><p>&#x4E0B;&#x9762;&#xFF0C;&#x6211;&#x4EEC;&#x4EE5;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x7531;&#x6D45;&#x5165;&#x6DF1;&#x4ECB;&#x7ECD; async/await &#x8BED;&#x6CD5;&#x7684;&#x4F7F;&#x7528;&#x3002;</p><h2 id="articleHeader1">&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x5B9E;&#x4F8B;</h2><p>&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x767B;&#x5F55;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x903B;&#x8F91;&#x5982;&#x4E0B;&#xFF1A;</p><ol><li>&#x83B7;&#x53D6;&#x7528;&#x6237;&#x767B;&#x5F55;&#x6001;</li><li>&#x5982;&#x679C;&#x7528;&#x6237;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#xFF0C;&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;&#x7684;&#x7528;&#x6237;&#x4FE1;&#x606F;</li><li>&#x5982;&#x679C;&#x7528;&#x6237;&#x672A;&#x767B;&#x5F55;&#xFF0C;&#x8DF3;&#x8F6C;&#x5230;&#x767B;&#x5F55;&#x9875;</li></ol><h3 id="articleHeader2">&#x4EE5;&#x56DE;&#x8C03;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;</h3><p><strong>&#x56DE;&#x8C03;</strong> &#x5728;&#x6700;&#x521D;&#x7248;&#x672C;&#x7684; JS &#x5C31;&#x5DF2;&#x7ECF;&#x51FA;&#x73B0;&#xFF0C;&#x53EF;&#x8C13;&#x5386;&#x53F2;&#x60A0;&#x4E45;&#xFF0C;&#x5230;&#x73B0;&#x5728;&#x4E5F;&#x8FD8;&#x4FDD;&#x6301;&#x7740;&#x76F8;&#x5F53;&#x7684;&#x6D3B;&#x529B;&#x3002;<br>&#x5982;&#x679C;&#x4EE5;&#x56DE;&#x8C03;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x4E0A;&#x8FF0;&#x9700;&#x6C42;&#xFF0C;&#x4EE3;&#x7801;&#x5927;&#x6982;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getProfile(cb) {
  isUserLogined(req.session, (err, isLogined) =&gt; {
    if (err) {
      cb(err);
    } else if (isLogined) {
      getUser(req.session, (err, profile) =&gt; {
        if (err) {
          cb(err);
        } else {
          cb(null, profile);
        }
      });
    } else {
      cb(null, false);
    }
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProfile</span>(<span class="hljs-params">cb</span>) </span>{
  isUserLogined(req.session, (err, isLogined) =&gt; {
    <span class="hljs-keyword">if</span> (err) {
      cb(err);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isLogined) {
      getUser(req.session, (err, profile) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
          cb(err);
        } <span class="hljs-keyword">else</span> {
          cb(<span class="hljs-literal">null</span>, profile);
        }
      });
    } <span class="hljs-keyword">else</span> {
      cb(<span class="hljs-literal">null</span>, <span class="hljs-literal">false</span>);
    }
  });
}</code></pre><p>&#x611F;&#x53D7;&#x5230;&#x81ED;&#x5473;&#x4E86;&#x5417;&#xFF1F;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x8FD8;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#x4E24;&#x5C42;&#x7684;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#xFF0C;&#x4EE3;&#x7801;&#x4E2D;&#x5C31;&#x5DF2;&#x7ECF;&#x6709;&#x8BB8;&#x591A;&#x95EE;&#x9898;&#xFF0C;&#x6BD4;&#x5982;&#x91CD;&#x590D;&#x7684; <code>if(err)</code> &#x8BED;&#x53E5;&#xFF1B;&#x6BD4;&#x5982;&#x5C42;&#x5C42;&#x5D4C;&#x5957;&#x7684;&#x51FD;&#x6570;&#x3002;<br>&#x53E6;&#x5916;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x5C42;&#x5C42;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x51FA;&#x73B0;&#x5F02;&#x5E38;&#xFF0C;&#x8C03;&#x8BD5;&#x8D77;&#x6765;&#x662F;&#x975E;&#x5E38;&#x8BA9;&#x4EBA;&#x5954;&#x6E83;&#x7684; &#x2014;&#x2014; &#x7531;&#x4E8E; <code>try-catch</code> &#x65E0;&#x6CD5;&#x6355;&#x83B7;&#x5F02;&#x6B65;&#x7684;&#x5F02;&#x5E38;&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x80FD;&#x4E0D;&#x65AD;&#x4E0D;&#x65AD;&#x7684;&#x5199; <code>debugger</code> &#x53BB;&#x8FFD;&#x8E2A;&#xFF0C;&#x7B80;&#x76F4;&#x6B65;&#x6B65;&#x60CA;&#x5FC3;&#x3002;<br>&#x8FD9;&#x79CD;&#x5C42;&#x5C42;&#x5D4C;&#x5957;&#x5BFC;&#x81F4;&#x7684;&#x4EE3;&#x7801;&#x81ED;&#x5473;&#xFF0C;&#x88AB;&#x79F0;&#x4E3A; <a href="http://callbackhell.com/" rel="nofollow noreferrer" target="_blank"><strong>&#x56DE;&#x8C03;&#x5730;&#x72F1;</strong></a>&#xFF0C;&#x5728;&#x8FC7;&#x53BB;&#x662F;&#x56F0;&#x60D1;&#x793E;&#x533A;&#x7684;&#x4E00;&#x4E2A;&#x5927;&#x95EE;&#x9898;&#x3002;</p><h3 id="articleHeader3">&#x4EE5; Promise &#x65B9;&#x5F0F;&#x5B9E;&#x73B0;</h3><p><code>Promise</code> &#x6A21;&#x5F0F;&#x6700;&#x65E9;&#x53EA;&#x662F;&#x793E;&#x533A;&#x51FA;&#x73B0;&#x7684;&#x4E00;&#x5957;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF0C;&#x4F46;&#x51ED;&#x501F;&#x5176;&#x4F18;&#x96C5;&#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x8BED;&#x53E5;&#xFF0C;&#x5F97;&#x5230;&#x8D8A;&#x6765;&#x8D8A;&#x591A;&#x4EBA;&#x7684;&#x9752;&#x7750;&#xFF0C;&#x6700;&#x7EC8;&#x88AB;&#x5217;&#x4E3A; ES6 &#x7684;&#x6B63;&#x5F0F;&#x89C4;&#x8303;&#x3002;<br>&#x4E0A;&#x9762;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x5982;&#x679C;&#x4EE5; Promise &#x6A21;&#x5F0F;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getProfile() {
  return isUserLogined(req.session)
    .then(isLogined =&gt; {
      if (isLogined) {
        return getUser(req.session);
      }
      return false;
    })
    .catch(err =&gt; {
      console.log(err);
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProfile</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> isUserLogined(req.session)
    .then(<span class="hljs-function"><span class="hljs-params">isLogined</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (isLogined) {
        <span class="hljs-keyword">return</span> getUser(req.session);
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(err);
    });
}</code></pre><p>ok&#xFF0C;&#x8FD9;&#x51CF;&#x5C11;&#x4E86;&#x4E9B;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#xFF0C;&#x4E5F;&#x6709;&#x4E86;&#x4E00;&#x81F4;&#x7684;&#x5F02;&#x5E38; catch &#x65B9;&#x6848;&#x3002;&#x4F46;&#x8FD9;&#x91CC;&#x9762;&#x4E5F;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x4E00;&#x4E9B;&#x5751;&#xFF0C;&#x6BD4;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x8981; <code>resolve</code> &#x4E24;&#x4E2A;&#x4E0D;&#x540C; Promise &#x7684;&#x503C;&#xFF1F;&#x5047;&#x8BBE;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x9700;&#x8981;&#x8FD4;&#x56DE;&#x7528;&#x6237;&#x7684;&#x65E5;&#x5FD7;&#x8BB0;&#x5F55;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getProfile() {
  return isUserLogined(req.session)
    .then(isLogined =&gt; {
      if (isLogined) {
        return getUser(req.session).then(profile =&gt; {
          return getLog(profile).then(logs =&gt; Promise.resolve(profile, logs));
        });
      }
      return false;
    })
    .catch(err =&gt; {
      console.log(err);
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProfile</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> isUserLogined(req.session)
    .then(<span class="hljs-function"><span class="hljs-params">isLogined</span> =&gt;</span> {
      <span class="hljs-keyword">if</span> (isLogined) {
        <span class="hljs-keyword">return</span> getUser(req.session).then(<span class="hljs-function"><span class="hljs-params">profile</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> getLog(profile).then(<span class="hljs-function"><span class="hljs-params">logs</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve(profile, logs));
        });
      }
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(err);
    });
}</code></pre><p>&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x5728; <code>getUser.then</code> &#x4E2D;&#x5D4C;&#x5957;&#x4E86;&#x4E00;&#x5C42; <code>getLog.then</code> &#xFF0C;&#x8FD9;&#x5728;&#x4EE3;&#x7801;&#x4E0A;&#x7834;&#x574F;&#x4E86; Promise &#x7684;&#x94FE;&#x5F0F;&#x8C03;&#x7528;&#x6CD5;&#x5219;&#xFF0C;&#x800C;&#x4E14;&#xFF0C;<code>getUser.then</code> &#x51FD;&#x6570;&#x4E2D;&#x53D1;&#x751F;&#x7684;&#x5F02;&#x5E38;&#x662F;&#x65E0;&#x6CD5;&#x88AB;&#x5916;&#x5C42;&#x7684; <code>catch</code> &#x51FD;&#x6570;&#x6355;&#x83B7;&#x7684;&#xFF0C;&#x8FD9;&#x7834;&#x574F;&#x4E86;&#x5F02;&#x5E38;&#x5904;&#x7406;&#x7684;&#x4E00;&#x81F4;&#x6027;&#x3002;</p><p>Promise &#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x662F;&#x5728; <code>catch</code> &#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5F02;&#x5E38;&#x5806;&#x6808;&#x4E0D;&#x591F;&#x5B8C;&#x6574;&#xFF0C;&#x5BFC;&#x81F4;&#x96BE;&#x4EE5;&#x8FFD;&#x5BFB;&#x771F;&#x6B63;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x4F4D;&#x7F6E;&#x3002;&#x6BD4;&#x5982;&#x4EE5;&#x4E0B;&#x4EE3;&#x7801;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function asyncCall(){
    return asyncFunc()
      .then(()=&gt;asyncFunc())
      .then(()=&gt;asyncFunc())
      .then(()=&gt;asyncFunc())
      .then(()=&gt;throw new Error(&apos;oops&apos;));
}

asyncCall()
  .catch((e)=&gt;{
    console.log(e);
    // &#x8F93;&#x51FA;&#xFF1A;
    // Error: oops&#x21B5;    at asyncFunc.then.then.then.then (&lt;anonymous&gt;:6:22)
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncCall</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> asyncFunc()
      .then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>asyncFunc())
      .then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>asyncFunc())
      .then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>asyncFunc())
      .then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span><span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;oops&apos;</span>));
}

asyncCall()
  .catch(<span class="hljs-function">(<span class="hljs-params">e</span>)=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(e);
    <span class="hljs-comment">// &#x8F93;&#x51FA;&#xFF1A;</span>
    <span class="hljs-comment">// Error: oops&#x21B5;    at asyncFunc.then.then.then.then (&lt;anonymous&gt;:6:22)</span>
  });</code></pre><p>&#x7531;&#x4E8E;&#x629B;&#x51FA;&#x5F02;&#x5E38;&#x7684;&#x8BED;&#x53E5;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x533F;&#x540D;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x8FD0;&#x884C;&#x65F6;&#x4F1A;&#x8BA4;&#x4E3A;&#x9519;&#x8BEF;&#x53D1;&#x751F;&#x7684;&#x4F4D;&#x7F6E;&#x662F; <code>asyncFunc.then.then.then.then</code>&#xFF0C;&#x5047;&#x5982;&#x4EE3;&#x7801;&#x4E2D;&#x5927;&#x91CF;&#x4F7F;&#x7528;&#x4E86; <code>asyncFunc</code> &#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x4E48;&#x4E0A;&#x9762;&#x7684;&#x62A5;&#x9519;&#x4FE1;&#x606F;&#x5C31;&#x5F88;&#x96BE;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x51C6;&#x786E;&#x5B9A;&#x4F4D;&#x9519;&#x8BEF;&#x53D1;&#x751F;&#x7684;&#x4F4D;&#x7F6E;&#x3002;<br>&#x6211;&#x4EEC;&#x5F53;&#x7136;&#x53EF;&#x4EE5;&#x7ED9;&#x6BCF;&#x4E2A; <code>then</code> &#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x8D4B;&#x4E88;&#x4E00;&#x4E2A;&#x6709;&#x610F;&#x4E49;&#x7684;&#x540D;&#x8BCD;&#xFF0C;&#x4F46;&#x8FD9;&#x53C8;&#x4E27;&#x5931;&#x4E86;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;&#x533F;&#x540D;&#x51FD;&#x6570;&#x7684;&#x7B80;&#x6D01;&#x3002;</p><h3 id="articleHeader4">&#x4EE5; async/await &#x65B9;&#x5F0F;&#x5B9E;&#x73B0;</h3><p>&#x6700;&#x540E;&#xFF0C;&#x7EC8;&#x4E8E;&#x8F6E;&#x5230;&#x6211;&#x4EEC;&#x8FD9;&#x6B21;&#x7684;&#x4E3B;&#x9898; &#x2014;&#x2014; async/await &#x65B9;&#x5F0F;&#x7684;&#x5F02;&#x6B65;&#x4EE3;&#x7801;&#xFF0C;&#x867D;&#x7136;&#x8FD9;&#x662F;&#x4E00;&#x4E2A; ES7 &#x89C4;&#x8303;&#xFF0C;&#x4F46;&#x914D;&#x5408;&#x5F3A;&#x5927;&#x7684; babel&#xFF0C;&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x5927;&#x80C6;&#x4F7F;&#x7528;&#x3002;<br>&#x4EE5;&#x4E0A;&#x9700;&#x6C42;&#x7684;&#x5B9E;&#x73B0;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getProfile() {
  const isLogined = await isUserLogined(req.session);
  if (isLogined) {
    return await getUser(req.session);
  }
  return false;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProfile</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> isLogined = <span class="hljs-keyword">await</span> isUserLogined(req.session);
  <span class="hljs-keyword">if</span> (isLogined) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> getUser(req.session);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
}</code></pre><p>&#x4EE3;&#x7801;&#x6BD4;&#x4E0A;&#x9762;&#x4E24;&#x79CD;&#x98CE;&#x683C;&#x8981;&#x7B80;&#x5355;&#x4E86;&#x8BB8;&#x591A;&#xFF0C;&#x5F62;&#x5F0F;&#x4E0A;&#x5C31;&#x662F;&#x540C;&#x6B65;&#x64CD;&#x4F5C;&#x6D41;&#x7A0B;&#xFF0C;&#x4E0E;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x6C42;&#x63CF;&#x8FF0;&#x4E5F;&#x975E;&#x5E38;&#x975E;&#x5E38;&#x7684;&#x63A5;&#x8FD1;&#x3002;</p><p>async &#x5173;&#x952E;&#x5B57;&#x7528;&#x4E8E;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x51FA;&#x73B0;&#x5728;&#x4EFB;&#x4F55;&#x51FD;&#x6570;&#x58F0;&#x660E;&#x8BED;&#x53E5;&#x4E2D;&#xFF0C;&#x5305;&#x62EC;&#xFF1A;&#x666E;&#x901A;&#x51FD;&#x6570;&#x3001;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x3001;&#x7C7B;&#x51FD;&#x6570;&#x3002;&#x666E;&#x901A;&#x51FD;&#x6570;&#x7684; <code>constructor</code> &#x662F; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function" rel="nofollow noreferrer" target="_blank"><code>Function</code></a>&#xFF0C; &#x800C;&#x88AB; async &#x5173;&#x952E;&#x5B57;&#x4FEE;&#x9970;&#x7684;&#x51FD;&#x6570;&#x5219;&#x662F; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction" rel="nofollow noreferrer" target="_blank"><code>AsyncFunction</code></a> &#x7C7B;&#x578B;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.getPrototypeOf(function() {}).constructor;
// output
// AsyncFunction() { [native code] }

Object.getPrototypeOf(async function() {}).constructor;
// output
// Function() { [native code] }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}).constructor;
<span class="hljs-comment">// output</span>
<span class="hljs-comment">// AsyncFunction() { [native code] }</span>

<span class="hljs-built_in">Object</span>.getPrototypeOf(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}).constructor;
<span class="hljs-comment">// output</span>
<span class="hljs-comment">// Function() { [native code] }</span></code></pre><p>await &#x5173;&#x952E;&#x5B57;&#x53EA;&#x80FD;&#x5728; async &#x51FD;&#x6570;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x7528;&#x4E8E;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x4E0A;&#x9762;&#x4F8B;&#x5B50;&#x4E2D;&#x7684; <code>const isLogined = await isUserLogined(req.session);</code>&#xFF0C;&#x5F53; async &#x98CE;&#x683C;&#x7684; <code>getProfile</code> &#x51FD;&#x6570;&#x6267;&#x884C;&#x5230;&#x8BE5;&#x8BED;&#x53E5;&#x65F6;&#xFF0C;&#x4F1A;&#x6302;&#x8D77;&#x5F53;&#x524D;&#x51FD;&#x6570;&#xFF0C;&#x5C06;&#x540E;&#x7EED;&#x8BED;&#x53E5;&#x52A0;&#x5165;&#x5230; <code>event loop</code> &#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;&#x8FD9;&#x4E00;&#x70B9;&#x4E0E; <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator" rel="nofollow noreferrer" target="_blank"><strong>&#x751F;&#x6210;&#x5668;</strong></a> &#x6267;&#x884C;&#x7279;&#x6027;&#x76F8;&#x540C;&#x3002;<br>&#x76F4;&#x5230; <code>isUserLogined</code> &#x51FD;&#x6570; <code>resovle</code> &#x540E;&#xFF0C;&#x624D;&#x7EE7;&#x7EED;&#x6267;&#x884C;&#x540E;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x3002;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728; async &#x51FD;&#x6570;&#x4E2D;&#x7F16;&#x5199;&#x4EFB;&#x610F;&#x6570;&#x91CF;&#x7684; await &#x8BED;&#x53E5;&#xFF0C;async &#x51FD;&#x6570;&#x7684;&#x6267;&#x884C;&#x4F1A;&#x4E00;&#x76F4;&#x5904;&#x5728; <strong>&#x6267;&#x884C;-&#x6302;&#x8D77;-&#x6267;&#x884C;</strong> &#x7684;&#x5FAA;&#x73AF;&#x4E2D;&#xFF0C;&#x8FD9;&#x79CD;&#x7279;&#x6027;&#x5F97;&#x5230;&#x4E86;&#x8BED;&#x8A00;&#x5C42;&#x9762;&#x7684;&#x652F;&#x6301;&#xFF0C;&#x5E76;&#x4E0D;&#x9700;&#x8981;&#x6211;&#x4EEC;&#x4E3A;&#x6B64;&#x7F16;&#x5199;&#x591A;&#x4F59;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x8FD9;&#x5C31;&#x4E3A;&#x590D;&#x6742;&#x7684;&#x5F02;&#x6B65;&#x573A;&#x666F;&#x63D0;&#x4F9B;&#x4FBF;&#x6377;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x6848;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncCall() {
  const v1 = await asyncFunc();
  const v2 = await asyncFunc(v1);
  const v3 = await asyncFunc(v2);
  return v3;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncCall</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> v1 = <span class="hljs-keyword">await</span> asyncFunc();
  <span class="hljs-keyword">const</span> v2 = <span class="hljs-keyword">await</span> asyncFunc(v1);
  <span class="hljs-keyword">const</span> v3 = <span class="hljs-keyword">await</span> asyncFunc(v2);
  <span class="hljs-keyword">return</span> v3;
}</code></pre><p>&#x5230;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x7B80;&#x5355;&#x4E86;&#x89E3;&#x4E86; async/await &#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x8FD9;&#x79CD;&#x540C;&#x6B65;&#x98CE;&#x683C;&#x7684;&#x5F02;&#x6B65;&#x5904;&#x7406;&#x65B9;&#x6848;&#xFF0C;&#x76F8;&#x6BD4;&#x800C;&#x8A00;&#x4F1A;&#x66F4;&#x5BB9;&#x6613;&#x7EF4;&#x62A4;&#x3002;</p><h2 id="articleHeader5">async &#x4E2D;&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;</h2><p>&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x63D0;&#x5230;&#xFF0C;&#x5728; Promise &#x6A21;&#x5F0F;&#x4E2D;&#xFF0C;<code>catch</code> &#x51FD;&#x6570;&#x96BE;&#x4EE5;&#x83B7;&#x5F97;&#x5B8C;&#x6574;&#x7684;&#x5F02;&#x5E38;&#x4FE1;&#x606F;&#xFF0C;&#x5BFC;&#x81F4;&#x5728; Promise &#x4E0B;&#x505A;&#x8C03;&#x8BD5;&#x53D8;&#x5F97;&#x56F0;&#x96BE;&#x91CD;&#x91CD;&#xFF0C;&#x90A3;&#x5728; async/await &#x4E2D;&#x5462;&#xFF1F;<br>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncCall() {
  try {
    await asyncFunc();
    throw new Error(&quot;oops&quot;);
  } catch (e) {
    console.log(e);
    // output
    // Error: oops  at asyncCall (&lt;anonymous&gt;:4:11)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncCall</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> asyncFunc();
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&quot;oops&quot;</span>);
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.log(e);
    <span class="hljs-comment">// output</span>
    <span class="hljs-comment">// Error: oops  at asyncCall (&lt;anonymous&gt;:4:11)</span>
  }
}</code></pre><p>&#x76F8;&#x6BD4; Promise &#x6A21;&#x5F0F;&#xFF0C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x4E2D;&#x5F02;&#x5E38;&#x53D1;&#x751F;&#x7684;&#x4F4D;&#x7F6E;&#x662F; <code>asyncCall</code> &#x51FD;&#x6570;&#xFF01;&#x76F8;&#x5BF9;&#x800C;&#x8A00;&#xFF0C;&#x5BB9;&#x6613;&#x5B9A;&#x4F4D;&#x4E86;&#x8BB8;&#x591A;&#x3002;</p><h2 id="articleHeader6">&#x5E76;&#x8054;&#x7684; await</h2><p>async/await &#x8BED;&#x6CD5;&#x786E;&#x5B9E;&#x5F88;&#x7B80;&#x5355;&#x597D;&#x7528;&#xFF0C;&#x4F46;&#x5374;&#x5BB9;&#x6613;&#x7528;&#x5C94;&#x4E86;&#x3002;&#x4EE5;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x4E3A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function retriveProfile(email) {
  const user = await getUser(email);
  const roles = await getRoles(user);
  const level = await getLevel(user);
  return [user, roles, level];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retriveProfile</span>(<span class="hljs-params">email</span>) </span>{
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> getUser(email);
  <span class="hljs-keyword">const</span> roles = <span class="hljs-keyword">await</span> getRoles(user);
  <span class="hljs-keyword">const</span> level = <span class="hljs-keyword">await</span> getLevel(user);
  <span class="hljs-keyword">return</span> [user, roles, level];
}</code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5B9E;&#x73B0;&#x4E86;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x57FA;&#x672C;&#x4FE1;&#x606F;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x57FA;&#x672C;&#x4FE1;&#x606F;&#x83B7;&#x53D6;&#x7528;&#x6237;&#x89D2;&#x8272;&#x3001;&#x7EA7;&#x522B;&#x4FE1;&#x606F;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5176;&#x4E2D; <code>getRoles</code> &#x4E0E; <code>getLevel</code> &#x4E24;&#x8005;&#x4E4B;&#x95F4;&#x5E76;&#x65E0;&#x4F9D;&#x8D56;&#xFF0C;&#x662F;&#x4E24;&#x4E2A;&#x5E76;&#x8054;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;<br>&#x4F46;&#x4EE3;&#x7801;&#x4E2D; <code>getLevel</code> &#x5374;&#x9700;&#x8981;&#x7B49;&#x5F85; <code>getRoles</code> resolve &#x4E4B;&#x540E;&#x624D;&#x80FD;&#x6267;&#x884C;&#x3002;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x4EBA;&#x90FD;&#x4F1A;&#x72AF;&#x8FD9;&#x79CD;&#x9519;&#x8BEF;&#xFF0C;&#x800C;&#x662F;&#x540C;&#x6B65;&#x98CE;&#x683C;&#x5F88;&#x5BB9;&#x6613;&#x8BF1;&#x60D1;&#x6211;&#x4EEC;&#x5FFD;&#x7565;&#x6389;&#x771F;&#x6B63;&#x7684;&#x5F02;&#x6B65;&#x8C03;&#x7528;&#x6B21;&#x5E8F;&#xFF0C;&#x800C;&#x9677;&#x5165;&#x8FC7;&#x4E8E;&#x7B80;&#x5316;&#x7684;&#x540C;&#x6B65;&#x601D;&#x7EF4;&#x4E2D;&#x3002;&#x5199;&#x8FD9;&#x4E00;&#x6BB5;&#x7684;&#x76EE;&#x7684;&#x6B63;&#x662F;&#x4E3A;&#x4E86;&#x8B66;&#x9192;&#x5927;&#x5BB6;&#xFF0C;async &#x53EA;&#x662F;&#x5F62;&#x5F0F;&#x4E0A;&#x7684;&#x540C;&#x6B65;&#xFF0C;&#x6839;&#x672C;&#x4E0A;&#x8FD8;&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x8BF7;&#x6CE8;&#x610F;&#x4E0D;&#x8981;&#x8BA9;&#x4F7F;&#x7528;&#x8005;&#x628A;&#x65F6;&#x95F4;&#x6D6A;&#x8D39;&#x5728;&#x65E0;&#x8C13;&#x7684;&#x7B49;&#x5F85;&#x4E0A;&#x3002;<br>&#x4E0A;&#x9762;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x7528;&#x4E00;&#x79CD;&#x7A0D;&#x5FAE; <strong>&#x7ED5;</strong> &#x4E00;&#x4E9B;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x907F;&#x514D;&#x8FD9;&#x79CD;&#x6027;&#x80FD;&#x635F;&#x8017;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function retriveProfile(email) {
  const user = await getUser(email);
  const p1 = getRoles(user);
  const p2 = getLevel(user);
  const roles = await p1;
  const level = await p2;
  return [user, roles, level];
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retriveProfile</span>(<span class="hljs-params">email</span>) </span>{
  <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> getUser(email);
  <span class="hljs-keyword">const</span> p1 = getRoles(user);
  <span class="hljs-keyword">const</span> p2 = getLevel(user);
  <span class="hljs-keyword">const</span> roles = <span class="hljs-keyword">await</span> p1;
  <span class="hljs-keyword">const</span> level = <span class="hljs-keyword">await</span> p2;
  <span class="hljs-keyword">return</span> [user, roles, level];
}</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;&#x4EE3;&#x7801;&#x4E2D;&#x7684; <code>getRoles</code> &#x3001;<code>getLevel</code> &#x51FD;&#x6570;&#x90FD;&#x6CA1;&#x6709;&#x8DDF;&#x5728; await &#x5173;&#x952E;&#x5B57;&#x4E4B;&#x540E;&#xFF0C;&#x800C;&#x662F;&#x628A;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x7684; Promise &#x5B58;&#x653E;&#x5728;&#x53D8;&#x91CF; <code>p1</code>&#x3001;<code>p2</code> &#x4E2D;&#xFF0C;&#x540E;&#x7EED;&#x624D;&#x5BF9; <code>p1</code>&#x3001;<code>p2</code> &#x6267;&#x884C; await &#x58F0;&#x660E;&#xFF0C; <code>getRoles</code> &#x3001;<code>getLevel</code> &#x5C31;&#x80FD;&#x540C;&#x65F6;&#x6267;&#x884C;&#xFF0C;&#x4E0D;&#x9700;&#x7B49;&#x5F85;&#x53E6;&#x4E00;&#x65B9;&#x7684;&#x5B8C;&#x6210;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5728;&#x5FAA;&#x73AF;&#x573A;&#x666F;&#x4E0B;&#x7279;&#x522B;&#x5BB9;&#x6613;&#x53D1;&#x751F;&#xFF0C;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x4E00;&#x6279;&#x56FE;&#x7247;&#x7684;&#x5927;&#x5C0F;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function retriveSize(imgs) {
  const result = [];
  for (const img of imgs) {
    result.push(await getSize(img));
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retriveSize</span>(<span class="hljs-params">imgs</span>) </span>{
  <span class="hljs-keyword">const</span> result = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> img <span class="hljs-keyword">of</span> imgs) {
    result.push(<span class="hljs-keyword">await</span> getSize(img));
  }
}</code></pre><p>&#x4EE3;&#x7801;&#x4E2D;&#x7684;&#x6BCF;&#x6B21; <code>getSize</code> &#x8C03;&#x7528;&#x90FD;&#x9700;&#x8981;&#x7B49;&#x5F85;&#x4E0A;&#x4E00;&#x6B21;&#x8C03;&#x7528;&#x5B8C;&#x6210;&#xFF0C;&#x540C;&#x6837;&#x662F;&#x4E00;&#x79CD;&#x6027;&#x80FD;&#x6D6A;&#x8D39;&#x3002;&#x540C;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x7528;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x4F1A;&#x66F4;&#x5408;&#x9002;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function retriveSize(imgs) {
  return Promise.all(imgs.map(img =&gt; getSize(img)));
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">retriveSize</span>(<span class="hljs-params">imgs</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(imgs.map(<span class="hljs-function"><span class="hljs-params">img</span> =&gt;</span> getSize(img)));
}</code></pre><p>&#x8FD9;&#x5B9E;&#x9645;&#x4E0A;&#x5DF2;&#x7ECF;&#x56DE;&#x9000;&#x5230;&#x4E86; Promise &#x6A21;&#x5F0F;&#xFF0C;&#x6240;&#x4EE5;&#x4E3A;&#x4E86;&#x5199;&#x51FA;&#x826F;&#x597D;&#x7684; async/await &#x4EE3;&#x7801;&#xFF0C;&#x5EFA;&#x8BAE;&#x8FD8;&#x662F;&#x8BA4;&#x771F;&#x5B66;&#x4E60;&#x5B66;&#x4E60; Promise &#x6A21;&#x5F0F;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[ES6] async/await 应用指南

## 原文链接
[https://segmentfault.com/a/1190000015594717](https://segmentfault.com/a/1190000015594717)

