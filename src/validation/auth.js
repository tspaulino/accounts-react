import validate from '../utils/validate'

export const signInValidation = validate({
  email: {
    presence: { allowEmpty: false },
    email: true,
  },
  password: {
    presence: true
  }
})

export const signUpValidation = validate({
  email: {
    presence: { allowEmpty: false },
    email: true,
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  },
  name: {
    presence: true,
    length: { minimum: 3, maximum: 100 }
  },
  confirmPassword: {
    presence: true,
    equality: 'password'
  }
})

export const lostPasswordValidation = validate({
  email: {
    email: true,
  },
})

export const resetPasswordValidation = validate({
  password: {
    presence: true,
    length: { minimum: 8 }
  },
  confirmPassword: {
    presence: true,
    equality: 'password'
  }
})
