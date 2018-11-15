---
title: vue中导出Excel表格
hidden: true
categories: reprint
slug: 81cf3500
date: 2018-11-08 02:30:09
---

{{< raw >}}
<p>&#x9879;&#x76EE;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x80FD;&#x4F1A;&#x78B0;&#x5230;&#x5BFC;&#x51FA;Excel&#x6587;&#x4EF6;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4E00;&#x822C;&#x540E;&#x53F0;&#x7BA1;&#x7406;&#x7CFB;&#x7EDF;&#x4E2D;&#x5C45;&#x591A;&#xFF0C;&#x5C06;table&#x4E2D;&#x5C55;&#x793A;&#x7684;&#x6570;&#x636E;&#x5BFC;&#x51FA;&#x4FDD;&#x5B58;&#x5230;&#x672C;&#x5730;&#x3002;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x4E9B;&#x5904;&#x7406;&#x6765;&#x4FEE;&#x6539;&#x8981;&#x5BFC;&#x51FA;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#xFF0C;&#x5177;&#x4F53;&#x9700;&#x6C42;&#x5177;&#x4F53;&#x5BF9;&#x5F85;&#x3002;</p><p><strong>1</strong>&#x3001;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5B89;&#x88C5;3&#x4E2A;&#x4F9D;&#x8D56;&#xFF0C;<code>file-saver</code>&#x3001;<code>xlsx</code>&#x548C;<code>script-loader</code>&#x3002;</p><p>&#x4F7F;&#x7528;npm&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install file-saver xlsx -S
npm install script-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">npm install file-saver xlsx -S
npm install script-loader -D</code></pre><p>&#x4F7F;&#x7528;yarn&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yarn add file-saver xlsx -S
yarn add script-loader -D" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">yarn add file-saver xlsx -S
yarn add script-loader -D</code></pre><p><strong>2</strong>&#x3001;&#x5728;<code>/src</code>&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;<code>vendor</code>&#xFF08;&#x540D;&#x5B57;&#x4E5F;&#x53EF;&#x81EA;&#x53D6;&#xFF09;&#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x5B58;&#x5165;<code>Blob.js</code>&#x548C;<code>Export2Excel.js</code>&#x6587;&#x4EF6;&#x3002;</p><p>&#x8FD9;&#x4E2A;&#x4E24;&#x4E2A;&#x6587;&#x4EF6;&#x4F60;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6233;&#x8FD9;&#x91CC; <a href="https://download.csdn.net/download/qq_20097569/10675562" rel="nofollow noreferrer" target="_blank">CSDN&#x4E0B;&#x8F7D;</a></p><p>&#x6709;&#x79EF;&#x5206;&#x5C31;1&#x79EF;&#x5206;&#x652F;&#x6301;&#x4E00;&#x4E0B;&#xFF0C;&#x6CA1;&#x6709;&#x4E5F;&#x53EF;&#x4EE5;&#x53BB;&#x6211;&#x7684; <a href="https://download.csdn.net/download/qq_20097569/10675562" rel="nofollow noreferrer" target="_blank">github&#x4E0B;&#x8F7D;</a></p><p>&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x4E0B;&#x8F7D;&#xFF0C;&#x6216;&#x8BB8;&#x4F1A;&#x6709;&#x7248;&#x672C;&#x7684;&#x95EE;&#x9898;&#x5427;&#x3002;</p><p><strong>3</strong>&#x3001;&#x5728;<code>/build/webpack.base.conf.js</code>&#x4E2D;&#x65B0;&#x589E;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#xFF08;vendor&#x7684;&#x540D;&#x5B57;&#x5FC5;&#x987B;&#x548C;&#x7B2C;&#x4E8C;&#x6B65;&#x65B0;&#x5EFA;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x540D;&#x5B57;&#x76F8;&#x540C;&#xFF09;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
  extensions: [&apos;.js&apos;, &apos;.vue&apos;, &apos;.json&apos;],
  alias: {
    &apos;vue$&apos;: &apos;vue/dist/vue.esm.js&apos;,
    &apos;@&apos;: resolve(&apos;src&apos;),
    &apos;vendor&apos;: path.resolve(__dirname, &apos;../src/vendor&apos;) // &#x65B0;&#x589E;&#x8FD9;&#x4E00;&#x884C;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">resolve: {
  <span class="hljs-attr">extensions</span>: [<span class="hljs-string">&apos;.js&apos;</span>, <span class="hljs-string">&apos;.vue&apos;</span>, <span class="hljs-string">&apos;.json&apos;</span>],
  <span class="hljs-attr">alias</span>: {
    <span class="hljs-string">&apos;vue$&apos;</span>: <span class="hljs-string">&apos;vue/dist/vue.esm.js&apos;</span>,
    <span class="hljs-string">&apos;@&apos;</span>: resolve(<span class="hljs-string">&apos;src&apos;</span>),
    <span class="hljs-string">&apos;vendor&apos;</span>: path.resolve(__dirname, <span class="hljs-string">&apos;../src/vendor&apos;</span>) <span class="hljs-comment">// &#x65B0;&#x589E;&#x8FD9;&#x4E00;&#x884C;</span>
  }
}</code></pre><p><strong>4</strong>&#x3001;&#x5728;vue&#x9879;&#x76EE;&#x4E2D;&#x7684;&#x4F7F;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * excel&#x5BFC;&#x51FA;
 */
