---
title: 'vue监听对象及对象属性' 
date: 2018-11-15 21:18:14
hidden: true
slug: 74z3dzyfjps
categories: reprint
---

{% raw %}
<h3>&#x76D1;&#x542C;&#x6574;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4F7F;&#x7528;watch&#x5C31;&#x884C;</h3><pre><code class="cpp">export default {
    data() {
        return {
            a: {
                b: 1,
                c: 2
            }
        }
    },
    watch() {
        a: {
            handler(newVal, oldVal) {
                console.log(&apos;&#x76D1;&#x542C;a&#x6574;&#x4E2A;&#x5BF9;&#x8C61;&#x7684;&#x53D8;&#x5316;&apos;);
            },
            deep: true
        }
    }
}</code></pre><h3>&#x76D1;&#x542C;&#x5BF9;&#x8C61;&#x4E2D;&#x5177;&#x4F53;&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;watch&#x914D;&#x5408;computed</h3><pre><code class="cpp">export default {
    data() {
        return {
            a: {
                b: 1,
                c: 2
            }
        }
    },
    watch() {
        bChange() {
            console.log(&apos;&#x76D1;&#x542C;a&#x5BF9;&#x8C61;&#x4E2D;b&#x5C5E;&#x6027;&#x7684;&#x53D8;&#x5316;&apos;);
        }
    },
    computed: {
        bChange() {
            return this.a.b;
        }
    }
}</code></pre>
{% endraw %}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue监听对象及对象属性

## 原文链接
[https://segmentfault.com/a/1190000016073949](https://segmentfault.com/a/1190000016073949)

