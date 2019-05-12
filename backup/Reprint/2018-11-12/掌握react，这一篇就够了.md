---
title: 掌握react，这一篇就够了
hidden: true
categories: [reprint]
slug: b32f4225
date: 2018-11-12 02:30:05
---

{{< raw >}}
<p>react&#x4F17;&#x6240;&#x5468;&#x77E5;&#x7684;&#x524D;&#x7AEF;3&#x5927;&#x4E3B;&#x6D41;&#x6846;&#x67B6;&#x4E4B;&#x4E00;&#xFF0C;&#x7531;&#x4E8E;&#x51FA;&#x8272;&#x7684;&#x6027;&#x80FD;&#xFF0C;&#x5B8C;&#x5584;&#x7684;&#x5468;&#x8FB9;&#x8BBE;&#x65BD;&#x98CE;&#x5934;&#x4E00;&#x65F6;&#x65E0;&#x4E24;&#x3002;&#x672C;&#x6587;&#x5C31;&#x5E26;&#x5927;&#x5BB6;&#x4E00;&#x8D77;&#x638C;&#x63E1;react&#x3002;</p><h1>jsx&#x8BED;&#x6CD5;</h1><p>&#x524D;&#x7AEF;MVVM&#x4E3B;&#x6D41;&#x6846;&#x67B6;&#x90FD;&#x6709;&#x4E00;&#x5957;&#x81EA;&#x5DF1;&#x7684;&#x6A21;&#x677F;&#x5904;&#x7406;&#x65B9;&#x6CD5;&#xFF0C;react&#x5219;&#x4F7F;&#x7528;&#x5B83;&#x72EC;&#x7279;&#x7684;jsx&#x8BED;&#x6CD5;&#x3002;&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x63D2;&#x5165;html&#x7C7B;&#x4F3C;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x7B80;&#x5316;&#x521B;&#x5EFA;view&#x7684;&#x6D41;&#x7A0B;&#x3002;</p><p>&#x4E0B;&#x9762;&#x8BA9;&#x6211;&#x4EEC;&#x6765;&#x8BA4;&#x8BC6;&#x4E00;&#x4E0B;&#x6784;&#x5EFA;&#x7684;&#x4E24;&#x79CD;&#x5143;&#x7D20;</p><h2>&#x539F;&#x751F;&#x5143;&#x7D20;</h2><pre><code>ReactDOM.render((
  &lt;div&gt;
    &lt;h1&gt;&#x6807;&#x9898;&lt;/h1&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><p>&#x901A;&#x8FC7;&#x7B80;&#x5355;&#x7684;&#x8BED;&#x6CD5;&#x9875;&#x9762;&#x5C31;&#x4F1A;&#x88AB;&#x63D2;&#x5165;&#x4E00;&#x4E2A;div+&#x4E00;&#x4E2A;h1&#x6807;&#x7B7E;&#x3002;&#x539F;&#x751F;&#x7684;html&#x5143;&#x7D20;&#x53EF;&#x4EE5;&#x88AB;&#x76F4;&#x63A5;&#x4F7F;&#x7528;&#x3002;&#x4EE5;&#x4E0A;&#x7684;&#x8BED;&#x6CD5;&#x5E76;&#x4E0D;&#x662F;js&#x652F;&#x6301;&#x7684;&#x8BED;&#x6CD5;&#xFF0C;&#x9700;&#x8981;&#x88AB;&#x8F6C;&#x6362;&#x4E4B;&#x540E;&#x624D;&#x80FD;&#x8FD0;&#x884C;&#x3002;</p><h2>&#x81EA;&#x5B9A;&#x4E49;&#x5143;&#x7D20;</h2><p>react&#x5F3A;&#x5927;&#x4E4B;&#x5904;&#x5C31;&#x5728;&#x4E8E;&#x53EF;&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#xFF0C;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x7684;&#x590D;&#x7528;&#x3002;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;jsx&#x8BED;&#x6CD5;&#x8C03;&#x7528;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Page extends React.Component {
  render() {
    return (&lt;div&gt;
      home111 &amp;copy; &#xA9; \ua9
    &lt;/div&gt;)
  }
}

