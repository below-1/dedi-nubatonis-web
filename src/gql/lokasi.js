import gql from 'graphql-tag'

export const dataFragment = gql`
  fragment LocationData on Location {
    nama
    harga
    latitude
    longitude
    spots
    waktu
  }
`

export const create = gql`
  mutation CreateLocation($payload: LocationInput!) {
    createLocation(
      input: {
        location: $payload
    }) {
      location {
        id
        ...LocationData
      }
    }
  }
  ${dataFragment}
`

export const find = gql`
  query getLokasi {
    locations {
      nodes {
        id
        ...LocationData
      }
    }
  }
  ${dataFragment}
`
