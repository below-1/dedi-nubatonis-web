const defaultWeights = {
	distance: 1,
	transportation: 1,
	price: 1,
	theme: 1,
	waktu: 1,
	numberOfSpots: 1
}
export function changeWeights(criteriaKeys) {
	let result = { ...defaultWeights }
	criteriaKeys.forEach(k => {
		result[k] = 10
	})
	return result
}

export function asArray(weights) {
	return [
		weights.distance,
		weights.numberOfSpots,
		weights.price,
		weights.transportation,
		weights.theme,
		weights.waktu
	]
}