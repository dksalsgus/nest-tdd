import { EnErrorCode, GlobalCustomException } from './global-exeption';

export class NaverOauthUrlException extends GlobalCustomException {
  constructor() {
    super(EnErrorCode.naverOauthUrlError, 'Naver Oauth URL 잘못됨');
  }
}
