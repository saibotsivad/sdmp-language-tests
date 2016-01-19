module.exports = {
	makePublicKey: {
		generate: function(callback) {
			callback('generated key')
		},
		verify: function(key, callback) {
			callback(false)
		}
	},
	signData: {
		generate: function() {},
		verify: function() {}
	},
	verifySignedData: {
		generate: function() {},
		verify: function() {}
	},
	encryptData: {
		generate: function() {},
		verify: function() {}
	},
	decryptData: {
		generate: function() {},
		verify: function() {}
	}
}
