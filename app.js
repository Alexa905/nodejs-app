import * as configs from './config/config.json'
import { User, Product }  from './models'
import { DirWatcher, Importer }  from './modules'
import EventEmitter from 'events'

const emitter =  new EventEmitter();
const eventName = 'dirwatcher:changed';


console.log(`Application name: ${configs['app-name']}`);

const user = new User();
const product = new Product();

const dirWather = new DirWatcher(emitter, eventName);
const importer = new Importer(emitter, eventName);

dirWather.watch('./data', 3000);
importer.importAsync('data/data.csv').then(data =>{
	console.log('Imported async data: \n', data);
});

const importedData = importer.importSync('data/data.csv');
console.log('Imported async data: \n', importedData);




