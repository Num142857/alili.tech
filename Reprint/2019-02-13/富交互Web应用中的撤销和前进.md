---
title: '富交互Web应用中的撤销和前进' 
date: 2019-02-13 2:31:22
hidden: true
slug: 9xkc6pczs0u
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在web应用中，用户在进行一些富交互行为的操作时难免会出现误操作，比如在富文本编辑器设置错了字体颜色就需要撤回，做H5活动页面的时候不小心删了一个图片也需要撤回，更比如在线设计原型图应用的时候不小心删了一个页面等，总之在交互场景非常复杂的情况下，用户操作失误的可能性非常大，这时候‘撤销’和‘前进’这两个操作就很有必要了，而且用户体验也很好</blockquote>
<h2 id="articleHeader0">思路</h2>
<p>不管是任何场景下的web应用，用户的每一次操作我们都可以看成是对某个组件或某个对象的状态和属性进行改变，一旦连续的动作操作完成正准备进行下一个动作之前，此刻的状态就是一个全新的状态</p>
<blockquote>A —— B —— C<br>用户未操作的时候全局状态是A<br>用户操作某个组件使其移动到位置X，松开鼠标之后全局状态是B<br>用户操作另一个组件使其删除，完成后全局状态是C</blockquote>
<p>所以，撤销的操作就是在用户操作状态到C的时候让全局的状态回到B，回到上一次操作完的时候。<br>那么就需要可以存放这种大量状态的列表或索引来记录每一次操作的动作</p>
<p>但如果我用某一个数组变量来存储如此庞大的数据是不是略显不妥？数据量越大内存应该会爆吧？所以这里我推荐大家使用IndexedDB<br>下面是利用Angular、Rxjs和IndexedDB封装好的一个服务类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Inject } from &quot;@angular/core&quot;;
import { IndexedDBAngular } from &quot;indexeddb-angular&quot;;
import { Subject, Observer, Observable } from &quot;rxjs&quot;;

export interface IDBData {
    widgetList: string
}

// 前进和后退的服务
@Inject({
    providedIn: 'root'
})
export class PanelExtendMoveBackService {

    /**
     * 发射DB集合存储的数据，可订阅
     */
    public launchDBDataValue$: Subject<IDBData> = new Subject<IDBData>()

    /**
     * 创建一个叫panelDataDB的本地数据库，版本号为1
     */
    public db = new IndexedDBAngular('panelDataDB', 1)

    /**
     * 记录前进和后退的存储集合项的下标key
     * 默认为0
     */
    public dbCurrentIndex: number = 0

    /**
     * 自增的DBkey
     */
    public dbKey: number = -1

    // 是否允许前进
    public get isMove() : boolean {
        return this.dbCurrentIndex < this.dbKey
    }
    // 是否允许后退
    public get isBack() : boolean {
        return this.dbCurrentIndex > 0
    }

    constructor() {}

    /**
     * 创建DB集合
     */
    public createCollections(): Observable<boolean> {
        const _sub: Subject<boolean> = new Subject<boolean>()
        this.dbKey = -1
        this.db.createStore(1, (db: any) => {
            db.currentTarget.result.createObjectStore('panelItem')
        }).then(()=>{
            this.dbClear()
            _sub.next(true)
        })
        return _sub.asObservable()
    }

    /**
     * 往集合里添加数据
     * 同时把新添加的key赋值给dbCurrentIndex，
     */
    public dbAdd(): void {
        this.handleDbCurrentRefreshDB();
        this.dbKey += 1;
        // 此处存储你要保存的数据
        const _widget_list = []
        this.db.add('panelItem', { widgetList: JSON.stringify(_widget_list) }, this.dbKey).then(
            _e => {
                if ((<Object>_e).hasOwnProperty('key')) {
                    this.dbCurrentIndex = _e.key
                };
            },
            () => {
                this.dbKey -= 1
                throw new Error('添加panelItem集合失败')
            }
        )
    }

