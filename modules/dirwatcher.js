import fs from 'fs'

export class DirWatcher {
	constructor(emitter, eventName) {
		this.emitter = emitter;
		this.eventName = eventName;
	}
	watch(path, delay = 1000){
		if (path) {
			fs.watch(path,{recursive: true}, (eventName, fileName) => {
				setTimeout(() => {
					this.emitter.emit(this.eventName, fileName, path)
				}, delay)

			})
		}
	}
}
