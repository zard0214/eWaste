const capacity = ['8 GB', '16 GB', '32 GB', '64 GB', '128 GB', '256 GB', '512 GB', '1 TB', '2 TB', '5 TB', '10 TB'];

const arrayToOptions = (array) => {
    return array.map(item => ({
        label: item,
        value: item
    }));
}

export const capacityOptions = arrayToOptions(capacity);

export const classification = [
    {label: "--Select--", value: 0},
    {label: "current", value: 1},
    {label: "recycle", value: 2},
    {label: "rare", value: 3},
    {label: "unknown", value: 4},
    {label: "unwanted", value: 5}
];

export const colour = [
    {label: "--Select--", value: 0},
    {label: "red", value: 1},
    {label: "white", value: 2},
    {label: "black", value: 3},
    {label: "green", value: 4},
    {label: "yellow", value: 5},
    {label: "blue", value: 6},
    {label: "purple", value: 7},
    {label: "grey", value: 8},
    {label: "brown", value: 9},
    {label: "pink", value: 10},
    {label: "gold", value: 11},
    {label: "orange", value: 12},
];

export const condition = [
    {label: "New", value: 0},
    {label: "New without box", value: 1},
    {label: "Very good", value: 2},
    {label: "Good", value: 3},
    {label: "Satisfactory", value: 4},
    {label: "Bad", value: 5}
];

export function getLabelFromVal(arr, value) {
    const obj = arr.find(item => item.value === value);
    return obj.label;
}

export const deviceTypes = [
    {label: "Phones", value: "phones"},
    {label: "Game Consoles", value: "gameconsoles"},
    {label: "Laptops", value: "laptops"},
    {label: "Monitors", value: "monitors"},
    {label: "Unknown/Other", value: "unknown"}
];
