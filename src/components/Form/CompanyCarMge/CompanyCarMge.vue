<template>
	<div>
		<section class="content-header">
			<h1>
     Company Car Mapping Table Maintenance
      </h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<!-- Main row -->
			<div class="row">
				<!-- Left col -->
				<div class="col-md-12 ">
					<!-- Horizontal Form -->
					<div class="box box-primary1">
						<div class="box-header with-border">
							<h3 class="box-title">
								<i class="fa fa-list-alt"></i> &nbsp;Company Car Management 公司车辆管理</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<div class="row">
								

									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Car Type 汽车类型</label>
											<select class="form-control" id="carType" name="carType">
													<option value="">--Please Select--</option>
													<option value="1">First Company Car</option>
													<option value="2">Second Company Car</option>
												</select>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Car Brand 汽车品牌</label>
											<input type="text" id="carBrand" class="form-control col-sm-4" style="width: 100%" placeholder="Car Brand">
										</div>
									</div>
										<div class="col-md-3">
										<div class="form-group">
											<label for="">
												<i class="" style="font-size: 10px;"></i>Car Model 车型</label>
											<input type="text" id="carModel" class="form-control col-sm-4" style="width: 100%" placeholder="Car Model">
										</div>
									</div>
										<div class="col-md-3">
										<div class="form-group">
										<label for="">Car Category 汽车类别</label>
											<form-group   type="select2" haslable="false" uri='/carManagement/getCatrgory' name="carCategory" id="carCategory" v-model="form.carCategory" tags="false"></form-group>
										</div>
									</div>
									
								
									<div class="row">
										<div class="col-md-12">
											<div class="form-group">
									 			<button style="display: inline-block;width:58px;height:31px; margin-left: 15px;margin-right: 22px;float: right;overflow:hidden;" type="button" class=" btn btn-primary btn-sm" @click="draw();">Search</button>
                		</div>
							 	</div>
							 	</div>
								</div>
								<br/>
									<div class="row">
									<uploadAjax  style='display: inline-block;width:60px;height:31px; margin-left:15px;margin-right: 20px;float: right;overflow:hidden;'  buttonText="Upload" buttonClass="btn btn-primary btn-sm"
												multi="false" fileSizeLimit="20MB" :uri="GL.getURL('/carManagement/uploadrecordexcel?stime=' + Date.parse(new Date()))"
												v-on:afterupload="afteruploadXlsx" ></uploadAjax>
												<a  style='display: inline-block; margin-left: 15px;float: right;' target='_blank' :href="GL.getURL('/companyCar/getTemplete')"><i class='fa fa-download'></i>&nbsp;&nbsp;Batch Upload Template 批量上传模板</a>
								</div>
								<table id="car_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;width:100%;">
									<thead>
										<tr role="row" style="height:20px;width:100%;">
												<th width="5%">No.</th>
											<th width="20">Car Category</th>
											<th width="15%">Car Type</th>
											<th width="20%">Car Brand</th>
										  <th width="20%">Car Model</th>
											<th width="20%">Children Number</th>
										</tr>
									</thead>
									<tbody>
									</tbody>
								</table>
							</div>

						</form>
					</div>
				</div>
				<!-- /.col -->
				<!-- pdf更换管理 -->
				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title">
							<i class="fa fa-upload" aria-hidden="true"></i> &nbsp; Upload Company Car Ordering List 上传公司车辆列表</h3>
							
						</div>
						<form role="form" id="adddevice">
							<input type="reset" style="display:none;" />  
							<div class="box-body">

								<div class="row">
								<div class="col-md-3">
										<div class="form-group">
											<!-- <label for="">
												<i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>Dictionary Group Name</label>
											<input type="text" name="name" class="form-control col-sm-4" id="dictionaryNameAdd" style="width: 100%" placeholder="DictionaryGroup"> -->
											<uploadAjax    buttonText="Upload Company Car Ordering List" multi="false" fileSizeLimit="20MB" :uri="GL.getURL('/companyCar/uploadrecordexcel?stime=' + Date.parse(new Date()))"
												v-on:afterupload="afterupload" ></uploadAjax>
												
											 
										</div>
									<!-- <a type="button" target='_blank' :href="GL.getURL('/attachment/downloadimage/'+pdfId)"  style="padding-right: 0;" title="Company Car Ordering List 公司汽车列表" class="btn"> 
												<i class="fa fa-file-powerpoint-o" style="font-size: 20px;"></i>&nbsp;&nbsp;Company Car Ordering List 公司车辆列表
											</a>  -->
									</div>
									<div class="col-md-3">
										<div class="form-group">
										<a type="button" target='_blank' :href="GL.getURL('/attachment/downloadimage/'+pdfId)"  style="padding-right: 0;" title="Company Car Ordering List 公司汽车列表" class="btn"> 
												<i class="fa fa-file-powerpoint-o" style="font-size: 20px;"></i>&nbsp;&nbsp;Company Car Ordering List 公司车辆列表
											</a> 
											 
										</div>
									</div>

								
									
								</div>
							</div>
						</form>
					</div>
				</div>
			<!-- pdf更换管理 -->




			</div>
			<!-- /.row -->
		</section>
		<!-- /.content -->

	</div>
