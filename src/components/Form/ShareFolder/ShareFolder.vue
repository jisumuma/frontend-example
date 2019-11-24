<template>
<!-- Content Wrapper. Contains page content -->
<div class="content-header">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <input type="hidden" v-model="form.id" name="id">

        <input type="hidden" v-model="form.applicantUserId" name="applicantUserId" id="applicantUserId">
      <h1> {{$t('ShareFolder')}}

      <a  v-if="!readonly"  href="http://vwatjportal.ap.vwg/web/vwatj/policies" target="_blank" style="margin-left: 10px; font-size: 18px;">
					<i class="fa fa-fw fa-info-circle"></i>Check IT portal</a>

      </h1>
      <ol class="breadcrumb" v-if="form.requestFor==1||form.requestFor==5">
        <li><a href="#">1.Applicant</a></li>
        <li><a href="#">2.Folder Owner</a></li>
        <li><a href="#">3.IT Service Center </a></li>
      </ol>
			 <ol class="breadcrumb" v-else>
        <li><a href="#">1.Applicant</a></li>
        <li><a href="#">2.IT Service Center </a></li>
      </ol>
			 <span v-if="form.ticketNo!=null" style="margin-top: 10px;display: block;">
				<strong>Application No. : {{form.ticketNo}}</strong>
				<strong style="margin-left: 20px;">Application Date : {{applicationTime}}</strong>
			</span>
    </section>
