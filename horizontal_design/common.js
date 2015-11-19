var getData = function(filename, params, callback ) {
	//var me = this;
	//me.doLoading();
	 $.ajax({
		url: filename,
		type: "post",
		data: params,
		cache: false,
		dataType: 'json',
		success: function(data) {
			if(_.isFunction(callback)) callback(data);
			//	me.hideLoading();
		},
		error:function(){
			console.log("failure", filename);
		}
	});
}

var sendAction = function(filename, params, callback ) {
	 $.ajax({
		url: filename,
		type: "post",
		data: params,
		dataType: 'json',
		success: function(data) {
			if(_.isFunction(callback)) callback(data);
		},
		error: function(){
			console.log("failure", filename);
		}
	});
}