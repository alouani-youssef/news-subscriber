import * as bcrypt from 'bcrypt';

/**
 * @function hashAsync
 * @description Asynchronous wrapper for `bcrypt.hash`.
 * @param password The password to hash.
 * @param salt The salt to use.
 * @returns A Promise that resolves to the hashed password.
 */
async function hashAsync(password: string, salt: string): Promise<string> {
    return new Promise((_resolve, _reject) => {
        const callBack = (error, value) => {
            if (error) {
                _reject(error);
            } else {
                _resolve(value);
            }
        };
        return bcrypt.hash(password, salt, callBack);
    });
}

/**
 * @function hashPassword
 * @description Generates a salted and hashed version of the given password.
 * @param password The password to hash.
 * @returns A Promise which resolves to an object with the salt and the hashed password.
 */
export async function hashPassword(
    password: string,
): Promise<{ salt: string; hash: string }> {
    const salt = await bcrypt.genSalt(10);
    const hash = await hashAsync(password, salt);
    return { salt, hash };
}

/**
 * @function verifyPassword
 * @description Compares a given password with a stored hash and salt.
 * @param password The password to verify.
 * @param storedHash The stored hash.
 * @param storedSalt The stored salt.
 * @returns A Promise which resolves to true if the password is valid, false otherwise.
 */
export async function verifyPassword(
    password: string,
    storedHash: string,
    storedSalt: string,
): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, storedSalt);
    return hashedPassword === storedHash;
}
