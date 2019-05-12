---
title: 'flutter笔记8：实战聊天页面嵌入交互动画和IOS风格适配' 
date: 2018-12-10 2:30:07
hidden: true
slug: df7x1upzgv6
categories: [reprint]
---

{{< raw >}}

                    
<p>熟悉了flutter的各种控件和相互嵌套的代码结构后，可以再加深一点难度：加入动画特效。</p>
<p>虽然flutter的内置Metarial控件已经封装好了符合其设计语言的动画特效，使开发者节约了不少视觉处理上的精力，比如点击或长按listTile控件时自带水波纹动画、页面切换时切入向上或向下的动画、列表上拉或下拉到尽头有回弹波纹等。flutter也提供了用户可自定义的动画处理方案，使产品交互更加生动亲切、富有情趣。</p>
<p>Flutter中封装了包含有值和状态（如向前，向后，完成和退出）的<a href="https://docs.flutter.io/flutter/animation/Animation-class.html" rel="nofollow noreferrer" target="_blank">Animation</a>对象。把<code>Animation</code>对象附加到控件中或直接监听动画对象属性， Flutter会根据对<code>Animation</code>对象属性的变化，修改控件的呈现效果并重新构建控件树。</p>
<p>这次，敲一个APP的聊天页面，试试加入<code>Animation</code>后的效果，再尝试APP根据运行的操作系统进行风格适配。</p>
<h2 id="articleHeader0">第一步 构建一个聊天界面</h2>
<p>先创建一个新项目：</p>
<blockquote>flutter create chatPage</blockquote>
<p>进入<strong>main.dart</strong>，贴入如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/material.dart';
//程序入口
void main() {
  runApp(new FriendlychatApp());
}

const String _name = &quot;CYC&quot;;    //聊天帐号昵称

class FriendlychatApp extends StatelessWidget {
 @override
 Widget build(BuildContext context) {
    return new MaterialApp(        //创建一个MaterialApp控件对象，其下可塞入支持Material设计语言特性的控件
      title: &quot;Friendlychat&quot;,
      home: new ChatScreen(),    //主页面为用户自定义ChatScreen控件
    );
  }
}

//单条聊天信息控件
class ChatMessage extends StatelessWidget {
  ChatMessage({this.text});
  final String text;
  @override
  Widget build(BuildContext context) {
    return new Container(
      margin: const EdgeInsets.symmetric(vertical: 10.0),
      child: new Row(                                   //聊天记录的头像和文本信息横向排列
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          new Container(
            margin: const EdgeInsets.only(right: 16.0),
            child: new CircleAvatar(child: new Text(_name[0])),      //显示头像圆圈
          ),
          new Column(                                    //单条消息记录，昵称和消息内容垂直排列
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              new Text(_name, style: Theme.of(context).textTheme.subhead),    //昵称
              new Container(
                margin: const EdgeInsets.only(top: 5.0),
                child: new Text(text),                    //消息文字
              ),
            ],
          ),
        ],
      ),
    );
  }
}

//聊天主页面ChatScreen控件定义为一个有状态控件
class ChatScreen extends StatefulWidget {
  @override
  State createState() => new ChatScreenState();   //ChatScreenState作为控制ChatScreen控件状态的子类
}

//ChatScreenState状态中实现聊天内容的动态更新
class ChatScreenState extends State<ChatScreen> {
  final List<ChatMessage> _messages = <ChatMessage>[];    //存放聊天记录的数组，数组类型为无状态控件ChatMessage
  final TextEditingController _textController = new TextEditingController();    //聊天窗口的文本输入控件

  //定义发送文本事件的处理函数
  void _handleSubmitted(String text) {
    _textController.clear();        //清空输入框
    ChatMessage message = new ChatMessage(    //定义新的消息记录控件对象
      text: text,
    );
    //状态变更，向聊天记录中插入新记录
    setState(() {
      _messages.insert(0, message);      //插入新的消息记录
    });
  }

  //定义文本输入框控件
  Widget _buildTextComposer() {
   return new Container(
       margin: const EdgeInsets.symmetric(horizontal: 8.0),  
       child: new Row(                    //文本输入和发送按钮都在同一行，使用Row控件包裹实现
          children: <Widget>[
            new Flexible(                    
              child: new TextField( 
                controller: _textController,              //载入文本输入控件
                onSubmitted: _handleSubmitted, 
                decoration: new InputDecoration.collapsed(hintText: &quot;Send a message&quot;),      //输入框中默认提示文字
              ),
            ),
            new Container(
              margin: new EdgeInsets.symmetric(horizontal: 4.0),
              child: new IconButton(            //发送按钮
                icon: new Icon(Icons.send),    //发送按钮图标
                onPressed: () => _handleSubmitted(_textController.text)),      //触发发送消息事件执行的函数_handleSubmitted
           ),
         ]
       )
    );
  }
  //定义整个聊天窗口的页面元素布局
  Widget build(BuildContext context) {
    return new Scaffold(              //页面脚手架
      appBar: new AppBar(title: new Text(&quot;Friendlychat&quot;)),      //页面标题
      body: new Column(             //Column使消息记录和消息输入框垂直排列
        children: <Widget>[
        new Flexible(                     //子控件可柔性填充，如果下方弹出输入框，使消息记录列表可适当缩小高度
          child: new ListView.builder(        //可滚动显示的消息列表
            padding: new EdgeInsets.all(8.0),
            reverse: true,                  //反转排序，列表信息从下至上排列
            itemBuilder: (_, int index) => _messages[index],    //插入聊天信息控件
            itemCount: _messages.length,
          )
        ),
        new Divider(height: 1.0),      //聊天记录和输入框之间的分隔
        new Container(
          decoration: new BoxDecoration(
            color: Theme.of(context).cardColor),
          child: _buildTextComposer(),        //页面下方的文本输入控件
        ),
       ]
     ),
   );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-symbol">'package</span>:flutter/material.dart';
<span class="hljs-comment">//程序入口</span>
void main() {
  runApp(<span class="hljs-keyword">new</span> <span class="hljs-type">FriendlychatApp</span>());
}

const <span class="hljs-type">String</span> _name = <span class="hljs-string">"CYC"</span>;    <span class="hljs-comment">//聊天帐号昵称</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FriendlychatApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
 <span class="hljs-meta">@override</span>
 <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">MaterialApp</span>(        <span class="hljs-comment">//创建一个MaterialApp控件对象，其下可塞入支持Material设计语言特性的控件</span>
      title: <span class="hljs-string">"Friendlychat"</span>,
      home: <span class="hljs-keyword">new</span> <span class="hljs-type">ChatScreen</span>(),    <span class="hljs-comment">//主页面为用户自定义ChatScreen控件</span>
    );
  }
}

