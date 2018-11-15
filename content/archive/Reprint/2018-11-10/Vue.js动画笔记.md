---
title: Vue.js动画笔记
reprint: true
categories: reprint
abbrlink: ea91dcd5
date: 2018-11-10 02:30:10
---

{{% raw %}}
<p><strong>1&#x3001;Vue.js&#x4E2D;&#x7684;&#x5143;&#x7D20;&#x52A8;&#x753B;&#x6216;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x52A8;&#x753B;&#x6709;&#x591A;&#x79CD;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x6BD4;&#x5982;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x5199;CSS3&#x52A8;&#x753B;&#x6765;&#x5B9E;&#x73B0;
2&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;CSS&#x52A8;&#x753B;&#x5E93;&#x5982;&#xFF1A;Animate.css
3&#x3001;&#x5728;&#x6784;&#x5B50;&#x51FD;&#x6570;&#x4E2D;&#x64CD;&#x4F5C;DOM
4&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;Js&#x52A8;&#x753B;&#x5E93;&#x5982;&#xFF1A;Velocity.js" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1</span>&#x3001;&#x81EA;&#x5DF1;&#x624B;&#x52A8;&#x5199;CSS3&#x52A8;&#x753B;&#x6765;&#x5B9E;&#x73B0;
<span class="hljs-number">2</span>&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;CSS&#x52A8;&#x753B;&#x5E93;&#x5982;&#xFF1A;Animate.css
<span class="hljs-number">3</span>&#x3001;&#x5728;&#x6784;&#x5B50;&#x51FD;&#x6570;&#x4E2D;&#x64CD;&#x4F5C;DOM
<span class="hljs-number">4</span>&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;Js&#x52A8;&#x753B;&#x5E93;&#x5982;&#xFF1A;Velocity.js</code></pre><p><strong>2&#x3001;Vue.js&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x4E86;&#x9ED8;&#x8BA4;&#x7684;&#x52A8;&#x753B;&#x7EC4;&#x4EF6; transition &#xFF0C;&#x4F8B;&#x5B50;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;demo&quot;&gt;
    &lt;button @click=&apos;show=!show&apos;&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition name=&apos;fade&apos;&gt;       //&#x5C06;&#x9700;&#x8981;&#x6267;&#x884C;&#x52A8;&#x753B;&#x7684;&#x5143;&#x7D20;&#x5305;&#x88F9;&#x5728;transition&#x6807;&#x7B7E;&#x4E2D;&#xFF0C;&#x5E76;&#x5236;&#x5B9A;&#x52A8;&#x753B;&#x540D;&#x79F0;
        &lt;p v-if=&apos;show&apos;&gt;Hello&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

new Vue({
    el:&apos;demo&apos;,
    data:{
        show:true
    }
})

.fade-enter-active,.fade-leave-active{
    transition:opacity .5s
}
.fade-enter,.fade-leave-to{
    opacity:0
}
transition&#x6267;&#x884C;&#xFF1A;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x662F;&#x5426;&#x5E94;&#x7528;CSS&#x8FC7;&#x6E21;&#x6216;&#x52A8;&#x753B;(&#x589E;&#x5220;&#x7C7B;&#x540D;)--&gt;&#x8C03;&#x7528;&#x6784;&#x5B50;&#x51FD;&#x6570;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;demo&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&apos;show=!show&apos;</span>&gt;</span>&#x5207;&#x6362;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&apos;fade&apos;</span>&gt;</span>       //&#x5C06;&#x9700;&#x8981;&#x6267;&#x884C;&#x52A8;&#x753B;&#x7684;&#x5143;&#x7D20;&#x5305;&#x88F9;&#x5728;transition&#x6807;&#x7B7E;&#x4E2D;&#xFF0C;&#x5E76;&#x5236;&#x5B9A;&#x52A8;&#x753B;&#x540D;&#x79F0;
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&apos;show&apos;</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

new Vue(</span><span class="hljs-template-variable">{
    el:&apos;demo&apos;,
    data:{
        show:true
    }</span><span class="xml">
})

.fade-enter-active,.fade-leave-active</span><span class="hljs-template-variable">{
    transition:opacity .5s
}</span><span class="xml">
.fade-enter,.fade-leave-to</span><span class="hljs-template-variable">{
    opacity:0
}</span><span class="xml">
transition&#x6267;&#x884C;&#xFF1A;&#x76EE;&#x6807;&#x5143;&#x7D20;&#x662F;&#x5426;&#x5E94;&#x7528;CSS&#x8FC7;&#x6E21;&#x6216;&#x52A8;&#x753B;(&#x589E;&#x5220;&#x7C7B;&#x540D;)--&gt;&#x8C03;&#x7528;&#x6784;&#x5B50;&#x51FD;&#x6570;</span></code></pre><p><strong>3&#x3001;transition&#x8FC7;&#x6E21;&#x7684;&#x7C7B;&#x540D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x72B6;&#x6001;A--&gt;&#x72B6;&#x6001;B
    v-enter:&#x5143;&#x7D20;&#x521D;&#x59CB;&#x72B6;&#x6001;
    v-enter-to:&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x540E;&#x72B6;&#x6001;
    v-enter-active:&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x8FC7;&#x7A0B;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x65F6;&#x95F4;&#x3001;&#x5EF6;&#x8FDF;&#x3001;&#x66F2;&#x7EBF;&#x51FD;&#x6570;
&#x72B6;&#x6001;B--&gt;&#x72B6;&#x6001;A
    v-leave:&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x6267;&#x884C;&#x524D;&#x72B6;&#x6001;
    v-leave-to:&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x6267;&#x884C;&#x540E;&#x72B6;&#x6001;
    v-leave-active:&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x8FC7;&#x7A0B;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x65F6;&#x95F4;&#x3001;&#x5EF6;&#x8FDF;&#x3001;&#x66F2;&#x7EBF;&#x51FD;&#x6570;
