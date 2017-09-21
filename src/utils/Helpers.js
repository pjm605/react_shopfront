
// const HexToAsciiHelper = function (str) {
// 	var hex = str.toString();
// 	var result = '';
// 	for (var i =2; i < str.length; i += 2) {
// 	  var code = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
// 	  result += code;
// 	}

// 	return result;
// }

// export default HexToAsciiHelper;



export function HexToAsciiHelper (str) {
	var hex = str.toString();
	var result = '';
	for (var i =2; i < str.length; i += 2) {
	  var code = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
	  result += code;
	}

	return result;
}