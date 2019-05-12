---
title: '在 Azure 中部署 Kubernetes 容器集群' 
date: 2019-01-22 2:30:08
hidden: true
slug: 8ncsi1bag2l
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#在-azure-中部署-kubernetes-容器集群"></a>在 Azure 中部署 Kubernetes 容器集群</h1>
<p>在这个快速入门教程中，我们使用 Azure CLI 创建一个 Kubernetes 集群，然后在集群上部署运行由 Web 前端和 Redis 实例组成的多容器应用程序。一旦部署完成，应用程序可以通过互联网访问。</p>
<p><a href="https://p0.ssl.qhimg.com/t011f1150ab88e283c6.png"><img src="https://p0.ssl.qhimg.com/t011f1150ab88e283c6.png" alt="示例应用截图"></a></p>
<p>这个快速入门教程假设你已经基本了解了 Kubernetes 的概念，有关 Kubernetes 的详细信息，请参阅 <a href="https://kubernetes.io/docs/home/">Kubernetes 文档</a>。</p>
<p>如果您没有 Azure 账号，请在开始之前创建一个<a href="https://azure.microsoft.com/free/?WT.mc_id=A261C142F">免费帐户</a>。</p>
<h3><a href="#登录-azure-云控制台"></a>登录 Azure 云控制台</h3>
<p>Azure 云控制台是一个免费的 Bash shell，你可以直接在 Azure 网站上运行。它已经在你的账户中预先配置好了， 单击 <a href="https://portal.azure.com/">Azure 门户</a>右上角菜单上的 “Cloud Shell” 按钮；</p>
<p><a href="https://portal.azure.com/"><img src="" alt="Cloud Shell"></a></p>
<p>该按钮会启动一个交互式 shell，您可以使用它来运行本教程中的所有操作步骤。</p>
<p><a href="https://portal.azure.com/"><img src="https://p0.ssl.qhimg.com/t014eb8c73c868a7771.png" alt="Cloud Shell 截图"></a></p>
<p>此快速入门教程所用的 Azure CLI 的版本最低要求为 2.0.4。如果您选择在本地安装和使用 CLI 工具，请运行 <code>az --version</code> 来检查已安装的版本。 如果您需要安装或升级请参阅<a href="https://docs.microsoft.com/en-us/cli/azure/install-azure-cli">安装 Azure CLI 2.0</a> 。</p>
<h3><a href="#创建一个资源组"></a>创建一个资源组</h3>
<p>使用 <a href="https://docs.microsoft.com/en-us/cli/azure/group#create">az group create</a> 命令创建一个资源组，一个 Azure 资源组是指 Azure 资源部署和管理的逻辑组。</p>
<p>以下示例在 <em>eastus</em> 区域中创建名为 <em>myResourceGroup</em> 的资源组。</p>
<pre><code class="hljs routeros">az<span class="hljs-built_in"> group </span>create --name myResourceGroup --location eastus


</code></pre><p>输出：</p>
<pre><code class="hljs json">{
  <span class="hljs-attr">"id"</span>: <span class="hljs-string">"/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup"</span>,
  <span class="hljs-attr">"location"</span>: <span class="hljs-string">"eastus"</span>,
  <span class="hljs-attr">"managedBy"</span>: <span class="hljs-literal">null</span>,
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"myResourceGroup"</span>,
  <span class="hljs-attr">"properties"</span>: {
    <span class="hljs-attr">"provisioningState"</span>: <span class="hljs-string">"Succeeded"</span>
  },
  <span class="hljs-attr">"tags"</span>: <span class="hljs-literal">null</span>
}


</code></pre><h3><a href="#创建一个-kubernetes-集群"></a>创建一个 Kubernetes 集群</h3>
<p>使用 <a href="https://docs.microsoft.com/en-us/cli/azure/acs#create">az acs create</a> 命令在 Azure 容器服务中创建 Kubernetes 集群。 以下示例使用一个 Linux 主节点和三个 Linux 代理节点创建一个名为 <em>myK8sCluster</em> 的集群。</p>
<pre><code class="hljs verilog">az acs create --orchestrator-<span class="hljs-keyword">type</span>=kubernetes --resource-group myResourceGroup --name=myK8sCluster --<span class="hljs-keyword">generate</span>-ssh-keys 


