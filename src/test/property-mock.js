'use strict';

const nullDecorator = (target, name, descriptor) => descriptor;
const nullTest = (descriptor, name, target) => null;
class DecoratedPropertyMock {

	test = nullTest;
	
	//initialize with decorator and optional name
	constructor(decorator = nullDecorator, name = null) {
		Object.assign(this, { decorator, name });
	}

	//fluently set description and test assertions
	that(description, test = nullTest) {
		Object.assign(this, {
			description,
			test,
		});
		return this;
	}

	get name() { return this._name || (this._name = Symbol(this.description)); }
	set name(v) { this._name = v;}
		
	descriptor(target) {
		return Object.getOwnPropertyDescriptor(target, this.name);
	}

	run(target) { 
		return () => this.test(this.descriptor(target), this.name, target);
	}
	
}

export default function prop(decorator,name) {
	return new DecoratedPropertyMock(decorator,name);
}
	
