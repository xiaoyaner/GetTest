var routeControl = (function(){
	var hashMap = {
		'home':homeObj,
		'citylist':cityListObj,
		'foodlist':flistObj,
		'detail':detailObj
	};
	var cur = null;
	var pre = null;
	var CachePageMap = {

	}
    function init(name){
    	//name = home
    	//name =citylist-1-klds$sdf
    	//name = home
    	//console.log('我获取到了路由的名字',name);
    	var moudle = hashMap[name]||hashMap['home'];
    	var kname = name;
    	if(name.indexOf('citylist') !== -1){
    		moudle = hashMap['citylist'];
    		moudle.changeCity(name);
    	    kname = 'citylist';
    	}
    	if(name.indexOf('foodlist') !== -1){
    		moudle = hashMap['foodlist'];
    		moudle.loadAll(name);
    	    kname = 'foodlist';
    	}
    	if(name.indexOf('detail') !== -1){
    		moudle = hashMap['detail'];
    		kname = 'detail';
    	}

    	if(moudle){
    		 //CachePageMap['home'] => undefined ==> true
    		 //CachePageMap['citylist'] => undefined ==> true
    		 //pre null -->homeObj
    		 //cur = homeObj --> cityObj
    		 if(typeof CachePageMap[kname] === 'undefined'){
    		 	moudle.init(name);
    		 	CachePageMap[kname]=true;
    		 	pre = cur;
    		 	cur = moudle;
    		 	if(pre){
    		 		pre.leave();
    		 	}
    		 	moudle.enter();
    		 }else{
    		 	console.log('现在的该模块，已经被实例化');
    		 	pre = cur;
    		 	cur = moudle;
    		 	if(pre){
    		 		 pre.leave();
    		 	}
    		 	moudle.enter();
    		 	// moudle.init();
    		 }
    	}else{
    		location.href = '#home';
    	}
    }

return {
	init:init
}






})();