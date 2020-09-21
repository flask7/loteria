import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from '../comunicacion.service';
import * as moment from 'moment';

@Component({
  selector: 'app-combinazione',
  templateUrl: './combinazione.page.html',
  styleUrls: ['./combinazione.page.scss'],
})
export class CombinazionePage implements OnInit {

	excluir: any = [];
	incluir: any = [];
	combinacion: any = [];
	ultimos: any[3] = [];
	fechas: any[3] = [];
	usuario: string = localStorage.getItem('usuario');
	hoy: any = moment();
	contador: number = parseInt(JSON.parse(localStorage.getItem('contador')));

	meses = ['gennaio',
			'febbraio',
			'marzo',
			'aprile',
			'maggio',
			'giugno',
			'luglio',
			'agosto',
			'settembre',
			'ottobre',
			'novembre',
			'dicembre'];


  constructor(private service: ComunicacionService) {

  	if (!this.contador || this.contador == undefined) {
  		this.contador = 0;
  	}

  	this.hoy = this.hoy.format('DD') + ' ' + this.meses[ this.hoy.format('M')-1 ] + ' ' + this.hoy.format('YYYY');

  }

  ngOnInit() {

  	this.service.changeData(this.usuario);

  	if (localStorage.getItem('excluidos') && localStorage.getItem('excluidos') != undefined) {
  		
  		this.excluir = JSON.parse(localStorage.getItem('excluidos'));
  	
  	}else{
  		
  		localStorage.setItem('excluidos', JSON.stringify(this.excluir));

  	}

  	if (localStorage.getItem('combinacion') && localStorage.getItem('combinacion') != undefined) {
  		
  		this.combinacion = JSON.parse(localStorage.getItem('combinacion'));
  	
  	}else{
  		
      this.random();
  		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));

  	}

  	if (localStorage.getItem('incluidos') && localStorage.getItem('incluidos') != undefined) {
  		
  		this.incluir = JSON.parse(localStorage.getItem('incluidos'));

  	}else{

  		localStorage.setItem('incluidos', JSON.stringify(this.incluir));

  	}

  	if (localStorage.getItem('ufechas') && localStorage.getItem('ufechas') != undefined) {

  		this.fechas = JSON.parse(localStorage.getItem('ufechas'));
  	
  	}else{

  		this.fechas = [];
  		localStorage.setItem('ufechas', JSON.stringify(this.fechas));

  	}

  	if (localStorage.getItem('ultimos') && localStorage.getItem('ultimos') != undefined) {

  		this.ultimos = JSON.parse(localStorage.getItem('ultimos'));
  	
  	}else{

  		this.ultimos = [];
  		localStorage.setItem('ultimos', JSON.stringify(this.ultimos));

  	}

  }

  getRandomArbitrary(min, max, n:any = [], exc:any = []){

	  let number = Math.floor(Math.random() * (max - min) + min);
	  let a = 0;

  	for (let i = 0; i < n.length; i++) {
  		if (n[i] == number) {
  			a++;
  		}
  	}

  	for (let i = 0; i < exc.length; i++) {
  		if (exc[i] == number) {
  			a++;
  		}
  	}

  	if (a > 0) {
  		return this.getRandomArbitrary(min,max,n);
  	}else{
  		return number;
  	}

  }

  random(){

    if (this.combinacion.length > 0) {
      
      this.contador++;
    
    }else{
      
      this.contador = 0;

    }

		this.combinacion = [];
		let omitir = [];

		if (this.incluir) {
			for (let h in this.incluir) {
				this.combinacion.push(this.incluir[h]);
			}
		}

		for (var i = 0; i < (5 - this.incluir.length); i++) {	
			this.combinacion.push( this.getRandomArbitrary(1, 55, this.combinacion, this.excluir) );
		}

		this.combinacion = this.combinacion.sort((a,b)=> a - b);

		if (this.ultimos.length == 3 && this.fechas.length == 3) {

			this.fechas.shift();
			this.ultimos.shift();

		}

    let final = this.ultimos.length;

    if (this.combinacion.length > 0) {
      
      this.ultimos[final - 1] = this.combinacion;
      this.fechas[final - 1] = this.hoy;

    }else{

      this.ultimos.push(this.combinacion);
      this.fechas.push(this.hoy);

    }

		localStorage.setItem('combinacion', JSON.stringify(this.combinacion));
		localStorage.setItem('ultimos', JSON.stringify(this.ultimos.reverse()));
		localStorage.setItem('ufechas', JSON.stringify(this.fechas.reverse()));
		localStorage.setItem('contador', JSON.stringify(this.contador));
		localStorage.setItem('horaClick', moment().format('YYYY-MM-DD HH:mm:ss'));

	}

}