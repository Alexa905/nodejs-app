module.exports = function (sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		firstName: {type: DataTypes.STRING},
		lastName: {type: DataTypes.STRING, unique: {msg: 'This last name already exists'}},
		password: {type: DataTypes.STRING},
	}, {
		freezeTableName: true
	})
}
