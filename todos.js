//1、实现添加任务
let oIpt = document.querySelector('#root .todo-container .todo-wrap .head input')
let oMain = document.querySelector('#root .todo-container .todo-wrap .main')
//给输入框添加事件
oIpt.addEventListener("keyup",function(e){
    //当回车键抬起的时候
    if(e.keyCode === 13){
       // console.log(this.value);
       //消除输入内容两侧的空格
        var strVal = this.value.trim()
        //回车之后清除输入框的内容
       this.value = ''
       //输入空格不能添加元素
       if(!strVal)return
        console.log(strVal);
        let str = `<li>
        <label>
            <input type="checkbox">
            <span>`+strVal+`</span>
        </label>
        <button id="btn1">删除</button>
    </li>`
    //每次事件触发累加
    oMain.innerHTML += str
    }
})   
console.log(' ');
