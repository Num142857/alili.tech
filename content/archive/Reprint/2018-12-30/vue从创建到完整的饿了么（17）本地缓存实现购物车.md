---
title: 'vue从创建到完整的饿了么（17）本地缓存实现购物车' 
date: 2018-12-30 2:30:10
hidden: true
slug: utkbc5cwtbe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">说明</h2>
<p>1.上一章--<a href="https://segmentfault.com/a/1190000011333390">watch监听子路由</a><br>2.苍渡大神源码--<a href="https://github.com/bailicangdu/vue2-elm" rel="nofollow noreferrer" target="_blank">项目源码地址</a><br>3.数据接口--<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md" rel="nofollow noreferrer" target="_blank">API接口</a><br>4.UI框架--<a href="https://mint-ui.github.io/#!/zh-cn" rel="nofollow noreferrer" target="_blank">Mint UI</a><br>5.下一章--<a href="https://segmentfault.com/a/1190000011397399">购物车的详细信息展示与删除</a></p>
<h2 id="articleHeader1">开始</h2>
<p>1.先看一下目前的UI图<br><span class="img-wrap"><img data-src="/img/bVVOCW?w=422&amp;h=707" src="https://static.alili.tech/img/bVVOCW?w=422&amp;h=707" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>要实现的UI图<br><span class="img-wrap"><img data-src="/img/bVVODN?w=428&amp;h=723" src="https://static.alili.tech/img/bVVODN?w=428&amp;h=723" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.<code>footdiv</code>代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;left&quot;>
     <div v-if=&quot;footdiv&quot; class=&quot;foot on&quot;>
                <div class=&quot;footleft&quot;>
                    <div class=&quot;footlogo&quot;>
                        <icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon>
                        <div class=&quot;rednum&quot;>15</div>
                    </div>
                    <div class=&quot;footmain&quot;>
                        <div v-if=&quot;false&quot; class=&quot;&quot;>未选购商品</div>
                        <div class=&quot;ih30 fs1-2&quot;>￥ 3205</div>
                        <div class=&quot;ih20&quot;>配送费 ￥5</div>
                    </div>
                </div>
                <div class=&quot;footright&quot;>
                    <span >￥20起送</span>
                    <span v-if=&quot;false&quot;>还差￥15起送</span>
                    <span v-if=&quot;false&quot;>去结算</span>
                </div>
      </div>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;transition <span class="hljs-built_in">name</span>=<span class="hljs-string">"left"</span>&gt;
     &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"footdiv"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"foot on"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footleft"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footlogo"</span>&gt;
                        &lt;icon <span class="hljs-built_in">name</span>=<span class="hljs-string">"footcar"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footicon"</span>&gt;&lt;/icon&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"rednum"</span>&gt;<span class="hljs-number">15</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footmain"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">""</span>&gt;未选购商品&lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs1-2"</span>&gt;￥ <span class="hljs-number">3205</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih20"</span>&gt;配送费 ￥<span class="hljs-number">5</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footright"</span>&gt;
                    &lt;span &gt;￥<span class="hljs-number">20</span>起送&lt;/span&gt;
                    &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span>&gt;还差￥<span class="hljs-number">15</span>起送&lt;/span&gt;
                    &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span>&gt;去结算&lt;/span&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
      &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/transition&gt;</code></pre>
<p>css如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  width:100%;
}
.foot.on .footicon{
  color:#fff;
}
.foot.on .footmain{
  color:#fff;
}
.foot.on .footlogo{
  background-color:#3190E8;
}
.foot.on .footright{
  color:#fff;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footright.on{
  background-color:#4CD964;
  color:white;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  color:#8a8a8a;
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.rednum{
   position: absolute;
   top:-3px;
   right:-5px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:18px;
   width:18px;
   text-aligin:center;
   line-height:18px;
   font-size:12px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.foot</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">line-height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#594C46</span>;
  <span class="hljs-attribute">display</span>:flex;
  <span class="hljs-attribute">position</span>:fixed;
  <span class="hljs-attribute">bottom</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">left</span>:<span class="hljs-number">0px</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.foot</span><span class="hljs-selector-class">.on</span> <span class="hljs-selector-class">.footicon</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.foot</span><span class="hljs-selector-class">.on</span> <span class="hljs-selector-class">.footmain</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.foot</span><span class="hljs-selector-class">.on</span> <span class="hljs-selector-class">.footlogo</span>{
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#3190E8</span>;
}
<span class="hljs-selector-class">.foot</span><span class="hljs-selector-class">.on</span> <span class="hljs-selector-class">.footright</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.footleft</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">2</span>;
  <span class="hljs-attribute">display</span>:flex;
}
<span class="hljs-selector-class">.footright</span>{
  <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#B7B7B7</span>;
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#61686A</span>;
}
<span class="hljs-selector-class">.footright</span><span class="hljs-selector-class">.on</span>{
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#4CD964</span>;
  <span class="hljs-attribute">color</span>:white;
}
<span class="hljs-selector-class">.footlogo</span>{
  <span class="hljs-attribute">text-align</span>:center;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>;
  <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#515151</span>;
  <span class="hljs-attribute">margin</span>:<span class="hljs-number">0px</span> <span class="hljs-number">10px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">3px</span> solid <span class="hljs-number">#444446</span>;
  <span class="hljs-attribute">transform</span>:<span class="hljs-built_in">translatey</span>(-15px)
}
<span class="hljs-selector-class">.footicon</span>{
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#8a8a8a</span>;
  <span class="hljs-attribute">width</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">height</span>:<span class="hljs-number">40px</span>;
  <span class="hljs-attribute">margin-top</span>:<span class="hljs-number">7px</span>;
}
<span class="hljs-selector-class">.footmain</span>{
  <span class="hljs-attribute">height</span>:<span class="hljs-number">50px</span>;
  <span class="hljs-attribute">color</span>:<span class="hljs-number">#ADADAD</span>;
  <span class="hljs-attribute">font-size</span>:<span class="hljs-number">0.8rem</span>;
}
<span class="hljs-selector-class">.rednum</span>{
   <span class="hljs-attribute">position</span>: absolute;
   <span class="hljs-attribute">top</span>:-<span class="hljs-number">3px</span>;
   <span class="hljs-attribute">right</span>:-<span class="hljs-number">5px</span>;
   <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">50%</span>;
   <span class="hljs-attribute">background-color</span>:red;
   <span class="hljs-attribute">color</span>:white;
   <span class="hljs-attribute">height</span>:<span class="hljs-number">18px</span>;
   <span class="hljs-attribute">width</span>:<span class="hljs-number">18px</span>;
   <span class="hljs-attribute">text-aligin</span>:center;
   <span class="hljs-attribute">line-height</span>:<span class="hljs-number">18px</span>;
   <span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>;
}</code></pre>
<p>我把所有可能出现的元素全部写出来了，用v-if来判断显示哪个，到时候购物车有东西了，直接给<code>footdiv</code>加一个<code>on</code>class就行。</p>
<p>3.点击添加<br>注意，首先我们要把布局修改一下<br><span class="img-wrap"><img data-src="/img/bVVOKO?w=431&amp;h=706" src="https://static.alili.tech/img/bVVOKO?w=431&amp;h=706" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>以前绿色的div在红色的div内，而红色div有一个点击跳转的效果，所以点击绿色div也会跳转。这在js中解决非常简单，但是在vue中怎么解决呢？我上网查了查没找到结果（哪位老铁知道怎么解决感谢指出）。。。最后是用布局解决的。<br>解决后红色div与绿色div是兄弟并不是父子，将绿色div定位到红色div上即可。</p>
<p>4.数据类型<br>咱们把数据存到<code>localStorage</code>里，键名为<code>mycar</code>，键值结构为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{&quot;shop&quot;:第一个商品的相关信息,&quot;num&quot;:第一个商品的个数},{&quot;shop&quot;:第二个商品的相关信息,&quot;num&quot;:第二个商品的个数}]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[{<span class="hljs-attr">"shop"</span>:第一个商品的相关信息,<span class="hljs-attr">"num"</span>:第一个商品的个数},{<span class="hljs-attr">"shop"</span>:第二个商品的相关信息,<span class="hljs-attr">"num"</span>:第二个商品的个数}]
</code></pre>
<p>（注意：<code>localStorage</code>只接收字符串，所以咱们存取都要先转化再使用）<br>（注意：下面点击事件的参数e为API返回的一个完整的食品对象，<a href="https://github.com/bailicangdu/node-elm/blob/master/API.md#16%E8%8E%B7%E5%8F%96%E9%A3%9F%E5%93%81%E5%88%97%E8%A1%A8" rel="nofollow noreferrer" target="_blank">狠狠的点击这里查看API</a>，截图如下）<br><span class="img-wrap"><img data-src="/img/bVVOQx?w=1920&amp;h=1048" src="https://static.alili.tech/img/bVVOQx?w=1920&amp;h=1048" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>点击事件如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addcar:function(e){
          var that=this;
          if(localStorage.getItem(&quot;mycar&quot;)){
              var mycar=JSON.parse(localStorage.getItem(&quot;mycar&quot;));
              var addok=true;                                              //数据是否添加
              for(var i =0;i<mycar.length;i++){
                  if(mycar[i].shop.item_id==e.item_id&amp;&amp;mycar[i].shop.category_id==e.category_id&amp;&amp;mycar[i].shop.restaurant_id==e.restaurant_id){
                      mycar[i].num=mycar[i].num+1;
                      addok=false;
                      break;
                  }
              }
              if(addok){
                    mycar.push({&quot;shop&quot;:e,&quot;num&quot;:1});
              }
              that.mycar=mycar;
              localStorage.setItem(&quot;mycar&quot;,JSON.stringify(mycar));
          }else{
              var mycar=[{&quot;shop&quot;:e,&quot;num&quot;:1}];
              that.mycar=mycar;
              localStorage.setItem(&quot;mycar&quot;,JSON.stringify(mycar));
          }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>addcar:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
          <span class="hljs-keyword">var</span> that=<span class="hljs-keyword">this</span>;
          <span class="hljs-keyword">if</span>(localStorage.getItem(<span class="hljs-string">"mycar"</span>)){
              <span class="hljs-keyword">var</span> mycar=<span class="hljs-built_in">JSON</span>.parse(localStorage.getItem(<span class="hljs-string">"mycar"</span>));
              <span class="hljs-keyword">var</span> addok=<span class="hljs-literal">true</span>;                                              <span class="hljs-comment">//数据是否添加</span>
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i =<span class="hljs-number">0</span>;i&lt;mycar.length;i++){
                  <span class="hljs-keyword">if</span>(mycar[i].shop.item_id==e.item_id&amp;&amp;mycar[i].shop.category_id==e.category_id&amp;&amp;mycar[i].shop.restaurant_id==e.restaurant_id){
                      mycar[i].num=mycar[i].num+<span class="hljs-number">1</span>;
                      addok=<span class="hljs-literal">false</span>;
                      <span class="hljs-keyword">break</span>;
                  }
              }
              <span class="hljs-keyword">if</span>(addok){
                    mycar.push({<span class="hljs-string">"shop"</span>:e,<span class="hljs-string">"num"</span>:<span class="hljs-number">1</span>});
              }
              that.mycar=mycar;
              localStorage.setItem(<span class="hljs-string">"mycar"</span>,<span class="hljs-built_in">JSON</span>.stringify(mycar));
          }<span class="hljs-keyword">else</span>{
              <span class="hljs-keyword">var</span> mycar=[{<span class="hljs-string">"shop"</span>:e,<span class="hljs-string">"num"</span>:<span class="hljs-number">1</span>}];
              that.mycar=mycar;
              localStorage.setItem(<span class="hljs-string">"mycar"</span>,<span class="hljs-built_in">JSON</span>.stringify(mycar));
          }
      }</code></pre>
