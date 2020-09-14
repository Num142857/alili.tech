---
title: '慕课网 饿了么 vue2.0 项目' 
date: 2019-01-08 2:30:11
hidden: true
slug: wh0qifakosc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">饿了么 vue 项目总结</h3>
<blockquote>项目效果预览  <a href="https://hugeorange.github.io/gh-pages/ele" rel="nofollow noreferrer" target="_blank">ele效果预览</a><br>项目源码地址 <a href="https://github.com/hugeorange/vue-study" rel="nofollow noreferrer" target="_blank">ele源码</a><br>跟着慕课网黄轶老师  敲饿了么 vue 项目</blockquote>
<p><a href="https://github.com/ustbhuangyi/vue-sell" rel="nofollow noreferrer" target="_blank">作者项目源代码地址</a></p>
<h3 id="articleHeader1">项目完成之后 npm run build</h3>
<p>这本来是写在最后面一段的，我现在把他写在了最前面，方便我们事先知道，整个项目做完之后是什么样子的</p>
<ul>
<li>项目完成之后在 根目录 下 npm run build （就是 npm run dev 的那个目录）</li>
<li>会在根目录下生成一个 dist 目录，其中包含着 index.html 和一个css目录，一个js目录</li>
<li>按官方说，这个 dist 目录必须 http server 环境下才能运行</li>
<li>下个 xampp 在本地服务下访问</li>
</ul>
<p>访问时出现了以下几个问题：</p>
<ol>
<li>css js 引用路径出错  （将 cofig目录下的 index.js  里的 assetsPublicPath:'./' 这样设置即可）</li>
<li>由于视频上是写了一个 node 后端服务，访问本地的 data.json 文件，然后用 vue-resource 访问这个 node 服务才请求到的接口<br>   打包之后，访问不到这个 node 服务了，自然就出错了<br>   如何解决：我在朋友的帮助下，知道了 easy-mock这个东西，然后 把data.json 文件 用 easy-mock 制作成了 一个 http 接口<br>   后来因为 github 不能访问 http 接口，又把 http 改成了 https（我最后打包的项目放在了 gitpages上了）</li>
</ol>
<h1 id="articleHeader2">项目启动</h1>
<p>添加静态资源文件，修改 build、dev-serve.js mock模拟数据，<br>  添加 meta 标签<br>  碰到 换台机器 报错-没有 modules ，暂时解决方法，删除整个 node_modules,然后重新 npm install</p>
<h4>建立好 es6 书写， stylus书写方法，增加了tab导航栏，配置好了路由</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="学习了 1px 边框制作（不过感觉用处不大）
编写 stylus mixin 函数并在引用
(注意：引入外界stylus样式文件时：只能用 @import 在style标签里引用
且路径不可以在 webpack.base.conf.js alias别名)

全局通用样式，字体文件，图标文件
可以用统一在同级目录下用一个 index.styl
文件作为出口，在其内部 用 @import './minix.styl' 引入
然后在再 webpack.base.conf.js  统一配置 alias 别名
之后再在 main.js  引入这个 index.styl 文件 即可使用这些样式文件
如：import 'common/stylus/index.styl'

stylus 文件书写
    1.尽量使用类 css 语法即 {}
    2.尽量避免拷贝代码，产生多余的空格缩进问题
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>学习了 <span class="hljs-number">1px</span> 边框制作（不过感觉用处不大）
编写 stylus mixin 函数并在引用
(注意：引入外界stylus样式文件时：只能用 @import 在style标签里引用
且路径不可以在 webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span> alias别名)

全局通用样式，字体文件，图标文件
可以用统一在同级目录下用一个 index<span class="hljs-selector-class">.styl</span>
文件作为出口，在其内部 用 @import <span class="hljs-string">'./minix.styl'</span> 引入
然后在再 webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>  统一配置 alias 别名
之后再在 main<span class="hljs-selector-class">.js</span>  引入这个 index<span class="hljs-selector-class">.styl</span> 文件 即可使用这些样式文件
如：import <span class="hljs-string">'common/stylus/index.styl'</span>

stylus 文件书写
    <span class="hljs-number">1</span>.尽量使用类 css 语法即 {}
    <span class="hljs-number">2</span>.尽量避免拷贝代码，产生多余的空格缩进问题
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="做完之后好好学习一下 flex 布局
display:flex  flex:1
完成 header 组件 ，goods组件 完成布局
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>做完之后好好学习一下 <span class="hljs-attribute">flex</span> 布局
<span class="hljs-attribute">display</span>:flex  flex:<span class="hljs-number">1</span>
完成 <span class="hljs-selector-tag">header</span> 组件 ，goods组件 完成布局
</code></pre>
<blockquote>better-scroll  的用法</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="better-scroll 实现列表滚动联动
1. 初始化 better-scroll
    _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper,{
            click:true        //默认派发点击事件
        });

        this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
            click:true,
            probeType:3   //实时侦测滚动
        });
    },

