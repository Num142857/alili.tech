---
title: 'React实现滑动选择插件（仿Antd-mobile Picker）' 
date: 2019-01-13 2:30:11
hidden: true
slug: cspxm3gudku
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">效果图</h1>
<p><span class="img-wrap"><img data-src="/img/bVOuxh?w=382&amp;h=689" src="https://static.alili.tech/img/bVOuxh?w=382&amp;h=689" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">需求</h1>
<p>由于移动端iOS和安卓原生select样式和效果不同，同一个控件在不同系统上效果不同。<br>所以决定制作一个跟iOS风格类似的，可以滚动，选择器插件。<br>之后看到了antd-mobile里面的picker插件符合我们的要求，使用了一段时间感觉其效果不错，隧查看源码，探究其制作过程。<br>但是antd-mobile是Typescript编写的，跟React类似，但是又不太一样。所以基本是关键问题查看其做参考，剩下的自己实现。</p>
<h1 id="articleHeader2">Step1 组件分析</h1>
<p>经过查看和分析后 可以得出结论（如下图）</p>
<p><span class="img-wrap"><img data-src="/img/bVOux2?w=766&amp;h=1354" src="https://static.alili.tech/img/bVOux2?w=766&amp;h=1354" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>该组件（Picker）大致分成3个部分</p>
<ol>
<li><p>children 触发组件弹出的部分，一般为List Item。其实就是该组件的this.props.children。</p></li>
<li><p>mask 组件弹出之后的遮罩，点击遮罩组件消失，值不变（相当于是点击取消）。</p></li>
<li><p>popup 组件弹出之后的内容，分成上下两个部分，其中下半部分是核心（antd-mobile中将其单独提出来 叫做PickerView）。</p></li>
</ol>
<p>第3部分PickerView即为极为复杂，考虑到扩展性：<br>这里面的列数是可变的（最多不能超过5个）；<br>每一列滚动结束 其后面的列对应的数组和默认值都要发生改变；<br>每一列都是支持滚动操作的（手势操作）。<br>组件化之后如图：</p>
<p><span class="img-wrap"><img data-src="/img/bVOuyx?w=780&amp;h=1038" src="https://static.alili.tech/img/bVOuyx?w=780&amp;h=1038" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>分析之后可以看出 第3部分是该组件的核心应该优先制作。</p>
<h1 id="articleHeader3">Step 2 使用方法确定</h1>
<p>在做之前应该想好输入和输出。<br>该组件需要哪些参数，参数多少也决定了功能多少。<br>参照antd-mobile的文档 确定参数如下：</p>
<ol>
<li><p>data：组件的数据源 每列应该显示的数据的一个集合 有固定的数据结构</p></li>
<li><p>col：组件应该显示的列数</p></li>
<li><p>value：默认显示的值 一个数组 每一项对应各个列的值</p></li>
<li><p>text：popup组件中间的提示文字</p></li>
<li><p>cancelText：取消按钮可自定义的文字 默认为取消</p></li>
<li><p>confirmText：确定按钮自定义的文字 默认为确定</p></li>
<li><p>cascade：是否级联 就是每一列的值变化 是否会影响其后面的列对应数组和值得变化 是否级联也会影响到数据源数据结果的不同</p></li>
<li><p>onChange：点击确定之后 组件值发生变化之后的回调</p></li>
<li><p>onPickerChange：每一列的值变化之后的回调</p></li>
<li><p>onCancel：取消之后的回调</p></li>
</ol>
<p>参数确定之后要确定两个核心参数的数据结构<br>级联时候data的数据结构</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const areaArray = [
    {label: '北京市', value: '北京市', children: [
        {label: '北京市', value: '北京市', children: [
            {label: '朝阳区', value: '朝阳区'},            {label: '海淀区', value: '朝阳区'},            {label: '东城区', value: '朝阳区'},            {label: '西城区', value: '朝阳区'}
        ]}
    ]},    {label: '辽宁省', value: '辽宁省', children: [
        {label: '沈阳市', value: '沈阳市', children: [
            {label: '沈河区', value: '沈河区'},            {label: '浑南区', value: '浑南区'},            {label: '沈北新区', value: '沈北新区'},        ]},        {label: '本溪市', value: '本溪市', children: [
            {label: '溪湖区', value: '溪湖区'},            {label: '东明区', value: '东明区'},            {label: '桓仁满族自治县', value: '桓仁满族自治县'},        ]}
    ]},    {label: '云南省', value: '云南省', children: [
        {label: '昆明市', value: '昆明市', children:[
            {label: '五华区', value: '五华区'},            {label: '官渡区', value: '官渡区'},            {label: '呈贡区', value: '呈贡区'},        ]}
    ]},];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const areaArray = [
    {<span class="hljs-string">label:</span> <span class="hljs-string">'北京市'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'北京市'</span>, <span class="hljs-string">children:</span> [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'北京市'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'北京市'</span>, <span class="hljs-string">children:</span> [
            {<span class="hljs-string">label:</span> <span class="hljs-string">'朝阳区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'朝阳区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'海淀区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'朝阳区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'东城区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'朝阳区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'西城区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'朝阳区'</span>}
        ]}
    ]},    {<span class="hljs-string">label:</span> <span class="hljs-string">'辽宁省'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'辽宁省'</span>, <span class="hljs-string">children:</span> [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'沈阳市'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'沈阳市'</span>, <span class="hljs-string">children:</span> [
            {<span class="hljs-string">label:</span> <span class="hljs-string">'沈河区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'沈河区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'浑南区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'浑南区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'沈北新区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'沈北新区'</span>},        ]},        {<span class="hljs-string">label:</span> <span class="hljs-string">'本溪市'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'本溪市'</span>, <span class="hljs-string">children:</span> [
            {<span class="hljs-string">label:</span> <span class="hljs-string">'溪湖区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'溪湖区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'东明区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'东明区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'桓仁满族自治县'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'桓仁满族自治县'</span>},        ]}
    ]},    {<span class="hljs-string">label:</span> <span class="hljs-string">'云南省'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'云南省'</span>, <span class="hljs-string">children:</span> [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'昆明市'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'昆明市'</span>, <span class="hljs-string">children:</span>[
            {<span class="hljs-string">label:</span> <span class="hljs-string">'五华区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'五华区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'官渡区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'官渡区'</span>},            {<span class="hljs-string">label:</span> <span class="hljs-string">'呈贡区'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'呈贡区'</span>},        ]}
    ]},];</code></pre>
<p>对应value的数据结构：<code>['辽宁省', '本溪市', '桓仁满族自治县’]</code><br>不级联的时候 data则为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numberArray = [
    [
        {label: '一', value: '一'},        {label: '二', value: '二'},        {label: '三', value: '三'}
    ],    [
        {label: '1', value: '1'},        {label: '2', value: '2'},        {label: '3', value: '3'},        {label: '4', value: '4'}
    ],    [
        {label: '壹', value: '壹'},        {label: '貮', value: '貮'},        {label: '叁', value: '叁'}
    ]
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const numberArray = [
    [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'一'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'一'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'二'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'二'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'三'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'三'</span>}
    ],    [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'1'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'1'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'2'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'2'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'3'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'3'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'4'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'4'</span>}
    ],    [
        {<span class="hljs-string">label:</span> <span class="hljs-string">'壹'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'壹'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'貮'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'貮'</span>},        {<span class="hljs-string">label:</span> <span class="hljs-string">'叁'</span>, <span class="hljs-string">value:</span> <span class="hljs-string">'叁'</span>}
    ]
];</code></pre>
<p>此时value为：<code>['一', '4', '貮’]</code>。</p>
<h1 id="articleHeader4">Step 3 PickerView制作</h1>
<p>Picker组件的核心就是PickerView组件 <br>PickerView组件里面每个列功能比较集中，重用程度较高，故将其封装成PickerColumn组件。</p>
<h2 id="articleHeader5">Step 3-1 PickerView搭建</h2>
<p>PickerView主要的功能就是根据传给自己的props，整理出需要渲染几列PickerColumn，并且整理出PickerColumn需要的参数和回调。<br>PickerView起到在Picker和PickerColumn中的做数据转换和传递的功能。<br>这里要注意的几点：</p>
<ol>
<li><p>PickerView是个非受控组件，初始化的时候，将props中的value存成自己的state，以后向外暴露自己的state。</p></li>
<li><p>在级联的情况下，每次PickerColumn的值变化的时候，都要给每个Column计算他对应的data，这里用到了递归调用，这里的算法写的不是很完美（重点是handleValueChange, getColums, getColumnData, getNewValue这几个方法）。<br>PickerView的源码如下：</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import PickerColumn from './PickerColumn'

// 选择器组件
class PickerView extends React.Component {
    static defaultProps = {
        col: 1,
        cascade: true
    };
    static propTypes = {
        col: React.PropTypes.number,
        data: React.PropTypes.array,
        value: React.PropTypes.array,
        cascade: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };
    constructor (props) {
        super(props);
        this.state = {
            defaultSelectedValue: []
        }
    }
    componentDidMount () {
        // picker view 当做一个非受控组件
        let {value} = this.props;
        this.setState({
            defaultSelectedValue: value
        });
    }
    handleValueChange (newValue, index) {
        // 子组件column发生变化的回调函数
        // 每次值发生变化 都要判断整个值数组的新值
        let {defaultSelectedValue} = this.state;
        let {data, cascade, onChange} = this.props;
        let oldValue = defaultSelectedValue.slice();
        oldValue[index] = newValue;

        if(cascade){
            // 如果级联的情况下
            const newState = this.getNewValue(data, oldValue, [], 0);

            this.setState({
                defaultSelectedValue: newState
            });

            // 如果有回调
            if(onChange){
                onChange(newState);
            }
        } else {
            // 不级联 单纯改对应数据
            this.setState({
                defaultSelectedValue: oldValue
            });

            // 如果有回调
            if(onChange){
                onChange(oldValue);
            }
        }
    }
    getColumns () {
        let result = [];
        let {col, data, cascade} = this.props;
        let {defaultSelectedValue} = this.state;

        if(defaultSelectedValue.length == 0) return;

        let array;

        if(cascade){
            array = this.getColumnsData(data, defaultSelectedValue, [], 0);
        } else {
            array = data;
        }

        for(let i = 0; i < col; i++){
            result.push(<PickerColumn
                key={i}
                value={defaultSelectedValue[i]}
                data={array[i]}
                index={i}
                onValueChange={this.handleValueChange.bind(this)}
            />);
        }

        return result;
    }
    getColumnsData (tree, value, hasFind, deep) {
        // 遍历tree
        let has;
        let array = [];
        for(let i = 0; i < tree.length; i++){
            array.push({label: tree[i].label, value: tree[i].value});
            if(tree[i].value == value[deep]) {
                has = i;
            }
        }

        // 判断有没有找到
        // 没找到return
        // 找到了 没有下一集 也return
        // 有下一级 则递归
        if(has == undefined) return hasFind;

        hasFind.push(array);
        if(tree[has].children) {
            this.getColumnsData(tree[has].children, value, hasFind, deep+1);
        }

        return hasFind;
    }
    getNewValue (tree, oldValue, newValue, deep) {
        // 遍历tree
        let has;
        for(let i = 0; i < tree.length; i++){
            if(tree[i].value == oldValue[deep]) {
                newValue.push(tree[i].value);
                has = i;
            }
        }

        if(has == undefined) {
            has = 0;
            newValue.push(tree[has].value);
        }

        if(tree[has].children) {
            this.getNewValue(tree[has].children, oldValue, newValue, deep+1);
        }

        return newValue;
    }
    render () {
        const columns = this.getColumns();

        return (
            <div className=&quot;zby-picker-view-box&quot;>
                {columns}
            </div>
        )
    }
}

export default PickerView" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> React from <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> PickerColumn from <span class="hljs-string">'./PickerColumn'</span>

<span class="hljs-comment">// 选择器组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PickerView</span> <span class="hljs-title">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    static defaultProps = {
        col: <span class="hljs-number">1</span>,
        cascade: <span class="hljs-literal">true</span>
    };
    static propTypes = {
        col: React.PropTypes.number,
        <span class="hljs-keyword">data</span>: React.PropTypes.array,
        value: React.PropTypes.array,
        cascade: React.PropTypes.bool,
        onChange: React.PropTypes.func
    };
    <span class="hljs-keyword">constructor</span> (props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            defaultSelectedValue: []
        }
    }
    componentDidMount () {
        <span class="hljs-comment">// picker view 当做一个非受控组件</span>
        let {value} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">this</span>.setState({
            defaultSelectedValue: value
        });
    }
    handleValueChange (newValue, index) {
        <span class="hljs-comment">// 子组件column发生变化的回调函数</span>
        <span class="hljs-comment">// 每次值发生变化 都要判断整个值数组的新值</span>
        let {defaultSelectedValue} = <span class="hljs-keyword">this</span>.state;
        let {<span class="hljs-keyword">data</span>, cascade, onChange} = <span class="hljs-keyword">this</span>.props;
        let oldValue = defaultSelectedValue.slice();
        oldValue[index] = newValue;

        <span class="hljs-keyword">if</span>(cascade){
            <span class="hljs-comment">// 如果级联的情况下</span>
            const newState = <span class="hljs-keyword">this</span>.getNewValue(<span class="hljs-keyword">data</span>, oldValue, [], <span class="hljs-number">0</span>);

            <span class="hljs-keyword">this</span>.setState({
                defaultSelectedValue: newState
            });

            <span class="hljs-comment">// 如果有回调</span>
            <span class="hljs-keyword">if</span>(onChange){
                onChange(newState);
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 不级联 单纯改对应数据</span>
            <span class="hljs-keyword">this</span>.setState({
                defaultSelectedValue: oldValue
            });

            <span class="hljs-comment">// 如果有回调</span>
            <span class="hljs-keyword">if</span>(onChange){
                onChange(oldValue);
            }
        }
    }
    getColumns () {
        let result = [];
        let {col, <span class="hljs-keyword">data</span>, cascade} = <span class="hljs-keyword">this</span>.props;
        let {defaultSelectedValue} = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">if</span>(defaultSelectedValue.length == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span>;

        let array;

        <span class="hljs-keyword">if</span>(cascade){
            array = <span class="hljs-keyword">this</span>.getColumnsData(<span class="hljs-keyword">data</span>, defaultSelectedValue, [], <span class="hljs-number">0</span>);
        } <span class="hljs-keyword">else</span> {
            array = <span class="hljs-keyword">data</span>;
        }

        <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">0</span>; i &lt; col; i++){
            result.push(&lt;PickerColumn
                key={i}
                value={defaultSelectedValue[i]}
                <span class="hljs-keyword">data</span>={array[i]}
                index={i}
                onValueChange={<span class="hljs-keyword">this</span>.handleValueChange.bind(<span class="hljs-keyword">this</span>)}
            /&gt;);
        }

        <span class="hljs-keyword">return</span> result;
    }
    getColumnsData (tree, value, hasFind, deep) {
        <span class="hljs-comment">// 遍历tree</span>
        let has;
        let array = [];
        <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">0</span>; i &lt; tree.length; i++){
            array.push({label: tree[i].label, value: tree[i].value});
            <span class="hljs-keyword">if</span>(tree[i].value == value[deep]) {
                has = i;
            }
        }

        <span class="hljs-comment">// 判断有没有找到</span>
        <span class="hljs-comment">// 没找到return</span>
        <span class="hljs-comment">// 找到了 没有下一集 也return</span>
        <span class="hljs-comment">// 有下一级 则递归</span>
        <span class="hljs-keyword">if</span>(has == undefined) <span class="hljs-keyword">return</span> hasFind;

        hasFind.push(array);
        <span class="hljs-keyword">if</span>(tree[has].children) {
            <span class="hljs-keyword">this</span>.getColumnsData(tree[has].children, value, hasFind, deep+<span class="hljs-number">1</span>);
        }

        <span class="hljs-keyword">return</span> hasFind;
    }
    getNewValue (tree, oldValue, newValue, deep) {
        <span class="hljs-comment">// 遍历tree</span>
        let has;
        <span class="hljs-keyword">for</span>(let i = <span class="hljs-number">0</span>; i &lt; tree.length; i++){
            <span class="hljs-keyword">if</span>(tree[i].value == oldValue[deep]) {
                newValue.push(tree[i].value);
                has = i;
            }
        }

        <span class="hljs-keyword">if</span>(has == undefined) {
            has = <span class="hljs-number">0</span>;
            newValue.push(tree[has].value);
        }

        <span class="hljs-keyword">if</span>(tree[has].children) {
            <span class="hljs-keyword">this</span>.getNewValue(tree[has].children, oldValue, newValue, deep+<span class="hljs-number">1</span>);
        }

        <span class="hljs-keyword">return</span> newValue;
    }
    render () {
        const columns = <span class="hljs-keyword">this</span>.getColumns();

        <span class="hljs-keyword">return</span> (
            &lt;div className=<span class="hljs-string">"zby-picker-view-box"</span>&gt;
                {columns}
            &lt;/div&gt;
        )
    }
}

