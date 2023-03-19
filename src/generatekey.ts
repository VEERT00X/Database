function generatekey() {
    let key:number = Math.floor(Math.random() * 1000000);
    return key;
}

export default generatekey;