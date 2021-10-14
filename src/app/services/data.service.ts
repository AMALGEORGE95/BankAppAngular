import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={
  withCredentials:true,
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {
  [x: string]: any;

  // currentUser=""
  // AccountNum=""
   
  // user:any={
  //   1000:{uname:"abijith",acno:1000,password:"userone",balance:5000,transaction:[]},
  //   1001:{uname:"neer",acno:1001,password:"usertwo",balance:6000,transaction:[]},
  //   1002:{uname:"amal",acno:1002,password:"userthree",balance:8000,transaction:[]},
  //   1003:{uname:"varun",acno:1003,password:"userfour",balance:7000,transaction:[]}
  // }

  constructor(private http:HttpClient) { 
    //this.getdetails()
  }
//   savedetails(){
//     if (this.user) {
//       localStorage.setItem("user",JSON.stringify(this.user))
      
//     }
//     if (this.currentUser) 
//     {
//       localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
      
//     }
//     if (this.AccountNum) 
//     {
//       localStorage.setItem("AccountNum",JSON.stringify(this.AccountNum))
      
//     }
    
//   }
//   getdetails(){
//    if(localStorage.getItem("user")){ 
//     this.user=JSON.parse(localStorage.getItem("user") || '')
//   }
//   if(localStorage.getItem("currentUser")) 
//   {
//     this.currentUser=JSON.parse(localStorage.getItem("currentUser") ||'')


    
//   }
// }
getTransaction(acno:any){
  const data={
    acno
  }
  return  this.http.post("http://localhost:3000/Transaction",data,this.getOptions())
  //return this.user[acno].transaction

}
  register(uname:any,acno:any,password:any,balance:any){
    const data={
      uname,
      acno,
      password,
      balance
    }

    return this.http.post("http://localhost:3000/register",data)
    // let accDetails=this.user
    // if(acno in accDetails )
    // {
    //   return false

    // }
    // else{
    //   accDetails[acno]={
    //     uname,
    //     acno,
    //     password,
    //     balance,
    //     transaction:[]
    //   }
    //   console.log(this.user)
    //   this.savedetails()
    //   return true
    // }

  }
  login(acno:any,password:any){
    const data={
      acno,
      password
    }
    return this.http.post("http://localhost:3000/login",data,options)
    // let accdetails=this.user
    // if(acno in accdetails)
    // {
    //   if(pswd==accdetails[acno]["password"])
    //   {
    //     this.currentUser=accdetails[acno]["uname"]
    //     this.AccountNum=acno
    //     this.savedetails()
    //     return true
    //     alert("login sucessful")
    //     this.router.navigateByUrl('dashboard')
    //   }
    //   else{
    //     alert("invalid password")
    //     return false
    //   }
    // }
    // else
    // {
    //   alert("invalid user")
    //   return false
    // }

  }
  getOptions(){
    const token=localStorage.getItem("token")
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
      options.headers=headers
    }
    return options

  }
  deposit(acno:any,password:any,amount:any){
    const data={
      acno,
      password,
      amount
    }
    
    return this.http.post("http://localhost:3000/deposit",data,this.getOptions())
    // var  amt=parseInt(amount)
    
    // let accdetails=this.user
    // if(acno in accdetails)
    // {
    //   if(password==accdetails[acno]["password"])
    //   {
        
    //     accdetails[acno]["balance"]+=amt
    //     accdetails[acno]["transaction"].push({
    //       amount:amt,
    //       type:"CREDIT"
    //     })
    //     this.savedetails()
    //     console.log(accdetails)
    //     return accdetails[acno]["balance"]
        
        
        
    //   }
    //   else{
    //     alert("invalid password")
        
    //   }
    // }
    // else{
    //   alert("invalid user")
    // }


  }
  withdraw(acno:any,password:any,amount:any)
  {
    const data={
      acno,
      password,
      amount
    }
    
    return this.http.post("http://localhost:3000/withdraw",data,this.getOptions())
    // var  amt=parseInt(amount)
    // let accdetails=this.user
    // if(acno in accdetails)
    // {
    //   if(password==accdetails[acno]["password"])
    //   {
    //     if (accdetails[acno]["balance"]>amt) 
    //     {
    //       accdetails[acno]['balance']-=amt
    //       accdetails[acno]["transaction"].push({
    //         amount:amt,
    //         type:"DEBIT"
    //       })

    //       this.savedetails()
    //       console.log(accdetails)
    //       return accdetails[acno]["balance"]
          
    //     }
    //     else
    //     {
    //       alert("insufficient balance")
    //     }
      
        
    //   }
    //    else{
    //     alert("invalid password")
        
    //   }

    // }
    // else{
    //   alert("invalid user")
    // }

  }
  deleteAcc(acno1:any){
    return this.http.delete("http://localhost:3000/deleteAcc/"+acno1,this.getOptions())
  }
}

