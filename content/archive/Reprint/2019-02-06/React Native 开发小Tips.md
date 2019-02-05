---
title: 'React Native 开发小Tips' 
date: 2019-02-06 2:30:09
hidden: true
slug: 2ph59jt82fa
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVzxDW" src="https://static.alili.tech/img/bVzxDW" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>相信好多写React Native的都是前端出身，当然遇见问题的，也很多时候会想从前端出发，但由于React Native本身的限制，并不是支持足够多的属性和样式，所以Bo主结合自己的开发实践,并总结了一些将来开发可能会遇见的问题并给出一些小的代码参考;(PS实现不好的希望能大家提出看法，自己也会更新)。</p>
<p>自己将代码放到了<code>example</code>下，并且做成了一个App.这样可以查看具体运行效果：</p>
<p>截图1:</p>
<p><span class="img-wrap"><img data-src="/img/bVzxDy" src="https://static.alili.tech/img/bVzxDy" alt="vuedf40e6bef8963252bd7eaa81f689e5c56.jpg" title="vuedf40e6bef8963252bd7eaa81f689e5c56.jpg" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://github.com/JackPu/react-native-tips" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<h2 id="articleHeader0">开始</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/JackPu/react-native-tips.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">git <span class="hljs-built_in">clone</span> https://github.com/JackPu/react-native-tips.git</code></pre>
<p>进入example 目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="react-native start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">react-native start</code></pre>
<p>用xcode打开ios目录下的项目，运行就可以看到上面的运行界面了。</p>
<h3 id="articleHeader1">1.关于按钮</h3>
<p>写习惯了html我们看到按钮，第一时间想到的便是Button,但是目前React Native并没有这个组件，不过没关系，我们可以使用 <a>TouchableHighlight</a>,<a href="https://facebook.github.io/react-native/docs/touchableopacity.html" rel="nofollow noreferrer" target="_blank">TouchableOpacity</a>来实现按钮组件，当然常用的样式可以应用在上面，形成格式各样的按钮。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<TouchableHighlight onPress={this._onPressButton}>
      <Text>This is Button</Text>
</TouchableHighlight>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;TouchableHighlight onPress={<span class="hljs-keyword">this</span>._onPressButton}&gt;
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Text</span>&gt;</span>This is Button<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/TouchableHighlight&gt;</span></code></pre>
<p>如果你实在非常喜欢按钮的话，没关系，我们引入已经封装好的组件<code>react native button</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install react-native-button --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install react-native-button --save</code></pre>
<p>安装好后，你就可以大胆的这样写了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Button
    style={[Css.btn,Css.btnP]}
    styleDisabled="{{"color: 'red'"}}"
    onPress={() => this._handlePress()}>
    This is a button
  </Button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;Button
    style={[Css.btn,Css.btnP]}
    styleDisabled="{{"<span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>"}}"
    onPress={() =&gt; <span class="hljs-keyword">this</span>._handlePress()}&gt;
    This is a button
  &lt;<span class="hljs-regexp">/Button&gt;</span></code></pre>
<h3 id="articleHeader2">2.文字过长隐藏的问题</h3>
<p>CSS3中大家可能都会用到<code>text-oveflow</code>，然而RN 的Text并没有这个属性，不过我们可以通过设置<a href="https://facebook.github.io/react-native/docs/text.html#content" rel="nofollow noreferrer" target="_blank">numberOfLIne</a> 或者JS自动计算来实现:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Text numberOfLines={1}>your long text here<Text>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Text numberOfLines={<span class="hljs-number">1</span>}&gt;your long text here&lt;Text&gt;</code></pre>
<h3 id="articleHeader3">3.关于百分比宽度</h3>
<p>写样式的时候有的时候我们经常会用到百分比，然而React Native并不支持这样的单位，除了用Flex布局外，我们可以通过另外一个方式获得:<code>Dimensions</code>。当然由于都是<code>JS</code>因此我们可以取巧，用JS计算下，比如30%,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var React = require('react-native');

var {Dimensions,StyleSheet,Component} = React;
// 我们可以使用Dimensions 去获取窗口宽度
var fullWidth = Dimensions.get('window').width; 

let thirtyPercentiWidth = fullWidth * 0.3;

