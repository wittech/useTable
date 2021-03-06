const path = require('path');
const fse = require('fs-extra');
const meow = require('meow');
const style = require('ansi-styles');
const templateRender = require('use-template');
const camelcase = require('camelcase');
const MAIN_DIR = 'packages';

const add = ({ templateDir = 'template', destDir = 'src' }) => {
  const cli = meow('', {});
  const contentDir = path.resolve(process.cwd(), templateDir);
  const pkgName = cli.input[0];
  const name = camelcase(pkgName);
  const dest = path.resolve(process.cwd(), destDir, pkgName);

  const options = {
    dest,
    contentDir,
    templateConf: { templateDidMount: () => [] },
    config: {
      TEMPLATE_CONTENT_DIR: '',
    },
    variable: {
      pkgName,
      name,
    },
  };

  return fse
    .pathExists(dest)
    .then((exists) => (exists ? Promise.reject() : Promise.resolve()))
    .then(
      () => {
        return fse
          .ensureDir(dest)
          .then(() => templateRender(options))
          .then(() => {
            console.log(`${style.green.open}初始化 ${name} 成功${style.green.close}`);
          })
          .then(() => {
            return { name };
          });
      },
      () => {
        console.log(`${style.red.open}已存在对应的 Hook${style.red.close}`);
      }
    );
};

add({ destDir: MAIN_DIR }).then(() => {
  console.log(
    `${style.green.open}新增 Hook 之后如果本地服务报错，请重新起服务${style.green.close}`
  );
});
