export class Blog {
  public id: number;
  public titulo: string;
  public categoria: string;
  public contendio: string;
  public fecha: string;
  public fotoBase64: string;


  constructor(id: number, tit: string, cate: string, cont: string, date: string, foto64: string) {
    this.id = id;
    this.titulo = tit;
    this.categoria = cate;
    this.contendio = cont;
    this.fecha = date;
    this.fotoBase64 = foto64;
  }
}
