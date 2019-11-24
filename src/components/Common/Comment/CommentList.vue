<template>
	<div style="margin-top:15px;" v-if="commentList != null && commentList.length>0">
		<div class="box box-primary1">
			<!--<div class="box-header with-border">
				<h3 class="box-title">Comments List</h3>
			</div>-->
			<!-- /.box-header -->
			<!-- form start -->
			<form>
				<div class="box-body">    
					<table class="table table-striped">
						<tbody>
							<tr>
								<th><span>No.</span></th>
								<th><span>Approver/Applicant</span></th>
								<th><span>Approve/Apply Time</span></th>
								<th><span>Action Status</span></th>
								
								<th><span>Comments</span></th>
							</tr>
							<tr v-for="(entry,index) in commentList">
								<td>{{ index+ 1}}</td>
								<td>{{ entry.assignee}}
									<span v-if="entry.taskName">(</span>
									{{ entry.taskName}}
									<span v-if="entry.taskName">)</span>
								</td>
								<td>{{ entry.lastModified|formatDate}}</td>
								<td v-html="entry.approvalStatusValue">{{ entry.approvalStatusValue}}</td>
								<td v-if="hideComments"></td>
								<td v-else>{{ entry.approvalRemark}}</td>
							</tr>
						</tbody>
					</table>                  
				</div>
	            <!-- /.box-body -->            
			</form>
	    </div>
    </div>
</template>
<script>
	export default {
		name: 'CommentList',
		props:['previousInstance', 'systemSubmit', 'hideComments','skipTask'],
		data(){
			//返回的数据对象
			var dm = {commentList:[]};
			
			return dm;
		},
		created(){
			var processInstanceId = this.$route.query.processInstanceId;
			if(this.previousInstance) {
				var me = this;
				this.GL.actUtil.ajax("get","/base/comments/list2?processInstanceId="+processInstanceId+"&previousInstance="+this.previousInstance+"&skipTask="+this.skipTask,"",function(data){
					var dm = JSON.parse(data);
					me.commentList = dm.commentList;
				});
			} else {
				var me = this;
				var format = this.GL.formatDate;//格式化日期函数
				var uri = "/base/comments/list?processInstanceId="+processInstanceId;
				if(this.systemSubmit) {
					uri = "/base/comments/list3?processInstanceId="+processInstanceId;
				}
				this.GL.actUtil.ajax("get",uri,"",function(data){
					var dm = JSON.parse(data);
					me.commentList = dm.commentList;
				});
			}
			
		}
	}
</script>
