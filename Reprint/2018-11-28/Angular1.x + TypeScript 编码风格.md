---
title: 'Angular1.x + TypeScript 编码风格' 
date: 2018-11-28 2:30:10
hidden: true
slug: yv2chqyxmoh
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x8BF4;&#x660E;&#xFF1A;&#x53C2;&#x7167;&#x4E86;Angular1.x+es2015&#x7684;&#x4E2D;&#x6587;&#x7FFB;&#x8BD1;&#xFF0C;&#x5E76;&#x5C06;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x4E0D;&#x5408;&#x9002;&#x3001;&#x4E0D;&#x6B63;&#x786E;&#x7684;&#x5730;&#x65B9;&#x8FDB;&#x884C;&#x4E86;&#x4FEE;&#x6539;&#xFF0C;&#x6B22;&#x8FCE;&#x6279;&#x8BC4;&#x6307;&#x6B63;&#x3002;</blockquote><h3 id="articleHeader0">&#x67B6;&#x6784;&#xFF0C;&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#xFF0C;&#x7EC4;&#x4EF6;&#xFF0C;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x4EE5;&#x53CA;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</h3><p><em>&#x6765;&#x81EA;<a href="//twitter.com/toddmotto" rel="nofollow noreferrer">@toddmotto</a>&#x56E2;&#x961F;&#x7684;&#x5B9E;&#x7528;&#x7F16;&#x7801;&#x6307;&#x5357;</em></p><p>Angular &#x7684;&#x7F16;&#x7801;&#x98CE;&#x683C;&#x4EE5;&#x53CA;&#x67B6;&#x6784;&#x5DF2;&#x7ECF;&#x4F7F;&#x7528;ES2015&#x8FDB;&#x884C;&#x91CD;&#x5199;,&#x8FD9;&#x4E9B;&#x5728;AngularJS 1.5+&#x7684;&#x53D8;&#x5316;&#x53EF;&#x4EE5;&#x66F4;&#x597D;&#x5E2E;&#x52A9;&#x60A8;&#x7684;&#x66F4;&#x597D;&#x7684;&#x5347;&#x7EA7;&#x5230;Angular2.&#x3002; &#x8FD9;&#x4EFD;&#x6307;&#x5357;&#x5305;&#x62EC;&#x4E86;&#x65B0;&#x7684;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#xFF0C;&#x4E8B;&#x4EF6;&#x59D4;&#x6258;&#xFF0C;&#x7EC4;&#x4EF6;&#x67B6;&#x6784;&#x548C;&#x7EC4;&#x4EF6;&#x8DEF;&#x7531;&#x3002;</p><p>&#x8001;&#x7248;&#x672C;&#x7684;&#x6307;&#x5357;&#x4F60;&#x53EF;&#x4EE5;&#x5728;<a href="https://github.com/toddmotto/angular-styleguide/tree/angular-old-es5" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x627E;&#x5230;&#xFF0C;&#x5728;<a href="https://toddmotto.com/rewriting-angular-styleguide-angular-2" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x80FD;&#x770B;&#x5230;&#x6700;&#x65B0;&#x7684;&#x3002;</p><blockquote>&#x52A0;&#x5165;&#x7EC8;&#x6781;&#x7684; AngularJS &#x5B66;&#x4E60;&#x7ECF;&#x9A8C;&#xFF0C;&#x5B8C;&#x5168;&#x638C;&#x63E1;&#x521D;&#x7EA7;&#x548C;&#x9AD8;&#x7EA7;&#x7684; AngularJS &#x7279;&#x6027;&#xFF0C;&#x6784;&#x5EFA;&#x66F4;&#x5FEB;&#xFF0C;&#x6613;&#x4E8E;&#x6269;&#x5C55;&#x7684;&#x771F;&#x5B9E;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="/img/remote/1460000015291734" src="https://static.alili.tech/img/remote/1460000015291734" alt="" title="" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">&#x76EE;&#x5F55;</h2><ol><li><p><a href="#modular-architecture">&#x6A21;&#x5757;&#x7ED3;&#x6784;</a></p><ol><li><a href="#module-theory">&#x57FA;&#x672C;&#x6982;&#x5FF5;</a></li><li><a href="#root-module">&#x6839;&#x6A21;&#x5757;</a></li><li><a href="#component-module">&#x7EC4;&#x4EF6;&#x6A21;&#x5757;</a></li><li><a href="#common-module">&#x516C;&#x5171;&#x6A21;&#x5757;</a></li><li><a href="#low-level-modules">&#x4F4E;&#x7EA7;&#x522B;&#x6A21;&#x5757;</a></li><li><a href="#file-naming-conventions">&#x6587;&#x4EF6;&#x547D;&#x540D;&#x89C4;&#x8303;</a></li><li><a href="#scalable-file-structure">&#x53EF;&#x6269;&#x5C55;&#x7684;&#x6587;&#x4EF6;&#x7ED3;&#x6784;</a></li></ol></li><li><p><a href="#components">&#x7EC4;&#x4EF6;</a></p><ol><li><a href="#component-theory">&#x57FA;&#x672C;&#x6982;&#x5FF5;</a></li><li><a href="#supported-properties">&#x652F;&#x6301;&#x7684;&#x5C5E;&#x6027;</a></li><li><a href="#controllers">&#x63A7;&#x5236;&#x5668;</a></li><li><a href="#one-way-dataflow-and-events">&#x5F53;&#x5411;&#x6570;&#x636E;&#x6D41;&#x548C;&#x4E8B;&#x4EF6;</a></li><li><a href="#stateful-components">&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</a></li><li><a href="#stateless-components">&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</a></li><li><a href="#routed-components">&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;</a></li></ol></li><li><p><a href="#directives">&#x6307;&#x4EE4;</a></p><ol><li><a href="#directive-theory">&#x57FA;&#x672C;&#x6982;&#x5FF5;</a></li><li><a href="#recommended-properties">&#x63A8;&#x8350;&#x7684;&#x5C5E;&#x6027;</a></li><li><a href="#constants-or-classes">&#x5E38;&#x91CF;&#x548C;&#x7C7B;</a></li></ol></li><li><p><a href="#services">&#x670D;&#x52A1;</a></p><ol><li><a href="#service-theory">&#x57FA;&#x672C;&#x6982;&#x5FF5;</a></li><li><a href="#classes-for-service">&#x670D;&#x52A1;&#x7684;&#x7C7B;</a></li></ol></li><li><a href="#styles">&#x6837;&#x5F0F;</a></li><li><a href="#typescript-and-tooling">TypeScript &#x548C;&#x5DE5;&#x5177;</a></li><li><a href="#state-management">&#x72B6;&#x6001;&#x7BA1;&#x7406;</a></li><li><a href="#resources">&#x8D44;&#x6E90;</a></li><li><a href="#documentation">&#x6587;&#x6863;</a></li><li><a href="#contributing">&#x8D21;&#x732E;</a></li></ol><h1 id="articleHeader2">Modular architecture</h1><p>Angular&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x7EC4;&#x4EF6;&#x3002;&#x6A21;&#x5757;&#x7EC4;&#x4EF6;&#x662F;&#x5305;&#x62EC;&#x4E86;&#x7EC4;&#x4EF6;&#x903B;&#x8F91;&#xFF0C;&#x6A21;&#x677F;&#xFF0C;&#x8DEF;&#x7531;&#x548C;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x6839;&#x3002;</p><h3 id="articleHeader3">Module theory</h3><p>&#x6A21;&#x5757;&#x7684;&#x8BBE;&#x8BA1;&#x76F4;&#x63A5;&#x53CD;&#x6620;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x6587;&#x4EF6;&#x5939;&#x7ED3;&#x6784;&#xFF0C;&#x4ECE;&#x800C;&#x4FDD;&#x8BC1;&#x6211;&#x4EEC;&#x9879;&#x76EE;&#x7684;&#x53EF;&#x7EF4;&#x62A4;&#x6027;&#x548C;&#x53EF;&#x9884;&#x6D4B;&#x6027;&#x3002; &#x6211;&#x4EEC;&#x6700;&#x597D;&#x5E94;&#x8BE5;&#x6709;&#x4E09;&#x4E2A;&#x9AD8;&#x5C42;&#x6B21;&#x7684;&#x6A21;&#x5757;&#xFF1A;&#x6839;&#x6A21;&#x5757;&#xFF0C;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#x548C;&#x5E38;&#x7528;&#x6A21;&#x5757;&#x3002;&#x6839;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x7528;&#x4E8E;&#x542F;&#x52A8; app &#x548C;&#x76F8;&#x5E94;&#x7684;&#x6A21;&#x677F;&#x7684;&#x57FA;&#x7840;&#x6A21;&#x5757;&#x3002; &#x7136;&#x540E;&#x5BFC;&#x5165;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4F9D;&#x8D56;&#x7684;&#x7EC4;&#x4EF6;&#x548C;&#x901A;&#x7528;&#x6A21;&#x5757;&#x3002;&#x7EC4;&#x4EF6;&#x548C;&#x901A;&#x7528;&#x6A21;&#x5757;&#x7136;&#x540E;&#x9700;&#x8981;&#x4F4E;&#x7EA7;&#x522B;&#x7684;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#xFF0C;&#x5305;&#x542B;&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x63A7;&#x5236;&#x5668;&#xFF0C;&#x670D;&#x52A1;&#xFF0C;&#x6307;&#x4EE4;&#xFF0C;&#x8FC7;&#x6EE4;&#x5668;&#x548C;&#x7ED9;&#x53EF;&#x91CD;&#x590D;&#x4F7F;&#x7528;&#x7684;&#x529F;&#x80FD;&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader4">Root module</h3><p>&#x6839;&#x6A21;&#x5757;&#x4EE5;&#x4E00;&#x4E2A;&#x6839;&#x7EC4;&#x4EF6;&#x5F00;&#x59CB;&#xFF0C;&#x5B83;&#x5B9A;&#x4E49;&#x4E86;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x57FA;&#x672C;&#x5143;&#x7D20;&#x548C;&#x8DEF;&#x7531;&#x51FA;&#x53E3;&#xFF0C;&#x4F8B;&#x5982;&#x4F7F;&#x7528;<code>ui-router</code>&#x5C55;&#x793A;<code>ui-view</code>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.component.ts
export const AppComponent: angular.IComponentOptions  = {
  template: `
    &lt;header&gt;
        Hello world
    &lt;/header&gt;
    &lt;div&gt;
        &lt;div ui-view&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;footer&gt;
        Copyright MyApp 2016.
    &lt;/footer&gt;
  `
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app.component.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> AppComponent: angular.IComponentOptions  = {
  template: <span class="hljs-string">`
    &lt;header&gt;
        Hello world
    &lt;/header&gt;
    &lt;div&gt;
        &lt;div ui-view&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;footer&gt;
        Copyright MyApp 2016.
    &lt;/footer&gt;
  `</span>
};
</code></pre><p>&#x968F;&#x7740;<code>AppComponent</code>&#x5BFC;&#x5165;&#x548C;&#x4F7F;&#x7528;<code>.component(&apos;app&apos;, AppComponent)</code>&#x6CE8;&#x518C;&#xFF0C;&#x4E00;&#x4E2A;&#x6839;&#x6A21;&#x5757;&#x5C31;&#x521B;&#x5EFA;&#x4E86;&#x3002;&#x8FDB;&#x4E00;&#x6B65;&#x5BFC;&#x5165;&#x5B50;&#x6A21;&#x5757;&#xFF08;&#x7EC4;&#x4EF6;&#x548C;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF09;&#x5305;&#x62EC;&#x4E0E;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x76F8;&#x5173;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x3002;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#x5728;&#x8FD9;&#x91CC;&#x4E5F;&#x5BFC;&#x5165;&#x4E86;&#x6837;&#x5F0F;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x672C;&#x76F4;&#x7537;&#x7684;&#x540E;&#x9762;&#x7AE0;&#x8282;&#x4ECB;&#x7ECD;&#x8FD9;&#x4E2A;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app.ts
import angular from &apos;angular&apos;;
import uiRouter from &apos;angular-ui-router&apos;;
import { AppComponent } from &apos;./app.component&apos;;
import { ComponentsModule } from &apos;./components/components.module&apos;;
import { CommonModule } from &apos;./common/common.module&apos;;
import &apos;./app.scss&apos;;

const root = angular
  .module(&apos;app&apos;, [
    ComponentsModule,
    CommonModule,
    uiRouter
  ])
  .component(&apos;app&apos;, AppComponent)
  .name;

export default root;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">// app.ts</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> uiRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular-ui-router&apos;</span>;
<span class="hljs-keyword">import</span> { AppComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./app.component&apos;</span>;
<span class="hljs-keyword">import</span> { ComponentsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/components.module&apos;</span>;
<span class="hljs-keyword">import</span> { CommonModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./common/common.module&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./app.scss&apos;</span>;

<span class="hljs-keyword">const</span> root = angular
  .module(<span class="hljs-string">&apos;app&apos;</span>, [
    ComponentsModule,
    CommonModule,
    uiRouter
  ])
  .component(<span class="hljs-string">&apos;app&apos;</span>, AppComponent)
  .name;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> root;</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader5">Component module</h3><p>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6A21;&#x5757;&#x662F;&#x5F15;&#x7528;&#x6240;&#x6709;&#x53EF;&#x590D;&#x7528;&#x7EC4;&#x4EF6;&#x7684;&#x5BB9;&#x5668;&#x3002;&#x5728;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x5982;&#x4F55;&#x5BFC;&#x5165;<code>Components</code>&#x5E76;&#x4E14;&#x5C06;&#x4ED6;&#x4EEC;&#x6CE8;&#x5165;&#x5230;&#x6839;&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x91CC;&#x7ED9;&#x4E86;&#x6211;&#x4EEC;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#x6240;&#x6709;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x9700;&#x8981;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#x3002;&#x6211;&#x4EEC;&#x8981;&#x6C42;&#x8FD9;&#x4E9B;&#x6A21;&#x5757;&#x4E0E;&#x5176;&#x4ED6;&#x6A21;&#x5757;&#x90FD;&#x662F;&#x89E3;&#x8026;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x7684;&#x79FB;&#x52A8;&#x5230;&#x5176;&#x4ED6;&#x4EFB;&#x4F55;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import angular from &apos;angular&apos;;
import { CalendarModule } from &apos;./calendar/calendar.module&apos;;
import { EventsModule } from &apos;./events/events.module&apos;;

export const ComponentsModule = angular
  .module(&apos;app.components&apos;, [
    CalendarModule,
    EventsModule
  ])
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { CalendarModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./calendar/calendar.module&apos;</span>;
<span class="hljs-keyword">import</span> { EventsModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./events/events.module&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> ComponentsModule = angular
  .module(<span class="hljs-string">&apos;app.components&apos;</span>, [
    CalendarModule,
    EventsModule
  ])
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader6">Common module</h3><p>&#x516C;&#x5171;&#x6A21;&#x5757;&#x662F;&#x5F15;&#x7528;&#x6240;&#x6709;&#x4E3A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x63D0;&#x4F9B;&#x7684;&#x7279;&#x6B8A;&#x7EC4;&#x4EF6;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x5E0C;&#x671B;&#x5B83;&#x5728;&#x5176;&#x4ED6;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E2D;&#x4F7F;&#x7528;&#x3002;&#x8FD9;&#x53EF;&#x4EE5;&#x662F;&#x5E03;&#x5C40;&#xFF0C;&#x5BFC;&#x822A;&#x548C;&#x9875;&#x811A;&#x4E4B;&#x7C7B;&#x7684;&#x4E1C;&#x897F;&#x3002;&#x5728;&#x4E0A;&#x9762;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x5982;&#x4F55;&#x5BFC;&#x5165;<code>Common</code>&#x5E76;&#x4E14;&#x5C06;&#x4ED6;&#x4EEC;&#x6CE8;&#x5165;&#x5230;&#x6839;&#x6A21;&#x5757;&#xFF0C;&#x8FD9;&#x91CC;&#x662F;&#x7ED9;&#x4E86;&#x6211;&#x4EEC;&#x4E00;&#x4E2A;&#x5BFC;&#x5165;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x9700;&#x8981;&#x7684;&#x6240;&#x6709;&#x7684;&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import angular from &apos;angular&apos;;
import { NavModule } from &apos;./nav/nav.module&apos;;
import { FooterModule } from &apos;./footer/footer.module&apos;;

export const CommonModule = angular
  .module(&apos;app.common&apos;, [
    NavModule,
    FooterModule
  ])
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { NavModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./nav/nav.module&apos;</span>;
<span class="hljs-keyword">import</span> { FooterModule } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./footer/footer.module&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CommonModule = angular
  .module(<span class="hljs-string">&apos;app.common&apos;</span>, [
    NavModule,
    FooterModule
  ])
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader7">Low-level modules</h3><p>Always remember to add the <code>.name</code> suffix to each <code>export</code> when creating a <em>new</em> module, not when referencing one. You&apos;ll noticed routing definitions also exist here, we&apos;ll come onto this in later chapters in this guide.</p><p>&#x4F4E;&#x7EA7;&#x522B;&#x7684;&#x6A21;&#x5757;&#x662F;&#x5305;&#x542B;&#x6BCF;&#x4E2A;&#x529F;&#x80FD;&#x5757;&#x903B;&#x8F91;&#x7684;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;&#x3002;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x90FD;&#x5C06;&#x5B9A;&#x4E49;&#x6210;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x88AB;&#x5BFC;&#x5165;&#x8F83;&#x9AD8;&#x7EA7;&#x522B;&#x7684;&#x5355;&#x72EC;&#x6A21;&#x5757;&#xFF0C;&#x4F8B;&#x5982;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x6216;&#x8005;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF0C;&#x5982;&#x4E0B;&#x6240;&#x793A;&#x3002; &#x3002;&#x4E00;&#x5B9A;&#x8981;&#x8BB0;&#x4F4F;&#x6BCF;&#x6B21;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x7684;&#x6A21;&#x5757;&#xFF0C;&#x800C;&#x975E;&#x5F15;&#x7528;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BB0;&#x5F97;&#x7ED9;&#x6BCF;&#x4E2A;<code>export</code>&#x4E2D;&#x6DFB;&#x52A0;<code>.name</code>&#x7684;&#x540E;&#x7F00;&#x3002;&#x4F60;&#x4F1A;&#x6CE8;&#x610F;&#x5230;&#x8DEF;&#x7531;&#x5B9A;&#x4E49;&#x4E5F;&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x968F;&#x540E;&#x7684;&#x90E8;&#x5206;&#x8BB2;&#x5230;&#x5B83;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import angular from &apos;angular&apos;;
import uiRouter from &apos;angular-ui-router&apos;;
import { CalendarComponent } from &apos;./calendar.component&apos;;
import &apos;./calendar.scss&apos;;

export const CalendarModule = angular
  .module(&apos;calendar&apos;, [
    uiRouter
  ])
  .component(&apos;calendar&apos;, CalendarComponent)
  .config(($stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider) =&gt; {
    $stateProvider
      .state(&apos;calendar&apos;, {
        url: &apos;/calendar&apos;,
        component: &apos;calendar&apos;
      });
    $urlRouterProvider.otherwise(&apos;/&apos;);
  })
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> uiRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular-ui-router&apos;</span>;
<span class="hljs-keyword">import</span> { CalendarComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./calendar.component&apos;</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;./calendar.scss&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CalendarModule = angular
  .module(<span class="hljs-string">&apos;calendar&apos;</span>, [
    uiRouter
  ])
  .component(<span class="hljs-string">&apos;calendar&apos;</span>, CalendarComponent)
  .config(($stateProvider: angular.ui.IStateProvider,
            $urlRouterProvider: angular.ui.IUrlRouterProvider) =&gt; {
    $stateProvider
      .state(<span class="hljs-string">&apos;calendar&apos;</span>, {
        url: <span class="hljs-string">&apos;/calendar&apos;</span>,
        component: <span class="hljs-string">&apos;calendar&apos;</span>
      });
    $urlRouterProvider.otherwise(<span class="hljs-string">&apos;/&apos;</span>);
  })
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader8">File naming conventions</h3><p>&#x4F7F;&#x7528;&#x5C0F;&#x5199;&#x5E76;&#x4FDD;&#x6301;&#x547D;&#x540D;&#x7684;&#x7B80;&#x6D01;, &#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x540D;&#x79F0;&#x4E3E;&#x4F8B;, <code>calendar.*.ts*</code>, <code>calendar-grid.*.ts</code> - &#x5C06;&#x6587;&#x4EF6;&#x7C7B;&#x578B;&#x7684;&#x540D;&#x79F0;&#x653E;&#x5230;&#x4E2D;&#x95F4;&#x3002;&#x4F7F;&#x7528; <code>index.ts</code> &#x4F5C;&#x4E3A;&#x6A21;&#x5757;&#x7684;&#x5B9A;&#x4E49;&#x6587;&#x4EF6;&#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76EE;&#x5F55;&#x540D;&#x5BFC;&#x5165;&#x6A21;&#x5757;&#x4E86;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index.ts
calendar.component.ts
calendar.service.ts
calendar.directive.ts
calendar.filter.ts
calendar.spec.ts
calendar.html
calendar.scss" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">index.ts
calendar.component.ts
calendar.service.ts
calendar.directive.ts
calendar.filter.ts
calendar.spec.ts
calendar.html
calendar.scss</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader9">Scalable file structure</h3><p>&#x6587;&#x4EF6;&#x76EE;&#x5F55;&#x7ED3;&#x6784;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF0C;&#x5B83;&#x6709;&#x5229;&#x4E8E;&#x6211;&#x4EEC;&#x66F4;&#x597D;&#x7684;&#x6269;&#x5C55;&#x548C;&#x9884;&#x6D4B;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x5C55;&#x793A;&#x4E86;&#x6A21;&#x5757;&#x7EC4;&#x4EF6;&#x7684;&#x57FA;&#x672C;&#x67B6;&#x6784;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; app/
&#x2502;   &#x251C;&#x2500;&#x2500; components/
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; calendar/
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar.component.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar.service.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar.spec.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar.html
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar.scss
&#x2502;   &#x2502;  &#x2502;  &#x2514;&#x2500;&#x2500; calendar-grid/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid.component.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid.directive.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid.filter.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid.spec.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid.html
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; calendar-grid.scss
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; events/
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.component.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.directive.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.service.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.spec.ts
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.html
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events.scss
&#x2502;   &#x2502;  &#x2502;  &#x2514;&#x2500;&#x2500; events-signup/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup.controller.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup.component.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup.service.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup.spec.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup.html
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; events-signup.scss
&#x2502;   &#x2502;  &#x2514;&#x2500;&#x2500; components.module.ts
&#x2502;   &#x251C;&#x2500;&#x2500; common/
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; nav/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; nav.component.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; nav.service.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; nav.spec.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; nav.html
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; nav.scss
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; footer/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; footer.component.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; footer.service.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; footer.spec.ts
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; footer.html
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; footer.scss
&#x2502;   &#x2502;  &#x2514;&#x2500;&#x2500; index.ts
&#x2502;   &#x251C;&#x2500;&#x2500; index.ts
&#x2502;   &#x251C;&#x2500;&#x2500; app.component.ts
&#x2502;   &#x2514;&#x2500;&#x2500; app.scss
&#x2514;&#x2500;&#x2500; index.html" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; app/
&#x2502;   &#x251C;&#x2500;&#x2500; components/
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; calendar/
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar<span class="hljs-selector-class">.service</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar<span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; calendar<span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x2502;  &#x2514;&#x2500;&#x2500; calendar-grid/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.directive</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.filter</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; calendar-grid<span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; events/
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.directive</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.service</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;  &#x251C;&#x2500;&#x2500; events<span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x2502;  &#x2514;&#x2500;&#x2500; events-signup/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.controller</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.service</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; events-signup<span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x2514;&#x2500;&#x2500; components<span class="hljs-selector-class">.module</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x251C;&#x2500;&#x2500; common/
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; nav/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.service</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; <span class="hljs-selector-tag">nav</span><span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x251C;&#x2500;&#x2500; footer/
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.service</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.spec</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2502;  &#x2502;     &#x251C;&#x2500;&#x2500; <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.html</span>
&#x2502;   &#x2502;  &#x2502;     &#x2514;&#x2500;&#x2500; <span class="hljs-selector-tag">footer</span><span class="hljs-selector-class">.scss</span>
&#x2502;   &#x2502;  &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.ts</span>
&#x2502;   &#x251C;&#x2500;&#x2500; app<span class="hljs-selector-class">.component</span><span class="hljs-selector-class">.ts</span>
&#x2502;   &#x2514;&#x2500;&#x2500; app<span class="hljs-selector-class">.scss</span>
&#x2514;&#x2500;&#x2500; index.html</code></pre><p>&#x9876;&#x7EA7;&#x76EE;&#x5F55;&#x4EC5;&#x4EC5;&#x5305;&#x542B;&#x4E86;<code>index.html</code>&#x548C;<code>app/</code>, <code>app/</code>&#x76EE;&#x5F55;&#x4E2D;&#x5219;&#x5305;&#x542B;&#x4E86;&#x6211;&#x4EEC;&#x8981;&#x7528;&#x5230;&#x7684;&#x6839;&#x6A21;&#x5757;&#xFF0C;&#x7EC4;&#x4EF6;&#xFF0C;&#x516C;&#x5171;&#x6A21;&#x5757;&#xFF0C;&#x4EE5;&#x53CA;&#x4F4E;&#x7EA7;&#x522B;&#x7684;&#x6A21;&#x5757;&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader10">Components</h1><h3 id="articleHeader11">Component theory</h3><p>&#x7EC4;&#x4EF6;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x5E26;&#x6709;&#x63A7;&#x5236;&#x5668;&#x7684;&#x6A21;&#x677F;&#x3002;&#x4ED6;&#x4EEC;&#x5373;&#x4E0D;&#x662F;&#x6307;&#x4EE4;&#xFF0C;&#x4E5F;&#x4E0D;&#x5E94;&#x8BE5;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x4EE3;&#x66FF;&#x6307;&#x4EE4;&#xFF0C;&#x9664;&#x975E;&#x4F60;&#x6B63;&#x5728;&#x7528;&#x63A7;&#x5236;&#x5668;&#x5347;&#x7EA7;&#x201C;&#x6A21;&#x677F;&#x6307;&#x4EE4;&#x201D;&#xFF0C;&#x5B83;&#x662F;&#x6700;&#x9002;&#x5408;&#x4F5C;&#x4E3A;&#x7EC4;&#x4EF6;&#x7684;&#x3002; &#x7EC4;&#x4EF6;&#x8FD8;&#x5305;&#x542B;&#x6570;&#x636E;&#x4E8B;&#x4EF6;&#x7684;&#x8F93;&#x5165;&#x4E0E;&#x8F93;&#x51FA;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x548C;&#x4F7F;&#x7528;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x4EE5;&#x53CA;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5907;&#x4EFD;&#x3002;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x5728;AngularJS 1.5&#x53CA;&#x4EE5;&#x4E0A;&#x63A8;&#x51FA;&#x7684;&#x65B0;&#x6807;&#x51C6;&#x3002;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;&#x6240;&#x6709;&#x6A21;&#x677F;&#x548C;&#x63A7;&#x5236;&#x5668;&#x90FD;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x53EF;&#x80FD;&#x662F;&#x662F;&#x6709;&#x72B6;&#x6001;&#x7684;&#xFF0C;&#x65E0;&#x72B6;&#x6001;&#x6216;&#x8005;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x5C06;&#x201C;&#x7EC4;&#x4EF6;&#x201D;&#x770B;&#x4F5C;&#x4E00;&#x6BB5;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x800C;&#x4E0D;&#x4EC5;&#x4EC5;&#x662F;<code>.component()</code>&#x5B9A;&#x4E49;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x63A2;&#x8BA8;&#x4E00;&#x4E9B;&#x7EC4;&#x4EF6;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#x548C;&#x5EFA;&#x8BAE;&#xFF0C;&#x7136;&#x540E;&#x4F60;&#x5E94;&#x8BE5;&#x53EF;&#x4EE5;&#x660E;&#x767D;&#x5982;&#x4F55;&#x901A;&#x8FC7;&#x6709;&#x72B6;&#x6001;&#xFF0C;&#x65E0;&#x72B6;&#x6001;&#x548C;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x7684;&#x6982;&#x5FF5;&#x6765;&#x7EC4;&#x7EC7;&#x7ED3;&#x6784;&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader12">Supported properties</h3><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x4F60;&#x53EF;&#x80FD;&#x4F1A;&#x4F7F;&#x7528;&#x5230;&#x7684;<code>.component()</code>&#x5C5E;&#x6027; :</p><table><thead><tr><th>Property</th><th>Support</th></tr></thead><tbody><tr><td>bindings</td><td>Yes, &#x4EC5;&#x4EC5;&#x4F7F;&#x7528; <code>&apos;@&apos;</code>, <code>&apos;&lt;&apos;</code>, <code>&apos;&amp;&apos;</code></td></tr><tr><td>controller</td><td>Yes</td></tr><tr><td>controllerAs</td><td>Yes, &#x9ED8;&#x8BA4;&#x662F;<code>$ctrl</code></td></tr><tr><td>require</td><td>Yes (&#x65B0;&#x5BF9;&#x8C61;&#x8BED;&#x6CD5;)</td></tr><tr><td>template</td><td>Yes</td></tr><tr><td>templateUrl</td><td>Yes</td></tr><tr><td>transclude</td><td>Yes</td></tr></tbody></table><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader13">Controllers</h3><p>&#x63A7;&#x5236;&#x5668;&#x5E94;&#x8BE5;&#x4EC5;&#x4EC5;&#x4E0E;&#x7EC4;&#x4EF6;&#x4E00;&#x8D77;&#x4F7F;&#x7528;&#xFF0C;&#x800C;&#x4E0D;&#x5E94;&#x8BE5;&#x662F;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x3002;&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x4F60;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x63A7;&#x5236;&#x5668;&#xFF0C;&#x4F60;&#x771F;&#x6B63;&#x9700;&#x8981;&#x7684;&#x53EF;&#x80FD;&#x662F;&#x4E00;&#x4E2A;&#x6765;&#x7BA1;&#x7406;&#x7279;&#x5B9A;&#x884C;&#x7684;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;<code>Class</code>&#x6784;&#x5EFA;&#x63A7;&#x5236;&#x5668;&#x7684;&#x5EFA;&#x8BAE;:</p><ul><li>&#x59CB;&#x7EC8;&#x4F7F;&#x7528;<code>constructor</code>&#x6765;&#x4F9D;&#x8D56;&#x6CE8;&#x5165;</li><li>&#x4E0D;&#x8981;&#x76F4;&#x63A5;&#x5BFC;&#x51FA;<code>Class</code>&#xFF0C;&#x5BFC;&#x51FA;&#x5B83;&#x7684;&#x540D;&#x5B57;&#x53BB;&#x5141;&#x8BB8;&#x4F7F;&#x7528;<code>$inject</code>&#x6CE8;&#x89E3;</li><li>&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x8BBF;&#x95EE;scope&#x4E2D;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x8BF7;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;</li><li>&#x53E6;&#x5916;&#x5173;&#x4E8E;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#xFF0C;<code>let ctrl = this;</code>&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x63A5;&#x53D7;&#x7684;&#xFF0C;&#x5F53;&#x7136;&#x8FD9;&#x66F4;&#x53D6;&#x51B3;&#x4E8E;&#x4F7F;&#x7528;&#x573A;&#x666F;</li><li>&#x5C06;&#x6240;&#x6709;&#x516C;&#x5F00;&#x7684;&#x51FD;&#x6570;&#x76F4;&#x63A5;&#x7ED1;&#x5B9A;&#x5230;<code>Class</code></li><li><p>&#x9002;&#x5F53;&#x7684;&#x4F7F;&#x7528;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#xFF0C;<code>$onInit</code>, <code>$onChanges</code>, <code>$postLink</code> &#x548C; <code>$onDestroy</code></p><ul><li>&#x6CE8;&#x610F;&#xFF1A;<code>$onChanges</code>&#x5728;<code>$onInit</code>&#x4E4B;&#x524D;&#x88AB;&#x8C03;&#x7528;&#xFF0C;&#x67E5;&#x770B;&#x8FD9;&#x91CC;&#x7684;<a href="https://github.com/toddmotto/angularjs-styleguide/blob/master/README.md#resources" rel="nofollow noreferrer" target="_blank">&#x6269;&#x5C55;&#x9605;&#x8BFB;</a>&#x5BF9;&#x751F;&#x547D;&#x5468;&#x671F;&#x6709;&#x8FDB;&#x4E00;&#x6B65;&#x7684;&#x7406;&#x89E3;</li></ul></li><li>&#x5728;<code>$onInit</code>&#x4F7F;&#x7528;<code>require</code>&#x53BB;&#x5F15;&#x7528;&#x5176;&#x4ED6;&#x7EE7;&#x627F;&#x7684;&#x903B;&#x8F91;</li><li>&#x4E0D;&#x8981;&#x4F7F;&#x7528;<code>controllerAs</code>&#x8BED;&#x6CD5;&#x53BB;&#x8986;&#x76D6;&#x9ED8;&#x8BA4;&#x7684;<code>$ctrl</code>&#x522B;&#x540D;&#xFF0C;&#x5F53;&#x7136;&#x4E5F;&#x4E0D;&#x8981;&#x518D;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x4F7F;&#x7528;<code>controllerAs</code></li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader14">One-way dataflow and Events</h3><p>&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x5DF2;&#x7ECF;&#x5728;Angular1.5&#x4E2D;&#x5F15;&#x5165;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x91CD;&#x65B0;&#x5B9A;&#x4E49;&#x4E86;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x7684;&#x5EFA;&#x8BAE;:</p><ul><li>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x59CB;&#x7EC8;&#x4F7F;&#x7528;&#x5355;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x8BED;&#x6CD5;<code>&lt;</code>&#x6765;&#x63A5;&#x6536;&#x6570;&#x636E;</li><li>&#x4E0D;&#x8981;&#x5728;&#x4EFB;&#x4F55;&#x5730;&#x65B9;&#x518D;&#x4F7F;&#x7528;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x8BED;&#x6CD5;<code>&apos;=&apos;</code></li><li>&#x6709; <code>bindings</code> &#x7684;&#x7EC4;&#x4EF6;&#x5E94;&#x8BE5;&#x4F7F;&#x7528; <code>$onChanges</code> &#x514B;&#x9686;&#x5355;&#x5411;&#x7ED1;&#x5B9A;&#x6570;&#x636E;&#x800C;&#x963B;&#x6B62;&#x901A;&#x8FC7;&#x5F15;&#x7528;&#x4F20;&#x9012;&#x5BF9;&#x8C61;&#xFF0C;&#x5E76;&#x4E14;&#x66F4;&#x65B0;&#x7236;&#x7EA7;&#x6570;&#x636E;</li><li>&#x5728;&#x7236;&#x7EA7;&#x65B9;&#x6CD5;&#x4E2D;&#x4F7F;&#x7528; <code>$event</code> &#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x53C2;&#x6570;&#xFF08;&#x67E5;&#x770B;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x7684;&#x4F8B;&#x5B50;<code>$ctrl.addTodo($event)</code>&#xFF09;</li><li><p>&#x4ECE;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x4F20;&#x56DE;&#x4E00;&#x4E2A; <code>$event: {}</code> &#x5BF9;&#x8C61;&#xFF08;&#x67E5;&#x770B;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x7684;&#x4F8B;&#x5B50;<code>this.onAddTodo</code>&#xFF09;</p><ul><li>Bonus&#xFF1A;&#x4F7F;&#x7528; <code>.value()</code> &#x5305;&#x88C5; <code>EventEmitter</code> &#x4EE5;&#x4FBF;&#x8FC1;&#x79FB;&#x5230; Anuglar2&#xFF0C;&#x907F;&#x514D;&#x624B;&#x52A8;&#x521B;&#x4E00;&#x4E2A; <code>$event</code> &#x5BF9;&#x8C61;</li></ul></li><li>&#x4E3A;&#x4EC0;&#x4E48;&#xFF1F;&#x8FD9;&#x65B9;&#x4FBF;&#x8FC1;&#x79FB;&#x5230;Angular2&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4FDD;&#x6301;&#x4E00;&#x81F4;&#x6027;&#x3002;&#x5E76;&#x4E14;&#x53EF;&#x4EE5;&#x8BA9;&#x72B6;&#x6001;&#x53EF;&#x9884;&#x6D4B;&#x3002;</li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader15">Stateful components</h3><p>&#x6211;&#x4EEC;&#x6765;&#x5B9A;&#x4E49;&#x4E0B;&#x4EC0;&#x4E48;&#x53EB;&#x4F5C;&#x201C;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x201D;&#xFF1A;</p><ul><li>&#x672C;&#x8D28;&#x4E0A;&#x901A;&#x8FC7;&#x670D;&#x52A1;&#x4E8E;&#x540E;&#x7AEF;API&#x901A;&#x4FE1;&#x83B7;&#x53D6;&#x72B6;&#x6001;</li><li>&#x4E0D;&#x76F4;&#x63A5;&#x6539;&#x53D8;&#x72B6;&#x6001;</li><li>&#x72B6;&#x6001;&#x6539;&#x53D8;&#x7684;&#x65F6;&#x5019;&#x6E32;&#x67D3;&#x5B50;&#x7EC4;&#x4EF6;</li><li>&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x5C0F;&#x7684;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;</li></ul><p>&#x4E0B;&#x9762;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x6848;&#x4F8B;&#xFF0C;&#x5B83;&#x548C;&#x4E00;&#x4E2A;&#x4F4E;&#x7EA7;&#x522B;&#x7684;&#x6A21;&#x5757;&#x7EC4;&#x4EF6;&#x5171;&#x540C;&#x5B8C;&#x6210;&#xFF08;&#x8FD9;&#x53EA;&#x662F;&#x6F14;&#x793A;&#xFF0C;&#x4E3A;&#x4E86;&#x7CBE;&#x7B80;&#x7701;&#x7565;&#x4E86;&#x4E00;&#x4E9B;&#x4EE3;&#x7801;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo.component.ts ----- */
import { TodoController } from &apos;./todo.controller&apos;;
import { TodoService } from &apos;./todo.service&apos;;
import { TodoItem } from &apos;../common/model/todo&apos;;

export const TodoComponent: angular.IComponentOptions  = {
  controller: TodoController,
  template: `
    &lt;div class=&quot;todo&quot;&gt;
      &lt;todo-form
        todo=&quot;$ctrl.newTodo&quot;
        on-add-todo=&quot;$ctrl.addTodo($event);&quot;&gt;
      &lt;todo-list
        todos=&quot;$ctrl.todos&quot;&gt;&lt;/todo-list&gt;
    &lt;/div&gt;
  `
};


/* ----- todo/todo.controller.ts ----- */
export class TodoController {
  static $inject: string[] = [&apos;TodoService&apos;];
  todos: TodoItem[];

  constructor(private todoService: TodoService) { }

  $onInit() {
    this.newTodo = new TodoItem(&apos;&apos;, false);
    this.todos = [];
    this.todoService.getTodos().then(response =&gt; this.todos = response);
  }
  addTodo({ todo }) {
    if (!todo) return;
    this.todos.unshift(todo);
    this.newTodo = new TodoItem(&apos;&apos;, false);
  }
}

/* ----- todo/index.ts ----- */
import angular from &apos;angular&apos;;
import { TodoComponent } from &apos;./todo.component&apos;;


export const TodoModule = angular
  .module(&apos;todo&apos;, [])
  .component(&apos;todo&apos;, TodoComponent)
  .name;

/* ----- todo/todo.service.ts ----- */
export class TodoService {
  static $inject: string[] = [&apos;$http&apos;];

  constructor(private $http: angular.IHttpService) { }

  getTodos() {
    return this.$http.get(&apos;/api/todos&apos;).then(response =&gt; response.data);
  }
}


/* ----- common/model/todo.ts ----- */
export class TodoItem {
    constructor(
        public title: string,
        public completed: boolean) { }
    )
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo.component.ts ----- */</span>
<span class="hljs-keyword">import</span> { TodoController } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.controller&apos;</span>;
<span class="hljs-keyword">import</span> { TodoService } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.service&apos;</span>;
<span class="hljs-keyword">import</span> { TodoItem } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../common/model/todo&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoComponent: angular.IComponentOptions  = {
  controller: TodoController,
  template: <span class="hljs-string">`
    &lt;div class=&quot;todo&quot;&gt;
      &lt;todo-form
        todo=&quot;$ctrl.newTodo&quot;
        on-add-todo=&quot;$ctrl.addTodo($event);&quot;&gt;
      &lt;todo-list
        todos=&quot;$ctrl.todos&quot;&gt;&lt;/todo-list&gt;
    &lt;/div&gt;
  `</span>
};


<span class="hljs-comment">/* ----- todo/todo.controller.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoController {
  <span class="hljs-keyword">static</span> $inject: <span class="hljs-built_in">string</span>[] = [<span class="hljs-string">&apos;TodoService&apos;</span>];
  todos: TodoItem[];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> todoService: TodoService</span>) { }

  $onInit() {
    <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-keyword">new</span> TodoItem(<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-literal">false</span>);
    <span class="hljs-keyword">this</span>.todos = [];
    <span class="hljs-keyword">this</span>.todoService.getTodos().then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> <span class="hljs-keyword">this</span>.todos = response);
  }
  addTodo({ todo }) {
    <span class="hljs-keyword">if</span> (!todo) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">this</span>.todos.unshift(todo);
    <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-keyword">new</span> TodoItem(<span class="hljs-string">&apos;&apos;</span>, <span class="hljs-literal">false</span>);
  }
}

<span class="hljs-comment">/* ----- todo/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { TodoComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.component&apos;</span>;


<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoModule = angular
  .module(<span class="hljs-string">&apos;todo&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todo&apos;</span>, TodoComponent)
  .name;

<span class="hljs-comment">/* ----- todo/todo.service.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoService {
  <span class="hljs-keyword">static</span> $inject: <span class="hljs-built_in">string</span>[] = [<span class="hljs-string">&apos;$http&apos;</span>];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> $http: angular.IHttpService</span>) { }

  getTodos() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">&apos;/api/todos&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.data);
  }
}


<span class="hljs-comment">/* ----- common/model/todo.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoItem {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
        <span class="hljs-keyword">public</span> title: <span class="hljs-built_in">string</span>,
        <span class="hljs-keyword">public</span> completed: <span class="hljs-built_in">boolean</span></span>) { }
    )
}

</code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x5C55;&#x793A;&#x4E86;&#x4E00;&#x4E2A;&#x6709;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728;&#x63A7;&#x5236;&#x5668;&#x901A;&#x8FC7;&#x670D;&#x52A1;&#x83B7;&#x53D6;&#x72B6;&#x6001;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5C06;&#x5B83;&#x4F20;&#x9012;&#x7ED9;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x5E76;&#x6CA1;&#x6709;&#x5728;&#x6A21;&#x7248;&#x4E2D;&#x4F7F;&#x4F8B;&#x5982;&#x5982;<code>ng-repeat</code>&#x548C;&#x5176;&#x4ED6;&#x6307;&#x4EE4;&#x3002;&#x76F8;&#x53CD;&#xFF0C;&#x5C06;&#x6570;&#x636E;&#x548C;&#x51FD;&#x6570;&#x4EE3;&#x7406;&#x5230; <code>&lt;todo-form&gt;</code> &#x548C; <code>&lt;todo-list&gt;</code> &#x8FD9;&#x4E24;&#x4E2A;&#x65E0;&#x72B6;&#x6001;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader16">Stateless components</h3><p>&#x6211;&#x4EEC;&#x6765;&#x5B9A;&#x4E49;&#x4E0B;&#x4EC0;&#x4E48;&#x53EB;&#x4F5C;&#x201C;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x201D;&#xFF1A;</p><ul><li>&#x4F7F;&#x7528; <code>bindings: {}</code> &#x5B9A;&#x4E49;&#x8F93;&#x5165;&#x8F93;&#x51FA;</li><li>&#x6570;&#x636E;&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x8FDB;&#x5165;&#x7EC4;&#x4EF6;&#xFF08;&#x8F93;&#x5165;&#xFF09;</li><li>&#x6570;&#x636E;&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x79BB;&#x5F00;&#x7EC4;&#x4EF6;&#xFF08;&#x8F93;&#x51FA;&#xFF09;</li><li>&#x72B6;&#x6001;&#x6539;&#x53D8;&#xFF0C;&#x6309;&#x9700;&#x4F20;&#x56DE;&#x6570;&#x636E;&#xFF08;&#x79BB;&#x53BB;&#x70B9;&#x51FB;&#x548C;&#x63D0;&#x4EA4;&#x4E8B;&#x4EF6;&#xFF09;</li><li>&#x4E0D;&#x5173;&#x5FC3;&#x6570;&#x636E;&#x6765;&#x81EA;&#x4E8E;&#x54EA;&#x91CC;&#xFF0C;&#x5B83;&#x662F;&#x65E0;&#x72B6;&#x6001;&#x7684;</li><li>&#x53EF;&#x9AD8;&#x9891;&#x7387;&#x590D;&#x7528;&#x7684;&#x7EC4;&#x4EF6;</li><li>&#x4E5F;&#x88AB;&#x79F0;&#x4F5C;&#x54D1;&#x5DF4;&#x6216;&#x8005;&#x5C55;&#x793A;&#x6027;&#x7EC4;&#x4EF6;</li></ul><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x65E0;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;&#x7684;&#x4F8B;&#x5B50; (&#x6211;&#x4EEC;&#x4F7F;&#x7528; <code>&lt;todo-form&gt;</code> &#x4F5C;&#x4E3A;&#x4F8B;&#x5B50;) , &#x4F7F;&#x7528;&#x4F4E;&#x7EA7;&#x522B;&#x6A21;&#x5757;&#x5B9A;&#x4E49;&#x6765;&#x5B8C;&#x6210;(&#x4EC5;&#x4EC5;&#x7528;&#x4E8E;&#x6F14;&#x793A;&#xFF0C;&#x7701;&#x7565;&#x4E86;&#x90E8;&#x5206;&#x4EE3;&#x7801;)&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo-form/todo-form.component.ts ----- */
import { TodoFormController } from &apos;./todo-form.controller&apos;;

export const TodoFormComponent: angular.IComponentOptions = {
  bindings: {
    todo: &apos;&lt;&apos;,
    onAddTodo: &apos;&amp;&apos;
  },
  controller: TodoFormController,
  template: `
    &lt;form name=&quot;todoForm&quot; ng-submit=&quot;$ctrl.onSubmit();&quot;&gt;
      &lt;input type=&quot;text&quot; ng-model=&quot;$ctrl.todo.title&quot;&gt;
      &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  `
};


/* ----- todo/todo-form/todo-form.controller.ts ----- */
import { EventEmitter } from &apos;../common/event-emitter&apos;;
import { Event } from &apos;../common/event&apos;;

export class TodoFormController {
  static $inject = [&apos;EventEmitter&apos;];

  constructor(private eventEmitter: EventEmitter) {}
  $onChanges(changes) {
    if (changes.todo) {
      this.todo = Object.assign({}, this.todo);
    }
  }
  onSubmit() {
    if (!this.todo.title) return;
    // with EventEmitter wrapper
    this.onAddTodo(
      eventEmitter({
        todo: this.todo
      });
    );
    // without EventEmitter wrapper
    this.onAddTodo(new Event({
        todo: this.todo
      }));
  }
}

/* ----- common/event.ts ----- */
export class Event {
    constructor(public $event: any){ }
}

/* ----- common/event-emitter.ts ----- */
import { Event } from &apos;./event&apos;;

export function EventEmitter(payload: any): Event {
    return new Event(payload);
}

/* ----- todo/todo-form/index.ts ----- */
import angular from &apos;angular&apos;;
import { EventEmitter } from &apos;./common/event-emitter&apos;;
import { TodoFormComponent } from &apos;./todo-form.component&apos;;

export const TodoFormModule = angular
  .module(&apos;todo.form&apos;, [])
  .component(&apos;todoForm&apos;, TodoFormComponent)
  .value(&apos;EventEmitter&apos;, EventEmitter)
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo-form/todo-form.component.ts ----- */</span>
<span class="hljs-keyword">import</span> { TodoFormController } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo-form.controller&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoFormComponent: angular.IComponentOptions = {
  bindings: {
    todo: <span class="hljs-string">&apos;&lt;&apos;</span>,
    onAddTodo: <span class="hljs-string">&apos;&amp;&apos;</span>
  },
  controller: TodoFormController,
  template: <span class="hljs-string">`
    &lt;form name=&quot;todoForm&quot; ng-submit=&quot;$ctrl.onSubmit();&quot;&gt;
      &lt;input type=&quot;text&quot; ng-model=&quot;$ctrl.todo.title&quot;&gt;
      &lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;
    &lt;/form&gt;
  `</span>
};


<span class="hljs-comment">/* ----- todo/todo-form/todo-form.controller.ts ----- */</span>
<span class="hljs-keyword">import</span> { EventEmitter } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../common/event-emitter&apos;</span>;
<span class="hljs-keyword">import</span> { Event } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../common/event&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoFormController {
  <span class="hljs-keyword">static</span> $inject = [<span class="hljs-string">&apos;EventEmitter&apos;</span>];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> eventEmitter: EventEmitter</span>) {}
  $onChanges(changes) {
    <span class="hljs-keyword">if</span> (changes.todo) {
      <span class="hljs-keyword">this</span>.todo = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.todo);
    }
  }
  onSubmit() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.todo.title) <span class="hljs-keyword">return</span>;
    <span class="hljs-comment">// with EventEmitter wrapper</span>
    <span class="hljs-keyword">this</span>.onAddTodo(
      eventEmitter({
        todo: <span class="hljs-keyword">this</span>.todo
      });
    );
    <span class="hljs-comment">// without EventEmitter wrapper</span>
    <span class="hljs-keyword">this</span>.onAddTodo(<span class="hljs-keyword">new</span> Event({
        todo: <span class="hljs-keyword">this</span>.todo
      }));
  }
}

<span class="hljs-comment">/* ----- common/event.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> Event {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> $event: <span class="hljs-built_in">any</span></span>){ }
}

<span class="hljs-comment">/* ----- common/event-emitter.ts ----- */</span>
<span class="hljs-keyword">import</span> { Event } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./event&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">EventEmitter</span>(<span class="hljs-params">payload: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">Event</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Event(payload);
}

<span class="hljs-comment">/* ----- todo/todo-form/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { EventEmitter } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./common/event-emitter&apos;</span>;
<span class="hljs-keyword">import</span> { TodoFormComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo-form.component&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoFormModule = angular
  .module(<span class="hljs-string">&apos;todo.form&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todoForm&apos;</span>, TodoFormComponent)
  .value(<span class="hljs-string">&apos;EventEmitter&apos;</span>, EventEmitter)
  .name;
</code></pre><p>&#x8BF7;&#x6CE8;&#x610F; <code>&lt;todo-form&gt;</code> &#x7EC4;&#x4EF6;&#x4E0D;&#x83B7;&#x53D6;&#x72B6;&#x6001;&#xFF0C;&#x5B83;&#x53EA;&#x662F;&#x7B80;&#x5355;&#x7684;&#x63A5;&#x6536;&#xFF0C;&#x5B83;&#x901A;&#x8FC7;&#x63A7;&#x5236;&#x5668;&#x7684;&#x903B;&#x8F91;&#x53BB;&#x6539;&#x53D8;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x901A;&#x8FC7;&#x7ED1;&#x5B9A;&#x7684;&#x5C5E;&#x6027;&#x5C06;&#x6539;&#x53D8;&#x540E;&#x7684;&#x503C;&#x4F20;&#x56DE;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#x3002; &#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D; <code>$onChanges</code> &#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x514B;&#x9686;&#x4E86;&#x521D;&#x59CB;&#x7684; <code>this.todo</code> &#x5BF9;&#x8C61;&#x5E76;&#x91CD;&#x65B0;&#x8D4B;&#x503C;&#xFF0C;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x5728;&#x6211;&#x4EEC;&#x63D0;&#x4EA4;&#x8868;&#x5355;&#x4E4B;&#x524D;&#x4E0D;&#x53D7;&#x5F71;&#x54CD;&#xFF0C;&#x540C;&#x65F6;&#x8FD8;&#x8981;&#x65B0;&#x7684;&#x5355;&#x5411;&#x6570;&#x636E;&#x7ED1;&#x5B9A;&#x8BED;&#x6CD5;&apos;&lt;&apos; &#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader17">Routed components</h3><p>&#x6211;&#x4EEC;&#x6765;&#x5B9A;&#x4E49;&#x4E0B;&#x4EC0;&#x4E48;&#x53EB;&#x4F5C;&#x201C;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x201D;&#xFF1A;</p><ul><li>&#x5B83;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x5177;&#x6709;&#x8DEF;&#x7531;&#x5B9A;&#x4E49;&#x7684;&#x6709;&#x72B6;&#x6001;&#x7EC4;&#x4EF6;</li><li>&#x6CA1;&#x6709; <code>router.ts</code> &#x6587;&#x4EF6;</li><li>&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x53BB;&#x5B9A;&#x4E49;&#x4ED6;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;&#x8DEF;&#x7531;&#x903B;&#x8F91;</li><li>&#x6570;&#x636E;&#x901A;&#x8FC7;&#x8DEF;&#x7531; resolve &#x201C;&#x8F93;&#x5165;&#x201D; &#x7EC4;&#x4EF6;&#xFF08;&#x53EF;&#x9009;&#xFF0C;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x5728;&#x63A7;&#x5236;&#x5668;&#x4E2D;&#x4F7F;&#x7528;&#x670D;&#x52A1;&#x8C03;&#x7528;&#xFF09;</li></ul><p>&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x5229;&#x7528;&#x5DF2;&#x7ECF;&#x5B58;&#x5728;&#x7684; <code>&lt;todo&gt;</code> &#x7EC4;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x8DEF;&#x7531;&#x5B9A;&#x4E49;&#x548C;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684; <code>bindings</code> &#x63A5;&#x6536;&#x6570;&#x636E;&#xFF08;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;<code>ui-router</code>&#x7684;&#x79D8;&#x8BC0;&#x662F;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x7684;<code>reslove</code>&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;<code>todoData</code>&#x76F4;&#x63A5;&#x6620;&#x5C04;&#x5230;&#x4E86;<code>bindings</code>&#xFF09;&#x3002;&#x6211;&#x4EEC;&#x628A;&#x5B83;&#x770B;&#x4F5C;&#x4E00;&#x4E2A;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x201C;&#x89C6;&#x56FE;&#x201D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo.component.ts ----- */
import { TodoController } from &apos;./todo.controller&apos;;

export const TodoComponent: angular.IComponentOptions = {
  bindings: {
    todoData: &apos;&lt;&apos;
  },
  controller: TodoController,
  template: `
    &lt;div class=&quot;todo&quot;&gt;
      &lt;todo-form
        todo=&quot;$ctrl.newTodo&quot;
        on-add-todo=&quot;$ctrl.addTodo($event);&quot;&gt;
      &lt;todo-list
        todos=&quot;$ctrl.todos&quot;&gt;&lt;/todo-list&gt;
    &lt;/div&gt;
  `
};

/* ----- todo/todo.controller.ts ----- */
import { TodoItem } from &apos;../common/model/todo&apos;;

export class TodoController {
  todos: TodoItem[] = [];

  $onInit() {
    this.newTodo = new TodoItem();
  }

  $onChanges(changes) {
    if (changes.todoData) {
      this.todos = Object.assign({}, this.todoData);
    }
  }

  addTodo({ todo }) {
    if (!todo) return;
    this.todos.unshift(todo);
    this.newTodo = new TodoItem();
  }
}


/* ----- common/model/todo.ts ----- */
export class TodoItem {
    constructor(
        public title: string = &apos;&apos;,
        public completed: boolean = false) { }
}


/* ----- todo/todo.service.ts ----- */
export class TodoService {
  static $inject: string[] = [&apos;$http&apos;];

  constructor(private $http: angular.IHttpService) { }

  getTodos() {
    return this.$http.get(&apos;/api/todos&apos;).then(response =&gt; response.data);
  }
}


/* ----- todo/index.ts ----- */
import angular from &apos;angular&apos;;
import { TodoComponent } from &apos;./todo.component&apos;;
import { TodoService } from &apos;./todo.service&apos;;

export const TodoModule = angular
  .module(&apos;todo&apos;, [])
  .component(&apos;todo&apos;, TodoComponent)
  .service(&apos;TodoService&apos;, TodoService)
  .config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) =&gt; {
    $stateProvider
      .state(&apos;todos&apos;, {
        url: &apos;/todos&apos;,
        component: &apos;todo&apos;,
        resolve: {
          todoData: TodoService =&gt; TodoService.getTodos();
        }
      });
    $urlRouterProvider.otherwise(&apos;/&apos;);
  })
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo.component.ts ----- */</span>
<span class="hljs-keyword">import</span> { TodoController } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.controller&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoComponent: angular.IComponentOptions = {
  bindings: {
    todoData: <span class="hljs-string">&apos;&lt;&apos;</span>
  },
  controller: TodoController,
  template: <span class="hljs-string">`
    &lt;div class=&quot;todo&quot;&gt;
      &lt;todo-form
        todo=&quot;$ctrl.newTodo&quot;
        on-add-todo=&quot;$ctrl.addTodo($event);&quot;&gt;
      &lt;todo-list
        todos=&quot;$ctrl.todos&quot;&gt;&lt;/todo-list&gt;
    &lt;/div&gt;
  `</span>
};

<span class="hljs-comment">/* ----- todo/todo.controller.ts ----- */</span>
<span class="hljs-keyword">import</span> { TodoItem } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../common/model/todo&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoController {
  todos: TodoItem[] = [];

  $onInit() {
    <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-keyword">new</span> TodoItem();
  }

  $onChanges(changes) {
    <span class="hljs-keyword">if</span> (changes.todoData) {
      <span class="hljs-keyword">this</span>.todos = <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.todoData);
    }
  }

  addTodo({ todo }) {
    <span class="hljs-keyword">if</span> (!todo) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">this</span>.todos.unshift(todo);
    <span class="hljs-keyword">this</span>.newTodo = <span class="hljs-keyword">new</span> TodoItem();
  }
}


