---
title: 'react 官网动画库（react-transition-group）的新写法' 
date: 2018-11-24 2:30:10
hidden: true
slug: frc9ypw40bk
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x4E00;&#x3001;react-transition-group &#x4E00;&#x4E2A;&#x5B98;&#x7F51;&#x63D0;&#x4F9B;&#x7684;&#x52A8;&#x753B;&#x8FC7;&#x5EA6;&#x5E93;&#x3002;</h2><p>&#x641C;&#x7D22;&#x4E86;&#x7F51;&#x4E0A;&#x5173;&#x4E8E;react&#x52A8;&#x753B;&#x7684;&#xFF0C;&#x5F88;&#x591A;&#x7684;&#x7B54;&#x6848;&#x90FD;&#x662F;&#x5F88;&#x4E45;&#x4EE5;&#x524D;&#x7684;&#x4E86;&#x8001;&#x7248;&#x672C;&#x4E86;&#xFF0C;&#x800C;&#x73B0;&#x5728;&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x662F;&#x53EB;<code>react-transition-group</code> &#x5B83;&#x662F;&#x4EE5;&#x524D;&#x4E24;&#x4E2A;&#x7684;&#x5408;&#x4F53;&#x7248;&#x672C;&#xFF0C;&#x6240;&#x4EE5;&#x5199;&#x4E0B;&#x8FD9;&#x4E2A;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#xFF0C;&#x540C;&#x65F6;&#x4E5F;&#x7ED9;&#x4E00;&#x4E9B;&#x9700;&#x8981;&#x7684;&#x733F;&#x95E8;&#x7ED9;&#x4E00;&#x4E9B;&#x5C0F;&#x7684;&#x63D0;&#x793A;&#x3002;<br><strong>1&#x3001;&#x5B89;&#x88C5;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# npm
npm install react-transition-group --save

# yarn
yarn add react-transition-group" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs crmsh"><code><span class="hljs-comment"># npm</span>
npm install react-transition-<span class="hljs-keyword">group</span> <span class="hljs-title">--save</span>

<span class="hljs-comment"># yarn</span>
yarn add react-transition-group</code></pre><p>&#x800C;&#x5B98;&#x65B9;&#x63D0;&#x4F9B;&#x7684;&#x4E09;&#x4E2A;&#x7EC4;&#x5EFA;<code>Transition</code>,<code>CSSTransition</code>,<code>TransitonGroup</code>&#x3002;</p><h3 id="articleHeader1">Transition</h3><p>&#x8FC7;&#x6E21;&#x7EC4;&#x4EF6;(Transiton)&#x5141;&#x8BB8;&#x60A8;&#x7528;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;&#x58F0;&#x660E;&#x6027;API&#x63CF;&#x8FF0;&#x968F;&#x7740;&#x65F6;&#x95F4;&#x7684;&#x63A8;&#x79FB;&#x4ECE;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x5230;&#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x7684;&#x8F6C;&#x6362;&#x3002;&#x6700;&#x5E38;&#x7528;&#x7684;&#x662F;&#x7528;&#x6765;&#x52A8;&#x753B;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684;&#x5B89;&#x88C5;&#x548C;&#x5378;&#x8F7D;&#xFF0C;&#x4F46;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;&#x6765;&#x63CF;&#x8FF0;&#x5728;&#x9002;&#x5F53;&#x7684;&#x8FC7;&#x6E21;&#x72B6;&#x6001;&#x3002;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;&#x4E0D;&#x4F1A;&#x66F4;&#x6539;&#x5176;&#x5448;&#x73B0;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x884C;&#x4E3A;&#xFF0C;&#x5B83;&#x53EA;&#x8DDF;&#x8E2A;&#x7EC4;&#x4EF6;&#x7684;&#x201C;&#x8FDB;&#x5165;&#x201D;&#x548C;&#x201C;&#x9000;&#x51FA;&#x201D;&#x7684;&#x72B6;&#x6001;&#x3002;&#x7531;&#x4F60;&#x6765;&#x4E3A;&#x8FD9;&#x4E9B;&#x72B6;&#x6001;&#x5B9A;&#x4E49;&#x6548;&#x679C;&#x3002;&#xFF08;&#x7FFB;&#x8BD1;&#xFF09;<br>&#x5B9E;&#x9645;&#x7684;&#x60C5;&#x51B5;&#x5C31;&#x662F;&#x4F60;&#x5982;&#x679C;&#x53EA;&#x5199;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x662F;&#x6CA1;&#x6709;&#x4EFB;&#x4F55;&#x7684;&#x6548;&#x679C;&#x7684;&#xFF0C;&#x5C31;&#x548C;&#x4F60;&#x5199;&#x4E00;&#x4E2A;div&#x4E00;&#x6837;&#x3002;&#x6240;&#x4EE5;&#x4F60;&#x9700;&#x8981;&#x7ED9;&#x4ED6;&#x4EEC;&#x8D4B;&#x4E88;&#x4E00;&#x4E9B;&#x53C2;&#x6570;&#x624D;&#x53EF;&#x4EE5;&#x3002;&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x81EA;&#x5DF1;&#x7B80;&#x5355;&#x7684;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C;&#x8BE5;&#x6709;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x7531;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x7C98;&#x8D34;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#x9762;&#x53BB;&#x8BD5;&#x8BD5;&#x3002;
class Fade extends React.Component {
  constructor(props) {
    super(props);
  }
  done =() =&gt; {
    // console.log(&apos;&#x7ED3;&#x675F;&#x4E86;&apos;)
  }
  addaddEndListener = (node) =&gt; { //&#x539F;&#x751F;&#x65F6;&#x95F4;transition&#x8FD0;&#x52A8;&#x7684;&#x4E8B;&#x4EF6;
    node.addEventListener(&apos;transitionend&apos;, this.done, false);
  }