&#x89C1;&#x5B98;&#x7F51;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;&#xFF08; V &#x4EE3;&#x8868;&#x52A8;&#x753B;&#x7684;&#x7C7B;&#x540D;&#xFF09;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>&#x72B6;&#x6001;A--&gt;&#x72B6;&#x6001;B
    v-<span class="hljs-string">enter:</span>&#x5143;&#x7D20;&#x521D;&#x59CB;&#x72B6;&#x6001;
    v-enter-<span class="hljs-string">to:</span>&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x540E;&#x72B6;&#x6001;
    v-enter-<span class="hljs-string">active:</span>&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x8FC7;&#x7A0B;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x65F6;&#x95F4;&#x3001;&#x5EF6;&#x8FDF;&#x3001;&#x66F2;&#x7EBF;&#x51FD;&#x6570;
&#x72B6;&#x6001;B--&gt;&#x72B6;&#x6001;A
    v-<span class="hljs-string">leave:</span>&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x6267;&#x884C;&#x524D;&#x72B6;&#x6001;
    v-leave-<span class="hljs-string">to:</span>&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x6267;&#x884C;&#x540E;&#x72B6;&#x6001;
    v-leave-<span class="hljs-string">active:</span>&#x8FD4;&#x56DE;&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x8FC7;&#x7A0B;&#xFF0C;&#x7528;&#x6765;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x65F6;&#x95F4;&#x3001;&#x5EF6;&#x8FDF;&#x3001;&#x66F2;&#x7EBF;&#x51FD;&#x6570;
&#x89C1;&#x5B98;&#x7F51;&#x56FE;&#x5982;&#x4E0B;&#xFF1A;&#xFF08; V &#x4EE3;&#x8868;&#x52A8;&#x753B;&#x7684;&#x7C7B;&#x540D;&#xFF09;</code></pre><p><span class="img-wrap"><img data-src="/img/bV7hms?w=1200&amp;h=600" src="https://static.alili.tech/img/bV7hms?w=1200&amp;h=600" alt="transition.png" title="transition.png" style="cursor:pointer;display:inline"></span></p><p><strong>4&#x3001;&#x4F7F;&#x7528;CSS&#x52A8;&#x753B;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&apos;demo&apos;&gt;
    &lt;button @click=&apos;show=!show&apos;&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition name=&apos;bounce&apos;&gt;
        &lt;p v-show=&apos;show&apos;&gt;Hello&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

new Vue({
    el:&apos;#demo&apos;,
    data:{
        show:true
    }
})

.bounce-enter-active{
    animation:bounce-in .5s;
}
.bounce-leave-active{
    animation:bounce-in .5s reverse;
}

