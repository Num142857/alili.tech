---
title: vue+vuex的应用笔记
hidden: true
categories: [reprint]
slug: '2814e449'
date: 2018-11-12 02:30:05
---

{{< raw >}}
<h3>&#x5E94;&#x7528;&#x622A;&#x56FE;</h3><p><span class="img-wrap"><img data-src="/img/bVbgvXZ?w=431&amp;h=386" src="https://static.alili.tech/img/bVbgvXZ?w=431&amp;h=386" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><h3>&#x529F;&#x80FD;&#x63CF;&#x8FF0;</h3><blockquote>&#x586B;&#x5199;&#x9080;&#x8BF7;&#x7801;&#x6CE8;&#x518C;&#x83B7;&#x5F97;&#x4F18;&#x60E0;&#x5238;<br>1&#x3001;&#x586B;&#x5199;&#x9080;&#x8BF7;&#x7801;<br>2&#x3001;&#x586B;&#x5199;&#x8054;&#x7CFB;&#x65B9;&#x5F0F;<br>3&#x3001;&#x586B;&#x5199;&#x8D26;&#x53F7;&#x4FE1;&#x606F;<br>4&#x3001;&#x5B8C;&#x6210;&#x6CE8;&#x518C;<br>2&#x548C;3&#x9700;&#x8981;&#x5FC5;&#x586B;&#x9A8C;&#x8BC1;</blockquote><h3>&#x5177;&#x4F53;&#x4EE3;&#x7801;</h3><h4>index.js</h4><blockquote>&#x77E5;&#x8BC6;&#x70B9;:<br>&#x52A0;&#x8F7D;vue&#x3001;elementUi<br>&#x8F93;&#x51FA;app&#x3001;store<br>ES6&#x6A21;&#x5757;&#x4E3B;&#x8981;&#x6709;&#x4E24;&#x4E2A;&#x529F;&#x80FD;&#xFF1A;export&#x548C;import<br><strong>export</strong> &#x7528;&#x4E8E;&#x5BF9;&#x5916;&#x8F93;&#x51FA;&#x672C;&#x6A21;&#x5757;&#xFF08;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#xFF09;&#x53D8;&#x91CF;&#x7684;&#x63A5;&#x53E3;</blockquote><pre><code>var name = &apos;lily&apos;;
var age = 19
export {
    name,
    age
}</code></pre><blockquote><strong>import</strong> &#x7528;&#x4E8E;&#x5728;&#x4E00;&#x4E2A;&#x6A21;&#x5757;&#x4E2D;&#x52A0;&#x8F7D;&#x53E6;&#x4E00;&#x4E2A;&#x542B;&#x6709;export&#x63A5;&#x53E3;&#x7684;&#x6A21;&#x5757;&#x3002;<br>&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#x4F7F;&#x7528;export&#x547D;&#x4EE4;&#x5B9A;&#x4E49;&#x4E86;&#x6A21;&#x5757;&#x7684;&#x5BF9;&#x5916;&#x63A5;&#x53E3;&#x4EE5;&#x540E;&#xFF0C;&#x5176;&#x4ED6;JS&#x6587;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;import&#x547D;&#x4EE4;&#x52A0;&#x8F7D;&#x8FD9;&#x4E2A;&#x6A21;&#x5757;&#xFF08;&#x6587;&#x4EF6;&#xFF09;</blockquote><pre><code>import {component1, component2} &#x6309;&#x9700;&#x5F15;&#x5165;&#xFF0C;&#x7ECF;&#x8FC7;&#x6253;&#x5305;&#x538B;&#x7F29;&#x540E;&#x6587;&#x4EF6;&#x4F53;&#x79EF;&#x66F4;&#x5C0F;
</code></pre><blockquote><strong>export&#x4E0E;export default&#x7684;&#x533A;&#x522B;</strong><br>1&#x3001;&#x5728;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x6216;&#x6A21;&#x5757;&#x4E2D;&#xFF0C;export&#x3001;import&#x53EF;&#x4EE5;&#x6709;&#x591A;&#x4E2A;&#xFF0C;export default&#x4EC5;&#x6709;&#x4E00;&#x4E2A;<br>2&#x3001;&#x901A;&#x8FC7;export&#x65B9;&#x5F0F;&#x5BFC;&#x51FA;&#xFF0C;&#x5728;&#x5BFC;&#x5165;&#x65F6;&#x8981;&#x52A0;{ }&#xFF0C;export default&#x5219;&#x4E0D;&#x9700;&#x8981;</blockquote><pre><code>
import Vue from &apos;vue&apos;;
import ElementUI from &apos;element-ui&apos;;
import &apos;element-ui/lib/theme-chalk/index.css&apos;;

