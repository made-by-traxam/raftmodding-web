// noinspection ES6PreferShortImport

import { Body, Controller, Delete, OperationId, Path, Post, Route, Security } from 'tsoa';
import { AccountCreationDto } from '../../../shared/dto/AccountCreationDto';
import { AccountCreationService } from '../services/AccountCreationService';
import {HttpStatusCode} from "../types/HttpStatusCode";

@Route('/accountCreations')
export class AccountCreationController extends Controller {
  @Post()
  @Security('captcha')
  @OperationId('beginAccountCreation')
  public async create(@Body() data: AccountCreationDto) {
    const { username, email } = data;

    if (await AccountCreationService.alreadyExists(username!, email!)) {
      this.setStatus(HttpStatusCode.BadRequest);
      return { error: 'Username or E-Mail is already taken!' };
    }

    //TODO: validate body - lol

    await AccountCreationService.create(data);
    this.setStatus(HttpStatusCode.NoContent);
  }

  @Delete('/{token}')
  @OperationId('completeAccountCreation')
  public async delete(@Path() token: string) {
    const accountCreation = await AccountCreationService.getByToken(token);

    if (!accountCreation) {
      this.setStatus(HttpStatusCode.Forbidden);
      return { error: 'Invalid token!' };
    }

    const user = await AccountCreationService.finishRegistration(
      accountCreation,
      token,
    );

    this.setStatus(HttpStatusCode.NoContent);
    return user;
  }
}
