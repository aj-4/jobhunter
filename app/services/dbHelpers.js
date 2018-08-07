
const insertWorkflow = (workflow) => {

}


const findOrCreateCompany = (model, conditions) => {
	return model.findOrCreate({where: conditions})
	.spread((created, found) => {
		if (created) {
			console.log('created is', created);
			return created;
		} else {
			console.log(`found entry for model`);
			return found;
		}
	})
}

module.exports = {
	insertWorkflow,
	findOrCreateCompany
}