---
title: 'ng-alain表单使用方式' 
date: 2018-11-24 2:30:09
hidden: true
slug: ecpnvzkjfc
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">Angular&#x8868;&#x5355;</h2><p>Angular&#x63D0;&#x4F9B;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x67B6;&#x6784;&#x8303;&#x5F0F;&#x8868;&#x5355;&#xFF1A;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x548C;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#xFF0C;&#x5B98;&#x7F51;&#x4E5F;&#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E86;<a href="https://angular.io/guide/dynamic-form" rel="nofollow noreferrer" target="_blank">&#x52A8;&#x6001;&#x8868;&#x5355;</a>&#x8303;&#x4F8B;&#x3002;</p><p>&#x5F53;&#x4F7F;&#x7528;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x8303;&#x5F0F;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x7528;&#x6237;&#x5FC5;&#x586B;&#x6027;&#x7684;&#x8868;&#x5355;&#xFF0C;&#x5728;&#x4F7F;&#x7528;&#x4E0A;&#x6709;&#x975E;&#x5E38;&#x5927;&#x7684;&#x4E0D;&#x540C;&#xFF1A;</p><p><strong>&#x6A21;&#x677F;&#x9A71;&#x52A8;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    template: `
    &lt;form nz-form (ngSubmit)=&quot;onSubmit()&quot;&gt;
        &lt;nz-form-item&gt;
            &lt;nz-form-label nzRequired nzFor=&quot;name&quot;&gt;Name&lt;/nz-form-label&gt;
            &lt;nz-form-control&gt;
                &lt;input [(ngModel)]=&quot;model.name&quot; name=&quot;name&quot; id=&quot;name&quot; required #name=&quot;ngModel&quot;&gt;
                &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
            &lt;/nz-form-control&gt;
        &lt;/nz-form-item&gt;
    &lt;/form&gt;`
})
export class DemoComponent {
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
    template: <span class="hljs-string">`
    &lt;form nz-form (ngSubmit)=&quot;onSubmit()&quot;&gt;
        &lt;nz-form-item&gt;
            &lt;nz-form-label nzRequired nzFor=&quot;name&quot;&gt;Name&lt;/nz-form-label&gt;
            &lt;nz-form-control&gt;
                &lt;input [(ngModel)]=&quot;model.name&quot; name=&quot;name&quot; id=&quot;name&quot; required #name=&quot;ngModel&quot;&gt;
                &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
            &lt;/nz-form-control&gt;
        &lt;/nz-form-item&gt;
    &lt;/form&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {
}</code></pre><p><strong>&#x54CD;&#x5E94;&#x5F0F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    template: `
    &lt;form nz-form [formGroup]=&quot;heroForm&quot; (ngSubmit)=&quot;onSubmit()&quot;&gt;
        &lt;nz-form-item&gt;
            &lt;nz-form-label nzRequired nzFor=&quot;name&quot;&gt;Name&lt;/nz-form-label&gt;
            &lt;nz-form-control&gt;
                &lt;input formControlName=&quot;name&quot;&gt;
                &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
            &lt;/nz-form-control&gt;
        &lt;/nz-form-item&gt;
    &lt;/form&gt;`
})
export class DemoComponent {
    ngOnInit(): void {
        this.heroForm = new FormGroup({
            name: new FormControl(&apos;&apos;, [Validators.required])
        });
    }
    
    get name() { return this.heroForm.get(&apos;name&apos;); }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
    template: <span class="hljs-string">`
    &lt;form nz-form [formGroup]=&quot;heroForm&quot; (ngSubmit)=&quot;onSubmit()&quot;&gt;
        &lt;nz-form-item&gt;
            &lt;nz-form-label nzRequired nzFor=&quot;name&quot;&gt;Name&lt;/nz-form-label&gt;
            &lt;nz-form-control&gt;
                &lt;input formControlName=&quot;name&quot;&gt;
                &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
            &lt;/nz-form-control&gt;
        &lt;/nz-form-item&gt;
    &lt;/form&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {
    ngOnInit(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">this</span>.heroForm = <span class="hljs-keyword">new</span> FormGroup({
            name: <span class="hljs-keyword">new</span> FormControl(<span class="hljs-string">&apos;&apos;</span>, [Validators.required])
        });
    }
    
    <span class="hljs-keyword">get</span> name() { <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.heroForm.get(<span class="hljs-string">&apos;name&apos;</span>); }
}</code></pre><blockquote>&#x4E0A;&#x8FF0;&#x793A;&#x4F8B;&#x53EA;&#x63D0;&#x4F9B;&#x6838;&#x5FC3;&#x4EE3;&#x7801;</blockquote><p>&#x8BDA;&#x5982;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x548C;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x7684;&#x540D;&#x79F0;&#x4E00;&#x6837;&#x3002;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x4EE5;HTML&#x7F16;&#x7A0B;&#x98CE;&#x683C;&#x4E3A;&#x4E3B;&#xFF0C;&#x5E76;&#x4E14;&#x7531; <code>ngModel</code> &#x521B;&#x5EFA;&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x5BF9;&#x8C61;&#x53CA;&#x6570;&#x636E;&#x6A21;&#x578B;&#x7BA1;&#x7406;&#xFF0C;&#x76F8;&#x6BD4;&#x8F83;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x4F7F;&#x7528;&#x66F4;&#x5C11;&#x7684;&#x4EE3;&#x7801;&#xFF08;&#x867D;&#x7136;&#x770B;&#x8D77;&#x6765;&#x662F;&#x8FD9;&#x6837;&#xFF09;&#x3002;</p><p>&#x5047;&#x5982;&#x5BF9;&#x6D4B;&#x8BD5;&#x975E;&#x5E38;&#x5728;&#x610F;&#xFF0C;&#x90A3;&#x4E48;&#x6BCB;&#x5EB8;&#x7F6E;&#x7591;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x66F4;&#x9002;&#x5408;&#x4F60;&#xFF0C;&#x56E0;&#x4E3A;&#x4E8C;&#x8005;&#x7684;&#x53E6;&#x4E00;&#x4E2A;&#x91CD;&#x8981;&#x533A;&#x522B;&#x662F;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x6570;&#x636E;&#x6A21;&#x578B;&#x53CA;&#x6709;&#x6548;&#x6027;&#x4FE1;&#x606F;&#x90FD;&#x662F;&#x540C;&#x6B65;&#x884C;&#x4E3A;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x66F4;&#x5BB9;&#x6613;&#x7684;&#x6D4B;&#x8BD5;&#x4ED6;&#x5B83;&#x4EEC;&#x3002;</p><h2 id="articleHeader1">ng-alain&#x8868;&#x5355;&#x6784;&#x5EFA;&#x65B9;&#x5F0F;</h2><p>&#x5F53;&#x7136;&#x8FD9;&#x4E00;&#x5207;&#x90FD;&#x8DDF; ng-alain &#x5E76;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x51B3;&#x5B9A;&#x6027;&#x5173;&#x8054;&#xFF0C;ng-alain &#x53EA;&#x662F;&#x4ECE;&#x4F7F;&#x7528;&#x7684;&#x89D2;&#x5EA6;&#x8FDB;&#x4E00;&#x6B65;&#x4F18;&#x5316;&#x4E8C;&#x8005;&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x6765;&#x505A;&#x6539;&#x53D8;&#x3002;</p><p>&#x793A;&#x4F8B;&#x4E2D;&#x4E0D;&#x7BA1;&#x662F;&#x4EE5;HTML&#x3001;&#x8FD8;&#x662F;&#x4EE5;&#x7F16;&#x7A0B;&#x98CE;&#x683C;&#x4E3A;&#x4E3B;&#xFF0C;&#x603B;&#x662F;&#x9700;&#x8981;&#x5F88;&#x591A;&#x989D;&#x5916;&#x7684;&#x4EE3;&#x7801;&#x6765;&#x505A;<em>&#x5E03;&#x5C40;</em>&#x3002;</p><h3 id="articleHeader2">&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;&#x7B80;&#x6613;HTML&#x6A21;&#x677F;&#x8868;&#x5355;</h3><p>&#x56E0;&#x6B64;&#xFF0C;&#x5F53;&#x4F60;&#x662F;&#x4EE5;HTML&#x6A21;&#x677F;&#x4E3A;&#x4E3B;&#x7684;&#x8868;&#x5355;&#x5F00;&#x53D1;&#xFF0C;&#x5219;&#x7B80;&#x6613;HTML&#x6A21;&#x677F;&#x8868;&#x5355;&#x7EC4;&#x4EF6;&#xFF1A;<a href="https://ng-alain.com/components/simple-html-form" rel="nofollow noreferrer" target="_blank">shf-item</a> &#x53EF;&#x80FD;&#x4F1A;&#x66F4;&#x9002;&#x5408;&#x4F60;&#xFF0C;&#x82E5;&#x5C06;&#x4E0A;&#x8FF0;&#x7684;&#x793A;&#x4F8B;&#x4F7F;&#x7528; <code>shf-item</code> &#x6765;&#x6539;&#x53D8;&#x5C06;&#x4F1A;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    template: `
    &lt;form nz-form (ngSubmit)=&quot;onSubmit()&quot; shf-wrap&gt;
        &lt;shf-item label=&quot;App Key&quot;&gt;
            &lt;input [(ngModel)]=&quot;model.name&quot; name=&quot;name&quot; required #name=&quot;ngModel&quot;&gt;
            &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
        &lt;/shf-item&gt;
    &lt;/form&gt;`
})
export class DemoComponent {
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
    template: <span class="hljs-string">`
    &lt;form nz-form (ngSubmit)=&quot;onSubmit()&quot; shf-wrap&gt;
        &lt;shf-item label=&quot;App Key&quot;&gt;
            &lt;input [(ngModel)]=&quot;model.name&quot; name=&quot;name&quot; required #name=&quot;ngModel&quot;&gt;
            &lt;nz-form-explain [hidden]=&quot;name.valid || name.pristine&quot;&gt;Name is required&lt;/nz-form-explain&gt;
        &lt;/shf-item&gt;
    &lt;/form&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {
}</code></pre><blockquote>&#x4EE5;&#x4E4B;&#x76F8;&#x5BF9;&#x4E8E;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x7565;&#x540C;&#xFF0C;&#x7EC4;&#x4EF6;&#x5355;&#x7EAF;&#x53EA;&#x662F;&#x8FDB;&#x4E00;&#x6B65;&#x4F18;&#x5316;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x3002;</blockquote><p><strong>&#x5173;&#x4E8E;&#x9519;&#x8BEF;&#x53CD;&#x9988;</strong></p><p>&#x9519;&#x8BEF;&#x53CD;&#x9988;&#x5305;&#x542B;<strong>&#x89C6;&#x89C9;</strong>&#x4E0E;<strong>&#x4FE1;&#x606F;&#x6587;&#x672C;</strong>&#x4E24;&#x79CD;&#xFF0C;&#x4E0A;&#x8FF0;&#x793A;&#x4F8B;&#x4EE5;&#x4FE1;&#x606F;&#x6587;&#x672C;&#x4E3A;&#x4E3B;&#xFF08;&#x55EF;&#xFF0C;&#x63D0;&#x793A;<strong>&#x5FC5;&#x586B;&#x6027;</strong>&#x771F;&#x50BB;&#xFF09;&#x3002;</p><p><strong>&#x89C6;&#x89C9;</strong>&#x6548;&#x679C;&#x5728;ng-zorro-antd&#x91CC;&#xFF0C;&#x662F;&#x5C06;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x4EE5;<strong>&#x7EA2;&#x8272;</strong>&#x8FB9;&#x6846;&#x7EBF;&#x6765;&#x8868;&#x793A;&#xFF08;&#x56E0;&#x6B64;&#x5BF9;&#x4E8E;&#x90A3;&#x4E9B;&#x6CA1;&#x6709;&#x8FB9;&#x6846;&#x6216;&#x6CA1;&#x6709;&#x7279;&#x6B8A;&#x5904;&#x7406;&#x7684;&#x90FD;&#x65E0;&#x6CD5;&#x4F53;&#x73B0;&#xFF09;&#x3002;</p><blockquote>&#x5EFA;&#x8BAE;&#xFF1A;&#x9664;&#x7279;&#x6B8A;&#x9519;&#x8BEF;&#x6587;&#x672C;&#x4EE5;&#x5916;&#xFF0C;&#x53EF;&#x4EE5;&#x53EA;&#x8003;&#x8651;&#x4EE5;<strong>&#x89C6;&#x89C9;</strong>&#x6548;&#x679C;&#x6765;&#x53CD;&#x9988;&#x9519;&#x8BEF;&#x3002;</blockquote><p><strong>&#x5173;&#x4E8E;&#x6821;&#x9A8C;</strong></p><p>Angular &#x5B9E;&#x73B0;&#x4E86;&#x90E8;&#x5206;HTML5&#x6807;&#x51C6;&#x5E38;&#x89C4;&#x5C5E;&#x6027;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;<code>required</code>&#x3001;<code>maxlength</code> &#x7B49;&#x7B49;&#xFF1B;&#x800C; ng-zorro-antd &#x7684;&#x6240;&#x6709;&#x6570;&#x636E;&#x5F55;&#x5165;&#x7EC4;&#x4EF6;&#x90FD;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E9B;&#x989D;&#x5916;&#x7684;&#x6570;&#x636E;&#x9650;&#x5B9A;&#x6761;&#x4EF6;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;<code>nz-input-number</code> &#x6709;&#x6548;&#x8303;&#x56F4;&#xFF08;<code>nzMin</code>&#x3001;<code>nzMax</code>&#x3001;<code>nzStep</code>&#xFF09;&#x3002;&#x5F53;&#x7136;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x5F52;&#x7EB3;&#x4E1A;&#x52A1;&#x6821;&#x9A8C;&#x903B;&#x8F91;&#xFF0C;&#x4F8B;&#x5982;&#x5F02;&#x6B65;&#x6821;&#x9A8C;&#x624B;&#x673A;&#x53F7;&#x7801; <code>mobile</code> &#xFF08;&#x53EF;&#x53C2;&#x8003;<a href="https://github.com/angular/angular/blob/master/packages/forms/src/directives/validators.ts#L81" rel="nofollow noreferrer" target="_blank">RequiredValidator</a>&#xFF09;&#x3002;</p><p><strong>&#x5C0F;&#x7ED3;</strong></p><p><code>shf-item</code> &#x662F;&#x4EE5;&#x7B80;&#x5316;HTML&#x5E03;&#x5C40;&#x5F00;&#x53D1;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x81EA;&#x8EAB;&#x4F1A;&#x7EF4;&#x62A4; <code>ngModel</code> &#x7684;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x5E76;&#x5BF9;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x589E;&#x52A0; <code>.has-error</code> &#x6837;&#x5F0F;&#x7C7B;&#x540D;&#xFF0C;&#x5B83;&#x59CB;&#x7EC8;&#x4FDD;&#x6301;<strong>&#x89C6;&#x89C9;</strong>&#x6548;&#x679C;&#x7684;&#x4F53;&#x73B0;&#x3002;</p><h3 id="articleHeader3">&#x65B9;&#x5F0F;&#x4E8C;&#xFF1A;&#x52A8;&#x6001;&#x8868;&#x5355;</h3><p>&#x52A8;&#x6001;&#x8868;&#x5355; <a href="https://ng-alain.com/form/getting-started" rel="nofollow noreferrer" target="_blank">@delon/form</a> &#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E; <a href="http://json-schema.org/" rel="nofollow noreferrer" target="_blank">JSON Schema</a> &#x6807;&#x51C6;&#x7684;&#x52A8;&#x6001;&#x6784;&#x5EFA;&#x8868;&#x5355;&#xFF1B;&#x5B83;&#x662F;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x7C7B;&#x5E93;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x4EFB;&#x4F55; ng-zorro-antd &#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x3002;</p><p>&#x540C;&#x6837;&#x4EE5;&#x76F8;&#x540C;&#x7684;&#x793A;&#x4F8B;&#xFF0C;&#x5176;&#x4EE3;&#x7801;&#x4F1A;&#x6709;&#x8DA3;&#x5F97;&#x591A;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
    template: `&lt;sf [schema]=&quot;schema&quot; (formSubmit)=&quot;submit($event)&quot;&gt;&lt;/sf&gt;`
})
export class DemoComponent {
    schema: SFSchema = {
        properties: {
            name: { type: &apos;string&apos; }
        },
        required: [ &apos;name&apos; ]
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts"><span class="hljs-meta">@Component</span>({
    template: <span class="hljs-string">`&lt;sf [schema]=&quot;schema&quot; (formSubmit)=&quot;submit($event)&quot;&gt;&lt;/sf&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> DemoComponent {
    schema: SFSchema = {
        properties: {
            name: { <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;string&apos;</span> }
        },
        required: [ <span class="hljs-string">&apos;name&apos;</span> ]
    }
}</code></pre><p>&#x52A8;&#x6001;&#x8868;&#x5355;&#x59CB;&#x7EC8;&#x4EE5;&#x4E00;&#x4E2A;JSON&#x5BF9;&#x8C61;&#x6765;&#x6784;&#x5EFA;&#x8868;&#x5355;&#xFF0C;&#x54EA;&#x6015;&#x8BE5;&#x5BF9;&#x8C61;&#x6765;&#x81EA;&#x8FDC;&#x7A0B;&#x3002;</p><p>@delon/form &#x5185;&#x7F6E;&#x4EC5;&#x5B9E;&#x73B0; ng-zorro-antd &#x6570;&#x636E;&#x5F55;&#x5165;&#x7EC4;&#x4EF6;&#x90E8;&#x5206;&#xFF0C;&#x4F60;&#x4F9D;&#x7136;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<a href="https://ng-alain.com/form/customize" rel="nofollow noreferrer" target="_blank">&#x81EA;&#x5B9A;&#x4E49;&#x5C0F;&#x90E8;&#x4EF6;</a> &#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x4E00;&#x5957;&#x5C5E;&#x4E8E;&#x81EA;&#x5DF1;&#x4E1A;&#x52A1;&#x90E8;&#x4EF6;&#x5E93;&#x3002;</p><p><strong>&#x6570;&#x636E;&#x7ED3;&#x6784;&#x4E0E;UI</strong></p><p>&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;&#x8868;&#x5355;&#x5143;&#x7D20;&#x6211;&#x4EEC;&#x8BA4;&#x4E3A;&#x5E94;&#x8BE5;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x82E5;&#x5E72;&#x5143;&#x7D20;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015573170?w=490&amp;h=102" src="https://static.alili.tech/img/remote/1460000015573170?w=490&amp;h=102" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>JSON Schema &#x91CD;&#x70B9;&#x5728;&#x4E8E;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x6821;&#x9A8C;&#xFF0C;&#x800C;&#x5BF9;&#x4E8E;UI&#x5C42;&#x9762;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>&lt;sf [ui]=&quot;ui&quot;&gt;</code> &#x6765;&#x989D;&#x5916;&#x589E;&#x5F3A; UI &#x6E32;&#x67D3;&#xFF0C;&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="schema = {
  properties: {
    url: {
      type: &apos;string&apos;,
      title: &apos;Web Site&apos;
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">schema = {
  properties: {
    url: {
      <span class="hljs-keyword">type</span>: <span class="hljs-string">&apos;string&apos;</span>,
      title: <span class="hljs-string">&apos;Web Site&apos;</span>
    }
  }
}</code></pre><p>&#x4E00;&#x4E2A;URL&#x5C5E;&#x6027;&#xFF0C;&#x82E5;&#x6211;&#x4EEC;&#x4E0D;&#x5E0C;&#x671B;&#x7528;&#x4E8E;&#x6DFB;&#x52A0; <code>https://</code> &#x524D;&#x7F00;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5C31;&#x5355;&#x7EAF;&#x7684; JSON Schema &#x7ED3;&#x6784;&#x662F;&#x65E0;&#x6CD5;&#x8868;&#x8FF0;&#xFF0C;&#x800C; <code>nz-input</code> &#x53C8;&#x652F;&#x6301;&#x975E;&#x5E38;&#x4E30;&#x5BCC;&#x7684;&#x524D;&#x540E;&#x7F00;&#x6587;&#x672C;&#xFF0C;&#x5219;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4E3A; <code>ui</code> &#x5B9A;&#x5236;&#x5E76;&#x589E;&#x52A0; <code>https://</code> &#x7684;&#x524D;&#x7F00;&#x6587;&#x672C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ui = {
  $url: {
    addOnBefore: &apos;https://&apos;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="ts">ui = {
  $url: {
    addOnBefore: <span class="hljs-string">&apos;https://&apos;</span>
  }
}</code></pre><blockquote>ui &#x672C;&#x8EAB;&#x4E5F;&#x662F;&#x4E00;&#x4E2A; JSON &#x7ED3;&#x6784;&#xFF0C;&#x4E3A;&#x4E86;&#x533A;&#x5206; JSON Schema &#x5C5E;&#x6027;&#x540D;&#x7684;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#xFF0C;<strong>&#x5FC5;&#x987B;</strong>&#x7EDF;&#x4E00;&#x5BF9;&#x5C5E;&#x6027;&#x540D;&#x52A0;&#x4E0A; <code>$</code> &#x524D;&#x7F00;&#x3002;</blockquote><p><strong>&#x5C0F;&#x7ED3;</strong></p><p>&#x52A8;&#x6001;&#x8868;&#x5355;&#x5E76;&#x4E0D;&#x662F;&#x57FA;&#x4E8E; <code>@angular/form</code> &#x6765;&#x6784;&#x5EFA;&#x7684;&#xFF0C;&#x4F46;&#x672C;&#x8D28;&#x662F;&#x7565;&#x540C;&#xFF0C;&#x901A;&#x8FC7; <code>Observable</code> &#x76D1;&#x542C;&#x6570;&#x636E;&#x6D41;&#x540E;&#x4F7F;&#x7528; <a href="https://ajv.js.org/" rel="nofollow noreferrer" target="_blank">ajv</a> &#x6821;&#x9A8C;&#x3001;&#x9519;&#x8BEF;&#x53CD;&#x9988;&#x3002;</p><h2 id="articleHeader4">&#x603B;&#x7ED3;</h2><p>&#x603B;&#x7684;&#x6765;&#x8BF4;&#x5728; ng-alain &#x91CC;&#x53EF;&#x4EE5;&#x91C7;&#x7528; Angular &#x8868;&#x5355;&#x548C;&#x52A8;&#x6001;&#x8868;&#x5355;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#xFF0C;&#x800C; Angular &#x8868;&#x5355;&#x53C8;&#x6709;&#x4E24;&#x79CD;&#x4E0D;&#x540C;&#x7684;&#x67B6;&#x6784;&#x8303;&#x5F0F;&#x8868;&#x5355;&#xFF1A;&#x6A21;&#x677F;&#x9A71;&#x52A8;&#x548C;&#x54CD;&#x5E94;&#x5F0F;&#x8868;&#x5355;&#x3002;</p><p>&#x524D;&#x8005;&#x82E5;&#x5355;&#x7EAF;&#x4F7F;&#x7528; ng-zorro-antd &#x76F8;&#x5BF9;&#x4E8E;&#x7F3A;&#x5C11;&#x66F4;&#x52A0;&#x7B80;&#x6D01;&#x7684;&#x5F00;&#x53D1;&#x65B9;&#x6CD5;&#xFF0C;<code>shf</code> &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7B80;&#x6D01;&#x7684;&#x8868;&#x73B0;&#x5F62;&#x5F0F;&#x3002;</p><p>&#x540E;&#x8005;&#x662F;&#x4E00;&#x79CD;&#x6BD4;&#x8F83;&#x53EF;&#x7231;&#x53C8;&#x76F8;&#x5BF9;&#x901A;&#x7528;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;JSON Schema&#x89C4;&#x8303;&#x662F;&#x7EDF;&#x4E00;&#x7684;&#xFF0C;&#x4E0D;&#x7BA1;&#x54EA;&#x79CD;&#x524D;&#x7AEF;&#x6846;&#x67B6;&#x90FD;&#x662F;&#x76F8;&#x901A;&#x3002;</p><p>&#xFF08;&#x5B8C;&#xFF09;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ng-alain表单使用方式

## 原文链接
[https://segmentfault.com/a/1190000015573167](https://segmentfault.com/a/1190000015573167)

