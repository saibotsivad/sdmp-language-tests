/*
Each language needs to implement the following functions:
*/
module.exports = {
	makePrivateKey: {
		// generate a PEM encoded private key without password
		// protection and give to callback as string
		generate: function(callback) {
			callback('the private key')
		},
		// verify the given string is a PEM encoded private key
		verify: function(privateKey, callback) {
			var thePrivateKeyIsValid = true
			callback(thePrivateKeyIsValid)
		}
	}
	, makePublicKey: {
		// given a PEM encoded private key, generate a PEM encoded
		// public key and give to the callback as a string
		generate: function(privateKey, callback) {
			callback('the public key')
		},
		// verify the given string is a PEM encoded public key
		verify: function(publicKey, callback) {
			var thePublicKeyIsValid = true
			callback(thePublicKeyIsValid)
		}
	}
	, signData: {
		// given a PEM encoded private key and some data, generate a signature
		// and give to callback as string
		generate: function(privateKey, data, callback) {
			callback('the signature')
		},
		// given a PEM encoded public key, verify the signature of the data
		verify: function(publicKey, originalData, signature, callback) {
			var signatureIsValid = true
			callback(signatureIsValid)
		}
	}
	, encryptData: {
		// given a PEM encoded public key and some data, encrypt the data
		// to that key and give that response to the callback
		generate: function(publicKey, data, callback) {
			callback('the encrypted data')
		},
		// given a PEM encoded private key and some encrypted data, decrypt
		// it and make sure it is the same as the original data
		verify: function(privateKey, originalData, encrypted, callback) {
			var dataDecryptedAndIsSameAsOriginal = true
			callback(dataDecryptedAndIsSameAsOriginal)
		}
	}
}
