---
title: 'Dcloud,hbuilderX开发uni-app第一天踩坑记录'
hidden: true
categories: [reprint]
slug: 494d0a60
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p>&#x5176;&#x5B9E;&#x5927;&#x90E8;&#x5206;&#x5751;&#x5728; uni-app&#x5728;&#x5B98;&#x7F51;&#x90FD;&#x6709;&#x4ECB;&#x7ECD; &#x5177;&#x4F53;&#x4F4D;&#x7F6E;&#x5728; <a href="http://uniapp.dcloud.io/use" rel="nofollow noreferrer">&#x5728; uni-app &#x4E2D;&#x4F7F;&#x7528; Vue.js</a> &#x6A21;&#x5757;</p><p>&#x5B98;&#x65B9;&#x6587;&#x6863;&#x4E2D;&#x603B;&#x7ED3;&#x4E86;&#x5F88;&#x591A;&#x5751;&#xFF0C;&#x4F46;&#x6211;&#x53EA;&#x8BF4;&#x4E00;&#x4E0B;&#x6211;&#x4ECA;&#x5929;&#x9047;&#x5230;&#x7684;&#xFF1A;</p><h2><strong>&#x5751;1&#xFF1A;<a href="http://uniapp.dcloud.io/use?id=%E4%B8%8D%E6%94%AF%E6%8C%81%E8%BF%87%E6%BB%A4%E5%99%A8" rel="nofollow noreferrer">uni-app&#x4E0D;&#x652F;&#x6301;vue&#x4E2D;&#x7684;&#x8FC7;&#x6EE4;&#x5668;</a></strong></h2><p><strong>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;&#x4ECE;&#x540E;&#x53F0;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#x59CB;&#x7528;js&#x5BF9;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;&#xFF0C;</strong><br>&#x4F8B;&#x5B50;:</p><p>&#x59CB;&#x7528;&#x8FC7;&#x6EE4;&#x5668;&#x65F6;&#xFF1A;</p><pre><code>&lt;div v-for=&quot;talk in talkList&quot;&gt;
    &lt;p&gt;{{talk.date|formatTime}}&lt;/p&gt;
&lt;/div&gt;</code></pre><p>&#x59CB;&#x7528;uni-app:</p><pre><code>uni.request({
        url: &apos;http://localhost:8088/talk/queryList&apos;, //&#x4EC5;&#x4E3A;&#x793A;&#x4F8B;&#xFF0C;&#x5E76;&#x975E;&#x771F;&#x5B9E;&#x63A5;&#x53E3;&#x5730;&#x5740;&#x3002;
        success: (res) =&gt; {
            this.talkList = res.data
            this.talkList.forEach(item =&gt; item.date = this.formatTime(item.date))
        }
    })
