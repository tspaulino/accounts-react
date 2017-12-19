export const signIn = {
  email: {
    presence: true,
    email: true,
    length: { maximum: 100, minimum: 5 }
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  }
}

export const signUp = {
  email: {
    presence: true,
    email: true,
    length: { maximum: 100, minimum: 5 }
  },
  password: {
    presence: true,
    length: { minimum: 8 }
  }
}
