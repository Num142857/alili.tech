---
title: 'Angular —— Reactive Forms' 
date: 2018-11-23 2:30:11
hidden: true
slug: qjnhpdqf3h
categories: [reprint]
---

{{< raw >}}
<p>&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x662F;&#x5728;&#x7EC4;&#x4EF6;&#x7C7B;&#x4E2D;&#x7F16;&#x5199;&#x903B;&#x8F91;&#xFF0C;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF0C;&#x8FD9;&#x4E0E;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x5B8C;&#x6210;&#x63A7;&#x5236;&#x7684;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x5F0F;&#x8868;&#x5355;&#x4E0D;&#x540C;&#x3002;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x53CD;&#x5E94;&#x5F62;&#x5F0F;&#x662F;&#x7075;&#x6D3B;&#x7684;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x4EFB;&#x4F55;&#x590D;&#x6742;&#x7684;&#x5F62;&#x5F0F;&#x573A;&#x666F;&#x3002; &#x6211;&#x4EEC;&#x7F16;&#x5199;&#x66F4;&#x591A;&#x7684;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#x548C;&#x66F4;&#x5C11;&#x7684;HTML&#x4EE3;&#x7801;&#xFF0C;&#x4F7F;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x66F4;&#x5BB9;&#x6613;&#x3002;</p><h1 id="articleHeader0">Form base and interface</h1><h2 id="articleHeader1">Form base</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate&gt;
  &lt;label&gt;
    &lt;span&gt;Full name&lt;/span&gt;
    &lt;input
      type=&quot;text&quot;
      name=&quot;name&quot;
      placeholder=&quot;Your full name&quot;&gt;
  &lt;/label&gt;
  &lt;div&gt;
    &lt;label&gt;
      &lt;span&gt;Email address&lt;/span&gt;
      &lt;input
        type=&quot;email&quot;
        name=&quot;email&quot;
        placeholder=&quot;Your email address&quot;&gt;
    &lt;/label&gt;
    &lt;label&gt;
      &lt;span&gt;Confirm address&lt;/span&gt;
      &lt;input
        type=&quot;email&quot;
        name=&quot;confirm&quot;
        placeholder=&quot;Confirm your email address&quot;&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type=&quot;submit&quot;&gt;Sign up&lt;/button&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Full name<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;name&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your full name&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Email address<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your email address&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Confirm address<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;confirm&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Confirm your email address&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Sign up<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x8981;&#x5B9E;&#x73B0;&#x7684;&#x529F;&#x80FD;&#x5982;&#x4E0B;&#xFF1A;</p><ul><li>&#x7ED1;&#x5B9A; name&#x3001;email&#x3001;confirm &#x8F93;&#x5165;&#x6846;&#x7684;&#x503C;</li><li>&#x4E3A;&#x6240;&#x6709;&#x8F93;&#x5165;&#x6846;&#x6DFB;&#x52A0;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x529F;&#x80FD;</li><li>&#x663E;&#x793A;&#x9A8C;&#x8BC1;&#x5F02;&#x5E38;&#x4FE1;&#x606F;</li><li>&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;&#x8FDB;&#x884C;&#x8868;&#x5355;&#x63D0;&#x4EA4;</li><li>&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x529F;&#x80FD;</li></ul><h2 id="articleHeader2">User interface</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// signup.interface.ts
export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-comment">// signup.interface.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">interface</span> User {
  name: <span class="hljs-built_in">string</span>;
  account: {
    email: <span class="hljs-built_in">string</span>;
    confirm: <span class="hljs-built_in">string</span>;
  }
}</code></pre><h1 id="articleHeader3">ngModule and reactive forms</h1><p>&#x5728;&#x6211;&#x4EEC;&#x7EE7;&#x7EED;&#x6DF1;&#x5165;&#x4ECB;&#x7ECD; reactive forms &#x8868;&#x5355;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x5728; @NgModule &#x4E2D;&#x5BFC;&#x5165; @angular/forms &#x5E93;&#x4E2D;&#x7684; ReactiveFormsModule&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ReactiveFormsModule } from &apos;@angular/forms&apos;;

