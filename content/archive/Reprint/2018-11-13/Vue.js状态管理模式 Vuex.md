---
title: Vue.js状态管理模式 Vuex
reprint: true
categories: reprint
abbrlink: '42494691'
date: 2018-11-13 02:30:09
---

{{% raw %}}
<p><span class="img-wrap"><img data-src="/img/bVDxBu?w=701&amp;h=551" src="https://static.alili.tech/img/bVDxBu?w=701&amp;h=551" alt="clipboard.png" title="clipboard.png"></span></p><blockquote>vuex &#x662F;&#x4E00;&#x4E2A;&#x4E13;&#x4E3A; Vue.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6A21;&#x5F0F;&#x3002;&#x5B83;&#x91C7;&#x7528;&#x96C6;&#x4E2D;&#x5F0F;&#x5B58;&#x50A8;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4EE5;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#x4FDD;&#x8BC1;&#x72B6;&#x6001;&#x4EE5;&#x4E00;&#x79CD;&#x53EF;&#x9884;&#x6D4B;&#x7684;&#x65B9;&#x5F0F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;</blockquote><h1>&#x5B89;&#x88C5;&#x3001;&#x4F7F;&#x7528; vuex</h1><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x5728; vue.js 2.0 &#x5F00;&#x53D1;&#x73AF;&#x5883;&#x4E2D;&#x5B89;&#x88C5; vuex :</p><pre><code>npm install vuex --save</code></pre><p>&#x7136;&#x540E; , &#x5728; main.js &#x4E2D;&#x52A0;&#x5165; :</p><pre><code>import vuex from &apos;vuex&apos;
Vue.use(vuex);
const store = new vuex.Store({//store&#x5BF9;&#x8C61;
    state:{
        show:false,
        count:0
    }
})</code></pre><p>&#x518D;&#x7136;&#x540E; , &#x5728;&#x5B9E;&#x4F8B;&#x5316; Vue&#x5BF9;&#x8C61;&#x65F6;&#x52A0;&#x5165; store &#x5BF9;&#x8C61; :</p><pre><code>new Vue({
  el: &apos;#app&apos;,
  router,
  store,//&#x4F7F;&#x7528;store
  template: &apos;&lt;App/&gt;&apos;,
  components: { App }
})</code></pre><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; store.state &#x6765;&#x83B7;&#x53D6;&#x72B6;&#x6001;&#x5BF9;&#x8C61;&#xFF0C;&#x4EE5;&#x53CA;&#x901A;&#x8FC7; store.commit &#x65B9;&#x6CD5;&#x89E6;&#x53D1;&#x72B6;&#x6001;&#x53D8;&#x66F4;&#xFF1A;</p><pre><code>store.commit(&apos;increment&apos;)

console.log(store.state.count) // -&gt; 1</code></pre><h1>State</h1><h2>&#x5728; Vue &#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x5F97; Vuex &#x72B6;&#x6001;</h2><p>&#x4ECE; store &#x5B9E;&#x4F8B;&#x4E2D;&#x8BFB;&#x53D6;&#x72B6;&#x6001;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x5728;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E2D;&#x8FD4;&#x56DE;&#x67D0;&#x4E2A;&#x72B6;&#x6001;&#xFF1A;</p><pre><code>// &#x521B;&#x5EFA;&#x4E00;&#x4E2A; Counter &#x7EC4;&#x4EF6;
const Counter = {
  template: `&lt;div&gt;{{ count }}&lt;/div&gt;`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}</code></pre><h2>mapState &#x8F85;&#x52A9;&#x51FD;&#x6570;</h2><p>&#x5F53;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x83B7;&#x53D6;&#x591A;&#x4E2A;&#x72B6;&#x6001;&#x65F6;&#x5019;&#xFF0C;&#x5C06;&#x8FD9;&#x4E9B;&#x72B6;&#x6001;&#x90FD;&#x58F0;&#x660E;&#x4E3A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4F1A;&#x6709;&#x4E9B;&#x91CD;&#x590D;&#x548C;&#x5197;&#x4F59;&#x3002;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; mapState &#x8F85;&#x52A9;&#x51FD;&#x6570;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x751F;&#x6210;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;:</p><pre><code>// &#x5728;&#x5355;&#x72EC;&#x6784;&#x5EFA;&#x7684;&#x7248;&#x672C;&#x4E2D;&#x8F85;&#x52A9;&#x51FD;&#x6570;&#x4E3A; Vuex.mapState
import { mapState } from &apos;vuex&apos;

