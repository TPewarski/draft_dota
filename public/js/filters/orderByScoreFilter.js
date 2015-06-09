app.filter('orderByCompositeScore', function(){
	return function(items) {
		console.log(items)
		var filtered = []
		angular.forEach(items, function(item){
			filtered.push(item)
		})
		// filtered.sort(function (a, b){
		// 	return (a[compositeScore] > b[compositeScore] ? 1: -1);
		// })
	return	
	}
})