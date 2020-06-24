export enum PhoneGameMode {
    Introduction,
    Research,
    Design,
    GetFeedback,
    SalesResults
};

export enum ItemSize {
    Small = "Small",
    Medium = "Medium",
    Large = "Large"
};

export enum Brightness {
    Dim = "Dim",
    Medium = "Medium",
    Bright = "Bright"
}

function color(s) {
    return `<div class='color-block' style="background-color: ${s};"></div>`;
}

export const PhoneColor = {
    Black: color("#333"),
    White: color("#fff"),
    Gray: color("#888"),
    Orange: color("#fc9d03"),
    Purple: color("#be03fc"),
    Red: color("#ff0000"),
    Blue: color("#0367fc")
};

export const ButtonColor = {
    Black: color("#000"),
    White: color("#fff")
};

export enum SoftwareType {
    Simple = "Simple",
    Complex = "Complex",
    Smartphone = "Smartphone"
}

export enum PhoneShape {
    Square = "Square",
    Sleek = "Sleek"
}

export enum RubberGrip {
    Full = "Full",
    Nubs = "Nubs",
    Off = "Off"
}

export enum YesNo {
    Yes = "Yes",
    No = "No"
}

export enum KeyboardOption {
    On = "On",
    Off = "Off"
}