@keyframes bounce{
    0%{
        transform:scale(0)
    }
    50%{
        transform:scale(1.5)
    }
    100%{
        transform:scale(1)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>&lt;div id=<span class="hljs-string">&apos;demo&apos;</span>&gt;
    &lt;button @click=<span class="hljs-string">&apos;show=!show&apos;</span>&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition name=<span class="hljs-string">&apos;bounce&apos;</span>&gt;
        &lt;p v-show=<span class="hljs-string">&apos;show&apos;</span>&gt;Hello&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

new Vue({
    el:<span class="hljs-string">&apos;#demo&apos;</span>,
    data:{
        show:true
    }
})

.bounce-enter-active{
    animation:bounce-in .<span class="hljs-number">5</span>s;
}
.bounce-leave-active{
    animation:bounce-in .<span class="hljs-number">5</span>s reverse;
}

@keyframes bounce{
    <span class="hljs-number">0</span>%{
        transform:scale(<span class="hljs-number">0</span>)
    }
    <span class="hljs-number">50</span>%{
        transform:scale(<span class="hljs-number">1.5</span>)
    }
    <span class="hljs-number">100</span>%{
        transform:scale(<span class="hljs-number">1</span>)
    }
}</code></pre><p><strong>5&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;CSS&#x52A8;&#x753B;&#x5E93; Animate.css</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x7279;&#x6027;&#x81EA;&#x5B9A;&#x4E49;&#x8FC7;&#x6E21;&#x7C7B;&#x540D;(&#x53EF;&#x7ED3;&#x5408;&#x7B2C;&#x4E09;&#x65B9;CSS&#x5E93;)&#xFF1A;
    enter-class
    enter-to-class
    enter-active-class
    leave-active
    leave-to-class
    leave-active-class
    
&lt;div id=&apos;demo&apos;&gt;
    &lt;button @click=&apos;show=!show&apos;&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition name=&apos;custom-classes-trandition&apos; enter-active-class=&apos;animated tada&apos; leave-active-class=&apos;animated bounceOutRight&apos;&gt;
       &lt;p&gt;Hello&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

new Vue({
    el:&apos;demo&apos;,
    data:{
        show:true
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scala"><code>&#x901A;&#x8FC7;&#x4EE5;&#x4E0B;&#x7279;&#x6027;&#x81EA;&#x5B9A;&#x4E49;&#x8FC7;&#x6E21;&#x7C7B;&#x540D;(&#x53EF;&#x7ED3;&#x5408;&#x7B2C;&#x4E09;&#x65B9;<span class="hljs-type">CSS</span>&#x5E93;)&#xFF1A;
    enter-<span class="hljs-class"><span class="hljs-keyword">class</span></span>
    enter-to-<span class="hljs-class"><span class="hljs-keyword">class</span></span>
    enter-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>
    leave-active
    leave-to-<span class="hljs-class"><span class="hljs-keyword">class</span></span>
    leave-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>
    
&lt;div id=<span class="hljs-symbol">&apos;dem</span>o&apos;&gt;
    &lt;button <span class="hljs-meta">@click</span>=<span class="hljs-symbol">&apos;show</span>=!show&apos;&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition name=<span class="hljs-symbol">&apos;custom</span>-classes-trandition&apos; enter-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-symbol">&apos;animated</span> tada&apos; leave-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-symbol">&apos;animated</span> bounceOutRight&apos;&gt;
       &lt;p&gt;<span class="hljs-type">Hello</span>&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

<span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el:<span class="hljs-symbol">&apos;dem</span>o&apos;,
    data:{
        show:<span class="hljs-literal">true</span>
    }
})</code></pre><p><strong>6&#x3001;&#x52A8;&#x753B;&#x8FC7;&#x6E21;&#x65F6;&#x95F4;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition :duration=&quot;1000&quot;&gt;...&lt;/transition&gt;    //&#x8BBE;&#x7F6E;1000&#x6BEB;&#x79D2;&#x65F6;&#x95F4;
&lt;transition :duration=&quot;{enter:500,leave:800}&quot;&gt;...&lt;/transition&gt;    //&#x8BBE;&#x7F6E;&#x8FDB;&#x5165;&#x65F6;&#x95F4;&#x548C;&#x56DE;&#x9000;&#x65F6;&#x95F4;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>&lt;transition :<span class="hljs-built_in">duration</span>=<span class="hljs-string">&quot;1000&quot;</span>&gt;<span class="hljs-params">...</span>&lt;/transition&gt;    <span class="hljs-comment">//&#x8BBE;&#x7F6E;1000&#x6BEB;&#x79D2;&#x65F6;&#x95F4;</span>
&lt;transition :<span class="hljs-built_in">duration</span>=<span class="hljs-string">&quot;{enter:500,leave:800}&quot;</span>&gt;<span class="hljs-params">...</span>&lt;/transition&gt;    <span class="hljs-comment">//&#x8BBE;&#x7F6E;&#x8FDB;&#x5165;&#x65F6;&#x95F4;&#x548C;&#x56DE;&#x9000;&#x65F6;&#x95F4;</span></code></pre><p><strong>7&#x3001;Vue.js&#x7684;JavaScript&#x52A8;&#x753B;&#x6784;&#x5B50;&#x51FD;&#x6570;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition @before-enter=&apos;beforeEnter&apos;
            @enter=&apos;enter&apos;
            @after-enter=&apos;afterEnter&apos;
            @enter-cancelled=&apos;enterCancelled&apos;
            
            @before-leave=&apos;beforeLeave&apos;
            @leave=&apos;leave&apos;
            @after-leave=&apos;afterLeave&apos;
            @leave-cancelled=&apos;leaveCancelled&apos;
            :css=&apos;false&apos; &gt;         
&lt;/transition&gt;
//&#x5BF9;&#x4E8E;&#x4EC5;&#x4F7F;&#x7528; JavaScript &#x8FC7;&#x6E21;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0; v-bind:css=&quot;false&quot;&#xFF0C;Vue &#x4F1A;&#x8DF3;&#x8FC7; CSS &#x7684;&#x68C0;&#x6D4B;

methods:{
    beforeEnter:function(el){},
    enter:function(el,done){
        done();  //&#x5F53;&#x53EA;&#x7528; JavaScript &#x8FC7;&#x6E21;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728; enter &#x548C; leave &#x4E2D;&#x5FC5;&#x987B;&#x4F7F;&#x7528; done &#x8FDB;&#x884C;&#x56DE;&#x8C03;   
    },
    afterEnter:function(el){},
    enterCancelled:function(el){},
    beforeLeave:function(el){},
    leave:function(el){
        done();
    },
    afterLeave:function(el){},
    leaveCancelled:function(el){}
}
//&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x7ED3;&#x5408; CSS transitions/animations &#x4F7F;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5355;&#x72EC;&#x4F7F;&#x7528;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;transition @before-enter=<span class="hljs-string">&apos;beforeEnter&apos;</span>
            @enter=<span class="hljs-string">&apos;enter&apos;</span>
            @after-enter=<span class="hljs-string">&apos;afterEnter&apos;</span>
            @enter-cancelled=<span class="hljs-string">&apos;enterCancelled&apos;</span>
            
            @before-leave=<span class="hljs-string">&apos;beforeLeave&apos;</span>
            @leave=<span class="hljs-string">&apos;leave&apos;</span>
            @after-leave=<span class="hljs-string">&apos;afterLeave&apos;</span>
            @leave-cancelled=<span class="hljs-string">&apos;leaveCancelled&apos;</span>
            :css=<span class="hljs-string">&apos;false&apos;</span> &gt;         
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>
<span class="hljs-comment">//&#x5BF9;&#x4E8E;&#x4EC5;&#x4F7F;&#x7528; JavaScript &#x8FC7;&#x6E21;&#x7684;&#x5143;&#x7D20;&#x6DFB;&#x52A0; v-bind:css=&quot;false&quot;&#xFF0C;Vue &#x4F1A;&#x8DF3;&#x8FC7; CSS &#x7684;&#x68C0;&#x6D4B;</span>

methods:{
    <span class="hljs-attr">beforeEnter</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{},
    <span class="hljs-attr">enter</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,done</span>)</span>{
        done();  <span class="hljs-comment">//&#x5F53;&#x53EA;&#x7528; JavaScript &#x8FC7;&#x6E21;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5728; enter &#x548C; leave &#x4E2D;&#x5FC5;&#x987B;&#x4F7F;&#x7528; done &#x8FDB;&#x884C;&#x56DE;&#x8C03;   </span>
    },
    <span class="hljs-attr">afterEnter</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{},
    <span class="hljs-attr">enterCancelled</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{},
    <span class="hljs-attr">beforeLeave</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{},
    <span class="hljs-attr">leave</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
        done();
    },
    <span class="hljs-attr">afterLeave</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{},
    <span class="hljs-attr">leaveCancelled</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{}
}
<span class="hljs-comment">//&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x53EF;&#x4EE5;&#x7ED3;&#x5408; CSS transitions/animations &#x4F7F;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5355;&#x72EC;&#x4F7F;&#x7528;</span></code></pre><p><strong>8&#x3001;&#x4F7F;&#x7528;&#x7B2C;&#x4E09;&#x65B9;JavaScript&#x52A8;&#x753B;&#x5E93;Velocity.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;demo&quot;&gt;
    &lt;button @click=&quot;show = !show&quot;&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition @before-enter=&quot;beforeEnter&quot; @enter=&quot;enter&quot; @leave=&quot;leave&quot; :css=&quot;false&quot; &gt;
        &lt;p v-if=&quot;show&quot;&gt;Hello&lt;/p&gt;
    &lt;/transition&gt;
&lt;/div&gt;

new Vue({
    el: &apos;#demo&apos;,
    data: {
        show: false
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.transformOrigin = &apos;left&apos;
        },
        enter: function (el, done) {
            Velocity(el, { opacity: 1, fontSize: &apos;1.4em&apos; }, { duration: 300 })
            Velocity(el, { fontSize: &apos;1em&apos; }, { complete: done })
        },
        leave: function (el, done) {
            Velocity(el, { translateX: &apos;15px&apos;, rotateZ: &apos;50deg&apos; }, { duration: 600 })
            Velocity(el, { rotateZ: &apos;100deg&apos; }, { loop: 2 })
            Velocity(el, {
                rotateZ: &apos;45deg&apos;,
                translateY: &apos;30px&apos;,
                translateX: &apos;30px&apos;,
                opacity: 0
            }, { complete: done })
         }
     }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>&lt;div id=<span class="hljs-string">&quot;demo&quot;</span>&gt;
    &lt;button @click=<span class="hljs-string">&quot;show = !show&quot;</span>&gt;&#x5207;&#x6362;&lt;/button&gt;
    &lt;transition @before-enter=<span class="hljs-string">&quot;beforeEnter&quot;</span> @enter=<span class="hljs-string">&quot;enter&quot;</span> @leave=<span class="hljs-string">&quot;leave&quot;</span> :css=<span class="hljs-string">&quot;false&quot;</span> &gt;
        &lt;<span class="hljs-keyword">p</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;show&quot;</span>&gt;Hello&lt;/<span class="hljs-keyword">p</span>&gt;
    &lt;/transition&gt;
&lt;/div&gt;

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">&apos;#demo&apos;</span>,
    dat<span class="hljs-variable">a:</span> {
        sho<span class="hljs-variable">w:</span> false
    },
    method<span class="hljs-variable">s:</span> {
        beforeEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> {</span>
            <span class="hljs-keyword">el</span>.style.opacity = <span class="hljs-number">0</span>
            <span class="hljs-keyword">el</span>.style.transformOrigin = <span class="hljs-string">&apos;left&apos;</span>
        },
        enter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, done)</span> {</span>
            Velocity(<span class="hljs-keyword">el</span>, { opacity: <span class="hljs-number">1</span>, fontSize: <span class="hljs-string">&apos;1.4em&apos;</span> }, { duration: <span class="hljs-number">300</span> })
            Velocity(<span class="hljs-keyword">el</span>, { fontSize: <span class="hljs-string">&apos;1em&apos;</span> }, { <span class="hljs-built_in">complete</span>: done })
        },
        leave: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el, done)</span> {</span>
            Velocity(<span class="hljs-keyword">el</span>, { translateX: <span class="hljs-string">&apos;15px&apos;</span>, rotateZ: <span class="hljs-string">&apos;50deg&apos;</span> }, { duration: <span class="hljs-number">600</span> })
            Velocity(<span class="hljs-keyword">el</span>, { rotateZ: <span class="hljs-string">&apos;100deg&apos;</span> }, { loop: <span class="hljs-number">2</span> })
            Velocity(<span class="hljs-keyword">el</span>, {
                rotateZ: <span class="hljs-string">&apos;45deg&apos;</span>,
                translateY: <span class="hljs-string">&apos;30px&apos;</span>,
                translateX: <span class="hljs-string">&apos;30px&apos;</span>,
                opacity: <span class="hljs-number">0</span>
            }, { <span class="hljs-built_in">complete</span>: done })
         }
     }
})</code></pre><p><strong>9&#x3001;&#x901A;&#x8FC7; appear &#x7279;&#x6027;&#x8BBE;&#x7F6E;&#x8282;&#x70B9;&#x5728;&#x521D;&#x59CB;&#x6E32;&#x67D3;&#x7684;&#x8FC7;&#x6E21;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition appear&gt; &lt;/transition&gt;

