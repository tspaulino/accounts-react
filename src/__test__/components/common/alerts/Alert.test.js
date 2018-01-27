import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Message, Icon } from 'semantic-ui-react'
import Alert from '../../../../components/common/alerts/Alert'

const props = {
  revokeAlert: sinon.spy(),
  id: 'id',
  type: 'error',
  message: 'Some error'
}

describe('<Alert />', () => {
  it('should render component', () => {
    const wrapper = shallow(<Alert {...props} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Message).prop('error')).toBeTruthy()
    expect(wrapper.find(Icon).prop('name')).toEqual('warning')
    expect(wrapper.find(Message).render().text()).toEqual('Some error')

    // Make sure the component doesn't update
    wrapper.setProps({ type: 'success' })
    expect(wrapper.find(Message).prop('error')).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })
})
