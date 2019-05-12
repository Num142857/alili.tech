---
title: 'vue-awesome-swiper的使用以及API整理' 
date: 2018-12-03 2:30:08
hidden: true
slug: ce67xahok9l
categories: [reprint]
---

{{< raw >}}

                    
<h2>一、先说一个看关于vue-awesome-swiper的一个坑</h2>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;vue项目的package.json中显示的<b>"vue-awesome-swiper": "^2.5.4"</b>，用<b>npm install</b>自动安装依赖时装的版本为<b>"version": "2.6.7"</b>，而单独安装（npm install vue-awesome-swiper@2.5.4）的则是正常的<b>"version": "2.5.4"</b>。</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;这两个版本都是基于swiper3的，从官网上swiper3的教程来看并不需要单独引入样式文件，而2.6.7版本需要单独引入swiper/dist/css目录下的swiper.css样式文件（类似于swiper4）。</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;并且2.6.7版本swiper位于<b>node_modules/vue-awesome-swiper/node_modules</b>下；2.5.4不需要单独引入样式文件，并且swiper直接位于<b>node_modules</b>文件夹下。</p>
<h2>二、基本使用方法</h2>
<h3>1.安装（略）</h3>
<h3>2.引用</h3>
<pre><code class="javascript">    /*全局引入*/
    import VueAwesomeSwiper from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'//这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    Vue.use(VueAwesomeSwiper, /* { default global options } */)</code></pre>
<pre><code class="javascript">    /*组件方式引用*/
    import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
    components: {
      swiper,
      swiperSlide
    }</code></pre>
<h3>3.使用</h3>
<p>就是一般组件的用法</p>
<pre><code class="html">    &lt;swiper :options="swiperOption"&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
      &lt;swiper-slide&gt;&lt;img src="static/images/jay.jpg"&gt;&lt;/swiper-slide&gt;
    &lt;/swiper&gt;
    &lt;!--以下看需要添加--&gt;
    &lt;div class="swiper-scrollbar"&gt;&lt;/div&gt; //滚动条
    &lt;div class="swiper-button-next"&gt;&lt;/div&gt; //下一项
    &lt;div class="swiper-button-prev"&gt;&lt;/div&gt; //上一项
    &lt;div class="swiper-pagination"&gt;&lt;/div&gt; //标页码</code></pre>
<pre><code class="javascript">  data(){
    return{
      swiperOption: {//swiper3
      autoplay: 3000,
      speed: 1000,
      }
    }
  }
    </code></pre>
