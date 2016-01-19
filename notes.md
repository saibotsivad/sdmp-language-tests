These are my thinking-out-loud notes.

This is a discussion on how to make testing suites cross language.

Aka, a testing strategy for SDMP.

Suppose a person develops an implementation in some other language.

How should they test things? What should they test?

One way is to say "here's an authoritative node implementation, connect to it" and
then see if it does a bunch of things correctly.

Another way would be to have the implementation generate a set of objects, and
then verify them using a tool.

Maybe a better thing would be to have a bunch of different code examples
written in different languages, just enough to do the crypto work, and
then say "here's how you would implement it". Doing this would make sure
that the crypto was specified enough for all languages.

Languages to make examples in:

* JS
* PHP
* Java
* C++
* C#
* Swift

For each language you would need the following:

* Generate private and public key, PEM encoded, output to string
* Using public key, encrypt a string
* Using public key, verify a signature against a string
* Using private key, decrypt a string
* Using private key, sign a string
* Generate half of the Diffie-Hellman handshake
* Using two halfs of the Diffie-Hellman, generate the session key

You might need to figure out the different keys you'd need, but what about e.g.

* Generate private key in JS, output to string
* All other implementations read in, verify that it's valid
* Generate private key in PHP, output to string
* All other implementations read in, verify that it's valid
* etc. for all other languages

And then similarly, e.g.

* in JS, using a private key, generate a signature for some data
* all other implementations read in data, verify that it's valid
* in PHP, using a private key, generate a signature for some data
* all other implementations read in data, verify that it's valid
* etc. for all other languages

So then you'd basically want to say:

var languages = [ JS, PHP, etc. ]
var tests = [ generatePrivateKey, generatePublicKey, signData, etc. ]
for (language in languages) {
	for (test in tests) {
		var output = language[test].generate()
		for (language2 in languages) {
			if (!language2[test].verify(output)) {
				throw exception 'test failed'
			}
		}
	}
}

Now then, the question is: what should each thing test, and how should it be tested.