import App from &apos;./app.vue&apos;;
import store from &apos;./store&apos;;

Vue.use(ElementUI);

export {
    App,
    store
};
</code></pre><h4>app.vue</h4><blockquote>&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;&#x7EC4;&#x4EF6;components</blockquote><pre><code>
&lt;template&gt;
    &lt;div class=&quot;register-page&quot;&gt;
        &lt;steps-bar/&gt;
        &lt;register-form/&gt;
    &lt;/div&gt;
&lt;/template&gt;
    
    &lt;script&gt;
        import StepsBar from &quot;./stepsBar.vue&quot;;
        import RegisterForm from &quot;./registerForm.vue&quot;;
        
        export default {
            components: {
                &apos;steps-bar&apos;: StepsBar,
                &apos;register-form&apos;: RegisterForm,
            }
        };
    &lt;/script&gt;
    &lt;style lang=&quot;scss&quot;&gt;
        html{
            min-width:auto;
            font-size: 100%;
        }
        .register-page{
            padding:20px;
        }
    &lt;/style&gt;
    </code></pre><h4>registerForm.vue</h4><blockquote>&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;<br>elementui&#x8868;&#x5355;&#x53CA;&#x9A8C;&#x8BC1;<br>vuex&#x7684;mapState<br>store&#x7684;&#x8FD0;&#x7528;</blockquote><pre><code>&lt;template&gt;
&lt;div class=&quot;register-box&quot;&gt;
    &lt;el-form ref=&quot;registerForm&quot; :rules=&quot;registerFormRules&quot; :model=&quot;registerForm&quot; label-width=&quot;110px&quot;&gt;
        &lt;div class=&quot;step0&quot; v-if=&quot;active == 0&quot;&gt;
            &lt;el-form-item label=&quot;&#x9080;&#x8BF7;&#x7801;&#xFF1A;&quot; prop = &quot;code&quot;&gt;
                &lt;el-input v-model=&quot;registerForm.code&quot;&gt;&lt;/el-input&gt;
            &lt;/el-form-item&gt;
        &lt;/div&gt;
        &lt;div class=&quot;step1&quot; v-if=&quot;active == 1&quot;&gt;
            &lt;el-form-item label=&quot;&#x624B;&#x673A;&#x53F7;&#xFF1A;&quot; prop=&quot;tel&quot;&gt;
                &lt;el-input v-model=&quot;registerForm.tel&quot;&gt;&lt;/el-input&gt;
            &lt;/el-form-item&gt;
            &lt;el-form-item label=&quot;&#x77ED;&#x4FE1;&#x9A8C;&#x8BC1;&#x7801;&#xFF1A;&quot; prop=&quot;smsCode&quot;&gt;
                &lt;el-input v-model=&quot;registerForm.smsCode&quot; class=&quot;smsCodeInput&quot;&gt;&lt;/el-input&gt;
                &lt;el-button @click.prevent=&quot;getSmsCode()&quot;&gt;&#x83B7;&#x53D6;&#x9A8C;&#x8BC1;&#x7801;&lt;/el-button&gt;
            &lt;/el-form-item&gt;
        &lt;/div&gt;
        &lt;div class=&quot;step3&quot; v-if=&quot;active == 2&quot;&gt;
            &lt;el-form-item label=&quot;&#x4F01;&#x4E1A;&#x540D;&#x79F0;&#xFF1A;&quot; prop=&quot;ent&quot;&gt;
                &lt;el-input v-model=&quot;registerForm.ent&quot;&gt;&lt;/el-input&gt;
            &lt;/el-form-item&gt;
            &lt;el-form-item label=&quot;&#x59D3;&#x540D;&#xFF1A;&quot; prop=&quot;name&quot;&gt;
                &lt;el-input v-model=&quot;registerForm.name&quot;&gt;&lt;/el-input&gt;
            &lt;/el-form-item&gt;
            &lt;el-form-item label=&quot;&#x5BC6;&#x7801;&#xFF1A;&quot; prop=&quot;password&quot;&gt;
                &lt;el-input type=&quot;password&quot; v-model=&quot;registerForm.password&quot;&gt;&lt;/el-input&gt;
            &lt;/el-form-item&gt;
        &lt;/div&gt;
        &lt;div class=&quot;step4 register-success&quot; v-if=&quot;active == 3&quot;&gt;
            &lt;i class=&quot;el-icon-circle-check&quot; style=&quot;font-size: 32px;&quot;&gt;&lt;/i&gt;
            &lt;p&gt;&#x6CE8;&#x518C;&#x6210;&#x529F;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/el-form&gt;
    &lt;div class=&quot;next-box&quot; v-if=&quot;active&lt;3&quot;&gt;
        &lt;el-button type=&quot;primary&quot; @click=&quot;next&quot; v-loading=&quot;registerLoading&quot;&gt;&#x4E0B;&#x4E00;&#x6B65;&lt;/el-button&gt;
    &lt;/div&gt;
