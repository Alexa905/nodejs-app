module.exports = function (sequelize, DataTypes) {
	return sequelize.define('product', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: true,
			primaryKey: true
		},
		name: {type: DataTypes.STRING(501)},
		brand: {type: DataTypes.STRING(501)},
		company: {type: DataTypes.STRING(501)},
		price: {type: DataTypes.STRING},
		isbn: {type: DataTypes.STRING}
	})
}