2. 在 vue 钩子函数 created 内 this.$nextTick 回调里面调用 better-scroll初始化函数
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>better-scroll 实现列表滚动联动
<span class="hljs-number">1.</span> 初始化 better-scroll
    _initScroll() {
        <span class="hljs-keyword">this</span>.menuScroll = new BScroll(<span class="hljs-keyword">this</span>.$refs.menuWrapper,{
            click:<span class="hljs-literal">true</span>        <span class="hljs-comment">//默认派发点击事件</span>
        });

        <span class="hljs-keyword">this</span>.foodsScroll = new BScroll(<span class="hljs-keyword">this</span>.$refs.foodsWrapper,{
            click:<span class="hljs-literal">true</span>,
            probeType:<span class="hljs-number">3</span>   <span class="hljs-comment">//实时侦测滚动</span>
        });
    },

<span class="hljs-number">2.</span> 在 vue 钩子函数 created 内 <span class="hljs-keyword">this</span>.$nextTick 回调里面调用 better-scroll初始化函数
</code></pre>
<blockquote>菜单栏根据foodList列表滚动实时高亮</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 通过 _calculateHeight 方法动态计算出 每个列表的标题 的 clientHeight 值，并将其推进一个 listHeight 数组
2. 当滚动 foods 列表时，会动态计算出 pos.y 的值，
3. 把这个 pos.y 的值在计算属性里判断 其在 listHeight 数组中对应的 index 值
4. 然后将菜单列表数组中的 index 值 设置为高亮 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>通过 _calculateHeight 方法动态计算出 每个列表的标题 的 clientHeight 值，并将其推进一个 listHeight 数组
<span class="hljs-bullet">2. </span>当滚动 foods 列表时，会动态计算出 pos.y 的值，
<span class="hljs-bullet">3. </span>把这个 pos.y 的值在计算属性里判断 其在 listHeight 数组中对应的 index 值
<span class="hljs-bullet">4. </span>然后将菜单列表数组中的 index 值 设置为高亮 
</code></pre>
<blockquote>点击左侧菜单栏，右侧 foods 列表实时滚动到相应位置</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 给 menu-item 绑定一个 setMenu(index) 方法
2. 然后根据这个 index 获取foodslist 里面对应的 li dom 元素
3. 利用 scrollToElement(el,100) api 自动将foodlist滚动到合适位置

selectMenu(index) {
    // 因为有自动派发事件，所以需要阻止，
    if(!event._constructed) return; 
    console.log(index);
    let foodList = this.$refs.foodList;  //通过 $refs.foodList获取当前dom元素
    let el = foodList[index];
    this.foodsScroll.scrollToElement(el,10);
}  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-number">1.</span> 给 menu-item 绑定一个 setMenu(<span class="hljs-keyword">index</span>) 方法
<span class="hljs-number">2.</span> 然后根据这个 <span class="hljs-keyword">index</span> 获取foodslist 里面对应的 li dom 元素
<span class="hljs-number">3.</span> 利用 scrollToElement(el,<span class="hljs-number">100</span>) api 自动将foodlist滚动到合适位置

selectMenu(<span class="hljs-keyword">index</span>) {
    <span class="hljs-comment">// 因为有自动派发事件，所以需要阻止，</span>
    <span class="hljs-keyword">if</span>(!event._constructed) <span class="hljs-keyword">return</span>; 
    console.log(<span class="hljs-keyword">index</span>);
    let foodList = <span class="hljs-keyword">this</span>.$refs.foodList;  <span class="hljs-comment">//通过 $refs.foodList获取当前dom元素</span>
    let el = foodList[<span class="hljs-keyword">index</span>];
    <span class="hljs-keyword">this</span>.foodsScroll.scrollToElement(el,<span class="hljs-number">10</span>);
}  
</code></pre>
<blockquote>购物车计算属性使用</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 将 item.foods 数据 通过 props 属性传递到子组件（cartcontrol组件）

2. 在 cartcontrol 组件内 执行  addCart、decreaseCart 方法改变  item.foods.count 的值

    如果 item.count 值不存在，使用  Vue.set(this.food,'count',1) ; 
    给foods增加 count 属性，如果直接增加 count 属性，不会产生响应式数据，必须用  Vue.set() 方法

3. 在子组件改变 item.foods对象的值，相应的父组件内的 item的值会随之改变（js复杂数据类型地址引用）

4. 在父组件 goods.vue 利用计算属性 动态的生成购物车数据，然后通过 props属性传递给 shopcart.vue 组件

    计算属性的计算出的值为响应式数据可以直接拿来使用,即在  v-for 中直接遍历  selectFoods 
    
    // 选中的商品即购物车内的商品
    selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
            good.foods.forEach((food) => {
                if(food.count){
                    foods.push(food);
                }
            })
        });
        console.log(foods);
        return foods;
    }
    
    
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>1. 将 item.foods 数据 通过 props 属性传递到子组件（cartcontrol组件）

2. 在 cartcontrol 组件内 执行  addCart、decreaseCart 方法改变  item.foods.<span class="hljs-keyword">count</span> 的值

    如果 item.<span class="hljs-keyword">count</span> 值不存在，使用  Vue.<span class="hljs-keyword">set</span>(this.food,'<span class="hljs-keyword">count</span>',1) ; 
    给foods增加 <span class="hljs-keyword">count</span> 属性，如果直接增加 <span class="hljs-keyword">count</span> 属性，不会产生响应式数据，必须用  Vue.<span class="hljs-keyword">set</span>() 方法

