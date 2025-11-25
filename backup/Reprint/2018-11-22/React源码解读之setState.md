---
title: 'React源码解读之setState' 
date: 2018-11-22 2:30:10
hidden: true
slug: ym27ocuynce
categories: [reprint]
---

{{< raw >}}
<p>&#x6CD5;&#x56FD;&#x961F;&#x65F6;&#x9694;20&#x5E74;&#x593A;&#x5F97;&#x4E86;&#x4E16;&#x754C;&#x676F;&#x51A0;&#x519B;&#xFF0C;&#x8FD9;&#x4E2A;&#x4EE4;&#x4EBA;&#x5174;&#x594B;&#x7684;&#x6D88;&#x606F;&#x5230;&#x73B0;&#x5728;&#x8FD8;&#x5728;&#x6211;&#x5185;&#x5FC3;&#x4E0D;&#x80FD;&#x5E73;&#x606F;&#xFF0C;&#x77EB;&#x60C5;&#x8FC7;&#x540E;&#x5F00;&#x59CB;&#x7740;&#x624B;&#x5206;&#x6790;&#x4E00;&#x6CE2;&#xFF0C;&#x5F53;&#x7136;&#x4E86;&#x5206;&#x6790;&#x7684;&#x6BD4;&#x8F83;&#x62D9;&#x52A3;&#xFF0C;&#x5E0C;&#x671B;&#x80FD;&#x7ED9;&#x5B66;&#x4E60;react&#x7684;&#x4EBA;&#x9001;&#x53BB;&#x4E00;&#x70B9;&#x542F;&#x53D1;&#x548C;&#x5E0C;&#x671B;&#xFF0C;&#x5199;&#x7684;&#x6709;&#x6240;&#x7EB0;&#x6F0F;&#xFF0C;&#x4E0D;&#x8DB3;&#x4E4B;&#x5904;&#x8FD8;&#x5E0C;&#x671B;&#x77E5;&#x8BC6;&#x50A8;&#x5907;&#x662F;&#x6211;&#x51E0;&#x500D;&#x7684;&#x5927;&#x725B;&#x4EEC;&#x4EEC;&#x6307;&#x51FA;&#x3002;</p><p>&#x6B63;&#x5982;&#x5927;&#x5BB6;&#x4E00;&#x81F4;&#x516C;&#x8BA4;&#x7684;react&#x662F;&#x4EE5;&#x6570;&#x636E;&#x4E3A;&#x6838;&#x5FC3;&#x7684;&#xFF0C;&#x56E0;&#x6B64;&#x8BF4;&#x5230;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x7684;&#x65F6;&#x5019;&#x6211;&#x4E0B;&#x610F;&#x8BC6;&#x7684;&#x4F1A;&#x60F3;&#x5230;&#x5F53;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x3002;&#x9664;&#x4E86;&#x901A;&#x8FC7;redux&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x4ECE;&#x800C;&#x8FDB;&#x884C;&#x7EC4;&#x4EF6;&#x66F4;&#x65B0;&#x5916;&#x8FD8;&#x6709;&#x50CF;&#x6211;&#x8FD9;&#x79CD;&#x83DC;&#x9E21;&#x901A;&#x8FC7;<br>setState&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x4FEE;&#x6539;&#xFF0C;&#x5173;&#x4E8E;setState&#xFF0C;&#x76F8;&#x4FE1;&#x6709;&#x4E0D;&#x5C11;&#x4EBA;&#x4E00;&#x5F00;&#x59CB;&#x548C;&#x6211;&#x6709;&#x4E00;&#x6837;&#x7684;&#x7591;&#x60D1;&#xFF0C;&#x4E3A;&#x4F55;&#x4E0D;&#x80FD;&#x901A;&#x8FC7;&#x666E;&#x901A;&#x7684;this.state&#x6765;&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#xFF0C;&#x5728;&#x5F00;&#x59CB;&#x524D;&#x9996;&#x5148;&#x601D;&#x8003;&#x4E2A;&#x95EE;&#x9898;,&#x4E0B;&#x9762;&#x7684;&#x6253;&#x5370;&#x7ED3;&#x679C;&#x5206;&#x522B;&#x662F;&#x591A;&#x5C11;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;!DOCTYPE html&gt;
    &lt;html lang=&quot;en&quot;&gt;
        &lt;head&gt;
            &lt;meta charset=&quot;UTF-8&quot;&gt;
            &lt;title&gt;Document&lt;/title&gt;
            &lt;script src=&quot;./js/react.js&quot;&gt;&lt;/script&gt;
            &lt;script src=&quot;./js/react-dom.js&quot;&gt;&lt;/script&gt;
            &lt;script src=&quot;./js/browser.js&quot;&gt;&lt;/script&gt;
            &lt;script type=&quot;text/babel&quot;&gt;

                class Comp extends React.Component{
                    constructor(...args) {
                        super(...args);
                        this.state = {i: 0}
                    }

                    render(){
                        return &lt;div onClick={() =&gt; {
                            this.setState({i: this.state.i + 1})
                            console.log(&apos;1&apos;,this.state.i);     // 1
    
                            this.setState({i: this.state.i + 1})
                            console.log(&apos;2&apos;,this.state.i);     // 2
    
                            setTimeout(() =&gt; {
                                this.setState({i: this.state.i + 1})
                                console.log(&apos;3&apos;,this.state.i)  // 3
    
                                this.setState({i: this.state.i + 1})
                                console.log(&apos;4&apos;,this.state.i)  // 4
                            },0);
    
                            this.setState((prevState, props) =&gt; ({
                              i: prevState.i + 1
                            }));
                        "}}"&gt;Hello, world!{this.state.i} &lt;i&gt;{this.props.name}, &#x5E74;&#x9F84;{this.props.age}&lt;/i&gt;&lt;/div&gt;;
                        }
                    }
                    window.onload = function(){
                        var oDiv = document.getElementById(&apos;div1&apos;);
                        ReactDOM.render(
                            &lt;Comp name=&quot;zjf&quot; age=&apos;24&apos;/&gt;,
                            oDiv
                        );
                    }
            &lt;/script&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;div id=&quot;div1&quot;&gt;&lt;/div&gt;
        &lt;/body&gt;
    &lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code> <span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/react.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/react-dom.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;./js/browser.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/babel&quot;</span>&gt;</span><span class="actionscript">

                <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Comp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
                    constructor(...args) {
                        <span class="hljs-keyword">super</span>(...args);
                        <span class="hljs-keyword">this</span>.state = {i: <span class="hljs-number">0</span>}
                    }

                    render(){
                        <span class="hljs-keyword">return</span> &lt;div onClick={() =&gt; {
                            <span class="hljs-keyword">this</span>.setState({i: <span class="hljs-keyword">this</span>.state.i + <span class="hljs-number">1</span>})
                            console.log(<span class="hljs-string">&apos;1&apos;</span>,<span class="hljs-keyword">this</span>.state.i);     <span class="hljs-comment">// 1</span>
    
                            <span class="hljs-keyword">this</span>.setState({i: <span class="hljs-keyword">this</span>.state.i + <span class="hljs-number">1</span>})
                            console.log(<span class="hljs-string">&apos;2&apos;</span>,<span class="hljs-keyword">this</span>.state.i);     <span class="hljs-comment">// 2</span>
    
                            setTimeout(() =&gt; {
                                <span class="hljs-keyword">this</span>.setState({i: <span class="hljs-keyword">this</span>.state.i + <span class="hljs-number">1</span>})
                                console.log(<span class="hljs-string">&apos;3&apos;</span>,<span class="hljs-keyword">this</span>.state.i)  <span class="hljs-comment">// 3</span>
    
                                <span class="hljs-keyword">this</span>.setState({i: <span class="hljs-keyword">this</span>.state.i + <span class="hljs-number">1</span>})
                                console.log(<span class="hljs-string">&apos;4&apos;</span>,<span class="hljs-keyword">this</span>.state.i)  <span class="hljs-comment">// 4</span>
                            },<span class="hljs-number">0</span>);
    
                            <span class="hljs-keyword">this</span>.setState((prevState, props) =&gt; ({
                              i: prevState.i + <span class="hljs-number">1</span>
                            }));
                        "}}"&gt;Hello, world!{<span class="hljs-keyword">this</span>.state.i} &lt;i&gt;{<span class="hljs-keyword">this</span>.props.name}, &#x5E74;&#x9F84;{<span class="hljs-keyword">this</span>.props.age}&lt;/i&gt;&lt;/div&gt;;
                        }
                    }
                    window.onload = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                        <span class="hljs-keyword">var</span> oDiv = document.getElementById(<span class="hljs-string">&apos;div1&apos;</span>);
                        ReactDOM.render(
                            &lt;Comp name=<span class="hljs-string">&quot;zjf&quot;</span> age=<span class="hljs-string">&apos;24&apos;</span>/&gt;,
                            oDiv
                        );
                    }
            </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;div1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD9;&#x4E2A;&#x867D;&#x7136;&#x5BE5;&#x5BE5;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#x5374;&#x5BF9;&#x6211;&#x6765;&#x8BF4;&#x50CF;&#x89E3;&#x51B3;&#x5965;&#x6570;&#x9898;&#x90A3;&#x6837;&#x590D;&#x6742;&#xFF0C;1234&#xFF1F; 0012&#xFF1F; &#x3002;&#x3002;&#x5185;&#x5FC3;&#x7684;&#x65E0;&#x9650;&#x70ED;&#x60C5;&#x4E5F;&#x5C31;&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x968F;&#x7740;&#x590F;&#x5B63;&#x7684;&#x6E29;&#x5EA6;&#x4E0A;&#x5347;&#x518D;&#x4E0A;&#x5347;&#x4E86;&#xFF0C;&#x9ED8;&#x9ED8;&#x6253;&#x5F00;&#x4E86;&#x6E90;&#x4EE3;&#x7801;&#xFF0C;&#x5176;&#x4E2D;&#x7684;&#x5B9E;&#x73B0;&#x771F;&#x7684;&#x53EF;&#x4EE5;&#x8BF4;amazing&#xFF0C;&#x5E26;&#x7740;&#x8FD9;&#x4E2A;&#x7591;&#x95EE;&#x8BA9;&#x6211;&#x4EEC;&#x9996;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;setState&#x7684;&#x82B3;&#x5BB9;&#xFF1A;</p><p><code>setState</code>&#x662F;&#x7EC4;&#x4EF6;&#x539F;&#x578B;&#x94FE;&#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53C2;&#x6570;&#x4E3A;<code>partialState</code>, <code>callback</code>&#xFF0C;&#x770B;&#x6837;&#x5B50;&#x957F;&#x5F97;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;55&#x5F00;&#x7684;&#xFF0C;&#x53C2;&#x6570;&#x4E5F;&#x4E0D;&#x591A;&#x3002;&#x63D0;&#x524D;&#x9884;&#x544A;&#x51E0;&#x4E2A;&#x53C2;&#x6570;&#xFF0C;<code>_pendingStateQueue</code>, <code>dirtyComponents</code>, <code>isBatchingUpdates</code>, <code>internalInstance</code>, <code>transaction</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === &apos;object&apos; || typeof partialState === &apos;function&apos; || partialState == null) ? &quot;development&quot; !== &apos;production&apos; ? invariant(false, &apos;setState(...): takes an object of state variables to update or a function which returns an object of state variables.&apos;) : _prodInvariant(&apos;85&apos;) : void 0;
  this.updater.enqueueSetState(this, partialState);
  // &#x5982;&#x679C;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x72B6;&#x6001;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x540E;&#x6267;&#x884C;
  if (callback) {
    this.updater.enqueueCallback(this, callback, &apos;setState&apos;);
  }
};   
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code>ReactComponent.prototype.setState = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(partialState, callback)</span> </span>{
  !(<span class="hljs-keyword">typeof</span> partialState === <span class="hljs-string">&apos;object&apos;</span> || <span class="hljs-keyword">typeof</span> partialState === <span class="hljs-string">&apos;function&apos;</span> || partialState == <span class="hljs-literal">null</span>) ? <span class="hljs-string">&quot;development&quot;</span> !== <span class="hljs-string">&apos;production&apos;</span> ? invariant(<span class="hljs-literal">false</span>, <span class="hljs-string">&apos;setState(...): takes an object of state variables to update or a function which returns an object of state variables.&apos;</span>) : _prodInvariant(<span class="hljs-string">&apos;85&apos;</span>) : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.updater.enqueueSetState(<span class="hljs-keyword">this</span>, partialState);
  <span class="hljs-comment">// &#x5982;&#x679C;&#x6709;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x72B6;&#x6001;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x540E;&#x6267;&#x884C;</span>
  <span class="hljs-keyword">if</span> (callback) {
    <span class="hljs-keyword">this</span>.updater.enqueueCallback(<span class="hljs-keyword">this</span>, callback, <span class="hljs-string">&apos;setState&apos;</span>);
  }
};   
</code></pre><p><code>enqueueSetState&#xFF1A;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// updater&#x662F;&#x5B58;&#x653E;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x7684;&#x4E00;&#x4E2A;&#x7C7B;
updater.enqueueSetState
// mountComponent&#x65F6;&#x628A;ReactElement&#x4F5C;&#x4E3A;key&#xFF0C;&#x5C06;ReactComponent&#x5B58;&#x5165;&#x4E86;map&#x4E2D;
var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, &apos;setState&apos;);
// _pendingStateQueue&#xFF1A;&#x5F85;&#x66F4;&#x65B0;&#x961F;&#x5217;&#xFF0C;&#x5982;&#x679C;_pendingStateQueue&#x7684;&#x503C;&#x4E3A;null&#xFF0C;&#x5C06;&#x5176;&#x8D4B;&#x503C;&#x4E3A;&#x7A7A;&#x6570;&#x7EC4;[]&#xFF0C;&#x5E76;&#x5C06;partialState&#x653E;&#x5165;&#x5F85;&#x66F4;&#x65B0;state&#x961F;&#x5217;_pendingStateQueue&#xFF0C;&#x6700;&#x540E;&#x6267;&#x884C;enqueueUpdate(internalInstance)
var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code><span class="hljs-comment">// updater&#x662F;&#x5B58;&#x653E;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x65B9;&#x6CD5;&#x7684;&#x4E00;&#x4E2A;&#x7C7B;</span>
updater.enqueueSetState
<span class="hljs-comment">// mountComponent&#x65F6;&#x628A;ReactElement&#x4F5C;&#x4E3A;key&#xFF0C;&#x5C06;ReactComponent&#x5B58;&#x5165;&#x4E86;map&#x4E2D;</span>
<span class="hljs-built_in">var</span> internalInstance = getInternalInstanceReadyForUpdate(publicInstance, <span class="hljs-string">&apos;setState&apos;</span>);
<span class="hljs-comment">// _pendingStateQueue&#xFF1A;&#x5F85;&#x66F4;&#x65B0;&#x961F;&#x5217;&#xFF0C;&#x5982;&#x679C;_pendingStateQueue&#x7684;&#x503C;&#x4E3A;null&#xFF0C;&#x5C06;&#x5176;&#x8D4B;&#x503C;&#x4E3A;&#x7A7A;&#x6570;&#x7EC4;[]&#xFF0C;&#x5E76;&#x5C06;partialState&#x653E;&#x5165;&#x5F85;&#x66F4;&#x65B0;state&#x961F;&#x5217;_pendingStateQueue&#xFF0C;&#x6700;&#x540E;&#x6267;&#x884C;enqueueUpdate(internalInstance)</span>
<span class="hljs-built_in">var</span> <span class="hljs-built_in">queue</span> = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = <span class="hljs-meta">[</span><span class="hljs-meta">]</span>);</code></pre><p><code>enqueueUpdate&#xFF1A;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// getInitialState&#xFF0C;componentWillMount&#xFF0C;render&#xFF0C;componentWillUpdate&#x4E2D;setState&#x90FD;&#x4E0D;&#x4F1A;&#x5F15;&#x8D77;updateComponent
// &#x901A;&#x8FC7;isBatchingUpdates&#x6765;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x7684;&#x72B6;&#x6001;
batchingStrategy.isBatchingUpdates!==true ?
batchingStrategy.batchedUpdates(enqueueUpdate, component);
:dirtyComponents.push(component);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// getInitialState&#xFF0C;componentWillMount&#xFF0C;render&#xFF0C;componentWillUpdate&#x4E2D;setState&#x90FD;&#x4E0D;&#x4F1A;&#x5F15;&#x8D77;updateComponent</span>
<span class="hljs-comment">// &#x901A;&#x8FC7;isBatchingUpdates&#x6765;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5904;&#x4E8E;&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x7684;&#x72B6;&#x6001;</span>
batchingStrategy.isBatchingUpdates!==<span class="hljs-literal">true</span> ?
batchingStrategy.batchedUpdates(enqueueUpdate, component);
:dirtyComponents.push(component);</code></pre><p><code>&#x9700;&#x8981;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;&#x7684;&#x5904;&#x7406;&#x672C;&#x8EAB;&#x5C31;&#x662F;&#x5728;&#x4E00;&#x4E2A;&#x5927;&#x7684;&#x4E8B;&#x52A1;&#x4E2D;&#xFF0C;isBatchingUpdates&#x5DF2;&#x7ECF;&#x662F;true&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x524D;&#x4E24;&#x6B21;&#x7684;setState&#x4EE5;&#x53CA;&#x6700;&#x540E;&#x4E00;&#x6B21;&#x8FC7;&#x7A0B;&#x7684;component&#xFF0C;&#x90FD;&#x88AB;&#x5B58;&#x5165;&#x4E86;dirtyComponent&#x4E2D;</code></p><p><span class="img-wrap"><img data-src="/img/bVbd5R1?w=994&amp;h=674" src="https://static.alili.tech/img/bVbd5R1?w=994&amp;h=674" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x95EE;&#x9898;&#x6765;&#x4E86;&#xFF0C;&#x4E3A;&#x4F55;&#x5728;&#x5F53;&#x5B58;&#x5165;dirtyComponent&#x4E2D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F55;&#x65F6;&#x8FDB;&#x884C;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#xFF0C;&#x8981;&#x77E5;&#x9053;&#x8FD9;&#x4E2A;&#x9700;&#x8981;&#x81F3;&#x5C11;batchingStrategy&#x7684;&#x6784;&#x6210;&#x4EE5;&#x53CA;&#x4E8B;&#x52A1;&#x7684;&#x539F;&#x7406;&#xFF0C;&#x9996;&#x5148;injectBatchingStrategy&#x662F;&#x901A;&#x8FC7;injectBatchingStrategy&#x8FDB;&#x884C;&#x6CE8;&#x5165;&#xFF0C;&#x53C2;&#x6570;&#x4E3A;ReactDefaultBatchingStrategy&#xFF0C;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//batchingStrategy&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x7B56;&#x7565;
ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
      // &#x7B80;&#x5355;&#x6765;&#x8BF4;&#x4E8B;&#x52A1;&#x6709;initiation-&gt;&#x6267;&#x884C;callback-&gt;close&#x8FC7;&#x7A0B;&#xFF0C;callback&#x5373;&#x4E3A;enqueueUpdate&#x65B9;&#x6CD5;
      // transaction&#x901A;&#x8FC7;new ReactDefaultBatchingStrategyTransaction()&#x751F;&#x6210;&#xFF0C;&#x6700;&#x540E;&#x901A;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;&#x8C03;&#x7528;return TRANSACTION_WRAPPERS
      return transaction.perform(callback, null, a, b, c, d, e);
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//batchingStrategy&#x6279;&#x91CF;&#x66F4;&#x65B0;&#x7B56;&#x7565;</span>
ReactDefaultBatchingStrategy = {
  <span class="hljs-attr">isBatchingUpdates</span>: <span class="hljs-literal">false</span>,

  <span class="hljs-attr">batchedUpdates</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, a, b, c, d, e</span>) </span>{
      <span class="hljs-comment">// &#x7B80;&#x5355;&#x6765;&#x8BF4;&#x4E8B;&#x52A1;&#x6709;initiation-&gt;&#x6267;&#x884C;callback-&gt;close&#x8FC7;&#x7A0B;&#xFF0C;callback&#x5373;&#x4E3A;enqueueUpdate&#x65B9;&#x6CD5;</span>
      <span class="hljs-comment">// transaction&#x901A;&#x8FC7;new ReactDefaultBatchingStrategyTransaction()&#x751F;&#x6210;&#xFF0C;&#x6700;&#x540E;&#x901A;&#x8FC7;&#x4E00;&#x7CFB;&#x5217;&#x8C03;&#x7528;return TRANSACTION_WRAPPERS</span>
      <span class="hljs-keyword">return</span> transaction.perform(callback, <span class="hljs-literal">null</span>, a, b, c, d, e);
  }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x8BBE;&#x7F6E;&#x4E24;&#x4E2A;wrapper,RESET_BATCHED_UPDATES&#x8BBE;&#x7F6E;isBatchingUpdates&#xFF0C;FLUSH_BATCHED_UPDATES&#x4F1A;&#x5728;&#x4E00;&#x4E2A;transaction&#x7684;close&#x9636;&#x6BB5;&#x8FD0;&#x884C;runBatchedUpdates&#xFF0C;&#x4ECE;&#x800C;&#x6267;&#x884C;update
var TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

var RESET_BATCHED_UPDATES = {
  initialize: emptyFunction,
  close: function () {
    // &#x4E8B;&#x52A1;&#x6279;&#x66F4;&#x65B0;&#x5904;&#x7406;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;&#x5C06;isBatchingUpdates&#x8BBE;&#x4E3A;&#x4E86;false
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
  }
};

var FLUSH_BATCHED_UPDATES = {
  initialize: emptyFunction,
  // &#x5173;&#x952E;&#x6B65;&#x9AA4;
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x4E24;&#x4E2A;wrapper,RESET_BATCHED_UPDATES&#x8BBE;&#x7F6E;isBatchingUpdates&#xFF0C;FLUSH_BATCHED_UPDATES&#x4F1A;&#x5728;&#x4E00;&#x4E2A;transaction&#x7684;close&#x9636;&#x6BB5;&#x8FD0;&#x884C;runBatchedUpdates&#xFF0C;&#x4ECE;&#x800C;&#x6267;&#x884C;update</span>
<span class="hljs-keyword">var</span> TRANSACTION_WRAPPERS = [FLUSH_BATCHED_UPDATES, RESET_BATCHED_UPDATES];

<span class="hljs-keyword">var</span> RESET_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// &#x4E8B;&#x52A1;&#x6279;&#x66F4;&#x65B0;&#x5904;&#x7406;&#x7ED3;&#x675F;&#x65F6;&#xFF0C;&#x5C06;isBatchingUpdates&#x8BBE;&#x4E3A;&#x4E86;false</span>
    ReactDefaultBatchingStrategy.isBatchingUpdates = <span class="hljs-literal">false</span>;
  }
};