<h2>三、配置</h2>
<table>
<thead><tr>
<th>参数</th>
<th>类型（swiper3）</th>
<th>默认值（swiper3）</th>
<th>类型（swiper4）</th>
<th>默认值（swiper4）</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>autoplay</td>
<td>Number/Boolean</td>
<td>0/false</td>
<td>Object</td>
<td><a href="#autoplay" id="REautoplay">autoplay</a></td>
<td>自动切换</td>
</tr>
<tr>
<td>speed</td>
<td>Number</td>
<td>300</td>
<td>Number</td>
<td>300</td>
<td>切换速度</td>
</tr>
<tr>
<td>loop</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean</td>
<td>false</td>
<td>loop模式</td>
</tr>
<tr>
<td>loopAdditionalSlides</td>
<td>Number</td>
<td>0</td>
<td>Number</td>
<td>0</td>
<td>loop模式下会在slides前后复制若干个slide,，前后复制的个数不会大于原总个数。</td>
</tr>
<tr>
<td>loopedSlides</td>
<td>Number</td>
<td>1</td>
<td>Number</td>
<td>1</td>
<td>在loop模式下使用slidesPerview:'auto',还需使用该参数设置所要用到的loop个数。</td>
</tr>
<tr>
<td>direction</td>
<td>String</td>
<td>horizontal</td>
<td>String</td>
<td>horizontal</td>
<td>Slides的滑动方向</td>
</tr>
<tr>
<td>autoplayDisableOnInteraction</td>
<td>Boolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>用户操作swiper之后，是否禁止autoplay</td>
</tr>
<tr>
<td>autoplayStopOnLast</td>
<td>Boolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>切换到最后一个slide时停止自动切换</td>
</tr>
<tr>
<td>grabCursor</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean</td>
<td>false</td>
<td>鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状</td>
</tr>
<tr>
<td>width</td>
<td>Number</td>
<td>-</td>
<td>Number</td>
<td>-</td>
<td>强制Swiper的宽度</td>
</tr>
<tr>
<td>height</td>
<td>Number</td>
<td>-</td>
<td>Number</td>
<td>-</td>
<td>强制Swiper的高度</td>
</tr>
<tr>
<td>autoHeight</td>
<td>Boolean</td>
<td>false</td>
<td>Boolean</td>
<td>false</td>
<td>自动高度</td>
</tr>
<tr>
<td><b>freeMode:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td><b>swiper3/4 api相同</b></td>
</tr>
<tr>
<td>freeMode</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>free模式，slide会根据惯性滑动且不会贴合</td>
</tr>
<tr>
<td>freeModeMomentum</td>
<td>Boolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>free模式动量。若设置为false则关闭动量，释放slide之后立即停止不会滑动。</td>
</tr>
<tr>
<td>freeModeMomentumRatio</td>
<td>Number</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>free模式动量值（移动惯量）</td>
</tr>
<tr>
<td>freeModeMomentumVelocityRatio</td>
<td>Number</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>动量反弹</td>
</tr>
<tr>
<td>freeModeMomentumBounce</td>
<td>Boolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>Slides的滑动方向</td>
</tr>
<tr>
<td>freeModeMomentumBounceRatio</td>
<td>Number</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>值越大产生的边界反弹效果越明显，反弹距离越大。</td>
</tr>
<tr>
<td>freeModeSticky</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>使得freeMode也能自动贴合。</td>
</tr>
<tr>
<td><b>effect:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td><b>swiper3/4 api相同</b></td>
</tr>
<tr>
<td>effect</td>
<td>String</td>
<td>slide</td>
<td>-</td>
<td>-</td>
<td>slide的切换效果。</td>
</tr>
<tr>
<td>fade/fadeEffect(4)</td>
<td>Object</td>
<td><a href="#fade" id="REfade">fade</a></td>
<td>-</td>
<td>-</td>
<td>fade效果参数。</td>
</tr>
<tr>
<td>cube/cubeEffect</td>
<td>Object</td>
<td><a href="#cube" id="REcube">cube</a></td>
<td>-</td>
<td>-</td>
<td>cube效果参数。</td>
</tr>
<tr>
<td>coverflow/coverflowEffect</td>
<td>Object</td>
<td><a href="#coverflow" id="REcoverflow">coverflow</a></td>
<td>-</td>
<td>-</td>
<td>coverflow效果参数。</td>
</tr>
<tr>
<td>flip/flipEffect</td>
<td>Object</td>
<td><a href="#flip" id="REflip">flip</a></td>
<td>-</td>
<td>-</td>
<td>flip效果参数。</td>
</tr>
<tr>
<td><b>Zoom:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>zoom</td>
<td>Boolean</td>
<td>false</td>
<td>Object</td>
<td><a href="#zoom" id="REzoom">zoom</a></td>
<td>焦距功能：双击slide会放大，并且在手机端可双指触摸缩放。</td>
</tr>
<tr>
<td>zoomMax</td>
<td>Number</td>
<td>3</td>
<td>-</td>
<td>-</td>
<td>最大缩放焦距（放大倍率）.</td>
</tr>
<tr>
<td>zoomMin</td>
<td>Number</td>
<td>1</td>
<td>-</td>
<td>-</td>
<td>最小缩放焦距（缩小倍率）。</td>
</tr>
<tr>
<td>zoomToggle</td>
<td>Boolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>设置为false，不允许双击缩放，只允许手机端触摸缩放。</td>
</tr>
<tr>
<td><b>pagination:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>pagination</td>
<td>String</td>
<td>-</td>
<td>Object</td>
<td><a href="#pagination" id="REpagination">pagination</a></td>
<td>分页器容器的css选择器或HTML标签</td>
</tr>
<tr>
<td>paginationType</td>
<td>String</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>bullets’  圆点（默认）‘fraction’  分式 ‘progress’  进度条‘custom’ 自定义</td>
</tr>
<tr>
<td>paginationClickable</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>点击分页器的指示点分页器控制Swiper切换</td>
</tr>
<tr>
<td>paginationHide</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>默认分页器会一直显示</td>
</tr>
<tr>
<td>paginationElement</td>
<td>String</td>
<td>span</td>
<td>-</td>
<td>-</td>
<td>设定分页器指示器（小点）的HTML标签。</td>
</tr>
<tr>
<td><b>Navigation Buttons:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td><a href="#navigation" id="REpagination">swiper4 navigation</a></td>
<td> </td>
</tr>
<tr>
<td>nextButton</td>
<td>string / HTMLElement</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>前进按钮的css选择器或HTML元素。</td>
</tr>
<tr>
<td>prevtButton</td>
<td>string / HTMLElement</td>
<td>-</td>
<td>-</td>
<td>-</td>
<td>后退按钮的css选择器或HTML元素。</td>
</tr>
<tr>
<td><b>Scrollbar:</b></td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
</tr>
<tr>
<td>scrollbar</td>
<td>string / HTMLElement</td>
<td>-</td>
<td>Object</td>
<td><a href="#Scrollbar" id="REScrollbar">swiper4 Scrollbar</a></td>
<td>Scrollbar容器的css选择器或HTML元素</td>
</tr>
<tr>
<td>scrollbarHide</td>
<td>Bolean</td>
<td>true</td>
<td>-</td>
<td>-</td>
<td>滚动条是否自动隐藏。</td>
</tr>
<tr>
<td>scrollbarDraggable</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>该参数设置为true时允许拖动滚动条。</td>
</tr>
<tr>
<td>scrollbarSnapOnRelease</td>
<td>Boolean</td>
<td>false</td>
<td>-</td>
<td>-</td>
<td>如果设置为true，释放滚动条时slide自动贴合。</td>
</tr>
</tbody>
</table>
<p><a href="#REautoplay"><b id="autoplay">autoplay:</b></a></p>
<pre><code class="javascript">  autoplay: {
    delay: 3000, //自动切换的时间间隔，单位ms
    stopOnLastSlide: false, //当切换到最后一个slide时停止自动切换
    stopOnLastSlide: true, //如果设置为true，当切换到最后一个slide时停止自动切换。
    disableOnInteraction: true, //用户操作swiper之后，是否禁止autoplay。
    reverseDirection: true, //开启反向自动轮播。
    waitForTransition: true, //等待过渡完毕。自动切换会在slide过渡完毕后才开始计时。
  },
