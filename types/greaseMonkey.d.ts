interface GM {
    getValue<T extends (number | string | boolean)>(name: string): Promise<T | undefined>;
    getValue<T extends (number | string | boolean)>(name: string, defaultValue: T): Promise<T>;
    setValue<T extends (number | string | boolean)>(name: string, value: T): Promise<void>;
}
declare const GM: GM;
