import * as configs from './config/config.json'
import { User, Product }  from './models'
import { DirWatcher, Importer }  from './modules'
import EventEmitter from 'events'
const csvPath = 'data/data.csv';

const emitter =  new EventEmitter();
const eventName = 'dirwatcher:changed';


console.log(`Application name: ${configs['app-name']}`);

const user = new User();
const product = new Product();

const dirWather = new DirWatcher(emitter, eventName);
const importer = new Importer(emitter, eventName);

dirWather.watch('./data', 3000);
importer.importAsync(csvPath).then(data =>{
	console.log('Imported async data: \n', data);
});

const importedData = importer.importSync(csvPath);
console.log('Imported async data: \n', importedData);




