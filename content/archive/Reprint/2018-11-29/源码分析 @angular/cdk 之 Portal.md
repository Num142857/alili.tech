---
title: '源码分析 @angular/cdk 之 Portal' 
date: 2018-11-29 9:33:05
hidden: true
slug: lohh899h0vg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>@angular/material &#x662F; Angular &#x5B98;&#x65B9;&#x6839;&#x636E; Material Design &#x8BBE;&#x8BA1;&#x8BED;&#x8A00;&#x63D0;&#x4F9B;&#x7684; UI &#x5E93;&#xFF0C;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x5728;&#x5F00;&#x53D1; UI &#x5E93;&#x65F6;&#x53D1;&#x73B0;&#x5F88;&#x591A; UI &#x7EC4;&#x4EF6;&#x6709;&#x7740;&#x5171;&#x540C;&#x7684;&#x903B;&#x8F91;&#xFF0C;&#x6240;&#x4EE5;&#x4ED6;&#x4EEC;&#x628A;&#x8FD9;&#x4E9B;&#x5171;&#x540C;&#x903B;&#x8F91;&#x62BD;&#x51FA;&#x6765;&#x5355;&#x72EC;&#x505A;&#x4E00;&#x4E2A;&#x5305; @angular/cdk&#xFF0C;&#x8FD9;&#x4E2A;&#x5305;&#x4E0E; Material Design &#x8BBE;&#x8BA1;&#x8BED;&#x8A00;&#x65E0;&#x5173;&#xFF0C;&#x53EF;&#x4EE5;&#x88AB;&#x4EFB;&#x4F55;&#x4EBA;&#x6309;&#x7167;&#x5176;&#x4ED6;&#x8BBE;&#x8BA1;&#x8BED;&#x8A00;&#x6784;&#x5EFA;&#x5176;&#x4ED6;&#x98CE;&#x683C;&#x7684; UI &#x5E93;&#x3002;<strong>&#x5B66;&#x4E60; @angular/material &#x6216; @angular/cdk &#x8FD9;&#x4E9B;&#x5305;&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x5B66;&#x4E60;&#x5927;&#x725B;&#x4EEC;&#x662F;&#x5982;&#x4F55;&#x9AD8;&#x6548;&#x4F7F;&#x7528; TypeScript &#x8BED;&#x8A00;&#x7684;&#xFF1B;&#x5B66;&#x4E60;&#x4ED6;&#x4EEC;&#x5982;&#x4F55;&#x628A; RxJS &#x8FD9;&#x4E2A;&#x5305;&#x4F7F;&#x7528;&#x7684;&#x8FD9;&#x4E48;&#x51FA;&#x795E;&#x5165;&#x5316;&#xFF1B;&#x6700;&#x4E3B;&#x8981;&#x662F;&#x4E3A;&#x4E86;&#x5B66;&#x4E60;&#x4ED6;&#x4EEC;&#x662F;&#x600E;&#x4E48;&#x5E94;&#x7528; Angular &#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;&#x6280;&#x672F;&#x3002;&#x53EA;&#x6709;&#x6DF1;&#x5165;&#x7814;&#x7A76;&#x8FD9;&#x4E9B;&#x5927;&#x725B;&#x4EEC;&#x5199;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x624D;&#x80FD;&#x66F4;&#x5FEB;&#x63D0;&#x9AD8;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x8D28;&#x91CF;&#xFF0C;&#x8FD9;&#x662F;&#x4E00;&#x4EF6;&#x4E8B;&#x534A;&#x529F;&#x500D;&#x7684;&#x4E8B;&#x60C5;&#x3002;</strong>
</blockquote>
<h2 id="articleHeader0">Portal &#x662F;&#x4EC0;&#x4E48;</h2>
<p>&#x6700;&#x8FD1;&#x5728;&#x5B66;&#x4E60; React &#x65F6;&#xFF0C;&#x53D1;&#x73B0; React &#x63D0;&#x4F9B;&#x4E86; <strong><a href="https://reactjs.org/docs/portals.html" rel="nofollow noreferrer" target="_blank">Portals</a></strong> &#x6280;&#x672F;&#xFF0C;&#x8BE5;&#x6280;&#x672F;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x628A;&#x5B50;&#x8282;&#x70B9;&#x52A8;&#x6001;&#x7684;&#x663E;&#x793A;&#x5230;&#x7236;&#x8282;&#x70B9;&#x5916;&#x7684; DOM &#x8282;&#x70B9;&#x4E0A;&#xFF0C;&#x8BE5;&#x6280;&#x672F;&#x7684;&#x4E00;&#x4E2A;&#x7ECF;&#x5178;&#x7528;&#x4F8B;&#x5E94;&#x8BE5;&#x5C31;&#x662F; Dialog &#x4E86;&#x3002;&#x8BBE;&#x60F3;&#x4E00;&#x4E0B;&#x5728;&#x8BBE;&#x8BA1; Dialog &#x65F6;&#x6240;&#x9700;&#x8981;&#x7684;&#x4E3B;&#x8981;&#x529F;&#x80FD;&#x70B9;&#xFF1A;&#x5F53;&#x70B9;&#x51FB;&#x4E00;&#x4E2A; button &#x65F6;&#xFF0C;&#x4E00;&#x822C;&#x9700;&#x8981;&#x5728; body &#x6807;&#x7B7E;&#x524D;&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF1B;&#x8BE5; dialog &#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x9700;&#x8981;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002;&#x7531;&#x6B64;&#x770B;&#x51FA;&#xFF0C;Portal &#x6838;&#x5FC3;&#x5C31;&#x662F;&#x5728;&#x4EFB;&#x610F;&#x4E00;&#x4E2A; DOM &#x8282;&#x70B9;&#x5185;&#x52A8;&#x6001;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x8BE5; <strong>&#x89C6;&#x56FE;&#x5374;&#x53EF;&#x4EE5;&#x7F6E;&#x4E8E;&#x6846;&#x67B6;&#x4E0A;&#x4E0B;&#x6587;&#x73AF;&#x5883;&#x4E4B;&#x5916;</strong>&#x3002;&#x90A3; Angular &#x4E2D;&#x6709;&#x6CA1;&#x6709;&#x7C7B;&#x4F3C;&#x76F8;&#x5173;&#x6280;&#x672F;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x5462;&#xFF1F;</p>
<p><strong><a href="https://material.angular.io/cdk/portal/overview" rel="nofollow noreferrer" target="_blank">Angular Portal</a></strong> &#x5C31;&#x662F;&#x7528;&#x6765;&#x5728;&#x4EFB;&#x610F;&#x4E00;&#x4E2A; DOM &#x8282;&#x70B9;&#x5185;&#x52A8;&#x6001;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x8BE5;&#x89C6;&#x56FE;&#x65E2;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#xFF0C;&#x5E76;&#x4E14;&#x751F;&#x6210;&#x7684;&#x89C6;&#x56FE;&#x53EF;&#x4EE5;&#x6302;&#x8F7D;&#x5728;&#x4EFB;&#x610F;&#x4E00;&#x4E2A; DOM &#x8282;&#x70B9;&#xFF0C;&#x751A;&#x81F3;&#x8BE5;&#x8282;&#x70B9;&#x53EF;&#x4EE5;&#x7F6E;&#x4E8E; <strong>Angular &#x4E0A;&#x4E0B;&#x6587;&#x73AF;&#x5883;&#x4E4B;&#x5916;</strong>&#xFF0C;&#x4E5F;&#x540C;&#x6837;&#x53EF;&#x4EE5;&#x4E0E;&#x8BE5;&#x89C6;&#x56FE;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002;&#x8BE5; Portal &#x6280;&#x672F;&#x4E3B;&#x8981;&#x5C31;&#x6D89;&#x53CA;&#x4E24;&#x4E2A;&#x7B80;&#x5355;&#x5BF9;&#x8C61;&#xFF1A;<strong>PortalOutlet</strong> &#x548C; <strong>Portal&lt;T&gt;</strong>&#x3002;&#x4ECE;&#x5B57;&#x9762;&#x610F;&#x601D;&#x5C31;&#x53EF;&#x77E5;&#x9053;&#xFF0C;<strong>PortalOutlet</strong> &#x5E94;&#x8BE5;&#x5C31;&#x662F;&#x628A;&#x67D0;&#x4E00;&#x4E2A; DOM &#x8282;&#x70B9;&#x5305;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x6302;&#x8F7D;&#x5BB9;&#x5668;&#x4F9B; Portal &#x6765;&#x6302;&#x8F7D;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; <strong>&#x63D2;&#x5934;-&#x63D2;&#x7EBF;&#x677F;</strong> &#x6A21;&#x5F0F;&#x7684; <strong>&#x63D2;&#x7EBF;&#x677F;</strong>&#xFF1B;<strong>Portal&lt;T&gt;</strong> &#x5E94;&#x8BE5;&#x5C31;&#x662F;&#x628A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x6216;&#x8005;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#x5305;&#x88C5;&#x6210;&#x4E00;&#x4E2A; Portal &#x6302;&#x8F7D;&#x5230; PortalOutlet &#x4E0A;&#xFF0C;&#x7B49;&#x540C;&#x4E8E; <strong>&#x63D2;&#x5934;-&#x63D2;&#x7EBF;&#x677F;</strong> &#x6A21;&#x5F0F;&#x7684; <strong>&#x63D2;&#x5934;</strong>&#x3002;&#x8FD9;&#x4E0E; @angular/router &#x4E2D; Router &#x548C; <strong><a href="https://github.com/angular/angular/blob/master/packages/router/src/directives/router_outlet.ts#L21-L39" rel="nofollow noreferrer" target="_blank">RouterOutlet</a></strong> &#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x5F88;&#x7C7B;&#x4F3C;&#xFF0C;&#x5728;&#x5199;&#x8DEF;&#x7531;&#x65F6;&#xFF0C;<strong>router-outlet</strong> &#x5C31;&#x662F;&#x4E2A;&#x6302;&#x8F7D;&#x70B9;&#xFF0C;Angular &#x4F1A;&#x628A;&#x7531; Router &#x5305;&#x88C5;&#x7684;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x5230; <strong>router-outlet</strong> &#x4E0A;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x4E2A;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x4E0D;&#x662F;&#x4E2A;&#x65B0;&#x4E1C;&#x897F;&#x3002;</p>
<h2 id="articleHeader1">&#x5982;&#x4F55;&#x4F7F;&#x7528; Portal</h2>
<p><strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L32-L35" rel="nofollow noreferrer" target="_blank">Portal&lt;T&gt;</a></strong> &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x62BD;&#x8C61;&#x6CDB;&#x578B;&#x7C7B;&#xFF0C;&#x800C; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L80-L82" rel="nofollow noreferrer" target="_blank">ComponentPortal&lt;T&gt;</a></strong> &#x548C; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L108-L110" rel="nofollow noreferrer" target="_blank">TemplatePortal&lt;T&gt;</a></strong> &#x624D;&#x662F;&#x5305;&#x88C5;&#x7EC4;&#x4EF6;&#x6216;&#x6A21;&#x677F;&#x5BF9;&#x5E94;&#x7684; Portal &#x5177;&#x4F53;&#x7C7B;&#xFF0C;&#x67E5;&#x770B;&#x4E24;&#x4E2A;&#x7C7B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x4E3B;&#x8981;&#x4F9D;&#x8D56;&#xFF0C;&#x90FD;&#x57FA;&#x672C;&#x662F;&#x4F9D;&#x8D56;&#x4E8E;&#xFF1A;&#x8BE5;&#x7EC4;&#x4EF6;&#x6216;&#x6A21;&#x677F;&#x5BF9;&#x8C61;&#xFF1B;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5373;&#x6302;&#x8F7D;&#x70B9;&#xFF0C;&#x662F;&#x901A;&#x8FC7; <strong><a href="https://angular.io/api/core/ViewContainerRef" rel="nofollow noreferrer" target="_blank">ViewContainerRef</a></strong> &#x5305;&#x88C5;&#x7684;&#x5BF9;&#x8C61;&#xFF1B;&#x5982;&#x679C;&#x662F;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x8FD8;&#x5F97;&#x4F9D;&#x8D56; injector&#xFF0C;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#x5F97;&#x4F9D;&#x8D56; context &#x53D8;&#x91CF;&#x3002;&#x8FD9;&#x4E9B;&#x4F9D;&#x8D56;&#x5BF9;&#x8C61;&#x4E5F;&#x8FDB;&#x4E00;&#x6B65;&#x66B4;&#x9732;&#x4E86;&#x5176;&#x8BBE;&#x8BA1;&#x601D;&#x60F3;&#x3002;</p>
<p>&#x62BD;&#x8C61;&#x7C7B; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L165-L168" rel="nofollow noreferrer" target="_blank">BasePortalOutlet</a></strong> &#x662F; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L148-L160" rel="nofollow noreferrer" target="_blank">PortalOutlet</a></strong> &#x7684;&#x57FA;&#x672C;&#x5B9E;&#x73B0;&#xFF0C;&#x540C;&#x65F6;&#x5305;&#x542B;&#x4E86;&#x4E09;&#x4E2A;&#x91CD;&#x8981;&#x65B9;&#x6CD5;&#xFF1A;<strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L188-L209" rel="nofollow noreferrer" target="_blank">attach</a></strong> &#x8868;&#x793A;&#x628A; Portal &#x6302;&#x8F7D;&#x5230; PortalOutlet &#x4E0A;&#xFF0C;&#x5E76;&#x5B9A;&#x4E49;&#x4E86;&#x4E24;&#x4E2A;&#x62BD;&#x8C61;&#x65B9;&#x6CD5;&#xFF0C;&#x6765;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#x6302;&#x8F7D;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x8FD8;&#x662F;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="abstract attachComponentPortal&lt;T&gt;(portal: ComponentPortal&lt;T&gt;): ComponentRef&lt;T&gt;;
abstract attachTemplatePortal&lt;C&gt;(portal: TemplatePortal&lt;C&gt;): EmbeddedViewRef&lt;C&gt;;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code>abstract attachComponentPortal<span class="hljs-tag">&lt;<span class="hljs-name">T</span>&gt;</span>(portal: ComponentPortal<span class="hljs-tag">&lt;<span class="hljs-name">T</span>&gt;</span>): ComponentRef<span class="hljs-tag">&lt;<span class="hljs-name">T</span>&gt;</span>;
abstract attachTemplatePortal<span class="hljs-tag">&lt;<span class="hljs-name">C</span>&gt;</span>(portal: TemplatePortal<span class="hljs-tag">&lt;<span class="hljs-name">C</span>&gt;</span>): EmbeddedViewRef<span class="hljs-tag">&lt;<span class="hljs-name">C</span>&gt;</span>;</code></pre>
<p><strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L217-L223" rel="nofollow noreferrer" target="_blank">detach</a></strong> &#x8868;&#x793A;&#x4ECE; PortalOutlet &#x4E2D;&#x62C6;&#x5378;&#x51FA;&#x8BE5; Portal&#xFF0C;&#x800C; PortalOutlet &#x4E2D;&#x53EF;&#x4EE5;&#x6302;&#x8F7D;&#x591A;&#x4E2A; Portal&#xFF0C;<strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L227-L233" rel="nofollow noreferrer" target="_blank">dispose</a></strong> &#x8868;&#x793A;&#x6574;&#x4F53;&#x5E76;&#x6C38;&#x4E45;&#x9500;&#x6BC1; PortalOutlet&#x3002;&#x5176;&#x4E2D;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x7C7B; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L20-L23" rel="nofollow noreferrer" target="_blank">DomPortalOutlet</a></strong> &#x662F; <strong>BasePortalOutlet</strong> &#x7684;&#x5B50;&#x7C7B;&#xFF0C;&#x53EF;&#x4EE5;&#x5728; <strong>Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;</strong> &#x521B;&#x5EFA;&#x4E00;&#x4E2A; <strong>PortalOutlet</strong>&#xFF0C;&#x5E76;&#x628A; <strong>Portal</strong> &#x6302;&#x8F7D;&#x5230;&#x8BE5; <strong>PortalOutlet</strong> &#x4E0A;&#xFF0C;&#x6BD4;&#x5982;&#x5C06; <strong>body</strong> &#x6700;&#x540E;&#x5B50;&#x5143;&#x7D20; <strong>div</strong> &#x5305;&#x88C5;&#x4E3A;&#x4E00;&#x4E2A; PortalOutlet&#xFF0C;&#x7136;&#x540E;&#x5C06;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x6216;&#x6A21;&#x677F;&#x89C6;&#x56FE;&#x6302;&#x8F7D;&#x5230;&#x8BE5;&#x6302;&#x8F7D;&#x70B9;&#x4E0A;&#x3002;&#x8FD9;&#x91CC;&#x7684;&#x7684;&#x96BE;&#x70B9;&#x5C31;&#x662F;&#x5982;&#x679C;&#x8BE5;&#x6302;&#x8F7D;&#x70B9;&#x5728; <strong>Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;</strong>&#xFF0C;&#x90A3;&#x6302;&#x8F7D;&#x70B9;&#x5185;&#x7684; <strong>Portal</strong> &#x5982;&#x4F55;&#x4E0E; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5185;&#x7684;&#x7EC4;&#x4EF6;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002; <strong>DomPortalOutlet</strong> &#x8FD8;&#x5B9E;&#x73B0;&#x4E86;&#x4E0A;&#x9762;&#x7684;&#x4E24;&#x4E2A;&#x62BD;&#x8C61;&#x65B9;&#x6CD5;&#xFF1A;<strong>attachComponentPortal</strong> &#x548C; <strong>attachTemplatePortal</strong>&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4EE3;&#x7801;&#x7EC6;&#x8282;&#x611F;&#x5174;&#x8DA3;&#x53EF;&#x63A5;&#x7740;&#x770B;&#x4E0B;&#x6587;&#x3002;</p>
<p>&#x73B0;&#x5728;&#x5DF2;&#x7ECF;&#x77E5;&#x9053;&#x4E86; <strong>@angular/cdk/portal</strong> &#x4E2D;&#x6700;&#x91CD;&#x8981;&#x7684;&#x4E24;&#x4E2A;&#x6838;&#x5FC3;&#xFF0C;&#x5373; <strong>Portal</strong> &#x548C; <strong>PortalOutlet</strong>&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x5199;&#x4E00;&#x4E2A; demo &#x770B;&#x770B;&#x5982;&#x4F55;&#x4F7F;&#x7528; <strong>Portal</strong> &#x548C; <strong>PortalOutlet</strong> &#x6765;&#x5728; <strong>Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;</strong> &#x521B;&#x5EFA;&#x4E00;&#x4E2A; <strong>ComponentPortal</strong> &#x548C; <strong>TemplatePortal</strong>&#x3002;</p>
<p>Demo &#x5173;&#x952E;&#x529F;&#x80FD;&#x5305;&#x62EC;&#xFF1A;<strong>&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5185;</strong> &#x6302;&#x8F7D; TemplatePortal/ComponentPortal&#xFF1B;<strong>&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;</strong> &#x6302;&#x8F7D; TemplatePortal/ComponentPortal&#xFF1B;&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916; <strong>&#x5171;&#x4EAB;&#x6570;&#x636E;</strong>&#x3002;&#x63A5;&#x4E0B;&#x6765;&#x8BA9;&#x6211;&#x4EEC;&#x9010;&#x4E00;&#x5B9E;&#x73B0;&#x6BCF;&#x4E2A;&#x529F;&#x80FD;&#x70B9;&#x3002;</p>
<h3 id="articleHeader2">Angular &#x4E0A;&#x4E0B;&#x6587;&#x5185;&#x6302;&#x8F7D; Portal</h3>
<p>&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5185;&#x6302;&#x8F7D; Portal &#x6BD4;&#x8F83;&#x7B80;&#x5355;&#xFF0C;&#x9996;&#x5148;&#x9700;&#x8981;&#x505A;&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x5B9E;&#x4F8B;&#x5316;&#x51FA;&#x4E00;&#x4E2A;&#x6302;&#x8F7D;&#x5BB9;&#x5668; PortalOutlet&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5B9E;&#x4F8B;&#x5316; <strong>DomPortalOutlet</strong> &#x5F97;&#x5230;&#x8BE5;&#x6302;&#x8F7D;&#x5BB9;&#x5668;&#x3002;&#x67E5;&#x770B; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L24-L29" rel="nofollow noreferrer" target="_blank">DomPortalOutlet</a></strong> &#x7684;&#x6784;&#x9020;&#x4F9D;&#x8D56;&#x4E3B;&#x8981;&#x5305;&#x62EC;&#xFF1A;&#x6302;&#x8F7D;&#x7684;&#x5143;&#x7D20;&#x8282;&#x70B9; Element&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <strong>@ViewChild</strong> DOM &#x67E5;&#x8BE2;&#x5F97;&#x5230;&#x8BE5;&#x7EC4;&#x4EF6;&#x5185;&#x7684;&#x67D0;&#x4E00;&#x4E2A; DOM &#x5143;&#x7D20;&#xFF1B;&#x7EC4;&#x4EF6;&#x5DE5;&#x5382;&#x89E3;&#x6790;&#x5668; ComponentFactoryResolver&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x6CE8;&#x5165;&#x62FF;&#x5230;&#xFF0C;&#x8BE5;&#x89E3;&#x6790;&#x5668;&#x662F;&#x4E3A;&#x4E86;&#x5F53; Portal &#x662F; ComponentPortal &#x65F6;&#x89E3;&#x6790;&#x51FA;&#x5BF9;&#x5E94;&#x7684; Component&#xFF1B;&#x5F53;&#x524D;&#x7A0B;&#x5E8F;&#x5BF9;&#x8C61; ApplicationRef&#xFF0C;&#x4E3B;&#x8981;&#x7528;&#x6765;&#x6302;&#x8F7D;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF1B;&#x6CE8;&#x5165;&#x5668; Injector&#xFF0C;&#x8FD9;&#x4E2A;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;&#x6302;&#x8F7D;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF0C;&#x53EF;&#x4EE5;&#x7528; Injector &#x6765;&#x548C;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002;</p>
<p>&#x7B2C;&#x4E8C;&#x6B65;&#x5C31;&#x662F;&#x4F7F;&#x7528; ComponentPortal &#x548C; TemplatePortal &#x5305;&#x88C5;&#x5BF9;&#x5E94;&#x7684;&#x7EC4;&#x4EF6;&#x548C;&#x6A21;&#x677F;&#xFF0C;&#x9700;&#x8981;&#x7559;&#x610F;&#x7684;&#x662F; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L120-L124" rel="nofollow noreferrer" target="_blank">TemplatePortal</a></strong> &#x8FD8;&#x5FC5;&#x987B;&#x4F9D;&#x8D56; ViewContainerRef &#x5BF9;&#x8C61;&#x6765;&#x8C03;&#x7528; <strong>createEmbeddedView()</strong> &#x6765;&#x521B;&#x5EFA;&#x5D4C;&#x5165;&#x89C6;&#x56FE;&#x3002;</p>
<p>&#x7B2C;&#x4E09;&#x6B65;&#x5C31;&#x662F;&#x8C03;&#x7528; PortalOutlet &#x7684; <strong>attach()</strong> &#x65B9;&#x6CD5;&#x6302;&#x8F7D; Portal&#xFF0C;&#x8FDB;&#x800C;&#x6839;&#x636E; Portal &#x662F; ComponentPortal &#x8FD8;&#x662F; TemplatePortal &#x5206;&#x522B;&#x8C03;&#x7528; <strong>attachComponentPortal()</strong> &#x548C; <strong>attachTemplatePortal()</strong> &#x65B9;&#x6CD5;&#x3002;</p>
<p>&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x4E09;&#x6B65;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#x8BE5;&#x5982;&#x4F55;&#x8BBE;&#x8BA1;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: &apos;portal-dialog&apos;,
  template: `
    &lt;p&gt;Component Portal&lt;p&gt;
  `
})
export class DialogComponent {}

