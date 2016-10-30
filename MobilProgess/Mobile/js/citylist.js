var cityListObj = Object.create(homeObj);

$.extend(cityListObj,{
   name:'我是搜索页',
   dom:$('#citylist'),
   init:function(name){
   	  this.bindEvent();//?????name
   	  // this.changeCity(name);
   },
 
   changeCity:function(name){
   	  var city_id = name.split('-')[1];
   	  var city_name = decodeURI(name.split('-')[2]);
   	  $('input[name=city_id]').val(city_id);	  
   	  $('#cityname').html(city_name);
   },
   bindEvent:function(name){
       $('.cityChange').click(function(){
       	         location.href='#home';
            });
       $('.fa-angle-left').click(function(){
   	         location.href='#home';
   	         // debugger;
       });
       $('#search_address').click(function(event,name){
       	    
       	    // var city_id = location.hash.split('-')[1];
       	    var keyword = $('.word').val();
            var city_id = $('input[name=city_id]').val();
       	    //console.log(keyword)
             
            var data = store(keyword+city_id) //store------------------------------
       	   
            //组织默认事件
            event.preventDefault();
            //写这一步是？？？？？
       	    if(data){							  					
       	    	//console.log(data.length)
       	    	var str = '';
       	    	for(var i=0;i<data.length;i++){
       	    		str +='<li><a href="#foodlist-'+data[i].latitude+'-'+data[i].longitude+'-'+data[i].geohash+'">'+data[i].name+'</a><p>'+data[i].address+'</p></li>'
       	    	}
       	    	$('.search_result').html(str);
       	    	return;
       	    }
       	   //表单序列化
       	  var url = '/v1/pois?' + $('form').serialize();
       	   $.ajax({
       	   	   url:url,
       	   	   type:'get',
       	   	   LodeFunction:function(){
       	   	   	   $('.search_result').html('加载中.....')
       	   	   },
       	   	   success:function(res){
       	   	   	  store(keyword,res);
       	   	   	 // console.log(res)
       	   	   	  var str = '';
       	   	   	  for(var i=0;i<res.length;i++){
       	   	   	  	//console.log(res[i].name)
       	   	   	  		str +='<li><a href="#foodlist-'+res[i].latitude+'-'+res[i].longitude+'-'+res[i].geohash+'">'+res[i].name+'</a><p>'+res[i].address+'</p></li>'		
       	   	   	  }
       	   	   	  
       	   	   	  $('.search_result').html(str);
       	   	   },
       	   	   error:function(){
       	   	   	  console.log('报错');
       	   	   }
       	   })


       })
   }

})