  // &#x4E09;&#x4E2A;&#x8FDB;&#x5165;&#x72B6;&#x6001;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x4F60;&#x60F3;&#x505A;&#x7684;&#x4E8B;&#x60C5;
  onEnter = (node, isAppearing) =&gt; {
    console.log(isAppearing, &apos;onEnter&apos;)
  }
  onEntering = (node, isAppearing) =&gt; {
    console.log(isAppearing, &apos;onEntering&apos;)
  }
  onEntered = (node, isAppearing) =&gt; {
    console.log(isAppearing, &apos;onEntered&apos;)
  }

  // &#x4E09;&#x4E2A;&#x9000;&#x51FA;&#x7684;&#x72B6;&#x6001;&#x7684;&#x4E8B;&#x4EF6;
  onExit = (node) =&gt; {
    console.log(&apos;onExit&apos;)
  }
  onExiting = () =&gt; {
    console.log(&apos;onExiting&apos;)
  }
  onExited = () =&gt; {
    console.log(&apos;onExited&apos;)
    this.props.self()
  }
  render() {
    const { in: inProp, dur} = this.props;
    const defaultStyle = {
      transition: `transform ${300}ms ease-in-out, opacity ${300}ms ease-in-out`,
      transform: &apos;translateX(100px)&apos;,
      opacity: &apos;0&apos;
    }

    const transitionStyles = {
      entering: { transform: &apos;translateX(100px)&apos;, opacity: &apos;0&apos;},
      entered:  { transform: &apos;translateX(0px)&apos;, opacity: &apos;1&apos; },
      exiting: {transform: &apos;translateX(0px)&apos;, opacity: &apos;1&apos;},
      exited: {transform: &apos;translateX(0px)&apos;, opacity: &apos;0&apos;}
    };
    const duration = {
      enter: 300,
      exit: 300,
    }
    // &#x4E0A;&#x9762;&#x7684;&#x90FD;&#x662F;&#x57FA;&#x672C;&#x53C2;&#x6570;&#xFF0C;&#x6837;&#x5F0F;&#x7684;&#x8F6C;&#x53D8;&#x4EE5;&#x53CA;&#x65F6;&#x95F4;&#x7684;&#x8BBE;&#x5B9A;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x5B98;&#x7F51;&#x6587;&#x6863;
    // &#x6837;&#x5F0F;&#x4E5F;&#x53EF;&#x4EE5;&#x5199;&#x6210;className &#x4F8B;&#x5982;&lt;MyComponent className={`fade fade-${status}`} /&gt;
    return (
      &lt;Transition 
        onEnter={this.onEnter}
        onEntering={this.onEntering}
        onEntered={this.onEntered}

        onExit={this.onExit}
        onExiting={this.onExiting}
        onExited={this.onExited}

        addEndListener={this.addaddEndListener} 
        in={inProp} 
        unmountOnExit={false} // &#x4E3A;true &#x4EE3;&#x8868;&#x9000;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x79FB;&#x9664;dom
        appear={true} // &#x4E3A;true  &#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x52A8;&#x753B;&#xFF0C;&#x9ED8;&#x8BA4;false&#xFF0C;
        timeout={duration}
      &gt;
        {
          state =&gt; {
            console.log(state, &apos;###&apos;) //&#x4F60;&#x53EF;&#x4EE5;&#x5F88;&#x76F4;&#x89C2;&#x7684;&#x770B;&#x5230;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x548C;&#x5378;&#x8F7D;&#x65F6;&#x5019;&#x7684;&#x72B6;&#x6001;
            return(
              &lt;div style="{{"
                ...defaultStyle,
                ...transitionStyles[state]
              "}}"&gt;
                {this.props.children}
              &lt;/div&gt;
            )
          }
        }
      &lt;/Transition&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">//&#x81EA;&#x5DF1;&#x7B80;&#x5355;&#x7684;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;&#xFF0C;&#x8BE5;&#x6709;&#x7684;&#x53C2;&#x6570;&#x90FD;&#x7531;&#x4E86;&#xFF0C;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x7C98;&#x8D34;&#x5728;&#x81EA;&#x5DF1;&#x7684;&#x4EE3;&#x7801;&#x91CC;&#x9762;&#x53BB;&#x8BD5;&#x8BD5;&#x3002;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Fade</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  done =<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// console.log(&apos;&#x7ED3;&#x675F;&#x4E86;&apos;)</span>
  }
  addaddEndListener = <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> { <span class="hljs-comment">//&#x539F;&#x751F;&#x65F6;&#x95F4;transition&#x8FD0;&#x52A8;&#x7684;&#x4E8B;&#x4EF6;</span>
    node.addEventListener(<span class="hljs-string">&apos;transitionend&apos;</span>, <span class="hljs-keyword">this</span>.done, <span class="hljs-literal">false</span>);
  }

  <span class="hljs-comment">// &#x4E09;&#x4E2A;&#x8FDB;&#x5165;&#x72B6;&#x6001;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x505A;&#x4F60;&#x60F3;&#x505A;&#x7684;&#x4E8B;&#x60C5;</span>
  onEnter = <span class="hljs-function">(<span class="hljs-params">node, isAppearing</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(isAppearing, <span class="hljs-string">&apos;onEnter&apos;</span>)
  }
  onEntering = <span class="hljs-function">(<span class="hljs-params">node, isAppearing</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(isAppearing, <span class="hljs-string">&apos;onEntering&apos;</span>)
  }
  onEntered = <span class="hljs-function">(<span class="hljs-params">node, isAppearing</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(isAppearing, <span class="hljs-string">&apos;onEntered&apos;</span>)
  }

  <span class="hljs-comment">// &#x4E09;&#x4E2A;&#x9000;&#x51FA;&#x7684;&#x72B6;&#x6001;&#x7684;&#x4E8B;&#x4EF6;</span>
  onExit = <span class="hljs-function">(<span class="hljs-params">node</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;onExit&apos;</span>)
  }
  onExiting = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;onExiting&apos;</span>)
  }
  onExited = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;onExited&apos;</span>)
    <span class="hljs-keyword">this</span>.props.self()
  }
  render() {
    <span class="hljs-keyword">const</span> { <span class="hljs-attr">in</span>: inProp, dur} = <span class="hljs-keyword">this</span>.props;
    <span class="hljs-keyword">const</span> defaultStyle = {
      <span class="hljs-attr">transition</span>: <span class="hljs-string">`transform <span class="hljs-subst">${<span class="hljs-number">300</span>}</span>ms ease-in-out, opacity <span class="hljs-subst">${<span class="hljs-number">300</span>}</span>ms ease-in-out`</span>,
      <span class="hljs-attr">transform</span>: <span class="hljs-string">&apos;translateX(100px)&apos;</span>,
      <span class="hljs-attr">opacity</span>: <span class="hljs-string">&apos;0&apos;</span>
    }

    <span class="hljs-keyword">const</span> transitionStyles = {
      <span class="hljs-attr">entering</span>: { <span class="hljs-attr">transform</span>: <span class="hljs-string">&apos;translateX(100px)&apos;</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-string">&apos;0&apos;</span>},
      <span class="hljs-attr">entered</span>:  { <span class="hljs-attr">transform</span>: <span class="hljs-string">&apos;translateX(0px)&apos;</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-string">&apos;1&apos;</span> },
      <span class="hljs-attr">exiting</span>: {<span class="hljs-attr">transform</span>: <span class="hljs-string">&apos;translateX(0px)&apos;</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-string">&apos;1&apos;</span>},
      <span class="hljs-attr">exited</span>: {<span class="hljs-attr">transform</span>: <span class="hljs-string">&apos;translateX(0px)&apos;</span>, <span class="hljs-attr">opacity</span>: <span class="hljs-string">&apos;0&apos;</span>}
    };
    <span class="hljs-keyword">const</span> duration = {
      <span class="hljs-attr">enter</span>: <span class="hljs-number">300</span>,
      <span class="hljs-attr">exit</span>: <span class="hljs-number">300</span>,
    }
    <span class="hljs-comment">// &#x4E0A;&#x9762;&#x7684;&#x90FD;&#x662F;&#x57FA;&#x672C;&#x53C2;&#x6570;&#xFF0C;&#x6837;&#x5F0F;&#x7684;&#x8F6C;&#x53D8;&#x4EE5;&#x53CA;&#x65F6;&#x95F4;&#x7684;&#x8BBE;&#x5B9A;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x53EF;&#x4EE5;&#x770B;&#x5B98;&#x7F51;&#x6587;&#x6863;</span>
    <span class="hljs-comment">// &#x6837;&#x5F0F;&#x4E5F;&#x53EF;&#x4EE5;&#x5199;&#x6210;className &#x4F8B;&#x5982;&lt;MyComponent className={`fade fade-${status}`} /&gt;</span>
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Transition</span> 
        <span class="hljs-attr">onEnter</span>=<span class="hljs-string">{this.onEnter}</span>
        <span class="hljs-attr">onEntering</span>=<span class="hljs-string">{this.onEntering}</span>
        <span class="hljs-attr">onEntered</span>=<span class="hljs-string">{this.onEntered}</span>

        <span class="hljs-attr">onExit</span>=<span class="hljs-string">{this.onExit}</span>
        <span class="hljs-attr">onExiting</span>=<span class="hljs-string">{this.onExiting}</span>
        <span class="hljs-attr">onExited</span>=<span class="hljs-string">{this.onExited}</span>

        <span class="hljs-attr">addEndListener</span>=<span class="hljs-string">{this.addaddEndListener}</span> 
        <span class="hljs-attr">in</span>=<span class="hljs-string">{inProp}</span> 
        <span class="hljs-attr">unmountOnExit</span>=<span class="hljs-string">{false}</span> // &#x4E3A;<span class="hljs-attr">true</span> &#x4EE3;&#x8868;&#x9000;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x79FB;&#x9664;<span class="hljs-attr">dom</span>
        <span class="hljs-attr">appear</span>=<span class="hljs-string">{true}</span> // &#x4E3A;<span class="hljs-attr">true</span>  &#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x76F4;&#x63A5;&#x6267;&#x884C;&#x52A8;&#x753B;&#xFF0C;&#x9ED8;&#x8BA4;<span class="hljs-attr">false</span>&#xFF0C;
        <span class="hljs-attr">timeout</span>=<span class="hljs-string">{duration}</span>
      &gt;</span>
        {
          state =&gt; {
            console.log(state, &apos;###&apos;) //&#x4F60;&#x53EF;&#x4EE5;&#x5F88;&#x76F4;&#x89C2;&#x7684;&#x770B;&#x5230;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x548C;&#x5378;&#x8F7D;&#x65F6;&#x5019;&#x7684;&#x72B6;&#x6001;
            return(
              <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
                <span class="hljs-attr">...defaultStyle</span>,
                <span class="hljs-attr">...transitionStyles</span>[<span class="hljs-attr">state</span>]
              "}}"&gt;</span>
                {this.props.children}
              <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            )
          }
        }
      <span class="hljs-tag">&lt;/<span class="hljs-name">Transition</span>&gt;</span></span>
    );
  }
}</code></pre><p>&#x5176;&#x4E2D;&#x4E0A;&#x9762;&#x7684;&#x72B6;&#x6001;&#x6709;&#x56DB;&#x79CD;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entering
entered
exiting
exited" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs ebnf"><code><span class="hljs-attribute">entering
entered
exiting
exited</span></code></pre><p>&#x7EC4;&#x4EF6;&#x7684;&#x521D;&#x59CB;&#x5316;&#x72B6;&#x6001;&#x90FD;&#x505C;&#x7559;&#x5728;<code>exited</code><br>&#x4E0A;&#x9762;&#x5C31;&#x662F;&#x5199;&#x7684;&#x4E00;&#x4E2A;&#x6700;&#x57FA;&#x672C;&#x7684;&#x4F8B;&#x5B50;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x5982;&#x4F55;&#x7684;&#x8C03;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let num = 1;
class Dnd extends React.Component {
  state = {
    ins: true,
    current: 1,
    dom: &lt;div className={l.test}&gt;
            ceshi weizhi {num}
          &lt;/div&gt;
  }
  handle = (bool) =&gt; {
    this.setState({
      test: !bool
    })
  }
  end = () =&gt; {
    const that = this;
    num = num + 1;
    setTimeout(function () {
      that.setState({
        test: true,
        dom: &lt;div className={l.test}&gt;
              888888 {num}
            &lt;/div&gt;
      }) 
    }, 500)
    
  }
  render () {
    const { location } = this.props
    const { test } = this.state;
    return (
      &lt;MainLayout location={location}&gt;
        &lt;Button onClick={this.handle.bind(null, this.state.test)}&gt;&#x70B9;&#x51FB;transition&lt;/Button&gt;
        &lt;Fade in={this.state.test} self={this.end}&gt;
          {this.state.dom}
        &lt;/Fade&gt;
      &lt;/MainLayout&gt;
    )
  }
}
// &#x6548;&#x679C;&#x662F;&#x6BCF;&#x6B21;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x90FD;&#x4F1A;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x8FDB;&#x573A;&#x548C;&#x51FA;&#x573A;&#x7684;&#x52A8;&#x753B;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x884D;&#x751F;&#x3002;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> num = <span class="hljs-number">1</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dnd</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  state = {
    <span class="hljs-attr">ins</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">dom</span>: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{l.test}</span>&gt;</span>
            ceshi weizhi {num}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  }
  handle = <span class="hljs-function">(<span class="hljs-params">bool</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({
      <span class="hljs-attr">test</span>: !bool
    })
  }
  end = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> that = <span class="hljs-keyword">this</span>;
    num = num + <span class="hljs-number">1</span>;
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      that.setState({
        <span class="hljs-attr">test</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">dom</span>: <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{l.test}</span>&gt;</span>
              888888 {num}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      }) 
    }, <span class="hljs-number">500</span>)
    
  }
  render () {
    <span class="hljs-keyword">const</span> { location } = <span class="hljs-keyword">this</span>.props
    <span class="hljs-keyword">const</span> { test } = <span class="hljs-keyword">this</span>.state;
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MainLayout</span> <span class="hljs-attr">location</span>=<span class="hljs-string">{location}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handle.bind(null,</span> <span class="hljs-attr">this.state.test</span>)}&gt;</span>&#x70B9;&#x51FB;transition<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Fade</span> <span class="hljs-attr">in</span>=<span class="hljs-string">{this.state.test}</span> <span class="hljs-attr">self</span>=<span class="hljs-string">{this.end}</span>&gt;</span>
          {this.state.dom}
        <span class="hljs-tag">&lt;/<span class="hljs-name">Fade</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">MainLayout</span>&gt;</span></span>
    )
  }
}
<span class="hljs-comment">// &#x6548;&#x679C;&#x662F;&#x6BCF;&#x6B21;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x90FD;&#x4F1A;&#x8FDB;&#x884C;&#x4E00;&#x6B21;&#x8FDB;&#x573A;&#x548C;&#x51FA;&#x573A;&#x7684;&#x52A8;&#x753B;&#x3002;&#x4E5F;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x884D;&#x751F;&#x3002;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5927;&#x6982;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x9002;&#x5408;&#x5199;&#x4E00;&#x4E2A;tab&#x7C7B;&#x578B;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5728;&#x5207;&#x6362;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x5C55;&#x793A;&#x4E0D;&#x540C;&#x7684;dom
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x5927;&#x6982;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x9002;&#x5408;&#x5199;&#x4E00;&#x4E2A;<span class="hljs-literal">tab</span>&#x7C7B;&#x578B;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5728;&#x5207;&#x6362;&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x5C55;&#x793A;&#x4E0D;&#x540C;&#x7684;dom
</code></pre><h2 id="articleHeader2">CSSTransition</h2><p>&#x6B64;&#x7EC4;&#x4EF6;&#x662F;&#x5728;&#x8F6C;&#x6362;&#x7684;&#x51FA;&#x73B0;&#x3001;&#x8FDB;&#x5165;&#x3001;&#x9000;&#x51FA;&#x9636;&#x6BB5;&#x5E94;&#x7528;&#x4E00;&#x5BF9;&#x7C7B;&#x540D;(&#x4E5F;&#x5C31;&#x662F;className),&#x9760;&#x8FD9;&#x4E2A;&#x6765;&#x6FC0;&#x6D3B;CSS&#x52A8;&#x753B;&#x3002;&#x6240;&#x4EE5;&#x53C2;&#x6570;&#x548C;&#x5E73;&#x65F6;&#x7684;className&#x4E0D;&#x540C;&#xFF0C;&#x53C2;&#x6570;&#x4E3A;&#xFF1A;<code>classNames</code><br>&#x53C2;&#x6570;&#xFF1A;&#xFF08;&#x4E3B;&#x8981;&#xFF09;in, timeout, unmountOnExit, classNames, &#x7528;&#x6CD5;&#x540C;Transition&#x3002;&#x770B;&#x5982;&#x4E0B;&#x4F8B;&#x5B50;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="state  = {
    star: false
}


