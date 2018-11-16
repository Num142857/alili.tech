---
title: 从 0 到 1 实现 React 系列 —— 5.PureComponent 实现 && HOC 探幽
hidden: true
categories: [reprint]
slug: 92dc08c6
date: 2018-11-14 02:30:09
---

{{< raw >}}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016161881?w=640&amp;h=280" src="https://static.alili.tech/img/remote/1460000016161881?w=640&amp;h=280" alt="" title=""></span></p><p>&#x672C;&#x7CFB;&#x5217;&#x6587;&#x7AE0;&#x5728;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A; cpreact &#x7684;&#x540C;&#x65F6;&#x5E2E;&#x52A9;&#x5927;&#x5BB6;&#x7406;&#x987A; React &#x6846;&#x67B6;&#x7684;&#x6838;&#x5FC3;&#x5185;&#x5BB9;(JSX/&#x865A;&#x62DF;DOM/&#x7EC4;&#x4EF6;/&#x751F;&#x547D;&#x5468;&#x671F;/diff&#x7B97;&#x6CD5;/setState/PureComponent/HOC/...) <a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer">&#x9879;&#x76EE;&#x5730;&#x5740;</a></p><ul><li><a href="https://github.com/MuYunyun/blog/issues/24" rel="nofollow noreferrer">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; JSX &#x548C; Virtual DOM</a></li><li><a href="https://github.com/MuYunyun/blog/issues/25" rel="nofollow noreferrer">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x7EC4;&#x4EF6;&#x548C; state|props</a></li><li><a href="https://github.com/MuYunyun/blog/issues/26" rel="nofollow noreferrer">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x751F;&#x547D;&#x5468;&#x671F;&#x548C; diff &#x7B97;&#x6CD5;</a></li><li><a href="https://github.com/MuYunyun/blog/issues/27" rel="nofollow noreferrer">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; &#x4F18;&#x5316; setState &#x548C; ref &#x7684;&#x5B9E;&#x73B0;</a></li><li><a href="https://github.com/MuYunyun/blog/issues/29" rel="nofollow noreferrer">&#x4ECE; 0 &#x5230; 1 &#x5B9E;&#x73B0; React &#x7CFB;&#x5217; &#x2014;&#x2014; PureComponent &#x5B9E;&#x73B0; &amp;&amp; HOC &#x63A2;&#x5E7D;</a></li></ul><h3>PureComponent &#x7CBE;&#x9AD3;</h3><p>&#x4F7F;&#x7528; PureComponent &#x662F;&#x4F18;&#x5316; React &#x6027;&#x80FD;&#x7684;&#x4E00;&#x79CD;&#x5E38;&#x7528;&#x624B;&#x6BB5;&#xFF0C;&#x76F8;&#x8F83;&#x4E8E; Component, PureComponent &#x4F1A;&#x5728; render &#x4E4B;&#x524D;&#x81EA;&#x52A8;&#x6267;&#x884C;&#x4E00;&#x6B21; shouldComponentUpdate() &#x51FD;&#x6570;&#xFF0C;&#x6839;&#x636E;&#x8FD4;&#x56DE;&#x7684; bool &#x503C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x8FDB;&#x884C; render&#x3002;&#x5176;&#x4E2D;&#x6709;&#x4E2A;&#x91CD;&#x70B9;&#x662F; PureComponent &#x5728; shouldComponentUpdate() &#x7684;&#x65F6;&#x5019;&#x4F1A;&#x8FDB;&#x884C; shallowEqual(&#x6D45;&#x6BD4;&#x8F83;)&#x3002;</p><p>PureComponent &#x7684;&#x6D45;&#x6BD4;&#x8F83;&#x7B56;&#x7565;&#x5982;&#x4E0B;&#xFF1A;</p><p>&#x5BF9; prevState/nextState &#x4EE5;&#x53CA; prevProps/nextProps &#x8FD9;&#x4E24;&#x7EC4;&#x6570;&#x636E;&#x8FDB;&#x884C;&#x6D45;&#x6BD4;&#x8F83;&#xFF1A;</p><p>1.&#x5BF9;&#x8C61;&#x7B2C;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x672A;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;render &#x65B9;&#x6CD5;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#xFF1B;<br>2.&#x5BF9;&#x8C61;&#x7B2C;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x53D1;&#x751F;&#x6539;&#x53D8;(&#x5305;&#x62EC;&#x7B2C;&#x4E00;&#x5C42;&#x6570;&#x636E;&#x5F15;&#x7528;&#x7684;&#x6539;&#x53D8;)&#xFF0C;render &#x65B9;&#x6CD5;&#x4F1A;&#x89E6;&#x53D1;;</p><h4>PureComponent &#x7684;&#x5B9E;&#x73B0;</h4><p>&#x7167;&#x7740;&#x4E0A;&#x8FF0;&#x601D;&#x8DEF;&#x6211;&#x4EEC;&#x6765;&#x5B9E;&#x73B0; PureComponent &#x7684;&#x903B;&#x8F91;</p><pre><code class="js">function PureComponent(props) {
  this.props = props || {}
  this.state = {}

  isShouldComponentUpdate.call(this) // &#x4E3A;&#x6BCF;&#x4E2A; PureComponent &#x7ED1;&#x5B9A; shouldComponentUpdate &#x65B9;&#x6CD5;
}

