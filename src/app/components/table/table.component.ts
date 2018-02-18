import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import ModalData from '../modal/modalData.interface';
import { ModalDataService } from '../../services/modalData/modal-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    @Input() bookList: Array<object>;
    @Output() onBookListDataUpdate: EventEmitter<any> = new EventEmitter<any>();

    constructor(private modalDataService:ModalDataService) { }

    ngOnInit() {}

    onEditBookClick(book):void{
        let modalData:ModalData = {
            isOpen: true,
            title: 'Edit A Book',
            actionType: 'edit',
            modalType: 'form',
            data: book,
            callback: editBook.bind(this)
        }

        function editBook(book):void {
            this.bookList = this.bookList.map(bookData => bookData.id === book.id? (bookData = book) : bookData)
            this.onBookListDataUpdate.emit(this.bookList)
        }

        this.modalDataService.updateModalData(modalData)
    }

    onDeleteBookClick(book):void{
        let modalData:ModalData = {
            isOpen: true,
            title: 'Delete A Book',
            actionType: 'delete',
            modalType: 'message',
            data: book,
            callback: deleteBook.bind(this)
        }

        function deleteBook(book):void {
            this.bookList = this.bookList.filter(bookData => bookData.id !== book.id);
            this.onBookListDataUpdate.emit(this.bookList)
        }

        this.modalDataService.updateModalData(modalData)
    }

    onImageClick(book):void{
        let modalData:ModalData = {
            isOpen: true,
            title: 'Book Cover',
            actionType: 'expand',
            modalType: 'image',
            data: book
        }

        this.modalDataService.updateModalData(modalData)
    }

}