@Component({
  selector: &apos;app-root&apos;,
  template: `
    &lt;h2&gt;Open a ComponentPortal Inside Angular Context&lt;/h2&gt;
    &lt;button (click)=&quot;openComponentPortalInsideAngularContext()&quot;&gt;Open a ComponentPortal Inside Angular Context&lt;/button&gt;
    &lt;div #_openComponentPortalInsideAngularContext&gt;&lt;/div&gt;

    &lt;h2&gt;Open a TemplatePortal Inside Angular Context&lt;/h2&gt;
    &lt;button (click)=&quot;openTemplatePortalInsideAngularContext()&quot;&gt;Open a TemplatePortal Inside Angular Context&lt;/button&gt;
    &lt;div #_openTemplatePortalInsideAngularContext&gt;&lt;/div&gt;
    &lt;ng-template #_templatePortalInsideAngularContext&gt;
      &lt;p&gt;Template Portal Inside Angular Context&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export class AppComponent {
  private _appRef: ApplicationRef;

  constructor(private _componentFactoryResolver: ComponentFactoryResolver,
              private _injector: Injector,
              @Inject(DOCUMENT) private _document) {}

  @ViewChild(&apos;_openComponentPortalInsideAngularContext&apos;, {read: ViewContainerRef}) _openComponentPortalInsideAngularContext: ViewContainerRef;
  openComponentPortalInsideAngularContext() {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(this._openComponentPortalInsideAngularContext.element.nativeElement, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a ComponentPortal&lt;DialogComponent&gt;
    const componentPortal = new ComponentPortal(DialogComponent);
    // attach a ComponentPortal to a DomPortalOutlet
    portalOutlet.attach(componentPortal);
  }


  @ViewChild(&apos;_templatePortalInsideAngularContext&apos;, {read: TemplateRef}) _templatePortalInsideAngularContext: TemplateRef&lt;any&gt;;
  @ViewChild(&apos;_openTemplatePortalInsideAngularContext&apos;, {read: ViewContainerRef}) _openTemplatePortalInsideAngularContext: ViewContainerRef;
  openTemplatePortalInsideAngularContext() {
    if (!this._appRef) {
      this._appRef = this._injector.get(ApplicationRef);
    }

    // instantiate a DomPortalOutlet
    const portalOutlet = new DomPortalOutlet(this._openTemplatePortalInsideAngularContext.element.nativeElement, this._componentFactoryResolver, this._appRef, this._injector);
    // instantiate a TemplatePortal&lt;&gt;
    const templatePortal = new TemplatePortal(this._templatePortalInsideAngularContext, this._openTemplatePortalInsideAngularContext);
    // attach a TemplatePortal to a DomPortalOutlet
    portalOutlet.attach(templatePortal);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;portal-dialog&apos;</span>,
  template: `
    &lt;p&gt;Component Portal&lt;p&gt;
  `
})</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DialogComponent</span> </span>{}

<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;app-root&apos;</span>,
  template: `
    &lt;h2&gt;Open a ComponentPortal Inside Angular Context&lt;/h2&gt;
    &lt;button (click)</span>=<span class="hljs-string">&quot;openComponentPortalInsideAngularContext()&quot;</span>&gt;Open a ComponentPortal Inside Angular Context&lt;/button&gt;
    &lt;div #_openComponentPortalInsideAngularContext&gt;&lt;/div&gt;

    &lt;h2&gt;Open a TemplatePortal Inside Angular Context&lt;/h2&gt;
    &lt;button (click)=<span class="hljs-string">&quot;openTemplatePortalInsideAngularContext()&quot;</span>&gt;Open a TemplatePortal Inside Angular Context&lt;/button&gt;
    &lt;div #_openTemplatePortalInsideAngularContext&gt;&lt;/div&gt;
    &lt;ng-template #_templatePortalInsideAngularContext&gt;
      &lt;p&gt;Template Portal Inside Angular Context&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> </span>{
  <span class="hljs-keyword">private</span> _appRef: ApplicationRef;

  <span class="hljs-keyword">constructor</span>(<span class="hljs-keyword">private</span> _componentFactoryResolver: ComponentFactoryResolver,
              <span class="hljs-keyword">private</span> _injector: Injector,
              <span class="hljs-meta">@Inject(DOCUMENT)</span> <span class="hljs-keyword">private</span> _document) {}

  <span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_openComponentPortalInsideAngularContext&apos;</span>, {read: ViewContainerRef})</span> _openComponentPortalInsideAngularContext: ViewContainerRef;
  openComponentPortalInsideAngularContext() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
      <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
    }

    <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
    const portalOutlet = new DomPortalOutlet(<span class="hljs-keyword">this</span>._openComponentPortalInsideAngularContext.element.nativeElement, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, <span class="hljs-keyword">this</span>._injector);
    <span class="hljs-comment">// instantiate a ComponentPortal&lt;DialogComponent&gt;</span>
    const componentPortal = new ComponentPortal(DialogComponent);
    <span class="hljs-comment">// attach a ComponentPortal to a DomPortalOutlet</span>
    portalOutlet.attach(componentPortal);
  }


  <span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_templatePortalInsideAngularContext&apos;</span>, {read: TemplateRef})</span> _templatePortalInsideAngularContext: TemplateRef&lt;any&gt;;
  <span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_openTemplatePortalInsideAngularContext&apos;</span>, {read: ViewContainerRef})</span> _openTemplatePortalInsideAngularContext: ViewContainerRef;
  openTemplatePortalInsideAngularContext() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
      <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
    }

    <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
    const portalOutlet = new DomPortalOutlet(<span class="hljs-keyword">this</span>._openTemplatePortalInsideAngularContext.element.nativeElement, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, <span class="hljs-keyword">this</span>._injector);
    <span class="hljs-comment">// instantiate a TemplatePortal&lt;&gt;</span>
    const templatePortal = new TemplatePortal(<span class="hljs-keyword">this</span>._templatePortalInsideAngularContext, <span class="hljs-keyword">this</span>._openTemplatePortalInsideAngularContext);
    <span class="hljs-comment">// attach a TemplatePortal to a DomPortalOutlet</span>
    portalOutlet.attach(templatePortal);
  }
}</code></pre>
<p>&#x67E5;&#x9605;&#x4E0A;&#x9762;&#x8BBE;&#x8BA1;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x53D1;&#x73B0;&#x6CA1;&#x6709;&#x4EC0;&#x4E48;&#x592A;&#x591A;&#x65B0;&#x7684;&#x4E1C;&#x897F;&#x3002;&#x901A;&#x8FC7; <strong>@ViewChild</strong> DOM &#x67E5;&#x8BE2;&#x5230;&#x6A21;&#x677F;&#x5BF9;&#x8C61;&#x548C;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5BF9;&#x8C61;&#xFF0C;&#x6CE8;&#x610F;&#x8BE5;&#x88C5;&#x9970;&#x5668;&#x7684;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570; <strong><a href="https://github.com/angular/angular/blob/master/packages/core/src/metadata/di.ts#L343-L352" rel="nofollow noreferrer" target="_blank">{read:}</a></strong>&#xFF0C;&#x7528;&#x6765;&#x6307;&#x5B9A;&#x5177;&#x4F53;&#x67E5;&#x8BE2;&#x54EA;&#x79CD;&#x6807;&#x8BC6;&#x5982; <strong>TemplateRef</strong> &#x8FD8;&#x662F; <strong>ViewContainerRef</strong>&#x3002;&#x5F53;&#x7136;&#xFF0C;&#x6700;&#x91CD;&#x8981;&#x7684;&#x6280;&#x672F;&#x70B9;&#x8FD8;&#x662F; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L188-L210" rel="nofollow noreferrer" target="_blank">attach()</a></strong> &#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x6E90;&#x7801;&#x89E3;&#x6790;&#x53EF;&#x4EE5;&#x63A5;&#x7740;&#x770B;&#x4E0B;&#x6587;&#x3002;</p>
<p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x89C1; <strong><a href="https://stackblitz.com/edit/angular-cdk-portal-lx1036" rel="nofollow noreferrer" target="_blank">demo</a></strong>&#x3002;</p>
<h3 id="articleHeader3">Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;&#x6302;&#x8F7D; Portal</h3>
<p>&#x4ECE;&#x4E0A;&#x6587;&#x53EF;&#x77E5;&#x9053;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x8981;&#x628A; Portal &#x6302;&#x8F7D;&#x5230; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;&#xFF0C;&#x5173;&#x952E;&#x662F; PortalOutlet &#x7684;&#x4F9D;&#x8D56; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L26" rel="nofollow noreferrer" target="_blank">outletElement</a></strong> &#x5F97;&#x5904;&#x4E8E; Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;&#x3002;&#x8FD9;&#x4E2A; HTMLElement &#x53EF;&#x4EE5;&#x901A;&#x8FC7; <strong>_document.body.appendChild(element)</strong> &#x6765;&#x624B;&#x52A8;&#x521B;&#x5EFA;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let container = this._document.createElement(&apos;div&apos;);
container.classList.add(&apos;component-portal&apos;);
container = this._document.body.appendChild(container);" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs axapta"><code>let <span class="hljs-keyword">container</span> = <span class="hljs-keyword">this</span>._document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
<span class="hljs-keyword">container</span>.classList.add(<span class="hljs-string">&apos;component-portal&apos;</span>);
<span class="hljs-keyword">container</span> = <span class="hljs-keyword">this</span>._document.body.appendChild(<span class="hljs-keyword">container</span>);</code></pre>
<p>&#x6709;&#x4E86;&#x5904;&#x4E8E; Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;&#x7684;&#x4E00;&#x4E2A; Element&#xFF0C;&#x540E;&#x9762;&#x7684;&#x8BBE;&#x8BA1;&#x6B65;&#x9AA4;&#x5C31;&#x548C;&#x4E0A;&#x6587;&#x5B8C;&#x5168;&#x4E00;&#x6837;&#xFF1A;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x5904;&#x4E8E; Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;&#x7684; PortalOutlet&#xFF0C;&#x7136;&#x540E;&#x6302;&#x8F7D; ComponentPortal &#x548C; TemplatePortal&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@Component({
  selector: &apos;app-root&apos;,
  template: `
    &lt;h2&gt;Open a ComponentPortal Outside Angular Context&lt;/h2&gt;
    &lt;button (click)=&quot;openComponentPortalOutSideAngularContext()&quot;&gt;Open a ComponentPortal Outside Angular Context&lt;/button&gt;
    
    &lt;h2&gt;Open a TemplatePortal Outside Angular Context&lt;/h2&gt;
    &lt;button (click)=&quot;openTemplatePortalOutSideAngularContext()&quot;&gt;Open a TemplatePortal Outside Angular Context&lt;/button&gt;
    &lt;ng-template #_templatePortalOutsideAngularContext&gt;
      &lt;p&gt;Template Portal Outside Angular Context&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export class AppComponent {
    ...
    
openComponentPortalOutSideAngularContext() {
  let container = this._document.createElement(&apos;div&apos;);
  container.classList.add(&apos;component-portal&apos;);
  container = this._document.body.appendChild(container);

  if (!this._appRef) {
    this._appRef = this._injector.get(ApplicationRef);
  }

  // instantiate a DomPortalOutlet
  const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
  // instantiate a ComponentPortal&lt;DialogComponent&gt;
  const componentPortal = new ComponentPortal(DialogComponent);
  // attach a ComponentPortal to a DomPortalOutlet
  portalOutlet.attach(componentPortal);
}


@ViewChild(&apos;_templatePortalOutsideAngularContext&apos;, {read: TemplateRef}) _template: TemplateRef&lt;any&gt;;
@ViewChild(&apos;_templatePortalOutsideAngularContext&apos;, {read: ViewContainerRef}) _viewContainerRef: ViewContainerRef;
openTemplatePortalOutSideAngularContext() {
  let container = this._document.createElement(&apos;div&apos;);
  container.classList.add(&apos;template-portal&apos;);
  container = this._document.body.appendChild(container);

  if (!this._appRef) {
    this._appRef = this._injector.get(ApplicationRef);
  }

  // instantiate a DomPortalOutlet
  const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
  // instantiate a TemplatePortal&lt;&gt;
  const templatePortal = new TemplatePortal(this._template, this._viewContainerRef);
  // attach a TemplatePortal to a DomPortalOutlet
  portalOutlet.attach(templatePortal);
}
    ..." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;app-root&apos;</span>,
  template: `
    &lt;h2&gt;Open a ComponentPortal Outside Angular Context&lt;/h2&gt;
    &lt;button (click)</span>=<span class="hljs-string">&quot;openComponentPortalOutSideAngularContext()&quot;</span>&gt;Open a ComponentPortal Outside Angular Context&lt;/button&gt;
    
    &lt;h2&gt;Open a TemplatePortal Outside Angular Context&lt;/h2&gt;
    &lt;button (click)=<span class="hljs-string">&quot;openTemplatePortalOutSideAngularContext()&quot;</span>&gt;Open a TemplatePortal Outside Angular Context&lt;/button&gt;
    &lt;ng-template #_templatePortalOutsideAngularContext&gt;
      &lt;p&gt;Template Portal Outside Angular Context&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> </span>{
    ...
    
openComponentPortalOutSideAngularContext() {
  let container = <span class="hljs-keyword">this</span>._document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  container.classList.add(<span class="hljs-string">&apos;component-portal&apos;</span>);
  container = <span class="hljs-keyword">this</span>._document.body.appendChild(container);

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
    <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
  }

  <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
  const portalOutlet = new DomPortalOutlet(container, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, <span class="hljs-keyword">this</span>._injector);
  <span class="hljs-comment">// instantiate a ComponentPortal&lt;DialogComponent&gt;</span>
  const componentPortal = new ComponentPortal(DialogComponent);
  <span class="hljs-comment">// attach a ComponentPortal to a DomPortalOutlet</span>
  portalOutlet.attach(componentPortal);
}


