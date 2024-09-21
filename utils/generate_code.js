const generateCode = (latestCode) => {
    const startPart = latestCode.slice(0, 1);
    const numericPart = latestCode.slice(1);
    let nextNumber = parseInt(numericPart, 10) + 1;
    let nextCode = startPart + nextNumber.toString().padStart(3, '0');
    return nextCode;
}

module.exports = generateCode;