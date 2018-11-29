---
title: 'React-router v4教程' 
date: 2018-11-29 9:34:56
hidden: true
slug: lvzs2rj11tj
categories: [reprint]
---

{{< raw >}}

                    
<p>在这个教程里，我们会从一个例子React应用开始学习react-router-dom。其中你会学习如何使用<code>Link</code>、<code>NavLink</code>等来实现跳转，<code>Switch</code>和<code>exact</code>实现排他路由和浏览器路径历史。</p>
<p>也许学习react-router最好的办法就是用react-router-dom v4来写一个多页的react应用。这个react应用会包含登录、注册、首页、联系人等页面。但是，首先让我们来看一下react router v4的概念，以及它与v3有什么不同的地方。</p>
<h2 id="articleHeader0">React router v4 vs v3</h2>
<p>v4是react router的一次重写，所以和v3有很多不同的地方。主要有：</p>
<ul>
<li>在react router v4里，路由不再是集中在一起的。它成了应用布局、UI的一部分。</li>
<li>浏览器用的router在<code>react-router-dom</code>里。所以，浏览器里使用的时候只需要import <code>react-router-dom</code>就可以。</li>
<li>新的概念<code>BrowerRouter</code>和<code>HashRouter</code>。他们各自服务于不同的情景下。详见下文。</li>
<li>不在使用<code>{props.children}</code>来处理嵌套的路由。</li>
<li>v4的路由默认不再排他，会有多个匹配。而v3是默认排他的，只会有一个匹配被使用。</li>
</ul>
<p><code>react-router-dom</code>是react-router中用于浏览器的。<code>react-router</code>被分为一下几部分：</p>
<ul>
<li>
<strong>react-router</strong>是浏览器和原生应用的通用部分。</li>
<li>
<strong>react-router-dom</strong>是用于浏览器的。</li>
<li>
<strong>react-router-native</strong>是用于原生应用的。</li>
</ul>
<h2 id="articleHeader1">React-router vs react-router-dom vs react-router-native</h2>
<p><code>react-router</code>是核心部分。<code>react-router-dom</code>提供了浏览器使用需要的定制组件。<code>react-router-native</code>则专门提供了在原生移动应用中需要用到的部分。所以，如果在本例中实现浏览器开发就只需要安装<code>react-router-dom</code>。</p>
<h2 id="articleHeader2">安装</h2>
<p>如上所说，我们使用react开发web应用，所以只需要安装<code>react-router-dom</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  npm install react-router-dom --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">  npm install react-router-dom --save</code></pre>
<h2 id="articleHeader3">理解和使用react-router</h2>
<ul>
<li>
<code>BrowserRouter</code>，这是对<code>Router</code>接口的实现。使得页面和浏览器的history保持一致。如：<code>window.location</code>。</li>
<li>
<code>HashRouter</code>，和上面的一样，只是使用的是url的hash部分，比如：<code>window.location.hash</code>。</li>
<li>
<code>MemoryRouter</code>，</li>
<li>
<code>NativeRouter</code>，处理react native内的路由。</li>
<li>
<code>StaticRouter</code>，处理静态路由，和v3一样。</li>
</ul>
<h3 id="articleHeader4">BrowserRouter vs HashRouter</h3>
<p>在react-router的各种router中，<code>&lt;BrowserRouter&gt;</code>和<code>&lt;HashRouter&gt;</code>是可以在浏览器中使用的。如果你使用的是一个非静态的站点、要处理各种不同的url那么你就需要使用<code>BrowserRouter</code>。相反的如果你的server只处理静态的url，那么就使用<code>HashRouter</code>。</p>
<h2 id="articleHeader5">理解和使用Route</h2>
<p>&lt;Route&gt;组件是react router v4里最有用的组件。背后的使用哲学也很简单，无论何时你需要在匹配某个路径的时候绘制一个组件，那么就可以使用<code>Route</code>组件。</p>
<p><code>Route</code>组件可以使用如下的属性：</p>
<ul>
<li>path属性，字符串类型，它的值就是用来匹配url的。</li>
<li>component属性，它的值是一个组件。在<code>path</code>匹配成功之后会绘制这个组件。</li>
<li>exact属性，这个属性用来指明这个路由是不是排他的匹配。</li>
<li>strict属性，  这个属性指明路径只匹配以斜线结尾的路径。</li>
</ul>
<p>还有其他的一些属性，可以用来代替<code>component</code>属性。</p>
<ul>
<li>render属性，一个返回React组件的方法。传说中的<a href="https://reactjs.org/docs/render-props.html" rel="nofollow noreferrer" target="_blank">rencer-prop</a>就是从这里来的。</li>
<li>children属性，返回一个React组件的方法。只不过这个总是会绘制，即使没有匹配的路径的时候。</li>
</ul>
<p>多数的时候是用<code>component</code>属性就可以满足。但是，某些情况下你不得不使用<code>render</code>或<code>children</code>属性。</p>
<ul>
<li>match</li>
<li>location</li>
<li>history</li>
</ul>
<p>如：<br>使用组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route exact path=&quot;/&quot; component={HomePage} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Route exact path=<span class="hljs-string">"/"</span> component={HomePage} /&gt;</code></pre>
<p>使用<code>render</code>属性实现内联绘制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; render={()=><div>HomePage</div>} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Route path=<span class="hljs-string">"/"</span> render={()=&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>HomePage<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>} /&gt;</code></pre>
<p>来看哥更复杂的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const FadingRoute = ({ component, ...rest }) => (
  <Route {...rest} render={(props) => (
    <FadeIn>
      <componnet {...props} />
    </FadeIn>
  )} />
)

