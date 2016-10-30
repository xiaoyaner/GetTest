var route = new Router({
	'/:page':function(name){
        routeControl.init(name);
        //console.log(name)
	}
});
route.init('/home');
/*Pace.on('done',function(){
	route.init('/home');
})*/
// $(Pace).on('loadName',function(event,geohash,callback){
   
// })