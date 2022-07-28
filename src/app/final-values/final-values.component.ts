import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import * as XLSX from 'xlsx';
import { FreeapiService } from '../services/freeapi.service';
//import {Objectdata} from  '../class/objectdata';
//import { JsonPipe } from '@angular/common';
import  data from '../jsondata/fdata.json';

export interface MyData{
  
  finalScore:any,
  impactScore:any,
  prioritization:any,
  iaasCost:any,
  passApp:any
}


@Component({
  selector: 'app-final-values',
  templateUrl: './final-values.component.html',
  styleUrls: ['./final-values.component.css']
})


export class FinalValuesComponent implements OnInit,MyData {
  passApp:any;
  iaasCost:any ;
  finalScore:any; 
  impactScore: any ;
  val:any=0;
  prioritization: any;
  fileName: any;
  finaltablen: number =1;
  loop: any;
  data:any[]=[];
  rowcount:any=0;
  doo:MyData = <any>[];
  price:any[]=data;
  arr: any= [];
  arr2:any=[];
  skuname: string="";
  data_filter:any;
  mname:String="";
  complexityArray:any[]=[];
  fileEnvName:any;
  

  constructor(private routes:Router,
    private _freeapi:FreeapiService,
    private activatedRoute:ActivatedRoute)
    
    { 
     
    }
    
//    
//data_filter = this.price;
 


  ngOnInit(): void {
    
    this.arr=[];
    this.activatedRoute.queryParams.subscribe((params: any)=>{
      console.log(params.data);
      this.fileEnvName=params.data[0];
      this.complexityArray.push(this.fileEnvName) 
      //console.log("envname",this.complexityArray)    
      this.finaltablen=params.data.length-1;
      //console.log(this.finaltablen)
      for(let i=1;i<params.data.length;i++){
       
        
          this.loop=params.data[i];
          this.calculation(this.loop);
          //this.arr.push(this.doo)
          console.log("arr.push inside loop",this.arr)
          //console.log(this.doo)
          this.reset();
          //console.log(this.doo)
         

      }   
       
      console.log("arr.push",this.arr)
      
    })
    //console.log(this.price)   
       
  }
    calculation(sum:any){
      //this.doo.rowcount = ++this.rowcount ;
      
      console.log("sum",sum)      
      
      if(sum <50 ){
       
        this.arr.push({finalScore:'Simple',
        impactScore:'Low Business Impact',
        prioritization:'Quick Wins',
        iaasCost:'Yes',
        passApp:'No'

      })
      
        this.complexityArray.push('Simple');
        console.log("sum in simple",sum)
        console.log("in simple")
       
        // this.arr.push(this.doo)
        console.log("doo object in simple",this.doo)
       //this.data.push(this.finalScore)
      }

      if(sum >=50 && sum<80){
        
        this.arr.push({finalScore:'Medium',
        impactScore:'Medium Business Impact',
        prioritization:'Core Cloud',
        iaasCost:'Yes',
        passApp:'No'

      })
       

        
        this.complexityArray.push("Medium");
        console.log("sum in medieum",sum)
        

        console.log("doo object in medieum",this.doo)
       this.data.push(this.finalScore)
      }
      if(sum >= 80){
      

        this.arr.push({finalScore:'Complex',
        impactScore:'Complex Business Impact',
        prioritization:'Long Term Bets',
        iaasCost:'No',
        passApp:'Yes'
      })


        this.complexityArray.push('Complex');
        console.log("sum in complex",sum)
       
        console.log("doo object in complex",this.doo)
        this.data.push(this.finalScore)
      }
     
     
      
    }
    
    reset(){      
      
      console.log(this.complexityArray,"complexity")
      
    }


   
    exportexcel(): void
  {
    /* pass here the table id */
    this.fileName=this.fileEnvName+'.xlsx';
    let element = document.getElementById('export');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }
  
  navigatePricing(){
   console.log(this.complexityArray,"complexity")
    this.routes.navigate(['pricing'],{queryParams:{data:this.complexityArray}});
  }
  //testing for json objects

//  console.log(f_data.filter(function(item: { type: string; }){
//   return item.type=="DevTestConsumption";
//  }));
//  console.log(arr.filter(function(item){
//   return item.type == "ar";         
// }));
 
    
  
}

