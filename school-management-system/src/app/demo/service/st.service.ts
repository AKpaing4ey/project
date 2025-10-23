import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StService {

  BASEURL = environment.BASEURL;

  constructor(private http: HttpClient) { }

  allUser() {
        return this.http.get(this.BASEURL + 'user').pipe(
            map(
                response => response
            )
        )
    };

    loginUser(obj: any) {
        let url = this.BASEURL + 'user/sign_in/';
        return this.http.post(url, obj).pipe(
            map(
                response => response
            )
        )
    }

    saveUser(obj: any) {
        let url = this.BASEURL + 'user/sign_up/';
        return this.http.post(url, obj).pipe(
            map(
                response => response
            )
        )
    };

    updateUser(obj: any) {
        let url = this.BASEURL + 'user/update/';
        return this.http.put(url, obj).pipe(
            map(
                response => response
            )
        )
    };

    deleteUser(id: any) {
        let url = this.BASEURL + 'user/delete/';
        return this.http.post(url, { user_id: id }).pipe(
            map(
                response => response
            )
        )
    };

    allRoles() {
        return this.http.get(this.BASEURL + 'role').pipe(
            map(
                response => response
            )
        )
    };

    saveRole(obj: any) {
        let url = this.BASEURL + 'role/create/';
        return this.http.post(url, obj).pipe(
            map(
                response => response
            )
        )
    };


    updateRole(obj: any) {
        let url = this.BASEURL + 'role/update/';
        return this.http.put(url, obj).pipe(
            map(
                response => response
            )
        )
    };

    deleteRole(id: any) {
        let url = this.BASEURL + 'role/delete/';
        return this.http.post(url, id).pipe(
            map(
                response => response
            )
        )
    };

    allClass() {
        return this.http.get(this.BASEURL + 'class').pipe(
            map(
                response => response
            )
        )
    };

    saveClass(obj: any) {
        let url = this.BASEURL + 'class/create/';
        return this.http.post(url, obj).pipe(
            map(
                response => response
            )
        )
    };


    updateClass(obj: any) {
        let url = this.BASEURL + 'class/update/';
        return this.http.put(url, obj).pipe(
            map(
                response => response
            )
        )
    };

    deleteClass(obj: any) {
        let url = this.BASEURL + 'class/delete/';
        return this.http.post(url,{class_id: obj}).pipe(
            map(
                response => response
            )
        )
    };

  allAttendance() {
    return this.http.get(this.BASEURL + 'attendance').pipe(
      map(data => data)
    )
  }

  saveAttendance(obj: any) {
    let url = this.BASEURL + 'attendance/create/';
    return this.http.post(url, obj).pipe(
      map(
        res => res
      )
    )
  }

  updateAttendance(obj: any) {
    let url = this.BASEURL + 'attendance/update/';
    return this.http.put(url, obj).pipe(
      map(
        res => res
      )
    )
  }

  deleteAttendance(id: any) {
    let url = this.BASEURL + 'attendance/delete/';
    return this.post(url, id);
  }


    allAnnouncement() {
        let url = this.BASEURL + 'notice';
        return this.get(url);
    }

    updateAnnouncement(obj) {
        let url = this.BASEURL + 'notice/update/';
        return this.put(url, obj);
    }

    saveAnnouncement(obj) {
        let url = this.BASEURL + 'notice/create/';
        return this.post(url, obj);
    }

    deleteAnnouncement(id) {
        let url = this.BASEURL + 'notice/delete/';
        return this.post(url, id);
    }
  getString(key: string): Promise<string | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Storage.get({ key });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    });
  }

  setString(key: string, value: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await Storage.set({ key, value });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  removeString(key: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await Storage.remove({ key });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  post(url: any, obj: any) {
    return this.http.post(url, obj).pipe(
      map(
        res => res
      )
    )
  }

  put(url: any, obj: any) {
        return this.http.put(url, obj).pipe(
            map(
                res => res
            )
        )
    }

  get(url: any) {
    return this.http.get(url).pipe(
      map(
        res => res
      )
    )
  }

}
