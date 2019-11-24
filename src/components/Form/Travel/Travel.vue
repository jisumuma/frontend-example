<template>
<!-- Content Wrapper. Contains page content -->
<div class="content-header">
    <!-- Content Header (Page header) -->
    <section class="content-header ">
        <h1>
            {{$t('Travel')}}
            <small class="hidden">Version 2.0 </small>
        </h1>
        <ol class="breadcrumb" style="background-color: transparent !important;font-size: 14px;">
            <li>
            	<a href="#">1.Applicant</a>
        	</li>
            <li>
            	<a href="#">2.Department Head</a>
            </li>
            <li>
                <a href="#">3.BOM</a>
            </li>
        </ol>
    </section>
    <!-- Main content -->
    <section class="content">
        <!-- title row -->
        <div class="row">
            <div class="col-md-12">
                <!-- general form elements -->
                <div class="box box-primary1">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            {{$t("Travel")}}
                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                    	<input type="hidden" v-model="form.id" name="id">
                        <div class="box-body">
                            <div class="row">
                            	<form-group col="md-4" :readonly="readonly" type="select" uri="/dict/list?groupName=TripType" @change="check()" v-model="form.travelType" name="travelType"/>
                                
                                <form-group col="md-4" :readonly="readonly" type="datepicker" v-model="form.startDate" name="startDate"></form-group>
                                <form-group col="md-4" :readonly="readonly" type="datepicker" v-model="form.endDate" name="endDate"></form-group>
                                <div class="col-md-12">
							        <div class="form-group">
							            <label>
											<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
							            	Description
							            </label>
							            <textarea v-model="form.travelDesc" :readonly="readonly" placeholder="form.travelDesc" name="travelDesc" v-validate="this.$route.query.formValid.travelDesc" :class="{'form-control':true,'input': true, 'is-danger': errors.has('travelDesc') }"></textarea>
							        </div>
							    </div>
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </form>
                </div>

                <div class="box box-primary1">
                    <div class="box-header with-border">
                        <h3 class="box-title">
                            Attachment List
                        </h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                        <div class="box-body">
                        	<div class ="row">
			                    <div class="col-md-12">
			                        <div class="form-group">
		                        	    <upload :readonly="readonly" v-model="form.attachmentId" buttonText="Attachment" :accept="'.jpg,.txt'" :attachments="form.attachments" multi="true"></upload>
			                        </div>
			                    </div>
		                    </div>
                        </div>
                        <!-- /.box-body -->
                    </form>
                </div>
                <!-- /.box -->
                <comment v-if="commentStatus" v-model="form.approval.approvalRemark"></comment>
            </div>
        </div>
	    <router-view :form="form" entityId="Travel" vclass="btn-left" uri="/form/Travel/update" :validator="this.$validator"></router-view>
    	<comment-list v-if="form.processInstanceId !=null"></comment-list>
    </section>
    <!-- /.content -->
</div>
<!-- ./wrapper -->
</template>
<script>
	export default {
		name: 'Travel',
		methods:{
	    	//表格内组件检查调用方法
	    	check:function(){
	    		//console.log(this.form.travelType);
	    	}
		},
		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id ;
			if(id){
				var url = "/form/Travel/get/"+id;
			}else{
				var url = "/form/Travel/create/";
			}


			if(this.GL){
				this.GL.actUtil.query("get",url,"",function(data){
				dm = JSON.parse(data);
			});
      }else{
        global_.actUtil.query("get",url,"",function(data){
          dm = JSON.parse(data);
        });
      }

			return dm;
		},
		watch:{
			
			"form.travelType":{
				handler(curVal,oldVal){
					//console.log("travel type="+curVal);
				},
				deep:true
			}
		},
		computed:{
			readonly:{
				// 动态计算readonly的值
				get:function() {
					return (this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit')!=-1)||(this.form.processInstanceId !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			commentStatus:{
				// 动态计算commentStatus的值
				get:function() {
					return (this.$route.query.taskId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			}
		},
		mounted(){
			this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form)=>{
				this.form = form;
			});
		}
	}
</script>
