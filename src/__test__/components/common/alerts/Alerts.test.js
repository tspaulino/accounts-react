import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import Alert from '../../../../components/common/alerts/Alert'
import { Alerts } from '../../../../components/common/alerts/Alerts'

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

describe('<Alert />', () => {
  it('should render component', () => {
    const wrapper = shallow(<Alerts {...props} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.is('.alerts')).toBeTruthy()
    expect(wrapper.find(Alert).length).toEqual(3)
  })
})
