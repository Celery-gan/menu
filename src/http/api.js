import service from './index'

export default {
    /**
     * 获取图片验证码
     */
    getCaptcha() {
        return service.get('/users/captcha')
    },
    /**
     * 账号密码登录
     * @param {\} params 
     */
    userLogin(params) {
        return service.post('/users/login', params)
    },
    /**
     * 手机号登录
     * @param {\} params 
     */
    phoneLogin(params) {
        return service.post('/users/phoneLogin', params)
    },
    /**
     * 获取手机验证码
     * @param {*} params 
     */
    getCode(params) {
        return service.post('/users/sendMsg', params)
    },
    /**
     * 用户注册
     * @param {*} params 
     */
    userRegiest(params) {
        return service.post('/users/register', params)
    },
    /**
     * 找回密码
     * @param {*} params 
     */
    findUserPwd(params) {
        return service.post('/users/findPwd', params)
    },
    /**
     * 修改密码   username, password, id, newPwd
     * @param {*} params 
     */
    updateUserPwd(params) {
        return service.post('/users/updatePwd', params)
    },
    /**
     * 退出登录
     * @param {*} params 
     */
    logOut() {
        return service.get('/users/logout')
    },
    /**
     * 获取侧边栏信息
     */
    getMenus() {
        return service.get('/users/menus')
    },


    /**
     * 首页进度条数据
     */
    getProgress() {
        return service.get('/progress')
    },
    /**
     * 城市利润
     */
    getCityValue() {
        return service.get('/cityValue')
    },
    /**
     * 获取动态
     */
    getDynamic() {
        return service.get('/getDynamic')
    },
    //     15.发布动态(post)
    // /addDynamic
    // 参数:
    // username: 发布人
    // date: 发布时间
    // dynamic: 动态内容
    // classification: 动态类型
    // reportUsers: 汇报人(可选)
    addOneDynamic(params) {
        return service.post('/addDynamic', params)
    },
    /**
     * 动态汇报人(get)
     */
    getReport() {
        return service.get('/report')
    },
    /**
     * 网站调查(get)
     */
    getquestion() {
        return service.get('/question')
    },
    /**
     * 获取日程
     */
    getCalendar() {
        return service.get('/calendar')
    },
    /**
     * 添加日程
     * @param {*} params 
     */
    addCalendar(params) {
        return service.post('/calendar', params)
    },
    /**
     * 删除日程
     * @param {*} params 
     */
    delCalendar(params) {
        return service.post('/delCalendar', params)
    },
    /**
     * 重复上周 currentDay: 当前日期
     * @param {*} params 
     */
    repeatDynamic(params) {
        return service.post('/repeatDynamic', params)
    },
    /**
     * 获得通讯录树形结构数据
     */
    getTreeData() {
        return service.get('/getTreeData')
    },
    /**
     * 获得通讯录数据
     */
    getMailList() {
        return service.get('/getMailList')
    },
    /**
     * 获得offer管理数据
     */
    getOffer() {
        return service.get('/getOffer')
    },
    /**
     * 获取员工信息
     */
    getUserInfo() {
        return service.get('/userInfo')
    },
    /**
     * 获取薪酬管理信息
     */
    getPay() {
        return service.get('/pay')
    },
    upload() {
        return service.post('/upload/image')
    }
}