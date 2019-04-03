module.exports = {
    configureWebpack:{
		devServer:{
			port:8081,
			open:true,
			//mock数据
			before(app){
				//注册接口
				let userpoor=[
					{username:'username',password:'123'},
					{username:'zhangsan',password:'123345'}
				]
				app.get('/api/register',(req,res)=>{
					const {username,password}=req.query
					const userlength=userpoor.filter(v=>v.username==username).length
					if(userlength>0){
						res.json({
							success:false,
							message:'用户名已存在'
						})
					}else{
						res.json({
							success: true,
							message:'注册成功'
						})
					}
				})
				let tokenkey = 'sd'
				app.get('/api/login',(req,res)=>{
					const {username,password}=req.query
					if(username=='username' && password == '123'){
						res.json({
							code:0,
							message:'成功',
							token:tokenkey+'-'+username+'-'+(new Date().getTime()+6*60*1000)
						})
					}else{
						res.json({
							code:1,
							message:'账户或密码错误'
						})
					}
				})
			}
		}
	},

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
