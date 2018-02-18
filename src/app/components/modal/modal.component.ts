import { Component, OnInit, Input } from '@angular/core';
import uniqid from 'uniqid';
import ModalData from './modalData.interface';
import { ModalDataService } from '../../services/modalData/modal-data.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
    modalData:ModalData;

    constructor(private modalDataService:ModalDataService) {}

    ngOnInit() {
        this.modalDataService.modalUpdate.subscribe((data:ModalData) => this.modalData = data)
    }

    ngOnChanges(){}

    onCloseModal():void{
        this.modalData.isOpen = false;

        // reset the type after the animation is finished
        setTimeout(()=> this.modalData.modalType = '' , 150)
    }

    onConfirmBtnClick():void{
        switch(this.modalData.actionType){
            case "delete":
                this.deleteBook()
                break;
        }
    }

    editBook(book):void{
        this.modalData.callback(book);
        this.onCloseModal();
    }

    deleteBook():void {
        let book = this.modalData.data;
        this.modalData.callback(book)
        this.onCloseModal();
    }

    addBook(book):void {
        book.id = uniqid();
        this.modalData.callback(book);
        this.onCloseModal();
    }

    handleFormUpdates(formData){
        switch(formData.actionType){
            case "submit":
                handleFormSubmission.call(this, formData.data)
                break;
            case "close":
                this.onCloseModal();
                break;
        }

        function handleFormSubmission(data) {
            switch(this.modalData.actionType){
                case "edit":
                    this.editBook(data)
                    break;
                case "add":
                    this.addBook(data)
                    break;
            }
        }
    }
}