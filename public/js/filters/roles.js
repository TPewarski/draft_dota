app.filter('farmPriority', function(){
	return function(collection, num){
		//console.log("collection", collection)
		return collection.filter(function(element){
			//console.log('element', element)
			return element.roles.indexOf(num) !== -1
		})
	}
})