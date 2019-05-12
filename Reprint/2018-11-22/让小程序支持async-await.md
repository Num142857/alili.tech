---
title: '让小程序支持async-await' 
date: 2018-11-22 11:48:10
hidden: true
slug: pne8r5cxkze
categories: [reprint]
---

{{< raw >}}
<p>async-await&#x662F;ES7&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x622A;&#x6B62;&#x6211;&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E3A;&#x6B62;&#xFF0C;&#x5C0F;&#x7A0B;&#x5E8F;&#x8FD8;&#x662F;&#x4E0D;&#x652F;&#x6301;async-await&#x8BED;&#x6CD5;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x4F7F;&#x7528;<a href="https://github.com/facebook/regenerator" rel="nofollow noreferrer" target="_blank">regenerator</a>&#x8FD9;&#x4E2A;&#x5E93;</p><ol><li>&#x4E0B;&#x8F7D;<a href="https://github.com/facebook/regenerator" rel="nofollow noreferrer" target="_blank">regenerator</a>&#xFF0C;&#x5E76;&#x628A;regenerator-runtime&#x6587;&#x4EF6;&#x5939;&#x653E;&#x5230;utils&#x76EE;&#x5F55;&#x4E0B;</li></ol><p><span class="img-wrap"><img data-src="/img/bVbd0gI?w=260&amp;h=274" src="https://static.alili.tech/img/bVbd0gI?w=260&amp;h=274" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><ol><li>&#x5728;util.js&#x5F15;&#x5165;<code>import regeneratorRuntime from &apos;./regenerator-runtime/runtime-module&apos;</code></li><li>&#x5C01;&#x88C5;wxRequest&#xFF0C;&#x8BA9;&#x5FAE;&#x4FE1;&#x7684;wx.request API&#x652F;&#x6301;async-await&#x8BED;&#x6CD5;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const wxRequest = async (url, params = {}) =&gt; {
  Object.assign(params, {
    token: wx.getStorageSync(&apos;token&apos;)
  })
  // &#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;header&#x9ED8;&#x8BA4;&#x643A;&#x5E26;token
  let header = params.header || {
    &apos;Content-Type&apos;: &apos;application/json&apos;,
    &apos;token&apos;: params.token || &apos;&apos;
  }
  let data = params.data || {}
  let method = params.method || &apos;GET&apos;
  // hideLoading&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x662F;&#x5426;&#x663E;&#x793A;&#x52A0;&#x8F7D;&#x72B6;&#x6001;
  if (!params.hideLoading) {
   wx.showLoading({
     title: &apos;&#x52A0;&#x8F7D;&#x4E2D;...&apos;,
   })
  }
  let res = await new Promise((resolve, reject) =&gt; {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: header,
      success: (res) =&gt; {
        if (res &amp;&amp; res.statusCode == 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) =&gt; {
        reject(err)
      },
      complete: (e) =&gt; {
        wx.hideLoading()
      }
    })
  })
  return res
}

export {
  wxRequest
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> wxRequest = <span class="hljs-keyword">async</span> (url, params = {}) =&gt; {
  <span class="hljs-built_in">Object</span>.assign(params, {
    <span class="hljs-attr">token</span>: wx.getStorageSync(<span class="hljs-string">&apos;token&apos;</span>)
  })
  <span class="hljs-comment">// &#x6240;&#x6709;&#x7684;&#x8BF7;&#x6C42;&#xFF0C;header&#x9ED8;&#x8BA4;&#x643A;&#x5E26;token</span>
  <span class="hljs-keyword">let</span> header = params.header || {
    <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/json&apos;</span>,
    <span class="hljs-string">&apos;token&apos;</span>: params.token || <span class="hljs-string">&apos;&apos;</span>
  }
  <span class="hljs-keyword">let</span> data = params.data || {}
  <span class="hljs-keyword">let</span> method = params.method || <span class="hljs-string">&apos;GET&apos;</span>
  <span class="hljs-comment">// hideLoading&#x53EF;&#x4EE5;&#x63A7;&#x5236;&#x662F;&#x5426;&#x663E;&#x793A;&#x52A0;&#x8F7D;&#x72B6;&#x6001;</span>
  <span class="hljs-keyword">if</span> (!params.hideLoading) {
   wx.showLoading({
     <span class="hljs-attr">title</span>: <span class="hljs-string">&apos;&#x52A0;&#x8F7D;&#x4E2D;...&apos;</span>,
   })
  }
  <span class="hljs-keyword">let</span> res = <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    wx.request({
      <span class="hljs-attr">url</span>: url,
      <span class="hljs-attr">method</span>: method,
      <span class="hljs-attr">data</span>: data,
      <span class="hljs-attr">header</span>: header,
      <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (res &amp;&amp; res.statusCode == <span class="hljs-number">200</span>) {
          resolve(res.data)
        } <span class="hljs-keyword">else</span> {
          reject(res)
        }
      },
      <span class="hljs-attr">fail</span>: <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
        reject(err)
      },
      <span class="hljs-attr">complete</span>: <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        wx.hideLoading()
      }
    })
  })
  <span class="hljs-keyword">return</span> res
}

