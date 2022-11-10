export class User {
  constructor(
    public uid: string | undefined,
    public email: string | null | undefined,
    public name: string | null
  ) {}
}
