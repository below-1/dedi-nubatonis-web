import gql from 'graphql-tag'

export const signup = gql`
  mutation signup($payload: SignupPayload!) {
    signup(payload: $payload)
  }
`

export const login = gql`
  mutation login($payload: LoginPayload!) {
    login(payload: $payload)
  }
`
