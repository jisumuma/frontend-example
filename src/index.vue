<template>
	<div v-if="mode !='apon'" class="wrapper">
		<header class="main-header">
			<!-- Logo -->
			<a href="index2.html" class="logo">
				<!-- mini logo for sidebar mini 50x50 pixels -->
				<span class="logo-mini"><b>A</b>LT</span>
				<!-- logo for regular state and mobile devices -->
				<span class="logo-lg">{{ $t('DEMO') }}</span>
			</a>
			<!-- Header Navbar: style can be found in header.less -->
			<nav class="navbar navbar-static-top">
				<!-- Sidebar toggle button-->
				<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
					<span class="sr-only">
                    Toggle navigation
                </span>
				</a>
				<div class="navbar-custom-menu">
					<ul class="nav navbar-nav">
						<li class="dropdown messages-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
								<i class="fa fa-language">
                            </i>
							</a>
							<ul class="dropdown-menu">
								<li class="header">
									There are all kinds of languages
								</li>
								<li>
									<!-- inner menu: contains the actual data -->
									<ul class="menu">
										<li>
											<!-- start message -->
											<a href="javascript:void(0)" @click="changeLanguage('cn');">
												<div class="pull-left">
													<img src="./assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
												</div>
												<h4>Chinese</h4>
												<p>Show page with Chinese</p>
											</a>
										</li>
										<!-- end message -->
										<li>
											<a href="javascript:void(0)" @click="changeLanguage('en');">
												<div class="pull-left">
													<img src="./assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
												</div>
												<h4>English</h4>
												<p>Show page with English</p>
											</a>
										</li>
										<li>
											<a href="javascript:void(0)" @click="changeLanguage('ja');">
												<div class="pull-left">
													<img src="./assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
												</div>
												<h4>Japanese</h4>
												<p>Show page with Japanese</p>
											</a>
										</li>
									</ul>
								</li>
								<li class="footer">
									<a href="#">
										More Language In Future
									</a>
								</li>
							</ul>
						</li>
						<!-- User Account: style can be found in dropdown.less -->
						<li class="dropdown user user-menu">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown">
								<img src="./assets/img/user2-160x160.jpg" class="user-image" alt="User Image">
								<span class="hidden-xs" id="head-user-photo"></span>
							</a>
							<ul class="dropdown-menu">
								<!-- User image -->
								<li class="user-header">
									<img src="./assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
									<p id="date-now">
									</p>
								</li>
								<!-- Menu Body -->
								<li class="user-body">
									<div class="row">
										<div class="col-xs-4 text-center">
											<a href="#">
												Followers
											</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">
												Sales
											</a>
										</div>
										<div class="col-xs-4 text-center">
											<a href="#">
												Friends
											</a>
										</div>
									</div>
									<!-- /.row -->
								</li>
								<!-- Menu Footer-->
								<li class="user-footer">
									<div class="pull-left">
										<a href="#" class="btn btn-default btn-flat">
											Profile
										</a>
									</div>
									<div class="pull-right">
										<button v-on:click="logOut" class="btn btn-primary btn-flat ch">
                                        Sign out
                                    </button>
									</div>
								</li>
							</ul>
						</li>
						<!-- Control Sidebar Toggle Button -->
						<li>
							<a href="#" data-toggle="control-sidebar">
								<i class="fa fa-gears">
                            </i>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</header>
		<!-- Left side column. contains the logo and sidebar -->
		<aside class="main-sidebar">
			<!-- sidebar: style can be found in sidebar.less -->
			<section class="sidebar">
				<!-- Sidebar user panel -->
				<div class="user-panel">
					<div class="pull-left image">
						<img src="./assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
					</div>
					<div class="pull-left info">
						<p id="side-user-photo">
						</p>
						<a href="#">
							<i class="fa fa-circle text-success">
                        </i> Online
						</a>
					</div>
				</div>
				<!-- search form -->
				<form action="#" method="get" class="sidebar-form">
					<div class="input-group">
						<input type="text" name="q" class="form-control" placeholder="Search...">
						<span class="input-group-btn">
                        <button type="submit" name="search" id="search-btn" class="btn btn-flat">
                            <i class="fa fa-search">
                            </i>
                        </button>
                    </span>
					</div>
				</form>
				<!-- /.search form -->
				<!-- sidebar menu: : style can be found in sidebar.less -->
				<ul class="sidebar-menu">
					<li class="header">
						{{ $t('HOME') }}
						<router-link :to="{ path:'/' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            {{ $t('HOME') }}
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/application' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            My Application
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/task' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            My Tasks
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/BusinessCard/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            Business Card
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/BusinessCardReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Business Card Report
                        </span>
						</router-link>
					</li>
					<li>
				<router-link :to="{ path:'/index/cePermitTask' }">
					<i class="glyphicon glyphicon-home">
				</i>
					<span>
					CE Permit Responsible Tasks
				</span>
				</router-link>
		  </li>
		  <li>
						<router-link :to="{ path:'/index/form/WorkCertificate/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            Work Certificate
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WorkCertificateReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Work Certificate Report
                        </span>
						</router-link>
					</li>
					<li>
				<router-link :to="{ path:'/index/form/JobDescriptionApplication/create' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Job Description Application
					</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{ path:'/index/JobDescriptionApplicationReport' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Job Description Application Report
					</span>
				</router-link>
			</li>
					<li>
				<router-link :to="{ path:'/index/form/ConstructionWorkPermit/create/ehs' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Construction Work Permit
					</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{ path:'/index/form/ConstructionWorkPermit/create/tpw' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Construction Permit & Energy<!-- 施工许可和能源申请-->
					</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{ path:'/index/ConstructionWorkPermitReport' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Construction Work Permit Report
					</span>
				</router-link>
			</li>
			<li>
				<router-link :to="{ path:'/index/ConstructionWorkPermitReportCustom' }">
					<i class="glyphicon glyphicon-home">
					</i>
					<span>
						Construction Work Permit Custom Report
					</span>
				</router-link>
			</li>
			<li>
						<router-link :to="{ path:'/index/ConstructionWorkPermitMapReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Construction Work Permit Map Report
                        </span>
						</router-link>
					</li>
					<li>
            <router-link :to="{ path:'/index/form/TeamBuilding/create' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
								Team Building
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/TeamBuildingReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Team Building Report
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/TeamBuildingPersonReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Team Building Person Report
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/TeamBuildingDeptReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Team Building Dept Report
                        </span>
            </router-link>
          </li>
					<li>
            <router-link :to="{ path:'/index/form/QuotationProcessApplication/create' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
								Quotation Process
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/QuotationProcessApplicationReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Quotation Process Report
                        </span>
            </router-link>
          </li>

					<li>
						<router-link :to="{ path:'/index/form/TransportationApplication/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Transportation
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/TransportationApplicationReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Transportation Report
                        </span>
						</router-link>
					</li>
					
					<li>
						<router-link :to="{ path:'/index/form/EclosingApplication/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            E-Closing
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/EclosingApplicationReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            E-Closing Report
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/EclosingApplicationNew/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            E-Closing New
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/EclosingApplicationPending' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            E-Closing Pending Report
                        </span>
						</router-link>
					</li>
          <li>
            <router-link :to="{ path:'/index/form/OverTimeBlue/create' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
								Blue Collar Overtime
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/OverTimeBlueReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Blue Collar Overtime Report
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/OverTimeBlueSheetReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           Blue Collar Overtime Sheet Report
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/form/OverTimeWhite/create' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
								White Collar Overtime
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/OverTimeWhiteReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           White Collar Overtime Report
                        </span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ path:'/index/OverTimeWhiteSheetReport' }">
              <i class="glyphicon glyphicon-home">
              </i>
              <span>
                           White Collar Overtime Sheet Report
                        </span>
            </router-link>
          </li>
					<li>
						<router-link :to="{ path:'/index/form/HrTraining/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            HrTraining
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HrTrainingReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            HrTrainingReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/HrTrainingCancel/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            HrTrainingCancel
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HrTrainingCancelReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            HrTrainingCancelReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/ContractApprove/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Contract Approve
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/Travel/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Travel
                        </span>
						</router-link>
					</li>
					<li>
					<router-link :to="{ path:'/index/form/ContractApprove/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Contract Approve
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/ContractExtension/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Contract Extension
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ContractExtensionInitial' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Contract Extension Initial
                        </span>
						</router-link>
					</li>
					<li>

						<router-link :to="{ path:'/index/form/HrPePoAppraisal/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            HrPePoAppraisal
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HrPePoAppraisalReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            HrPePoAppraisalReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ContractExtensionReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ContractExtensionReport
                        </span>
						</router-link>
					</li>
					<li>
					<li>
						<router-link :to="{ path:'/index/form/LocalPcAdmin/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            LocalPcAdmin
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/LocalPcAdminReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            LocalPcAdminReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/CoiMain/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            CoiMain
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/CoiMainReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            CoiMainReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/ShareFolder/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ShareFolder
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ShareFolderReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ShareFolderReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/WifiAccount/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WifiAccount
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WifiAccountReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WifiAccountReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/FolderPathMGT/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            FolderPathManagement
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/LongTermVisitCard/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            LongTermVisitCard
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/LongTermVisitCardReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            LongTermVisitCardReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ItSystemResource' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ItSystemResource
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/ItSystemAccount/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ItSystemAccount
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ItSystemAccountReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ItSystemAccountReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/PurchaseProject' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            PurchaseProject
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/BuSupplierRecommendation/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            BuSupplierRecommendation
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/BuSupplierRecommendationReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            BuSupplierRecommendationReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/RequestForQuotationst/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            RequestForQuotationst
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/RequestForQuotationstReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            RequestForQuotationstReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WasteCategory' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WasteCategory
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/WasteDisposal/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WasteDisposal
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WasteDisposalReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WasteDisposalReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HotelInfo' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            HotelInfo
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/FurnitureNew/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            FurnitureApp
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/FurnitureNewReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            FurnitureAppReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/FurnitureAdmin' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            FurnitureAdmin
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/BusinessTravel/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            BusinessTravel
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/BusinessTravelReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            BusinessTravelReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/BmApplication/create' }">
							<i class="glyphicon glyphicon-home">
                  </i>
							<span>
                            BM Application
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/BmApplicationReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            BmApplicationReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/HrAttendanceDeviation/create' }">
							<i class="glyphicon glyphicon-home">
                  </i>
							<span>
                            Attendance Deviation 
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HrAttendanceDeviationReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            AttendanceDeviationReport
                        </span>
						</router-link>
					</li>
					<li>

						<router-link :to="{ path:'/index/form/PhotoPermit/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            PhotoPermit
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/PhotoPermitReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            PhotoPermitReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/StandardDevice' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            StandardDevice
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ItcpEmset' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ItcpEmset
                        </span>
						</router-link>
					</li>
					<li>

						<router-link :to="{ path:'/index/form/WorkPlace/create' }">
							<i class="glyphicon glyphicon-home">
                  </i>
							<span>
                            WorkPlace
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WorkPlaceReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WorkPlaceReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/WpEmployeeStandard' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            WpEmployeeStandard
                        </span>
						</router-link>
					</li>
					<li>

						<router-link :to="{ path:'/index/form/ItcpCompanyPhone/create' }">
							<i class="glyphicon glyphicon-home">
                  </i>
							<span>
                            ItcpCompanyPhone
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/ItcpCompanyPhoneReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            ItcpCompanyPhoneReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/UserDeviceInfo' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            UserDeviceInfo
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/KvsAccessGenerator/create' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            KVSAccessFormGenerator
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/KVSAccessAdmin' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            KVSFormGeneratorAdmin
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/KvsAccessGeneratorReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            KvsAccessGeneratorReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/SignatureUserDevice' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            SignatureUserDevice
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/CommonProcess' }">
						<i class="glyphicon glyphicon-home">
						</i>
						<span>
											CommonProcess
									</span>
						</router-link>
					</li>
					<li>

						<router-link :to="{ path:'/index/form/HrUalCarryover/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            HrUalCarryover
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/HrUalCarryoverReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            HrUalCarryoverReport
                        </span>
						</router-link>
					</li>
				
					<li>

						<router-link :to="{ path:'/index/form/CompanyCar/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
                            CompanyCar
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/CompanyCarReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            CompanyCarReport
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/CompanyCarMge' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Company Car Manager
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/CarMaintainAndAccident/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
								Company car Maintenance & Accident
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/CarMaintainAndAccidentReport' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Company car Maintenance & Accident Report
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/FixedAssetTransfer/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
								Fixed Asset Transfer
                        </span>
						</router-link>
					</li> 
	              <li>
					 <router-link :to="{ path:'/index/FixedAssetTransferReport'}">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Fixed Asset Transfer Report
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/FixedAssetRetirement/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
								Fixed Asset Retirement
                        </span>
						</router-link>
					</li> 
	              <li>
					 <router-link :to="{ path:'/index/FixedAssetRetirementReport'}">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Fixed Asset Retirement Report
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/form/FixedAssetAcquisition/create' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
								Fixed Asset Acquisition
                        </span>
						</router-link>
					</li> 
					<li>
						<router-link :to="{ path:'/index/FixedAssetAcquisitionUpload' }">
							<i class="glyphicon glyphicon-home">
                  			</i>
							<span>
								Fixed Asset Acquisition Upload
                        </span>
						</router-link>
					</li>
					<li>
					 <router-link :to="{ path:'/index/FixedAssetAcquisitionReport'}">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            Fixed Asset Acquisition Report
                        </span>
						</router-link>
					</li>
					<li>
						<router-link :to="{ path:'/index/TriggerTimed' }">
							<i class="glyphicon glyphicon-home">
                        </i>
							<span>
                            TriggerTimed
                        </span>
						</router-link>
					</li>
				</ul>
			</section>
			<!-- /.sidebar -->
		</aside>
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper" style="height:100%;">
			<div class="new-applications" style="margin:50px;height:360px" id="entry-div">
				<table id="entry-table">
					<tr>
						<td>
							<div class="group-title">Administration</div>
							<ul>
								<li>
									<a href="javascript:;" @click="pushRouter();"><i class="fa fa-credit-card"></i>Contract Approve</a>
								</li>
								<li>
									<a href="javascript:;" @click="pushRouter();"><i class="fa fa-plane"></i>Business Travel</a>
								</li>
								<li>
									<a href="javascript:;" @click="pushRouter('Travel');"><i class="fa fa-credit-card"></i>Travel</a>
								</li>
							</ul>
						</td>

						<td>
							<div class="group-title">Administration</div>
							<ul>
								<li>
									<a href="javascript:;"><i class="fa fa-credit-card"></i>Business Card</a>
								</li>
								<li>
									<a href="javascript:;"><i class="fa fa-plane"></i>Business Travel</a>
								</li>
							</ul>
						</td>
						<td>
							<div class="group-title">Administration</div>
							<ul>
								<li>
									<a href="javascript:;"><i class="fa fa-credit-card"></i>Business Card</a>
								</li>
								<li>
									<a href="javascript:;"><i class="fa fa-plane"></i>Business Travel</a>
								</li>
							</ul>
						</td>
						<td>
							<div class="group-title">Administration</div>
							<ul>
								<li>
									<a href="javascript:;"><i class="fa fa-credit-card"></i>Business Card</a>
								</li>
								<li>
									<a href="javascript:;"><i class="fa fa-plane"></i>Business Travel</a>
								</li>
							</ul>
						</td>
					</tr>
					<tr>
						<td></td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				</table>
			</div>
			<router-view style="margin-top:0px; padding:2px"></router-view>
			<!-- /.content -->
		</div>
		<!-- /.content-wrapper -->
		<footer class="main-footer">
			<div class="pull-right hidden-xs">
				<b>
                Version
            </b> 1.0
			</div>
			<strong>
            Copyright &copy; 2015-2017
            <a href="http://www.bullchina.net">
                Atos
            </a>
            .
        </strong> All rights reserved.
		</footer>
		<!-- Control Sidebar -->
		<aside class="control-sidebar control-sidebar-dark">
			<!-- Create the tabs -->
			<ul class="nav nav-tabs nav-justified control-sidebar-tabs">
				<li>
					<a href="#control-sidebar-home-tab" data-toggle="tab">
						<i class="fa fa-home">
                    </i>
					</a>
				</li>
				<li>
					<a href="#control-sidebar-settings-tab" data-toggle="tab">
						<i class="fa fa-gears">
                    </i>
					</a>
				</li>
			</ul>
			<!-- Tab panes -->
			<div class="tab-content">
				<!-- Home tab content -->
				<div class="tab-pane" id="control-sidebar-home-tab">
					<h3 class="control-sidebar-heading">
                    Recent Activity
                </h3>
					<ul class="control-sidebar-menu">
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-birthday-cake bg-red">
                            </i>
								<div class="menu-info">
									<h4 class="control-sidebar-subheading">
                                    Langdon's Birthday
                                </h4>
									<p>
										Will be 23 on April 24th
									</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-user bg-yellow">
                            </i>
								<div class="menu-info">
									<h4 class="control-sidebar-subheading">
                                    Frodo Updated His Profile
                                </h4>
									<p>
										New phone +1(800)555-1234
									</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-envelope-o bg-light-blue">
                            </i>
								<div class="menu-info">
									<h4 class="control-sidebar-subheading">
                                    Nora Joined Mailing List
                                </h4>
									<p>
										nora@example.com
									</p>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<i class="menu-icon fa fa-file-code-o bg-green">
                            </i>
								<div class="menu-info">
									<h4 class="control-sidebar-subheading">
                                    Cron Job 254 Executed
                                </h4>
									<p>
										Execution time 5 seconds
									</p>
								</div>
							</a>
						</li>
					</ul>
					<!-- /.control-sidebar-menu -->
					<h3 class="control-sidebar-heading">
                    Tasks Progress
                </h3>
					<ul class="control-sidebar-menu">
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
                                Custom Template Design
                                <span class="label label-danger pull-right">
                                    70%
                                </span>
                            </h4>
								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-danger" style="width: 70%">
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
                                Update Resume
                                <span class="label label-success pull-right">
                                    95%
                                </span>
                            </h4>
								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-success" style="width: 95%">
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
                                Laravel Integration
                                <span class="label label-warning pull-right">
                                    50%
                                </span>
                            </h4>
								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-warning" style="width: 50%">
									</div>
								</div>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)">
								<h4 class="control-sidebar-subheading">
                                Back End Framework
                                <span class="label label-primary pull-right">
                                    68%
                                </span>
                            </h4>
								<div class="progress progress-xxs">
									<div class="progress-bar progress-bar-primary" style="width: 68%">
									</div>
								</div>
							</a>
						</li>
					</ul>
					<!-- /.control-sidebar-menu -->
				</div>
				<!-- /.tab-pane -->
				<!-- Stats tab content -->
				<div class="tab-pane" id="control-sidebar-stats-tab">
					Stats Tab Content
				</div>
				<!-- /.tab-pane -->
				<!-- Settings tab content -->
				<div class="tab-pane" id="control-sidebar-settings-tab">
					<form method="post">
						<h3 class="control-sidebar-heading">
                        General Settings
                    </h3>
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Report panel usage
                            <input type="checkbox" class="pull-right" checked>
                        </label>
							<p>
								Some information about this general settings option
							</p>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Allow mail redirect
                            <input type="checkbox" class="pull-right" checked>
                        </label>
							<p>
								Other sets of options are available
							</p>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Expose author name in posts
                            <input type="checkbox" class="pull-right" checked>
                        </label>
							<p>
								Allow the user to show his name in blog posts
							</p>
						</div>
						<!-- /.form-group -->
						<h3 class="control-sidebar-heading">
                        Chat Settings
                    </h3>
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Show me as online
                            <input type="checkbox" class="pull-right" checked>
                        </label>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Turn off notifications
                            <input type="checkbox" class="pull-right">
                        </label>
						</div>
						<!-- /.form-group -->
						<div class="form-group">
							<label class="control-sidebar-subheading">
                            Delete chat history
                            <a href="javascript:void(0)" class="text-red pull-right">
                                <i class="fa fa-trash-o">
                                </i>
                            </a>
                        </label>
						</div>
						<!-- /.form-group -->
					</form>
				</div>
				<!-- /.tab-pane -->
			</div>
		</aside>
		<div id="loadingMask" class="alertBackground"></div>
		<div id="progressBar" class="progressBar">Loading...</div>
		<!-- /.control-sidebar -->
		<!-- Add the sidebar's background. This div must be placed immediately after the control sidebar -->
		<div class="control-sidebar-bg">
		</div>
	</div>
	<div v-else>
		<router-view style="margin-top:0px; padding:2px"></router-view>
		<div id="loadingMask" class="alertBackground"></div>
		<div id="progressBar" class="progressBar">Loading...</div>
    <div class="btn-fixed">
      <ul>
        <li>
          <button id="vue_save_btn_fixed" style="display:none;" type="" class="btn  btn-primary "><i class="fa fa-save"></i><br>Save</button>
        </li>
        <li>
          <button id="vue_confirm_btn_fixed" style="display:none;" type="" class="btn btn-success"><i class="fa fa-check"></i><br>Confirm</button>
        </li>
        <li>
        <button id="vue_approve_btn_fixed" style="display:none;" type="" class="btn btn-success"><i class="fa fa-check"></i><br>Approve</button>
        </li>
        <li>
        <!--<reject :form="form" :labelName="realRejectLabelName" :validator="validator" :isFixed="true"></reject>-->
        <button id="vue_reject_btn_fixed" style="display:none;" type="" class="btn btn-danger" ><i class="fa fa-fw fa-close"></i><br>Reject</button>
        </li>
        <li>
          <a href="mailto:itservice@atj.volkswagen.com.cn"><button type="" class="btn btn-primary" ><i class="fa fa-fw fa-commenting-o"></i><br>Feedback</button></a>
        </li>
        <li>
          <a><button type="" class="btn btn-primary" v-on:click="service"><img src="./dist/img/kefu.png" style="width:20px;height:20px;" ><br>Q & A</button></a>
        </li>
        <li>
          <button  type="" id="vue_gotop" class="btn btn-default" style="background: #ccc;display:none;" onclick="window.parent.postMessage('vue_scrollTop' ,'*')"><i class="fa fa-fw fa-chevron-up"></i><br>Back To Top</button>
        </li>
      </ul>
    </div>
	</div>
</template>
<script>
	import i18n from './i18n'
	export default {
		name: 'index',
		data() {
			return {
				'mode': Config.MODE_TYPE
			};
		},
		methods: {
			changeLanguage: function(lang) {
				i18n.locale = lang;
				this.$root.eventHub.$emit('changLangEvent', lang);
			},
			logOut: function() {
				localStorage.clear();
				this.$router.push('login')
			},
			isHome() {
				if(this.$route.path === '/') {
					$("#entry-div").css("display", "block");
				} else {
					$("#entry-div").css("display", "none");
				}
			},
			pushRouter: function(key) {
				this.$router.push({
					path: '/index/form/' + key + '/create'
				});
			},
      service: function () {
        var url = "https://vwatj.s2.udesk.cn/im_client/?web_plugin_id=2448&language=en-us";
        var name = "";
        var iWidth = window.screen.availWidth / 2;
        var iHeight = window.screen.availHeight / 2;
        var iTop = (window.screen.availHeight-30-iHeight)/2;
        var iLeft = (window.screen.availWidth-10-iWidth)/2;
        window.open(url,name,'height='+iHeight+',width='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=no,resizeable=no,location=no,status=no');
      }
		},
		watch: {
			'$route': 'isHome'
		},
		mounted() {
			//页面刷新
			this.isHome();
			if(document.createEvent) {
				var event = document.createEvent("HTMLEvents");
				event.initEvent("resize", true, true);
				window.dispatchEvent(event);
			} else if(document.createEventObject) {
				window.fireEvent("onresize");
			}
			//显示用户信息
			$("#head-user-photo").text(localStorage.uname.toUpperCase());
			$("#side-user-photo").text(localStorage.uname.toUpperCase());
			$("#date-now").text(localStorage.uname.toUpperCase());
		}
	};
	var fix_menu_height=0;
	var old_body_height=0;
  //$(document.body).css('overflow-y','hidden');
  function resizeIframe(){
    if(old_body_height==0||old_body_height!=document.body.clientHeight){
      old_body_height=document.body.clientHeight;
      window.parent.postMessage('thisWindowHeight:'+old_body_height, '*');
     // console.log(document.body.clientHeight);
      //overflow-y:hidden
    }

  }
  var t = setInterval(resizeIframe,50);
  window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      document.getElementById("vue_gotop").style.display = "block";
    } else {
      document.getElementById("vue_gotop").style.display = "none";
    }
  }
  window.onload=function(){
    fix_menu_height=parseFloat($(".btn-fixed").css('top').replace('px',''));
	  var thisWindowHeight=document.body.clientHeight;
    window.parent.postMessage('thisWindowHeight:'+thisWindowHeight, '*');
    //console.log(thisWindowHeight);
  }

  window.addEventListener('message', function(evt){
    if(evt.data.indexOf('liferay_scrollTop')==0){
      var messages=evt.data.split(':');
      if(messages!=null&&messages.length==2){
        if (parseFloat(messages[1]) > 100) {
          document.getElementById("vue_gotop").style.display = "block";
        } else {
          document.getElementById("vue_gotop").style.display = "none";
        }
       $(".btn-fixed").css('top',fix_menu_height+parseFloat(messages[1]));

      }
    }
    if(evt.data.indexOf('liferay_resize')==0){
      var messages=evt.data.split(':');
      if(messages!=null&&messages.length==2){
        fix_menu_height=(parseFloat(messages[1])-parseFloat($(".btn-fixed").css('height').replace('px','')))/2-50-270;
      }
    }
  });

</script>
<style type="text/css">
  .btn-fixed{
    position: fixed;
    top: 12%;
    right: 0;
    z-index: 9999;
  }
  .btn-fixed ul li{
    list-style: none!important;
  }
  .btn-fixed ul li button{
    width: 70px!important;
    border: none!important;
    margin-bottom: 5px!important;
    border-radius: 0!important;
    font-size: 12px!important;
    height: 60px!important;
    padding: 0!important;
  }
  .btn-fixed ul li button i{
    font-size: 20px!important;
    margin-bottom: 5px!important;
  }
</style>
