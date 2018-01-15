import validate from '../utils/validate'

export const signInValidation = validate({
  email: {
    presence: true,
    email: true,
    length: { maximum: 100, minimum: 5 }
  },
  password: {
    presence: true
  }
})

// export const signUp = {
//   email: {
//     presence: true,
//     email: true,
//     length: { maximum: 100, minimum: 5 }
//   },
//   password: {
//     presence: true,
//     length: { minimum: 8 }
//   }
// }