// Your stylesheet
var styles = StyleSheet.create({
    .wrap{
        width: thirtyPercentiWidth,
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-keyword">var</span> React = require(<span class="hljs-string">'react-native'</span>);

<span class="hljs-keyword">var</span> {Dimensions,StyleSheet,Component} = React;
<span class="hljs-comment">// 我们可以使用Dimensions 去获取窗口宽度</span>
<span class="hljs-keyword">var</span> fullWidth = Dimensions.<span class="hljs-keyword">get</span>(<span class="hljs-string">'window'</span>).width; 

<span class="hljs-keyword">let</span> thirtyPercentiWidth = fullWidth * <span class="hljs-number">0.3</span>;

<span class="hljs-comment">// Your stylesheet</span>
<span class="hljs-keyword">var</span> styles = StyleSheet.create({
    .wrap{
        width: thirtyPercentiWidth,
    }
});</code></pre>
<h3 id="articleHeader4">4.Grid列表</h3>
<p>在App中的常用的列表除了水平列表外，我们还需要栅格化的列表。比如类似于下面这样：</p>
<p><span class="img-wrap"><img data-src="/img/bVzxDO" src="https://static.alili.tech/img/bVzxDO" alt="vuedcfb38c068d0c35a44b4bbc8a37ebeb10.png" title="vuedcfb38c068d0c35a44b4bbc8a37ebeb10.png" style="cursor: pointer;"></span></p>
<p>做出类似的界面其实只要限制住你每一个小方块的宽度就行了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var styles = StyleSheet.create({
  list: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 5,
    width: (Dimensions.get('window').width - 30) / 3,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  thumb: {
    width: 55,
    height: 55
  },
  text: {
    flex: 1,
    marginTop: 10,
  }

});

// render row

 <TouchableHighlight onPress={() => this._pressRow(rowID,rowData)} underlayColor='rgba(0,0,0,0)'>
            <View>
              <View style={styles.row}>
                <Image style={styles.thumb} source="{{"uri: rowData['game_icon']"}}" />
                <Text numberOfLines={1} style={styles.text}>
                  {rowData['game_name']}
                </Text>
              </View>
            </View>
</TouchableHighlight>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> styles = StyleSheet.create({
  <span class="hljs-attr">list</span>: {
    <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'flex-start'</span>,
    <span class="hljs-attr">flexDirection</span>: <span class="hljs-string">'row'</span>,
    <span class="hljs-attr">flexWrap</span>: <span class="hljs-string">'wrap'</span>
  },
  <span class="hljs-attr">row</span>: {
    <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,
    <span class="hljs-attr">padding</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">margin</span>: <span class="hljs-number">5</span>,
    <span class="hljs-attr">width</span>: (Dimensions.get(<span class="hljs-string">'window'</span>).width - <span class="hljs-number">30</span>) / <span class="hljs-number">3</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#fff'</span>,
    <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'center'</span>,
  },
  <span class="hljs-attr">thumb</span>: {
    <span class="hljs-attr">width</span>: <span class="hljs-number">55</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">55</span>
  },
  <span class="hljs-attr">text</span>: {
    <span class="hljs-attr">flex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">marginTop</span>: <span class="hljs-number">10</span>,
  }

});

<span class="hljs-comment">// render row</span>

 &lt;TouchableHighlight onPress={() =&gt; <span class="hljs-keyword">this</span>._pressRow(rowID,rowData)} underlayColor=<span class="hljs-string">'rgba(0,0,0,0)'</span>&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.row}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Image</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.thumb}</span> <span class="hljs-attr">source</span>=<span class="hljs-string">"{{"uri:</span> <span class="hljs-attr">rowData</span>['<span class="hljs-attr">game_icon</span>']"}}" /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">numberOfLines</span>=<span class="hljs-string">{1}</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.text}</span>&gt;</span>
                  {rowData['game_name']}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
              <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">TouchableHighlight</span>&gt;</span></span></code></pre>
<p><a href="https://github.com/JackPu/react-native-tips/blob/master/example/pages/home.js" rel="nofollow noreferrer" target="_blank">详细代码</a></p>
<h3 id="articleHeader5">5.混合使用webview</h3>
<p>无论什么时候，作为一个前端er，在遇到比较棘手的问题时候，我们都可以回到原点，用一个网页去解决。因此无论如何都需要学会使用React Native webview。除此之外，部分页面，其实完全可以由网页去支持<strong>多端</strong>共用的功能，楼主亲身遇到过的场景，就是图表的绘制，我们的方案是一个页面，需要微信，手机网页，和android,ios都具备该功能，而且我们手机网页和客户端打开的稍微有区别，需要隐藏header。</p>
<p><span class="img-wrap"><img data-src="/img/bVzxDN" src="https://static.alili.tech/img/bVzxDN" alt="vuedc026487dfb0a62593d61ac2927fa727c.png" title="vuedc026487dfb0a62593d61ac2927fa727c.png" style="cursor: pointer; display: inline;"></span></p>
<p>上图是网页版本的，而我们通过设置页面的查询参数即来自客户端的请求或者微信的都会设置为类似这样的url</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://xxx.yoursites.com/page.html?hide_header=1&amp;client=ios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">https://xxx.yoursites.com/page.html?hide_header=1&amp;client=ios</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVzxDM" src="https://static.alili.tech/img/bVzxDM" alt="vueda93127c21932b45b981c0d785f7c284f.png" title="vueda93127c21932b45b981c0d785f7c284f.png" style="cursor: pointer; display: inline;"></span></p>
<p>而在React Native 设置webview 的代码也很简单，你可以查看这里<a href="https://github.com/JackPu/react-native-tips/blob/master/example/pages/web.js" rel="nofollow noreferrer" target="_blank">代码</a></p>
<h3 id="articleHeader6">6.设置网络请求Fetch</h3>
<p>由于客户端也需要大量接口的支持，因此我们一定避免单兵作战，需要请求时候用个<code>fetch</code>，这样其实非常不易控制数据的流入。建议在fetch上在封装一次，这样我们就可以做更多的事情，比如做统一的错误提示，用户失效控制，统一设置接口请求的header,同时可以方便我们进行调试，在chrome中查看具体的接口数据等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="send(url,options) {
        var isLogin = this.isLogin();
        
        var self = this;        
        var defaultOptions = {
            method: 'GET',
            error: function() {
                options.success({'errcode':501,'errstr':'系统繁忙,请稍候尝试'});
            },
            headers:{
                'Authorization': this.getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'App': 'vanthink-ios-app'
            },
            data:{
                // prevent ajax cache if not set 
                '_regq' : self.random()
            },
            dataType:'json',
            success: function(result) {}
        };
        
        var options = Object.assign({},defaultOptions,options);
        var httpMethod = options['method'].toLocaleUpperCase();
        var full_url = '';
        if(httpMethod === 'GET') {
            full_url = this.config.api +  url + '?' + this.serialize(options.data);
        }else{
            // handle some to 'POST'
            full_url = this.config.api +  url;
        }
        
        if(this.config.debug) {
            console.log('HTTP has finished %c' + httpMethod +  ':  %chttp://' + full_url,'color:red;','color:blue;');
        }
        options.url = full_url;
        
        
        var cb = options.success;
      
        // build body data 
        if(options['method'] != 'GET') {
            options.body = JSON.stringify(options.data);
        }
  
        // todo support for https
        return fetch('http://' + options.url,options)
               .then((response) =>  response.json())
               .then((res) => {      
                    self.config.debug &amp;&amp; console.log(res);
                    if(res.errcode == 101) {
                        return self.doLogin();
                    }

                    if(res.errcode != 0) {

                        self.handeErrcode(res);
                    }  
                    return cb(res,res.errcode==0);
                })
                .catch((error) => {
                  console.warn(error);
                });
    },
    
    
    handeErrcode: function(result) {
        // not login
        if(result.errcode == 123){
           // your code to do
            
            return false; 
        }
       
        return this.sendMessage(result.errstr);
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">send(url,options) {
        <span class="hljs-keyword">var</span> isLogin = <span class="hljs-keyword">this</span>.isLogin();
        
        <span class="hljs-keyword">var</span> self = <span class="hljs-keyword">this</span>;        
        <span class="hljs-keyword">var</span> defaultOptions = {
            <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                options.success({<span class="hljs-string">'errcode'</span>:<span class="hljs-number">501</span>,<span class="hljs-string">'errstr'</span>:<span class="hljs-string">'系统繁忙,请稍候尝试'</span>});
            },
            <span class="hljs-attr">headers</span>:{
                <span class="hljs-string">'Authorization'</span>: <span class="hljs-keyword">this</span>.getAccessToken(),
                <span class="hljs-string">'Accept'</span>: <span class="hljs-string">'application/json'</span>,
                <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/json'</span>,
                <span class="hljs-string">'App'</span>: <span class="hljs-string">'vanthink-ios-app'</span>
            },
            <span class="hljs-attr">data</span>:{
                <span class="hljs-comment">// prevent ajax cache if not set </span>
                <span class="hljs-string">'_regq'</span> : self.random()
            },
            <span class="hljs-attr">dataType</span>:<span class="hljs-string">'json'</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{}
        };
        
        <span class="hljs-keyword">var</span> options = <span class="hljs-built_in">Object</span>.assign({},defaultOptions,options);
        <span class="hljs-keyword">var</span> httpMethod = options[<span class="hljs-string">'method'</span>].toLocaleUpperCase();
        <span class="hljs-keyword">var</span> full_url = <span class="hljs-string">''</span>;
        <span class="hljs-keyword">if</span>(httpMethod === <span class="hljs-string">'GET'</span>) {
            full_url = <span class="hljs-keyword">this</span>.config.api +  url + <span class="hljs-string">'?'</span> + <span class="hljs-keyword">this</span>.serialize(options.data);
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// handle some to 'POST'</span>
            full_url = <span class="hljs-keyword">this</span>.config.api +  url;
        }
        
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.config.debug) {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'HTTP has finished %c'</span> + httpMethod +  <span class="hljs-string">':  %chttp://'</span> + full_url,<span class="hljs-string">'color:red;'</span>,<span class="hljs-string">'color:blue;'</span>);
        }
        options.url = full_url;
        
        
        <span class="hljs-keyword">var</span> cb = options.success;
      
        <span class="hljs-comment">// build body data </span>
        <span class="hljs-keyword">if</span>(options[<span class="hljs-string">'method'</span>] != <span class="hljs-string">'GET'</span>) {
            options.body = <span class="hljs-built_in">JSON</span>.stringify(options.data);
        }
  
        <span class="hljs-comment">// todo support for https</span>
        <span class="hljs-keyword">return</span> fetch(<span class="hljs-string">'http://'</span> + options.url,options)
               .then(<span class="hljs-function">(<span class="hljs-params">response</span>) =&gt;</span>  response.json())
               .then(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {      
                    self.config.debug &amp;&amp; <span class="hljs-built_in">console</span>.log(res);
                    <span class="hljs-keyword">if</span>(res.errcode == <span class="hljs-number">101</span>) {
                        <span class="hljs-keyword">return</span> self.doLogin();
                    }

                    <span class="hljs-keyword">if</span>(res.errcode != <span class="hljs-number">0</span>) {

                        self.handeErrcode(res);
                    }  
                    <span class="hljs-keyword">return</span> cb(res,res.errcode==<span class="hljs-number">0</span>);
                })
                .catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
                  <span class="hljs-built_in">console</span>.warn(error);
                });
    },
    
    
    <span class="hljs-attr">handeErrcode</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>) </span>{
        <span class="hljs-comment">// not login</span>
        <span class="hljs-keyword">if</span>(result.errcode == <span class="hljs-number">123</span>){
           <span class="hljs-comment">// your code to do</span>
            
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>; 
        }
       
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.sendMessage(result.errstr);
    },</code></pre>
