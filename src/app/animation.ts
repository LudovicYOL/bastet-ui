import { trigger, transition, style, state, group, query, animate, animateChild } from '@angular/animations';

export const slideInOutAnimation =
trigger('routeAnimations', [
    transition('* => RegisterPage, :enter', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%'}), { optional: true }),
        query(':enter', style({ transform: 'translateX(-100vw)' }), { optional: true }),
        query(':leave', style({ transform: 'translateX(0vw)' }), { optional: true }),
        group([
          query(':leave', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(100vw)'
            }))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ]),
      transition('RegisterPage => *, :enter', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%', height: '100%'}), { optional: true }),
        query(':enter', style({ transform: 'translateX(+100vw)' }), { optional: true }),
        query(':leave', style({ transform: 'translateX(0vw)' }), { optional: true }),
        group([
          query(':leave', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(-100vw)'
            }))
          ], { optional: true }),
          query(':enter', [
            animate('500ms ease-in-out', style({
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])
      ])
  ]);

