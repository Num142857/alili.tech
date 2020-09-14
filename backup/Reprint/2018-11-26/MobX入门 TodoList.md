---
title: 'MobX入门 TodoList' 
date: 2018-11-26 2:30:09
hidden: true
slug: kbzmdm6n1tq
categories: [reprint]
---

{{< raw >}}
<blockquote>one more time one more chance. &#x4E00;&#x6B69;&#x91CD;&#x5934;&#x5B66;&#x524D;&#x7AEF;, MobX&#x5165;&#x95E8;&#x3002;</blockquote><p>MobX&#x7528;&#x4E8E;&#x7B80;&#x5355;&#x3001;&#x53EF;&#x6269;&#x5C55;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;&#x901A;&#x5E38;&#x642D;&#x914D; React &#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x4E0D;&#x53EA;&#x9650;&#x4E8E; React&#x3002;&#x5982;&#x4F55;&#x4F60;&#x538C;&#x70E6;&#x4E86; Redux &#x7E41;&#x6742;&#x7684;&#x6A21;&#x677F;&#x4EE3;&#x7801;&#x548C; API&#xFF0C;&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#x5C1D;&#x8BD5;&#x4E0B; MobX&#x3002;&#x7F51;&#x4E0A;&#x597D;&#x50CF;&#x6D41;&#x4F20;&#xFF1A; Redux &#x662F;&#x8C01;&#x7528;&#x8C01;&#x52A0;&#x73ED;&#x1F602;&#x3002;</p><h2 id="articleHeader0">&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5E93;&#x7684;&#x533A;&#x522B;</h2><p>&#x7F51;&#x4E0A;&#x67D0;&#x4F4D;&#x5927;&#x725B;&#x7684; ppt, &#x94FE;&#x63A5;&#x6709;&#x673A;&#x4F1A;&#x518D;&#x8865;&#x4E0A;&#x3002;&#x6B64;&#x5904;&#x7684;<code>&#x81EA;&#x5DF1;</code>&#x4E3A;&#x5E93;&#x7684;&#x5F00;&#x53D1;&#x8005;&#xFF0C;<code>&#x522B;&#x4EBA;</code>&#x662F;&#x6307;&#x5E93;&#x7684;&#x4F7F;&#x7528;&#x8005;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x6211;&#x7B49;&#x7801;&#x519C;&#x3002;</p><ol><li>MobX&#x6076;&#x5FC3;&#x81EA;&#x5DF1;&#xFF0C;&#x6210;&#x5168;&#x522B;&#x4EBA;</li><li>Redux&#x6210;&#x5168;&#x81EA;&#x5DF1;&#xFF0C;&#x6076;&#x5FC3;&#x522B;&#x4EBA;</li><li>Rxjs&#x6076;&#x5FC3;&#x81EA;&#x5DF1;&#xFF0C;&#x4E5F;&#x6076;&#x5FC3;&#x522B;&#x4EBA;</li></ol><blockquote>&#x7528;&#x4E00;&#x53E5;&#x8BDD;&#x6982;&#x62EC; MobX: &#x8FFD;&#x8E2A;&#x4F60;&#x7684;&#x6539;&#x53D8;&#xFF0C;&#x5E76;&#x4E3A;&#x4E4B;&#x505A;&#x51FA;&#x54CD;&#x5E94;&#x3002;</blockquote><h2 id="articleHeader1">&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x642D;&#x5EFA;</h2><p>Step 1: <code>npx create-react-app mobx-todo-list</code>&#x521B;&#x5EFA;&#x9879;&#x76EE;</p><p>Step 2: <code>npm install -S mobx mobx-react</code>&#x5B89;&#x88C5; mobx &#x7684;&#x76F8;&#x5173;&#x4F9D;&#x8D56;</p><p>Step 3: &#x4F7F;create-react-app &#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x652F;&#x6301;&#x88C5;&#x9970;&#x5668;&#x8BED;&#x6CD5;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run eject
npm install --save-dev babel-plugin-transform-decorators-legacy" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> eject
</span>npm install --save-dev babel-plugin-transform-decorators-legacy</code></pre><p>Step 4: &#x4FEE;&#x6539;&#x914D;&#x7F6E;&#x6587;&#x4EF6;package.json</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;babel&quot;: {
    &quot;plugins&quot;: [
        &quot;transform-decorators-legacy&quot;
    ],
    &quot;presets&quot;: [
        &quot;react-app&quot;
    ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json"><span class="hljs-string">&quot;babel&quot;</span>: {
    <span class="hljs-attr">&quot;plugins&quot;</span>: [
        <span class="hljs-string">&quot;transform-decorators-legacy&quot;</span>
    ],
    <span class="hljs-attr">&quot;presets&quot;</span>: [
        <span class="hljs-string">&quot;react-app&quot;</span>
    ]
}</code></pre><h2 id="articleHeader2">&#x521B;&#x5EFA; App &#x7684; store</h2><p>Mobx &#x4E2D;&#x521B;&#x5EFA; store &#x7684;&#x5E38;&#x89C1;&#x5173;&#x952E;&#x5B57;&#x5982;&#x4E0B;&#xFF1A; <code>observable</code> <code>computed</code> <code>action</code>&#x3002;<br><code>observable</code>&#x7528;&#x6765;&#x58F0;&#x660E;&#x53EF;&#x89C2;&#x5BDF;&#x7684;&#x6570;&#x636E;&#x3001;<code>computed</code>&#x662F;&#x58F0;&#x660E;&#x53EF;&#x89C2;&#x5BDF;&#x6570;&#x636E;&#x7684;&#x6F14;&#x53D8;&#x6570;&#x636E;&#xFF0C;&#x548C; observable &#x5177;&#x6709;&#x540C;&#x7B49;&#x5730;&#x4F4D;&#xFF0C;<code>action</code> &#x7528;&#x6765;&#x6539;&#x53D8;<code>observable</code>&#x6570;&#x636E;&#xFF0C;&#x4F46;&#x662F; <code>action</code> &#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x5176;&#x662F;&#x8F83;&#x597D;&#x7684;&#x7EA6;&#x5B9A;&#xFF0C;&#x6700;&#x597D;&#x9075;&#x5FAA;&#x3002;&#x5728; mobx &#x7A0B;&#x5E8F;&#x4E2D;&#x4F7F;&#x7528;<code>class</code>&#x3001;<code>&#x88C5;&#x9970;&#x5668;</code>&#x662F;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x56E0;&#x6B64;&#x6211;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x4E5F;&#x4F7F;&#x7528;&#x88C5;&#x9970;&#x5668;&#x5B9E;&#x73B0;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observable, computed, action} from &apos;mobx&apos;;

