module.exports = {
	up(q, Sequelize) {
		return q.createTable('user', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {type: Sequelize.DATE},
			updatedAt: {type: Sequelize.DATE},
			firstName: {type: Sequelize.STRING},
			lastName: {type: Sequelize.STRING},
			password: {type: Sequelize.STRING}
		})
	},

	down(q) {
		return q.dropTable('user')
	}
}
