
const insertWorkflow = (workflow) => {

}


const findOrCreateCompany = (model, conditions) => {
	return model.findOrCreate({where: conditions})
	.spread((created, found) => {
		if (created) {
			return created;
		} else {
			return found;
		}
	})
}

module.exports = {
	insertWorkflow,
	findOrCreateCompany
}