exportTable () {
  // this.DefaultData.exportExcelMax&#x9650;&#x5236;&#x4E00;&#x4E0B;&#x5BFC;&#x51FA;&#x7684;&#x603B;&#x6761;&#x6570;
  if (this.totals &lt;= this.DefaultData.exportExcelMax) {
    this.$confirm(&apos;&#x786E;&#x5B9A;&#x8981;&#x5BFC;&#x51FA;&#x5F53;&#x524D;&lt;strong&gt;&apos; + this.totals + &apos;&lt;/strong&gt;&#x6761;&#x6570;&#x636E;&#xFF1F;&apos;, &apos;&#x63D0;&#x793A;&apos;, {
      dangerouslyUseHTMLString: true,
      confirmButtonText: &apos;&#x786E;&#x5B9A;&apos;,
      cancelButtonText: &apos;&#x53D6;&#x6D88;&apos;
    }).then(() =&gt; {
      this.getExpportData()
    }).catch(() =&gt; {
    })
  } else {
    this.$confirm(&apos;&#x5F53;&#x524D;&#x8981;&#x5BFC;&#x51FA;&#x7684;&lt;strong&gt;&apos; + this.totals + &apos;&lt;/strong&gt;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#xFF0C;&#x4E0D;&#x80FD;&#x4E00;&#x6B21;&#x5BFC;&#x51FA;&#xFF01;&lt;br/&gt;&#x5EFA;&#x8BAE;&#x5206;&#x65F6;&#x95F4;&#x6BB5;&#x5BFC;&#x51FA;&#x6240;&#x9700;&#x6570;&#x636E;&#x3002;&apos;, &apos;&#x63D0;&#x793A;&apos;, {
      dangerouslyUseHTMLString: true,
      showCancelButton: false
    }).then(() =&gt; {
    }).catch(() =&gt; {
    })
  }
},

/**
 * &#x5BF9;&#x5BFC;&#x51FA;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5904;&#x7406;
 */
formatJson (filterVal, jsonData) {
  return jsonData.map(v =&gt; filterVal.map(j =&gt; v[j]))
},

/**
 * &#x5BFC;&#x51FA;&#x7684;&#x5217;&#x8868;&#x6570;&#x636E;
 */
