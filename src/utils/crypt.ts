import * as crypto from 'crypto';
import { HASH_URL, SECRETS } from 'src/common/constants';

/**
 * @function encrypt
 * @description Encrypts a given payload object with AES-256-CBC symmetric encryption.
 * The payload is first stringified with JSON.stringify, then encrypted with
 * a randomly generated initialization vector (IV) and the `SECRETS.HASH_KEY`.
 * The IV is prepended to the ciphertext in hex format, separated by a colon.
 * @param payload the object to be encrypted
 * @returns the encrypted object as a string
 */
export function encrypt(payload: Object) {
    const stringfy = JSON.stringify(payload);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(SECRETS.HASH_KEY, 'salt', 32), iv);
    let encrypted = cipher.update(stringfy, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * @function decrypt
 * @description Decrypts a given encrypted object with AES-256-CBC symmetric encryption.
 * The input string should be in the format `iv:encryptedHex`, where `iv` is
 * the initialization vector in hex format and `encryptedHex` is the ciphertext
 * in hex format.
 * @param hash the encrypted object as a string
 * @returns the decrypted object
 */
export function decrypt(hash: string) {
    try {
        const [ivHex, encryptedHex] = hash.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(SECRETS.HASH_KEY, 'salt', 32), iv);
        let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    } catch (error) {
        throw new Error('CAN NOT DECRYPT TOKEN NOT GENERATED WITH THE SAME KEY')
    }
}


export function hashURL(url: string): bigint {

    const hash = crypto.createHash('sha256');
    hash.update(url);

    const hashHex = hash.digest('hex');
    const hashInt = BigInt('0x' + hashHex);

    const resultNumber = hashInt % BigInt(HASH_URL.MAX + 1);

    return resultNumber;
}