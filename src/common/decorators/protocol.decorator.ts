import { SetMetadata } from '@nestjs/common';

export const Protocol = (...args: string[]) => SetMetadata('protocol', args);
