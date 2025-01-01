import{_ as p,a as t,b as s,c as l}from"./ApacheShenYu-2.6.1-3-BLNi6YrB.js";import{_ as i,c as a,a as o,o as h}from"./app-Cd8Sn9KY.js";const c={};function u(r,e){return h(),a("div",null,e[0]||(e[0]=[o('<h2 id="about-apache-shenyu" tabindex="-1"><a class="header-anchor" href="#about-apache-shenyu"><span>About Apache ShenYu</span></a></h2><p>“</p><p>official website: https://shenyu.apache.org</p><p>GitHub: https://github.com/apache/shenyu</p><h2 id="version-preview" tabindex="-1"><a class="header-anchor" href="#version-preview"><span>Version Preview</span></a></h2><p>“</p><p>Version Record：https://github.com/apache/shenyu/compare/v2.6.0...v2.6.1</p><h3 id="new-features" tabindex="-1"><a class="header-anchor" href="#new-features"><span>New features</span></a></h3><ol><li>Add Dubbo annotation metadata for shenyu ingress controller</li></ol><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5000</p><p>Please see specific documents:</p><p>https://shenyu.apache.org/zh/docs/user-guide/kubernetes-controller/config</p><ol start="2"><li>Support plug-in life cycle</li></ol><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5031</p><ol start="3"><li>Add shenyu-sdk-openfeign module</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5041</p><ol start="4"><li>Add Motan and Spring Cloud Add ingress controller Support</li></ol><p>5.shenyu support alarm function</p><p><img src="'+p+'" alt=""></p><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4782</p><p>Please see specific documents:</p><p>https://shenyu.apache.org/zh/docs/next/developer/notice-alert</p><p>6.shenyu client adds the discovery registry. “</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5153</p><ol start="7"><li>Add the shenyu context-path Ingress controller.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5167</p><ol start="8"><li>Add shenyu grpc Ingress controller</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5240</p><ol start="9"><li>Add shenyu sofa Ingress controller</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5253</p><ol start="10"><li>Add nacos, etcd, eureka as shenyu discovery service registry</li></ol><p><img src="'+t+'" alt=""></p><p><img src="'+s+'" alt=""></p><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5193</p><ol start="11"><li>Add a new plug-in: basic-plugin</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5258</p><ol start="12"><li>Add new plug-ins and integration tests: shenyu-rabbitmq-logging plugin.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5283</p><p>https://github.com/apache/shenyu/pull/5312</p><ol start="13"><li>Binding selector through shenyu-discovery.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5261</p><h3 id="api-change" tabindex="-1"><a class="header-anchor" href="#api-change"><span>API Change</span></a></h3><ol><li>Reconstruct the data structure of shenyu data synchronization</li></ol><p><img src="'+l+'" alt=""></p><p>2.Use netty as the default httpclient</p><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5200</p><ol start="3"><li>Refactor the shenyu-admin-listener to support shenyu admin data synchronization</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5294</p><p>https://github.com/apache/shenyu/pull/5347</p><ol start="4"><li>delete shenyu&#39;s support for brpc, including brpc plug-in, brpc example, brpc integration test</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5305</p><p>https://github.com/apache/shenyu/pull/5358</p><ol start="5"><li>Remove Apollo dependencies to support Java 17 (add dependencies yourself)</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5308</p><p>Please see specific documents:</p><p>https://shenyu.apache.org/docs/next/user-guide/property-config/use-data-sync/#apollo-synchronization-config</p><ol start="6"><li>Remove shenyu&#39;s middleware register center.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5352</p><h3 id="enhanced" tabindex="-1"><a class="header-anchor" href="#enhanced"><span>Enhanced</span></a></h3><ol><li>Add unit tests for shenyu model event.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4965</p><ol start="2"><li>Add shenyu admin test case</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4971</p><p>https://github.com/apache/shenyu/pull/5231</p><p>https://github.com/apache/shenyu/pull/5263</p><ol start="3"><li>Add end-to-end test cases for motan.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4957</p><ol start="4"><li>Support motan plugin selection protocol</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5003</p><ol start="5"><li>Add end-to-end test cases for Grpc.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4966</p><ol start="6"><li>Upgrade apache-rat-plugin version to 0.15</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5029</p><ol start="7"><li>Address isBlank conditions match when matching.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4983</p><p>8.Clickhouse supports ttl fields.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5032</p><ol start="9"><li>Support HttpUtils log level judgment</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4976</p><ol start="10"><li>Add unit tests for Ingress Reconciler.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5051</p><p>https://github.com/apache/shenyu/pull/5169</p><ol start="11"><li>Automatically checksum when the package is distributed.</li></ol><p>&quot;</p><p>Specific pr&#39; please view:</p><p>https://github.com/apache/shenyu/pull/5049</p><ol start="12"><li>Zero copy is implemented in the tcp plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5066</p><p>13.shenyu-client-springmvc supports the default appname and context-path.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5050</p><ol start="14"><li>Add sdk-feign examples and integration tests.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5099</p><p>15.es log plug-in supports user-defined indexes</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5102</p><ol start="16"><li>Enhanced grpc plug-in supports shenyu-loadbalancer load balancing algorithms.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5115</p><ol start="17"><li>Downstream services that support the http2 protocol.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5125</p><ol start="18"><li>Refactoring the enhanced dubbo plug-in supports shenyu-loadbalancer load balancing algorithms.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5131</p><ol start="19"><li>Add ingress controller springcloud integration tests.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5139</p><ol start="20"><li>Add the ability to WebSocket the plug-in agent ping.</li></ol><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5144</p><ol start="21"><li>Add ingress controller websocket integration tests.</li></ol><p>22.Rewrite plug-ins support rewriting by percentage.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5119</p><p>23.Admin initializes the discovery server with discovery config.</p><p>&quot;</p><p>Please check the specific:</p><p>https://github.com/apache/shenyu/pull/5174</p><p>24.Divide plug-in adapts shenyu discovery.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5185</p><p>25.Alert supports multiple admin clusters.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5197</p><p>26.WebSocket plug-in adapts to the shenyu discovery.</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5202</p><ol start="27"><li>Register the service instance to the shenyu discovery.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5170</p><p>28.ShenYu Admin adapts to the local mode of the shenyu-discovery</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5176</p><ol start="29"><li>Add the test case of shenyu sdk core.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5267</p><p>https://github.com/apache/shenyu/pull/5270</p><ol start="30"><li>Add shenyu-discovery test cases.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5285</p><p>https://github.com/apache/shenyu/pull/5289</p><p>https://github.com/apache/shenyu/pull/5291</p><p>https://github.com/apache/shenyu/pull/5297</p><p>https://github.com/apache/shenyu/pull/5310</p><ol start="31"><li>Add the opengauss e2e test.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5309</p><ol start="32"><li>Add a limit on the size of the upload plug-in package.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5316</p><ol start="33"><li>Add shenyu-client-websocket test cases.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5322</p><ol start="34"><li>Upgrade shiro to secure version (1.18.0)</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5334</p><ol start="35"><li>Upgrade the SpringBoot version to 2.7.17 and update the license.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5356</p><ol start="36"><li>Send a notification to the shenyu-alert when adding a gateway exception.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5382</p><ol start="37"><li>Add EurekaDiscoveryService unit tests.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5390</p><h3 id="refactoring" tabindex="-1"><a class="header-anchor" href="#refactoring"><span>Refactoring</span></a></h3><ol><li>Refactoring version 2.6.1 (pom.xml)</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4995</p><ol start="2"><li>Use the computeIfAbsent to refactor the operation of the Map.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4997</p><ol start="3"><li>Refactor polaris test cases.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4986</p><ol start="4"><li>Migrate Maven Wrapper to official image</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5011</p><ol start="5"><li>Pattern compiled in WebClientMessageWriter.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5026</p><ol start="6"><li>Refactor the HttpUtils request method.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5027</p><ol start="7"><li>Upgrade github action version and refactor ci</li></ol><p>“</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4992</p><p>https://github.com/apache/shenyu/pull/5039</p><p>https://github.com/apache/shenyu/pull/5081</p><ol start="8"><li>Refactor the abstract template method for data synchronization.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5001</p><ol start="9"><li>Refactor the MenuProject, MenuModule, and MenuDocItem as VO objects.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5062</p><ol start="10"><li>Unified dubbo version</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5083</p><ol start="11"><li>Refactor the directory of the HttpClient.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5107</p><ol start="12"><li>Refactoring the github action ci cache</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5096</p><ol start="13"><li>Refactoring the motan plug-in supports pojo objects as method parameters.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5112</p><ol start="14"><li>Upgrade kafka-client version to 3.4.0</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5122</p><ol start="15"><li>Migrate the admin swagger springfox to the springdoc.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5113</p><ol start="16"><li>Upgrade dubbo version to 3.2.5 and refactor the expired method.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5120</p><ol start="17"><li>Refactor AbstractShenyuSdkClient getOrDefault methods.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5173</p><ol start="18"><li>Refactor the parameters of the HttpClient.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5151</p><ol start="19"><li>Refactor the implementation of the webclient plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5196</p><ol start="20"><li>Upgrade guava version to 32.0.0-jre</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5137</p><ol start="21"><li>Support k8s as a test environment for e2e.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5217</p><p>https://github.com/apache/shenyu/pull/5298</p><ol start="22"><li>Use the Restapi as the request path map for the rest api.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5222</p><ol start="23"><li>Use StringBuilder as a string connector.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5074</p><ol start="24"><li>Set the netty allocator parameter to unpooled.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5244</p><ol start="25"><li>Refactor the started banner.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5329</p><p>https://github.com/apache/shenyu/pull/5339</p><ol start="26"><li>Remove duplicate code and make part of the code public.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5336</p><ol start="27"><li>The method of reconstructing null.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5345</p><ol start="28"><li>Refactor the selector processor of the log plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5357</p><p>https://github.com/apache/shenyu/pull/5367</p><ol start="29"><li>Refactor the custom plug-in class loader.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5368</p><ol start="30"><li>Refactoring the log plug-in supports plug-in-level sampling ratios.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5385</p><ol start="31"><li>Refactor Context-path to avoid repeated registration (using selector for update)</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5387</p><p>https://github.com/apache/shenyu/pull/5386</p><h3 id="problem-fix" tabindex="-1"><a class="header-anchor" href="#problem-fix"><span>Problem fix</span></a></h3><ol><li>Avoid the permanent overhead of creating TimeoutException.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4973</p><ol start="2"><li>Fix the main class path of the sample module.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/497</p><ol start="3"><li>Fix plug-in sorting problem</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4999</p><ol start="4"><li>Fix Makefile Snapshot version issues</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4996</p><ol start="5"><li>Fix RELEASE-NOTES.md spelling errors</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4991</p><ol start="6"><li>Fix the wrong package name in the example.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5007</p><ol start="7"><li>Fix password validation rules and add# and. the support</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4977</p><ol start="8"><li>Repair the zookeeper in e2e: 3.8.0 health check.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5008</p><ol start="9"><li>Fix the unstable ci test.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5017</p><ol start="10"><li>Add the e2e WaitForHelper exception log</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5023</p><ol start="11"><li>Fix springcloud in some registry middleware can not get scheme.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5014</p><ol start="12"><li><p>Fix javadoc compilation errors.</p></li><li><p>Fix the wrong request type in the HttpUtils.</p></li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4975</p><ol start="14"><li>The user id was not updated when the auth was fixed.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/4982</p><ol start="15"><li>Fix the eventloop thread leak of the TCP plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5048</p><ol start="16"><li>Format the quickstart in the shenyu-integrated-test.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5065</p><ol start="17"><li>Fix SQL script errors.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5086</p><p>https://github.com/apache/shenyu/pull/5037</p><p>https://github.com/apache/shenyu/pull/5184</p><p>https://github.com/apache/shenyu/pull/5234</p><p>https://github.com/apache/shenyu/pull/5368</p><ol start="18"><li>Fix the uri plug-in path error and use rawpath instead of path.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5121</p><p>https://github.com/apache/shenyu/pull/5128</p><ol start="19"><li>Fix websocket plug-in support for rewrite plug-ins.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5130</p><ol start="20"><li>The repair ElasticSearchLog Plugin index name is invalid.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5158</p><ol start="21"><li>Fix context-path plug-in errors.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5159</p><ol start="22"><li>Fix the high cpu usage of the shenyu-admin.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5168</p><p>https://github.com/apache/shenyu/pull/5164</p><ol start="23"><li>Fix the formatting problem LocalDateTime in alert.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5180</p><ol start="24"><li>Fix the shenyu-client apiDoc error retry problem.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5171</p><ol start="25"><li>The initialization sequence of the repair applicationContextAware is too late.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5195</p><ol start="26"><li>Fix duplicate response header.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5190</p><ol start="27"><li>Set the maximum waiting time for k8s.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5220</p><ol start="28"><li>Modify the status field type of the clickhouse log plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5230</p><ol start="29"><li>Fix the memory leak that may be caused by the response write plugin.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5228</p><ol start="30"><li>Fix the dataType field selection error.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5237</p><ol start="31"><li>Fix http data synchronization errors.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5239</p><ol start="32"><li>Fix word spelling mistakes</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5251</p><ol start="33"><li>Repair the registration status of the shenyu dubbo agent plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5243</p><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5266</p><ol start="35"><li>Fix the shenyu-registry eureka registration error logic.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5269</p><ol start="36"><li>Fix AbstractLogPluginDataHandler hashcode errors.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5280</p><ol start="37"><li>Fix the key error of the ratelimit plug-in in cluster mode.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5286</p><ol start="38"><li>Fix the error of duplicate registration context-path for multiple shenyu-client of the same application.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5320</p><ol start="39"><li>Fix does not reload the plug-in after the plug-in is closed.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5338</p><ol start="40"><li>Fix the shenyu admin upload plug-in error.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5342</p><ol start="41"><li>Repair shenyu cannot load resources in the resource directory.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5372</p><ol start="42"><li>Fix Admin to show dictionary values.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5375</p><ol start="43"><li>Fix conflicts Authorization in the sign plug-in.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5381</p><ol start="44"><li>Fix the context of the signature plug-in-path path match error.</li></ol><p>&quot;</p><p>Please see specific pr:</p><p>https://github.com/apache/shenyu/pull/5379</p><h2 id="contributors" tabindex="-1"><a class="header-anchor" href="#contributors"><span>Contributors</span></a></h2><p>TeslaCN,GOODBOY008,moremind,devinsong77,runqi-zhao,JooKS-me,kerwin612,li-keguo,yeshadoo,yu199195,DamonXue,liusishan,HaiqiQin,coderDylan,dragon-zhang,haolinkong,mxyyyy,misaya295,kerwin612,ywj1352,dengliming,impactCn,yunlongn,tanpenggood,xcsnx,xuziyang,ShawnJim,cubxxw,tomsun28,wenlongbrother,VampireAchao,wenpanwenpan,Ceilzcx,847850277,realize096,crudboy,tian-pengfei,0xmkzt,whenelse,lahmXu,wang3820,jbampton,eurecalulu,yudayday,YxYL6125,CytFree,GNK48-Ava,lianjunwei,MRgenial,geek-ken,ttfont</p><h2 id="become-a-contributor" tabindex="-1"><a class="header-anchor" href="#become-a-contributor"><span>Become a Contributor</span></a></h2><p>We welcome every 1 contributors to ShenYu, and we welcome contributors to ShenYu in the spirit of Apache Way!</p><p>For the contributor guide, please refer:</p><p>“</p><p>https://shenyu.apache.org/zh/community/contributor-guide</p>',561)]))}const m=i(c,[["render",u],["__file","ApacheShenYu-2.6.1.html.vue"]]),d=JSON.parse('{"path":"/blog/ApacheShenYu-2.6.1.html","title":"Apache ShenYu 2.6.1 Released","lang":"en-US","frontmatter":{"title":"Apache ShenYu 2.6.1 Released","author":"Ho Fung Eun","date":"2024-01-24T00:00:00.000Z","tag":[null],"cover":"/assets/img/blog/ApacheShenYu-2.6.1-0.png","head":[["meta",{"name":"Blog"}],["link",{"rel":"alternate","hreflang":"zh-cn","href":"https://vuepress-theme-hope-docs-demo.netlify.app/zh/blog/ApacheShenYu-2.6.1.html"}],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/blog/ApacheShenYu-2.6.1.html"}],["meta",{"property":"og:title","content":"Apache ShenYu 2.6.1 Released"}],["meta",{"property":"og:description","content":"About Apache ShenYu “ official website: https://shenyu.apache.org GitHub: https://github.com/apache/shenyu Version Preview “ Version Record：https://github.com/apache/shenyu/comp..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-0.png"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:locale:alternate","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-08-31T11:19:25.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-0.png"}],["meta",{"name":"twitter:image:alt","content":"Apache ShenYu 2.6.1 Released"}],["meta",{"property":"article:author","content":"Ho Fung Eun"}],["meta",{"property":"article:published_time","content":"2024-01-24T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-08-31T11:19:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Apache ShenYu 2.6.1 Released\\",\\"image\\":[\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-0.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-1.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-2.png\\",\\"https://vuepress-theme-hope-docs-demo.netlify.app/assets/img/blog/ApacheShenYu-2.6.1-3.png\\"],\\"datePublished\\":\\"2024-01-24T00:00:00.000Z\\",\\"dateModified\\":\\"2024-08-31T11:19:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Ho Fung Eun\\"}]}"]],"description":"About Apache ShenYu “ official website: https://shenyu.apache.org GitHub: https://github.com/apache/shenyu Version Preview “ Version Record：https://github.com/apache/shenyu/comp..."},"headers":[{"level":2,"title":"About Apache ShenYu","slug":"about-apache-shenyu","link":"#about-apache-shenyu","children":[]},{"level":2,"title":"Version Preview","slug":"version-preview","link":"#version-preview","children":[{"level":3,"title":"New features","slug":"new-features","link":"#new-features","children":[]},{"level":3,"title":"API Change","slug":"api-change","link":"#api-change","children":[]},{"level":3,"title":"Enhanced","slug":"enhanced","link":"#enhanced","children":[]},{"level":3,"title":"Refactoring","slug":"refactoring","link":"#refactoring","children":[]},{"level":3,"title":"Problem fix","slug":"problem-fix","link":"#problem-fix","children":[]}]},{"level":2,"title":"Contributors","slug":"contributors","link":"#contributors","children":[]},{"level":2,"title":"Become a Contributor","slug":"become-a-contributor","link":"#become-a-contributor","children":[]}],"git":{"createdTime":1725103165000,"updatedTime":1725103165000,"contributors":[{"name":"itanxyu","username":"itanxyu","email":"itanxy@126.com","commits":1,"url":"https://github.com/itanxyu"}]},"readingTime":{"minutes":6.96,"words":2088},"filePathRelative":"blog/ApacheShenYu-2.6.1.md","localizedDate":"January 24, 2024","autoDesc":true,"excerpt":"<h2>About Apache ShenYu</h2>\\n<p>“</p>\\n<p>official website: https://shenyu.apache.org</p>\\n<p>GitHub: https://github.com/apache/shenyu</p>\\n<h2>Version Preview</h2>\\n<p>“</p>\\n<p>Version Record：https://github.com/apache/shenyu/compare/v2.6.0...v2.6.1</p>\\n<h3>New features</h3>\\n<ol>\\n<li>Add Dubbo annotation metadata for shenyu ingress controller</li>\\n</ol>"}');export{m as comp,d as data};