export default {
  // ...
  computed: mapState({
    // &#x7BAD;&#x5934;&#x51FD;&#x6570;&#x53EF;&#x4F7F;&#x4EE3;&#x7801;&#x66F4;&#x7B80;&#x7EC3;
    count: state =&gt; state.count,

    // &#x4F20;&#x5B57;&#x7B26;&#x4E32;&#x53C2;&#x6570; &apos;count&apos; &#x7B49;&#x540C;&#x4E8E; `state =&gt; state.count`
    countAlias: &apos;count&apos;,

    // &#x4E3A;&#x4E86;&#x80FD;&#x591F;&#x4F7F;&#x7528; `this` &#x83B7;&#x53D6;&#x5C40;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5E38;&#x89C4;&#x51FD;&#x6570;
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}</code></pre><p>&#x5F53;&#x6620;&#x5C04;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x540D;&#x79F0;&#x4E0E; state &#x7684;&#x5B50;&#x8282;&#x70B9;&#x540D;&#x79F0;&#x76F8;&#x540C;&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x7ED9; mapState &#x4F20;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;:</p><pre><code>computed: mapState([
  // &#x6620;&#x5C04; this.count &#x4E3A; store.state.count
  &apos;count&apos;
])</code></pre><h1>Getter</h1><p>getters &#x548C; vue &#x4E2D;&#x7684; computed &#x7C7B;&#x4F3C; , &#x90FD;&#x662F;&#x7528;&#x6765;&#x8BA1;&#x7B97; state &#x7136;&#x540E;&#x751F;&#x6210;&#x65B0;&#x7684;&#x6570;&#x636E; ( &#x72B6;&#x6001; ) &#x7684;,&#x5C31;&#x50CF;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#xFF0C;getter &#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x6839;&#x636E;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x4E14;&#x53EA;&#x6709;&#x5F53;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x503C;&#x53D1;&#x751F;&#x4E86;&#x6539;&#x53D8;&#x624D;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x3002;</p><p>Getter &#x63A5;&#x53D7; state &#x4F5C;&#x4E3A;&#x5176;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><pre><code>const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: &apos;...&apos;, done: true },
      { id: 2, text: &apos;...&apos;, done: false }
    ]
  },
  getters: {
    doneTodos: state =&gt; {
      return state.todos.filter(todo =&gt; todo.done)
    }
  }
})</code></pre><h2>&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x8BBF;&#x95EE;</h2><p>Getter &#x4F1A;&#x66B4;&#x9732;&#x4E3A; store.getters &#x5BF9;&#x8C61;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4EE5;&#x5C5E;&#x6027;&#x7684;&#x5F62;&#x5F0F;&#x8BBF;&#x95EE;&#x8FD9;&#x4E9B;&#x503C;&#xFF1A;</p><pre><code>store.getters.doneTodos // -&gt; [{ id: 1, text: &apos;...&apos;, done: true }]</code></pre><p>Getter &#x4E5F;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x5176;&#x4ED6; getter &#x4F5C;&#x4E3A;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><pre><code>getters: {
  // ...
  doneTodosCount: (state, getters) =&gt; {
    return getters.doneTodos.length
  }
}

store.getters.doneTodosCount // -&gt; 1</code></pre><p>&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;&#xFF1A;</p><pre><code>computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;getter &#x5728;&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x8BBF;&#x95EE;&#x65F6;&#x662F;&#x4F5C;&#x4E3A; Vue &#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x7CFB;&#x7EDF;&#x7684;&#x4E00;&#x90E8;&#x5206;&#x7F13;&#x5B58;&#x5176;&#x4E2D;&#x7684;&#x3002;</p><h1>&#x901A;&#x8FC7;&#x65B9;&#x6CD5;&#x8BBF;&#x95EE;</h1><h2>&#x901A;&#x8FC7;&#x65B9;&#x6CD5;&#x8BBF;&#x95EE;</h2><p>&#x4F60;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8BA9; getter &#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x6765;&#x5B9E;&#x73B0;&#x7ED9; getter &#x4F20;&#x53C2;&#x3002;&#x5728;&#x4F60;&#x5BF9; store &#x91CC;&#x7684;&#x6570;&#x7EC4;&#x8FDB;&#x884C;&#x67E5;&#x8BE2;&#x65F6;&#x975E;&#x5E38;&#x6709;&#x7528;:</p><pre><code>getters: {
  // ...
  getTodoById: (state) =&gt; (id) =&gt; {
    return state.todos.find(todo =&gt; todo.id === id)
  }
}</code></pre><pre><code>store.getters.getTodoById(2) // -&gt; { id: 2, text: &apos;...&apos;, done: false }</code></pre><p>&#x6CE8;&#x610F;&#xFF0C;getter &#x5728;&#x901A;&#x8FC7;&#x65B9;&#x6CD5;&#x8BBF;&#x95EE;&#x65F6;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x4F1A;&#x53BB;&#x8FDB;&#x884C;&#x8C03;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x4F1A;&#x7F13;&#x5B58;&#x7ED3;&#x679C;&#x3002;</p><h2>mapGetters &#x8F85;&#x52A9;&#x51FD;&#x6570;</h2><p>mapGetters &#x8F85;&#x52A9;&#x51FD;&#x6570;&#x4EC5;&#x4EC5;&#x662F;&#x5C06; store &#x4E2D;&#x7684; getter &#x6620;&#x5C04;&#x5230;&#x5C40;&#x90E8;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF1A;</p><pre><code>import { mapGetters } from &apos;vuex&apos;