<h3 id="articleHeader7">7.管理你的Icon</h3>
<p>在网页中我们经常可以看到非常多的小的icon，我们习惯性的用Css Sprite 和 Icon Font或者 Svg去解决这些问题。移步到客户端，同样，我们也有很多解决方案，但是有一点必须要明确，将icon放到同一个地方，方便管理。这里有很多第三方库选择：</p>
<ul>
<li><p><a href="https://github.com/corymsmith/react-native-icons" rel="nofollow noreferrer" target="_blank">react-native-icons</a></p></li>
<li><p><a href="https://github.com/oblador/react-native-vector-icons" rel="nofollow noreferrer" target="_blank">react-native-vector-icons</a></p></li>
</ul>
<p>如果自己写的话，可以写到一个组件中，通过设置一个基类，然后进行继承和导出。设置不同的图标思路大概如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { TouchableHighlight,View,Text, Image, StyleSheet, PropTypes } from 'react-native';

// 基本的样式
let styles = StyleSheet.create({
  icon: {
    width: 21,
    height: 21,
    marginTop: 4,
    marginRight: 15,
  }, 
});

class Icons extends React.Component { 
    constructor(props) {
        super(props);
        this.press = this.press.bind(this);
      }

      press() {
        if(typeof this.props.press == 'function') {
            this.props.press();
        }else{
            // TODO
        }
        
      }
      _renderIcon() {
        return (
            <Image source={require('../images/baseicon.png')} style={styles.icon} />
        );  
      }

