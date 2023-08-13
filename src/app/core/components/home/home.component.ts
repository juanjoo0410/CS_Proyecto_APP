import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(150px)'
      })),
      transition('show => hide', animate('300ms ease-out')),
      transition('hide => show', animate('300ms ease-in'))
    ]),
    
  ],
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  state = 'hide'

  constructor() {
    window.addEventListener('scroll', () => {
      const top = window.pageYOffset;
      const bottom = window.pageYOffset + window.innerHeight;
      const sections = document.querySelectorAll('section');

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = section.offsetTop + section.offsetHeight;

        if (sectionTop <= bottom && sectionBottom >= top) {
          this.state = 'show';
        } else {
          this.state = 'hide';
        }
      });
    });

 
  }


}
