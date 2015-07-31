import chai from 'chai';
import method from './test/mock-method';
const should = chai.should();

import {configurable, nonconfigurable} from './core-decorators';

// ===================================================================
const testFalse = (o,d,n) => d.configurable.should.equal(false);
const testTrue = (o,d,n) => d.configurable.should.equal(true);

const methods = [
  method(configurable, "defines a property as configurable by default", testTrue),
  method(configurable(true), "defines a property as configurable when true passed", testTrue),
  method(configurable(false), "defines a property as nonconfigurable when false passed", testFalse),
  method(nonconfigurable, "configurable(false) is aliased as nonconfigurable", testFalse)
];

class Foo {
  @(methods[0].decorator); [methods[0].name]() { }
  @(methods[1].decorator); [methods[1].name]() { }
  @(methods[2].decorator); [methods[2].name]() { }
  @(methods[3].decorator); [methods[3].name]() { }
}

// ===================================================================

describe('configurable', function () {
  let foo = Object.getPrototypeOf(new Foo());
  for (let m of methods) {
    it(m.description, m.run(foo));
  }
}); 