export default {
  // ...
  computed: {
  // &#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5C55;&#x5F00;&#x8FD0;&#x7B97;&#x7B26;&#x5C06; getter &#x6DF7;&#x5165; computed &#x5BF9;&#x8C61;&#x4E2D;
    ...mapGetters([
      &apos;doneTodosCount&apos;,
      &apos;anotherGetter&apos;,
      // ...
    ])
  }
}</code></pre><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x5C06;&#x4E00;&#x4E2A; getter &#x5C5E;&#x6027;&#x53E6;&#x53D6;&#x4E00;&#x4E2A;&#x540D;&#x5B57;&#xFF0C;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF1A;</p><pre><code>mapGetters({
  // &#x628A; `this.doneCount` &#x6620;&#x5C04;&#x4E3A; `this.$store.getters.doneTodosCount`
  doneCount: &apos;doneTodosCount&apos;
})</code></pre><h1>Mutation</h1><p>&#x66F4;&#x6539; Vuex &#x7684; store &#x4E2D;&#x7684;&#x72B6;&#x6001;&#x7684;&#x552F;&#x4E00;&#x65B9;&#x6CD5;&#x662F;&#x63D0;&#x4EA4; mutation&#x3002;</p><p>&#x6CE8;&#x518C;&#xFF1A;</p><pre><code>const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // &#x53D8;&#x66F4;&#x72B6;&#x6001;
      state.count++
    }
  }
})</code></pre><p>&#x8C03;&#x7528;&#xFF1A;</p><pre><code>store.commit(&apos;increment&apos;)</code></pre><h2>&#x63D0;&#x4EA4;&#x8F7D;&#x8377;&#xFF08;Payload&#xFF09;</h2><p>&#x4F60;&#x53EF;&#x4EE5;&#x5411; store.commit &#x4F20;&#x5165;&#x989D;&#x5916;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x5373; mutation &#x7684; &#x8F7D;&#x8377;&#xFF08;payload&#xFF09;&#xFF1A;</p><pre><code>// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}</code></pre><pre><code>store.commit(&apos;increment&apos;, 10)</code></pre><p>&#x5982;&#x679C;&#x63D0;&#x4EA4;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x63D0;&#x4EA4;</p><pre><code>// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}</code></pre><pre><code>store.commit(&apos;increment&apos;, {
  amount: 10
})</code></pre><p>&#x6CE8;&#xFF1A;mutations&#x91CC;&#x7684;&#x64CD;&#x4F5C;&#x5FC5;&#x987B;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF1B;</p><h1>Action</h1><p>Action &#x7C7B;&#x4F3C;&#x4E8E; mutation&#xFF0C;&#x4E0D;&#x540C;&#x5728;&#x4E8E;&#xFF1A;</p><ul><li>Action &#x63D0;&#x4EA4;&#x7684;&#x662F; mutation&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x53D8;&#x66F4;&#x72B6;&#x6001;&#x3002;</li><li>Action &#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4EFB;&#x610F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</li></ul><pre><code>const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit(&apos;increment&apos;)
    }
  }
})</code></pre><p>Action &#x901A;&#x8FC7; store.dispatch &#x65B9;&#x6CD5;&#x89E6;&#x53D1;&#xFF1A;</p><pre><code>store.dispatch(&apos;increment&apos;)</code></pre><p>&#x5728; action &#x5185;&#x90E8;&#x6267;&#x884C;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#xFF1A;</p><pre><code>actions: {
  incrementAsync ({ commit }) {
    setTimeout(() =&gt; {
      commit(&apos;increment&apos;)
    }, 1000)
  }
}</code></pre><p>&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#x4F20;&#x53C2;&#xFF1A;</p><pre><code>// &#x4EE5;&#x8F7D;&#x8377;&#x5F62;&#x5F0F;&#x5206;&#x53D1;
store.dispatch(&apos;incrementAsync&apos;, {
  amount: 10
})</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js状态管理模式 Vuex

## 原文链接
[https://segmentfault.com/a/1190000016229077](https://segmentfault.com/a/1190000016229077)

