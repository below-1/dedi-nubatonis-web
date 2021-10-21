import gql from 'graphql-tag'

export const dataFragment = gql`
  fragment FotograferData on Photographer {
    nama
    facebook
    instagram
    description
  }
`

export const create = gql`
  mutation CreateFotografer($payload: PhotographerInput!) {
    createPhotographer(input: {
      photographer: $payload
    }) {
      photographer {
        id
        ...FotograferData
      }
    }
  }
  ${dataFragment}
`

export const update = gql`
  mutation updateFotografer($payload: PhotographerPatch!) {
    updatePhotographer(input: {
      patch: $payload
    }) {
      photographer {
        id
        ...FotograferData
      }
    }
  }
  ${dataFragment}
`

export const getOne = gql`
  query getOneFotografer ($id: Int!) {
    photographer(id: $id) {
      id
      ...FotograferData
    }
  }
  ${dataFragment}
`

export const find = gql`
  query getFotografer {
    photographers {
      nodes {
        id
        ...FotograferData
      }
    }
  }
  ${dataFragment}
`