---
title: 'react技术栈实践(从前到后撸一个电影搜集应用)' 
date: 2018-12-21 2:30:11
hidden: true
slug: h1cyz4wkau4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>之前做了个好电影搜集的小应用，前端采用react，后端采用express+mongodb，最近又将组件间的状态管理改成了redux，并加入了redux-saga来管理异步操作,记录一些总结</blockquote>
<h2 id="articleHeader0">
<a href="http://xiyuyizhi.xyz:8080" rel="nofollow noreferrer" target="_blank">在线地址</a> 手机模式</h2>
<p><a href="https://github.com/xiyuyizhi/movies" rel="nofollow noreferrer" target="_blank">源码</a></p>
<h2 id="articleHeader1">主要功能</h2>
<ul>
<li>爬取豆瓣电影信息并录入MongoDB</li>
<li>电影列表展示，分类、搜索</li>
<li>电影详情展示及附件管理</li>
<li>注册、登录</li>
<li>权限控制，普通用户可以录入、收藏,administrator录入、修改、删除</li>
<li>用户中心，我的收藏列表</li>
</ul>
<p><span class="img-wrap"><img data-src="https://github.com/xiyuyizhi/movies/raw/redux-redux-saga/view.png" src="https://static.alili.techhttps://github.com/xiyuyizhi/movies/raw/redux-redux-saga/view.png" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader2">一些总结</h1>
<h2 id="articleHeader3">前端</h2>
<p>前端使用了react,redux加redux-saga,对redux简单总结一下，同时记录一个前后接口调用有依赖关系的问题</p>
<ul><li><h3 id="articleHeader4">redux</h3></li></ul>
<p>一句话总结redux，我觉的就是将组件之间的纵向的props传递和父子组件间的state爱恨纠缠给打平了，将一种纵向关系转变成<code>多个组件和一个独立出来的状态对象直接交互</code>，这样之后，代码结构确实看上去更加清晰了。</p>
<p>redux的核心概念，action,reducer,和store</p>
<p><code>action就是说明我要操作一个状态了，怎么操作是reducer的事，而所有状态存储在store中，store发出动作并交由指定的reducer来处理</code></p>
<p>redux强制规范了我们对状态的操作，只能在action和reducer这些东西中,这样，原本错综复杂的业务逻辑处理就换了个地，限制在了action和reducer中，组件看上去就很干净了。其实，该复杂的东西在哪放都复杂，只不过现在更清晰一点</p>
<p>使用redux不好的地方就是太繁琐了，定义各种action,connect各种组件。。。。。现在又出来一个Mobx,不明觉厉，反正大家都说好~</p>
<ul><li><h3 id="articleHeader5">redux-saga</h3></li></ul>
<p>redux-saga用来处理异步调用啥的，借助于generator,让异步代码看起来更简洁，常用的有<code>take,takeLatest,takeEvery,put,call,fork,select</code>，使用过程中遇到一个接口调用有前后依赖关系的问题,比较有意思</p>
<p>描述一下:</p>
<ol><li>有一个接口<em>/api/user/checkLogin</em>,用来判断是否登录，在最外层的&lt;App&gt;&lt;/App&gt;组件的componentDidMount中触发action来发起这个请求，并且接口返回状态是登录的话，还要发一个获取用户信息的</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* checkLogin() {
    const res = yield Util.fetch('/api/user/checkLogin')
    yield put(recieveCheckLogin(!res.code))
    if (!res.code) {
        //已登录
        yield put(fetchUinfo())
    }
}
export function* watchCheckLogin() {
    yield takeLatest(CHECK_LOAGIN, checkLogin)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">checkLogin</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> Util.fetch(<span class="hljs-string">'/api/user/checkLogin'</span>)
    <span class="hljs-keyword">yield</span> put(recieveCheckLogin(!res.code))
    <span class="hljs-keyword">if</span> (!res.code) {
        <span class="hljs-comment">//已登录</span>
        <span class="hljs-keyword">yield</span> put(fetchUinfo())
    }
}
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchCheckLogin</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> takeLatest(CHECK_LOAGIN, checkLogin)
}</code></pre>
<ol><li>然后我有一个电影详情页组件，在这个组件的<em>componentDidMount</em>中会发起<em><code>/api/movies/${id}</code></em>接口获取电影信息，如果用户是登录状态的话，还会发起一个获取电影附件信息的接口<em><code>/api/movies/${id}/attach</code></em>，<strong>整个步骤写在一个generator中</strong>
</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* getItemMovie(id) {
    return yield Util.fetch(`/api/movies/${id}`)
}

