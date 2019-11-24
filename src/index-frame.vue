<template>
<div class="wrapper">

    <!-- Left side column. contains the logo and sidebar -->

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" style="height:100%;padding-top:0px;margin-left:0px">

        <router-view style="margin-top:0px; padding:2px"></router-view>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Control Sidebar -->

    <div id="loadingMask" class="alertBackground" ></div>
	<div id="progressBar" class="progressBar">Loading...</div>
    <!-- /.control-sidebar -->
    <!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
    <div class="control-sidebar-bg">
    </div>
</div>

</template>
<script>
	import i18n from './i18n'
	export default {
		name: 'index',
		methods:{
			changeLanguage:function(lang){
				i18n.locale = lang;
				this.$root.eventHub.$emit('changLangEvent', lang);
			},
			logOut: function(){
				localStorage.clear();
				this.$router.push('login')
			},
			isHome(){
				if(this.$route.path==='/'){
					$("#entry-div").css("display","block");
				}else{
					$("#entry-div").css("display","none");
				}
      },
      pushRouter:function(key){
        this.$router.push({ path: '/index/form/contractApprove/create'});
      }
		},
		watch:{
			'$route':'isHome'
	    },
		mounted(){
			//页面刷新
      		this.isHome();
			if( document.createEvent) {
				var event = document.createEvent ("HTMLEvents");
				event.initEvent("resize", true, true);
				window.dispatchEvent(event);
			} else if(document.createEventObject){
				window.fireEvent("onresize");
			}
			//显示用户信息
			$("#head-user-photo").text(localStorage.uname.toUpperCase());
			$("#side-user-photo").text(localStorage.uname.toUpperCase());
			$("#date-now").text(localStorage.uname.toUpperCase());
		}
	}
</script>