&#x81EA;&#x5B9A;&#x4E49;&#x8FC7;&#x6E21;&#x7C7B;&#x540D;&#xFF1A;
&lt;transition appear
    appear-class=&quot;custom-appear-class&quot;
    appear-to-class=&quot;custom-appear-to-class&quot;
    appear-active-class=&quot;custom-appear-active-class&quot;&gt;
&lt;/transition&gt;

&#x81EA;&#x5B9A;&#x4E49;JavaScript&#x6784;&#x5B50;&#xFF1A;
&lt;transition appear
    @before-appear=&apos;BeforeAppearHook&apos;
    @appear=&apos;AppearHook&apos;
    @after-appear=&apos;AfterAppearHook&apos;
    @appear-cancelled=&apos;AppearCancelledHook&apos;&gt;
&lt;/transition&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;transition appear&gt; <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>

&#x81EA;&#x5B9A;&#x4E49;&#x8FC7;&#x6E21;&#x7C7B;&#x540D;&#xFF1A;
&lt;transition appear
    appear-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;custom-appear-class&quot;</span>
    appear-to-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;custom-appear-to-class&quot;</span>
    appear-active-<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">&quot;custom-appear-active-class&quot;</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>

&#x81EA;&#x5B9A;&#x4E49;JavaScript&#x6784;&#x5B50;&#xFF1A;
&lt;transition appear
    @before-appear=<span class="hljs-string">&apos;BeforeAppearHook&apos;</span>
    @appear=<span class="hljs-string">&apos;AppearHook&apos;</span>
    @after-appear=<span class="hljs-string">&apos;AfterAppearHook&apos;</span>
    @appear-cancelled=<span class="hljs-string">&apos;AppearCancelledHook&apos;</span>&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span></code></pre><p><strong>10&#x3001;&#x591A;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x8FC7;&#x6E21;&#xFF08;&#x4F7F;&#x7528;key&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition&gt;
    &lt;button :key=&quot;docState&quot;&gt;
        {{ buttonMessage }}
    &lt;/button&gt;
&lt;/transition&gt;

computed: {
    buttonMessage: function () {
        switch (this.docState) {
            case &apos;saved&apos;: return &apos;&#x7F16;&#x8F91;&apos;
            case &apos;edited&apos;: return &apos;&#x4FDD;&#x5B58;&apos;
            case &apos;editing&apos;: return &apos;&#x53D6;&#x6D88;&apos;
        }
    }
}

&#x8FC7;&#x6E21;&#x6A21;&#x5F0F;
    out-in  &#x5F53;&#x524D;&#x5143;&#x7D20;&#x5148;&#x8FDB;&#x884C;&#x8FC7;&#x6E21;&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x65B0;&#x5143;&#x7D20;&#x8FC7;&#x6E21;&#x8FDB;&#x5165;
    in-out  &#x65B0;&#x5143;&#x7D20;&#x5148;&#x8FDB;&#x884C;&#x8FC7;&#x6E21;&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8FC7;&#x6E21;&#x79BB;&#x5F00;