<section class="content container-fluid">

      <!-- Your Page Content Here -->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title pull-left" style="margin-right:10px;"> Applicant Info. 申请人信息  </h3>
            <label v-if="!check()"><input type="checkbox" id="onbehalf" @click="onbehalfclick" > On Behalf </label>
          </div>
          <form role="form">
            <div class="box-body">
              <div class="row">

              <!--不选中的时候显示-->
							<form-group v-if="!onbehalf" other-rules="required" col="md-3" type="input" v-model="form.creatorStaffcode" name="creatorStaffcode" readonly="readonly"></form-group>
							<!--选中的时候显示-->
							<div class="col-md-3" v-if="onbehalf">
								<div class="form-group">
									<label for="">
										 {{$t("ShareFolder.creatorStaffcode")}} </label>
									<div class="input-group ">
										<input type="text" class="form-control" placeholder="Staff Code 员工号" id="creatorStaffcode" name="creatorStaffcode" v-model="form.creatorStaffcode" readonly="readonly">
										<span class="input-group-btn" id="selectotherperson">
                          					<!--<button type="button" class="btn btn-primary btn-flat"><i class="fa fa-fw fa-search"></i></button>-->
                       <!-- <ChooseOtherPerson :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson"><i class="fa fa-fw fa-search"></i></ChooseOtherPerson>-->
											 <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(-1)"  data-toggle="modal" data-target="#personModal"><i class="fa fa-fw fa-search"></i>
                            </button>
                      </span>
									</div>
								</div>
							</div>
            <form-group col="md-3" type="hidden"  v-model="form.isOnbehalf" name="isOnbehalf" readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required" v-model="form.creatorName" name="creatorName" readonly="readonly"></form-group>

							<form-group col="md-3" type="input" other-rules="" v-model="form.creatorPhoneNum" name="creatorPhoneNum" :readonly="readonly"></form-group>
							<form-group col="md-3" type="input" other-rules="required"  v-model="form.creatorDept" name="creatorDept" readonly="readonly"></form-group>
						</div>
            </div>
          </form>
        </div>
   <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Request For 申请目的</h3>
          </div>
          <div class="box-body" v-if="!check()">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="radio" >
                    <label >

                      <input type="radio" name="optionsRadios1" v-model="form.requestFor" id="optionsRadios1" value="1" :disabled="check()" @click="Laborss" >
                      Access shared folder with Read Only / Write permission 获得已有共享文件夹的“只读”或者“编辑”权限<br>
                    <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Please provide user list who would like to access the shared folder with dedicated access type (Read only / Write) in following User List for 请提供访问用户列表和权限在下面的表格中
                    </label>
                  </div>
                  <div class="radio" >
                    <label>
                      <input type="radio" name="optionsRadios2"  v-model="form.requestFor" value="2"   :disabled="check()"   @click="Laborss">
                      Create a new folder, assign access to the list of users who want to access the folder  新建共享文件夹，分配用户权限 <br>
                      <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Please provide user list who would like to access the shared folder with dedicated access type (Read only / Write) in following User List form  请提供访问用户列表和权限在下面的表格中
                    </label>
                  </div>
                  <div class="radio" >
                    <label >
                      <input type="radio" name="optionsRadios3" v-model="form.requestFor" value="3" :disabled="check()" @click="Laborss">
                      Space Increase 增加空间
                    </label>
										</div>
										<div class="radio" >
                    	<label >
                      <input type="radio" name="optionsRadios4" v-model="form.requestFor" value="4" :disabled="check()" @click="Laborss" @change="setRecoveryTime">
                      Recovery shared folder 恢复文件夹
                    	</label>
										</div>
										<div class="radio" >
                    	<label>
                      <input type="radio" name="optionsRadios5" v-model="form.requestFor" value="5" :disabled="check()" @click="Laborss">
                      Others 其他
                    	</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="box-body" v-if="check()">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <div class="radio" v-if="check() && form.requestFor=='1'">
                    <label >

                      <input type="radio" name="optionsRadios1" v-model="form.requestFor" id="optionsRadios1" value="1" :readonly="check()">
                      Access shared folder with Read Only / Write permission 获得已有共享文件夹的“只读”或者“编辑”权限<br>
                      <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Please provide user list who would like to access the shared folder with dedicated access type (Read only / Write) in following User List for 请提供访问用户列表和权限在下面的表格中
                    </label>
                  </div>
                  <div class="radio" v-if="check() && form.requestFor=='2'">
                    <label>
                      <input type="radio" name="optionsRadios2" v-model="form.requestFor" value="2"   :readonly="check()">
                      Create a new folder, assign access to the list of users who want to access the folder  新建共享文件夹，分配用户权限 <br>
                      <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Please provide user list who would like to access the shared folder with dedicated access type (Read only / Write) in following User List form  请提供访问用户列表和权限在下面的表格中
                    </label>
                  </div>
                  <div class="radio" >
                    <label v-if="check() && form.requestFor=='3'">
                      <input type="radio" name="optionsRadios3" v-model="form.requestFor" value="3" :readonly="check()">
                      Space Increase 增加空间
                    </label>
									</div>
									<div class="radio" >
                    <label  v-if="check && form.requestFor=='4'">
                      <input type="radio" name="optionsRadios4" v-model="form.requestFor" value="4" :readonly="check()">
                      Recovery shared folder 恢复文件夹
                    </label>
										</div>
										<div class="radio" >
                    <label  v-if="check() && form.requestFor=='5'">
                      <input type="radio" name="optionsRadios5" v-model="form.requestFor" value="5" :readonly="check()">
                      Others 其他
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">User List 用户列表 </h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
                <p><i class="fa fa-asterisk text-red" style="font-size: 10px;"></i> Please list the employees who will access the shared folder with the access type.请提供访问用户列表和权限在下面的表格中。</p>
               <table class="table table-bordered" id="ShareFolderApplicationModify" v-if="form.requestFor=='1'">
                <tbody><tr>
                  <th>{{$t('ShareFolder.no')}}</th>
                  <th>{{$t('ShareFolder.folderPath')}}</th>
                  <th>{{$t('ShareFolder.folderOwner')}}</th>
                  <th>{{$t('ShareFolder.userName')}} - {{$t('ShareFolder.adAccount')}} - {{$t('ShareFolder.staffCode')}}</th>
                  <th>{{$t('ShareFolder.accessType')}}</th>
                  <th class="text-center" v-if="!check()"><a  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>
                </tr>
                <tr v-bind:key="index" v-for="(entry,index) in form.shareList">
			          	<td>{{ index+ 1}}</td>

                  <td>
                    <div class="input-group " style="float: left;width: 50%;">
                        <span class="input-group-btn"  v-if="!check()">
                        <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                        </button>
                        </span>
                        <input  type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathRoot') }" id="folderPathRoot" name="folderPathRoot" v-validate="'required'"  v-model="entry.folderPathRoot" placeholder="Folder Path"  readonly="" >
                    </div>
                    <input style="float: left;width: 50%;" type="text" class="form-control"  id="folderPathChild" name="folderPathChild" v-model="entry.folderPathChild" placeholder="please add detail folder if need"  :readonly="check()" @change="checkPath(index)">
                  </td>
                  <td width="15%">
										 <input type="hidden"   id="staffCode" name="staffCode" v-model="entry.staffcode"  >
                    <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" id="folderOwner" name="folderOwner"  v-validate="'required'"   v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"      readonly="" >
                  </td>
                  <td width="30%">
                    <div class="input-group "v-if="!check()">
                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('userDesc') }"  id="userDesc" name="userDesc"  v-validate="'required'"   v-model="entry.userDesc" placeholder="User Name 用户 - AD Account AD账号 - Staff Code 员工号"    readonly="" >
                        <span class="input-group-btn"  >
                            <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#personModal"><i class="fa fa-fw fa-search"></i>
                            </button>


                        </span>
                    </div>
                     <div class="input-group " v-else>
                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('userDesc') }"  v-model="entry.userDesc"  id="userDesc" name="userDesc"  v-validate="'required'"   placeholder="User Name 用户 - AD Account AD账号 - Staff Code 员工号"  readonly=""  style="width:380px;">

                    </div>
                  </td>
                  <td>
                     <div  v-if="!check()" class="radio" :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" style="margin-bottom: 5px;margin-top: 5px;">

                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" v-validate="'required'" v-model="entry.accessType" value="1">Read Only 只读</label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" v-validate="'required'" v-model="entry.accessType" value="2"> Read and Write 读和写</label>
                    </div>
                     <div class="radio" v-if="check()">
                      <label style="margin-right: 10px;" v-if="entry.accessType=='1'"><input type="radio" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" value="1" v-validate="'required'" v-model="entry.accessType" :readonly="check()">Read Only 只读</label>
                      <label style="margin-right: 10px;" v-if="entry.accessType=='2'"><input type="radio" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" value="2" v-validate="'required'" v-model="entry.accessType" :readonly="check()">Read and Write 读和写</label>
                    </div>
                  </td>
                  <td class="text-center" style="vertical-align: middle;" v-if="!check()" ><a href="javascript:;"  @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                </tr>

              </tbody>
              </table>



              <table id="ShareFolderApplicationCreate" class="table table-bordered" v-if="form.requestFor=='2'">
                <tbody><tr>
                 <th>{{$t('ShareFolder.no')}}</th>
                 <th>{{$t('ShareFolder.folderPath')}}</th>
                 <th>{{$t('ShareFolder.spaceSize')}}</th>
                 <th>{{$t('ShareFolder.folderOwner')}}</th>
								 <th>{{$t('ShareFolder.userName')}} - {{$t('ShareFolder.adAccount')}} - {{$t('ShareFolder.staffCode')}}</th>
                 <th>{{$t('ShareFolder.accessType')}}</th>
								<th class="text-center" v-if="!check()">{{$t('ShareFolder.add')}}<a v-if="form.shareList.length<1"  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>

									<!-- <th class="text-center"><a  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th> -->
                </tr>
                 <tr v-bind:key="index" v-for="(entry,index) in form.shareList">
			          	<td>{{ index+ 1}}</td>
                  <td>
                    <div class="input-group " style="float: left;width: 50%;">

                        <span class="input-group-btn" v-if="!check()">
                         <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                        </button>

                        </span>
                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathRoot') }" v-validate="'required'" id="folderPathRoot" name="folderPathRoot"  v-model="entry.folderPathRoot" placeholder="Folder Path"   :readonly="!(form.requestFor=='2')" @blur="changeRoot(entry.folderPathRoot,index)">
                    </div>
										 <input type="hidden"   id="staffCode" name="staffCode"    v-model="entry.staffcode"  >
                    <!-- <input type="hidden" id="folderOwner" name="folderOwner"  v-model="entry.folderOwner"  > -->
                    <input style="float: left;width: 50%;" type="text"  class="form-control" id="folderPathChild" name="folderPathChild"  v-model="entry.folderPathChild" placeholder="please add detail folder if need" :readonly="check()" @change="checkPath(index)">
                  </td>
                  <td>
                    <div class="radio" v-if="check()">
                      <label style="margin-right: 10px;" v-if="entry.spaceSize=='1'"><input type="radio" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-validate="'required'" v-model="entry.spaceSize" value="1" >1G </label>
                      <label style="margin-right: 10px;" v-if="entry.spaceSize=='2'"><input type="radio" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-validate="'required'" v-model="entry.spaceSize" value="2" >2G </label>
                      <label style="margin-right: 10px;" v-if="entry.spaceSize=='3'"><input type="radio" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-validate="'required'" v-model="entry.spaceSize" value="3" >5G </label>
                    </div>
                    <div   v-else class="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" style="margin-bottom: 5px;margin-top: 5px;" :blur="checkUn(index)">
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-validate="'required'" v-model="entry.spaceSize" value="1" >1G </label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-model="entry.spaceSize" v-validate="'required'" value="2" >2G </label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index"  v-model="entry.spaceSize" v-validate="'required'" value="3" >5G </label>
                    </div>
                  </td>
									<td>
										 	<input type="hidden"   id="staffCode" name="staffCode" v-model="entry.staffcode"  >
										 <div class="input-group " v-if="check()">
                     	<input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" id="folderOwner" name="folderOwner"  v-validate="'required'"   v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"      >
										</div>
										<div class="input-group "v-else>
											  <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" id="folderOwner" name="folderOwner"  v-validate="'required'"   v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"      >
												<span class="input-group-btn" >
                          <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#ownerModal"><i class="fa fa-fw fa-search"></i>
                          </button>
                        </span>
										</div>
								  </td>

                  <td>
                    <div class="input-group " v-if="check()">
                        <input type="text" class="form-control" v-model="entry.userDesc" name="userDesc" id="userDesc" v-validate="'required'"  placeholder="User Name 用户 - AD Account AD账号 - Staff Code 员工号" disabled style="width:380px;">
                    </div>
                    <div class="input-group "v-else>
                      <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('userDesc') }" v-model="entry.userDesc" placeholder="User Name 用户 - AD Account AD账号 - Staff Code 员工号"   name="userDesc" id="userDesc" v-validate="'required'"  readonly>
                        <span class="input-group-btn" >
                          <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#personModal"><i class="fa fa-fw fa-search"></i>
                          </button>
                        </span>
                    </div>
                  </td>
                  <td>
                   <div class="radio" v-if="check()" >
                      <label style="margin-right: 10px;"  v-if="entry.accessType=='1'"><input type="radio" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" v-model="entry.accessType" value="1" v-validate="'required'">Read Only 只读</label>
                      <label style="margin-right: 10px;"  v-if="entry.accessType=='2'"><input type="radio" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index" v-model="entry.accessType" value="2" v-validate="'required'"> Read and Write 读和写</label>
                    </div>
                    <div class="radio"  v-else   :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" style="margin-bottom: 5px;margin-top: 5px;">
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index"  v-model="entry.accessType" value="1" v-validate="'required'">Read Only 只读</label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosAccessType'+index) }" :name="'optionsRadiosAccessType'+index" :id="'optionsRadiosAccessType'+index"  v-model="entry.accessType" value="2" v-validate="'required'"> Read and Write 读和写</label>
                    </div>
                  </td>
                  <td class="text-center" style="white-space: nowrap;" v-if="!check()" >

										<a  href="javascript:;" class="btn btn-primary btn-xs" @click="insertItemRows(index)"><i class="fa fa-map-o"></i> Add Path</a>
										<a  href="javascript:;" class="mar-left-5 btn btn-primary btn-xs" @click="insertItemRowForCreate(index)"><i class="fa fa-user"></i> Add User</a>
										<a href="javascript:;" class="mar-left-5" @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a>

									</td>
                </tr>

              </tbody>
              </table>

              <table class="table table-bordered" id="ShareFolderApplicationSpaceIncrease" v-if="form.requestFor=='3'">
                <tbody><tr>
                    <th>{{$t('ShareFolder.no')}}</th>
                    <th>{{$t('ShareFolder.folderPath')}}</th>
                    <th>{{$t('ShareFolder.folderOwner')}}</th>
                    <th>{{$t('ShareFolder.increaseSize')}}</th>
                    <th class="text-center" v-if="!check()"><a  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>
                </tr>
                 <tr v-bind:key="index" v-for="(entry,index) in form.shareList">
			          	<td>{{ index+ 1}}</td>
                  <td>
                    <div class="input-group " style="float: left;width: 50%;">
                        <span class="input-group-btn" v-if="!check()" >
                         <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                        </button>

                        </span>

                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathRoot') }" v-validate="'required'" id="folderPathRoot" name="folderPathRoot" v-model="entry.folderPathRoot" placeholder="Folder Path"  readonly>
                    </div>
                    <input  maxlength="300"  style="float: left;width: 50%;" type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathChild') }"  id="folderPathChild" name="folderPathChild" v-model="entry.folderPathChild" placeholder="please add detail folder" :readonly="check()"  v-validate="'required'" @change="checkPath(index)">

                  </td>
                  <td>
									 <input type="hidden"   id="staffCode" name="staffCode"    v-model="entry.staffcode"  >

                    <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" v-validate="'required'" id="folderOwner" name="folderOwner"  v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"  readonly >
                  </td>
                   <td>
                    <div class="radio" v-if="check()">
                      <label style="margin-right: 10px;" v-if="entry.increaseSize=='1'"><input type="radio" v-validate="'required'" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-model="entry.increaseSize" value="1" >1G </label>
                      <label style="margin-right: 10px;" v-if="entry.increaseSize=='2'"><input type="radio" v-validate="'required'" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-model="entry.increaseSize" value="2" >2G </label>
                      <label style="margin-right: 10px;" v-if="entry.increaseSize=='3'"><input type="radio" v-validate="'required'" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-model="entry.increaseSize" value="3" >5G </label>
                    </div>
                    <div class="radio" v-else  :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" style="margin-bottom: 5px;margin-top: 5px;" >
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-validate="'required'" v-model="entry.increaseSize" value="1" >1G </label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-validate="'required'" v-model="entry.increaseSize" value="2" >2G </label>
                      <label style="margin-right: 10px;"><input type="radio" :class="{'is-danger': errors.has('optionsRadiosSpace'+index) }" :name="'optionsRadiosSpace'+index" :id="'optionsRadiosSpace'+index" v-validate="'required'" v-model="entry.increaseSize" value="3" >5G </label>
                    </div>
                  </td>
                  <td class="text-center" style="vertical-align: middle;" v-if="!check()" ><a href="javascript:;"  @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                </tr>

              </tbody>
              </table>

                <table class="table table-bordered" id="ShareFolderApplicationRecoveryOrOther" v-if="form.requestFor=='4'">
                	<tbody>
									<tr>
                    <th>{{$t('ShareFolder.no')}}</th>
                    <th>{{$t('ShareFolder.folderPath')}}</th>
                    <th>{{$t('ShareFolder.time')}}</th>
                  	<th>{{$t('ShareFolder.folderOwner')}}</th>

                  <th class="text-center" v-if="!check()"><a  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>
                </tr>
                 <tr v-bind:key="index" v-for="(entry,index) in form.shareList">
				          <td>{{ index+ 1}}</td>
                  <td>
                    <div class="input-group " style="float: left;width: 50%;">
                        <span class="input-group-btn">
                          <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                        </button>

                        </span>
                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathRoot') }" v-validate="'required'" id="folderPathRoot" name="folderPathRoot" v-model="entry.folderPathRoot" placeholder="Folder Path"  readonly>
                    </div>
                    <input  maxlength="300" style="float: left;width: 50%;" type="text"  id="folderPathChild"  v-validate="'required'" name="folderPathChild" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathChild') }" v-model="entry.folderPathChild" placeholder="please add file name or document name" :readonly="check()" @change="checkPath(index)">
                  </td>
                   <td>                    <input  style="float: left;width: 100%;" type="text"  :id="recoveryId(index)"  v-validate="'required'" :name="recoveryId(index)" :class="{'form-control':true,'input': true, 'is-danger': errors.has(recoveryId(index)) }" v-model="entry.recoveryTime" placeholder="please select recover time" :readonly="check()" readonly ></td>
                  <td>
										<input type="hidden"   id="staffCode" name="staffCode"    v-model="entry.staffcode"  >

                    <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" id="folderOwner" name="folderOwner" v-validate="'required'" v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"  readonly >
                  </td>

                  <td class="text-center" style="vertical-align: middle;" v-if="!check()"><a href="javascript:;"  @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                </tr>

              </tbody>
              </table>

							<table class="table table-bordered" id="ShareFolderApplicationRecoveryOrOther" v-if="form.requestFor=='5'">
                	<tbody>
									<tr>
                    <th>{{$t('ShareFolder.no')}}</th>
                    <th>{{$t('ShareFolder.folderPath')}}</th>
                  	<th>{{$t('ShareFolder.folderOwner')}}</th>
										<th>{{$t('ShareFolder.otherDesc')}}</th>

                  <th class="text-center" v-if="!check()"><a  href="javascript:;" @click="insertItemRows()"><i class="fa fa-plus-circle text-success" style="font-size: 20px"></i></a></th>
                </tr>
                 <tr v-bind:key="index" v-for="(entry,index) in form.shareList">
				          <td>{{ index+ 1}}</td>
                  <td>
                    <div class="input-group " style="float: left;width: 50%;">
                        <span class="input-group-btn">
                          <button class="btn btn-primary btn-flat" type="button" @click="setRowIndex(index)"  data-toggle="modal" data-target="#modal-default"><i class="fa fa-fw fa-search"></i>
                        </button>

                        </span>
                        <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderPathRoot') }" v-validate="'required'" id="folderPathRoot" name="folderPathRoot" v-model="entry.folderPathRoot" placeholder="Folder Path"  readonly>
                    </div>
                    <input style="float: left;width: 50%;" type="text"  id="folderPathChild" name="folderPathChild" class="form-control" v-model="entry.folderPathChild" placeholder="please add detail folder if need" :readonly="check()" @change="checkPath(index)">
                  </td>
                  <td>
									 <input type="hidden"   id="staffCode" name="staffCode"    v-model="entry.staffcode"  >

                    <input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('folderOwner') }" id="folderOwner" name="folderOwner" v-validate="'required'" v-model="entry.folderOwner" placeholder="Folder Owner 文件夹负责人"  readonly >
                  </td>
 									<td width="40%">
									<input type="text" :class="{'form-control':true,'input': true, 'is-danger': errors.has('otherDesc') }" id="otherDesc" name="otherDesc" v-validate="'required'" v-model="entry.otherDesc" placeholder="Other 其他"   :readonly="check()" >

                  </td>
                  <td class="text-center" style="vertical-align: middle;" v-if="!check()" ><a href="javascript:;"  @click="deleteItemRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
                </tr>

              </tbody>
              </table>


              </div>
            </div>
          </div>
        </div>

    <div class="box box-primary">
          <div class="box-header with-border">
					 <i class="fa fa-asterisk text-red" style="font-size: 10px;"></i>
            <h3 class="box-title">Reason 申请原因</h3>
          </div>
          <div class="box-body">
            <div class="row">
              <div class="col-md-12">
							 <form-group other-rules="required" haslable="false" type="textarea" :readonly="check()" id="reason" v-model="form.reason" name="reason"></form-group>


                <div class="checkbox" v-if="!check()">
                    <label>
                    <span class="help is-danger" v-show="errors.has('terms')">
									    {{$t("checkPolicyNotice")}}
							    	</span>
                      <input name="terms" v-validate="'required'" type="checkbox">When submitting the application, I have read and agreed to <a href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf" target="_blank">relevant policies of Volkswagen Automatic Transmission Tianjin. </a>当提交此申请时，我已经理解并承诺遵守<a href="http://vwatjportal.ap.vwg/upload/2016012213561261999.pdf">大众汽车自动变速器（天津）有限公司的相关政策。</a>
                    </label>
                </div>
              </div>
            </div>
          </div>
                <!-- /.box -->
                <comment v-if="processTaskId !=null &&form.status != 9" v-model="form.approval.approvalRemark"></comment>
        </div>






	    <router-view :form="form" entityId="ShareFolder" vclass="btn-left" uri="/form/ShareFolder/update" :validator="this.$validator" v-on:beforesubmit="beforesubmit" ></router-view>
    	<comment-list v-if="form.processInstanceId !=null"></comment-list>


      <div class="modal fade" id="modal-default">
			          <div class="modal-dialog">
			            <div class="modal-content">
			              <div class="modal-header">
			                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closemodal()">
			                  <span aria-hidden="true">&times;</span></button>
			                <h4 class="modal-title">Choose a Folder Path 请选择一个文件夹路径</h4>
			              </div>
			              <div class="modal-body">
			              	<div class="row">
				              	<div class="col-sm-12">
                        <form role="form-horizontal" style="background-color: #F1F5F8" onkeydown="if(event.keyCode==13)return false;">
															<div class="box-body">

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                  <label class="control-label pad-top-7">
                                                Folder Path
                                            </label>
																	<div>
																		<input type="text" id="folderName" class="form-control col-sm-4" style="width: 100%" placeholder="folderName">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3">
                                  <div>
																	<form-group  type="select2" uri="/FolderPathMGT/listforselect" :readonly="readonly" name="Attribute" v-model="form.attribute"></form-group>
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-3" style="padding-top: 23px;">

																	<div>
																		<button type="button" class="btn btn-primary btn-sm" @click="draw();">
																				<span class="fa fa-search">  </span>
																				&nbsp;&nbsp;Search
																		</button>
																	</div>
																</div>

														</div>
														</form>


				                 <table id="folder_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
                                  <th>Id</th>
																		<th>Folder Path</th>
																		<th>Owner</th>
																		<th>Attribute</th>
																		<th>select</th>

																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
				               </div>
				              </div>
			              </div>
			              <div class="modal-footer hidden">
			                <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
			                <button type="button" class="btn btn-primary">Save changes</button>
			              </div>
			            </div>
			            <!-- /.modal-content -->
			          </div>
			          <!-- /.modal-dialog -->
			        </div>
			        <!-- /.modal -->

      <!--  person modal-->
      <div class="modal fade" id="personModal" tabindex="-1" role="dialog" aria-labelledby="personModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closePersonmodal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="personModalLabel">Choose User</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<!-- Main content -->
						<section class="content" style="margin:0px;padding:0px;">
							<!-- Main row -->
							<div class="row" style="width:margin:0px;padding:0px;">
								<!-- Left col -->
								<div class="col-md-12" style="margin:0px;padding:0px;">
									<!-- table 2 start-->
									<div class="box box-primary1" style="margin:0px;padding:0px;">

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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class=" control-label pad-top-7">
                                                Staff Code
                                            </label>
																	<div>
																		<input type="text" id="Staffcode" class="form-control col-sm-4" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                EN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="ENName" style="width: 100%" placeholder="ENName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                CN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="CNName" style="width: 100%" placeholder="CNName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class="control-label pad-top-7">
                                               Email
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="Email" style="width: 100%" placeholder="Email">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;">
																	<button type="button" class="btn btn-primary btn-sm" @click="drawPerson();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
																</div>
															</div>
														</form>
														<table id="person_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code</th>
																	<th>EN Name</th>
																	<th>CN Name</th>
																	<th>Email</th>
																	<th>AD Account</th>
																	<th>Select</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
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


		<!--  owner modal-->
      <div class="modal fade" id="ownerModal" tabindex="-1" role="dialog" aria-labelledby="ownerModalLabel">
			<div class="modal-dialog modal-lg" role="document" style="width:80%;height:80%;">
				<div class="modal-content" style="width:100%;height:100%;overflow-y:auto;">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeOwnerModal()"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title" id="ownerModalLabel">Choose User</h4>
					</div>
					<div class="modal-body" style="width:96%;height:100%;margin:0px;padding:0px;margin-left:2%;">
						<!-- Main content -->
						<section class="content" style="margin:0px;padding:0px;">
							<!-- Main row -->
							<div class="row" style="width:margin:0px;padding:0px;">
								<!-- Left col -->
								<div class="col-md-12" style="margin:0px;padding:0px;">
									<!-- table 2 start-->
									<div class="box box-primary1" style="margin:0px;padding:0px;">

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
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class=" control-label pad-top-7">
                                                Staff Code
                                            </label>
																	<div>
																		<input type="text" id="Staffcodes" class="form-control col-sm-4" style="width: 100%" placeholder="Staffcode">
																	</div>
																</div>

																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                EN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="ENNames" style="width: 100%" placeholder="ENName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2">
																	<label class="control-label pad-top-7">
                                                CN Name
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="CNNames" style="width: 100%" placeholder="CNName">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-4">
																	<label class="control-label pad-top-7">
                                               Email
                                            </label>
																	<div>
																		<input type="text" class="form-control" id="Emails" style="width: 100%" placeholder="Email">
																	</div>
																</div>
																<div class="form-group col-xs-12 col-sm-12 col-md-6 col-lg-2" style="margin-top:20px;">
																	<button type="button" class="btn btn-primary btn-sm" @click="drawOwner();">
                                                <span class="fa fa-search">
                                                </span>
                                                &nbsp;&nbsp;Search
                                            </button>
																</div>
															</div>
														</form>
														<table id="owner_table" class="table table-bordered dataTable" role="grid" aria-describedby="example2_info" style="margin-top: 20px;">
															<thead>
																<tr role="row" style="height:20px;width:100%;">
																	<th>Staff Code</th>
																	<th>EN Name</th>
																	<th>CN Name</th>
																	<th>Email</th>
																	<th>AD Account</th>
																	<th>Select</th>
																</tr>
															</thead>
															<tbody>
															</tbody>
														</table>
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





    </section>
    <!-- /.content -->
