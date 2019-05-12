---
title: 'Angular2 http服务' 
date: 2018-11-22 2:30:10
hidden: true
slug: 9g6f68y2uot
categories: [reprint]
---

{{< raw >}}
<p>angular2&#x7684;http&#x670D;&#x52A1;&#x662F;&#x7528;&#x4E8E;&#x4ECE;&#x540E;&#x53F0;&#x7A0B;&#x5E8F;&#x83B7;&#x53D6;&#x6216;&#x66F4;&#x65B0;&#x6570;&#x636E;&#x7684;&#x4E00;&#x79CD;&#x673A;&#x5236;&#xFF0C;&#x901A;&#x5E38;&#x60C5;&#x51B5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5C06;&#x4E0E;&#x540E;&#x53F0;&#x4EA4;&#x6362;&#x6570;&#x636E;&#x7684;&#x6A21;&#x5757;&#x505A;&#x51FA;angular&#x670D;&#x52A1;&#xFF0C;&#x5229;&#x7528;http&#x83B7;&#x53D6;&#x66F4;&#x65B0;&#x540E;&#x53F0;&#x6570;&#x636E;&#xFF0C;angular&#x4F7F;&#x7528;http&#x7684;get&#x6216;put&#x8FDB;&#x884C;&#x540E;&#x53F0;&#x8C03;&#x7528;&#x91C7;&#x7528;&#x7684;&#x662F;ajax&#x65B9;&#x5F0F;&#xFF0C;&#x8DE8;&#x57DF;&#x95EE;&#x9898;&#x9700;&#x8981;&#x5355;&#x72EC;&#x5904;&#x7406;&#x3002;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;&#xFF0C;&#x6F14;&#x793A;&#x4ECE;&#x540E;&#x53F0;web api&#x4E2D;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5E76;&#x8FDB;&#x884C;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x3002;</p><p>1&#x3001;&#x7531;&#x4E8E;&#x8981;&#x4F7F;&#x7528;http&#x670D;&#x52A1;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E00;&#x5B9A;&#x8981;&#x5728;&#x6211;&#x4EEC;&#x7684;web&#x9875;&#x9762;&#x9700;&#x8981;&#x5F15;&#x5165;<code>&lt;script src=&quot;node_modules/angular2/bundles/http.dev.js&quot;&gt;&lt;/script&gt;</code>&#xFF0C;&#x8FD9;&#x6B65;&#x5F88;&#x5173;&#x952E;&#xFF0C;&#x6211;&#x4E4B;&#x524D;&#x53D1;&#x751F;&#x7684;&#x627E;&#x4E0D;&#x5230;<code>http</code>&#x670D;&#x52A1;&#x7684;&#x539F;&#x56E0;&#x5C31;&#x5728;&#x6B64;&#xFF0C;&#x6D6A;&#x8D39;&#x4E86;&#x5F88;&#x591A;&#x65F6;&#x95F4;&#x5728;&#x6B64;&#x3002;<br>2&#x3001;&#x5728;<code>angular</code>&#x5165;&#x53E3;&#x8FD8;&#x9700;&#x5F15;&#x5165;<code>HTTP_PROVIDERS</code>&#xFF0C;&#x5E76;&#x6CE8;&#x5165;&#xFF0C;&#x540C;&#x65F6;&#x7531;&#x4E8E;&#x8981;&#x4F7F;&#x7528;map&#xFF0C;subscribe&#x7B49;&#x6240;&#x4EE5;&#x9700;&#x8981;&#x4F7F;&#x7528;<code>rxjs</code>&#x5E93;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x9700;&#x8981;&#x63D0;&#x524D;&#x5728;&#x5165;&#x53E3;&#x7A0B;&#x5E8F;&#x4E2D;&#x5F15;&#x5165;<code>import &apos;rxjs/Rx&apos;</code>&#xFF0C;&#x8840;&#x7684;&#x6559;&#x8BAD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {bootstrap} from &apos;angular2/platform/browser&apos;;

import {HTTP_PROVIDERS} from &apos;angular2/http&apos;;

import {myFrame} from &quot;./frame/component/myFrame.component&quot;;

import &apos;rxjs/Rx&apos;;

 

bootstrap(myFrame, [ HTTP_PROVIDERS]);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> {bootstrap} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular2/platform/browser&apos;</span>;

<span class="hljs-keyword">import</span> {HTTP_PROVIDERS} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular2/http&apos;</span>;

<span class="hljs-keyword">import</span> {myFrame} <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./frame/component/myFrame.component&quot;</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;rxjs/Rx&apos;</span>;

 

bootstrap(myFrame, [ HTTP_PROVIDERS]);

</code></pre><h2 id="articleHeader0">3&#x3001;&#x521B;&#x5EFA;&#x670D;&#x52A1;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Injectable} from &apos;angular2/core&apos;;