&lt;Button onClick={this.handleStar.bind(null, star)}&gt;start&lt;/Button&gt;
&lt;CSSTransition
  in={star}
  timeout={300}
  classNames=&quot;star&quot;
  unmountOnExit
&gt;
  &lt;div className=&quot;star&quot;&gt;&#x2B50;&lt;/div&gt;
&lt;/CSSTransition&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">state  = </span><span class="hljs-template-variable">{
    star: false
}</span><span class="xml">


<span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=</span></span><span class="hljs-template-variable">{this.handleStar.bind(null, star)}</span><span class="xml"><span class="hljs-tag">&gt;</span>start<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">CSSTransition</span>
  <span class="hljs-attr">in</span>=</span></span><span class="hljs-template-variable">{star}</span><span class="xml"><span class="hljs-tag">
  <span class="hljs-attr">timeout</span>=</span></span><span class="hljs-template-variable">{300}</span><span class="xml"><span class="hljs-tag">
  <span class="hljs-attr">classNames</span>=<span class="hljs-string">&quot;star&quot;</span>
  <span class="hljs-attr">unmountOnExit</span>
&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">&quot;star&quot;</span>&gt;</span>&#x2B50;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">CSSTransition</span>&gt;</span>
</span></code></pre><p>&#x6548;&#x679C;&#x662F;&#x70B9;&#x51FB;button &#x663E;&#x793A;&#x661F;&#x661F;&#xFF0C;&#x5728;&#x70B9;&#x51FB;&#x6D88;&#x5931;&#x661F;&#x661F;&#x7684;&#x52A8;&#x753B;&#xFF01;<br>&#x53C2;&#x6570;<code>classNames=&quot;star&quot;</code>, &#x7EC4;&#x4EF6;&#x4F1A;&#x627E;&#x5BF9;&#x5E94;&#x72B6;&#x6001;&#x7684;className, &#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".star {
    display: inline-block;
    margin-left: 0.5rem;
    transform: scale(1.25);
  }
  .star-enter {
    opacity: 0.01;
    transform: translateY(-100%) scale(0.75);
  }
  .star-enter-active {
    opacity: 1;
    transform: translateY(0%) scale(1.25);
    transition: all 300ms ease-out;
  }
  .star-exit {
    opacity: 1;
    transform: scale(1.25);
  }
  .star-exit-active {
    opacity: 0;
    transform: scale(4);
    transition: all 300ms ease-in;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.star</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">0.5rem</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.25);
  }
  <span class="hljs-selector-class">.star-enter</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-100%) <span class="hljs-built_in">scale</span>(0.75);
  }
  <span class="hljs-selector-class">.star-enter-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(0%) <span class="hljs-built_in">scale</span>(1.25);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">300ms</span> ease-out;
  }
  <span class="hljs-selector-class">.star-exit</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(1.25);
  }
  <span class="hljs-selector-class">.star-exit-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(4);
    <span class="hljs-attribute">transition</span>: all <span class="hljs-number">300ms</span> ease-in;
  }</code></pre><p>&#x4F9D;&#x6B21;&#x6267;&#x884C;&#x7684;&#x987A;&#x5E8F;&#x662F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;&#x661F;&#x661F;&#x663E;&#x793A; &#x5BF9;&#x5E94;&#x7684;class&#x4E3A;star-enter star-enter-active &#x52A8;&#x753B;&#x8D70;&#x5B8C;&#x4E3A;star-enter-done
