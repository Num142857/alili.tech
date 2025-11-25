---
title: 'Vue初探——Vue是什么' 
date: 2019-01-25 2:30:23
hidden: true
slug: 2pfrcbidnxp
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/hekui-github/learnVUE/tree/master/001-Jquery-VS-Vue" rel="nofollow noreferrer" target="_blank">本文代码下载地址</a></p>
<h2 id="articleHeader0">概述</h2>
<h5>前端开发近况</h5>
<ul>
<li><p>需求依然旺盛，从JavaScript已经在编程语言排行榜上排到了第七位和前端聘岗位数就可以看出。</p></li>
<li><p>加入前端开发的新手越来越多，其中女孩子比例不少，自学能力稍有匮乏</p></li>
<li><p>前端框架层出不穷，部分前端开发精力跟不上</p></li>
<li><p>作为一名码农最急需的是精通一门语言一个框架，然后再横向去尽量多学一些技术，有助于融会贯通，专业精通才有高收入。</p></li>
</ul>
<h5>写这个博客的目的</h5>
<ul>
<li><p>希望能通过写博客分享的方式更好的学习Vue和其它前端技术</p></li>
<li><p>希望能帮助到更多的同学更快速的学习Vue和其它前端技术</p></li>
<li><p>希望能赚点零花钱，如果你觉得我的文章帮助到了你，请在文章最下面点打赏按钮打赏我。打赏过的同学加我qq:791831347,我拉你进我建的Vue交流群算是小小的回报吧，你在群里问的问题都会尽量得到解答，但不做任何承诺。</p></li>
<li><p>未来也可能计划出一套视频教程</p></li>
<li><p>让我们一起走在Vue进阶的路上吧.(这个博客我会尽量说人话少说专业术语)</p></li>
</ul>
<h2 id="articleHeader1">Vue简述</h2>
<p>长期以来，前端都是Jquery为王这样一个状态，虽然从业时间比较长的前沿的前端开发者可能都已经接触至少十多个框架了，但是大多数年轻的开发者可能都还只是对Jquery这样的万金油更熟悉一些，下面我会用几个小例子来说明Jquery开发和Vue这样的Mvvm框架开发模式上的不同。</p>
<h5>用一个简单的例子来说明编写Jquery和Vue上的不同</h5>
<h6>demo1 简单修改文字</h6>
<ul><li><p>点击按钮后：<br>把hello，美女！欢迎学习Angular.</p></li></ul>
<p>改为<br> hello，帅哥！欢迎学习Vue.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008559128" src="https://static.alili.tech/img/remote/1460000008559128" alt="屏幕快照 2017-02-27 22.48.32.png" title="屏幕快照 2017-02-27 22.48.32.png" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>jquery代码(用以下代码直接替换掉html文件中的body,看不懂没关系后面会详细说道Vue的方方面面)</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <p>Hello, <span id=&quot;name&quot;>美女</span>!</p>
    <p>欢迎学习 <span id=&quot;libName&quot;>Angular</span>.</p>
    <button id = &quot;modifyBtn&quot;>修改</button>
</div>

