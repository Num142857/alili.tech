---
title: 'VueJs项目笔记' 
date: 2019-01-08 2:30:11
hidden: true
slug: 0w3sxs6mujy
categories: [reprint]
---

{{< raw >}}

                    
<p>======================知识点总结===========================</p>
<h2 id="articleHeader0">一、keep-alive(实现页面的缓存)</h2>
<h2 id="articleHeader1">二、 移动端固定定位的解决方案</h2>
<h2 id="articleHeader2">三、 Vue表单校验</h2>
<ul>
<li><p>[<a href="https://www.zhihu.com/question/370" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p></li>
<li><p>99220](<a href="https://www.zhihu.com/question/37099220" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a> "Vue表单验证")</p></li>
<li><p><a href="https://github.com/aweiu/vue-verify-pop" rel="nofollow noreferrer" target="_blank">https://github.com/aweiu/vue-verify-pop</a></p></li>
<li>
<p>vue-validator中文文档</p>
<ul><li><p><a href="https://github.com/kazupon/vue-validator/tree/2.x/docs/zh-cn" rel="nofollow noreferrer" target="_blank">https://github.com/kazupon/vu...</a></p></li></ul>
</li>
</ul>
<h2 id="articleHeader3">横向滑动的tab选项卡，以及输入法定位相关的</h2>
<ul>
<li><p>JQ插件网<a href="http://jq22.com" rel="nofollow noreferrer" target="_blank">http://jq22.com</a></p></li>
<li><p>当第一个输入框自动获得光标的时候，弹出的输入法会把布局顶上去</p></li>
</ul>
<h3 id="articleHeader4">问题1：可以左右滑动的tab</h3>
<ul><li><p>将项目中引入Jq框架和tab插件</p></li></ul>
<h3 id="articleHeader5">当第一个输入框自动获得光标的时候，弹出的输入法会把布局顶上去?</h3>
<ul>
<li>
<p>给最外层盒子加上绝对定位,并且设置固定高度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .reg-layer {
      width: 100%;
      height: 360px;
      background: #ffffff;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.reg-layer</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">360px</span>;
      <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
      <span class="hljs-attribute">position</span>: absolute;
      <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>;
    }</code></pre>
</li>
<li>
<p>再给登录框设置固定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    .login-main {
      width: 100%;
      height: 4rem;
      background-color: #ffffff;
      padding-top: 0.4rem;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    <span class="hljs-selector-class">.login-main</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">4rem</span>;
      <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ffffff</span>;
      <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">0.4rem</span>;
    }
</code></pre>
</li>
</ul>
<h3 id="articleHeader6">怎么去加载一倍图，二倍图，三倍图等</h3>
<ul><li><p>使用Retina.js</p></li></ul>
<h3 id="articleHeader7">上拉刷新、下拉加载更多</h3>
<ul><li>
<p>VUe-Scroller</p>
<ul><li><p><a href="https://github.com/wangdahoo/vue-scroller" rel="nofollow noreferrer" target="_blank">https://github.com/wangdahoo/...</a></p></li></ul>
</li></ul>
<h2 id="articleHeader8">登录注册</h2>
<ul>
<li><p>VueJs保存token</p></li>
<li><p>判断token失效</p></li>
</ul>
<h3 id="articleHeader9">VueJs保存token</h3>
<ul>
<li><p><a href="http://blog.csdn.net/generon/article/details/72472414" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/generon/...</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000007624160">https://segmentfault.com/q/10...</a></p></li>
<li><p><a href="http://www.jb51.net/article/106334.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/1...</a></p></li>
<li><p><a href="http://shequ.jb51.net/q_1599.html" rel="nofollow noreferrer" target="_blank">http://shequ.jb51.net/q_1599....</a></p></li>
</ul>
<h3 id="articleHeader10">Vue-cli proxyTable 解决开发环境的跨域问题</h3>
<ul>
<li><p><a href="http://blog.csdn.net/hsany330/article/details/53190166" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/hsany330...</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000008769620">https://segmentfault.com/q/10...</a></p></li>
</ul>
<h2 id="articleHeader11">使用localStorage解决vuex在页面刷新后数据被清除的问题</h2>
<ul><li><p><a href="http://www.cnblogs.com/limengyi/p/6534435.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/limeng...</a></p></li></ul>
<h2 id="articleHeader12">如何在vue中实现路由跳转判断用户权限功能？</h2>
<ul><li><p><a href="https://segmentfault.com/q/1010000008914977/a-1020000008915678(">https://segmentfault.com/q/10...</a>这个比较不错)</p></li></ul>
<h2 id="articleHeader13">Axios</h2>
<ul><li><p><a href="http://www.cnblogs.com/libin-1/p/6607945.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/libin-...</a></p></li></ul>
<h2 id="articleHeader14">Ju Network Status By JS</h2>
<ul>
<li><p><a href="https://github.com/HubSpot/offline" rel="nofollow noreferrer" target="_blank">https://github.com/HubSpot/of...</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002558481">https://segmentfault.com/a/11...</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000004069389/a-1020000004069573" target="_blank">https://segmentfault.com/q/10...</a></p></li>
<li><p><a href="http://wicg.github.io/netinfo/" rel="nofollow noreferrer" target="_blank">http://wicg.github.io/netinfo/</a></p></li>
</ul>
<h2 id="articleHeader15">Web App Notes</h2>
<ul><li><p><a href="http://blog.csdn.net/zhangxin09/article/details/8750586" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/zhangxin...</a></p></li></ul>
<h2 id="articleHeader16">Axios WebSite Address</h2>
<ul><li><p><a href="http://www.kancloud.cn/yunye/axios/234845" rel="nofollow noreferrer" target="_blank">http://www.kancloud.cn/yunye/...</a></p></li></ul>
<h2 id="articleHeader17">No NetWork SPA</h2>
<ul><li><p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/examples/SPA.md" rel="nofollow noreferrer" target="_blank">https://github.com/NekR/offli...</a></p></li></ul>
<h2 id="articleHeader18">VueJS Communication among brothers</h2>
<ul><li><p><a href="http://www.cnblogs.com/zsongs/p/6388932.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/zsongs...</a></p></li></ul>
<h2 id="articleHeader19">webpack多页应用架构系列</h2>
<ul><li><p><a href="https://segmentfault.com/a/1190000006952432">https://segmentfault.com/a/11...</a></p></li></ul>
<h2 id="articleHeader20">Vue-Cli配置文件分析</h2>
<ul>
<li><p><a href="http://blog.csdn.net/hongchh/article/details/55113751" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/hongchh/...</a></p></li>
<li><p><a href="http://blog.csdn.net/s8460049/article/details/54604322" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/s8460049...</a></p></li>
</ul>
<h2 id="articleHeader21">下拉刷新</h2>
<ul>
<li><p>获取VueScroller实例:this.$refs.my_scroller</p></li>
<li><p>显示没有更多数据了，在那个infinate()方法中调用done(true)就OK了</p></li>
<li><p><a href="http://www.cnblogs.com/liangxuru/p/6434267.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/liangx...</a></p></li>
<li><p><a href="http://m.codes51.com/article/detail_4270785.html" rel="nofollow noreferrer" target="_blank">http://m.codes51.com/article/...</a></p></li>
</ul>
<h2 id="articleHeader22">Vue-Cli打包发布</h2>
<ul>
<li><p><a href="http://www.cnblogs.com/libin-1/p/6596810.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/libin-...</a></p></li>
<li><p><a href="http://www.tuicool.com/articles/b6BF3ef" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p></li>
</ul>
<h2 id="articleHeader23">移动端-webkit-user-select:none导致input/textarea输入框无法输入</h2>
<ul>
<li><p><a href="http://www.qdfuns.com/notes/12364/1f589926e8d1d1418fc912f7df10e5d5" rel="nofollow noreferrer" target="_blank">http://www.qdfuns.com/notes/1...</a></p></li>
<li><p><a href="http://www.jianshu.com/p/410866041619" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/4108...</a></p></li>
</ul>
<h2 id="articleHeader24">VueJs判断Token过期</h2>
<ul><li><p><a href="http://www.tuicool.com/articles/JRJFN3N" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p></li></ul>
<h2 id="articleHeader25">Axios中的delete请求</h2>
<ul><li><p><a href="https://github.com/pagekit/vue-resource/issues/445" rel="nofollow noreferrer" target="_blank">https://github.com/pagekit/vu...</a></p></li></ul>
<h2 id="articleHeader26">VueJs移动端图片压缩上传</h2>
<ul>
<li><p><a href="https://my.oschina.net/myrainspace/blog/851728" rel="nofollow noreferrer" target="_blank">https://my.oschina.net/myrain...</a></p></li>
<li>
<p>图片压缩插件</p>
<ul><li><p><a href="https://github.com/think2011/localResizeIMG" rel="nofollow noreferrer" target="_blank">https://github.com/think2011/...</a></p></li></ul>
</li>
</ul>
<h2 id="articleHeader27">React  Note</h2>
<ul><li><p><a href="http://www.runoob.com/react/react-tutorial.html" rel="nofollow noreferrer" target="_blank">http://www.runoob.com/react/r...</a></p></li></ul>
<h2 id="articleHeader28">Refresh Current Page</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_this.$router.go(0);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code>_this.$router.go(<span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
</code></pre>
<h2 id="articleHeader29">How I can config https in Vue-Cli</h2>
<ul><li><p><a href="https://segmentfault.com/q/1010000009387899/a-1020000009401370">https://segmentfault.com/q/10...</a></p></li></ul>
<h2 id="articleHeader30">use Vue-Scroller</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
    test: /vue-scroller.src.*?js$/,
    loader: 'babel-loader'
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>    {
    <span class="hljs-attribute">test</span>: /vue-scroller.src.*?js$/,
    loader: <span class="hljs-string">'babel-loader'</span>
  }
</code></pre>
<ul><li>
<p>It can invoked inflate() method automatically when vue component is mounted,there is a way to solve this problem</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.$refs.my_scroller.finishInfinite(true); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-keyword">this</span>.$refs.my_scroller.finishInfinite(<span class="hljs-literal">true</span>); 
</code></pre>
</li></ul>
<h2 id="articleHeader31">Wechat share in VueJs Projects</h2>
<ul>
<li><p><a href="http://www.cnblogs.com/mingxinice/p/mingxin.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/mingxi...</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000006734029">https://segmentfault.com/q/10...</a></p></li>
</ul>
<h2 id="articleHeader32">微信公众号</h2>
<ul><li><p><a href="https://mp.weixin.qq.com/cgi-bin/loginpage?t=wxm2-login&amp;lang=zh_CN" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/cgi-...</a></p></li></ul>
<h2 id="articleHeader33">UpLoad File In VueJs</h2>
<ul>
<li><p><a href="https://github.com/marchFantasy/vue-file-upload" rel="nofollow noreferrer" target="_blank">https://github.com/marchFanta...</a></p></li>
<li><p><a href="https://github.com/lian-yue/vue-upload-component" rel="nofollow noreferrer" target="_blank">https://github.com/lian-yue/v...</a></p></li>
<li><p><a href="https://github.com/mozilla/pdf.js" rel="nofollow noreferrer" target="_blank">https://github.com/mozilla/pd...</a></p></li>
</ul>
<h2 id="articleHeader34">Show PDF In Broswer</h2>
<ul>
<li><p>Using Pdf.js</p></li>
<li><p><a href="https://segmentfault.com/q/1010000006145548">https://segmentfault.com/q/10...</a></p></li>
<li><p><a href="https://github.com/mozilla/pdf.js/wiki/Setup-pdf.js-in-a-website" rel="nofollow noreferrer" target="_blank">https://github.com/mozilla/pd...</a></p></li>
<li><p><a href="https://stackoverflow.com/questions/18069448/halting-pdf-js-page-rendering" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a></p></li>
</ul>
<h3 id="articleHeader35">Show PDF In Broswer Code</h3>
<ul>
<li><p><a href="http://localhost:63342/pdf.js-gh-pages/examples/index.html?_ijt=s4h3uipnnk8bec8b1ddn82mqnn" rel="nofollow noreferrer" target="_blank">http://localhost:63342/pdf.js...</a></p></li>
<li>
<p>it must be contain a canvas tag</p>
<p>import PDFJS from 'pdfjs-dist';<br>showPDF(){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    let pdfPath = '/static/compressed.tracemonkey-pldi-09.pdf';
    let  loadingTask = PDFJS.getDocument(pdfPath);
    loadingTask.promise.then(function (pdfDocument) {
      // Request a first page
      return pdfDocument.getPage(1).then(function (pdfPage) {
        console.log(&quot;pdfPage is :&quot;,pdfPage);
        // Display page on the existing canvas with 100% scale.
        let scale = 1.5;    
        let viewport = pdfPage.getViewport(scale);
        let canvas = document.getElementsByClassName('theCanvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        let ctx = canvas.getContext('2d');
        let renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport: viewport
        });
        return renderTask.promise;
      });
    }).catch(function (reason) {
      console.error('Error: ' + reason);
    });
  },
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">let</span> pdfPath = <span class="hljs-string">'/static/compressed.tracemonkey-pldi-09.pdf'</span>;
    <span class="hljs-keyword">let</span>  loadingTask = PDFJS.getDocument(pdfPath);
    loadingTask.promise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pdfDocument</span>) </span>{
      <span class="hljs-comment">// Request a first page</span>
      <span class="hljs-keyword">return</span> pdfDocument.getPage(<span class="hljs-number">1</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">pdfPage</span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"pdfPage is :"</span>,pdfPage);
        <span class="hljs-comment">// Display page on the existing canvas with 100% scale.</span>
        <span class="hljs-keyword">let</span> scale = <span class="hljs-number">1.5</span>;    
        <span class="hljs-keyword">let</span> viewport = pdfPage.getViewport(scale);
        <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">'theCanvas'</span>);
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        <span class="hljs-keyword">let</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
        <span class="hljs-keyword">let</span> renderTask = pdfPage.render({
          <span class="hljs-attr">canvasContext</span>: ctx,
          <span class="hljs-attr">viewport</span>: viewport
        });
        <span class="hljs-keyword">return</span> renderTask.promise;
      });
    }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">reason</span>) </span>{
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Error: '</span> + reason);
    });
  },
