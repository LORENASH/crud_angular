import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductoService, CategoriaService } from '../../services/producto.service';
import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';
import { ProductoDialogComponent } from '../../components/producto-dialog/producto-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,

  ],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {
  displayedColumns = ['id', 'nombre', 'precio', 'categoria', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  categorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Inyectamos las dependencias correctamente
  dialog = inject(MatDialog);
  service = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  snack = inject(MatSnackBar);
  router = inject(Router);

  ngOnInit() {
    this.listar();
    this.categoriaService.getCategorias().subscribe(c => this.categorias = c);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listar() {
    this.service.get().subscribe(productos => {
      this.dataSource.data = productos; // ✅ ¡Esto es importante!
    });
  }

  abrirDialogo(producto?: Producto) {
    const dialogRef = this.dialog.open(ProductoDialogComponent, {
      width: '400px',
      data: producto ? { ...producto } : { nombre: '', precio: 0, descripcion: '', categoriaId: null }
    });

    dialogRef.afterClosed().subscribe((resultado) => {
      if (resultado) {
        if (producto) {
          this.service.update(resultado.id, resultado).subscribe(() => {
            this.snack.open('Actualizado', 'OK', { duration: 2000 });
            this.listar();
          });
        } else {
          this.service.create(resultado).subscribe(() => {
            this.snack.open('Creado', 'OK', { duration: 2000 });
            this.listar();
          });
        }
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.service.delete(id).subscribe(() => {
        this.snack.open('Eliminado', 'OK', { duration: 2000 });
        this.listar();
      });
    }
  }

  getNombreCategoria(id: number): string {
    const categoria = this.categorias.find(c => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

logout() {
  localStorage.removeItem('usuario');
  this.router.navigate(['/login']);
}

}
