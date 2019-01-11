---
title: 'React实现Toast（提示）效果' 
date: 2019-01-11 2:30:08
hidden: true
slug: s2bjefy5
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">效果图</h1>
<p><span class="img-wrap"><img data-src="/img/bVPy9N?w=302&amp;h=540" src="https://static.alili.tech/img/bVPy9N?w=302&amp;h=540" alt="toast" title="toast" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">需求</h1>
<p>项目中需要实现app中常见的提示效果Toast。这个效果看似简单，实现起来没有那么容易。<br>首先Toast的使用方法必须十分简单，简单到一行代码搞定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Toast.info('普通的Toast我普通的摇！！', 3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Toast</span><span class="hljs-selector-class">.info</span>(<span class="hljs-string">'普通的Toast我普通的摇！！'</span>, <span class="hljs-number">3000</span>);</code></pre>
<p>随时用随时调用上述方法即可。<br>再有一点，Toast不用插入到页面中，他不会向其他组件一样一直出现在DOM中。<br>只有在调用该方法的时候，动态插入到DOM中。<br>还有，页面可以存在多个提示，多个提示单独存在，互不影响。<br>所以，实现Toast并不像其他组件那么普通。</p>
<h1 id="articleHeader2">使用方法</h1>
<p>这次先来看看效果图中的使用代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import ListTitle from '../../components/DataDisplay/ListTitle'
import Button from '../../components/DataEntry/Button'
import Toast from '../../components/Feedback/Toast'
import Tools from '../../components/Tools/Tools'

const ToastPage = () => {
    const commonInfo = () => {
        Toast.info('普通的Toast我普通的摇！！', 3000);
    };
    const commonSuccess = () => {
        Toast.success('操作成功', 3000, 'fa-check');
    };
    const commonError = () => {
        Toast.error('有错误！！', 3000, undefined, false, ()=>{console.log(&quot;callback&quot;);});
    };
    const commonToast = () => {
        Toast.info('欢迎来到本直播间', 3000, undefined, false);
    };
    const successToast = () => {
        Toast.success('操作成功！', 3000, 'fa-check', false);
    };
    const errorToast = () => {
        Toast.error('操作失败！', 3000, 'fa-times', false);
    };
    const warningToast = () => {
        Toast.warning('警告：手机2s后爆炸', 3000, 'fa-exclamation-triangle', false);
    };
    const loadingToast = () => {
        Toast.show('加载中...', 0, 'fa-circle-o-notch fa-spin', false);
        const timer = setTimeout(()=>{
            Toast.hide();
            clearTimeout(timer);
        }, 3000);
    };

    return (
        <div className=&quot;page toast&quot;>
            <h1 className=&quot;title&quot;>
                <i className=&quot;fa fa-home&quot; onClick={()=>{Tools.linkTo(&quot;/index&quot;)"}}"></i>
                Toast
            </h1>

            <ListTitle title=&quot;基本&quot; />
            <div className=&quot;button-box&quot;>
                <Button onClick={commonInfo}>纯文字提示</Button>
                <Button onClick={commonSuccess}>icon成功提示有蒙版</Button>
                <Button onClick={commonError}>纯文字报错提示有回调</Button>
            </div>
            <ListTitle title=&quot;场景使用&quot; />
            <div className=&quot;button-box&quot;>
                <Button type=&quot;primary&quot; onClick={commonToast}>普通提示</Button>
                <Button type=&quot;primary&quot; onClick={successToast}>成功提示</Button>
                <Button type=&quot;primary&quot; onClick={errorToast}>失败提示</Button>
                <Button type=&quot;primary&quot; onClick={warningToast}>警告</Button>
                <Button type=&quot;primary&quot; onClick={loadingToast}>加载中</Button>
            </div>
        </div>
    )
};

export default ToastPage" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> ListTitle <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/DataDisplay/ListTitle'</span>
<span class="hljs-keyword">import</span> Button <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/DataEntry/Button'</span>
<span class="hljs-keyword">import</span> Toast <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/Feedback/Toast'</span>
<span class="hljs-keyword">import</span> Tools <span class="hljs-keyword">from</span> <span class="hljs-string">'../../components/Tools/Tools'</span>

const ToastPage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    const commonInfo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.info(<span class="hljs-string">'普通的Toast我普通的摇！！'</span>, <span class="hljs-number">3000</span>);
    };
    const commonSuccess = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.success(<span class="hljs-string">'操作成功'</span>, <span class="hljs-number">3000</span>, <span class="hljs-string">'fa-check'</span>);
    };
    const commonError = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.<span class="hljs-built_in">error</span>(<span class="hljs-string">'有错误！！'</span>, <span class="hljs-number">3000</span>, undefined, <span class="hljs-literal">false</span>, <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{console.log(<span class="hljs-string">"callback"</span>);});
    };
    const commonToast = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.info(<span class="hljs-string">'欢迎来到本直播间'</span>, <span class="hljs-number">3000</span>, undefined, <span class="hljs-literal">false</span>);
    };
    const successToast = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.success(<span class="hljs-string">'操作成功！'</span>, <span class="hljs-number">3000</span>, <span class="hljs-string">'fa-check'</span>, <span class="hljs-literal">false</span>);
    };
    const errorToast = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.<span class="hljs-built_in">error</span>(<span class="hljs-string">'操作失败！'</span>, <span class="hljs-number">3000</span>, <span class="hljs-string">'fa-times'</span>, <span class="hljs-literal">false</span>);
    };
    const warningToast = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.warning(<span class="hljs-string">'警告：手机2s后爆炸'</span>, <span class="hljs-number">3000</span>, <span class="hljs-string">'fa-exclamation-triangle'</span>, <span class="hljs-literal">false</span>);
    };
    const loadingToast = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        Toast.show(<span class="hljs-string">'加载中...'</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'fa-circle-o-notch fa-spin'</span>, <span class="hljs-literal">false</span>);
        const timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            Toast.hide();
            clearTimeout(timer);
        }, <span class="hljs-number">3000</span>);
    };

    <span class="hljs-keyword">return</span> (
        &lt;div className=<span class="hljs-string">"page toast"</span>&gt;
            &lt;h1 className=<span class="hljs-string">"title"</span>&gt;
                &lt;i className=<span class="hljs-string">"fa fa-home"</span> onClick={()=&gt;{Tools.linkTo(<span class="hljs-string">"/index"</span>)"}}"&gt;&lt;/i&gt;
                Toast
            &lt;/h1&gt;

            &lt;ListTitle title=<span class="hljs-string">"基本"</span> /&gt;
            &lt;div className=<span class="hljs-string">"button-box"</span>&gt;
                &lt;Button onClick={commonInfo}&gt;纯文字提示&lt;/Button&gt;
                &lt;Button onClick={commonSuccess}&gt;icon成功提示有蒙版&lt;/Button&gt;
                &lt;Button onClick={commonError}&gt;纯文字报错提示有回调&lt;/Button&gt;
            &lt;/div&gt;
            &lt;ListTitle title=<span class="hljs-string">"场景使用"</span> /&gt;
            &lt;div className=<span class="hljs-string">"button-box"</span>&gt;
                &lt;Button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span> onClick={commonToast}&gt;普通提示&lt;/Button&gt;
                &lt;Button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span> onClick={successToast}&gt;成功提示&lt;/Button&gt;
                &lt;Button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span> onClick={errorToast}&gt;失败提示&lt;/Button&gt;
                &lt;Button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span> onClick={warningToast}&gt;警告&lt;/Button&gt;
                &lt;Button <span class="hljs-built_in">type</span>=<span class="hljs-string">"primary"</span> onClick={loadingToast}&gt;加载中&lt;/Button&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    )
};

<span class="hljs-keyword">export</span> default ToastPage</code></pre>
<p>可以看到在ToastPage中，render return出来的DOM中没有&lt;Toast/&gt;。<br>只是在点击Button的回调中直接调用的Toast。<br>按理说，组件都应该在render时候return出来，Toast是怎么实现在React中动态添加删除DOM的。</p>
<h1 id="articleHeader3">组件分析</h1>
<p>首先多个提示可以堆叠，不同提示定制化也不同，很显然是个组件，起名为Notice。<br>然后Notice外面还有个容器组件，用来装载Notice并且，暴露一些方法给Toast，起名Notification。<br>最后就是Toast组件，负责直接生成不同的Notice，或者销毁Notification。但是其实Toast只是个对象，而不是真正意义的组件。<br>所以简单的Toast其实是也是分成三部分来完成。<br>Toast -&gt; Notification -&gt; Notice * n;<br>接下来就是逐个开发。</p>
<h1 id="articleHeader4">Notification开发</h1>
<p>为什么要先开发Notification，因为他特别重要，起到承上启下的作用。<br>首先，Notification是个容器，他自己有state，state中的notices数组就是存放生成Notice关键的数据notice（每个Notice都是不同的，所以notice中比如有一个属性：key）。<br>然后render的时候，循环notices生成一段DOM节点，放到自己的div中。<br>同时，其还提供一个向notices中添加notice的方法（add）和根据key，在notices中删除notice的方法（remove）。<br>最后关键的地方，定义一个reRwrite方法，该方法接受一些参数，动态的向DOM中插入一个div，然后再向这个div中插入Notification，最后返回一个含有几个操作这个Notification的方法的对象。（这就是动态实现插入DOM的关键）<br>Notification的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Notification是Notice父组件，容器
// 是动态插入和删除DOM节点的核心
// 同时也向上暴露给Toast重写改变自己的方法
import React from 'react'
import ReactDOM from 'react-dom'
import Notice from './Notice'

class Notification extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            notices: [], // 存储当前有的notices
            hasMask: true, // 是否显示蒙版
        }
    }
    add (notice) {
        // 添加notice
        // 创造一个不重复的key
        const {notices} = this.state;
        const key = notice.key ? notice.key : notice.key = getUuid();
        const mask = notice.mask ? notice.mask : false;
        const temp = notices.filter((item) => item.key === key).length;

        if(!temp){
            // 不存在重复的 添加
            notices.push(notice);
            this.setState({
                notices: notices,
                hasMask: mask
            });
        }
    }
    remove (key) {
        // 根据key删除对应
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }
    getNoticeDOM () {
        const _this = this;
        const {notices} = this.state;
        let result = [];

        notices.map((notice)=>{
            // 每个Notice onClose的时候 删除掉notices中对应key的notice
            const closeCallback = () => {
                _this.remove(notice.key);
                // 如果有用户传入的onClose 执行
                if(notice.onClose) notice.onClose();
            };

            result.push(
                <Notice key={notice.key} {...notice} onClose={closeCallback} />
            );
        });

        return result;
    }
    getMaskDOM () {
        const {notices, hasMask} = this.state;
        // notices为空的时候 不显示蒙版
        // 始终只有一个蒙版
        if(notices.length > 0 &amp;&amp; hasMask == true) return <div className=&quot;zby-mask&quot;></div>;
    }
    render () {
        const noticesDOM = this.getNoticeDOM();
        const maskDOM = this.getMaskDOM();

        return (
            <div className=&quot;zby-notification-box&quot;>
                {maskDOM}
                {noticesDOM}
            </div>
        )
    }
}

