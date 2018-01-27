import nock from 'nock'
import mockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, {
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  AUTHENTICATE_REQUEST,
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_ERROR,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  LOST_PASSWORD_REQUEST,
  LOST_PASSWORD_SUCCESS,
  LOST_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  SIGN_OUT,
  authenticate,
  signIn,
  signUp,
  lostPassword,
  signOut,
  resetPassword
} from '../../redux/auth'

import { apiUrl } from '../../config'

const mockedStore = mockStore([thunk])

describe('Auth Redux', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('Action creators', () => {
    describe('#authenticate', () => {
      it('should authenticate an user successfuly and return a success action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: AUTHENTICATE_REQUEST },
          {
            type: AUTHENTICATE_SUCCESS,
            payload: { user: { email: 'foo@gmail.com' } }
          }
        ]

        nock(apiUrl).get('/user').reply(200, { user: { email: 'foo@gmail.com' } })

        await store.dispatch(authenticate())
        expect(store.getActions()).toEqual(actions)
      })

      it('should fail user authentication and return an error action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: AUTHENTICATE_REQUEST },
          {
            type: AUTHENTICATE_ERROR,
            payload: {
              error: {
                message: 'Something is not right',
                type: 'response'
              }
            }
          }
        ]

        nock(apiUrl).get('/user').reply(400, { message: 'Something is not right' })

        try { await store.dispatch(authenticate()) }
        catch (e) {
          expect(Object.keys(e)).toEqual(['type', 'message'])
        }
        finally {
          expect(store.getActions()).toEqual(actions)
        }
      })
    })

    describe('#signIn', () => {
      it('given good user credentials, it should store token, authenticate and return success actions', async () => {
        const store = mockedStore({})
        const actions = [
          { type: SIGN_IN_REQUEST },
          {
            type: SIGN_IN_SUCCESS,
            payload: { token: '123.123.123' }
          },
          { type: AUTHENTICATE_REQUEST },
          {
            type: AUTHENTICATE_SUCCESS,
            payload: { user: { email: 'foo@gmail.com' } }
          }
        ]

        const creds = {
          email: 'myemail@gmail.com',
          password: '12345'
        }

        nock(apiUrl).post('/sign-in', creds).reply(200, { token: '123.123.123' })
        nock(apiUrl).get('/user').reply(200, { user: { email: 'foo@gmail.com' } })

        await store.dispatch(signIn(creds))
        expect(store.getActions()).toEqual(actions)
      })

      it('given bad user credentials, it should fail return an error action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: SIGN_IN_REQUEST },
          {
            type: SIGN_IN_ERROR,
            payload: {
              error: {
                message: 'Something is not right',
                type: 'response'
              }
            }
          }
        ]

        nock(apiUrl).post('/sign-in').reply(400, { message: 'Something is not right' })

        try { await store.dispatch(signIn()) }
        catch (e) {
          expect(Object.keys(e)).toEqual(['type', 'message'])
        }
        finally {
          expect(store.getActions()).toEqual(actions)
        }
      })
    })

    describe('#signUp', () => {
      it('given good user data, it should store token, authenticate and return success actions', async () => {
        const store = mockedStore({})
        const actions = [
          { type: SIGN_UP_REQUEST },
          {
            type: SIGN_UP_SUCCESS,
            payload: { token: '123.123.123' }
          },
          { type: AUTHENTICATE_REQUEST },
          {
            type: AUTHENTICATE_SUCCESS,
            payload: { user: { email: 'foo@gmail.com' } }
          }
        ]

        const user = {
          email: 'myemail@gmail.com',
          password: '12345',
          name: 'My name'
        }

        nock(apiUrl).post('/sign-up', user).reply(200, { token: '123.123.123' })
        nock(apiUrl).get('/user').reply(200, { user: { email: 'foo@gmail.com' } })

        await store.dispatch(signUp(user))
        expect(store.getActions()).toEqual(actions)
      })

      it('given bad user data, it should return an error action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: SIGN_UP_REQUEST },
          {
            type: SIGN_UP_ERROR,
            payload: {
              error: {
                message: 'Something is not right',
                type: 'response'
              }
            }
          }
        ]

        nock(apiUrl).post('/sign-up').reply(400, { message: 'Something is not right' })

        try { await store.dispatch(signUp()) }
        catch (e) {
          expect(Object.keys(e)).toEqual(['type', 'message'])
        }
        finally {
          expect(store.getActions()).toEqual(actions)
        }
      })
    })

    describe('#lostPassword', () => {
      it('given a valid email, it should start recovering process and return a success action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: LOST_PASSWORD_REQUEST },
          { type: LOST_PASSWORD_SUCCESS }
        ]

        const user = {
          email: 'myemail@gmail.com',
          callbackUrl: 'http://localhost:5000/reset-password'
        }

        nock(apiUrl).post('/lost-password', user).reply(204, {})

        await store.dispatch(lostPassword(user.email))
        expect(store.getActions()).toEqual(actions)
      })

      it('given an invalid email, it should return an error action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: LOST_PASSWORD_REQUEST },
          {
            type: LOST_PASSWORD_ERROR,
            payload: {
              error: {
                message: 'Something is not right',
                type: 'response'
              }
            }
          }
        ]

        nock(apiUrl).post('/lost-password').reply(400, { message: 'Something is not right' })

        try { await store.dispatch(lostPassword()) }
        catch (e) {
          expect(Object.keys(e)).toEqual(['type', 'message'])
        }
        finally {
          expect(store.getActions()).toEqual(actions)
        }
      })
    })

    describe('#resetPassword', () => {
      it('given a valid password/token, it should reset password and return a success action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: RESET_PASSWORD_REQUEST },
          { type: RESET_PASSWORD_SUCCESS }
        ]

        const user = {
          password: '12345',
          token: '123'
        }

        nock(apiUrl).post('/reset-password', user).reply(204, {})

        await store.dispatch(resetPassword(user))
        expect(store.getActions()).toEqual(actions)
      })

      it('given an invalid password/token, it should return an error action', async () => {
        const store = mockedStore({})
        const actions = [
          { type: RESET_PASSWORD_REQUEST },
          {
            type: RESET_PASSWORD_ERROR,
            payload: {
              error: {
                message: 'Something is not right',
                type: 'response'
              }
            }
          }
        ]

        nock(apiUrl).post('/reset-password').reply(400, { message: 'Something is not right' })

        try { await store.dispatch(resetPassword()) }
        catch (e) {
          expect(Object.keys(e)).toEqual(['type', 'message'])
        }
        finally {
          expect(store.getActions()).toEqual(actions)
        }
      })
    })

    describe('#signOut', () => {
      it('should sign out the user and return a signOut action', () => {
        const action = signOut()
        expect(action.type).toEqual(SIGN_OUT)
      })
    })
  })

  describe('Reducer', () => {
    it('should set initial state values', () => {
      const state = reducer(undefined, {})
      expect(state).toEqual({
        currentUser: null,
        error: null,
        status: 'idle',
        token: undefined
      })
    })

    describe('#AUTHENTICATE_REQUEST', () => {
      it('should update auth status to "connecting" and reset current user/errors', () => {
        const state = reducer(undefined, { type: AUTHENTICATE_REQUEST })

        expect(state.status).toEqual('connecting')
        expect(state.currentUser).toBeNull()
        expect(state.error).toBeNull()
      })
    })

    describe('#AUTHENTICATE_SUCCESS', () => {
      it('should update auth status to "connected" and set the current user', () => {
        const state = reducer(undefined, {
          type: AUTHENTICATE_SUCCESS,
          payload: { user: { email: 'foo@bar.com' } }
        })

        expect(state.status).toEqual('connected')
        expect(state.currentUser.email).toEqual('foo@bar.com')
      })
    })

    describe('#AUTHENTICATE_ERROR', () => {
      it('should update auth status to "disconnected" and set an error', () => {
        const state = reducer(undefined, {
          type: AUTHENTICATE_ERROR,
          payload: { error: { message: 'Oops' } }
        })

        expect(state.status).toEqual('disconnected')
        expect(state.error.message).toEqual('Oops')
      })
    })

    describe('#SIGN_IN_REQUEST', () => {
      it('should reset token/error', () => {
        const state = reducer(undefined, { type: SIGN_IN_REQUEST })

        expect(state.token).toBeNull()
        expect(state.error).toBeNull()
      })
    })

    describe('#SIGN_IN_SUCCESS', () => {
      it('should set a token', () => {
        const state = reducer(undefined, {
          type: SIGN_IN_SUCCESS,
          payload: { token: '123' }
        })

        expect(state.token).toEqual('123')
      })
    })

    describe('#SIGN_IN_ERROR', () => {
      it('should set an error', () => {
        const state = reducer(undefined, {
          type: SIGN_IN_ERROR,
          payload: { error: { message: 'Oops' } }
        })

        expect(state.error.message).toEqual('Oops')
      })
    })

    describe('#SIGN_UP_REQUEST', () => {
      it('should reset token/error', () => {
        const state = reducer(undefined, { type: SIGN_UP_REQUEST })

        expect(state.token).toBeNull()
        expect(state.error).toBeNull()
      })
    })

    describe('#SIGN_UP_SUCCESS', () => {
      it('should set a token', () => {
        const state = reducer(undefined, {
          type: SIGN_UP_SUCCESS,
          payload: { token: '123' }
        })

        expect(state.token).toEqual('123')
      })
    })

    describe('#SIGN_UP_ERROR', () => {
      it('should set an error', () => {
        const state = reducer(undefined, {
          type: SIGN_UP_ERROR,
          payload: { error: { message: 'Oops' } }
        })

        expect(state.error.message).toEqual('Oops')
      })
    })

    describe('#LOST_PASSWORD_REQUEST', () => {
      it('should reset error', () => {
        const state = reducer(undefined, { type: LOST_PASSWORD_REQUEST })

        expect(state.error).toBeNull()
      })
    })

    describe.skip('#LOST_PASSWORD_SUCCESS', () => {
      it.skip()
    })

    describe('#LOST_PASSWORD_ERROR', () => {
      it('should set an error', () => {
        const state = reducer(undefined, {
          type: LOST_PASSWORD_ERROR,
          payload: { error: { message: 'Oops' } }
        })

        expect(state.error.message).toEqual('Oops')
      })
    })

    describe('#RESET_PASSWORD_REQUEST', () => {
      it('should reset error', () => {
        const state = reducer(undefined, { type: RESET_PASSWORD_REQUEST })

        expect(state.error).toBeNull()
      })
    })

    describe.skip('#RESET_PASSWORD_SUCCESS', () => {
      it.skip()
    })

    describe('#RESET_PASSWORD_ERROR', () => {
      it('should set an error', () => {
        const state = reducer(undefined, {
          type: RESET_PASSWORD_ERROR,
          payload: { error: { message: 'Oops' } }
        })

        expect(state.error.message).toEqual('Oops')
      })
    })

    describe('#SIGN_OUT', () => {
      it('should update auth status to "disconnected" and reset token', () => {
        const state = reducer(undefined, { type: SIGN_OUT })

        expect(state.status).toEqual('disconnected')
        expect(state.token).toBeNull()
      })
    })
  })
})