export <span class="hljs-keyword">default</span> PickerView</code></pre>
<h2 id="articleHeader6">Step 3-2 PickerColumn封装</h2>
<p>PickerColumn是PickerView的核心，其作用：</p>
<ol>
<li><p>根据data生成选项列表</p></li>
<li><p>根据value 选中对应选项</p></li>
<li><p>识别滚动手势操作 用户在每一列自由滚动</p></li>
<li><p>滚动停止时候 识别当前选中的值 并反馈给PickerView</p></li>
</ol>
<p>这里前两项都好做，关键是3 4两项<br>移动端手势操作之前一直使用的是Hammer.js。<br>但是在React中，并没有太好的插件，github上有一个人封装的<a href="https://github.com/JedWatson/react-hammerjs" rel="nofollow noreferrer" target="_blank">react-hammer</a>插件，start到是很多(400+) 但是最近用起来总是报错。。。。<br>有人提问 却没人解决 所以也没敢选用<br>后来想引入Hammer.js自己进行封装 然后发现要封装的东西不少。。。。<br>最后看了Antd-mobile的源码 选用了何一鸣的<a href="https://github.com/yiminghe/zscroller" rel="nofollow noreferrer" target="_blank">zscroller</a>插件 <br>该插件可以说很好地满足了这里的需要 很不错 推荐</p>
<p>选好了插件之后 问题就简单了很多 PickerColumn也就没什么难度了 <br>最后吐槽一句 这个zscroller是好，但是文档太少了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import ZScroller from 'zscroller'
import classNames from 'classnames'