// 统计notice总数 防止重复
let noticeNumber = 0;

// 生成唯一的id
const getUuid = () => {
    return &quot;notification-&quot; + new Date().getTime() + &quot;-&quot; + noticeNumber++;
};

// Notification增加一个重写方法
// 该方法方便Notification组件动态添加到页面中和重写
Notification.reWrite = function (properties) {
    const { ...props } = properties || {};

    let div;

    div = document.createElement('div');
    document.body.appendChild(div);

    const notification = ReactDOM.render(<Notification {...props} />, div);

    return {
        notice(noticeProps) {
            notification.add(noticeProps);
        },
        removeNotice(key) {
            notification.remove(key);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export default Notification" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// Notification是Notice父组件，容器</span>
<span class="hljs-comment">// 是动态插入和删除DOM节点的核心</span>
<span class="hljs-comment">// 同时也向上暴露给Toast重写改变自己的方法</span>
<span class="hljs-keyword">import</span> React from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> ReactDOM from <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> Notice from <span class="hljs-string">'./Notice'</span>

class Notification extends React.Component {
    constructor (props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            notices: [], <span class="hljs-comment">// 存储当前有的notices</span>
            hasMask: <span class="hljs-keyword">true</span>, <span class="hljs-comment">// 是否显示蒙版</span>
        }
    }
    <span class="hljs-built_in">add</span> (notice) {
        <span class="hljs-comment">// 添加notice</span>
        <span class="hljs-comment">// 创造一个不重复的key</span>
        <span class="hljs-keyword">const</span> {notices} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">const</span> <span class="hljs-built_in">key</span> = notice.<span class="hljs-built_in">key</span> ? notice.<span class="hljs-built_in">key</span> : notice.<span class="hljs-built_in">key</span> = getUuid();
        <span class="hljs-keyword">const</span> mask = notice.mask ? notice.mask : <span class="hljs-keyword">false</span>;
        <span class="hljs-keyword">const</span> temp = notices.<span class="hljs-built_in">filter</span>((item) =&gt; item.<span class="hljs-built_in">key</span> === <span class="hljs-built_in">key</span>).length;

        <span class="hljs-keyword">if</span>(!temp){
            <span class="hljs-comment">// 不存在重复的 添加</span>
            notices.push(notice);
            <span class="hljs-keyword">this</span>.setState({
                notices: notices,
                hasMask: mask
            });
        }
    }
    remove (<span class="hljs-built_in">key</span>) {
        <span class="hljs-comment">// 根据key删除对应</span>
        <span class="hljs-keyword">this</span>.setState(previousState =&gt; {
            <span class="hljs-keyword">return</span> {
                notices: previousState.notices.<span class="hljs-built_in">filter</span>(notice =&gt; notice.<span class="hljs-built_in">key</span> !== <span class="hljs-built_in">key</span>),
            };
        });
    }
    getNoticeDOM () {
        <span class="hljs-keyword">const</span> _this = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">const</span> {notices} = <span class="hljs-keyword">this</span>.state;
        let result = [];

        notices.<span class="hljs-built_in">map</span>((notice)=&gt;{
            <span class="hljs-comment">// 每个Notice onClose的时候 删除掉notices中对应key的notice</span>
            <span class="hljs-keyword">const</span> closeCallback = () =&gt; {
                _this.remove(notice.<span class="hljs-built_in">key</span>);
                <span class="hljs-comment">// 如果有用户传入的onClose 执行</span>
                <span class="hljs-keyword">if</span>(notice.onClose) notice.onClose();
            };

            result.push(
                &lt;Notice <span class="hljs-built_in">key</span>={notice.<span class="hljs-built_in">key</span>} {...notice} onClose={closeCallback} /&gt;
            );
        });

        <span class="hljs-keyword">return</span> result;
    }
    getMaskDOM () {
        <span class="hljs-keyword">const</span> {notices, hasMask} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-comment">// notices为空的时候 不显示蒙版</span>
        <span class="hljs-comment">// 始终只有一个蒙版</span>
        <span class="hljs-keyword">if</span>(notices.length &gt; <span class="hljs-number">0</span> &amp;&amp; hasMask == <span class="hljs-keyword">true</span>) <span class="hljs-keyword">return</span> &lt;div className=<span class="hljs-string">"zby-mask"</span>&gt;&lt;/div&gt;;
    }
    render () {
        <span class="hljs-keyword">const</span> noticesDOM = <span class="hljs-keyword">this</span>.getNoticeDOM();
        <span class="hljs-keyword">const</span> maskDOM = <span class="hljs-keyword">this</span>.getMaskDOM();

        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">"zby-notification-box"</span>&gt;
                {maskDOM}
                {noticesDOM}
            &lt;/div&gt;
        )
    }
}

<span class="hljs-comment">// 统计notice总数 防止重复</span>
let noticeNumber = <span class="hljs-number">0</span>;

<span class="hljs-comment">// 生成唯一的id</span>
<span class="hljs-keyword">const</span> getUuid = () =&gt; {
    <span class="hljs-keyword">return</span> <span class="hljs-string">"notification-"</span> + <span class="hljs-keyword">new</span> Date().getTime() + <span class="hljs-string">"-"</span> + noticeNumber++;
};

<span class="hljs-comment">// Notification增加一个重写方法</span>
<span class="hljs-comment">// 该方法方便Notification组件动态添加到页面中和重写</span>
Notification.reWrite = function (properties) {
    <span class="hljs-keyword">const</span> { ...props } = properties || {};

    let div;

    div = document.createElement(<span class="hljs-string">'div'</span>);
    document.body.appendChild(div);

    <span class="hljs-keyword">const</span> notification = ReactDOM.render(&lt;Notification {...props} /&gt;, div);

    <span class="hljs-keyword">return</span> {
        notice(noticeProps) {
            notification.<span class="hljs-built_in">add</span>(noticeProps);
        },
        removeNotice(<span class="hljs-built_in">key</span>) {
            notification.remove(<span class="hljs-built_in">key</span>);
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div);
            document.body.removeChild(div);
        },
        component: notification
    }
};

