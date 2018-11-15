---
title: Vue基于vuex、axios拦截器实现loading效果及axios的安装配置
hidden: true
categories: reprint
slug: 17427fb2
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h1>&#x51C6;&#x5907;</h1><ul><li>&#x5229;&#x7528;vue-cli&#x811A;&#x624B;&#x67B6;&#x521B;&#x5EFA;&#x9879;&#x76EE;</li><li>&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x5B89;&#x88C5;vuex&#x3001;axios&#xFF08;npm install vuex,npm install axios&#xFF09;</li></ul><h1>axios&#x914D;&#x7F6E;</h1><p>&#x9879;&#x76EE;&#x4E2D;&#x5B89;&#x88C5;axios&#x6A21;&#x5757;&#xFF08;npm install axios&#xFF09;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x8FDB;&#x884C;&#x4EE5;&#x4E0B;&#x914D;&#x7F6E;&#xFF1A;</p><p><strong>main.js</strong></p><pre><code>//&#x5F15;&#x5165;axios
import Axios from &apos;axios&apos;

//&#x4FEE;&#x6539;&#x539F;&#x578B;&#x94FE;&#xFF0C;&#x5168;&#x5C40;&#x4F7F;&#x7528;axios,&#x8FD9;&#x6837;&#x4E4B;&#x540E;&#x53EF;&#x5728;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;methods&#x4E2D;&#x8C03;&#x7528;$axios&#x547D;&#x4EE4;&#x5B8C;&#x6210;&#x6570;&#x636E;&#x8BF7;&#x6C42;
Vue.prototype.$axios=Axios 
</code></pre><h1>loading&#x7EC4;&#x4EF6;</h1><p>&#x6211;&#x8FD9;&#x91CC;&#x5C31;&#x9009;&#x62E9;&#x4F7F;&#x7528;iview&#x63D0;&#x4F9B;&#x7684;loading&#x7EC4;&#x4EF6;&#xFF0C;</p><pre><code>npm install iview

main.js
import iView from &apos;iview&apos;;
import &apos;iview/dist/styles/iview.css&apos;;
Vue.use(iView);</code></pre><p>&#x5B89;&#x88C5;&#x5F15;&#x5165;&#x540E;&#xFF0C;&#x5C06;loading&#x5199;&#x6210;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;loading.vue</p><p><span class="img-wrap"><img data-src="/img/bVbfLbz?w=302&amp;h=136" src="https://static.alili.tech/img/bVbfLbz?w=302&amp;h=136" alt="clipboard.png" title="clipboard.png"></span></p><h1>Vuex state&#x72B6;&#x6001;&#x8BBE;&#x7F6E;&#x63A7;&#x5236;loading&#x7684;&#x663E;&#x9690;</h1><p><strong>store.js</strong>(Vuex)</p><pre><code>export const store = new Vuex.Store({
    state:{
        isShow:false
    }
})</code></pre><p>&#x5728;state&#x4E2D;&#x5B9A;&#x4E49;isShow&#x5C5E;&#x6027;&#xFF0C;&#x9ED8;&#x8BA4;false&#x9690;&#x85CF;</p><pre><code>v-if=&quot;this.$store.state.isShow&quot;</code></pre><p>&#x4E3A;loading&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;v-if&#x7ED1;&#x5B9A;state&#x4E2D;&#x7684;isShow</p><h1>&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;axios&#x8BF7;&#x6C42;&#x6570;&#x636E;</h1><pre><code>&lt;button @click=&quot;getData&quot;&gt;&#x8BF7;&#x6C42;&#x6570;&#x636E;&lt;/button&gt;</code></pre><pre><code>methods:{
        getData(){
            this.$axios.get(&apos;https://www.apiopen.top/journalismApi&apos;)
            .then(res=&gt;{
                console.log(res)//&#x8FD4;&#x56DE;&#x8BF7;&#x6C42;&#x7684;&#x7ED3;&#x679C;
            })
            .catch(err=&gt;{
                console.log(err)
            })
        }
    }</code></pre><p>&#x6211;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6309;&#x94AE;&#x8FDB;&#x884C;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x5229;&#x7528;get&#x8BF7;&#x6C42;&#x7F51;&#x4E0A;&#x968F;&#x4FBF;&#x627E;&#x7684;&#x4E00;&#x4E2A;api&#x63A5;&#x53E3;,.then&#x4E2D;&#x8FD4;&#x56DE;&#x8BF7;&#x6C42;&#x7684;&#x6574;&#x4E2A;&#x7ED3;&#x679C;&#xFF08;&#x4E0D;&#x4EC5;&#x4EC5;&#x5305;&#x62EC;&#x6570;&#x636E;&#xFF09;</p><h1>Axios&#x62E6;&#x622A;&#x5668;&#x914D;&#x7F6E;</h1><p><strong>main.js</strong></p><pre><code>//&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;