    /**
     * 在执行添加数据集操作的时候判断dbCurrentIndex当前指引的下标是否低于dbKey
     * 如果是说明执行了后退操作之后后续动作执行了dbAdd的操作，则清空dbCurrentIndex索引之后的数据重新添加
     */
    public handleDbCurrentRefreshDB(): void {
        if (this.dbCurrentIndex < this.dbKey) {
            for (let i = this.dbCurrentIndex + 1; i <= this.dbKey; i++) {
                this.db.delete('panelItem', i).then(() => {})
            }
            this.dbKey = this.dbCurrentIndex
        }
    }

    /**
     * 执行后退操作发射DB数据集
     */
    public acquireBackDBData(): void {
        if( this.isBack ) {
            this.dbCurrentIndex -= 1
            this.db.getByKey('panelItem', this.dbCurrentIndex).then(res=>{
                this.launchDBDataValue$.next(res)
            },()=>{ })
        }
    }

    /**
     * 执行前进操作发射DB数据集
     */
    public acquireMoveDBData(): void {
        if( this.isMove ) {
            this.dbCurrentIndex += 1
            this.db.getByKey('panelItem', this.dbCurrentIndex).then(res => {
                this.launchDBDataValue$.next(res)
            }, () => { })
        }
    }

    /**
     * 清除DB集合panelItem
     */
    public dbClear(): void {
        this.db.clear('panelItem').then(_e => {})
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { Inject } <span class="hljs-keyword">from</span> <span class="hljs-string">"@angular/core"</span>;
<span class="hljs-keyword">import</span> { IndexedDBAngular } <span class="hljs-keyword">from</span> <span class="hljs-string">"indexeddb-angular"</span>;
<span class="hljs-keyword">import</span> { Subject, Observer, Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">"rxjs"</span>;

<span class="hljs-keyword">export</span> interface IDBData {
    <span class="hljs-attr">widgetList</span>: string
}

<span class="hljs-comment">// 前进和后退的服务</span>
@Inject({
    <span class="hljs-attr">providedIn</span>: <span class="hljs-string">'root'</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PanelExtendMoveBackService</span> </span>{

    <span class="hljs-comment">/**
     * 发射DB集合存储的数据，可订阅
     */</span>
    public launchDBDataValue$: Subject&lt;IDBData&gt; = <span class="hljs-keyword">new</span> Subject&lt;IDBData&gt;()

    <span class="hljs-comment">/**
     * 创建一个叫panelDataDB的本地数据库，版本号为1
     */</span>
    public db = <span class="hljs-keyword">new</span> IndexedDBAngular(<span class="hljs-string">'panelDataDB'</span>, <span class="hljs-number">1</span>)

    <span class="hljs-comment">/**
     * 记录前进和后退的存储集合项的下标key
     * 默认为0
     */</span>
    public dbCurrentIndex: number = <span class="hljs-number">0</span>

    <span class="hljs-comment">/**
     * 自增的DBkey
     */</span>
    public dbKey: number = <span class="hljs-number">-1</span>

    <span class="hljs-comment">// 是否允许前进</span>
    public get isMove() : boolean {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.dbCurrentIndex &lt; <span class="hljs-keyword">this</span>.dbKey
    }
    <span class="hljs-comment">// 是否允许后退</span>
    public get isBack() : boolean {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.dbCurrentIndex &gt; <span class="hljs-number">0</span>
    }

    <span class="hljs-keyword">constructor</span>() {}

    <span class="hljs-comment">/**
     * 创建DB集合
     */</span>
    public createCollections(): Observable&lt;boolean&gt; {
        <span class="hljs-keyword">const</span> _sub: Subject&lt;boolean&gt; = <span class="hljs-keyword">new</span> Subject&lt;boolean&gt;()
        <span class="hljs-keyword">this</span>.dbKey = <span class="hljs-number">-1</span>
        <span class="hljs-keyword">this</span>.db.createStore(<span class="hljs-number">1</span>, (db: any) =&gt; {
            db.currentTarget.result.createObjectStore(<span class="hljs-string">'panelItem'</span>)
        }).then(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-keyword">this</span>.dbClear()
            _sub.next(<span class="hljs-literal">true</span>)
        })
        <span class="hljs-keyword">return</span> _sub.asObservable()
    }

    <span class="hljs-comment">/**
     * 往集合里添加数据
     * 同时把新添加的key赋值给dbCurrentIndex，
     */</span>
    public dbAdd(): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.handleDbCurrentRefreshDB();
        <span class="hljs-keyword">this</span>.dbKey += <span class="hljs-number">1</span>;
        <span class="hljs-comment">// 此处存储你要保存的数据</span>
        <span class="hljs-keyword">const</span> _widget_list = []
        <span class="hljs-keyword">this</span>.db.add(<span class="hljs-string">'panelItem'</span>, { <span class="hljs-attr">widgetList</span>: <span class="hljs-built_in">JSON</span>.stringify(_widget_list) }, <span class="hljs-keyword">this</span>.dbKey).then(
            <span class="hljs-function"><span class="hljs-params">_e</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> ((<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Object</span>&gt;</span>_e).hasOwnProperty('key')) {
                    this.dbCurrentIndex = _e.key
                };
            },
            () =&gt; {
                this.dbKey -= 1
                throw new Error('添加panelItem集合失败')
            }
        )
    }

    /**
     * 在执行添加数据集操作的时候判断dbCurrentIndex当前指引的下标是否低于dbKey
     * 如果是说明执行了后退操作之后后续动作执行了dbAdd的操作，则清空dbCurrentIndex索引之后的数据重新添加
     */
    public handleDbCurrentRefreshDB(): void {
        if (this.dbCurrentIndex <span class="hljs-tag">&lt; <span class="hljs-attr">this.dbKey</span>) {
            <span class="hljs-attr">for</span> (<span class="hljs-attr">let</span> <span class="hljs-attr">i</span> = <span class="hljs-string">this.dbCurrentIndex</span> + <span class="hljs-attr">1</span>; <span class="hljs-attr">i</span> &lt;= <span class="hljs-string">this.dbKey;</span> <span class="hljs-attr">i</span>++) {
                <span class="hljs-attr">this.db.delete</span>('<span class="hljs-attr">panelItem</span>', <span class="hljs-attr">i</span>)<span class="hljs-attr">.then</span>(() =&gt;</span> {})
            }
            this.dbKey = this.dbCurrentIndex
        }
    }

    /**
     * 执行后退操作发射DB数据集
     */
    public acquireBackDBData(): void {
        if( this.isBack ) {
            this.dbCurrentIndex -= 1
            this.db.getByKey('panelItem', this.dbCurrentIndex).then(res=&gt;{
                this.launchDBDataValue$.next(res)
            },()=&gt;{ })
        }
    }

    /**
     * 执行前进操作发射DB数据集
     */
    public acquireMoveDBData(): void {
        if( this.isMove ) {
            this.dbCurrentIndex += 1
            this.db.getByKey('panelItem', this.dbCurrentIndex).then(res =&gt; {
                this.launchDBDataValue$.next(res)
            }, () =&gt; { })
        }
    }

    /**
     * 清除DB集合panelItem
     */
    public dbClear(): void {
        this.db.clear('panelItem').then(_e =&gt; {})
    }
}
</span></code></pre>
<p>这里我偷懒了一下，直接采用自增的id作为key了，也方便查找<br>每一次操作所存储的数据如下</p>
<p><span class="img-wrap"><img data-src="/img/bVbimHY?w=1425&amp;h=227" src="https://static.alili.tech/img/bVbimHY?w=1425&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>最后可以看一下我实现好了的撤销和前进操作的场景</p>
<p><span class="img-wrap"><img data-src="/img/bVbimIG?w=481&amp;h=342" src="https://static.alili.tech/img/bVbimIG?w=481&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
富交互Web应用中的撤销和前进

## 原文链接
[https://segmentfault.com/a/1190000016731239](https://segmentfault.com/a/1190000016731239)