PureComponent.prototype.setState = function(updater, cb) {
  isShouldComponentUpdate.call(this) // &#x8C03;&#x7528; setState &#x65F6;&#xFF0C;&#x8BA9; this &#x6307;&#x5411;&#x5B50;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x76EE;&#x7684;&#x53D6;&#x5230;&#x5B50;&#x7C7B;&#x7684; this.state
  asyncRender(updater, this, cb)
}

function isShouldComponentUpdate() {
  const cpState = this.state
  const cpProps = this.props
  this.shouldComponentUpdate = function (nextProps, nextState) {
    if (!shallowEqual(cpState, nextState) || !shallowEqual(cpProps, nextProps)) {
      return true  // &#x53EA;&#x8981; state &#x6216; props &#x6D45;&#x6BD4;&#x8F83;&#x4E0D;&#x7B49;&#x7684;&#x8BDD;&#xFF0C;&#x5C31;&#x8FDB;&#x884C;&#x6E32;&#x67D3;
    } else {
      return false // &#x6D45;&#x6BD4;&#x8F83;&#x76F8;&#x7B49;&#x7684;&#x8BDD;&#xFF0C;&#x4E0D;&#x6E32;&#x67D3;
    }
  }
}

// &#x6D45;&#x6BD4;&#x8F83;&#x903B;&#x8F91;
const shallowEqual = function(oldState, nextState) {
  const oldKeys = Object.keys(oldState)
  const newKeys = Object.keys(nextState)

  if (oldKeys.length !== newKeys.length) {
    return false
  }

  let flag = true
  for (let i = 0; i &lt; oldKeys.length; i++) {
    if (!nextState.hasOwnProperty(oldKeys[i])) {
      flag = false
      break
    }

    if (nextState[oldKeys[i]] !== oldState[oldKeys[i]]) {
      flag = false
      break
    }
  }

  return flag
}</code></pre><h4>&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;</h4><p>&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7528; &#x5728; React &#x4E0A;&#x63D0;&#x7684;&#x4E00;&#x4E2A; <a href="https://github.com/facebook/react/issues/13438#issuecomment-414128918" rel="nofollow noreferrer">issue</a> &#x4E2D;&#x7684;&#x6848;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x671F;&#x671B;&#x70B9;&#x51FB;&#x589E;&#x52A0;&#x6309;&#x94AE;&#x540E;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x663E;&#x793A;&#x7684;&#x503C;&#x80FD;&#x591F;&#x52A0; 1&#x3002;</p><pre><code class="js">class B extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    this.click = this.click.bind(this)
  }

  click() {
    this.setState({
      count: ++this.state.count,
    })
  }

  render() {
    return (
      &lt;div&gt;
        &lt;button onClick={this.click}&gt;&#x589E;&#x52A0;&lt;/button&gt;
        &lt;div&gt;{this.state.count}&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}</code></pre><p>&#x7136;&#x800C;&#xFF0C;&#x6211;&#x4EEC;&#x70B9;&#x51FB;&#x4E0A;&#x8FF0;&#x4EE3;&#x7801;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x663E;&#x793A;&#x7684; 0 &#x5206;&#x6BEB;&#x4E0D;&#x52A8;&#xFF01;&#xFF01;&#xFF01;</p><p>&#x63ED;&#x79D8;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="js">click() {
  const t = ++this.state.count
  console.log(t === this.state.count) // true
  this.setState({
    count: t,
  })
}</code></pre><p>&#x5F53;&#x70B9;&#x51FB;&#x589E;&#x52A0;&#x6309;&#x94AE;&#xFF0C;&#x63A7;&#x5236;&#x53F0;&#x663E;&#x793A; <code>t === this.state.count</code> &#x4E3A; true, &#x4E5F;&#x5C31;&#x8BF4;&#x660E;&#x4E86; setState &#x524D;&#x540E;&#x7684;&#x72B6;&#x6001;&#x662F;&#x7EDF;&#x4E00;&#x7684;&#xFF0C;&#x6240;&#x4EE5; shallowEqual(&#x6D45;&#x6BD4;&#x8F83;) &#x8FD4;&#x56DE;&#x7684;&#x662F; true&#xFF0C;&#x81F4;&#x4F7F; shouldComponentUpdate &#x8FD4;&#x56DE;&#x4E86; false&#xFF0C;&#x9875;&#x9762;&#x56E0;&#x6B64;&#x6CA1;&#x6709;&#x6E32;&#x67D3;&#x3002;</p><p>&#x7C7B;&#x4F3C;&#x7684;&#xFF0C;&#x5982;&#x4E0B;&#x5199;&#x6CD5;&#x4E5F;&#x662F;&#x8FBE;&#x4E0D;&#x5230;&#x76EE;&#x6807;&#x7684;&#xFF0C;&#x7559;&#x7ED9;&#x8BFB;&#x8005;&#x601D;&#x8003;&#x4E86;&#x3002;</p><pre><code class="js">click() {
  this.setState({
    count: this.state.count++,
  })
}</code></pre><p>&#x90A3;&#x4E48;&#x5982;&#x4F55;&#x8FBE;&#x5230;&#x6211;&#x4EEC;&#x671F;&#x671B;&#x7684;&#x76EE;&#x6807;&#x5462;&#x3002;&#x63ED;&#x79D8;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="js">click() {
  this.setState({
    count: this.state.count + 1
  })
}</code></pre><p>&#x611F;&#x609F;&#xFF1A;&#x5C0F;&#x5C0F;&#x7684;&#x4E00;&#x884C;&#x4EE3;&#x7801;&#x91CC;&#x8574;&#x85CF;&#x7740;&#x65E0;&#x6570;&#x7684; bug&#x3002;</p><h3>HOC &#x5B9E;&#x8DF5;</h3><p>&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;(Higher Order Component) &#x4E0D;&#x5C5E;&#x4E8E; React API &#x8303;&#x7574;&#xFF0C;&#x4F46;&#x662F;&#x5B83;&#x5728; React &#x4E2D;&#x4E5F;&#x662F;&#x4E00;&#x79CD;&#x5B9E;&#x7528;&#x7684;&#x6280;&#x672F;&#xFF0C;<code>&#x5B83;&#x53EF;&#x4EE5;&#x5C06;&#x5E38;&#x89C1;&#x4EFB;&#x52A1;&#x62BD;&#x8C61;&#x6210;&#x4E00;&#x4E2A;&#x53EF;&#x91CD;&#x7528;&#x7684;&#x90E8;&#x5206;</code>&#x3002;&#x8FD9;&#x4E2A;&#x5C0F;&#x8282;&#x7B97;&#x662F;&#x756A;&#x5916;&#x7BC7;&#xFF0C;&#x4F1A;&#x7ED3;&#x5408; <a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer">cpreact</a>(&#x524D;&#x6587;&#x5B9E;&#x73B0;&#x7684;&#x7C7B; react &#x8F6E;&#x5B50;) &#x4E0E; HOC &#x8FDB;&#x884C;&#x76F8;&#x5173;&#x7684;&#x5B9E;&#x8DF5;&#x3002;</p><p>&#x5B83;&#x53EF;&#x4EE5;&#x7528;&#x5982;&#x4E0B;&#x516C;&#x5F0F;&#x8868;&#x793A;&#xFF1A;</p><pre><code class="js">y = f(x),

