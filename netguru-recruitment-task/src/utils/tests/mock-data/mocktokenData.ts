import { TokenDto } from "../../../auth/dtos/token.dto";

export const userToken: TokenDto = {
  userId: 123,
  name: 'Basic Thomas',
  role: 'basic',
  iat: 1606221838,
  exp: 1606223638,
  iss: 'https://www.netguru.com/',
  sub: '123',
};

