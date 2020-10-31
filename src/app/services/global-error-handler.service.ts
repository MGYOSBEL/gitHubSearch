import { Injectable } from '@angular/core';
import { MessageSpan } from '@angular/compiler/src/i18n/i18n_ast';
import { MessagesService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(private messagesService: MessagesService) {

  }

  handleError(error) {
    console.log('GLOBAL HANDLE ERROR', error);
    this.messagesService.showErrors(error.message || 'Unexpected ERROR');
  }
}
