async function addShortDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}

async function addDelay() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
}

