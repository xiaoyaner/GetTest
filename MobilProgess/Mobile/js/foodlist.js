var flistObj = Object.create(homeObj);

$.extend(flistObj,{
	name:"我是商品列表页",
	dom:$('#foodlist'),
	init:function(name){
		
	},
	loadAll: function(name){
		this.lat = name.split('-')[1];
		this.lng = name.split('-')[2];
		this.geohash = name.split('-')[3];
		//debugger;
		/*store(this.geohash, {
			lat: this.lat,
			lng: this.lng
		});*/
        this.bindEvent();
        this.loadName();
        this.loadAddress();		 	
	},
	loadName:function(){
      $.ajax({
       	  url:'/v2/pois/' + this.geohash,
       	  success:function(res){
       	  	if(res.name.length>8){
       	  		res.name =res.name.substring(0,8)+'..';
       	  	}
            $('.food_address').html(res.name);
       	  }
       })
	},
	loadAddress:function(){
         var me=this;
         if(this.sock){
         	return;
         }
         this.sock = true;//ajax锁
         $.ajax({
         	url:'/shopping/restaurants',
         	type:'GET',
         	data:{
         		latitude:me.lat,
				longitude:me.lng,
				offset:me.initNum,
				limit:20,
				extras: ['activities']
         	},
         	success:function(res){
         		me.sock = false;
         		var str = '';
         		for(var i=0;i<res.length;i++){
         			str+=' <a href="#detail-'+me.geohash+'-'+res[i].id+'"><div class="footft_pic"><img src="//fuss10.elemecdn.com/c/b5/ab881b81df68c2e3253a457e652f8jpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="" /></div><div class="footft_right"><p class="foot_p1"><b>'+res[i].name+'</b><span></span></p><p class="foot_p2"><span>'+res[i].rating+'</span><span>月售'+res[i].recent_order_num+'单</span><span>蜂鸟转送</span><span>准时达</span></p><p class="foot_p3"><span>￥'+res[i].float_minimum_order_amount+'起送</span><span>/'+res[i].tips+'</span><b>'+res[i].distance+'km</b><i>/'+res[i].order_lead_time+'分钟</i></p></div></a>'
         		}
         		$('.footft_li').html(str);
         	}
         })
	},
	bindEvent:function(){
         $.ajax({
         	url:'/v2/index_entry?geohash=yb4h6vutqpf&group_type=1&flags[]=F',
         	type:'get',
         	success:function(res){
         		var str = '';
         		var str1 = '';
         		for(var i=0;i<res.length;i++){
         			if(i<8){
         				str+='<a href="javascript:;"><div class="slid_pic"><img src="//fuss10.elemecdn.com'+res[i].image_url+'" alt="" /></div><span>'+res[i].title+'</span></a>'
         			}else{
         				str1+='<a href="javascript:;"><div class="slid_pic"><img src="//fuss10.elemecdn.com'+res[i].image_url+'" alt="" /></div><span>'+res[i].title+'</span></a>'
         			}
         			
         		}
         		$('.slide1').html(str);
         		$('.slide2').html(str1);
         	}
         })
         
	}
})