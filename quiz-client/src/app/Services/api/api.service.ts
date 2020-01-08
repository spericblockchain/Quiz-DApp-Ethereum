import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  // getStud = async () =>{
  //   const URL = '/getStud'
  //   this.httpClient.get(URL).subscribe(data=>{
  //     console.log("TCL: ApiService -> postQuiz -> data", data)
  //     return data;
  //   })
  // }
  // postBatchList = async ( batchListBytes, batchHeaderBytes ) => {
  //   const postBatchListURL = '/batches'
  //   const fetchOptions = {
  //     method: 'POST',
  //     body: batchListBytes,
  //     headers: {
  //       'Content-Type': 'application/octet-stream'
  //     }
  //   }
  //   const res = await window.fetch( postBatchListURL, fetchOptions )
  //   return [ res, batchHeaderBytes ]
  // }
  // postQuiz = async (ans, studId, quizId) => {
  //   const URL = '/admin';
  //   const fetchOptions = {
  //     method: 'POST',
  //     body: JSON.stringify([ans, studId, quizId]),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   const res = await window.fetch( URL, fetchOptions )
  //   return [ res ]
  // }
  postQuiz = async ( ans, studId, quizId ) => {
    return new Promise(async (resolve, reject) => {
      console.log("INSIDE POST PROMISE");
      const URL = '/admin';
      this.httpClient.post(URL, {ans, studId, quizId}).subscribe((data) => {
        resolve(data);
      });
    })
  }
  setSubmit = async (studId, quizId ) => {
    return new Promise(async (resolve, reject) => {
      console.log("INSIDE SUBMIT PROMISE");
      const URL = '/submit';
      this.httpClient.post(URL, {studId, quizId}).subscribe((data) => {
        resolve(data);
      });
    })
  }
  getQuiz = async (quizId) =>{
    return new Promise(async (resolve, reject) => {
      console.log("INSIDE GETQUIZ PROMISE");
      const URL = '/getQuiz';
      this.httpClient.post(URL, {quizId}).subscribe((data) => {
        resolve(data);
      });
    })
  }

  // setSubmit = async (studId, quizId) => {
  //   console.log("INSIDE SUBMIT PROMISE");
  //   const URL = '/submit';
  //   const value = JSON.stringify([studId, quizId])
  //   const fetchOptions = {
  //     method: 'POST',
  //     body: value,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  //   const res = await window.fetch( URL, fetchOptions )
  //   return [ res ];
  // }

  // postQuiz = async (ans, studId, quizId) => {
  //   return new Promise(async (resolve, reject) => {
  //     console.log("INSIDE POST PROMISE");
  //     const URL = '/admin';
  //     const data = this.httpClient.post(URL, { ans, studId, quizId })
  //     console.log("TCL: ApiService -> postQuiz -> data", data);
  //     resolve(data);
  //     // this.httpClient.post(URL, {ans, studId, quizId}).subscribe((data) => {
  //     //   console.log("TCL: ApiService -> postQuiz -> data", data);
  //     //   resolve(data);
  //     // });
  //   })
  // }

  // setSubmit = async (studId, quizId) => {
  //   return new Promise(async (resolve, reject) => {
  //     console.log("INSIDE SUBMIT PROMISE");
  //     const URL = '/submit';
  //     const data = this.httpClient.post(URL, { studId, quizId });
  //     console.log("TCL: ApiService -> setSubmit -> data", data);
  //     resolve(data);
  //     // this.httpClient.post(URL, {studId, quizId}).subscribe((data) => {
  //     //   console.log("TCL: ApiService -> setSubmit -> data", data);
  //     //   resolve(data);
  //     // });
  //   })
  // }
}