import { SubmissionError } from 'redux-form'
import { formErrorHandler, requestErrorHandler } from '../../utils/errors'

describe('Errors Util', () => {
  describe('#requestErrorHandler', () => {
    it('given a request error, it should return a request type error', () => {
      const error = requestErrorHandler({
        request: {
          request: 'Any possible request error',
          extra: 'extra'
        }
      })
      expect(error).toEqual({
        message: 'Request error',
        type: 'request'
      })
    })

    it('given an error object, it should return a request type error', () => {
      const error = requestErrorHandler(new Error('Something went wrong'))
      expect(error).toEqual({
        message: 'Something went wrong',
        type: 'request'
      })
    })

    it('given a general response error, it should return a response type error', () => {
      const error = requestErrorHandler({
        response: { data: { message: 'Oops' } }
      })
      expect(error).toEqual({
        message: 'Oops',
        type: 'response'
      })
    })

    it('given a validation response error, it should return a validation type error', () => {
      const error = requestErrorHandler({
        response: {
          data: {
            message: 'Oops',
            errors: {
              name: {
                message: 'Invalid name',
                validator: 'invalid'
              }
            }
          }
        }
      })
      expect(error).toEqual({
        validation: {
          name: ['Invalid name']
        },
        type: 'validation'
      })
    })
  })

  describe('#formErrorHandler', () => {
    it('given a general response error, it should return a form error', async () => {
      const responseError = requestErrorHandler({
        response: { data: { message: 'Oops' } }
      })

      try {
        await formErrorHandler(responseError)
      } catch (e) {
        expect(e).toBeInstanceOf(SubmissionError)
        expect(e.errors).toEqual({ formError: 'Oops' })
      }
    })

    it('given a validation response error, it should return a form error', async () => {
      const responseError = requestErrorHandler({
        response: {
          data: {
            message: 'Oops',
            errors: {
              name: {
                message: 'Invalid name',
                validator: 'invalid'
              }
            }
          }
        }
      })

      try {
        await formErrorHandler(responseError)
      } catch (e) {
        expect(e).toBeInstanceOf(SubmissionError)
        expect(e.errors).toEqual({ name: ['Invalid name'] })
      }
    })
  })
})
