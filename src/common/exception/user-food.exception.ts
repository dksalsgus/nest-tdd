import { EnErrorCode, GlobalCustomException } from './global-exeption';

export class UserFoodNotFoundException extends GlobalCustomException {
  constructor() {
    super(EnErrorCode.userFoodNotFound, '존재하지 않는 음식입니다.');
  }
}
