---
title: 'vue应用产品之iShow H5编辑器' 
date: 2019-01-01 2:30:07
hidden: true
slug: 3cd6kqnkt1d
categories: [reprint]
---

{{< raw >}}

                    
<p>github地址：<a href="#https://github.com/qiuyaofan/iShow">https://github.com/qiuyaofan/iShow</a> </p>
<p>文档：<a href="#https://qiuyaofan.github.io/iShow/">https://qiuyaofan.github.io/iShow/</a> </p>
<p>网站在线地址：<a href="#https://qiuyaofan.github.io/ishowPage">https://qiuyaofan.github.io/ishowPage</a></p>
<p>今年年初，开始断断续续打磨自己的vue编辑器，到现在也有半年有余。目前是ishow1.0版本，后续会不断完善，也欢迎大家贡献自己的想法，共同进步。如果喜欢这个项目，记得star哦～</p>
<hr>
<p>什么都不说，先上图</p>
<h3 id="articleHeader0">ishow的界面如下所示：</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011112928" src="https://static.alili.tech/img/remote/1460000011112928" alt="ishow" title="ishow" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">json渲染的手机端示例（iphone6为例）</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011112929" src="https://static.alili.tech/img/remote/1460000011112929" alt="ishow" title="ishow" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">ishow编辑器的主要功能如下：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ishow v1.0功能列表
一：字体编辑
1.普通样式：背景颜色，文字颜色，字体，对齐，透明度，边距，行高，大小，加粗，倾斜，下划线，清除格式
2.边框样式：宽度，颜色，类型，圆角
3.阴影样式：阴影颜色，大小，半径，方向
4.点击可修改文字，拖拽改变位置

二：图片编辑
基本编辑：参考字体编辑
添加图片，替换图片
拉伸改变大小，旋转
上传图片
图片选择弹层有：预览，裁切（后台未接），选择，删除等功能

三：动画效果
打字机，渐变，淡入淡出，旋转，缩放等，动画种类参考易企秀
时间，延时，添加动画，预览动画，清除动画
多个动画
次数，循环（1.0暂不实现）

四：左侧页面总预览
添加新一页，删除，排序（1.0暂不实现）

五：键盘操作
左右键移动元素
删除键删除选中元素
撤销ctrl+z(最多缓存40个操作)

六：层级调整（还需完善优化）

七：表单配置添加
目前支持表单类型：输入框，单选，多选，下拉，按钮
支持添加验证

八：h5提交配置
标题，封面等


九：保存，发布（模版，h5 json）


十：多媒体
背景添加
音频添加
视频添加（1.0暂不实现）


十一：模版管理（1.0暂不实现，需要后台配合）
编辑模版，搜索模版

十二：手机端渲染
根据json完成动画播放，翻页，音频播放，屏幕适配等
表单提交后台（未实现）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>ishow v1<span class="hljs-number">.0</span>功能列表
一：字体编辑
<span class="hljs-number">1.</span>普通样式：背景颜色，文字颜色，字体，对齐，透明度，边距，行高，大小，加粗，倾斜，下划线，清除格式
<span class="hljs-number">2.</span>边框样式：宽度，颜色，类型，圆角
<span class="hljs-number">3.</span>阴影样式：阴影颜色，大小，半径，方向
<span class="hljs-number">4.</span>点击可修改文字，拖拽改变位置

二：图片编辑
基本编辑：参考字体编辑
添加图片，替换图片
拉伸改变大小，旋转
上传图片
图片选择弹层有：预览，裁切（后台未接），选择，删除等功能

三：动画效果
打字机，渐变，淡入淡出，旋转，缩放等，动画种类参考易企秀
时间，延时，添加动画，预览动画，清除动画
多个动画
次数，循环（<span class="hljs-number">1.0</span>暂不实现）

四：左侧页面总预览
添加新一页，删除，排序（<span class="hljs-number">1.0</span>暂不实现）

五：键盘操作
左右键移动元素
删除键删除选中元素
撤销ctrl+z(最多缓存<span class="hljs-number">40</span>个操作)

