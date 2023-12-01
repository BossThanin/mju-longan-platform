const SetInputNumberForDevice = () => {
  let userAgent = window.navigator.userAgent || window.navigator.vendor || window.opera;
  if(/android/i.test(userAgent) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)){
    let inputs = document.querySelectorAll('input[type="number"]');
    for(let i = inputs.length; i--;)
      inputs[i].setAttribute('pattern', '\\d*');
  }
}

export default SetInputNumberForDevice;
