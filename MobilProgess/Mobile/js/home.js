var homeObj = {
	name:'我是首页对象',
	dom:$('#home'),
	init:function(){
		 this.bindEvent();
		 //console.log('wfw')
	},
	bindEvent:function(){
        $.ajax({
			 url:'/v1/cities?type=hot',
			 type:'get',
			 success:function(res){
			 	 console.log(res)
			 	 var str='';
                 for(var i=0;i<res.length;i++){
                 	str+='<a href="#citylist-'+res[i].id+'-'+encodeURI(res[i].name)+'">'+res[i].name+'</a>'
                 }
                 $('.home_hotcity').html(str);
			 }
		});

		setTimeout(function(){
           $.ajax({
             url:'/v1/cities?type=group',
             type:'get',
             success:function(res){	 
             	  var str1='';
             	
             	  var arr = [];
                  for(var key in res){
                   	 arr.push(key);
                  }
                  arr.sort();
                  for(var i=0;i<arr.length;i++){
                  	    var str = '';
                  	   for(var j=0;j<res[arr[i]].length;j++){
                  	   	  if(res[arr[i]][j].name.length>3){
                  	   	  	 res[arr[i]][j].name = res[arr[i]][j].name.substring(0,3)+'..'
                  	   	  }
                          str +='<a class="home_citygroup_div" href="#citylist-'+res[arr[i]][j].id+'-'+encodeURI(res[arr[i]][j].name)+'">'+res[arr[i]][j].name+'</a>'
                  	   }
                      str1+='<div class="home_citygroup"><h2>'+arr[i]+'<span>(按字母排序)</span></h2>'+str+'</div>'
                  }
                  $('.home_citygroups').html(str1)
                }
		   })
		},0);
       $('.home-guessP').click(function(){
       	   location.href = '#citylist';
       })
       
	},
	enter:function(){
		//进入该模块
		this.dom.show();
	},
	leave:function(){
		//离开该模块
		this.dom.hide();
	}
}