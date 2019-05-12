---
title: 'react-navigation使用小记' 
date: 2018-11-22 2:30:10
hidden: true
slug: 0b5o0s9x1ixc
categories: [reprint]
---

{{< raw >}}
<h1 id="articleHeader0">react-navigation &#x4F7F;&#x7528;&#x5C0F;&#x8BB0;</h1><h2 id="articleHeader1">&#x65E5;&#x5E38;&#x5E9F;&#x8BDD;</h2><p><a href="https://github.com/react-navigation/react-navigation" rel="nofollow noreferrer" target="_blank">react-navigation</a>&#x662F;&#x4E00;&#x4E2A;&#x6765;&#x6E90;&#x4E8E;react&#x793E;&#x533A;&#x7684;&#x5BFC;&#x822A;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002; &#x4EE5;&#x6211;<strong>&#x4E00;&#x4E2A;&#x6708;</strong><del>&#x8D44;&#x6DF1;</del>&#x7684;react&#x5F00;&#x53D1;&#x7ECF;&#x9A8C;&#x6765;&#x770B;&#xFF0C;&#x8BF4;&#x662F;<code>react-native</code>&#x5F00;&#x53D1;app&#x5FC5;&#x5907;&#x5E93;&#x4E4B;&#x4E00;&#x6BEB;&#x4E0D;&#x8FC7;&#x5206;&#x3002;</p><p>&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x4E0D;&#x540C;&#x9875;&#x9762;&#x56E0;&#x4E3A;&#x4E0D;&#x540C;&#x7684;&#x4E1A;&#x52A1;&#x9700;&#x6C42;&#x4F1A;&#x6709;&#x4E0D;&#x540C;&#x7684;&#x5934;&#x90E8;(header)&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x9488;&#x5BF9;&#x51E0;&#x79CD;<del>&#x5E38;&#x7528;</del>&#x6211;&#x9047;&#x5230;&#x8FC7;&#x7684;&#x5404;&#x79CD;header&#x63D0;&#x4F9B;&#x5BF9;&#x5E94;&#x7684;<code>react-navigation</code>&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p><h2 id="articleHeader2">&#x6211;&#x662F;&#x6B63;&#x6587;</h2><p>&#x5E95;&#x90E8;tab&#x5BF9;app&#x6765;&#x8BF4;&#x662F;&#x5341;&#x5206;&#x5E38;&#x89C1;&#x7684;&#x9700;&#x6C42;&#x3002;<code>react-navigation</code>&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x76F8;&#x5E94;&#x7684;API&#x6765;&#x521B;&#x5EFA;&#x5E95;&#x90E8;tab&#xFF1A; <code>createBottomTabNavigator</code></p><p>&#x5982;&#x4F55;&#x5B9A;&#x5236;tab&#x9875;&#x7684;header&#x5462;&#xFF1F; &#x6211;&#x4EEC;&#x5206;&#x60C5;&#x51B5;&#x8BA8;&#x8BBA;&#xFF1A;</p><h3 id="articleHeader3">&#x6240;&#x6709;tab&#x9875;&#x90FD;&#x8981;header</h3><p>&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x65E0;&#x9700;&#x989D;&#x5916;&#x7684;&#x914D;&#x7F6E;&#x3002;</p><h3 id="articleHeader4">&#x6240;&#x6709;tab&#x9875;&#x90FD;&#x4E0D;&#x8981;header</h3><p>&#x7B2C;&#x4E00;&#x65F6;&#x95F4;&#x53EF;&#x80FD;&#x4F1A;&#x60F3;&#x5230;&#x7684;&#x662F;&#x5728;<code>createBottomTabNavigator</code>&#x4E2D;&#x5BF9;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x7684;<code>navigationOptions</code>&#x5BF9;&#x8C61;&#x8BBE;&#x7F6E;<code>header</code>&#x4E3A;null&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null // &#x65E0;&#x6548;&#xFF01;&#xFF01;
      }
    }
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js">createBottomTabNavigator(
  {
    <span class="hljs-attr">Home</span>: {
      <span class="hljs-attr">screen</span>: Home,
      <span class="hljs-attr">navigationOptions</span>: {
        <span class="hljs-attr">header</span>: <span class="hljs-literal">null</span> <span class="hljs-comment">// &#x65E0;&#x6548;&#xFF01;&#xFF01;</span>
      }
    }
  }
)</code></pre><p>&#x4F46;&#x5B9E;&#x9645;&#x4E0A;<code>createBottomTabNavigator</code>&#x4E2D;&#x7684;<code>navigationOptions</code>&#x5BF9;&#x8C61;&#x662F;&#x4E0D;&#x63A5;&#x53D7;<code>header</code>&#x53C2;&#x6570;&#x7684;&#xFF0C;&#x81F3;&#x5C11;&#x6587;&#x6863;&#x4E2D;&#x6CA1;&#x5199;&#x3002;<a href="https://reactnavigation.org/docs/en/bottom-tab-navigator.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><p>&#x89E3;&#x51B3;&#x65B9;&#x5F0F;&#xFF1A;&#x5728;&#x6839;&#x7EA7;&#x5BFC;&#x822A;&#x4E2D;&#x8BBE;&#x7F6E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: TabNavigator, // TabNavigator&#x5C31;&#x662F;&#x901A;&#x8FC7;createBottomTabNavigator&#x521B;&#x5EFA;&#x7684;&#x5E95;&#x90E8;&#x5BFC;&#x822A;
      navigationOptions: {
        header: null
      }
    }
    // other pages
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> AppNavigator = createStackNavigator(
  {
    <span class="hljs-attr">Main</span>: {
      <span class="hljs-attr">screen</span>: TabNavigator, <span class="hljs-comment">// TabNavigator&#x5C31;&#x662F;&#x901A;&#x8FC7;createBottomTabNavigator&#x521B;&#x5EFA;&#x7684;&#x5E95;&#x90E8;&#x5BFC;&#x822A;</span>
      navigationOptions: {
        <span class="hljs-attr">header</span>: <span class="hljs-literal">null</span>
      }
    }
    <span class="hljs-comment">// other pages</span>
  }
)</code></pre><h3 id="articleHeader5">&#x53EA;&#x6709;&#x67D0;&#x4E2A;tab&#x8981;header</h3><p>&#x5176;&#x5B9E;navigator&#x662F;&#x53EF;&#x4EE5;&#x4E92;&#x76F8;&#x5D4C;&#x5957;&#x7684;&#x3002; &#x5C31;&#x50CF;&#x4E0A;&#x9762;&#x7684;&#x4F8B;&#x5B50;&#x4E2D;&#xFF0C;Main&#x8DEF;&#x7531;&#x7684;&#x9875;&#x9762;&#x662F;<code>createBottomTabNavigator</code>&#x521B;&#x5EFA;&#x7684;&#x5E95;&#x90E8;&#x5BFC;&#x822A;&#x3002;&#x540C;&#x7406;&#xFF0C;&#x5E95;&#x90E8;&#x5BFC;&#x822A;&#x4E2D;&#x67D0;&#x4E2A;tab&#x7684;&#x9875;&#x9762;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x5BFC;&#x822A;&#x9875;&#x3002;&#x6709;&#x70B9;&#x7ED5;&#xFF0C;&#x8FD8;&#x662F;&#x770B;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        // some options
      }
    },
    User: { // user&#x9875;&#x8981;&quot;&#x5934;&quot;~
      screen: createStackNavigator(
        {
            User: {
              screen: User,
              navigationOptions: {
                header: customHeader
              }
            }
        }
      )
    }
  }
)

