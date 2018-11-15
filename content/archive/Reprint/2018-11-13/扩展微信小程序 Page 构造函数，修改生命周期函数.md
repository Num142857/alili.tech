---
title: 扩展微信小程序 Page 构造函数，修改生命周期函数
reprint: true
categories: reprint
abbrlink: e33f3d95
date: 2018-11-13 02:30:09
---

{{% raw %}}
<p><strong>&#x4E0D;BB,&#x76F4;&#x63A5;&#x6B63;&#x9898;</strong></p><h2>&#x4E00;. &#x5C06;&#x516C;&#x5171;&#x65B9;&#x6CD5;&#x7ED1;&#x5B9A;&#x5230;Page&#x4E0A;</h2><ul><li><p>&#x5355;&#x4E2A;&#x7ED1;&#x5B9A;</p><pre><code>const oldPage = Page
Page = function(app) {
  // &#x6CE8;&#x610F;&#x516C;&#x5171;&#x51FD;&#x6570;&#x7684;&#x540D;&#x5B57;&#x4E0D;&#x8981;&#x91CD;&#x590D;&#xFF0C;&#x5426;&#x5219;&#x8986;&#x76D6;
  app.util = function() {}
  
  return oldPage(app)
}</code></pre></li><li><p>&#x591A;&#x4E2A;&#x7ED1;&#x5B9A;&#xFF0C;&#x6587;&#x4EF6;&#x7ED1;&#x5B9A;</p><pre><code>const util = require(&apos;./util.js&apos;);  // &#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x7684;&#x51FD;&#x6570;&#x7531;util&#x6587;&#x4EF6;exports&#x51FA;&#x6765;
const oldPage = Page
Page = function(app) {
  let newPage = Object.assign({}, util, app)
  
  return oldPage(newPage)
}</code></pre></li></ul><h2>&#x4E8C;. &#x6269;&#x5C55;&#xFF0C;&#x4FEE;&#x6539;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;</h2><pre><code>const oldPage = Page
Page = function(app) {
  app.onLoad = function(options) { // &#x8FD9;&#x91CC;&#x5FC5;&#x987B;&#x4F7F;&#x7528;function, &#x4E0D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C; &#x5426;&#x5219;this&#x6307;&#x5411;&#x9519;&#x8BEF;
      console.log(&quot;&#x6269;&#x5C55;onLoad&quot;);
  
      // onLoad&#x51FD;&#x6570;&#x5728;&#x662F;&#x5F53;&#x524D;page&#x5B9E;&#x4F8B;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x6267;&#x884C;&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x524D;&#x7684;this&#x4E3A;&#x5F53;&#x524D;page&#x5B9E;&#x4F8B;
      // &#x5982;&#x679C;&#x4E0D;&#x4F7F;&#x7528;call&#x6765;&#x786C;&#x7ED1;&#x5B9A;&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;app.onLoad()&#xFF0C;&#x90A3;&#x4E48;onLoad&#x91CC;&#x7684;this&#x5C06;&#x4E3A;app&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;
      // &#x5373;&#x6211;&#x4EEC;&#x6B63;&#x5E38;&#x5728;page.js&#x91CC;Page(app) &#x62EC;&#x53F7;&#x91CC;&#x9762;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x5199;&#x7684;page&#x5BF9;&#x8C61;
      if(typeof app.onLoad === &apos;function&apos;) {
          app.onLoad.call(this, options); 
      }
  }
  
  return oldPage(app)
}</code></pre><p>ps.&#x60F3;&#x66F4;&#x7CFB;&#x7EDF;&#x7684;&#x4E86;&#x89E3;js&#x5173;&#x4E8E;this&#x7684;&#x77E5;&#x8BC6;<a href="http://sfau.lt/b5U8ps" rel="nofollow noreferrer">&#x53EF;&#x4EE5;&#x6233;&#x8FD9;&#x91CC;</a></p><h2>&#x4E09;. &#x4F7F;&#x7528;</h2><p>&#x6211;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x5185;&#x5BB9;&#x5355;&#x72EC;&#x5C01;&#x88C5;&#x5230;&#x4E00;&#x4E2A;js&#x6587;&#x4EF6;&#x4E2D;&#xFF0C;&#x7136;&#x540E;&#x5728;app.js&#x4E2D;&#x5F15;&#x7528;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5373;&#x53EF;</p><pre><code>require(&apos;./init.js&apos;); //&#x5F15;&#x7528;&#x5373;&#x53EF;
App({
  onLaunch: function (options) {
  }

})
</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
扩展微信小程序 Page 构造函数，修改生命周期函数

## 原文链接
[https://segmentfault.com/a/1190000016251970](https://segmentfault.com/a/1190000016251970)

