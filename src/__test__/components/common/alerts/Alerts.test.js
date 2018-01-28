import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Alert from '../../../../components/common/alerts/Alert'
import { Alerts } from '../../../../components/common/alerts/Alerts'

const setup = () => {
  const alerts = [{
    id: 'id1',
    type: 'error',
    message: 'Some error 1'
  },
  {
    id: 'id2',
    type: 'error',
    message: 'Some error 2'
  },
  {
    id: 'id3',
    type: 'error',
    message: 'Some error 3'
  }]

  const props = {
    items: alerts,
    actions: {
      revokeAlert: sinon.spy()
    }
  }

  return shallow(<Alerts {...props} />)
}

describe('<Alerts />', () => {
  it('should match snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a div with class .alerts', () => {
    const wrapper = setup()
    expect(wrapper.is('.alerts')).toBeTruthy()
    expect(wrapper.find('div').length).toEqual(1)
  })

  it('should render 3 <Alert /> comps with message/type/revokeAlert props', () => {
    const alerts = setup().find(Alert)

    expect(alerts.length).toEqual(3)
    expect(alerts.first().prop('message')).toBeTruthy()
    expect(alerts.first().prop('type')).toBeTruthy()
    expect(alerts.first().prop('revokeAlert')).toBeTruthy()
  })
})