3. 在子组件改变 item.foods对象的值，相应的父组件内的 item的值会随之改变（js复杂数据类型地址引用）

4. 在父组件 goods.vue 利用计算属性 动态的生成购物车数据，然后通过 props属性传递给 shopcart.vue 组件

    计算属性的计算出的值为响应式数据可以直接拿来使用,即在  v-<span class="hljs-keyword">for</span> 中直接遍历  selectFoods 
    
    <span class="hljs-comment">// 选中的商品即购物车内的商品</span>
    selectFoods() {
        let foods = [];
        this.goods.<span class="hljs-keyword">forEach</span>((good) =&gt; {
            good.foods.<span class="hljs-keyword">forEach</span>((food) =&gt; {
                <span class="hljs-keyword">if</span>(food.<span class="hljs-keyword">count</span>){
                    foods.push(food);
                }
            })
        });
        console.<span class="hljs-built_in">log</span>(foods);
        <span class="hljs-keyword">return</span> foods;
    }
    
    
</code></pre>
<blockquote>cartcontrol 增加和减少商品小球动画</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
1. 减少商品小球动画
    利用 vue transition 组件-过度动画 和 v-show 配合 可以给任何元素和组件添加 entering/leaving过度 
    条件渲染 （使用 v-if）
    条件展示 （使用v-show）
    动态组件
    组件根节点
    当插入或删除包含在 transition 组件中的元素时，Vue将做如下处理：
    1.自动嗅探目标元素是否应用了 css 过度或动画，如果是在恰当的时机添加/删除 css 类名
    2.如果过渡组件提供了 JavaScript钩子函数，这些钩子函数将在恰当的时机被调用
    3.如果没有找到钩子并且也没有检测到css动画，DOM操作（插入/删除）在下一帧中立即执行

    过度的 css 类名
    1. v-enter 定义进入过渡的开始状态，在元素插入式时生效，在下一帧移除
    2. v-enter-active 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除
    3. v-leave 定义离开过度的开始状态。在离开过渡被触发时生效，在下一帧移除
    4. v-leave-active 定义离开过渡的结束状态，在离开过渡被触发时生效，在下一帧被移除


    html:
    <transition name=&quot;move&quot;>
        <!-- 父元素用于控制小球 透明度变化 -->
        <div class=&quot;decrease&quot; v-show=&quot;food.count>0&quot;>
            <!-- 子元素用于控制小球旋转变化 -->
            <span class=&quot;inner icon-remove_circle_outline&quot;></span>   
        </div>
    </transition>


    css：
    <!-- 小球enter之后最终结束时的状态 -->
    .decrease{
        transition:all 0.4s linear;
        transform:translate3d(0,0,0);
        opacity:1;
        .inner{
            transition:all 0.4s linear;
            transform:rotate(0deg);
        }
    }
    <!-- 小球刚刚enter的状态和小球leave-active状态 -->
    &amp;.move-enter,&amp;.move-leave-active{
        transition:all 0.4s linear;
        transform:translate3d(24px,0,0);
        opacity:0;
        .inner{
            transform:rotate(180deg);
        }
    }

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>
1. 减少商品小球动画
    利用 vue transition 组件-过度动画 和 v-show 配合 可以给任何元素和组件添加 entering/leaving过度 
    条件渲染 （使用 v-if）
    条件展示 （使用v-show）
    动态组件
    组件根节点
    当插入或删除包含在 transition 组件中的元素时，Vue将做如下处理：
    1.自动嗅探目标元素是否应用了 css 过度或动画，如果是在恰当的时机添加/删除 css 类名
    2.如果过渡组件提供了 JavaScript钩子函数，这些钩子函数将在恰当的时机被调用
    3.如果没有找到钩子并且也没有检测到css动画，DOM操作（插入/删除）在下一帧中立即执行

    过度的 css 类名
    1. v-enter 定义进入过渡的开始状态，在元素插入式时生效，在下一帧移除
    2. v-enter-active 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除
    3. v-leave 定义离开过度的开始状态。在离开过渡被触发时生效，在下一帧移除
    4. v-leave-active 定义离开过渡的结束状态，在离开过渡被触发时生效，在下一帧被移除


    html:
    <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"move"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- 父元素用于控制小球 透明度变化 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"decrease"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"food.count&gt;0"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- 子元素用于控制小球旋转变化 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner icon-remove_circle_outline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>   
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>


    css：
    <span class="hljs-comment">&lt;!-- 小球enter之后最终结束时的状态 --&gt;</span>
    .decrease{
        transition:all 0.4s linear;
        transform:translate3d(0,0,0);
        opacity:1;
        .inner{
            transition:all 0.4s linear;
            transform:rotate(0deg);
        }
    }
    <span class="hljs-comment">&lt;!-- 小球刚刚enter的状态和小球leave-active状态 --&gt;</span>
    &amp;.move-enter,&amp;.move-leave-active{
        transition:all 0.4s linear;
        transform:translate3d(24px,0,0);
        opacity:0;
        .inner{
            transform:rotate(180deg);
        }
    }

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2. 增加小球动画

    实现过程：

    1、小球最终的落点都是一致的，在左下角购物车按钮处 （transform:translate(0,0,0)）

    2、传递点击的 dom 对象
        在 cartcontrol 组件里点击 + 时， 将点击的 dom 元素，通过通过 $emit 派发给父组件 goods.vue
        this.$emit('add',event.target);
        <div class=&quot;cart-wrapper&quot;>
            <!-- add自定义事件用于派发当前点击的dom元素，add为子组件方法，addFood为父组件方法 -->
            <cartcontrol :food=&quot;food&quot; @add=&quot;addFood&quot;></cartcontrol>
        </div>
        // 子组件$emit派发而来的事件
        addFood(target) {
            this._drop(target);  //传递 target
        },
        _drop(target) {
            // 体验优化,异步执行下落动画
            this.$nextTick(() => {
            //调用 shopcar 组件中的 drop 方法，向 shopcar组件 传入当前点击的 dom 对象
                this.$refs.shopcart.drop(target);
            });
        }

    3.在 shopcar 组件里，创建 小球 dom 结构

        <!-- 小球容器 -->
        <div class=&quot;ball-container&quot;>
            <div v-for=&quot;ball in balls&quot;>
                <!-- 过度钩子函数 -->
                <transition name=&quot;drop&quot; v-on:before-enter=&quot;beforeDrop&quot; v-on:enter=&quot;dropping&quot; v-on:after-enter=&quot;afterDrop&quot;>
                    <!--  外层纵向运动，内层横向运动-->
                    <div class=&quot;ball&quot; v-show=&quot;ball.show&quot;>
                        <div class=&quot;inner inner-hook&quot;></div>
                    </div>
                </transition>
            </div>
        </div>


    4. 创建 一个小球数组，内置5个对象（5个小球，均有 show 属性，初始值为false）
        以便在多次快速点击时，屏幕出现多个小球
        5个小球的初始位置 均在 左下角 购物车按钮处
        创建一个 dropBalls 数组用于存储 处在下落过程中的小球
        执行下落时 将 父组件传递过来的 dom 对象 当做一个属性 给 ball，方便 在下面的方法中计算 ball 的位置
        data() {
            return {
                // 创建5个小球用于动画
                balls:[{show:false},{show:false},{show:false},{show:false},{show:false}],
                dropBalls:[], // 存储下落小球
            }
        },
    5.执行 v-on:before-enter=&quot;beforeDrop&quot;  过度前钩子函数
        设置 ball 初始位置，计算处 初始位置与目标位置的 差值 x,y ，将小球 transform ：translate（x,y,0）到动画初始位置

    6.执行 v-on:enter=&quot;dropping&quot;  过度中钩子函数
        手动触发浏览器重绘，将 ball 通过 transform ：translate（0，0，0） 移动到目标位置

    7. 执行 v-on:after-enter=&quot;afterDrop&quot;  过度结束钩子函数
        从存储下落小球的数组里 unshift 当前小球
        并将当前小球 display:none; show:false

    8.样式
    .ball-container{
        //外层 做纵向运动
        .ball{
            position:fixed
            left:32px
            bottom:22px
            z-index:200
            //y 轴 贝塞尔曲线
            transition:all 2s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            //内从做横向运动
            .inner{
                width:16px
                height:16px
                border-radius:50%
                background-color:rgb(0,160,220)
                //x 轴只需要线性缓动
                transition:all 2s linear
            }
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-number">2.</span> 增加小球动画

    实现过程：

    <span class="hljs-number">1</span>、小球最终的落点都是一致的，在左下角购物车按钮处 （transform:translate(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)）

    <span class="hljs-number">2</span>、传递点击的 dom 对象
        在 cartcontrol 组件里点击 + 时， 将点击的 dom 元素，通过通过 $emit 派发给父组件 goods.vue
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'add'</span>,event.target);
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cart-wrapper"</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- add自定义事件用于派发当前点击的dom元素，add为子组件方法，addFood为父组件方法 --&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">cartcontrol</span> <span class="hljs-attr">:food</span>=<span class="hljs-string">"food"</span> @<span class="hljs-attr">add</span>=<span class="hljs-string">"addFood"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cartcontrol</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        <span class="hljs-comment">// 子组件$emit派发而来的事件</span>
        addFood(target) {
            <span class="hljs-keyword">this</span>._drop(target);  <span class="hljs-comment">//传递 target</span>
        },
        _drop(target) {
            <span class="hljs-comment">// 体验优化,异步执行下落动画</span>
            <span class="hljs-keyword">this</span>.$nextTick(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-comment">//调用 shopcar 组件中的 drop 方法，向 shopcar组件 传入当前点击的 dom 对象</span>
                <span class="hljs-keyword">this</span>.$refs.shopcart.drop(target);
            });
        }

    <span class="hljs-number">3.</span>在 shopcar 组件里，创建 小球 dom 结构

        &lt;!-- 小球容器 --&gt;
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball-container"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"ball in balls"</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 过度钩子函数 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"drop"</span> <span class="hljs-attr">v-on:before-enter</span>=<span class="hljs-string">"beforeDrop"</span> <span class="hljs-attr">v-on:enter</span>=<span class="hljs-string">"dropping"</span> <span class="hljs-attr">v-on:after-enter</span>=<span class="hljs-string">"afterDrop"</span>&gt;</span>
                    <span class="hljs-comment">&lt;!--  外层纵向运动，内层横向运动--&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ball"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"ball.show"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"inner inner-hook"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>


    <span class="hljs-number">4.</span> 创建 一个小球数组，内置<span class="hljs-number">5</span>个对象（<span class="hljs-number">5</span>个小球，均有 show 属性，初始值为<span class="hljs-literal">false</span>）
        以便在多次快速点击时，屏幕出现多个小球
        <span class="hljs-number">5</span>个小球的初始位置 均在 左下角 购物车按钮处
        创建一个 dropBalls 数组用于存储 处在下落过程中的小球
        执行下落时 将 父组件传递过来的 dom 对象 当做一个属性 给 ball，方便 在下面的方法中计算 ball 的位置
        data() {
            <span class="hljs-keyword">return</span> {
                <span class="hljs-comment">// 创建5个小球用于动画</span>
                balls:[{<span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>},{<span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>},{<span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>},{<span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>},{<span class="hljs-attr">show</span>:<span class="hljs-literal">false</span>}],
                <span class="hljs-attr">dropBalls</span>:[], <span class="hljs-comment">// 存储下落小球</span>
            }
        },
    <span class="hljs-number">5.</span>执行 v-on:before-enter=<span class="hljs-string">"beforeDrop"</span>  过度前钩子函数
        设置 ball 初始位置，计算处 初始位置与目标位置的 差值 x,y ，将小球 transform ：translate（x,y,<span class="hljs-number">0</span>）到动画初始位置

    <span class="hljs-number">6.</span>执行 v-on:enter=<span class="hljs-string">"dropping"</span>  过度中钩子函数
        手动触发浏览器重绘，将 ball 通过 transform ：translate（<span class="hljs-number">0</span>，<span class="hljs-number">0</span>，<span class="hljs-number">0</span>） 移动到目标位置

    <span class="hljs-number">7.</span> 执行 v-on:after-enter=<span class="hljs-string">"afterDrop"</span>  过度结束钩子函数
        从存储下落小球的数组里 unshift 当前小球
        并将当前小球 display:none; show:<span class="hljs-literal">false</span>

    <span class="hljs-number">8.</span>样式
    .ball-container{
        <span class="hljs-comment">//外层 做纵向运动</span>
        .ball{
            <span class="hljs-attr">position</span>:fixed
            left:<span class="hljs-number">32</span>px
            bottom:<span class="hljs-number">22</span>px
            z-index:<span class="hljs-number">200</span>
            <span class="hljs-comment">//y 轴 贝塞尔曲线</span>
            transition:all <span class="hljs-number">2</span>s cubic-bezier(<span class="hljs-number">0.49</span>, <span class="hljs-number">-0.29</span>, <span class="hljs-number">0.75</span>, <span class="hljs-number">0.41</span>)
            <span class="hljs-comment">//内从做横向运动</span>
            .inner{
                <span class="hljs-attr">width</span>:<span class="hljs-number">16</span>px
                height:<span class="hljs-number">16</span>px
                border-radius:<span class="hljs-number">50</span>%
                background-color:rgb(<span class="hljs-number">0</span>,<span class="hljs-number">160</span>,<span class="hljs-number">220</span>)
                <span class="hljs-comment">//x 轴只需要线性缓动</span>
                transition:all <span class="hljs-number">2</span>s linear
            }
        }
</code></pre>
<blockquote>购物车列表的显示隐藏状态</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    按钮控制 fold => fold 控制 => listShow ， listShow => 控制状态显示 (在totalCount>0)
    在 data 选项里，定义一个 fold（折叠，true） 控制购物车的显示隐藏状态
    在 computed 计算属性里，定义一个 listshow 方法，来表示购物车列表的显示隐藏状态

    listShow() {
        if(!this.totalCount){  //假如所选商品为 0 ，return 掉结果，并将 fold 置为初始值
            this.fold = true;
            return false;
        }
        let show = !this.fold; // 否则，取 fold 的反值，靠 fold 的变化来 决定 列表显示与否
        return show;
    }

    在 method 方法里有个 toggleList 方法控制 fold 状态
    toggleList(){
        if(!this.totalCount){
            return;
        }
        this.fold = !this.fold;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    按钮控制 fold =&gt; fold 控制 =&gt; listShow ， listShow =&gt; 控制状态显示 (在totalCount&gt;<span class="hljs-number">0</span>)
    在 <span class="hljs-keyword">data</span> 选项里，定义一个 fold（折叠，<span class="hljs-literal">true</span>） 控制购物车的显示隐藏状态
    在 computed 计算属性里，定义一个 listshow 方法，来表示购物车列表的显示隐藏状态

    listShow() {
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.totalCount){  <span class="hljs-comment">//假如所选商品为 0 ，return 掉结果，并将 fold 置为初始值</span>
            <span class="hljs-keyword">this</span>.fold = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        let show = !<span class="hljs-keyword">this</span>.fold; <span class="hljs-comment">// 否则，取 fold 的反值，靠 fold 的变化来 决定 列表显示与否</span>
        <span class="hljs-keyword">return</span> show;
    }

    在 method 方法里有个 toggleList 方法控制 fold 状态
    toggleList(){
        <span class="hljs-keyword">if</span>(!<span class="hljs-keyword">this</span>.totalCount){
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">this</span>.fold = !<span class="hljs-keyword">this</span>.fold;
    },</code></pre>
<blockquote>详情页组件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    将选中的商品 通过 props 传给 子组件
    <food @add=&quot;addFood&quot; :food=&quot;seeFoodinfo&quot; ref=&quot;food&quot;></food>
    food 组件 通过 $emit 将food 组件添加购物车按钮传递给 父组件 以便实现小球动画

    addFood(target){
        console.log(target);
        //当前组件必须在父组件 引入处，bangding @add=&quot;xxx&quot;,继而执行 父组件的 xxx 方法
        this.$emit('add',target);
    },

    详情页 过渡动画
    <transition name=&quot;fade&quot; ></transition>

    &amp;.fly-enter-active, &amp;.fly-leave-active {
        transition: all 0.2s linear
    }
    &amp;.fly-enter, &amp;.fly-leave-active {
        transform: translate3d(100%, 0, 0)
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    将选中的商品 通过 props 传给 子组件
    &lt;food @add=<span class="hljs-string">"addFood"</span> :food=<span class="hljs-string">"seeFoodinfo"</span> ref=<span class="hljs-string">"food"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">food</span>&gt;</span></span>
    food 组件 通过 $emit 将food 组件添加购物车按钮传递给 父组件 以便实现小球动画

    addFood(target){
        <span class="hljs-built_in">console</span>.log(target);
        <span class="hljs-comment">//当前组件必须在父组件 引入处，bangding @add="xxx",继而执行 父组件的 xxx 方法</span>
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'add'</span>,target);
    },

    详情页 过渡动画
    &lt;transition name=<span class="hljs-string">"fade"</span> &gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span>

    &amp;.fly-enter-active, &amp;.fly-leave-active {
        <span class="hljs-attr">transition</span>: all <span class="hljs-number">0.2</span>s linear
    }
    &amp;.fly-enter, &amp;.fly-leave-active {
        <span class="hljs-attr">transform</span>: translate3d(<span class="hljs-number">100</span>%, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
    }
</code></pre>
<blockquote>ratingselect 组件（评价选择组件）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    1. 评价组件
    全部、推荐、吐槽 类似一个 tab 选项卡的栏目
    只看有内容的评价 筛选
    因为整个项目会有两个地方有这个东西，所以将其抽象为 ratingselect 组件

    组件书写：
    上边是一个 tab 选项卡
    1. 定义 三个常量 代表这三种状态
        const Positive = 0;     //推荐
        const Negative = 1;     //吐槽
        const All = 2;          //全部

        <div class=&quot;rating-type border-1px&quot;>
            <span @click=&quot;select(2,$event)&quot; class=&quot;block positive&quot; :class=&quot;{'active':selectType===2}&quot;>"{{"desc.all"}}" <span class=&quot;count&quot;>"{{"ratings.length"}}"</span></span>
        </div>
        在点击事件中，将这三个状态，发送给 父组件
        由于这 三个选项 的 选中状态，是由父组件（food.vue）父组件通过 props 传递过来的，所以不可以在子组件中修改

        select(type,event){
            if(!event._constructed){
                return;
            }
            //不可以在子组件内，随意改变父组件传过来的值，通过 $emit 将子组件需要改变的值，发送给父组件，然后父组件在通过 props 传给 子组件，然后 view 就会发生相应的改变
            this.$emit('select',type);
        }


        父组件：
            使用子组件
            <ratingselect
                @select=&quot;selectRating&quot;
                @onlyContent=&quot;toggleContent&quot;
                :ratings=&quot;food.ratings&quot;
                :selectType=&quot;selectType&quot;
                :onlyContent=&quot;onlyContent&quot;
                :desc=&quot;desc&quot;
            ></ratingselect>
            
            //在 父组件 methods 对象中 用 selectRating 方法接收子组件 emit 过来的值，赋值给 父组件 selectType 然后在通过 props传递给子组件，从而实现改变
            selectRating(type){
                this.selectType = type;
                this.$nextTick(()=> {
                    this.scroll.refresh();
                })
            },

            //只看有内容的 评价 也是同理 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>    <span class="hljs-number">1.</span> 评价组件
    全部、推荐、吐槽 类似一个 tab 选项卡的栏目
    只看有内容的评价 筛选
    因为整个项目会有两个地方有这个东西，所以将其抽象为 ratingselect 组件

    组件书写：
    上边是一个 tab 选项卡
    <span class="hljs-number">1.</span> 定义 三个常量 代表这三种状态
        const <span class="hljs-type">Positive</span> = <span class="hljs-number">0</span>;     <span class="hljs-comment">//推荐</span>
        const <span class="hljs-type">Negative</span> = <span class="hljs-number">1</span>;     <span class="hljs-comment">//吐槽</span>
        const <span class="hljs-type">All</span> = <span class="hljs-number">2</span>;          <span class="hljs-comment">//全部</span>

        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"rating-type border-1px"</span>&gt;
            &lt;span <span class="hljs-meta">@click</span>=<span class="hljs-string">"select(2,$event)"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"block positive"</span> :<span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"{'active':selectType===2}"</span>&gt;"{{"desc.all"}}" &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"count"</span>&gt;"{{"ratings.length"}}"&lt;/span&gt;&lt;/span&gt;
        &lt;/div&gt;
        在点击事件中，将这三个状态，发送给 父组件
        由于这 三个选项 的 选中状态，是由父组件（food.vue）父组件通过 props 传递过来的，所以不可以在子组件中修改

        select(<span class="hljs-class"><span class="hljs-keyword">type</span>,<span class="hljs-title">event</span>)</span>{
            <span class="hljs-keyword">if</span>(!event._constructed){
                <span class="hljs-keyword">return</span>;
            }
            <span class="hljs-comment">//不可以在子组件内，随意改变父组件传过来的值，通过 $emit 将子组件需要改变的值，发送给父组件，然后父组件在通过 props 传给 子组件，然后 view 就会发生相应的改变</span>
            <span class="hljs-keyword">this</span>.$emit(<span class="hljs-symbol">'selec</span>t',<span class="hljs-class"><span class="hljs-keyword">type</span>)</span>;
        }


        父组件：
            使用子组件
            &lt;ratingselect
                <span class="hljs-meta">@select</span>=<span class="hljs-string">"selectRating"</span>
                <span class="hljs-meta">@onlyContent</span>=<span class="hljs-string">"toggleContent"</span>
                :ratings=<span class="hljs-string">"food.ratings"</span>
                :selectType=<span class="hljs-string">"selectType"</span>
                :onlyContent=<span class="hljs-string">"onlyContent"</span>
                :desc=<span class="hljs-string">"desc"</span>
            &gt;&lt;/ratingselect&gt;
            
            <span class="hljs-comment">//在 父组件 methods 对象中 用 selectRating 方法接收子组件 emit 过来的值，赋值给 父组件 selectType 然后在通过 props传递给子组件，从而实现改变</span>
            selectRating(<span class="hljs-class"><span class="hljs-keyword">type</span>)</span>{
                <span class="hljs-keyword">this</span>.selectType = <span class="hljs-class"><span class="hljs-keyword">type</span></span>;
                <span class="hljs-keyword">this</span>.$nextTick(()=&gt; {
                    <span class="hljs-keyword">this</span>.scroll.refresh();
                })
            },

            <span class="hljs-comment">//只看有内容的 评价 也是同理 </span>
</code></pre>
<blockquote>food.vue 组件中的时间转换函数</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    在 common 目录下创建一个公共工具函数 utils.js ,然后在需要用到的 组件中，进行 import 引入 

    utils.js
        export 
            function formatDate(fmt){
                ......
            }


    在 food 组件中使用,只需用 import 引入要使用到的 方法 即可
    import { format } from 'common/js/utils'
    在组件中即可直接使用 该方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    在 common 目录下创建一个公共工具函数 utils.js ,然后在需要用到的 组件中，进行 <span class="hljs-keyword">import</span> 引入 

    utils.js
        <span class="hljs-keyword">export</span> 
            function formatDate(fmt){
                ......
            }


    在 food 组件中使用,只需用 <span class="hljs-keyword">import</span> 引入要使用到的 方法 即可
    <span class="hljs-keyword">import</span> { format } <span class="hljs-keyword">from</span> <span class="hljs-string">'common/js/utils'</span>
    在组件中即可直接使用 该方法</code></pre>
<blockquote>　food.vue 里这种列表布局</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    上下左右的间距，用 padding 撑开
    左边 用 flex 给个固定的尺寸 flex: 0 0 28px
    右侧 用 flex:1 ，右侧剩余空间 自动充满
    然后右侧内容自然流布局，上下 margin 分配
    右侧时间采用绝对定位
    布局：清晰简单明了
    
    一般情况下：列表中文字垂直居中的布局一般用 上下 padding 撑开，不要直接设置高度，用line-height居中
    文字高度用 line-height 撑开" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    上下左右的间距，用 <span class="hljs-attribute">padding</span> 撑开
    左边 用 <span class="hljs-attribute">flex</span> 给个固定的尺寸 flex: <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">28px</span>
    右侧 用 <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span> ，右侧剩余空间 自动充满
    然后右侧内容自然流布局，上下 <span class="hljs-attribute">margin</span> 分配
    右侧时间采用绝对定位
    布局：清晰简单明了
    
    一般情况下：列表中文字垂直居中的布局一般用 上下 <span class="hljs-attribute">padding</span> 撑开，不要直接设置高度，用line-height居中
    文字高度用 <span class="hljs-attribute">line-height</span> 撑开</code></pre>
<blockquote>商家页面(seller.vue) 商家实景页面</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    商家实景左右滚动列表图片
    
    先根据图片尺寸和左右 margin 计算出 list 列表容器的 宽度，然后 用 better-scroll 进行左右滚动

    一般情况下，要在 vue mounted 之后就可以初始化 better-scroll 
    但是这时候，图片资源还没有请求到，所以无法得知 图片的 pics 的 length，继而无法得知，列表容器的宽度

    解决办法：
    vue 提供了一个 watch 对象，来用来监测数据的变化
    当 watch 监测到 seller 数据的变化，然后调用 _initPicScroll，初始化 better-scroll 
    watch:{
        'seller'(){
            this.$nextTick(()=>{
                this._initPicScroll();
            })
        }
    },
    methods:{
        _initPicScroll() {
            if(this.seller.pics){
                let picWidth = 120;
                let margin = 6;
                let width = this.seller.pics.length * (picWidth + margin) - margin;
                this.$refs.picList.style.width = width + 'px';
                
                //better-scroll左右滚动
                this.picScroll = new BScroll(this.$refs.picWrapper,{
                    scrollX: true,
                    eventPassthrough: 'vertical'
                })
            }
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    商家实景左右滚动列表图片
    
    先根据图片尺寸和左右 margin 计算出 list 列表容器的 宽度，然后 用 better-scroll 进行左右滚动

    一般情况下，要在 vue mounted 之后就可以初始化 better-scroll 
    但是这时候，图片资源还没有请求到，所以无法得知 图片的 pics 的 length，继而无法得知，列表容器的宽度

    解决办法：
    vue 提供了一个 watch 对象，来用来监测数据的变化
    当 watch 监测到 seller 数据的变化，然后调用 _initPicScroll，初始化 better-scroll 
    watch:{
        <span class="hljs-string">'seller'</span>(){
            <span class="hljs-keyword">this</span>.$nextTick(()=&gt;{
                <span class="hljs-keyword">this</span>._initPicScroll();
            })
        }
    },
    methods:{
        _initPicScroll() {
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.seller.pics){
                let picWidth = <span class="hljs-number">120</span>;
                let margin = <span class="hljs-number">6</span>;
                let width = <span class="hljs-keyword">this</span>.seller.pics.length * (picWidth + margin) - margin;
                <span class="hljs-keyword">this</span>.$refs.picList.style.width = width + <span class="hljs-string">'px'</span>;
                
                <span class="hljs-comment">//better-scroll左右滚动</span>
                <span class="hljs-keyword">this</span>.picScroll = new BScroll(<span class="hljs-keyword">this</span>.$refs.picWrapper,{
                    scrollX: <span class="hljs-literal">true</span>,
                    eventPassthrough: <span class="hljs-string">'vertical'</span>
                })
            }
        }
    }
</code></pre>
<blockquote>　 利用localStorage 在本地收藏商家</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    收藏商家是放在本地缓存 localStorage 里的

    #１.　在　common/js/utils 文件里创建两个公共函数函数 写入 localStorae 和 读取 localStorage 
    # 2.  在点击收藏按钮时，调用存储 方法，首次进入页面时，调用 读取方法

    由于 确定收藏与否的 favorite 属性，是在 data 选项上被vue监测的，所以在data 选项上 favorite 是一个立即执行函数

    data:{
        favorite: ( () => {
            // 要读取的对象，key值，默认值
            return loadFromLocal(this.seller.id, 'favorite', false);    
        } )()
    }  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>    收藏商家是放在本地缓存 localStorage 里的

    <span class="hljs-comment">#１.　在　common/js/utils 文件里创建两个公共函数函数 写入 localStorae 和 读取 localStorage </span>
    <span class="hljs-comment"># 2.  在点击收藏按钮时，调用存储 方法，首次进入页面时，调用 读取方法</span>

    由于 确定收藏与否的 favorite 属性，是在 data 选项上被vue监测的，所以在data 选项上 favorite 是一个立即执行函数

    data:{
        favorite: <span class="hljs-function"><span class="hljs-params">( () =&gt; {
            <span class="hljs-regexp">//</span> 要读取的对象，key值，默认值
            <span class="hljs-keyword">return</span> loadFromLocal(<span class="hljs-keyword">this</span>.seller.id, <span class="hljs-string">'favorite'</span>, <span class="hljs-literal">false</span>);    
        } )()</span>
    }  </span></code></pre>
<blockquote>路由切换时，各组件会保持原来的状态</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    # 在路由外连上加上  <keep-alive> 即可
    <!-- 路由外链 -->
        <keep-alive>
            <router-view :seller=&quot;seller&quot;></router-view>
        </keep-alive>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    # 在路由外连上加上  <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span> 即可
    <span class="hljs-comment">&lt;!-- 路由外链 --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">keep-alive</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span> <span class="hljs-attr">:seller</span>=<span class="hljs-string">"seller"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">keep-alive</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
慕课网 饿了么 vue2.0 项目

## 原文链接
[https://segmentfault.com/a/1190000010263373](https://segmentfault.com/a/1190000010263373)

