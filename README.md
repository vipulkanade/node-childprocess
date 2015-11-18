childProcess
=====

Minimal child process manager for NodeJS.


## Main Features
- No dependencies
- Lightweight

## API

### Constructor

```js
var variableName = require('childProcess')({
	// Command to execute
	command: '',
	// [Optional] Command arguments (same as nodejs.org/api/child_process.html)
	args: ['', ''],
	// [Optional] Extra Options (same as nodejs.org/api/child_process.html)
	options: [],
	// [Optional] true if you need Auto Restart
	autoRestart: false,
	// [Optional] Timeout between restart's in millisecond
	restartTimeout: 500,
	// [Optional] Callback when the process is Auto-restarted
	callbackRestart: function(data){ console.log('restart '+data)},
	// [Optional] On Output
	callbackStdout: function(data){ console.log('out '+data)},
	// [Optional] On Error
	callbackStderr: function(data){ console.log('err '+data)},
	// [Optional] On Exit
	callbackClose: function(exitCode){ console.log('bye '+exitCode)},
})
```

### .start(callback)
```js
variableName.start(function(pid){ console.log('variableName is now up with pid: '+ pid) })
```

### .stop(callback, termSignal)
```js
variableName.stop(function(code){ console.log('variableName is now stopped') })
```

### .restart(callback, termSignal)
```js
variableName.restart(function(code){ console.log('variableName has restarted') })
```


---
## License

(The MIT License)

Copyright (c) 2015 Vipul Kanade


Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:


The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.


THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