<span class="hljs-keyword">var</span> FLUSH_BATCHED_UPDATES = {
  <span class="hljs-attr">initialize</span>: emptyFunction,
  <span class="hljs-comment">// &#x5173;&#x952E;&#x6B65;&#x9AA4;</span>
  close: ReactUpdates.flushBatchedUpdates.bind(ReactUpdates)
};</code></pre><p>&#x4E0B;&#x9762;&#x56FE;&#x7247;&#x5F88;&#x597D;&#x5730;&#x89E3;&#x91CA;&#x4E86;&#x4E8B;&#x52A1;&#x7684;&#x6D41;&#x7A0B;&#xFF0C;&#x914D;&#x5408;TRANSACTION_WRAPPERS&#x7684;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;perform&#x4F1A;&#x4F9D;&#x6B21;&#x8C03;&#x7528;&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5185;&#x7684;initialize&#x65B9;&#x6CD5;&#x8FDB;&#x884C;&#x521D;&#x59CB;&#x5316;&#x64CD;&#x4F5C;&#xFF0C;&#x7136;&#x540E;&#x6267;&#x884C;method&#xFF0C;&#x6700;&#x540E;&#x4F9D;&#x6B21;&#x8C03;&#x7528;&#x8FD9;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x5185;&#x7684;close&#x8FDB;&#x884C;isBatchingUpdates&#x91CD;&#x7F6E;&#x4EE5;&#x53CA;&#x72B6;&#x6001;&#x7684;&#x66F4;&#x65B0;&#xFF0C;&#x7531;&#x4E8E;JS&#x7684;&#x5355;&#x7EBF;&#x7A0B;&#x673A;&#x5236;&#xFF0C;&#x6240;&#x4EE5;&#x6BCF;&#x6761;&#x4E8B;&#x52A1;&#x90FD;&#x4F1A;&#x4F9D;&#x6B21;&#x6267;&#x884C;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x5C31;&#x6709;&#x4E86;isBatchingUpdates&#x4ECE;false-&gt;true-&gt;false&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;partialState&#x4E0D;&#x4F1A;&#x88AB;&#x5B58;&#x5165;dirtyComponent&#x4E2D;&#xFF0C;&#x800C;&#x662F;&#x8C03;&#x7528;batchingStrategy.batchedUpdates(enqueueUpdate, component)&#xFF0C;&#x8FDB;&#x884C;initialize-&gt;enqueueUpdate-&gt;close&#x66F4;&#x65B0;state&#x64CD;&#x4F5C;</p><p><span class="img-wrap"><img data-src="/img/bVbdQgx?w=1336&amp;h=982" src="https://static.alili.tech/img/bVbdQgx?w=1336&amp;h=982" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="perform: function (method, scope, a, b, c, d, e, f) {
    var errorThrown;
    var ret;
    try {
      this._isInTransaction = true;
      errorThrown = true;
      // &#x5148;&#x8FD0;&#x884C;&#x6240;&#x6709;transactionWrappers&#x4E2D;&#x7684;initialize&#x65B9;&#x6CD5;,&#x5F00;&#x59CB;&#x7D22;&#x5F15;&#x4E3A;0
      this.initializeAll(0);
      // &#x518D;&#x6267;&#x884C;perform&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;callback&#xFF0C;&#x4E5F;&#x5C31;&#x662F;enqueueUpdate
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = false;
    } finally {
      try {
        if (errorThrown) {
          // &#x6700;&#x540E;&#x8FD0;&#x884C;wrapper&#x4E2D;&#x7684;close&#x65B9;&#x6CD5;,endIndex&#x4E3A;0
          try {
            this.closeAll(0);
          } catch (err) {}
        } else {
          // &#x6700;&#x540E;&#x8FD0;&#x884C;wrapper&#x4E2D;&#x7684;close&#x65B9;&#x6CD5;
          this.closeAll(0);
        }
      } finally {
        this._isInTransaction = false;
      }
    }
    return ret;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">perform: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">method, scope, a, b, c, d, e, f</span>) </span>{
    <span class="hljs-keyword">var</span> errorThrown;
    <span class="hljs-keyword">var</span> ret;
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">this</span>._isInTransaction = <span class="hljs-literal">true</span>;
      errorThrown = <span class="hljs-literal">true</span>;
      <span class="hljs-comment">// &#x5148;&#x8FD0;&#x884C;&#x6240;&#x6709;transactionWrappers&#x4E2D;&#x7684;initialize&#x65B9;&#x6CD5;,&#x5F00;&#x59CB;&#x7D22;&#x5F15;&#x4E3A;0</span>
      <span class="hljs-keyword">this</span>.initializeAll(<span class="hljs-number">0</span>);
      <span class="hljs-comment">// &#x518D;&#x6267;&#x884C;perform&#x65B9;&#x6CD5;&#x4F20;&#x5165;&#x7684;callback&#xFF0C;&#x4E5F;&#x5C31;&#x662F;enqueueUpdate</span>
      ret = method.call(scope, a, b, c, d, e, f);
      errorThrown = <span class="hljs-literal">false</span>;
    } <span class="hljs-keyword">finally</span> {
      <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">if</span> (errorThrown) {
          <span class="hljs-comment">// &#x6700;&#x540E;&#x8FD0;&#x884C;wrapper&#x4E2D;&#x7684;close&#x65B9;&#x6CD5;,endIndex&#x4E3A;0</span>
          <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">this</span>.closeAll(<span class="hljs-number">0</span>);
          } <span class="hljs-keyword">catch</span> (err) {}
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// &#x6700;&#x540E;&#x8FD0;&#x884C;wrapper&#x4E2D;&#x7684;close&#x65B9;&#x6CD5;</span>
          <span class="hljs-keyword">this</span>.closeAll(<span class="hljs-number">0</span>);
        }
      } <span class="hljs-keyword">finally</span> {
        <span class="hljs-keyword">this</span>._isInTransaction = <span class="hljs-literal">false</span>;
      }
    }
    <span class="hljs-keyword">return</span> ret;
  }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="initializeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    // &#x904D;&#x5386;&#x6240;&#x6709;&#x6CE8;&#x518C;&#x7684;wrapper
    for (var i = startIndex; i &lt; transactionWrappers.length; i++) {
      var wrapper = transactionWrappers[i];
      this.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
      // &#x8C03;&#x7528;wrapper&#x7684;initialize&#x65B9;&#x6CD5;
      this.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(this) : null;
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">initializeAll: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">startIndex</span>) </span>{
    <span class="hljs-keyword">var</span> transactionWrappers = <span class="hljs-keyword">this</span>.transactionWrappers;
    <span class="hljs-comment">// &#x904D;&#x5386;&#x6240;&#x6709;&#x6CE8;&#x518C;&#x7684;wrapper</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = startIndex; i &lt; transactionWrappers.length; i++) {
      <span class="hljs-keyword">var</span> wrapper = transactionWrappers[i];
      <span class="hljs-keyword">this</span>.wrapperInitData[i] = Transaction.OBSERVED_ERROR;
      <span class="hljs-comment">// &#x8C03;&#x7528;wrapper&#x7684;initialize&#x65B9;&#x6CD5;</span>
      <span class="hljs-keyword">this</span>.wrapperInitData[i] = wrapper.initialize ? wrapper.initialize.call(<span class="hljs-keyword">this</span>) : <span class="hljs-literal">null</span>;
    }
  }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="closeAll: function (startIndex) {
    var transactionWrappers = this.transactionWrappers;
    // &#x904D;&#x5386;&#x6240;&#x6709;wrapper
    for (var i = startIndex; i &lt; transactionWrappers.length; i++) 
    {
        var wrapper = transactionWrappers[i];
        var initData = this.wrapperInitData[i];
        errorThrown = true;
        if (initData !== Transaction.OBSERVED_ERROR &amp;&amp; wrapper.close) {
          // &#x8C03;&#x7528;wrapper&#x7684;close&#x65B9;&#x6CD5;
          wrapper.close.call(this, initData);
        }
        ....
     }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">closeAll: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">startIndex</span>) </span>{
    <span class="hljs-keyword">var</span> transactionWrappers = <span class="hljs-keyword">this</span>.transactionWrappers;
    <span class="hljs-comment">// &#x904D;&#x5386;&#x6240;&#x6709;wrapper</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = startIndex; i &lt; transactionWrappers.length; i++) 
    {
        <span class="hljs-keyword">var</span> wrapper = transactionWrappers[i];
        <span class="hljs-keyword">var</span> initData = <span class="hljs-keyword">this</span>.wrapperInitData[i];
        errorThrown = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">if</span> (initData !== Transaction.OBSERVED_ERROR &amp;&amp; wrapper.close) {
          <span class="hljs-comment">// &#x8C03;&#x7528;wrapper&#x7684;close&#x65B9;&#x6CD5;</span>
          wrapper.close.call(<span class="hljs-keyword">this</span>, initData);
        }
        ....
     }
  }</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var flushBatchedUpdates = function () {
  // &#x5FAA;&#x73AF;&#x904D;&#x5386;&#x5904;&#x7406;&#x5B8C;&#x6240;&#x6709;dirtyComponents&#xFF0C;&#x5982;&#x679C;dirtyComponents&#x957F;&#x5EA6;&#x5927;&#x4E8E;1&#x4E5F;&#x53EA;&#x6267;&#x884C;1&#x6B21;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5C06;dirtyComponents&#x8BBE;&#x7F6E;&#x4E3A;null
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      // close&#x524D;&#x6267;&#x884C;&#x5B8C;runBatchedUpdates&#x65B9;&#x6CD5;
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    if (asapEnqueued) {
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> flushBatchedUpdates = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// &#x5FAA;&#x73AF;&#x904D;&#x5386;&#x5904;&#x7406;&#x5B8C;&#x6240;&#x6709;dirtyComponents&#xFF0C;&#x5982;&#x679C;dirtyComponents&#x957F;&#x5EA6;&#x5927;&#x4E8E;1&#x4E5F;&#x53EA;&#x6267;&#x884C;1&#x6B21;&#xFF0C;&#x56E0;&#x4E3A;&#x5728;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x5C06;dirtyComponents&#x8BBE;&#x7F6E;&#x4E3A;null</span>
  <span class="hljs-keyword">while</span> (dirtyComponents.length || asapEnqueued) {
    <span class="hljs-keyword">if</span> (dirtyComponents.length) {
      <span class="hljs-keyword">var</span> transaction = ReactUpdatesFlushTransaction.getPooled();
      <span class="hljs-comment">// close&#x524D;&#x6267;&#x884C;&#x5B8C;runBatchedUpdates&#x65B9;&#x6CD5;</span>
      transaction.perform(runBatchedUpdates, <span class="hljs-literal">null</span>, transaction);
      ReactUpdatesFlushTransaction.release(transaction);
    }

    <span class="hljs-keyword">if</span> (asapEnqueued) {
      asapEnqueued = <span class="hljs-literal">false</span>;
      <span class="hljs-keyword">var</span> queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled();
      queue.notifyAll();
      CallbackQueue.release(queue);
    }
  }
};</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="runBatchedUpdates(){
     // &#x6267;&#x884C;updateComponent
    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);

}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">runBatchedUpdates(){
     <span class="hljs-comment">// &#x6267;&#x884C;updateComponent</span>
    ReactReconciler.performUpdateIfNecessary(component, transaction.reconcileTransaction);

}</code></pre><p>close&#x524D;&#x6267;&#x884C;&#x5B8C;runBatchedUpdates&#x65B9;&#x6CD5;&#xFF0C; &#x80AF;&#x5B9A;&#x6709;&#x4EBA;&#x548C;&#x6211;&#x6709;&#x4E00;&#x6837;&#x7684;&#x7591;&#x60D1;&#x8FD9;&#x6837;&#x5728;&#x4E8B;&#x52A1;&#x7ED3;&#x675F;&#x7684;&#x65F6;&#x5019;&#x8C03;&#x7528;&#x4E8B;&#x52A1;&#x5185;&#x7684;close&#x518D;&#x6B21;&#x8FDB;&#x884C;&#x8C03;&#x7528;flushBatchedUpdates&#xFF0C;&#x4E0D;&#x662F;&#x5FAA;&#x73AF;&#x8C03;&#x7528;&#x4E00;&#x76F4;&#x8F6E;&#x56DE;&#x4E86;&#x5417;&#xFF0C;&#x5168;&#x5C40;&#x641C;&#x7D22;&#x4E0B;TRANSACTION_WRAPPERS&#xFF0C;&#x53D1;&#x73B0;&#x66F4;&#x65B0;&#x5B8C;&#x6210;&#x4EE5;&#x540E;&#x662F;&#x4E00;&#x4E2A;&#x5168;&#x65B0;&#x7684;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x4E24;&#x4E2A;close&#x65B9;&#x6CD5;&#xFF0C;&#x5305;&#x62EC;&#x8BBE;&#x7F6E;dirtyComponent&#x957F;&#x5EA6;&#x4E3A;0&#xFF0C;&#x8BBE;&#x7F6E;context&#xFF0C;callbacks&#x957F;&#x5EA6;&#x4E3A;0</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

