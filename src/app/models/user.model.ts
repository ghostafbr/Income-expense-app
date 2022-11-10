export class User {

  // @ts-ignore
  static fromFirebase({uid, email, name}) {
    return new User(uid, email, name);
  }

  constructor(
    public uid: string,
    public email: string,
    public name: string
  ) {}
}