</code></pre>
</li>
</ul>
<h2 id="articleHeader36">DownLoad files</h2>
<ul><li><p><a href="https://www.npmjs.com/package/ndownload" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p></li></ul>
<h2 id="articleHeader37">PDF.js怎么一次性的加载完所有的pdf的内容</h2>
<h2 id="articleHeader38">在进行文件(pdf、word)等的上传中，怎么区分?</h2>
<ul>
<li><p><a href="http://blog.csdn.net/shenshen123jun/" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/shenshen...</a></p></li>
<li>
</li>
<li>
</li>
<li><p>article/details/21626315</p></li>
<li><p>accept="application/msexcel" ----对应上传excel</p></li>
<li><p>accept="application/msword"  ----对应上传word</p></li>
<li><p>accept="application/pdf"     ----对应上传pdf</p></li>
</ul>
<h2 id="articleHeader39">PDF.js Example</h2>
<ul><li><p><a href="https://github.com/mozilla/pdf.js/tree/master/examples" rel="nofollow noreferrer" target="_blank">https://github.com/mozilla/pd...</a></p></li></ul>
<h2 id="articleHeader40">PDF.js Frequently Asked Questions</h2>
<ul><li><p><a href="https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#is-it-possible-to-add-annotations-to-a-pdf" rel="nofollow noreferrer" target="_blank">https://github.com/mozilla/pd...</a></p></li></ul>
<p>PDFViewer.vue</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;pdf-view-layout&quot;>
    <header>
      <h1 id=&quot;title&quot;></h1>
    </header>

    <div id=&quot;viewerContainer&quot;>
      <div id=&quot;viewer&quot; class=&quot;pdfViewer&quot;></div>
    </div>

    <div id=&quot;loadingBar&quot;>
      <div class=&quot;progress&quot;></div>
      <div class=&quot;glimmer&quot;></div>
    </div>

    <div id=&quot;errorWrapper&quot; hidden=&quot;true&quot;>
      <div id=&quot;errorMessageLeft&quot;>
        <span id=&quot;errorMessage&quot;></span>
        <button id=&quot;errorShowMore&quot;>
          More Information
        </button>
        <button id=&quot;errorShowLess&quot;>
          Less Information
        </button>
      </div>
      <div id=&quot;errorMessageRight&quot;>
        <button id=&quot;errorClose&quot;>
          Close
        </button>
      </div>
      <div class=&quot;clearBoth&quot;></div>
      <textarea id=&quot;errorMoreInfo&quot; hidden=&quot;true&quot; readonly=&quot;readonly&quot;></textarea>
    </div>

    <footer>
      <button class=&quot;toolbarButton pageUp&quot; title=&quot;Previous Page&quot; id=&quot;previous&quot; @click=&quot;goNextPage()&quot;></button>
      <button class=&quot;toolbarButton pageDown&quot; title=&quot;Next Page&quot; id=&quot;next&quot;></button>

      <input type=&quot;number&quot; id=&quot;pageNumber&quot; class=&quot;toolbarField pageNumber&quot;  size=&quot;4&quot; min=&quot;1&quot; >
      <button class=&quot;toolbarButton zoomOut&quot; title=&quot;Zoom Out&quot; id=&quot;zoomOut&quot;></button>
      <button class=&quot;toolbarButton zoomIn&quot; title=&quot;Zoom In&quot; id=&quot;zoomIn&quot;></button>
    </footer>
  </div>
</template>
<script>
  //加载PDFJS
  import pdf from '../../../node_modules/pdfjs-dist/build/pdf.js';
  import pdfViewer from '../../../node_modules/pdfjs-dist/web/pdf_viewer.js';
  import Viewer from '../../assets/js/viewer';
  export default{
    data(){
      return{
        myPage:1,
      }
    },
    mounted(){
        const url = 'http://192.168.0.200:8080/media/avatar/fluent-python.pdf';
        Viewer.animationStartedPromise.then(function () {
          Viewer.open({
            url: url
          });
        });
    },
    methods:{
      goNextPage(){
          console.log('下一页的数据');
      }
    },
    watch:{
      myPage(newV,oldV){
          console.log(&quot;==================：&quot;,$('#pageNumber').val());
      }
    },
  }
