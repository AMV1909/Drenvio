export const formatPrice = (num: number): string => {
    const formattedValue = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currencyDisplay: "narrowSymbol",
    }).format(num);

    return `$ ${formattedValue}`;
};

export const capitalizeFirstLetter = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);
