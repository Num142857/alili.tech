---
title: 'vue使用Element组件时v-for循环里的表单项验证' 
date: 2018-11-26 2:30:09
hidden: true
slug: 7bmgvvvdsxo
categories: [reprint]
---

{{< raw >}}
<p>&#x6807;&#x9898;&#x63CF;&#x8FF0;&#x770B;&#x8D77;&#x6765;&#x6709;&#x4E9B;&#x590D;&#x6742;&#xFF0C;&#x6709;<code>vue</code>&#xFF0C;<code>Element</code>&#xFF0C;&#x53C8;&#x6709;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#xFF0C;&#x8FD8;&#x6709;<code>v-for</code>&#x5FAA;&#x73AF;&#xFF1F;&#x662F;&#x4E0D;&#x662F;&#x6709;&#x70B9;&#x4E71;&#xFF1F;&#x4E0D;&#x8FC7;&#x6211;&#x76F8;&#x4FE1;&#x5F00;&#x53D1;&#x4E2D;&#x9047;&#x5230;&#x8FC7;&#x6B64;&#x95EE;&#x9898;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x4E00;&#x770B;&#x5C31;&#x660E;&#x767D;&#x6211;&#x8BF4;&#x7684;&#x610F;&#x601D;&#x4E86;&#x3002;</p><p>&#x9996;&#x5148;<code>Element</code>&#x7EC4;&#x4EF6;&#x6709;&#x4E00;&#x5957;&#x5B8C;&#x5584;&#x7684;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x65B9;&#x6CD5;&#xFF0C;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x5199;&#x7684;&#x4E5F;&#x5F88;&#x6E05;&#x695A;&#xFF1A;<a href="http://element-cn.eleme.io/#/zh-CN/component/form#biao-dan-yan-zheng" rel="nofollow noreferrer" target="_blank">Element&#x8868;&#x5355;&#x9A8C;&#x8BC1;API</a>&#xFF0C;&#x6B63;&#x5E38;&#x6309;&#x7167;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x6DFB;&#x52A0;<code>rules</code>&#x89C4;&#x5219;&#xFF0C;&#x9700;&#x8981;&#x9A8C;&#x8BC1;&#x7684;&#x8868;&#x5355;&#x9879;&#x8BBE;&#x7F6E;<code>prop</code>&#xFF0C;&#x7136;&#x540E;&#x63D0;&#x4EA4;&#x8868;&#x5355;&#x65F6;&#x901A;&#x8FC7;<code>form</code>&#x7684;<code>validate</code>&#x65B9;&#x6CD5;&#x9A8C;&#x8BC1;&#x8868;&#x5355;&#x9879;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#x3002;</p><p>&#x7136;&#x9E45;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x5982;&#x679C;&#x8868;&#x5355;&#x9879;&#x91CC;&#x6709;&#x901A;&#x8FC7;<code>v-for</code>&#x52A8;&#x6001;&#x751F;&#x6210;&#x7684;&#x8868;&#x5355;&#x9879;&#xFF0C;&#x5982;&#x4F55;&#x8BBE;&#x7F6E;&#x9A8C;&#x8BC1;&#x5462;&#xFF1F;&#x8FD9;&#x4E2A;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x5E76;&#x6CA1;&#x6709;&#x660E;&#x786E;&#x7684;&#x8BF4;&#x6CD5;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x67E5;&#x627E;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x548C;&#x5B9E;&#x9645;&#x9A8C;&#x8BC1;&#xFF0C;&#x603B;&#x7ED3;&#x51FA;&#x6765;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5982;&#x4E0B;&#x3002;</p><p><em>*&#x672C;&#x6559;&#x7A0B;&#x5199;&#x5B8C;&#x4EE5;&#x540E;&#x518D;&#x67E5;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x53D1;&#x73B0;&#x5176;&#x5B9E;<strong>&#x5DF2;&#x7ECF;&#x6709;&#x5B98;&#x65B9;demo&#x4E86;</strong>[&#x6342;&#x8138;]&#xFF0C;&#x4E0D;&#x8FC7;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x9690;&#x85CF;&#x7684;&#x4E0D;&#x6613;&#x53D1;&#x73B0;&#xFF0C;&#x53C2;&#x89C1;-&gt;<a href="http://element-cn.eleme.io/#/zh-CN/component/form#dong-tai-zeng-jian-biao-dan-xiang" rel="nofollow noreferrer" target="_blank">&#x52A8;&#x6001;&#x589E;&#x51CF;&#x8868;&#x5355;&#x9879;</a>&#xFF0C;&#x5E76;&#x4E14;&#x6211;&#x7684;&#x65B9;&#x6CD5;&#x66F4;&#x4F18;&#x5316;&#x7B80;&#x6D01;&#x4E00;&#x4E9B;</em></p><p>&#x9996;&#x5148;&#x662F;&#x5FAA;&#x73AF;&#x8868;&#x5355;&#x9879;&#x6CA1;&#x6709;&#x52A0;&#x9A8C;&#x8BC1;&#x4E4B;&#x524D;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div class=&quot;content-body&quot;&gt;
    &lt;el-form ref=&quot;form&quot; :model=&quot;form&quot; :rules=&quot;rules&quot; label-width=&quot;120px&quot;&gt;
      &lt;el-row :gutter=&quot;10&quot;&gt;
        &lt;el-col :span=&quot;12&quot; :offset=&quot;0&quot;&gt;
          &lt;el-form-item label=&quot;&#x5957;&#x9910;&#x540D;&#x79F0;&#xFF1A;&quot; prop=&quot;activityName&quot; id=&quot;activityName&quot;&gt;
            &lt;el-input v-model=&quot;form.activityName&quot;&gt;&lt;/el-input&gt;
          &lt;/el-form-item&gt;
        &lt;/el-col&gt;
      &lt;/el-row&gt;
      &lt;el-row :gutter=&quot;10&quot;&gt;
        &lt;el-col :span=&quot;12&quot;&gt;
          &lt;el-form-item label=&quot;&#x72B6;&#x6001;&#xFF1A;&quot;&gt;
            &lt;el-radio v-model=&quot;form.status&quot; label=&quot;1&quot;&gt;&#x4E0A;&#x7EBF;&lt;/el-radio&gt;
            &lt;el-radio v-model=&quot;form.status&quot; label=&quot;0&quot;&gt;&#x4E0B;&#x7EBF;&lt;/el-radio&gt;
          &lt;/el-form-item&gt;
        &lt;/el-col&gt;
      &lt;/el-row&gt;
      &lt;el-row :gutter=&quot;10&quot;&gt;
        &lt;el-col :span=&quot;2&quot; style=&quot;width:120px;&quot;&gt;
          &lt;div class=&quot;sub-title&quot;&gt;&#x68AF;&#x5EA6;&#x8BBE;&#x7F6E;&#xFF1A;&lt;/div&gt;
        &lt;/el-col&gt;
        &lt;el-col :span=&quot;20&quot;&gt;
            &lt;el-row :gutter=&quot;10&quot; v-for=&quot;(item,index) in form.productGroup&quot; :key=&quot;index&quot;&gt;
              &lt;el-col :span=&quot;6&quot;&gt;
                &lt;el-form-item label=&quot;&#x5546;&#x54C1;&#x6570;&#x91CF;:&quot;&gt;
                  &lt;el-input v-model=&quot;item.num&quot; type=&quot;number&quot; size=&quot;small&quot; style=&quot;width:80px;&quot;&gt;&lt;/el-input&gt;
                &lt;/el-form-item&gt;
              &lt;/el-col&gt;
              &lt;el-col :span=&quot;6&quot;&gt;
                &lt;el-form-item label=&quot;&#x4F18;&#x60E0;&#x4EF7;&#x683C;:&quot;&gt;
                   &lt;el-input v-model=&quot;item.price&quot; type=&quot;number&quot; size=&quot;small&quot; style=&quot;width:80px;&quot;&gt;&lt;/el-input&gt;
                &lt;/el-form-item&gt;
              &lt;/el-col&gt;
              &lt;el-col :span=&quot;4&quot;&gt;
                &lt;i class=&quot;el-icon-remove-outline&quot; @click=&quot;deleteLadder(index)&quot;&gt;&lt;/i&gt;&amp;nbsp;&amp;nbsp;
                &lt;i class=&quot;el-icon-circle-plus-outline&quot; @click=&quot;addLadder&quot; v-if=&quot;index==0&quot;&gt;&lt;/i&gt;
              &lt;/el-col&gt;
            &lt;/el-row&gt;
        &lt;/el-col&gt;
      &lt;/el-row&gt;
      &lt;el-form-item size=&quot;medium&quot; class=&quot;div-submit&quot;&gt;
        &lt;el-button @click=&quot;resetForm(&apos;form&apos;)&quot;&gt;&#x53D6;&#x6D88;&lt;/el-button&gt;
        &lt;el-button type=&quot;primary&quot; @click=&quot;submitForm(&apos;form&apos;)&quot;&gt;&#x63D0;&#x4EA4;&lt;/el-button&gt;
      &lt;/el-form-item&gt;
    &lt;/el-form&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