<span class="hljs-comment">/* ----- common/model/todo.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoItem {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">
        <span class="hljs-keyword">public</span> title: <span class="hljs-built_in">string</span> = &apos;&apos;,
        <span class="hljs-keyword">public</span> completed: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">false</span></span>) { }
}


<span class="hljs-comment">/* ----- todo/todo.service.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoService {
  <span class="hljs-keyword">static</span> $inject: <span class="hljs-built_in">string</span>[] = [<span class="hljs-string">&apos;$http&apos;</span>];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> $http: angular.IHttpService</span>) { }

  getTodos() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">&apos;/api/todos&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.data);
  }
}


<span class="hljs-comment">/* ----- todo/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { TodoComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.component&apos;</span>;
<span class="hljs-keyword">import</span> { TodoService } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.service&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoModule = angular
  .module(<span class="hljs-string">&apos;todo&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todo&apos;</span>, TodoComponent)
  .service(<span class="hljs-string">&apos;TodoService&apos;</span>, TodoService)
  .config(<span class="hljs-function">(<span class="hljs-params">$stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider</span>) =&gt;</span> {
    $stateProvider
      .state(<span class="hljs-string">&apos;todos&apos;</span>, {
        url: <span class="hljs-string">&apos;/todos&apos;</span>,
        component: <span class="hljs-string">&apos;todo&apos;</span>,
        resolve: {
          todoData: <span class="hljs-function"><span class="hljs-params">TodoService</span> =&gt;</span> TodoService.getTodos();
        }
      });
    $urlRouterProvider.otherwise(<span class="hljs-string">&apos;/&apos;</span>);
  })
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader18">Directives</h1><h3 id="articleHeader19">Directive theory</h3><p>&#x6307;&#x4EE4;&#x7ED9;&#x4E86;&#x6211;&#x4EEC; <code>template</code> &#xFF0C;<code>scope</code> &#x7ED1;&#x5B9A; &#xFF0C;<code>bindToController</code>&#xFF0C;<code>link</code> &#x548C;&#x8BB8;&#x591A;&#x5176;&#x4ED6;&#x7684;&#x4E8B;&#x60C5;&#x3002;&#x4F7F;&#x7528;&#x8FD9;&#x4E9B;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x614E;&#x91CD;&#x8003;&#x8651;&#x73B0;&#x5728;&#x7684; <code>.component()</code>&#x3002;&#x6307;&#x4EE4;&#x4E0D;&#x5E94;&#x8BE5;&#x518D;&#x58F0;&#x660E;&#x6A21;&#x677F;&#x548C;&#x63A7;&#x5236;&#x5668;&#x4E86;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;&#x7ED1;&#x5B9A;&#x63A5;&#x6536;&#x6570;&#x636E;&#x3002;&#x6307;&#x4EE4;&#x5E94;&#x8BE5;&#x4EC5;&#x4EC5;&#x662F;&#x4E3A;&#x4E86;&#x88C5;&#x9970;DOM&#x4F7F;&#x7528;&#x3002;&#x8FD9;&#x6837;&#xFF0C;&#x4F7F;&#x7528; <code>.component()</code> &#x521B;&#x5EFA;&#x5C31;&#x610F;&#x5473;&#x7740;&#x6269;&#x5C55;&#x73B0;&#x6709;&#x7684;HTML&#x3002;&#x7B80;&#x800C;&#x8A00;&#x4E4B;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x81EA;&#x5B9A;&#x4E49;<code>DOM</code>&#x4E8B;&#x4EF6;/ APIs&#x548C;&#x903B;&#x8F91;&#xFF0C;&#x5728;&#x7EC4;&#x4EF6;&#x91CC;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x6307;&#x4EE4;&#x5C06;&#x5176;&#x7ED1;&#x5B9A;&#x5230;&#x6A21;&#x677F;&#x3002;&#x5982;&#x679C;&#x4F60;&#x9700;&#x8981;&#x7684;&#x8DB3;&#x591F;&#x7684;&#x6570;&#x91CF;&#x7684; <code>DOM</code>&#x64CD;&#x4F5C;&#xFF0C;<code>$postLink</code> &#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x503C;&#x5F97;&#x8003;&#x8651;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x5E76;&#x4E0D;&#x662F;&#x8FC1;&#x79FB;&#x6240;&#x6709;&#x7684;&#x7684;DOM&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x53EF;&#x4EE5;&#x7684;&#x8BDD;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6307;&#x4EE4;&#x6765;&#x5904;&#x7406;&#x975E;Angular&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;&#x6307;&#x4EE4;&#x7684;&#x5EFA;&#x8BAE;&#xFF1A;</p><ul><li>&#x4E0D;&#x8981;&#x4F7F;&#x7528;templates&#x3001;scope&#xFF0C;bindToController &#x6216;&#x8005; controllers</li><li>&#x6307;&#x4EE4;&#x901A;&#x5E38;&#x4F7F;&#x7528;<code>restrict: &apos;A&apos;</code></li><li>&#x5728;&#x9700;&#x8981;&#x7684;&#x5730;&#x65B9;&#x4F7F;&#x7528; <code>compile</code> &#x548C; <code>link</code></li><li>&#x8BB0;&#x5F97;&#x5728;<code>$scope.$on(&apos;$destroy&apos;, fn);</code>&#x4E2D;&#x9500;&#x6BC1;&#x6216;&#x8005;&#x89E3;&#x7ED1;&#x4E8B;&#x4EF6;&#x5904;&#x7406;</li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader20">Recommended properties</h3><p>Due to the fact directives support most of what <code>.component()</code> does (template directives were the original component), I&apos;m recommending limiting your directive Object definitions to only these properties, to avoid using directives incorrectly:</p><p>&#x7531;&#x4E8E;&#x6307;&#x4EE4;&#x5B9E;&#x9645;&#x4E0A;&#x652F;&#x6301;&#x4E86;&#x5927;&#x591A;&#x6570; <code>.component()</code> &#x7684;&#x8BED;&#x6CD5; (&#x6A21;&#x677F;&#x6307;&#x4EE4;&#x5C31;&#x662F;&#x6700;&#x539F;&#x59CB;&#x7684;&#x7EC4;&#x4EF6;), &#x6211;&#x5EFA;&#x8BAE;&#x5C06;&#x6307;&#x4EE4;&#x5BF9;&#x8C61;&#x5B9A;&#x4E49;&#x9650;&#x5236;&#x5728;&#x8FD9;&#x4E9B;&#x5C5E;&#x6027;&#x4E0A;&#xFF0C;&#x53BB;&#x907F;&#x514D;&#x9519;&#x8BEF;&#x7684;&#x4F7F;&#x7528;&#x6307;&#x4EE4;&#xFF1A;</p><table><thead><tr><th>Property</th><th>Use it?</th><th>Why</th></tr></thead><tbody><tr><td>bindToController</td><td>No</td><td>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; <code>bindings</code></td></tr><tr><td>compile</td><td>Yes</td><td>&#x9884;&#x7F16;&#x8BD1; DOM &#x64CD;&#x4F5C;/&#x4E8B;&#x4EF6;</td></tr><tr><td>controller</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>controllerAs</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>link functions</td><td>Yes</td><td>&#x5BF9;&#x4E8E;DOM &#x64CD;&#x4F5C;/&#x4E8B;&#x4EF6;&#x7684;&#x524D;&#x540E;</td></tr><tr><td>multiElement</td><td>Yes</td><td><a href="https://docs.angularjs.org/api/ng/service/" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;</a></td></tr><tr><td>priority</td><td>Yes</td><td><a href="https://docs.angularjs.org/api/ng/service/" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;</a></td></tr><tr><td>require</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>restrict</td><td>Yes</td><td>&#x4F7F;&#x7528; <code>&apos;A&apos;</code> &#x53BB;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>scope</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>template</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>templateNamespace</td><td>Yes (if you must)</td><td><a href="https://docs.angularjs.org/api/ng/service/" rel="nofollow noreferrer" target="_blank">&#x6587;&#x6863;</a></td></tr><tr><td>templateUrl</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr><tr><td>transclude</td><td>No</td><td>&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;</td></tr></tbody></table><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader21">Constants or Classes</h3><p>&#x8FD9;&#x91CC;&#x6709;&#x4F7F;&#x7528; TypeScript &#x548C; directives &#x5B9E;&#x73B0;&#x7684;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8FD8;&#x662F;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x590D;&#x5236;&#xFF0C;&#x6216;&#x8005;&#x4F7F;&#x7528; TypeScript &#x7684; <code>Class</code>&#x3002;&#x9009;&#x62E9;&#x6700;&#x9002;&#x5408;&#x4F60;&#x6216;&#x8005;&#x4F60;&#x56E2;&#x961F;&#x7684;&#xFF0C;Angular2&#x4E2D;&#x4F7F;&#x7528;&#x7684;&#x662F;<code>Class</code>&#x3002;</p><p>&#x4E0B;&#x9762;&#x662F;&#x4F7F;&#x7528;&#x7BAD;&#x5934;&#x51FD;&#x6570;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x5E38;&#x91CF;&#x7684;&#x4F8B;&#x5B50;<code>() =&gt; ({})</code>&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5B57;&#x9762;&#x91CF;&#xFF08;&#x6CE8;&#x610F;&#x4E0E;&#x4F7F;&#x7528;<code>.directive()</code>&#x7684;&#x4E0D;&#x540C;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo-autofocus.directive.ts ----- */
import angular from &apos;angular&apos;;

