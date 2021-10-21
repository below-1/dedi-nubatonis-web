import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

export default function useCreate(payload) {
  return useMutation(gql`
    mutation CreateFotografer($payload: PhotographerInput!) {
      createPhotographer(input: {
        photographer: $payload
      }) {
        photographer {
          id
        }
      }
    } 
  `)
}
