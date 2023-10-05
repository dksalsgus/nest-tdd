import { EnErrorCode, GlobalCustomException } from './global-exeption';

export class UserNotFoundException extends GlobalCustomException {
  constructor() {
    super(EnErrorCode.userNotFound, '유저 찾지못함');
  }
}
