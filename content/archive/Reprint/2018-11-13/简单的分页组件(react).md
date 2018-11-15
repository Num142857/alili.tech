---
title: 简单的分页组件(react)
reprint: true
categories: reprint
abbrlink: 3e3d73af
date: 2018-11-13 02:30:09
---

{{% raw %}}
<p><strong>&#x7B80;&#x5355;&#x7684;&#x5206;&#x9875;&#x7EC4;&#x4EF6;</strong><br><em>...&#x7531;&#x4E8E;&#x5DE5;&#x4F5C;&#x539F;&#x56E0;, &#x5199;&#x8FC7;&#x4E00;&#x6BB5;vue, &#x73B0;&#x5728;&#x5165;&#x624B;jquery.&#x81EA;&#x5DF1;&#x662F;&#x6218;&#x4E94;&#x6E23;&#x9009;&#x624B;&#xFF0C;&#x4E3A;&#x4E86;&#x5DE9;&#x56FA;&#x4E4B;&#x524D;&#x5B66;&#x8FC7;&#x7684;react&#xFF0C;&#x7279;&#x610F;&#x7528;react&#x6765;&#x5B9E;&#x73B0;&#xFF0C;&#x5176;&#x5B9E;&#x60F3;&#x7528;jquery&#x3002;</em> github L6zt<br>&#x4EE3;&#x7801;&#x6548;&#x679C;&#x5982;&#x56FE;:<br><span class="img-wrap"><img data-src="/img/bVbghvc?w=1420&amp;h=146" src="https://static.alili.tech/img/bVbghvc?w=1420&amp;h=146" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span></p><hr><p>&#x601D;&#x8DEF;&#xFF1A;<br><strong>&#x7EC4;&#x4EF6;&#x57FA;&#x672C;&#x5C5E;&#x6027;:</strong><br>cur &#x5F53;&#x524D;&#x9875;&#x7801;&#xFF0C;<br>all &#x603B;&#x9875;&#x7801;<br>space &#x9875;&#x9762;&#x663E;&#x793A;&#x6570;&#x91CF; +1 &#x624D;&#x662F; &#x603B;&#x6570;&#x91CF;<br><strong>&#x7EC4;&#x4EF6;&#x6574;&#x4F53;&#x72B6;&#x6001;</strong></p><p>1&#x3001;&#x4E0E;&#x9996;&#x9875;&#x76F8;&#x8FDE;, cur &lt; space &#x57FA;&#x672C;&#x6EE1;&#x8DB3;<span class="img-wrap"><img data-src="/img/bVbghvF?w=1128&amp;h=162" src="https://static.alili.tech/img/bVbghvF?w=1128&amp;h=162" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br>2&#x3001;&#x4E2D;&#x95F4;&#x72B6;&#x6001;&#xFF0C;cur &gt; space &amp;&amp; cur &lt; all - space<span class="img-wrap"><img data-src="/img/bVbghvQ?w=1308&amp;h=134" src="https://static.alili.tech/img/bVbghvQ?w=1308&amp;h=134" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br>3&#x3001;&#x4E0E;&#x672B;&#x5C3E;&#x76F8;&#x8FDE;,cur &gt; all - space<span class="img-wrap"><img data-src="/img/bVbghvT?w=1204&amp;h=138" src="https://static.alili.tech/img/bVbghvT?w=1204&amp;h=138" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;"></span><br><strong>react &#x57FA;&#x672C;&#x64CD;&#x4F5C;</strong><br>&#x5B50;&#x7EC4;&#x4EF6;Pagination &#x901A;&#x8FC7; props &#x66F4;&#x65B0;&#x72B6;&#x6001;, &#x548C;state&#x65E0;&#x5173;&#x3002;<br><strong>show code</strong></p><pre><code>// &#x5224;&#x65AD; &#x662F;&#x4E0D;&#x662F;&#x6570;&#x5B57;
const isNumber = (num) =&gt; {
    return typeof num === &apos;number&apos;;
}
class Pagination extends  React.Component {
    constructor (props) {
        super(props);
    }
    // &#x70B9;&#x51FB;&#x56DE;&#x8C03;&#x4E8B;&#x4EF6;    
    handleClick (item) {
      // &#x7236;&#x7EC4;&#x4EF6;&#x56DE;&#x8C03;&#x4E8B;&#x4EF6;
      this.props.cb(item);
    }
    render () {
        let {cur, space, all} = this.props;
        let pgObj = [];
        // &#x7ED9;&#x4E0D;&#x540C;&#x7684;&#x5143;&#x7D20; &#x8D4B;&#x503C;class
        const checkClass = (role, active) =&gt; {
            const defaultClass = &apos;pg-span&apos;;
            if (active) {
                return    `${defaultClass} active`
            }
            switch (role) {
                case 0: {
                    return `${defaultClass}`
                }
                case 1: {
                    return `${defaultClass}`
                }
                default: {
                
                }
            }
        }
        // &#x521D;&#x59CB;&#x68C0;&#x67E5;
        if (all &lt; space) {
            all =  space
        }
        if (cur &lt;= 0) {
            cur = 0
        }
        if (cur &gt;= all) {
        cur = all
        } 
        // &#x9636;&#x6BB5;&#x5224;&#x65AD;
        if (cur &lt; space) {
            if (space === all) {
                for (let i = 1; i &lt;= space; i++) {
                    pgObj.push({
                        page: i,
                        role: 0,
                        key: i
                    })
                }
            } else {
                for (let i = 1; i &lt;= space; i ++) {
                    pgObj.push({
                        page: i,
                        role: 0,
                        key: i
                    })
                }
                pgObj.push({
                    page: &apos;...&apos;,
                    role: 1,
                    key: &apos;next&apos;
                })
                pgObj.push({
                    page: all,
                    role: 0,
                    key: all
                })
            }
        } else if (cur &gt;= space &amp;&amp; cur &lt;= all - space + 1) {
            let odd = parseInt(space / 2);
            pgObj.push({
                page: 1,
                role: 0,
                key: 1
            });
            pgObj.push({
                page: &apos;...&apos;,
                role: 1,
                key: &apos;pre&apos;
            });
            for (let i = cur - odd; i &lt;= cur + odd ; i ++) {
                pgObj.push({
                    page: i,
                    role: 1,
                    key: i
                })
            }
            pgObj.push({
                page: &apos;...&apos;,
                role: 1,
                key: &apos;next&apos;
            });
            pgObj.push({
                page: all,
                role: 1,
                key: all
            })
        } else {
            pgObj.push({
                page: 1,
                role: 0,
                key: 1
            });
            pgObj.push({
                page: &apos;...&apos;,
                role: 1,
                key: &apos;pre&apos;
            });
            for (let i = all - space + 1; i &lt;= all; i ++) {
                pgObj.push({
                    page: i,
                    role: 0,
                    key: i
                })
            };
        }
        return (
            &lt;section&gt;
                {
                    pgObj.map(item =&gt;
                        (&lt;span key={item.key}
                               className={checkClass(item.role, item.page === cur)}
                               onClick={() =&gt; {this.handleClick(item)}}
                        &gt;
                        {item.page}
                        &lt;/span&gt;))
                }
            &lt;/section&gt;
        )
    }
    
}
class Root extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
        cur: 1
      };
      this.handlePagination = this.handlePagination.bind(this);
  }
  handlePagination (item) {
      const {page} = item;
      if (isNumber(page)) {
          this.setState({
              cur: page
          })
      }
  }
  render() {
    let {cur} = this.state;
    console.log(cur);
    return  (
      &lt;div&gt;
         &lt;Pagination cur={cur} all={100} space={8} cb={this.handlePagination} /&gt;
      &lt;/div&gt;
    )
  }
};
ReactDOM.render(
  &lt;Root&gt;&lt;/Root&gt;,
  document.getElementById(&apos;root&apos;)
);
</code></pre><p><a href="https://codepen.io/L6zt/pen/zJZYmO?editors=1111" rel="nofollow noreferrer">demo&#x5730;&#x5740;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单的分页组件(react)

## 原文链接
[https://segmentfault.com/a/1190000016234603](https://segmentfault.com/a/1190000016234603)