<span class="hljs-comment">//单条聊天信息控件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-type">ChatMessage</span>({<span class="hljs-keyword">this</span>.text});
  <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> text;
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
      margin: const <span class="hljs-type">EdgeInsets</span>.symmetric(vertical: <span class="hljs-number">10.0</span>),
      child: <span class="hljs-keyword">new</span> <span class="hljs-type">Row</span>(                                   <span class="hljs-comment">//聊天记录的头像和文本信息横向排列</span>
        crossAxisAlignment: <span class="hljs-type">CrossAxisAlignment</span>.start,
        children: &lt;<span class="hljs-type">Widget</span>&gt;[
          <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
            margin: const <span class="hljs-type">EdgeInsets</span>.only(right: <span class="hljs-number">16.0</span>),
            child: <span class="hljs-keyword">new</span> <span class="hljs-type">CircleAvatar</span>(child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(_name[<span class="hljs-number">0</span>])),      <span class="hljs-comment">//显示头像圆圈</span>
          ),
          <span class="hljs-keyword">new</span> <span class="hljs-type">Column</span>(                                    <span class="hljs-comment">//单条消息记录，昵称和消息内容垂直排列</span>
            crossAxisAlignment: <span class="hljs-type">CrossAxisAlignment</span>.start,
            children: &lt;<span class="hljs-type">Widget</span>&gt;[
              <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(_name, style: <span class="hljs-type">Theme</span>.of(context).textTheme.subhead),    <span class="hljs-comment">//昵称</span>
              <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
                margin: const <span class="hljs-type">EdgeInsets</span>.only(top: <span class="hljs-number">5.0</span>),
                child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(text),                    <span class="hljs-comment">//消息文字</span>
              ),
            ],
          ),
        ],
      ),
    );
  }
}

<span class="hljs-comment">//聊天主页面ChatScreen控件定义为一个有状态控件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatScreen</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatefulWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">State</span> createState() =&gt; <span class="hljs-keyword">new</span> <span class="hljs-type">ChatScreenState</span>();   <span class="hljs-comment">//ChatScreenState作为控制ChatScreen控件状态的子类</span>
}

