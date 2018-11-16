---
title: Vuex的基本入门、使用场景及安装配置
hidden: true
categories: reprint
slug: 69b79a0b
date: 2018-11-15 02:30:08
---

{{< raw >}}
<h1>&#x4EC0;&#x4E48;&#x662F;Vuex?</h1><p><strong>&#x7528;2&#x53E5;&#x8BDD;&#x6982;&#x62EC;&#xFF1A;</strong></p><ol><li>&#x4E3B;&#x8981;&#x5E94;&#x7528;&#x4E8E;Vue.js&#x4E2D;&#x7BA1;&#x7406;&#x6570;&#x636E;&#x72B6;&#x6001;&#x7684;&#x4E00;&#x4E2A;&#x5E93;</li><li>&#x901A;&#x8FC7;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x96C6;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x5B58;&#x50A8;&#xFF0C;&#x4F9B;&#x7A0B;&#x5E8F;&#x4E2D;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x8BBF;&#x95EE;</li></ol><p><span class="img-wrap"><img data-src="/img/bVbfOQe?w=1331&amp;h=287" src="https://static.alili.tech/img/bVbfOQe?w=1331&amp;h=287" alt="clipboard.png" title="clipboard.png"></span><br>&#x5F53;&#x7136;&#x8FD9;&#x4E48;&#x8BF4;&#x80AF;&#x5B9A;&#x8FD8;&#x662F;&#x6709;&#x6240;&#x4E0D;&#x61C2;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x7528;&#x5355;&#x4E00;&#x4F7F;&#x7528;vue.js&#x548C;&#x4F7F;&#x7528;vuex.js&#x573A;&#x666F;&#x7684;&#x4E0D;&#x540C;&#x8FDB;&#x884C;&#x5BF9;&#x6BD4;&#x8BB2;&#x89E3;</p><hr><p><strong>&#x5355;&#x4E00;&#x4F7F;&#x7528;Vue.js&#x7684;&#x573A;&#x666F;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbfPQ8?w=1317&amp;h=533" src="https://static.alili.tech/img/bVbfPQ8?w=1317&amp;h=533" alt="clipboard.png" title="clipboard.png"></span><br>&#x5728;&#x5355;&#x4E00;&#x4F7F;&#x7528;vue.js&#x7684;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x96BE;&#x514D;&#x8981;&#x5728;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E92;&#x76F8;&#x4F20;&#x503C;&#x3002;&#x5728;&#x8BE5;&#x573A;&#x666F;&#x4E2D;&#xFF0C;&#x7531;&#x4E00;&#x4E2A;&#x6839;&#x7EC4;&#x4EF6;&#xFF0C;&#x4E24;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x518D;&#x5404;&#x81EA;&#x62E5;&#x6709;&#x4E00;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x5982;&#x679C;&#x4F7F;&#x7528;prop&#x7684;&#x5C5E;&#x6027;&#x4F20;&#x503C;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x8BE6;&#x60C5;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x6DFB;&#x52A0;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x503C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E0D;&#x505C;&#x7684;&#x89E6;&#x53D1;&#x67D0;&#x4E2A;&#x4E8B;&#x4EF6;&#x5C06;&#x8FD9;&#x4E2A;&#x503C;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x4E00;&#x5C42;&#x5730;&#x6CBF;&#x7740;&#x8FD9;&#x4E2A;&#x8DEF;&#x5F84;&#x4F20;&#x8FC7;&#x53BB;&#xFF0C;&#x8FD9;&#x6837;&#x80FD;&#x5B9E;&#x73B0;&#x5C06;&#x503C;&#x4F20;&#x9012;&#x7ED9;&#x8BE6;&#x60C5;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F46;&#x8FD9;&#x662F;&#x76F8;&#x5F53;&#x7684;&#x9EBB;&#x70E6;&#xFF08;&#x9B3C;&#x77E5;&#x9053;&#x6211;&#x5F53;&#x521D;&#x4E0D;&#x77E5;&#x9053;vuex&#x4E3A;&#x4E86;&#x4F20;&#x503C;&#x5934;&#x6709;&#x591A;&#x5927;&#xFF09;&#x3002;&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x4E0B;vuex.js&#x573A;&#x666F;&#x4E0B;&#x7684;&#x6548;&#x679C;</p><p><strong>&#x4F7F;&#x7528;Vuex.js&#x7684;&#x573A;&#x666F;</strong></p><p><span class="img-wrap"><img data-src="/img/bVbfPQV?w=1329&amp;h=550" src="https://static.alili.tech/img/bVbfPQV?w=1329&amp;h=550" alt="clipboard.png" title="clipboard.png"></span><br>&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;&#x4E13;&#x95E8;&#x7684;store&#x5B58;&#x50A8;&#x6240;&#x6709;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x53D6;&#x5230;&#x7EC4;&#x4EF6;&#x4E8C;&#x6216;&#x66F4;&#x6DF1;&#x4E00;&#x7EA7;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x67D0;&#x4E2A;&#x6570;&#x636E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;<strong>getter</strong>&#x65B9;&#x6CD5;&#x76F4;&#x63A5;&#x62FF;&#x5230;&#x5176;&#x4E2D;&#x7684;&#x6570;&#x636E;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5411;store&#x4E2D;&#x6DFB;&#x52A0;&#x6216;&#x66F4;&#x6539;&#x67D0;&#x4E2A;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;<strong>mutation</strong>&#x6216;&#x76F4;&#x63A5;<strong>$store.state</strong>&#x7684;&#x5F62;&#x5F0F;&#x76F4;&#x63A5;&#x8DE8;&#x8FC7;&#x7236;&#x7EC4;&#x4EF6;&#x5411;store&#x4E2D;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x6216;&#x66F4;&#x6539;&#x6570;&#x636E;&#x3002;&#x5C31;&#x597D;&#x6BD4;&#x4E00;&#x4E2A;&#x4ED3;&#x5E93;&#xFF0C;&#x6240;&#x6709;&#x4EBA;&#x80FD;&#x76F4;&#x63A5;&#x8DE8;&#x8FC7;&#x4E0A;&#x7EA7;&#x62FF;&#x5230;&#x4ED3;&#x5E93;&#x4E2D;&#x7684;&#x67D0;&#x4E2A;&#x4F60;&#x6240;&#x9700;&#x8981;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x8FD9;&#x65E0;&#x7591;&#x662F;&#x5728;&#x6211;&#x4EEC;&#x4F7F;&#x7528;vue&#x5F00;&#x53D1;&#x9879;&#x76EE;&#x65F6;&#xFF0C;&#x76F8;&#x5F53;&#x7701;&#x65F6;&#x7701;&#x529B;&#x7684;&#x529E;&#x6CD5;&#x3002;</p><h1>Vuex&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;</h1><ul><li>&#x6D89;&#x53CA;&#x5230;&#x975E;&#x7236;&#x5B50;&#x5173;&#x7CFB;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;&#x5144;&#x5F1F;&#x5173;&#x7CFB;&#x3001;&#x7956;&#x5B59;&#x5173;&#x7CFB;&#xFF0C;&#x751A;&#x81F3;&#x66F4;&#x8FDC;&#x7684;&#x5173;&#x7CFB;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x8054;&#x7CFB;</li><li>&#x4E2D;&#x5927;&#x578B;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF0C;&#x8003;&#x8651;&#x5982;&#x4F55;&#x66F4;&#x597D;&#x5730;&#x5728;&#x7EC4;&#x4EF6;&#x5916;&#x90E8;&#x7BA1;&#x7406;&#x72B6;&#x6001;</li></ul><p>&#x76F8;&#x4FE1;&#x5927;&#x5BB6;&#x5728;&#x770B;&#x5B8C;&#x4E0A;&#x9762;vuex&#x7684;&#x57FA;&#x672C;&#x4ECB;&#x7ECD;&#x540E;&#xFF0C;&#x5FC3;&#x91CC;&#x5BF9;&#x5B83;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x4E5F;&#x6709;&#x4E86;&#x4E00;&#x4E2A;&#x5927;&#x6982;&#x7684;&#x60F3;&#x6CD5;&#x3002;<br>&#x603B;&#x800C;&#x8A00;&#x4E4B;&#xFF0C;&#x5728;&#x9875;&#x9762;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6BD4;&#x8F83;&#x590D;&#x6742;&#xFF0C;&#x6570;&#x636E;&#x548C;&#x7EC4;&#x4EF6;&#x5206;&#x79BB;&#xFF0C;&#x5206;&#x522B;&#x5904;&#x7406;&#xFF0C;&#x7EC4;&#x4EF6;&#x91CF;&#x8F83;&#x5927;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x90A3;&#x4E48;&#x4F7F;&#x7528; Vuex &#x662F;&#x975E;&#x5E38;&#x5408;&#x9002;&#x7684;&#x3002;</p><h1>Vuex&#x7684;&#x5B89;&#x88C5;&#x914D;&#x7F6E;</h1><p>&#x5728;&#x4F7F;&#x7528;vue-cli&#x811A;&#x624B;&#x67B6;&#x521B;&#x5EFA;&#x9879;&#x76EE;&#x540E;</p><pre><code>npm install vuex </code></pre><p>&#x8FDB;&#x5165;&#x9879;&#x76EE;&#x5B89;&#x88C5;vuex,&#x5B89;&#x88C5;&#x5B8C;&#x6210;&#x540E;&#xFF0C;&#x5728;&#x9879;&#x76EE;&#x7684;&#x6587;&#x4EF6;&#x5939;<strong><em>src</em></strong>&#x4E2D;&#x518D;&#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x5939;<strong>store</strong>,&#x6587;&#x4EF6;&#x5939;&#x4E2D;&#x65B0;&#x5EFA;&#x6587;&#x4EF6;<strong>store.js</strong>(&#x547D;&#x540D;&#x4E3A;&#x672C;&#x4EBA;&#x4E60;&#x60EF;)&#x3002;</p><p><strong>store.js</strong></p><pre><code>//&#x5F15;&#x5165;vue&#x548C;Vuex
import Vue from &apos;vue&apos;
import Vuex from &apos;vuex&apos;