六：层级调整（还需完善优化）

七：表单配置添加
目前支持表单类型：输入框，单选，多选，下拉，按钮
支持添加验证

八：h5提交配置
标题，封面等


九：保存，发布（模版，h5 json）


十：多媒体
背景添加
音频添加
视频添加（<span class="hljs-number">1.0</span>暂不实现）


十一：模版管理（<span class="hljs-number">1.0</span>暂不实现，需要后台配合）
编辑模版，搜索模版

十二：手机端渲染
根据json完成动画播放，翻页，音频播放，屏幕适配等
表单提交后台（未实现）</code></pre>
<h3 id="articleHeader3">ishow调用的外部插件</h3>
<p>IUI组件部分</p>
<p>swiper：<a href="#http://www.swiper.com.cn/api/index.html">http://www.swiper.com.cn/api/index.html</a> </p>
<p>饿了么element：<a href="#http://element.eleme.io/#/zh-CN/component/installation">http://element.eleme.io/#/zh-CN/component/installation</a> </p>
<p>参考的开源架子：<a href="#https://github.com/PanJiaChen/vue-element-admin">https://github.com/PanJiaChen/vue-element-admin</a></p>
<h3 id="articleHeader4">开发思路</h3>
<p>编辑器最终生成的是json配置，手机端通过json配置渲染出相应的样式，动画等。</p>
<h4>mock.js</h4>
<p>目前编辑器是用mock实现模拟接口，如果需要换回自己的接口</p>
<p>1.去除config.js的mock调用</p>
<p>2.修改utils/fetch.js代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//mock.js
resolve(res);
//没有mock
// if (res.code === 40001) {
//   // 登出
//   store.dispatch('FedLogOut').then(() => {
//     router.push({ path: '/login' })
//   });
// } else if (res.code !== 200) {
//   Message({
//     message: res.msg,
//     type: 'error',
//     duration: 5 * 1000
//   });
//   reject(res);
// } else {
//   resolve(res);
// }

注释掉resolve(res);
下面的取消注释即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code><span class="hljs-regexp">//m</span>ock.js
resolve(res);
<span class="hljs-regexp">//</span>没有mock
<span class="hljs-regexp">//</span> <span class="hljs-keyword">if</span> (res.code === <span class="hljs-number">40001</span>) {
<span class="hljs-regexp">//</span>   <span class="hljs-regexp">//</span> 登出
<span class="hljs-regexp">//</span>   store.dispatch(<span class="hljs-string">'FedLogOut'</span>).then(() =&gt; {
<span class="hljs-regexp">//</span>     router.push({ path: <span class="hljs-string">'/login'</span> })
<span class="hljs-regexp">//</span>   });
<span class="hljs-regexp">//</span> } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (res.code !== <span class="hljs-number">200</span>) {
<span class="hljs-regexp">//</span>   Message({
<span class="hljs-regexp">//</span>     message: res.msg,
<span class="hljs-regexp">//</span>     type: <span class="hljs-string">'error'</span>,
<span class="hljs-regexp">//</span>     duration: <span class="hljs-number">5</span> * <span class="hljs-number">1000</span>
<span class="hljs-regexp">//</span>   });
<span class="hljs-regexp">//</span>   reject(res);
<span class="hljs-regexp">//</span> } <span class="hljs-keyword">else</span> {
<span class="hljs-regexp">//</span>   resolve(res);
<span class="hljs-regexp">//</span> }