<span class="hljs-comment">//ChatScreenState状态中实现聊天内容的动态更新</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatScreenState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;ChatScreen&gt;</span> </span>{
  <span class="hljs-keyword">final</span> <span class="hljs-type">List</span>&lt;<span class="hljs-type">ChatMessage</span>&gt; _messages = &lt;<span class="hljs-type">ChatMessage</span>&gt;[];    <span class="hljs-comment">//存放聊天记录的数组，数组类型为无状态控件ChatMessage</span>
  <span class="hljs-keyword">final</span> <span class="hljs-type">TextEditingController</span> _textController = <span class="hljs-keyword">new</span> <span class="hljs-type">TextEditingController</span>();    <span class="hljs-comment">//聊天窗口的文本输入控件</span>

  <span class="hljs-comment">//定义发送文本事件的处理函数</span>
  void _handleSubmitted(<span class="hljs-type">String</span> text) {
    _textController.clear();        <span class="hljs-comment">//清空输入框</span>
    <span class="hljs-type">ChatMessage</span> message = <span class="hljs-keyword">new</span> <span class="hljs-type">ChatMessage</span>(    <span class="hljs-comment">//定义新的消息记录控件对象</span>
      text: text,
    );
    <span class="hljs-comment">//状态变更，向聊天记录中插入新记录</span>
    setState(() {
      _messages.insert(<span class="hljs-number">0</span>, message);      <span class="hljs-comment">//插入新的消息记录</span>
    });
  }

  <span class="hljs-comment">//定义文本输入框控件</span>
  <span class="hljs-type">Widget</span> _buildTextComposer() {
   <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
       margin: const <span class="hljs-type">EdgeInsets</span>.symmetric(horizontal: <span class="hljs-number">8.0</span>),  
       child: <span class="hljs-keyword">new</span> <span class="hljs-type">Row</span>(                    <span class="hljs-comment">//文本输入和发送按钮都在同一行，使用Row控件包裹实现</span>
          children: &lt;<span class="hljs-type">Widget</span>&gt;[
            <span class="hljs-keyword">new</span> <span class="hljs-type">Flexible</span>(                    
              child: <span class="hljs-keyword">new</span> <span class="hljs-type">TextField</span>( 
                controller: _textController,              <span class="hljs-comment">//载入文本输入控件</span>
                onSubmitted: _handleSubmitted, 
                decoration: <span class="hljs-keyword">new</span> <span class="hljs-type">InputDecoration</span>.collapsed(hintText: <span class="hljs-string">"Send a message"</span>),      <span class="hljs-comment">//输入框中默认提示文字</span>
              ),
            ),
            <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
              margin: <span class="hljs-keyword">new</span> <span class="hljs-type">EdgeInsets</span>.symmetric(horizontal: <span class="hljs-number">4.0</span>),
              child: <span class="hljs-keyword">new</span> <span class="hljs-type">IconButton</span>(            <span class="hljs-comment">//发送按钮</span>
                icon: <span class="hljs-keyword">new</span> <span class="hljs-type">Icon</span>(<span class="hljs-type">Icons</span>.send),    <span class="hljs-comment">//发送按钮图标</span>
                onPressed: () =&gt; _handleSubmitted(_textController.text)),      <span class="hljs-comment">//触发发送消息事件执行的函数_handleSubmitted</span>
           ),
         ]
       )
    );
  }
  <span class="hljs-comment">//定义整个聊天窗口的页面元素布局</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Scaffold</span>(              <span class="hljs-comment">//页面脚手架</span>
      appBar: <span class="hljs-keyword">new</span> <span class="hljs-type">AppBar</span>(title: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(<span class="hljs-string">"Friendlychat"</span>)),      <span class="hljs-comment">//页面标题</span>
      body: <span class="hljs-keyword">new</span> <span class="hljs-type">Column</span>(             <span class="hljs-comment">//Column使消息记录和消息输入框垂直排列</span>
        children: &lt;<span class="hljs-type">Widget</span>&gt;[
        <span class="hljs-keyword">new</span> <span class="hljs-type">Flexible</span>(                     <span class="hljs-comment">//子控件可柔性填充，如果下方弹出输入框，使消息记录列表可适当缩小高度</span>
          child: <span class="hljs-keyword">new</span> <span class="hljs-type">ListView</span>.builder(        <span class="hljs-comment">//可滚动显示的消息列表</span>
            padding: <span class="hljs-keyword">new</span> <span class="hljs-type">EdgeInsets</span>.all(<span class="hljs-number">8.0</span>),
            reverse: <span class="hljs-literal">true</span>,                  <span class="hljs-comment">//反转排序，列表信息从下至上排列</span>
            itemBuilder: (_, int index) =&gt; _messages[index],    <span class="hljs-comment">//插入聊天信息控件</span>
            itemCount: _messages.length,
          )
        ),
        <span class="hljs-keyword">new</span> <span class="hljs-type">Divider</span>(height: <span class="hljs-number">1.0</span>),      <span class="hljs-comment">//聊天记录和输入框之间的分隔</span>
        <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
          decoration: <span class="hljs-keyword">new</span> <span class="hljs-type">BoxDecoration</span>(
            color: <span class="hljs-type">Theme</span>.of(context).cardColor),
          child: _buildTextComposer(),        <span class="hljs-comment">//页面下方的文本输入控件</span>
        ),
       ]
     ),
   );
  }
}
</code></pre>
<p>运行上面的代码，可以看到这个聊天窗口已经生成，并且可以实现文本输入和发送了：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712305" src="https://static.alili.tech/img/remote/1460000013712305" alt="没有加入动画的聊天窗口" title="没有加入动画的聊天窗口" style="cursor: pointer; display: inline;"></span></p>
<p>如上图标注的控件，最终通过放置在状态对象<code>ChatScreenState</code>控件中的<code>Scaffold</code>脚手架完成安置，小伙伴可以输入一些文本，点击发送按钮试试<code>ListView</code>控件发生的变化。</p>
<p>当发送按钮<code>IconButton</code>触发<strong>onPressed</strong>事件后调用<code>_handleSubmitted</code>函数，在<code>_handleSubmitted</code>中执行了<code>setState()</code>方法，此时flutter根据<code>setState()</code>中的变量<code>_messages</code>变更重新渲染<code>_messages</code>对象，然后大家就可以看到消息记录框<code>ListView</code>中底部新增了一行消息。</p>
<p>由于<code>ListView</code>中的每一行都是瞬间添加完成，没有过度动画，使交互显得非常生硬，因此向<code>ListView</code>中的每个<strong>Item</strong>的加入添加动画效果，提升一下交互体验。</p>
<h2 id="articleHeader1">第二步 消息记录加入动效</h2>
<ul><li><h3 id="articleHeader2">改造<code>ChatScreen</code>控件</h3></li></ul>
<p>要让主页面<code>ChatScreen</code>支持动效，要在它的定义中附加mixin类型的对象<code>TickerProviderStateMixin</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ChatScreenState extends State<ChatScreen> with TickerProviderStateMixin { // modified
  final List<ChatMessage> _messages = <ChatMessage>[];
  final TextEditingController _textController = new TextEditingController();
  ...
  }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatScreenState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;ChatScreen&gt;</span> <span class="hljs-keyword">with</span> <span class="hljs-title">TickerProviderStateMixin</span> </span>{ <span class="hljs-comment">// modified</span>
  <span class="hljs-keyword">final</span> <span class="hljs-type">List</span>&lt;<span class="hljs-type">ChatMessage</span>&gt; _messages = &lt;<span class="hljs-type">ChatMessage</span>&gt;[];
  <span class="hljs-keyword">final</span> <span class="hljs-type">TextEditingController</span> _textController = <span class="hljs-keyword">new</span> <span class="hljs-type">TextEditingController</span>();
  ...
  }
