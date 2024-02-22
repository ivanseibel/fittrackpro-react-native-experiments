import { tokenStorageGet } from '@storage/tokenStorage'
import { AppError } from '@utils/AppError'
import axios, { AxiosInstance } from 'axios'

type SignOut = () => void

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void
}

const api = axios.create({
  baseURL: 'http://10.10.127.117:3333',
}) as APIInstanceProps

api.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (responseError) => {
      if (responseError?.response?.status === 401) {
        if (
          ['token.expired', 'token.invalid'].includes(
            responseError.response.data?.message,
          )
        ) {
          const tokenObject = await tokenStorageGet()

          if (!tokenObject?.refreshToken) {
            signOut()
            return Promise.reject(responseError)
          }
        }

        signOut()
      }

      if (responseError.response && responseError.response.data) {
        return Promise.reject(new AppError(responseError.response.data.message))
      } else {
        return Promise.reject(responseError)
      }
    },
  )

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}

export { api }