<p>（注意：别忘了在data中设置变量<code>mycar</code>来存放购物车信息）<br>在<code>footdiv</code>中监听<code>mycar</code>来控制<code>on</code>class是否添加和右上角的红色数字是否显示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;left&quot;>
          <div v-if=&quot;footdiv&quot; class=&quot;foot&quot; :class=&quot;{on:mycar.length>=1}&quot;>
                <div class=&quot;footleft&quot;>
                    <div class=&quot;footlogo&quot;>
                        <icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon>
                        <div v-if=&quot;mycar&quot; class=&quot;rednum&quot;>15</div>
                    </div>
                    <div class=&quot;footmain&quot;>
                        <div v-if=&quot;false&quot; class=&quot;&quot;>未选购商品</div>
                        <div class=&quot;ih30 fs1-2&quot;>￥ 3205</div>
                        <div class=&quot;ih20&quot;>配送费 ￥5</div>
                    </div>
                </div>
                <div class=&quot;footright&quot;>
                    <span >￥20起送</span>
                    <span v-if=&quot;false&quot;>还差￥15起送</span>
                    <span v-if=&quot;false&quot;>去结算</span>
                </div>
          </div>
 </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;transition <span class="hljs-built_in">name</span>=<span class="hljs-string">"left"</span>&gt;
          &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"footdiv"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"foot"</span> :<span class="hljs-built_in">class</span>=<span class="hljs-string">"{on:mycar.length&gt;=1}"</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footleft"</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footlogo"</span>&gt;
                        &lt;icon <span class="hljs-built_in">name</span>=<span class="hljs-string">"footcar"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footicon"</span>&gt;&lt;/icon&gt;
                        &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"rednum"</span>&gt;<span class="hljs-number">15</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footmain"</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">""</span>&gt;未选购商品&lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih30 fs1-2"</span>&gt;￥ <span class="hljs-number">3205</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"ih20"</span>&gt;配送费 ￥<span class="hljs-number">5</span>&lt;/<span class="hljs-keyword">div</span>&gt;
                    &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
                &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footright"</span>&gt;
                    &lt;span &gt;￥<span class="hljs-number">20</span>起送&lt;/span&gt;
                    &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span>&gt;还差￥<span class="hljs-number">15</span>起送&lt;/span&gt;
                    &lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"false"</span>&gt;去结算&lt;/span&gt;
                &lt;/<span class="hljs-keyword">div</span>&gt;
          &lt;/<span class="hljs-keyword">div</span>&gt;
 &lt;/transition&gt;</code></pre>
<p>这时发现商品数量没有计算，目前是写死的15，在计算属性<code>computed</code>中添加计算</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed:{
  //计算属性
      mycarshopnum:function(){
          var num=0;
          for(var i=0;i<this.mycar.length;i++){
                num+=this.mycar[i].num;
          }
          return num
      }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code>computed:{
  <span class="hljs-comment">//计算属性</span>
      mycarshopnum:function(){
          <span class="hljs-keyword">var</span> <span class="hljs-built_in">num</span>=<span class="hljs-number">0</span>;
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.mycar.length;i++){
                <span class="hljs-built_in">num</span>+=<span class="hljs-keyword">this</span>.mycar[i].<span class="hljs-built_in">num</span>;
          }
          <span class="hljs-keyword">return</span> <span class="hljs-built_in">num</span>
      }
  },</code></pre>
<p>在<code>footdiv</code>中的<code>rednum</code>调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-if=&quot;mycar&quot; class=&quot;rednum&quot;>"{{"mycarshopnum"}}"</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"rednum"</span>&gt;"{{"mycarshopnum"}}"&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>ok！运行试试<br><span class="img-wrap"><img data-src="/img/bVVPmp?w=638&amp;h=824" src="https://static.alili.tech/img/bVVPmp?w=638&amp;h=824" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br>解决！</p>
<h2 id="articleHeader2">修改</h2>
<p>1.可以看到，除了商品数量，其他全是假的，咱们现在写活。<br>在<code>computed</code>中添加商品价格的计算（<code>piecewise_agent_fee.tips</code>为配送费，<code>float_minimum_order_amount</code>为起送费，在商家详情的API中，咱们以前已经获取）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" computed:{
  //计算属性
      //计算商品数量
      mycarshopnum:function(){
          var num=0;
          for(var i=0;i<this.mycar.length;i++){
                num+=this.mycar[i].num;
          }
          return num
      },
      //计算商品价格(商品只有一个种类)
      mycarshoppic:function(){
          var num=0;
          for(var i=0;i<this.mycar.length;i++){
                num+=(this.mycar[i].shop.specfoods[0].price*this.mycar[i].num);
          }
          return num
      },
      //判断商家起送价与目前购物车价格
      shoppicbig:function(){
              if(this.mycar){
                    if(this.mycarshoppic>=this.shopinfo.float_minimum_order_amount){
                        return 1
                    }else{
                        return 2
                    }
              }else{
                  return false
              }
      }
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> computed:{
  <span class="hljs-comment">//计算属性</span>
      <span class="hljs-comment">//计算商品数量</span>
      mycarshopnum:function(){
          <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.mycar.length;i++){
                num+=<span class="hljs-keyword">this</span>.mycar[i].num;
          }
          <span class="hljs-keyword">return</span> num
      },
      <span class="hljs-comment">//计算商品价格(商品只有一个种类)</span>
      mycarshoppic:function(){
          <span class="hljs-keyword">var</span> num=<span class="hljs-number">0</span>;
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.mycar.length;i++){
                num+=(<span class="hljs-keyword">this</span>.mycar[i].shop.specfoods[<span class="hljs-number">0</span>].price*<span class="hljs-keyword">this</span>.mycar[i].num);
          }
          <span class="hljs-keyword">return</span> num
      },
      <span class="hljs-comment">//判断商家起送价与目前购物车价格</span>
      shoppicbig:function(){
              <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.mycar){
                    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.mycarshoppic&gt;=<span class="hljs-keyword">this</span>.shopinfo.float_minimum_order_amount){
                        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
                    }<span class="hljs-keyword">else</span>{
                        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>
                    }
              }<span class="hljs-keyword">else</span>{
                  <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
              }
      }
  },</code></pre>
<p>footdiv修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;left&quot;>
          <div v-if=&quot;footdiv&quot; class=&quot;foot&quot; :class=&quot;{on:mycar.length>=1}&quot;>
                <div class=&quot;footleft&quot;>
                    <div class=&quot;footlogo&quot;>
                        <icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon>
                        <div v-if=&quot;mycar&quot; class=&quot;rednum&quot;>"{{"mycarshopnum"}}"</div>
                    </div>
                    <div class=&quot;footmain&quot;>
                        <div v-if=&quot;!mycar&quot; class=&quot;&quot;>未选购商品</div>
                        <div v-if=&quot;mycar&quot; class=&quot;ih30 fs1-2&quot;>￥ "{{"mycarshoppic"}}"</div>
                        <div v-if=&quot;mycar&quot; class=&quot;ih20&quot;>"{{"this.shopinfo.piecewise_agent_fee.tips"}}"</div>
                    </div>
                </div>
                <div class=&quot;footright&quot; :class=&quot;{on:shoppicbig==1}&quot;>
                    <span v-if=&quot;!mycar&quot;>￥"{{"this.shopinfo.float_minimum_order_amount"}}"起送</span>
                    <span v-if=&quot;shoppicbig==2&quot;>还差￥"{{"this.shopinfo.float_minimum_order_amount-mycarshoppic"}}"起送</span>
                    <span v-if=&quot;shoppicbig==1&quot;>去结算</span>
                </div>
          </div>
    </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-attribute">transition</span> name=<span class="hljs-string">"left"</span>&gt;
          &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"footdiv"</span> class=<span class="hljs-string">"foot"</span> :class=<span class="hljs-string">"{on:mycar.length&gt;=1}"</span>&gt;
                &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footleft"</span>&gt;
                    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footlogo"</span>&gt;
                        &lt;<span class="hljs-attribute">icon</span> name=<span class="hljs-string">"footcar"</span> class=<span class="hljs-string">"footicon"</span>&gt;&lt;/icon&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar"</span> class=<span class="hljs-string">"rednum"</span>&gt;"{{"mycarshopnum"}}"&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footmain"</span>&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!mycar"</span> class=<span class="hljs-string">""</span>&gt;未选购商品&lt;/div&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar"</span> class=<span class="hljs-string">"ih30 fs1-2"</span>&gt;￥ "{{"mycarshoppic"}}"&lt;/div&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar"</span> class=<span class="hljs-string">"ih20"</span>&gt;"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.piecewise_agent_fee</span><span class="hljs-selector-class">.tips</span>"}}"&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footright"</span> :class=<span class="hljs-string">"{on:shoppicbig==1}"</span>&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!mycar"</span>&gt;￥"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.float_minimum_order_amount</span>"}}"起送&lt;/span&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shoppicbig==2"</span>&gt;还差￥"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.float_minimum_order_amount-mycarshoppic</span>"}}"起送&lt;/span&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shoppicbig==1"</span>&gt;去结算&lt;/span&gt;
                &lt;/div&gt;
          &lt;/div&gt;
    &lt;/<span class="hljs-attribute">transition</span>&gt;</code></pre>
<p>运行试试<br><span class="img-wrap"><img data-src="/img/bVVPDD?w=638&amp;h=824" src="https://static.alili.tech/img/bVVPDD?w=638&amp;h=824" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">商品数量</h2>
<p>现在只有购物车显示总数量，每个商品显示几个并没有。<br>1.样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;right&quot;>
    <span  class=&quot;ih20&quot;>
            <span><icon class=&quot;addicon&quot; name=&quot;offline&quot;></icon></span>
            <span class=&quot;ih20 inblock y-4&quot;>15</span>
    </span>
 </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"right"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>  <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"offline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20 inblock y-4"</span>&gt;</span>15<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></code></pre>
<p>因为商品数量为0时，减号也该没有，所以商品数量与减号写在一个动画内了，样式如下<br><span class="img-wrap"><img data-src="/img/bVVTj1?w=425&amp;h=699" src="https://static.alili.tech/img/bVVTj1?w=425&amp;h=699" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.判断商品数量。<br>现在商品的信息是从接口请求到后直接渲染在页面，没有做任何处理。现在我们要把商品信息与购物车的信息结合一下，在<code>computed</code>写函数（<code>shopmean</code>是从接口请求到的商品信息，在前几章已经请求到，未做任何处理。<code>specfoods</code>是商品的型号，这里默认只有一个）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //商品与购物车数量结合
      getshopnum:function(){
          for(var i=0;i<this.shopmean.length;i++){
              for(var k=0;k<this.shopmean[i].foods.length;k++){
                    for( var h=0;h<this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                        }
                    }
                    
              }
          }
          return this.shopmean
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-comment">//商品与购物车数量结合</span>
      getshopnum:function(){
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.shopmean.length;i++){
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k=<span class="hljs-number">0</span>;k&lt;<span class="hljs-keyword">this</span>.shopmean[i].foods.length;k++){
                    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> h=<span class="hljs-number">0</span>;h&lt;<span class="hljs-keyword">this</span>.mycar.length;h++){
                        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.shopmean[i].foods[k].specfoods[<span class="hljs-number">0</span>]._id==<span class="hljs-keyword">this</span>.mycar[h].shop.specfoods[<span class="hljs-number">0</span>]._id){
                            <span class="hljs-keyword">this</span>.shopmean[i].foods[k].mynum=<span class="hljs-keyword">this</span>.mycar[h].num;
                        }
                    }
                    
              }
          }
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.shopmean
      }</code></pre>
<p>再然后我们在页面渲染数据时，只需要把</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-for=&quot;item in shopmean&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in shopmean"</span></code></pre>
<p>改成</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v-for=&quot;item in getshopnum&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in getshopnum"</span></code></pre>
<p>即可。<br>最后判断减号与数量的显示隐藏</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;right&quot;>
      <span v-if=&quot;items.mynum&quot; class=&quot;ih20&quot;>
             <span><icon class=&quot;addicon&quot; name=&quot;offline&quot;></icon></span>
             <span class=&quot;ih20 inblock y-4&quot;>"{{"items.mynum"}}"</span>
      </span>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"right"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"items.mynum"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"offline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20 inblock y-4"</span>&gt;</span></span><span class="hljs-template-variable">"{{"items.mynum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span></code></pre>
<p>运行试试<br><span class="img-wrap"><img data-src="/img/bVVTnF?w=612&amp;h=771" src="https://static.alili.tech/img/bVVTnF?w=612&amp;h=771" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>除了动画没有运行，其他的完美！</p>
<h2 id="articleHeader4">删除商品</h2>
<p>1.删除点击事件在dome绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;right&quot;>
     <span v-if=&quot;items.mynum&quot; class=&quot;ih20&quot;>
         <span @click=&quot;removecar(items)&quot;><icon class=&quot;addicon&quot; name=&quot;offline&quot;></icon></span>
         <span class=&quot;ih20 inblock y-4&quot;>"{{"items.mynum"}}"</span>
     </span>
</transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">transition</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"right"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"items.mynum"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20"</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">span</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"removecar(items)"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">icon</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addicon"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"offline"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">icon</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"ih20 inblock y-4"</span>&gt;</span></span><span class="hljs-template-variable">"{{"items.mynum"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
     <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">transition</span>&gt;</span></span></code></pre>
<p>在<code>methods</code>中写函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="removecar:function(e){
          for(var i=0;i<this.mycar.length;i++){
              if(this.mycar[i].shop.specfoods[0]._id==e.specfoods[0]._id){
                    this.mycar[i].num==1?this.mycar.splice(i,1):(this.mycar[i].num=this.mycar[i].num-1);
                    break;
              }
          }
          localStorage.setItem(&quot;mycar&quot;,JSON.stringify(this.mycar));
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>removecar:function(e){
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.mycar.length;i++){
              <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.mycar[i].shop.specfoods[<span class="hljs-number">0</span>]._id==e.specfoods[<span class="hljs-number">0</span>]._id){
                    <span class="hljs-keyword">this</span>.mycar[i].num==<span class="hljs-number">1</span>?<span class="hljs-keyword">this</span>.mycar.splice(i,<span class="hljs-number">1</span>):(<span class="hljs-keyword">this</span>.mycar[i].num=<span class="hljs-keyword">this</span>.mycar[i].num<span class="hljs-number">-1</span>);
                    <span class="hljs-keyword">break</span>;
              }
          }
          localStorage.setItem(<span class="hljs-string">"mycar"</span>,JSON.stringify(<span class="hljs-keyword">this</span>.mycar));
      }</code></pre>
<p><strong>注意</strong><br>这里要改一下计算属性中的<code>getshopnum</code>函数。咱们在刚开始写时，只是把商品列表跟购物车列表循环，当ID相同时在商品列表添加属性<code>mynum</code>存储商品在购物车数量，不相同时不作操作。但是，我们做了减商品的功能后，<strong>当商品数量为1时，减一后购物车清除该商品，然后通过计算属性中的<code>getshopnum</code>函数与商品列表循环，结果因为购物车已经清除该商品而函数找不到相同ID不作任何操作，但商品列表的该商品数量仍为一</strong>，所以当ID不相同时我们给商品列表自定义属性<code>mynum</code>为0即可，将<code>computed</code>中的<code>getshopnum</code>修改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//商品与购物车数量结合
      getshopnum:function(){
          for(var i=0;i<this.shopmean.length;i++){
              for(var k=0;k<this.shopmean[i].foods.length;k++){
                    var isadd=true;                          //判断该商品是否在购物车
                    for( var h=0;h<this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                            isadd=false;
                            break;
                        }
                    }
                    if(isadd){
                        this.shopmean[i].foods[k].mynum=0;
                    }
                    
              }
          }
          return this.shopmean
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//商品与购物车数量结合</span>
      getshopnum:function(){
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.shopmean.length;i++){
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k=<span class="hljs-number">0</span>;k&lt;<span class="hljs-keyword">this</span>.shopmean[i].foods.length;k++){
                    <span class="hljs-keyword">var</span> isadd=<span class="hljs-literal">true</span>;                          <span class="hljs-comment">//判断该商品是否在购物车</span>
                    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> h=<span class="hljs-number">0</span>;h&lt;<span class="hljs-keyword">this</span>.mycar.length;h++){
                        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.shopmean[i].foods[k].specfoods[<span class="hljs-number">0</span>]._id==<span class="hljs-keyword">this</span>.mycar[h].shop.specfoods[<span class="hljs-number">0</span>]._id){
                            <span class="hljs-keyword">this</span>.shopmean[i].foods[k].mynum=<span class="hljs-keyword">this</span>.mycar[h].num;
                            isadd=<span class="hljs-literal">false</span>;
                            <span class="hljs-keyword">break</span>;
                        }
                    }
                    <span class="hljs-keyword">if</span>(isadd){
                        <span class="hljs-keyword">this</span>.shopmean[i].foods[k].mynum=<span class="hljs-number">0</span>;
                    }
                    
              }
          }
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.shopmean
      }</code></pre>
<p><strong>注意</strong><br>当购物车清空时，<code>mycar</code>已存在而不是刚开始的空，所以购物车div里的元素显示隐藏要修改为判断<code>mycar</code>的长度而不是是否为空</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<transition name=&quot;left&quot;>
          <div v-if=&quot;footdiv&quot; class=&quot;foot&quot; :class=&quot;{on:mycar.length>=1}&quot;>
                <div class=&quot;footleft&quot;>
                    <div class=&quot;footlogo&quot;>
                        <icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon>
                        <div v-if=&quot;mycar.length&quot; class=&quot;rednum&quot;>"{{"mycarshopnum"}}"</div>
                    </div>
                    <div class=&quot;footmain&quot;>
                        <div v-if=&quot;!mycar.length&quot; class=&quot;&quot;>未选购商品</div>
                        <div v-if=&quot;mycar.length&quot; class=&quot;ih30 fs1-2&quot;>￥ "{{"mycarshoppic"}}"</div>
                        <div v-if=&quot;mycar.length&quot; class=&quot;ih20&quot;>"{{"this.shopinfo.piecewise_agent_fee.tips"}}"</div>
                    </div>
                </div>
                <div class=&quot;footright&quot; :class=&quot;{on:shoppicbig==1}&quot;>
                    <span v-if=&quot;!mycar&quot;>￥"{{"this.shopinfo.float_minimum_order_amount"}}"起送</span>
                    <span v-if=&quot;shoppicbig==2&quot;>还差￥"{{"this.shopinfo.float_minimum_order_amount-mycarshoppic"}}"起送</span>
                    <span v-if=&quot;shoppicbig==1&quot;>去结算</span>
                </div>
          </div>
    </transition>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-attribute">transition</span> name=<span class="hljs-string">"left"</span>&gt;
          &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"footdiv"</span> class=<span class="hljs-string">"foot"</span> :class=<span class="hljs-string">"{on:mycar.length&gt;=1}"</span>&gt;
                &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footleft"</span>&gt;
                    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footlogo"</span>&gt;
                        &lt;<span class="hljs-attribute">icon</span> name=<span class="hljs-string">"footcar"</span> class=<span class="hljs-string">"footicon"</span>&gt;&lt;/icon&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar.length"</span> class=<span class="hljs-string">"rednum"</span>&gt;"{{"mycarshopnum"}}"&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footmain"</span>&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!mycar.length"</span> class=<span class="hljs-string">""</span>&gt;未选购商品&lt;/div&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar.length"</span> class=<span class="hljs-string">"ih30 fs1-2"</span>&gt;￥ "{{"mycarshoppic"}}"&lt;/div&gt;
                        &lt;<span class="hljs-selector-tag">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"mycar.length"</span> class=<span class="hljs-string">"ih20"</span>&gt;"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.piecewise_agent_fee</span><span class="hljs-selector-class">.tips</span>"}}"&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"footright"</span> :class=<span class="hljs-string">"{on:shoppicbig==1}"</span>&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!mycar"</span>&gt;￥"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.float_minimum_order_amount</span>"}}"起送&lt;/span&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shoppicbig==2"</span>&gt;还差￥"{{"this<span class="hljs-selector-class">.shopinfo</span><span class="hljs-selector-class">.float_minimum_order_amount-mycarshoppic</span>"}}"起送&lt;/span&gt;
                    &lt;<span class="hljs-selector-tag">span</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"shoppicbig==1"</span>&gt;去结算&lt;/span&gt;
                &lt;/div&gt;
          &lt;/div&gt;
    &lt;/<span class="hljs-attribute">transition</span>&gt;</code></pre>
<p>运行试试<br><span class="img-wrap"><img data-src="/img/bVVUG5?w=612&amp;h=771" src="https://static.alili.tech/img/bVVUG5?w=612&amp;h=771" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">商品分类小红点</h2>
<p>我们只需要在<code>getshopnum</code>给商品判断购物车中给商品数量时，给该商品的分类也加上该商品的数量即可。修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//商品与购物车数量结合
      getshopnum:function(){
          for(var i=0;i<this.shopmean.length;i++){
              var thisnum=0;
              for(var k=0;k<this.shopmean[i].foods.length;k++){
                    var isadd=true;                          //判断该商品是否在购物车
                    for( var h=0;h<this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                            thisnum+=this.mycar[h].num;
                            isadd=false;
                            break;
                        }
                    }
                    if(isadd){
                        this.shopmean[i].foods[k].mynum=0;
                    }
                    
              }
              this.shopmean[i].mynum=thisnum;
          }
          return this.shopmean
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">//商品与购物车数量结合</span>
      getshopnum:function(){
          <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.shopmean.length;i++){
              <span class="hljs-keyword">var</span> thisnum=<span class="hljs-number">0</span>;
              <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k=<span class="hljs-number">0</span>;k&lt;<span class="hljs-keyword">this</span>.shopmean[i].foods.length;k++){
                    <span class="hljs-keyword">var</span> isadd=<span class="hljs-literal">true</span>;                          <span class="hljs-comment">//判断该商品是否在购物车</span>
                    <span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> h=<span class="hljs-number">0</span>;h&lt;<span class="hljs-keyword">this</span>.mycar.length;h++){
                        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.shopmean[i].foods[k].specfoods[<span class="hljs-number">0</span>]._id==<span class="hljs-keyword">this</span>.mycar[h].shop.specfoods[<span class="hljs-number">0</span>]._id){
                            <span class="hljs-keyword">this</span>.shopmean[i].foods[k].mynum=<span class="hljs-keyword">this</span>.mycar[h].num;
                            thisnum+=<span class="hljs-keyword">this</span>.mycar[h].num;
                            isadd=<span class="hljs-literal">false</span>;
                            <span class="hljs-keyword">break</span>;
                        }
                    }
                    <span class="hljs-keyword">if</span>(isadd){
                        <span class="hljs-keyword">this</span>.shopmean[i].foods[k].mynum=<span class="hljs-number">0</span>;
                    }
                    
              }
              <span class="hljs-keyword">this</span>.shopmean[i].mynum=thisnum;
          }
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.shopmean
      }</code></pre>
