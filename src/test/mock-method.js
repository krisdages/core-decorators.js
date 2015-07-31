class DecoratedMockMethod {
  constructor(decorator, description, test = (obj, propDescriptor, propName) => null) {
    Object.assign(this, {decorator,description,test, name: Symbol(description)});    
  }

  descriptor(obj) {
    return Object.getOwnPropertyDescriptor(obj, this.name);
  }

  run(obj) { 
    return () => this.test(obj, this.descriptor(obj), this.name);
  }
}

export default function method(decorator, description, test) { return new DecoratedMockMethod(decorator, description, test); }
