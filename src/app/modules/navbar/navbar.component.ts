import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Cart } from '../../entities/cart.model';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { PupUpMessageComponent } from '../../components/pup-up-message/pup-up-message.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  loginData = {
    email: '',
    password: '',
  };
  users = [
    {
      name: 'admin',
      email: 'admin@example.com',
      password: 'adminPassword',
      isAdmin: true,
    },
    {
      name: 'user',
      email: 'user@example.com',
      password: 'userPassword',
      isAdmin: false,
    },
  ];

  @Output() deleteProductToCart: EventEmitter<Cart> = new EventEmitter();
  @Output() addOrderOut: EventEmitter<string> = new EventEmitter();
  @Input() itemsCart!: Cart[];
  @Input() source: string = '';

  currentUser: any = JSON.parse(localStorage.getItem('currentUser') || '{}');

  constructor(private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  }
  goAdmin() {
    this.router.navigate(['/admin']);
  }
  deleteProduct(item: Cart) {
    this.deleteProductToCart.emit(item);
  }
  addOrder() {
    if (this.currentUser!=null){
      this.addOrderOut.emit();
    }
    else{
      this.mesagge('Uppss!','Tienes que haber iniciado sessión para poder finalizar tu compra')
    }
  }
  onLoginSubmit(): void {
    const user = this.validateUser();
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      console.log('Credenciales incorrectas');
    }
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/home']);
  }
  validateUser() {
    const { email, password } = this.loginData;
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    );
    return user;
  }
  mesagge(title:string,message:string): void {
    const dialogRef = this.dialog.open(PupUpMessageComponent, {
      width: '50%',
      panelClass: 'modal-pricing-plans-page',
      data: {
        title: title,
        message: message,
      }
    });
  }
}
