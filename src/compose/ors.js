import ors from 'openrouteservice-js'

export default function useORS() {
  const Matrix = new ors.Matrix({ api_key: '5b3ce3597851110001cf6248b894943345a84b998fb6c7a79ba5d814' })
  
  async function calculateDistance(start, end, mode) {
    let orsMode = '';
    switch (mode) {
      case 'bike':
        orsMode = 'cycling-electric';
        break;
      case 'car':
        orsMode = 'driving-car';
        break;
      case 'rental-car':
        orsMode = 'driving-car';
        break;
      default:
        throw new Error(`unknown transportation mode: ${mode}`)
    }
    const response = await Matrix.calculate({
      locations: [start, end],
      profile: orsMode,
      sources: ['all'],
      destinations: ['all'],
      units: 'km',
      metrics: ['distance']
    })
    return response.distances[0][1]
  }

  return {
    calculateDistance
  }
}