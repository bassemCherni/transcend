import { EmailValidationService } from './email-validation.service';
import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Directive({
  selector: '[appUniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueEmailDirective, multi: true}]
})
export class UniqueEmailDirective implements AsyncValidator {

  constructor(private emailValidation: EmailValidationService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.emailValidation.login(c.value).pipe(
      map(users => {
        return users != null ? { appUniqueEmail: true} : null;
      })
    );
  }

}
