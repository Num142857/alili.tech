---
title: '实现一个mvvm' 
date: 2018-11-20 2:30:10
hidden: true
slug: naha8lftudc
categories: [reprint]
---

{{< raw >}}
<p>&#x6700;&#x8FD1;&#x5728;&#x56E2;&#x961F;&#x5185;&#x505A;&#x4E86;&#x4E00;&#x6B21;vue&#x539F;&#x7406;&#x5206;&#x4EAB;&#xFF0C;&#x73B0;&#x573A;&#x624B;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x4E5E;&#x4E10;&#x7248;mvvm&#xFF0C;&#x8FD9;&#x91CC;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;mvvm&#x5B9E;&#x73B0;&#x7684;&#x8FC7;&#x7A0B;&#x3002;</p><p>&#x6E90;&#x7801;&#xFF1A;<a href="https://github.com/keller35/mvvm" rel="nofollow noreferrer">https://github.com/keller35/mvvm</a></p><p>&#x8FD9;&#x4E2A;mvvm&#x662F;&#x57FA;&#x4E8E;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x6A21;&#x5F0F;&#x5B9E;&#x73B0;&#xFF08;&#x4E5F;&#x662F;vue&#x672C;&#x8EAB;&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF09;&#xFF0C;&#x6700;&#x7EC8;&#x8FBE;&#x5230;&#x7684;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeuuy?w=320&amp;h=72" src="https://static.alili.tech/img/bVbeuuy?w=320&amp;h=72" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x4E5F;&#x8DDF;vue&#x4E00;&#x6837;&#xFF1A;</p><pre><code>&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;title&gt;mvvm&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div id=&quot;app&quot;&gt;
        &lt;input type=&quot;text&quot; v-model=&quot;text&quot;&gt;
        "{{" text "}}"
        &lt;button @click=&quot;reset&quot; style=&quot;display:block;&quot;&gt;&#x91CD;&#x7F6E;&lt;/button&gt;
    &lt;/div&gt;
    &lt;script src=&quot;./index.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        var vm = new Mvvm({
            el: &apos;app&apos;,
            data: {
                text: &apos;hello world&apos;
            },
            methods: {
                reset() {
                    this.text = &apos;&apos;;
                },
            },
        });
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre><p>&#x5B9E;&#x73B0;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><pre><code class="javascript">class Mvvm {
    constructor(options) {
        const { el, data, methods } = options;
        this.methods = methods;
        this.target = null;
        // &#x521D;&#x59CB;&#x5316;dispatcher
        this.observe(this, data);
        // &#x521D;&#x59CB;&#x5316;watcher
        this.compile(document.getElementById(el));
    }

    observe(root, data) {
        for (const key in data) {
            this.defineReactive(root, key, data[key]);
        }
    }

    defineReactive(root, key, value) {
        if (typeof value == &apos;object&apos;) {
            return this.observe(value, value);
        }
        const dep = new Dispatcher();
        Object.defineProperty(root, key, {
            set(newValue) {
                if (value == newValue) return;
                value = newValue;
                // &#x53D1;&#x5E03;
                dep.notify(newValue);
            },
            get() {
                // &#x8BA2;&#x9605;
                dep.add(this.target);
                return value;
            }
        });
    }

    compile(dom) {
        const nodes = dom.childNodes;
        for (const node of nodes) {
            // &#x5143;&#x7D20;&#x8282;&#x70B9;
            if (node.nodeType == 1) {
                const attrs = node.attributes;
                for (const attr of attrs) {
                    if (attr.name == &apos;v-model&apos;) {
                        const name = attr.value;
                        node.addEventListener(&apos;input&apos;, e =&gt; {
                            this[name] = e.target.value;
                        });
                        this.target = new Watcher(node, &apos;input&apos;);
                        this[name];
                    }
                    if (attr.name == &apos;@click&apos;) {
                        const name = attr.value;
                        node.addEventListener(&apos;click&apos;, this.methods[name].bind(this));
                    }
                }
            }
            // text&#x8282;&#x70B9;
            if (node.nodeType == 3) {
                const reg = /\{\{(.*)\}\}/;
                const match = node.nodeValue.match(reg);
                if (match) {
                    const name = match[1].trim();
                    this.target = new Watcher(node, &apos;text&apos;);
                    this[name];
                }
            }
        }
    }
}

class Dispatcher {
    constructor() {
        this.watchers = [];
    }
    add(watcher) {
        this.watchers.push(watcher);
    }
    notify(value) {
        this.watchers.forEach(watcher =&gt; watcher.update(value));
    }
}

class Watcher {
    constructor(node, type) {
        this.node = node;
        this.type = type;
    }
    update(value) {
        if (this.type == &apos;input&apos;) {
            this.node.value = value;
        }
        if (this.type == &apos;text&apos;) {
            this.node.nodeValue = value;
        }
    }
}
</code></pre><p>&#x539F;&#x7406;&#xFF1A;</p><ol><li>&#x6700;&#x6839;&#x672C;&#x7684;&#x539F;&#x7406;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x65E0;&#x975E;&#x662F;&#x57FA;&#x4E8E;&#x53D1;&#x5E03;&#x8BA2;&#x9605;&#x7684;&#x6D88;&#x606F;&#x901A;&#x77E5;&#x6A21;&#x5F0F;&#xFF0C;&#x6D88;&#x606F;&#x53D1;&#x51FA;&#x65B9;&#x6765;&#x81EA;mvvm&#x4E2D;modal&#x5C42;&#x7684;&#x53D8;&#x6CD5;&#xFF0C;&#x800C;&#x8BA2;&#x9605;&#x65B9;&#x6765;&#x81EA;view&#x5C42;&#x3002;</li><li>modal&#x5C42;&#x7684;&#x53D8;&#x5316;&#xFF0C;&#x662F;&#x901A;&#x8FC7;&#x5BF9;data&#x8BBE;&#x7F6E;setter&#x6765;&#x5B9E;&#x73B0;&#x54CD;&#x5E94;&#x5F0F;&#xFF0C;&#x53EA;&#x8981;&#x6570;&#x636E;&#x53D1;&#x751F;&#x53D8;&#x5316;&#xFF0C;&#x901A;&#x77E5;&#x6240;&#x6709;&#x8BA2;&#x9605;&#x8005;&#x3002;</li><li>view&#x5C42;&#x7684;&#x8BA2;&#x9605;&#xFF0C;&#x5219;&#x662F;&#x5728;compile&#x9636;&#x6BB5;&#xFF0C;compile&#x4F1A;&#x5BF9;&#x6240;&#x6709;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x8FDB;&#x884C;&#x6536;&#x96C6;&#xFF0C;&#x7136;&#x540E;&#x5728;getter&#x4E2D;&#x6CE8;&#x518C;&#x76D1;&#x542C;&#x3002;</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实现一个mvvm

## 原文链接
[https://segmentfault.com/a/1190000015807808](https://segmentfault.com/a/1190000015807808)

