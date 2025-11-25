function flipCoin(){
    for (let index = 0; index < 10; index++) {
        let randomNum = Math.round(Math.random())
        if(randomNum === 1){
            console.log('正面')
        }else{
            console.log('反面')
        }
    }

}

flipCoin()