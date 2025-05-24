import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '../../services/producto.service';
import { Categoria } from '../../models/categoria';
import { MatDialogModule } from '@angular/material/dialog'

@Component({
  selector: 'app-producto-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './producto-dialog.component.html'
})
export class ProductoDialogComponent implements OnInit {
  producto: any;
  categorias: Categoria[] = [];

  constructor(
    private dialogRef: MatDialogRef<ProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService
  ) {
    this.producto = { ...data };
  }

  ngOnInit() {
    this.categoriaService.getCategorias().subscribe(c => this.categorias = c);
  }

  guardar() {
    this.dialogRef.close(this.producto);
  }

  cancelar() {
    this.dialogRef.close();
  }
}
