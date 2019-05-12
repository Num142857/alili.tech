---
title: '微信小程序picker组件遇到的问题与解决方案' 
date: 2019-01-12 2:30:24
hidden: true
slug: sc0nc5b209p
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、picker基本概念</h2>
<p>当然先看官方文档 <a href="https://mp.weixin.qq.com/debug/wxadoc/dev/component/picker.html" rel="nofollow noreferrer" target="_blank">picker</a>说明搞清楚基本概念<br>“从底部弹起的滚动选择器，现支持三种选择器，通过mode来区分，分别是普通选择器，时间选择器，日期选择器，默认是普通选择器。”<br>几个主要属性：<br><strong>range：</strong> 选取范围，数据类型为Array / Object Array，mode为 普通选择器 时，range 有效；<br><strong>value：</strong> value 的值表示选择了 range 中的第几个（下标从 0 开始），数据类型肯定是Number；<br><strong>bindchange：</strong> 绑定事件，value 改变时触发 change 事件，event.detail = {value: value}。</p>
<h2 id="articleHeader1">二、遇到问题</h2>
<p>今天在同一个页面使用多个普通选择器遇到了问题，选择一个选项，其他选项也跟随着改变了.<br>代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//picker.wxml：   
<view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项一</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange1&quot; value=&quot;"{{"index"}}"&quot; range=&quot;"{{"option1"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option1[index]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>
    <view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项二</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange1&quot; value=&quot;"{{"index"}}"&quot; range=&quot;"{{"option2"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option2[index]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>
    <view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项三</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange1&quot; value=&quot;"{{"index"}}"&quot; range=&quot;"{{"option3"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option3[index]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>