<p>结果如下<br><span class="img-wrap"><img data-src="/img/bVVX0e?w=609&amp;h=730" src="https://static.alili.tech/img/bVVX0e?w=609&amp;h=730" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>ok！购物车表面功夫写完了，下面升级购物车。<br><strong>注意</strong><br>购物车应该在渲染页面事就获取数据，所以在<code>mounted</code>中添加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //获取购物车信息
      if(localStorage.getItem(&quot;mycar&quot;)){
          that.mycar=JSON.parse(localStorage.getItem(&quot;mycar&quot;));
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code> //获取购物车信息
      <span class="hljs-keyword">if</span>(<span class="hljs-built_in">local</span>Storage.getItem(<span class="hljs-string">"mycar"</span>)){
          that.mycar=JSON.parse(<span class="hljs-built_in">local</span>Storage.getItem(<span class="hljs-string">"mycar"</span>));
      }</code></pre>
<p>最终shop.vue代码修改如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div id=&quot;shop&quot; class=&quot;bgfff&quot;>
        <transition name=&quot;left&quot;>
        <div v-if=&quot;myrouter&quot; class=&quot;big&quot;>
              <div class=&quot;topbg&quot;>
                      <img class=&quot;topbgimg&quot; :src=&quot;imgpath+shopinfo.image_path&quot;>
              </div>
              <div class=&quot;shoptop&quot;>
                  <div class=&quot;toptop ih30&quot;>
                    <router-link to=&quot;/miste&quot;>
                        <icon class=&quot;backicon&quot; name=&quot;back&quot;></icon>
                    </router-link>
                    <span class=&quot;right&quot;>
                        <icon class=&quot;backicon2&quot; name=&quot;cart&quot;></icon>
                        <icon class=&quot;backicon2&quot; name=&quot;more&quot;></icon> 
                    </span>
                  </div>
                  <div class=&quot;topfoot&quot;>
                      <div class=&quot;topleft&quot;>
                          <img :src=&quot;imgpath+shopinfo.image_path&quot;>
                      </div>
                      <div class=&quot;topright nowarp&quot;>
                          <router-link to=&quot;shop/shopDetail&quot;>
                              <div class=&quot;foota&quot;>
                                  <div class=&quot;footamain fs1-2 nowarp&quot;>"{{"shopinfo.name"}}"</div>
                                  <icon name=&quot;right&quot; class=&quot;icon3&quot;></icon>
                              </div>
                          </router-link>
                          <div class=&quot;footb nowarp&quot;>
                              <div class=&quot;nowarp&quot;>公告:"{{"shopinfo.promotion_info"}}"</div>
                          </div>
                          <div class=&quot;footc&quot;>
                              <span class=&quot;footcmain&quot;><span v-if=&quot;shopinfo.delivery_mode&quot;>"{{"shopinfo.delivery_mode.text"}}"•</span><span>约"{{"shopinfo.order_lead_time"}}"</span></span>
                          </div>
                      </div>
                  </div>
              </div>
              <div class=&quot;shopmid mgtop10&quot;>
                  <div @click=&quot;modal=true&quot; v-if=&quot;shopinfo.activities&quot; class=&quot;midtop&quot;><span class=&quot;te mgr5&quot;>"{{"shopinfo.activities[0].icon_name"}}"</span><span>"{{"shopinfo.activities[0].description"}}"</span><span class=&quot;right&quot;>"{{"shopinfo.activities.length"}}"个活动 <icon name=&quot;down&quot; class=&quot;icon4&quot;></icon></span></div>
                  <div class=&quot;mytab&quot;>
                      <div @click=&quot;footdiv=shoporscore=true&quot; :class=&quot;{ on:shoporscore }&quot;>商品</div>
                      <div @click=&quot;footdiv=shoporscore=false&quot; :class=&quot;{ on:!shoporscore }&quot;>评价"{{"shopinfo.rating"}}"分</div>
                  </div>
              </div>

          <transition name=&quot;left&quot;>
              <div v-if=&quot;shoporscore&quot; class=&quot;shopmain&quot;>
                  <div class=&quot;mianleft&quot;>
                      <div v-for=&quot;(item,index) in getshopnum&quot; @click=&quot;itemgo(index)&quot; :class=&quot;{on:index==shopon}&quot; class=&quot;relative leftdiv&quot;>
                          <div>
                              <icon v-if=&quot;index==0&quot; class=&quot;icon5&quot; name=&quot;hot&quot;></icon>
                              <icon v-if=&quot;index==1&quot; class=&quot;icon5&quot; name=&quot;discount&quot;></icon>
                              <span class=&quot;fs0-8&quot;>"{{"item.name"}}"</span>
                              <span v-if=&quot;item.mynum&quot; class=&quot;rednum2&quot;>"{{"item.mynum"}}"</span>
                          </div>
                      </div>
                  </div>
                  <div class=&quot;mainright&quot;>
                      <div class=&quot;item&quot; v-for=&quot;item in getshopnum&quot;>
                          <div class=&quot;itemtop padtop10 ih30 after&quot;>
                              <span class=&quot;fs15&quot;>"{{"item.name"}}"</span>
                              <span class=&quot;fs0-8 col9f&quot;>"{{"item.description"}}"</span>
                          </div>
                          <div class=&quot;itemmain&quot;>
                              <div v-for=&quot;items in item.foods&quot; class=&quot;after&quot;>
                                <router-link to=&quot;/shop/foodDetail&quot;>
                                    <div class=&quot;iteminfo&quot;>
                                        <div class=&quot;infoimgbox&quot;>
                                            <img :src=&quot;imgpath+items.image_path&quot;>
                                        </div>
                                        <div class=&quot;inforight nowarp&quot;>
                                            <div class=&quot;colblack fs15 ih20 nowarp&quot;>"{{"items.name"}}"</div>
                                            <div class=&quot;ih15 col9f&quot;><span class=&quot;fs10 mgl&quot;>"{{"items.tips"}}"</span></div>
                                            <div class=&quot;ih15&quot;><span v-if=&quot;false&quot; class=&quot;fs10 mgl&quot;><span class=&quot;zk&quot;>包装费</span><span class=&quot;yh&quot;>"{{""}}"</span></span></div>
                                            <div class=&quot;ih20&quot;>
                                              <span class=&quot;colred fs12&quot;>￥</span>
                                              <span class=&quot;colred mgr5&quot;>"{{"items.specfoods[0].price"}}"</span>
                                              <span v-if=&quot;items.specfoods[0].original_price&quot; class=&quot;fs12 col9f midline&quot;>￥56</span>
                                            </div>
                                        </div>
                                    </div>
                                  </router-link>
                                  <div class=&quot;iteminfofoot ih20&quot;>
                                          <transition name=&quot;top&quot;>
                                              <span v-if=&quot;items.mynum&quot; class=&quot;ih20&quot;>
                                                  <span @click=&quot;removecar(items)&quot;><icon class=&quot;addicon&quot; name=&quot;offline&quot;></icon></span>
                                                  <span class=&quot;ih20 inblock y-4&quot;>"{{"items.mynum"}}"</span>
                                              </span>
                                          </transition>
                                          <span v-if=&quot;items.specfoods.length==1&quot; @click=&quot;addcar(items)&quot; class=&quot;&quot;><icon name=&quot;add&quot; class=&quot;addicon&quot;></icon></span>
                                          <span class=&quot;fs12 right gz&quot; v-if=&quot;items.specfoods.length>1&quot;>选规则</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </transition>

          <transition name=&quot;right&quot;>
              <div class=&quot;score&quot; v-if=&quot;!shoporscore&quot;>
                  <div class=&quot;scoretop&quot;>
                    <div class=&quot;scoretopleft&quot;>
                        <div class=&quot;fs1-2 colf60&quot;>"{{"shopinfo.rating"}}"</div>
                        <div class=&quot;fs15 col9f&quot;>综合评价</div>
                        <div class=&quot;fs0-8 col9f&quot;>高于周边商家"{{"parseInt(scorerating.compare_rating*100)"}}"%</div>
                    </div>
                    <div class=&quot;scoretopright&quot;>
                        <div><span class=&quot;fs15 col9f mgr5&quot;>评价服务</span><stars :num=&quot;scorerating.service_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.service_score.toFixed(1)"}}"</span></div>
                        <div><span class=&quot;fs15 col9f mgr5&quot;>菜品评价</span><stars :num=&quot;scorerating.food_score.toFixed(1)&quot;></stars><span class=&quot;colf60 right&quot;>"{{"scorerating.food_score.toFixed(1)"}}"</span></div>
                        <div><span class=&quot;fs15 col9f mgr5&quot;>送达时间</span><span class=&quot;fs15 colf60&quot;>"{{"scorerating.deliver_time"}}"分钟</span></div>
                    </div>
                  </div>
                  <div class=&quot;scoremain&quot;>
                        <div class=&quot;scoremaintop after&quot;>
                          <div v-for=&quot;(item,index) in scoretags&quot; class=&quot;ih30 fs0-8&quot; :class=&quot;{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}&quot;>"{{"item.name"}}"("{{"item.count"}}")</div>
                        </div>
                        <div class=&quot;scoremaininfo&quot;>
                            <div v-for=&quot;item in score&quot; class=&quot;scoreitem after&quot;>
                                <div class=&quot;scoreitemleft&quot;>
                                    <img :src=&quot;imgaddpath(item.avatar)&quot; >
                                </div>
                                <div class=&quot;scoreitemright fs12 col9f&quot;>
                                    <div>
                                        <span>"{{"item.username"}}"</span>
                                        <span class=&quot;right&quot;>"{{"item.rated_at"}}"</span>
                                    </div>
                                    <div>
                                        <stars :num=&quot;item.rating_star&quot;></stars>
                                    </div>
                                    <div>
                                        "{{"item.time_spent_desc"}}"
                                    </div>
                                    <div class=&quot;scoreimgbox&quot;>
                                      <img v-for=&quot;itema in item.item_ratings&quot; :src=&quot;imgaddpath(itema.image_hash)&quot;>
                                    </div>
                                    <div class=&quot;namebox&quot;>
                                        <div v-for=&quot;itemb in item.item_ratings&quot;>"{{"itemb.food_name"}}"</div>
                                    </div>

                                </div>
                            </div>
                          
                        </div>
                  </div>
              </div>
          </transition>

          <transition name=&quot;top&quot;>
              <div v-if=&quot;modal&quot; class=&quot;modal flex2 colfff pad10&quot;>
                  <div class=&quot;modaltop flex1&quot;>
                    <div>
                      <div class=&quot;modaltitle&quot;>
                          "{{"shopinfo.name"}}"
                      </div>
                      <div class=&quot;modalmid&quot;>
                            <div class=&quot;modal_title ih30&quot;><span>优惠信息</span></div>
                            <div>
                                <div v-if=&quot;shopinfo.activities&quot; v-for=&quot;item in shopinfo.activities&quot; class=&quot;midtop&quot;><span class=&quot;te mgr5&quot;>"{{"item.icon_name"}}"</span><span>"{{"item.description"}}"</span></div>
                            </div>
                      </div>
                      <div class=&quot;modalinfo mgtop40&quot;>
                            <div class=&quot;modal_title ih30&quot;><span>商家公告</span></div>
                            <div> 
                                "{{"shopinfo.promotion_info"}}"  
                            </div>
                      </div>
                    </div>
                  </div>
                  <div @click=&quot;modal=false&quot; class=&quot;modalfoot&quot;>
                        <span>X</span>
                  </div>
              </div>
          </transition>

          <load v-if=&quot;num!=1&quot;></load>
    </div>
    </transition>

    <transition name=&quot;left&quot;>
          <div v-if=&quot;footdiv&quot; class=&quot;foot&quot; :class=&quot;{on:mycar.length>=1}&quot;>
                <div class=&quot;footleft&quot;>
                    <div class=&quot;footlogo&quot;>
                        <icon name=&quot;footcar&quot; class=&quot;footicon&quot;></icon>
                        <div v-if=&quot;mycar.length&quot; class=&quot;rednum&quot;>"{{"mycarshopnum"}}"</div>
                    </div>
                    <div class=&quot;footmain&quot;>
                        <div v-if=&quot;!mycar.length&quot; class=&quot;&quot;>未选购商品</div>
                        <div v-if=&quot;mycar.length&quot; class=&quot;ih30 fs1-2&quot;>￥ "{{"mycarshoppic"}}"</div>
                        <div v-if=&quot;mycar.length&quot; class=&quot;ih20&quot;>"{{"this.shopinfo.piecewise_agent_fee.tips"}}"</div>
                    </div>
                </div>
                <div class=&quot;footright&quot; :class=&quot;{on:shoppicbig==1}&quot;>
                    <span v-if=&quot;shoppicbig==3&quot;>￥"{{"this.shopinfo.float_minimum_order_amount"}}"起送</span>
                    <span v-if=&quot;shoppicbig==2&quot;>还差￥"{{"this.shopinfo.float_minimum_order_amount-mycarshoppic"}}"起送</span>
                    <span v-if=&quot;shoppicbig==1&quot;>去结算</span>
                </div>
          </div>
    </transition>

    <router-view></router-view>
  </div>
</template>

<script>
import stars from '../../components/stars/stars'
import load from '../../components/load/load'


export default {
  data () {
    return {
      mycar:&quot;&quot;,                                 //我的购物车
      footdiv:true,                             //脚部购物车是否显示
      shopon:0,                                 //商品种类选中的哪个
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:&quot;&quot;,                              //商家信息
      shopmean:&quot;&quot;,                              //食品信息
      shoporscore:true,                         //商家还是评价
      score:&quot;&quot;,                                 //评价信息
      scorerating:&quot;&quot;,                           //评价分数  
      scoretags:&quot;&quot;,                             //评价分类
      scoreindex:0,                             //选中第几个评价分类
      num:1,
      modal:false,                              //模态框显示隐藏
      myrouter:true,                            //是否显示big div
    }
  },
  components:{
  //注册组件
      stars,
      load
  },
  mounted:function(){
  //生命周期
      var that=this;
      //获取购物车信息
      if(localStorage.getItem(&quot;mycar&quot;)){
          that.mycar=JSON.parse(localStorage.getItem(&quot;mycar&quot;));
      }
      
      that.num=that.num-5;
      //餐馆详情
      this.$http.get('http://cangdu.org:8001/shopping/restaurant/'+this.$store.state.shopid+'').then(response => {
        console.log(response);
        this.shopinfo=response.body;
        that.num=that.num+1;
      }, response => {
        that.num=that.num+1;
        console.log(response);
      });
      //食品详情
      this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id='+this.$store.state.shopid+'').then(response => {
        console.log(response);
        that.num=that.num+1;
        this.shopmean=response.body;
      }, response => {
        that.num=that.num+1;
        console.log(response);
      });
      //评论详情
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings?offset=0&amp;limit=10').then(response => {
        console.log(response);
        that.num=that.num+1;
        this.score=response.body;
      }, response => {
        that.num=that.num+1;
        console.log(response);
      });
      //评论分数
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings/scores').then(response => {
        console.log(response);
        this.scorerating=response.body;
        that.num=that.num+1;
      }, response => {
        console.log(response);
        that.num=that.num+1;

      });
       //评论分类
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings/tags').then(response => {
        console.log(response);
        this.scoretags=response.body;
        that.num=that.num+1;

      }, response => {
        console.log(response);
        that.num=that.num+1;

      });
       let mydiv=document.querySelector('.mainright');
       mydiv.addEventListener('scroll', this.handleScroll);
  },
  computed:{
  //计算属性
      //计算商品数量
      mycarshopnum:function(){
          var num=0;
          for(var i=0;i<this.mycar.length;i++){
                num+=this.mycar[i].num;
          }
          return num
      },
      //计算商品价格(商品只有一个种类)
      mycarshoppic:function(){
          var num=0;
           if(this.mycar.length){
              for(var i=0;i<this.mycar.length;i++){
                num+=(this.mycar[i].shop.specfoods[0].price*this.mycar[i].num);
              }
           };          
          return num;
      },
      //判断商家起送价与目前购物车价格
      shoppicbig:function(){
                    if(this.mycarshoppic>=this.shopinfo.float_minimum_order_amount){
                        return 1
                    }else if(this.mycarshoppic==0){
                        return 3
                    }else{
                        return 2
                    }
      },
      //商品与购物车数量结合
      getshopnum:function(){
          for(var i=0;i<this.shopmean.length;i++){
              var thisnum=0;
              for(var k=0;k<this.shopmean[i].foods.length;k++){
                    var isadd=true;                          //判断该商品是否在购物车
                    for( var h=0;h<this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                            thisnum+=this.mycar[h].num;
                            isadd=false;
                            break;
                        }
                    }
                    if(isadd){
                        this.shopmean[i].foods[k].mynum=0;
                    }
                    
              }
              this.shopmean[i].mynum=thisnum;
          }
          return this.shopmean
      }
      
  },
  methods:{
  //函数
      imgaddpath:function(e){
        return &quot;https://fuss10.elemecdn.com/&quot;+e+&quot;.jpeg&quot;
      },
      itemgo:function(index){
        this.shopon=index;
        document.querySelector('.mainright').scrollTop=document.querySelectorAll('.itemtop')[index].offsetTop;
      },
      handleScroll:function(){
        var mydiv=document.querySelectorAll('.item');
        for(var i =0;i<mydiv.length;i++){
           if(mydiv[i].offsetTop>document.querySelector('.mainright').scrollTop-10&amp;&amp;mydiv[i].offsetTop<document.querySelector('.mainright').scrollTop+10){
                this.shopon=i;   
           }
        }
      },
      newpage:function(){
        this.myrouter=(this.$route.path==&quot;/shop&quot;?true:false);
        this.footdiv=(((this.$route.path==&quot;/shop&quot;&amp;&amp;this.shoporscore)||this.$route.path==&quot;/shop/foodDetail&quot;)?true:false);
      },
      gofoodDetail:function(){
          this.$router.push(&quot;/shop/foodDetail&quot;);
      },
      addcar:function(e){
          var that=this;
          if(localStorage.getItem(&quot;mycar&quot;)){
              var mycar=JSON.parse(localStorage.getItem(&quot;mycar&quot;));
              var addok=true;                                              //数据是否添加
              for(var i =0;i<mycar.length;i++){
                  if(mycar[i].shop.item_id==e.item_id&amp;&amp;mycar[i].shop.category_id==e.category_id&amp;&amp;mycar[i].shop.restaurant_id==e.restaurant_id){
                      mycar[i].num=mycar[i].num+1;
                      addok=false;
                      break;
                  }
              }
              if(addok){
                    mycar.push({&quot;shop&quot;:e,&quot;num&quot;:1});
              }
              that.mycar=mycar;
              localStorage.setItem(&quot;mycar&quot;,JSON.stringify(mycar));
          }else{
              var mycar=[{&quot;shop&quot;:e,&quot;num&quot;:1}];
              that.mycar=mycar;
              localStorage.setItem(&quot;mycar&quot;,JSON.stringify(mycar));
          };
      },
      removecar:function(e){
          for(var i=0;i<this.mycar.length;i++){
              if(this.mycar[i].shop.specfoods[0]._id==e.specfoods[0]._id){
                    this.mycar[i].num==1?this.mycar.splice(i,1):(this.mycar[i].num=this.mycar[i].num-1);
                    break;
              }
          }
          localStorage.setItem(&quot;mycar&quot;,JSON.stringify(this.mycar));
      }
  },
  watch:{
       &quot;$route&quot;:&quot;newpage&quot;,
  }
}
</script>

