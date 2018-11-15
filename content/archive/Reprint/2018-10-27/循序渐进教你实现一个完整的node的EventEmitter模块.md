---
title: 循序渐进教你实现一个完整的node的EventEmitter模块
reprint: true
categories: reprint
abbrlink: 967a17d9
date: 2018-10-27 02:30:17
---

{{% raw %}}
<p>node&#x7684;&#x4E8B;&#x4EF6;&#x6A21;&#x5757;&#x53EA;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E2A;&#x7C7B;&#xFF1A;EventEmitter&#x3002;&#x8FD9;&#x4E2A;&#x7C7B;&#x5728;node&#x7684;&#x5185;&#x7F6E;&#x6A21;&#x5757;&#x548C;&#x7B2C;&#x4E09;&#x65B9;&#x6A21;&#x5757;&#x4E2D;&#x5927;&#x91CF;&#x4F7F;&#x7528;&#x3002;EventEmitter&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x53EF;&#x4EE5;&#x6269;&#x5C55;node&#x5728;&#x591A;&#x4E2A;&#x8FDB;&#x7A0B;&#x6216;&#x7F51;&#x7EDC;&#x4E2D;&#x8FD0;&#x884C;&#x3002;&#x672C;&#x6587;&#x4ECE;node&#x7684;EventEmitter&#x7684;&#x4F7F;&#x7528;&#x51FA;&#x53D1;&#xFF0C;&#x5FAA;&#x5E8F;&#x6E10;&#x8FDB;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5B8C;&#x6574;&#x7684;EventEmitter&#x6A21;&#x5757;&#x3002;</p><blockquote><ul><li>EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x548C;&#x7B80;&#x5355;&#x5B9E;&#x73B0;</li><li>node&#x4E2D;&#x5E38;&#x7528;&#x7684;EventEmitter&#x6A21;&#x5757;&#x7684;API</li><li>EventEmitter&#x6A21;&#x5757;&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;</li><li>&#x5B8C;&#x6574;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;EventEmitter&#x6A21;&#x5757;</li></ul></blockquote><p>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://github.com/forthealllight/blog/issues/21" rel="nofollow noreferrer" target="_blank">https://github.com/forthealll...</a></p><p>&#x5982;&#x679C;&#x6587;&#x7AE0;&#x5BF9;&#x60A8;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x60A8;&#x7684;star&#x662F;&#x5BF9;&#x6211;&#x6700;&#x597D;&#x7684;&#x9F13;&#x52B1;&#xFF5E;</p><h3 id="articleHeader0">&#x4E00;&#x3001;EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x548C;&#x7B80;&#x5355;&#x5B9E;&#x73B0;</h3><h4>(1) EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;</h4><p>&#x9996;&#x5148;&#x5148;&#x4E86;&#x89E3;&#x4E00;&#x4E0B;EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#xFF0C;EventEmitter&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;&#xFF0C;&#x6240;&#x8C13;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#xFF1A;</p><p><strong><em>&#x5B83;&#x5B9A;&#x4E49;&#x4E86;&#x5BF9;&#x8C61;&#x95F4;&#x7684;&#x4E00;&#x79CD;&#x4E00;&#x5BF9;&#x591A;&#x7684;&#x5173;&#x7CFB;&#xFF0C;&#x8BA9;&#x591A;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x5BF9;&#x8C61;&#x540C;&#x65F6;&#x76D1;&#x542C;&#x67D0;&#x4E00;&#x4E2A;&#x4E3B;&#x9898;&#x5BF9;&#x8C61;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x4F9D;&#x8D56;&#x4E8E;&#x5B83;&#x7684;&#x5BF9;&#x8C61;&#x90FD;&#x5C06;&#x5F97;&#x5230;&#x901A;&#x77E5;&#x3002;</em></strong></p><p>&#x56E0;&#x6B64;&#x6700;&#x57FA;&#x672C;&#x7684;EventEmitter&#x529F;&#x80FD;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E2A;&#x89C2;&#x5BDF;&#x8005;&#x548C;&#x4E00;&#x4E2A;&#x88AB;&#x76D1;&#x542C;&#x7684;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x5E94;&#x7684;&#x5B9E;&#x73B0;&#x5C31;&#x662F;EventEmitter&#x4E2D;&#x7684;on&#x548C;emit&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var eventEmitter=new events.EventEmitter();
eventEmitter.on(&apos;say&apos;,function(name){
    console.log(&apos;Hello&apos;,name);
})
eventEmitter.emit(&apos;say&apos;,&apos;Jony yu&apos;);
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> events=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;events&apos;</span>);
<span class="hljs-keyword">var</span> eventEmitter=<span class="hljs-keyword">new</span> events.EventEmitter();
eventEmitter.on(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;Hello&apos;</span>,name);
})
eventEmitter.emit(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;Jony yu&apos;</span>);
</code></pre><p>eventEmitter&#x662F;EventEmitter&#x6A21;&#x5757;&#x7684;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#xFF0C;eventEmitter&#x7684;emit&#x65B9;&#x6CD5;&#xFF0C;&#x53D1;&#x51FA;say&#x4E8B;&#x4EF6;&#xFF0C;&#x901A;&#x8FC7;eventEmitter&#x7684;on&#x65B9;&#x6CD5;&#x76D1;&#x542C;&#xFF0C;&#x4ECE;&#x800C;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x51FD;&#x6570;&#x3002;</p><h4>(2) &#x7B80;&#x5355;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;EventEmitter&#x6A21;&#x5757;</h4><p>&#x6839;&#x636E;&#x4E0A;&#x8FF0;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E86;EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x7840;&#x529F;&#x80FD;emit&#x548C;on&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x5305;&#x542B;emit&#x548C;on&#x65B9;&#x6CD5;&#x7684;EventEmitter&#x7C7B;&#x3002;</p><p>on(eventName,callback)&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;&#x4E00;&#x4E2A;&#x662F;&#x4E8B;&#x4EF6;&#x540D;&#xFF08;eventName&#xFF09;&#xFF0C;&#x53E6;&#x4E00;&#x4E2A;&#x662F;&#x76F8;&#x5E94;&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x9009;&#x62E9;&#x5728;on&#x7684;&#x65F6;&#x5019;&#x9488;&#x5BF9;&#x4E8B;&#x4EF6;&#x540D;&#x6DFB;&#x52A0;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x7528;&#x5BF9;&#x8C61;&#x6765;&#x5305;&#x542B;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x3002;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x4E2D;&#x5BF9;&#x8C61;&#x540D;&#x8868;&#x793A;&#x4E8B;&#x4EF6;&#x540D;&#xFF08;eventName),&#x800C;&#x5BF9;&#x8C61;&#x7684;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x8868;&#x793A;&#x8BE5;&#x4E8B;&#x4EF6;&#x540D;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3002;</p><p>emit(eventName,...arg)&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x4E3A;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C;&#x5176;&#x4ED6;&#x53C2;&#x6570;&#x4E8B;&#x4EF6;&#x5BF9;&#x5E94;&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5B9E;&#x53C2;&#xFF0C;emit&#x65B9;&#x6CD5;&#x7684;&#x529F;&#x80FD;&#x5C31;&#x662F;&#x4ECE;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x4E2D;&#xFF0C;&#x5BFB;&#x627E;&#x5BF9;&#x5E94;key&#x4E3A;eventName&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x6267;&#x884C;&#x8BE5;&#x5C5E;&#x6027;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x7EC4;&#x91CC;&#x9762;&#x6BCF;&#x4E00;&#x4E2A;&#x6267;&#x884C;&#x51FD;&#x6570;&#x3002;</p><p>&#x4E0B;&#x9762;&#x6765;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;EventEmitter&#x7C7B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EventEmitter{
   constructor(){
      this.handler={};
   }
   on(eventName,callback){
      if(!this.handles){
        this.handles={};
      }
      if(!this.handles[eventName]){
        this.handles[eventName]=[];
      }
      this.handles[eventName].push(callback);
   }
   emit(eventName,...arg){
       if(this.handles[eventName]){
     for(var i=0;i&lt;this.handles[eventName].length;i++){
       this.handles[eventName][i](...arg);
     }
   }
   
   }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEmitter</span></span>{
   <span class="hljs-keyword">constructor</span>(){
      <span class="hljs-keyword">this</span>.handler={};
   }
   on(eventName,callback){
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.handles){
        <span class="hljs-keyword">this</span>.handles={};
      }
      <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.handles[eventName]){
        <span class="hljs-keyword">this</span>.handles[eventName]=[];
      }
      <span class="hljs-keyword">this</span>.handles[eventName].push(callback);
   }
   emit(eventName,...arg){
       <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.handles[eventName]){
     <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.handles[eventName].length;i++){
       <span class="hljs-keyword">this</span>.handles[eventName][i](...arg);
     }
   }
   
   }
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x5C31;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;EventEmitter&#x7C7B;&#xFF0C;&#x4E0B;&#x9762;&#x6765;&#x5B9E;&#x4F8B;&#x5316;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let event=new EventEmitter();
event.on(&apos;say&apos;,function(str){
   console.log(str);
});
event.emit(&apos;say&apos;,&apos;hello Jony yu&apos;);
//&#x8F93;&#x51FA;hello Jony yu
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs oxygene"><code>let <span class="hljs-keyword">event</span>=<span class="hljs-keyword">new</span> EventEmitter();
<span class="hljs-keyword">event</span>.on(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(str)</span><span class="hljs-comment">{
   console.log(str);
}</span>);</span>
<span class="hljs-keyword">event</span>.emit(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;hello Jony yu&apos;</span>);
<span class="hljs-comment">//&#x8F93;&#x51FA;hello Jony yu</span>
</code></pre><h3 id="articleHeader1">&#x4E8C;&#x3001;node&#x4E2D;&#x5E38;&#x7528;&#x7684;EventEmitter&#x6A21;&#x5757;&#x7684;API</h3><p>&#x8DDF;&#x5728;&#x4E0A;&#x8FF0;&#x7B80;&#x5355;&#x7684;EventEmitter&#x6A21;&#x5757;&#x4E0D;&#x540C;&#xFF0C;node&#x7684;EventEmitter&#x8FD8;&#x5305;&#x542B;&#x4E86;&#x5F88;&#x591A;&#x5E38;&#x7528;&#x7684;API&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x4E00;&#x6765;&#x4ECB;&#x7ECD;&#x51E0;&#x4E2A;&#x5B9E;&#x7528;&#x7684;API.</p><table><thead><tr><th>&#x65B9;&#x6CD5;&#x540D;</th><th align="center">&#x65B9;&#x6CD5;&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>addListener(event, listener)</td><td align="center">&#x4E3A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#x5230;&#x76D1;&#x542C;&#x5668;&#x6570;&#x7EC4;&#x7684;&#x5C3E;&#x90E8;&#x3002;</td><td></td></tr><tr><td>prependListener(event,listener)</td><td align="center">&#x4E0E;addListener&#x76F8;&#x5BF9;&#xFF0C;&#x4E3A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#x5230;&#x76D1;&#x542C;&#x5668;&#x6570;&#x7EC4;&#x7684;&#x5934;&#x90E8;&#x3002;</td><td></td></tr><tr><td>on(event, listener)</td><td align="center">&#x5176;&#x5B9E;&#x5C31;&#x662F;addListener&#x7684;&#x522B;&#x540D;</td><td></td></tr><tr><td>once(event, listener)</td><td align="center">&#x4E3A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x6CE8;&#x518C;&#x4E00;&#x4E2A;&#x5355;&#x6B21;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x5373; &#x76D1;&#x542C;&#x5668;&#x6700;&#x591A;&#x53EA;&#x4F1A;&#x89E6;&#x53D1;&#x4E00;&#x6B21;&#xFF0C;&#x89E6;&#x53D1;&#x540E;&#x7ACB;&#x523B;&#x89E3;&#x9664;&#x8BE5;&#x76D1;&#x542C;&#x5668;&#x3002;</td><td></td></tr><tr><td>removeListener(event, listener)</td><td align="center">&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x67D0;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x76D1;&#x542C;&#x5668;&#x5FC5;&#x987B;&#x662F;&#x8BE5;&#x4E8B;&#x4EF6;&#x5DF2;&#x7ECF;&#x6CE8;&#x518C;&#x8FC7;&#x7684;&#x76D1;&#x542C;&#x5668;</td><td></td></tr><tr><td>off(event, listener)</td><td align="center">removeListener&#x7684;&#x522B;&#x540D;</td><td></td></tr><tr><td>removeAllListeners([event])</td><td align="center">&#x79FB;&#x9664;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x5668;&#xFF0C; &#x5982;&#x679C;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5219;&#x79FB;&#x9664;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x6240;&#x6709;&#x76D1;&#x542C;&#x5668;&#x3002;</td><td></td></tr><tr><td>setMaxListeners(n)</td><td align="center">&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C; EventEmitters &#x5982;&#x679C;&#x4F60;&#x6DFB;&#x52A0;&#x7684;&#x76D1;&#x542C;&#x5668;&#x8D85;&#x8FC7; 10 &#x4E2A;&#x5C31;&#x4F1A;&#x8F93;&#x51FA;&#x8B66;&#x544A;&#x4FE1;&#x606F;&#x3002; setMaxListeners &#x51FD;&#x6570;&#x7528;&#x4E8E;&#x63D0;&#x9AD8;&#x76D1;&#x542C;&#x5668;&#x7684;&#x9ED8;&#x8BA4;&#x9650;&#x5236;&#x7684;&#x6570;&#x91CF;&#x3002;</td><td></td></tr><tr><td>listeners(event)</td><td align="center">&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#x5668;&#x6570;&#x7EC4;&#x3002;</td><td></td></tr><tr><td>emit(event, [arg1], [arg2], [...])</td><td align="center">&#x6309;&#x53C2;&#x6570;&#x7684;&#x987A;&#x5E8F;&#x6267;&#x884C;&#x6BCF;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x5982;&#x679C;&#x4E8B;&#x4EF6;&#x6709;&#x6CE8;&#x518C;&#x76D1;&#x542C;&#x8FD4;&#x56DE; true&#xFF0C;&#x5426;&#x5219;&#x8FD4;&#x56DE; false&#x3002;</td><td></td></tr></tbody></table><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x6709;2&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x624B;&#x52A8;&#x6DFB;&#x52A0;&#xFF0C;node&#x7684;EventEmitter&#x6A21;&#x5757;&#x81EA;&#x5E26;&#x7684;&#x7279;&#x6B8A;&#x4E8B;&#x4EF6;&#xFF1A;</p><table><thead><tr><th>&#x4E8B;&#x4EF6;&#x540D;</th><th align="center">&#x4E8B;&#x4EF6;&#x63CF;&#x8FF0;</th></tr></thead><tbody><tr><td>newListener</td><td align="center">&#x8BE5;&#x4E8B;&#x4EF6;&#x5728;&#x6DFB;&#x52A0;&#x65B0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;</td><td></td></tr><tr><td>removeListener</td><td align="center">&#x4ECE;&#x6307;&#x5B9A;&#x76D1;&#x542C;&#x5668;&#x6570;&#x7EC4;&#x4E2D;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#x3002;&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#xFF0C;&#x6B64;&#x64CD;&#x4F5C;&#x5C06;&#x4F1A;&#x6539;&#x53D8;&#x5904;&#x4E8E;&#x88AB;&#x5220;&#x76D1;&#x542C;&#x5668;&#x4E4B;&#x540E;&#x7684;&#x90A3;&#x4E9B;&#x76D1;&#x542C;&#x5668;&#x7684;&#x7D22;&#x5F15;</td><td></td></tr></tbody></table><p>&#x4E0A;&#x8FF0;node&#x7684;EventEmitter&#x7684;&#x6A21;&#x5757;&#x770B;&#x8D77;&#x6765;&#x5F88;&#x591A;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x5176;&#x5B9E;&#x4E0A;&#x8FF0;&#x7684;API&#x4E2D;&#x5305;&#x542B;&#x4E86;&#x4E00;&#x4E9B;&#x522B;&#x540D;&#xFF0C;&#x4ED4;&#x7EC6;&#x6574;&#x7406;&#xFF0C;&#x7406;&#x89E3;&#x5176;&#x4F7F;&#x7528;&#x548C;&#x5B9E;&#x73B0;&#x4E0D;&#x662F;&#x5F88;&#x56F0;&#x96BE;&#xFF0C;&#x4E0B;&#x9762;&#x4E00;&#x4E00;&#x5BF9;&#x6BD4;&#x548C;&#x4ECB;&#x7ECD;&#x4E0A;&#x8FF0;&#x7684;API&#x3002;</p><h4>(1) addListener&#x548C;removeListener&#x3001;on&#x548C;off&#x65B9;&#x6CD5;</h4><p>addListener(eventName,listener)&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4E3A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;. &#x5176;&#x522B;&#x540D;&#x4E3A;on</p><p>removeListener(eventName,listener)&#x7684;&#x4F5C;&#x7528;&#x662F;&#x4E3A;&#x79FB;&#x9664;&#x67D0;&#x4E2A;&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#x5668;. &#x5176;&#x522B;&#x540D;&#x4E3A;off</p><p>&#x518D;&#x6B21;&#x9700;&#x8981;&#x5F3A;&#x8C03;&#x7684;&#x662F;&#xFF1A;<strong><em>addListener&#x7684;&#x522B;&#x540D;&#x662F;on&#xFF0C;removeListener&#x7684;&#x522B;&#x540D;&#x662F;off</em></strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EventEmitter.prototype.on=EventEmitter.prototype.addListener
EventEmitter.prototype.off=EventEmitter.prototype.removeListener
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.on</span>=EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.addListener</span>
EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.off</span>=EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.removeListener</span>
</code></pre><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x5177;&#x4F53;&#x7684;&#x7528;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var emitter=new events.EventEmitter();
function hello1(name){
  console.log(&quot;hello 1&quot;,name);
}
function hello2(name){
  console.log(&quot;hello 2&quot;,name);
}
emitter.addListener(&apos;say&apos;,hello1);
emitter.addListener(&apos;say&apos;,hello2);
emitter.emit(&apos;say&apos;,&apos;Jony&apos;);
//&#x8F93;&#x51FA;hello 1 Jony 
//&#x8F93;&#x51FA;hello 2 Jony
emitter.removeListener(&apos;say&apos;,hello1);
emitter.emit(&apos;say&apos;,&apos;Jony&apos;);
//&#x76F8;&#x5E94;&#x7684;&#x76D1;&#x542C;say&#x4E8B;&#x4EF6;&#x7684;hello1&#x4E8B;&#x4EF6;&#x88AB;&#x79FB;&#x9664;
//&#x53EA;&#x8F93;&#x51FA;hello 2 Jony
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> events=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;events&apos;</span>);
<span class="hljs-keyword">var</span> emitter=<span class="hljs-keyword">new</span> events.EventEmitter();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello1</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello 1&quot;</span>,name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello2</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello 2&quot;</span>,name);
}
emitter.addListener(<span class="hljs-string">&apos;say&apos;</span>,hello1);
emitter.addListener(<span class="hljs-string">&apos;say&apos;</span>,hello2);
emitter.emit(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;Jony&apos;</span>);
<span class="hljs-comment">//&#x8F93;&#x51FA;hello 1 Jony </span>
<span class="hljs-comment">//&#x8F93;&#x51FA;hello 2 Jony</span>
emitter.removeListener(<span class="hljs-string">&apos;say&apos;</span>,hello1);
emitter.emit(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;Jony&apos;</span>);
<span class="hljs-comment">//&#x76F8;&#x5E94;&#x7684;&#x76D1;&#x542C;say&#x4E8B;&#x4EF6;&#x7684;hello1&#x4E8B;&#x4EF6;&#x88AB;&#x79FB;&#x9664;</span>
<span class="hljs-comment">//&#x53EA;&#x8F93;&#x51FA;hello 2 Jony</span>
</code></pre><h4>(2) removeListener&#x548C;removeAllListeners</h4><p>removeListener&#x6307;&#x7684;&#x662F;&#x79FB;&#x9664;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x67D0;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x800C;removeAllListeners&#x6307;&#x7684;&#x662F;&#x79FB;&#x9664;&#x67D0;&#x4E00;&#x4E2A;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x5168;&#x90E8;&#x76D1;&#x542C;&#x5668;&#x3002;<br>&#x8FD9;&#x91CC;&#x4E3E;&#x4F8B;&#x4E00;&#x4E2A;removeAllListeners&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var emitter=new events.EventEmitter();
function hello1(name){
  console.log(&quot;hello 1&quot;,name);
}
function hello2(name){
  console.log(&quot;hello 2&quot;,name);
}
emitter.addListener(&apos;say&apos;,hello1);
emitter.addListener(&apos;say&apos;,hello2);
emitter.removeAllListeners(&apos;say&apos;);
emitter.emit(&apos;say&apos;,&apos;Jony&apos;);
//removeAllListeners&#x79FB;&#x9664;&#x4E86;&#x6240;&#x6709;&#x5173;&#x4E8E;say&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;
//&#x56E0;&#x6B64;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x8F93;&#x51FA;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> events=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;events&apos;</span>);
<span class="hljs-keyword">var</span> emitter=<span class="hljs-keyword">new</span> events.EventEmitter();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello1</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello 1&quot;</span>,name);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello2</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello 2&quot;</span>,name);
}
emitter.addListener(<span class="hljs-string">&apos;say&apos;</span>,hello1);
emitter.addListener(<span class="hljs-string">&apos;say&apos;</span>,hello2);
emitter.removeAllListeners(<span class="hljs-string">&apos;say&apos;</span>);
emitter.emit(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;Jony&apos;</span>);
<span class="hljs-comment">//removeAllListeners&#x79FB;&#x9664;&#x4E86;&#x6240;&#x6709;&#x5173;&#x4E8E;say&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;</span>
<span class="hljs-comment">//&#x56E0;&#x6B64;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x8F93;&#x51FA;</span>
</code></pre><h4>(3) on&#x548C;once&#x65B9;&#x6CD5;</h4><p>on&#x548C;once&#x7684;&#x533A;&#x522B;&#x662F;&#xFF1A;</p><p><strong><em>on&#x7684;&#x65B9;&#x6CD5;&#x5BF9;&#x4E8E;&#x67D0;&#x4E00;&#x6307;&#x5B9A;&#x4E8B;&#x4EF6;&#x6DFB;&#x52A0;&#x7684;&#x76D1;&#x542C;&#x5668;&#x53EF;&#x4EE5;&#x6301;&#x7EED;&#x4E0D;&#x65AD;&#x7684;&#x76D1;&#x542C;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x800C;once&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x7684;&#x76D1;&#x542C;&#x5668;&#xFF0C;&#x76D1;&#x542C;&#x4E00;&#x6B21;&#x540E;&#xFF0C;&#x5C31;&#x4F1A;&#x88AB;&#x6D88;&#x9664;&#x3002;</em></strong></p><p>&#x6BD4;&#x5982;on&#x65B9;&#x6CD5;&#xFF08;&#x8DDF;addListener&#x76F8;&#x540C;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var emitter=new events.EventEmitter();
function hello(name){
  console.log(&quot;hello&quot;,name);
}
emitter.on(&apos;say&apos;,hello);
emitter.emit(&apos;say&apos;,&apos;Jony&apos;);
emitter.emit(&apos;say&apos;,&apos;yu&apos;);
emitter.emit(&apos;say&apos;,&apos;me&apos;);
//&#x4F1A;&#x4E00;&#x6B21;&#x8F93;&#x51FA; hello Jony&#x3001;hello yu&#x3001;hello me
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mel"><code>var events=require(<span class="hljs-string">&apos;events&apos;</span>);
var <span class="hljs-keyword">emitter</span>=new events.EventEmitter();
function hello(name){
  console.<span class="hljs-keyword">log</span>(<span class="hljs-string">&quot;hello&quot;</span>,name);
}
<span class="hljs-keyword">emitter</span>.on(<span class="hljs-string">&apos;say&apos;</span>,hello);
<span class="hljs-keyword">emitter</span>.<span class="hljs-keyword">emit</span>(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;Jony&apos;</span>);
<span class="hljs-keyword">emitter</span>.<span class="hljs-keyword">emit</span>(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;yu&apos;</span>);
<span class="hljs-keyword">emitter</span>.<span class="hljs-keyword">emit</span>(<span class="hljs-string">&apos;say&apos;</span>,<span class="hljs-string">&apos;me&apos;</span>);
<span class="hljs-comment">//&#x4F1A;&#x4E00;&#x6B21;&#x8F93;&#x51FA; hello Jony&#x3001;hello yu&#x3001;hello me</span>
</code></pre><p>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;on&#x65B9;&#x6CD5;&#x76D1;&#x542C;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x6301;&#x7EED;&#x4E0D;&#x65AD;&#x7684;&#x88AB;&#x89E6;&#x53D1;&#x3002;</p><h4>(4) &#x4E24;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x4E8B;&#x4EF6;newListener&#x548C;removeListener</h4><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x5F53;&#x5B9E;&#x4F8B;&#x5316;EventEmitter&#x6A21;&#x5757;&#x4E4B;&#x540E;&#xFF0C;&#x76D1;&#x542C;&#x5BF9;&#x8C61;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x6240;&#x6709;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x800C;&#x8FD9;&#x4E24;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x65B9;&#x6CD5;&#x5C31;&#x662F;&#x9488;&#x5BF9;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x6DFB;&#x52A0;&#x548C;&#x79FB;&#x9664;&#x7684;&#x3002;</p><p>newListener&#xFF1A;<strong><em>&#x5728;&#x6DFB;&#x52A0;&#x65B0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x89E6;&#x53D1;</em></strong><br>removeListener&#xFF1A;<strong><em>&#x5728;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x65F6;&#x89E6;&#x53D1;</em></strong></p><p>&#x4EE5;newListener&#x4E3A;&#x4F8B;&#xFF0C;&#x4F1A;&#x5728;&#x6DFB;&#x52A0;&#x65B0;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x7684;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var emitter=new events.EventEmitter();