</script>
<style scoped>
  @import &quot;../../assets/css/viewer.css&quot;;
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pdf-view-layout"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"viewerContainer"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"viewer"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pdfViewer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"loadingBar"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"progress"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"glimmer"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorWrapper"</span> <span class="hljs-attr">hidden</span>=<span class="hljs-string">"true"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorMessageLeft"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorMessage"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorShowMore"</span>&gt;</span>
          More Information
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorShowLess"</span>&gt;</span>
          Less Information
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorMessageRight"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorClose"</span>&gt;</span>
          Close
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clearBoth"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">textarea</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"errorMoreInfo"</span> <span class="hljs-attr">hidden</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">readonly</span>=<span class="hljs-string">"readonly"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbarButton pageUp"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Previous Page"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"previous"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"goNextPage()"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbarButton pageDown"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Next Page"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"next"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"number"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pageNumber"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbarField pageNumber"</span>  <span class="hljs-attr">size</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">min</span>=<span class="hljs-string">"1"</span> &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbarButton zoomOut"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Zoom Out"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"zoomOut"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"toolbarButton zoomIn"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Zoom In"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"zoomIn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-comment">//加载PDFJS</span>
  <span class="hljs-keyword">import</span> pdf <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../node_modules/pdfjs-dist/build/pdf.js'</span>;
  <span class="hljs-keyword">import</span> pdfViewer <span class="hljs-keyword">from</span> <span class="hljs-string">'../../../node_modules/pdfjs-dist/web/pdf_viewer.js'</span>;
  <span class="hljs-keyword">import</span> Viewer <span class="hljs-keyword">from</span> <span class="hljs-string">'../../assets/js/viewer'</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    data(){
      <span class="hljs-keyword">return</span>{
        <span class="hljs-attr">myPage</span>:<span class="hljs-number">1</span>,
      }
    },
    mounted(){
        <span class="hljs-keyword">const</span> url = <span class="hljs-string">'http://192.168.0.200:8080/media/avatar/fluent-python.pdf'</span>;
        Viewer.animationStartedPromise.then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
          Viewer.open({
            <span class="hljs-attr">url</span>: url
          });
        });
    },
    <span class="hljs-attr">methods</span>:{
      goNextPage(){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'下一页的数据'</span>);
      }
    },
    <span class="hljs-attr">watch</span>:{
      myPage(newV,oldV){
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"==================："</span>,$(<span class="hljs-string">'#pageNumber'</span>).val());
      }
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">import</span> <span class="hljs-string">"../../assets/css/viewer.css"</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>viewer.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the &quot;License&quot;);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an &quot;AS IS&quot; BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals PDFJS */

'use strict';

if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
  alert('Please build the pdfjs-dist library using\n' +
        '  `gulp dist-install`');
}

PDFJS.useOnlyCssZoom = true;
PDFJS.disableTextLayer = true;
PDFJS.maxImageSize = 1024 * 1024;
PDFJS.workerSrc = '../../../node_modules/pdfjs-dist/build/pdf.worker.js';
PDFJS.cMapUrl = '../../../node_modules/pdfjs-dist/cmaps/';
PDFJS.cMapPacked = true;
//需要加载的pdf的文件
// var DEFAULT_URL = 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf';
// var DEFAULT_URL = 'http://192.168.0.200:8080/media/avatar/fluent-python.pdf';
var DEFAULT_SCALE_DELTA = 1.0;
var MIN_SCALE = 0.25;
var MAX_SCALE = 100.0;
var DEFAULT_SCALE_VALUE = 'auto';

var PDFViewerApplication = {
  pdfLoadingTask: null,
  pdfDocument: null,
  pdfViewer: null,
  pdfHistory: null,
  pdfLinkService: null,

  /**
   * Opens PDF document specified by URL.
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
  open: function (params) {
    if (this.pdfLoadingTask) {
      // We need to destroy already opened document
      return this.close().then(function () {
        // ... and repeat the open() call.
        return this.open(params);
      }.bind(this));
    }

    var url = params.url;
    var self = this;
    this.setTitleUsingUrl(url);

    // Loading document.
    var loadingTask = PDFJS.getDocument(url);
    this.pdfLoadingTask = loadingTask;

    loadingTask.onProgress = function (progressData) {
      self.progress(progressData.loaded / progressData.total);
    };

    return loadingTask.promise.then(function (pdfDocument) {
      // Document loaded, specifying document for the viewer.
      self.pdfDocument = pdfDocument;
      self.pdfViewer.setDocument(pdfDocument);
      self.pdfLinkService.setDocument(pdfDocument);
      self.pdfHistory.initialize(pdfDocument.fingerprint);
      self.loadingBar.hide();
      self.setTitleUsingMetadata(pdfDocument);
    }, function (exception) {
      var message = exception &amp;&amp; exception.message;
      var l10n = self.l10n;
      var loadingErrorMessage;

      if (exception instanceof PDFJS.InvalidPDFException) {
        // change error message also for other builds
        loadingErrorMessage = l10n.get('invalid_file_error', null,
          'Invalid or corrupted PDF file.');
      } else if (exception instanceof PDFJS.MissingPDFException) {
        // special message for missing PDFs
        loadingErrorMessage = l10n.get('missing_file_error', null,
          'Missing PDF file.');
      } else if (exception instanceof PDFJS.UnexpectedResponseException) {
        loadingErrorMessage = l10n.get('unexpected_response_error', null,
          'Unexpected server response.');
      } else {
        loadingErrorMessage = l10n.get('loading_error', null,
          'An error occurred while loading the PDF.');
      }

      loadingErrorMessage.then(function (msg) {
        self.error(msg, {message: message});
      });
      self.loadingBar.hide();
    });
  },

  /**
   * Closes opened PDF document.
   * @returns {Promise} - Returns the promise, which is resolved when all
   *                      destruction is completed.
   */
  close: function () {
    var errorWrapper = document.getElementById('errorWrapper');
    errorWrapper.setAttribute('hidden', 'true');

    if (!this.pdfLoadingTask) {
      return Promise.resolve();
    }

    var promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;

    if (this.pdfDocument) {
      this.pdfDocument = null;

      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);
    }

    return promise;
  },

  get loadingBar() {
    var bar = new PDFJS.ProgressBar('#loadingBar', {});

    return PDFJS.shadow(this, 'loadingBar', bar);
  },

  setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
    this.url = url;
    var title = PDFJS.getFilenameFromUrl(url) || url;
    try {
      title = decodeURIComponent(title);
    } catch (e) {
      // decodeURIComponent may throw URIError,
      // fall back to using the unprocessed url in that case
    }
    this.setTitle(title);
  },

  setTitleUsingMetadata: function (pdfDocument) {
    var self = this;
    pdfDocument.getMetadata().then(function(data) {
      var info = data.info, metadata = data.metadata;
      self.documentInfo = info;
      self.metadata = metadata;

      // Provides some basic debug information
      console.log('PDF ' + pdfDocument.fingerprint + ' [' +
                  info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() +
                  ' / ' + (info.Creator || '-').trim() + ']' +
                  ' (PDF.js: ' + (PDFJS.version || '-') +
                  (!PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');

      var pdfTitle;
      if (metadata &amp;&amp; metadata.has('dc:title')) {
        var title = metadata.get('dc:title');
        // Ghostscript sometimes returns 'Untitled', so prevent setting the
        // title to 'Untitled.
        if (title !== 'Untitled') {
          pdfTitle = title;
        }
      }

      if (!pdfTitle &amp;&amp; info &amp;&amp; info['Title']) {
        pdfTitle = info['Title'];
      }

      if (pdfTitle) {
        self.setTitle(pdfTitle + ' - ' + document.title);
      }
    });
  },
  /**
   * 设置title标题
   * @param title
   */
  setTitle: function pdfViewSetTitle(title) {
    document.title = title;
    console.log(&quot;document.title:&quot;,document.title,document,document.getElementById('title').textContent);
    if(document.getElementById('title').textContent!==''){
      document.getElementById('title').textContent = title;
    }
  },

  error: function pdfViewError(message, moreInfo) {
    var l10n = this.l10n;
    var moreInfoText = [l10n.get('error_version_info',
      {version: PDFJS.version || '?', build: PDFJS.build || '?'},
      'PDF.js v"{{"version"}}" (build: "{{"build"}}")')];

    if (moreInfo) {
      moreInfoText.push(
        l10n.get('error_message', {message: moreInfo.message},
          'Message: "{{"message"}}"'));
      if (moreInfo.stack) {
        moreInfoText.push(
          l10n.get('error_stack', {stack: moreInfo.stack},
            'Stack: "{{"stack"}}"'));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(
            l10n.get('error_file', {file: moreInfo.filename},
              'File: "{{"file"}}"'));
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(
            l10n.get('error_line', {line: moreInfo.lineNumber},
              'Line: "{{"line"}}"'));
        }
      }
    }

    var errorWrapper = document.getElementById('errorWrapper');
    errorWrapper.removeAttribute('hidden');

    var errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;

    var closeButton = document.getElementById('errorClose');
    closeButton.onclick = function() {
      errorWrapper.setAttribute('hidden', 'true');
    };

    var errorMoreInfo = document.getElementById('errorMoreInfo');
    var moreInfoButton = document.getElementById('errorShowMore');
    var lessInfoButton = document.getElementById('errorShowLess');
    moreInfoButton.onclick = function() {
      errorMoreInfo.removeAttribute('hidden');
      moreInfoButton.setAttribute('hidden', 'true');
      lessInfoButton.removeAttribute('hidden');
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
    };
    lessInfoButton.onclick = function() {
      errorMoreInfo.setAttribute('hidden', 'true');
      moreInfoButton.removeAttribute('hidden');
      lessInfoButton.setAttribute('hidden', 'true');
    };
    moreInfoButton.removeAttribute('hidden');
    lessInfoButton.setAttribute('hidden', 'true');
    Promise.all(moreInfoText).then(function (parts) {
      errorMoreInfo.value = parts.join('\n');
    });
  },

  progress: function pdfViewProgress(level) {
    var percent = Math.round(level * 100);
    // Updating the bar if value increases.
    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
    }
  },

  get pagesCount() {
    return this.pdfDocument.numPages;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  zoomIn: function pdfViewZoomIn(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
    } while (--ticks &amp;&amp; newScale < MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },

  zoomOut: function pdfViewZoomOut(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
    } while (--ticks &amp;&amp; newScale > MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },

  initUI: function pdfViewInitUI() {
    var linkService = new PDFJS.PDFLinkService();
    this.pdfLinkService = linkService;

    this.l10n = PDFJS.NullL10n;

    var container = document.getElementById('viewerContainer');
    var pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: linkService,
      l10n: this.l10n,
    });
    this.pdfViewer = pdfViewer;
    linkService.setViewer(pdfViewer);

    this.pdfHistory = new PDFJS.PDFHistory({
      linkService: linkService
    });
    linkService.setHistory(this.pdfHistory);

    document.getElementById('previous').addEventListener('click', function() {
      PDFViewerApplication.page--;
    });

    document.getElementById('next').addEventListener('click', function() {
      PDFViewerApplication.page++;
    });

    document.getElementById('zoomIn').addEventListener('click', function() {
      PDFViewerApplication.zoomIn();
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
      PDFViewerApplication.zoomOut();
    });

    document.getElementById('pageNumber').addEventListener('click', function() {
      this.select();
    });

    document.getElementById('pageNumber').addEventListener('change',
        function() {
      PDFViewerApplication.page = (this.value | 0);

      // Ensure that the page number input displays the correct value, even if the
      // value entered by the user was invalid (e.g. a floating point number).
      if (this.value !== PDFViewerApplication.page.toString()) {
        this.value = PDFViewerApplication.page;
      }
    });

    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    });

    container.addEventListener('pagechange', function (evt) {
      var page = evt.pageNumber;
      var numPages = PDFViewerApplication.pagesCount;

      document.getElementById('pageNumber').value = page;
      document.getElementById('previous').disabled = (page <= 1);
      document.getElementById('next').disabled = (page >= numPages);
    }, true);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  PDFViewerApplication.initUI();
}, true);