<script src=&quot;https://unpkg.com/jquery&quot;></script>
<script type=&quot;text/javascript&quot;>
    $(&quot;#modifyBtn&quot;).click(function(){
        $(&quot;#name&quot;).text(&quot;帅哥&quot;);
        $(&quot;#libName&quot;).text(&quot;Vue&quot;);
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello, <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name"</span>&gt;</span>美女<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>欢迎学习 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"libName"</span>&gt;</span>Angular<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span> = <span class="hljs-string">"modifyBtn"</span>&gt;</span>修改<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/jquery"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#modifyBtn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        $(<span class="hljs-string">"#name"</span>).text(<span class="hljs-string">"帅哥"</span>);
        $(<span class="hljs-string">"#libName"</span>).text(<span class="hljs-string">"Vue"</span>);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li><p>Vue代码</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;mycontent&quot;>
    <p>Hello, <span >"{{"name"}}"</span>!</p>
    <p>欢迎学习 <span >"{{"libName"}}"</span>.</p>
    <button v-on:click=&quot;modifyInfo&quot; >修改</button>
</div>

<script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;></script>
<script type=&quot;text/javascript&quot;>
    var vm = new Vue({
        el: &quot;#mycontent&quot;,
        data:{
            name:&quot;美女&quot;,
            libName:&quot;Angular&quot;
        },
        methods:{
            modifyInfo:function(){
                this.name = &quot;帅哥&quot;;
                this.libName = &quot;Vue&quot;;
            }
        }
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mycontent"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello, <span class="hljs-tag">&lt;<span class="hljs-name">span</span> &gt;</span></span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>欢迎学习 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> &gt;</span></span><span class="hljs-template-variable">"{{"libName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"modifyInfo"</span> &gt;</span>修改<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
        el: <span class="hljs-string">"#mycontent"</span>,
        data:{
            name:<span class="hljs-string">"美女"</span>,
            libName:<span class="hljs-string">"Angular"</span>
        },
        methods:{
            modifyInfo:<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
                <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"帅哥"</span>;
                <span class="hljs-keyword">this</span>.libName = <span class="hljs-string">"Vue"</span>;
            }
        }
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<ul>
<li><p>tips 1  Jquery首先要获取到dom对象，然后对dom对象进行进行值的修改等操作；</p></li>
<li><p>tips 2. Vue是首先把值和js对象进行绑定，然后修改js对象的值，Vue框架就会自动把dom的值就行更新。</p></li>
<li><p>tips 3. 可以简单的理解为Vue帮我们做了dom操作，我们以后用Vue就需要修改对象的值和做好元素和对象的绑定，Vue这个框架就会自动帮我们做好dom的相关操作。</p></li>
<li><p>tips 4.这种dom元素跟随JS对象值的变化而变化叫做单向数据绑定，如果JS对象的值也跟随着dom元素的值的变化而变化就叫做双向数据绑定，顾名思义单向和双向?，后面会详细介绍。</p></li>
</ul>
<h5>用一个更复杂的例子来说明Vue的优势</h5>
<h6>demo2-模拟一个简易购物车</h6>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008559129" src="https://static.alili.tech/img/remote/1460000008559129" alt="QQ20170303-144554@2x.png" title="QQ20170303-144554@2x.png" style="cursor: pointer; display: inline;"></span><br>下面只是展示下两种框架写出来的代码，感兴趣的同学可以把代码下下来。<br>-Vue代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;cart_item&quot;>
    <!-- v-for 可以根据Vue中myListArr数组的长度来生成div,其中item和index分别是每一项的值和索引 -->
     <div class=&quot;item_i&quot; v-for=&quot;(item,index) in myListArr&quot;>
        <div class=&quot;checkbox&quot;  >
            <!-- v-on:click绑定了check点击方法,传入了index这个参数，它是数组当前的索引，在外层div的v-for中定义过 -->
            <input type=&quot;checkbox&quot; class=&quot;checkOne check&quot; v-model=&quot;item.isChecked&quot;  v-on:click=&quot;check(index)&quot;/></div>
        <div class=&quot;good&quot;>
            <!-- 绑定了图片的地址和商品的名称,:src 是v-bind:src的简写,只要是html元素的属性值都可以用v-bind指令 -->
            <img :src =&quot;item.pic&quot;  />
            <span>"{{"item.name"}}"</span></div>
        <div class=&quot;price&quot;>"{{"item.price"}}"</div>
        <div class=&quot;count&quot;>
            <!-- @click 是v-on:click的简写,这里特意展示一下 -->
            <span class=&quot;reduce&quot; @click=&quot;reduce(index)&quot;>-</span>
            <input type=&quot;text&quot; class=&quot;count_input&quot; v-model=&quot;item.num&quot; />
            <span class=&quot;add&quot; v-on:click=&quot;add(index)&quot;>+</span></div>
        <!-- 这里每一行商品总价是价格*数量，四舍五入保留两位小数 -->
        <div class=&quot;subTotal&quot;>"{{"(item.price* item.num).toFixed(2)"}}"</div>
        <div class=&quot;act&quot;>
            <span class=&quot;delete&quot; @click= &quot;remove(index)&quot;>删除</span></div>
    </div>
</div>

var vm = new Vue({
    el: &quot;#cart&quot;,
    data:{
         myListArr : [
                            {
                                name:&quot;【三只松鼠_小贱拉面丸子85gx3】休闲零食膨化小吃干脆面串烧味&quot;,
                                pic:&quot;https://gw.alicdn.com/bao/uploaded/i1/TB16tk_KpXXXXX7XVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                                price:22.8,
                                num:2,
                                isChecked:true,

                            },
                            {
                                name:&quot;【三只松鼠_炭烧腰果185gx2袋】坚果零食特产炒货干果腰果仁&quot;,
                                pic:&quot;https://gw.alicdn.com/bao/uploaded/i2/TB1372RKXXXXXXnXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                                price:42,
                                num:1,
                                isChecked:true,
                            },
                            {
                                name:&quot;【三只松鼠_皇族牌牛奶夹心饼240g】台湾进口休闲零食夹心饼干&quot;,
                                pic:&quot;https://gw.alicdn.com/bao/uploaded/i3/TB1UK3uOVXXXXaiaXXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                                price:15.5,
                                num:3,
                                isChecked:true,

                            },
                            {
                                name:&quot;【三只松鼠_碧根果210gx2袋】零食坚果山核桃长寿果干果奶油味&quot;,
                                pic:&quot;https://gw.alicdn.com/bao/uploaded/i2/TB1eTzgJVXXXXcIXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                                price:18.9,
                                num:1,
                                isChecked:true,

                            }],
         //这三个属性分别绑定的是所有商品数量、总价格、时候全选
         totalCount:0,
         totalPrice:0,
         allCheck:true,
    },
    mounted: function () {
        //这里是vue初始化完成后执行的函数,注意vue1.x版本是ready方法,如无特别说明本人使用的都是Vue2.x
        this.calTotal();
    },
    methods:{
        //每一行增加商品的方法,根据索引值修改这一项对应的数据源的值就可以了，Vue会帮你自动更新dom中相关的值
        add:function(index){
            var item = this.myListArr[index];
            item.num +=1;
            //计算总价和总件数
            this.calTotal();
        },
        //减商品
        reduce:function(index){
            var item = this.myListArr[index];
            //如果商品只有1件就不允许再减了，只能删除
            if (item.num == 1) {
                return;
            }
            item.num -= 1;
            this.calTotal();
        },
        //删除本行商品
        remove:function(index) {
            //splice 是array的批量删除方法
            this.myListArr.splice(index,1);
            this.calTotal();
        },
        //单行的checkbox选中
        check:function(index){
            var listItem = this.myListArr[index];
            this.calTotal();
            if (!listItem.isChecked) {
                //如果没有选中状态肯定是没有全选
                this.allCheck = false;
            }else {
                //如果是选中状态先把全选选中，然后再每一项遍历，如果有一项没有选中就改为非全选状态
                this.allCheck = true;

                for (var i = 0; i < this.myListArr.length; i++) {
                    var listItem1 = this.myListArr[i];
                    if (!listItem1.isChecked) {
                        this.allCheck = false;
                    }
                }
            }
        },
        //全选checkbox事件
        allCheckMethod:function(){
            //全选只需要所有的列表都跟全选状态是同一个状态就可以
            for (var i = 0; i < this.myListArr.length; i++) {
                var listItem = this.myListArr[i];
                listItem.isChecked = this.allCheck;
            }
            this.calTotal();
        },
        //计算总数
        calTotal:function(){
            //计算总件数
            this.calTotalCount();
            //计算总价格
            this.calTotalPrice();
        },
        //计算总件数
        calTotalCount: function () {
            var count = 0;
            for (var i = 0; i < this.myListArr.length; i++) {
                var listItem = this.myListArr[i];
                if (listItem.isChecked) {
                    count += listItem.num;
                }
            }
              this.totalCount = count;
        },
        //计算总价格
        calTotalPrice: function () {
            var price = 0.0;
            for (var i = 0; i < this.myListArr.length; i++) {
                var listItem = this.myListArr[i];
                if (listItem.isChecked) {
                     price = price + listItem.num * listItem.price;
                }
            }
            this.totalPrice = price;
        }
    },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>&lt;div id=<span class="hljs-string">"cart_item"</span>&gt;
    &lt;!-- v-<span class="hljs-keyword">for</span> 可以根据<span class="hljs-type">Vue</span>中myListArr数组的长度来生成div,其中item和index分别是每一项的值和索引 --&gt;
     &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item_i"</span> v-<span class="hljs-keyword">for</span>=<span class="hljs-string">"(item,index) in myListArr"</span>&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"checkbox"</span>  &gt;
            &lt;!-- v-on:click绑定了check点击方法,传入了index这个参数，它是数组当前的索引，在外层div的v-<span class="hljs-keyword">for</span>中定义过 --&gt;
            &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"checkOne check"</span> v-model=<span class="hljs-string">"item.isChecked"</span>  v-on:click=<span class="hljs-string">"check(index)"</span>/&gt;&lt;/div&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"good"</span>&gt;
            &lt;!-- 绑定了图片的地址和商品的名称,:src 是v-bind:src的简写,只要是html元素的属性值都可以用v-bind指令 --&gt;
            &lt;img :src =<span class="hljs-string">"item.pic"</span>  /&gt;
            &lt;span&gt;"{{"item.name"}}"&lt;/span&gt;&lt;/div&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"price"</span>&gt;"{{"item.price"}}"&lt;/div&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"count"</span>&gt;
            &lt;!-- <span class="hljs-meta">@click</span> 是v-on:click的简写,这里特意展示一下 --&gt;
            &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"reduce"</span> <span class="hljs-meta">@click</span>=<span class="hljs-string">"reduce(index)"</span>&gt;-&lt;/span&gt;
            &lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"count_input"</span> v-model=<span class="hljs-string">"item.num"</span> /&gt;
            &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"add"</span> v-on:click=<span class="hljs-string">"add(index)"</span>&gt;+&lt;/span&gt;&lt;/div&gt;
        &lt;!-- 这里每一行商品总价是价格*数量，四舍五入保留两位小数 --&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"subTotal"</span>&gt;"{{"(item.price* item.num).toFixed(<span class="hljs-number">2</span>)"}}"&lt;/div&gt;
        &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"act"</span>&gt;
            &lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"delete"</span> <span class="hljs-meta">@click</span>= <span class="hljs-string">"remove(index)"</span>&gt;删除&lt;/span&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;

<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> <span class="hljs-type">Vue</span>({
    el: <span class="hljs-string">"#cart"</span>,
    data:{
         myListArr : [
                            {
                                name:<span class="hljs-string">"【三只松鼠_小贱拉面丸子85gx3】休闲零食膨化小吃干脆面串烧味"</span>,
                                pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i1/TB16tk_KpXXXXX7XVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                                price:<span class="hljs-number">22.8</span>,
                                num:<span class="hljs-number">2</span>,
                                isChecked:<span class="hljs-literal">true</span>,

                            },
                            {
                                name:<span class="hljs-string">"【三只松鼠_炭烧腰果185gx2袋】坚果零食特产炒货干果腰果仁"</span>,
                                pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i2/TB1372RKXXXXXXnXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                                price:<span class="hljs-number">42</span>,
                                num:<span class="hljs-number">1</span>,
                                isChecked:<span class="hljs-literal">true</span>,
                            },
                            {
                                name:<span class="hljs-string">"【三只松鼠_皇族牌牛奶夹心饼240g】台湾进口休闲零食夹心饼干"</span>,
                                pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i3/TB1UK3uOVXXXXaiaXXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                                price:<span class="hljs-number">15.5</span>,
                                num:<span class="hljs-number">3</span>,
                                isChecked:<span class="hljs-literal">true</span>,

                            },
                            {
                                name:<span class="hljs-string">"【三只松鼠_碧根果210gx2袋】零食坚果山核桃长寿果干果奶油味"</span>,
                                pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i2/TB1eTzgJVXXXXcIXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                                price:<span class="hljs-number">18.9</span>,
                                num:<span class="hljs-number">1</span>,
                                isChecked:<span class="hljs-literal">true</span>,

                            }],
         <span class="hljs-comment">//这三个属性分别绑定的是所有商品数量、总价格、时候全选</span>
         totalCount:<span class="hljs-number">0</span>,
         totalPrice:<span class="hljs-number">0</span>,
         allCheck:<span class="hljs-literal">true</span>,
    },
    mounted: function () {
        <span class="hljs-comment">//这里是vue初始化完成后执行的函数,注意vue1.x版本是ready方法,如无特别说明本人使用的都是Vue2.x</span>
        <span class="hljs-keyword">this</span>.calTotal();
    },
    methods:{
        <span class="hljs-comment">//每一行增加商品的方法,根据索引值修改这一项对应的数据源的值就可以了，Vue会帮你自动更新dom中相关的值</span>
        add:function(index){
            <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">this</span>.myListArr[index];
            item.num +=<span class="hljs-number">1</span>;
            <span class="hljs-comment">//计算总价和总件数</span>
            <span class="hljs-keyword">this</span>.calTotal();
        },
        <span class="hljs-comment">//减商品</span>
        reduce:function(index){
            <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">this</span>.myListArr[index];
            <span class="hljs-comment">//如果商品只有1件就不允许再减了，只能删除</span>
            <span class="hljs-keyword">if</span> (item.num == <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">return</span>;
            }
            item.num -= <span class="hljs-number">1</span>;
            <span class="hljs-keyword">this</span>.calTotal();
        },
        <span class="hljs-comment">//删除本行商品</span>
        remove:function(index) {
            <span class="hljs-comment">//splice 是array的批量删除方法</span>
            <span class="hljs-keyword">this</span>.myListArr.splice(index,<span class="hljs-number">1</span>);
            <span class="hljs-keyword">this</span>.calTotal();
        },
        <span class="hljs-comment">//单行的checkbox选中</span>
        check:function(index){
            <span class="hljs-keyword">var</span> listItem = <span class="hljs-keyword">this</span>.myListArr[index];
            <span class="hljs-keyword">this</span>.calTotal();
            <span class="hljs-keyword">if</span> (!listItem.isChecked) {
                <span class="hljs-comment">//如果没有选中状态肯定是没有全选</span>
                <span class="hljs-keyword">this</span>.allCheck = <span class="hljs-literal">false</span>;
            }<span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//如果是选中状态先把全选选中，然后再每一项遍历，如果有一项没有选中就改为非全选状态</span>
                <span class="hljs-keyword">this</span>.allCheck = <span class="hljs-literal">true</span>;

                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.myListArr.length; i++) {
                    <span class="hljs-keyword">var</span> listItem1 = <span class="hljs-keyword">this</span>.myListArr[i];
                    <span class="hljs-keyword">if</span> (!listItem1.isChecked) {
                        <span class="hljs-keyword">this</span>.allCheck = <span class="hljs-literal">false</span>;
                    }
                }
            }
        },
        <span class="hljs-comment">//全选checkbox事件</span>
        allCheckMethod:function(){
            <span class="hljs-comment">//全选只需要所有的列表都跟全选状态是同一个状态就可以</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.myListArr.length; i++) {
                <span class="hljs-keyword">var</span> listItem = <span class="hljs-keyword">this</span>.myListArr[i];
                listItem.isChecked = <span class="hljs-keyword">this</span>.allCheck;
            }
            <span class="hljs-keyword">this</span>.calTotal();
        },
        <span class="hljs-comment">//计算总数</span>
        calTotal:function(){
            <span class="hljs-comment">//计算总件数</span>
            <span class="hljs-keyword">this</span>.calTotalCount();
            <span class="hljs-comment">//计算总价格</span>
            <span class="hljs-keyword">this</span>.calTotalPrice();
        },
        <span class="hljs-comment">//计算总件数</span>
        calTotalCount: function () {
            <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.myListArr.length; i++) {
                <span class="hljs-keyword">var</span> listItem = <span class="hljs-keyword">this</span>.myListArr[i];
                <span class="hljs-keyword">if</span> (listItem.isChecked) {
                    count += listItem.num;
                }
            }
              <span class="hljs-keyword">this</span>.totalCount = count;
        },
        <span class="hljs-comment">//计算总价格</span>
        calTotalPrice: function () {
            <span class="hljs-keyword">var</span> price = <span class="hljs-number">0.0</span>;
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.myListArr.length; i++) {
                <span class="hljs-keyword">var</span> listItem = <span class="hljs-keyword">this</span>.myListArr[i];
                <span class="hljs-keyword">if</span> (listItem.isChecked) {
                     price = price + listItem.num * listItem.price;
                }
            }
            <span class="hljs-keyword">this</span>.totalPrice = price;
        }
    },
});</code></pre>
<ul><li><p>Jquery代码</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(function(){
        //这里模拟数据，实际中是ajax请求网络数据，并没有太大差异
        var myListArr = [{
                            name:&quot;【三只松鼠_小贱拉面丸子85gx3】休闲零食膨化小吃干脆面串烧味&quot;,
                            pic:&quot;https://gw.alicdn.com/bao/uploaded/i1/TB16tk_KpXXXXX7XVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                            price:22.8,
                            num:2,},
                        {
                            name:&quot;【三只松鼠_炭烧腰果185gx2袋】坚果零食特产炒货干果腰果仁&quot;,
                            pic:&quot;https://gw.alicdn.com/bao/uploaded/i2/TB1372RKXXXXXXnXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                            price:42,
                            num:1,},
                        {
                            name:&quot;【三只松鼠_皇族牌牛奶夹心饼240g】台湾进口休闲零食夹心饼干&quot;,
                            pic:&quot;https://gw.alicdn.com/bao/uploaded/i3/TB1UK3uOVXXXXaiaXXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                            price:15.5,
                            num:3,},
                        {
                            name:&quot;【三只松鼠_碧根果210gx2袋】零食坚果山核桃长寿果干果奶油味&quot;,
                            pic:&quot;https://gw.alicdn.com/bao/uploaded/i2/TB1eTzgJVXXXXcIXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp&quot;,
                            price:18.9,
                            num:1,}];
        //每个列表项对应的html代码，实际情况中只要先把html写好然后拷贝去空格就好
        var listItemCodeStr = '<div class=&quot;item_i&quot;><div class=&quot;checkbox&quot;><input type=&quot;checkbox&quot; class=&quot;checkOne check&quot; checked=&quot;checked&quot;></div><div class=&quot;good&quot;>![]( 1.jpg)<span>xxxxxxx</span></div><div class=&quot;price&quot;>0</div><div class=&quot;count&quot;><span class=&quot;reduce&quot;>-</span><input type=&quot;text&quot; class=&quot;count_input&quot; value=&quot;1&quot;><span class=&quot;add&quot;>+</span></div><div class=&quot;subTotal&quot;>0</div><div class=&quot;act&quot;><span class=&quot;delete&quot;>删除</span></div></div>';

        //根据数据来添加每一项列表到dom上
        for (var i = 0; i < myListArr.length; i++) {
            //生成的列表项dom元素
            var jqueryListItem = $(listItemCodeStr);
            //对应列表项数据
            var listItemData = myListArr[i];

            //用数据填充dom列表项
            fillListWithData(jqueryListItem,listItemData)

            //把列表项添加到dom上
            $(&quot;#cart_item&quot;).append(jqueryListItem);
        }

        //跟两个全选check-box加事件
        $('.checkAll').click(function(event) {
            var checkList = $(&quot;.checkOne&quot;);
            var checkAllList = $(&quot;.checkAll&quot;);

            //让另一个按钮也全选或者也不全选保持同步
            for (var i = 0; i < checkAllList.length; i++) {
                checkAllList.get(i).checked = this.checked;
            }

            for (var i = 0; i < checkList.length; i++) {
                //如果当前项和全选项不一样则执行选中单行操作
                if (checkList.get(i).checked != this.checked) {
                    checkList.get(i).click();
                }
            }
        });

    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>$(function(){
        <span class="hljs-comment">//这里模拟数据，实际中是ajax请求网络数据，并没有太大差异</span>
        <span class="hljs-keyword">var</span> myListArr = [{
                            name:<span class="hljs-string">"【三只松鼠_小贱拉面丸子85gx3】休闲零食膨化小吃干脆面串烧味"</span>,
                            pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i1/TB16tk_KpXXXXX7XVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                            price:<span class="hljs-number">22.8</span>,
                            num:<span class="hljs-number">2</span>,},
                        {
                            name:<span class="hljs-string">"【三只松鼠_炭烧腰果185gx2袋】坚果零食特产炒货干果腰果仁"</span>,
                            pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i2/TB1372RKXXXXXXnXVXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                            price:<span class="hljs-number">42</span>,
                            num:<span class="hljs-number">1</span>,},
                        {
                            name:<span class="hljs-string">"【三只松鼠_皇族牌牛奶夹心饼240g】台湾进口休闲零食夹心饼干"</span>,
                            pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i3/TB1UK3uOVXXXXaiaXXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                            price:<span class="hljs-number">15.5</span>,
                            num:<span class="hljs-number">3</span>,},
                        {
                            name:<span class="hljs-string">"【三只松鼠_碧根果210gx2袋】零食坚果山核桃长寿果干果奶油味"</span>,
                            pic:<span class="hljs-string">"https://gw.alicdn.com/bao/uploaded/i2/TB1eTzgJVXXXXcIXFXXXXXXXXXX_!!0-item_pic.jpg_200x200q50s150.jpg_.webp"</span>,
                            price:<span class="hljs-number">18.9</span>,
                            num:<span class="hljs-number">1</span>,}];
        <span class="hljs-comment">//每个列表项对应的html代码，实际情况中只要先把html写好然后拷贝去空格就好</span>
        <span class="hljs-keyword">var</span> listItemCodeStr = '&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"item_i"</span>&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"checkbox"</span>&gt;&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"checkOne check"</span> checked=<span class="hljs-string">"checked"</span>&gt;&lt;/div&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"good"</span>&gt;![]( <span class="hljs-number">1.</span>jpg)&lt;span&gt;xxxxxxx&lt;/span&gt;&lt;/div&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"price"</span>&gt;<span class="hljs-number">0</span>&lt;/div&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"count"</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"reduce"</span>&gt;-&lt;/span&gt;&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"count_input"</span> value=<span class="hljs-string">"1"</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"add"</span>&gt;+&lt;/span&gt;&lt;/div&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"subTotal"</span>&gt;<span class="hljs-number">0</span>&lt;/div&gt;&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"act"</span>&gt;&lt;span <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"delete"</span>&gt;删除&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;';

        <span class="hljs-comment">//根据数据来添加每一项列表到dom上</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; myListArr.length; i++) {
            <span class="hljs-comment">//生成的列表项dom元素</span>
            <span class="hljs-keyword">var</span> jqueryListItem = $(listItemCodeStr);
            <span class="hljs-comment">//对应列表项数据</span>
            <span class="hljs-keyword">var</span> listItemData = myListArr[i];

            <span class="hljs-comment">//用数据填充dom列表项</span>
            fillListWithData(jqueryListItem,listItemData)

            <span class="hljs-comment">//把列表项添加到dom上</span>
            $(<span class="hljs-string">"#cart_item"</span>).append(jqueryListItem);
        }

        <span class="hljs-comment">//跟两个全选check-box加事件</span>
        $('.checkAll').click(function(event) {
            <span class="hljs-keyword">var</span> checkList = $(<span class="hljs-string">".checkOne"</span>);
            <span class="hljs-keyword">var</span> checkAllList = $(<span class="hljs-string">".checkAll"</span>);

            <span class="hljs-comment">//让另一个按钮也全选或者也不全选保持同步</span>
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; checkAllList.length; i++) {
                checkAllList.get(i).checked = <span class="hljs-keyword">this</span>.checked;
            }

            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; checkList.length; i++) {
                <span class="hljs-comment">//如果当前项和全选项不一样则执行选中单行操作</span>
                <span class="hljs-keyword">if</span> (checkList.get(i).checked != <span class="hljs-keyword">this</span>.checked) {
                    checkList.get(i).click();
                }
            }
        });

    });</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//返回每一行的数据
    function getTotalCountAndPrice (item) {
        var count_input = parseInt(item.find(&quot;.count_input&quot;).eq(0).val());
        var price = parseFloat(parseFloat(item.find(&quot;.price&quot;).eq(0).text()).toFixed(2));
        var totalPrice = parseFloat((count_input*price).toFixed(2));

        var jsonData = {&quot;count&quot;:count_input,&quot;price&quot;:price,&quot;totalPrice&quot;:totalPrice};
        return jsonData;
    }
//每一个商品的总价
    function getSubTotal(item){
        var listData = getTotalCountAndPrice(item);        
        item.find('.subTotal').eq(0).html(listData.totalPrice);
    }
//根据每一行的数据传入修改所有商品总价格和总件数
    function updateTotal(item,count){
        var listData = getTotalCountAndPrice(item);        
        var listPrice = listData.price;

        var totalPrice = parseFloat($(&quot;#totalPrice&quot;).eq(0).text());
        var totalCount = parseInt($(&quot;#totalCount&quot;).eq(0).text());

        $(&quot;#totalPrice&quot;).text((totalPrice + count * listPrice ).toFixed(2));
        $(&quot;#totalCount&quot;).text((totalCount + count ));
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//返回每一行的数据</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getTotalCountAndPrice</span> (<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">var</span> count_input = <span class="hljs-built_in">parseInt</span>(item.find(<span class="hljs-string">".count_input"</span>).eq(<span class="hljs-number">0</span>).val());
        <span class="hljs-keyword">var</span> price = <span class="hljs-built_in">parseFloat</span>(<span class="hljs-built_in">parseFloat</span>(item.find(<span class="hljs-string">".price"</span>).eq(<span class="hljs-number">0</span>).text()).toFixed(<span class="hljs-number">2</span>));
        <span class="hljs-keyword">var</span> totalPrice = <span class="hljs-built_in">parseFloat</span>((count_input*price).toFixed(<span class="hljs-number">2</span>));

        <span class="hljs-keyword">var</span> jsonData = {<span class="hljs-string">"count"</span>:count_input,<span class="hljs-string">"price"</span>:price,<span class="hljs-string">"totalPrice"</span>:totalPrice};
        <span class="hljs-keyword">return</span> jsonData;
    }
<span class="hljs-comment">//每一个商品的总价</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSubTotal</span>(<span class="hljs-params">item</span>)</span>{
        <span class="hljs-keyword">var</span> listData = getTotalCountAndPrice(item);        
        item.find(<span class="hljs-string">'.subTotal'</span>).eq(<span class="hljs-number">0</span>).html(listData.totalPrice);
    }
<span class="hljs-comment">//根据每一行的数据传入修改所有商品总价格和总件数</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateTotal</span>(<span class="hljs-params">item,count</span>)</span>{
        <span class="hljs-keyword">var</span> listData = getTotalCountAndPrice(item);        
        <span class="hljs-keyword">var</span> listPrice = listData.price;

        <span class="hljs-keyword">var</span> totalPrice = <span class="hljs-built_in">parseFloat</span>($(<span class="hljs-string">"#totalPrice"</span>).eq(<span class="hljs-number">0</span>).text());
        <span class="hljs-keyword">var</span> totalCount = <span class="hljs-built_in">parseInt</span>($(<span class="hljs-string">"#totalCount"</span>).eq(<span class="hljs-number">0</span>).text());

        $(<span class="hljs-string">"#totalPrice"</span>).text((totalPrice + count * listPrice ).toFixed(<span class="hljs-number">2</span>));
        $(<span class="hljs-string">"#totalCount"</span>).text((totalCount + count ));
    }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//根据列表项数据填充列表项和总价总数量
    function fillListWithData(jqueryListItem,listItemData){
        //首次跟一行列表赋值(一个商品)
        jqueryListItem.find('img').eq(0).attr('src', listItemData.pic);
        jqueryListItem.find('span').eq(0).html(listItemData.name);
        jqueryListItem.find('.price').eq(0).html(listItemData.price);
        jqueryListItem.find('.count_input').eq(0).val(listItemData.num);
        //计算一行的总价格
        getSubTotal(jqueryListItem);
        //减商品个数的事件
        jqueryListItem.find('.reduce').click(function(event) {
            //个数输入框，因为会取值赋值用到几次，所以提出来作变量
            var count_inputOBJ =  $(this).parent().find('.count_input').eq(0);
            var count_input = parseInt(count_inputOBJ.val());
            //输入框的值为1就不允许再减个数了，输入框最小值为1
            if (count_input == 1) {
                return;
            }
            count_input -= 1;
            count_inputOBJ.val(count_input);
            //更新每一行的总价格
            getSubTotal($(this).parent().parent());
            var itemCheck = $(this).parent().parent().find(&quot;.checkOne&quot;).get(0);
            if (itemCheck.checked) {
                //如果这个商品勾选了应该更新整个总价格和总数量
                updateTotal($(this).parent().parent(),-1);
            }
        });
        //增加商品个数的事件,代码同减商品个数不注释
        jqueryListItem.find('.add').click(function(event) {
            var count_inputOBJ =  $(this).parent().parent().find('.count_input').eq(0);
            var count_input = parseInt(count_inputOBJ.val());
            count_input += 1;
            count_inputOBJ.val(count_input);
            getSubTotal($(this).parent().parent());
            var itemCheck = $(this).parent().parent().find(&quot;.checkOne&quot;).get(0);
            if (itemCheck.checked) {
                updateTotal($(this).parent().parent(),1);
            }
        });
        //删除某个商品的事件,代码同加减商品个数不注释
        jqueryListItem.find('.delete').click(function(event) {

            var itemCheck = $(this).parent().parent().find(&quot;.checkOne&quot;).get(0);
            if (itemCheck.checked) {
                var count_inputOBJ =  $(this).parent().parent().find('.count_input').eq(0);
                updateTotal($(this).parent().parent(),- parseInt(count_inputOBJ.val()));
            }
            $(this).parent().parent().remove();
        });
        //跟列表项的check-box加事件
        jqueryListItem.find('.checkOne').click(function(event) {
            var listData = getTotalCountAndPrice($(this).parent().parent());
            if (this.checked) {
                //加上勾选项数量和价格
                updateTotal($(this).parent().parent(),listData.count);
                //遍历看是否是全选
                var checkList = $(&quot;.checkOne&quot;);
                var checkAllList = $(&quot;.checkAll&quot;);

                var allCheckTag = true ;
                for (var i = 0; i < checkList.length; i++) {
                    var checkItem = checkList.get(i);
                    if (!checkItem.checked) {
                        allCheckTag = false;
                        break;
                    }
                }
                if (allCheckTag) {
                    for (var j = 0; j < checkAllList.length; j++) {
                        checkAllList.get(j).checked = true;
                    }
                }
            }else {
                //减去勾选项
                updateTotal($(this).parent().parent(),-listData.count);
                //去掉全选
                var checkAllList = $(&quot;.checkAll&quot;);
                for (var j = 0; j < checkAllList.length; j++) {
                    checkAllList.get(j).checked = false;
                }

            }
        });
        //初始化总价,每循环一个列表项就应该把总数总价格更新下
         updateTotal(jqueryListItem,listItemData.num);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//根据列表项数据填充列表项和总价总数量</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fillListWithData</span>(<span class="hljs-params">jqueryListItem,listItemData</span>)</span>{
        <span class="hljs-comment">//首次跟一行列表赋值(一个商品)</span>
        jqueryListItem.find(<span class="hljs-string">'img'</span>).eq(<span class="hljs-number">0</span>).attr(<span class="hljs-string">'src'</span>, listItemData.pic);
        jqueryListItem.find(<span class="hljs-string">'span'</span>).eq(<span class="hljs-number">0</span>).html(listItemData.name);
        jqueryListItem.find(<span class="hljs-string">'.price'</span>).eq(<span class="hljs-number">0</span>).html(listItemData.price);
        jqueryListItem.find(<span class="hljs-string">'.count_input'</span>).eq(<span class="hljs-number">0</span>).val(listItemData.num);
        <span class="hljs-comment">//计算一行的总价格</span>
        getSubTotal(jqueryListItem);
        <span class="hljs-comment">//减商品个数的事件</span>
        jqueryListItem.find(<span class="hljs-string">'.reduce'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-comment">//个数输入框，因为会取值赋值用到几次，所以提出来作变量</span>
            <span class="hljs-keyword">var</span> count_inputOBJ =  $(<span class="hljs-keyword">this</span>).parent().find(<span class="hljs-string">'.count_input'</span>).eq(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">var</span> count_input = <span class="hljs-built_in">parseInt</span>(count_inputOBJ.val());
            <span class="hljs-comment">//输入框的值为1就不允许再减个数了，输入框最小值为1</span>
            <span class="hljs-keyword">if</span> (count_input == <span class="hljs-number">1</span>) {
                <span class="hljs-keyword">return</span>;
            }
            count_input -= <span class="hljs-number">1</span>;
            count_inputOBJ.val(count_input);
            <span class="hljs-comment">//更新每一行的总价格</span>
            getSubTotal($(<span class="hljs-keyword">this</span>).parent().parent());
            <span class="hljs-keyword">var</span> itemCheck = $(<span class="hljs-keyword">this</span>).parent().parent().find(<span class="hljs-string">".checkOne"</span>).get(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">if</span> (itemCheck.checked) {
                <span class="hljs-comment">//如果这个商品勾选了应该更新整个总价格和总数量</span>
                updateTotal($(<span class="hljs-keyword">this</span>).parent().parent(),<span class="hljs-number">-1</span>);
            }
        });
        <span class="hljs-comment">//增加商品个数的事件,代码同减商品个数不注释</span>
        jqueryListItem.find(<span class="hljs-string">'.add'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">var</span> count_inputOBJ =  $(<span class="hljs-keyword">this</span>).parent().parent().find(<span class="hljs-string">'.count_input'</span>).eq(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">var</span> count_input = <span class="hljs-built_in">parseInt</span>(count_inputOBJ.val());
            count_input += <span class="hljs-number">1</span>;
            count_inputOBJ.val(count_input);
            getSubTotal($(<span class="hljs-keyword">this</span>).parent().parent());
            <span class="hljs-keyword">var</span> itemCheck = $(<span class="hljs-keyword">this</span>).parent().parent().find(<span class="hljs-string">".checkOne"</span>).get(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">if</span> (itemCheck.checked) {
                updateTotal($(<span class="hljs-keyword">this</span>).parent().parent(),<span class="hljs-number">1</span>);
            }
        });
        <span class="hljs-comment">//删除某个商品的事件,代码同加减商品个数不注释</span>
        jqueryListItem.find(<span class="hljs-string">'.delete'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{

            <span class="hljs-keyword">var</span> itemCheck = $(<span class="hljs-keyword">this</span>).parent().parent().find(<span class="hljs-string">".checkOne"</span>).get(<span class="hljs-number">0</span>);
            <span class="hljs-keyword">if</span> (itemCheck.checked) {
                <span class="hljs-keyword">var</span> count_inputOBJ =  $(<span class="hljs-keyword">this</span>).parent().parent().find(<span class="hljs-string">'.count_input'</span>).eq(<span class="hljs-number">0</span>);
                updateTotal($(<span class="hljs-keyword">this</span>).parent().parent(),- <span class="hljs-built_in">parseInt</span>(count_inputOBJ.val()));
            }
            $(<span class="hljs-keyword">this</span>).parent().parent().remove();
        });
        <span class="hljs-comment">//跟列表项的check-box加事件</span>
        jqueryListItem.find(<span class="hljs-string">'.checkOne'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
            <span class="hljs-keyword">var</span> listData = getTotalCountAndPrice($(<span class="hljs-keyword">this</span>).parent().parent());
            <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.checked) {
                <span class="hljs-comment">//加上勾选项数量和价格</span>
                updateTotal($(<span class="hljs-keyword">this</span>).parent().parent(),listData.count);
                <span class="hljs-comment">//遍历看是否是全选</span>
                <span class="hljs-keyword">var</span> checkList = $(<span class="hljs-string">".checkOne"</span>);
                <span class="hljs-keyword">var</span> checkAllList = $(<span class="hljs-string">".checkAll"</span>);

                <span class="hljs-keyword">var</span> allCheckTag = <span class="hljs-literal">true</span> ;
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; checkList.length; i++) {
                    <span class="hljs-keyword">var</span> checkItem = checkList.get(i);
                    <span class="hljs-keyword">if</span> (!checkItem.checked) {
                        allCheckTag = <span class="hljs-literal">false</span>;
                        <span class="hljs-keyword">break</span>;
                    }
                }
                <span class="hljs-keyword">if</span> (allCheckTag) {
                    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; checkAllList.length; j++) {
                        checkAllList.get(j).checked = <span class="hljs-literal">true</span>;
                    }
                }
            }<span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//减去勾选项</span>
                updateTotal($(<span class="hljs-keyword">this</span>).parent().parent(),-listData.count);
                <span class="hljs-comment">//去掉全选</span>
                <span class="hljs-keyword">var</span> checkAllList = $(<span class="hljs-string">".checkAll"</span>);
                <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; checkAllList.length; j++) {
                    checkAllList.get(j).checked = <span class="hljs-literal">false</span>;
                }

            }
        });
        <span class="hljs-comment">//初始化总价,每循环一个列表项就应该把总数总价格更新下</span>
         updateTotal(jqueryListItem,listItemData.num);
    }</code></pre>
