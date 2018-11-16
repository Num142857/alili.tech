---
title: vuejs2.0 高级实战 全网稀缺 独立开发专属音乐WebAPP 更新中。。。
reprint: true
categories: reprint
slug: b588ec07
date: 2018-11-15 02:30:08
---

{% raw %}
<p><span class="img-wrap"><img data-src="/img/remote/1460000016137167?w=1013&amp;h=573" src="https://static.alili.tech/img/remote/1460000016137167?w=1013&amp;h=573" alt="&#x8FD9;&#x91CC;&#x5199;&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x8FD9;&#x91CC;&#x5199;&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>&#x8BCD;&#x6761;</strong></p><p>&#x76EE;&#x524D;&#x5E02;&#x9762;&#x4E0A;&#x8FD8;&#x6CA1;&#x6709;&#x4E00;&#x4E2A;Vue 2.0 &#x7684;&#x9AD8;&#x7EA7;&#x6559;&#x5B66;&#xFF0C;&#x90FD;&#x662F;&#x4E00;&#x4E9B;&#x57FA;&#x7840;&#x7684;&#x5165;&#x95E8;&#x8BFE;&#x7A0B;&#xFF0C;&#x4F60;&#x5F88;&#x96BE;&#x627E;&#x5230;&#x4E00;&#x4E2A;&#x57FA;&#x4E8E;Vue.js&#x7684;&#x590D;&#x6742;&#x5E94;&#x7528;&#x7684;&#x6559;&#x5B66;&#xFF0C; &#x4F46;&#x662F;&#xFF0C;&#x6211;&#x4EEC;&#x4E3A;&#x4F60;&#x51C6;&#x5907;&#x4E86;&#x8FD9;&#x95E8;&#x72EC;&#x4E00;&#x65E0;&#x4E8C;&#x7684;Vue 2.0 &#x9AD8;&#x7EA7;&#x5B9E;&#x6218;&#x8BFE;&#x7A0B;</p><hr><p><strong>src&#x7B80;&#x5355;&#x7684;&#x4ECB;&#x7ECD;</strong></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016137168?w=267&amp;h=451" src="https://static.alili.tech/img/remote/1460000016137168?w=267&amp;h=451" alt="&#x8FD9;&#x91CC;&#x5199;&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x8FD9;&#x91CC;&#x5199;&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><p><strong>&#x5165;&#x53E3;&#x6587;&#x4EF6;</strong></p><pre><code>import &apos;babel-polyfill&apos;  //&#x5199;&#x5728;&#x7B2C;&#x4E00;&#x4F4D;
import Vue from &apos;vue&apos;
import App from &apos;./App&apos;
import router from &apos;./router&apos;
import fastclick from &apos;fastclick&apos;
import VueLazyload from &apos;vue-lazyload&apos;
import store from &apos;./store&apos;

import &apos;common/stylus/index.styl&apos;

/* eslint-disable no-unused-vars */
// import vConsole from &apos;vconsole&apos;

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require(&apos;common/image/default.png&apos;)  //&#x4F20;&#x4E00;&#x4E2A;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;
})

/* eslint-disable no-new */
new Vue({
  el: &apos;#app&apos;,
  router,
  store,
  render: h =&gt; h(App)
})
</code></pre><blockquote><code>babel-polyfill&#x662F;es6&#x5E95;&#x5C42;&#x94FA;&#x57AB;&#x5373;&#x652F;&#x6301;&#x4E00;&#x4E9B;API&#xFF0C;&#x6BD4;&#x5982;promise</code></blockquote><p><strong>Tab&#x9875;&#x9762;</strong></p><pre><code>&lt;template&gt;
  &lt;div class=&quot;tab&quot;&gt;
    &lt;router-link tag=&quot;div&quot; class=&quot;tab-item&quot; to=&quot;/recommend&quot;&gt;
      &lt;span class=&quot;tab-link&quot;&gt;&#x63A8;&#x8350;&lt;/span&gt;
    &lt;/router-link&gt;
    &lt;router-link tag=&quot;div&quot; class=&quot;tab-item&quot; to=&quot;/singer&quot;&gt;
      &lt;span class=&quot;tab-link&quot;&gt;&#x6B4C;&#x624B;&lt;/span&gt;
    &lt;/router-link&gt;
    &lt;router-link tag=&quot;div&quot; class=&quot;tab-item&quot; to=&quot;/rank&quot;&gt;
      &lt;span class=&quot;tab-link&quot;&gt;&#x6392;&#x884C;
      &lt;/span&gt;
    &lt;/router-link&gt;
    &lt;router-link tag=&quot;div&quot; class=&quot;tab-item&quot; to=&quot;/search&quot;&gt;
      &lt;span class=&quot;tab-link&quot;&gt;&#x641C;&#x7D22;&lt;/span&gt;
    &lt;/router-link&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  export default {}
&lt;/script&gt;</code></pre><blockquote>`router-link&#x9ED8;&#x8BA4;&#x662F;a&#x6807;&#x7B7E;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x8FC7;tag&#x6307;&#x5B9A;&#x4E3A;div<br>.router-link-active&#x8FD9;&#x4E2A;class&#x662F;&#x7EC4;&#x4EF6;&#x81EA;&#x5E26;&#x7684;`</blockquote><p><strong>APP.vue</strong></p><pre><code>&lt;template&gt;
  &lt;div id=&quot;app&quot; @touchmove.prevent&gt;
    &lt;m-header&gt;&lt;/m-header&gt;
    &lt;tab&gt;&lt;/tab&gt;
    &lt;keep-alive&gt;
      &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/keep-alive&gt;
    &lt;player&gt;&lt;/player&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  import MHeader from &apos;components/m-header/m-header&apos;
  import Player from &apos;components/player/player&apos;
  import Tab from &apos;components/tab/tab&apos;

  export default {
    components: {
      MHeader,
      Tab,
      Player
    }
  }
&lt;/script&gt;</code></pre><blockquote><code>&#x4ED4;&#x7EC6;&#x7684;&#x770B;&#x4E00;&#x4E0B;&#x5F15;&#x5165;&#x7684;&#x7EC4;&#x4EF6;Tab&#x4EE5;&#x53CA;&#x4E00;&#x4E2A;&#x5E03;&#x5C40;&#x65B9;&#x5F0F;</code></blockquote><p><strong>jsonp&#x7684;&#x5C01;&#x88C5;</strong></p><pre><code>import originJsonp from &apos;jsonp&apos;   //jsonp &#x7ED3;&#x5408;promise &#x5C01;&#x88C5;

