import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import merge from 'lodash/merge'
import { Redirect, Route } from 'react-router-dom'

import { AppRoute } from '../../../components/routes/Route'

const authenticateSpy = sinon.stub()
const emitAlertSpy = sinon.spy()

const setup = (props) => {
  const defaultProps = {
    authenticated: false,
    auth: { status: 'idle' },
    actions: {
      authenticate: authenticateSpy,
      emitAlert: emitAlertSpy
    },
  }

  return shallow(<AppRoute {...merge(defaultProps, props)} />)
}

describe('<Route />', () => {
  describe('for non authenticated routes', () => {
    it('should render a Route comp with its props', () => {
      const wrapper = setup()
      expect(wrapper.find(Route).length).toEqual(1)
    })
  })

  describe('for authenticated routes', () => {
    it('should render nothing when status is "idle"', () => {
      authenticateSpy.resolves()
      const wrapper = setup({ authenticated: true })
      expect(wrapper.isEmptyRender()).toBeTruthy()
      expect(authenticateSpy.called).toBeTruthy()
    })

    it('should render nothing when status is "connecting"', () => {
      authenticateSpy.resolves()
      const wrapper = setup({ authenticated: true, auth: { status: 'conneting' } })
      expect(wrapper.isEmptyRender()).toBeTruthy()
      expect(authenticateSpy.called).toBeTruthy()
    })

    it('should render a Route comp when status is "connected"', () => {
      authenticateSpy.resolves()
      const wrapper = setup({ authenticated: true, auth: { status: 'connected' } })
      expect(authenticateSpy.called).toBeTruthy()
      expect(wrapper.find(Route).length).toEqual(1)
    })

    it('should render a Redirect comp when status is "disconnected"', async () => {
      authenticateSpy.rejects()
      const wrapper = await setup({ authenticated: true, auth: { status: 'disconnected' } })
      expect(authenticateSpy.called).toBeTruthy()
      expect(wrapper.find(Redirect).length).toEqual(1)
      expect(emitAlertSpy.calledWith('notAuthenticated')).toBeTruthy()
    })
  })
})
