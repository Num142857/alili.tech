---
title: '用Vue搭建一个应用盒子（三）：音乐播放器' 
date: 2018-12-15 2:30:11
hidden: true
slug: bel95p0kmfi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>这个播放器的开发历时2个多月，并不是说它有多复杂，相反它的功能还非常不完善，仅具雏形。之所以磨磨蹭蹭这么久，一是因为拖延，二也是实习公司项目太紧。8月底结束实习前写完了样式，之后在家空闲时间多了，集中精力就把JS部分做完了。<p>这个播放器确实比当初构想的复杂，开始只打算做一个搜歌播放的功能。现在做出来的这个播放器，可以获取热门歌曲，可以搜歌，可以调整播放进度条，功能确实完善不少。</p>
<p>这次完成这个项目也是收获颇丰，点了不少新的技能点，当然，这个简陋的小项目也挖了不少坑，不知道啥时候能填上……</p>
<p>话不多说，看代码吧。</p>
</blockquote>
<h2 id="articleHeader0">Muse-ui</h2>
<p>不记得在哪个网站看到这个组件库的了，觉得好酷炫，于是用起来～</p>
<p>这是官网：<a href="https://museui.github.io/" rel="nofollow noreferrer" target="_blank">地址</a></p>
<p>使用这个组件库的原因除了漂亮，还因为这是基于Vue 2.0，无缝对接，方便。</p>
<p>使用方法跟之前的插件一样，npm安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save muse-ui" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save muse-ui</span></code></pre>
<p>安装好后，在<code>main.js</code>中注册。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'

Vue.use(MuseUi)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> MuseUi <span class="hljs-keyword">from</span> <span class="hljs-string">'muse-ui'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/muse-ui.css'</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'muse-ui/dist/theme-light.css'</span>

Vue.use(MuseUi)</code></pre>
<p>就可以在项目中使用了。<br>PS：Muse-ui的icon是基于谷歌的Material icons，大家可以根据自己的需求到<a href="https://material.io/icons/" rel="nofollow noreferrer" target="_blank">官网</a>找icon的代码。</p>
<h2 id="articleHeader1">组件结构</h2>
<p>接着我们就该搭建这个播放器的组件了。</p>
<p>结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="||-- player.vue       // 主页面
|    |-- playerBox.vue   // 播放器组件
|    |-- popular.vue    // 热门歌曲页面
|        |-- songList.vue     // 歌曲列表页面 
|    |-- play.vue    // 播放器页面
|    |-- search.vue    // 搜索页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>||<span class="hljs-string">-- player.vue       // 主页面
</span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- playerBox.vue   // 播放器组件
</span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- popular.vue    // 热门歌曲页面
</span>|<span class="hljs-string">        </span>|<span class="hljs-string">-- songList.vue     // 歌曲列表页面 
</span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- play.vue    // 播放器页面
</span>|<span class="hljs-string">    </span>|<span class="hljs-string">-- search.vue    // 搜索页面</span></code></pre>
<p>PS：热门歌曲、搜索页面都能进入歌曲列表页面，播放器组件<code>playerBox.vue</code> 是放<code>&lt;audio&gt;</code>标签的组件，是功能性组件。</p>
<p>我们来分别叙述：</p>
<h3 id="articleHeader2">1.player.vue</h3>
<p>直接看代码吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;player&quot;>

    <!-- banner here-->
    <router-view></router-view>

    <!-- navbar here -->
    <mu-paper>
      <mu-bottom-nav :value=&quot;bottomNav&quot; @change=&quot;handleChange&quot;>
        <mu-bottom-nav-item value=&quot;popular&quot; title=&quot;流行&quot; icon=&quot;music_note&quot; to=&quot;/popular&quot;/>
        <mu-bottom-nav-item value=&quot;play&quot; title=&quot;播放&quot; icon=&quot;play_arrow&quot; to=&quot;/play&quot;/>
        <mu-bottom-nav-item value=&quot;search&quot; title=&quot;搜索&quot; icon=&quot;search&quot; to=&quot;/search&quot;/>
      </mu-bottom-nav>
    </mu-paper>

    <!-- html5 player here -->
    <playerBox></playerBox>

  </div>
</template>

<script>

import playerBox from './playerBox.vue'

export default {



  name: 'player',
  data(){
    const pa=this.$route.path;
    const Pa=pa.slice(1);

    return{
      bottomNav: Pa
    }
  },
  components: {
    playerBox
  },
  methods:{
    handleChange (val) {
      this.bottomNav = val
    },
    changebar(){
      const va=this.$route.path;
      const Va=va.slice(1);
      this.bottomNav = Va
    }
  },
  watch:{
    &quot;$route&quot;:&quot;changebar&quot;
  }
}
</script>
  

