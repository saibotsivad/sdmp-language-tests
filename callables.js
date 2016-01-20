module.exports = {
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
