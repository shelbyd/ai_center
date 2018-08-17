export class None {
  unwrap() {
    throw new Error('called Option#unwrap on a None value');
  }
}

export class Some {
  constructor(value) {
    this.value = value;
  }

  unwrap() {
    return this.value;
  }
}