&lt;transition name=&quot;fade&quot; mode=&quot;out-in&quot;&gt; &lt;/transition&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&lt;transition&gt;
    &lt;button :key=<span class="hljs-string">&quot;docState&quot;</span>&gt;
        {{ buttonMessage }}
    &lt;/button&gt;
&lt;/transition&gt;

computed: {
    buttonMessage: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">switch</span> (<span class="hljs-keyword">this</span>.docState) {
            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;saved&apos;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x7F16;&#x8F91;&apos;</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;edited&apos;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x4FDD;&#x5B58;&apos;</span>
            <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;editing&apos;</span>: <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;&#x53D6;&#x6D88;&apos;</span>
        }
    }
}

&#x8FC7;&#x6E21;&#x6A21;&#x5F0F;
    out-<span class="hljs-keyword">in</span>  &#x5F53;&#x524D;&#x5143;&#x7D20;&#x5148;&#x8FDB;&#x884C;&#x8FC7;&#x6E21;&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x65B0;&#x5143;&#x7D20;&#x8FC7;&#x6E21;&#x8FDB;&#x5165;
    <span class="hljs-keyword">in</span>-out  &#x65B0;&#x5143;&#x7D20;&#x5148;&#x8FDB;&#x884C;&#x8FC7;&#x6E21;&#xFF0C;&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x5F53;&#x524D;&#x5143;&#x7D20;&#x8FC7;&#x6E21;&#x79BB;&#x5F00;
&lt;transition name=<span class="hljs-string">&quot;fade&quot;</span> mode=<span class="hljs-string">&quot;out-in&quot;</span>&gt; &lt;/transition&gt;</code></pre><p><strong>10&#x3001;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x8FC7;&#x6E21;&#xFF08;&#x4F7F;&#x7528;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition name=&quot;component-fade&quot; mode=&quot;out-in&quot;&gt;
    &lt;component v-bind:is=&quot;view&quot;&gt;&lt;/component&gt;
&lt;/transition&gt;

new Vue({
    el:&apos;demo&apos;,
    data:{
        view:&apos;v-a&apos;
    },
    components:{
        &apos;v-a&apos;:{
            template:`&lt;div&gt;&#x7EC4;&#x4EF6;A&lt;/div&gt;`
        },
        &apos;v-b&apos;:{
            template:`&lt;div&gt;&#x7EC4;&#x4EF6;B&lt;/div&gt;`
        }
    }
})

.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to {
    opacity: 0;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>&lt;transition name=<span class="hljs-string">&quot;component-fade&quot;</span> mode=<span class="hljs-string">&quot;out-in&quot;</span>&gt;
    &lt;component v-bind:is=<span class="hljs-string">&quot;view&quot;</span>&gt;&lt;/component&gt;
&lt;/transition&gt;

new Vue({
    el:<span class="hljs-string">&apos;demo&apos;</span>,
    data:{
        view:<span class="hljs-string">&apos;v-a&apos;</span>
    },
    components:{
        <span class="hljs-string">&apos;v-a&apos;</span>:{
            template:`&lt;div&gt;&#x7EC4;&#x4EF6;A&lt;/div&gt;`
        },
        <span class="hljs-string">&apos;v-b&apos;</span>:{
            template:`&lt;div&gt;&#x7EC4;&#x4EF6;B&lt;/div&gt;`
        }
    }
})

.component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .<span class="hljs-number">3</span>s ease;
}
.component-fade-enter, .component-fade-leave-to {
    opacity: <span class="hljs-number">0</span>;
}</code></pre><p><strong>11&#x3001;&lt;transition-group&gt; &#x7EC4;&#x4EF6;&#x5B9E;&#x73B0;&#x5217;&#x8868;&#x7684;&#x8FC7;&#x6E21;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition-group&gt;&#x7EC4;&#x4EF6;&#x4F1A;&#x6E32;&#x67D3;&#x6210;&lt;span&gt;&#x6807;&#x7B7E;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; tag &#x7279;&#x6027;&#x66F4;&#x6362;&#x4E3A;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x3002;
&#x76EE;&#x6807;&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x63D0;&#x4F9B;&#x552F;&#x4E00;&#x7684; key &#x503C;

&lt;div id=&apos;demo&apos;&gt;
    &lt;button @click=&apos;add&apos;&gt;&#x6DFB;&#x52A0;&lt;/button&gt;
    &lt;button @click=&apos;remove&apos;&gt;&#x5220;&#x9664;&lt;/button&gt;
    &lt;button @click=&apos;shuffle&apos;&gt;&#x6253;&#x4E71;&lt;/button&gt;
    &lt;transition-group name=&apos;list&apos; tag=&apos;div&apos;&gt;
        &lt;span v-for=&apos;item in items&apos; :key=&apos;item&apos; class=&apos;list-item&apos;&gt;
            {{item}}
        &lt;/span&gt;
    &lt;/transition-group&gt;
&lt;/div&gt;

//_.shuffl(arr) &#x968F;&#x673A;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x88AB;&#x6253;&#x4E71;&#x7684;&#x6570;&#x7EC4;
//arr.splice(index,0,item) &#x5728;index&#x4F4D;&#x7F6E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; item &#x5143;&#x7D20;
//arr.splice(index,1) &#x5728;index&#x4F4D;&#x7F6E;&#x5220;&#x9664;1&#x4E2A;&#x5143;&#x7D20;

new Vue({
    el:&apos;demo&apos;,
    data:{
        items:[1,2,3,4,5,6,7,8,9],
        nextNum:10
    },
    methods:{
        randomIndex:function(){    //&#x8FD4;&#x56DE;1~9&#x4E4B;&#x95F4;&#x7684;&#x968F;&#x673A;&#x6570;
            return Math.floor(Math.random()*this.items.length)
        },
        add:function(){
            this.items.splice(this.randomIndex,0,nextNum++);    //&#x5728;&#x968F;&#x673A;&#x7684;&#x4F4D;&#x7F6E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6570;
        },
        remove:function(){
            this.items.splice(this.randomIndex,1);    //&#x5728;&#x968F;&#x673A;&#x7684;&#x4F4D;&#x7F6E;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x6570;
        },
        shuffle:function(){
            this.items=_.shuffle(this.items);    //&#x8FD4;&#x56DE;&#x987A;&#x5E8F;&#x88AB;&#x6253;&#x4E71;&#x7684;&#x6570;&#x7EC4;
        }
    }
})

