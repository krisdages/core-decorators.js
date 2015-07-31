import { decorate } from './private/utils';

function handleDescriptor(target, key, descriptor, [isEnumerable = true]) {
  descriptor.enumerable = isEnumerable;
  return descriptor;
}

export default function enumerable(...args) {
  return decorate(handleDescriptor, args);
}