(function animationStartedClosure() {
  // The offsetParent is not set until the PDF.js iframe or object is visible.
  // Waiting for first animation.
  PDFViewerApplication.animationStartedPromise = new Promise(
    function (resolve) {
      window.requestAnimationFrame(resolve);
    });
})();

/*// We need to delay opening until all HTML is loaded.
PDFViewerApplication.animationStartedPromise.then(function () {
  PDFViewerApplication.open({
    url: DEFAULT_URL
  });
});*/
export default PDFViewerApplication;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* globals PDFJS */

'use strict';

if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
  alert('Please build the pdfjs-dist library using\n' +
        '  `gulp dist-install`');
}

PDFJS.useOnlyCssZoom = true;
PDFJS.disableTextLayer = true;
PDFJS.maxImageSize = 1024 * 1024;
PDFJS.workerSrc = '../../../node_modules/pdfjs-dist/build/pdf.worker.js';
PDFJS.cMapUrl = '../../../node_modules/pdfjs-dist/cmaps/';
PDFJS.cMapPacked = true;
//需要加载的pdf的文件
// var DEFAULT_URL = 'https://cdn.rawgit.com/mozilla/pdf.js/c6e8ca86/test/pdfs/calrgb.pdf';
// var DEFAULT_URL = 'http://192.168.0.200:8080/media/avatar/fluent-python.pdf';
var DEFAULT_SCALE_DELTA = 1.0;
var MIN_SCALE = 0.25;
var MAX_SCALE = 100.0;
var DEFAULT_SCALE_VALUE = 'auto';

var PDFViewerApplication = {
  pdfLoadingTask: null,
  pdfDocument: null,
  pdfViewer: null,
  pdfHistory: null,
  pdfLinkService: null,

  /**
   * Opens PDF document specified by URL.
   * @returns {Promise} - Returns the promise, which is resolved when document
   *                      is opened.
   */
  open: function (params) {
    if (this.pdfLoadingTask) {
      // We need to destroy already opened document
      return this.close().then(function () {
        // ... and repeat the open() call.
        return this.open(params);
      }.bind(this));
    }

    var url = params.url;
    var self = this;
    this.setTitleUsingUrl(url);

    // Loading document.
    var loadingTask = PDFJS.getDocument(url);
    this.pdfLoadingTask = loadingTask;

    loadingTask.onProgress = function (progressData) {
      self.progress(progressData.loaded / progressData.total);
    };

    return loadingTask.promise.then(function (pdfDocument) {
      // Document loaded, specifying document for the viewer.
      self.pdfDocument = pdfDocument;
      self.pdfViewer.setDocument(pdfDocument);
      self.pdfLinkService.setDocument(pdfDocument);
      self.pdfHistory.initialize(pdfDocument.fingerprint);
      self.loadingBar.hide();
      self.setTitleUsingMetadata(pdfDocument);
    }, function (exception) {
      var message = exception &amp;&amp; exception.message;
      var l10n = self.l10n;
      var loadingErrorMessage;

      if (exception instanceof PDFJS.InvalidPDFException) {
        // change error message also for other builds
        loadingErrorMessage = l10n.get('invalid_file_error', null,
          'Invalid or corrupted PDF file.');
      } else if (exception instanceof PDFJS.MissingPDFException) {
        // special message for missing PDFs
        loadingErrorMessage = l10n.get('missing_file_error', null,
          'Missing PDF file.');
      } else if (exception instanceof PDFJS.UnexpectedResponseException) {
        loadingErrorMessage = l10n.get('unexpected_response_error', null,
          'Unexpected server response.');
      } else {
        loadingErrorMessage = l10n.get('loading_error', null,
          'An error occurred while loading the PDF.');
      }

      loadingErrorMessage.then(function (msg) {
        self.error(msg, {message: message});
      });
      self.loadingBar.hide();
    });
  },

  /**
   * Closes opened PDF document.
   * @returns {Promise} - Returns the promise, which is resolved when all
   *                      destruction is completed.
   */
  close: function () {
    var errorWrapper = document.getElementById('errorWrapper');
    errorWrapper.setAttribute('hidden', 'true');

    if (!this.pdfLoadingTask) {
      return Promise.resolve();
    }

    var promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;

    if (this.pdfDocument) {
      this.pdfDocument = null;

      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);
    }

    return promise;
  },

  get loadingBar() {
    var bar = new PDFJS.ProgressBar('#loadingBar', {});

    return PDFJS.shadow(this, 'loadingBar', bar);
  },

  setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
    this.url = url;
    var title = PDFJS.getFilenameFromUrl(url) || url;
    try {
      title = decodeURIComponent(title);
    } catch (e) {
      // decodeURIComponent may throw URIError,
      // fall back to using the unprocessed url in that case
    }
    this.setTitle(title);
  },

  setTitleUsingMetadata: function (pdfDocument) {
    var self = this;
    pdfDocument.getMetadata().then(function(data) {
      var info = data.info, metadata = data.metadata;
      self.documentInfo = info;
      self.metadata = metadata;

      // Provides some basic debug information
      console.log('PDF ' + pdfDocument.fingerprint + ' [' +
                  info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() +
                  ' / ' + (info.Creator || '-').trim() + ']' +
                  ' (PDF.js: ' + (PDFJS.version || '-') +
                  (!PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');

      var pdfTitle;
      if (metadata &amp;&amp; metadata.has('dc:title')) {
        var title = metadata.get('dc:title');
        // Ghostscript sometimes returns 'Untitled', so prevent setting the
        // title to 'Untitled.
        if (title !== 'Untitled') {
          pdfTitle = title;
        }
      }

      if (!pdfTitle &amp;&amp; info &amp;&amp; info['Title']) {
        pdfTitle = info['Title'];
      }

      if (pdfTitle) {
        self.setTitle(pdfTitle + ' - ' + document.title);
      }
    });
  },
  /**
   * 设置title标题
   * @param title
   */
  setTitle: function pdfViewSetTitle(title) {
    document.title = title;
    console.log("document.title:",document.title,document,document.getElementById('title').textContent);
    if(document.getElementById('title').textContent!==''){
      document.getElementById('title').textContent = title;
    }
  },

  error: function pdfViewError(message, moreInfo) {
    var l10n = this.l10n;
    var moreInfoText = [l10n.get('error_version_info',
      {version: PDFJS.version || '?', build: PDFJS.build || '?'},
      'PDF.js v"{{"version"}}" (build: "{{"build"}}")')];

    if (moreInfo) {
      moreInfoText.push(
        l10n.get('error_message', {message: moreInfo.message},
          'Message: "{{"message"}}"'));
      if (moreInfo.stack) {
        moreInfoText.push(
          l10n.get('error_stack', {stack: moreInfo.stack},
            'Stack: "{{"stack"}}"'));
      } else {
        if (moreInfo.filename) {
          moreInfoText.push(
            l10n.get('error_file', {file: moreInfo.filename},
              'File: "{{"file"}}"'));
        }
        if (moreInfo.lineNumber) {
          moreInfoText.push(
            l10n.get('error_line', {line: moreInfo.lineNumber},
              'Line: "{{"line"}}"'));
        }
      }
    }

    var errorWrapper = document.getElementById('errorWrapper');
    errorWrapper.removeAttribute('hidden');

    var errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;

    var closeButton = document.getElementById('errorClose');
    closeButton.onclick = function() {
      errorWrapper.setAttribute('hidden', 'true');
    };

    var errorMoreInfo = document.getElementById('errorMoreInfo');
    var moreInfoButton = document.getElementById('errorShowMore');
    var lessInfoButton = document.getElementById('errorShowLess');
    moreInfoButton.onclick = function() {
      errorMoreInfo.removeAttribute('hidden');
      moreInfoButton.setAttribute('hidden', 'true');
      lessInfoButton.removeAttribute('hidden');
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
    };
    lessInfoButton.onclick = function() {
      errorMoreInfo.setAttribute('hidden', 'true');
      moreInfoButton.removeAttribute('hidden');
      lessInfoButton.setAttribute('hidden', 'true');
    };
    moreInfoButton.removeAttribute('hidden');
    lessInfoButton.setAttribute('hidden', 'true');
    Promise.all(moreInfoText).then(function (parts) {
      errorMoreInfo.value = parts.join('\n');
    });
  },

  progress: function pdfViewProgress(level) {
    var percent = Math.round(level * 100);
    // Updating the bar if value increases.
    if (percent &gt; this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
    }
  },

  get pagesCount() {
    return this.pdfDocument.numPages;
  },

  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },

  get page() {
    return this.pdfViewer.currentPageNumber;
  },

  zoomIn: function pdfViewZoomIn(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(MAX_SCALE, newScale);
    } while (--ticks &amp;&amp; newScale &lt; MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },

  zoomOut: function pdfViewZoomOut(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(MIN_SCALE, newScale);
    } while (--ticks &amp;&amp; newScale &gt; MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },

  initUI: function pdfViewInitUI() {
    var linkService = new PDFJS.PDFLinkService();
    this.pdfLinkService = linkService;

    this.l10n = PDFJS.NullL10n;

    var container = document.getElementById('viewerContainer');
    var pdfViewer = new PDFJS.PDFViewer({
      container: container,
      linkService: linkService,
      l10n: this.l10n,
    });
    this.pdfViewer = pdfViewer;
    linkService.setViewer(pdfViewer);

    this.pdfHistory = new PDFJS.PDFHistory({
      linkService: linkService
    });
    linkService.setHistory(this.pdfHistory);

    document.getElementById('previous').addEventListener('click', function() {
      PDFViewerApplication.page--;
    });

    document.getElementById('next').addEventListener('click', function() {
      PDFViewerApplication.page++;
    });

    document.getElementById('zoomIn').addEventListener('click', function() {
      PDFViewerApplication.zoomIn();
    });

    document.getElementById('zoomOut').addEventListener('click', function() {
      PDFViewerApplication.zoomOut();
    });

    document.getElementById('pageNumber').addEventListener('click', function() {
      this.select();
    });

    document.getElementById('pageNumber').addEventListener('change',
        function() {
      PDFViewerApplication.page = (this.value | 0);

      // Ensure that the page number input displays the correct value, even if the
      // value entered by the user was invalid (e.g. a floating point number).
      if (this.value !== PDFViewerApplication.page.toString()) {
        this.value = PDFViewerApplication.page;
      }
    });

    container.addEventListener('pagesinit', function () {
      // We can use pdfViewer now, e.g. let's change default scale.
      pdfViewer.currentScaleValue = DEFAULT_SCALE_VALUE;
    });

    container.addEventListener('pagechange', function (evt) {
      var page = evt.pageNumber;
      var numPages = PDFViewerApplication.pagesCount;

      document.getElementById('pageNumber').value = page;
      document.getElementById('previous').disabled = (page &lt;= 1);
      document.getElementById('next').disabled = (page &gt;= numPages);
    }, true);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  PDFViewerApplication.initUI();
}, true);