      render() {
        return (
          <TouchableHighlight underlayColor=&quot;transparent&quot; onPress={this.press}>
            {this._renderIcon()}
          </TouchableHighlight>
        );
      }
    
}

// 继承
class CloseIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Delete-48.png')} style={styles.icon} />
        );  
      }
}
class SearchIcon extends Icons {
    _renderIcon() {
        return (
            <Image source={require('../images/Search-50.png')} style={styles.icon} />
        );  
      }
}

// 导出
module.exports = {
    CloseIcon,
    SearchIcon,    
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { TouchableHighlight,View,Text, Image, StyleSheet, PropTypes } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-native'</span>;

<span class="hljs-comment">// 基本的样式</span>
<span class="hljs-keyword">let</span> styles = StyleSheet.create({
  <span class="hljs-attr">icon</span>: {
    <span class="hljs-attr">width</span>: <span class="hljs-number">21</span>,
    <span class="hljs-attr">height</span>: <span class="hljs-number">21</span>,
    <span class="hljs-attr">marginTop</span>: <span class="hljs-number">4</span>,
    <span class="hljs-attr">marginRight</span>: <span class="hljs-number">15</span>,
  }, 
});

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Icons</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{ 
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.press = <span class="hljs-keyword">this</span>.press.bind(<span class="hljs-keyword">this</span>);
      }

      press() {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">this</span>.props.press == <span class="hljs-string">'function'</span>) {
            <span class="hljs-keyword">this</span>.props.press();
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-comment">// TODO</span>
        }
        
      }
      _renderIcon() {
        <span class="hljs-keyword">return</span> (
            &lt;Image source={require('../images/baseicon.png')} style={styles.icon} /&gt;
        );  
      }

      render() {
        return (
          &lt;TouchableHighlight underlayColor="transparent" onPress={this.press}&gt;
            {this._renderIcon()}
          &lt;/TouchableHighlight&gt;
        );
      }
    
}