// picker-view 中的列
class PickerColumn extends React.Component {
    static propTypes = {
        index: React.PropTypes.number,
        data: React.PropTypes.array,
        value: React.PropTypes.string,
        onValueChange: React.PropTypes.func
    };
    componentDidMount () {
        // 绑定事件
        this.bindScrollEvent();
        // 列表滚到对应位置
        this.scrollToPosition();
    }
    componentDidUpdate() {
        this.zscroller.reflow();
        this.scrollToPosition();
    }
    componentWillUnmount() {
        this.zscroller.destroy();
    }
    bindScrollEvent () {
        // 绑定滚动的事件
        const content = this.refs.content;
        // getBoundingClientRect js原生方法
        this.itemHeight = this.refs.indicator.getBoundingClientRect().height;

        // 最后还是用了何一鸣的zscroll插件
        // 但是这个插件并没有太多的文档介绍 gg
        // 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html
        let t = this;
        this.zscroller = new ZScroller(content, {
            scrollbars: false,
            scrollingX: false,
            snapping: true, // 滚动结束之后 滑动对应的位置
            penetrationDeceleration: .1,
            minVelocityToKeepDecelerating: 0.5,
            scrollingComplete () {
                // 滚动结束 回调
                t.scrollingComplete();
            }
        });

        // 设置每个格子的高度 这样滚动结束 自动滚到对应格子上
        // 单位必须是px 所以要动态取一下
        this.zscroller.scroller.setSnapSize(0, this.itemHeight);
    }
    scrollingComplete () {
        // 滚动结束 判断当前选中值
        const { top } = this.zscroller.scroller.getValues();
        const {data, value, index, onValueChange} = this.props;

        let currentIndex = top / this.itemHeight;
        const floor = Math.floor(currentIndex);
        if (currentIndex - floor > 0.5) {
            currentIndex = floor + 1;
        } else {
            currentIndex = floor;
        }

        const selectedValue = data[currentIndex].value;

        if(selectedValue != value){
            // 值发生变化 通知父组件
            onValueChange(selectedValue, index);
        }
    }
    scrollToPosition () {
        // 滚动到选中的位置
        let {data, value} = this.props;

        data.map((item)=>{
            if(item.value == value){
                this.selectByIndex();
                return;
            }
        });

        for(let i = 0; i < data.length; i++){
            if(data[i].value == value){
                this.selectByIndex(i);
                return;
            }
        }

        this.selectByIndex(0);
    }
    selectByIndex (index) {
        // 滚动到index对应的位置
        let top = this.itemHeight * index;

        this.zscroller.scroller.scrollTo(0, top);
    }
    getCols () {
        // 根据value 和 index 获取到对应的data
        let {data, value, index} = this.props;
        let result = [];

        for(let i = 0; i < data.length; i++){
            result.push(<div key={index + &quot;-&quot; + i} className={classNames(['zby-picker-view-col', {'selected': data[i].value == value}])}>{data[i].label}</div>);
        }

        return result;
    }
    render () {
        let cols = this.getCols();

        return (
            <div className=&quot;zby-picker-view-item&quot;>
                <div className=&quot;zby-picker-view-list&quot;>
                    <div className=&quot;zby-picker-view-window&quot;></div>
                    <div className=&quot;zby-picker-view-indicator&quot; ref=&quot;indicator&quot;></div>
                    <div className=&quot;zby-picker-view-content&quot; ref=&quot;content&quot;>
                        {cols}
                    </div>
                </div>
            </div>
        )
    }
}

