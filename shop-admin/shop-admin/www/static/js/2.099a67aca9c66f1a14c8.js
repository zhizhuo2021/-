webpackJsonp([2],{OoWA:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n("4YfN"),a=n.n(r),o=n("bSIt"),i=n("vLgD"),s=n("wliq"),l={props:["info"],data:function(){return{form:{roleid:"",username:"",password:"",status:1},formLabelWidth:"80px"}},computed:a()({},Object(o.c)({list:"role/roleList"})),methods:a()({},Object(o.b)({requestRoleList:"role/roleListActions",requestManagerList:"manager/managerListActions",requestCount:"manager/countActions"}),{cancel:function(){this.info.show=!1,this.form={roleid:"",username:"",password:"",status:1}},confirm:function(){var t=this;Object(i.c)(this.form).then(function(e){Object(s.b)(e.data.msg),t.cancel(),t.requestCount(),t.requestManagerList()})},getDetail:function(t){var e=this;Object(i.r)({uid:t}).then(function(t){e.form=t.data.list,e.form.password=""})},update:function(){var t=this;Object(i.m)(this.form).then(function(e){Object(s.b)(e.data.msg),t.cancel(),t.requestManagerList()})}}),mounted:function(){this.requestRoleList()}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"add"},[n("el-dialog",{attrs:{title:t.info.title,visible:t.info.show},on:{"update:visible":function(e){return t.$set(t.info,"show",e)}}},[n("el-form",{attrs:{model:t.form}},[n("el-form-item",{attrs:{label:"所属角色","label-width":t.formLabelWidth}},[n("el-select",{model:{value:t.form.roleid,callback:function(e){t.$set(t.form,"roleid",e)},expression:"form.roleid"}},[n("el-option",{attrs:{label:"",value:"",disabled:""}},[t._v("--请选择--")]),t._v(" "),t._l(t.list,function(t){return n("el-option",{key:t.id,attrs:{label:t.rolename,value:t.id}})})],2)],1),t._v(" "),n("el-form-item",{attrs:{label:"用户名","label-width":t.formLabelWidth}},[n("el-input",{model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"密码","label-width":t.formLabelWidth}},[n("el-input",{attrs:{type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"菜单状态","label-width":t.formLabelWidth}},[n("el-switch",{attrs:{"active-color":"blue","inactive-color":"grey","active-value":1,"inactive-value":2},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),t._v(" "),n("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),t.info.isAdd?n("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确 定")]):n("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var c=n("C7Lr")(l,u,!1,function(t){n("rsku")},null,null).exports,d={computed:a()({},Object(o.c)({managerList:"manager/managerList",count:"manager/count"})),methods:a()({},Object(o.b)({requestManagerList:"manager/managerListActions",requestCount:"manager/countActions",requestPage:"manager/pageActions"}),{cPage:function(t){this.requestPage(t),this.requestManagerList()},edit:function(t){this.$emit("edit",t)},del:function(t){var e=this;this.$confirm("确定要删除吗?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.i)({uid:t}).then(function(t){Object(s.b)(t.data.msg),e.requestCount(),e.requestManagerList()}).catch(function(){e.$message({type:"info",message:"已取消删除"})})})}}),mounted:function(){this.requestCount(),this.requestManagerList()}},f={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"list"},[n("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.managerList,"row-key":"id",border:"","tree-props":{children:"children"}}},[n("el-table-column",{attrs:{prop:"id",label:"用户编号"}}),t._v(" "),n("el-table-column",{attrs:{prop:"username",label:"用户名"}}),t._v(" "),n("el-table-column",{attrs:{prop:"rolename",label:"所属角色"}}),t._v(" "),n("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?n("el-button",{attrs:{type:"primary"}},[t._v("启用")]):n("el-button",{attrs:{type:"danger"}},[t._v("禁用")])]}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"primary"},on:{click:function(n){return t.edit(e.row.uid)}}},[t._v("编辑")]),t._v(" "),n("el-button",{attrs:{type:"danger"},on:{click:function(n){return t.del(e.row.uid)}}},[t._v("删除")])]}}])})],1),t._v(" "),t.count?n("el-pagination",{attrs:{background:"",layout:"prev, pager, next","page-size":2,total:t.count},on:{"current-change":t.cPage}}):t._e()],1)},staticRenderFns:[]};var m={data:function(){return{info:{show:!1,title:"",isAdd:!0}}},methods:{add:function(){this.info.show=!0,this.info.title="添加管理员"},edit:function(t){this.info.show=!0,this.info.title="編輯管理員",this.info.isAdd=!1,this.$refs.add.getDetail(t)}},components:{vAdd:c,vList:n("C7Lr")(d,f,!1,function(t){n("kd+p")},null,null).exports}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("el-button",{attrs:{type:"primary"},on:{click:this.add}},[this._v("添加")]),this._v(" "),e("v-add",{ref:"add",attrs:{info:this.info}}),this._v(" "),e("v-list",{on:{edit:this.edit}})],1)},staticRenderFns:[]};var p=n("C7Lr")(m,b,!1,function(t){n("rYbN")},null,null);e.default=p.exports},"kd+p":function(t,e){},rYbN:function(t,e){},rsku:function(t,e){}});
//# sourceMappingURL=2.099a67aca9c66f1a14c8.js.map