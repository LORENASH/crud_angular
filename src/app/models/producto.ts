export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoriaId: number | null;
}