<style lang=&quot;less&quot; >
  .mu-bottom-nav{
    position: fixed!important;
    bottom: 0px;
    background: #fafafa!important;
    z-index: 5;
    
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"player"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- banner here--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- navbar here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-paper</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav</span> <span class="hljs-attr">:value</span>=<span class="hljs-string">"bottomNav"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"handleChange"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"popular"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"流行"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"music_note"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/popular"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"play"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"播放"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"play_arrow"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/play"</span>/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-bottom-nav-item</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"搜索"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/search"</span>/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">mu-bottom-nav</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-paper</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- html5 player here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">playerBox</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">playerBox</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">

<span class="hljs-keyword">import</span> playerBox <span class="hljs-keyword">from</span> <span class="hljs-string">'./playerBox.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {



  <span class="hljs-attr">name</span>: <span class="hljs-string">'player'</span>,
  data(){
    <span class="hljs-keyword">const</span> pa=<span class="hljs-keyword">this</span>.$route.path;
    <span class="hljs-keyword">const</span> Pa=pa.slice(<span class="hljs-number">1</span>);

    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">bottomNav</span>: Pa
    }
  },
  <span class="hljs-attr">components</span>: {
    playerBox
  },
  <span class="hljs-attr">methods</span>:{
    handleChange (val) {
      <span class="hljs-keyword">this</span>.bottomNav = val
    },
    changebar(){
      <span class="hljs-keyword">const</span> va=<span class="hljs-keyword">this</span>.$route.path;
      <span class="hljs-keyword">const</span> Va=va.slice(<span class="hljs-number">1</span>);
      <span class="hljs-keyword">this</span>.bottomNav = Va
    }
  },
  <span class="hljs-attr">watch</span>:{
    <span class="hljs-string">"$route"</span>:<span class="hljs-string">"changebar"</span>
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> &gt;</span><span class="css">
  <span class="hljs-selector-class">.mu-bottom-nav</span>{
    <span class="hljs-attribute">position</span>: fixed<span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fafafa</span><span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">5</span>;
    
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>解释一下：</p>
<ol><li>由于Muse-ui有部分样式用到了less，所以在这里我们需要npm安装一个less的依赖，安装好后即可使用。</li></ol>
<p><code>npm install less less-loader --save</code></p>
<ol><li>这里我们加载了一个底部导航，muse-ui的，官网可以查到相关代码。这里要注意的是，为了让用户体验更好，我们需要让我们的底部导航随当前路由变化而高亮。具体是用了一段JS代码。</li></ol>
<p>watch监视路由变化并触发一个method：changebar（），这个函数会获取当前的路由名，并把bottomNav的值设置为当前路由名——即高亮当前的路由页面</p>
<ol><li>playerBox.vue组件之所以放在主组件里，就是为了音乐在每一个子页面都能播放，而不会因为跳转路由而停止播放。</li></ol>
<h3 id="articleHeader3">2.popular.vue</h3>
<p>这是推荐歌单界面，这里用到了一个轮播图插件，是基于vue的，使用起来比较方便，直接用npm安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-awesome-swiper --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>vue-awesome-<span class="hljs-keyword">swiper </span>--save</code></pre>
<p>安装好后，同样在<code>main.js</code>中注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> VueAwesomeSwiper <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span>

Vue.use(VueAwesomeSwiper)</code></pre>
<p>然后我们来看页面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;popular&quot;>

    <!-- navbar here -->
    <mu-appbar>
      <div class=&quot;logo&quot;>
        iPlayer
      </div>
    </mu-appbar>

    <!-- banner here-->
    <mu-card>
        <swiper :options=&quot;swiperOption&quot;>
          <swiper-slide v-for=&quot;(item,index) in banners&quot; :key=&quot;index&quot;>
            <mu-card-media>
              <img :src=&quot;item.pic&quot;>
            </mu-card-media>
          </swiper-slide>
          <div class=&quot;swiper-pagination&quot; slot=&quot;pagination&quot;></div>
        </swiper>
    </mu-card>
    
    <div class=&quot;gridlist-demo-container&quot; >
      <mu-grid-list class=&quot;gridlist-demo&quot;>
        <mu-sub-header>热门歌单</mu-sub-header>
           <mu-grid-tile v-for=&quot;(item, index) in list&quot; :key=&quot;index&quot;>
            <img :src=&quot;item.coverImgUrl&quot;/>
            <span slot=&quot;title&quot;>"{{"item.name"}}"</span>
            <mu-icon-button icon=&quot;play_arrow&quot; slot=&quot;action&quot; @click=&quot;getListDetail(item.id)&quot;/>
         </mu-grid-tile>
      </mu-grid-list>
    </div>
    
    <div class=&quot;footer-rights&quot;>
      <h4>版权归Godown Huang所有，请<a href=&quot;https://github.com/WE2008311&quot;>联系我</a>。</h4>
    </div>


  </div>
</template>

<script>
import {swiper,swiperSlide} from 'vue-awesome-swiper'
import axios from 'axios'

export default {

  name: 'popular',
  data(){
    return{
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        autoplay: 4000,
        loop:true
      },
      banners:[],
      list: []
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  computed:{
    
  },
  created(){
    this.initPopular()
    
  },
  methods:{
    initPopular(){
      
      axios.get('http://localhost:3000/banner').then(res=> {
             this.banners=res.data.banners;
      }),
      axios.get('http://localhost:3000/top/playlist/highquality?limit=8').then(res=> {
             this.list=res.data.playlists;
      })
    },
    getListDetail(id){
      this.$router.push({path: '/songsList'})
      this.$store.commit('playlist',id);
    }
  }
}
</script>
  

<style lang=&quot;css&quot;>
  @media screen and (min-width: 960px){
    .mu-card-media>img{
      height: 400px!important;
    }
    .mu-grid-list>div:nth-child(n+2){
      width:25%!important;
    }
  }

  .mu-grid-tile>img{
    width: 100%;
  }

  .gridlist-demo-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  
  .gridlist-demo{
    width: 100%;
    overflow-y: auto;
  }
  .footer-rights>h4{
    color: #e1e1e1;
    font-weight: 100;
    font-size:.056rem;
    height:90px;
    padding-top: 10px;
    text-align: center;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"popular"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- navbar here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-appbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
        iPlayer
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-appbar</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- banner here--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-card</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">swiper</span> <span class="hljs-attr">:options</span>=<span class="hljs-string">"swiperOption"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">swiper-slide</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in banners"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-card-media</span>&gt;</span>
              <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.pic"</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">mu-card-media</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">swiper-slide</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"swiper-pagination"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"pagination"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">swiper</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-card</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"gridlist-demo-container"</span> &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-grid-list</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"gridlist-demo"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-sub-header</span>&gt;</span>热门歌单<span class="hljs-tag">&lt;/<span class="hljs-name">mu-sub-header</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">mu-grid-tile</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item, index) in list"</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">"index"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.coverImgUrl"</span>/&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"title"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"play_arrow"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"action"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getListDetail(item.id)"</span>/&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">mu-grid-tile</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">mu-grid-list</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer-rights"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>版权归Godown Huang所有，请<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/WE2008311"</span>&gt;</span>联系我<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>。<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> {swiper,swiperSlide} <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-awesome-swiper'</span>
<span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {

  <span class="hljs-attr">name</span>: <span class="hljs-string">'popular'</span>,
  data(){
    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">swiperOption</span>: {
        <span class="hljs-attr">pagination</span>: <span class="hljs-string">'.swiper-pagination'</span>,
        <span class="hljs-attr">paginationClickable</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">autoplay</span>: <span class="hljs-number">4000</span>,
        <span class="hljs-attr">loop</span>:<span class="hljs-literal">true</span>
      },
      <span class="hljs-attr">banners</span>:[],
      <span class="hljs-attr">list</span>: []
    }
  },
  <span class="hljs-attr">components</span>: {
    swiper,
    swiperSlide
  },
  <span class="hljs-attr">computed</span>:{
    
  },
  created(){
    <span class="hljs-keyword">this</span>.initPopular()
    
  },
  <span class="hljs-attr">methods</span>:{
    initPopular(){
      
      axios.get(<span class="hljs-string">'http://localhost:3000/banner'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span> {
             <span class="hljs-keyword">this</span>.banners=res.data.banners;
      }),
      axios.get(<span class="hljs-string">'http://localhost:3000/top/playlist/highquality?limit=8'</span>).then(<span class="hljs-function"><span class="hljs-params">res</span>=&gt;</span> {
             <span class="hljs-keyword">this</span>.list=res.data.playlists;
      })
    },
    getListDetail(id){
      <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>: <span class="hljs-string">'/songsList'</span>})
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'playlist'</span>,id);
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">960px</span>){
    <span class="hljs-selector-class">.mu-card-media</span>&gt;<span class="hljs-selector-tag">img</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">400px</span><span class="hljs-meta">!important</span>;
    }
    <span class="hljs-selector-class">.mu-grid-list</span>&gt;<span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:nth-child(n+2)</span>{
      <span class="hljs-attribute">width</span>:<span class="hljs-number">25%</span><span class="hljs-meta">!important</span>;
    }
  }

  <span class="hljs-selector-class">.mu-grid-tile</span>&gt;<span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  }

  <span class="hljs-selector-class">.gridlist-demo-container</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-wrap</span>: wrap;
    <span class="hljs-attribute">justify-content</span>: space-around;
  }
  
  <span class="hljs-selector-class">.gridlist-demo</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow-y</span>: auto;
  }
  <span class="hljs-selector-class">.footer-rights</span>&gt;<span class="hljs-selector-tag">h4</span>{
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#e1e1e1</span>;
    <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">100</span>;
    <span class="hljs-attribute">font-size</span>:.<span class="hljs-number">056rem</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">90px</span>;
    <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">text-align</span>: center;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<blockquote>这里要说明一下，上面的这些组件除了<code>playerBox</code>之外都要在main.js中注册才能使用。注册方法忘记的了话，回头看看我之前写的todolist的项目是怎么注册的。</blockquote>
<p>在<code>store.js</code>中添加playList函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="playlist(state,id){
        const url='http://localhost:3000/playlist/detail?id='+id;
        axios.get(url).then(res=> {
            state.playlist=res.data.playlist;
        })
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>playlist(<span class="hljs-keyword">state</span>,id){
        const url='http://localhost:<span class="hljs-number">3000</span>/playlist/detail?id='+id;
        axios.get(url).then(res=&gt; {
            <span class="hljs-keyword">state</span>.playlist=res.data.playlist;
        })
    },</code></pre>
<p>这里的页面<code>mu</code>开头的基本都是用Muse-ui搭建起来的，<code>Swiper</code>开头的则是轮播图插件。界面不复杂，主要是三个部分，上面的轮播图，中间的热门歌单推荐，底部的版权信息。样式基本是模板，这里做了一个简单的移动端适配：在PC端歌单会以每排4个分两排的形式排列，在移动端歌单则会以每排2个分四排的形式排列，适配的方法是<strong>媒体查询</strong>，通过改变歌单<code>div</code>的宽度改变每行歌单的数目。</p>
<p>这里要注意的：</p>
<ol>
<li>歌单的数据和轮播图都是用的网易云数据，所以没有开api是无法读取的，引入<code>axios</code>的部分可以先不写，也可以写好先放着。</li>
<li>这里<code>methods</code>和<code>created</code>里面的内容都涉及到axios的请求，所以可以先不写，不影响样式呈现。数据可以先用假数据代替。</li>
<li>playList的目的是点击歌单的时候，进入歌单详情页，同时根据传递进去的歌单id获取歌单的具体数据，axios的地址是api的地址，需要加载api插件才能使用。</li>
</ol>
<h3 id="articleHeader4">3.play.vue</h3>
<p>终于到了最核心的组件，之所以说它核心是因为这是播放界面，音频播放的长度、音频信息都会在这里被呈现，而播放器的核心功能——播放——也是在这里被操作（播放／暂停）。</p>
<p>看具体代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;play&quot;>

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon=&quot;navigate_before&quot; slot=&quot;left&quot; v-on:click=&quot;backpage&quot;/>
      <div class=&quot;logo&quot;>
        iPlayer
      </div>
    </mu-appbar>

    <!-- player here-->
    <div class=&quot;bgImg&quot;>
      <img :src=&quot;audio.picUrl&quot; />
      <!-- 封面CD -->
      <mu-avatar  slot=&quot;left&quot; :size=&quot;300&quot; :src=&quot;audio.picUrl&quot;/>
    </div>
    
    <div class=&quot;controlBar&quot;>
        <mu-content-block>
          "{{"audio.songName"}}" - "{{"audio.singer"}}"
        </mu-content-block>
        <div class=&quot;controlBarSlide&quot;>
          <span class=&quot;slideTime&quot;>"{{"audio.currentTime"}}"</span>
          <mu-slider v-bind:value=&quot;progressPercent&quot; @change=&quot;editprogress&quot; class=&quot;demo-slider&quot;/>
          <span class=&quot;slideTime&quot;>"{{"audio.duration"}}"</span>
        </div>
        
    </div>


  </div>
</template>

<script>


export default {
  
  name: 'play',
  data(){
    return{
      
    }
  },
  components: {
    
  },
  computed:{
      audio(){
        return this.$store.getters.audio;
      },
      progressPercent(){
        return this.$store.getters.audio.progressPercent;
      }
  },
  methods:{
    backpage(){
      window.history.go(-1);
    },
    
    editprogress(value){
      
      this.$store.commit('editProgress',value)
    }
  }
}
</script>
  

<style lang=&quot;css&quot;>
  @media screen and (max-width: 414px){
    .bgImg .mu-avatar{
      height: 260px!important;
      width: 260px!important;
      margin-left: -130px!important;
    }
  }
  .bgImg{
    position:fixed;
    height:100%;
    width:100%;
    background: #fff;
    z-index:-1;
  }
  .bgImg>img{
    width: 100%;
    filter:blur(15px);
    -webkit-filter: blur(15px); 
    -moz-filter: blur(15px);
    -ms-filter: blur(15px);
  }
  .bgImg .mu-avatar{
    position: absolute;
    left: 50%;
    margin-left: -150px;
    top: 30px;
  }
  .controlBar{
    position: fixed;
    width: 100%;
    height: 180px;
    background: #fff;
    bottom: 0;
    z-index: 11;
    text-align:center;
  }
  
  .mu-slider{
    width: 70%!important;
    display: inline-block!important;
    margin-bottom: -7px!important;
  }
  
  
  .slideTime{
    width: 29px;
    display: inline-block;
  }
  .mu-content-block{
    font-size: 18px;
    color: #777
  }
  .mu-slider{
    display: inline-block;
    margin:0 3px -7px;
    width: 70%;
  }
</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"play"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- navbar here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-appbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"navigate_before"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"backpage"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
        iPlayer
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-appbar</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- player here--&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"bgImg"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"audio.picUrl"</span> /&gt;</span>
      <span class="hljs-comment">&lt;!-- 封面CD --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-avatar</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">:size</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"audio.picUrl"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"controlBar"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-content-block</span>&gt;</span>
          </span><span class="hljs-template-variable">"{{"audio.songName"}}"</span><span class="xml"> - </span><span class="hljs-template-variable">"{{"audio.singer"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">mu-content-block</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"controlBarSlide"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slideTime"</span>&gt;</span></span><span class="hljs-template-variable">"{{"audio.currentTime"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-slider</span> <span class="hljs-attr">v-bind:value</span>=<span class="hljs-string">"progressPercent"</span> @<span class="hljs-attr">change</span>=<span class="hljs-string">"editprogress"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"demo-slider"</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"slideTime"</span>&gt;</span></span><span class="hljs-template-variable">"{{"audio.duration"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  
  <span class="hljs-attr">name</span>: <span class="hljs-string">'play'</span>,
  data(){
    <span class="hljs-keyword">return</span>{
      
    }
  },
  <span class="hljs-attr">components</span>: {
    
  },
  <span class="hljs-attr">computed</span>:{
      audio(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.audio;
      },
      progressPercent(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.audio.progressPercent;
      }
  },
  <span class="hljs-attr">methods</span>:{
    backpage(){
      <span class="hljs-built_in">window</span>.history.go(<span class="hljs-number">-1</span>);
    },
    
    editprogress(value){
      
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'editProgress'</span>,value)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
  @<span class="hljs-keyword">media</span> screen and (max-width: <span class="hljs-number">414px</span>){
    <span class="hljs-selector-class">.bgImg</span> <span class="hljs-selector-class">.mu-avatar</span>{
      <span class="hljs-attribute">height</span>: <span class="hljs-number">260px</span><span class="hljs-meta">!important</span>;
      <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span><span class="hljs-meta">!important</span>;
      <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">130px</span><span class="hljs-meta">!important</span>;
    }
  }
  <span class="hljs-selector-class">.bgImg</span>{
    <span class="hljs-attribute">position</span>:fixed;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">z-index</span>:-<span class="hljs-number">1</span>;
  }
  <span class="hljs-selector-class">.bgImg</span>&gt;<span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">filter</span>:<span class="hljs-built_in">blur</span>(15px);
    <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">blur</span>(15px); 
    <span class="hljs-attribute">-moz-filter</span>: <span class="hljs-built_in">blur</span>(15px);
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-built_in">blur</span>(15px);
  }
  <span class="hljs-selector-class">.bgImg</span> <span class="hljs-selector-class">.mu-avatar</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">150px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">30px</span>;
  }
  <span class="hljs-selector-class">.controlBar</span>{
    <span class="hljs-attribute">position</span>: fixed;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">180px</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">11</span>;
    <span class="hljs-attribute">text-align</span>:center;
  }
  
  <span class="hljs-selector-class">.mu-slider</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70%</span><span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">display</span>: inline-block<span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">margin-bottom</span>: -<span class="hljs-number">7px</span><span class="hljs-meta">!important</span>;
  }
  
  
  <span class="hljs-selector-class">.slideTime</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">29px</span>;
    <span class="hljs-attribute">display</span>: inline-block;
  }
  <span class="hljs-selector-class">.mu-content-block</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#777</span>
  }
  <span class="hljs-selector-class">.mu-slider</span>{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">3px</span> -<span class="hljs-number">7px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">70%</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p><code>store.js</code>添加代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" play(state){
        clearInterval(ctime);
        const playerBar=document.getElementById(&quot;playerBar&quot;);
        const eve=$('.addPlus i')[0];
        
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+&quot;:&quot;+(duraTime%60/100).toFixed(2).slice(-2);
        state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
        
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML=&quot;pause&quot;;
            state.audio.duration=duraMinute;
            state.audio.currentTime=currentMinute;
            ctime=setInterval(
                function(){
                    
                    currentTime++;
                    
                    currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);
                    
                    state.audio.currentTime=currentMinute;
                    state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
                    
                },1000
            )
        }else {
            playerBar.pause();
            eve.innerHTML=&quot;play_arrow&quot;;
            clearInterval(ctime);
        }
               
        
    },

    audioEnd(state){
        
        const playerBar=document.getElementById(&quot;playerBar&quot;);
        const eve=$('.addPlus i')[0];

        eve.innerHTML=&quot;play_arrow&quot;;
        clearInterval(ctime);

        
        playerBar.currentTime=0;

        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);
        state.audio.currentTime=currentMinute;
    },

    editProgress(state,progressValue){
        const playerBar=document.getElementById(&quot;playerBar&quot;);
        const eve=$('.addPlus i')[0];

        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+&quot;:&quot;+(duraTime%60/100).toFixed(2).slice(-2);
        // console.log(progressValue);
        clearInterval(ctime);
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML=&quot;pause&quot;
            state.audio.duration=duraMinute;
        }
        let currentTime=playerBar.duration*(progressValue/100);
        
        
        ctime=setInterval(
            function(){
                
                currentTime++;
                
                currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);
                
                state.audio.currentTime=currentMinute;
                state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
                
            },1000
        )

        playerBar.currentTime=currentTime;
        
        let currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);

        state.audio.currentTime=currentMinute;
    }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code> play(<span class="hljs-keyword">state</span>){
        clearInterval(ctime);
        const playerBar=document.getElementById(<span class="hljs-string">"playerBar"</span>);
        const eve=$('.addPlus i')[<span class="hljs-number">0</span>];
        
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(duraTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
        <span class="hljs-keyword">state</span>.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">1</span>);
        
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML=<span class="hljs-string">"pause"</span>;
            <span class="hljs-keyword">state</span>.audio.duration=duraMinute;
            <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
            ctime=<span class="hljs-built_in">set</span>Interval(
                function(){
                    
                    currentTime++;
                    
                    currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
                    
                    <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
                    <span class="hljs-keyword">state</span>.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">1</span>);
                    
                },<span class="hljs-number">1000</span>
            )
        }else {
            playerBar.pause();
            eve.innerHTML=<span class="hljs-string">"play_arrow"</span>;
            clearInterval(ctime);
        }
               
        
    },

    audioEnd(<span class="hljs-keyword">state</span>){
        
        const playerBar=document.getElementById(<span class="hljs-string">"playerBar"</span>);
        const eve=$('.addPlus i')[<span class="hljs-number">0</span>];

        eve.innerHTML=<span class="hljs-string">"play_arrow"</span>;
        clearInterval(ctime);

        
        playerBar.currentTime=<span class="hljs-number">0</span>;

        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
        <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
    },

    editProgress(<span class="hljs-keyword">state</span>,progressValue){
        const playerBar=document.getElementById(<span class="hljs-string">"playerBar"</span>);
        const eve=$('.addPlus i')[<span class="hljs-number">0</span>];

        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(duraTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
        // console.<span class="hljs-keyword">log</span>(progressValue);
        clearInterval(ctime);
        if(playerBar.paused){
            playerBar.play();
            eve.innerHTML=<span class="hljs-string">"pause"</span>
            <span class="hljs-keyword">state</span>.audio.duration=duraMinute;
        }
        let currentTime=playerBar.duration*(progressValue/<span class="hljs-number">100</span>);
        
        
        ctime=<span class="hljs-built_in">set</span>Interval(
            function(){
                
                currentTime++;
                
                currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
                
                <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
                <span class="hljs-keyword">state</span>.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">1</span>);
                
            },<span class="hljs-number">1000</span>
        )

        playerBar.currentTime=currentTime;
        
        let currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);

        <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
    },</code></pre>