export const TodoAutoFocus = ($timeout: angular.ITimeoutService) =&gt; (&lt;angular.IDirective&gt; {
  restrict: &apos;A&apos;,
  link($scope, $element, $attrs) {
    $scope.$watch($attrs.todoAutofocus, (newValue, oldValue) =&gt; {
      if (!newValue) {
        return;
      }
      $timeout(() =&gt; $element[0].focus());
    });
  }
});

TodoAutoFocus.$inject = [&apos;$timeout&apos;];

/* ----- todo/index.ts ----- */
import angular from &apos;angular&apos;;
import { TodoComponent } from &apos;./todo.component&apos;;
import { TodoAutofocus } from &apos;./todo-autofocus.directive&apos;;

export const TodoModule = angular
  .module(&apos;todo&apos;, [])
  .component(&apos;todo&apos;, TodoComponent)
  .directive(&apos;todoAutofocus&apos;, TodoAutoFocus)
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo-autofocus.directive.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoAutoFocus = <span class="hljs-function">(<span class="hljs-params">$timeout: angular.ITimeoutService</span>) =&gt;</span> (&lt;angular.IDirective&gt; {
  restrict: <span class="hljs-string">&apos;A&apos;</span>,
  link($scope, $element, $attrs) {
    $scope.$watch($attrs.todoAutofocus, <span class="hljs-function">(<span class="hljs-params">newValue, oldValue</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!newValue) {
        <span class="hljs-keyword">return</span>;
      }
      $timeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $element[<span class="hljs-number">0</span>].focus());
    });
  }
});

