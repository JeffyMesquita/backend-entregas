import { UpdateDeliverymanUseCase } from './UpdateDeliverymanUseCase';
import { Request, Response } from "express";



export class UpdateDeliverymanController {
  async handle(request: Request, response: Response){
    const { id_deliveryman} = request;
    const { id: id_delivery } = request.params;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const delivery = await updateDeliverymanUseCase.execute({
      id_deliveryman,
      id_delivery
    });

    response.status(200).json(delivery);
  }
}