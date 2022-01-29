export function transformRow(row) {
	let result = []
	if (row[0] <= 4) { result.push(4); }
	else if (row[0] > 4 && row[0] < 7) { result.push(3); }
	else if (row[0] >= 7 && row[0] < 11) { result.push(2); }
	else { result.push(1) }

	if (row[1] >= 10) { result.push(4) }
	else if (row[1] >= 8 && row[1] < 10) { result.push(3) }
	else if (row[1] >= 6 && row[1] < 8) { result.push(2) }
	else { result.push(1) }

	if (row[2] > 1000000) { result.push(1) }
	else if (row[2] >= 700000 && row[2] < 1000000) { result.push(2) }
	else if (row[2] >= 400000 && row[2] < 700000) { result.push(3) }
	else { result.push(4) }

	if (row[3] == 'car') { result.push(2) }
	else { result.push(1) }

	if (row[4] == 'outdoor') { result.push(2) }
	else { result.push(1) }

	result.push(row[5])
	// if (row[5] == 12) { result.push(2) }
	// else { result.push(1) }

	return result
}

export function topsis({ data, weights }) {
	const totalWeights = weights.reduce((a, b) => a + b, 0)
	// const normalizedWeights = weights.map(w => w / totalWeights);
	const normalizedWeights = [100, 1, 1, 1, 1, 1];

	const MIN = 0;
	const MAX = 100;

	const customWeights = normalizedWeights.map(w => w * MAX);

	const temp_1 = data.map(row => {
		return row.map(x => Math.pow(x, 2))
	});
	const C = [ 0, 0, 0, 0, 0, 0 ]
	for (let i = 0; i < 6; i++) {
		C[i] = Math.sqrt(
			Math.pow(
				temp_1.map(row => row[i])
					.reduce((curr, prev) => curr + prev, 0),
				2
			)
		);
	}

	const M = data.map(row =>
		row.map((x, j) => x / C[j])
	)
	// console.log('normalizedWeights')
	// console.log(normalizedWeights)
	// console.log('M')
	// console.log(M)

	const MW = M.map(row =>
		row.map((x, j) => x * normalizedWeights[j])
	)


	// const cost = [ true, ]
	const IDEAL = {
		'-': [ 0, 0, 0, 0, 0, 0 ],
		'+': [ 0, 0, 0, 0, 0, 0 ],
	}
	for (let i = 0; i < 6; i++) {
		const subs = MW.map(row => row[i])
		const x_min = Math.min(...subs)
		const x_max = Math.max(...subs)
		IDEAL['-'][i] = x_min
		IDEAL['+'][i] = x_max
	}

	const D_plus =  MW.map(row => 
		Math.sqrt(row
			.map((x, j) => Math.pow(x - IDEAL['+'][j], 2))
			.reduce((a, b) => a + b, 0))
	)
	console.log('D_plus')
	console.log(D_plus)
	const D_min =   MW.map(row => 
		Math.sqrt(row
			.map((x, j) => Math.pow(x - IDEAL['-'][j], 2))
			.reduce((a, b) => a + b, 0))
	)
	console.log('D_min')
	console.log(D_min)
	

	let prefs = D_min.map((x, i) => x / (x + D_plus[i]))
	console.log('prefs')
	console.log(prefs)
	prefs = prefs.map((p, i) => ({
		p,
		i
	}))
	// order change, record original order
	prefs.sort((a, b) => a.p - b.p);
	prefs.reverse();
	const results = prefs.map((data, i) => {
		return {
			p: data.p * (prefs.length - i),
			i: data.i
		}
	})
	return results;
}