TodoAutoFocus.$inject = [<span class="hljs-string">&apos;$timeout&apos;</span>];

<span class="hljs-comment">/* ----- todo/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { TodoComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.component&apos;</span>;
<span class="hljs-keyword">import</span> { TodoAutofocus } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo-autofocus.directive&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoModule = angular
  .module(<span class="hljs-string">&apos;todo&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todo&apos;</span>, TodoComponent)
  .directive(<span class="hljs-string">&apos;todoAutofocus&apos;</span>, TodoAutoFocus)
  .name;
</code></pre><p>&#x6216;&#x8005;&#x4F7F;&#x7528; TypeScript <code>Class</code> &#xFF08;&#x6CE8;&#x610F;&#x5728;&#x6CE8;&#x518C;&#x6307;&#x4EE4;&#x7684;&#x65F6;&#x5019;&#x624B;&#x52A8;&#x8C03;&#x7528;<code>new TodoAutoFocus</code>&#xFF09;&#x53BB;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo-autofocus.directive.ts ----- */
import angular from &apos;angular&apos;;

export class TodoAutoFocus implements angular.IDirective {
  static $inject: string[] = [&apos;$timeout&apos;];
  restrict: string;

  constructor(private $timeout: angular.ITimeoutService) {
    this.restrict = &apos;A&apos;;
  }