.list-item{
    transition:all 1s;
    display:inline-block;
    margin-right:10px;
}
.list-leave-active {
    position: absolute;
}
.list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dsconfig"><code>&lt;<span class="hljs-string">transition-group&gt;</span>&#x7EC4;&#x4EF6;&#x4F1A;&#x6E32;&#x67D3;&#x6210;&lt;<span class="hljs-string">span&gt;</span>&#x6807;&#x7B7E;&#xFF0C;&#x53EF;&#x901A;&#x8FC7; <span class="hljs-string">tag </span>&#x7279;&#x6027;&#x66F4;&#x6362;&#x4E3A;&#x5176;&#x4ED6;&#x5143;&#x7D20;&#x3002;
&#x76EE;&#x6807;&#x5143;&#x7D20;&#x5FC5;&#x987B;&#x63D0;&#x4F9B;&#x552F;&#x4E00;&#x7684; <span class="hljs-string">key </span>&#x503C;

&lt;<span class="hljs-string">div </span><span class="hljs-string">id=</span><span class="hljs-string">&apos;demo&apos;</span>&gt;
    &lt;<span class="hljs-string">button </span>@<span class="hljs-string">click=</span><span class="hljs-string">&apos;add&apos;</span>&gt;&#x6DFB;&#x52A0;&lt;/<span class="hljs-string">button&gt;</span>
    &lt;<span class="hljs-string">button </span>@<span class="hljs-string">click=</span><span class="hljs-string">&apos;remove&apos;</span>&gt;&#x5220;&#x9664;&lt;/<span class="hljs-string">button&gt;</span>
    &lt;<span class="hljs-string">button </span>@<span class="hljs-string">click=</span><span class="hljs-string">&apos;shuffle&apos;</span>&gt;&#x6253;&#x4E71;&lt;/<span class="hljs-string">button&gt;</span>
    &lt;<span class="hljs-string">transition-group </span><span class="hljs-string">name=</span><span class="hljs-string">&apos;list&apos;</span> <span class="hljs-string">tag=</span><span class="hljs-string">&apos;div&apos;</span>&gt;
        &lt;<span class="hljs-string">span </span><span class="hljs-string">v-for=</span><span class="hljs-string">&apos;item in items&apos;</span> :<span class="hljs-string">key=</span><span class="hljs-string">&apos;item&apos;</span> <span class="hljs-string">class=</span><span class="hljs-string">&apos;list-item&apos;</span>&gt;
            {{<span class="hljs-string">item}</span>}
        &lt;/<span class="hljs-string">span&gt;</span>
    &lt;/<span class="hljs-string">transition-group&gt;</span>
&lt;/<span class="hljs-string">div&gt;</span>

//_.<span class="hljs-string">shuffl(</span><span class="hljs-string">arr)</span> &#x968F;&#x673A;&#x6253;&#x4E71;&#x6570;&#x7EC4;&#xFF0C;&#x5E76;&#x8FD4;&#x56DE;&#x88AB;&#x6253;&#x4E71;&#x7684;&#x6570;&#x7EC4;
//<span class="hljs-string">arr.</span><span class="hljs-string">splice(</span><span class="hljs-string">index,</span>0,<span class="hljs-string">item)</span> &#x5728;<span class="hljs-string">index&#x4F4D;</span>&#x7F6E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A; <span class="hljs-string">item </span>&#x5143;&#x7D20;
//<span class="hljs-string">arr.</span><span class="hljs-string">splice(</span><span class="hljs-string">index,</span>1) &#x5728;<span class="hljs-string">index&#x4F4D;</span>&#x7F6E;&#x5220;&#x9664;1&#x4E2A;&#x5143;&#x7D20;

<span class="hljs-string">new </span><span class="hljs-string">Vue(</span>{
    <span class="hljs-string">el:</span><span class="hljs-string">&apos;demo&apos;</span>,
    <span class="hljs-string">data:</span>{
        <span class="hljs-string">items:</span>[1,2,3,4,5,6,7,8,9],
        <span class="hljs-string">nextNum:10
</span>    },
    <span class="hljs-string">methods:</span>{
        <span class="hljs-string">randomIndex:function(</span>){    //&#x8FD4;&#x56DE;1~9&#x4E4B;&#x95F4;&#x7684;&#x968F;&#x673A;&#x6570;
            <span class="hljs-string">return </span><span class="hljs-string">Math.</span><span class="hljs-string">floor(</span><span class="hljs-string">Math.</span><span class="hljs-string">random(</span>)*<span class="hljs-string">this.</span><span class="hljs-string">items.</span><span class="hljs-string">length)</span>
        },
        <span class="hljs-string">add:function(</span>){
            <span class="hljs-string">this.</span><span class="hljs-string">items.</span><span class="hljs-string">splice(</span><span class="hljs-string">this.</span><span class="hljs-string">randomIndex,</span>0,<span class="hljs-string">nextNum+</span>+);    //&#x5728;&#x968F;&#x673A;&#x7684;&#x4F4D;&#x7F6E;&#x6DFB;&#x52A0;&#x4E00;&#x4E2A;&#x6570;
        },
        <span class="hljs-string">remove:function(</span>){
            <span class="hljs-string">this.</span><span class="hljs-string">items.</span><span class="hljs-string">splice(</span><span class="hljs-string">this.</span><span class="hljs-string">randomIndex,</span>1);    //&#x5728;&#x968F;&#x673A;&#x7684;&#x4F4D;&#x7F6E;&#x5220;&#x9664;&#x4E00;&#x4E2A;&#x6570;
        },
        <span class="hljs-string">shuffle:function(</span>){
            <span class="hljs-string">this.</span><span class="hljs-string">items=</span>_.<span class="hljs-string">shuffle(</span><span class="hljs-string">this.</span><span class="hljs-string">items)</span>;    //&#x8FD4;&#x56DE;&#x987A;&#x5E8F;&#x88AB;&#x6253;&#x4E71;&#x7684;&#x6570;&#x7EC4;
        }
    }
})