<ol>
<li>如代码所示，我在顶部导航添加了一个<code>icon button</code>，样式来自<code>Muse-ui</code>绑定了一个点击事件backpage，点击后会回到上一个路由页面。这个需要配合之前的高亮底部导航icon，才能实现返回上一路由的同时高亮相对应的icon。</li>
<li>还要注意的是，computed里有两个方法，第一个是获取vuex里面的当前曲目信息；第二个则是获取进度条的百分比信息，这个方法实现了数据的双向绑定，随着后台设定的计时器，不断地更新，从而实现播放时进度条的变化。同样，这里的样式也是来自<code>Muse-ui</code>的<code>Slider</code>。</li>
<li>这里有一个需要注意的坑是，Muse-ui自带了许多的函数，第一次写的时候没有注意，在进度条上绑定了一个<code>mouseup</code>事件，结果无效，后来才发现，其实已经自带了<code>change</code>事件，还可以实现移动端的兼容。所以写代码的时候一定要多看看官网文档。</li>
<li>关于<code>store.js</code>里的方法，<code>play</code>是播放／暂停，具体会根据当前音频文件的<code>paused</code>（即是否暂停）来判断。总的原理是首先获取音频的持续时间，然后通过一个定时器，不断更新显示时间，播放完成时，计时器停止。</li>
<li>计时器很关键，进度条和显示时间的更新都需要它。但是计时器有个坑，如果把计时器声明放在<code>play</code>方法里，则无法在<code>audioEnd</code>方法里停止计时器，所以这里我们需要在最外层先声明一个<code>ctime</code>，然后再在<code>play</code>方法里把定时器赋值给<code>ctime</code>，这样我们就可以随时停止计时器了。</li>
<li>
<code>audioEnd</code>方法是播放停止时要做的事情，我们会把停止按钮切换成播放，把显示时间修改掉，别忘了停止计时器。</li>
<li>
<code>editProgress</code>方法是点击或拖动进度条时做的事情，我们会改变当前音频的<code>currentTime</code>，即当前时间，如果音频是暂停状态，我们要让它继续播放。</li>
</ol>
<h3 id="articleHeader5">4.search.vue</h3>
<p>这也是一个比较核心的一个功能，毕竟推荐的歌单只有几个。看代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;search&quot;>

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon=&quot;navigate_before&quot; slot=&quot;left&quot; v-on:click=&quot;backpage&quot;/>
      <div class=&quot;logo searchLogo&quot;>
        iPlayer
      </div>
      <mu-text-field icon=&quot;search&quot; class=&quot;appbar-search-field&quot;  slot=&quot;right&quot; hintText=&quot;想听什么歌？&quot; v-model=&quot;searchKey&quot;/>
      <mu-flat-button color=&quot;white&quot; label=&quot;搜索&quot; slot=&quot;right&quot; @click=&quot;getSearch(searchKey)&quot;/>
    </mu-appbar>

    <!-- banner here-->

    
    <mu-list>       
      <template v-for=&quot;(item,index) in result.songs&quot;>
        <mu-list-item  :title=&quot;item.name&quot; @click=&quot;getSong(item.id,item.name,item.artists[0].name,item.album.name,item.artists[0].id)&quot;>
          <mu-avatar slot=&quot;leftAvatar&quot; backgroundColor=&quot;#fff&quot; color=&quot;#bdbdbd&quot;>"{{"index+1"}}"</mu-avatar>
          <span slot=&quot;describe&quot;>
            <span style=&quot;color: rgba(0, 0, 0, .87)&quot;>"{{"item.artists[0].name"}}" -</span> "{{"item.album.name"}}"
          </span>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    

    <div class=&quot;footer-rights&quot;>
      <h4>版权归Godown Huang所有，请<a href=&quot;https://github.com/WE2008311&quot;>联系我</a>。</h4>
    </div>


  </div>
