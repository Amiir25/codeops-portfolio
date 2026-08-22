function makeCounter() {
    let count = 0;

    return () => {
        count++;
        return count;
    }
}

const callCount = makeCounter();
callCount();
callCount();
callCount();
console.log(callCount())

const callCountAgain = makeCounter();
console.log(callCountAgain())


/**
 * The count variable is a private variable. It can't be accessed outside the function. The only way to access it
 * is the inner function. Every variable who calls makeCounter() gets it's own copy of count variable.
 */