export default PickerColumn;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> ZScroller <span class="hljs-keyword">from</span> <span class="hljs-string">'zscroller'</span>
<span class="hljs-keyword">import</span> classNames <span class="hljs-keyword">from</span> <span class="hljs-string">'classnames'</span>

<span class="hljs-comment">// picker-view 中的列</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">PickerColumn</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">index</span>: React.PropTypes.number,
        <span class="hljs-attr">data</span>: React.PropTypes.array,
        <span class="hljs-attr">value</span>: React.PropTypes.string,
        <span class="hljs-attr">onValueChange</span>: React.PropTypes.func
    };
    componentDidMount () {
        <span class="hljs-comment">// 绑定事件</span>
        <span class="hljs-keyword">this</span>.bindScrollEvent();
        <span class="hljs-comment">// 列表滚到对应位置</span>
        <span class="hljs-keyword">this</span>.scrollToPosition();
    }
    componentDidUpdate() {
        <span class="hljs-keyword">this</span>.zscroller.reflow();
        <span class="hljs-keyword">this</span>.scrollToPosition();
    }
    componentWillUnmount() {
        <span class="hljs-keyword">this</span>.zscroller.destroy();
    }
    bindScrollEvent () {
        <span class="hljs-comment">// 绑定滚动的事件</span>
        <span class="hljs-keyword">const</span> content = <span class="hljs-keyword">this</span>.refs.content;
        <span class="hljs-comment">// getBoundingClientRect js原生方法</span>
        <span class="hljs-keyword">this</span>.itemHeight = <span class="hljs-keyword">this</span>.refs.indicator.getBoundingClientRect().height;

        <span class="hljs-comment">// 最后还是用了何一鸣的zscroll插件</span>
        <span class="hljs-comment">// 但是这个插件并没有太多的文档介绍 gg</span>
        <span class="hljs-comment">// 插件demo地址：http://yiminghe.me/zscroller/examples/demo.html</span>
        <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">this</span>.zscroller = <span class="hljs-keyword">new</span> ZScroller(content, {
            <span class="hljs-attr">scrollbars</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">scrollingX</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">snapping</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 滚动结束之后 滑动对应的位置</span>
            penetrationDeceleration: <span class="hljs-number">.1</span>,
            <span class="hljs-attr">minVelocityToKeepDecelerating</span>: <span class="hljs-number">0.5</span>,
            scrollingComplete () {
                <span class="hljs-comment">// 滚动结束 回调</span>
                t.scrollingComplete();
            }
        });

        <span class="hljs-comment">// 设置每个格子的高度 这样滚动结束 自动滚到对应格子上</span>
        <span class="hljs-comment">// 单位必须是px 所以要动态取一下</span>
        <span class="hljs-keyword">this</span>.zscroller.scroller.setSnapSize(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.itemHeight);
    }
    scrollingComplete () {
        <span class="hljs-comment">// 滚动结束 判断当前选中值</span>
        <span class="hljs-keyword">const</span> { top } = <span class="hljs-keyword">this</span>.zscroller.scroller.getValues();
        <span class="hljs-keyword">const</span> {data, value, index, onValueChange} = <span class="hljs-keyword">this</span>.props;

        <span class="hljs-keyword">let</span> currentIndex = top / <span class="hljs-keyword">this</span>.itemHeight;
        <span class="hljs-keyword">const</span> floor = <span class="hljs-built_in">Math</span>.floor(currentIndex);
        <span class="hljs-keyword">if</span> (currentIndex - floor &gt; <span class="hljs-number">0.5</span>) {
            currentIndex = floor + <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            currentIndex = floor;
        }

        <span class="hljs-keyword">const</span> selectedValue = data[currentIndex].value;

        <span class="hljs-keyword">if</span>(selectedValue != value){
            <span class="hljs-comment">// 值发生变化 通知父组件</span>
            onValueChange(selectedValue, index);
        }
    }
    scrollToPosition () {
        <span class="hljs-comment">// 滚动到选中的位置</span>
        <span class="hljs-keyword">let</span> {data, value} = <span class="hljs-keyword">this</span>.props;

        data.map(<span class="hljs-function">(<span class="hljs-params">item</span>)=&gt;</span>{
            <span class="hljs-keyword">if</span>(item.value == value){
                <span class="hljs-keyword">this</span>.selectByIndex();
                <span class="hljs-keyword">return</span>;
            }
        });

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++){
            <span class="hljs-keyword">if</span>(data[i].value == value){
                <span class="hljs-keyword">this</span>.selectByIndex(i);
                <span class="hljs-keyword">return</span>;
            }
        }

        <span class="hljs-keyword">this</span>.selectByIndex(<span class="hljs-number">0</span>);
    }
    selectByIndex (index) {
        <span class="hljs-comment">// 滚动到index对应的位置</span>
        <span class="hljs-keyword">let</span> top = <span class="hljs-keyword">this</span>.itemHeight * index;

        <span class="hljs-keyword">this</span>.zscroller.scroller.scrollTo(<span class="hljs-number">0</span>, top);
    }
    getCols () {
        <span class="hljs-comment">// 根据value 和 index 获取到对应的data</span>
        <span class="hljs-keyword">let</span> {data, value, index} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">let</span> result = [];

        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++){
            result.push(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index</span> + "<span class="hljs-attr">-</span>" + <span class="hljs-attr">i</span>} <span class="hljs-attr">className</span>=<span class="hljs-string">{classNames([</span>'<span class="hljs-attr">zby-picker-view-col</span>', {'<span class="hljs-attr">selected</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">data</span>[<span class="hljs-attr">i</span>]<span class="hljs-attr">.value</span> == <span class="hljs-string">value}])}</span>&gt;</span>{data[i].label}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>);
        }

        <span class="hljs-keyword">return</span> result;
    }
    render () {
        <span class="hljs-keyword">let</span> cols = <span class="hljs-keyword">this</span>.getCols();

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-view-item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-view-list"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-view-window"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-view-indicator"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"indicator"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-view-content"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"content"</span>&gt;</span>
                        {cols}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> PickerColumn;</code></pre>
<p>这里还有一点要注意，就是CSS<br>Column有个遮罩，遮罩的上半部分和下半部分有个白色白透明效果。<br>这个是照抄antd-mobile实现的，两个高度一般的渐变，作为上半部分和下班部分的background来实现，中间则是透明的。<br>到此PickerView制作完成，Picker插件的核心也就完成了。</p>
<h1 id="articleHeader7">Step 4 Picker制作</h1>
<p>剩下的Picker功能就是很常规的业务了<br>1.自定义文案的显示<br>2.popup和mask的显示和隐藏<br>3.数据的传递回调函数</p>
<p>这里有一点：考虑到页面如果有大量的Picker组件，会产生很多，隐藏的popup和mask，而且每个PickerColumn都要初始化zscroller性能不是很好。所以当没有点击picker的时候mask和popup都是不输出在页面内的；<br>但是这样就造成了一个问题：mask和popup显示和隐藏的时候比较突兀，加了一个iOS上常见的淡入淡出和滑入滑出动画。所以写了个setTimeout来等动画完成之后，显示和隐藏。不知道有没有什么更好的方法实现这类动画效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react'
import classNames from 'classnames'
import PickerView from './PickerView'
import Touchable from 'rc-touchable'

// 选择器组件
class Picker extends React.Component {
    static defaultProps = {
        col: 1,
        cancelText: &quot;取消&quot;,
        confirmText: &quot;确定&quot;,
        cascade: true
    };
    static propTypes = {
        col: React.PropTypes.number,
        data: React.PropTypes.array,
        value: React.PropTypes.array,
        cancelText: React.PropTypes.string,
        title: React.PropTypes.string,
        confirmText: React.PropTypes.string,
        cascade: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        onCancel: React.PropTypes.func
    };
    constructor (props) {
        super(props);
        this.state = {
            defaultValue: undefined,
            selectedValue: undefined,
            animation: &quot;out&quot;,
            show: false
        }
    }
    componentDidMount () {
        // picker 当做一个非受控组件
        let {value} = this.props;
        this.setState({
            defaultValue: value,
            selectedValue: value
        });
    }
    handleClickOpen (e) {

        if(e) e.preventDefault();

        this.setState({
            show: true
        });

        let t = this;
        let timer = setTimeout(()=>{
            t.setState({
                animation: &quot;in&quot;
            });
            clearTimeout(timer);
        }, 0);
    }
    handleClickClose (e) {

        if(e) e.preventDefault();

        this.setState({
            animation: &quot;out&quot;
        });

        let t = this;
        let timer = setTimeout(()=>{
            t.setState({
                show: false
            });
            clearTimeout(timer);
        }, 300);
    }
    handlePickerViewChange (newValue) {
        let {onPickerChange} = this.props;

        this.setState({
            defaultValue: newValue
        });

        if(onPickerChange){
            onPickerChange(newValue);
        }
    }
    handleCancel () {
        const {defaultValue} = this.state;
        const {onCancel} = this.props;

        this.handleClickClose();

        this.setState({
            selectedValue: defaultValue
        });

        if(onCancel){
            onCancel();
        }
    }
    handleConfirm () {
        // 点击确认之后的回调
        const {defaultValue} = this.state;

        this.handleClickClose();

        if (this.props.onChange) this.props.onChange(defaultValue);
    }
    getPopupDOM () {
        const {show, animation} = this.state;
        const {cancelText, title, confirmText} = this.props;
        const pickerViewDOM = this.getPickerView();

        if(show){
            return <div>
                <Touchable
                    onPress={this.handleCancel.bind(this)}>
                    <div className={classNames(['zby-picker-popup-mask', {'hide': animation == &quot;out&quot;}])}></div>
                </Touchable>
                <div className={classNames(['zby-picker-popup-wrap', {'popup': animation == &quot;in&quot;}])}>
                    <div className=&quot;zby-picker-popup-header&quot;>
                        <Touchable
                            onPress={this.handleCancel.bind(this)}>
                            <span className=&quot;zby-picker-popup-item zby-header-left&quot;>{cancelText}</span>
                        </Touchable>
                        <span className=&quot;zby-picker-popup-item zby-header-title&quot;>{title}</span>
                        <Touchable
                            onPress={this.handleConfirm.bind(this)}>
                            <span className=&quot;zby-picker-popup-item zby-header-right&quot;>{confirmText}</span>
                        </Touchable>
                    </div>
                    <div className=&quot;zby-picker-popup-body&quot;>
                        {pickerViewDOM}
                    </div>
                </div>
            </div>
        }

    }
    getPickerView () {
        const {col, data, cascade} = this.props;
        const {defaultValue, show} = this.state;

        if(defaultValue != undefined &amp;&amp; show){
            return <PickerView
                col={col}
                data={data}
                value={defaultValue}
                cascade={cascade}
                onChange={this.handlePickerViewChange.bind(this)}>
            </PickerView>;
        }
    }
    render () {
        const popupDOM = this.getPopupDOM();

        return (
            <div className=&quot;zby-picker-box&quot;>
                {popupDOM}
                <Touchable
                    onPress={this.handleClickOpen.bind(this)}>
                    {this.props.children}
                </Touchable>
            </div>
        )
    }
}

export default Picker" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> classNames <span class="hljs-keyword">from</span> <span class="hljs-string">'classnames'</span>
<span class="hljs-keyword">import</span> PickerView <span class="hljs-keyword">from</span> <span class="hljs-string">'./PickerView'</span>
<span class="hljs-keyword">import</span> Touchable <span class="hljs-keyword">from</span> <span class="hljs-string">'rc-touchable'</span>

<span class="hljs-comment">// 选择器组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Picker</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> defaultProps = {
        <span class="hljs-attr">col</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">cancelText</span>: <span class="hljs-string">"取消"</span>,
        <span class="hljs-attr">confirmText</span>: <span class="hljs-string">"确定"</span>,
        <span class="hljs-attr">cascade</span>: <span class="hljs-literal">true</span>
    };
    <span class="hljs-keyword">static</span> propTypes = {
        <span class="hljs-attr">col</span>: React.PropTypes.number,
        <span class="hljs-attr">data</span>: React.PropTypes.array,
        <span class="hljs-attr">value</span>: React.PropTypes.array,
        <span class="hljs-attr">cancelText</span>: React.PropTypes.string,
        <span class="hljs-attr">title</span>: React.PropTypes.string,
        <span class="hljs-attr">confirmText</span>: React.PropTypes.string,
        <span class="hljs-attr">cascade</span>: React.PropTypes.bool,
        <span class="hljs-attr">onChange</span>: React.PropTypes.func,
        <span class="hljs-attr">onCancel</span>: React.PropTypes.func
    };
    <span class="hljs-keyword">constructor</span> (props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">defaultValue</span>: <span class="hljs-literal">undefined</span>,
            <span class="hljs-attr">selectedValue</span>: <span class="hljs-literal">undefined</span>,
            <span class="hljs-attr">animation</span>: <span class="hljs-string">"out"</span>,
            <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
        }
    }
    componentDidMount () {
        <span class="hljs-comment">// picker 当做一个非受控组件</span>
        <span class="hljs-keyword">let</span> {value} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">defaultValue</span>: value,
            <span class="hljs-attr">selectedValue</span>: value
        });
    }
    handleClickOpen (e) {

        <span class="hljs-keyword">if</span>(e) e.preventDefault();

        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>
        });

        <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">let</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            t.setState({
                <span class="hljs-attr">animation</span>: <span class="hljs-string">"in"</span>
            });
            clearTimeout(timer);
        }, <span class="hljs-number">0</span>);
    }
    handleClickClose (e) {

        <span class="hljs-keyword">if</span>(e) e.preventDefault();

        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">animation</span>: <span class="hljs-string">"out"</span>
        });

        <span class="hljs-keyword">let</span> t = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">let</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            t.setState({
                <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
            });
            clearTimeout(timer);
        }, <span class="hljs-number">300</span>);
    }
    handlePickerViewChange (newValue) {
        <span class="hljs-keyword">let</span> {onPickerChange} = <span class="hljs-keyword">this</span>.props;

        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">defaultValue</span>: newValue
        });

        <span class="hljs-keyword">if</span>(onPickerChange){
            onPickerChange(newValue);
        }
    }
    handleCancel () {
        <span class="hljs-keyword">const</span> {defaultValue} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">const</span> {onCancel} = <span class="hljs-keyword">this</span>.props;

        <span class="hljs-keyword">this</span>.handleClickClose();

        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">selectedValue</span>: defaultValue
        });

        <span class="hljs-keyword">if</span>(onCancel){
            onCancel();
        }
    }
    handleConfirm () {
        <span class="hljs-comment">// 点击确认之后的回调</span>
        <span class="hljs-keyword">const</span> {defaultValue} = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">this</span>.handleClickClose();

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.onChange) <span class="hljs-keyword">this</span>.props.onChange(defaultValue);
    }
    getPopupDOM () {
        <span class="hljs-keyword">const</span> {show, animation} = <span class="hljs-keyword">this</span>.state;
        <span class="hljs-keyword">const</span> {cancelText, title, confirmText} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">const</span> pickerViewDOM = <span class="hljs-keyword">this</span>.getPickerView();

        <span class="hljs-keyword">if</span>(show){
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Touchable</span>
                    <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.handleCancel.bind(this)}</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classNames([</span>'<span class="hljs-attr">zby-picker-popup-mask</span>', {'<span class="hljs-attr">hide</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">animation</span> == <span class="hljs-string">"out"</span>}])}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">Touchable</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{classNames([</span>'<span class="hljs-attr">zby-picker-popup-wrap</span>', {'<span class="hljs-attr">popup</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">animation</span> == <span class="hljs-string">"in"</span>}])}&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-popup-header"</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Touchable</span>
                            <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.handleCancel.bind(this)}</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-popup-item zby-header-left"</span>&gt;</span>{cancelText}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">Touchable</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-popup-item zby-header-title"</span>&gt;</span>{title}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;<span class="hljs-name">Touchable</span>
                            <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.handleConfirm.bind(this)}</span>&gt;</span>
                            <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-popup-item zby-header-right"</span>&gt;</span>{confirmText}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                        <span class="hljs-tag">&lt;/<span class="hljs-name">Touchable</span>&gt;</span>
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-popup-body"</span>&gt;</span>
                        {pickerViewDOM}
                    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        }

    }
    getPickerView () {
        <span class="hljs-keyword">const</span> {col, data, cascade} = <span class="hljs-keyword">this</span>.props;
        <span class="hljs-keyword">const</span> {defaultValue, show} = <span class="hljs-keyword">this</span>.state;

        <span class="hljs-keyword">if</span>(defaultValue != <span class="hljs-literal">undefined</span> &amp;&amp; show){
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">PickerView</span>
                <span class="hljs-attr">col</span>=<span class="hljs-string">{col}</span>
                <span class="hljs-attr">data</span>=<span class="hljs-string">{data}</span>
                <span class="hljs-attr">value</span>=<span class="hljs-string">{defaultValue}</span>
                <span class="hljs-attr">cascade</span>=<span class="hljs-string">{cascade}</span>
                <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handlePickerViewChange.bind(this)}</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">PickerView</span>&gt;</span></span>;
        }
    }
    render () {
        <span class="hljs-keyword">const</span> popupDOM = <span class="hljs-keyword">this</span>.getPopupDOM();

        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"zby-picker-box"</span>&gt;</span>
                {popupDOM}
                <span class="hljs-tag">&lt;<span class="hljs-name">Touchable</span>
                    <span class="hljs-attr">onPress</span>=<span class="hljs-string">{this.handleClickOpen.bind(this)}</span>&gt;</span>
                    {this.props.children}
                <span class="hljs-tag">&lt;/<span class="hljs-name">Touchable</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Picker</code></pre>
<h1 id="articleHeader8">总结</h1>
<p>Picker到这就结束了，还可以添加一些功能，比如禁止选择的项等。<br>样式上Column没有做到iOS那种滚轮效果（Column看起来像个圆形的轮子一样）这个css可以后期加上<br>知道原理了，可以尝试着自己实现日期选择器datepicker。</p>
<p><a href="https://github.com/Aus0049/react-component" rel="nofollow noreferrer" target="_blank">最后项目源码</a>，<a href="https://github.com/react-component/m-picker" rel="nofollow noreferrer" target="_blank">Antd-Mobile</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React实现滑动选择插件（仿Antd-mobile Picker）

## 原文链接
[https://segmentfault.com/a/1190000009611839](https://segmentfault.com/a/1190000009611839)

