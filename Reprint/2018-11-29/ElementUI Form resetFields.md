---
title: 'ElementUI Form resetFields' 
date: 2018-11-29 2:30:09
hidden: true
slug: p5ssgttu0ke
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;&#x4E00;&#x6B21;&#x7ED3;&#x5408;<code>v-if/v-else</code>&#x4E0E;<code>resetFields</code>&#x7ED3;&#x5408;&#x4F7F;&#x7528;<code>reset</code>&#x4E4B;&#x540E;&#x503C;&#x4E0D;&#x6B63;&#x5E38;&#xFF0C;&#x770B;&#x5B8C;&#x6E90;&#x7801;&#x63D0;&#x4E86;<code>issue</code>&#xFF0C;&#x7136;&#x540E;&#x88AB;&#x544A;&#x77E5;&#x7B54;&#x6848;&#x539F;&#x6765;&#x5C31;&#x5728;<code>vue</code>&#x6587;&#x6863;&#x91CC;&#xFF0C;&#x6253;&#x8138;&#x6253;&#x8138;&#xFF0C;&#x56E0;&#x6B64;&#x8BB0;&#x5F55;&#x4E00;&#x6B21;&#x4E0D;&#x770B;&#x6587;&#x6863;&#xFF0C;&#x5E76;&#x4E14;&#x51FA;&#x95EE;&#x9898;&#x4E0D;&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x627E;&#x6587;&#x6863;&#x7684;&#x6559;&#x8BAD;&#x3002;</p><h2 id="articleHeader1">&#x7ED3;&#x8BBA;</h2><ol><li><strong>&#x51E1;&#x4E8B;&#x5148;&#x4ECE;&#x6587;&#x6863;&#x4E0B;&#x624B;&#xFF0C;&#x7528;<code>element-ui</code>&#x4E0D;&#x662F;&#x5149;&#x770B;<code>element-ui</code>&#x7684;&#x6587;&#x6863;&#xFF0C;&#x8FD8;&#x8981;&#x770B;<code>vue</code>&#x6587;&#x6863;</strong></li><li><code>Form</code>&#x7EC4;&#x4EF6;<code>resetFields</code>&#x8DDF;<code>data</code>&#x503C;&#x6CA1;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#xFF0C;&#x53EA;&#x8DDF;<code>Form-Item</code>&#x521B;&#x5EFA;&#x65F6;&#x7684;&#x521D;&#x59CB;&#x503C;&#x6709;&#x5173;&#x3002;</li><li>&#x4F7F;&#x7528;<code>v-if/v-else</code>&#x65F6;&#xFF0C;&#x8981;&#x5148;&#x786E;&#x5B9A;&#x7EC4;&#x4EF6;&#x662F;&#x9700;&#x8981;&#x91CD;&#x65B0;&#x751F;&#x6210;&#xFF08;<a href="https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0" rel="nofollow noreferrer" target="_blank">&#x7528; key &#x7BA1;&#x7406;&#x53EF;&#x590D;&#x7528;&#x7684;&#x5143;&#x7D20;</a>&#xFF09;&#xFF0C;&#x8FD8;&#x662F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x66FF;&#x6362;&#xFF08;&#x65B0;&#x7EC4;&#x4EF6;&#x4F1A;&#x4F7F;&#x7528;&#x65E7;&#x7EC4;&#x4EF6;&#x7684;&#x521D;&#x59CB;&#x503C;&#xFF0C;&#x4E8B;&#x5B9E;&#x4E0A;&#x8FD9;&#x91CC;&#x65B0;&#x65E7;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x66F4;&#x6539;&#x4E86;&#x5C5E;&#x6027;&#xFF09;&#x3002;</li><li>&#x53EA;&#x6709;&#x542B;&#x6709;<code>prop</code>&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x4E14;&#x5F53;&#x524D;&#x5B58;&#x5728;&#x7684;&#x7EC4;&#x4EF6;&#x624D;&#x4F1A;<code>reset</code>&#x3002;</li><li>&#x5982;&#x679C;<code>Form</code>&#x7EC4;&#x4EF6;&#x4E0D;&#x662F;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x521B;&#x5EFA;&#xFF0C;&#x53EF;&#x4EE5;&#x7528;<code>nextTick</code>&#x7B49;&#x5F85;<code>Form/Form-Item</code>&#x7B2C;&#x4E00;&#x6B21;&#x521B;&#x5EFA;&#x5B8C;&#x518D;<code>resetFields</code>&#x3002;&#xFF08;&#x8FD9;&#x4E2A;&#x5176;&#x5B9E;&#x8DDF;&#x7EC4;&#x4EF6;&#x6CA1;&#x591A;&#x5927;&#x5173;&#x7CFB;&#xFF09;</li></ol><h2 id="articleHeader2">&#x4E8B;&#x6545;&#x73B0;&#x573A;</h2><p><a href="https://jsfiddle.net/s5ar1un3/39/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/s5ar1un3...</a><button class="btn btn-xs btn-default ml10 preview" data-url="s5ar1un3/39/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5207;&#x6362;&#x7EC4;&#x4EF6;&#x540E;&#xFF0C;&#x6267;&#x884C;<code>resetFields</code>&#x91CD;&#x7F6E;&#x503C;&#xFF0C;&#x7ED3;&#x679C;&#x91CD;&#x7F6E;&#x7684;&#x503C;&#x4E3A;<code>&#x522B;&#x7684;&#x7EC4;&#x4EF6;</code>&#x7ED1;&#x5B9A;&#x7684;&#x521D;&#x59CB;&#x503C;&#x3002;</p><h2 id="articleHeader3">&#x4E8B;&#x6545;&#x539F;&#x56E0;</h2><blockquote>Vue &#x4F1A;&#x5C3D;&#x53EF;&#x80FD;&#x9AD8;&#x6548;&#x5730;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x590D;&#x7528;&#x5DF2;&#x6709;&#x5143;&#x7D20;&#x800C;&#x4E0D;&#x662F;&#x4ECE;&#x5934;&#x5F00;&#x59CB;&#x6E32;&#x67D3;&#x3002;</blockquote><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F7F;&#x7528;<code>v-if/v-else</code>&#x65F6;&#xFF0C;&#x867D;&#x7136;&#x770B;&#x4F3C;&#x662F;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x5207;&#x6362;&#xFF0C;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x662F;1&#x4E2A;&#x7EC4;&#x4EF6;&#x5207;&#x6362;&#x4E86;&#x81EA;&#x8EAB;&#x7684;&#x5C5E;&#x6027;&#x3002;&#x4F46;&#x95EE;&#x9898;&#x7684;&#x5173;&#x952E;&#x662F;&#xFF0C;&#x5207;&#x6362;&#x4E86;<code>vue</code>&#x7684;&#x5C5E;&#x6027;&#xFF0C;<code>element-ui</code>&#x6DFB;&#x52A0;&#x7684;&#x5C5E;&#x6027;&#x6BD4;&#x5982;&#x521D;&#x59CB;&#x503C;&#x5E76;&#x6CA1;&#x6709;&#x6362;&#x3002;</p><h2 id="articleHeader4">&#x89E3;&#x51B3;</h2><p><a href="https://jsfiddle.net/s5ar1un3/41/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/s5ar1un3...</a><button class="btn btn-xs btn-default ml10 preview" data-url="s5ar1un3/41/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><blockquote>Vue &#x4E3A;&#x4F60;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x8868;&#x8FBE;&#x201C;&#x8FD9;&#x4E24;&#x4E2A;&#x5143;&#x7D20;&#x662F;&#x5B8C;&#x5168;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x4E0D;&#x8981;&#x590D;&#x7528;&#x5B83;&#x4EEC;&#x201D;&#x3002;&#x53EA;&#x9700;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x552F;&#x4E00;&#x503C;&#x7684; key &#x5C5E;&#x6027;&#x5373;&#x53EF;&#x3002;</blockquote><p>&#x5728;&#x4E8B;&#x6545;&#x73B0;&#x573A;&#x4E0A;&#x52A0;&#x4E0A;<code>key</code>&#x503C;&#x7ED1;&#x5B9A;&#x3002;<a href="https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0" rel="nofollow noreferrer" target="_blank">&#x7528; key &#x7BA1;&#x7406;&#x53EF;&#x590D;&#x7528;&#x7684;&#x5143;&#x7D20;</a></p><h2 id="articleHeader5">resetFields&#x8FC7;&#x7A0B;</h2><p><strong>form.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created() {
      this.$on(&apos;el.form.addField&apos;, (field) =&gt; {
        if (field) {
          this.fields.push(field);
        }
      }
      
      this.$on(&apos;el.form.removeField&apos;, (field) =&gt; {
        if (field.prop) {
          this.fields.splice(this.fields.indexOf(field), 1);
        }

      });
}

