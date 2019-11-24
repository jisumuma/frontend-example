<template>
	<div>
		<!-- Content Header (Page header) -->
		<section class="content-header">
			<h1>EHS Report</h1>
		</section>
		<!-- Main content -->
		<section class="content">
			<div class="row">
				<!-- Default box -->
				<div class="col-md-12">
					<!-- Horizontal Form -->
					<div class="box box-primary">
						<div class="box-header with-border">
							<h3 class="box-title"><i class="fa fa-file-text-o"></i> &nbsp;Construction Work Permit Map Report</h3>
						</div>
						<!-- /.box-header -->

						<div class="box-body">
							<!-- form start -->
							<form>
								<div class="text-muted well well-sm no-shadow">
									<div class="row">
										<div class="form-group col-md-3" style="margin-top:15px;color:#333333;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Construction Permit"/> <i class="fa fa-fw fa-gavel"></i> Construction Permit 施工许可</label>
										</div>
										<div class="form-group col-md-3" style="margin-top:15px;color:#CC66CC;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Energy & Medium Application"/> <i class="fa fa-fw fa-tint"></i> Energy & Medium Application 能源& 介质申请</label>
										</div>
										<div class="form-group col-md-3" style="margin-top:15px;color:#FF0000;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Hot Work Permit"/> <i class="fa fa-fw fa-fire"></i> Hot Work Permit 动火作业许可</label>
										</div>
									</div>
									<div class="row">
										<div class="form-group col-md-3" style="margin-top:15px;color:#0000CC;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Work at Height Permit"/> <i class="fa fa-fw fa-arrows-v"></i> Work at Height Permit 高处作业许可</label>
										</div>
										<div class="form-group col-md-3" style="margin-top:15px;color:#FF6600;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Confine Space Permit"/> <i class="fa fa-fw fa-clone"></i> Confine Space Permit 有限空间许可</label>
										</div>
										<div class="form-group col-md-3" style="margin-top:15px;color:#800080;">
											<label style="font-weight:normal"><input type="checkbox" style="height:20px; vertical-align:middle; margin-top:0;" name="type" v-model="types" value="Other Dangerous Work"/> <i class="fa fa-fw fa-exclamation-triangle"></i> Other Dangerous Work 其它危险作业</label>
										</div>
										<!-- 搜索、按钮 -->
										<div class="form-group col-md-3" style="margin-bottom: 0;">
											<button type="button" class="btn btn-primary" @click="draw();" title="搜索"><i class="fa fa-fw fa-search"></i> Search</button>
										</div>
									</div>
								</div>
							</form>
							<div style="position:relative;">
								<img src="./map_constructionworkpermit.png" border="0" name="foot" width="100%" height="100%" />
								<!--Hall 3a-->
								<!--DQ-Hall 3a-Pre-machining 热前机加生产区 border: 1px solid black;-->
								<div id="mapDq1" v-if="showdata" style="left: 6.5%;top:22%;width:6%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ419">
													<a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3a-Finishing machining 热后机加生产区 style="display:inline-block;height:20px;"-->
								<div id="mapDQ2" v-if="showdata" style="left: 11%;top:22%;width:7%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ420" >
													<a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3a-Heat treatment 热处理生产区-->
								<div id="mapDQ3" v-if="showdata" style="left: 15.5%;top:22%;width:7%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ421" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3a-Assembly 装配生产区-->
								<div id="mapDQ4" v-if="showdata" style="left: 21%;top:16%;width:10%;height:13%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ422" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Machatronics 机电单元生产区
								<div id="mapDQ5" v-if="showdata" style="left:21%;top:10%;width:8%;height:15%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ15" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>-->
								<!--DQ-Hall 3a-Others 其它 border: 1px solid black;-->
								<div id="mapDQ6" v-if="showdata" style="left: 0.5%;top:22%;width:8%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ424" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-->
								<!--DQ-Hall 3-Pre-machining 热前机加生产区  border: 1px solid black;-->
								<div id="mapDQ7" v-if="showdata" style="left: 6.5%;top:27%;width:6.5%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ313" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-Finishing machining 热后机加生产区-->
								<div id="mapDQ8" v-if="showdata" style="left: 11%;top:27%;width:7%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ314" style="height: 15px;" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-Heat treatment 热处理生产区-->
								<div id="mapDQ9" v-if="showdata" style="left: 15.5%;top:27%;width:7%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ315" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-Assembly 装配生产区-->
								<div id="mapDQ10" v-if="showdata" style="left:20.5%;top:27%;width:6.5%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ316"  ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-Machatronics 机电单元生产区-->
								<div id="mapDQ11" v-if="showdata" style="left: 25%;top:27%;width:6%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ317" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 3-Others 其它-->
								<div id="mapDQ12" v-if="showdata" style="left: 0.5%;top:27%;width:8%;height:17%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ318"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<!--DQ-Hall 2-->
								<!--DQ-Hall 2-Pre-machining 热前机加生产区-->
								<div id="mapDQ13" v-if="showdata" style="left: 6.5%;top:42%;width:6.5%;height:23%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ27" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 2-Finishing machining 热后机加生产区-->
								<div id="mapDQ14" v-if="showdata" style="left:11%;top:42%;width:7%;height:23%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ28" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 2-Heat treatment 热处理生产区-->
								<div id="mapDQ15" v-if="showdata" style="left: 15.5%;top:44%;width:7%;height:23%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ29" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 2-Assembly 装配生产区-->
								<div id="mapDQ16" v-if="showdata" style="left: 20.5%;top:44%;width:7%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ210" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 2-Machatronics 机电单元生产区-->
								<div id="mapDQ17" v-if="showdata" style="left: 25%;top:44%;width:6%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ211" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 2-Others 其它-->
								<div id="mapDQ18" v-if="showdata" style="left: 0.5%;top:42%;width:8%;height:24%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ212" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<!--DQ-Hall 1-->
								<!--DQ-Hall 1-Pre-machining 热前机加生产区-->
								<div id="mapDQ19" v-if="showdata" style="left: 6.5%;top:65%;width:6.5%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList" >
												<li v-for="(item,index) in mapdata.DQ11"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Finishing machining 热后机加生产区  border: 1px solid #ccc;-->
								<div id="mapDQ20" v-if="showdata" style="left:11%;top:65%;width:6.5%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ12"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Heat treatment 热处理生产区-->
								<div id="mapDQ21" v-if="showdata" style="left: 15.5%;top:65%;width:7%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ13" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Assembly 装配生产区-->
								<div id="mapDQ22" v-if="showdata" style="left: 20.5%;top:65%;width:6.5%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ14"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Machatronics 机电单元生产区-->
								<div id="mapDQ23" v-if="showdata" style="left: 25%;top:65%;width:6.5%;height:22%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ15" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 1-Others 其它-->
								<div id="mapDQ24" v-if="showdata" style="left: 0.5%;top:65%;width:8%;height:15%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ16" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<!--Hall 4-->
								<!--DQ-Hall 4-Pre-machining 热前机加生产区-->
								<div id="mapDQ25" v-if="showdata" style="left: 29%;top:33%;width:16%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ525"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 4-Finishing machining 热后机加生产区-->
								<div id="mapDQ26" v-if="showdata" style="left: 29%;top:22%;width:16%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ526"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 4-Heat treatment 热处理生产区-->
								<div id="mapDQ27" v-if="showdata" style="left: 29%;top:29%;width:16%;height:6%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ527"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 4-Assembly 装配生产区-->
								<div id="mapDQ28" v-if="showdata" style="left: 29%;top:17.5%;width:16%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ528"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Hall 4-Machatronics 机电单元生产区
								<div id="mapDQ29" v-if="showdata" style="left: 26%;top:30%;width:18%;height:5%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ529"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>-->
								<!--DQ-Hall 4-Others 其它-->
								<div id="mapDQ30" v-if="showdata" style="left: 29%;top:37.5%;width:16%;height:7%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ530"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>

								<!--DQ-Other 其它-->
								<div id="mapDQ31" v-if="showdata" style="left: 0%;top:91%;width:45%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ9"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-EAZ-->
								<div id="mapDQ32" v-if="showdata" style="left: 36%;top:73%;width:7%;height:11%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ7"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-Logistic 物流 border: 1px solid #black;-->
								<div id="mapDQ33" v-if="showdata" style="left: 29%;top:57%;width:7.5%;height:25%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ6" ><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--DQ-CEA-->
								<div id="mapDQ34" v-if="showdata" style="left: 1%;top:79%;width:5.5%;height:11%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DQ8"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								
								<!-- DL-Hall 1-Pre-machining 热前机加生产区 -->
								<div id="mapDl1" v-if="showdata" style="left: 60%;top:30%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1031"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Hall 1-Finishing machining 热后机加生产区 -->
								<div id="mapDl2" v-if="showdata" style="left: 60%;top:37%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1032"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Hall 1-Heat treatment 热处理生产区-->
								<div id="mapDl3" v-if="showdata" style="left: 60%;top:44%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1033"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Hall 1-Assembly 装配生产区 -->
								<div id="mapDl4" v-if="showdata" style="left: 60%;top:51%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1034"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Hall 1-Machatronics 机电单元生产区 -->
								<div id="mapDl5" v-if="showdata" style="left: 60%;top:58%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1035"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Hall 1-Others 其它 -->
								<div id="mapDl6" v-if="showdata" style="left: 72.5%;top:73%;width:20%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL1036"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!--  DL- Logistic 物流 -->
								<div id="mapDl7" v-if="showdata" style="left: 60%;top:65%;width:30%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL11"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- DL-Other 其它 border: 1px solid black; -->
								<div id="mapDl7" v-if="showdata" style="left: 49%;top:92%;width:51%;height:9%;position:absolute;">
									<div class="txtScroll-top">
										<div class="bd">
											<ul class="infoList">
												<li v-for="(item,index) in mapdata.DL12"><a href="###" :title="item.name"><font :style="{'color': item.typeColor}" ><i :class="item.icons"></i>{{item.name}}</font></a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- /.box -->
				</div>
				<!-- /.box -->
			</div>
			<!-- 需隐藏
			<button type="button" class="btn btn-primary" @click="updateCompleted();" title="UpdateCompleted">UpdateCompleted</button>
		 	-->
		</section>
		<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->