getExpportData: function () {
  const loading = this.$loading({
    lock: true,
    text: &apos;&#x6B63;&#x5728;&#x5BFC;&#x51FA;&#xFF0C;&#x8BF7;&#x7A0D;&#x7B49;......&apos;,
    spinner: &apos;el-icon-loading&apos;,
    background: &apos;rgba(0, 0, 0, 0.7)&apos;
  })
  const data = {
    phoneNo: this.formInline.phoneNo,
    userName: this.formInline.userName,
    amount: this.formInline.amount,
    fee: this.formInline.fee,
    currentPage: this.currentPage,
    pageSize: this.DefaultData.exportExcelMax
  }
  // &#x8FD9;&#x91CC;&#x5C01;&#x88C5;&#x4E86;axios&#xFF0C;&#x6839;&#x636E;&#x81EA;&#x8EAB;&#x60C5;&#x51B5;&#x4FEE;&#x6539;&#x5373;&#x53EF;
  this.http(
    this.ApiSetting.orderExport,
    data
  ).then((res) =&gt; {
    // handleDataList&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5BF9;&#x5BFC;&#x51FA;&#x7684;&#x6570;&#x636E;&#x6839;&#x636E;&#x9700;&#x6C42;&#x505A;&#x4E0B;&#x5904;&#x7406;
    const handleDataList = res.data.list
    for (let i in res.data.list) {
      handleDataList[i].amount = res.data.list[i].amount * 100
      handleDataList[i].fee = res.data.list[i].fee + &apos;%&apos;
    }
    if (res.data.list.length &gt; 0) {
      require.ensure([], () =&gt; {
        /* eslint-disable */
        // &#x8FD9;&#x91CC;&#x7684;&#x5F84;&#x8DEF;&#x8981;&#x4FEE;&#x6539;&#x6B63;&#x786E;
        const { export_json_to_excel } = require(&apos;../../vendor/Export2Excel&apos;)
        /* eslint-enable  */
        // &#x5BFC;&#x51FA;&#x7684;&#x8868;&#x5934;
        const tHeader = [&apos;&#x624B;&#x673A;&#x53F7;&#x7801;&apos;, &apos;&#x7528;&#x6237;&#x59D3;&#x540D;&apos;, &apos;&#x4EA4;&#x6613;&#x91D1;&#x989D;&apos;, &apos;&#x624B;&#x7EED;&#x8D39;&apos;]
        // &#x5BFC;&#x51FA;&#x8868;&#x5934;&#x8981;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;
        const filterVal = [&apos;phoneNo&apos;, &apos;userName&apos;, &apos;amount&apos;, &apos;fee&apos;]
        // &#x5982;&#x679C;&#x5BF9;&#x5BFC;&#x51FA;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x53EF;&#x5904;&#x7406;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x628A;&#x4E0B;&#x9762;&#x7684;handleDataList&#x6362;&#x6210;res.data.list&#x5373;&#x53EF;&#xFF0C;&#x5220;&#x6389;&#x4E0A;&#x9762;&#x76F8;&#x5E94;&#x7684;&#x4EE3;&#x7801;
        const data = this.formatJson(filterVal, handleDataList)
        // this.DefaultData.formatLongDate.getNow()&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#xFF0C;&#x65B9;&#x4FBF;&#x67E5;&#x627E;&#x5BFC;&#x51FA;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6839;&#x636E;&#x9700;&#x6C42;&#x81EA;&#x884C;&#x53EF;&#x5904;&#x7406;&#x3002;
        export_json_to_excel(tHeader, data, &apos;&#x8BA2;&#x5355;&#x67E5;&#x8BE2;&#x5217;&#x8868;-&apos; + this.DefaultData.formatLongDate.getNow())
        this.$message({
          message: &apos;&#x5BFC;&#x51FA;&#x6210;&#x529F;&apos;,
          duration: 2000,
          type: &apos;success&apos;
        })
      })
    } else {
      this.$message({
        message: &apos;&#x6570;&#x636E;&#x51FA;&#x932F;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;,
        duration: 2000,
        type: &apos;warning&apos;
      })
    }
    loading.close()
  }, error =&gt; {
    console.log(error)
    loading.close()
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * excel&#x5BFC;&#x51FA;
 */</span>
exportTable () {
  <span class="hljs-comment">// this.DefaultData.exportExcelMax&#x9650;&#x5236;&#x4E00;&#x4E0B;&#x5BFC;&#x51FA;&#x7684;&#x603B;&#x6761;&#x6570;</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.totals &lt;= <span class="hljs-keyword">this</span>.DefaultData.exportExcelMax) {
    <span class="hljs-keyword">this</span>.$confirm(<span class="hljs-string">&apos;&#x786E;&#x5B9A;&#x8981;&#x5BFC;&#x51FA;&#x5F53;&#x524D;&lt;strong&gt;&apos;</span> + <span class="hljs-keyword">this</span>.totals + <span class="hljs-string">&apos;&lt;/strong&gt;&#x6761;&#x6570;&#x636E;&#xFF1F;&apos;</span>, <span class="hljs-string">&apos;&#x63D0;&#x793A;&apos;</span>, {
      <span class="hljs-attr">dangerouslyUseHTMLString</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">confirmButtonText</span>: <span class="hljs-string">&apos;&#x786E;&#x5B9A;&apos;</span>,
      <span class="hljs-attr">cancelButtonText</span>: <span class="hljs-string">&apos;&#x53D6;&#x6D88;&apos;</span>
    }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.getExpportData()
    }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    })
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">this</span>.$confirm(<span class="hljs-string">&apos;&#x5F53;&#x524D;&#x8981;&#x5BFC;&#x51FA;&#x7684;&lt;strong&gt;&apos;</span> + <span class="hljs-keyword">this</span>.totals + <span class="hljs-string">&apos;&lt;/strong&gt;&#x6761;&#x6570;&#x636E;&#xFF0C;&#x6570;&#x636E;&#x91CF;&#x8FC7;&#x5927;&#xFF0C;&#x4E0D;&#x80FD;&#x4E00;&#x6B21;&#x5BFC;&#x51FA;&#xFF01;&lt;br/&gt;&#x5EFA;&#x8BAE;&#x5206;&#x65F6;&#x95F4;&#x6BB5;&#x5BFC;&#x51FA;&#x6240;&#x9700;&#x6570;&#x636E;&#x3002;&apos;</span>, <span class="hljs-string">&apos;&#x63D0;&#x793A;&apos;</span>, {
      <span class="hljs-attr">dangerouslyUseHTMLString</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">showCancelButton</span>: <span class="hljs-literal">false</span>
    }).then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    }).catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    })
  }
},

