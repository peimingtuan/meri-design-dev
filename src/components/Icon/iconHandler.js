const iconFolder = require.context('../static/iconSvg/action', false, /\.svg$/);

const IconHandler = iconFolder.keys().reduce((modules, modulePath) => {
    // 忽略第1个js
    const moduleName = (modulePath.replace(/\.|\/|_|(svg)/g, '')).toLowerCase();
    const name = `Icon${moduleName}`;
    // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
    const value = iconFolder(modulePath);
    modules[name] = value.default || value;
    return modules;
}, {});
export default IconHandler;