// 继承
class CloseIcon extends Icons {
    _renderIcon() {
        return (
            &lt;Image source={require('../images/Delete-48.png')} style={styles.icon} /&gt;
        );  
      }
}
class SearchIcon extends Icons {
    _renderIcon() {
        return (
            &lt;Image source={require('../images/Search-50.png')} style={styles.icon} /&gt;
        );  
      }
}

// 导出
module.exports = {
    CloseIcon,
    SearchIcon,    
};</code></pre>
<p>而我们则可以在页面中这样使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {CloseIcon,SearchIcon} from '../style/icon';

...

render() {
    return(
        //... some code
        <CloseIcon></CloseIcon>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {CloseIcon,SearchIcon} <span class="hljs-keyword">from</span> <span class="hljs-string">'../style/icon'</span>;

...

render() {
    <span class="hljs-keyword">return</span>(
        <span class="hljs-comment">//... some code</span>
        &lt;CloseIcon&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">CloseIcon</span>&gt;</span></span>
    );
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVzxDL" src="https://static.alili.tech/img/bVzxDL" alt="vued9b724a613dd793d0e95400ff4e6884d7.png" title="vued9b724a613dd793d0e95400ff4e6884d7.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader8">8.构建一个导航条</h3>
<p>当然制作App中，我们经常会遇到制作导航条的要求,</p>
<p><span class="img-wrap"><img data-src="/img/bVzxDK" src="https://static.alili.tech/img/bVzxDK" alt="vued191da6d8d8d42ea7d69a8cf3c287cb3f.png" title="vued191da6d8d8d42ea7d69a8cf3c287cb3f.png" style="cursor: pointer; display: inline;"></span></p>
<p>大家可以使用<a href="https://github.com/react-native-community/react-native-navbar" rel="nofollow noreferrer" target="_blank">react-native-navbar</a>,自己写也非常简单，样式大致就这些:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    navBar: {
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor:'#fff'
    },
    customTitle: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 7,
        alignItems: 'center',
    },
    navBarButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    navBarButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarButtonText: {
        fontSize: 17,
        letterSpacing: 0.5,
    },
    navBarTitleContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 17,
        color: '#333',
        fontWeight: '500',
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    navBar: {
        <span class="hljs-attr">height</span>: <span class="hljs-number">44</span>,
        <span class="hljs-attr">flexDirection</span>: <span class="hljs-string">'row'</span>,
        <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'space-between'</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'stretch'</span>,
        <span class="hljs-attr">backgroundColor</span>:<span class="hljs-string">'#fff'</span>
    },
    <span class="hljs-attr">customTitle</span>: {
        <span class="hljs-attr">position</span>: <span class="hljs-string">'absolute'</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">right</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">bottom</span>: <span class="hljs-number">7</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'center'</span>,
    },
    <span class="hljs-attr">navBarButtonContainer</span>: {
        <span class="hljs-attr">flexDirection</span>: <span class="hljs-string">'row'</span>,
        <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'stretch'</span>,
    },
    <span class="hljs-attr">navBarButton</span>: {
        <span class="hljs-attr">flexDirection</span>: <span class="hljs-string">'row'</span>,
        <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'center'</span>,
    },
    <span class="hljs-attr">navBarButtonText</span>: {
        <span class="hljs-attr">fontSize</span>: <span class="hljs-number">17</span>,
        <span class="hljs-attr">letterSpacing</span>: <span class="hljs-number">0.5</span>,
    },
    <span class="hljs-attr">navBarTitleContainer</span>: {
        <span class="hljs-attr">position</span>: <span class="hljs-string">'absolute'</span>,
        <span class="hljs-attr">left</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">right</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">bottom</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">justifyContent</span>: <span class="hljs-string">'center'</span>,
        <span class="hljs-attr">alignItems</span>: <span class="hljs-string">'center'</span>,
    },
    <span class="hljs-attr">navBarTitleText</span>: {
        <span class="hljs-attr">fontSize</span>: <span class="hljs-number">17</span>,
        <span class="hljs-attr">color</span>: <span class="hljs-string">'#333'</span>,
        <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'500'</span>,
    }</code></pre>
<p>用法如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<View style={[styles.navBar,{backgroundColor: '#9b59b6'}]}>
    <View style={styles.navBarTitleContainer}>
        <Text style={[styles.navBarTitleText,{color: '#fff'}]}>NavBar3</Text>
    </View>

    <View style={[styles.navBarButtonContainer,{marginLeft:8}]}>
        <TouchableOpacity style={styles.navBarButton}>
            <View>
                <CloseIcon></CloseIcon>
            </View>
        </TouchableOpacity>
    </View>
    <View style={[styles.navBarButtonContainer,{marginRight:8}]}>
        <TouchableOpacity style={styles.navBarButton}>
            <View>
                <Text style={[styles.navBarButtonText,{color: '#fff'}]}>Done</Text>
            </View>
        </TouchableOpacity>
    </View>
</View>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;View style={[styles.navBar,{<span class="hljs-attr">backgroundColor</span>: <span class="hljs-string">'#9b59b6'</span>}]}&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">View</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.navBarTitleContainer}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Text</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{[styles.navBarTitleText,{color:</span> '#<span class="hljs-attr">fff</span>'}]}&gt;</span>NavBar3<span class="hljs-tag">&lt;/<span class="hljs-name">Text</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>

    &lt;View style={[styles.navBarButtonContainer,{<span class="hljs-attr">marginLeft</span>:<span class="hljs-number">8</span>}]}&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TouchableOpacity</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{styles.navBarButton}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">View</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">CloseIcon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">CloseIcon</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">TouchableOpacity</span>&gt;</span></span>
    &lt;<span class="hljs-regexp">/View&gt;
    &lt;View style={[styles.navBarButtonContainer,{marginRight:8}]}&gt;
        &lt;TouchableOpacity style={styles.navBarButton}&gt;
            &lt;View&gt;
                &lt;Text style={[styles.navBarButtonText,{color: '#fff'}]}&gt;Done&lt;/</span>Text&gt;
            <span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span>
        &lt;<span class="hljs-regexp">/TouchableOpacity&gt;
    &lt;/</span>View&gt;
<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">View</span>&gt;</span></span></code></pre>
<p><em>需要注意，如果设置顶部导航条，记得还有状态栏的高度要算进去，一般设置都为<code>22</code></em></p>
<h3 id="articleHeader9">9.结合 Redux</h3>
<p>想了想做个 App，有下面几个就可以了，界面不low, 数据支撑，用户响应即可。但是我们在做的时候Css和Html确实解决了Bo主不会写界面的问题，但是后面两个咋个办呢？于是乎官方推出了一个新的工具[Redux]()。<br>精炼一点就是Redux就是去去管理页面的状态（用户响应）及数据（接口数据相关）。Redux中强调了三点:</p>
<ul>
<li><p>单一数据源</p></li>
<li><p>State 是只读的</p></li>
<li><p>使用纯函数来执行修改</p></li>
</ul>
<p>而且Redux支持服务端，这样更加方便我们在进行异步的远程数据获取的实现。</p>
<p><a href="https://github.com/alinz/example-react-native-redux" rel="nofollow noreferrer" target="_blank">一个简单的使用Demo</a></p>
<h3 id="articleHeader10">10.合理的使用第三方插件</h3>
<p>尽管React Native 正式发布的时间还不算非常长，但是npm上已经拥有了大量的第三方类库，因此我们在遇到问题或者强调快速开发的时候我们可以去第三方网<a href="https://react.parts/native" rel="nofollow noreferrer" target="_blank">react.parts</a>站寻找更好的组件。自己觉得常用的一些如下：</p>
<ul>
<li><p><a href="https://github.com/umhan35/react-native-search-bar" rel="nofollow noreferrer" target="_blank">react-native-search-bar</a><br>一款带有常用搜索框的组件</p></li>
<li><p><a href="https://github.com/jsdf/react-native-refreshable-listview" rel="nofollow noreferrer" target="_blank">react-native-refreshable-listview</a> 一款带有刷新列表组件</p></li>
<li><p><a href="https://github.com/react-native-simple-router-community/react-native-simple-router" rel="nofollow noreferrer" target="_blank">react-native-simple-router</a></p></li>
<li><p><a href="https://github.com/brentvatne/react-native-video" rel="nofollow noreferrer" target="_blank">react-native-video</a></p></li>
<li><p><a href="https://github.com/Qwikly/react-native-router-redux" rel="nofollow noreferrer" target="_blank">react-native-router-redux</a> 一款路由和redux结合的插件，组件比较丰富</p></li>
<li><p><a href="https://github.com/marcshilling/react-native-image-picker#usage" rel="nofollow noreferrer" target="_blank">react-native-image-picker</a> 一款选择图片的插件</p></li>
<li><p><a href="https://www.npmjs.com/package/autobind-decorator" rel="nofollow noreferrer" target="_blank">autobind-decorator</a> 省去每次都要声明<code>eventHandle.bind(this)</code></p></li>
</ul>
<h3 id="articleHeader11">11.调试</h3>
<p>除了开发外，我们还希望能够很好的调试我们的App.默认的话，就像我们调试我们的web页面一样，我们可以用常用的<code>console.log</code>,<code>console.error</code>,<code>console.warn</code>，由于支持chrome调试，我们可以在控制台看到打印的数据。当然，我们也可以真机调试，比如连上你的iPhone,需要注意的是:</p>
<blockquote><p>你需要修改调试js的地址，在<code>AppDelegate.m</code>中将"localhost"改成你电脑的ip就可以了。</p></blockquote>
<p>选中你的iPhone就可以调试了。<br><span class="img-wrap"><img data-src="http://img1.vued.vanthink.cn/vued0b4083c14ced5cf04fbcefe13bb59238.png" src="https://static.alili.techhttp://img1.vued.vanthink.cn/vued0b4083c14ced5cf04fbcefe13bb59238.png" &gt;'="" style="cursor: pointer; display: inline;"></span></p>
<p>当然我会持续更新，也欢迎大家pr，<a href="https://github.com/JackPu/react-native-tips" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<p><span class="img-wrap"><img data-src="/img/bVzxDI" src="https://static.alili.tech/img/bVzxDI" alt="vuedf40e6bef8963252bd7eaa81f689e5c56.jpg" title="vuedf40e6bef8963252bd7eaa81f689e5c56.jpg" style="cursor: pointer; display: inline;"></span><br>最后安利一个ppt <a href="https://yunpan.cn/cqKEvrPXAS3gy" rel="nofollow noreferrer" target="_blank">https://yunpan.cn/cqKEvrPXAS3gy</a> （提取码：0375）</p>
<hr>
<p>同步博客地址：<a href="http://www.jackpu.com/react-native-kai-fa-xiao-tips/" rel="nofollow noreferrer" target="_blank">http://www.jackpu.com/react-n...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native 开发小Tips

## 原文链接
[https://segmentfault.com/a/1190000006048459](https://segmentfault.com/a/1190000006048459)

