declare module 'codegen.macro' {
    const codegen: <T>(args: TemplateStringsArray) => T;
    export default codegen;
}
