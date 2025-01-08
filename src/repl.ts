import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function boostrap() {
  await repl(AppModule);
}
boostrap();