</template>

<script>


export default {
  
  name: 'search',
  data(){
    return{
      searchKey:''
    }
  },
  computed:{
    result(){
      return this.$store.getters.result;
    }
  },
  
  components: {
    
  },
  
  methods:{
    backpage(){
      window.history.go(-1);
    },
    getSearch(value){
      this.$store.commit('getSearch',value);
    },
    getSong(id,name,singer,album,arid){
      
      
      this.$store.commit('getSong',{id,name,singer,album,arid});
      this.$store.commit('play');
    }
    
  }
}
</script>
  

<style lang=&quot;less&quot;>
  @media screen and (max-width: 525px){
    .searchLogo{
      display: none;
    }
    .appbar-search-field{
      width: 200px!important;
    }
  }
  
  .appbar-search-field {
    color: #FFF;
    margin-top: 10px;
    margin-bottom: 0;
    &amp;.focus-state {
      color: #FFF;
    }
    .mu-icon {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }

  .footer-rights>h4{
    color: #e1e1e1;
    font-weight: 100;
    font-size:.056rem;
    height:90px;
    padding-top: 10px;
    text-align: center;
  }

</style>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- navbar here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-appbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"navigate_before"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"backpage"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo searchLogo"</span>&gt;</span>
        iPlayer
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-text-field</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"appbar-search-field"</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">hintText</span>=<span class="hljs-string">"想听什么歌？"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"searchKey"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-flat-button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"white"</span> <span class="hljs-attr">label</span>=<span class="hljs-string">"搜索"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"right"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getSearch(searchKey)"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-appbar</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- banner here--&gt;</span>

    
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-list</span>&gt;</span>       
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in result.songs"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-list-item</span>  <span class="hljs-attr">:title</span>=<span class="hljs-string">"item.name"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getSong(item.id,item.name,item.artists[0].name,item.album.name,item.artists[0].id)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-avatar</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"leftAvatar"</span> <span class="hljs-attr">backgroundColor</span>=<span class="hljs-string">"#fff"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#bdbdbd"</span>&gt;</span></span><span class="hljs-template-variable">"{{"index+1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mu-avatar</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"describe"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: rgba(0, 0, 0, .87)"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.artists[0].name"}}"</span><span class="xml"> -<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> </span><span class="hljs-template-variable">"{{"item.album.name"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mu-list-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-divider</span>/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-list</span>&gt;</span>
    

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer-rights"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>版权归Godown Huang所有，请<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/WE2008311"</span>&gt;</span>联系我<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>。<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>


  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  
  <span class="hljs-attr">name</span>: <span class="hljs-string">'search'</span>,
  data(){
    <span class="hljs-keyword">return</span>{
      <span class="hljs-attr">searchKey</span>:<span class="hljs-string">''</span>
    }
  },
  <span class="hljs-attr">computed</span>:{
    result(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.result;
    }
  },
  
  <span class="hljs-attr">components</span>: {
    
  },
  
  <span class="hljs-attr">methods</span>:{
    backpage(){
      <span class="hljs-built_in">window</span>.history.go(<span class="hljs-number">-1</span>);
    },
    getSearch(value){
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'getSearch'</span>,value);
    },
    getSong(id,name,singer,album,arid){
      
      
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'getSong'</span>,{id,name,singer,album,arid});
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'play'</span>);
    }
    
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span>&gt;</span><span class="undefined">
  @media screen and (max-width: 525px){
    .searchLogo{
      display: none;
    }
    .appbar-search-field{
      width: 200px!important;
    }
  }
  
  .appbar-search-field {
    color: #FFF;
    margin-top: 10px;
    margin-bottom: 0;
    &amp;.focus-state {
      color: #FFF;
    }
    .mu-icon {
      color: #FFF;
    }
    .mu-text-field-hint {
      color: fade(#FFF, 54%);
    }
    .mu-text-field-input {
      color: #FFF;
    }
    
    .mu-text-field-focus-line {
      background-color: #FFF;
    }
  }

  .footer-rights&gt;h4{
    color: #e1e1e1;
    font-weight: 100;
    font-size:.056rem;
    height:90px;
    padding-top: 10px;
    text-align: center;
  }

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</span></code></pre>
<p>在<code>store.js</code>里添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getSearch(state,value){
        const url='http://localhost:3000/search?keywords='+value+'?limit=30';
        axios.get(url).then(res=>{
            state.result=res.data.result;
        })
        
    },
    getSong(state,{id,name,singer,album,arid}){
        const url=&quot;http://localhost:3000/music/url?id=&quot;+id;
        const imgUrl=&quot;http://localhost:3000/artist/album?id=&quot;+arid;
        const playerBar=document.getElementById(&quot;playerBar&quot;);
        

        axios.get(url).then(res=>{
            
            state.audio.location=res.data.data[0].url;
            state.audio.flag=res.data.data[0].flag;
            
            state.audio.songName=name;
            state.audio.singer=singer;
            state.audio.album=album;
        })
        axios.get(imgUrl).then(res=>{
            state.audio.picUrl=res.data.artist.picUrl;
        })
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/60)+&quot;:&quot;+(currentTime%60/100).toFixed(2).slice(-2);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/60)+&quot;:&quot;+(duraTime%60/100).toFixed(2).slice(-2);

        state.audio.duration=duraMinute;
        state.audio.currentTime=currentMinute;
        state.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*100).toFixed(1);
        
        
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>getSearch(<span class="hljs-keyword">state</span>,value){
        const url='http://localhost:<span class="hljs-number">3000</span>/search?keywords='+value+'?<span class="hljs-keyword">limit</span>=<span class="hljs-number">30</span>';
        axios.get(url).then(res=&gt;{
            <span class="hljs-keyword">state</span>.result=res.data.result;
        })
        
    },
    getSong(<span class="hljs-keyword">state</span>,{id,name,singer,album,arid}){
        const url=<span class="hljs-string">"http://localhost:3000/music/url?id="</span>+id;
        const imgUrl=<span class="hljs-string">"http://localhost:3000/artist/album?id="</span>+arid;
        const playerBar=document.getElementById(<span class="hljs-string">"playerBar"</span>);
        

        axios.get(url).then(res=&gt;{
            
            <span class="hljs-keyword">state</span>.audio.location=res.data.data[<span class="hljs-number">0</span>].url;
            <span class="hljs-keyword">state</span>.audio.flag=res.data.data[<span class="hljs-number">0</span>].flag;
            
            <span class="hljs-keyword">state</span>.audio.songName=name;
            <span class="hljs-keyword">state</span>.audio.singer=singer;
            <span class="hljs-keyword">state</span>.audio.album=album;
        })
        axios.get(imgUrl).then(res=&gt;{
            <span class="hljs-keyword">state</span>.audio.picUrl=res.data.artist.picUrl;
        })
        
        let currentTime=playerBar.currentTime;
        let currentMinute=Math.floor(currentTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(currentTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);
        let duraTime=playerBar.duration;
        let duraMinute=Math.floor(duraTime/<span class="hljs-number">60</span>)+<span class="hljs-string">":"</span>+(duraTime%<span class="hljs-number">60</span>/<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">2</span>).slice(-<span class="hljs-number">2</span>);

        <span class="hljs-keyword">state</span>.audio.duration=duraMinute;
        <span class="hljs-keyword">state</span>.audio.currentTime=currentMinute;
        <span class="hljs-keyword">state</span>.audio.progressPercent=((playerBar.currentTime/playerBar.duration)*<span class="hljs-number">100</span>).<span class="hljs-keyword">to</span>Fixed(<span class="hljs-number">1</span>);
        
        
    }</code></pre>
<blockquote>注意，在有需要使用<code>axios</code>的组件一定要<code>import</code>，npm下载安装不用多说了。</blockquote>
<p>解释一下这个组件的两个方法：</p>
<ol>
<li>
<code>getSearch</code>是获取搜索结果，它被绑定再搜索按钮上，初始页面是空白，通过传递关键字，用<code>axios</code>从api获取搜索结果，再把结果显示在页面上。</li>
<li>
<code>getSong</code>绑定在每一个搜索的结果上，有两个步骤，第一是<code>getSong</code>，会把点击的歌曲设置为要播放的歌曲，并把相关信息传递给<code>play.vue</code>，让它显示在相应的地方；第二个步骤，会播放歌曲，也就是上面的<code>play</code>方法，具体不必再说。</li>
<li>这里有一个坑，我们可能需要通过vuex传递参数，但是有时候传递多个参数会出现<code>undefined</code>的情况，这时候我们要把参数们写成<code>{参数一,参数二,参数三}</code>的形式。</li>
</ol>
<h3 id="articleHeader6">5.songList</h3>
<p>这个组件主要是歌单详情页，基本的样式和搜索页一样，就是获取歌单的内容不同，搜索页面的列表是根据关键词获取的，歌单详情页的列表是根据歌单id获取的，获取的方式都是通过axios。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;songsList&quot;>

    <!-- navbar here -->
    <mu-appbar>
      <mu-icon-button icon=&quot;navigate_before&quot; slot=&quot;left&quot; v-on:click=&quot;backpage&quot;/>
      <div class=&quot;logo&quot;>
        iPlayer
      </div>
    </mu-appbar>

    <!-- banner here-->

    <div class=&quot;listBgImg&quot;>
      <img :src=&quot;playlist.coverImgUrl&quot; />
      <!-- 封面CD -->
      <mu-avatar  slot=&quot;left&quot; :size=&quot;120&quot; :src=&quot;playlist.coverImgUrl&quot;/>
      
    </div>
    
    <mu-list>       
      <mu-sub-header>"{{"playlist.name"}}"</mu-sub-header>
      <template v-for=&quot;(item,index) in playlist.tracks&quot;>
        <mu-list-item  :title=&quot;item.name&quot; @click=&quot;getSong(item.id,item.name,item.ar[0].name,item.al.name,item.ar[0].id)&quot;>
          <mu-avatar :src=&quot;item.al.picUrl&quot; slot=&quot;leftAvatar&quot;/>
          <span slot=&quot;describe&quot;>
            <span style=&quot;color: rgba(0, 0, 0, .87)&quot;>"{{"item.ar[0].name"}}" -</span> "{{"item.al.name"}}"
          </span>
        </mu-list-item>
        <mu-divider/>
      </template>
    </mu-list>
    
    <div class=&quot;footer-rights&quot;>
      <h4>版权归Godown Huang所有，请<a href=&quot;https://github.com/WE2008311&quot;>联系我</a>。</h4>
    </div>



  </div>
</template>

<script>


export default {
  
  name: 'songsList',
  data(){
    return{

    }
  },
  components: {
    
  },
  computed:{
      playlist(){
        return this.$store.getters.playlist;
      }
      
  },
  methods:{
    backpage(){
      window.history.go(-1);
    },
    getSong(id,name,singer,album,arid){
      this.$store.commit('getSong',{id,name,singer,album,arid});
      this.$store.commit('play');
      
    }
  }
}
</script>
  

<style lang=&quot;css&quot;>
    
  .listBgImg{
    height:200px;
    width:100%;
    background: #fff;
    overflow: hidden;
  }
  .listBgImg>img{
    width: 100%;
    filter:blur(30px);
    -webkit-filter: blur(30px); 
    -moz-filter: blur(30px);
    -ms-filter: blur(30px);
  }
  .listBgImg .mu-avatar{
    position: absolute;
    left: 50%;
    margin-left: -60px;
    top: 130px;
  }
  .mu-list .mu-sub-header{
    /* position: absolute; */
    top: 260px;
    font-size: 16px;
    /* text-align: center; */
  }
  
  

</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"songsList"</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- navbar here --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-appbar</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"navigate_before"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"backpage"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo"</span>&gt;</span>
        iPlayer
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-appbar</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- banner here--&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"listBgImg"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"playlist.coverImgUrl"</span> /&gt;</span>
      <span class="hljs-comment">&lt;!-- 封面CD --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-avatar</span>  <span class="hljs-attr">slot</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">:size</span>=<span class="hljs-string">"120"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"playlist.coverImgUrl"</span>/&gt;</span>
      
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">mu-list</span>&gt;</span>       
      <span class="hljs-tag">&lt;<span class="hljs-name">mu-sub-header</span>&gt;</span></span><span class="hljs-template-variable">"{{"playlist.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">mu-sub-header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">"(item,index) in playlist.tracks"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-list-item</span>  <span class="hljs-attr">:title</span>=<span class="hljs-string">"item.name"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getSong(item.id,item.name,item.ar[0].name,item.al.name,item.ar[0].id)"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-avatar</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"item.al.picUrl"</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"leftAvatar"</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">slot</span>=<span class="hljs-string">"describe"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"color: rgba(0, 0, 0, .87)"</span>&gt;</span></span><span class="hljs-template-variable">"{{"item.ar[0].name"}}"</span><span class="xml"> -<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span> </span><span class="hljs-template-variable">"{{"item.al.name"}}"</span><span class="xml">
          <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">mu-list-item</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">mu-divider</span>/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">mu-list</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer-rights"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>版权归Godown Huang所有，请<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://github.com/WE2008311"</span>&gt;</span>联系我<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>。<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>



  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">


<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  
  <span class="hljs-attr">name</span>: <span class="hljs-string">'songsList'</span>,
  data(){
    <span class="hljs-keyword">return</span>{

    }
  },
  <span class="hljs-attr">components</span>: {
    
  },
  <span class="hljs-attr">computed</span>:{
      playlist(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.playlist;
      }
      
  },
  <span class="hljs-attr">methods</span>:{
    backpage(){
      <span class="hljs-built_in">window</span>.history.go(<span class="hljs-number">-1</span>);
    },
    getSong(id,name,singer,album,arid){
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'getSong'</span>,{id,name,singer,album,arid});
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'play'</span>);
      
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"css"</span>&gt;</span><span class="css">
    
  <span class="hljs-selector-class">.listBgImg</span>{
    <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
  }
  <span class="hljs-selector-class">.listBgImg</span>&gt;<span class="hljs-selector-tag">img</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">filter</span>:<span class="hljs-built_in">blur</span>(30px);
    <span class="hljs-attribute">-webkit-filter</span>: <span class="hljs-built_in">blur</span>(30px); 
    <span class="hljs-attribute">-moz-filter</span>: <span class="hljs-built_in">blur</span>(30px);
    <span class="hljs-attribute">-ms-filter</span>: <span class="hljs-built_in">blur</span>(30px);
  }
  <span class="hljs-selector-class">.listBgImg</span> <span class="hljs-selector-class">.mu-avatar</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">60px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">130px</span>;
  }
  <span class="hljs-selector-class">.mu-list</span> <span class="hljs-selector-class">.mu-sub-header</span>{
    <span class="hljs-comment">/* position: absolute; */</span>
    <span class="hljs-attribute">top</span>: <span class="hljs-number">260px</span>;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-comment">/* text-align: center; */</span>
  }
  
  

