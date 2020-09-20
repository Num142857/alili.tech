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

console.log(new TreeNode("aaa","a"))


let str = 'hello word'
let str2 = 'abcdefg'
let root = new TreeNode("root")
console.log(root)
console.log(createTree(str,root))
console.log(createTree(str2,root))
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
            console.log(newStrs)
            createTree(newStrs,node)
        }
      
    }else if(strs.length === 0){
        console.log('创建完毕',root)
        return root
    }
}