(function animationStartedClosure() {
  // The offsetParent is not set until the PDF.js iframe or object is visible.
  // Waiting for first animation.
  PDFViewerApplication.animationStartedPromise = new Promise(
    function (resolve) {
      window.requestAnimationFrame(resolve);
    });
})();

/*// We need to delay opening until all HTML is loaded.
PDFViewerApplication.animationStartedPromise.then(function () {
  PDFViewerApplication.open({
    url: DEFAULT_URL
  });
});*/
export default PDFViewerApplication;
</code></pre>
<h2 id="articleHeader41">VueJs防止页面出现闪烁的情况</h2>
<ul><li>
<p>v-cloak指令</p>
<ul><li><p><a href="http://cn.vuejs.org/v2/api/#v-cloak" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/v2/api/#v...</a></p></li></ul>
</li></ul>
<h2 id="articleHeader42">处理TextArea自动随文本高度自适应高度</h2>
<ul><li><p><a href="https://github.com/jackmoore/autosize" rel="nofollow noreferrer" target="_blank">https://github.com/jackmoore/...</a></p></li></ul>
<h2 id="articleHeader43">PC端与移动端中option的宽度问题</h2>
<h2 id="articleHeader44">搜索布局的问题----子组件去解决</h2>
<ul><li><p>路由切换(tab切换)实现不同的布局</p></li></ul>
<h2 id="articleHeader45">VueJs NextTick的妙用</h2>
<ul><li><p><a href="https://segmentfault.com/a/1190000008570874">https://segmentfault.com/a/11...</a></p></li></ul>
<h2 id="articleHeader46">回到原来的滚动位置以及回到顶部(待完善)</h2>
<ul>
<li><p>当路处于离开状态的时候，存储滚动的位置</p></li>
<li><p>当路由处于进入状态的时候，取出滚动位置进行判断，来显示或隐藏“返回顶部”的按钮</p></li>
</ul>
<h2 id="articleHeader47">VueJs自动化测试</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000006001008" target="_blank">https://segmentfault.com/a/11...</a></p></li>
<li><p><a href="https://github.com/ccforward/cc/issues/58" rel="nofollow noreferrer" target="_blank">https://github.com/ccforward/...</a></p></li>
</ul>
<h2 id="articleHeader48">Web App中一行文字显示不下，左边用...表示</h2>
<ul><li><p><a href="https://segmentfault.com/q/1010000003745442">https://segmentfault.com/q/10...</a></p></li></ul>
<h2 id="articleHeader49">刷新当前页面</h2>
<ul><li><p>this.$router.go(0);</p></li></ul>
<h2 id="articleHeader50">VueJs打包优化</h2>
<ul><li><p><a href="https://www.zhihu.com/question/40462715?sort=created" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p></li></ul>
<h2 id="articleHeader51">WebPack中静态资源url的配置</h2>
<ul><li><p><a href="http://www.cnblogs.com/chengdabelief/p/7018880.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/chengd...</a></p></li></ul>
<h2 id="articleHeader52">Vue-Cli webpack配置</h2>
<ul><li><p><a href="http://www.tuicool.com/articles/QjaqEfR" rel="nofollow noreferrer" target="_blank">http://www.tuicool.com/articl...</a></p></li></ul>
<h2 id="articleHeader53">移动端富文本框的集成</h2>
<ul>
<li><p><a href="https://quilljs.com/playground/" rel="nofollow noreferrer" target="_blank">https://quilljs.com/playground/</a></p></li>
<li><p>vue-html5-editor</p></li>
</ul>
<h2 id="articleHeader54">Vue-Router中push与replace的区别与联系</h2>
<ul><li><p><a href="https://segmentfault.com/q/1010000009878770">https://segmentfault.com/q/10...</a></p></li></ul>
<h2 id="articleHeader55">VueJs富文本框(发帖功能)</h2>
<ul>
<li><p><strong>移动端:<a href="https://github.com/surmon-china/vue-quill-editor/strong" rel="nofollow noreferrer" target="_blank">https://github.com/surmon-chi...</a></strong></p></li>
<li><p><a href="https://github.com/PeakTai/vue-html5-editor/issues/80" rel="nofollow noreferrer" target="_blank">https://github.com/PeakTai/vu...</a></p></li>
</ul>
<h2 id="articleHeader56">div设置了contentEditable属性。android上正常，IOS上出现问题</h2>
<ul>
<li><p>使用div来模拟input或者textarea来进行内容输入的操作，实现富文本框的功能</p></li>
<li>
<p>遇到问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    加入style=&quot;-webkit-user-select: auto&quot;就能出现光标和编辑了
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    加入<span class="hljs-built_in">style</span>=<span class="hljs-string">"-webkit-user-select: auto"</span>就能出现光标和编辑了
</code></pre>
</li>
</ul>
<h2 id="articleHeader57">Vuejs-Cordova-Framework-Webapp</h2>
<ul>
<li><p><a href="http://blog.gxxsite.com/vuejs-cordova-framework-webapp-advance-note/" rel="nofollow noreferrer" target="_blank">http://blog.gxxsite.com/vuejs...</a></p></li>
<li><p>vue-cordova</p></li>
</ul>
<h2 id="articleHeader58">Css-Scroller(效果图,暂时不用在项目中)</h2>
<ul><li><p><a href="https://github.com/xiaoluoboding/vue-stroll" rel="nofollow noreferrer" target="_blank">https://github.com/xiaoluobod...</a></p></li></ul>
<h2 id="articleHeader59">Scroll开源库实现列表滚动动画</h2>
<ul><li><p><a href="https://github.com/hakimel/stroll.js" rel="nofollow noreferrer" target="_blank">https://github.com/hakimel/st...</a></p></li></ul>
<h2 id="articleHeader60">H5控制禁止横屏</h2>
<ul><li><p><a href="http://www.jianshu.com/p/9c3264f4a405" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/9c32...</a></p></li></ul>
<h2 id="articleHeader61">文件上传(do not)</h2>
<ul><li><p><a href="https://github.com/marchFantasy/vue-file-upload" rel="nofollow noreferrer" target="_blank">https://github.com/marchFanta...</a></p></li></ul>
<h2 id="articleHeader62">window.open被拦截问题(完成)</h2>
<ul><li><p>通过借用a标签并产生随机的target去实现</p></li></ul>
<p>`</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="                s4() {
                  return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
                },
                JsGuid() {
                return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                  this.s4() + '-' + this.s4() + this.s4() + this.s4();
                },
        
                 newWin(url, id,target) {
                  let a = document.createElement('a');
                  a.setAttribute('href', url);
                  a.setAttribute('target', target);
                  a.setAttribute('id', id);
                  // 防止反复添加
                  if(!document.getElementById(id)) {
                    document.body.appendChild(a);
                  }
                  a.click();
                }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>                s4() {
                  <span class="hljs-keyword">return</span> Math.floor((<span class="hljs-number">1</span> + Math.random()) * <span class="hljs-number">0x10000</span>)
                  .toString(<span class="hljs-number">16</span>)
                  .substring(<span class="hljs-number">1</span>);
                },
                JsGuid() {
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.s4() + <span class="hljs-keyword">this</span>.s4() + <span class="hljs-string">'-'</span> + <span class="hljs-keyword">this</span>.s4() + <span class="hljs-string">'-'</span> + <span class="hljs-keyword">this</span>.s4() + <span class="hljs-string">'-'</span> +
                  <span class="hljs-keyword">this</span>.s4() + <span class="hljs-string">'-'</span> + <span class="hljs-keyword">this</span>.s4() + <span class="hljs-keyword">this</span>.s4() + <span class="hljs-keyword">this</span>.s4();
                },
        
                 newWin(url, id,target) {
                  let a = document.createElement(<span class="hljs-string">'a'</span>);
                  a.setAttribute(<span class="hljs-string">'href'</span>, url);
                  a.setAttribute(<span class="hljs-string">'target'</span>, target);
                  a.setAttribute(<span class="hljs-string">'id'</span>, id);
                  <span class="hljs-comment">// 防止反复添加</span>
                  <span class="hljs-keyword">if</span>(!document.getElementById(id)) {
                    document.body.appendChild(a);
                  }
                  a.click();
                },</code></pre>
<p>`</p>
<ul><li>
<p>调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    this.newWin(localStorage.getItem('url'),&quot;dow&quot;,&quot;csa&quot;+this.JsGuid());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">new</span><span class="hljs-type">Win</span>(localStorage.getItem(<span class="hljs-string">'url'</span>),<span class="hljs-string">"dow"</span>,<span class="hljs-string">"csa"</span>+<span class="hljs-built_in">this</span>.JsGuid());
</code></pre>
</li></ul>
<h2 id="articleHeader63">log工具类(便于在开发过程中进行调试打印),在上线后将所有log信息隐藏</h2>
<ul><li>
<p>code</p>
<p>/**</p>
<ul>
<li><p>Created by THINK on 2017/7/3.</p></li>
<li><p>日志工具类：开发阶段将flag设置为true(可以看见log),上线后将flag设置为false(看不见log)</p></li>
<li><p>@author:darkCode</p></li>
<li><p>@description:it is a logcat tool,you can use it see all logs you want to see conveniently when developing,and you can hide all logs by set the value of flag is false in this instance when producting<br>*/</p></li>
</ul>
<p>let logUtil = {<br>  flag:true,<br>  printLog(...items){</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if(this.flag){
  console.log(items);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">if</span>(this.<span class="hljs-built_in">flag</span>){
  console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">items</span>);
}</code></pre>
<p>}<br>}<br>export default logUtil</p>
</li></ul>
<h2 id="articleHeader64">修复上拉刷新，下拉加载</h2>
<ul><li><p>vue-scroller(自动地去进行了加载更多(bug))</p></li></ul>
<h2 id="articleHeader65">对项目进行优化性的操作</h2>
<ul>
<li><p>代码复用</p></li>
<li><p>资源的处理</p></li>
</ul>
<h2 id="articleHeader66">安卓模拟器测试</h2>
<ul><li><p>安装问题：进入Bios系统设置硬件虚拟化</p></li></ul>
<p>虚拟化技术的可以在BIOS中开启，开启方法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　　1、进入BIOS。开机时按F2或F12或DEL或ESC等键(各电脑有所不同)。
　　2、进入BIOS后，找到Configuration选项，选择Intel Virtual Technology并回车，将光标移至Enabled，然后再回车，最后按F10保存并退出。
　　如果找不到Configuration选项，可以试试下面的方法：
　　(1)某些HP(惠普)电脑进入BIOS后，需要选择SystemConfiguration(系统配置)菜单，然后选择Device Configuration(设备配置)，找到Virtualization Technology，设置为Enabled。
　　(2)某些联想Thinkpad电脑进入BIOS后，需要选择Security菜单，然后选择Virtualization，设置为Enabled。
　　(3)某些DELL(戴尔)电脑进入BIOS后，需要选择Processor Settings菜单，然后选择VirtualizationTechnology，设置为Enabled。
　　虚拟化在1960年为了描述虚拟机(实验性的IBM M44/44X系统)这个概念被第一次提出。对虚拟机的架设和管理被称为平台虚拟化，现在也被称为服务器虚拟化。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>　　<span class="hljs-selector-tag">1</span>、进入<span class="hljs-selector-tag">BIOS</span>。开机时按<span class="hljs-selector-tag">F2</span>或<span class="hljs-selector-tag">F12</span>或<span class="hljs-selector-tag">DEL</span>或<span class="hljs-selector-tag">ESC</span>等键(各电脑有所不同)。
　　<span class="hljs-selector-tag">2</span>、进入<span class="hljs-selector-tag">BIOS</span>后，找到<span class="hljs-selector-tag">Configuration</span>选项，选择<span class="hljs-selector-tag">Intel</span> <span class="hljs-selector-tag">Virtual</span> <span class="hljs-selector-tag">Technology</span>并回车，将光标移至<span class="hljs-selector-tag">Enabled</span>，然后再回车，最后按<span class="hljs-selector-tag">F10</span>保存并退出。
　　如果找不到<span class="hljs-selector-tag">Configuration</span>选项，可以试试下面的方法：
　　(<span class="hljs-number">1</span>)某些<span class="hljs-selector-tag">HP</span>(惠普)电脑进入<span class="hljs-selector-tag">BIOS</span>后，需要选择<span class="hljs-selector-tag">SystemConfiguration</span>(系统配置)菜单，然后选择<span class="hljs-selector-tag">Device</span> <span class="hljs-selector-tag">Configuration</span>(设备配置)，找到<span class="hljs-selector-tag">Virtualization</span> <span class="hljs-selector-tag">Technology</span>，设置为<span class="hljs-selector-tag">Enabled</span>。
　　(<span class="hljs-number">2</span>)某些联想<span class="hljs-selector-tag">Thinkpad</span>电脑进入<span class="hljs-selector-tag">BIOS</span>后，需要选择<span class="hljs-selector-tag">Security</span>菜单，然后选择<span class="hljs-selector-tag">Virtualization</span>，设置为<span class="hljs-selector-tag">Enabled</span>。
　　(<span class="hljs-number">3</span>)某些<span class="hljs-selector-tag">DELL</span>(戴尔)电脑进入<span class="hljs-selector-tag">BIOS</span>后，需要选择<span class="hljs-selector-tag">Processor</span> <span class="hljs-selector-tag">Settings</span>菜单，然后选择<span class="hljs-selector-tag">VirtualizationTechnology</span>，设置为<span class="hljs-selector-tag">Enabled</span>。
　　虚拟化在<span class="hljs-selector-tag">1960</span>年为了描述虚拟机(实验性的IBM M44/<span class="hljs-number">44</span>X系统)这个概念被第一次提出。对虚拟机的架设和管理被称为平台虚拟化，现在也被称为服务器虚拟化。
</code></pre>
<h2 id="articleHeader67">将业务逻辑代码与三方代码分开进行打包</h2>
<ul>
<li><p>在entry入口中配置，如分离jQuery</p></li>
<li>
<p>使用vue-cli打包后默认生产三个js文件</p>
<ul>
<li><p>app.43fcdsfcafds.js:项目中你编写的业务逻辑的代码</p></li>
<li><p>vender.20deewdew32eed.js:通过npm install下载依赖的js,css代码(node_modules目录下)</p></li>
<li><p>manifest.4cbcd0f5d52237fb29b0.js:缓存检测文件，每次打包，通过该文件进行版本的检测</p></li>
</ul>
</li>
<li><p>将生产环境与开发环境中的资源打包使用<br>vender:3.34m app:1.26m，怎么去减少它们的体积</p></li>
<li><p>vender.xsaxsxx.js.map文件的作用</p></li>
</ul>
<p>source map文件是js文件压缩后，文件的变量名替换对应、变量所在位置等元信息数据文件，一般这种文件和min.js主文件放在同一个目录下。 比如压缩后原变量是map，压缩后通过变量替换规则可能会被替换成a，这时source map文件会记录下这个mapping的信息，这样的好处就是说，在调试的时候，如果有一些JS报错，那么浏览器会通过解析这个map文件来重新merge压缩后的js,使开发者可以用未压缩前的代码来调试，这样会给我们带来很大的方便！</p>
<h2 id="articleHeader68">文件的按需加载(搞定)---项目优化的一大步</h2>
<ul>
<li>
<p>根据vue的路由去按需加载组件</p>
<ul><li><p><a href="http://www.cnblogs.com/Nutrient-rich/p/7057853.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/Nutrie...</a></p></li></ul>
</li>
<li><p>vue组件的按需加载:解决了打包过后app.xscs3243rcds.js文件过大的缺点</p></li>
<li><p>进一步优化(三方不太动的js文件,通过cdn去加载)</p></li>
<li><p>引用相同的模块，打包后出现重复的资源,将三方的单独进行打包</p></li>
</ul>
<h2 id="articleHeader69">WebPack代码分割</h2>
<ul><li><p><a href="https://zhuanlan.zhihu.com/p/26710831" rel="nofollow noreferrer" target="_blank">https://zhuanlan.zhihu.com/p/...</a></p></li></ul>
<h2 id="articleHeader70">WebPack中文网</h2>
<ul><li><p><a href="https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-chunk" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p></li></ul>
<h2 id="articleHeader71">VueJs Seo(Nuxt.js)</h2>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007933349">https://segmentfault.com/a/11...</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000008477568" target="_blank">https://segmentfault.com/q/10...</a></p></li>
</ul>
<h2 id="articleHeader72">WeChat微信分享</h2>
<ul>
<li><p><a href="http://blog.csdn.net/rj0902/article/details/62427722" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/rj0902/a...</a></p></li>
<li><p><a href="http://blog.csdn.net/kexiuyi/article/details/52463879" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/kexiuyi/...</a></p></li>
<li><p><a href="http://blog.csdn.net/u013292160/article/details/51915518" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u0132921...</a></p></li>
<li><p><a href="http://www.jb51.net/article/116844.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/1...</a></p></li>
<li><p><a href="http://www.cnblogs.com/mingxinice/p/mingxin.html(so" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/mingxi...</a> cool)</p></li>
<li>
<p>微信网页授权</p>
<ul><li><p><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421140842" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki...</a></p></li></ul>
</li>
</ul>
<h2 id="articleHeader73">Vue-Cli中引入weixin-js-sdk</h2>
<ul>
<li><p><a href="https://www.npmjs.com/package/weixin-js-sdk" rel="nofollow noreferrer" target="_blank">https://www.npmjs.com/package...</a></p></li>
<li>
<p>苹果手机上设置分享的title的问题</p>
<ul><li><p><a href="https://www.deboy.cn/set-wechat-title-in-vuejs-spa.html" rel="nofollow noreferrer" target="_blank">https://www.deboy.cn/set-wech...</a></p></li></ul>
</li>
<li>
<p>微信分享</p>
<ul><li><p><a href="https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115" rel="nofollow noreferrer" target="_blank">https://mp.weixin.qq.com/wiki?t=resource/res_main&amp;id=mp1421141115</a></p></li></ul>
</li>
<li><p>问题1：判断是否是微信浏览器打开应用，是，需要动态去设置帖子详情页的分享界面</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     isWeiXin(){
        //判断是否是微信浏览器
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
          return true;
        } else {
          return false;
        }
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>     isWeiXin(){
        <span class="hljs-comment">//判断是否是微信浏览器</span>
        <span class="hljs-keyword">let</span> ua = <span class="hljs-built_in">window</span>.navigator.userAgent.toLowerCase();
        <span class="hljs-keyword">if</span> (ua.match(<span class="hljs-regexp">/MicroMessenger/i</span>) === <span class="hljs-string">'micromessenger'</span>) {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
      },</code></pre>
<ul>
<li>
<p>分享实现流程</p>
<ul>
<li><p>①安装微信sdk npm install weixin-js-sdk --save-dev</p></li>
<li><p>②通过import或者require的方式将其引入到需要的组件中</p></li>
<li><p>③获取签名相关的信息</p></li>
<li>
<p>④通过config接口注入权限验证配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" wx.config({
debug: true, 
appId: '', // 必填，公众号的唯一标识
timestamp: , // 必填，生成签名的时间戳
nonceStr: '', // 必填，生成签名的随机串
signature: '',// 必填，签名，见附录1
jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code> wx.config({
<span class="hljs-string">debug:</span> <span class="hljs-literal">true</span>, 
<span class="hljs-string">appId:</span> <span class="hljs-string">''</span>, <span class="hljs-comment">// 必填，公众号的唯一标识</span>
<span class="hljs-string">timestamp:</span> , <span class="hljs-comment">// 必填，生成签名的时间戳</span>
<span class="hljs-string">nonceStr:</span> <span class="hljs-string">''</span>, <span class="hljs-comment">// 必填，生成签名的随机串</span>
<span class="hljs-string">signature:</span> <span class="hljs-string">''</span>,<span class="hljs-comment">// 必填，签名，见附录1</span>
<span class="hljs-string">jsApiList:</span> [] <span class="hljs-comment">// 必填，需要使用的JS接口列表，所有JS接口列表见附录2</span>
});
</code></pre>
</li>
<li>
<p>⑤通过ready接口处理成功验证</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    wx.ready(function(){
// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //进行分享的操作
         //分享到朋友圈
          wx.onMenuShareTimeline({
            title: '测试信息', // 分享标题
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到朋友圈成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享到朋友圈返回的信息为:&quot;,res);
            }
          });
          //分享给朋友
          wx.onMenuShareAppMessage({
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享给朋友成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享给朋友返回的信息为:&quot;,res);
            }
          });
          //分享到QQ
          wx.onMenuShareQQ({
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接
            imgUrl: '', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到QQ好友成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享给QQ好友返回的信息为:&quot;,res);
            }
          });
          //分享到QQ空间
          wx.onMenuShareQZone({
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接
            imgUrl: '', // 分享图标
            success: function (res) {
              // 用户确认分享后执行的回调函数
              logUtil.printLog(&quot;分享到QQ空间成功返回的信息为:&quot;,res);
            },
            cancel: function (res) {
              // 用户取消分享后执行的回调函数
              logUtil.printLog(&quot;取消分享到QQ空间返回的信息为:&quot;,res);
            }
          });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>    <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.ready</span>(function(){
<span class="hljs-comment">// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。</span>
        <span class="hljs-comment">//进行分享的操作</span>
         <span class="hljs-comment">//分享到朋友圈</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareTimeline</span>({
            <span class="hljs-attribute">title</span>: <span class="hljs-string">'测试信息'</span>, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">link</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            <span class="hljs-attribute">imgUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到朋友圈成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享到朋友圈返回的信息为:"</span>,res);
            }
          });
          <span class="hljs-comment">//分享给朋友</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareAppMessage</span>({
            <span class="hljs-attribute">title</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致</span>
            <span class="hljs-attribute">imgUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">type</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享类型,music、video或link，不填默认为link</span>
            <span class="hljs-attribute">dataUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 如果type是music或video，则要提供数据链接，默认为空</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享给朋友成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享给朋友返回的信息为:"</span>,res);
            }
          });
          <span class="hljs-comment">//分享到QQ</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareQQ</span>({
            <span class="hljs-attribute">title</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享链接</span>
            <span class="hljs-attribute">imgUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到QQ好友成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享给QQ好友返回的信息为:"</span>,res);
            }
          });
          <span class="hljs-comment">//分享到QQ空间</span>
          <span class="hljs-selector-tag">wx</span><span class="hljs-selector-class">.onMenuShareQZone</span>({
            <span class="hljs-attribute">title</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享标题</span>
            <span class="hljs-attribute">desc</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享描述</span>
            <span class="hljs-attribute">link</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享链接</span>
            <span class="hljs-attribute">imgUrl</span>: <span class="hljs-string">''</span>, <span class="hljs-comment">// 分享图标</span>
            <span class="hljs-attribute">success</span>: function (res) {
              <span class="hljs-comment">// 用户确认分享后执行的回调函数</span>
              logUtil.printLog(<span class="hljs-string">"分享到QQ空间成功返回的信息为:"</span>,res);
            },
            <span class="hljs-attribute">cancel</span>: function (res) {
              <span class="hljs-comment">// 用户取消分享后执行的回调函数</span>
              <span class="hljs-selector-tag">logUtil</span><span class="hljs-selector-class">.printLog</span>(<span class="hljs-string">"取消分享到QQ空间返回的信息为:"</span>,res);
            }
          });
});
</code></pre>
</li>
<li>
<p>⑥通过error接口处理失败验证</p>
<ul><li><p>wx.error(function(res){<br>// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。</p></li></ul>
</li>
</ul>
<p>});</p>
</li>
<li><p>签名由:noncestr(签名随机字符串,随便写)、jsapi_ticket(票据)、timestamp(时间戳)、url(必须全部小写)等组成</p></li>
<li>
<p>获取access_token</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="请求接口:https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&amp;appid=你的appid&amp;secret=你的secret
请求方法: get
返回结果: access_token (有效期7200秒，必须在服务端缓存) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>请求接口<span class="hljs-symbol">:https</span><span class="hljs-symbol">://api</span>.weixin.qq.com/cgi-bin/token?grant_type=client_credential&amp;appid=你的appid&amp;secret=你的secret
请求方法: get
返回结果: access_token (有效期<span class="hljs-number">7200</span>秒，必须在服务端缓存) </code></pre>
</li>
<li>
<p>获取票据jsapi_ticket</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="请求接口:https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=上一步中获取的access_token&amp;type=jsapi
请求方法: get,
type: JSON,
返回结果: jsapi_ticket (有效期7200秒，必须在服务端缓存)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>请求接口:http<span class="hljs-variable">s:</span>//api.weixin.qq.<span class="hljs-keyword">com</span>/cgi-bin/ticket/getticket?access_token=上一步中获取的access_token&amp;<span class="hljs-built_in">type</span>=jsapi
请求方法: <span class="hljs-built_in">get</span>,
<span class="hljs-built_in">type</span>: JSON,
返回结果: jsapi_ticket (有效期<span class="hljs-number">7200</span>秒，必须在服务端缓存)</code></pre>
</li>
<li>
<p>生成时间戳（timestamp）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 时间戳产生函数
var timeStamp = function () {
    return parseInt(new Date().getTime() / 1000) + '';
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 时间戳产生函数</span>
<span class="hljs-keyword">var</span> timeStamp = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">parseInt</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().getTime() / <span class="hljs-number">1000</span>) + <span class="hljs-string">''</span>;
};
</code></pre>
</li>
<li><p>签名算法（可以参考官方给出的demo:<a href="https://github.com/arronf2e/jssdk_simple" rel="nofollow noreferrer" target="_blank">https://github.com/arronf2e/j...</a>）</p></li>
</ul>
<p>比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        var calcSignature =function(ticket,nonceStr,timeStamp,url) {
            var result = {
                jsapi_ticket: ticket,
                nonceStr: nonceStr,
                timestamp: timeStamp,
                url: url,
            }
            var str = 'jsapi_ticket=' + ticket + '&amp;noncestr=' + nonceStr + '&amp;timestamp=' + timeStamp + '&amp;url=' + url;
            // 对str使用sha1签名，得到signature，这里使用jsSHA模块，需install
            shaObj = new jsSHA(str, 'TEXT');
            result.signature = shaObj.getHash('SHA-1', 'HEX');
            return result; // 返回到前端，提供接口由前端请求
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>        <span class="hljs-built_in">var</span> calcSignature =<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">ticket,nonceStr,timeStamp,url</span>) </span>{
            <span class="hljs-built_in">var</span> result = {
                <span class="hljs-attribute">jsapi_ticket</span>: ticket,
                <span class="hljs-attribute">nonceStr</span>: nonceStr,
                <span class="hljs-attribute">timestamp</span>: timeStamp,
                <span class="hljs-attribute">url</span>: <span class="hljs-built_in">url</span>,
            }
            <span class="hljs-built_in">var</span> str = <span class="hljs-string">'jsapi_ticket='</span> + ticket + <span class="hljs-string">'&amp;noncestr='</span> + nonceStr + <span class="hljs-string">'&amp;timestamp='</span> + timeStamp + <span class="hljs-string">'&amp;url='</span> + <span class="hljs-built_in">url</span>;
            <span class="hljs-comment">// 对str使用sha1签名，得到signature，这里使用jsSHA模块，需install</span>
            shaObj = <span class="hljs-keyword">new</span> jsSHA(str, <span class="hljs-string">'TEXT'</span>);
            result.signature = shaObj.getHash(<span class="hljs-string">'SHA-1'</span>, <span class="hljs-string">'HEX'</span>);
            <span class="hljs-keyword">return</span> result; <span class="hljs-comment">// 返回到前端，提供接口由前端请求</span>
        }
