import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    @Input() formData;
    @Output() onFormUpdate: EventEmitter<any> = new EventEmitter<any>();
    model;

    constructor() {}

    ngOnInit() {
    }

    // activate every time the component data changes
    ngOnChanges(){
        this.createModel();
    }

    onSubmit(event) {
        // prevent user from updating book data with the same data
        if( JSON.stringify(this.formData) === JSON.stringify(this.model) )
            return

        // trim form values and prevent updating empty values
        for( let prop in this.model ){
            this.model[prop] = this.model[prop].trim();

            if( prop !== 'id' && prop !== 'image' && !this.model[prop] ) return
        }

        this.onFormUpdate.emit({
            actionType: 'submit',
            data: this.model
        })
    }

    onFormClose(){
        this.onFormUpdate.emit({
            actionType: 'close',
            data: this.model
        })
    }

    createModel(){
        this.model = Object.keys(this.formData).length ?
                            new Book(this.formData.title,
                                     this.formData.author,
                                     this.formData.date,
                                     this.formData.image,
                                     this.formData.id) :
                            new Book()
    }

}

class Book {
  constructor(
    public title: string = '',
    public author: string = '',
    public date: string = '',
    public image: string = 'https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg',
    public id: string = ''
  ) {  }
}