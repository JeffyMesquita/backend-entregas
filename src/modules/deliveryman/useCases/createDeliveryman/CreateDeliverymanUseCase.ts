import { prisma } from '../../../../database/prismaClient';
import { hash } from 'bcrypt';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password}: ICreateDeliveryman) {
    console.log(username, password);
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    });

    console.log(deliverymanExist);

    if (deliverymanExist) {
      throw new Error('deliveryman already exists');
    }

    const hashedPassword = await hash(password, 10);

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return deliveryman;
  }
}
