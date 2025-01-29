function CartID() {
    const generateRandomString = () => {
        const length = 30;
        const characters = 'rstuvwxyz0123456789';
        let randomString = "";

        for(let i=0;i<length;i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }

        localStorage.setItem("randomString", randomString)
    }

    const existRandomString = localStorage.getItem("randomString");
    if (!existRandomString) {
        generateRandomString();
    }
    return existRandomString;
}

export default CartID
