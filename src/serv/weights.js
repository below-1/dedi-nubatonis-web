const defaultWeights = {
	distance: 2,
	transportation: 2,
	price: 2,
	theme: 2,
	waktu: 2,
	numberOfSpots: 2
}
export function changeWeights(criteriaKeys) {
	let result = { ...defaultWeights }
	criteriaKeys.forEach(k => {
		result[k] = 4
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