ReactDOM.render((
  &lt;div&gt;
    &lt;Page/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><p>&#x6211;&#x4EEC;&#x5B9A;&#x4E49;&#x4E86;&#x4E00;&#x4E2A;Page&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;jsx&#x91CC;&#x9762;&#x50CF;&#x8C03;&#x7528;html&#x4E00;&#x6837;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x3002;</p><h2>&#x63D2;&#x5165;&#x52A8;&#x6001;&#x6570;&#x636E;</h2><pre><code>let name = &apos;hi&apos;

ReactDOM.render((
  &lt;div&gt;
    {name}
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><p>&#x4F7F;&#x7528;{}&#x5C31;&#x53EF;&#x4EE5;&#x63D2;&#x5165;&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F;{}&#x4E2D;&#x95F4;&#x7684;&#x5FC5;&#x987B;&#x662F;js&#x8868;&#x8FBE;&#x5F0F;&#xFF0C;&#x4E0D;&#x80FD;&#x662F;&#x8BED;&#x53E5;&#x3002;&#x5982;&#x679C;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x6267;&#x884C;&#x7ED3;&#x679C;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x5219;&#x4F1A;&#x81EA;&#x52A8;join&#x3002;</p><h2>&#x6CE8;&#x91CA;</h2><p>jsx&#x8BED;&#x6CD5;&#x548C;html&#x8BED;&#x6CD5;&#x4E00;&#x6837;&#xFF0C;&#x4E5F;&#x662F;&#x53EF;&#x4EE5;&#x63D2;&#x5165;&#x6CE8;&#x91CA;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x5199;&#x7684;&#x65F6;&#x5019;&#x6709;&#x4E00;&#x4E9B;&#x533A;&#x522B;</p><h3>&#x5B50;&#x7EC4;&#x4EF6;&#x6CE8;&#x91CA;</h3><pre><code>let name = &apos;hi&apos;

ReactDOM.render((
  &lt;div&gt;
    {/* &#x6CE8;&#x91CA; */}
    {name}
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><p>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x63D2;&#x5165;&#x6CE8;&#x91CA;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;{}&#x5305;&#x88F9;&#x8D77;&#x6765;&#xFF0C;&#x5728;/<em> </em>/&#x4E4B;&#x95F4;&#x63D2;&#x5165;&#x6CE8;&#x91CA;&#x6587;&#x5B57;&#x3002;</p><h3>&#x5C5E;&#x6027;&#x6CE8;&#x91CA;</h3><pre><code>let name = &apos;hi&apos;

ReactDOM.render((
  &lt;div&gt;
    {name}
    &lt;img /* 
        &#x591A;&#x884C;&#x6CE8;&#x91CA;
    */ src=&quot;1.jpg&quot;/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><p>&#x5728;&#x6807;&#x7B7E;&#x4E2D;&#x95F4;&#xFF0C;&#x53EF;&#x4EE5;&#x63D2;&#x5165;&#x4E00;&#x4E2A;&#x591A;&#x884C;&#x6CE8;&#x91CA;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E0A;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</p><h2>&#x5C5E;&#x6027;props</h2><ol><li>&#x53EF;&#x4EE5;&#x5411;&#x4F7F;&#x7528;html&#x7684;attr&#x4E00;&#x6837;&#x4F7F;&#x7528;&#x5C5E;&#x6027;&#xFF0C;&#x5C31;&#x50CF;&#x4E0B;&#x9762;img&#x7684;src&#x4E00;&#x6837;</li></ol><pre><code>let name = &apos;hi&apos;

ReactDOM.render((
  &lt;div&gt;
    &lt;img src=&quot;1.png&quot;/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><ol><li>&#x5982;&#x679C;&#x9700;&#x8981;&#x4F20;&#x9012;&#x52A8;&#x6001;&#x5C5E;&#x6027;&#xFF0C;&#x4F7F;&#x7528;{}&#xFF0C;&#x591A;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x4F7F;&#x7528;&#x5C55;&#x5F00;&#x8FD0;&#x7B97;&#x7B26;</li></ol><pre><code>let props = {
    src: &apos;1.png&apos;,
    alt: &apos;1&#x56FE;&#x7247;&apos;
}

ReactDOM.render((
  &lt;div&gt;
    &lt;img src={&quot;1.png&quot;}/&gt;
    &lt;img {...props}/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><ol><li>&#x4E24;&#x4E2A;&#x8F6C;&#x6362;,class--&gt;className for--&gt;htmlFor</li></ol><p>&#x56E0;&#x4E3A;class&#x548C;for&#x662F;javascript&#x5173;&#x952E;&#x5B57;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x9700;&#x8981;&#x7528;&#x8F6C;&#x6362;&#x4E4B;&#x540E;&#x540D;&#x79F0;</p><pre><code>ReactDOM.render((
  &lt;div className=&quot;tab&quot;&gt;
    &lt;label htmlFor=&quot;name&quot;&gt;&#x59D3;&#x540D;:&lt;/label&gt;&lt;input id=&quot;name&quot;/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><ol><li>&#x5E03;&#x5C14;&#x5C5E;&#x6027;</li></ol><p>&#x5982;&#x679C;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x503C;&#x662F;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x5F53;&#x8FD9;&#x4E2A;&#x503C;&#x662F;true&#x7684;&#x65F6;&#x5019;&#x5219;&#x53EF;&#x4EE5;&#x7701;&#x7565;=&#x540E;&#x9762;&#x7684;&#x503C;&#xFF0C;&#x53EA;&#x4FDD;&#x7559;key&#x3002;</p><pre><code>ReactDOM.render((
  &lt;div className=&quot;tab&quot;&gt;
    &lt;input type=&quot;text&quot; required/&gt;
    &lt;input type=&quot;text&quot; required={true}/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><ol><li>&#x539F;&#x751F;&#x5143;&#x7D20;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</li></ol><p>react&#x5BF9;&#x5143;&#x7D20;&#x5C5E;&#x6027;&#x505A;&#x4E86;&#x6821;&#x9A8C;&#xFF0C;&#x5982;&#x679C;&#x5728;&#x539F;&#x751F;&#x5C5E;&#x6027;&#x4E0A;&#x4F7F;&#x7528;&#x6B64;&#x5143;&#x7D20;&#x4E0D;&#x652F;&#x6301;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5219;&#x4E0D;&#x80FD;&#x7F16;&#x8BD1;&#x6210;&#x529F;&#x3002;&#x5FC5;&#x987B;&#x4F7F;&#x7528;data-&#x524D;&#x7F00;</p><pre><code>ReactDOM.render((
  &lt;div className=&quot;tab&quot;&gt;
    &lt;input type=&quot;text&quot; data-init=&quot;22&quot;/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><h2>&#x63D2;&#x5165;html</h2><p>&#x5982;&#x679C;&#x52A8;&#x6001;&#x7684;&#x63D2;&#x5165;html&#x5143;&#x7D20;,react&#x51FA;&#x4E8E;&#x5B89;&#x5168;&#x6027;&#x8003;&#x8651;&#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x6211;&#x4EEC;&#x8F6C;&#x4E49;&#x3002;&#x6240;&#x4EE5;&#x4E00;&#x5B9A;&#x8981;&#x52A8;&#x6001;&#x7684;&#x63D2;&#x5165;&#x5143;&#x7D20;&#x7684;&#x8BDD;&#xFF0C;&#x4F7F;&#x7528;dangerouslySetInnerHTML</p><pre><code>ReactDOM.render((
  &lt;div className=&quot;tab&quot;&gt;
    &lt;div dangerouslySetInnerHTML={{__html: &apos;&lt;span&gt;test&lt;/span&gt;&apos;}}&gt;&lt;/div&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))</code></pre><h1>React&#x7EC4;&#x4EF6;&#x521B;&#x5EFA;</h1><h2>React.createClass</h2><p>&#x8FD9;&#x662F;&#x65E7;&#x7248;&#x672C;&#x7684;api&#xFF0C;&#x4F7F;&#x7528;React.createClass&#x521B;&#x5EFA;&#x7EC4;&#x4EF6;&#xFF0C;&#x914D;&#x5957;&#x7684;&#x4E00;&#x4E9B;api&#xFF0C;&#x6709;getDefaultProps, getinitialstate&#x3002;&#x5B98;&#x65B9;&#x5DF2;&#x7ECF;&#x4E0D;&#x5EFA;&#x8BAE;&#x4F7F;&#x7528;&#x4E86;&#xFF0C;&#x4F7F;&#x7528;&#x4E0B;&#x9762;&#x65B0;&#x7684;api&#x66FF;&#x4EE3;&#x3002;</p><h2>ES6 classes</h2><pre><code>import * as React from &apos;react&apos;

class Page extends React.Component {
  render() {
    return (&lt;div&gt;
      home
    &lt;/div&gt;)
  }
}</code></pre><p>&#x8FD9;&#x662F;&#x4E00;&#x4E2A;&#x5B9E;&#x73B0;&#x4E86;render&#x65B9;&#x6CD5;&#x7684;class&#x3002;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;react&#x7EC4;&#x4EF6;&#x3002;</p><h2>&#x65E0;&#x72B6;&#x6001;&#x51FD;&#x6570;</h2><pre><code>function Button(props, context) {
    return (
        &lt;button&gt;
            &lt;em&gt;{props.text}&lt;/em&gt;
            &lt;span&gt;{context.name}&lt;/span&gt;
        &lt;/button&gt;
    );
}</code></pre><p>&#x7EAF;&#x51FD;&#x6570;,&#x4E0D;&#x5B58;&#x5728;state&#xFF0C;&#x53EA;&#x63A5;&#x53D7;props&#x548C;state&#x3002;&#x7EAF;&#x51FD;&#x6570;&#x6709;&#x4F18;&#x70B9;&#xFF0C;&#x4F18;&#x70B9;&#x5C31;&#x662F;&#x6613;&#x4E8E;&#x6D4B;&#x8BD5;&#xFF0C;&#x65E0;&#x526F;&#x4F5C;&#x7528;&#x3002;</p><h1>React&#x6570;&#x636E;&#x6D41;</h1><h2>state</h2><p>state&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x9700;&#x8981;&#x5728;&#x89C6;&#x56FE;&#x91CC;&#x9762;&#x7528;&#x5230;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x624D;&#x9700;&#x8981;&#x653E;&#x5230;state&#x91CC;&#x9762;&#x53BB;&#x3002;&#x5982;&#x4E0B;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x7C7B;&#x4E0A;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;state&#x5C5E;&#x6027;&#xFF0C;&#x5728;&#x89C6;&#x56FE;&#x91CC;&#x9762;&#x901A;&#x8FC7;&#x4F7F;&#x7528;this.state.name&#x53BB;&#x5F15;&#x7528;&#x3002;&#x800C;&#x8FD9;&#x91CC;&#x7684;state&#x5B9A;&#x4E49;&#x5219;&#x4EE3;&#x66FF;&#x7684;&#x662F;getinitialstate&#x65B9;&#x6CD5;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Page extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }    

  render() {
    return (&lt;div&gt;
      {this}
    &lt;/div&gt;)
  }
}</code></pre><p>&#x5982;&#x4F55;&#x66F4;&#x65B0;state&#x5462;&#xFF0C;&#x76F4;&#x63A5;&#x66F4;&#x6539;state&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x53EF;&#x4EE5;&#x7684;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x6837;&#x5B50;&#x65E0;&#x6CD5;&#x89E6;&#x53D1;&#x7EC4;&#x4EF6;&#x89C6;&#x56FE;&#x7684;&#x66F4;&#x65B0;&#x673A;&#x5236;&#x3002;&#x6240;&#x4EE5;&#x4F7F;&#x7528;<code>setState()</code>api&#x3002;&#x503C;&#x5F97;&#x6CE8;&#x610F;&#x7684;&#x662F;setState&#x662F;&#x5F02;&#x6B65;&#x7684;&#xFF0C;&#x539F;&#x56E0;&#x662F;react&#x5185;&#x90E8;&#x9700;&#x8981;&#x5BF9;setState&#x505A;&#x4F18;&#x5316;&#xFF0C;&#x4E0D;&#x662F;state&#x53D8;&#x4E86;&#x7ACB;&#x523B;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#xFF0C;&#x800C;&#x662F;&#x62E6;&#x622A;&#x4E00;&#x90E8;&#x5206;state&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x7B49;&#x5230;&#x5408;&#x9002;&#x7684;&#x65F6;&#x673A;&#x518D;&#x53BB;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Page extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }    

  render() {
    setTimeout(() =&gt; this.setState({name: &apos;&#x5C0F;&#x660E;&#x513F;&#x5B50;&apos;})&#xFF0C; 5000)
  
    return (&lt;div&gt;
      {this.state.name}
    &lt;/div&gt;)
  }
}</code></pre><blockquote><em>&#x771F;&#x5B9E;&#x5F00;&#x53D1;&#x4E2D;&#x7EDD;&#x4E0D;&#x8981;&#x5728;render&#x51FD;&#x6570;&#x91CC;&#x9762;&#x53BB;&#x66F4;&#x6539;state&#xFF0C;&#x4EE5;&#x4E0A;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x6F14;&#x793A;</em></blockquote><h2>props</h2><p>props&#x662F;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x4F20;&#x9012;&#x6570;&#x636E;&#x7684;&#x6700;&#x4E3B;&#x8981;api, react&#x63A8;&#x5D07;&#x7684;&#x662F;&#x81EA;&#x9876;&#x5411;&#x4E0B;&#x7684;&#x6570;&#x636E;&#x6D41;&#x5411;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x8981;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;&#x5982;&#x679C;&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  render() {
    return (&lt;div&gt;
      {this.props.parentName}
    &lt;/div&gt;)
  }
}

class Parent extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }    

  render() {
    setTimeout(() =&gt; this.setState({name: &apos;&#x5C0F;&#x660E;&#x513F;&#x5B50;&apos;})&#xFF0C; 5000)
  
    return (&lt;div&gt;
      &lt;Child parentName={this.state.name}/&gt;
    &lt;/div&gt;)
  }
}</code></pre><p>&#x53EF;&#x4EE5;&#x770B;&#x5230;Child&#x7EC4;&#x4EF6;&#x663E;&#x793A;&#x4E86;&#x7236;&#x7EC4;&#x4EF6;&#x7684;name&#x3002;&#x5F53;&#x7236;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#x4E86;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#x3002;&#x90A3;&#x5982;&#x4F55;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x66F4;&#x6539;&#x7236;&#x7EC4;&#x4EF6;&#x72B6;&#x6001;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x662F;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  update() {
      this.props.onChange(&apos;&#x5C0F;&#x660E;&#x540D;&#x5B57;&#x6539;&#x4E86;&apos;)
  }

  render() {
    return (&lt;div&gt;
      {this.props.parentName}
      &lt;button onClick={this.update.bind(this)}&gt;&#x66F4;&#x65B0;&lt;/button&gt;
    &lt;/div&gt;)
  }
}

class Parent extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }    

  changeName(name) {
      this.setState({
          name
      })
  }
  
  render() {
    setTimeout(() =&gt; this.setState({name: &apos;&#x5C0F;&#x660E;&#x513F;&#x5B50;&apos;})&#xFF0C; 5000)
  
    return (&lt;div&gt;
      &lt;Child onChange={this.changeName.bind(this)} parentName={this.state.name}/&gt;
    &lt;/div&gt;)
  }
}</code></pre><p>&#x6CE8;&#x610F;&#x54C8;&#xFF1A;props&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x66F4;&#x6539;&#x7684;&#xFF0C;&#x8FD9;&#x65E2;&#x4E0D;&#x7B26;&#x5408;react&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x601D;&#x60F3;&#xFF0C;&#x4E5F;&#x4E3A;&#x7EF4;&#x62A4;&#x5E26;&#x6765;&#x707E;&#x96BE;&#x3002;</p><h3>&#x4E8B;&#x4EF6;</h3><p>react&#x91CC;&#x9762;&#x7684;&#x7528;&#x6237;&#x4E8B;&#x4EF6;&#x90FD;&#x662F;&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#xFF0C;&#x88AB;React&#x5C01;&#x88C5;&#x8FC7;&#x3002;&#x5185;&#x90E8;&#x4F7F;&#x7528;&#x7684;&#x8FD8;&#x662F;&#x4E8B;&#x4EF6;&#x7684;&#x59D4;&#x6258;&#x673A;&#x5236;&#x3002;<br>&#x5E38;&#x7528;&#x7684;&#x4E8B;&#x4EF6;&#x6709;&#x70B9;&#x51FB;&#x4E8B;&#x4EF6;onClick&#xFF0C;input&#x7684;onChange&#x4E8B;&#x4EF6;&#x7B49;&#xFF0C;&#x5B98;&#x7F51;&#x90FD;&#x53EF;&#x4EE5;&#x67E5;&#x5230;&#x3002;</p><h4>&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x7684;this&#x6307;&#x5411;&#x95EE;&#x9898;</h4><p>&#x5C31;&#x50CF;&#x4E0A;&#x6587;&#x4E00;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#x7684;&#x65B9;&#x5F0F;&#x5F88;&#x5947;&#x602A;&#xFF0C;&#x4F7F;&#x7528;&#x4E86;bind&#x6765;&#x663E;&#x793A;&#x7ED1;&#x5B9A;this&#x7684;&#x6307;&#x5411;&#x3002;&#x56E0;&#x4E3A;&#x4F20;&#x9012;&#x5230;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x7684;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x800C;&#x8131;&#x79BB;&#x4E86;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x7684;this&#x6307;&#x5411;&#x662F;&#x4E0D;&#x80FD;&#x6307;&#x5230;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x663E;&#x793A;&#x6307;&#x5B9A;&#x3002;</p><h4>&#x901A;&#x8FC7;bind</h4><pre><code>&lt;button onClick={this.update.bind(this)}&gt;&#x66F4;&#x65B0;&lt;/button&gt;</code></pre><h4>&#x6784;&#x9020;&#x5668;&#x5185;&#x90E8;&#x6307;&#x5B9A;</h4><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  constructor(props) {
     super(props) 
     this.update = this.update.bind(this)
  }

  update() {
      this.props.onChange(&apos;&#x5C0F;&#x660E;&#x540D;&#x5B57;&#x6539;&#x4E86;&apos;)
  }

  render() {
    return (&lt;div&gt;
      {this.props.parentName}
      &lt;button onClick={this.update}&gt;&#x66F4;&#x65B0;&lt;/button&gt;
    &lt;/div&gt;)
  }
}</code></pre><h4>&#x7BAD;&#x5934;&#x51FD;&#x6570;</h4><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  update =&gt; e = {
      this.props.onChange(&apos;&#x5C0F;&#x660E;&#x540D;&#x5B57;&#x6539;&#x4E86;&apos;)
  }

  render() {
    return (&lt;div&gt;
      {this.props.parentName}
      &lt;button onClick={this.update}&gt;&#x66F4;&#x65B0;&lt;/button&gt;
    &lt;/div&gt;)
  }
}</code></pre><h4>&#x88C5;&#x9970;&#x5668;</h4><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  constructor(props) {
     super(props) 
  }

  @autoBind
  update() {
      this.props.onChange(&apos;&#x5C0F;&#x660E;&#x540D;&#x5B57;&#x6539;&#x4E86;&apos;)
  }

  render() {
    return (&lt;div&gt;
      {this.props.parentName}
      &lt;button onClick={this.update}&gt;&#x66F4;&#x65B0;&lt;/button&gt;
    &lt;/div&gt;)
  }
}</code></pre><p>&#x88C5;&#x9970;&#x5668;&#x662F;es7&#x8BED;&#x6CD5;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x9700;&#x8981;&#x5B89;&#x88C5;&#x5BF9;&#x5E94;&#x7684;babel&#xFF1A;present&#x7248;&#x672C;&#x3002;&#x800C;typescript&#x5219;&#x539F;&#x751F;&#x652F;&#x6301;&#x3002;</p><blockquote>autoBind&#x539F;&#x7406;&#x5927;&#x6982;&#x5C31;&#x662F;&#x52AB;&#x6301;get&#x65B9;&#x6CD5;&#xFF0C;get&#x65F6;&#x6539;&#x53D8;this&#x6307;&#x5411;</blockquote><h3>&#x5982;&#x4F55;&#x83B7;&#x5F97;evnt&#x539F;&#x751F;&#x4E8B;&#x4EF6;</h3><p>&#x901A;&#x8FC7;e.nativeEvent&#x83B7;&#x53D6;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5BF9;&#x8C61;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  constructor(props) {
     super(props) 
     this.update = this.update.bind(this)
  }

  update(e) {
      console.log(e.nativeEvent)
  }

  render() {
    return (&lt;div&gt;
      &lt;button onClick={this.update}&gt;&#x66F4;&#x65B0;&lt;/button&gt;
    &lt;/div&gt;)
  }
}</code></pre><h3>&#x89E3;&#x51B3;&#x5192;&#x6CE1;&#x548C;&#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x4E8B;&#x4EF6;</h3><pre><code>e.preventDefault() //&#x53D6;&#x6D88;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;</code></pre><pre><code>e.stopPropagation() //&#x53D6;&#x6D88;&#x5192;&#x6CE1;</code></pre><p>&#x8FD9;&#x4E2A;&#x548C;&#x6D4F;&#x89C8;&#x5668;&#x539F;&#x751F;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x65B9;&#x6848;&#x662F;&#x4E00;&#x81F4;&#x7684;&#x3002;&#x95EE;&#x9898;&#x662F;&#x6211;&#x4EEC;&#x53EA;&#x53EF;&#x4EE5;&#x8C03;&#x5408;&#x6210;&#x4E8B;&#x4EF6;&#x7684;<code>e</code>&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0D;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>e.nativeEvent</code>&#x65B9;&#x6CD5;&#x505A;&#x8FD9;&#x4E9B;&#x64CD;&#x4F5C;&#xFF0C;&#x539F;&#x56E0;&#x662F;&#x4E0A;&#x6587;&#x8BB2;&#x8FC7;&#x7684;&#x59D4;&#x6258;&#x3002;</p><h1>ReactDom</h1><h2>ref</h2><p>&#x7279;&#x6B8A;&#x7684;props&#xFF0C;ref&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x73B0;&#x5728;&#x5B98;&#x65B9;&#x4E5F;&#x4E0D;&#x5EFA;&#x8BAE;&#x76F4;&#x63A5;&#x7ED9;ref&#x8D4B;&#x503C;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x6765;&#x8D4B;&#x503C;&#x3002;</p><pre><code>ReactDOM.render((
  &lt;div&gt;
    &lt;Calendar ref={ref =&gt; this.c = ref} any-ss=&quot;text&quot;/&gt;
  &lt;/div&gt;
), document.getElementById(&apos;root&apos;))
</code></pre><h2>render</h2><p>&#x9876;&#x5C42;api,&#x53EA;&#x6709;&#x5728;&#x6839;&#x7EC4;&#x4EF6;&#x65F6;&#x5019;&#x624D;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;Component,&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;dom&#x8282;&#x70B9;</p><h2>findDOMNode</h2><p>&#x901A;&#x8FC7;&#x4F20;&#x5165;component&#x5B9E;&#x4F8B;&#x83B7;&#x53D6;&#x6B64;component&#x6839;dom&#x8282;&#x70B9;&#xFF0C;&#x5728;&#x8FD9;&#x91CC;&#x53EF;&#x4EE5;&#x53BB;dom&#x8282;&#x70B9;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#x4E86;&#xFF0C;&#x867D;&#x7136;&#x6781;&#x5176;&#x4E0D;&#x5EFA;&#x8BAE;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;&#x4F46;&#x662F;&#x4F60;&#x786E;&#x5B9E;&#x53EF;&#x4EE5;&#x505A;&#x3002;</p><h2>unmountComponentAtNode</h2><p>&#x5378;&#x8F7D;&#x6B64;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x9500;&#x6BC1;&#x7EC4;&#x4EF6;state&#x548C;&#x4E8B;&#x4EF6;</p><p>&#x63A5;&#x6536;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;ref&#x3002;&#x4EC5;&#x4EC5;&#x662F;&#x53D6;&#x6D88;&#x6302;&#x8F7D;&#xFF0C;&#x7EC4;&#x4EF6;&#x8FD8;&#x5728;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x5F7B;&#x5E95;&#x6E05;&#x9664;&#x7684;&#x8BDD;&#xFF0C;&#x9700;&#x8981;&#x624B;&#x52A8;&#x5220;&#x6389;&#x6B64;dom&#x3002;</p><h1>&#x8868;&#x5355;</h1><h2>onchange&#x914D;&#x5408;value</h2><p>&#x4E0E;vue&#x6846;&#x67B6;&#x4E0D;&#x540C;&#x7684;&#x662F;&#xFF0C;react&#x5982;&#x679C;&#x8981;&#x5B9E;&#x73B0;&#x8868;&#x5355;&#x5143;&#x7D20;&#x53D8;&#x5316;&#xFF0C;&#x72B6;&#x6001;&#x540C;&#x6B65;&#x66F4;&#x65B0;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x81EA;&#x5DF1;&#x53BB;&#x76D1;&#x542C;&#x8868;&#x5355;&#x4E8B;&#x4EF6;&#x3002;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }

  constructor(props) {
     super(props) 
     this.update = this.update.bind(this)
  }

  update(e) {
      this.setState({
          name: e.target.value
      })
  }

  render() {
    return (&lt;div&gt;
      &lt;input onChange={this.update} value={this.state.name}/&gt;
    &lt;/div&gt;)
  }
}</code></pre><h2>&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x548C;&#x975E;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;</h2><p>&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x548C;&#x975E;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x8FD9;&#x4E9B;&#x90FD;&#x662F;&#x6307;&#x7684;&#x8868;&#x5355;&#x7EC4;&#x4EF6;&#xFF0C;&#x5F53;&#x4E00;&#x4E2A;&#x8868;&#x5355;&#x7684;&#x503C;&#x662F;&#x901A;&#x8FC7;value&#x6539;&#x53D8;&#x7684;&#x800C;&#x4E0D;&#x662F;&#x901A;&#x8FC7;defaultValue&#x662F;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x662F;&#x975E;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x4E0B;&#x9762;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;input&#x5C31;&#x662F;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }

  constructor(props) {
     super(props) 
     this.update = this.update.bind(this)
  }

  update(e) {
      this.setState({
          name: e.target.value
      })
  }

  render() {
    return (&lt;div&gt;
      &lt;input onChange={this.update} value={this.state.name}/&gt;
    &lt;/div&gt;)
  }
}</code></pre><p>&#x4E0B;&#x9762;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;input&#x662F;&#x975E;&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;</p><pre><code>import * as React from &apos;react&apos;