class Todo {
    // &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; TODO &#x9879;&#x76EE;&#x7684;&#x7C7B;&#xFF0C;id &#x662F;&#x968F;&#x673A;&#x6570;&#xFF0C;&#x6CA1;&#x6709;&#x4F7F;&#x7528;@observable &#x88C5;&#x9970;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x53EA;&#x8BFB;&#x7684;
    id = Math.random();
    // todo &#x7684; title &#x53CA;&#x5B8C;&#x6210;&#x72B6;&#x6001; finished &#x662F;&#x53EF;&#x88AB;&#x89C2;&#x5BDF;&#x53CA;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x540C;&#x65F6; finished &#x7684;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x4E3A; false
    @observable title;
    @observable finished = false;
    // &#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x6536;tile
    constructor(title) {
        this.title = title;
    }
}

// TODO List &#x7C7B;
class TodoList {
    // &#x53EF;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5F85;&#x529E;&#x9879; todos
    @observable todos = [];
    // &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x91CD;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027; todos &#x884D;&#x751F;&#x51FA;&#x6765;&#xFF0C;&#x8FD4;&#x56DE;&#x6CA1;&#x6709;&#x5B8C;&#x6210;&#x7684;&#x5F85;&#x529E;&#x9879;&#x7684;&#x4E2A;&#x6570;
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo =&gt; !todo.finished).length;
    }
    // &#x52A8;&#x4F5C;&#x7528;&#x6765;&#x66F4;&#x65B0; todos &#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF0C;&#x6DFB;&#x52A0;&#x5F85;&#x529E;&#x9879;
    @action
    addTodo = title =&gt; {
        if (!title) return;
        this.todos.push(new Todo(title));
    }
}

// &#x6211;&#x4EEC;&#x521B;&#x5EFA;TodoList &#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x624B;&#x52A8;&#x7684;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5F85;&#x529E;&#x9879;&#xFF0C;&#x6B64;&#x5904;&#x7684; store &#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#xFF0C;&#x5728;&#x5C06;&#x5176;&#x5F15;&#x7528;&#x66B4;&#x9732;&#x51FA;&#x53BB;
const store = new TodoList();
store.todos.push(new Todo(&apos;Get Coffee&apos;), new Todo(&apos;Write blog&apos;));
store.todos[0].finished = true;

