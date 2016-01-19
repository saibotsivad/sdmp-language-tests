var languages = [
	'js',
	'php'
].reduce(function(map, language) {
	map[language] = require('./language/' + language + '/test.js')
	return map
}, {})

var testFunctions = {
	makePrivateKey: {
		generate: function(callable, callback) {
			// generate a PEM encoded private key
			callable(callback)
		},
		verify: function(callable, key, callback) {
			// see if the private key is valid
			callable(key, callback)
		}
	}
	, makePublicKey: {
		generate: function(callable, callback) {
			// generate a PEM encoded public key using a PEM encoded private key
			var privateKey = 'get from file'
			callable(privateKey, callback)
		},
		verify: function(callable, key, callback) {
			// see if the private key is valid
			callable(key, callback)
		}
	}
	, signData: {
		generate: function(callable, callback) {
			// sign some data using a PEM encoded private key
			var privateKey = 'get this from a file'
			var data = 'get this from a file'
			callable(privateKey, data, callback)
		},
		verify: function(callable, signature, callback) {
			// verify signature with PEM encoded public key
			var publicKey = 'from a file'
			var originalData = 'the data from the generate function'
			callable(publicKey, originalData, signature, callback)
		}
	}
	, encryptData: {
		generate: function(callable, callback) {
			// encrypt data with PEM encoded public key
			var publicKey = 'get this from a file'
			var data = 'get this from a file'
			callable(publicKey, data, callback)
		},
		verify: function(callable, encrypted, callback) {
			// decrypt data with PEM encoded private key
			var privateKey = 'get from file'
			var originalData = 'data from generate function'
			callable(privateKey, originalData, encrypted, callback)
		}
	}
}

var languageCount = Object.keys(languages).length
var testFunctionCount = Object.keys(testFunctions).length * 2 // generate and verify for each
var numberOfPassingTestCallbacksExpected = languageCount * testFunctionCount

var numberOfPassingTestCallbacks = 0

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
				if (responseIsPassing) {
					numberOfPassingTestCallbacks++
				} else {
					console.log('Generated data could not be verified in language:', language)
				}
			})
		})
	}
}

if (numberOfPassingTestCallbacks !== numberOfPassingTestCallbacksExpected) {
	console.log('Some tests did not pass!')
	console.log('Expected passing test count:', numberOfPassingTestCallbacksExpected)
	console.log('Actual passing test count:', numberOfPassingTestCallbacks)
	throw 'test failure'
}

console.log('done!')
