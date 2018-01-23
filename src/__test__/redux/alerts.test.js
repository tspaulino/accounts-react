import reducer, {
  EMIT_ALERT,
  REVOKE_ALERT,
  emitAlert,
  revokeAlert,
} from '../../redux/alerts'

describe('Alerts Redux', () => {
  describe('Action Creators', () => {
    describe('#emitAlert', () => {
      it('given a valid object, should return an action with a formatted alert message', () => {
        const alert = {
          message: 'An error message',
          id: 'id'
        }
        const action = emitAlert(alert)
        expect(action.type).toEqual(EMIT_ALERT)
        expect(action.payload).toEqual({
          id: 'id',
          message: 'An error message',
          type: 'error'
        })
      })
    })

    describe('#revokeAlert', () => {
      it('should return an action with an ID as payload', () => {
        const action = revokeAlert('foo')
        expect(action.type).toEqual(REVOKE_ALERT)
        expect(action.payload).toEqual({ id: 'foo' })
      })
    })
  })

  describe('Reducer', () => {
    it('Initial state values', () => {
      const state = reducer(undefined, {})
      expect(state).toEqual({ items: [] })
    })

    describe('#EMIT_ALERT', () => {
      it('should add a new alert object to items array', () => {
        const alert = {
          message: 'An error message',
          id: 'id',
          type: 'error'
        }

        const state = reducer(undefined, {
          type: EMIT_ALERT,
          payload: alert
        })

        expect(state.items.length).toEqual(1)
        expect(state.items[0]).toEqual(alert)
      })
    })

    describe('#EMIT_ALERT', () => {
      it('should add a new alert object to items array', () => {
        const alertItems = [{
          message: 'An error message',
          id: 'id1',
          type: 'error'
        },
        {
          message: 'An error message',
          id: 'id2',
          type: 'error'
        }]

        const state = reducer({
          items: alertItems
        }, {
          type: REVOKE_ALERT,
          payload: { id: 'id2' }
        })

        expect(state.items.length).toEqual(1)
        expect(state.items[0]).toEqual(alertItems[0])
      })
    })
  })
})
