export class UserModel {
  public constructor(
    public lastName: string = '',
    public email: string = '',
    public sendPRoducts: boolean = false,
    public addressType: string = 'home',
    public street1?: string,
    public street2?: string,
    public country: string = '',
    public city?: string,
    public zip?: string,
  ) {}
}
