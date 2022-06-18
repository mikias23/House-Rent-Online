import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
}) 
export class MainServiceService {

  
  authToken: any;
  user:any;

  helper = new JwtHelperService();


  constructor(private http: HttpClient) { }



  loginUser(user:any)
  {
    console.log(user)
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json')

    return this.http.post('http://localhost:3000/users/login', user , {headers: headers}) 
  } 

  loggedIn()
  {
    return !this.helper.isTokenExpired(this.authToken);
  }

   storeUserData(token:any, user:any)
   {
     localStorage.setItem('id_token', token);
     localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
   }

   logOut()
   {
     this.authToken = null;
     this.user = null;
     localStorage.clear();

   }

  loadToken()
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.user =  localStorage.getItem('user');
  }

  getProfile()
  {
    let headers = new HttpHeaders();
    this.loadToken();
    
    return this.user;
  } 

  uploadHouse(uploadValues:any, arrayImages:any)
  {
    var formData: FormData = new FormData();
    formData.append('key1', 'value1');
    formData.append('key2', 'value2');
    
    for (const key in uploadValues)
    { 
      if(key == 'images')
      {
        var imagesContainer = uploadValues.images;        
       for(const keyInner in imagesContainer)
       {
        formData.append('imageType',imagesContainer[keyInner].imageType)


       }
       

      }
      else {
        if(key === 'rentPlan'  && uploadValues['status']==='sale')
        {
          formData.append(key,' ');
          console.log(key + uploadValues['status'])

        }
        formData.append(key,uploadValues[key])


      }
    }
    for (var i = 0; i < arrayImages.length; i++) { 
      formData.append("images", arrayImages[i]);
    }

  const user_id = JSON.parse(this.user)._id, phone = JSON.parse(this.user).phone;
  console.log(this.user)
  formData.append('userID', user_id)
  formData.append('phoneRenter', phone)
  let headers = new HttpHeaders();
  this.loadToken();
    


    return this.http.post('http://localhost:3000/uploads/uploadHouse', formData)

  }


  fetchHouses()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/getHouses' ,{headers: headers})
  }

  fetchRentRecords()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/rentRecords' ,{headers: headers})
  }

  rentTransaction(record:any)
  {

    let obj = {
      dateStart: record.dateStart.getTime(),
      dateEnd: record.dateEnd.getTime(),
      rentPlan: record.rentPlan,
      clientPhone: record.clientPhone,
      houseId: record.houseId,
      status:record.status

    }
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:3000/transaction/request' ,obj, {headers: headers})
  }
  renterTransactionResponse(response:any, houseId:any)
  {
    let responseObj = {
      response: response,
      houseId:houseId
    }
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');

    return this.http.post('http://localhost:3000/transaction/response' ,responseObj, {headers: headers})
  }
  fetchUser()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/getUsers' ,{headers: headers})

  }
  fetchAdmin()
  {
    let headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.get('http://localhost:3000/fetch/getAdmin' ,{headers: headers})
  }
  registerUser(user:any)
  
    {
      let headers = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/users/register' , user, {headers: headers})
  }
  

}

