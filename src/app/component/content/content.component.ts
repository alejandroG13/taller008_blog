import { ARREGLO_BLOG } from './../mocks/blog-mock';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Blog } from './../models/blog';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public blogSeleccionado: Blog;
  public blogArreglo: Blog[];
  public tmpBase64: any;
  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;
  public initializeModal: any;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.blogSeleccionado = new Blog(0, '', '', '','','');
    this.blogArreglo = ARREGLO_BLOG;
    this.modalRef = this.initializeModal;
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
  }

  ngOnInit(): void {}

  public cancelar(): void {
    this.blogSeleccionado = new Blog(0, '', '', '','','');
    this.modalRef.hide();
  }

  public grabarBlog(): boolean {
    if (
      this.blogSeleccionado.titulo == '' ||
      this.blogSeleccionado.fotoBase64 == '' ||
      this.blogSeleccionado.contendio ==''
    ) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-bottom-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'No se pueden crear <br/> registros vacios',
        'ADVERTENCIA',
        parametros
      );
      return false;
    } else {
      this.blogSeleccionado.id = this.blogArreglo.length + 1;
      this.blogArreglo.push(this.blogSeleccionado);
      return true;
    }
  }

  public procesarBlog(): void {
    if (this.blogSeleccionado.id === 0) {
      this.grabarBlog();
    }
    this.blogSeleccionado = new Blog(0, '', '', '','','');
    this.modalRef.hide();
  }

  public eliminarBlog(objFoto: Blog): void {
    this.blogArreglo = this.blogArreglo.filter(
      (elemento) => elemento != objFoto
    );
    this.blogSeleccionado = new Blog(0, '', '', '','','');
  }

  public eliminar(): void {
    this.eliminarBlog(this.blogSeleccionado);
    this.modalRef.hide();
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public abrirModal(template: TemplateRef<any>, blogTmp: Blog): void {
    this.blogSeleccionado = blogTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'ADVERTENCIA';
    this.modalTexto = '¿Realmente quiere eliminar este registro?';
  }



  public seleccionarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    const mimeType = input.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };

      this.toastr.error(
        'Solo se permiten <strong> imágenes</strong>',
        'Te lo estoy advirtiendo',
        parametros
      );
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;

      this.blogSeleccionado.fotoBase64 = this.tmpBase64;
    };
  }

}