//&#x5F15;&#x5165;&#x4E4B;&#x540E;&#xFF0C;&#x5BF9;vuex&#x8FDB;&#x884C;&#x5F15;&#x7528;
Vue.use(Vuex)</code></pre><p><strong>main.js</strong></p><pre><code>import {store} from &apos;./store/store&apos;</code></pre><pre><code>new Vue({
  store:store,//&#x4F7F;&#x7528;store
  el: &apos;#app&apos;,
  router,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;,
  
})</code></pre><p>&#x5728;main.js &#x4E2D;&#x5F15;&#x5165;vuex&#x6587;&#x4EF6;</p><p>&#x5230;&#x6B64;&#x4E3A;&#x6B62;&#xFF0C;vuex&#x7684;&#x5F15;&#x5165;&#x5C31;&#x7B97;&#x662F;&#x6210;&#x529F;&#x4E86;&#x3002;</p><h1>&#x57FA;&#x672C;&#x6982;&#x5FF5;</h1><h2>State</h2><p>&#x73B0;&#x5728;&#x56DE;&#x5230;&#x6211;&#x4EEC;&#x7684;<strong>store.js</strong>&#x4E2D;</p><pre><code>//&#x521B;&#x5EFA;&#x4E14;&#x58F0;&#x660E;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;
export const store = new Vuex.Store({
    state:{
        isShow:true,
        items:[
        {
            name:&quot;&#x5F20;&#x4E09;&quot;,
            num:&quot;1&quot;
        },
        {
            name:&quot;&#x674E;&#x56DB;&quot;,
            num:&quot;2&quot;
        },
        {
            name:&quot;&#x738B;&#x4E94;&quot;,
            num:&quot;3&quot;
        }
        ]
    }
})</code></pre><p>&#x8FD9;&#x91CC;&#x4E0D;&#x540C;&#x4E8E;&#x6587;&#x6863;&#x4E2D;&#x7684;&#x5199;&#x6CD5;&#xFF0C;&#x6211;&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x5C06;&#x521B;&#x5EFA;&#x58F0;&#x660E;&#x7B80;&#x5199;&#x6210;&#x4E00;&#x6BB5;&#x4EE3;&#x7801;&#xFF08;&#x4E2A;&#x4EBA;&#x66F4;&#x504F;&#x597D;&#x8FD9;&#x6837;&#x5199;&#xFF09;&#x3002;&#x5728;state&#x4E2D;&#x586B;&#x5199;&#x5916;&#x90E8;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x3002;&#x5916;&#x90E8;&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x53D6;&#x6570;&#x636E;&#xFF1A;</p><pre><code>computed:{
        itemList(){
            return this.$store.state.items
        }
    },</code></pre><pre><code>//&#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x79CD;&#x529E;&#x6CD5;
