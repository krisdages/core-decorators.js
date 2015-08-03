import { decorate } from './private/utils';

function handleDescriptor(target, key, descriptor, [isReadonly = true]) {
  descriptor.writable = !isReadonly;
  return descriptor;
}

export default function readonly(...args) {
  return decorate(handleDescriptor, args);
}