function* getMovieAttach(id) {
    return yield Util.fetch(`/api/movies/${id}/attach`)
}

function* getMovieInfo(action) {
    const { movieId } = action
    let { login } = yield select(state => state.loginStatus)
    const res = yield call(getItemMovie, movieId)
    yield put(recieveItemMovieInfo(res.data[0]))
    if (res.data[0].attachId &amp;&amp; login) {
        const attach = yield call(getMovieAttach, movieId)
        yield put(recieveMovieAttach(attach.data[0]))
    }
}

export function* watchLoadItemMovie() {
    yield takeLatest(LOAD_ITEM_MOVIE, getMovieInfo)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getItemMovie</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> Util.fetch(<span class="hljs-string">`/api/movies/<span class="hljs-subst">${id}</span>`</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getMovieAttach</span>(<span class="hljs-params">id</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> Util.fetch(<span class="hljs-string">`/api/movies/<span class="hljs-subst">${id}</span>/attach`</span>)
}

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getMovieInfo</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">const</span> { movieId } = action
    <span class="hljs-keyword">let</span> { login } = <span class="hljs-keyword">yield</span> select(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.loginStatus)
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> call(getItemMovie, movieId)
    <span class="hljs-keyword">yield</span> put(recieveItemMovieInfo(res.data[<span class="hljs-number">0</span>]))
    <span class="hljs-keyword">if</span> (res.data[<span class="hljs-number">0</span>].attachId &amp;&amp; login) {
        <span class="hljs-keyword">const</span> attach = <span class="hljs-keyword">yield</span> call(getMovieAttach, movieId)
        <span class="hljs-keyword">yield</span> put(recieveMovieAttach(attach.data[<span class="hljs-number">0</span>]))
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchLoadItemMovie</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> takeLatest(LOAD_ITEM_MOVIE, getMovieInfo)
}</code></pre>
<ol>
<li>用户登录了，进到详情，流程正常，但如果在详情页刷新了页面，获取附件的接口没触发，原因是此时checkLogin接口还没返回结果，<code>state.loginStatus</code>状态还是false，上面就没走到if中</li>
<li>一开始想着怎么控制一些generator中yield的先后顺序来解决(如果用户没有登录的话,再发一个CHECK_LOAGIN,结果返回了流程再继续)，但存在CHECK_LOAGIN调用两次，如果登录了，还会再多一次获取用户信息的接口调用的情况，肯定不行</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* getMovieInfo(action) {
    const { movieId } = action
    let { login } = yield select(state => state.loginStatus)
    const res = yield call(getItemMovie, movieId)
    yield put(recieveItemMovieInfo(res.data[0]))
    // if (!login) {
    //     //刷新页面的时候，如果此时checklogin接口还没返回数据或还没发出，应触发一个checklogin
    //     //checklogin返回后才能得到login状态
    //     yield put({
    //         type: CHECK_LOAGIN
    //     })
    //     const ret = yield take(RECIEVE_CHECK_LOAGIN)
    //     login = ret.loginStatus
    // }
    if (res.data[0].attachId &amp;&amp; login) {
        const attach = yield call(getMovieAttach, movieId)
        yield put(recieveMovieAttach(attach.data[0]))
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getMovieInfo</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">const</span> { movieId } = action
    <span class="hljs-keyword">let</span> { login } = <span class="hljs-keyword">yield</span> select(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.loginStatus)
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> call(getItemMovie, movieId)
    <span class="hljs-keyword">yield</span> put(recieveItemMovieInfo(res.data[<span class="hljs-number">0</span>]))
    <span class="hljs-comment">// if (!login) {</span>
    <span class="hljs-comment">//     //刷新页面的时候，如果此时checklogin接口还没返回数据或还没发出，应触发一个checklogin</span>
    <span class="hljs-comment">//     //checklogin返回后才能得到login状态</span>
    <span class="hljs-comment">//     yield put({</span>
    <span class="hljs-comment">//         type: CHECK_LOAGIN</span>
    <span class="hljs-comment">//     })</span>
    <span class="hljs-comment">//     const ret = yield take(RECIEVE_CHECK_LOAGIN)</span>
    <span class="hljs-comment">//     login = ret.loginStatus</span>
    <span class="hljs-comment">// }</span>
    <span class="hljs-keyword">if</span> (res.data[<span class="hljs-number">0</span>].attachId &amp;&amp; login) {
        <span class="hljs-keyword">const</span> attach = <span class="hljs-keyword">yield</span> call(getMovieAttach, movieId)
        <span class="hljs-keyword">yield</span> put(recieveMovieAttach(attach.data[<span class="hljs-number">0</span>]))
    }
}</code></pre>
<ol><li>最终的办法,分解generator的职责，componentWillUpdate中合适的触发获取附件的动作</li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//将获取附件的动作从 getMovieInfo这个generator中分离出来
function* getMovieInfo(action) {
    const { movieId } = action
    const res = yield call(getItemMovie, movieId)
    yield put(recieveItemMovieInfo(res.data[0]))
}
function* watchLoadItemMovie() {
    yield takeLatest(LOAD_ITEM_MOVIE, getMovieInfo)
}
function* watchLoadAttach() {
    while (true) {
        const { movieId } = yield take(LOAD_MOVIE_ATTACH)
        const { attachId } = yield select(state => state.detail.movieInfo)
        const attach = yield call(getMovieAttach, movieId)
        yield put(recieveMovieAttach(attach.data[0]))
    }
}

//组件中
componentWillUpdate(nextProps) {
        if (nextProps.loginStatus &amp;&amp; (nextProps.movieInfo!==this.props.movieInfo)) {
            //是登录状态，并且movieInfo已经返回时
            const { id } = this.props.match.params
            this.props.loadMovieAttach(id)
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//将获取附件的动作从 getMovieInfo这个generator中分离出来</span>
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">getMovieInfo</span>(<span class="hljs-params">action</span>) </span>{
    <span class="hljs-keyword">const</span> { movieId } = action
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">yield</span> call(getItemMovie, movieId)
    <span class="hljs-keyword">yield</span> put(recieveItemMovieInfo(res.data[<span class="hljs-number">0</span>]))
}
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchLoadItemMovie</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> takeLatest(LOAD_ITEM_MOVIE, getMovieInfo)
}
<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">watchLoadAttach</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">const</span> { movieId } = <span class="hljs-keyword">yield</span> take(LOAD_MOVIE_ATTACH)
        <span class="hljs-keyword">const</span> { attachId } = <span class="hljs-keyword">yield</span> select(<span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.detail.movieInfo)
        <span class="hljs-keyword">const</span> attach = <span class="hljs-keyword">yield</span> call(getMovieAttach, movieId)
        <span class="hljs-keyword">yield</span> put(recieveMovieAttach(attach.data[<span class="hljs-number">0</span>]))
    }
}

<span class="hljs-comment">//组件中</span>
componentWillUpdate(nextProps) {
        <span class="hljs-keyword">if</span> (nextProps.loginStatus &amp;&amp; (nextProps.movieInfo!==<span class="hljs-keyword">this</span>.props.movieInfo)) {
            <span class="hljs-comment">//是登录状态，并且movieInfo已经返回时</span>
            <span class="hljs-keyword">const</span> { id } = <span class="hljs-keyword">this</span>.props.match.params
            <span class="hljs-keyword">this</span>.props.loadMovieAttach(id)
        }
}</code></pre>
<ol><li>总结，合理使用组件的钩子函数，generator中不要处理太多操作，增加灵活性</li></ol>
<h2 id="articleHeader6">后端</h2>
<p>后端采用express和mongodb，也用到了redis,主要技术点有<code>使用pm2来管理node应用及部署代码</code>，<a href="https://github.com/xiyuyizhi/movies/blob/master/dayByday/day3.md" rel="nofollow noreferrer" target="_blank">mongodb中开启身份认证</a>，使用token+redis来做身份认证、在node中写了写单元测试，还是值得记录一下的</p>
<ul><li><h3 id="articleHeader7">使用 jwt + redis 来做基于token的用户身份认证</h3></li></ul>
<p>基于token的认证流程</p>
<ol>
<li>客户端发起登录请求</li>
<li>服务端验证用户名密码</li>
<li>验证成功服务端生成一个token，响应给客户端</li>
<li>客户端之后的每次请求header中都带上这个token</li>
<li>服务端对需要认证的接口要验证token，验证成功接收请求</li>
</ol>
<p>这里采用<a href="https://github.com/auth0/node-jsonwebtoken" rel="nofollow noreferrer" target="_blank">jsonwebtoken</a>来生成token，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jwt.sign(payload, secretOrPrivateKey, [options, callback])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">jwt</span><span class="hljs-selector-class">.sign</span>(<span class="hljs-selector-tag">payload</span>, <span class="hljs-selector-tag">secretOrPrivateKey</span>, <span class="hljs-selector-attr">[options, callback]</span>)</code></pre>
<p>使用<a href="https://github.com/auth0/express-jwt" rel="nofollow noreferrer" target="_blank">express-jwt</a>验证token（验证成功会把token信息放在request.user中）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="express_jwt({
        secret: SECRET,
        getToken: (req)=> {
        if (req.headers.authorization &amp;&amp; req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query &amp;&amp; req.query.token) {
            return req.query.token;
        }
        return null;
    }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>express_jwt({
        secret: SECRET,
        <span class="hljs-keyword">getToken</span>: (req)=&gt; {
        <span class="hljs-keyword">if</span> (req.headers.authorization &amp;&amp; req.headers.authorization.<span class="hljs-keyword">split</span>(' ')[0] === 'Bearer') {
            <span class="hljs-keyword">return</span> req.headers.authorization.<span class="hljs-keyword">split</span>(' ')[1];
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (req.<span class="hljs-keyword">query</span> &amp;&amp; req.<span class="hljs-keyword">query</span>.<span class="hljs-keyword">token</span>) {
            <span class="hljs-keyword">return</span> req.<span class="hljs-keyword">query</span>.<span class="hljs-keyword">token</span>;
        }
        <span class="hljs-keyword">return</span> null;
    }
    }</code></pre>
<p>为什么使用redis</p>
<p>**采用jsonwebtoken生成token时可以指定token的有效期，并且jsonwebtoken的verify方法也提供了选项来更新token的有效期，<br>但这里使用了express_jwt中间件，而express_jwt不提供方法来刷新token**</p>
<p>思路：</p>
<ol>
<li>客户端请求登录成功，生成token</li>
<li>将此token保存在redis中，设置redis的有效期（例如1h）</li>
<li>新的请求过来，先express_jwt验证token，验证成功， 再验证token是否在redis中存在，存在说明有效</li>
<li>有效期内客户端新的请求过来，提取token,更新此token在redis中的有效期</li>
<li>客户端退出登录请求，删除redis中此token</li>
</ol>
<p><a href="https://github.com/xiyuyizhi/movies/blob/redux-redux-saga/be/config/token.js" rel="nofollow noreferrer" target="_blank">具体代码</a></p>
<ul><li><h3 id="articleHeader8">使用 mocha + supertest + should 来写单元测试</h3></li></ul>
<p>测试覆盖了所有接口，在开发中，因为没什么进度要求就慢慢写了，写完一个接口就去写一个测试，测试写也还算详细，等测试通过了再前端调接口，整个过程还是挺有意思的</p>
<p><em>mocha 是一个node单元测试框架，类似于前端的jasmine,语法也相近</em></p>
<p><em>supertest 用来测试node接口的库</em></p>
<p><em>should nodejs断言库，可读性很高</em></p>
<p>测试的一个例子，篇幅太长，就不<a href="https://github.com/xiyuyizhi/movies/blob/redux-redux-saga/dayByday/day5.md" rel="nofollow noreferrer" target="_blank">放在这</a>了</p>
<h2 id="articleHeader9">最后</h2>
<p>喜欢可以<a href="https://github.com/xiyuyizhi/movies" rel="nofollow noreferrer" target="_blank">关注</a>下，万一有福利呢。。。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react技术栈实践(从前到后撸一个电影搜集应用)

## 原文链接
[https://segmentfault.com/a/1190000012468935](https://segmentfault.com/a/1190000012468935)

