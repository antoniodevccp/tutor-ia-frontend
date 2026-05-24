type AuthState = {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
}

const AUTH_KEY = 'auth_token'

export const authStore: AuthState = {
  token: localStorage.getItem(AUTH_KEY),

  setToken(token: string) {
    localStorage.setItem(AUTH_KEY, token)
    this.token = token
  },

  logout() {
    localStorage.removeItem(AUTH_KEY)
    this.token = null
  },
}