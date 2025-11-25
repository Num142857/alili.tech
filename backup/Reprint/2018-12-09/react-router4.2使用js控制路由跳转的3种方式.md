---
title: 'react-router4.2使用js控制路由跳转的3种方式' 
date: 2018-12-09 2:30:08
hidden: true
slug: 3bx0h7b08wt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、背景</h2>
<ul><li>在很多情况下，我们需要用js来控制页面的路由切换，而不是通过Link标签这种方式，比如有这样一个场景，用户要登陆一个网站才能看到网站里面的内容，登录接口是一个独立的子页面，登陆成功后，才能进入网站浏览相关内容，使用react做SPA时就需要做路由的切换。</li></ul>
<h2 id="articleHeader1">二、react-router4.2</h2>
<ul><li>在网上随处可见react-router入门使用方式，通过链接绑定组件实现跳转，或者绑定hashHistory后，妄想在子组件中使用<code>this.props.history.push('/某路径')</code>实现路由跳转，诚然，在以前的版本是可行的，据说，反正我没用过。而奇葩的4.2版本并不支持这种方式。我在网上看了许久，试了诸多办法，任然无法通过上述方式实现js控制路由切换，emmm...</li></ul>
<h2 id="articleHeader2">三、问题解决办法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用4.2里面的Redirect标签？组件？，不知道怎么称呼
具体如下：
先定义路由（表）：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>使用<span class="hljs-number">4.2</span>里面的<span class="hljs-keyword">Redirect</span>标签？组件？，不知道怎么称呼
具体如下：
先定义路由（表）：</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
 <Router >
      <div style="{{"height:'100%'"}}">
      <Switch>
        <Route exact path=&quot;/&quot; component={LoginPage}/>
        <Route path=&quot;/chat&quot; component={Chat}/>
        <Route path=&quot;/home&quot; component={Home}/>
        <Route path=&quot;/login&quot; component={Login}/>
      </Switch>
      </div>
    </Router>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml">import </span><span class="hljs-template-variable">{
  BrowserRouter as Router,
  Route,
  Switch
}</span><span class="xml"> from 'react-router-dom';
 <span class="hljs-tag">&lt;<span class="hljs-name">Router</span> &gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=</span></span><span class="hljs-template-variable">"{{"height:'100%'}</span><span class="xml"><span class="hljs-tag">}&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Switch</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{LoginPage}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/chat"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Chat}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/home"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Home}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Route</span> <span class="hljs-attr">path</span>=<span class="hljs-string">"/login"</span> <span class="hljs-attr">component</span>=</span></span><span class="hljs-template-variable">{Login}</span><span class="xml"><span class="hljs-tag">/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Switch</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">Router</span>&gt;</span>)</span></code></pre>