import {Http } from &apos;angular2/http&apos;;

 

@Injectable()

export class channelService {

    private _carsUrl: string = &quot;http://localhost:6611/api/Chanel&quot;;

    

constructor(private _http: Http) {

 

        }

getChannelList() {

    

    return this._http.get(this._carsUrl).map(responce =&gt; responce.json())

        

        

}

&#x5728;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;`http`&#x4E2D;&#x7684;`get`&#x6765;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;get&#x7684;`url&#xFF08;web api&#xFF09;`&#x662F;&#x4E0E;&#x6211;&#x76EE;&#x524D;&#x7684;`anuglar`&#x5E94;&#x7528;&#x5728;&#x4E00;&#x4E2A;&#x57DF;&#x5185;&#x3002;&#x4F5C;&#x4E3A;&#x670D;&#x52A1;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7533;&#x660E;&#x8BE5;&#x670D;&#x52A1;&#x662F;&#x53EF;&#x6CE8;&#x5165;&#x7684;`@Injectable()`

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {Injectable} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular2/core&apos;</span>;

<span class="hljs-keyword">import</span> {Http } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular2/http&apos;</span>;

 

<span class="hljs-meta">@Injectable</span>()

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> channelService {

    <span class="hljs-keyword">private</span> _carsUrl: <span class="hljs-built_in">string</span> = <span class="hljs-string">&quot;http://localhost:6611/api/Chanel&quot;</span>;

    

<span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> _http: Http</span>) {

 

        }

getChannelList() {

    

    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._http.get(<span class="hljs-keyword">this</span>._carsUrl).map(<span class="hljs-function"><span class="hljs-params">responce</span> =&gt;</span> responce.json())

        

        

}

&#x5728;&#x8FD9;&#x4E2A;&#x670D;&#x52A1;&#x4E2D;&#x4F7F;&#x7528;&#x4E86;<span class="hljs-string">`http`</span>&#x4E2D;&#x7684;<span class="hljs-string">`get`</span>&#x6765;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;<span class="hljs-keyword">get</span>&#x7684;<span class="hljs-string">`url&#xFF08;web api&#xFF09;`</span>&#x662F;&#x4E0E;&#x6211;&#x76EE;&#x524D;&#x7684;<span class="hljs-string">`anuglar`</span>&#x5E94;&#x7528;&#x5728;&#x4E00;&#x4E2A;&#x57DF;&#x5185;&#x3002;&#x4F5C;&#x4E3A;&#x670D;&#x52A1;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7533;&#x660E;&#x8BE5;&#x670D;&#x52A1;&#x662F;&#x53EF;&#x6CE8;&#x5165;&#x7684;<span class="hljs-string">`@Injectable()`</span>

</code></pre><h2 id="articleHeader1">4&#x3001;&#x670D;&#x52A1;&#x8C03;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {Component} from &apos;angular2/core&apos;;

 

import {appService} from &apos;./../service/appsetting.service&apos;

import {channelService} from &apos;./../service/channel.service&apos;

import {Channel} from &apos;./../model/channel&apos;

 

@Component({

    selector: &apos;topNav&apos;,

    templateUrl: &apos;../app/frame/template/topNav.html&apos;,

    providers: [appService, channelService]

})

export class topNav {

    webTitle: string;

    

    public items: Channel[];

    

   

    constructor(private _appService: appService,private _channelService:channelService) {  

        this.getWebTitle();

        this.getChannelList();

    }

    getWebTitle() {

        this.webTitle = this._appService.AppSetting.webTitle;

    }

    getChannelList() {

         this._channelService.getChannelList().subscribe(res =&gt; { this.items=res});

    }

    

 

} 
&#x8FD9;&#x91CC;&#x5C31;&#x548C;&#x666E;&#x901A;&#x670D;&#x52A1;&#x8C03;&#x7528;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x5148;import&#x518D;&#x5728;providers&#x4E2D;&#x7533;&#x660E;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x6CE8;&#x5165;&#x5C31;&#x884C;&#x4E86;&#x3002;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">import</span> {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;angular2/core&apos;</span>;

 

<span class="hljs-keyword">import</span> {appService} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./../service/appsetting.service&apos;</span>

<span class="hljs-keyword">import</span> {channelService} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./../service/channel.service&apos;</span>

<span class="hljs-keyword">import</span> {Channel} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./../model/channel&apos;</span>

 

<span class="hljs-meta">@Component</span>({

    selector: <span class="hljs-string">&apos;topNav&apos;</span>,

    templateUrl: <span class="hljs-string">&apos;../app/frame/template/topNav.html&apos;</span>,

    providers: [appService, channelService]

})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> topNav {

    webTitle: <span class="hljs-built_in">string</span>;

    

    <span class="hljs-keyword">public</span> items: Channel[];

    

   

    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> _appService: appService,<span class="hljs-keyword">private</span> _channelService:channelService</span>) {  

        <span class="hljs-keyword">this</span>.getWebTitle();

        <span class="hljs-keyword">this</span>.getChannelList();

    }

