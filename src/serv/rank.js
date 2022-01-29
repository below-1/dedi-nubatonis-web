import { api } from './axios';
import { topsis, transformRow } from '@quick/serv/topsis'

async function getLocations() {
	try {
		const response = await api.get('/v1/api/locations');
		return response.data;
	} catch (err) {
		console.log(err);
	}
}

function convertLocationToAlternative(locations) {
	return locations
		.map(location => {
			return [
				location.distance,
	      location.numberOfSpots,
	      parseInt(location.price.$numberDecimal),
	      location.transportation,
	      location.theme,
	      location.waktu
			]
		})
		.map(transformRow);
}

export default async function rank(weights) {
	const locations = await getLocations();
	const alternatives = convertLocationToAlternative(locations);
  const W = Object.keys(weights).map(key => {
    const personWeights = weights[key];
    const weightsArray = [
      personWeights.distance,
      personWeights.numberOfSpots,
      personWeights.price,
      personWeights.transportation,
      personWeights.theme,
      personWeights.waktu
    ];
    return weightsArray;
  });

  let topsisResults = []
  const N_PREFERENCE = W.length;

  for (let indexOfPreference = 0; indexOfPreference < N_PREFERENCE; indexOfPreference++) {
    const ranked = topsis({ data: alternatives, weights: W[indexOfPreference] });
    topsisResults.push(ranked)
  }
  console.log(locations);
  console.log('topsisResults');
  console.log(topsisResults);

  const N_ALT = locations.length;

  // Alternatif Index
  let bordaResults = []
  for (let i = 0; i < N_ALT; i++) {
    let bordaAltRow = []
    // Ranking Index
    for (let j = 0; j < N_ALT; j++) {
      let bordaCell = 0
      topsisResults.forEach(topsisPrefResult => {
        if (topsisPrefResult[j].i == i) {
          bordaCell += topsisPrefResult[j].p * (N_ALT - j - 1)
        }
      })
      bordaAltRow.push(bordaCell)
    }
    bordaResults.push(bordaAltRow.reduce((a, b) => a + b, 0))
  }

  const totalBordaPoints = bordaResults.reduce((a, b) => a + b, 0)
  const bordaNormalized = bordaResults.map(x => x / totalBordaPoints)
  const bordaPacked = bordaNormalized.map((b, i) => {
    return {
      b,
      i
    }
  })
  bordaPacked.sort((a, b) => a.b - b.b)
  bordaPacked.reverse()
  const chosenAlternative = bordaPacked[0];
  const chosenLocation = locations[chosenAlternative.i];
  const chosenWeight = chosenAlternative.b;
  const result = {
  	location: chosenLocation,
  	borda: chosenWeight
  };
  return result;
}