# sdmp-language-tests

**TODO: Everything. This is not even beta yet.**

Implementation mocks and tests for various languages.

This is primarily a repo for demonstrating proper
language-specific cryptographic methods.

The goal is to have these languages represented:

* JS
* PHP
* Java
* Ruby
* Go
* C
* C#
* Swift

## what's the point?

The purpose of this project is to show solid, secure implementations
of the cryptography used in the [SDMP](http://sdmp.io).

You can look under the [language](./language) folder to see the
different languages that have implementations, and you should be
able to use those implementations in your code.

## what it does

Each language generates and verifies certain data, and that data is
verified using all the other languages.

The pseudo code looks like this:

	var languages = [ JS, PHP, Java, etc. ]
	var tests = [ makeKey, sign, encrypt etc. ]
	for (language1 in languages) {
		for (test in tests) {
			var output = language1[test].generate()
			for (language2 in languages) {
				if (!language2[test].verify(output)) {
					throw exception
				}
			}
		}
	}

## add a language

If you know a language that isn't represented yet, go ahead and
make a pull request for that language. That would be awesome!

Have a look at the the [test.js](./test.js) file.

Each language needs to implement a set of functions which call
the command line to do whatever is needed to run the tests.

## testing with travis

The tests are run on [Travis CI](https://travis-ci.org), so if
you add a test you'll probable want to make sure to update the
[.travis.yml](./.travis.yml) file to use whatever settings are
needed for your langauge.

Read [here](https://docs.travis-ci.com/user/languages/) for
more information.

If you have to fiddle with the `.travis.yml` file, you might
want to be able to check it locally before committing. You can
read about it [here](https://docs.travis-ci.com/user/travis-lint/),
but basically you run this:

	gem install travis --no-rdoc --no-ri
	travis lint .travis.yml

## security review

If you understand cryptography pretty well, you should look at
the languages you know, and make sure they are doing the right
things!

If you find a problem, you can go ahead and [file an issue][issue]
right away. The sooner the better!

## license

All contents are licensed under the [Very Open License](veryopenlicense.com).

[issue]: https://github.com/sdmp/sdmp-language-tests/issues
