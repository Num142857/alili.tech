---
title: '用VUEJS做一个网易云音乐' 
date: 2019-01-26 2:30:18
hidden: true
slug: v7qi4yk0lqr
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>前言：自己学习VUEJS也一段时间，但一直没有做出来一东西。我自己一直喜欢用网易云音乐app，于是乎就做了这个app。</p></blockquote>
<h2 id="articleHeader0">技术栈</h2>
<ul>
<li><p>vue全家桶 （vue vue-router vuex）</p></li>
<li><p>axios</p></li>
<li><p>Muse-UI(一个基于Vue2.x的material design 风格UI框架)</p></li>
</ul>
<h2 id="articleHeader1">功能与思路分析</h2>
<p>我之前学习JS的时候对Html5 audio研究过，也写过一些例子，那时的功能并不是很全面。在写这个程序之前，我好好的查阅了当前的HTML5中的audio标签，发现园子上一位园友总结的很不错（<a href="http://www.cnblogs.com/tianma3798/p/6033108.html" rel="nofollow noreferrer" target="_blank">这里</a>）。于是就先把网易云音乐最基本的功能实现，歌单部分（这也是我喜欢网易云音乐的原因这一），然后实现音乐的上一曲、下一曲，播放、暂停。列表功能。</p>
<h3 id="articleHeader2">后台</h3>
<p>后台采用.net做为后台提供系统请求所用的API(<a href="https://github.com/javaSwing/MusicAPI" rel="nofollow noreferrer" target="_blank">源码</a>)，原理很简单就是用.net伪装成一个客户端去访问网易云音乐的API然后，把返回的json数据转发出来。同时服务端做下跨域处理。</p>
<p>核心代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/// <summary>
/// 请求网易云音乐接口
/// </summary>
/// <typeparam name=&quot;T&quot;>要请求的接口类型</typeparam>
/// <param name=&quot;config&quot;>要请求的接口类型的对象</param>
/// <returns>请求结果(JSON)</returns>
public static string Request<T>(T config) where T : RequestData, new()
{
    // 请求URL
    string requestURL = config.Url;
    // 将数据包对象转换成QueryString形式的字符串
    string @params = config.FormData.ParseQueryString();
    bool isPost = config.Method.Equals(&quot;post&quot;, StringComparison.CurrentCultureIgnoreCase);

    if (!isPost)
    {
        // get方式 拼接请求url
        string sep = requestURL.Contains('?') ? &quot;&amp;&quot; : &quot;?&quot;;
        requestURL += sep + @params;
    }

    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(requestURL);
    req.Accept = &quot;*/*&quot;;
    req.Headers.Add(&quot;Accept-Language&quot;, &quot;zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4&quot;);
    // 如果服务端启用了GZIP，那么下面必须解压，否则一直乱码。
    // 参见：http://www.crifan.com/set_accept_encoding_header_to_gzip_deflate_return_messy_code/
    req.Headers.Add(&quot;Accept-Encoding&quot;, &quot;gzip,deflate,sdch&quot;);
    req.ContentType = &quot;application/x-www-form-urlencoded&quot;;
    req.KeepAlive = true;
    req.Host = &quot;music.163.com&quot;;
    req.Referer = &quot;http://music.163.com/search/&quot;;
    req.UserAgent = &quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537&quot;;            
    // 设置cookies
    req.Headers[&quot;Cookie&quot;] = &quot;appver=1.5.2&quot;;
    req.Method = config.Method;
    req.AutomaticDecompression = DecompressionMethods.GZip;
    if (isPost)
    {
        // 写入post请求包
        byte[] formData = Encoding.UTF8.GetBytes(@params);
        // 设置HTTP请求头  参考：https://github.com/darknessomi/musicbox/blob/master/NEMbox/api.py          
        req.GetRequestStream().Write(formData, 0, formData.Length);
    }            
    // 发送http请求 并读取响应内容返回
    return new StreamReader(req.GetResponse().GetResponseStream(), Encoding.GetEncoding(&quot;UTF-8&quot;)).ReadToEnd();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment"><span class="hljs-doctag">///</span> <span class="hljs-doctag">&lt;summary&gt;</span></span>
<span class="hljs-comment"><span class="hljs-doctag">///</span> 请求网易云音乐接口</span>
<span class="hljs-comment"><span class="hljs-doctag">///</span> <span class="hljs-doctag">&lt;/summary&gt;</span></span>
<span class="hljs-comment"><span class="hljs-doctag">///</span> <span class="hljs-doctag">&lt;typeparam name="T"&gt;</span>要请求的接口类型<span class="hljs-doctag">&lt;/typeparam&gt;</span></span>
<span class="hljs-comment"><span class="hljs-doctag">///</span> <span class="hljs-doctag">&lt;param name="config"&gt;</span>要请求的接口类型的对象<span class="hljs-doctag">&lt;/param&gt;</span></span>
<span class="hljs-comment"><span class="hljs-doctag">///</span> <span class="hljs-doctag">&lt;returns&gt;</span>请求结果(JSON)<span class="hljs-doctag">&lt;/returns&gt;</span></span>
<span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">string</span> Request&lt;T&gt;(T config) <span class="hljs-keyword">where</span> T : RequestData, <span class="hljs-keyword">new</span>()
{
    <span class="hljs-comment">// 请求URL</span>
    <span class="hljs-keyword">string</span> requestURL = config.Url;
    <span class="hljs-comment">// 将数据包对象转换成QueryString形式的字符串</span>
    <span class="hljs-keyword">string</span> @<span class="hljs-keyword">params</span> = config.FormData.ParseQueryString();
    <span class="hljs-keyword">bool</span> isPost = config.Method.Equals(<span class="hljs-string">"post"</span>, StringComparison.CurrentCultureIgnoreCase);

    <span class="hljs-keyword">if</span> (!isPost)
    {
        <span class="hljs-comment">// get方式 拼接请求url</span>
        <span class="hljs-keyword">string</span> sep = requestURL.Contains(<span class="hljs-string">'?'</span>) ? <span class="hljs-string">"&amp;"</span> : <span class="hljs-string">"?"</span>;
        requestURL += sep + @<span class="hljs-keyword">params</span>;
    }

    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(requestURL);
    req.Accept = <span class="hljs-string">"*/*"</span>;
    req.Headers.Add(<span class="hljs-string">"Accept-Language"</span>, <span class="hljs-string">"zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4"</span>);
    <span class="hljs-comment">// 如果服务端启用了GZIP，那么下面必须解压，否则一直乱码。</span>
    <span class="hljs-comment">// 参见：http://www.crifan.com/set_accept_encoding_header_to_gzip_deflate_return_messy_code/</span>
    req.Headers.Add(<span class="hljs-string">"Accept-Encoding"</span>, <span class="hljs-string">"gzip,deflate,sdch"</span>);
    req.ContentType = <span class="hljs-string">"application/x-www-form-urlencoded"</span>;
    req.KeepAlive = <span class="hljs-literal">true</span>;
    req.Host = <span class="hljs-string">"music.163.com"</span>;
    req.Referer = <span class="hljs-string">"http://music.163.com/search/"</span>;
    req.UserAgent = <span class="hljs-string">"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.152 Safari/537"</span>;            
    <span class="hljs-comment">// 设置cookies</span>
    req.Headers[<span class="hljs-string">"Cookie"</span>] = <span class="hljs-string">"appver=1.5.2"</span>;
    req.Method = config.Method;
    req.AutomaticDecompression = DecompressionMethods.GZip;
    <span class="hljs-keyword">if</span> (isPost)
    {
        <span class="hljs-comment">// 写入post请求包</span>
        <span class="hljs-keyword">byte</span>[] formData = Encoding.UTF8.GetBytes(@<span class="hljs-keyword">params</span>);
        <span class="hljs-comment">// 设置HTTP请求头  参考：https://github.com/darknessomi/musicbox/blob/master/NEMbox/api.py          </span>
        req.GetRequestStream().Write(formData, <span class="hljs-number">0</span>, formData.Length);
    }            
    <span class="hljs-comment">// 发送http请求 并读取响应内容返回</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> StreamReader(req.GetResponse().GetResponseStream(), Encoding.GetEncoding(<span class="hljs-string">"UTF-8"</span>)).ReadToEnd();
}</code></pre>
<h2 id="articleHeader3">vuejs部分</h2>
<p>项目结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── playBar.vue
│   └── ...
└── store
│    └── index.js        # 整个项目的vuex部分
└── router
│   └── router.js        # 整个项目的路由
└── utils                # 一些工具类模块
│
└── views                # 项目中的一些route-view" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="shell">├── index.html
├── main.<span class="hljs-keyword">js
</span>├── api
│   └── ... <span class="hljs-comment"># 抽取出API请求</span>
├── components
│   ├── playBar.vue
│   └── ...
└── store
│    └── index.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># 整个项目的vuex部分</span>
└── router
│   └── router.<span class="hljs-keyword">js </span>       <span class="hljs-comment"># 整个项目的路由</span>
└── utils                <span class="hljs-comment"># 一些工具类模块</span>
│
└── views                <span class="hljs-comment"># 项目中的一些route-view</span></code></pre>
<blockquote><p>说项目的路由之前，先来看一张效果图</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008370591?w=331&amp;h=576" src="https://static.alili.tech/img/remote/1460000008370591?w=331&amp;h=576" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>对于整个项目来说：视图区别在于顶部导航，下面的bar的是否出来取决于，当前系统列表中是否有歌曲，如果有就会出现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008370592?w=502&amp;h=641" src="https://static.alili.tech/img/remote/1460000008370592?w=502&amp;h=641" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>router.js核心部分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/index',
    component: require('../views/index'),
    children: [
      {
        path: 'rage',
        component: require('../views/rage')
      },
      {
        path: 'songList',
        component: require('../views/songList')
      },
      {
        path: 'leaderBoard',
        component: require('../views/leaderBoard')
      },
      {
        path: 'hotSinger',
        component: require('../views/hotSinger')
      }
    ]
  }, {
    name: 'playerDetail',
    path: '/playerDetail/:id',
    component: require('../views/playerDetail')
  }, {
    path: '/playListDetail/:id',
    name: 'playListDetail',
    component: require('../views/playListDetail')
  }, {
    path: '*', redirect: '/index/rage'
  }],
  // 让每个页面都滚动到顶部，改变模式为mode: history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
  <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
  <span class="hljs-attr">routes</span>: [{
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/index'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/index'</span>),
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'rage'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/rage'</span>)
      },
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'songList'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/songList'</span>)
      },
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'leaderBoard'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/leaderBoard'</span>)
      },
      {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'hotSinger'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/hotSinger'</span>)
      }
    ]
  }, {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'playerDetail'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/playerDetail/:id'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/playerDetail'</span>)
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/playListDetail/:id'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'playListDetail'</span>,
    <span class="hljs-attr">component</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'../views/playListDetail'</span>)
  }, {
    <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>, <span class="hljs-attr">redirect</span>: <span class="hljs-string">'/index/rage'</span>
  }],
  <span class="hljs-comment">// 让每个页面都滚动到顶部，改变模式为mode: history</span>
  scrollBehavior (to, <span class="hljs-keyword">from</span>, savedPosition) {
    <span class="hljs-keyword">if</span> (savedPosition) {
      <span class="hljs-keyword">return</span> savedPosition
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }
    }
  }
})</code></pre>
<p>vuex部分</p>
<p>这部分，主要是歌曲这一块，因为不同的页面有不同的使用到了歌曲信息，把把这部分数据放到vuex中做统一的数据处理！<br>sotre/index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    audio: {
      'id': 0,
      'name': '歌曲名称',
      'singer': '演唱者',
      'albumPic': '/static/player-bar.png',
      'location': '',
      'album': ''
    },
    lyric: '正在加载中。。',
    currentIndex: 0, // 当前播放的歌曲位置
    playing: false, // 是否正在播放
    loading: false, // 是否正在加载中
    showDetail: false,
    songList: [],    // 播放列表
    currentTime: 0,
    tmpCurrentTime: 0,
    durationTime: 0,
    bufferedTime: 0,
    change: false   // 判断是更改的时间还是播放的时间
  },
  getters: {
    audio: state => state.audio,
    playing: state => state.playing,
    loading: state => state.loading,
    showDetail: state => state.showDetail,
    durationTime: state => state.durationTime,
    currentIndex: state => state.currentIndex,
    bufferedTime: state => state.bufferedTime,
    tmpCurrentTime: state => state.tmpCurrentTime,
    songList: state => state.songList,
    change: state => state.change,
    currentTime: state => state.currentTime,
    prCurrentTime: state => {
      return state.currentTime / state.durationTime * 100
    },
    prBufferedTime: state => {
      return state.bufferedTime / state.durationTime * 100
    }
  },
  mutations: {
    play (state) {
      state.playing = true
    },
    pause (state) {
      state.playing = false
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - 1]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + 1
    },
    removeAudio (state, index) {
      state.songList.splice(index, 1)
      state.audio = state.songList[index - 1]
      state.currentIndex = state.currentIndex - 1
      if (state.songList.length === 0) {
        state.audio = {
          'id': 0,
          'name': '歌曲名称',
          'singer': '演唱者',
          'albumPic': '/static/player-bar.png',
          'location': '',
          'album': ''
        }
        state.playing = false
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = true
    },
    closeLoading (state) {
      state.loading = false
    },
    resetAudio (state) {
      state.currentTime = 0
    },
    playNext (state) { // 播放下一曲
      state.currentIndex++
      if (state.currentIndex > state.songList.length) {
        state.currentIndex = 1
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    playPrev (state) { // 播放上一曲
      state.currentIndex--
      if (state.currentIndex < 1) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - 1]
    },
    addToList (state, item) {
      var flag = false
      state.songList.forEach(function (element, index) { // 检测歌曲重复
        if (element.id === item.id) {
          flag = true
          state.currentIndex = index + 1
        }
      })
      if (!flag) {
        state.songList.push(item)
        state.currentIndex = state.songList.length
      }
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  // 异步的数据操作
  actions: {
    getSong ({commit, state}, id) {
      commit('openLoading')
      Axios.get(api.getSong(id)).then(res => {
        // 统一数据模型，方便后台接口的改变
        var url = res.data.data[0].url
        commit('setAudio')
        commit('setLocation', url)
      })
    },
    getLrc ({commit, state}, id) {
      commit('setLrc', '[txt](加载中。。。')
      Axios.get(api.getLrc(id)).then(res => {
        // 1、先判断是否有歌词
        if (res.data.nolyric) {
          commit('setLrc', '[txt](⊙０⊙) 暂无歌词')
        } else {
          console.log(res.data.lrc.lyric)
          commit('setLrc', res.data.lrc.lyric)
        }
      })
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">state</span>: {
    <span class="hljs-attr">audio</span>: {
      <span class="hljs-string">'id'</span>: <span class="hljs-number">0</span>,
      <span class="hljs-string">'name'</span>: <span class="hljs-string">'歌曲名称'</span>,
      <span class="hljs-string">'singer'</span>: <span class="hljs-string">'演唱者'</span>,
      <span class="hljs-string">'albumPic'</span>: <span class="hljs-string">'/static/player-bar.png'</span>,
      <span class="hljs-string">'location'</span>: <span class="hljs-string">''</span>,
      <span class="hljs-string">'album'</span>: <span class="hljs-string">''</span>
    },
    <span class="hljs-attr">lyric</span>: <span class="hljs-string">'正在加载中。。'</span>,
    <span class="hljs-attr">currentIndex</span>: <span class="hljs-number">0</span>, <span class="hljs-comment">// 当前播放的歌曲位置</span>
    playing: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否正在播放</span>
    loading: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否正在加载中</span>
    showDetail: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">songList</span>: [],    <span class="hljs-comment">// 播放列表</span>
    currentTime: <span class="hljs-number">0</span>,
    <span class="hljs-attr">tmpCurrentTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">durationTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">bufferedTime</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">change</span>: <span class="hljs-literal">false</span>   <span class="hljs-comment">// 判断是更改的时间还是播放的时间</span>
  },
  <span class="hljs-attr">getters</span>: {
    <span class="hljs-attr">audio</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.audio,
    <span class="hljs-attr">playing</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.playing,
    <span class="hljs-attr">loading</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.loading,
    <span class="hljs-attr">showDetail</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.showDetail,
    <span class="hljs-attr">durationTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.durationTime,
    <span class="hljs-attr">currentIndex</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.currentIndex,
    <span class="hljs-attr">bufferedTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.bufferedTime,
    <span class="hljs-attr">tmpCurrentTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.tmpCurrentTime,
    <span class="hljs-attr">songList</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.songList,
    <span class="hljs-attr">change</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.change,
    <span class="hljs-attr">currentTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.currentTime,
    <span class="hljs-attr">prCurrentTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> state.currentTime / state.durationTime * <span class="hljs-number">100</span>
    },
    <span class="hljs-attr">prBufferedTime</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> state.bufferedTime / state.durationTime * <span class="hljs-number">100</span>
    }
  },
  <span class="hljs-attr">mutations</span>: {
    play (state) {
      state.playing = <span class="hljs-literal">true</span>
    },
    pause (state) {
      state.playing = <span class="hljs-literal">false</span>
    },
    toggleDetail (state) {
      state.showDetail = !state.showDetail
    },
    setAudio (state) {
      state.audio = state.songList[state.currentIndex - <span class="hljs-number">1</span>]
    },
    setAudioIndex (state, index) {
      state.audio = state.songList[index]
      state.currentIndex = index + <span class="hljs-number">1</span>
    },
    removeAudio (state, index) {
      state.songList.splice(index, <span class="hljs-number">1</span>)
      state.audio = state.songList[index - <span class="hljs-number">1</span>]
      state.currentIndex = state.currentIndex - <span class="hljs-number">1</span>
      <span class="hljs-keyword">if</span> (state.songList.length === <span class="hljs-number">0</span>) {
        state.audio = {
          <span class="hljs-string">'id'</span>: <span class="hljs-number">0</span>,
          <span class="hljs-string">'name'</span>: <span class="hljs-string">'歌曲名称'</span>,
          <span class="hljs-string">'singer'</span>: <span class="hljs-string">'演唱者'</span>,
          <span class="hljs-string">'albumPic'</span>: <span class="hljs-string">'/static/player-bar.png'</span>,
          <span class="hljs-string">'location'</span>: <span class="hljs-string">''</span>,
          <span class="hljs-string">'album'</span>: <span class="hljs-string">''</span>
        }
        state.playing = <span class="hljs-literal">false</span>
      }
    },
    setChange (state, flag) {
      state.change = flag
    },
    setLocation (state, location) {
      state.audio.location = location
    },
    updateCurrentTime (state, time) {
      state.currentTime = time
    },
    updateDurationTime (state, time) {
      state.durationTime = time
    },
    updateBufferedTime (state, time) {
      state.bufferedTime = time
    },
    changeTime (state, time) {
      state.tmpCurrentTime = time
    },
    openLoading (state) {
      state.loading = <span class="hljs-literal">true</span>
    },
    closeLoading (state) {
      state.loading = <span class="hljs-literal">false</span>
    },
    resetAudio (state) {
      state.currentTime = <span class="hljs-number">0</span>
    },
    playNext (state) { <span class="hljs-comment">// 播放下一曲</span>
      state.currentIndex++
      <span class="hljs-keyword">if</span> (state.currentIndex &gt; state.songList.length) {
        state.currentIndex = <span class="hljs-number">1</span>
      }
      state.audio = state.songList[state.currentIndex - <span class="hljs-number">1</span>]
    },
    playPrev (state) { <span class="hljs-comment">// 播放上一曲</span>
      state.currentIndex--
      <span class="hljs-keyword">if</span> (state.currentIndex &lt; <span class="hljs-number">1</span>) {
        state.currentIndex = state.songList.length
      }
      state.audio = state.songList[state.currentIndex - <span class="hljs-number">1</span>]
    },
    addToList (state, item) {
      <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">false</span>
      state.songList.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, index</span>) </span>{ <span class="hljs-comment">// 检测歌曲重复</span>
        <span class="hljs-keyword">if</span> (element.id === item.id) {
          flag = <span class="hljs-literal">true</span>
          state.currentIndex = index + <span class="hljs-number">1</span>
        }
      })
      <span class="hljs-keyword">if</span> (!flag) {
        state.songList.push(item)
        state.currentIndex = state.songList.length
      }
    },
    setLrc (state, lrc) {
      state.lyric = lrc
    }
  },
  <span class="hljs-comment">// 异步的数据操作</span>
  actions: {
    getSong ({commit, state}, id) {
      commit(<span class="hljs-string">'openLoading'</span>)
      Axios.get(api.getSong(id)).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-comment">// 统一数据模型，方便后台接口的改变</span>
        <span class="hljs-keyword">var</span> url = res.data.data[<span class="hljs-number">0</span>].url
        commit(<span class="hljs-string">'setAudio'</span>)
        commit(<span class="hljs-string">'setLocation'</span>, url)
      })
    },
    getLrc ({commit, state}, id) {
      commit(<span class="hljs-string">'setLrc'</span>, <span class="hljs-string">'[txt](加载中。。。'</span>)
      Axios.get(api.getLrc(id)).then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
        <span class="hljs-comment">// 1、先判断是否有歌词</span>
        <span class="hljs-keyword">if</span> (res.data.nolyric) {
          commit(<span class="hljs-string">'setLrc'</span>, <span class="hljs-string">'[txt](⊙０⊙) 暂无歌词'</span>)
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-built_in">console</span>.log(res.data.lrc.lyric)
          commit(<span class="hljs-string">'setLrc'</span>, res.data.lrc.lyric)
        }
      })
    }
  }
})</code></pre>
<blockquote><p>最后上点项目截图</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008370593?w=341&amp;h=583" src="https://static.alili.tech/img/remote/1460000008370593?w=341&amp;h=583" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008370594?w=331&amp;h=576" src="https://static.alili.tech/img/remote/1460000008370594?w=331&amp;h=576" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>github项目地址：<a href="https://github.com/javaSwing/NeteaseCloudWebApp" rel="nofollow noreferrer" target="_blank">https://github.com/javaSwing/NeteaseCloudWebApp</a></p>
<p>目前只完成app歌单部分，也是最核心的部分。这个项目会一直更新!如果觉的不错就给个star吧</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用VUEJS做一个网易云音乐

## 原文链接
[https://segmentfault.com/a/1190000008370588](https://segmentfault.com/a/1190000008370588)