function hello(name){
  console.log(&quot;hello&quot;,name);
}
emitter.on(&apos;newListener&apos;,function(eventName,listener){
  console.log(eventName);
  console.log(listener);
});
emitter.addListener(&apos;say&apos;,hello);
//&#x8F93;&#x51FA;say&#x548C;[Function: hello]
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> events=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;events&apos;</span>);
<span class="hljs-keyword">var</span> emitter=<span class="hljs-keyword">new</span> events.EventEmitter();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params">name</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&quot;hello&quot;</span>,name);
}
emitter.on(<span class="hljs-string">&apos;newListener&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">eventName,listener</span>)</span>{
  <span class="hljs-built_in">console</span>.log(eventName);
  <span class="hljs-built_in">console</span>.log(listener);
});
emitter.addListener(<span class="hljs-string">&apos;say&apos;</span>,hello);
<span class="hljs-comment">//&#x8F93;&#x51FA;say&#x548C;[Function: hello]</span>
</code></pre><p>&#x4ECE;&#x4E0A;&#x8FF0;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x770B;&#xFF0C;&#x6BCF;&#x5F53;&#x6DFB;&#x52A0;&#x65B0;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x90FD;&#x4F1A;&#x81EA;&#x52A8;&#x7684;emit&#x4E00;&#x4E2A;&#x201C;newListener&#x201D;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E14;&#x53C2;&#x6570;&#x4E3A;eventName(&#x65B0;&#x4E8B;&#x4EF6;&#x7684;&#x540D;)&#x548C;listener(&#x65B0;&#x4E8B;&#x4EF6;&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570;)&#x3002;</p><p>&#x540C;&#x7406;&#x7279;&#x6B8A;&#x4E8B;&#x4EF6;removeListener&#x4E5F;&#x662F;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5F53;&#x4E8B;&#x4EF6;&#x88AB;&#x79FB;&#x9664;&#xFF0C;&#x4F1A;&#x81EA;&#x52A8;emit&#x4E00;&#x4E2A;&quot;removeListener&quot;&#x4E8B;&#x4EF6;&#x3002;</p><h3 id="articleHeader2">&#x4E09;&#x3001;EventEmitter&#x6A21;&#x5757;&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;</h3><h4>(1) node&#x4E2D;&#x7684;try catch&#x5F02;&#x5E38;&#x5904;&#x7406;&#x65B9;&#x6CD5;</h4><p>&#x5728;node&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;try catch&#x65B9;&#x5F0F;&#x6765;&#x6355;&#x83B7;&#x548C;&#x5904;&#x7406;&#x5F02;&#x5E38;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let x=x;
} catch (e) {
  console.log(e);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> x=x;
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.log(e);
}</code></pre><p>&#x4E0A;&#x8FF0;let x=x &#x8D4B;&#x503C;&#x8BED;&#x53E5;&#x7684;&#x9519;&#x8BEF;&#x4F1A;&#x88AB;&#x6355;&#x83B7;&#x3002;&#x8FD9;&#x91CC;&#x63D0;&#x5F02;&#x5E38;&#x5904;&#x7406;&#xFF0C;&#x90A3;&#x4E48;&#x8DDF;&#x4E8B;&#x4EF6;&#x6709;&#x4EC0;&#x4E48;&#x5173;&#x7CFB;&#x5462;&#xFF1F;</p><p>node&#x4E2D;&#x6709;&#x4E00;&#x4E2A;&#x7279;&#x6B8A;&#x7684;&#x4E8B;&#x4EF6;error&#xFF0C;&#x5982;&#x679C;&#x5F02;&#x5E38;&#x6CA1;&#x6709;&#x88AB;&#x6355;&#x83B7;&#xFF0C;&#x5C31;&#x4F1A;&#x89E6;&#x53D1;process&#x7684;uncaughtException&#x4E8B;&#x4EF6;&#x629B;&#x51FA;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x6CE8;&#x518C;&#x8BE5;&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#x5668;&#xFF08;&#x5373;&#x8BE5;&#x4E8B;&#x4EF6;&#x6CA1;&#x6709;&#x88AB;&#x5904;&#x7406;&#xFF09;&#xFF0C;&#x5219; Node.js &#x4F1A;&#x5728;&#x63A7;&#x5236;&#x53F0;&#x6253;&#x5370;&#x8BE5;&#x5F02;&#x5E38;&#x7684;&#x5806;&#x6808;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x7ED3;&#x675F;&#x8FDB;&#x7A0B;&#x3002;</p><p>&#x6BD4;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events=require(&apos;events&apos;);
var emitter=new events.EventEmitter();
emitter.emit(&apos;error&apos;);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> events=require(<span class="hljs-string">&apos;events&apos;</span>);
<span class="hljs-keyword">var</span> emitter=<span class="hljs-keyword">new</span> <span class="hljs-type">events</span>.EventEmitter();
emitter.emit(<span class="hljs-string">&apos;error&apos;</span>);</code></pre><p>&#x5728;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#x6CA1;&#x6709;&#x76D1;&#x542C;error&#x7684;&#x4E8B;&#x4EF6;&#x51FD;&#x6570;&#xFF0C;&#x56E0;&#x6B64;&#x4F1A;&#x89E6;&#x53D1;process&#x7684;uncaughtException&#x4E8B;&#x4EF6;&#xFF0C;&#x4ECE;&#x800C;&#x6253;&#x5370;&#x5F02;&#x5E38;&#x5806;&#x6808;&#x4FE1;&#x606F;&#xFF0C;&#x5E76;&#x7ED3;&#x675F;&#x8FDB;&#x7A0B;&#x3002;</p><p>&#x5BF9;&#x4E8E;&#x963B;&#x585E;&#x6216;&#x8005;&#x8BF4;&#x975E;&#x5F02;&#x6B65;&#x7684;&#x5F02;&#x5E38;&#x6355;&#x83B7;&#xFF0C;try catch&#x662F;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#xFF1A;</p><p><strong><em>try catch&#x4E0D;&#x80FD;&#x6355;&#x83B7;&#x975E;&#x963B;&#x585E;&#x6216;&#x8005;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x7684;&#x5F02;&#x5E38;&#x3002;</em></strong></p><p>&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let x=x;//&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;
} catch (e) {
  console.log(&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;);
  console.log(e);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> x=x;<span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;</span>
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;</span>);
  <span class="hljs-built_in">console</span>.log(e);
}
</code></pre><p>&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#x4E2D;&#xFF0C;&#x4EE5;&#x4E3A;try&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x3002;&#x5982;&#x679C;try&#x65B9;&#x6CD5;&#x91CC;&#x9762;&#x6709;&#x5F02;&#x6B65;&#x7684;&#x51FD;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  process.nextTick(function(){
      let x=x; //&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;
  });
} catch (e) {
  console.log(&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;);
  console.log(e);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-keyword">let</span> x=x; <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;</span>
  });
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;</span>);
  <span class="hljs-built_in">console</span>.log(e);
}
</code></pre><p>&#x56E0;&#x4E3A;process.nextTick&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x5728;process.nextTick&#x5185;&#x90E8;&#x7684;&#x9519;&#x8BEF;&#x4E0D;&#x80FD;&#x88AB;&#x6355;&#x83B7;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;try catch&#x4E0D;&#x80FD;&#x6355;&#x83B7;&#x975E;&#x963B;&#x585E;&#x51FD;&#x6570;&#x5185;&#x7684;&#x5F02;&#x5E38;&#x3002;</p><h4>(2) &#x901A;&#x8FC7;domains&#x7BA1;&#x7406;&#x5F02;&#x5E38;</h4><p>node&#x4E2D;domain&#x6A21;&#x5757;&#x80FD;&#x88AB;&#x7528;&#x6765;&#x96C6;&#x4E2D;&#x5730;&#x5904;&#x7406;&#x591A;&#x4E2A;&#x5F02;&#x5E38;&#x64CD;&#x4F5C;&#xFF0C;&#x901A;&#x8FC7;node&#x7684;domain&#x6A21;&#x5757;&#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x975E;&#x963B;&#x585E;&#x51FD;&#x6570;&#x5185;&#x7684;&#x5F02;&#x5E38;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var domain=require(&apos;domain&apos;);
var eventDomain=domain.create();
eventDomain.on(&apos;error&apos;,function(err){
  console.log(&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&#x4E86;&apos;);
  console.log(err);
});
eventDomain.run(function(){
   process.nextTick(function(){
     let x=x;//&#x629B;&#x51FA;&#x5F02;&#x5E38;
   });
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> domain=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;domain&apos;</span>);
<span class="hljs-keyword">var</span> eventDomain=domain.create();
eventDomain.on(<span class="hljs-string">&apos;error&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&#x4E86;&apos;</span>);
  <span class="hljs-built_in">console</span>.log(err);
});
eventDomain.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">let</span> x=x;<span class="hljs-comment">//&#x629B;&#x51FA;&#x5F02;&#x5E38;</span>
   });
});
</code></pre><p>&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5373;&#x4F7F;process.nextTick&#x662F;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#xFF0C;domain.on&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x8FD9;&#x4E2A;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5F02;&#x5E38;&#x3002;</p><p>&#x5373;&#x4F7F;&#x66F4;&#x590D;&#x6742;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6BD4;&#x5982;&#x5F02;&#x6B65;&#x5D4C;&#x5957;&#x5F02;&#x6B65;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;domain.on&#x65B9;&#x6CD5;&#x4E5F;&#x53EF;&#x4EE5;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var domain=require(&apos;domain&apos;);
var eventDomain=domain.create();
eventDomain.on(&apos;error&apos;,function(err){
  console.log(&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&#x4E86;&apos;);
  console.log(err);
});
eventDomain.run(function(){
   process.nextTick(function(){
     setTimeout(function(){
       setTimeout(function(){
         let x=x;
       },0);
     },0);
   });
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> domain=<span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;domain&apos;</span>);
<span class="hljs-keyword">var</span> eventDomain=domain.create();
eventDomain.on(<span class="hljs-string">&apos;error&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&#x4E86;&apos;</span>);
  <span class="hljs-built_in">console</span>.log(err);
});
eventDomain.run(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
   process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
       setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
         <span class="hljs-keyword">let</span> x=x;
       },<span class="hljs-number">0</span>);
     },<span class="hljs-number">0</span>);
   });
});
</code></pre><p>&#x5728;&#x4E0A;&#x8FF0;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x5373;&#x4F7F;&#x5F02;&#x6B65;&#x5D4C;&#x5957;&#x5F88;&#x590D;&#x6742;&#xFF0C;&#x4E5F;&#x80FD;&#x5728;&#x6700;&#x5916;&#x5C42;&#x6355;&#x83B7;&#x5230;&#x5F02;&#x5E38;&#x3002;</p><h4>(3) domain&#x6A21;&#x5757;&#x7F3A;&#x9677;</h4><p>&#x5728;node&#x6700;&#x65B0;&#x7684;&#x6587;&#x6863;&#x4E2D;&#xFF0C;domain&#x88AB;&#x5E9F;&#x9664;&#xFF08;&#x88AB;&#x6807;&#x8BB0;&#x4E3A;&#xFF1A;Deprecated&#xFF09;&#xFF0C;domain&#x4ECE;&#x8BDE;&#x751F;&#x4E4B;&#x65E5;&#x8D77;&#x5C31;&#x6709;&#x7740;&#x7F3A;&#x9677;&#xFF0C;&#x4E3E;&#x4F8B;&#x6765;&#x8BF4;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var domain = require(&apos;domain&apos;);
var EventEmitter = require(&apos;events&apos;).EventEmitter;

