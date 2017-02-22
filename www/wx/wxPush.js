'use strict';
import xml2js from 'xml2js';
let wxPush = function(postString) {
	xml2js.parseString(postString, { explicitArray : false, ignoreAttrs : true }, (error, result) => {
		
	});
}