/*

This is a simple "implementation" which really only supplies
pre-generated data, that way you can check some of your
verification implementations without needing to waste lots
of bits of entropy on your computer.

- Generating things grabs them from the filesystem.
- Verifying things blindly passes.

*/

// this is the node.js filesystem core api
var fs = require('fs')

module.exports = {
	makePrivateKey: {
		// generate a PEM encoded private key without password
		// protection and give to callback as string
		generate: function(callback) {
			// grab the private key from the filesystem, use async method
			callback(fs.readFileSync('./pre-generated-files/private_key.pem', { encoding: 'utf8' }))
		},
		// verify the given string is a PEM encoded private key
		verify: function(privateKey, callback) {
			// this will blindly pass, see the header to this file
			var thePrivateKeyIsValid = true
			callback(thePrivateKeyIsValid)
		}
	}
	, makePublicKey: {
		// given a PEM encoded private key, generate a PEM encoded
		// public key and give to the callback as a string
		generate: function(privateKey, callback) {
			// this will ignore whatever private key was given, and
			// simply grab the public key from the filesystem, using
			// the async method
			callback(fs.readFileSync('./pre-generated-files/public_key.pem', { encoding: 'utf8' }))
		},
		// verify the given string is a PEM encoded public key
		verify: function(publicKey, callback) {
			// this will blindly pass, see the header to this file
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