var NESTED_UPDATES = {
  initialize: function () {
    this.dirtyComponentsLength = dirtyComponents.length;
  },
  close: function () {
    if (this.dirtyComponentsLength !== dirtyComponents.length) {
      dirtyComponents.splice(0, this.dirtyComponentsLength);
      // &#x5173;&#x952E;&#x6B65;&#x9AA4;
      flushBatchedUpdates();
    } else {
      dirtyComponents.length = 0;
    }
  }
};

var UPDATE_QUEUEING = {
  initialize: function () {
    this.callbackQueue.reset();
  },
  close: function () {
    this.callbackQueue.notifyAll();
  }
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> TRANSACTION_WRAPPERS = [NESTED_UPDATES, UPDATE_QUEUEING];

<span class="hljs-keyword">var</span> NESTED_UPDATES = {
  <span class="hljs-attr">initialize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.dirtyComponentsLength = dirtyComponents.length;
  },
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.dirtyComponentsLength !== dirtyComponents.length) {
      dirtyComponents.splice(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.dirtyComponentsLength);
      <span class="hljs-comment">// &#x5173;&#x952E;&#x6B65;&#x9AA4;</span>
      flushBatchedUpdates();
    } <span class="hljs-keyword">else</span> {
      dirtyComponents.length = <span class="hljs-number">0</span>;
    }
  }
};

