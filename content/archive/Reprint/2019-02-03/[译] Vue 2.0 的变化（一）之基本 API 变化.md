---
title: '[译] Vue 2.0 的变化（一）之基本 API 变化' 
date: 2019-02-03 2:30:39
hidden: true
slug: irf8wiur7lp
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">高层级的变化</h3>
<ul>
<li><p>模板解析器不再依赖于DOM（除非你使用真正的DOM作为模板），因此只要你使用字符串模板，你将不再受到任何1.0版本中的解析限制。但是，如果你依赖在存在的内容中挂载一个元素作为模板（使用<code>el</code>元素），你将依然受到这些限制。</p></li>
<li>
<p>编译器（将字符串模板转换为渲染方法的部分）和运行时间现在能够被分开。这里有两种不同的构建：</p>
<ul>
<li><p>独立构建：包括编译并且运行。这种方式和<code>vue 1.0</code>几乎完全一样。</p></li>
<li><p>运行时编译：由于它不包括编译器，在编译步骤时要么预编译模板，要么手动编写渲染功能。npm包默认导出这个版本，那么你需要有一个编译的过程（使用<code>Browserify</code>或<code>Webpack </code>）,从中<code>vueify</code>或<code>vue-loader</code>将可以进行模板预编译。</p></li>
</ul>
</li>
</ul>
<h3 id="articleHeader1">全局配置</h3>
<ul>
<li><p><code>Vue.config.silent</code></p></li>
<li><p><code>Vue.config.optionMergeStrategies</code></p></li>
<li><p><code>Vue.config.devtools</code></p></li>
<li><p><strong><code>Vue.config.errorHandler</code></strong>（新API，全局的挂钩用于在组件渲染和监控的时候处理未捕获的错误）</p></li>
<li><p><code>Vue.config.keyCodes</code>（新API，为<code>v-on</code>配置自定义的<code>key</code>的别名）</p></li>
<li><p><del><code>Vue.config.debug</code></del>（已丢弃）</p></li>
<li><p><del><code>Vue.config.async</code></del>（已丢弃）</p></li>
<li><p><del><code>Vue.config.delimiters</code></del>(已丢弃)</p></li>
<li><p><del><code>Vue.config.unsafeDelimiters</code></del>（已丢弃，使用<code>v-html</code>）</p></li>
</ul>
<h3 id="articleHeader2">全局API</h3>
<ul>
<li><p><code>Vue.extend</code></p></li>
<li><p><code>Vue.nextTick</code></p></li>
<li><p><code>Vue.set</code></p></li>
<li><p><code>Vue.delete</code></p></li>
<li><p><code>Vue.directive</code></p></li>
<li><p><code>Vue.component</code></p></li>
<li><p><code>Vue.use</code></p></li>
<li><p><code>Vue.mixin</code></p></li>
<li><p><strong><code>Vue.compile</code></strong>（新API，只能用于独立版本构建）</p></li>
<li>
<p><code>Vue.transition</code></p>
<ul><li><p><del><code>stagger</code></del>（已丢弃，在<code>el</code>上设置</p></li></ul>
</li>
<li><p><code>Vue.filter</code></p></li>
<li><p><del><code>Vue.elementDirective</code></del>（已丢弃，使用组件）</p></li>
<li><p><del><code>Vue.partial</code></del> （已丢弃，使用功能组件）</p></li>
</ul>
<h3 id="articleHeader3">选项</h3>
<h4>data</h4>
<ul>
<li><p><code>data</code></p></li>
<li>
<p><code>props</code></p>
<ul>
<li><p><code>prop</code></p></li>
<li><p><code>default</code></p></li>
<li><p><del><code>coerce</code></del>（已丢弃，如果你需要转换<code>prop</code>,请使用<code>compute</code>属性）</p></li>
<li><p><del><code>prop binding modes</code></del>（已丢弃，<code>v-model</code>在组件上可以工作</p></li>
</ul>
</li>
<li><p><strong><code>propsData</code></strong>（新API）只能用于实例</p></li>
<li><p><code>computed</code></p></li>
<li><p><code>methods</code></p></li>
<li><p><code>watch</code></p></li>
</ul>
<h4>DOM</h4>
<ul>
<li><p><code>el</code></p></li>
<li><p><code>template</code></p></li>
<li><p><strong><code>render</code></strong>（新API）</p></li>
<li><p><del><code>replace</code></del>（已丢弃，组件现在必须有一个根元素）</p></li>
</ul>
<h4>生命周期钩子</h4>
<ul>
<li><p><del><code>init</code></del>（已丢弃，请使用<code>beforeCreate</code>）</p></li>
<li><p><code>created</code></p></li>
<li><p><code>beforeDestroy</code></p></li>
<li><p><code>destroyed</code></p></li>
<li><p><strong><code>beforeMount</code></strong>(新API)</p></li>
<li><p><strong><code>mounted</code></strong>（新API）</p></li>
<li><p><strong><code>beforeUpdate</code></strong>（新API）</p></li>
<li><p><strong><code>updated</code></strong>（新API）</p></li>
<li><p><strong><code>activated</code></strong>(新API，用于<code>keep-alive</code>)</p></li>
<li><p><strong><code>deactivated</code></strong>（新API用于<code>keep-alive</code>）</p></li>
<li><p><del><code>ready</code></del>（已丢弃，使用<code>mounted</code>）</p></li>
<li><p><del><code>activate</code></del>（已丢弃，迁移到<code>vue-router</code>）</p></li>
<li><p><del><code>beforeCompile</code></del>（已丢弃，使用<code>created</code>）</p></li>
<li><p><del><code>compiled</code></del>（已丢弃，使用<code>mounted</code>）</p></li>
<li><p><del><code>attached</code></del>（已丢弃）</p></li>
<li><p><del><code>detached</code></del>（已丢弃，同上）</p></li>
</ul>
<h4>Assets</h4>
<ul>
<li><p><code>directives</code></p></li>
<li><p><code>components</code></p></li>
<li><p><code>transitions</code></p></li>
<li><p><code>filters</code></p></li>
<li><p><del><code>partials</code></del>（已丢弃）</p></li>
<li><p><del><code>elementDirectives</code></del>（已丢弃）</p></li>
</ul>
<h4>杂项</h4>
<ul>
<li><p><code>parent</code></p></li>
<li><p><code>mixins</code></p></li>
<li><p><code>name</code></p></li>
<li><p><code>extends</code></p></li>
<li><p><strong><code>delimiters</code></strong>（新API，替代原版的全局配置选项，只在独立构建中可用）</p></li>
<li><p><strong><code>functional</code></strong>（新API）</p></li>
<li><p><del><code>events</code></del>（已丢弃）</p></li>
</ul>
<h3 id="articleHeader4">实例方法</h3>
<h4>data</h4>
<ul>
<li><p><code>vm.$watch</code></p></li>
<li><p><del><code>vm.$get</code></del>（已丢弃，直接检索值）</p></li>
<li><p><del><code>vm.$set</code></del>（已丢弃，使用<code>Vue.set</code>）</p></li>
<li><p><del><code>vm.$delete</code></del>（已丢弃，使用<code>Vue.delete</code>）</p></li>
<li><p><del><code>vm.$eval</code></del>（已丢弃，没有真正的使用）</p></li>
<li><p><del><code>vm.$interpolate</code></del>（已丢弃，同上）</p></li>
<li><p><del><code>vm.$log</code></del>（已丢弃，使用<code>devtools</code>）</p></li>
</ul>
<h4>events</h4>
<ul>
<li><p><code>vm.$on</code></p></li>
<li><p><code>vm.$once</code></p></li>
<li><p><code>vm.$off</code></p></li>
<li><p><code>vm.$emit</code></p></li>
<li><p><del><code>vm.$dispatch</code></del>（已丢弃，使用全局的事件或使用<code>vuex</code>，见下面）</p></li>
<li><p><del><code>vm.$broadcast</code></del>（已丢弃，同上）</p></li>
</ul>
<h4>DOM</h4>
<ul>
<li><p><code>vm.$nextTick</code></p></li>
<li><p><del><code>vm.$appendTo</code></del>（已丢弃，在<code> vm.$el</code>上使用本地API）</p></li>
<li><p><del><code>vm.$before</code></del>（已丢弃）</p></li>
<li><p><del><code>vm.$after</code></del>（已丢弃）</p></li>
<li><p><del><code>vm.$remove</code></del>（已丢弃）</p></li>
</ul>
<h4>生命周期</h4>
<ul>
<li><p><code>vm.$mount</code></p></li>
<li><p><code>vm.$destroy</code></p></li>
</ul>
<h3 id="articleHeader5">指令</h3>
<ul>
<li><p><code>v-text</code></p></li>
<li><p><code>v-html</code>（注意<code>"{{"{ "}}"} </code>被丢弃）</p></li>
<li><p><code>v-if</code></p></li>
<li><p><code>v-show</code></p></li>
<li><p><code>v-else</code></p></li>
<li>
<p><code>v-for</code></p>
<ul>
<li><p><strong><code>key</code></strong> (替代 <code>track-by</code>)</p></li>
<li><p><code>object v-for</code></p></li>
<li><p><code>range v-for</code></p></li>
<li><p>参数顺序更新：数组中使用<code>(value, index) in arr</code>，对象中使用<code>(value, key, index) in obj</code></p></li>
<li><p><del><code>$index</code></del>和<del><code>$key</code></del>被丢弃</p></li>
</ul>
</li>
<li>
<p><code>v-on</code></p>
<ul>
<li><p><code>modifiers</code></p></li>
<li><p>on child component</p></li>
<li><p>自定义键码，目前版本<code>Vue.config.keyCodes</code>代替原来的<code>Vue.directive('on').keyCodes</code></p></li>
</ul>
</li>
<li>
<p><code>v-bind</code></p>
<ul>
<li><p>作为<code>prop</code></p></li>
<li><p><code>xlink</code></p></li>
<li><p>绑定对象</p></li>
</ul>
</li>
<li>
<p><code>v-bind:style</code></p>
<ul><li><p><code>prefix sniffing</code></p></li></ul>
</li>
<li><p><code>v-bind:class</code></p></li>
<li>
<p><code>v-model</code></p>
<ul>
<li><p><code>lazy</code> (as modifier)</p></li>
<li><p><code>number</code> (as modifier)</p></li>
<li><p><code>ignoring composition events</code></p></li>
<li><p><del><code>debounce</code></del>（已丢弃，使用<code>v-on:input</code>）</p></li>
</ul>
</li>
<li><p><code>v-cloak</code></p></li>
<li><p><code>v-pre</code></p></li>
<li><p><strong><code>v-once</code></strong>（新API）</p></li>
<li><p><del><code>v-ref</code></del>（已丢弃，现在只是一个特殊的属性<code>ref</code>）</p></li>
<li><p><del><code>v-el</code></del>（和<code>ref</code>合并）</p></li>
</ul>
<h3 id="articleHeader6">特殊组件</h3>
<ul>
<li>
<p><code>&lt;component&gt;</code></p>
<ul>
<li><p><code>:is</code></p></li>
<li><p><code>async组件</code></p></li>
<li><p><code>inline-template</code></p></li>
</ul>
</li>
<li><p><code>&lt;transition&gt;</code></p></li>
<li><p><code>&lt;transition-group&gt;</code></p></li>
<li><p><code>&lt;keep-alive&gt;</code></p></li>
<li><p><code>&lt;slot&gt;</code></p></li>
<li><p><del><code>partial</code></del>（已丢弃）</p></li>
</ul>
<h3 id="articleHeader7">特殊属性</h3>
<ul>
<li><p><code>key</code></p></li>
<li><p><code>ref</code></p></li>
<li><p><code>slot</code></p></li>
</ul>
<h3 id="articleHeader8">服务器端渲染</h3>
<ul>
<li><p><code>renderToString</code></p></li>
<li><p><code>renderToStream</code></p></li>
<li><p><code>client-side hydration</code></p></li>
</ul>
<blockquote><p>翻译自<a href="https://github.com/vuejs/vue/issues/2873" rel="nofollow noreferrer" target="_blank">2.0 Changes</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Vue 2.0 的变化（一）之基本 API 变化

## 原文链接
[https://segmentfault.com/a/1190000007012940](https://segmentfault.com/a/1190000007012940)

