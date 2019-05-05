import { coreProcess } from '.';
import {
    reconstruct,
    isOptOut,
} from './reconstruct';

async function main() {
    if (isOptOut()) return;
    const [article, impl] = await coreProcess();
    reconstruct(article, impl.cleanup);
}
main().catch(e => console.error(e ? (e.stack || e) : e));