</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<p>没什么需要解释的，注意我们在<code>getSong</code>里面传递的多个参数。</p>
<h3 id="articleHeader7">6.playerBox.vue</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div class=&quot;playerBox&quot;>
      
      <audio ref=&quot;myAudio&quot; :src=&quot;audio.location&quot; @ended=&quot;audioEnd&quot; id=&quot;playerBar&quot;></audio>

      <div class=&quot;controlBarBtn&quot; v-show=&quot;judgement()&quot;>
        
          <mu-icon-button icon=&quot;skip_previous&quot;/>
          <mu-icon-button class=&quot;addPlus&quot; icon=&quot;play_arrow&quot; @click=&quot;play&quot;/>
          <mu-icon-button icon=&quot;skip_next&quot;/>
      </div>
  </div>
  
</template>

<script>



export default {



  name: 'playerBox',
  data(){
    
    return{
      
    }
  },
  components: {
    
  },

  computed:{
    audio(){
      return this.$store.getters.audio;
    }
  },
  methods:{
    play(){
      this.$store.commit('play');
    },
    audioEnd(event){
      this.$store.commit('audioEnd',event);
    },
    judgement(){
      let path=this.$route.path;
      if(path==&quot;/play&quot;){
        return true;
      }else{
        return false;
      }
    }
  }
  
}
</script>
  