  link($scope, $element: HTMLElement, $attrs) {
    $scope.$watch($attrs.todoAutofocus, (newValue, oldValue) =&gt; {
      if (!newValue) {
        return;
      }

      $timeout(() =&gt; $element[0].focus());
    });
  }
}


/* ----- todo/index.ts ----- */
import angular from &apos;angular&apos;;
import { TodoComponent } from &apos;./todo.component&apos;;
import { TodoAutofocus } from &apos;./todo-autofocus.directive&apos;;

export const TodoModule = angular
  .module(&apos;todo&apos;, [])
  .component(&apos;todo&apos;, TodoComponent)
  .directive(&apos;todoAutofocus&apos;, ($timeout: angular.ITimeoutService) =&gt; new TodoAutoFocus($timeout))
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo-autofocus.directive.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoAutoFocus <span class="hljs-keyword">implements</span> angular.IDirective {
  <span class="hljs-keyword">static</span> $inject: <span class="hljs-built_in">string</span>[] = [<span class="hljs-string">&apos;$timeout&apos;</span>];
  restrict: <span class="hljs-built_in">string</span>;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> $timeout: angular.ITimeoutService</span>) {
    <span class="hljs-keyword">this</span>.restrict = <span class="hljs-string">&apos;A&apos;</span>;
  }

  link($scope, $element: HTMLElement, $attrs) {
    $scope.$watch($attrs.todoAutofocus, <span class="hljs-function">(<span class="hljs-params">newValue, oldValue</span>) =&gt;</span> {
      <span class="hljs-keyword">if</span> (!newValue) {
        <span class="hljs-keyword">return</span>;
      }

      $timeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $element[<span class="hljs-number">0</span>].focus());
    });
  }
}