<h5>总结</h5>
<p>如果你有认真写一下以下代码，可能你会在再做类似的项目的时候再也不想使用Jquery,下面做一下对比：<br>1.由于Vue帮我们省略了dom操作，代码变得比较简洁，逻辑更加清晰。<br>2.还是由于Vue帮我们省略了dom操作，加上双向数据绑定，Vue的代码量减少很多，大概2/3(还是要看具体项目)。<br>3.Jquery 专注于dom操作，步骤一般为：获取dom元素--&gt; 跟dom元素赋值+加事件--&gt;插入dom元素。 其中dom元素赋值和加事件又需要获取dom元素和更dom元素赋值，也就是这个原因代码量才会增加。Vue专注于数据：用户只需要关注dom元素值对应绑定的数据，每次dom需要修改只需要去修改数据就可以了。<br>4.由于多个dom事件可能会同时修改一个元素的值，Vue只需要关注元素对应绑定的数据就可以了，这使得Vue在逻辑上会更加清晰</p>
<h5>读完这篇文章我希望您已经学会了：</h5>
<p>1.知道Vue是以数据为中心的，你只需要关注数据，比类Jquery的优势在于去dom操作和双线数据绑定。<br>2.知道Vue.js的基本写法，例如怎么引入vue.js，怎么声明Vue实例，实例中能挂载的参数有el、methods，data等，el、methods、data又分别表示什么，methods内部的方法this可以引用Vue实例等等<br>3.了解到基本的Vue指令，比如v-model、v-on:click、@click、v-for、v-bind:src、:src,还有"{{""}}"和@click方法里面可以传参等等<br>4.最后希望你能把这个demo好好敲一敲，不管你理不理解代码，熟练是学好一个框架的第一步，看再多听再多，不如好好写一下，有问题留言。</p>
<p>如果您觉得这篇文章对您有帮助，请打赏一下或去github上给个❤️，thanks。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue初探——Vue是什么

## 原文链接
[https://segmentfault.com/a/1190000008559125](https://segmentfault.com/a/1190000008559125)

