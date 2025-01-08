import { Entity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn()
  userId: string;

  @Column({ type: 'text', nullable: false })
  tokenId: string;

  @CreateDateColumn()
  createdAt: Date;
}
