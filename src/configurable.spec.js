import chai from 'chai';
const should = chai.should();
import prop from './test/property-mock';

import {configurable, nonconfigurable} from './core-decorators';

// ===================================================================
const testFalse = d => d.configurable.should.be.false;
const testTrue = d => d.configurable.should.be.true;

const props = [
  prop(configurable).that("defines a property as configurable by default", testTrue),
  prop(configurable(true)).that("defines a property as configurable when true passed", testTrue),
  prop(configurable(false)).that("defines a property as nonconfigurable when false passed", testFalse),
  prop(nonconfigurable).that("@configurable(false) is aliased as @nonconfigurable", testFalse)
];

class Foo {
  @(props[0].decorator); [props[0].name]() { }
  @(props[1].decorator); [props[1].name]() { }
  @(props[2].decorator); [props[2].name]() { }
  @(props[3].decorator); [props[3].name]() { }
}

// ===================================================================

describe('configurable', function () {
  let foo = Object.getPrototypeOf(new Foo());
  for (let p of props) {
    it(p.description, p.run(foo));
  }
}); 