<!-- Add &quot;scoped&quot; attribute to limit CSS to this component only -->
<style scoped>
.big{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}

.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft>img{
  max-width:100%;
  max-height:100%;
  border-radius:3px;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab>div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab>div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv>div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on>div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
  margin-bottom:50px;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
  position: relative;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  width:100%;
}
.foot.on .footicon{
  color:#fff;
}
.foot.on .footmain{
  color:#fff;
}
.foot.on .footright{
  color:#fff;
}
.foot.on .footlogo{
  background-color:#3190E8;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footright.on{
  background-color:#4CD964;
  color:white;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  color:#8a8a8a;
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox>img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;
}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.gz{
  display:inline-block;
  background-color:#3190E8;
  color:white;
  padding:0px 2px;
  border-radius:2px;
}

.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:2;
  text-align:center;
}
.scoretopright{
  flex:3;
}
.scoretopright>div{
  display:flex;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop>div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
}
.scoreitemleft>img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox>div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow-y: scroll;
}
.scoreimgbox>img{
  width:4rem;
  height:4rem;
  margin-right:10px;
}
.modal{
  box-sizing:border-box;
  width:100vw;
  height:100vh;
  background-color:#262626;
  position:fixed;
  top:0px;
  left:0px;
  z-index:10;
  
}
.modaltop{
  overflow: scroll;
}
.modaltitle{
  margin:20px 0px;
  text-align:center;
  font-size:1.5rem;
}
.modal_title{
  text-align:center;
  margin:10px;
}
.modal_title>span{
  padding:2px 5px;
  border:1px solid #fff;
  border-radius:5px;
}
.modalfoot{
  width:100%;
  margin-bottom:10px;
  justify-content:flex-end;
  text-align:center;
}
.modalfoot>span{
  display: inline-block;
  border:1px solid #fff;
  border-radius:50%;
  width:30px;
  padding:5px;
  height:30px;
  ling-height:30px;
  font-size:25px;
}
.iteminfofoot{
  position: absolute;
  bottom: 10px;
  right: 0px;
}
.hidden{
  overflow: hidden;
}
.rednum{
   position: absolute;
   top:-3px;
   right:-5px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:18px;
   width:18px;
   text-align:center;
   line-height:18px;
   font-size:12px;
}
.y-4{
  transform: translateY(-4px);
}
.rednum2{
  position: absolute;
   top:0px;
   right:0px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:15px;
   width:15px;
   text-align:center;
   line-height:15px;
   font-size:12px;
}
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>&lt;template&gt;
  &lt;div id="shop" class="bgfff"&gt;
        &lt;transition name="left"&gt;
        &lt;div v-if="myrouter" class="big"&gt;
              &lt;div class="topbg"&gt;
                      &lt;img class="topbgimg" :src="imgpath+shopinfo.image_path"&gt;
              &lt;/div&gt;
              &lt;div class="shoptop"&gt;
                  &lt;div class="toptop ih30"&gt;
                    &lt;router-link to="/miste"&gt;
                        &lt;icon class="backicon" name="back"&gt;&lt;/icon&gt;
                    &lt;/router-link&gt;
                    &lt;span class="right"&gt;
                        &lt;icon class="backicon2" name="cart"&gt;&lt;/icon&gt;
                        &lt;icon class="backicon2" name="more"&gt;&lt;/icon&gt; 
                    &lt;/span&gt;
                  &lt;/div&gt;
                  &lt;div class="topfoot"&gt;
                      &lt;div class="topleft"&gt;
                          &lt;img :src="imgpath+shopinfo.image_path"&gt;
                      &lt;/div&gt;
                      &lt;div class="topright nowarp"&gt;
                          &lt;router-link to="shop/shopDetail"&gt;
                              &lt;div class="foota"&gt;
                                  &lt;div class="footamain fs1-2 nowarp"&gt;"{{"shopinfo.name"}}"&lt;/div&gt;
                                  &lt;icon name="right" class="icon3"&gt;&lt;/icon&gt;
                              &lt;/div&gt;
                          &lt;/router-link&gt;
                          &lt;div class="footb nowarp"&gt;
                              &lt;div class="nowarp"&gt;公告:"{{"shopinfo.promotion_info"}}"&lt;/div&gt;
                          &lt;/div&gt;
                          &lt;div class="footc"&gt;
                              &lt;span class="footcmain"&gt;&lt;span v-if="shopinfo.delivery_mode"&gt;"{{"shopinfo.delivery_mode.text"}}"•&lt;/span&gt;&lt;span&gt;约"{{"shopinfo.order_lead_time"}}"&lt;/span&gt;&lt;/span&gt;
                          &lt;/div&gt;
                      &lt;/div&gt;
                  &lt;/div&gt;
              &lt;/div&gt;
              &lt;div class="shopmid mgtop10"&gt;
                  &lt;div @click="modal=true" v-if="shopinfo.activities" class="midtop"&gt;&lt;span class="te mgr5"&gt;"{{"shopinfo.activities[0].icon_name"}}"&lt;/span&gt;&lt;span&gt;"{{"shopinfo.activities[0].description"}}"&lt;/span&gt;&lt;span class="right"&gt;"{{"shopinfo.activities.length"}}"个活动 &lt;icon name="down" class="icon4"&gt;&lt;/icon&gt;&lt;/span&gt;&lt;/div&gt;
                  &lt;div class="mytab"&gt;
                      &lt;div @click="footdiv=shoporscore=true" :class="{ on:shoporscore }"&gt;商品&lt;/div&gt;
                      &lt;div @click="footdiv=shoporscore=false" :class="{ on:!shoporscore }"&gt;评价"{{"shopinfo.rating"}}"分&lt;/div&gt;
                  &lt;/div&gt;
              &lt;/div&gt;

          &lt;transition name="left"&gt;
              &lt;div v-if="shoporscore" class="shopmain"&gt;
                  &lt;div class="mianleft"&gt;
                      &lt;div v-for="(item,index) in getshopnum" @click="itemgo(index)" :class="{on:index==shopon}" class="relative leftdiv"&gt;
                          &lt;div&gt;
                              &lt;icon v-if="index==0" class="icon5" name="hot"&gt;&lt;/icon&gt;
                              &lt;icon v-if="index==1" class="icon5" name="discount"&gt;&lt;/icon&gt;
                              &lt;span class="fs0-8"&gt;"{{"item.name"}}"&lt;/span&gt;
                              &lt;span v-if="item.mynum" class="rednum2"&gt;"{{"item.mynum"}}"&lt;/span&gt;
                          &lt;/div&gt;
                      &lt;/div&gt;
                  &lt;/div&gt;
                  &lt;div class="mainright"&gt;
                      &lt;div class="item" v-for="item in getshopnum"&gt;
                          &lt;div class="itemtop padtop10 ih30 after"&gt;
                              &lt;span class="fs15"&gt;"{{"item.name"}}"&lt;/span&gt;
                              &lt;span class="fs0-8 col9f"&gt;"{{"item.description"}}"&lt;/span&gt;
                          &lt;/div&gt;
                          &lt;div class="itemmain"&gt;
                              &lt;div v-for="items in item.foods" class="after"&gt;
                                &lt;router-link to="/shop/foodDetail"&gt;
                                    &lt;div class="iteminfo"&gt;
                                        &lt;div class="infoimgbox"&gt;
                                            &lt;img :src="imgpath+items.image_path"&gt;
                                        &lt;/div&gt;
                                        &lt;div class="inforight nowarp"&gt;
                                            &lt;div class="colblack fs15 ih20 nowarp"&gt;"{{"items.name"}}"&lt;/div&gt;
                                            &lt;div class="ih15 col9f"&gt;&lt;span class="fs10 mgl"&gt;"{{"items.tips"}}"&lt;/span&gt;&lt;/div&gt;
                                            &lt;div class="ih15"&gt;&lt;span v-if="false" class="fs10 mgl"&gt;&lt;span class="zk"&gt;包装费&lt;/span&gt;&lt;span class="yh"&gt;"{{""}}"&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;
                                            &lt;div class="ih20"&gt;
                                              &lt;span class="colred fs12"&gt;￥&lt;/span&gt;
                                              &lt;span class="colred mgr5"&gt;"{{"items.specfoods[0].price"}}"&lt;/span&gt;
                                              &lt;span v-if="items.specfoods[0].original_price" class="fs12 col9f midline"&gt;￥56&lt;/span&gt;
                                            &lt;/div&gt;
                                        &lt;/div&gt;
                                    &lt;/div&gt;
                                  &lt;/router-link&gt;
                                  &lt;div class="iteminfofoot ih20"&gt;
                                          &lt;transition name="top"&gt;
                                              &lt;span v-if="items.mynum" class="ih20"&gt;
                                                  &lt;span @click="removecar(items)"&gt;&lt;icon class="addicon" name="offline"&gt;&lt;/icon&gt;&lt;/span&gt;
                                                  &lt;span class="ih20 inblock y-4"&gt;"{{"items.mynum"}}"&lt;/span&gt;
                                              &lt;/span&gt;
                                          &lt;/transition&gt;
                                          &lt;span v-if="items.specfoods.length==1" @click="addcar(items)" class=""&gt;&lt;icon name="add" class="addicon"&gt;&lt;/icon&gt;&lt;/span&gt;
                                          &lt;span class="fs12 right gz" v-if="items.specfoods.length&gt;1"&gt;选规则&lt;/span&gt;
                                  &lt;/div&gt;
                              &lt;/div&gt;
                          &lt;/div&gt;
                      &lt;/div&gt;
                  &lt;/div&gt;
              &lt;/div&gt;
          &lt;/transition&gt;

          &lt;transition name="right"&gt;
              &lt;div class="score" v-if="!shoporscore"&gt;
                  &lt;div class="scoretop"&gt;
                    &lt;div class="scoretopleft"&gt;
                        &lt;div class="fs1-2 colf60"&gt;"{{"shopinfo.rating"}}"&lt;/div&gt;
                        &lt;div class="fs15 col9f"&gt;综合评价&lt;/div&gt;
                        &lt;div class="fs0-8 col9f"&gt;高于周边商家"{{"parseInt(scorerating.compare_rating*100)"}}"%&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="scoretopright"&gt;
                        &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;评价服务&lt;/span&gt;&lt;stars :num="scorerating.service_score.toFixed(1)"&gt;&lt;/stars&gt;&lt;span class="colf60 right"&gt;"{{"scorerating.service_score.toFixed(1)"}}"&lt;/span&gt;&lt;/div&gt;
                        &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;菜品评价&lt;/span&gt;&lt;stars :num="scorerating.food_score.toFixed(1)"&gt;&lt;/stars&gt;&lt;span class="colf60 right"&gt;"{{"scorerating.food_score.toFixed(1)"}}"&lt;/span&gt;&lt;/div&gt;
                        &lt;div&gt;&lt;span class="fs15 col9f mgr5"&gt;送达时间&lt;/span&gt;&lt;span class="fs15 colf60"&gt;"{{"scorerating.deliver_time"}}"分钟&lt;/span&gt;&lt;/div&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                  &lt;div class="scoremain"&gt;
                        &lt;div class="scoremaintop after"&gt;
                          &lt;div v-for="(item,index) in scoretags" class="ih30 fs0-8" :class="{sty2:item.unsatisfied,sty1:!(item.unsatisfied),on:index==scoreindex}"&gt;"{{"item.name"}}"("{{"item.count"}}")&lt;/div&gt;
                        &lt;/div&gt;
                        &lt;div class="scoremaininfo"&gt;
                            &lt;div v-for="item in score" class="scoreitem after"&gt;
                                &lt;div class="scoreitemleft"&gt;
                                    &lt;img :src="imgaddpath(item.avatar)" &gt;
                                &lt;/div&gt;
                                &lt;div class="scoreitemright fs12 col9f"&gt;
                                    &lt;div&gt;
                                        &lt;span&gt;"{{"item.username"}}"&lt;/span&gt;
                                        &lt;span class="right"&gt;"{{"item.rated_at"}}"&lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        &lt;stars :num="item.rating_star"&gt;&lt;/stars&gt;
                                    &lt;/div&gt;
                                    &lt;div&gt;
                                        "{{"item.time_spent_desc"}}"
                                    &lt;/div&gt;
                                    &lt;div class="scoreimgbox"&gt;
                                      &lt;img v-for="itema in item.item_ratings" :src="imgaddpath(itema.image_hash)"&gt;
                                    &lt;/div&gt;
                                    &lt;div class="namebox"&gt;
                                        &lt;div v-for="itemb in item.item_ratings"&gt;"{{"itemb.food_name"}}"&lt;/div&gt;
                                    &lt;/div&gt;

                                &lt;/div&gt;
                            &lt;/div&gt;
                          
                        &lt;/div&gt;
                  &lt;/div&gt;
              &lt;/div&gt;
          &lt;/transition&gt;

          &lt;transition name="top"&gt;
              &lt;div v-if="modal" class="modal flex2 colfff pad10"&gt;
                  &lt;div class="modaltop flex1"&gt;
                    &lt;div&gt;
                      &lt;div class="modaltitle"&gt;
                          "{{"shopinfo.name"}}"
                      &lt;/div&gt;
                      &lt;div class="modalmid"&gt;
                            &lt;div class="modal_title ih30"&gt;&lt;span&gt;优惠信息&lt;/span&gt;&lt;/div&gt;
                            &lt;div&gt;
                                &lt;div v-if="shopinfo.activities" v-for="item in shopinfo.activities" class="midtop"&gt;&lt;span class="te mgr5"&gt;"{{"item.icon_name"}}"&lt;/span&gt;&lt;span&gt;"{{"item.description"}}"&lt;/span&gt;&lt;/div&gt;
                            &lt;/div&gt;
                      &lt;/div&gt;
                      &lt;div class="modalinfo mgtop40"&gt;
                            &lt;div class="modal_title ih30"&gt;&lt;span&gt;商家公告&lt;/span&gt;&lt;/div&gt;
                            &lt;div&gt; 
                                "{{"shopinfo.promotion_info"}}"  
                            &lt;/div&gt;
                      &lt;/div&gt;
                    &lt;/div&gt;
                  &lt;/div&gt;
                  &lt;div @click="modal=false" class="modalfoot"&gt;
                        &lt;span&gt;X&lt;/span&gt;
                  &lt;/div&gt;
              &lt;/div&gt;
          &lt;/transition&gt;

          &lt;load v-if="num!=1"&gt;&lt;/load&gt;
    &lt;/div&gt;
    &lt;/transition&gt;

    &lt;transition name="left"&gt;
          &lt;div v-if="footdiv" class="foot" :class="{on:mycar.length&gt;=1}"&gt;
                &lt;div class="footleft"&gt;
                    &lt;div class="footlogo"&gt;
                        &lt;icon name="footcar" class="footicon"&gt;&lt;/icon&gt;
                        &lt;div v-if="mycar.length" class="rednum"&gt;"{{"mycarshopnum"}}"&lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="footmain"&gt;
                        &lt;div v-if="!mycar.length" class=""&gt;未选购商品&lt;/div&gt;
                        &lt;div v-if="mycar.length" class="ih30 fs1-2"&gt;￥ "{{"mycarshoppic"}}"&lt;/div&gt;
                        &lt;div v-if="mycar.length" class="ih20"&gt;"{{"this.shopinfo.piecewise_agent_fee.tips"}}"&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="footright" :class="{on:shoppicbig==1}"&gt;
                    &lt;span v-if="shoppicbig==3"&gt;￥"{{"this.shopinfo.float_minimum_order_amount"}}"起送&lt;/span&gt;
                    &lt;span v-if="shoppicbig==2"&gt;还差￥"{{"this.shopinfo.float_minimum_order_amount-mycarshoppic"}}"起送&lt;/span&gt;
                    &lt;span v-if="shoppicbig==1"&gt;去结算&lt;/span&gt;
                &lt;/div&gt;
          &lt;/div&gt;
    &lt;/transition&gt;

    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import stars from '../../components/stars/stars'
