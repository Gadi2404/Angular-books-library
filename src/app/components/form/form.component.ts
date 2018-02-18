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
    defaultImg = 'assets/images/imageNotAvailable.jpg';

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

            if( prop !== 'id' && !this.model[prop] )
                return
        }

        // set a default image if image is not loading
        if( !this.isImageLoading(this.model.image) )
            this.model.image = this.defaultImg;

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
                                     this.getBookImageValue(this.formData.image),
                                     this.formData.id) :
                            new Book()
    }

    // display images that are not the default (not available image)
    getBookImageValue(currentImg){
        return currentImg === this.defaultImg? '' : currentImg
    }

    isImageLoading(imgSrc: string){
        let imgObj = new Image();
        imgObj.src = imgSrc;

        if( !imgObj.complete )
            return false

        return true
    }

}

class Book {
  constructor(
    public title: string = '',
    public author: string = '',
    public date: string = '',
    public image: string = '',
    public id: string = ''
  ) {  }
}