<span class="hljs-keyword">export</span> {
  wxRequest
}</code></pre><p>&#x5C01;&#x88C5;&#x597D;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x5728;js&#x6587;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import regeneratorRuntime from &apos;../../utils/regenerator-runtime/runtime-module.js&apos;
import {
  wxRequest
} from &apos;../../utils/util.js&apos;

Page({
  data: {
   list:[],
   count: 0,
   page: 1,
   limit: 10
  },
  onLoad: function() {
    this.getList()
    // &#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F; &#x505A;&#x5176;&#x4ED6;&#x4E8B;
  },
  getList: async function() {
    await wxRequest(app.globalData.baseUrl + &apos;/test&apos;,{
      hideLoading: true,
      data: {
        limit: this.data.limit,
        page: this.data.page
      }
    }).then((ret) =&gt; {
      this.setData({
        list: ret.data.data,
        count: ret.data.num
      })
    })
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> regeneratorRuntime <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../utils/regenerator-runtime/runtime-module.js&apos;</span>
<span class="hljs-keyword">import</span> {
  wxRequest
} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../utils/util.js&apos;</span>

Page({
  <span class="hljs-attr">data</span>: {
   <span class="hljs-attr">list</span>:[],
   <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>,
   <span class="hljs-attr">page</span>: <span class="hljs-number">1</span>,
   <span class="hljs-attr">limit</span>: <span class="hljs-number">10</span>
  },
  <span class="hljs-attr">onLoad</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.getList()
    <span class="hljs-comment">// &#x8BF7;&#x6C42;&#x5DF2;&#x7ECF;&#x7ED3;&#x675F; &#x505A;&#x5176;&#x4ED6;&#x4E8B;</span>
  },
  <span class="hljs-attr">getList</span>: <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">await</span> wxRequest(app.globalData.baseUrl + <span class="hljs-string">&apos;/test&apos;</span>,{
      <span class="hljs-attr">hideLoading</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">limit</span>: <span class="hljs-keyword">this</span>.data.limit,
        <span class="hljs-attr">page</span>: <span class="hljs-keyword">this</span>.data.page
      }
    }).then(<span class="hljs-function">(<span class="hljs-params">ret</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.setData({
        <span class="hljs-attr">list</span>: ret.data.data,
        <span class="hljs-attr">count</span>: ret.data.num
      })
    })
  }
})</code></pre><p>&#x5C01;&#x88C5;&#x5E26;&#x6765;&#x7684;&#x6700;&#x5927;&#x7684;&#x597D;&#x5904;&#x662F;&#x6269;&#x5C55;&#x65B9;&#x4FBF;&#xFF0C;&#x652F;&#x6301;&#x4E86;async/await&#x8BED;&#x6CD5;&#x540E;&#xFF0C;&#x4EFB;&#x4F55;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;API&#x90FD;&#x53EF;&#x4EE5;&#x50CF;&#x540C;&#x6B65;&#x4E00;&#x6837;&#x6267;&#x884C;&#xFF0C;&#x6BD4;&#x5982;&#x8BF4;&#x591A;&#x56FE;&#x4E0A;&#x4F20;&#xFF0C;&#x56FE;&#x7247;&#x90FD;&#x4E0A;&#x4F20;&#x6210;&#x529F;&#x540E;&#x540E;&#x7AEF;&#x4F1A;&#x8FD4;&#x56DE;&#x65B0;&#x7684;&#x56FE;&#x7247;&#x5730;&#x5740;&#xFF0C;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x505A;&#xFF1A;</p><p>&#x4EFB;&#x52A1;&#xFF1A;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E0A;&#x4F20;&#x56FE;&#x7247;&#x5230;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x6700;&#x591A;&#x4E0A;&#x4F20;&#x4E09;&#x5F20;&#xFF0C;&#x524D;&#x7AEF;&#x53EF;&#x4EE5;&#x5220;&#x9664;&#x56FE;&#x7247;</p><p>&#x6548;&#x679C;&#x56FE;&#x5982;&#x4E0B;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015682257?w=366&amp;h=174" src="https://static.alili.tech/img/remote/1460000015682257?w=366&amp;h=174" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x4F7F;&#x7528;&#x5230;&#x7684;API&#x6709;&#x4E24;&#x4E2A;&#xFF1A;wx.uploadFile wx.chooseImage</p><p>&#x793A;&#x4F8B;WXML&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;view class=&quot;sale after-pic&quot;&gt;
  &lt;block wx:for=&quot;"{{"imgList"}}"&quot; wx:key=&quot;"{{"index"}}"&quot;&gt;
    &lt;view class=&quot;pic&quot;&gt;
      &lt;image src=&quot;"{{"item"}}"&quot; /&gt;
      &lt;icon type=&quot;clear&quot; size=&quot;20&quot; catchtap=&quot;clearImg&quot; data-id=&quot;"{{"index"}}"&quot;/&gt;
    &lt;/view&gt;
  &lt;/block&gt;
  &lt;image src=&quot;../../images/upload.png&quot; catchtap=&quot;chooseImage&quot; /&gt;