export <span class="hljs-keyword">default</span> Notification</code></pre>
<p>看了Notification其实谜团就解开了，Notice其实就是根据notices中的notice渲染出来的组件，Toast其实就是调用Notification.reWrite返回结果的集合。</p>
<h1 id="articleHeader5">Notice开发</h1>
<p>这时候在写Notice就简单了，其props有几个关键的参数duration就是Notice显示几秒，content就是其显示的具体内容，onClose就是该销毁时候执行的回调函数。<br>这里面控制Notice显示几秒，实际上是用定时器setTimeout实现的，onClose实际上就是在父组件Notification中将自己对应的notice删除。<br>Notice代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Notice是Toast最底层组件
// 每个黑色的小框框其实都是一个Notice
// Notice核心就是组件初始化的时候 生成一个定时器
// 根据输入的时间 加载一个动画 然后执行输入的回调
// Notice的显示和隐藏收到父组件Notification的绝对控制
import React from 'react'
import classNames from 'classnames'

class Notice extends React.Component {
    static propTypes = {
        duration: React.PropTypes.number, // Notice显示时间
        content: React.PropTypes.any, // Notice显示的内容
        onClose: React.PropTypes.func // 显示结束回调
    };
    static defaultProps = {
        duration: 3000,
    };
    constructor (props) {
        super(props);
        this.state = {
            shouldClose: false, // 是否开启关闭动画
        }
    }
    componentDidMount () {
        if(this.props.duration > 0){
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration - 300); // 减掉消失动画300毫秒
        }
    }
    componentWillUnmount () {
        // 当有意外关闭的时候 清掉定时器
        this.clearCloseTimer();
    }
    clearCloseTimer () {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer);
            this.closeTimer = null;
        }
    }
    close () {
        // 关闭的时候 应该先清掉倒数定时器
        // 然后开启过场动画
        // 等待动画结束 执行回调
        this.clearCloseTimer();
        const _this = this;
        _this.setState({shouldClose: true});
        this.timer = setTimeout(()=>{
            if(this.props.onClose){
                this.props.onClose();
            }
            clearTimeout(_this.timer);
        }, 300);
    }
    render () {
        const {shouldClose} = this.state;

        return (
            <div className={classNames(['zby-notice-box', {'leave': shouldClose}])}>
                {this.props.content}
            </div>
        )
    }
}