import load from '../../components/load/load'


export default {
  data () {
    return {
      mycar:"",                                 //我的购物车
      footdiv:true,                             //脚部购物车是否显示
      shopon:0,                                 //商品种类选中的哪个
      imgpath:'http://cangdu.org:8001/img/',    //商家头像的路径地址path
      shopinfo:"",                              //商家信息
      shopmean:"",                              //食品信息
      shoporscore:true,                         //商家还是评价
      score:"",                                 //评价信息
      scorerating:"",                           //评价分数  
      scoretags:"",                             //评价分类
      scoreindex:0,                             //选中第几个评价分类
      num:1,
      modal:false,                              //模态框显示隐藏
      myrouter:true,                            //是否显示big div
    }
  },
  components:{
  //注册组件
      stars,
      load
  },
  mounted:function(){
  //生命周期
      var that=this;
      //获取购物车信息
      if(localStorage.getItem("mycar")){
          that.mycar=JSON.parse(localStorage.getItem("mycar"));
      }
      
      that.num=that.num-5;
      //餐馆详情
      this.$http.get('http://cangdu.org:8001/shopping/restaurant/'+this.$store.state.shopid+'').then(response =&gt; {
        console.log(response);
        this.shopinfo=response.body;
        that.num=that.num+1;
      }, response =&gt; {
        that.num=that.num+1;
        console.log(response);
      });
      //食品详情
      this.$http.get('http://cangdu.org:8001/shopping/v2/menu?restaurant_id='+this.$store.state.shopid+'').then(response =&gt; {
        console.log(response);
        that.num=that.num+1;
        this.shopmean=response.body;
      }, response =&gt; {
        that.num=that.num+1;
        console.log(response);
      });
      //评论详情
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings?offset=0&amp;limit=10').then(response =&gt; {
        console.log(response);
        that.num=that.num+1;
        this.score=response.body;
      }, response =&gt; {
        that.num=that.num+1;
        console.log(response);
      });
      //评论分数
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings/scores').then(response =&gt; {
        console.log(response);
        this.scorerating=response.body;
        that.num=that.num+1;
      }, response =&gt; {
        console.log(response);
        that.num=that.num+1;

      });
       //评论分类
      this.$http.get('http://cangdu.org:8001/ugc/v2/restaurants/'+this.$store.state.shopid+'/ratings/tags').then(response =&gt; {
        console.log(response);
        this.scoretags=response.body;
        that.num=that.num+1;

      }, response =&gt; {
        console.log(response);
        that.num=that.num+1;

      });
       let mydiv=document.querySelector('.mainright');
       mydiv.addEventListener('scroll', this.handleScroll);
  },
  computed:{
  //计算属性
      //计算商品数量
      mycarshopnum:function(){
          var num=0;
          for(var i=0;i&lt;this.mycar.length;i++){
                num+=this.mycar[i].num;
          }
          return num
      },
      //计算商品价格(商品只有一个种类)
      mycarshoppic:function(){
          var num=0;
           if(this.mycar.length){
              for(var i=0;i&lt;this.mycar.length;i++){
                num+=(this.mycar[i].shop.specfoods[0].price*this.mycar[i].num);
              }
           };          
          return num;
      },
      //判断商家起送价与目前购物车价格
      shoppicbig:function(){
                    if(this.mycarshoppic&gt;=this.shopinfo.float_minimum_order_amount){
                        return 1
                    }else if(this.mycarshoppic==0){
                        return 3
                    }else{
                        return 2
                    }
      },
      //商品与购物车数量结合
      getshopnum:function(){
          for(var i=0;i&lt;this.shopmean.length;i++){
              var thisnum=0;
              for(var k=0;k&lt;this.shopmean[i].foods.length;k++){
                    var isadd=true;                          //判断该商品是否在购物车
                    for( var h=0;h&lt;this.mycar.length;h++){
                        if(this.shopmean[i].foods[k].specfoods[0]._id==this.mycar[h].shop.specfoods[0]._id){
                            this.shopmean[i].foods[k].mynum=this.mycar[h].num;
                            thisnum+=this.mycar[h].num;
                            isadd=false;
                            break;
                        }
                    }
                    if(isadd){
                        this.shopmean[i].foods[k].mynum=0;
                    }
                    
              }
              this.shopmean[i].mynum=thisnum;
          }
          return this.shopmean
      }
      
  },
  methods:{
  //函数
      imgaddpath:function(e){
        return "https://fuss10.elemecdn.com/"+e+".jpeg"
      },
      itemgo:function(index){
        this.shopon=index;
        document.querySelector('.mainright').scrollTop=document.querySelectorAll('.itemtop')[index].offsetTop;
      },
      handleScroll:function(){
        var mydiv=document.querySelectorAll('.item');
        for(var i =0;i&lt;mydiv.length;i++){
           if(mydiv[i].offsetTop&gt;document.querySelector('.mainright').scrollTop-10&amp;&amp;mydiv[i].offsetTop&lt;document.querySelector('.mainright').scrollTop+10){
                this.shopon=i;   
           }
        }
      },
      newpage:function(){
        this.myrouter=(this.$route.path=="/shop"?true:false);
        this.footdiv=(((this.$route.path=="/shop"&amp;&amp;this.shoporscore)||this.$route.path=="/shop/foodDetail")?true:false);
      },
      gofoodDetail:function(){
          this.$router.push("/shop/foodDetail");
      },
      addcar:function(e){
          var that=this;
          if(localStorage.getItem("mycar")){
              var mycar=JSON.parse(localStorage.getItem("mycar"));
              var addok=true;                                              //数据是否添加
              for(var i =0;i&lt;mycar.length;i++){
                  if(mycar[i].shop.item_id==e.item_id&amp;&amp;mycar[i].shop.category_id==e.category_id&amp;&amp;mycar[i].shop.restaurant_id==e.restaurant_id){
                      mycar[i].num=mycar[i].num+1;
                      addok=false;
                      break;
                  }
              }
              if(addok){
                    mycar.push({"shop":e,"num":1});
              }
              that.mycar=mycar;
              localStorage.setItem("mycar",JSON.stringify(mycar));
          }else{
              var mycar=[{"shop":e,"num":1}];
              that.mycar=mycar;
              localStorage.setItem("mycar",JSON.stringify(mycar));
          };
      },
      removecar:function(e){
          for(var i=0;i&lt;this.mycar.length;i++){
              if(this.mycar[i].shop.specfoods[0]._id==e.specfoods[0]._id){
                    this.mycar[i].num==1?this.mycar.splice(i,1):(this.mycar[i].num=this.mycar[i].num-1);
                    break;
              }
          }
          localStorage.setItem("mycar",JSON.stringify(this.mycar));
      }
  },
  watch:{
       "$route":"newpage",
  }
}
&lt;/script&gt;