<p>方法一、在子组件里使用<br>先要引入Redirect</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   import { Redirect } from 'react-router';

 class Login extends React.Component {
    
    render() {
    const {isRegisterNewUser,loginSuccess}=this.props;
    const { getFieldDecorator} = this.props.form;
    if(loginSuccess){
      *return (<Redirect to=&quot;/chat&quot; />);*
    }else{
     return(
     这里放没登陆之前的各种form表单
     )
    } 
    
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>   <span class="hljs-keyword">import</span> { <span class="hljs-type">Redirect</span> } from <span class="hljs-symbol">'react</span>-router';

 <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    
    render() {
    const {isRegisterNewUser,loginSuccess}=<span class="hljs-keyword">this</span>.props;
    const { getFieldDecorator} = <span class="hljs-keyword">this</span>.props.form;
    <span class="hljs-keyword">if</span>(loginSuccess){
      *<span class="hljs-keyword">return</span> (&lt;<span class="hljs-type">Redirect</span> to=<span class="hljs-string">"/chat"</span> /&gt;);*
    }<span class="hljs-keyword">else</span>{
     <span class="hljs-keyword">return</span>(
     这里放没登陆之前的各种form表单
     )
    } 
    
  }
}
</code></pre>
<p>方法二、来自下面的大佬：<a href="https://segmentfault.com/u/jingdui94">静对94</a><br>import PropTypes from 'prop-types';</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static contextTypes = {

    router: PropTypes.object.isRequired,
}

console.log(this.context.router)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>static contextTypes = {

    <span class="hljs-attribute">router</span>: PropTypes<span class="hljs-variable">.object</span><span class="hljs-variable">.isRequired</span>,
}

console<span class="hljs-variable">.log</span>(this<span class="hljs-variable">.context</span><span class="hljs-variable">.router</span>)
</code></pre>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Login extends React.Component {
        static contextTypes = {
            router: PropTypes.object.isRequired,
        }
        render() {
        const {isRegisterNewUser,loginSuccess}=this.props;
        const { getFieldDecorator} = this.props.form;
        if(loginSuccess){//登陆状态变为成功
          this.context.router.history.push('/chat)
        }else{
         return(
         这里放没登陆之前的各种form表单
         )
        } 
        
      }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        static contextTypes = {
            router: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired,
        }
        render() {
        const {isRegisterNewUser,loginSuccess}=<span class="hljs-keyword">this</span>.props;
        const { getFieldDecorator} = <span class="hljs-keyword">this</span>.props.form;
        <span class="hljs-keyword">if</span>(loginSuccess){<span class="hljs-comment">//登陆状态变为成功</span>
          <span class="hljs-keyword">this</span>.context.router.history.push('/chat)
        }<span class="hljs-keyword">else</span>{
         <span class="hljs-keyword">return</span>(
         这里放没登陆之前的各种form表单
         )
        } 
        
      }
    }
    </code></pre>
<p>方法三、来自<a href="https://segmentfault.com/u/Inori_Lover" target="_blank">Inori_Lover</a> 大佬推荐的<a href="https://reacttraining.com/react-router/web/api/withRouter" rel="nofollow noreferrer" target="_blank">官方文档：</a>使用withRouter解决</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {withRouter } from 'react-router';
class Login extends React.Component {
            static contextTypes = {
                router: PropTypes.object.isRequired,
            }
            render() {
            const {isRegisterNewUser,loginSuccess，history}=this.props;
            const { getFieldDecorator} = this.props.form;
            if(loginSuccess){//登陆状态变为成功
              this.props.history.push('/chat)
            }else{
             return(
             这里放没登陆之前的各种form表单
             )
            } 
            
          }
        }
        ...
        
const Login=withRouter(connect(mapStateToProps,mapDispatchToProps)(TLogin))
export default Login;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> {withRouter } from <span class="hljs-symbol">'react</span>-router';
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Login</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
            static contextTypes = {
                router: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired,
            }
            render() {
            const {isRegisterNewUser,loginSuccess，history}=<span class="hljs-keyword">this</span>.props;
            const { getFieldDecorator} = <span class="hljs-keyword">this</span>.props.form;
            <span class="hljs-keyword">if</span>(loginSuccess){<span class="hljs-comment">//登陆状态变为成功</span>
              <span class="hljs-keyword">this</span>.props.history.push('/chat)
            }<span class="hljs-keyword">else</span>{
             <span class="hljs-keyword">return</span>(
             这里放没登陆之前的各种form表单
             )
            } 
            
          }
        }
        ...
        
const <span class="hljs-type">Login</span>=withRouter(connect(mapStateToProps,mapDispatchToProps)(<span class="hljs-type">TLogin</span>))
export <span class="hljs-keyword">default</span> <span class="hljs-type">Login</span>;</code></pre>
<p><strong>如果你没有使用redux</strong>，那么你使用withRouter的正确姿势应该是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Login=withRouter(TLogin)
export default Login;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">const</span> Login=withRouter(TLogin)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Login;</code></pre>
<h2 id="articleHeader3">四、重点就是：</h2>
<p>感谢各位大佬的指点，是我太浮躁，没认真阅读文档，以后一定多看。不管什么方式，解决问题才是最重要的。</p>
<p>参考连接：<a href="https://stackoverflow.com/questions/29594720/automatic-redirect-after-login-with-react-router" rel="nofollow noreferrer" target="_blank">stackoverflow</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react-router4.2使用js控制路由跳转的3种方式

## 原文链接
[https://segmentfault.com/a/1190000013912862](https://segmentfault.com/a/1190000013912862)

