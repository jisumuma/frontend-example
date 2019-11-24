<template>
	<div>
		<button type="button" @click="popmodal()" :class="vclass"><slot></slot></button>
		<!-- backModal start-->
		<div class="modal fade" id="folderModal" tabindex="-1" role="dialog" aria-labelledby="folderModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodals()"><span aria-hidden="true">&times;</span></button>
						<h4  class="modal-title" id="folderModalLabel">Add Folder Path</h4>
					</div>
					<div class="modal-body" style="width:100%;height:100%;margin:0px;padding:0px;">
						<!-- Main content -->
						<section class="content" style="width:100%;height:100%;margin:0px;padding:0px;">
							<!-- Main row -->
							<div class="row" style="width:100%;height:100%;margin:0px;padding:0px;">
								<!-- Left col -->
								<div class="col-md-12" style="width:100%;height:100%;margin:0px;padding:0px;">
									<!-- table 2 start-->
									<div class="box box-primary1" style="width:100%;height:100%;margin:0px;padding:0px;">

										<!-- /.box-header -->
										<div class="box-body">
											<div id="task_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
												<div class="row">
													<div class="col-sm-6">
													</div>
													<div class="col-sm-6">
													</div>
												</div>
												<div class="row">
													<div class="col-sm-12">
														<form role="form-horizontal" style="background-color: #F1F5F8">
															<div class="box-body">


																<table>
																	<tr>
																		<td>
																			<label class=" control-label pad-top-7">	Folder Path</label>
																	  </td>
																		<td><input type="text" id="folderPath" class="form-control col-sm-4" style="width: 100%" placeholder="folder Path"> </td>
																	</tr>
																	</br>
																	<tr  >
																		<td><label class=" control-label pad-top-7">Folder Owner</label></td>
																		<td><input type="text" id="folderOwner" class="form-control col-sm-4" style="width: 100%" placeholder="folder Owner">
																			<ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>
																		 </td>
																	</tr>
																	</br>
																	<tr  >
																		<td><label class=" control-label pad-top-7">Active</label></td>
																		<td><select id="active">
																				 <option value="0">true</option>
																				 <option value="1">false</option>
																			</select>
																		</td>
																	</tr>

																</table>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="margin-top:20px;">
																	<button type="button" class="btn btn-primary btn-sm" @click="save();" >
                                              					 	 <span class="fa fa-search"> </span>
																     &nbsp;&nbsp;Active
                                           							 </button>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="margin-top:20px;">
																	<button type="button" class="btn btn-primary btn-sm" @click="save();" >
																		<span class="fa fa-search">
																		</span>
																		&nbsp;&nbsp;Deactive
																	</button>
																</div>
															</div>
														</form>

													</div>
												</div>
											</div>
										</div>
										<!-- /.box-body -->
									</div>
									<!-- /.box -->
									<!-- table 2 end-->
								</div>
								<!-- /.col -->
							</div>
							<!-- /.row -->
						</section>
						<!-- /.content -->
					</div>
					<!--<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

					</div>-->
				</div>
			</div>
		</div>
		<!-- backModal end-->
	</div>
</template>
<script>

	export default {
		name: "AddFolder",
		props:['vclass'],
		methods: {
			popmodal: function () {
				$('#folderModal').modal('toggle');


			},
			closemodals:function(){
				//sendMsgToParent();
				this.$emit("callbackfunction","");

			},
			save: function() {
			   var folderPath=$("#folderPath").val();
			   var folderOwner=$("#folderOwner").val();
			   var active=$("#active").val();
				$.ajax({
					url: Config.getBaseURL() + "/FolderPathMGT/add",
					data: {
						"folderPath": folderPath,
						"folderOwner": folderOwner,
						"active": active
					},
					type: 'get',
					dataType: 'json',
					success: function(data) {

						alert(data);
					},
					error: function(msg) {
						alert(msg);
						this.closemodal;

					}
				});
			},
			sendMsgToParent:function(){
				this.$emit("callbackfunction","");

			},
			doAfterSelectOtherPerson:function(data){
				$("#folderOwner").val(data.printENName);


			}
		}
	}
</script>