<span class="hljs-comment">/* ----- todo/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { TodoComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.component&apos;</span>;
<span class="hljs-keyword">import</span> { TodoAutofocus } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo-autofocus.directive&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> TodoModule = angular
  .module(<span class="hljs-string">&apos;todo&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todo&apos;</span>, TodoComponent)
  .directive(<span class="hljs-string">&apos;todoAutofocus&apos;</span>, <span class="hljs-function">(<span class="hljs-params">$timeout: angular.ITimeoutService</span>) =&gt;</span> <span class="hljs-keyword">new</span> TodoAutoFocus($timeout))
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader22">Services</h1><h3 id="articleHeader23">Service theory</h3><p>&#x670D;&#x52A1;&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x5305;&#x542B;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x5BB9;&#x5668;&#xFF0C;&#x800C;&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#x4E0D;&#x5E94;&#x8BE5;&#x76F4;&#x63A5;&#x8FDB;&#x884C;&#x8BF7;&#x6C42;&#x3002;&#x670D;&#x52A1;&#x5305;&#x542B;&#x5176;&#x5B83;&#x5185;&#x7F6E;&#x6216;&#x5916;&#x90E8;&#x670D;&#x52A1;&#xFF0C;&#x4F8B;&#x5982;<code>$http</code>&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x968F;&#x65F6;&#x968F;&#x5730;&#x7684;&#x5728;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x6CE8;&#x5165;&#x5230;&#x7EC4;&#x4EF6;&#x63A7;&#x5236;&#x5668;&#x3002;&#x6211;&#x4EEC;&#x5728;&#x5F00;&#x53D1;&#x670D;&#x52A1;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x4F7F;&#x7528;<code>.service()</code> &#x6216;&#x8005; <code>.factory()</code>&#x3002;&#x4F7F;&#x7528;TypeScript <code>Class</code>&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x53EA;&#x4F7F;&#x7528;<code>.service()</code>&#xFF0C;&#x901A;&#x8FC7;<code>$inject</code>&#x5B8C;&#x6210;&#x4F9D;&#x8D56;&#x6CE8;&#x5165;&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h3 id="articleHeader24">Classes for Service</h3><p>&#x4E0B;&#x9762;&#x662F;&#x4F7F;&#x7528; TypeScript <code>Class</code> &#x5B9E;&#x73B0;<code>&lt;todo&gt;</code> &#x5E94;&#x7528;&#x7684;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ----- todo/todo.service.ts ----- */
export class TodoService {
  static $inject: string[] = [&apos;$http&apos;];