</code></pre>
<ul><li><h3 id="articleHeader3">向ChatMessage中植入动画控制器控制动画效果</h3></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ChatMessage extends StatelessWidget {
  ChatMessage({this.text, this.animationController});        //new 加入动画控制器对象
  final String text;
  final AnimationController animationController;
  @override
  Widget build(BuildContext context) {
    return new SizeTransition(             //new  用SizeTransition动效控件包裹整个控件，定义从小变大的动画效果
      sizeFactor: new CurvedAnimation(                              //new  CurvedAnimation定义动画播放的时间曲线
        parent: animationController, curve: Curves.easeOut),      //new  指定曲线类型
      axisAlignment: 0.0,                                           //new  对齐
      child: new Container(                                    //modified  Container控件被包裹到SizeTransition中
        margin: const EdgeInsets.symmetric(vertical: 10.0),
          child: new Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
            new Container(
              margin: const EdgeInsets.only(right: 16.0),
              child: new CircleAvatar(child: new Text(_name[0])),
            ),
            new Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
              new Text(_name, style: Theme.of(context).textTheme.subhead),
              new Container(
                margin: const EdgeInsets.only(top: 5.0),
                child: new Text(text),
              ),
            ],
          ),
        ],
      ),
    )                                                           //new
  );
}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-type">ChatMessage</span>({<span class="hljs-keyword">this</span>.text, <span class="hljs-keyword">this</span>.animationController});        <span class="hljs-comment">//new 加入动画控制器对象</span>
  <span class="hljs-keyword">final</span> <span class="hljs-type">String</span> text;
  <span class="hljs-keyword">final</span> <span class="hljs-type">AnimationController</span> animationController;
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">SizeTransition</span>(             <span class="hljs-comment">//new  用SizeTransition动效控件包裹整个控件，定义从小变大的动画效果</span>
      sizeFactor: <span class="hljs-keyword">new</span> <span class="hljs-type">CurvedAnimation</span>(                              <span class="hljs-comment">//new  CurvedAnimation定义动画播放的时间曲线</span>
        parent: animationController, curve: <span class="hljs-type">Curves</span>.easeOut),      <span class="hljs-comment">//new  指定曲线类型</span>
      axisAlignment: <span class="hljs-number">0.0</span>,                                           <span class="hljs-comment">//new  对齐</span>
      child: <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(                                    <span class="hljs-comment">//modified  Container控件被包裹到SizeTransition中</span>
        margin: const <span class="hljs-type">EdgeInsets</span>.symmetric(vertical: <span class="hljs-number">10.0</span>),
          child: <span class="hljs-keyword">new</span> <span class="hljs-type">Row</span>(
            crossAxisAlignment: <span class="hljs-type">CrossAxisAlignment</span>.start,
            children: &lt;<span class="hljs-type">Widget</span>&gt;[
            <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
              margin: const <span class="hljs-type">EdgeInsets</span>.only(right: <span class="hljs-number">16.0</span>),
              child: <span class="hljs-keyword">new</span> <span class="hljs-type">CircleAvatar</span>(child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(_name[<span class="hljs-number">0</span>])),
            ),
            <span class="hljs-keyword">new</span> <span class="hljs-type">Column</span>(
              crossAxisAlignment: <span class="hljs-type">CrossAxisAlignment</span>.start,
              children: &lt;<span class="hljs-type">Widget</span>&gt;[
              <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(_name, style: <span class="hljs-type">Theme</span>.of(context).textTheme.subhead),
              <span class="hljs-keyword">new</span> <span class="hljs-type">Container</span>(
                margin: const <span class="hljs-type">EdgeInsets</span>.only(top: <span class="hljs-number">5.0</span>),
                child: <span class="hljs-keyword">new</span> <span class="hljs-type">Text</span>(text),
              ),
            ],
          ),
        ],
      ),
    )                                                           <span class="hljs-comment">//new</span>
  );
}
}
</code></pre>
<ul><li><h3 id="articleHeader4">修改_handleSubmitted()处理函数</h3></li></ul>
<p>由于ChatMessage对象的构造函数中添加了动画控制器对象animationController，因此创建新ChatMessage对象时也需要加入animationController的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void _handleSubmitted(String text) {
  _textController.clear();
  ChatMessage message = new ChatMessage(
    text: text,
    animationController: new AnimationController(                  //new
      duration: new Duration(milliseconds: 700),                   //new  动画持续时间
      vsync: this,                                                 //new  默认属性和参数
    ),                                                             //new
  );                                                               //new
  setState(() {
    _messages.insert(0, message);
  });
  message.animationController.forward();                           //new  启动动画
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">void</span> _handleSubmitted(<span class="hljs-keyword">String</span> <span class="hljs-built_in">text</span>) {
  _textController.<span class="hljs-built_in">clear</span>();
  ChatMessage message = <span class="hljs-keyword">new</span> ChatMessage(
    <span class="hljs-built_in">text</span>: <span class="hljs-built_in">text</span>,
    animationController: <span class="hljs-keyword">new</span> AnimationController(                  <span class="hljs-comment">//new</span>
      duration: <span class="hljs-keyword">new</span> Duration(milliseconds: <span class="hljs-number">700</span>),                   <span class="hljs-comment">//new  动画持续时间</span>
      vsync: <span class="hljs-keyword">this</span>,                                                 <span class="hljs-comment">//new  默认属性和参数</span>
    ),                                                             <span class="hljs-comment">//new</span>
  );                                                               <span class="hljs-comment">//new</span>
  setState(() {
    _messages.insert(<span class="hljs-number">0</span>, message);
  });
  message.animationController.forward();                           <span class="hljs-comment">//new  启动动画</span>
}
</code></pre>
<ul><li><h3 id="articleHeader5">释放控件</h3></li></ul>
<p>由于附加了动效的控件比较耗费内存，当不需要用到此页面时最好释放掉这些控件，Flutter会在复杂页面中自动调用<code>dispose()</code>释放冗余的对象，玩家可以通过重写<code>dispose()</code>指定页面中需要释放的内容，当然由于本案例只有这一个页面，因此Flutter不会自动执行到<code>dispose()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@override
void dispose() {                                                   //new
  for (ChatMessage message in _messages)                           //new  遍历_messages数组
    message.animationController.dispose();                         //new  释放动效
  super.dispose();                                                 //new
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>@<span class="hljs-keyword">override</span>
<span class="hljs-keyword">void</span> dispose() {                                                   <span class="hljs-comment">//new</span>
  <span class="hljs-keyword">for</span> (ChatMessage message <span class="hljs-keyword">in</span> _messages)                           <span class="hljs-comment">//new  遍历_messages数组</span>
    message.animationController.dispose();                         <span class="hljs-comment">//new  释放动效</span>
  <span class="hljs-keyword">super</span>.dispose();                                                 <span class="hljs-comment">//new</span>
} 
</code></pre>
<p>按上面的代码改造完后，用<strong>R</strong>而不是<strong>r</strong>重启一下APP，可以把之前没有加入动效的ChatMessage对象清除掉，使整体显示效果更和谐。这时候试试点击发送按钮后的效果吧~</p>
<ul>
<li>可以通过调整在<code>_handleSubmitted</code>中<code>AnimationController</code>对象的<code>Duration</code>函数参数值（单位：毫秒），改变动效持续时间。</li>
<li>可通过改变<code>CurvedAnimation</code>对象的<code>curve</code>参数值，改变动效时间曲线（和CSS的贝塞尔曲线类似），参数值可参考<a href="http://docs.flutter.io/flutter/animation/Curves-class.html" rel="nofollow noreferrer" target="_blank"><strong>Curves</strong></a>
</li>
<li>可以尝试使用<a href="https://docs.flutter.io/flutter/widgets/FadeTransition-class.html" rel="nofollow noreferrer" target="_blank"><strong>FadeTransition</strong></a>替代<a href="https://docs.flutter.io/flutter/widgets/SizeTransition-class.html" rel="nofollow noreferrer" target="_blank"><strong>SizeTransition</strong></a>，试试动画效果如何</li>
</ul>
<p>实现了消息列表的滑动，但是这个聊天窗口还有很多问题，比如输入框的文本只能横向增加不会自动换行，可以空字符发送消息等，接下来就修复这些交互上的BUG，顺便再复习下setState()的用法。</p>
<h2 id="articleHeader6">第三步 优化交互</h2>
<ul><li><h3 id="articleHeader7">杜绝发送空字符</h3></li></ul>
<p>当<code>TextField</code>控件中的文本正在被编辑时，会触发<strong>onChanged</strong>事件，我们通过这个事件检查文本框中是否有字符串，如果没有则点击发送按钮失效，如果有则可以发送消息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ChatScreenState extends State<ChatScreen> with TickerProviderStateMixin {
  final List<ChatMessage> _messages = <ChatMessage>[];
  final TextEditingController _textController = new TextEditingController();
  bool _isComposing = false;                                      //new  到ChatScreenState对象中定义一个标志位
  ...
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ChatScreenState</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">State&lt;ChatScreen&gt;</span> <span class="hljs-keyword">with</span> <span class="hljs-title">TickerProviderStateMixin</span> </span>{
  <span class="hljs-keyword">final</span> <span class="hljs-type">List</span>&lt;<span class="hljs-type">ChatMessage</span>&gt; _messages = &lt;<span class="hljs-type">ChatMessage</span>&gt;[];
  <span class="hljs-keyword">final</span> <span class="hljs-type">TextEditingController</span> _textController = <span class="hljs-keyword">new</span> <span class="hljs-type">TextEditingController</span>();
  bool _isComposing = <span class="hljs-literal">false</span>;                                      <span class="hljs-comment">//new  到ChatScreenState对象中定义一个标志位</span>
  ...
}
</code></pre>
<p>向文本输入控件_buildTextComposer中加入这个标志位的控制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Widget _buildTextComposer() {
  return new IconTheme(
    data: new IconThemeData(color: Theme.of(context).accentColor),
    child: new Container(
      margin: const EdgeInsets.symmetric(horizontal: 8.0),
      child: new Row(
        children: <Widget>[
          new Flexible(
            child: new TextField(
              controller: _textController,
              onChanged: (String text) {          //new  通过onChanged事件更新_isComposing 标志位的值
                setState(() {                     //new  调用setState函数重新渲染受到_isComposing变量影响的IconButton控件
                  _isComposing = text.length > 0; //new  如果文本输入框中的字符串长度大于0则允许发送消息
                });                               //new
              },                                  //new
              onSubmitted: _handleSubmitted,
              decoration:
                  new InputDecoration.collapsed(hintText: &quot;Send a message&quot;),
            ),
          ),
          new Container(
            margin: new EdgeInsets.symmetric(horizontal: 4.0),
            child: new IconButton(
              icon: new Icon(Icons.send),
              onPressed: _isComposing
                  ? () => _handleSubmitted(_textController.text)    //modified
                  : null,                             //modified  当没有为onPressed绑定处理函数时，IconButton默认为禁用状态
            ),
          ),
        ],
      ),
    ),
  );
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">Widget</span> <span class="hljs-selector-tag">_buildTextComposer</span>() {
  <span class="hljs-selector-tag">return</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">IconTheme</span>(
    <span class="hljs-attribute">data</span>: new IconThemeData(<span class="hljs-attribute">color</span>: Theme.of(context).accentColor),
    <span class="hljs-attribute">child</span>: new Container(
      <span class="hljs-attribute">margin</span>: const EdgeInsets.symmetric(<span class="hljs-attribute">horizontal</span>: <span class="hljs-number">8.0</span>),
      <span class="hljs-attribute">child</span>: new Row(
        <span class="hljs-attribute">children</span>: &lt;Widget&gt;[
          new Flexible(
            <span class="hljs-attribute">child</span>: new TextField(
              <span class="hljs-attribute">controller</span>: _textController,
              <span class="hljs-attribute">onChanged</span>: (String text) {          <span class="hljs-comment">//new  通过onChanged事件更新_isComposing 标志位的值</span>
                setState(() {                     <span class="hljs-comment">//new  调用setState函数重新渲染受到_isComposing变量影响的IconButton控件</span>
                  _isComposing = text.length &gt; <span class="hljs-number">0</span>; <span class="hljs-comment">//new  如果文本输入框中的字符串长度大于0则允许发送消息</span>
                });                               <span class="hljs-comment">//new</span>
              },                                  <span class="hljs-comment">//new</span>
              <span class="hljs-attribute">onSubmitted</span>: _handleSubmitted,
              <span class="hljs-attribute">decoration</span>:
                  new InputDecoration.collapsed(<span class="hljs-attribute">hintText</span>: <span class="hljs-string">"Send a message"</span>),
            ),
          ),
          new Container(
            <span class="hljs-attribute">margin</span>: new EdgeInsets.symmetric(<span class="hljs-attribute">horizontal</span>: <span class="hljs-number">4.0</span>),
            <span class="hljs-attribute">child</span>: new IconButton(
              <span class="hljs-attribute">icon</span>: new Icon(Icons.send),
              <span class="hljs-attribute">onPressed</span>: _isComposing
                  ? () =&gt; _handleSubmitted(_textController.text)    <span class="hljs-comment">//modified</span>
                  : null,                             <span class="hljs-comment">//modified  当没有为onPressed绑定处理函数时，IconButton默认为禁用状态</span>
            ),
          ),
        ],
      ),
    ),
  );
}
</code></pre>
<p>当点击发送按钮后，重置标志位为false：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void _handleSubmitted(String text) {
  _textController.clear();
  setState(() {                                                    //new  你们懂的
    _isComposing = false;                                          //new  重置_isComposing 值
  });                                                              //new
  ChatMessage message = new ChatMessage(
    text: text,
    animationController: new AnimationController(
      duration: new Duration(milliseconds: 700),
      vsync: this,
    ),
  );
  setState(() {
    _messages.insert(0, message);
  });
  message.animationController.forward();
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">void</span> _handleSubmitted(<span class="hljs-keyword">String</span> <span class="hljs-built_in">text</span>) {
  _textController.<span class="hljs-built_in">clear</span>();
  setState(() {                                                    <span class="hljs-comment">//new  你们懂的</span>
    _isComposing = <span class="hljs-keyword">false</span>;                                          <span class="hljs-comment">//new  重置_isComposing 值</span>
  });                                                              <span class="hljs-comment">//new</span>
  ChatMessage message = <span class="hljs-keyword">new</span> ChatMessage(
    <span class="hljs-built_in">text</span>: <span class="hljs-built_in">text</span>,
    animationController: <span class="hljs-keyword">new</span> AnimationController(
      duration: <span class="hljs-keyword">new</span> Duration(milliseconds: <span class="hljs-number">700</span>),
      vsync: <span class="hljs-keyword">this</span>,
    ),
  );
  setState(() {
    _messages.insert(<span class="hljs-number">0</span>, message);
  });
  message.animationController.forward();
}
</code></pre>
<p>这时候热更新一下，再发送一条消息试试：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712306" src="https://static.alili.tech/img/remote/1460000013712306" alt="禁止发送空文本" title="禁止发送空文本" style="cursor: pointer; display: inline;"></span></p>
<ul><li><h3 id="articleHeader8">自动换行</h3></li></ul>
<p>当发送的文本消息超出一行时，会看到以下效果：<br><span class="img-wrap"><img data-src="/img/remote/1460000013712307" src="https://static.alili.tech/img/remote/1460000013712307" alt="无法自动换行" title="无法自动换行" style="cursor: pointer; display: inline;"></span></p>
<p>遇到这种情况，使用<code>Expanded</code>控件包裹一下ChatMessage的消息内容区域即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

