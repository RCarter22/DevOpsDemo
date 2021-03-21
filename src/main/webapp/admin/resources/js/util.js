/**
 * Replace all
 * @memberof String
 * @param {string} target - Target
 * @param {string|regex} replacement - Replacement 
 * @type {string}
 */
String.prototype.replaceAll = function(target, replacement) {
	if (typeof(replacement) === "undefined") replacement = '';
	return this.split(target).join(replacement);
};
/**
 * Format string
 * @memberof String
 * @param {string[]}
 * @type {string}
 * @example
 * var str = "Format this {0} long {1}, no {0}!";
 * str.format(["really", "string"]);
 * 
 * outputs: Format this really long string, no really!
 */
String.prototype.format = function () {
    var formatted = this;
    if (Array.isArray(arguments[0])){
  	    for (var i = 0; i < arguments[0].length; i++) {
  	        formatted = formatted.replaceAll('\{' + i + '\}', arguments[0][i]);
  	    }
    } else if (typeof arguments[0] === 'object') {
    	formatted = formatted.formatWithObject(arguments[0]);
    } else {
  	    for (var i = 0; i < arguments.length; i++) {
  	        formatted = formatted.replaceAll('\{' + i + '\}', arguments[i]);
  	    }
    }
    return formatted.toString();
};
/**
 * Format string with object
 * @memberof String
 * @param {object}
 * @type {string}
 * @example
 * var str = "Format this {{p1}} long {{p2}}, no {{p1}}!";
 * str.formatWithObject({p1:"really", p2:"string"});
 * 
 * outputs: Format this really long string, no really!
 */
String.prototype.formatWithObject = function (obj) {
	var formatted = this;
	if (typeof(obj)==="undefined") obj = null;
	if (obj){
		var re = /\{\{(.*?)\}\}/, match;
		while (match = re.exec(formatted)){
			formatted = formatted.replaceAll(match[0], obj[match[1]]);
		}
	}
	return formatted.toString();
}; 