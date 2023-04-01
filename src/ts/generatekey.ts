function generatekey(config: any) {
  let result;
  for (let i = 0; i < config.length; i++) {
    if (config[i].hasOwnProperty('promptcheck')) {
        result = config[i].promptcheck;
        if(result !== true){
          return true;
        }
    }
  }

  let key: number = Math.floor(Math.random() * 1000000);
  let answ: any = prompt("Enter " + key + " to continue");
  if (answ == key) {
    return true;
  }
  return false;
}

export default generatekey;