</code></pre>
<ul><li><p>接下来就返回给前端使用(在获取签名的时候需要传递url：用于签名的（需要四个参数来实现签名:时间戳、ticket、前端传递的动态的url、nonceStr） url(动态的)给后端)]</p></li></ul>
<h2 id="articleHeader74">微信分享</h2>
<ul>
<li>
<p>微信分享问题总结:</p>
<ul><li><p><a href="http://blog.csdn.net/u011743396/article/details/62427452" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u011743396/article/details/62427452 </a></p></li></ul>
</li>
<li>
<p>ngork</p>
<ul><li><p><a href="https://www.zhihu.com/question/25456655" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/question/25456655   </a></p></li></ul>
</li>
<li>
<p>问题描述</p>
<ul>
<li><p><strong>微信 jssdk 需要签名，签名的 URL 和将要分享的 URL 必须要一致才会签名通过</strong></p></li>
<li><p>url必须是当前网页的url不包含#及其后面部分(<a href="http://blog.sina.com.cn/s/blog_164c3388f0102wndx.html)" rel="nofollow noreferrer" target="_blank">http://blog.sina.com.cn/s/blo...</a></p></li>
</ul>
</li>
<li><p>ip地址查询:<a href="http://site.ip138.com" rel="nofollow noreferrer" target="_blank">http://site.ip138.com</a></p></li>
<li>
<p>python sha1签名</p>
<ul><li><p><a href="http://blog.csdn.net/u014368609/article/details/50679818" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/u014368609/article/details/50679818</a></p></li></ul>
</li>
<li>
<p>js获取当前时间、时间戳</p>
<ul><li><p><a href="http://www.cnblogs.com/Man-Dream-Necessary/p/6369469.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/Man-Dream-Necessary/p/6369469.html </a></p></li></ul>
</li>
<li>
<p>Vue路由按需加载</p>
<ul><li><p><a href="http://www.jb51.net/article/107926.htm" rel="nofollow noreferrer" target="_blank">http://www.jb51.net/article/1...</a></p></li></ul>
</li>
<li>
<p>注意事项</p>
<ul><li>
<p>需要在配置文件webpack.base.conf.js中加入</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    output:{
        pathinfo: true
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
    <span class="hljs-selector-tag">output</span>:{
        <span class="hljs-attribute">pathinfo</span>: true
    }
</code></pre>
</li></ul>
</li>
<li>
<p>Vue服务端渲染</p>
<ul><li><p><a href="http://www.cnblogs.com/wangshiyang/p/6565624.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/wangsh...</a></p></li></ul>
</li>
<li>
<p>后台管理</p>
<ul><li><p><a href="https://github.com/almasaeed2010/AdminLTE" rel="nofollow noreferrer" target="_blank">https://github.com/almasaeed2...</a></p></li></ul>
</li>
</ul>
<h2 id="articleHeader75">Axios下的接口封装</h2>
<ul><li><p>get操作，如:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios';
        /**
         * 获取积分信息
         * @param url
         * @returns {*}
         */
        export function getJiFenDetailInfo(url) {
          return axios.get(url).then((res)=>{
            return Promise.resolve(res);
          },(err)=>{
            return Promise.reject(err);
          });
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
        <span class="hljs-comment">/**
         * 获取积分信息
         * @param url
         * @returns {*}
         */</span>
        <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJiFenDetailInfo</span>(<span class="hljs-params">url</span>) </span>{
          <span class="hljs-keyword">return</span> axios.get(url).then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(res);
          },<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
          });
        }</code></pre>