resetFields() {
        ...
        
        this.fields.forEach(field =&gt; {
          field.resetField();
        });
      }," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>created() {
      <span class="hljs-keyword">this</span>.$<span class="hljs-literal">on</span>(<span class="hljs-string">&apos;el.form.addField&apos;</span>, <span class="hljs-function"><span class="hljs-params">(field)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (field) {
          <span class="hljs-keyword">this</span>.fields.push(field);
        }
      }
      
      <span class="hljs-keyword">this</span>.$<span class="hljs-literal">on</span>(<span class="hljs-string">&apos;el.form.removeField&apos;</span>, <span class="hljs-function"><span class="hljs-params">(field)</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (field.prop) {
          <span class="hljs-keyword">this</span>.fields.splice(<span class="hljs-keyword">this</span>.fields.indexOf(field), <span class="hljs-number">1</span>);
        }

      });
}

resetFields() {
        ...
        
        <span class="hljs-keyword">this</span>.fields.forEach(field =&gt; {
          field.resetField();
        });
      },</code></pre><p><strong>form-item.vue</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    mounted() {
        if (this.prop) {
            this.dispatch(&apos;ElForm&apos;, &apos;el.form.addField&apos;, [this]);
            ...
            
            let initialValue = this.fieldValue;
            
            ...
            
            Object.defineProperty(this, &apos;initialValue&apos;, {
              value: initialValue
            });
            ...
        }
    }

    beforeDestroy() {
      this.dispatch(&apos;ElForm&apos;, &apos;el.form.removeField&apos;, [this]);
    }

    resetField() {
        ...

        this.validateDisabled = true;
        if (Array.isArray(value)) {
          prop.o[prop.k] = [].concat(this.initialValue);
        } else {
          prop.o[prop.k] = this.initialValue;
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>    mounted() {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.prop) {
            <span class="hljs-keyword">this</span>.dispatch(<span class="hljs-string">&apos;ElForm&apos;</span>, <span class="hljs-string">&apos;el.form.addField&apos;</span>, [<span class="hljs-keyword">this</span>]);
            ...
            
            let initialValue = <span class="hljs-keyword">this</span>.fieldValue;
            
            ...
            
            Object.defineProperty(<span class="hljs-keyword">this</span>, <span class="hljs-string">&apos;initialValue&apos;</span>, {
              value: initialValue
            });
            ...
        }
    }

    beforeDestroy() {
      <span class="hljs-keyword">this</span>.dispatch(<span class="hljs-string">&apos;ElForm&apos;</span>, <span class="hljs-string">&apos;el.form.removeField&apos;</span>, [<span class="hljs-keyword">this</span>]);
    }

    resetField() {
        ...

        <span class="hljs-keyword">this</span>.validateDisabled = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">if</span> (Array.isArray(value)) {
          prop.o[prop.k] = [].concat(<span class="hljs-keyword">this</span>.initialValue);
        } <span class="hljs-keyword">else</span> {
          prop.o[prop.k] = <span class="hljs-keyword">this</span>.initialValue;
        }
    }</code></pre><ol><li><code>Form</code>&#x5728;<code>created</code>&#x9636;&#x6BB5;&#x521B;&#x5EFA;&#x76D1;&#x542C;&#xFF0C;&#x4FDD;&#x5B58;&#x4E0B;&#x5F53;&#x524D;<code>Form-Item</code>&#x3002;</li><li><code>Form-Item</code>&#x5728;<code>mounted</code>&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B58;&#x5728;<code>prop</code>&#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x8BBE;&#x7F6E;&#x597D;&#x521D;&#x59CB;&#x503C;&#x3002;</li><li><code>Form</code>&#x7EC4;&#x4EF6;<code>resetFields</code>&#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x6CE8;&#x518C;&#x4E0A;&#x6765;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;<code>Form-Item</code>&#x7684;<code>resetField</code>&#x65B9;&#x6CD5;&#x3002;</li><li><code>Form-Item</code>&#x7684;<code>resetField</code>&#x65B9;&#x6CD5;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#x4E3A;<code>this.initialValue</code>&#x3002;&#xFF08;&#x4E4B;&#x524D;&#x4E8B;&#x6545;&#x539F;&#x56E0;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x5C5E;&#x6027;&#x66F4;&#x65B0;<code>initialValue</code>&#x503C;&#x662F;&#x4E0D;&#x4F1A;&#x53D8;&#x7684;&#xFF09;</li></ol><h2 id="articleHeader6">&#x53C2;&#x8003;</h2><p><a href="https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0" rel="nofollow noreferrer" target="_blank"></a><a href="https://cn.vuejs.org/v2/guide/conditional.html#%E7%94%A8-key-%E7%AE%A1%E7%90%86%E5%8F%AF%E5%A4%8D%E7%94%A8%E7%9A%84%E5%85%83%E7%B4%A0" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide...</a></p><p><a href="https://github.com/ElemeFE/element/issues/11534" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/ElemeFE/element/issues/11534" rel="nofollow noreferrer" target="_blank">https://github.com/ElemeFE/el...</a></p><p><a href="http://element-cn.eleme.io/#/zh-CN/component/form" rel="nofollow noreferrer" target="_blank"></a><a href="http://element-cn.eleme.io/#/zh-CN/component/form" rel="nofollow noreferrer" target="_blank">http://element-cn.eleme.io/#/...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ElementUI Form resetFields

## 原文链接
[https://segmentfault.com/a/1190000015228092](https://segmentfault.com/a/1190000015228092)

