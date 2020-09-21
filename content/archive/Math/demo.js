class TreeNode {
    constructor(key){
        this.key = key;
        this.sons = []
    }
    insert(key){
        let node = new TreeNode(key);
        this.sons.push(node)  
        return node
    }
}


let str = 'ahello word'
let str2 = 'abcdefg'
let str3 = 'abgfdgdg'
let str4 = 'abgbvcnbv'
let str5 = 'akjhkh'
let root = new TreeNode("root")
// console.log(root)
// console.log(createTree(str,root))
// console.log(createTree(str2,root))
createTree(str,root)
createTree(str2,root)
createTree(str3,root)
createTree(str4,root)
createTree(str5,root)
console.log(root.sons)

function createTree(strs,parent){
    if(strs.length !==0){
        let found = parent.sons.find((item)=>item.key === strs[0])
        if(found){
            let newStrs = strs.slice(1)
            createTree(newStrs,parent)
        }else{
            let node = parent.insert(strs[0])
            let newStrs = strs.slice(1)
            // console.log(newStrs)
            createTree(newStrs,node)
        }
      
    }else if(strs.length === 0){
        console.log('创建完毕',root)
        return root
    }
}
dfsByStack(root)


// 使用栈来实现深度优先搜索
function dfsByStack( root) {
    let stack = []; 
      // 创建堆栈对象，js使用数组代替堆栈,其中每个元素都是TreeNode类型
    stack.push(root);    // 初始化的时候，压入根结点
    while (stack.length) {  // 只要栈里还有结点，就继续下去
    // 取出刚刚push进去的节点
    let node = stack.pop();  // 弹出栈顶的结点 拿到第一个进去的结点
    if (node.sons.length == 0) {
      // 已经到达叶子结点了，输出
        console.log('已经到达叶子结点',node.key)
    } else {
      // 非叶子结点，遍历它的每个子结点      
      // 注意，这里使用了一个临时的栈stackTemp
      // 这样做是为了保持遍历的顺序，和递归遍历的顺序是一致的
      // 如果不要求一致，可以直接压入stack
      let stackTemp = []
      for (let index = 0; index < node.sons.length; index++) {
          const son = node.sons[index];
          console.log(son.key)
          stackTemp.push(son)
      }
      //  将各个节点放入栈中排序
      //  顺序反过来
      while (stackTemp.length) {
        stack.push(stackTemp.pop());
      }
    }
    }
  }  