<span class="hljs-keyword">var</span> UPDATE_QUEUEING = {
  <span class="hljs-attr">initialize</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.callbackQueue.reset();
  },
  <span class="hljs-attr">close</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.callbackQueue.notifyAll();
  }
};</code></pre><p>&#x6267;&#x884C;updateComponent&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#xFF0C;<code>&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x5185;&#x4F1A;&#x8C03;&#x7528;_processPendingState&#x8FDB;&#x884C;&#x539F;&#x6709;state&#x7684;&#x5408;&#x5E76;&#x4EE5;&#x53CA;&#x8BBE;&#x7F6E;this._pendingStateQueue = null&#xFF0C;&#x8FD9;&#x4E5F;&#x5C31;&#x610F;&#x5473;&#x7740;dirtyComponents&#x8FDB;&#x5165;&#x4E0B;&#x4E00;&#x6B21;&#x5FAA;&#x73AF;&#x65F6;&#xFF0C;&#x6267;&#x884C;performUpdateIfNecessary&#x4E0D;&#x4F1A;&#x518D;&#x53BB;&#x66F4;&#x65B0;&#x7EC4;&#x4EF6;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6267;&#x884C;updateComponent&#xFF0C;&#x4ECE;&#x800C;&#x5237;&#x65B0;View 
performUpdateIfNecessary: function (transaction) {
    if (this._pendingElement != null) {
      ReactReconciler.receiveComponent(this, this._pendingElement, transaction, this._context);
    }
    // &#x5728;setState&#x66F4;&#x65B0;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x53EA;&#x4F1A;&#x7528;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A; this._pendingStateQueue !== null &#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5373;&#x5982;&#x679C;_pendingStateQueue&#x4E2D;&#x8FD8;&#x5B58;&#x5728;&#x672A;&#x5904;&#x7406;&#x7684;state&#xFF0C;&#x90A3;&#x5C31;&#x4F1A;&#x6267;&#x884C;updateComponent&#x5B8C;&#x6210;&#x66F4;&#x65B0;&#x3002;
    else if (this._pendingStateQueue !== null || this._pendingForceUpdate) {
      // &#x6267;&#x884C;updateComponent&#xFF0C;&#x4ECE;&#x800C;&#x5237;&#x65B0;View    
      this.updateComponent(transaction, this._currentElement, this._currentElement, this._context, this._context);
    } else {
      this._updateBatchNumber = null;
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x6267;&#x884C;updateComponent&#xFF0C;&#x4ECE;&#x800C;&#x5237;&#x65B0;View </span>
performUpdateIfNecessary: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">transaction</span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._pendingElement != <span class="hljs-literal">null</span>) {
      ReactReconciler.receiveComponent(<span class="hljs-keyword">this</span>, <span class="hljs-keyword">this</span>._pendingElement, transaction, <span class="hljs-keyword">this</span>._context);
    }
    <span class="hljs-comment">// &#x5728;setState&#x66F4;&#x65B0;&#x4E2D;&#xFF0C;&#x5176;&#x5B9E;&#x53EA;&#x4F1A;&#x7528;&#x5230;&#x7B2C;&#x4E8C;&#x4E2A; this._pendingStateQueue !== null &#x7684;&#x5224;&#x65AD;&#xFF0C;&#x5373;&#x5982;&#x679C;_pendingStateQueue&#x4E2D;&#x8FD8;&#x5B58;&#x5728;&#x672A;&#x5904;&#x7406;&#x7684;state&#xFF0C;&#x90A3;&#x5C31;&#x4F1A;&#x6267;&#x884C;updateComponent&#x5B8C;&#x6210;&#x66F4;&#x65B0;&#x3002;</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._pendingStateQueue !== <span class="hljs-literal">null</span> || <span class="hljs-keyword">this</span>._pendingForceUpdate) {
      <span class="hljs-comment">// &#x6267;&#x884C;updateComponent&#xFF0C;&#x4ECE;&#x800C;&#x5237;&#x65B0;View    </span>
      <span class="hljs-keyword">this</span>.updateComponent(transaction, <span class="hljs-keyword">this</span>._currentElement, <span class="hljs-keyword">this</span>._currentElement, <span class="hljs-keyword">this</span>._context, <span class="hljs-keyword">this</span>._context);
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>._updateBatchNumber = <span class="hljs-literal">null</span>;
    }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_processPendingState: function (props, context) {
    var inst = this._instance;
    var queue = this._pendingStateQueue;
    var replace = this._pendingReplaceState;
    this._pendingReplaceState = false;
    this._pendingStateQueue = null;
    
    if (!queue) {
      return inst.state;
    }
    
    if (replace &amp;&amp; queue.length === 1) {
      return queue[0];
    }
    
    // &#x83B7;&#x53D6;&#x5B9E;&#x4F8B;&#x539F;&#x5148;&#x72B6;&#x6001;
    var nextState = _assign({}, replace ? queue[0] : inst.state);
    for (var i = replace ? 1 : 0; i &lt; queue.length; i++) {
      var partial = queue[i];
      // &#x8FDB;&#x884C;&#x5408;&#x5E76;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E3A;partial&#x7C7B;&#x578B;function&#x6267;&#x884C;&#x540E;&#x8FDB;&#x884C;&#x5408;&#x5E76;
      _assign(nextState, typeof partial === &apos;function&apos; ? partial.call(inst, nextState, props, context) : partial);
    }
    
    return nextState;
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">_processPendingState: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">props, context</span>) </span>{
    <span class="hljs-keyword">var</span> inst = <span class="hljs-keyword">this</span>._instance;
    <span class="hljs-keyword">var</span> queue = <span class="hljs-keyword">this</span>._pendingStateQueue;
    <span class="hljs-keyword">var</span> replace = <span class="hljs-keyword">this</span>._pendingReplaceState;
    <span class="hljs-keyword">this</span>._pendingReplaceState = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>._pendingStateQueue = <span class="hljs-literal">null</span>;
    
    <span class="hljs-keyword">if</span> (!queue) {
      <span class="hljs-keyword">return</span> inst.state;
    }
    
    <span class="hljs-keyword">if</span> (replace &amp;&amp; queue.length === <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">return</span> queue[<span class="hljs-number">0</span>];
    }
    
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x5B9E;&#x4F8B;&#x539F;&#x5148;&#x72B6;&#x6001;</span>
    <span class="hljs-keyword">var</span> nextState = _assign({}, replace ? queue[<span class="hljs-number">0</span>] : inst.state);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = replace ? <span class="hljs-number">1</span> : <span class="hljs-number">0</span>; i &lt; queue.length; i++) {
      <span class="hljs-keyword">var</span> partial = queue[i];
      <span class="hljs-comment">// &#x8FDB;&#x884C;&#x5408;&#x5E76;&#x64CD;&#x4F5C;&#xFF0C;&#x5982;&#x679C;&#x4E3A;partial&#x7C7B;&#x578B;function&#x6267;&#x884C;&#x540E;&#x8FDB;&#x884C;&#x5408;&#x5E76;</span>
      _assign(nextState, <span class="hljs-keyword">typeof</span> partial === <span class="hljs-string">&apos;function&apos;</span> ? partial.call(inst, nextState, props, context) : partial);
    }
    
    <span class="hljs-keyword">return</span> nextState;
},</code></pre><p>&#x901A;&#x8FC7;&#x4E0A;&#x8FF0;&#x53EF;&#x4EE5;&#x77E5;&#x9053;&#xFF0C;&#x76F4;&#x63A5;&#x4FEE;&#x6539;state&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x91CD;&#x65B0;&#x89E6;&#x53D1;render&#xFF0C;state&#x7684;&#x66F4;&#x65B0;&#x662F;&#x4E00;&#x4E2A;&#x5408;&#x5E76;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5F53;&#x4F7F;&#x7528;&#x5F02;&#x6B65;&#x6216;&#x8005;callback&#x7684;&#x65B9;&#x5F0F;&#x4F1A;&#x4F7F;&#x5F97;&#x66F4;&#x65B0;&#x64CD;&#x4F5C;&#x4EE5;&#x4E8B;&#x52A1;&#x7684;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x3002;&#x56E0;&#x6B64;&#x53EF;&#x4EE5;&#x6BD4;&#x8F83;&#x5BB9;&#x6613;&#x5730;&#x89E3;&#x7B54;&#x4E4B;&#x524D;&#x7684;&#x90A3;&#x4E2A;&#x7591;&#x95EE;&#xFF0C;&#x7B54;&#x6848;&#x4E3A;0&#xFF0C;0&#xFF0C;3&#xFF0C;4&#x3002;&#x5F53;&#x7136;&#x5982;&#x679C;&#x60F3;&#x5B9E;&#x73B0;setState&#x540C;&#x6B65;&#x66F4;&#x65B0;&#xFF0C;&#x5927;&#x6982;&#x53EF;&#x4EE5;&#x7528;&#x7740;&#x4E09;&#x4E2A;&#x65B9;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9E;&#x73B0;&#x540C;&#x6B65;&#x529E;&#x6CD5;
// &#x65B9;&#x6CD5;&#x4E00;&#xFF1A;
incrementCount(){
    this.setState((prevState, props) =&gt; ({
      count: prevState.count + 1
    }));
    this.setState((prevState, props) =&gt; ({
      count: prevState.count + 1
    }));
}
// &#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;
incrementCount(){
    setTimeout(() =&gt; {
        this.setState({
          count: prevState.count + 1
        });
        this.setState({
          count: prevState.count + 1
        });
    }, 0)
}
// &#x65B9;&#x6CD5;&#x4E09;&#xFF1A;
incrementCount(){
    this.setState({
      count: prevState.count + 1
    }&#xFF0C;() =&gt; {
        this.setState({
          count: prevState.count + 1
        });
    });
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9E;&#x73B0;&#x540C;&#x6B65;&#x529E;&#x6CD5;</span>
<span class="hljs-comment">// &#x65B9;&#x6CD5;&#x4E00;&#xFF1A;</span>
incrementCount(){
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ({
      <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
    }));
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ({
      <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
    }));
}
<span class="hljs-comment">// &#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;</span>
incrementCount(){
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
          <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
        });
        <span class="hljs-keyword">this</span>.setState({
          <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
        });
    }, <span class="hljs-number">0</span>)
}
<span class="hljs-comment">// &#x65B9;&#x6CD5;&#x4E09;&#xFF1A;</span>
incrementCount(){
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
    }&#xFF0C;() =&gt; {
        <span class="hljs-keyword">this</span>.setState({
          <span class="hljs-attr">count</span>: prevState.count + <span class="hljs-number">1</span>
        });
    });
}</code></pre><p>&#x603B;&#x7684;&#x6765;&#x8BF4;setState&#x7684;&#x8FC7;&#x7A0B;&#x8FD8;&#x662F;&#x5F88;&#x4F18;&#x96C5;&#x7684;&#xFF0C;&#x907F;&#x514D;&#x4E86;&#x91CD;&#x590D;&#x65E0;&#x8C13;&#x7684;&#x5237;&#x65B0;&#x7EC4;&#x4EF6;&#x3002;&#x5B83;&#x7684;&#x4E3B;&#x8981;&#x6D41;&#x7A0B;&#x5982;&#x4E0B;:<br><span class="img-wrap"><img data-src="/img/bVbd5Ve?w=678&amp;h=999" src="https://static.alili.tech/img/bVbd5Ve?w=678&amp;h=999" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span><br>enqueueSetState&#x5C06;state&#x653E;&#x5165;&#x961F;&#x5217;&#x4E2D;&#xFF0C;&#x5E76;&#x8C03;&#x7528;enqueueUpdate&#x5904;&#x7406;&#x8981;&#x66F4;&#x65B0;&#x7684;Component<br>&#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x5F53;&#x524D;&#x6B63;&#x5904;&#x4E8E;update&#x4E8B;&#x52A1;&#x4E2D;&#xFF0C;&#x5219;&#x5148;&#x5C06;Component&#x5B58;&#x5165;dirtyComponent&#x4E2D;&#x3002;&#x5426;&#x5219;&#x8C03;&#x7528;batchedUpdates&#x5904;&#x7406;&#xFF0C;&#x91C7;&#x7528;&#x4E8B;&#x52A1;&#x5F62;&#x5F0F;&#x8FDB;&#x884C;&#x6279;&#x91CF;&#x66F4;&#x65B0;state&#x3002;</p><p>&#x6700;&#x540E;&#x7ED3;&#x8BED;&#x6292;&#x53D1;&#x4E0B;&#x7A0B;&#x5E8F;&#x5458;&#x7684;&#x5C0F;&#x60C5;&#x6000;&#xFF0C;&#x751F;&#x6D3B;&#x4E2D;&#x603B;&#x6709;&#x90A3;&#x4E48;&#x51E0;&#x79CD;&#x65B9;&#x5F0F;&#x80FD;&#x591F;&#x8BA9;&#x4F60;&#x5FEB;&#x901F;&#x63D0;&#x9AD8;&#xFF0C;&#x6BD4;&#x5982;&#x8EAB;&#x8FB9;&#x6709;&#x5927;&#x725B;&#xFF0C;&#x6216;&#x8005;&#x901A;&#x8FC7;&#x5B66;&#x4E60;&#x6E90;&#x4EE3;&#x7801;&#x90FD;&#x662F;&#x4E0D;&#x9519;&#x7684;&#x9009;&#x62E9;&#xFF0C;&#x6211;&#x5F88;&#x5E78;&#x8FD0;&#x8FD9;&#x4E24;&#x4E2A;&#x6761;&#x4EF6;&#x76EE;&#x524D;&#x90FD;&#x80FD;&#x591F;&#x6EE1;&#x8DB3;&#x5230;&#xFF0C;&#x5E9F;&#x8BDD;&#x4E0D;&#x591A;&#x8BF4;&#x4E86;&#xFF0C;&#x65F6;&#x95F4;&#x5F88;&#x665A;&#x4E86;&#x6D17;&#x6D17;&#x7761;&#x4E86;&#xFF0C;&#x5B66;&#x4E60;react&#x8FD8;&#x4F9D;&#x65E7;&#x957F;&#x8DEF;&#x6F2B;&#x6F2B;&#xFF0C;&#x672A;&#x6765;&#x5F97;&#x52A0;&#x500D;&#x52AA;&#x529B;&#x624D;&#x662F;&#x3002;</p><p><code>&#x53C2;&#x8003;:</code><br><a href="https://www.kancloud.cn/kancloud/react-in-depth/47779" rel="nofollow noreferrer" target="_blank">&#x6DF1;&#x5165;react&#x6280;&#x672F;&#x6808;</a><br><a href="https://blog.csdn.net/sinat_17775997/article/details/77100815" rel="nofollow noreferrer" target="_blank">CSDN</a><br><a href="https://www.jianshu.com/p/3965c4bdc1ea" rel="nofollow noreferrer" target="_blank">&#x7B80;&#x4E66;</a><br><a href="https://juejin.im/post/5aa25967518825558251f61f" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;</a><br><a href="https://zhuanlan.zhihu.com/p/25882602" rel="nofollow noreferrer" target="_blank">&#x77E5;&#x4E4E;</a><br><a href="https://vasanthk.gitbooks.io/react-bits/patterns/19.async-nature-of-setState.html" rel="nofollow noreferrer" target="_blank">gitbook</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React源码解读之setState

## 原文链接
[https://segmentfault.com/a/1190000015713347](https://segmentfault.com/a/1190000015713347)

