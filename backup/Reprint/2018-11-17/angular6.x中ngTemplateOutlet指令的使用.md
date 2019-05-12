---
title: 'angular6.x中ngTemplateOutlet指令的使用' 
date: 2018-11-17 14:34:54
hidden: true
slug: 7axnyt5p2ju
categories: [reprint]
---

{{< raw >}}
<p>&#x5728;&#x4F7F;&#x7528;angular&#x8FDB;&#x884C;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;,&#x901A;&#x8FC7;&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#x5411;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x4F20;&#x503C;&#x7684;&#x65B9;&#x5F0F;,&#x6709;&#x65F6;&#x5019;&#x5E76;&#x4E0D;&#x80FD;&#x5B8C;&#x5168;&#x6EE1;&#x8DB3;&#x9700;&#x6C42;,&#x6BD4;&#x5982;&#x6211;&#x4EEC;&#x5199;&#x4E86;&#x4E00;&#x4E2A;&#x516C;&#x5171;&#x7EC4;&#x4EF6;,&#x4F46;&#x662F;&#x67D0;&#x4E2A;&#x6A21;&#x677F;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x516C;&#x5171;&#x7EC4;&#x4EF6;&#x7684;&#x65F6;&#x5019;,&#x9700;&#x8981;&#x5728;&#x5176;&#x5185;&#x90E8;&#x6DFB;&#x52A0;&#x4E00;&#x4E9B;&#x6807;&#x7B7E;&#x5185;&#x5BB9;,&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;,&#x9664;&#x4E86;&#x4F7F;&#x7528;<code>ngIf</code>/<code>ngSwitch</code>&#x9884;&#x5148;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x5B9A;&#x4E49;&#x4E4B;&#x5916;,&#x5C31;&#x53EF;&#x4EE5;&#x5229;&#x7528;<code>ngTemplateOutlet</code>&#x6307;&#x4EE4;&#x5411;&#x7EC4;&#x4EF6;&#x4F20;&#x5165;&#x5185;&#x5BB9;.</p><p><code>ngTemplateOutlet</code>&#x6307;&#x4EE4;&#x7C7B;&#x4F3C;&#x4E8E;angularjs&#x4E2D;&#x7684;<code>ng-transclude</code>,vuejs&#x4E2D;&#x7684;<code>slot</code>.</p><p><code>ngTemplateOutlet</code>&#x662F;&#x7ED3;&#x6784;&#x578B;&#x6307;&#x4EE4;,&#x9700;&#x8981;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;<code>TemplateRef</code>&#x7C7B;&#x578B;&#x7684;&#x5B9E;&#x4F8B;.</p><p>&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5982;&#x4E0B;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  selector: &apos;app&apos;,
  template: `
    &lt;h1&gt;Angular&apos;s template outlet and lifecycle example&lt;/h1&gt;
    &lt;app-content [templateRef]=&quot;nestedComponentRef&quot;&gt;&lt;/app-content&gt;
    &lt;ng-template #nestedComponentRef let-name&gt;
      &lt;span&gt;Hello "{{"name"}}"!&lt;/span&gt;
      &lt;app-nested-component&gt;&lt;/app-nested-component&gt;
    &lt;/ng-template&gt;
  `,
})
export class App {}
@Component({
  selector: &apos;app-content&apos;,
  template: `
    &lt;button (click)=&quot;display = !display&quot;&gt;Toggle content&lt;/button&gt;
    &lt;template 
        *ngIf=&quot;display&quot; 
        *ngTemplateOutlet=&quot;templateRef context: myContext&quot;&gt;
    &lt;/template&gt;
  `,
})
export class Content {
  display = false;
  @Input() templateRef: TemplateRef;
  myContext = {$implicit: &apos;World&apos;, localSk: &apos;Svet&apos;};
}
@Component({
  selector: &apos;app-nested-component&apos;,
  template: `
    &lt;b&gt;Hello World!&lt;/b&gt;
  `,
})
export class NestedComponent implements OnDestroy, OnInit {
  
  ngOnInit() {
    alert(&apos;app-nested-component initialized!&apos;);
  }
  
