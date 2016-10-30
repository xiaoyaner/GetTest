var detailObj = Object.create(homeObj);
$.extend(detailObj,{
	name:'我是商品列表页',
	dom:$('#detail'),
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){

	}
})