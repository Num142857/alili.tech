---
title: '[译] 别再对 Angular Modules 感到迷惑' 
date: 2018-11-28 2:30:10
hidden: true
slug: wmzl9wpagae
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x94FE;&#x63A5;&#xFF1A;<strong><a href="https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f" rel="nofollow noreferrer" target="_blank">Avoiding common confusions with modules in Angular</a></strong></blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015298243?w=270&amp;h=360" src="https://static.alili.tech/img/remote/1460000015298243?w=270&amp;h=360" alt="Module" title="Module" style="cursor:pointer;display:inline"></span></p><p>Angular Modules &#x662F;&#x4E2A;&#x76F8;&#x5F53;&#x590D;&#x6742;&#x7684;&#x8BDD;&#x9898;&#xFF0C;&#x751A;&#x81F3; Angular &#x5F00;&#x53D1;&#x56E2;&#x961F;&#x5728;&#x5B98;&#x7F51;&#x4E0A;&#x5199;&#x4E86;&#x597D;&#x51E0;&#x7BC7;&#x6709;&#x5173; <strong><a href="https://angular.io/guide/ngmodules" rel="nofollow noreferrer" target="_blank">NgModule</a></strong> &#x7684;&#x6587;&#x7AE0;&#x6559;&#x7A0B;&#x3002;&#x8FD9;&#x4E9B;&#x6559;&#x7A0B;&#x6E05;&#x6670;&#x7684;&#x9610;&#x8FF0;&#x4E86; <strong>Modules</strong> &#x7684;&#x5927;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#xFF0C;&#x4F46;&#x662F;&#x4ECD;&#x6B20;&#x7F3A;&#x4E00;&#x4E9B;&#x5185;&#x5BB9;&#xFF0C;&#x5BFC;&#x81F4;&#x5F88;&#x591A;&#x5F00;&#x53D1;&#x8005;&#x88AB;&#x8BEF;&#x5BFC;&#x3002;&#x6211;&#x770B;&#x5230;&#x5F88;&#x591A;&#x5F00;&#x53D1;&#x8005;&#x7531;&#x4E8E;&#x4E0D;&#x77E5;&#x9053; <strong>Modules</strong> &#x5185;&#x90E8;&#x662F;&#x5982;&#x4F55;&#x5DE5;&#x4F5C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x7ECF;&#x5E38;&#x7406;&#x89E3;&#x9519;&#x76F8;&#x5173;&#x6982;&#x5FF5;&#xFF0C;&#x4F7F;&#x7528; <strong>Modules API</strong> &#x7684;&#x59FF;&#x52BF;&#x4E5F;&#x4E0D;&#x6B63;&#x786E;&#x3002;</p><p>&#x672C;&#x6587;&#x5C06;&#x6DF1;&#x5EA6;&#x89E3;&#x91CA; <strong>Modules</strong> &#x5185;&#x90E8;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#xFF0C;&#x4E89;&#x53D6;&#x5E2E;&#x4F60;&#x6D88;&#x9664;&#x4E00;&#x4E9B;&#x5E38;&#x89C1;&#x7684;&#x8BEF;&#x89E3;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x9519;&#x8BEF;&#x6211;&#x5728; <strong>StackOverflow</strong> &#x4E0A;&#x7ECF;&#x5E38;&#x770B;&#x5230;&#x6709;&#x4EBA;&#x63D0;&#x95EE;&#x3002;</p><h2 id="articleHeader0">&#x6A21;&#x5757;&#x5C01;&#x88C5;</h2><p>Angular &#x5F15;&#x5165;&#x4E86;&#x6A21;&#x5757;&#x5C01;&#x88C5;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x8FD9;&#x4E2A;&#x548C; ES &#x6A21;&#x5757;&#x6982;&#x5FF5;&#x5F88;&#x7C7B;&#x4F3C;&#xFF08;&#x6CE8;&#xFF1A;ES Modules &#x6982;&#x5FF5;&#x53EF;&#x4EE5;&#x67E5;&#x770B; TypeScript &#x4E2D;&#x6587;&#x7F51;&#x7684; <strong><a href="https://www.tslang.cn/docs/handbook/modules.html" rel="nofollow noreferrer" target="_blank">Modules</a></strong>&#xFF09;&#xFF0C;&#x57FA;&#x672C;&#x610F;&#x601D;&#x662F;&#x6240;&#x6709;&#x58F0;&#x660E;&#x7C7B;&#x578B;&#xFF0C;&#x5305;&#x62EC;&#x7EC4;&#x4EF6;&#x3001;&#x6307;&#x4EE4;&#x548C;&#x7BA1;&#x9053;&#xFF0C;&#x53EA;&#x53EF;&#x4EE5;&#x5728;&#x5F53;&#x524D;&#x6A21;&#x5757;&#x5185;&#x90E8;&#xFF0C;&#x88AB;&#x5176;&#x4ED6;&#x58F0;&#x660E;&#x7684;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x5728; <strong>App</strong> &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; <strong>A</strong> &#x6A21;&#x5757;&#x7684; <strong>a-comp</strong> &#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: &apos;my-app&apos;,
  template: `
      &lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;
      &lt;a-comp&gt;&lt;/a-comp&gt;
  `
})
export class AppComponent { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">&apos;my-app&apos;</span>,
  template: <span class="hljs-string">`
      &lt;h1&gt;Hello "{{"name"}}"&lt;/h1&gt;
      &lt;a-comp&gt;&lt;/a-comp&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent { }</code></pre><p>Angular &#x7F16;&#x8BD1;&#x5668;&#x5C31;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF1A;</p><blockquote>Template parse errors: &apos;a-comp&apos; is not a known element</blockquote><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A; <strong>App</strong> &#x6A21;&#x5757;&#x4E2D;&#x6CA1;&#x6709;&#x7533;&#x660E; <strong>a-comp</strong> &#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x60F3;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x4E0D;&#x5F97;&#x4E0D;&#x5BFC;&#x5165; <strong>A</strong> &#x6A21;&#x5757;&#xFF0C;&#x5C31;&#x50CF;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [..., AModule]
})
export class AppModule { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [..., AModule]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule { }</code></pre><p>&#x4E0A;&#x9762;&#x63CF;&#x8FF0;&#x7684;&#x5C31;&#x662F; <strong>&#x6A21;&#x5757;&#x5C01;&#x88C5;</strong>&#x3002;&#x4E0D;&#x4EC5;&#x5982;&#x6B64;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981; <strong>a-comp</strong> &#x7EC4;&#x4EF6;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF0C;&#x5F97;&#x8BBE;&#x7F6E;&#x5B83;&#x4E3A;&#x53EF;&#x4EE5;&#x516C;&#x5F00;&#x8BBF;&#x95EE;&#xFF0C;&#x5373;&#x5728; <strong>A</strong> &#x6A21;&#x5757;&#x7684; <strong>exports</strong> &#x5C5E;&#x6027;&#x4E2D;&#x5BFC;&#x51FA;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  ...
  declarations: [AComponent],
  exports: [AComponent]
})
export class AModule { }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  ...
  declarations: [AComponent],
  exports: [AComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AModule { }</code></pre><p>&#x540C;&#x7406;&#xFF0C;&#x5BF9;&#x4E8E;&#x6307;&#x4EE4;&#x548C;&#x7BA1;&#x9053;&#xFF0C;&#x4E5F;&#x5F97;&#x9075;&#x5B88; <strong>&#x6A21;&#x5757;&#x5C01;&#x88C5;</strong> &#x7684;&#x89C4;&#x5219;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  ...
  declarations: [
    PublicPipe, 
    PrivatePipe, 
    PublicDirective, 
    PrivateDirective
  ],
  exports: [PublicPipe, PublicDirective]
})
export class AModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  ...
  declarations: [
    PublicPipe, 
    PrivatePipe, 
    PublicDirective, 
    PrivateDirective
  ],
  exports: [PublicPipe, PublicDirective]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AModule {}</code></pre><p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;<strong>&#x6A21;&#x5757;&#x5C01;&#x88C5;</strong> &#x539F;&#x5219;&#x4E0D;&#x9002;&#x7528;&#x4E8E;&#x5728; <strong>entryComponents</strong> &#x5C5E;&#x6027;&#x4E2D;&#x6CE8;&#x518C;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5728;&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x89C6;&#x56FE;&#x65F6;&#xFF0C;&#x50CF; <strong><a href="https://juejin.im/post/5ae00616f265da0b7e0bee78" rel="nofollow noreferrer" target="_blank">&#x8BD1; &#x5173;&#x4E8E; Angular &#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x4F60;&#x9700;&#x8981;&#x77E5;&#x9053;&#x7684;</a></strong> &#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E2D;&#x6240;&#x63CF;&#x8FF0;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5B9E;&#x4F8B;&#x5316;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x4E0D;&#x9700;&#x8981;&#x5728; <strong>A</strong> &#x6A21;&#x5757;&#x7684; <strong>exports</strong> &#x5C5E;&#x6027;&#x4E2D;&#x53BB;&#x5BFC;&#x51FA; <strong>a-comp</strong> &#x7EC4;&#x4EF6;&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x8FD8;&#x5F97;&#x5BFC;&#x5165; <strong>A</strong> &#x6A21;&#x5757;&#x3002;</p><p>&#x5927;&#x591A;&#x6570;&#x521D;&#x5B66;&#x8005;&#x4F1A;&#x8BA4;&#x4E3A; <strong>providers</strong> &#x4E5F;&#x6709;&#x5C01;&#x88C5;&#x89C4;&#x5219;&#xFF0C;<strong>&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#x6CA1;&#x6709;</strong>&#x3002;&#x5728; <strong>&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;</strong> &#x4E2D;&#x7533;&#x660E;&#x7684;&#x4EFB;&#x4F55; <strong>provider</strong> &#x90FD;&#x53EF;&#x4EE5;&#x5728;&#x7A0B;&#x5E8F;&#x5185;&#x7684;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x88AB;&#x8BBF;&#x95EE;&#xFF0C;&#x4E0B;&#x6587;&#x5C06;&#x4F1A;&#x8BE6;&#x7EC6;&#x89E3;&#x91CA;&#x539F;&#x56E0;&#x3002;</p><h2 id="articleHeader1">&#x6A21;&#x5757;&#x5C42;&#x7EA7;</h2><p>&#x521D;&#x5B66;&#x8005;&#x6700;&#x5927;&#x7684;&#x4E00;&#x4E2A;&#x8BEF;&#x89E3;&#x5C31;&#x662F;&#x8BA4;&#x4E3A;&#xFF0C;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x540E;&#x4F1A;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5C42;&#x7EA7;&#xFF0C;&#x8BA4;&#x4E3A;&#x8BE5;&#x6A21;&#x5757;&#x4F1A;&#x6210;&#x4E3A;&#x8FD9;&#x4E9B;&#x88AB;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684;&#x7236;&#x6A21;&#x5757;&#xFF0C;&#x4ECE;&#x800C;&#x5F62;&#x6210;&#x4E00;&#x4E2A;&#x7C7B;&#x4F3C;&#x6A21;&#x5757;&#x6811;&#x7684;&#x5C42;&#x7EA7;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x4E48;&#x60F3;&#x4E5F;&#x5F88;&#x5408;&#x7406;&#x3002;&#x4F46;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x4E0D;&#x5B58;&#x5728;&#x8FD9;&#x6837;&#x7684;&#x6A21;&#x5757;&#x5C42;&#x7EA7;&#x3002;&#x56E0;&#x4E3A; <strong>&#x6240;&#x6709;&#x6A21;&#x5757;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x4F1A;&#x88AB;&#x5408;&#x5E76;</strong>&#xFF0C;&#x6240;&#x4EE5;&#x5BFC;&#x5165;&#x548C;&#x88AB;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x4E4B;&#x95F4;&#x4E0D;&#x5B58;&#x5728;&#x4EFB;&#x4F55;&#x5C42;&#x7EA7;&#x5173;&#x7CFB;&#x3002;</p><p>&#x5C31;&#x50CF; <strong><a href="https://juejin.im/post/5ae00616f265da0b7e0bee78" rel="nofollow noreferrer" target="_blank">&#x7EC4;&#x4EF6;</a></strong> &#x4E00;&#x6837;&#xFF0C;Angular &#x7F16;&#x8BD1;&#x5668;&#x4E5F;&#x4F1A;&#x4E3A;&#x6839;&#x6A21;&#x5757;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#xFF0C;&#x6839;&#x6A21;&#x5757;&#x5C31;&#x662F;&#x4F60;&#x5728; <strong>main.ts</strong> &#x4E2D;&#xFF0C;&#x4EE5;&#x53C2;&#x6570;&#x4F20;&#x5165; <strong>bootstrapModule()</strong> &#x65B9;&#x6CD5;&#x7684;&#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="platformBrowserDynamic().bootstrapModule(AppModule);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts" style="word-break:break-word;white-space:initial">platformBrowserDynamic().bootstrapModule(AppModule);</code></pre><p>Angular &#x7F16;&#x8BD1;&#x5668;&#x4F7F;&#x7528; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/entrypoint.ts#L35-L38" rel="nofollow noreferrer" target="_blank">createNgModuleFactory</a></strong> &#x65B9;&#x6CD5;&#x6765;&#x521B;&#x5EFA;&#x8BE5;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#xFF08;&#x6CE8;&#xFF1A;&#x53EF;&#x53C2;&#x8003; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/application_ref.ts#L274" rel="nofollow noreferrer" target="_blank">L274</a></strong> -&gt; <strong><a href="https://github.com/angular/angular/blob/master/packages/compiler/src/jit/compiler.ts#L60-L61" rel="nofollow noreferrer" target="_blank">L60</a></strong> -&gt; <strong><a href="https://github.com/angular/angular/blob/master/packages/compiler/src/jit/compiler.ts#L109" rel="nofollow noreferrer" target="_blank">L109</a></strong> -&gt; <strong><a href="https://github.com/angular/angular/blob/master/packages/compiler/src/jit/compiler.ts#L153-L155" rel="nofollow noreferrer" target="_blank">L153-L155</a></strong> -&gt; <strong><a href="https://github.com/angular/angular/blob/master/packages/compiler/src/ng_module_compiler.ts#L50" rel="nofollow noreferrer" target="_blank">L50</a></strong>&#xFF09;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x9700;&#x8981;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#xFF08;&#x6CE8;&#xFF1A;&#x4E3A;&#x6E05;&#x6670;&#x7406;&#x89E3;&#xFF0C;&#x4E0D;&#x7FFB;&#x8BD1;&#x3002;&#x6700;&#x65B0;&#x7248;&#x672C;&#x4E0D;&#x5305;&#x62EC;&#x7B2C;&#x4E09;&#x4E2A;&#x4F9D;&#x8D56;&#x53C2;&#x6570;&#x3002;&#xFF09;&#xFF1A;</p><ul><li>module class reference</li><li>bootstrap components</li><li><strong>component factory resolver with entry components</strong></li><li><strong>definition factory with merged module providers</strong></li></ul><p>&#x6700;&#x540E;&#x4E24;&#x70B9;&#x89E3;&#x91CA;&#x4E86;&#x4E3A;&#x4F55; <strong>providers</strong> &#x548C; <strong>entry components</strong> &#x6CA1;&#x6709;&#x6A21;&#x5757;&#x5C01;&#x88C5;&#x89C4;&#x5219;&#xFF0C;&#x56E0;&#x4E3A;&#x7F16;&#x8BD1;&#x7ED3;&#x675F;&#x540E;&#x6CA1;&#x6709;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x800C;&#x4EC5;&#x4EC5;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5408;&#x5E76;&#x540E;&#x7684;&#x6A21;&#x5757;&#x3002;&#x5E76;&#x4E14;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x4E0D;&#x77E5;&#x9053;&#x4F60;&#x5C06;&#x5982;&#x4F55;&#x4F7F;&#x7528; <strong>providers</strong> &#x548C;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF0C;&#x6240;&#x4EE5;&#x7F16;&#x8BD1;&#x5668;&#x53BB;&#x63A7;&#x5236;&#x5C01;&#x88C5;&#x3002;&#x4F46;&#x662F;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x89E3;&#x6790;&#x8FC7;&#x7A0B;&#x65F6;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x77E5;&#x9053;&#x4F60;&#x662F;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x3001;&#x6307;&#x4EE4;&#x548C;&#x7BA1;&#x9053;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x7F16;&#x8BD1;&#x5668;&#x80FD;&#x63A7;&#x5236;&#x5B83;&#x4EEC;&#x7684;&#x79C1;&#x6709;&#x7533;&#x660E;&#x3002;&#xFF08;&#x6CE8;&#xFF1A;<strong>providers</strong> &#x548C; <strong>entry components</strong> &#x662F;&#x6574;&#x4E2A;&#x7A0B;&#x5E8F;&#x4E2D;&#x7684;&#x52A8;&#x6001;&#x90E8;&#x5206; dynamic content&#xFF0C;Angular &#x7F16;&#x8BD1;&#x5668;&#x4E0D;&#x77E5;&#x9053;&#x5B83;&#x4F1A;&#x88AB;&#x5982;&#x4F55;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x6A21;&#x677F;&#x4E2D;&#x5199;&#x7684;&#x7EC4;&#x4EF6;&#x3001;&#x6307;&#x4EE4;&#x548C;&#x7BA1;&#x9053;&#xFF0C;&#x662F;&#x9759;&#x6001;&#x90E8;&#x5206; static content&#xFF0C;Angular &#x7F16;&#x8BD1;&#x5668;&#x5728;&#x7F16;&#x8BD1;&#x7684;&#x65F6;&#x5019;&#x77E5;&#x9053;&#x5B83;&#x662F;&#x5982;&#x4F55;&#x88AB;&#x4F7F;&#x7528;&#x7684;&#x3002;&#x8FD9;&#x70B9;&#x5BF9;&#x7406;&#x89E3; Angular &#x5185;&#x90E8;&#x5DE5;&#x4F5C;&#x539F;&#x7406;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x91CD;&#x8981;&#x7684;&#x3002;&#xFF09;</p><p>&#x8BA9;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E2A;&#x751F;&#x6210;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x5047;&#x8BBE;&#x4F60;&#x6709; <strong>A</strong> &#x548C; <strong>B</strong> &#x4E24;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x5E76;&#x4E14;&#x6BCF;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x90FD;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A; <strong>provider</strong> &#x548C;&#x4E00;&#x4E2A; <strong>entry component</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  providers: [{provide: &apos;a&apos;, useValue: &apos;a&apos;}],
  declarations: [AComponent],
  entryComponents: [AComponent]
})
export class AModule {}

@NgModule({
  providers: [{provide: &apos;b&apos;, useValue: &apos;b&apos;}],
  declarations: [BComponent],
  entryComponents: [BComponent]
})
export class BModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  providers: [{provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;a&apos;</span>}],
  declarations: [AComponent],
  entryComponents: [AComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AModule {}

<span class="hljs-meta">@NgModule</span>({
  providers: [{provide: <span class="hljs-string">&apos;b&apos;</span>, useValue: <span class="hljs-string">&apos;b&apos;</span>}],
  declarations: [BComponent],
  entryComponents: [BComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BModule {}</code></pre><p>&#x6839;&#x6A21;&#x5757; <strong>App</strong> &#x4E5F;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A; <strong>provider</strong> &#x548C;&#x6839;&#x7EC4;&#x4EF6; <strong>app</strong>&#xFF0C;&#x5E76;&#x5BFC;&#x5165; <strong>A</strong> &#x548C; <strong>B</strong> &#x6A21;&#x5757;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [AModule, BModule],
  declarations: [AppComponent],
  providers: [{provide: &apos;root&apos;, useValue: &apos;root&apos;}],
  bootstrap: [AppComponent]
})
export class AppModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [AModule, BModule],
  declarations: [AppComponent],
  providers: [{provide: <span class="hljs-string">&apos;root&apos;</span>, useValue: <span class="hljs-string">&apos;root&apos;</span>}],
  bootstrap: [AppComponent]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre><p>&#x5F53;&#x7F16;&#x8BD1;&#x5668;&#x7F16;&#x8BD1; <strong>App</strong> &#x6839;&#x6A21;&#x5757;&#x751F;&#x6210;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x65F6;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x4F1A; <strong>&#x5408;&#x5E76;</strong> &#x6240;&#x6709;&#x6A21;&#x5757;&#x7684; <strong>providers</strong>&#xFF0C;&#x5E76;&#x53EA;&#x4E3A;&#x5408;&#x5E76;&#x540E;&#x7684;&#x6A21;&#x5757;&#x521B;&#x5EFA;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#xFF0C;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#x5C55;&#x793A;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x662F;&#x5982;&#x4F55;&#x751F;&#x6210;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createNgModuleFactory(
    // reference to the AppModule class
    AppModule,

    // reference to the AppComponent that is used
    // to bootstrap the application
    [AppComponent],

    // module definition with merged providers
    moduleDef([
        ...

        // reference to component factory resolver
        // with the merged entry components
        moduleProvideDef(512, jit_ComponentFactoryResolver_5, ..., [
            ComponentFactory_&lt;BComponent&gt;,
            ComponentFactory_&lt;AComponent&gt;,
            ComponentFactory_&lt;AppComponent&gt;
        ])

        // references to the merged module classes 
        // and their providers
        moduleProvideDef(512, AModule, AModule, []),
        moduleProvideDef(512, BModule, BModule, []),
        moduleProvideDef(512, AppModule, AppModule, []),
        moduleProvideDef(256, &apos;a&apos;, &apos;a&apos;, []),
        moduleProvideDef(256, &apos;b&apos;, &apos;b&apos;, []),
        moduleProvideDef(256, &apos;root&apos;, &apos;root&apos;, [])
]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">createNgModuleFactory(
    <span class="hljs-comment">// reference to the AppModule class</span>
    AppModule,

    <span class="hljs-comment">// reference to the AppComponent that is used</span>
    <span class="hljs-comment">// to bootstrap the application</span>
    [AppComponent],

    <span class="hljs-comment">// module definition with merged providers</span>
    moduleDef([
        ...

        <span class="hljs-comment">// reference to component factory resolver</span>
        <span class="hljs-comment">// with the merged entry components</span>
        moduleProvideDef(<span class="hljs-number">512</span>, jit_ComponentFactoryResolver_5, ..., [
            ComponentFactory_&lt;BComponent&gt;,
            ComponentFactory_&lt;AComponent&gt;,
            ComponentFactory_&lt;AppComponent&gt;
        ])

        <span class="hljs-comment">// references to the merged module classes </span>
        <span class="hljs-comment">// and their providers</span>
        moduleProvideDef(<span class="hljs-number">512</span>, AModule, AModule, []),
        moduleProvideDef(<span class="hljs-number">512</span>, BModule, BModule, []),
        moduleProvideDef(<span class="hljs-number">512</span>, AppModule, AppModule, []),
        moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>, []),
        moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, []),
        moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;root&apos;</span>, <span class="hljs-string">&apos;root&apos;</span>, [])
]);</code></pre><p>&#x4ECE;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x77E5;&#x9053;&#xFF0C;&#x6240;&#x6709;&#x6A21;&#x5757;&#x7684; <strong>providers</strong> &#x548C; <strong>entry components</strong> &#x90FD;&#x5C06;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#xFF0C;&#x5E76;&#x4F20;&#x7ED9; <strong>moduleDef()</strong> &#x65B9;&#x6CD5;&#xFF0C;<strong>&#x6240;&#x4EE5;&#x65E0;&#x8BBA;&#x5BFC;&#x5165;&#x591A;&#x5C11;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x7F16;&#x8BD1;&#x5668;&#x53EA;&#x4F1A;&#x5408;&#x5E76;&#x6A21;&#x5757;&#xFF0C;&#x5E76;&#x53EA;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x5DE5;&#x5382;</strong>&#x3002;&#x8BE5;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x4F1A;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x6CE8;&#x5165;&#x5668;&#x6765;&#x751F;&#x6210;&#x5408;&#x5E76;&#x6A21;&#x5757;&#x5BF9;&#x8C61;&#xFF08;&#x6CE8;&#xFF1A;&#x67E5;&#x770B; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/application_ref.ts#L232" rel="nofollow noreferrer" target="_blank">L232</a></strong>&#xFF09;&#xFF0C;&#x7136;&#x800C;&#x7531;&#x4E8E;&#x53EA;&#x6709;&#x4E00;&#x4E2A;&#x5408;&#x5E76;&#x6A21;&#x5757;&#xFF0C;Angular &#x5C06;&#x53EA;&#x4F1A;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B; <strong>providers</strong>&#xFF0C;&#x6765;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#x7684;&#x6839;&#x6CE8;&#x5165;&#x5668;&#x3002;</p><p>&#x73B0;&#x5728;&#x4F60;&#x53EF;&#x80FD;&#x60F3;&#x5230;&#xFF0C;&#x5982;&#x679C;&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#x91CC;&#x5B9A;&#x4E49;&#x4E86;&#x76F8;&#x540C;&#x7684; <strong>provider token</strong>&#xFF0C;&#x4F1A;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#xFF1F;</p><p><strong>&#x7B2C;&#x4E00;&#x4E2A;&#x89C4;&#x5219;</strong> &#x5219;&#x662F;&#x5BFC;&#x5165;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x7684;&#x6A21;&#x5757;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>provider</strong> &#x603B;&#x662F;&#x4F18;&#x5148;&#x80DC;&#x51FA;&#xFF0C;&#x6BD4;&#x5982;&#x5728; <strong>AppModule</strong> &#x4E2D;&#x4E5F;&#x540C;&#x6837;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; <strong>a provider</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  ...
  providers: [{provide: &apos;a&apos;, useValue: &apos;root&apos;}],
})
export class AppModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  ...
  providers: [{provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;root&apos;</span>}],
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre><p>&#x67E5;&#x770B;&#x751F;&#x6210;&#x7684;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moduleDef([
     ...
     moduleProvideDef(256, &apos;a&apos;, &apos;root&apos;, []),
     moduleProvideDef(256, &apos;b&apos;, &apos;b&apos;, []),
 ]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">moduleDef([
     ...
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;root&apos;</span>, []),
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;b&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, []),
 ]);</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;&#x6700;&#x540E;&#x5408;&#x5E76;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x5305;&#x542B; <strong>moduleProvideDef(256, &apos;a&apos;, &apos;root&apos;, [])</strong>&#xFF0C;&#x4F1A;&#x8986;&#x76D6; <strong>AModule</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>{provide: &apos;a&apos;, useValue: &apos;a&apos;}</strong>&#x3002;</p><p><strong>&#x7B2C;&#x4E8C;&#x4E2A;&#x89C4;&#x5219;</strong> &#x662F;&#x6700;&#x540E;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684; <strong>providers</strong>&#xFF0C;&#x4F1A;&#x8986;&#x76D6;&#x524D;&#x9762;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x7684; <strong>providers</strong>&#x3002;&#x540C;&#x6837;&#xFF0C;&#x4E5F;&#x5728; <strong>BModule</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; <strong>a provider</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  ...
  providers: [{provide: &apos;a&apos;, useValue: &apos;b&apos;}],
})
export class BModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  ...
  providers: [{provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;b&apos;</span>}],
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BModule {}</code></pre><p>&#x7136;&#x540E;&#x6309;&#x7167;&#x5982;&#x4E0B;&#x987A;&#x5E8F;&#x5728; <strong>AppModule</strong> &#x4E2D;&#x5BFC;&#x5165; <strong>AModule</strong> &#x548C; <strong>BModule</strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [AModule, BModule],
  ...
})
export class AppModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [AModule, BModule],
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre><p>&#x67E5;&#x770B;&#x751F;&#x6210;&#x7684;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moduleDef([
     ...
     moduleProvideDef(256, &apos;a&apos;, &apos;b&apos;, []),
     moduleProvideDef(256, &apos;root&apos;, &apos;root&apos;, []),
 ]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">moduleDef([
     ...
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;b&apos;</span>, []),
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;root&apos;</span>, <span class="hljs-string">&apos;root&apos;</span>, []),
 ]);</code></pre><p>&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x5DF2;&#x7ECF;&#x9A8C;&#x8BC1;&#x4E86;&#x7B2C;&#x4E8C;&#x6761;&#x89C4;&#x5219;&#x3002;&#x6211;&#x4EEC;&#x5728; <strong>BModule</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x4E86; <strong>{provide: &apos;a&apos;, useValue: &apos;b&apos;}</strong>&#xFF0C;&#x73B0;&#x5728;&#x8BA9;&#x6211;&#x4EEC;&#x4EA4;&#x6362;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x987A;&#x5E8F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [BModule, AModule],
  ...
})
export class AppModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [BModule, AModule],
  ...
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppModule {}</code></pre><p>&#x67E5;&#x770B;&#x751F;&#x6210;&#x7684;&#x6A21;&#x5757;&#x5DE5;&#x5382;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="moduleDef([
     ...
     moduleProvideDef(256, &apos;a&apos;, &apos;a&apos;, []),
     moduleProvideDef(256, &apos;root&apos;, &apos;root&apos;, []),
 ]);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">moduleDef([
     ...
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;a&apos;</span>, <span class="hljs-string">&apos;a&apos;</span>, []),
     moduleProvideDef(<span class="hljs-number">256</span>, <span class="hljs-string">&apos;root&apos;</span>, <span class="hljs-string">&apos;root&apos;</span>, []),
 ]);</code></pre><p>&#x548C;&#x9884;&#x60F3;&#x4E00;&#x6837;&#xFF0C;&#x7531;&#x4E8E;&#x4EA4;&#x6362;&#x4E86;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x987A;&#x5E8F;&#xFF0C;&#x73B0;&#x5728; <strong>AModule</strong> &#x7684; <strong>{provide: &apos;a&apos;, useValue: &apos;a&apos;}</strong> &#x8986;&#x76D6;&#x4E86; <strong>BModule</strong> &#x7684; <strong>{provide: &apos;a&apos;, useValue: &apos;b&apos;}</strong>&#x3002;</p><blockquote>&#x6CE8;&#xFF1A;&#x4E0A;&#x6587;&#x4F5C;&#x8005;&#x63D0;&#x4F9B;&#x4E86; AppModule &#x88AB; @angular/compiler &#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5E76;&#x9488;&#x5BF9;&#x7F16;&#x8BD1;&#x540E;&#x7684;&#x4EE3;&#x7801;&#x5206;&#x6790;&#x591A;&#x4E2A; modules &#x7684; providers &#x4F1A;&#x88AB;&#x5408;&#x5E76;&#x3002;&#x5B9E;&#x9645;&#x4E0A;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x547D;&#x4EE4; <strong>yarn ngc -p ./tmp/tsconfig.json</strong> &#x81EA;&#x5DF1;&#x53BB;&#x7F16;&#x8BD1;&#x4E00;&#x4E2A;&#x5C0F;&#x5B9E;&#x4F8B;&#x770B;&#x770B;&#xFF0C;&#x5176;&#x4E2D;&#xFF0C;<strong>./node_modules/.bin/ngc</strong> &#x662F; <strong>@angular/compiler-cli</strong> &#x63D0;&#x4F9B;&#x7684; cli &#x547D;&#x4EE4;&#x3002;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <strong>ng new module</strong> &#x65B0;&#x5EFA;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#xFF0C;&#x6211;&#x7684;&#x7248;&#x672C;&#x662F; 6.0.5&#x3002;&#x7136;&#x540E;&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x521B;&#x5EFA; <strong>/tmp</strong> &#x6587;&#x4EF6;&#x5939;&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x4E0A; <strong>tsconfig.json</strong>&#xFF0C;&#x5185;&#x5BB9;&#x590D;&#x5236;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x7684; <strong>tsconfig.json</strong>&#xFF0C;&#x7136;&#x540E;&#x52A0;&#x4E0A;&#x4E00;&#x4E2A; <strong>module.ts</strong> &#x6587;&#x4EF6;&#x3002;<strong>module.ts</strong> &#x5185;&#x5BB9;&#x5305;&#x542B;&#x6839;&#x6A21;&#x5757; <strong>AppModule</strong>&#xFF0C;&#x548C;&#x4E24;&#x4E2A;&#x6A21;&#x5757; <strong>AModule</strong> &#x548C; <strong>BModule</strong>&#xFF0C;<strong>AModule</strong> &#x63D0;&#x4F9B; <strong>AService</strong> &#x3001;<strong>{provide:&apos;a&apos;, value:&apos;a&apos;}</strong> &#x548C; <strong>{provide:&apos;b&apos;, value:&apos;b&apos;}</strong> &#x670D;&#x52A1;&#xFF0C;&#x800C; <strong>BModule</strong> &#x63D0;&#x4F9B; <strong>BService</strong> &#x548C; <strong>{provide: &apos;b&apos;, useValue: &apos;c&apos;}</strong>&#x3002;<strong>AModule</strong> &#x548C; <strong>BModule</strong> &#x6309;&#x7167;&#x5148;&#x540E;&#x987A;&#x5E8F;&#x5BFC;&#x5165;&#x6839;&#x6A21;&#x5757; <strong>AppModule</strong>&#xFF0C;&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component, Inject, Input, NgModule} from &apos;@angular/core&apos;;
import &quot;./goog&quot;; // goog.d.ts &#x6E90;&#x7801;&#x6587;&#x4EF6;&#x62F7;&#x8D1D;&#x5230; /tmp &#x6587;&#x4EF6;&#x5939;&#x4E0B;
import &quot;hammerjs&quot;;
import {platformBrowserDynamic} from &apos;@angular/platform-browser-dynamic&apos;;
export class AService {
}
@NgModule({
  providers: [
    AService,
    {provide: &apos;a&apos;, useValue: &apos;a&apos;},
    {provide: &apos;b&apos;, useValue: &apos;b&apos;},
  ],
})
export class AModule {
}
export class BService {
}
@NgModule({
  providers: [
    BService,
    {provide: &apos;b&apos;, useValue: &apos;c&apos;}
  ]
})
export class BModule {
}
@Component({
  selector: &apos;app&apos;,
  template: `
    &lt;p&gt;"{{"name"}}"&lt;/p&gt;
    &lt;!--&lt;a-comp&gt;&lt;/a-comp&gt;--&gt;
  `
})
export class AppComp {
  name = &apos;lx1036&apos;;
}

export class AppService {
}

@NgModule({
  imports: [AModule, BModule],
  declarations: [AppComp],
  providers: [
    AppService,
    {provide: &apos;a&apos;, useValue: &apos;b&apos;}
  ],
  bootstrap: [AppComp]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule).then(ngModuleRef =&gt; console.log(ngModuleRef));" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> {Component, Inject, Input, NgModule} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;./goog&quot;</span>; <span class="hljs-regexp">//</span> goog.d.ts &#x6E90;&#x7801;&#x6587;&#x4EF6;&#x62F7;&#x8D1D;&#x5230; /tmp &#x6587;&#x4EF6;&#x5939;&#x4E0B;
<span class="hljs-keyword">import</span> <span class="hljs-string">&quot;hammerjs&quot;</span>;
<span class="hljs-keyword">import</span> {platformBrowserDynamic} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/platform-browser-dynamic&apos;</span>;
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AService</span> {</span>
}
@NgModule({
  providers: [
    AService,
    {provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;a&apos;</span>},
    {provide: <span class="hljs-string">&apos;b&apos;</span>, useValue: <span class="hljs-string">&apos;b&apos;</span>},
  ],
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AModule</span> {</span>
}
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BService</span> {</span>
}
@NgModule({
  providers: [
    BService,
    {provide: <span class="hljs-string">&apos;b&apos;</span>, useValue: <span class="hljs-string">&apos;c&apos;</span>}
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BModule</span> {</span>
}
@Component({
  selector: <span class="hljs-string">&apos;app&apos;</span>,
  template: `<span class="javascript">
    &lt;p&gt;"{{"name"}}"&lt;<span class="hljs-regexp">/p&gt;
    &lt;!--&lt;a-comp&gt;&lt;/</span>a-comp&gt;--&gt;
  </span>`
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComp</span> {</span>
  name = <span class="hljs-string">&apos;lx1036&apos;</span>;
}

<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppService</span> {</span>
}

@NgModule({
  imports: [AModule, BModule],
  declarations: [AppComp],
  providers: [
    AppService,
    {provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;b&apos;</span>}
  ],
  bootstrap: [AppComp]
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppModule</span> {</span>
}

platformBrowserDynamic().bootstrapModule(AppModule).<span class="hljs-keyword">then</span>(ngModuleRef =&gt; <span class="hljs-built_in">console</span>.log(ngModuleRef));</code></pre><blockquote>&#x7136;&#x540E; <strong>yarn ngc -p ./tmp/tsconfig.json</strong> &#x4F7F;&#x7528; @angular/compiler &#x7F16;&#x8BD1;&#x8FD9;&#x4E2A; module.ts &#x6587;&#x4EF6;&#x4F1A;&#x751F;&#x6210;&#x591A;&#x4E2A;&#x6587;&#x4EF6;&#xFF0C;&#x5305;&#x62EC; <strong>module.js</strong> &#x548C; <strong>module.factory.js</strong>&#x3002;<br>&#x5148;&#x770B;&#x4E0B; <strong>module.js</strong>&#x3002;<strong>AppModule</strong> &#x7C7B;&#x4F1A;&#x88AB;&#x7F16;&#x8BD1;&#x4E3A;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x53D1;&#x73B0;&#x6211;&#x4EEC;&#x5728; <strong>@NgModule</strong> &#x7C7B;&#x88C5;&#x9970;&#x5668;&#x4E2D;&#x5199;&#x7684;&#x5143;&#x6570;&#x636E;&#xFF0C;&#x4F1A;&#x88AB;&#x8D4B;&#x503C;&#x7ED9; <strong>AppModule.decorators</strong> &#x5C5E;&#x6027;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5C5E;&#x6027;&#x88C5;&#x9970;&#x5668;&#xFF0C;&#x4F1A;&#x88AB;&#x8D4B;&#x503C;&#x7ED9; <strong>propDecorators</strong> &#x5C5E;&#x6027;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [AModule, BModule],
                    declarations: [AppComp],
                    providers: [
                        AppService,
                        { provide: &apos;a&apos;, useValue: &apos;b&apos; }
                    ],
                    bootstrap: [AppComp]
                },] },
    ];
    return AppModule;
}());
exports.AppModule = AppModule;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">var</span> AppModule = <span class="hljs-comment">/** <span class="hljs-doctag">@class</span> */</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">AppModule</span><span class="hljs-params">()</span> </span>{
    }
    AppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [AModule, BModule],
                    declarations: [AppComp],
                    providers: [
                        AppService,
                        { provide: <span class="hljs-string">&apos;a&apos;</span>, useValue: <span class="hljs-string">&apos;b&apos;</span> }
                    ],
                    bootstrap: [AppComp]
                },] },
    ];
    <span class="hljs-keyword">return</span> AppModule;
}());
exports.AppModule = AppModule;</code></pre><blockquote>&#x7136;&#x540E;&#x770B;&#x4E0B; <strong>module.factory.js</strong> &#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x672C;&#x6587;&#x5173;&#x4E8E;&#x6A21;&#x5757; <strong>providers</strong> &#x5408;&#x5E76;&#x5C31;&#x53EF;&#x4EE5;&#x4ECE;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x770B;&#x51FA;&#x3002;&#x8BE5;&#x6587;&#x4EF6; AppModuleNgFactory &#x5BF9;&#x8C61;&#x4E2D;&#x5C31;&#x5305;&#x542B;&#x5408;&#x5E76;&#x540E;&#x7684; <strong>providers</strong>&#xFF0C;&#x8FD9;&#x4E9B; <strong>providers</strong> &#x6765;&#x81EA;&#x4E8E; <strong>AppModule,AModule,BModule</strong>&#xFF0C;&#x5E76;&#x4E14; <strong>AppModule</strong> &#x4E2D;&#x7684; <strong>providers</strong> &#x4F1A;&#x8986;&#x76D6;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x7684; <strong>providers</strong>&#xFF0C;<strong>BModule</strong> &#x4E2D;&#x7684; <strong>providers</strong> &#x4F1A;&#x8986;&#x76D6; <strong>AModule</strong> &#x7684; <strong>providers</strong>&#xFF0C;&#x56E0;&#x4E3A; <strong>BModule</strong> &#x5728; <strong>AModule</strong> &#x4E4B;&#x540E;&#x5BFC;&#x5165;&#xFF0C;&#x53EF;&#x4EE5;&#x4EA4;&#x6362;&#x5BFC;&#x5165;&#x987A;&#x5E8F;&#x770B;&#x770B;&#x53D1;&#x751F;&#x4EC0;&#x4E48;&#x3002;&#x5176;&#x4E2D;&#xFF0C;&#x275;cmf &#x662F; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/entrypoint.ts#L33-L39" rel="nofollow noreferrer" target="_blank">createNgModuleFactory</a></strong>&#xFF0C;&#x275;mod &#x662F; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/ng_module.ts#L40-L63" rel="nofollow noreferrer" target="_blank">moduleDef</a></strong>&#xFF0C;&#x275;mpd &#x662F; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/ng_module.ts#L25-L38" rel="nofollow noreferrer" target="_blank">moduleProvideDef</a></strong>&#xFF0C;<strong>moduleProvideDef</strong> &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/types.ts#L155-L202" rel="nofollow noreferrer" target="_blank">enum NodeFlags</a></strong> &#x8282;&#x70B9;&#x7C7B;&#x578B;&#xFF0C;&#x7528;&#x6765;&#x8868;&#x793A;&#x5F53;&#x524D;&#x8282;&#x70B9;&#x662F;&#x4EC0;&#x4E48;&#x7C7B;&#x578B;&#xFF0C;&#x6BD4;&#x5982; <strong>i0.&#x275;mpd(256, &quot;a&quot;, &quot;a&quot;, [])</strong> &#x4E2D;&#x7684; 256 &#x8868;&#x793A; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/view/types.ts#L172" rel="nofollow noreferrer" target="_blank">TypeValueProvider</a></strong> &#x662F;&#x4E2A;&#x503C;&#x7C7B;&#x578B;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(exports, &quot;__esModule&quot;, { value: true });
var i0 = require(&quot;@angular/core&quot;);
var i1 = require(&quot;./module&quot;);

var AModuleNgFactory = i0.&#x275;cmf(
  i1.AModule,
  [],
  function (_l) {
    return i0.&#x275;mod([
      i0.&#x275;mpd(512, i0.ComponentFactoryResolver, i0.&#x275;CodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
      i0.&#x275;mpd(4608, i1.AService, i1.AService, []),
      i0.&#x275;mpd(1073742336, i1.AModule, i1.AModule, []),
      i0.&#x275;mpd(256, &quot;a&quot;, &quot;a&quot;, []),
      i0.&#x275;mpd(256, &quot;b&quot;, &quot;b&quot;, [])]
    );
  });
exports.AModuleNgFactory = AModuleNgFactory;

var BModuleNgFactory = i0.&#x275;cmf(
  i1.BModule,
  [],
  function (_l) {
    return i0.&#x275;mod([
      i0.&#x275;mpd(512, i0.ComponentFactoryResolver, i0.&#x275;CodegenComponentFactoryResolver, [[8, []], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
      i0.&#x275;mpd(4608, i1.BService, i1.BService, []),
      i0.&#x275;mpd(1073742336, i1.BModule, i1.BModule, []),
      i0.&#x275;mpd(256, &quot;b&quot;, &quot;c&quot;, [])
    ]);
  });
exports.BModuleNgFactory = BModuleNgFactory;

var AppModuleNgFactory = i0.&#x275;cmf(
  i1.AppModule,
  [i1.AppComp], // AppModule &#x7684; bootstrapComponnets &#x542F;&#x52A8;&#x7EC4;&#x4EF6;&#x6570;&#x636E;
  function (_l) {
    return i0.&#x275;mod([
      i0.&#x275;mpd(512, i0.ComponentFactoryResolver, i0.&#x275;CodegenComponentFactoryResolver, [[8, [AppCompNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
      i0.&#x275;mpd(4608, i1.AService, i1.AService, []),
      i0.&#x275;mpd(4608, i1.BService, i1.BService, []),
      i0.&#x275;mpd(4608, i1.AppService, i1.AppService, []),
      i0.&#x275;mpd(1073742336, i1.AModule, i1.AModule, []),
      i0.&#x275;mpd(1073742336, i1.BModule, i1.BModule, []),
      i0.&#x275;mpd(1073742336, i1.AppModule, i1.AppModule, []),
      i0.&#x275;mpd(256, &quot;a&quot;, &quot;b&quot;, []),
      i0.&#x275;mpd(256, &quot;b&quot;, &quot;c&quot;, [])]);
  });
exports.AppModuleNgFactory = AppModuleNgFactory;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs maxima"><code>Object.defineProperty(exports, <span class="hljs-string">&quot;__esModule&quot;</span>, { value: <span class="hljs-literal">true</span> });
<span class="hljs-built_in">var</span> <span class="hljs-built_in">i0</span> = require(<span class="hljs-string">&quot;@angular/core&quot;</span>);
<span class="hljs-built_in">var</span> <span class="hljs-built_in">i1</span> = require(<span class="hljs-string">&quot;./module&quot;</span>);

<span class="hljs-built_in">var</span> AModuleNgFactory = <span class="hljs-built_in">i0</span>.&#x275;cmf(
  <span class="hljs-built_in">i1</span>.AModule,
  [],
  function (_l) {
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">i0</span>.&#x275;<span class="hljs-built_in">mod</span>([
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">512</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver, <span class="hljs-built_in">i0</span>.&#x275;CodegenComponentFactoryResolver, [[<span class="hljs-number">8</span>, []], [<span class="hljs-number">3</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver], <span class="hljs-built_in">i0</span>.NgModuleRef]),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">4608</span>, <span class="hljs-built_in">i1</span>.AService, <span class="hljs-built_in">i1</span>.AService, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">1073742336</span>, <span class="hljs-built_in">i1</span>.AModule, <span class="hljs-built_in">i1</span>.AModule, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">256</span>, <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;a&quot;</span>, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">256</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, [])]
    );
  });
exports.AModuleNgFactory = AModuleNgFactory;

<span class="hljs-built_in">var</span> BModuleNgFactory = <span class="hljs-built_in">i0</span>.&#x275;cmf(
  <span class="hljs-built_in">i1</span>.BModule,
  [],
  function (_l) {
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">i0</span>.&#x275;<span class="hljs-built_in">mod</span>([
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">512</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver, <span class="hljs-built_in">i0</span>.&#x275;CodegenComponentFactoryResolver, [[<span class="hljs-number">8</span>, []], [<span class="hljs-number">3</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver], <span class="hljs-built_in">i0</span>.NgModuleRef]),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">4608</span>, <span class="hljs-built_in">i1</span>.BService, <span class="hljs-built_in">i1</span>.BService, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">1073742336</span>, <span class="hljs-built_in">i1</span>.BModule, <span class="hljs-built_in">i1</span>.BModule, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">256</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>, [])
    ]);
  });
exports.BModuleNgFactory = BModuleNgFactory;

<span class="hljs-built_in">var</span> AppModuleNgFactory = <span class="hljs-built_in">i0</span>.&#x275;cmf(
  <span class="hljs-built_in">i1</span>.AppModule,
  [<span class="hljs-built_in">i1</span>.AppComp], // AppModule &#x7684; bootstrapComponnets &#x542F;&#x52A8;&#x7EC4;&#x4EF6;&#x6570;&#x636E;
  function (_l) {
    <span class="hljs-built_in">return</span> <span class="hljs-built_in">i0</span>.&#x275;<span class="hljs-built_in">mod</span>([
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">512</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver, <span class="hljs-built_in">i0</span>.&#x275;CodegenComponentFactoryResolver, [[<span class="hljs-number">8</span>, [AppCompNgFactory]], [<span class="hljs-number">3</span>, <span class="hljs-built_in">i0</span>.ComponentFactoryResolver], <span class="hljs-built_in">i0</span>.NgModuleRef]),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">4608</span>, <span class="hljs-built_in">i1</span>.AService, <span class="hljs-built_in">i1</span>.AService, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">4608</span>, <span class="hljs-built_in">i1</span>.BService, <span class="hljs-built_in">i1</span>.BService, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">4608</span>, <span class="hljs-built_in">i1</span>.AppService, <span class="hljs-built_in">i1</span>.AppService, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">1073742336</span>, <span class="hljs-built_in">i1</span>.AModule, <span class="hljs-built_in">i1</span>.AModule, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">1073742336</span>, <span class="hljs-built_in">i1</span>.BModule, <span class="hljs-built_in">i1</span>.BModule, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">1073742336</span>, <span class="hljs-built_in">i1</span>.AppModule, <span class="hljs-built_in">i1</span>.AppModule, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">256</span>, <span class="hljs-string">&quot;a&quot;</span>, <span class="hljs-string">&quot;b&quot;</span>, []),
      <span class="hljs-built_in">i0</span>.&#x275;mpd(<span class="hljs-number">256</span>, <span class="hljs-string">&quot;b&quot;</span>, <span class="hljs-string">&quot;c&quot;</span>, [])]);
  });
exports.AppModuleNgFactory = AppModuleNgFactory;</code></pre><blockquote>&#x81EA;&#x5DF1;&#x53BB;&#x7F16;&#x8BD1;&#x5B9E;&#x8DF5;&#x4E0B;&#xFF0C;&#x4F1A;&#x6BD4;&#x53EA;&#x770B;&#x6587;&#x7AE0;&#x7684;&#x89E3;&#x91CA;&#xFF0C;&#x6548;&#x7387;&#x66F4;&#x9AD8;&#x5F88;&#x591A;&#x3002;</blockquote><h2 id="articleHeader2">&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;</h2><p>&#x73B0;&#x5728;&#x53C8;&#x6709;&#x4E00;&#x4E2A;&#x4EE4;&#x4EBA;&#x56F0;&#x60D1;&#x7684;&#x5730;&#x65B9;-&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x3002;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x662F;&#x8FD9;&#x6837;&#x8BF4;&#x7684;&#xFF08;&#x6CE8;&#xFF1A;&#x4E0D;&#x7FFB;&#x8BD1;&#xFF09;&#xFF1A;</p><blockquote>Angular creates a lazy-loaded module with its own injector, a&#xA0;child&#xA0;of the root injector&#x2026; So a lazy-loaded module that imports that shared module makes its own copy of the service.</blockquote><p>&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x77E5;&#x9053; Angular &#x4F1A;&#x4E3A;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x521B;&#x5EFA;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x6CE8;&#x5165;&#x5668;&#xFF0C;&#x8FD9;&#x662F;&#x56E0;&#x4E3A; Angular &#x7F16;&#x8BD1;&#x5668;&#x4F1A;&#x4E3A;&#x6BCF;&#x4E00;&#x4E2A;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x7F16;&#x8BD1;&#x751F;&#x6210;&#x4E00;&#x4E2A; <strong>&#x72EC;&#x7ACB;&#x7684;&#x7EC4;&#x4EF6;&#x5DE5;&#x5382;</strong>&#x3002;&#x8FD9;&#x6837;&#x5728;&#x8BE5;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>providers</strong> &#x4E0D;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#x5230;&#x4E3B;&#x6A21;&#x5757;&#x7684;&#x6CE8;&#x5165;&#x5668;&#x5185;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E2D;&#x5B9A;&#x4E49;&#x4E86;&#x4E0E;&#x4E3B;&#x6A21;&#x5757;&#x6709;&#x7740;&#x76F8;&#x540C;&#x7684; <strong>provider</strong>&#xFF0C;&#x5219; Angular &#x7F16;&#x8BD1;&#x5668;&#x4F1A;&#x4E3A;&#x8BE5; <strong>provider</strong> &#x521B;&#x5EFA;&#x4E00;&#x4EFD;&#x65B0;&#x7684;&#x670D;&#x52A1;&#x5BF9;&#x8C61;&#x3002;</p><p><strong>&#x6240;&#x4EE5;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E5F;&#x4F1A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x5C42;&#x7EA7;&#xFF0C;&#x4F46;&#x662F;&#x6CE8;&#x5165;&#x5668;&#x7684;&#x5C42;&#x7EA7;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6A21;&#x5757;&#x5C42;&#x7EA7;&#x3002;</strong> &#x5728;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E2D;&#xFF0C;&#x5BFC;&#x5165;&#x7684;&#x6240;&#x6709;&#x6A21;&#x5757;&#x540C;&#x6837;&#x4F1A;&#x5728;&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#x88AB;&#x5408;&#x5E76;&#x4E3A;&#x4E00;&#x4E2A;&#xFF0C;&#x5C31;&#x548C;&#x4E0A;&#x6587;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4E00;&#x6837;&#x3002;</p><p>&#x4EE5;&#x4E0A;&#x76F8;&#x5173;&#x903B;&#x8F91;&#x662F;&#x5728; <strong>@angular/router</strong> &#x5305;&#x7684; <strong>RouterConfigLoader</strong> &#x4EE3;&#x7801;&#x91CC;&#xFF0C;&#x8BE5;&#x6BB5;&#x5C55;&#x793A;&#x4E86;&#x5982;&#x4F55;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x548C;&#x521B;&#x5EFA;&#x6CE8;&#x5165;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class RouterConfigLoader {

  load(parentInjector, route) {
    ...
    const moduleFactory$ = this.loadModuleFactory(route.loadChildren);
    return moduleFactory$.pipe(map((factory: NgModuleFactory&lt;any&gt;) =&gt; {
          ...

          const module = factory.create(parentInjector);
        ...
     }));
  }

  private loadModuleFactory(loadChildren) {
    ...
    return this.loader.load(loadChildren)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> RouterConfigLoader {

  load(parentInjector, route) {
    ...
    <span class="hljs-keyword">const</span> moduleFactory$ = <span class="hljs-keyword">this</span>.loadModuleFactory(route.loadChildren);
    <span class="hljs-keyword">return</span> moduleFactory$.pipe(map(<span class="hljs-function">(<span class="hljs-params">factory: NgModuleFactory&lt;<span class="hljs-built_in">any</span>&gt;</span>) =&gt;</span> {
          ...

          <span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> = factory.create(parentInjector);
        ...
     }));
  }

  private loadModuleFactory(loadChildren) {
    ...
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.loader.load(loadChildren)
  }
}</code></pre><p>&#x67E5;&#x770B;&#x8FD9;&#x884C;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const module = factory.create(parentInjector);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> <span class="hljs-keyword">module</span> = factory.create(parentInjector);</code></pre><p>&#x4F20;&#x5165;&#x7236;&#x6CE8;&#x5165;&#x5668;&#x6765;&#x521B;&#x5EFA;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x65B0;&#x5BF9;&#x8C61;&#x3002;</p><h2 id="articleHeader3">forRoot &#x548C; forChild &#x9759;&#x6001;&#x65B9;&#x6CD5;</h2><p>&#x67E5;&#x770B;&#x5B98;&#x7F51;&#x662F;&#x5982;&#x4F55;&#x4ECB;&#x7ECD;&#x7684;&#xFF08;&#x6CE8;&#xFF1A;&#x4E0D;&#x7FFB;&#x8BD1;&#xFF09;&#xFF1A;</p><blockquote>Add a CoreModule.forRoot&#xA0;method that configures the core&#xA0;UserService&#x2026; Call&#xA0;forRoot&#xA0;only in the root application module,&#xA0;AppModule</blockquote><p>&#x8FD9;&#x4E2A;&#x5EFA;&#x8BAE;&#x662F;&#x5408;&#x7406;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x7406;&#x89E3;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x6700;&#x7EC8;&#x4F1A;&#x5199;&#x51FA;&#x7C7B;&#x4F3C;&#x4E0B;&#x9762;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [
    SomeLibCarouselModule.forRoot(),
    SomeLibCheckboxModule.forRoot(),
    SomeLibCloseModule.forRoot(),
    SomeLibCollapseModule.forRoot(),
    SomeLibDatetimeModule.forRoot(),
    ...
  ]
})
export class SomeLibRootModule {...}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [
    SomeLibCarouselModule.forRoot(),
    SomeLibCheckboxModule.forRoot(),
    SomeLibCloseModule.forRoot(),
    SomeLibCollapseModule.forRoot(),
    SomeLibDatetimeModule.forRoot(),
    ...
  ]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> SomeLibRootModule {...}</code></pre><p>&#x6BCF;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#x7684;&#x6A21;&#x5757;&#xFF08;&#x5982; <strong>CarouselModule</strong>&#xFF0C;<strong>CheckboxModule</strong> &#x7B49;&#x7B49;&#xFF09;<strong>&#x4E0D;&#x518D;&#x5B9A;&#x4E49;&#x4EFB;&#x4F55; providers</strong>&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x89C9;&#x5F97;&#x6CA1;&#x7406;&#x7531;&#x5728;&#x8FD9;&#x91CC;&#x4F7F;&#x7528; <strong>forRoot</strong>&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x4E00;&#x8D77;&#x770B;&#x770B;&#x4E3A;&#x4F55;&#x5728;&#x7B2C;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#x9700;&#x8981; <strong>forRoot</strong>&#x3002;</p><p>&#x5F53;&#x4F60;&#x5BFC;&#x5165;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x65F6;&#xFF0C;&#x901A;&#x5E38;&#x4F1A;&#x4F7F;&#x7528;&#x8BE5;&#x6A21;&#x5757;&#x7684;&#x5F15;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({ providers: [AService] })
export class A {}

@NgModule({ imports: [A] })
export class B {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({ providers: [AService] })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> A {}

<span class="hljs-meta">@NgModule</span>({ imports: [A] })
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> B {}</code></pre><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5728; <strong>A</strong> &#x6A21;&#x5757;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x6240;&#x6709; <strong>providers</strong> &#x90FD;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#x5230;&#x4E3B;&#x6CE8;&#x5165;&#x5668;&#xFF0C;&#x5E76;&#x5728;&#x6574;&#x4E2A;&#x7A0B;&#x5E8F;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x53EF;&#x7528;&#xFF0C;&#x6211;&#x60F3;&#x4F60;&#x5E94;&#x8BE5;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x539F;&#x56E0;-&#x4E0A;&#x6587;&#x4E2D;&#x5DF2;&#x7ECF;&#x89E3;&#x91CA;&#x4E86;&#x6240;&#x6709;&#x6A21;&#x5757; <strong>providers</strong> &#x90FD;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#xFF0C;&#x7528;&#x6765;&#x521B;&#x5EFA;&#x6CE8;&#x5165;&#x5668;&#x3002;</p><p>Angular &#x4E5F;&#x652F;&#x6301;&#x53E6;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x6765;&#x5BFC;&#x5165;&#x5E26;&#x6709; <strong>providers</strong> &#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5B83;&#x4E0D;&#x662F;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x7684;&#x5F15;&#x7528;&#x6765;&#x5BFC;&#x5165;&#xFF0C;&#x800C;&#x662F;&#x4F20;&#x4E00;&#x4E2A;&#x5B9E;&#x73B0;&#x4E86; <strong>ModuleWithProviders</strong> &#x63A5;&#x53E3;&#x7684;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface ModuleWithProviders { 
   ngModule: Type&lt;any&gt;
   providers?: Provider[] 
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">interface</span> ModuleWithProviders { 
   ngModule: Type&lt;<span class="hljs-built_in">any</span>&gt;
   providers?: Provider[] 
}</code></pre><p>&#x4E0A;&#x6587;&#x4E2D;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD9;&#x4E48;&#x6539;&#x5199;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({})
class A {}

const moduleWithProviders = {
    ngModule: A,
    providers: [AService]
};

@NgModule({
    imports: [moduleWithProviders]
})
export class B {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({})
<span class="hljs-keyword">class</span> A {}

<span class="hljs-keyword">const</span> moduleWithProviders = {
    ngModule: A,
    providers: [AService]
};

<span class="hljs-meta">@NgModule</span>({
    imports: [moduleWithProviders]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> B {}</code></pre><p>&#x6700;&#x597D;&#x80FD;&#x5728;&#x6A21;&#x5757;&#x5BF9;&#x8C61;&#x5185;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x9759;&#x6001;&#x65B9;&#x6CD5;&#x6765;&#x8FD4;&#x56DE; <strong>ModuleWithProviders</strong>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528; <strong>ModuleWithProviders</strong> &#x7C7B;&#x578B;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x4F7F;&#x7528; <strong>forRoot</strong> &#x65B9;&#x6CD5;&#x6765;&#x91CD;&#x6784;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({})
class A {
  static forRoot(): ModuleWithProviders {
    return {ngModule: A, providers: [AService]};
  }
}

@NgModule({
  imports: [A.forRoot()]
})
export class B {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({})
<span class="hljs-keyword">class</span> A {
  <span class="hljs-keyword">static</span> forRoot(): ModuleWithProviders {
    <span class="hljs-keyword">return</span> {ngModule: A, providers: [AService]};
  }
}

<span class="hljs-meta">@NgModule</span>({
  imports: [A.forRoot()]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> B {}</code></pre><p>&#x5F53;&#x7136;&#x5BF9;&#x4E8E;&#x6587;&#x4E2D;&#x8FD9;&#x4E2A;&#x7B80;&#x5355;&#x793A;&#x4F8B;&#x6CA1;&#x5FC5;&#x8981;&#x5B9A;&#x4E49; <strong>forRoot</strong> &#x65B9;&#x6CD5;&#x8FD4;&#x56DE; <strong>ModuleWithProviders</strong> &#x7C7B;&#x578B;&#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A;&#x53EF;&#x4EE5;&#x5728;&#x4E24;&#x4E2A;&#x6A21;&#x5757;&#x5185;&#x76F4;&#x63A5;&#x5B9A;&#x4E49; <strong>providers</strong> &#x6216;&#x5982;&#x4E0A;&#x6587;&#x4F7F;&#x7528;&#x4E00;&#x4E2A; <strong>moduleWithProviders</strong> &#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x91CC;&#x4EC5;&#x4EC5;&#x4E5F;&#x662F;&#x4E3A;&#x4E86;&#x6F14;&#x793A;&#x6548;&#x679C;&#x3002;&#x7136;&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x5206;&#x5272; <strong>providers</strong>&#xFF0C;&#x5E76;&#x5728;&#x88AB;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x4E2D;&#x5206;&#x522B;&#x5B9A;&#x4E49;&#x8FD9;&#x4E9B; <strong>providers</strong>&#xFF0C;&#x90A3;&#x4E0A;&#x6587;&#x4E2D;&#x7684;&#x505A;&#x6CD5;&#x5C31;&#x5F88;&#x6709;&#x610F;&#x4E49;&#x4E86;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF0C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x4E3A;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684; <strong>A</strong> &#x670D;&#x52A1;&#xFF0C;&#x4E3A;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A; <strong>B</strong> &#x670D;&#x52A1;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x4E0A;&#x6587;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x6211;&#x4EEC;&#x4F7F;&#x7528; <strong>forRoot</strong> &#x65B9;&#x6CD5;&#x4E3A;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x8FD4;&#x56DE; <strong>providers</strong>&#xFF0C;&#x4F7F;&#x7528; <strong>forChild</strong> &#x65B9;&#x6CD5;&#x4E3A;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x8FD4;&#x56DE; <strong>providers</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({})
class A {
  static forRoot() {
    return {ngModule: A, providers: [AService]};
  }
  static forChild() {
    return {ngModule: A, providers: [BService]};
  }
}

@NgModule({
  imports: [A.forRoot()]
})
export class NonLazyLoadedModule {}

@NgModule({
  imports: [A.forChild()]
})
export class LazyLoadedModule {}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({})
<span class="hljs-keyword">class</span> A {
  <span class="hljs-keyword">static</span> forRoot() {
    <span class="hljs-keyword">return</span> {ngModule: A, providers: [AService]};
  }
  <span class="hljs-keyword">static</span> forChild() {
    <span class="hljs-keyword">return</span> {ngModule: A, providers: [BService]};
  }
}

<span class="hljs-meta">@NgModule</span>({
  imports: [A.forRoot()]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> NonLazyLoadedModule {}

<span class="hljs-meta">@NgModule</span>({
  imports: [A.forChild()]
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> LazyLoadedModule {}</code></pre><p>&#x56E0;&#x4E3A;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x4F1A;&#x88AB;&#x5408;&#x5E76;&#xFF0C;&#x6240;&#x4EE5; <strong>forRoot</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>providers</strong> &#x5168;&#x5C40;&#x53EF;&#x7528;&#xFF08;&#x6CE8;&#xFF1A;&#x5305;&#x62EC;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x548C;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#xFF09;&#xFF0C;&#x4F46;&#x662F;&#x7531;&#x4E8E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x6709;&#x5B83;&#x81EA;&#x5DF1;&#x7684;&#x6CE8;&#x5165;&#x5668;&#xFF0C;&#x4F60;&#x5728; <strong>forChild</strong> &#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>providers</strong> &#x53EA;&#x5728;&#x5F53;&#x524D;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5185;&#x53EF;&#x7528;&#xFF08;&#x6CE8;&#xFF1A;&#x4E0D;&#x7FFB;&#x8BD1;&#xFF09;&#x3002;</p><blockquote>Please note that the names of methods that you use to return&#xA0;ModuleWithProviders&#xA0;structure can be completely arbitrary. The names&#xA0;forChild&#xA0;and&#xA0;forRoot&#xA0;I used in the examples above are just conventional names recommended by Angular team and used in the&#xA0;RouterModuleimplementation.&#xFF08;&#x6CE8;&#xFF1A;&#x5373; forRoot &#x548C; forChild &#x65B9;&#x6CD5;&#x540D;&#x79F0;&#x53EF;&#x4EE5;&#x968F;&#x4FBF;&#x4FEE;&#x6539;&#x3002;&#xFF09;</blockquote><p>&#x597D;&#x5427;&#xFF0C;&#x56DE;&#x5230;&#x6700;&#x5F00;&#x59CB;&#x8981;&#x770B;&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@NgModule({
  imports: [
    SomeLibCarouselModule.forRoot(),
    SomeLibCheckboxModule.forRoot(),
    ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@NgModule</span>({
  imports: [
    SomeLibCarouselModule.forRoot(),
    SomeLibCheckboxModule.forRoot(),
    ...</code></pre><p>&#x6839;&#x636E;&#x4E0A;&#x6587;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x5C31;&#x53D1;&#x73B0;&#x6CA1;&#x6709;&#x5FC5;&#x8981;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x91CC;&#x5B9A;&#x4E49; <strong>forRoot</strong> &#x65B9;&#x6CD5;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x4E2D;&#x5B9A;&#x4E49;&#x7684; <strong>providers</strong> &#x9700;&#x8981;&#x5168;&#x5C40;&#x53EF;&#x7528;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x4E3A;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5355;&#x72EC;&#x51C6;&#x5907; <strong>providers</strong>&#xFF08;&#x6CE8;&#xFF1A;&#x5373;&#x672C;&#x5C31;&#x6CA1;&#x6709;&#x5207;&#x5272; <strong>providers</strong> &#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x4F60;&#x4F7F;&#x7528; <strong>forRoot</strong> &#x5F3A;&#x5236;&#x6765;&#x5207;&#x5272;&#xFF09;&#x3002;&#x751A;&#x81F3;&#xFF0C;&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x88AB;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x6CA1;&#x6709;&#x5B9A;&#x4E49;&#x4EFB;&#x4F55; <strong>providers</strong>&#xFF0C;&#x90A3;&#x4EE3;&#x7801;&#x5199;&#x7684;&#x5C31;&#x66F4;&#x8BA9;&#x4EBA;&#x8FF7;&#x60D1;&#x3002;</p><blockquote>Use forRoot/forChild convention only for shared modules with providers that are going to be imported into both eager and lazy module&#xA0;modules</blockquote><p>&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F; <strong>forRoot</strong> &#x548C; <strong>forChild</strong> &#x4EC5;&#x4EC5;&#x662F;&#x65B9;&#x6CD5;&#x800C;&#x5DF2;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x3002;&#x6BD4;&#x5982;&#xFF0C;<strong>@angular/router</strong> &#x5305;&#x4E2D;&#x7684; <strong>RouterModule</strong>&#xFF0C;&#x5C31;&#x5B9A;&#x4E49;&#x4E86; <strong><a href="https://github.com/angular/angular/blob/master/packages/router/src/router_module.ts#L136-L183" rel="nofollow noreferrer" target="_blank">forRoot</a></strong> &#x65B9;&#x6CD5;&#x5E76;&#x4F20;&#x5165;&#x4E86;&#x989D;&#x5916;&#x7684;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class RouterModule {
  static forRoot(routes: Routes, config?: ExtraOptions)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> RouterModule {
  <span class="hljs-keyword">static</span> forRoot(routes: Routes, config?: ExtraOptions)</code></pre><p>&#x4F20;&#x5165;&#x7684; <strong>routes</strong> &#x53C2;&#x6570;&#x662F;&#x7528;&#x6765;&#x6CE8;&#x518C; <strong>ROUTES</strong> &#x6807;&#x8BC6;&#xFF08;token&#xFF09;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static forRoot(routes: Routes, config?: ExtraOptions) {
  return {
    ngModule: RouterModule,
    providers: [
      {provide: ROUTES, multi: true, useValue: routes}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">static</span> forRoot(routes: Routes, config?: ExtraOptions) {
  <span class="hljs-keyword">return</span> {
    ngModule: RouterModule,
    providers: [
      {provide: ROUTES, multi: <span class="hljs-literal">true</span>, useValue: routes}</code></pre><p>&#x4F20;&#x5165;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570; <strong>config</strong> &#x662F;&#x7528;&#x6765;&#x4F5C;&#x4E3A;&#x914D;&#x7F6E;&#x9009;&#x9879;&#x7684;&#xFF08;&#x6CE8;&#xFF1A;&#x5982;&#x914D;&#x7F6E;&#x9884;&#x52A0;&#x8F7D;&#x7B56;&#x7565;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static forRoot(routes: Routes, config?: ExtraOptions) {
  return {
    ngModule: RouterModule,
    providers: [
      {
        provide: PreloadingStrategy,
        useExisting: config.preloadingStrategy ?
          config.preloadingStrategy :
          NoPreloading
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">static</span> forRoot(routes: Routes, config?: ExtraOptions) {
  <span class="hljs-keyword">return</span> {
    ngModule: RouterModule,
    providers: [
      {
        provide: PreloadingStrategy,
        useExisting: config.preloadingStrategy ?
          config.preloadingStrategy :
          NoPreloading
      }</code></pre><p>&#x6B63;&#x5982;&#x4F60;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;<strong>RouterModule</strong> &#x4F7F;&#x7528;&#x4E86; <strong>forRoot</strong> &#x548C; <strong>forChild</strong> &#x65B9;&#x6CD5;&#x6765;&#x5206;&#x5272; <strong>providers</strong>&#xFF0C;&#x5E76;&#x4F20;&#x5165;&#x53C2;&#x6570;&#x6765;&#x914D;&#x7F6E;&#x76F8;&#x5E94;&#x7684; <strong>providers</strong>&#x3002;</p><h2 id="articleHeader4">&#x6A21;&#x5757;&#x7F13;&#x5B58;</h2><p>&#x5728; <strong>Stackoverflow</strong> &#x4E0A;&#x6709;&#x6BB5;&#x65F6;&#x95F4;&#x6709;&#x4F4D;&#x5F00;&#x53D1;&#x8005;&#x63D0;&#x4E86;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x62C5;&#x5FC3;&#x5982;&#x679C;&#x5728;&#x975E;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x548C;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x5BFC;&#x5165;&#x76F8;&#x540C;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x5728;&#x8FD0;&#x884C;&#x65F6;&#x4F1A;&#x5BFC;&#x81F4;&#x8BE5;&#x6A21;&#x5757;&#x4EE3;&#x7801;&#x6709;&#x91CD;&#x590D;&#x3002;&#x8FD9;&#x4E2A;&#x62C5;&#x5FC3;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#xFF0C;&#x4E0D;&#x8FC7;&#x4E0D;&#x5FC5;&#x62C5;&#x5FC3;&#xFF0C;&#x56E0;&#x4E3A;&#x6240;&#x6709;&#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668;&#x4F1A;&#x7F13;&#x5B58;&#x6240;&#x6709;&#x52A0;&#x8F7D;&#x7684;&#x6A21;&#x5757;&#x5BF9;&#x8C61;&#x3002;</p><p>&#x5F53; SystemJS &#x52A0;&#x8F7D;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x540E;&#x4F1A;&#x7F13;&#x5B58;&#x8BE5;&#x6A21;&#x5757;&#xFF0C;&#x4E0B;&#x6B21;&#x5F53;&#x61D2;&#x52A0;&#x8F7D;&#x6A21;&#x5757;&#x53C8;&#x518D;&#x6B21;&#x5BFC;&#x5165;&#x8BE5;&#x6A21;&#x5757;&#x65F6;&#xFF0C;SystemJS &#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668;&#x4F1A;&#x4ECE;&#x7F13;&#x5B58;&#x91CC;&#x53D6;&#x51FA;&#x8BE5;&#x6A21;&#x5757;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x6267;&#x884C;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;&#xFF0C;&#x8FD9;&#x4E2A;&#x8FC7;&#x7A0B;&#x5BF9;&#x6240;&#x6709;&#x6A21;&#x5757;&#x9002;&#x7528;&#xFF08;&#x6CE8;&#xFF1A;Angular &#x5185;&#x7F6E;&#x4E86; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/linker/system_js_ng_module_factory_loader.ts#L49-L85" rel="nofollow noreferrer" target="_blank">SystemJsNgModuleLoader</a></strong> &#x6A21;&#x5757;&#x52A0;&#x8F7D;&#x5668;&#xFF09;&#x3002;&#x6BD4;&#x5982;&#xFF0C;&#x5F53;&#x4F60;&#x5728;&#x5199; Angular &#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x4ECE; <strong>@angular/core</strong> &#x5305;&#x4E2D;&#x5BFC;&#x5165; <strong>Component</strong> &#x88C5;&#x9970;&#x5668;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from &apos;@angular/core&apos;;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@angular/core&apos;</span>;</code></pre><p>&#x4F60;&#x5728;&#x7A0B;&#x5E8F;&#x91CC;&#x591A;&#x5904;&#x5F15;&#x7528;&#x4E86;&#x8FD9;&#x4E2A;&#x5305;&#xFF0C;&#x4F46;&#x662F; SystemJS &#x5E76;&#x4E0D;&#x4F1A;&#x6BCF;&#x6B21;&#x52A0;&#x8F7D;&#x8FD9;&#x4E2A;&#x5305;&#xFF0C;&#x5B83;&#x53EA;&#x4F1A;&#x52A0;&#x8F7D;&#x4E00;&#x6B21;&#x5E76;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#x3002;</p><p>&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528; <strong>angular-cli</strong> &#x6216;&#x8005;&#x81EA;&#x5DF1;&#x914D;&#x7F6E; <strong>Webpack</strong>&#xFF0C;&#x4E5F;&#x540C;&#x6837;&#x9053;&#x7406;&#xFF0C;&#x5B83;&#x53EA;&#x4F1A;&#x52A0;&#x8F7D;&#x4E00;&#x6B21;&#x5E76;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x5E76;&#x7ED9;&#x5B83;&#x5206;&#x914D;&#x4E00;&#x4E2A; <strong>ID</strong>&#xFF0C;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x4F1A;&#x4F7F;&#x7528;&#x8BE5; <strong>ID</strong> &#x6765;&#x627E;&#x5230;&#x8BE5;&#x6A21;&#x5757;&#xFF0C;&#x4ECE;&#x800C;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x8BE5;&#x6A21;&#x5757;&#x63D0;&#x4F9B;&#x7684;&#x591A;&#x79CD;&#x591A;&#x6837;&#x7684;&#x670D;&#x52A1;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] 别再对 Angular Modules 感到迷惑

## 原文链接
[https://segmentfault.com/a/1190000015298240](https://segmentfault.com/a/1190000015298240)

