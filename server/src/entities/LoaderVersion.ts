import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { AbstractEntity } from './AbstractEntity';
import { RaftVersion } from './RaftVersion';

@Entity({ name: 'loader-versions' })
export class LoaderVersion extends AbstractEntity {
  @PrimaryColumn({ unique: true })
  rmlVersion!: string;

  @Column()
  raftVersionId!: number;

  @Column()
  timestamp!: Date;

  @Column({ type: 'text', nullable: true })
  readme?: string;

  @OneToOne(() => RaftVersion)
  @JoinColumn()
  raftVersion?: RaftVersion;
}
