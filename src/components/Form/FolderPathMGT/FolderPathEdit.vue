<template>
<!-- Main content -->
<section class="content">
    <!-- Main row -->
	<div class="row">
        <!-- Left col -->
        <div class="col-md-12">
            <!-- table 2 start-->
            <div class="box box-primary1">
                <div class="box-header">
                    <h3 class="box-title">
                          Edit Folder Path
                    </h3>
                </div>
                    <!-- /.box-header -->
                <div class="box-body">
                         <form role="form-horizontal" style="background-color: #F1F5F8">
                        <table border="0" style="width:70%;"align="center">
                         </br>
                            <tr  >
                                <td align="right" style="padding:20px;">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                    <label class=" control-label pad-top-7" >Folder Path</label>

                                </td>
                                <td  >
                                    <input  type="hidden" id="folderId" class="form-control col-sm-4" style="width: 50%" :value="id">
                                    <input v-if="id=='0'" type="text" id="folderPath" class="form-control col-sm-4" style="width: 50%" placeholder="folder Path" @blur="checkPath()"  >
                                    <input v-else type="text" id="folderPath" class="form-control col-sm-4" style="width: 50%" placeholder="folder Path"  :value="folderName" @blur="checkPath()">
                                 </td>
                            </tr>

                            <tr >
                                <td align="right" style="padding:20px;">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                    <label class=" control-label pad-top-7">Folder Owner</label>
                                </td>
                                <td>
                                    <input v-if="id=='0'" type="text" id="folderOwner" class="form-control col-sm-4" style="width: 50%" placeholder="folder Owner" disabled>
                                    <input v-else type="text" id="folderOwner" class="form-control col-sm-4" style="width: 50%" placeholder="folder Owner" :value="folderOwner" disabled>
                                    <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson">
                                         <i class="fa fa-fw fa-search"></i>
                                    </ChooseOtherPerson>
                                </td>
                            </tr>
                             <tr  v-show="flase">
                                <td align="right" style="padding:20px;">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                    <label class=" control-label pad-top-7" >StaffCode</label>

                                </td>
                                <td  >

                                    <input v-if="id=='0'" type="text" id="staffCode" class="form-control col-sm-4" style="width: 50%" disabled  placeholder="StaffCode">
                                    <input v-else type="text" id="staffCode" class="form-control col-sm-4" style="width: 50%"   :value="staffCode" disabled>
                                 </td>
                            </tr>
                            <tr  >
                                <td align="right" style="padding:20px;">
                                <!-- <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> -->
                                    <label class=" control-label pad-top-7" >Attribute</label>

                                </td>
                                <td  >

                                    <input  type="text" id="attribute" class="form-control col-sm-4" style="width: 50%"   placeholder="Attribute">

                                 </td>
                            </tr>
                            <tr >
                                <td align="right" style="padding:20px;">
                                <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
                                    <label class=" control-label pad-top-7">Active</label>
                                </td>
                                <td>
                                    <select v-if="id=='0'" id="active" >
                                            <option value="0">true</option>
                                            <option value="1">false</option>
                                    </select>
                                     <select v-else id="active" :value="active">
                                            <option value="0">true</option>
                                            <option value="1">false</option>
                                    </select>
                                </td>
                            </tr>
                         </br>
                         <tr>
                            <td align="center" style="padding:20px;" colspan="2">
                                <button type="button" class="btn btn-primary" @click="save();" >
                                    <span class="fa fa-search"> </span>
                                    &nbsp;&nbsp;Active
                                 </button>

                                <button type="button" class="btn btn-primary" @click="save();" >
                                    <span class="fa fa-search">
                                    </span>
                                    &nbsp;&nbsp;Deactive
                                </button>
                                <button type="button" class="btn btn-primary" @click="gobacks();" >
                                    <span class="fa fa-search">
                                    </span>
                                    &nbsp;&nbsp;Back
                                </button>


                            </td>

                         </tr>
                        </table>
                         </form>
                </div>

            </div>
                <!-- /.box-body -->
        </div>
            <!-- /.box -->
            <!-- table 2 end-->
    </div>
        <!-- /.col -->

    <!-- /.row -->
</section>
<!-- /.content -->

</template>



<script>
	export default{
		name: "FolderPathEdit",
        props:['vclass','folderPathName'],
        data(){
            return{'id':this.$route.query.id,
                    'folderName':this.$route.query.folderName,
                    'folderOwner':this.$route.query.folderOwner,
                    'staffCode':this.$route.query.staffCode,
                    'active':this.$route.query.active

            }
        },
		methods:{
            gobacks:function(){
                if(Config.MODE_TYPE === 'apon'){
					top.location.href = Config.getAPONURL();
				}else{
					this.$router.back();
				}


            },
	    	save: function() {
              var folderId=$("#folderId").val();
			   var folderPath=$("#folderPath").val();
			   var folderOwner=$("#folderOwner").val();
               var staffCode=$("#staffCode").val();
               var attribute=$("#attribute").val();
               var active=$("#active").val();
				$.ajax({
					url: Config.getBaseURL() + "/FolderPathMGT/add",
					data: {
                        "folderId":  folderId,
						"folderPath": folderPath,
						"folderOwner": folderOwner,
                        "staffCode": staffCode,
                        "attribute": attribute,
						"active": active
					},
					type: 'get',
					dataType: 'json',
					success: function(data) {

						$.alert("保存成功！Save success!");
					},
					error: function(msg) {
						$.alert(msg);
						this.closemodal;

					}
				});
			},
            checkPath:function(){
                var path=$("#folderPath").val();
                var reg=/^[\.A-Za-z0-9_\\\\\s]+$/;
                    if(path!=""&&!reg.test(path)){
                        $.alert("Only number, english chart,underlines ,dot and '\\' is allowed for folder path.文件夹只能输入字母，数字，下划线，标点符号点和反斜杠。 ");
                        $("#folderPath").val("");
                    }

            },
            doAfterSelectOtherPerson:function(data){
				$("#folderOwner").val(data.email);
                 $("#staffCode").val(data.staffCode);


			}
	    }
	}

</script>

