export interface UserRequest {
  user: {
    iss: string
    sub: string
    aud: string[]
    iad: number
    exp: number
    azp: string
    scope: string
  }
}