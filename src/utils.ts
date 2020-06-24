
import { ItemSize, PhoneColor, PhoneShape, Brightness, SoftwareType, KeyboardOption, RubberGrip, YesNo, ButtonColor } from './PhoneEnums';
export function pad(n : number|string, width: number, z?:string): string {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export interface PhoneViewProps {
    phoneSize: ItemSize;
    buttonSize: ItemSize;
    screenSize: ItemSize;
    phoneShape: PhoneShape;
    phoneColor: any;
    buttonColor: any;
    screenBrightness: Brightness;
    softwareType: SoftwareType;
    keyboardOption: KeyboardOption;
    rubberGrip: RubberGrip;
    recycledCase: YesNo;
};

const PhoneViewPropsMapping: { [P in keyof PhoneViewProps]: { [index: string]: any; }} = {
    phoneSize: ItemSize,
    buttonSize: ItemSize,
    screenSize: ItemSize,
    phoneShape: PhoneShape,
    phoneColor: PhoneColor,
    buttonColor: ButtonColor,
    screenBrightness: Brightness,
    softwareType: SoftwareType,
    keyboardOption: KeyboardOption,
    rubberGrip: RubberGrip,
    recycledCase: YesNo,
}

export { PhoneViewPropsMapping };

export interface PhoneInfo { batteryLife: number; budgetLeft: number; phoneWeight: number; };


export function getPhoneInfo(p: PhoneViewProps): PhoneInfo {
    let obj: PhoneInfo = { batteryLife: 6, budgetLeft: 28, phoneWeight: 0 };

    /* Phone size */
    if(p.phoneSize == ItemSize.Medium) {
        obj.budgetLeft += 10;
        obj.batteryLife += 3;
        obj.phoneWeight++;
    } else if(p.phoneSize == ItemSize.Large) {
        obj.budgetLeft += 5;
        obj.phoneWeight += 2;
        obj.batteryLife += 6;
    }

    if(p.buttonSize == ItemSize.Medium) {
        obj.budgetLeft += 3;
    } else if(p.buttonSize == ItemSize.Large) {
        obj.budgetLeft += 5;
    }

    if(p.softwareType == SoftwareType.Complex) {
        obj.budgetLeft -= 5;
        obj.batteryLife -= 1;
    } else if(p.softwareType == SoftwareType.Smartphone) {
        obj.budgetLeft -= 10;
        obj.batteryLife -= 2;
    }
    
    if(p.keyboardOption == KeyboardOption.On)
        obj.budgetLeft -= 15;
    
    if(p.screenSize == ItemSize.Medium) {
        obj.budgetLeft -= 5;
        obj.batteryLife -= 1;
    } else if(p.screenSize == ItemSize.Large) {
        obj.budgetLeft -= 10;
        obj.batteryLife -= 2;
    }
    
    if(p.screenBrightness == Brightness.Medium) {
        obj.budgetLeft -= 15;
        obj.batteryLife -= 2;
    } else if(p.screenBrightness == Brightness.Bright) {
        obj.budgetLeft -= 20;
        obj.batteryLife -= 4;
    }
    
    if(p.rubberGrip != RubberGrip.Off)
        obj.budgetLeft -= 5;
    
    if(p.recycledCase == YesNo.Yes)
        obj.budgetLeft -= 10;

    if(p.phoneColor == PhoneColor.Orange || p.phoneColor == PhoneColor.Purple)
        obj.budgetLeft -= 5;
    else if(p.phoneColor == PhoneColor.Red)
        obj.budgetLeft -= 15;
    else if(p.phoneColor == PhoneColor.Blue)
        obj.budgetLeft -= 10;

    return obj;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
export function shuffle<T>(a: Array<T>): Array<T> {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}