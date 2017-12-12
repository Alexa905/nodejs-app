module.exports = {
	up(q, Sequelize) {
		return q.createTable('products', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true
			},
			createdAt: {type: Sequelize.DATE},
			updatedAt: {type: Sequelize.DATE},
			name: {type: Sequelize.STRING(501)},
			brand: {type: Sequelize.STRING(501)},
			company: {type: Sequelize.STRING},
			price: {type: Sequelize.STRING},
			isbn: {type: Sequelize.STRING}
		})
	},

	down(q) {
		return q.dropTable('products')
	}
}
