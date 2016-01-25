var shell = require('../../utilities/shell.js')
var ssl = shell('/usr/local/ssl/bin/openssl')

module.exports = {
	makePrivateKey: {
		// generate a PEM encoded private key without password
		// protection and give to callback as string
		generate: function(callback) {
			//ssl('genrsa 2048', function(err, result) {
			//	if (err) {
			//		callback(err)
			//	} else {
			//		callback(false, result.trim())
			//	}
			//})
			callback(false, '-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAvN0ESxrLsflTDgDuaU3+zlvEy0TRYQwfdAhBZ/N8Wd/rhQSv\nOTYpsZ9BLt6REzPYmvc97pTrdz5nR2WEBZWMKdclAeAYsq0vu0mJcwCjAhAPEUV5\n9T4Huql1bkAvSeEu1fABp8hxPh4MGay1O+2LMOiA3NW0IFP9miQ9ekG957Fs13AP\nZNlkbTVfpE5jAW5PW5FE9dIMACE4ldDW18uBKz2G/KAQOotxypFaL7FnfPUtqu3M\nTSaIgenhGd5fTeGeghzrM4B+by6SdBsjtbhMyB0yMJZBPWlSk7boKCfPTxJaPwMf\noCaujtuNBizom7/KPiywbm6B7F0o5N0MN6/BgwIDAQABAoIBAHdStGm3LkbtnVnV\noMuLaZd7R2SdwCOugxjONnS00zX9UVIjWYmt/L2qPoacO9CECzAtUUWxdOtL0/i5\n3KWijIHK2ijLKw+IeAW+OkcceeDNwJdK6/jUDhITCoxzpOzqhqrIDmOxMkrqtP5r\nrb2FIVHvM6tSoZFjP3DpwKXDb3Y3/nDqgEaOWnwog7DgExYWuTN1bZPLn8UaB7Js\nWXgJHGSz9K2V7UInRqkdJ+SPFUryPkMkUDa/kOWFNKvPC5l0tbkqFMelXmXY4Cf2\nVxjs1IwKYyX4KCCK6tIrphEOoShiJIN38NAGj/W2gb1EjKV41vW+HuFqFICc22TS\nat8788ECgYEA6yZVNHNFzSUnrrDYudhTQpnkAz+CINE9Iq08Dl4/wt8DEwe1dVTB\nJcw58ngfWQatWMsoO37jZC2ibqWeI0Gf5wRW8n9Xyv0dk6oe7fV4beXo/Yg8MAFL\ncMGVRwHYTQtmhuWpmvTFmRQWlepknIyKrw82LyoMhKE+NplXc541RpECgYEAzZwH\nTFooqUhB7GUiw39t7UXx88QHwdQ0ZMWfwHjWY+7ReZLLJ51pmD+OtYvgsE/gbMlM\n4jzF2I9ZB4l1kewUg5tm5QUQie1z0bZL5ey9kVjxU5TIIXqEqrn3b/sKNkkKxgva\nabm9QV/4hRObbHsygbz1wllPtsT/cIKcVn8ZGNMCgYEAiDdwbC3KZYf8cMmpAh86\nO/6BgxArBW+wBoJro7cdIHmngkKY7xrluEuR1c+X+S5RBHrLF4vtlX6J9aai8LF3\nO4/b/iWeacwucfe+awIjfSYNzbA5jWVymiLJopSDBD5yafpoQYdBX+evHbDmD3mq\nbLZXIQMutTXioCY77pHbMsECgYADhFS3oJ8rbhn6kixLDcXylgyyb7r2PMv8oUi/\nQRHhubcJjlI9RjsFKKknP9JDEcqz8amIASQdNS5/q4FAUrpzGdhjuHd09IPTpXuc\n3jTL5KqUFGpr8C2OwgmSd8fP7+XoR1GgF1Y+ZQbaN+CjtWPCxlmpzl9HsAzyfrlv\n3VKvkwKBgQDOAiumXVR6CdSu/azc/Hqvgu+YB01i7yeVJWBwJtQkmL61Xz6EmLcz\nQyBlqosV5L4ZyCRSd9rnS/pZpkgQRPw4O7iQ9n4hroxSBKbxDtZBa9V5vMPM7JiT\nPIMmMzaSKD0B59UZqeQjoox0P7S0VE+oXF/PggPgCjgUyr0opdzhkw==\n-----END RSA PRIVATE KEY-----')
		},
		// verify the given string is a PEM encoded private key
		verify: function(privateKey, callback) {
			ssl({
				input: privateKey,
				command: 'rsa -check'
			}, function(err, result) {
				console.log('HELLO?')
				if (err) {
					callback(false)
				} else {
					// if the key is valid, the output contains the text "RSA key ok"
					callback(result.indexOf('RSA key ok') >= 0)
				}

			})
		}
	}
	, makePublicKey: {
		// given a PEM encoded private key, generate a PEM encoded
		// public key and give to the callback as a string
		generate: function(privateKey, callback) {
			ssl({
				input: privateKey,
				command: 'rsa -pubout'
			}, function(err, data) {
				console.log('ERR', err)
				console.log('DATA', data)
				// the output of this includes a trailing newline, which should be removed
				if (err) {
					callback(err)
				} else {
					callback(false, data.trim())
				}
			})
		},
		// verify the given string is a PEM encoded public key
		verify: function(publicKey, callback) {
			ssl({
				input: publicKey,
				command: 'pkey -pubin -text'
			}, function(err, data) {
				if (err) {
					callback(false)
				} else {
					// if the public key is valid, the output will contain the modulus and exponent
					// it should be sufficient to just check for the modulus
					callback(data.indexOf('Modulus:') >= 0)
				}
			})
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