export default function jsonp(url, data, option) {
  url += (url.indexOf(&apos;?&apos;) &lt; 0 ? &apos;?&apos; : &apos;&amp;&apos;) + param(data)

  return new Promise((resolve, reject) =&gt; {
    originJsonp(url, option, (err, data) =&gt; {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export function param(data) {
  let url = &apos;&apos;
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : &apos;&apos;
    url += &apos;&amp;&apos; + k + &apos;=&apos; + encodeURIComponent(value)
    //&#x89C6;&#x9891;&#x4EE3;&#x7801; 
    //url += `&amp;${k}=${encodeURIComponent(value)}`   es6&#x8BED;&#x6CD5;
  }
  return url ? url.substring(1) : &apos;&apos;
}
</code></pre><blockquote><code>&#x91CD;&#x70B9;&#x5173;&#x6CE8;&#x4E00;&#x4E0B;URL&#x7684;&#x62FC;&#x63A5;&#x53EF;&#x4EE5;&#x7528;&#x5230;&#x9879;&#x76EE;&#x4E2D;</code></blockquote><hr><p><strong>API/recommend.js &#x4F7F;&#x7528;jsonp &#x8C03;&#x53D6;&#x8F6E;&#x64AD;&#x56FE;&#x7684;&#x6570;&#x636E;</strong></p><pre><code>import jsonp from &apos;common/js/jsonp&apos;
import {commonParams, options} from &apos;./config&apos;

export function getRecommend() {
  const url = &apos;https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg&apos;

  const data = Object.assign({}, commonParams, {  //assign es6&#x8BED;&#x6CD5;
    platform: &apos;h5&apos;,
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}
</code></pre><blockquote><code>&#x7528;&#x5230;&#x4E86;es6&#x5BF9;&#x8C61;&#x7684;&#x5408;&#x5E76;&#x65B9;&#x6CD5;Object.assign</code></blockquote><p><strong>config.js</strong></p><pre><code>export const commonParams = {
  g_tk: 1928093487,
  inCharset: &apos;utf-8&apos;,
  outCharset: &apos;utf-8&apos;,
  notice: 0,
  format: &apos;jsonp&apos;
}

export const options = {
  param: &apos;jsonpCallback&apos;
}

export const ERR_OK = 0</code></pre><blockquote><code>&#x5B9A;&#x4E49;&#x4E00;&#x4E9B;&#x516C;&#x5171;&#x53C2;&#x6570;&#xFF0C;&#x4E0D;&#x7528;&#x6BCF;&#x6B21;&#x518D;&#x53BB;&#x91CD;&#x5199;</code></blockquote><p><strong>components/recommend.vue &#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x8C03;&#x7528;&#x63A5;&#x53E3;</strong></p><pre><code>&lt;div v-if=&quot;recommends.length&quot; class=&quot;slider-wrapper&quot; ref=&quot;sliderWrapper&quot;&gt;
          &lt;slider&gt;
            &lt;div v-for=&quot;item in recommends&quot;&gt;
              &lt;a :href=&quot;item.linkUrl&quot;&gt;
                &lt;img class=&quot;needsclick&quot; @load=&quot;loadImage&quot; :src=&quot;item.picUrl&quot;&gt;
                &lt;!-- &#x5982;&#x679C;fastclick&#x76D1;&#x542C;&#x5230;&#x6709;class&#x4E3A;needsclick&#x5C31;&#x4E0D;&#x4F1A;&#x62E6;&#x622A; --&gt;
              &lt;/a&gt;
            &lt;/div&gt;
          &lt;/slider&gt;
        &lt;/div&gt;</code></pre><blockquote>`&#x8FD9;&#x91CC;&#x7528;&#x5230;&#x4E86;slider&#x7EC4;&#x4EF6;&#x4EE5;&#x53CA;slot&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x4E5F;&#x9047;&#x5230;&#x4E86;&#x4E00;&#x4E2A;&#x5751;&#xFF0C;&#x56E0;&#x4E3A;&#x6570;&#x636E;&#x54CD;&#x5E94;<br>&#x5FC5;&#x987B;&#x786E;&#x5B9A;&#x6709;&#x6570;&#x636E;v-if=&quot;recommends.length&quot;&#x624D;&#x80FD;&#x4FDD;&#x8BC1;&#x63D2;&#x69FD;&#x7684;&#x6B63;&#x786E;&#x663E;&#x793A;`</blockquote><pre><code>export default {
    data() {
      return {
        recommends: []
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      
      _getRecommend() {
        getRecommend().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      }
    },
    components: {
      Slider
    }
  }</code></pre><pre><code>&lt;div class=&quot;recommend-list&quot;&gt;
          &lt;h1 class=&quot;list-title&quot;&gt;&#x70ED;&#x95E8;&#x6B4C;&#x5355;&#x63A8;&#x8350;&lt;/h1&gt;
          &lt;ul&gt;
            &lt;li @click=&quot;selectItem(item)&quot; v-for=&quot;item in discList&quot; class=&quot;item&quot;&gt;
              &lt;div class=&quot;icon&quot;&gt;
                &lt;img width=&quot;60&quot; height=&quot;60&quot; v-lazy=&quot;item.imgurl&quot;&gt;
              &lt;/div&gt;
              &lt;div class=&quot;text&quot;&gt;
                &lt;h2 class=&quot;name&quot; v-html=&quot;item.creator.name&quot;&gt;&lt;/h2&gt;
                &lt;p class=&quot;desc&quot; v-html=&quot;item.dissname&quot;&gt;&lt;/p&gt;
              &lt;/div&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/div&gt;</code></pre><pre><code>&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  import Slider from &apos;base/slider/slider&apos;
  import Loading from &apos;base/loading/loading&apos;
  import Scroll from &apos;base/scroll/scroll&apos;
  import {getRecommend, getDiscList} from &apos;api/recommend&apos;

  import {ERR_OK} from &apos;api/config&apos;
  

  export default {

    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()

      this._getDiscList()  //&#x70ED;&#x95E8;&#x6B4C;&#x5355;&#x83B7;&#x53D6;
    },
    methods: {
      
     
      _getRecommend() {
        getRecommend().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
     
    },
    components: {
      Slider,
      Loading,
      Scroll
    }
  }
&lt;/script&gt;</code></pre><blockquote><code>&#x5728;&#x8FD9;&#x91CC;&#x6CA1;&#x6709;&#x7528;jsonp&#x800C;&#x662F;&#x7528;&#x4E86;axios,&#x662F;&#x56E0;&#x4E3A;&#x63A5;&#x53E3;&#x6709;host&#x3001;referer&#x6821;&#x9A8C;&#x4E0D;&#x5F97;&#x4F7F;&#x7528;&#x540E;&#x7AEF;&#x4EE3;&#x7406;&#x63A5;&#x53E3;&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x5904;&#x7406;</code></blockquote><p><strong>bulid&#x76EE;&#x5F55;&#x4E0B;dev-server.js&#x5904;&#x7406;&#x4EE3;&#x7406;</strong></p><pre><code>require(&apos;./check-versions&apos;)()

var config = require(&apos;../config&apos;)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require(&apos;opn&apos;)
var path = require(&apos;path&apos;)
var express = require(&apos;express&apos;)
var webpack = require(&apos;webpack&apos;)
var proxyMiddleware = require(&apos;http-proxy-middleware&apos;)
var webpackConfig = require(&apos;./webpack.dev.conf&apos;)
var axios = require(&apos;axios&apos;) //&#x7B2C;&#x4E00;&#x6B65;

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()   //&#x4EE5;&#x4E0B;&#x662F;&#x540E;&#x7AEF;&#x4EE3;&#x7406;&#x63A5;&#x53E3; &#x7B2C;&#x4E8C;&#x6B65;

apiRoutes.get(&apos;/getDiscList&apos;, function (req, res) {
  var url = &apos;https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg&apos;
  axios.get(url, {
    headers: {
      referer: &apos;https://c.y.qq.com/&apos;,
      host: &apos;c.y.qq.com&apos;
    },
    params: req.query
  }).then((response) =&gt; {
    res.json(response.data)  //&#x8F93;&#x51FA;&#x5230;&#x6D4F;&#x89C8;&#x5668;&#x7684;res
  }).catch((e) =&gt; {
    console.log(e)
  })
})

apiRoutes.get(&apos;/lyric&apos;, function (req, res) {  //&#x8FD9;&#x662F;&#x53E6;&#x4E00;&#x4E2A;&#x63A5;&#x53E3;&#x4E0B;&#x8282;&#x5C06;&#x7528;&#x5230;
  var url = &apos;https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg&apos;

  axios.get(url, {
    headers: {
      referer: &apos;https://c.y.qq.com/&apos;,
      host: &apos;c.y.qq.com&apos;
    },
    params: req.query
  }).then((response) =&gt; {
    var ret = response.data
    if (typeof ret === &apos;string&apos;) {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) =&gt; {
    console.log(e)
  })
})

app.use(&apos;/api&apos;, apiRoutes)   //&#x6700;&#x540E;&#x4E00;&#x6B65;

var compiler = webpack(webpackConfig)

var devMiddleware = require(&apos;webpack-dev-middleware&apos;)(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require(&apos;webpack-hot-middleware&apos;)(compiler, {
  log: () =&gt; {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin(&apos;compilation&apos;, function (compilation) {
  compilation.plugin(&apos;html-webpack-plugin-after-emit&apos;, function (data, cb) {
    hotMiddleware.publish({ action: &apos;reload&apos; })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === &apos;string&apos;) {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require(&apos;connect-history-api-fallback&apos;)())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static(&apos;./static&apos;))

var uri = &apos;http://localhost:&apos; + port

var _resolve
var readyPromise = new Promise(resolve =&gt; {
  _resolve = resolve
})

console.log(&apos;&gt; Starting dev server...&apos;)
devMiddleware.waitUntilValid(() =&gt; {
  console.log(&apos;&gt; Listening at &apos; + uri + &apos;\n&apos;)
  // when env is testing, don&apos;t need open it
  if (autoOpenBrowser &amp;&amp; process.env.NODE_ENV !== &apos;testing&apos;) {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () =&gt; {
    server.close()
  }
}
</code></pre><p><strong>API/recommend.js &#x4F7F;&#x7528;jsonp &#x8C03;&#x53D6;&#x70ED;&#x95E8;&#x6B4C;&#x5355;&#x7684;&#x6570;&#x636E;</strong></p><pre><code>export function getDiscList() {
  const url = &apos;/api/getDiscList&apos;

  const data = Object.assign({}, commonParams, {
    platform: &apos;yqq&apos;,
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: &apos;json&apos;
  })

  return axios.get(url, {
    params: data
  }).then((res) =&gt; {
    return Promise.resolve(res.data)
  })
}</code></pre><blockquote><code>&#x63A5;&#x4E0B;&#x6765;&#x5F00;&#x53D1;&#x63A8;&#x8350;&#x9875;&#x9762;&#x6EDA;&#x52A8;&#x5217;&#x8868;--&#x56E0;&#x4E3A;&#x5F88;&#x591A;&#x9875;&#x9762;&#x90FD;&#x652F;&#x6301;&#x6EDA;&#x52A8;&#xFF0C;&#x6240;&#x4EE5;&#x62BD;&#x51FA;&#x6765;&#x4E00;&#x4E2A;&#x516C;&#x7528;&#x7EC4;&#x4EF6;Scroll.vue</code></blockquote><pre><code>&lt;template&gt;
  &lt;div ref=&quot;wrapper&quot;&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  import BScroll from &apos;better-scroll&apos;

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() =&gt; {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this  //&#x6CE8;&#x610F;&#x8FD9;&#x5757;
          this.scroll.on(&apos;scroll&apos;, (pos) =&gt; {
            me.$emit(&apos;scroll&apos;, pos)
          })
        }

        if (this.pullup) {
          this.scroll.on(&apos;scrollEnd&apos;, () =&gt; {
            if (this.scroll.y &lt;= (this.scroll.maxScrollY + 50)) {
              this.$emit(&apos;scrollToEnd&apos;)
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on(&apos;beforeScrollStart&apos;, () =&gt; {
            this.$emit(&apos;beforeScroll&apos;)
          })
        }
      },
      disable() {
        this.scroll &amp;&amp; this.scroll.disable()
      },
      enable() {
        this.scroll &amp;&amp; this.scroll.enable()
      },
      refresh() {
        this.scroll &amp;&amp; this.scroll.refresh()
      },
      scrollTo() {
        this.scroll &amp;&amp; this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll &amp;&amp; this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() =&gt; {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
&lt;/script&gt;</code></pre><p><strong>recommend.vue</strong></p><blockquote><code>&#x53EF;&#x80FD;&#x4F1A;&#x9047;&#x5230;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x521D;&#x59CB;&#x5316;&#x540E;&#x4E0D;&#x80FD;&#x6EDA;&#x52A8;&#xFF0C;&#x662F;&#x56E0;&#x4E3A;&#x9AD8;&#x5EA6;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6240;&#x4EE5;&#x7ED9;img&#x52A0;&#x4E86;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x91CC;&#x63D0;&#x5230;&#x4E86;vuex&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x90A3;&#x600E;&#x4E48;&#x7ED9;vuex&#x63D0;&#x4EA4;&#x6570;&#x636E;&#x7EC6;&#x5FC3;&#x7684;&#x540C;&#x5B66;&#x53EF;&#x80FD;&#x4F1A;&#x53D1;&#x73B0;&#x2193;&#x2193;&#x2193;&#x2193;&#x2193;</code></blockquote><pre><code>&lt;template&gt;
  &lt;div class=&quot;recommend&quot; ref=&quot;recommend&quot;&gt;
    &lt;scroll ref=&quot;scroll&quot; class=&quot;recommend-content&quot; :data=&quot;discList&quot;&gt;
      &lt;div&gt;
        &lt;div v-if=&quot;recommends.length&quot; class=&quot;slider-wrapper&quot; ref=&quot;sliderWrapper&quot;&gt;
          &lt;slider&gt;
            &lt;div v-for=&quot;item in recommends&quot;&gt;
              &lt;a :href=&quot;item.linkUrl&quot;&gt;
                &lt;img class=&quot;needsclick&quot; @load=&quot;loadImage&quot; :src=&quot;item.picUrl&quot;&gt;
                &lt;!-- &#x5982;&#x679C;fastclick&#x76D1;&#x542C;&#x5230;&#x6709;class&#x4E3A;needsclick&#x5C31;&#x4E0D;&#x4F1A;&#x62E6;&#x622A; --&gt;
              &lt;/a&gt;
            &lt;/div&gt;
          &lt;/slider&gt;
        &lt;/div&gt;
        &lt;div class=&quot;recommend-list&quot;&gt;
          &lt;h1 class=&quot;list-title&quot;&gt;&#x70ED;&#x95E8;&#x6B4C;&#x5355;&#x63A8;&#x8350;&lt;/h1&gt;
          &lt;ul&gt;
            &lt;li @click=&quot;selectItem(item)&quot; v-for=&quot;item in discList&quot; class=&quot;item&quot;&gt;
              &lt;div class=&quot;icon&quot;&gt;
                &lt;img width=&quot;60&quot; height=&quot;60&quot; v-lazy=&quot;item.imgurl&quot;&gt;
              &lt;/div&gt;
              &lt;div class=&quot;text&quot;&gt;
                &lt;h2 class=&quot;name&quot; v-html=&quot;item.creator.name&quot;&gt;&lt;/h2&gt;
                &lt;p class=&quot;desc&quot; v-html=&quot;item.dissname&quot;&gt;&lt;/p&gt;
              &lt;/div&gt;
            &lt;/li&gt;
          &lt;/ul&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;loading-container&quot; v-show=&quot;!discList.length&quot;&gt;
        &lt;loading&gt;&lt;/loading&gt;
      &lt;/div&gt;
    &lt;/scroll&gt;
   
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  import Slider from &apos;base/slider/slider&apos;
  import Loading from &apos;base/loading/loading&apos;
  import Scroll from &apos;base/scroll/scroll&apos;
  import {getRecommend, getDiscList} from &apos;api/recommend&apos;
 
  import {ERR_OK} from &apos;api/config&apos;
  import {mapMutations} from &apos;vuex&apos;

  export default {
    
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()

      this._getDiscList()
    },
    methods: {
      
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      _getRecommend() {
        getRecommend().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      ...mapMutations({
        setDisc: &apos;SET_DISC&apos;
      })
    },
    components: {
      Slider,
      Loading,
      Scroll
    }
  }
&lt;/script&gt;</code></pre><blockquote><code>&#x63A5;&#x4E0B;&#x6765;&#x662F;&#x6B4C;&#x624B;&#x9875;&#x9762;&#xFF0C;&#x7531;&#x4E8E;&#x8003;&#x8651;&#x5230;&#x4E8C;&#x7EA7;&#x8DEF;&#x7531;&#x8981;&#x8DF3;&#x5230;&#x6B4C;&#x624B;&#x8BE6;&#x60C5;&#xFF0C;&#x6240;&#x4EE5;&#x62BD;&#x51FA;&#x4E00;&#x4E2A;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;listview.vue&#xFF0C;&#x6D89;&#x53CA;&#x5230;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x5904;&#x7406;&#x3001;&#x7C7B;&#x7684;&#x521B;&#x5EFA;&#x3001;es6&#x7684;&#x5B57;&#x7B26;&#x62FC;&#x63A5;&#x3001;&#x6570;&#x7EC4;map&#x65B9;&#x6CD5;&#x3001;&#x81EA;&#x5B9A;&#x4E49;data&#x5C5E;&#x6027;&#x83B7;&#x53D6;&#x65B9;&#x6CD5;&#x7684;&#x5C01;&#x88C5;</code></blockquote><pre><code>&lt;template&gt;
  &lt;scroll @scroll=&quot;scroll&quot;
          :listen-scroll=&quot;listenScroll&quot;
          :probe-type=&quot;probeType&quot;
          :data=&quot;data&quot;
          class=&quot;listview&quot;
          ref=&quot;listview&quot;&gt;
    &lt;ul&gt;
      &lt;li v-for=&quot;group in data&quot; class=&quot;list-group&quot; ref=&quot;listGroup&quot;&gt;
        &lt;h2 class=&quot;list-group-title&quot;&gt;{{group.title}}&lt;/h2&gt;
        &lt;uL&gt;
          &lt;li @click=&quot;selectItem(item)&quot; v-for=&quot;item in group.items&quot; class=&quot;list-group-item&quot;&gt;
            &lt;img class=&quot;avatar&quot; v-lazy=&quot;item.avatar&quot;&gt;
            &lt;span class=&quot;name&quot;&gt;{{item.name}}&lt;/span&gt;
          &lt;/li&gt;
        &lt;/uL&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class=&quot;list-shortcut&quot; @touchstart.stop.prevent=&quot;onShortcutTouchStart&quot; @touchmove.stop.prevent=&quot;onShortcutTouchMove&quot;
         @touchend.stop&gt;
      &lt;ul&gt;
        &lt;li v-for=&quot;(item, index) in shortcutList&quot; :data-index=&quot;index&quot; class=&quot;item&quot;
            :class=&quot;{&apos;current&apos;:currentIndex===index}&quot;&gt;{{item}}
        &lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class=&quot;list-fixed&quot; ref=&quot;fixed&quot; v-show=&quot;fixedTitle&quot;&gt;
      &lt;div class=&quot;fixed-title&quot;&gt;{{fixedTitle}} &lt;/div&gt;
    &lt;/div&gt;
    &lt;div v-show=&quot;!data.length&quot; class=&quot;loading-container&quot;&gt;
      &lt;loading&gt;&lt;/loading&gt;
    &lt;/div&gt;
  &lt;/scroll&gt;
&lt;/template&gt;

&lt;script&gt;
  import Scroll from &apos;base/scroll/scroll&apos;
  import Loading from &apos;base/loading/loading&apos;
  import {getData} from &apos;common/js/dom&apos;

  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18  //&#x6837;&#x5F0F;&#x7684;&#x9AD8;&#x5EA6;

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) =&gt; {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle() {
        if (this.scrollY &gt; 0) {
          return &apos;&apos;
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : &apos;&apos;
      }
    },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
    },
    methods: {
      selectItem(item) {
        this.$emit(&apos;select&apos;, item)
      },
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, &apos;index&apos;)
        let firstTouch = e.touches[0] //&#x7B2C;&#x4E00;&#x4E2A;&#x624B;&#x6307;&#x7684;&#x4F4D;&#x7F6E;
        this.touch.y1 = firstTouch.pageY  
        this.touch.anchorIndex = anchorIndex

        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0  //&#x6216;0 &#x76F8;&#x5F53;&#x4E8E;&#x5411;&#x4E0B;&#x53D6;&#x6574;
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i &lt; list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }  //&#x83B7;&#x53D6;&#x5230;&#x4ECE;&#x7B2C;&#x4E00;&#x4E2A;&#x5230;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x6BCF;&#x4E00;&#x4E2A;&#x7684;height
      },
      _scrollTo(index) {
        if (!index &amp;&amp; index !== 0) {
          return
        }
        if (index &lt; 0) {
          index = 0
        } else if (index &gt; this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      }
    },
    watch: {
      data() {
        setTimeout(() =&gt; {
          this._calculateHeight()
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // &#x5F53;&#x6EDA;&#x52A8;&#x5230;&#x9876;&#x90E8;&#xFF0C;newY&gt;0
        if (newY &gt; 0) {
          this.currentIndex = 0
          return
        }
        // &#x5728;&#x4E2D;&#x95F4;&#x90E8;&#x5206;&#x6EDA;&#x52A8;
        for (let i = 0; i &lt; listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY &gt;= height1 &amp;&amp; -newY &lt; height2) { //newY&#x5F80;&#x4E0A;&#x6ED1;&#x662F;&#x8D1F;&#x503C; --&#x53D8;&#x6B63;
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // &#x5F53;&#x6EDA;&#x52A8;&#x5230;&#x5E95;&#x90E8;&#xFF0C;&#x4E14;-newY&#x5927;&#x4E8E;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5143;&#x7D20;&#x7684;&#x4E0A;&#x9650;
        this.currentIndex = listHeight.length - 2
      },
      diff(newVal) {
        let fixedTop = (newVal &gt; 0 &amp;&amp; newVal &lt; TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scroll,
      Loading
    }
  }

&lt;/script&gt;
</code></pre><p><strong>singer.vue</strong></p><blockquote><code>&#x5F15;&#x5165;listview&#x7EC4;&#x4EF6;&#xFF0C;&#x6709;&#x4E00;&#x4E2A;20&#x6BEB;&#x79D2;&#x7684;&#x5B9A;&#x65F6;&#x5668;&#xFF0C;&#x5173;&#x952E;&#x5728;&#x4E8E;&#x5DE6;&#x53F3;&#x8054;&#x52A8;&#x7684;&#x601D;&#x8DEF;&#x5F88;&#x91CD;&#x8981;&#xFF0C;&#x4EE5;&#x53CA;&#x5173;&#x4E8E;diff&#x7684;&#x5904;&#x7406;&#x589E;&#x5F3A;&#x7528;&#x6237;&#x4F53;&#x9A8C;</code></blockquote><pre><code>&lt;template&gt;
  &lt;div class=&quot;singer&quot; ref=&quot;singer&quot;&gt;
    &lt;list-view @select=&quot;selectSinger&quot; :data=&quot;singers&quot; ref=&quot;list&quot;&gt;&lt;/list-view&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import ListView from &apos;base/listview/listview&apos;
  import {getSingerList} from &apos;api/singer&apos;
  import {ERR_OK} from &apos;api/config&apos;
  import Singer from &apos;common/js/singer&apos;
  import {mapMutations} from &apos;vuex&apos;  //&#x5BF9;Mutations&#x7684;&#x5C01;&#x88C5;
  import {playlistMixin} from &apos;common/js/mixin&apos;

  const HOT_SINGER_LEN = 10
  const HOT_NAME = &apos;&#x70ED;&#x95E8;&apos;

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length &gt; 0 ? &apos;60px&apos; : &apos;&apos;
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      selectSinger(singer) {
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      _getSingerList() {
        getSingerList().then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item, index) =&gt; {
          if (index &lt; HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        })
        // &#x4E3A;&#x4E86;&#x5F97;&#x5230;&#x6709;&#x5E8F;&#x5217;&#x8868;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x5904;&#x7406; map
        let ret = []
        let hot = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) =&gt; {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      ...mapMutations({
        setSinger: &apos;SET_SINGER&apos;
      })
    },
    components: {
      ListView
    }
  }

&lt;/script&gt;

</code></pre><blockquote><code>&#x6B4C;&#x624B;&#x8BE6;&#x60C5;&#x9875;&#xFF0C;&#x4E3A;&#x4E86;&#x7EC4;&#x4EF6;&#x91CD;&#x7528;&#x62BD;&#x51FA;&#x6765;&#x4E00;&#x4E2A;music-list.vue,&#x5728;&#x6B64;&#x57FA;&#x7840;&#x53C8;&#x62BD;&#x51FA;&#x6765;&#x4E00;&#x4E2A;song-list.vue&#xFF0C;&#x7528;&#x5230;&#x4E86;v-html&#x6765;&#x8F6C;&#x4E49;&#x5B57;&#x7B26;&#x3001;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x91CC;&#x8FD4;&#x56DE;&#x5BF9;&#x8C61;&#x7684;&#x67D0;&#x51E0;&#x4E2A;key&#x6BD4;&#x5982;&#x53EA;&#x4F20;&#x5165;name&#x6216;&#x8005;&#x5934;&#x50CF;&#x3001;mapGetters&#x83B7;&#x53D6;vuex&#x7684;&#x6570;&#x636E;</code></blockquote><pre><code>&lt;template&gt;
  &lt;div class=&quot;song-list&quot;&gt;
    &lt;ul&gt;
      &lt;li @click=&quot;selectItem(song, index)&quot; class=&quot;item&quot; v-for=&quot;(song, index) in songs&quot;&gt;
        &lt;div class=&quot;rank&quot; v-show=&quot;rank&quot;&gt;
          &lt;span :class=&quot;getRankCls(index)&quot; v-text=&quot;getRankText(index)&quot;&gt;&lt;/span&gt;
        &lt;/div&gt;
        &lt;div class=&quot;content&quot;&gt;
          &lt;h2 class=&quot;name&quot;&gt;{{song.name}}&lt;/h2&gt;
          &lt;p class=&quot;desc&quot;&gt;{{getDesc(song)}}&lt;/p&gt;
        &lt;/div&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script &gt;
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit(&apos;select&apos;, item, index)
      },
      getDesc(song) {
        return `${song.singer}&#xB7;${song.album}`
      },
      getRankCls(index) {
        if (index &lt;= 2) {
          return `icon icon${index}`
        } else {
          return &apos;text&apos;
        }
      },
      getRankText(index) {
        if (index &gt; 2) {
          return index + 1
        }
      }
    }
  }
&lt;/script&gt;</code></pre><hr><pre><code>&lt;template&gt;
  &lt;div class=&quot;music-list&quot;&gt;
    &lt;div class=&quot;back&quot; @click=&quot;back&quot;&gt;
      &lt;i class=&quot;icon-back&quot;&gt;&lt;/i&gt;
    &lt;/div&gt;
    &lt;h1 class=&quot;title&quot; v-html=&quot;title&quot;&gt;&lt;/h1&gt;
    &lt;div class=&quot;bg-image&quot; :style=&quot;bgStyle&quot; ref=&quot;bgImage&quot;&gt;
      &lt;div class=&quot;play-wrapper&quot;&gt;
        &lt;div ref=&quot;playBtn&quot; v-show=&quot;songs.length&gt;0&quot; class=&quot;play&quot; @click=&quot;random&quot;&gt;&lt;!-- &#x5F53;&#x6570;&#x636E;&#x6709;&#x4E86;&#x4EE5;&#x540E;&#x518D;&#x663E;&#x793A;v-show --&gt;
          &lt;i class=&quot;icon-play&quot;&gt;&lt;/i&gt;
          &lt;span class=&quot;text&quot;&gt;&#x968F;&#x673A;&#x64AD;&#x653E;&#x5168;&#x90E8;&lt;/span&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class=&quot;filter&quot; ref=&quot;filter&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class=&quot;bg-layer&quot; ref=&quot;layer&quot;&gt;&lt;/div&gt;
    &lt;scroll :data=&quot;songs&quot; @scroll=&quot;scroll&quot;
            :listen-scroll=&quot;listenScroll&quot; :probe-type=&quot;probeType&quot; class=&quot;list&quot; ref=&quot;list&quot;&gt;
      &lt;div class=&quot;song-list-wrapper&quot;&gt;
        &lt;song-list :songs=&quot;songs&quot; :rank=&quot;rank&quot; @select=&quot;selectItem&quot;&gt;&lt;/song-list&gt;
      &lt;/div&gt;
      &lt;div v-show=&quot;!songs.length&quot; class=&quot;loading-container&quot;&gt;
        &lt;loading&gt;&lt;/loading&gt;
      &lt;/div&gt;
    &lt;/scroll&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script &gt;
  import Scroll from &apos;base/scroll/scroll&apos;
  import Loading from &apos;base/loading/loading&apos;
  import SongList from &apos;base/song-list/song-list&apos;
  import {prefixStyle} from &apos;common/js/dom&apos;
  import {playlistMixin} from &apos;common/js/mixin&apos;
  import {mapActions} from &apos;vuex&apos;

  const RESERVED_HEIGHT = 40
  const transform = prefixStyle(&apos;transform&apos;)
  const backdrop = prefixStyle(&apos;backdrop-filter&apos;)

  export default {
    mixins: [playlistMixin],
    props: {
      bgImage: {
        type: String,
        default: &apos;&apos;
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: &apos;&apos;
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scrollY: 0
      }
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
      this.probeType = 3
      this.listenScroll = true
    },
    mounted() {
      this.imageHeight = this.$refs.bgImage.clientHeight
      this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
      this.$refs.list.$el.style.top = `${this.imageHeight}px`
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length &gt; 0 ? &apos;60px&apos; : &apos;&apos;
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      back() {
        this.$router.back()
      },
      selectItem(item, index) {
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      random() {
        this.randomPlay({
          list: this.songs
        })
      },
      ...mapActions([
        &apos;selectPlay&apos;,
        &apos;randomPlay&apos;
      ])
    },
    watch: {
      scrollY(newVal) {
        let translateY = Math.max(this.minTransalteY, newVal) //&#x6700;&#x8FDC;&#x6EDA;&#x52A8;&#x4F4D;&#x7F6E;
        let scale = 1
        let zIndex = 0
        let blur = 0
        const percent = Math.abs(newVal / this.imageHeight)
        if (newVal &gt; 0) {
          scale = 1 + percent
          zIndex = 10
        } else {
          blur = Math.min(20, percent * 20)
        }

        this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
        this.$refs.filter.style[backdrop] = `blur(${blur}px)`
        if (newVal &lt; this.minTransalteY) {
          zIndex = 10
          this.$refs.bgImage.style.paddingTop = 0
          this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
          this.$refs.playBtn.style.display = &apos;none&apos;
        } else { //&#x8FD8;&#x6CA1;&#x6EDA;&#x52A8;&#x5230;&#x90A3;&#x4E2A;&#x4F4D;&#x7F6E;
          this.$refs.bgImage.style.paddingTop = &apos;70%&apos;
          this.$refs.bgImage.style.height = 0
          this.$refs.playBtn.style.display = &apos;&apos;
        }
        this.$refs.bgImage.style[transform] = `scale(${scale})`
        this.$refs.bgImage.style.zIndex = zIndex
      }
    },
    components: {
      Scroll,
      Loading,
      SongList
    }
  }
&lt;/script&gt;</code></pre><hr><blockquote><code>&#x4E0B;&#x9762;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#x6B4C;&#x624B;&#x8BE6;&#x60C5;&#xFF0C;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;createSong&#x7684;&#x7C7B;&#xFF0C;&#x53EF;&#x5728;&#x6E90;&#x7801;&#x4E2D;&#x67E5;&#x770B;&#x63D0;&#x9AD8;&#x4E86;&#x4EE3;&#x7801;&#x7684;&#x91CD;&#x7528;&#x6027;&#x3001;&#x6269;&#x5C55;&#x6027;&#x56E0;&#x4E3A;&#x662F;&#x9762;&#x5411;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x5F0F;</code></blockquote><pre><code>&lt;template&gt;
  &lt;transition name=&quot;slide&quot;&gt;
    &lt;music-list :title=&quot;title&quot; :bg-image=&quot;bgImage&quot; :songs=&quot;songs&quot;&gt;&lt;/music-list&gt;
  &lt;/transition&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  import MusicList from &apos;components/music-list/music-list&apos;
  import {getSingerDetail} from &apos;api/singer&apos;
  import {ERR_OK} from &apos;api/config&apos;
  import {createSong} from &apos;common/js/song&apos;
  import {mapGetters} from &apos;vuex&apos;

  export default {
    computed: {
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        &apos;singer&apos;
      ])
    },
    data() {
      return {
        songs: []
      }
    },
    created() {
      this._getDetail()
    },
    methods: {
      _getDetail() {
        if (!this.singer.id) {
          this.$router.push(&apos;/singer&apos;)
          return
        }       //&#x5904;&#x7406;&#x8FB9;&#x95F4;&#x7684;&#x4F8B;&#x5B50;
        getSingerDetail(this.singer.id).then((res) =&gt; {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) =&gt; {
          let {musicData} = item
          if (musicData.songid &amp;&amp; musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components: {
      MusicList
    }
  }
&lt;/script&gt;</code></pre><blockquote><code>&#x64AD;&#x653E;&#x5668;&#x5185;&#x7F6E;&#x7EC4;&#x4EF6; player.vue&#xFF0C;&#x901A;&#x8FC7;actions&#x7684;&#x65B9;&#x6CD5;--selectPlay,&#x5728;&#x6B64;&#x7EC4;&#x4EF6;&#x62FF;&#x5230;currentSong&#xFF0C;&#x8FD9;&#x91CC;&#x518D;&#x91CD;&#x70B9;&#x8BF4;&#x4E00;&#x4E0B;mutations&#x548C;&#x5B83;&#x7684;type&#x8981;&#x505A;&#x5230;&#x547D;&#x540D;&#x4E00;&#x81F4;&#xFF0C;nutations&#x672C;&#x8D28;&#x5C31;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;state&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x8981;&#x4FEE;&#x6539;&#x7684;&#x5BF9;&#x8C61;&#x503C;</code></blockquote><p><strong>player&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x5230;&#x4E86;app.vue&#xFF0C;&#x56E0;&#x4E3A;&#x5B83;&#x4E0D;&#x5C5E;&#x4E8E;&#x67D0;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x662F;&#x5168;&#x5C40;&#x7684;&#xFF0C;mapgetters&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x591A;&#x6B21;&#x6279;&#x91CF;&#x4FEE;&#x6539;mutation&#x5C31;&#x8981;&#x7528;&#x5230;actions</strong></p><blockquote><code>&#x91CD;&#x70B9;&#x662F;&#x52A8;&#x753B;&#x7684;&#x8FC7;&#x5EA6;&#x6548;&#x679C;&#xFF0C;&#x7ED3;&#x5408;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5B9E;&#x73B0;&#x98DE;&#x5165;&#x98DE;&#x51FA;&#x52A8;&#x753B;&#xFF0C;&#x7528;&#x5230;&#x4E86;&#x5F00;&#x6E90;&#x52A8;&#x753B;&#x5E93;&#xFF0C;create-key-animation</code></blockquote><p><strong>&#x97F3;&#x4E50;&#x64AD;&#x653E;&#x4E8B;&#x4EF6;togglePlaying&#xFF0C;&#x56E0;&#x4E3A;&#x64AD;&#x653E;&#x7684;&#x6682;&#x505C;&#x5F00;&#x59CB;&#x8981;&#x8C03;&#x7528;audio&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x51FA;&#x73B0;&#x62FF;&#x4E0D;&#x5230;&#x5143;&#x7D20;&#x62A5;&#x9519;&#xFF0C;&#x8FD9;&#x662F;&#x7528;&#x5230;&#x4E86;nextTic&#x5EF6;&#x65F6;&#x51FD;&#x6570;&#xFF0C;&#x6DFB;&#x52A0;class&#x53EF;&#x4EE5;&#x7528;&#x5230;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x6B4C;&#x66F2;&#x7684;&#x524D;&#x8FDB;&#x540E;&#x9000;&#x901A;&#x8FC7;currentIndex&#xFF0C;&#x6709;&#x4E00;&#x4E2A;&#x5C0F;&#x95EE;&#x9898;&#xFF0C;&#x6682;&#x505C;&#x540E;&#x5207;&#x6362;&#x5230;&#x4E0B;&#x4E00;&#x9996;&#x6B4C;&#x8981;&#x81EA;&#x52A8;&#x64AD;&#x653E;&#xFF0C;&#x5FEB;&#x901F;&#x70B9;&#x51FB;&#x7684;&#x65F6;&#x5019;&#x7ED3;&#x5408; ready err&#x65B9;&#x6CD5;&#x907F;&#x514D;&#x5FEB;&#x901F;&#x70B9;&#x51FB;&#x9875;&#x9762;&#x62A5;&#x9519;</strong></p><blockquote><code>&#x6761;&#x5F62;&#x8FDB;&#x5EA6;&#x6761;&#xFF0C;&#x901A;&#x8FC7;audio&#x83B7;&#x53D6;&#x53EF;&#x4EE5;&#x8BFB;&#x5199;&#x7684;&#x5F53;&#x524D;&#x64AD;&#x653E;&#x65F6;&#x95F4;&#xFF0C;&#x5C06;&#x5176;&#x65F6;&#x95F4;&#x6233;&#x8F6C;&#x4E3A;&#x65F6;&#x5206;&#x79D2;&#x683C;&#x5F0F;&#xFF0C;&#x901A;&#x8FC7;_pad&#x7ED9;&#x79D2;&#x4F4D;&#x524D;&#x8865;&#x96F6;&#xFF0C;&#x505A;&#x5230;&#x4E0E;&#x8BBE;&#x8BA1;&#x56FE;&#x4E00;&#x81F4;&#xFF0C;&#x5B9A;&#x4E49;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;progress-bar&#xFF0C;&#x4E8B;&#x4EF6;&#x62D6;&#x52A8;&#x548C;&#x70B9;&#x51FB;&#x6EDA;&#x52A8;&#x6761;&#x7684;&#x4EA4;&#x4E92;&#x5B9E;&#x73B0;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x62D6;&#x52A8;&#x65E0;&#x975E;&#x5C31;&#x662F;&#x4E09;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;start move end&#xFF0C;&#x62D6;&#x52A8;&#x5F00;&#x59CB;&#x524D;&#x52A0;&#x4E00;&#x4E2A;&#x5F00;&#x5173;&#x8868;&#x793A;&#x521D;&#x59CB;&#x5316;&#x5B8C;&#x6210;&#xFF0C;&#x5982;&#x679C;&#x62D6;&#x52A8;&#x524D;&#x662F;&#x6682;&#x505C;&#x72B6;&#x6001;&#xFF0C;&#x62D6;&#x52A8;&#x540E;&#x518D;&#x8BA9;&#x5176;&#x64AD;&#x653E;</code></blockquote><p><strong>&#x5706;&#x5F62;&#x8FDB;&#x5EA6;&#x6761;&#xFF0C;&#x7528;&#x5230;&#x4E86;SVG&#x518D;&#x901A;&#x8FC7;&#x4E24;&#x4E2A;circle&#x5B9E;&#x73B0;&#xFF0C;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x5E94;&#x7528;&#x5230;&#x5B9E;&#x9645;&#x5DE5;&#x4F5C;&#x4E2D;</strong></p><blockquote><code>&#x64AD;&#x653E;&#x6A21;&#x5F0F;&#xFF0C;&#x7528;&#x5230;util&#x91CC;&#x9762;&#x7684;shuttle&#x51FD;&#x6570;&#x628A;&#x6570;&#x7EC4;&#x6253;&#x4E71;&#xFF0C;&#x7528;&#x5230;es6&#x7684;findindex&#x51FD;&#x6570;&#xFF0C;&#x7531;&#x4E8E;&#x8981;&#x5B9E;&#x65F6;&#x6539;&#x53D8;currentSong&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#x6240;&#x4EE5;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x5224;&#x65AD;&#xFF0C;&#x5982;&#x679C;id&#x76F8;&#x540C;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x9519;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x8FD8;&#x6CA1;&#x89E6;&#x53D1;&#x4E8B;&#x4EF6;</code></blockquote><pre><code>&lt;template&gt;
  &lt;div class=&quot;progress-bar&quot; ref=&quot;progressBar&quot; @click=&quot;progressClick&quot;&gt;
    &lt;div class=&quot;bar-inner&quot;&gt;
      &lt;div class=&quot;progress&quot; ref=&quot;progress&quot;&gt;&lt;/div&gt;
      &lt;div class=&quot;progress-btn-wrapper&quot; ref=&quot;progressBtn&quot;
           @touchstart.prevent=&quot;progressTouchStart&quot;
           @touchmove.prevent=&quot;progressTouchMove&quot;
           @touchend=&quot;progressTouchEnd&quot;
      &gt;
        &lt;div class=&quot;progress-btn&quot;&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import {prefixStyle} from &apos;common/js/dom&apos;

  const progressBtnWidth = 16
  const transform = prefixStyle(&apos;transform&apos;)

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.touch = {}
    },
    methods: {
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX))
        this._offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        // &#x8FD9;&#x91CC;&#x5F53;&#x6211;&#x4EEC;&#x70B9;&#x51FB; progressBtn &#x7684;&#x65F6;&#x5019;&#xFF0C;e.offsetX &#x83B7;&#x53D6;&#x4E0D;&#x5BF9;
        // this._offset(e.offsetX)
        this._triggerPercent()
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$emit(&apos;percentChange&apos;, percent)
      },
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
      }
    },
    watch: {
      percent(newPercent) {
        if (newPercent &gt;= 0 &amp;&amp; !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
          const offsetWidth = newPercent * barWidth
          this._offset(offsetWidth)
        }
      }
    }
  }
&lt;/script&gt;

&lt;style scoped lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;&gt;
  @import &quot;~common/stylus/variable&quot;

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
&lt;/style&gt;</code></pre><pre><code>&lt;template&gt;
  &lt;div class=&quot;progress-circle&quot;&gt;
    &lt;svg :width=&quot;radius&quot; :height=&quot;radius&quot; viewBox=&quot;0 0 100 100&quot; version=&quot;1.1&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;&gt;
      &lt;circle class=&quot;progress-background&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot;/&gt;
      &lt;circle class=&quot;progress-bar&quot; r=&quot;50&quot; cx=&quot;50&quot; cy=&quot;50&quot; fill=&quot;transparent&quot; :stroke-dasharray=&quot;dashArray&quot;
              :stroke-dashoffset=&quot;dashOffset&quot;/&gt;
    &lt;/svg&gt;
    &lt;slot&gt;&lt;/slot&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;text/ecmascript-6&quot;&gt;
  export default {
    props: {
      radius: {
        type: Number,
        default: 100
      },
      percent: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        dashArray: Math.PI * 100
      }
    },
    computed: {
      dashOffset() {
        return (1 - this.percent) * this.dashArray
      }
    }
  }
&lt;/script&gt;

&lt;style scoped lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;&gt;
  @import &quot;~common/stylus/variable&quot;

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &amp;.progress-background
        transform: scale(0.9)
        stroke: $color-theme-d
      &amp;.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-theme
&lt;/style&gt;</code></pre><pre><code>&lt;template&gt;
  &lt;div class=&quot;player&quot; v-show=&quot;playlist.length&gt;0&quot;&gt;
    &lt;transition name=&quot;normal&quot;
                @enter=&quot;enter&quot;
                @after-enter=&quot;afterEnter&quot;
                @leave=&quot;leave&quot;
                @after-leave=&quot;afterLeave&quot;
    &gt;
      &lt;div class=&quot;normal-player&quot; v-show=&quot;fullScreen&quot;&gt;
        &lt;div class=&quot;background&quot;&gt;
          &lt;img width=&quot;100%&quot; height=&quot;100%&quot; :src=&quot;currentSong.image&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;top&quot;&gt;
          &lt;div class=&quot;back&quot; @click=&quot;back&quot;&gt;
            &lt;i class=&quot;icon-back&quot;&gt;&lt;/i&gt;
          &lt;/div&gt;
          &lt;h1 class=&quot;title&quot; v-html=&quot;currentSong.name&quot;&gt;&lt;/h1&gt;
          &lt;h2 class=&quot;subtitle&quot; v-html=&quot;currentSong.singer&quot;&gt;&lt;/h2&gt;
        &lt;/div&gt;
        &lt;div class=&quot;middle&quot;
             @touchstart.prevent=&quot;middleTouchStart&quot;
             @touchmove.prevent=&quot;middleTouchMove&quot;
             @touchend=&quot;middleTouchEnd&quot;
        &gt;
          &lt;div class=&quot;middle-l&quot; ref=&quot;middleL&quot;&gt;
            &lt;div class=&quot;cd-wrapper&quot; ref=&quot;cdWrapper&quot;&gt;
              &lt;div class=&quot;cd&quot; :class=&quot;cdCls&quot;&gt;
                &lt;img class=&quot;image&quot; :src=&quot;currentSong.image&quot;&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div class=&quot;playing-lyric-wrapper&quot;&gt;
              &lt;div class=&quot;playing-lyric&quot;&gt;{{playingLyric}}&lt;/div&gt;
            &lt;/div&gt;
          &lt;/div&gt;
          &lt;scroll class=&quot;middle-r&quot; ref=&quot;lyricList&quot; :data=&quot;currentLyric &amp;&amp; currentLyric.lines&quot;&gt;
            &lt;div class=&quot;lyric-wrapper&quot;&gt;
              &lt;div v-if=&quot;currentLyric&quot;&gt;
                &lt;p ref=&quot;lyricLine&quot;
                   class=&quot;text&quot;
                   :class=&quot;{&apos;current&apos;: currentLineNum ===index}&quot;
                   v-for=&quot;(line,index) in currentLyric.lines&quot;&gt;{{line.txt}}&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/scroll&gt;
        &lt;/div&gt;
        &lt;div class=&quot;bottom&quot;&gt;
          &lt;div class=&quot;dot-wrapper&quot;&gt;
            &lt;span class=&quot;dot&quot; :class=&quot;{&apos;active&apos;:currentShow===&apos;cd&apos;}&quot;&gt;&lt;/span&gt;
            &lt;span class=&quot;dot&quot; :class=&quot;{&apos;active&apos;:currentShow===&apos;lyric&apos;}&quot;&gt;&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class=&quot;progress-wrapper&quot;&gt;
            &lt;span class=&quot;time time-l&quot;&gt;{{format(currentTime)}}&lt;/span&gt;
            &lt;div class=&quot;progress-bar-wrapper&quot;&gt;
              &lt;progress-bar :percent=&quot;percent&quot; @percentChange=&quot;onProgressBarChange&quot;&gt;&lt;/progress-bar&gt;
            &lt;/div&gt;
            &lt;span class=&quot;time time-r&quot;&gt;{{format(currentSong.duration)}}&lt;/span&gt;
          &lt;/div&gt;
          &lt;div class=&quot;operators&quot;&gt;
            &lt;div class=&quot;icon i-left&quot; @click=&quot;changeMode&quot;&gt;
              &lt;i :class=&quot;iconMode&quot;&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;div class=&quot;icon i-left&quot; :class=&quot;disableCls&quot;&gt;
              &lt;i @click=&quot;prev&quot; class=&quot;icon-prev&quot;&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;div class=&quot;icon i-center&quot; :class=&quot;disableCls&quot;&gt;
              &lt;i @click=&quot;togglePlaying&quot; :class=&quot;playIcon&quot;&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;div class=&quot;icon i-right&quot; :class=&quot;disableCls&quot;&gt;
              &lt;i @click=&quot;next&quot; class=&quot;icon-next&quot;&gt;&lt;/i&gt;
            &lt;/div&gt;
            &lt;div class=&quot;icon i-right&quot;&gt;
              &lt;i @click=&quot;toggleFavorite(currentSong)&quot; class=&quot;icon&quot; :class=&quot;getFavoriteIcon(currentSong)&quot;&gt;&lt;/i&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/transition&gt;
    &lt;transition name=&quot;mini&quot;&gt;
      &lt;div class=&quot;mini-player&quot; v-show=&quot;!fullScreen&quot; @click=&quot;open&quot;&gt;
        &lt;div class=&quot;icon&quot;&gt;
          &lt;img :class=&quot;cdCls&quot; width=&quot;40&quot; height=&quot;40&quot; :src=&quot;currentSong.image&quot;&gt;
        &lt;/div&gt;
        &lt;div class=&quot;text&quot;&gt;
          &lt;h2 class=&quot;name&quot; v-html=&quot;currentSong.name&quot;&gt;&lt;/h2&gt;
          &lt;p class=&quot;desc&quot; v-html=&quot;currentSong.singer&quot;&gt;&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class=&quot;control&quot;&gt;
          &lt;progress-circle :radius=&quot;radius&quot; :percent=&quot;percent&quot;&gt;
            &lt;i @click.stop=&quot;togglePlaying&quot; class=&quot;icon-mini&quot; :class=&quot;miniIcon&quot;&gt;&lt;/i&gt;
          &lt;/progress-circle&gt;
        &lt;/div&gt;
        &lt;div class=&quot;control&quot; @click.stop=&quot;showPlaylist&quot;&gt;
          &lt;i class=&quot;icon-playlist&quot;&gt;&lt;/i&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/transition&gt;
    &lt;playlist ref=&quot;playlist&quot;&gt;&lt;/playlist&gt;
    &lt;audio ref=&quot;audio&quot; :src=&quot;currentSong.url&quot; @play=&quot;ready&quot; @error=&quot;error&quot; @timeupdate=&quot;updateTime&quot;
           @ended=&quot;end&quot;&gt;&lt;/audio&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script type=&quot;&quot;&gt;
  import {mapGetters, mapMutations, mapActions} from &apos;vuex&apos;
  import animations from &apos;create-keyframe-animation&apos;
  import {prefixStyle} from &apos;common/js/dom&apos;
  import ProgressBar from &apos;base/progress-bar/progress-bar&apos;
  import ProgressCircle from &apos;base/progress-circle/progress-circle&apos;
  import {playMode} from &apos;common/js/config&apos;
  import Lyric from &apos;lyric-parser&apos;
  import Scroll from &apos;base/scroll/scroll&apos;
  import {playerMixin} from &apos;common/js/mixin&apos;
  import Playlist from &apos;components/playlist/playlist&apos;

  const transform = prefixStyle(&apos;transform&apos;)
  const transitionDuration = prefixStyle(&apos;transitionDuration&apos;)

  export default {
    mixins: [playerMixin],
    data() {
      return {
        songReady: false,
        currentTime: 0,
        radius: 32,
        currentLyric: null,
        currentLineNum: 0,
        currentShow: &apos;cd&apos;,
        playingLyric: &apos;&apos;
      }
    },
    computed: {
      cdCls() {
        return this.playing ? &apos;play&apos; : &apos;play pause&apos;
      },
      playIcon() {
        return this.playing ? &apos;icon-pause&apos; : &apos;icon-play&apos;
      },
      miniIcon() {
        return this.playing ? &apos;icon-pause-mini&apos; : &apos;icon-play-mini&apos;
      },
      disableCls() {
        return this.songReady ? &apos;&apos; : &apos;disable&apos;
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        &apos;currentIndex&apos;,
        &apos;fullScreen&apos;,
        &apos;playing&apos;
      ])
    },
    created() {
      this.touch = {}
    },
    methods: {
      back() {
        this.setFullScreen(false)
      },
      open() {
        this.setFullScreen(true)
      },
      enter(el, done) {
        const {x, y, scale} = this._getPosAndScale()

        let animation = {
          0: {
            transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
          },
          60: {
            transform: `translate3d(0,0,0) scale(1.1)`
          },
          100: {
            transform: `translate3d(0,0,0) scale(1)`
          }
        }

        animations.registerAnimation({
          name: &apos;move&apos;,
          animation,
          presets: {
            duration: 400,
            easing: &apos;linear&apos;
          }
        })

        animations.runAnimation(this.$refs.cdWrapper, &apos;move&apos;, done)
      },
      afterEnter() {
        animations.unregisterAnimation(&apos;move&apos;)
        this.$refs.cdWrapper.style.animation = &apos;&apos;
      },
      leave(el, done) {
        this.$refs.cdWrapper.style.transition = &apos;all 0.4s&apos;
        const {x, y, scale} = this._getPosAndScale()
        this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
        this.$refs.cdWrapper.addEventListener(&apos;transitionend&apos;, done)
      },
      afterLeave() {
        this.$refs.cdWrapper.style.transition = &apos;&apos;
        this.$refs.cdWrapper.style[transform] = &apos;&apos;
      },
      togglePlaying() {
        if (!this.songReady) {
          return
        }
        this.setPlayingState(!this.playing)
        if (this.currentLyric) {
          this.currentLyric.togglePlay()
        }
      },
      end() {
        if (this.mode === playMode.loop) {
          this.loop()
        } else {
          this.next()
        }
      },
      loop() {
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
        this.setPlayingState(true)
        if (this.currentLyric) {
          this.currentLyric.seek(0)
        }
      },
      next() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      prev() {
        if (!this.songReady) {
          return
        }
        if (this.playlist.length === 1) {
          this.loop()
          return
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)
          if (!this.playing) {
            this.togglePlaying()
          }
        }
        this.songReady = false
      },
      ready() {
        this.songReady = true
        this.savePlayHistory(this.currentSong)
      },
      error() {
        this.songReady = true
      },
      updateTime(e) {
        this.currentTime = e.target.currentTime
      },
      format(interval) {
        interval = interval | 0
        const minute = interval / 60 | 0
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      onProgressBarChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (!this.playing) {
          this.togglePlaying()
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000)
        }
      },
      getLyric() {
        this.currentSong.getLyric().then((lyric) =&gt; {
          if (this.currentSong.lyric !== lyric) {
            return
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric)
          if (this.playing) {
            this.currentLyric.play()
          }
        }).catch(() =&gt; {
          this.currentLyric = null
          this.playingLyric = &apos;&apos;
          this.currentLineNum = 0
        })
      },
      handleLyric({lineNum, txt}) {
        this.currentLineNum = lineNum
        if (lineNum &gt; 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
      },
      showPlaylist() {
        this.$refs.playlist.show()
      },
      middleTouchStart(e) {
        this.touch.initiated = true
        // &#x7528;&#x6765;&#x5224;&#x65AD;&#x662F;&#x5426;&#x662F;&#x4E00;&#x6B21;&#x79FB;&#x52A8;
        this.touch.moved = false
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      middleTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const touch = e.touches[0]
        const deltaX = touch.pageX - this.touch.startX
        const deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaY) &gt; Math.abs(deltaX)) {
          return
        }
        if (!this.touch.moved) {
          this.touch.moved = true
        }
        const left = this.currentShow === &apos;cd&apos; ? 0 : -window.innerWidth
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = 0
        this.$refs.middleL.style.opacity = 1 - this.touch.percent
        this.$refs.middleL.style[transitionDuration] = 0
      },
      middleTouchEnd() {
        if (!this.touch.moved) {
          return
        }
        let offsetWidth
        let opacity
        if (this.currentShow === &apos;cd&apos;) {
          if (this.touch.percent &gt; 0.1) {
            offsetWidth = -window.innerWidth
            opacity = 0
            this.currentShow = &apos;lyric&apos;
          } else {
            offsetWidth = 0
            opacity = 1
          }
        } else {
          if (this.touch.percent &lt; 0.9) {
            offsetWidth = 0
            this.currentShow = &apos;cd&apos;
            opacity = 1
          } else {
            offsetWidth = -window.innerWidth
            opacity = 0
          }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
      },
      _pad(num, n = 2) {
        let len = num.toString().length
        while (len &lt; n) {
          num = &apos;0&apos; + num
          len++
        }
        return num
      },
      _getPosAndScale() {
        const targetWidth = 40
        const paddingLeft = 40
        const paddingBottom = 30
        const paddingTop = 80
        const width = window.innerWidth * 0.8
        const scale = targetWidth / width
        const x = -(window.innerWidth / 2 - paddingLeft)
        const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
        return {
          x,
          y,
          scale
        }
      },
      ...mapMutations({
        setFullScreen: &apos;SET_FULL_SCREEN&apos;
      }),
      ...mapActions([
        &apos;savePlayHistory&apos;
      ])
    },
    watch: {
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong.id === oldSong.id) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop()
          this.currentTime = 0
          this.playingLyric = &apos;&apos;
          this.currentLineNum = 0
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() =&gt; {
          this.$refs.audio.play()
          this.getLyric()
        }, 1000)
      },
      playing(newPlaying) {
        const audio = this.$refs.audio
        this.$nextTick(() =&gt; {
          newPlaying ? audio.play() : audio.pause()
        })
      },
      fullScreen(newVal) {
        if (newVal) {
          setTimeout(() =&gt; {
            this.$refs.lyricList.refresh()
          }, 20)
        }
      }
    },
    components: {
      ProgressBar,
      ProgressCircle,
      Scroll,
      Playlist
    }
  }
&lt;/script&gt;

&lt;style scoped lang=&quot;stylus&quot; rel=&quot;stylesheet/stylus&quot;&gt;
  @import &quot;~common/stylus/variable&quot;
  @import &quot;~common/stylus/mixin&quot;

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &amp;.play
                animation: rotate 20s linear infinite
              &amp;.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &amp;.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &amp;.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &amp;.time-l
              text-align: left
            &amp;.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &amp;.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &amp;.normal-enter-active, &amp;.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &amp;.normal-enter, &amp;.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &amp;.mini-enter-active, &amp;.mini-leave-active
        transition: all 0.4s
      &amp;.mini-enter, &amp;.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &amp;.play
            animation: rotate 10s linear infinite
          &amp;.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
&lt;/style&gt;</code></pre>
{% endraw %}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vuejs2.0 高级实战 全网稀缺 独立开发专属音乐WebAPP 更新中。。。

## 原文链接
[https://segmentfault.com/a/1190000016137164](https://segmentfault.com/a/1190000016137164)

