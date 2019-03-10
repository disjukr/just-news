import * as router from '../router';

const routeTable = {
    '스포츠경향': ['sports.khan.co.kr/news/sk_index.html?*'],
    '스포츠동아': ['sports.donga.com/3/*', 'sports.donga.com/*/3/*'],
};

const routeTree1 = router.bake(routeTable);

const routeTree2 = new router.Node('sports.', '', [
    new router.Node('khan.co.kr/news/sk_index.html?', '', [new router.Wildcard('스포츠경향')]),
    new router.Node('donga.com/', '', [
        new router.Node('3/', '', [new router.Wildcard('스포츠동아')]),
        new router.Wildcard('', [
            new router.Node('3/', '', [new router.Wildcard('스포츠동아')]),
        ]),
    ]),
]);

const routeTree = routeTree1[0];

const case1 = 'sports.khan.co.kr/news/sk_index.html?art_id=201903090000043&sec_id=540101'; // '스포츠경향'
const case2 = 'sports.donga.com/home/3/all/20190308/94450130/2'; // 스포츠동아

console.log(routeTree.match(case1));
console.log(routeTree.match(case2));

// console.log(JSON.stringify(routeTree));
