import { create } from 'axios'

export const api = create({
  baseURL: 'http://localhost:5000/v1/api'
})
