export interface RouteTable { [name: string]: string[] }

export function bake(routeTable: RouteTable): Node[] {
    // TODO
    return [];
}

export function match(text: string, routeTree: Node[]): string | null {
    for (const node of routeTree) {
        const result = node.match(text);
        if (result != null) return result;
    }
    return null;
}

// radix tree
export class Node {
    constructor(
        public pattern: string,
        public value: string = '',
        public children: Node[] = [],
    ) {}
    get isLeaf() { return !this.children.length; }
    consume(text: string, offset: number): number {
        if (text.startsWith(this.pattern, offset)) return offset + this.pattern.length;
        return offset;
    }
    match(text: string, offset: number = 0): string | null {
        if (this.isLeaf) {
            if (text.substr(offset) === this.pattern) return this.value;
            return null;
        }
        const nextOffset = this.consume(text, offset);
        if (nextOffset === offset) return null;
        for (const child of this.children) {
            const result = child.match(text, nextOffset);
            if (result != null) return result;
        }
        return null;
    }
}

// 가정: Wildcard의 child 중에 Wildcard는 없음. 손자 중에 있을 수는 있음
export class Wildcard extends Node {
    constructor(value: string = '', children: Node[] = []) { super('*', value, children); }
    consume(text: string, offset: number): number {
        if (this.isLeaf) return text.length;
        for (const child of this.children) {
            const index = text.indexOf(child.pattern, offset);
            if (~index) return index;
        }
        return offset;
    }
    match(text: string, offset: number = 0): string | null {
        if (this.isLeaf) return this.value;
        for (const child of this.children) {
            const index = text.indexOf(child.pattern, offset);
            if (~index) {
                const result = child.match(text, index);
                if (result != null) return result;
            }
        }
        return null;
    }
}