class Child extends React.Component {
  state = {
      name: &apos;&#x5C0F;&#x660E;&apos;
  }

  constructor(props) {
     super(props) 
     this.update = this.update.bind(this)
  }

  update(e) {
      this.setState({
          name: e.target.value
      })
  }

  render() {
    return (&lt;div&gt;
      &lt;input onChange={this.update} defaultValue={this.state.name}/&gt;
    &lt;/div&gt;)
  }
}</code></pre><h1>&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x8BAF;</h1><h2>&#x7236;&#x5B50;&#x4E4B;&#x95F4;&#x901A;&#x8BAF;</h2><p>&#x7236;&#x5B50;&#x4E4B;&#x95F4;&#x901A;&#x8BAF;&#x53C8;&#x5206;&#x4E3A;&#x7236;-&gt;&#x5B50;&#xFF0C;&#x5B50;-&gt;&#x7236;&#x3002;</p><p>&#x56E0;&#x4E3A;react&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x5411;&#x7684;&#x7F18;&#x6545;&#xFF0C;&#x7236;-&gt;&#x5B50;&#x901A;&#x4FE1;&#x7684;&#x8BDD;&#x76F4;&#x63A5;&#x901A;&#x8FC7;props&#x3002;&#x7236;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x53D8;&#x52A8;&#xFF0C;&#x76F4;&#x63A5;&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x5B50;-&gt;&#x7236;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5C31;&#x8981;&#x901A;&#x8FC7;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x6765;&#x901A;&#x4FE1;&#x4E86;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x8C03;&#x7528;&#x6B64;&#x51FD;&#x6570;&#x7684;&#x65B9;&#x5F0F;&#x901A;&#x77E5;&#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x3002;</p><h2>&#x8DE8;&#x7EA7;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h2><p>react&#x4E3A;&#x4E86;&#x5B9E;&#x73B0;&#x7956;&#x5148;&#x7EC4;&#x4EF6;&#x548C;&#x540E;&#x8F88;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x95EE;&#x9898;&#xFF0C;&#x5F15;&#x5165;&#x4E86;contextApi&#x3002;</p><pre><code>class Button extends React.Component {
  render() {
    return (
      &lt;button style={{background: this.context.color}}&gt;
        {this.props.children}
      &lt;/button&gt;
    );
  }
}

