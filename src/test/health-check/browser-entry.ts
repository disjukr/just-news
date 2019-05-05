import { coreProcess, toJSON } from '../..';

async function main() {
    const [article] = await coreProcess();
    return toJSON(article);
}
export default main().catch(_ => null);
