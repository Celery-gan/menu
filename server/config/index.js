module.exports = {
    clientId: 'efa87842c625b2657dfc', // github的clientId
    clientSecret: '42a2761074255ad53d96ec8e4891d7c64225189a', // github的cclientSecret
    msgKey: 'c32cc2c0ea084c9db36d9243041078f1', // 短信发送的key
    emailPass: 'suptvidhffsehfhg', // 发送邮件的pass
    scope: ['user'],
    secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    accessKeyId: 'LTAI4G8KQM7Ph9qPGZhKHsof', // 阿里云短信key
    secretAccessKey: 'qPW7XMTklTKuEjMn69Lyz2pnGfhmDj', // 阿里云短信accessKey
    whitePath: ['/', '/users/login', '/users/phoneLogin', '/users/githubLogin', '/api/users/githubLogin', '/users/register', '/users/githubUser', '/users/captcha', '/users/sendMsg',
        '/users/findPwd', '/users/logout', /^\/api/, /\.(jpg|jepg|gif|png)$/
    ], // 忽略验证的接口
}