<style lang=&quot;less&quot; >
  .controlBarBtn{
    position: absolute;
    z-index:12;
    width: 243px;
    margin-left: -121.5px;
    
    top: 83%;
    left: 50%;
  }

  .controlBarBtn i.mu-icon{
    font-size: 36px;
    color: #03a9f4;
    left: 50%;
    margin-left: -18px;
    position: absolute;
    top: 10%;
  }
  
  .controlBarBtn .addPlus{
    top: 16px;
    width: 80px!important;
    height: 80px!important;
    margin: 0 30px!important;
  }
  .controlBarBtn .addPlus i.mu-icon{
    font-size: 60px;
    margin-left: -30px;
    top: 10%;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"playerBox"</span>&gt;</span>
      
      <span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"myAudio"</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">"audio.location"</span> @<span class="hljs-attr">ended</span>=<span class="hljs-string">"audioEnd"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"playerBar"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"controlBarBtn"</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">"judgement()"</span>&gt;</span>
        
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"skip_previous"</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"addPlus"</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"play_arrow"</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"play"</span>/&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">mu-icon-button</span> <span class="hljs-attr">icon</span>=<span class="hljs-string">"skip_next"</span>/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">



<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {



  <span class="hljs-attr">name</span>: <span class="hljs-string">'playerBox'</span>,
  data(){
    
    <span class="hljs-keyword">return</span>{
      
    }
  },
  <span class="hljs-attr">components</span>: {
    
  },

  <span class="hljs-attr">computed</span>:{
    audio(){
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.audio;
    }
  },
  <span class="hljs-attr">methods</span>:{
    play(){
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'play'</span>);
    },
    audioEnd(event){
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">'audioEnd'</span>,event);
    },
    judgement(){
      <span class="hljs-keyword">let</span> path=<span class="hljs-keyword">this</span>.$route.path;
      <span class="hljs-keyword">if</span>(path==<span class="hljs-string">"/play"</span>){
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
      }
    }
  }
  
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"less"</span> &gt;</span><span class="css">
  <span class="hljs-selector-class">.controlBarBtn</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">z-index</span>:<span class="hljs-number">12</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">243px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">121.5px</span>;
    
    <span class="hljs-attribute">top</span>: <span class="hljs-number">83%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
  }

  <span class="hljs-selector-class">.controlBarBtn</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.mu-icon</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">36px</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#03a9f4</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">18px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10%</span>;
  }
  
  <span class="hljs-selector-class">.controlBarBtn</span> <span class="hljs-selector-class">.addPlus</span>{
    <span class="hljs-attribute">top</span>: <span class="hljs-number">16px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span><span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">80px</span><span class="hljs-meta">!important</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">30px</span><span class="hljs-meta">!important</span>;
  }
  <span class="hljs-selector-class">.controlBarBtn</span> <span class="hljs-selector-class">.addPlus</span> <span class="hljs-selector-tag">i</span><span class="hljs-selector-class">.mu-icon</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">60px</span>;
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">30px</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">10%</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>这个页面比较简单，播放器<code>audio</code>标签，绑定了ended事件，即播放完成后执行。<br>这里有一个坑，解释一下：我把播放器按钮放在这里了，为什么呢？之前我是放在<code>play.vue</code>里的，但是我发现一个问题，就是通过点击歌单的歌曲播放时，无法改变播放／暂停按钮，为什么呢？因为我改变按钮的方法是用<code>innerHTML</code>改变，我为什么要用这种方法呢？因为Muse-ui的icon经过渲染，是以标签的值的形式出现的。这就不得不获取DOM了，但是如果把按钮写在<code>play.vue</code>里，在歌单页面时是获取不到指定DOM的，因为当前页面根本没有这个DOM！只有把按钮写在在主组件里的<code>playerBox.vue</code>里，才能获取到指定DOM。</p>
<p>但是写在<code>playBox.vue</code>里又有一个问题，按钮会出现在每一个页面里，但是我们只要它出现在播放页面就好了，所以我们在这里要给按钮绑定一个<code>v-show</code>，里面的内容就是判断是不是在指定路由，如果是播放页面，就显示按钮，不是，就隐藏按钮。</p>
<h2 id="articleHeader8">axios和网易云api</h2>
<p>axios具体的配置我都在上面讲了，这里介绍一款网易云的api和使用方法。</p>
<p><a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/" rel="nofollow noreferrer" target="_blank">文档在此</a></p>
<p>介绍一下使用方法，进入git把它下下来，在命令行执行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ node app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">node</span> <span class="hljs-title">app</span>.js</code></pre>
<p>在浏览器输入地址：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:3000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">localhost:</span><span class="hljs-number">3000</span></code></pre>
<p>看到弹出的页面就说明服务器启动成功了。然后我们可以在文档里查到具体请求的数据，比如banner啊，歌单啊，搜索啊，都能请求。我们看到前面写的axios请求里的地址，都是具体请求的地址。</p>
<p>这里要注意的是，这个api默认的是没有开启跨域的，看<code>app.js</code>里有一段被隐藏的代码就是跨域的相关设置，解除隐藏即可。</p>
<h2 id="articleHeader9">bug和未实现功能</h2>
<p>目前还存在一个比较大的bug，就是在歌单点击播放时，点击第一次因为没办法获取个去的url，无法播放，只有再点击一次才能播放，这个bug暂时还没有时间解决，会尽快解决。</p>
<p>然后目前还没有实现的功能是播放列表，自然上一曲／下一曲按钮也没有用了，歌曲播放一遍也就停止了，这个功能不算难，抽空把它做出来。</p>
<h2 id="articleHeader10">参考资料</h2>
<p>这个app参考了一些技术文章，给了我很大的启发，附上链接。<br><a href="https://segmentfault.com/a/1190000010357908">用vue全家桶写一个“以假乱真”的网易云音乐</a><br><a href="https://juejin.im/entry/59361bd3a0bb9f0058f2cc52" rel="nofollow noreferrer" target="_blank">DIY 一个自己的音乐播放器 2.0 来袭</a></p>
<h2 id="articleHeader11">结语</h2>
<p>这个app前前后后，磨磨蹭蹭做了两个月，好歹总算是做完了。学习还是得找项目来做，虽然这个项目还很简陋，但是还是get到很多知识点，对于我的提高还是蛮大的。</p>
<p>这种项目不算难，写过的人也多，所以百分之八十的问题都能百度出来，剩下的百分之二十，技术社区里提个问基本能够解决。项目还是得自己写一遍，写的过程中才能发现问题，也才能想办法找到解决办法，事情总是会比你想象的要简单一点。</p>
<p>项目不算大，但要一步步写下来总有可能有所遗漏，这里是我的<a href="https://github.com/WE2008311/appBox" rel="nofollow noreferrer" target="_blank">GitHub</a>，大家可以对照着看看有没有遗漏。如果你喜欢我的项目，也希望star或者fork一波～</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用Vue搭建一个应用盒子（三）：音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000013061686](https://segmentfault.com/a/1190000013061686)

