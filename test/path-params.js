const expect = require('chai').expect
const pathParams = require('..')

suite('pathParams', function () {
  test('replace', function () {
    expect(pathParams('/path/:id', { id: 123 }))
      .to.be.equal('/path/123')
    expect(pathParams('/:id/:name', { id: '123', name: 'foo' }))
      .to.be.equal('/123/foo')
    expect(pathParams('/foo/:id/:name/:id', { id: '123', name: 'foo' }))
      .to.be.equal('/foo/123/foo/123')
  })

  test('error', function () {
    expect(pathParams('/:missing', {}))
      .to.be.instanceof(Error)
      .to.match(/missing path param: missing/i)
    expect(pathParams('/:object', { object: {} }))
      .to.be.instanceof(Error)
      .to.match(/invalid type for path param: object = object/i)
    expect(pathParams('/:invalid', { invalid: null }))
      .to.be.instanceof(Error)
      .to.match(/missing path param: invalid/i)
    expect(pathParams('/:array', { array: [] }))
      .to.be.instanceof(Error)
      .to.match(/invalid type for path param: array = object/i)
  })
})