  constructor(private $http: angular.IHttpService) { }
  getTodos() {
    return this.$http.get(&apos;/api/todos&apos;).then(response =&gt; response.data);
  }
}


/* ----- todo/index.ts ----- */
import angular from &apos;angular&apos;;
import { TodoComponent } from &apos;./todo.component&apos;;
import { TodoService } from &apos;./todo.service&apos;;

export const todo = angular
  .module(&apos;todo&apos;, [])
  .component(&apos;todo&apos;, TodoComponent)
  .service(&apos;TodoService&apos;, TodoService)
  .name;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-comment">/* ----- todo/todo.service.ts ----- */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> TodoService {
  <span class="hljs-keyword">static</span> $inject: <span class="hljs-built_in">string</span>[] = [<span class="hljs-string">&apos;$http&apos;</span>];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> $http: angular.IHttpService</span>) { }
  getTodos() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$http.get(<span class="hljs-string">&apos;/api/todos&apos;</span>).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.data);
  }
}


<span class="hljs-comment">/* ----- todo/index.ts ----- */</span>
<span class="hljs-keyword">import</span> angular <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular&apos;</span>;
<span class="hljs-keyword">import</span> { TodoComponent } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.component&apos;</span>;
<span class="hljs-keyword">import</span> { TodoService } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./todo.service&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> todo = angular
  .module(<span class="hljs-string">&apos;todo&apos;</span>, [])
  .component(<span class="hljs-string">&apos;todo&apos;</span>, TodoComponent)
  .service(<span class="hljs-string">&apos;TodoService&apos;</span>, TodoService)
  .name;