</template>

<script>
	import adminlte from "adminlte"
	import locale from "locale"
	import moment from "moment"
	import daterangepicker from "bootstrap-daterangepicker"

	export default {
		name: "ConstructionWorkPermitMapReport",
		props: ['vclass'],
		data() {
			var dm = {};
			dm.types = [];
			dm.mapdata = {
				DQ11: [{name:1,type:1},{name:2,type:1},{name:3,type:1},{name:4,type:1},{name:5,type:1},{name:6,type:1},{name:7,type:1}],
				DL11: [{name:11,type:1},{name:22,type:1},{name:33,type:1},{name:44,type:1},{name:55,type:1},{name:66,type:1},{name:77,type:1}]
			}
			dm.showdata=true;
			return dm;
		},
		methods: {
			draw: function() {
				var _this = this;
				var url = Config.getBaseURL() + '/constructionWorkPermit/reportMap';
				this.showdata=false;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"types": _this.types
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'post',
					dataType: 'json',
					success: function(data) {
						_this.mapdata = data.data; //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
						
						setTimeout(function(){
							_this.showdata=true;
							setTimeout(function(){
							jQuery(".txtScroll-top").slide({
								/*titCell: ".hd ul",*/
								mainCell: ".bd ul",
								autoPage: true,
								effect: "top",
								autoPlay: true,
								scroll: 3,
								vis: 3,
								easing: "swing",
								delayTime: 500
							});
						},500);
						},200);
						
					},
					error: function(msg) {
						$.alert(msg.responseText);
					}
				});
			},
			updateCompleted: function() {
				$.ajax({
					url: Config.getBaseURL() + "/constructionWorkPermit/updateCwpStatusCompleted", //这个就是请求地址对应sAjaxSource
					type: "get",
					dataType: "json",
					success: function(data) {
						console.log("11 data="+data);
						$.alert("Update successfully! 更新成功！");
					},
					error: function(msg) {
						console.log("msg.responseText="+msg.responseText);
						//$.alert(msg.responseText);
					}
				});
			}

		},
		mounted() {
			this.draw();
			//具体参数参考superslide.js api
			jQuery(".txtScroll-top").slide({
				//titCell: ".hd ul",
				mainCell: ".bd ul",
				autoPage: true,
				effect: "top",//向上滚动
				autoPlay: true,
				scroll: 3,//一次性滚屏展示3条
				vis: 3,//默认展示3条
				easing: "swing",
				delayTime: 500  //动画时间
			});
			this.$root.eventHub.$off('changLangEvent');
			this.$root.eventHub.$on('changLangEvent', (lang) => {
				this.draw();
			});
		},
		computed: {
			
		}
	}
</script>
<style scoped>
	.txtScroll-top {
		overflow: hidden;
		position: relative;/*absolute  relative*/
		border: 0px solid #ccc;
	}	
	.txtScroll-top .bd {
		padding: 15px;
	}	
	.txtScroll-top .infoList{
		margin: 0px;
    	padding: 0px;
	}
	.txtScroll-top .infoList li {
		width: 100%;
		height: 15px;
		line-height: 15px;
		list-style-type:none;
		font-size:10px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}	
	.txtScroll-top .infoList li .date {
		float: right;
		color: #999;
	}
</style>