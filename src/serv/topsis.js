export function transformRow(row) {
	let result = []
	if (row[0] < 4) { result.push(4); }
	else if (row[0] >= 4 && row[0] < 7) { result.push(3); }
	else if (row[0] >= 7 && row[0] < 11) { result.push(2); }
	else { result.push(1) }

	if (row[1] >= 10 && row[1] < 12) { result.push(4) }
	else if (row[1] >= 8 && row[1] < 10) { result.push(3) }
	else if (row[1] >= 6 && row[1] < 8) { result.push(2) }
	else { result.push(1) }

	if (row[2] > 1000000) { result.push(4) }
	else if (row[2] >= 700000 && row[2] < 1000000) { result.push(3) }
	else if (row[2] >= 400000 && row[2] < 700000) { result.push(2) }
	else { result.push(1) }

	if (row[3] == 'car') { result.push(3) }
	else if (row[3] == 'rental-car') { result.push(2) }
	else { result.push(1) }

	if (row[4] == 'outdoor') { result.push(4) }
	else { result.push(2) }

	if (row[5] < 12) { result.push(4) }
	else { result.push(2) }

	return result
}

export function topsis({ data, weights }) {
	// console.log(data)
	const temp_1 = data.map(row => {
		return row.map(x => Math.pow(x, 2))
	});
	const C = [ 0, 0, 0, 0, 0, 0 ]
	for (let i = 0; i < 6; i++) {
		C[i] = Math.sqrt(temp_1.map(row => row[i])
			.reduce((curr, prev) => curr + prev, 0));
	}

	const M = data.map(row =>
		row.map((x, j) => x / C[j])
	)

	const MW = M.map(row =>
		row.map((x, j) => x * weights[j])
	)


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
	const D_min =   MW.map(row => 
		Math.sqrt(row
			.map((x, j) => Math.pow(x - IDEAL['-'][j], 2))
			.reduce((a, b) => a + b, 0))
	)
	

	let prefs = D_min.map((x, i) => x / (x + D_plus[i]))
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