import { coreProcess } from '.';
import {
    reconstruct,
    isOptOut,
} from './reconstruct';

async function main() {
    if (isOptOut()) return;
    try {
        const [article, impl] = await coreProcess();
        reconstruct(article, impl.cleanup);
    } catch (e) {
        console.error(e ? (e.stack || e) : e);
    }
}
main();