var e = new EventEmitter();

var timer = setTimeout(function () {
  e.emit(&apos;data&apos;);
}, 10);

function next() {
  e.once(&apos;data&apos;, function () {
    throw new Error(&apos;something wrong here&apos;);
  });
}

var d = domain.create();
d.on(&apos;error&apos;, function () {
  console.log(&apos;cache by domain&apos;);
});

d.run(next);

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> domain = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;domain&apos;</span>);
<span class="hljs-keyword">var</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;events&apos;</span>).EventEmitter;

<span class="hljs-keyword">var</span> e = <span class="hljs-keyword">new</span> EventEmitter();

<span class="hljs-keyword">var</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  e.emit(<span class="hljs-string">&apos;data&apos;</span>);
}, <span class="hljs-number">10</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">next</span>(<span class="hljs-params"></span>) </span>{
  e.once(<span class="hljs-string">&apos;data&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;something wrong here&apos;</span>);
  });
}

<span class="hljs-keyword">var</span> d = domain.create();
d.on(<span class="hljs-string">&apos;error&apos;</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;cache by domain&apos;</span>);
});

d.run(next);

</code></pre><p>&#x5982;&#x4E0A;&#x8FF0;&#x7684;&#x4EE3;&#x7801;&#x662F;&#x65E0;&#x6CD5;&#x6355;&#x83B7;&#x5230;&#x5F02;&#x5E38;Error&#x7684;&#xFF0C;&#x539F;&#x56E0;&#x5728;&#x4E8E;&#x53D1;&#x51FA;&#x5F02;&#x5E38;&#x7684;EventEmitter&#x5B9E;&#x4F8B;e,&#x4EE5;&#x53CA;&#x89E6;&#x53D1;&#x5F02;&#x5E38;&#x7684;&#x5B9A;&#x65F6;&#x51FD;&#x6570;timer&#x6CA1;&#x6709;&#x88AB;domain&#x5305;&#x88F9;&#x3002;domain&#x6A21;&#x5757;&#x662F;&#x901A;&#x8FC7;&#x91CD;&#x5199;&#x4E8B;&#x4EF6;&#x5FAA;&#x73AF;&#x4E2D;&#x7684;nextTick&#x548C;_tickCallback&#x6765;&#x4E8B;&#x4EF6;&#x5C06;process.domain&#x6CE8;&#x5165;&#x5230;next&#x5305;&#x88F9;&#x7684;&#x6240;&#x6709;&#x5F02;&#x6B65;&#x4E8B;&#x4EF6;&#x5185;&#x3002;</p><p>&#x89E3;&#x51B3;&#x4E0A;&#x8FF0;&#x65E0;&#x6CD5;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x5C06;e&#x6216;&#x8005;timer&#x5305;&#x88F9;&#x8FDB;domain&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="d.add(e)&#x6216;&#x8005;d.add(timer)
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cs"><code>d.<span class="hljs-keyword">add</span>(e)&#x6216;&#x8005;d.<span class="hljs-keyword">add</span>(timer)
</code></pre><p>&#x5C31;&#x53EF;&#x4EE5;&#x6210;&#x529F;&#x7684;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x3002;</p><p><strong><em>domain&#x6A21;&#x5757;&#x5DF2;&#x7ECF;&#x5728;node&#x6700;&#x65B0;&#x7684;&#x6587;&#x6863;&#x4E2D;&#x88AB;&#x5E9F;&#x9664;</em></strong></p><h4>(4)process.on(&apos;uncaughtException&apos;)&#x7684;&#x65B9;&#x6CD5;&#x6355;&#x83B7;&#x5F02;&#x5E38;</h4><p>node&#x4E2D;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x6700;&#x5916;&#x5C42;&#x7684;&#x515C;&#x5E95;&#x7684;&#x6355;&#x83B7;&#x5F02;&#x5E38;&#x7684;&#x65B9;&#x6CD5;&#x3002;&#x975E;&#x963B;&#x585E;&#x6216;&#x8005;&#x5F02;&#x6B65;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5F02;&#x5E38;&#x90FD;&#x4F1A;&#x629B;&#x51FA;&#x5230;&#x6700;&#x5916;&#x5C42;&#xFF0C;&#x5982;&#x679C;&#x5F02;&#x5E38;&#x6CA1;&#x6709;&#x88AB;&#x6355;&#x83B7;&#xFF0C;&#x90A3;&#x4E48;&#x4F1A;&#x66B4;&#x9732;&#x51FA;&#x6765;&#xFF0C;&#x88AB;&#x6700;&#x5916;&#x5C42;&#x7684;process.on(&apos;uncaughtException&apos;)&#x6240;&#x6355;&#x83B7;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  process.nextTick(function(){
     let x=x; //&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;
  },0);
} catch (e) {
  console.log(&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;);
  console.log(e);
}
process.on(&apos;uncaughtException&apos;,function(err){console.log(err)})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">try</span> {
  process.nextTick(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
     <span class="hljs-keyword">let</span> x=x; <span class="hljs-comment">//&#x7B2C;&#x4E8C;&#x4E2A;x&#x5728;&#x4F7F;&#x7528;&#x524D;&#x672A;&#x5B9A;&#x4E49;&#xFF0C;&#x4F1A;&#x629B;&#x51FA;&#x5F02;&#x5E38;</span>
  },<span class="hljs-number">0</span>);
} <span class="hljs-keyword">catch</span> (e) {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x5F02;&#x5E38;&#x5DF2;&#x7ECF;&#x88AB;&#x6355;&#x83B7;&apos;</span>);
  <span class="hljs-built_in">console</span>.log(e);
}
process.on(<span class="hljs-string">&apos;uncaughtException&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{<span class="hljs-built_in">console</span>.log(err)})
</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x80FD;&#x5728;&#x6700;&#x5916;&#x5C42;&#x6355;&#x83B7;&#x5F02;&#x6B65;&#x6216;&#x8005;&#x8BF4;&#x975E;&#x963B;&#x585E;&#x51FD;&#x6570;&#x4E2D;&#x7684;&#x5F02;&#x5E38;&#x3002;</p><h3 id="articleHeader3">&#x56DB;&#x3001;&#x5B8C;&#x6574;&#x7684;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;EventEmitter&#x6A21;&#x5757;&#xFF08;&#x53EF;&#x9009;&#x8BFB;&#xFF09;</h3><p>&#x5728;&#x7B2C;&#x4E8C;&#x8282;&#x4E2D;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x4E86;EventEmitter&#x6A21;&#x5757;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x6839;&#x636E;&#x57FA;&#x672C;&#x7684;API&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x81EA;&#x5DF1;&#x53BB;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;EventEmitter&#x6A21;&#x5757;&#x3002;<br>&#x6BCF;&#x4E00;&#x4E2A;EventEmitter&#x5B9E;&#x4F8B;&#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x6240;&#x6709;&#x4E8B;&#x4EF6;&#x7684;&#x5BF9;&#x8C61;_events,<br>&#x4E8B;&#x4EF6;&#x7684;&#x76D1;&#x542C;&#x548C;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x89E6;&#x53D1;&#xFF0C;&#x4EE5;&#x53CA;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x7684;&#x79FB;&#x9664;&#x7B49;&#x90FD;&#x5728;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;_events&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x5B9E;&#x73B0;&#x3002;</p><h4>(1) emit</h4><p>emit&#x7684;&#x65B9;&#x6CD5;&#x5B9E;&#x73B0;&#x7684;&#x5927;&#x81F4;&#x529F;&#x80FD;&#x5982;&#x4E0B;&#x7A0B;&#x5E8F;&#x6D41;&#x7A0B;&#x56FE;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015762321?w=420&amp;h=604" src="https://static.alili.tech/img/remote/1460000015762321?w=420&amp;h=604" alt="default" title="default" style="cursor:pointer;display:inline"></span></p><p>&#x4ECE;&#x4E0A;&#x8FF0;&#x7684;&#x7A0B;&#x5E8F;&#x56FE;&#x51FA;&#x53D1;&#xFF0C;&#x6211;&#x4EEC;&#x5F00;&#x59CB;&#x5B9E;&#x73B0;&#x81EA;&#x5DF1;&#x7684;EventEmitter&#x6A21;&#x5757;&#x3002;</p><p>&#x9996;&#x5148;&#x751F;&#x6210;&#x4E00;&#x4E2A;EventEmitter&#x7C7B;&#xFF0C;&#x5728;&#x7C7B;&#x7684;&#x521D;&#x59CB;&#x5316;&#x65B9;&#x6CD5;&#x4E2D;&#x751F;&#x6210;&#x8FD9;&#x4E2A;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;_events.</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EventEmitter{
  constructor(){
    if(this._events===undefined){
      this._events=Object.create(null);//&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;
      this._eventsCount=0;
    }
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEmitter</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>._events===<span class="hljs-literal">undefined</span>){
      <span class="hljs-keyword">this</span>._events=<span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</span>
      <span class="hljs-keyword">this</span>._eventsCount=<span class="hljs-number">0</span>;
    }
  }
}
</code></pre><p>_eventsCount&#x7528;&#x4E8E;&#x7EDF;&#x8BA1;&#x4E8B;&#x4EF6;&#x7684;&#x4E2A;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;_events&#x5BF9;&#x8C61;&#x6709;&#x591A;&#x5C11;&#x4E2A;&#x5C5E;&#x6027;&#x3002;</p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;emit&#x65B9;&#x6CD5;&#xFF0C;&#x6839;&#x636E;&#x6846;&#x56FE;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;emit&#x6240;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#x5728;_events&#x5BF9;&#x8C61;&#x4E2D;&#x53D6;&#x51FA;&#x76F8;&#x5E94;type&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5E76;&#x6267;&#x884C;&#x5C5E;&#x6027;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;emit&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" class EventEmitter{
  constructor(){
    if(this._events===undefined){
      this._events=Object.create(null);//&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;
      this._eventsCount=0;
    }
  }
  emit(type,...args){
    const events=this._events;
    const handler=events[type];
    //&#x5224;&#x65AD;&#x76F8;&#x5E94;type&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8FD8;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;
    if(typeof handler===&apos;function&apos;){
      Reflect.apply(handler,this,args);
    }else{
      const len=handler.length;
      for(var i=0;li&lt;len;i++){
       Reflect.apply(handler[i],this,args);
      }
    }
    return true;
  }
}

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEmitter</span></span>{
  <span class="hljs-keyword">constructor</span>(){
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>._events===<span class="hljs-literal">undefined</span>){
      <span class="hljs-keyword">this</span>._events=<span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</span>
      <span class="hljs-keyword">this</span>._eventsCount=<span class="hljs-number">0</span>;
    }
  }
  emit(type,...args){
    <span class="hljs-keyword">const</span> events=<span class="hljs-keyword">this</span>._events;
    <span class="hljs-keyword">const</span> handler=events[type];
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x76F8;&#x5E94;type&#x7684;&#x6267;&#x884C;&#x51FD;&#x6570;&#x662F;&#x5426;&#x4E3A;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x8FD8;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> handler===<span class="hljs-string">&apos;function&apos;</span>){
      <span class="hljs-built_in">Reflect</span>.apply(handler,<span class="hljs-keyword">this</span>,args);
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">const</span> len=handler.length;
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;li&lt;len;i++){
       <span class="hljs-built_in">Reflect</span>.apply(handler[i],<span class="hljs-keyword">this</span>,args);
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  }
}