2&#x3001;&#x661F;&#x661F;&#x6D88;&#x5931; &#x5BF9;&#x5E94;&#x7684;class&#x4E3A;star-exit  star-exit-active &#x52A8;&#x753B;&#x8D70;&#x5B8C;&#x4E3A;star-exit-done
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs awk"><code><span class="hljs-number">1</span>&#x3001;&#x661F;&#x661F;&#x663E;&#x793A; &#x5BF9;&#x5E94;&#x7684;class&#x4E3A;star-enter star-enter-active &#x52A8;&#x753B;&#x8D70;&#x5B8C;&#x4E3A;star-enter-done
<span class="hljs-number">2</span>&#x3001;&#x661F;&#x661F;&#x6D88;&#x5931; &#x5BF9;&#x5E94;&#x7684;class&#x4E3A;star-<span class="hljs-keyword">exit</span>  star-<span class="hljs-keyword">exit</span>-active &#x52A8;&#x753B;&#x8D70;&#x5B8C;&#x4E3A;star-<span class="hljs-keyword">exit</span>-done
</code></pre><p>&#x5982;&#x679C;&#x6309;&#x7167;&#x5B98;&#x7F51;&#x7684;&#x89E3;&#x91CA;&#x5C31;&#x662F;&#x5982;&#x4E0B;&#xFF0C; &#x6709;&#x5174;&#x8DA3;&#x7684;&#x53EF;&#x4EE5;&#x81EA;&#x884C;&#x53BB;&#x8BD5;&#x4E00;&#x8BD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="classNames="{{"
 appear: &apos;my-appear&apos;,
 appearActive: &apos;my-active-appear&apos;,
 enter: &apos;my-enter&apos;,
 enterActive: &apos;my-active-enter&apos;,
 enterDone: &apos;my-done-enter,
 exit: &apos;my-exit&apos;,
 exitActive: &apos;my-active-exit&apos;,
 exitDone: &apos;my-done-exit,