</code></pre>
<p><a href="#REfade"><b id="fade">fade:</b></a></p>
<pre><code class="javascript">  fadeEffect: {
    crossFade: false,
  }
</code></pre>
<p><a href="#REcube"><b id="cube">cube:</b></a></p>
<pre><code class="javascript">  cubeEffect: {
    slideShadows: true, //开启slide阴影。默认 true。
    shadow: true, //开启投影。默认 true。
    shadowOffset: 100, //投影距离。默认 20，单位px。
    shadowScale: 0.6 //投影缩放比例。默认0.94。
  },
</code></pre>
<p><a href="#REcoverflow"><b id="coverflow">coverflow:</b></a></p>
<pre><code class="javascript">  coverflowEffect: {
    rotate: 30, //slide做3d旋转时Y轴的旋转角度。默认50。
    stretch: 10, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
    depth: 60, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
    modifier: 2, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
    slideShadows : true //开启slide阴影。默认 true。
  },
</code></pre>
<p><a href="#REflip"><b id="flip">flip:</b></a></p>
<pre><code class="javascript">   flipEffect: {
    slideShadows : true, //slides的阴影。默认true。
    limitRotation : true, //限制最大旋转角度为180度，默认true。
  }
</code></pre>
<p><a href="#REzoom"><b id="zoom">zoom:</b></a></p>
<pre><code class="javascript">   zoom: {
     maxRatio: 5, //最大倍数
     minRatio: 2, //最小倍数
     toggle: false, //不允许双击缩放，只允许手机端触摸缩放。
     containerClass: 'my-zoom-container', //zoom container 类名
   },</code></pre>
<p><a href="#REnavigation"><b id="navigation">navigation:</b></a></p>
<pre><code class="javascript">   navigation: {
    nextEl: '.swiper-button-next', //前进按钮的css选择器或HTML元素。
    prevEl: '.swiper-button-prev', //后退按钮的css选择器或HTML元素。
    hideOnClick: true, //点击slide时显示/隐藏按钮
    disabledClass: 'my-button-disabled', //前进后退按钮不可用时的类名。
    hiddenClass: 'my-button-hidden', //按钮隐藏时的Class
   },
</code></pre>
<p><a href="#REpagination"><b id="pagination">pagination:</b></a></p>
<pre><code class="javascript">   pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    //type: 'fraction',
    //type : 'progressbar',
    //type : 'custom',
    progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
    bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
    dynamicBullets: true,  //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
    dynamicMainBullets: 2, //动态分页器的主指示点的数量
    hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
    clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

  },</code></pre>
<p><a href="#REScrollbar"><b id="Scrollbar">Scrollbar:</b></a></p>
<pre><code class="javascript">   scrollbar: {
     el: '.swiper-scrollbar',
     hide: true, //滚动条是否自动隐藏。默认：false，不会自动隐藏。
     draggable: true, //该参数设置为true时允许拖动滚动条。
     snapOnRelease: true, //如果设置为false，释放滚动条时slide不会自动贴合。
     dragSize: 30, //设置滚动条指示的尺寸。默认'auto': 自动，或者设置num(px)。
   },
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-awesome-swiper的使用以及API整理

## 原文链接
[https://segmentfault.com/a/1190000014609379](https://segmentfault.com/a/1190000014609379)

