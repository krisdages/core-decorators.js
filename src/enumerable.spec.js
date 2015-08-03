import chai from 'chai';
const should = chai.should();
import prop from './test/property-mock';

import {enumerable, nonenumerable} from './core-decorators';

// ===================================================================
const testFalse = d => d.enumerable.should.be.false;
const testTrue = d => d.enumerable.should.be.true;

const props = [
  prop(enumerable).that("defines a property as enumerable by default", testTrue),
  prop(enumerable(true)).that("defines a property as enumerable when true passed", testTrue),
  prop(enumerable(false)).that("defines a property as nonenumerable when false passed", testFalse),
  prop(nonenumerable).that("@enumerable(false) is aliased as @onenumerable", testFalse)
];

class Foo {
  @(props[0].decorator); [props[0].name]() { }
  @(props[1].decorator); [props[1].name]() { }
  @(props[2].decorator); [props[2].name]() { }
  @(props[3].decorator); [props[3].name]() { }
}

// ===================================================================

describe('enumerable', function () {
  let foo = Object.getPrototypeOf(new Foo());
  for (let p of props) {
    it(p.description, p.run(foo));
  }
}); 
