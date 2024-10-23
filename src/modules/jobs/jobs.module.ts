import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TOPIC_WATCHER } from 'src/common/constants';
import { NewsORGJobService } from './services';
import { StateModule } from '../state/state.module';



@Module({
  imports: [
    BullModule,
    BullModule.registerQueue({
      name: TOPIC_WATCHER.QUEUE_NAME,
    }),
    StateModule
  ],
  providers: [NewsORGJobService],
  exports: [NewsORGJobService],
})
export class JobsModule { }