.<span class="hljs-built_in">list-item{</span>
    <span class="hljs-string">transition:all </span><span class="hljs-string">1s;</span>
    <span class="hljs-string">display:inline-</span><span class="hljs-string">block;</span>
    <span class="hljs-string">margin-right:10px;</span>
}
.<span class="hljs-built_in">list-leave-active</span> {
    <span class="hljs-string">position:</span> <span class="hljs-string">absolute;</span>
}
.<span class="hljs-built_in">list-enter,</span> .<span class="hljs-built_in">list-leave-to</span> {
    <span class="hljs-string">opacity:</span> 0;
    <span class="hljs-string">transform:</span> <span class="hljs-string">translateY(</span><span class="hljs-string">30px)</span>;
}
</code></pre><p><strong>12&#x3001;&#x4E0E;JavaScript&#x4EA4;&#x4E92;&#x5B9E;&#x73B0;&#x4EA4;&#x9519;&#x8FC7;&#x6E21;&#xFF08;Velocity.js&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&apos;demo&apos;&gt;
    &lt;input v-model=&apos;query&apos;&gt;    //&#x6839;&#x636E;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7B5B;&#x9009;&#x663E;&#x793A;&#x5217;&#x8868;&#x4E2D;&#x7B26;&#x5408;&#x9879;+&#x52A8;&#x753B;
    &lt;transition-group name=&apos;fade&apos; tag=&apos;ul&apos; :css=&apos;false&apos; @before-enter=&apos;beforeEnter&apos; @enter=&apos;enter&apos; @leave=&apos;leave&apos;&gt;
        &lt;li v-for=&apos;(item,index) in items&apos; :key=&apos;item.msg&apos; :data-index=&apos;index&apos;&gt;
            {{item.msg}}
        &lt;/li&gt;
    &lt;/transition-group&gt;
&lt;/div&gt;

new Vue({
    el:&apos;#demo&apos;,
    data:{
        query:&apos;&apos;,
        list:[
            {msg:&apos;then&apos;},
            {msg:&apos;reject&apos;},
            {msg:&apos;undefiend&apos;},
            {msg:&apos;resolve&apos;}
        ]
    },
    computed:{
        showList:function(){
            var vm=this;
            return this.list.filter(function(item){
                return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !==-1
            })
        }
    },
    methods:{
        beforeEnter:function(el){
            el.style.opacity=0;
            el.style.height=0;
        },
        enter:function(el,done){
            var delay=el.dataset.index*150;
            setTimeout(function(){
                Velocity(
                      el,
                      { opacity: 1, height: &apos;1.6em&apos; },
                      { complete: done }
                )
            }, delay)
        },
        leave:function(el,done){
            var delay = el.dataset.index * 150
            setTimeout(function () {
                Velocity(
                    el,
                    { opacity: 0, height: 0 },
                    { complete: done }
                )
            }, delay)
        }
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>&lt;div id=<span class="hljs-string">&apos;demo&apos;</span>&gt;
    &lt;input v-model=<span class="hljs-string">&apos;query&apos;</span>&gt;    <span class="hljs-comment">//&#x6839;&#x636E;&#x7528;&#x6237;&#x8F93;&#x5165;&#x7B5B;&#x9009;&#x663E;&#x793A;&#x5217;&#x8868;&#x4E2D;&#x7B26;&#x5408;&#x9879;+&#x52A8;&#x753B;</span>
    &lt;transition-group name=<span class="hljs-string">&apos;fade&apos;</span> tag=<span class="hljs-string">&apos;ul&apos;</span> :css=<span class="hljs-string">&apos;false&apos;</span> @before-enter=<span class="hljs-string">&apos;beforeEnter&apos;</span> @enter=<span class="hljs-string">&apos;enter&apos;</span> @leave=<span class="hljs-string">&apos;leave&apos;</span>&gt;
        &lt;li v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&apos;(item,index) in items&apos;</span> :key=<span class="hljs-string">&apos;item.msg&apos;</span> :data-index=<span class="hljs-string">&apos;index&apos;</span>&gt;
            {{item.msg}}
        &lt;/li&gt;
    &lt;/transition-group&gt;
&lt;/div&gt;

<span class="hljs-keyword">new</span> Vue({
    el:<span class="hljs-string">&apos;#demo&apos;</span>,
    data:{
        query:<span class="hljs-string">&apos;&apos;</span>,
        list:[
            {msg:<span class="hljs-string">&apos;then&apos;</span>},
            {msg:<span class="hljs-string">&apos;reject&apos;</span>},
            {msg:<span class="hljs-string">&apos;undefiend&apos;</span>},
            {msg:<span class="hljs-string">&apos;resolve&apos;</span>}
        ]
    },
    computed:{
        showList:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">var</span> vm=<span class="hljs-keyword">this</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.list.filter(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
                <span class="hljs-keyword">return</span> item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !==<span class="hljs-number">-1</span>
            })
        }
    },
    methods:{
        beforeEnter:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el)</span></span>{
            el.style.opacity=<span class="hljs-number">0</span>;
            el.style.height=<span class="hljs-number">0</span>;
        },
        enter:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el,done)</span></span>{
            <span class="hljs-keyword">var</span> delay=el.dataset.index*<span class="hljs-number">150</span>;
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                Velocity(
                      el,
                      { opacity: <span class="hljs-number">1</span>, height: <span class="hljs-string">&apos;1.6em&apos;</span> },
                      { complete: done }
                )
            }, delay)
        },
        leave:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(el,done)</span></span>{
            <span class="hljs-keyword">var</span> delay = el.dataset.index * <span class="hljs-number">150</span>
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                Velocity(
                    el,
                    { opacity: <span class="hljs-number">0</span>, height: <span class="hljs-number">0</span> },
                    { complete: done }
                )
            }, delay)
        }
    }
})</code></pre><p><strong>13&#x3001;&#x521B;&#x5EFA;&#x53EF;&#x590D;&#x7528;&#x7684;&#x8FC7;&#x6E21;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x4EFB;&#x52A1;&#xFF1A;&#x53EA;&#x9700;&#x5C06;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x7684;&#x5143;&#x7D20;&#x6216;&#x5217;&#x8868;&#x653E;&#x5165;&#x8BE5;&#x8FC7;&#x6E21;&#x7EC4;&#x4EF6;&#x4E2D;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x76F8;&#x5E94;&#x7684;&#x52A8;&#x753B;
&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;
Vue.component(&apos;my-special-transition&apos;, {
    template: &apos;\
        &lt;transition\
            name=&quot;very-special-transition&quot;\
            mode=&quot;out-in&quot;\
            v-on:before-enter=&quot;beforeEnter&quot;\
            v-on:after-enter=&quot;afterEnter&quot;\
        &gt;\
            &lt;slot&gt;&lt;/slot&gt;\
        &lt;/transition&gt;\
      &apos;,
    methods: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
    }
})