<FadingRoute path=&quot;/cool&quot; component={Something} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> FadingRoute = <span class="hljs-function">(<span class="hljs-params">{ component, ...rest }</span>) =&gt;</span> (
  &lt;Route {...rest} render={(props) =&gt; (
    &lt;FadeIn&gt;
      &lt;componnet {...props} /&gt;
    &lt;/FadeIn&gt;
  )} /&gt;
)

&lt;FadingRoute path="/cool" component={Something} /&gt;</code></pre>
<p>使用<code>children</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
  <ListItemLink to=&quot;/somewhere&quot; />
  <LinkItemLink to=&quot;/somewhere-else&quot; />
</ul>

const ListItemLink = ({to, ...rest}) => (
  <Route path={to} children={({math}) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest} />
    </li>
  )} />
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;ul&gt;
  &lt;ListItemLink to="/somewhere" /&gt;
  &lt;LinkItemLink to="/somewhere-else" /&gt;
&lt;/ul&gt;

const ListItemLink = ({to, ...rest}) =&gt; (
  &lt;Route path={to} children={({math}) =&gt; (
    &lt;li className={match ? 'active' : ''}&gt;
      &lt;Link to={to} {...rest} /&gt;
    &lt;/li&gt;
  )} /&gt;
)</code></pre>
<p>更多关于react-router v4如何匹配路径的内容，请移步<a href="https://github.com/pillarjs/path-to-regexp" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<h2 id="articleHeader6">URL / Path / Route的参数</h2>
<p>通常情况下，我们都会在路径里添加参数。这样方便在不同的组件之间传递一些必要的数据。那么我们如何才能获取到这些传递的参数，并传递给组件中呢？我们只需要在路径的最后加上<code>/:param</code>。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/:param1&quot; component={HomePage} />

const HomePage = ({match}) => (
  <div>
    <h1> parameter => {match.params.param1}
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Route path=<span class="hljs-string">"/:param1"</span> component={HomePage} /&gt;

<span class="hljs-keyword">const</span> HomePage = <span class="hljs-function">(<span class="hljs-params">{match}</span>) =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span> parameter =&gt; {match.params.param1}
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<p>一旦有路径可以匹配成功，那么就会穿件一个拥有如下属性的对象，并传入绘制的组件里：</p>
<ul>
<li>url: 匹配的url。</li>
<li>path：就是path。</li>
<li>isExact：如果<code>path</code>和当前的<code>widnow.location</code>的path部分完全相同的话。</li>
<li>params：在URL里包含的参数。</li>
</ul>
<h2 id="articleHeader7">理解并使用Link</h2>
<p><code>Link</code>是react router v4特有的一个组件。是用来代替上一版的anchor link。使用<code>Link</code>可以在React应用的不同页面之间跳转。与unclor会重新加载整个页面不同，<code>Link</code>只会重新加载页面里和当前url可以匹配的部分。</p>
<p><code>Link</code>组件需要用到<code>to</code>属性，这个属性的值就是react router要跳转到的地址。如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Link } from 'react-router-dom';

