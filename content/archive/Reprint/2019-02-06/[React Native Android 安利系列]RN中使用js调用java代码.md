---
title: '[React Native Android 安利系列]RN中使用js调用java代码' 
date: 2019-02-06 2:30:08
hidden: true
slug: mtccujmdz8f
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎大家收看react-native-android系列教程，跟着本系列教程学习，可以熟练掌握react-native-android的开发，你值得拥有：</p>
<p><a href="https://segmentfault.com/blog/frontenddriver">https://segmentfault.com/blog...</a></p>
<p>书接上节，我们上节说道，如何控制原生android的activity间跳转，这次，我们试着用js去操控这个过程。</p>
<h2 id="articleHeader0">1. 为你的应用添加一个js可调用的java接口</h2>
<p>既然要使用js去调用java，那我们的第一步，当然是提供一个js可以调用的java接口了。</p>
<h3 id="articleHeader1">1.1&nbsp;提供一个跳转的函数</h3>
<p>首先，照着上节的思路，我们将activity之间的跳转，封装成一个函数，放在MainActivity里面。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public class MainActivity extends ReactActivity {

    public void skip() {
        Intent intent = new Intent(this, DetailActivity.class);
        startActivity(intent);
    }
....
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MainActivity</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ReactActivity</span> </span>{

    public void skip() {
        <span class="hljs-type">Intent</span> intent = <span class="hljs-keyword">new</span> <span class="hljs-type">Intent</span>(<span class="hljs-keyword">this</span>, <span class="hljs-type">DetailActivity</span>.<span class="hljs-keyword">class</span>);
        startActivity(intent);
    }
....
}</code></pre>
<h3 id="articleHeader2">1.2 新建一个类，来存放我们需要被调用的java代码</h3>
<p>紧接着我们需要新建一个类(MyExtension)继承自ReactContextBaseJavaModule这个抽象类，之后我们新建的这个类，可以承载我们暴露给js的方法。让我们动手开始写这个类吧。</p>
<h4>1.2.1 新建一个包---extension，如图1.2.1</h4>
<p><span class="img-wrap"><img data-src="/img/bVz8NB" src="https://static.alili.tech/img/bVz8NB" alt="110823_v6iz_1177792.png" title="110823_v6iz_1177792.png" style="cursor: pointer; display: inline;"></span><br>图1.2.1</p>
<h4>1.2.2 在包下，新建一个类---MyExtension，如图1.2.2</h4>
<p><span class="img-wrap"><img data-src="/img/bVz8NC" src="https://static.alili.tech/img/bVz8NC" alt="111032_lTl5_1177792.png" title="111032_lTl5_1177792.png" style="cursor: pointer; display: inline;"></span><br>图1.2.2</p>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.hellowreact.extension;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hellowreact.DetailActivity;
import com.hellowreact.MainActivity;

/**
 * Created by baidu on 16/6/12.
 */
public class MyExtension extends ReactContextBaseJavaModule {
    public MyExtension(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void open() {
        MainActivity activity = (MainActivity) getCurrentActivity();
        activity.skip();
    }

    @Override
    public String getName() {
        return &quot;MyExtension&quot;;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">package</span> com.hellowreact.extension;

<span class="hljs-keyword">import</span> android.content.<span class="hljs-type">Intent</span>;

<span class="hljs-keyword">import</span> com.facebook.react.bridge.<span class="hljs-type">ReactApplicationContext</span>;
<span class="hljs-keyword">import</span> com.facebook.react.bridge.<span class="hljs-type">ReactContextBaseJavaModule</span>;
<span class="hljs-keyword">import</span> com.facebook.react.bridge.<span class="hljs-type">ReactMethod</span>;
<span class="hljs-keyword">import</span> com.hellowreact.<span class="hljs-type">DetailActivity</span>;
<span class="hljs-keyword">import</span> com.hellowreact.<span class="hljs-type">MainActivity</span>;

<span class="hljs-comment">/**
 * Created by baidu on 16/6/12.
 */</span>
public <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyExtension</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">ReactContextBaseJavaModule</span> </span>{
    public <span class="hljs-type">MyExtension</span>(<span class="hljs-type">ReactApplicationContext</span> reactContext) {
        <span class="hljs-keyword">super</span>(reactContext);
    }

    <span class="hljs-meta">@ReactMethod</span>
    public void open() {
        <span class="hljs-type">MainActivity</span> activity = (<span class="hljs-type">MainActivity</span>) getCurrentActivity();
        activity.skip();
    }

    <span class="hljs-meta">@Override</span>
    public <span class="hljs-type">String</span> getName() {
        <span class="hljs-keyword">return</span> <span class="hljs-string">"MyExtension"</span>;
    }
}</code></pre>
<p>这里有几个事项，注意一下：</p>
<p><strong>1. 我们继承自ReactContextBaseJavaModule这个抽象类</strong>。</p>
<p><strong>2. 我们需要重写getName方法，命名一下我们的扩展。以后我们可以在js里面按照名字找到这个扩展。</strong></p>
<p><strong>3. 我们写了一个open方法，这个方法是未来会导出到我们的js中，并可以被js调用的方法。</strong></p>
<h3 id="articleHeader3">1.3 书写注册接口待用</h3>
<p>我们写好了方法，接着我们就要注册了，我们还在extension的包里面，新建一个类(ExtensionPackage)，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="package com.hellowreact.extension;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by baidu on 16/6/12.
 */
public class ExtensionPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new MyExtension(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-keyword">package</span> com.hellowreact.extension;

<span class="hljs-keyword">import</span> com.facebook.react.ReactPackage;
<span class="hljs-keyword">import</span> com.facebook.react.bridge.JavaScriptModule;
<span class="hljs-keyword">import</span> com.facebook.react.bridge.NativeModule;
<span class="hljs-keyword">import</span> com.facebook.react.bridge.ReactApplicationContext;
<span class="hljs-keyword">import</span> com.facebook.react.uimanager.ViewManager;

<span class="hljs-keyword">import</span> java.util.ArrayList;
<span class="hljs-keyword">import</span> java.util.Collections;
<span class="hljs-keyword">import</span> java.util.List;

<span class="hljs-comment">/**
 * Created by baidu on 16/6/12.
 */</span>
<span class="hljs-keyword">public</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ExtensionPackage</span> <span class="hljs-keyword">implements</span> <span class="hljs-title">ReactPackage</span> </span>{
    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> List&lt;NativeModule&gt; createNativeModules(ReactApplicationContext reactContext) {
        List&lt;NativeModule&gt; modules = <span class="hljs-keyword">new</span> ArrayList&lt;&gt;();
        modules.add(<span class="hljs-keyword">new</span> MyExtension(reactContext));
        <span class="hljs-keyword">return</span> modules;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> List&lt;Class&lt;? <span class="hljs-keyword">extends</span> JavaScriptModule&gt;&gt; createJSModules() {
        <span class="hljs-function"><span class="hljs-keyword">return</span> Collections.<span class="hljs-title">emptyList</span><span class="hljs-params">()</span></span>;
    }

    <span class="hljs-meta">@Override</span>
    <span class="hljs-keyword">public</span> List&lt;ViewManager&gt; createViewManagers(ReactApplicationContext reactContext) {
        <span class="hljs-function"><span class="hljs-keyword">return</span> Collections.<span class="hljs-title">emptyList</span><span class="hljs-params">()</span></span>;
    }
}</code></pre>
<p>此时，我们的目录结构看起来应该是这样的，如图1.3.1<br><span class="img-wrap"><img data-src="/img/bVz8NG" src="https://static.alili.tech/img/bVz8NG" alt="111430_ggmk_1177792.png" title="111430_ggmk_1177792.png" style="cursor: pointer; display: inline;"></span><br>图1.3.1</p>
<h3 id="articleHeader4">1.4 将写好的接口注册到MainActivity中去</h3>
<p>接着，我们要在MainActivity中去注册我们写好的这个接口。<br>打开我们的MainActivity，其中有一个已经写好的方法 ---&nbsp;getPackages，如图1.4.1<br><span class="img-wrap"><img data-src="/img/bVz8NH" src="https://static.alili.tech/img/bVz8NH" alt="111639_MrBw_1177792.png" title="111639_MrBw_1177792.png" style="cursor: pointer;"></span><br>图1.4.1<br>我们在其中，加入我们写好的接口(ExtensionPackage)</p>
<h2 id="articleHeader5">2 重新运行app，并在js中查看接口是否已经存在与js中</h2>
<p>上述步骤完成之后，就意味着我们的接口已经导出了，接下来我们首先要验证一下。我们打开index.android.js并在require的模块中，增加一个NativeModules(如图2.1)<br><span class="img-wrap"><img data-src="/img/bVz8NK" src="https://static.alili.tech/img/bVz8NK" alt="111942_5pb0_1177792.png" title="111942_5pb0_1177792.png" style="cursor: pointer;"></span><br>图2.1</p>
<p>NativeModules中存放着我们可以调用的native模块，还记得当时定义我们的扩展时，起的名字是什么吗？<br><span class="img-wrap"><img data-src="/img/bVz8NL" src="https://static.alili.tech/img/bVz8NL" alt="112207_1Ffr_1177792.png" title="112207_1Ffr_1177792.png" style="cursor: pointer; display: inline;"></span><br>图2.2</p>
<p>对！就是"MyExtension"，既然已经注册好了，那么我们就在js中看看，是否已经有了呢？我们挑一个地方（本例中使用的是在constructor里）打印一下，看看是否已经有了呢(如图2.3)。<br><span class="img-wrap"><img data-src="/img/bVz8NP" src="https://static.alili.tech/img/bVz8NP" alt="112102_geIu_1177792.png" title="112102_geIu_1177792.png" style="cursor: pointer; display: inline;"></span><br>图2.3</p>
<p>我们使用debug js，在chrome中调起调试界面（如果还不会使用，我们接下来的章节里会详细讲解，跟着我看看变量即可，如图2.4）:<br><span class="img-wrap"><img data-src="/img/bVz8NR" src="https://static.alili.tech/img/bVz8NR" alt="112532_kLo8_1177792.png" title="112532_kLo8_1177792.png" style="cursor: pointer; display: inline;"></span><br>图2.4</p>
<p>可以看下图2.5，我们成功的看到了当时我们导出的open函数：<br><span class="img-wrap"><img data-src="/img/bVz8NS" src="https://static.alili.tech/img/bVz8NS" alt="112733_BcpG_1177792.png" title="112733_BcpG_1177792.png" style="cursor: pointer; display: inline;"></span><br>图2.5</p>
<p>good！！！</p>
<h2 id="articleHeader6">3 尝试调用我们导出的open方法</h2>
<p>上一步中，我们惊喜的看到我们在java中定义的open方法已经能在控制台看到了。接下来，我们在点击list的时候，去调用一下open方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class hellowReact extends Component {
  constructor(props) {
    console.log(NativeModules.MyExtension);
    super(props);
    var list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      list: list.cloneWithRows(['hello', 'react', 'this', 'is', 'my', 'listView'])
    };  
  }
  oneRow(oneItem) {
    return <Text>{oneItem}</Text>;
  }
  seeDetail() {
    NativeModules.MyExtension.open();
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.list}
          renderRow={this.oneRow}
          onTouchEnd={this.seeDetail}
        />  
      </View>
    );  
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">hellowReact</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-built_in">console</span>.log(NativeModules.MyExtension);
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">var</span> list = <span class="hljs-keyword">new</span> ListView.DataSource({<span class="hljs-attr">rowHasChanged</span>: <span class="hljs-function">(<span class="hljs-params">r1, r2</span>) =&gt;</span> r1 !== r2});
    <span class="hljs-keyword">this</span>.state = { 
      <span class="hljs-attr">list</span>: list.cloneWithRows([<span class="hljs-string">'hello'</span>, <span class="hljs-string">'react'</span>, <span class="hljs-string">'this'</span>, <span class="hljs-string">'is'</span>, <span class="hljs-string">'my'</span>, <span class="hljs-string">'listView'</span>])
    };  
  }
  oneRow(oneItem) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>{oneItem}<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span></span>;
  }
  seeDetail() {
    NativeModules.MyExtension.open();
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.container}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ListView</span>
          <span class="hljs-attr">dataSource</span>=<span class="hljs-string">{this.state.list}</span>
          <span class="hljs-attr">renderRow</span>=<span class="hljs-string">{this.oneRow}</span>
          <span class="hljs-attr">onTouchEnd</span>=<span class="hljs-string">{this.seeDetail}</span>
        /&gt;</span>  
      <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
    );  
  }
}</span></code></pre>
<p>接着，我们重新运行一下，效果如图3.1与图3.2<br><span class="img-wrap"><img data-src="/img/bVz8NV" src="https://static.alili.tech/img/bVz8NV" alt="114239_Yeqf_1177792.png" title="114239_Yeqf_1177792.png" style="cursor: pointer; display: inline;"></span><br>图3.1<br><span class="img-wrap"><img data-src="/img/bVz8NY" src="https://static.alili.tech/img/bVz8NY" alt="114304_ZQmn_1177792.png" title="114304_ZQmn_1177792.png" style="cursor: pointer; display: inline;"></span><br>图3.2</p>
<p>于是乎，我们看到了运行的效果。下一章，我们会一起看看react-native中，js调用原生代码的原理。</p>
<p>本文中所用的例子，可以在这里找到：</p>
<p><a href="https://github.com/houyu01/react-native-android-tutorial/tree/master/helloReactJsCall" rel="nofollow noreferrer" target="_blank">https://github.com/houyu01/re...</a></p>
<p>下一节，我们将一起讨论一下，上述调用的RN底层原理，非常浅显易懂，不要错过：</p>
<p>原创文章,版权所有,转载请注明出处</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[React Native Android 安利系列]RN中使用js调用java代码

## 原文链接
[https://segmentfault.com/a/1190000006191310](https://segmentfault.com/a/1190000006191310)

