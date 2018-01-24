import storage from '../../utils/storage'

describe('Storage Util', () => {
  it('Should set a key/value pair', () => {
    storage.set('foo', 'bar')
    expect(storage.get('foo')).toEqual('bar')
  })

  it('Should clear all data', () => {
    storage.set('foo', 'bar')
    storage.set('jon', 'doe')
    storage.destroy()

    expect(storage.get('foo')).toBeUndefined()
    expect(storage.get('jon')).toBeUndefined()
  })
})