new Expanded(                                               //new  Expanded控件
  child: new Column(                                   //modified  Column被Expanded包裹起来，使其内部文本可自动换行
    crossAxisAlignment: CrossAxisAlignment.start,
    children: <Widget>[
      new Text(_name, style: Theme.of(context).textTheme.subhead),
      new Container(
        margin: const EdgeInsets.only(top: 5.0),
        child: new Text(text),
      ),
    ],
  ),
),                                                          //new

...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vhdl"><code>...

<span class="hljs-keyword">new</span> Expanded(                                               //<span class="hljs-keyword">new</span>  Expanded控件
  child: <span class="hljs-keyword">new</span> Column(                                   //modified  Column被Expanded包裹起来，使其内部文本可自动换行
    crossAxisAlignment: CrossAxisAlignment.start,
    children: &lt;Widget&gt;[
      <span class="hljs-keyword">new</span> <span class="hljs-literal">Text</span>(_name, style: Theme.<span class="hljs-keyword">of</span>(<span class="hljs-keyword">context</span>).textTheme.subhead),
      <span class="hljs-keyword">new</span> Container(
        margin: const EdgeInsets.only(top: <span class="hljs-number">5.0</span>),
        child: <span class="hljs-keyword">new</span> <span class="hljs-literal">Text</span>(<span class="hljs-literal">text</span>),
      ),
    ],
  ),
),                                                          //<span class="hljs-keyword">new</span>