&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x66F4;&#x9002;&#x5408;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#xFF1A;
Vue.component(&apos;my-special-transition&apos;, {
    functional: true,
    render: function (createElement, context) {
        var data = {
            props: {
                name: &apos;very-special-transition&apos;,
                mode: &apos;out-in&apos;
            },
            on: {
                beforeEnter: function (el) {
                  // ...
                },
                afterEnter: function (el) {
                  // ...
                }
            }
        }
        return createElement(&apos;transition&apos;, data, context.children)
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs scilab"><code><span class="hljs-comment">//&#x4EFB;&#x52A1;&#xFF1A;&#x53EA;&#x9700;&#x5C06;&#x9700;&#x8981;&#x5B9E;&#x73B0;&#x52A8;&#x753B;&#x7684;&#x5143;&#x7D20;&#x6216;&#x5217;&#x8868;&#x653E;&#x5165;&#x8BE5;&#x8FC7;&#x6E21;&#x7EC4;&#x4EF6;&#x4E2D;&#x5373;&#x53EF;&#x5B9E;&#x73B0;&#x76F8;&#x5E94;&#x7684;&#x52A8;&#x753B;</span>
&#x65B9;&#x5F0F;&#x4E00;&#xFF1A;
Vue.component(<span class="hljs-string">&apos;my-special-transition&apos;</span>, {
    template: <span class="hljs-string">&apos;\
        &lt;transition\
            name=&quot;</span>very-special-transition<span class="hljs-string">&quot;\
            mode=&quot;</span>out-in<span class="hljs-string">&quot;\
            v-on:before-enter=&quot;</span>beforeEnter<span class="hljs-string">&quot;\
            v-on:after-enter=&quot;</span>afterEnter<span class="hljs-string">&quot;\
        &gt;\
            &lt;slot&gt;&lt;/slot&gt;\
        &lt;/transition&gt;\
      &apos;</span>,
    methods: {
        beforeEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> {</span>
          <span class="hljs-comment">// ...</span>
        },
        afterEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> {</span>
          <span class="hljs-comment">// ...</span>
        }
    }
})

&#x51FD;&#x6570;&#x7EC4;&#x4EF6;&#x66F4;&#x9002;&#x5408;&#x5B8C;&#x6210;&#x8FD9;&#x4E2A;&#x4EFB;&#x52A1;&#xFF1A;
Vue.component(<span class="hljs-string">&apos;my-special-transition&apos;</span>, {
    functional: true,
    render: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(createElement, context)</span> {</span>
        var data = {
            props: {
                name: <span class="hljs-string">&apos;very-special-transition&apos;</span>,
                mode: <span class="hljs-string">&apos;out-in&apos;</span>
            },
            on: {
                beforeEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> {</span>
                  <span class="hljs-comment">// ...</span>
                },
                afterEnter: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(el)</span> {</span>
                  <span class="hljs-comment">// ...</span>
                }
            }
        }
        <span class="hljs-keyword">return</span> createElement(<span class="hljs-string">&apos;transition&apos;</span>, data, context.children)
    }
})</code></pre><p>14&#x3001;&#x52A8;&#x6001;&#x8FC7;&#x6E21;&#xFF08;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x8FC7;&#x6E21;&#x52A8;&#x753B;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;transition :name=&quot;transitionName&quot;&gt; &lt;/transition&gt;
//&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x4E0A;&#x4E0B;&#x6587;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x901A;&#x8FC7; JavaScript &#x8FC7;&#x6E21;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x8FC7;&#x6E21;&#x6548;&#x679C;
//&#x6700;&#x7EC8;&#x65B9;&#x6848;&#x662F;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x63A5;&#x53D7; props &#x6765;&#x52A8;&#x6001;&#x4FEE;&#x6539;&#x4E4B;&#x524D;&#x7684;&#x8FC7;&#x6E21;&#x3002;&#x4E00;&#x53E5;&#x8001;&#x8BDD;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x9650;&#x5236;&#x662F;&#x4F60;&#x7684;&#x60F3;&#x8C61;&#x529B;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;transition :name=<span class="hljs-string">&quot;transitionName&quot;</span>&gt; <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>
<span class="hljs-comment">//&#x901A;&#x8FC7;&#x4E8B;&#x4EF6;&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x76F8;&#x5E94;&#x4E0A;&#x4E0B;&#x6587;&#x6570;&#x636E;&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#xFF0C;&#x53EF;&#x4EE5;&#x6839;&#x636E;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x901A;&#x8FC7; JavaScript &#x8FC7;&#x6E21;&#x8BBE;&#x7F6E;&#x4E0D;&#x540C;&#x7684;&#x8FC7;&#x6E21;&#x6548;&#x679C;</span>
<span class="hljs-comment">//&#x6700;&#x7EC8;&#x65B9;&#x6848;&#x662F;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x63A5;&#x53D7; props &#x6765;&#x52A8;&#x6001;&#x4FEE;&#x6539;&#x4E4B;&#x524D;&#x7684;&#x8FC7;&#x6E21;&#x3002;&#x4E00;&#x53E5;&#x8001;&#x8BDD;&#xFF0C;&#x552F;&#x4E00;&#x7684;&#x9650;&#x5236;&#x662F;&#x4F60;&#x7684;&#x60F3;&#x8C61;&#x529B;&#x3002;</span></code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js动画笔记

## 原文链接
[https://segmentfault.com/a/1190000016366877](https://segmentfault.com/a/1190000016366877)

