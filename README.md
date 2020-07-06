# mockvue

该项目是与mockserver协同工作的前端项目

这个项目中`index / login / content / pvdata`路由对应的页面的模拟前端（也被称为h5端/pc端）的处理逻辑。它们使用`token-sdk-client`。
index页面是首页。首页的浏览权限与用户是否登录无关。即任何人都可以看到完整的首页内容。
login页面是登录页面。该页面提供了2种登录方式：1. 使用封装了链信sdk的app扫码登录。2. 使用udid+idpwd登录。（现在已被限制使用）
扫码登录的逻辑是：
1. 前端向后端请求登录需要的用户数据的字段。
2. 前端把这些字段渲染为一个二维码。
3. 用户使用封装了链信sdk的app扫码后，用户会看到这些字段。用户若同意授权这些字段，则把这些字段发给后端。否则不发送。
4. 若后端得到这些字段则表示登录成功。此时前端向后端请求到用户数据并渲染出来，表示用户处于登录状态。
content页面是内容页面。该页面会根据用户是否登录显示相应内容。
pvdata页面是显示用户pvdata数据的页面。（现在已被限制使用）

这个项目中的`上传私密文件 / 服务端pvdata / 申请证书 / 待签发证书`是服务端管理可看到的页面。一般只用于内网中。
上传私密文件页面是用于：1. 给服务端导入didttm文件的。2. 查看解密后的didttm. 3. 更新pvdata.
服务端pvdata页面用于显示pvdata的内容。当下有5部分:1. 身份属性。 2. 身份证书 3. 关联证书。 4. 私有数据。 5. 通讯录。
申请证书页面。这里会有一些页面共同完成申请证书的功能。包括：
1. 证书模板列表页面。需要创建什么证书就选择什么模板。
2. 创建证书页面。这里需要用户输入证书中需要的各种字段。若有疑问可以查看”示例“。填完证书数据后，点击”提交“会进入该证书的详情页面。
3. 证书详情页面用于证书的详细数据。包括：证书内容、签名列表。还包括：”输出海报功能“、”进入查验页面“、”邀请签发“、”取消证书功能”。
4. 海报页面的内容是显示"经过hash"与"没经过hash"的证书数据嵌入到证书模板的效果。有一个二维码，扫描后可以进入证书查验页面。
5. 查验页面。会根据页面是内证书详情页面还是海报页面分别显示证书数据嵌入到证书模板的效果。点击“查验”按钮会显示对比结果。
6. 签发页面是被邀请者使用指定的url进入的页面。该页面有查验页面的全部功能+签发功能。
待签发证书页面。这是一个列表页面。点击每一项都进入相应的签发页面。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).




did文件格式规范
文件名：did全名去掉头缀“did:ttm:”
文件尾缀：ttm
文件内容：
- 内容编码txt文本
- 内容正文：nickname:did:encodebased64_SM4(json数组，密钥)
- 密钥：
> 1. 身份密码
2. 导出或备份时生产的备份验证码
- nickname：did的昵称，用于显示和提示及校验
- did：去掉前缀的did字串
- json数组
  - name：实名
  - phone：可收验证码确权的手机号
  - pdid：关联的父did，可通过父did确权
  - node：服务器接入点域名
  - prikey：私钥
    - encode_based64_SM4(私钥，nickname+did)
  - 这个加密是为了保证文件完整性没有被破坏，与导出时一致：文件名和昵称