</code></pre><p>几分钟后，命令将完成并返回有关该集群的 json 格式的信息。</p>
<h3><a href="#连接到-kubernetes-集群"></a>连接到 Kubernetes 集群</h3>
<p>要管理 Kubernetes 群集，可以使用 Kubernetes 命令行工具 <a href="https://kubernetes.io/docs/user-guide/kubectl/">kubectl</a>。</p>
<p>如果您使用 Azure CloudShell ，则已经安装了 kubectl 。如果要在本地安装，可以使用 <a href="https://docs.microsoft.com/en-us/cli/azure/acs/kubernetes#install-cli">az acs kubernetes install-cli</a> 命令。</p>
<p>要配置 kubectl 连接到您的 Kubernetes 群集，请运行 <a href="https://docs.microsoft.com/en-us/cli/azure/acs/kubernetes#get-credentials">az acs kubernetes get-credentials</a> 命令下载凭据并配置 Kubernetes CLI 以使用它们。</p>
<pre><code class="hljs dsconfig"><span class="hljs-string">az </span><span class="hljs-string">acs </span><span class="hljs-string">kubernetes </span><span class="hljs-built_in">get-credentials</span> <span class="hljs-built_in">--resource-group=myResourceGroup</span> <span class="hljs-built_in">--name=myK8sCluster</span>


</code></pre><p>要验证与集群的连接，请使用 <a href="https://kubernetes.io/docs/user-guide/kubectl/v1.6/#get">kubectl get</a> 命令查看集群节点的列表。</p>
<pre><code class="hljs routeros">kubectl <span class="hljs-builtin-name">get</span> nodes


</code></pre><p>输出：</p>
<pre><code class="hljs lsl">NAME                    STATUS                     AGE       VERSION
k8s-agent<span class="hljs-number">-14</span>ad53a1<span class="hljs-number">-0</span>    Ready                      <span class="hljs-number">10</span>m       v1<span class="hljs-number">.6</span><span class="hljs-number">.6</span>
k8s-agent<span class="hljs-number">-14</span>ad53a1<span class="hljs-number">-1</span>    Ready                      <span class="hljs-number">10</span>m       v1<span class="hljs-number">.6</span><span class="hljs-number">.6</span>
k8s-agent<span class="hljs-number">-14</span>ad53a1<span class="hljs-number">-2</span>    Ready                      <span class="hljs-number">10</span>m       v1<span class="hljs-number">.6</span><span class="hljs-number">.6</span>
k8s-master<span class="hljs-number">-14</span>ad53a1<span class="hljs-number">-0</span>   Ready,SchedulingDisabled   <span class="hljs-number">10</span>m       v1<span class="hljs-number">.6</span><span class="hljs-number">.6</span>


