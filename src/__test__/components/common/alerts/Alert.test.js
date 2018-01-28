import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Message, Icon } from 'semantic-ui-react'
import Alert from '../../../../components/common/alerts/Alert'

const setup = () => {
  const props = {
    revokeAlert: sinon.spy(),
    id: 'id',
    type: 'error',
    message: 'Some error'
  }

  return shallow(<Alert {...props} />)
}

describe('<Alert />', () => {
  it('should match snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a Message comp with error prop', () => {
    const wrapper = setup()
    expect(wrapper.find(Message).prop('error')).toBeTruthy()
  })

  it('should render an Icon comp with name prop', () => {
    const wrapper = setup()
    expect(wrapper.find(Icon).prop('name')).toEqual('warning')
  })

  it('should render the alert message text', () => {
    const wrapper = setup()
    expect(wrapper.find(Message).render().text()).toEqual('Some error')
  })

  it('should should not rerender when new props are set', () => {
    const wrapper = setup()
    wrapper.setProps({ type: 'success' })
    expect(wrapper.find(Message).prop('error')).toBeTruthy()
  })
})