export default Notice" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Notice是Toast最底层组件</span>
<span class="hljs-comment">// 每个黑色的小框框其实都是一个Notice</span>
<span class="hljs-comment">// Notice核心就是组件初始化的时候 生成一个定时器</span>
<span class="hljs-comment">// 根据输入的时间 加载一个动画 然后执行输入的回调</span>
<span class="hljs-comment">// Notice的显示和隐藏收到父组件Notification的绝对控制</span>
<span class="hljs-keyword">import</span> React from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> classNames from <span class="hljs-string">'classnames'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Notice</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    static propTypes = {
        duration: React.PropTypes.number, <span class="hljs-comment">// Notice显示时间</span>
        content: React.PropTypes.any, <span class="hljs-comment">// Notice显示的内容</span>
        onClose: React.PropTypes.func <span class="hljs-comment">// 显示结束回调</span>
    };
    static defaultProps = {
        duration: <span class="hljs-number">3000</span>,
    };
    <span class="hljs-keyword">constructor</span> (props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            shouldClose: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 是否开启关闭动画</span>
        }
    }
    componentDidMount () {
        <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.props.duration &gt; <span class="hljs-number">0</span>){
            <span class="hljs-keyword">this</span>.closeTimer = setTimeout(() =&gt; {
                <span class="hljs-keyword">this</span>.close();
            }, <span class="hljs-keyword">this</span>.props.duration - <span class="hljs-number">300</span>); <span class="hljs-comment">// 减掉消失动画300毫秒</span>
        }
    }
    componentWillUnmount () {
        <span class="hljs-comment">// 当有意外关闭的时候 清掉定时器</span>
        <span class="hljs-keyword">this</span>.clearCloseTimer();
    }
    clearCloseTimer () {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.closeTimer) {
            clearTimeout(<span class="hljs-keyword">this</span>.closeTimer);
            <span class="hljs-keyword">this</span>.closeTimer = <span class="hljs-literal">null</span>;
        }
    }
    close () {
        <span class="hljs-comment">// 关闭的时候 应该先清掉倒数定时器</span>
        <span class="hljs-comment">// 然后开启过场动画</span>
        <span class="hljs-comment">// 等待动画结束 执行回调</span>
        <span class="hljs-keyword">this</span>.clearCloseTimer();
        const _this = <span class="hljs-keyword">this</span>;
        _this.setState({shouldClose: <span class="hljs-literal">true</span>});
        <span class="hljs-keyword">this</span>.timer = setTimeout(()=&gt;{
            <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.props.onClose){
                <span class="hljs-keyword">this</span>.props.onClose();
            }
            clearTimeout(_this.timer);
        }, <span class="hljs-number">300</span>);
    }
    render () {
        const {shouldClose} = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">return</span> (
            &lt;div className={classNames([<span class="hljs-string">'zby-notice-box'</span>, {<span class="hljs-string">'leave'</span>: shouldClose}])}&gt;
                {<span class="hljs-keyword">this</span>.props.content}
            &lt;/div&gt;
        )
    }
}