const Nav = () => (
  <Link to '/'>Home</Link>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Link } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;

<span class="hljs-keyword">const</span> Nav = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span> '/'&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span></span>
);</code></pre>
<p>当被点击的时候，会跳转到路径：<code>/</code>。</p>
<p><code>to</code>属性的值可以是一个字符串，也可以是一个location（pathname, hash, state和search）对象。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to"{{"
  pathname: '/me',
  search: '?sort=asc',
  hash: '#hash',
  state: { fromHome: true }
"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Link to"{{"
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/me'</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">'?sort=asc'</span>,
  <span class="hljs-attr">hash</span>: <span class="hljs-string">'#hash'</span>,
  <span class="hljs-attr">state</span>: { <span class="hljs-attr">fromHome</span>: <span class="hljs-literal">true</span> }
"}}" /&gt;</code></pre>
<p><code>Link</code>也可以使用<code>replace</code>属性，如果点击的话，那么history里的当前领会被replace。</p>
<h3 id="articleHeader8">&lt;Link&gt;和&lt;NavLink&gt;</h3>
<p><code>NavLink</code>是<code>Link</code>的一个子类，在Link组件的基础上增加了绘制组件的样式，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<NavLink to=&quot;/me&quot; activeStyle="{{"SomeStyle"}}" activeClassName=&quot;selected&quot;>
  My Profile
</NavLink>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
&lt;NavLink to=<span class="hljs-string">"/me"</span> activeStyle="{{"SomeStyle"}}" activeClassName=<span class="hljs-string">"selected"</span>&gt;
  My Profile
&lt;<span class="hljs-regexp">/NavLink&gt;</span></code></pre>
<h2 id="articleHeader9">使用react router dom实现你的第一个demo</h2>
<p>现在我们用react router dom来实现第一个demo。</p>
<p>首先，引入必要的组件。比如：<code>Route</code>和<code>BrowserRouter</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter, Route } from 'react-router-dom';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { BrowserRouter, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;</code></pre>
<p>接下来，我们创建一些组件和一些Html标签。同时我们用react router v4里的<code>Link</code>和<code>NavLink</code>组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BaseLayout = () => (
  <div className=&quot;base&quot;>
    <header>
      <p>React Router v4 Browser Example</p>
      <nav>
        <ul>
          <li><Link =&quot;/&quot;>Home</Link></li>
          <li><Link =&quot;/about&quot;>About</Link></li>
          <li><Link =&quot;/me&quot;>Profile</Link></li>
          <li><Link =&quot;/login&quot;>Login</Link></li>
          <li><Link =&quot;/register&quot;>Register</Link></li>
          <li><Link =&quot;/contact&quot;>Contact</Link></li>
        </ul>
      </nav>
    </header>
    <div className=&quot;container&quot;>
      <Route path=&quot;/&quot; exact component={HomePage} />
      <Route path=&quot;/about&quot; component={AboutPage} />
      <Route path=&quot;/contact&quot; component={ContactPage} />
      <Route path=&quot;/login&quot; component={LoginPage} />
      <Route path=&quot;/register&quot; component={RegisterPage} />
      <Route path=&quot;/me&quot; component={ProfilePage} />
    </div>
    <footer>
      React Router v4 Browser Example (c) 2017
    </footer>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> BaseLayout = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  &lt;div className="base"&gt;
    &lt;header&gt;
      &lt;p&gt;React Router v4 Browser Example&lt;/p&gt;
      &lt;nav&gt;
        &lt;ul&gt;
          &lt;li&gt;&lt;Link ="/"&gt;Home&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link ="/about"&gt;About&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link ="/me"&gt;Profile&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link ="/login"&gt;Login&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link ="/register"&gt;Register&lt;/Link&gt;&lt;/li&gt;
          &lt;li&gt;&lt;Link ="/contact"&gt;Contact&lt;/Link&gt;&lt;/li&gt;
        &lt;/ul&gt;
      &lt;/nav&gt;
    &lt;/header&gt;
    &lt;div className="container"&gt;
      &lt;Route path="/" exact component={HomePage} /&gt;
      &lt;Route path="/about" component={AboutPage} /&gt;
      &lt;Route path="/contact" component={ContactPage} /&gt;
      &lt;Route path="/login" component={LoginPage} /&gt;
      &lt;Route path="/register" component={RegisterPage} /&gt;
      &lt;Route path="/me" component={ProfilePage} /&gt;
    &lt;/div&gt;
    &lt;footer&gt;
      React Router v4 Browser Example (c) 2017
    &lt;/footer&gt;
  &lt;/div&gt;
);</code></pre>
<p>然后我们来创建需要的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HomePage = () => <div>This is a Home Page</div>
const LoginPage = () => <div>This is a Login Page</div>
const RegisterPage = () => <div>This is a Register Page</div>
const ProfilePage = () => <div>This is a Profile Page</div>
const AboutPage = () => <div>This is a About Page</div>
const ContactPage = () => <div>This is a Contact Page</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HomePage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div&gt;This is a Home Page&lt;<span class="hljs-regexp">/div&gt;
const LoginPage = () =&gt; &lt;div&gt;This is a Login Page&lt;/</span>div&gt;
<span class="hljs-keyword">const</span> RegisterPage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div&gt;This is a Register Page&lt;<span class="hljs-regexp">/div&gt;
const ProfilePage = () =&gt; &lt;div&gt;This is a Profile Page&lt;/</span>div&gt;
<span class="hljs-keyword">const</span> AboutPage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div&gt;This is a About Page&lt;<span class="hljs-regexp">/div&gt;
const ContactPage = () =&gt; &lt;div&gt;This is a Contact Page&lt;/</span>div&gt;</code></pre>
<p>最后，写<code>App</code>组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const App = () => (
  <BrowserRouter>
    <BaseLayout />
  </BrowserRouter>
)

render(<App />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">BrowserRouter</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">BaseLayout</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">BrowserRouter</span>&gt;</span></span>
)

render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById('root'));</span></code></pre>
<p>如你所见，react router v4的组件还非常的易用的。</p>
<h2 id="articleHeader10">理解和使用非排他的路由</h2>
<p>在上例中，我们在<code>HomePage</code>组件的路由里使用了属性<code>exact</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Route path=&quot;/&quot; exact component={HomePage} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Route path=<span class="hljs-string">"/"</span> exact component={HomePage} /&gt;</code></pre>
<p>这是因为v4中的路由默认都是非排他的，这一点和v3的实现思路截然不同。如果没有<code>exact</code>属性，<code>HomePage</code>组件和其他的组件就会同事绘制在页面上。</p>
<p>如，当用户点了登录连接以后，<code>"/"</code>和<code>"/login"</code>都满足匹配条件，对应的登录组件和Home组件就会同时出现在界面上。但是，这不是我们期待的结果，所以我们要给<code>"/"</code>path加上<code>exact</code>属性。</p>
<p>现在我们来看看非排他的路由有什么优点。假如我们有一个子菜单组件需要显示在profile页面出现的时候也出现。我们可以简单的修改<code>BasicLayout</code>来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const BaseLayout = () =>  (
  <div className=&quot;base&quot;>
    <header>
      <p>React Router v4 Browser Example</p>
      <nav>
        <ul>
          <li><Link to=&quot;/&quot;>Home</Link></li>
          <li><Link to=&quot;/about&quot;>About</Link></li>
          <li>
            <Link to=&quot;/me&quot;>Profile</Link>
            <Route path=&quot;/me&quot; component={ProfileMenu} />
          </li>
          {/*略*/}
        </ul>
      </nav>
    </header>
  </div>
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> BaseLayout = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>  (
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"base"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>React Router v4 Browser Example<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/me"</span>&gt;</span>Profile<span class="hljs-tag">&lt;/<span class="hljs-name">Link</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/me"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{ProfileMenu}</span> /&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          {/*略*/}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
);</span></code></pre>
<p>这样我们就会看到对应于<code>"/me"</code>路径的组件都绘制出来了。这就是非排他路由的好处。</p>
<h2 id="articleHeader11">理解排他路由</h2>
<p>排他路由是react router v3的默认实现。只有第一个匹配的路由对应的组件会被绘制。这一点也可以用react router v4的<code>Switch</code>组件来实现。在<code>Switch</code>组件中，只有第一个匹配的路由<code>&lt;Route&gt;</code>或者<code>&lt;Redirect&gt;</code>会被绘制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Switch, Route } from 'react-router';

<Switch>
  <Route exact path=&quot;/&quot; component={HomePage} />
  <Route path=&quot;/about&quot; component={AboutPage} />
  <Route path=&quot;me&quot; component={ProfilePage} />
  <Route component={NotFound} />
</Switch>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Switch, Route } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router'</span>;