&lt;/div&gt;</code></pre><p>&lt;/template&gt;</p><p>&lt;script&gt;</p><pre><code>import { mapState } from &apos;vuex&apos;;
import { NAMESPACE, NEXT_STEP} from &apos;./vuex&apos;;

export default {
    data(){
        return {
            registerForm: {
                code: &apos;sdada121212121&apos;,
                tel: &apos;&apos;,
                smsCode: &apos;&apos;,
                ent: &apos;&apos;,
                name: &apos;&apos;,
                password:&apos;&apos;
            },
            registerFormRules: {
                tel:[
                    { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x624B;&#x673A;&#x53F7;&#x7801;&apos;, trigger: &apos;blur&apos; },
                    { min: 11, max: 11, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x6B63;&#x786E;&#x7684;11&#x4F4D;&#x624B;&#x673A;&#x53F7;&#x7801;&apos;, trigger: &apos;blur&apos; }
                ],
                smsCode:[
                    { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x77ED;&#x4FE1;&#x9A8C;&#x8BC1;&#x7801;&apos;, trigger: &apos;blur&apos; },
                ],
                ent:[
                    { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x4F01;&#x4E1A;&#x540D;&#x79F0;&apos;, trigger: &apos;blur&apos; },
                ],
                name:[
                    { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x59D3;&#x540D;&apos;, trigger: &apos;blur&apos; },
                ],
                password:[
                    { required: true, message: &apos;&#x8BF7;&#x8F93;&#x5165;&#x5BC6;&#x7801;&apos;, trigger: &apos;blur&apos; },
                ],
            }
        }
    },
    computed:{
        ...mapState({
            active: state =&gt; state.register.stepsAction,
            registerLoading: state =&gt; state.register.registerLoading
        })
    },
    methods: {
        validate(callback) {
            this.$refs[&apos;registerForm&apos;].validate((valid) =&gt; {
                if (valid) {
                    callback &amp;&amp; callback(this.registerForm);
                } else {
                    console.log(&apos;error submit!!&apos;);
                    return false;
                }
            });
        },
        next() {
            this.validate((data)=&gt;{
                if (this.active === 2) { // &#x63D0;&#x4EA4;&#x6CE8;&#x518C;
                    console.log(data);
                    this.$store.dispatch(`${NAMESPACE}/registerSave`, data);
                } else {
                    this.$store.commit(`${NAMESPACE}/${NEXT_STEP}`, 1);
                }
            });
            }
        }
    };
&lt;/script&gt;

&lt;style lang=&quot;scss&quot; scoped&gt;
    .register-box{
        margin:60px 20px;
    }
    .register-success{
        font-size: 32px;
        display:flex;
        justify-content: center;
        align-items: center;
    }
    .next-box{
        display:flex;
        justify-content:center;
        align-items:center;
        margin:60px 0 10px;
    }
    .smsCodeInput{
        width: calc(100% - 118px);
    }
&lt;/style&gt;</code></pre><blockquote>stepsBar.vue</blockquote><pre><code>&lt;template&gt;
    &lt;el-steps :active=&quot;active&quot; align-center&gt;
        &lt;el-step title=&quot;&#x9080;&#x8BF7;&#x7801;&quot;&gt;&lt;/el-step&gt;
        &lt;el-step title=&quot;&#x8054;&#x7CFB;&#x65B9;&#x5F0F;&quot;&gt;&lt;/el-step&gt;
        &lt;el-step title=&quot;&#x8D26;&#x53F7;&#x4FE1;&#x606F;&quot;&gt;&lt;/el-step&gt;
        &lt;el-step title=&quot;&#x5B8C;&#x6210;&#x6CE8;&#x518C;&quot;&gt;&lt;/el-step&gt;
    &lt;/el-steps&gt;
&lt;/template&gt;

&lt;script&gt;
    import {mapState} from &apos;vuex&apos;;

    export default {
        computed:{
            ...mapState({
                active: state =&gt; state.register.stepsAction
            })
        }
    };
&lt;/script&gt;
</code></pre><h4>store.js</h4><blockquote>&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;<br>store&#x62C6;&#x5206;&#x5373;&#x591A;&#x6A21;&#x5757;&#x72B6;&#x6001;&#x7BA1;&#x7406;(modules)</blockquote><pre><code>//&#x5B9A;&#x4E49;&#x65B9;&#x6CD5;
export const NAMESPACE = &apos;register&apos;;
export default {
    namespaced: true,
    state,
    mutations,
    actions
};
// &#x4F7F;&#x7528;&#x65B9;&#x6CD5;
import { mapState } from &apos;vuex&apos;;
import { NAMESPACE, NEXT_STEP} from &apos;./vuex&apos;;
//&#x76D1;&#x542C;&#x54CD;&#x5E94;&#x5F0F;&#x5C5E;&#x6027;&#x53D8;&#x5316;
computed:{
    ...mapState({
        active: state =&gt; state.register.stepsAction
    })
}
//&#x89E6;&#x53D1;actions
this.$store.dispatch(`${NAMESPACE}/registerSave`, data); 
//&#x89E6;&#x53D1;mutations
this.$store.commit(`${NAMESPACE}/${NEXT_STEP}`, 1);

//store.js
import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;

Vue.use(Vuex);

import register from &apos;./vuex.js&apos;;
const store = new Vuex.Store({
    modules:{
        register
    }
});

export default store;</code></pre><h4>vuex.js</h4><blockquote>&#x77E5;&#x8BC6;&#x70B9;&#xFF1A;<br>&#x5BF9;&#x8C61;&#x7684;&#x89E3;&#x6784;&#x8D4B;&#x503C;</blockquote><pre><code>const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc  // Object {start: Object}
start // Object {line: 1, column: 5}    </code></pre><blockquote>vuex NAMESPACE:<br>vuex&#x4E2D;&#x7684;store&#x5206;&#x6A21;&#x5757;&#x7BA1;&#x7406;&#xFF0C;&#x9700;&#x8981;&#x5728;store&#x7684;index.js&#x4E2D;&#x5F15;&#x5165;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#xFF0C;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4E0D;&#x540C;&#x6A21;&#x5757;&#x547D;&#x540D;&#x51B2;&#x7A81;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5C06;&#x4E0D;&#x540C;&#x6A21;&#x5757;&#x7684;namespaced:true&#xFF0C;&#x4E4B;&#x540E;&#x5728;&#x4E0D;&#x540C;&#x9875;&#x9762;&#x4E2D;&#x5F15;&#x5165;getter&#x3001;actions&#x3001;mutations&#x65F6;&#xFF0C;&#x9700;&#x8981;&#x52A0;&#x4E0A;&#x6240;&#x5C5E;&#x7684;&#x6A21;&#x5757;&#x540D;<br>mutations&#x548C;actions&#x7684;&#x533A;&#x522B;<br>Vuex&#x4E2D;store&#x6570;&#x636E;&#x6539;&#x53D8;&#x7684;&#x552F;&#x4E00;&#x65B9;&#x6CD5;&#x5C31;&#x662F;mutation<br>actions &#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x67B6;&#x6784;&#x6027;&#x7684;&#x6982;&#x5FF5;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x5FC5;&#x987B;&#x7684;&#xFF0C;&#x8BF4;&#x5230;&#x5E95;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4F60;&#x5728;&#x91CC;&#x9762;&#x60F3;&#x5E72;&#x561B;&#x90FD;&#x53EF;&#x4EE5;&#xFF0C;&#x53EA;&#x8981;&#x6700;&#x540E;&#x89E6;&#x53D1; mutation &#x5C31;&#x884C;&#x3002;&#x5F02;&#x6B65;&#x7ADE;&#x6001;&#x600E;&#x4E48;&#x5904;&#x7406;&#x90A3;&#x662F;&#x7528;&#x6237;&#x81EA;&#x5DF1;&#x7684;&#x4E8B;&#x60C5;&#x3002;vuex &#x771F;&#x6B63;&#x9650;&#x5236;&#x4F60;&#x7684;&#x53EA;&#x6709; mutation &#x5FC5;&#x987B;&#x662F;&#x540C;&#x6B65;&#x7684;&#x8FD9;&#x4E00;&#x70B9;<p>&#x4F7F;&#x7528;&#x5E38;&#x91CF;&#x66FF;&#x4EE3; Mutation &#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</p></blockquote><pre><code>//vuex.js
import { Message } from &apos;element-ui&apos;;

import api from &apos;@/api&apos;;
const { website: { register: { register: { registerHandle } } } } = api;

export const NAMESPACE = &apos;register&apos;;

export const NEXT_STEP = &apos;NEXT_STEP&apos;;
export const SUBMIT_LOADING = &apos;SUBMIT_LOADING&apos;;
export const SUBMIT_SUCCESS = &apos;SUBMIT_SUCCESS&apos;;
export const SUBMIT_ERROR = &apos;SUBMIT_ERROR&apos;;

const state = {
    stepsAction: 0,
    registerLoading: false
};

const mutations = {
    [NEXT_STEP](state, n) {
        state.stepsAction = state.stepsAction + n;
    },
    [SUBMIT_LOADING](state) {
        state.registerLoading = true;
    },
    [SUBMIT_SUCCESS](state) {
        state.registerLoading = false;
        state.stepsAction = state.stepsAction + 1;
    },
    [SUBMIT_ERROR](state, res) {
        state.registerLoading = false;
        Message.error(res.msg);
    }
};

const actions = {
    registerSave({ commit, state }, data) {
        commit(SUBMIT_LOADING);
        registerHandle(data).then((response) =&gt; {
            if (response.status === 200) {
                const responseData = response.data;
                const result = responseData.result;
                if (responseData.status === 200) {
                    commit(SUBMIT_SUCCESS, result);
                } else {
                    commit(SUBMIT_ERROR, {
                        msg: responseData.msg
                    });
                }
            }
        }).catch(() =&gt; {
            commit(SUBMIT_ERROR, { msg: &apos;&#x670D;&#x52A1;&#x5668;&#x8BF7;&#x6C42;&#x9519;&#x8BEF;&apos; });
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};

</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+vuex的应用笔记

## 原文链接
[https://segmentfault.com/a/1190000016291636](https://segmentfault.com/a/1190000016291636)