export default store;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {observable, computed, action} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mobx&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Todo</span> </span>{
    <span class="hljs-comment">// &#x5B9A;&#x4E49;&#x4E00;&#x4E2A; TODO &#x9879;&#x76EE;&#x7684;&#x7C7B;&#xFF0C;id &#x662F;&#x968F;&#x673A;&#x6570;&#xFF0C;&#x6CA1;&#x6709;&#x4F7F;&#x7528;@observable &#x88C5;&#x9970;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x53EA;&#x8BFB;&#x7684;</span>
    id = <span class="hljs-built_in">Math</span>.random();
    <span class="hljs-comment">// todo &#x7684; title &#x53CA;&#x5B8C;&#x6210;&#x72B6;&#x6001; finished &#x662F;&#x53EF;&#x88AB;&#x89C2;&#x5BDF;&#x53CA;&#x66F4;&#x65B0;&#x7684;&#xFF0C;&#x540C;&#x65F6; finished &#x7684;&#x521D;&#x59CB;&#x72B6;&#x6001;&#x4E3A; false</span>
    @observable title;
    @observable finished = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// &#x6784;&#x9020;&#x51FD;&#x6570;&#x63A5;&#x6536;tile</span>
    <span class="hljs-keyword">constructor</span>(title) {
        <span class="hljs-keyword">this</span>.title = title;
    }
}

<span class="hljs-comment">// TODO List &#x7C7B;</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoList</span> </span>{
    <span class="hljs-comment">// &#x53EF;&#x88AB;&#x89C2;&#x5BDF;&#x7684;&#x5F85;&#x529E;&#x9879; todos</span>
    @observable todos = [];
    <span class="hljs-comment">// &#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF0C;&#x91CD;&#x53EF;&#x89C2;&#x5BDF;&#x5C5E;&#x6027; todos &#x884D;&#x751F;&#x51FA;&#x6765;&#xFF0C;&#x8FD4;&#x56DE;&#x6CA1;&#x6709;&#x5B8C;&#x6210;&#x7684;&#x5F85;&#x529E;&#x9879;&#x7684;&#x4E2A;&#x6570;</span>
    @computed get unfinishedTodoCount() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.todos.filter(<span class="hljs-function"><span class="hljs-params">todo</span> =&gt;</span> !todo.finished).length;
    }
    <span class="hljs-comment">// &#x52A8;&#x4F5C;&#x7528;&#x6765;&#x66F4;&#x65B0; todos &#x5C5E;&#x6027;&#x7684;&#x503C;&#xFF0C;&#x6DFB;&#x52A0;&#x5F85;&#x529E;&#x9879;</span>
    @action
    addTodo = <span class="hljs-function"><span class="hljs-params">title</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (!title) <span class="hljs-keyword">return</span>;
        <span class="hljs-keyword">this</span>.todos.push(<span class="hljs-keyword">new</span> Todo(title));
    }
}

