import {
    Exclude,
    Expose,
    instanceToPlain,
    plainToInstance,
} from "class-transformer";
import { SUPPORTED_TOPICS } from "src/common/constants";
import { User } from "src/modules/users/entities";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity({ name: "subscribtions" })
export class Subscribtions extends BaseEntity {

    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose({ name: 'user_id' })
    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: "user_id" })
    user: User;


    @Expose()
    @Column({ nullable: false, enum: SUPPORTED_TOPICS })
    topic: SUPPORTED_TOPICS;

    @Expose()
    @Column({ nullable: true })
    subscribtion_age?: number;



    @Expose()
    @Column({ nullable: false, default: true })
    is_subscribed: boolean;


    @Expose()
    @Column({ nullable: false, default: false })
    is_deleted: boolean;

    @Exclude()
    @UpdateDateColumn()
    updated_at: Date;

    @Exclude()
    @CreateDateColumn()
    created_at: Date;

    static fromJson(json: Record<string, any>): Subscribtions {
        return plainToInstance(Subscribtions, json);
    }

    toJson(): Record<string, any> {
        return instanceToPlain(this, { excludeExtraneousValues: true });
    }
}