/* eslint-disable */
export default {
  data() {
    return {
      form: {
        activityName: &apos;&apos;,
        status: &apos;1&apos;,
        productGroup: [{num:&quot;&quot;,price:&quot;&quot;}]
      },
      rules: {
        activityName: [
          { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x5957;&#x9910;&#x540D;&#x79F0;&apos;, trigger: &apos;blur&apos; }
        ]
      }
    }
  },
  methods: {
    deleteLadder(index)
    {
      if(this.form.productGroup.length&gt;1){
        this.form.productGroup.splice(index,1);
      }
    },
    addLadder()
    {
      this.form.productGroup.push({num:&quot;&quot;,price:&quot;&quot;});
    },
    submitForm(formName)
    {
      this.$refs[formName].validate((valid,obj) =&gt; {
        if (valid) {
          this.submitFormAction();
        } else {
          this.$message.error(&quot;&#x9A8C;&#x8BC1;&#x4E0D;&#x901A;&#x8FC7;&quot;);
        }
      });
    },
    submitFormAction()
    {
      this.$message.success(&quot;&#x63D0;&#x4EA4;&#x6210;&#x529F;&quot;);
    },
    resetForm(formName)
    {
      this.$refs[formName].resetFields();
      this.form.productGroup = [{num:&quot;&quot;,price:&quot;&quot;}];
    }
  }
}

&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;content-body&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-form</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;form&quot;</span> <span class="hljs-attr">:model</span>=<span class="hljs-string">&quot;form&quot;</span> <span class="hljs-attr">:rules</span>=<span class="hljs-string">&quot;rules&quot;</span> <span class="hljs-attr">label-width</span>=<span class="hljs-string">&quot;120px&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">:gutter</span>=<span class="hljs-string">&quot;10&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;12&quot;</span> <span class="hljs-attr">:offset</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x5957;&#x9910;&#x540D;&#x79F0;&#xFF1A;&quot;</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">&quot;activityName&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;activityName&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;form.activityName&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">:gutter</span>=<span class="hljs-string">&quot;10&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;12&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x72B6;&#x6001;&#xFF1A;&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;form.status&quot;</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;1&quot;</span>&gt;</span>&#x4E0A;&#x7EBF;<span class="hljs-tag">&lt;/<span class="hljs-name">el-radio</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-radio</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;form.status&quot;</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;0&quot;</span>&gt;</span>&#x4E0B;&#x7EBF;<span class="hljs-tag">&lt;/<span class="hljs-name">el-radio</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">:gutter</span>=<span class="hljs-string">&quot;10&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;2&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:120px;&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;sub-title&quot;</span>&gt;</span>&#x68AF;&#x5EA6;&#x8BBE;&#x7F6E;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;20&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">el-row</span> <span class="hljs-attr">:gutter</span>=<span class="hljs-string">&quot;10&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(item,index) in form.productGroup&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;index&quot;</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;6&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x5546;&#x54C1;&#x6570;&#x91CF;:&quot;</span>&gt;</span>
                  <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;item.num&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;small&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:80px;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;6&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">label</span>=<span class="hljs-string">&quot;&#x4F18;&#x60E0;&#x4EF7;&#x683C;:&quot;</span>&gt;</span>
                   <span class="hljs-tag">&lt;<span class="hljs-name">el-input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;item.price&quot;</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;number&quot;</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;small&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;width:80px;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">el-input</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">el-col</span> <span class="hljs-attr">:span</span>=<span class="hljs-string">&quot;4&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;el-icon-remove-outline&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;deleteLadder(index)&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>&amp;nbsp;&amp;nbsp;
                <span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;el-icon-circle-plus-outline&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;addLadder&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;index==0&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">el-col</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-row</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">el-form-item</span> <span class="hljs-attr">size</span>=<span class="hljs-string">&quot;medium&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;div-submit&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;resetForm(&apos;form&apos;)&quot;</span>&gt;</span>&#x53D6;&#x6D88;<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;primary&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;submitForm(&apos;form&apos;)&quot;</span>&gt;</span>&#x63D0;&#x4EA4;<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">el-form-item</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-form</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-comment">/* eslint-disable */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">form</span>: {
        <span class="hljs-attr">activityName</span>: <span class="hljs-string">&apos;&apos;</span>,
        <span class="hljs-attr">status</span>: <span class="hljs-string">&apos;1&apos;</span>,
        <span class="hljs-attr">productGroup</span>: [{<span class="hljs-attr">num</span>:<span class="hljs-string">&quot;&quot;</span>,<span class="hljs-attr">price</span>:<span class="hljs-string">&quot;&quot;</span>}]
      },
      <span class="hljs-attr">rules</span>: {
        <span class="hljs-attr">activityName</span>: [
          { <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&#x8BF7;&#x8F93;&#x5165;&#x5957;&#x9910;&#x540D;&#x79F0;&apos;</span>, <span class="hljs-attr">trigger</span>: <span class="hljs-string">&apos;blur&apos;</span> }
        ]
      }
    }
  },
  <span class="hljs-attr">methods</span>: {
    deleteLadder(index)
    {
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.form.productGroup.length&gt;<span class="hljs-number">1</span>){
        <span class="hljs-keyword">this</span>.form.productGroup.splice(index,<span class="hljs-number">1</span>);
      }
    },
    addLadder()
    {
      <span class="hljs-keyword">this</span>.form.productGroup.push({<span class="hljs-attr">num</span>:<span class="hljs-string">&quot;&quot;</span>,<span class="hljs-attr">price</span>:<span class="hljs-string">&quot;&quot;</span>});
    },
    submitForm(formName)
    {
      <span class="hljs-keyword">this</span>.$refs[formName].validate(<span class="hljs-function">(<span class="hljs-params">valid,obj</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (valid) {
          <span class="hljs-keyword">this</span>.submitFormAction();
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">this</span>.$message.error(<span class="hljs-string">&quot;&#x9A8C;&#x8BC1;&#x4E0D;&#x901A;&#x8FC7;&quot;</span>);
        }
      });
    },
    submitFormAction()
    {
      <span class="hljs-keyword">this</span>.$message.success(<span class="hljs-string">&quot;&#x63D0;&#x4EA4;&#x6210;&#x529F;&quot;</span>);
    },
    resetForm(formName)
    {
      <span class="hljs-keyword">this</span>.$refs[formName].resetFields();
      <span class="hljs-keyword">this</span>.form.productGroup = [{<span class="hljs-attr">num</span>:<span class="hljs-string">&quot;&quot;</span>,<span class="hljs-attr">price</span>:<span class="hljs-string">&quot;&quot;</span>}];
    }
  }
}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x9996;&#x5148;&#x662F;&#x6DFB;&#x52A0;rules&#x89C4;&#x5219;&#xFF0C;&#x8FD9;&#x4E2A;&#x548C;&#x6B63;&#x5E38;&#x6DFB;&#x52A0;&#x89C4;&#x5219;&#x4E00;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="productGroupRules: {
  productGroupNum: [{required: true, message: &apos;&#x8BF7;&#x586B;&#x5199;&#x5546;&#x54C1;&#x6570;&#x91CF;&apos;, trigger: &apos;blur&apos;}],
  productGroupPrice: [{required: true, message: &apos;&#x8BF7;&#x586B;&#x5199;&#x4F18;&#x60E0;&#x4EF7;&#x683C;&apos;, trigger: &apos;blur&apos;}]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-string">productGroupRules:</span> {
<span class="hljs-symbol">  productGroupNum:</span> [{<span class="hljs-string">required:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">message:</span> <span class="hljs-string">&apos;&#x8BF7;&#x586B;&#x5199;&#x5546;&#x54C1;&#x6570;&#x91CF;&apos;</span>, <span class="hljs-string">trigger:</span> <span class="hljs-string">&apos;blur&apos;</span>}],
<span class="hljs-symbol">  productGroupPrice:</span> [{<span class="hljs-string">required:</span> <span class="hljs-literal">true</span>, <span class="hljs-string">message:</span> <span class="hljs-string">&apos;&#x8BF7;&#x586B;&#x5199;&#x4F18;&#x60E0;&#x4EF7;&#x683C;&apos;</span>, <span class="hljs-string">trigger:</span> <span class="hljs-string">&apos;blur&apos;</span>}]
}</code></pre><p>&#x7136;&#x540E;&#x7ED9;&#x8868;&#x5355;&#x9879;&#x6DFB;&#x52A0;&#x9A8C;&#x8BC1;&#xFF0C;&#x4EE5;&#x5546;&#x54C1;&#x6570;&#x91CF;&#x4E3A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;el-form-item label=&quot;&#x5546;&#x54C1;&#x6570;&#x91CF;:&quot; :prop=&quot;`productGroup.${index}.num`&quot; :rules=&quot;productGroupRules.productGroupNum&quot;&gt;
  &lt;el-input v-model=&quot;item.num&quot; type=&quot;number&quot; size=&quot;small&quot; style=&quot;width:80px;&quot;&gt;&lt;/el-input&gt;
&lt;/el-form-item&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&lt;el-<span class="hljs-keyword">form</span>-item <span class="hljs-keyword">label</span>=<span class="hljs-string">&quot;&#x5546;&#x54C1;&#x6570;&#x91CF;:&quot;</span> :<span class="hljs-keyword">prop</span>=<span class="hljs-string">&quot;`productGroup.${index}.num`&quot;</span> :rules=<span class="hljs-string">&quot;productGroupRules.productGroupNum&quot;</span>&gt;
  &lt;el-<span class="hljs-keyword">input</span> v-model=<span class="hljs-string">&quot;item.num&quot;</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;number&quot;</span> size=<span class="hljs-string">&quot;small&quot;</span> style=<span class="hljs-string">&quot;width:80px;&quot;</span>&gt;&lt;/el-<span class="hljs-keyword">input</span>&gt;
&lt;/el-<span class="hljs-keyword">form</span>-item&gt;</code></pre><p>&#x6CE8;&#x610F;&#x8FD9;&#x91CC;<code>:rules</code>&#x662F;&#x6BCF;&#x4E2A;&#x8868;&#x5355;&#x9879;&#x90FD;&#x8981;&#x6DFB;&#x52A0;&#xFF0C;&#x6709;&#x591A;&#x4E2A;&#x7684;&#x8BDD;&#x7528;<code>productGroupRules.productGroupNum</code>&#x8FD9;&#x6837;&#x7684;&#x5F62;&#x5F0F;&#x533A;&#x5206;&#xFF0C;&#x5BF9;&#x5E94;&#x4E0A;&#x9762;<code>productGroupRules</code>&#x91CC;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x53E6;&#x5916;&#x4E3B;&#x8981;&#x5C31;&#x662F;<code>:prop</code>&#x4E86;&#xFF0C;&#x6CE8;&#x610F;&#x6B63;&#x5E38;&#x9A8C;&#x8BC1;&#x8868;&#x5355;&#x9879;&#x662F;<code>prop</code>&#xFF0C;&#x800C;&#x8FD9;&#x91CC;&#x662F;<code>:prop</code>&#x3002;<br><code>:prop=&quot;`productGroup.${index}.num`&quot;</code>&#x662F;&#x62FC;&#x63A5;&#x7684;&#x5F62;&#x5F0F;&#xFF08;&#x6B64;&#x5904;&#x6309; <em>&#x5317;&#x6708;&#x6B66;&#x58EB;</em> &#x7684;&#x5EFA;&#x8BAE;&#x4FEE;&#x6539;&#x4E86;&#xFF0C;&#x8C22;&#x8C22; <em>&#x5317;&#x6708;&#x6B66;&#x58EB;</em>&#xFF09;&#xFF0C;&#x524D;&#x9762;&#x662F;<code>v-for</code>&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x7EC4;&#xFF0C;&#x4E2D;&#x95F4;&#x662F;&#x6570;&#x7EC4;&#x7D22;&#x5F15;<code>index</code>&#xFF0C;&#x6700;&#x540E;&#x662F;&#x8868;&#x5355;&#x9879;&#x7ED1;&#x5B9A;&#x7684;<code>v-model</code>&#x7684;&#x540D;&#x79F0;&#xFF0C;&#x7136;&#x540E;&#x7528;&#x70B9;<code>.</code>&#x628A;&#x5B83;&#x4EEC;&#x8FDE;&#x63A5;&#x8D77;&#x6765;&#x3002;&#x8FD9;&#x4E09;&#x9879;&#x90FD;&#x5FC5;&#x987B;&#x4FDD;&#x8BC1;&#x6B63;&#x786E;&#xFF0C;&#x9519;&#x4E00;&#x4E2A;&#x90FD;&#x65E0;&#x6CD5;&#x9A8C;&#x8BC1;&#x3002;&#x53E6;&#x5916;&#x8981;&#x6CE8;&#x610F;<code>&quot;`productGroup.${index}.num`&quot;</code>&#x8FD9;&#x91CC;&#x662F;<code>`</code>&#x53CD;&#x5F15;&#x53F7;&#x800C;&#x4E0D;&#x662F;<code>&apos;</code>&#x5355;&#x5F15;&#x53F7;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x91CC;&#x662F;ES6&#x6A21;&#x677F;&#x5B57;&#x7B26;&#x4E32;&#x7528;&#x6CD5;&#x3002;</p><p>&#x53E6;&#x5916;&#x5C31;&#x662F;&#x8981;&#x6CE8;&#x610F;&#xFF0C;<code>v-for</code>&#x7ED1;&#x5B9A;&#x7684;&#x6570;&#x7EC4;&#x4E5F;&#x5FC5;&#x987B;&#x7ED1;&#x5B9A;&#x5728;form&#x5BF9;&#x8C61;&#x91CC;&#xFF0C;&#x6CE8;&#x610F;&#x4E0A;&#x9762;&#x7684;<code>data</code>&#x91CC;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="form: {
  activityName: &apos;&apos;,
  status: &apos;1&apos;,
  productGroup: [{num:&quot;&quot;,price:&quot;&quot;}]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-attribute">form</span>: {
  <span class="hljs-attribute">activityName</span>: <span class="hljs-string">&apos;&apos;</span>,
  <span class="hljs-attribute">status</span>: <span class="hljs-string">&apos;1&apos;</span>,
  <span class="hljs-attribute">productGroup</span>: [{<span class="hljs-attribute">num</span>:<span class="hljs-string">&quot;&quot;</span>,<span class="hljs-attribute">price</span>:<span class="hljs-string">&quot;&quot;</span>}]
}</code></pre><p>&#x5982;&#x679C;&#x662F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="form: {
  activityName: &apos;&apos;,
  status: &apos;1&apos;
},
productGroup: [{num:&quot;&quot;,price:&quot;&quot;}]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-attribute">form</span>: {
  <span class="hljs-attribute">activityName</span>: <span class="hljs-string">&apos;&apos;</span>,
  <span class="hljs-attribute">status</span>: <span class="hljs-string">&apos;1&apos;</span>
},
<span class="hljs-attribute">productGroup</span>: [{<span class="hljs-attribute">num</span>:<span class="hljs-string">&quot;&quot;</span>,<span class="hljs-attribute">price</span>:<span class="hljs-string">&quot;&quot;</span>}]</code></pre><p>&#x662F;&#x65E0;&#x6CD5;&#x9A8C;&#x8BC1;&#x7684;&#xFF0C;&#x8FD9;&#x4E00;&#x70B9;&#x4E5F;&#x8981;&#x6CE8;&#x610F;&#x3002;</p><p>&#x597D;&#x4E86;&#xFF0C;&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x89E3;&#x51B3;<code>vue</code>&#x4F7F;&#x7528;<code>Element</code>&#x7EC4;&#x4EF6;&#x65F6;<code>v-for</code>&#x5FAA;&#x73AF;&#x91CC;&#x7684;&#x8868;&#x5355;&#x9879;&#x9A8C;&#x8BC1;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x4E86;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x5E2E;&#x52A9;&#x5230;&#x9047;&#x5230;&#x6B64;&#x95EE;&#x9898;&#x7684;&#x540C;&#x5B66;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue使用Element组件时v-for循环里的表单项验证

## 原文链接
[https://segmentfault.com/a/1190000015408632](https://segmentfault.com/a/1190000015408632)

