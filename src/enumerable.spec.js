import chai from 'chai';
import method from './test/mock-method';
const should = chai.should();

import {enumerable, nonenumerable} from './core-decorators';

// ===================================================================
const testFalse = (o,d,n) => d.enumerable.should.equal(false);
const testTrue = (o,d,n) => d.enumerable.should.equal(true);

const methods = [
  method(enumerable, "defines a property as enumerable by default", testTrue),
  method(enumerable(true), "defines a property as enumerable when true passed", testTrue),
  method(enumerable(false), "defines a property as nonenumerable when false passed", testFalse),
  method(nonenumerable, "enumerable(false) is aliased as nonenumerable", testFalse)
];

class Foo {
  @(methods[0].decorator); [methods[0].name]() { }
  @(methods[1].decorator); [methods[1].name]() { }
  @(methods[2].decorator); [methods[2].name]() { }
  @(methods[3].decorator); [methods[3].name]() { }
}

// ===================================================================

describe('enumerable', function () {
  let foo = Object.getPrototypeOf(new Foo());
  for (let m of methods) {
    it(m.description, m.run(foo));
  }
}); 
