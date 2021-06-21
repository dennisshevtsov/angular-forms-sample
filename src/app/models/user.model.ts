export class UserModel {
  public constructor(
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public sendProducts: boolean = false,
    public addressType: string = 'home',
    public street1?: string,
    public street2?: string,
    public country: string = '',
    public city?: string,
    public zip?: string,
  ) {}
}
