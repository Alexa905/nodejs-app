import db from "../models";
import {DirWatcher, Importer} from "./index";
import EventEmitter from "events";
import {usersData} from '../data/users';

const csvPath = 'data/MOCK_DATA.csv';
const eventName = 'dirwatcher:changed';
const Product = db.product;
const User = db.user;
const emitter = new EventEmitter();
const importer = new Importer(emitter, eventName);
const dirWather = new DirWatcher(emitter, eventName);

const transformData = data => data.filter(i => i).map(i => {i.id = Number(i.id);return i});

const fillDBTable = (data, dbModel ) =>{
	let promises = data.map(item => {
		return dbModel
			.findOrCreate({where: {id: item.id}, defaults: item})
			.spread((item, created) => {
				if (!created) {
					dbModel.update(item, {where: {id: item.id}})
				}
			})
	});

	Promise.all(promises)
		.then(x => console.log('Products were successfully added'))
		.catch(console.error);
}

const addProductsToDB = () => {
	const productData = importer.importSync(csvPath);
	const filteredData = transformData(productData);
	fillDBTable(filteredData, Product);
	fillDBTable(usersData, User);
};

addProductsToDB();

//dirWather.watch('./data');

emitter.on(eventName, () => {
	addProductsToDB();
});


