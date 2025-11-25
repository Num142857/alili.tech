---
title: 'Web 前端单元测试到底要怎么写？看这一篇就够了' 
date: 2018-11-18 2:30:10
hidden: true
slug: gr666s7txnd
categories: [reprint]
---

{{< raw >}}
<p>&#x968F;&#x7740; Web &#x5E94;&#x7528;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#x8D8A;&#x6765;&#x8D8A;&#x9AD8;&#xFF0C;&#x5F88;&#x591A;&#x516C;&#x53F8;&#x8D8A;&#x6765;&#x8D8A;&#x91CD;&#x89C6;&#x524D;&#x7AEF;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x3002;&#x6211;&#x4EEC;&#x770B;&#x5230;&#x7684;&#x5927;&#x591A;&#x6570;&#x6559;&#x7A0B;&#x90FD;&#x4F1A;&#x8BB2;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x7684;&#x91CD;&#x8981;&#x6027;&#x3001;&#x4E00;&#x4E9B;&#x6709;&#x4EE3;&#x8868;&#x6027;&#x7684;&#x6D4B;&#x8BD5;&#x6846;&#x67B6; api &#x600E;&#x4E48;&#x4F7F;&#x7528;&#xFF0C;&#x4F46;&#x5728;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x8981;&#x600E;&#x4E48;&#x4E0B;&#x624B;&#xFF1F;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x5E94;&#x8BE5;&#x5305;&#x542B;&#x54EA;&#x4E9B;&#x5177;&#x4F53;&#x5185;&#x5BB9;&#x5462;&#xFF1F;</p><p>&#x672C;&#x6587;&#x4ECE;&#x4E00;&#x4E2A;&#x771F;&#x5B9E;&#x7684;&#x5E94;&#x7528;&#x573A;&#x666F;&#x51FA;&#x53D1;&#xFF0C;&#x4ECE;&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x3001;&#x4EE3;&#x7801;&#x7ED3;&#x6784;&#x6765;&#x5206;&#x6790;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x5E94;&#x8BE5;&#x5305;&#x542B;&#x54EA;&#x4E9B;&#x5185;&#x5BB9;&#xFF0C;&#x5177;&#x4F53;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x600E;&#x4E48;&#x5199;&#xFF0C;&#x5E0C;&#x671B;&#x770B;&#x5230;&#x7684;&#x7AE5;&#x978B;&#x90FD;&#x80FD;&#x6709;&#x6240;&#x6536;&#x83B7;&#x3002;</p><h2 id="articleHeader0">&#x9879;&#x76EE;&#x7528;&#x5230;&#x7684;&#x6280;&#x672F;&#x6846;&#x67B6;</h2><p>&#x8BE5;&#x9879;&#x76EE;&#x91C7;&#x7528; <code>react</code> &#x6280;&#x672F;&#x6808;&#xFF0C;&#x7528;&#x5230;&#x7684;&#x4E3B;&#x8981;&#x6846;&#x67B6;&#x5305;&#x62EC;&#xFF1A;<code>react</code>&#x3001;<code>redux</code>&#x3001;<code>react-redux</code>&#x3001;<code>redux-actions</code>&#x3001;<code>reselect</code>&#x3001;<code>redux-saga</code>&#x3001;<code>seamless-immutable</code>&#x3001;<code>antd</code>&#x3002;</p><h2 id="articleHeader1">&#x5E94;&#x7528;&#x573A;&#x666F;&#x4ECB;&#x7ECD;</h2><p><span class="img-wrap"><img data-src="/img/bVbe1Fi?w=1298&amp;h=897" src="https://static.alili.tech/img/bVbe1Fi?w=1298&amp;h=897" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x8FD9;&#x4E2A;&#x5E94;&#x7528;&#x573A;&#x666F;&#x4ECE; UI &#x5C42;&#x6765;&#x8BB2;&#x4E3B;&#x8981;&#x7531;&#x4E24;&#x4E2A;&#x90E8;&#x5206;&#x7EC4;&#x6210;&#xFF1A;</p><ul><li>&#x5DE5;&#x5177;&#x680F;&#xFF0C;&#x5305;&#x542B;&#x5237;&#x65B0;&#x6309;&#x94AE;&#x3001;&#x5173;&#x952E;&#x5B57;&#x641C;&#x7D22;&#x6846;</li><li>&#x8868;&#x683C;&#x5C55;&#x793A;&#xFF0C;&#x91C7;&#x7528;&#x5206;&#x9875;&#x7684;&#x5F62;&#x5F0F;&#x6D4F;&#x89C8;</li></ul><p>&#x770B;&#x5230;&#x8FD9;&#x91CC;&#x6709;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x80FD;&#x4F1A;&#x8BF4;&#xFF1A;&#x5207;&#xFF01;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7684;&#x754C;&#x9762;&#x548C;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#xFF0C;&#x8FD8;&#x662F;&#x771F;&#x5B9E;&#x573A;&#x666F;&#x5417;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x5199;&#x795E;&#x9A6C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x5417;&#xFF1F;</p><p>&#x522B;&#x6025;&#xFF0C;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x6587;&#x7AE0;&#x7684;&#x9605;&#x8BFB;&#x4F53;&#x9A8C;&#x548C;&#x957F;&#x5EA6;&#x9002;&#x4E2D;&#xFF0C;&#x80FD;&#x8BB2;&#x6E05;&#x695A;&#x95EE;&#x9898;&#x7684;&#x7B80;&#x6D01;&#x573A;&#x666F;&#x5C31;&#x662F;&#x597D;&#x573A;&#x666F;&#x4E0D;&#x662F;&#x5417;&#xFF1F;&#x6162;&#x6162;&#x5F80;&#x4E0B;&#x770B;&#x3002;</p><h2 id="articleHeader2">&#x8BBE;&#x8BA1;&#x6A21;&#x5F0F;&#x4E0E;&#x7ED3;&#x6784;&#x5206;&#x6790;</h2><p>&#x5728;&#x8FD9;&#x4E2A;&#x573A;&#x666F;&#x8BBE;&#x8BA1;&#x5F00;&#x53D1;&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x4E25;&#x683C;&#x9075;&#x5B88; <code>redux</code> &#x5355;&#x5411;&#x6570;&#x636E;&#x6D41; &#x4E0E; <code>react-redux</code> &#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x5E76;&#x91C7;&#x7528; <code>redux-saga</code> &#x6765;&#x5904;&#x7406;&#x4E1A;&#x52A1;&#x6D41;&#xFF0C;<code>reselect</code> &#x6765;&#x5904;&#x7406;&#x72B6;&#x6001;&#x7F13;&#x5B58;&#xFF0C;&#x901A;&#x8FC7; <code>fetch</code> &#x6765;&#x8C03;&#x7528;&#x540E;&#x53F0;&#x63A5;&#x53E3;&#xFF0C;&#x4E0E;&#x771F;&#x5B9E;&#x7684;&#x9879;&#x76EE;&#x6CA1;&#x6709;&#x5DEE;&#x5F02;&#x3002;</p><p>&#x5206;&#x5C42;&#x8BBE;&#x8BA1;&#x4E0E;&#x4EE3;&#x7801;&#x7EC4;&#x7EC7;&#x5982;&#x4E0B;&#x6240;&#x793A;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe1Fw?w=307&amp;h=266" src="https://static.alili.tech/img/bVbe1Fw?w=307&amp;h=266" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer"></span></p><p>&#x4E2D;&#x95F4; <code>store</code> &#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x90FD;&#x662F; <code>redux</code> &#x76F8;&#x5173;&#x7684;&#xFF0C;&#x770B;&#x540D;&#x79F0;&#x5E94;&#x8BE5;&#x90FD;&#x80FD;&#x77E5;&#x9053;&#x610F;&#x601D;&#x4E86;&#x3002;</p><p>&#x5177;&#x4F53;&#x7684;&#x4EE3;&#x7801;&#x8BF7;&#x770B; <a href="https://github.com/deepfunc/react-test-demo" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a>&#x3002;</p><h2 id="articleHeader3">&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x90E8;&#x5206;&#x4ECB;&#x7ECD;</h2><p>&#x5148;&#x8BB2;&#x4E00;&#x4E0B;&#x7528;&#x5230;&#x4E86;&#x54EA;&#x4E9B;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x548C;&#x5DE5;&#x5177;&#xFF0C;&#x4E3B;&#x8981;&#x5185;&#x5BB9;&#x5305;&#x62EC;&#xFF1A;</p><ul><li><code>jest</code> &#xFF0C;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;</li><li><code>enzyme</code> &#xFF0C;&#x4E13;&#x6D4B; react ui &#x5C42;</li><li><code>sinon</code> &#xFF0C;&#x5177;&#x6709;&#x72EC;&#x7ACB;&#x7684; fakes&#x3001;spies&#x3001;stubs&#x3001;mocks &#x529F;&#x80FD;&#x5E93;</li><li><code>nock</code> &#xFF0C;&#x6A21;&#x62DF; HTTP Server</li></ul><p>&#x5982;&#x679C;&#x6709;&#x7AE5;&#x978B;&#x5BF9;&#x4E0A;&#x9762;&#x8FD9;&#x4E9B;&#x4F7F;&#x7528;&#x548C;&#x914D;&#x7F6E;&#x4E0D;&#x719F;&#x7684;&#x8BDD;&#xFF0C;&#x76F4;&#x63A5;&#x770B;&#x5B98;&#x65B9;&#x6587;&#x6863;&#x5427;&#xFF0C;&#x6BD4;&#x4EFB;&#x4F55;&#x6559;&#x7A0B;&#x90FD;&#x5199;&#x7684;&#x597D;&#x3002;</p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x5F00;&#x59CB;&#x7F16;&#x5199;&#x5177;&#x4F53;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4EE3;&#x7801;&#x4E86;&#xFF0C;&#x4E0B;&#x9762;&#x4F1A;&#x9488;&#x5BF9;&#x6BCF;&#x4E2A;&#x5C42;&#x9762;&#x7ED9;&#x51FA;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x548C;&#x89E3;&#x6790;&#x3002;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x5148;&#x4ECE; <code>actions</code> &#x5F00;&#x59CB;&#x5427;&#x3002;</p><blockquote>&#x4E3A;&#x4F7F;&#x6587;&#x7AE0;&#x5C3D;&#x91CF;&#x7B80;&#x77ED;&#x3001;&#x6E05;&#x6670;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x7247;&#x6BB5;&#x4E0D;&#x662F;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x5B8C;&#x6574;&#x5185;&#x5BB9;&#xFF0C;&#x5B8C;&#x6574;&#x5185;&#x5BB9;&#x5728; <a href="https://github.com/deepfunc/react-test-demo" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a> &#x3002;</blockquote><h2 id="articleHeader4">actions</h2><p>&#x4E1A;&#x52A1;&#x91CC;&#x9762;&#x6211;&#x4F7F;&#x7528;&#x4E86; <code>redux-actions</code> &#x6765;&#x4EA7;&#x751F; <code>action</code>&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x5DE5;&#x5177;&#x680F;&#x505A;&#x793A;&#x4F8B;&#xFF0C;&#x5148;&#x770B;&#x4E00;&#x6BB5;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createAction } from &apos;redux-actions&apos;;
import * as type from &apos;../types/bizToolbar&apos;;