//picker.js
    Page({
    data: {
        index:0,//设置索引值默认为0
        option1: ['1', '2', '3','4','5'],
        option2: ['一', '二', '三','四','五'],
        option3: ['①', '②', '③','④','⑤'],
    },
    bindchange1:function (e) {
       // console.log('picker发送选择改变，携带值为', e.detail.value)
       // 设置这个携带值赋值给索引值index
       // 所以option1 ,option2 ,option3的索引值都是一样的
        this.setData({
            index: e.detail.value
        })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//picker.wxml：   </span>
&lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项一&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange1"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index"}}""</span> range=<span class="hljs-string">""{{"option1"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option1[index]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;
    &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项二&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange1"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index"}}""</span> range=<span class="hljs-string">""{{"option2"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option2[index]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;
    &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项三&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange1"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index"}}""</span> range=<span class="hljs-string">""{{"option3"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option3[index]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;

<span class="hljs-comment">//picker.js</span>
    Page({
    data: {
        index:<span class="hljs-number">0</span>,<span class="hljs-comment">//设置索引值默认为0</span>
        option1: [<span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-string">'3'</span>,<span class="hljs-string">'4'</span>,<span class="hljs-string">'5'</span>],
        option2: [<span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>,<span class="hljs-string">'四'</span>,<span class="hljs-string">'五'</span>],
        option3: [<span class="hljs-string">'①'</span>, <span class="hljs-string">'②'</span>, <span class="hljs-string">'③'</span>,<span class="hljs-string">'④'</span>,<span class="hljs-string">'⑤'</span>],
    },
    bindchange1:function (e) {
       <span class="hljs-comment">// console.log('picker发送选择改变，携带值为', e.detail.value)</span>
       <span class="hljs-comment">// 设置这个携带值赋值给索引值index</span>
       <span class="hljs-comment">// 所以option1 ,option2 ,option3的索引值都是一样的</span>
        <span class="hljs-keyword">this</span>.setData({
            index: e.detail.<span class="hljs-keyword">value</span>
        })
    }
})</code></pre>
<p>因为默认索引值（也叫“下标”）都是index，绑定事件也只是改变了index。所以改变一个选项，其他选项都跟着改变了。</p>
<h2 id="articleHeader2">三、怎么解决呢？</h2>
<p><strong>首先想到的是给三个选项自定义不同的索引值index1,index2,index3，分别绑定不同的事件bindchange1，bindchange2，bindchange3改变其对应的索引值，互不干扰。</strong><br>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//picker.wxml： 
 <view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项一</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange1&quot; value=&quot;"{{"index1"}}"&quot; range=&quot;"{{"option1"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option1[index1]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>
    <view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项二</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange2&quot; value=&quot;"{{"index2"}}"&quot; range=&quot;"{{"option2"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option2[index2]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>
    <view class=&quot;column_list&quot; >
        <text class=&quot;font15&quot;>选项三</text>
        <picker class=&quot;inputText&quot; bindchange=&quot;bindchange3&quot; value=&quot;"{{"index3"}}"&quot; range=&quot;"{{"option3"}}"&quot;>
            <view class=&quot;select_picker&quot;>
                "{{"option3[index3]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>
    // picker.js
    Page({
    data: {
        index1:0,
        index2:0,
        index3:0,
        option1: ['1', '2', '3','4','5'],
        option2: ['一', '二', '三','四','五'],
        option3: ['①', '②', '③','④','⑤'],
    },
    bindchange1:function (e) {
        this.setData({
            index1: e.detail.value
        })
    },
    bindchange2:function (e) {
        this.setData({
            index2: e.detail.value
        })
    },
    bindchange3:function (e) {
        this.setData({
            index3: e.detail.value
        })
    }

})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//picker.wxml： </span>
 &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项一&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange1"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index1"}}""</span> range=<span class="hljs-string">""{{"option1"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option1[index1]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;
    &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项二&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange2"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index2"}}""</span> range=<span class="hljs-string">""{{"option2"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option2[index2]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;
    &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"column_list"</span> &gt;
        &lt;text <span class="hljs-keyword">class</span>=<span class="hljs-string">"font15"</span>&gt;选项三&lt;/text&gt;
        &lt;picker <span class="hljs-keyword">class</span>=<span class="hljs-string">"inputText"</span> bindchange=<span class="hljs-string">"bindchange3"</span> <span class="hljs-keyword">value</span>=<span class="hljs-string">""{{"index3"}}""</span> range=<span class="hljs-string">""{{"option3"}}""</span>&gt;
            &lt;view <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_picker"</span>&gt;
                "{{"option3[index3]"}}"
                &lt;image  mode=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-keyword">class</span>=<span class="hljs-string">"select_arrow"</span> src=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;&lt;/image&gt;
            &lt;/view&gt;
        &lt;/picker&gt;
    &lt;/view&gt;
    <span class="hljs-comment">// picker.js</span>
    Page({
    data: {
        index1:<span class="hljs-number">0</span>,
        index2:<span class="hljs-number">0</span>,
        index3:<span class="hljs-number">0</span>,
        option1: [<span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-string">'3'</span>,<span class="hljs-string">'4'</span>,<span class="hljs-string">'5'</span>],
        option2: [<span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>,<span class="hljs-string">'四'</span>,<span class="hljs-string">'五'</span>],
        option3: [<span class="hljs-string">'①'</span>, <span class="hljs-string">'②'</span>, <span class="hljs-string">'③'</span>,<span class="hljs-string">'④'</span>,<span class="hljs-string">'⑤'</span>],
    },
    bindchange1:function (e) {
        <span class="hljs-keyword">this</span>.setData({
            index1: e.detail.<span class="hljs-keyword">value</span>
        })
    },
    bindchange2:function (e) {
        <span class="hljs-keyword">this</span>.setData({
            index2: e.detail.<span class="hljs-keyword">value</span>
        })
    },
    bindchange3:function (e) {
        <span class="hljs-keyword">this</span>.setData({
            index3: e.detail.<span class="hljs-keyword">value</span>
        })
    }

})</code></pre>
<p>这样，一个页面使用多个picker的问题就解决了。但在发现小一个问题。<br>搜索到<a href="https://segmentfault.com/u/jiong_59250fe2e6dd3">jiong</a>也提出了这个问题：<br>“为什么多个picker会出现相互影响的问题？比如在第一个选择器选择了3，剩下的选择器点进去默认都是从第3个开始？”<br>小程序开发工具（PC端）中的确存在，也没有好的解决办法。<br><code>但是，我用手机亲测不存在这个问题。新版小程序开发工具已经修复此Bug</code></p>
<h2 id="articleHeader3">四、延伸思考</h2>
<p>在这里我多次使用了picker，于是我想到了使用循环 <strong>wx:for</strong>，（以后如果还要用可以做成一个模板）<br>那么数据就要修改为对象的数组（Object Array） ，我理解为json格式（不知道对不对）</p>
<h3 id="articleHeader4">picker.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// picker.js
Page({
    data: {
    //每个对象就是一个选择器，有自己的索引值index，标题title，选项option（又是一个数组）
        objArray:[
            {
                index:0,
                title:'选项一',
                option: ['1', '2', '3','4','5'],
            },
            {
                index:0,
                title:'选项二',
                option: ['一', '二', '三','四','五'],
            },
            {
                index:0,
                title:'选项三',
                option: ['①', '②', '③','④','⑤']
            },
        ]
    },
    // 绑定事件，因为不能用this.setData直接设置每个对象的索引值index。
    // 所以用自定义属性current来标记每个数组对象的下标
    bindChange_select: function(ev) {
    // 定义一个变量curindex 储存触发事件的数组对象的下标
        const curindex = ev.target.dataset.current
    // 根据下标 改变该数组对象中的index值
        this.data.objArray[curindex].index = ev.detail.value
    // 把改变某个数组对象index值之后的全新objArray重新 赋值给objArray
        this.setData({
            objArray: this.data.objArray
        })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// picker.js</span>
Page({
    data: {
    <span class="hljs-comment">//每个对象就是一个选择器，有自己的索引值index，标题title，选项option（又是一个数组）</span>
        objArray:[
            {
                index:<span class="hljs-number">0</span>,
                title:<span class="hljs-string">'选项一'</span>,
                option: [<span class="hljs-string">'1'</span>, <span class="hljs-string">'2'</span>, <span class="hljs-string">'3'</span>,<span class="hljs-string">'4'</span>,<span class="hljs-string">'5'</span>],
            },
            {
                index:<span class="hljs-number">0</span>,
                title:<span class="hljs-string">'选项二'</span>,
                option: [<span class="hljs-string">'一'</span>, <span class="hljs-string">'二'</span>, <span class="hljs-string">'三'</span>,<span class="hljs-string">'四'</span>,<span class="hljs-string">'五'</span>],
            },
            {
                index:<span class="hljs-number">0</span>,
                title:<span class="hljs-string">'选项三'</span>,
                option: [<span class="hljs-string">'①'</span>, <span class="hljs-string">'②'</span>, <span class="hljs-string">'③'</span>,<span class="hljs-string">'④'</span>,<span class="hljs-string">'⑤'</span>]
            },
        ]
    },
    <span class="hljs-comment">// 绑定事件，因为不能用this.setData直接设置每个对象的索引值index。</span>
    <span class="hljs-comment">// 所以用自定义属性current来标记每个数组对象的下标</span>
    bindChange_select: function(ev) {
    <span class="hljs-comment">// 定义一个变量curindex 储存触发事件的数组对象的下标</span>
        const curindex = ev<span class="hljs-selector-class">.target</span><span class="hljs-selector-class">.dataset</span><span class="hljs-selector-class">.current</span>
    <span class="hljs-comment">// 根据下标 改变该数组对象中的index值</span>
        this<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.objArray</span>[curindex]<span class="hljs-selector-class">.index</span> = ev<span class="hljs-selector-class">.detail</span><span class="hljs-selector-class">.value</span>
    <span class="hljs-comment">// 把改变某个数组对象index值之后的全新objArray重新 赋值给objArray</span>
        this.setData({
            objArray: this<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.objArray</span>
        })
    }
})</code></pre>
<h3 id="articleHeader5">picker.wxml</h3>
<p>wx:for绑定数组objArray,当前项的下标变量名默认为index，数组当前项的变量名默认为item，为了区分选项option中的下标<br>使用 wx:for-item 可以指定数组当前元素的变量名为itm，<br>使用 wx:for-index 可以指定数组当前下标的变量名为idx<br><strong>关键点是：自定义一个属性对应当前下标 data-current=""{{"idx"}}""，绑定事件bindChange_select触发时判断出是哪个数组对象触发的，就改变该数组对象中的index值</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//picker.wxml：
 <view class=&quot;column_list mt_10&quot; wx:for=&quot;"{{"objArray"}}"&quot; wx:for-item=&quot;itm&quot;  wx:for-index=&quot;idx&quot; >
        <text class=&quot;font15&quot;>"{{"itm.title"}}" </text>
        <picker  class=&quot;inputText&quot;  bindchange=&quot;bindChange_select&quot; value=&quot;"{{"itm.index"}}"&quot; data-current=&quot;"{{"idx"}}"&quot; range=&quot;"{{"itm.option"}}"&quot; >
            <view class=&quot;select_picker&quot;>
                 "{{"itm.option[itm.index]"}}"
                <image  mode=&quot;aspectFit&quot;  class=&quot;select_arrow&quot; src=&quot;../../images/select_arrow.png&quot;></image>
            </view>
        </picker>
    </view>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">//picker.wxml：
 <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"column_list mt_10"</span> <span class="hljs-attr">wx:for</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"objArray"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">wx:for-item</span>=<span class="hljs-string">"itm"</span>  <span class="hljs-attr">wx:for-index</span>=<span class="hljs-string">"idx"</span> &gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">text</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"font15"</span>&gt;</span></span><span class="hljs-template-variable">"{{"itm.title"}}"</span><span class="xml"> <span class="hljs-tag">&lt;/<span class="hljs-name">text</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">picker</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"inputText"</span>  <span class="hljs-attr">bindchange</span>=<span class="hljs-string">"bindChange_select"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"itm.index"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">data-current</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"idx"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">range</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"itm.option"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> &gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">view</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"select_picker"</span>&gt;</span>
                 </span><span class="hljs-template-variable">"{{"itm.option[itm.index]"}}"</span><span class="xml">
                <span class="hljs-tag">&lt;<span class="hljs-name">image</span>  <span class="hljs-attr">mode</span>=<span class="hljs-string">"aspectFit"</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"select_arrow"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../../images/select_arrow.png"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">image</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">picker</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">view</span>&gt;</span></span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPgPY?w=375&amp;h=254" src="https://static.alili.tech/img/bVPgPY?w=375&amp;h=254" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><a href="https://github.com/wangqin273/king/tree/master/pickerTest" rel="nofollow noreferrer" target="_blank">完整案例</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
微信小程序picker组件遇到的问题与解决方案

## 原文链接
[https://segmentfault.com/a/1190000009797083](https://segmentfault.com/a/1190000009797083)

