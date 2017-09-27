import * as configs from './config/config.json'
import { User, Product }  from './models'
import { DirWatcher, Importer }  from './modules'


console.log(`Application name: ${configs['app-name']}`);
const user = new User();
const product = new Product();
const dirWather = new DirWatcher('./data', 2000);
const importer = new Importer();
importer.importAsync('data/data.csv')
importer.importSync('data/data.csv');
console.log(2222)