//p&#x5728;computed&#x7684;itemList&#x65B9;&#x6CD5;&#x4E2D;&#x5FAA;&#x73AF;
&lt;p v-for=&quot;item in itemList&quot;&gt;{{item.num}}{{item.name}}&lt;/p&gt;

//p&#x76F4;&#x63A5;&#x6307;&#x5411;store&#x4E2D;&#x7684;state&#x7684;items&#x6570;&#x7EC4;
&lt;p v-for=&quot;item in this.$store.state.items&quot;&gt;{{item.num}}{{item.name}}&lt;/p&gt;</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfSn5?w=1177&amp;h=84" src="https://static.alili.tech/img/bVbfSn5?w=1177&amp;h=84" alt="clipboard.png" title="clipboard.png"></span><br>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;computed&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;this.$store.state&#x3002;</p><h2>Getters</h2><p>getters&#x4E4D;&#x4E00;&#x770B;&#x4E5F;&#x662F;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x83B7;&#x53D6;&#x4E4B;&#x524D;&#x5B83;&#x591A;&#x4E86;&#x4E00;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;&#x8BA1;&#x7B97;&#x8FC7;&#x6EE4;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;&#x5E76;&#x8FD4;&#x56DE;&#x8FC7;&#x6EE4;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x6570;&#x636E;&#x3002;&#x5982;&#x679C;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x7528;&#x5230;&#x7B5B;&#x9009;&#x540E;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x90A3;&#x6211;&#x4EEC;&#x5C31;&#x5FC5;&#x987B;&#x5230;&#x5904;&#x91CD;&#x590D;&#x5199;&#x8BE5;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x51FD;&#x6570;&#xFF1B;&#x6216;&#x8005;&#x5C06;&#x5176;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x7684;&#x5DE5;&#x5177;&#x51FD;&#x6570;&#x4E2D;&#xFF0C;&#x5E76;&#x5C06;&#x516C;&#x5171;&#x51FD;&#x6570;&#x591A;&#x5904;&#x5BFC;&#x5165;&#x3002;<br><strong>store.js</strong></p><pre><code>    getters:{
        numChange(state){
            return state.items.forEach(item=&gt;{
                item.num+=100
            })
        }
    }
