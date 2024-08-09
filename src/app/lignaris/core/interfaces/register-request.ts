export interface RegisterRequest {
  nombre: string,
  apellidoPaterno: string, 
  apellidoMaterno: string, 
  telefono: string, 
  direccion: string,
  email: string
  password: string;
  roles: ['Cliente'];
}