<span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_templatePortalOutsideAngularContext&apos;</span>, {read: TemplateRef})</span> _template: TemplateRef&lt;any&gt;;
<span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_templatePortalOutsideAngularContext&apos;</span>, {read: ViewContainerRef})</span> _viewContainerRef: ViewContainerRef;
openTemplatePortalOutSideAngularContext() {
  let container = <span class="hljs-keyword">this</span>._document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  container.classList.add(<span class="hljs-string">&apos;template-portal&apos;</span>);
  container = <span class="hljs-keyword">this</span>._document.body.appendChild(container);

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
    <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
  }

  <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
  const portalOutlet = new DomPortalOutlet(container, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, <span class="hljs-keyword">this</span>._injector);
  <span class="hljs-comment">// instantiate a TemplatePortal&lt;&gt;</span>
  const templatePortal = new TemplatePortal(<span class="hljs-keyword">this</span>._template, <span class="hljs-keyword">this</span>._viewContainerRef);
  <span class="hljs-comment">// attach a TemplatePortal to a DomPortalOutlet</span>
  portalOutlet.attach(templatePortal);
}
    ...</code></pre>
<p>&#x901A;&#x8FC7;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x5728; Angular &#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x8FD9;&#x4E2A;&#x6280;&#x672F;&#x5BF9;&#x521B;&#x5EFA; <strong>Dialog</strong> &#x4F1A;&#x975E;&#x5E38;&#x6709;&#x7528;&#x3002;</p>
<p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x89C1; <strong><a href="https://stackblitz.com/edit/angular-cdk-portal-lx1036" rel="nofollow noreferrer" target="_blank">demo</a></strong>&#x3002;</p>
<h3 id="articleHeader4">Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;&#x5171;&#x4EAB;&#x6570;&#x636E;</h3>
<p>&#x6700;&#x96BE;&#x70B9;&#x8FD8;&#x662F;&#x5982;&#x4F55;&#x4E0E;&#x5904;&#x4E8E; Angular &#x4E0A;&#x4E0B;&#x6587;&#x5916;&#x7684; Portal &#x5171;&#x4EAB;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x9700;&#x8981;&#x6839;&#x636E; ComponentPortal &#x8FD8;&#x662F; TemplatePortal &#x5206;&#x522B;&#x5904;&#x7406;&#x3002;&#x5176;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x662F; TemplatePortal&#xFF0C;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x5374;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x6CE8;&#x610F;&#x89C2;&#x5BDF; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L120" rel="nofollow noreferrer" target="_blank">TemplatePortal</a></strong> &#x7684;&#x6784;&#x9020;&#x4F9D;&#x8D56;&#xFF0C;&#x53D1;&#x73B0;&#x5B58;&#x5728;&#x7B2C;&#x4E09;&#x4E2A;&#x53EF;&#x9009;&#x53C2;&#x6570; <strong>context</strong>&#xFF0C;&#x96BE;&#x9053;&#x662F;&#x7528;&#x6765;&#x5411; TemplatePortal &#x91CC;&#x4F20;&#x9001;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x7684;&#xFF1F;&#x6CA1;&#x9519;&#xFF0C;&#x7684;&#x786E;&#x5982;&#x6B64;&#x3002;&#x53EF;&#x4EE5;&#x67E5;&#x770B; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L75" rel="nofollow noreferrer" target="_blank">DomPortalOutlet.attachTemplatePortal() &#x7684; 75 &#x884C;</a></strong>&#xFF0C;&#x5C31;&#x662F;&#x628A; <strong>portal.context</strong> &#x4F20;&#x7ED9;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x5185;&#x4F5C;&#x4E3A;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x4F7F;&#x7528;&#xFF0C;&#x65E2;&#x7136;&#x5982;&#x6B64;&#xFF0C;TemplatePortal &#x5171;&#x4EAB;&#x6570;&#x636E;&#x95EE;&#x9898;&#x5C31;&#x5F88;&#x597D;&#x89E3;&#x51B3;&#x4E86;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: &apos;app-root&apos;,
  template: `
    &lt;h2&gt;Open a TemplatePortal Outside Angular Context with Sharing Data&lt;/h2&gt;
    &lt;button (click)=&quot;openTemplatePortalOutSideAngularContextWithSharingData()&quot;&gt;Open a TemplatePortal Outside Angular Context with Sharing Data&lt;/button&gt;
    &lt;input [value]=&quot;sharingTemplateData&quot; (change)=&quot;setTemplateSharingData($event.target.value)&quot;/&gt;
    &lt;ng-template #_templatePortalOutsideAngularContextWithSharingData let-name=&quot;name&quot;&gt;
      &lt;p&gt;Template Portal Outside Angular Context, the Sharing Data is "{{"name"}}"&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export class AppComponent {
sharingTemplateData: string = &apos;lx1035&apos;;
@ViewChild(&apos;_templatePortalOutsideAngularContextWithSharingData&apos;, {read: TemplateRef}) _templateWithSharingData: TemplateRef&lt;any&gt;;
@ViewChild(&apos;_templatePortalOutsideAngularContextWithSharingData&apos;, {read: ViewContainerRef}) _viewContainerRefWithSharingData: ViewContainerRef;
setTemplateSharingData(value) {
  this.sharingTemplateData = value;
}
openTemplatePortalOutSideAngularContextWithSharingData() {
  let container = this._document.createElement(&apos;div&apos;);
  container.classList.add(&apos;template-portal-with-sharing-data&apos;);
  container = this._document.body.appendChild(container);

  if (!this._appRef) {
    this._appRef = this._injector.get(ApplicationRef);
  }

  // instantiate a DomPortalOutlet
  const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, this._injector);
  // instantiate a TemplatePortal&lt;DialogComponentWithSharingData&gt;
  const templatePortal = new TemplatePortal(this._templateWithSharingData, this._viewContainerRefWithSharingData, {name: this.sharingTemplateData}); // &lt;--- key point
  // attach a TemplatePortal to a DomPortalOutlet
  portalOutlet.attach(templatePortal);
}
    ..." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;app-root&apos;</span>,
  template: `
    &lt;h2&gt;Open a TemplatePortal Outside Angular Context with Sharing Data&lt;/h2&gt;
    &lt;button (click)</span>=<span class="hljs-string">&quot;openTemplatePortalOutSideAngularContextWithSharingData()&quot;</span>&gt;Open a TemplatePortal Outside Angular Context with Sharing Data&lt;/button&gt;
    &lt;input [value]=<span class="hljs-string">&quot;sharingTemplateData&quot;</span> (change)=<span class="hljs-string">&quot;setTemplateSharingData(<span class="hljs-subst">$event</span>.target.value)&quot;</span>/&gt;
    &lt;ng-template #_templatePortalOutsideAngularContextWithSharingData let-name=<span class="hljs-string">&quot;name&quot;</span>&gt;
      &lt;p&gt;Template Portal Outside Angular Context, the Sharing Data <span class="hljs-keyword">is</span> "{{"name"}}"&lt;/p&gt;
    &lt;/ng-template&gt;
  `,
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> </span>{
sharingTemplateData: string = <span class="hljs-string">&apos;lx1035&apos;</span>;
<span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_templatePortalOutsideAngularContextWithSharingData&apos;</span>, {read: TemplateRef})</span> _templateWithSharingData: TemplateRef&lt;any&gt;;
<span class="hljs-meta">@ViewChild(<span class="hljs-meta-string">&apos;_templatePortalOutsideAngularContextWithSharingData&apos;</span>, {read: ViewContainerRef})</span> _viewContainerRefWithSharingData: ViewContainerRef;
setTemplateSharingData(value) {
  <span class="hljs-keyword">this</span>.sharingTemplateData = value;
}
openTemplatePortalOutSideAngularContextWithSharingData() {
  let container = <span class="hljs-keyword">this</span>._document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  container.classList.add(<span class="hljs-string">&apos;template-portal-with-sharing-data&apos;</span>);
  container = <span class="hljs-keyword">this</span>._document.body.appendChild(container);

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
    <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
  }

  <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
  const portalOutlet = new DomPortalOutlet(container, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, <span class="hljs-keyword">this</span>._injector);
  <span class="hljs-comment">// instantiate a TemplatePortal&lt;DialogComponentWithSharingData&gt;</span>
  const templatePortal = new TemplatePortal(<span class="hljs-keyword">this</span>._templateWithSharingData, <span class="hljs-keyword">this</span>._viewContainerRefWithSharingData, {name: <span class="hljs-keyword">this</span>.sharingTemplateData}); <span class="hljs-comment">// &lt;--- key point</span>
  <span class="hljs-comment">// attach a TemplatePortal to a DomPortalOutlet</span>
  portalOutlet.attach(templatePortal);
}
    ...</code></pre>
<p>&#x90A3; ComponentPortal &#x5462;&#xFF1F;&#x67E5;&#x770B; ComponentPortal &#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x6784;&#x9020;&#x4F9D;&#x8D56; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L99" rel="nofollow noreferrer" target="_blank">Injector</a></strong>&#xFF0C;&#x5B83;&#x4F9D;&#x8D56;&#x7684;&#x662F;&#x6CE8;&#x5165;&#x5668;&#x3002;TemplatePortal &#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570; <strong>context</strong> &#x89E3;&#x51B3;&#x4E86;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x95EE;&#x9898;&#xFF0C;&#x90A3; ComponentPortal &#x53EF;&#x4E0D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x5668;&#x89E3;&#x51B3;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x95EE;&#x9898;&#xFF1F;&#x6CA1;&#x9519;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x3002;&#x53EF;&#x4EE5;&#x6784;&#x9020;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x7684; Injector&#xFF0C;&#x628A;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x5230; Injector &#x91CC;&#xFF0C;&#x7136;&#x540E; ComponentPortal &#x4ECE; Injector &#x4E2D;&#x53D6;&#x51FA;&#x8BE5;&#x5171;&#x4EAB;&#x6570;&#x636E;&#x3002;&#x67E5;&#x770B; Portal &#x7684;&#x6E90;&#x7801;&#x5305;&#xFF0C;&#x5B98;&#x65B9;&#x8FD8;&#x5F88;&#x4EBA;&#x6027;&#x7684;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal-injector.ts#L12-L16" rel="nofollow noreferrer" target="_blank">PortalInjector</a></strong> &#x7C7B;&#x4F9B;&#x5F00;&#x53D1;&#x8005;&#x5B9E;&#x4F8B;&#x5316;&#x4E00;&#x4E2A;&#x81EA;&#x5B9A;&#x4E49;&#x6CE8;&#x5165;&#x5668;&#x3002;&#x73B0;&#x5728;&#x601D;&#x8DEF;&#x5DF2;&#x7ECF;&#x6709;&#x4E86;&#xFF0C;&#x770B;&#x770B;&#x4EE3;&#x7801;&#x5177;&#x4F53;&#x5B9E;&#x73B0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let DATA = new InjectionToken&lt;any&gt;(&apos;Sharing Data with Component Portal&apos;);

@Component({
  selector: &apos;portal-dialog-sharing-data&apos;,
  template: `
    &lt;p&gt;Component Portal Sharing Data is: "{{"data"}}"&lt;p&gt;
  `
})
export class DialogComponentWithSharingData {
  constructor(@Inject(DATA) public data: any) {} // &lt;--- key point
}

@Component({
  selector: &apos;app-root&apos;,
  template: `
    &lt;h2&gt;Open a ComponentPortal Outside Angular Context with Sharing Data&lt;/h2&gt;
    &lt;button (click)=&quot;openComponentPortalOutSideAngularContextWithSharingData()&quot;&gt;Open a ComponentPortal Outside Angular Context with Sharing Data&lt;/button&gt;
    &lt;input [value]=&quot;sharingComponentData&quot; (change)=&quot;setComponentSharingData($event.target.value)&quot;/&gt;
  `,
})
export class AppComponent {
    ...
    
sharingComponentData: string = &apos;lx1036&apos;;
setComponentSharingData(value) {
  this.sharingComponentData = value;
}
openComponentPortalOutSideAngularContextWithSharingData() {
  let container = this._document.createElement(&apos;div&apos;);
  container.classList.add(&apos;component-portal-with-sharing-data&apos;);
  container = this._document.body.appendChild(container);

  if (!this._appRef) {
    this._appRef = this._injector.get(ApplicationRef);
  }

  // Sharing data by Injector(Dependency Injection)
  const map = new WeakMap();
  map.set(DATA, this.sharingComponentData); // &lt;--- key point
  const injector = new PortalInjector(this._injector, map);

  // instantiate a DomPortalOutlet
  const portalOutlet = new DomPortalOutlet(container, this._componentFactoryResolver, this._appRef, injector); // &lt;--- key point
  // instantiate a ComponentPortal&lt;DialogComponentWithSharingData&gt;
  const componentPortal = new ComponentPortal(DialogComponentWithSharingData);
  // attach a ComponentPortal to a DomPortalOutlet
  portalOutlet.attach(componentPortal);
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>let DATA = new InjectionToken&lt;any&gt;(<span class="hljs-string">&apos;Sharing Data with Component Portal&apos;</span>);

<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;portal-dialog-sharing-data&apos;</span>,
  template: `
    &lt;p&gt;Component Portal Sharing Data is: "{{"data"}}"&lt;p&gt;
  `
})</span>
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DialogComponentWithSharingData</span> </span>{
  <span class="hljs-keyword">constructor</span>(<span class="hljs-meta">@Inject(DATA)</span> <span class="hljs-keyword">public</span> <span class="hljs-keyword">data</span>: any) {} <span class="hljs-comment">// &lt;--- key point</span>
}

<span class="hljs-meta">@Component({
  selector: <span class="hljs-meta-string">&apos;app-root&apos;</span>,
  template: `
    &lt;h2&gt;Open a ComponentPortal Outside Angular Context with Sharing Data&lt;/h2&gt;
    &lt;button (click)</span>=<span class="hljs-string">&quot;openComponentPortalOutSideAngularContextWithSharingData()&quot;</span>&gt;Open a ComponentPortal Outside Angular Context with Sharing Data&lt;/button&gt;
    &lt;input [value]=<span class="hljs-string">&quot;sharingComponentData&quot;</span> (change)=<span class="hljs-string">&quot;setComponentSharingData(<span class="hljs-subst">$event</span>.target.value)&quot;</span>/&gt;
  `,
})
export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AppComponent</span> </span>{
    ...
    
sharingComponentData: string = <span class="hljs-string">&apos;lx1036&apos;</span>;
setComponentSharingData(value) {
  <span class="hljs-keyword">this</span>.sharingComponentData = value;
}
openComponentPortalOutSideAngularContextWithSharingData() {
  let container = <span class="hljs-keyword">this</span>._document.createElement(<span class="hljs-string">&apos;div&apos;</span>);
  container.classList.add(<span class="hljs-string">&apos;component-portal-with-sharing-data&apos;</span>);
  container = <span class="hljs-keyword">this</span>._document.body.appendChild(container);

  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._appRef) {
    <span class="hljs-keyword">this</span>._appRef = <span class="hljs-keyword">this</span>._injector.<span class="hljs-keyword">get</span>(ApplicationRef);
  }

  <span class="hljs-comment">// Sharing data by Injector(Dependency Injection)</span>
  const map = new WeakMap();
  map.<span class="hljs-keyword">set</span>(DATA, <span class="hljs-keyword">this</span>.sharingComponentData); <span class="hljs-comment">// &lt;--- key point</span>
  const injector = new PortalInjector(<span class="hljs-keyword">this</span>._injector, map);

  <span class="hljs-comment">// instantiate a DomPortalOutlet</span>
  const portalOutlet = new DomPortalOutlet(container, <span class="hljs-keyword">this</span>._componentFactoryResolver, <span class="hljs-keyword">this</span>._appRef, injector); <span class="hljs-comment">// &lt;--- key point</span>
  <span class="hljs-comment">// instantiate a ComponentPortal&lt;DialogComponentWithSharingData&gt;</span>
  const componentPortal = new ComponentPortal(DialogComponentWithSharingData);
  <span class="hljs-comment">// attach a ComponentPortal to a DomPortalOutlet</span>
  portalOutlet.attach(componentPortal);
}
</code></pre>
<p>&#x901A;&#x8FC7; Injector &#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0; ComponentPortal &#x4E0E; AppComponent &#x5171;&#x4EAB;&#x6570;&#x636E;&#x4E86;&#xFF0C;&#x8BE5;&#x6280;&#x672F;&#x5BF9;&#x4E8E; Dialog &#x5B9E;&#x73B0;&#x5C24;&#x5176;&#x91CD;&#x8981;&#xFF0C;&#x8BBE;&#x60F3;&#x5BF9;&#x4E8E; Dialog &#x5F39;&#x51FA;&#x6846;&#xFF0C;&#x9700;&#x8981;&#x5728; Dialog &#x4E2D;&#x5C55;&#x793A;&#x6765;&#x81EA;&#x4E8E;&#x5916;&#x90E8;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#xFF0C;&#x540C;&#x65F6; Dialog &#x8FD8;&#x9700;&#x8981;&#x628A;&#x6570;&#x636E;&#x4F20;&#x56DE;&#x7ED9;&#x5916;&#x90E8;&#x7EC4;&#x4EF6;&#x3002;Angular Material &#x5B98;&#x65B9;&#x5C31;&#x5728; <strong>@angular/cdk/portal</strong> &#x57FA;&#x7840;&#x4E0A;&#x6784;&#x9020;&#x4E00;&#x4E2A; <strong>@angular/cdk/overlay</strong> &#x5305;&#xFF0C;&#x4E13;&#x95E8;&#x5904;&#x7406;&#x7C7B;&#x4F3C;&#x8986;&#x76D6;&#x5C42;&#x7EC4;&#x4EF6;&#x7684;&#x5171;&#x540C;&#x95EE;&#x9898;&#xFF0C;&#x8FD9;&#x4E9B;&#x7C7B;&#x4F3C;&#x8986;&#x76D6;&#x5C42;&#x7EC4;&#x4EF6;&#x5982; <strong>Dialog, Tooltip, SnackBar &#x7B49;&#x7B49;</strong>&#x3002;</p>
<p>&#x5B8C;&#x6574;&#x4EE3;&#x7801;&#x53EF;&#x89C1; <strong><a href="https://stackblitz.com/edit/angular-cdk-portal-lx1036" rel="nofollow noreferrer" target="_blank">demo</a></strong>&#x3002;</p>
<h2 id="articleHeader5">&#x89E3;&#x6790; attach() &#x6E90;&#x7801;</h2>
<p>&#x4E0D;&#x7BA1;&#x662F; ComponentPortal &#x8FD8;&#x662F; TemplatePortal&#xFF0C;PortalOutlet &#x90FD;&#x4F1A;&#x8C03;&#x7528; <strong>attach()</strong> &#x65B9;&#x6CD5;&#x628A; Portal &#x6302;&#x8F7D;&#x8FDB;&#x6765;&#xFF0C;&#x5177;&#x4F53;&#x6302;&#x8F7D;&#x8FC7;&#x7A0B;&#x662F;&#x600E;&#x6837;&#x7684;&#xFF1F;&#x67E5;&#x770B; <strong>BasePortalOutlet</strong> &#x7684; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal.ts#L39-L49" rel="nofollow noreferrer" target="_blank">attach()</a></strong> &#x7684;&#x6E90;&#x7801;&#x5B9E;&#x73B0;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** Attaches a portal. */
attach(portal: Portal&lt;any&gt;): any {
    ...
    
    if (portal instanceof ComponentPortal) {
          this._attachedPortal = portal;
          return this.attachComponentPortal(portal);
    } else if (portal instanceof TemplatePortal) {
          this._attachedPortal = portal;
          return this.attachTemplatePortal(portal);
    }

    ...
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">/** Attaches a portal. */</span>
attach(<span class="hljs-keyword">portal</span>: <span class="hljs-keyword">Portal</span>&lt;any&gt;): any {
    <span class="hljs-params">...</span>
    
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">portal</span> instanceof ComponentPortal) {
          this._attachedPortal = <span class="hljs-keyword">portal</span>;
          <span class="hljs-keyword">return</span> this.attachComponentPortal(<span class="hljs-keyword">portal</span>);
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">portal</span> instanceof TemplatePortal) {
          this._attachedPortal = <span class="hljs-keyword">portal</span>;
          <span class="hljs-keyword">return</span> this.attachTemplatePortal(<span class="hljs-keyword">portal</span>);
    }

    <span class="hljs-params">...</span>
}</code></pre>
<p><strong>attach()</strong> &#x4E3B;&#x8981;&#x903B;&#x8F91;&#x5C31;&#x662F;&#x6839;&#x636E; Portal &#x7C7B;&#x578B;&#x5206;&#x522B;&#x8C03;&#x7528; <strong>attachComponentPortal</strong> &#x548C; <strong>attachTemplatePortal</strong> &#x65B9;&#x6CD5;&#x3002;&#x4E0B;&#x9762;&#x5C06;&#x5206;&#x522B;&#x67E5;&#x770B;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x7684;&#x5B9E;&#x73B0;&#x3002;</p>
<h3 id="articleHeader6">attachComponentPortal()</h3>
<p>&#x8FD8;&#x662F;&#x4EE5; <strong>DomPortalOutlet</strong> &#x7C7B;&#x4E3A;&#x4F8B;&#xFF0C;&#x5982;&#x679C;&#x6302;&#x8F7D;&#x7684;&#x662F;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF0C;&#x5C31;&#x4F1A;&#x8C03;&#x7528; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L38-L63" rel="nofollow noreferrer" target="_blank">attachComponentPortal()</a></strong> &#x65B9;&#x6CD5;&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#x5C31;&#x662F;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x5DE5;&#x5382;&#x89E3;&#x6790;&#x5668; ComponentFactoryResolver &#x89E3;&#x6790;&#x51FA;&#x7EC4;&#x4EF6;&#x5DE5;&#x5382;&#x5BF9;&#x8C61;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="attachComponentPortal&lt;T&gt;(portal: ComponentPortal&lt;T&gt;): ComponentRef&lt;T&gt; {
  let componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
  let componentRef: ComponentRef&lt;T&gt;;
    ..." title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code>attachComponentPortal&lt;T&gt;(<span class="hljs-keyword">portal</span>: ComponentPortal&lt;T&gt;): ComponentRef&lt;T&gt; {
  <span class="hljs-keyword">let</span> componentFactory = this._componentFactoryResolver.resolveComponentFactory(<span class="hljs-keyword">portal</span>.component);
  <span class="hljs-keyword">let</span> componentRef: ComponentRef&lt;T&gt;;
    <span class="hljs-params">...</span></code></pre>
<p>&#x7136;&#x540E;&#x5982;&#x679C; ComponentPortal &#x5B9A;&#x4E49;&#x4E86; <strong>ViewContainerRef</strong>&#xFF0C;&#x5C31;&#x8C03;&#x7528; <strong>ViewContainerRef.createComponent</strong> &#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF0C;&#x5E76;&#x4F9D;&#x6B21;&#x63D2;&#x5165;&#x5230;&#x8BE5;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x4E2D;&#xFF0C;&#x6700;&#x540E;&#x8BBE;&#x7F6E; ComponentPortal &#x9500;&#x6BC1;&#x56DE;&#x8C03;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (portal.viewContainerRef) {
  componentRef = portal.viewContainerRef.createComponent(
      componentFactory,
      portal.viewContainerRef.length,
      portal.injector || portal.viewContainerRef.parentInjector);

  this.setDisposeFn(() =&gt; componentRef.destroy());
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">if</span> (<span class="hljs-keyword">portal</span>.viewContainerRef) {
  componentRef = <span class="hljs-keyword">portal</span>.viewContainerRef.createComponent(
      componentFactory,
      <span class="hljs-keyword">portal</span>.viewContainerRef.length,
      <span class="hljs-keyword">portal</span>.injector || <span class="hljs-keyword">portal</span>.viewContainerRef.parentInjector);

  this.setDisposeFn(() =&gt; componentRef.destroy());
}</code></pre>
<p>&#x5982;&#x679C; ComponentPortal &#x6CA1;&#x6709;&#x5B9A;&#x4E49; <strong>ViewContainerRef</strong>&#xFF0C;&#x5C31;&#x7528;&#x4E0A;&#x6587;&#x7684;&#x7EC4;&#x4EF6;&#x5DE5;&#x5382; ComponentFactory &#x6765;&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#xFF0C;&#x4F46;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x628A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x6302;&#x8F7D;&#x5230;&#x7EC4;&#x4EF6;&#x6811;&#x4E0A;&#xFF0C;&#x5E76;&#x8BBE;&#x7F6E; ComponentPortal &#x9500;&#x6BC1;&#x56DE;&#x8C03;&#xFF0C;&#x56DE;&#x8C03;&#x5305;&#x62EC;&#x9700;&#x8981;&#x4ECE;&#x7EC4;&#x4EF6;&#x6811;&#x4E2D;&#x62C6;&#x5378;&#x51FA;&#x8BE5;&#x89C6;&#x56FE;&#xFF0C;&#x5E76;&#x9500;&#x6BC1;&#x8BE5;&#x7EC4;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="else {
  componentRef = componentFactory.create(portal.injector || this._defaultInjector);
  this._appRef.attachView(componentRef.hostView);
  this.setDisposeFn(() =&gt; {
    this._appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  });
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">else</span> {
  componentRef = componentFactory.create(portal.injector || <span class="hljs-keyword">this</span>._defaultInjector);
  <span class="hljs-keyword">this</span>._appRef.attachView(componentRef.hostView);
  <span class="hljs-keyword">this</span>.setDisposeFn(() =&gt; {
    <span class="hljs-keyword">this</span>._appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  });
}</code></pre>
<p>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F; <strong>this._appRef.attachView(componentRef.hostView);</strong>&#xFF0C;&#x5F53;&#x628A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x6302;&#x8F7D;&#x5230;&#x7EC4;&#x4EF6;&#x6811;&#x65F6;&#x4F1A;&#x81EA;&#x52A8;&#x89E6;&#x53D1;&#x53D8;&#x66F4;&#x68C0;&#x6D4B;&#xFF08;change detection&#xFF09;&#x3002;</p>
<p>&#x76EE;&#x524D;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x53EA;&#x662F;&#x6302;&#x8F7D;&#x5230;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x91CC;&#xFF0C;&#x6700;&#x540E;&#x8FD8;&#x9700;&#x8981;&#x5728; DOM &#x4E2D;&#x6E32;&#x67D3;&#x51FA;&#x6765;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.outletElement.appendChild(this._getComponentRootNode(componentRef));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.outletElement.appendChild(<span class="hljs-keyword">this</span>._getComponentRootNode(componentRef));</code></pre>
<blockquote>&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x4E86;&#x89E3;&#x7684;&#x662F;&#xFF0C;&#x89C6;&#x56FE;&#x5BB9;&#x5668; ViewContainerRef&#x3001;&#x89C6;&#x56FE; ViewRef&#x3001;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE; ComponentRef.hostView&#x3001;&#x5D4C;&#x5165;&#x89C6;&#x56FE; EmbeddedViewRef &#x7684;&#x5173;&#x7CFB;&#x3002;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x548C;&#x5D4C;&#x5165;&#x89C6;&#x56FE;&#x90FD;&#x662F;&#x89C6;&#x56FE;&#x5BF9;&#x8C61;&#x7684;&#x5177;&#x4F53;&#x5F62;&#x6001;&#xFF0C;&#x800C;&#x89C6;&#x56FE;&#x662F;&#x9700;&#x8981;&#x6302;&#x8F7D;&#x5230;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5185;&#x624D;&#x80FD;&#x6B63;&#x5E38;&#x5DE5;&#x4F5C;&#xFF0C;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5185;&#x53EF;&#x4EE5;&#x6302;&#x8F7D;&#x591A;&#x4E2A;&#x89C6;&#x56FE;&#xFF0C;&#x800C;&#x6240;&#x8C13;&#x7684;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x5C31;&#x662F;&#x5305;&#x88C5;&#x4EFB;&#x610F;&#x4E00;&#x4E2A; DOM &#x5143;&#x7D20;&#x6240;&#x751F;&#x6210;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <strong>@ViewChild</strong> &#x6216;&#x8005;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x6CE8;&#x5165;&#x83B7;&#x5F97;&#xFF0C;&#x5982;&#x679C;&#x662F;&#x901A;&#x8FC7; <strong>@ViewChild</strong> &#x67E5;&#x8BE2;&#x62FF;&#x5230;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6A21;&#x677F;&#x5185;&#x67D0;&#x4E2A;&#x5143;&#x7D20;&#x5982; div&#xFF0C;&#x90A3; Angular &#x5C31;&#x4F1A;&#x6839;&#x636E;&#x8FD9;&#x4E2A; div &#x5143;&#x7D20;&#x751F;&#x6210;&#x4E00;&#x4E2A;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#xFF1B;&#x5982;&#x679C;&#x662F;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x6CE8;&#x5165;&#x83B7;&#x5F97;&#xFF0C;&#x90A3;&#x5C31;&#x6839;&#x636E;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6302;&#x8F7D;&#x70B9;&#x5982; <strong>app-root</strong> &#x751F;&#x6210;&#x89C6;&#x56FE;&#x5BB9;&#x5668;&#x3002;&#x6240;&#x6709;&#x7684;&#x89C6;&#x56FE;&#x90FD;&#x4F1A;&#x4F9D;&#x6B21;&#x4F5C;&#x4E3A;&#x5B50;&#x8282;&#x70B9;&#x6302;&#x8F7D;&#x5230;&#x5BB9;&#x5668;&#x5185;&#x3002;</blockquote>
<h3 id="articleHeader7">attachTemplatePortal()</h3>
<p>&#x6839;&#x636E;&#x4E0A;&#x6587;&#x7684;&#x7C7B;&#x4F3C;&#x8BBE;&#x8BA1;&#xFF0C;<strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/dom-portal-outlet.ts#L73-L92" rel="nofollow noreferrer" target="_blank">&#x6302;&#x8F7D; TemplatePortal &#x7684;&#x6E90;&#x7801;</a></strong> &#x5C31;&#x5F88;&#x7B80;&#x5355;&#x4E86;&#x3002;&#x5728;&#x6784;&#x9020; TemplatePortal &#x5FC5;&#x987B;&#x4F9D;&#x8D56; ViewContainerRef&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x521B;&#x5EFA;&#x5D4C;&#x5165;&#x89C6;&#x56FE; EmbeddedViewRef&#xFF0C;&#x7136;&#x540E;&#x624B;&#x52A8;&#x5F3A;&#x5236;&#x6267;&#x884C;&#x53D8;&#x66F4;&#x68C0;&#x6D4B;&#x3002;&#x4E0D;&#x50CF;&#x4E0A;&#x6587; <strong>this._appRef.attachView(componentRef.hostView);</strong> &#x4F1A;&#x68C0;&#x6D4B;&#x6574;&#x4E2A;&#x7EC4;&#x4EF6;&#x6811;&#xFF0C;&#x8FD9;&#x91CC; <strong>viewRef.detectChanges();</strong> &#x53EA;&#x68C0;&#x6D4B;&#x8BE5;&#x7EC4;&#x4EF6;&#x53CA;&#x5176;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="attachTemplatePortal&lt;C&gt;(portal: TemplatePortal&lt;C&gt;): EmbeddedViewRef&lt;C&gt; {
  let viewContainer = portal.viewContainerRef;
  let viewRef = viewContainer.createEmbeddedView(portal.templateRef, portal.context);
  viewRef.detectChanges();" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs lasso"><code>attachTemplatePortal&lt;C&gt;(<span class="hljs-keyword">portal</span>: TemplatePortal&lt;C&gt;): EmbeddedViewRef&lt;C&gt; {
  <span class="hljs-keyword">let</span> viewContainer = <span class="hljs-keyword">portal</span>.viewContainerRef;
  <span class="hljs-keyword">let</span> viewRef = viewContainer.createEmbeddedView(<span class="hljs-keyword">portal</span>.templateRef, <span class="hljs-keyword">portal</span>.context);
  viewRef.detectChanges();</code></pre>
<p>&#x6700;&#x540E;&#x5728; DOM &#x6E32;&#x67D3;&#x51FA;&#x89C6;&#x56FE;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="viewRef.rootNodes.forEach(rootNode =&gt; this.outletElement.appendChild(rootNode));" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">viewRef.rootNodes.forEach(<span class="hljs-function"><span class="hljs-params">rootNode</span> =&gt;</span> <span class="hljs-keyword">this</span>.outletElement.appendChild(rootNode));</code></pre>
<p>&#x73B0;&#x5728;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E86;&#x5982;&#x4F55;&#x628A; Portal &#x6302;&#x8F7D;&#x5230; PortalOutlet &#x5BB9;&#x5668;&#x5185;&#x7684;&#x5177;&#x4F53;&#x8FC7;&#x7A0B;&#xFF0C;&#x5B83;&#x5E76;&#x4E0D;&#x590D;&#x6742;&#x3002;</p>
<h2 id="articleHeader8">Portal &#x5FEB;&#x6377;&#x6307;&#x4EE4;</h2>
<p>&#x8BA9;&#x6211;&#x4EEC;&#x91CD;&#x65B0;&#x56DE;&#x987E;&#x4E0B; Portal &#x6280;&#x672F;&#x8981;&#x89E3;&#x51B3;&#x7684;&#x95EE;&#x9898;&#x4EE5;&#x53CA;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#xFF1A;Portal &#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x53EF;&#x4EE5;&#x5728; Angular &#x6846;&#x67B6;&#x6267;&#x884C;&#x4E0A;&#x4E0B;&#x6587;&#x4E4B;&#x5916;&#x52A8;&#x6001;&#x521B;&#x5EFA;&#x5B50;&#x89C6;&#x56FE;&#xFF0C;&#x9996;&#x5148;&#x9700;&#x8981;&#x5148;&#x5B9E;&#x4F8B;&#x5316;&#x51FA; PortalOutlet &#x5BF9;&#x8C61;&#xFF0C;&#x7136;&#x540E;&#x5B9E;&#x4F8B;&#x5316;&#x51FA;&#x4E00;&#x4E2A; ComponentPortal &#x6216; TemplatePortal&#xFF0C;&#x6700;&#x540E;&#x628A; Portal &#x6302;&#x8F7D;&#x5230; PortalOutlet &#x4E0A;&#x3002;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x4F46;&#x662F;&#x96BE;&#x9053; <strong>@angular/cdk/portal</strong> &#x6CA1;&#x6709;&#x63D0;&#x4F9B;&#x4EC0;&#x4E48;&#x5FEB;&#x6377;&#x65B9;&#x5F0F;&#xFF0C;&#x907F;&#x514D;&#x8BA9;&#x5F00;&#x53D1;&#x8005;&#x5199;&#x5927;&#x91CF;&#x91CD;&#x590D;&#x4EE3;&#x7801;&#x4E48;&#xFF1F;&#x6709;&#x3002;<strong>@angular/cdk/portal</strong> &#x63D0;&#x4F9B;&#x4E86;&#x4E24;&#x4E2A;&#x6307;&#x4EE4;&#xFF1A;<strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal-directives.ts#L29-L33" rel="nofollow noreferrer" target="_blank">CdkPortal</a></strong> &#x548C; <strong><a href="https://github.com/angular/material2/blob/master/src/cdk/portal/portal-directives.ts#L52-L57" rel="nofollow noreferrer" target="_blank">CdkPortalOutlet</a></strong>&#x3002;&#x8BE5;&#x4E24;&#x4E2A;&#x6307;&#x4EE4;&#x4F1A;&#x9690;&#x85CF;&#x6240;&#x6709;&#x5B9E;&#x73B0;&#x7EC6;&#x8282;&#xFF0C;&#x5F00;&#x53D1;&#x8005;&#x53EA;&#x9700;&#x8981;&#x7B80;&#x5355;&#x8C03;&#x7528;&#x5C31;&#x884C;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x67E5;&#x770B;&#x5B98;&#x65B9; <strong><a href="https://github.com/angular/material2/blob/master/src/demo-app/portal/portal-demo.ts" rel="nofollow noreferrer" target="_blank">demo</a></strong>&#x3002;</p>
<blockquote>
<strong><a href="https://stackblitz.com/edit/angular-cdk-portal-lx1036?file=app%2Fapp.component.ts" rel="nofollow noreferrer" target="_blank">demo</a></strong> &#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x53D1;&#x73B0;&#x4E24;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x90FD;&#x4F1A;&#x591A;&#x4EA7;&#x751F;&#x4E00;&#x4E2A; p &#x6807;&#x7B7E;&#xFF1B;AppComponent &#x6A21;&#x677F;&#x4E2D;&#x6302;&#x8F7D;&#x70B9;&#x4F5C;&#x4E3A; ViewContainerRef &#x65F6;&#xFF0C;&#x6302;&#x8F7D;&#x70B9;&#x8FD8;&#x4E0D;&#x80FD;&#x4E3A; <strong>ng-template</strong> &#x548C; <strong>ng-container</strong>&#xFF0C;&#x548C;&#x5370;&#x8C61;&#x4E2D;&#x6709;&#x51FA;&#x5165;&#x3002;&#x6709;&#x65F6;&#x95F4;&#x5728;&#x67E5;&#x627E;&#xFF0C;&#x8C01;&#x77E5;&#x9053;&#x539F;&#x56E0;&#xFF0C;&#x4E5F;&#x53EF;&#x7559;&#x8A00;&#x5E2E;&#x52A9;&#x89E3;&#x7B54;&#xFF0C;&#x5148;&#x8C22;&#x4E86;&#x3002;</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
源码分析 @angular/cdk 之 Portal

## 原文链接
[https://segmentfault.com/a/1190000015097370](https://segmentfault.com/a/1190000015097370)

