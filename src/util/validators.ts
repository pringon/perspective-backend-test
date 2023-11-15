export { isString, isEmail };

function isString(x: unknown): x is string {
    return x === String(x);
}

const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
function isEmail(x: unknown): x is string {
    if (!isString(x)) {
        return false;
    }
    return EMAIL_REGEX.test(x);
}
