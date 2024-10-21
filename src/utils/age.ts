/**
 * @function calculateAge
 * @description calculate the age based on the current date
 * @param {String}  brith_day
 * @returns {Number} Age
 */
export function ageCalculator(brith_day: Date): number {
    const birthDate = new Date(brith_day);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
    ) {
        return age - 1;
    }
    return age;
}