Button.contextTypes = {
  color: React.PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      &lt;div&gt;
        {this.props.text} &lt;Button&gt;Delete&lt;/Button&gt;
      &lt;/div&gt;
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: &quot;purple&quot;};
  }

  render() {
    const children = this.props.messages.map((message) =&gt;
      &lt;Message text={message.text} /&gt;
    );
    return &lt;div&gt;{children}&lt;/div&gt;;
  }
}

MessageList.childContextTypes = {
  color: React.PropTypes.string
};</code></pre><p>MessageList&#x4E2D;&#x7684;color&#x4F1A;&#x81EA;&#x52A8;&#x66F4;&#x65B0;&#x5230;&#x513F;&#x5B59;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x53BB;&#xFF0C;&#x5B9E;&#x73B0;&#x8DE8;&#x7EA7;&#x554A;&#x901A;&#x4FE1;&#x3002;&#x5982;&#x679C;&#x9700;&#x8981;&#x53CD;&#x8FC7;&#x6765;&#x901A;&#x4FE1;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x501F;&#x52A9;&#x5176;&#x4ED6;&#x5DE5;&#x5177;&#xFF0C;&#x6BD4;&#x5982;&#x4E8B;&#x4EF6;&#x7CFB;&#x7EDF;(Pub/Sub)&#x3002;</p><h2>&#x6CA1;&#x6709;&#x5D4C;&#x5957;&#x5173;&#x7CFB;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x4FE1;</h2><p>&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x4FE1;&#x6700;&#x4E3B;&#x6D41;&#x7684;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;&#x8131;&#x80CE;&#x4E8E;&#x89C2;&#x5BDF;&#x8FD9;&#x6A21;&#x5F0F;&#x548C;&#x4E2D;&#x4ECB;&#x8005;&#x6A21;&#x5F0F;&#x8FD9;&#x4E24;&#x79CD;&#x3002;</p><p>&#x8DE8;&#x7EA7;&#x4E4B;&#x95F4;&#x901A;&#x4FE1;&#x73B0;&#x5728;&#x6700;&#x4E3B;&#x6D41;&#x7684;&#x65B9;&#x5F0F;&#x5C31;&#x662F;&#x89C2;&#x5BDF;&#x8FD9;&#x6A21;&#x5F0F;&#x7684;&#x5B9E;&#x73B0;Pub/Sub&#xFF0C;react&#x793E;&#x533A;&#x4E2D;&#x7684;redux&#x4E5F;&#x662F;&#x4F7F;&#x7528;&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x5B9E;&#x73B0;&#x7684;&#x3002;</p><p><em>vue2.X&#x7248;&#x672C;&#x4E5F;&#x53BB;&#x6389;&#x4E86;&#x8DE8;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x7684;&#x529F;&#x80FD;&#x3002;&#x90A3;&#x5982;&#x4F55;&#x5728;2.x&#x4E2D;&#x505A;&#x8DE8;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x5462;&#xFF1F;&#x5982;&#x679C;&#x4E0D;&#x501F;&#x52A9;&#x5916;&#x529B;&#x7684;&#x8BDD;&#xFF0C;&#x662F;&#x4E0D;&#x662F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;$parent&#x548C;$childen&#x7684;&#x9012;&#x5F52;&#x8C03;&#x7528;&#x5B9E;&#x73B0;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x5462;&#xFF1F;&#x6BD4;&#x5982;&#x6211;&#x60F3;&#x5E7F;&#x64AD;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x6211;&#x5C31;&#x67E5;&#x627E;&#x5230;&#x6240;&#x6709;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x6328;&#x4E2A;&#x89E6;&#x53D1;$emit(xx)&#xFF0C;&#x4E0A;&#x62A5;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x4E5F;&#x662F;&#x540C;&#x7406;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x9700;&#x8981;&#x67E5;&#x627E;&#x6240;&#x6709;&#x7684;$parent&#x3002;&#x7ED3;&#x5408;&#x8D77;&#x6765;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x53EA;&#x4E0D;&#x8FC7;&#x8FD9;&#x79CD;&#x67E5;&#x627E;&#x6548;&#x7387;&#x6BD4;&#x8F83;&#x4F4E;&#xFF0C;&#x9700;&#x8981;&#x614E;&#x7528;&#x548C;&#x4F18;&#x5316;</em></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
掌握react，这一篇就够了

## 原文链接
[https://segmentfault.com/a/1190000016281174](https://segmentfault.com/a/1190000016281174)

