const KeydownRegexNumber = (e) => {
  /*validate not have + - . e */
  if ([69, 107, 109, 110, 187, 189, 190, 222].indexOf(e.keyCode) > -1) {
    if (e.preventDefault) e.preventDefault();
    return false;
  }
}

export default KeydownRegexNumber;
