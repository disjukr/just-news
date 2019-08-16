import {
    RouteTable,
    Node,
    Wildcard,
    insertNodeToChildren,
} from './router';

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
