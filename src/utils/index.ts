const makeFirstCharCapital = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);

}

export { makeFirstCharCapital }