export <span class="hljs-keyword">default</span> Notice</code></pre>
<h1 id="articleHeader6">Toast封装</h1>
<p>最后看下Toast就比较简单了。<br>Toast首先就是要利用Notification.reWrite初始化一个newNotification，并且保持这个Notification为单例。<br>然后封装一个notice方法，动态的改变这个newNotification。<br>最后封装几个常用notice方法暴露出去。<br>Toast代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import classNames from 'classnames'
import Notification from './Notification'

// Toast组件比较特殊
// 因为<Toast />不会被直接渲染在DOM中
// 而是动态插入页面中
// Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification
let newNotification;

// 获得一个Notification
const getNewNotification = () => {
    // 单例 保持页面始终只有一个Notification
    if (!newNotification) {
        newNotification = Notification.reWrite();
    }

    return newNotification;
};

// notice方法实际上就是集合参数 完成对Notification的改变
const notice = (content, type, icon, duration = 3000, onClose, mask = true) => {
    let notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        mask: mask,
        content: !!icon ? (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }>
                <div className=&quot;zby-toast-icon&quot;><i className={&quot;fa &quot; + icon}></i></div>
                <div className=&quot;zby-toast-content&quot;>{content}</div>
            </div>
        ) : (
            <div className={
                classNames(['zby-toast-box',
                    {'info': type === 'info'},
                    {'success': type === 'success'},
                    {'warning': type === 'warning'},
                    {'error': type === 'error'}
                ])
            }>
                <div className=&quot;zby-toast-content&quot;>{content}</div>
            </div>
        ),
        onClose: () => {
            if (onClose) onClose();
        },
    });
};