</code></pre><p><strong>&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</strong></p><pre><code>//&#x5199;&#x6CD5;&#x4E00;&#xFF1A;
&lt;p v-for=&quot;item in this.$store.getters.numChange&quot;&gt;{{item.num}}{{item.name}}&lt;/p&gt;</code></pre><pre><code>//&#x5199;&#x6CD5;&#x4E8C;&#xFF1A;
&lt;button @click=&quot;numTurn&quot;&gt;&#x6539;&#x53D8;&#x6570;&#x5B57;&lt;/button&gt;

computed:{
        numChange(){
            return this.$store.getters.numChange
        }
    },</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfURx?w=977&amp;h=81" src="https://static.alili.tech/img/bVbfURx?w=977&amp;h=81" alt="clipboard.png" title="clipboard.png"></span><br>p&#x6807;&#x7B7E;&#x5728;computed&#x4E2D;&#x8FD4;&#x56DE;getters&#x6570;&#x636E;&#x7684;&#x4E2D;&#x5FAA;&#x73AF;&#xFF0C;&#x6570;&#x636E;&#x663E;&#x793A;&#x51FA;&#x6765;&#x4FBF;&#x76F4;&#x63A5;&#x662F;&#x8BA1;&#x7B97;&#x5B8C;&#x6210;&#x540E;&#x7684;&#x6570;&#x636E;</p><h2>Mutations</h2><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;mutations&#x914D;&#x5408;vuex&#x63D0;&#x4F9B;&#x7684;commit&#x65B9;&#x6CD5;&#x6765;&#x4FEE;&#x6539;state&#x4E2D;&#x7684;&#x72B6;&#x6001;</p><p><strong>store.js</strong></p><pre><code>export const store = new Vuex.Store({
    state:{
        isShow:false,
        myData:&apos;&apos;,
        items:[
            {
                name:&quot;&#x5F20;&#x4E09;&quot;,
                num:1
            },
            {
                name:&quot;&#x674E;&#x56DB;&quot;,
                num:2
            },
            {
                name:&quot;&#x738B;&#x4E94;&quot;,
                num:3
            }
            ]
    },
    mutations:{
        //&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x52A8;&#x6001;&#x4FEE;&#x6539;state&#x7684;&#x72B6;&#x6001;&#x503C;
        numTurn(state){ /&#x8FD9;&#x91CC;&#x7684;state&#x4EE3;&#x8868;&#x4E0A;&#x9762;&#x7684;State
            state.items.forEach(item=&gt;{
                item.num+=100
            })
        }
    }
})</code></pre><p><strong>&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</strong></p><pre><code>//&#x5199;&#x6CD5;&#x4E00;&#xFF1A;
&lt;button @click=&quot;$store.commit(&apos;numTurn&apos;)&quot;&gt;&#x6539;&#x53D8;&#x6570;&#x5B57;&lt;/button&gt;</code></pre><pre><code>//&#x5199;&#x6CD5;&#x4E8C;&#xFF1A;
&lt;button @click=&quot;numTurn&quot;&gt;&#x6539;&#x53D8;&#x6570;&#x5B57;&lt;/button&gt;