// x&#xFF1A;&#x539F;&#x6709;&#x7EC4;&#x4EF6;
// y&#xFF1A;&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;
// f()&#xFF1A;</code></pre><p><code>f()</code> &#x7684;&#x5B9E;&#x73B0;&#x6709;&#x4E24;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x5B9E;&#x8DF5;&#x3002;</p><h4>&#x5C5E;&#x6027;&#x4EE3;&#x7406;(Props Proxy)</h4><p>&#x8FD9;&#x7C7B;&#x5B9E;&#x73B0;&#x4E5F;&#x662F;&#x88C5;&#x9970;&#x5668;&#x6A21;&#x5F0F;&#x7684;&#x4E00;&#x79CD;&#x8FD0;&#x7528;&#xFF0C;&#x901A;&#x8FC7;&#x88C5;&#x9970;&#x5668;&#x51FD;&#x6570;&#x7ED9;&#x539F;&#x6765;&#x51FD;&#x6570;&#x8D4B;&#x80FD;&#x3002;&#x4E0B;&#x9762;&#x4F8B;&#x5B50;&#x5728;&#x88C5;&#x9970;&#x5668;&#x51FD;&#x6570;&#x4E2D;&#x7ED9;&#x88AB;&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x4E86;&#x989D;&#x5916;&#x7684;&#x5C5E;&#x6027; { a: 1, b: 2 }&#x3002;</p><blockquote>&#x58F0;&#x660E;&#xFF1A;&#x4E0B;&#x6587;&#x6240;&#x5C55;&#x793A;&#x7684; demo &#x5747;&#x5DF2;&#x5728; <a href="https://github.com/MuYunyun/cpreact" rel="nofollow noreferrer">cpreact</a> &#x6D4B;&#x8BD5;&#x901A;&#x8FC7;</blockquote><pre><code class="js">function ppHOC(WrappedComponent) {
  return class extends Component {

    render() {
      const obj = { a: 1, b: 2 }
      return (
        &lt;WrappedComponent { ...this.props } { ...obj } /&gt;
      )
    }
  }
}