</div>
<!-- ./wrapper -->
</template>
			<modaldialog :vclass="vclass"></modaldialog>
<script>
  Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
  };
import global_ from './../../../components/Common/Util/Global.vue'
  var rowId=0;
  var currentIndex=0;
	export default {
		name: 'ShareFolder',

		methods:{

		  recoveryId:function(index){
		    return "recoveryTime_"+index;
      },
      setRecoveryTimeValue:function(index,val){
		    this.form.shareList[index].recoveryTime=val;
      },
      setRecoveryTime:function(){

        this.$nextTick(function(){
          for(var index=0;index<this.form.shareList.length;index++){
            var dm=this;
            $("#recoveryTime_"+index).daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: true,
                timePicker24Hour : true,
                timePicker : true,
              maxDate:new Date(),
                "locale": {
                  format: 'MM/DD/YYYY HH:mm:ss'
                }
              }).on('apply.daterangepicker', function(ev, picker) {
                // $("#"+ev.target.id).val(picker.startDate.format('YYYY-MM-DD HH:mm:ss'));
                  dm.setRecoveryTimeValue(ev.target.id.replace("recoveryTime_",""),picker.startDate.format('MM/DD/YYYY HH:mm:ss'));
            });
          }

        })
      },
			beforesubmit:function(){

				for(let i=0;i<this.form.shareList.length;i++){
					for(let j=i+1;j<this.form.shareList.length;j++){
						if(this.form.shareList[i].folderPathRoot==this.form.shareList[j].folderPathRoot && this.form.shareList[i].folderOwner!=this.form.shareList[j].folderOwner){
							$.alert(" Same first level catalog should be same folder owner.同一个一级目录需要指定同一个文件负责人");

							this.form.submitstatus=false;
							return;
							}else{
								this.form.submitstatus=true;
							}
						}
					}
				},


			closemodal: function() {
        var newId="folder_table_"+rowId;
        $("#folderName").val("");
        $("#"+newId).DataTable().draw();
      },
    changeRoot: function(id,index) {

			var reg=/^[\.A-Za-z0-9_\\\\\s]+$/;
			if(!reg.test(id)){
				$.alert("Only number, english chart,underlines ,dot and '\\' is allowed for folder path.文件夹只能输入字母，数字，下划线，标点符号点和反斜杠。 ");
				this.form.shareList[index].folderPathRoot="";
			}else{
				var ownerwrite;
				id = id.replace(/\\/g,"---")
				//id=id.replace("\\","---");
				//console.log(id);
				if(id!=null && id!=""){
				//	console.log(22222);
						global_.actUtil.query("get", "/FolderPathMGT/checkRootPath/"+ id, "", function(data) {
					var da = JSON.parse(data);
							if(da.obj!=null){
								ownerwrite=da.obj.folderOwner;
							}else{
								ownerwrite=null;
							}

						//	console.log(data);
						});
				this.form.shareList[index].folderOwner=ownerwrite;
				}
			}


		},

			closePersonmodal: function() {
        var personId="person_table_"+rowId;
        $("#Staffcode").val("");
        $("#ENName").val("");
        $("#CNName").val("");
        $("#Email").val("");
        $("#"+personId).DataTable().draw();
      },
			closeOwnerModal: function() {

        $("#Staffcodes").val("");
        $("#ENNames").val("");
        $("#CNNames").val("");
        $("#Emails").val("");
        $("#owner_table").DataTable().draw();
      },
			check:function(){

				return ((this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit')==-1)||(this.form.processInstanceId !=null && this.form.status != null && this.form.status != 2 && this.form.status != 9));
			},
			checkPath:function(row){
			  var path=this.form.shareList[row].folderPathChild;
			  var reg=/^[\.A-Za-z0-9_\\\\\s]+$/;
				if(!reg.test(path)){
					$.alert("Only number, english chart,underlines ,dot and '\\' is allowed for folder path.文件夹只能输入字母，数字，下划线，标点符号点和反斜杠。 ");
					this.form.shareList[row].folderPathChild="";
				}else{
					//修改文件夹 或者新增文件夹 判断文件夹路径和用户唯一性
					if(this.form.requestFor==1||this.form.requestFor==2){
							var folderPathRoot=this.form.shareList[row].folderPathRoot;
							var folderChild=this.form.shareList[row].folderPathChild;
							var userDes=this.form.shareList[row].userDesc;
							var len=this.form.shareList.length;
							if(folderPathRoot!=""&&folderChild!=""&&userDes!=""){
									var num=0;
									for(var m=0;m<len;m++){
										var folderPathRoot1=this.form.shareList[m].folderPathRoot;
										var folderChild1=this.form.shareList[m].folderPathChild;
										var userDes1=this.form.shareList[m].userDesc;
										if(folderPathRoot1!=""&&folderChild1!=""&&userDes1!=""){
												if(folderPathRoot==folderPathRoot1&&folderChild==folderChild1&&userDes==userDes1){
													 num+=1;

												}

										}
									}
									if(num>1){
											$.alert("User can be adding for the same folder path only once. 同一个用户对同一个文件夹只能添加一次。");
											this.form.shareList[row].folderPathChild="";

									}
							}
							if(this.form.requestFor==2){
							var folderPathRoot=this.form.shareList[row].folderPathRoot;
							var folderPathChild=this.form.shareList[row].folderPathChild;
							var spaceSize=this.form.shareList[row].spaceSize;
							var len=this.form.shareList.length;
							if(folderPathRoot!=""&&folderPathChild!=""&&spaceSize!=""){
									for(var i=0;i<len;i++){
										var folderPathRoot1=this.form.shareList[i].folderPathRoot;
										var folderPathChild1=this.form.shareList[i].folderPathChild;
										var spaceSize1=this.form.shareList[i].spaceSize;
										if(folderPathRoot1!=""&&folderPathChild1!=""&&spaceSize1!=""){
												if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1&&spaceSize!=spaceSize1){
															$.alert("The same folder path（both first level and sub level） should be same space size.同一个文件夹应该选择相同的容量。");
														this.form.shareList[i].spaceSize="";
														break;
												}

										}
									}
							}
						}

					}
					if(this.form.requestFor==3||this.form.requestFor==4||this.form.requestFor==5){

						var folderPathRoot=this.form.shareList[row].folderPathRoot;
						var folderPathChild=this.form.shareList[row].folderPathChild;
						var userDes=this.form.shareList[row].userDesc;
						var folderOwner=this.form.shareList[row].folderOwner;
						var len=this.form.shareList.length;
						var b=true;

						if(folderPathRoot!=""&&folderPathChild!=""){
							 var num=0;
								for(var i=0;i<len;i++){
									var folderPathRoot1=this.form.shareList[i].folderPathRoot;
									var folderPathChild1=this.form.shareList[i].folderPathChild;

									if(folderPathRoot1!=""&&folderPathChild1!=""){

											if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1){
												num+=1;
											}

									}
								}

								if(num>1){
											$.alert("The same folder path（both first level and sub level） should be adding only once.同一个文件夹应该只能添加一次。");
										this.form.shareList[row].folderPathChild="";


								}
						}


					}


				}

			},
      setRowIndex:function(rIndex){
        rowId=rIndex;
				var newId="folder_table_"+rowId;
				$("#folder_table").attr("id",newId);
        var personId="person_table_"+rowId;
        $("#person_table").attr("id",personId);
      },
      draw: function() {
				var newId="folder_table_"+rowId;
				$("#folder_table").attr("id",newId);
				// $("#"+newId).DataTable().draw();
        $("#folder_table_0").DataTable().draw();
			},
      retrieveData: function(url, aoData, fnCallback) {
				var folderName = $("#folderName").val();
				var attribute  =this.form.attribute;
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
					  "type":this.form.requestFor,
						"aoData": JSON.stringify(aoData),
						"folderName": folderName,
						"attribute" : attribute
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						//console.log(data);
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
      //person modal

      drawPerson: function() {
         var personId="person_table_"+rowId;
        $("#person_table").attr("id",personId);
				$("#person_table_0").DataTable().draw();

			},
      retrievePersonData: function(url, aoData, fnCallback) {

				var staffcode = $("#Staffcode").val();

				var enname = $("#ENName").val();
				var cnname = $("#CNName").val();
				var email = $("#Email").val();
				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"printENName": enname,
						"printCNName": cnname,
						"email": email
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
							$.alert(msg.responseText);
					}
				});
			},
	 //owner modal

      drawOwner: function() {

				$("#owner_table").DataTable().draw();

			},
      retrieveOwnerData: function(url, aoData, fnCallback) {

				var staffcode = $("#Staffcodes").val();

				var enname = $("#ENNames").val();
				var cnname = $("#CNNames").val();
				var email = $("#Emails").val();

				$.ajax({
					url: url, //这个就是请求地址对应sAjaxSource
					data: {
						"aoData": JSON.stringify(aoData),
						"staffCode": staffcode,
						"printENName": enname,
						"printCNName": cnname,
						"email": email
					}, //这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
					type: 'get',
					dataType: 'json',
					success: function(data) {
						fnCallback(data); //把返回的数据传给这个方法就可以了,datatable会自动绑定数据的
					},
					error: function(msg) {
							$.alert(msg.responseText);
					}
				});
			},




		checkUn: function(index) {
			if(this.form.requestFor==2){
				var folderPathRoot=this.form.shareList[index].folderPathRoot;
				var folderPathChild=this.form.shareList[index].folderPathChild;
				var spaceSize=this.form.shareList[index].spaceSize;
				var len=this.form.shareList.length;
				if(folderPathRoot!=""&&folderPathChild!=""&&spaceSize!=""){
						for(var i=0;i<len;i++){
							var folderPathRoot1=this.form.shareList[i].folderPathRoot;
							var folderPathChild1=this.form.shareList[i].folderPathChild;
							var spaceSize1=this.form.shareList[i].spaceSize;
							if(folderPathRoot1!=""&&folderPathChild1!=""&&spaceSize1!=""){
									if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1&&spaceSize!=spaceSize1){
												$.alert("The same folder path（both first level and sub level） should be same space size.同一个文件夹应该选择相同的容量。");
											this.form.shareList[i].spaceSize="";
											break;
									}

							}
						}
				}
			}
		},

      onbehalfclick: function() {
						var temp = $("#onbehalf").is(':checked');
						this.onbehalf = temp;
           if(temp==true){
              this.form.isOnbehalf="1";
           }else{
              this.form.isOnbehalf="0";
							this.form.applicantUserId=this.tempcreateUserId;
							this.form.creatorStaffcode=this.tempcreatorStaffcode;
							this.form.creatorName=this.tempcreatorName;
							this.form.creatorPhoneNum=this.tempcreatorPhoneNum;
							this.form.creatorDept=this.tempcreatorDept;

           }
			},

			doAfterSelectOtherPerson:function(data){
				$('#selectotherperson').attr("class","input-group-btn");

			  this.form.applicantUserId = data.id;
				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName=data.printENName;
				this.form.creatorPhoneNum=data.mobile;
				this.form.creatorDept=data.department;

			},
     afterChooseFolder:function(data,index){

        this.form.shareList[index].folderPathRoot=data.folderName;
        this.form.shareList[index].folderOwner=data.folderOwner;
				this.form.shareList[index].staffcode=data.staffCode;

				var requestFor=this.form.requestFor;
				if(requestFor==1){
						var folderPathRoot=this.form.shareList[index].folderPathRoot;
						var folderChild=this.form.shareList[index].folderPathChild;
						var userDes=this.form.shareList[index].userDesc;
						var folderOwner=this.form.shareList[index].staffcode;
						var len=this.form.shareList.length;
						var b=true;
						for(var m=0;m<len;m++){
							var folderOwner1=this.form.shareList[m].staffcode;
							if(folderOwner1!=""){
								if(folderOwner!=folderOwner1){
											$.alert("Please select folder path that owned to one person.请选择同一位文件管理员名下的文件夹。");
										this.form.shareList[index].folderPathRoot="";
										this.form.shareList[index].folderOwner="";
										this.form.shareList[index].staffcode="";
										b=false;
								}
							}
						}
						//判断文件夹路径和用户唯一性
						if(b){
								if(folderPathRoot!=""&&folderChild!=""&&userDes!=""){
									var num=0;
									for(var m=0;m<len;m++){
										var folderPathRoot1=this.form.shareList[m].folderPathRoot;
										var folderChild1=this.form.shareList[m].folderPathChild;
										var userDes1=this.form.shareList[m].userDesc;
										if(folderPathRoot1!=""&&folderChild1!=""&&userDes1!=""){
												if(folderPathRoot==folderPathRoot1&&folderChild==folderChild1&&userDes==userDes1){
													 num+=1;
												}
										}
									}
									if(num>1){
												$.alert("User can be adding for the same folder path only once. 同一个用户对同一个文件夹只能添加一次。");
											this.form.shareList[index].folderPathRoot="";
											this.form.shareList[index].folderOwner="";
											this.form.shareList[index].staffcode="";
											b=false;
									}
							}
						}
				}


				// 同一个文件夹应该选择相同的容量
				if(requestFor==2){
					var folderPathRoot=this.form.shareList[index].folderPathRoot;
					var folderPathChild=this.form.shareList[index].folderPathChild;
					var spaceSize=this.form.shareList[index].spaceSize;
					var userDes=this.form.shareList[index].userDesc;
					var len=this.form.shareList.length;
					var b=true;
					if(folderPathRoot!=""&&folderPathChild!=""&&spaceSize!=""){
							for(var i=0;i<len;i++){
								var folderPathRoot1=this.form.shareList[i].folderPathRoot;
								var folderPathChild1=this.form.shareList[i].folderPathChild;
								var spaceSize1=this.form.shareList[i].spaceSize;
								if(folderPathRoot1!=""&&folderPathChild1!=""&&spaceSize1!=""){
										if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1&&spaceSize!=spaceSize1){
													$.alert("The same folder path（both first level and sub level） should be same space size.同一个文件夹应该选择相同的容量。");
												this.form.shareList[index].folderPathRoot="";
												this.form.shareList[index].folderOwner="";
												this.form.shareList[index].staffcode="";
												b=false;
												break;
										}

								}
							}
					}
					//同一个用户对同一个文件夹只能添加一次
					if(b){
							if(folderPathRoot!=""&&folderPathChild!=""&&userDes!=""){
									var num=0;
									for(var m=0;m<len;m++){
										var folderPathRoot1=this.form.shareList[m].folderPathRoot;
										var folderPathChild1=this.form.shareList[m].folderPathChild;
										var userDes1=this.form.shareList[m].userDesc;
										if(folderPathRoot1!=""&&folderPathChild1!=""&&userDes1!=""){
												if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1&&userDes==userDes1){
													 num+=1;
												}
										}
									}
									if(num>1){
												$.alert("User can be adding for the same folder path only once. 同一个用户对同一个文件夹只能添加一次。");
												this.form.shareList[index].folderPathRoot="";
												this.form.shareList[index].folderOwner="";
												this.form.shareList[index].staffcode="";
												b=false;
									}
							}
					}
				}



				if(requestFor==3||requestFor==4){
						var folderPathRoot=this.form.shareList[index].folderPathRoot;
						var folderPathChild=this.form.shareList[index].folderPathChild;
						var len=this.form.shareList.length;
						if(folderPathRoot!=""&&folderPathChild!=""){
								var num=0;
								for(var i=0;i<len;i++){
									var folderPathRoot1=this.form.shareList[i].folderPathRoot;
									var folderPathChild1=this.form.shareList[i].folderPathChild;
									if(folderPathRoot1!=""&&folderPathChild1!=""){
											if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1){
												num+=1;

											}

									}
								}
								if(num>1){
											$.alert("The same folder path（both first level and sub level） should be adding only once.同一个文件夹应该只能添加一次。");
										this.form.shareList[index].folderPathRoot="";
										this.form.shareList[index].folderOwner="";
										this.form.shareList[index].staffcode="";

								}
						}
				}

				if(requestFor==5){
						var folderPathRoot=this.form.shareList[index].folderPathRoot;
						var folderPathChild=this.form.shareList[index].folderPathChild;
						var userDes=this.form.shareList[index].userDesc;
						var folderOwner=this.form.shareList[index].staffcode;
						var len=this.form.shareList.length;
						var b=true;
						for(var m=0;m<len;m++){
							var folderOwner1=this.form.shareList[m].staffcode;
							if(folderOwner1!=""){
								if(folderOwner!=folderOwner1){
											$.alert("Please select folder path that owned to one person.请选择同一位文件管理员名下的文件夹。");
										this.form.shareList[index].folderPathRoot="";
										this.form.shareList[index].folderOwner="";
										this.form.shareList[index].staffcode="";
										b=false;
								}
							}
						}
					if(b){
						 if(folderPathRoot!=""&&folderPathChild!=""){
							 var num=0;
								for(var i=0;i<len;i++){
									var folderPathRoot1=this.form.shareList[i].folderPathRoot;
									var folderPathChild1=this.form.shareList[i].folderPathChild;
									if(folderPathRoot1!=""&&folderPathChild1!=""){
											if(folderPathRoot==folderPathRoot1&&folderPathChild==folderPathChild1){
												num+=1;
											}

									}
								}
								if(num>1){
											$.alert("The same folder path（both first level and sub level） should be adding only once.同一个文件夹应该只能添加一次。");
										this.form.shareList[index].folderPathRoot="";
										this.form.shareList[index].folderOwner="";
										this.form.shareList[index].staffcode="";

								}
						}
					}
				}
 		},
     setUserAd:function(data){

			 if(rowId==-1){
				$('#selectotherperson').attr("class","input-group-btn");

				this.form.applicantUserId = data.id;
				this.form.creatorStaffcode = data.staffCode;
				this.form.creatorName=data.printENName;
				this.form.creatorPhoneNum=data.mobile;
         if(data.department==""){
           this.form.creatorDept=data.department;
         }else{
           this.form.creatorDept=data.division;
         }

			 }else{
       var userDes=data.printENName+"-"+data.screenName+"-"+data.staffCode;

       this.form.shareList[rowId].userDesc=userDes;
				//同一个用户对同一个文件夹只能添加一次
					//修改文件夹 或者新增文件夹 判断文件夹路径和用户唯一性
					if(this.form.requestFor==1||this.form.requestFor==2){
							var folderPathRoot=this.form.shareList[rowId].folderPathRoot;
							var folderChild=this.form.shareList[rowId].folderPathChild;
							var userDes=this.form.shareList[rowId].userDesc;
							var len=this.form.shareList.length;
							if(folderPathRoot!=""&&folderChild!=""&&userDes!=""){
									var num=0;
									for(var m=0;m<len;m++){
										var folderPathRoot1=this.form.shareList[m].folderPathRoot;
										var folderChild1=this.form.shareList[m].folderPathChild;
										var userDes1=this.form.shareList[m].userDesc;
										if(folderPathRoot1!=""&&folderChild1!=""&&userDes1!=""){
												if(folderPathRoot==folderPathRoot1&&folderChild==folderChild1&&userDes==userDes1){
													 num+=1;

												}

										}
									}
									if(num>1){
												$.alert("User can be adding for the same folder path only once. 同一个用户对同一个文件夹只能添加一次。");
											this.form.shareList[rowId].userDesc="";

									}
							}
					}
					}
     },

		setOwner:function(data){
			 this.form.shareList[rowId].folderOwner=data.email;

		},


			Laborss: function(){
       var newItem ={};
        for(var key in this.form.shareList[0]) {

           newItem[key] = "";
				 }
				 this.form.shareList=[];
         this.form.shareList.push(newItem);
				this.form.reason="";
        this.$nextTick(function(){

            var newId="folder_table_"+rowId;
            $("#folderName").val("");
            $("#"+newId).DataTable().draw();

        })

      },
			//表格行添加调用方法
	    	insertItemRows:function(){
	    		var newItem = {};
					//console.log(this.form.shareList[0]);
	    		for(var key in this.form.shareList[0]){
	    			newItem[key] = "";
					}
				this.form.shareList.push(newItem);
          this.setRecoveryTime();
	    	},
				//表格行添加调用方法(for create)
	    	insertItemRowForCreate:function(index){
	    		var newItem = {};
					//console.log(this.form.shareList[index]);
	    		for(var key in this.form.shareList[index]){
	    			newItem[key] = this.form.shareList[index][key];

					}
						 newItem.accessType="";
						 newItem.userDesc="";
				this.form.shareList.push(newItem);
	    	},
	    	//表格行删除调用方法
	    	deleteItemRows:function(rowId){
          if(this.form.shareList.length > 1) {
            this.form.shareList.splice(rowId, 1);
            this.setRecoveryTime();
          } else {
            $.alert("At least one complete record is needed. 至少需要填写一条完整信息。");
          }
	    	},
	    	//表格内组件检查调用方法
	    	checkOther:function(data){
	    		//console.log("this is check");
	    	}

		},
		data(){
			//返回的数据对象
			var dm = {};
			//判断是创建还是获取
			var id = this.$route.params.id || this.$route.query.id;
			if(id){
				var url = "/form//ShareFolder/get/"+id;
			}else{
				var url = "/form//ShareFolder/create/";
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
      // console.log(dm);
      for(var index=0;index<dm.form.shareList.length;index++){
			 // console.log((dm.form.shareList[index].recoveryTime));
			  if((dm.form.shareList[index].recoveryTime)&&dm.form.shareList[index].recoveryTime!=""){
          dm.form.shareList[index].recoveryTime=(new Date(dm.form.shareList[index].recoveryTime)).Format("MM/dd/yyyy hh:mm:ss");
         // console.log( dm.form.shareList[index].recoveryTime);
        }
      }

    dm.onbehalf = false;

				dm.tempcreateUserId=dm.form.applicantUserId;
				dm.tempcreatorStaffcode=dm.form.creatorStaffcode;
				dm.tempcreatorName=dm.form.creatorName;
				dm.tempcreatorPhoneNum=dm.form.creatorPhoneNum;
				dm.tempcreatorDept=dm.form.creatorDept;
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
			processTaskId: {
				// 动态计算processTaskId的值
				get:function() {

					return this.$route.query.taskId;
				}
			},
			processTaskKey:{
				// 动态计算processTaskKey的值
				get:function() {
					return this.$route.query.taskKey;
				}
			},
      readonly: {
				// 动态计算readonly的值
				get: function() {
					return(this.$route.query.taskKey != null && this.$route.query.taskKey.indexOf('edit') == -1) || (this.form.processInstanceId != null && this.form.status != null && this.form.status != 2 && this.form.status != 9);
				}
			},
			applicationTime: {
				get: function() {
					var parts = this.form.createDate.match(/\d+/g);
					return parts[0] + '-' + parts[1] + '-' + parts[2];
				}
			}
		},
		mounted(){
      var queryData = this.retrieveData;
			var afterChooseFolder = this.afterChooseFolder;
			var newId="folder_table_"+rowId;
			var form=this.form;
			$("#folder_table").attr("id",newId);
			newId="#"+newId;
			var draw = this.draw;
			var table = $(newId).DataTable({
				"fnServerData": queryData,
        "sAjaxSource": Config.getBaseURL() + "/FolderPathMGT/chooseFolder",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [2,3,4]
				}],
				"aaSorting": [
					[1, "asc"]
				], //给列表排序
				columns: [

          {data: "id"},
					{data: "folderName"},
					{data: "folderOwner"},
					{data: "attribute"},
          {data: null} ,
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
          $('td:eq(0)', row).html(data.id);
					$('td:eq(1)', row).html(data.folderName);
					$('td:eq(2)', row).html(data.folderOwner);
					$('td:eq(3)', row).html(data.attribute);
          $('td:eq(4)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm folder-detail"> select</button>');

					return row;
				}
			});
			var router = this.$router;
 			$(newId+' tbody').on('click', '.folder-detail', function() {
				var row = $(this).parents("tr");
				var data = table.row(row).data();

			  afterChooseFolder(data,rowId);

			});
      //this.form.attribute='请选择';
      var queryPersonData = this.retrievePersonData;
			var setUserAd = this.setUserAd;
			var drawPerson = this.drawPerson;
    	var newPersonId="person_table_"+rowId;

			$("#person_table").attr("id",newPersonId);
			newPersonId="#"+newPersonId;

			var tablePerson = $(newPersonId).DataTable({
				"fnServerData": queryPersonData,
				"sAjaxSource": Config.getBaseURL() + "/chooseuserinfo/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [5]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "staffCode"
					},
					{
						data: "printENName"
					},
					{
						data: "printCNName"
					},
					{
						data: "email"
					},
					{
						data: "screenName"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(5)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});


			$(newPersonId+' tbody').on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = tablePerson.row(row).data();
				setUserAd(data);
			});


		  var queryOwnerData = this.retrieveOwnerData;
			var setOwner = this.setOwner;
			var drawOwner = this.drawOwner;
			var tableOwner = $("#owner_table").DataTable({
				"fnServerData": queryOwnerData,
				"sAjaxSource": Config.getBaseURL() + "/chooseuserinfo/list",
				"serverSide": true,
				"filter": false,
				"lengthChange": false,
				"aoColumnDefs": [{
					"bSortable": false,
					"aTargets": [5]
				}],
				"aaSorting": [
					[0, "desc"]
				], //给列表排序
				columns: [{
						data: "staffCode"
					},
					{
						data: "printENName"
					},
					{
						data: "printCNName"
					},
					{
						data: "email"
					},
					{
						data: "screenName"
					},
					{
						data: null
					}
				],
				"fnRowCallback": function(row, data, index) { //设置列从0开始
					//$('td:eq(0)', row).html(data.id);
					//$('td:eq(1)', row).html(data.printENName);
					//$('td:eq(2)', row).html(data.printCNName);
					//$('td:eq(3)', row).html( data.email);
					$('td:eq(5)', row).html('<button type="button" data-dismiss="modal" style="margin-left: 10px;" class="btn btn-primary btn-sm task-detail"> select</button>');

					return row;
				}
			});


			$('#owner_table tbody').on('click', '.task-detail', function() {
				var row = $(this).parents("tr");
				var data = tableOwner.row(row).data();
				setOwner(data);
			});







	this.$root.eventHub.$off('updateFormData');
			this.$root.eventHub.$on('updateFormData', (form)=>{
				this.form = form;
			});
		}
	}
</script>
