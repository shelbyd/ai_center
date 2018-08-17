export class None {
  unwrap() {
    this.expect('called Option#unwrap on a None value');
  }

  unwrapOr(v) {
    return v;
  }

  expect(message) {
    throw new Error(message);
  }

  match(obj) {
    return obj.none();
  }

  map(f) {
    return new None();
  }

  andThen(f) {
    return new None();
  }

  isSome() {
    return false;
  }
}

export class Some {
  constructor(value) {
    this.value = value;
  }

  unwrap() {
    return this.value;
  }

  unwrapOr(f) {
    return this.value;
  }

  expect(message) {
    return this.value;
  }

  match(obj) {
    return obj.some(this.value);
  }

  map(f) {
    return new Some(f(this.value));
  }

  andThen(f) {
    return f(this.value);
  }

  isSome() {
    return true;
  }
}
