//1、实现添加任务
//给输入框添加事件
pushList()
function pushList(){
    var oIpt = document.querySelector('.head>input')
    //注册键盘事件
    oIpt.onkeyup = function(e){
        if(e.keyCode === 13){
            var iptVal = document.querySelector('.head>input').value.trim();
            //获取完之后清空输入框的neir
            document.querySelector('.head>input').value = ""
            if(!iptVal){
                alert('输入非法字符，请重新输入')
                return
            }
            var oUl = document.querySelector('.main')
            var newLi = document.createElement('li')
            var str = ` <label>
            <input type="checkbox">
            <span>`+iptVal+`</span>    
        </label>
        <button id="btn1">删除</button>`
        newLi.innerHTML = str
        oUl.appendChild(newLi)
        changeStyle()
        isEmpty()
        isAllChecked()
        changeNum()
        }
    }
    
}
//2. 实现任务完成样式添加
function changeStyle(){
    var oSpan = document.querySelectorAll('#root .todo-container .todo-wrap .main>li>label>span')
    var oCheck = document.querySelectorAll('#root .todo-container .todo-wrap .main li label input[type = checkbox]')
    //遍历所有的checkbox
    oCheck.forEach(function(item,index){
        //当复选框被选中时
        if(item.checked){
           oSpan[index].classList.add('checked')
        }else{//未选中时
            oSpan[index].classList.remove('checked')
        }
    })
}
//3.给复选框和删除按钮添加点击事件
isClick()
function isClick(){
    var oUl = document.querySelector('.main')
    //事件委托
    oUl.onclick = function(e){
       //当点击的是复选框时，添加或删除样式
        if(e.target.nodeName.toLowerCase() === "input"){
            changeStyle()
            isAllChecked()
            changeNum()
        }
        //当点击的是删除按钮时，删除这项任务
        if(e.target.nodeName.toLowerCase() === "button"){
            oUl.removeChild(e.target.parentNode)
            isAllChecked()
            isEmpty()
            changeNum()
        }
    }   
}
//4.判断是否全部选中
function isAllChecked(){
    var mainIsChecked = document.querySelectorAll('.main input:checked')
    var mainChecked = document.querySelectorAll('.main input[type = checkbox]')
    var footChecked = document.querySelector('.footer input[type = checkbox]')
    var TwoChecked = mainIsChecked.length === mainChecked.length
    footChecked.checked = TwoChecked?true:false
}
//5.判断任务是否为空，如果为空则显示任务列表为空
function isEmpty(){
    var allLi = document.querySelectorAll('.main li')
    var footer = document.querySelector('.footer')
    var oUl = document.querySelector('.main')
    var oWrap = document.querySelector('.todo-wrap')
    //这个h1是下面创建的，注意使用>,不然会报错
    var h1 = document.querySelector('.todo-wrap>h1')
    //如果有任务，那么main和foot都显示，不然就都隐藏
    oUl.style.display = footer.style.display = allLi.length?'block':'none'
    if(!allLi.length){
        //当main和foot都隐藏的时候，创建一个h1,也就是上面获取的那个h1
        var newText = document.createElement('h1')
        newText.innerHTML = '任务已完成！请注意休息！'
        oWrap.appendChild(newText)
    }else if(h1 && allLi.length){
        //注意：当h1存在又创建新的任务时，要把h1删除
       oWrap.removeChild(h1)
    } 
}
//给footer注册点击事件
footerClick()
function footerClick(){
    var footChecked = document.querySelector('.footer input[type = checkbox]')
    footChecked.onclick = function(){
        //当footer里的复选框点击时，先获取main里面的复选框
        var mainChecked = document.querySelectorAll('.main input[type = checkbox]')
        //遍历main的复选框
        mainChecked.forEach(function(item,index){
            //选中footer里的复选框时返回true，则赋值给main里面所有的复选框都是true，就全选中了
            item.checked = footChecked.checked
        })
        changeStyle()
        changeNum()
    }
}
//footer删除按钮点击事件
footerDelete()
function footerDelete(){
    var oDel = document.querySelector('.footer #btn2')
    oDel.onclick = function(){
        //获取被选中的复选框
        var mainIsChecked = document.querySelectorAll('.main input:checked')
        //遍历然后删除
        mainIsChecked.forEach(function(item){
            item.parentNode.parentNode.remove()
        })
        isAllChecked()
        isEmpty()
        changeNum()
    }
}
//封装一个函数用来改变footer的数字
function changeNum(){
    //先获取那两个span
    var allNum = document.querySelector('#num2')
    var isNum = document.querySelector('#num1')
    //然后获取上面的main的复选框选中的数量和全部的数量
    var mainIsChecked = document.querySelectorAll('.main input:checked')
    var mainChecked = document.querySelectorAll('.main input[type = checkbox]') 
    //修改数字
    allNum.textContent = mainChecked.length
    isNum.textContent = mainIsChecked.length
    console.log(mainIsChecked.length);
}