&lt;!-- Add "scoped" attribute to limit CSS to this component only --&gt;
&lt;style scoped&gt;
.big{
  display:-webkit-box;
  -webkit-box-orient:vertical;
  height:100vh;
}

.shoptop{
  height:120px;
  background-color: rgba(119,103,137,.43);
  box-sizing:border-box;
  padding:10px 10px 0px 10px;
  position: relative;
}
.topbg{
  position: absolute;
  width:100%;
  height:120px;
  left:0px;
  right:0px;
  overflow:hidden;
}
.topbgimg{
  width:100%;
  filter: blur(10px);
}
.backicon{
  height:30px;
  width:30px;
}
.backicon2{
  height:25px;
  width:25px;
}
.toptop{
  margin-bottom:10px;
}
.topfoot{
  height:70px;
  display:flex;
}
.topleft{
  height:80px;
  width:80px;
  background-color:#3c3c3c;
  margin-right:10px;
  border-radius:3px;
  box-shadow:0 0 5px #3c3c3c;  
}
.topleft&gt;img{
  max-width:100%;
  max-height:100%;
  border-radius:3px;
}
.topright,.topleft{
  float:left;
}
.topright{
  height:100%;
  flex:1;
}
.foota{
  height:30px;
  color:white;
  line-height:30px;
  display:flex;
}
.icon3{
  width:20px;
  height:20px;
  margin-top:5px;
}
.footc{
  height:20px;
  line-height:20px;
  font-size:12px;
}
.footb{
  font-size:12px;
  color:white;
}
.footcmain{
  background-color:#0097FF;
  color:white;
  padding:0px 5px; 
}
.shopmid{
  padding:10px 10px 0px 10px;
  border-bottom:2px solid #F8F8F8;
}
.midtop{
  font-size:12px;
}
.te{
  background-color:#F08449;
  padding:0px 1px;
  color:white;
}
.mytab{
  overflow:hidden;
  margin-top:10px;
}
.mytab&gt;div{
  float:left;
  padding-bottom:10px;
  margin-right:10px;
  border-bottom:2px solid white;
}
.mytab&gt;div.on{
  color:#0B89FF;
  border-color:#0B89FF;
}
.leftdiv{
  width:60px;
  padding:0px 10px;
  color:#727272;
  background-color:#F8F8F8;
}
.leftdiv&gt;div{
  padding:15px 0px;
  border-bottom:1px solid #F1F1F1;
}
.leftdiv.on{
  background-color:white;
  color:#080808;
}
.leftdiv.on&gt;div{
  border:0px;
}
.icon5{
  width:15px;
  height:15px;
}
.mianleft{
  width:80px;
  box-sizing:border-box;
  overflow:scroll;
}
.shopmain{
  -webkit-box-flex:1;
  display:-webkit-box;
  overflow:hidden;
  margin-bottom:50px;
}
.mainright{
  -webkit-box-flex:1;
  overflow:scroll;
  padding-left:10px;
  position: relative;
}
.foot{
  height:50px;
  line-height:50px;
  background-color:#594C46;
  display:flex;
  position:fixed;
  bottom:0px;
  left:0px;
  width:100%;
}
.foot.on .footicon{
  color:#fff;
}
.foot.on .footmain{
  color:#fff;
}
.foot.on .footright{
  color:#fff;
}
.foot.on .footlogo{
  background-color:#3190E8;
}
.footleft{
  flex:2;
  display:flex;
}
.footright{
  flex:1;
  text-align:center;
  color:#B7B7B7;
  background-color:#61686A;
}
.footright.on{
  background-color:#4CD964;
  color:white;
}
.footlogo{
  text-align:center;
  width:50px;
  height:50px;
  border-radius:50%;
  background-color:#515151;
  margin:0px 10px;
  border:3px solid #444446;
  transform:translatey(-15px)
}
.footicon{
  color:#8a8a8a;
  width:40px;
  height:40px;
  margin-top:7px;
}
.footmain{
  height:50px;
  color:#ADADAD;
  font-size:0.8rem;
}
.itemmain{
  padding-right:10px;
 
}
.iteminfo{
   height:70px;
   display:flex;
   padding:10px 0px;
}
.infoimgbox{
  width:70px;
  height:70px;
  margin-right:5px;
  background-color:red;
}
.infoimgbox&gt;img{
  width:100%;
  height:100%;
}
.inforight{
  flex:1;
}
.ih20{
  height:20px;
  line-height:20px;
}
.ih15{
  height:15px;
  line-height:15px;
}
.addicon{
  width:20px;
  height:20px;
}
.zk{
  background-color:#FF5F15;
  padding:0px 3px;
  color:white;
  border:1px solid #FF5F15;
}
.yh{
  padding:0px 3px;
  color:#FF5F15;
  border:1px solid #FF5F15;
}
.gz{
  display:inline-block;
  background-color:#3190E8;
  color:white;
  padding:0px 2px;
  border-radius:2px;
}

.scoretop{
  display:flex;
  padding:0px 10px 10px 10px;
  border-bottom:10px solid #F5F5F5;
}
.scoretopleft{
  flex:2;
  text-align:center;
}
.scoretopright{
  flex:3;
}
.scoretopright&gt;div{
  display:flex;
}
.scoremain{
  padding:0px 10px;
}
.scoremaintop{
  padding:10px 0px 5px 0px;
  display:flex;
  flex-wrap:wrap;
}
.scoremaintop&gt;div{
  padding:0px 8px;
  border-radius:5px;
  margin-right:5px;
  margin-bottom:5px;
}
.sty1{
  background-color:#EBF5FF;
  color:#9f9f9f;
}
.sty1.on{
  background-color:#3190E8;
  color:#fff;
}
.sty2{
  background-color:#F5F5F5;
  color:#AFAFAF;
}
.scoreitem{
  display:flex;
  margin-top:10px;
}
.scoreitemleft{
  width:50px;
  height:50px;
  margin-right:10px;
}
.scoreitemleft&gt;img{
  width:100%;
  border-radius:50%; 
}
.scoreitemright{
  flex:1;
}
.namebox{
  display:flex;
  flex-wrap: wrap;
}
.namebox&gt;div{
  border:1px solid;
  padding:3px 3px;
  margin-right:5px;
  border-radius:3px;
  margin-bottom:5px;
}
.score{
  padding-top:10px;
  flex:1;
  overflow-y: scroll;
}
.scoreimgbox&gt;img{
  width:4rem;
  height:4rem;
  margin-right:10px;
}
.modal{
  box-sizing:border-box;
  width:100vw;
  height:100vh;
  background-color:#262626;
  position:fixed;
  top:0px;
  left:0px;
  z-index:10;
  
}
.modaltop{
  overflow: scroll;
}
.modaltitle{
  margin:20px 0px;
  text-align:center;
  font-size:1.5rem;
}
.modal_title{
  text-align:center;
  margin:10px;
}
.modal_title&gt;span{
  padding:2px 5px;
  border:1px solid #fff;
  border-radius:5px;
}
.modalfoot{
  width:100%;
  margin-bottom:10px;
  justify-content:flex-end;
  text-align:center;
}
.modalfoot&gt;span{
  display: inline-block;
  border:1px solid #fff;
  border-radius:50%;
  width:30px;
  padding:5px;
  height:30px;
  ling-height:30px;
  font-size:25px;
}
.iteminfofoot{
  position: absolute;
  bottom: 10px;
  right: 0px;
}
.hidden{
  overflow: hidden;
}
.rednum{
   position: absolute;
   top:-3px;
   right:-5px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:18px;
   width:18px;
   text-align:center;
   line-height:18px;
   font-size:12px;
}
.y-4{
  transform: translateY(-4px);
}
.rednum2{
  position: absolute;
   top:0px;
   right:0px;
   border-radius:50%;
   background-color:red;
   color:white;
   height:15px;
   width:15px;
   text-align:center;
   line-height:15px;
   font-size:12px;
}
&lt;/style&gt;
</code></pre>
<p>引入的全局css如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{
    margin: 0px;
    height: 100vh;
    background-color: #f5f5f5;
}

*{
    text-decoration:none;
}
.fixed{
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 5;
}

.ih40{
    height: 40px;
    line-height: 40px;
}
.ih30{
    height: 30px;
    line-height: 30px;
}
.ih50{
    height: 50px;
    line-height: 50px;
}

.bgcol{
    background-color:#26a2ff;
}
.bgfff{
    background-color: #fff;
}
.bgf5{
    background-color:#F5F5F5;
}

