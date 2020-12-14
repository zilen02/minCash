let n=document.getElementById("numberBox").value;
let nam = new Array(n);
let val = new Array(n); 
let ans = [];

const fetchN = () => {
    n=document.getElementById("numberBox").value;
    document.getElementById("que").style.display="none";
    document.getElementById("box2").style.display="flex";
    for(let i=0;i<n;i++) {
        document.getElementById(`nameBox${i+1}`).style.display="inline";
        document.getElementById(`nBox${i+1}`).style.display="inline";
    }
}



const calData = () => {
    
    for(let i=0;i<n;i++) {
        nam[i]=document.getElementById(`nameBox${i+1}`).value;
        val[i]=document.getElementById(`nBox${i+1}`).value;
    }
    document.getElementById("box2").style.display="none";
    let arr = new Array(n);
    let amount = new Array(n);
    for(let i=0;i<n;i++) {
        arr[i]=new Array(n);
    }

    const addEdge = (u,v,m) => {
        arr[u][v]=m;
    }

    for(let i=0;i<n;i++) {
        let temp=val[i]/n;
        for (let j=0; j<n; j++) {
            if(i!==j) {
                addEdge(j, i, temp);
            }
        }
    }

    for(let i=0;i<n;i++) {
        arr[i][i]=0;
    }

    let minIdx = () => {
        let minId = 0;
        for(let i=1;i<n;i++)
        if(amount[i]<amount[minId]) {
            minId = i;
        }
        return minId;
    }
    
    let maxIdx = () => {
        let maxId = 0;
        for(let i=1;i<n;i++)
        if(amount[i]>amount[maxId]) {
            maxId = i;
        }
        return maxId;
    }

    let min = (a,b) => {
        return a<b?a:b;
    }

    let util = () => {
        let maxCred=maxIdx();
        let minDept=minIdx();
        
        if(amount[maxCred]==0 && amount[minDept]==0) {
            return;
        }
        
        let x=min(-amount[minDept],amount[maxCred]);
        amount[maxCred]-=x;
        amount[minDept]+=x;
        ans.push(`${nam[maxCred]} pays ${x} Rs to ${nam[minDept]}`);
        util();
    }

    let minimizeCashFlow = () => {
        for(let i=0;i<n;i++) {
            amount[i]=0;
            for(let j=0; j<n; j++) {
                amount[i]+=(arr[i][j]-arr[j][i]);
            }
        }
        
        util();
        document.getElementById("ans").style.display="block";
        let p=document.getElementById("ans");
        let last="";
        ans.map((line)=> {
            last+=`<h3>${line}</h3>`;
        });
        p.innerHTML=last;
    }

    minimizeCashFlow();
    
}