"}}"" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sml"><code>classNames="{{"
 appear: <span class="hljs-symbol">&apos;my</span>-appear&apos;,
 appearActive: <span class="hljs-symbol">&apos;my</span>-active-appear&apos;,
 enter: <span class="hljs-symbol">&apos;my</span>-enter&apos;,
 enterActive: <span class="hljs-symbol">&apos;my</span>-active-enter&apos;,
 enterDone: <span class="hljs-symbol">&apos;my</span>-done-enter,
 exit: <span class="hljs-symbol">&apos;my</span>-exit&apos;,
 exitActive: <span class="hljs-symbol">&apos;my</span>-active-exit&apos;,
 exitDone: <span class="hljs-symbol">&apos;my</span>-done-exit,
"}}"</code></pre><p>&#x6BCF;&#x4E2A;&#x9636;&#x6BB5;&#x7684;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x540C;Transition.</p><h2 id="articleHeader3">TransitionGroup</h2><p>&#x4E00;&#x770B;group&#x5C31;&#x77E5;&#x9053;&#x80AF;&#x5B9A;&#x662F;&#x5217;&#x8868;&#x5F62;&#x6001;&#x7684;&#x52A8;&#x753B;&#x4E86;&#xFF01;&#x4F46;&#x662F;&#x770B;&#x4E86;&#x5B98;&#x7F51;&#x540E;&#x77E5;&#x9053;&#xFF0C;TransitionGroup&#x4E0D;&#x63D0;&#x4F9B;&#x4EFB;&#x4F55;&#x5F62;&#x5F0F;&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x5177;&#x4F53;&#x7684;&#x52A8;&#x753B;&#x53D6;&#x51B3;&#x4E0E;&#x4F60;&#x5305;&#x88F9;&#x7684;Transition || CSSTransition&#x7684;&#x52A8;&#x753B;&#xFF0C;&#x6240;&#x4EE5;&#x4F60;&#x53EF;&#x4EE5;&#x5728;&#x5217;&#x8868;&#x91CC;&#x9762;&#x505A;&#x51FA;&#x4E0D;&#x540C;&#x7C7B;&#x578B;&#x7684;&#x52A8;&#x753B;&#x51FA;&#x6765;&#x3002;&#x4E0B;&#x9762;&#x6765;&#x770B;&#x4E00;&#x4E2A;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: &apos;Buy eggs&apos; },
        { id: 2, text: &apos;Pay bills&apos; },
        { id: 3, text: &apos;Invite friends over&apos; },
        { id: 4, text: &apos;Fix the TV&apos; },
      ]
    }
  }

  render() {
    const { items } = this.state; 
    return (
      &lt;div&gt;
        &lt;TransitionGroup className=&quot;todo-list&quot;&gt;
          {items.map(({ id, text }) =&gt; (
            &lt;CSSTransition
              key={id}
              timeout={500}
              classNames=&quot;fade&quot;
            &gt;
              &lt;div&gt;
                &lt;Button
                  onClick={() =&gt; {
                    this.setState(state =&gt; ({
                      items: state.items.filter(
                        item =&gt; item.id !== id
                      ),
                    }));
                  "}}"
                &gt;
                  &amp;times;
                &lt;/Button&gt;
                {text}
              &lt;/div&gt;
            &lt;/CSSTransition&gt;
          ))}
        &lt;/TransitionGroup&gt;
        &lt;Button
          type=&quot;button&quot;
          onClick={() =&gt; {
            const text = prompt(&apos;Enter some text&apos;);
            if (text) {
              this.setState(state =&gt; ({
                items: [
                  ...state.items,
                  { id: 1123, text },
                ],
              }));
            }
          "}}"
        &gt;
          Add Item
        &lt;/Button&gt;
      &lt;/div&gt;
    );
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>class List extends React.Component {
  constructor(props) {
    super(props);
    this.<span class="hljs-keyword">state</span> = {
      items: [
        { id: <span class="hljs-number">1</span>, text: &apos;Buy eggs&apos; },
        { id: <span class="hljs-number">2</span>, text: &apos;Pay bills&apos; },
        { id: <span class="hljs-number">3</span>, text: &apos;Invite friends over&apos; },
        { id: <span class="hljs-number">4</span>, text: &apos;Fix the TV&apos; },
      ]
    }
  }

  render() {
    const { items } = this.<span class="hljs-keyword">state</span>; 
    return (
      <span class="hljs-variable">&lt;div&gt;</span>
        <span class="hljs-variable">&lt;TransitionGroup className=&quot;todo-list&quot;&gt;</span>
          {items.map(({ id, text }) =&gt; (
            <span class="hljs-variable">&lt;CSSTransition
              key={id}
              timeout={500}
              classNames=&quot;fade&quot;
            &gt;</span>
              <span class="hljs-variable">&lt;div&gt;</span>
                <span class="hljs-variable">&lt;Button
                  onClick={() =&gt;</span> {
                    this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({
                      items: <span class="hljs-keyword">state</span>.items.filter(
                        item =&gt; item.id !== id
                      ),
                    }));
                  "}}"
                &gt;
                  &amp;times;
                &lt;/Button&gt;
                {text}
              &lt;/div&gt;
            &lt;/CSSTransition&gt;
          ))}
        &lt;/TransitionGroup&gt;
        <span class="hljs-variable">&lt;Button
          type=&quot;button&quot;
          onClick={() =&gt;</span> {
            const text = prompt(&apos;Enter some text&apos;);
            if (text) {
              this.<span class="hljs-built_in">set</span>State(<span class="hljs-keyword">state</span> =&gt; ({
                items: [
                  ...<span class="hljs-keyword">state</span>.items,
                  { id: <span class="hljs-number">1123</span>, text },
                ],
              }));
            }
          "}}"
        &gt;
          Add Item
        &lt;/Button&gt;
      &lt;/div&gt;
    );
  }
}</code></pre><p>css</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fade-enter {
    opacity: 0.01;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0.01;
    transition: opacity 500ms ease-in;
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.fade-enter</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>;
  }
  <span class="hljs-selector-class">.fade-enter-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">500ms</span> ease-in;
  }
  <span class="hljs-selector-class">.fade-exit</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">1</span>;
  }
  <span class="hljs-selector-class">.fade-exit-active</span> {
    <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>;
    <span class="hljs-attribute">transition</span>: opacity <span class="hljs-number">500ms</span> ease-in;
  }</code></pre><p>&#x6548;&#x679C;&#x662F;&#x589E;&#x52A0;&#x548C;&#x5220;&#x9664;&#x5217;&#x8868;&#x9879;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;&#xFF0C;&#x4EA7;&#x751F;&#x6E10;&#x5165;&#x6E10;&#x5931;&#x7684;&#x6548;&#x679C;&#xFF01;&#x8BF4;&#x767D;&#x4E86;&#x4E5F;&#x5C31;&#x662F;&#x591A;&#x4E2A;Transition &#x6216;&#x8005;CSSTransition&#x7EC4;&#x5408;&#x7684;&#x6548;&#x679C;&#x3002;<br>&#x4F46;&#x662F;&#x4E5F;&#x63D0;&#x4F9B;&#x4E00;&#x4E9B;&#x53C2;&#x6570;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1&#x3001;component  default &apos;div&apos; &#x4E5F;&#x5C31;&#x662F;TransitionGroup&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x6807;&#x7B7E;&#x4E3A;div&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5C31;&#x884C;&#x66F4;&#x6539;&#xFF0C;&#x4F8B;&#x5982;component=&quot;span&quot; &#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x5C31;&#x662F;span&#x6807;&#x7B7E;&#x4E86;
2&#x3001;children &#x76F8;&#x5F53;&#x4E8E;&#x4F60;&#x7ED9;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7B49;&#x3002;
3&#x3001;appear  &#x5199;&#x5728;TransitionGroup&#x91CC;&#x9762;&#x76F8;&#x5F53;&#x4E8E;&#x5F00;&#x542F;&#x6216;&#x8005;&#x7981;&#x6B62;&#x91CC;&#x9762;&#x7684;Transition || CSSTransition &#x65B9;&#x4FBF;&#x5199;&#x7684;&#x4F5C;&#x7528;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code><span class="hljs-number">1</span>&#x3001;component  <span class="hljs-section">default</span> &apos;div&apos; &#x4E5F;&#x5C31;&#x662F;TransitionGroup&#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x6807;&#x7B7E;&#x4E3A;div&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5C31;&#x884C;&#x66F4;&#x6539;&#xFF0C;&#x4F8B;&#x5982;component=<span class="hljs-string">&quot;span&quot;</span> &#x6E32;&#x67D3;&#x51FA;&#x6765;&#x7684;&#x5C31;&#x662F;span&#x6807;&#x7B7E;&#x4E86;
<span class="hljs-number">2</span>&#x3001;children &#x76F8;&#x5F53;&#x4E8E;&#x4F60;&#x7ED9;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x5B57;&#x7B26;&#x4E32;&#x6216;&#x8005;&#x81EA;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x7B49;&#x3002;
<span class="hljs-number">3</span>&#x3001;appear  &#x5199;&#x5728;TransitionGroup&#x91CC;&#x9762;&#x76F8;&#x5F53;&#x4E8E;&#x5F00;&#x542F;&#x6216;&#x8005;&#x7981;&#x6B62;&#x91CC;&#x9762;&#x7684;Transition || CSSTransition &#x65B9;&#x4FBF;&#x5199;&#x7684;&#x4F5C;&#x7528;

</code></pre><p>&#x4E09;&#x4E2A;&#x7EC4;&#x4EF6;&#x5927;&#x6982;&#x7684;&#x7279;&#x6027;&#x5C31;&#x662F;&#x8FD9;&#x4E9B;&#x3002;&#x5269;&#x4E0B;&#x7684;&#x5168;&#x9760;&#x81EA;&#x5DF1;&#x53BB;&#x5F00;&#x53D1;&#x4E86;&#xFF01;&#x540E;&#x7EED;&#x4F1A;&#x5F55;&#x5165;&#x4E00;&#x4E9B;&#x5C0F;&#x7684;&#x4F8B;&#x5B50;&#x6765;&#x8BB2;&#x89E3;&#xFF0C;&#x656C;&#x8BF7;&#x671F;&#x5F85;&#x3002;&#x3002;&#x3002;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react 官网动画库（react-transition-group）的新写法

## 原文链接
[https://segmentfault.com/a/1190000015487495](https://segmentfault.com/a/1190000015487495)

