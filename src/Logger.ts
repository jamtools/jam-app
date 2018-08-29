import * as log from 'loglevel'
export default log

function runBefore(f: (...args: any[]) => any) {
  return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value
    descriptor.value = function (...args: any[]) {
      f(args)
      return method.apply(this, arguments)
    }
  }
}

const methods: any = {
  debug: console.log,
  error: console.error,
}

export function logBefore(level: string) {
  const method = methods[level]
  return runBefore(method)
}
