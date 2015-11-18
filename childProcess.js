module.exports = function(_usrOption) {

	var _object = {}, _childProcess = {}, _callbackStop, _stopOrder = false

	var options = {
		command: _usrOption.command || false,
		arguments: _usrOption.args || null,
		options: _usrOption.options || [],

		autoRestart: _usrOption.autoRestart || false,
		restartTimeout: _usrOption.restartTimeout || 200,

		callbackRestart: _usrOption.callbackRestart || function(data) {},

		callbackStandardOutput: _usrOption.callbackStdout || null,
		callbackStandardError: _usrOption.callbackStderr || null,
		callbackClose: _usrOption.callbackClose || function(data) {},
	}

	_object.start = function(callback) {
		// Set Stop Order to False if set true by previuos child process restarting
		_stopOrder = false;

		// creating child process, spawn let's us create child processes which the parent thread can control
		// creating child process exec doesn't allow parent to control it.
		_childProcess = require('child_process').spawn(options.command, options.arguments, options.options);

		if (options.callbackStandardOutput)
			_childProcess.stdout.on('data', options.callbackStandardOutput)

		if (options.callbackStandardError)
			_childProcess.stderr.on('data', options.callbackStandardError)

		_childProcess.on('close', function(code) {

			// Default close callback
			options.callbackClose(code)

			// check if Callback is needed to be stopped. Stop if true.	
			if (_stopOrder == true)
				_callbackStop(code);

			// Check if Auto Restart
			if (_stopOrder == false && options.autoRestart == true) {
				// AutoRestart callback
				options.callbackRestart(code)
				setTimeout(_object.start, options.restartTimeout)
			}
		})
		if (callback)
			callback(_childProcess.pid)
	}

	_object.stop = function(callback, termSignal) {
		_stopOrder = true
		_callbackStop = callback || function() {}
		_childProcess.kill(termSignal || 'SIGTERM')
	}

	_object.restart = function(callback, termSignal) {
		// Stop
		_object.stop(function() {

			// Wait and start again
			setTimeout(function() {
				_object.start();
				if (callback) callback();
			}, options.restartTimeout);

		}, termSignal);
	}

	return _object;
}