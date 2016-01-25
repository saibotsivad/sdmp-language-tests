/*
Each language needs to implement the following functions:
*/
module.exports = {
	makePrivateKey: {
		generate: function(callback) {
			// generate a PEM encoded private key without password
			// protection and give to callback as string
			callback('the private key')
		},
		verify: function(privateKey, callback) {
			// verify the given string is a PEM encoded private key
			var thePrivateKeyIsValid = true
			callback(thePrivateKeyIsValid)
		}
	}
	, makePublicKey: {
		generate: function(privateKey, callback) {
			// given a PEM encoded private key, generate a PEM encoded
			// public key and give to the callback as a string
			callback('the public key')
		},
		verify: function(publicKey, callback) {
			// verify the given string is a PEM encoded public key
			var thePublicKeyIsValid = true
			callback(thePublicKeyIsValid)
		}
	}
	, signData: {
		generate: function(privateKey, data, callback) {
			// given a PEM encoded private key and some data, generate a signature
			// and give to callback as string
			callback('the signature')
		},
		verify: function(publicKey, originalData, signature, callback) {
			// given a PEM encoded public key, verify the signature of the data
			var signatureIsValid = true
			callback(signatureIsValid)
		}
	}
	, encryptData: {
		generate: function(publicKey, data, callback) {
			// given a PEM encoded public key and some data, encrypt the data
			// to that key and give that response to the callback
			callback('the encrypted data')
		},
		verify: function(privateKey, originalData, encrypted, callback) {
			// given a PEM encoded private key and some encrypted data, decrypt
			// it and make sure it is the same as the original data
			var dataDecryptedAndIsSameAsOriginal = true
			callback(dataDecryptedAndIsSameAsOriginal)
		}
	}
}