<span class="hljs-comment">/**
 * &#x5BF9;&#x5BFC;&#x51FA;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x5904;&#x7406;
 */</span>
formatJson (filterVal, jsonData) {
  <span class="hljs-keyword">return</span> jsonData.map(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> filterVal.map(<span class="hljs-function"><span class="hljs-params">j</span> =&gt;</span> v[j]))
},

<span class="hljs-comment">/**
 * &#x5BFC;&#x51FA;&#x7684;&#x5217;&#x8868;&#x6570;&#x636E;
 */</span>
getExpportData: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> loading = <span class="hljs-keyword">this</span>.$loading({
    <span class="hljs-attr">lock</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">text</span>: <span class="hljs-string">&apos;&#x6B63;&#x5728;&#x5BFC;&#x51FA;&#xFF0C;&#x8BF7;&#x7A0D;&#x7B49;......&apos;</span>,
    <span class="hljs-attr">spinner</span>: <span class="hljs-string">&apos;el-icon-loading&apos;</span>,
    <span class="hljs-attr">background</span>: <span class="hljs-string">&apos;rgba(0, 0, 0, 0.7)&apos;</span>
  })
  <span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">phoneNo</span>: <span class="hljs-keyword">this</span>.formInline.phoneNo,
    <span class="hljs-attr">userName</span>: <span class="hljs-keyword">this</span>.formInline.userName,
    <span class="hljs-attr">amount</span>: <span class="hljs-keyword">this</span>.formInline.amount,
    <span class="hljs-attr">fee</span>: <span class="hljs-keyword">this</span>.formInline.fee,
    <span class="hljs-attr">currentPage</span>: <span class="hljs-keyword">this</span>.currentPage,
    <span class="hljs-attr">pageSize</span>: <span class="hljs-keyword">this</span>.DefaultData.exportExcelMax
  }
  <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C01;&#x88C5;&#x4E86;axios&#xFF0C;&#x6839;&#x636E;&#x81EA;&#x8EAB;&#x60C5;&#x51B5;&#x4FEE;&#x6539;&#x5373;&#x53EF;</span>
  <span class="hljs-keyword">this</span>.http(
    <span class="hljs-keyword">this</span>.ApiSetting.orderExport,
    data
  ).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
    <span class="hljs-comment">// handleDataList&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x5BF9;&#x5BFC;&#x51FA;&#x7684;&#x6570;&#x636E;&#x6839;&#x636E;&#x9700;&#x6C42;&#x505A;&#x4E0B;&#x5904;&#x7406;</span>
    <span class="hljs-keyword">const</span> handleDataList = res.data.list
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">in</span> res.data.list) {
      handleDataList[i].amount = res.data.list[i].amount * <span class="hljs-number">100</span>
      handleDataList[i].fee = res.data.list[i].fee + <span class="hljs-string">&apos;%&apos;</span>
    }
    <span class="hljs-keyword">if</span> (res.data.list.length &gt; <span class="hljs-number">0</span>) {
      <span class="hljs-built_in">require</span>.ensure([], () =&gt; {
        <span class="hljs-comment">/* eslint-disable */</span>
        <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;&#x5F84;&#x8DEF;&#x8981;&#x4FEE;&#x6539;&#x6B63;&#x786E;</span>
        <span class="hljs-keyword">const</span> { export_json_to_excel } = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;../../vendor/Export2Excel&apos;</span>)
        <span class="hljs-comment">/* eslint-enable  */</span>
        <span class="hljs-comment">// &#x5BFC;&#x51FA;&#x7684;&#x8868;&#x5934;</span>
        <span class="hljs-keyword">const</span> tHeader = [<span class="hljs-string">&apos;&#x624B;&#x673A;&#x53F7;&#x7801;&apos;</span>, <span class="hljs-string">&apos;&#x7528;&#x6237;&#x59D3;&#x540D;&apos;</span>, <span class="hljs-string">&apos;&#x4EA4;&#x6613;&#x91D1;&#x989D;&apos;</span>, <span class="hljs-string">&apos;&#x624B;&#x7EED;&#x8D39;&apos;</span>]
        <span class="hljs-comment">// &#x5BFC;&#x51FA;&#x8868;&#x5934;&#x8981;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x636E;</span>
        <span class="hljs-keyword">const</span> filterVal = [<span class="hljs-string">&apos;phoneNo&apos;</span>, <span class="hljs-string">&apos;userName&apos;</span>, <span class="hljs-string">&apos;amount&apos;</span>, <span class="hljs-string">&apos;fee&apos;</span>]
        <span class="hljs-comment">// &#x5982;&#x679C;&#x5BF9;&#x5BFC;&#x51FA;&#x7684;&#x6570;&#x636E;&#x6CA1;&#x6709;&#x53EF;&#x5904;&#x7406;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x628A;&#x4E0B;&#x9762;&#x7684;handleDataList&#x6362;&#x6210;res.data.list&#x5373;&#x53EF;&#xFF0C;&#x5220;&#x6389;&#x4E0A;&#x9762;&#x76F8;&#x5E94;&#x7684;&#x4EE3;&#x7801;</span>
        <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">this</span>.formatJson(filterVal, handleDataList)
        <span class="hljs-comment">// this.DefaultData.formatLongDate.getNow()&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x4E00;&#x4E2A;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x65F6;&#x95F4;&#xFF0C;&#x65B9;&#x4FBF;&#x67E5;&#x627E;&#x5BFC;&#x51FA;&#x540E;&#x7684;&#x6587;&#x4EF6;&#x3002;&#x6839;&#x636E;&#x9700;&#x6C42;&#x81EA;&#x884C;&#x53EF;&#x5904;&#x7406;&#x3002;</span>
        export_json_to_excel(tHeader, data, <span class="hljs-string">&apos;&#x8BA2;&#x5355;&#x67E5;&#x8BE2;&#x5217;&#x8868;-&apos;</span> + <span class="hljs-keyword">this</span>.DefaultData.formatLongDate.getNow())
        <span class="hljs-keyword">this</span>.$message({
          <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x5BFC;&#x51FA;&#x6210;&#x529F;&apos;</span>,
          <span class="hljs-attr">duration</span>: <span class="hljs-number">2000</span>,
          <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;success&apos;</span>
        })
      })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.$message({
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x6570;&#x636E;&#x51FA;&#x932F;&#xFF0C;&#x8BF7;&#x8054;&#x7CFB;&#x7BA1;&#x7406;&#x5458;&apos;</span>,
        <span class="hljs-attr">duration</span>: <span class="hljs-number">2000</span>,
        <span class="hljs-attr">type</span>: <span class="hljs-string">&apos;warning&apos;</span>
      })
    }
    loading.close()
  }, error =&gt; {
    <span class="hljs-built_in">console</span>.log(error)
    loading.close()
  })
}</code></pre><p>&#x5728;&#x9700;&#x8981;&#x5BFC;&#x51FA;&#x529F;&#x80FD;&#x7684;&#x9875;&#x9762;&#x52A0;&#x5165;&#x4E0A;&#x9762;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x4FEE;&#x6539;&#x597D;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x4E8B;&#x9879;&#xFF0C;&#x5BFC;&#x51FA;Excel&#x8868;&#x683C;&#x5C31;ok&#x4E86;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中导出Excel表格

## 原文链接
[https://segmentfault.com/a/1190000016457561](https://segmentfault.com/a/1190000016457561)