@ppHOC
class B extends Component {
  render() {
    return (
      &lt;div&gt;
        { this.props.a + this.props.b } { /* &#x8F93;&#x51FA; 3 */ }
      &lt;/div&gt;
    )
  }
}</code></pre><p>&#x8981;&#x662F;&#x5C06; { a: 1, b: 2 } &#x66FF;&#x6362;&#x6210;&#x5168;&#x5C40;&#x5171;&#x4EAB;&#x5BF9;&#x8C61;&#xFF0C;&#x90A3;&#x4E48;&#x4E0D;&#x5C31;&#x662F; react-redux &#x4E2D;&#x7684; Connect &#x4E86;&#x4E48;?</p><p>&#x6539;&#x8FDB;&#x4E0A;&#x8FF0; demo&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x53EF;&#x63D2;&#x62D4;&#x7684;<a href="https://reactjs.org/docs/forms.html#controlled-components" rel="nofollow noreferrer">&#x53D7;&#x63A7;&#x7EC4;&#x4EF6;</a>&#xFF0C;&#x4EE3;&#x7801;&#x793A;&#x610F;&#x5982;&#x4E0B;&#xFF1A;</p><pre><code class="js">function ppDecorate(WrappedComponent) {
  return class extends Component {
    constructor() {
      super()
      this.state = {
        value: &apos;&apos;
      }
      this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
      this.setState({
        value: e.target.value
      })
    }

    render() {
      const obj = {
        onChange: this.onChange,
        value: this.state.value,
      }

      return (
        &lt;WrappedComponent { ...this.props } { ...obj } /&gt;
      )
    }
  }
}

