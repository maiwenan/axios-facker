
function str2reg(str: string | RegExp) {
  if (typeof str === 'string') {
    return new RegExp(str);
  }
  return str;
}

export default {
  matchOne(str: string, test): boolean {
    if (!test) return true;

    if (Array.isArray(test)) {
      return test.map(str2reg).some(re => re.test(str));
    } else if (typeof test === 'function') {
      return test(str);
    } else {
      test = str2reg(test);
      return test.test(str);
    }
  }
};