...
</code></pre>
<h2 id="articleHeader9">第四步 IOS和安卓风格适配</h2>
<p>flutter虽然可以一套代码生成安卓和IOS的APP，但是这两者有着各自的设计语言：Material和Cupertino。因此为了让APP能够更好的融合进对应的系统设计语言，我们要对页面中的控件进行一些处理。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013712308" src="https://static.alili.tech/img/remote/1460000013712308" alt="Cupertino和Material的设计风格" title="Cupertino和Material的设计风格" style="cursor: pointer;"></span></p>
<ul><li><h3 id="articleHeader10">引入IOS控件库：</h3></li></ul>
<p>前面已经引入<strong>Material.dart</strong>控件库，但还缺少了IOS的Cupertino控件库，因此在<strong>main.dart</strong>的头部中引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/cupertino.dart'; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'package:flutter/cupertino.dart';</span> 
</code></pre>
<ul><li><h3 id="articleHeader11">定义Material和Cupertino的主题风格</h3></li></ul>
<p>Material为默认主题，当检测到APP运行在IOS时使用Cupertino主题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="final ThemeData kIOSTheme = new ThemeData(    //Cupertino主题风格
  primarySwatch: Colors.orange,
  primaryColor: Colors.grey[100],
  primaryColorBrightness: Brightness.light,
);