methods:{
        numTurn(){
            this.$store.commit(&apos;numTurn&apos;)
        }
    }</code></pre><p><span class="img-wrap"><img data-src="/img/bVbfUOE?w=953&amp;h=97" src="https://static.alili.tech/img/bVbfUOE?w=953&amp;h=97" alt="clipboard.png" title="clipboard.png"></span></p><p>&#x4E24;&#x79CD;&#x5199;&#x6CD5;&#x539F;&#x7406;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x90FD;&#x80FD;&#x5B9E;&#x73B0;&#x6548;&#x679C;&#x3002;<strong>&#x6CE8;&#x610F;&#xFF1A;</strong>mutations&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x9700;&#x8981;<strong>commit</strong>&#x914D;&#x5408;&#x56DE;&#x8C03;&#x5B9E;&#x73B0;&#xFF0C;&#x800C;&#x4E0D;&#x518D;&#x662F;$store.mutation,&#x4E14;mutations&#x53EA;&#x80FD;&#x5904;&#x7406;&#x540C;&#x6B65;&#x51FD;&#x6570;&#xFF0C;&#x90A3;&#x5982;&#x679C;&#x9700;&#x8981;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x600E;&#x4E48;&#x529E;&#xFF1F;</p><h2>Action</h2><p>&#x5982;&#x6587;&#x6863;&#x4E2D;&#x6240;&#x8BF4;,Action&#x7C7B;&#x4F3C;&#x4E8E;Mutations,&#x4E0D;&#x540C;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>Aciton&#x63D0;&#x4EA4;&#x7684;&#x662F;mutation,&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x53D8;&#x66F4;&#x72B6;&#x6001;</li><li>Action&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4EFB;&#x4F55;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</li></ul><p>&#x90A3;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x662F;&#x9700;&#x8981;&#x4EFB;&#x610F;&#x7684;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF0C;&#x90A3;&#x5C31;&#x9700;&#x8981;&#x5728;Action&#x4E2D;&#x5B9E;&#x73B0;</p><hr><p>&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x7565;&#x8FC7;&#xFF0C;&#x672C;&#x6587;&#x4E3B;&#x8981;&#x5173;&#x4E8E;vuex&#x57FA;&#x7840;&#x7406;&#x89E3;&#x548C;&#x4F7F;&#x7528;</p><blockquote>&#x63A8;&#x8350;&#x89C6;&#x9891;&#xFF1A;<a href="https://ke.qq.com/course/258141" rel="nofollow noreferrer">https://ke.qq.com/course/258141</a></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vuex的基本入门、使用场景及安装配置

## 原文链接
[https://segmentfault.com/a/1190000016147752](https://segmentfault.com/a/1190000016147752)

