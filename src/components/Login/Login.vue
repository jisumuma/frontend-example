<template>
	<div class="login-box">
		<div class="login-logo">
			<b>BPM</b>
		</div>
		<div class="login-box-body">
			<span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
			<div class="input-group form-group has-feedback">
				<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
				<input name="username" v-model="username" v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('username') }" type="text" placeholder="username">
				<span class="input-group-addon">atos.net</span>
			</div>
			<span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
			<div class="input-group form-group has-feedback">
				<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
				<input name="password" v-model="password" v-validate="'required'" :class="{'form-control':true,'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password">
			</div>
			<div class="row">
				<div class="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3">
					<transition name="slide-fade">
						<p v-if="show">用户名或密码错误</p>
					</transition>
				</div>
			</div>
			<div class="row">
				<div class="col-sm-6 col-sm-offset-3 col-md-6 col-md-offset-3">
					<button v-on:click="auth" class="btn btn-primary btn-block btn-flat">Sign In</button>
				</div>
			</div>
	    </div>
		<router-view></router-view>
	</div>
</template>
<script>
	//提供认证服务的restApi
	export default {
		name: 'Login',
		data() {
			return {
				username: '',
				password: '',
				show: false
			}
		},
		methods: {
			auth: function(){
			this.$validator.validateAll().then(() => {
				var rt = this.$router;
				var credentials = {
					email:this.username,
					password:this.password
				}

				/* post方法提交username和password
				 * 认证成功将返回的用户信息写入到localStorage，并跳转到下一页面
	         	 * 失败提示认证错误
	         	 */
				var me  = this;
				$.ajax({
					url: Config.getBaseURL()+'/auth/login',
					type: 'POST',
					dataType:'json',
					contentType: "application/json",
					data: JSON.stringify(credentials),
					success:function(response){
					        Config.setToken(response.token,response.tokenExpired);
						localStorage.userDisplayName = response.displayName;
						localStorage.setItem("uid",response.uid);
						localStorage.setItem("uname",response.uname);
						localStorage.setItem("role",response.role);
						rt.push({path:'index'});
					}
				});
	      }).catch(() => {
	          alert('Correct the errors!');
	      });
      }
    }
  }
</script>