</code></pre><h3><a href="#运行应用程序"></a>运行应用程序</h3>
<p>Kubernetes 清单文件为集群定义了一个所需的状态，包括了集群中应该运行什么样的容器镜像。 对于此示例，清单用于创建运行 Azure Vote 应用程序所需的所有对象。</p>
<p>创建一个名为 <code>azure-vote.yaml</code> ，将下面的内容拷贝到 YAML 中。</p>
<pre><code class="hljs yaml"><span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">azure-vote-back</span>
<span class="hljs-attr">spec:</span>
<span class="hljs-attr">  replicas:</span> <span class="hljs-number">1</span>
<span class="hljs-attr">  template:</span>
<span class="hljs-attr">    metadata:</span>
<span class="hljs-attr">      labels:</span>
<span class="hljs-attr">        app:</span> <span class="hljs-string">azure-vote-back</span>
<span class="hljs-attr">    spec:</span>
<span class="hljs-attr">      containers:</span>
<span class="hljs-attr">      - name:</span> <span class="hljs-string">azure-vote-back</span>
<span class="hljs-attr">        image:</span> <span class="hljs-string">redis</span>
<span class="hljs-attr">        ports:</span>
<span class="hljs-attr">        - containerPort:</span> <span class="hljs-number">6379</span>
<span class="hljs-attr">          name:</span> <span class="hljs-string">redis</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Service</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">azure-vote-back</span>
<span class="hljs-attr">spec:</span>
<span class="hljs-attr">  ports:</span>
<span class="hljs-attr">  - port:</span> <span class="hljs-number">6379</span>
<span class="hljs-attr">  selector:</span>
<span class="hljs-attr">    app:</span> <span class="hljs-string">azure-vote-back</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">apps/v1beta1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Deployment</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">azure-vote-front</span>
<span class="hljs-attr">spec:</span>
<span class="hljs-attr">  replicas:</span> <span class="hljs-number">1</span>
<span class="hljs-attr">  template:</span>
<span class="hljs-attr">    metadata:</span>
<span class="hljs-attr">      labels:</span>
<span class="hljs-attr">        app:</span> <span class="hljs-string">azure-vote-front</span>
<span class="hljs-attr">    spec:</span>
<span class="hljs-attr">      containers:</span>
<span class="hljs-attr">      - name:</span> <span class="hljs-string">azure-vote-front</span>
<span class="hljs-attr">        image:</span> <span class="hljs-string">microsoft/azure-vote-front:redis-v1</span>
<span class="hljs-attr">        ports:</span>
<span class="hljs-attr">        - containerPort:</span> <span class="hljs-number">80</span>
<span class="hljs-attr">        env:</span>
<span class="hljs-attr">        - name:</span> <span class="hljs-string">REDIS</span>
<span class="hljs-attr">          value:</span> <span class="hljs-string">"azure-vote-back"</span>
<span class="hljs-meta">---</span>
<span class="hljs-attr">apiVersion:</span> <span class="hljs-string">v1</span>
<span class="hljs-attr">kind:</span> <span class="hljs-string">Service</span>
<span class="hljs-attr">metadata:</span>
<span class="hljs-attr">  name:</span> <span class="hljs-string">azure-vote-front</span>
<span class="hljs-attr">spec:</span>
<span class="hljs-attr">  type:</span> <span class="hljs-string">LoadBalancer</span>
<span class="hljs-attr">  ports:</span>
<span class="hljs-attr">  - port:</span> <span class="hljs-number">80</span>
<span class="hljs-attr">  selector:</span>
<span class="hljs-attr">    app:</span> <span class="hljs-string">azure-vote-front</span>


</code></pre><p>使用 <a href="https://kubernetes.io/docs/user-guide/kubectl/v1.6/#create">kubectl create</a> 命令来运行该应用程序。</p>
<pre><code class="hljs stylus">kubectl create -f azure-vote<span class="hljs-selector-class">.yaml</span>


</code></pre><p>输出：</p>
<pre><code class="hljs routeros">deployment <span class="hljs-string">"azure-vote-back"</span> created<span class="hljs-built_in">
service </span><span class="hljs-string">"azure-vote-back"</span> created
deployment <span class="hljs-string">"azure-vote-front"</span> created<span class="hljs-built_in">
service </span><span class="hljs-string">"azure-vote-front"</span> created


</code></pre><h3><a href="#测试应用程序"></a>测试应用程序</h3>
<p>当应用程序的跑起来之后，需要创建一个 <a href="https://kubernetes.io/docs/concepts/services-networking/service/">Kubernetes 服务</a>，将应用程序前端暴露在互联网上。 此过程可能需要几分钟才能完成。</p>
<p>要监控这个进程，使用 <a href="https://kubernetes.io/docs/user-guide/kubectl/v1.6/#get">kubectl get service</a> 命令时加上 <code>--watch</code> 参数。</p>
<pre><code class="hljs routeros">kubectl <span class="hljs-builtin-name">get</span><span class="hljs-built_in"> service </span>azure-vote-front --watch