  ngOnDestroy() {
    alert(&apos;app-nested-component destroyed!&apos;);
  }
  
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">&apos;app&apos;</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;h1&gt;Angular&apos;s template outlet and lifecycle example&lt;/h1&gt;
    &lt;app-content [templateRef]=&quot;nestedComponentRef&quot;&gt;&lt;/app-content&gt;
    &lt;ng-template #nestedComponentRef let-name&gt;
      &lt;span&gt;Hello "{{"name"}}"!&lt;/span&gt;
      &lt;app-nested-component&gt;&lt;/app-nested-component&gt;
    &lt;/ng-template&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> </span>{}
@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">&apos;app-content&apos;</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;button (click)=&quot;display = !display&quot;&gt;Toggle content&lt;/button&gt;
    &lt;template 
        *ngIf=&quot;display&quot; 
        *ngTemplateOutlet=&quot;templateRef context: myContext&quot;&gt;
    &lt;/template&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Content</span> </span>{
  display = <span class="hljs-literal">false</span>;
  @Input() templateRef: TemplateRef;
  myContext = {<span class="hljs-attr">$implicit</span>: <span class="hljs-string">&apos;World&apos;</span>, <span class="hljs-attr">localSk</span>: <span class="hljs-string">&apos;Svet&apos;</span>};
}
@Component({
  <span class="hljs-attr">selector</span>: <span class="hljs-string">&apos;app-nested-component&apos;</span>,
  <span class="hljs-attr">template</span>: <span class="hljs-string">`
    &lt;b&gt;Hello World!&lt;/b&gt;
  `</span>,
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NestedComponent</span> <span class="hljs-title">implements</span> <span class="hljs-title">OnDestroy</span>, <span class="hljs-title">OnInit</span> </span>{
  
  ngOnInit() {
    alert(<span class="hljs-string">&apos;app-nested-component initialized!&apos;</span>);
  }
  
  ngOnDestroy() {
    alert(<span class="hljs-string">&apos;app-nested-component destroyed!&apos;</span>);
  }
  
}</code></pre><p>&#x4EE3;&#x7801;&#x4E2D;&#x9664;&#x4E86;&#x6839;&#x7EC4;&#x4EF6;&#x5916;&#x5B9A;&#x4E49;&#x4E86;&#x4E24;&#x4E2A;&#x7EC4;&#x4EF6;</p><ul><li>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;:<code>app-content</code></li><li>&#x4F20;&#x9012;&#x8FDB;&#x53BB;&#x7684;&#x5185;&#x5BB9;&#x7EC4;&#x4EF6;:<code>app-nested-component</code></li></ul><p><code>app-content</code>&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>TemplateRef</code>&#x7C7B;&#x578B;&#x7684;&#x8F93;&#x5165;&#x5C5E;&#x6027;<code>templateRef</code>,&#x5E76;&#x5728;&#x6A21;&#x677F;&#x4E2D;&#x5C06;&#x5176;&#x7ED1;&#x5B9A;&#x5230;&#x4E86;<code>ngTemplateOutlet</code>&#x6307;&#x4EE4;,&#x5F53;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x5230;<code>templateRef</code>&#x5C5E;&#x6027;&#x65F6;,&#x5C31;&#x4F1A;&#x5C06;&#x5176;&#x6E32;&#x67D3;&#x5230;<code>ngTemplateOutlet</code>&#x6307;&#x4EE4;&#x6240;&#x5728;&#x7684;&#x4F4D;&#x7F6E;.</p><p>&#x4E0A;&#x4F8B;&#x4E2D;,<code>app-content</code>&#x7EC4;&#x4EF6;<code>templateRef</code>&#x5C5E;&#x6027;&#x7684;&#x6765;&#x6E90;,&#x662F;&#x5728;&#x6839;&#x7EC4;&#x4EF6;&#x7684;&#x6A21;&#x677F;&#x5185;,&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>#</code>&#x7B26;&#x53F7;&#x83B7;&#x53D6;&#x5230;&#x4E86;<code>app-nested-component</code>&#x7EC4;&#x4EF6;&#x6240;&#x5728;<code>&lt;ng-template&gt;</code>&#x7684;&#x5F15;&#x7528;&#x5E76;&#x4F20;&#x5165;&#x7684;.</p><p>&#x5728;&#x5B9E;&#x9645;&#x5E94;&#x7528;&#x4E2D;,&#x9664;&#x4E86;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;,&#x4E5F;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5728;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x83B7;&#x53D6;<code>TemplateRef</code>&#x7C7B;&#x578B;&#x7684;&#x5C5E;&#x6027;&#x5E76;&#x7ED1;&#x5B9A;&#x5230;<code>ngTemplateOutlet</code>&#x6307;&#x4EE4;.</p><p>&#x6BD4;&#x5982;&#x5728;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x4E3A;&#x6A21;&#x6001;&#x6846;&#x7684;&#x60C5;&#x51B5;&#x4E0B;,&#x5E76;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;&#x6A21;&#x677F;&#x4F20;&#x503C;,&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4E0B;&#x9762;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" @ViewChild(&apos;temp&apos;) temp: TemplateRef&lt;any&gt;

 openDialog(){
   this.dialog.open(ViewDialogComponent, {data: this.temp)
 }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"> @ViewChild(<span class="hljs-string">&apos;temp&apos;</span>) temp: TemplateRef&lt;any&gt;

 openDialog(){
   <span class="hljs-keyword">this</span>.dialog.open(ViewDialogComponent, {<span class="hljs-attr">data</span>: <span class="hljs-keyword">this</span>.temp)
 }</code></pre><p>&#x5728;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x4E2D;&#x8FD8;&#x53EF;&#x4EE5;&#x5B9A;&#x4E49;&#x88AB;&#x4F20;&#x9012;&#x5185;&#x5BB9;&#x7684;&#x4E0A;&#x4E0B;&#x6587;(&#x4E0A;&#x4F8B;<code>app-content</code>&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;<code>myContext</code>&#x5C5E;&#x6027;),&#x5176;&#x4E2D;&#x7684;<code>$implicit</code>&#x5C5E;&#x6027;&#x4F5C;&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;,&#x5728;&#x88AB;&#x4F20;&#x9012;&#x7684;&#x5185;&#x5BB9;&#x4E2D;&#x53EF;&#x4EE5;&#x4EE5;&#x91CD;&#x547D;&#x540D;&#x7684;&#x65B9;&#x5F0F;&#x8BBF;&#x95EE;(&#x4E0A;&#x4F8B;<code>let-name</code>),&#x5BF9;&#x4E8E;&#x4E0A;&#x4E0B;&#x6587;&#x4E2D;&#x5176;&#x4ED6;&#x7684;&#x5C5E;&#x6027;,&#x5C31;&#x9700;&#x8981;&#x901A;&#x8FC7;<code>let-&#x5C5E;&#x6027;&#x540D;</code>&#x7684;&#x65B9;&#x5F0F;&#x8BBF;&#x95EE;&#x4E86;.</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
angular6.x中ngTemplateOutlet指令的使用

## 原文链接
[https://segmentfault.com/a/1190000015944548](https://segmentfault.com/a/1190000015944548)