</code></pre><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader25">Styles</h1><p>&#x5229;&#x7528;<a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack</a> &#x6211;&#x4EEC;&#x73B0;&#x5728;&#x53EF;&#x4EE5;&#x5728; <code>*.module.js</code> &#x4E2D;&#x7684; <code>.scss</code>&#x6587;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528;<code>import</code> &#x8BED;&#x53E5;&#xFF0C;&#x8BA9; Webpack &#x77E5;&#x9053;&#x5728;&#x6211;&#x4EEC;&#x7684;&#x6837;&#x5F0F;&#x4E2D;&#x5305;&#x542B;&#x8FD9;&#x6837;&#x7684;&#x6587;&#x4EF6;&#x3002; &#x8FD9;&#x6837;&#x505A;&#x53EF;&#x4EE5;&#x4F7F;&#x6211;&#x4EEC;&#x7684;&#x7EC4;&#x4EF6;&#x5728;&#x529F;&#x80FD;&#x548C;&#x6837;&#x5F0F;&#x4E0A;&#x4FDD;&#x6301;&#x5206;&#x79BB;&#xFF0C;&#x5B83;&#x8FD8;&#x4E0E;Angular2&#x4E2D;&#x4F7F;&#x7528;&#x6837;&#x5F0F;&#x7684;&#x65B9;&#x5F0F;&#x66F4;&#x52A0;&#x8D34;&#x8FD1;&#x3002;&#x8FD9;&#x6837;&#x505A;&#x4E0D;&#x4F1A;&#x8BA9;&#x6837;&#x5F0F;&#x50CF;Angular2&#x4E00;&#x6837;&#x9694;&#x79BB;&#x5728;&#x67D0;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E0A;&#xFF0C;&#x6837;&#x5F0F;&#x8FD8;&#x53EF;&#x4EE5;&#x5E7F;&#x6CDB;&#x5E94;&#x7528;&#x5230;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x4E0A;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x66F4;&#x52A0;&#x6613;&#x4E8E;&#x7BA1;&#x7406;&#xFF0C;&#x5E76;&#x4E14;&#x4F7F;&#x5F97;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x7ED3;&#x6784;&#x66F4;&#x52A0;&#x6613;&#x4E8E;&#x63A8;&#x7406;&#x3002;</p><p>If you have some variables or globally used styles like form input elements then these files should still be placed into the root <code>scss</code> folder. e.g. <code>scss/_forms.scss</code>. These global styles can the be <code>@imported</code> into your root module (<code>app.module.js</code>) stylesheet like you would normally do.</p><p>&#x5982;&#x679C;&#x4F60;&#x6709;&#x4E00;&#x4E9B;&#x53D8;&#x91CF;&#x6216;&#x8005;&#x5168;&#x5C40;&#x4F7F;&#x7528;&#x7684;&#x6837;&#x5F0F;&#xFF0C;&#x50CF;&#x8868;&#x5355;&#x7684;input&#x5143;&#x7D20;&#xFF0C;&#x90A3;&#x4E48;&#x8FD9;&#x4E9B;&#x6587;&#x4EF6;&#x5E94;&#x8BE5;&#x653E;&#x5728;&#x6839;<code>scss</code>&#x6587;&#x4EF6;&#x5939;&#x3002;&#x4F8B;&#x5982;<code>scss/_forms.scss</code>&#x3002;&#x8FD9;&#x4E9B;&#x5168;&#x5C40;&#x7684;&#x6837;&#x5F0F;&#x53EF;&#x4EE5;&#x50CF;&#x901A;&#x5E38;&#x610F;&#x4E49;&#x88AB;<code>@imported</code>&#x5230;&#x6839;&#x6A21;&#x5757;(<code>app.module.ts</code>)&#x3002;</p><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader26">TypeScript and Tooling</h1><h5>TypeScript</h5><ul><li>&#x4F7F;&#x7528;<a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a> &#x7F16;&#x8BD1; TypeScript &#x4EE3;&#x7801;&#x548C;&#x5176;&#x4ED6; polyfills</li><li>&#x8003;&#x8651;&#x4F7F;&#x7528; <a href="http://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TypeScript</a>&#x8BA9;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x8FC1;&#x79FB;&#x5230;Angular2</li></ul><h5>Tooling</h5><ul><li><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x652F;&#x6301;&#x7EC4;&#x4EF6;&#x8DEF;&#x7531;&#xFF0C;&#x4F7F;&#x7528;<code>ui-router</code><a href="https://github.com/angular-ui/ui-router" rel="nofollow noreferrer" target="_blank">latest alpha</a>&#xFF08;&#x67E5;&#x770B;Readme&#xFF09;</p><ul><li>&#x5426;&#x5219;&#x4F60;&#x5C06;&#x4F1A;&#x88AB; <code>template: &apos;&lt;component&gt;&apos;</code> &#x548C; &#x6CA1;&#x6709; <code>bindings</code> &#x56F0;&#x4F4F;</li></ul></li><li>&#x8003;&#x8651;&#x4F7F;&#x7528;<a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank">Webpack</a>&#x6765;&#x7F16;&#x8BD1;&#x4F60;&#x7684; TypeScript &#x4EE3;&#x7801;</li><li>&#x4F7F;&#x7528;<a href="https://github.com/olov/ng-annotate" rel="nofollow noreferrer" target="_blank">ngAnnotate</a> &#x6765;&#x81EA;&#x52A8;&#x6CE8;&#x89E3; <code>$inject</code> &#x5C5E;&#x6027;</li><li>&#x5982;&#x4F55;&#x4F7F;&#x7528;<a href="https://www.timroes.de/2015/07/29/using-ecmascript-6-es6-with-angularjs-1-x/#ng-annotate" rel="nofollow noreferrer" target="_blank">ngAnnotate with TypeScript</a></li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader27">State management</h1><p>&#x8003;&#x8651;&#x5728;Angular1.5&#x4E2D;&#x4F7F;&#x7528;Redux&#x7528;&#x4E8E;&#x6570;&#x636E;&#x7BA1;&#x7406;&#x3002;</p><ul><li><a href="https://github.com/angular-redux/ng-redux" rel="nofollow noreferrer" target="_blank">Angular Redux</a></li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader28">Resources</h1><ul><li><a href="https://toddmotto.com/exploring-the-angular-1-5-component-method/" rel="nofollow noreferrer" target="_blank">Understanding the .component() method</a></li><li><a href="https://toddmotto.com/on-init-require-object-syntax-angular-component/" rel="nofollow noreferrer" target="_blank">Using &quot;require&quot; with $onInit</a></li><li><a href="https://toddmotto.com/angular-1-5-lifecycle-hooks" rel="nofollow noreferrer" target="_blank">Understanding all the lifecycle hooks, $onInit, $onChange, $postLink, $onDestroy</a></li><li><a href="https://toddmotto.com/resolve-promises-in-angular-routes/" rel="nofollow noreferrer" target="_blank">Using &quot;resolve&quot; in routes</a></li><li><a href="http://blog.rangle.io/managing-state-redux-angular/" rel="nofollow noreferrer" target="_blank">Redux and Angular state management</a></li></ul><p><strong><a href="#">&#x56DE;&#x5230;&#x9876;&#x90E8;</a></strong></p><h1 id="articleHeader29">Documentation</h1><p>For anything else, including API reference, check the <a href="//docs.angularjs.org/api" rel="nofollow noreferrer">Angular documentation</a>.</p><h1 id="articleHeader30">Contributing</h1><p>Open an issue first to discuss potential changes/additions. Please don&apos;t open issues for questions.</p><h2 id="articleHeader31">License</h2><h4>(The MIT License)</h4><p>Copyright (c) 2016 Todd Motto</p><p>Permission is hereby granted, free of charge, to any person obtaining<br>a copy of this software and associated documentation files (the<br>&apos;Software&apos;), to deal in the Software without restriction, including<br>without limitation the rights to use, copy, modify, merge, publish,<br>distribute, sublicense, and/or sell copies of the Software, and to<br>permit persons to whom the Software is furnished to do so, subject to<br>the following conditions:</p><p>The above copyright notice and this permission notice shall be<br>included in all copies or substantial portions of the Software.</p><p>THE SOFTWARE IS PROVIDED &apos;AS IS&apos;, WITHOUT WARRANTY OF ANY KIND,<br>EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF<br>MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.<br>IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY<br>CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,<br>TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE<br>SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p><blockquote><a href="https://github.com/silence717/javascript-translation/blob/master/javascript/Angular1.x-styleguide-TypeScript.md" rel="nofollow noreferrer" target="_blank">&#x672C;&#x6587;github&#x4ED3;&#x5E93;</a> &#x51C6;&#x5907;&#x6301;&#x7EED;&#x7FFB;&#x8BD1;&#x4E00;&#x4E9B;&#x6587;&#x7AE0;&#xFF0C;&#x65B9;&#x4FBF;&#x7684;&#x8BDD;&#x7ED9;&#x4E2A;star&#xFF01;&#x8C22;&#x8C22;~</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular1.x + TypeScript 编码风格

## 原文链接
[https://segmentfault.com/a/1190000015291731](https://segmentfault.com/a/1190000015291731)