@ppDecorate
class B extends Component {
  render() {
    return (
      &lt;div&gt;
        &lt;input { ...this.props } /&gt;
        &lt;div&gt;{ this.props.value }&lt;/div&gt;
      &lt;/div&gt;
    )
  }
}</code></pre><p>&#x6548;&#x679C;&#x5982;&#x4E0B;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016161882" src="https://static.alili.tech/img/remote/1460000016161882" alt="" title=""></span></p><p>&#x8FD9;&#x91CC;&#x6709;&#x4E2A;&#x5751;&#x70B9;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x5728;&#x8F93;&#x5165;&#x6846;&#x8F93;&#x5165;&#x5B57;&#x7B26;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5E76;&#x4E0D;&#x4F1A;&#x7ACB;&#x9A6C;&#x89E6;&#x53D1; onChange &#x4E8B;&#x4EF6;(&#x6211;&#x4EEC;&#x60F3;&#x8981;&#x8BA9;&#x4E8B;&#x4EF6;&#x7ACB;&#x5373;&#x89E6;&#x53D1;&#xFF0C;&#x7136;&#x800C;&#x73B0;&#x5728;&#x8981;&#x6309;&#x4E0B;&#x56DE;&#x8F66;&#x952E;&#x6216;&#x8005;&#x70B9;&#x4E0B;&#x9F20;&#x6807;&#x624D;&#x89E6;&#x53D1;)&#xFF0C;&#x5728; react &#x4E2D;&#x6709;&#x4E2A;<a href="https://reactjs.org/docs/events.html" rel="nofollow noreferrer">&#x5408;&#x6210;&#x4E8B;&#x4EF6;</a> &#x7684;&#x77E5;&#x8BC6;&#x70B9;&#xFF0C;&#x4E0B;&#x7BC7;&#x6587;&#x7AE0;&#x4F1A;&#x8FDB;&#x884C;&#x63A2;&#x7A76;&#x3002;</p><p>&#x987A;&#x5E26;&#x4E00;&#x63D0;&#x5728;&#x8FD9;&#x4E2A; demo &#x4E2D;&#x4F3C;&#x4E4E;&#x770B;&#x5230;&#x4E86;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x662F;&#x5B9E;&#x9645;&#x4E2D; React &#x5E76;&#x6CA1;&#x6709;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x8FD0;&#x7528; HOC &#x7684;&#x77E5;&#x8BC6;&#x70B9;&#x7ED3;&#x5408; setState &#x5728; React &#x8868;&#x5355;&#x4E2D;&#x5B9E;&#x73B0;&#x4F2A;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x6548;&#x679C;&#x3002;</p><h4>&#x7EE7;&#x627F;&#x53CD;&#x8F6C;(Inheritance Inversion)</h4><p>&#x7EE7;&#x627F;&#x53CD;&#x8F6C;&#x7684;&#x6838;&#x5FC3;&#x662F;&#xFF1A;&#x4F20;&#x5165; HOC &#x7684;&#x7EC4;&#x4EF6;&#x4F1A;&#x4F5C;&#x4E3A;&#x8FD4;&#x56DE;&#x7C7B;&#x7684;&#x7236;&#x7C7B;&#x6765;&#x4F7F;&#x7528;&#x3002;&#x7136;&#x540E;&#x5728; render &#x4E2D;&#x8C03;&#x7528; <code>super.render()</code> &#x6765;&#x8C03;&#x7528;&#x7236;&#x7C7B;&#x7684; render &#x65B9;&#x6CD5;&#x3002;</p><blockquote>&#x5728; <a href="https://github.com/MuYunyun/blog/blob/master/BasicSkill/readES6/%E7%BB%A7%E6%89%BF.md#%E4%BD%9C%E4%B8%BA%E5%AF%B9%E8%B1%A1%E8%B0%83%E7%94%A8%E7%9A%84-super" rel="nofollow noreferrer">&#x300A;ES6 &#x7EE7;&#x627F;&#x4E0E; ES5 &#x7EE7;&#x627F;&#x7684;&#x5DEE;&#x5F02;&#x300B;</a>&#x4E2D;&#x6211;&#x4EEC;&#x63D0;&#x5230;&#x4E86;&#x4F5C;&#x4E3A;&#x5BF9;&#x8C61;&#x4F7F;&#x7528;&#x7684; super &#x6307;&#x5411;&#x7236;&#x7C7B;&#x7684;&#x5B9E;&#x4F8B;&#x3002;</blockquote><pre><code class="js">function iiHOC(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      const parentRender = super.render()
      if (parentRender.nodeName === &apos;span&apos;) {
        return (
          &lt;span&gt;&#x7EE7;&#x627F;&#x53CD;&#x8F6C;&lt;/span&gt;
        )
      }
    }
  }
}

