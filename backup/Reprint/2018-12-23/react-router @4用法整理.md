---
title: 'react-router @4用法整理' 
date: 2018-12-23 2:30:07
hidden: true
slug: uztozzzr0l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">router@4</h2>
<p><a href="https://reacttraining.com/react-router/web/example/basic" rel="nofollow noreferrer" target="_blank">react-router@4官方文档</a>     <br><a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank">github源码</a></p>
<p>这篇文章主要介绍了react-router@4的基本用法,包括动态路由,编程式导航等</p>
<ol>
<li>安装</li>
<li>switch用法</li>
<li>动态路由的基本用法</li>
<li>编程式导航(withRouter)</li>
<li>总结</li>
</ol>
<ol>
<li>
<p>安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i react-router-dom -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> react-router-dom -S</code></pre>
</li>
<li>switch用法<br>   示例代码:</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
class SwitchCom extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path=&quot;/cart&quot; component={Cart}></Route>
                    <Route path=&quot;/search&quot; component={Search} />
                    <Route path=&quot;/home&quot; component={Main} />
                    <Redirect from=&quot;/&quot; to=&quot;/home&quot;></Redirect>           
                    <Route path=&quot;/mine&quot; component={Mine}></Route>
                    <Route path=&quot;/class&quot; component={Class}></Route>
                    <Route component={NoMatch}></Route>
                </Switch>
            </Router>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>import { Switch, BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
class SwitchCom extends Component {
    render() {
        return (
            <span class="hljs-tag">&lt;<span class="hljs-name">Router</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/cart"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Cart}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/search"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Search}</span> /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/home"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Main}</span> /&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Redirect</span> <span class="hljs-attr">from</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/home"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Redirect</span>&gt;</span>           
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/mine"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Mine}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/class"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Class}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{NoMatch}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>
        )
    }
}</code></pre>
<blockquote><p>关于路由重定向: 使用<code>Redirect..from..to</code>的格式,注意位置需要在定义to路由的后面,比如<code>to="/home"</code>,重定向就需要写在<code>Route path="/home"</code> 后面 <br>关于404路由匹配,默认写在路由末尾,前面的路由都不匹配时,自动匹配404<br>关于<code>Route</code>,必须写在<code>Router</code>标签里面,否则会报错</p></blockquote>
<p>3.动态路由的基本用法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
<div className=&quot;tab-bar&quot;>
    <Route path=&quot;/index&quot; exact component={Index}></Route>
    <Route path=&quot;/index/news&quot; component={News}></Route>
    <Route path=&quot;/index/course&quot; component={Course}></Route>
    <Route path=&quot;/index/mine&quot; component={Mine}></Route>
    <ul className=&quot;footer&quot;>
        <li><NavLink exact to=&quot;/index&quot; activeStyle="{{" color: '#4dc060' "}}">首页列表项目 </NavLink></li>
        <li><NavLink to=&quot;/index/news&quot; activeStyle="{{" color: '#4dc060' "}}">资讯</NavLink></li>
        <li><NavLink to=&quot;/index/course&quot; activeStyle="{{" color: '#4dc060' "}}">课程</NavLink></li>
        <li><NavLink to=&quot;/index/mine&quot; activeClassName=&quot;selected&quot;>我的</NavLink></li>
    </ul>
