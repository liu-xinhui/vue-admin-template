//根据自己获取所有父级ID，el-cascader中使用
export const getParents = function(treeData, id) {
  let lineData = {};
  let treeIds = [id];

  //改为穿线树
  function toLineTree(data) {
    data.forEach(item => {
      if (item.children && item.children.length > 0) {
        toLineTree(item.children);
      }
      lineData[item.id] = item.parentId;
    });
  }

  //获得所有父级id
  function findParent(id) {
    let parentId = lineData[id];
    if (parentId !== 0) {
      treeIds.unshift(parentId);
      findParent(parentId);
    }
  }

  toLineTree(treeData);
  findParent(id);
  return treeIds;
};

