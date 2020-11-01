import { Injectable } from '@angular/core';
import { MessagesService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {

  constructor(private messagesService: MessagesService) {

  }

  handleError(error) {
    this.messagesService.showErrors(error.message || 'Unexpected ERROR');
  }
}