</code></pre><p>最初，<em>azure-vote-front</em> 服务的 EXTERNAL-IP 显示为 <em>pending</em> 。 一旦 EXTERNAL-IP 地址从 <em>pending</em> 变成一个具体的 IP 地址，请使用 “CTRL-C” 来停止 kubectl 监视进程。</p>
<pre><code class="hljs x86asm">azure-vote-front   <span class="hljs-number">10.0</span><span class="hljs-meta">.34</span><span class="hljs-meta">.242</span>   &lt;pending&gt;     <span class="hljs-number">80</span>:<span class="hljs-number">30676</span>/TCP   7s
azure-vote-front   <span class="hljs-number">10.0</span><span class="hljs-meta">.34</span><span class="hljs-meta">.242</span>   <span class="hljs-number">52.179</span><span class="hljs-meta">.23</span><span class="hljs-meta">.131</span>   <span class="hljs-number">80</span>:<span class="hljs-number">30676</span>/TCP   2m


</code></pre><p>现在你可以通过这个外网 IP 地址访问到 Azure Vote 这个应用了。</p>
<p><a href="https://camo.githubusercontent.com/3da6a5090deb0d89bf30cfe70757b5d78de1c3bd/68747470733a2f2f646f63732e6d6963726f736f66742e636f6d2f656e2d75732f617a7572652f636f6e7461696e65722d736572766963652f6b756265726e657465732f6d656469612f636f6e7461696e65722d736572766963652d6b756265726e657465732d77616c6b7468726f7567682f617a7572652d766f74652e706e67"><img src="https://camo.githubusercontent.com/3da6a5090deb0d89bf30cfe70757b5d78de1c3bd/68747470733a2f2f646f63732e6d6963726f736f66742e636f6d2f656e2d75732f617a7572652f636f6e7461696e65722d736572766963652f6b756265726e657465732f6d656469612f636f6e7461696e65722d736572766963652d6b756265726e657465732d77616c6b7468726f7567682f617a7572652d766f74652e706e67" alt="浏览 Azure Vote 应用截图"></a></p>
<h3><a href="#删除集群"></a>删除集群</h3>
<p>当不再需要集群时，可以使用 <a href="https://docs.microsoft.com/en-us/cli/azure/group#delete">az group delete</a> 命令删除资源组，容器服务和所有相关资源。</p>
<pre><code class="hljs routeros">az<span class="hljs-built_in"> group </span>delete --name myResourceGroup --yes --no-wait


</code></pre><h3><a href="#获取示例代码"></a>获取示例代码</h3>
<p>在这个快速入门教程中，预先创建的容器镜像已被用于部署 Kubernetes 。相关应用程序代码 Dockerfile 和 Kubernetes 清单文件可在 GitHub 中获得。Github 仓库地址是 <a href="https://github.com/Azure-Samples/azure-voting-app-redis.git">https://github.com/Azure-Samples/azure-voting-app-redis</a></p>
<h3><a href="#下一步"></a>下一步</h3>
<p>在这个快速入门教程中，您部署了一个 Kubernetes 集群，并部署了一个多容器应用程序。</p>
<p>要了解有关 Azure 容器服务的更多信息，走完一个完整的从代码到部署的全流程，请继续阅读 Kubernetes 集群教程。</p>
<hr>
<p>via: <a href="https://docs.microsoft.com/en-us/azure/container-service/kubernetes/container-service-kubernetes-walkthrough">https://docs.microsoft.com/en-us/azure/container-service/kubernetes/container-service-kubernetes-walkthrough</a></p>
<p>作者：<a href="https://github.com/neilpeterson">neilpeterson</a>，<a href="https://github.com/mmacy">mmacy</a> 译者：<a href="https://github.com/rieonke">rieonke</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在 Azure 中部署 Kubernetes 容器集群

## 原文链接
[https://www.zcfy.cc/article/deploy-kubernetes-cluster-for-linux-containers](https://www.zcfy.cc/article/deploy-kubernetes-cluster-for-linux-containers)