export const updateKeywords = createAction(type.BIZ_TOOLBAR_KEYWORDS_UPDATE);

// ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createAction } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-actions&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> type <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../types/bizToolbar&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> updateKeywords = createAction(type.BIZ_TOOLBAR_KEYWORDS_UPDATE);

<span class="hljs-comment">// ...</span></code></pre><p>&#x5BF9;&#x4E8E; <code>actions</code> &#x6D4B;&#x8BD5;&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x662F;&#x9A8C;&#x8BC1;&#x4EA7;&#x751F;&#x7684; <code>action</code> &#x5BF9;&#x8C61;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as type from &apos;@/store/types/bizToolbar&apos;;
import * as actions from &apos;@/store/actions/bizToolbar&apos;;

/* &#x6D4B;&#x8BD5; bizToolbar &#x76F8;&#x5173; actions */
describe(&apos;bizToolbar actions&apos;, () =&gt; {
  
    /* &#x6D4B;&#x8BD5;&#x66F4;&#x65B0;&#x641C;&#x7D22;&#x5173;&#x952E;&#x5B57; */
    test(&apos;should create an action for update keywords&apos;, () =&gt; {
        // &#x6784;&#x5EFA;&#x76EE;&#x6807; action
        const keywords = &apos;some keywords&apos;;
        const expectedAction = {
            type: type.BIZ_TOOLBAR_KEYWORDS_UPDATE,
            payload: keywords
        };

        // &#x65AD;&#x8A00; redux-actions &#x4EA7;&#x751F;&#x7684; action &#x662F;&#x5426;&#x6B63;&#x786E;
        expect(actions.updateKeywords(keywords)).toEqual(expectedAction);
    });

    // ...
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> type <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/types/bizToolbar&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/actions/bizToolbar&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; bizToolbar &#x76F8;&#x5173; actions */</span>
describe(<span class="hljs-string">&apos;bizToolbar actions&apos;</span>, () =&gt; {
  
    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x66F4;&#x65B0;&#x641C;&#x7D22;&#x5173;&#x952E;&#x5B57; */</span>
    test(<span class="hljs-string">&apos;should create an action for update keywords&apos;</span>, () =&gt; {
        <span class="hljs-comment">// &#x6784;&#x5EFA;&#x76EE;&#x6807; action</span>
        <span class="hljs-keyword">const</span> keywords = <span class="hljs-string">&apos;some keywords&apos;</span>;
        <span class="hljs-keyword">const</span> expectedAction = {
            <span class="hljs-attr">type</span>: type.BIZ_TOOLBAR_KEYWORDS_UPDATE,
            <span class="hljs-attr">payload</span>: keywords
        };

        <span class="hljs-comment">// &#x65AD;&#x8A00; redux-actions &#x4EA7;&#x751F;&#x7684; action &#x662F;&#x5426;&#x6B63;&#x786E;</span>
        expect(actions.updateKeywords(keywords)).toEqual(expectedAction);
    });

    <span class="hljs-comment">// ...</span>
});</code></pre><p>&#x8FD9;&#x4E2A;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#x903B;&#x8F91;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x9996;&#x5148;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x6211;&#x4EEC;&#x671F;&#x671B;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x7136;&#x540E;&#x8C03;&#x7528;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF0C;&#x6700;&#x540E;&#x9A8C;&#x8BC1;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x7684;&#x8FD0;&#x884C;&#x7ED3;&#x679C;&#x4E0E;&#x671F;&#x671B;&#x662F;&#x5426;&#x4E00;&#x81F4;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#x57FA;&#x672C;&#x5957;&#x8DEF;&#x3002;</p><p>&#x6211;&#x4EEC;&#x5728;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x65F6;&#x5C3D;&#x91CF;&#x4FDD;&#x6301;&#x7528;&#x4F8B;&#x7684;&#x5355;&#x4E00;&#x804C;&#x8D23;&#xFF0C;&#x4E0D;&#x8981;&#x8986;&#x76D6;&#x592A;&#x591A;&#x4E0D;&#x540C;&#x7684;&#x4E1A;&#x52A1;&#x8303;&#x56F4;&#x3002;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x6570;&#x91CF;&#x53EF;&#x4EE5;&#x6709;&#x5F88;&#x591A;&#x4E2A;&#xFF0C;&#x4F46;&#x6BCF;&#x4E2A;&#x90FD;&#x4E0D;&#x5E94;&#x8BE5;&#x5F88;&#x590D;&#x6742;&#x3002;</p><h2 id="articleHeader5">reducers</h2><p>&#x63A5;&#x7740;&#x662F; <code>reducers</code>&#xFF0C;&#x4F9D;&#x7136;&#x91C7;&#x7528; <code>redux-actions</code> &#x7684; <code>handleActions</code> &#x6765;&#x7F16;&#x5199; <code>reducer</code>&#xFF0C;&#x8FD9;&#x91CC;&#x7528;&#x8868;&#x683C;&#x7684;&#x6765;&#x505A;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { handleActions } from &apos;redux-actions&apos;;
import Immutable from &apos;seamless-immutable&apos;;
import * as type from &apos;../types/bizTable&apos;;

/* &#x9ED8;&#x8BA4;&#x72B6;&#x6001; */
export const defaultState = Immutable({
    loading: false,
    pagination: {
        current: 1,
        pageSize: 15,
        total: 0
    },
    data: []
});

export default handleActions(
    {
        // ...

        /* &#x5904;&#x7406;&#x83B7;&#x5F97;&#x6570;&#x636E;&#x6210;&#x529F; */
        [type.BIZ_TABLE_GET_RES_SUCCESS]: (state, {payload}) =&gt; {
            return state.merge(
                {
                    loading: false,
                    pagination: {total: payload.total},
                    data: payload.items
                },
                {deep: true}
            );
        },
        
        // ...
    },
    defaultState
);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { handleActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-actions&apos;</span>;
<span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;seamless-immutable&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> type <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../types/bizTable&apos;</span>;

<span class="hljs-comment">/* &#x9ED8;&#x8BA4;&#x72B6;&#x6001; */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> defaultState = Immutable({
    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">pagination</span>: {
        <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">pageSize</span>: <span class="hljs-number">15</span>,
        <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">data</span>: []
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> handleActions(
    {
        <span class="hljs-comment">// ...</span>

        <span class="hljs-comment">/* &#x5904;&#x7406;&#x83B7;&#x5F97;&#x6570;&#x636E;&#x6210;&#x529F; */</span>
        [type.BIZ_TABLE_GET_RES_SUCCESS]: <span class="hljs-function">(<span class="hljs-params">state, {payload}</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> state.merge(
                {
                    <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
                    <span class="hljs-attr">pagination</span>: {<span class="hljs-attr">total</span>: payload.total},
                    <span class="hljs-attr">data</span>: payload.items
                },
                {<span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>}
            );
        },
        
        <span class="hljs-comment">// ...</span>
    },
    defaultState
);</code></pre><blockquote>&#x8FD9;&#x91CC;&#x7684;&#x72B6;&#x6001;&#x5BF9;&#x8C61;&#x4F7F;&#x7528;&#x4E86; <code>seamless-immutable</code></blockquote><p>&#x5BF9;&#x4E8E; <code>reducer</code>&#xFF0C;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x6D4B;&#x8BD5;&#x4E24;&#x4E2A;&#x65B9;&#x9762;&#xFF1A;</p><ol><li>&#x5BF9;&#x4E8E;&#x672A;&#x77E5;&#x7684; <code>action.type</code> &#xFF0C;&#x662F;&#x5426;&#x80FD;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x72B6;&#x6001;&#x3002;</li><li>&#x5BF9;&#x4E8E;&#x6BCF;&#x4E2A;&#x4E1A;&#x52A1; type &#xFF0C;&#x662F;&#x5426;&#x90FD;&#x8FD4;&#x56DE;&#x4E86;&#x7ECF;&#x8FC7;&#x6B63;&#x786E;&#x5904;&#x7406;&#x7684;&#x72B6;&#x6001;&#x3002;</li></ol><p>&#x4E0B;&#x9762;&#x662F;&#x9488;&#x5BF9;&#x4EE5;&#x4E0A;&#x4E24;&#x70B9;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as type from &apos;@/store/types/bizTable&apos;;
import reducer, { defaultState } from &apos;@/store/reducers/bizTable&apos;;

/* &#x6D4B;&#x8BD5; bizTable reducer */
describe(&apos;bizTable reducer&apos;, () =&gt; {
    
    /* &#x6D4B;&#x8BD5;&#x672A;&#x6307;&#x5B9A; state &#x53C2;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7F3A;&#x7701; state */
    test(&apos;should return the default state&apos;, () =&gt; {
        expect(reducer(undefined, {type: &apos;UNKNOWN&apos;})).toEqual(defaultState);
    });
    
    // ...
    
    /* &#x6D4B;&#x8BD5;&#x5904;&#x7406;&#x6B63;&#x5E38;&#x6570;&#x636E;&#x7ED3;&#x679C; */
    test(&apos;should handle successful data response&apos;, () =&gt; {
        /* &#x6A21;&#x62DF;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7ED3;&#x679C; */
        const payload = {
            items: [
                {id: 1, code: &apos;1&apos;},
                {id: 2, code: &apos;2&apos;}
            ],
            total: 2
        };
        /* &#x671F;&#x671B;&#x8FD4;&#x56DE;&#x7684;&#x72B6;&#x6001; */
        const expectedState = defaultState
            .setIn([&apos;pagination&apos;, &apos;total&apos;], payload.total)
            .set(&apos;data&apos;, payload.items)
            .set(&apos;loading&apos;, false);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TABLE_GET_RES_SUCCESS,
                payload
            })
        ).toEqual(expectedState);
    });
    
    // ...
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> type <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/types/bizTable&apos;</span>;
<span class="hljs-keyword">import</span> reducer, { defaultState } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/reducers/bizTable&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; bizTable reducer */</span>
describe(<span class="hljs-string">&apos;bizTable reducer&apos;</span>, () =&gt; {
    
    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x672A;&#x6307;&#x5B9A; state &#x53C2;&#x6570;&#x60C5;&#x51B5;&#x4E0B;&#x8FD4;&#x56DE;&#x5F53;&#x524D;&#x7F3A;&#x7701; state */</span>
    test(<span class="hljs-string">&apos;should return the default state&apos;</span>, () =&gt; {
        expect(reducer(<span class="hljs-literal">undefined</span>, {<span class="hljs-attr">type</span>: <span class="hljs-string">&apos;UNKNOWN&apos;</span>})).toEqual(defaultState);
    });
    
    <span class="hljs-comment">// ...</span>
    
    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x5904;&#x7406;&#x6B63;&#x5E38;&#x6570;&#x636E;&#x7ED3;&#x679C; */</span>
    test(<span class="hljs-string">&apos;should handle successful data response&apos;</span>, () =&gt; {
        <span class="hljs-comment">/* &#x6A21;&#x62DF;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#x7ED3;&#x679C; */</span>
        <span class="hljs-keyword">const</span> payload = {
            <span class="hljs-attr">items</span>: [
                {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;1&apos;</span>},
                {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;2&apos;</span>}
            ],
            <span class="hljs-attr">total</span>: <span class="hljs-number">2</span>
        };
        <span class="hljs-comment">/* &#x671F;&#x671B;&#x8FD4;&#x56DE;&#x7684;&#x72B6;&#x6001; */</span>
        <span class="hljs-keyword">const</span> expectedState = defaultState
            .setIn([<span class="hljs-string">&apos;pagination&apos;</span>, <span class="hljs-string">&apos;total&apos;</span>], payload.total)
            .set(<span class="hljs-string">&apos;data&apos;</span>, payload.items)
            .set(<span class="hljs-string">&apos;loading&apos;</span>, <span class="hljs-literal">false</span>);

        expect(
            reducer(defaultState, {
                <span class="hljs-attr">type</span>: type.BIZ_TABLE_GET_RES_SUCCESS,
                payload
            })
        ).toEqual(expectedState);
    });
    
    <span class="hljs-comment">// ...</span>
});</code></pre><p>&#x8FD9;&#x91CC;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x903B;&#x8F91;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4F9D;&#x7136;&#x662F;&#x4E0A;&#x9762;&#x65AD;&#x8A00;&#x671F;&#x671B;&#x7ED3;&#x679C;&#x7684;&#x5957;&#x8DEF;&#x3002;&#x4E0B;&#x9762;&#x662F; selectors &#x7684;&#x90E8;&#x5206;&#x3002;</p><h2 id="articleHeader6">selectors</h2><p><code>selector</code> &#x7684;&#x4F5C;&#x7528;&#x662F;&#x83B7;&#x53D6;&#x5BF9;&#x5E94;&#x4E1A;&#x52A1;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86; <code>reselect</code> &#x6765;&#x505A;&#x7F13;&#x5B58;&#xFF0C;&#x9632;&#x6B62; <code>state</code> &#x672A;&#x6539;&#x53D8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#xFF0C;&#x5148;&#x770B;&#x4E00;&#x4E0B;&#x8868;&#x683C;&#x7684; selector &#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createSelector } from &apos;reselect&apos;;
import * as defaultSettings from &apos;@/utils/defaultSettingsUtil&apos;;

// ...

const getBizTableState = (state) =&gt; state.bizTable;

export const getBizTable = createSelector(getBizTableState, (bizTable) =&gt; {
    return bizTable.merge({
        pagination: defaultSettings.pagination
    }, {deep: true});
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createSelector } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;reselect&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> defaultSettings <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/defaultSettingsUtil&apos;</span>;

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> getBizTableState = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> state.bizTable;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getBizTable = createSelector(getBizTableState, (bizTable) =&gt; {
    <span class="hljs-keyword">return</span> bizTable.merge({
        <span class="hljs-attr">pagination</span>: defaultSettings.pagination
    }, {<span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>});
});</code></pre><p>&#x8FD9;&#x91CC;&#x7684;&#x5206;&#x9875;&#x5668;&#x90E8;&#x5206;&#x53C2;&#x6570;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x662F;&#x7EDF;&#x4E00;&#x8BBE;&#x7F6E;&#xFF0C;&#x6240;&#x4EE5; reselect &#x5F88;&#x597D;&#x7684;&#x5B8C;&#x6210;&#x4E86;&#x8FD9;&#x4E2A;&#x5DE5;&#x4F5C;&#xFF1A;&#x5982;&#x679C;&#x4E1A;&#x52A1;&#x72B6;&#x6001;&#x4E0D;&#x53D8;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x4E0A;&#x6B21;&#x7684;&#x7F13;&#x5B58;&#x3002;&#x5206;&#x9875;&#x5668;&#x9ED8;&#x8BA4;&#x8BBE;&#x7F6E;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const pagination = {
    size: &apos;small&apos;,
    showTotal: (total, range) =&gt; `${range[0]}-${range[1]} / ${total}`,
    pageSizeOptions: [&apos;15&apos;, &apos;25&apos;, &apos;40&apos;, &apos;60&apos;],
    showSizeChanger: true,
    showQuickJumper: true
};" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> pagination = {
    <span class="hljs-attr">size</span>: <span class="hljs-string">&apos;small&apos;</span>,
    <span class="hljs-attr">showTotal</span>: <span class="hljs-function">(<span class="hljs-params">total, range</span>) =&gt;</span> <span class="hljs-string">`<span class="hljs-subst">${range[<span class="hljs-number">0</span>]}</span>-<span class="hljs-subst">${range[<span class="hljs-number">1</span>]}</span> / <span class="hljs-subst">${total}</span>`</span>,
    <span class="hljs-attr">pageSizeOptions</span>: [<span class="hljs-string">&apos;15&apos;</span>, <span class="hljs-string">&apos;25&apos;</span>, <span class="hljs-string">&apos;40&apos;</span>, <span class="hljs-string">&apos;60&apos;</span>],
    <span class="hljs-attr">showSizeChanger</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">showQuickJumper</span>: <span class="hljs-literal">true</span>
};</code></pre><p>&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x7684;&#x6D4B;&#x8BD5;&#x4E5F;&#x4E3B;&#x8981;&#x662F;&#x4E24;&#x4E2A;&#x65B9;&#x9762;&#xFF1A;</p><ol><li>&#x5BF9;&#x4E8E;&#x4E1A;&#x52A1; selector &#xFF0C;&#x662F;&#x5426;&#x8FD4;&#x56DE;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x5185;&#x5BB9;&#x3002;</li><li>&#x7F13;&#x5B58;&#x529F;&#x80FD;&#x662F;&#x5426;&#x6B63;&#x5E38;&#x3002;</li></ol><p>&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Immutable from &apos;seamless-immutable&apos;;
import { getBizTable } from &apos;@/store/selectors&apos;;
import * as defaultSettingsUtil from &apos;@/utils/defaultSettingsUtil&apos;;

/* &#x6D4B;&#x8BD5; bizTable selector */
describe(&apos;bizTable selector&apos;, () =&gt; {
    
    let state;

    beforeEach(() =&gt; {
        state = createState();
        /* &#x6BCF;&#x4E2A;&#x7528;&#x4F8B;&#x6267;&#x884C;&#x524D;&#x91CD;&#x7F6E;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570; */
        getBizTable.resetRecomputations();
    });

    function createState() {
        return Immutable({
            bizTable: {
                loading: false,
                pagination: {
                    current: 1,
                    pageSize: 15,
                    total: 0
                },
                data: []
            }
        });
    }

    /* &#x6D4B;&#x8BD5;&#x8FD4;&#x56DE;&#x6B63;&#x786E;&#x7684; bizTable state */
    test(&apos;should return bizTable state&apos;, () =&gt; {
        /* &#x4E1A;&#x52A1;&#x72B6;&#x6001; ok &#x7684; */
        expect(getBizTable(state)).toMatchObject(state.bizTable);
        
        /* &#x5206;&#x9875;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x8BBE;&#x7F6E; ok &#x7684; */
        expect(getBizTable(state)).toMatchObject({
            pagination: defaultSettingsUtil.pagination
        });
    });

    /* &#x6D4B;&#x8BD5; selector &#x7F13;&#x5B58;&#x662F;&#x5426;&#x6709;&#x6548; */
    test(&apos;check memoization&apos;, () =&gt; {
        getBizTable(state);
        /* &#x7B2C;&#x4E00;&#x6B21;&#x8BA1;&#x7B97;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x4E3A; 1 */
        expect(getBizTable.recomputations()).toBe(1);
        
        getBizTable(state);
        /* &#x4E1A;&#x52A1;&#x72B6;&#x6001;&#x4E0D;&#x53D8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x5E94;&#x8BE5;&#x8FD8;&#x662F; 1 */
        expect(getBizTable.recomputations()).toBe(1);
        
        const newState = state.setIn([&apos;bizTable&apos;, &apos;loading&apos;], true);
        getBizTable(newState);
        /* &#x4E1A;&#x52A1;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x5E94;&#x8BE5;&#x662F; 2 &#x4E86; */
        expect(getBizTable.recomputations()).toBe(2);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Immutable <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;seamless-immutable&apos;</span>;
<span class="hljs-keyword">import</span> { getBizTable } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/selectors&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> defaultSettingsUtil <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/defaultSettingsUtil&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; bizTable selector */</span>
describe(<span class="hljs-string">&apos;bizTable selector&apos;</span>, () =&gt; {
    
    <span class="hljs-keyword">let</span> state;

    beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        state = createState();
        <span class="hljs-comment">/* &#x6BCF;&#x4E2A;&#x7528;&#x4F8B;&#x6267;&#x884C;&#x524D;&#x91CD;&#x7F6E;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570; */</span>
        getBizTable.resetRecomputations();
    });

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createState</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> Immutable({
            <span class="hljs-attr">bizTable</span>: {
                <span class="hljs-attr">loading</span>: <span class="hljs-literal">false</span>,
                <span class="hljs-attr">pagination</span>: {
                    <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
                    <span class="hljs-attr">pageSize</span>: <span class="hljs-number">15</span>,
                    <span class="hljs-attr">total</span>: <span class="hljs-number">0</span>
                },
                <span class="hljs-attr">data</span>: []
            }
        });
    }

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x8FD4;&#x56DE;&#x6B63;&#x786E;&#x7684; bizTable state */</span>
    test(<span class="hljs-string">&apos;should return bizTable state&apos;</span>, () =&gt; {
        <span class="hljs-comment">/* &#x4E1A;&#x52A1;&#x72B6;&#x6001; ok &#x7684; */</span>
        expect(getBizTable(state)).toMatchObject(state.bizTable);
        
        <span class="hljs-comment">/* &#x5206;&#x9875;&#x9ED8;&#x8BA4;&#x53C2;&#x6570;&#x8BBE;&#x7F6E; ok &#x7684; */</span>
        expect(getBizTable(state)).toMatchObject({
            <span class="hljs-attr">pagination</span>: defaultSettingsUtil.pagination
        });
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; selector &#x7F13;&#x5B58;&#x662F;&#x5426;&#x6709;&#x6548; */</span>
    test(<span class="hljs-string">&apos;check memoization&apos;</span>, () =&gt; {
        getBizTable(state);
        <span class="hljs-comment">/* &#x7B2C;&#x4E00;&#x6B21;&#x8BA1;&#x7B97;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x4E3A; 1 */</span>
        expect(getBizTable.recomputations()).toBe(<span class="hljs-number">1</span>);
        
        getBizTable(state);
        <span class="hljs-comment">/* &#x4E1A;&#x52A1;&#x72B6;&#x6001;&#x4E0D;&#x53D8;&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x5E94;&#x8BE5;&#x8FD8;&#x662F; 1 */</span>
        expect(getBizTable.recomputations()).toBe(<span class="hljs-number">1</span>);
        
        <span class="hljs-keyword">const</span> newState = state.setIn([<span class="hljs-string">&apos;bizTable&apos;</span>, <span class="hljs-string">&apos;loading&apos;</span>], <span class="hljs-literal">true</span>);
        getBizTable(newState);
        <span class="hljs-comment">/* &#x4E1A;&#x52A1;&#x72B6;&#x6001;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x7F13;&#x5B58;&#x8BA1;&#x7B97;&#x6B21;&#x6570;&#x5E94;&#x8BE5;&#x662F; 2 &#x4E86; */</span>
        expect(getBizTable.recomputations()).toBe(<span class="hljs-number">2</span>);
    });
});</code></pre><p>&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4F9D;&#x7136;&#x5F88;&#x7B80;&#x5355;&#x6709;&#x6728;&#x6709;&#xFF1F;&#x4FDD;&#x6301;&#x8FD9;&#x4E2A;&#x8282;&#x594F;&#x5C31;&#x5BF9;&#x4E86;&#x3002;&#x4E0B;&#x9762;&#x6765;&#x8BB2;&#x4E0B;&#x7A0D;&#x5FAE;&#x6709;&#x70B9;&#x590D;&#x6742;&#x7684;&#x5730;&#x65B9;&#xFF0C;sagas &#x90E8;&#x5206;&#x3002;</p><h2 id="articleHeader7">sagas</h2><p>&#x8FD9;&#x91CC;&#x6211;&#x7528;&#x4E86; <code>redux-saga</code> &#x5904;&#x7406;&#x4E1A;&#x52A1;&#x6D41;&#xFF0C;&#x8FD9;&#x91CC;&#x5177;&#x4F53;&#x4E5F;&#x5C31;&#x662F;&#x5F02;&#x6B65;&#x8C03;&#x7528; api &#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x5904;&#x7406;&#x6210;&#x529F;&#x7ED3;&#x679C;&#x548C;&#x9519;&#x8BEF;&#x7ED3;&#x679C;&#x7B49;&#x3002;</p><p>&#x53EF;&#x80FD;&#x6709;&#x7684;&#x7AE5;&#x978B;&#x89C9;&#x5F97;&#x641E;&#x8FD9;&#x4E48;&#x590D;&#x6742;&#x5E72;&#x561B;&#xFF0C;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7528;&#x4E2A; <code>redux-thunk</code> &#x4E0D;&#x5C31;&#x5B8C;&#x4E8B;&#x4E86;&#x5417;&#xFF1F;&#x522B;&#x6025;&#xFF0C;&#x8010;&#x5FC3;&#x770B;&#x5B8C;&#x4F60;&#x5C31;&#x660E;&#x767D;&#x4E86;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6709;&#x5FC5;&#x8981;&#x5927;&#x6982;&#x4ECB;&#x7ECD;&#x4E0B; <code>redux-saga</code> &#x7684;&#x5DE5;&#x4F5C;&#x65B9;&#x5F0F;&#x3002;saga &#x662F;&#x4E00;&#x79CD; <code>es6</code> &#x7684;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570; - Generator &#xFF0C;&#x6211;&#x4EEC;&#x5229;&#x7528;&#x4ED6;&#x6765;&#x4EA7;&#x751F;&#x5404;&#x79CD;&#x58F0;&#x660E;&#x5F0F;&#x7684; <code>effects</code> &#xFF0C;&#x7531; <code>redux-saga</code> &#x5F15;&#x64CE;&#x6765;&#x6D88;&#x5316;&#x5904;&#x7406;&#xFF0C;&#x63A8;&#x52A8;&#x4E1A;&#x52A1;&#x8FDB;&#x884C;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x83B7;&#x53D6;&#x8868;&#x683C;&#x6570;&#x636E;&#x7684;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { all, takeLatest, put, select, call } from &apos;redux-saga/effects&apos;;
import * as type from &apos;../types/bizTable&apos;;
import * as actions from &apos;../actions/bizTable&apos;;
import { getBizToolbar, getBizTable } from &apos;../selectors&apos;;
import * as api from &apos;@/services/bizApi&apos;;

// ...

export function* onGetBizTableData() {
    /* &#x5148;&#x83B7;&#x53D6; api &#x8C03;&#x7528;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#xFF1A;&#x5173;&#x952E;&#x5B57;&#x3001;&#x5206;&#x9875;&#x4FE1;&#x606F;&#x7B49; */
    const {keywords} = yield select(getBizToolbar);
    const {pagination} = yield select(getBizTable);

    const payload = {
        keywords,
        paging: {
            skip: (pagination.current - 1) * pagination.pageSize, max: pagination.pageSize
        }
    };

    try {
        /* &#x8C03;&#x7528; api */
        const result = yield call(api.getBizTableData, payload);
        /* &#x6B63;&#x5E38;&#x8FD4;&#x56DE; */
        yield put(actions.putBizTableDataSuccessResult(result));
    } catch (err) {
        /* &#x9519;&#x8BEF;&#x8FD4;&#x56DE; */
        yield put(actions.putBizTableDataFailResult());
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { all, takeLatest, put, select, call } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> type <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../types/bizTable&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../actions/bizTable&apos;</span>;
<span class="hljs-keyword">import</span> { getBizToolbar, getBizTable } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../selectors&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/services/bizApi&apos;</span>;

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">onGetBizTableData</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">/* &#x5148;&#x83B7;&#x53D6; api &#x8C03;&#x7528;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#xFF1A;&#x5173;&#x952E;&#x5B57;&#x3001;&#x5206;&#x9875;&#x4FE1;&#x606F;&#x7B49; */</span>
    <span class="hljs-keyword">const</span> {keywords} = <span class="hljs-keyword">yield</span> select(getBizToolbar);
    <span class="hljs-keyword">const</span> {pagination} = <span class="hljs-keyword">yield</span> select(getBizTable);

    <span class="hljs-keyword">const</span> payload = {
        keywords,
        <span class="hljs-attr">paging</span>: {
            <span class="hljs-attr">skip</span>: (pagination.current - <span class="hljs-number">1</span>) * pagination.pageSize, <span class="hljs-attr">max</span>: pagination.pageSize
        }
    };

    <span class="hljs-keyword">try</span> {
        <span class="hljs-comment">/* &#x8C03;&#x7528; api */</span>
        <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">yield</span> call(api.getBizTableData, payload);
        <span class="hljs-comment">/* &#x6B63;&#x5E38;&#x8FD4;&#x56DE; */</span>
        <span class="hljs-keyword">yield</span> put(actions.putBizTableDataSuccessResult(result));
    } <span class="hljs-keyword">catch</span> (err) {
        <span class="hljs-comment">/* &#x9519;&#x8BEF;&#x8FD4;&#x56DE; */</span>
        <span class="hljs-keyword">yield</span> put(actions.putBizTableDataFailResult());
    }
}</code></pre><p>&#x4E0D;&#x719F;&#x6089; <code>redux-saga</code> &#x7684;&#x7AE5;&#x978B;&#x4E5F;&#x4E0D;&#x8981;&#x592A;&#x5728;&#x610F;&#x4EE3;&#x7801;&#x7684;&#x5177;&#x4F53;&#x5199;&#x6CD5;&#xFF0C;&#x770B;&#x6CE8;&#x91CA;&#x5E94;&#x8BE5;&#x80FD;&#x4E86;&#x89E3;&#x8FD9;&#x4E2A;&#x4E1A;&#x52A1;&#x7684;&#x5177;&#x4F53;&#x6B65;&#x9AA4;&#xFF1A;</p><ol><li>&#x4ECE;&#x5BF9;&#x5E94;&#x7684; <code>state</code> &#x91CC;&#x53D6;&#x5230;&#x8C03;&#x7528; api &#x65F6;&#x9700;&#x8981;&#x7684;&#x53C2;&#x6570;&#x90E8;&#x5206;&#xFF08;&#x641C;&#x7D22;&#x5173;&#x952E;&#x5B57;&#x3001;&#x5206;&#x9875;&#xFF09;&#xFF0C;&#x8FD9;&#x91CC;&#x8C03;&#x7528;&#x4E86;&#x521A;&#x624D;&#x7684; selector&#x3002;</li><li>&#x7EC4;&#x5408;&#x597D;&#x53C2;&#x6570;&#x5E76;&#x8C03;&#x7528;&#x5BF9;&#x5E94;&#x7684; api &#x5C42;&#x3002;</li><li>&#x5982;&#x679C;&#x6B63;&#x5E38;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#xFF0C;&#x5219;&#x53D1;&#x9001;&#x6210;&#x529F; action &#x901A;&#x77E5; reducer &#x66F4;&#x65B0;&#x72B6;&#x6001;&#x3002;</li><li>&#x5982;&#x679C;&#x9519;&#x8BEF;&#x8FD4;&#x56DE;&#xFF0C;&#x5219;&#x53D1;&#x9001;&#x9519;&#x8BEF; action &#x901A;&#x77E5; reducer&#x3002;</li></ol><p>&#x90A3;&#x4E48;&#x5177;&#x4F53;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x5E94;&#x8BE5;&#x600E;&#x4E48;&#x5199;&#x5462;&#xFF1F;&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#x8FD9;&#x79CD;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x6D89;&#x53CA;&#x5230;&#x4E86; api &#x6216;&#x5176;&#x4ED6;&#x5C42;&#x7684;&#x8C03;&#x7528;&#xFF0C;&#x5982;&#x679C;&#x8981;&#x5199;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x5FC5;&#x987B;&#x505A;&#x4E00;&#x4E9B; mock &#x4E4B;&#x7C7B;&#x6765;&#x9632;&#x6B62;&#x771F;&#x6B63;&#x8C03;&#x7528; api &#x5C42;&#xFF0C;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x4E00;&#x4E0B; &#x600E;&#x4E48;&#x9488;&#x5BF9;&#x8FD9;&#x4E2A; saga &#x6765;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { put, select } from &apos;redux-saga/effects&apos;;

// ...

/* &#x6D4B;&#x8BD5;&#x83B7;&#x53D6;&#x6570;&#x636E; */
test(&apos;request data, check success and fail&apos;, () =&gt; {
    /* &#x5F53;&#x524D;&#x7684;&#x4E1A;&#x52A1;&#x72B6;&#x6001; */
    const state = {
        bizToolbar: {
            keywords: &apos;some keywords&apos;
        },
        bizTable: {
            pagination: {
                current: 1,
                pageSize: 15
            }
        }
    };
    const gen = cloneableGenerator(saga.onGetBizTableData)();

    /* 1. &#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86;&#x6B63;&#x786E;&#x7684; selector &#x6765;&#x83B7;&#x5F97;&#x8BF7;&#x6C42;&#x65F6;&#x8981;&#x53D1;&#x9001;&#x7684;&#x53C2;&#x6570; */
    expect(gen.next().value).toEqual(select(getBizToolbar));
    expect(gen.next(state.bizToolbar).value).toEqual(select(getBizTable));

    /* 2. &#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86; api &#x5C42; */
    const callEffect = gen.next(state.bizTable).value;
    expect(callEffect[&apos;CALL&apos;].fn).toBe(api.getBizTableData);
    /* &#x8C03;&#x7528; api &#x5C42;&#x53C2;&#x6570;&#x662F;&#x5426;&#x4F20;&#x9012;&#x6B63;&#x786E; */
    expect(callEffect[&apos;CALL&apos;].args[0]).toEqual({
        keywords: &apos;some keywords&apos;,
        paging: {skip: 0, max: 15}
    });

    /* 3. &#x6A21;&#x62DF;&#x6B63;&#x786E;&#x8FD4;&#x56DE;&#x5206;&#x652F; */
    const successBranch = gen.clone();
    const successRes = {
        items: [
            {id: 1, code: &apos;1&apos;},
            {id: 2, code: &apos;2&apos;}
        ],
        total: 2
    };
    expect(successBranch.next(successRes).value).toEqual(
        put(actions.putBizTableDataSuccessResult(successRes)));
    expect(successBranch.next().done).toBe(true);

    /* 4. &#x6A21;&#x62DF;&#x9519;&#x8BEF;&#x8FD4;&#x56DE;&#x5206;&#x652F; */
    const failBranch = gen.clone();
    expect(failBranch.throw(new Error(&apos;&#x6A21;&#x62DF;&#x4EA7;&#x751F;&#x5F02;&#x5E38;&apos;)).value).toEqual(
        put(actions.putBizTableDataFailResult()));
    expect(failBranch.next().done).toBe(true);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { put, select } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-saga/effects&apos;</span>;

<span class="hljs-comment">// ...</span>

<span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x83B7;&#x53D6;&#x6570;&#x636E; */</span>
test(<span class="hljs-string">&apos;request data, check success and fail&apos;</span>, () =&gt; {
    <span class="hljs-comment">/* &#x5F53;&#x524D;&#x7684;&#x4E1A;&#x52A1;&#x72B6;&#x6001; */</span>
    <span class="hljs-keyword">const</span> state = {
        <span class="hljs-attr">bizToolbar</span>: {
            <span class="hljs-attr">keywords</span>: <span class="hljs-string">&apos;some keywords&apos;</span>
        },
        <span class="hljs-attr">bizTable</span>: {
            <span class="hljs-attr">pagination</span>: {
                <span class="hljs-attr">current</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attr">pageSize</span>: <span class="hljs-number">15</span>
            }
        }
    };
    <span class="hljs-keyword">const</span> gen = cloneableGenerator(saga.onGetBizTableData)();

    <span class="hljs-comment">/* 1. &#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86;&#x6B63;&#x786E;&#x7684; selector &#x6765;&#x83B7;&#x5F97;&#x8BF7;&#x6C42;&#x65F6;&#x8981;&#x53D1;&#x9001;&#x7684;&#x53C2;&#x6570; */</span>
    expect(gen.next().value).toEqual(select(getBizToolbar));
    expect(gen.next(state.bizToolbar).value).toEqual(select(getBizTable));

    <span class="hljs-comment">/* 2. &#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86; api &#x5C42; */</span>
    <span class="hljs-keyword">const</span> callEffect = gen.next(state.bizTable).value;
    expect(callEffect[<span class="hljs-string">&apos;CALL&apos;</span>].fn).toBe(api.getBizTableData);
    <span class="hljs-comment">/* &#x8C03;&#x7528; api &#x5C42;&#x53C2;&#x6570;&#x662F;&#x5426;&#x4F20;&#x9012;&#x6B63;&#x786E; */</span>
    expect(callEffect[<span class="hljs-string">&apos;CALL&apos;</span>].args[<span class="hljs-number">0</span>]).toEqual({
        <span class="hljs-attr">keywords</span>: <span class="hljs-string">&apos;some keywords&apos;</span>,
        <span class="hljs-attr">paging</span>: {<span class="hljs-attr">skip</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">max</span>: <span class="hljs-number">15</span>}
    });

    <span class="hljs-comment">/* 3. &#x6A21;&#x62DF;&#x6B63;&#x786E;&#x8FD4;&#x56DE;&#x5206;&#x652F; */</span>
    <span class="hljs-keyword">const</span> successBranch = gen.clone();
    <span class="hljs-keyword">const</span> successRes = {
        <span class="hljs-attr">items</span>: [
            {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;1&apos;</span>},
            {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">code</span>: <span class="hljs-string">&apos;2&apos;</span>}
        ],
        <span class="hljs-attr">total</span>: <span class="hljs-number">2</span>
    };
    expect(successBranch.next(successRes).value).toEqual(
        put(actions.putBizTableDataSuccessResult(successRes)));
    expect(successBranch.next().done).toBe(<span class="hljs-literal">true</span>);

    <span class="hljs-comment">/* 4. &#x6A21;&#x62DF;&#x9519;&#x8BEF;&#x8FD4;&#x56DE;&#x5206;&#x652F; */</span>
    <span class="hljs-keyword">const</span> failBranch = gen.clone();
    expect(failBranch.throw(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;&#x6A21;&#x62DF;&#x4EA7;&#x751F;&#x5F02;&#x5E38;&apos;</span>)).value).toEqual(
        put(actions.putBizTableDataFailResult()));
    expect(failBranch.next().done).toBe(<span class="hljs-literal">true</span>);
});</code></pre><p>&#x8FD9;&#x4E2A;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x76F8;&#x6BD4;&#x524D;&#x9762;&#x7684;&#x590D;&#x6742;&#x4E86;&#x4E00;&#x4E9B;&#xFF0C;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x8BF4;&#x4E0B;&#x6D4B;&#x8BD5; saga &#x7684;&#x539F;&#x7406;&#x3002;&#x524D;&#x9762;&#x8BF4;&#x8FC7; saga &#x5B9E;&#x9645;&#x4E0A;&#x662F;&#x8FD4;&#x56DE;&#x5404;&#x79CD;&#x58F0;&#x660E;&#x5F0F;&#x7684; <code>effects</code> &#xFF0C;&#x7136;&#x540E;&#x7531;&#x5F15;&#x64CE;&#x6765;&#x771F;&#x6B63;&#x6267;&#x884C;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x6D4B;&#x8BD5;&#x7684;&#x76EE;&#x7684;&#x5C31;&#x662F;&#x8981;&#x770B; <code>effects</code> &#x7684;&#x4EA7;&#x751F;&#x662F;&#x5426;&#x7B26;&#x5408;&#x9884;&#x671F;&#x3002;&#x90A3;&#x4E48;<code>effect</code> &#x5230;&#x5E95;&#x662F;&#x4E2A;&#x795E;&#x9A6C;&#x4E1C;&#x897F;&#x5462;&#xFF1F;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;&#xFF01;</p><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528;&#x5728;&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x540C;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x4EA7;&#x751F;&#x8FD9;&#x4E9B;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;&#xFF0C;&#x5BF9;&#x4E8E;&#x5B57;&#x9762;&#x91CF;&#x5BF9;&#x8C61;&#x7684;&#x65AD;&#x8A00;&#x5C31;&#x975E;&#x5E38;&#x7B80;&#x5355;&#x4E86;&#xFF0C;&#x5E76;&#x4E14;&#x6CA1;&#x6709;&#x76F4;&#x63A5;&#x8C03;&#x7528; api &#x5C42;&#xFF0C;&#x5C31;&#x7528;&#x4E0D;&#x7740;&#x505A; mock &#x54AF;&#xFF01;&#x8FD9;&#x4E2A;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#x6B65;&#x9AA4;&#x5C31;&#x662F;&#x5229;&#x7528;&#x751F;&#x6210;&#x5668;&#x51FD;&#x6570;&#x4E00;&#x6B65;&#x6B65;&#x7684;&#x4EA7;&#x751F;&#x4E0B;&#x4E00;&#x4E2A; <code>effect</code> &#xFF0C;&#x7136;&#x540E;&#x65AD;&#x8A00;&#x6BD4;&#x8F83;&#x3002;</p><blockquote>&#x4ECE;&#x4E0A;&#x9762;&#x7684;&#x6CE8;&#x91CA; 3&#x3001;4 &#x53EF;&#x4EE5;&#x770B;&#x5230;&#xFF0C;<code>redux-saga</code> &#x8FD8;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E9B;&#x8F85;&#x52A9;&#x51FD;&#x6570;&#x6765;&#x65B9;&#x4FBF;&#x7684;&#x5904;&#x7406;&#x5206;&#x652F;&#x65AD;&#x70B9;&#x3002;</blockquote><p>&#x8FD9;&#x4E5F;&#x662F;&#x6211;&#x9009;&#x62E9; <code>redux-saga</code> &#x7684;&#x539F;&#x56E0;&#xFF1A;&#x5F3A;&#x5927;&#x5E76;&#x4E14;&#x5229;&#x4E8E;&#x6D4B;&#x8BD5;&#x3002;</p><h2 id="articleHeader8">api &#x548C; fetch &#x5DE5;&#x5177;&#x5E93;</h2><p>&#x63A5;&#x4E0B;&#x6765;&#x5C31;&#x662F;api &#x5C42;&#x76F8;&#x5173;&#x7684;&#x4E86;&#x3002;&#x524D;&#x9762;&#x8BB2;&#x8FC7;&#x8C03;&#x7528;&#x540E;&#x53F0;&#x8BF7;&#x6C42;&#x662F;&#x7528;&#x7684; <code>fetch</code> &#xFF0C;&#x6211;&#x5C01;&#x88C5;&#x4E86;&#x4E24;&#x4E2A;&#x65B9;&#x6CD5;&#x6765;&#x7B80;&#x5316;&#x8C03;&#x7528;&#x548C;&#x7ED3;&#x679C;&#x5904;&#x7406;&#xFF1A;<code>getJSON()</code> &#x3001;<code>postJSON()</code> &#xFF0C;&#x5206;&#x522B;&#x5BF9;&#x5E94; GET &#x3001;POST &#x8BF7;&#x6C42;&#x3002;&#x5148;&#x6765;&#x770B;&#x770B; api &#x5C42;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { fetcher } from &apos;@/utils/fetcher&apos;;

export function getBizTableData(payload) {
    return fetcher.postJSON(&apos;/api/biz/get-table&apos;, payload);
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { fetcher } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/fetcher&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBizTableData</span>(<span class="hljs-params">payload</span>) </span>{
    <span class="hljs-keyword">return</span> fetcher.postJSON(<span class="hljs-string">&apos;/api/biz/get-table&apos;</span>, payload);
}</code></pre><p>&#x4E1A;&#x52A1;&#x4EE3;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x90A3;&#x4E48;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4E5F;&#x5F88;&#x7B80;&#x5355;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import sinon from &apos;sinon&apos;;
import { fetcher } from &apos;@/utils/fetcher&apos;;
import * as api from &apos;@/services/bizApi&apos;;

/* &#x6D4B;&#x8BD5; bizApi */
describe(&apos;bizApi&apos;, () =&gt; {
    
    let fetcherStub;

    beforeAll(() =&gt; {
        fetcherStub = sinon.stub(fetcher);
    });

    // ...

    /* getBizTableData api &#x5E94;&#x8BE5;&#x8C03;&#x7528;&#x6B63;&#x786E;&#x7684; method &#x548C;&#x4F20;&#x9012;&#x6B63;&#x786E;&#x7684;&#x53C2;&#x6570; */
    test(&apos;getBizTableData api should call postJSON with right params of fetcher&apos;, () =&gt; {
        /* &#x6A21;&#x62DF;&#x53C2;&#x6570; */
        const payload = {a: 1, b: 2};
        api.getBizTableData(payload);

        /* &#x68C0;&#x67E5;&#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86;&#x5DE5;&#x5177;&#x5E93; */
        expect(fetcherStub.postJSON.callCount).toBe(1);
        /* &#x68C0;&#x67E5;&#x8C03;&#x7528;&#x53C2;&#x6570;&#x662F;&#x5426;&#x6B63;&#x786E; */
        expect(fetcherStub.postJSON.lastCall.calledWith(&apos;/api/biz/get-table&apos;, payload)).toBe(true);
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> sinon <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sinon&apos;</span>;
<span class="hljs-keyword">import</span> { fetcher } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/fetcher&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/services/bizApi&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; bizApi */</span>
describe(<span class="hljs-string">&apos;bizApi&apos;</span>, () =&gt; {
    
    <span class="hljs-keyword">let</span> fetcherStub;

    beforeAll(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        fetcherStub = sinon.stub(fetcher);
    });

    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">/* getBizTableData api &#x5E94;&#x8BE5;&#x8C03;&#x7528;&#x6B63;&#x786E;&#x7684; method &#x548C;&#x4F20;&#x9012;&#x6B63;&#x786E;&#x7684;&#x53C2;&#x6570; */</span>
    test(<span class="hljs-string">&apos;getBizTableData api should call postJSON with right params of fetcher&apos;</span>, () =&gt; {
        <span class="hljs-comment">/* &#x6A21;&#x62DF;&#x53C2;&#x6570; */</span>
        <span class="hljs-keyword">const</span> payload = {<span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>};
        api.getBizTableData(payload);

        <span class="hljs-comment">/* &#x68C0;&#x67E5;&#x662F;&#x5426;&#x8C03;&#x7528;&#x4E86;&#x5DE5;&#x5177;&#x5E93; */</span>
        expect(fetcherStub.postJSON.callCount).toBe(<span class="hljs-number">1</span>);
        <span class="hljs-comment">/* &#x68C0;&#x67E5;&#x8C03;&#x7528;&#x53C2;&#x6570;&#x662F;&#x5426;&#x6B63;&#x786E; */</span>
        expect(fetcherStub.postJSON.lastCall.calledWith(<span class="hljs-string">&apos;/api/biz/get-table&apos;</span>, payload)).toBe(<span class="hljs-literal">true</span>);
    });
});</code></pre><p>&#x7531;&#x4E8E; api &#x5C42;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x4E86;&#x5DE5;&#x5177;&#x5E93;&#xFF0C;&#x6240;&#x4EE5;&#x8FD9;&#x91CC;&#x7528; <code>sinon.stub()</code> &#x6765;&#x66FF;&#x6362;&#x5DE5;&#x5177;&#x5E93;&#x8FBE;&#x5230;&#x6D4B;&#x8BD5;&#x76EE;&#x7684;&#x3002;</p><p>&#x63A5;&#x7740;&#x5C31;&#x662F;&#x6D4B;&#x8BD5;&#x81EA;&#x5DF1;&#x5C01;&#x88C5;&#x7684; fetch &#x5DE5;&#x5177;&#x5E93;&#x4E86;&#xFF0C;&#x8FD9;&#x91CC; fetch &#x6211;&#x662F;&#x7528;&#x7684; <code>isomorphic-fetch</code> &#xFF0C;&#x6240;&#x4EE5;&#x9009;&#x62E9;&#x4E86; <code>nock</code> &#x6765;&#x6A21;&#x62DF; Server &#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x6D4B;&#x8BD5;&#x6B63;&#x5E38;&#x8BBF;&#x95EE;&#x8FD4;&#x56DE;&#x7ED3;&#x679C;&#x548C;&#x6A21;&#x62DF;&#x670D;&#x52A1;&#x5668;&#x5F02;&#x5E38;&#x7B49;&#xFF0C;&#x793A;&#x4F8B;&#x7247;&#x6BB5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import nock from &apos;nock&apos;;
import { fetcher, FetchError } from &apos;@/utils/fetcher&apos;;

/* &#x6D4B;&#x8BD5; fetcher */
describe(&apos;fetcher&apos;, () =&gt; {

    afterEach(() =&gt; {
        nock.cleanAll();
    });

    afterAll(() =&gt; {
        nock.restore();
    });

    /* &#x6D4B;&#x8BD5; getJSON &#x83B7;&#x5F97;&#x6B63;&#x5E38;&#x6570;&#x636E; */
    test(&apos;should get success result&apos;, () =&gt; {
        nock(&apos;http://some&apos;)
            .get(&apos;/test&apos;)
            .reply(200, {success: true, result: &apos;hello, world&apos;});

        return expect(fetcher.getJSON(&apos;http://some/test&apos;)).resolves.toMatch(/^hello.+$/);
    });

    // ...

    /* &#x6D4B;&#x8BD5; getJSON &#x6355;&#x83B7; server &#x5927;&#x4E8E; 400 &#x7684;&#x5F02;&#x5E38;&#x72B6;&#x6001; */
    test(&apos;should catch server status: 400+&apos;, (done) =&gt; {
        const status = 500;
        nock(&apos;http://some&apos;)
            .get(&apos;/test&apos;)
            .reply(status);

        fetcher.getJSON(&apos;http://some/test&apos;).catch((error) =&gt; {
            expect(error).toEqual(expect.any(FetchError));
            expect(error).toHaveProperty(&apos;detail&apos;);
            expect(error.detail.status).toBe(status);
            done();
        });
    });

   /* &#x6D4B;&#x8BD5; getJSON &#x4F20;&#x9012;&#x6B63;&#x786E;&#x7684; headers &#x548C; query strings */
    test(&apos;check headers and query string of getJSON()&apos;, () =&gt; {
        nock(&apos;http://some&apos;, {
            reqheaders: {
                &apos;Accept&apos;: &apos;application/json&apos;,
                &apos;authorization&apos;: &apos;Basic Auth&apos;
            }
        })
            .get(&apos;/test&apos;)
            .query({a: &apos;123&apos;, b: 456})
            .reply(200, {success: true, result: true});

        const headers = new Headers();
        headers.append(&apos;authorization&apos;, &apos;Basic Auth&apos;);
        return expect(fetcher.getJSON(
            &apos;http://some/test&apos;, {a: &apos;123&apos;, b: 456}, headers)).resolves.toBe(true);
    });
    
    // ...
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> nock <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;nock&apos;</span>;
<span class="hljs-keyword">import</span> { fetcher, FetchError } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/fetcher&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; fetcher */</span>
describe(<span class="hljs-string">&apos;fetcher&apos;</span>, () =&gt; {

    afterEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        nock.cleanAll();
    });

    afterAll(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        nock.restore();
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; getJSON &#x83B7;&#x5F97;&#x6B63;&#x5E38;&#x6570;&#x636E; */</span>
    test(<span class="hljs-string">&apos;should get success result&apos;</span>, () =&gt; {
        nock(<span class="hljs-string">&apos;http://some&apos;</span>)
            .get(<span class="hljs-string">&apos;/test&apos;</span>)
            .reply(<span class="hljs-number">200</span>, {<span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">result</span>: <span class="hljs-string">&apos;hello, world&apos;</span>});

        <span class="hljs-keyword">return</span> expect(fetcher.getJSON(<span class="hljs-string">&apos;http://some/test&apos;</span>)).resolves.toMatch(<span class="hljs-regexp">/^hello.+$/</span>);
    });

    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; getJSON &#x6355;&#x83B7; server &#x5927;&#x4E8E; 400 &#x7684;&#x5F02;&#x5E38;&#x72B6;&#x6001; */</span>
    test(<span class="hljs-string">&apos;should catch server status: 400+&apos;</span>, (done) =&gt; {
        <span class="hljs-keyword">const</span> status = <span class="hljs-number">500</span>;
        nock(<span class="hljs-string">&apos;http://some&apos;</span>)
            .get(<span class="hljs-string">&apos;/test&apos;</span>)
            .reply(status);

        fetcher.getJSON(<span class="hljs-string">&apos;http://some/test&apos;</span>).catch(<span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
            expect(error).toEqual(expect.any(FetchError));
            expect(error).toHaveProperty(<span class="hljs-string">&apos;detail&apos;</span>);
            expect(error.detail.status).toBe(status);
            done();
        });
    });

   <span class="hljs-comment">/* &#x6D4B;&#x8BD5; getJSON &#x4F20;&#x9012;&#x6B63;&#x786E;&#x7684; headers &#x548C; query strings */</span>
    test(<span class="hljs-string">&apos;check headers and query string of getJSON()&apos;</span>, () =&gt; {
        nock(<span class="hljs-string">&apos;http://some&apos;</span>, {
            <span class="hljs-attr">reqheaders</span>: {
                <span class="hljs-string">&apos;Accept&apos;</span>: <span class="hljs-string">&apos;application/json&apos;</span>,
                <span class="hljs-string">&apos;authorization&apos;</span>: <span class="hljs-string">&apos;Basic Auth&apos;</span>
            }
        })
            .get(<span class="hljs-string">&apos;/test&apos;</span>)
            .query({<span class="hljs-attr">a</span>: <span class="hljs-string">&apos;123&apos;</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">456</span>})
            .reply(<span class="hljs-number">200</span>, {<span class="hljs-attr">success</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">result</span>: <span class="hljs-literal">true</span>});

        <span class="hljs-keyword">const</span> headers = <span class="hljs-keyword">new</span> Headers();
        headers.append(<span class="hljs-string">&apos;authorization&apos;</span>, <span class="hljs-string">&apos;Basic Auth&apos;</span>);
        <span class="hljs-keyword">return</span> expect(fetcher.getJSON(
            <span class="hljs-string">&apos;http://some/test&apos;</span>, {<span class="hljs-attr">a</span>: <span class="hljs-string">&apos;123&apos;</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">456</span>}, headers)).resolves.toBe(<span class="hljs-literal">true</span>);
    });
    
    <span class="hljs-comment">// ...</span>
});</code></pre><p>&#x57FA;&#x672C;&#x4E5F;&#x6CA1;&#x4EC0;&#x4E48;&#x590D;&#x6742;&#x7684;&#xFF0C;&#x4E3B;&#x8981;&#x6CE8;&#x610F; fetch &#x662F; promise &#x8FD4;&#x56DE;&#xFF0C;<code>jest</code> &#x7684;&#x5404;&#x79CD;&#x5F02;&#x6B65;&#x6D4B;&#x8BD5;&#x65B9;&#x6848;&#x90FD;&#x80FD;&#x5F88;&#x597D;&#x6EE1;&#x8DB3;&#x3002;</p><p>&#x5269;&#x4E0B;&#x7684;&#x90E8;&#x5206;&#x5C31;&#x662F;&#x8DDF; UI &#x76F8;&#x5173;&#x7684;&#x4E86;&#x3002;</p><h2 id="articleHeader9">&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;</h2><p>&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x7684;&#x4E3B;&#x8981;&#x76EE;&#x7684;&#x662F;&#x4F20;&#x9012; state &#x548C; actions&#xFF0C;&#x770B;&#x4E0B;&#x5DE5;&#x5177;&#x680F;&#x7684;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { connect } from &apos;react-redux&apos;;
import { getBizToolbar } from &apos;@/store/selectors&apos;;
import * as actions from &apos;@/store/actions/bizToolbar&apos;;
import BizToolbar from &apos;@/components/BizToolbar&apos;;

const mapStateToProps = (state) =&gt; ({
    ...getBizToolbar(state)
});

const mapDispatchToProps = {
    reload: actions.reload,
    updateKeywords: actions.updateKeywords
};

export default connect(mapStateToProps, mapDispatchToProps)(BizToolbar);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react-redux&apos;</span>;
<span class="hljs-keyword">import</span> { getBizToolbar } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/selectors&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> actions <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/store/actions/bizToolbar&apos;</span>;
<span class="hljs-keyword">import</span> BizToolbar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/BizToolbar&apos;</span>;

<span class="hljs-keyword">const</span> mapStateToProps = <span class="hljs-function">(<span class="hljs-params">state</span>) =&gt;</span> ({
    ...getBizToolbar(state)
});

<span class="hljs-keyword">const</span> mapDispatchToProps = {
    <span class="hljs-attr">reload</span>: actions.reload,
    <span class="hljs-attr">updateKeywords</span>: actions.updateKeywords
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> connect(mapStateToProps, mapDispatchToProps)(BizToolbar);</code></pre><p>&#x90A3;&#x4E48;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#x76EE;&#x7684;&#x4E5F;&#x662F;&#x68C0;&#x67E5;&#x8FD9;&#x4E9B;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86; <code>redux-mock-store</code> &#x6765;&#x6A21;&#x62DF; redux &#x7684; store &#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import { shallow } from &apos;enzyme&apos;;
import configureStore from &apos;redux-mock-store&apos;;
import BizToolbar from &apos;@/containers/BizToolbar&apos;;

/* &#x6D4B;&#x8BD5;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6; BizToolbar */
describe(&apos;BizToolbar container&apos;, () =&gt; {
    
    const initialState = {
        bizToolbar: {
            keywords: &apos;some keywords&apos;
        }
    };
    const mockStore = configureStore();
    let store;
    let container;

    beforeEach(() =&gt; {
        store = mockStore(initialState);
        container = shallow(&lt;BizToolbar store={store}/&gt;);
    });

    /* &#x6D4B;&#x8BD5; state &#x5230; props &#x7684;&#x6620;&#x5C04;&#x662F;&#x5426;&#x6B63;&#x786E; */
    test(&apos;should pass state to props&apos;, () =&gt; {
        const props = container.props();

        expect(props).toHaveProperty(&apos;keywords&apos;, initialState.bizToolbar.keywords);
    });

    /* &#x6D4B;&#x8BD5; actions &#x5230; props &#x7684;&#x6620;&#x5C04;&#x662F;&#x5426;&#x6B63;&#x786E; */
    test(&apos;should pass actions to props&apos;, () =&gt; {
        const props = container.props();

        expect(props).toHaveProperty(&apos;reload&apos;, expect.any(Function));
        expect(props).toHaveProperty(&apos;updateKeywords&apos;, expect.any(Function));
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code class="react"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { shallow } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;enzyme&apos;</span>;
<span class="hljs-keyword">import</span> configureStore <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;redux-mock-store&apos;</span>;
<span class="hljs-keyword">import</span> BizToolbar <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/containers/BizToolbar&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x5BB9;&#x5668;&#x7EC4;&#x4EF6; BizToolbar */</span>
describe(<span class="hljs-string">&apos;BizToolbar container&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    
    <span class="hljs-keyword">const</span> initialState = {
        bizToolbar: {
            keywords: <span class="hljs-string">&apos;some keywords&apos;</span>
        }
    };
    <span class="hljs-keyword">const</span> mockStore = configureStore();
    <span class="hljs-keyword">let</span> store;
    <span class="hljs-keyword">let</span> container;

    beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        store = mockStore(initialState);
        container = shallow(&lt;BizToolbar store={store}/&gt;);
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; state &#x5230; props &#x7684;&#x6620;&#x5C04;&#x662F;&#x5426;&#x6B63;&#x786E; */</span>
    test(<span class="hljs-string">&apos;should pass state to props&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> props = container.props();

        expect(props).toHaveProperty(<span class="hljs-string">&apos;keywords&apos;</span>, initialState.bizToolbar.keywords);
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; actions &#x5230; props &#x7684;&#x6620;&#x5C04;&#x662F;&#x5426;&#x6B63;&#x786E; */</span>
    test(<span class="hljs-string">&apos;should pass actions to props&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> props = container.props();

        expect(props).toHaveProperty(<span class="hljs-string">&apos;reload&apos;</span>, expect.any(<span class="hljs-built_in">Function</span>));
        expect(props).toHaveProperty(<span class="hljs-string">&apos;updateKeywords&apos;</span>, expect.any(<span class="hljs-built_in">Function</span>));
    });
});</code></pre><p>&#x5F88;&#x7B80;&#x5355;&#x6709;&#x6728;&#x6709;&#xFF0C;&#x6240;&#x4EE5;&#x4E5F;&#x6CA1;&#x5565;&#x53EF;&#x8BF4;&#x7684;&#x4E86;&#x3002;</p><h2 id="articleHeader10">UI &#x7EC4;&#x4EF6;</h2><p>&#x8FD9;&#x91CC;&#x4EE5;&#x8868;&#x683C;&#x7EC4;&#x4EF6;&#x4F5C;&#x4E3A;&#x793A;&#x4F8B;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x76F4;&#x63A5;&#x6765;&#x770B;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x662F;&#x600E;&#x4E48;&#x5199;&#x3002;&#x4E00;&#x822C;&#x6765;&#x8BF4; UI &#x7EC4;&#x4EF6;&#x6211;&#x4EEC;&#x4E3B;&#x8981;&#x6D4B;&#x8BD5;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x65B9;&#x9762;&#xFF1A;</p><ul><li>&#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86;&#x6B63;&#x786E;&#x7684; DOM &#x7ED3;&#x6784;</li><li>&#x6837;&#x5F0F;&#x662F;&#x5426;&#x6B63;&#x786E;</li><li>&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x89E6;&#x53D1;&#x662F;&#x5426;&#x6B63;&#x786E;</li></ul><p>&#x4E0B;&#x9762;&#x662F;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from &apos;react&apos;;
import { mount } from &apos;enzyme&apos;;
import sinon from &apos;sinon&apos;;
import { Table } from &apos;antd&apos;;
import * as defaultSettingsUtil from &apos;@/utils/defaultSettingsUtil&apos;;
import BizTable from &apos;@/components/BizTable&apos;;

/* &#x6D4B;&#x8BD5; UI &#x7EC4;&#x4EF6; BizTable */
describe(&apos;BizTable component&apos;, () =&gt; {
    
    const defaultProps = {
        loading: false,
        pagination: Object.assign({}, {
            current: 1,
            pageSize: 15,
            total: 2
        }, defaultSettingsUtil.pagination),
        data: [{id: 1}, {id: 2}],
        getData: sinon.fake(),
        updateParams: sinon.fake()
    };
    let defaultWrapper;

    beforeEach(() =&gt; {
        defaultWrapper = mount(&lt;BizTable {...defaultProps}/&gt;);
    });

    // ...

    /* &#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x529F;&#x80FD;&#x5B50;&#x7EC4;&#x4EF6; */
    test(&apos;should render table and pagination&apos;, () =&gt; {
        /* &#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86; Table &#x7EC4;&#x4EF6; */
        expect(defaultWrapper.find(Table).exists()).toBe(true);
        /* &#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86; &#x5206;&#x9875;&#x5668; &#x7EC4;&#x4EF6;&#xFF0C;&#x6837;&#x5F0F;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF08;mini&#xFF09; */
        expect(defaultWrapper.find(&apos;.ant-table-pagination.mini&apos;).exists()).toBe(true);
    });

    /* &#x6D4B;&#x8BD5;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x65F6;&#x6570;&#x636E;&#x5217;&#x8868;&#x4E3A;&#x7A7A;&#x662F;&#x5426;&#x53D1;&#x8D77;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x8BF7;&#x6C42; */
    test(&apos;when componentDidMount and data is empty, should getData&apos;, () =&gt; {
        sinon.spy(BizTable.prototype, &apos;componentDidMount&apos;);
        const props = Object.assign({}, defaultProps, {
            pagination: Object.assign({}, {
                current: 1,
                pageSize: 15,
                total: 0
            }, defaultSettingsUtil.pagination),
            data: []
        });
        const wrapper = mount(&lt;BizTable {...props}/&gt;);

        expect(BizTable.prototype.componentDidMount.calledOnce).toBe(true);
        expect(props.getData.calledOnce).toBe(true);
        BizTable.prototype.componentDidMount.restore();
    });

    /* &#x6D4B;&#x8BD5; table &#x7FFB;&#x9875;&#x540E;&#x662F;&#x5426;&#x6B63;&#x786E;&#x89E6;&#x53D1; updateParams */
    test(&apos;when change pagination of table, should updateParams&apos;, () =&gt; {
        const table = defaultWrapper.find(Table);
        table.props().onChange({current: 2, pageSize: 25});
        expect(defaultProps.updateParams.lastCall.args[0])
            .toEqual({paging: {current: 2, pageSize: 25"}}");
    });
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code class="react"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>;
<span class="hljs-keyword">import</span> { mount } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;enzyme&apos;</span>;
<span class="hljs-keyword">import</span> sinon <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;sinon&apos;</span>;
<span class="hljs-keyword">import</span> { Table } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;antd&apos;</span>;
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> defaultSettingsUtil <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/utils/defaultSettingsUtil&apos;</span>;
<span class="hljs-keyword">import</span> BizTable <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/BizTable&apos;</span>;

<span class="hljs-comment">/* &#x6D4B;&#x8BD5; UI &#x7EC4;&#x4EF6; BizTable */</span>
describe(<span class="hljs-string">&apos;BizTable component&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    
    <span class="hljs-keyword">const</span> defaultProps = {
        loading: <span class="hljs-literal">false</span>,
        pagination: <span class="hljs-built_in">Object</span>.assign({}, {
            current: <span class="hljs-number">1</span>,
            pageSize: <span class="hljs-number">15</span>,
            total: <span class="hljs-number">2</span>
        }, defaultSettingsUtil.pagination),
        data: [{id: <span class="hljs-number">1</span>}, {id: <span class="hljs-number">2</span>}],
        getData: sinon.fake(),
        updateParams: sinon.fake()
    };
    <span class="hljs-keyword">let</span> defaultWrapper;

    beforeEach(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        defaultWrapper = mount(&lt;BizTable {...defaultProps}/&gt;);
    });

    <span class="hljs-comment">// ...</span>

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86;&#x6B63;&#x786E;&#x7684;&#x529F;&#x80FD;&#x5B50;&#x7EC4;&#x4EF6; */</span>
    test(<span class="hljs-string">&apos;should render table and pagination&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">/* &#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86; Table &#x7EC4;&#x4EF6; */</span>
        expect(defaultWrapper.find(Table).exists()).toBe(<span class="hljs-literal">true</span>);
        <span class="hljs-comment">/* &#x662F;&#x5426;&#x6E32;&#x67D3;&#x4E86; &#x5206;&#x9875;&#x5668; &#x7EC4;&#x4EF6;&#xFF0C;&#x6837;&#x5F0F;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF08;mini&#xFF09; */</span>
        expect(defaultWrapper.find(<span class="hljs-string">&apos;.ant-table-pagination.mini&apos;</span>).exists()).toBe(<span class="hljs-literal">true</span>);
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5;&#x9996;&#x6B21;&#x52A0;&#x8F7D;&#x65F6;&#x6570;&#x636E;&#x5217;&#x8868;&#x4E3A;&#x7A7A;&#x662F;&#x5426;&#x53D1;&#x8D77;&#x52A0;&#x8F7D;&#x6570;&#x636E;&#x8BF7;&#x6C42; */</span>
    test(<span class="hljs-string">&apos;when componentDidMount and data is empty, should getData&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        sinon.spy(BizTable.prototype, <span class="hljs-string">&apos;componentDidMount&apos;</span>);
        <span class="hljs-keyword">const</span> props = <span class="hljs-built_in">Object</span>.assign({}, defaultProps, {
            pagination: <span class="hljs-built_in">Object</span>.assign({}, {
                current: <span class="hljs-number">1</span>,
                pageSize: <span class="hljs-number">15</span>,
                total: <span class="hljs-number">0</span>
            }, defaultSettingsUtil.pagination),
            data: []
        });
        <span class="hljs-keyword">const</span> wrapper = mount(&lt;BizTable {...props}/&gt;);

        expect(BizTable.prototype.componentDidMount.calledOnce).toBe(<span class="hljs-literal">true</span>);
        expect(props.getData.calledOnce).toBe(<span class="hljs-literal">true</span>);
        BizTable.prototype.componentDidMount.restore();
    });

    <span class="hljs-comment">/* &#x6D4B;&#x8BD5; table &#x7FFB;&#x9875;&#x540E;&#x662F;&#x5426;&#x6B63;&#x786E;&#x89E6;&#x53D1; updateParams */</span>
    test(<span class="hljs-string">&apos;when change pagination of table, should updateParams&apos;</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> table = defaultWrapper.find(Table);
        table.props().onChange({current: <span class="hljs-number">2</span>, pageSize: <span class="hljs-number">25</span>});
        expect(defaultProps.updateParams.lastCall.args[<span class="hljs-number">0</span>])
            .toEqual({paging: {current: <span class="hljs-number">2</span>, pageSize: <span class="hljs-number">25</span>"}}");
    });
});</code></pre><p>&#x5F97;&#x76CA;&#x4E8E;&#x8BBE;&#x8BA1;&#x5206;&#x5C42;&#x7684;&#x5408;&#x7406;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x5F88;&#x5BB9;&#x6613;&#x5229;&#x7528;&#x6784;&#x9020; <code>props</code> &#x6765;&#x8FBE;&#x5230;&#x6D4B;&#x8BD5;&#x76EE;&#x7684;&#xFF0C;&#x7ED3;&#x5408; <code>enzyme</code> &#x548C; <code>sinon</code> &#xFF0C;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x4F9D;&#x7136;&#x4FDD;&#x6301;&#x7B80;&#x5355;&#x7684;&#x8282;&#x594F;&#x3002;</p><h2 id="articleHeader11">&#x603B;&#x7ED3;</h2><p>&#x4EE5;&#x4E0A;&#x5C31;&#x662F;&#x8FD9;&#x4E2A;&#x573A;&#x666F;&#x5B8C;&#x6574;&#x7684;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7F16;&#x5199;&#x601D;&#x8DEF;&#x548C;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#xFF0C;&#x6587;&#x4E2D;&#x63D0;&#x53CA;&#x7684;&#x601D;&#x8DEF;&#x65B9;&#x6CD5;&#x4E5F;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x7528;&#x5728; <code>Vue</code> &#x3001;<code>Angular</code> &#x9879;&#x76EE;&#x4E0A;&#x3002;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#x5185;&#x5BB9;&#x5728; <a href="https://github.com/deepfunc/react-test-demo" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x91CC;</a> &#xFF08;&#x91CD;&#x8981;&#x7684;&#x4E8B;&#x60C5;&#x591A;&#x8BF4;&#x51E0;&#x904D;&#xFF0C;&#x5404;&#x4F4D;&#x7AE5;&#x978B;&#x89C9;&#x5F97;&#x597D;&#x5E2E;&#x5FD9;&#x53BB;&#x7ED9;&#x4E2A; <img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> &#x54C8;&#xFF09;&#x3002;</p><p>&#x6700;&#x540E;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5229;&#x7528;&#x8986;&#x76D6;&#x7387;&#x6765;&#x770B;&#x4E0B;&#x7528;&#x4F8B;&#x7684;&#x8986;&#x76D6;&#x7A0B;&#x5EA6;&#x662F;&#x5426;&#x8DB3;&#x591F;&#xFF08;&#x4E00;&#x822C;&#x6765;&#x8BF4;&#x4E0D;&#x7528;&#x523B;&#x610F;&#x8FFD;&#x6C42; 100%&#xFF0C;&#x6839;&#x636E;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x6765;&#x5B9A;&#xFF09;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbe1FP?w=1303&amp;h=709" src="https://static.alili.tech/img/bVbe1FP?w=1303&amp;h=709" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p>&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x662F; TDD &#x6D4B;&#x8BD5;&#x9A71;&#x52A8;&#x5F00;&#x53D1;&#x7684;&#x57FA;&#x7840;&#x3002;&#x4ECE;&#x4EE5;&#x4E0A;&#x6574;&#x4E2A;&#x8FC7;&#x7A0B;&#x53EF;&#x4EE5;&#x770B;&#x51FA;&#xFF0C;&#x597D;&#x7684;&#x8BBE;&#x8BA1;&#x5206;&#x5C42;&#x662F;&#x5F88;&#x5BB9;&#x6613;&#x7F16;&#x5199;&#x6D4B;&#x8BD5;&#x7528;&#x4F8B;&#x7684;&#xFF0C;&#x5355;&#x5143;&#x6D4B;&#x8BD5;&#x4E0D;&#x5355;&#x5355;&#x53EA;&#x662F;&#x4E3A;&#x4E86;&#x4FDD;&#x8BC1;&#x4EE3;&#x7801;&#x8D28;&#x91CF;&#xFF1A;&#x4ED6;&#x4F1A;&#x903C;&#x7740;&#x4F60;&#x601D;&#x8003;&#x4EE3;&#x7801;&#x8BBE;&#x8BA1;&#x7684;&#x5408;&#x7406;&#x6027;&#xFF0C;&#x62D2;&#x7EDD;&#x9762;&#x6761;&#x4EE3;&#x7801; <img src="https://static.alili.techundefined" class="emoji" alt="muscle" title="muscle"></p><p>&#x501F;&#x7528; Clean Code &#x7684;&#x7ED3;&#x675F;&#x8BED;&#xFF1A;</p><blockquote>2005 &#x5E74;&#xFF0C;&#x5728;&#x53C2;&#x52A0;&#x4E8E;&#x4E39;&#x4F5B;&#x4E3E;&#x884C;&#x7684;&#x654F;&#x6377;&#x5927;&#x4F1A;&#x65F6;&#xFF0C;Elisabeth Hedrickson &#x9012;&#x7ED9;&#x6211;&#x4E00;&#x6761;&#x7C7B;&#x4F3C; Lance Armstrong &#x70ED;&#x9500;&#x7684;&#x90A3;&#x79CD;&#x7EFF;&#x8272;&#x8155;&#x5E26;&#x3002;&#x8FD9;&#x6761;&#x8155;&#x5E26;&#x4E0A;&#x9762;&#x5199;&#x7740;&#x201C;&#x6C89;&#x8FF7;&#x6D4B;&#x8BD5;&#x201D;&#xFF08;Test Obsessed&#xFF09;&#x7684;&#x5B57;&#x6837;&#x3002;&#x6211;&#x9AD8;&#x5174;&#x5730;&#x6234;&#x4E0A;&#xFF0C;&#x5E76;&#x81EA;&#x8C6A;&#x5730;&#x4E00;&#x76F4;&#x7CFB;&#x7740;&#x3002;&#x81EA;&#x4ECE; 1999 &#x5E74;&#x4ECE; Kent Beck &#x90A3;&#x513F;&#x5B66;&#x5230; TDD &#x4EE5;&#x6765;&#xFF0C;&#x6211;&#x7684;&#x786E;&#x8FF7;&#x4E0A;&#x4E86;&#x6D4B;&#x8BD5;&#x9A71;&#x52A8;&#x5F00;&#x53D1;&#x3002;<p>&#x4E0D;&#x8FC7;&#x8DDF;&#x7740;&#x5C31;&#x53D1;&#x751F;&#x4E86;&#x4E9B;&#x5947;&#x4E8B;&#x3002;&#x6211;&#x53D1;&#x73B0;&#x81EA;&#x5DF1;&#x65E0;&#x6CD5;&#x53D6;&#x4E0B;&#x8155;&#x5E26;&#x3002;&#x4E0D;&#x4EC5;&#x662F;&#x56E0;&#x4E3A;&#x8155;&#x5E26;&#x5F88;&#x7D27;&#xFF0C;&#x800C;&#x4E14;&#x90A3;&#x4E5F;&#x662F;&#x6761;&#x7CBE;&#x795E;&#x4E0A;&#x7684;&#x7D27;&#x7B8D;&#x5492;&#x3002;&#x90A3;&#x8155;&#x5E26;&#x5C31;&#x662F;&#x6211;&#x804C;&#x4E1A;&#x9053;&#x5FB7;&#x7684;&#x5BA3;&#x544A;&#xFF0C;&#x4E5F;&#x662F;&#x6211;&#x627F;&#x8BFA;&#x5C3D;&#x5DF1;&#x6240;&#x80FD;&#x5199;&#x51FA;&#x6700;&#x597D;&#x4EE3;&#x7801;&#x7684;&#x63D0;&#x793A;&#x3002;&#x53D6;&#x4E0B;&#x5B83;&#xFF0C;&#x4EFF;&#x4F5B;&#x5C31;&#x662F;&#x8FDD;&#x80CC;&#x4E86;&#x8FD9;&#x4E9B;&#x5BA3;&#x544A;&#x548C;&#x627F;&#x8BFA;&#x4F3C;&#x7684;&#x3002;</p><p>&#x6240;&#x4EE5;&#x5B83;&#x8FD8;&#x5728;&#x6211;&#x7684;&#x624B;&#x8155;&#x4E0A;&#x3002;&#x5728;&#x5199;&#x4EE3;&#x7801;&#x65F6;&#xFF0C;&#x6211;&#x7528;&#x4F59;&#x5149;&#x779F;&#x89C1;&#x5B83;&#x3002;&#x5B83;&#x4E00;&#x76F4;&#x63D0;&#x9192;&#x6211;&#xFF0C;&#x6211;&#x505A;&#x4E86;&#x5199;&#x51FA;&#x6574;&#x6D01;&#x4EE3;&#x7801;&#x7684;&#x627F;&#x8BFA;&#x3002;</p></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web 前端单元测试到底要怎么写？看这一篇就够了

## 原文链接
[https://segmentfault.com/a/1190000015935519](https://segmentfault.com/a/1190000015935519)