export default {
    // 无动画
    show(content, duration, icon, mask, onClose) {
        return notice(content, undefined, icon, duration, onClose, mask);
    },
    // 翻转效果
    info(content, duration, icon, mask, onClose) {
        return notice(content, 'info', icon, duration, onClose, mask);
    },
    // 缩放效果
    success(content, duration, icon, mask, onClose) {
        return notice(content, 'success', icon, duration, onClose, mask);
    },
    // 从下方滑入
    warning(content, duration, icon, mask, onClose) {
        return notice(content, 'warning', icon, duration, onClose, mask);
    },
    // 抖动
    error(content, duration, icon, mask, onClose) {
        return notice(content, 'error', icon, duration, onClose, mask);
    },
    // 销毁
    hide() {
        if (newNotification) {
            newNotification.destroy();
            newNotification = null;
        }
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> classNames <span class="hljs-keyword">from</span> <span class="hljs-string">'classnames'</span>
<span class="hljs-keyword">import</span> Notification <span class="hljs-keyword">from</span> <span class="hljs-string">'./Notification'</span>

<span class="hljs-comment">// Toast组件比较特殊</span>
<span class="hljs-comment">// 因为&lt;Toast /&gt;不会被直接渲染在DOM中</span>
<span class="hljs-comment">// 而是动态插入页面中</span>
<span class="hljs-comment">// Toast组件核心就是通过Notification暴露的重写方法 动态改变Notification</span>
<span class="hljs-keyword">let</span> newNotification;

<span class="hljs-comment">// 获得一个Notification</span>
<span class="hljs-keyword">const</span> getNewNotification = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-comment">// 单例 保持页面始终只有一个Notification</span>
    <span class="hljs-keyword">if</span> (!newNotification) {
        newNotification = Notification.reWrite();
    }

    <span class="hljs-keyword">return</span> newNotification;
};

<span class="hljs-comment">// notice方法实际上就是集合参数 完成对Notification的改变</span>
<span class="hljs-keyword">const</span> notice = <span class="hljs-function">(<span class="hljs-params">content, type, icon, duration = <span class="hljs-number">3000</span>, onClose, mask = <span class="hljs-literal">true</span></span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> notificationInstance = getNewNotification();

    notificationInstance.notice({
        duration,
        <span class="hljs-attr">mask</span>: mask,
        <span class="hljs-attr">content</span>: !!icon ? (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>
                <span class="hljs-attr">classNames</span>(['<span class="hljs-attr">zby-toast-box</span>',
                    {'<span class="hljs-attr">info</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'info'</span>},
                    {'<span class="hljs-attr">success</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'success'</span>},
                    {'<span class="hljs-attr">warning</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'warning'</span>},
                    {'<span class="hljs-attr">error</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'error'</span>}
                ])
            }&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-toast-icon"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>"<span class="hljs-attr">fa</span> " + <span class="hljs-attr">icon</span>}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-toast-content"</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        ) : (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>
                <span class="hljs-attr">classNames</span>(['<span class="hljs-attr">zby-toast-box</span>',
                    {'<span class="hljs-attr">info</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'info'</span>},
                    {'<span class="hljs-attr">success</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'success'</span>},
                    {'<span class="hljs-attr">warning</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'warning'</span>},
                    {'<span class="hljs-attr">error</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">type</span> === <span class="hljs-string">'error'</span>}
                ])
            }&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-toast-content"</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        ),
        <span class="hljs-attr">onClose</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">if</span> (onClose) onClose();
        },
    });
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 无动画</span>
    show(content, duration, icon, mask, onClose) {
        <span class="hljs-keyword">return</span> notice(content, <span class="hljs-literal">undefined</span>, icon, duration, onClose, mask);
    },
    <span class="hljs-comment">// 翻转效果</span>
    info(content, duration, icon, mask, onClose) {
        <span class="hljs-keyword">return</span> notice(content, <span class="hljs-string">'info'</span>, icon, duration, onClose, mask);
    },
    <span class="hljs-comment">// 缩放效果</span>
    success(content, duration, icon, mask, onClose) {
        <span class="hljs-keyword">return</span> notice(content, <span class="hljs-string">'success'</span>, icon, duration, onClose, mask);
    },
    <span class="hljs-comment">// 从下方滑入</span>
    warning(content, duration, icon, mask, onClose) {
        <span class="hljs-keyword">return</span> notice(content, <span class="hljs-string">'warning'</span>, icon, duration, onClose, mask);
    },
    <span class="hljs-comment">// 抖动</span>
    error(content, duration, icon, mask, onClose) {
        <span class="hljs-keyword">return</span> notice(content, <span class="hljs-string">'error'</span>, icon, duration, onClose, mask);
    },
    <span class="hljs-comment">// 销毁</span>
    hide() {
        <span class="hljs-keyword">if</span> (newNotification) {
            newNotification.destroy();
            newNotification = <span class="hljs-literal">null</span>;
        }
    },
}</code></pre>
<p>这样Toast，一个在React中动态插入删除DOM的组件完成了。</p>
<h1 id="articleHeader7">总结</h1>
<p>这里的Toast，Notification和Notice都是参照antd-mobile源码改写的，这种组件暴露方法给别人调用的场景，和动态插入DOM场景平时不多见，借助其源码也是一次学习。</p>
<h1 id="articleHeader8">参考链接</h1>
<ol>
<li><p><a href="https://github.com/Aus0049/react-component/blob/master/src/containers/Feedback/ToastPage.js" rel="nofollow noreferrer" target="_blank">项目源码</a></p></li>
<li><p><a href="https://mobile.ant.design/components/toast-cn/" rel="nofollow noreferrer" target="_blank">antd-mobile</a></p></li>
<li><p><a href="https://github.com/react-component/notification" rel="nofollow noreferrer" target="_blank">react-component</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React实现Toast（提示）效果

## 原文链接
[https://segmentfault.com/a/1190000009863702](https://segmentfault.com/a/1190000009863702)

