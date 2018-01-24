import getAlert from '../../utils/alerts'

describe('Alerts Util', () => {
  describe('#default', () => {
    it('given an object with message key, it should return a formatted alert message', () => {
      const alert = getAlert({
        id: 'id',
        message: 'A message'
      })

      expect(alert).toEqual({
        id: 'id',
        message: 'A message',
        type: 'error'
      })
    })

    it('given an object with message and type keys, it should return a formatted alert message', () => {
      const alert = getAlert({
        id: 'id',
        message: 'A message',
        type: 'type'
      })

      expect(alert).toEqual({
        id: 'id',
        message: 'A message',
        type: 'type'
      })
    })

    it('given an object with extraneous keys, it should return a formatted alert message', () => {
      const alert = getAlert({
        id: 'id',
        message: 'A message',
        type: 'type',
        extra: 'extra'
      })

      expect(alert).toEqual({
        id: 'id',
        message: 'A message',
        type: 'type'
      })
    })

    it('given invalid args, it should return a default formatted alert message', () => {
      [null, undefined, [], {}, '', 'nothing'].forEach((item) => {
        const alert = getAlert(item)
        expect(alert.message).toEqual('An error ocurred, please try again later')
        expect(alert.type).toEqual('error')
      })
    })

    it('given no args, it should return a default formatted alert message', () => {
      const alert = getAlert()
      expect(alert.message).toEqual('An error ocurred, please try again later')
      expect(alert.type).toEqual('error')
    })

    it('given A valid string key, it should return a corresponding formatted alert message', () => {
      const alert = getAlert('fieldErrors')
      expect(alert.message).toEqual('Please solve the errors bellow')
      expect(alert.type).toEqual('error')
    })
  })
})