final ThemeData kDefaultTheme = new ThemeData(    //默认的Material主题风格
  primarySwatch: Colors.purple,
  accentColor: Colors.orangeAccent[400],
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>final ThemeData kIOSTheme = new ThemeData(    <span class="hljs-comment">//Cupertino主题风格</span>
<span class="hljs-symbol">  primarySwatch:</span> Colors.orange,
<span class="hljs-symbol">  primaryColor:</span> Colors.grey[<span class="hljs-number">100</span>],
<span class="hljs-symbol">  primaryColorBrightness:</span> Brightness.light,
);

final ThemeData kDefaultTheme = new ThemeData(    <span class="hljs-comment">//默认的Material主题风格</span>
<span class="hljs-symbol">  primarySwatch:</span> Colors.purple,
<span class="hljs-symbol">  accentColor:</span> Colors.orangeAccent[<span class="hljs-number">400</span>],
);
</code></pre>
<ul><li><h3 id="articleHeader12">根据运行的操作系统判断对应的主题：</h3></li></ul>
<p>首先要引入一个用于识别操作系统的工具库，其内的defaultTargetPlatform值可帮助我们识别操作系统：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import 'package:flutter/foundation.dart';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-meta"><span class="hljs-meta-keyword">import</span> 'package:flutter/foundation.dart';</span>
</code></pre>
<p>到程序的入口控件<code>FriendlychatApp</code>中应用对应的操作系统主题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class FriendlychatApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: &quot;Friendlychat&quot;,
      theme: defaultTargetPlatform == TargetPlatform.iOS         //newdefaultTargetPlatform用于识别操作系统
        ? kIOSTheme                                              //new
        : kDefaultTheme,                                         //new
      home: new ChatScreen(),
    );
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FriendlychatApp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">StatelessWidget</span> </span>{
  <span class="hljs-meta">@override</span>
  <span class="hljs-type">Widget</span> build(<span class="hljs-type">BuildContext</span> context) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">MaterialApp</span>(
      title: <span class="hljs-string">"Friendlychat"</span>,
      theme: defaultTargetPlatform == <span class="hljs-type">TargetPlatform</span>.iOS         <span class="hljs-comment">//newdefaultTargetPlatform用于识别操作系统</span>
        ? kIOSTheme                                              <span class="hljs-comment">//new</span>
        : kDefaultTheme,                                         <span class="hljs-comment">//new</span>
      home: <span class="hljs-keyword">new</span> <span class="hljs-type">ChatScreen</span>(),
    );
  }
}
</code></pre>
<ul><li><h3 id="articleHeader13">页面标题的风格适配</h3></li></ul>
<p>页面顶部显示Friendlychat的标题栏的下方，在IOS的Cupertino设计语言中没有阴影，与下面的应用主体通过一条灰色的线分隔开，而Material则通过标题栏下方的阴影达到这一效果，因此将两种特性应用到代码中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   // Modify the build() method of the ChatScreenState class.
   Widget build(BuildContext context) {
      return new Scaffold(
        appBar: new AppBar(
          title: new Text(&quot;Friendlychat&quot;),
          elevation: Theme.of(context).platform == TargetPlatform.iOS ? 0.0 : 4.0),    //new  适配IOS的扁平化无阴影效果
          body: new Container(                    //modified    使用Container控件，方便加入主题风格装饰
            child: new Column(                      //modified
              children: <Widget>[
                new Flexible(
                  child: new ListView.builder(
                    padding: new EdgeInsets.all(8.0),
                    reverse: true,
                    itemBuilder: (_, int index) => _messages[index],
                    itemCount: _messages.length,
                  ),
                ),
              new Divider(height: 1.0),
              new Container(
              decoration: new BoxDecoration(color: Theme.of(context).cardColor),
              child: _buildTextComposer(),
            ),
          ],
        ),
          decoration: Theme.of(context).platform == TargetPlatform.iOS //new    加入主题风格
        ? new BoxDecoration(                                     //new
            border: new Border(                                  //new  为适应IOS加入边框特性
              top: new BorderSide(color: Colors.grey[200]),      //new  顶部加入灰色边框
            ),                                                   //new
          )                                                      //new
        : null),                                                 //modified  
      );
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>   // Modify the build() <span class="hljs-built_in">method</span> of the ChatScreenState class.
   Widget build(BuildContext <span class="hljs-built_in">context</span>) {
      <span class="hljs-built_in">return</span> <span class="hljs-built_in">new</span> Scaffold(
        appBar: <span class="hljs-built_in">new</span> AppBar(
          <span class="hljs-built_in">title</span>: <span class="hljs-built_in">new</span> Text(<span class="hljs-string">"Friendlychat"</span>),
          <span class="hljs-built_in">elevation</span>: Theme.of(<span class="hljs-built_in">context</span>).platform == TargetPlatform.iOS ? <span class="hljs-number">0.0</span> : <span class="hljs-number">4.0</span>),    //<span class="hljs-built_in">new</span>  适配IOS的扁平化无阴影效果
          body: <span class="hljs-built_in">new</span> Container(                    //modified    使用Container控件，方便加入主题风格装饰
            child: <span class="hljs-built_in">new</span> Column(                      //modified
              children: &lt;Widget&gt;[
                <span class="hljs-built_in">new</span> Flexible(
                  child: <span class="hljs-built_in">new</span> ListView.builder(
                    padding: <span class="hljs-built_in">new</span> EdgeInsets.all(<span class="hljs-number">8.0</span>),
                    <span class="hljs-built_in">reverse</span>: <span class="hljs-literal">true</span>,
                    itemBuilder: (<span class="hljs-symbol">_</span>, int index) =&gt; _messages[index],
                    itemCount: _messages.<span class="hljs-built_in">length</span>,
                  ),
                ),
              <span class="hljs-built_in">new</span> Divider(<span class="hljs-built_in">height</span>: <span class="hljs-number">1.0</span>),
              <span class="hljs-built_in">new</span> Container(
              decoration: <span class="hljs-built_in">new</span> BoxDecoration(<span class="hljs-built_in">color</span>: Theme.of(<span class="hljs-built_in">context</span>).cardColor),
              child: _buildTextComposer(),
            ),
          ],
        ),
          decoration: Theme.of(<span class="hljs-built_in">context</span>).platform == TargetPlatform.iOS //<span class="hljs-built_in">new</span>    加入主题风格
        ? <span class="hljs-built_in">new</span> BoxDecoration(                                     //<span class="hljs-built_in">new</span>
            <span class="hljs-built_in">border</span>: <span class="hljs-built_in">new</span> Border(                                  //<span class="hljs-built_in">new</span>  为适应IOS加入边框特性
              top: <span class="hljs-built_in">new</span> BorderSide(<span class="hljs-built_in">color</span>: Colors.grey[<span class="hljs-number">200</span>]),      //<span class="hljs-built_in">new</span>  顶部加入灰色边框
            ),                                                   //<span class="hljs-built_in">new</span>
          )                                                      //<span class="hljs-built_in">new</span>
        : null),                                                 //modified  
      );
    }
</code></pre>
<ul><li><h3 id="articleHeader14">发送按钮的风格适配</h3></li></ul>
<p>发送按钮在APP遇到IOS时，使用Cupertino风格的按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Modify the _buildTextComposer method.

new Container(
   margin: new EdgeInsets.symmetric(horizontal: 4.0),
   child: Theme.of(context).platform == TargetPlatform.iOS ?  //modified
   new CupertinoButton(                              //new  使用Cupertino控件库的CupertinoButton控件作为IOS端的发送按钮
     child: new Text(&quot;Send&quot;),                         //new
     onPressed: _isComposing                                  //new
         ? () =>  _handleSubmitted(_textController.text)      //new
         : null,) :                                           //new
   new IconButton(                                            //modified
       icon: new Icon(Icons.send),
       onPressed: _isComposing ?
           () =>  _handleSubmitted(_textController.text) : null,
       )
   ),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code><span class="hljs-comment">// Modify the _buildTextComposer method.</span>

<span class="hljs-keyword">new</span> Container(
   margin: <span class="hljs-keyword">new</span> EdgeInsets.symmetric(horizontal: 4.0),
   child: Theme.of(context).platform == TargetPlatform.iOS ?  //modified
   <span class="hljs-keyword">new</span> CupertinoButton(                              //<span class="hljs-keyword">new</span>  使用Cupertino控件库的CupertinoButton控件作为IOS端的发送按钮
     child: <span class="hljs-keyword">new</span> Text(<span class="hljs-string">"Send"</span>),                         //<span class="hljs-keyword">new</span>
     onPressed: _isComposing                                  //<span class="hljs-keyword">new</span>
         ? () =&gt;  _handleSubmitted(_textController.text)      //<span class="hljs-keyword">new</span>
         : <span class="hljs-keyword">null</span>,) :                                           //<span class="hljs-keyword">new</span>
   <span class="hljs-keyword">new</span> IconButton(                                            //modified
       icon: <span class="hljs-keyword">new</span> Icon(Icons.send),
       onPressed: _isComposing ?
           () =&gt;  _handleSubmitted(_textController.text) : <span class="hljs-keyword">null</span>,
       )
   ),
</code></pre>
<p>总结一下，为控件加入动画效果，就是把控件用动画控件包裹起来实现目的。动画控件有很多种，今天只选用了一个大小变化的控件<code>SizeTransition</code>作为示例，由于每种动画控件内部的属性不同，都需要单独配置，大家可<a href="https://docs.flutter.io/flutter/widgets/AnimatedWidget-class.html" rel="nofollow noreferrer" target="_blank">参考官网</a>了解这些动画控件的详情。</p>
<p>除此之外为了适应不同操作系统的设计语言，用到了IOS的控件库和操作系统识别的控件库，这是跨平台开发中常用的功能。</p>
<p>好啦，flutter的入门笔记到本篇就结束了，今后将更新flutter的进阶篇和实战，由于近期工作任务较重，加上日常还有跟前端大神<a href="https://segmentfault.com/u/feihu">狐神</a>学习<strong>golang</strong>的任务，以后的更新会比较慢，因此也欢迎大家到我的<a href="https://www.jianshu.com/c/ebc9d2e84214" rel="nofollow noreferrer" target="_blank">Flutter圈子</a>中投稿，分享自己的成果，把这个专题热度搞起来，赶上谷歌这次跨平台的小火车，也可以加入<strong>flutter 中文社区（官方QQ群：338252156）</strong>共同成长，谢谢大家~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flutter笔记8：实战聊天页面嵌入交互动画和IOS风格适配

## 原文链接
[https://segmentfault.com/a/1190000013712300](https://segmentfault.com/a/1190000013712300)

