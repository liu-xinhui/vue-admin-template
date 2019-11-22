//garage类型
const deviceType = ["m1:型号1", "m2:型号2", "m3:型号3"];

let exportObj = {
  deviceType,
};

//------------------------------以下部分请勿改动------------------------------
//转化为object和options
//$options用于获取el-select可用的格式,$object用于根据key取中文描述
for (let key in exportObj) {
  let value = exportObj[key];
  if (Array.isArray(value)) {
    let options = [];
    let object = {};
    value.forEach(item => {
      let itemArr = item.split(":");
      let option = {
        value: itemArr[0],
        label: itemArr[1],
      };
      object[option.value] = option.label;
      options.push(option);
    });
    value.$options = options;
    value.$object = object;
  }
}
export default exportObj;
