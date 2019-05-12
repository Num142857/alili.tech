---
title: '前端数据模型Model;适用于多人团队协作的开发模式' 
date: 2019-02-14 2:30:37
hidden: true
slug: bpp4oyftvs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文讲述的数据模型并不是一个库，也不是需要npm的包，仅仅只是一种在多人团队协作开发的时候拟定的规则。至少目前为止，我们的开发团队再也没用过mock（虽然一开始也没用），也不用担心后台数据的字段或结构发生变动，真正实现前后台并行开发的愉快模式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="本文技术栈有 Typescript、Rxjs、AngularX
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>本文技术栈有 Typescript、Rxjs、AngularX
</code></pre>
<h2 id="articleHeader1">定义Model</h2>
<p>类比于java里的类，我们的Model也是一个类，是TS的类，我们根据需求和设计图或原型图规划好某一个具体的模块的基类Model，并自行定义一些字段和枚举类型，方法属性等，并不需要强行和后台的字段一致，要保证百分百纯的前后端分离，举个例子</p>
<p>比如开发某一个后台管理项目，里边有产品（Product）模块、用户（User）模块等</p>
<p>那么我们会在model文件夹里定义BaseProduct的基类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class BaseProductModel {
    constructor() {}
    // 必有id 和 name
    public id: number = null;
    public name: string = '';
    /...more.../
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BaseProductModel {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {}
    <span class="hljs-comment">// 必有id 和 name</span>
    <span class="hljs-keyword">public</span> id: <span class="hljs-built_in">number</span> = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">public</span> name: <span class="hljs-built_in">string</span> = <span class="hljs-string">''</span>;
    <span class="hljs-regexp">/...more.../</span>
}</code></pre>
<p>基类的定义是必要的，可以节省很多不必要的代码，并不需要写一个页面或组件就重新定义新的model，如果某一个组件里面需要对这个产品的内容进行拓展的大可直接继承，并不会影响其他有了这个基类的文件</p>
<blockquote>我们推崇一切基类都必须继承，不可直接构造</blockquote>
<p>真实的项目中产品的字段和属性肯定不止只有id和name，可能还包含版本、缩略图地址、唯一标识、产品、对应规格的价格、状态、创建时间等等；这些属性完全可以放在基类里，因为所有产品都有这些属性，说到类型和状态的定义，请注意</p>
<blockquote>绝对不能将可枚举性质的属性直接使用后台或第三方返回的对应属性</blockquote>
<p>比如，产品模块里最基础的状态（status）属性，假设后台定义的对应状态有</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0: 禁用
1: 启用
2: 隐藏
3: 不可购买" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-attribute">0</span>: 禁用
<span class="hljs-attribute">1</span>: 启用
<span class="hljs-attribute">2</span>: 隐藏
<span class="hljs-attribute">3</span>: 不可购买</code></pre>
<p>这四种，倘若我们在项目当中直接使用这些对应状态的数字去判断或进行逻辑处理，分不分的清另谈，如果中途或以后状态的数字变了，GG。可能大家觉得这样的情况很少，但也不是没有，一旦出现改起来BUG就一堆。</p>
<p>所以对于这种可枚举性质的属性我们会定义一个枚举类（Enum）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export enum EStatus {
    BAN = 0,
    OPEN = 1,
    HIDE = 2,
    NOTBUY = 3
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code>export <span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">EStatus</span> {</span>
    BAN = <span class="hljs-number">0</span>,
    OPEN = <span class="hljs-number">1</span>,
    HIDE = <span class="hljs-number">2</span>,
    NOTBUY = <span class="hljs-number">3</span>
}</code></pre>
<p>然后在model里这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class BaseProductModel {
    // ......
    public status: string = EStatus[1] // 默认启用
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> BaseProductModel {
    <span class="hljs-comment">// ......</span>
    <span class="hljs-keyword">public</span> status: <span class="hljs-built_in">string</span> = EStatus[<span class="hljs-number">1</span>] <span class="hljs-comment">// 默认启用</span>
}</code></pre>
<p>美滋滋，而且在进行逻辑判断的时候我们也不用去关心每个状态对应的数字是什么，我们只关心它是BAN还是OPEN，简洁明了不含糊</p>
<p>而且我们还可以给model增加一个只读属性，用来返回这个状态对应的中文提示（这种需求很常见）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="public get conversionStatusHint() : string {
    const _ = { BAN: '禁用', OPEN: '启用', HIDE: '隐藏', NOTBUY: '买不得呀' }
    return _[this.status] ? _[this.status] : ''
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">get</span> <span class="hljs-title">conversionStatusHint</span>(<span class="hljs-params"></span>) : <span class="hljs-keyword">string</span> </span>{
    <span class="hljs-keyword">const</span> _ = { BAN: <span class="hljs-string">'禁用'</span>, OPEN: <span class="hljs-string">'启用'</span>, HIDE: <span class="hljs-string">'隐藏'</span>, NOTBUY: <span class="hljs-string">'买不得呀'</span> }
    <span class="hljs-keyword">return</span> _[<span class="hljs-keyword">this</span>.status] ? _[<span class="hljs-keyword">this</span>.status] : <span class="hljs-string">''</span>
}</code></pre>
<p>这样就不用在每一个组件里面写一个方法来传参数返回中文名称了</p>
<p>到了这里，我们的BaseProductModel已经算是定义好了，下面我们就需要给这个model定义一个方法</p>
<blockquote>目的是把后台返回的字段和数据结构转化为我们自己定义的字段和数据结构</blockquote>
<h2 id="articleHeader2">转化后台数据</h2>
<p>可能到了这里很多人会觉得这是多此一举，后台都直接返回数据了还转化什么，返回什么用什么就得了。<br>但在大型的团队开发项目当中，谁也不能保证一个字段也不修改，一个字段也不删除或增加或缺失，牵一发动全身。人生苦短。而且还有一种情况就是，可能这个项目是前端先进行，后台还未介入，需要前端这边先把整体的功能和样式都先根据设计图规划开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class BaseProductModel {
    // ......
    // 转化后台数据
    public setData( data: BaseProductModel ): void {
        if (data) {
            for (let e in this) {
                if ((<Object>data).hasOwnProperty(e)) {
                    if( e == 'status' ) {
                        this.status = EStatus[(<any>data)[e]]
                    } else {
                        this[e] = (<any>data)[e];
                    }
                }
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseProductModel</span> </span>{
    <span class="hljs-comment">// ......</span>
    <span class="hljs-comment">// 转化后台数据</span>
    <span class="hljs-keyword">public</span> setData( <span class="hljs-keyword">data</span>: BaseProductModel ): void {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>) {
            <span class="hljs-keyword">for</span> (let e <span class="hljs-keyword">in</span> <span class="hljs-keyword">this</span>) {
                <span class="hljs-keyword">if</span> ((&lt;Object&gt;<span class="hljs-keyword">data</span>).hasOwnProperty(e)) {
                    <span class="hljs-keyword">if</span>( e == <span class="hljs-string">'status'</span> ) {
                        <span class="hljs-keyword">this</span>.status = EStatus[(&lt;any&gt;<span class="hljs-keyword">data</span>)[e]]
                    } <span class="hljs-keyword">else</span> {
                        <span class="hljs-keyword">this</span>[e] = (&lt;any&gt;<span class="hljs-keyword">data</span>)[e];
                    }
                }
            }
        }
    }
}</code></pre>
<p>然后在调用的时候</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/** 假设ProductModel类继承了BaseProductModel类 */
public productModel: ProductModel = new ProductModel()；
/...more.../
this.productModel.setData(<BaseProductModel>{
    // 假设后台定义的创建时间字段是create_at，model里定的创建时间是createTime
    createTime: data.create_at
});
// 即使数据结构不一致也可在这里进行统一转化" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-comment">/** 假设ProductModel类继承了BaseProductModel类 */</span>
<span class="hljs-keyword">public</span> productModel: ProductModel = <span class="hljs-literal">new</span> ProductModel()；
/<span class="hljs-params">...</span>more<span class="hljs-params">...</span>/
this.productModel.setData(&lt;BaseProductModel&gt;{
    <span class="hljs-comment">// 假设后台定义的创建时间字段是create_at，model里定的创建时间是createTime</span>
    createTime: <span class="hljs-built_in">data</span>.create_at
});
<span class="hljs-comment">// 即使数据结构不一致也可在这里进行统一转化</span></code></pre>
<p>做好了转化这一步，所有的数据变动和数据结构的变化都在这同一个地方修改即搞定，这个时候随便后台怎么改，欢乐改，都不影响我们后续的逻辑处理和字段的变动。同理，在post数据给后台的时候转化就显得容易多了，后台需要什么数据和字段再转化一次不就得了。</p>
<blockquote>以上的数据模型可以很好的降低前后台掐架的概率，mock？不需要</blockquote>
<p>下面是一个我们抽离出来的常用的表格数据模型基类</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { BehaviorSubject } from 'rxjs'

//分页配置
export interface PaginationConfig {
    // 当前的页码
    pageIndex: number;
    // 总数
    total: number;
    // 当前选中的一页显示多少个的数量
    rows: number;
    // 可选择的每页显示多少个数量
    rowsOptions?: Array<number>;
}

//分页配置初始数据
export let PaginationInitConfig: PaginationConfig = {
    pageIndex: 1,
    total: 0,
    rows: 10,
    rowsOptions: [10, 20, 50]
}

//表格配置
export interface TableConfig extends PaginationConfig {
    // 是否显示loading效果
    isLoading?: boolean;
    // 是否处于半选状态
    isCheckIndeterminate?: boolean;
    // 是否全选状态
    isCheckAll?: boolean;
    // 是否禁用选中
    isCheckDisable?: boolean;
    //没有数据的提示
    noResult?: string;

}

//表头
export interface TableHead {
    titles: string[];
    widths?: string[];
    //样式类  src/styles/ 中有公用的表格样式类
    classes?: string[];
    sorts?: (boolean | string)[];
}

//分页参数
export interface PageParam {
    page: number;
    rows: number;
}

//排序类型
export type orderType = 'desc' | 'asc' | null | ''

//排序参数
export interface SortParam {
    orderBy?: string;
    order?: orderType
}

// 所有表格的基类
export class BaseTableModel<T> {
    //表格配置
    tableConfig: TableConfig
    //表格头部配置
    tableHead: TableHead
    //表格数据流
    tableData$: BehaviorSubject<T[]>

    //排序类型
    orderType: orderType
    //当前排序的标示
    currentSortBy: string

    constructor(
        //选中的 key
        private checkKey: string = 'isChecked',
        //禁用的 key
        private disabledKey: string = 'isDisabled'
    ) {
        this.initData()
    }

    // 重置数据
    public initData(): void {
        this.tableHead = {
            titles: []
        }
        this.tableConfig = {
            pageIndex: 1,
            total: 0,
            rows: 10,
            rowsOptions: [10, 20, 50],
            isLoading: false,
            isCheckIndeterminate: false,
            isCheckAll: false,
            isCheckDisable: false,
            noResult: '暂无数据'
        }
        this.tableData$ = new BehaviorSubject([])
    }

    /**
     * 设置表格配置
     * @author GR-05
     * @param conf
     */
    setConfig(conf: TableConfig): void {
        this.tableConfig = Object.assign(this.tableConfig, conf)
    }

    /**
     * 设置表格头部标题
     * @author GR-05
     * @param titles
     */
    setHeadTitles(titles: string[]): void {
        this.tableHead.titles = titles
    }

    /**
     * 设置表格头部宽度
     * @author GR-05
     * @param widths
     */
    setHeadWidths(widths: string[]): void {
        this.tableHead.widths = widths
    }

    /**
     * 设置表格头部样式类
     * @author GR-05
     * @param classes
     */
    setHeadClasses(classes: string[]): void {
        this.tableHead.classes = classes
    }

    /**
     * 设置表格排序功能
     * @author GR-05
     * @param sorts
     */
    setHeadSorts(sorts: (boolean | string)[]): void {
        this.tableHead.sorts = sorts
    }

    /**
     * 设置当前排序类型
     * @param ot
     */
    setSortType(ot: orderType) {
        this.orderType = ot
    }

    /**
     * 设置当前排序标识
     * @param orderBy
     */
    setSortBy(orderBy: string) {
        this.currentSortBy = orderBy
    }

    /**
     * 设置当前被点击的排序标示
     * @param i 排序数组索引
     */
    sortByClick(i: number) {
        if (this.tableHead.sorts &amp;&amp; this.tableHead.sorts[i]) {
            if (!this.orderType) {
                this.orderType = 'desc'
            } else {
                this.orderType == 'desc' ? this.orderType = 'asc' : this.orderType = 'desc'
            }
            this.currentSortBy = this.tableHead.sorts[i] as string
        }
    }

    /**
     * 获取当前的排序参数
     */
    getCurrentSort(): SortParam {
        return {
            order: this.orderType,
            orderBy: this.currentSortBy
        }
    }

    /**
     * 设置表格loading
     * @author GR-05
     * @param flag
     */
    setLoading(flag: boolean = true): void {
        this.tableConfig.isLoading = flag
    }

    /**
     * 设置当前表格数据总数
     * @author GR-05
     * @param total
     */
    setTotal(total: number): void {
        this.tableConfig.total = total
    }

    setPageAndRows(pageIndex: number, rows: number = 10) {
        this.tableConfig.pageIndex = pageIndex
        this.tableConfig.rows = rows
    }

    /**
     * 更新表格数据（新数据、单选、多选）
     * @author GR-05
     * @param dataList
     */
    setDataList(dataList: T[]): void {
        this.tableConfig.isCheckAll = false
        this.tableConfig.isCheckIndeterminate = dataList.filter(item => !item[this.disabledKey]).some(item => item[this.checkKey] == true)
        this.tableConfig.isCheckAll = dataList.filter(item => !item[this.disabledKey]).every(item => item[this.checkKey] == true)
        this.tableConfig.isCheckAll ? this.tableConfig.isCheckIndeterminate = false : {}
        this.tableData$.next(dataList);
        if (dataList.length == 0) {
            this.tableConfig.isCheckAll = false
        }
    }

    /**
     * 获取已选的项
     * @author GR-05
     */
    getCheckItem(): T[] {
        return this.tableData$.value.filter(item => item[this.checkKey] == true &amp;&amp; !item[this.disabledKey])
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { BehaviorSubject } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>

<span class="hljs-comment">//分页配置</span>
<span class="hljs-keyword">export</span> interface PaginationConfig {
    <span class="hljs-comment">// 当前的页码</span>
    pageIndex: number;
    <span class="hljs-comment">// 总数</span>
    total: number;
    <span class="hljs-comment">// 当前选中的一页显示多少个的数量</span>
    rows: number;
    <span class="hljs-comment">// 可选择的每页显示多少个数量</span>
    rowsOptions?: <span class="hljs-built_in">Array</span>&lt;number&gt;;
}

<span class="hljs-comment">//分页配置初始数据</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">let</span> PaginationInitConfig: PaginationConfig = {
    <span class="hljs-attr">pageIndex</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">rows</span>: <span class="hljs-number">10</span>,
    <span class="hljs-attr">rowsOptions</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>]
}

<span class="hljs-comment">//表格配置</span>
<span class="hljs-keyword">export</span> interface TableConfig extends PaginationConfig {
    <span class="hljs-comment">// 是否显示loading效果</span>
    isLoading?: boolean;
    <span class="hljs-comment">// 是否处于半选状态</span>
    isCheckIndeterminate?: boolean;
    <span class="hljs-comment">// 是否全选状态</span>
    isCheckAll?: boolean;
    <span class="hljs-comment">// 是否禁用选中</span>
    isCheckDisable?: boolean;
    <span class="hljs-comment">//没有数据的提示</span>
    noResult?: string;

}

<span class="hljs-comment">//表头</span>
<span class="hljs-keyword">export</span> interface TableHead {
    <span class="hljs-attr">titles</span>: string[];
    widths?: string[];
    <span class="hljs-comment">//样式类  src/styles/ 中有公用的表格样式类</span>
    classes?: string[];
    sorts?: (boolean | string)[];
}

<span class="hljs-comment">//分页参数</span>
<span class="hljs-keyword">export</span> interface PageParam {
    <span class="hljs-attr">page</span>: number;
    rows: number;
}

<span class="hljs-comment">//排序类型</span>
<span class="hljs-keyword">export</span> type orderType = <span class="hljs-string">'desc'</span> | <span class="hljs-string">'asc'</span> | <span class="hljs-literal">null</span> | <span class="hljs-string">''</span>

<span class="hljs-comment">//排序参数</span>
<span class="hljs-keyword">export</span> interface SortParam {
    orderBy?: string;
    order?: orderType
}

<span class="hljs-comment">// 所有表格的基类</span>
<span class="hljs-keyword">export</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BaseTableModel</span>&lt;<span class="hljs-title">T</span>&gt; </span>{
    <span class="hljs-comment">//表格配置</span>
    tableConfig: TableConfig
    <span class="hljs-comment">//表格头部配置</span>
    tableHead: TableHead
    <span class="hljs-comment">//表格数据流</span>
    tableData$: BehaviorSubject&lt;T[]&gt;

    <span class="hljs-comment">//排序类型</span>
    orderType: orderType
    <span class="hljs-comment">//当前排序的标示</span>
    currentSortBy: string

    <span class="hljs-keyword">constructor</span>(
        //选中的 key
        private checkKey: string = 'isChecked',
        //禁用的 key
        private disabledKey: string = 'isDisabled'
    ) {
        <span class="hljs-keyword">this</span>.initData()
    }

    <span class="hljs-comment">// 重置数据</span>
    public initData(): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableHead = {
            <span class="hljs-attr">titles</span>: []
        }
        <span class="hljs-keyword">this</span>.tableConfig = {
            <span class="hljs-attr">pageIndex</span>: <span class="hljs-number">1</span>,
            <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>,
            <span class="hljs-attr">rows</span>: <span class="hljs-number">10</span>,
            <span class="hljs-attr">rowsOptions</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">50</span>],
            <span class="hljs-attr">isLoading</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">isCheckIndeterminate</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">isCheckAll</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">isCheckDisable</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">noResult</span>: <span class="hljs-string">'暂无数据'</span>
        }
        <span class="hljs-keyword">this</span>.tableData$ = <span class="hljs-keyword">new</span> BehaviorSubject([])
    }

    <span class="hljs-comment">/**
     * 设置表格配置
     * @author GR-05
     * @param conf
     */</span>
    setConfig(conf: TableConfig): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableConfig = <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.tableConfig, conf)
    }

    <span class="hljs-comment">/**
     * 设置表格头部标题
     * @author GR-05
     * @param titles
     */</span>
    setHeadTitles(titles: string[]): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableHead.titles = titles
    }

    <span class="hljs-comment">/**
     * 设置表格头部宽度
     * @author GR-05
     * @param widths
     */</span>
    setHeadWidths(widths: string[]): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableHead.widths = widths
    }

    <span class="hljs-comment">/**
     * 设置表格头部样式类
     * @author GR-05
     * @param classes
     */</span>
    setHeadClasses(classes: string[]): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableHead.classes = classes
    }

    <span class="hljs-comment">/**
     * 设置表格排序功能
     * @author GR-05
     * @param sorts
     */</span>
    setHeadSorts(sorts: (boolean | string)[]): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableHead.sorts = sorts
    }

    <span class="hljs-comment">/**
     * 设置当前排序类型
     * @param ot
     */</span>
    setSortType(ot: orderType) {
        <span class="hljs-keyword">this</span>.orderType = ot
    }

    <span class="hljs-comment">/**
     * 设置当前排序标识
     * @param orderBy
     */</span>
    setSortBy(orderBy: string) {
        <span class="hljs-keyword">this</span>.currentSortBy = orderBy
    }

    <span class="hljs-comment">/**
     * 设置当前被点击的排序标示
     * @param i 排序数组索引
     */</span>
    sortByClick(i: number) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.tableHead.sorts &amp;&amp; <span class="hljs-keyword">this</span>.tableHead.sorts[i]) {
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.orderType) {
                <span class="hljs-keyword">this</span>.orderType = <span class="hljs-string">'desc'</span>
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">this</span>.orderType == <span class="hljs-string">'desc'</span> ? <span class="hljs-keyword">this</span>.orderType = <span class="hljs-string">'asc'</span> : <span class="hljs-keyword">this</span>.orderType = <span class="hljs-string">'desc'</span>
            }
            <span class="hljs-keyword">this</span>.currentSortBy = <span class="hljs-keyword">this</span>.tableHead.sorts[i] <span class="hljs-keyword">as</span> string
        }
    }

    <span class="hljs-comment">/**
     * 获取当前的排序参数
     */</span>
    getCurrentSort(): SortParam {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">order</span>: <span class="hljs-keyword">this</span>.orderType,
            <span class="hljs-attr">orderBy</span>: <span class="hljs-keyword">this</span>.currentSortBy
        }
    }

    <span class="hljs-comment">/**
     * 设置表格loading
     * @author GR-05
     * @param flag
     */</span>
    setLoading(flag: boolean = <span class="hljs-literal">true</span>): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableConfig.isLoading = flag
    }

    <span class="hljs-comment">/**
     * 设置当前表格数据总数
     * @author GR-05
     * @param total
     */</span>
    setTotal(total: number): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableConfig.total = total
    }

    setPageAndRows(pageIndex: number, <span class="hljs-attr">rows</span>: number = <span class="hljs-number">10</span>) {
        <span class="hljs-keyword">this</span>.tableConfig.pageIndex = pageIndex
        <span class="hljs-keyword">this</span>.tableConfig.rows = rows
    }

    <span class="hljs-comment">/**
     * 更新表格数据（新数据、单选、多选）
     * @author GR-05
     * @param dataList
     */</span>
    setDataList(dataList: T[]): <span class="hljs-keyword">void</span> {
        <span class="hljs-keyword">this</span>.tableConfig.isCheckAll = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.tableConfig.isCheckIndeterminate = dataList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> !item[<span class="hljs-keyword">this</span>.disabledKey]).some(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item[<span class="hljs-keyword">this</span>.checkKey] == <span class="hljs-literal">true</span>)
        <span class="hljs-keyword">this</span>.tableConfig.isCheckAll = dataList.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> !item[<span class="hljs-keyword">this</span>.disabledKey]).every(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item[<span class="hljs-keyword">this</span>.checkKey] == <span class="hljs-literal">true</span>)
        <span class="hljs-keyword">this</span>.tableConfig.isCheckAll ? <span class="hljs-keyword">this</span>.tableConfig.isCheckIndeterminate = <span class="hljs-literal">false</span> : {}
        <span class="hljs-keyword">this</span>.tableData$.next(dataList);
        <span class="hljs-keyword">if</span> (dataList.length == <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">this</span>.tableConfig.isCheckAll = <span class="hljs-literal">false</span>
        }
    }

    <span class="hljs-comment">/**
     * 获取已选的项
     * @author GR-05
     */</span>
    getCheckItem(): T[] {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.tableData$.value.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item[<span class="hljs-keyword">this</span>.checkKey] == <span class="hljs-literal">true</span> &amp;&amp; !item[<span class="hljs-keyword">this</span>.disabledKey])
    }

}
</code></pre>
<p>我们为什么没有抽离成组件而是数据模型这么一个类上，主要是因为，组件的样式我们是不确定唯一性的，但数据和处理逻辑确是类似的，哪里地方要用到，就在哪个组件里new一个就好了；</p>
<p>其中BaseTableModel后面的T可以是所有你想在表格上渲染的任何一个model类，比如之前的ProductModel，页面需求需要展示产品的表格列表，则</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export class TableModel extends BaseTableModel<ProductModel> {

    constructor() {
        super();
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>export <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TableModel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">BaseTableModel&lt;ProductModel&gt;</span> </span>{

    constructor() {
        <span class="hljs-keyword">super</span>();
    }

}
</code></pre>
<p>那么最后你只需要将BaseTableModel里的tableData$数据next成处理好的ProdcuModel数组就好了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端数据模型Model;适用于多人团队协作的开发模式

## 原文链接
[https://segmentfault.com/a/1190000016837712](https://segmentfault.com/a/1190000016837712)