&lt;Switch&gt;
  &lt;Route exact path="/" component={HomePage} /&gt;
  &lt;Route path="/about" component={AboutPage} /&gt;
  &lt;Route path="me" component={ProfilePage} /&gt;
  &lt;Route component={NotFound} /&gt;
&lt;/Switch&gt;</code></pre>
<h2 id="articleHeader12">浏览器历史</h2>
<p>react router v4中，提供了一个<code>history</code>对象。这个对象包含了多个api，可以用来操作浏览器历史等。</p>
<p>你也可以在React应用里使用<code>history</code>对象的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.push(&quot;/my-path&quot;)
history.replace(&quot;/my-path&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">history.push(<span class="hljs-string">"/my-path"</span>)
history.replace(<span class="hljs-string">"/my-path"</span>)</code></pre>
<p>用另外的方法可以写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Link to=&quot;/my-path&quot; />
<Redirect to=&quot;my-path&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Link to=<span class="hljs-string">"/my-path"</span> /&gt;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"my-path"</span> /&gt;</span></span></code></pre>
<h2 id="articleHeader13">使用&lt;Redirect&gt;组件实现重定向</h2>
<p>无论何时你要重定向到另外一个地址的时候，都可以使用<code>Redirect</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Redirect to "{{"
  pathname: '/register',
  search: '?utm=something',
  state: { referrer: someplage.com }
"}}">" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">&lt;Redirect to "{{"
  <span class="hljs-attr">pathname</span>: <span class="hljs-string">'/register'</span>,
  <span class="hljs-attr">search</span>: <span class="hljs-string">'?utm=something'</span>,
  <span class="hljs-attr">state</span>: { <span class="hljs-attr">referrer</span>: someplage.com }
"}}"&gt;</code></pre>
<p>或者，更为简单的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Redirect to=&quot;register&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;Redirect to=<span class="hljs-string">"register"</span> /&gt;</code></pre>
<h2 id="articleHeader14">最后</h2>
<p>react router v4让开发react应用变得更加的简单。让react应用内的页面跳转更加简单。你只需要声明一个<code>BrowserRouter</code>或者<code>HashRouter</code>，然后在它的内部放上一系列的<code>Route</code>组件，这些主键只要包含<code>path</code>和<code>component</code>属性。无论何时有了匹配的路由，那么它就会进行非排他的绘制（所有匹配的路由都会绘制）。你也可以把<code>Route</code>放在<code>Switch</code>组件里来实现排他的绘制（只有第一个匹配的路由会被绘制）。你可以在路径中传递参数，<code>match</code>对象会保留这些参数。最后，所有在web中使用的路由组件都包含在<code>react-router-dom</code>中。只需要引入<code>react-router-dom</code>就可以使用。</p>
<p>原文地址：<a href="https://www.techiediaries.com/react-router-dom-v4/" rel="nofollow noreferrer" target="_blank">https://www.techiediaries.com...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React-router v4教程

## 原文链接
[https://segmentfault.com/a/1190000015002577](https://segmentfault.com/a/1190000015002577)

