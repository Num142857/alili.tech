---
title: '这两天老是有兄弟问到Vue的登陆和注册，登陆成功留在首页，没有登录回到登录页面，现在我用最简单实用的方法实现（两分钟技就看懂）' 
date: 2018-11-16 2:30:06
hidden: true
slug: k1nujq6ggj
categories: [reprint]
---

{{< raw >}}
<p>&#x5176;&#x5B9E;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#xFF0C;&#x5E76;&#x4E14;&#x767B;&#x5F55;&#x4E00;&#x6B21;&#x4FDD;&#x6301;&#x767B;&#x5F55;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x662F;&#x6BCF;&#x4E2A;&#x9879;&#x76EE;&#x90FD;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x3002; &#x7F51;&#x4E0A;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x8FC7;&#xFF0C;&#x4E0D;&#x662F;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x8BF4;&#x4E00;&#x4E0B;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x5B9E;&#x7528;<br><em>&#x6838;&#x5FC3;&#x5C31;&#x662F;&#x7528;localStorage&#x5B58;&#x3001;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x6837;&#x5F53;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6216;&#x8005;&#x5173;&#x95ED;&#x5728;&#x6253;&#x5F00;&#x7684;&#x65F6;&#x5019;&#x80FD;&#x8FBE;&#x5230;&#x9884;&#x671F;&#x60F3;&#x8981;&#x7684;&#x6548;&#x679C;</em></p><hr><h2>&#x5728;router/index.js&#x4E2D;</h2><pre><code>import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;

Vue.use(Router)

export default new Router({
routes: [
    {path:&apos;/&apos;, redirect:&apos;/home&apos;},
    {path:&apos;/login&apos;,name:&apos;&#x767B;&#x5F55;&apos;,component:resolve =&gt;{require([&apos;@/components/login&apos;],resolve)"}}",
    {path:&apos;/home&apos;,name:&apos;&#x9996;&#x9875;&apos;,component:resolve =&gt;{require([&apos;@/components/home&apos;],resolve)"}}"
    ]
})</code></pre><p>&#x5176;&#x4E2D;redirect&#xFF08;&#x9ED8;&#x8BA4;&#x8DF3;&#x8F6C;&#xFF09;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5199;&#x5728;home&#x9875;&#x9762;&#xFF0C;&#x521A;&#x8FDB;&#x5165;&#x9875;&#x9762;&#x76F4;&#x63A5;&#x8DF3;&#x8F6C;&#x9996;&#x9875;</p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;<strong>&#x5728;home.vue&#x7684; &#x5468;&#x671F;&#x51FD;&#x6570;created&#x91CC;&#x9762;&#x505A;&#x5224;&#x65AD; Login&#x7684;&#x503C;&#x72B6;&#x6001;</strong>&#xFF08;Login&#x662F;&#x5728;login.vue&#x4E2D;localStorage&#x5B58;&#x5165;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5148;&#x8BFB;&#x53D6;&#xFF09;</p><pre><code>      created() {
            console.log(localStorage.getItem(&quot;Login&quot;));
            if(localStorage.getItem(&quot;Login&quot;)){
                console.log(&quot;&#x767B;&#x5F55;&#x8FC7;&#x4E86;&quot;);//&#x767B;&#x5F55;&#x6210;&#x529F;&#x4E86;&#xFF0C;&#x4FDD;&#x7559;&#x5728;&#x767B;&#x5F55;&#x9875;&#x9762;   
            }else{
                console.log(&quot;&#x6CA1;&#x6709;&#x767B;&#x5F55;&quot;);
                this.$router.push(&quot;/login&quot;);//&#x6CA1;&#x6709;&#x767B;&#x5F55;&#x8FC7; &#x8FD4;&#x56DE;&#x767B;&#x5F55;&#x9875;&#x9762;
            }
          },</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;<strong>&#x5728;login.vue &#x5F53;&#x7528;&#x6237;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x6210;&#x529F;&#x7684;&#x65F6;&#x5019;&#x628A;Login&#x7684;&#x72B6;&#x6001;&#x5199;&#x5165;</strong></p><pre><code>      axios.post(&quot;&#x540E;&#x53F0;&#x63A5;&#x53E3;&quot;,qs.stringify({
                      username:&quot;&#x7528;&#x6237;&#x540D;&quot;,
                     password: &quot;&#x5BC6;&#x7801;&quot;
                        }),{
            headers: {//&#x8BF7;&#x6C42;&#x5934;
                &quot;Content-Type&quot;: &quot;application/x-www-form-urlencoded&quot;,
                &quot;Accept&quot;:&quot;application/json&quot;
                }
            }).then((response) =&gt; {//&#x6210;&#x529F;&#x56DE;&#x8C03;
                if(response.data.status==&quot;200&quot;){//&#x72B6;&#x6001;&#x6B63;&#x5E38;&#x7684;&#x65F6;&#x5019;
                      this.$router.push(&quot;/home&quot;);
         //&#x5B58;&#x50A8;&#x540D;&#x5B57;&#x4E3A;Login&#x503C;&#x4E3A;true&#x7684;&#x53D8;&#x91CF;,&#x65B9;&#x4FBF;&#x6211;&#x4EEC;&#x5728;home&#x9875;&#x9762;&#x5224;&#x65AD;&#x662F;&#x5426;&#x767B;&#x5F55;
                      localStorage.setItem(&quot;Login&quot;,true)
              }
                    }, (error) =&gt; {
                        console.log(error);
                    });</code></pre><p><strong>&#x5982;&#x679C;&#x9996;&#x9875;&#x6709;&#x9000;&#x51FA;&#x767B;&#x5F55;&#x6309;&#x94AE;&#xFF0C;&#x90A3;&#x9000;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x6267;&#x884C;</strong></p><pre><code>         out(){
                  localStorage.removeItem(&quot;Login&quot;);//&#x5220;&#x6389;&#x6211;&#x4EEC;&#x5B58;&#x7684;&#x53D8;&#x91CF;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;
                  this.$router.push(&quot;/login&quot;);//&#x70B9;&#x51FB;&#x9000;&#x6210;&#x529F;&#x6309;&#x94AE;&#x8FD4;&#x56DE;&#x767B;&#x5F55;&#x9875;&#x9762;
              }</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;Vue&#x7684;&#x767B;&#x9646;&#x548C;&#x6CE8;&#x518C;&#xFF0C;&#x7528;&#x6237;&#x5237;&#x65B0;&#x6D4F;&#x89C8;&#x5668;&#xFF0C;&#x6216;&#x8005;&#x5173;&#x95ED;&#x5728;&#x6253;&#x5F00;&#x90FD;&#x4FDD;&#x6301;&#x767B;&#x5F55;&#x72B6;&#x6001;</p><p>&#x600E;&#x4E48;&#x6837;&#x662F;&#x4E0D;&#x662F;&#x5F88;&#x7B80;&#x5355;&#x5462;&#xFF1F;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
这两天老是有兄弟问到Vue的登陆和注册，登陆成功留在首页，没有登录回到登录页面，现在我用最简单实用的方法实现（两分钟技就看懂）

## 原文链接
[https://segmentfault.com/a/1190000016049895](https://segmentfault.com/a/1190000016049895)

