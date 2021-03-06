import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ComunicacionService } from '../comunicacion.service';
import { EventsService } from '../services/events.service';
import { Numeros } from '../numeros';
import { Router } from  '@angular/router';
import { MenuController, ModalController } from  '@ionic/angular';
import * as moment from 'moment';

import { CombinazionePage } from '../combinazione/combinazione.page';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
  providers: [CombinazionePage]
})
export class FeedPage implements OnInit {

  usuario: any = localStorage.getItem('usuario');
  horas: any = [];
  hh = this.service.hSorteo;

  combinaciones;

  constructor(private menu: MenuController, private service: ComunicacionService, private router: Router, public combinazione: CombinazionePage, public modal: ModalController, public events: EventsService) {
    this.menu.enable(true);
  }

  ngOnInit() {

    this.service.changeData(this.usuario);
    this.reloj();
    // this.notificar();

  }

  // notificar(){

  //   let horaInicio = moment(moment().format('YYYY-MM-DD HH:mm:ss'));
  //   let horaFin = moment(moment().format('YYYY-MM-DD ' + '19:05:00'));
  //   let referencia;
  //   let hora = Date();
  //   let correo = localStorage.getItem('correo');

  //   if (horaFin > horaInicio) {
      
  //     referencia = 0;

  //   }else{

  //     referencia = 1;

  //   }

  //   let json = {
  //     correo: correo,
  //     referencia: referencia,
  //     hora: hora
  //   }

  //   this.service.notificaciones_push(json).subscribe((data) => {

  //     console.log(data);

  //   }, Error => {

  //     return this.notificar();

  //   });

  // }

  // refrescar(){
  //   let mostrar_hora = () => {

  //     this.horas = [];
  //     this.service.hora$.subscribe(res => {

  //       let verificar = document.getElementById("hh1");

  //       if (verificar) {

  //         verificar.innerHTML = res[0];
  //         document.getElementById("mh1").innerHTML = res[1];
  //         document.getElementById("sh1").innerHTML = res[2];
          
  //       }else{
  //         clearInterval(intervalo);
  //       }

  //     });
  //   }
  //   let intervalo = setInterval(mostrar_hora, 1000);
  // }

  // toggle(event){

  //   const menu = document.getElementById("menu");
  //   const app = document.getElementById("game");

  //   if (menu.style.display == 'none') {

  //     app.style.display = 'none';
  //     menu.style.display = 'block';

  //   }else{

  //     menu.style.display = 'none';
  //     app.style.display = 'block';

  //   }
  // }

  // salir(event){
  //   this.router.navigateByUrl('/home');
  // }

  reloj(){
    // console.log('reloj');
    function CountdownTracker(label, value){

      var el = document.createElement('span');

      el.className = 'flip-clock__piece';
      el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
        '<span class="flip-clock__slot">' + label + '</span>';

      this.el = el;

      var top = el.querySelector('.card__top') as HTMLElement,
          bottom = el.querySelector('.card__bottom'),
          back = el.querySelector('.card__back'),
          backBottom = el.querySelector('.card__back .card__bottom');

      this.update = function(val){
        val = ( '0' + val ).slice(-2);
        if ( val !== this.currentValue ) {
          
          if ( this.currentValue >= 0 ) {
            back.setAttribute('data-value', this.currentValue);
            bottom.setAttribute('data-value', this.currentValue);
          }
          this.currentValue = val;
          top.innerText = this.currentValue;
          backBottom.setAttribute('data-value', this.currentValue);

          this.el.classList.remove('flip');
          void this.el.offsetWidth;
          this.el.classList.add('flip');
        }
      }
      
      this.update(value);
    }

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date().toString());
      return {
        'Total': t,
        '<p>ORE</p>': Math.floor((t / (1000 * 60 * 60)) % 24),
        '<p>MINUTI</p>': Math.floor((t / 1000 / 60) % 60),
        '<p>SECONDI</p>': Math.floor((t / 1000) % 60)
      };
    }

    function getTime() {
      var t = new Date();
      return {
        'Total': t,
        'Hours': t.getHours() % 12,
        'Minutes': t.getMinutes(),
        'Seconds': t.getSeconds()
      };
    }

    function Clock(countdown,callback) {
      
      countdown = countdown ? new Date(Date.parse(countdown)) : false;
      callback = callback || function(){};
      
      var updateFn = countdown ? getTimeRemaining : getTime;

      this.el = document.createElement('div');
      this.el.className = 'flip-clock';

      var trackers = {},
          t = updateFn(countdown),
          key, timeinterval;

      for ( key in t ){
        if ( key === 'Total' ) { continue; }
        trackers[key] = new CountdownTracker(key, t[key]);
        this.el.appendChild(trackers[key].el);
      }

      var i = 0;
      function updateClock() {

        timeinterval = requestAnimationFrame(updateClock);
        
        if ( i++ % 10 ) { return; }
        
        var t = updateFn(countdown);
        if ( t.Total < 0 ) {
          cancelAnimationFrame(timeinterval);
          for ( key in trackers ){
            trackers[key].update( 0 );
          }
          callback();
          return;
        }
        
        for ( key in trackers ){
          trackers[key].update( t[key] );
        }
      }

      setTimeout(updateClock, 500);
    }

    let mins8 = moment(moment().format('YYYY-MM-DD '+this.hh));
    let now;

    let restante = mins8.diff(moment(),'seconds');

    // console.log(restante)

    if (restante < 0) {
      now = moment(moment(new Date()).add(1,'days').format('YYYY-MM-DD ' + this.hh));
    }else{
      now = moment(moment().format('YYYY-MM-DD '+this.hh));
    }

    var deadline = new Date(Date.parse(now));
    var c = new Clock(deadline, ()=> {document.getElementById('tiempo').innerHTML = ""; this.reloj();/*alert('countdown complete')*/ });
    document.getElementById('tiempo').appendChild(c.el);

  }

}