</code></pre><h4>(2) on&#x3001;addListener&#x548C;prependListener&#x65B9;&#x6CD5;</h4><p>emit&#x65B9;&#x6CD5;&#x662F;&#x51FA;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x6267;&#x884C;&#x76F8;&#x5E94;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x800C;on&#x65B9;&#x6CD5;&#x5219;&#x662F;&#x5BF9;&#x4E8E;&#x6307;&#x5B9A;&#x7684;&#x4E8B;&#x4EF6;&#x6DFB;&#x52A0;&#x76D1;&#x542C;&#x51FD;&#x6570;&#x3002;&#x7528;&#x7A0B;&#x5E8F;&#x6765;&#x8BF4;&#xFF0C;&#x5C31;&#x662F;&#x5F80;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x4E2D;_events&#x6DFB;&#x52A0;&#x76F8;&#x5E94;&#x7684;&#x5C5E;&#x6027;.&#x7A0B;&#x5E8F;&#x6D41;&#x7A0B;&#x56FE;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015762322?w=420&amp;h=611" src="https://static.alili.tech/img/remote/1460000015762322?w=420&amp;h=611" alt="2" title="2" style="cursor:pointer"></span></p><p>&#x63A5;&#x7740;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="on(type,listener,prepend){
    var m;
    var events;
    var existing;
    events=this._events;
    //&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x7684;
    if(events.newListener!==undefined){
       this.emit(&apos;newListener&apos;,type,listener);
       events=target._events;
    }
    existing=events[type];
    //&#x5224;&#x65AD;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5426;&#x5B58;&#x5728;
    if(existing===undefined){
      //&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x8FD9;&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x76F8;&#x5E94;type&#x7684;&#x4E8B;&#x4EF6;
      existing=events[type]=listener;
      ++this._eventsCount;
    }else{
      //&#x5982;&#x679C;&#x5B58;&#x5728;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;,&#x5224;&#x65AD;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x8FD8;&#x662F;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;
      //&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x662F;
      if(typeof existing===&apos;function&apos;){
        //&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5219;&#x6DFB;&#x52A0;
        existing=events[type]=prepend?[listener,existing]:[existing,listener];
      }else if(prepend){
        existing.unshift(listener);
      }else{
        existing.push(listener);
      }
    }
    //&#x94FE;&#x5F0F;&#x8C03;&#x7528;
    return this;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>on(<span class="hljs-class"><span class="hljs-keyword">type</span>,<span class="hljs-title">listener</span>,<span class="hljs-title">prepend</span>)</span>{
    <span class="hljs-keyword">var</span> m;
    <span class="hljs-keyword">var</span> events;
    <span class="hljs-keyword">var</span> existing;
    events=<span class="hljs-keyword">this</span>._events;
    <span class="hljs-comment">//&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x7684;</span>
    <span class="hljs-keyword">if</span>(events.newListener!==undefined){
       <span class="hljs-keyword">this</span>.emit(<span class="hljs-symbol">&apos;newListene</span>r&apos;,<span class="hljs-class"><span class="hljs-keyword">type</span>,<span class="hljs-title">listener</span>)</span>;
       events=target._events;
    }
    existing=events[<span class="hljs-class"><span class="hljs-keyword">type</span>]</span>;
    <span class="hljs-comment">//&#x5224;&#x65AD;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x5426;&#x5B58;&#x5728;</span>
    <span class="hljs-keyword">if</span>(existing===undefined){
      <span class="hljs-comment">//&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x8FD9;&#x65B0;&#x589E;&#x4E00;&#x4E2A;&#x76F8;&#x5E94;type&#x7684;&#x4E8B;&#x4EF6;</span>
      existing=events[<span class="hljs-class"><span class="hljs-keyword">type</span>]<span class="hljs-title">=listener</span></span>;
      ++<span class="hljs-keyword">this</span>._eventsCount;
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-comment">//&#x5982;&#x679C;&#x5B58;&#x5728;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;,&#x5224;&#x65AD;&#x76F8;&#x5E94;&#x7684;type&#x7684;&#x65B9;&#x6CD5;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x8FD8;&#x662F;&#x4EC5;&#x4EC5;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;</span>
      <span class="hljs-comment">//&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x662F;</span>
      <span class="hljs-keyword">if</span>(typeof existing===<span class="hljs-symbol">&apos;functio</span>n&apos;){
        <span class="hljs-comment">//&#x5982;&#x679C;&#x4EC5;&#x4EC5;&#x662F;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5219;&#x6DFB;&#x52A0;</span>
        existing=events[<span class="hljs-class"><span class="hljs-keyword">type</span>]<span class="hljs-title">=prepend?</span>[listener,existing]</span>:[existing,listener];
      }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(prepend){
        existing.unshift(listener);
      }<span class="hljs-keyword">else</span>{
        existing.push(listener);
      }
    }
    <span class="hljs-comment">//&#x94FE;&#x5F0F;&#x8C03;&#x7528;</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
</code></pre><ul><li>&#x5728;on&#x65B9;&#x6CD5;&#x4E2D;&#x4E3A;&#x4E86;&#x53EF;&#x4EE5;&#x94FE;&#x5F0F;&#x7684;&#x8C03;&#x7528;&#x6211;&#x4EEC;&#x8FD4;&#x56DE;&#x4E86;EventEmitter&#x6A21;&#x5757;&#x7684;&#x5B9E;&#x4F8B;&#x5316;&#x672C;&#x8EAB;&#x3002;</li><li>&#x4E14;&#x5728;on&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x4E2D;&#xFF0C;&#x7B2C;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x4E8E;&#x6307;&#x5B9A;&#x662F;&#x5728;&#x76F8;&#x5E94;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;&#x5C5E;&#x6027;&#x6240;&#x5BF9;&#x5E94;&#x7684;&#x6570;&#x7EC4;&#x5934;&#x90E8;&#x6DFB;&#x52A0;&#x8FD8;&#x662F;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#xFF0C;&#x4E0D;&#x4F20;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x5B9E;&#x5728;&#x5C3E;&#x90E8;&#x6DFB;&#x52A0;&#xFF0C;&#x5982;&#x679C;&#x6307;&#x5B9A;prepend&#x4E3A;true&#xFF0C;&#x5219;&#x76F8;&#x540C;&#x4E8B;&#x4EF6;&#x7C7B;&#x578B;&#x7684;&#x65B0;&#x7684;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x4F1A;&#x6DFB;&#x52A0;&#x5230;&#x4E8B;&#x4EF6;&#x6570;&#x7EC4;&#x7684;&#x5934;&#x90E8;&#x3002;</li><li>&#x5982;&#x679C;_events&#x5B58;&#x5728;newListener&#x5C5E;&#x6027;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;_event&#x5B58;&#x5728;&#x76D1;&#x542C;newListener&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#xFF0C;&#x90A3;&#x4E48;&#x6BCF;&#x6B21;on&#x65B9;&#x6CD5;&#x6DFB;&#x52A0;&#x4E8B;&#x4EF6;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x90FD;&#x4F1A;emit&#x51FA;&#x4E00;&#x4E2A;&#x2018;newListener&#x2019;&#x65B9;&#x6CD5;&#x3002;</li></ul><p>&#x5728;on&#x65B9;&#x6CD5;&#x7684;&#x57FA;&#x7840;&#x4E0A;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;addListener&#x65B9;&#x6CD5;&#x548C;prependListener&#x65B9;&#x6CD5;&#x3002;</p><p>addListener&#x65B9;&#x6CD5;&#x662F;on&#x65B9;&#x6CD5;&#x7684;&#x522B;&#x540D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EventEmitter.prototype.addListener=EventEmitter.prototype.on
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.addListener</span>=EventEmitter<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.on</span>
</code></pre><p>prependListener&#x65B9;&#x6CD5;&#x76F8;&#x5F53;&#x4E8E;&#x5728;&#x5934;&#x90E8;&#x6DFB;&#x52A0;&#xFF0C;&#x6307;&#x5B9A;prepend&#x4E3A;true&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="EventEmitter.prototype.prependListener =
function prependListener(type, listener) {
  return EventEmitter.prototype.on(type, listener, true);
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ada"><code>EventEmitter.prototype.prependListener =
<span class="hljs-keyword">function</span> <span class="hljs-title">prependListener</span>(type, listener) {
  <span class="hljs-keyword">return</span> <span class="hljs-type">EventEmitter.prototype.on(type,</span> listener, <span class="hljs-literal">true</span>);
};
</code></pre><h4>(3) removeListener&#x548C;removeAllListeners</h4><p>&#x63A5;&#x7740;&#x6765;&#x770B;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x7684;&#x65B9;&#x6CD5;removeListener&#x548C;removeAllListeners&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x770B;removeListener&#x7684;&#x7A0B;&#x5E8F;&#x6D41;&#x7A0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000015762323?w=446&amp;h=644" src="https://static.alili.tech/img/remote/1460000015762323?w=446&amp;h=644" alt="3" title="3" style="cursor:pointer"></span></p><p>&#x63A5;&#x7740;&#x6765;&#x770B;removeListener&#x7684;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="removeListener(type,listener){
 var list,events,position,i,originalListener;
 events=this._events;
 list=events[type];
 //&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E8B;&#x4EF6;&#x53EA;&#x88AB;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x76D1;&#x542C;
 if(list===listener){
    if(--this._eventsCount===0){
      this._events=Object.create(null);
    }else{
      delete events[type];
      //&#x5982;&#x679C;&#x5B58;&#x5728;&#x5BF9;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;removeListener&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x89E6;&#x53D1;removeListener
      if(events.removeListener)
         this.emit(&apos;removeListener&apos;,type,listener);
    }
 }else if(typeof list!==&apos;function&apos;){
   //&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6570;&#x7EC4;
   //&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x627E;&#x51FA;listener&#x5BF9;&#x5E94;&#x7684;&#x90A3;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;
   for(i=list.length-1;i&gt;=0;i--){
     if(list[i]===listener){
       position=i;
       break;
     }
   }
   //&#x6CA1;&#x6709;&#x627E;&#x5230;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x6539;&#x52A8;&#x7684;&#x5BF9;&#x8C61;
   if(position){
     return this;
   }
   //&#x5982;&#x679C;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x624D;&#x662F;&#x6240;&#x9700;&#x8981;&#x5220;&#x9664;&#x7684;&#x5BF9;&#x5E94;listener&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x79FB;&#x9664;
   if(position===0){
     list.shift();
   }else{
     list.splice(position,1);
   }
   if(list.length===1)
     events[type]=list[0];
   if(events.removeListener!==undefined)
     this.emit(&apos;removeListener&apos;,type,listener);
   }
   return this;
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code>removeListener(<span class="hljs-built_in">type</span>,listener){
 var <span class="hljs-built_in">list</span>,events,<span class="hljs-built_in">position</span>,i,originalListener;
 events=this.<span class="hljs-variable">_events</span>;
 <span class="hljs-built_in">list</span>=events[<span class="hljs-built_in">type</span>];
 <span class="hljs-comment">//&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x7684;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4E8B;&#x4EF6;&#x53EA;&#x88AB;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x76D1;&#x542C;</span>
 <span class="hljs-keyword">if</span>(<span class="hljs-built_in">list</span>===listener){
    <span class="hljs-keyword">if</span>(--this.<span class="hljs-variable">_eventsCount</span>===<span class="hljs-number">0</span>){
      this.<span class="hljs-variable">_events</span>=Object.create(null);
    }<span class="hljs-keyword">else</span>{
      delete events[<span class="hljs-built_in">type</span>];
      <span class="hljs-comment">//&#x5982;&#x679C;&#x5B58;&#x5728;&#x5BF9;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;removeListener&#x7684;&#x76D1;&#x542C;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x89E6;&#x53D1;removeListener</span>
      <span class="hljs-keyword">if</span>(events.removeListener)
         this.emit(<span class="hljs-string">&apos;removeListener&apos;</span>,<span class="hljs-built_in">type</span>,listener);
    }
 }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-built_in">typeof</span> <span class="hljs-built_in">list</span>!==<span class="hljs-string">&apos;function&apos;</span>){
   <span class="hljs-comment">//&#x5982;&#x679C;&#x76F8;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;&#x5C5E;&#x6027;&#x503C;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6570;&#x7EC4;</span>
   <span class="hljs-comment">//&#x904D;&#x5386;&#x8FD9;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x627E;&#x51FA;listener&#x5BF9;&#x5E94;&#x7684;&#x90A3;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x6570;&#x7EC4;&#x4E2D;&#x7684;&#x4F4D;&#x7F6E;</span>
   <span class="hljs-keyword">for</span>(i=<span class="hljs-built_in">list</span>.length-<span class="hljs-number">1</span>;i&gt;=<span class="hljs-number">0</span>;i--){
     <span class="hljs-keyword">if</span>(<span class="hljs-built_in">list</span>[i]===listener){
       <span class="hljs-built_in">position</span>=i;
       break;
     }
   }
   <span class="hljs-comment">//&#x6CA1;&#x6709;&#x627E;&#x5230;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x8FD4;&#x56DE;&#x4E0D;&#x505A;&#x4EFB;&#x4F55;&#x6539;&#x52A8;&#x7684;&#x5BF9;&#x8C61;</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-built_in">position</span>){
     return this;
   }
   <span class="hljs-comment">//&#x5982;&#x679C;&#x6570;&#x7EC4;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x624D;&#x662F;&#x6240;&#x9700;&#x8981;&#x5220;&#x9664;&#x7684;&#x5BF9;&#x5E94;listener&#x51FD;&#x6570;&#xFF0C;&#x5219;&#x76F4;&#x63A5;&#x79FB;&#x9664;</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-built_in">position</span>===<span class="hljs-number">0</span>){
     <span class="hljs-built_in">list</span>.shift();
   }<span class="hljs-keyword">else</span>{
     <span class="hljs-built_in">list</span>.splice(<span class="hljs-built_in">position</span>,<span class="hljs-number">1</span>);
   }
   <span class="hljs-keyword">if</span>(<span class="hljs-built_in">list</span>.length===<span class="hljs-number">1</span>)
     events[<span class="hljs-built_in">type</span>]=<span class="hljs-built_in">list</span>[<span class="hljs-number">0</span>];
   <span class="hljs-keyword">if</span>(events.removeListener!==undefined)
     this.emit(<span class="hljs-string">&apos;removeListener&apos;</span>,<span class="hljs-built_in">type</span>,listener);
   }
   return this;
}
</code></pre><ul><li>&#x5982;&#x679C;&#x5728;&#x4E4B;&#x95F4;&#x8BBE;&#x7F6E;&#x4E86;&#x5BF9;&#x4E8E;&#x79FB;&#x9664;&#x8FD9;&#x4E2A;&#x7279;&#x6B8A;&#x4E8B;&#x4EF6;&#x201C;removeListener&#x201D;&#x7684;&#x76D1;&#x542C;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4F1A;&#x5728;&#x79FB;&#x9664;&#x4E8B;&#x4EF6;&#x65F6;&#x5019;&#x89E6;&#x53D1;&#x201C;removeListener&#x201D;&#x4E8B;&#x4EF6;&#x3002;</li></ul><p>&#x6700;&#x540E;&#x6765;&#x770B;removeAllListener&#xFF0C;&#x8FD9;&#x4E2A;&#x4E0E;removeListener&#x76F8;&#x4F3C;&#xFF0C;&#x53EA;&#x8981;&#x627E;&#x5230;&#x4F20;&#x5165;&#x7684;type&#x6240;&#x5BF9;&#x5E94;&#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF0C;&#x6CA1;&#x6709;&#x904D;&#x5386;&#x8FC7;&#x7A0B;&#xFF0C;&#x76F4;&#x63A5;&#x5220;&#x9664;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x5373;&#x53EF;&#x3002;</p><p>&#x9664;&#x6B64;&#x4E4B;&#x5916;&#xFF0C;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x7684;&#x7C7B;&#x4F3C;&#x4E0E;once&#x3001;setMaxListeners&#x3001;listeners&#x4E5F;&#x53EF;&#x4EE5;&#x5728;&#x6B64;&#x57FA;&#x7840;&#x4E0A;&#x5B9E;&#x73B0;&#xFF0C;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x4E3E;&#x4F8B;&#x3002;</p><h3 id="articleHeader4">&#x4E94;&#x3001;&#x603B;&#x7ED3;</h3><p>&#x672C;&#x6587;&#x4ECE;node&#x7684;EventEmitter&#x6A21;&#x5757;&#x7684;&#x4F7F;&#x7528;&#x51FA;&#x53D1;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;EventEmitter&#x63D0;&#x4F9B;&#x7684;&#x5E38;&#x7528;API&#xFF0C;&#x7136;&#x540E;&#x4ECB;&#x7ECD;&#x4E86;node&#x4E2D;&#x57FA;&#x4E8E;EventEmitter&#x7684;&#x5F02;&#x5E38;&#x5904;&#x7406;&#xFF0C;&#x6700;&#x540E;&#x81EA;&#x5DF1;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x8F83;&#x4E3A;&#x5B8C;&#x6574;&#x7684;EventEmitter&#x6A21;&#x5757;&#x3002;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
循序渐进教你实现一个完整的node的EventEmitter模块

## 原文链接
[https://segmentfault.com/a/1190000015762318](https://segmentfault.com/a/1190000015762318)

