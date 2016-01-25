var spawn = require('child_process').spawn

function fixOptions(options) {
    if (typeof options === 'string') {
        options = {
            command: options
        }
    }
    if (typeof options.command === 'string') {
        options.command = options.command.split(' ')
    }
    if (options.input && typeof options.input === 'string') {
        options.input = new Buffer(options.input, 'utf8')
    }
    return options
}

module.exports = function(program) {
    return function(options, callback) {
        options = fixOptions(options)

        var cmd = spawn(program, options.command)
        var output = {
            data: { result: [], length: 0 },
            error: { result: [], length: 0 }
        }

        function handle(key) {
            return function(d) {
                output[key].result.push(d)
                output[key].length += d.length
            }
        }

        function done(obj) {
            var data = Buffer.concat(obj.result, obj.length)
            return options.leaveAsBuffer ? data : data.toString('utf8')
        }

        cmd.stdout.on('data', handle('data'))
        cmd.stdout.on('error', handle('error'))
        cmd.stderr.on('data', handle('error'))
        cmd.stderr.on('error', handle('error'))

        cmd.on('close', function(code) {
            console.log('CLOSED CMD')
            if (code === 0) {
                callback(false, done(output.data))
            } else {
                callback(done(output.error))
            }
        })

        if (options.input) {
            cmd.stdin.write(options.input)
        }
        cmd.stdin.end()
    }
}