</template>

<script>
export default {
  name: "CompanyCarMge",
  props: [],
  methods: {
   draw: function() {
		
      $("#car_table")
        .DataTable()
        .draw();
    },
	
		//for car
		retrieveDataForCar: function(url, aoData, fnCallback) {
       var carType = $("#carType").val();
      var carBrand = $("#carBrand").val();
			 var carModel = $("#carModel").val();
			 var carCategory =this.form.carCategory;

      $.ajax({
        url: url, //这个就是请求地址对应sAjaxSource
        data: {
          aoData: JSON.stringify(aoData),
          carType:carType,
					carBrand:carBrand,
					carModel:carModel,
					carCategory:carCategory
        }, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type: "get",
        dataType: "json",
        success: function(data) {
          fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
        },
        error: function(msg) {
          $.alert(msg.responseText);
        }
      });
    },
    changeTableCol: function(key) {
      return this.$t(key);
      /*return key;*/
    },
		afterupload: function (response) {
         this.pdfId=response.pdfId;
					 $.alert(response.msg);
					
				
       },
	afteruploadXlsx: function (response) {
         if(response.status=='true'){
					 this.draw();
					
					 $.alert(response.msg);
						 
           }else{
						  $.alert(response.msg);
					 }
				


       },

   
    
  },
  data() {
    var dm = {};
    dm.form = {};
		dm.form.carCategory="";
	  this.GL.actUtil.query("get", "/carManagement/getpdf", "", function(data) {
				var pdf = JSON.parse(data);
				dm.pdfId=pdf.pdfId;
			});
		return dm;
  },
  mounted() {
		var gal = this.GL;
   
    var queryDataForCar = this.retrieveDataForCar;
		var draw = this.draw;
	
		var tableTwo = $("#car_table").DataTable({
      fnServerData: queryDataForCar,
      sAjaxSource: Config.getBaseURL() + "/carManagement/list",
      serverSide: true,
      filter: false,
      lengthChange: false,
      aoColumnDefs: [
        {
          bSortable: false,
          aTargets: [0,5]
        }
      ],
      aaSorting: [[0, "asc"]], //给列表排序
      columns: [
        {
          data: "id"
        },
				 {
          data: "carCategory"
        },
				{
          data: "carType"
        },
				 
        {
          data: "carBrand"
        },
        {
          data: "carModel"
        },
				 
        {
          data: "childrenNumber"
        }
       
      ],
      fnRowCallback: function(row, data, index) {
        //设置列从0开始
					
				  $('td:eq(0)', row).html(index+1);
		      $('td:eq(2)', row).html(data.carType=="1"?"<td >First Company Car</td>" :"<td >Second Company Car</td>");

        return row;
      }
    });

	
   
    this.$root.eventHub.$off("changLangEvent");
    this.$root.eventHub.$on("changLangEvent", lang => {
      this.draw();
    });
  }
};
</script>

<style>
.ReferencePicture div div .uploadifive-button.btn.btn-default input[type=file]{
	font-size: 30px;
	opacity: 0;
	position: absolute; 
	right: -3px; 
	top: -3px;
	left: -10px;
}
.ReferencePicture div div div.uploadifive-button.btn.btn-default{
	position: relative;
	right: -73px;
	top: 3px;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list{
	display: inline-block; 
	margin-top: 5px;
	float: left;
	width: 50%;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li{
	width: 100%;
	padding-top: 0;
	margin-top: -5px;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li span{
	width: 100%;
	text-align: center;
	margin-top: 3px;
	display: none;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li span button{
	width: 100%;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li div img{
	border-radius: 0;
}
.ReferencePicture div div div.users-list.clearfix.upload-images-list li div{
	height: 100px;
}
.content-wrapper {
  font-family: arial,simsun;
}
</style>

