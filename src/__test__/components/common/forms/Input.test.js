import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { Form, List } from 'semantic-ui-react'
import Input from '../../../../components/common/forms/Input'

const setup = (newProps) => {
  const props = {
    revokeAlert: sinon.spy(),
    input: {
      name: 'email',
      value: ''
    },
    meta: {
      active: false,
      error: [],
      touched: false,
    },
    label: 'Email',
    type: 'text',
    ...newProps
  }

  return shallow(<Input {...props} />)
}


describe('<Input />', () => {
  it('should match snapshot', () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it('should render a Form Field comp', () => {
    const wrapper = setup()
    expect(wrapper.find(Form.Field)).toBeTruthy()
  })

  it('should render an Input comp with props', () => {
    const input = setup().find(Form.Input)
    expect(input.prop('label')).toEqual('Email')
    expect(input.prop('name')).toEqual('email')
    expect(input.prop('value')).toEqual('')
    expect(input.prop('placeholder')).toEqual('Email')
    expect(input.prop('error')).toBeFalsy()
    expect(input.prop('type')).toEqual('text')
  })

  it('given an optional placeholder prop, it should render properly', () => {
    const input = setup({ placeholder: 'Email placeholder' }).find(Form.Input)
    expect(input.prop('placeholder')).toEqual('Email placeholder')
  })

  it('when the field is dirty but with no error, it should not render any errors', () => {
    const errors = setup({
      meta: {
        active: true,
        error: [],
        touched: true,
      },
    }).find(List.Item)

    expect(errors.length).toEqual(0)
  })

  it('when the field is dirty and present errors, it should render a List comp with errors and props', () => {
    const errors = setup({
      meta: {
        active: true,
        error: ['error 1', 'error 2'],
        touched: true,
      },
    }).find(List.Item)

    expect(errors.length).toEqual(2)
    expect(errors.first().prop('className')).toEqual('error-item')
    expect(errors.first().render().text()).toEqual('Error 1')
  })

  it('when the field is dirty and present errors, it should render Input comp with error prop', () => {
    const input = setup({
      meta: {
        active: true,
        error: ['error 1', 'error 2'],
        touched: true,
      },
    }).find(Form.Input)

    expect(input.prop('error')).toBeTruthy()
  })
})
