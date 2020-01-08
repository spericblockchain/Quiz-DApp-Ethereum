import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }
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
}