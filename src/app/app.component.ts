import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import uniqid from 'uniqid';
import ModalData from './components/modal/modalData.interface';
import { ModalDataService } from './services/modalData/modal-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
    bookListData:Array<object>;
    isDataLoaded:boolean = false;

    constructor(private http:Http, private modalDataService:ModalDataService){
       this.getData()
                .map((res:Response) => res.json().map(book => (book.id = uniqid()) && book))
                .subscribe(this.onDataDone.bind(this))
    }

    ngOnInit(){}

    getData(){
        return this.http.get('./assets/data/data.json')
    }

    onDataDone(data:Array<object>):void{
        this.bookListData = data;
        this.isDataLoaded = true;
    }

    handelBookListDataUpdate(data:Array<object>){
        this.bookListData = data;
    }

    onAddBookBtnClick():void{
        let modalData:ModalData = {
            isOpen: true,
            title: 'Add A Book',
            actionType: 'add',
            modalType: 'form',
            data: {},
            callback: addData.bind(this)
        };

        function addData(book):void {
            let index = this.bookListData.findIndex(bookData => (bookData.title.toLowerCase() === book.title.toLowerCase()) && (bookData.author.toLowerCase() === book.author.toLowerCase()));

            if( index != -1 )
                return console.warn('the book already exists in the list!')

            this.bookListData = this.bookListData.concat(book);
        }

        this.modalDataService.updateModalData(modalData)
    }
}