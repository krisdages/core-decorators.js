import chai from 'chai';
const should = chai.should();
import prop from './test/property-mock';

import {readonly, ro} from './core-decorators';

// ===================================================================
const testRw = d => d.writable.should.be.true;
const testRo = d => d.writable.should.be.false;

const props = [
	prop(readonly, "prop").that("defines a property as readonly", testRo),
	prop(readonly(true), "propTrue").that("defines a property as readonly when true passed", testRo),
	prop(readonly(false), "propFalse").that("defines a property as writable when false passed", testRw),
];

const testObject = target => () => { for (let p of props) { it(p.description, p.run(target)) }};
const testClass = ctor => testObject(Object.getPrototypeOf(new ctor()));

class Methods {
	@(props[0].decorator); [props[0].name]() {}
	@(props[1].decorator); [props[1].name]() {}
	@(props[2].decorator); [props[2].name]() {}
}

//Currently failing, unsupported by the syntax?
// class Meal {
//   @readonly entree = 'steak';
// }

// class ValueProperties {
//	@readonly prop = "";
//	@readonly(true) propTrue = "";
//	@readonly(false) propFalse = "";
// }

const literalValues = {
	@props[0].decorator prop : {},
	@props[1].decorator propTrue : {},
	@props[2].decorator propFalse : {}
};

// ===================================================================

describe('readonly', () => {
	it("is aliased as @ro", () => readonly.should.equal(ro));
}); 

// describe('readonly, applied to methods,', testClass(Methods));
// describe('readonly, applied to value properties,', () => {
//	testObject(ValueProperties)();
//	it("works per the upstream example", () => Object.getOwnPropertyDescriptor(new Meal(), "entree").writable.should.be.false);
// });

describe('readonly, applied to object literal properties,', testObject(literalValues));
