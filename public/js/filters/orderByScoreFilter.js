app.filter('orderByCompositeScore', function(){
	return function(items) {
		console.log(items)
		var filtered = []
		angular.forEach(items, function(val, key){
			// console.log('key', key)
			// console.log('value', val)
			filtered.push({key: key, val: val})
		})
		console.log("filtered array", filtered)
		filtered.sort(function (a, b){
			// console.log("a", a)
			// console.log("a.val", a.val)
			return (a.val.compositeScore > b.val.compositeScore ? 1: -1);
		})
		return 	filtered.map(function(item){
			// console.log("item", item)
			// console.log("item.key", item.key)
			return item.key
		})
	}
})
//  app.filter('orderByCompositeScore', function() {
//   return function(items, field, reverse) {
//     var filtered = [];
//     angular.forEach(items, function(item) {
//       filtered.push(item);
//     });
//     filtered.sort(function (a, b) {
//       return (a[field] > b[field] ? 1 : -1);
//     });
//     if(reverse) filtered.reverse();
//     return filtered;
//   };
// });