import { Request, Response } from 'express';
import { CreateDeliverymanUseCase } from './CreateDeliverymanUseCase';

export class CreateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    console.log(username, password);

    const createDeliverymanUseCase = new CreateDeliverymanUseCase();
    const result = await createDeliverymanUseCase.execute({
      username,
      password,
    });

    return response.status(201).json(result);
  }
}
