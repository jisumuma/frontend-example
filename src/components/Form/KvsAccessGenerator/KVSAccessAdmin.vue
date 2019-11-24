<template>
	<div>
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
								<i class="fa fa-list-alt"></i> &nbsp;KVS Account Admin</h3>
						</div>
						<form role="form">
							<div class="box-body">
								<table class="table table-bordered mar-bot-0">
									<tbody>
										<tr>
											<th class="kvsTr" rowspan="2">No.</th>
											<th class="kvsTr" rowspan="2" width="300px">Bereich</th>
                      <th class="kvsTr" rowspan="2" width="200px">CostCenterCode</th>
											<th class="kvsTr" colspan="2">China</th>
											<th class="kvsTr" rowspan="2"></th>
											<th class="kvsTr" colspan="2">Deutschland</th>
                      <th class="kvsTr" rowspan="2"></th>
											<th></th>
										</tr>
										<tr>
											<th class="kvsTr"> Name</th>
											<th class="kvsTr"> Email Address</th>
											<th class="kvsTr"> Name</th>
											<th class="kvsTr"> Email Address</th>
										</tr>
										<tr v-bind:key="index" v-for="(entry,index) in form">
											<td>{{ index+ 1}}</td>
											<td><input type="hidden" class="form-control" id="" v-model="entry.id">
												<input type="text"  v-validate="'required'"  v-model="entry.bereich" :class="{'form-control':true ,'input':true, 'is-danger':checkBlank(entry.bereich)} ">
											</td>
                      <td width="180px">
                        <input type="text"  v-model="entry.costCenterCode" :class="{'form-control':true ,'input':true, 'is-danger':checkBlank(entry.costCenterCode)} ">
                      </td>
											<td width="180px">
												<input type="text"  v-model="entry.kvsAccessConfigCN.name" :class="{'form-control':true ,'input':true, 'is-danger':checkBlank(entry.kvsAccessConfigCN.name)} ">
											</td>
											<td>
												<input type="text"  v-model="entry.kvsAccessConfigCN.email" :class="{'form-control':true ,'input':true, 'is-danger':checkBlank(entry.kvsAccessConfigCN.email)} ">
											</td>
											<td @click="changeKvs(index)">
												<ChooseOtherPerson  :chooseID="'person_tableKVS'+index" :vclass="'btn btn-primary btn-flat'" v-on:callbackfunction="doAfterSelectOtherPerson">
                          <i class="fa fa-fw fa-search"></i>
                        </ChooseOtherPerson>
											</td>
											<td width="180px">
												<input type="text"  v-model="entry.kvsAccessConfigDH.name" :class="{'form-control':true ,'input':true} ">
											</td>
											<td>
												<input type="text"  v-model="entry.kvsAccessConfigDH.email" :class="{'form-control':true ,'input':true} ">
											</td>
                      <td>	<a href="javascript:;" @click="deleteItineraryRows(index)"><i class="fa fa-minus-circle text-danger" style="font-size: 20px"></i></a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</form>
					</div>
						<div class="form-group" >
							<button type="button" class="btn btn-primary pull-left" @click="editProject">save</button>
              &nbsp &nbsp <button type="button" class="btn btn-primary " @click="add">add</button>
							&nbsp &nbsp <button type="button" class="btn btn-danger" @click="cancel">cancel</button>
						</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>