const appNavigator = createStackNavigator(
  {
    Main: {
      screen: bottomTabNavigator,
      navigationOptions: {
        header: null // &#x8FD9;&#x91CC;&#x8981;&#x5C06;bottomTabNavigator&#x7684;header&#x8BBE;&#x4E3A;null
      }
    },
    Other: {
      screen: Other
    }
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> bottomTabNavigator = createBottomTabNavigator(
  {
    <span class="hljs-attr">Home</span>: {
      <span class="hljs-attr">screen</span>: Home,
      <span class="hljs-attr">navigationOptions</span>: {
        <span class="hljs-comment">// some options</span>
      }
    },
    <span class="hljs-attr">User</span>: { <span class="hljs-comment">// user&#x9875;&#x8981;&quot;&#x5934;&quot;~</span>
      screen: createStackNavigator(
        {
            <span class="hljs-attr">User</span>: {
              <span class="hljs-attr">screen</span>: User,
              <span class="hljs-attr">navigationOptions</span>: {
                <span class="hljs-attr">header</span>: customHeader
              }
            }
        }
      )
    }
  }
)

<span class="hljs-keyword">const</span> appNavigator = createStackNavigator(
  {
    <span class="hljs-attr">Main</span>: {
      <span class="hljs-attr">screen</span>: bottomTabNavigator,
      <span class="hljs-attr">navigationOptions</span>: {
        <span class="hljs-attr">header</span>: <span class="hljs-literal">null</span> <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x8981;&#x5C06;bottomTabNavigator&#x7684;header&#x8BBE;&#x4E3A;null</span>
      }
    },
    <span class="hljs-attr">Other</span>: {
      <span class="hljs-attr">screen</span>: Other
    }
  }
)</code></pre><p>&#x56E0;&#x4E3A;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;bottomTabNavigator&#x4F1A;&#x6709;&#x4E00;&#x4E2A;&#x81EA;&#x5DF1;&#x7684;header&#xFF0C;&#x800C;user&#x6211;&#x4EEC;&#x53C8;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5E26;header&#x7684;&#x8DEF;&#x7531;&#x9875;&#x9762;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5C06;<code>Main</code>&#x8DEF;&#x7531;&#xFF08;bottomTabNavigato&#xFF09;&#x7684;header&#x8BBE;&#x4E3A;null&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x8BBE;&#x7F6E;&#x7684;&#xFF0C;&#x9875;&#x9762;&#x4F1A;&#x6709;2&#x4E2A;header&#x54E6;&#xFF0C;&#x5C0F;&#x4F19;&#x4F34;&#x53EF;&#x81EA;&#x884C;&#x5C1D;&#x8BD5;&#x3002;</p><h3 id="articleHeader6">&#x67D0;tab&#x9875;&#x4E0D;&#x8981;header or &#x9700;&#x8981;&#x5B9A;&#x5236;header</h3><p>&#x5982;&#x679C;&#x6211;&#x53EA;&#x6709;&#x67D0;&#x4E2A;tab&#x9875;&#x4E0D;&#x8981;header&#xFF0C;&#x548B;&#x529E;&#xFF1F;<br>&#x8FD8;&#x662F;&#x4ECE;<code>navigationOptions</code>&#x5165;&#x624B;&#xFF0C;navigationPptions&#x5C5E;&#x6027;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x63A5;&#x53D7;<code>navigation</code>&#x5BF9;&#x8C61;&#xFF0C;&#x8FD4;&#x56DE;&#x4E00;&#x4E2A;&#x65B0;&#x5BF9;&#x8C61;&#x7684;&#x51FD;&#x6570;&#x3002;</p><p>&#x5173;&#x4E8E;<code>navigation</code>&#x5BF9;&#x8C61;&#xFF0C;&#x53EF;&#x4EE5;&#x770B;<a href="https://reactnavigation.org/docs/en/navigation-prop.html" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x7528;&#x5230;&#x4E86;&#x8BE5;&#x5BF9;&#x8C61;&#x7684;<code>state</code>&#x5C5E;&#x6027;&#x3002;</p><p>&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x6709;&#x5982;&#x4E0B;&#x5BFC;&#x822A;&#x914D;&#x7F6E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: &apos;&#x9996;&#x9875;&apos;
      }
    },
    Phone: {
      screen: createStackNavigator(
        {
          Phone: {
            screen: Phone,
            navigationOptions: ({ navigation }) =&gt; (
              { // phoneHeader&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;React&#x7EC4;&#x4EF6;
                header: &lt;PhoneHeader navigation={navigation}/&gt;
              }
            )
          }
        }
      ),
      navigationOptions: {
        tabBarVisible: false,
        title: &apos;&#x673A;&#x578B;&apos;
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        title: &apos;&#x6211;&#x7684;&apos;
      }
    }
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code class="jsx"><span class="hljs-string">const</span> <span class="hljs-string">TabNavigator</span> <span class="hljs-string">=</span> <span class="hljs-string">createBottomTabNavigator(</span>
  <span class="hljs-string">{</span>
<span class="hljs-attr">    Home:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      screen:</span> <span class="hljs-string">Home,</span>
<span class="hljs-attr">      navigationOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        title:</span> <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    Phone:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      screen:</span> <span class="hljs-string">createStackNavigator(</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          Phone:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            screen:</span> <span class="hljs-string">Phone,</span>
<span class="hljs-attr">            navigationOptions:</span> <span class="hljs-string">({</span> <span class="hljs-string">navigation</span> <span class="hljs-string">})</span> <span class="hljs-string">=&gt;</span> <span class="hljs-string">(</span>
              <span class="hljs-string">{</span> <span class="hljs-string">//</span> <span class="hljs-string">phoneHeader&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;React&#x7EC4;&#x4EF6;</span>
<span class="hljs-attr">                header:</span> <span class="hljs-string">&lt;PhoneHeader</span> <span class="hljs-string">navigation={navigation}/&gt;</span>
              <span class="hljs-string">}</span>
            <span class="hljs-string">)</span>
          <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">),</span>
<span class="hljs-attr">      navigationOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        tabBarVisible:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        title:</span> <span class="hljs-string">&apos;&#x673A;&#x578B;&apos;</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    User:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      screen:</span> <span class="hljs-string">User,</span>
<span class="hljs-attr">      navigationOptions:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        title:</span> <span class="hljs-string">&apos;&#x6211;&#x7684;&apos;</span>
      <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">)</span></code></pre><p>&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x521B;&#x5EFA;&#x4E86;&#x5305;&#x542B;3&#x4E2A;tab&#x7684;&#x5E95;&#x90E8;&#x5BFC;&#x822A;&#xFF0C;&#x5176;&#x4E2D;<code>phone</code>&#x7684;header&#x662F;&#x5B9A;&#x5236;&#x7684;&#x3002;&#x63A5;&#x4E0B;&#x53BB;&#x6211;&#x4EEC;&#x8981;&#x505A;&#x7684;&#x662F;&#x914D;&#x7F6E;&#x5728;<code>appNavigator</code>&#x4E2D;&#x914D;&#x7F6E;<code>TabNavigator</code>&#x7684;<code>navigation</code>&#x5C5E;&#x6027;&#xFF0C;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x8DEF;&#x7531;&#x4F7F;&#x7528;&#x4E0D;&#x540C;&#x7684;header(&#x5373;&#x5F53;&#x5904;&#x5728;home&#x9875;&#x6216;&#x662F;user&#x9875;&#x65F6;&#x5019;&#xFF0C;&#x4F7F;&#x7528;&#x9ED8;&#x8BA4;&#x7684;header&#xFF0C;&#x5F53;&#x5904;&#x5728;phone&#x9875;&#x9762;&#x65F6;&#xFF0C;<em>&#x79FB;&#x9664;header</em>&#x3002;</p><p>&#x4E3A;&#x4EC0;&#x4E48;&#x662F;&#x79FB;&#x9664;header?</p><p>&#x56E0;&#x4E3A;phone&#x9875;&#x9762;&#x5DF2;&#x7ECF;&#x81EA;&#x5B9A;&#x4E49;&#x4E86;header&#xFF0C;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x79FB;&#x9664;&#x5916;&#x5C42;TabNavigator&#x7684;header&#x5373;&#x53EF;&#x3002;&#x5982;&#x679C;&#x4E0D;&#x7136;&#xFF0C;&#x4F1A;&#x6709;2&#x4E2A;header&#xFF08;TabNavigator&#x548C;phone2&#x4E2A;header&#xFF09;&#x3002;&#x8FD9;&#x4E2A;&#x4E0A;&#x9762;&#x5DF2;&#x7ECF;&#x63D0;&#x5230;&#x3002;&#x53E6;&#x5916;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5C06;&#x5B9A;&#x5236;&#x7684;header&#x914D;&#x7F6E;&#x5728;<code>appNavigator</code>&#x4E2D;<code>TabNavigator</code>&#x7684;<code>navigation</code>&#x5C5E;&#x6027;&#x91CC;&#x3002;&#xFF08;&#x672A;&#x9A8C;&#x8BC1;&#xFF0C;&#x53EF;&#x81EA;&#x884C;&#x5C1D;&#x8BD5;&#x3002;&#xFF09;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) =&gt; {
        const titleMap = {
          Home: &apos;&#x9996;&#x9875;&apos;,
          User: &apos;&#x6211;&#x7684;&apos;
        }
        // &#x6839;&#x636E;&#x8DEF;&#x7531;&#x7684;&#x987A;&#x5E8F;&#x4EE5;&#x53CA;&#x8DEF;&#x7531;&#x540D;&#x5B9A;&#x4E49;title
        const result = {
          title: titleMap[navigation.state.routes[navigation.state.index].routeName],
          headerTitleStyle: {
            fontWeight: &apos;600&apos;,
            color: color.gray_1,
            fontSize: px2p(18)
          },
          headerBackTitle: null
        }
        // &#x5728;&#x914D;&#x7F6E;TabNavigator&#x65F6;&#xFF0C;phone&#x9875;&#x9762;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;(zero-indexed)&#x3002;
        // &#x6240;&#x4EE5;&#x5F53;index&#x4E3A;1&#x7684;&#x65F6;&#xFF0C;header&#x8BBE;&#x4E3A;null
        // &#x6216;&#x8005;&#x5C06;header&#x8BBE;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;header&#xFF0C;&#x5BF9;&#x5E94;&#x4FEE;&#x6539;TabNavigator&#x4E2D;phone&#x3002;
        if (navigation.state.index === 1) { 
          result.header = null
          result.headerTransparent = true
        }
        return result
      }
    },
    ...pages // &#x5176;&#x4ED6;&#x9875;&#x9762;
  },
  {
    initialRouteName: &apos;Main&apos;
  }
)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> AppNavigator = createStackNavigator(
  {
    <span class="hljs-attr">Main</span>: {
      <span class="hljs-attr">screen</span>: TabNavigator,
      <span class="hljs-attr">navigationOptions</span>: <span class="hljs-function">(<span class="hljs-params">{ navigation }</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> titleMap = {
          <span class="hljs-attr">Home</span>: <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span>,
          <span class="hljs-attr">User</span>: <span class="hljs-string">&apos;&#x6211;&#x7684;&apos;</span>
        }
        <span class="hljs-comment">// &#x6839;&#x636E;&#x8DEF;&#x7531;&#x7684;&#x987A;&#x5E8F;&#x4EE5;&#x53CA;&#x8DEF;&#x7531;&#x540D;&#x5B9A;&#x4E49;title</span>
        <span class="hljs-keyword">const</span> result = {
          <span class="hljs-attr">title</span>: titleMap[navigation.state.routes[navigation.state.index].routeName],
          <span class="hljs-attr">headerTitleStyle</span>: {
            <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">&apos;600&apos;</span>,
            <span class="hljs-attr">color</span>: color.gray_1,
            <span class="hljs-attr">fontSize</span>: px2p(<span class="hljs-number">18</span>)
          },
          <span class="hljs-attr">headerBackTitle</span>: <span class="hljs-literal">null</span>
        }
        <span class="hljs-comment">// &#x5728;&#x914D;&#x7F6E;TabNavigator&#x65F6;&#xFF0C;phone&#x9875;&#x9762;&#x662F;&#x7B2C;&#x4E00;&#x4E2A;&#x5B9A;&#x4E49;&#x7684;(zero-indexed)&#x3002;</span>
        <span class="hljs-comment">// &#x6240;&#x4EE5;&#x5F53;index&#x4E3A;1&#x7684;&#x65F6;&#xFF0C;header&#x8BBE;&#x4E3A;null</span>
        <span class="hljs-comment">// &#x6216;&#x8005;&#x5C06;header&#x8BBE;&#x4E3A;&#x81EA;&#x5B9A;&#x4E49;header&#xFF0C;&#x5BF9;&#x5E94;&#x4FEE;&#x6539;TabNavigator&#x4E2D;phone&#x3002;</span>
        <span class="hljs-keyword">if</span> (navigation.state.index === <span class="hljs-number">1</span>) { 
          result.header = <span class="hljs-literal">null</span>
          result.headerTransparent = <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">return</span> result
      }
    },
    ...pages <span class="hljs-comment">// &#x5176;&#x4ED6;&#x9875;&#x9762;</span>
  },
  {
    <span class="hljs-attr">initialRouteName</span>: <span class="hljs-string">&apos;Main&apos;</span>
  }
)</code></pre><h2 id="articleHeader7">END</h2><p>&#x81F3;&#x6B64;&#xFF0C;&#x8FD9;&#x7BC7;&#x6C34;&#x6587;&#x4E5F;&#x5199;&#x7684;&#x5DEE;&#x4E0D;&#x591A;&#x4E86;&#x3002;</p><p>&#x4E0B;&#x7BC7;&#x6587;&#x7AE0;&#xFF08;&#x5982;&#x679C;&#x6709;&#xFF09;&#x6211;&#x4F1A;&#x5199;&#x4E00;&#x4E0B;&#x5173;&#x4E8E;&#x81EA;&#x5B9A;&#x4E49;header&#x7684;&#x90E8;&#x5206;&#x3002;</p><p>&#x4E3B;&#x8981;&#x662F;headerRight&#x90E8;&#x5206;&#xFF0C;&#x6BD4;&#x5982;&#x6DD8;&#x5B9D;&#x4EAC;&#x4E1C;&#x7684;&#x5546;&#x54C1;&#x8BE6;&#x60C5;&#x9875;&#x53F3;&#x4E0A;&#x89D2;&#x4F1A;&#x6709;&#x4E2A;&#x6309;&#x94AE;&#xFF0C;&#x70B9;&#x51FB;&#x5F39;&#x51FA;&#x83DC;&#x5355;&#x680F;&#x3002;</p><p><em>Thanks for reading~</em></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-navigation使用小记

## 原文链接
[https://segmentfault.com/a/1190000015721918](https://segmentfault.com/a/1190000015721918)

