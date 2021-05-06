let priorityRange=document.getElementById("todoPriority");
let addBtn=document.getElementById("addBtn");
let todoTitle=document.getElementById("todoTitle");
let close=document.getElementById("close");
let delBtn=document.getElementsByClassName("delete");
let search=document.getElementById("search");
let sortByMax=true;
let toggleSort=document.getElementById("toggleSort");

display();

toggleSort.onclick=()=>{
    sortByMax=!sortByMax;
    display();
}
search.oninput=()=>{
    let text=search.value.toLowerCase().replaceAll(" ","");
    let tasks=document.getElementsByClassName("task");
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].innerText.toLowerCase().replaceAll(" ","").indexOf(text)>=0){
            tasks[i].style.display="";
        }
        else{
            tasks[i].style.display="none";
        }
    }
}
priorityRange.oninput=()=>{
    document.getElementById("priorityPer").value=(priorityRange.value)+"%";
}
todoTitle.oninput=()=>{
    if(todoTitle.value.trim()===""){
        todoTitle.classList.remove("is-valid");
        todoTitle.classList.add("is-invalid");
    }
    else{
        todoTitle.classList.remove("is-invalid");
        todoTitle.classList.add("is-valid");
    }
}
addBtn.onclick=()=>{
    let title=todoTitle.value;
    let priority=priorityRange.value;
    if(title.trim()===""){
        todoTitle.classList.add("is-invalid");
    }
    else{
        let tasks;
        tasks=JSON.parse(localStorage.getItem("tasks"));
        if(tasks===null){
            tasks={};
        }
        let count=Object.keys(tasks).length+1;
        tasks[String(count)]=title+" "+priority;
        localStorage.setItem("tasks",JSON.stringify(tasks));
        todoTitle.classList.remove("is-invalid");
        todoTitle.value="";
        priorityRange.value="50";
        document.getElementById("priorityPer").value=(priorityRange.value)+"%";
        close.click();
        display();
    }
}

function display(){
    let tasks=document.getElementsByClassName("tasks")[0];
    tasks.innerHTML="";
    let ts=JSON.parse(localStorage.getItem("tasks"));
    if(ts==null){
        ts={}
    }
    let keys=Object.keys(ts);
    if(keys.length==0){
        tasks.innerHTML=`<div class="text-center mt-3">No Todo's</div>`;
        return;
    }
    let tempArray=[];
    for(let i=0;i<keys.length;i++){
        let res=ts[keys[i]].split(" ");
        let t=res.slice(0,res.length-1);
        let p=res.slice(res.length-1);
        let finalT='';
        for(let j=0;j<t.length-1;j++){
            finalT+=t[j]+" ";
        }
        finalT+=t[t.length-1];
        tempArray.push([p[0],finalT,keys[i]]);
    }
    if(sortByMax){
        tempArray.sort((a,b)=>{
            return parseInt(a)-parseInt(b);
        });
    }
    else{
        tempArray.sort((a,b)=>{
            return parseInt(b)-parseInt(a);
        })
    }
    for(let i=tempArray.length-1;i>=0;i--){
        tasks.innerHTML+=`
        <div id="${tempArray[i][2]}" class="task px-3 py-2" id="t1">
            <span class="priority" style="width: ${tempArray[i][0]}%"></span>
            <div class="title mx-2">
                ${tempArray[i][1]}
            </div>
            <button id="${tempArray[i][2]}" class="delete btn btn-danger ms-auto">
                <i class="fas fa-trash"></i>
            </button>
        </div>`;
    }
    for(let i=0;i<delBtn.length;i++){
        delBtn[i].onclick=()=>{
            let tasks=JSON.parse(localStorage.getItem("tasks"));
            delete tasks[delBtn[i].id];
            localStorage.setItem("tasks",JSON.stringify(tasks));
            display();
        }
    }
}
// setTimeout(()=>{
//     let tasks=document.getElementById("tasks");
//     let ts=JSON.parse(localStorage.getItem("tasks"));
//     tasks.innerHTML="";
//     let keys=Object.keys(ts);
//     for(let i=0;i<keys.length;i++){
//         tasks.innerHTML+=ts[keys[i]]+" ";
//     }
// },20);