webpackJsonp([5],{MWAP:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=l("4YfN"),n=l.n(i),o=l("vLgD"),r=l("wliq"),s=l("bSIt"),a={props:["info"],data:function(){return{form:{pid:0,title:"",icon:"",type:1,url:"",status:1},formLabelWidth:"120px",icons:["el-icon-setting","el-icon-help","el-icon-s-home","el-icon-s-data"],urls:["menu","role","manager","cate","spec","goods","member","banner","seckill"]}},computed:n()({},Object(s.c)({list:"menu/menuList"})),methods:n()({},Object(s.b)({requestMenuList:"menu/menuListActions"}),{cancel:function(){this.info.show=!1,this.form={pid:0,title:"",icon:"",type:1,url:"",status:1}},confirm:function(){var t=this;Object(o.d)(this.form).then(function(e){Object(r.b)(e.data.msg),t.cancel(),t.requestMenuList()})},getDetail:function(t){var e=this;Object(o.s)({id:t}).then(function(l){e.form=l.data.list,e.form.id=t})},update:function(){var t=this;console.log(this.form),Object(o.n)(this.form).then(function(e){Object(r.b)(e.data.msg),t.cancel(),t.requestMenuList()})}}),mounted:function(){this.requestMenuList()}},c={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"add"},[l("el-dialog",{attrs:{title:t.info.title,visible:t.info.show},on:{"update:visible":function(e){return t.$set(t.info,"show",e)}}},[l("el-form",{attrs:{model:t.form}},[l("el-form-item",{attrs:{label:"菜单名称","label-width":t.formLabelWidth}},[l("el-input",{model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),l("el-form-item",{attrs:{label:"上级菜单","label-width":t.formLabelWidth}},[l("el-select",{model:{value:t.form.pid,callback:function(e){t.$set(t.form,"pid",e)},expression:"form.pid"}},[l("el-option",{attrs:{label:"",value:"",disabled:""}},[t._v("--请选择--")]),t._v(" "),l("el-option",{attrs:{label:"顶级菜单",value:0}},[t._v("顶级菜单")]),t._v(" "),t._l(t.list,function(t){return l("el-option",{key:t.id,attrs:{label:t.title,value:t.id}})})],2)],1),t._v(" "),l("el-form-item",{attrs:{label:"菜单类型","label-width":t.formLabelWidth}},[l("el-radio",{attrs:{label:1},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[t._v("目录")]),t._v(" "),l("el-radio",{attrs:{label:2},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[t._v("菜单")])],1),t._v(" "),1==t.form.type?l("el-form-item",{attrs:{label:"菜单图标","label-width":t.formLabelWidth}},[l("el-select",{model:{value:t.form.icon,callback:function(e){t.$set(t.form,"icon",e)},expression:"form.icon"}},[l("el-option",{attrs:{label:"",value:"",disabled:""}},[t._v("--请选择--")]),t._v(" "),t._l(t.icons,function(t){return l("el-option",{key:t,attrs:{value:t}})})],2)],1):l("el-form-item",{attrs:{label:"菜单地址","label-width":t.formLabelWidth}},[l("el-select",{model:{value:t.form.url,callback:function(e){t.$set(t.form,"url",e)},expression:"form.url"}},[l("el-option",{attrs:{label:"",value:"",disabled:""}},[t._v("--请选择--")]),t._v(" "),t._l(t.urls,function(t){return l("el-option",{key:t,attrs:{value:t}})})],2)],1),t._v(" "),l("el-form-item",{attrs:{label:"菜单状态","label-width":t.formLabelWidth}},[l("el-switch",{attrs:{"active-color":"blue","inactive-color":"grey","active-value":1,"inactive-value":2},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}})],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:t.cancel}},[t._v("取 消")]),t._v(" "),t.info.isAdd?l("el-button",{attrs:{type:"primary"},on:{click:t.confirm}},[t._v("确 定")]):l("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var u=l("C7Lr")(a,c,!1,function(t){l("pcgP")},null,null).exports,d={data:function(){return{}},computed:n()({},Object(s.c)({menuList:"menu/menuList"})),methods:n()({},Object(s.b)({requestMenuList:"menu/menuListActions"}),{edit:function(t){this.$emit("edit",t)},del:function(t){var e=this;Object(o.j)({id:t}).then(function(t){Object(r.b)(t.data.msg),e.requestMenuList()})}}),mounted:function(){this.requestMenuList()}},f={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"list"},[l("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:t.menuList,"row-key":"id",border:"","tree-props":{children:"children"}}},[l("el-table-column",{attrs:{prop:"id",label:"菜单编号"}}),t._v(" "),l("el-table-column",{attrs:{prop:"title",label:"菜单名称"}}),t._v(" "),l("el-table-column",{attrs:{prop:"icon",label:"菜单图标"}}),t._v(" "),l("el-table-column",{attrs:{prop:"url",label:"菜单地址"}}),t._v(" "),l("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?l("el-button",{attrs:{type:"primary"}},[t._v("启用")]):l("el-button",{attrs:{type:"danger"}},[t._v("禁用")])]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{type:"primary"},on:{click:function(l){return t.edit(e.row.id)}}},[t._v("编辑")]),t._v(" "),l("el-button",{attrs:{type:"danger"},on:{click:function(l){return t.del(e.row.id)}}},[t._v("删除")])]}}])})],1)],1)},staticRenderFns:[]};var m={data:function(){return{info:{show:!1,title:"",isAdd:!0}}},methods:{add:function(){this.info.show=!0,this.info.title="添加菜单",this.info.isAdd=!0},edit:function(t){this.info.show=!0,this.info.title="编辑菜单",this.info.isAdd=!1,this.$refs.add.getDetail(t)}},components:{vAdd:u,vList:l("C7Lr")(d,f,!1,function(t){l("Ucqy")},null,null).exports}},b={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"menu"},[e("el-button",{attrs:{type:"primary"},on:{click:this.add}},[this._v("添加")]),this._v(" "),e("v-add",{ref:"add",attrs:{info:this.info}}),this._v(" "),e("v-list",{on:{edit:this.edit}})],1)},staticRenderFns:[]};var v=l("C7Lr")(m,b,!1,function(t){l("luoO")},"data-v-53ca900a",null);e.default=v.exports},Ucqy:function(t,e){},luoO:function(t,e){},pcgP:function(t,e){}});
//# sourceMappingURL=5.b6c8c16d00965546be37.js.map