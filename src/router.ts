export interface RouteTable { [name: string]: string[] }

export function bake(routeTable: RouteTable): Node[] {
    const result: Node[] = [];
    for (const routeName in routeTable) {
        for (const pattern of routeTable[routeName]) {
            if (!pattern) continue; // 빈문자열 패턴이 없음을 보장
            const sanifiedPattern = pattern.replace(/\*+/g, '*'); // wildcard가 연달아오지 않음을 보장
            let node: Node | null = null;
            for (const subpattern of sanifiedPattern.split(/(?=\*)|(?<=\*)/).reverse()) {
                const value: string = node ? '' : routeName;
                const children: Node[] = node ? [node] : [];
                if (subpattern === '*') node = new Wildcard(value, children);
                else node = new Node(subpattern, value, children);
            }
            insertNodeToChildren(node!, result);
        }
    }
    return result;
}

export function match(text: string, routeTree: Node[]): string | null {
    for (const node of routeTree) {
        const result = node.match(text);
        if (result != null) return result;
    }
    return null;
}

export function stringify(
    routeTree: Node[],
    nodeClassName = 'Node',
    wildcardClassName = 'Wildcard',
): string {
    return `[${ routeTree.map(
        node =>
            node instanceof Wildcard ?
            `new ${wildcardClassName}(${
                JSON.stringify(node.value)
            },${
                stringify(node.children, nodeClassName, wildcardClassName)
            })` :
            `new ${nodeClassName}(${
                JSON.stringify(node.pattern)
            },${
                JSON.stringify(node.value)
            },${
                stringify(node.children, nodeClassName, wildcardClassName)
            })`,
    ).join() }]`;
}

// commonPattern('abc', 'abcd') => 'abc'
function commonPattern(a: string, b: string): string {
    const len = Math.min(a.length, b.length);
    for (var i = 0; i < len; ++i) if (a[i] !== b[i]) break;
    return a.substr(0, i);
}

function insertNodeToChildren(node: Node, children: Node[]) {
    for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        const insertResult = child.insertNode(node);
        if (insertResult != null) {
            children[i] = insertResult;
            return;
        }
    }
    children.push(node);
    return;
}

// radix tree
export class Node {
    constructor(
        public pattern: string,
        public value: string = '',
        public children: Node[] = [],
    ) {}
    get isLeaf() { return !this.children.length; }
    insertNode(node: Node): Node | null {
        const parentPattern = commonPattern(node.pattern, this.pattern);
        if (!parentPattern) return null;
        if (parentPattern !== this.pattern && parentPattern !== node.pattern) {
            this.pattern = this.pattern.substr(parentPattern.length);
            node.pattern = node.pattern.substr(parentPattern.length);
            return new Node(parentPattern, '', [this, node]);
        }
        const [parentNode, childNode] = (parentPattern === this.pattern) ? [this, node] : [node, this];
        childNode.pattern = childNode.pattern.substr(parentPattern.length);
        if (!parentNode.isLeaf) {
            insertNodeToChildren(childNode, parentNode.children);
        } else {
            parentNode.children = [
                new Node('', parentNode.value),
                childNode,
            ];
            parentNode.value = '';
        }
        return parentNode;
    }
    insert(pattern: string, value: string) { return this.insertNode(new Node(pattern, value)); }
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
