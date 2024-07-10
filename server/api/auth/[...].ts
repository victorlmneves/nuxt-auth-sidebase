import Auth0Provider from 'next-auth/providers/auth0'
import { NuxtAuthHandler } from '#auth'

const {
  AUTH0_ENCRYPTION_SECRET,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_MEK_AUDIENCE,
  public: { isDeployed }
} = useRuntimeConfig()

const AUTH0_SCOPE =
  'openid profile email offline_access read:bsr:cmdm read:bsr:pc read:bsr:thunderhead read:bsr:permission read:bsr:pin'
const AUTH0_CHECKS = ['state']
const AUTH0_RESPONSE_TYPE = 'code'

export default NuxtAuthHandler({
  debug: !isDeployed,
  secret: AUTH0_ENCRYPTION_SECRET,
  providers: [
    Auth0Provider.default({
      id: 'auth0',
      clientSecret: AUTH0_CLIENT_SECRET,
      clientId: AUTH0_CLIENT_ID,
      issuer: AUTH0_ISSUER_BASE_URL,
      responseType: AUTH0_RESPONSE_TYPE,
      checks: AUTH0_CHECKS,
      scope: AUTH0_SCOPE,
      authorization: { params: { scope: AUTH0_SCOPE }, audience: AUTH0_MEK_AUDIENCE }
    })
  ]
})