</div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> { BrowserRouter <span class="hljs-keyword">as</span> Router, Route, NavLink} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-router-dom'</span>;
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"tab-bar"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/index"</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Index}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/index/news"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{News}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/index/course"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Course}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/index/mine"</span> <span class="hljs-attr">component</span>=<span class="hljs-string">{Mine}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Route</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"footer"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> '#<span class="hljs-attr">4dc060</span>' "}}"&gt;</span>首页列表项目 <span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index/news"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> '#<span class="hljs-attr">4dc060</span>' "}}"&gt;</span>资讯<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index/course"</span> <span class="hljs-attr">activeStyle</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">color:</span> '#<span class="hljs-attr">4dc060</span>' "}}"&gt;</span>课程<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">NavLink</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/index/mine"</span> <span class="hljs-attr">activeClassName</span>=<span class="hljs-string">"selected"</span>&gt;</span>我的<span class="hljs-tag">&lt;/<span class="hljs-name">NavLink</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</code></pre>
<blockquote><p>上面的<code>exact</code>表示绝对匹配/index,如果不注明<code>exact</code>,则/index还会匹配/index/new等等<br>上面代码实现了一个类似<code>tabbar</code>切换的效果</p></blockquote>
<p>关于NavLink 和 Link:    <br>   如果仅仅需要匹配路由,使用<code>Link</code>就可以了,而<code>NavLink</code>的不同在于可以给当前选中的路由添加样式, 比如上面写到的<code>activeStyle</code>和<code>activeClassName</code></p>
<p>4.编程式导航(withRouter用法)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {withRouter} from 'react-router-dom';

goBack(){
    this.props.history.goBack();
}  
goDetail(){
    this.props.history.push('/detail');
}  
goDetailWithParam(item){
    this.props.history.push({pathname : '/cart',state:{item"}}");
}
    
<span className=&quot;ico&quot; onClick={this.goBack.bind(this)}>
    <i className=&quot;iconfont&quot;>&amp;#xe501;</i>
</span>
//这里的item来自for循环的每一项
<li onClick={this.goDetailWithParam.bind(this,item)} key={encodeURI(item.imgUrl)}>

export default withRouter(Header);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> {withRouter} from <span class="hljs-string">'react-router-dom'</span>;

goBack(){
    <span class="hljs-keyword">this</span>.props.history.goBack();
}  
goDetail(){
    <span class="hljs-keyword">this</span>.props.history.push(<span class="hljs-string">'/detail'</span>);
}  
goDetailWithParam(item){
    <span class="hljs-keyword">this</span>.props.history.push({pathname : <span class="hljs-string">'/cart'</span>,state:{item"}}");
}
    
&lt;span className=<span class="hljs-string">"ico"</span> onClick={<span class="hljs-keyword">this</span>.goBack.bind(<span class="hljs-keyword">this</span>)}&gt;
    &lt;i className=<span class="hljs-string">"iconfont"</span>&gt;&amp;#xe501;&lt;/i&gt;
&lt;/span&gt;
<span class="hljs-comment">//这里的item来自for循环的每一项</span>
&lt;li onClick={<span class="hljs-keyword">this</span>.goDetailWithParam.bind(<span class="hljs-keyword">this</span>,item)} key={encodeURI(item.imgUrl)}&gt;

export <span class="hljs-keyword">default</span> withRouter(Header);</code></pre>
<blockquote><p>引入<code>withRouter</code>之后,就可以使用编程式导航进行点击跳转, 需要注意的是<code>export default</code>的暴露如上面所写,如果结合redux使用,则暴露方式为: <code>withRouter(connect(...)(MyComponent))</code><br>调用<code>history</code>的<code>goBack</code>方法会返回上一历史记录<br>调用<code>history</code>的<code>push</code>方法会跳转到目标页,如上面<code>goDetail</code>方法<br>跳转传参:  <code>push()</code>可以接收一个对象参数,跳转之后,通过<code>this.props.location.state</code>接收</p></blockquote>
<p>5 总结:<br>刚做过一个<code>React</code>的项目,搭配路由选择了<code>react-router @4 </code>,收获挺多的,打算写文章记录一下收获(也算是遇到的一些坑). 感觉<code>@4</code>比之前的<code>router</code>版本更加灵活一些,用法也更加简洁.还是挺好用的.官方文档也只是用到哪些就看一看,并没有从头看到尾,所以理解还不是很深刻,如果上面理解有偏差,还望指出,共同进步.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-router @4用法整理

## 原文链接
[https://segmentfault.com/a/1190000012258651](https://segmentfault.com/a/1190000012258651)

