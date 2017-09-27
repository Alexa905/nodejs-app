import fs from 'fs'
import  emitter  from '../eventEmitter.js'

class DirWatcher {
	constructor(path, delay = 1000) {
		if (path) {
			fs.watchFile(path, {interval: delay}, () => {
				emitter.emit('dirchange', path)
			})
		}
	}
}


export {DirWatcher}