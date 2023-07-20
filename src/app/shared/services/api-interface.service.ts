import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiInterfaceService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Sends a HTTP POST to the API at the given end point path.
   *
   * @param path - The end point path to send the request to.
   * @param body - The body of the post request.
   * @param [requireAuth=false] - If the call should have the auth headers attached.
   * @param [params] - Optional query params for the request.
   * @param [responseType=false] -Set response type flag for file type.
   * @param fullResponse - To get response object and not the body content.
   */
  post(
    path: string,
    body: any,
    requireAuth = false,
    params?: any,
    responseType = false,
    fullResponse = false
  ) {
    // check if responseType = false then set response type arraybuffer
    const options: {
      headers?: HttpHeaders;
      observe?: any;
      params?: HttpParams;
      reportProgress?: boolean;
      responseType: any;
      withCredentials?: boolean;
    } = {
      params,
      headers:  new HttpHeaders(),
      responseType: responseType ? ('arraybuffer' as const) : 'json',
      observe: fullResponse ? ('response' as const) : 'body',
    };

    return this.http.post(environment.baseUrl + path, body, options)
  }

  /**
   * Sends a HTTP PUT to the API at the given end point path.
   *
   * @param path - The end point path to send the request to.
   * @param body - The body of the put request.
   * @param [requireAuth=false] - If the call should have the auth headers attached.
   * @param [params] - Optional query params for the request.
   * @param [responseType=false] -Set response type flag for file type.
   *
   */
  put(
    path: string,
    body: any,
    requireAuth = false,
    params?: any,
    responseType = false
  ) {
    // check if responseType = false then set response type arraybuffer
    if (responseType) {
      return this.http.put(environment.baseUrl + path, body, {
        params,
        headers: new HttpHeaders(),
        responseType: 'arraybuffer',
      });
    }
    return this.http.put(environment.baseUrl + path, body, {
      params,
      headers: new HttpHeaders(),
    });
  }

  /**
   * Sends a HTTP PATCH to the API at the given end point path.
   *
   * @param path - The end point path to send the request to.
   * @param body - The body of the patch request.
   * @param [requireAuth=false] - If the call should have the auth headers attached.
   * @param [params] - Optional query params for the request.
   *
   */
  patch(path: string, body: any, requireAuth = false, params?: any) {
    return this.http.patch(environment.baseUrl + path, body, {
      params,
      headers: new HttpHeaders(),
    });
  }

  /**
   * Sends a HTTP GET to the API at the given end point path.
   *
   * @param path - The end point path to send the request to.
   * @param [requireAuth=false] - If the call should have the auth headers attached.
   * @param [params] - Optional query params for the request.
   * @param withCredentials - Optional if the request should attach http cookie for auth.
   * @param [responseType=false] -Set response type flag for file type.
   *
   */
  get(
    path: string,
    requireAuth = false,
    params?: any,
    withCredentials?: boolean,
    responseType = false
  ) {
    // check if responseType = true then set response type arraybuffer
    const options: {
      headers?: HttpHeaders;
      params?: HttpParams;
      responseType: any;
      withCredentials?: boolean;
    } = {
      params,
      headers: new HttpHeaders(),
      responseType: responseType ? ('arraybuffer' as const) : 'json',
      withCredentials,
    };

    return this.http.get(environment.baseUrl + path, options);
  }

  /**
   * Sends a HTTP DELETE to the API at the given end point path.
   *
   * @param path - The end point path to send the request to.
   * @param {boolean=false} requireAuth - If the call should have the auth headers attached.
   * @param params - Optional query params for the request.
   * @param withCredentials - Optional if the request should attach http cookie for auth.
   */
  delete(
    path: string,
    requireAuth = false,
    params?: any,
    body?: any,
    withCredentials?: boolean
  ) {
    return this.http.delete(environment.baseUrl + path, {
      params,
      headers: new HttpHeaders(),
      withCredentials,
      body
    });
  }
}