注释掉resolve(res);
下面的取消注释即可</code></pre>
<p>json格式如下所示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var JSON={
    &quot;page&quot;:[
        {
            &quot;page&quot;: 1,
            &quot;json&quot;: [
                {
                  ／***
                      控件类型
                      &quot;1&quot;:&quot;text&quot;,
                      &quot;2&quot;:&quot;img&quot;,
                      &quot;3&quot;:&quot;textarea&quot;,
                      &quot;4&quot;:&quot;radio&quot;,
                      &quot;5&quot;:&quot;checkbox&quot;,
                      &quot;6&quot;:&quot;select&quot;,
                      &quot;7&quot;:&quot;button&quot;
                  ***／
                    &quot;type&quot;: 2,
                    &quot;content&quot;: &quot;https://img.kxz.com/assets/kxz/fixedInputCover1_20170630/fb7bf5d8-56d6-46ea-a01b-35e6943647da_demo1-4.png&quot;,
                    // 位置
                    &quot;position&quot;: {
                        &quot;top&quot;: 360,
                        &quot;left&quot;: 201
                    },
                    &quot;width&quot;: 175,
                    &quot;height&quot;: 125.2680965147453,
                    //基本样式属性
                    &quot;text&quot;: {
                        &quot;backgroundColor&quot;: &quot;rgba(0,0,0,0)&quot;,
                        &quot;opacity&quot;: 100,
                        &quot;padding&quot;: 0,
                        &quot;rotate&quot;: 94,
                        &quot;borderWidth&quot;: 0,
                        &quot;borderRadius&quot;: 0,
                        &quot;borderColor&quot;: &quot;rgba(204, 204, 204,1)&quot;,
                        &quot;borderStyle&quot;: &quot;solid&quot;,
                        &quot;shadowColor&quot;: &quot;rgba(204, 204, 204,1)&quot;,
                        &quot;shadowWidth&quot;: 0,
                        &quot;shadowRadius&quot;: 10,
                        &quot;shadowDire&quot;: 0
                    },
                    //动画类型，支持多动画
                    &quot;animate&quot;: [
                        {
                            &quot;animationName&quot;: &quot;fadeIn&quot;,
                            &quot;animationDuration&quot;: 2,
                            &quot;animationTimingFunction&quot;: &quot;ease&quot;,
                            &quot;animationDelay&quot;: 0.4,
                            &quot;animationFillMode&quot;: &quot;both&quot;,
                            &quot;animationPlayState&quot;: &quot;initial&quot;,
                            &quot;isOut&quot;: false
                        }
                    ],
                    &quot;id&quot;: 1501745923909,
                    //层级
                    &quot;zIndex&quot;: 6
                }
            
            ],
            //这一页的背景图片
            &quot;bgImage&quot;: {
                &quot;backgroundColor&quot;: &quot;&quot;,
                &quot;coord&quot;: &quot;&quot;,
                &quot;url&quot;: &quot;&quot;
            }
        },
       
    ],
    //配置
    &quot;setting&quot;: {
        //背景音乐
        &quot;bgMusic&quot;: {
            &quot;url&quot;: &quot;ttp://192.168.1.100:8080/uploadfile/3/15/5/8765a93f-351e-4984-8a03-6ef746ea36fd_bg.mp3&quot;,
            &quot;name&quot;: &quot;enemy2_down.mp3&quot;
        }
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> <span class="hljs-built_in">JSON</span>={
    <span class="hljs-string">"page"</span>:[
        {
            <span class="hljs-string">"page"</span>: <span class="hljs-number">1</span>,
            <span class="hljs-string">"json"</span>: [
                {
                  ／***
                      控件类型
                      <span class="hljs-string">"1"</span>:<span class="hljs-string">"text"</span>,
                      <span class="hljs-string">"2"</span>:<span class="hljs-string">"img"</span>,
                      <span class="hljs-string">"3"</span>:<span class="hljs-string">"textarea"</span>,
                      <span class="hljs-string">"4"</span>:<span class="hljs-string">"radio"</span>,
                      <span class="hljs-string">"5"</span>:<span class="hljs-string">"checkbox"</span>,
                      <span class="hljs-string">"6"</span>:<span class="hljs-string">"select"</span>,
                      <span class="hljs-string">"7"</span>:<span class="hljs-string">"button"</span>
                  ***／
                    <span class="hljs-string">"type"</span>: <span class="hljs-number">2</span>,
                    <span class="hljs-string">"content"</span>: <span class="hljs-string">"https://img.kxz.com/assets/kxz/fixedInputCover1_20170630/fb7bf5d8-56d6-46ea-a01b-35e6943647da_demo1-4.png"</span>,
                    <span class="hljs-comment">// 位置</span>
                    <span class="hljs-string">"position"</span>: {
                        <span class="hljs-string">"top"</span>: <span class="hljs-number">360</span>,
                        <span class="hljs-string">"left"</span>: <span class="hljs-number">201</span>
                    },
                    <span class="hljs-string">"width"</span>: <span class="hljs-number">175</span>,
                    <span class="hljs-string">"height"</span>: <span class="hljs-number">125.2680965147453</span>,
                    <span class="hljs-comment">//基本样式属性</span>
                    <span class="hljs-string">"text"</span>: {
                        <span class="hljs-string">"backgroundColor"</span>: <span class="hljs-string">"rgba(0,0,0,0)"</span>,
                        <span class="hljs-string">"opacity"</span>: <span class="hljs-number">100</span>,
                        <span class="hljs-string">"padding"</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-string">"rotate"</span>: <span class="hljs-number">94</span>,
                        <span class="hljs-string">"borderWidth"</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-string">"borderRadius"</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-string">"borderColor"</span>: <span class="hljs-string">"rgba(204, 204, 204,1)"</span>,
                        <span class="hljs-string">"borderStyle"</span>: <span class="hljs-string">"solid"</span>,
                        <span class="hljs-string">"shadowColor"</span>: <span class="hljs-string">"rgba(204, 204, 204,1)"</span>,
                        <span class="hljs-string">"shadowWidth"</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-string">"shadowRadius"</span>: <span class="hljs-number">10</span>,
                        <span class="hljs-string">"shadowDire"</span>: <span class="hljs-number">0</span>
                    },
                    <span class="hljs-comment">//动画类型，支持多动画</span>
                    <span class="hljs-string">"animate"</span>: [
                        {
                            <span class="hljs-string">"animationName"</span>: <span class="hljs-string">"fadeIn"</span>,
                            <span class="hljs-string">"animationDuration"</span>: <span class="hljs-number">2</span>,
                            <span class="hljs-string">"animationTimingFunction"</span>: <span class="hljs-string">"ease"</span>,
                            <span class="hljs-string">"animationDelay"</span>: <span class="hljs-number">0.4</span>,
                            <span class="hljs-string">"animationFillMode"</span>: <span class="hljs-string">"both"</span>,
                            <span class="hljs-string">"animationPlayState"</span>: <span class="hljs-string">"initial"</span>,
                            <span class="hljs-string">"isOut"</span>: <span class="hljs-literal">false</span>
                        }
                    ],
                    <span class="hljs-string">"id"</span>: <span class="hljs-number">1501745923909</span>,
                    <span class="hljs-comment">//层级</span>
                    <span class="hljs-string">"zIndex"</span>: <span class="hljs-number">6</span>
                }
            
            ],
            <span class="hljs-comment">//这一页的背景图片</span>
            <span class="hljs-string">"bgImage"</span>: {
                <span class="hljs-string">"backgroundColor"</span>: <span class="hljs-string">""</span>,
                <span class="hljs-string">"coord"</span>: <span class="hljs-string">""</span>,
                <span class="hljs-string">"url"</span>: <span class="hljs-string">""</span>
            }
        },
       
    ],
    <span class="hljs-comment">//配置</span>
    <span class="hljs-string">"setting"</span>: {
        <span class="hljs-comment">//背景音乐</span>
        <span class="hljs-string">"bgMusic"</span>: {
            <span class="hljs-string">"url"</span>: <span class="hljs-string">"ttp://192.168.1.100:8080/uploadfile/3/15/5/8765a93f-351e-4984-8a03-6ef746ea36fd_bg.mp3"</span>,
            <span class="hljs-string">"name"</span>: <span class="hljs-string">"enemy2_down.mp3"</span>
        }
    }
};</code></pre>
<h3 id="articleHeader5">使用vue+element开发的部分经验总结</h3>
<p>使用vue以来遇到的一些问题及解决办法，分享给大家，希望对你有帮助</p>
<p>1.element date组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="报错内容：TypeError: value.getTime is not a function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">报错内容：TypeError: <span class="hljs-built_in">value</span>.getTime is <span class="hljs-keyword">not</span> <span class="hljs-keyword">a</span> <span class="hljs-function"><span class="hljs-keyword">function</span></span></code></pre>
<p>原理：插件生成和默认值需要是Fri Sep 08 2017 16:25:00 GMT+0800 (CST)这种格式，但项目中通常是YYYY-MM-DD hh:mm:ss格式，所以报错.</p>
<p>解决办法：</p>
<p>后台修改存储类型，或者</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//提交时
momentChange(date) {
    return date?this.moment(date).format('YYYY-MM-DD'):'';
},
//获取默认值回填前
dateChange(date){
  return date?new Date(date):'';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">//提交时</span>
momentChange(<span class="hljs-built_in">date</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">date</span>?<span class="hljs-keyword">this</span>.moment(<span class="hljs-built_in">date</span>).format(<span class="hljs-string">'YYYY-MM-DD'</span>):<span class="hljs-string">''</span>;
},
<span class="hljs-comment">//获取默认值回填前</span>
dateChange(<span class="hljs-built_in">date</span>){
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">date</span>?<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-built_in">date</span>):<span class="hljs-string">''</span>;
}</code></pre>
<p>2.组件间调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//子组件调用
<main-editor ref=&quot;chileComponentName&quot;></main-editor>
层级少可以使用this.$refs.chileComponentName.method

层级多借助bus.js或者vuex

//父组件调用
this.$parent.method

// 当前父元素
this.$el" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//子组件调用</span>
&lt;main-editor ref=<span class="hljs-string">"chileComponentName"</span>&gt;&lt;/main-editor&gt;
层级少可以使用this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.chileComponentName</span><span class="hljs-selector-class">.method</span>

层级多借助bus.js或者vuex

<span class="hljs-comment">//父组件调用</span>
this.<span class="hljs-variable">$parent</span><span class="hljs-selector-class">.method</span>

<span class="hljs-comment">// 当前父元素</span>
this.<span class="hljs-variable">$el</span></code></pre>
<p>3.element验证的坑  </p>
<p>经常加了type="number"报错，然后搜到答案v-model.number="",然后发现 11.ee居然验证通过？!   <br> 其实是v-model.number会自动把11.ee转为11去验证    </p>
<p>解决办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-form-item label=&quot;手机号码&quot; class=&quot;mb20 is-required&quot; prop=&quot;mobile&quot;>
   <el-input v-model.number=&quot;mobile&quot; :maxlength=&quot;11&quot;></el-input>
</el-form-item>

data() {
    let validateMobile = (rule, value, callback) => {
       if (!value||(value + '').length !== 11) {
         callback(new Error('手机号码必须为11位纯数字'));
       } else {
         callback();
       }
    };
    return {
        mobile:'',
        rules: {
             mobile: [
               {validator: validateMobile, trigger: 'blur'}
            ]
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>&lt;el-form-item label=<span class="hljs-string">"手机号码"</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"mb20 is-required"</span> prop=<span class="hljs-string">"mobile"</span>&gt;
   &lt;el-input v-model.number=<span class="hljs-string">"mobile"</span> :maxlength=<span class="hljs-string">"11"</span>&gt;&lt;/el-input&gt;
&lt;/el-form-item&gt;

data() {
    <span class="hljs-keyword">let</span> validateMobile = (rule, <span class="hljs-keyword">value</span>, callback) =&gt; {
       <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">value</span>||(<span class="hljs-keyword">value</span> + <span class="hljs-string">''</span>).length !== <span class="hljs-number">11</span>) {
         callback(<span class="hljs-keyword">new</span> Error(<span class="hljs-string">'手机号码必须为11位纯数字'</span>));
       } <span class="hljs-keyword">else</span> {
         callback();
       }
    };
    <span class="hljs-keyword">return</span> {
        mobile:<span class="hljs-string">''</span>,
        rules: {
             mobile: [
               {validator: validateMobile, trigger: <span class="hljs-string">'blur'</span>}
            ]
        }
    }
}
</code></pre>
<p>4.通过el-upload上传七牛</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<el-upload action=&quot;http://up-z1.qiniu.com/&quot; :data=&quot;uploadForm&quot; list-type=&quot;picture-card&quot;
      :file-list=&quot;fileList&quot;
      :on-preview=&quot;preview&quot;
      :on-remove=&quot;remove&quot;
      :before-upload=&quot;beforeUpload&quot;
      name=&quot;file&quot;
      :on-change=&quot;upload&quot;
      :thumbnail-mode=&quot;true&quot;
      :on-success=&quot;handleSuccess&quot;>
</el-upload>

//获取token接口函数
import {getUploadToken} from 'api';
method:{
   beforeUpload(file) {
       //拿到token
       return getUploadToken().then(response => {
           //后台根据七牛的密钥生成的token
         this.uploadForm.token = response.data.token;
         //我们生成唯一的key
         this.uploadForm.key = this.createKey(file);
         //前缀：在线路径的前缀
         this.prefix = response.data.prefix;
       }).catch(err => {
         console.info(err)
       });
   },
   createKey(file) {
       let curr = this.moment().format('YYYYMMDD').toString();
       let prefix = this.moment(file.lastModified).format('HHmmss').toString();
       let suffix = file.name;
       let key = encodeURI(`${curr}/${prefix}_${suffix}`);
       return key;
   },
   handleSuccess(response, file, fileList) {
        //拼接成能访问的在线链接
       console.info(this.prefix + response.key);
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;el-upload action=<span class="hljs-string">"http://up-z1.qiniu.com/"</span> :data=<span class="hljs-string">"uploadForm"</span> <span class="hljs-keyword">list</span>-<span class="hljs-keyword">type</span>=<span class="hljs-string">"picture-card"</span>
      :<span class="hljs-keyword">file</span>-<span class="hljs-keyword">list</span>=<span class="hljs-string">"fileList"</span>
      :<span class="hljs-keyword">on</span>-preview=<span class="hljs-string">"preview"</span>
      :<span class="hljs-keyword">on</span>-remove=<span class="hljs-string">"remove"</span>
      :before-upload=<span class="hljs-string">"beforeUpload"</span>
      name=<span class="hljs-string">"file"</span>
      :<span class="hljs-keyword">on</span>-change=<span class="hljs-string">"upload"</span>
      :thumbnail-mode=<span class="hljs-string">"true"</span>
      :<span class="hljs-keyword">on</span>-success=<span class="hljs-string">"handleSuccess"</span>&gt;
&lt;/el-upload&gt;

<span class="hljs-comment">//获取token接口函数</span>
import {getUploadToken} from 'api';
method:{
   beforeUpload(<span class="hljs-keyword">file</span>) {
       <span class="hljs-comment">//拿到token</span>
       <span class="hljs-keyword">return</span> getUploadToken().then(response =&gt; {
           <span class="hljs-comment">//后台根据七牛的密钥生成的token</span>
         this.uploadForm.<span class="hljs-keyword">token</span> = response.data.<span class="hljs-keyword">token</span>;
         <span class="hljs-comment">//我们生成唯一的key</span>
         this.uploadForm.key = this.createKey(<span class="hljs-keyword">file</span>);
         <span class="hljs-comment">//前缀：在线路径的前缀</span>
         this.prefix = response.data.prefix;
       }).catch(<span class="hljs-keyword">err</span> =&gt; {
         console.info(<span class="hljs-keyword">err</span>)
       });
   },
   createKey(<span class="hljs-keyword">file</span>) {
       let curr = this.moment().<span class="hljs-keyword">format</span>('YYYYMMDD').<span class="hljs-keyword">toString</span>();
       let prefix = this.moment(<span class="hljs-keyword">file</span>.lastModified).<span class="hljs-keyword">format</span>('HHmmss').<span class="hljs-keyword">toString</span>();
       let suffix = <span class="hljs-keyword">file</span>.name;
       let key = encodeURI(`<span class="hljs-variable">${curr}</span>/<span class="hljs-variable">${prefix}</span>_<span class="hljs-variable">${suffix}</span>`);
       <span class="hljs-keyword">return</span> key;
   },
   handleSuccess(response, <span class="hljs-keyword">file</span>, fileList) {
        <span class="hljs-comment">//拼接成能访问的在线链接</span>
       console.info(this.prefix + response.key);
   }
}</code></pre>
<p>5.vue属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.添加background-image时
<div :style=&quot;{ 'background-image': 'url(' + imageUrl + ')' }&quot;> </div>

2.添加数组到style
<div :style=&quot;[textJson,animateJson]&quot;></div>

//data举例
data() {
    return {
        textJson:{
           &quot;backgroundColor&quot;: &quot;rgba(0,0,0,0)&quot;,
           &quot;opacity&quot;: 100,
           &quot;padding&quot;: 0,
           &quot;rotate&quot;: 0,
           &quot;borderWidth&quot;: 0,
           &quot;borderRadius&quot;: 100,
           &quot;borderStyle&quot;: &quot;solid&quot;,
           &quot;shadowColor&quot;: &quot;rgba(204, 204, 204,1)&quot;,
           &quot;shadowWidth&quot;: 0,
           &quot;shadowRadius&quot;: 10,
           &quot;shadowDire&quot;: 0,
           &quot;borderColor&quot;: &quot;rgba(204, 204, 204,1)&quot;
       },
       animateJson:{
           animationName:'fadeIn'
       }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-number">1</span>.添加<span class="hljs-attribute">background-image</span>时
&lt;<span class="hljs-selector-tag">div</span> :style=<span class="hljs-string">"{ 'background-image': 'url(' + imageUrl + ')' }"</span>&gt; &lt;/div&gt;

<span class="hljs-number">2</span>.添加数组到style
&lt;<span class="hljs-selector-tag">div</span> :style=<span class="hljs-string">"[textJson,animateJson]"</span>&gt;&lt;/div&gt;

<span class="hljs-comment">//data举例</span>
<span class="hljs-function"><span class="hljs-title">data</span><span class="hljs-params">()</span></span> {
    return {
        textJson:{
           <span class="hljs-string">"backgroundColor"</span>: <span class="hljs-string">"rgba(0,0,0,0)"</span>,
           <span class="hljs-string">"opacity"</span>: <span class="hljs-number">100</span>,
           <span class="hljs-string">"padding"</span>: <span class="hljs-number">0</span>,
           <span class="hljs-string">"rotate"</span>: <span class="hljs-number">0</span>,
           <span class="hljs-string">"borderWidth"</span>: <span class="hljs-number">0</span>,
           <span class="hljs-string">"borderRadius"</span>: <span class="hljs-number">100</span>,
           <span class="hljs-string">"borderStyle"</span>: <span class="hljs-string">"solid"</span>,
           <span class="hljs-string">"shadowColor"</span>: <span class="hljs-string">"rgba(204, 204, 204,1)"</span>,
           <span class="hljs-string">"shadowWidth"</span>: <span class="hljs-number">0</span>,
           <span class="hljs-string">"shadowRadius"</span>: <span class="hljs-number">10</span>,
           <span class="hljs-string">"shadowDire"</span>: <span class="hljs-number">0</span>,
           <span class="hljs-string">"borderColor"</span>: <span class="hljs-string">"rgba(204, 204, 204,1)"</span>
       },
       animateJson:{
           animationName:<span class="hljs-string">'fadeIn'</span>
       }
    }
}</code></pre>
<p>今天就分享到这里啦～～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue应用产品之iShow H5编辑器

## 原文链接
[https://segmentfault.com/a/1190000011112923](https://segmentfault.com/a/1190000011112923)

