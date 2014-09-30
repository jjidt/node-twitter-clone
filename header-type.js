var headerType = function(header){
	if(header){
		var splitHeader = header.split(",");
		if (splitHeader.indexOf('text/html') !== -1) {
			return "html";
		} else if(splitHeader.indexOf('application/json') !== -1) {
			return "json";
		} else {
			return null
		}
	}
};

module.exports = headerType

