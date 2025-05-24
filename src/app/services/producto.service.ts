import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private API = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}

  get(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API);
  }

  create(p: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.API, p);
  }

  update(id: number, p: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API}/${id}`, p);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }
}
