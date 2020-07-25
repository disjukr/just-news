export type Dom = null | Node | Element | (Node | Element)[] | NodeList | HTMLCollection;

export function $<K extends keyof HTMLElementTagNameMap>(selectors: string): HTMLElementTagNameMap[K] | null;
export function $<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
export function $<E extends Element = Element>(selectors: string): E | null;
export function $<K extends keyof HTMLElementTagNameMap>(selectors: string, parentNode: ParentNode): HTMLElementTagNameMap[K] | null;
export function $<K extends keyof SVGElementTagNameMap>(selectors: K, parentNode: ParentNode): SVGElementTagNameMap[K] | null;
export function $<E extends Element = Element>(selectors: string, parentNode: ParentNode): E | null;
export function $(selectors: string, parentNode: ParentNode = document) {
    return parentNode.querySelector(selectors);
}
export function $$<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
export function $$<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
export function $$<E extends Element = Element>(selectors: string): NodeListOf<E>;
export function $$<K extends keyof HTMLElementTagNameMap>(selectors: K, parentNode: ParentNode): NodeListOf<HTMLElementTagNameMap[K]>;
export function $$<K extends keyof SVGElementTagNameMap>(selectors: K, parentNode: ParentNode): NodeListOf<SVGElementTagNameMap[K]>;
export function $$<E extends Element = Element>(selectors: string, parentNode: ParentNode): NodeListOf<E>;
export function $$(selectors: string, parentNode: ParentNode = document) {
    return parentNode.querySelectorAll(selectors);
}

export function toArray(d?: Dom): (Node | Element)[] {
    if (d == null) return [];
    if (Array.isArray(d)) return d;
    if (NodeList.prototype.isPrototypeOf(d)) return Array.from(d as NodeList);
    if (HTMLCollection.prototype.isPrototypeOf(d)) return Array.from(d as HTMLCollection);
    return [d as Node | Element];
}

export function remove<D extends Dom>(d: D): D {
    for (const node of toArray(d)) node.parentNode?.removeChild(node);
    return d;
}

export function text(d: Dom): string {
    return toArray(d).map(d => d.textContent).join('');
}
