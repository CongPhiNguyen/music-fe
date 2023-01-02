export const REGEX_INVALID_CHAR = new RegExp(
  /^(?!.*[\\^\\$\\*\\(\\)\\[\]<>'"\\/\\;`%+])/
)

export const REGEX_INVALID_EMAIL = new RegExp(
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export const REGEX_INVALID_FULLNAME = new RegExp(
  /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u
)
