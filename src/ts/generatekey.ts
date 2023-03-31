function generatekey() {
  let key: number = Math.floor(Math.random() * 1000000);
  let answ: any = prompt("Enter " + key + " to continue");
  if (answ == key) {
    return true;
  }
  return false;
}

export default generatekey;
