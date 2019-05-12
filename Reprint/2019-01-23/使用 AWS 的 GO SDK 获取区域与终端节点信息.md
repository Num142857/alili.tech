---
title: '使用 AWS 的 GO SDK 获取区域与终端节点信息' 
date: 2019-01-23 2:30:08
hidden: true
slug: ajlfgekk2xf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-aws-的-go-sdk-获取区域与终端节点信息"></a>使用 AWS 的 GO SDK 获取区域与终端节点信息</h1>
<p>LCTT 译注： 终端节点（Endpoint），详情请见: <a href="http://docs.amazonaws.cn/general/latest/gr/rande.html">http://docs.amazonaws.cn/general/latest/gr/rande.html</a></p>
<p>最新发布的 GO 的 SDK <a href="https://github.com/aws/aws-sdk-go/releases/tag/v1.6.0">v1.6.0</a> 版本，加入了获取区域与终端节点信息的功能。它可以很方便地列出区域、服务和终端节点的相关信息。可以通过 <a href="http://docs.aws.amazon.com/sdk-for-go/api/aws/endpoints/">github.com/aws/aws-sdk-go/aws/endpoints</a> 包使用这些功能。</p>
<p>endpoints 包提供了一个易用的接口，可以获取到一个服务的终端节点的 url 列表和区域列表信息。并且我们将相关信息根据 AWS 服务区域进行了分组，如 AWS 标准、AWS 中国和 AWS GovCloud（美国）。</p>
<h3><a href="#解析终端节点"></a>解析终端节点</h3>
<p>设置 SDK 的默认配置时， SDK 会自动地使用 <code>endpoints.DefaultResolver</code> 函数。你也可以自己调用包中的<code>EndpointFor</code> 方法来解析终端节点。</p>
<p>// 解析在us-west-2区域的S3服务的终端节点
resolver := endpoints.DefaultResolver()
endpoint, err := resolver.EndpointFor(endpoints.S3ServiceID, endpoints.UsWest2RegionID)
if err != nil {
        fmt.Println("failed to resolve endpoint", err)
        return
}</p>
<p>fmt.Println("Resolved URL:", endpoint.URL)</p>
<p>如果你需要自定义终端节点的解析逻辑，你可以实现 <code>endpoints.Resolver</code> 接口，并传值给<code>aws.Config.EndpointResolver</code>。当你打算编写自定义的终端节点逻辑，让 SDK 可以用来解析服务的终端节点时候，这个功能就会很有用。</p>
<p>以下示例，创建了一个配置好的 Session，然后 <a href="https://aws.amazon.com/s3/">Amazon S3</a> 服务的客户端就可以使用这个自定义的终端节点。</p>
<p>s3CustResolverFn := func(service, region string, optFns ...func(*endpoints.Options)) (endpoints.ResolvedEndpoint, error) {
        if service == "s3" {
               return endpoints.ResolvedEndpoint{
                       URL:           "s3.custom.endpoint.com",
                       SigningRegion: "custom-signing-region",
               }, nil
        }</p>
<pre><code class="hljs kotlin">    <span class="hljs-keyword">return</span> defaultResolver.EndpointFor(service, region, optFns...)
</code></pre><p>}
sess := session.Must(session.NewSessionWithOptions(session.Options{
        Config: aws.Config{
               Region:           aws.String("us-west-2"),
               EndpointResolver: endpoints.ResolverFunc(s3CustResolverFn),
        },
}))</p>
<h3><a href="#分区"></a>分区</h3>
<p><code>endpoints.DefaultResolver</code> 函数的返回值可以被 <code>endpoints.EnumPartitions</code>接口使用。这样就可以获取 SDK 使用的分区片段，也可以列出每个分区的分区信息。</p>
<p>// 迭代所有分区表打印每个分区的ID
resolver := endpoints.DefaultResolver()
partitions := resolver.(endpoints.EnumPartitions).Partitions()</p>
<p>for _, p := range partitions {
        fmt.Println("Partition:", p.ID())
}</p>
<p>除了分区表之外，endpoints 包也提供了每个分区组的 getter 函数。这些工具函数可以方便列出指定分区，而不用执行默认解析器列出所有的分区。</p>
<p>partition := endpoints.AwsPartition()
region := partition.Regions()[endpoints.UsWest2RegionID]</p>
<p>fmt.Println("Services in region:", region.ID())
for id, _ := range region.Services() {
        fmt.Println(id)
}</p>
<p>当你获取区域和服务值后，可以调用 <code>ResolveEndpoint</code>。这样解析端点时，就可以提供分区的过滤视图。</p>
<p>获取更多 AWS SDK for GO 信息, 请关注<a href="https://github.com/aws/aws-sdk-go/tree/master/example/aws/endpoints">其开源仓库</a>。若你有更好的看法，请留言评论。</p>
<hr>
<p>via: <a href="https://aws.amazon.com/cn/blogs/developer/using-the-aws-sdk-for-gos-regions-and-endpoints-metadata">https://aws.amazon.com/cn/blogs/developer/using-the-aws-sdk-for-gos-regions-and-endpoints-metadata</a></p>
<p>作者：<a href="https://aws.amazon.com/cn/blogs/developer/using-the-aws-sdk-for-gos-regions-and-endpoints-metadata">Jason Del Ponte</a> 译者：<a href="http://vicyu.com">Vic020</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 AWS 的 GO SDK 获取区域与终端节点信息

## 原文链接
[https://www.zcfy.cc/article/using-the-aws-sdk-for-gos-regions-and-endpoints-metadata](https://www.zcfy.cc/article/using-the-aws-sdk-for-gos-regions-and-endpoints-metadata)

