const ValidateMimeType = (file, valid_type = ['image/png', 'image/jpeg']) => {
  if(valid_type.indexOf(file.type) > -1) {
    return true
  }

  return false
}

export default ValidateMimeType;
