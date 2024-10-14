/**
 * @file constants.ts
 * @module user/constants
 *
 * @description The module that contains the constants for the user module.
 * It exports the secret key for the JWT module.
 * 
 * THIS ONLY EXISTS FOR DEMONSTRATION PURPOSES. IN A REAL-WORLD APPLICATION,
 * WE WOULD NEVER STORE SENSITIVE INFORMATION IN A FILE THAT CAN BE ACCESSED
 * BY ANYONE.
 */
export const jwtConstants = {
    secret: 'secretKey',
};
export const cookieConstants = {
    secret: 'secretCookie',
};