</code></pre><h2><strong>&#x5751;2: <a href="http://uniapp.dcloud.io/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" rel="nofollow noreferrer">uni-app&#x4E2D;vuex&#x4F7F;&#x7528;&#x7684;&#x533A;&#x522B;</a></strong></h2><p>uni-app&#x4E2D;this.$store&#x4E3A;undefind ,&#x5FC5;&#x987B;&#x8981;&#x5728;main.js&#x4E2D;&#x52A0;&#x5165;&#x8FD9;&#x884C;&#x4EE3;&#x7801;</p><pre><code>Vue.prototype.$store = store
</code></pre><p>&#x8BE6;&#x7EC6;&#x914D;&#x7F6E;&#x53EF;&#x70B9;&#x51FB;<a href="http://uniapp.dcloud.io/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" rel="nofollow noreferrer">&#x6807;&#x9898;</a>&#x8FDE;&#x63A5;&#xFF0C;<a href="http://uniapp.dcloud.io/use?id=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98" rel="nofollow noreferrer">uni-app&#x5B98;&#x7F51;</a>&#x6709;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;&#xFF0C;&#x4E0E;&#x666E;&#x901A;vue&#x9879;&#x76EE;&#x4E0D;&#x540C;&#x7684;&#x53EA;&#x662F;&#x591A;&#x4E86;&#x4E0A;&#x9762;&#x8FD9;&#x884C;&#x4EE3;&#x7801;</p><h2><strong>&#x5751;3:<a href="http://uniapp.dcloud.io/matter" rel="nofollow noreferrer">&#x5FAE;&#x4FE1;&#x4E0D;&#x652F;&#x6301;&#x672C;&#x5730;&#x5B57;&#x4F53;&#x56FE;&#x6807;</a></strong></h2><p>&#x4E4B;&#x524D;&#x6211;&#x7684;iconfont.css&#x662F;&#x4ECE; <a href="http://www.iconfont.cn/" rel="nofollow noreferrer">&#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x77E2;&#x91CF;&#x56FE;&#x6807;&#x5E93;</a> &#x4E0B;&#x8F7D;&#x5230;&#x672C;&#x5730;&#x7684;&#xFF0C;&#x4F46;&#x662F;uni-app&#x4E0D;&#x652F;&#x6301;&#x672C;&#x5730;iconfont.css&#xFF0C;&#x62A5;&#x9519;</p><pre><code>00:42:22.580 Module build failed: ModuleNotFoundError: Module not found: Error: Can&apos;t resolve &apos;./iconfont.eot?t=1521557349802&apos; in &apos;D:\workspace\appProjects\uniQingchi\pages\index&apos;
00:42:22.592     at factoryCallback (D:\app\HBuilderX\plugins\uniapp\node_modules\webpack\lib\Compilation.js:264:39)
00:42:22.592     at factory (D:\app\HBuilderX\plugins\uniapp\node_modules\webpack\lib\NormalModuleFactory.js:247:20)
00:42:22.603     at resolver (D:\app\HBuilderX\plugins\uniapp\node_modules\webpack\lib\NormalModuleFactory.js:65:21)
00:42:22.613     at asyncLib.parallel (D:\app\HBuilderX\plugins\uniapp\node_modules\webpack\lib\NormalModuleFactory.js:138:21)
</code></pre><p>&#x540E;&#x6765;&#x770B;&#x4E86;&#x5B98;&#x7F51;&#x77E5;&#x9053;&#x4E86;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;&#x4E0D;&#x652F;&#x6301;&#x672C;&#x5730;&#x56FE;&#x6807;&#xFF0C;</p><p>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#xFF1A;&#x4ECE;<a href="http://www.iconfont.cn/" rel="nofollow noreferrer">&#x963F;&#x91CC;&#x5DF4;&#x5DF4;&#x77E2;&#x91CF;&#x56FE;&#x6807;&#x5E93;</a> &#x83B7;&#x53D6;&#x5728;&#x7EBF;&#x8FDE;&#x63A5;</p><p><span class="img-wrap"><img data-src="/img/bVbfXdF?w=2153&amp;h=897" src="https://static.alili.tech/img/bVbfXdF?w=2153&amp;h=897" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x53EF;&#x4EE5;&#x70B9;&#x51FB;Unicode&#x65C1;&#x8FB9;&#x7684;Font class&#x7136;&#x540E;&#x70B9;&#x5F00;&#x91CC;&#x9762;&#x7684;&#x7F51;&#x5740;&#xFF0C;&#x5C06;&#x5C55;&#x793A;&#x7684;&#x5185;&#x5BB9;&#x66FF;&#x6362;&#x672C;&#x5730;&#x7684;css&#x5C31;&#x597D;&#x4E86;</p><h2>&#x5751;4&#xFF1A;<a href="http://uniapp.dcloud.io/matter" rel="nofollow noreferrer">&#x666E;&#x901A;vue&#x9879;&#x76EE;&#x4EE3;&#x7801;&#x7C98;&#x8FC7;&#x6765;&#x6539;&#x52A8;&#x5F88;&#x5927;&#xFF0C;&#x4E0D;&#x652F;&#x6301;html&#x539F;&#x751F;&#x6807;&#x7B7E;&#xFF0C;&#x7C7B;&#x4F3C;&#x5FAE;&#x4FE1;&#x5C0F;&#x7A0B;&#x5E8F;</a></h2><p>&#x800C;&#x4E14;&#x76EE;&#x524D;uni-app &#x6807;&#x7B7E;&#x5F88;&#x5C11;&#xFF0C;&#x7EC4;&#x4EF6;&#x4E5F;&#x5F88;&#x5C11;&#xFF0C; uni-app&#x4E2D;&#x7684;view&#x6807;&#x7B7E;&#x76F8;&#x5F53;&#x4E8E;html&#x4E2D;&#x7684;div&#x6216;&#x8005;p&#x6807;&#x7B7E;&#xFF0C;text&#x6807;&#x7B7E;&#x76F8;&#x5F53;&#x4E8E;p&#x6807;&#x7B7E;&#xFF0C;<br>&#x6211;&#x4ECA;&#x5929;&#x53EA;&#x7528;&#x4E86;&#x4E09;&#x4E2A;&#x6807;&#x7B7E; button,view,image<br>&#x8D34;&#x4E00;&#x4E2A;&#x5B98;&#x65B9;&#x7684;&#x4EE3;&#x7801;&#x4F60;&#x4EEC;&#x81EA;&#x5DF1;&#x611F;&#x53D7;&#x4E00;&#x4E0B; &#x5168;&#x662F;&#x4E00;&#x8272;&#x7684;view&#x6807;&#x7B7E;:</p><p><span class="img-wrap"><img data-src="/img/bVbfXeu?w=2058&amp;h=1193" src="https://static.alili.tech/img/bVbfXeu?w=2058&amp;h=1193" alt="clipboard.png" title="clipboard.png"></span></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Dcloud,hbuilderX开发uni-app第一天踩坑记录

## 原文链接
[https://segmentfault.com/a/1190000016156607](https://segmentfault.com/a/1190000016156607)

