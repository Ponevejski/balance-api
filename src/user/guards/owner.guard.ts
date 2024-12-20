import { BalanceService } from '@app/balance/balance.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class PostOwnerGuard implements CanActivate {
  constructor(private readonly balanceService: BalanceService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Ensure AuthGuard has already set the user
    if (!request.user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }

    const userId = request.user.id;
    const postId = request.params.id;

    const post = await this.balanceService.findOneById(postId);

    if (post.author.id !== userId) {
      throw new HttpException('Access denied', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
