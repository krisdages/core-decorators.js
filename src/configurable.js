import { decorate } from './private/utils';

function handleDescriptor(target, key, descriptor, [isConfigurable = true]) {
  descriptor.configurable = isConfigurable;
  return descriptor;
}

export default function configurable(...args) {
  return decorate(handleDescriptor, args);
}
