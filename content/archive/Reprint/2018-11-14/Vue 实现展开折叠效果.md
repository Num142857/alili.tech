---
title: Vue 实现展开折叠效果
hidden: true
categories: [reprint]
slug: 38a298d7
date: 2018-11-14 02:30:09
---

{{< raw >}}
<h2>Vue &#x5B9E;&#x73B0;&#x5C55;&#x5F00;&#x6298;&#x53E0;&#x6548;&#x679C;</h2><p><code>&#x6548;&#x679C;&#x53C2;&#x89C1;&#xFF1A;https://segmentfault.com/q/1010000011359250/a-1020000011360185</code></p><p>&#x4E0A;&#x8FF0;&#x94FE;&#x63A5;&#x4E2D;&#xFF0C;&#x5927;&#x4F6C;&#x7ED9;&#x9664;&#x4E86;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF0C;&#x518D;&#x6B21;&#x8FDB;&#x884C;&#x603B;&#x7ED3;&#xFF0C;&#x65B9;&#x4FBF;&#x4EE5;&#x540E;&#x4F7F;&#x7528;&#x3002;</p><blockquote>&#x9664;&#x4E86;&#x4F7F;&#x7528;jQuery&#x7684;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x4E0A;&#x8FF0;&#x6548;&#x679C;&#xFF0C;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x5728;Vue&#x5B9E;&#x73B0;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#xFF1A;</blockquote><h4>1&#x3001;&#x521B;&#x5EFA;collapse.js&#x6587;&#x4EF6;</h4><pre><code>const elTransition =
  &quot;0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out&quot;;
const Transition = {
  &quot;before-enter&quot;(el) {
    el.style.transition = elTransition;
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;

    el.style.height = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el) {
    el.dataset.oldOverflow = el.style.overflow;
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + &quot;px&quot;;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = &quot;&quot;;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = &quot;hidden&quot;;
  },

  &quot;after-enter&quot;(el) {
    el.style.transition = &quot;&quot;;
    el.style.height = &quot;&quot;;
    el.style.overflow = el.dataset.oldOverflow;
  },

  &quot;before-leave&quot;(el) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.height = el.scrollHeight + &quot;px&quot;;
    el.style.overflow = &quot;hidden&quot;;
  },

  leave(el) {
    if (el.scrollHeight !== 0) {
      el.style.transition = elTransition;
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  &quot;after-leave&quot;(el) {
    el.style.transition = &quot;&quot;;
    el.style.height = &quot;&quot;;
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  }
};

export default {
  name: &quot;collapseTransition&quot;,
  functional: true,
  render(h, { children }) {
    const data = {
      on: Transition
    };
    return h(&quot;transition&quot;, data, children);
  }
};</code></pre><h4>2&#x3001;&#x5728;.vue&#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;</h4><pre><code>
&lt;template&gt;
    &lt;div class=&quot;container&quot;&gt;
        &lt;button @click=&quot;isActive = !isActive&quot;&gt;&#x5C55;&#x5F00;/&#x6298;&#x53E0;&lt;/button&gt;
        &lt;collapse&gt;
            &lt;div class=&quot;container&quot; v-show=&quot;isActive&quot;&gt;
                &lt;h2&gt;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x54C1;&#x5C1D;Pizza!&lt;/h2&gt;
                &lt;h5&gt;&#x8FD9;&#x91CC;&#x6709;&#x4F60;&#x975E;&#x5E38;&#x559C;&#x6B22;&#x7684;Pizza!&lt;/h5&gt;
            &lt;/div&gt;
        &lt;/collapse&gt;
    &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
import collapse from &quot;../assets/js/collapse.js&quot;;
export default {
  data() {
    return {
      isActive: false
    };
  },
  components: {
    collapse
  }
};
&lt;/script&gt;</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 实现展开折叠效果

## 原文链接
[https://segmentfault.com/a/1190000016160493](https://segmentfault.com/a/1190000016160493)

