var testFunctions = require('./callables.js')

var implementations = [
	'cached-files'
	, 'openssl'
	// , 'js-nodejs'
].reduce(function(map, implementation) {
	map[implementation] = require('./implementations/' + implementation + '/test.js')
	return map
}, {})

var implementationCount = Object.keys(implementations).length
var testFunctionCount = Object.keys(testFunctions).length * 2 // generate and verify for each
var numberOfPassingTestCallbacksExpected = implementationCount * testFunctionCount

var numberOfPassingTestCallbacks = 0

// For each implementation, generate the data
Object.keys(implementations).forEach(function(implementation) {
	console.log('Beginning tests for:', implementation)
	Object.keys(testFunctions).forEach(function(testKey) {
		console.log('  Test:', testKey)
		var testGenerator = testFunctions[testKey].generate
		var implementationGenerator = implementations[implementation][testKey].generate
		// for the generated data, validate it
		testGenerator(implementationGenerator, validateGeneratedData(testKey))
	})
})

// validate the generated data across all other implementations
function validateGeneratedData(testKey) {
	return function(generatedData) {
		Object.keys(implementations).forEach(function(implementation) {
			console.log('    Verifying generated data against implementation:', implementation)
			var testVerifier = testFunctions[testKey].verify
			var implementationVerifier = implementations[implementation][testKey].verify
			testVerifier(implementationVerifier, generatedData, function(responseIsPassing) {
				if (responseIsPassing) {
					numberOfPassingTestCallbacks++
				} else {
					console.log('Generated data could not be verified in implementation:', implementation)
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