Axios.interceptors.request.use(function(config){
  store.state.isShow=true; //&#x5728;&#x8BF7;&#x6C42;&#x53D1;&#x51FA;&#x4E4B;&#x524D;&#x8FDB;&#x884C;&#x4E00;&#x4E9B;&#x64CD;&#x4F5C;
  return config
})
//&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;
Axios.interceptors.response.use(function(config){
  store.state.isShow=false;//&#x5728;&#x8FD9;&#x91CC;&#x5BF9;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x5904;&#x7406;
  return config
})</code></pre><p>&#x5206;&#x522B;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x8BF7;&#x6C42;&#x62E6;&#x622A;&#x5668;&#xFF08;&#x8BF7;&#x6C42;&#x5F00;&#x59CB;&#x65F6;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#xFF09;&#x3001;&#x54CD;&#x5E94;&#x62E6;&#x622A;&#x5668;&#xFF08;&#x63A5;&#x53D7;&#x5230;&#x6570;&#x636E;&#x540E;&#x6267;&#x884C;&#x67D0;&#x4E9B;&#x64CD;&#x4F5C;&#xFF09;&#xFF0C;&#x4E4B;&#x95F4;&#x5206;&#x522B;&#x8BBE;&#x7F6E;&#x62E6;&#x622A;&#x65F6;&#x6267;&#x884C;&#x7684;&#x64CD;&#x4F5C;&#xFF0C;&#x6539;&#x53D8;state&#x5185;isShow&#x7684;&#x5E03;&#x5C14;&#x503C;&#x4ECE;&#x800C;&#x63A7;&#x5236;loading&#x7EC4;&#x4EF6;&#x5728;&#x89E6;&#x53D1;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5F00;&#x59CB;&#x65F6;&#x663E;&#x793A;loading&#xFF0C;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x65F6;&#x9690;&#x85CF;loading<br><strong>&#x7279;&#x522B;&#x6CE8;&#x610F;</strong>&#xFF1A;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E2A;&#x8BED;&#x6CD5;&#x5751;&#xFF08;&#x6211;&#x53EF;&#x662F;&#x6765;&#x6765;&#x56DE;&#x56DE;&#x8E29;&#x4E86;&#x4E0D;&#x5C11;&#x6B21;&#xFF09;main.js&#x4E2D;&#x8C03;&#x53D6;&#x3001;&#x64CD;&#x4F5C;vuex state&#x4E2D;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x540C;&#x4E8E;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;this.$store.state&#xFF0C;&#x800C;&#x662F;&#x76F4;&#x63A5;store.state &#x540C;&#x4E0A;&#x9762;&#x4EE3;&#x7801;</p><h1>&#x6548;&#x679C;&#x5C55;&#x793A;</h1><p><span class="img-wrap"><img data-src="/img/bVbfLhX?w=1212&amp;h=235" src="https://static.alili.tech/img/bVbfLhX?w=1212&amp;h=235" alt="clipboard.png" title="clipboard.png"></span></p><p><span class="img-wrap"><img data-src="/img/bVbfLhz?w=1310&amp;h=351" src="https://static.alili.tech/img/bVbfLhz?w=1310&amp;h=351" alt="clipboard.png" title="clipboard.png"></span></p><blockquote>&#x672C;&#x6587;&#x4F5C;&#x8005;&#xFF1A;&#x8305;&#x91CE;zhy<br>&#x535A;&#x5BA2;&#x94FE;&#x63A5;&#xFF1A;www.zhysama.xyz<br>&#x7248;&#x6743;&#x58F0;&#x660E;&#xFF1A; &#x8BE5;&#x6587;&#x7AE0;&#x7531;&#x535A;&#x4E3B;&#x7F16;&#x8F91; , &#x8F6C;&#x53D1;&#x8BF7;&#x6CE8;&#x660E;&#x51FA;&#x5904;&#x8C22;&#x8C22;&#xFF01;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue基于vuex、axios拦截器实现loading效果及axios的安装配置

## 原文链接
[https://segmentfault.com/a/1190000016110704](https://segmentfault.com/a/1190000016110704)