<span class="hljs-comment">// &#x6211;&#x4EEC;&#x521B;&#x5EFA;TodoList &#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x624B;&#x52A8;&#x7684;&#x6DFB;&#x52A0;&#x4E24;&#x4E2A;&#x5F85;&#x529E;&#x9879;&#xFF0C;&#x6B64;&#x5904;&#x7684; store &#x5BF9;&#x8C61;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x662F;&#x4E00;&#x4E2A;&#x5355;&#x4F8B;&#xFF0C;&#x5728;&#x5C06;&#x5176;&#x5F15;&#x7528;&#x66B4;&#x9732;&#x51FA;&#x53BB;</span>
<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> TodoList();
store.todos.push(<span class="hljs-keyword">new</span> Todo(<span class="hljs-string">&apos;Get Coffee&apos;</span>), <span class="hljs-keyword">new</span> Todo(<span class="hljs-string">&apos;Write blog&apos;</span>));
store.todos[<span class="hljs-number">0</span>].finished = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> store;</code></pre><h2 id="articleHeader3">&#x5B9E;&#x73B0;&#x76D1;&#x542C;&#x6570;&#x636E;&#x7684;&#x7EC4;&#x4EF6;</h2><p><code>Provider</code>&#x3001;<code>observer</code>&#x3001;<code>inject</code>&#x5747;&#x4E3A;&#x662F;mobx-react&#x63D0;&#x4F9B;&#x3002;<br><code>Provider</code>&#x4EE5;&#x7EC4;&#x4EF6;&#x7684;&#x5F62;&#x5F0F;&#x5B58;&#x5728;&#xFF0C;&#x7528;&#x6765;&#x5305;&#x88F9;&#x6700;&#x5916;&#x5C42;&#x7EC4;&#x4EF6;&#x8282;&#x70B9;&#xFF0C;&#x5E76;&#x4E14;&#x4F20;&#x5165; store&#xFF08;&#x901A;&#x8FC7;&#xFF09;context &#x4F20;&#x9012;&#x7ED9;&#x540E;&#x4EE3;&#x7EC4;&#x4EF6;&#x3002;<br>&#x4F7F;&#x7528;<code>@observer</code>&#x88C5;&#x9970;&#x7684;react&#x7EC4;&#x4EF6;&#x5C06;&#x8F6C;&#x6362;&#x6210;&#x4E00;&#x4E2A;&#x76D1;&#x542C;&#x8005;&#xFF0C;&#x5F53;@observable &#x4FEE;&#x9970;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#xFF0C;react&#x7EC4;&#x4EF6;&#x5C31;&#x4F1A;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x3002;<br><code>@inject</code>&#x4E3A;&#x4E86;&#x4F7F;&#x88AB;&#x88C5;&#x9970;&#x7684;&#x7EC4;&#x4EF6;&#x4EE5; props &#x7684;&#x5F62;&#x5F0F;&#x83B7;&#x53D6;&#x5230; Provider &#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x6570;&#x636E;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observer, inject} from &apos;mobx-react&apos;;
const TodoView = ({todo}) =&gt; (
    &lt;li&gt;
        &lt;input
            type=&quot;checkbox&quot;
            checked={todo.finished}
            // &#x6B64;&#x5904;&#x7684; onChange &#x5E76;&#x672A;&#x9075;&#x5FAA; action &#x7684;&#x7EA6;&#x5B9A;&#xFF0C;&#x8FDB;&#x4E00;&#x6B65;&#x8BC1;&#x660E;&#x4E86;&#x76F4;&#x63A5;&#x66F4;&#x65B0; store &#x7684;&#x6570;&#x636E;&#x4E5F;&#x662F;&#x53EF;&#x884C;&#x7684;
            onChange={() =&gt; {todo.finished = !todo.finished;"}}"
        /&gt;
        {todo.title}
    &lt;/li&gt;
)

@inject(&apos;todolist&apos;)
@observer
export default class TodoListView extends Component {
    state = {
        title: &apos;&apos;
    }
    changeTitle = e =&gt; {
        let title = e.target.value;
        this.setState({title});
    }
    // &#x8C03;&#x7528; store &#x4E2D;&#x7684; addTodoaction &#x66F4;&#x65B0; store &#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;
    submit = () =&gt; {
        this.props.todolist.addTodo(this.state.title);
    }
    render() {
        return (
            &lt;div&gt;
                &lt;input type=&quot;text&quot; value={this.state.title} onChange={this.changeTitle} /&gt;
                &lt;button onClick={this.submit}&gt;submit&lt;/button&gt;
                &lt;ul&gt;
                    {this.props.todolist.todos.map(todo =&gt; (
                        &lt;TodoView todo={todo} key={todo.id} /&gt;
                    ))}
                &lt;/ul&gt;
                Tasks left: {this.props.todolist.unfinishedTodoCount}
            &lt;/div&gt;
        );
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> {observer, inject} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mobx-react&apos;</span>;
<span class="hljs-keyword">const</span> TodoView = <span class="hljs-function">(<span class="hljs-params">{todo}</span>) =&gt;</span> (
    &lt;li&gt;
        &lt;input
            type=&quot;checkbox&quot;
            checked={todo.finished}
            // &#x6B64;&#x5904;&#x7684; onChange &#x5E76;&#x672A;&#x9075;&#x5FAA; action &#x7684;&#x7EA6;&#x5B9A;&#xFF0C;&#x8FDB;&#x4E00;&#x6B65;&#x8BC1;&#x660E;&#x4E86;&#x76F4;&#x63A5;&#x66F4;&#x65B0; store &#x7684;&#x6570;&#x636E;&#x4E5F;&#x662F;&#x53EF;&#x884C;&#x7684;
            onChange={() =&gt; {todo.finished = !todo.finished;"}}"
        /&gt;
        {todo.title}
    &lt;/li&gt;
)

@inject(&apos;todolist&apos;)
@observer
export default class TodoListView extends Component {
    state = {
        title: &apos;&apos;
    }
    changeTitle = e =&gt; {
        let title = e.target.value;
        this.setState({title});
    }
    // &#x8C03;&#x7528; store &#x4E2D;&#x7684; addTodoaction &#x66F4;&#x65B0; store &#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;
    submit = () =&gt; {
        this.props.todolist.addTodo(this.state.title);
    }
    render() {
        return (
            &lt;div&gt;
                &lt;input type=&quot;text&quot; value={this.state.title} onChange={this.changeTitle} /&gt;
                &lt;button onClick={this.submit}&gt;submit&lt;/button&gt;
                &lt;ul&gt;
                    {this.props.todolist.todos.map(todo =&gt; (
                        &lt;TodoView todo={todo} key={todo.id} /&gt;
                    ))}
                &lt;/ul&gt;
                Tasks left: {this.props.todolist.unfinishedTodoCount}
            &lt;/div&gt;
        );
    }
}</code></pre><h2 id="articleHeader4">&#x901A;&#x8FC7; Provider &#x5C06;&#x6570;&#x636E;&#x4F20;&#x9012;&#x7ED9;&#x7EC4;&#x4EF6;&#x6811;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import TodoListView from &apos;./TodoListView&apos;;
import store from &apos;./store&apos;;
import {Provider} from &apos;mobx-react&apos;;

export default class App extends Component {
  // &#x5C06; store &#x4F20;&#x7ED9; Provider
  render() {
    return (
      &lt;Provider todolist={store}&gt;
        &lt;TodoListView /&gt;
      &lt;/Provider&gt;
    );
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> TodoListView <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./TodoListView&apos;</span>;
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>;
<span class="hljs-keyword">import</span> {Provider} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mobx-react&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// &#x5C06; store &#x4F20;&#x7ED9; Provider</span>
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">todolist</span>=<span class="hljs-string">{store}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">TodoListView</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>
    );
  }
};
</code></pre><p>&#x9879;&#x76EE;&#x5B8C;&#x6574;&#x4EE3;&#x7801;<a href="https://github.com/xiyuanyuan/mobx-todo-list" rel="nofollow noreferrer" target="_blank">mobx-todo-list</a></p><p><span class="img-wrap"><img data-src="/img/bVbcI5A?w=446&amp;h=286" src="https://static.alili.tech/img/bVbcI5A?w=446&amp;h=286" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader5">Other</h2><p>Todo list &#x5B9E;&#x73B0;&#x5B8C;&#x6210;&#xFF0C;&#x7406;&#x8BBA;&#x8BB2;&#x89E3;&#xFF0C;&#x9010;&#x6B65;&#x66F4;&#x65B0;&#x3002;&#x6B22;&#x8FCE;&#x5927;&#x5BB6;&#x6279;&#x8BC4;&#x6307;&#x6B63;&#x3002;</p><p>&#x524D;&#x7AEF;&#x5B66;&#x4E60;QQ&#x7FA4;: 538631558</p><blockquote>&#x3010;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x63A8;&#x8350;&#x3011;<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> &#x662F;&#x57FA;&#x4E8E;&#x6D4F;&#x89C8;&#x5668;&#x7684;&#x96C6;&#x6210;&#x5F0F;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#xFF0C;&#x652F;&#x6301;&#x7EDD;&#x5927;&#x90E8;&#x5206;&#x7F16;&#x7A0B;&#x8BED;&#x8A00;&#xFF0C;&#x5305;&#x62EC; HTML5&#x3001;PHP&#x3001;Python&#x3001;Java&#x3001;Ruby&#x3001;C/C++&#x3001;.NET &#x5C0F;&#x7A0B;&#x5E8F;&#x7B49;&#x7B49;&#xFF0C;&#x65E0;&#x9700;&#x4E0B;&#x8F7D;&#x5B89;&#x88C5;&#x7A0B;&#x5E8F;&#xFF0C;&#x4E00;&#x952E;&#x5207;&#x6362;&#x5F00;&#x53D1;&#x73AF;&#x5883;&#x3002; Cloud Studio&#x63D0;&#x4F9B;&#x4E86;&#x5B8C;&#x6574;&#x7684; Linux &#x73AF;&#x5883;&#xFF0C;&#x5E76;&#x4E14;&#x652F;&#x6301;&#x81EA;&#x5B9A;&#x4E49;&#x57DF;&#x540D;&#x6307;&#x5411;&#xFF0C;&#x52A8;&#x6001;&#x8BA1;&#x7B97;&#x8D44;&#x6E90;&#x8C03;&#x6574;&#xFF0C;&#x53EF;&#x4EE5;&#x5B8C;&#x6210;&#x5404;&#x79CD;&#x5E94;&#x7528;&#x7684;&#x5F00;&#x53D1;&#x7F16;&#x8BD1;&#x4E0E;&#x90E8;&#x7F72;&#x3002;</blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
MobX入门 TodoList

## 原文链接
[https://segmentfault.com/a/1190000015387255](https://segmentfault.com/a/1190000015387255)