@NgModule({
  imports: [
    ...,
    ReactiveFormsModule
  ],
  declarations: [...],
  bootstrap: [...]
})
export class AppModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> { ReactiveFormsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/forms&apos;</span>;

@NgModule({
  imports: [
    ...,
    ReactiveFormsModule
  ],
  declarations: [...],
  bootstrap: [...]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre><blockquote>&#x53CB;&#x60C5;&#x63D0;&#x793A;&#xFF1A;&#x82E5;&#x4F7F;&#x7528; reactive forms&#xFF0C;&#x5219;&#x5BFC;&#x5165; ReactiveFormsModule&#xFF1B;&#x82E5;&#x4F7F;&#x7528; template-driven &#x8868;&#x5355;&#xFF0C;&#x5219;&#x5BFC;&#x5165; FormsModule&#x3002;</blockquote><h1 id="articleHeader4">Reactive approach</h1><p>&#x6211;&#x4EEC;&#x5C06;&#x57FA;&#x4E8E;&#x4E0A;&#x9762;&#x7684;&#x5B9A;&#x4E49;&#x7684;&#x57FA;&#x7840;&#x8868;&#x5355;&#xFF0C;&#x521B;&#x5EFA; SignupFormComponent &#xFF1A;</p><p>signup-form.component.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from &apos;@angular/core&apos;;

@Component({
  selector: &apos;signup-form&apos;,
  template: `
    &lt;form novalidate&gt;...&lt;/form&gt;
  `
})
export class SignupFormComponent {
  constructor() {}
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">&apos;signup-form&apos;</span>,
  template: <span class="hljs-string">`
    &lt;form novalidate&gt;...&lt;/form&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SignupFormComponent {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {}
}</code></pre><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x7840;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E0A;&#x8FF0;&#x529F;&#x80FD;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5148;&#x4ECB;&#x7ECD; FormControl&#x3001;FormGroup&#x3001;FormBuilder &#x7684;&#x6982;&#x5FF5;&#x548C;&#x4F7F;&#x7528;&#x3002;</p><h1 id="articleHeader5">FormControl and FormGroup</h1><p>&#x6211;&#x4EEC;&#x5148;&#x6765;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B; FormControl &#x548C; FormGroup &#x7684;&#x6982;&#x5FF5;&#xFF1A;</p><blockquote>FormControl - &#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x4E3A;&#x5355;&#x4E2A;&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x63D0;&#x4F9B;&#x652F;&#x6301;&#x7684;&#x7C7B;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x8DDF;&#x8E2A;&#x63A7;&#x4EF6;&#x7684;&#x503C;&#x548C;&#x9A8C;&#x8BC1;&#x72B6;&#x6001;&#xFF0C;&#x6B64;&#x5916;&#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x7CFB;&#x5217;&#x516C;&#x5171;API&#x3002;</blockquote><p>&#x4F7F;&#x7528;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.myControl = new FormControl(&apos;&apos;);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code>ngOnInit() {
  <span class="hljs-built_in">this</span>.myControl = <span class="hljs-keyword">new</span> <span class="hljs-type">FormControl</span>(<span class="hljs-string">&apos;&apos;</span>);
}</code></pre><blockquote>FormGroup - &#x5305;&#x542B;&#x662F;&#x4E00;&#x7EC4; FormControl &#x5B9E;&#x4F8B;&#xFF0C;&#x53EF;&#x7528;&#x4E8E;&#x8DDF;&#x8E2A; FormControl &#x7EC4;&#x7684;&#x503C;&#x548C;&#x9A8C;&#x8BC1;&#x72B6;&#x6001;&#xFF0C;&#x6B64;&#x5916;&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x7CFB;&#x5217;&#x516C;&#x5171;API&#x3002;</blockquote><p>&#x4F7F;&#x7528;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.myGroup = new FormGroup({
    name: new FormControl(&apos;&apos;),
    location: new FormControl(&apos;&apos;)
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ngOnInit() {
  <span class="hljs-keyword">this</span>.myGroup = <span class="hljs-keyword">new</span> FormGroup({
    name: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>),
    location: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>)
  });
}</code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x4E86; FormControl &#x548C; FormGroup &#x5B9E;&#x4F8B;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate [formGroup]=&quot;myGroup&quot;&gt;
  Name: &lt;input type=&quot;text&quot; formControlName=&quot;name&quot;&gt;
  Location: &lt;input type=&quot;text&quot; formControlName=&quot;location&quot;&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span> novalidate [formGroup]=<span class="hljs-string">&quot;myGroup&quot;</span>&gt;
  Name: &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;text&quot;</span> formControlName=<span class="hljs-string">&quot;name&quot;</span>&gt;
  Location: &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;text&quot;</span> formControlName=<span class="hljs-string">&quot;location&quot;</span>&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;</code></pre><p>&#x4E0A;&#x9762;&#x793A;&#x4F8B;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x4F7F;&#x7528; [formGroup] &#x7ED1;&#x5B9A;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684; myGroup &#x5BF9;&#x8C61;&#xFF0C;&#x9664;&#x6B64;&#x4E4B;&#x5916;&#x8FD8;&#x8981;&#x4F7F;&#x7528; formControlName &#x6307;&#x4EE4;&#xFF0C;&#x7ED1;&#x5B9A;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684; FormControl &#x63A7;&#x4EF6;&#x3002;&#x6B64;&#x65F6;&#x7684;&#x8868;&#x5355;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormGroup -&gt; &apos;myGroup&apos;
    FormControl -&gt; &apos;name&apos;
    FormControl -&gt; &apos;location&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>F<span class="hljs-function"><span class="hljs-title">ormGroup</span> -&gt;</span> <span class="hljs-string">&apos;myGroup&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;name&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;location&apos;</span></code></pre><h1 id="articleHeader6">Implementing our FormGroup model</h1><p>signup.interface.ts</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">interface</span> <span class="hljs-selector-tag">User</span> {
  <span class="hljs-attribute">name</span>: string;
  <span class="hljs-attribute">account</span>: {
    email: string;
    <span class="hljs-attribute">confirm</span>: string;
  }
}</code></pre><p>&#x4E0E;&#x4E4B;&#x5BF9;&#x5E94;&#x7684;&#x8868;&#x5355;&#x7ED3;&#x6784;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FormGroup -&gt; &apos;user&apos;
    FormControl -&gt; &apos;name&apos;
    FormGroup -&gt; &apos;account&apos;
        FormControl -&gt; &apos;email&apos;
        FormControl -&gt; &apos;confirm&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code>F<span class="hljs-function"><span class="hljs-title">ormGroup</span> -&gt;</span> <span class="hljs-string">&apos;user&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;name&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormGroup</span> -&gt;</span> <span class="hljs-string">&apos;account&apos;</span>
        F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;email&apos;</span>
        F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;confirm&apos;</span></code></pre><p>&#x662F;&#x7684;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x521B;&#x5EFA;&#x5D4C;&#x5957;&#x7684; FormGroup &#x96C6;&#x5408;&#xFF01;&#x8BA9;&#x6211;&#x4EEC;&#x66F4;&#x65B0;&#x4E00;&#x4E0B;&#x7EC4;&#x4EF6; (&#x4E0D;&#x5305;&#x542B;&#x521D;&#x59CB;&#x6570;&#x636E;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from &apos;@angular/core&apos;;
import { FormControl, FormGroup } from &apos;@angular/forms&apos;;

@Component({...})
export class SignupFormComponent implements OnInit {
  user: FormGroup;
  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl(&apos;&apos;),
      account: new FormGroup({
        email: new FormControl(&apos;&apos;),
        confirm: new FormControl(&apos;&apos;)
      })
    });
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> { FormControl, FormGroup } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/forms&apos;</span>;

@Component({...})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SignupFormComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnInit</span> {</span>
  user: FormGroup;
  ngOnInit() {
    <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">new</span> FormGroup({
      name: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>),
      account: <span class="hljs-keyword">new</span> FormGroup({
        email: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>),
        confirm: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>)
      })
    });
  }
}</code></pre><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x8BBE;&#x7F6E;&#x521D;&#x59CB;&#x6570;&#x636E;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x6309;&#x7167;&#x4E0A;&#x8FF0;&#x793A;&#x4F8B;&#x8FDB;&#x884C;&#x8BBE;&#x7F6E;&#x3002;&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x670D;&#x52A1;&#x7AEF;&#x63D0;&#x4F9B;&#x7684; API &#x63A5;&#x53E3;&#x6765;&#x83B7;&#x53D6;&#x8868;&#x5355;&#x7684;&#x521D;&#x59CB;&#x4FE1;&#x606F;&#x3002;</p><h1 id="articleHeader7">Binding our FormGroup model</h1><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x5B9E;&#x4F8B;&#x5316;&#x4E86; FormGroup &#x6A21;&#x578B;&#xFF0C;&#x662F;&#x65F6;&#x5019;&#x7ED1;&#x5B9A;&#x5230;&#x5BF9;&#x5E94;&#x7684; DOM &#x5143;&#x7D20;&#x4E0A;&#x4E86;&#x3002;&#x5177;&#x4F53;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate [formGroup]=&quot;user&quot;&gt;
  &lt;label&gt;
    &lt;span&gt;Full name&lt;/span&gt;
    &lt;input
      type=&quot;text&quot;
      placeholder=&quot;Your full name&quot;
      formControlName=&quot;name&quot;&gt;
  &lt;/label&gt;
  &lt;div formGroupName=&quot;account&quot;&gt;
    &lt;label&gt;
      &lt;span&gt;Email address&lt;/span&gt;
      &lt;input
        type=&quot;email&quot;
        placeholder=&quot;Your email address&quot;
        formControlName=&quot;email&quot;&gt;
    &lt;/label&gt;
    &lt;label&gt;
      &lt;span&gt;Confirm address&lt;/span&gt;
      &lt;input
        type=&quot;email&quot;
        placeholder=&quot;Confirm your email address&quot;
        formControlName=&quot;confirm&quot;&gt;
    &lt;/label&gt;
  &lt;/div&gt;
  &lt;button type=&quot;submit&quot;&gt;Sign up&lt;/button&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;user&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Full name<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
      <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span>
      <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your full name&quot;</span>
      <span class="hljs-attr">formControlName</span>=<span class="hljs-string">&quot;name&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">formGroupName</span>=<span class="hljs-string">&quot;account&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Email address<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Your email address&quot;</span>
        <span class="hljs-attr">formControlName</span>=<span class="hljs-string">&quot;email&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Confirm address<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
        <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;email&quot;</span>
        <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Confirm your email address&quot;</span>
        <span class="hljs-attr">formControlName</span>=<span class="hljs-string">&quot;confirm&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span>&gt;</span>Sign up<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre><p>&#x73B0;&#x5728; FormGroup &#x4E0E; FormControl &#x5BF9;&#x8C61;&#x4E0E; DOM &#x7ED3;&#x6784;&#x7684;&#x5173;&#x8054;&#x4FE1;&#x606F;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JavaScript APIs
FormGroup -&gt; &apos;user&apos;
    FormControl -&gt; &apos;name&apos;
    FormGroup -&gt; &apos;account&apos;
        FormControl -&gt; &apos;email&apos;
        FormControl -&gt; &apos;confirm&apos;

// DOM bindings
formGroup -&gt; &apos;user&apos;
    formControlName -&gt; &apos;name&apos;
    formGroupName -&gt; &apos;account&apos;
        formControlName -&gt; &apos;email&apos;
        formControlName -&gt; &apos;confirm&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xl"><code><span class="hljs-comment">// JavaScript APIs</span>
F<span class="hljs-function"><span class="hljs-title">ormGroup</span> -&gt;</span> <span class="hljs-string">&apos;user&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;name&apos;</span>
    F<span class="hljs-function"><span class="hljs-title">ormGroup</span> -&gt;</span> <span class="hljs-string">&apos;account&apos;</span>
        F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;email&apos;</span>
        F<span class="hljs-function"><span class="hljs-title">ormControl</span> -&gt;</span> <span class="hljs-string">&apos;confirm&apos;</span>

<span class="hljs-comment">// DOM bindings</span>
<span class="hljs-function"><span class="hljs-title">formGroup</span> -&gt;</span> <span class="hljs-string">&apos;user&apos;</span>
    <span class="hljs-function"><span class="hljs-title">formControlName</span> -&gt;</span> <span class="hljs-string">&apos;name&apos;</span>
    <span class="hljs-function"><span class="hljs-title">formGroupName</span> -&gt;</span> <span class="hljs-string">&apos;account&apos;</span>
        <span class="hljs-function"><span class="hljs-title">formControlName</span> -&gt;</span> <span class="hljs-string">&apos;email&apos;</span>
        <span class="hljs-function"><span class="hljs-title">formControlName</span> -&gt;</span> <span class="hljs-string">&apos;confirm&apos;</span></code></pre><h1 id="articleHeader8">Reactive submit</h1><p>&#x8DDF;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x7684;&#x8868;&#x5355;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; ngSubmit &#x8F93;&#x51FA;&#x5C5E;&#x6027;&#xFF0C;&#x5904;&#x7406;&#x8868;&#x5355;&#x7684;&#x63D0;&#x4EA4;&#x903B;&#x8F91;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate (ngSubmit)=&quot;onSubmit()&quot; [formGroup]=&quot;user&quot;&gt;
  ...
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span> (<span class="hljs-attr">ngSubmit</span>)=<span class="hljs-string">&quot;onSubmit()&quot;</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;user&quot;</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre><h1 id="articleHeader9">Reactive error validation</h1><p>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x4E3A;&#x8868;&#x5355;&#x6DFB;&#x52A0;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ECE; @angular/forms &#x4E2D;&#x5BFC;&#x5165; Validators&#x3002;&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.user = new FormGroup({
    name: new FormControl(&apos;&apos;, [Validators.required, Validators.minLength(2)]),
    account: new FormGroup({
      email: new FormControl(&apos;&apos;, Validators.required),
      confirm: new FormControl(&apos;&apos;, Validators.required)
    })
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ngOnInit() {
  <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">new</span> FormGroup({
    name: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, [Validators.required, Validators.minLength(<span class="hljs-number">2</span>)]),
    account: <span class="hljs-keyword">new</span> FormGroup({
      email: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, Validators.required),
      confirm: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, Validators.required)
    })
  });
}</code></pre><p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x793A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x5982;&#x679C;&#x8868;&#x5355;&#x63A7;&#x5236;&#x5305;&#x542B;&#x591A;&#x79CD;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6570;&#x7EC4;&#x58F0;&#x660E;&#x591A;&#x79CD;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#x3002;&#x82E5;&#x53EA;&#x5305;&#x542B;&#x4E00;&#x79CD;&#x9A8C;&#x8BC1;&#x89C4;&#x5219;&#xFF0C;&#x76F4;&#x63A5;&#x58F0;&#x660E;&#x5C31;&#x597D;&#x3002;&#x901A;&#x8FC7;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x5728;&#x6A21;&#x677F;&#x7684;&#x8F93;&#x5165;&#x63A7;&#x4EF6;&#x4E2D;&#x6DFB;&#x52A0; required &#x5C5E;&#x6027;&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x6765;&#x6DFB;&#x52A0;&#x8868;&#x5355;&#x9A8C;&#x8BC1;&#x5931;&#x8D25;&#x65F6;&#xFF0C;&#x4E0D;&#x5141;&#x8BB8;&#x8FDB;&#x884C;&#x8868;&#x5355;&#x63D0;&#x4EA4;&#x529F;&#x80FD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate (ngSubmit)=&quot;onSubmit(user)&quot; [formGroup]=&quot;user&quot;&gt;
  ...
  &lt;button type=&quot;submit&quot; [disabled]=&quot;user.invalid&quot;&gt;Sign up&lt;/button&gt;
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span> (<span class="hljs-attr">ngSubmit</span>)=<span class="hljs-string">&quot;onSubmit(user)&quot;</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;user&quot;</span>&gt;</span>
  ...
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;submit&quot;</span> [<span class="hljs-attr">disabled</span>]=<span class="hljs-string">&quot;user.invalid&quot;</span>&gt;</span>Sign up<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></code></pre><p>&#x90A3;&#x4E48;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x6211;&#x4EEC;&#x8981;&#x5982;&#x4F55;&#x83B7;&#x53D6;&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x7684;&#x9A8C;&#x8BC1;&#x4FE1;&#x606F;&#xFF1F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x8868;&#x5355;&#x4E2D;&#x4ECB;&#x7ECD;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5177;&#x4F53;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate [formGroup]=&quot;user&quot;&gt;
  "{{" user.controls.name?.errors | json "}}"
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;user&quot;</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{" user.controls.name?.errors | json "}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span></code></pre><p>&#x6B64;&#x5916;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; FormGroup &#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x7684; API&#xFF0C;&#x6765;&#x83B7;&#x53D6;&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x9A8C;&#x8BC1;&#x7684;&#x9519;&#x8BEF;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;form novalidate [formGroup]=&quot;user&quot;&gt;
  "{{" user.get(&apos;name&apos;).errors | json "}}"
&lt;/form&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">novalidate</span> [<span class="hljs-attr">formGroup</span>]=<span class="hljs-string">&quot;user&quot;</span>&gt;</span>
  </span><span class="hljs-template-variable">"{{" user.get(&apos;name&apos;).errors | json "}}"</span><span class="xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span></span></code></pre><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from &apos;@angular/core&apos;;
import { FormControl, FormGroup, Validators } from &apos;@angular/forms&apos;;
import { User } from &apos;./signup.interface&apos;;

@Component({
  selector: &apos;signup-form&apos;,
  template: `
    &lt;form novalidate (ngSubmit)=&quot;onSubmit(user)&quot; [formGroup]=&quot;user&quot;&gt;
      &lt;label&gt;
        &lt;span&gt;Full name&lt;/span&gt;
        &lt;input type=&quot;text&quot; placeholder=&quot;Your full name&quot; formControlName=&quot;name&quot;&gt;
      &lt;/label&gt;
      &lt;div class=&quot;error&quot; *ngIf=&quot;user.get(&apos;name&apos;).hasError(&apos;required&apos;) &amp;&amp; 
            user.get(&apos;name&apos;).touched&quot;&gt;
        Name is required
      &lt;/div&gt;
      &lt;div class=&quot;error&quot; *ngIf=&quot;user.get(&apos;name&apos;).hasError(&apos;minlength&apos;) &amp;&amp; 
            user.get(&apos;name&apos;).touched&quot;&gt;
        Minimum of 2 characters
      &lt;/div&gt;
      &lt;div formGroupName=&quot;account&quot;&gt;
        &lt;label&gt;
          &lt;span&gt;Email address&lt;/span&gt;
          &lt;input type=&quot;email&quot; placeholder=&quot;Your email address&quot; formControlName=&quot;email&quot;&gt;
        &lt;/label&gt;
        &lt;div
          class=&quot;error&quot;
          *ngIf=&quot;user.get(&apos;account&apos;).get(&apos;email&apos;).hasError(&apos;required&apos;) &amp;&amp; 
             user.get(&apos;account&apos;).get(&apos;email&apos;).touched&quot;&gt;
          Email is required
        &lt;/div&gt;
        &lt;label&gt;
          &lt;span&gt;Confirm address&lt;/span&gt;
          &lt;input type=&quot;email&quot; placeholder=&quot;Confirm your email address&quot; 
             formControlName=&quot;confirm&quot;&gt;
        &lt;/label&gt;
        &lt;div
          class=&quot;error&quot;
          *ngIf=&quot;user.get(&apos;account&apos;).get(&apos;confirm&apos;).hasError(&apos;required&apos;) &amp;&amp; 
             user.get(&apos;account&apos;).get(&apos;confirm&apos;).touched&quot;&gt;
          Confirming email is required
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button type=&quot;submit&quot; [disabled]=&quot;user.invalid&quot;&gt;Sign up&lt;/button&gt;
    &lt;/form&gt;
  `
})
export class SignupFormComponent implements OnInit {
  user: FormGroup;
  constructor() {}
  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl(&apos;&apos;, [Validators.required, Validators.minLength(2)]),
      account: new FormGroup({
        email: new FormControl(&apos;&apos;, Validators.required),
        confirm: new FormControl(&apos;&apos;, Validators.required)
      })
    });
  }
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>import { Component, OnInit } from &apos;@angular/core&apos;;
import { FormControl, FormGroup, Validators } from &apos;@angular/forms&apos;;
import { User } from &apos;./signup.interface&apos;;

@Component({
  selector: &apos;signup-<span class="hljs-keyword">form</span>&apos;,
  template: `
    &lt;<span class="hljs-keyword">form</span> novalidate (ngSubmit)=<span class="hljs-string">&quot;onSubmit(user)&quot;</span> [formGroup]=<span class="hljs-string">&quot;user&quot;</span>&gt;
      &lt;<span class="hljs-keyword">label</span>&gt;
        &lt;span&gt;Full name&lt;/span&gt;
        &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;text&quot;</span> placeholder=<span class="hljs-string">&quot;Your full name&quot;</span> formControlName=<span class="hljs-string">&quot;name&quot;</span>&gt;
      &lt;/<span class="hljs-keyword">label</span>&gt;
      &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;error&quot;</span> *ngIf=&quot;user.<span class="hljs-built_in">get</span>(&apos;name&apos;).hasError(&apos;required&apos;) &amp;&amp; 
            user.<span class="hljs-built_in">get</span>(&apos;name&apos;).touched&quot;&gt;
        Name is required
      &lt;/div&gt;
      &lt;div <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;error&quot;</span> *ngIf=&quot;user.<span class="hljs-built_in">get</span>(&apos;name&apos;).hasError(&apos;minlength&apos;) &amp;&amp; 
            user.<span class="hljs-built_in">get</span>(&apos;name&apos;).touched&quot;&gt;
        Minimum of 2 characters
      &lt;/div&gt;
      &lt;div formGroupName=<span class="hljs-string">&quot;account&quot;</span>&gt;
        &lt;<span class="hljs-keyword">label</span>&gt;
          &lt;span&gt;Email address&lt;/span&gt;
          &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;email&quot;</span> placeholder=<span class="hljs-string">&quot;Your email address&quot;</span> formControlName=<span class="hljs-string">&quot;email&quot;</span>&gt;
        &lt;/<span class="hljs-keyword">label</span>&gt;
        &lt;div
          <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;error&quot;</span>
<span class="hljs-comment">          *ngIf=&quot;user.get(&apos;account&apos;).get(&apos;email&apos;).hasError(&apos;required&apos;) &amp;&amp; </span>
             user.<span class="hljs-built_in">get</span>(&apos;account&apos;).<span class="hljs-built_in">get</span>(&apos;email&apos;).touched&quot;&gt;
          Email is required
        &lt;/div&gt;
        &lt;<span class="hljs-keyword">label</span>&gt;
          &lt;span&gt;<span class="hljs-keyword">Confirm</span> address&lt;/span&gt;
          &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;email&quot;</span> placeholder=<span class="hljs-string">&quot;Confirm your email address&quot;</span> 
             formControlName=<span class="hljs-string">&quot;confirm&quot;</span>&gt;
        &lt;/<span class="hljs-keyword">label</span>&gt;
        &lt;div
          <span class="hljs-keyword">class</span>=<span class="hljs-string">&quot;error&quot;</span>
<span class="hljs-comment">          *ngIf=&quot;user.get(&apos;account&apos;).get(&apos;confirm&apos;).hasError(&apos;required&apos;) &amp;&amp; </span>
             user.<span class="hljs-built_in">get</span>(&apos;account&apos;).<span class="hljs-built_in">get</span>(&apos;<span class="hljs-keyword">confirm</span>&apos;).touched&quot;&gt;
          Confirming email is required
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;button <span class="hljs-keyword">type</span>=<span class="hljs-string">&quot;submit&quot;</span> [disabled]=<span class="hljs-string">&quot;user.invalid&quot;</span>&gt;Sign up&lt;/button&gt;
    &lt;/<span class="hljs-keyword">form</span>&gt;
  `
})
export <span class="hljs-keyword">class</span> SignupFormComponent implements OnInit {
  user: FormGroup;
  constructor() {}
  ngOnInit() {
    this.user = new FormGroup({
      name: new FormControl(&apos;&apos;, [Validators.required, Validators.minLength(2)]),
      account: new FormGroup({
        email: new FormControl(&apos;&apos;, Validators.required),
        <span class="hljs-keyword">confirm</span>: new FormControl(&apos;&apos;, Validators.required)
      })
    });
  }
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.<span class="hljs-built_in">log</span>(value, valid);
  }
}</code></pre><p>&#x529F;&#x80FD;&#x662F;&#x5B9E;&#x73B0;&#x4E86;&#xFF0C;&#x4F46;&#x521B;&#x5EFA; FormGroup &#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;&#x6709;&#x70B9;&#x7E41;&#x7410;&#xFF0C;Angular &#x56E2;&#x961F;&#x4E5F;&#x610F;&#x8BC6;&#x5230;&#x8FD9;&#x70B9;&#xFF0C;&#x56E0;&#x6B64;&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B; FormBuilder &#xFF0C;&#x6765;&#x7B80;&#x5316;&#x4E0A;&#x9762;&#x7684;&#x64CD;&#x4F5C;&#x3002;</p><h1 id="articleHeader10">Simplifying with FormBuilder</h1><p>&#x9996;&#x5148;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4ECE; @angular/forms &#x4E2D;&#x5BFC;&#x5165; FormBuilder&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { FormBuilder, FormGroup, Validators } from &apos;@angular/forms&apos;;

export class SignupFormComponent implements OnInit {
  user: FormGroup;
  constructor(private fb: FormBuilder) {}
  ...
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> { FormBuilder, FormGroup, Validators } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/forms&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SignupFormComponent <span class="hljs-keyword">implements</span> OnInit {
  user: FormGroup;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> fb: FormBuilder</span>) {}
  ...
}</code></pre><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x4F7F;&#x7528; FormBuilder &#x5BF9;&#x8C61;&#x63D0;&#x4F9B;&#x7684; group() &#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x521B;&#x5EFA; FormGroup &#x548C; FormControl &#x5BF9;&#x8C61;&#xFF1A;</p><p>&#x8C03;&#x6574;&#x524D;&#x7684;&#x4EE3;&#x7801; (&#x672A;&#x4F7F;&#x7528;FormBuilder)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.user = new FormGroup({
    name: new FormControl(&apos;&apos;, [Validators.required, Validators.minLength(2)]),
    account: new FormGroup({
      email: new FormControl(&apos;&apos;, Validators.required),
      confirm: new FormControl(&apos;&apos;, Validators.required)
    })
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ngOnInit() {
  <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">new</span> FormGroup({
    name: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, [Validators.required, Validators.minLength(<span class="hljs-number">2</span>)]),
    account: <span class="hljs-keyword">new</span> FormGroup({
      email: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, Validators.required),
      confirm: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, Validators.required)
    })
  });
}</code></pre><p>&#x8C03;&#x6574;&#x540E;&#x7684;&#x4EE3;&#x7801; (&#x4F7F;&#x7528;FormBuilder)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnInit() {
  this.user = this.fb.group({
    name: [&apos;&apos;, [Validators.required, Validators.minLength(2)]],
    account: this.fb.group({
      email: [&apos;&apos;, Validators.required],
      confirm: [&apos;&apos;, Validators.required]
    })
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>ngOnInit() {
  <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">this</span>.fb.group({
    name: [<span class="hljs-string">&apos;&apos;</span>, [Validators.required, Validators.minLength(<span class="hljs-number">2</span>)]],
    account: <span class="hljs-keyword">this</span>.fb.group({
      email: [<span class="hljs-string">&apos;&apos;</span>, Validators.required],
      confirm: [<span class="hljs-string">&apos;&apos;</span>, Validators.required]
    })
  });
}</code></pre><p>&#x5BF9;&#x6BD4;&#x4E00;&#x4E0B;&#x8C03;&#x6574;&#x524D;&#x548C;&#x8C03;&#x6574;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x611F;&#x89C9;&#x4E00;&#x4E0B;&#x5B50;&#x65B9;&#x4FBF;&#x4E86;&#x8BB8;&#x591A;&#x3002;&#x6B64;&#x65F6;&#x66F4;&#x65B0;&#x5B8C;&#x540E;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({...})
export class SignupFormComponent implements OnInit {
  user: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.user = this.fb.group({
      name: [&apos;&apos;, [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: [&apos;&apos;, Validators.required],
        confirm: [&apos;&apos;, Validators.required]
      })
    });
  }
  onSubmit({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-meta">@Component</span>({...})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SignupFormComponent</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">OnInit</span> {</span>
<span class="hljs-symbol">  user:</span> FormGroup;
  constructor(<span class="hljs-keyword">private</span> <span class="hljs-string">fb:</span> FormBuilder) {}
  ngOnInit() {
    <span class="hljs-keyword">this</span>.user = <span class="hljs-keyword">this</span>.fb.group({
<span class="hljs-symbol">      name:</span> [<span class="hljs-string">&apos;&apos;</span>, [Validators.required, Validators.minLength(<span class="hljs-number">2</span>)]],
<span class="hljs-symbol">      account:</span> <span class="hljs-keyword">this</span>.fb.group({
<span class="hljs-symbol">        email:</span> [<span class="hljs-string">&apos;&apos;</span>, Validators.required],
<span class="hljs-symbol">        confirm:</span> [<span class="hljs-string">&apos;&apos;</span>, Validators.required]
      })
    });
  }
  onSubmit({ value, valid }: { <span class="hljs-string">value:</span> User, <span class="hljs-string">valid:</span> <span class="hljs-keyword">boolean</span> }) {
    console.log(value, valid);
  }
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular —— Reactive Forms

## 原文链接
[https://segmentfault.com/a/1190000015599410](https://segmentfault.com/a/1190000015599410)