    getWebTitle() {

        <span class="hljs-keyword">this</span>.webTitle = <span class="hljs-keyword">this</span>._appService.AppSetting.webTitle;

    }

    getChannelList() {

         <span class="hljs-keyword">this</span>._channelService.getChannelList().subscribe(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> { <span class="hljs-keyword">this</span>.items=res});

    }

    

 

} 
&#x8FD9;&#x91CC;&#x5C31;&#x548C;&#x666E;&#x901A;&#x670D;&#x52A1;&#x8C03;&#x7528;&#x6CA1;&#x4EC0;&#x4E48;&#x533A;&#x522B;&#x4E86;&#xFF0C;&#x9700;&#x8981;&#x5148;<span class="hljs-keyword">import</span>&#x518D;&#x5728;providers&#x4E2D;&#x7533;&#x660E;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6784;&#x9020;&#x51FD;&#x6570;&#x4E2D;&#x6CE8;&#x5165;&#x5C31;&#x884C;&#x4E86;&#x3002;
</code></pre><p>&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x6709;&#x4E2A;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x6211;&#x4EEC;&#x524D;&#x7AEF;model&#x548C;&#x540E;&#x7AEF;model&#x6709;&#x53EF;&#x80FD;&#x4E0D;&#x4E00;&#x81F4;&#xFF0C;&#x90A3;&#x4E48;&#x9700;&#x8981;&#x5728;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#x518D;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#xFF0C;&#x5982;&#x679C;&#x7C7B;&#x578B;&#x5B57;&#x6BB5;&#x90FD;&#x4E00;&#x81F4;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#xFF0C;&#x7531;&#x4E8E;&#x662F;json&#x683C;&#x5F0F;&#xFF0C;&#x7CFB;&#x7EDF;&#x4F1A;&#x81EA;&#x52A8;&#x5C06;&#x540E;&#x53F0;model&#x8F6C;&#x6362;&#x4E3A;&#x6211;&#x4EEC;&#x524D;&#x7AEF;&#x4F7F;&#x7528;&#x7684;model</p><p>Web api&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class ChanelController : ApiController

    {

        // GET api/&lt;controller&gt;

        public IEnumerable&lt;Chanel&gt; Get()

        {

            return new Chanel[] { new Chanel{ ID=&quot;1&quot;, ChanelName=&quot;&#x7EC4;&#x7EC7;&#x673A;&#x6784;&quot;},new Chanel{ ID=&quot;2&quot;,ChanelName=&quot;&#x901A;&#x77E5;&#x516C;&#x544A;&quot;} };

        }

}

&#x6CE8;&#xFF1A;web api &#x53EF;&#x4EE5;&#x4F7F;&#x7528;Swashbuckle &#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x5B89;&#x88C5; PM&gt;Install-Package Swashbuckle&#xFF0C;&#x4F7F;&#x7528;&#x65F6;&#x53EA;&#x9700;&#x5728;&#x8DEF;&#x5F84;&#x540E;&#x52A0;&#x5165;swagger&#xFF0C;&#x5982;http://localhost:6611/swagger/ui/index" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChanelController</span> : <span class="hljs-title">ApiController</span>

    </span>{

        <span class="hljs-comment">// GET api/&lt;controller&gt;</span>

        <span class="hljs-keyword">public</span> IEnumerable&lt;Chanel&gt; Get()

        {

            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Chanel</span>[] { <span class="hljs-keyword">new</span> <span class="hljs-type">Chanel</span>{ ID=<span class="hljs-string">&quot;1&quot;</span>, ChanelName=<span class="hljs-string">&quot;&#x7EC4;&#x7EC7;&#x673A;&#x6784;&quot;</span>},<span class="hljs-keyword">new</span> <span class="hljs-type">Chanel</span>{ ID=<span class="hljs-string">&quot;2&quot;</span>,ChanelName=<span class="hljs-string">&quot;&#x901A;&#x77E5;&#x516C;&#x544A;&quot;</span>} };

        }

}

&#x6CE8;&#xFF1A;web api &#x53EF;&#x4EE5;&#x4F7F;&#x7528;Swashbuckle &#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x5B89;&#x88C5; PM&gt;Install-Package Swashbuckle&#xFF0C;&#x4F7F;&#x7528;&#x65F6;&#x53EA;&#x9700;&#x5728;&#x8DEF;&#x5F84;&#x540E;&#x52A0;&#x5165;swagger&#xFF0C;&#x5982;http:<span class="hljs-type"></span>//localhost:<span class="hljs-type">6611</span>/swagger/ui/index</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular2 http服务

## 原文链接
[https://segmentfault.com/a/1190000015703770](https://segmentfault.com/a/1190000015703770)

