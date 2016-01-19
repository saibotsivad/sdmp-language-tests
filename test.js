var languages = [
	'js',
	'php'
].reduce(function(map, language) {
	map[language] = require('./language/' + language + '/test.js')
	return map
}, {})

var testFunctions = {
	makePublicKey: {
		generate: function(callable, callback) {
			callable(callback)
		},
		verify: function(callable, data, callback) {
			callable(data, callback)
		}
	}
	// , makePrivateKey: {
	// 	generate: function(callable, callback) {
	// 		callable(callback)
	// 	},
	// 	verify: function(callable, data, callback) {
	// 		callable(data, callback)
	// 	}
	// }
	// , signData: {
	// 	generate: function(callable, callback) {
	// 		var privateKey = 'get this from a file'
	// 		var data = 'get this from a file'
	// 		callable(privateKey, data, callback)
	// 	},
	// 	verify: function(callable, data, callback) {}
	// }
	// , verifySignedData: {
	// 	generate: function(callable, callback) {
	// 		var publicKey = 'get this from a file'
	// 		var signedData = 'get this from a file'
	// 		callable(publicKey, signedData, callback)
	// 	},
	// 	verify: function(callable, data, callback) {}
	// }
	// , encryptData: {
	// 	generate: function(callable, callback) {
	// 		var publicKey = 'get this from a file'
	// 		var data = 'get this from a file'
	// 		callable(publicKey, data, callback)
	// 	},
	// 	verify: function(callable, data, callback) {}
	// }
	// , decryptData: {
	// 	generate: function(callable, callback) {
	// 		var privateKey = 'get this from a file'
	// 		var data = 'get this from a file'
	// 		callable(privateKey, data, callback)
	// 	},
	// 	verify: function(callable, data, callback) {}
	// }
}

var languageCount = Object.keys(languages).length
var testFunctionCount = Object.keys(testFunctions).length * 2 // generate and verify for each
var numberOfTestCallbacksExpected = languageCount * testFunctionCount

var numberOfTestCallbacks = 0

// For each language, generate the data
Object.keys(languages).forEach(function(language) {
	console.log('Beginning tests for:', language)
	Object.keys(testFunctions).forEach(function(testKey) {
		console.log('  Test:', testKey)
		var testGenerator = testFunctions[testKey].generate
		var languageGenerator = languages[language][testKey].generate
		// for the generated data, validate it
		testGenerator(languageGenerator, validateGeneratedData(testKey))
	})
})

// validate the generated data across all other languages
function validateGeneratedData(testKey) {
	return function(generatedData) {
		Object.keys(languages).forEach(function(language) {
			console.log('    Verifying generated data against language:', language)
			var testVerifier = testFunctions[testKey].verify
			var languageVerifier = languages[language][testKey].verify
			testVerifier(languageVerifier, generatedData, function(responseIsPassing) {
				numberOfTestCallbacks++
				if (!responseIsPassing) {
					console.log('Generated data could not be verified in language:', language)
					throw 'test failure'
				}
			})
		})
	}
}

if (numberOfTestCallbacks !== numberOfTestCallbacksExpected) {
	console.log('Some tests did not complete!')
	console.log('Expected test count:', numberOfTestCallbacksExpected)
	console.log('Actual test count:', numberOfTestCallbacks)
	throw 'test failure'
}

console.log('done!')
