<template>
	<div>
		<img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
		<cube-form
		  :model="model"
		  :schema="schema" 
		  @submit="submitHandler">
  		</cube-form>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				model:{
					username:'',
					password:''
				},
				schema:{
					fields:[
						{
							type:'input',
							modelKey:'username',
							label:'用户名',
							props:{
								placeholder:'请输入用户名',
							},
							rules:{
								required:true,
								type:'string',
								min:3,
								max:15,
							},
							trigger:'blur',
							messages:{
								required:'用户名不能为空',
								min:'最小三',
								max:'最大15',
							}
						},
						{
							type:'input',
							modelKey:'password',
							label:'密码',
							props:{
								placeholder:'请输入密码',
								type:'password',
								eye:{
									open:false
								}
							},
							rules:{
								required:true
							},
							trigger:'blur',
							messages:{
								required:'用户名不能为空'
							}
						},
						{
							type:'submit',
							label:'登录'
						}
					]
				}
			}
		},
		methods:{
			async submitHandler(e){
				e.preventDefault();
				try{
					const result = await this.$http.get('/api/login',{params:this.model});
					console.log(result.token)
					if(result.code=='0'){
						this.$store.commit('settoken',result.token)
						window.localStorage.setItem('token',result.token)
					}else{
						alert(data.message)
					}
				}catch(err){
					console.log(err);
				}
				
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.headerimg
		height  150px
		width  100%
</style>