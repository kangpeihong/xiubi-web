


const api = {

	print: '/api/xwProduct/back/download', /* TODO: 所需参数 produtName (商品名称)  get*/
	regapi:'/api/enterprise/user',/* TODO:注册接口    */
	historyOrderList:'/api/xwOrder', /* TODO: 所需参数  (分页器所需参数 当前页、页数、id、排序方法)*/
	ifNumber:'api/enterprise/user/create/',/* TODO: 注册时判断是否有该手机号 */
	checkNumber: 'api/sms/test',/* TODO:注册时验证验证码和手机号 */
	checkUserInfo: 'api/xwEnterprise/info',/* TODO:找回账号验证用户信息 step1 post */
	amendNumber:'api/xwEnterprise/update/loginPhone',/* TODO:找回用户账号 step2  put */

	/* TODO: 公司信息的增删改查 */
	billInfo: '/api/enterprise/info', /* TODO:查询企业公司信息 */
	addInfo: '/api/enterprise/info', /* TODO:增加企业公司信息 */
	changeInfo: '/api/enterprise/info',/* TODO:修稿企业公司信息 */
	delInfo: '/api/enterprise/info',/* TODO:删除企业公司信息 */
	
	/* TODO: 收货人（邮寄地址）的增删改查 */
	billAddress: '/api/enterprise/address',/* TODO:查询邮寄地址 */
	addAddress: '/api/enterprise/address',/* TODO:新增邮寄地址 */
	changeAddress: '/api/enterprise/address',/* TODO:修改邮寄地址 */
	delAddress: '/api/enterprise/address',/* TODO:删除邮寄地址 */
	
	/* TODO: 邮寄管理  */
	publicMessage: '/api/mail',/* TODO: 15天内邮寄信息查询 */
	addMessage: '/api/mail',/* TODO: x创建新的邮寄信息 */
	alterMessage: '/api/mail',/* TODO: 修改邮寄信息 */
	delMessage: '/api/mail',/* TODO:  删除邮寄信息*/
	allMessage:'/api/mail/all',/* TODO: 查看所有邮寄信息 */

	/* TODO: 公告信息 */
	newPublicMessage:'/api/notice',/* TODO: 查询最新的公告信息 */
	addPublicMessage: '/api/notice',/* TODO: 创建新的公告 */
	alterPublicMessage: '/api/notice',/* TODO: 修改公告 */
	delPublicMessage: '/api/notice',/* TODO: 删除公告 */
	allPublicMessage:'/api/notice/all',/* TODO: 查看所有的公告信息 */

}


export default api