<ul><li><p>post操作,如:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import axios from 'axios';
        /**
         * 处理登录
         * @param url
         * @param mobile
         * @param password
         * @returns {*}
         */
        export function dealLogin(url,mobile,password) {
          return axios.post(url,{
            mobile:mobile,
            password:password
          }).then((res)=>{
            return Promise.resolve(res);
          },(err)=>{
            return Promise.reject(err);
          });
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>;
        <span class="hljs-comment">/**
         * 处理登录
         * @param url
         * @param mobile
         * @param password
         * @returns {*}
         */</span>
        <span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dealLogin</span>(<span class="hljs-params">url,mobile,password</span>) </span>{
          <span class="hljs-keyword">return</span> axios.post(url,{
            mobile:mobile,
            password:password
          }).then(<span class="hljs-function">(<span class="hljs-params">res</span>)=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve(res);
          },<span class="hljs-function">(<span class="hljs-params">err</span>)=&gt;</span>{
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
          });
        }</code></pre>
<h2 id="articleHeader76">基于VueJs的后台管理</h2>
<ul>
<li><p><a href="https://github.com/PanJiaChen/vue-element-admin" rel="nofollow noreferrer" target="_blank">https://github.com/PanJiaChen...</a></p></li>
<li><p><a href="https://github.com/vue-bulma/vue-admin" rel="nofollow noreferrer" target="_blank">https://github.com/vue-bulma/...</a></p></li>
<li><p><a href="https://github.com/taylorchen709/vue-admin" rel="nofollow noreferrer" target="_blank">https://github.com/taylorchen...</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
VueJs项目笔记

## 原文链接
[https://segmentfault.com/a/1190000010191885](https://segmentfault.com/a/1190000010191885)