.fs0-8{
    font-size: 0.8rem !important;
}
.fs1-2{
    font-size: 1.2rem;
}
.fs15{
    font-size: 15px;
}
.fs12{
    font-size: 12px;
}
.fs10{
    font-size: 12px;
    transform: scale(.8);
    display:inline-block;
}
.mgr{
  transform-origin:100% 50% 0;/*改变缩放基点*/
}
.mgl{
  transform-origin:0 50% 0;/*改变缩放基点*/
}
.colfff{
    color: #fff;
}
.col9f{
    color: #9F9F9F;
}
.colf60{
    color: #FF6600;
}
.col{
    color: #26a2ff;
}
.colred{
    color:#FE3D3D;
}
.colblack{
  color: black;
}
.pad10{
    padding: 10px;
}
.padlr10{
    padding:0px 10px 0px 10px;
}
.padtop10{
    padding-top:10px; 
}
.padtop40{
    padding-top:40px;
}
.padtop50{
    padding-top:50px;
}
.padbot10{
    padding-bottom:10px; 
}
.padr10{
    padding-right: 10px;
}
.mgtop5{
    margin-top: 5px;
}
.mgtop40{
    margin-top: 40px;
}
.mgtop50{
    margin-top: 50px;
}
.mgtop10{
    margin-top: 10px;
}
.mgbot10{
    margin-bottom: 10px;
}
.mgr5{
    margin-right: 5px;
}
.w15{
    width: 15px;
    height: 15px;
}
.w60{
    width: 60px;
    height: 60px;
}
.w100{
    width: 100%;
}
.radius50{
    border-radius: 50%;
}
.inblock{
  display: inline-block;
}
.flex{
    display: flex;
}
.flex2{
    display: flex;
    flex-direction:column;
}
.flex1{
    flex: 1;
}
.ovhid{
    overflow: hidden;
}
.box{
    box-sizing: border-box;
}
.right{
    float: right;
}

.clear{
    clear: both;
}
.relative{
  position: relative;
}
.left{
    float: left;
}
.midline{
    text-decoration: line-through;
}
.nowarp{
    white-space:nowrap;          /* 不换行 */
    overflow:hidden;               /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;   /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
/*一像素分割线*/
.after{
     position: relative;
}
.after::after{
    content: &quot; &quot;;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e4e4e4;
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
}
/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2.0) {
    .after::after {
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3.0) {
    .after::after {
        -webkit-transform: scaleY(0.33);
        transform: scaleY(0.33);
    }
}


/* 组件动画 */
/* 左进左出 */
.left-enter-active{
  animation-name: left-in;
  animation-duration: .2s; 
  animation-timing-function:linear;
}
.left-leave-active{
  animation-name: left-out;
  animation-timing-function:linear;
  animation-duration: .2s; 
}
@keyframes left-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  50% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}

/* 右进右出 */
.right-enter-active{
  animation-name: right-in;
  animation-duration: .2s; 
  animation-timing-function:linear;
}
.right-leave-active{
  animation-name: right-out;
  animation-timing-function:linear;
  animation-duration: .2s; 
}
@keyframes right-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(50%, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}

/* 上进上出 */
.top-enter-active{
  animation-name: top-in;
  animation-duration: .2s; 
  animation-timing-function:linear;
}
.top-leave-active{
  animation-name: top-out;
  animation-timing-function:linear;
  animation-duration: .2s; 
}
@keyframes top-in {
  0% {
    transform: translate3d(0, -100%, 0);
  }
  50% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes top-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, -50%, 0);
  }
  100% {
    transform: translate3d(0, -100%, 0);
  }
}

/* 淡进淡出 */
.opacity-enter-active{
  animation-name: opacity-in;
  animation-duration: .2s; 
  animation-timing-function:linear;
}
.opacity-leave-active{
  animation-name: opacity-out;
  animation-timing-function:linear;
  animation-duration: .2s; 
}
@keyframes opacity-in {
  0% {
    opacity:0;
  }
  50% {
    opacity:0.5;
  }
  100% {
    opacity:1;
  }
}
@keyframes opacity-out {
  0% {
    opacity:1;
  }
  50% {
    opacity:0.5;
  }
  100% {
    opacity:0;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#f5f5f5</span>;
}

*{
    <span class="hljs-attribute">text-decoration</span>:none;
}
<span class="hljs-selector-class">.fixed</span>{
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
}

<span class="hljs-selector-class">.ih40</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.ih30</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">30px</span>;
}
<span class="hljs-selector-class">.ih50</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">50px</span>;
}

<span class="hljs-selector-class">.bgcol</span>{
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#26a2ff</span>;
}
<span class="hljs-selector-class">.bgfff</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.bgf5</span>{
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#F5F5F5</span>;
}

<span class="hljs-selector-class">.fs0-8</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.8rem</span> <span class="hljs-meta">!important</span>;
}
<span class="hljs-selector-class">.fs1-2</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1.2rem</span>;
}
<span class="hljs-selector-class">.fs15</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.fs12</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
}
<span class="hljs-selector-class">.fs10</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scale</span>(.8);
    <span class="hljs-attribute">display</span>:inline-block;
}
<span class="hljs-selector-class">.mgr</span>{
  <span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">100%</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;<span class="hljs-comment">/*改变缩放基点*/</span>
}
<span class="hljs-selector-class">.mgl</span>{
  <span class="hljs-attribute">transform-origin</span>:<span class="hljs-number">0</span> <span class="hljs-number">50%</span> <span class="hljs-number">0</span>;<span class="hljs-comment">/*改变缩放基点*/</span>
}
<span class="hljs-selector-class">.colfff</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#fff</span>;
}
<span class="hljs-selector-class">.col9f</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#9F9F9F</span>;
}
<span class="hljs-selector-class">.colf60</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#FF6600</span>;
}
<span class="hljs-selector-class">.col</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#26a2ff</span>;
}
<span class="hljs-selector-class">.colred</span>{
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#FE3D3D</span>;
}
<span class="hljs-selector-class">.colblack</span>{
  <span class="hljs-attribute">color</span>: black;
}
<span class="hljs-selector-class">.pad10</span>{
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.padlr10</span>{
    <span class="hljs-attribute">padding</span>:<span class="hljs-number">0px</span> <span class="hljs-number">10px</span> <span class="hljs-number">0px</span> <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.padtop10</span>{
    <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">10px</span>; 
}
<span class="hljs-selector-class">.padtop40</span>{
    <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.padtop50</span>{
    <span class="hljs-attribute">padding-top</span>:<span class="hljs-number">50px</span>;
}
<span class="hljs-selector-class">.padbot10</span>{
    <span class="hljs-attribute">padding-bottom</span>:<span class="hljs-number">10px</span>; 
}
<span class="hljs-selector-class">.padr10</span>{
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.mgtop5</span>{
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.mgtop40</span>{
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">40px</span>;
}
<span class="hljs-selector-class">.mgtop50</span>{
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">50px</span>;
}
<span class="hljs-selector-class">.mgtop10</span>{
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.mgbot10</span>{
    <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">10px</span>;
}
<span class="hljs-selector-class">.mgr5</span>{
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">5px</span>;
}
<span class="hljs-selector-class">.w15</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">15px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">15px</span>;
}
<span class="hljs-selector-class">.w60</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">60px</span>;
}
<span class="hljs-selector-class">.w100</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.radius50</span>{
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
}
<span class="hljs-selector-class">.inblock</span>{
  <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.flex</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.flex2</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>:column;
}
<span class="hljs-selector-class">.flex1</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.ovhid</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">float</span>: right;
}

<span class="hljs-selector-class">.clear</span>{
    <span class="hljs-attribute">clear</span>: both;
}
<span class="hljs-selector-class">.relative</span>{
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
}
<span class="hljs-selector-class">.midline</span>{
    <span class="hljs-attribute">text-decoration</span>: line-through;
}
<span class="hljs-selector-class">.nowarp</span>{
    <span class="hljs-attribute">white-space</span>:nowrap;          <span class="hljs-comment">/* 不换行 */</span>
    <span class="hljs-attribute">overflow</span>:hidden;               <span class="hljs-comment">/* 内容超出宽度时隐藏超出部分的内容 */</span>
    <span class="hljs-attribute">text-overflow</span>:ellipsis;   <span class="hljs-comment">/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/</span>
}
<span class="hljs-comment">/*一像素分割线*/</span>
<span class="hljs-selector-class">.after</span>{
     <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.after</span><span class="hljs-selector-pseudo">::after</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#e4e4e4</span>;
    <span class="hljs-attribute">-webkit-transform-origin</span>: left bottom;
    <span class="hljs-attribute">transform-origin</span>: left bottom;
}
<span class="hljs-comment">/* 2倍屏 */</span>
@<span class="hljs-keyword">media</span> only screen and (-webkit-min-device-pixel-ratio: <span class="hljs-number">2.0</span>) {
    <span class="hljs-selector-class">.after</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.5);
    }
}

<span class="hljs-comment">/* 3倍屏 */</span>
@<span class="hljs-keyword">media</span> only screen and (-webkit-min-device-pixel-ratio: <span class="hljs-number">3.0</span>) {
    <span class="hljs-selector-class">.after</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">scaleY</span>(0.33);
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">scaleY</span>(0.33);
    }
}


<span class="hljs-comment">/* 组件动画 */</span>
<span class="hljs-comment">/* 左进左出 */</span>
<span class="hljs-selector-class">.left-enter-active</span>{
  <span class="hljs-attribute">animation-name</span>: left-in;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
  <span class="hljs-attribute">animation-timing-function</span>:linear;
}
<span class="hljs-selector-class">.left-leave-active</span>{
  <span class="hljs-attribute">animation-name</span>: left-out;
  <span class="hljs-attribute">animation-timing-function</span>:linear;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
}
@<span class="hljs-keyword">keyframes</span> left-in {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-50%, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
}
@<span class="hljs-keyword">keyframes</span> left-out {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-50%, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
  }
}

<span class="hljs-comment">/* 右进右出 */</span>
<span class="hljs-selector-class">.right-enter-active</span>{
  <span class="hljs-attribute">animation-name</span>: right-in;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
  <span class="hljs-attribute">animation-timing-function</span>:linear;
}
<span class="hljs-selector-class">.right-leave-active</span>{
  <span class="hljs-attribute">animation-name</span>: right-out;
  <span class="hljs-attribute">animation-timing-function</span>:linear;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
}
@<span class="hljs-keyword">keyframes</span> right-in {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(50%, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
}
@<span class="hljs-keyword">keyframes</span> right-out {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(50%, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
  }
}

<span class="hljs-comment">/* 上进上出 */</span>
<span class="hljs-selector-class">.top-enter-active</span>{
  <span class="hljs-attribute">animation-name</span>: top-in;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
  <span class="hljs-attribute">animation-timing-function</span>:linear;
}
<span class="hljs-selector-class">.top-leave-active</span>{
  <span class="hljs-attribute">animation-name</span>: top-out;
  <span class="hljs-attribute">animation-timing-function</span>:linear;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
}
@<span class="hljs-keyword">keyframes</span> top-in {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, -100%, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, -50%, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
}
@<span class="hljs-keyword">keyframes</span> top-out {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
  50% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, -50%, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, -100%, 0);
  }
}

<span class="hljs-comment">/* 淡进淡出 */</span>
<span class="hljs-selector-class">.opacity-enter-active</span>{
  <span class="hljs-attribute">animation-name</span>: opacity-in;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
  <span class="hljs-attribute">animation-timing-function</span>:linear;
}
<span class="hljs-selector-class">.opacity-leave-active</span>{
  <span class="hljs-attribute">animation-name</span>: opacity-out;
  <span class="hljs-attribute">animation-timing-function</span>:linear;
  <span class="hljs-attribute">animation-duration</span>: .<span class="hljs-number">2s</span>; 
}
@<span class="hljs-keyword">keyframes</span> opacity-in {
  0% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
  }
  50% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.5</span>;
  }
  100% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">1</span>;
  }
}
@<span class="hljs-keyword">keyframes</span> opacity-out {
  0% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">1</span>;
  }
  50% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0.5</span>;
  }
  100% {
    <span class="hljs-attribute">opacity</span>:<span class="hljs-number">0</span>;
  }
}
</code></pre>
<p>下面来改造购物车</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue从创建到完整的饿了么（17）本地缓存实现购物车

## 原文链接
[https://segmentfault.com/a/1190000011393073](https://segmentfault.com/a/1190000011393073)

