import expect from 'expect';
import getValues from '../getValues';

describe('getValues', function () {
  it('should get values from form', function () {
    var form = {
      foo: { value: 'bar' },
      catLives: { value: 9 },
      alive: { value: true }
    };
    var fields = ['foo', 'catLives', 'alive'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: 'bar',
      catLives: 9,
      alive: true
    });
  });

  it('should fallback to initialValues when values are undefined', function () {
    var form = {
      someText: { value: 'Hello Again!', initialValue: 'Hello' },
      someArray: { value: undefined, initialValue: [1, 2, 3] },
      someBool: { value: undefined, initialValue: false }
    };
    var fields = ['someText', 'someArray', 'someBool'];
    expect(getValues(fields, form)).toEqual({
      someText: 'Hello Again!',
      someArray: [1, 2, 3],
      someBool: false
    });
  });

  it('should allow undefined values', function () {
    var form = {
      foo: { value: 'bar' }
    };
    var fields = ['foo', 'missing'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: 'bar',
      missing: undefined
    });
  });

  it('should get values from deep form', function () {
    var form = {
      foo: {
        bar: { value: 'baz' }
      },
      lives: {
        cat: { value: 9 }
      },
      alive: { value: true }
    };
    var fields = ['foo.bar', 'lives.cat', 'alive'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: {
        bar: 'baz'
      },
      lives: {
        cat: 9
      },
      alive: true
    });
  });

  it('should get values from array form', function () {
    var form = {
      foo: [{ value: 'bar' }, { value: undefined, initialValue: 'baz' }, {}],
      alive: { value: true }
    };
    var fields = ['foo[]', 'alive'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: ['bar', 'baz', undefined],
      alive: true
    });
  });

  it('should allow an array to be empty', function () {
    var form = {
      foo: []
    };
    var fields = ['foo[]'];
    expect(getValues(fields, form)).toBeA('object').toEqual({ foo: [] });
  });

  it('should get values from deep array form', function () {
    var form = {
      foo: {
        animals: [{ value: 'cat' }, { value: 'dog' }, { value: 'rat' }]
      },
      bar: [{
        deeper: {
          value: 42
        }
      }]
    };
    var fields = ['foo.animals[]', 'bar[].deeper'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: {
        animals: ['cat', 'dog', 'rat']
      },
      bar: [{ deeper: 42 }]
    });
  });

  it('should ignore visited fields without values', function () {
    var form = {
      foo: {
        value: 'dog'
      },
      bar: {
        visited: true
      }
    };
    var fields = ['foo', 'bar'];
    expect(getValues(fields, form)).toBeA('object').toEqual({
      foo: 'dog',
      bar: undefined
    });
  });
});