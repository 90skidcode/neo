import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Initialize All Required DOM Element
    const burgerMenu: any = document.getElementById("burger");
    const navbarMenu: any = document.getElementById("menu");

    // Initialize Responsive Navbar Menu
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      navbarMenu.classList.toggle("active");

      if (navbarMenu.classList.contains("active")) {
        navbarMenu.style.maxHeight = navbarMenu.scrollHeight + "px";
      } else {
        navbarMenu.removeAttribute("style");
      }
    });




  }



}