&lt;/view&gt;
&lt;button catchtap=&quot;onSub&quot;&gt;&#x63D0;&#x4EA4;&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sale after-pic&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">block</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">&quot;"{{"imgList"}}"&quot;</span> <span class="hljs-attr">wx:key</span>=<span class="hljs-string">&quot;"{{"index"}}"&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;pic&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;"{{"item"}}"&quot;</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;clear&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;20&quot;</span> <span class="hljs-attr">catchtap</span>=<span class="hljs-string">&quot;clearImg&quot;</span> <span class="hljs-attr">data-id</span>=<span class="hljs-string">&quot;"{{"index"}}"&quot;</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">block</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">image</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;../../images/upload.png&quot;</span> <span class="hljs-attr">catchtap</span>=<span class="hljs-string">&quot;chooseImage&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">catchtap</span>=<span class="hljs-string">&quot;onSub&quot;</span>&gt;</span>&#x63D0;&#x4EA4;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre><p>imgList&#x662F;wx.chooseImage&#x6210;&#x529F;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x56FE;&#x7247;&#x4E34;&#x65F6;&#x5730;&#x5740;</p><p>&#x793A;&#x4F8B;JS</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Page({
  data: {
    imgList:[]
  },
  onSub: async function() {
    // &#x70B9;&#x51FB;&#x63D0;&#x4EA4;&#x540E;&#xFF0C;&#x5F00;&#x59CB;&#x4E0A;&#x4F20;&#x56FE;&#x7247;
     let imgUrls = []
     for (let index = 0; index &lt; this.data.imgList.length; index++) {
       await this.uploadFile(this.data.imgList[index]).then((res) =&gt; {
         // &#x8FD9;&#x91CC;&#x8981;&#x6CE8;&#x610F;&#x628A;res.data parse&#x4E00;&#x4E0B;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x5B57;&#x7B26;&#x4E32;
         let parseData = JSON.parse(res.data)
         imgUrls.push(parseData.data) // &#x56FE;&#x7247;&#x5730;&#x5740;
       })
     }
     console.log(imgUrls) // 3&#x5F20;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;
  },
  // &#x5220;&#x9664;&#x67D0;&#x5F20;&#x56FE;&#x7247;
  clearImg: function (params) {
    let imgList = this.data.imgList
    let id = params.currentTarget.dataset.id // &#x56FE;&#x7247;&#x7D22;&#x5F15;
    imgList.splice(id, 1) // &#x5220;&#x9664;
    this.setData({
      imgList: imgList
    })
  },
  chooseImage: function (params) {
    wx.chooseImage({
      count: 3, // &#x505A;&#x591A;3&#x5F20;
      sizeType: [&apos;original&apos;, &apos;compressed&apos;],
      sourceType: [&apos;album&apos;, &apos;camera&apos;],
      success: (res) =&gt; {
        // &#x5B58;&#x50A8;&#x4E34;&#x65F6;&#x5730;&#x5740;
        this.setData({
          imgList: res.tempFilePaths
        })
      }
    })
  },
  uploadFile: function (filePath) {
    // &#x8FD4;&#x56DE;Promise&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x7684;&#x5F02;&#x6B65;&#x95EE;&#x9898;
    return new Promise( (resolve, reject) =&gt; {
      wx.uploadFile({
        url: app.globalData.baseUrl + &apos;/file/upload&apos;, // &#x4E0A;&#x4F20;&#x5730;&#x5740;
        filePath: filePath,
        name: &apos;file&apos;, // &#x8FD9;&#x91CC;&#x7684;&#x5177;&#x4F53;&#x503C;&#xFF0C;&#x95EE;&#x540E;&#x7AEF;&#x4EBA;&#x5458;
        formData: {},
        header: {
          &quot;Content-Type&quot;: &quot;multipart/form-data&quot;
        },
        success: (res) =&gt;{
          resolve(res.data)
        },
        fail:(err) =&gt; {
          reject(err)
        }
      })
    })
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">Page({
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">imgList</span>:[]
  },
  <span class="hljs-attr">onSub</span>: <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x70B9;&#x51FB;&#x63D0;&#x4EA4;&#x540E;&#xFF0C;&#x5F00;&#x59CB;&#x4E0A;&#x4F20;&#x56FE;&#x7247;</span>
     <span class="hljs-keyword">let</span> imgUrls = []
     <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>; index &lt; <span class="hljs-keyword">this</span>.data.imgList.length; index++) {
       <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.uploadFile(<span class="hljs-keyword">this</span>.data.imgList[index]).then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
         <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8981;&#x6CE8;&#x610F;&#x628A;res.data parse&#x4E00;&#x4E0B;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F;&#x5B57;&#x7B26;&#x4E32;</span>
         <span class="hljs-keyword">let</span> parseData = <span class="hljs-built_in">JSON</span>.parse(res.data)
         imgUrls.push(parseData.data) <span class="hljs-comment">// &#x56FE;&#x7247;&#x5730;&#x5740;</span>
       })
     }
     <span class="hljs-built_in">console</span>.log(imgUrls) <span class="hljs-comment">// 3&#x5F20;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x6210;&#x529F;&#x540E;&#xFF0C;&#x6267;&#x884C;&#x5176;&#x4ED6;&#x64CD;&#x4F5C;</span>
  },
  <span class="hljs-comment">// &#x5220;&#x9664;&#x67D0;&#x5F20;&#x56FE;&#x7247;</span>
  clearImg: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">params</span>) </span>{
    <span class="hljs-keyword">let</span> imgList = <span class="hljs-keyword">this</span>.data.imgList
    <span class="hljs-keyword">let</span> id = params.currentTarget.dataset.id <span class="hljs-comment">// &#x56FE;&#x7247;&#x7D22;&#x5F15;</span>
    imgList.splice(id, <span class="hljs-number">1</span>) <span class="hljs-comment">// &#x5220;&#x9664;</span>
    <span class="hljs-keyword">this</span>.setData({
      <span class="hljs-attr">imgList</span>: imgList
    })
  },
  <span class="hljs-attr">chooseImage</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">params</span>) </span>{
    wx.chooseImage({
      <span class="hljs-attr">count</span>: <span class="hljs-number">3</span>, <span class="hljs-comment">// &#x505A;&#x591A;3&#x5F20;</span>
      sizeType: [<span class="hljs-string">&apos;original&apos;</span>, <span class="hljs-string">&apos;compressed&apos;</span>],
      <span class="hljs-attr">sourceType</span>: [<span class="hljs-string">&apos;album&apos;</span>, <span class="hljs-string">&apos;camera&apos;</span>],
      <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-comment">// &#x5B58;&#x50A8;&#x4E34;&#x65F6;&#x5730;&#x5740;</span>
        <span class="hljs-keyword">this</span>.setData({
          <span class="hljs-attr">imgList</span>: res.tempFilePaths
        })
      }
    })
  },
  <span class="hljs-attr">uploadFile</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">filePath</span>) </span>{
    <span class="hljs-comment">// &#x8FD4;&#x56DE;Promise&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x56FE;&#x7247;&#x4E0A;&#x4F20;&#x7684;&#x5F02;&#x6B65;&#x95EE;&#x9898;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>( <span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      wx.uploadFile({
        <span class="hljs-attr">url</span>: app.globalData.baseUrl + <span class="hljs-string">&apos;/file/upload&apos;</span>, <span class="hljs-comment">// &#x4E0A;&#x4F20;&#x5730;&#x5740;</span>
        filePath: filePath,
        <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;file&apos;</span>, <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;&#x5177;&#x4F53;&#x503C;&#xFF0C;&#x95EE;&#x540E;&#x7AEF;&#x4EBA;&#x5458;</span>
        formData: {},
        <span class="hljs-attr">header</span>: {
          <span class="hljs-string">&quot;Content-Type&quot;</span>: <span class="hljs-string">&quot;multipart/form-data&quot;</span>
        },
        <span class="hljs-attr">success</span>: <span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span>{
          resolve(res.data)
        },
        <span class="hljs-attr">fail</span>:<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
          reject(err)
        }
      })
    })
  }
})</code></pre><p>wx.uploadFile()&#x662F;&#x5F02;&#x6B65;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E86;async-await&#x7684;&#x652F;&#x6301;&#xFF0C;&#x8F7B;&#x677E;&#x641E;&#x5B9A;&#x5F02;&#x6B65;&#x7B49;&#x5F85;&#x7684;&#x95EE;&#x9898;</p><p>&#x66F4;&#x591A;&#x5F00;&#x53D1;&#x603B;&#x7ED3;<a href="https://segmentfault.com/a/1190000015682251">&#x79FB;&#x6B65;&#x4E8E;&#x6B64;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让小程序支持async-await

## 原文链接
[https://segmentfault.com/a/1190000015691620](https://segmentfault.com/a/1190000015691620)

