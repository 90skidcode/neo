
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-questionbook',
  templateUrl: './questionbook.component.html',
  styleUrls: ['./questionbook.component.less']
})
export class QuestionbookComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  constructor(private renderer: Renderer2, private router: Router) {
  }
  ngOnInit(): void {
    this.dtOptions = {
      responsive: true,
      columns: [{
        title: 'கேள்வி எண்',
        data: 'id',
        width: "10%",
      }, {
        title: 'கேள்வி',
        data: 'firstName'
      }, {
        title: 'நடவடிக்கை',
        className: "text-center",
        width: "20%",
        render: function (data: any, type: any, full: any) {
          return `<button class="waves-effect btn"   data-id="${full.id}" data-type="view"><i class="gg-eye"></i></button>
                  <button class="waves-effect btn btn-warning" data-id="${full.id}" data-type="view"><i class="gg-pen"></i></button>
                  <button class="waves-effect btn btn-danger" data-id="${full.id}" data-type="delete"><i class="gg-trash"></i></button>`;
        }
      }]
    };
  }

  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      let id = event.target.getAttribute("data-id") || event.target.parentElement.getAttribute("data-id");
      if (event.target.hasAttribute("data-id") || event.target.parentElement.hasAttribute("data-id")) {
        if (event.target.getAttribute("data-type") == 'view' || event.target.parentElement.getAttribute("data-type") == 'view')
          this.router.navigate(["/question-paper/"+id+"/view"]);
        else if (event.target.getAttribute("data-type") == 'edit' || event.target.parentElement.getAttribute("data-type") == 'edit')
          this.router.navigate(["/question-paper", { id: id, type: 'edit' }]);
        else if (event.target.getAttribute("data-type") == 'delete' || event.target.parentElement.getAttribute("data-type") == 'delete')
          console.log('delete');
      }
    });
  }

}