export default {
  name: "KVSAccessAdmin",
  props: [],
  methods: {
    changeTableCol: function(key) {
      return this.$t(key);
      /*return key;*/
		},
		cancel:function(){
			 var dm = {};
			var url = "/KvsAccessGenerator/createConfig";
			if (this.GL) {
				this.GL.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			} else {
				global_.actUtil.query("get", url, "", function(data) {
					dm = JSON.parse(data);
				});
			}
			// console.log(dm.form);
			this.form = dm.form;
			dm.kvslength=undefined;
        $.alert(
          "All changes for ITKVS authorized signatories will not be saved, 全部修改内容不会保存。"
        );
		},
		changeKvs:function(index){
			this.kvslength = index;
		},
		doAfterSelectOtherPerson:function(data){
			// console.log(data);
			this.form[this.kvslength].kvsAccessConfigCN.name  = data.printENName;
			this.form[this.kvslength].kvsAccessConfigCN.email  = data.email;
			// console.log(n);
		},
    add:function(){
      // console.log(111);
      // form.push();
      var newItem = {};
      var newCN={};
      var newDH={};
      for(var key in this.form[0]) {
        newItem[key] = "";
      }
      for(var key in this.form[0].kvsAccessConfigCN){
        newCN[key]="";
      }
      for(var key in this.form[0].kvsAccessConfigDH){
        newDH[key]="";
      }
      newCN['location']="CHINA";
      newCN['organisation']="VMATJ";
      newDH['location']="GERMANY";
      newDH['organisation']="VMATJ";
      newItem.kvsAccessConfigCN=newCN;
      newItem.kvsAccessConfigDH=newDH;
      this.form.push(newItem);
    },
    deleteItineraryRows:function(index){
      Array.prototype.remove=function(dx)
      {
        if(isNaN(dx)||dx>this.length){return false;}
        for(var i=0,n=0;i<this.length;i++)
        {
          if(this[i]!=this[dx])
          {
            this[n++]=this[i]
          }
        }
        this.length-=1
      };
      console.log(index);
      this.form.remove(index);
      // if(isNaN(index)||index>this.form.length){return false;}
      // for(var i=0,n=0;i<this.form.length;i++)
      // {
      //   if(this.form[i]!=this.form[index])
      //   {
      //     this[n++]=this[i];
      //   }
      // }
      // this.form.length-=1;
      this.$forceUpdate();
      // console.log( this.form);
    },
    checkBlank:function(a){
      if(!a){
        return true;
      }else{
        return false;
      }
    },
    checkEntity:function(object){

      for(var key in object){

        if(key=='id'){
          continue;
        }

        if(object[key]==''){
          console.log("key:"+key+"value:"+object[key]);
          console.log(object[key]=='');
          return true;
        }
      }
      return false;
    },
    check:function(){

      for(var entity in this.form){

       if(this.checkEntity(this.form[entity])){
         return true;

       }

       if(!this.form[entity].bereich){
         continue;
       }
        this.form[entity].kvsAccessConfigCN['bereich']=this.form[entity].bereich;
        this.form[entity].kvsAccessConfigDH['bereich']=this.form[entity].bereich;
        if(this.checkEntity(this.form[entity].kvsAccessConfigCN)){
          return true;
        }
        // if(this.checkEntity(this.form[entity].kvsAccessConfigDH)){
        //   return true;
        // }
      }
      return false;
    },
    editProject: function() {
      if(this.check()){
        alert("请填写所有红色的输入框!");
        return;
      }
			let form = this.form;
			var project = JSON.stringify(this.form);
			// console.log(project);
			$.ajax({
				url: Config.getBaseURL() + "/KvsAccessGenerator/save", //这个就是请求地址对应sAjaxSource
				data: "form="+project,
				type: "post",
				dataType: "json",
				success: function(data) {

					$.alert("Update successfully!更新成功！");
          window.location.reload();
          // this.data();
				},
				error: function(msg) {
					$.alert(msg.responseText);
				}
			});
    }
  },
  data() {
    var dm = {};
    var url = "/KvsAccessGenerator/createConfig";
    if (this.GL) {
      this.GL.actUtil.query("get", url, "", function(data) {
        dm = JSON.parse(data);
      });
    } else {
      global_.actUtil.query("get", url, "", function(data) {
        dm = JSON.parse(data);
      });
    }
		// console.log(dm.form);
		dm.kvslength=undefined;
    return dm;
  },
  mounted() {
    var router = this.$router;
		let form = this.form;
    //this.draw();
    this.$root.eventHub.$off("changLangEvent");
    this.$root.eventHub.$on("changLangEvent", lang => {
      this.draw();
    });
	}
};

</script>
<style>
	.kvsTr{
		vertical-align: middle;
		text-align: center;
	}
  is-danger {
    border: solid red 1px;
  }
</style>