@iiHOC
class B extends Component {
  render() {
    return (
      &lt;span&gt;Inheritance Inversion&lt;/span&gt;
    )
  }
}</code></pre><p>&#x5728;&#x8FD9;&#x4E2A; demo &#x4E2D;&#xFF0C;&#x5728; HOC &#x5185;&#x5B9E;&#x73B0;&#x4E86;&#x6E32;&#x67D3;&#x52AB;&#x6301;&#xFF0C;&#x9875;&#x9762;&#x4E0A;&#x6700;&#x7EC8;&#x663E;&#x793A;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016161883" src="https://static.alili.tech/img/remote/1460000016161883" alt="" title=""></span></p><blockquote>&#x53EF;&#x80FD;&#x4F1A;&#x6709;&#x7591;&#x60D1;&#xFF0C;&#x4F7F;&#x7528;<code>&#x5C5E;&#x6027;&#x4EE3;&#x7406;</code>&#x7684;&#x65B9;&#x5F0F;&#x8C8C;&#x4F3C;&#x4E5F;&#x80FD;&#x5B9E;&#x73B0;&#x6E32;&#x67D3;&#x52AB;&#x6301;&#x5440;&#xFF0C;&#x4F46;&#x662F;&#x90A3;&#x6837;&#x505A;&#x6CA1;&#x6709;<code>&#x7EE7;&#x627F;&#x53CD;&#x8F6C;</code>&#x8FD9;&#x79CD;&#x65B9;&#x5F0F;&#x7EAF;&#x7CB9;&#x3002;</blockquote><h3>&#x9E23;&#x8C22;</h3><p>Especially thank <a href="https://github.com/hujiulong/simple-react" rel="nofollow noreferrer">simple-react</a> for the guidance function of this library. At the meantime&#xFF0C;respect for <a href="https://github.com/developit/preact" rel="nofollow noreferrer">preact</a> and <a href="https://github.com/facebook/react" rel="nofollow noreferrer">react</a></p><h3>&#x76F8;&#x5173;&#x94FE;&#x63A5;</h3><ul><li><a href="https://github.com/facebook/react/issues/13438" rel="nofollow noreferrer">A doubt behaviour using the PureComponent</a></li><li><a href="https://juejin.im/post/59cdaaccf265da066f6ac83b" rel="nofollow noreferrer">React &#x7684;&#x6027;&#x80FD;&#x4F18;&#x5316;&#xFF08;&#x4E00;&#xFF09;&#x5F53; PureComponent &#x9047;&#x4E0A; ImmutableJS</a></li><li><a href="https://juejin.im/post/5b1caceb5188257d63226743" rel="nofollow noreferrer">React&#x6027;&#x80FD;&#x4F18;&#x5316;&#x65B9;&#x6848;&#x4E4B;PureComponent</a></li><li><a href="https://juejin.im/post/59818a485188255694568ff2" rel="nofollow noreferrer">&#x5E26;&#x7740;&#x4E09;&#x4E2A;&#x95EE;&#x9898;&#x6DF1;&#x5165;&#x6D45;&#x51FA;React&#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</a></li><li><a href="https://zhuanlan.zhihu.com/p/24776678?refer=FrontendMagazine" rel="nofollow noreferrer">&#x6DF1;&#x5165;&#x7406;&#x89E3; React &#x9AD8;&#x9636;&#x7EC4;&#x4EF6;</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从 0 到 1 实现 React 系列 —— 5.PureComponent 实现 && HOC 探幽

## 原文链接
[https://segmentfault.com/a/1190000016161878](https://segmentfault.com/a/1190000016161878)

