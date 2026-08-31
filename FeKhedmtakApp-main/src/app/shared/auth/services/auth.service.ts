import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  AuthResult,
  LoginData,
  RegisterData,
  User
} from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly usersStorageKey =
    'fekhedmtak-users';

  private readonly currentUserStorageKey =
    'fekhedmtak-current-user';


  private readonly currentUserSubject =
    new BehaviorSubject<User | null>(
      this.loadCurrentUser()
    );


  readonly currentUser$ =
    this.currentUserSubject.asObservable();


  register(
    data: RegisterData
  ): AuthResult {

    const users =
      this.getUsers();


    const normalizedEmail =
      data.email
        .trim()
        .toLowerCase();


    const existingUser =
      users.find(
        user =>
          user.email.toLowerCase() ===
          normalizedEmail
      );


    if (existingUser) {

      return {
        success: false,
        message: 'البريد الإلكتروني مستخدم بالفعل'
      };

    }


    const newUser: User = {

      id:
        `user-${Date.now()}`,

      name:
        data.name.trim(),

      email:
        normalizedEmail,

      phone:
        data.phone.trim(),

      password:
        data.password,

      createdAt:
        new Date().toISOString()

    };


    users.push(newUser);


    localStorage.setItem(
      this.usersStorageKey,
      JSON.stringify(users)
    );


    this.setCurrentUser(
      newUser
    );


    return {
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      user: newUser
    };
  }


  login(
    data: LoginData
  ): AuthResult {

    const normalizedEmail =
      data.email
        .trim()
        .toLowerCase();


    const user =
      this.getUsers().find(
        savedUser =>
          savedUser.email.toLowerCase() ===
            normalizedEmail &&
          savedUser.password ===
            data.password
      );


    if (!user) {

      return {
        success: false,
        message:
          'البريد الإلكتروني أو كلمة المرور غير صحيحة'
      };

    }


    this.setCurrentUser(
      user
    );


    return {
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      user
    };
  }


  logout(): void {

    localStorage.removeItem(
      this.currentUserStorageKey
    );


    this.currentUserSubject.next(
      null
    );
  }


  getCurrentUser():
    User | null {

    return this.currentUserSubject.value;
  }


  isLoggedIn():
    boolean {

    return (
      this.currentUserSubject.value !==
      null
    );
  }


  emailExists(
    email: string
  ): boolean {

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();


    return this.getUsers()
      .some(
        user =>
          user.email.toLowerCase() ===
          normalizedEmail
      );
  }


  resetPassword(
    email: string,
    newPassword: string
  ): AuthResult {

    const normalizedEmail =
      email
        .trim()
        .toLowerCase();


    const users =
      this.getUsers();


    const userIndex =
      users.findIndex(
        user =>
          user.email.toLowerCase() ===
          normalizedEmail
      );


    if (userIndex === -1) {

      return {
        success: false,
        message:
          'لا يوجد حساب مسجل بهذا البريد الإلكتروني'
      };

    }


    users[userIndex] = {
      ...users[userIndex],
      password: newPassword
    };


    localStorage.setItem(
      this.usersStorageKey,
      JSON.stringify(users)
    );


    const currentUser =
      this.getCurrentUser();


    if (
      currentUser?.email.toLowerCase() ===
      normalizedEmail
    ) {

      this.setCurrentUser(
        users[userIndex]
      );

    }


    return {
      success: true,
      message:
        'تم تغيير كلمة المرور بنجاح',
      user:
        users[userIndex]
    };
  }


  private getUsers():
    User[] {

    try {

      const savedUsers =
        localStorage.getItem(
          this.usersStorageKey
        );


      if (!savedUsers) {
        return [];
      }


      const parsed =
        JSON.parse(
          savedUsers
        );


      return Array.isArray(parsed)
        ? parsed as User[]
        : [];

    } catch {

      return [];
    }
  }


  private setCurrentUser(
    user: User
  ): void {

    localStorage.setItem(
      this.currentUserStorageKey,
      JSON.stringify(user)
    );


    this.currentUserSubject.next(
      user
    );
  }


  private loadCurrentUser():
    User | null {

    try {

      const savedUser =
        localStorage.getItem(
          this.currentUserStorageKey
        );


      if (!savedUser) {
        return null;
      }


      return JSON.parse(
        savedUser
      ) as User;

    } catch {

      return null;
    }
  }

}